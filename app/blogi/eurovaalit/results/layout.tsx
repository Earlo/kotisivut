import type { Metadata } from 'next';

export const metadata = {
  title: 'Eurovaalit 2024 – LIB-tulosveikkauksen tulosarkisto',
  description: 'Vuoden 2024 eurovaalien Liberaalipuolueen listan tulosveikkauksen tulokset ja arvaukset arkistossa.',
  alternates: { canonical: '/blogi/eurovaalit/results' },
  robots: { index: false, follow: true },
  openGraph: {
    title: 'Eurovaalit 2024 – LIB-tulosveikkauksen tulosarkisto',
    description: 'Vuoden 2024 eurovaalien Liberaalipuolueen listan tulosveikkauksen tulokset ja arvaukset arkistossa.',
    url: 'https://visapollari.fi/blogi/eurovaalit/results',
    type: 'article',
    images: [{ url: 'https://visapollari.fi/blogi/eurovaalit/results/opengraph-image', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@visapollari',
    creator: '@visapollari',
    images: ['https://visapollari.fi/blogi/eurovaalit/results/opengraph-image'],
    description: 'Vuoden 2024 eurovaalien Liberaalipuolueen listan tulosveikkauksen tulokset ja arvaukset arkistossa.',
  },
} satisfies Metadata;

export default function EurovaalitResultsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
