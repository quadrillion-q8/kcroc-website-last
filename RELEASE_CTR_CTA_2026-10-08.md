# KCROC CTR + CTA Optimization Release — 2026-10-08

## Implemented
- Reworked homepage SERP title/description around computer repair + free pickup + trust differentiation.
- Reworked near-me SERP messaging around local pickup/delivery rather than a generic shop claim.
- Reworked Arabic technician SERP messaging for `فني كمبيوتر` intent.
- Added price/intent language to laptop, gaming PC, MacBook, screen, motherboard and pricing SEO metadata.
- Moved the existing LeadMagnet directly below the homepage TrustBar for earlier low-friction conversion.
- Added primary WhatsApp quote + free-pickup CTAs to the top of every graph-driven service page.
- Made the global mobile WhatsApp CTA page-intent aware for pricing, battery, screen, gaming and location pages.
- Preserved the KCROC graph → navigation → sitemap → SSG architecture.
- Preserved the existing www canonical/redirect strategy in `vercel.json`.
- Bumped graph metadata to version 3.8.3 / 2026-10-08.

## Validation
- Source structure checks completed.
- Changed-file whitespace/syntax structure inspected.
- Full pnpm SSG build could not be executed in this environment because pnpm 8.10.0 is not installed and Corepack could not download it.
- Run the normal project build in the deployment environment before publishing.
