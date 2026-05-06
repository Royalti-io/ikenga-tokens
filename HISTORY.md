# History & migration

This pkg was extracted from the Ikenga shell on 2026-05-06 as the canonical source for design tokens shared between the shell and every UI pkg.

## Source

The shell's `src/styles.css` referenced `./lib/ikenga/tokens.css` and `./lib/ikenga/theme-store`, neither of which were checked into the shell repo at extraction time (broken imports). This pkg is the new home for the CSS half of that pair — it materialises a working `tokens.css` and the matching MCP UI Apps schema bridge.

The TS theme-store (Zustand store driving `data-mode` / `data-theme` attributes) remains the shell's responsibility for now and is **not** part of this pkg.

## Cutover plan

1. **Now** — workspace pkg with own remote, full token surface, TS helpers.
2. **Next** — pkgs/tasks (and every future UI pkg) imports `@ikenga/tokens/tokens.css` instead of inlining fallbacks.
3. **Then** — shell's `src/styles.css` switches its `@import` from the missing local file to `@ikenga/tokens/tokens.css`. Fixes the long-standing broken import.
4. **Later** — extend the MCP UI Apps schema fork (or vendor it) so the shell can push more than the curated `--color-*` subset to pkgs at runtime, allowing live overrides of spacing/radii/typography too.

## Don't auto-install

Not a kernel pkg — `@ikenga/tokens` is a build-time dependency, not an installable mini-app. It lives at the workspace root next to `contract/`, not under `pkgs/`.
