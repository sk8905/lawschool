// components/Playbook.js — Module 4: drafting / negotiation playbook.
// Doc rail (left) + clause accordion (purpose / borrower ask / lender pushback /
// market position / drafting notes / your notes). Print-friendly.
import { html, useMemo, useState, useEffect } from "../lib/preact.js";
import { DOCS, CLAUSES } from "../data/playbook.js";
import { SAMPLES } from "../data/samples.js";
import { CASES } from "../data/cases.js";
import { TASKS } from "../data/plan.js";
import { useOverlay, useCustom, usePref, KEYS } from "../lib/store.js";
import { downloadPlaybookWord } from "../lib/wordexport.js";
import { Chip, LinkChip, Notes, Accordion, Empty } from "./Shared.js";

const caseById = Object.fromEntries(CASES.map((c) => [c.id, c]));
const taskById = Object.fromEntries(TASKS.map((t) => [t.id, t]));

export function Playbook({ navigate, search, focusId, clearFocus }) {
  const [overlay, patch] = useOverlay(KEYS.clauses);
  const { custom, addClause, remove } = useCustom();
  const [activeDoc, setActiveDoc] = usePref("pbDoc", "leveraged");
  const [mode, setMode] = usePref("pbMode", "full");
  const [openId, setOpenId] = useState(null);
  const [showAdd, setShowAdd] = useState(false);

  const all = useMemo(() => {
    const merged = [...CLAUSES, ...(custom.clauses || [])];
    return merged.map((c) => ({ ...c, ...(overlay[c.id] || {}), _custom: (custom.clauses || []).some((x) => x.id === c.id) }));
  }, [overlay, custom]);

  // cross-link focus: jump to the clause's doc and open it
  useEffect(() => {
    if (focusId) {
      const cl = all.find((c) => c.id === focusId);
      if (cl) setActiveDoc(cl.doc);
      setOpenId(focusId);
    }
  }, [focusId]);

  const q = (search || "").trim().toLowerCase();
  const searching = q.length > 0;

  const inScope = all.filter((c) => (searching ? true : c.doc === activeDoc));
  const filtered = inScope.filter((c) => {
    if (!q) return true;
    return [c.title, c.section, c.purpose, c.borrowerAsk, c.lenderPushback, c.marketPosition, c.draftingNotes]
      .join(" ")
      .toLowerCase()
      .includes(q);
  });

  return html`
    <div class="module">
      <div class="module-head">
        <div>
          <h2>Drafting & negotiation playbook</h2>
          <p class="lede">Clause-by-clause: purpose, the borrower ask, the lender pushback, where it sits in the market, and your drafting notes. Use your browser's print to export a clean handout.</p>
        </div>
        <div class="head-actions no-print">
          <button class="btn" onClick=${() => {
            const title = searching ? `Playbook — "${q}"` : (DOCS.find((d) => d.id === activeDoc) || {}).title || "Playbook";
            const items = filtered.map((c) => ({ ...c, wording: c.sample || SAMPLES[c.id] }));
            downloadPlaybookWord(title, items);
          }}>⬇ Word</button>
          <button class="btn" onClick=${() => window.print()}>⎙ Print</button>
          <button class="btn btn-primary" onClick=${() => setShowAdd((s) => !s)}>${showAdd ? "Close" : "+ Add clause"}</button>
        </div>
      </div>

      ${showAdd && html`<${AddClause} activeDoc=${activeDoc} onAdd=${(entry) => { addClause(entry); setShowAdd(false); setActiveDoc(entry.doc); setOpenId(entry.id); }} />`}

      <div class="toolbar no-print">
        <div class="segmented">
          ${[["full", "Full"], ["positions", "Positions"], ["wording", "Wording"]].map(
            ([v, label]) => html`<button class=${`seg${mode === v ? " seg-on" : ""}`} onClick=${() => setMode(v)}>${label}</button>`
          )}
        </div>
        <span class="mode-note">${mode === "positions" ? "Borrower ask vs lender pushback only — negotiation prep." : mode === "wording" ? "Illustrative drafting only." : "All detail per clause."}</span>
      </div>

      <div class="playbook">
        <nav class="doc-rail no-print">
          ${DOCS.map((d) => {
            const count = all.filter((c) => c.doc === d.id).length;
            return html`
              <button class=${`rail-item${!searching && activeDoc === d.id ? " rail-on" : ""}`} onClick=${() => { setActiveDoc(d.id); if (clearFocus) clearFocus(); }}>
                <span>${d.title}</span><span class="rail-count">${count}</span>
              </button>
            `;
          })}
        </nav>

        <div class="clause-area">
          ${searching && html`<p class="search-note">Showing matches for "${q}" across all documents.</p>`}
          ${filtered.length === 0
            ? html`<${Empty}>No clauses here yet.<//>`
            : filtered.map((c) => ClauseCard({ c, open: searching || openId === c.id, onToggle: () => { setOpenId(openId === c.id ? null : c.id); if (clearFocus) clearFocus(); }, patch, navigate, remove, mode }))}
        </div>
      </div>
    </div>
  `;
}

function ClauseCard({ c, open, onToggle, patch, navigate, remove, mode = "full" }) {
  const docTitle = (DOCS.find((d) => d.id === c.doc) || {}).short || c.doc;
  const showFull = mode === "full";
  const showPositions = mode === "full" || mode === "positions";
  const showWording = mode === "full" || mode === "wording";
  const header = html`
    <div class="clause-head">
      <div>
        <div class="card-tags">
          <${Chip} tone="doc">${docTitle}<//>
          <${Chip} tone="muted">${c.section}<//>
          ${c._custom && html`<${Chip} tone="custom">custom<//>`}
        </div>
        <span class="clause-title">${c.title}</span>
      </div>
    </div>
  `;
  return html`
    <div class="clause">
      <${Accordion} open=${open} onToggle=${onToggle} header=${header}>
        ${showFull && html`<div class="field"><span class="field-label">Purpose</span><p>${c.purpose}</p></div>`}
        ${showPositions &&
          html`<div class="ask-grid">
            <div class="field ask"><span class="field-label">Borrower ask</span><p>${c.borrowerAsk}</p></div>
            <div class="field push"><span class="field-label">Lender pushback</span><p>${c.lenderPushback}</p></div>
          </div>`}
        ${showFull && html`<div class="field"><span class="field-label">Market position</span><p>${c.marketPosition}</p></div>`}
        ${showFull && html`<div class="field"><span class="field-label">Drafting notes</span><p>${c.draftingNotes}</p></div>`}
        ${showWording &&
          (() => {
            const sample = c.sample || SAMPLES[c.id];
            return sample
              ? html`<div class="field sample">
                  <span class="field-label">Illustrative wording <span class="sample-caveat">— starter language to adapt, not the LMA form</span></span>
                  <pre class="sample-text">${sample}</pre>
                </div>`
              : null;
          })()}
        ${!!(c.relatedCases?.length || c.relatedTasks?.length) &&
          html`<div class="crosslinks no-print">
            ${(c.relatedCases || []).map((id) => {
              const cc = caseById[id];
              return cc ? html`<${LinkChip} tone="case" label=${`⚖ ${cc.title}`} title="Open in Case Law" onClick=${() => navigate("cases", id)} />` : null;
            })}
            ${(c.relatedTasks || []).map((id) => {
              const t = taskById[id];
              return t ? html`<${LinkChip} tone="task" label=${`✎ ${t.title}`} title="Open in Study plan" onClick=${() => navigate("plan", id)} />` : null;
            })}
          </div>`}
        <${Notes} value=${c.notes} onCommit=${(v) => patch(c.id, { notes: v })} placeholder="Your position / precedent language…" />
        ${c._custom && html`<button class="btn btn-danger btn-sm no-print" onClick=${() => remove("clause", c.id)}>Delete clause</button>`}
      <//>
    </div>
  `;
}

function AddClause({ activeDoc, onAdd }) {
  const [form, setForm] = useState({ title: "", doc: activeDoc, section: "", purpose: "", borrowerAsk: "", lenderPushback: "", marketPosition: "", draftingNotes: "" });
  useEffect(() => setForm((f) => ({ ...f, doc: activeDoc })), [activeDoc]);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    const id = "custom-cl:" + form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40) + ":" + Math.abs(hash(form.title + form.section));
    onAdd({
      id,
      doc: form.doc,
      section: form.section.trim() || "Custom",
      title: form.title.trim(),
      purpose: form.purpose.trim(),
      borrowerAsk: form.borrowerAsk.trim(),
      lenderPushback: form.lenderPushback.trim(),
      marketPosition: form.marketPosition.trim(),
      draftingNotes: form.draftingNotes.trim(),
      relatedCases: [],
      relatedTasks: [],
    });
  };
  return html`
    <form class="addform" onSubmit=${submit}>
      <div class="addgrid">
        <label>Clause title<input value=${form.title} onInput=${set("title")} required /></label>
        <label>Document<select value=${form.doc} onChange=${set("doc")}>${DOCS.map((d) => html`<option value=${d.id}>${d.title}</option>`)}</select></label>
        <label>Section<input value=${form.section} onInput=${set("section")} /></label>
      </div>
      <label class="full">Purpose<textarea value=${form.purpose} onInput=${set("purpose")} rows="2"></textarea></label>
      <div class="ask-grid">
        <label class="full">Borrower ask<textarea value=${form.borrowerAsk} onInput=${set("borrowerAsk")} rows="2"></textarea></label>
        <label class="full">Lender pushback<textarea value=${form.lenderPushback} onInput=${set("lenderPushback")} rows="2"></textarea></label>
      </div>
      <label class="full">Market position<textarea value=${form.marketPosition} onInput=${set("marketPosition")} rows="2"></textarea></label>
      <label class="full">Drafting notes<textarea value=${form.draftingNotes} onInput=${set("draftingNotes")} rows="2"></textarea></label>
      <div class="addactions"><button type="submit" class="btn btn-primary">Add clause</button></div>
    </form>
  `;
}

function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return h;
}
