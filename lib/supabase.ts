import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_KEY;

if (!url || !key) {
  throw new Error('Supabase env vars missing: SUPABASE_URL and SUPABASE_KEY are required');
}

export const supabase = createClient(url, key, {
  auth: { persistSession: false },
});
