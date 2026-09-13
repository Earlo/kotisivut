import { contentDates } from '@/lib/contentDates';
import type { Metadata } from 'next';
import VaalikonevastauksetClient from './VaalikonevastauksetClient';

const url = 'https://visapollari.fi/vaalikonevastaukset';
const title = 'Visa Pollarin vaalikonevastaukset 2023–2026';
const description =
  'Visa Pollarin vaalikonevastaukset ja perustelut vuosilta 2023–2026. Toistuvat kysymykset on koottu yhteen.';

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/vaalikonevastaukset' },
  openGraph: {
    title,
    description: 'Kaikki vaalikonevastaukseni ja niiden perustelut yhdessä paikassa.',
    url,
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': `${url}#webpage`,
      url,
      name: title,
      description,
      inLanguage: ['fi', 'en', 'sv'],
      datePublished: contentDates.vaalikonevastaukset.published,
      dateModified: contentDates.vaalikonevastaukset.modified,
      author: { '@id': 'https://visapollari.fi/#person' },
      about: { '@id': 'https://visapollari.fi/#person' },
    },
    {
      '@type': 'Person',
      '@id': 'https://visapollari.fi/#person',
      name: 'Visa Pollari',
      url: 'https://visapollari.fi/',
    },
  ],
};

export default function VaalikonevastauksetPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <VaalikonevastauksetClient />
    </>
  );
}
