import ArticleDates from '@/components/ArticleDates';
import Header from '@/components/BlogHeader';
import { contentDates } from '@/lib/contentDates';
import { getRankingGuesses } from '@/lib/rankings';
import { articleAuthorJsonLd } from '@/lib/schema';
import ResultsClient from './ResultsClient';

export const revalidate = 300;

export default async function Page() {
  const guesses = await getRankingGuesses().catch(() => []);
  const url = 'https://visapollari.fi/blogi/eurovaalit/results';
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Eurovaalit LIB tulosveikkaus: Results',
    description: 'Tuloksia ja arvauksia Liberaalipuolueen listalta.',
    author: articleAuthorJsonLd,
    datePublished: contentDates.eurovaalitResults.published,
    dateModified: contentDates.eurovaalitResults.modified,
    image: `${url}/opengraph-image`,
    url,
    mainEntityOfPage: url,
  };
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Etusivu', item: 'https://visapollari.fi/' },
      { '@type': 'ListItem', position: 2, name: 'Blogi', item: 'https://visapollari.fi/blogi' },
      { '@type': 'ListItem', position: 3, name: 'Eurovaalit', item: 'https://visapollari.fi/blogi/eurovaalit' },
      { '@type': 'ListItem', position: 4, name: 'Tulokset', item: url },
    ],
  };

  return (
    <div className="mx-auto bg-gray-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <article aria-labelledby="eurovaalit-results-heading">
        <Header>
          <span id="eurovaalit-results-heading">Eurovaalit LIB tulosveikkaus: Results</span>
        </Header>
        <ArticleDates {...contentDates.eurovaalitResults} />
        <ResultsClient guesses={guesses} />
      </article>
    </div>
  );
}
