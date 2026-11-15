# KCROC Blog Editorial Audit — Global Strategy
Date: 2026-11-15
Repository: quadrillion-q8/kcroc-website-last
Scope: 20 identified blog URLs: 19 records in `app/frontend/src/constants/blogPosts.ts` plus one separately routed article component. This is an inventory and editorial-scope update, not a content rewrite.

## Editorial policy
- Guides and evergreen technical blog posts should solve problems for an international audience by default.
- News should cover internationally relevant technology developments; preserve regional context only when it materially changes the story.
- Local Kuwait articles remain local when the climate, market, service availability, pricing, or customer context is genuinely Kuwait-specific.
- Keep KCROC author/technical-review credibility. Avoid repeated Kuwait references, local sales CTAs, workshop details, pickup claims, or local keywords in global editorial content.
- Relevant KCROC service links may appear naturally and unobtrusively where professional repair is an appropriate next step. Clearly distinguish KCROC's Kuwait service coverage from the global usefulness of the advice.
- Do not change existing URLs/slugs, canonical strategy, graph/SSG, route registrations, or sitemap behavior without a separate migration case.

## Inventory and first-pass decisions
The original source-registry pass identified 12 `BLOG_POSTS` records. The eight URLs subsequently supplied by the site owner add seven more `BLOG_POSTS` records and one separately routed page (`IntelVsAmdGuide.tsx`). The combined working scope is therefore 20 URLs, not 20 entries in the one registry file.

All 20 are global editorial candidates by subject matter. This is a first-pass direction only; the page-level content, metadata, route and schema checks still need to be completed before implementation.

| Slug | Current title | Decision | Direction |
|---|---|---|---|
| nvidia-dlss-5-neural-rendering-explained | NVIDIA DLSS 5 Explained: Why Neural Rendering Can Cost FPS | GLOBAL | GPU rendering/performance education |
| ibm-quantum-system-two-nighthawk-r2-chicago | IBM Quantum System Two in Chicago: Nighthawk r2 Explained | GLOBAL | International technology coverage; Chicago is factual story context |
| microsoft-windows-surface-event-october-7-2026 | Microsoft Windows & Surface Event on October 7, 2026: What to Expect | GLOBAL | International event/news coverage |
| windows-11-26h2-iso-released | Windows 11 26H2 Rollout Status, ISO Guide & Post-Update Fixes (November 2026) | GLOBAL | Update rollout, installation and troubleshooting |
| windows-11-background-services-audit | Windows 11 Background Services You Can Audit in 2026 | GLOBAL | Windows technical education |
| windows-11-settings-tweaks | 18 Windows 11 Settings Worth Changing for Privacy, Speed & Better Control | GLOBAL | Privacy/performance education |
| ssd-not-detected-windows-11 | SSD Not Detected in Windows 11: Complete Diagnosis & Fix Guide | GLOBAL | Storage troubleshooting |
| gaming-pc-not-turning-on-kuwait | Gaming PC Won’t Turn On? Power, PSU & Motherboard Troubleshooting | GLOBAL | Hardware troubleshooting; preserve legacy URL |
| gaming-pc-black-screen-no-display-kuwait | Gaming PC Black Screen / No Display After Boot: POST, GPU & Display Troubleshooting | GLOBAL | POST/GPU/display troubleshooting; preserve legacy URL |
| gaming-gpu-artifacts-repair-kuwait | GPU Artifacting, Flickering & Black Screens in Games: Causes & Diagnostics | GLOBAL | GPU diagnosis; preserve legacy URL |
| gaming-pc-random-shutdown-kuwait | Gaming PC Shuts Down While Gaming? PSU, Heat & Motherboard Diagnosis | GLOBAL | Power/thermal diagnosis; preserve legacy URL |
| bitlocker-recovery-key-after-bios-update | Why Windows Asks for a BitLocker Recovery Key After a BIOS Update (and What to Do) | GLOBAL | BitLocker/firmware education |
| intel-core-ultra-vs-amd-ryzen-ai | Intel Core Ultra vs AMD Ryzen AI: Which Is Better? | GLOBAL | International processor/platform comparison; remove the Kuwait-specific cooling heading and generalize thermal considerations |
| why-8gb-ram-is-no-longer-enough-for-windows-11 | Is 8GB RAM Enough for Windows 11 in 2026? | GLOBAL | Workload-based RAM guidance; avoid universal upgrade claims |
| gaming-pc-mistakes-kuwait | 10 Gaming PC Mistakes That Are Quietly Killing Your Performance (2026) | GLOBAL | General gaming-PC setup/maintenance; retain hot-climate effects only as one regional factor, not the article's assumed audience |
| pc-gaming-graphics-settings-better-visuals-fps | You Don’t Need Max Graphics Settings for Great PC Gaming Visuals | GLOBAL | Game graphics quality/performance optimization |
| windows-11-100-disk-usage-causes-solutions | Windows 11 100% Disk Usage: Causes & Solutions | GLOBAL | Windows storage/performance diagnosis; keep repair CTA secondary |
| 10-reasons-why-people-are-dumping-windows-11 | 10 Reasons Why People Are Dumping Windows 11 (2026) | GLOBAL | International Windows commentary; remove Kuwait-only framing from description/author positioning |
| how-to-protect-laptop-screen | How to Protect Your Laptop Screen from Breaking | GLOBAL | Universal laptop handling/prevention; remove Hawalli-lab-led opening and local sales framing |
| gaming-pc-cooling | Gaming PC Cooling Guide: Causes, Fixes & Thermal Throttling | GLOBAL | Evidence-led cooling, sensor interpretation, airflow and thermal-throttling guide |

