export function clientIpFromHeaders(h: Headers): string | undefined {
  const candidates = [
    h.get('x-forwarded-for'),
    h.get('X-Forwarded-For'),
    h.get('cf-connecting-ip'),
    h.get('CF-Connecting-IP'),
    h.get('x-real-ip'),
    h.get('X-Real-IP'),
    h.get('fly-client-ip'),
    h.get('Fly-Client-IP'),
    h.get('x-client-ip'),
    h.get('X-Client-IP'),
  ].filter(Boolean) as string[];

  for (const v of candidates) {
    for (const part of v.split(',').map((s) => s.trim())) {
      if (part && !isPrivate(part)) return part;
    }
  }
  return undefined;
}

function isPrivate(ip: string): boolean {
  if (ip === '127.0.0.1' || ip === '::1') return true;
  // 10.0.0.0/8
  if (/^10\./.test(ip)) return true;
  // 172.16.0.0/12
  if (/^172\.(1[6-9]|2\d|3[0-1])\./.test(ip)) return true;
  // 192.168.0.0/16
  if (/^192\.168\./.test(ip)) return true;
  return false;
}
