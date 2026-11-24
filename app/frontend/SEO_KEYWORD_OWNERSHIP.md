# KCROC Kuwait keyword ownership — Phase 8.2

Baseline: GSC Kuwait web results, Oct 21–Nov 17, 2026. Property impressions 8,229, clicks 238, CTR 2.89%; Arabic query فني كمبيوتر 862 impressions and 2 clicks. Page/query dimensions do not sum to property totals.

## Primary routing
- / — national English computer repair and brand trust.
- /computer-repair-kuwait — repair-service selection, PC/laptop/MacBook repair hub.
- /ar — national Arabic technician intent: فني كمبيوتر في الكويت.
- /ar/computer-repair-kuwait — national Arabic repair services: تصليح كمبيوتر ولابتوب.
- /ar/computer-repair-hawalli — local Hawalli intent, walk-in lab and pickup.
- /ar/near-me — proximity/pickup intent (never imply on-site repair).
- /laptop-repair-kuwait and /ar/laptop-repair-kuwait — laptop repair intent.
- Screen and battery canonical service pages retain their distinct intents and qualified labor-only prices.
- Brand pages: independent repair, no authorization claims. Location pages: Hawalli is the only physical lab.

Use natural anchors in the user's language; do not redirect/noindex healthy alternate pages purely because a query appears for multiple URLs. Track exact query-page pairs and CTR with equal date windows after recrawl. No ranking or conversion promises. Keep all canonical URLs, reciprocal hreflang, prices, UI and strict image uniqueness unchanged.

The GSC-indexed malformed /& path declared / as canonical but Google selected /&. Add an exact permanent redirect to /; confirm production HTTP behavior separately. Do not create a sitemap entry. No broad catch-all redirects.

## November 2026 core-update stabilization (2026-11-24)

Google announced a global, all-language core update on November 10: https://status.search.google.com/incidents/WLxcJyC6jMWMfryxsKMc . Follow https://developers.google.com/search/docs/appearance/core-updates : confirm completion, allow at least one full week afterward, then compare a finalized seven-day window with a pre-rollout week (November 3–9). Search Console dates are Pacific Time. Do not treat an estimated completion date as an announcement.

### Recovery baseline (GSC, Web, November 6–12 vs November 15–21, 2026)

| Metric | Before | After |
|---|---:|---:|
| Worldwide property impressions (country totals) | 13,571 | 11,013 |
| Worldwide clicks | 149 | 150 |
| Kuwait impressions | 2,147 | 1,903 |
| Kuwait clicks | 58 | 48 |
| Kuwait position | 6.1 | 6.3 |
| Arabic Hawalli page, Kuwait impressions | 272 | 159 |
| Arabic Hawalli page, Kuwait position | 8.8 | 8.8 |
| English homepage, Kuwait impressions | 345 | 339 |
| English homepage, Kuwait position | 5.0 | 4.1 |

Non-Kuwait markets account for 2,314 of the 2,558 net lost impressions (90.5%). Global visibility is not a substitute for Kuwait repair demand. Do not infer revenue loss without conversion measurements. Query/page rows can overlap and omit anonymized queries; do not sum them into property totals.

The exact Arabic query فني كمبيوتر moved from 288 to 215 Kuwait property impressions while position improved from 4.3 to 3.7. Its English homepage query-page impressions remained 159 to 158, Arabic Hawalli 164 to 74, Arabic national hub 11 to 21. Multiple ranking URLs alone do not prove harmful cannibalization. Preserve the primary routing above, including the existing /ar technician-intent owner and /ar/computer-repair-kuwait repair-intent owner; do not retarget them solely to chase this short window.

Google URL Inspection on November 24 found all ten tested key URLs indexed, crawl allowed and Google-selected canonicals matching declared canonicals. The historical malformed /& record still selects /& and was last crawled August 18, before the existing exact redirect. Keep the existing redirect and verify a production 301/308 plus eventual Google recrawl separately. Do not add another redirect.

### Change-control policy during rollout

- Preserve current approved commercial titles, H1s, canonical routes, reciprocal hreflang, pricing, conversion controls, visual design and service exclusions. Do not undo recent approved improvements simply because daily impressions fluctuate.
- Allow independently verified technical fixes, accessibility, broken assets or links, factual corrections and truthful service descriptions. Use narrowly scoped PRs, existing build/SSG checks and production verification; avoid unrelated page rewrites.
- Audit the affected informational guides individually after stabilization, retaining established URLs and verifying technical facts against primary sources. Do not migrate them as an emergency response.
- Monitor finalized daily Kuwait clicks/impressions/CTR/position and rolling seven-day averages; compare exact query-page pairs for the two Arabic national pages, Hawalli twins and laptop repair twins. Track the English homepage separately.
- As diagnostic triggers (not Google thresholds): investigate a sustained 20%+ seven-day Kuwait click/impression decline, a material same-query position loss with adequate impressions, any failed URL inspection, or a verified conversion regression. Small samples require caution. Do not auto-edit content based on a trigger.
- Following official completion plus one full week, review against November 3–9, separately segment Kuwait commercial pages and international editorial URLs, check Google-selected canonicals and record recommended corrective changes before implementation. No ranking or recovery guarantee.

Sources: GSC via the KCROC OpenSEO project, finalized Web data for the stated windows; URL Inspection (November 24); GitHub PRs #268, #271, #273, #286 and #329. The rollout overlaps the decline but does not prove its cause.
