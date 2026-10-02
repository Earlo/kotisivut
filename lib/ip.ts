import { isIP } from 'node:net';

export const trustedIpHeaders = ['x-vercel-forwarded-for', 'cf-connecting-ip', 'fly-client-ip', 'x-real-ip'] as const;
export type TrustedIpHeader = (typeof trustedIpHeaders)[number];

export function configuredIpHeader(): TrustedIpHeader | undefined {
  const configured = process.env.SUBMISSION_IP_HEADER;
  if (configured) return trustedIpHeaders.find((header) => header === configured);
  return process.env.VERCEL === '1' ? 'x-vercel-forwarded-for' : undefined;
}

function publicIpv4(ip: string): boolean {
  const [first = 0, second = 0] = ip.split('.').map(Number);
  return !(
    first === 0 ||
    first === 10 ||
    first === 127 ||
    first >= 224 ||
    (first === 100 && second >= 64 && second <= 127) ||
    (first === 169 && second === 254) ||
    (first === 172 && second >= 16 && second <= 31) ||
    (first === 192 && second === 168)
  );
}

/** Read only a header that the deployment proxy overwrites, never client-supplied forwarding chains. */
export function clientIpFromHeaders(h: Headers, trustedHeader = configuredIpHeader()): string | undefined {
  if (!trustedHeader) return undefined;
  const value = h.get(trustedHeader)?.trim();
  if (!value || value.includes('%')) return undefined;

  const version = isIP(value);
  if (version === 4) return publicIpv4(value) ? value : undefined;
  if (version !== 6) return undefined;

  const normalized = new URL(`http://[${value}]`).hostname.slice(1, -1);
  // IPv4-mapped addresses share the same identity and private-range checks as IPv4.
  const mapped = /^::ffff:([\da-f]{1,4}):([\da-f]{1,4})$/.exec(normalized);
  if (mapped?.[1] && mapped[2]) {
    const high = parseInt(mapped[1], 16);
    const low = parseInt(mapped[2], 16);
    const ipv4 = `${high >> 8}.${high & 255}.${low >> 8}.${low & 255}`;
    return publicIpv4(ipv4) ? ipv4 : undefined;
  }
  if (normalized === '::' || normalized === '::1' || /^(fc|fd|ff)/.test(normalized) || /^fe[89ab]/.test(normalized)) {
    return undefined;
  }
  return normalized;
}
