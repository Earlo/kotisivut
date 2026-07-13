import type { ContentDates } from '@/lib/contentDates';

const formatter = new Intl.DateTimeFormat('fi-FI', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'Europe/Helsinki',
});

export default function ArticleDates({ published, modified }: ContentDates) {
  const wasModified = published !== modified;

  return (
    <p className="mb-6 text-sm text-gray-400">
      Julkaistu <time dateTime={published}>{formatter.format(new Date(published))}</time>
      {wasModified && (
        <>
          {' · Päivitetty '}
          <time dateTime={modified}>{formatter.format(new Date(modified))}</time>
        </>
      )}
    </p>
  );
}
