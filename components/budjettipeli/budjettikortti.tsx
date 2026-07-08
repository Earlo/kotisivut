import { cn } from '@/lib/helpers';
import { useId } from 'react';
import EuroFormatter from './euroja';
interface BudjettiKorttiProps {
  className?: string;
  name: string;
  originalAmount: number;
  amount: number;
  setBudu: React.Dispatch<React.SetStateAction<{ [key: string]: number }>>;
  setCurrentIndex: (index: number) => void;
  index: number;
  numberOfKeys: number;
}

const BudjettiKortti: React.FC<BudjettiKorttiProps> = ({
  className,
  name,
  originalAmount,
  amount,
  setBudu,
  setCurrentIndex,
  index,
  numberOfKeys,
}) => {
  const rangeId = useId();
  const sign = originalAmount > 0 ? 1 : -1;
  const originalAbsAmount = Math.abs(originalAmount);
  const absAmount = Math.abs(amount);
  const percentage = originalAbsAmount !== 0 ? `${((absAmount / originalAbsAmount) * 100).toFixed(2)}%` : undefined;

  return (
    <div
      className={cn(
        'relative box-border flex min-h-[26rem] w-full flex-col justify-between rounded-lg bg-[#FFB000]',
        'p-5 shadow-2xl shadow-black/30 sm:p-6',
        className,
      )}
    >
      <span className="absolute top-4 right-4 rounded-full bg-black/10 px-3 py-1 text-center text-sm font-bold text-black/70">
        {index + 1 + '/' + numberOfKeys}
      </span>
      <div className="flex grow flex-col gap-6">
        <div className="pr-16">
          <p className="text-sm font-bold tracking-wide text-black/60 uppercase">{sign === 1 ? 'Tulo' : 'Meno'}</p>
          <h2 className="mt-2 text-2xl leading-tight font-bold break-words text-black sm:text-3xl">
            {index + 1}. {name}
          </h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg bg-black/10 p-3">
            <span className="text-xs font-bold tracking-wide text-black/60 uppercase">Alkuperäinen summa</span>
            <strong className="mt-1 block text-lg font-bold text-black">
              <EuroFormatter amount={originalAbsAmount} />
            </strong>
          </div>
          <div className="rounded-lg bg-black/10 p-3">
            <span className="text-xs font-bold tracking-wide text-black/60 uppercase">Sinun budjetissasi</span>
            <strong className="mt-1 block text-lg font-bold text-black">
              <EuroFormatter amount={absAmount} />
            </strong>
            <span className="mt-1 block text-sm font-semibold text-black/70">
              {percentage ?? <EuroFormatter amount={absAmount} />}
            </span>
          </div>
        </div>

        <div className="mt-auto">
          <div className="flex items-center justify-between gap-4 text-sm font-bold text-black">
            <label htmlFor={rangeId}>Säädä arvoa</label>
            <span>{percentage ?? <EuroFormatter amount={absAmount} />}</span>
          </div>
          <input
            type="range"
            id={rangeId}
            className="mt-3 w-full accent-emerald-700"
            min={0}
            max={Math.max(originalAbsAmount * 2, 1000000)}
            value={absAmount}
            onInput={(e) =>
              setBudu((prev) => ({
                ...prev,
                [name]: sign * parseInt((e.target as HTMLInputElement).value, 10),
              }))
            }
          />
        </div>
      </div>
      <div
        className={cn('mt-6 flex items-center justify-between gap-3', {
          'justify-end': index === 0,
          'justify-start': index === numberOfKeys - 1,
        })}
      >
        {index >= 1 && (
          <button
            type="button"
            className="min-h-10 rounded-lg bg-[#131415] px-4 py-2 text-sm font-bold text-[#F8F9FA] transition hover:bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40"
            onClick={() => setCurrentIndex(index - 1)}
          >
            Edellinen
          </button>
        )}
        {index < numberOfKeys - 1 && (
          <button
            type="button"
            className="min-h-10 rounded-lg bg-[#131415] px-4 py-2 text-sm font-bold text-[#F8F9FA] transition hover:bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-black/40"
            onClick={() => setCurrentIndex(index + 1)}
          >
            Seuraava
          </button>
        )}
      </div>
    </div>
  );
};

export default BudjettiKortti;
