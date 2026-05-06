/**
 * @ikenga/tokens — TypeScript handles for the canonical design tokens.
 *
 * The CSS source of truth is `tokens.css`. This module exposes the same
 * tokens as TS values for runtime use:
 *
 *   - `MCP_UI_APPS_TOKEN_KEYS` — the curated subset the AppBridge host
 *     context handshake is allowed to ship (per the MCP UI Apps schema).
 *     Use from the shell to build `styles.variables` payloads.
 *
 *   - `applyHostStyles(vars)` — pkg-side helper. Writes incoming variables
 *     onto `:root` so the host's theme/mode flips are picked up live.
 *
 *   - `Mode`, `setMode(mode)` — toggle the `data-mode` attribute on `<html>`.
 */

export type Mode = 'light' | 'dark';

/** Set the active mode by writing the `data-mode` attribute. */
export function setMode(mode: Mode, target: HTMLElement = document.documentElement) {
  target.setAttribute('data-mode', mode);
}

/** Read the active mode (defaults to `dark` when unset). */
export function getMode(target: HTMLElement = document.documentElement): Mode {
  const v = target.getAttribute('data-mode');
  return v === 'light' ? 'light' : 'dark';
}

/**
 * The set of CSS variable names the MCP UI Apps schema permits in
 * `hostContext.styles.variables`. Anything outside this set fails the
 * initialize handshake with `unrecognized_keys`. The shell's
 * `cssVariablesSnapshot()` and the pkg-side `applyHostStyles` both work
 * within this list — for everything else, pkgs fall back on the values
 * shipped in `tokens.css`.
 */
export const MCP_UI_APPS_TOKEN_KEYS: readonly string[] = (() => {
  const keys: string[] = [];
  for (const kind of ['background', 'text', 'border']) {
    for (const slot of [
      'primary',
      'secondary',
      'tertiary',
      'inverse',
      'ghost',
      'info',
      'danger',
      'success',
      'warning',
      'disabled',
    ]) {
      keys.push(`--color-${kind}-${slot}`);
    }
  }
  for (const slot of [
    'primary',
    'secondary',
    'inverse',
    'info',
    'danger',
    'success',
    'warning',
  ]) {
    keys.push(`--color-ring-${slot}`);
  }
  keys.push('--font-sans', '--font-mono');
  return Object.freeze(keys);
})();

/**
 * Apply host-supplied CSS variables onto `:root` (or a custom target).
 * Silently drops keys not in {@link MCP_UI_APPS_TOKEN_KEYS} to match the
 * schema's allowlist behaviour.
 */
export function applyHostStyles(
  vars: Record<string, string> | undefined | null,
  target: HTMLElement = document.documentElement,
) {
  if (!vars) return;
  const allowed = new Set(MCP_UI_APPS_TOKEN_KEYS);
  for (const [k, v] of Object.entries(vars)) {
    if (!allowed.has(k)) continue;
    target.style.setProperty(k, v);
  }
}
