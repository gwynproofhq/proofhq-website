# Handoff: PROOF Marketing Site — Design & Deploy Brief
**For:** Claude Design
**From:** PROOF founder
**Date:** 8 July 2026
**Package:** This folder is the complete site — 4 pages, shared stylesheet, favicon, app icons, OG images, manifest, robots, sitemap, vercel.json (with redirects from the old site), and a branded 404.

---

## What this is

The new marketing site for PROOF (proofhq.io) — an evidence-governance platform for revenue teams. Four pages: **Home** (`index.html`), **Method** (`method.html`), **Partners** (`partners.html`), **AI Trust** (`ai-trust.html`). The structure, copy, and positioning are **final and approved**. Your job is design-grade polish and deployment readiness — not redesign, not rewriting.

The site deploys as a static site to Vercel (existing project: `proofhq-website`, repo `gwynproofhq/proofhq-website`). `vercel.json` already carries clean URLs and permanent redirects from the old site's pages.

---

## Fidelity: what is LOCKED

**Fidelity to the existing design system comes first.** Where you must deviate, keep the visual rhythm and flag the deviation.

### Design tokens (in `proof.css` — do not restyle)
- Brand cyan `#00C2C7` · cyan-deep `#0A8B8E` · navy `#0F2540` · paper (Mist) `#ECF3F2` · ink `#0F172A` · full slate scale, rose/amber/green semantics as defined.
- Type: **Inter** (400–800), **JetBrains Mono** for numeric chips. Tight negative tracking on display sizes (-.03em to -.035em).
- Radius: 8px buttons, 12px cards, 999px pills. Cards are 1px slate-200 border, **no shadow** (shadow only on hero/floating surfaces).
- Motion (if you add any): **120ms ease**, border-darken on card hover, no transforms, no spring/bounce. PROOF is calm.

### The QED mark (non-negotiable)
The brand mark is the Halmos tombstone ∎ — path `M 8 8 L 72 8 L 88 24 L 88 88 L 8 88 Z` on a 96 viewBox.
- **No gradients. No rounded corners. No stretching. No recolouring** beyond cyan / ink / navy / white. No drop shadows outside app-icon tiles.
- Chamfer is always 20% of the side. The chamfered "signature surface" clip-path may appear on **at most one hero surface per page**.
- Never render the mark below 12px.

### Copy (approved — do not rewrite)
- Copy is final. If you believe a line must change for layout reasons, **propose the change back; do not edit silently.**
- Voice, if you must add microcopy (alt text, form labels, button states): short declarative sentences ending in full stops. Active voice. "Evidence," not "data points." No exclamation marks, no hype.

### Language rules (enforce in anything you touch)
1. **PROOF** is always full uppercase — it is the wordmark, never a word.
2. **Method** and **Assurance** are named product depths, always capitalised.
3. **Evidence** is the generic noun. Never use "proof" (any case) when evidence is meant.
4. Verbs *prove / proven / defensible* are fine. The noun "proof" is reserved.
5. One sanctioned exception: the QED brand card on the Method page ("the mark that ends every mathematical proof") — literal mathematical usage, keep as is.

---

## Scope: what to DO

1. **Responsive verification and refinement.** Breakpoints are written (900px, 560px) but have not been verified on real devices. Priority: mobile rendering of (a) the Claim/Evidence/Status tables on Home and AI Trust, (b) the Method↔Assurance ladder, (c) the does/never and partner/client split columns. Keep the desktop layout untouched.
2. **Replace `mailto:` CTAs with a proper capture.** All CTAs currently point at `mailto:hello@proofhq.io` / `partners@proofhq.io` as placeholders. Implement a simple contact/booking capture (form or scheduling embed — founder to confirm which). Until confirmed, mailto stays.
3. **Micro-polish within the motion rules.** Scroll comfort, focus states, hover states, accessible contrast checks. Nothing springy.
4. **Deploy preview to Vercel.** New deployment of the existing `proofhq-website` project (or a preview branch). Do NOT touch any other Vercel project — `proof-app` is the product and is out of bounds.
5. **Cross-browser/device pass.** Safari (incl. iOS), Chrome, Edge. The clip-path chamfer and CSS grid layouts are the risk areas.

## Scope: what NOT to do

- Do not restyle tokens, swap fonts, or introduce new colours.
- Do not alter the QED mark geometry or colourways.
- Do not rewrite, shorten, or "enhance" copy. Propose; never edit.
- Do not add pages, sections, pricing, testimonials, logo walls, or chatbots.
- Do not add analytics/tracking without founder sign-off.
- Do not touch the `proof-app` Vercel project or repo. This site is `proofhq-website` only.

---

## Carry-overs from the OLD repo (founder decisions — do not delete blind)

The existing repo (`gwynproofhq/proofhq-website`) contains files not in this package. Handle as follows:

| Old file/folder | Action |
|---|---|
| `scorecard.html` | **Keep live** — it is a working lead-gen tool (Revenue Defensibility Audit). Restyle later, not now. |
| `api/` | **Inspect before touching** — likely powers the scorecard or a form. Deleting may silently break it. |
| `privacy.html`, `terms.html` | **Carry over as-is.** Legal pages; restyle later. |
| `blog/` | Keep the folder if it has content (URL continuity); drop if empty scaffolding. |
| `platform.html`, `playbooks.html`, `how-it-works.html`, `before-after.html`, `system-flow.html`, `walkthrough.html` | **Superseded.** Remove; `vercel.json` already redirects their URLs. |
| `logo-dark.svg`, `logo-light.svg`, old `styles.css`, `script.js`, old `favicon.svg` | Superseded by this package's assets. Remove. |
| `og/` (old) | Replace with this package's `og/`. |

## Open items (founder to confirm before/at deploy)

1. **Navy hex:** pages use `#0F2540` (the app design system). A newer brand bundle cites `#1A3353`. One must be declared canonical; it is a one-line swap in `proof.css` + OG images.
2. **CTA capture:** form vs. scheduling embed vs. mailto (see Scope item 2).
3. **Launch timing:** deploy to production or hold at preview URL.

---

## Definition of done

- All four pages pixel-faithful to the current desktop rendering; verified responsive at 900/560 and on iOS Safari.
- CTAs wired to the confirmed capture (or mailto retained by explicit choice).
- Old-repo carry-overs handled per the table; redirects verified live (`/platform` → `/method` etc.).
- OG previews verified via a real LinkedIn/Twitter card check.
- Zero console errors; Lighthouse accessibility ≥ 95.
- No copy changed without an approved proposal.

*When in doubt: fidelity first. The site should feel like the product's own claim — considered, calm, and defensible.*
