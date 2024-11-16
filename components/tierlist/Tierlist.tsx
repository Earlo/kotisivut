'use client';
import { useToaster } from '@/components/generic/Toaster';
import React, { useEffect, useState } from 'react';
import ListForm from './TierlistForm';

interface TierListProps {
  candidates: { name: string; imageSrc: string; color?: string }[];
}

const TierList: React.FC<TierListProps> = ({ candidates }) => {
  const [votes, setVotes] = useState<string[][]>([]);
  const [name, setName] = useState<string>('');
  const [quessMade, setQuessMade] = useState<boolean>(false);
  const { addToast } = useToaster();

  useEffect(() => {
    if (votes.length > 0) {
      const clienIp = window.location.hostname;
      fetch('/api/tierlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Forwarded-For': clienIp,
        },
        body: JSON.stringify({
          ranking: votes[0],
          name: name,
        }),
      });
      setQuessMade(true);
      setVotes([]);
      addToast('Veikkaus tallennettu', 'success');
    }
  }, [votes, name, addToast]);
  return (
    <div className="mx-auto w-full rounded-lg bg-gray-700 p-4 shadow-lg">
      {quessMade ? (
        <p className="text-white">Kiitos veikkauksestasi!</p>
      ) : (
        <ListForm
          votes={votes}
          setVotes={setVotes}
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
