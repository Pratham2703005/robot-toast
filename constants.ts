import type { ToastPosition, ToastType, ToastTheme, TransitionType } from 'robot-toast';

export const ROBOT_OPTIONS: readonly { name: string; value: string; path?: string }[] = [
  { name: 'None (no robot)',  value: 'none' },
  { name: 'Wave',             value: 'wave' },
  { name: 'Base',             value: 'base' },
  { name: 'Base 2',           value: 'base2' },
  { name: 'Success',          value: 'success' },
  { name: 'Error',            value: 'error' },
  { name: 'Angry',            value: 'angry' },
  { name: 'Angry 2',          value: 'angry2' },
  { name: 'Shock',            value: 'shock' },
  { name: 'Think',            value: 'think' },
  { name: 'Search',           value: 'search' },
  { name: 'Loading',          value: 'loading' },
  { name: 'Sleep',            value: 'sleep' },
  { name: 'Head Palm',        value: 'head-palm' },
  { name: 'Type',             value: 'type' },
  { name: 'Validation',       value: 'validation' },
  { name: 'Validation 2',     value: 'validation2' },
  { name: 'Bird (SVG)',       value: 'dxd/bird.svg',      path: 'your-project/public/dxd/bird.svg' },
  { name: 'Billy2',       value: 'dxd/billy2.png',     path: 'your-project/public/dxd/billy2.png' },
  { name: 'Jinwoo',       value: 'dxd/jinwoo.png',     path: 'your-project/public/dxd/jinwoo.png' },
  { name: 'Pickachu',       value: 'dxd/pickachu.svg',     path: 'your-project/public/dxd/pickachu.svg' },
  { name: 'Sharingan',       value: 'dxd/sharingan.png',      path: 'your-project/public/dxd/sharingan.png' },
  { name: 'Deadpool',       value: 'dxd/deadpool.gif',      path: 'your-project/public/dxd/deadpool.gif' },
];

export const ROBOTS = ROBOT_OPTIONS.map(o => o.value);

// Export client-side position/type/theme/transition options
export const POSITIONS: readonly ToastPosition[] = [
  'top-right', 'top-left', 'top-center',
  'bottom-right', 'bottom-left', 'bottom-center',
];

export const TYPES: readonly ToastType[] = [
  'default', 'info', 'success', 'warning', 'error',
];

export const THEMES: readonly ToastTheme[] = [
  'light', 'dark', 'colored',
];

export const TRANSITIONS: readonly TransitionType[] = [
  'bounce', 'slide', 'zoom', 'flip',
];

// Shared category palette — consumed by Sidebar, Features page, and per-feature toast styles
export const CATEGORY_THEME: Record<string, { label: string; accent: string; bg: string; text: string }> = {
  robot:       { label: 'Robots',       accent: '#8b5cf6', bg: '#7c3aed', text: '#fff' },
  position:    { label: 'Positions',    accent: '#06b6d4', bg: '#0891b2', text: '#fff' },
  theme:       { label: 'Themes',       accent: '#ec4899', bg: '#db2777', text: '#fff' },
  type:        { label: 'Types',        accent: '#10b981', bg: '#059669', text: '#fff' },
  animation:   { label: 'Animations',   accent: '#f59e0b', bg: '#d97706', text: '#fff' },
  behavior:    { label: 'Behavior',     accent: '#3b82f6', bg: '#2563eb', text: '#fff' },
  interaction: { label: 'Interactions', accent: '#ef4444', bg: '#dc2626', text: '#fff' },
  async:       { label: 'Async',        accent: '#6366f1', bg: '#4f46e5', text: '#fff' },
  styling:     { label: 'Styling',      accent: '#14b8a6', bg: '#0d9488', text: '#fff' },
  other:      { label: 'other-style',  accent: '#fafafa', bg: '#18181b', text: '#fff' },
  memes:       { label: 'Memes',        accent: '#f43f5e', bg: '#e11d48', text: '#fff' },
};

// ────────────────────────────────────────────────────────────────────────────
// Unified toast style — premium Sonner-like dark.
// Applied to every feature so the demo site has a single coherent look. The
// per-feature `properties` still vary the BEHAVIOUR being demonstrated
// (position, transition, robotVariant, autoClose, etc.) — only the visual
// chrome is shared.
// ────────────────────────────────────────────────────────────────────────────
export const TOAST_STYLE = {
  background: '#0a0a0a',
  color: '#fafafa',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '12px',
  boxShadow: '0 16px 32px -12px rgba(0,0,0,0.6), 0 4px 8px rgba(0,0,0,0.3)',
  fontSize: '14px',
  fontWeight: '500',
  letterSpacing: '-0.01em',
} as const;

// Primary CTA — solid white-on-dark, bold. Used for the first button in any
// multi-button toast (the "main action") and as the only button when there's
// just one. High visual weight signals "this is what to click."
export const TOAST_BUTTON_PRI = {
  background: '#fafafa',
  color: '#0a0a0a',
  border: 'none',
  borderRadius: '6px',
  fontWeight: '600',
  fontSize: '12px',
  padding: '6px 12px',
} as const;

// Secondary — outlined / muted. Used for "Cancel" or alternate actions next
// to the primary CTA. Same shape and size as the primary so the row lines up
// cleanly, but visually steps back so the primary reads as the default action.
export const TOAST_BUTTON_SEC = {
  background: 'transparent',
  color: '#a1a1aa',
  border: '1px solid #27272a',
  borderRadius: '6px',
  fontWeight: '500',
  fontSize: '12px',
  padding: '6px 12px',
} as const;

// ────────────────────────────────────────────────────────────────────────────
// Authentic Sonner-style toasts — used ONLY by the "other" category demos.
// These are pure message-only toasts (no robot, no progress chrome) and follow
// Sonner's "high-contrast" recipe: pure black surface, white text, solid
// near-black border (no opacity tricks), tight 10px radius, layered shadow.
// Per-type variants tint the border subtly while keeping text white — Sonner
// signals type via icon color, not text color, so we follow that convention
// (the existing emojis in each feature's message act as the colored icon).
// ────────────────────────────────────────────────────────────────────────────
const SONNER_BASE = {
  background: '#000000',
  color: '#ffffff',
  border: '1px solid #262626',
  borderRadius: '10px',
  padding: '3px 4px',
  fontSize: '14px',
  fontFamily: 'Inter, -apple-system, system-ui, sans-serif',
  fontWeight: '500',
  // Layout: row-flex with gap so the (hidden-progress-bar) Sonner toast keeps
  // its lifted, generous-padding feel even when the message contains an emoji
  // "icon" + text. minWidth matches Sonner's standard 356px toast width.
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  boxShadow: '0 8px 16px rgba(0,0,0,0.4)',
} as const;

