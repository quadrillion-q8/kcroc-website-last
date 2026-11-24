// KCROC global FAQ accessibility/visual regression gate.
// Opted-in FAQ cards across EN + ar-KW templates; does not affect non-FAQ
// disclosures (TOCs/diagnostics) or the pricing matrix.
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('src');
const read = (p) => readFile(path.join(root,p),'utf8');
const css = await read('index.css');
assert.ok(css.includes('KCROC GLOBAL FAQ SURFACE CONTRACT'), 'FAQ shared style policy is missing');
function token(k) {
  const r = css.match(new RegExp('--kcroc-faq-' + k + ':\\s*(#[a-f0-9]{6})\\s*;', 'i'));
  assert.ok(r, 'Missing FAQ token: ' + k);
  return r[1];
}
function luminance(hex) {
  const vals = [1, 3, 5].map(i=>parseInt(hex.slice(i,i+2),16)/255);
  const linear = vals.map(v=>v<=0.04045?v/12.92:((v+0.055)/1.055)**2.4);
  return linear[0]*0.2126 + linear[1]*0.7152 + linear[2]*0.0722;
}
function ratio(a,b) {
  const x=luminance(a),y=luminance(b);
  return (Math.max(x,y)+.05)/(Math.min(x,y)+.05);
}
const contrasts = [
  ['FAQ question on white','ink','surface',4.5],
  ['FAQ answer on white','muted','surface',4.5],
  ['FAQ question when open','ink','open',4.5],
  ['FAQ answer when open','muted','open',4.5],
  ['FAQ icon on white','copper','surface',3],
  ['FAQ card border on white','line','surface',3],
];
for(const [name,fg,bg,minimum] of contrasts) {
  const actual=ratio(token(fg),token(bg));
  assert.ok(actual>=minimum, name+': '+actual.toFixed(2)+':1 below '+minimum+':1');
}
for(const marker of [
  '#main-content[data-page-type] [data-kcroc-faq-item]',
  '#main-content[data-page-type] [data-kcroc-faq-list]',
  '[data-kcroc-faq-item]:hover',
  '[data-kcroc-faq-item]:has(button[aria-expanded="true"])',
  'summary::-webkit-details-marker',
  '#main-content[data-site-locale="ar"]',
  'focus-visible',
  'prefers-reduced-motion'
]) assert.ok(css.includes(marker), 'FAQ shared CSS guard missing '+marker);
const templates = [
  'components/home/FAQSection.tsx',
  'pages/FAQ.tsx',
  'pages/LocationDeepTemplate.tsx',
  'pages/HawalliLocationPage.tsx',
  'pages/ArabicHawalliLocationPage.tsx',
  'pages/ArabicLocationPage.tsx',
  'pages/templates/ServiceTemplate.tsx',
  'pages/templates/ProblemTemplate.tsx',
  'pages/templates/BrandTemplate.tsx',
  'pages/templates/ArabicBrandContent.tsx',
  'pages/BlogPostTemplate.tsx',
  'pages/NearMe.tsx',
  'pages/NearMeAR.tsx',
  'pages/Services.tsx',
  'pages/Pricing.tsx',
  'pages/ArabicPricingPage.tsx',
  'pages/ComputerRepairKuwait.tsx',
  'pages/BookingPage.tsx',
  'pages/ArabicBookingPage.tsx',
  'pages/Contact.tsx',
  'pages/ArabicContactPage.tsx',
  'pages/MacBookBatteryReplacementPage.tsx',
  'pages/GamingPCCooling.tsx',
  'pages/BatteryHealthGuide.tsx',
  'pages/BiosUefiRecoveryGuide.tsx',
  'pages/GamingLaptopCleaningAR.tsx',
  'pages/LaptopOverheatingGuide.tsx',
  'pages/BiosUefiRecoveryGuideAR.tsx',
  'pages/Windows10EndOfSupportGuide.tsx',
  'pages/IntelVsAmdGuide.tsx',
  'pages/DellLaptopOverheatingPageAR.tsx',
  'pages/ArabicLiquidDamageRepairPage.tsx',
  'pages/ArabicChargingTroubleshootingPage.tsx',
  'pages/BlogLaptopRepair.tsx',
  'pages/LaptopBuyingGuide.tsx',
  'pages/ArabicProblemPage.tsx',
  'pages/ArabicCommercialPage.tsx',
  'pages/DellLaptopOverheatingPage.tsx',
  'pages/ArabicFAQ.tsx',
  'pages/GameBarPresenceWriterGuide.tsx',
  'pages/LaptopBuyingGuideAR.tsx',
];
const files = await Promise.all(templates.map(async name => [name,await read(name)]));
for(const [name,body] of files) {
  assert.ok(body.includes('data-kcroc-faq-item="true"'), name+': FAQ opt-in styling marker absent');
}
const byName=Object.fromEntries(files);
const expectedMultiple={
  'pages/LocationDeepTemplate.tsx': 2,
  'pages/templates/ServiceTemplate.tsx': 2,
  'pages/BlogPostTemplate.tsx': 2,
  'pages/ArabicCommercialPage.tsx': 4,
};
for(const [name,n] of Object.entries(expectedMultiple)) {
  assert.ok(byName[name].split('data-kcroc-faq-item="true"').length-1>=n, name+': missing FAQ variants');
}
const city=byName['pages/LocationDeepTemplate.tsx'];
assert.ok(!city.includes('open={index < 3}'), 'Kuwait City FAQs must not auto-expand');
assert.ok(city.includes('data-kuwait-city-faq="true"'), 'Kuwait City FAQ static inventory changed');
const hawalli=byName['pages/HawalliLocationPage.tsx'];
assert.ok(!/open\s*\n\s*data-hawalli-faq-item/.test(hawalli), 'Hawalli FAQs must start collapsed');
assert.ok(hawalli.includes('data-hawalli-faq-answer="true"'), 'Hawalli pre-rendered answer marker missing');
const ar=byName['pages/ArabicCommercialPage.tsx'];
assert.ok(!ar.includes("open={slug === 'laptop-charging-port-repair-kuwait'}"), 'Arabic charging-port FAQ auto-expansion regression');
const blog=byName['pages/BlogPostTemplate.tsx'];
const toc = blog.match(/<details\b[^>]*\bdata-kcroc-article-toc="true"[^>]*>[\s\S]*?<\/details>/g) ?? [];
assert.equal(toc.length, 1, 'Shared article TOC must remain a single separate non-FAQ disclosure');
assert.ok(/<summary\b[^>]*>[\s\S]*?On This Page[\s\S]*?<\/summary>/.test(toc[0]), 'Article TOC must keep its native accessible summary');
assert.ok(!/data-kcroc-faq-(?:item|list)\b/.test(toc[0]), 'Never restyle article TOC controls as FAQ cards');
assert.ok(/<ol\b/.test(toc[0]) && /href=\{\x60#\$\{h\.id\}\x60\}/.test(toc[0]), 'Article TOC must keep ordered heading anchor links');
assert.ok(!/\blg:hidden\b/.test(toc[0]), 'Shared article TOC must remain available on desktop');
console.log('✅ Global FAQ design policy passed: '+contrasts.length+' measured contrast pairs and '+templates.length+' page/component templates checked.');
console.log('   Full SSG, SEO/FAQ schema and keyboard/viewport checks still apply.');
