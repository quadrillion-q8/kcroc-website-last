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

const [app, graph, seoProjection, locale, pricingPage, sitemap, hero, reviews, footer, header, mobileMenu, stickyMobileCTA, navigationCompiler, rootLayout, nearMe, nearMeAr, locations, locationDirectory, hawalli, computerRepair, about, booking, arabicCommercial, serviceAreas, englishPricing, serviceTemplate, brandTemplate, coreRepairPillars, macbookBatteryPage] = await Promise.all([
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
  read('pages/Locations.tsx'),
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
  read('pages/MacBookBatteryReplacementPage.tsx'),
]);

const guideRouteRules = await read('constants/routes.ts');
const vercelConfig = await readFile(path.resolve('vercel.json'), 'utf8');
const seoEngine = await read('core/components/SEOEngine.tsx');
const locationTypeSchema = await read('types/knowledgeGraph.ts');
const seoGenerator = await readFile(path.resolve('scripts/generate-seo-data.ts'), 'utf8');
const arabicContact = await read('pages/ArabicContactPage.tsx');
const [blogPosts, blogPostTemplate, macbookWhatsappIntent, brandsIndex] = await Promise.all([
  read('constants/blogPosts.ts'),
  read('pages/BlogPostTemplate.tsx'),
  read('utils/whatsappIntent.ts'),
  read('pages/BrandsIndex.tsx'),
]);

const [batteryHealthGuideSource, dellOverheatingGuideSource, gameBarGuideSource, windows10EndOfSupportGuideSource] = await Promise.all([
  read('pages/BatteryHealthGuide.tsx'),
  read('pages/DellLaptopOverheatingPage.tsx'),
  read('pages/GameBarPresenceWriterGuide.tsx'),
  read('pages/Windows10EndOfSupportGuide.tsx'),
]);

const getGraphEntity = (id) => {
  const start = graph.indexOf("'" + id + "': {");
  if (start < 0) return '';
  const next = graph.indexOf("\n    '", start + 1);
  return graph.slice(start, next < 0 ? graph.length : next);
};
const extractEntityDescriptions = (entity) =>
  [...entity.matchAll(/description:\s*'([^']*)'/g)].map((match) => match[1]);
const globalGuideSalesSignals = /\bKWD\b|\bKuwait\b|\bHawalli\b|\+965|wa\.me|tel:\+965|free pickup|free pick-up|pickup and delivery|no fix,\s*no fee|30[- ]day\s+(?:repair\s+)?warranty|\/book\b|\/locations?\b/i;

const getTopLevelBlogPost = (id) => {
  const marker = `"id": "${id}"`;
  const start = blogPosts.indexOf(marker);
  if (start < 0) return '';
  const objectStart = blogPosts.lastIndexOf('\n  {', start);
  const objectEnd = blogPosts.indexOf('\n  },', start);
  return objectStart >= 0 && objectEnd > start ? blogPosts.slice(objectStart, objectEnd + 5) : '';
};
const windowsServicesGuideEntry = getTopLevelBlogPost('guide-windows-11-background-services-audit-2026');
const windowsSettingsGuideEntry = getTopLevelBlogPost('guide-windows-11-settings-tweaks-2026');

const getGuideContentBlock = (id) => {
  const marker = '"id": "' + id + '"';
  const start = blogPosts.indexOf(marker);
  if (start < 0) return '';
  const contentType = blogPosts.indexOf('"contentType": "guide"', start);
  const end = [blogPosts.indexOf('\n  },', contentType), blogPosts.indexOf('\n},', contentType)]
    .filter((index) => index >= 0)
    .sort((a, b) => a - b)[0];
  return contentType >= 0 && end > start ? blogPosts.slice(start, end) : '';
};
const gamingPowerGuideEntry = getGuideContentBlock('guide-gaming-pc-not-turning-on-kuwait');
const gamingNoDisplayGuideEntry = getGuideContentBlock('guide-gaming-pc-black-screen-no-display-kuwait');
const gpuArtifactsGuideEntry = getGuideContentBlock('guide-gaming-gpu-artifacts-repair-kuwait');
const gamingShutdownGuideEntry = getGuideContentBlock('guide-gaming-pc-random-shutdown-kuwait');
const bitlockerGuideEntry = getGuideContentBlock('guide-bitlocker-recovery-key-after-bios-update');

const getGuideEditorialCopy = (entry) => entry
  .replace(/^\s*"(?:id|slug|clusterParent|image|discoverImage)":.*$/gm, '')
  .replace(/https?:\/\/\S+/g, '');
const gamingPowerEditorialCopy = getGuideEditorialCopy(gamingPowerGuideEntry);
const gamingNoDisplayEditorialCopy = getGuideEditorialCopy(gamingNoDisplayGuideEntry);
const gpuArtifactsEditorialCopy = getGuideEditorialCopy(gpuArtifactsGuideEntry);
const gamingShutdownEditorialCopy = getGuideEditorialCopy(gamingShutdownGuideEntry);
const bitlockerEditorialCopy = getGuideEditorialCopy(bitlockerGuideEntry);
const semanticAutoLinker = await read('utils/linkGraph.tsx');

const salmiyaConfigStart = arabicCommercial.indexOf("'computer-repair-salmiya': {");
const salmiyaConfigEnd = arabicCommercial.indexOf("'computer-repair-farwaniya': {", salmiyaConfigStart + 1);
const salmiyaConfig = salmiyaConfigStart >= 0 && salmiyaConfigEnd > salmiyaConfigStart
  ? arabicCommercial.slice(salmiyaConfigStart, salmiyaConfigEnd)
  : '';

const laptopGraphStart = graph.indexOf("'srv-laptop': {");
const laptopGraphEnd = graph.indexOf("'srv-desktop-pc': {", laptopGraphStart + 1);
const laptopServiceEntityForChecks =
  laptopGraphStart >= 0 && laptopGraphEnd > laptopGraphStart
    ? graph.slice(laptopGraphStart, laptopGraphEnd)
    : '';

const surraGraphStart = graph.indexOf("'loc-surra': {");
const surraGraphEnd = graph.indexOf("'loc-khaitan': {", surraGraphStart + 1);
const surraEntity =
  surraGraphStart >= 0 && surraGraphEnd > surraGraphStart
    ? graph.slice(surraGraphStart, surraGraphEnd)
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
const surraRelationshipStart = locationRelationships.indexOf('  surra: {');
const surraRelationshipEnd = locationRelationships.indexOf('  khaitan: {', surraRelationshipStart + 1);
const surraRelationship =
  surraRelationshipStart >= 0 && surraRelationshipEnd > surraRelationshipStart
    ? locationRelationships.slice(surraRelationshipStart, surraRelationshipEnd)
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
  has(graph, "description: 'Test GameBarPresenceWriter.exe with a repeatable frame-time comparison; review Game Bar settings, Game DVR policy scope and registry risks.'") &&
  has(graph, 'description: "Diagnose failed BIOS and UEFI updates, black screens and no-POST faults. Compare OEM recovery methods, SPI programming, TPM and BitLocker risks."') &&
  has(graph, "title: 'Intel Core Ultra vs Ryzen AI: 2026 Laptop Guide | KCROC'"));
add('English and Arabic pricing language switch is reciprocal', locale.includes("'/pricing': '/ar/pricing'") && locale.includes("'/ar/pricing': '/pricing'"));
const [biosGuideEnSource, biosGuideArSource] = await Promise.all([
  read('pages/BiosUefiRecoveryGuide.tsx'),
  read('pages/BiosUefiRecoveryGuideAR.tsx'),
]);
const biosGuideEnEntityStart = graph.indexOf("    'guide-bios-uefi': {");
const biosGuideEnEntityEnd = graph.indexOf("    'guide-intel-vs-amd': {", biosGuideEnEntityStart + 1);
const biosGuideArEntityStart = graph.indexOf("    'guide-bios-uefi-ar': {");
const biosGuideArEntityEnd = graph.indexOf("    'guide-laptop-buying-ar': {", biosGuideArEntityStart + 1);
const biosGuideEnEntity = graph.slice(biosGuideEnEntityStart, biosGuideEnEntityEnd);
const biosGuideArEntity = graph.slice(biosGuideArEntityStart, biosGuideArEntityEnd);
const biosFaqArray = biosGuideEnSource.match(/const faq = \[([\s\S]*?)\n\];/);
const biosFaqCount = biosFaqArray ? (biosFaqArray[1].match(/\{ q:/g) || []).length : 0;
const biosFeaturedFaqBlock = biosGuideEnEntity.match(/featuredFAQIds: \[([\s\S]*?)\]/);
const biosFeaturedFaqCount = biosFeaturedFaqBlock ? (biosFeaturedFaqBlock[1].match(/'faq-bios-[^']+'/g) || []).length : 0;
add('BIOS/UEFI English guide is globally targeted, preserves its indexed URL and pairs with the Arabic guide',
  biosGuideEnEntity.includes("locale: 'en'") &&
  biosGuideEnEntity.includes("'en': 'https://www.computerrepairkuwait.com/guides/bios-uefi-recovery-kuwait'") &&
  biosGuideEnEntity.includes("'ar': 'https://www.computerrepairkuwait.com/guides/ar/bios-uefi-recovery-kuwait'") &&
  biosGuideEnEntity.includes("'x-default': 'https://www.computerrepairkuwait.com/guides/bios-uefi-recovery-kuwait'") &&
  !biosGuideEnEntity.includes('en-KW') && !biosGuideEnEntity.includes('ar-KW') &&
  biosGuideEnEntity.includes("schemaTypes: ['TechArticle', 'FAQPage', 'BreadcrumbList']") &&
  biosGuideArEntity.includes("locale: 'ar'") &&
  biosGuideArEntity.includes("'en': 'https://www.computerrepairkuwait.com/guides/bios-uefi-recovery-kuwait'") &&
  biosGuideArEntity.includes("'ar': 'https://www.computerrepairkuwait.com/guides/ar/bios-uefi-recovery-kuwait'") &&
  biosGuideEnSource.includes('hrefLang="ar"') &&
  biosGuideArSource.includes('hrefLang="en"') &&
  biosGuideArSource.includes('hrefLang="ar"'));
add('BIOS/UEFI guide keeps all 18 FAQ answers in rendered page markup and all 18 FAQ IDs in graph-backed schema',
  biosFaqCount === 18 &&
  biosFeaturedFaqCount === 18 &&
  biosGuideEnEntity.includes("'faq-bios-bitlocker-after-success'") &&
  biosGuideEnEntity.includes("'faq-bios-intake-before-technician'") &&
  graph.includes("'faq-bios-bitlocker-after-success'") &&
  graph.includes("'faq-bios-intake-before-technician'") &&
  biosGuideEnSource.includes('<p className="mt-3 pr-8 text-xs leading-6 text-slate-400 sm:text-sm">{item.a}</p>'));
add('English technical guides use a shared global editorial shell while Arabic guide routes remain excluded',
  guideRouteRules.includes("pathname === '/guides' || (pathname.startsWith('/guides/') && !pathname.startsWith('/guides/ar/'))") &&
  header.includes('const isGlobalTechnicalGuide = isEnglishTechnicalGuideRoute(location.pathname)') &&
  header.includes('hideConversionActions={hideConversionActions}') &&
  mobileMenu.includes('hideConversionActions?: boolean') &&
  mobileMenu.includes('{!hideConversionActions && (') &&
  rootLayout.includes('isEnglishTechnicalGuideRoute(pathname)') &&
  rootLayout.includes('{!hideConversionActions && (') &&
  header.includes("['nav_blog', 'nav_news', 'nav_guides', 'nav_about', 'nav_gallery'].includes(link.id)") &&
  footer.includes('const isGlobalTechnicalGuide = isEnglishTechnicalGuideRoute(location.pathname)') &&
  footer.includes('if (isGlobalEditorialArticle || isGlobalTechnicalGuide)') &&
  footer.includes('KCROC Hardware Engineering Lab') &&
  footer.includes('Technical Guides') &&
  blogPostTemplate.includes("GLOBAL_EDITORIAL_AUTOLINK_EXCLUSIONS = ['page-privacy']") &&
  blogPostTemplate.includes('excludeEntityIds={isGlobalEditorialArticle ? GLOBAL_EDITORIAL_AUTOLINK_EXCLUSIONS : undefined}') &&
  semanticAutoLinker.includes('excludeEntityIds?.includes(entity.id)'));

add('English Windows services/settings guides contain no Kuwait-local repair or pickup promotion',
  windowsServicesGuideEntry.includes('The same evidence-first principle applies to Windows troubleshooting generally: measure first, change second.') &&
  windowsServicesGuideEntry.includes('hot, dusty environments') &&
  windowsSettingsGuideEntry.includes("When Settings Changes Aren't Enough") &&
  windowsSettingsGuideEntry.includes('Review Windows Update history') &&
  !/\bKuwait\b|\bHawalli\b|free pickup|No Fix, No Fee|Computer Repair Kuwait|wa\.me|tel:\+965/.test(windowsServicesGuideEntry) &&
  !/\bKuwait\b|\bHawalli\b|free pickup|No Fix, No Fee|Computer Repair Kuwait|wa\.me|tel:\+965/.test(windowsSettingsGuideEntry) &&
  graph.includes('An evidence-led review of Windows 11 settings for privacy, startup, battery life, gaming and security'));

add('English gaming-PC guides keep diagnostic content without local collection, warranty or unsupported GPU-repair offers',
  gamingPowerGuideEntry.includes('When controlled hardware diagnosis is needed') &&
  gamingNoDisplayGuideEntry.includes('Environmental Factors: Heat, Dust & Safe Handling') &&
  gamingNoDisplayGuideEntry.includes('What a useful no-display diagnosis should establish') &&
  gpuArtifactsGuideEntry.includes('When specialist hardware assessment is warranted') &&
  gamingShutdownGuideEntry.includes('When controlled hardware diagnosis is needed') &&
  !/\bKuwait\b|\bHawalli\b|free pickup|No Fix, No Fee|KWD|KCROC's published service|GPU Repair Kuwait|wa\.me|tel:\+965/i.test([
    gamingPowerEditorialCopy, gamingNoDisplayEditorialCopy, gpuArtifactsEditorialCopy, gamingShutdownEditorialCopy
  ].join(' ')) &&
  !/KCROC.{0,100}(?:GPU|VRAM|BGA|graphics-card|pickup|collection|repair service)/i.test(gpuArtifactsEditorialCopy) &&
  !gpuArtifactsEditorialCopy.includes('GPU Repair Kuwait'));

add('BitLocker guide separates recovery-key education from local repair promotion',
  bitlockerGuideEntry.includes('When to stop firmware troubleshooting') &&
  bitlockerGuideEntry.includes('A BitLocker recovery prompt itself does not prove that the BIOS update failed.') &&
  !/\bKuwait\b|\bHawalli\b|free pickup|No Fix, No Fee|KCROC checks|wa\.me|tel:\+965/i.test(bitlockerEditorialCopy));

add('BIOS/UEFI English guide removes Kuwait pricing and local-service anchors and includes the printable intake / hardware-escalation tools',
  !/\bKWD\b|\bKuwait\b|\+965|wa\.me|repair in Kuwait|motherboard-repair-kuwait|laptop-repair-kuwait|pricing#/.test(biosGuideEnSource) &&
  biosGuideEnSource.includes('Print / Save as PDF') &&
  biosGuideEnSource.includes('Official support guidance') &&
  biosGuideEnSource.includes('id="hardware-escalation"') &&
  biosGuideEnSource.includes('id="pre-recovery-checklist"'));

