import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL ?? '';
const key = process.env.SUPABASE_KEY ?? '';

if (!url || !key) {
  throw new Error('Missing SUPABASE_URL or SUPABASE_KEY environment variable.');
}

export const supabase: SupabaseClient = createClient(url, key, {
  auth: { persistSession: false },
});
