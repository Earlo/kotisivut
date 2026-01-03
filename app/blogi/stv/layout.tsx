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
  },
  twitter: {
    card: 'summary',
    site: '@visapollari',
    creator: '@visapollari',
    description: 'Kokeile siirtoäänivaalia interaktiivisella työkalulla.',
  },
};

export default function STVLayout({ children }: { children: React.ReactNode }) {
  return children;
}
