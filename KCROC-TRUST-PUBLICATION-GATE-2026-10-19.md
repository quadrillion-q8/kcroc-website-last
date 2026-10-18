# KCROC Trust and Publication Gate — 19 October 2026

## Purpose
Reduce avoidable trust risk raised by the r/Kuwait discussion without inventing evidence, changing business/legal facts, or creating new SEO landing pages.

## Changes in this branch
- Added a reusable publication-eligibility helper for detailed case studies and review quotations.
- Case studies require explicit permission for device and repair details, plus at least one supporting first-party evidence asset.
- Customer photos require separate `photos` permission. Customer-context narratives require the `testimonial` scope.
- Applied the policy to the homepage before/after showcase, case-study index and detail pages, Hawalli and service-area location pages, plus location, brand, problem and service related-case cards.
- Marked the three currently unapproved case-study URLs `noindex, follow`, synchronized that status in generated SEO data, and removed them from the sitemap. The direct route presents a neutral noindex fallback.
- Removed hardcoded individual review quotations from the visible homepage review area and source graph. The homepage now links visitors to current Google reviews.
- Added optional review source and publication-verification fields to the knowledge-graph schema for future approved quotations.
- Added regression checks for consent, evidence, noindex, sitemap exclusion and review provenance.

## Current status
The three inspected case-study records have `customerConsent.granted: false` and empty evidence arrays. They remain unpublished until the required records are supplied. This does not establish whether the underlying repairs did or did not occur.

## Safe re-publication procedure
1. Confirm the repair job record and supporting technical evidence.
2. Record explicit customer permission and its exact scope (device, repair details, photos, testimonial as applicable).
3. Add the supporting evidence asset(s) to the case-study record.
4. Run the complete build and regression validators.
5. Remove the explicit `robots: 'noindex, follow'` only after the eligibility rule passes; regenerate the SEO projection and sitemap through the normal build.
6. Verify rendered content, metadata, sitemap membership and permitted images in preview before merging.

## Limitations
- No registration number or official Arabic legal entity name was added because no official registration record was supplied for verification.
- This branch does not change Vercel settings. The inspected production deployment was six commits behind GitHub main and its status linked to a build-rate-limit notice; deployment freshness and health must be rechecked before release.
- A full dependency-backed build and browser/production smoke test must pass in CI/preview before merging.
