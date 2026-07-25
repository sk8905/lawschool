// components/CaseTracker.js — Module 2: case law & market/regulatory tracker.
// Filterable list with facets (type/category), search, read/unread, add-entry.
import { html, useMemo, useState, useEffect, useRef } from "../lib/preact.js";
import { CASES, CATEGORIES } from "../data/cases.js";
import { CLAUSES } from "../data/playbook.js";
import { useOverlay, useCustom, usePref, KEYS } from "../lib/store.js";
import { downloadCasesWord } from "../lib/wordexport.js";
import { Chip, LinkChip, Notes, Accordion, Empty } from "./Shared.js";

const TYPES = [
  { id: "case", label: "Case", tone: "case" },
  { id: "lma", label: "LMA", tone: "lma" },
  { id: "regulatory", label: "Regulatory", tone: "reg" },
  { id: "market", label: "Market", tone: "market" },
];
const typeLabel = Object.fromEntries(TYPES.map((t) => [t.id, t.label]));
const typeTone = Object.fromEntries(TYPES.map((t) => [t.id, t.tone]));
const clauseById = Object.fromEntries(CLAUSES.map((c) => [c.id, c]));

export function CaseTracker({ navigate, search, focusId, clearFocus }) {
  const [overlay, patch] = useOverlay(KEYS.cases);
  const { custom, addCase, remove } = useCustom();
  const [typeFilter, setTypeFilter] = usePref("caseType", "all");
  const [catFilter, setCatFilter] = usePref("caseCat", "all");
  const [readFilter, setReadFilter] = usePref("caseRead", "all");
  const [openId, setOpenId] = useState(null);
  const [showAdd, setShowAdd] = useState(false);

  const all = useMemo(() => {
    const merged = [...CASES, ...(custom.cases || [])];
    return merged.map((c) => ({ ...c, ...(overlay[c.id] || {}), _custom: (custom.cases || []).some((x) => x.id === c.id) }));
  }, [overlay, custom]);

  // respond to a cross-link focus request
  useEffect(() => {
    if (focusId) {
      setOpenId(focusId);
      setTypeFilter("all");
      setCatFilter("all");
      setReadFilter("all");
    }
  }, [focusId]);

  const q = (search || "").trim().toLowerCase();
  const filtered = all
    .filter((c) => (typeFilter === "all" ? true : c.type === typeFilter))
    .filter((c) => (catFilter === "all" ? true : (c.category || []).includes(catFilter)))
    .filter((c) => (readFilter === "all" ? true : readFilter === "read" ? !!c.read : !c.read))
    .filter((c) => {
      if (!q) return true;
      return (
        c.title.toLowerCase().includes(q) ||
        (c.citation || "").toLowerCase().includes(q) ||
        (c.holding || "").toLowerCase().includes(q) ||
        (c.whyItMatters || "").toLowerCase().includes(q) ||
        (c.category || []).join(" ").toLowerCase().includes(q)
      );
    })
    .sort((a, b) => (b.date || "").localeCompare(a.date || ""));

  const readCount = all.filter((c) => c.read).length;

  return html`
    <div class="module">
      <div class="module-head">
        <div>
          <h2>Case law & currency</h2>
          <p class="lede">
            ${all.length} entries · ${readCount} marked read. Restructuring / Part 26A is the priority cluster. Add your own entries to keep it living.
          </p>
        </div>
        <div class="head-actions">
          <button class="btn" onClick=${() => downloadCasesWord("Case Law and Developments", filtered)}>⬇ Word</button>
          <button class="btn btn-primary" onClick=${() => setShowAdd((s) => !s)}>${showAdd ? "Close" : "+ Add entry"}</button>
        </div>
      </div>

      ${showAdd && html`<${AddEntry} onAdd=${(entry) => { addCase(entry); setShowAdd(false); setOpenId(entry.id); }} />`}

      <div class="toolbar wrap">
        <div class="facet">
          <span class="facet-label">Type</span>
          <button class=${`pill${typeFilter === "all" ? " pill-on" : ""}`} onClick=${() => setTypeFilter("all")}>All</button>
          ${TYPES.map((t) => html`<button class=${`pill${typeFilter === t.id ? " pill-on" : ""}`} onClick=${() => setTypeFilter(t.id)}>${t.label}</button>`)}
        </div>
        <div class="facet">
          <span class="facet-label">Read</span>
          ${["all", "unread", "read"].map((r) => html`<button class=${`pill${readFilter === r ? " pill-on" : ""}`} onClick=${() => setReadFilter(r)}>${r[0].toUpperCase() + r.slice(1)}</button>`)}
        </div>
        <select class="select" value=${catFilter} onChange=${(e) => setCatFilter(e.target.value)}>
          <option value="all">All categories</option>
          ${CATEGORIES.map((c) => html`<option value=${c}>${c}</option>`)}
        </select>
      </div>

      ${filtered.length === 0
        ? html`<${Empty}>No entries match your filters.<//>`
        : html`<div class="caselist">
            ${filtered.map((c) => CaseRow({ c, open: openId === c.id, onToggle: () => { setOpenId(openId === c.id ? null : c.id); if (clearFocus) clearFocus(); }, patch, navigate, remove }))}
          </div>`}
    </div>
  `;
}

function CaseRow({ c, open, onToggle, patch, navigate, remove }) {
  const header = html`
    <div class="case-row-head">
      <div class="case-row-main">
        <div class="card-tags">
          <${Chip} tone=${typeTone[c.type] || "muted"}>${typeLabel[c.type] || c.type}<//>
          ${(c.category || []).slice(0, 2).map((cat) => html`<${Chip} tone="muted">${cat}<//>`)}
          ${c._custom && html`<${Chip} tone="custom">custom<//>`}
        </div>
        <span class="case-title">${c.title}</span>
        <span class="case-cite">${c.citation}${c.court && c.court !== "—" ? ` · ${c.court}` : ""}${c.date ? ` · ${c.date}` : ""}</span>
      </div>
      <label class="readbox" onClick=${(e) => e.stopPropagation()}>
        <input type="checkbox" checked=${!!c.read} onChange=${(e) => patch(c.id, { read: e.target.checked })} />
        <span>Read</span>
      </label>
    </div>
  `;
  return html`
    <${Accordion} open=${open} onToggle=${onToggle} header=${header}>
      ${c.holding && html`<div class="field"><span class="field-label">Holding</span><p>${c.holding}</p></div>`}
      ${c.whyItMatters && html`<div class="field"><span class="field-label">Why it matters</span><p>${c.whyItMatters}</p></div>`}
      ${!!c.relatedClauses?.length &&
        html`<div class="crosslinks">
          ${c.relatedClauses.map((id) => {
            const cl = clauseById[id];
            return cl ? html`<${LinkChip} tone="clause" label=${`§ ${cl.title}`} title="Open in Playbook" onClick=${() => navigate("playbook", id)} />` : null;
          })}
        </div>`}
      <${Notes} value=${c.notes} onCommit=${(v) => patch(c.id, { notes: v })} placeholder="Your note / takeaway…" />
      ${c._custom && html`<button class="btn btn-danger btn-sm" onClick=${() => remove("case", c.id)}>Delete entry</button>`}
    <//>
  `;
}

function AddEntry({ onAdd }) {
  const [form, setForm] = useState({ title: "", citation: "", type: "case", court: "", date: "", category: "", holding: "", whyItMatters: "" });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    const id = "custom:" + form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40) + ":" + Math.abs(hash(form.title + form.citation));
    onAdd({
      id,
      type: form.type,
      title: form.title.trim(),
      citation: form.citation.trim() || "—",
      court: form.court.trim() || "—",
      date: form.date || "",
      category: form.category ? [form.category] : [],
      holding: form.holding.trim(),
      whyItMatters: form.whyItMatters.trim(),
      links: [],
      relatedClauses: [],
    });
  };
  return html`
    <form class="addform" onSubmit=${submit}>
      <div class="addgrid">
        <label>Title<input value=${form.title} onInput=${set("title")} placeholder="Case or development name" required /></label>
        <label>Citation<input value=${form.citation} onInput=${set("citation")} placeholder="[2026] EWCA Civ …" /></label>
        <label>Type<select value=${form.type} onChange=${set("type")}>${TYPES.map((t) => html`<option value=${t.id}>${t.label}</option>`)}</select></label>
        <label>Court / source<input value=${form.court} onInput=${set("court")} /></label>
        <label>Date<input type="date" value=${form.date} onInput=${set("date")} /></label>
        <label>Category<select value=${form.category} onChange=${set("category")}><option value="">—</option>${CATEGORIES.map((c) => html`<option value=${c}>${c}</option>`)}</select></label>
      </div>
      <label class="full">Holding<textarea value=${form.holding} onInput=${set("holding")} rows="2"></textarea></label>
      <label class="full">Why it matters<textarea value=${form.whyItMatters} onInput=${set("whyItMatters")} rows="2"></textarea></label>
      <div class="addactions"><button type="submit" class="btn btn-primary">Add entry</button></div>
    </form>
  `;
}

function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return h;
}
