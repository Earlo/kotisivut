'use client';
import { candidates } from '../candidates';
import Header from '@/components/BlogHeader';
import Text from '@/components/Text';
import CandidateProfile from '@/components/stv/CandidateProfile';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const [guesses, setGuesses] = useState([]);
  const [scores, setScores] = useState({});

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
    const initScores = {};
    guesses.forEach((guess) => {
      initScores[guess.made_by] = {};
      const ranking = JSON.parse(guess.ranking);
      ranking.forEach((candidate, index) => {
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
      <div className="flex max-w-[100vw] flex-grow flex-row overflow-scroll">
        {guesses.map((guess, index) => (
          <div key={index} className="mb-4 ml-1 w-36 min-w-36 bg-gray-900 p-1">
            <span>
              {guess.made_by}{' '}
              {JSON.parse(guess.ranking)
                .map((candidate) => (scores[guess.made_by][candidate] ? 1 : 0))
                .reduce((a, b) => a + b, 0)}
            </span>
            {JSON.parse(guess.ranking).map((candidate, index) => (
              <CandidateProfile
                key={index}
                name={candidate}
                imageSrc={
                  candidates.find((c) => c.name === candidate)?.imageSrc
                }
                onClick={() => {
                  const newScores = { ...scores };
                  newScores[guess.made_by][candidate] =
                    !newScores[guess.made_by][candidate];
                  setScores(newScores);
                }}
                className={
                  scores[guess.made_by][candidate]
                    ? 'border-4 border-green-500'
                    : 'border-red-500'
                }
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
