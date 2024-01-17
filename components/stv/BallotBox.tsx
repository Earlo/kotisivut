'use client';
import Vote from './Vote';
import CandidateProfile from './CandidateProfile';
import React, { useState } from 'react';
interface BallotBoxProps {
  votes: string[][];
  setVotes: React.Dispatch<React.SetStateAction<string[][]>>;
  candidates: { name: string; imageSrc: string; color: string }[]; // Include candidate's color if needed
}

const BallotBox: React.FC<BallotBoxProps> = ({
  votes,
  setVotes,
  candidates,
}) => {
  const [newVote, setNewVote] = useState<string[]>(Array(4).fill(''));

  const addVote = () => {
    const validVote = newVote.filter((choice) => choice);
    if (validVote.length > 0) {
      setVotes([newVote, ...votes]);
      setNewVote(Array(4).fill(''));
    }
  };

  const handleCandidateClick = (candidateName: string) => {
    const freeIndex = newVote.indexOf('');
    if (freeIndex !== -1) {
      const updatedVote = [...newVote];
      updatedVote[freeIndex] = candidateName;
      setNewVote(updatedVote);
    }
  };

  const updateVote = (index: number, value: string) => {
    const updatedVote = [...newVote];
    updatedVote[index] = value;
    setNewVote(updatedVote);
  };

  // Render the candidate cards on top of the ballot box
  return (
    <div className="mx-auto my-8  rounded-lg bg-gray-700 p-8 shadow-lg">
      <h2 className="mb-6 text-center text-2xl font-bold text-white">
        Äänilipas (Ääniä: {votes.length} kpl)
      </h2>
      <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {candidates.map((candidate) => (
          <div key={candidate.name} className="cursor-pointer">
            <CandidateProfile
              name={candidate.name}
              imageSrc={candidate.imageSrc}
              onClick={() => handleCandidateClick(candidate.name)}
              disabled={
                newVote.includes(candidate.name)
                  ? 'Lipukkeessa #' + (newVote.indexOf(candidate.name) + 1)
                  : ''
              }
            />
          </div>
        ))}
      </div>{' '}
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
          {votes.map((vote, index) => (
            <Vote key={index} candidates={vote} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BallotBox;
