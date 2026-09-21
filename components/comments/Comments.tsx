'use client';

import { useEffect, useId, useState, type FormEvent } from 'react';

type Comment = {
  id: string;
  author: string;
  body: string;
  created_at: string;
};

type CommentsProps = {
  pagePath: string;
  theme?: 'dark' | 'light';
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isComment(value: unknown): value is Comment {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.author === 'string' &&
    typeof value.body === 'string' &&
    typeof value.created_at === 'string'
  );
}

const formatter = new Intl.DateTimeFormat('fi-FI', {
  dateStyle: 'medium',
  timeStyle: 'short',
});

export default function Comments({ pagePath, theme = 'dark' }: CommentsProps) {
  const authorId = useId();
  const bodyId = useId();
  const [comments, setComments] = useState<Comment[]>([]);
  const [author, setAuthor] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadComments() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/comments?page=${encodeURIComponent(pagePath)}`, {
          cache: 'no-store',
          signal: controller.signal,
        });
        if (!response.ok) throw new Error('Kommenttien lataaminen epäonnistui.');

        const result: unknown = await response.json();
        if (!Array.isArray(result) || !result.every(isComment))
          throw new Error('Palvelin palautti virheellisen vastauksen.');
        setComments(result);
      } catch (caught) {
        if (caught instanceof DOMException && caught.name === 'AbortError') return;
        setError(caught instanceof Error ? caught.message : 'Kommenttien lataaminen epäonnistui.');
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    void loadComments();
    return () => controller.abort();
  }, [pagePath]);

  async function submitComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = new FormData(event.currentTarget);

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          page: pagePath,
          author,
          body,
          website: form.get('website'),
        }),
      });

      if (!response.ok) {
        const result: unknown = await response.json().catch(() => null);
        const message = isRecord(result) && typeof result.message === 'string' ? result.message : null;
        throw new Error(message ?? 'Kommentin lähettäminen epäonnistui.');
      }

      const comment: unknown = await response.json();
      if (!isComment(comment)) throw new Error('Palvelin palautti virheellisen vastauksen.');
      setComments((current) => [...current, comment]);
      setBody('');
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Kommentin lähettäminen epäonnistui.');
    } finally {
      setSubmitting(false);
    }
  }

  const dark = theme === 'dark';

  return (
    <section
      aria-labelledby={`comments-${bodyId}`}
      className={`mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 ${dark ? 'text-white' : 'text-gray-950'}`}
    >
      <h2 id={`comments-${bodyId}`} className="text-2xl font-bold">
        Kommentit
      </h2>

      <form onSubmit={(event) => void submitComment(event)} className="mt-6 space-y-4">
        <div>
          <label htmlFor={authorId} className="mb-1 block font-medium">
            Nimi
          </label>
          <input
            id={authorId}
            name="author"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            required
            minLength={2}
            maxLength={80}
            autoComplete="name"
            className={`w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 ${
              dark ? 'border-white/20 bg-white/10 text-white' : 'border-gray-300 bg-white text-gray-950'
            }`}
          />
        </div>

        <div>
          <label htmlFor={bodyId} className="mb-1 block font-medium">
            Kommentti
          </label>
          <textarea
            id={bodyId}
            name="body"
            value={body}
            onChange={(event) => setBody(event.target.value)}
            required
            minLength={2}
            maxLength={2000}
            rows={5}
            className={`w-full resize-y rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 ${
              dark ? 'border-white/20 bg-white/10 text-white' : 'border-gray-300 bg-white text-gray-950'
            }`}
          />
        </div>

        <div className="hidden" aria-hidden="true">
          <label htmlFor={`${bodyId}-website`}>Verkkosivusto</label>
          <input id={`${bodyId}-website`} name="website" tabIndex={-1} autoComplete="off" />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? 'Lähetetään…' : 'Lähetä kommentti'}
        </button>
      </form>

      {error && (
        <p role="alert" className="mt-4 text-red-500">
          {error}
        </p>
      )}

      <div className="mt-10" aria-live="polite">
        {loading ? (
          <p className={dark ? 'text-gray-400' : 'text-gray-600'}>Ladataan kommentteja…</p>
        ) : comments.length === 0 ? (
          <p className={dark ? 'text-gray-400' : 'text-gray-600'}></p>
        ) : (
          <ol className={`divide-y ${dark ? 'divide-white/10' : 'divide-gray-200'}`}>
            {comments.map((comment) => (
              <li key={comment.id} className="py-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-semibold">{comment.author}</p>
                  <time dateTime={comment.created_at} className={`text-sm ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {formatter.format(new Date(comment.created_at))}
                  </time>
                </div>
                <p className="mt-2 wrap-break-word whitespace-pre-wrap">{comment.body}</p>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
