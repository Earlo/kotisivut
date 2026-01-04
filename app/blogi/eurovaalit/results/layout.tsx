import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Eurovaalit LIB tulosveikkaus: Results',
  description: 'Tuloksia ja arvauksia Liberaalipuolueen listalta.',
  alternates: { canonical: '/blogi/eurovaalit/results' },
  openGraph: {
    title: 'Eurovaalit LIB tulosveikkaus: Results',
    description: 'Tuloksia ja arvauksia Liberaalipuolueen listalta.',
    url: 'https://visapollari.fi/blogi/eurovaalit/results',
    type: 'article',
    images: [{ url: 'https://visapollari.fi/blogi/eurovaalit/opengraph-image', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@visapollari',
    creator: '@visapollari',
    images: ['https://visapollari.fi/blogi/eurovaalit/opengraph-image'],
    description: 'Tuloksia ja arvauksia Liberaalipuolueen listalta.',
  },
};

export default function EurovaalitResultsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
