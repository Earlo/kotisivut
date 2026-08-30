'use client';

import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { useCallback, useEffect, useRef, useState } from 'react';
import Tapahtumakortti, { getLevelStyle, type VaalirahoitusCase } from './Tapahtumakortti';
import { SELECT_VAALIRAHOITUS_CASE_EVENT, type SelectVaalirahoitusCaseDetail } from './Tapauspainike';

interface TapausnavigaattoriProps {
  tapaukset: VaalirahoitusCase[];
}

interface VaihtopainikeProps {
  direction: 'previous' | 'next';
  onClick: () => void;
  compact?: boolean;
}

const Vaihtopainike = ({ direction, onClick, compact = false }: VaihtopainikeProps) => {
  const previous = direction === 'previous';
  const Icon = previous ? ChevronLeftIcon : ChevronRightIcon;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`grid shrink-0 place-items-center rounded-full bg-white/[0.07] text-zinc-200 transition hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 ${compact ? 'h-9 w-9' : 'h-10 w-10'}`}
      aria-label={previous ? 'Edellinen tapaus' : 'Seuraava tapaus'}
    >
      <Icon className={compact ? 'h-4 w-4' : 'h-5 w-5'} aria-hidden="true" />
    </button>
  );
};

const Tapausnavigaattori = ({ tapaukset }: TapausnavigaattoriProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mobileVisible, setMobileVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const previous = useCallback(() => {
    setCurrentIndex((index) => (index - 1 + tapaukset.length) % tapaukset.length);
  }, [tapaukset.length]);
  const next = useCallback(() => {
    setCurrentIndex((index) => (index + 1) % tapaukset.length);
  }, [tapaukset.length]);

  useEffect(() => {
    const updateVisibility = () => {
      const shouldShow = window.scrollY > Math.min(360, window.innerHeight * 0.45);
      setMobileVisible(shouldShow);
      if (!shouldShow) setMobileOpen(false);
    };

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    return () => window.removeEventListener('scroll', updateVisibility);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeWithEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeWithEscape);
    };
  }, [mobileOpen]);

  useEffect(() => {
    const selectCase = (event: CustomEvent<SelectVaalirahoitusCaseDetail>) => {
      const { nimi } = event.detail;
      const selectedIndex = tapaukset.findIndex((tapaus) => tapaus.nimi === nimi);
      if (selectedIndex === -1) return;

      setCurrentIndex(selectedIndex);

      if (window.matchMedia('(min-width: 64rem)').matches) return;

      setMobileVisible(true);
      setMobileOpen(true);
    };

    window.addEventListener(SELECT_VAALIRAHOITUS_CASE_EVENT, selectCase);
    return () => window.removeEventListener(SELECT_VAALIRAHOITUS_CASE_EVENT, selectCase);
  }, [tapaukset]);

  if (tapaukset.length === 0) return null;

  const current = tapaukset[currentIndex];
  if (!current) return null;

  const level = getLevelStyle(current.rikkeen_taso);
  const progress = `${((currentIndex + 1) / tapaukset.length) * 100}%`;
  const endTouch = (event: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const distance = (event.changedTouches[0]?.clientX ?? touchStartX.current) - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(distance) < 55) return;
    if (distance > 0) previous();
    else next();
  };

  return (
    <>
      <aside className="hidden lg:sticky lg:top-6 lg:block" aria-label="Vaalirahoituksen tapauskortit">
        <div className="rounded-xl bg-zinc-900/75 p-3 shadow-2xl shadow-black/30 backdrop-blur-xl">
          <div className="mb-3 px-1 pt-1">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[0.65rem] font-semibold tracking-[0.2em] text-red-300 uppercase">
                  Tapauksia datasta
                </p>
                <p className="mt-0.5 text-sm font-semibold text-zinc-200">
                  {currentIndex + 1} / {tapaukset.length}
                </p>
              </div>
              <div className="flex gap-2">
                <Vaihtopainike direction="previous" onClick={previous} compact />
                <Vaihtopainike direction="next" onClick={next} compact />
              </div>
            </div>
            <div className="mt-3 h-0.5 overflow-hidden rounded-full bg-white/10">
              <div
                className={`h-full rounded-full transition-[width] duration-300 ${level.accent}`}
                style={{ width: progress }}
              />
            </div>
          </div>
          <div className="h-128" aria-live="polite">
            <Tapahtumakortti key={currentIndex} tapaus={current} />
          </div>
          <p className="px-2 pt-3 pb-1 text-center text-[0.65rem] leading-4 text-zinc-500">
            Luokitus perustuu julkisen ilmoituksen tulkintaan.
          </p>
        </div>
      </aside>

      <div
        className={`fixed inset-x-3 bottom-3 z-40 transition duration-300 lg:hidden ${mobileVisible && !mobileOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'}`}
        aria-hidden={!mobileVisible || mobileOpen}
        inert={!mobileVisible || mobileOpen}
      >
        <div className="mx-auto flex h-14 max-w-lg items-center gap-2 rounded-lg bg-zinc-950/95 p-2 shadow-2xl shadow-black/60 backdrop-blur-xl">
          <Vaihtopainike direction="previous" onClick={previous} compact />
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="flex min-w-0 flex-1 items-center gap-3 rounded-md px-2 py-1 text-left focus-visible:outline-2 focus-visible:outline-sky-300"
            aria-label={`Avaa tapaus ${currentIndex + 1}: ${current.nimi}`}
          >
            <span className={`h-8 w-1 shrink-0 rounded-full ${level.accent}`} aria-hidden="true" />
            <span className="min-w-0 flex-1">
              <span className="block text-[0.62rem] font-semibold tracking-wider text-zinc-500 uppercase">
                Tapaus {currentIndex + 1}/{tapaukset.length}
              </span>
              <span className="block truncate text-sm font-bold text-white">{current.nimi}</span>
            </span>
            <ChevronUpIcon className="h-4 w-4 shrink-0 text-zinc-400" aria-hidden="true" />
          </button>
          <Vaihtopainike direction="next" onClick={next} compact />
        </div>
      </div>

      {mobileOpen && (
        <dialog
          open
          className="fixed inset-0 z-50 m-0 h-full max-h-none w-full max-w-none border-0 bg-transparent p-0 text-inherit lg:hidden"
          aria-modal="true"
          aria-label="Vaalirahoituksen tapauskortti"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
            aria-label="Sulje tapauskortti"
          />
          <div
            className="absolute inset-x-0 bottom-0 flex h-[min(42rem,calc(100dvh-0.75rem))] flex-col rounded-t-xl bg-zinc-900 shadow-2xl"
            onTouchStart={(event) => (touchStartX.current = event.changedTouches[0]?.clientX ?? null)}
            onTouchEnd={endTouch}
          >
            <div className="mx-auto mt-2 h-1 w-10 rounded-full bg-white/20" aria-hidden="true" />
            <div className="flex items-center gap-3 px-4 py-3">
              <Vaihtopainike direction="previous" onClick={previous} />
              <div className="min-w-0 flex-1 text-center">
                <p className="text-[0.62rem] font-semibold tracking-widest text-zinc-500 uppercase">
                  Pyyhkäise tai selaa
                </p>
                <p className="text-sm font-bold text-white">
                  {currentIndex + 1} / {tapaukset.length}
                </p>
              </div>
              <Vaihtopainike direction="next" onClick={next} />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                autoFocus
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-zinc-400 transition hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-sky-300"
                aria-label="Pienennä tapauskortti"
              >
                <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="h-0.5 bg-white/10">
              <div className={`h-full transition-[width] duration-300 ${level.accent}`} style={{ width: progress }} />
            </div>
            <div className="min-h-0 flex-1 px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]" aria-live="polite">
              <Tapahtumakortti key={currentIndex} tapaus={current} />
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default Tapausnavigaattori;
