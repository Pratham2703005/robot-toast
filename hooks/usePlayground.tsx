'use client';

import { useState, useCallback } from 'react';
import { toast } from 'robot-toast';
import { generateCode } from '@/utils';
import { toRuntimeVariantV2 } from '@/lib/robotVariant';
import { useDocsVersion } from '@/app/components/VersionContext';
import type { PlaygroundState } from '@/types';

// Helper to parse raw CSS string like "color: red; background: blue;" into JS object
// Handles complex values with colons, commas, parentheses, etc.
function parseCustomStyle(cssText: string): Record<string, string> | undefined {
  if (!cssText?.trim()) return undefined;
  
  const styles: Record<string, string> = {};
  
  // Smart regex: match "property: value" where value can contain anything until the next semicolon or end
  // This regex handles: color: red; background: linear-gradient(45deg, red, blue); border: 1px solid;
  const propValueRegex = /([a-zA-Z-]+)\s*:\s*([^;]+?)(?=;|$)/g;
  
  let match;
  while ((match = propValueRegex.exec(cssText)) !== null) {
    const prop = match[1].trim();
    const value = match[2].trim();
    
    if (prop && value) {
      // Convert CSS property names (kebab-case) to camelCase for JavaScript
      // e.g., "backdrop-filter" -> "backdropFilter", "webkit-backdrop-filter" -> "webkitBackdropFilter"
      const camelProp = prop.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
      styles[camelProp] = value;
    }
  }
  
  return Object.keys(styles).length > 0 ? styles : undefined;
}

const INITIAL: PlaygroundState = {
  message:         'Welcome to robot-toast!',
  position:        'bottom-right',
  type:            'default',
  theme:           'light',
  robotVariant:    'wave',
  customStyle:     '',
  autoClose:       '5000',
  typeSpeed:       '30',
  limit:           '0',
  draggable:       true,
  nearScreen:      true,
  pauseOnHover:    true,
  pauseOnFocusLoss: true,
  hideProgressBar: false,
  rtl:             false,
  newestOnTop:     false,
  transition:      'bounce',
  buttons:         [],
};

export function usePlayground() {
  const [state, setState] = useState<PlaygroundState>(INITIAL);
  const { version } = useDocsVersion();

  const set = useCallback(<K extends keyof PlaygroundState>(key: K, value: PlaygroundState[K]) => {
    setState(prev => ({ ...prev, [key]: value }));
  }, []);

  const showToast = useCallback(() => {
    // Runtime is always v2 (what's installed). Translate the picker's v1-style
    // value into the form v2 actually accepts: built-in names become their
    // imported data URLs, 'none'/'' becomes undefined (v2's opt-in default).
    const runtimeVariant = toRuntimeVariantV2(state.robotVariant);

    // Buttons are stored as label + className pairs since function callbacks
    // can't live in serializable state. Materialize each one's onClick here so
    // the playground visibly demonstrates the click path — firing a follow-up
    // toast so you see the callback register.
    const buttons = state.buttons.length
      ? state.buttons
          .filter(b => b.label.trim().length > 0)
          .map(b => ({
            label:     b.label,
            className: b.className.trim() || undefined,
            onClick:   () => toast.success(`${b.label} clicked`),
          }))
      : undefined;

    toast({
      message:         state.message,
      position:        state.position,
      type:            state.type,
      theme:           state.theme,
      robotVariant:    runtimeVariant,
      style:           parseCustomStyle(state.customStyle),
      autoClose:       state.autoClose === '0' ? false : parseInt(state.autoClose, 10),
      typeSpeed:       parseInt(state.typeSpeed, 10),
      draggable:       state.draggable,
      nearScreen:      state.nearScreen,
      pauseOnHover:    state.pauseOnHover,
      pauseOnFocusLoss: state.pauseOnFocusLoss,
      hideProgressBar: state.hideProgressBar,
      rtl:             state.rtl,
      newestOnTop:     state.newestOnTop,
      transition:      state.transition as any,
      limit:           state.limit !== '0' ? parseInt(state.limit, 10) : undefined,
      buttons,
    });
  }, [state]);

  const closeAll = useCallback(() => toast.closeAll(), []);

  const code = generateCode(state, version);

  const copyCode = useCallback(() => {
    navigator.clipboard.writeText(code);
  }, [code]);

  return {
    state,
    set,
    showToast,
    closeAll,
    copyCode,
    code,
    version,
  };
}