'use client';

import { useToaster } from '@/components/generic/Toaster';
import { useRef, useState, type FC } from 'react';
import ListForm from './TierlistForm';

interface TierListProps {
  candidates: { name: string; imageSrc: string; color?: string }[];
}

const TierList: FC<TierListProps> = ({ candidates }) => {
  const [name, setName] = useState<string>('');
  const [guessMade, setGuessMade] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const submissionPending = useRef(false);
  const { addToast } = useToaster();

  const handleSubmit = async (ranking: string[]) => {
    if (submissionPending.current || guessMade) return;

    submissionPending.current = true;
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/tierlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ranking, name: name.trim() }),
      });
      if (!response.ok) {
        const message =
          response.status === 429
            ? 'Liian monta lähetystä. Odota hetki ja yritä uudelleen.'
            : 'Veikkauksen tallennus epäonnistui. Yritä uudelleen.';
        setSubmitError(message);
        addToast(message, 'error');
        return;
      }

      setGuessMade(true);
      addToast('Veikkaus tallennettu', 'success');
    } catch {
      const message = 'Veikkauksen tallennus epäonnistui. Tarkista verkkoyhteys ja yritä uudelleen.';
      setSubmitError(message);
      addToast(message, 'error');
    } finally {
      submissionPending.current = false;
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full rounded-lg bg-gray-700 p-4 shadow-lg">
      {guessMade ? (
        <p className="text-white">Kiitos veikkauksestasi!</p>
      ) : (
        <>
          <ListForm
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            name={name}
            setName={setName}
            candidates={candidates}
            className="lg:grid-cols-6"
          />
          {submitError && (
            <p role="alert" className="mt-3 text-red-300">
              {submitError}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default TierList;
