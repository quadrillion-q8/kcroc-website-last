# KCROC Kuwait Customer Acquisition Upgrade — 13 October 2026

## Scope

Targeted source-code improvements to support Kuwait-specific search discovery, improve the Arabic query-to-page match, and make the English pricing page more useful from the first screen. This is a source ZIP update only; it does not deploy the website or edit the Google Business Profile.

## Search evidence used

The supplied three-month GSC export reports 665 Kuwait clicks from 17,071 impressions (3.90% CTR; average position 6.77). The separate Kuwait-filtered analysis supplied in the conversation reports `فني كمبيوتر` at 643 impressions, average position 3.2 and zero clicks; it also reports weaker local rankings for the main laptop/location/brand pages and `/pricing` at 593 impressions, position 10.9 and 0.34% CTR.

**Data caveat:** the uploaded GSC ZIP’s `Filters.csv` records Web search and Last 3 months but does not contain a Kuwait country filter. Therefore, the country totals are directly present in `Countries.csv`; the detailed Kuwait-only query/page/device metrics above are treated as a separately supplied filtered analysis and not as independently reproduced from that ZIP. Query-to-page assignment for `فني كمبيوتر` still needs verification in Search Console’s Pages tab.

## Files changed

1. `app/frontend/src/data/graph.ts`
   - Changed `/ar/computer-repair-kuwait` metadata to explicitly target “فني كمبيوتر في الكويت” while retaining its alternate relationship with the English homepage.
   - Repositioned `/ar/near-me` metadata toward proximity and pickup/delivery intent to reduce broad-keyword overlap.
   - Updated the English pricing title/description to lead with verified labor prices and state that parts are separate where applicable.
   - Updated the homepage modification date to reflect the new hero link.
2. `app/frontend/src/data/seoGraph.generated.ts`
   - Synchronized the SEO projection consumed by `SEOEngine` for the Arabic commercial/near-me pages and English pricing page.
   - Corrected a pre-existing source/projection mismatch: the generated Arabic commercial page was pointing its English alternate to `/computer-repair-kuwait`, while the graph source identifies the English homepage (`/`) as its counterpart. The projection now matches the graph source. The normal `generate:seo` build step must be run in the deployment environment to confirm parity.
3. `app/frontend/src/pages/ArabicCommercialPage.tsx`
   - Updated the Arabic main commercial page H1, opening copy, and price FAQ to match the technician/repair-in-Kuwait intent and clarify that quote approval precedes paid work.
4. `app/frontend/src/pages/NearMeAR.tsx`
   - Reframed the H1, breadcrumb, introductory copy, and WhatsApp prefill around nearby repair/pickup intent; added an internal link to the main Arabic commercial page.
5. `app/frontend/src/components/home/Hero.tsx`
   - Added a visible, accessible Arabic link from the homepage hero to `/ar/computer-repair-kuwait` on mobile and desktop. Clicks use the existing conversion analytics provider.
6. `app/frontend/src/components/home/ServiceAreas.tsx`
   - Corrected the homepage Arabic exact-anchor link “فني كمبيوتر في الكويت” to point to `/ar/computer-repair-kuwait`; reserved `/ar/near-me` for “تصليح كمبيوتر بالقرب مني”.
7. `app/frontend/src/pages/Pricing.tsx`
   - Added compact, responsive starting-price cards in the hero area: screen labor from 30 KWD plus panel; battery labor from 8 KWD plus battery; SSD/RAM installation labor from 5 KWD. Each links to the corresponding service page and keeps part costs qualified.
8. `app/frontend/scripts/validate-customer-growth-upgrade.mjs`
   - Added regression checks for the Arabic intent split, reciprocal homepage hreflang, hero links, and qualified pricing cards/snippet.
9. `KCROC_KUWAIT_CUSTOMER_ACQUISITION_UPGRADE_2026-10-13.md`
   - Added this implementation report and the remaining validation/operations checklist.

## What was intentionally not changed

- No new neighborhood URLs were created; existing local pages should be improved before expanding the URL inventory.
- No unsupported branch claims or guaranteed turnaround promises were added.
- No irrelevant printer/router/Chromecast repair pages or targeting were added. Relevant laptop screen cost intent should still be reviewed because KCROC offers screen repair.
- No review counts were added to public copy.
- No GBP edits, external citations/backlinks, production deployment, or Search Console submissions were performed.

## Validation status

Completed source-level checks so far:
- Confirmed the edited graph and generated SEO projection carry the intended Arabic titles/descriptions and reciprocal alternate paths.
- Confirmed the 30 KWD screen figure is qualified as labor plus panel; the 8 KWD battery figure is qualified as labor plus battery; the 5 KWD SSD/RAM figure is described as installation labor.
- The project customer-growth regression validator passes all 19 checks.
- Main-landmark and mobile-improvement validators pass; TypeScript syntax transpilation passes for all seven edited TS/TSX files, and the generated SEO projection parses as JSON.
- New homepage links target existing page routes and distinguish general Arabic service intent from proximity intent.

**Full build not run:** the supplied archive has no `node_modules`, `pnpm` is unavailable in this runtime, and a dependency-backed TypeScript/Vite SSG build therefore could not be run here. Do not deploy this ZIP until your usual CI/developer environment runs the full install/build and validators successfully.

## Required next actions outside the source ZIP

1. In GSC, filter Country = Kuwait, open query `فني كمبيوتر`, then inspect the Pages tab and record the URLs Google serves. Check again after recrawl.
2. Run the regular build, including `generate:nav`, `generate:seo`, sitemap generation and all validators. Review the generated projection diff to ensure it matches `graph.ts`.
3. Test `/`, `/ar/computer-repair-kuwait`, `/ar/near-me`, `/pricing`, `/laptop-screen-repair-kuwait`, `/battery-replacement-kuwait`, and `/ssd-ram-upgrade-kuwait` at mobile and desktop widths; verify phone, booking, WhatsApp and analytics events.
4. Deploy, inspect rendered HTML for titles/canonical/hreflang, then request indexing for changed URLs where appropriate. Recheck Kuwait-filtered CTR/position after Google has recrawled; do not assume a fixed recrawl timeline.
5. Complete off-site local authority work: maintain the eligible Hawalli GBP, publish authentic workshop photos, request honest reviews without incentives, correct relevant Kuwaiti citations, and seek genuine local links. Track calls, qualified enquiries, bookings and completed repair revenue—not just impressions.
