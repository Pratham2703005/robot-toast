'use client';

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

interface CodePreviewProps {
  code:     string;
  onCopy:   () => void;
}

export function CodePreview({ code, onCopy }: CodePreviewProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? theme === 'dark' : true;
  const colors = isDark
    ? {
        string: '#86efac',   // green
        keyword: '#93c5fd',  // blue
        property: '#c4b5fd', // purple
        function: '#fbbf24', // amber
      }
    : {
        string: '#059669',   // emerald-600
        keyword: '#0369a1',  // cyan-600
        property: '#6d28d9', // violet-600
        function: '#b45309', // amber-700
      };

  const handleCopy = () => {
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const fullCode = `import { toast } from 'robot-toast';\n\n${code}`;

 const escaped = fullCode
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;');

const highlighted = escaped
  .replace(/(&#39;[^&#]*&#39;|&quot;[^&]*&quot;|'[^']*'|"[^"]*")/g,
    `<span style="color:${colors.string}">$1</span>`)
  .replace(/\b(import|from|const|let|true|false)\b/g,
    `<span style="color:${colors.keyword}">$1</span>`)
  .replace(/(^|\s)([a-zA-Z]+)(?=:)/g,
  `$1<span style="color:${colors.property}">$2</span>`)
  .replace(/\b(toast)\b/g,
    `<span style="color:${colors.function}">$1</span>`);

  return (
    <div className="sticky top-6 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-xl">

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
        <div className="flex items-center gap-2">
          {/* macOS traffic lights */}
          {['#ff5f57','#febc2e','#28c840'].map(c => (
            <span key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />
          ))}
        </div>
        <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono tracking-wider">playground.ts</span>
        <button
          type="button"
          onClick={handleCopy}
          className="text-[11px] px-2.5 py-1 rounded-md bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all duration-150 font-mono"
        >
          {copied ? '✓ copied' : 'copy'}
        </button>
      </div>

      {/* Code */}
      <div className="p-5 overflow-x-auto max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700 bg-white dark:bg-zinc-950">
        <pre
          className="font-mono text-[12.5px] leading-relaxed text-zinc-900 dark:text-zinc-300 whitespace-pre"
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      </div>
    </div>
  );
}