import React from 'react';
import Image from 'next/image';

interface CandidateCardProps {
  name: string;
  imageSrc: string;
  // You can add more props if you have additional data, like a short bio or a slogan
}

const CandidateCard: React.FC<CandidateCardProps> = ({ name, imageSrc }) => {
  return (
    <div className="flex max-w-xs flex-col items-center overflow-hidden rounded-lg bg-white shadow-md transition-transform duration-300 hover:scale-105">
      <div className="relative h-64 w-full">
        <Image
          src={imageSrc}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>
      <div className="flex flex-col items-center px-6 py-4">
        <h3 className="text-xl font-bold text-gray-800">{name}</h3>
        {/* Add more candidate details here */}
      </div>
      {/* Consider adding interactive elements like a button for more details */}
      <button className="w-full rounded-b-lg bg-blue-600 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
        Learn More
      </button>
    </div>
  );
};

export default CandidateCard;
