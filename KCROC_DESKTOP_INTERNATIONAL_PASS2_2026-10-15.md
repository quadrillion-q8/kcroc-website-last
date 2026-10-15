# KCROC Desktop International Pass 2 — 15 October 2026

## Scope

This pass applies a consistent wide-screen layout baseline through shared site CSS and refines the main desktop navigation and mega-menu. The implementation covers pages that use the common `container`, `max-w-6xl` and `max-w-7xl` shell patterns, including the homepage, shared service/brand/problem templates, booking and pricing, guide/blog hubs, location pages and global footer.

## Changes

- Fluid content max-width tiers: 1360px from 1024px viewports, 1480px from 1536px, and 1560px from 1920px.
- Responsive horizontal gutters and restored authored padding on broad shells that explicitly declare `px-*` classes.
- Grid children can shrink safely; images, videos and iframes respect their parent width; headings use balanced wrapping; long links and technical strings can wrap rather than force grid overflow.
- Desktop navigation density is reduced on regular desktop/laptop widths and becomes more spacious again on very wide displays.
- Mega-menu content can scroll vertically on shorter desktop screens instead of being clipped.
- The shared problem-detail content canvas and location service-grid shell use a wider desktop grid. Long-form article templates retain narrower reading measures by design.

## Files

- `app/frontend/src/index.css`
- `app/frontend/src/core/components/layout/DesktopMegaMenu.tsx`
- `app/frontend/src/pages/templates/ProblemTemplate.tsx`
- `app/frontend/src/pages/LocationTemplate.tsx`

## Validation notes

Source-level checks confirm the expected wrappers and responsive rules are in place. This connector workflow does not provide an interactive viewport screenshot or a local dependency-installed build, so the implementation has not been visually certified at 1366px, 1440px, 1920px or ultrawide widths in a browser. The Vercel deployment/status check should be reviewed separately after commit.
