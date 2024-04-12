'use client';
import { budjetti } from './budjetti';
import Header from '@/components/BlogHeader';
import Text from '@/components/Text';
import Subheader from '@/components/Subheader';
import BudjettiKortti from '@/components/budjettipeli/budjettikortti';
import { cn } from '@/lib/helpers';
import { useState } from 'react';
import Link from 'next/link';

const Page = () => {
  const [budu, setBudu] = useState<{
    [key: string]: number;
  }>(budjetti);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentItem = Object.keys(budjetti)[currentIndex];

  const total = Object.values(budu).reduce((acc, val) => acc + val, 0);
  const numberOfKeys = Object.keys(budu).length;

  return (
    <div className="max-w-8xl mx-auto bg-gray-950 p-4 ">
      <Header>Budjettipeli</Header>
      <Text>
        {`Tervetuloa budjettipeliin! Tässä pelissä sinun tulee jakaa budjettisi
        eri osa-alueille.`}
        <br />
        {total > 0
          ? `Budjetissasi on ylijäämää, eli voit lyhentää valtionvelkaa ${total}€.`
          : `Budjetissasi on alijäämää, eli valtionvelka kasvaa ${total}€.`}
      </Text>
      <div className="relative mt-6 w-[94%] max-w-[600px]">
        <div className="relative m-0 h-0 w-full pb-[100%]">
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
