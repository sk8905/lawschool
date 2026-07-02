// components/Shared.js — small shared UI building blocks.
import { html } from "../lib/preact.js";

export function ProgressBar({ value, max, color = "#2f6f4f", label }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return html`
    <div class="progress">
      <div class="progress-head">
        <span>${label}</span>
        <span class="progress-num">${value}/${max} · ${pct}%</span>
      </div>
      <div class="progress-track">
        <div class="progress-fill" style=${`width:${pct}%;background:${color}`}></div>
      </div>
    </div>
  `;
}

export function Chip({ children, tone = "default", title, onClick }) {
  return html`
    <span
      class=${`chip chip-${tone}${onClick ? " chip-click" : ""}`}
      title=${title || ""}
      onClick=${onClick}
      >${children}</span
    >
  `;
}

// A cross-link chip that navigates to another module via hash + selection.
export function LinkChip({ label, tone = "link", onClick, title }) {
  return html`<button class=${`chip chip-${tone} chip-btn`} title=${title || ""} onClick=${onClick}>${label}</button>`;
}

export function Empty({ children }) {
  return html`<div class="empty">${children}</div>`;
}

// Debounced-ish notes textarea that commits on blur (keeps localStorage writes sane).
import { useState, useEffect } from "../lib/preact.js";
export function Notes({ value, onCommit, placeholder }) {
  const [local, setLocal] = useState(value || "");
  useEffect(() => setLocal(value || ""), [value]);
  return html`
    <textarea
      class="notes"
      placeholder=${placeholder || "Your notes…"}
      value=${local}
      onInput=${(e) => setLocal(e.target.value)}
      onBlur=${() => onCommit(local)}
    ></textarea>
  `;
}

// Section that expands/collapses.
export function Accordion({ open, onToggle, header, children }) {
  return html`
    <div class=${`acc${open ? " acc-open" : ""}`}>
      <button class="acc-head" onClick=${onToggle}>
        <span class="acc-caret">${open ? "▾" : "▸"}</span>
        ${header}
      </button>
      ${open && html`<div class="acc-body">${children}</div>`}
    </div>
  `;
}
