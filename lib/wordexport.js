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
