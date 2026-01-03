import { ImageResponse } from 'next/og';
export const runtime = 'edge';

export function GET() {
  return new ImageResponse(
    <div
      style={{
        fontSize: '48px',
        color: 'white',
        background: '#0070f3',
        width: '1200px',
        height: '630px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <h1>Suomen puolueet</h1>
      <p>puolueiden yhteystiedot kätevästi!</p>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
}
