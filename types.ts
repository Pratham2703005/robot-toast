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
}

export interface AccordionItem {
  id:       string;
  label:    string;
  children: React.ReactNode;
}