'use client';
import { budjetti } from './budjetti';
import Header from '@/components/BlogHeader';
import Text from '@/components/Text';
import BudjettiKortti from '@/components/budjettipeli/budjettikortti';
import EuroFormatter from '@/components/budjettipeli/euroja';
import { useState } from 'react';
const Page = () => {
  const [budu, setBudu] = useState(budjetti);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentItem = Object.keys(budjetti)[currentIndex];
  const total = Object.values(budu).reduce((acc, val) => acc + val, 0);
  const numberOfKeys = Object.keys(budu).length;
  return (
    <div className="max-w-8xl mx-auto flex flex-col items-center bg-gray-950 p-4 ">
      <Header>Budjettipeli</Header>
      <Text>
        {`Tervetuloa budjettipeliin! Tässä pelissä sinun tulee jakaa budjettisi
        eri osa-alueille.`}
        <br />
        {total > 0
          ? `Budjetissasi on ylijäämää, eli voit lyhentää valtionvelkaa `
          : `Budjetissasi on alijäämää, eli valtionvelka kasvaa `}
        <EuroFormatter amount={Math.abs(total)} />
      </Text>
      <Text>
        Muutoksesi budjettiin:
        {Object.keys(budu).map((key) => {
          const sign = budjetti[key] > 0 ? 1 : -1;
          const originalAbsAmount = Math.abs(budjetti[key]);
          const absAmount = Math.abs(budu[key]);
          if (originalAbsAmount === absAmount) {
            return null;
          }
          const muutos = absAmount - originalAbsAmount;
          return (
            <div key={key} className="flex justify-between">
              <span>{key}:</span>
              <span>
                {sign === -1 && '-'}
                <EuroFormatter amount={absAmount} /> ({muutos > 0 ? '+' : '-'}{' '}
                <EuroFormatter amount={Math.abs(muutos)} />)
              </span>
            </div>
          );
        })}
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
    </div>
  );
};

export default Page;
