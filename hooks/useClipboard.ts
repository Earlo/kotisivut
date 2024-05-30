import { useToaster } from '@/components/generic/Toaster';
import { useState, useEffect } from 'react';

export default function useClipboard() {
  const [copiedData, setCopiedData] = useState<string>('');
  const { addToast } = useToaster();

  useEffect(() => {
    const handleCopy = async () => {
      try {
        const clipboardText = await navigator.clipboard.readText();
        setCopiedData(clipboardText);
      } catch (e) {
        setCopiedData('');
      }
    };
    document.addEventListener('copy', handleCopy);

    return () => {
      document.removeEventListener('copy', handleCopy);
    };
  }, [addToast]);

  const onCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedData(text);
      addToast('Copied to clipboard', 'success');
    });
  };

  return { copiedData, onCopy };
}
