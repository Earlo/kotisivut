import Header from '@/components/BlogHeader';
import Text from '@/components/Text';
import TierList from '@/components/tierlist/Tierlist';
import type { Metadata } from 'next';
import Script from 'next/script';
import { candidates } from './candidates';

export const metadata: Metadata = {
  title: 'Eurovaalit LIB tulosveikkaus',
  description: 'Veikkaa Liberaalin listan järjestystä ja voita mainetta ja kunniaa.',
  alternates: { canonical: '/blogi/eurovaalit' },
  openGraph: {
    title: 'Eurovaalit LIB tulosveikkaus',
    description: 'Veikkaa Liberaalin listan järjestystä ja voita mainetta ja kunniaa.',
    images: [
      {
        url: 'https://visapollari.fi/blogi/eurovaalit/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Eurovaalit LIB tulosveikkaus esikatselukuva',
      },
    ],
    type: 'website',
    url: 'https://visapollari.fi/blogi/eurovaalit',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@visapollari',
    creator: '@visapollari',
    images: 'https://visapollari.fi/blogi/eurovaalit/opengraph-image',
    description: 'Veikkaa Liberaalin listan järjestystä ja voita mainetta ja kunniaa.',
  },
};

const Page = () => {
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: metadata.title,
    description: metadata.description,
    author: {
      '@type': 'Person',
      name: 'Visa Pollari',
    },
    mainEntityOfPage: 'https://visapollari.fi/blogi/eurovaalit',
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Etusivu', item: 'https://visapollari.fi/' },
      { '@type': 'ListItem', position: 2, name: 'Blogi', item: 'https://visapollari.fi/blogi' },
      { '@type': 'ListItem', position: 3, name: 'Eurovaalit', item: 'https://visapollari.fi/blogi/eurovaalit' },
    ],
  };

  return (
    <div className="max-w-8xl mx-auto bg-gray-950 p-4">
      <Script
        id="eurovaalit-article-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Script
        id="eurovaalit-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <article aria-labelledby="eurovaalit-heading">
        <Header>
          <span id="eurovaalit-heading">Eurovaalit LIB tulosveikkaus</span>
        </Header>
        <Text>
          Tänään on eurovaalit ja Liberaalipuolueeella on täysi lista ehdokkaita. Veikkaa listan sisäistä järjestystä
          alla olevalla lomakkeella.
        </Text>
        <Text>Järjestyksen oikein arvanneille luvassa mainetta ja kunniaa</Text>

        <TierList candidates={candidates} />
      </article>
    </div>
  );
};

export default Page;
