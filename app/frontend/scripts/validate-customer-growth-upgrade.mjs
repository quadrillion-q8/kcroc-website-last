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
  arabicHomeSource.includes('خدمات الكمبيوتر واللابتوب في الكويت') &&
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
add('Unverified customer/repair totals removed from sales copy', !about.includes("number: '500+'") && !booking.includes('500+ professionals') && !arabicCommercial.includes("['500+', 'جهاز تم إصلاحه']"));

// Arabic technician head term: split into three checks so a failure names the exact missing string.
const arTitle = 'فني كمبيوتر في الكويت | تصليح كمبيوتر ولابتوب';
const arH1 = 'فني كمبيوتر في الكويت لتصليح الكمبيوتر واللابتوب';
add('Arabic technician head term: page title in graph', has(graph, `title: '${arTitle}'`), `expected in src/data/graph.ts: title: '${arTitle}'`);
add('Arabic commercial page targets the observed computer-repair query and explains pickup, workshop diagnosis, price and warranty', has(graph, `title: 'تصليح كمبيوتر في الكويت | فني كمبيوتر | KCROC'`) && has(graph, `description: 'تصليح كمبيوتر ولابتوب في الكويت مع استلام وتوصيل مجاني من المنزل أو المكتب. نفحص الجهاز في مختبر حولي ونوضح التكلفة قبل الإصلاح، مع ضمان 30 يومًا.'`) && seoProjection.includes('تصليح كمبيوتر في الكويت | فني كمبيوتر | KCROC') && seoProjection.includes('تصليح كمبيوتر ولابتوب في الكويت مع استلام وتوصيل مجاني من المنزل أو المكتب. نفحص الجهاز في مختبر حولي ونوضح التكلفة قبل الإصلاح، مع ضمان 30 يومًا.'));
add('Arabic technician head term: H1 on main Arabic commercial page', has(arabicCommercial, `h1: '${arH1}'`), `expected in src/pages/ArabicCommercialPage.tsx: h1: '${arH1}'`);
add('Arabic commercial FAQ explicitly states that repairs are workshop-only', arabicCommercial.includes('لا نقدم إصلاحًا داخل المنزل أو زيارة فني للموقع') && arabicCommercial.includes('مختبر KCROC في حولي'));
add('Arabic commercial phone CTA displays a Kuwait country code, not a stray currency symbol', arabicCommercial.includes('+965 {business.telephone.replace(') && !arabicCommercial.includes('                  ${business.telephone.replace'));

add('Arabic nearby page targets proximity intent and links to the main service page', graph.includes("title: 'تصليح كمبيوتر بالقرب منك في الكويت | استلام مجاني | KCROC'") && nearMeAr.includes('تصليح كمبيوتر ولابتوب') && nearMeAr.includes('to="/ar/computer-repair-kuwait"'));
add('Arabic hreflang projection matches homepage alternate', graph.includes("'en-KW': 'https://www.computerrepairkuwait.com/'") && seoProjection.includes('\"en-KW\": \"https://www.computerrepairkuwait.com/\"'));
add('Homepage hero exposes a tracked Arabic commercial link on mobile and desktop', (hero.match(/hero_arabic_computer_repair/g) || []).length === 2 && (hero.match(/to="\/ar\/computer-repair-kuwait"/g) || []).length === 2);
add('Homepage Arabic links distinguish technician and near-me intent', serviceAreas.includes("{ label: 'فني كمبيوتر في الكويت', path: '/ar/computer-repair-kuwait' }") && serviceAreas.includes("{ label: 'تصليح كمبيوتر بالقرب مني', path: '/ar/near-me' }"));
add('English pricing snippet leads with qualified starting labor prices', graph.includes('Laptop screen labor from 30 KWD + panel; battery labor from 8 KWD + battery') && seoProjection.includes('Laptop screen labor from 30 KWD + panel; battery labor from 8 KWD + battery'));
add('Pricing hero visibly shows qualified prices with relevant service links', englishPricing.includes('From 30 KWD + panel') && englishPricing.includes('From 8 KWD + battery') && englishPricing.includes('to="/ssd-ram-upgrade-kuwait"'));

