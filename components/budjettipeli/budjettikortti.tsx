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
  return (
    <div
      className={cn(
        'absolute box-border h-full w-full cursor-grab touch-manipulation rounded-[30px] bg-[#FFB000]',
        'p-4 shadow-lg',
        className,
      )}
    >
      <span className="absolute right-2 top-2 rounded-bl-lg p-2 text-center text-white">
        {index + 1 + '/' + (numberOfKeys + 1)}
      </span>
      <h2 className="mb-4 mt-10 text-2xl font-bold text-black">
        {index + 1 + '. '}
        {name}
      </h2>
      <h3 className="mb-4 mt-10 text-xl font-bold text-black">
        Alkuperäinen summa: {originalAmount} €
      </h3>
      <h3 className="mb-4 mt-10 text-xl font-bold text-black">
        sinun budjetissasi: {amount} € (
        {((amount / originalAmount) * 100).toFixed(2)}%)
      </h3>
      <span className="text-sm text-black">
        Käytä tätä liukusäädintä muuttaaksesi budjettikohtaa
      </span>
      <input
        type="range"
        className="w-full"
        min={Math.min(0, originalAmount)}
        max={Math.max(0, originalAmount * 2)}
        value={amount}
        onChange={(e) =>
          setBudu((prev) => ({
            ...prev,
            [name]: parseInt(e.target.value),
          }))
        }
      />
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
