import { ImageResponse } from 'next/og';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        position: 'relative',
        width: '1200px',
        height: '630px',
        display: 'flex',
        overflow: 'hidden',
        background: '#080b0e',
        color: '#f5f0e5',
        fontFamily: 'Arial, Helvetica, sans-serif',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          opacity: 0.18,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)',
          backgroundSize: '42px 42px',
        }}
      />

      <div
        style={{
          position: 'relative',
          width: '610px',
          height: '630px',
          padding: '54px 0 46px 62px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            color: '#ff5847',
            fontSize: '18px',
            fontWeight: 800,
            letterSpacing: '0.12em',
          }}
        >
          <span
            style={{
              width: '42px',
              height: '5px',
              marginRight: '14px',
              display: 'flex',
              flexDirection: 'column',
              background: '#ff5847',
            }}
          />
          Blogikirjoitus
        </div>

        <div
          style={{
            marginTop: '70px',
            display: 'flex',
            flexDirection: 'column',
            fontWeight: 900,
            lineHeight: 0.94,
            letterSpacing: '-0.05em',
          }}
        >
          <span style={{ fontSize: '51px' }}>Vaalirahoituslain</span>
          <span style={{ color: '#ff5847', fontSize: '72px' }}>porsaanreiät</span>
        </div>

        <div
          style={{
            marginTop: 'auto',
            display: 'flex',
            alignItems: 'center',
            color: '#9d9a94',
            fontSize: '18px',
            fontWeight: 700,
            letterSpacing: '0.09em',
          }}
        >
          <span style={{ width: '9px', height: '9px', marginRight: '12px', display: 'flex', background: '#f5f0e5' }} />
          VISAPOLLARI.FI
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          right: '-24px',
          top: '18px',
          width: '620px',
          height: '600px',
          display: 'flex',
        }}
      >
        <div
          style={{
            position: 'absolute',
            right: '105px',
            top: '26px',
            width: '240px',
            height: '155px',
            display: 'flex',
            flexDirection: 'column',
            transform: 'rotate(3deg)',
            background: '#d8d3c8',
            border: '7px solid #15191d',
            boxShadow: '16px 18px 0 #263d4c',
          }}
        >
          <div style={{ height: '34px', display: 'flex', background: '#f1ecdf', borderBottom: '7px solid #15191d' }} />
          <div
            style={{
              position: 'absolute',
              left: '63px',
              top: '9px',
              width: '110px',
              height: '10px',
              display: 'flex',
              background: '#15191d',
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: '92px',
              top: '-55px',
              width: '62px',
              height: '76px',
              display: 'flex',
              transform: 'rotate(-6deg)',
              background: '#f1ecdf',
              border: '4px solid #15191d',
            }}
          />
        </div>

        {[0, 1, 2].map((paper) => (
          <div
            key={paper}
            style={{
              position: 'absolute',
              left: `${84 + paper * 12}px`,
              top: `${198 + paper * 10}px`,
              width: '430px',
              height: '270px',
              padding: '28px 30px',
              display: 'flex',
              flexDirection: 'column',
              transform: `rotate(${-5 + paper * 3}deg)`,
              background: paper === 2 ? '#eee9dc' : '#a9a69e',
              border: '5px solid #15191d',
              boxShadow: '10px 12px 0 rgba(0,0,0,.35)',
            }}
          >
            {paper === 2 && (
              <>
                <div style={{ width: '185px', height: '13px', display: 'flex', background: '#1c2730' }} />
                <div
                  style={{ width: '330px', height: '6px', marginTop: '22px', display: 'flex', background: '#86837c' }}
                />
                <div
                  style={{ width: '290px', height: '6px', marginTop: '10px', display: 'flex', background: '#86837c' }}
                />
                <div
                  style={{ width: '342px', height: '6px', marginTop: '10px', display: 'flex', background: '#86837c' }}
                />
                <div
                  style={{
                    marginTop: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    borderTop: '4px solid #77756f',
                    borderBottom: '4px solid #77756f',
                  }}
                >
                  {[0, 1, 2].map((cell) => (
                    <div
                      key={cell}
                      style={{
                        width: cell === 0 ? '170px' : '86px',
                        height: '56px',
                        display: 'flex',
                        borderRight: cell < 2 ? '3px solid #77756f' : 'none',
                      }}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        ))}

        <div
          style={{
            position: 'absolute',
            left: '282px',
            top: '353px',
            width: '190px',
            height: '78px',
            display: 'flex',
            transform: 'rotate(-2deg)',
            borderRadius: '50%',
            background: '#080b0e',
            border: '8px solid #ff5847',
            boxShadow: '0 0 0 9px #eee9dc',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: '116px',
            top: '264px',
            width: '122px',
            height: '122px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: 'rotate(-16deg)',
            border: '8px solid #ff5847',
            borderRadius: '61px',
            color: '#ff5847',
            fontSize: '28px',
            fontWeight: 900,
            letterSpacing: '0.05em',
          }}
        >
          VTV
        </div>

        {[0, 1, 2].map((note) => (
          <div
            key={note}
            style={{
              position: 'absolute',
              left: `${300 + note * 54}px`,
              top: `${422 + note * 34}px`,
              width: '142px',
              height: '64px',
              padding: '0 13px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              transform: `rotate(${note === 1 ? 10 : -8}deg)`,
              background: note === 1 ? '#b9cfb3' : '#b5c9d2',
              border: '4px solid #182127',
              color: '#263e3b',
              fontSize: '27px',
              fontWeight: 900,
              boxShadow: '7px 8px 0 rgba(0,0,0,.35)',
            }}
          >
            <span>€</span>
            <span>{note === 1 ? '50' : '20'}</span>
          </div>
        ))}
      </div>

      <div
        style={{
          position: 'absolute',
          left: '596px',
          top: '-80px',
          width: '4px',
          height: '790px',
          display: 'flex',
          transform: 'rotate(8deg)',
          background: '#ff5847',
          opacity: 0.55,
        }}
      />
    </div>,
    size,
  );
}
