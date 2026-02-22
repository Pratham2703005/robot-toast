'use client';

import { useState, useRef } from 'react';

interface AccordionItemProps {
  label:    string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function AccordionItem({ label, children, defaultOpen = false }: AccordionItemProps) {
  const [open, setOpen]   = useState(defaultOpen);
  const contentRef        = useRef<HTMLDivElement>(null);

  return (
    <div className="border-b border-zinc-100 dark:border-zinc-800 last:border-0">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between py-3.5 text-left group"
      >
        <span className="text-[13px] font-semibold tracking-wide uppercase text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors duration-150">
          {label}
        </span>
        <span
          className="text-zinc-400 dark:text-zinc-500 transition-transform duration-200 ml-2 shrink-0"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
          aria-hidden
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2.5 5L7 9.5L11.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </button>

      {/* CSS grid-rows trick: 0fr → 1fr, no JS height calculation, instant paint */}
      <div
        className="overflow-hidden transition-all duration-200 ease-out"
        style={{ display: 'grid', gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div ref={contentRef} className="min-h-0">
          <div className="pb-4 space-y-3">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

interface AccordionProps {
  children: React.ReactNode;
  className?: string;
}

export function Accordion({ children, className = '' }: AccordionProps) {
  return (
    <div className={`divide-y-0 ${className}`}>
      {children}
    </div>
  );
}