import type { POSITIONS, TYPES, THEMES, ROBOTS } from './constants';

export type ToastPosition = typeof POSITIONS[number];
export type ToastType     = typeof TYPES[number];
export type ToastTheme    = typeof THEMES[number];
export type RobotVariant  = typeof ROBOTS[number] | string;

export interface PlaygroundState {
  message:         string;
  position:        ToastPosition;
  type:            ToastType;
  theme:           ToastTheme;
  robotVariant:    RobotVariant;
  customStyle:     string;
  autoClose:       string;
  typeSpeed:       string;
  limit:           string;
  draggable:       boolean;
  nearScreen:      boolean;
  pauseOnHover:    boolean;
  pauseOnFocusLoss: boolean;
  hideProgressBar: boolean;
  rtl:             boolean;
  newestOnTop:     boolean;
  transition:      string;

  // Inline buttons (v2-only feature). Rendered in array order. Functions
  // can't live in serializable state, so we store label + optional inline
  // style (raw CSS string) and materialize onClick at runtime. The library
  // also supports a `className` prop for Tailwind / design-system tokens,
  // but the playground only exposes `style` since that's what's discoverable
  // without consulting external stylesheets.
  buttons: Array<{ label: string; style: string }>;
}

export interface AccordionItem {
  id:       string;
  label:    string;
  children: React.ReactNode;
}