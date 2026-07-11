# Finance Law Refresher — build summary & Meridian integration handover

This note describes exactly what has been built (the app and its content) and gives
step-by-step directions to fold it into the **Meridian** project as a **standalone
subdomain** (its own Cloudflare Worker on a subdomain of the Meridian zone, gated by
Cloudflare Access). It is written to be shared as-is.

Source: GitHub **`sk8905/lawschool`**, branch **`claude/finance-law-refresher-2g4clh`**.

---

## 1. What it is

A single-page web app that runs a 12-week finance-law refresher for a returning
finance partner (English law / London market). It has three cross-linked modules plus
a dashboard:

- **Study plan** — a 12-week plan across five workstreams, as a task tracker.
- **Case law tracker** — key recent cases and market/regulatory developments.
- **Drafting & negotiation playbook** — clause-by-clause guidance with model wording.

It is **local-first**: everything runs in the browser and saves to `localStorage`.
Deployed behind Cloudflare Access it additionally gains an **emailed-PIN login** and
**cross-device sync** (server copy in Cloudflare KV). With no backend it still works,
fully, as a local-only tool.

## 2. Features

- **Dashboard** — aggregate progress (tasks done, cases read, clauses), a "next up"
  queue, and the five-workstream overview; stat cards deep-link into each module.
- **Study plan** — Kanban / by-week / by-workstream views, per-workstream progress
  bars, status cycling, per-task notes, and cross-link chips to related cases/clauses.
- **Case law** — filter by type (case / LMA / regulatory / market), by category, and
  by read/unread; per-entry notes; **add your own entries**; cross-links to clauses.
- **Playbook** — left doc-rail by document type; each clause expands to *purpose /
  borrower ask / lender pushback / market position / drafting notes / illustrative
  wording / your notes*; **add your own clauses**; cross-links to cases and tasks.
  - **View modes**: *Full* · *Positions* (borrower-ask vs lender-pushback only, for
    negotiation prep) · *Wording* (illustrative drafting only). Prints in the chosen mode.
- **Global search** (`Ctrl`/`⌘`+`K`, or the "Search all" button) — one search across
  tasks, cases and clauses, grouped, with deep-link navigation.
- **Print to PDF** — a print stylesheet renders clean handouts (works with the view modes).
- **Export / Import** — JSON backup of all your state, and merge-import.
- **Cross-device sync** (when deployed behind Access) — per-item last-write-wins merge,
  a footer status (Synced / Syncing / error), Sync-now and Sign-out.

## 3. Content inventory (current)

**Study plan — 35 tasks across 5 workstreams**
- A Documentation & Drafting: 8 · B Case Law & Currency: 10 · C Product Breadth: 8 ·
  D Regulatory & Risk: 5 · E Partner Transition: 4.

**Case law & developments — 36 entries** (26 cases, 1 LMA, 3 regulatory, 6 market)
- Clusters: Part 26A restructuring (Adler, Petrofac, Thames Water, Waldorf, DeepOcean,
  Virgin Active, Houst, Great Annual Savings); liability management / LME (Serta, Mitel,
  Incora); security & guarantees (Spectrum Plus, Etridge, Holme v Brunskill,
  Waller-Edwards); directors' duties (Sequana); accessory liability (Lifestyle Equities,
  LUX Films); interpretation & MAC (Wood v Capita, Rainy Sky, Arnold v Britton, Grupo
  Hotelero Urvasco); remedies & penalties (Cavendish v Makdessi); cross-border &
  recognition (Gibbs, Bakhshiyeva, gategroup); plus market/reg developments (LMA refresh,
  RFR transition, GLP/SLP/SLLP, NAV & private-credit growth, UK Securitisation
  Regulation, SRT, fund-finance docs, NAV facility issues).

**Playbook — 74 clauses across 8 document types, every one with illustrative wording**
- Leveraged Facilities: 30 · Real Estate Finance: 8 · Security & Guarantees: 9 ·
  Intercreditor Agreement: 8 · Structured Credit: 6 · Distressed & Special Situations: 5 ·
  Direct Lending / Unitranche: 4 · Investment Grade / RCF: 4.

Modules cross-link by shared id (task ⇄ case ⇄ clause).

## 4. Architecture & tech

