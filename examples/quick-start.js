// quick-start.js — every property you can pass to robot-toast.

// 1. Import the toast function.
import { toast } from 'robot-toast';

// 2. Import the robot you want — here, the friendly "wave" variant.
import { wave } from 'robot-toast/robots';

// 3. Fire the toast with every available option.
toast({
  // ── Content ──────────────────────────────────────────────
  message: 'Hello from robot-toast!',     // the text to display
  type: 'success',                        // 'default' | 'info' | 'success' | 'warning' | 'error'
                                          // (or use the shortcut: toast.success('...'))
  robotVariant: wave,                     // imported robot, 'default', a custom image path, or omit for none

  // ── Placement & look ─────────────────────────────────────
  position: 'bottom-right',               // top/bottom + -left | -center | -right
  theme: 'light',                         // 'light' | 'dark' | 'colored'
  transition: 'bounce',                   // 'bounce' | 'slide' | 'zoom' | 'flip'
  style: {                                // inline CSS overrides (camelCase keys)
    background: '#0a0a0a',
    color: '#fafafa',
    borderRadius: '12px',
  },

  // ── Timing ───────────────────────────────────────────────
  autoClose: 5000,                        // ms before it closes, or false to keep it open
  typeSpeed: 30,                          // ms per character for the typing effect
  limit: 0,                               // max toasts shown at once (0 = unlimited)

  // ── Behavior ─────────────────────────────────────────────
  draggable: true,                        // let the user drag the toast away
  nearScreen: true,                       // nudge the toast in from the screen edge
  pauseOnHover: true,                     // pause the timer while hovered
  pauseOnFocusLoss: true,                 // pause the timer when the tab loses focus
  hideProgressBar: false,                 // hide the countdown progress bar
  rtl: false,                             // right-to-left layout
  newestOnTop: false,                     // stack newer toasts above older ones

  // ── Action buttons ───────────────────────────────────────
  buttons: [
    {
      label: 'Undo',
      onClick: () => { /* your code */ },
      style: { background: '#fafafa', color: '#0a0a0a' },
    },
  ],
});
