import Vote from './Vote';
import VoteForm from './VoteForm';
import React from 'react';

interface BallotBoxProps {
  votes: string[][];
  setVotes: React.Dispatch<React.SetStateAction<string[][]>>;
  candidates: { name: string; imageSrc: string; color: string }[];
}

const BallotBox: React.FC<BallotBoxProps> = ({
  votes,
  setVotes,
  candidates,
}) => {
  return (
    <div className="mx-auto w-full rounded-lg bg-gray-700 p-4 shadow-lg">
      <h2 className="mb-6 text-center text-2xl font-bold text-white">
        Äänilipas (Ääniä: {votes.length} kpl)
      </h2>
      <VoteForm votes={votes} setVotes={setVotes} candidates={candidates} />
      <div className="h-64 overflow-y-auto">
        <div className="space-y-4">
          {votes.map((vote, index) => (
            <Vote key={index} candidates={vote} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BallotBox;
