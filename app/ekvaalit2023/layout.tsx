import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Eduskuntavaalit 2023 - Visa Pollari',
  description: 'Visa Pollari ehdolla Uudellamaalla – yhteystiedot ja esittely.',
  alternates: { canonical: '/ekvaalit2023' },
  openGraph: {
    title: 'Eduskuntavaalit 2023 - Visa Pollari',
    description: 'Visa Pollari ehdolla Uudellamaalla – yhteystiedot ja esittely.',
    url: 'https://visapollari.fi/ekvaalit2023',
    type: 'website',
    images: [
      { url: 'https://visapollari.fi/ekvaalit2023/opengraph-image', width: 1200, height: 630, alt: 'Visa Pollari' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@visapollari',
    creator: '@visapollari',
    images: ['https://visapollari.fi/ekvaalit2023/opengraph-image'],
    description: 'Visa Pollari ehdolla Uudellamaalla – yhteystiedot ja esittely.',
  },
};

export default function EkvaalitLayout({ children }: { children: React.ReactNode }) {
  return children;
}
