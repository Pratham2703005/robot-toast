import type { PlaygroundState } from './types';

export function generateCode(state: PlaygroundState): string {
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

  // Include robotVariant if it's not the default 'wave'
  if (robotVariant && robotVariant !== 'wave') {
    lines.push(`  robotVariant: "${robotVariant}"`);
  }

  // Only include style if customStyle has a value
  if (customStyle?.trim()) {
    const styleObj = parseCustomStyleForCode(customStyle);
    if (styleObj) {
      lines.push(`  style: ${styleObj}`);
    }
  }

  lines.push(
    `  autoClose: ${autoClose === '0' ? 'false' : autoClose}`,
  );

  if (typeSpeed !== '30') lines.push(`  typeSpeed: ${typeSpeed}`);

  lines.push(
    `  draggable: ${draggable}`,
  );

  // Only include nearScreen if it's false (default is true)
  if (nearScreen === false) {
    lines.push(`  nearScreen: false`);
  }

  lines.push(`  pauseOnHover: ${pauseOnHover}`);

  if (pauseOnFocusLoss === false) lines.push(`  pauseOnFocusLoss: false`);
  if (hideProgressBar)  lines.push(`  hideProgressBar: true`);
  if (rtl)              lines.push(`  rtl: true`);
  if (newestOnTop)      lines.push(`  newestOnTop: true`);
  if (transition !== 'bounce') lines.push(`  transition: "${transition}"`);
  if (limit !== '0')    lines.push(`  limit: ${parseInt(limit, 10)}`);

  return `toast({\n${lines.join(',\n')}\n});`;
}

// Helper to convert raw CSS string to JS object for code generation
function parseCustomStyleForCode(cssText: string): string {
  if (!cssText?.trim()) return '';
  
  const styles: Record<string, string> = {};
  const propValueRegex = /([a-zA-Z-]+)\s*:\s*([^;]+?)(?=;|$)/g;
  
  let match;
  while ((match = propValueRegex.exec(cssText)) !== null) {
    const prop = match[1].trim();
    const value = match[2].trim();
    
    if (prop && value) {
      // Convert CSS property names (kebab-case) to camelCase for JavaScript
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