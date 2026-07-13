import { getTelegramPosts } from '@/lib/telegram';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const posts = await getTelegramPosts();
    return NextResponse.json(posts, {
      headers: {
        'Cache-Control': 's-maxage=300, stale-while-revalidate=3600',
      },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: `Internal server error ${msg}` }, { status: 500 });
  }
}
