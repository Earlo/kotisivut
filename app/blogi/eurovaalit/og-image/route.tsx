import { candidates } from '../candidates';
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: '48px',
          color: 'white',
          background: '#FFA500',
          width: '1200px',
          height: '630px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <h1>LIB Eurovaalit</h1>
        <div
          style={{
            position: 'relative',
            display: 'flex',
            width: '200px',
            height: '200px',
          }}
        >
          <img
            src={candidates[0].imageSrc}
            alt="Eurovaalit LIB tulosveikkaus esikatselukuva"
            style={{
              objectFit: 'cover',
              width: '100%',
              height: '100%',
              borderTopLeftRadius: '10px',
              borderTopRightRadius: '10px',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              background: 'rgba(0,0,0,0.5)',
              padding: '10px',
              color: 'white',
              display: 'flex',
            }}
          >
            <span
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                margin: 'auto',
              }}
            >
              {candidates[0].name}
            </span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
