'use client';

import Header from '@/components/BlogHeader';
import CandidateProfile from '@/components/stv/CandidateProfile';
import { useEffect, useState } from 'react';
import { candidates } from '../candidates';

type Guess = { made_by: string; ranking: string };
type ScoreState = { [madeBy: string]: { [candidate: string]: boolean } };

const Page = () => {
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [scores, setScores] = useState<ScoreState>({});

  useEffect(() => {
    fetch('/api/tierlist', { method: 'GET' })
      .then((r) => r.json())
      .then((data: Guess[]) => setGuesses(data));
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
      <Header>Eurovaalit LIB tulosveikkaus: Results</Header>
      <div className="flex max-w-[100vw] grow flex-row overflow-scroll">
        {guesses.map((guess, index) => {
          const ranking: string[] = JSON.parse(guess.ranking);
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
    </div>
  );
};

export default Page;
