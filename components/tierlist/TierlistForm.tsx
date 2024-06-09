'use client';
import CandidateProfile from '@/components/stv/CandidateProfile';
import { cn } from '@/lib/helpers';
import React, { useState } from 'react';
interface ListFormProps {
  votes: string[][];
  setVotes: React.Dispatch<React.SetStateAction<string[][]>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  candidates: { name: string; imageSrc: string; color?: string }[];
  className?: string;
}

const ListForm: React.FC<ListFormProps> = ({
  votes,
  setVotes,
  name,
  setName,
  candidates,
  className = 'grid-cols-4',
}) => {
  const [newVote, setNewVote] = useState<string[]>(
    Array(candidates.length).fill(''),
  );

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

  if (!name) {
    return (
      <>
        <label className="block text-white">Aseta ensin nimesi</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={`Name`}
          className={'mb-2 rounded border border-gray-300 p-2'}
        />
      </>
    );
  }
  return (
    <>
      <label className="block text-white">Arvaajan nimi</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={`Name`}
        className={'mb-2 rounded border border-gray-300 p-2'}
      />

      <div className={cn(`mb-4 grid grid-cols-2 gap-4`, className)}>
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
      </div>
      <div className="mb-4 flex flex-col space-y-2">
        {Array(candidates.length)
          .fill(null)
          .map((_, index) =>
            index === 0 || newVote[index - 1] ? (
              <div key={index}>
                <span className="inline-block w-10 text-white">
                  {'#' + (index + 1)}
                </span>
                <input
                  type="text"
                  value={newVote[index]}
                  onChange={(e) => updateVote(index, e.target.value)}
                  placeholder={`#${index + 1} valinta`}
                  className={'border-gray-30b rounded border p-2'}
                />
                <button
                  onClick={() => updateVote(index, '')}
                  className="ml-2 rounded bg-red-500 p-2 text-white hover:bg-red-700"
                >
                  X
                </button>
              </div>
            ) : null,
          )}
        <button
          onClick={addVote}
          className="mt-2 rounded bg-blue-500 p-2 text-white"
        >
          Lähetä arvaus
        </button>
      </div>
    </>
  );
};

export default ListForm;
