# PROOF marketing site — build & deploy handoff

Static site, no build step. Four pages + shared assets. Open any `.html` directly, or serve the folder.

## Files
- `index.html` — Home
- `method.html` — PROOF Method
- `partners.html` — Partners
- `ai-trust.html` — AI Trust
- `404.html` — branded not-found
- `proof.css` — design tokens + base layout (the locked design system)
- `reveal.css` — scroll-reveal motion + micro-interactions (shared)
- `light-plus.css` — cyan-lit hero, floating evidence table, brand-cyan CTA
- `enhance.js` — IntersectionObserver that drives the reveals (no framework)
- `favicon.svg`, `icons/`, `og/`, `manifest.webmanifest`, `robots.txt`, `sitemap.xml`, `vercel.json`
- `DESIGN-BRIEF.md` — the founder's original, binding brief. Read it first.

## Load order (already wired in every page)
1. Google Fonts (Inter + JetBrains Mono)
2. `proof.css` → `reveal.css` → `light-plus.css`
3. inline `<script>` in <head> adds `js-anim` (prevents reveal flash)
4. `enhance.js` before `</body>`

## What is implemented
- Responsive verified at 900 / 560 / ~390px: evidence tables stack into cards, the Method↔Assurance ladder and split columns stack, and there is a real mobile nav (CSS-only hamburger).
- Accessibility: global `:focus-visible` outlines, `prefers-reduced-motion` disables all motion, `-webkit-backdrop-filter` for Safari, dim hero text bumped to slate-500 for contrast.
- Motion (calm): staggered scroll reveals; the evidence table's navy header gets a one-time cyan "scan" sweep, then rows + status pills resolve in sequence; card hover-lift; animated nav underline; arrow nudge on buttons.
- Home: cyan-lit hero + the evidence table floats up as the hero object.
- One primary CTA per page (brand cyan `#00C2C7`, dark text, soft glow); the duplicate nav CTA was removed.

## LOCKED — do not change (see DESIGN-BRIEF.md)
- Copy (propose changes back, never edit silently), tokens, Inter/JetBrains fonts.
- The QED mark geometry `M 8 8 L 72 8 L 88 24 L 88 88 L 8 88 Z` and its colourways.
- Navy is `#0F2540` (app design-system navy) — do not fork to #1A3353 without a brand decision.

## Open decisions for the founder
1. CTAs are still `mailto:` placeholders — wire a real form or scheduling embed when the capture mechanism is chosen.
2. Nav CTA was removed for hierarchy; re-add a quiet (ghost) sticky CTA if you want an always-visible action.
3. Deploy target: production vs. preview URL.

## Deploy
Static → Vercel project `proofhq-website`. `vercel.json` already carries clean URLs + permanent redirects (/platform → /method, etc.). Do NOT touch the `proof-app` project.

## Old-repo carry-overs (not in this package — handle in the repo)
Keep `scorecard.html`, `privacy.html`, `terms.html`, and inspect `api/` before deleting. Remove superseded pages (platform, playbooks, how-it-works, before-after, system-flow, walkthrough) — their URLs already redirect.
