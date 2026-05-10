'use client';

import { toast } from 'robot-toast';
import { wave } from 'robot-toast/robots';
import { TOAST_STYLE } from '@/constants';

export default function TryToastButton() {
  return (
    <button
      type="button"
      onClick={() => {
        toast({
          message: 'Hello from Robot Toast',
          type: 'success',
          robotVariant: wave,
          style: TOAST_STYLE,
          autoClose: 4000,
          position: 'bottom-right',
        });
      }}
      className="inline-flex items-center justify-center gap-3 h-14 sm:h-16 px-6 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-base sm:text-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-100 active:scale-[0.99] transition-all"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
      </svg>
      Try a toast
    </button>
  );
}
