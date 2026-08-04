import { supabase } from '@/lib/supabase';
import { cacheLife } from 'next/cache';

export type RankingGuess = {
  id: number;
  made_by: string;
  ranking: string;
  created_at: string;
};

export async function getRankingGuesses(): Promise<RankingGuess[]> {
  'use cache';
  cacheLife({ stale: 300, revalidate: 300, expire: 3600 });

  try {
    const { data, error } = await supabase().from('rankings').select('id, made_by, ranking, created_at');

    if (error) return [];
    return data ?? [];
  } catch {
    return [];
  }
}
