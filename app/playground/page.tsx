'use client';

import { usePlayground } from '@/hooks/usePlayground';
import { SettingsPanel } from '@/app/components/SettingsPanel';
import { CodePreview } from '@/app/components/CodePreview';

export default function Playground() {
  const { state, set, showToast, closeAll, copyCode, code } = usePlayground();

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-14">
        {/* Header */}
        <div className="mb-6 sm:mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 mb-1">
              Playground
            </h1>
            <p className="text-[13px] text-zinc-400 dark:text-zinc-500">
              Configure and preview toast notifications in real time.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-6 lg:gap-8 items-start">

          {/* Left: Settings */}
          <div className="rounded-xl border border-zinc-100 dark:border-zinc-800 divide-y divide-zinc-100 dark:divide-zinc-800 order-1">
            <div className="px-4 sm:px-5">
              <SettingsPanel state={state} set={set} />
            </div>
          </div>

          {/* Right: Code preview */}
          <div className="order-2 sticky top-30 z-50 flex flex-col gap-4">
            <div className=''>
              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={showToast}
                  className="flex-1 sm:flex-none rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-[13px] font-semibold px-4 py-2.5 sm:py-2 hover:opacity-90 active:scale-[0.98] transition-all duration-150"
                >
                  Show Toast
                </button>

                <button
                  type="button"
                  onClick={closeAll}
                  className="flex-1 sm:flex-none rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 text-[13px] font-medium px-4 py-2.5 sm:py-2 hover:bg-zinc-50 dark:hover:bg-zinc-800 active:scale-[0.98] transition-all duration-150"
                >
                  Close All
                </button>
              </div>
            </div>
            <CodePreview
              code={code}
              onCopy={copyCode}
            />
          </div>

        </div>
      </div>
    </div>
  );
}