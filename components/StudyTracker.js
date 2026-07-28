// components/StudyTracker.js — Module 1: the 12-week plan.
// Views: Kanban (by status), By week, By workstream. Progress bars per stream.
import { html, useMemo, useEffect } from "../lib/preact.js";
import { WORKSTREAMS, TASKS } from "../data/plan.js";
import { CASES } from "../data/cases.js";
import { CLAUSES } from "../data/playbook.js";
import { useOverlay, usePref, KEYS } from "../lib/store.js";
import { downloadPlanWord } from "../lib/wordexport.js";
import { ProgressBar, Chip, LinkChip, Notes, Accordion, Empty } from "./Shared.js";

const STATUSES = [
  { id: "todo", label: "To do" },
  { id: "doing", label: "In progress" },
  { id: "done", label: "Done" },
];

const wsById = Object.fromEntries(WORKSTREAMS.map((w) => [w.id, w]));
const caseById = Object.fromEntries(CASES.map((c) => [c.id, c]));
const clauseById = Object.fromEntries(CLAUSES.map((c) => [c.id, c]));

export function StudyTracker({ navigate, search, focusId, clearFocus }) {
  const [overlay, patch] = useOverlay(KEYS.tasks);
  const [view, setView] = usePref("planView", "week");
  const [streamFilter, setStreamFilter] = usePref("planStream", "all");

  // when arriving via a cross-link / global search, reveal and flash the task
  useEffect(() => {
    if (!focusId) return;
    setView("week");
    setStreamFilter("all");
    const el = document.getElementById(`task-${focusId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.classList.add("focus-flash");
      const t = setTimeout(() => el.classList.remove("focus-flash"), 1600);
      return () => clearTimeout(t);
    }
  }, [focusId]);

  const tasks = useMemo(
    () => TASKS.map((t) => ({ ...t, ...(overlay[t.id] || {}) })),
    [overlay]
  );

  const q = (search || "").trim().toLowerCase();
  const filtered = tasks.filter((t) => {
    if (streamFilter !== "all" && t.workstream !== streamFilter) return false;
    if (!q) return true;
    return (
      t.title.toLowerCase().includes(q) ||
      (t.detail || "").toLowerCase().includes(q) ||
      (t.resources || []).join(" ").toLowerCase().includes(q)
    );
  });

  const statusOf = (t) => t.status || "todo";
  const setStatus = (t, status) => patch(t.id, { status });
  const cycle = (t) => {
    const order = ["todo", "doing", "done"];
    const i = order.indexOf(statusOf(t));
    setStatus(t, order[(i + 1) % order.length]);
  };

  return html`
    <div class="module">
      <div class="module-head">
        <div>
          <h2>Study plan</h2>
          <p class="lede">The 12-week refresher across five parallel workstreams. Mark tasks as you go — progress persists in your browser.</p>
        </div>
        <div class="head-actions no-print">
          <button class="btn" onClick=${() => {
            const items = [...filtered]
              .sort((a, b) => a.workstream.localeCompare(b.workstream) || a.week - b.week)
              .map((t) => ({ group: `${t.workstream} — ${(wsById[t.workstream] || {}).title || ""}`, week: t.week, effort: t.effort, title: t.title, detail: t.detail, resources: t.resources }));
            downloadPlanWord("Law School — 12-Week Study Plan", items);
          }}>⬇ Word</button>
        </div>
      </div>

      ${ProgressPanel({ tasks })}

      <div class="toolbar">
        <div class="segmented">
          ${["week", "workstream", "kanban"].map(
            (v) => html`
              <button
                class=${`seg${view === v ? " seg-on" : ""}`}
                onClick=${() => setView(v)}
              >
                ${v === "week" ? "By week" : v === "workstream" ? "By workstream" : "Kanban"}
              </button>
            `
          )}
        </div>
        <select class="select" value=${streamFilter} onChange=${(e) => setStreamFilter(e.target.value)}>
          <option value="all">All workstreams</option>
          ${WORKSTREAMS.map((w) => html`<option value=${w.id}>${w.id} — ${w.short}</option>`)}
        </select>
      </div>

      ${filtered.length === 0
        ? html`<${Empty}>No tasks match your filter${q ? ` / search "${q}"` : ""}.<//>`
        : view === "kanban"
        ? KanbanView({ tasks: filtered, statusOf, setStatus, navigate })
        : view === "workstream"
        ? WorkstreamView({ tasks: filtered, statusOf, cycle, patch, navigate })
        : WeekView({ tasks: filtered, statusOf, cycle, patch, navigate })}
    </div>
  `;
}

function ProgressPanel({ tasks }) {
  const overall = { done: tasks.filter((t) => (t.status || "todo") === "done").length, total: tasks.length };
  return html`
    <div class="panel">
      <${ProgressBar}
        value=${overall.done}
        max=${overall.total}
        color="#333"
        label="Overall"
      />
      <div class="progress-grid">
        ${WORKSTREAMS.map((w) => {
          const ts = tasks.filter((t) => t.workstream === w.id);
          const done = ts.filter((t) => (t.status || "todo") === "done").length;
          return html`<${ProgressBar} value=${done} max=${ts.length} color=${w.color} label=${`${w.id} · ${w.short}`} />`;
        })}
      </div>
    </div>
  `;
}

function TaskCard({ task, statusOf, cycle, patch, navigate, showWeek = true }) {
  const w = wsById[task.workstream];
  const st = statusOf(task);
  return html`
    <div class=${`card task-${st}`} id=${`task-${task.id}`}>
      <div class="card-top">
        <div class="card-tags">
          <${Chip} tone="ws" title=${w.title}><span class="dot" style=${`background:${w.color}`}></span>${task.workstream}<//>
          ${showWeek && html`<${Chip} tone="muted">Week ${task.week}<//>`}
          <${Chip} tone="muted">${task.effort}h<//>
        </div>
        <button class=${`status-btn status-${st}`} onClick=${() => cycle(task)} title="Click to advance status">
          ${st === "done" ? "✓ Done" : st === "doing" ? "◐ In progress" : "○ To do"}
        </button>
      </div>
      <h3 class="card-title">${task.title}</h3>
      <p class="card-detail">${task.detail}</p>
      ${task.resources && task.resources.length > 0 &&
        html`<ul class="reslist">${task.resources.map((r) => html`<li>${r}</li>`)}</ul>`}
      ${!!(task.relatedCases?.length || task.relatedClauses?.length) &&
        html`<div class="crosslinks">
          ${(task.relatedCases || []).map((id) => {
            const c = caseById[id];
            return c
              ? html`<${LinkChip} tone="case" label=${`⚖ ${c.title}`} title="Open in Case Law" onClick=${() => navigate("cases", id)} />`
              : null;
          })}
          ${(task.relatedClauses || []).map((id) => {
            const c = clauseById[id];
            return c
              ? html`<${LinkChip} tone="clause" label=${`§ ${c.title}`} title="Open in Playbook" onClick=${() => navigate("playbook", id)} />`
              : null;
          })}
        </div>`}
      <${Notes} value=${task.notes} onCommit=${(v) => patch(task.id, { notes: v })} placeholder="Notes on this rep…" />
    </div>
  `;
}

function WeekView({ tasks, statusOf, cycle, patch, navigate }) {
  const weeks = [...new Set(tasks.map((t) => t.week))].sort((a, b) => a - b);
  return html`
    <div class="weeks">
      ${weeks.map(
        (wk) => html`
          <section class="week-block">
            <h3 class="week-head">Week ${wk}</h3>
            <div class="cardgrid">
              ${tasks
                .filter((t) => t.week === wk)
                .map((t) => html`<${TaskCard} task=${t} statusOf=${statusOf} cycle=${cycle} patch=${patch} navigate=${navigate} showWeek=${false} />`)}
            </div>
          </section>
        `
      )}
    </div>
  `;
}

function WorkstreamView({ tasks, statusOf, cycle, patch, navigate }) {
  return html`
    <div class="weeks">
      ${WORKSTREAMS.filter((w) => tasks.some((t) => t.workstream === w.id)).map(
        (w) => html`
          <section class="week-block">
            <div class="ws-head">
              <h3><span class="dot dot-lg" style=${`background:${w.color}`}></span>${w.id} — ${w.title}</h3>
              <p class="ws-summary">${w.summary}</p>
            </div>
            <div class="cardgrid">
              ${tasks
                .filter((t) => t.workstream === w.id)
                .sort((a, b) => a.week - b.week)
                .map((t) => html`<${TaskCard} task=${t} statusOf=${statusOf} cycle=${cycle} patch=${patch} navigate=${navigate} />`)}
            </div>
          </section>
        `
      )}
    </div>
  `;
}

function KanbanView({ tasks, statusOf, setStatus, navigate }) {
  return html`
    <div class="kanban">
      ${STATUSES.map(
        (col) => html`
          <div class="kcol">
            <h3 class="kcol-head">${col.label} <span class="kcount">${tasks.filter((t) => statusOf(t) === col.id).length}</span></h3>
            <div class="kcol-body">
              ${tasks
                .filter((t) => statusOf(t) === col.id)
                .map((t) => {
                  const w = wsById[t.workstream];
                  return html`
                    <div class="kcard">
                      <div class="card-tags">
                        <${Chip} tone="ws"><span class="dot" style=${`background:${w.color}`}></span>${t.workstream}<//>
                        <${Chip} tone="muted">Wk ${t.week}<//>
                      </div>
                      <p class="kcard-title">${t.title}</p>
                      <div class="kmove">
                        ${STATUSES.filter((s) => s.id !== col.id).map(
                          (s) => html`<button class="kmove-btn" onClick=${() => setStatus(t, s.id)}>→ ${s.label}</button>`
                        )}
                      </div>
                    </div>
                  `;
                })}
            </div>
          </div>
        `
      )}
    </div>
  `;
}
