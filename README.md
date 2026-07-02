# Finance Law Refresher

A single-page app to run a 12-week finance-law refresher — for moving back into
private practice as a finance partner after time in-house. It combines three tools:

1. **Study plan** — the 12-week plan across five parallel workstreams
   (A Documentation & drafting · B Case law & currency · C Product breadth ·
   D Regulatory & risk · E Partner transition), as a task tracker with kanban,
   by-week and by-workstream views and progress bars.
2. **Case law tracker** — a filterable list of the key cases and market/regulatory
   developments of the last few years (Part 26A restructuring cluster, security &
   guarantees, interpretation & MAC, LMA/RFR/sustainable-finance developments),
   with read/unread state, notes, and an **Add entry** form to keep it living.
3. **Drafting & negotiation playbook** — clause-by-clause across leveraged,
   intercreditor, IG/RCF, real estate finance and security documents, each with
   *purpose · borrower ask · lender pushback · market position · drafting notes*,
   your own notes, and a print stylesheet for clean PDF handouts.

The modules cross-link: a task references the cases and clauses it touches; a
case references the clauses it bears on; a clause references the cases and tasks
behind it. A **Dashboard** aggregates progress across all three.

## Running it

This is a **zero-build** app — no npm, no bundler, no transpile step, and **no
network at run time**.

- **Locally:** just open `index.html` in a browser (double-click it, or
  `file://…/index.html`). Everything works offline.
- **GitHub Pages:** enable Pages for this repo (Settings → Pages → deploy from
  branch, root). GitHub Pages gives you a stable per-origin URL, which means your
  saved progress persists reliably across visits.
- **Cloudflare Worker (with private login + cross-device sync):** see below.
  This is the recommended way to use it day to day if you want your progress to
  follow you across devices behind an emailed-PIN login.

## Cross-device sync & private login (Cloudflare)

By default the app is local-first: your progress lives in the browser you use.
Deployed as a Cloudflare Worker behind **Cloudflare Access**, it instead:

