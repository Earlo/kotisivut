import { cn } from '@/lib/helpers';
import React from 'react';
import Image from 'next/image';
interface CandidateProfileProps {
  name: string;
  imageSrc: string;
  onClick: () => void;
  disabled?: string;
  className?: string;
}

const CandidateProfile: React.FC<CandidateProfileProps> = ({
  name,
  imageSrc,
  onClick,
  disabled,
  className = '',
}) => {
  const isDisabled = Boolean(disabled);

  return (
    <div
      className={`group relative w-full max-w-xs overflow-hidden rounded-lg shadow-md transition-transform ${
        isDisabled ? 'opacity-50' : 'cursor-pointer hover:scale-105'
      }`}
      onClick={() => {
        if (!isDisabled) {
          onClick();
        }
      }}
      style={isDisabled ? { pointerEvents: 'none' } : {}}
    >
      <div className="relative aspect-square w-full">
        <Image
          src={imageSrc}
          alt={name}
          layout="fill"
          className={cn('rounded-t-lg', className)}
        />
        <div className="absolute bottom-0 w-full rounded-b-lg bg-black bg-opacity-50 py-2 text-center text-white">
          <h3 className="font-bold">{name}</h3>
        </div>
        {isDisabled && (
          <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black bg-opacity-75">
            <span className="text-md rotate-12 transform font-bold text-white">
              {disabled}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateProfile;