const globalGuideTargets = [
  { route: 'guides/laptop-battery-warning-signs', id: 'guide-battery', page: batteryHealthGuideSource },
  { route: 'guides/dell-laptop-overheating', id: 'guide-dell-laptop-overheating', page: dellOverheatingGuideSource },
  { route: 'guides/gamebar-presence-writer-fix', id: 'guide-gamebar-presence-writer', page: gameBarGuideSource },
  { route: 'guides/windows-10-end-of-support', id: 'guide-windows-10-eos', page: windows10EndOfSupportGuideSource },
];
add('Battery, Dell overheating, GameBar and Windows 10 guides keep global copy, stable URLs, KCROC authorship and article/FAQ/breadcrumb schema',
  globalGuideTargets.every(({ route, id, page }) => {
    const entity = getGraphEntity(id);
    const descriptions = extractEntityDescriptions(entity);
    const schemaSource = entity + '\n' + page;
    return app.includes("path: '" + route + "'") &&
      entity.includes("canonicalUrl: 'https://www.computerrepairkuwait.com/" + route + "'") &&
      entity.includes("locale: 'en'") &&
      descriptions.length >= 2 &&
      descriptions.every((description) => !globalGuideSalesSignals.test(description)) &&
      !globalGuideSalesSignals.test(page) &&
      schemaSource.includes('KCROC') &&
      /TechArticle|Article/.test(schemaSource) &&
      schemaSource.includes('FAQPage') &&
      schemaSource.includes('BreadcrumbList');
  }));


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

add('Arabic Salmiya location cards have explicit Arabic titles and descriptions for all five service types',
  salmiyaConfig.includes('serviceCardCopy: {') &&
  ['srv-laptop', 'srv-macbook', 'srv-motherboard', 'srv-screen', 'srv-battery'].every((id) => salmiyaConfig.includes(id)) &&
  !salmiyaConfig.includes('Laptop Repair') &&
  !salmiyaConfig.includes('MacBook Repair'));

add('MacBook service separates selected-work starting price, board-level range, screen labour and replacement-board quotation',
  has(serviceTemplate, 'Selected MacBook work from 25 KWD') &&
  has(serviceTemplate, '45–100+ KWD') &&
  has(serviceTemplate, 'Labour from 30 KWD + display assembly') &&
  has(serviceTemplate, 'Quote after model and parts check') &&
  has(serviceTemplate, 'data remains associated with the original board') &&
  has(serviceTemplate, 'A2337, A2681, A2941, A3113 and A3114'));

add('English and Arabic MacBook repair WhatsApp paths request exact model, symptoms, data priority and collection area',
  has(serviceTemplate, 'A-number if known') &&
  has(serviceTemplate, 'Is existing data especially important?') &&
  has(macbookWhatsappIntent, "if (slug === 'macbook-repair-kuwait')") &&
  has(macbookWhatsappIntent, "if (path === '/macbook-repair-kuwait')") &&
  has(macbookWhatsappIntent, 'هل توجد بيانات مهمة'));

add('Brand hub surfaces graph-backed models, symptom examples and configured starting prices',
  brandsIndex.includes('brand.commonModels') &&
  brandsIndex.includes('brand.commonIssues') &&
  brandsIndex.includes('brand.pricing?.displayLabel') &&
  brandsIndex.includes('to="/pricing"'));

add('Wi-Fi guides identify KCROC hardware-only service scope and exclude router, ISP and external-network support',
  blogPosts.includes('KCROC service scope') &&
  blogPosts.includes('does not configure routers, modems, VPNs or external networks') &&
  blogPosts.includes('does not repair or configure routers, modems, ISP connections'));

add('DPC and thermal articles link to symptom-matched existing repair pages and published pricing',
  blogPostTemplate.includes("'dpc-latency-gaming-stutter': {") &&
  blogPostTemplate.includes("'/gaming-laptop-cleaning-kuwait'") &&
  blogPostTemplate.includes("'/gaming-pc-repair-kuwait'") &&
  blogPostTemplate.includes("'/pricing'"));


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
  salmiyaEntity.includes("relatedLocationIds: ['loc-hawalli', 'loc-rumaithiya', 'loc-nuzha', 'loc-kuwait-city', 'loc-surra']") &&
  salmiyaEntity.includes("serviceAreas: ['Salmiya', 'Bidaa', 'Salwa']") &&
  !salmiyaEntity.includes('The Salmiya service area also covers Rumaithiya, Salwa'));
add('Salmiya connects existing gaming services and a high-intent overheating problem card',
  salmiyaRelationship.includes("'srv-gaming'") &&
  salmiyaRelationship.includes("'srv-gaming-laptop-cleaning'") &&
  salmiyaRelationship.includes("'problem-overheating'") &&
  salmiyaRelationship.includes("'loc-rumaithiya'") &&
  salmiyaRelationship.includes("'loc-nuzha'") &&
  salmiyaRelationship.includes("'loc-surra'") &&
  !salmiyaRelationship.includes("'loc-salmiya'") &&
  locations.includes('Gaming Laptop Overheating, Loud Fans, or GPU Black Screen'));

