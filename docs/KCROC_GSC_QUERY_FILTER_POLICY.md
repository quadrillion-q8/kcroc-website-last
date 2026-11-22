# KCROC — GSC EN/AR Query Exclusion Policy

**Status:** Audited draft for repeatable reporting (22 November 2026). **Scope:** Search Console performance reporting only; NOT live website copy, redirects, robots.txt, schema, or indexing rules.

## Source and segmentation

- Property: `sc-domain:computerrepairkuwait.com` (connected to KCROC OpenSEO project).
- Web search; **Country: Kuwait** (`kwt` in the API); 19 August–19 November 2026, finalized data.
- English segment = **landing-page URL does not contain `/ar/`**. Arabic segment = **landing-page URL contains `/ar/`**. Queries can appear in either language in either segment.
- Do not apply these service-demand exclusions to international guides, blogs, or informational keyword research. Restrict your commercial reporting further to relevant repair/location/brand pages when needed.

## Three-way classification

1. **Keep:** no clear unsupported-service match. This does not prove the query is a customer lead.
2. **Exclude:** clearly seeks a service KCROC does not offer, such as phone/tablet/console/router/printer repair; data recovery, antivirus/virus removal, gaming GPU reball/repair, in-home technician repairs, network setup, camera/CCTV installation, PC assembly, or hardware sales.
3. **Review manually:** mixed supported + unsupported intent, ambiguous desktop-monitor/laptop-screen language, generic disk repair, some home-service phrasing, and Sony-branded terms that might refer to VAIO laptops.

Never discard `mobile laptop pickup`, `repair pickup from home`, `استلام لابتوب من المنزل`, `تصليح شاشة لابتوب`, `Sony VAIO repair`, or `computer repair open now` merely because nearby unsupported words occur. Pickup/delivery is offered; repair at the customer's home is not. Do not confuse screen replacement in a laptop with repair of a standalone monitor.

## Use in Search Console (copy-safe workflow)

1. Performance → Search results → Country = **Kuwait** → Search type = **Web** → date range.
2. Apply a **Page** filter: use `Contains /ar/` for Arabic landing pages; `Doesn't contain /ar/` for English landing pages.
3. Before excluding queries, export the full **Queries** table from the selected page segment. Audit the export first.
4. Run `node app/frontend/scripts/audit-gsc-query-filters.mjs --print en` or `--print ar` to print the current RE2-compatible exclusion expression for **Query → Custom (regex) → Doesn't match regex**. Google Search Console uses partial RE2 matching.
5. **Important:** GSC's single negative regex cannot protect composite queries containing both offered and unsupported services because RE2 lacks lookaheads. The command-line audit flags such queries for manual review. For highest-accuracy reporting, use the classified CSV output rather than assuming the GSC UI filter has zero false positives.

## Audit a GSC export

From the repository root:

```sh
node app/frontend/scripts/audit-gsc-query-filters.mjs --test
node app/frontend/scripts/audit-gsc-query-filters.mjs --print en
node app/frontend/scripts/audit-gsc-query-filters.mjs --print ar
node app/frontend/scripts/audit-gsc-query-filters.mjs --segment en --input ./Queries-en.csv --presegmented --output ./audit-en.csv
node app/frontend/scripts/audit-gsc-query-filters.mjs --segment ar --input ./Queries-ar.csv --presegmented --output ./audit-ar.csv
```

The `--presegmented` flag is required for ordinary query-only exports; use it **only after** manually setting the Page filter. With exports containing both Page and Query columns, the tool auto-segments rows by landing-page URL. Do not sum query-table metrics and claim they equal property totals: anonymized queries and Search Console limits can differ.

## Live baseline from OpenSEO / Google Search Console

- Property and date window as above. **English:** 1,339 rows returned across two API pages. **Arabic:** 129 rows returned.
- Classified query rows: **EN** — Keep 1,250 (8,206 impressions, 135 clicks), Review 17 (208 impressions, 3 clicks), Exclude 72 (343 impressions, 6 clicks). **AR** — Keep 115 (1,500 impressions, 13 clicks), Review 6 (39 impressions, 0 clicks), Exclude 8 (33 impressions, 0 clicks). These are per-query returned-row sums, not property-level totals.
- Actual English mixed query: `iphone repair center kuwait mac book repair center kuwaitlaptop repair center kuwait service provider` — **135 impressions, 0 clicks**. A naïve iPhone exclusion would hide this query completely; offline classification routes it to manual review.
- Arabic ambiguous examples: `تصليح شاشات كمبيوتر` (20 impressions) and `تصليح شاشة كمبيوتر` (10 impressions). Keep for manual screen-type classification; avoid deleting automatically.
- Actual nonservice intent includes `تصليح كمبيوتر بالمنزل` (7 impressions), `فني كمبيوتر خدمة منازل` (11), `تصليح طابعات حولي` (3), and `شراء لابتوب` (6).
- Some filtered-out queries may already have clicks. They remain in the unfiltered GSC record; this document changes only analysis scope.

## Governance

- Source of truth: `app/frontend/scripts/kcroc-gsc-query-policy.json` stores both exclusion regexes, conservative review regexes, and bilingual regression cases.
- Script: `app/frontend/scripts/audit-gsc-query-filters.mjs` checks fixtures and classifies CSV exports without writing to the site.
- Re-run regression tests and compare manual-review lists whenever excluded services change; never use negative regex results as proof that a keyword is worthless.

Google Search Console reference: https://support.google.com/webmasters/answer/17011165?hl=en
