'use client';
import Text from '@/components/Text';
import BudjettiKortti from '@/components/budjettipeli/budjettikortti';
import EuroFormatter from '@/components/budjettipeli/euroja';
import { useSearchParams } from 'next/navigation';
import { FC, useState } from 'react';
import { budjetti } from './budjetti';

interface BudjettiKorttiProps {
  buduProp?: { [key: string]: number };
}

const Budjettipeli: FC<BudjettiKorttiProps> = ({ buduProp }) => {
  const searchParams = useSearchParams();
  const search = searchParams.get('data');
  let initialBudu = buduProp ? buduProp : { ...budjetti };

  if (search) {
    try {
      const decoded = decodeURIComponent(atob(search));
      const parsed = JSON.parse(decoded, (_, value) => {
        return typeof value === 'number' && Number.isFinite(value) ? value : (value as string);
      }) as Record<string, number>;

      const merged = { ...initialBudu };

      for (const [key, val] of Object.entries(parsed)) {
        if (typeof val === 'number' && key in budjetti && budjetti[key as keyof typeof budjetti] !== val) {
          merged[key as keyof typeof merged] = val;
        }
      }

      initialBudu = merged;
    } catch (error) {
      console.error('Failed to decode and parse query parameter:', error);
    }
  }
  const [budu, setBudu] = useState(initialBudu);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentItem = Object.keys(budu)[currentIndex];
  const total = Object.values(budu).reduce((acc, val) => acc + val, 0);
  const numberOfKeys = Object.keys(budu).length;
  const changedObjects = Object.keys(budu).reduce(
    (acc, key) => {
      if (budu[key] !== budjetti[key]) {
        acc[key] = budu[key];
      }
      return acc;
    },
    {} as { [key: string]: number },
  );

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
      .then(() => alert('URL copied to clipboard!'))
      .catch((err) => console.error('Failed to copy URL:', err));
  };

  return (
    <>
      <Text>
        {`Tervetuloa budjettipeliin! Tässä pelissä sinun tulee jakaa budjettisi
        eri osa-alueille.`}
        <br />
        {total > 0
          ? `Budjetissasi on ylijäämää, eli voit lyhentää valtionvelkaa `
          : `Budjetissasi on alijäämää, eli valtionvelka kasvaa `}
        <EuroFormatter amount={Math.abs(total)} />
      </Text>
      <div className="relative mt-6 flex w-[94%] max-w-[600px]">
        <div className="relative m-0 flex h-0 w-full pb-[100%]">
          <BudjettiKortti
            className="top-0 left-0 z-100"
            name={currentItem}
            originalAmount={budjetti[currentItem]}
            amount={budu[currentItem]}
            setBudu={setBudu}
            setCurrentIndex={setCurrentIndex}
            index={currentIndex}
            numberOfKeys={numberOfKeys}
          />
        </div>
      </div>
      <Text>Muutoksesi budjettiin:</Text>

      {Object.keys(changedObjects).map((key) => {
        const sign = budjetti[key] > 0 ? 1 : -1;
        const originalAbsAmount = Math.abs(budjetti[key]);
        const absAmount = Math.abs(budu[key]);
        const muutos = absAmount - originalAbsAmount;
        return (
          <div key={key} className="flex w-full justify-between">
            <span className="text-white">{key}:</span>
            <span className={`text-right ${sign * muutos > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {sign === -1 && '-'}
              <EuroFormatter amount={absAmount} /> ({muutos > 0 ? '+' : '-'}
              <EuroFormatter amount={Math.abs(muutos)} />)
            </span>
          </div>
        );
      })}
      <button
        className="ml-2 rounded-md bg-slate-700 p-1 px-2 text-blue-500 hover:bg-slate-800 hover:text-white"
        onClick={handleCopyURL}
      >
        Kopioi linkki budjettiisi!
      </button>
    </>
  );
};

export default Budjettipeli;
