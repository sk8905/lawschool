// lib/wordexport.js — export a model document as a Word-openable file.
//
// Zero-dependency: builds a Word-compatible HTML document and downloads it with a
// .doc extension and the application/msword MIME type. Word (and Google Docs)
// open and edit it natively — no library, works offline.

function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function documentToWordHtml(doc) {
  let body = "";
  let lastGroup = null;
  for (const s of doc.sections) {
    if (s.group !== lastGroup) {
      body += `<h2 class=grp>${esc(s.group)}</h2>`;
      lastGroup = s.group;
    }
    body += `<h3 class=cl>Clause ${esc(s.no)} &mdash; ${esc(s.title)}</h3>`;
    body += `<p class=ill>${esc(s.illustrative)}</p>`;
    body += `<p class=note><b>Purpose.</b> ${esc(s.purpose)}</p>`;
    body += `<p class=note><b>Considerations.</b> ${esc(s.annotation)}</p>`;
  }
  return `<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head><meta charset='utf-8'><title>${esc(doc.title)}</title>
<style>
  body { font-family: Georgia, 'Times New Roman', serif; font-size: 11pt; line-height: 1.4; color: #111; }
  h1 { font-size: 17pt; }
  h2.grp { font-size: 12pt; color: #2f4a6f; border-bottom: 1px solid #999; margin: 18pt 0 6pt; }
  h3.cl { font-size: 11.5pt; margin: 10pt 0 2pt; }
  p.ill { font-family: Consolas, 'Courier New', monospace; font-size: 10pt; background: #f4f6f8; border-left: 3px solid #2f4a6f; padding: 6pt 8pt; margin: 4pt 0; }
  p.note { font-size: 10pt; color: #333; margin: 2pt 0; }
  p.disc { font-size: 9pt; color: #6b5a2a; border: 1px solid #e8dcbe; background: #fbf6ea; padding: 8pt; margin-bottom: 12pt; }
</style></head>
<body>
  <h1>${esc(doc.title)}</h1>
  <p class=disc><b>Illustrative study model, not the LMA form.</b> Original drafting in an LMA/market style for learning and reference &mdash; not the LMA's copyrighted document and not a precedent to run a deal on. For live transactions use your firm's actual LMA documents and Practical Law / LexisNexis annotations.</p>
  <p>${esc(doc.summary)}</p>
  ${body}
</body></html>`;
}

// Playbook export — `clauses` each carry {section, title, purpose, borrowerAsk,
// lenderPushback, marketPosition, draftingNotes, wording?}.
export function playbookToWordHtml(title, clauses) {
  let body = "";
  for (const c of clauses) {
    body += `<h3 class=cl>${esc(c.section)} &mdash; ${esc(c.title)}</h3>`;
    body += `<p class=note><b>Purpose.</b> ${esc(c.purpose)}</p>`;
    body += `<table class=pb width='100%'><tr>`;
    body += `<td width='50%' style='vertical-align:top;padding:4pt;background:#f5f7fb'><b>Borrower ask.</b> ${esc(c.borrowerAsk)}</td>`;
    body += `<td width='50%' style='vertical-align:top;padding:4pt;background:#fdf8ef'><b>Lender pushback.</b> ${esc(c.lenderPushback)}</td>`;
    body += `</tr></table>`;
    body += `<p class=note><b>Market position.</b> ${esc(c.marketPosition)}</p>`;
    body += `<p class=note><b>Drafting notes.</b> ${esc(c.draftingNotes)}</p>`;
    if (c.wording) body += `<p class=ill>${esc(c.wording)}</p>`;
  }
  return `<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head><meta charset='utf-8'><title>${esc(title)}</title>
<style>
  body { font-family: Georgia, 'Times New Roman', serif; font-size: 11pt; line-height: 1.4; color: #111; }
  h1 { font-size: 17pt; }
  h3.cl { font-size: 11.5pt; color: #2f4a6f; margin: 12pt 0 2pt; }
  p.ill { font-family: Consolas, 'Courier New', monospace; font-size: 10pt; background: #f4f6f8; border-left: 3px solid #2f4a6f; padding: 6pt 8pt; margin: 4pt 0; }
  p.note { font-size: 10pt; color: #333; margin: 2pt 0; }
  p.disc { font-size: 9pt; color: #6b5a2a; border: 1px solid #e8dcbe; background: #fbf6ea; padding: 8pt; margin-bottom: 12pt; }
  table.pb { border-collapse: collapse; margin: 4pt 0; font-size: 10pt; }
</style></head>
<body>
  <h1>${esc(title)}</h1>
  <p class=disc><b>Illustrative study aid.</b> Original commentary and starter wording in an LMA/market style &mdash; not the LMA's forms and not a precedent. For live transactions use your firm's actual documents and Practical Law / LexisNexis annotations.</p>
  ${body}
</body></html>`;
}

