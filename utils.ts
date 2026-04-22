import type { PlaygroundState } from './types';
import { classifyVariant } from './lib/robotVariant';
import type { DocsVersion } from './app/components/VersionContext';

/**
 * Render the playground state as a runnable code snippet.
 *
 * Returns the *full* snippet including any required imports, so the preview
 * shows exactly what a user would paste into their project.
 */
export function generateCode(state: PlaygroundState, version: DocsVersion = 'v2'): string {
  return version === 'v2' ? generateCodeV2(state) : generateCodeV1(state);
}

// ─── v1 — legacy ────────────────────────────────────────────────────────────
function generateCodeV1(state: PlaygroundState): string {
  const {
    message, position, type, theme,
    robotVariant,
    customStyle,
    autoClose, typeSpeed, draggable, nearScreen, pauseOnHover,
    pauseOnFocusLoss, hideProgressBar, rtl, newestOnTop, transition, limit,
  } = state;

  const lines: string[] = [
    `  message: "${message}"`,
    `  position: "${position}"`,
    `  type: "${type}"`,
    `  theme: "${theme}"`,
  ];

  if (robotVariant && robotVariant !== 'wave') {
    lines.push(`  robotVariant: "${robotVariant}"`);
  }

  appendShared(state, lines);

  const importLine = `import { toast } from 'robot-toast';`;
  return `${importLine}\n\ntoast({\n${lines.join(',\n')}\n});`;

  function appendShared(_s: PlaygroundState, acc: string[]) {
    if (customStyle?.trim()) {
      const styleObj = parseCustomStyleForCode(customStyle);
      if (styleObj) acc.push(`  style: ${styleObj}`);
    }
    acc.push(`  autoClose: ${autoClose === '0' ? 'false' : autoClose}`);
    if (typeSpeed !== '30') acc.push(`  typeSpeed: ${typeSpeed}`);
    acc.push(`  draggable: ${draggable}`);
    if (nearScreen === false) acc.push(`  nearScreen: false`);
    acc.push(`  pauseOnHover: ${pauseOnHover}`);
    if (pauseOnFocusLoss === false) acc.push(`  pauseOnFocusLoss: false`);
    if (hideProgressBar) acc.push(`  hideProgressBar: true`);
    if (rtl) acc.push(`  rtl: true`);
    if (newestOnTop) acc.push(`  newestOnTop: true`);
    if (transition !== 'bounce') acc.push(`  transition: "${transition}"`);
    if (limit !== '0') acc.push(`  limit: ${parseInt(limit, 10)}`);
  }
}

// ─── v2 ─────────────────────────────────────────────────────────────────────
function generateCodeV2(state: PlaygroundState): string {
  const {
    message, position, type, theme,
    customStyle,
    autoClose, typeSpeed, draggable, nearScreen, pauseOnHover,
    pauseOnFocusLoss, hideProgressBar, rtl, newestOnTop, transition, limit,
  } = state;

  const imports: string[] = [`import { toast } from 'robot-toast';`];
  const lines: string[] = [
    `  message: "${message}"`,
    `  position: "${position}"`,
    `  type: "${type}"`,
    `  theme: "${theme}"`,
  ];

  // v2 robotVariant handling:
  //  - hidden          → omit (v2 defaults to no robot)
  //  - 'default'       → quote as string
  //  - builtin by name → add import, reference identifier (not a string)
  //  - custom path     → quote as-is
  const v = classifyVariant(state.robotVariant);
  switch (v.kind) {
    case 'hidden':
      // Omit. v2's default is no robot, so writing nothing is correct.
      break;
    case 'default':
      lines.push(`  robotVariant: "default"`);
      break;
    case 'builtin':
      imports.push(`import { ${v.id} } from 'robot-toast/robots';`);
      lines.push(`  robotVariant: ${v.id}`);
      break;
    case 'custom':
      lines.push(`  robotVariant: "${v.path}"`);
      break;
  }

  if (customStyle?.trim()) {
    const styleObj = parseCustomStyleForCode(customStyle);
    if (styleObj) lines.push(`  style: ${styleObj}`);
  }
  lines.push(`  autoClose: ${autoClose === '0' ? 'false' : autoClose}`);
  if (typeSpeed !== '30') lines.push(`  typeSpeed: ${typeSpeed}`);
  lines.push(`  draggable: ${draggable}`);
  if (nearScreen === false) lines.push(`  nearScreen: false`);
  lines.push(`  pauseOnHover: ${pauseOnHover}`);
  if (pauseOnFocusLoss === false) lines.push(`  pauseOnFocusLoss: false`);
  if (hideProgressBar) lines.push(`  hideProgressBar: true`);
  if (rtl) lines.push(`  rtl: true`);
  if (newestOnTop) lines.push(`  newestOnTop: true`);
  if (transition !== 'bounce') lines.push(`  transition: "${transition}"`);
  if (limit !== '0') lines.push(`  limit: ${parseInt(limit, 10)}`);

  // Inline `buttons` array is a v2-only feature. Emit in array order with
  // placeholder handlers; user fills in their real onClick bodies.
  const activeBtns = state.buttons.filter(b => b.label.trim().length > 0);
  if (activeBtns.length > 0) {
    const items = activeBtns.map(b => {
      const parts = [`label: "${b.label}"`, `onClick: () => { /* your code */ }`];
      if (b.className.trim()) parts.push(`className: "${b.className.trim()}"`);
      return `    { ${parts.join(', ')} }`;
    }).join(',\n');
    lines.push(`  buttons: [\n${items}\n  ]`);
  }

  return `${imports.join('\n')}\n\ntoast({\n${lines.join(',\n')}\n});`;
}

// ─── shared helpers ─────────────────────────────────────────────────────────
function parseCustomStyleForCode(cssText: string): string {
  if (!cssText?.trim()) return '';

  const styles: Record<string, string> = {};
  const propValueRegex = /([a-zA-Z-]+)\s*:\s*([^;]+?)(?=;|$)/g;

  let match;
  while ((match = propValueRegex.exec(cssText)) !== null) {
    const prop = match[1].trim();
    const value = match[2].trim();
    if (prop && value) {
      const camelProp = prop.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
      styles[camelProp] = value;
    }
  }

  if (Object.keys(styles).length === 0) return '';

  const entries = Object.entries(styles)
    .map(([k, v]) => `${k}: "${v}"`)
    .join(', ');
  return `{ ${entries} }`;
}
