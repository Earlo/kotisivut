import EuroFormatter from './euroja';
import { cn } from '@/lib/helpers';
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
        {index + 1 + '/' + (numberOfKeys + 1)}
      </span>
      <div className="flex max-h-80 flex-grow flex-col justify-between">
        <h2 className="pt-4 text-center text-xl font-bold text-black">
          {index + 1 + '. '}
          {name} ({sign === 1 ? 'Tulo' : 'Meno'})
        </h2>
        <h3 className="  text-l font-bold text-black">
          Alkuperäinen summa: <EuroFormatter amount={originalAbsAmount} />
        </h3>
        <h3 className="  text-l font-bold text-black">
          sinun budjetissasi: <EuroFormatter amount={absAmount} /> (
          {((amount / originalAmount) * 100).toFixed(2)}%)
        </h3>
        <div>
          <span className="text-sm text-black">
            Käytä tätä liukusäädintä muuttaaksesi budjettikohtaa
          </span>
          <input
            type="range"
            id="myRange"
            className="w-full"
            min={Math.min(0, originalAmount * 2)}
            max={Math.max(0, originalAmount * 2)}
            value={amount}
            onTouchMove={(e) => {
              const touch = e.touches[0]; // Get the first touch
              const slider = document.getElementById(
                'myRange',
              ) as HTMLInputElement;
              const position = touch.clientX; // Position of touch
              const value = Math.max(
                0,
                Math.min(position, slider?.offsetWidth),
              );
              slider.value = (
                (value / slider?.offsetWidth) *
                parseInt(slider?.max)
              ).toString();
              setBudu((prev) => ({
                ...prev,
                [name]: parseInt(slider?.value),
              }));
            }}
            onChange={(e) =>
              setBudu((prev) => ({
                ...prev,
                [name]: parseInt(e.target.value),
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
