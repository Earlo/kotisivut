import { clientIpFromHeaders, configuredIpHeader, type TrustedIpHeader } from './ip.ts';
import { SubmissionError } from './request.ts';

export type SubmissionScope = 'comments' | 'votes' | 'tierlist';
type Window = { count: number; expiresAt: number };
type LimitOptions = { limit?: number; windowMs?: number; maxAddressBuckets?: number; now?: () => number };

/** A small per-process safeguard; each deployment instance has its own windows. */
export function createSubmissionLimiter({
  limit = 30,
  windowMs = 60_000,
  maxAddressBuckets = 10_000,
  now = Date.now,
}: LimitOptions = {}) {
  const addresses = new Map<string, Window>();
  const anonymous = new Map<SubmissionScope, Window>();
  let nextCleanup = 0;

  function cleanExpired(timestamp: number) {
    for (const [key, window] of addresses) {
      if (window.expiresAt <= timestamp) addresses.delete(key);
    }
    for (const [scope, window] of anonymous) {
      if (window.expiresAt <= timestamp) anonymous.delete(scope);
    }
    nextCleanup = timestamp + Math.min(windowMs, 1000);
  }

  return {
    get bucketCount() {
      return addresses.size + anonymous.size;
    },
    consume(scope: SubmissionScope, ip: string | undefined) {
      const timestamp = now();
      if (timestamp >= nextCleanup) cleanExpired(timestamp);

      const key = ip ? `${scope}:${ip}` : undefined;
      let window = key ? addresses.get(key) : anonymous.get(scope);
      if (window && window.expiresAt <= timestamp) {
        window = undefined;
        if (key) addresses.delete(key);
        else anonymous.delete(scope);
      }

      if (!window) {
        if (key && addresses.size < maxAddressBuckets) {
          window = { count: 0, expiresAt: timestamp + windowMs };
          addresses.set(key, window);
        } else {
          // Unknown addresses and new addresses at capacity share one bucket per endpoint.
          // Keep at most maxAddressBuckets address entries plus three anonymous entries.
          window = anonymous.get(scope);
          if (!window || window.expiresAt <= timestamp) {
            window = { count: 0, expiresAt: timestamp + windowMs };
            anonymous.set(scope, window);
          }
        }
      }

      if (window.count >= limit) {
        const retryAfter = Math.max(1, Math.ceil((window.expiresAt - timestamp) / 1000));
        throw new SubmissionError(429, 'RATE_LIMITED', 'Liian monta lähetystä. Yritä myöhemmin uudelleen.', retryAfter);
      }
      window.count += 1;
    },
  };
}

const submissionLimiter = createSubmissionLimiter();

export function enforceSubmissionLimit(
  headers: Headers,
  scope: SubmissionScope,
  options: { trustedHeader?: TrustedIpHeader; limiter?: ReturnType<typeof createSubmissionLimiter> } = {},
): string | undefined {
  const trustedHeader = options.trustedHeader ?? configuredIpHeader();
  const ip = clientIpFromHeaders(headers, trustedHeader);
  (options.limiter ?? submissionLimiter).consume(scope, ip);
  return ip;
}