export const SONNER_STYLE = {
  default: SONNER_BASE,
  success: { ...SONNER_BASE, border: '1px solid #1a2e1a' },
  error:   { ...SONNER_BASE, border: '1px solid #2e1a1a' },
  info:    { ...SONNER_BASE, border: '1px solid #1a232e' },
  warning: { ...SONNER_BASE, border: '1px solid #2e281a' },
} as const;

// Code-example fragments — kept in sync with the constants above so the snippet
// shown in each feature card matches what actually renders.
const STYLE_CODE = `style: {
    background: '#0a0a0a',
    color: '#fafafa',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '12px',
    boxShadow: '0 16px 32px -12px rgba(0,0,0,0.6), 0 4px 8px rgba(0,0,0,0.3)',
  }`;

const BTN_CODE     = `{ background: '#fafafa', color: '#0a0a0a', border: 'none', borderRadius: '6px', fontWeight: '600' }`;
const BTN_SEC_CODE = `{ background: 'transparent', color: '#a1a1aa', border: '1px solid #27272a', borderRadius: '6px', fontWeight: '500' }`;

// Sonner code-example builder — no robot import, tinted border per type.
const sonnerCode = (border: string) => `style: {
    background: '#000000',
    color: '#ffffff',
    border: '${border}',
    borderRadius: '10px',
    padding: '12px 16px',
    fontSize: '14px',
    fontFamily: 'Inter, -apple-system, system-ui, sans-serif',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    minWidth: '356px',
    boxShadow: '0 8px 16px rgba(0,0,0,0.4)',
  }`;

const sonnerEx = (body: string) =>
  `import { toast } from 'robot-toast';\n\ntoast(${body});`;

// Helper to build a toast() codeExample with consistent imports + style block.
// Every feature shows the robot variant being used in its `import` block, so
// users can see the full code path for any demo (the whole point of the site).
const ex = (variant: string, body: string) =>
  `import { toast } from 'robot-toast';\nimport { ${variant} } from 'robot-toast/robots';\n\ntoast(${body});`;

// ────────────────────────────────────────────────────────────────────────────
// Meme styles — one bespoke style per meme image. Each one leans into the
// vibe of its source (Deadpool red/black, Pikachu yellow/red, Sharingan
// crimson radial, etc.) so the Memes section feels like a sticker pack
// rather than a uniform grid. These override TOAST_STYLE entirely.
// ────────────────────────────────────────────────────────────────────────────
const MEME_STYLES = {
  jlLijiye: {
    background: '#000',
    color: '#ff75b8',
    border: '2px solid #ff75b8',
    borderRadius: '12px',
    boxShadow: '0 0 20px rgba(255, 117, 185, 0.6), 0 8px 24px -4px rgba(255, 117, 185, 0.3), inset 0 0 0 1px rgba(255, 117, 185, 0.2)',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
    fontWeight: '500',
  },
  billy: {
    background: '#0a0a0a',
    color: '#2a818a',
    border: '2px solid #2a818a',
    borderRadius: '999px 12px 999px 12px',
    boxShadow: '0 0 32px rgba(42, 129, 138, 0.6), 0 20px 40px -8px rgba(42, 129, 138, 0.4), inset 0 0 0 1px rgba(42, 129, 138, 0.2)',
    fontWeight: '600',
    letterSpacing: '0.02em',
  },
  bird: {
    background: '#0891b2',
    color: '#ffffff',
    border: '2px solid #0891b2',
    borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
    boxShadow: '0 8px 16px -4px rgba(6, 182, 212, 0.25)',
    fontWeight: '600',
  },
  deadpool: {
    background: '#7f1d1d',
    color: '#fecaca',
    border: '1px solid #dc2626',
    borderRadius: '12px',
    boxShadow: '0 0 0 2px #000, 0 12px 28px -8px rgba(220,38,38,0.7)',
    fontWeight: '700',
    letterSpacing: '0.02em',
  },
  hypocrisy: {
    background: '#78350f',
    color: '#fde68a',
    border: '1px solid #d97706',
    borderRadius: '8px',
    boxShadow: '0 14px 30px -8px rgba(217,119,6,0.5), inset 0 1px 0 rgba(253,230,138,0.2)',
    fontStyle: 'italic',
    fontWeight: '600',
  },
  jinwoo: {
    background: '#1e1b4b',
    color: '#c4b5fd',
    border: '1px solid #7c3aed',
    borderRadius: '14px',
    boxShadow: '0 0 24px rgba(139,92,246,0.5), 0 16px 32px -10px rgba(0,0,0,0.8)',
    fontWeight: '600',
    letterSpacing: '0.01em',
  },
  kyaKrRha: {
    background: '#f97316',
    color: '#431407',
    border: '3px solid #1c0701',
    borderRadius: '6px',
    boxShadow: '6px 6px 0 #1c0701, 12px 12px 28px -8px rgba(0,0,0,0.4)',
    fontWeight: '800',
    fontFamily: '"Comic Sans MS", "Comic Neue", cursive',
  },
  pikachu: {
    background: '#000000',
    color: '#fbbf24',
    border: '2px solid #fbbf24',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.8)',
    fontWeight: '700',
    letterSpacing: '0.01em',
  },
  saatCr: {
    background: '#0a0a0a',
    color: '#d4af37',
    border: '1px solid #7c3aed',
    borderRadius: '10px',
    boxShadow: '0 0 0 1px #7c3aed, 0 16px 32px -10px rgba(124, 58, 237, 0.3), inset 0 1px 0 rgba(212, 175, 55, 0.1)',
    fontWeight: '800',
    letterSpacing: '0.04em',
  },
  sharingan: {
    background: '#7f1d1d',
    color: '#fee2e2',
    border: '1px solid #991b1b',
    borderRadius: '999px 12px 999px 12px',
    boxShadow: '0 0 28px rgba(220,38,38,0.55), 0 16px 32px -10px rgba(0,0,0,0.85)',
    fontWeight: '700',
  },
  smjRheHo: {
    background: '#4d4d4d',
    color: '#000000',
    border: '1px solid #262626',
    borderRadius: '12px',
    boxShadow: '0 12px 28px -8px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)',
    fontWeight: '600',
  },
} as const;

