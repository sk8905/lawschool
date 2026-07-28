// scripts/audit.mjs — deterministic integrity audit for the app's content and wiring.
//
// Run:  node scripts/audit.mjs
// Exit: 0 when clean, 1 when any ERROR is found (warnings never fail the run).
//
// Checks (no browser needed):
//   - duplicate ids across every dataset
//   - cross-link integrity (relatedCases / relatedClauses / relatedTasks, and the
//     model-document sections' related links) all resolve
//   - referential integrity (clause.doc, task.workstream, case.category)
//   - per-document section numbering is sequential with no gaps/dupes
//   - required fields are present and non-empty on every record
//   - store KEYS <-> merge MAP_KEYS/emptyState stay in step
//   - SAMPLES keys map to real clauses
//   - manifest.webmanifest and package.json parse as JSON
//
// This is the core the daily 5am routine runs; keep it dependency-free.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import { WORKSTREAMS, TASKS } from "../data/plan.js";
import { CASES, CATEGORIES } from "../data/cases.js";
import { DOCS, CLAUSES } from "../data/playbook.js";
import { DOCUMENTS } from "../data/documents.js";
import { SAMPLES } from "../data/samples.js";
import { KEYS } from "../lib/store.js";
import { emptyState } from "../lib/merge.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const warnings = [];
const err = (m) => errors.push(m);
const warn = (m) => warnings.push(m);

const idsOf = (arr) => new Set(arr.map((x) => x.id));
const taskIds = idsOf(TASKS);
const caseIds = idsOf(CASES);
const clauseIds = idsOf(CLAUSES);
const docIds = idsOf(DOCS);
const wsIds = idsOf(WORKSTREAMS);
const catSet = new Set(CATEGORIES);

// ---- 1. duplicate ids -----------------------------------------------------
function dupes(label, arr) {
  const seen = new Set();
  for (const x of arr) {
    if (seen.has(x.id)) err(`${label}: duplicate id "${x.id}"`);
    seen.add(x.id);
  }
}
dupes("TASKS", TASKS);
dupes("CASES", CASES);
dupes("CLAUSES", CLAUSES);
dupes("DOCS", DOCS);
dupes("WORKSTREAMS", WORKSTREAMS);
dupes("DOCUMENTS", DOCUMENTS);
const allSections = DOCUMENTS.flatMap((d) => d.sections.map((s) => ({ ...s, _doc: d.short })));
dupes("document sections", allSections);

// ---- 2. cross-link integrity ---------------------------------------------
function checkLinks(label, id, list, targetSet, targetName) {
  for (const ref of list || []) {
    if (!targetSet.has(ref)) err(`${label} "${id}": ${targetName} link "${ref}" does not resolve`);
  }
}
for (const t of TASKS) {
  checkLinks("task", t.id, t.relatedCases, caseIds, "case");
  checkLinks("task", t.id, t.relatedClauses, clauseIds, "clause");
}
for (const c of CASES) checkLinks("case", c.id, c.relatedClauses, clauseIds, "clause");
for (const c of CLAUSES) {
  checkLinks("clause", c.id, c.relatedCases, caseIds, "case");
  checkLinks("clause", c.id, c.relatedTasks, taskIds, "task");
}
for (const d of DOCUMENTS)
  for (const s of d.sections) {
    checkLinks(`doc:${d.short} §${s.no}`, s.id, s.relatedClauses, clauseIds, "clause");
    checkLinks(`doc:${d.short} §${s.no}`, s.id, s.relatedCases, caseIds, "case");
  }

// ---- 3. referential integrity --------------------------------------------
for (const c of CLAUSES)
  if (!docIds.has(c.doc)) err(`clause "${c.id}": doc "${c.doc}" is not a defined playbook DOC`);
for (const t of TASKS)
  if (!wsIds.has(t.workstream)) err(`task "${t.id}": workstream "${t.workstream}" is not defined`);
for (const c of CASES)
  for (const cat of c.category || [])
    if (!catSet.has(cat)) warn(`case "${c.id}": category "${cat}" is not in CATEGORIES`);
for (const d of DOCS)
  if (!CLAUSES.some((c) => c.doc === d.id)) warn(`playbook DOC "${d.id}" has no clauses`);

// ---- 4. per-document section numbering -----------------------------------
for (const d of DOCUMENTS) {
  const numeric = d.sections.map((s) => s.no).filter((n) => /^\d+$/.test(String(n))).map(Number);
  const nonNumericAfter = d.sections.findIndex((s) => !/^\d+$/.test(String(s.no)));
  numeric.forEach((n, i) => {
    if (n !== i + 1)
      err(`doc "${d.short}": section numbering breaks at position ${i + 1} (found no="${n}")`);
  });
  // any non-numeric section (e.g. "Schs") must come after all numbered ones
  if (nonNumericAfter !== -1 && nonNumericAfter < numeric.length)
    warn(`doc "${d.short}": non-numeric section appears before the numbered run ends`);
}

// ---- 5. required fields ----------------------------------------------------
const need = (obj, fields, label) => {
  for (const f of fields)
    if (obj[f] === undefined || obj[f] === null || String(obj[f]).trim() === "")
      err(`${label} "${obj.id}": missing/empty field "${f}"`);
};
for (const t of TASKS) need(t, ["id", "workstream", "week", "effort", "title", "detail"], "task");
for (const c of CASES) need(c, ["id", "type", "title", "citation"], "case");
for (const c of CLAUSES)
  need(c, ["id", "doc", "section", "title", "purpose", "borrowerAsk", "lenderPushback"], "clause");
for (const d of DOCUMENTS) {
  need(d, ["id", "area", "title", "short", "summary"], "document");
  for (const s of d.sections)
    need(s, ["id", "no", "title", "group", "purpose", "illustrative", "annotation"], `section (${d.short})`);
}

// ---- 6. store KEYS <-> merge MAP_KEYS/emptyState --------------------------
const mapKeys = Object.keys(emptyState()).filter((k) => k !== "custom");
const storeMapKeys = Object.keys(KEYS).filter((k) => k !== "custom" && k !== "ui");
for (const k of storeMapKeys)
  if (!mapKeys.includes(k)) err(`store KEYS has "${k}" but merge emptyState() does not`);
for (const k of mapKeys)
  if (!storeMapKeys.includes(k)) err(`merge emptyState() has "${k}" but store KEYS does not`);

// ---- 7. SAMPLES keys map to clauses --------------------------------------
for (const k of Object.keys(SAMPLES))
  if (!clauseIds.has(k)) warn(`SAMPLES key "${k}" is not a known clause id`);

// ---- 8. JSON files parse --------------------------------------------------
for (const f of ["manifest.webmanifest", "package.json"]) {
  try {
    JSON.parse(readFileSync(join(root, f), "utf8"));
  } catch (e) {
    err(`${f}: invalid JSON (${e.message})`);
  }
}

// ---- report ---------------------------------------------------------------
const stats = `content: ${TASKS.length} tasks · ${CASES.length} cases · ${CLAUSES.length} clauses across ${DOCS.length} playbook docs · ${DOCUMENTS.length} model documents (${allSections.length} sections)`;
console.log(stats);
for (const w of warnings) console.log(`WARN  ${w}`);
for (const e of errors) console.log(`ERROR ${e}`);
console.log(`\n${errors.length} error(s), ${warnings.length} warning(s).`);
process.exit(errors.length ? 1 : 0);
