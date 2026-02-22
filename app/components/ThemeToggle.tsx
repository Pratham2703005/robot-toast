'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-white p-2 text-sm text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
        disabled
        aria-label="Toggle theme"
      >
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v2a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l1.414 1.414a1 1 0 001.414-1.414l-1.414-1.414a1 1 0 00-1.414 1.414zm2.83-2.83a1 1 0 011.414 0l1.414 1.414a1 1 0 11-1.414 1.414L17.95 12.05a1 1 0 010-1.414zM17 11a1 1 0 100-2h-2a1 1 0 100 2h2zm-7 4a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1zM5.05 6.464A1 1 0 106.464 5.05l-1.414 1.414a1 1 0 00-1.414 1.414zM5 11a1 1 0 100-2H3a1 1 0 100 2h2zM4.464 4.465A1 1 0 003.05 5.879l1.414-1.414a1 1 0 011.414-1.414zM2.97 12.05a1 1 0 011.414 0l1.414-1.414a1 1 0 00-1.414-1.414L2.97 12.05z" clipRule="evenodd" />
        </svg>
      </button>
    );
  }

  const handleToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      onClick={handleToggle}
      className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-white p-2 text-sm text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      ) : (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v2a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l1.414 1.414a1 1 0 001.414-1.414l-1.414-1.414a1 1 0 00-1.414 1.414zm2.83-2.83a1 1 0 011.414 0l1.414 1.414a1 1 0 11-1.414 1.414L17.95 12.05a1 1 0 010-1.414zM17 11a1 1 0 100-2h-2a1 1 0 100 2h2zm-7 4a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1zM5.05 6.464A1 1 0 106.464 5.05l-1.414 1.414a1 1 0 00-1.414 1.414zM5 11a1 1 0 100-2H3a1 1 0 100 2h2zM4.464 4.465A1 1 0 003.05 5.879l1.414-1.414a1 1 0 011.414-1.414zM2.97 12.05a1 1 0 011.414 0l1.414-1.414a1 1 0 00-1.414-1.414L2.97 12.05z" clipRule="evenodd" />
        </svg>
      )}
    </button>
  );
}
