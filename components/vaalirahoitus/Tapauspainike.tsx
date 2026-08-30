'use client';

export const SELECT_VAALIRAHOITUS_CASE_EVENT = 'vaalirahoitus:select-case';

export interface SelectVaalirahoitusCaseDetail {
  nimi: string;
}

declare global {
  interface WindowEventMap {
    'vaalirahoitus:select-case': CustomEvent<SelectVaalirahoitusCaseDetail>;
  }
}

interface TapauspainikeProps {
  nimi: string;
  children: React.ReactNode;
}

const Tapauspainike = ({ nimi, children }: TapauspainikeProps) => {
  const selectCase = () => {
    window.dispatchEvent(
      new CustomEvent<SelectVaalirahoitusCaseDetail>(SELECT_VAALIRAHOITUS_CASE_EVENT, {
        detail: { nimi },
      }),
    );
  };

  return (
    <button
      type="button"
      onClick={selectCase}
      className="inline border-b border-dotted border-sky-300/50 p-0 align-baseline font-medium text-sky-200/90 transition-colors hover:border-sky-200 hover:text-sky-100 focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
      aria-label={`Näytä tapauskortti: ${nimi}`}
    >
      {children}
    </button>
  );
};

export default Tapauspainike;
