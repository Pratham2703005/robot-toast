/**
 * Maps the picker's v1-style variant values to the v2 world.
 *
 * In v1 the picker's value was a free-form string: 'wave', 'head-palm',
 * '/dxd/bird.svg', 'none', or empty. v2 separates these into three kinds:
 *
 *   - BUILTIN     : a string name that used to look up a data URL. In v2 we
 *                   must import the data URL by identifier from
 *                   `robot-toast/robots`. Some names were renamed.
 *   - CUSTOM_PATH : e.g. '/dxd/bird.svg' — still works unchanged.
 *   - HIDDEN      : 'none' / '' / undefined — the v2 default.
 *   - DEFAULT     : explicit 'default' sentinel — built-in inline SVG.
 *
 * Runtime consumers ask for the concrete data URL; code generators ask for
 * the identifier + the required import line.
 */

import * as robots from 'robot-toast/robots';

type DataUrlMap = Record<string, string>;
const DATA_URLS = robots as unknown as DataUrlMap;

/**
 * Picker value (string name or path) → v2 identifier to import.
 * Covers the two renames: 'head-palm' → 'headPalm', 'type' → 'typing'.
 */
const BUILTIN_RENAME: Record<string, string> = {
  'head-palm': 'headPalm',
  'type':      'typing',
};

export type VariantKind =
  | { kind: 'builtin'; id: string; dataUrl: string }
  | { kind: 'custom';  path: string }
  | { kind: 'default' }
  | { kind: 'hidden' };

const BUILTIN_NAMES = new Set<string>([
  'wave', 'base', 'base2', 'success', 'error',
  'angry', 'angry2', 'shock', 'think', 'search',
  'loading', 'sleep', 'head-palm', 'type',
  'validation', 'validation2',
]);

/** Classify a picker value. Safe for any string. */
export function classifyVariant(value: string | undefined | null): VariantKind {
  if (!value || value === 'none') return { kind: 'hidden' };
  if (value === 'default')        return { kind: 'default' };

  if (BUILTIN_NAMES.has(value)) {
    const id = BUILTIN_RENAME[value] ?? value;
    return { kind: 'builtin', id, dataUrl: DATA_URLS[id] ?? '' };
  }

  // Anything else is a user-supplied image path.
  return { kind: 'custom', path: value };
}

/**
 * Resolve a picker value to the actual `robotVariant` string to pass to
 * `toast()` at runtime under v2.
 *
 *  - hidden  → undefined (opt-in; omitting is the v2 way to hide)
 *  - default → 'default'
 *  - builtin → the imported data URL (data:image/svg+xml;...)
 *  - custom  → the path unchanged
 */
export function toRuntimeVariantV2(value: string | undefined | null): string | undefined {
  const k = classifyVariant(value);
  switch (k.kind) {
    case 'hidden':  return undefined;
    case 'default': return 'default';
    case 'builtin': return k.dataUrl || undefined; // fallback if not found
    case 'custom':  return k.path;
  }
}
