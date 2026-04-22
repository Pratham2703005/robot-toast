'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

export type DocsVersion = 'v1' | 'v2';

const STORAGE_KEY = 'rt-docs-version';
const QUERY_KEY   = 'v';
const DEFAULT: DocsVersion = 'v2';

interface Ctx {
  version:    DocsVersion;
  setVersion: (v: DocsVersion) => void;
}

const VersionContext = createContext<Ctx | null>(null);

function readInitial(): DocsVersion {
  if (typeof window === 'undefined') return DEFAULT;

  // URL wins (shareable deep-links like ?v=1)
  const url = new URL(window.location.href);
  const q   = url.searchParams.get(QUERY_KEY);
  if (q === '1' || q === 'v1') return 'v1';
  if (q === '2' || q === 'v2') return 'v2';

  // Fall back to localStorage
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'v1' || stored === 'v2') return stored;
  } catch {
    /* private mode / disabled */
  }

  return DEFAULT;
}

export function VersionProvider({ children }: { children: React.ReactNode }) {
  // SSR: always render with DEFAULT; the client effect corrects it on mount.
  // This avoids hydration mismatch — any url/localStorage lookup happens after
  // hydration, then we update state and trigger a re-render if needed.
  const [version, setVersionState] = useState<DocsVersion>(DEFAULT);

  useEffect(() => {
    const initial = readInitial();
    if (initial !== version) setVersionState(initial);
    // We intentionally only run this once on mount to pick up URL/localStorage.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setVersion = useCallback((v: DocsVersion) => {
    setVersionState(v);
    try {
      window.localStorage.setItem(STORAGE_KEY, v);
    } catch {
      /* ignore */
    }
    // Reflect in the URL without a full navigation so links stay shareable.
    const url = new URL(window.location.href);
    url.searchParams.set(QUERY_KEY, v === 'v2' ? '2' : '1');
    window.history.replaceState({}, '', url.toString());
  }, []);

  return (
    <VersionContext.Provider value={{ version, setVersion }}>
      {children}
    </VersionContext.Provider>
  );
}

export function useDocsVersion(): Ctx {
  const ctx = useContext(VersionContext);
  if (!ctx) throw new Error('useDocsVersion must be used inside <VersionProvider>');
  return ctx;
}
