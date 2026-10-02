'use client';

import { useToaster } from '@/components/generic/Toaster';
import { presidentialCandidates } from '@/lib/submissionValidation';
import { useRef, useState, type FC } from 'react';
import VoteForm from './VoteForm';

const RealVote: FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const submissionPending = useRef(false);
  const { addToast } = useToaster();

  const handleSubmit = async (vote: string[]): Promise<boolean> => {
    if (submissionPending.current) return false;
    submissionPending.current = true;
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/votes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vote),
      });
      if (!response.ok) {
        throw new Error(
          response.status === 429
            ? 'Liian monta lähetystä. Odota hetki ja yritä uudelleen.'
            : 'Äänen tallennus epäonnistui. Yritä uudelleen.',
        );
      }
      addToast('Ääni tallennettu', 'success');
      return true;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Äänen tallennus epäonnistui. Yritä uudelleen.';
      setSubmitError(message);
      addToast(message, 'error');
      return false;
    } finally {
      submissionPending.current = false;
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full rounded-lg bg-gray-700 p-4 shadow-lg">
      <VoteForm
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        candidates={presidentialCandidates}
        className="lg:grid-cols-6"
      />
      {submitError && (
        <p role="alert" className="mt-3 text-red-300">
          {submitError}
        </p>
      )}
    </div>
  );
};

export default RealVote;
