// lib/merge.js — pure state-merge, shared by the browser client AND the Worker.
//
// Cross-device conflict resolution is per-entry last-write-wins on `updatedAt`
// (epoch ms). No imports and no browser/Worker-only APIs, so the exact same
// merge runs on both sides — the client can merge optimistically and the server
// is the source of truth.
//
// State shape:
//   { tasks:   { id -> {..., updatedAt} },
//     cases:   { id -> {..., updatedAt} },
//     clauses: { id -> {..., updatedAt} },
//     custom:  { cases: [ {id, ..., updatedAt, deleted?} ], clauses: [ ... ] } }

const MAP_KEYS = ["tasks", "cases", "clauses"];

function mergeMap(a, b) {
  const out = { ...(a || {}) };
  for (const [id, be] of Object.entries(b || {})) {
    const ae = out[id];
    if (!ae || (be.updatedAt || 0) >= (ae.updatedAt || 0)) out[id] = be;
  }
  return out;
}

// Union by id; the entry with the newer updatedAt wins. `deleted` tombstones are
// preserved (and win when newer) so a delete on one device propagates rather
// than being resurrected by a stale copy on another.
function mergeList(a, b) {
  const byId = new Map();
  for (const item of a || []) if (item && item.id) byId.set(item.id, item);
  for (const item of b || []) {
    if (!item || !item.id) continue;
    const ex = byId.get(item.id);
    if (!ex || (item.updatedAt || 0) >= (ex.updatedAt || 0)) byId.set(item.id, item);
  }
  return Array.from(byId.values());
}

export function emptyState() {
  return { tasks: {}, cases: {}, clauses: {}, custom: { cases: [], clauses: [] } };
}

export function mergeState(a, b) {
  const out = {};
  for (const k of MAP_KEYS) out[k] = mergeMap(a && a[k], b && b[k]);
  out.custom = {
    cases: mergeList(a && a.custom && a.custom.cases, b && b.custom && b.custom.cases),
    clauses: mergeList(a && a.custom && a.custom.clauses, b && b.custom && b.custom.clauses),
  };
  return out;
}
