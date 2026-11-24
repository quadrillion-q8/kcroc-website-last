# KCROC Premium Contextual Editorial Layout System

## Permanent editorial standard

Use section-aligned visuals, not a permanent empty sidebar. Desktop contextual sections use an approximately 70/30 text/image split; narrow layouts stack images below their relevant text. Sections without suitable visuals use the normal reading canvas. Use logical inline direction for RTL. Keep tables and code independently scrollable. The table of contents must remain accessible and supplementary navigation follows the article.

Only use explicit, technically relevant image assignments. Prefer authorized KCROC repair photography, or properly sourced diagrams and screenshots. Never invent customer cases or use unrelated filler. Do not reuse the same photograph on one page (including alternate crops or filenames); responsive variants are not separate placements. Use descriptive localized alt text, useful captions, optimized assets, lazy loading below the fold and reserved image space. Do not change canonical URLs, headings/anchors, SEO metadata, schema, local/global intent or conversion destinations for layout-only changes.

## Implementation scope

The shared BlogPostTemplate now applies this system to its rich-content blog, guide and news routes, including automatic promotion of a single trailing authored figure within an H2 section. The temperature guide has three additional curated existing gallery assets and one relocated authored figure. Other pages receive a pair only where an existing figure meets that rule or explicit curated assignments are added. Separate standalone guides, Arabic articles and pillar templates require an individual content-aware integration; do not claim those are migrated yet.

## Verification

Run the SSG regression check as part of the production build. For visual acceptance, run the browser audit against a preview at desktop and mobile widths, check the four temperature sections, image alignment, no horizontal page overflow, anchors, captions, and no duplicate images. Review each new curated asset visually before production. 
