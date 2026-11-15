# KCROC Blog Editorial Audit — Global Strategy
Date: 2026-11-15
Repository: quadrillion-q8/kcroc-website-last
Scope: BLOG_POSTS inventory and editorial direction. This is an audit/decision document, not a content rewrite.

## Editorial policy
- Guides and evergreen technical blog posts should solve problems for an international audience by default.
- News should cover internationally relevant technology developments; preserve regional context only when it materially changes the story.
- Local Kuwait articles remain local when the climate, market, service availability, pricing, or customer context is genuinely Kuwait-specific.
- Keep KCROC author/technical-review credibility. Avoid repeated Kuwait references, local sales CTAs, workshop details, pickup claims, or local keywords in global editorial content.
- Relevant KCROC service links may appear naturally and unobtrusively where professional repair is an appropriate next step.
- Do not change existing URLs/slugs, canonical strategy, graph/SSG, route registrations, or sitemap behavior without a separate migration case.

## Inventory and first-pass decisions
The current source registry `app/frontend/src/constants/blogPosts.ts` contains 12 BLOG_POSTS records. These are all global editorial candidates based on their subject matter:

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

## Findings
- Four gaming troubleshooting slugs include the legacy `-kuwait` suffix although the topics are globally useful. Preserve all current paths; do not rename slugs or introduce redirects in this editorial pass.
- Chicago in the IBM article is legitimate event/location context, not local SEO targeting.
- The registry uses `contentType` for blog/guide/news IA and `isGlobalGuide` as a separate editorial signal. Do not mechanically change contentType or set flags without checking downstream rendering, related-content, structured-data and listing logic.
- Blog records may contain local CTAs or local references in richContent, FAQs, metadata, tags, images/captions and related links; review the full record, not only title/excerpt.
- The current registry inventory does not equal the live index count automatically; routes, redirects, standalone pages, news/guide content and publication state must be reconciled.

## Implementation sequence (safe)
1. Compare the source inventory with live /blog, /news and /guides listings, route graph and sitemap.
2. Pull Google Search Console page/query data for each existing URL (clicks, impressions, CTR, position, indexing); classify performance before deciding retire/merge.
3. For each GLOBAL article, edit only genuinely local targeting: title/SEO title/description, intro/body, CTA, FAQs, tags and related links. Retain technical accuracy, author/reviewer trust, images, structured data and useful local facts.
4. Keep genuinely Kuwait-specific articles local; do not force global framing onto climate, market or service-specific topics.
5. Retire/merge only with evidence, a replacement target, explicit redirect mapping, graph/SSG/sitemap updates and validation.
6. Run repository checks and production smoke tests before deployment. Do not deploy or trigger Vercel from this audit branch.

## Acceptance criteria
- Global editorial pages answer the intended problem/query without requiring Kuwait context.
- No fake local availability or service claims; KCROC repair CTA is secondary and geographically transparent.
- Existing URLs/canonicals and graph/SSG behavior are preserved unless an approved migration explicitly changes them.
- No invented GSC metrics, tests, or deployment claims.
- News is not mislabeled as a how-to guide solely to gain global classification.
