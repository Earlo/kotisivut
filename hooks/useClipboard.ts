import { useToaster } from '@/components/generic/Toaster';
import { useEffect, useState } from 'react';

export default function useClipboard() {
  const [copiedData, setCopiedData] = useState<string>('');
  const { addToast } = useToaster();

  useEffect(() => {
    const handleCopy = () => {
      void (async () => {
        try {
          const clipboardText = await navigator.clipboard.readText();
          setCopiedData(clipboardText);
        } catch {
          setCopiedData('');
        }
      })();
    };
    document.addEventListener('copy', handleCopy);
    return () => {
      document.removeEventListener('copy', handleCopy);
    };
  }, []);

  const onCopy = (text: string) => {
    void navigator.clipboard.writeText(text).then(() => {
      setCopiedData(text);
      addToast('Copied to clipboard', 'success');
    });
  };

  return { copiedData, onCopy };
}
