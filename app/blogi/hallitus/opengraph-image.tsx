import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Hallituksessa on 108 kansanedustajaa. Paitsi ettei ole.';

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        padding: '64px',
        background: '#030712',
        color: '#f3f4f6',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', color: '#7dd3fc', fontSize: 24 }}>Nillityspsykoosi · Visa Pollari</div>
      <div style={{ display: 'flex', flexDirection: 'column', fontSize: 62, fontWeight: 700, lineHeight: 1.15 }}>
        <span>Hallituksessa on</span>
        <span>108 kansanedustajaa.</span>
        <span style={{ marginTop: 20, color: '#7dd3fc' }}>Paitsi ettei ole.</span>
      </div>
      <div style={{ display: 'flex', color: '#9ca3af', fontSize: 22 }}>visapollari.fi/blogi/hallitus</div>
    </div>,
    size,
  );
}