add('Arabic Farwaniya page has a shorter local search title, social image and fresh graph timestamp', graph.includes('title: "تصليح كمبيوتر الفروانية | فحص مجاني واستلام | KCROC"') && graph.includes("ogImage: 'https://www.computerrepairkuwait.com/images/laptop-repair-kuwait.webp'") && graph.includes("lastModified: '2026-10-21T00:00:00+03:00'") && seoProjection.includes("تصليح كمبيوتر الفروانية | فحص مجاني واستلام | KCROC") && seoProjection.includes("https://www.computerrepairkuwait.com/images/laptop-repair-kuwait.webp"));
add('Arabic Farwaniya page includes first-party repair photos, symptom guidance and pickup workflow', arabicCommercial.includes('laptopDcPowerJackConnectorReplacement') && arabicCommercial.includes('laptopScreenAssemblyDisassemblyRepair') && arabicCommercial.includes('رتب استلام مجاني من الفروانية') && arabicCommercial.includes('لا ترسل كلمة مرور أو بيانات حساسة'));
add('Arabic Farwaniya service-area structured data points to the Hawalli workshop, not a fake branch', arabicCommercial.includes("const farwaniyaServiceSchema = slug === 'computer-repair-farwaniya'") && arabicCommercial.includes("name: 'KCROC repair workshop — Hawalli'") && arabicCommercial.includes("name: 'Al Farwaniyah Governorate, Kuwait'") && graph.includes('title: "تصليح كمبيوتر الفروانية | فحص مجاني واستلام | KCROC"'));
add('Farwaniya service-area metadata is synchronized and does not imply a local walk-in branch',
  has(graph, "title: 'Laptop & Computer Repair Farwaniya | Free Pickup | KCROC'")
  && graph.includes("Laptop and PC repair for Farwaniya, Khaitan, Riggae and Ardiya. Free pickup, a quote before repair and a 30-day repair warranty.")
  && graph.includes("'loc-farwaniya': { id: 'loc-farwaniya'")
  && graph.includes("isPhysicalLocation: false")
  && seoProjection.includes("Laptop & Computer Repair Farwaniya | Free Pickup | KCROC"));

add('Arabic Gaming PC metadata targets Arabic computer-games intent and has dedicated Open Graph artwork', graph.includes("title: 'تصليح كمبيوتر ألعاب في الكويت | Gaming PC وGPU | KCROC'") && graph.includes("ogImage: '/images/custom-gaming-pc-teardown-and-diagnostics-workbench.webp'") && graph.includes("lastModified: '2026-10-21T00:00:00+03:00'") && seoProjection.includes("تصليح كمبيوتر ألعاب في الكويت | Gaming PC وGPU | KCROC") && seoProjection.includes("/images/custom-gaming-pc-teardown-and-diagnostics-workbench.webp"));
add('Arabic Gaming PC page adds a diagnostic decision guide, first-party thermal/BIOS images and safe advice', arabicCommercial.includes('id="gaming-diagnostic-guide"') && arabicCommercial.includes('GAMING_AR_DIAGNOSTIC_PATHS.map') && arabicCommercial.includes('gamingPcThermalThrottlingKuwait') && arabicCommercial.includes('asusRogUefiBiosUtilityTemperatureMonitor') && arabicCommercial.includes('لا تفتح مزوّد الطاقة من الداخل') && arabicCommercial.includes('لا ترسل كلمات المرور أو رموز الدخول'));
add('Arabic Gaming PC page links contextually to related repair services and troubleshooting guides', arabicCommercial.includes('to="/desktop-pc-repair-kuwait"') && arabicCommercial.includes('to="/ar/motherboard-repair-kuwait"') && arabicCommercial.includes('to="/ar/gaming-laptop-repair-kuwait"') && arabicCommercial.includes('to="/guides/gaming-pc-not-turning-on-kuwait"') && arabicCommercial.includes('to="/blog/gaming-pc-cooling"'));

