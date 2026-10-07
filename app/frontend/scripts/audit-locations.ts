// File: app/frontend/scripts/audit-locations.ts
//
// Local Location Quality System — audits every /location/:slug page straight
// from KCROC_GRAPH (the same data LocationDeepTemplate.tsx renders), so the
// score can never drift from what is actually on the page.
//
// Run:   npx tsx scripts/audit-locations.ts
// GSC:   npx tsx scripts/audit-locations.ts --gsc ./Pages.csv   (Search Console "Pages" export)
// Output: stdout table + reports/location-audit.md + reports/location-audit.csv
//
// This is a TRIAGE tool, not a ranking signal. It measures what the graph can
// measure. Real evidence (case studies, local reviews, local photos) is scored
// only when it genuinely exists in the graph — nothing is invented.
import fs from 'node:fs';
import path from 'node:path';
import { KCROC_GRAPH } from '../src/data/graph.js';

// ── Config ────────────────────────────────────────────────────────────────
// Tier B = major service hubs (edit freely). Everything else non-physical = Tier C.
const TIER_B = new Set([
  'salmiya', 'kuwait-city', 'farwaniya', 'jahra', 'ahmadi', 'fahaheel',
  'mangaf', 'jabriya', 'mubarak-al-kabeer', 'fintas', 'sabah-al-salem',
]);

// Must mirror LocationDeepTemplate.tsx: the shared FAQ block rendered on every
// service-area page (4 universal questions: shop, pickup, cost, turnaround).
const GENERIC_FAQ_COUNT = 4;

// Arabic pages wired up in LocationDeepTemplate.tsx (ARABIC_LOCATION_PAGES) —
// the audit also reads seo.alternates['ar-KW'] from the graph.
const ARABIC_SLUGS_IN_TEMPLATE = new Set(['salmiya', 'farwaniya', 'kuwait-city']);

// ── Types ─────────────────────────────────────────────────────────────────
type Loc = (typeof KCROC_GRAPH.locations)[number];
interface Factor { name: string; max: number; got: number; note: string }
interface Row {
  slug: string; title: string; tier: 'A' | 'B' | 'C';
  score: number; evidencePts: number; factors: Factor[];
  weakest: string; priority: string; action: string;
  introSim: number; localFaqs: number; genericFaqs: number; localFaqShare: number;
  inbound: number; hasCase: boolean; hasReview: boolean; hasArabic: boolean;
  gsc?: { clicks: number; impressions: number; position: number };
}

// ── Helpers ───────────────────────────────────────────────────────────────
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9\u0600-\u06ff\s]/g, ' ').replace(/\s+/g, ' ').trim();

/** Word-trigram set with all place names removed, so "Salmiya" vs "Jahra" can't hide templating. */
function shingles(text: string, placeNames: string[]): Set<string> {
  let t = norm(text);
  for (const p of placeNames.map(norm).filter(Boolean)) t = t.split(p).join(' ');
  const w = t.split(' ').filter(Boolean);
  const out = new Set<string>();
  for (let i = 0; i + 2 < w.length; i++) out.add(`${w[i]} ${w[i + 1]} ${w[i + 2]}`);
  return out;
}
function jaccard(a: Set<string>, b: Set<string>): number {
  if (!a.size || !b.size) return 0;
  let inter = 0;
  for (const x of a) if (b.has(x)) inter++;
  return inter / (a.size + b.size - inter);
}
const setKey = (ids: string[] = []) => [...ids].sort().join('|');
const scale = (v: number, full: number, max: number) => Math.round(Math.min(1, v / full) * max * 10) / 10;

function parseArgs() {
  const i = process.argv.indexOf('--gsc');
  return { gscPath: i > -1 ? process.argv[i + 1] : undefined };
}

/** Tolerant parser for a Search Console "Pages" CSV export (Top pages, Clicks, Impressions, CTR, Position). */
function loadGsc(file?: string): Map<string, { clicks: number; impressions: number; position: number }> {
  const map = new Map<string, { clicks: number; impressions: number; position: number }>();
  if (!file || !fs.existsSync(file)) return map;
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/).filter(Boolean);
  const split = (l: string) => l.match(/("([^"]|"")*"|[^,]*)(,|$)/g)?.map((c) => c.replace(/,$/, '').replace(/^"|"$/g, '').replace(/""/g, '"')) ?? [];
  const head = split(lines[0]).map((h) => h.toLowerCase());
  const col = (re: RegExp) => head.findIndex((h) => re.test(h));
  const [cu, cc, ci, cp] = [col(/page|url/), col(/click/), col(/impression/), col(/position/)];
  for (const l of lines.slice(1)) {
    const c = split(l);
    const url = (c[cu] ?? '').replace(/\/$/, '');
    if (!url) continue;
    map.set(url, {
      clicks: Number(c[cc] ?? 0) || 0,
      impressions: Number(c[ci] ?? 0) || 0,
      position: Number(c[cp] ?? 0) || 0,
    });
  }
  return map;
}

