'use client';

import { ArrowRightIcon } from '@heroicons/react/20/solid';

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
      className="inline-flex items-center gap-1 rounded-full bg-sky-300/10 px-2 py-0.5 align-baseline text-base font-semibold text-sky-300 ring-1 ring-sky-300/30 transition hover:bg-sky-300/20 hover:text-sky-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
      aria-label={`Näytä tapauskortti: ${nimi}`}
    >
      {children}
      <ArrowRightIcon className="h-3.5 w-3.5" aria-hidden="true" />
    </button>
  );
};

export default Tapauspainike;
