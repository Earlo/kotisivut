import { isRecord, normalizeStoredRanking } from '@/lib/submissionValidation';
import { supabase } from '@/lib/supabase';
import { cacheLife } from 'next/cache';

export type RankingGuess = {
  id: number | string;
  made_by: string;
  ranking: string[];
  created_at: string;
};

export async function getRankingGuesses(): Promise<RankingGuess[]> {
  'use cache';
  cacheLife({ stale: 300, revalidate: 300, expire: 3600 });

  try {
    const { data, error } = await supabase().from('rankings').select('id, made_by, ranking, created_at');

    if (error) return [];
    const rows: unknown = data;
    if (!Array.isArray(rows)) return [];
    return rows.flatMap((row: unknown): RankingGuess[] => {
      if (
        !isRecord(row) ||
        (typeof row.id !== 'number' && typeof row.id !== 'string') ||
        typeof row.created_at !== 'string'
      ) {
        return [];
      }
      return [
        {
          id: row.id,
          made_by: typeof row.made_by === 'string' ? row.made_by : 'Nimetön',
          ranking: normalizeStoredRanking(row.ranking),
          created_at: row.created_at,
        },
      ];
    });
  } catch {
    return [];
  }
}
