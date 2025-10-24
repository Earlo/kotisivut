import { ImageResponse } from 'next/og';
import { candidates } from '../candidates';

export const runtime = 'edge';

export function GET() {
  const shuffledCandidates = candidates.sort(() => 0.5 - Math.random());

  const rows = 2;
  const columns = Math.ceil(candidates.length / rows);
  const imageWidth = 1200 / columns;
  const imageHeight = 430 / rows;

  return new ImageResponse(
    (
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
          LIB Eurovaalit
        </h1>
        {shuffledCandidates.map((candidate, index) => {
          const row = Math.floor(index / columns);
          const column = index % columns;
          return (
            <div
              key={index}
              style={{
                position: 'absolute',
                left: `${column * imageWidth}px`,
                top: `${row * imageHeight + 200}px`,
                width: `${imageWidth}px`,
                height: `${imageHeight}px`,
                display: 'flex',
              }}
            >
              <img
                src={candidate.imageSrc}
                alt={`${candidate.name} Eurovaalit LIB tulosveikkaus esikatselukuva`}
                style={{
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  width: '100%',
                  background: 'rgba(0,0,0,0.5)',
                  padding: '4px',
                  color: 'white',
                  display: 'flex',
                }}
              >
                <span
                  style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    margin: 'auto',
                    textAlign: 'center',
                  }}
                >
                  {candidate.name}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
