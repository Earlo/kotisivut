'use client';

import useClipboard from '@/hooks/useClipboard';
import { cn } from '@/lib/helpers';
import {
  ClipboardDocumentCheckIcon,
  ClipboardIcon,
} from '@heroicons/react/20/solid';

const CopyButton = ({ copyTarget }: { copyTarget: string }) => {
  const { copiedData, onCopy } = useClipboard();
  //const copyTarget = parties.map((party) => party.siteInfo.email).join(', ');
  const isClipped = copiedData && copiedData === copyTarget;

  const copyEmails = () => {
    if (!isClipped) {
      onCopy(copyTarget);
    }
  };

  return (
    <button
      onClick={copyEmails}
      className={cn(
        'mb-2 mr-2 flex flex-row items-center rounded-sm bg-blue-500 px-4 py-2 text-white',
        {
          'cursor-not-allowed ': isClipped,
          'hover:bg-blue-700': !isClipped,
        },
      )}
    >
      {isClipped
        ? 'Puolueiden sähköpostit ovat nyt leikepöydälläsi!'
        : 'Kopioi kaikkien puolueiden sähköpostit leikepöydällesi'}
      {isClipped ? (
        <ClipboardDocumentCheckIcon className="ml-2 h-6 w-6 text-green-500" />
      ) : (
        <ClipboardIcon className="ml-2 h-6 w-6 text-gray-500" />
      )}
    </button>
  );
};

export default CopyButton;
