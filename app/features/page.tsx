'use client';

import { useEffect } from 'react';
import { FEATURES, CATEGORY_THEME } from '@/constants';
import { FeatureSection } from '@/app/components/FeatureSection';

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

export default function FeaturesPage() {
  const grouped = groupFeaturesByCategory(FEATURES);
  const categoryCount = Object.keys(grouped).length;

  // Keep the URL hash in sync with the currently-visible feature so the sidebar highlight follows
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        let currentId = '';
        for (const feature of FEATURES) {
          const el = document.getElementById(feature.id);
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140) {
            currentId = feature.id;
          }
        }
        if (currentId && `#${currentId}` !== window.location.hash) {
          history.replaceState(null, '', `#${currentId}`);
          window.dispatchEvent(new HashChangeEvent('hashchange'));
        }
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Jump to hash target on initial load (after layout settles)
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      requestAnimationFrame(() => {
        document.getElementById(`feature-section-${hash}`)?.scrollIntoView({ block: 'start' });
      });
    }
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <main>
        {/* Hero */}
        <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
          <div className="max-w-5xl mx-auto px-4 py-14 sm:py-20">
            <div className="inline-flex items-center gap-3 mb-6 text-[11px] font-mono uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">
              <span className="h-px w-6 bg-gray-300 dark:bg-gray-700" />
              Showcase
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.02em] text-gray-900 dark:text-white">
              Every option, demoed.
            </h1>
            <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
              Live, editable examples for every robot-toast option. Hit run and watch the toast come to life.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-2 text-xs sm:text-sm">
              <span className="px-3 py-1 rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium">
                {FEATURES.length} features
              </span>
              <span className="px-3 py-1 rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium">
                {categoryCount} categories
              </span>
              <span className="px-3 py-1 rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium">
                Fully stylable
              </span>
            </div>
          </div>
        </div>

        {/* Category groups */}
        <div className="max-w-5xl mx-auto px-4 py-10 space-y-12">
          {Object.entries(grouped).map(([category, features]) => {
            const theme = CATEGORY_THEME[category];
            const label = theme?.label ?? category;
            const bg = theme?.bg ?? '#4b5563';
            const accent = theme?.accent ?? '#6b7280';
            return (
              <section key={category} aria-labelledby={`cat-${category}`}>
                <div
                  id={`cat-${category}`}
                  className="rounded-xl px-5 py-4 flex items-center justify-between text-white"
                  style={{ background: bg }}
                >
                  <h2 className="text-lg sm:text-xl font-bold tracking-tight">{label}</h2>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white/20">
                    {features.length} {features.length === 1 ? 'feature' : 'features'}
                  </span>
                </div>

                <div className="mt-5 space-y-5">
                  {features.map((feature) => (
                    <FeatureSection key={feature.id} feature={feature} accent={accent} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* Footer */}
        <footer className="bg-gray-50 dark:bg-gray-900/60 border-t border-gray-200 dark:border-gray-800 mt-12 py-12">
          <div className="max-w-5xl mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
            <p>
              Want to learn more? Check out the{' '}
              <a
                href="https://www.npmjs.com/package/robot-toast"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
              >
                full documentation
              </a>
              {' '}on npm.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
