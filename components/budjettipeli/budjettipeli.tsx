'use client';
import Text from '@/components/Text';
import BudjettiKortti from '@/components/budjettipeli/budjettikortti';
import EuroFormatter from '@/components/budjettipeli/euroja';
import { useToaster } from '@/components/generic/Toaster';
import { cn } from '@/lib/helpers';
import { useSearchParams } from 'next/navigation';
import { FC, useState } from 'react';
import { budjetti } from './budjetti';

interface BudjettiKorttiProps {
  buduProp?: { [key: string]: number };
}

const Budjettipeli: FC<BudjettiKorttiProps> = ({ buduProp }) => {
  const searchParams = useSearchParams();
  const { addToast } = useToaster();
  const search = searchParams.get('data');
  const baselineBudget: Record<string, number> = budjetti;
  let initialBudu: Record<string, number> = buduProp ? { ...buduProp } : { ...baselineBudget };

  if (search) {
    try {
      const decoded = decodeURIComponent(atob(search));
      const parsed = JSON.parse(decoded, (_, value) => {
        return typeof value === 'number' && Number.isFinite(value) ? value : (value as string);
      }) as Record<string, number>;

      const merged: Record<string, number> = { ...initialBudu };

      for (const [key, val] of Object.entries(parsed)) {
        if (typeof val === 'number' && key in baselineBudget && baselineBudget[key] !== val) {
          merged[key] = val;
        }
      }

      initialBudu = merged;
    } catch (error) {
      console.error('Failed to decode and parse query parameter:', error);
    }
  }
  const [budu, setBudu] = useState(initialBudu);
  const [currentIndex, setCurrentIndex] = useState(0);
  const budgetKeys = Object.keys(budu);
  const currentItem = budgetKeys[currentIndex] ?? budgetKeys[0] ?? '';
  const total = Object.values(budu).reduce((acc, val) => acc + val, 0);
  const numberOfKeys = budgetKeys.length;
  const changedObjects = Object.keys(budu).reduce(
    (acc, key) => {
      if (budu[key] !== baselineBudget[key]) {
        acc[key] = budu[key];
      }
      return acc;
    },
    {} as { [key: string]: number },
  );
  const changedEntries = Object.entries(changedObjects);
  const balanceLabel = total > 0 ? 'Ylijäämä' : total < 0 ? 'Alijäämä' : 'Tasapaino';
  const balanceDescription =
    total > 0
      ? 'Voit lyhentää valtionvelkaa tällä määrällä.'
      : total < 0
        ? 'Valtionvelka kasvaa tällä määrällä.'
        : 'Tulot ja menot ovat samalla tasolla.';
  const balanceTone = total > 0 ? 'text-emerald-300' : total < 0 ? 'text-red-300' : 'text-slate-100';

  const Base64OfChangedPoints = () => {
    const json = JSON.stringify(changedObjects);
    const utf8 = encodeURIComponent(json);
    return btoa(utf8);
  };

  const handleCopyURL = () => {
    const token = encodeURIComponent(Base64OfChangedPoints());
    const url = `${window.location.origin}${window.location.pathname}?data=${token}`;
    navigator.clipboard
      .writeText(url)
      .then(() => addToast('Linkki kopioitu leikepöydälle', 'success'))
      .catch((err) => {
        console.error('Failed to copy URL:', err);
        addToast('Linkin kopiointi epäonnistui', 'error');
      });
  };

  return (
    <div className="grid w-full gap-6 lg:grid-cols-[minmax(18rem,1fr)_minmax(28rem,34rem)] lg:items-start">
      <section className="space-y-5">
        <Text className="mb-0 max-w-3xl text-base text-slate-200">
          Tervetuloa budjettipeliin. Jaa valtion budjetti eri osa-alueille ja seuraa samalla, miten päätökset
          vaikuttavat kokonaisuuteen.
        </Text>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
            <span className="text-xs font-bold tracking-wide text-slate-400 uppercase">Budjetin saldo</span>
            <strong className={cn('mt-2 block text-3xl leading-tight font-bold', balanceTone)}>
              {total > 0 && '+'}
              {total < 0 && '-'}
              <EuroFormatter amount={Math.abs(total)} />
            </strong>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              {balanceLabel}. {balanceDescription}
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
            <span className="text-xs font-bold tracking-wide text-slate-400 uppercase">Käsittelyssä</span>
            <strong className="mt-2 block text-3xl leading-tight font-bold text-white">
              {currentIndex + 1}
              <span className="text-lg text-slate-400">/{numberOfKeys}</span>
            </strong>
            <p className="mt-2 text-sm leading-relaxed break-words text-slate-300">{currentItem}</p>
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-base font-semibold text-white">Muutoksesi budjettiin</h2>
            <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-bold text-slate-200">
              {changedEntries.length}
            </span>
          </div>

          {changedEntries.length === 0 ? (
            <p className="mt-3 text-sm text-slate-400">Ei muutoksia vielä.</p>
          ) : (
            <ul className="mt-3 max-h-80 space-y-3 overflow-y-auto pr-2">
              {changedEntries.map(([key]) => {
                const sign = baselineBudget[key] > 0 ? 1 : -1;
                const originalAbsAmount = Math.abs(baselineBudget[key]);
                const absAmount = Math.abs(budu[key]);
                const muutos = absAmount - originalAbsAmount;
                return (
                  <li key={key} className="border-b border-white/10 pb-3 last:border-b-0 last:pb-0">
                    <span className="block text-sm leading-snug break-words text-slate-100">{key}</span>
                    <span
                      className={cn(
                        'mt-1 block text-sm font-semibold',
                        sign * muutos > 0 ? 'text-emerald-300' : 'text-red-300',
                      )}
                    >
                      {sign === -1 && '-'}
                      <EuroFormatter amount={absAmount} /> ({muutos > 0 ? '+' : '-'}
                      <EuroFormatter amount={Math.abs(muutos)} />)
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <button
          type="button"
          className="inline-flex min-h-10 items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
          onClick={handleCopyURL}
        >
          Kopioi linkki budjettiisi
        </button>
      </section>

      <section className="min-w-0 lg:sticky lg:top-6" aria-label="Muokattava budjettikohta">
        <BudjettiKortti
          name={currentItem}
          originalAmount={baselineBudget[currentItem]}
          amount={budu[currentItem]}
          setBudu={setBudu}
          setCurrentIndex={setCurrentIndex}
          index={currentIndex}
          numberOfKeys={numberOfKeys}
        />
      </section>
    </div>
  );
};

export default Budjettipeli;
