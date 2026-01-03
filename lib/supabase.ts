import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL ?? '';
const key = process.env.SUPABASE_KEY ?? '';

let client: SupabaseClient | null = null;

export const supabase = (): SupabaseClient => {
  if (!url || !key) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_KEY environment variable.');
  }

  if (!client) {
    client = createClient(url, key, { auth: { persistSession: false } });
  }

  return client;
};
