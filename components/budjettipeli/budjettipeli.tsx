'use client';
import { budjetti } from './budjetti';
import Text from '@/components/Text';
import BudjettiKortti from '@/components/budjettipeli/budjettikortti';
import EuroFormatter from '@/components/budjettipeli/euroja';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

interface BudjettiKorttiProps {
  buduProp?: { [key: string]: number };
}

const Budjettipeli: React.FC<BudjettiKorttiProps> = ({ buduProp }) => {
  const searchParams = useSearchParams();
  const search = searchParams.get('data');
  const initialBudu = buduProp ? buduProp : { ...budjetti };

  if (search) {
    try {
      const decodedString = decodeURIComponent(atob(search));
      const jsonData = JSON.parse(decodedString);
      Object.keys(jsonData).forEach((key: string) => {
        if (jsonData[key] !== undefined && budjetti[key] !== jsonData[key]) {
          initialBudu[key] = jsonData[key];
        }
      });
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
    const utf8 = encodeURIComponent(json); // Encode JSON in UTF-8
    return btoa(utf8); // Then encode it in Base64
  };

  const handleCopyURL = () => {
    const url = `${window.location.origin}${window.location.pathname}?data=${Base64OfChangedPoints()}`;
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
            className="left-[0] top-[0] z-[100]"
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
            <span>{key}:</span>
            <span
              className={`text-right ${
                sign * muutos > 0 ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {sign === -1 && '-'}
              <EuroFormatter amount={absAmount} /> ({muutos > 0 ? '+' : '-'}
              <EuroFormatter amount={Math.abs(muutos)} />)
            </span>
          </div>
        );
      })}
      <button
        className="ml-2 rounded-md bg-slate-700 p-1 px-2 text-blue-500  hover:bg-slate-800 hover:text-white"
        onClick={handleCopyURL}
      >
        Kopioi linkki budjettiisi!
      </button>
    </>
  );
};

export default Budjettipeli;
