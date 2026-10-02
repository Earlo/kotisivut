'use client';

import CandidateProfile from '@/components/stv/CandidateProfile';
import { cn } from '@/lib/helpers';
import { useState, type Dispatch, type FC, type FormEvent, type SetStateAction } from 'react';

interface ListFormProps {
  onSubmit: (ranking: string[]) => Promise<void>;
  isSubmitting: boolean;
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  candidates: { name: string; imageSrc: string; color?: string }[];
  className?: string;
}

const ListForm: FC<ListFormProps> = ({
  onSubmit,
  isSubmitting,
  name,
  setName,
  candidates,
  className = 'grid-cols-4',
}) => {
  const [newVote, setNewVote] = useState<string[]>(Array(candidates.length).fill(''));
  const rankingSlots = candidates.map(({ name: candidateName }) => `ranking-slot-${candidateName}`);
  const ranking = newVote.filter((choice) => choice);

  const submitVote = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting || ranking.length < candidates.length || !name.trim()) return;
    void onSubmit(ranking);
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

  if (!name.trim()) {
    return (
      <form onSubmit={submitVote} aria-busy={isSubmitting}>
        <label htmlFor="guesser-name" className="block text-white">
          Aseta ensin nimesi
        </label>
        <input
          id="guesser-name"
          type="text"
          value={name}
          maxLength={80}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="mb-2 rounded-sm border border-gray-300 bg-slate-900 p-2"
        />
      </form>
    );
  }
  return (
    <form onSubmit={submitVote} aria-busy={isSubmitting}>
      <label htmlFor="guesser-name" className="block text-white">
        Arvaajan nimi
      </label>
      <input
        id="guesser-name"
        type="text"
        value={name}
        maxLength={80}
        disabled={isSubmitting}
        required
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="mb-2 rounded-sm border border-gray-300 bg-slate-900 p-2"
      />

      <div className={cn(`mb-4 grid grid-cols-2 gap-4`, className)}>
        {candidates.map((candidate) => (
          <div key={candidate.name}>
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
              <span className="inline-block w-10 text-white">{'#' + (index + 1)}</span>
              <input
                type="text"
                value={newVote[index]}
                onChange={(e) => updateVote(index, e.target.value)}
                placeholder={`#${index + 1} valinta`}
                className="rounded-sm border border-gray-300 bg-slate-900 p-2"
                disabled
              />
              {newVote[index] ? (
                <button
                  type="button"
                  onClick={() => updateVote(index, '')}
                  disabled={isSubmitting}
                  className="ml-2 rounded-sm bg-red-500 p-2 text-white hover:bg-red-700"
                >
                  X
                </button>
              ) : null}
            </div>
          ) : null,
        )}
        <button
          type="submit"
          className={cn('mt-2 rounded-sm bg-blue-500 p-2 text-white disabled:cursor-not-allowed disabled:bg-gray-500')}
          disabled={isSubmitting || ranking.length < candidates.length}
        >
          {isSubmitting
            ? 'Tallennetaan…'
            : ranking.length < candidates.length
              ? 'Valitse vielä ' + (candidates.length - ranking.length) + ' ehdokasta'
              : 'Lähetä'}
        </button>
      </div>
    </form>
  );
};

export default ListForm;
