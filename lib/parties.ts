import type { Party } from '@/types/partyTable';

export async function getParties(): Promise<Party[]> {
  const res = await fetch('https://puoluerekisteri.fi/publicapi/party/registered', {
    headers: { Accept: 'application/json' },
    next: { revalidate: 3600 },
    signal: AbortSignal.timeout(8000),
  });

  if (!res.ok) {
    throw new Error(`Puoluerekisteri returned ${res.status}`);
  }

  return (await res.json()) as Party[];
}
