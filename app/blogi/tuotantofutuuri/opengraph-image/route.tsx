import { ImageResponse } from 'next/og';
export const runtime = 'edge';

export function GET() {
  return new ImageResponse(
    <div
      style={{
        fontSize: '24px',
        color: 'white',
        background: '#FFA500',
        width: '1200px',
        height: '630px',
        position: 'relative',
        display: 'flex',
      }}
    >
      <h1
        style={{
          top: '20px',
          left: '40%',
          width: '100%',
          textAlign: 'center',
        }}
      >
        Tuotantofutuurimalli
      </h1>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
}