// Render a meme style object into the textarea code preview. Decorative only:
// the runtime style is read from `properties.style`, not parsed from the text.
const memeStyleCode = (s: Record<string, string>) =>
  `style: {\n    ${Object.entries(s).map(([k, v]) => `${k}: '${v}'`).join(',\n    ')},\n  }`;

const memeEx = (path: string, message: string, style: Record<string, string>) =>
  `import { toast } from 'robot-toast';\n\ntoast({\n  message: '${message}',\n  robotVariant: '${path}',\n  ${memeStyleCode(style)},\n})`;

// Features data for the Features page
export const FEATURES = [
  // ─── Robot Variants (16) ─────────────────────────────────────────────────
  {
    id: 'robot-wave',
    name: 'Wave Robot',
    category: 'robot',
    description: 'Friendly waving robot companion',
    codeExample: ex('wave', `{\n  message: 'Hello there! 👋',\n  robotVariant: wave,\n  ${STYLE_CODE},\n}`),
    properties: { robotVariant: 'wave', message: 'Hello there! 👋', style: TOAST_STYLE },
  },
  {
    id: 'robot-base',
    name: 'Base Robot',
    category: 'robot',
    description: 'Standard robot variant',
    codeExample: ex('base', `{\n  message: 'Base robot loaded',\n  robotVariant: base,\n  ${STYLE_CODE},\n}`),
    properties: { robotVariant: 'base', message: 'Base robot loaded', style: TOAST_STYLE },
  },
  {
    id: 'robot-base2',
    name: 'Base 2 Robot',
    category: 'robot',
    description: 'Alternative base variant',
    codeExample: ex('base2', `{\n  message: 'Base 2 activated',\n  robotVariant: base2,\n  ${STYLE_CODE},\n}`),
    properties: { robotVariant: 'base2', message: 'Base 2 activated', style: TOAST_STYLE },
  },
  {
    id: 'robot-success',
    name: 'Success Robot',
    category: 'robot',
    description: 'Happy robot for success messages',
    codeExample: `import { toast } from 'robot-toast';\nimport { success } from 'robot-toast/robots';\n\ntoast.success({\n  message: 'Operation successful!',\n  robotVariant: success,\n  ${STYLE_CODE},\n});`,
    properties: { robotVariant: 'success', message: 'Operation successful!', type: 'success', style: TOAST_STYLE },
  },
  {
    id: 'robot-error',
    name: 'Error Robot',
    category: 'robot',
    description: 'Worried robot for error messages',
    codeExample: `import { toast } from 'robot-toast';\nimport { error } from 'robot-toast/robots';\n\ntoast.error({\n  message: 'Something went wrong',\n  robotVariant: error,\n  ${STYLE_CODE},\n});`,
    properties: { robotVariant: 'error', message: 'Something went wrong', type: 'error', style: TOAST_STYLE },
  },
  {
    id: 'robot-angry',
    name: 'Angry Robot',
    category: 'robot',
    description: 'Angry expression robot',
    codeExample: ex('angry', `{\n  message: 'Warning: angry mode',\n  robotVariant: angry,\n  type: 'warning',\n  ${STYLE_CODE},\n}`),
    properties: { robotVariant: 'angry', message: 'Warning: angry mode', type: 'warning', style: TOAST_STYLE },
  },
  {
    id: 'robot-angry2',
    name: 'Angry 2 Robot',
    category: 'robot',
    description: 'Alternative angry variant',
    codeExample: ex('angry2', `{\n  message: 'Extra angry!',\n  robotVariant: angry2,\n  type: 'warning',\n  ${STYLE_CODE},\n}`),
    properties: { robotVariant: 'angry2', message: 'Extra angry!', type: 'warning', style: TOAST_STYLE },
  },
  {
    id: 'robot-shock',
    name: 'Shock Robot',
    category: 'robot',
    description: 'Surprised robot',
    codeExample: ex('shock', `{\n  message: 'Unexpected event!',\n  robotVariant: shock,\n  ${STYLE_CODE},\n}`),
    properties: { robotVariant: 'shock', message: 'Unexpected event!', style: TOAST_STYLE },
  },
  {
    id: 'robot-think',
    name: 'Think Robot',
    category: 'robot',
    description: 'Thoughtful robot',
    codeExample: ex('think', `{\n  message: 'Let me think...',\n  robotVariant: think,\n  ${STYLE_CODE},\n}`),
    properties: { robotVariant: 'think', message: 'Let me think...', style: TOAST_STYLE },
  },
  {
    id: 'robot-search',
    name: 'Search Robot',
    category: 'robot',
    description: 'Searching robot with magnifying glass',
    codeExample: ex('search', `{\n  message: 'Searching...',\n  robotVariant: search,\n  ${STYLE_CODE},\n}`),
    properties: { robotVariant: 'search', message: 'Searching...', style: TOAST_STYLE },
  },
  {
    id: 'robot-loading',
    name: 'Loading Robot',
    category: 'robot',
    description: 'Loading spinner robot',
    codeExample: ex('loading', `{\n  message: 'Loading...',\n  robotVariant: loading,\n  autoClose: 5000,\n  hideProgressBar: true,\n  ${STYLE_CODE},\n}`),
    properties: { robotVariant: 'loading', message: 'Loading...', autoClose: 5000, hideProgressBar: true, style: TOAST_STYLE },
  },
  {
    id: 'robot-sleep',
    name: 'Sleep Robot',
    category: 'robot',
    description: 'Sleeping robot',
    codeExample: ex('sleep', `{\n  message: 'Time to sleep',\n  robotVariant: sleep,\n  ${STYLE_CODE},\n}`),
    properties: { robotVariant: 'sleep', message: 'Time to sleep', style: TOAST_STYLE },
  },
  {
    id: 'robot-headpalm',
    name: 'Head Palm Robot',
    category: 'robot',
    description: 'Embarrassed head-palm gesture',
    codeExample: ex('headPalm', `{\n  message: 'Oopsies!',\n  type: 'error',\n  robotVariant: headPalm,\n  ${STYLE_CODE},\n}`),
    properties: { robotVariant: 'headPalm', message: 'Oopsies!', type: 'error', style: TOAST_STYLE },
  },
  {
    id: 'robot-typing',
    name: 'Typing Robot',
    category: 'robot',
    description: 'Robot with typing gesture',
    codeExample: ex('typing', `{\n  message: 'Typing...',\n  robotVariant: typing,\n  ${STYLE_CODE},\n}`),
    properties: { robotVariant: 'typing', message: 'Typing...', style: TOAST_STYLE },
  },
  {
    id: 'robot-validation',
    name: 'Validation Robot',
    category: 'robot',
    description: 'Validation check robot',
    codeExample: ex('validation', `{\n  message: 'Validation passed!',\n  type: 'success',\n  robotVariant: validation,\n  ${STYLE_CODE},\n}`),
    properties: { robotVariant: 'validation', message: 'Validation passed!', type: 'success', style: TOAST_STYLE },
  },
  {
    id: 'robot-validation2',
    name: 'Validation 2 Robot',
    category: 'robot',
    description: 'Alternative validation variant',
    codeExample: ex('validation2', `{\n  message: 'All checks passed',\n  type: 'success',\n  robotVariant: validation2,\n  ${STYLE_CODE},\n}`),
    properties: { robotVariant: 'validation2', message: 'All checks passed', type: 'success', style: TOAST_STYLE },
  },

  // ─── Position Options (6) ────────────────────────────────────────────────
  {
    id: 'position-topright',
    name: 'Top Right Position',
    category: 'position',
    description: 'Display toast in the top-right corner',
    codeExample: ex('wave', `{\n  message: 'Top right position',\n  position: 'top-right',\n  robotVariant: wave,\n  ${STYLE_CODE},\n}`),
    properties: { message: 'Top right position', position: 'top-right', robotVariant: 'wave', style: TOAST_STYLE },
  },
  {
    id: 'position-topleft',
    name: 'Top Left Position',
    category: 'position',
    description: 'Display toast in the top-left corner',
    codeExample: ex('base', `{\n  message: 'Top left position',\n  position: 'top-left',\n  robotVariant: base,\n  ${STYLE_CODE},\n}`),
    properties: { message: 'Top left position', position: 'top-left', robotVariant: 'base', style: TOAST_STYLE },
  },
  {
    id: 'position-topcenter',
    name: 'Top Center Position',
    category: 'position',
    description: 'Display toast at the top center',
    codeExample: ex('base2', `{\n  message: 'Top center position',\n  position: 'top-center',\n  robotVariant: base2,\n  ${STYLE_CODE},\n}`),
    properties: { message: 'Top center position', position: 'top-center', robotVariant: 'base2', style: TOAST_STYLE },
  },
  {
    id: 'position-bottomright',
    name: 'Bottom Right Position',
    category: 'position',
    description: 'Display toast in the bottom-right corner',
    codeExample: ex('success', `{\n  message: 'Bottom right position',\n  position: 'bottom-right',\n  robotVariant: success,\n  ${STYLE_CODE},\n}`),
    properties: { message: 'Bottom right position', position: 'bottom-right', robotVariant: 'success', style: TOAST_STYLE },
  },
  {
    id: 'position-bottomleft',
    name: 'Bottom Left Position',
    category: 'position',
    description: 'Display toast in the bottom-left corner',
    codeExample: ex('validation', `{\n  message: 'Bottom left position',\n  position: 'bottom-left',\n  robotVariant: validation,\n  ${STYLE_CODE},\n}`),
    properties: { message: 'Bottom left position', position: 'bottom-left', robotVariant: 'validation', style: TOAST_STYLE },
  },
  {
    id: 'position-bottomcenter',
    name: 'Bottom Center Position',
    category: 'position',
    description: 'Display toast at the bottom center',
    codeExample: ex('validation2', `{\n  message: 'Bottom center position',\n  position: 'bottom-center',\n  robotVariant: validation2,\n  ${STYLE_CODE},\n}`),
    properties: { message: 'Bottom center position', position: 'bottom-center', robotVariant: 'validation2', style: TOAST_STYLE },
  },

  // ─── Theme Options (3) ───────────────────────────────────────────────────
  {
    id: 'theme-light',
    name: 'Light Theme',
    category: 'theme',
    description: 'Light color scheme',
    codeExample: ex('wave', `{\n  message: 'Light theme',\n  theme: 'light',\n  robotVariant: wave,\n}`),
    properties: { message: 'Light theme', theme: 'light', robotVariant: 'wave' },
  },
  {
    id: 'theme-dark',
    name: 'Dark Theme',
    category: 'theme',
    description: 'Dark color scheme',
    codeExample: ex('think', `{\n  message: 'Dark theme',\n  theme: 'dark',\n  robotVariant: think,\n}`),
    properties: { message: 'Dark theme', theme: 'dark', robotVariant: 'think' },
  },
  {
    id: 'theme-colored',
    name: 'Colored Theme',
    category: 'theme',
    description: 'Colorful theme based on type',
    codeExample: `import { toast } from 'robot-toast';\nimport { success } from 'robot-toast/robots';\n\ntoast({\n  message: 'Colored theme',\n  theme: 'colored',\n  type: 'success',\n  robotVariant: success,\n});`,
    properties: { message: 'Colored theme', theme: 'colored', type: 'success', robotVariant: 'success' },
  },

  // ─── Toast Type Options (5) ──────────────────────────────────────────────
  {
    id: 'type-default',
    name: 'Default Type',
    category: 'type',
    description: 'Default notification type',
    codeExample: ex('base', `{\n  message: 'Default type',\n  type: 'default',\n  robotVariant: base,\n}`),
    properties: { message: 'Default type', type: 'default', robotVariant: 'base' },
  },
  {
    id: 'type-info',
    name: 'Info Type',
    category: 'type',
    description: 'Informational notification',
    codeExample: `import { toast } from 'robot-toast';\nimport { think } from 'robot-toast/robots';\n\ntoast.info({\n  message: 'Info type notification',\n  robotVariant: think,\n});`,
    properties: { message: 'Info type notification', type: 'info', robotVariant: 'think' },
  },
  {
    id: 'type-success',
    name: 'Success Type',
    category: 'type',
    description: 'Success notification',
    codeExample: `import { toast } from 'robot-toast';\nimport { success } from 'robot-toast/robots';\n\ntoast.success({\n  message: 'Operation successful!',\n  robotVariant: success,\n});`,
    properties: { message: 'Operation successful!', type: 'success', robotVariant: 'success' },
  },
  {
    id: 'type-warning',
    name: 'Warning Type',
    category: 'type',
    description: 'Warning notification',
    codeExample: `import { toast } from 'robot-toast';\nimport { angry } from 'robot-toast/robots';\n\ntoast.warning({\n  message: 'Check your input',\n  robotVariant: angry,\n});`,
    properties: { message: 'Check your input', type: 'warning', robotVariant: 'angry' },
  },
  {
    id: 'type-error',
    name: 'Error Type',
    category: 'type',
    description: 'Error notification',
    codeExample: `import { toast } from 'robot-toast';\nimport { error } from 'robot-toast/robots';\n\ntoast.error({\n  message: 'Something went wrong',\n  robotVariant: error,\n});`,
    properties: { message: 'Something went wrong', type: 'error', robotVariant: 'error' },
  },

  // ─── Animations (5) ──────────────────────────────────────────────────────
  {
    id: 'feature-typing',
    name: 'Typewriter Effect',
    category: 'animation',
    description: 'Characters appear one by one',
    codeExample: ex('typing', `{\n  message: 'This appears letter by letter',\n  typeSpeed: 30,\n  robotVariant: typing,\n  ${STYLE_CODE},\n}`),
    properties: { message: 'This appears letter by letter', typeSpeed: 30, robotVariant: 'typing', style: TOAST_STYLE },
  },
  {
    id: 'transition-bounce',
    name: 'Bounce Transition',
    category: 'animation',
    description: 'Springy bounce entry and exit',
    codeExample: ex('shock', `{\n  message: 'Boing! Bounce transition',\n  transition: 'bounce',\n  robotVariant: shock,\n  ${STYLE_CODE},\n}`),
    properties: { message: 'Boing! Bounce transition', transition: 'bounce', robotVariant: 'shock', style: TOAST_STYLE },
  },
  {
    id: 'transition-slide',
    name: 'Slide Transition',
    category: 'animation',
    description: 'Smooth horizontal slide in and out',
    codeExample: ex('wave', `{\n  message: 'Sliding into view',\n  transition: 'slide',\n  robotVariant: wave,\n  ${STYLE_CODE},\n}`),
    properties: { message: 'Sliding into view', transition: 'slide', robotVariant: 'wave', style: TOAST_STYLE },
  },
  {
    id: 'transition-zoom',
    name: 'Zoom Transition',
    category: 'animation',
    description: 'Scales up from the center',
    codeExample: ex('shock', `{\n  message: 'Zooming in!',\n  transition: 'zoom',\n  robotVariant: shock,\n  ${STYLE_CODE},\n}`),
    properties: { message: 'Zooming in!', transition: 'zoom', robotVariant: 'shock', style: TOAST_STYLE },
  },
  {
    id: 'transition-flip',
    name: 'Flip Transition',
    category: 'animation',
    description: '3D flip entry',
    codeExample: ex('validation', `{\n  message: 'Flipping in 3D',\n  transition: 'flip',\n  robotVariant: validation,\n  ${STYLE_CODE},\n}`),
    properties: { message: 'Flipping in 3D', transition: 'flip', robotVariant: 'validation', style: TOAST_STYLE },
  },

  // ─── Behavior (8) ────────────────────────────────────────────────────────
  {
    id: 'feature-progress',
    name: 'Progress Bar',
    category: 'behavior',
    description: 'Countdown progress bar animation',
    codeExample: ex('loading', `{\n  message: 'Auto-closes in 5 seconds',\n  hideProgressBar: false,\n  autoClose: 5000,\n  robotVariant: loading,\n  ${STYLE_CODE},\n}`),
    properties: { message: 'Auto-closes in 5 seconds', hideProgressBar: false, autoClose: 5000, robotVariant: 'loading', style: TOAST_STYLE },
  },
  {
    id: 'feature-persistent',
    name: 'Persistent Toast',
    category: 'behavior',
    description: 'Disable auto-close — toast stays until manually dismissed',
    codeExample: ex('sleep', `{\n  message: 'I will stay until you close me',\n  autoClose: 0,\n  hideProgressBar: true,\n  robotVariant: sleep,\n  ${STYLE_CODE},\n}`),
    properties: { message: 'I will stay until you close me', autoClose: 0, hideProgressBar: true, robotVariant: 'sleep', style: TOAST_STYLE },
  },
  {
    id: 'feature-autoclose-short',
    name: 'Quick Close (1.5s)',
    category: 'behavior',
    description: 'Short-lived toast that auto-closes in 1.5 seconds',
    codeExample: ex('shock', `{\n  message: 'Gone in a flash',\n  autoClose: 1500,\n  robotVariant: shock,\n  ${STYLE_CODE},\n}`),
    properties: { message: 'Gone in a flash', autoClose: 1500, robotVariant: 'shock', style: TOAST_STYLE },
  },
  {
    id: 'feature-autoclose-long',
    name: 'Long Display (10s)',
    category: 'behavior',
    description: 'Lingering toast with a 10-second countdown',
    codeExample: ex('sleep', `{\n  message: 'Take your time reading this',\n  autoClose: 10000,\n  robotVariant: sleep,\n  ${STYLE_CODE},\n}`),
    properties: { message: 'Take your time reading this', autoClose: 10000, robotVariant: 'sleep', style: TOAST_STYLE },
  },
  {
    id: 'feature-hide-progress',
    name: 'Hidden Progress Bar',
    category: 'behavior',
    description: 'Auto-closes without showing the countdown bar',
    codeExample: ex('base', `{\n  message: 'No progress bar, just a clean close',\n  hideProgressBar: true,\n  autoClose: 4000,\n  robotVariant: base,\n  ${STYLE_CODE},\n}`),
    properties: { message: 'No progress bar, just a clean close', hideProgressBar: true, autoClose: 4000, robotVariant: 'base', style: TOAST_STYLE },
  },
  {
    id: 'feature-pause-hover',
    name: 'Pause on Hover',
    category: 'behavior',
    description: 'Countdown pauses while the cursor is over the toast',
    codeExample: ex('think', `{\n  message: 'Hover over me to pause',\n  pauseOnHover: true,\n  autoClose: 6000,\n  robotVariant: think,\n  ${STYLE_CODE},\n}`),
    properties: { message: 'Hover over me to pause', pauseOnHover: true, autoClose: 6000, robotVariant: 'think', style: TOAST_STYLE },
  },
  {
    id: 'feature-pause-focus',
    name: 'Pause on Focus Loss',
    category: 'behavior',
    description: 'Countdown pauses when the window loses focus (try switching tabs)',
    codeExample: ex('think', `{\n  message: 'Switch tabs — my timer pauses',\n  pauseOnFocusLoss: true,\n  autoClose: 8000,\n  robotVariant: think,\n  ${STYLE_CODE},\n}`),
    properties: { message: 'Switch tabs — my timer pauses', pauseOnFocusLoss: true, autoClose: 8000, robotVariant: 'think', style: TOAST_STYLE },
  },
  {
    id: 'feature-draggable',
    name: 'Drag & Drop',
    category: 'interaction',
    description: 'Click and drag the toast anywhere',
    codeExample: ex('wave', `{\n  message: 'Try dragging me around!',\n  draggable: true,\n  robotVariant: wave,\n  ${STYLE_CODE},\n}`),
    properties: { message: 'Try dragging me around!', draggable: true, robotVariant: 'wave', style: TOAST_STYLE },
  },

  // ─── Async (2) ───────────────────────────────────────────────────────────
  {
    id: 'feature-promise',
    name: 'Promise Lifecycle',
    category: 'async',
    description: 'Handle loading, success, and error states',
    codeExample: `import { toast } from 'robot-toast';\nimport { loading } from 'robot-toast/robots';\n\ntoast.promise(fetchData(), {\n  loading: 'Loading...',\n  success: 'Loaded!',\n  error: 'Failed!',\n}, {\n  robotVariant: loading,\n  ${STYLE_CODE},\n});`,
    properties: { message: 'Promise lifecycle demo', robotVariant: 'loading', style: TOAST_STYLE },
  },
  {
    id: 'feature-lifecycle',
    name: 'Lifecycle Callbacks',
    category: 'async',
    description: 'Fire custom logic when the toast opens and closes (check your console)',
    codeExample: ex('validation', `{\n  message: 'Lifecycle hooks — see console',\n  autoClose: 3000,\n  onOpen: () => console.log('Toast opened'),\n  onClose: () => console.log('Toast closed'),\n  robotVariant: validation,\n  ${STYLE_CODE},\n}`),
    properties: {
      message: 'Lifecycle hooks — see console',
      autoClose: 3000,
      onOpen: () => console.log('Toast opened'),
      onClose: () => console.log('Toast closed'),
      robotVariant: 'validation',
      style: TOAST_STYLE,
    },
  },

  // ─── Interaction (non-button) (2) ────────────────────────────────────────
  {
    id: 'feature-rtl',
    name: 'RTL Layout',
    category: 'interaction',
    description: 'Right-to-left layout — message on the right, robot on the left',
    codeExample: ex('wave', `{\n  message: 'مرحبا — RTL layout',\n  rtl: true,\n  robotVariant: wave,\n  ${STYLE_CODE},\n}`),
    properties: { message: 'مرحبا — RTL layout', rtl: true, robotVariant: 'wave', style: TOAST_STYLE },
  },
  {
    id: 'feature-near-screen',
    name: 'Away From Edge',
    category: 'interaction',
    description: 'Flip robot placement so the message sits closer to the screen edge',
    codeExample: ex('base', `{\n  message: 'Robot sits away from the edge',\n  robotVariant: base,\n  nearScreen: false,\n  ${STYLE_CODE},\n}`),
    properties: { message: 'Robot sits away from the edge', robotVariant: 'base', nearScreen: false, style: TOAST_STYLE },
  },

  // ─── Styling (1) ─────────────────────────────────────────────────────────
  {
    id: 'feature-custom-style',
    name: 'Custom Styling',
    category: 'styling',
    description: 'Apply custom CSS styles inline',
    codeExample: ex('validation2', `{\n  message: 'Styled toast',\n  robotVariant: validation2,\n  ${STYLE_CODE},\n}`),
    properties: { message: 'Styled toast', robotVariant: 'validation2', style: TOAST_STYLE },
  },
  {
    id: 'feature-tailwind-classname',
    name: 'Tailwind className',
    category: 'styling',
    description: 'Use Tailwind utility classes via the className prop for rapid styling',
    codeExample: ex('success', `import toast from 'robot-toast';\\n\\ntoast('Styled with Tailwind!', {\\n  className: 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-semibold rounded-xl shadow-lg border-0',\\n  robotVariant: success,\\n});`),
    properties: { message: 'Styled with Tailwind!', robotVariant: 'success', className: 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-semibold rounded-xl shadow-lg border-0' },
  },
  // ─── Button variations (6) ───────────────────────────────────────────────
  {
    id: 'buttons-1',
    name: '1 Button',
    category: 'interaction',
    description: 'Toast with a single action button',
    codeExample: ex('validation', `{\n  message: 'Action needed',\n  robotVariant: validation,\n  buttons: [{\n    label: 'Done',\n    onClick: () => console.log('Clicked!'),\n    style: ${BTN_CODE}\n  }],\n  ${STYLE_CODE},\n}`),
    properties: {
      message: 'Action needed',
      robotVariant: 'validation',
      buttons: [{ label: 'Done', onClick: () => {}, style: TOAST_BUTTON_SEC }],
      style: TOAST_STYLE,
    },
  },
  {
    id: 'buttons-2',
    name: '2 Buttons',
    category: 'interaction',
    description: 'Toast with two action buttons — primary CTA + secondary',
    codeExample: ex('think', `{\n  message: 'Are you sure you want to continue?',\n  robotVariant: think,\n  buttons: [\n    { label: 'Confirm', onClick: () => {}, style: ${BTN_CODE} },\n    { label: 'Cancel',  onClick: () => {}, style: ${BTN_SEC_CODE} },\n  ],\n  ${STYLE_CODE},\n}`),
    properties: {
      message: 'Are you sure you want to continue?',
      robotVariant: 'think',
      buttons: [
        { label: 'Confirm', onClick: () => {}, style: TOAST_BUTTON_SEC },
        { label: 'Cancel',  onClick: () => {}, style: TOAST_BUTTON_PRI },
      ],
      style: TOAST_STYLE,
    },
  },
  {
    id: 'buttons-3',
    name: '3 Buttons',
    category: 'interaction',
    description: 'Toast with three action buttons — first primary, rest secondary',
    codeExample: ex('search', `{\n  message: 'Choose option',\n  robotVariant: search,\n  buttons: [\n    { label: 'Option 1', onClick: () => {}, style: ${BTN_CODE} },\n    { label: 'Option 2', onClick: () => {}, style: ${BTN_SEC_CODE} },\n    { label: 'Option 3', onClick: () => {}, style: ${BTN_SEC_CODE} },\n  ],\n  ${STYLE_CODE},\n}`),
    properties: {
      message: 'Choose option',
      robotVariant: 'search',
      buttons: [
        { label: 'Option 1', onClick: () => {}, style: TOAST_BUTTON_SEC },
        { label: 'Option 2', onClick: () => {}, style: TOAST_BUTTON_PRI },
        { label: 'Option 3', onClick: () => {}, style: TOAST_BUTTON_PRI },
      ],
      style: TOAST_STYLE,
    },
  },
  {
    id: 'buttons-4',
    name: '4 Buttons',
    category: 'interaction',
    description: 'Toast with four action buttons — first primary, rest secondary',
    codeExample: ex('shock', `{\n  message: 'Multiple choices',\n  robotVariant: shock,\n  buttons: [\n    { label: 'A', onClick: () => {}, style: ${BTN_CODE} },\n    { label: 'B', onClick: () => {}, style: ${BTN_SEC_CODE} },\n    { label: 'C', onClick: () => {}, style: ${BTN_SEC_CODE} },\n    { label: 'D', onClick: () => {}, style: ${BTN_SEC_CODE} },\n  ],\n  ${STYLE_CODE},\n}`),
    properties: {
      message: 'Multiple choices',
      robotVariant: 'shock',
      buttons: [
        { label: 'A', onClick: () => {}, style: TOAST_BUTTON_SEC },
        { label: 'B', onClick: () => {}, style: TOAST_BUTTON_PRI },
        { label: 'C', onClick: () => {}, style: TOAST_BUTTON_PRI },
        { label: 'D', onClick: () => {}, style: TOAST_BUTTON_PRI },
      ],
      style: TOAST_STYLE,
    },
  },
  {
    id: 'buttons-5',
    name: '5 Buttons',
    category: 'interaction',
    description: 'Toast with five action buttons — first primary, rest secondary',
    codeExample: ex('angry', `{\n  message: 'Many options',\n  robotVariant: angry,\n  buttons: [\n    { label: 'Btn 1', onClick: () => {}, style: ${BTN_CODE} },\n    { label: 'Btn 2', onClick: () => {}, style: ${BTN_SEC_CODE} },\n    { label: 'Btn 3', onClick: () => {}, style: ${BTN_SEC_CODE} },\n    { label: 'Btn 4', onClick: () => {}, style: ${BTN_SEC_CODE} },\n    { label: 'Btn 5', onClick: () => {}, style: ${BTN_SEC_CODE} },\n  ],\n  ${STYLE_CODE},\n}`),
    properties: {
      message: 'Many options',
      robotVariant: 'angry',
      buttons: [
        { label: 'Btn 1', onClick: () => {}, style: TOAST_BUTTON_SEC },
        { label: 'Btn 2', onClick: () => {}, style: TOAST_BUTTON_PRI },
        { label: 'Btn 3', onClick: () => {}, style: TOAST_BUTTON_PRI },
        { label: 'Btn 4', onClick: () => {}, style: TOAST_BUTTON_PRI },
        { label: 'Btn 5', onClick: () => {}, style: TOAST_BUTTON_PRI },
      ],
      style: TOAST_STYLE,
    },
  },
  {
    id: 'buttons-6',
    name: '6 Buttons',
    category: 'interaction',
    description: 'Toast with six action buttons — first primary, rest secondary',
    codeExample: ex('headPalm', `{\n  message: 'Maximum buttons',\n  robotVariant: headPalm,\n  buttons: [\n    { label: 'One',   onClick: () => {}, style: ${BTN_CODE} },\n    { label: 'Two',   onClick: () => {}, style: ${BTN_SEC_CODE} },\n    { label: 'Three', onClick: () => {}, style: ${BTN_SEC_CODE} },\n    { label: 'Four',  onClick: () => {}, style: ${BTN_SEC_CODE} },\n    { label: 'Five',  onClick: () => {}, style: ${BTN_SEC_CODE} },\n    { label: 'Six',   onClick: () => {}, style: ${BTN_SEC_CODE} },\n  ],\n  ${STYLE_CODE},\n}`),
    properties: {
      message: 'Maximum buttons',
      robotVariant: 'headPalm',
      buttons: [
        { label: 'One',   onClick: () => {}, style: TOAST_BUTTON_SEC },
        { label: 'Two',   onClick: () => {}, style: TOAST_BUTTON_PRI },
        { label: 'Three', onClick: () => {}, style: TOAST_BUTTON_PRI },
        { label: 'Four',  onClick: () => {}, style: TOAST_BUTTON_PRI },
        { label: 'Five',  onClick: () => {}, style: TOAST_BUTTON_PRI },
        { label: 'Six',   onClick: () => {}, style: TOAST_BUTTON_PRI },
      ],
      style: TOAST_STYLE,
    },
  },

  // ─── Sonner-style (7) — authentic Sonner look. No robot, no progress bar,
  // tight black surface with tinted border per semantic type. Uses SONNER_STYLE
  // constants instead of TOAST_STYLE so the two looks stay cleanly separated.
  // hideProgressBar is on every entry — Sonner relies on natural fade-out, not
  // a visual countdown line.
  {
    id: 'other-default',
    name: 'Sonner · Default',
    category: 'other',
    description: 'Plain Sonner-style message — black surface, neutral border',
    codeExample: sonnerEx(`{\n  message: 'Event has been created',\n  hideProgressBar: true,\n  ${sonnerCode('1px solid #262626')},\n}`),
    properties: { message: 'Event has been created', hideProgressBar: true, style: SONNER_STYLE.default },
  },
  {
    id: 'other-success',
    name: 'Sonner · Success',
    category: 'other',
    description: 'Success state — green-tinted border',
    codeExample: sonnerEx(`{\n  message: '✅  Workspace activated successfully',\n  hideProgressBar: true,\n  ${sonnerCode('1px solid #1a2e1a')},\n}`),
    properties: { message: '✅  Workspace activated successfully', hideProgressBar: true, style: SONNER_STYLE.success },
  },
  {
    id: 'other-error',
    name: 'Sonner · Error',
    category: 'other',
    description: 'Error state — red-tinted border',
    codeExample: sonnerEx(`{\n  message: '❌  Could not save your changes',\n  hideProgressBar: true,\n  ${sonnerCode('1px solid #2e1a1a')},\n}`),
    properties: { message: '❌  Could not save your changes', hideProgressBar: true, style: SONNER_STYLE.error },
  },
  {
    id: 'other-warning',
    name: 'Sonner · Warning',
    category: 'other',
    description: 'Warning state — amber-tinted border',
    codeExample: sonnerEx(`{\n  message: '⚠️  Double-check your input',\n  hideProgressBar: true,\n  ${sonnerCode('1px solid #2e281a')},\n}`),
    properties: { message: '⚠️  Double-check your input', hideProgressBar: true, style: SONNER_STYLE.warning },
  },
  {
    id: 'other-info',
    name: 'Sonner · Info',
    category: 'other',
    description: 'Info state — blue-tinted border',
    codeExample: sonnerEx(`{\n  message: '💡  Your file is being processed',\n  hideProgressBar: true,\n  ${sonnerCode('1px solid #1a232e')},\n}`),
    properties: { message: '💡  Your file is being processed', hideProgressBar: true, style: SONNER_STYLE.info },
  },
  {
    id: 'other-description',
    name: 'Sonner · Description',
    category: 'other',
    description: 'Two-line toast — title + subtitle via newline (whiteSpace: pre-line)',
    codeExample: sonnerEx(`{\n  message: '✅  Event created\\nSunday, December 3rd at 9:30 PM',\n  hideProgressBar: true,\n  style: {\n    ...sonnerBase,\n    whiteSpace: 'pre-line',\n    lineHeight: '1.5',\n  },\n}`),
    properties: {
      message: '✅  Event created\nSunday, December 3rd at 9:30 PM',
      hideProgressBar: true,
      style: { ...SONNER_STYLE.default, whiteSpace: 'pre-line', lineHeight: '1.5' },
    },
  },
  {
    id: 'other-rich',
    name: 'Sonner · Rich',
    category: 'other',
    description: 'New-feature announcement — neutral border',
    codeExample: sonnerEx(`{\n  message: '✨  New feature available',\n  hideProgressBar: true,\n  ${sonnerCode('1px solid #262626')},\n}`),
    properties: { message: '✨  New feature available', hideProgressBar: true, style: SONNER_STYLE.default },
  },

  // ─── Memes (11) ──────────────────────────────────────────────────────────
  // Each meme uses an image from /public/dxd as the robotVariant and a bespoke
  // style (text color, background, shadow) that matches the meme's vibe.
  {
    id: 'Jal Lijiye',
    name: 'Jal Lijiye',
    category: 'memes',
    description: 'A wild screenshot appears — terminal-blue, mono font',
    codeExample: memeEx('/dxd/jl-lijiye.png', 'Jal lijiye... thak gaye honge', MEME_STYLES.jlLijiye),
    properties: {
      message: 'Jal lijiye... thak gaye honge',
      robotVariant: '/dxd/jl-lijiye.png',
      style: MEME_STYLES.jlLijiye,
    },
  },
  {
    id: 'meme-billy',
    name: 'Billy',
    category: 'memes',
    description: 'Hardboiled gold-on-black with warm amber shadow',
    codeExample: memeEx('/dxd/billy2.png', `Dont you worry a bit, Daddy is Home`, MEME_STYLES.billy),
    properties: {
      message: `Dont you worry a bit, Daddy is Home`,
      robotVariant: '/dxd/billy2.png',
      style: MEME_STYLES.billy,
    },
  },
  {
    id: 'meme-bird',
    name: 'Birb',
    category: 'memes',
    description: 'Cool cyan with a soft cloud halo and rounded top',
    codeExample: memeEx('/dxd/bird.svg', 'Chitti aayi Hai', MEME_STYLES.bird),
    properties: {
      message: 'Chitti aayi Hai',
      robotVariant: '/dxd/bird.svg',
      style: MEME_STYLES.bird,
    },
  },
  {
    id: 'meme-deadpool',
    name: 'Deadpool',
    category: 'memes',
    description: 'Maximum effort — red glow on black, double-stroked border',
    codeExample: memeEx('/dxd/deadpool.gif', 'I have 207 all the time', MEME_STYLES.deadpool),
    properties: {
      message: 'I have 207 all the time',
      robotVariant: '/dxd/deadpool.gif',
      style: MEME_STYLES.deadpool,
    },
  },
  {
    id: 'meme-jinwoo',
    name: 'Sung Jin-Woo',
    category: 'memes',
    description: 'Shadow-monarch deep purple with a violet glow',
    codeExample: memeEx('/dxd/jinwoo.png', 'Now, On to the NEXT ONE', MEME_STYLES.jinwoo),
    properties: {
      message: 'Now, On to the NEXT ONE',
      robotVariant: '/dxd/jinwoo.png',
      style: MEME_STYLES.jinwoo,
    },
  },
  {
    id: 'meme-kya-kr-rha',
    name: 'Kya Kr Rha H Yr Tu',
    category: 'memes',
    description: 'Hard-shadow comic-book orange — bro, what are you doing',
    codeExample: memeEx('/dxd/kya-kr-rha-h-yr-tu.png', 'Bhai kya kar raha hai tu?', MEME_STYLES.kyaKrRha),
    properties: {
      message: 'Bhai kya kar raha hai tu?',
      robotVariant: '/dxd/kya-kr-rha-h-yr-tu.png',
      style: MEME_STYLES.kyaKrRha,
    },
  },
  {
    id: 'meme-pikachu',
    name: 'Pikachu',
    category: 'memes',
    description: 'Round yellow pill with red lightning shadow',
    codeExample: memeEx('/dxd/pickachu.svg', 'Pika pika', MEME_STYLES.pikachu),
    properties: {
      message: 'Pika pika',
      robotVariant: '/dxd/pickachu.svg',
      style: MEME_STYLES.pikachu,
    },
  },
  {
    id: 'meme-saat-cr',
    name: 'Saat Crore',
    category: 'memes',
    description: 'Solid-gold bar with a cream halo and inset bottom highlight',
    codeExample: memeEx('/dxd/saat-cr.gif', '₹7 crore', MEME_STYLES.saatCr),
    properties: {
      message: '₹7 crore',
      robotVariant: '/dxd/saat-cr.gif',
      style: MEME_STYLES.saatCr,
    },
  },
  {
    id: 'meme-sharingan',
    name: 'Sharingan',
    category: 'memes',
    description: 'Crimson radial iris on black with a red glow',
    codeExample: memeEx('/dxd/sharingan.png', 'You are already under my GENJUTSU', MEME_STYLES.sharingan),
    properties: {
      message: 'You are already under my GENJUTSU',
      robotVariant: '/dxd/sharingan.png',
      style: MEME_STYLES.sharingan,
    },
  },
  {
    id: 'meme-smj-rhe-ho',
    name: 'Smj Rhe Ho',
    category: 'memes',
    description: 'Calm teal explainer — you understanding?',
    codeExample: memeEx('/dxd/smj-rhe-ho.gif', 'Samajh rahe ho? Haan? Samajh rahe ho?', MEME_STYLES.smjRheHo),
    properties: {
      message: 'Samajh rahe ho? Haan? Samajh rahe ho?',
      robotVariant: '/dxd/smj-rhe-ho.gif',
      style: MEME_STYLES.smjRheHo,
    },
  },
] as const;
