'use client';

import { cn } from '@/lib/helpers';
import { useState, type Dispatch, type FC, type FormEvent, type SetStateAction } from 'react';
import CandidateProfile from './CandidateProfile';

interface VoteFormProps {
  votes?: string[][];
  setVotes?: Dispatch<SetStateAction<string[][]>>;
  onSubmit?: (vote: string[]) => Promise<boolean>;
  isSubmitting?: boolean;
  candidates: { name: string; imageSrc: string; color: string }[];
  className?: string;
}

const emptyVotes: string[][] = [];

const VoteForm: FC<VoteFormProps> = ({
  votes = emptyVotes,
  setVotes,
  onSubmit,
  isSubmitting = false,
  candidates,
  className = 'grid-cols-4',
}) => {
  const [newVote, setNewVote] = useState<string[]>(Array(candidates.length).fill(''));
  const rankingSlots = candidates.map(({ name }) => `ranking-slot-${name}`);

  const addVote = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validVote = newVote.filter((choice) => choice);
    if (validVote.length === 0 || isSubmitting) return;
    if (onSubmit) {
      if (!(await onSubmit(validVote))) return;
    } else setVotes?.([validVote, ...votes]);
    setNewVote(Array(candidates.length).fill(''));
  };

  const handleCandidateClick = (candidateName: string) => {
    if (isSubmitting || newVote.includes(candidateName)) return;
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
    <form onSubmit={(event) => void addVote(event)} aria-busy={isSubmitting}>
      <div className={cn(`mb-4 grid grid-cols-2 gap-4`, className)}>
        {candidates.map((candidate) => (
          <div key={candidate.name} className="cursor-pointer">
            <CandidateProfile
              name={candidate.name}
              imageSrc={candidate.imageSrc}
              onClick={() => handleCandidateClick(candidate.name)}
              disabled={
                isSubmitting
                  ? 'Tallennetaan'
                  : newVote.includes(candidate.name)
                    ? 'Lipukkeessa #' + (newVote.indexOf(candidate.name) + 1)
                    : ''
              }
            />
          </div>
        ))}
      </div>
      <div className="mb-4 flex flex-col space-y-2">
        {rankingSlots.map((slotId, index) =>
          index === 0 || newVote[index - 1] || newVote[index] ? (
            <div key={slotId}>
              <input
                type="text"
                value={newVote[index]}
                onChange={(e) => updateVote(index, e.target.value)}
                placeholder={`#${index + 1} valinta`}
                className={'rounded-sm border border-gray-300 p-2'}
                readOnly={Boolean(onSubmit)}
                disabled={isSubmitting}
                aria-label={`#${index + 1} valinta`}
              />
              {onSubmit && newVote[index] && (
                <button
                  type="button"
                  onClick={() => updateVote(index, '')}
                  disabled={isSubmitting}
                  aria-label={`Poista ${newVote[index]}`}
                  className="ml-2 rounded-sm bg-red-500 p-2 text-white hover:bg-red-700"
                >
                  X
                </button>
              )}
            </div>
          ) : null,
        )}
        <button
          type="submit"
          disabled={isSubmitting || !newVote.some(Boolean)}
          className="mt-2 rounded-sm bg-blue-500 p-2 text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'Tallennetaan…' : onSubmit ? 'Lähetä ääni' : 'Add Vote'}
        </button>
      </div>
    </form>
  );
};

export default VoteForm;
