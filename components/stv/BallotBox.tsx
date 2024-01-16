'use client';
import Vote from './Vote';
import React, { useState } from 'react';

interface BallotBoxProps {
  votes: string[][];
}

const BallotBox: React.FC<BallotBoxProps> = ({ votes }) => {
  const [allVotes, setAllVotes] = useState<string[][]>(votes);
  const [newVote, setNewVote] = useState<string[]>(Array(4).fill(''));

  const addVote = () => {
    const validVote = newVote.filter((choice) => choice);
    if (validVote.length > 0) {
      setAllVotes([newVote, ...allVotes]);
      setNewVote(Array(4).fill(''));
    }
  };

  const updateVote = (index: number, value: string) => {
    const updatedVote = [...newVote];
    updatedVote[index] = value;
    setNewVote(updatedVote);
  };

  return (
    <div className="mx-auto my-8 max-w-lg rounded-lg bg-gray-700 p-8 shadow-lg">
      <h2 className="mb-6 text-center text-2xl font-bold text-white">
        Äänilipas (Ääniä: {allVotes.length} kpl)
      </h2>
      <div className="mb-4 flex flex-col space-y-2">
        {Array(4)
          .fill(null)
          .map((_, index) =>
            index === 0 || newVote[index - 1] ? (
              <input
                key={index}
                type="text"
                value={newVote[index]}
                onChange={(e) => updateVote(index, e.target.value)}
                placeholder={`#${index + 1} valinta`}
                className={'rounded border border-gray-300 p-2 '}
              />
            ) : null,
          )}
        <button
          onClick={addVote}
          className="mt-2 rounded bg-blue-500 p-2 text-white"
        >
          Add Vote
        </button>
      </div>
      <div className="h-64 overflow-y-auto">
        <div className="space-y-4">
          {allVotes.map((vote, index) => (
            <Vote key={index} candidates={vote} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BallotBox;
