// api/_ratelimit.js — shared rate-limiting helper.
//
// Vercel ignores files starting with "_" for routing, so this isn't a
// public endpoint. It's required from sibling files in /api.
//
// Storage: Upstash Redis via its HTTP REST API. No npm dependency
// needed — we just fetch() the REST endpoints directly. Upstash's
// generous free tier (10K commands/day, 256MB) is plenty for a small
// admin login surface.
//
// Algorithm: simple fixed-window via INCR + EXPIRE. The first hit in a
// window creates the key and arms the expiry; subsequent hits just
// increment. When the window expires, the key vanishes and the next hit
// starts a new window. Not as smooth as a sliding window, but cheap
// (1–2 commands per check) and good enough for login throttling.
//
// FAIL OPEN: if Upstash is unreachable, misconfigured, or returns an
// error, this helper returns { allowed: true }. Rate limiting is a
// defense-in-depth layer for us, not the primary security control
// (password + TOTP are). An outage in Upstash must not lock the admin
// out of their own panel.
//
// Optional env vars:
//   UPSTASH_REDIS_REST_URL    — e.g. https://eu1-xxx.upstash.io
//   UPSTASH_REDIS_REST_TOKEN  — read-write token from the Upstash dashboard
'use strict';

/** Extract the client IP from a Vercel request. */
function getClientIp(req) {
  const xff = req.headers['x-forwarded-for'];
  if (typeof xff === 'string' && xff.length > 0) {
    // x-forwarded-for is "client, proxy1, proxy2" — first entry is the client.
    return xff.split(',')[0].trim();
  }
  return (req.socket && req.socket.remoteAddress) || 'unknown';
}

/**
 * Issue a single Upstash REST command, e.g. ['incr', 'foo'] or
 * ['expire', 'foo', '900']. Returns the parsed `.result` value.
 *
 * Returns null when Upstash isn't configured (no URL/token env vars).
 * Throws on HTTP error so callers can fail open in one place.
 */
async function upstashCommand(parts) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

  // Upstash accepts /CMD/arg1/arg2... GET; values are URL-encoded.
  const path = parts.map(function (p) { return encodeURIComponent(String(p)); }).join('/');
  const fullUrl = url.replace(/\/+$/, '') + '/' + path;

  const res = await fetch(fullUrl, {
    headers: { Authorization: 'Bearer ' + token },
  });
  if (!res.ok) {
    throw new Error('Upstash HTTP ' + res.status);
  }
  const data = await res.json();
  return data.result;
}

/**
 * Check whether `key` has exceeded `limit` requests inside the rolling
 * `windowSeconds`. Always returns an object (never throws):
 *
 *   { allowed, count, limit, windowSeconds, configured, retryAfter, error? }
 *
 * - allowed: true iff request is below the limit (OR Upstash unavailable).
 * - count:   current request count in this window (0 if unconfigured).
 * - configured: false iff env vars aren't set (so allowed is true by default).
 * - retryAfter: seconds the client should wait if blocked.
 * - error: true iff a network/Upstash error happened (still fails open).
 */
async function checkRateLimit(key, limit, windowSeconds) {
  try {
    const count = await upstashCommand(['incr', key]);
    if (count === null) {
      return {
        allowed: true,
        count: 0,
        limit: limit,
        windowSeconds: windowSeconds,
        configured: false,
        retryAfter: 0,
      };
    }
    if (count === 1) {
      // First hit in this window — arm the expiry. If this command fails the
      // key would live forever; in practice Upstash is the same call site,
      // so a failure here would also have failed the INCR above.
      try {
        await upstashCommand(['expire', key, String(windowSeconds)]);
      } catch (e) {
        console.error('Rate limit: EXPIRE failed (non-fatal):', e.message);
      }
    }
    const allowed = count <= limit;
    return {
      allowed: allowed,
      count: count,
      limit: limit,
      windowSeconds: windowSeconds,
      configured: true,
      retryAfter: allowed ? 0 : windowSeconds,
    };
  } catch (err) {
    console.error('Rate limit check failed (failing open):', err.message);
    return {
      allowed: true,
      count: 0,
      limit: limit,
      windowSeconds: windowSeconds,
      configured: true,
      retryAfter: 0,
      error: true,
    };
  }
}

module.exports = {
  getClientIp: getClientIp,
  checkRateLimit: checkRateLimit,
};
