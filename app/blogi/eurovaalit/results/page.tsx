'use client';

import Header from '@/components/BlogHeader';
import CandidateProfile from '@/components/stv/CandidateProfile';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { candidates } from '../candidates';

type Guess = { made_by: string; ranking: string };
type ScoreState = { [madeBy: string]: { [candidate: string]: boolean } };

const Page = () => {
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [scores, setScores] = useState<ScoreState>({});

  useEffect(() => {
    void (async () => {
      try {
        const r = await fetch('/api/tierlist');
        const data = (await r.json()) as Guess[];
        setGuesses(data);
      } catch (err) {
        console.error('Failed to fetch guesses', err);
      }
    })();
  }, []);

  const toggle = (madeBy: string, candidate: string) => {
    setScores((prev) => {
      const user = prev[madeBy] ?? {};
      const nextVal = !(user[candidate] ?? false);
      return {
        ...prev,
        [madeBy]: {
          ...user,
          [candidate]: nextVal,
        },
      };
    });
  };

  return (
    <div className="mx-auto bg-gray-950">
      <Script
        id="eurovaalit-results-article-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Eurovaalit LIB tulosveikkaus: Results',
            description: 'Tuloksia ja arvauksia Liberaalipuolueen listalta.',
            author: { '@type': 'Person', name: 'Visa Pollari' },
            mainEntityOfPage: 'https://visapollari.fi/blogi/eurovaalit/results',
          }),
        }}
      />
      <Script
        id="eurovaalit-results-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Etusivu', item: 'https://visapollari.fi/' },
              { '@type': 'ListItem', position: 2, name: 'Blogi', item: 'https://visapollari.fi/blogi' },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Eurovaalit',
                item: 'https://visapollari.fi/blogi/eurovaalit',
              },
              {
                '@type': 'ListItem',
                position: 4,
                name: 'Tulokset',
                item: 'https://visapollari.fi/blogi/eurovaalit/results',
              },
            ],
          }),
        }}
      />
      <article aria-labelledby="eurovaalit-results-heading">
        <Header>
          <span id="eurovaalit-results-heading">Eurovaalit LIB tulosveikkaus: Results</span>
        </Header>
        <div className="flex max-w-[100vw] grow flex-row overflow-scroll">
          {guesses.map((guess, index) => {
            const ranking = JSON.parse(guess.ranking) as string[];
            const sum = ranking.reduce<number>((acc, c) => acc + (scores[guess.made_by]?.[c] ? 1 : 0), 0);
            return (
              <div key={index} className="mb-4 ml-1 w-36 min-w-36 bg-gray-900 p-1">
                <span>
                  {guess.made_by} {sum}
                </span>
                {ranking.map((candidate: string, i: number) =>
                  candidates.find((c) => c.name === candidate)?.imageSrc ? (
                    <CandidateProfile
                      key={i}
                      name={candidate}
                      imageSrc={candidates.find((c) => c.name === candidate)?.imageSrc ?? ''}
                      onClick={() => toggle(guess.made_by, candidate)}
                      className={scores[guess.made_by]?.[candidate] ? 'border-4 border-green-500' : 'border-red-500'}
                    />
                  ) : null,
                )}
              </div>
            );
          })}
        </div>
      </article>
    </div>
  );
};

export default Page;
