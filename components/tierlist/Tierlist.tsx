'use client';

import { useToaster } from '@/components/generic/Toaster';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import ListForm from './TierlistForm';

interface TierListProps {
  candidates: { name: string; imageSrc: string; color?: string }[];
}

const TierList: FC<TierListProps> = ({ candidates }) => {
  const [votes, setVotes] = useState<string[][]>([]);
  const [name, setName] = useState<string>('');
  const [guessMade, setGuessMade] = useState<boolean>(false);
  const { addToast } = useToaster();

  const handleVotesUpdate: Dispatch<SetStateAction<string[][]>> = (updater) => {
    setVotes((prev) => {
      const next = typeof updater === 'function' ? (updater as (p: string[][]) => string[][])(prev) : updater;
      if (next.length > 0) {
        const clientIp = typeof window !== 'undefined' ? window.location.hostname : 'unknown';
        fetch('/api/tierlist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Forwarded-For': clientIp,
          },
          body: JSON.stringify({
            ranking: next[0],
            name,
          }),
        }).finally(() => {
          setGuessMade(true);
          addToast('Veikkaus tallennettu', 'success');
        });
        return [];
      }
      return next;
    });
  };

  return (
    <div className="mx-auto w-full rounded-lg bg-gray-700 p-4 shadow-lg">
      {guessMade ? (
        <p className="text-white">Kiitos veikkauksestasi!</p>
      ) : (
        <ListForm
          votes={votes}
          setVotes={handleVotesUpdate}
          name={name}
          setName={setName}
          candidates={candidates}
          className="lg:grid-cols-6"
        />
      )}
    </div>
  );
};

export default TierList;
