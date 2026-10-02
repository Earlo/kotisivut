import ArticleDates from '@/components/ArticleDates';
import Header from '@/components/BlogHeader';
import Text from '@/components/Text';
import TierList from '@/components/tierlist/Tierlist';
import { contentDates } from '@/lib/contentDates';
import { articleAuthorJsonLd } from '@/lib/schema';
import type { Metadata } from 'next';
import type { Article, BreadcrumbList, WithContext } from 'schema-dts';
import { candidates } from './candidates';

export const metadata = {
  title: 'Eurovaalit 2024 – LIB-tulosveikkauksen arkisto',
  description: 'Arkisto vuoden 2024 eurovaalien Liberaalipuolueen ehdokaslistan tulosveikkauksesta.',
  alternates: { canonical: '/blogi/eurovaalit' },
  robots: { index: false, follow: true },
  openGraph: {
    title: 'Eurovaalit 2024 – LIB-tulosveikkauksen arkisto',
    description: 'Arkisto vuoden 2024 eurovaalien Liberaalipuolueen ehdokaslistan tulosveikkauksesta.',
    images: [
      {
        url: 'https://visapollari.fi/blogi/eurovaalit/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Eurovaalien 2024 LIB-tulosveikkauksen esikatselukuva',
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
    description: 'Arkisto vuoden 2024 eurovaalien Liberaalipuolueen ehdokaslistan tulosveikkauksesta.',
  },
} satisfies Metadata;

const Page = () => {
  const articleJsonLd: WithContext<Article> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: metadata.title,
    description: metadata.description,
    author: {
      ...articleAuthorJsonLd,
    },
    datePublished: contentDates.eurovaalit.published,
    dateModified: contentDates.eurovaalit.modified,
    image: 'https://visapollari.fi/blogi/eurovaalit/opengraph-image',
    url: 'https://visapollari.fi/blogi/eurovaalit',
    mainEntityOfPage: 'https://visapollari.fi/blogi/eurovaalit',
  };

  const breadcrumbJsonLd: WithContext<BreadcrumbList> = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Etusivu', item: 'https://visapollari.fi/' },
      { '@type': 'ListItem', position: 2, name: 'Blogi', item: 'https://visapollari.fi/blogi' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Eurovaalit 2024 – tulosveikkauksen arkisto',
        item: 'https://visapollari.fi/blogi/eurovaalit',
      },
    ],
  };

  return (
    <div className="max-w-8xl mx-auto bg-gray-950 p-4">
      <script
        id="eurovaalit-article-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        id="eurovaalit-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <article aria-labelledby="eurovaalit-heading">
        <Header>
          <span id="eurovaalit-heading">Eurovaalit 2024 – LIB-tulosveikkauksen arkisto</span>
        </Header>
        <ArticleDates {...contentDates.eurovaalit} />
        <Text>Tämä sivu on arkisto eurovaalien 9.6.2024 tulosveikkauksesta. Alla oleva teksti on vaalipäivältä.</Text>
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
