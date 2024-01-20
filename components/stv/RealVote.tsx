'use client';
import VoteForm from './VoteForm';
import React, { useEffect, useState } from 'react';

interface RealVoteProps {}

const RealVote: React.FC<RealVoteProps> = () => {
  const candidates = [
    { name: 'Li Andersson', imageSrc: '/stv/number_2.png', color: '#ff0000' },
    { name: 'Olli Rehn', imageSrc: '/stv/number_3.png', color: '#00ff00' },
    { name: 'Harry Harkimo', imageSrc: '/stv/number_4.png', color: '#0000ff' },
    {
      name: 'Jussi Halla-aho',
      imageSrc: '/stv/number_5.png',
      color: '#ffff00',
    },
    {
      name: 'Jutta Urpilainen',
      imageSrc: '/stv/number_6.png',
      color: '#ff00ff',
    },
    { name: 'Mika Aaltola', imageSrc: '/stv/number_7.png', color: '#00ffff' },
    {
      name: 'Alexander Stubb',
      imageSrc: '/stv/number_8.png',
      color: '#ff0000',
    },
    { name: 'Sari Essayah', imageSrc: '/stv/number_9.png', color: '#00ff00' },
    {
      name: 'Pekka Haavisto',
      imageSrc: '/stv/number_10.png',
      color: '#0000ff',
    },
  ];
  const [votes, setVotes] = useState<string[][]>([]);
  useEffect(() => {
    if (votes.length > 0) {
      const clienIp = window.location.hostname;
      fetch('/api/votes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Forwarded-For': clienIp,
        },
        body: JSON.stringify(votes[0]),
      });
    }
  }, [votes]);

  return (
    <div className="mx-auto w-full rounded-lg bg-gray-700 p-4 shadow-lg">
      <VoteForm
        votes={votes}
        setVotes={setVotes}
        candidates={candidates}
        className="grid-cols-6"
      />
    </div>
  );
};

export default RealVote;
