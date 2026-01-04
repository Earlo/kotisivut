import Header from '@/components/BlogHeader';
import Budjettipeli from '@/components/budjettipeli/budjettipeli';
import type { Metadata } from 'next';
import Script from 'next/script';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Budjettipeli - Säädä budjettiasi',
  description:
    'Tee päätökset ja suunnittele valtion budjetti käyttäen tarkempaa ja kattavampaa työkalua kuin koskaan ennen.',
  alternates: { canonical: '/budjettipeli' },
  openGraph: {
    title: 'Budjettipeli - Interaktiivinen Budjetin Suunnittelutyökalu',
    description: 'Kokeile kuinka hallitset Suomen valtion budjettia ja tee päätöksiä.',
    images: [
      {
        url: 'https://visapollari.fi/budjettipeli/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Budjettipeli esikatselukuva',
      },
    ],
    type: 'website',
    url: 'https://visapollari.fi/budjettipeli',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@visapollari',
    creator: '@visapollari',
    images: 'https://visapollari.fi/budjettipeli/opengraph-image',
    description: 'Tutustu Suomen valtion budjetin suunnitteluun uudella interaktiivisella työkalulla.',
  },
};

const Page = () => {
  const toolJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Budjettipeli',
    operatingSystem: 'Web',
    applicationCategory: 'ProductivityApplication',
    description: metadata.description,
    url: 'https://visapollari.fi/budjettipeli',
  };

  return (
    <div className="max-w-8xl mx-auto flex flex-col items-center bg-gray-950 p-4">
      <Script
        id="budjettipeli-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }}
      />
      <article className="w-full max-w-5xl" aria-labelledby="budjettipeli-heading">
        <Header>
          <span id="budjettipeli-heading">Budjettipeli</span>
        </Header>
        <Suspense>
          <Budjettipeli />
        </Suspense>
      </article>
    </div>
  );
};

export default Page;
