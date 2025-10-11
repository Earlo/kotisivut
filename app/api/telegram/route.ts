import { NextResponse } from 'next/server';

const MESSAGE_BLOCK_RE = /<div class="tgme_widget_message\b[\s\S]*?(?=<div class="tgme_widget_message\b|$)/g;

export async function GET() {
  try {
    const res = await fetch('https://t.me/s/visapollari', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36',
        Accept: 'text/html',
      },
    });

    if (!res.ok) {
      return NextResponse.json({ error: `Upstream ${res.status}` }, { status: 502 });
    }

    const html = await res.text();

    const blocks = html.match(MESSAGE_BLOCK_RE) ?? [];

    if (blocks.length > 0) {
      blocks.shift();
    }

    return NextResponse.json(blocks, {
      headers: {
        'Cache-Control': 's-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: `Internal server error ${msg}` }, { status: 500 });
  }
}
