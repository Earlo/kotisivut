'use client';
import Bar from './Bar';
import React, { useState } from 'react';

interface ResultGraphProps {
  votes: { vote: string[]; color: string }[];
  candidates: { name: string; imageSrc: string; color: string }[];
  depth?: number;
}

const ResultGraph: React.FC<ResultGraphProps> = ({
  votes,
  candidates,
  depth = 0,
}) => {
  const voteCounts: { [key: string]: number } = {};
  const [showNextRound, setShowNextRound] = useState<boolean>(false);

  votes.forEach((vote) => {
    const candidate = vote.vote.length > 0 ? vote.vote[0] : 'Tyhjät / Hylätyt';
    if (voteCounts[candidate]) {
      voteCounts[candidate]++;
    } else {
      voteCounts[candidate] = 1;
    }
  });
  const candidateWithLeastVotes = candidates.reduce((prev, curr) => {
    if (voteCounts[curr.name] < voteCounts[prev.name]) {
      return curr;
    } else {
      return prev;
    }
  });
  const nextRound = votes.map((vote) => {
    if (vote.vote[0] === candidateWithLeastVotes.name) {
      return {
        vote: vote.vote
          .slice(1)
          .filter((candidate) => candidate !== candidateWithLeastVotes.name),
        color: vote.color,
      };
    } else {
      return {
        vote: vote.vote.filter(
          (candidate) => candidate !== candidateWithLeastVotes.name,
        ),
        color: vote.color,
      };
    }
  });
  const highestVotes = Math.max(...Object.values(voteCounts));
  const maxVotes = votes.filter((vote) => vote.vote.length > 0).length;
  const isOver = highestVotes > maxVotes / 2;
  return (
    <>
      <div className="mx-auto max-w-md">
        <h2 className="mb-4 text-lg font-bold text-gray-200">
          {depth + 1}. kierroksen tulos
        </h2>
        <div className="flex items-end justify-between border-t border-white">
          {Object.entries(voteCounts).map(([candidate, count]) => (
            <Bar
              key={candidate}
              maxVotes={maxVotes}
              votes={count}
              label={candidate}
              color={candidates.find((c) => c.name === candidate)?.color}
            />
          ))}
        </div>
        {!isOver && !showNextRound ? (
          <button
            className="mx-auto mt-8 rounded-lg bg-blue-500 px-4 py-2 text-lg font-bold text-white"
            onClick={() => setShowNextRound(true)}
          >
            Laske seuraava kierros
          </button>
        ) : isOver ? (
          <button className="mx-auto mt-8 rounded-lg bg-gray-500 px-4 py-2 text-lg font-bold text-white">
            {'Voittaja on ' +
              Object.entries(voteCounts).reduce((prev, curr) => {
                if (curr[1] > prev[1]) {
                  return curr;
                } else {
                  return prev;
                }
              }) +
              ' / ' +
              maxVotes +
              ' ääntä' +
              ' (' +
              Math.round((highestVotes / maxVotes) * 100) +
              ' %)'}
          </button>
        ) : null}
      </div>
      {!isOver && showNextRound ? (
        <ResultGraph
          votes={nextRound}
          candidates={candidates.filter(
            (candidate) => candidate.name !== candidateWithLeastVotes.name,
          )}
          depth={depth + 1}
        />
      ) : null}
    </>
  );
};

export default ResultGraph;
