// app.js — shell: hash router, tabs, global search, dashboard, export/import.
import { html, render, useState, useEffect, useMemo, useCallback } from "./lib/preact.js";

import { WORKSTREAMS, TASKS } from "./data/plan.js";
import { CASES } from "./data/cases.js";
import { CLAUSES } from "./data/playbook.js";
import { DOCUMENTS } from "./data/documents.js";
import { useOverlay, useCustom, KEYS, exportAll, importAll, clearAll } from "./lib/store.js";
import { whoami, syncNow, isApplying, LOGOUT_URL } from "./lib/sync.js";
import { ProgressBar, Chip } from "./components/Shared.js";
import { StudyTracker } from "./components/StudyTracker.js";
import { CaseTracker } from "./components/CaseTracker.js";
import { Playbook } from "./components/Playbook.js";
import { DocViewer } from "./components/DocViewer.js";

const TABS = [
  { id: "dashboard", label: "Dashboard" },
  { id: "plan", label: "Study plan" },
  { id: "cases", label: "Case law" },
  { id: "playbook", label: "Playbook" },
  { id: "documents", label: "Documents" },
];

// 22px line icons (currentColor) for the bottom tab bar — icon over label.
const svg = (paths) =>
  html`<svg class="tabbar-icon" viewBox="0 0 24 24" width="22" height="22" fill="none"
    stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
const TAB_ICONS = {
  dashboard: () => svg(html`<rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />`),
  plan: () => svg(html`<rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 4h6v3H9z" /><path d="M8.5 12.5l1.8 1.8 3.7-4" />`),
  cases: () => svg(html`<path d="M12 4v16" /><path d="M6 20h12" /><path d="M5 7h14" /><path d="M5 7l-2.4 5a2.6 2.6 0 004.8 0z" /><path d="M19 7l-2.4 5a2.6 2.6 0 004.8 0z" />`),
  playbook: () => svg(html`<path d="M12 7c-2-1.3-5-1.3-8 0v11c3-1.3 6-1.3 8 0 2-1.3 5-1.3 8 0V7c-3-1.3-6-1.3-8 0z" /><path d="M12 7v11" />`),
  documents: () => svg(html`<path d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z" /><path d="M14 3v5h5" /><path d="M9 13h6M9 17h6" />`),
};

