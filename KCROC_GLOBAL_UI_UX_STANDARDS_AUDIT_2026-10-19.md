# KCROC Global UI/UX Standards Audit

**Date:** 19 October 2026  
**Repository:** `quadrillion-q8/kcroc-website-last`  
**Baseline:** `e6560e22fa402ca94de13556a4973f14fd52b259`  
**Refactor branch:** `audit/global-ui-ux-standards-20261019`

## Executive result

The repository already had useful foundations: a global skip link and single main landmark, focus-visible styling, keyboard/Escape handling and focus return in the mobile navigation, a high-priority hero image with explicit dimensions, a generated knowledge graph feeding SEO, a single LocalBusiness schema authority, sticky CTA safe-area handling, and build-time landmark/mobile/responsive-image checks.

This pass repairs several repeatable issues in shared controls and common conversion surfaces. It does **not** claim a complete WCAG 2.2 AA certification: contrast and keyboard behaviour must still be tested in a rendered browser across pages, states, English/Arabic layouts, and viewport sizes.

## I. Findings by the requested UI categories

### 1. Structural layout elements

- The shared Button default and small variants were 40px and 36px high; icon controls were 40px square. These are under the 44px touch-target baseline for common controls.
- Several desktop nav controls and footer social/accordion/legal actions had compact hit areas.
- Footer address details were not marked up with the semantic `address` element and omitted the country from the displayed address.
- Phone display differed between Header, Contact, and Footer (including inconsistent local-number grouping).

**Refactor:** standardized shared button minimum height and icon size; enlarged desktop/footer hit areas; announced exact active desktop routes through `aria-current="page"`; normalized display to `+965 55301913` with `tel:+96555301913` links; and added semantic address markup with Kuwait in the displayed NAP.

### 2. Interactive UI controls

- Contact form fields relied on placeholders rather than programmatically associated labels; phone/email fields lacked complete autocomplete semantics and the phone input mode.
- Submit feedback changed visually but did not have an explicit polite live region.
- The consent banner used `role="dialog"` even though it was non-modal and did not trap focus.
- Shared button variants did not provide a consistent active/disabled/reduced-motion baseline.

**Refactor:** added explicit screen-reader labels and field IDs, name/tel/email autocomplete and telephone input mode, `aria-busy` and polite submit feedback; changed the non-modal consent panel to a named region with explicit button types; and improved shared active/disabled states.

### 3. Informational and media elements

- Legacy CSS overrode the Plus Jakarta Sans site-wide font stack.
- Legacy animations/smooth scrolling lacked a complete reduced-motion fallback.
- Legacy CTA colours created contrast risks: white text over bright amber and a bright red-to-amber urgency gradient, plus white foreground on the default green success button.
- Inline JSON-LD stringification did not escape a less-than character before injecting data into a script element.

**Refactor:** aligned the legacy font; added global and legacy reduced-motion handling; darkened the urgency gradient and selected contrasting CTA foreground colours; safely escaped `<` in JSON-LD. The hero image retains explicit dimensions and high fetch priority. The mobile hero now states the free Kuwait-wide pickup/delivery promise in its trust badges.

### 4. Navigation and feedback components

- Active desktop routes were visually marked but not exposed as the exact current page.
- Footer accordion, social, booking, phone, and legal controls had several hit areas below the requested 44px baseline.
- Cookie panel semantics implied a modal interaction it did not implement.

**Refactor:** corrected current-route announcements, increased interactive hit areas, improved footer legal-link readability, made the consent panel accurately describe itself as a non-modal region, and added a prominent service-grid logistics banner with a direct `/book` CTA. The hero, service grid, booking page and footer now explicitly state free pick-up/drop across all Kuwait governorates.

## II. KCROC business and architecture guardrails

- Business name, contact number, coordinates, opening hours and service areas remain driven by the existing knowledge graph; no duplicate source of truth was created.
- The existing SEO engine remains the authority for LocalBusiness/canonical metadata; no self-hosted review-rating schema was introduced.
- No route, service/location entity, case study, sitemap graph node, or URL was removed or renamed.
- Booking and WhatsApp destination flows remain unchanged; the changes improve semantics and hit-area reliability.
- Existing prebuild checks remain in place, with an additional UI/UX source-regression gate wired into the build.

## Build/deployment regression found during certification

A repository-local ESLint run also caught a redundant boolean cast in the new desktop active-route `aria-current` expression; this has been removed and added to the source regression rule.\n\nThe first post-refactor Vercel deployment exposed one build-blocking existing guardrail: `validateConstants.ts` flagged the Contact phone-field placeholder `+965 55301913` as a hardcoded local-format KCROC phone number. The placeholder was therefore changed to `Your number, including country code (+965)`; the official KCROC number remains sourced from the knowledge graph for business contact links. The UI/UX regression script now protects against reintroducing that exact literal.

This demonstrates why production build validation must remain a release gate. The reported deployment failed before the full certification workflow could pass; the updated pull-request workflow must complete successfully before calling this pass build-clean.

## III. Validation and work still needed for certification

The new `scripts/validate-global-ui-ux.mjs` is a source-level regression guard. Existing project checks still cover build validation, landmarks, mobile improvements, graph/constants/responsive-image validation, sitemap generation, SEO audit, and ESLint.

Before claiming full WCAG/CWV certification, still perform:

1. axe-core (or equivalent) against representative English and Arabic pages and dynamic states: open mobile menu, consent banner, dropdown, booking/contact forms, sticky CTA, and light-background sections.
2. Keyboard-only testing for visible focus, focus trapping/return, Escape dismissal and logical tab order; also test with a screen reader.
3. Horizontal-overflow/reflow checks at 320, 360, 390, 768, 1024, 1440 and 2560px, including zoom and fixed UI overlap.
4. Rendered contrast sampling for low-contrast slate utility classes and text-over-image overlays.
5. Field Core Web Vitals at the 75th percentile. Code alone cannot promise LCP under 2.5s, INP under 200ms, or CLS 0.00 on every device.

**Interpretation:** passing source/build checks is a regression guard, not a substitute for rendered WCAG testing or field performance measurement.
