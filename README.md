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

> **Why not GitHub Pages for this?** Cloudflare Access can only gate a hostname
> served *through Cloudflare* — that includes your Worker's `*.workers.dev` URL,
> but not a `github.io` page. So the private/synced version runs on the Worker;
> GitHub Pages stays available as the open, local-only version.

### One-time setup (Worker on `*.workers.dev` + Zero Trust Access)

This is the same pattern as your other Zero-Trust-gated Worker apps — no custom
domain needed. Prerequisite: a Cloudflare account with **Zero Trust / Access**
enabled. Deployment here uses the dashboard's **Git integration** (the repo is
connected to the Worker, so each push auto-builds); CLI equivalents are shown too.

1. **Create the KV namespace.** Dashboard → **Workers & Pages → KV → Create a
   namespace**, name it `FRP_KV`, and copy its **Namespace ID**.
   (CLI: `npx wrangler kv namespace create FRP_KV`.)

2. **Enable the Worker's URL.** Your Worker → **Settings → Domains & Routes** →
   enable the `*.workers.dev` route (e.g. `lawschool.<account>.workers.dev`).

3. **Put Zero Trust Access in front of that hostname.** Zero Trust dashboard →
   **Access → Applications → Add an application → Self-hosted**:
   - Application domain: your Worker's `*.workers.dev` hostname from step 2.
   - Policy: **Action = Allow**, **Include → Emails → `kenneds7@tcd.ie`**
     (add any others you want). This is what restricts access to you.
   - Login method: one-time PIN is on by default (Access emails the code).
   - Open the application's **Overview** and copy the **Application Audience
     (AUD) Tag**.

4. **Fill in `wrangler.toml`** (edit it on GitHub or locally) and commit:
   - `[[kv_namespaces]] id` = the KV id from step 1
   - `ACCESS_TEAM_DOMAIN` = your team domain, e.g. `yourteam.cloudflareaccess.com`
   - `ACCESS_AUD` = the AUD tag from step 3
   - `ALLOWED_EMAIL` = `kenneds7@tcd.ie` (already set)

   Pushing the commit triggers the connected build, which deploys the real app.
   (CLI equivalent: `npx wrangler deploy`.) Until the KV id is real, the build
   fails and the old placeholder ("Hello world") stays live — that's the usual
   cause of a non-updating Worker.

5. **Use it.** Visit the `*.workers.dev` URL. Access asks for your email →
   emails a PIN → enter it → the app loads and the footer shows **Synced ·
   your-email · Sync now · Sign out**. Open the same URL on another device, sign
   in the same way, and your progress is already there.

No secrets/API keys are needed — the config values above are not sensitive.

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