## Findings and page-specific flags
- Four original gaming troubleshooting slugs include the legacy `-kuwait` suffix although the topics are globally useful. Preserve all current paths; do not rename slugs or introduce redirects in this editorial pass.
- The additional `gaming-pc-mistakes-kuwait` URL also has a legacy local suffix. Its existing content explicitly foregrounds Kuwait's climate and repair-bench observations. Reframe the article for a global audience while retaining hot ambient temperature and dust as relevant regional variables; do not imply those conditions apply to every reader.
- `intel-core-ultra-vs-amd-ryzen-ai` is a separately routed page component (`app/frontend/src/pages/IntelVsAmdGuide.tsx`), not a `BLOG_POSTS` registry record. It must be audited and edited as a standalone route, including its SEO graph and prerendered output. Its content currently includes a Kuwait-specific cooling section.
- `how-to-protect-laptop-screen` currently opens with a Hawalli-lab/local-repair claim. The global version should lead with universal screen-protection advice and make any KCROC service reference a clearly optional, geographically transparent footer/CTA.
- `10-reasons-why-people-are-dumping-windows-11` currently uses Kuwait repair-technician positioning in its description. Preserve credible author expertise but remove geography as a requirement for understanding the article.
- `windows-11-100-disk-usage-causes-solutions` has a global troubleshooting subject; review its description and CTA for local commercial language without weakening safe diagnostic advice.
- Chicago in the IBM article is legitimate event/location context, not local SEO targeting.
- The registry uses `contentType` for blog/guide/news IA and `isGlobalGuide` as a separate editorial signal. Do not mechanically change contentType or set flags without checking downstream rendering, related-content, structured-data and listing logic.
- Blog records may contain local CTAs or local references in richContent, FAQs, metadata, tags, images/captions and related links; review the full record, not only title/excerpt.
- The working scope is based on the 20 supplied/identified URLs. Reconcile it against live /blog, /news and /guides listings, the route graph and sitemap before claiming it is a complete site-wide inventory.

## Implementation sequence (safe)
1. Reconcile all 20 URLs against live listings, route registrations, graph entries, sitemap and prerendered output. Include the standalone Intel comparison route.
2. Pull Google Search Console page/query data for each existing URL (clicks, impressions, CTR, position, indexing); prioritize edits based on evidence, without inventing or assuming performance.
3. For each GLOBAL article, edit only genuinely local targeting: title/SEO title/description, intro/body, CTA, FAQs, tags and related links. Retain technical accuracy, author/reviewer trust, images, structured data and useful regional facts.
4. Keep genuinely Kuwait-specific articles local; do not force global framing onto climate, market or service-specific topics.
5. Preserve existing URLs/canonicals. Retire/merge only with evidence, a replacement target, explicit redirect mapping, graph/SSG/sitemap updates and validation.
6. Run repository checks and production smoke tests before deployment. Do not deploy or trigger Vercel from this audit branch.

## Acceptance criteria
- Global editorial pages answer the intended problem/query without requiring Kuwait context.
- No fake local availability or service claims; KCROC repair CTA is secondary and geographically transparent.
- Legacy URL slugs and canonical paths remain unchanged.
- Standalone routes and registry-driven articles are both covered.
- Graph/SSG, route registrations and sitemap behavior remain intact unless an approved migration explicitly changes them.
- No invented GSC metrics, tests, or deployment claims.
- News is not mislabeled as a how-to guide solely to gain global classification.
