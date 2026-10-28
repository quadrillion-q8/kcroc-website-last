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

const [app, graph, seoProjection, locale, pricingPage, sitemap, hero, reviews, footer, header, mobileMenu, stickyMobileCTA, navigationCompiler, rootLayout, nearMe, nearMeAr, locations, hawalli, computerRepair, about, booking, arabicCommercial, serviceAreas, englishPricing, serviceTemplate, brandTemplate, coreRepairPillars] = await Promise.all([
  read('App.tsx'),
  read('data/graph.ts'),
  read('data/seoGraph.generated.ts'),
  read('utils/locale.ts'),
  read('pages/ArabicPricingPage.tsx'),
  readFile(path.resolve('public/sitemap.xml'), 'utf8'),
  read('components/home/Hero.tsx'),
  read('components/home/Reviews.tsx'),
  read('core/components/layout/Footer.tsx'),
  read('core/components/layout/Header.tsx'),
  read('core/components/layout/MobileMenu.tsx'),
  read('components/home/StickyMobileCTA.tsx'),
  read('core/navigation/NavigationCompiler.ts'),
  read('core/components/layout/RootLayout.tsx'),
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
  read('pages/templates/ServiceTemplate.tsx'),
  read('pages/templates/BrandTemplate.tsx'),
  read('components/content/CoreRepairPillars.tsx'),
]);

const laptopGraphStart = graph.indexOf("'srv-laptop': {");
const laptopGraphEnd = graph.indexOf("'srv-desktop-pc': {", laptopGraphStart + 1);
const laptopServiceEntityForChecks =
  laptopGraphStart >= 0 && laptopGraphEnd > laptopGraphStart
    ? graph.slice(laptopGraphStart, laptopGraphEnd)
    : '';

const salmiyaGraphStart = graph.indexOf("'loc-salmiya': {");
const salmiyaGraphEnd = graph.indexOf("'loc-farwaniya': {", salmiyaGraphStart + 1);
const salmiyaEntity =
  salmiyaGraphStart >= 0 && salmiyaGraphEnd > salmiyaGraphStart
    ? graph.slice(salmiyaGraphStart, salmiyaGraphEnd)
    : '';

const relationshipsStart = graph.indexOf('const LOCATION_RELATIONSHIPS:');
const relationshipsEnd = graph.indexOf('const rawEntities = Object.values(rawGraphData.entities);', relationshipsStart + 1);
const locationRelationships =
  relationshipsStart >= 0 && relationshipsEnd > relationshipsStart
    ? graph.slice(relationshipsStart, relationshipsEnd)
    : '';
const salmiyaRelationshipStart = locationRelationships.indexOf('  salmiya: {');
const salmiyaRelationshipEnd = locationRelationships.indexOf("  'kuwait-city': {", salmiyaRelationshipStart + 1);
const salmiyaRelationship =
  salmiyaRelationshipStart >= 0 && salmiyaRelationshipEnd > salmiyaRelationshipStart
    ? locationRelationships.slice(salmiyaRelationshipStart, salmiyaRelationshipEnd)
    : '';

const url = 'https://www.computerrepairkuwait.com/ar/pricing';
const arabicHomeSource = await read('pages/ArabicLocalizedPages.tsx');
add('Arabic pricing route is registered', app.includes("path: 'ar/pricing'"));
add('Arabic pricing page exists and has a native Arabic H1', pricingPage.includes('export default function ArabicPricingPage') && pricingPage.includes('أسعار تصليح الكمبيوتر واللابتوب في الكويت'));
add('Arabic pricing SEO entity and canonical URL are present', graph.includes("id: 'page-ar-pricing'") && graph.includes(`canonicalUrl: '${url}'`));
add('Generated SEO projection contains the Arabic page', seoProjection.includes('"id": "page-ar-pricing"') && seoProjection.includes(`"canonicalUrl": "${url}"`));
add('High-impression page snippets stay concise in the canonical graph source',
  has(graph, "description: 'Laptop and computer repair in Kuwait from 15 KWD. Free pickup and delivery, a quote before work, and a 30-day warranty on completed repairs.'") &&
  has(graph, "description: 'Spot laptop battery failure with 15 warning signs, Windows and Mac health tests, swollen-battery safety advice, and replacement guidance.'") &&
  has(graph, "description: 'Fix GameBarPresenceWriter.exe and Xbox Game Bar capture issues causing Windows 11 stutter. Test the cause, adjust settings safely, and roll back.'") &&
  has(graph, 'description: "PC won’t boot after a BIOS/UEFI update? Learn to distinguish firmware corruption from RAM, power or motherboard faults and review safe recovery options."') &&
  has(graph, "title: 'Intel Core Ultra vs Ryzen AI: 2026 Laptop Guide | KCROC'"));
add('English and Arabic pricing language switch is reciprocal', locale.includes("'/pricing': '/ar/pricing'") && locale.includes("'/ar/pricing': '/pricing'"));

add('Laptop repair page has intent-matched symptom links to existing guides and services',
  graph.includes("symptomLinks: [") &&
  graph.includes("label: \"Laptop won't turn on\", path: '/laptop-wont-turn-on'") &&
  graph.includes("path: '/laptop-plugged-in-not-charging'") &&
  graph.includes("path: '/guides/why-is-my-laptop-so-hot'") &&
  serviceTemplate.includes("What is wrong with your laptop?"));

const laptopGuidesIndex = await read('pages/GuidesIndex.tsx');
add('Laptop repair resources distinguish the no-power repair page from the troubleshooting guide',
  has(graph, `label: "Laptop Won't Turn On: Troubleshooting Guide", path: '/guides/laptop-wont-turn-on'`) &&
  !has(graph, `label: "Laptop Won't Turn On? Complete Troubleshooting Guide", path: '/laptop-wont-turn-on'`) &&
  laptopGuidesIndex.includes("'guides/laptop-wont-turn-on'"));

add('Brand repair pages expose a direct link to transparent pricing',
  brandTemplate.includes('to="/pricing"') && brandTemplate.includes('View Repair Prices'));

add('Pricing page has responsive quick-jump navigation to all four price categories',
  englishPricing.includes('Jump to a price category') &&
  englishPricing.includes('href="#pricing-diagnostics"') &&
  englishPricing.includes('href="#pricing-thermal"') &&
  englishPricing.includes('href="#pricing-hardware"') &&
  englishPricing.includes('href="#pricing-motherboard"') &&
  englishPricing.includes('id={`pricing-${category.anchor}`}'));


add('Laptop hub consolidates repeated faults into structured Problem / Lab approach / Service cards',
  laptopServiceEntityForChecks.includes('problem:') &&
  laptopServiceEntityForChecks.includes('labFix:') &&
  laptopServiceEntityForChecks.includes('service:') &&
  laptopServiceEntityForChecks.includes("id: 'laptop-dead-no-power'") &&
  laptopServiceEntityForChecks.includes('Board measurements establish whether a targeted connector, capacitor, MOSFET or charging-IC repair is a sound option before a complete board replacement is quoted.') &&
  serviceTemplate.includes('<strong className="font-bold text-cyan-300">Problem:</strong> {issue.problem}') &&
  serviceTemplate.includes('<strong className="font-bold text-cyan-300">Lab approach:</strong> {issue.labFix}'));

