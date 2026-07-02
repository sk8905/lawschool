// lib/sync.js — cross-device sync client.
//
// The app stays local-first: everything is read from / written to localStorage
// as before. This layer, when a backend is present (i.e. the app is served from
// the Cloudflare Worker behind Access), pushes the local overlay to the Worker
// and applies the server-merged result back. One round trip does both upload
// and download because the server merge is a union (per-entry last-write-wins),
// so pushing never deletes anything the other device added.
//
// When there is NO backend (e.g. opened from GitHub Pages or a file://), every
// call fails fast and the app simply runs local-only.

import { KEYS } from "./store.js";
import { mergeState, emptyState } from "./merge.js";

const API = "/api";
let applying = false;

// True while we're writing server data into localStorage, so the auto-push
// listener doesn't echo it straight back to the server.
export function isApplying() {
  return applying;
}

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw == null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function localBundle() {
  return {
    tasks: readJSON(KEYS.tasks, {}),
    cases: readJSON(KEYS.cases, {}),
    clauses: readJSON(KEYS.clauses, {}),
    custom: readJSON(KEYS.custom, { cases: [], clauses: [] }),
  };
}

function applyBundle(b) {
  const bundle = mergeState(emptyState(), b || {}); // normalise shape
  applying = true;
  try {
    localStorage.setItem(KEYS.tasks, JSON.stringify(bundle.tasks));
    localStorage.setItem(KEYS.cases, JSON.stringify(bundle.cases));
    localStorage.setItem(KEYS.clauses, JSON.stringify(bundle.clauses));
    localStorage.setItem(KEYS.custom, JSON.stringify(bundle.custom));
    for (const k of [KEYS.tasks, KEYS.cases, KEYS.clauses, KEYS.custom]) {
      window.dispatchEvent(new CustomEvent("frp:changed", { detail: { key: k } }));
    }
  } finally {
    applying = false;
  }
}

async function getJSON(path) {
  const r = await fetch(`${API}${path}`, { headers: { accept: "application/json" } });
  const ct = r.headers.get("content-type") || "";
  // A github.io / static host answers /api/* with an HTML 404 page — treat that
  // (and any non-2xx) as "no backend".
  if (!r.ok || !ct.includes("application/json")) throw new Error("no-backend");
  return r.json();
}

// Origins that never have the sync backend — skip the probe there so we don't
// log a harmless-but-noisy 404 in the console. Everywhere else (the Cloudflare
// domain, workers.dev, localhost dev) we probe normally.
function backendImpossible() {
  try {
    return (
      location.protocol === "file:" ||
      /(^|\.)github\.io$/i.test(location.hostname)
    );
  } catch {
    return true;
  }
}

// Does a sync backend exist, and who are we? Returns the email or throws.
export async function whoami() {
  if (backendImpossible()) throw new Error("no-backend");
  const { email } = await getJSON("/whoami");
  return email;
}

// Push local state, get the server-merged state back, apply it locally.
export async function syncNow() {
  const r = await fetch(`${API}/data`, {
    method: "PUT",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(localBundle()),
  });
  const ct = r.headers.get("content-type") || "";
  if (!r.ok || !ct.includes("application/json")) throw new Error("sync-failed");
  const { data } = await r.json();
  applyBundle(data);
  return data;
}

export const LOGOUT_URL = "/cdn-cgi/access/logout";
