// worker/index.js — Cloudflare Worker: serves the static app AND the sync API.
//
// Auth is handled entirely by Cloudflare Access sitting in front of this Worker
// (emailed one-time PIN, restricted by your Access policy to allowed emails).
// We additionally verify the Access JWT here and key stored data to the
// authenticated email.
//
// Routes:
//   GET  /api/whoami  -> { email }                     (who Access says you are)
//   GET  /api/data    -> { data }                       (your stored state)
//   PUT  /api/data    -> merge(body) into stored, returns { data }
//   *                 -> static asset (the SPA), via the ASSETS binding
//
// Bindings / vars (see wrangler.toml):
//   ASSETS              static assets binding
//   FRP_KV              KV namespace for stored state
//   ALLOWED_EMAIL       comma-separated allow-list (belt-and-braces; Access
//                       already enforces this)
//   ACCESS_TEAM_DOMAIN  e.g. yourteam.cloudflareaccess.com
//   ACCESS_AUD          the Access application's Audience (AUD) tag

import { mergeState, emptyState } from "../lib/merge.js";
import { verifyAccessJwt } from "./access.js";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/api/")) {
      return handleApi(request, env, url).catch((e) =>
        json({ error: "server-error", detail: String((e && e.message) || e) }, 500)
      );
    }
    // everything else is the static SPA
    return env.ASSETS.fetch(request);
  },
};

async function handleApi(request, env, url) {
  let email;
  try {
    email = await authenticate(request, env);
  } catch (e) {
    return json({ error: "unauthorized", detail: String((e && e.message) || e) }, 401);
  }
  const key = `user:${email}`;

  if (url.pathname === "/api/whoami") {
    return json({ email });
  }

  if (url.pathname === "/api/data") {
    if (request.method === "GET") {
      const stored = (await env.FRP_KV.get(key, "json")) || emptyState();
      return json({ data: stored });
    }
    if (request.method === "PUT") {
      let incoming;
      try {
        incoming = await request.json();
      } catch {
        return json({ error: "bad-json" }, 400);
      }
      const stored = (await env.FRP_KV.get(key, "json")) || emptyState();
      const merged = mergeState(stored, incoming || {});
      await env.FRP_KV.put(key, JSON.stringify(merged));
      return json({ data: merged });
    }
    return json({ error: "method-not-allowed" }, 405);
  }

  return json({ error: "not-found" }, 404);
}

async function authenticate(request, env) {
  const token =
    request.headers.get("Cf-Access-Jwt-Assertion") ||
    getCookie(request, "CF_Authorization");
  const payload = await verifyAccessJwt(token, {
    teamDomain: env.ACCESS_TEAM_DOMAIN,
    aud: env.ACCESS_AUD,
  });
  const email = String(payload.email || "").toLowerCase();
  if (!email) throw new Error("no-email-claim");

  const allowed = String(env.ALLOWED_EMAIL || "")
    .toLowerCase()
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (allowed.length && !allowed.includes(email)) throw new Error("email-not-allowed");

  return email;
}

function getCookie(request, name) {
  const c = request.headers.get("Cookie") || "";
  const m = c.match(new RegExp("(?:^|;\\s*)" + name + "=([^;]+)"));
  return m ? decodeURIComponent(m[1]) : null;
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}
