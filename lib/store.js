// lib/store.js — localStorage overlay store + export/import.
//
// Model: seed data is read-only / git-tracked. User state overlays by id.
//   frp:tasks   -> { "A3": { status, notes } }
//   frp:cases   -> { "case:petrofac": { read, notes } }
//   frp:clauses -> { "cl:mfn": { notes } }
//   frp:custom  -> { cases: [...], clauses: [...] }  (user-added, "living")
//
// Render = seed.map(x => ({ ...x, ...overlay[x.id] })), so updating seed
// never clobbers user notes.

import { useState, useCallback, useEffect } from "./preact.js";

const PREFIX = "frp:";
export const KEYS = {
  tasks: PREFIX + "tasks",
  cases: PREFIX + "cases",
  clauses: PREFIX + "clauses",
  custom: PREFIX + "custom",
  docs: PREFIX + "docs",
  ui: PREFIX + "ui",
};

// --- low-level read/write -------------------------------------------------

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw == null ? fallback : JSON.parse(raw);
  } catch (e) {
    console.warn("frp: failed to read", key, e);
    return fallback;
  }
}

function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn("frp: failed to write", key, e);
  }
  // notify subscribers in this tab (storage event only fires cross-tab)
  window.dispatchEvent(new CustomEvent("frp:changed", { detail: { key } }));
}

// --- overlay hook ---------------------------------------------------------
// Returns [overlay, patch(id, partial), replace(fullOverlay)].

export function useOverlay(key) {
  const [overlay, setOverlay] = useState(() => readJSON(key, {}));

  // keep in sync if another component/tab changes the same key
  useEffect(() => {
    const reload = (e) => {
      if (!e.detail || e.detail.key === key) setOverlay(readJSON(key, {}));
    };
    const onStorage = (e) => {
      if (e.key === key) setOverlay(readJSON(key, {}));
    };
    window.addEventListener("frp:changed", reload);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("frp:changed", reload);
      window.removeEventListener("storage", onStorage);
    };
  }, [key]);

  const patch = useCallback(
    (id, partial) => {
      const current = readJSON(key, {});
      // stamp updatedAt so cross-device sync can resolve conflicts per entry
      const next = {
        ...current,
        [id]: { ...(current[id] || {}), ...partial, updatedAt: Date.now() },
      };
      writeJSON(key, next);
      setOverlay(next);
    },
    [key]
  );

  const replace = useCallback(
    (full) => {
      writeJSON(key, full || {});
      setOverlay(full || {});
    },
    [key]
  );

  return [overlay, patch, replace];
}

// --- custom (user-added) entries -----------------------------------------

// Stored custom lists keep `deleted` tombstones (so a delete syncs across
// devices); the UI only ever sees the live entries.
function liveCustom(raw) {
  const c = raw || { cases: [], clauses: [] };
  return {
    cases: (c.cases || []).filter((x) => !x.deleted),
    clauses: (c.clauses || []).filter((x) => !x.deleted),
  };
}

export function useCustom() {
  const [custom, setCustom] = useState(() => liveCustom(readJSON(KEYS.custom, null)));

  useEffect(() => {
    const reload = (e) => {
      if (!e.detail || e.detail.key === KEYS.custom)
        setCustom(liveCustom(readJSON(KEYS.custom, null)));
    };
    window.addEventListener("frp:changed", reload);
    window.addEventListener("storage", reload);
    return () => {
      window.removeEventListener("frp:changed", reload);
      window.removeEventListener("storage", reload);
    };
  }, []);

  const addCase = useCallback((entry) => {
    const current = readJSON(KEYS.custom, { cases: [], clauses: [] });
    const next = { ...current, cases: [...(current.cases || []), { ...entry, updatedAt: Date.now() }] };
    writeJSON(KEYS.custom, next);
    setCustom(liveCustom(next));
  }, []);

  const addClause = useCallback((entry) => {
    const current = readJSON(KEYS.custom, { cases: [], clauses: [] });
    const next = { ...current, clauses: [...(current.clauses || []), { ...entry, updatedAt: Date.now() }] };
    writeJSON(KEYS.custom, next);
    setCustom(liveCustom(next));
  }, []);

  // Delete = tombstone (deleted:true + updatedAt) so the removal propagates via
  // sync instead of being resurrected by another device's stale copy.
  const remove = useCallback((kind, id) => {
    const current = readJSON(KEYS.custom, { cases: [], clauses: [] });
    const listKey = kind === "case" ? "cases" : "clauses";
    const next = {
      ...current,
      [listKey]: (current[listKey] || []).map((x) =>
        x.id === id ? { ...x, deleted: true, updatedAt: Date.now() } : x
      ),
    };
    writeJSON(KEYS.custom, next);
    setCustom(liveCustom(next));
  }, []);

  return { custom, addCase, addClause, remove };
}

// --- UI prefs (persisted, e.g. last tab / filters) ------------------------

export function usePref(name, fallback) {
  const [ui, setUi] = useState(() => readJSON(KEYS.ui, {}));
  const value = ui[name] === undefined ? fallback : ui[name];
  const set = useCallback(
    (v) => {
      const current = readJSON(KEYS.ui, {});
      const next = { ...current, [name]: v };
      writeJSON(KEYS.ui, next);
      setUi(next);
    },
    [name]
  );
  return [value, set];
}

// --- export / import ------------------------------------------------------

export function exportAll() {
  const dump = { app: "finance-law-refresher", version: 1, exportedAt: null, data: {} };
  // exportedAt filled by caller (Date is fine in the browser at runtime)
  for (const key of Object.values(KEYS)) {
    dump.data[key] = readJSON(key, null);
  }
  return dump;
}

export function importAll(dump, { merge = false } = {}) {
  if (!dump || !dump.data) throw new Error("Not a valid Finance Law Refresher backup.");
  for (const [key, incoming] of Object.entries(dump.data)) {
    if (!Object.values(KEYS).includes(key)) continue;
    if (incoming == null) continue;
    if (merge) {
      const current = readJSON(key, key === KEYS.custom ? { cases: [], clauses: [] } : {});
      let next;
      if (key === KEYS.custom) {
        // union by id
        const byId = (arr) => Object.fromEntries((arr || []).map((x) => [x.id, x]));
        next = {
          cases: Object.values({ ...byId(current.cases), ...byId(incoming.cases) }),
          clauses: Object.values({ ...byId(current.clauses), ...byId(incoming.clauses) }),
        };
      } else {
        next = { ...current };
        for (const [id, val] of Object.entries(incoming)) {
          next[id] = { ...(current[id] || {}), ...val };
        }
      }
      writeJSON(key, next);
    } else {
      writeJSON(key, incoming);
    }
  }
}

export function clearAll() {
  for (const key of Object.values(KEYS)) {
    localStorage.removeItem(key);
    window.dispatchEvent(new CustomEvent("frp:changed", { detail: { key } }));
  }
}
