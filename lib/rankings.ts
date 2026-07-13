import { supabase } from '@/lib/supabase';

export type RankingGuess = {
  id: number;
  made_by: string;
  ranking: string;
  created_at: string;
};

export async function getRankingGuesses(): Promise<RankingGuess[]> {
  const { data, error } = await supabase().from('rankings').select('id, made_by, ranking, created_at');

  if (error) throw error;
  return data ?? [];
}