function parseHash() {
  // #plan  or  #cases/case:petrofac  (tab / focusId)
  const raw = (location.hash || "#dashboard").replace(/^#/, "");
  const [tab, ...rest] = raw.split("/");
  return { tab: TABS.some((t) => t.id === tab) ? tab : "dashboard", focusId: rest.join("/") || null };
}

function App() {
  const [route, setRoute] = useState(parseHash());
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const onHash = () => setRoute(parseHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // global search: Cmd/Ctrl+K toggles, Esc closes
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        setShowSearch((s) => !s);
      } else if (e.key === "Escape") {
        setShowSearch(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // navigate(tab, id?) — used by cross-link chips
  const navigate = useCallback((tab, id) => {
    location.hash = id ? `${tab}/${id}` : tab;
  }, []);

  const clearFocus = useCallback(() => {
    if (route.focusId) {
      history.replaceState(null, "", `#${route.tab}`);
      setRoute({ tab: route.tab, focusId: null });
    }
  }, [route]);

  const tab = route.tab;
  const sync = useSync();

  return html`
    <div class="app">
      <header class="topbar no-print">
        <div class="brand" onClick=${() => navigate("dashboard")}>
          <img class="brand-mark" src="assets/logo.svg" alt="Law School logo" width="34" height="34" />
          <div>
            <div class="brand-title">Law School</div>
            <div class="brand-sub">Study · Case law · Playbook</div>
          </div>
        </div>
        <nav class="tabs">
          ${TABS.map((t) => html`<button class=${`tab${tab === t.id ? " tab-on" : ""}`} onClick=${() => navigate(t.id)}>${t.label}</button>`)}
        </nav>
        <div class="topbar-right">
          <button class="gsearch-btn" onClick=${() => setShowSearch(true)} title="Search everything (Ctrl/⌘ K)">
            <span>Search all</span><span class="kbd">⌘K</span>
          </button>
          ${tab !== "dashboard" &&
            html`<input class="search" type="search" placeholder="Filter ${tab}…" value=${search} onInput=${(e) => setSearch(e.target.value)} />`}
        </div>
      </header>

      <main class="main">
        ${tab === "dashboard" && html`<${Dashboard} navigate=${navigate} />`}
        ${tab === "plan" && html`<${StudyTracker} navigate=${navigate} search=${search} focusId=${route.focusId} clearFocus=${clearFocus} />`}
        ${tab === "cases" && html`<${CaseTracker} navigate=${navigate} search=${search} focusId=${route.focusId} clearFocus=${clearFocus} />`}
        ${tab === "playbook" && html`<${Playbook} navigate=${navigate} search=${search} focusId=${route.focusId} clearFocus=${clearFocus} />`}
        ${tab === "documents" && html`<${DocViewer} navigate=${navigate} search=${search} focusId=${route.focusId} clearFocus=${clearFocus} />`}
      </main>

      <footer class="footer no-print">
        <${SyncStatus} sync=${sync} />
        <${DataControls} />
      </footer>

      <nav class="tabbar no-print">
        ${TABS.map(
          (t) => html`
            <button
              class=${`tabbar-item${tab === t.id ? " tabbar-on" : ""}`}
              onClick=${() => navigate(t.id)}
              aria-label=${t.label}
              aria-current=${tab === t.id ? "page" : undefined}
            >
              ${(TAB_ICONS[t.id] || (() => null))()}
              <span class="tabbar-label">${t.label}</span>
            </button>
          `
        )}
      </nav>

      ${showSearch && html`<${GlobalSearch} onClose=${() => setShowSearch(false)} navigate=${navigate} />`}
    </div>
  `;
}

function GlobalSearch({ onClose, navigate }) {
  const [q, setQ] = useState("");
  const query = q.trim().toLowerCase();
  const go = (tab, id) => {
    onClose();
    navigate(tab, id);
  };
  const match = (hay) => hay.toLowerCase().includes(query);
  const taskHits = !query
    ? []
    : TASKS.filter((t) => match(`${t.title} ${t.detail} ${(t.resources || []).join(" ")}`)).slice(0, 6);
  const caseHits = !query
    ? []
    : CASES.filter((c) => match(`${c.title} ${c.citation} ${c.holding || ""} ${c.whyItMatters || ""} ${(c.category || []).join(" ")}`)).slice(0, 6);
  const clauseHits = !query
    ? []
    : CLAUSES.filter((c) => match(`${c.title} ${c.section} ${c.purpose} ${c.borrowerAsk} ${c.lenderPushback} ${c.marketPosition} ${c.draftingNotes}`)).slice(0, 6);
  const docHits = !query
    ? []
    : DOCUMENTS.flatMap((d) => d.sections.map((s) => ({ ...s, docShort: d.short })))
        .filter((s) => match(`${s.no} ${s.title} ${s.group} ${s.purpose} ${s.annotation} ${s.illustrative}`))
        .slice(0, 6);
  const total = taskHits.length + caseHits.length + clauseHits.length + docHits.length;
  const openFirst = () => {
    if (taskHits[0]) go("plan", taskHits[0].id);
    else if (caseHits[0]) go("cases", caseHits[0].id);
    else if (clauseHits[0]) go("playbook", clauseHits[0].id);
    else if (docHits[0]) go("documents", docHits[0].id);
  };
  return html`
    <div class="gsearch-backdrop" onClick=${onClose}>
      <div class="gsearch" onClick=${(e) => e.stopPropagation()}>
        <input
          class="gsearch-input"
          autofocus
          placeholder="Search tasks, cases and clauses…"
          value=${q}
          onInput=${(e) => setQ(e.target.value)}
          onKeyDown=${(e) => { if (e.key === "Enter") openFirst(); }}
        />
        <div class="gsearch-results">
          ${!query && html`<div class="gsearch-hint">Search across the study plan, case law and playbook. Press <b>Esc</b> to close.</div>`}
          ${query && total === 0 && html`<div class="gsearch-hint">No matches for "${q}".</div>`}
          ${taskHits.length > 0 &&
            html`<div class="gsearch-group">
              <div class="gsearch-grouphead">Study plan · ${taskHits.length}</div>
              ${taskHits.map((t) => html`<button class="gsearch-row" onClick=${() => go("plan", t.id)}>
                <span class="gsearch-badge badge-task">${t.id}</span>
                <span class="gsearch-rowtitle">${t.title}</span>
                <span class="gsearch-rowsub">Wk ${t.week}</span>
              </button>`)}
            </div>`}
          ${caseHits.length > 0 &&
            html`<div class="gsearch-group">
              <div class="gsearch-grouphead">Case law · ${caseHits.length}</div>
              ${caseHits.map((c) => html`<button class="gsearch-row" onClick=${() => go("cases", c.id)}>
                <span class="gsearch-badge badge-case">⚖</span>
                <span class="gsearch-rowtitle">${c.title}</span>
                <span class="gsearch-rowsub">${c.citation}</span>
              </button>`)}
            </div>`}
          ${clauseHits.length > 0 &&
            html`<div class="gsearch-group">
              <div class="gsearch-grouphead">Playbook · ${clauseHits.length}</div>
              ${clauseHits.map((c) => html`<button class="gsearch-row" onClick=${() => go("playbook", c.id)}>
                <span class="gsearch-badge badge-clause">§</span>
                <span class="gsearch-rowtitle">${c.title}</span>
                <span class="gsearch-rowsub">${c.section}</span>
              </button>`)}
            </div>`}
          ${docHits.length > 0 &&
            html`<div class="gsearch-group">
              <div class="gsearch-grouphead">Documents · ${docHits.length}</div>
              ${docHits.map((s) => html`<button class="gsearch-row" onClick=${() => go("documents", s.id)}>
                <span class="gsearch-badge badge-doc">¶</span>
                <span class="gsearch-rowtitle">${s.title}</span>
                <span class="gsearch-rowsub">${s.docShort} · Cl ${s.no}</span>
              </button>`)}
            </div>`}
        </div>
        <div class="gsearch-foot"><span>↵ open first result · Esc close</span></div>
      </div>
    </div>
  `;
}

function Dashboard({ navigate }) {
  const [tasks] = useOverlay(KEYS.tasks);
  const [cases] = useOverlay(KEYS.cases);
  const { custom } = useCustom();

  const taskRows = TASKS.map((t) => ({ ...t, ...(tasks[t.id] || {}) }));
  const doneTasks = taskRows.filter((t) => (t.status || "todo") === "done").length;
  const doingTasks = taskRows.filter((t) => t.status === "doing").length;

  const allCases = [...CASES, ...(custom.cases || [])];
  const readCases = allCases.filter((c) => cases[c.id]?.read).length;
  const priority = CASES.filter((c) => (c.category || []).includes("Restructuring / Part 26A"));
  const priorityRead = priority.filter((c) => cases[c.id]?.read).length;

  const clauseCount = CLAUSES.length + (custom.clauses || []).length;

  // next up: earliest week with an unfinished task
  const nextTasks = taskRows
    .filter((t) => (t.status || "todo") !== "done")
    .sort((a, b) => a.week - b.week || a.workstream.localeCompare(b.workstream))
    .slice(0, 5);

  const wsById = Object.fromEntries(WORKSTREAMS.map((w) => [w.id, w]));

  return html`
    <div class="module">
      <div class="module-head">
        <div>
          <h2>Dashboard</h2>
        </div>
      </div>

      <div class="stat-row">
        <button class="stat" onClick=${() => navigate("plan")}>
          <div class="stat-num">${doneTasks}<span class="stat-den">/${taskRows.length}</span></div>
          <div class="stat-label">Tasks complete</div>
          <div class="stat-sub">${doingTasks} in progress</div>
        </button>
        <button class="stat" onClick=${() => navigate("cases")}>
          <div class="stat-num">${readCases}<span class="stat-den">/${allCases.length}</span></div>
          <div class="stat-label">Cases read</div>
          <div class="stat-sub">${priorityRead}/${priority.length} Part 26A cluster</div>
        </button>
        <button class="stat" onClick=${() => navigate("playbook")}>
          <div class="stat-num">${clauseCount}</div>
          <div class="stat-label">Playbook clauses</div>
          <div class="stat-sub">across 5 document types</div>
        </button>
      </div>

      <div class="dash-cols">
        <section class="panel">
          <h3 class="panel-title">Progress by workstream</h3>
          <${ProgressBar} value=${doneTasks} max=${taskRows.length} color="#333" label="Overall" />
          <div class="progress-grid">
            ${WORKSTREAMS.map((w) => {
              const ts = taskRows.filter((t) => t.workstream === w.id);
              const d = ts.filter((t) => (t.status || "todo") === "done").length;
              return html`<${ProgressBar} value=${d} max=${ts.length} color=${w.color} label=${`${w.id} · ${w.short}`} />`;
            })}
          </div>
        </section>

        <section class="panel">
          <h3 class="panel-title">Next up</h3>
          ${nextTasks.length === 0
            ? html`<p class="all-done">Every task complete. Time to originate. ✓</p>`
            : html`<ul class="nextlist">
                ${nextTasks.map((t) => {
                  const w = wsById[t.workstream];
                  return html`<li onClick=${() => navigate("plan")}>
                    <span class="dot" style=${`background:${w.color}`}></span>
                    <span class="next-wk">Wk ${t.week}</span>
                    <span class="next-title">${t.title}</span>
                    ${t.status === "doing" && html`<${Chip} tone="muted">in progress<//>`}
                  </li>`;
                })}
              </ul>`}
        </section>
      </div>

      <section class="panel">
        <h3 class="panel-title">The five workstreams</h3>
        <div class="ws-cards">
          ${WORKSTREAMS.map(
            (w) => html`<div class="ws-card" onClick=${() => navigate("plan")}>
              <div class="ws-card-head"><span class="dot dot-lg" style=${`background:${w.color}`}></span><strong>${w.id} — ${w.title}</strong></div>
              <p>${w.summary}</p>
            </div>`
          )}
        </div>
      </section>
    </div>
  `;
}

function DataControls() {
  const [msg, setMsg] = useState("");

  const doExport = () => {
    const dump = exportAll();
    dump.exportedAt = new Date().toISOString();
    const blob = new Blob([JSON.stringify(dump, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const stamp = dump.exportedAt.slice(0, 19).replace(/[:T]/g, "-");
    a.href = url;
    a.download = `finance-law-refresher-${stamp}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setMsg("Exported ✓");
    setTimeout(() => setMsg(""), 2500);
  };

  const doImport = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const dump = JSON.parse(reader.result);
        importAll(dump, { merge: true });
        setMsg("Imported ✓ (merged)");
        setTimeout(() => setMsg(""), 2500);
      } catch (err) {
        setMsg("Import failed: " + err.message);
        setTimeout(() => setMsg(""), 4000);
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const doReset = () => {
    if (confirm("Clear all your progress and notes in this browser? Seed content is unaffected. Consider exporting a backup first.")) {
      clearAll();
      setMsg("Cleared");
      setTimeout(() => setMsg(""), 2000);
    }
  };

  return html`
    <div class="datactl">
      ${msg && html`<span class="datamsg">${msg}</span>`}
      <button class="btn btn-sm" onClick=${doExport}>Export backup</button>
      <label class="btn btn-sm file-btn">Import<input type="file" accept="application/json,.json" onChange=${doImport} /></label>
      <button class="btn btn-sm btn-ghost" onClick=${doReset}>Reset</button>
    </div>
  `;
}

// --- cross-device sync ----------------------------------------------------

let _changeTimer = null;

function useSync() {
  // mode: checking | local | syncing | synced | error
  const [state, setState] = useState({ mode: "checking", email: null, at: 0 });

  const run = useCallback(async () => {
    setState((s) => (s.email ? { ...s, mode: "syncing" } : s));
    try {
      await syncNow();
      setState((s) => ({ ...s, mode: "synced", at: Date.now() }));
    } catch {
      setState((s) => ({ ...s, mode: "error" }));
    }
  }, []);

  // detect backend + initial sync
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const email = await whoami();
        if (!alive) return;
        setState({ mode: "syncing", email, at: 0 });
        await run();
      } catch {
        if (alive) setState({ mode: "local", email: null, at: 0 });
      }
    })();
    return () => {
      alive = false;
    };
  }, [run]);

  // push local edits (debounced) + pull other devices on focus
  useEffect(() => {
    if (!state.email) return;
    const onChange = () => {
      if (isApplying()) return;
      clearTimeout(_changeTimer);
      _changeTimer = setTimeout(run, 1500);
    };
    const onFocus = () => run();
    window.addEventListener("frp:changed", onChange);
    window.addEventListener("focus", onFocus);
    return () => {
      window.removeEventListener("frp:changed", onChange);
      window.removeEventListener("focus", onFocus);
      clearTimeout(_changeTimer);
    };
  }, [state.email, run]);

  return { ...state, run };
}

function SyncStatus({ sync }) {
  if (sync.mode === "checking") {
    return html`<span class="syncbar"><span class="syncdot dot-checking"></span>Connecting…</span>`;
  }
  if (sync.mode === "local") {
    return html`<span class="syncbar">Local-first · nothing leaves this browser. Progress is saved here; use Export to back up or move devices.</span>`;
  }
  const label =
    sync.mode === "syncing" ? "Syncing…" : sync.mode === "error" ? "Sync error" : "Synced";
  const dotClass =
    sync.mode === "syncing" ? "dot-syncing" : sync.mode === "error" ? "dot-error" : "dot-synced";
  return html`
    <span class="syncbar">
      <span class=${`syncdot ${dotClass}`}></span>
      <strong>${label}</strong>
      <span class="syncemail" title="Signed in via Cloudflare Access">${sync.email}</span>
      <button class="btn btn-sm btn-ghost" onClick=${sync.run}>Sync now</button>
      <a class="btn btn-sm btn-ghost" href=${LOGOUT_URL}>Sign out</a>
    </span>
  `;
}

render(html`<${App} />`, document.getElementById("root"));
