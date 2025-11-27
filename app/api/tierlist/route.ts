import { clientIpFromHeaders } from '@/lib/ip';
import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

type RankingBody = {
  name?: string;
  ranking?: unknown;
};

export async function POST(request: Request) {
  try {
    const headers = request.headers;
    let body: RankingBody;
    try {
      body = (await request.json()) as RankingBody;
    } catch {
      return NextResponse.json({ error: 'BAD_JSON' }, { status: 400 });
    }
    if (body == null || typeof body !== 'object') {
      return NextResponse.json({ error: 'INVALID_BODY' }, { status: 400 });
    }
    if (body.ranking == null) {
      return NextResponse.json({ error: 'MISSING_FIELD', field: 'ranking' }, { status: 400 });
    }
    const ip = clientIpFromHeaders(headers);
    const { data, error } = await supabase
      .from('rankings')
      .insert([{ ip, ranking: body.ranking, made_by: body.name ?? null }])
      .select('id, made_by, ranking, created_at');
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

export async function GET() {
  try {
    const { data, error } = await supabase.from('rankings').select('id, made_by, ranking, created_at');
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
