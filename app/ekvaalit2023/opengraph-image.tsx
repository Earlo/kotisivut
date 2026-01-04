import { ImageResponse } from 'next/og';
export const runtime = 'edge';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        fontSize: '48px',
        color: 'white',
        background: '#1f2937',
        width: '1200px',
        height: '630px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <h1 style={{ margin: 0 }}>Visa Pollari</h1>
      <p style={{ fontSize: '28px', margin: '8px 0 0' }}>Ehdolla Uudellamaalla 2023</p>
    </div>,
    size,
  );
}
