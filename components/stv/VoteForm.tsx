'use client';
import { cn } from '@/lib/helpers';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import CandidateProfile from './CandidateProfile';
interface VoteFormProps {
  votes: string[][];
  setVotes: Dispatch<SetStateAction<string[][]>>;
  candidates: { name: string; imageSrc: string; color: string }[];
  className?: string;
}

const VoteForm: FC<VoteFormProps> = ({ votes, setVotes, candidates, className = 'grid-cols-4' }) => {
  const [newVote, setNewVote] = useState<string[]>(Array(candidates.length).fill(''));

  const addVote = () => {
    const validVote = newVote.filter((choice) => choice);
    if (validVote.length > 0) {
      setVotes([newVote, ...votes]);
      setNewVote(Array(candidates.length).fill(''));
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

  return (
    <>
      <div className={cn(`mb-4 grid grid-cols-2 gap-4`, className)}>
        {candidates.map((candidate) => (
          <div key={candidate.name} className="cursor-pointer">
            <CandidateProfile
              name={candidate.name}
              imageSrc={candidate.imageSrc}
              onClick={() => handleCandidateClick(candidate.name)}
              disabled={newVote.includes(candidate.name) ? 'Lipukkeessa #' + (newVote.indexOf(candidate.name) + 1) : ''}
            />
          </div>
        ))}
      </div>
      <div className="mb-4 flex flex-col space-y-2">
        {Array(candidates.length)
          .fill(null)
          .map((_, index) =>
            index === 0 || newVote[index - 1] ? (
              <input
                key={index}
                type="text"
                value={newVote[index]}
                onChange={(e) => updateVote(index, e.target.value)}
                placeholder={`#${index + 1} valinta`}
                className={'rounded-sm border border-gray-300 p-2'}
              />
            ) : null,
          )}
        <button onClick={addVote} className="mt-2 rounded-sm bg-blue-500 p-2 text-white">
          Add Vote
        </button>
      </div>
    </>
  );
};

export default VoteForm;