function triggerDownload(html, filename) {
  const blob = new Blob(["﻿", html], { type: "application/msword" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename.replace(/[^\w\- ]+/g, "").trim()}.doc`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function downloadPlaybookWord(title, clauses) {
  triggerDownload(playbookToWordHtml(title, clauses), title);
}

// shared wrapper for the case-law and study-plan exports
function baseHtml(title, disc, extraCss, body) {
  return `<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head><meta charset='utf-8'><title>${esc(title)}</title>
<style>
  body { font-family: Georgia, 'Times New Roman', serif; font-size: 11pt; line-height: 1.4; color: #111; }
  h1 { font-size: 17pt; }
  h2.grp { font-size: 12pt; color: #2f4a6f; border-bottom: 1px solid #999; margin: 18pt 0 6pt; }
  h3.cl { font-size: 11.5pt; margin: 10pt 0 2pt; }
  p.note { font-size: 10pt; color: #333; margin: 2pt 0; }
  p.disc { font-size: 9pt; color: #6b5a2a; border: 1px solid #e8dcbe; background: #fbf6ea; padding: 8pt; margin-bottom: 12pt; }
  ul { font-size: 10pt; margin: 2pt 0 6pt 18pt; }
  ${extraCss}
</style></head>
<body>
  <h1>${esc(title)}</h1>
  <p class=disc>${esc(disc)}</p>
  ${body}
</body></html>`;
}

// cases: array of {title, citation, court, date, category[], holding, whyItMatters}
export function casesToWordHtml(title, cases) {
  let body = "";
  for (const c of cases) {
    const meta = [c.citation, c.court && c.court !== "—" ? c.court : null, c.date || null, (c.category || []).join(", ")]
      .filter(Boolean)
      .map(esc)
      .join(" &middot; ");
    body += `<h3 class=cl>${esc(c.title)}</h3>`;
    body += `<p class=cite>${meta}</p>`;
    if (c.holding) body += `<p class=note><b>Holding.</b> ${esc(c.holding)}</p>`;
    if (c.whyItMatters) body += `<p class=note><b>Why it matters.</b> ${esc(c.whyItMatters)}</p>`;
  }
  return baseHtml(
    title,
    "Illustrative study aid — case summaries prepared for this refresher; verify against the law reports before relying on them.",
    "p.cite { font-size: 9.5pt; color: #666; margin: 0 0 3pt; }",
    body
  );
}

export function downloadCasesWord(title, cases) {
  triggerDownload(casesToWordHtml(title, cases), title);
}

// tasks: array of {group, week, effort, title, detail, resources[]}
export function planToWordHtml(title, tasks) {
  let body = "";
  let lastGroup = null;
  for (const t of tasks) {
    if (t.group !== lastGroup) {
      body += `<h2 class=grp>${esc(t.group)}</h2>`;
      lastGroup = t.group;
    }
    body += `<h3 class=cl>Week ${esc(t.week)} &middot; ${esc(t.title)} <span style='font-weight:normal;color:#777'>(${esc(t.effort)}h)</span></h3>`;
    if (t.detail) body += `<p class=note>${esc(t.detail)}</p>`;
    if (t.resources && t.resources.length) body += `<ul>${t.resources.map((r) => `<li>${esc(r)}</li>`).join("")}</ul>`;
  }
  return baseHtml(title, "Illustrative 12-week study plan prepared for this refresher.", "", body);
}

export function downloadPlanWord(title, tasks) {
  triggerDownload(planToWordHtml(title, tasks), title);
}

export function downloadWord(doc) {
  const html = documentToWordHtml(doc);
  // BOM helps Word detect UTF-8
  const blob = new Blob(["﻿", html], { type: "application/msword" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${doc.title.replace(/[^\w\- ]+/g, "").trim()}.doc`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
