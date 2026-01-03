import { ImageResponse } from 'next/og';
export const runtime = 'edge';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function Image() {
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
    size,
  );
}
