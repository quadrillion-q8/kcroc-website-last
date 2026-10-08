# Local Kuwait CTR/CTA changes (2026-10-09)

Verified: `tsc --noEmit` 0 errors; full `pnpm run build` passes (148 pages, SEO audit passed).
Copy the files in this zip over the same paths in your repo, commit, and let Vercel deploy.

## Titles / descriptions (graph.ts)
- Dell, HP, Lenovo, ASUS: "Service Center ... (Independent)" wording (descriptions say not brand-authorized)
- Screen and battery pages: "Replacement Cost ... From 30 / 8 KWD"
- /laptop-repair-kuwait: "Free Pickup, From 15 KWD" + opening hours in description
- /location/hawalli: "Open Till 10 PM" + address and hours in description
- 23 generic area pages: "Free Pickup, Open Till 10 PM"
- /ar/computer-repair-kuwait: new title so it no longer duplicates /ar/near-me (targets تصليح/صيانة كمبيوتر)

## Kuwait-only CTA (new KuwaitLocalCTA.tsx)
Shown only when browser timezone is Asia/Kuwait (or language ends -KW). Not in prerendered HTML.
Wired into BlogPostTemplate (all guides/blog/news), GameBarPresenceWriterGuide, Windows10EndOfSupportGuide.
Analytics: generate_lead events Kuwait_Local_CTA_WhatsApp / Kuwait_Local_CTA_Call with a placement param.

## Local trust line + head-term links
- LocationDeepTemplate and HawalliLocationPage: trust line under hero; exact-anchor links to
  /laptop-repair-kuwait and /computer-repair-kuwait above the final CTA
- Home ServiceAreas: same two links in the intro paragraph
