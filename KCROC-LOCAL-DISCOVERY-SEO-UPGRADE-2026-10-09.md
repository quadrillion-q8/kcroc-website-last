# KCROC Local Discovery SEO Upgrade — 2026-10-09

## Scope

This upgrade uses the supplied Google Search Console export (`Last 3 months`) and the supplied latest KCROC website archive. It prioritizes Arabic/English local discovery and internal links to existing commercial service pages. It intentionally creates no new URLs and no service-by-neighbourhood page combinations.

## Search Console evidence used

From `computerrepairkuwait.com-Performance-on-Search-2026-10-09(1).zip`:

- Homepage: 9,646 impressions, 301 clicks, 3.12% CTR, average position 4.55.
- `/location/hawalli`: 1,728 impressions, 45 clicks, 2.60% CTR, average position 8.13.
- `/location/farwaniya`: 967 impressions, 19 clicks, 1.96% CTR, average position 10.21.
- `/ar/near-me`: 114 impressions, 2 clicks, 1.75% CTR, average position 15.29.
- `/ar/computer-repair-hawalli`: 53 impressions, 4 clicks, 7.55% CTR, average position 6.06.
- `/laptop-screen-repair-kuwait`: 760 impressions, 19 clicks, 2.50% CTR, average position 6.44.
- `/battery-replacement-kuwait`: 453 impressions, 19 clicks, 4.19% CTR, average position 7.46.
- `/laptop-keyboard-replacement-kuwait`: 74 impressions, 5 clicks, 6.76% CTR, average position 7.38.
- Query `فني كمبيوتر`: 614 impressions, 0 clicks, average position 3.04.
- Query `فني كمبيوتر الكويت ٢٤ ساعة`: 18 impressions, 0 clicks, average position 14.94.
- Query `فني كمبيوتر حولي`: 16 impressions, 0 clicks, average position 5.19.
- Query `thermal paste`: 10 impressions, 0 clicks, average position 5.80.
- Query `laptop repair kuwait`: 236 impressions, 9 clicks, average position 34.03.
- Query `computer repair kuwait`: 132 impressions, 8 clicks, average position 31.58.

The separate query list pasted in chat reports different counts for several terms (for example, `فني كمبيوتر` = 393 and `pc kuwait` = 120). This does not match the supplied Search Console CSV, so this upgrade treats the CSV as the authoritative source for this pass. Reconcile the export dates/property/filters before comparing those datasets.

## Implemented changes

1. **Homepage SERP snippet** — strengthened the title and description around laptop/computer repair in Kuwait, real repair categories, Hawalli lab, free pickup, clear quotes and warranty.
2. **Arabic local-intent hub (`/ar/near-me`)** — updated title and description for `فني كمبيوتر الكويت` and `تصليح كمبيوتر حولي`, clarified pickup from home/office rather than implying an on-site technician, and refreshed the SEO last-modified metadata.
3. **Hawalli location page** — refreshed English title/description around computer repair, laptop repair, the Hawalli location and pickup/delivery; updated the metadata date.
4. **Farwaniya location page** — refreshed title/description around laptop/computer repair and the actual covered areas; updated the metadata date.
5. **Arabic Hawalli page** — improved its title/description to align with `فني كمبيوتر` and `تصليح كمبيوتر حولي`; updated the metadata date.
6. **Homepage service-area section** — added a compact Arabic local-discovery block linking to existing Arabic computer/laptop, Hawalli, battery, screen, keyboard and SSD/RAM pages. This adds useful crawl paths without multiplying URLs.
7. **Arabic near-me service discovery** — added direct links to existing keyboard and SSD/RAM pages and the existing Arabic thermal-paste guide; fixed duplicated wording in the WhatsApp enquiry message.
8. **Generated SEO projection** — kept the checked-in SEO projection aligned with the changed snippets. The normal project build regenerates it from `src/data/graph.ts`.

## Files changed

- `app/frontend/src/data/graph.ts`
- `app/frontend/src/data/seoGraph.generated.ts`
- `app/frontend/src/pages/NearMeAR.tsx`
- `app/frontend/src/components/home/ServiceAreas.tsx`
- `KCROC-LOCAL-DISCOVERY-SEO-UPGRADE-2026-10-09.md`

## Validation

- TypeScript/TSX syntax transpilation passed for the four modified source files.
- Generated SEO projection parsed as valid JSON and contains 123 routable entities.
- All new Arabic service links checked against existing graph slugs; no new page URLs were introduced.
- A full TypeScript typecheck, SSG production build and live crawl were **not run in this environment** because the project dependencies/package manager are not installed here. Run the normal project build before deployment.

## Google Business Profile work still requiring profile access

The website archive cannot directly change the live Google Business Profile. In the profile manager, verify:

- The official KCROC listing is the one at `Al-Mulla Complex, Shop 19, Hawalli`, with the map pin at the real customer-facing entrance.
- Business name, phone (`+965 5530 1913`), address, opening hours, website and booking link match the website and real operations.
- The primary category accurately reflects the main business; use only relevant additional categories.
- Services are listed accurately, including laptop/computer repair, battery/screen/keyboard replacement, charging faults, SSD/RAM upgrades and thermal cleaning where available.
- Add original workshop/service photos and request honest reviews from real customers; reply in the language of each review.
- Do not add “24 hours” unless the business truly accepts and fulfils customer service requests 24 hours a day. Do not create duplicate profiles or claim branches in service areas where no physical branch exists.

Google describes local rankings in terms of relevance, distance and prominence; website edits alone cannot guarantee Maps placement.
