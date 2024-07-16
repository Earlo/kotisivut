import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  // Shuffle the candidates array to randomize the order
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: '24px',
          color: 'white',
          background: '#FFA500',
          width: '1200px',
          height: '630px',
          position: 'relative', // Allows absolute positioning of children
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
          Tuontatofutuurimalli
        </h1>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
