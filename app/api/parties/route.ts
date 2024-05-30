import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch(
      'https://puoluerekisteri.fi/publicapi/party/registered',
    );
    if (!response.ok) {
      throw new Error('Failed to fetch parties');
    }
    const data = await response.json();
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
