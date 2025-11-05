import { useState, useCallback } from 'react';

export const useCopyToClipboard = (text: string, notify?: (message: string) => void) => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      if (notify) {
        notify('Copied to clipboard!');
      }
      // Reset after 2 seconds
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      if (notify) {
        notify('Failed to copy to clipboard');
      }
    }
  }, [text, notify]);

  return { isCopied, copy };
};
