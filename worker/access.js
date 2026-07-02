// worker/access.js — verify a Cloudflare Access application JWT.
//
// Access sits in front of this Worker and, for every allowed request, injects a
// signed JWT in the `Cf-Access-Jwt-Assertion` header (also mirrored in the
// `CF_Authorization` cookie). We verify it here as defence-in-depth so the API
// is safe even if someone reaches the Worker on a hostname that Access doesn't
// cover (e.g. the raw workers.dev URL).
//
// Verification: RS256 signature against the team's JWKS, plus `aud`, `iss`
// and expiry checks. Uses only Web Crypto / fetch, so it runs in Workers
// (and in Node 18+ for tests).

let cache = { url: null, keys: null, at: 0 };
const JWKS_TTL_MS = 3600_000; // 1h

export async function verifyAccessJwt(token, opts) {
  const { teamDomain, aud, fetchImpl = fetch, now = Date.now } = opts || {};
  if (!token) throw new Error("no-access-token");
  const parts = token.split(".");
  if (parts.length !== 3) throw new Error("malformed-jwt");
  const [h64, p64, s64] = parts;

  const header = JSON.parse(b64urlToStr(h64));
  const payload = JSON.parse(b64urlToStr(p64));
  if (header.alg !== "RS256") throw new Error("unexpected-alg");

  const t = Math.floor(now() / 1000);
  if (payload.exp && t > payload.exp + 10) throw new Error("token-expired");
  if (payload.nbf && t < payload.nbf - 10) throw new Error("token-not-yet-valid");

  if (aud) {
    const auds = Array.isArray(payload.aud) ? payload.aud : [payload.aud];
    if (!auds.includes(aud)) throw new Error("aud-mismatch");
  }
  if (teamDomain && payload.iss && payload.iss !== `https://${teamDomain}`) {
    throw new Error("iss-mismatch");
  }

  const key = await getKey(header.kid, teamDomain, fetchImpl);
  const data = new TextEncoder().encode(`${h64}.${p64}`);
  const ok = await crypto.subtle.verify(
    { name: "RSASSA-PKCS1-v1_5" },
    key,
    b64urlToBytes(s64),
    data
  );
  if (!ok) throw new Error("bad-signature");
  return payload;
}

async function getKey(kid, teamDomain, fetchImpl) {
  if (!teamDomain) throw new Error("no-team-domain");
  const url = `https://${teamDomain}/cdn-cgi/access/certs`;
  if (!cache.keys || cache.url !== url || Date.now() - cache.at > JWKS_TTL_MS) {
    const r = await fetchImpl(url);
    if (!r.ok) throw new Error("jwks-fetch-failed");
    const body = await r.json();
    cache = { url, keys: body.keys || [], at: Date.now() };
  }
  const jwk = cache.keys.find((k) => k.kid === kid) || cache.keys[0];
  if (!jwk) throw new Error("no-jwk");
  return crypto.subtle.importKey(
    "jwk",
    jwk,
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["verify"]
  );
}

// expose for tests
export function _resetCache() {
  cache = { url: null, keys: null, at: 0 };
}

function b64urlToStr(s) {
  return new TextDecoder().decode(b64urlToBytes(s));
}
function b64urlToBytes(s) {
  s = s.replace(/-/g, "+").replace(/_/g, "/");
  const pad = s.length % 4;
  if (pad) s += "=".repeat(4 - pad);
  const bin = atob(s);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
  return arr;
}
