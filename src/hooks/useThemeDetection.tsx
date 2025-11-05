import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'system';

export const useThemeDetection = (): Theme => {
  const [theme, setTheme] = useState<Theme>('system');

  useEffect(() => {
    // Check for system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
    
    // Listen for changes in system preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light');
    };
    
    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleChange);
    }
    
    return () => {
      if (typeof mediaQuery.removeEventListener === 'function') {
        mediaQuery.removeEventListener('change', handleChange);
      }
    };
  }, []);

  return theme;
};
