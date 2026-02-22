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
  { name: 'Bird (JPG)',       value: 'dxd/bird.jpg',      path: 'your-project/public/dxd/bird.jpg' },
  { name: 'Bird (GIF)',       value: 'dxd/bird.gif',      path: 'your-project/public/dxd/bird.gif' },
  { name: 'Img1 (ICO)',       value: 'dxd/img1.ico',      path: 'your-project/public/dxd/img1.ico' },
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