const screenService = graph.slice(graph.indexOf("    'srv-screen': {"), graph.indexOf("    'srv-battery': {"));
add('Laptop screen metadata targets repair intent and keeps labor separate from panel cost', screenService.includes("title: 'Laptop Screen Repair Kuwait | Labor from 30 KWD | KCROC'") && screenService.includes("Laptop screen repair for cracked, flickering, black or lined displays in Kuwait. Replacement labor from 30 KWD plus panel cost; free pickup, quote before repair and 30-day warranty.") && screenService.includes("lastModified: '2026-10-17T00:00:00+03:00'") && seoProjection.includes("Laptop Screen Repair Kuwait | Labor from 30 KWD | KCROC") && seoProjection.includes("Laptop screen repair for cracked, flickering, black or lined displays in Kuwait. Replacement labor from 30 KWD plus panel cost; free pickup, quote before repair and 30-day warranty."));
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
add('HP metadata identifies common product families and body copy avoids unsupported regional failure comparisons', graph.includes("title: 'HP Laptop Repair Kuwait | Pavilion, EliteBook & OMEN | KCROC'") && graph.includes("Independent HP laptop repair in Kuwait for Pavilion, EliteBook, ProBook, Envy, OMEN and Victus. Free pickup, diagnosis first, quote before repair and 30-day warranty.") && graph.includes("HP laptops—from Pavilion and Envy to EliteBook, ProBook, OMEN and Victus—can develop charging, power, hinge, cooling, battery and display faults. KCROC checks the exact model and symptoms at the Hawalli workshop before recommending a repair.") && !graph.includes("more commonly than in other markets") && seoProjection.includes("HP Laptop Repair Kuwait | Pavilion, EliteBook & OMEN | KCROC"));
add('HP title and description clarify independent service in both SEO projection copies', graph.includes("title: 'HP Laptop Repair Kuwait | Pavilion, EliteBook & OMEN | KCROC'") && graph.includes("Independent HP laptop repair in Kuwait for Pavilion, EliteBook, ProBook, Envy, OMEN and Victus. Free pickup, diagnosis first, quote before repair and 30-day warranty.") && (seoProjection.match(/HP Laptop Repair Kuwait \| Pavilion, EliteBook & OMEN \| KCROC/g) || []).length === 2 && (seoProjection.match(/Independent HP laptop repair in Kuwait for Pavilion, EliteBook, ProBook, Envy, OMEN and Victus\. Free pickup, diagnosis first, quote before repair and 30-day warranty\./g) || []).length === 2);
add('Local SEO metadata dates reflect the refreshed Hawalli/Farwaniya and near-me pages', graph.includes("lastModified: '2026-10-16T00:00:00+03:00'") && graph.includes("lastModified: '2026-10-15T00:00:00+03:00'") && seoProjection.includes('"lastModified": "2026-10-16T00:00:00+03:00"') && seoProjection.includes('"lastModified": "2026-10-15T00:00:00+03:00"'));

const arabicHawalli = await read('pages/ArabicHawalliLocationPage.tsx');
add('English and Arabic Hawalli language switch is reciprocal', locale.includes("'/location/hawalli': '/ar/computer-repair-hawalli'") && locale.includes("'/ar/computer-repair-hawalli': '/location/hawalli'"));
add('Dedicated Arabic Hawalli location route is registered and localized', app.includes("path: 'ar/computer-repair-hawalli'") && app.indexOf("path: 'ar/computer-repair-hawalli'") < app.indexOf("path: 'ar/:slug'") && arabicHawalli.includes('dir="rtl" lang="ar-KW"') && arabicHawalli.includes('DIRECTIONS_URL') && arabicHawalli.includes('FAQPage'));
add('Hawalli location metadata is synchronized between graph and SEO projection', graph.includes("title: 'Computer Repair Hawalli | Laptop, MacBook & PC | KCROC'") && graph.includes('Visit KCROC at Al Mullah Complex, Basement Shop 19, Hawalli. Laptop, MacBook, PC and motherboard repair daily 10 AM–10 PM. Free pickup across Kuwait.') && seoProjection.includes('Computer Repair Hawalli | Laptop, MacBook & PC | KCROC') && seoProjection.includes('Visit KCROC at Al Mullah Complex, Basement Shop 19, Hawalli. Laptop, MacBook, PC and motherboard repair daily 10 AM–10 PM. Free pickup across Kuwait.') && has(graph, "title: 'تصليح كمبيوتر حولي | فني لابتوب وموقع المختبر | KCROC'") && seoProjection.includes('تصليح كمبيوتر حولي | فني لابتوب وموقع المختبر | KCROC'));
add('Hawalli hero retains workshop directions without case-study promotion', hawalli.includes("cta_name: 'hawalli_directions'") && !hawalli.includes('case-rog-motherboard-hawalli'));

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
  && JSON.parse(caseStudyRemovalPrerender).length === 0
  && caseStudyRemovalSitemapGenerator.includes("fs.writeFileSync(prerenderRoutesPath, '[]\\n')"));

add('Homepage and workbench no longer link to the retired case-study section',
  !caseStudyRemovalHero.includes('/case-studies')
  && !caseStudyRemovalHero.includes('See real repair case studies')
  && !caseStudyRemovalBehindBench.includes('/case-studies')
  && !caseStudyRemovalBehindBench.includes('View Case Studies'));
for (const check of checks) console.log(`${check.pass ? '✅' : '❌'} ${check.name}${!check.pass && check.detail ? ` — ${check.detail}` : ''}`);
const failed = checks.filter((check) => !check.pass);
if (failed.length) process.exit(1);
console.log(`\n✅ Customer-growth regression checks passed (${checks.length} checks).`);
