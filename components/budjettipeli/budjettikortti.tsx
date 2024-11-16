import { cn } from '@/lib/helpers';
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
  const sign = originalAmount > 0 ? 1 : -1;
  const originalAbsAmount = Math.abs(originalAmount);
  const absAmount = Math.abs(amount);
  return (
    <div
      className={cn(
        'absolute box-border flex h-full w-full flex-col justify-between rounded-[30px] bg-[#FFB000]',
        'p-4 shadow-lg',
        className,
      )}
    >
      <span className="absolute right-2 top-2  rounded-bl-lg p-2 text-center text-white">
        {index + 1 + '/' + numberOfKeys}
      </span>
      <div className="flex max-h-80 flex-grow flex-col justify-between">
        <h2 className="pt-5 text-center text-xl font-bold text-black">
          {index + 1 + '. '}
          {name} ({sign === 1 ? 'Tulo' : 'Meno'})
        </h2>
        <h3 className="  text-l font-bold text-black">
          Alkuperäinen summa: <EuroFormatter amount={originalAbsAmount} />
        </h3>
        <h3 className="  text-l font-bold text-black">
          sinun budjetissasi: <EuroFormatter amount={absAmount} /> (
          {originalAbsAmount !== 0 ? (
            ((absAmount / originalAbsAmount) * 100).toFixed(2) + '%'
          ) : (
            <EuroFormatter amount={absAmount} />
          )}
          )
        </h3>
        <div className="flex flex-col items-center">
          <span className="text-sm text-black">
            Käytä säädintä muuttaaksesi budjettikohtaa
          </span>
          <input
            type="range"
            id="myRange"
            className="w-11/12"
            min={0}
            max={Math.max(originalAbsAmount * 2, 1000000)}
            value={absAmount}
            onInput={(e) =>
              setBudu((prev) => ({
                ...prev,
                [name]:
                  sign * parseInt((e.target as HTMLInputElement).value, 10),
              }))
            }
          />
        </div>
      </div>
      <div
        className={cn('mt-4 flex justify-between', {
          'justify-center': index === 0 || index === numberOfKeys - 1,
        })}
      >
        {index >= 1 && (
          <button
            className="rounded-full bg-[#131415] px-4 py-2 font-bold text-[#F8F9FA]"
            onClick={() => setCurrentIndex(index - 1)}
          >
            Edellinen
          </button>
        )}
        {index < numberOfKeys - 1 && (
          <button
            className="rounded-full bg-[#131415] px-4 py-2 font-bold text-[#F8F9FA]"
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
