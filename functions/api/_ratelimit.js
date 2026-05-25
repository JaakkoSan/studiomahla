// functions/api/_ratelimit.js — Cloudflare Pages Functions version of rate-limiting helper.
//
// Key changes from the Vercel version:
//   - getClientIp() reads from Cloudflare's `cf-connecting-ip` header
//     (always set by Cloudflare's edge, more reliable than x-forwarded-for).
//     Falls back to x-forwarded-for for safety.
//   - Uses Cloudflare's global fetch() (Web Fetch API). Identical to Node 18+.
//
// Fail-open semantics and Upstash REST integration are unchanged.

function getClientIp(request) {
  // Cloudflare always populates this header at the edge with the actual
  // visitor IP, even when behind proxies.
  const cf = request.headers.get('cf-connecting-ip');
  if (typeof cf === 'string' && cf.length > 0) return cf;

  const xff = request.headers.get('x-forwarded-for');
  if (typeof xff === 'string' && xff.length > 0) {
    return xff.split(',')[0].trim();
  }
  return 'unknown';
}

async function upstashCommand(parts) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;

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

export { getClientIp, checkRateLimit };