- **Zero-build SPA** — [Preact](https://preactjs.com) + [htm](https://github.com/developit/htm)
  as native ES modules; **no bundler, transpiler, or build step** for the front end.
- **Dependencies are vendored** in `/vendor` at pinned versions (Preact 10.19.6, htm
  3.1.1); **no CDN is contacted at run time** — fully self-contained and offline-capable.
- **Seed content** in `/data` is `import`ed (not `fetch`ed), so it works under `file://`.
- **State** is a `localStorage` overlay keyed by id on top of the read-only seed:
  `render = seed.map(x => ({ ...x, ...overlay[x.id] }))`. Updating seed never clobbers notes.
- **Backend (optional)** is a **single Cloudflare Worker** that (a) serves the static app
  and (b) exposes a tiny sync API. **Auth is entirely Cloudflare Access** (emailed one-time
  PIN); the Worker verifies the Access JWT and keys stored data to the authenticated email.
  The Worker is bundled by `wrangler` (esbuild) automatically — the only build in the system.
- **Sync merge** (`lib/merge.js`) is pure and shared by client and Worker: per-entry
  last-write-wins on an `updatedAt` timestamp; custom-entry deletes propagate via tombstones.

### API (Worker)
- `GET /api/whoami` → `{ email }`
- `GET /api/data` → `{ data }` (the user's stored state)
- `PUT /api/data` → merges the posted state, returns `{ data }`
- everything else → static asset (the SPA)

## 5. Repository & file map

```
index.html            importmap + mount point + ALL styles (the "build system")
app.js                shell: hash router, tabs, global search, dashboard, export/import, sync UI
components/            StudyTracker.js  CaseTracker.js  Playbook.js  Shared.js
data/                 plan.js  cases.js  playbook.js  samples.js   (seed content, git-tracked)
lib/                  preact.js (Preact+htm hub)  store.js (localStorage overlay)
                      sync.js (sync client)  merge.js (shared last-write-wins merge)
vendor/               preact.module.js  hooks.module.js  htm.module.js  (pinned deps)
worker/               index.js (sync API + static serving)  access.js (Access JWT verify)
wrangler.toml         Cloudflare Worker config (assets + KV + Access vars)
package.json          only so Cloudflare Workers Builds / CI runs `wrangler deploy`
.assetsignore         keeps Worker source / config out of the public assets
README.md             end-user + deploy documentation
```

## 6. Data model

Client `localStorage` (keys are all prefixed `frp:`):
```
frp:tasks   → { "A3": { status, notes, updatedAt } }
frp:cases   → { "case:petrofac": { read, notes, updatedAt } }
frp:clauses → { "cl:lev-mfn": { notes, updatedAt } }
frp:custom  → { cases: [ {id, …, updatedAt, deleted?} ], clauses: [ … ] }   // user additions
frp:ui      → view/filter preferences (device-local; not synced)
```
Server (Cloudflare KV), per authenticated email:
```
user:<email> → { tasks:{…}, cases:{…}, clauses:{…}, custom:{cases:[…], clauses:[…]} }
```

---

## 7. Integration into Meridian — standalone subdomain

**Goal:** run this as its own Cloudflare Worker on a subdomain of Meridian (e.g.
`refresher.meridian.<tld>`), gated by Meridian's Cloudflare Access. It stays fully
isolated from the rest of Meridian (separate origin, separate KV, separate Worker) but
lives under the Meridian domain and login.

> The code is self-contained with no shared dependencies, so it can either live as its
> own repo or be copied into the Meridian monorepo as a subfolder (e.g. `apps/refresher/`).
> Deployment is a standard `wrangler deploy` — nothing bespoke.

### Step 0 — get the code
Clone or copy `sk8905/lawschool` (branch `claude/finance-law-refresher-2g4clh`) into
Meridian (either as its own repo, or as `apps/refresher/` in the monorepo). Keep the
whole tree; it's self-contained.

### Step 1 — choose the subdomain
e.g. `refresher.meridian.<tld>`. **It must be served at the subdomain ROOT** (see
Gotchas) — which is exactly what a standalone subdomain gives you.

### Step 2 — create a KV namespace
```
npx wrangler kv namespace create FRP_REFRESHER_KV
```
Note the printed id.

### Step 3 — edit `wrangler.toml` (see the exact deltas in §8)
Set a unique `name`, the new KV id, Meridian's Access team domain, the Access app's AUD
(from Step 5), the allow-listed email(s), and the custom-domain route for the subdomain.

### Step 4 — deploy
```
npm install        # only needed if deploying via a fresh checkout
npx wrangler deploy
```
(or run this through Meridian's existing CI/deploy pipeline). Adding the custom-domain
route in `wrangler.toml` makes Cloudflare create the DNS record and route automatically
(the zone must be in the same Cloudflare account).

### Step 5 — put Cloudflare Access in front of the subdomain
Zero Trust dashboard → **Access → Applications → Add an application → Self-hosted**:
- **Application domain** = the subdomain from Step 1.
- **Policy** = Allow → Include → Emails → the permitted address(es).
- One-time PIN is the default login method.
- Open the application's **Overview** and copy the **Application Audience (AUD) Tag**.

Put that AUD into `ACCESS_AUD` in `wrangler.toml` (with `ACCESS_TEAM_DOMAIN` =
Meridian's `*.cloudflareaccess.com` team domain) and **redeploy**.

> If Meridian already has an Access application covering the whole zone (a wildcard),
> the subdomain may already be gated; either point `ACCESS_AUD` at that application's
> AUD, or create a dedicated app as above (cleaner, and gives a specific AUD).

### Step 6 — verify
Visit the subdomain → Access asks for the email → emails a PIN → enter it → the app
loads and the footer shows **● Synced**. Sign in on a second device and progress syncs.

## 8. `wrangler.toml` — exact deltas for Meridian

Change these lines (leave the rest of the file as-is):

```toml
name = "meridian-refresher"                      # must be unique in the Cloudflare account

[[kv_namespaces]]
binding = "FRP_KV"                               # keep the binding name; the code expects FRP_KV
id = "<NEW_KV_NAMESPACE_ID_FROM_STEP_2>"

[vars]
ALLOWED_EMAIL = "user@meridian.<tld>"            # comma-separated allow-list
ACCESS_TEAM_DOMAIN = "<meridian-team>.cloudflareaccess.com"
ACCESS_AUD = "<AUD_TAG_FROM_STEP_5>"

# add this block so the subdomain is wired at deploy time (creates DNS + route):
routes = [
  { pattern = "refresher.meridian.<tld>", custom_domain = true }
]
```

## 9. Gotchas & notes

- **Serve at the subdomain ROOT, not a subpath.** The client calls `/api/...` (absolute)
  and loads assets by root-/relative paths; a subpath deployment (`meridian.<tld>/refresher`)
  would break the importmap and asset resolution without code changes. A dedicated
  subdomain root avoids this entirely.
- **Storage isolation is automatic.** Because it's a separate origin (its own subdomain),
  the app's `frp:*` `localStorage` keys are isolated from the rest of Meridian — no clash,
  no namespacing needed. (If you still want to rename the namespace, change `PREFIX` in
  `lib/store.js` and the key list in `lib/sync.js`.)
- **Keep `.assetsignore`.** With `[assets] directory = "."` the Worker serves the repo as
  static files; `.assetsignore` stops the Worker source, config and package files being
  served publicly.
- **`package.json` is only for the build runner.** Cloudflare "Workers Builds" (Git
  integration) uses it to know to run `wrangler deploy`. If Meridian deploys via its own
  CI that calls `wrangler` directly, it's harmless/optional. (Note: on the original
  account, Cloudflare's *Workers Builds* runner hung at "Initializing"; a direct
  `wrangler deploy` — locally or via CI — sidesteps that. Meridian's working pipeline
  should be unaffected.)
- **Graceful degradation.** If Access isn't wired, `/api` returns `401` and the SPA runs
  local-only (still fully usable — just no login/sync). So a half-configured deploy still
  yields a working content tool.
- **Retire the interim host.** The app is currently also live, local-only, at
  `sk8905.github.io/lawschool` (GitHub Pages). That can be turned off once Meridian hosts it.
- **Editing content later.** The seed lives in `/data/*.js` as plain exported arrays/maps.
  Add tasks to `plan.js`, cases to `cases.js`, clauses to `playbook.js`, and illustrative
  wording to `samples.js`. Keep ids stable (user notes are keyed to them) and reuse ids in
  the `relatedCases` / `relatedClauses` / `relatedTasks` arrays to create cross-links.

## 10. Post-integration verification checklist

- [ ] Subdomain resolves and shows the Access PIN page (not the app) when logged out.
- [ ] After entering the PIN, the app loads (not a 404 / "Hello world").
- [ ] Worker **Bindings** shows `FRP_KV`.
- [ ] Footer shows **● Synced · <email>**.
- [ ] Ticking a task on one device appears on another after sign-in (sync works).
- [ ] Print (⌘/Ctrl+P) on the Playbook produces a clean handout in the selected view mode.

---

> The legal content is a study aid reflecting English-law / London-market practice as
> summarised for this refresher; it is not legal advice. Verify citations and current
> market positions against primary sources before relying on them.
