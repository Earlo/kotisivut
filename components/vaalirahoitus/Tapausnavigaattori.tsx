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
  const [mobileDragY, setMobileDragY] = useState(0);
  const [mobileDragging, setMobileDragging] = useState(false);
  const [mobileClosing, setMobileClosing] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const mobileDragStartY = useRef<number | null>(null);
  const mobileCloseTimer = useRef<number | null>(null);

  const previous = useCallback(() => {
    setCurrentIndex((index) => (index - 1 + tapaukset.length) % tapaukset.length);
  }, [tapaukset.length]);
  const next = useCallback(() => {
    setCurrentIndex((index) => (index + 1) % tapaukset.length);
  }, [tapaukset.length]);
  const finishMobileClose = useCallback(() => {
    mobileCloseTimer.current = null;
    setMobileOpen(false);
    setMobileClosing(false);
    setMobileDragY(0);
  }, []);
  const closeMobileCard = useCallback(() => {
    if (mobileClosing) return;

    setMobileDragging(false);
    setMobileDragY(0);
    setMobileClosing(true);
    mobileCloseTimer.current = window.setTimeout(finishMobileClose, 320);
  }, [finishMobileClose, mobileClosing]);
  const openMobileCard = useCallback(() => {
    if (mobileCloseTimer.current !== null) window.clearTimeout(mobileCloseTimer.current);
    mobileCloseTimer.current = null;
    setMobileClosing(false);
    setMobileDragY(0);
    setMobileOpen(true);
  }, []);

  useEffect(
    () => () => {
      if (mobileCloseTimer.current !== null) window.clearTimeout(mobileCloseTimer.current);
    },
    [],
  );

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
      if (event.key === 'Escape') closeMobileCard();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', closeWithEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeWithEscape);
    };
  }, [closeMobileCard, mobileOpen]);

  useEffect(() => {
    const selectCase = (event: CustomEvent<SelectVaalirahoitusCaseDetail>) => {
      const { nimi } = event.detail;
      const selectedIndex = tapaukset.findIndex((tapaus) => tapaus.nimi === nimi);
      if (selectedIndex === -1) return;

      setCurrentIndex(selectedIndex);

      if (window.matchMedia('(min-width: 64rem)').matches) return;

      setMobileVisible(true);
      openMobileCard();
    };

    window.addEventListener(SELECT_VAALIRAHOITUS_CASE_EVENT, selectCase);
    return () => window.removeEventListener(SELECT_VAALIRAHOITUS_CASE_EVENT, selectCase);
  }, [openMobileCard, tapaukset]);

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
  const startMobileDrag = (event: React.TouchEvent) => {
    event.stopPropagation();
    mobileDragStartY.current = event.changedTouches[0]?.clientY ?? null;
    setMobileDragging(mobileDragStartY.current !== null);
  };
  const moveMobileDrag = (event: React.TouchEvent) => {
    event.stopPropagation();
    if (mobileDragStartY.current === null) return;

    const distance = (event.changedTouches[0]?.clientY ?? mobileDragStartY.current) - mobileDragStartY.current;
    setMobileDragY(Math.max(0, distance));
  };
  const endMobileDrag = (event: React.TouchEvent) => {
    event.stopPropagation();
    if (mobileDragStartY.current === null) return;

    const distance = (event.changedTouches[0]?.clientY ?? mobileDragStartY.current) - mobileDragStartY.current;
    mobileDragStartY.current = null;
    setMobileDragging(false);
    if (distance >= 72) closeMobileCard();
    else setMobileDragY(0);
  };
  const cancelMobileDrag = (event: React.TouchEvent) => {
    event.stopPropagation();
    mobileDragStartY.current = null;
    setMobileDragging(false);
    setMobileDragY(0);
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
            onClick={openMobileCard}
            className="flex min-w-0 flex-1 items-center gap-3 rounded-md px-2 py-1 text-left focus-visible:outline-2 focus-visible:outline-sky-300"
            aria-label={`Avaa tapaus ${currentIndex + 1}: ${current.nimi}, ${level.label}`}
          >
            <span className={`h-8 w-1 shrink-0 rounded-full ${level.accent}`} aria-hidden="true" />
            <span className="min-w-0 flex-1">
              <span className="flex min-w-0 items-center gap-1.5 text-[0.62rem] font-semibold tracking-wider uppercase">
                <span className="shrink-0 text-zinc-500">
                  Tapaus {currentIndex + 1}/{tapaukset.length}
                </span>
                <span className="text-zinc-600" aria-hidden="true">
                  ·
                </span>
                <span className={`truncate ${level.text}`}>{level.label}</span>
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
            className={`absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300 ${mobileClosing ? 'opacity-0' : 'opacity-100'}`}
            onClick={closeMobileCard}
            aria-label="Sulje tapauskortti"
          />
          <div
            className={`absolute left-1/2 flex flex-col overflow-hidden shadow-2xl ${mobileClosing ? 'bottom-3 h-14 rounded-lg bg-zinc-950/95 shadow-black/60 backdrop-blur-xl' : 'bottom-0 h-[min(42rem,calc(100dvh-0.75rem))] rounded-t-xl bg-zinc-900'} ${mobileDragging ? '' : 'transition-[width,height,bottom,border-radius,transform,background-color] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]'}`}
            style={{
              transform: `translate(-50%, ${mobileDragY}px)`,
              width: mobileClosing ? 'min(calc(100% - 1.5rem), 32rem)' : '100%',
            }}
            onTouchStart={(event) => (touchStartX.current = event.changedTouches[0]?.clientX ?? null)}
            onTouchEnd={endTouch}
          >
            <div
              className={`pointer-events-none absolute inset-0 flex items-center gap-2 p-2 transition-opacity duration-150 ${mobileClosing ? 'opacity-100 delay-150' : 'opacity-0'}`}
              aria-hidden="true"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/[0.07] text-zinc-200">
                <ChevronLeftIcon className="h-4 w-4" />
              </span>
              <span className="flex min-w-0 flex-1 items-center gap-3 rounded-md px-2 py-1 text-left">
                <span className={`h-8 w-1 shrink-0 rounded-full ${level.accent}`} />
                <span className="min-w-0 flex-1">
                  <span className="flex min-w-0 items-center gap-1.5 text-[0.62rem] font-semibold tracking-wider uppercase">
                    <span className="shrink-0 text-zinc-500">
                      Tapaus {currentIndex + 1}/{tapaukset.length}
                    </span>
                    <span className="text-zinc-600">·</span>
                    <span className={`truncate ${level.text}`}>{level.label}</span>
                  </span>
                  <span className="block truncate text-sm font-bold text-white">{current.nimi}</span>
                </span>
                <ChevronUpIcon className="h-4 w-4 shrink-0 text-zinc-400" />
              </span>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/[0.07] text-zinc-200">
                <ChevronRightIcon className="h-4 w-4" />
              </span>
            </div>

            <div
              className={`flex min-h-0 flex-1 flex-col transition-opacity duration-150 ${mobileClosing ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
            >
              <div
                className="touch-none"
                onTouchStart={startMobileDrag}
                onTouchMove={moveMobileDrag}
                onTouchEnd={endMobileDrag}
                onTouchCancel={cancelMobileDrag}
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
                    onClick={closeMobileCard}
                    autoFocus
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-zinc-400 transition hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-sky-300"
                    aria-label="Pienennä tapauskortti"
                  >
                    <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
              <div className="h-0.5 bg-white/10">
                <div className={`h-full transition-[width] duration-300 ${level.accent}`} style={{ width: progress }} />
              </div>
              <div
                className="min-h-0 flex-1 px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
                aria-live="polite"
              >
                <Tapahtumakortti key={currentIndex} tapaus={current} />
              </div>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default Tapausnavigaattori;
