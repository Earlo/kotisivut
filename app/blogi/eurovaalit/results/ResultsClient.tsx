'use client';

import CandidateProfile from '@/components/stv/CandidateProfile';
import type { RankingGuess } from '@/lib/rankings';
import { useState } from 'react';
import { candidates } from '../candidates';

type ScoreState = { [madeBy: string]: { [candidate: string]: boolean } };

export default function ResultsClient({ guesses }: { guesses: RankingGuess[] }) {
  const [scores, setScores] = useState<ScoreState>({});

  const toggle = (madeBy: string, candidate: string) => {
    setScores((prev) => {
      const user = prev[madeBy] ?? {};
      const nextVal = !(user[candidate] ?? false);
      return { ...prev, [madeBy]: { ...user, [candidate]: nextVal } };
    });
  };

  return (
    <div className="flex max-w-[100vw] grow flex-row overflow-scroll">
      {guesses.map((guess) => {
        const ranking = JSON.parse(guess.ranking) as string[];
        const sum = ranking.reduce<number>((acc, candidate) => {
          return acc + (scores[guess.made_by]?.[candidate] ? 1 : 0);
        }, 0);

        return (
          <div key={guess.id} className="mb-4 ml-1 w-36 min-w-36 bg-gray-900 p-1">
            <span>
              {guess.made_by} {sum}
            </span>
            {ranking.map((candidate, index) => {
              const imageSrc = candidates.find(({ name }) => name === candidate)?.imageSrc;
              return imageSrc ? (
                <CandidateProfile
                  key={`${candidate}-${index}`}
                  name={candidate}
                  imageSrc={imageSrc}
                  onClick={() => toggle(guess.made_by, candidate)}
                  className={scores[guess.made_by]?.[candidate] ? 'border-4 border-green-500' : 'border-red-500'}
                />
              ) : null;
            })}
          </div>
        );
      })}
    </div>
  );
}