add('Laptop service hub has one unified 10-question FAQ and removes the duplicated mid-page sections',
  !laptopServiceEntityForChecks.includes('commercialAnswers: [') &&
  !laptopServiceEntityForChecks.includes('performanceOutcomes: {') &&
  !laptopServiceEntityForChecks.includes('repairExamples: {') &&
  ((laptopServiceEntityForChecks.match(/id: 'faq-/g) || []).length === 10) &&
  serviceTemplate.includes('entity.id !== \'srv-laptop\' && entity.inspectionChecklist'));

add('Laptop inspection checklist is nested under diagnostic step and no standalone copy is rendered',
  laptopServiceEntityForChecks.includes("step: 2, title: 'Hardware & Thermal Diagnosis'") &&
  serviceTemplate.includes("entity.id === 'srv-laptop' && step.step === 2 && entity.inspectionChecklist") &&
  serviceTemplate.includes("entity.id !== 'srv-laptop' && entity.inspectionChecklist"));

add('Laptop hub links laterally to motherboard repair instead of linking to itself',
  serviceTemplate.includes('excludeLaptopService={entity.id === \'srv-laptop\' || entity.id === \'srv-gaming\'}') &&
  coreRepairPillars.includes('excludeLaptopService ? "/motherboard-repair-kuwait" : "/laptop-repair-kuwait"') &&
  coreRepairPillars.includes('excludeLaptopService ? "Motherboard Repair Kuwait" : "Laptop Repair Kuwait"'));

add('Laptop service page uses semantic section headings and service-area list navigation',
  serviceTemplate.includes('aria-labelledby="common-problems-heading"') &&
  serviceTemplate.includes('aria-labelledby="repair-process-heading"') &&
  serviceTemplate.includes('aria-labelledby="why-choose-us-heading"') &&
  serviceTemplate.includes('<nav aria-labelledby="repair-service-areas-heading">') &&
  serviceTemplate.includes('<ul role="list" className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">'));

add('Laptop symptom triage retains the six existing intent-specific paths',
  ((laptopServiceEntityForChecks.match(/label: /g) || []).length >= 6) &&
  laptopServiceEntityForChecks.includes("path: '/laptop-wont-turn-on'") &&
  laptopServiceEntityForChecks.includes("path: '/laptop-liquid-damage-repair-kuwait'") &&
  laptopServiceEntityForChecks.includes("path: '/battery-replacement-kuwait'"));

add('Footer service-area links are separated into an accessible labelled list',
  footer.includes('Footer service areas') &&
  footer.includes('<ul role="list" className="flex flex-wrap gap-2">') &&
  footer.includes('<li key={area.path}>'));

add('Salmiya page prioritises board-level repair, local pickup landmarks and nearby area links',
  salmiyaEntity.includes('Dead MacBook, liquid spill') &&
  salmiyaEntity.includes('Salem Al-Mubarak Street') &&
  salmiyaEntity.includes('Marina Mall area') &&
  salmiyaEntity.includes("relatedLocationIds: ['loc-rumaithiya', 'loc-salwa']") &&
  salmiyaEntity.includes("serviceAreas: ['Salmiya', 'Bidaa']") &&
  !salmiyaEntity.includes('The Salmiya service area also covers Rumaithiya, Salwa'));
add('Salmiya connects existing gaming services and a high-intent overheating problem card',
  salmiyaRelationship.includes("'srv-gaming'") &&
  salmiyaRelationship.includes("'srv-gaming-laptop-cleaning'") &&
  salmiyaRelationship.includes("'problem-overheating'") &&
  salmiyaRelationship.includes("'loc-rumaithiya'") &&
  salmiyaRelationship.includes("'loc-salwa'") &&
  locations.includes('Gaming Laptop Overheating, Loud Fans, or GPU Black Screen'));
add('Service-area FAQs remain in prerendered DOM and match their FAQPage schema answers',
  locations.includes('hidden={!isOpen}') &&
  locations.includes('{faq.answer}') &&
  locations.includes("acceptedAnswer: { '@type': 'Answer', text: faq.answer }") &&
  locations.includes('Common laptop repairs start from 15 KWD') &&
  locations.includes('screen-replacement labor from 30 KWD') &&
  locations.includes('motherboard repair from 25 KWD') &&
  locations.includes('typically takes 24-72 hours'));
add('Header CTA removes duplicate business phone text while preserving the direct call link',
  header.includes('Free pickup across Kuwait') &&
  header.includes('href={`tel:+${cleanTel}`}') &&
  !header.includes('<span className="mt-0.5 text-[10px] font-semibold text-white">{phoneDisplay}</span>'));

add('Service headings, repair cards and device chips preserve readable text boundaries',
  serviceTemplate.includes("{' '}") &&
  serviceTemplate.includes('key={issue.id}') &&
  serviceTemplate.includes('aria-labelledby={`common-issue-${entity.id}-${issue.id}`}') &&
  serviceTemplate.includes('<ul role="list" aria-label="Supported device types"') &&
  serviceTemplate.includes('<ul role="list" aria-label="Brands serviced"') &&
  serviceTemplate.includes('aria-labelledby="service-faqs-heading"'));

add('Laptop repair copy avoids unsupported repair prices and absolute performance or data-transfer guarantees',
  !laptopServiceEntityForChecks.includes('150+ KWD motherboard replacement') &&
  !laptopServiceEntityForChecks.includes('Total repair cost: 25 KWD.') &&
  !laptopServiceEntityForChecks.includes('ran 10x faster') &&
  !laptopServiceEntityForChecks.includes('same desktop, same files, same passwords') &&
  !laptopServiceEntityForChecks.includes('all 100% of files') &&
  !laptopServiceEntityForChecks.includes('saving you up to 70%.') &&
  !laptopServiceEntityForChecks.includes('saves the remaining 95% of the motherboard'));

// Every currently published Arabic route must have an exact English counterpart, and vice versa.
const languagePairs = [
  ['/', '/ar'],
  ['/services', '/ar/services'],
  ['/computer-repair-kuwait', '/ar/computer-repair-kuwait'],
  ['/near-me', '/ar/near-me'],
  ['/pricing', '/ar/pricing'],
  ['/laptop-repair-kuwait', '/ar/laptop-repair-kuwait'],
  ['/motherboard-repair-kuwait', '/ar/motherboard-repair-kuwait'],
  ['/gaming-pc-repair-kuwait', '/ar/gaming-pc-repair-kuwait'],
  ['/laptop-screen-repair-kuwait', '/ar/laptop-screen-repair-kuwait'],
  ['/macbook-repair-kuwait', '/ar/macbook-repair-kuwait'],
  ['/macbook-screen-replacement-kuwait', '/ar/macbook-screen-replacement-kuwait'],
  ['/battery-replacement-kuwait', '/ar/battery-replacement-kuwait'],
  ['/ssd-ram-upgrade-kuwait', '/ar/ssd-ram-upgrade-kuwait'],
  ['/gaming-laptop-repair-kuwait', '/ar/gaming-laptop-repair-kuwait'],
  ['/laptop-charging-port-repair-kuwait', '/ar/laptop-charging-port-repair-kuwait'],
  ['/laptop-keyboard-replacement-kuwait', '/ar/laptop-keyboard-replacement-kuwait'],
  ['/laptop-liquid-damage-repair-kuwait', '/ar/laptop-liquid-damage-repair-kuwait'],
  ['/location/hawalli', '/ar/computer-repair-hawalli'],
  ['/location/salmiya', '/ar/computer-repair-salmiya'],
  ['/location/jahra', '/ar/computer-repair-jahra'],
  ['/location/farwaniya', '/ar/computer-repair-farwaniya'],
  ['/location/kuwait-city', '/ar/computer-repair-kuwait-city'],
  ['/guides/bios-uefi-recovery-kuwait', '/guides/ar/bios-uefi-recovery-kuwait'],
  ['/blog/laptop-buying-guide-kuwait-2026', '/blog/ar/laptop-buying-guide-kuwait-2026'],
  ['/blog/how-often-clean-laptop-replace-thermal-paste-kuwait', '/blog/ar/how-often-clean-laptop-replace-thermal-paste-kuwait'],
];
add('All 25 Arabic-English page pairs switch both ways without homepage fallbacks',
  languagePairs.every(([en, ar]) => locale.includes("'" + en + "': '" + ar + "'") && locale.includes("'" + ar + "': '" + en + "'")) &&
  locale.includes("normalized.startsWith('/blog/ar/')") && locale.includes("normalized.startsWith('/guides/ar/')"));

add('Arabic home, services hub, and dedicated computer-repair routes are explicitly registered',
  app.includes("path: 'ar'") && app.includes("path: 'ar/services'") &&
  locale.includes("'/': '/ar'") && locale.includes("'/services': '/ar/services'") &&
  locale.includes("'/computer-repair-kuwait': '/ar/computer-repair-kuwait'") &&
  locale.includes("'/ar': '/'") && locale.includes("'/ar/services': '/services'") &&
  locale.includes("'/ar/computer-repair-kuwait': '/computer-repair-kuwait'"));
add('Arabic and English homepage, services, and computer-repair hreflang alternates are reciprocal',
  graph.includes("'ar-KW': 'https://www.computerrepairkuwait.com/ar'") &&
  graph.includes("'en-KW': 'https://www.computerrepairkuwait.com/'") &&
  graph.includes("'ar-KW': 'https://www.computerrepairkuwait.com/ar/services'") &&
  graph.includes("'en-KW': 'https://www.computerrepairkuwait.com/services'") &&
  graph.includes("'ar-KW': 'https://www.computerrepairkuwait.com/ar/computer-repair-kuwait'") &&
  graph.includes("'en-KW': 'https://www.computerrepairkuwait.com/computer-repair-kuwait'"));
add('Arabic localized homepage and services hub have dedicated content and localized direction',
  arabicHomeSource.includes('export function ArabicHomePage') &&
  arabicHomeSource.includes('تصليح الكمبيوتر واللابتوب في الكويت') &&
  arabicHomeSource.includes('dir="rtl" lang="ar-KW"') &&
  arabicHomeSource.includes('export function ArabicServicesPage') &&
  arabicHomeSource.includes('خدمات تصليح الكمبيوتر واللابتوب في الكويت') &&
  arabicHomeSource.includes("'laptop-liquid-damage-repair-kuwait':") && arabicHomeSource.includes("'/ar/laptop-liquid-damage-repair-kuwait'"));
add('Arabic homepage and services hub are included in generated SEO and sitemap output',
  seoProjection.includes('"id": "page-ar-home"') &&
  seoProjection.includes('"id": "page-ar-services"') &&
  sitemap.includes('<loc>https://www.computerrepairkuwait.com/ar</loc>') &&
  sitemap.includes('<loc>https://www.computerrepairkuwait.com/ar/services</loc>'));

add('Arabic pricing URL is in the checked-in sitemap', sitemap.includes(`<loc>${url}</loc>`));
add('Pricing hreflang alternates are reciprocal', graph.includes("'ar-KW': 'https://www.computerrepairkuwait.com/ar/pricing'") && graph.includes("'en-KW': 'https://www.computerrepairkuwait.com/pricing'"));
add('Homepage no longer displays a hard-coded review count', !hero.includes('reviewCount') && !hero.includes('+ reviews'));
add('Homepage review widget no longer prints a fixed count', !reviews.includes('reviewCount') && !reviews.includes('+ reviews'));
add('Homepage statistic strip uses service promises instead of unverified counters', graph.includes("label: 'Initial diagnosis', value: 'FREE'") && !graph.includes("value: '500+'"));
add('Commercial, footer, and local pages avoid printed fixed review counts', !footer.includes('reviewCount') && !nearMe.includes('reviewCount') && !nearMeAr.includes('reviewCount') && !locations.includes('reviewCount') && !hawalli.includes('reviewCount') && !computerRepair.includes('158+ reviews') && !computerRepair.includes('158+ customer reviews') && !arabicCommercial.includes('158+ مراجعة'));

add('Computer Repair Kuwait hub has relevant workshop imagery and descriptive alt text',
  computerRepair.includes('const heroImage = IMAGES.brand.heroBanner') &&
  computerRepair.includes('alt={heroImage.alt}') &&
  computerRepair.includes('loading="eager"') &&
  computerRepair.includes('image: IMAGES.services.laptopRepair') &&
  computerRepair.includes('image: IMAGES.gaming.diagnostics'));
add('Computer Repair Kuwait page avoids stale rating and product-stock claims in its service schema',
  !computerRepair.includes('4.9★') &&
  !computerRepair.includes('Current reviews') &&
  !computerRepair.includes('https://schema.org/InStock') &&
  computerRepair.includes('Starting price for select common repair work'));
add('Computer Repair Kuwait hub includes symptom-led links, accurate workshop location and quote approval guidance',
  computerRepair.includes('What is your computer doing?') &&
  computerRepair.includes('not separate walk-in branches') &&
  computerRepair.includes('How long will the repair take?') &&
  computerRepair.includes('before paid work begins') &&
  computerRepair.includes("path: '/desktop-pc-repair-kuwait'"));
add('Computer Repair Kuwait title, description, image and update date stay in the canonical SEO graph',
  graph.includes("title: 'Computer Repair Kuwait | PC, Laptop & MacBook | KCROC'") &&
  graph.includes("description: 'Computer repair in Kuwait for desktops, laptops, gaming PCs and MacBooks. Diagnosis first, free pickup and delivery, a clear quote before repair and 30-day warranty.'") &&
  graph.includes("ogImage: IMAGES.services.laptopRepair.src") &&
  graph.includes("lastModified: '2026-10-22T00:00:00+03:00'"));

add('Unverified customer/repair totals removed from sales copy', !about.includes("number: '500+'") && !booking.includes('500+ professionals') && !arabicCommercial.includes("['500+', 'جهاز تم إصلاحه']"));

// Arabic technician head term: split into three checks so a failure names the exact missing string.
const arTitle = 'فني كمبيوتر في الكويت | تصليح كمبيوتر ولابتوب';
const arH1 = 'فني كمبيوتر في الكويت لتصليح الكمبيوتر واللابتوب';
add('Arabic technician head term: page title in graph', has(graph, `title: '${arTitle}'`), `expected in src/data/graph.ts: title: '${arTitle}'`);
add('Arabic commercial page targets the observed computer-repair query and explains pickup, workshop diagnosis, price and warranty', has(graph, `title: 'فني كمبيوتر في الكويت | تصليح كمبيوتر ولابتوب | KCROC'`) && has(graph, `description: 'تحتاج فني كمبيوتر في الكويت؟ استلام وتوصيل مجاني من المنزل أو المكتب. نفحص الجهاز في مختبر حولي ونوضح التكلفة قبل الإصلاح، مع ضمان 30 يومًا.'`) && seoProjection.includes('فني كمبيوتر في الكويت | تصليح كمبيوتر ولابتوب | KCROC') && seoProjection.includes('تحتاج فني كمبيوتر في الكويت؟ استلام وتوصيل مجاني من المنزل أو المكتب. نفحص الجهاز في مختبر حولي ونوضح التكلفة قبل الإصلاح، مع ضمان 30 يومًا.'));
add('Arabic technician head term: H1 on main Arabic commercial page', has(arabicCommercial, `h1: '${arH1}'`), `expected in src/pages/ArabicCommercialPage.tsx: h1: '${arH1}'`);
add('Arabic computer repair: visible H1 matches the technician search intent', arabicCommercial.includes(`                ${arH1}\n              </h1>`));
add('Arabic computer repair: full Hawalli workshop address is visible in local-service content', arabicCommercial.includes('شارع ابن خلدون، مجمع الملا، محل 19 في البدروم'));
add('Arabic commercial FAQ explicitly states that repairs are workshop-only', arabicCommercial.includes('لا نقدم إصلاحًا داخل المنزل أو زيارة فني للموقع') && arabicCommercial.includes('مختبر KCROC في حولي'));
add('Arabic commercial phone CTA displays a Kuwait country code, not a stray currency symbol', arabicCommercial.includes('+965 {business.telephone.replace(') && !arabicCommercial.includes('                  ${business.telephone.replace'));

add('Arabic nearby page targets proximity intent and links to the main service page', graph.includes("title: 'تصليح كمبيوتر بالقرب منك في الكويت | استلام مجاني | KCROC'") && nearMeAr.includes('تصليح كمبيوتر ولابتوب') && nearMeAr.includes('to="/ar/computer-repair-kuwait"'));
add('Arabic Hawalli snippet reflects technician queries, workshop location and free pickup', has(graph, "title: 'تصليح كمبيوتر حولي | فني كمبيوتر ولابتوب | KCROC") && has(graph, "تحتاج فني كمبيوتر في حولي؟ زر مختبر KCROC في مجمع الملا، شارع ابن خلدون، محل 19، أو اطلب الاستلام والتوصيل مجانًا. تشخيص واضح وضمان 30 يومًا.") && has(seoProjection, 'تصليح كمبيوتر حولي | فني كمبيوتر ولابتوب | KCROC') && has(seoProjection, 'تحتاج فني كمبيوتر في حولي؟ زر مختبر KCROC في مجمع الملا، شارع ابن خلدون، محل 19، أو اطلب الاستلام والتوصيل مجانًا. تشخيص واضح وضمان 30 يومًا.'));
add('HP service-center query metadata explicitly identifies the independent provider', graph.includes("title: 'HP Laptop Service Center Kuwait (Independent) | KCROC'") && seoProjection.includes('HP Laptop Service Center Kuwait (Independent) | KCROC') && graph.includes('not an official HP-authorized service center'));
add('Arabic hreflang projection matches homepage alternate', graph.includes("'en-KW': 'https://www.computerrepairkuwait.com/'") && seoProjection.includes('\"en-KW\": \"https://www.computerrepairkuwait.com/\"'));
add('Homepage hero exposes one tracked Arabic commercial link shared by mobile and desktop', (hero.match(/hero_arabic_computer_repair/g) || []).length === 1 && (hero.match(/to="\/ar\/computer-repair-kuwait"/g) || []).length === 1);
add('Homepage Arabic links distinguish technician and near-me intent', serviceAreas.includes("{ label: 'فني كمبيوتر في الكويت', path: '/ar/computer-repair-kuwait' }") && serviceAreas.includes("{ label: 'تصليح كمبيوتر بالقرب مني', path: '/ar/near-me' }"));
add('English pricing snippet leads with qualified starting labor prices', graph.includes('Laptop screen labor from 30 KWD + panel; battery labor from 8 KWD + battery') && seoProjection.includes('Laptop screen labor from 30 KWD + panel; battery labor from 8 KWD + battery'));
add('Pricing hero visibly shows qualified prices with relevant service links', englishPricing.includes('From 30 KWD + panel') && englishPricing.includes('From 8 KWD + battery') && englishPricing.includes('to="/ssd-ram-upgrade-kuwait"'));

add('Arabic Farwaniya page has a shorter local search title, social image and fresh graph timestamp', graph.includes('title: "تصليح كمبيوتر الفروانية | فحص مجاني واستلام | KCROC"') && graph.includes("ogImage: 'https://www.computerrepairkuwait.com/images/laptop-repair-kuwait.webp'") && graph.includes("lastModified: '2026-10-21T00:00:00+03:00'") && seoProjection.includes("تصليح كمبيوتر الفروانية | فحص مجاني واستلام | KCROC") && seoProjection.includes("https://www.computerrepairkuwait.com/images/laptop-repair-kuwait.webp"));
add('Arabic Farwaniya page includes first-party repair photos, symptom guidance and pickup workflow', arabicCommercial.includes('laptopDcPowerJackConnectorReplacement') && arabicCommercial.includes('laptopScreenAssemblyDisassemblyRepair') && arabicCommercial.includes('رتب استلام مجاني من الفروانية') && arabicCommercial.includes('لا ترسل كلمة مرور أو بيانات حساسة'));
add('Arabic MacBook screen page targets Arabic-script and bilingual search intent with qualified metadata', graph.includes("title: 'تبديل شاشة ماك بوك في الكويت | Air وPro | فحص مجاني | KCROC'") && graph.includes('شاشة ماك بوك (MacBook Air وPro) مكسورة أو سوداء أو تومض') && graph.includes("'ar-KW': 'https://www.computerrepairkuwait.com/ar/macbook-screen-replacement-kuwait'") && arabicCommercial.includes('تبديل وتصليح شاشة ماك بوك (MacBook) في الكويت') && arabicCommercial.includes('هل أبحث عن تبديل شاشة ماك بوك أو ماكبوك؟'));
add('Generated Arabic MacBook SEO projection is synchronized with graph metadata, image and fresh timestamp', seoProjection.includes('تبديل شاشة ماك بوك في الكويت | Air وPro | فحص مجاني | KCROC') && seoProjection.includes('فحص وتبديل شاشة ماك بوك وMacBook في مختبر KCROC بحولي الكويت') && seoProjection.includes('2026-10-25T00:00:00+03:00') && seoProjection.includes('Service') && seoProjection.includes('FAQPage'));
add('Arabic MacBook screen page contains symptom diagnostics, example model numbers, and assembly-versus-panel guidance', arabicCommercial.includes('macbook-screen-model-numbers') && arabicCommercial.includes('A2337') && arabicCommercial.includes('A2681') && arabicCommercial.includes('A3113 / A3114') && arabicCommercial.includes('macbook-screen-assembly-options') && arabicCommercial.includes('هذه أسباب محتملة وليست تشخيصًا نهائيًا'));
add('Arabic MacBook screen page avoids universal True Tone calibration promises', arabicCommercial.includes('لا نعد بأن كل ميزة أو معايرة ستعمل في كل جهاز') && arabicCommercial.includes('ولا نعد بأنه أرخص أو ممكن لكل جهاز'));
add('Arabic MacBook screen page clarifies labor-only pricing, Hawalli lab and Kuwait-wide pickup', arabicCommercial.includes('أجرة العمل من 30 د.ك لا تشمل الشاشة نفسها') && arabicCommercial.includes('مجمع الملا — السرداب، محل 19') && arabicCommercial.includes('هذه مناطق خدمة وليست فروعًا منفصلة'));
add('Arabic MacBook screen diagnostics explain qualified Flexgate/Dustgate and backlight-board possibilities', arabicCommercial.includes('Flexgate') && arabicCommercial.includes('Dustgate') && arabicCommercial.includes('Backlight IC') && arabicCommercial.includes('Lid Angle Sensor') && arabicCommercial.includes('هذه أسباب محتملة وليست تشخيصًا نهائيًا'));
add('Arabic MacBook model table includes Air, Apple Silicon Pro and legacy Intel A-numbers with display-family notes', arabicCommercial.includes('A2337') && arabicCommercial.includes('A2681') && arabicCommercial.includes('A2941') && arabicCommercial.includes('A3113 / A3114') && arabicCommercial.includes('A1706 / A1708 / A1989 / A2159 / A2251 / A2289') && arabicCommercial.includes('A1707 / A1990') && arabicCommercial.includes('A2141') && arabicCommercial.includes('Liquid Retina XDR'));
add('Arabic MacBook service schema uses canonical business entity and labor-only AggregateOffer/catalog', arabicCommercial.includes("name: 'تبديل وتصليح شاشة ماك بوك (MacBook) في الكويت'") && arabicCommercial.includes("'@type': 'AggregateOffer'") && arabicCommercial.includes('lowPrice: 30') && arabicCommercial.includes('hasOfferCatalog') && arabicCommercial.includes("provider: { '@id': `${business.websiteUrl}/#business` }") && arabicCommercial.includes('تبديل شاشة MacBook Air') && arabicCommercial.includes('تبديل شاشة MacBook Pro') && arabicCommercial.includes('دائرة الإضاءة الخلفية'));
add('Arabic MacBook page image captions distinguish the MacBook diagnostic photo from generic laptop screen work', arabicCommercial.includes('فني يفحص جهاز MacBook مفتوحًا في مختبر KCROC بحولي') && arabicCommercial.includes('صورة توضيحية لفك وفحص تجميعة شاشة لابتوب') && arabicCommercial.includes('loading="lazy"'));
add('Arabic routes localize the visible desktop header, pickup CTA, and skip link with RTL language context', header.includes("isArabicRoute ? 'احجز استلام مجاني' : 'Book Free Pickup'") && header.includes('dir={isArabicRoute ? "rtl" : undefined}') && navigationCompiler.includes("nav_pricing: { label: 'الأسعار'") && navigationCompiler.includes("nav_locations: { label: 'مناطق الخدمة'") && rootLayout.includes('تخطي إلى المحتوى الرئيسي'));
add('Arabic routes localize mobile navigation, sticky contact CTA and footer links/address', mobileMenu.includes('راسل فنيًا عبر واتساب') && mobileMenu.includes('dir={isArabicRoute ? "rtl" : undefined}') && stickyMobileCTA.includes('سعر تبديل شاشة ماك بوك') && stickyMobileCTA.includes('اتصل بـ KCROC') && footer.includes('تبديل شاشة ماك بوك') && footer.includes('شارع ابن خلدون، مجمع الملا، السرداب، محل 19، حولي، الكويت') && footer.includes('عرض جميع الخدمات') && footer.includes("'/gaming-pc-repair-kuwait': '/ar/gaming-pc-repair-kuwait'"));

add('Arabic Farwaniya service-area structured data points to the Hawalli workshop, not a fake branch', arabicCommercial.includes("const farwaniyaServiceSchema = slug === 'computer-repair-farwaniya'") && arabicCommercial.includes("name: 'KCROC repair workshop — Hawalli'") && arabicCommercial.includes("name: 'Al Farwaniyah Governorate, Kuwait'") && graph.includes('title: "تصليح كمبيوتر الفروانية | فحص مجاني واستلام | KCROC"'));
add('Farwaniya service-area metadata is synchronized and does not imply a local walk-in branch',
  has(graph, "title: 'Laptop & Computer Repair Farwaniya | Free Pickup | KCROC'")
  && graph.includes("Laptop and PC repair in Farwaniya, Khaitan, Riggae, Ardiya and Jleeb Al-Shuyoukh. Free pickup to our Hawalli lab, quote before repair and 30-day warranty.")
  && graph.includes("'loc-farwaniya': { id: 'loc-farwaniya'")
  && graph.includes("isPhysicalLocation: false")
  && seoProjection.includes("Laptop & Computer Repair Farwaniya | Free Pickup | KCROC"));

add('Arabic Gaming PC metadata targets Arabic computer-games intent and has dedicated Open Graph artwork', graph.includes("title: 'تصليح كمبيوتر ألعاب في الكويت | Gaming PC وGPU | KCROC'") && graph.includes("ogImage: '/images/custom-gaming-pc-teardown-and-diagnostics-workbench.webp'") && graph.includes("lastModified: '2026-10-21T00:00:00+03:00'") && seoProjection.includes("تصليح كمبيوتر ألعاب في الكويت | Gaming PC وGPU | KCROC") && seoProjection.includes("/images/custom-gaming-pc-teardown-and-diagnostics-workbench.webp"));
add('Arabic Gaming PC page adds a diagnostic decision guide, first-party thermal/BIOS images and safe advice', arabicCommercial.includes('id="gaming-diagnostic-guide"') && arabicCommercial.includes('GAMING_AR_DIAGNOSTIC_PATHS.map') && arabicCommercial.includes('gamingPcThermalThrottlingKuwait') && arabicCommercial.includes('asusRogUefiBiosUtilityTemperatureMonitor') && arabicCommercial.includes('لا تفتح مزوّد الطاقة من الداخل') && arabicCommercial.includes('لا ترسل كلمات المرور أو رموز الدخول'));
add('Arabic Gaming PC page links contextually to related repair services and troubleshooting guides', arabicCommercial.includes('to="/desktop-pc-repair-kuwait"') && arabicCommercial.includes('to="/ar/motherboard-repair-kuwait"') && arabicCommercial.includes('to="/ar/gaming-laptop-repair-kuwait"') && arabicCommercial.includes('to="/guides/gaming-pc-not-turning-on-kuwait"') && arabicCommercial.includes('to="/blog/gaming-pc-cooling"'));

const screenService = graph.slice(graph.indexOf("    'srv-screen': {"), graph.indexOf("    'srv-battery': {"));
add('Laptop screen metadata targets cost intent and keeps labor separate from panel cost', screenService.includes("title: 'Laptop Screen Repair Cost Kuwait | Labor from 30 KWD | KCROC'") && screenService.includes("Windows laptop screen repair cost in Kuwait: labor starts from 30 KWD plus the panel. Free pickup, a 30-day warranty and a confirmed quote before paid work.") && screenService.includes("lastModified: '2026-10-27T00:00:00+03:00'") && seoProjection.includes("Laptop Screen Repair Cost Kuwait | Labor from 30 KWD | KCROC") && seoProjection.includes("Windows laptop screen repair cost in Kuwait: labor starts from 30 KWD plus the panel. Free pickup, a 30-day warranty and a confirmed quote before paid work."));
const screenTemplate = await read('pages/templates/ServiceTemplate.tsx');
const screenSEOEngine = await read('core/components/SEOEngine.tsx');
const screenStickyCTA = await read('components/home/StickyMobileCTA.tsx');
add('Laptop screen page has a dedicated heading, model-specific quote message and relevant information links', screenService.includes("title: 'Laptop Screen Repair Kuwait'") && screenService.includes("path: '/blog/how-to-protect-laptop-screen'") && screenService.includes("placement: 'hero'") && screenTemplate.includes('Laptop Screen Repair & Replacement in Kuwait') && screenTemplate.includes('Get a Screen Repair Quote on WhatsApp') && screenTemplate.includes('Please confirm compatible panel availability'));
add('Laptop screen content avoids unverified OEM-quality, stocked-panel, and unconditional same-day claims', !screenService.includes('OEM-quality panel replacement') && !screenService.includes('in almost every case') && !screenService.includes('same day in most cases') && !screenService.includes('A meaningful share') && !screenService.includes('fraction of the cost') && screenService.includes('before you approve the quote'));
add('Laptop screen structured offer describes the price as labour only and does not imply panel stock', screenSEOEngine.includes('The 30 KWD starting figure is labour only; the replacement panel is priced separately.') && screenSEOEngine.includes("service.slug === 'laptop-screen-repair-kuwait' ? undefined : \"https://schema.org/InStock\""));
add('Screen FAQ and process copy do not promise same-day return or unsupported device features', !screenService.includes('OEM-quality panel replacement') && !screenService.includes('same day in most cases') && !screenService.includes('A meaningful share') && !screenService.includes('fraction of the cost') && screenService.includes('The expected turnaround is confirmed with your quote.') && screenService.includes('where the model supports it'));
add('Mobile screen CTA asks for a quote and has Arabic-specific copy', screenStickyCTA.includes("pathname.includes('screen') ? 'Get Screen Quote'") && screenStickyCTA.includes("'سعر تبديل الشاشة'"));
const arabicScreenEntity = graph.slice(graph.indexOf("    'page-ar-laptop-screen-repair': {"), graph.indexOf("    'page-ar-hawalli-computer-repair': {"));
const arabicScreenTemplate = arabicCommercial.slice(arabicCommercial.indexOf("  'laptop-screen-repair-kuwait': {"), arabicCommercial.indexOf("  'computer-repair-hawalli': {"));
const whatsappIntent = await read('utils/whatsappIntent.ts');
add('Arabic laptop screen SEO targets repair intent with qualified starting labour price', arabicScreenEntity.includes("title: 'تصليح شاشة اللابتوب الكويت | أجرة من 30 د.ك | KCROC'") && arabicScreenEntity.includes("lastModified: '2026-10-21T00:00:00+03:00'") && arabicScreenEntity.includes('أجرة العمل من 30 د.ك + سعر الشاشة') && seoProjection.includes("تصليح شاشة اللابتوب الكويت | أجرة من 30 د.ك | KCROC"));
add('Arabic laptop screen hero, FAQs, localized service cards and guide link are present', arabicScreenTemplate.includes('أجرة العمل تبدأ من 30 د.ك + سعر الشاشة') && arabicScreenTemplate.includes('هل سعر 30 د.ك يشمل الشاشة؟') && arabicScreenTemplate.includes('لا تفترض أن اللوحة نفسها تالفة') && arabicCommercial.includes('دليل حماية شاشة اللابتوب من الكسر (بالإنجليزية)') && arabicCommercial.includes('تصليح وتبديل شاشة اللابتوب'));
add('Arabic laptop screen WhatsApp CTAs request model, symptom, area and part-inclusive price confirmation', arabicCommercial.includes('الماركة والموديل: ____. المشكلة: ____. منطقتي بالكويت: ____') && whatsappIntent.includes('السعر النهائي شامل أجرة العمل والقطعة والمدة المتوقعة قبل الإصلاح.'));
add('Arabic laptop screen Service schema identifies labour-only pricing without an in-stock claim', arabicCommercial.includes("name: 'أجرة العمل من 30 د.ك + سعر الشاشة'") && arabicCommercial.includes('أجرة العمل تبدأ من 30 د.ك، وسعر الشاشة يُحسب بشكل منفصل') && arabicCommercial.includes("priceCurrency: 'KWD',\n        price: 30,") && !arabicCommercial.slice(arabicCommercial.indexOf('const screenServiceSchema'), arabicCommercial.indexOf('const faqSchema')).includes("availability: 'https://schema.org/InStock'"));
add('HP metadata identifies common product families and body copy avoids unsupported regional failure comparisons', graph.includes("title: 'HP Laptop Service Center Kuwait (Independent) | KCROC'") && graph.includes("Independent HP laptop repair in Kuwait for Pavilion, EliteBook, ProBook, Envy, OMEN and Victus. Free pickup, diagnosis first, quote before repair and 30-day warranty.") && graph.includes("HP laptops—from Pavilion and Envy to EliteBook, ProBook, OMEN and Victus—can develop charging, power, hinge, cooling, battery and display faults. KCROC checks the exact model and symptoms at the Hawalli workshop before recommending a repair.") && !graph.includes("more commonly than in other markets") && seoProjection.includes("HP Laptop Service Center Kuwait (Independent) | KCROC"));
add('HP title and description clarify independent service in graph and generated SEO projection', graph.includes("title: 'HP Laptop Service Center Kuwait (Independent) | KCROC'") && graph.includes("Independent HP laptop repair in Kuwait for Pavilion, EliteBook, ProBook, Envy, OMEN and Victus. Free pickup, diagnosis first, quote before repair and 30-day warranty.") && seoProjection.includes("HP Laptop Service Center Kuwait (Independent) | KCROC") && seoProjection.includes("Independent HP laptop repair in Kuwait for Pavilion, EliteBook, ProBook, Envy, OMEN and Victus. Free pickup, diagnosis first, quote before repair and 30-day warranty."));
add('Local SEO metadata dates reflect the refreshed Arabic Hawalli, Farwaniya and near-me pages', graph.includes("lastModified: '2026-10-27T00:00:00+03:00'") && graph.includes("lastModified: '2026-10-21T00:00:00+03:00'") && graph.includes("lastModified: '2026-10-25T00:00:00+03:00'") && seoProjection.includes('"lastModified": "2026-10-27T00:00:00+03:00"') && seoProjection.includes('"lastModified": "2026-10-21T00:00:00+03:00"') && seoProjection.includes('"lastModified": "2026-10-25T00:00:00+03:00"'));

add('Arabic MacBook screen page has buyer-focused Kuwait metadata and keeps its English language pair', graph.includes("title: 'تبديل شاشة ماك بوك في الكويت | Air وPro | فحص مجاني | KCROC'") && graph.includes('تبديل شاشة ماك بوك (MacBook Air وPro) في الكويت. فحص أولي مجاني ومطابقة رقم الموديل قبل التبديل؛ أجرة العمل تبدأ من 30 د.ك + الشاشة') && graph.includes('في مختبرنا بحولي. أجرة العمل من 30 د.ك + الشاشة، مع استلام مجاني وضمان 30 يومًا.') && seoProjection.includes('في مختبرنا بحولي. أجرة العمل من 30 د.ك + الشاشة، مع استلام مجاني وضمان 30 يومًا.') && graph.includes("canonicalUrl: 'https://www.computerrepairkuwait.com/ar/macbook-screen-replacement-kuwait'") && graph.includes("'en-KW': 'https://www.computerrepairkuwait.com/macbook-screen-replacement-kuwait'") && graph.includes("schemaTypes: ['WebPage', 'BreadcrumbList', 'Service', 'FAQPage', 'ImageObject']") && seoProjection.includes('تبديل شاشة ماك بوك في الكويت | Air وPro | فحص مجاني | KCROC'));
add('Arabic MacBook screen page includes model-specific diagnostic guidance, pricing clarity, first-party imagery and a useful repair workflow', arabicCommercial.includes('id="macbook-screen-symptoms"') && arabicCommercial.includes('id="macbook-screen-model-match"') && arabicCommercial.includes('id="macbook-screen-price"') && arabicCommercial.includes('id="macbook-screen-process"') && arabicCommercial.includes('id="macbook-screen-data"') && arabicCommercial.includes('IMAGES.macbook.diagnostics.src') && arabicCommercial.includes('أجرة العمل تبدأ من 30 د.ك') && arabicCommercial.includes('لا ترسل كلمة المرور أو رموز الدخول'));
add('English MacBook repair page targets Air, Pro, charging, board and model-specific Kuwait search intent', graph.includes("title: 'MacBook Repair Kuwait | Air, Pro, Charging & Board | KCROC'") && graph.includes('MacBook Air repair Kuwait') && graph.includes('MacBook M1 M2 M3 M4 repair Kuwait') && graph.includes("canonicalUrl: 'https://www.computerrepairkuwait.com/macbook-repair-kuwait'") && graph.includes("'ar-KW': 'https://www.computerrepairkuwait.com/ar/macbook-repair-kuwait'"));
add('English MacBook repair page includes model-number examples and qualified compatibility language', graph.includes('A2337 (M1)') && graph.includes('A2681 (M2 13-inch)') && graph.includes('A2442 / A2779 / A2992') && graph.includes('not a complete supported-parts list'));
add('English MacBook repair page adds symptom-specific diagnostics, privacy guidance and local pickup FAQ', graph.includes('How we choose the right MacBook repair path') && graph.includes('MacBook has a black, flickering or lined display.') && graph.includes('Do you have a MacBook repair shop in Salmiya or Kuwait City?') && graph.includes('data preservation is a priority but cannot be guaranteed'));
add('English MacBook repair page avoids universal data-preservation and True Tone promises', graph.includes('cannot guarantee data preservation or recovery') && graph.includes('do not promise every feature before inspection'));

const englishMacbook = graph.slice(graph.indexOf("    'srv-macbook': {"), graph.indexOf("    'srv-laptop': {"));
add('English MacBook page removes unsupported data-preservation, repair-rate and unverified case-study claims',
  !englishMacbook.includes('Your SSD, your Secure Enclave, and your data stay exactly where they were')
  && !englishMacbook.includes('Not with component-level repair')
  && !englishMacbook.includes('The majority of motherboards')
  && !englishMacbook.includes('no data loss')
  && !englishMacbook.includes('Data Recovered From a Board Apple Called Unfixable')
  && !englishMacbook.includes('performanceOutcomes:')
  && !englishMacbook.includes('repairExamples:'));
add('English MacBook fault descriptions distinguish symptoms from diagnosis and avoid categorical USB-C claims',
  englishMacbook.includes('possible causes include the charger, cable, port, power-negotiation circuitry')
  && englishMacbook.includes('Unexpected restarts can be caused by software, power, thermal or hardware faults')
  && !englishMacbook.includes('the physical port itself is rarely the actual fault')
  && !englishMacbook.includes('Most commonly a failed power negotiation IC'));
add('English MacBook FAQs qualify board repair, data recovery, parts and pricing',
  englishMacbook.includes('we cannot promise that every board can be repaired')
  && englishMacbook.includes('does not guarantee that data will survive or remain accessible')
  && englishMacbook.includes('We provide the quote before paid work begins')
  && !englishMacbook.includes('typically a fraction of an out-of-warranty full board-swap quote from Apple'));


const arabicHawalli = await read('pages/ArabicHawalliLocationPage.tsx');
add('English and Arabic Hawalli language switch is reciprocal', locale.includes("'/location/hawalli': '/ar/computer-repair-hawalli'") && locale.includes("'/ar/computer-repair-hawalli': '/location/hawalli'"));
add('Dedicated Arabic Hawalli location route is registered and localized', app.includes("path: 'ar/computer-repair-hawalli'") && app.indexOf("path: 'ar/computer-repair-hawalli'") < app.indexOf("path: 'ar/:slug'") && arabicHawalli.includes('dir="rtl" lang="ar-KW"') && arabicHawalli.includes('DIRECTIONS_URL') && arabicHawalli.includes('FAQPage'));
add('Hawalli location metadata is synchronized between graph and SEO projection', graph.includes("title: 'Computer Repair Hawalli | Laptop, MacBook & PC | KCROC'") && graph.includes('Visit KCROC at Al Mullah Complex, Basement Shop 19, Hawalli. Laptop, MacBook, PC and motherboard repair daily 10 AM–10 PM. Free pickup across Kuwait.') && seoProjection.includes('Computer Repair Hawalli | Laptop, MacBook & PC | KCROC') && seoProjection.includes('Visit KCROC at Al Mullah Complex, Basement Shop 19, Hawalli. Laptop, MacBook, PC and motherboard repair daily 10 AM–10 PM. Free pickup across Kuwait.') && has(graph, "title: 'تصليح كمبيوتر حولي | فني كمبيوتر ولابتوب | KCROC") && seoProjection.includes('تصليح كمبيوتر حولي | فني كمبيوتر ولابتوب | KCROC'));
add('Hawalli hero retains workshop directions without case-study promotion', hawalli.includes("cta_name: 'hawalli_directions'") && !hawalli.includes('case-rog-motherboard-hawalli'));
add('Hawalli workshop page links directly to published repair prices with quote-before-work guidance', hawalli.includes('id="hawalli-pricing-cta"') && hawalli.includes('to="/pricing"') && hawalli.includes('View Repair Prices') && hawalli.includes('confirm your quote before paid repair work begins'));

const hawalliTierServiceIds = [
  'srv-motherboard', 'srv-liquid-damage', 'srv-charging-port', 'srv-desktop-pc',
  'srv-macbook', 'srv-macbook-screen', 'srv-gaming', 'srv-gaming-laptop', 'srv-gaming-laptop-cleaning',
  'srv-laptop', 'srv-screen', 'srv-battery', 'srv-ssd-ram', 'srv-keyboard', 'srv-hinge',
];
add('Hawalli service tiers contain all 15 existing services exactly once and retain canonical slug links',
  hawalliTierServiceIds.length === 15 &&
  new Set(hawalliTierServiceIds).size === 15 &&
  hawalliTierServiceIds.every((id) => hawalli.includes(`'${id}'`) && graph.includes(`'${id}': {`)) &&
  hawalli.includes('to={`/${service.slug}`}') &&
  hawalli.includes('HAWALLI_SERVICE_GROUPS.map'));
add('Hawalli hero, phone display, and walk-in access copy remain consistent',
  graph.includes("We fix the board. We don't just swap it.") &&
  hawalli.includes("phone.startsWith('965') ? `+965 ${phone.slice(3)}`") &&
  hawalli.includes('Finding the lab:') &&
  hawalli.includes('basement entrance from Ibn Khaldoun Street') &&
  hawalli.includes('Laptop motherboard & MacBook logic board repair') &&
  header.includes('phoneDigits.slice(3)') &&
  footer.includes("business.telephone.replace(/^965/, '')"));
add('Hawalli problem labels improve readability without changing problem URL targets',
  hawalli.includes("'problem-overheating': 'Laptop Overheating & Loud Fan'") &&
  hawalli.includes('to={`/${problem.slug}`}'));
add('Hawalli FAQ answers stay in initial static HTML and FAQPage schema alongside the LocalBusiness entity',
  ((hawalli.match(/id: 'faq-hawalli-/g) || []).length === 12) &&
  hawalli.includes('hidden={!isOpen}') &&
  hawalli.includes('{faq.answer}') &&
  hawalli.includes("acceptedAnswer: { '@type': 'Answer', text: faq.answer }") &&
  hawalli.includes('<SEOEngine entityId={location.id} />') &&
  hawalli.includes('<SchemaMarkup schema={FAQ_SCHEMA} />'));
add('Hawalli moves the repeated trust strip into the final CTA without hiding footer badges sitewide',
  hawalli.includes('aria-label="KCROC repair assurances"') &&
  hawalli.includes('Free Pickup &amp; Delivery') &&
  footer.includes("location.pathname.replace(/\\/+$/, '') === '/location/hawalli'") &&
  footer.includes('trustBadges.length > 0 && !isHawalliLandingPage'));

const [caseStudyRemovalApp, caseStudyRemovalNavigation, caseStudyRemovalDesktopMenu, caseStudyRemovalMobileMenu, caseStudyRemovalHome, caseStudyRemovalHero, caseStudyRemovalBehindBench, caseStudyRemovalRootLayout, caseStudyRemovalGraph, caseStudyRemovalSEO, caseStudyRemovalSitemap, caseStudyRemovalPrerender, caseStudyRemovalSitemapGenerator, caseStudyRemovalArabicCommercial, caseStudyRemovalBiosGuide, caseStudyRemovalBlogTemplate, caseStudyRemovalCoolingGuide, caseStudyRemovalLocation, caseStudyRemovalLocationDeep, caseStudyRemovalHawalli, caseStudyRemovalBrand, caseStudyRemovalProblem, caseStudyRemovalService] = await Promise.all([
  read('App.tsx'),
  read('core/navigation/NavigationCompiler.ts'),
  read('core/components/layout/DesktopMegaMenu.tsx'),
  read('core/components/layout/MobileMenu.tsx'),
  read('pages/Home.tsx'),
  read('components/home/Hero.tsx'),
  read('components/home/BehindBench.tsx'),
  read('core/components/layout/RootLayout.tsx'),
  read('data/graph.ts'),
  read('data/seoGraph.generated.ts'),
  readFile(path.resolve('public/sitemap.xml'), 'utf8'),
  readFile(path.resolve('prerender-routes.generated.json'), 'utf8'),
  readFile(path.resolve('scripts/generate-sitemap.ts'), 'utf8'),
  read('pages/ArabicCommercialPage.tsx'),
  read('pages/BiosUefiRecoveryGuide.tsx'),
  read('pages/BlogPostTemplate.tsx'),
  read('pages/GamingPCCooling.tsx'),
  read('pages/LocationTemplate.tsx'),
  read('pages/LocationDeepTemplate.tsx'),
  read('pages/HawalliLocationPage.tsx'),
  read('pages/templates/BrandTemplate.tsx'),
  read('pages/templates/ProblemTemplate.tsx'),
  read('pages/templates/ServiceTemplate.tsx'),
]);

add('Case-study hub/detail routes and homepage showcase are removed',
  !caseStudyRemovalApp.includes("path: 'case-studies'")
  && !caseStudyRemovalHome.includes('BeforeAfterShowcase')
  && !caseStudyRemovalRootLayout.includes("path === '/case-studies'")
  && !caseStudyRemovalRootLayout.includes("path.startsWith('/case-studies/')"));

add('Case-study navigation is removed from desktop, mobile and resources menus',
  !caseStudyRemovalNavigation.includes('nav_case_study')
  && !caseStudyRemovalNavigation.includes('case_studies_mega')
  && !caseStudyRemovalNavigation.includes("slug: 'case-studies'")
  && !caseStudyRemovalNavigation.includes('compileCaseStudiesMegaMenu')
  && !caseStudyRemovalDesktopMenu.includes('case_studies_mega')
  && !caseStudyRemovalMobileMenu.includes('case_studies_mega'));

add('Customer-specific case-study records and links are removed from public content',
  !caseStudyRemovalGraph.includes("'page-case-studies': {")
  && !caseStudyRemovalGraph.includes("'case-macbook-liquid-salmiya': {")
  && !caseStudyRemovalGraph.includes("'case-rog-motherboard-hawalli': {")
  && !caseStudyRemovalGraph.includes("'case-dell-screen-kuwait-city': {")
  && !caseStudyRemovalGraph.includes('/case-studies/')
  && !caseStudyRemovalSEO.includes('"id": "page-case-studies"')
  && !caseStudyRemovalSEO.includes('"entityType": "CaseStudy"'));

add('Case-study cards and links are removed from location, brand, problem, service and guide pages',
  !caseStudyRemovalArabicCommercial.includes('/case-studies/')
  && !caseStudyRemovalBiosGuide.includes('/case-studies/')
  && !caseStudyRemovalBlogTemplate.includes('/case-studies/')
  && !caseStudyRemovalCoolingGuide.includes('/case-studies/')
  && !caseStudyRemovalLocation.includes('/case-studies/')
  && !caseStudyRemovalLocation.includes('relatedCaseStudies')
  && !caseStudyRemovalLocationDeep.includes('/case-studies/')
  && !caseStudyRemovalLocationDeep.includes('const caseStudy =')
  && !caseStudyRemovalHawalli.includes('/case-studies/')
  && !caseStudyRemovalHawalli.includes('const caseStudy =')
  && !caseStudyRemovalBrand.includes('/case-studies/')
  && !caseStudyRemovalBrand.includes('relatedCaseStudies')
  && !caseStudyRemovalProblem.includes('/case-studies/')
  && !caseStudyRemovalProblem.includes('relatedCaseStudies')
  && !caseStudyRemovalService.includes('/case-studies/')
  && !caseStudyRemovalService.includes('relatedCaseStudyPath')
  && !caseStudyRemovalService.includes('relatedCaseStudyIds'));

const locationIndex = await read('pages/Locations.tsx');
add('Location navigation avoids stale counts and distinguishes the Hawalli lab from service areas',
  !caseStudyRemovalDesktopMenu.includes('31 dedicated areas')
  && !caseStudyRemovalDesktopMenu.includes('View all 31 areas')
  && !caseStudyRemovalMobileMenu.includes('31 pickup and delivery service areas')
  && !caseStudyRemovalNavigation.includes('All 31 Service Areas')
  && caseStudyRemovalNavigation.includes('Locations & Service Areas')
  && locationIndex.includes('pickup & delivery areas')
  && locationIndex.includes('location.isPhysicalLocation'));

add('Legacy case-study URLs are excluded from the sitemap and prerender manifest',
  !caseStudyRemovalSitemap.includes('/case-studies/')
  && JSON.parse(caseStudyRemovalPrerender).every((route) => !String(route).startsWith('/case-studies'))
  && caseStudyRemovalSitemapGenerator.includes("fs.writeFileSync(prerenderRoutesPath, '[\"/404\"]\\n')"));

add('Homepage and workbench no longer link to the retired case-study section',
  !caseStudyRemovalHero.includes('/case-studies')
  && !caseStudyRemovalHero.includes('See real repair case studies')
  && !caseStudyRemovalBehindBench.includes('/case-studies')
  && !caseStudyRemovalBehindBench.includes('View Case Studies'));

const arabicChargingGuide = await read('pages/ArabicChargingTroubleshootingPage.tsx');
const chargingConfigStart = arabicCommercial.indexOf("'laptop-charging-port-repair-kuwait': {");
const chargingConfigEnd = arabicCommercial.indexOf("'laptop-keyboard-replacement-kuwait': {", chargingConfigStart + 1);
const chargingConfig = chargingConfigStart >= 0 && chargingConfigEnd > chargingConfigStart
  ? arabicCommercial.slice(chargingConfigStart, chargingConfigEnd)
  : '';
const chargingFaqStart = chargingConfig.indexOf('    faq: [');
const chargingFaqEnd = chargingConfig.indexOf('    englishPath:', chargingFaqStart + 1);
const chargingFaqSource = chargingFaqStart >= 0 && chargingFaqEnd > chargingFaqStart
  ? chargingConfig.slice(chargingFaqStart, chargingFaqEnd)
  : '';
const chargingProcessStart = arabicCommercial.indexOf('id="charging-port-repair-process"');
const chargingProcessEnd = arabicCommercial.indexOf('</ol>', chargingProcessStart + 1);
const chargingProcess = chargingProcessStart >= 0 && chargingProcessEnd > chargingProcessStart
  ? arabicCommercial.slice(chargingProcessStart, chargingProcessEnd)
  : '';
const chargingFaqCount = chargingFaqSource.split("{ q: '").length - 1;
add('Arabic charging-port FAQ keeps all eight question-answer pairs in source and in Arabic FAQ schema',
  chargingFaqCount === 8
  && arabicCommercial.includes("inLanguage: 'ar-KW'")
  && arabicCommercial.includes("mainEntity: cfg.faq.map")
  && arabicCommercial.includes('<div className="px-6 pb-6 text-sm leading-8 text-slate-400">{item.a}</div>'));
add('Arabic charging-port repair process renders six single list items without duplicate native numbering',
  chargingProcess.includes('<ol className="mt-6 grid list-none gap-4 sm:grid-cols-2 lg:grid-cols-3">')
  && ['١.', '٢.', '٣.', '٤.', '٥.', '٦.'].every((number) => chargingProcess.includes("{ title: '" + number))
  && chargingProcess.includes('<li key={item.title}'));
add('Charging-port schema is localized and retains the 20 KWD starting price',
  arabicCommercial.includes("serviceType: 'تصليح مدخل DC Jack وUSB-C وتشخيص دائرة الشحن والطاقة'")
  && arabicCommercial.includes("inLanguage: 'ar-KW'")
  && arabicCommercial.includes("priceCurrency: 'KWD'")
  && arabicCommercial.includes('minPrice: 20'));
add('Arabic diagnostic guide is registered with reciprocal English/Arabic language alternates',
  app.includes("path: 'ar/laptop-plugged-in-not-charging'")
  && graph.includes("id: 'page-ar-laptop-plugged-in-not-charging'")
  && graph.includes("canonicalUrl: 'https://www.computerrepairkuwait.com/ar/laptop-plugged-in-not-charging'")
  && graph.includes("'ar-KW': 'https://www.computerrepairkuwait.com/ar/laptop-plugged-in-not-charging'")
  && graph.includes("'en-KW': 'https://www.computerrepairkuwait.com/laptop-plugged-in-not-charging'")
  && seoProjection.includes('"id": "page-ar-laptop-plugged-in-not-charging"')
  && sitemap.includes('<loc>https://www.computerrepairkuwait.com/ar/laptop-plugged-in-not-charging</loc>')
  && locale.includes("'/laptop-charging-port-repair-kuwait': '/ar/laptop-charging-port-repair-kuwait'")
  && locale.includes("'/laptop-plugged-in-not-charging': '/ar/laptop-plugged-in-not-charging'")
  && locale.includes("'/ar/laptop-plugged-in-not-charging': '/laptop-plugged-in-not-charging'"));
const chargingSafeStart = arabicCommercial.indexOf('aria-labelledby="charging-port-safe-checks"');
const chargingSafeEnd = arabicCommercial.indexOf("{slug === 'gaming-laptop-repair-kuwait' && (", chargingSafeStart + 1);
const chargingSafeChecks = chargingSafeStart >= 0 && chargingSafeEnd > chargingSafeStart
  ? arabicCommercial.slice(chargingSafeStart, chargingSafeEnd)
  : '';
add('Arabic charging safety checklist renders each icon and instruction inside a real list item',
  chargingSafeChecks.includes('<ul className="mt-5 grid gap-3 sm:grid-cols-2">')
  && chargingSafeChecks.includes('<li key={item} className="flex gap-3')
  && chargingSafeChecks.includes('<CheckCircle2')
  && chargingSafeChecks.includes('<span>{item}</span>'));
add('Arabic and English footer policy controls remain separate, named and visually separated',
  footer.includes('role="group" aria-label={isArabicRoute ? "سياسات وإعدادات الموقع" : "Site policies and settings"}')
  && (footer.split('<span aria-hidden="true" className="text-slate-700">·</span>').length - 1) === 2
  && footer.includes('aria-label={isArabicRoute ? "سياسة الخصوصية" : "Privacy Policy"}')
  && footer.includes('aria-label={isArabicRoute ? "شروط الخدمة" : "Terms of Service"}'));
add('Arabic charging service English language link has explicit charging-specific text',
  arabicCommercial.includes("slug === 'laptop-charging-port-repair-kuwait' ? 'صفحة إصلاح منفذ الشحن باللغة الإنجليزية'"));
add('Arabic charging troubleshooting page has static FAQ answers, safe checks and links to service and English counterparts',
  arabicChargingGuide.includes("SEOEngine entityId=\"page-ar-laptop-plugged-in-not-charging\"")
  && arabicChargingGuide.includes("FAQ.map((item)")
  && arabicChargingGuide.includes('<details key={item.q}')
  && arabicChargingGuide.includes('acceptedAnswer: { \'@type\': \'Answer\', text: item.a }')
  && arabicChargingGuide.includes('to="/laptop-plugged-in-not-charging"')
  && arabicChargingGuide.includes('to="/ar/laptop-charging-port-repair-kuwait"')
  && arabicChargingGuide.includes("لا تدخل أدوات معدنية"));

add('Motherboard service snippet targets laptop, desktop and MacBook logic-board intent',
  graph.includes("title: 'Laptop Motherboard Repair Kuwait | MacBook Logic Board | KCROC'") &&
  graph.includes("Laptop, desktop and MacBook logic board repair in Kuwait. Selected component repairs start from 25 KWD") &&
  graph.includes('MacBook logic board repair Kuwait'));

add('Motherboard page uses a focused visible H1 without changing other service headings',
  serviceTemplate.includes("isMotherboardService ? 'Laptop & Desktop Motherboard Repair in Kuwait' : entity.title") &&
  serviceTemplate.includes("const isMotherboardService = entity.id === 'srv-motherboard';"));

add('Motherboard devices section names laptops, desktop PCs and MacBook logic boards',
  graph.includes("'MacBook Logic Boards (Intel & Apple Silicon)'") &&
  serviceTemplate.includes("Devices We Cover: Laptop, Desktop PC & MacBook Logic Boards"));

add('Motherboard service makes the real Hawalli workshop address visible',
  graph.includes('Ibn Khaldoun Street, Al Mullah Complex, Basement Shop 19') &&
  graph.includes('Free pickup and delivery are available across Kuwait.'));

add('Motherboard internal links use descriptive laptop and MacBook logic-board anchor text',
  computerRepair.includes("label: 'Laptop & Computer Motherboard Repair Kuwait'") &&
  hawalli.includes('Laptop motherboard & MacBook logic board repair') &&
  serviceTemplate.includes("item.id === 'srv-motherboard' ? 'Laptop Motherboard & MacBook Logic Board Repair' : item.title"));

add('Motherboard FAQs remain in native disclosure elements and continue to render answers',
  serviceTemplate.includes('<details') &&
  serviceTemplate.includes('{faq.answer}') &&
  graph.includes("schemaTypes: ['Service', 'FAQPage']"));

for (const check of checks) console.log(`${check.pass ? '✅' : '❌'} ${check.name}${!check.pass && check.detail ? ` — ${check.detail}` : ''}`);
const failed = checks.filter((check) => !check.pass);
if (failed.length) process.exit(1);
console.log(`\n✅ Customer-growth regression checks passed (${checks.length} checks).`);
