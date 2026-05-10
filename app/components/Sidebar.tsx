'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FEATURES, CATEGORY_THEME } from '@/constants';

const navLinks = [
  { label: 'Introduction', href: '/' },
  { label: 'Installation', href: '/installation' },
  { label: 'Playground', href: '/playground' },
];

function groupFeaturesByCategory(features: typeof FEATURES) {
  const grouped: Record<string, (typeof FEATURES)[number][]> = {};
  for (const feature of features) {
    if (!grouped[feature.category]) {
      grouped[feature.category] = [];
    }
    grouped[feature.category].push(feature);
  }
  return grouped;
}

interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
}

function Chevron({ rotated, size = 14 }: { rotated: boolean; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      className="transition-transform duration-200 ease-out shrink-0"
      style={{ transform: rotated ? 'rotate(180deg)' : 'rotate(0deg)' }}
      aria-hidden
    >
      <path d="M3 5.5L7 9.5L11 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Sidebar({ open = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(pathname === '/features');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [activeFeatureId, setActiveFeatureId] = useState<string>('');
  const grouped = groupFeaturesByCategory(FEATURES);

  useEffect(() => {
    if (pathname !== '/features') {
      setActiveFeatureId('');
      return;
    }
    const syncHash = () => {
      const hash = window.location.hash.replace('#', '');
      setActiveFeatureId(hash);
      if (hash) {
        const feature = FEATURES.find((f) => f.id === hash);
        if (feature) {
          setIsFeaturesOpen(true);
          setExpandedCategories((prev) => ({ ...prev, [feature.category]: true }));
        }
      }
    };
    syncHash();
    window.addEventListener('hashchange', syncHash);
    return () => window.removeEventListener('hashchange', syncHash);
  }, [pathname]);

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  const handleFeatureClick = (featureId: string) => {
    if (pathname === '/features') {
      history.replaceState(null, '', `#${featureId}`);
      setActiveFeatureId(featureId);
      const el = document.getElementById(featureId);
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      router.push(`/features#${featureId}`);
    }
    onClose?.();
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden
      />

      <aside
        className={`
          fixed left-0 top-0 z-50 h-screen w-72 overflow-y-auto border-r border-gray-200 bg-gray-50 pt-6 pb-8
          dark:border-gray-800 dark:bg-gray-950
          transition-transform duration-300 ease-out
          lg:translate-x-0 lg:w-64
          ${open ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-md text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors lg:hidden"
          aria-label="Close sidebar"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M4.5 4.5l9 9M13.5 4.5l-9 9" />
          </svg>
        </button>

        <div className="px-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Robot Toast
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            A delightful toast notification library
          </p>
        </div>

        <nav className="mt-8 space-y-1 px-3">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={`block rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white'
                    : 'text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800'
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Features Dropdown */}
          <div>
            <button
              onClick={() => setIsFeaturesOpen(!isFeaturesOpen)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                pathname === '/features'
                  ? 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white'
                  : 'text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-800'
              }`}
            >
              <span className="flex items-center gap-2">
                <span>Features</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-purple-500/15 text-purple-700 dark:text-purple-300">
                  {FEATURES.length}
                </span>
              </span>
              <Chevron rotated={isFeaturesOpen} />
            </button>

            {/* Smooth grid-row collapse */}
            <div
              className="overflow-hidden transition-all duration-300 ease-out"
              style={{ display: 'grid', gridTemplateRows: isFeaturesOpen ? '1fr' : '0fr' }}
            >
              <div className="min-h-0">
                <div className="mt-2 space-y-1.5">
                  {Object.entries(grouped).map(([category, features]) => {
                    const theme = CATEGORY_THEME[category];
                    const accent = theme?.accent ?? '#6b7280';
                    const label = theme?.label ?? category;
                    const isOpen = !!expandedCategories[category];
                    return (
                      <div key={category}>
                        <button
                          onClick={() => toggleCategory(category)}
                          className="w-full flex items-center justify-between px-3 py-1.5 rounded-md text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                        >
                          <span className="truncate">{label}</span>
                          <span className="flex items-center gap-1.5">
                            <span
                              className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                              style={{ color: accent, background: `${accent}1a` }}
                            >
                              {features.length}
                            </span>
                            <Chevron rotated={isOpen} size={12} />
                          </span>
                        </button>

                        <div
                          className="overflow-hidden transition-all duration-200 ease-out"
                          style={{ display: 'grid', gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                        >
                          <div className="min-h-0">
                            <ul className="mt-1 space-y-0.5 pl-1">
                              {features.map((feature) => {
                                const isFeatureActive = activeFeatureId === feature.id;
                                return (
                                  <li key={feature.id}>
                                    <button
                                      onClick={() => handleFeatureClick(feature.id)}
                                      className={`w-full text-left pl-3 pr-2 py-1 rounded-r text-xs transition-colors flex items-center gap-2 border-l-2 ${
                                        isFeatureActive
                                          ? 'bg-gray-200/70 dark:bg-gray-800/70 text-gray-900 dark:text-gray-100 font-medium'
                                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200'
                                      }`}
                                      style={{ borderLeftColor: isFeatureActive ? accent : `${accent}55` }}
                                    >
                                      <span
                                        className="w-1.5 h-1.5 rounded-full shrink-0"
                                        style={{ background: accent, opacity: isFeatureActive ? 1 : 0.55 }}
                                        aria-hidden
                                      />
                                      <span className="truncate">{feature.name}</span>
                                    </button>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}
