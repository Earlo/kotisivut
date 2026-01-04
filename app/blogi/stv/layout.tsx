import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Siirtoäänivaali (STV) simulaattori',
  description: 'Kokeile siirtoäänivaalia interaktiivisella työkalulla.',
  alternates: { canonical: '/blogi/stv' },
  openGraph: {
    title: 'Siirtoäänivaali (STV) simulaattori',
    description: 'Kokeile siirtoäänivaalia interaktiivisella työkalulla.',
    url: 'https://visapollari.fi/blogi/stv',
    type: 'website',
    images: [{ url: 'https://visapollari.fi/blogi/stv/opengraph-image', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@visapollari',
    creator: '@visapollari',
    description: 'Kokeile siirtoäänivaalia interaktiivisella työkalulla.',
    images: ['https://visapollari.fi/blogi/stv/opengraph-image'],
  },
};

export default function STVLayout({ children }: { children: React.ReactNode }) {
  return children;
}
