export interface ReferenceSource {
  href: string;
  title: string;
}

interface ReferenceProps {
  number: number;
}

interface ReferenceListProps {
  sources: readonly ReferenceSource[];
}

const Reference = ({ number }: ReferenceProps) => {
  return (
    <sup className="ml-0.5 text-xs leading-none font-semibold">
      <a
        href={`#reference-${number}`}
        aria-label={`Viite ${number}`}
        className="text-sky-300 underline decoration-sky-300/50 underline-offset-2 transition hover:text-sky-200 hover:decoration-sky-200 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
      >
        {number}
      </a>
    </sup>
  );
};

export const ReferenceList = ({ sources }: ReferenceListProps) => {
  if (sources.length === 0) return null;

  return (
    <section className="mt-12 max-w-3xl border-t border-white/10 pt-6" aria-labelledby="references-heading">
      <h2 id="references-heading" className="text-xl font-bold text-gray-200">
        Lähteet
      </h2>
      <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-gray-400">
        {sources.map((source, index) => (
          <li key={source.href} id={`reference-${index + 1}`} className="scroll-mt-6 pl-1 target:text-gray-200">
            <a
              href={source.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-300 underline decoration-sky-300/50 underline-offset-4 transition hover:text-sky-200 hover:decoration-sky-200 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
            >
              {source.title}
              <span className="sr-only"> (avautuu uuteen välilehteen)</span>
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default Reference;
