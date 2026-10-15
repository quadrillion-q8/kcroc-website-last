# KCROC SEO CTR + WHESVC Update — 15 October 2026

## Scope

This update continues from the previously supplied 15 October KCROC source and preserves the earlier near-me/pickup clarification. No new landing pages or URLs were created. No production deployment or Google Business Profile changes were performed.

## Changes implemented

### 1. Existing Arabic technician landing page

Updated the metadata for `/ar/computer-repair-kuwait` in `app/frontend/src/data/graph.ts` and synchronized the checked-in generated SEO projection:

- SEO title: `فني كمبيوتر في الكويت | استلام وتوصيل مجاني | KCROC`
- Meta description now leads with `فني كمبيوتر في الكويت`, explains collection from home or office, states that diagnosis and repair happen at the Hawalli workshop, and mentions return after testing and a clear quote before repair.
- Kept the existing URL, canonical, page H1, and deliberate separation from `/ar/near-me` unchanged.
- Updated `lastModified` to 15 October 2026.

This targets the high-visibility Arabic query without creating a competing URL. The wording is explicitly about pickup/delivery logistics, not repair at the customer's home.

### 2. English technician-query audit

Reviewed the available query export and existing English pages. The export reports:

- `computer technician`: 95 impressions, 2 clicks, 2.11% CTR, average position 4.20.
- `pc technician near me`: 8 impressions, 2 clicks, 25% CTR, average position 3.12.
- `laptop technician`: 7 impressions, 1 click, 14.29% CTR, average position 2.86.
- `computer repair near me`: 94 impressions, 1 click, 1.06% CTR, average position 4.16.

The English `/computer-repair-kuwait` description now naturally includes “computer technician in Kuwait” while retaining its broad repair-hub purpose. `/near-me` remains focused on proximity and pickup/delivery. No standalone English technician page was created because current evidence supports improving existing coverage first.

**Data limitation:** the supplied query and page exports are separate aggregate reports, so they do not prove which exact URL generated each query impression. Treat these as cluster-level signals, not a definitive query-to-URL map.

### 3. Existing WHESVC article and internal links

- Ran the repository's existing `apply_whesvc_guide_upgrade.py` against `app/frontend/src/constants/blogPosts.ts`.
- Expanded the existing Windows 11 Background Services guide with a safer WHESVC status-check section, read-only PowerShell command, official Microsoft source links, and more precise CVE-2025-59241 guidance and FAQs.
- Updated the article's SEO title/description to target `WHESVC Explained: Windows Health and Optimized Experiences` while preserving the existing guide URL.
- Added an early contextual link to the existing Windows 11 Settings guide. Existing reciprocal/contextual links from the Settings guide and GameBarPresenceWriter guide to the background-services guide remain in place.
- Synchronized the route-level SEO title and description in `graph.ts` and `seoGraph.generated.ts`.
- Did not create a standalone `/guides/whesvc-windows-11` page, avoiding duplicate coverage.

### 4. Regression validation

Updated the customer-growth validator's expected Arabic SEO title so it checks the new pickup/delivery value proposition instead of the previous title.

## Validation completed

- `node scripts/validate-customer-growth-upgrade.mjs` — passed, 25 checks.
- `node scripts/validate-main-landmarks.mjs` — passed.
- `node scripts/validate-mobile-improvements.mjs` — passed.
- Parsed the generated SEO projection as JSON-compatible data: 124 routable entities; verified Arabic metadata, English technician wording/date, and WHESVC SEO metadata.
- Source scan found no occurrences of `In-Home Computer Repair Kuwait`, `on-site visit is appropriate`, `computer repair can start at home`, `تصليح كمبيوتر بالمنزل`, or `تصليح لابتوب بالمنزل` in frontend source/scripts.

## Build/deployment limitation

A full dependency-backed `pnpm run build`, SSG render, SEO audit, and live URL verification were not run because dependencies are not installed in this environment. The generated SEO projection was synchronized with the source manually; the standard build's `pnpm run generate:seo` should regenerate it from `graph.ts`. Run `pnpm run build` in the project environment before deployment. This work has not been deployed to production.

## Files changed in this update

- `app/frontend/src/data/graph.ts`
- `app/frontend/src/data/seoGraph.generated.ts`
- `app/frontend/src/constants/blogPosts.ts`
- `app/frontend/scripts/validate-customer-growth-upgrade.mjs`
- `KCROC-SEO-CTR-WHESVC-UPDATE-2026-10-15.md` (new)

The previously completed near-me clarity changes remain included in this source package.
