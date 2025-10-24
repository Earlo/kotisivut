'use client';
import { FC, useState } from 'react';
import Bar from './Bar';

interface ResultGraphProps {
  votes: { vote: string[]; color: string }[];
  candidates: { name: string; imageSrc: string; color: string }[];
  depth?: number;
}

const ResultGraph: FC<ResultGraphProps> = ({ votes, candidates, depth = 0 }) => {
  const voteCounts: Record<string, number> = {};
  const [showNextRound, setShowNextRound] = useState(false);
  votes.forEach((v) => {
    const candidate = v.vote.length > 0 ? v.vote[0] : 'Tyhjät / Hylätyt';
    voteCounts[candidate] = (voteCounts[candidate] ?? 0) + 1;
  });
  const candidateWithLeastVotes = candidates.reduce((prev, curr) => {
    const pv = voteCounts[prev.name] ?? 0;
    const cv = voteCounts[curr.name] ?? 0;
    return cv < pv ? curr : prev;
  });
  const nextRound = votes.map((v) => {
    if (v.vote[0] === candidateWithLeastVotes.name) {
      return {
        vote: v.vote.slice(1).filter((c) => c !== candidateWithLeastVotes.name),
        color: v.color,
      };
    }
    return {
      vote: v.vote.filter((c) => c !== candidateWithLeastVotes.name),
      color: v.color,
    };
  });
  const highestVotes = Math.max(0, ...Object.values(voteCounts));
  const maxVotes = votes.filter((v) => v.vote.length > 0).length;
  const isOver = highestVotes > maxVotes / 2;
  const winnerEntry = Object.entries(voteCounts).reduce<[string, number] | null>((prev, curr) => {
    if (!prev) return curr;
    return curr[1] > prev[1] ? curr : prev;
  }, null) ?? ['—', 0];
  const winnerName = winnerEntry[0];
  return (
    <>
      <div className="mx-auto max-w-md">
        <h2 className="mb-4 text-lg font-bold text-gray-200">{depth + 1}. kierroksen tulos</h2>
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
            {`Voittaja on ${winnerName} / ${maxVotes} ääntä (${Math.round((highestVotes / maxVotes) * 100)} %)`}
          </button>
        ) : null}
      </div>
      {!isOver && showNextRound ? (
        <ResultGraph
          votes={nextRound}
          candidates={candidates.filter((c) => c.name !== candidateWithLeastVotes.name)}
          depth={depth + 1}
        />
      ) : null}
    </>
  );
};

export default ResultGraph;
