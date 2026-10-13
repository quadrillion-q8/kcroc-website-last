# KCROC Pricing Clarity Update — 13 October 2026

## What changed

- Standardized the shared repair-cost FAQ with the pricing page: screen-replacement labor starts from 30 KWD plus the panel; battery-replacement labor starts from 8 KWD (the listed labor range is 8–15 KWD) plus the battery.
- Made the pricing table explicit that screen, battery and keyboard replacement prices are labor charges and exclude the replacement component.
- Updated the homepage pricing summary and location-page cost FAQ template so the screen figure is not presented as an all-inclusive installed price.
- Updated the source-of-truth service labels, screen/battery SEO titles and descriptions, service FAQs, and generated SEO projection.
- Kept the actual listed rates unchanged. No market-price reduction or new basic-thermal-cleaning tier was introduced because the competitor benchmarks and KCROC's underlying costs have not yet been verified.

## Files changed

- `app/frontend/src/data/graph.ts`
- `app/frontend/src/data/seoGraph.generated.ts`
- `app/frontend/src/pages/Pricing.tsx`
- `app/frontend/src/pages/ComputerRepairKuwait.tsx`
- `app/frontend/src/pages/LocationDeepTemplate.tsx`

## Validation

- Verified the old homepage FAQ figures (screen from 20 KWD; battery from 12 KWD) no longer appear in the source/generated FAQ data.
- Checked TypeScript/TSX syntax for all five changed source files using the available TypeScript parser.
- A full production build was not run in this workspace: project dependencies are not installed, and the package manager could not be fetched from the npm registry. Run the project's normal install/build checks before deployment.