// ── Scoring ───────────────────────────────────────────────────────────────
function audit(): Row[] {
  const { gscPath } = parseArgs();
  const gsc = loadGsc(gscPath);
  const locs = KCROC_GRAPH.locations;
  const allEntities = Object.values(KCROC_GRAPH.entities) as any[];
  const serviceSets = locs.map((l) => ({ id: l.id, key: setKey(l.relatedServiceIds) }));
  const problemSets = locs.map((l) => ({ id: l.id, key: setKey(l.relatedProblemIds) }));
  const imageUse = new Map<string, number>();
  for (const l of locs) if (l.contentImage?.src) imageUse.set(l.contentImage.src, (imageUse.get(l.contentImage.src) ?? 0) + 1);

  const base = (KCROC_GRAPH.business as any)?.websiteUrl ?? '';
  const rows: Row[] = [];

  for (const l of locs) {
    const isPhysical = !!l.isPhysicalLocation;
    const tier: Row['tier'] = isPhysical ? 'A' : TIER_B.has(l.slug) ? 'B' : 'C';
    const nearby = l.serviceAreas.filter((a) => a !== l.title);

    // 1. Unique local intro (10) — present, substantial, and not a template clone of a sibling
    let maxSim = 0;
    for (const o of locs) {
      if (o.id === l.id) continue;
      maxSim = Math.max(maxSim, jaccard(introShingles(l.id), introShingles(o.id)));
    }
    const introLen = (l.localIntro ?? '').length;
    let intro = introLen >= 250 ? 10 : introLen >= 120 ? 7 : introLen > 0 ? 4 : 0;
    if (maxSim > 0.4) intro = Math.max(0, intro - 4);
    else if (maxSim > 0.25) intro = Math.max(0, intro - 2);

    // 2. Local neighbourhoods (8)
    const hood = scale(nearby.length, 3, 8);

    // 3. Location-specific services (10) — 3+ services AND set not identical to a sibling
    const sKey = setKey(l.relatedServiceIds);
    const sDup = serviceSets.filter((s) => s.id !== l.id && s.key === sKey && sKey).length;
    const svc = (l.relatedServiceIds?.length ?? 0) === 0 ? 0 : Math.max(0, scale(l.relatedServiceIds.length, 3, 10) - (sDup > 0 ? 5 : 0));

    // 4. Location-specific problems (8)
    const pKey = setKey(l.relatedProblemIds);
    const pDup = problemSets.filter((s) => s.id !== l.id && s.key === pKey && pKey).length;
    const prob = (l.relatedProblemIds?.length ?? 0) === 0 ? 0 : Math.max(0, scale(l.relatedProblemIds.length, 2, 8) - (pDup > 0 ? 4 : 0));

    // 5. Unique local FAQs (12) — target 5+ genuinely local
    const nLocalFaq = (l.localFaqs ?? []).length;
    const faq = isPhysical ? 12 : scale(nLocalFaq, 5, 12);

    // 6. Real local evidence (15): case study 10 + location-tagged review 5
    const hasCase =
      (l.relatedCaseStudyIds ?? []).length > 0 ||
      KCROC_GRAPH.caseStudies.some((c) => c.locationId === l.id || c.location === l.title);
    const hasReview = !!KCROC_GRAPH.reviews?.items?.some((r: any) => r.location === l.title);
    const evidence = (hasCase ? 10 : 0) + (hasReview ? 5 : 0);

    // 7. Real local photo evidence (10) — only a location-unique image earns full marks
    const img = l.contentImage?.src;
    const photo = !img ? 0 : isPhysical ? 10 : (imageUse.get(img) ?? 0) === 1 ? 7 : 3;

    // 8. Hawalli-lab relationship (8) — the template states it on every page; copy that says it earns full marks
    const labClear = isPhysical || /hawalli/i.test(`${l.localIntro ?? ''} ${l.description ?? ''}`) ? 8 : 5;

    // 9. Arabic counterpart (5)
    const alt = (l as any).seo?.alternates ?? {};
    const hasArabic = !!alt['ar-KW'] || ARABIC_SLUGS_IN_TEMPLATE.has(l.slug);

    // 10. Internal links (5) — inbound relatedLocationIds from other graph entities
    const inbound = allEntities.filter((e) => e.id !== l.id && Array.isArray(e.relatedLocationIds) && e.relatedLocationIds.includes(l.id)).length;
    const links = scale(inbound, 5, 5);

    // 11. Local CTA (5) — WhatsApp CTA is built from business.telephone, location-aware message
    const cta = (KCROC_GRAPH.business as any)?.telephone ? 5 : 0;

    const factors: Factor[] = [
      { name: 'Unique local intro', max: 10, got: intro, note: `${introLen} chars, max sibling similarity ${(maxSim * 100).toFixed(0)}%` },
      { name: 'Local areas', max: 8, got: hood, note: `${nearby.length} nearby areas` },
      { name: 'Local services', max: 10, got: svc, note: `${l.relatedServiceIds?.length ?? 0} linked${sDup ? `, same set as ${sDup} other page(s)` : ''}` },
      { name: 'Local problems', max: 8, got: prob, note: `${l.relatedProblemIds?.length ?? 0} linked${pDup ? `, same set as ${pDup} other page(s)` : ''}` },
      { name: 'Unique local FAQs', max: 12, got: faq, note: `${nLocalFaq} local vs ${isPhysical ? 'dedicated page' : GENERIC_FAQ_COUNT + ' generic'}` },
      { name: 'Real local evidence', max: 15, got: evidence, note: `${hasCase ? 'case study' : 'no case study'}, ${hasReview ? 'local review' : 'no local review'}` },
      { name: 'Local photo', max: 10, got: photo, note: img ? ((imageUse.get(img) ?? 0) > 1 ? 'shared image' : 'unique image') : 'no image' },
      { name: 'Hawalli-lab clarity', max: 8, got: labClear, note: '' },
      { name: 'Arabic counterpart', max: 5, got: hasArabic ? 5 : 0, note: hasArabic ? 'yes' : 'none' },
      { name: 'Internal links', max: 5, got: links, note: `${inbound} inbound graph links` },
      { name: 'Local CTA', max: 5, got: cta, note: '' },
    ];
    // Two numbers, on purpose: Content score (what we can write today, /100) and
    // Evidence points (real cases/reviews/photos, /25). Evidence can't be manufactured,
    // so it must not drag a page's content score down or trigger "consolidate" by itself.
    const EVIDENCE_FACTORS = new Set(['Real local evidence', 'Local photo']);
    const contentFactors = factors.filter((f) => !EVIDENCE_FACTORS.has(f.name));
    const contentMax = contentFactors.reduce((s, f) => s + f.max, 0);
    const score = isPhysical ? 0 : Math.round((contentFactors.reduce((s, f) => s + f.got, 0) / contentMax) * 100);
    const evidencePts = Math.round(factors.filter((f) => EVIDENCE_FACTORS.has(f.name)).reduce((s, f) => s + f.got, 0));

    // Biggest weakness = largest points gap (ignoring factors the template guarantees)
    const gap = [...contentFactors].sort((a, b) => (b.max - b.got) - (a.max - a.got))[0];
    const weakest = gap.max - gap.got <= 0.5 ? '—' : gap.name;

    const g = gsc.get(`${base}/location/${l.slug}`);
    let priority: string, action: string;
    if (isPhysical) { priority = 'Maintain'; action = 'Dedicated page (HawalliLocationPage.tsx) — not scored on the service-area rubric; keep photos, reviews and cases real and fresh'; }
    else if (score >= 85) { priority = 'Maintain'; action = evidencePts < 10 ? 'Content solid — add a real case/review when one exists' : 'Maintain'; }
    else if (score >= 70) { priority = tier === 'B' ? 'High' : 'Medium'; action = 'Upgrade: ' + weakest; }
    else if (score >= 55) { priority = 'High'; action = 'Substantial rewrite: ' + weakest; }
    else {
      priority = 'Review';
      action = g && g.impressions > 50
        ? 'Rewrite — GSC shows demand'
        : g ? 'Consider consolidating (301) — low GSC demand' : 'Check GSC before rewriting or consolidating (301)';
    }

    rows.push({
      slug: l.slug, title: l.title, tier, score, evidencePts, factors, weakest, priority, action,
      introSim: maxSim, localFaqs: nLocalFaq, genericFaqs: isPhysical ? 0 : GENERIC_FAQ_COUNT,
      localFaqShare: isPhysical ? 1 : nLocalFaq / Math.max(1, nLocalFaq + GENERIC_FAQ_COUNT),
      inbound, hasCase, hasReview, hasArabic, gsc: g,
    });
  }

  function introShingles(id: string) { return introShingles_cache.get(id) ?? new Set<string>(); }
  return rows.sort((a, b) => (a.tier.localeCompare(b.tier)) || a.score - b.score);
}
const introShingles_cache = new Map<string, Set<string>>();

