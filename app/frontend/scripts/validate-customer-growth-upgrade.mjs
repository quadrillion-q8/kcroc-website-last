import { readFile } from 'node:fs/promises';
import path from 'node:path';

const checks = [];
const add = (name, pass, detail = '') => checks.push({ name, pass, detail });
const read = (relative) => readFile(path.resolve('src', relative), 'utf8');

// Normalise formatting-only differences (quote style, whitespace, invisible Unicode)
// so cosmetic edits do not fail the build. The Arabic wording itself is still matched exactly.
const norm = (s) =>
  s
    .replace(/[​-‏‪-‮⁦-⁩﻿ـ]/g, '')
    .replace(/["`]/g, "'")
    .replace(/\s+/g, ' ');
const has = (source, needle) => norm(source).includes(norm(needle));

const [app, graph, seoProjection, locale, pricingPage, sitemap, hero, reviews, footer, nearMe, nearMeAr, locations, hawalli, computerRepair, about, booking, arabicCommercial, serviceAreas, englishPricing] = await Promise.all([
  read('App.tsx'),
  read('data/graph.ts'),
  read('data/seoGraph.generated.ts'),
  read('utils/locale.ts'),
  read('pages/ArabicPricingPage.tsx'),
  readFile(path.resolve('public/sitemap.xml'), 'utf8'),
  read('components/home/Hero.tsx'),
  read('components/home/Reviews.tsx'),
  read('core/components/layout/Footer.tsx'),
  read('pages/NearMe.tsx'),
  read('pages/NearMeAR.tsx'),
  read('pages/LocationDeepTemplate.tsx'),
  read('pages/HawalliLocationPage.tsx'),
  read('pages/ComputerRepairKuwait.tsx'),
  read('pages/About.tsx'),
  read('pages/BookingPage.tsx'),
  read('pages/ArabicCommercialPage.tsx'),
  read('components/home/ServiceAreas.tsx'),
  read('pages/Pricing.tsx'),
]);

const url = 'https://www.computerrepairkuwait.com/ar/pricing';
add('Arabic pricing route is registered', app.includes("path: 'ar/pricing'"));
add('Arabic pricing page exists and has a native Arabic H1', pricingPage.includes('export default function ArabicPricingPage') && pricingPage.includes('أسعار تصليح الكمبيوتر واللابتوب في الكويت'));
add('Arabic pricing SEO entity and canonical URL are present', graph.includes("id: 'page-ar-pricing'") && graph.includes(`canonicalUrl: '${url}'`));
add('Generated SEO projection contains the Arabic page', seoProjection.includes('"id": "page-ar-pricing"') && seoProjection.includes(`"canonicalUrl": "${url}"`));
add('English and Arabic pricing language switch is reciprocal', locale.includes("'/pricing': '/ar/pricing'") && locale.includes("'/ar/pricing': '/pricing'"));
add('Arabic pricing URL is in the checked-in sitemap', sitemap.includes(`<loc>${url}</loc>`));
add('Pricing hreflang alternates are reciprocal', graph.includes("'ar-KW': 'https://www.computerrepairkuwait.com/ar/pricing'") && graph.includes("'en-KW': 'https://www.computerrepairkuwait.com/pricing'"));
add('Homepage no longer displays a hard-coded review count', !hero.includes('reviewCount') && !hero.includes('+ reviews'));
add('Homepage review widget no longer prints a fixed count', !reviews.includes('reviewCount') && !reviews.includes('+ reviews'));
add('Homepage statistic strip uses service promises instead of unverified counters', graph.includes("label: 'Initial diagnosis', value: 'FREE'") && !graph.includes("value: '500+'"));
add('Commercial, footer, and local pages avoid printed fixed review counts', !footer.includes('reviewCount') && !nearMe.includes('reviewCount') && !nearMeAr.includes('reviewCount') && !locations.includes('reviewCount') && !hawalli.includes('reviewCount') && !computerRepair.includes('158+ reviews') && !computerRepair.includes('158+ customer reviews') && !arabicCommercial.includes('158+ مراجعة'));
add('Unverified customer/repair totals removed from sales copy', !about.includes("number: '500+'") && !booking.includes('500+ professionals') && !arabicCommercial.includes("['500+', 'جهاز تم إصلاحه']"));

// Arabic technician head term: split into three checks so a failure names the exact missing string.
const arTitle = 'فني كمبيوتر في الكويت | تصليح كمبيوتر ولابتوب';
const arH1 = 'فني كمبيوتر في الكويت لتصليح الكمبيوتر واللابتوب';
add('Arabic technician head term: page title in graph', has(graph, `title: '${arTitle}'`), `expected in src/data/graph.ts: title: '${arTitle}'`);
add('Arabic technician head term: SEO title in graph', has(graph, `title: 'فني كمبيوتر في الكويت | استلام وتوصيل مجاني | KCROC'`), `expected the Arabic title to lead with the technician term and pickup/delivery value proposition`);
add('Arabic technician head term: H1 on main Arabic commercial page', has(arabicCommercial, `h1: '${arH1}'`), `expected in src/pages/ArabicCommercialPage.tsx: h1: '${arH1}'`);
add('Arabic commercial FAQ explicitly states that repairs are workshop-only', arabicCommercial.includes('لا نقدم إصلاحًا داخل المنزل أو زيارة فني للموقع') && arabicCommercial.includes('مختبر KCROC في حولي'));
add('Arabic commercial phone CTA displays a Kuwait country code, not a stray currency symbol', arabicCommercial.includes('+965 {business.telephone.replace(') && !arabicCommercial.includes('                  ${business.telephone.replace'));

add('Arabic nearby page targets proximity intent and links to the main service page', graph.includes("title: 'تصليح كمبيوتر بالقرب منك في الكويت | استلام وتوصيل | KCROC'") && nearMeAr.includes('تصليح كمبيوتر ولابتوب') && nearMeAr.includes('to="/ar/computer-repair-kuwait"'));
add('Arabic hreflang projection matches homepage alternate', graph.includes("'en-KW': 'https://www.computerrepairkuwait.com/'") && seoProjection.includes('\"en-KW\": \"https://www.computerrepairkuwait.com/\"'));
add('Homepage hero exposes a tracked Arabic commercial link on mobile and desktop', (hero.match(/hero_arabic_computer_repair/g) || []).length === 2 && (hero.match(/to="\/ar\/computer-repair-kuwait"/g) || []).length === 2);
add('Homepage Arabic links distinguish technician and near-me intent', serviceAreas.includes("{ label: 'فني كمبيوتر في الكويت', path: '/ar/computer-repair-kuwait' }") && serviceAreas.includes("{ label: 'تصليح كمبيوتر بالقرب مني', path: '/ar/near-me' }"));
add('English pricing snippet leads with qualified starting labor prices', graph.includes('Laptop screen labor from 30 KWD + panel; battery labor from 8 KWD + battery') && seoProjection.includes('Laptop screen labor from 30 KWD + panel; battery labor from 8 KWD + battery'));
add('Pricing hero visibly shows qualified prices with relevant service links', englishPricing.includes('From 30 KWD + panel') && englishPricing.includes('From 8 KWD + battery') && englishPricing.includes('to="/ssd-ram-upgrade-kuwait"'));

add('Farwaniya service-area metadata is synchronized and does not imply a local walk-in branch', graph.includes("title: 'Laptop & Computer Repair Farwaniya | Free Pickup | KCROC'") && graph.includes("Laptop and PC repair for Farwaniya, Khaitan, Riggae, Ardiya and Jleeb Al-Shuyoukh. Free pickup to our Hawalli lab, clear quote before repair and 30-day warranty.") && graph.includes("'loc-farwaniya': { id: 'loc-farwaniya'") && graph.includes("isPhysicalLocation: false") && seoProjection.includes("Laptop & Computer Repair Farwaniya | Free Pickup | KCROC") && seoProjection.includes("Laptop and PC repair for Farwaniya, Khaitan, Riggae, Ardiya and Jleeb Al-Shuyoukh. Free pickup to our Hawalli lab, clear quote before repair and 30-day warranty."));
add('Laptop screen metadata targets repair intent and keeps labor separate from panel cost', graph.includes("title: 'Laptop Screen Repair Kuwait | Labor from 30 KWD | KCROC'") && graph.includes("Laptop screen repair for cracked, flickering, black or lined displays in Kuwait. Replacement labor from 30 KWD plus panel cost; free pickup, quote before repair and 30-day warranty.") && graph.includes("lastModified: '2026-10-16T00:00:00+03:00'") && seoProjection.includes("Laptop Screen Repair Kuwait | Labor from 30 KWD | KCROC") && seoProjection.includes("Laptop screen repair for cracked, flickering, black or lined displays in Kuwait. Replacement labor from 30 KWD plus panel cost; free pickup, quote before repair and 30-day warranty."));
add('HP metadata identifies common product families and body copy avoids unsupported regional failure comparisons', graph.includes("title: 'HP Laptop Repair Kuwait | Pavilion, EliteBook & OMEN | KCROC'") && graph.includes("Independent HP laptop repair in Kuwait for Pavilion, EliteBook, ProBook, Envy, OMEN and Victus. Free pickup, diagnosis first, quote before repair and 30-day warranty.") && graph.includes("HP laptops—from Pavilion and Envy to EliteBook, ProBook, OMEN and Victus—can develop charging, power, hinge, cooling, battery and display faults. KCROC checks the exact model and symptoms at the Hawalli workshop before recommending a repair.") && !graph.includes("more commonly than in other markets") && seoProjection.includes("HP Laptop Repair Kuwait | Pavilion, EliteBook & OMEN | KCROC"));
add('HP title and description clarify independent service in both SEO projection copies', graph.includes("title: 'HP Laptop Repair Kuwait | Independent Service | KCROC'") && graph.includes("Independent HP laptop repair in Kuwait for Pavilion, EliteBook, ProBook, Envy, OMEN and Victus. Free pickup, diagnosis first, quote before repair and a 30-day warranty.") && (seoProjection.match(/HP Laptop Repair Kuwait \| Independent Service \| KCROC/g) || []).length === 2 && (seoProjection.match(/Independent HP laptop repair in Kuwait for Pavilion, EliteBook, ProBook, Envy, OMEN and Victus\. Free pickup, diagnosis first, quote before repair and a 30-day warranty\./g) || []).length === 2);
add('Local SEO metadata dates reflect the refreshed Hawalli/Farwaniya and near-me pages', graph.includes("lastModified: '2026-10-16T00:00:00+03:00'") && graph.includes("lastModified: '2026-10-14T00:00:00+03:00'") && graph.includes("lastModified: '2026-10-15T00:00:00+03:00'") && seoProjection.includes('"lastModified": "2026-10-16T00:00:00+03:00"') && seoProjection.includes('"lastModified": "2026-10-15T00:00:00+03:00"'));

const arabicHawalli = await read('pages/ArabicHawalliLocationPage.tsx');
add('English and Arabic Hawalli language switch is reciprocal', locale.includes("'/location/hawalli': '/ar/computer-repair-hawalli'") && locale.includes("'/ar/computer-repair-hawalli': '/location/hawalli'"));
add('Dedicated Arabic Hawalli location route is registered and localized', app.includes("path: 'ar/computer-repair-hawalli'") && app.indexOf("path: 'ar/computer-repair-hawalli'") < app.indexOf("path: 'ar/:slug'") && arabicHawalli.includes('dir="rtl" lang="ar-KW"') && arabicHawalli.includes('DIRECTIONS_URL') && arabicHawalli.includes('FAQPage'));
add('Hawalli location metadata is synchronized between graph and SEO projection', graph.includes("title: 'Computer Repair Hawalli | Laptop, MacBook & PC | KCROC'") && graph.includes('Visit KCROC at Al Mullah Complex, Basement Shop 19, Hawalli. Laptop, MacBook, PC and motherboard repair daily 10 AM–10 PM. Free pickup across Kuwait.') && seoProjection.includes('Computer Repair Hawalli | Laptop, MacBook & PC | KCROC') && seoProjection.includes('Visit KCROC at Al Mullah Complex, Basement Shop 19, Hawalli. Laptop, MacBook, PC and motherboard repair daily 10 AM–10 PM. Free pickup across Kuwait.') && graph.includes("title: 'تصليح كمبيوتر حولي | فني لابتوب وموقع المختبر | KCROC'") && seoProjection.includes('تصليح كمبيوتر حولي | فني لابتوب وموقع المختبر | KCROC'));
add('Hawalli hero includes directions and case-study promotion requires consent/evidence', hawalli.includes("cta_name: 'hawalli_directions'") && hawalli.includes('c.customerConsent?.granted === true') && hawalli.includes('c.evidence.length > 0'));

for (const check of checks) console.log(`${check.pass ? '✅' : '❌'} ${check.name}${!check.pass && check.detail ? ` — ${check.detail}` : ''}`);
const failed = checks.filter((check) => !check.pass);
if (failed.length) process.exit(1);
console.log(`\n✅ Customer-growth regression checks passed (${checks.length} checks).`);
