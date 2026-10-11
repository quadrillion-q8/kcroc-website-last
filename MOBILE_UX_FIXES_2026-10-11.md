# KCROC Mobile UX Fixes — 11 October 2026

## Scope

This patch applies the first low-risk, source-verifiable accessibility fix from the mobile UX audit. It preserves KCROC's existing route graph, page content, visual styling, CTAs, and deployment architecture.

## Changes made

1. **One primary `<main>` landmark:** `RootLayout.tsx` remains the single owner of the page-level `<main id="main-content">` wrapper. Inner page components now use neutral `<div>` wrappers instead of nesting additional `<main>` landmarks. This keeps the global skip link and the existing `#main-content[data-page-type]` CSS hooks attached to the same wrapper.
2. **Removed a duplicate skip-link target:** the Arabic commercial page no longer declares a second `id="main-content"`; the global target remains in `RootLayout.tsx`.
3. **Added a build guard:** `scripts/validate-main-landmarks.mjs` checks that the source has exactly one opening/closing `<main>` pair and one `main-content` ID, all owned by `RootLayout.tsx`.
4. **Wired the guard into prebuild:** the validator runs before the existing route/SEO generation and build checks.

## Files changed

- `app/frontend/package.json`
- `app/frontend/scripts/validate-main-landmarks.mjs` (new)
- `app/frontend/src/pages/` — 35 TSX files updated to avoid nested main landmarks:
  - `About.tsx`
  - `ArabicCommercialPage.tsx`
  - `AuthorImran.tsx`
  - `BiosUefiRecoveryGuideAR.tsx`
  - `Blog.tsx`
  - `BlogPostTemplate.tsx`
  - `BookingPage.tsx`
  - `BrandsIndex.tsx`
  - `CaseStudiesIndex.tsx`
  - `ComputerRepairKuwait.tsx`
  - `Contact.tsx`
  - `DellLaptopOverheatingPage.tsx`
  - `FAQ.tsx`
  - `Gallery.tsx`
  - `GamingLaptopCleaningAR.tsx`
  - `GuidesIndex.tsx`
  - `Home.tsx`
  - `IntelVsAmdGuide.tsx`
  - `LaptopBuyingGuideAR.tsx`
  - `LaptopOverheatingGuide.tsx`
  - `LocationTemplate.tsx`
  - `Locations.tsx`
  - `News.tsx`
  - `NotFound.tsx`
  - `PillarTemplate.tsx`
  - `Pricing.tsx`
  - `PrivacyPolicy.tsx`
  - `PrivacySecurity.tsx`
  - `ProblemsIndex.tsx`
  - `Services.tsx`
  - `TermsOfService.tsx`
  - `Windows10EndOfSupportGuide.tsx`
  - `templates/BrandTemplate.tsx`
  - `templates/CaseStudyTemplate.tsx`
  - `templates/ServiceTemplate.tsx`

## Validation performed

- `node scripts/validate-main-landmarks.mjs` — **passed**.
- TypeScript compiler transpile/syntax pass over 117 `.ts`/`.tsx` source files — **no syntax diagnostics**. This does not replace full type-checking.
- Confirmed by source scan that `RootLayout.tsx` is the only file declaring a `<main>` element or `id="main-content"`.

## Not yet verified

- Full production build and ESLint were not run because project dependencies are not installed in this working copy and `pnpm` is unavailable in the environment.
- No real-device/browser-emulated viewport test, Lighthouse/PageSpeed run, keyboard/screen-reader test, or GA4 conversion analysis was available. Therefore this patch does **not** claim a measured Core Web Vitals improvement or a higher mobile UX score.
- No hero, cookie banner, sticky CTA, or homepage section layout was changed without visual/behavioral evidence. Those are the next test-first items: 320×720, 360×800, 390×844, and 430×932, including first-visit cookie consent and the fixed Call/WhatsApp bar together.

## Before deployment

1. Run `pnpm install --frozen-lockfile` in the normal development environment.
2. Run `pnpm run build` and `pnpm run lint`.
3. Preview the build and test the homepage, service, pricing, location, guide, and booking routes at the four mobile sizes listed above.
4. Confirm the skip link lands on `#main-content`, the consent banner never blocks essential actions, and the sticky CTA does not obscure page content.
5. Run mobile PageSpeed Insights/Lighthouse and compare LCP, INP, CLS, accessibility, and conversion events against the pre-change baseline before making further visual changes.

## Deployment status

**Not deployed.** This is an updated source archive for review and testing, not a claim that the live website has changed.