// ── Output ────────────────────────────────────────────────────────────────
function render(rows: Row[]) {
  const hasGsc = rows.some((r) => r.gsc);
  const head = ['Location', 'Tier', 'Content score', 'Evidence /25', 'Local FAQs', 'Intro sim.', 'Case/Review', 'AR', 'Inbound', ...(hasGsc ? ['GSC imp.', 'GSC pos.'] : []), 'Biggest weakness', 'Priority', 'Action'];
  const line = (r: Row) => [
    r.title, r.tier, r.tier === 'A' ? 'n/a' : String(r.score), String(r.evidencePts), r.tier === 'A' ? 'dedicated page' : `${r.localFaqs} (${Math.round(r.localFaqShare * 100)}%)`, r.tier === 'A' ? 'n/a' : `${Math.round(r.introSim * 100)}%`,
    `${r.hasCase ? 'case' : '–'}/${r.hasReview ? 'review' : '–'}`, r.hasArabic ? 'yes' : 'no', String(r.inbound),
    ...(hasGsc ? [r.gsc ? String(r.gsc.impressions) : 'n/a', r.gsc ? r.gsc.position.toFixed(1) : 'n/a'] : []),
    r.tier === 'A' ? '—' : r.weakest, r.priority, r.action,
  ];
  const md = [
    `# KCROC Location Audit`, '', `Generated ${new Date().toISOString().slice(0, 10)} from KCROC_GRAPH — ${rows.length} locations.`, '',
    `Content score (/100) rates what can be written today. Evidence (/25) counts only real case studies, location-tagged reviews and location-unique photos found in the graph — never invented. Both are triage signals, not ranking signals.`, '',
    `| ${head.join(' | ')} |`, `|${head.map(() => '---').join('|')}|`, ...rows.map((r) => `| ${line(r).join(' | ')} |`), '',
    '## Score distribution', '',
    ...(['85-100 Maintain', '70-84 Upgrade', '55-69 Rewrite', '<55 Review'] as const).map((b) => {
      const [lo, hi] = b.startsWith('85') ? [85, 101] : b.startsWith('70') ? [70, 85] : b.startsWith('55') ? [55, 70] : [-1, 55];
      const n = rows.filter((r) => r.tier !== 'A' && r.score >= lo && r.score < hi).length;
      return `- ${b}: ${n} page(s)`;
    }), '',
    '## Factor detail (8 lowest content scores, non-Hawalli)', '',
    ...rows.filter((r) => r.tier !== 'A').slice(0, 8).flatMap((r) => [
      `### ${r.title} — content ${r.score}/100, evidence ${r.evidencePts}/25`,
      ...r.factors.map((f) => `- ${f.name}: ${f.got}/${f.max}${f.note ? ` (${f.note})` : ''}`), '',
    ]),
  ].join('\n');

  const csv = [head.join(','), ...rows.map((r) => line(r).map((c) => `"${c.replace(/"/g, '""')}"`).join(','))].join('\n');
  const dir = path.resolve(process.cwd(), 'reports');
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'location-audit.md'), md);
  fs.writeFileSync(path.join(dir, 'location-audit.csv'), csv);

  console.log(`\n${head.join(' | ')}`);
  rows.forEach((r) => console.log(line(r).join(' | ')));
  console.log(`\n✅ Wrote reports/location-audit.md and reports/location-audit.csv`);
}

// Pre-compute shingles once (kept outside audit() so the helper above stays pure).
{
  const placeNames = KCROC_GRAPH.locations.flatMap((l) => [l.title, ...l.serviceAreas]);
  for (const l of KCROC_GRAPH.locations) introShingles_cache.set(l.id, shingles(l.localIntro ?? '', placeNames));
}
render(audit());
