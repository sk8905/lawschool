// components/DocViewer.js — Documents module: annotated model agreements.
import { html, useMemo, useState, useEffect } from "../lib/preact.js";
import { DOCUMENTS } from "../data/documents.js";
import { CLAUSES } from "../data/playbook.js";
import { CASES } from "../data/cases.js";
import { useOverlay, usePref, KEYS } from "../lib/store.js";
import { downloadWord } from "../lib/wordexport.js";
import { Chip, LinkChip, Notes, Accordion, Empty } from "./Shared.js";

const clauseById = Object.fromEntries(CLAUSES.map((c) => [c.id, c]));
const caseById = Object.fromEntries(CASES.map((c) => [c.id, c]));
const sectionById = Object.fromEntries(
  DOCUMENTS.flatMap((d) => d.sections.map((s) => [s.id, { ...s, docId: d.id }]))
);

export function DocViewer({ navigate, search, focusId, clearFocus }) {
  const [overlay, patch] = useOverlay(KEYS.docs);
  const [activeDoc, setActiveDoc] = usePref("docActive", DOCUMENTS[0] ? DOCUMENTS[0].id : "");
  const [openId, setOpenId] = useState(null);

  // cross-link / search focus: jump to the section's document and open it
  useEffect(() => {
    if (!focusId) return;
    const s = sectionById[focusId];
    if (s) setActiveDoc(s.docId);
    setOpenId(focusId);
    const el = document.getElementById(`docsec-${focusId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.classList.add("focus-flash");
      const t = setTimeout(() => el.classList.remove("focus-flash"), 1600);
      return () => clearTimeout(t);
    }
  }, [focusId]);

  const doc = DOCUMENTS.find((d) => d.id === activeDoc) || DOCUMENTS[0];
  const q = (search || "").trim().toLowerCase();
  const searching = q.length > 0;

  const sections = useMemo(() => {
    if (!doc) return [];
    if (!q) return doc.sections;
    return doc.sections.filter((s) =>
      `${s.no} ${s.title} ${s.group} ${s.purpose} ${s.annotation} ${s.illustrative}`.toLowerCase().includes(q)
    );
  }, [doc, q]);

  if (!doc) return html`<div class="module"><${Empty}>No documents yet.<//></div>`;

  return html`
    <div class="module">
      <div class="module-head">
        <div>
          <h2>Documents</h2>
          <p class="lede">Annotated model agreements, clause by clause — what each section does, representative wording, and the considerations, cross-linked to the playbook and case law.</p>
        </div>
        <div class="head-actions no-print">
          <button class="btn" onClick=${() => downloadWord(doc)}>⬇ Word</button>
          <button class="btn" onClick=${() => window.print()}>⎙ Print</button>
        </div>
      </div>

      <div class="doc-disclaimer">
        <strong>Illustrative study model, not the LMA form.</strong> Original drafting in an LMA/market style for learning and reference — not the LMA's copyrighted document and not a precedent to run a deal on. For live transactions use your firm's actual LMA documents and Practical Law / LexisNexis annotations.
      </div>

      <div class="playbook">
        <nav class="doc-rail no-print">
          ${DOCUMENTS.map(
            (d) => html`<button class=${`rail-item${!searching && activeDoc === d.id ? " rail-on" : ""}`} onClick=${() => { setActiveDoc(d.id); if (clearFocus) clearFocus(); }}>
              <span>${d.short}</span><span class="rail-count">${d.sections.length}</span>
            </button>`
          )}
        </nav>

        <div class="clause-area">
          <div class="doc-title-row no-print">
            <h3 class="doc-title">${doc.title}</h3>
          </div>
          <p class="doc-summary">${doc.summary}</p>
          ${searching && html`<p class="search-note">Showing sections matching "${q}".</p>`}
          ${sections.length === 0
            ? html`<${Empty}>No sections match.<//>`
            : renderSections(sections, {
                open: (id) => searching || openId === id,
                toggle: (id) => { setOpenId(openId === id ? null : id); if (clearFocus) clearFocus(); },
                overlay,
                patch,
                navigate,
              })}
        </div>
      </div>
    </div>
  `;
}

function renderSections(sections, ctx) {
  const out = [];
  let lastGroup = null;
  for (const s of sections) {
    if (s.group !== lastGroup) {
      out.push(html`<div class="doc-group">${s.group}</div>`);
      lastGroup = s.group;
    }
    out.push(SectionCard({ s, ...ctx, ov: ctx.overlay[s.id] || {} }));
  }
  return out;
}

function SectionCard({ s, open, toggle, patch, navigate, ov }) {
  const header = html`
    <div class="clause-head">
      <div>
        <div class="card-tags">
          <${Chip} tone="doc">Clause ${s.no}<//>
          <${Chip} tone="muted">${s.group}<//>
        </div>
        <span class="clause-title">${s.title}</span>
      </div>
    </div>
  `;
  return html`
    <div class="clause" id=${`docsec-${s.id}`}>
      <${Accordion} open=${open(s.id)} onToggle=${() => toggle(s.id)} header=${header}>
        <div class="field"><span class="field-label">Purpose</span><p>${s.purpose}</p></div>
        <div class="field sample">
          <span class="field-label">Illustrative wording <span class="sample-caveat">— starter language, not the LMA form</span></span>
          <pre class="sample-text">${s.illustrative}</pre>
        </div>
        <div class="field"><span class="field-label">Considerations</span><p>${s.annotation}</p></div>
        ${!!(s.relatedClauses?.length || s.relatedCases?.length) &&
          html`<div class="crosslinks no-print">
            ${(s.relatedClauses || []).map((id) => {
              const cl = clauseById[id];
              return cl ? html`<${LinkChip} tone="clause" label=${`§ ${cl.title}`} title="Open in Playbook" onClick=${() => navigate("playbook", id)} />` : null;
            })}
            ${(s.relatedCases || []).map((id) => {
              const cc = caseById[id];
              return cc ? html`<${LinkChip} tone="case" label=${`⚖ ${cc.title}`} title="Open in Case Law" onClick=${() => navigate("cases", id)} />` : null;
            })}
          </div>`}
        <${Notes} value=${ov.notes} onCommit=${(v) => patch(s.id, { notes: v })} placeholder="Your note on this clause…" />
      <//>
    </div>
  `;
}
