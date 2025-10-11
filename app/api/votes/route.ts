import { clientIpFromHeaders } from '@/lib/ip';
import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const headers = request.headers;
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'BAD_JSON' }, { status: 400 });
    }
    if (body == null) {
      return NextResponse.json({ error: 'INVALID_BODY' }, { status: 400 });
    }
    const ip = clientIpFromHeaders(headers);
    const { data, error } = await supabase
      .from('siirtoäänet')
      .insert([{ ip, vote: body }])
      .select();
    if (error) {
      return NextResponse.json(
        { error: 'DB_ERROR', message: error.message, hint: error.hint ?? null },
        { status: 500 },
      );
    }

    return NextResponse.json(data, {
      headers: { 'Cache-Control': 's-maxage=60, stale-while-revalidate=300' },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: 'INTERNAL_ERROR', message: msg }, { status: 500 });
  }
}
