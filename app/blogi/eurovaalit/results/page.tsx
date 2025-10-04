'use client';
import Header from '@/components/BlogHeader';
import CandidateProfile from '@/components/stv/CandidateProfile';
import { useEffect, useState } from 'react';
import { candidates } from '../candidates';

const Page = () => {
  const [guesses, setGuesses] = useState<{ made_by: string; ranking: string }[]>([]);
  const [scores, setScores] = useState<{
    [key: string]: { [key: string]: boolean };
  }>({});

  useEffect(() => {
    fetch('/api/tierlist', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        setGuesses(data);
      });
  }, []);

  useEffect(() => {
    const initScores = {} as { [key: string]: { [key: string]: boolean } };
    guesses.forEach((guess) => {
      initScores[guess.made_by] = {};
      const ranking = JSON.parse(guess.ranking);
      ranking.forEach((candidate: string) => {
        initScores[guess.made_by][candidate] = false;
      });
    });
    setScores(initScores);
  }, [guesses]);
  if (guesses.length !== Object.keys(scores).length) {
    return <div>Loading...</div>;
  }
  return (
    <div className="mx-auto bg-gray-950">
      <Header>Eurovaalit LIB tulosveikkaus: Results</Header>
      <div className="flex max-w-[100vw] grow flex-row overflow-scroll">
        {guesses.map((guess, index) => (
          <div key={index} className="mb-4 ml-1 w-36 min-w-36 bg-gray-900 p-1">
            <span>
              {guess.made_by}{' '}
              {JSON.parse(guess.ranking)
                .map((candidate: string) => (scores[guess.made_by][candidate] ? 1 : 0))
                .reduce((a: number, b: number) => a + b, 0)}
            </span>
            {JSON.parse(guess.ranking).map((candidate: string, index: number) => (
              <CandidateProfile
                key={index}
                name={candidate}
                imageSrc={candidates.find((c) => c.name === candidate)?.imageSrc ?? ''}
                onClick={() => {
                  const newScores = { ...scores };
                  newScores[guess.made_by][candidate] = !newScores[guess.made_by][candidate];
                  setScores(newScores);
                }}
                className={scores[guess.made_by][candidate] ? 'border-4 border-green-500' : 'border-red-500'}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
