import { NextResponse } from 'next/server';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://excmphbqupxemrirfzlv.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
  try {
    const headers = await request.headers;
    const body = await request.json();
    const ip = headers.get('X-Forwarded-For');
    console.log(typeof body);
    const { data, error } = await supabase
      .from('rankings')
      .insert([{ ip: ip, ranking: body.ranking, made_by: body.name }])
      .select();
    if (error) {
      console.log(error);
      return NextResponse.json({ error: 'PostgrestError' }, { status: 500 });
    }

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 's-maxage=1, stale-while-revalidate',
      },
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

export async function GET(request: Request) {
  try {
    const { data, error } = await supabase.from('rankings').select();
    if (error) {
      console.log(error);
      return NextResponse.json({ error: 'PostgrestError' }, { status: 500 });
    }

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 's-maxage=1, stale-while-revalidate',
      },
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