add('Salmiya has a three-step liquid-spill protocol and four published pricing anchors rendered by the shared template',
  (salmiyaEntity.match(/id: 'faq-salmiya-local-/g) || []).length === 10 &&
  salmiyaEntity.includes('localEmergencyProtocol: {') &&
  ['Disconnect power and shut down', 'Keep it off—no rice, heat or testing', 'Tell us what spilled and arrange pickup'].every((step) => salmiyaEntity.includes(step)) &&
  ['FREE', '15–20 KWD', 'From 25 KWD', '35–90+ KWD'].every((price) => salmiyaEntity.includes(price)) &&
  locationTypeSchema.includes('localEmergencyProtocol: z.object({') &&
  locationTypeSchema.includes('localPricingAnchors: z.array(z.object({') &&
  locations.includes('location.localEmergencyProtocol.steps.map') &&
  locations.includes('location.localPricingAnchors.map'));
add('Salmiya keeps all seven existing canonical service cards and adds verified block-level coastal postal references',
  ['srv-laptop', 'srv-macbook', 'srv-liquid-damage', 'srv-motherboard', 'srv-screen', 'srv-gaming', 'srv-gaming-laptop-cleaning'].every((id) => salmiyaEntity.includes(id)) &&
  ['20000', '20001', '20012', '25000', '25001', '25010', '25600', '25601', '25612'].every((code) => salmiyaEntity.includes(code)) &&
  salmiyaEntity.includes("areaPostalRegion: 'Hawalli Governorate'") &&
  seoEngine.includes('location.additionalAreaPostalCodes') &&
  seoEngine.includes('"postalCode": area.postalCode') &&
  !salmiyaEntity.includes('10 minutes') &&
  !salmiyaEntity.includes('1 to 2 hours'));
add('Salmiya nearby-location cards exclude the current page and replace its former self-link with Nuzha',
  locations.includes('related.id !== location.id') &&
  salmiyaRelationship.includes("'loc-nuzha'") &&
  !salmiyaRelationship.includes("'loc-salmiya'"));

add('Surra is a dedicated four-district collection hub with nine local FAQs and the existing canonical URL',
  surraEntity.includes("heroHeadline: 'Computer & MacBook Repair in Surra, Jabriya, Qadsiya & Shaab'") &&
  surraEntity.includes("canonicalUrl: 'https://www.computerrepairkuwait.com/location/surra'") &&
  surraEntity.includes("localPickupHeading: 'Four-district collection. Repairs at our Hawalli workshop.'") &&
  (surraEntity.match(/id: 'faq-surra-local-/g) || []).length === 9 &&
  surraEntity.includes('Surra, Jabriya, Qadsiya and Shaab') &&
  !surraEntity.includes('within 5–10 minutes') &&
  !surraEntity.includes('within 1 to 2 hours'));
add('Surra retains five canonical repair-service cards with current pricing anchors',
  ['srv-laptop', 'srv-macbook', 'srv-motherboard', 'srv-screen', 'srv-charging-port'].every((id) => surraEntity.includes(id)) &&
  surraEntity.includes('localServiceCards:') &&
  surraEntity.includes('localPricingAnchors:') &&
  ['15–20 KWD', 'From 20 KWD', 'From 25 KWD', 'From 30 KWD + panel'].every((price) => surraEntity.includes(price)));
add('Surra postal Place data covers all four districts with governorate-specific schema regions',
  ['45400', '45401', '45402', '45404', '45405', '45406',
    '46300', '46301', '46312', '35700', '35701', '35709', '35900', '35901', '35909']
    .every((code) => surraEntity.includes(code)) &&
  surraEntity.includes("areaPostalRegion: 'Capital Governorate'") &&
  !surraEntity.includes("postalCode: '45403'") &&
  locationTypeSchema.includes('addressRegion: z.string().optional()') &&
  seoEngine.includes('area.addressRegion || location.areaPostalRegion'));
add('Surra uses the shared location template for dedicated FAQ schema and a clean four-district pickup heading',
  locations.includes("'salmiya', 'surra'") &&
  locations.includes('location.localPickupHeading ||') &&
  locations.includes('replace(/^Mobile Dispatch Area\\s*\\(') &&
  locations.includes('location.localFaqs ?? []'));
add('Surra internal links point to the Hawalli lab and active nearby locations, not redirected Jabriya URLs',
  surraRelationship.includes("'loc-hawalli'") &&
  surraRelationship.includes("'loc-qortuba'") &&
  !surraRelationship.includes("'loc-jabriya'") &&
  locations.includes('related.id !== location.id'));

add('Consolidated location pages are inactive, hidden from the hub and routed to surviving pickup areas',
  ['loc-saad-al-abdullah', 'loc-fintas', 'loc-jabriya', 'loc-salwa', 'loc-ardiya', 'loc-rawda'].every((id) => new RegExp("'" + id + "': \\{[^}]*isActive: false").test(graph)) &&
  !locations.includes('/location/fintas') &&
  !locations.includes('/location/jabriya') &&
  !locations.includes('/location/salwa') &&
  !locations.includes('/location/ardiya') &&
  !locations.includes('/location/rawda') &&
  JSON.parse(vercelConfig).redirects.some((r) => r.source === '/location/fintas' && r.destination === '/location/fahaheel' && r.permanent === true) &&
  JSON.parse(vercelConfig).redirects.some((r) => r.source === '/location/jabriya' && r.destination === '/location/surra' && r.permanent === true) &&
  JSON.parse(vercelConfig).redirects.some((r) => r.source === '/location/salwa' && r.destination === '/location/salmiya' && r.permanent === true) &&
  JSON.parse(vercelConfig).redirects.some((r) => r.source === '/location/ardiya' && r.destination === '/location/farwaniya' && r.permanent === true) &&
  JSON.parse(vercelConfig).redirects.some((r) => r.source === '/location/rawda' && r.destination === '/location/adailiya' && r.permanent === true));

add('Priority neighbourhood pages are active in the graph and directory',
  ['shuwaikh-residential', 'abdullah-al-salem', 'shamiya', 'nuzha', 'adailiya', 'kaifan', 'yarmouk', 'qortuba', 'mishref'].every((slug) => {
    const start = graph.indexOf("'loc-" + slug + "': {");
    const entry = start >= 0 ? graph.slice(start, start + 220) : '';
    return (entry.includes("slug:'" + slug + "'") || entry.includes("slug: '" + slug + "'")) &&
      /isActive:\s*true/.test(entry);
  }) &&
  locationDirectory.includes('location.isActive !== false') &&
  locations.includes('l.isActive !== false'));

const shuwaikhStart = graph.indexOf("'loc-shuwaikh-residential': {");
const shuwaikhEnd = graph.indexOf("} as LocationEntity", shuwaikhStart);
const shuwaikhEntity = shuwaikhStart >= 0 && shuwaikhEnd > shuwaikhStart
  ? graph.slice(shuwaikhStart, shuwaikhEnd)
  : '';

add('Shuwaikh B page uses the concierge hero, privacy/SSD content, four linked service cards and block-aware coverage',
  shuwaikhEntity.includes('heroBadge:') &&
  shuwaikhEntity.includes("areaPostalCode: '70000'") &&
  shuwaikhEntity.includes('localServiceCards:') &&
  shuwaikhEntity.includes('70001–70006') &&
  shuwaikhEntity.includes('70051–70060') &&
  shuwaikhEntity.includes('NVMe') &&
  shuwaikhEntity.includes('No Fix, No Fee') &&
  locations.includes('location.localServiceCards?.length') &&
  locations.includes('location.heroHeadline ||') &&
  !shuwaikhEntity.includes('15 to 20 minutes') &&
  !shuwaikhEntity.includes('1 to 3 hours'));

add('Generated SEO projection retains Shuwaikh B service types, description and area postal code',
  seoProjection.includes('"areaPostalCode": "70000"') &&
  seoProjection.includes('"serviceTypes": [') &&
  seoProjection.includes('"MacBook logic-board diagnostics and micro-soldering"') &&
  seoProjection.includes('Component-level MacBook, laptop and gaming PC repair for Shuwaikh Residential'));

const abdullahStart = graph.indexOf("'loc-abdullah-al-salem': {");
const abdullahEnd = graph.indexOf("} as LocationEntity", abdullahStart);
const abdullahEntity = abdullahStart >= 0 && abdullahEnd > abdullahStart
  ? graph.slice(abdullahStart, abdullahEnd)
  : '';

add('Abdullah Al-Salem page has distinct Al-Dahiya charging, crash, privacy and four-block content',
  abdullahEntity.includes("areaPostalCode: '72100'") &&
  abdullahEntity.includes('72101–72104') &&
  abdullahEntity.includes('Power Delivery controller') &&
  abdullahEntity.includes('freezing, blue screens, kernel panics') &&
  abdullahEntity.includes('localServiceCards:') &&
  abdullahEntity.includes('SSD-retention option') &&
  abdullahEntity.includes('Dhahiyat Abdullah Al-Salem') &&
  !abdullahEntity.includes('This is a service-area page, not a local branch listing.') &&
  !abdullahEntity.includes('15 minutes'));

add('Abdullah Al-Salem generated SEO projection retains 72100 postal code and its power/stability service taxonomy',
  seoProjection.includes('"areaPostalCode": "72100"') &&
  seoProjection.includes('"USB-C Power Delivery and DC charging-port diagnostics"') &&
  seoProjection.includes('"Computer Repair Abdullah Al-Salem (Al-Dahiya) | KCROC"') &&
  seoProjection.includes('USB-C charging, MacBook logic-board and random-crash diagnostics'));

add('Requested Abdullah Al-Salem URL redirects to the existing canonical location page',
  JSON.parse(vercelConfig).redirects.some((r) =>
    r.source === '/computer-repair-abdullah-al-salem' &&
    r.destination === '/location/abdullah-al-salem' &&
    r.permanent === true
  ));

add('Abdullah Al-Salem page replaces generic location FAQs with its six area-specific questions',
  locations.includes("['abdullah-al-salem', 'shamiya', 'nuzha', 'adailiya', 'kuwait-city', 'salmiya', 'surra', 'farwaniya'].includes(location.slug)") &&
  locations.includes('usesDedicatedLocationFaqs ? [] : sharedLocationFaqs') &&
  abdullahEntity.includes('faq-abdullah-al-salem-6') &&
  abdullahEntity.includes('Can you diagnose random freezing'));

const shamiyaStart = graph.indexOf("'loc-shamiya': {");
const shamiyaEnd = graph.indexOf("} as LocationEntity", shamiyaStart);
const shamiyaEntity = shamiyaStart >= 0 && shamiyaEnd > shamiyaStart
  ? graph.slice(shamiyaStart, shamiyaEnd)
  : '';

add('Shamiya page has its own screen/backlight, battery, desktop tower and block-level collection positioning',
  shamiyaEntity.includes("areaPostalCode: '71500'") &&
  shamiyaEntity.includes('71501–71509') &&
  shamiyaEntity.includes('Shamiya Blocks 1–9') &&
  shamiyaEntity.includes('backlight circuit') &&
  shamiyaEntity.includes('Full-Tower Desktop PC & Workstation Diagnostics') &&
  shamiyaEntity.includes('SSD-retention option') &&
  shamiyaEntity.includes('Shamiya & Shuwaikh Cooperative Society') &&
  shamiyaEntity.includes('First and Second Ring Roads') &&
  !shamiyaEntity.includes('not a KCROC branch location') &&
  !shamiyaEntity.includes('not at a Shamiya storefront') &&
  !shamiyaEntity.includes('10 to 15 minutes') &&
  !shamiyaEntity.includes('Shamiya Gate') &&
  !shamiyaEntity.includes('Airport Road (Route 50)'));

add('Generated SEO projection retains Shamiya postal code, screen/battery/desktop service types and title',
  seoProjection.includes('"areaPostalCode": "71500"') &&
  seoProjection.includes('"Laptop and MacBook screen, display-cable and backlight diagnostics"') &&
  seoProjection.includes('"Desktop PC and workstation hardware diagnostics"') &&
  seoProjection.includes('Computer, MacBook & PC Repair Shamiya | Free Pickup | KCROC'));

add('Requested Shamiya URL redirects to the existing canonical location page',
  JSON.parse(vercelConfig).redirects.some((r) =>
    r.source === '/computer-repair-shamiya' &&
    r.destination === '/location/shamiya' &&
    r.permanent === true
  ));

add('Shamiya page uses six dedicated local FAQs without the shared shop/pickup/cost/turnaround block',
  locations.includes("['abdullah-al-salem', 'shamiya', 'nuzha', 'adailiya', 'kuwait-city', 'salmiya', 'surra', 'farwaniya'].includes(location.slug)") &&
  locations.includes('usesDedicatedLocationFaqs ? [] : sharedLocationFaqs') &&
  shamiyaEntity.includes('faq-shamiya-6') &&
  shamiyaEntity.includes('black screen') &&
  shamiyaEntity.includes('full-tower desktop PC'));

const nuzhaStart = graph.indexOf("'loc-nuzha': {");
const nuzhaEnd = graph.indexOf("} as LocationEntity", nuzhaStart);
const nuzhaEntity = nuzhaStart >= 0 && nuzhaEnd > nuzhaStart
  ? graph.slice(nuzhaStart, nuzhaEnd)
  : '';

add('Nuzha page focuses on thermal shutdown, complete charging path, three blocks and local collection',
  nuzhaEntity.includes("areaPostalCode: '72900'") &&
  nuzhaEntity.includes('72901, 72902 and 72903') &&
  nuzhaEntity.includes('Nuzha Blocks 1–3') &&
  nuzhaEntity.includes('Honeywell PTM7950') &&
  nuzhaEntity.includes('Arctic MX-6') &&
  nuzhaEntity.includes('adapter and USB-C/DC port through its charging controller') &&
  nuzhaEntity.includes('removable NVMe or SATA drive') &&
  nuzhaEntity.includes('Nuzha Cooperative Society') &&
  nuzhaEntity.includes('Mohammed Bin La’aboun Street') &&
  !nuzhaEntity.includes('73000') &&
  !nuzhaEntity.includes('Marzouq Al-Badr') &&
  !nuzhaEntity.includes('5 to 10 minutes') &&
  !nuzhaEntity.includes('60 to 120 minutes') &&
  !nuzhaEntity.includes('10 minutes'));

add('Nuzha generated SEO projection retains corrected postal code, thermal/power service types and title',
  seoProjection.includes('"areaPostalCode": "72900"') &&
  seoProjection.includes('"Laptop overheating, thermal throttling and heat-related shutdown diagnostics"') &&
  seoProjection.includes('"Charging-controller, power-rail and battery-path testing"') &&
  seoProjection.includes('Laptop Overheating & MacBook Repair Nuzha | Free Pickup | KCROC'));

add('Requested Nuzha URL redirects to the existing canonical location page',
  JSON.parse(vercelConfig).redirects.some((r) =>
    r.source === '/computer-repair-nuzha' &&
    r.destination === '/location/nuzha' &&
    r.permanent === true
  ));

add('Nuzha page uses six dedicated thermal/power/privacy FAQs instead of the shared location FAQ block',
  locations.includes("['abdullah-al-salem', 'shamiya', 'nuzha', 'adailiya', 'kuwait-city', 'salmiya', 'surra', 'farwaniya'].includes(location.slug)") &&
  locations.includes('usesDedicatedLocationFaqs ? [] : sharedLocationFaqs') &&
  nuzhaEntity.includes('faq-nuzha-6') &&
  nuzhaEntity.includes('gets hot, runs loud fans and shuts down') &&
  nuzhaEntity.includes('charging controller and input-power circuitry'));

const adailiyaStart = graph.indexOf("'loc-adailiya': {");
const adailiyaEnd = graph.indexOf("} as LocationEntity", adailiyaStart);
const adailiyaEntity = adailiyaStart >= 0 && adailiyaEnd > adailiyaStart
  ? graph.slice(adailiyaStart, adailiyaEnd)
  : '';

add('Adailiya and Rawda page uses verified postal blocks, board-first diagnosis, five services and local anchors',
  adailiyaEntity.includes("areaPostalCode: '73100'") &&
  adailiyaEntity.includes('73101–73105') &&
  adailiyaEntity.includes('73300') &&
  adailiyaEntity.includes('73301–73305') &&
  adailiyaEntity.includes('serviceAreas: [') &&
  adailiyaEntity.includes("'Adailiya', 'Rawda'") &&
  adailiyaEntity.includes('Kazma Sporting Club') &&
  adailiyaEntity.includes('Sami Ahmad Al-Munayes Street') &&
  adailiyaEntity.includes('Adailiya Water Towers') &&
  adailiyaEntity.includes('Jamal Abdul Nasser Park') &&
  adailiyaEntity.includes('Third and Fourth Ring Roads') &&
  adailiyaEntity.includes('localServiceCards: [') &&
  (adailiyaEntity.match(/serviceIds: \[/g) || []).length === 5 &&
  adailiyaEntity.includes('Dead board or black screen? Diagnose the difference first') &&
  adailiyaEntity.includes('removable NVMe or SATA SSD') &&
  adailiyaEntity.includes("additionalAreaPostalCodes: [{ name: 'Rawda', postalCode: '73300' }]") &&
  adailiyaEntity.includes('Block 5: 73105') &&
  adailiyaEntity.includes('Block 5 is 73305') &&
  seoProjection.includes('"additionalAreaPostalCodes": [') &&
  seoProjection.includes('"postalCode": "73300"') &&
  seoEngine.includes('location.additionalAreaPostalCodes') &&
  seoEngine.includes('"addressLocality": area.name') &&
  seoGenerator.includes('additionalAreaPostalCodes: e.additionalAreaPostalCodes ?? []') &&
  !adailiyaEntity.includes('This page describes a mobile pickup service') &&
  !adailiyaEntity.includes('8 to 12 minutes') &&
  !adailiyaEntity.includes('10-Minute'));

add('Adailiya and Rawda generated SEO projection retains area code, dual-district taxonomy and metadata',
  seoProjection.includes('"areaPostalCode": "73100"') &&
  seoProjection.includes('"Laptop no-power and motherboard power-rail diagnostics"') &&
  seoProjection.includes('"MacBook logic-board and USB-C charging diagnostics"') &&
  seoProjection.includes('Computer & MacBook Repair Adailiya & Rawda | KCROC'));

add('Requested Adailiya URL redirects to the existing canonical dual-suburb page',
  JSON.parse(vercelConfig).redirects.some((r) =>
    r.source === '/computer-repair-adailiya' &&
    r.destination === '/location/adailiya' &&
    r.permanent === true
  ));

add('Adailiya page uses nine dedicated dual-suburb hardware and privacy FAQs',
  locations.includes("['abdullah-al-salem', 'shamiya', 'nuzha', 'adailiya', 'kuwait-city', 'salmiya', 'surra', 'farwaniya'].includes(location.slug)") &&
  locations.includes('usesDedicatedLocationFaqs ? [] : sharedLocationFaqs') &&
  adailiyaEntity.includes('faq-adailiya-9') &&
  adailiyaEntity.includes('dead motherboard and a laptop that turns on with a black screen') &&
  adailiyaEntity.includes('both Adailiya and Rawda') &&
  adailiyaEntity.includes('No Fix, No Fee'));

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
  ['/battery-replacement-kuwait', '/ar/laptop-battery-replacement-kuwait'],
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
  arabicHomeSource.includes('تصليح وصيانة الكمبيوتر واللابتوب في الكويت') &&
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
add('Arabic commercial page targets the technician query with free intake, free diagnosis and a quote before repair', has(graph, `title: 'فني كمبيوتر في الكويت | فحص واستلام مجاني | KCROC'`) && has(graph, `ننسق استلام الجهاز مجانًا من المنزل أو المكتب`) && has(graph, `فحصًا أوليًا مجانيًا وضمان 30 يومًا على الإصلاح المكتمل`) && seoProjection.includes('فني كمبيوتر في الكويت | فحص واستلام مجاني | KCROC') && seoProjection.includes('ننسق استلام الجهاز مجانًا من المنزل أو المكتب'));
add('Arabic technician head term: H1 on main Arabic commercial page', has(arabicCommercial, `h1: '${arH1}'`), `expected in src/pages/ArabicCommercialPage.tsx: h1: '${arH1}'`);
add('Arabic computer repair: visible H1 matches the technician search intent', arabicCommercial.includes(`                ${arH1}\n              </h1>`));
add('Arabic computer repair: full Hawalli workshop address is visible in local-service content', arabicCommercial.includes('شارع ابن خلدون، مجمع الملا، محل 19 في البدروم'));
add('Arabic commercial FAQ explicitly states that repairs are workshop-only', arabicCommercial.includes('لا نقدم إصلاحًا داخل المنزل أو زيارة فني للموقع') && arabicCommercial.includes('مختبر KCROC في حولي'));
add('Arabic commercial phone CTA displays a Kuwait country code, not a stray currency symbol', arabicCommercial.includes('+965 {business.telephone.replace(') && !arabicCommercial.includes('                  ${business.telephone.replace'));

add('Arabic nearby page targets proximity intent and links to the main service page', graph.includes("title: 'تصليح كمبيوتر بالقرب منك في الكويت | استلام مجاني | KCROC'") && nearMeAr.includes('تصليح كمبيوتر ولابتوب') && nearMeAr.includes('to="/ar/computer-repair-kuwait"'));
add('Arabic Hawalli snippet reflects technician queries, workshop location and free pickup', has(graph, "title: 'تصليح كمبيوتر حولي | فني كمبيوتر ولابتوب | KCROC") && has(graph, "تحتاج فني كمبيوتر في حولي؟ زر مختبر KCROC في مجمع الملا، شارع ابن خلدون، محل 19، أو اطلب الاستلام والتوصيل مجانًا. تشخيص واضح وضمان 30 يومًا.") && has(seoProjection, 'تصليح كمبيوتر حولي | فني كمبيوتر ولابتوب | KCROC') && has(seoProjection, 'تحتاج فني كمبيوتر في حولي؟ زر مختبر KCROC في مجمع الملا، شارع ابن خلدون، محل 19، أو اطلب الاستلام والتوصيل مجانًا. تشخيص واضح وضمان 30 يومًا.'));
add('HP service-center snippet includes independent status and a qualified from-price', graph.includes("title: 'HP Laptop Service Center Kuwait (Independent) | From 15 KWD | KCROC'") && seoProjection.includes('HP Laptop Service Center Kuwait (Independent) | From 15 KWD | KCROC') && graph.includes('not an official HP-authorized service center') && graph.includes('Selected repairs from 15 KWD where applicable'));

add('Arabic contact card displays the Hawalli lab address and opening hours fully in Arabic',
  arabicContact.includes('شارع ابن خلدون، مجمع الملا، السرداب، محل 19، حولي، الكويت') &&
  arabicContact.includes('يوميًا من 10 صباحًا إلى 10 مساءً') &&
  !arabicContact.includes('{business.streetAddress}، {business.addressLocality}، الكويت') &&
  !arabicContact.includes('{business.openingHours}'));
add('Arabic homepage metadata and hero now include native تصليح وصيانة intent without English category labels',
  has(graph, "title: 'تصليح وصيانة الكمبيوتر واللابتوب في الكويت | مختبر KCROC حولي'") &&
  seoProjection.includes('تصليح وصيانة الكمبيوتر واللابتوب في الكويت | KCROC') &&
  arabicHomeSource.includes('تصليح وصيانة الكمبيوتر واللابتوب في الكويت — نصلح المذربورد على مستوى القطعة') &&
  arabicHomeSource.includes('إصلاح المكونات الدقيقة عند ملاءمة ذلك'));
add('Dell and Lenovo service-center snippets use independent status and qualified selected-repair starting prices',
  graph.includes("title: 'Dell Laptop Service Center Kuwait (Independent) | From 15 KWD | KCROC'") &&
  seoProjection.includes('Dell Laptop Service Center Kuwait (Independent) | From 15 KWD | KCROC') &&
  graph.includes("title: 'Lenovo Laptop Service Center Kuwait (Independent) | From 15 KWD | KCROC'") &&
  seoProjection.includes('Lenovo Laptop Service Center Kuwait (Independent) | From 15 KWD | KCROC') &&
  graph.includes('not Dell-authorized') &&
  graph.includes('not Lenovo-authorized') &&
  graph.includes('Selected repairs from 15 KWD where applicable'));
const crackedScreenProblemStart = graph.indexOf("'problem-cracked-screen': {");
const crackedScreenProblemEnd = graph.indexOf("'problem-windows-wont-boot': {", crackedScreenProblemStart + 1);
const crackedScreenProblem = crackedScreenProblemStart >= 0 && crackedScreenProblemEnd > crackedScreenProblemStart ? graph.slice(crackedScreenProblemStart, crackedScreenProblemEnd) : '';
add('Cracked-screen page remains a symptom guide and avoids unsupported OEM or same-day promises',
  crackedScreenProblem.includes("title: 'Cracked Laptop Screen in Kuwait? Diagnosis & Repair | KCROC'") &&
  crackedScreenProblem.includes('model-compatible repair options') &&
  !crackedScreenProblem.includes('Same-Day') &&
  !crackedScreenProblem.includes('OEM-spec') &&
  !crackedScreenProblem.includes('often same-day'));

add('Arabic hreflang projection matches homepage alternate', graph.includes("'en-KW': 'https://www.computerrepairkuwait.com/'") && seoProjection.includes('\"en-KW\": \"https://www.computerrepairkuwait.com/\"'));
add('Homepage hero exposes one tracked Arabic commercial link shared by mobile and desktop', (hero.match(/hero_arabic_computer_repair/g) || []).length === 1 && (hero.match(/to="\/ar\/computer-repair-kuwait"/g) || []).length === 1);
add('Homepage Arabic links distinguish technician and near-me intent', serviceAreas.includes("{ label: 'فني كمبيوتر في الكويت', path: '/ar/computer-repair-kuwait' }") && serviceAreas.includes("{ label: 'تصليح كمبيوتر بالقرب مني', path: '/ar/near-me' }"));
add('English pricing snippet leads with qualified starting labor prices', graph.includes('Laptop screen labor from 30 KWD + panel; battery labor from 8 KWD + battery') && seoProjection.includes('Laptop screen labor from 30 KWD + panel; battery labor from 8 KWD + battery'));
add('Pricing hero visibly shows qualified prices with relevant service links', englishPricing.includes('From 30 KWD + panel') && englishPricing.includes('From 8 KWD + battery') && englishPricing.includes('to="/ssd-ram-upgrade-kuwait"'));

add('Arabic Farwaniya page has a shorter local search title, social image and fresh graph timestamp', graph.includes('title: "تصليح كمبيوتر الفروانية | فحص مجاني واستلام | KCROC"') && graph.includes("ogImage: 'https://www.computerrepairkuwait.com/images/laptop-repair-kuwait.webp'") && graph.includes("lastModified: '2026-10-29T00:00:00+03:00'") && seoProjection.includes("تصليح كمبيوتر الفروانية | فحص مجاني واستلام | KCROC") && seoProjection.includes("https://www.computerrepairkuwait.com/images/laptop-repair-kuwait.webp"));
add('Arabic Farwaniya page includes first-party repair photos, symptom guidance and pickup workflow', arabicCommercial.includes('laptopDcPowerJackConnectorReplacement') && arabicCommercial.includes('laptopScreenAssemblyDisassemblyRepair') && arabicCommercial.includes('رتب استلام مجاني من الفروانية') && arabicCommercial.includes('لا ترسل كلمة مرور أو بيانات حساسة'));
add('Arabic MacBook screen page targets repair and replacement intent with concise, qualified metadata', graph.includes("title: 'تصليح وتبديل شاشة ماك بوك في الكويت | MacBook Air وPro'") && graph.includes("title: 'تصليح وتبديل شاشة ماك بوك في الكويت | Air وPro | KCROC'") && graph.includes('شاشة MacBook مكسورة أو سوداء؟ فحص أولي مجاني') && graph.includes("'ar-KW': 'https://www.computerrepairkuwait.com/ar/macbook-screen-replacement-kuwait'") && arabicCommercial.includes('تبديل وتصليح شاشة ماك بوك (MacBook) في الكويت') && arabicCommercial.includes('كيف أحدد موديل الجهاز إذا كانت الشاشة سوداء؟'));
add('Generated Arabic MacBook SEO projection is synchronized with graph metadata, image and fresh timestamp', seoProjection.includes('تصليح وتبديل شاشة ماك بوك في الكويت | Air وPro | KCROC') && seoProjection.includes('فحص وتبديل شاشة ماك بوك وMacBook في مختبر KCROC بحولي الكويت') && seoProjection.includes('2026-10-31T00:00:00+03:00') && seoProjection.includes('Service') && seoProjection.includes('FAQPage'));
add('Arabic MacBook screen page contains symptom diagnostics, model examples and assembly-versus-panel guidance', arabicCommercial.includes('macbook-screen-model-numbers') && arabicCommercial.includes('A2337') && arabicCommercial.includes('A2681') && arabicCommercial.includes('A3113 / A3114') && arabicCommercial.includes('macbook-screen-assembly-options') && arabicCommercial.includes('هذه أسباب محتملة وليست تشخيصًا نهائيًا'));
add('Arabic MacBook screen conversion CTAs appear above the fold on both MacBook landing pages', arabicCommercial.includes("slug === 'macbook-screen-replacement-kuwait' && (") && arabicCommercial.includes('أرسل صورة الشاشة والجهاز عبر واتساب') && arabicCommercial.includes('to="/ar/macbook-screen-replacement-kuwait"'));
add('Arabic MacBook screen WhatsApp does not require a working display or a known model number', arabicCommercial.includes('إذا لم أعرف رقم الموديل أرجو مساعدتي في تحديده') && arabicCommercial.includes('لا تحتاج إلى تشغيل الجهاز أو فتح About This Mac'));
add('Arabic MacBook screen related-service cards provide Arabic battery and liquid-damage copy', arabicCommercial.includes('فحص وتبديل بطارية MacBook') && arabicCommercial.includes('فحص MacBook بعد انسكاب السوائل'));
add('Arabic MacBook screen page describes True Tone checks without universal calibration promises', arabicCommercial.includes('نختبر وظائف العرض التي يدعمها موديلك والقطعة المركبة') && arabicCommercial.includes('ولا نعد بأنه أرخص أو ممكن لكل جهاز'));
add('Arabic MacBook screen page clarifies labor-only pricing, Hawalli lab and Kuwait-wide pickup', arabicCommercial.includes('أجرة العمل من 30 د.ك لا تشمل الشاشة نفسها') && arabicCommercial.includes('مجمع الملا — السرداب، محل 19') && arabicCommercial.includes('هذه مناطق خدمة وليست فروعًا منفصلة'));
add('Arabic MacBook screen diagnostics explain qualified Flexgate/Dustgate and backlight-board possibilities', arabicCommercial.includes('Flexgate') && arabicCommercial.includes('Dustgate') && arabicCommercial.includes('Backlight IC') && arabicCommercial.includes('Lid Angle Sensor') && arabicCommercial.includes('هذه أسباب محتملة وليست تشخيصًا نهائيًا'));
add('Arabic MacBook model table includes Air, Apple Silicon Pro and legacy Intel A-numbers with display-family notes', arabicCommercial.includes('A2337') && arabicCommercial.includes('A2681') && arabicCommercial.includes('A2941') && arabicCommercial.includes('A3113 / A3114') && arabicCommercial.includes('A1706 / A1708 / A1989 / A2159 / A2251 / A2289') && arabicCommercial.includes('A1707 / A1990') && arabicCommercial.includes('A2141') && arabicCommercial.includes('Liquid Retina XDR'));
add('Arabic MacBook service schema uses canonical business entity and labor-only AggregateOffer/catalog', arabicCommercial.includes("name: 'تبديل وتصليح شاشة ماك بوك (MacBook) في الكويت'") && arabicCommercial.includes("'@type': 'AggregateOffer'") && arabicCommercial.includes('lowPrice: 30') && arabicCommercial.includes('hasOfferCatalog') && arabicCommercial.includes("provider: { '@id': `${business.websiteUrl}/#business` }") && arabicCommercial.includes('تبديل شاشة MacBook Air') && arabicCommercial.includes('تبديل شاشة MacBook Pro') && arabicCommercial.includes('دائرة الإضاءة الخلفية'));
add('Arabic MacBook page image captions distinguish the MacBook diagnostic photo from generic laptop screen work', arabicCommercial.includes('فني يفحص جهاز MacBook مفتوحًا في مختبر KCROC بحولي') && arabicCommercial.includes('صورة توضيحية لفك وفحص تجميعة شاشة لابتوب') && arabicCommercial.includes('loading="lazy"'));
add('Arabic routes localize the visible desktop header, pickup CTA, and skip link with RTL language context', header.includes("isArabicRoute ? 'احجز استلام مجاني' : 'Book Free Pickup'") && header.includes('dir={isArabicRoute ? "rtl" : undefined}') && navigationCompiler.includes("nav_pricing: { label: 'الأسعار'") && navigationCompiler.includes("nav_locations: { label: 'مناطق الخدمة'") && rootLayout.includes('تخطي إلى المحتوى الرئيسي'));
add('Arabic routes localize mobile navigation, sticky contact CTA and footer links/address', mobileMenu.includes('راسل فنيًا عبر واتساب') && mobileMenu.includes('dir={isArabicRoute ? "rtl" : undefined}') && stickyMobileCTA.includes('سعر تبديل شاشة ماك بوك') && stickyMobileCTA.includes('اتصل بـ KCROC') && footer.includes('تبديل شاشة ماك بوك') && footer.includes('شارع ابن خلدون، مجمع الملا، السرداب، محل 19، حولي، الكويت') && footer.includes('عرض جميع الخدمات') && footer.includes("'/gaming-pc-repair-kuwait': '/ar/gaming-pc-repair-kuwait'"));

add('Arabic Farwaniya service-area structured data points to the Hawalli workshop, not a fake branch', arabicCommercial.includes("const farwaniyaServiceSchema = slug === 'computer-repair-farwaniya'") && arabicCommercial.includes("name: 'KCROC repair workshop — Hawalli'") && arabicCommercial.includes("name: 'Al Farwaniyah Governorate, Kuwait'") && graph.includes('title: "تصليح كمبيوتر الفروانية | فحص مجاني واستلام | KCROC"'));
add('Farwaniya metadata, pickup-only entity and existing Arabic alternate stay synchronized',
  has(graph, "title: 'Computer & Laptop Repair Farwaniya | Free Pickup | KCROC'")
  && graph.includes('Computer, laptop, MacBook & motherboard repair for Farwaniya, Khaitan, Riggae & Ardiya.')
  && graph.includes("'loc-farwaniya': {")
  && graph.includes("isPhysicalLocation: false")
  && graph.includes("'ar-KW': 'https://www.computerrepairkuwait.com/ar/computer-repair-farwaniya'")
  && seoProjection.includes("Computer & Laptop Repair Farwaniya | Free Pickup | KCROC")
  && !graph.includes('/ar/location/farwaniya'));

add('Farwaniya money-page conversion modules stay graph-backed and within approved scope',
  graph.includes("heading: 'Transparent Repair Pricing & Turnaround for Farwaniya'")
  && graph.includes("localProblemDiagnostics: [")
  && graph.includes("localServiceCards: [")
  && graph.includes("localScopeNotice: {")
  && graph.includes("45–100+ KWD")
  && graph.includes("35–90+ KWD")
  && graph.includes("specialist data-recovery / dead-drive file-rescue services")
  && graph.includes("localFaqs: [")
  && graph.includes("faq-farwaniya-lab"));

add('Arabic Gaming PC metadata defines full-desktop scope and dedicated Open Graph artwork', graph.includes("title: 'تصليح Gaming PC في الكويت | فحص GPU ضمن الكمبيوتر الكامل | KCROC'") && graph.includes('لا نستقبل كروت شاشة منفصلة') && graph.includes("ogImage: '/images/custom-gaming-pc-teardown-and-diagnostics-workbench.webp'") && graph.includes("lastModified: '2026-11-01T00:00:00+03:00'") && seoProjection.includes("تصليح Gaming PC في الكويت | فحص GPU ضمن الكمبيوتر الكامل | KCROC") && seoProjection.includes("/images/custom-gaming-pc-teardown-and-diagnostics-workbench.webp"));
add('Arabic Gaming PC page adds a diagnostic decision guide, first-party thermal/BIOS images and safe advice', arabicCommercial.includes('id="gaming-diagnostic-guide"') && arabicCommercial.includes('GAMING_AR_DIAGNOSTIC_PATHS.map') && arabicCommercial.includes('gamingPcThermalThrottlingKuwait') && arabicCommercial.includes('asusRogUefiBiosUtilityTemperatureMonitor') && arabicCommercial.includes('لا تفتح مزوّد الطاقة من الداخل') && arabicCommercial.includes('لا ترسل كلمات المرور أو رموز الدخول'));
add('Arabic Gaming PC page links contextually to related repair services and troubleshooting guides', arabicCommercial.includes('to="/desktop-pc-repair-kuwait"') && arabicCommercial.includes('to="/ar/motherboard-repair-kuwait"') && arabicCommercial.includes('to="/ar/gaming-laptop-repair-kuwait"') && arabicCommercial.includes('to="/guides/gaming-pc-not-turning-on-kuwait"') && arabicCommercial.includes('to="/blog/gaming-pc-cooling"'));

const arabicMacbookRepairEntity = graph.slice(graph.indexOf("    'page-ar-macbook-repair': {"), graph.indexOf("    'page-ar-macbook-screen-replacement': {"));
const arabicMacbookRepairTemplate = arabicCommercial.slice(arabicCommercial.indexOf("  'macbook-repair-kuwait': {"), arabicCommercial.indexOf("  'macbook-screen-replacement-kuwait': {"));
const macbookRepairServiceSchema = arabicCommercial.slice(arabicCommercial.indexOf("const macbookServiceSchema = slug === 'macbook-repair-kuwait'"), arabicCommercial.indexOf("const screenServiceSchema = slug === 'laptop-screen-repair-kuwait'"));
const macbookRepairStart = arabicCommercial.indexOf('aria-labelledby="macbook-repair-process"');
const macbookRepairEnd = arabicCommercial.indexOf("slug === 'laptop-charging-port-repair-kuwait' && (", macbookRepairStart);
const macbookRepairSteps = arabicCommercial.slice(macbookRepairStart, macbookRepairEnd);
add('Arabic MacBook repair metadata targets Arabic-script queries, model families and bilingual brand variants', arabicMacbookRepairEntity.includes("title: 'تصليح ماك بوك بالكويت | Air وPro ومذربورد | KCROC'") && arabicMacbookRepairEntity.includes('تصليح ماك بوك إير وبرو (MacBook Air/Pro)') && arabicMacbookRepairEntity.includes('M1 إلى M5 وIntel') && arabicMacbookRepairEntity.includes("lastModified: '2026-10-29T00:00:00+03:00'") && seoProjection.includes('تصليح ماك بوك بالكويت | Air وPro ومذربورد | KCROC'));
add('Arabic MacBook repair hero and copy include Arabic-script brand, Apple Silicon generations, and conversion CTAs', arabicMacbookRepairTemplate.includes('تصليح ماك بوك إير وماك بوك برو (MacBook Air & Pro)') && arabicCommercial.includes('تواصل مع فني ماك بوك عبر واتساب') && arabicCommercial.includes('احجز استلام مجاني من منطقتك') && arabicMacbookRepairTemplate.includes('أبل') && arabicMacbookRepairTemplate.includes('ماك بوك برو'));
add('Arabic MacBook technical guide includes component-level power, spill, keyboard/trackpad, backlight and data-safety guidance', arabicCommercial.includes('macbook-technical-coverage') && arabicCommercial.includes('PPBUS_G3H') && arabicCommercial.includes('CD3215') && arabicCommercial.includes('CD3217') && arabicCommercial.includes('ISL9240') && arabicCommercial.includes('التراك باد') && arabicCommercial.includes('شرائح التخزين ملحومة باللوحة') && arabicCommercial.includes('لا نعد بالحفاظ على كل البيانات'));
add('Arabic MacBook model coverage lists current Air and Pro model examples while qualifying compatibility', arabicCommercial.includes('macbook-model-number-list') && arabicCommercial.includes('A2337') && arabicCommercial.includes('A2681') && arabicCommercial.includes('A2941') && arabicCommercial.includes('A3113') && arabicCommercial.includes('A3240') && arabicCommercial.includes('A3449') && arabicCommercial.includes('A2141') && arabicCommercial.includes('A2991') && arabicCommercial.includes('هذه أمثلة وليست قائمة كاملة'));
add('Arabic MacBook Service JSON-LD links to the KCROC business and contains four service catalog offers without unconditional data guarantees', macbookRepairServiceSchema.includes("name: 'تصليح ماك بوك إير وماك بوك برو في الكويت'") && macbookRepairServiceSchema.includes("alternateName: 'MacBook Air & MacBook Pro Repair Kuwait; Apple MacBook Repair'") && macbookRepairServiceSchema.includes('hasOfferCatalog') && macbookRepairServiceSchema.includes("'@id': `${business.websiteUrl}/#business`") && macbookRepairServiceSchema.includes('تبديل كيبورد') && macbookRepairServiceSchema.includes('استعادة الوصول إلى البيانات') && !macbookRepairServiceSchema.includes('ضمان استعادة البيانات'));
add('Arabic MacBook workflow exposes six clean single-numbered process steps with no duplicated title numerals', (macbookRepairSteps.match(/\{ n: '[١٢٣٤٥٦]'/g) || []).length === 6 && !macbookRepairSteps.includes("title: '١. تسجيل الموديل والأعراض'") && macbookRepairSteps.includes('list-none'));

const screenService = graph.slice(graph.indexOf("    'srv-screen': {"), graph.indexOf("    'srv-battery': {"));
add('Laptop screen metadata targets cost intent and keeps labor separate from panel cost', screenService.includes("title: 'Laptop Screen Repair Cost Kuwait | Labor from 30 KWD | KCROC'") && screenService.includes("Windows laptop screen repair cost in Kuwait: labor starts from 30 KWD plus the panel. Free pickup, a 30-day warranty and a confirmed quote before paid work.") && screenService.includes("lastModified: '2026-10-27T00:00:00+03:00'") && seoProjection.includes("Laptop Screen Repair Cost Kuwait | Labor from 30 KWD | KCROC") && seoProjection.includes("Windows laptop screen repair cost in Kuwait: labor starts from 30 KWD plus the panel. Free pickup, a 30-day warranty and a confirmed quote before paid work."));
const screenTemplate = await read('pages/templates/ServiceTemplate.tsx');
const screenSEOEngine = await read('core/components/SEOEngine.tsx');
const screenStickyCTA = await read('components/home/StickyMobileCTA.tsx');
add('Laptop screen page has a dedicated heading, model-specific quote message and relevant information links', screenService.includes("title: 'Laptop Screen Repair Kuwait'") && screenService.includes("path: '/blog/how-to-protect-laptop-screen'") && screenService.includes("placement: 'hero'") && screenTemplate.includes('Laptop Screen Repair & Replacement in Kuwait') && screenTemplate.includes('Get a Screen Repair Quote on WhatsApp') && screenTemplate.includes('Please confirm compatible panel availability'));
add('Laptop screen content avoids unverified OEM-quality, stocked-panel, and unconditional same-day claims', !screenService.includes('OEM-quality panel replacement') && !screenService.includes('in almost every case') && !screenService.includes('same day in most cases') && !screenService.includes('A meaningful share') && !screenService.includes('fraction of the cost') && screenService.includes('before you approve the quote'));
const gamingLaptopServiceEntity = graph.slice(graph.indexOf("'srv-gaming-laptop': {"), graph.indexOf("'srv-gaming-laptop-cleaning': {"));
const gamingLaptopSEOEngine = await read('core/components/SEOEngine.tsx');
add('Gaming laptop page includes model-specific thermal/power guidance, transparent price anchors and service catalog schema', (gamingLaptopServiceEntity.match(/id: 'gaming-laptop-faq-\d+'/g) || []).length === 13 && gamingLaptopServiceEntity.includes('Honeywell PTM7950') && gamingLaptopServiceEntity.includes('15–20 KWD') && gamingLaptopServiceEntity.includes('25–60 KWD') && gamingLaptopServiceEntity.includes('modelFaultMatrix: [') && serviceTemplate.includes('entity.advancedTechnicalSection.items.map') && serviceTemplate.includes('entity.modelFaultMatrix.map') && gamingLaptopSEOEngine.includes('Gaming Laptop Diagnostic & Repair Services') && gamingLaptopSEOEngine.includes('"@type": "Country", "name": "Kuwait"'));

add('Laptop and MacBook screen structured offers describe labour-only pricing and do not imply panel stock', screenSEOEngine.includes('The 30 KWD starting figure is labour only; the replacement panel is priced separately.') && screenSEOEngine.includes('The 30 KWD starting figure is replacement labour only; the compatible MacBook display assembly is priced separately.') && screenSEOEngine.includes("['laptop-screen-repair-kuwait', 'macbook-screen-replacement-kuwait', 'laptop-keyboard-replacement-kuwait'].includes(service.slug)"));
add('Screen FAQ and process copy do not promise same-day return or unsupported device features', !screenService.includes('OEM-quality panel replacement') && !screenService.includes('same day in most cases') && !screenService.includes('A meaningful share') && !screenService.includes('fraction of the cost') && screenService.includes('The expected turnaround is confirmed with your quote.') && screenService.includes('where the model supports it'));
add('Mobile screen CTA asks for a quote and has Arabic-specific copy', screenStickyCTA.includes("pathname.includes('screen') ? 'Get Screen Quote'") && screenStickyCTA.includes("'سعر تبديل الشاشة'"));
const arabicScreenEntity = graph.slice(graph.indexOf("    'page-ar-laptop-screen-repair': {"), graph.indexOf("    'page-ar-hawalli-computer-repair': {"));
const arabicScreenTemplate = arabicCommercial.slice(arabicCommercial.indexOf("  'laptop-screen-repair-kuwait': {"), arabicCommercial.indexOf("  'computer-repair-hawalli': {"));
const whatsappIntent = await read('utils/whatsappIntent.ts');
add('Arabic laptop screen SEO targets replacement intent and common brands without a labour-only price hook', arabicScreenEntity.includes("title: 'تبديل شاشة اللابتوب الكويت | HP وDell وLenovo | KCROC'") && arabicScreenEntity.includes("lastModified: '2026-10-29T00:00:00+03:00'") && arabicScreenEntity.includes('HP وDell وLenovo وASUS وAcer وMSI وHuawei') && !arabicScreenEntity.includes('أجرة العمل من 30 د.ك + سعر الشاشة') && seoProjection.includes("تبديل شاشة اللابتوب الكويت | HP وDell وLenovo | KCROC") && !seoProjection.includes('أجرة العمل من 30 د.ك + سعر الشاشة'));
add('Arabic laptop screen hero, brand coverage, panel specifications, FAQs and related guide are present', arabicScreenTemplate.includes('تبديل وتصليح شاشة اللابتوب في الكويت') && arabicScreenTemplate.includes('كم سعر تبديل شاشة اللابتوب وهل السعر يشمل الشاشة؟') && arabicScreenTemplate.includes('HP وDell وLenovo وASUS وAcer وMSI وHuawei') && arabicCommercial.includes('laptop-screen-brand-coverage') && arabicCommercial.includes('13.3 و14 و15.6 و16 و17.3') && arabicCommercial.includes('Backlight Driver IC') && arabicCommercial.includes('دليل باللغة الإنجليزية: حماية شاشة اللابتوب من الكسر') && arabicCommercial.includes('تصليح وتبديل شاشة اللابتوب'));
add('Arabic laptop screen WhatsApp CTAs request model, symptom, area and part-inclusive price confirmation', arabicCommercial.includes('الماركة والموديل: ____. المشكلة: ____. منطقتي بالكويت: ____') && whatsappIntent.includes('السعر النهائي شامل أجرة العمل والقطعة والمدة المتوقعة قبل الإصلاح.'));
add('Arabic laptop screen Service schema covers brand, touch, gaming and backlight diagnostics without a labour-only offer price', arabicCommercial.includes("alternateName: 'Laptop Screen Replacement & Backlight Diagnostics Kuwait'") && arabicCommercial.includes("name: 'تبديل شاشة HP وDell وLenovo وASUS وAcer وMSI وHuawei'") && arabicCommercial.includes("name: 'تشخيص كابل الشاشة والإضاءة الخلفية'") && !arabicCommercial.includes("name: 'أجرة العمل من 30 د.ك + سعر الشاشة'") && !arabicCommercial.slice(arabicCommercial.indexOf('const screenServiceSchema'), arabicCommercial.indexOf('const faqSchema')).includes("availability: 'https://schema.org/InStock'"));
add('HP metadata identifies common product families, independent status and qualified selected-repair pricing', graph.includes("title: 'HP Laptop Service Center Kuwait (Independent) | From 15 KWD | KCROC'") && graph.includes("Independent HP laptop repair in Kuwait—not HP-authorized. Pavilion, EliteBook, ProBook, Envy, OMEN and Victus diagnosis. Selected repairs from 15 KWD where applicable, free pickup and a quote before work.") && graph.includes("HP laptops—from Pavilion and Envy to EliteBook, ProBook, OMEN and Victus—can develop charging, power, hinge, cooling, battery and display faults. KCROC checks the exact model and symptoms at the Hawalli workshop before recommending a repair.") && !graph.includes("more commonly than in other markets") && seoProjection.includes("HP Laptop Service Center Kuwait (Independent) | From 15 KWD | KCROC"));
add('HP title and description clarify independent service and selected-repair pricing in graph and generated SEO projection', graph.includes("title: 'HP Laptop Service Center Kuwait (Independent) | From 15 KWD | KCROC'") && graph.includes("Independent HP laptop repair in Kuwait—not HP-authorized. Pavilion, EliteBook, ProBook, Envy, OMEN and Victus diagnosis. Selected repairs from 15 KWD where applicable, free pickup and a quote before work.") && seoProjection.includes("HP Laptop Service Center Kuwait (Independent) | From 15 KWD | KCROC") && seoProjection.includes("Independent HP laptop repair in Kuwait—not HP-authorized. Pavilion, EliteBook, ProBook, Envy, OMEN and Victus diagnosis. Selected repairs from 15 KWD where applicable, free pickup and a quote before work."));
add('Local SEO metadata dates reflect the refreshed Arabic Hawalli, Farwaniya and near-me pages', graph.includes("lastModified: '2026-10-27T00:00:00+03:00'") && graph.includes("lastModified: '2026-10-29T00:00:00+03:00'") && graph.includes("lastModified: '2026-10-25T00:00:00+03:00'") && seoProjection.includes('"lastModified": "2026-10-27T00:00:00+03:00"') && seoProjection.includes('"lastModified": "2026-10-29T00:00:00+03:00"') && seoProjection.includes('"lastModified": "2026-10-25T00:00:00+03:00"'));

add('Arabic MacBook screen page has buyer-focused Kuwait metadata and keeps its English language pair', graph.includes("title: 'تصليح وتبديل شاشة ماك بوك في الكويت | MacBook Air وPro'") && graph.includes("title: 'تصليح وتبديل شاشة ماك بوك في الكويت | Air وPro | KCROC'") && graph.includes('أجرة العمل من 30 د.ك + الشاشة. أرسل صورة الجهاز للسعر النهائي') && seoProjection.includes('أجرة العمل من 30 د.ك + الشاشة. أرسل صورة الجهاز للسعر النهائي') && graph.includes("canonicalUrl: 'https://www.computerrepairkuwait.com/ar/macbook-screen-replacement-kuwait'") && graph.includes("'en-KW': 'https://www.computerrepairkuwait.com/macbook-screen-replacement-kuwait'") && graph.includes("schemaTypes: ['WebPage', 'BreadcrumbList', 'Service', 'FAQPage', 'ImageObject']") && seoProjection.includes('تصليح وتبديل شاشة ماك بوك في الكويت | Air وPro | KCROC'));
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
add('Hawalli location metadata is synchronized between graph and SEO projection', graph.includes("title: 'Computer Repair Hawalli | Walk-In + Free Pickup | KCROC'") && graph.includes('Walk-in laptop, MacBook and PC repair at Al Mullah Complex, Basement Shop 19, Ibn Khaldoun St, Hawalli. Open daily 10 AM–10 PM; free pickup across Kuwait.') && seoProjection.includes('Computer Repair Hawalli | Walk-In + Free Pickup | KCROC') && seoProjection.includes('Walk-in laptop, MacBook and PC repair at Al Mullah Complex, Basement Shop 19, Ibn Khaldoun St, Hawalli. Open daily 10 AM–10 PM; free pickup across Kuwait.') && has(graph, "title: 'تصليح كمبيوتر حولي | فني كمبيوتر ولابتوب | KCROC") && seoProjection.includes('تصليح كمبيوتر حولي | فني كمبيوتر ولابتوب | KCROC'));
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
add('Service-area directory hides inactive consolidated pages', locationIndex.includes("KCROC_GRAPH.locations.filter((location) => location.isActive !== false)"));
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
add('Arabic charging-port FAQ answers are expanded in the prerendered page while preserving all eight graph-backed answers',
  chargingFaqCount === 8
  && arabicCommercial.includes("open={slug === 'laptop-charging-port-repair-kuwait'}")
  && arabicCommercial.includes("mainEntity: cfg.faq.map"));
add('Arabic charging-port diagnostic matrix compares charger, connector and board-level fault paths',
  arabicCommercial.includes('id="charging-port-component-matrix"')
  && arabicCommercial.includes('احتمال الشاحن والكابل')
  && arabicCommercial.includes('احتمال منفذ الشحن')
  && arabicCommercial.includes('احتمال دائرة الشحن / المذربورد'));
add('Arabic charging-port coverage explains connector architectures and model-dependent brand families',
  arabicCommercial.includes('id="charging-port-architectures"')
  && arabicCommercial.includes('DC Jack بكابل داخلي')
  && arabicCommercial.includes('USB-C أو Thunderbolt')
  && arabicCommercial.includes('MagSafe')
  && arabicCommercial.includes('ThinkPad')
  && arabicCommercial.includes('Legion')
  && arabicCommercial.includes('ROG وTUF')
  && arabicCommercial.includes('MSI')
  && arabicCommercial.includes('Acer Predator'));
add('Arabic charging-port price table matches current KCROC published repair ranges',
  arabicCommercial.includes('id="charging-port-price-guide"')
  && arabicCommercial.includes('20–25 د.ك')
  && arabicCommercial.includes('25–35 د.ك')
  && arabicCommercial.includes('من 35 د.ك')
  && arabicCommercial.includes('مجانًا (0 د.ك)')
  && arabicCommercial.includes('الموافقة قبل أي عمل مدفوع'));
add('Arabic charging-port WhatsApp fast-track captures model, port and charger label, symptoms and Kuwait area',
  arabicCommercial.includes('id="charging-whatsapp-fast-track"')
  && arabicCommercial.includes('ملصق قدرة الشاحن (Wattage)')
  && arabicCommercial.includes('أرسل تفاصيل جهازك على واتساب'));
const arabicChargingPortEntityStart = graph.indexOf("'page-ar-charging-port-repair': {");
const arabicChargingPortEntityEnd = graph.indexOf("\n    'page-", arabicChargingPortEntityStart + 1);
const arabicChargingPortEntity = arabicChargingPortEntityStart >= 0 && arabicChargingPortEntityEnd > arabicChargingPortEntityStart
  ? graph.slice(arabicChargingPortEntityStart, arabicChargingPortEntityEnd)
  : '';
add('Arabic charging-port graph modification date remains attached to that page entity',
  arabicChargingPortEntity.includes("lastModified: '2026-11-08T00:00:00+03:00'"));
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
  && arabicChargingGuide.includes("لا تدخل دبوساً أو عوداً أو أداة معدنية"));
add('Arabic charging troubleshooting page uses relevant gallery photos with responsive thumbnails, alt text and captions',
  [
    'dell-vostro-laptop-motherboard-removed-fan-heatsink-chip-level-repair.webp',
    'laptop-dc-jack-cable-harness-charging-port-replacement-kuwait.webp',
    'laptop-dc-power-jack-connector-replacement-part-kuwait.webp',
    'macbook-pro-logic-board-power-section-usb-c-controller-chips.webp',
    'macbook-pro-thunderbolt-usb-c-port-replacement-board-repair.webp',
  ].every((asset) => arabicChargingGuide.includes(asset))
  && (arabicChargingGuide.match(/<figure/g) || []).length >= 5
  && (arabicChargingGuide.match(/<figcaption/g) || []).length >= 5
  && (arabicChargingGuide.match(/alt=\{/g) || []).length >= 5
  && arabicChargingGuide.includes('loading="eager"')
  && arabicChargingGuide.includes('loading="lazy"')
  && graph.includes('/images/gallery/dell-vostro-laptop-motherboard-removed-fan-heatsink-chip-level-repair.webp'));

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

add('Motherboard internal links use descriptive laptop and MacBook logic-board anchor text outside the Windows battery page',
  computerRepair.includes("label: 'Laptop & Computer Motherboard Repair Kuwait'") &&
  hawalli.includes('Laptop motherboard & MacBook logic board repair') &&
  serviceTemplate.includes("entity.id === 'srv-battery' ? 'Laptop Motherboard Repair' : 'Laptop Motherboard & MacBook Logic Board Repair'"));

add('Motherboard FAQs remain in native disclosure elements and continue to render answers',
  serviceTemplate.includes('<details') &&
  serviceTemplate.includes('{faq.answer}') &&
  graph.includes("schemaTypes: ['Service', 'FAQPage']"));

add('Arabic Farwaniya page adds wider governorate, office and university pickup coverage',
  arabicCommercial.includes('ضاحية عبدالله المبارك') &&
  arabicCommercial.includes('صباح الناصر') &&
  arabicCommercial.includes('الضجيج') &&
  arabicCommercial.includes('مدينة صباح السالم الجامعية بالشدادية') &&
  arabicCommercial.includes('فني كمبيوتر الفروانية خدمة منازل') &&
  arabicCommercial.includes('تصليح كمبيوتر خدمة منازل الفروانية'));
add('Farwaniya service schema names the Hawalli workshop, expanded service area and six catalog offers',
  arabicCommercial.includes("name: 'KCROC repair workshop — Hawalli'") &&
  arabicCommercial.includes('hasOfferCatalog: {') &&
  arabicCommercial.includes('مدينة صباح السالم الجامعية بالشدادية (Sabah Al-Salem University City)') &&
  arabicCommercial.includes("name: 'تصليح مدخل الشحن من 20 د.ك'"));
add('Arabic Farwaniya page has bilingual brand and technical repair coverage',
  arabicCommercial.includes('HP وDell وLenovo وASUS وMSI وAcer وHuawei') &&
  arabicCommercial.includes('PPBUS_G3H') &&
  arabicCommercial.includes('CD3217') &&
  arabicCommercial.includes('144Hz و165Hz و240Hz') &&
  arabicCommercial.includes('Honeywell PTM7950') &&
  arabicCommercial.includes('to="/ar/gaming-pc-repair-kuwait"'));
add('Farwaniya FAQ answers remain visible and the FAQPage schema is derived from the same answer source',
  arabicCommercial.includes('هل عندكم فرع فعلي في الفروانية؟') &&
  arabicCommercial.includes('من أي مناطق حول الفروانية تستلمون؟') &&
  arabicCommercial.includes('شنو أسوي إذا انسكب سائل أو انتفخت البطارية؟') &&
  arabicCommercial.includes("slug === 'computer-repair-farwaniya' ? (") &&
  arabicCommercial.includes('<div key={item.q} className="p-6">') &&
  arabicCommercial.includes('<h3 className="font-bold text-white">{item.q}</h3>') &&
  arabicCommercial.includes('<details key={item.q} className="p-6"') &&
  arabicCommercial.includes("acceptedAnswer: { '@type': 'Answer', text: item.a }"));


const macbookScreenSourceStart = graph.indexOf("id: 'srv-macbook-screen'");
const macbookScreenSourceEnd = graph.indexOf("id: 'srv-gaming-laptop'", macbookScreenSourceStart + 1);
const macbookScreenServiceBlock = macbookScreenSourceStart >= 0 && macbookScreenSourceEnd > macbookScreenSourceStart
  ? graph.slice(macbookScreenSourceStart, macbookScreenSourceEnd)
  : '';
const macbookScreenTemplateSource = await read('pages/templates/ServiceTemplate.tsx');
const macbookScreenSeoSchemaSource = await read('core/components/SEOEngine.tsx');
add('MacBook screen replacement has model-specific Intel/M1-M5 A-number coverage and qualified display diagnostics',
  macbookScreenServiceBlock.includes('A2337') &&
  macbookScreenServiceBlock.includes('A3113') &&
  macbookScreenServiceBlock.includes('A3240') &&
  macbookScreenServiceBlock.includes('A3449') &&
  macbookScreenServiceBlock.includes('A3434') &&
  macbookScreenServiceBlock.includes('Flexgate') &&
  macbookScreenServiceBlock.includes('True Tone') &&
  macbookScreenServiceBlock.includes('modelFaultMatrix') &&
  macbookScreenServiceBlock.includes('advancedTechnicalSection'));
add('MacBook screen FAQ questions remain unchanged, are rendered inline, and use the same expanded answers for FAQPage schema',
  ['How much does MacBook screen replacement cost in Kuwait?', 'Do you replace MacBook Air and MacBook Pro screens?', 'Can a black or flickering MacBook screen be a cable problem?', 'Can you replace a MacBook screen the same day?', 'Will you access my files during screen replacement?', 'Do you offer free pickup and delivery across Kuwait?', 'What warranty applies to MacBook screen replacement?'].every((question) => macbookScreenServiceBlock.includes(`title: '${question}'`)) &&
  (macbookScreenTemplateSource.includes('isMacbookScreenService ? (') || macbookScreenTemplateSource.includes("isMacbookScreenService || entity.id === 'srv-liquid-damage' ? (")) &&
  macbookScreenTemplateSource.includes('<h3 className="text-white font-semibold">{faq.title}</h3>') &&
  macbookScreenSeoSchemaSource.includes("if (type === 'FAQPage')") &&
  macbookScreenServiceBlock.includes("schemaTypes: ['Service', 'FAQPage']"));
add('MacBook screen JSON-LD extends one Service entity with a linked OfferCatalog and does not imply display stock',
  macbookScreenSeoSchemaSource.includes("service.id === 'srv-macbook-screen'") &&
  macbookScreenSeoSchemaSource.includes('"hasOfferCatalog"') &&
  macbookScreenSeoSchemaSource.includes('MacBook Display Repair and Replacement Services') &&
  macbookScreenSeoSchemaSource.includes("['laptop-screen-repair-kuwait', 'macbook-screen-replacement-kuwait', 'laptop-keyboard-replacement-kuwait'].includes(service.slug)"));
const keyboardServiceStart = graph.indexOf("'srv-keyboard': {");
const keyboardServiceEnd = graph.indexOf("'srv-macbook-screen': {", keyboardServiceStart + 1);
const keyboardServiceBlock = keyboardServiceStart >= 0 && keyboardServiceEnd > keyboardServiceStart ? graph.slice(keyboardServiceStart, keyboardServiceEnd) : '';
const keyboardArabicStart = arabicCommercial.indexOf("'laptop-keyboard-replacement-kuwait': {");
const keyboardArabicEnd = arabicCommercial.indexOf("'laptop-liquid-damage-repair-kuwait': {", keyboardArabicStart + 1);
const keyboardArabicConfig = keyboardArabicStart >= 0 && keyboardArabicEnd > keyboardArabicStart ? arabicCommercial.slice(keyboardArabicStart, keyboardArabicEnd) : '';
add('English and Arabic keyboard pages include model-first diagnostics, published labour pricing and separate thermal scope',
  keyboardServiceBlock.includes('pricingGuide') &&
  keyboardServiceBlock.includes('10–20 KWD labour + keyboard') &&
  keyboardServiceBlock.includes('keyboardDiagnosticMatrix') &&
  keyboardServiceBlock.includes('keyboardMountingMatrix') &&
  keyboardServiceBlock.includes('keyboard-faq-9') &&
  serviceTemplate.includes('KEYBOARD_QUICK_DISPATCH') &&
  serviceTemplate.includes('entity.keyboardDiagnosticMatrix') &&
  serviceTemplate.includes('entity.keyboardMountingMatrix') &&
  serviceTemplate.includes('15–20 KWD') &&
  arabicCommercial.includes('keyboardSymptomLinks') &&
  arabicCommercial.includes('keyboard-diagnostic-matrix-ar') &&
  arabicCommercial.includes('keyboard-mounting-matrix-ar') &&
  arabicCommercial.includes('أجرة العمل 10–20 د.ك + سعر الكيبورد') &&
  arabicCommercial.includes('تتراوح بين 15 و20 د.ك') &&
  arabicCommercial.includes('highPrice: 20'));

add('MacBook screen page adds the Arabic service summary below its existing Arabic counterpart card',
  macbookScreenTemplateSource.includes("entity.id === 'srv-macbook-screen' && (") &&
  macbookScreenTemplateSource.includes('ملخص الخدمة بالعربي: مختبر KCROC في حولي') &&
  macbookScreenTemplateSource.includes('الخدمة بالعربية'));

const hingeArabicGraphStart = graph.indexOf("'page-ar-laptop-hinge-repair': {");
const hingeArabicGraphEnd = graph.indexOf("'page-ar-gaming-laptop-cleaning': {", hingeArabicGraphStart + 1);
const hingeArabicGraph = hingeArabicGraphStart >= 0 && hingeArabicGraphEnd > hingeArabicGraphStart ? graph.slice(hingeArabicGraphStart, hingeArabicGraphEnd) : '';
const hingeArabicConfigStart = arabicCommercial.indexOf("'laptop-hinge-repair-kuwait': {");
const hingeArabicConfigEnd = arabicCommercial.indexOf("'gaming-laptop-cleaning-kuwait': {", hingeArabicConfigStart + 1);
const hingeArabicConfig = hingeArabicConfigStart >= 0 && hingeArabicConfigEnd > hingeArabicConfigStart ? arabicCommercial.slice(hingeArabicConfigStart, hingeArabicConfigEnd) : '';
const hingeServiceGraphStart = graph.indexOf("'srv-hinge': {");
const hingeServiceGraphEnd = graph.indexOf("'srv-keyboard': {", hingeServiceGraphStart + 1);
const hingeServiceGraph = hingeServiceGraphStart >= 0 && hingeServiceGraphEnd > hingeServiceGraphStart ? graph.slice(hingeServiceGraphStart, hingeServiceGraphEnd) : '';
const lenovoGraphStart = graph.indexOf("'brand-lenovo': {");
const lenovoGraphEnd = graph.indexOf("'brand-asus': {", lenovoGraphStart + 1);
const lenovoGraph = lenovoGraphStart >= 0 && lenovoGraphEnd > lenovoGraphStart ? graph.slice(lenovoGraphStart, lenovoGraphEnd) : '';
const asusGraphStart = graph.indexOf("'brand-asus': {");
const asusGraphEnd = graph.indexOf("'brand-acer': {", asusGraphStart + 1);
const asusGraph = asusGraphStart >= 0 && asusGraphEnd > asusGraphStart ? graph.slice(asusGraphStart, asusGraphEnd) : '';
add('Arabic hinge page has no self-referencing related-service card',
  hingeArabicGraph.includes("relatedServiceIds: ['srv-laptop', 'srv-screen', 'srv-charging-port']") &&
  hingeArabicConfig.includes("serviceIds: ['srv-laptop', 'srv-screen', 'srv-charging-port']") &&
  !hingeArabicConfig.includes("'srv-hinge': {"));
add('Hinge repair is visible in the footer directly below screen replacement',
  footer.includes('services.slice(0, 10)') &&
  has(graph, "{ label: 'Screen Replacement Kuwait', path: '/laptop-screen-repair-kuwait' }, { label: 'Laptop Hinge & Chassis Repair', path: '/laptop-hinge-repair-kuwait' }"));
add('All six supported laptop-brand hubs link to the hinge service',
  hingeServiceGraph.includes("relatedBrandIds: ['brand-dell', 'brand-hp', 'brand-lenovo', 'brand-msi', 'brand-asus', 'brand-acer']") &&
  lenovoGraph.includes("'srv-hinge'") && asusGraph.includes("'srv-hinge'") &&
  graph.slice(graph.indexOf("'brand-dell': {"), graph.indexOf("'brand-hp': {")).includes("'srv-hinge'") &&
  graph.slice(graph.indexOf("'brand-hp': {"), graph.indexOf("'brand-lenovo': {")).includes("'srv-hinge'") &&
  graph.slice(graph.indexOf("'brand-acer': {"), graph.indexOf("'brand-msi': {")).includes("'srv-hinge'") &&
  graph.slice(graph.indexOf("'brand-msi': {"), graph.indexOf("'brand-apple': {")).includes("'srv-hinge'"));
add('Arabic hinge WhatsApp CTA and prefilled message request a device model and photos',
  arabicCommercial.includes('أرسل صورة المفصلة والهيكل عبر واتساب') &&
  arabicCommercial.includes('سأرفق صورة واضحة للمفصلة وإطار الشاشة أو الغطاء من الخارج'));
add('Arabic hinge Service JSON-LD uses the canonical URL, shared business entity and published price range',
  arabicCommercial.includes("'@type': 'AggregateOffer'") &&
  arabicCommercial.includes('lowPrice: 15') && arabicCommercial.includes('highPrice: 30') &&
  arabicCommercial.includes("provider: { '@id': `${business.websiteUrl}/#business` }") &&
  arabicCommercial.includes("hingeServiceSchema && <SchemaMarkup schema={hingeServiceSchema} />"));


const arabicGamingCoolingStart = arabicCommercial.indexOf("  'gaming-laptop-cleaning-kuwait': {");
const arabicGamingCoolingEnd = arabicCommercial.indexOf("\n  'computer-repair-hawalli': {", arabicGamingCoolingStart + 1);
const arabicGamingCoolingConfig = arabicGamingCoolingStart >= 0 && arabicGamingCoolingEnd > arabicGamingCoolingStart
  ? arabicCommercial.slice(arabicGamingCoolingStart, arabicGamingCoolingEnd)
  : '';
add('Arabic gaming-laptop cooling service has visible model-specific copy, complete FAQ answers and the published 15–20 KWD guide range',
  arabicGamingCoolingConfig.includes('تنظيف لابتوب الألعاب وصيانة التبريد في الكويت') &&
  arabicGamingCoolingConfig.includes('15–20 د.ك') &&
  (arabicGamingCoolingConfig.match(/\{ q: '/g) || []).length === 6 &&
  arabicGamingCoolingConfig.includes('Liquid Metal') &&
  arabicGamingCoolingConfig.includes('Thermal Pads') &&
  arabicGamingCoolingConfig.includes('24–48 ساعة'));
add('Arabic gaming-laptop cooling page links to gaming-laptop repair and motherboard repair without linking to itself',
  arabicGamingCoolingConfig.includes("serviceIds: ['srv-gaming-laptop', 'srv-motherboard']") &&
  !arabicGamingCoolingConfig.includes("'srv-gaming-laptop-cleaning'") &&
  arabicGamingCoolingConfig.includes("path: '/ar/gaming-laptop-repair-kuwait'") &&
  arabicGamingCoolingConfig.includes("path: '/ar/motherboard-repair-kuwait'") &&
  arabicGamingCoolingConfig.includes("path: '/ar/pricing'"));
add('Arabic gaming-laptop cooling CTA names the service clearly',
  arabicCommercial.includes('احجز تنظيف وصيانة تبريد لابتوب الألعاب عبر واتساب'));
add('Arabic gaming-laptop cooling price copy clarifies scope and separates additional parts or repairs',
  arabicCommercial.includes('نوضح نطاق العمل وما يشمله السعر قبل البدء') &&
  arabicCommercial.includes('أي قطعة أو إصلاح إضافي يُسعّر منفصلًا بعد موافقتك'));
add('Arabic gaming-laptop cooling SEO title prioritizes service intent',
  graph.includes("title: 'تنظيف وصيانة تبريد لابتوب الألعاب في الكويت | KCROC'"));
add('Arabic gaming-laptop cooling page uses a prefilled WhatsApp intake message for model, symptoms, temperatures and area',
  arabicCommercial.includes('أريد حجز فحص وتنظيف وصيانة تبريد لابتوب ألعاب') &&
  arabicCommercial.includes('الموديل الكامل') &&
  arabicCommercial.includes('قراءة حرارة CPU أو GPU') &&
  arabicCommercial.includes('المنطقة:'));
add('Arabic gaming-laptop cooling page includes a truthful before/after test protocol without fabricated benchmark readings',
  arabicCommercial.includes('تقرير حراري قبل الصيانة وبعدها') &&
  arabicCommercial.includes('ظروف اختبار متقاربة') &&
  arabicCommercial.includes('لا نعرض درجات حرارة أو زيادة FPS ثابتة') &&
  !arabicCommercial.includes('97°C') &&
  !arabicCommercial.includes('74°C'));
add('Arabic gaming-laptop cooling page explains Liquid Metal, thermal-pad thickness and model-family variation without universal hardware claims',
  arabicCommercial.includes('المعدن السائل موصل للكهرباء') &&
  arabicCommercial.includes('السماكة الخاطئة قد تغيّر ضغط المشتت') &&
  arabicCommercial.includes('هذه عائلات أمثلة وليست ضمانًا') &&
  ['ASUS ROG Strix', 'Lenovo Legion', 'MSI Raider', 'Alienware', 'HP OMEN'].every((name) => arabicCommercial.includes(name)));
add('Arabic gaming-laptop cooling page declares one linked Service entity and its quoted AggregateOffer range',
  arabicCommercial.includes("const gamingLaptopThermalSchema = slug === 'gaming-laptop-cleaning-kuwait'") &&
  arabicCommercial.includes("name: 'تنظيف لابتوب الألعاب وصيانة نظام التبريد في الكويت'") &&
  arabicCommercial.includes("provider: { '@id': `${business.websiteUrl}/#business` }") &&
  arabicCommercial.includes('lowPrice: 15') &&
  arabicCommercial.includes('highPrice: 20') &&
  arabicCommercial.includes('gamingLaptopThermalSchema && <SchemaMarkup schema={gamingLaptopThermalSchema} />'));
add('Arabic gaming-laptop FAQ schema is generated from the same six answers that are rendered visibly',
  arabicCommercial.includes("mainEntity: cfg.faq.map((item)") &&
  arabicCommercial.includes('<summary className="cursor-pointer font-bold text-white">{item.q}</summary>') &&
  arabicCommercial.includes('<p className="mt-3 leading-7 text-slate-400">{item.a}</p>'));
const arabicGovernorateStart = arabicCommercial.indexOf('const KUWAIT_GOVERNORATE_LINKS = [');
const arabicGovernorateEnd = arabicCommercial.indexOf('];', arabicGovernorateStart + 1);
const arabicGovernorateLinks = arabicGovernorateStart >= 0 && arabicGovernorateEnd > arabicGovernorateStart
  ? arabicCommercial.slice(arabicGovernorateStart, arabicGovernorateEnd)
  : '';
add('Arabic gaming-laptop cooling page uses six existing governorate destinations without changing other pages’ local-area links',
  ['حولي', 'العاصمة', 'الفروانية', 'الجهراء', 'الأحمدي', 'مبارك الكبير'].every((name) => arabicGovernorateLinks.includes(name)) &&
  ['/ar/computer-repair-hawalli', '/ar/computer-repair-kuwait-city', '/ar/computer-repair-farwaniya', '/ar/computer-repair-jahra', '/location/ahmadi', '/location/mubarak-al-kabeer'].every((path) => arabicGovernorateLinks.includes(path)) &&
  arabicCommercial.includes("slug === 'gaming-laptop-cleaning-kuwait' ? KUWAIT_GOVERNORATE_LINKS : LOCAL_LINKS") &&
  arabicCommercial.includes("{ label: 'السالمية', path: '/ar/computer-repair-salmiya' }"));


const arabicBatteryPageStart = graph.indexOf("    'page-ar-battery-replacement': {");
const arabicBatteryPageEnd = graph.indexOf("    'page-ar-ssd-ram-upgrade': {", arabicBatteryPageStart + 1);
const arabicBatteryPageEntity = arabicBatteryPageStart >= 0 && arabicBatteryPageEnd > arabicBatteryPageStart
  ? graph.slice(arabicBatteryPageStart, arabicBatteryPageEnd)
  : '';
const arabicBatteryConfigStart = arabicCommercial.indexOf("  'laptop-battery-replacement-kuwait': {");
const arabicBatteryConfigEnd = arabicCommercial.indexOf("\n  'macbook-battery-replacement-kuwait': {", arabicBatteryConfigStart + 1);
const arabicBatteryConfig = arabicBatteryConfigStart >= 0 && arabicBatteryConfigEnd > arabicBatteryConfigStart
  ? arabicCommercial.slice(arabicBatteryConfigStart, arabicBatteryConfigEnd)
  : '';

add('Arabic battery page targets core laptop-battery intent with a transparent labour-only starting price',
  arabicBatteryPageEntity.includes("title: 'تبديل بطارية لابتوب Windows في الكويت | HP وDell وLenovo | KCROC'") &&
  arabicBatteryPageEntity.includes('أجرة العمل من 8 د.ك + البطارية') &&
  seoProjection.includes('"id": "page-ar-battery-replacement"') &&
  seoProjection.includes('"title": "تبديل بطارية لابتوب Windows في الكويت | HP وDell وLenovo | KCROC"'));

add('Arabic battery related-service cards do not link back to the current page',
  arabicBatteryConfig.includes("serviceIds: ['srv-laptop', 'srv-charging-port', 'srv-motherboard']") &&
  !arabicBatteryConfig.includes("serviceIds: ['srv-battery'"));

add('Arabic battery WhatsApp intake requests the exact model, symptoms, location, safe photo, and stock confirmation',
  arabicCommercial.includes('أحتاج فحص أو تبديل بطارية لابتوب Windows في الكويت') &&
  arabicCommercial.includes('الموديل الكامل أو Service Tag') &&
  arabicCommercial.includes('صورة خارجية للموديل أو رسالة التحذير إذا كان ذلك آمنًا') &&
  arabicCommercial.includes('من دون فتح الجهاز أو الضغط على البطارية') &&
  arabicCommercial.includes('توافق البطارية وتوفرها'));

add('Arabic battery page presents dedicated WhatsApp and free-pickup actions in the hero',
  arabicCommercial.includes('أرسل موديل اللابتوب وأعراض البطارية عبر واتساب') &&
  arabicCommercial.includes('أرسل موديل MacBook وأعراض البطارية عبر واتساب') &&
  arabicCommercial.includes('احجز استلامًا مجانيًا من منطقتك'));

add('Arabic battery Service schema uses its first-party photos and the Hawalli workshop coordinates',
  arabicCommercial.includes('IMAGES.upgrades.laptopBottomChassisBatteryRamOpen.src') &&
  arabicCommercial.includes('IMAGES.laptopHardware.hpBattery2.src') &&
  arabicCommercial.includes('IMAGES.macbook.service.src') &&
  arabicCommercial.includes('IMAGES.macbook.swollenBattery1.src') &&
  arabicCommercial.includes('IMAGES.macbook.macbookProBatteryRemovalRepair.src') &&
  arabicCommercial.includes('latitude: business.coords?.lat') &&
  arabicCommercial.includes('longitude: business.coords?.lng'));

add('Arabic battery metadata declares Service and FAQPage schema with an Arabic breadcrumb and current date',
  arabicBatteryPageEntity.includes("schemaTypes: ['WebPage', 'BreadcrumbList', 'Service', 'FAQPage']") &&
  arabicBatteryPageEntity.includes("lastModified: '2026-11-07T00:00:00+03:00'") &&
  arabicBatteryPageEntity.includes("breadcrumbs: [{ name: 'الرئيسية', url: '/ar' }"));

add('Arabic battery FAQs remain generated from visible copy and qualify timing and warranty',
  (arabicBatteryConfig.match(/\{ q: '/g) || []).length === 10 &&
  arabicCommercial.includes('كم يستغرق تبديل بطارية اللابتوب؟') &&
  arabicCommercial.includes('لا نعد بموعد قبل التأكد من التوافق والتوفر') &&
  arabicCommercial.includes('الإصلاح المكتمل مشمول بضمان 30 يومًا') &&
  arabicCommercial.includes('mainEntity: cfg.faq.map((item)'));




add('Arabic Windows laptop battery page uses the dedicated Arabic route and reciprocal English equivalent',
  arabicBatteryPageEntity.includes("slug: 'ar/laptop-battery-replacement-kuwait'") &&
  arabicBatteryPageEntity.includes("canonicalUrl: 'https://www.computerrepairkuwait.com/ar/laptop-battery-replacement-kuwait'") &&
  arabicBatteryPageEntity.includes("'en-KW': 'https://www.computerrepairkuwait.com/battery-replacement-kuwait'") &&
  arabicCommercial.includes("englishPath: '/battery-replacement-kuwait'"));

add('Arabic Windows battery page includes symptom-specific WhatsApp triage and swollen-battery safety guidance',
  arabicCommercial.includes('id="battery-symptom-triage"') &&
  arabicCommercial.includes('البطارية منتفخة أو الهيكل / التاتش باد مرتفع') &&
  arabicCommercial.includes('متصل بالكهرباء ولا يشحن أو واقف على 0%') &&
  arabicCommercial.includes('id="battery-swollen-safety"') &&
  arabicCommercial.includes('لا تضع الجهاز في شحنة أو ناقل عادي قبل الاتفاق على طريقة نقل آمنة'));

add('Arabic Windows battery page includes a diagnostic matrix, model compatibility guide and transparent installed-price table',
  arabicCommercial.includes('id="battery-diagnostic-matrix"') &&
  arabicCommercial.includes('id="battery-compatibility-guide"') &&
  arabicCommercial.includes('id="battery-installed-price"') &&
  arabicCommercial.includes('لا نعتمد على قوائم Part Numbers عامة') &&
  arabicCommercial.includes('تبدأ من 8 د.ك، وهي أجرة عمل فقط ولا تشمل سعر البطارية'));

add('Old Arabic Windows battery URL permanently redirects to the dedicated laptop URL',
  JSON.parse(vercelConfig).redirects.some((item) =>
    item.source === '/ar/battery-replacement-kuwait' &&
    item.destination === '/ar/laptop-battery-replacement-kuwait' &&
    item.permanent === true));

const englishBatteryServiceStart = graph.indexOf("    'srv-battery': {");
const englishBatteryRelatedResourcesStart = graph.indexOf("      relatedResourcePaths: [", englishBatteryServiceStart + 1);
const englishBatteryRelatedResourcesEnd = graph.indexOf("\n      ],", englishBatteryRelatedResourcesStart + 1);
const englishBatteryPrimaryCopy = englishBatteryServiceStart >= 0 && englishBatteryRelatedResourcesStart > englishBatteryServiceStart
  ? graph.slice(englishBatteryServiceStart, englishBatteryRelatedResourcesStart)
  : '';
const englishBatteryRelatedResources = englishBatteryRelatedResourcesStart >= 0 && englishBatteryRelatedResourcesEnd > englishBatteryRelatedResourcesStart
  ? graph.slice(englishBatteryRelatedResourcesStart, englishBatteryRelatedResourcesEnd)
  : '';
const arabicBatteryPrimaryCopy = arabicBatteryConfig.split('    englishPath:')[0];

add('English and Arabic general battery page copy excludes MacBook while retaining a separate dedicated-page link',
  englishBatteryPrimaryCopy.length > 0 &&
  !/MacBook/i.test(englishBatteryPrimaryCopy) &&
  arabicBatteryPrimaryCopy.length > 0 &&
  !/(MacBook|ماك بوك|ماكبوك)/i.test(arabicBatteryPrimaryCopy) &&
  englishBatteryRelatedResources.includes("{ label: 'MacBook Battery Replacement Kuwait', path: '/macbook-battery-replacement-kuwait' }") &&
  arabicBatteryConfig.includes("{ label: 'تبديل بطارية MacBook', path: '/ar/macbook-battery-replacement-kuwait' }"));

const arabicRelatedGuidesStart = arabicCommercial.indexOf("const relatedGuides =");
const arabicBatteryRelatedGuidesStart = arabicCommercial.indexOf(": slug === 'laptop-battery-replacement-kuwait'", arabicRelatedGuidesStart + 1);
const arabicBatteryRelatedGuidesEnd = arabicCommercial.indexOf(": slug === 'laptop-repair-kuwait'", arabicBatteryRelatedGuidesStart + 1);
const arabicBatteryRelatedGuides = arabicRelatedGuidesStart >= 0 && arabicBatteryRelatedGuidesStart > arabicRelatedGuidesStart && arabicBatteryRelatedGuidesEnd > arabicBatteryRelatedGuidesStart
  ? arabicCommercial.slice(arabicBatteryRelatedGuidesStart, arabicBatteryRelatedGuidesEnd)
  : '';

add('Arabic general laptop-battery page shows laptop-related guides and keeps MacBook battery as a separate service link',
  arabicBatteryRelatedGuides.length > 0 &&
  !/(MacBook|ماك بوك|ماكبوك)/i.test(arabicBatteryRelatedGuides) &&
  arabicBatteryConfig.includes("{ label: 'تبديل بطارية MacBook', path: '/ar/macbook-battery-replacement-kuwait' }"));

add('English Windows battery page keeps related motherboard and repair-hub copy MacBook-free without changing shared copy on other services',
  serviceTemplate.includes("entity.id === 'srv-battery' ? 'Laptop Motherboard Repair' : 'Laptop Motherboard & MacBook Logic Board Repair'") &&
  serviceTemplate.includes("windowsLaptopContext={entity.id === 'srv-battery'}") &&
  coreRepairPillars.includes("windowsLaptopContext = false") &&
  coreRepairPillars.includes("The main commercial repair hub for desktop PCs, Windows laptops, gaming PCs and motherboard faults.") &&
  coreRepairPillars.includes("The main commercial repair hub for desktops, laptops, gaming PCs, MacBooks and motherboard faults."));

add('Windows battery landing pages use laptop-only footer labels and route-specific footer descriptions',
  footer.includes("'/battery-replacement-kuwait': 'تبديل بطارية اللابتوب'") &&
  footer.includes("const isWindowsBatteryPage = location.pathname === '/battery-replacement-kuwait' || location.pathname === '/ar/laptop-battery-replacement-kuwait';") &&
  footer.includes('Professional repair for desktop PCs, Windows laptops and gaming PCs.') &&
  footer.includes('تصليح الكمبيوتر المكتبي ولابتوبات Windows وكمبيوتر الألعاب'));

const macbookBatteryEnglishStart = graph.indexOf("    'page-macbook-battery-replacement': {");
const macbookBatteryArabicStart = graph.indexOf("    'page-ar-macbook-battery-replacement': {");
const macbookBatteryEnglishEnd = graph.indexOf("} as WebPageEntity", macbookBatteryEnglishStart);
const macbookBatteryArabicEnd = graph.indexOf("} as WebPageEntity", macbookBatteryArabicStart);
const macbookBatteryEnglishEntity = macbookBatteryEnglishStart >= 0 && macbookBatteryEnglishEnd > macbookBatteryEnglishStart
  ? graph.slice(macbookBatteryEnglishStart, macbookBatteryEnglishEnd)
  : '';
const macbookBatteryArabicEntity = macbookBatteryArabicStart >= 0 && macbookBatteryArabicEnd > macbookBatteryArabicStart
  ? graph.slice(macbookBatteryArabicStart, macbookBatteryArabicEnd)
  : '';
const macbookBatteryArabicConfigStart = arabicCommercial.indexOf("  'macbook-battery-replacement-kuwait': {");
const macbookBatteryArabicConfigEnd = arabicCommercial.indexOf("\n  'ssd-ram-upgrade-kuwait': {", macbookBatteryArabicConfigStart + 1);
const macbookBatteryArabicConfig = macbookBatteryArabicConfigStart >= 0 && macbookBatteryArabicConfigEnd > macbookBatteryArabicConfigStart
  ? arabicCommercial.slice(macbookBatteryArabicConfigStart, macbookBatteryArabicConfigEnd)
  : '';

add('English and Arabic MacBook battery pages have distinct canonical URLs and reciprocal language alternates',
  macbookBatteryEnglishEntity.includes("canonicalUrl: 'https://www.computerrepairkuwait.com/macbook-battery-replacement-kuwait'") &&
  macbookBatteryEnglishEntity.includes("'ar-KW': 'https://www.computerrepairkuwait.com/ar/macbook-battery-replacement-kuwait'") &&
  macbookBatteryArabicEntity.includes("canonicalUrl: 'https://www.computerrepairkuwait.com/ar/macbook-battery-replacement-kuwait'") &&
  macbookBatteryArabicEntity.includes("'en-KW': 'https://www.computerrepairkuwait.com/macbook-battery-replacement-kuwait'"));

add('English MacBook battery route uses a dedicated, schema-enabled landing page',
  app.includes("path: 'macbook-battery-replacement-kuwait'") &&
  macbookBatteryPage.includes("page-macbook-battery-replacement") &&
  macbookBatteryPage.includes("'@type': 'Service'") &&
  macbookBatteryPage.includes("'@type': 'FAQPage'") &&
  macbookBatteryPage.includes('A-number') &&
  macbookBatteryPage.includes('USB-C or MagSafe'));

add('English MacBook battery page includes a crawlable common A-number matrix and installed-price quote path',
  ['A1466', 'A1932', 'A2179', 'A2337', 'A2681', 'A2941', 'A3113', 'A3114', 'A1398', 'A1502', 'A1706', 'A1707', 'A1708', 'A1989', 'A1990', 'A2141', 'A2159', 'A2251', 'A2289', 'A2338', 'A2442', 'A2485', 'A2779', 'A2780', 'A2918', 'A2991', 'A2992'].every((model) => macbookBatteryPage.includes(model)) &&
  macbookBatteryPage.includes('Complete KWD quote after part and stock check') &&
  macbookBatteryPage.includes('Labour from 8 KWD') &&
  macbookBatteryPage.includes('not the installed total') &&
  macbookBatteryPage.includes('minPrice: 8') &&
  macbookBatteryPage.includes('Starting labour only; battery not included.'));

add('English MacBook battery quote builder pre-fills WhatsApp with selected model, symptom and pickup area',
  macbookBatteryPage.includes('useState<string>') &&
  macbookBatteryPage.includes('setSelectedModel(model)') &&
  macbookBatteryPage.includes('setSelectedSymptom(symptom)') &&
  macbookBatteryPage.includes('pickupArea.trim()') &&
  macbookBatteryPage.includes('encodeURIComponent(message)') &&
  macbookBatteryPage.includes('aria-pressed={selectedModel === model}') &&
  macbookBatteryPage.includes('No screenshot or serial number is required to start'));

add('English MacBook battery page keeps complete FAQ answers in initial details markup and FAQPage schema',
  macbookBatteryPage.includes('<details key={faq.question}') &&
  macbookBatteryPage.includes('{faq.answer}') &&
  macbookBatteryPage.includes("'@type': 'FAQPage'") &&
  macbookBatteryPage.includes('mainEntity: FAQS.map'));

add('English MacBook battery page explains model-specific charging-circuit diagnosis without claiming one chip fits every board',
  macbookBatteryPage.includes('CD3215') &&
  macbookBatteryPage.includes('CD3217') &&
  macbookBatteryPage.includes('ISL9239') &&
  macbookBatteryPage.includes('ISL9240') &&
  macbookBatteryPage.includes('PPBUS_G3H') &&
  macbookBatteryPage.includes('not a universal parts list'));

add('English MacBook battery page limits thermal service to compatible models and avoids unsupported fixed upsell claims',
  macbookBatteryPage.includes('not a standard battery-replacement requirement') &&
  macbookBatteryPage.includes('separately quoted before work') &&
  macbookBatteryPage.includes('temperature behaviour during appropriate normal-load charging verification'));

add('English MacBook swollen-battery CTA prioritises safe handling over ordinary courier or same-day promises',
  macbookBatteryPage.includes('do not press, bend, puncture, open or try to remove the battery') &&
  macbookBatteryPage.includes('Request Swollen-Battery Safety Advice') &&
  macbookBatteryPage.includes('without prior instructions'));

add('Arabic MacBook battery page has ten FAQs, its own intake prompt and a model-specific Service schema',
  (macbookBatteryArabicConfig.match(/\{ q: '/g) || []).length === 12 &&
  macbookBatteryArabicConfig.includes('تبديل بطارية MacBook في الكويت') &&
  arabicCommercial.includes('macbookBatteryWhatsappMessage') &&
  arabicCommercial.includes('const macbookBatteryServiceSchema'));

add('Arabic MacBook battery page includes a crawlable A-number model guide and transparent installed-price framing',
  ['A1466', 'A1502', 'A1989', 'A2141', 'A2337', 'A2338', 'A2442', 'A2485', 'A2681', 'A2941', 'A3113', 'A3114'].every((model) => arabicCommercial.includes(model)) &&
  arabicCommercial.includes('macbook-battery-model-guide') &&
  arabicCommercial.includes('السعر الشامل للبطارية والتركيب') &&
  arabicCommercial.includes('أجرة التركيب تبدأ من 8 د.ك') &&
  arabicCommercial.includes('ليست السعر النهائي'));

add('Arabic MacBook battery page includes six diagnostic steps and model-dependent board-level charging terms',
  ['تحديد الموديل والبطارية', 'قراءة حالة البطارية', 'فحص الشاحن والمنفذ', 'قياس دائرة الشحن والمذربورد', 'فك آمن وتركيب مطابق', 'فحص بعد التركيب'].every((step) => arabicCommercial.includes(step)) &&
  ['آيسي الشحن', 'SMBus', 'CD3215', 'CD3217', 'ISL9239', 'ISL9240', 'PPBUS_G3H'].every((term) => arabicCommercial.includes(term)) &&
  arabicCommercial.includes('ليست قائمة تنطبق على كل MacBook'));

add('Arabic MacBook battery page has four model and symptom specific prefilled WhatsApp quote chips',
  arabicCommercial.includes('const macbookBatteryQuickQuotes = [') &&
  arabicCommercial.includes('بطارية MacBook Air · M1 / M2 / M3') &&
  arabicCommercial.includes('بطارية MacBook Pro · 13 / 14 / 16 إنش') &&
  arabicCommercial.includes('بطارية منتفخة · التراك باد مرتفع') &&
  arabicCommercial.includes('متصل بالشاحن ولا يشحن · فحص المذربورد') &&
  arabicCommercial.includes("href: 'https://wa.me/' + business.telephone") &&
  arabicCommercial.includes('macbookBatteryQuickQuotes.map((item)'));

add('Arabic MacBook swollen-battery section prioritises safety and does not promise emergency courier collection',
  arabicCommercial.includes('macbook-swollen-battery') &&
  arabicCommercial.includes('أوقف الاستخدام والشحن') &&
  arabicCommercial.includes('تعليمات التعامل والترتيب الآمن للاستلام') &&
  arabicCommercial.includes('لا تضع جهازًا ببطارية منتفخة في ناقل أو شحنة عادية'));

add('Arabic MacBook battery page offers optional model-compatible cooling inspection without unverified pricing or health claims',
  arabicCommercial.includes('فحص التبريد أثناء فتح الجهاز') &&
  arabicCommercial.includes('موديلات MacBook المزودة بمراوح') &&
  arabicCommercial.includes('ليست مطلوبة لكل تبديل') &&
  arabicCommercial.includes('تُسعّر منفصلًا'));

add('Arabic MacBook FAQ answers are included in visible details markup and FAQPage schema',
  (macbookBatteryArabicConfig.match(/\{ q: '/g) || []).length === 12 &&
  arabicCommercial.includes('mainEntity: cfg.faq.map((item)') &&
  arabicCommercial.includes('<details key={item.q}') &&
  arabicCommercial.includes('{item.a}'));

add('Arabic general battery page targets Windows and multi-brand laptop intent with a prominent dedicated MacBook link',
  graph.includes("title: 'تبديل بطارية لابتوب Windows في الكويت | HP وDell وLenovo | KCROC'") &&
  arabicCommercial.includes("h1: 'تبديل بطارية اللابتوب في الكويت'") &&
  arabicCommercial.includes('تبديل بطارية MacBook Air وMacBook Pro في الكويت — السعر مع التركيب') &&
  arabicCommercial.includes("to=\"/ar/macbook-battery-replacement-kuwait\""));

add('Arabic MacBook battery metadata targets installed pricing and A-number intent with Service and FAQ schemas',
  macbookBatteryArabicEntity.includes("title: 'تبديل بطارية MacBook في الكويت | السعر مع التركيب وموديلات A | KCROC'") &&
  macbookBatteryArabicEntity.includes("schemaTypes: ['WebPage', 'BreadcrumbList', 'Service', 'FAQPage']") &&
  macbookBatteryArabicEntity.includes("lastModified: '2026-11-03T00:00:00+03:00'"));

add('MacBook battery hub links point to the dedicated battery pages in both languages',
  graph.includes("{ label: 'MacBook Battery Replacement Kuwait', path: '/macbook-battery-replacement-kuwait' }") &&
  arabicCommercial.includes("{ label: 'تبديل بطارية MacBook', path: '/ar/macbook-battery-replacement-kuwait' }"));

add('Dedicated English MacBook battery replacement page is discoverable in the main Services dropdown',
  caseStudyRemovalNavigation.includes("slug: 'macbook-battery-replacement-kuwait'") &&
  caseStudyRemovalNavigation.includes("title: 'MacBook Battery Replacement'") &&
  caseStudyRemovalNavigation.includes("id: 'macbook_battery_replacement'"));

add('Battery intent split does not create a 16th Services catalogue item',
  !graph.includes("id: 'srv-macbook-battery'"));


const vercelRedirects = JSON.parse(vercelConfig).redirects ?? [];
const findPermanentRedirect = (source) => vercelRedirects.find((item) => item.source === source && item.permanent === true);
add('Arabic related-service cards have Arabic fallback labels and descriptions',
  ['srv-laptop', 'srv-desktop-pc', 'srv-hinge', 'srv-macbook', 'srv-macbook-screen', 'srv-gaming', 'srv-gaming-laptop', 'srv-gaming-laptop-cleaning', 'srv-motherboard', 'srv-screen', 'srv-battery', 'srv-charging-port', 'srv-ssd-ram', 'srv-keyboard', 'srv-liquid-damage'].every((id) => arabicCommercial.includes(`'${id}': {`)) &&
  arabicCommercial.includes('arabicDefaultServiceCopy[service.id]?.title') &&
  arabicCommercial.includes('arabicDefaultServiceCopy[service.id]?.description'));
add('Legacy Khaitan laptop URL permanently redirects to the Khaitan service-area page',
  findPermanentRedirect('/laptop-repair-in-khaitan')?.destination === '/location/khaitan');
add('Legacy Hawalli laptop URL permanently redirects to the Hawalli service-area page',
  findPermanentRedirect('/laptop-repair-hawalli-kuwait')?.destination === '/location/hawalli');
add('Legacy Kaifan computer-repair URL permanently redirects to the canonical Kaifan service-area page',
  findPermanentRedirect('/computer-repair-kaifan')?.destination === '/location/kaifan');

const kaifanStart = graph.indexOf("'loc-kaifan': {");
const kaifanEnd = graph.indexOf("} as LocationEntity", kaifanStart);
const kaifanEntity = kaifanStart >= 0 && kaifanEnd > kaifanStart
  ? graph.slice(kaifanStart, kaifanEnd)
  : '';
add('Kaifan page has a distinct thermal-first service mix, dedicated cards and accurate block postal codes',
  kaifanEntity.includes("heroHeadline: 'Laptop Overheating & Computer Repair in Kaifan'") &&
  kaifanEntity.includes("areaPostalCode: '71800'") &&
  ['71801', '71802', '71803', '71804', '71805', '71806', '71807'].every((code) => kaifanEntity.includes(code)) &&
  kaifanEntity.includes('localHighlights:') &&
  kaifanEntity.includes('localServiceCards:') &&
  kaifanEntity.includes('localFaqs:') &&
  kaifanEntity.includes('Honeywell PTM7950') &&
  kaifanEntity.includes('Arctic MX-6') &&
  kaifanEntity.includes('Kaifan Co-op') &&
  kaifanEntity.includes('Kaifan Park') &&
  kaifanEntity.includes('removable NVMe or SATA') &&
  !kaifanEntity.includes('71900') &&
  !kaifanEntity.includes('60 to 120 minutes') &&
  !kaifanEntity.includes('10-minute courier'));
add('Kaifan uses the existing service-area schema pipeline and its local FAQ/problem-label overrides',
  kaifanEntity.includes("schemaTypes: ['LocalBusiness']") &&
  seoEngine.includes("if (type === 'LocalBusiness' && entity.entityType === 'Location')") &&
  seoEngine.includes('"@type": "Service"') &&
  seoProjection.includes('"areaPostalCode": "71800"') &&
  seoProjection.includes('71807') &&
  locations.includes("'kaifan'") &&
  locations.includes('Laptop Overheating, Thermal Throttling & Shutdowns') &&
  kaifanEntity.includes('faq-kaifan-9') &&
  kaifanEntity.includes('Second Ring Road') &&
  ['src', 'alt', 'width', 'height'].every((field) => kaifanEntity.includes('IMAGES.gaming.gamingOverheating.' + field)) &&
  !kaifanEntity.includes('IMAGES.laptopHardware.gamingOverheating') &&
  kaifanEntity.includes('ultrasonic cleaning when the material and assembly permit') &&
  (kaifanEntity.match(/title: '(?:Laptop Repair & Thermal Shutdown Overhaul|Laptop Screen, Display Cable & Backlight Repair|Laptop Battery Testing & Compatible Replacement|No-Power Motherboard & Component-Level Repair)'/g) || []).length === 4);


const kuwaitCityStart = graph.indexOf("'loc-kuwait-city': {");
const kuwaitCityEnd = graph.indexOf("} as LocationEntity", kuwaitCityStart);
const kuwaitCityEntity = kuwaitCityStart >= 0 && kuwaitCityEnd > kuwaitCityStart
  ? graph.slice(kuwaitCityStart, kuwaitCityEnd)
  : '';
add('Kuwait City is a distinct corporate office-collection page with four canonical service links and verified area-code references',
  kuwaitCityEntity.includes("heroBadge: 'Kuwait City Office & Home Collection'") &&
  kuwaitCityEntity.includes("heroHeadline: 'Corporate Laptop & Computer Repair in Kuwait City'") &&
  ['srv-laptop', 'srv-screen', 'srv-motherboard', 'srv-macbook'].every((id) => kuwaitCityEntity.includes(id)) &&
  ['15300', '14000', '10002', '15000', '15400', '35020'].every((code) => kuwaitCityEntity.includes(code)) &&
  !kuwaitCityEntity.includes('36200') &&
  kuwaitCityEntity.includes('Office-tower and reception collection by arrangement') &&
  kuwaitCityEntity.includes('Hardware-only diagnostics and storage choices') &&
  kuwaitCityEntity.includes('areaPostalRegion:'));
add('Kuwait City has ten dedicated FAQs shared by the visible page and FAQPage schema, without unsupported dispatch promises',
  (kuwaitCityEntity.match(/id: 'faq-kuwait-city-local-/g) || []).length === 10 &&
  locations.includes("'adailiya', 'kuwait-city'") &&
  locations.includes('mainEntity: localFaqs.map') &&
  !kuwaitCityEntity.includes('1 to 3 hours') &&
  !kuwaitCityEntity.includes('10 to 15 minutes') &&
  !kuwaitCityEntity.includes('serialized chain-of-custody tag'));
add('Kuwait City service-area postal codes flow through the shared SEO schema generator',
  seoEngine.includes('location.additionalAreaPostalCodes') &&
  seoEngine.includes('"postalCode": area.postalCode') &&
  kuwaitCityEntity.includes("schemaTypes: ['LocalBusiness']"));
 
const hpStart = graph.indexOf("'brand-hp': {");
const hpEnd = graph.indexOf("'brand-lenovo': {", hpStart + 1);
const hpBrand = hpStart >= 0 && hpEnd > hpStart ? graph.slice(hpStart, hpEnd) : '';
const hpFaqStart = hpBrand.indexOf('faqs: [');
const hpFaqEnd = hpBrand.indexOf('],', hpFaqStart);
const hpFaqBlock = hpFaqStart >= 0 && hpFaqEnd > hpFaqStart ? hpBrand.slice(hpFaqStart, hpFaqEnd) : '';
add('HP brand page keeps the existing copy while adding four symptom-specific WhatsApp entry points', 
  hpBrand.includes("id: 'hp-no-power'") &&
  hpBrand.includes("id: 'hp-hinge'") &&
  hpBrand.includes("id: 'hp-thermal'") &&
  hpBrand.includes("id: 'hp-battery-charging'") &&
  brandTemplate.includes('symptomTriage.map') &&
  brandTemplate.includes('buildWhatsAppLink(item.message)'));
add('HP series matrix and startup-alert guidance are graph-driven and avoid universal blink-code claims',
  hpBrand.includes('repairMatrix: [') &&
  hpBrand.includes('diagnosticCodeGuide: [') &&
  hpBrand.includes('blink patterns vary by model') &&
  brandTemplate.includes('repairMatrix.map') &&
  brandTemplate.includes('diagnosticCodeGuide.map') &&
  !hpBrand.includes('3 Blinks') &&
  !hpBrand.includes('5 Blinks'));
add('HP published price table matches existing pricing categories and keeps part-inclusive totals conditional',
  hpBrand.includes("price: '15–20 KWD'") &&
  hpBrand.includes("price: '15–30 KWD'") &&
  hpBrand.includes("price: '20–35 KWD'") &&
  hpBrand.includes("price: '25–60 KWD'") &&
  hpBrand.includes("price: '8–15 KWD labour + battery'") &&
  hpBrand.includes("price: 'Labour from 30 KWD + panel'") &&
  brandTemplate.includes('priceGuide.map') &&
  /price\s*:\s*['"]15–20 KWD['"]/.test(englishPricing) &&
  /price\s*:\s*['"]15–30 KWD['"]/.test(englishPricing) &&
  /price\s*:\s*['"]20–35 KWD['"]/.test(englishPricing) &&
  /price\s*:\s*['"]25–60 KWD['"]/.test(englishPricing));
add('HP FAQs remain visible and are shared with the existing FAQPage schema generator',
  (hpFaqBlock.match(/\{ id: 'hp-/g) || []).length === 10 &&
  hpFaqBlock.includes("title: 'Is KCROC an official HP service center?'") &&
  seoEngine.includes('brandFaqs.map(faq => ({ title: faq.title, answer: faq.answer }))') &&
  hpBrand.includes("schemaTypes: ['Brand', 'Service', 'FAQPage', 'BreadcrumbList']"));
add('HP global mobile WhatsApp CTA requests the model, symptoms and collection area',
  macbookWhatsappIntent.includes("path === '/hp-laptop-repair-kuwait'") &&
  macbookWhatsappIntent.includes('Exact HP model / product number') &&
  macbookWhatsappIntent.includes('Please advise on the diagnosis and confirm the total quote'));

for (const check of checks) console.log(`${check.pass ? '✅' : '❌'} ${check.name}${!check.pass && check.detail ? ` — ${check.detail}` : ''}`);
const failed = checks.filter((check) => !check.pass);
if (failed.length) process.exit(1);
console.log(`\n✅ Customer-growth regression checks passed (${checks.length} checks).`);
