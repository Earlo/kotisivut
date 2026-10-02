import type { Metadata } from 'next';

export const metadata = {
  title: { absolute: 'Eduskuntavaalit 2023 – kampanja-arkisto – Visa Pollari' },
  description: 'Visa Pollarin vuoden 2023 eduskuntavaalikampanjan arkisto: esittely ja tavoitteet Uudellamaalla.',
  alternates: { canonical: '/ekvaalit2023' },
  robots: { index: false, follow: true },
  openGraph: {
    title: 'Eduskuntavaalit 2023 – kampanja-arkisto – Visa Pollari',
    description: 'Visa Pollarin vuoden 2023 eduskuntavaalikampanjan arkisto: esittely ja tavoitteet Uudellamaalla.',
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
    description: 'Visa Pollarin vuoden 2023 eduskuntavaalikampanjan arkisto: esittely ja tavoitteet Uudellamaalla.',
  },
} satisfies Metadata;

export default function EkvaalitLayout({ children }: { children: React.ReactNode }) {
  return children;
}
