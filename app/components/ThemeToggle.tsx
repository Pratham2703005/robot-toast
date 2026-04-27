'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

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
        <Sun className="h-5 w-5" />
      </button>
    );
  }

  const handleToggle = () => {
    setIsAnimating(true);
    setTheme(theme === 'dark' ? 'light' : 'dark');
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <button
      onClick={handleToggle}
      className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-white p-2 text-sm text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {theme === 'dark' ? (
          <Moon key="moon" className={`h-5 w-5 absolute ${isAnimating ? 'animate-spin' : ''}`} />
        ) : (
          <Sun key="sun" className={`h-5 w-5 absolute ${isAnimating ? 'animate-spin' : ''}`} />
        )}
      </div>
    </button>
  );
}
