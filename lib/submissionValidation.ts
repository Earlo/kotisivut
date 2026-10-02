import { candidates } from '../app/blogi/eurovaalit/candidates.ts';

export const presidentialCandidates = [
  { name: 'Li Andersson', imageSrc: '/stv/number_2.png', color: '#ff0000' },
  { name: 'Olli Rehn', imageSrc: '/stv/number_3.png', color: '#00ff00' },
  { name: 'Harry Harkimo', imageSrc: '/stv/number_4.png', color: '#0000ff' },
  { name: 'Jussi Halla-aho', imageSrc: '/stv/number_5.png', color: '#ffff00' },
  { name: 'Jutta Urpilainen', imageSrc: '/stv/number_6.png', color: '#ff00ff' },
  { name: 'Mika Aaltola', imageSrc: '/stv/number_7.png', color: '#00ffff' },
  { name: 'Alexander Stubb', imageSrc: '/stv/number_8.png', color: '#ff0000' },
  { name: 'Sari Essayah', imageSrc: '/stv/number_9.png', color: '#00ff00' },
  { name: 'Pekka Haavisto', imageSrc: '/stv/number_10.png', color: '#0000ff' },
];

const presidentialNames = new Set(presidentialCandidates.map(({ name }) => name));
const europeanNames = new Set(candidates.map(({ name }) => name));
const commentPages = new Set([
  '/',
  '/blogi/eurovaalit',
  '/blogi/eurovaalit/results',
  '/blogi/lakot',
  '/blogi/puolueet',
  '/blogi/stv',
  '/blogi/tuotantofutuuri',
  '/blogi/vaalirahoitus',
]);

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function validCommentPage(page: unknown): page is string {
  return typeof page === 'string' && commentPages.has(page);
}

function validRanking(value: unknown, allowed: Set<string>, minimum: number): value is string[] {
  return (
    Array.isArray(value) &&
    value.length >= minimum &&
    value.length <= allowed.size &&
    value.every((name: unknown) => typeof name === 'string' && allowed.has(name)) &&
    new Set(value).size === value.length
  );
}

export function validVote(value: unknown): value is string[] {
  return validRanking(value, presidentialNames, 1);
}

export type RankingSubmission = { ranking: string[]; name: string };

export function validateRankingSubmission(value: unknown): RankingSubmission | undefined {
  if (!isRecord(value) || !validRanking(value.ranking, europeanNames, europeanNames.size)) return undefined;
  if (typeof value.name !== 'string') return undefined;
  const name = value.name.trim();
  if (name.length < 1 || name.length > 80) return undefined;
  return { name, ranking: value.ranking };
}

/** Older rows store JSON as text and may contain unused empty slots. */
export function normalizeStoredRanking(value: unknown): string[] {
  let parsed = value;
  if (typeof value === 'string') {
    try {
      parsed = JSON.parse(value) as unknown;
    } catch {
      return [];
    }
  }
  if (!Array.isArray(parsed)) return [];
  const result: string[] = [];
  for (const name of parsed) {
    if (typeof name === 'string' && europeanNames.has(name) && !result.includes(name)) result.push(name);
  }
  return result;
}
