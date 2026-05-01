'use client';

import { useState } from 'react';
import { toast } from 'robot-toast';
import { toRuntimeVariantV2 } from '@/lib/robotVariant';
import { CATEGORY_THEME, TOAST_STYLE, type FEATURES } from '@/constants';

interface FeatureSectionProps {
  feature: (typeof FEATURES)[number];
  accent?: string;
}

export function FeatureSection({ feature, accent }: FeatureSectionProps) {
  const [code, setCode] = useState<string>(feature.codeExample);
  const theme = CATEGORY_THEME[feature.category];
  const chipBg = theme?.bg ?? 'linear-gradient(135deg, #9ca3af 0%, #4b5563 100%)';
  const chipText = theme?.text ?? '#fff';
  const edge = accent ?? theme?.accent ?? '#8b5cf6';

  // Note: the textarea is a display/edit affordance. At runtime we parse a handful of
  // top-level options from the edited text and fall back to feature.properties for the rest
  // (including `style`), so edits to `style` in the textarea do not re-render the toast.
  const handleTrigger = () => {
    try {
      const codeToExecute = code.trim();
      const toastCallMatch = codeToExecute.match(/toast\(\{([\s\S]*?)\}\)/);
      if (!toastCallMatch) {
        const properties = feature.properties as Record<string, any>;
        const runtimeVariant = properties.robotVariant
          ? toRuntimeVariantV2(properties.robotVariant)
          : undefined;
        toast({
          message: properties.message || feature.description,
          ...properties,
          robotVariant: runtimeVariant,
        });
        return;
      }

      const objectStr = '{' + toastCallMatch[1] + '}';

      const robotVariantMatch = objectStr.match(/robotVariant\s*:\s*([^,}]+)/);
      let robotVariantValue: any = undefined;
      if (robotVariantMatch) {
        const rawValue = robotVariantMatch[1].trim();
        if (rawValue.startsWith("'") || rawValue.startsWith('"') || rawValue.startsWith('`')) {
          robotVariantValue = rawValue.slice(1, -1);
        } else {
          robotVariantValue = rawValue;
        }
      }

      const options: Record<string, any> = {};

      const messageMatch = objectStr.match(/message\s*:\s*['"`]([^'"`]*)/);
      if (messageMatch) options.message = messageMatch[1];

      const typeMatch = objectStr.match(/type\s*:\s*['"`]?([^'"`},\s]+)/);
      if (typeMatch) options.type = typeMatch[1];

      const themeMatch = objectStr.match(/theme\s*:\s*['"`]?([^'"`},\s]+)/);
      if (themeMatch) options.theme = themeMatch[1];

      const positionMatch = objectStr.match(/position\s*:\s*['"`]?([^'"`},\s]+)/);
      if (positionMatch) options.position = positionMatch[1];

      const autoCloseMatch = objectStr.match(/autoClose\s*:\s*([^,}]+)/);
      if (autoCloseMatch) {
        const val = autoCloseMatch[1].trim();
        options.autoClose = val === 'false' ? false : (isNaN(Number(val)) ? undefined : Number(val));
      }

      const buttonsMatch = objectStr.match(/buttons\s*:\s*\[([\s\S]*?)\]/);
      if (buttonsMatch) {
        const buttonsArrayStr = buttonsMatch[1];
        const buttonRegex = /\{\s*label\s*:\s*['"`]([^'"`]*)/g;
        let buttonMatch;
        const buttons = [];
        while ((buttonMatch = buttonRegex.exec(buttonsArrayStr)) !== null) {
          const label = buttonMatch[1];
          const buttonStartIndex = buttonMatch.index;
          let braceCount = 0;
          let endIndex = buttonStartIndex;
          for (let i = buttonStartIndex; i < buttonsArrayStr.length; i++) {
            if (buttonsArrayStr[i] === '{') braceCount++;
            if (buttonsArrayStr[i] === '}') {
              braceCount--;
              if (braceCount === 0) { endIndex = i; break; }
            }
          }
          const buttonStr = buttonsArrayStr.substring(buttonStartIndex, endIndex + 1);
          let buttonStyle: Record<string, any> | undefined;
          const styleMatch = buttonStr.match(/style\s*:\s*\{([^}]*)\}/);
          if (styleMatch) {
            const styleStr = styleMatch[1];
            const styleProps = styleStr.match(/([a-zA-Z-]+)\s*:\s*['"`]?([^'"`},]*)/g);
            if (styleProps) {
              buttonStyle = {};
              styleProps.forEach((prop) => {
                const [key, value] = prop.split(':').map((s) => s.trim());
                if (key && value) {
                  const camelKey = key.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
                  buttonStyle![camelKey] = value.replace(/['"`;]/g, '');
                }
              });
            }
          }
          buttons.push({ label, onClick: () => {}, ...(buttonStyle && { style: buttonStyle }) });
        }
        if (buttons.length > 0) options.buttons = buttons;
      }

      if (robotVariantValue) options.robotVariant = robotVariantValue;

      const runtimeVariant = options.robotVariant ? toRuntimeVariantV2(options.robotVariant) : undefined;
      const properties = feature.properties as Record<string, any>;

      // Start from the feature's full properties so callbacks (onOpen/onClose),
      // layout flags (rtl, nearScreen), behavior flags (pauseOnHover, pauseOnFocusLoss,
      // hideProgressBar, transition, typeSpeed, etc.) and `style` all apply. Then let
      // anything the user edited in the textarea override.
      const { robotVariant: _rv, ...propsRest } = properties;
      toast({
        ...propsRest,
        message: options.message || properties.message || feature.description,
        ...options,
        robotVariant: runtimeVariant,
      });
    } catch {
      const properties = feature.properties as Record<string, any>;
      const runtimeVariant = properties.robotVariant
        ? toRuntimeVariantV2(properties.robotVariant)
        : undefined;
      toast({
        message: properties.message || feature.description,
        ...properties,
        robotVariant: runtimeVariant,
      });
    }
  };

  const handleReset = () => setCode(feature.codeExample);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    toast({
      message: 'Code copied!',
      type: 'success',
      autoClose: 2000,
      style: TOAST_STYLE,
      hideProgressBar: true,
      position: 'top-center',
    });
  };

  return (
    <section
      id={feature.id}
      className="scroll-mt-24 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950/60 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
      style={{ borderTop: `3px solid ${edge}` }}
    >
      <div className="p-5 sm:p-6">
        {/* Header */}
        <div className="mb-5 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white truncate">
              {feature.name}
            </h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {feature.description}
            </p>
          </div>
          <span
            className="shrink-0 px-2.5 py-1 text-[11px] font-semibold rounded-full shadow-sm"
            style={{ background: chipBg, color: chipText }}
          >
            {feature.category}
          </span>
        </div>

        {/* Controls row */}
        <div className="mb-3 flex items-center gap-2">
          <button
            onClick={handleTrigger}
            className="inline-flex items-center gap-2 h-9 px-4 rounded-lg text-sm font-semibold text-white bg-linear-to-r from-purple-600 to-pink-600 shadow-sm hover:shadow-md active:scale-[0.98] transition-all"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
            Run toast
          </button>
          <button
            onClick={handleReset}
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title="Reset code"
            aria-label="Reset code"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
          <button
            onClick={handleCopyCode}
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title="Copy code"
            aria-label="Copy code"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </button>
        </div>

        {/* Code editor */}
        <div className="bg-gray-950 rounded-lg border border-gray-800 overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2 border-b border-gray-800 bg-gray-900/60">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" aria-hidden />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" aria-hidden />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" aria-hidden />
            </div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-gray-500">
              robot-toast
            </span>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full bg-transparent text-gray-100 text-xs sm:text-[13px] font-mono p-3 outline-none resize-y min-h-40"
            spellCheck="false"
          />
        </div>
      </div>
    </section>
  );
}
