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
        <div className="relative overflow-hidden bg-linear-to-br from-purple-600 via-pink-500 to-orange-400">
          <div className="absolute inset-0 bg-black/10" aria-hidden />
          <div className="relative max-w-5xl mx-auto px-4 py-14 sm:py-20">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
              Feature Showcase
            </h1>
            <p className="mt-3 text-lg sm:text-xl text-white/90 max-w-2xl">
              Every robot-toast option with live, editable demos. Hit run and watch the toast come to life.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-white/90">
              <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm font-medium">
                {FEATURES.length} features
              </span>
              <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm font-medium">
                {categoryCount} categories
              </span>
              <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm font-medium">
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
            const bg = theme?.bg ?? 'linear-gradient(135deg, #9ca3af 0%, #4b5563 100%)';
            const accent = theme?.accent ?? '#6b7280';
            return (
              <section key={category} aria-labelledby={`cat-${category}`}>
                <div
                  id={`cat-${category}`}
                  className="rounded-xl px-5 py-4 flex items-center justify-between text-white shadow-md"
                  style={{ background: bg }}
                >
                  <h2 className="text-lg sm:text-xl font-bold tracking-tight">{label}</h2>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-white/25 backdrop-blur-sm">
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
