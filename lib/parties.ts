import type { Party } from '@/types/partyTable';
import { cacheLife } from 'next/cache';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isSiteInfo(value: unknown): value is Party['siteInfo'] {
  if (!isRecord(value)) return false;

  const stringFields = ['registered', 'language', 'address', 'postcode', 'city'];
  const nullableStringFields = [
    'partyDesc',
    'partyDescSv',
    'addressAlt',
    'postcodeAlt',
    'cityAlt',
    'url',
    'urlAlt',
    'emailAlt',
    'phoneNumber',
  ];

  return (
    typeof value.id === 'number' &&
    typeof value.dualLanguage === 'boolean' &&
    typeof value.email === 'string' &&
    stringFields.every((field) => typeof value[field] === 'string') &&
    nullableStringFields.every((field) => value[field] === null || typeof value[field] === 'string')
  );
}

function isParty(value: unknown): value is Party {
  return (
    isRecord(value) && typeof value.id === 'number' && typeof value.name === 'string' && isSiteInfo(value.siteInfo)
  );
}

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

  const data: unknown = await res.json();
  if (!Array.isArray(data)) {
    throw new Error('Puoluerekisteri returned an invalid response');
  }

  const parties = data.filter(isParty);
  if (parties.length !== data.length) {
    throw new Error('Puoluerekisteri returned an invalid party');
  }

  return parties;
}
