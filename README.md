# @ikenga/tokens

[![Version](https://img.shields.io/badge/version-v0.0.0-blue.svg)](https://github.com/ikenga-hq/ikenga-tokens/releases)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](LICENSE)

> Canonical design tokens for Ikenga — one source of truth for the CSS custom properties
> the shell and every UI pkg share.

## What it is

`@ikenga/tokens` is the design-system package consumed by the
[Ikenga shell](https://github.com/ikenga-hq/ikenga) and every UI pkg. It ships the full
set of `:root` custom properties (dark default + light) plus TypeScript helpers, so a pkg
mini-app looks native inside the shell without redefining a palette.

## Install

```bash
pnpm add @ikenga/tokens
```

In the workspace, this is `workspace:*`.

## Usage

### CSS

Import once in your app's root stylesheet:

```css
@import '@ikenga/tokens/tokens.css';
```

This defines the full set of `:root` custom properties for both `data-mode="dark"` (default) and `data-mode="light"`. Toggle by setting the attribute on `<html>`.

### TypeScript

```ts
import { setMode, applyHostStyles, MCP_UI_APPS_TOKEN_KEYS } from '@ikenga/tokens';

setMode('light');                               // flip mode
applyHostStyles(hostContext.styles.variables);  // apply incoming CSS vars from AppBridge
```

## Token surface

- **Backgrounds**: `--bg-base`, `--bg-surface`, `--bg-raised`, `--bg-sunken`
- **Foregrounds**: `--fg`, `--fg-muted`, `--fg-subtle`
- **Borders**: `--border`, `--border-soft`, `--border-strong`
- **Brand + semantic**: `--primary`, `--accent`, `--info`, `--success`, `--warning`, `--danger`, `--agent`
- **Spacing**: `--space-{1,2,3,4,5,6,8}`
- **Radii**: `--radius-{xs,sm,md,lg,xl,pill}`
- **Typography**: `--font-{sans,display,mono}`, `--text-{caption,body,h3,h2,h1}`
- **Shadows**: `--shadow-{1,2,3}`
- **Tints**: `--tint-bg-active`, `--tint-fg-active`
- **MCP UI Apps schema bridge**: `--color-{background,text,border,ring}-*` mapped to the slots above

## Why a workspace pkg

Pkgs run in isolated iframes and can't share the shell's stylesheet. Without a shared tokens source they'd vendor frozen approximations and drift the moment the shell evolves its palette. By importing `@ikenga/tokens/tokens.css`, every pkg picks up palette changes on its next build.

For live theme flips (user toggles dark/light at runtime), the shell additionally pushes a curated subset of these tokens to each pkg via the AppBridge `host-context-changed` notification — apply with `applyHostStyles()`. Tokens outside the MCP UI Apps schema allowlist (spacing, radii, typography, custom semantic slots) are picked up at build time only.

## Links

- [ikenga.dev](https://ikenga.dev) — site + docs
- [`ikenga`](https://github.com/ikenga-hq/ikenga) — the desktop shell

## License

Apache-2.0 — see [`LICENSE`](LICENSE).
