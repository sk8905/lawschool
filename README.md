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
  saved progress persists reliably across visits — this is the recommended way to
  use it day to day.

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
app.js                shell: hash router, tabs, global search, dashboard, export/import
components/            StudyTracker.js  CaseTracker.js  Playbook.js  Shared.js
data/                 plan.js  cases.js  playbook.js   (seed content, git-tracked)
lib/                  preact.js (Preact+htm hub)  store.js (localStorage overlay)
vendor/               preact.module.js  hooks.module.js  htm.module.js  (pinned deps)
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
