import ArticleDates from '@/components/ArticleDates';
import Header from '@/components/BlogHeader';
import Text from '@/components/Text';
import { contentDates } from '@/lib/contentDates';
import { getRankingGuesses } from '@/lib/rankings';
import { articleAuthorJsonLd } from '@/lib/schema';
import type { Article, BreadcrumbList, WithContext } from 'schema-dts';
import ResultsClient from './ResultsClient';

export default async function Page() {
  const guesses = await getRankingGuesses();
  const url = 'https://visapollari.fi/blogi/eurovaalit/results';
  const articleJsonLd: WithContext<Article> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Eurovaalit 2024 – LIB-tulosveikkauksen tulosarkisto',
    description: 'Vuoden 2024 eurovaalien Liberaalipuolueen listan tulosveikkauksen tulokset ja arvaukset arkistossa.',
    author: articleAuthorJsonLd,
    datePublished: contentDates.eurovaalitResults.published,
    dateModified: contentDates.eurovaalitResults.modified,
    image: `${url}/opengraph-image`,
    url,
    mainEntityOfPage: url,
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
      { '@type': 'ListItem', position: 4, name: 'Tulosarkisto', item: url },
    ],
  };

  return (
    <div className="mx-auto bg-gray-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <article aria-labelledby="eurovaalit-results-heading">
        <Header>
          <span id="eurovaalit-results-heading">Eurovaalit 2024 – LIB-tulosveikkauksen tulosarkisto</span>
        </Header>
        <ArticleDates {...contentDates.eurovaalitResults} />
        <Text>Tämä sivu näyttää eurovaalien 9.6.2024 tulosveikkauksen arkistoidut tulokset ja arvaukset.</Text>
        <ResultsClient guesses={guesses} />
      </article>
    </div>
  );
}