- gates the whole app behind an **emailed one-time PIN**, restricted to the
  email(s) in your Access policy (no passwords, no auth code in the app — Access
  handles login at Cloudflare's edge); and
- **syncs your state across devices** via a tiny API in the same Worker, storing
  it in Cloudflare **KV**, keyed to your authenticated email. Conflicts resolve
  per entry by last-write-wins (each edit carries a timestamp), so two devices
  merge cleanly instead of overwriting each other. It stays offline-capable and
  reconciles on reconnect.

The moving parts live in [`/worker`](./worker) (`index.js` API + `access.js` JWT
verification), [`wrangler.toml`](./wrangler.toml), and the client
[`lib/sync.js`](./lib/sync.js). The merge logic in [`lib/merge.js`](./lib/merge.js)
is shared by both sides.

> **Why not GitHub Pages for this?** Cloudflare Access can only put its PIN gate
> in front of a hostname served *through Cloudflare*, so the login requires
> hosting the app on Cloudflare (a Worker on a custom domain, or Cloudflare
> Pages). A `github.io` page can't sit behind Access.

### One-time setup

Prerequisites: a Cloudflare account with **Zero Trust / Access** enabled, and a
**domain on your Cloudflare account** (Access can't protect a bare `*.workers.dev`
URL — it needs a hostname in a zone you control).

1. **Log in to Cloudflare from the CLI**

   ```
   npx wrangler login
   ```

2. **Create the KV namespace** and paste the printed id into `wrangler.toml`
   (`[[kv_namespaces]] id = "…"`):

   ```
   npx wrangler kv namespace create FRP_KV
   ```

3. **Deploy the Worker** (first pass — we'll fill the Access vars after):

   ```
   npx wrangler deploy
   ```

4. **Give the Worker a custom domain.** In the dashboard: **Workers & Pages →
   finance-law-refresher → Settings → Domains & Routes → Add → Custom Domain**,
   e.g. `refresher.yourdomain.com`. (This is the hostname Access will protect.)

5. **Put Access in front of it.** Zero Trust dashboard → **Access → Applications
   → Add an application → Self-hosted**:
   - Application domain: the custom domain from step 4.
   - Add a policy: **Action = Allow**, **Include → Emails → `kenneds7@tcd.ie`**
     (add any others you want). This is what restricts access to you.
   - Login method: one-time PIN is on by default (Access emails the code).
   - After creating it, open the app's **Overview** and copy the
     **Application Audience (AUD) Tag**.

6. **Fill in `wrangler.toml` `[vars]`** and redeploy:
   - `ACCESS_TEAM_DOMAIN` = your team domain, e.g. `yourteam.cloudflareaccess.com`
   - `ACCESS_AUD` = the AUD tag from step 5
   - `ALLOWED_EMAIL` = `kenneds7@tcd.ie` (already set)

   ```
   npx wrangler deploy
   ```

7. **Use it.** Visit your custom domain. Access asks for your email → emails a
   PIN → enter it → the app loads and the footer shows **Synced · your-email ·
   Sync now · Sign out**. Open the same URL on another device, log in the same
   way, and your progress is already there.

No secrets/API keys are needed — the config values above are not sensitive. If
you don't have a domain on Cloudflare, tell me and I'll switch the deploy to
**Cloudflare Pages**, which can put Access on the free `*.pages.dev` URL instead.

### Deployed data model

Server state (in KV, per email) mirrors the local overlay, with a timestamp per
entry for conflict resolution:

```
user:<email> → {
  tasks:   { "A3": { status, notes, updatedAt } },
  cases:   { "case:petrofac": { read, notes, updatedAt } },
  clauses: { "cl:lev-mfn": { notes, updatedAt } },
  custom:  { cases: [ { id, …, updatedAt, deleted? } ], clauses: [ … ] }
}
```

## How it's built

- **UI:** [Preact](https://preactjs.com/) + [htm](https://github.com/developit/htm)
  (the React model, without JSX or a build step), loaded as native ES modules.
- **Dependencies are vendored** in [`/vendor`](./vendor) at exact pinned versions
  (Preact 10.19.6, htm 3.1.1). No CDN is contacted at run time, so the app is
  fully self-contained, works offline, and can't break if a CDN changes.
- **Seed content** lives in [`/data`](./data) as JS modules that `export` JSON.
  It is imported (not `fetch`ed) so it works under `file://`, and it is
  git-tracked and read-only.
- **Your state** (task status, read flags, notes, entries you add) is stored in
  `localStorage` as an **overlay keyed by id** on top of the seed. Updating the
  seed never clobbers your notes. Nothing is sent anywhere — no backend, no
  telemetry.

### Data model

Render is `seed.map(x => ({ ...x, ...overlay[x.id] }))`, so seed and your edits
stay cleanly separated:

```
localStorage["frp:tasks"]   → { "A3": { status, notes } }
localStorage["frp:cases"]   → { "case:petrofac": { read, notes } }
localStorage["frp:clauses"] → { "cl:lev-mfn": { notes } }
localStorage["frp:custom"]  → { cases: [...], clauses: [...] }   // your additions
```

Use **Export backup** (footer) to dump all your state to a timestamped JSON file,
and **Import** to merge it back — for backups, moving between devices/browsers, or
hand-merging additions into `/data`.

## Project layout

```
index.html            importmap + mount point + all styles (the whole "build system")
app.js                shell: hash router, tabs, search, dashboard, export/import, sync UI
components/            StudyTracker.js  CaseTracker.js  Playbook.js  Shared.js
data/                 plan.js  cases.js  playbook.js   (seed content, git-tracked)
lib/                  preact.js (Preact+htm hub)  store.js (localStorage overlay)
                      sync.js (cross-device sync client)  merge.js (shared LWW merge)
vendor/               preact.module.js  hooks.module.js  htm.module.js  (pinned deps)
worker/               index.js (sync API + static serving)  access.js (Access JWT verify)
wrangler.toml         Cloudflare Worker config (KV + Access vars)
```

## Editing the seed content

The seed content in `/data` is meant to be edited — it's your material. Add tasks
to `plan.js`, cases/developments to `cases.js`, clauses to `playbook.js`. Keep the
`id`s stable (your overlay notes are keyed to them) and reuse the same ids in the
`relatedCases` / `relatedClauses` / `relatedTasks` arrays to create cross-links.

---

> The legal content is a study aid reflecting English-law / London market practice
> as summarised for this refresher. It is not legal advice; verify citations and
> current market positions against primary sources (LMA suite, Practical Law,
> LexisNexis, the law reports) before relying on them.
