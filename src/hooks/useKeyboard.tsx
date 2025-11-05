import { useEffect, useState } from 'react';

type KeyboardEvent = KeyboardEvent;
type KeyHandler = (event: KeyboardEvent) => void;

export const useKeyboard = (keyHandlers: Record<string, KeyHandler>) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;
      if (keyHandlers[key]) {
        keyHandlers[key](event);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [keyHandlers]);
};
