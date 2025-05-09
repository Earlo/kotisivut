import Header from '@/components/BlogHeader';
import Budjettipeli from '@/components/budjettipeli/budjettipeli';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Budjettipeli - Säädä budjettiasi',
  description:
    'Tee päätökset ja suunnittele valtion budjetti käyttäen tarkempaa ja kattavampaa työkalua kuin koskaan ennen.',
  openGraph: {
    title: 'Budjettipeli - Interaktiivinen Budjetin Suunnittelutyökalu',
    description:
      'Kokeile kuinka hallitset Suomen valtion budjettia ja tee päätöksiä.',
    images: [
      {
        url: 'https://visapollari.fi/budjettipeli/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Budjettipeli esikatselukuva',
      },
    ],
    type: 'website',
    url: 'https://visapollari.fi/budjettipeli',
  },
  twitter: {
    card: 'summary',
    site: '@visapollari',
    creator: '@visapollari',
    images: 'https://visapollari.fi/budjettipeli/og-image.jpg',
    description:
      'Tutustu Suomen valtion budjetin suunnitteluun uudella interaktiivisella työkalulla.',
  },
};

const Page = () => {
  return (
    <div className="max-w-8xl mx-auto flex flex-col items-center bg-gray-950 p-4">
      <Header>Budjettipeli</Header>
      <Suspense>
        <Budjettipeli />
      </Suspense>
    </div>
  );
};

export default Page;
