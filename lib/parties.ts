import type { Party } from '@/types/partyTable';
import { cacheLife } from 'next/cache';

export async function getParties(): Promise<Party[]> {
  'use cache';
  cacheLife({ stale: 3600, revalidate: 3600, expire: 86400 });

  const res = await fetch('https://puoluerekisteri.fi/publicapi/party/registered', {
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(8000),
  });

  if (!res.ok) {
    throw new Error(`Puoluerekisteri returned ${res.status}`);
  }

  return (await res.json()) as Party[];
}
