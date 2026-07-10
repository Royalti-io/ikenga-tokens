---
"@ikenga/tokens": minor
---

Add `--info` / `--info-soft` cool-blue semantic role. `--info` already existed in the base palette but was undefined under Theme A (Dusk Wood), where it fell back to a jarring pure-cyan `hsl(200,90%,60%)`; it is now Dusk-Wood-harmonized (`hsl(200,66%,64%)` dark / `hsl(200,74%,36%)` light) and gains a `--info-soft` deep tint. This is the shared cool role Studio's rendering-status (`◐`, progress bars, is-running, now-rendering beacon) and `--beat-accent-sky` re-base onto (studio-design-system G-02). WCAG-verified: 8.4:1 on `--bg-surface` (dark), all six Studio beat accents pairwise ΔE ≥ 30.
