import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

const AUTHOR_MAX_LENGTH = 80;
const BODY_MAX_LENGTH = 2000;

function validPage(page: unknown): page is string {
  return page === '/' || (typeof page === 'string' && page.startsWith('/blogi/') && page.length <= 200);
}

function cleanText(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export async function GET(request: Request) {
  const page = new URL(request.url).searchParams.get('page');
  if (!validPage(page)) return NextResponse.json({ message: 'Virheellinen sivu.' }, { status: 400 });

  try {
    const { data, error } = await supabase()
      .from('comments')
      .select('id, author, body, created_at')
      .eq('page_path', page)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return NextResponse.json(data ?? [], {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (error) {
    console.error('Unable to load comments', error);
    return NextResponse.json({ message: 'Kommenttien lataaminen epäonnistui.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ message: 'Virheellinen pyyntö.' }, { status: 400 });
  }

  if (!isRecord(input)) {
    return NextResponse.json({ message: 'Virheellinen pyyntö.' }, { status: 400 });
  }

  const page = input.page;
  const author = cleanText(input.author);
  const body = cleanText(input.body);

  // Silently accept bot submissions caught by the honeypot without storing them.
  if (cleanText(input.website)) {
    return NextResponse.json({ id: crypto.randomUUID(), author, body, created_at: new Date().toISOString() });
  }

  if (!validPage(page)) return NextResponse.json({ message: 'Virheellinen sivu.' }, { status: 400 });
  if (author.length < 2 || author.length > AUTHOR_MAX_LENGTH) {
    return NextResponse.json({ message: 'Nimen pitää olla 2–80 merkkiä.' }, { status: 400 });
  }
  if (body.length < 2 || body.length > BODY_MAX_LENGTH) {
    return NextResponse.json({ message: 'Kommentin pitää olla 2–2000 merkkiä.' }, { status: 400 });
  }

  try {
    const { data, error } = await supabase()
      .from('comments')
      .insert({ page_path: page, author, body })
      .select('id, author, body, created_at')
      .single();

    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Unable to save comment', error);
    return NextResponse.json({ message: 'Kommentin lähettäminen epäonnistui.' }, { status: 500 });
  }
}
