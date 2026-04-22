'use client';

import { useEffect, useRef, useState } from 'react';
import { useDocsVersion, type DocsVersion } from './VersionContext';

const OPTIONS: Array<{ value: DocsVersion; label: string; badge?: string }> = [
  { value: 'v2', label: 'v2.x', badge: 'latest' },
  { value: 'v1', label: 'v1.x' },
];

export function VersionSelect() {
  const { version, setVersion } = useDocsVersion();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  const selected = OPTIONS.find(o => o.value === version) ?? OPTIONS[0];

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select documentation version"
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-mono text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <span>{selected.label}</span>
        {selected.badge && (
          <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 text-[10px] font-semibold uppercase tracking-wide">
            {selected.badge}
          </span>
        )}
        <svg
          width="10" height="10" viewBox="0 0 10 10"
          className={`transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
        >
          <path d="M2 4l3 3 3-3" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 mt-1 min-w-[8rem] py-1 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg z-50"
        >
          {OPTIONS.map(opt => {
            const isActive = opt.value === version;
            return (
              <li key={opt.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  onClick={() => {
                    setVersion(opt.value);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs font-mono flex items-center justify-between gap-2 ${
                    isActive
                      ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                  }`}
                >
                  <span>{opt.label}</span>
                  {opt.badge && (
                    <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 text-[10px] font-semibold uppercase tracking-wide">
                      {opt.badge}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
