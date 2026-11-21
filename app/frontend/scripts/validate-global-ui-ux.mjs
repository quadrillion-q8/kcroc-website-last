import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const root = path.resolve('src');
const files = [];

async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) await walk(fullPath);
    else if (/\.(tsx?|jsx?|css)$/.test(entry.name)) files.push(fullPath);
  }
}

await walk(root);
const read = (relativePath) => readFile(path.join(root, relativePath), 'utf8');
const [button, header, footer, contact, cookie, hero, globalCss, legacyCss, schema, servicesGrid, booking, repairProof, stickyCta, leadMagnet, pricingTable, desktopMegaMenu, sectionHeader] = await Promise.all([
  read('components/ui/button.tsx'),
  read('core/components/layout/Header.tsx'),
  read('core/components/layout/Footer.tsx'),
  read('pages/Contact.tsx'),
  read('core/components/CookieConsentBanner.tsx'),
  read('components/home/Hero.tsx'),
  read('index.css'),
  read('styles/kcroc.css'),
  read('components/seo/SchemaMarkup.tsx'),
  read('components/home/ServicesGrid.tsx'),
  read('pages/BookingPage.tsx'),
  read('components/home/RepairProofCTA.tsx'),
  read('components/home/StickyMobileCTA.tsx'),
  read('components/home/LeadMagnet.tsx'),
  read('components/home/PricingTable.tsx'),
  read('core/components/layout/DesktopMegaMenu.tsx'),
  read('components/ui/section-header.tsx'),
]);

const [serviceTemplate, graph, graphSchema, serviceLayoutCss] = await Promise.all([
  read('pages/templates/ServiceTemplate.tsx'),
  read('data/graph.ts'),
  read('types/knowledgeGraph.ts'),
  read('pages/templates/ServiceTemplateLaptopLayout.css'),
]);


const [rolloutCss, locationLegacy, locationArea, hawalliLocation, arabicHawalliLocation, locationsIndex, brandTemplate, blogPostTemplate, blogIndex, guidesIndex, newsIndex, bookingPage, arabicBookingPage, contactPage, arabicContactPage, aboutPage, galleryPage] = await Promise.all([
  read('pages/KCROCEditorialRollout.css'),
  read('pages/LocationTemplate.tsx'),
  read('pages/LocationDeepTemplate.tsx'),
  read('pages/HawalliLocationPage.tsx'),
  read('pages/ArabicHawalliLocationPage.tsx'),
  read('pages/Locations.tsx'),
  read('pages/templates/BrandTemplate.tsx'),
  read('pages/BlogPostTemplate.tsx'),
  read('pages/Blog.tsx'),
  read('pages/GuidesIndex.tsx'),
  read('pages/News.tsx'),
  read('pages/BookingPage.tsx'),
  read('pages/ArabicBookingPage.tsx'),
  read('pages/Contact.tsx'),
  read('pages/ArabicContactPage.tsx'),
  read('pages/About.tsx'),
  read('pages/Gallery.tsx'),
]);

const [problemTemplate, problemLayoutCss] = await Promise.all([
  read('pages/templates/ProblemTemplate.tsx'),
  read('pages/templates/ProblemTemplate.css'),
]);

const [arabicServicePage, arabicLiquidDamagePage, macbookBatteryPage] = await Promise.all([
  read('pages/ArabicCommercialPage.tsx'),
  read('pages/ArabicLiquidDamageRepairPage.tsx'),
  read('pages/MacBookBatteryReplacementPage.tsx'),
]);

const [faqPage, pricingPage, arabicPricingPage, brandsIndex, problemsIndex, servicesIndex, nearMePage, authorPage, pillarPage, privacyPolicyPage, termsPage, privacySecurityPage] = await Promise.all([
  read('pages/FAQ.tsx'),
  read('pages/Pricing.tsx'),
  read('pages/ArabicPricingPage.tsx'),
  read('pages/BrandsIndex.tsx'),
  read('pages/ProblemsIndex.tsx'),
  read('pages/Services.tsx'),
  read('pages/NearMe.tsx'),
  read('pages/AuthorImran.tsx'),
  read('pages/PillarTemplate.tsx'),
  read('pages/PrivacyPolicy.tsx'),
  read('pages/TermsOfService.tsx'),
  read('pages/PrivacySecurity.tsx'),
]);

const issues = [];

// Check the foreground/background pairs used by the warm editorial surfaces.
const linearChannel = (value) => {
  const channel = Number.parseInt(value, 16) / 255;
  return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
};
const relativeLuminance = (hex) => {
  const value = hex.replace('#', '');
  const red = linearChannel(value.slice(0, 2));
  const green = linearChannel(value.slice(2, 4));
  const blue = linearChannel(value.slice(4, 6));
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
};
const contrastRatio = (foreground, background) => {
  const values = [relativeLuminance(foreground), relativeLuminance(background)].sort((a, b) => b - a);
  return (values[0] + 0.05) / (values[1] + 0.05);
};
for (const [foreground, background, label] of [
  ['#172022', '#f4efe7', 'editorial heading'],
  ['#566467', '#f4efe7', 'editorial body text'],
  ['#8f4f2c', '#f4efe7', 'editorial copper accent'],
  ['#17110c', '#c9804d', 'repair-process number'],
]) {
  if (contrastRatio(foreground, background) < 4.5) {
    issues.push(label + ': contrast is below 4.5:1.');
  }
}

const requireContains = (content, text, file, description) => {
  if (!content.includes(text)) issues.push(`${file}: ${description}`);
};

requireContains(button, 'min-h-11', 'components/ui/button.tsx', 'shared buttons must provide a 44px minimum height.');
requireContains(button, "icon: 'h-11 w-11'", 'components/ui/button.tsx', 'icon buttons must provide a 44px square target.');
requireContains(button, 'disabled:cursor-not-allowed', 'components/ui/button.tsx', 'disabled controls must visually communicate state.');
requireContains(button, 'motion-reduce:transition-none', 'components/ui/button.tsx', 'shared button transitions must honour reduced motion.');
requireContains(header, 'aria-current={matchPath', 'core/components/layout/Header.tsx', 'the active desktop route must be announced to assistive technology without a redundant boolean cast.');
requireContains(header, "phoneDigits.startsWith('965')", 'core/components/layout/Header.tsx', 'display phone numbers in the Kuwait international format.');
requireContains(footer, 'w-12 h-12 flex items-center justify-center rounded-full', 'core/components/layout/Footer.tsx', 'footer social controls must use 48px square targets.');
requireContains(footer, '<address className="not-italic', 'core/components/layout/Footer.tsx', 'the NAP address must use semantic address markup.');
for (const id of ['contact-name', 'contact-device', 'contact-area', 'contact-symptoms']) {
  requireContains(contact, `htmlFor="${id}"`, 'pages/Contact.tsx', `field ${id} must have an associated label.`);
  requireContains(contact, `id="${id}"`, 'pages/Contact.tsx', `field ${id} must have a stable input ID.`);
}
requireContains(contact, 'Device type / model', 'pages/Contact.tsx', 'the form must collect device identity for technician triage.');
requireContains(contact, 'Pickup area / governorate', 'pages/Contact.tsx', 'the form must collect courier dispatch area.');
requireContains(contact, 'Fault / symptoms', 'pages/Contact.tsx', 'the form must collect diagnostic symptoms.');
requireContains(contact, '*Device type / model:* ${formData.device}', 'pages/Contact.tsx', 'WhatsApp prefill must include device context.');
requireContains(contact, '*Pickup area / governorate:* ${formData.pickupArea}', 'pages/Contact.tsx', 'WhatsApp prefill must include dispatch area.');
requireContains(contact, '*Fault / symptoms:*', 'pages/Contact.tsx', 'WhatsApp prefill must include symptoms.');
if (['name="phone"', 'name="email"', 'contact-phone', 'contact-email', 'contact-subject'].some((field) => contact.includes(field))) issues.push('pages/Contact.tsx: the WhatsApp form must not require low-value phone/email/subject fields.');
requireContains(contact, 'aria-live="polite"', 'pages/Contact.tsx', 'submit feedback must be announced accessibly.');
requireContains(contact, 'Dropping off in person?', 'pages/Contact.tsx', 'contact page must include crawlable walk-in guidance.');
requireContains(contact, 'Basement Shop 19, Hawalli', 'pages/Contact.tsx', 'contact directions must retain the precise Hawalli workshop location.');
requireContains(footer, 'role="list" aria-label="KCROC contact details" className="m-0 list-none space-y-4 p-0"', 'core/components/layout/Footer.tsx', 'contact information must use a named, marker-free semantic list.');
requireContains(footer, 'MapPin className="w-5 h-5 text-[#dfa86f] flex-shrink-0 mt-0.5" aria-hidden="true"', 'core/components/layout/Footer.tsx', 'decorative footer icons must be hidden from assistive technology.');
const seoEngine = await read('core/components/SEOEngine.tsx');
requireContains(seoEngine, '"email": business.email', 'core/components/SEOEngine.tsx', 'the primary business schema must expose its contact email.');
requireContains(seoEngine, '"availableLanguage": ["en", "ar"]', 'core/components/SEOEngine.tsx', 'the primary business contact point must declare English and Arabic.');
requireContains(seoEngine, '"mainEntity": { "@id": `${business.websiteUrl}/#business` }', 'core/components/SEOEngine.tsx', 'the dedicated ContactPage schema must resolve to the canonical business entity.');
requireContains(cookie, 'role="region"', 'core/components/CookieConsentBanner.tsx', 'the non-modal consent banner must not claim modal dialog semantics.');
requireContains(cookie, 'aria-labelledby="cookie-consent-title"', 'core/components/CookieConsentBanner.tsx', 'the consent region must have an accessible name.');
requireContains(hero, 'fetchPriority="high"', 'components/home/Hero.tsx', 'the hero image must retain high fetch priority.');
requireContains(hero, 'Free pick-up & drop across all Kuwait governorates', 'components/home/Hero.tsx', 'hero trust signals must state the full governorate-wide pickup promise.');
requireContains(servicesGrid, 'Free pick-up & drop across all Kuwait governorates', 'components/home/ServicesGrid.tsx', 'the service grid must expose the Kuwait-wide free pickup promise.');
requireContains(servicesGrid, 'Arrange free pickup', 'components/home/ServicesGrid.tsx', 'the service-grid logistics banner must have a next step.');
requireContains(servicesGrid, 'services.slice(0, 6)', 'components/home/ServicesGrid.tsx', 'the homepage must initially show six services.');
requireContains(servicesGrid, 'aria-expanded={showAllServices}', 'components/home/ServicesGrid.tsx', 'the show-all-services control must expose its expanded state.');
requireContains(servicesGrid, 'aria-controls="homepage-services-grid"', 'components/home/ServicesGrid.tsx', 'the show-all-services control must identify the service grid it controls.');
requireContains(servicesGrid, 'aspect-[16/9]', 'components/home/ServicesGrid.tsx', 'service thumbnails must reserve a consistent 16:9 aspect ratio.');
requireContains(pricingTable, 'aspect-[16/9]', 'components/home/PricingTable.tsx', 'pricing thumbnails must reserve a consistent 16:9 aspect ratio.');
requireContains(servicesGrid, 'kcroc-section-light kcroc-editorial-section', 'components/home/ServicesGrid.tsx', 'service discovery must use the scoped light editorial surface.');
requireContains(pricingTable, 'kcroc-section-light kcroc-editorial-section', 'components/home/PricingTable.tsx', 'pricing must use the scoped light editorial surface.');
requireContains(sectionHeader, "tone?: 'copper' | 'gold' | 'ink';", 'components/ui/section-header.tsx', 'shared section headers must support a high-contrast editorial accent.');
requireContains(header, 'min-h-[72px]', 'core/components/layout/Header.tsx', 'the shared header must use the compact 72px content row.');
requireContains(header, 'text-[#8f4f2c]', 'core/components/layout/Header.tsx', 'header emphasis must use the KCROC copper palette.');
if (/blue-\d/.test(header + desktopMegaMenu)) issues.push('Header and desktop mega menu must not retain the former blue accent system.');
requireContains(leadMagnet, 'min-h-[92px] min-w-12', 'components/home/LeadMagnet.tsx', 'Quick Repair Check option controls must have at least 48px minimum dimensions.');
requireContains(leadMagnet, 'text-start', 'components/home/LeadMagnet.tsx', 'Quick Repair Check option labels must use logical text alignment.');
requireContains(leadMagnet, 'end-3', 'components/home/LeadMagnet.tsx', 'selection indicators must use logical positioning for RTL layouts.');
requireContains(booking, 'Free pick-up and delivery across all Kuwait governorates.', 'pages/BookingPage.tsx', 'the booking page must restate the accurate governorate-wide pickup guarantee.');
requireContains(repairProof, 'WhatsApp a Technician', 'components/home/RepairProofCTA.tsx', 'the repair proof CTA must use its visible label as its accessible name.');
if (repairProof.includes('aria-label="Message KCROC on WhatsApp"')) issues.push('components/home/RepairProofCTA.tsx: accessible name must contain the visible “WhatsApp a Technician” text.');
requireContains(stickyCta, "aria-label={isArabicRoute ? `${ctaLabel} عبر واتساب` : `${ctaLabel} via WhatsApp`}", 'components/home/StickyMobileCTA.tsx', 'dynamic sticky CTA accessible name must include its visible label in the active language.');
requireContains(globalCss, 'outline: 3px solid #efc697', 'index.css', 'global focus visibility must use a prominent outline.');
requireContains(globalCss, '@media (prefers-reduced-motion: reduce)', 'index.css', 'global UI motion must respect reduced-motion preferences.');
requireContains(legacyCss, "'Plus Jakarta Sans'", 'styles/kcroc.css', 'legacy CSS must not override the site-wide typography.');
requireContains(legacyCss, '@media (prefers-reduced-motion: reduce)', 'styles/kcroc.css', 'legacy animations and smooth scrolling must respect reduced motion.');
requireContains(schema, '.replace(/</g,', 'components/seo/SchemaMarkup.tsx', 'JSON-LD must escape less-than characters before inline script rendering.');
requireContains(graph, "title: 'Laptop Repair Kuwait | Board-Level Lab & Free Pickup | KCROC'", 'data/graph.ts', 'laptop repair SEO title must emphasise board-level capability and free pickup.');
requireContains(graph, "description: 'Laptop repair in Kuwait for power, charging, screen and hinge faults. Selected repairs from 15 KWD. Free diagnosis, pickup and 30-day repair warranty.'", 'data/graph.ts', 'laptop repair meta description must state selected-repair starting price, diagnosis, pickup and warranty.');
requireContains(graph, 'pricingGuide: {', 'data/graph.ts', 'laptop pricing rows must remain in the canonical knowledge graph.');
requireContains(graphSchema, 'pricingGuide: z.object({', 'types/knowledgeGraph.ts', 'graph schema must validate service pricing-guide data.');
requireContains(serviceTemplate, 'entity.pricingGuide.rows.map', 'pages/templates/ServiceTemplate.tsx', 'pricing rows must render as a semantic table from graph data.');
requireContains(serviceTemplate, '<details', 'pages/templates/ServiceTemplate.tsx', 'service FAQ answers must remain in initial HTML DOM in native disclosure elements.');
requireContains(serviceTemplate, 'onToggle={(event) => {', 'pages/templates/ServiceTemplate.tsx', 'opening a service FAQ must retain the analytics event.');
requireContains(serviceTemplate, '.filter((feature) => feature.trim().length > 0)', 'pages/templates/ServiceTemplate.tsx', 'blank capability entries must not create empty list items.');
requireContains(serviceTemplate, '.filter((item) => item.trim().length > 0)', 'pages/templates/ServiceTemplate.tsx', 'blank inspection entries must not create empty list items.');
requireContains(serviceLayoutCss, 'KCROC SERVICE EDITORIAL PANELS — 2026-11-16', 'pages/templates/ServiceTemplateLaptopLayout.css', 'service pages must document the scoped editorial surface pass.');
requireContains(serviceLayoutCss, '[aria-labelledby="laptop-repair-pricing-heading"]', 'pages/templates/ServiceTemplateLaptopLayout.css', 'service pricing must use the light editorial treatment.');
requireContains(serviceLayoutCss, '[aria-labelledby="service-faqs-heading"]', 'pages/templates/ServiceTemplateLaptopLayout.css', 'service FAQs must use the light editorial treatment.');
requireContains(serviceLayoutCss, 'background: #f4efe7 !important;', 'pages/templates/ServiceTemplateLaptopLayout.css', 'service editorial panels must use the KCROC warm neutral surface.');

requireContains(arabicServicePage, 'ARABIC_SERVICE_LAYOUT_SLUGS', 'pages/ArabicCommercialPage.tsx', 'Arabic service-detail pages must be explicitly scoped without restyling area pages.');
requireContains(arabicServicePage, "data-service-layout={slug && ARABIC_SERVICE_LAYOUT_SLUGS.has(slug) ? 'arabic' : undefined}", 'pages/ArabicCommercialPage.tsx', 'Arabic service pages must opt into the shared editorial treatment only on service routes.');
requireContains(arabicLiquidDamagePage, 'data-service-layout="arabic-liquid-damage"', 'pages/ArabicLiquidDamageRepairPage.tsx', 'the separate Arabic liquid-damage service page must use the editorial service styling hooks.');
requireContains(macbookBatteryPage, "import './templates/ServiceTemplateLaptopLayout.css';", 'pages/MacBookBatteryReplacementPage.tsx', 'the standalone MacBook battery page must load the shared service-page styling layer.');
requireContains(macbookBatteryPage, 'data-service-layout="macbook-battery"', 'pages/MacBookBatteryReplacementPage.tsx', 'the standalone MacBook battery page must opt into its route-specific editorial panels.');
requireContains(serviceLayoutCss, '[data-service-layout="arabic"]', 'pages/templates/ServiceTemplateLaptopLayout.css', 'Arabic service pages must have RTL-safe editorial panel styling.');
requireContains(serviceLayoutCss, '[data-service-layout="arabic-liquid-damage"]', 'pages/templates/ServiceTemplateLaptopLayout.css', 'Arabic liquid-damage pricing and FAQs must use the warm editorial treatment while safety content stays separate.');
requireContains(serviceLayoutCss, '[data-service-layout="macbook-battery"]', 'pages/templates/ServiceTemplateLaptopLayout.css', 'the standalone English MacBook battery service must share the editorial panel system.');

requireContains(arabicServicePage, 'data-service-editorial-panel', 'pages/ArabicCommercialPage.tsx', 'route-specific Arabic service reading sections must opt into the shared editorial treatment.');
requireContains(serviceLayoutCss, '[data-service-layout] section[data-service-editorial-panel]', 'pages/templates/ServiceTemplateLaptopLayout.css', 'English and Arabic marked service reading sections must use the shared editorial styling.');
requireContains(serviceTemplate, 'aria-labelledby="repair-process-heading"', 'pages/templates/ServiceTemplate.tsx', 'the English repair-process section must retain its accessible heading.');
requireContains(serviceTemplate, 'data-service-editorial-panel', 'pages/templates/ServiceTemplate.tsx', 'the English repair-process section must opt into the shared editorial treatment.');
requireContains(serviceLayoutCss, '[aria-labelledby="repair-process-heading"] article > span', 'pages/templates/ServiceTemplateLaptopLayout.css', 'repair-process step numbers must use the warm copper marker.');
requireContains(serviceLayoutCss, 'background: #c9804d !important;', 'pages/templates/ServiceTemplateLaptopLayout.css', 'warm service-process markers must use KCROC copper.');
requireContains(serviceLayoutCss, 'color: #17110c !important;', 'pages/templates/ServiceTemplateLaptopLayout.css', 'warm service-process markers must use a high-contrast dark foreground.');
requireContains(serviceLayoutCss, 'border-radius: 1.4rem;', 'pages/templates/ServiceTemplateLaptopLayout.css', 'service hero corners must be restrained rather than oversized.');
requireContains(globalCss, "--kcroc-arabic-font: 'IBM Plex Sans Arabic', 'Noto Sans Arabic', Tahoma, Arial, sans-serif;", 'index.css', 'Arabic reading areas must use the licensed, self-hosted IBM Plex font stack.');
requireContains(globalCss, ':lang(ar):is(h1, h2, h3, h4)', 'index.css', 'Arabic headings must not inherit tight Latin tracking and must retain adequate line height.');
requireContains(arabicServicePage, 'aria-labelledby="charging-port-repair-process" data-service-editorial-panel', 'pages/ArabicCommercialPage.tsx', 'Arabic charging-port process section must use the shared editorial panel.');
requireContains(arabicServicePage, 'aria-labelledby="keyboard-repair-process" data-service-editorial-panel', 'pages/ArabicCommercialPage.tsx', 'Arabic keyboard process section must use the shared editorial panel.');
requireContains(arabicServicePage, 'aria-labelledby="macbook-screen-process" data-service-editorial-panel', 'pages/ArabicCommercialPage.tsx', 'Arabic MacBook screen process section must use the shared editorial panel.');

requireContains(problemTemplate, "import './ProblemTemplate.css';", 'pages/templates/ProblemTemplate.tsx', 'problem pages must load their scoped editorial styling.');
requireContains(problemTemplate, 'data-problem-layout', 'pages/templates/ProblemTemplate.tsx', 'problem styling must be scoped to the problem template.');
for (const panel of ['quick-answer', 'diagnostic-path', 'safe-checks', 'common-causes', 'kuwait-context', 'expert-notes', 'technician-diagnosis', 'price-estimates', 'kcroc-solution', 'brands-covered', 'handled-under', 'related-resources', 'technical-references', 'faq']) {
  requireContains(problemTemplate, `data-problem-editorial-panel="${panel}"`, 'pages/templates/ProblemTemplate.tsx', `the ${panel} reading section must opt into the warm editorial treatment.`);
}
if (/aria-labelledby="safety"[^>]*data-problem-editorial-panel/.test(problemTemplate)) issues.push('pages/templates/ProblemTemplate.tsx: the safety warning section must retain its distinct high-attention treatment.');
requireContains(problemLayoutCss, 'background: var(--problem-paper);', 'pages/templates/ProblemTemplate.css', 'marked problem sections must use the KCROC warm paper surface.');
requireContains(problemLayoutCss, 'background: #c9804d !important;', 'pages/templates/ProblemTemplate.css', 'primary actions on editorial sections must use the KCROC copper accent.');
requireContains(problemLayoutCss, '@media (max-width: 639px)', 'pages/templates/ProblemTemplate.css', 'editorial sections must have a dedicated compact mobile layout.');
requireContains(problemLayoutCss, '@media (prefers-reduced-motion: reduce)', 'pages/templates/ProblemTemplate.css', 'editorial section interactions must respect reduced-motion preferences.');

requireContains(rolloutCss, '--kcroc-rollout-paper: #f4efe7;', 'pages/KCROCEditorialRollout.css', 'website-wide templates must share the KCROC warm paper palette.');
requireContains(rolloutCss, '--kcroc-rollout-copper: #8f4f2c;', 'pages/KCROCEditorialRollout.css', 'website-wide templates must share the copper editorial accent.');
requireContains(rolloutCss, '@media (max-width: 639px)', 'pages/KCROCEditorialRollout.css', 'the shared treatment must include a compact mobile layout.');
requireContains(rolloutCss, '@media (prefers-reduced-motion: reduce)', 'pages/KCROCEditorialRollout.css', 'the shared treatment must respect reduced-motion preferences.');

for (const [content, marker, file] of [
  [locationLegacy, 'data-kcroc-rollout="location-legacy"', 'pages/LocationTemplate.tsx'],
  [locationArea, 'data-kcroc-rollout="location-area"', 'pages/LocationDeepTemplate.tsx'],
  [hawalliLocation, 'data-kcroc-rollout="location-hawalli"', 'pages/HawalliLocationPage.tsx'],
  [arabicHawalliLocation, 'data-kcroc-rollout="location-hawalli-ar"', 'pages/ArabicHawalliLocationPage.tsx'],
  [locationsIndex, 'data-kcroc-rollout="locations-index"', 'pages/Locations.tsx'],
  [brandTemplate, 'data-kcroc-rollout="brand"', 'pages/templates/BrandTemplate.tsx'],
  [blogPostTemplate, 'data-kcroc-rollout="article"', 'pages/BlogPostTemplate.tsx'],
  [blogIndex, 'data-kcroc-rollout="blog-index"', 'pages/Blog.tsx'],
  [guidesIndex, 'data-kcroc-rollout="guides-index"', 'pages/GuidesIndex.tsx'],
  [newsIndex, 'data-kcroc-rollout="news-index"', 'pages/News.tsx'],
  [bookingPage, 'data-kcroc-rollout="booking"', 'pages/BookingPage.tsx'],
  [arabicBookingPage, 'data-kcroc-rollout="booking-ar"', 'pages/ArabicBookingPage.tsx'],
  [contactPage, 'data-kcroc-rollout="contact"', 'pages/Contact.tsx'],
  [arabicContactPage, 'data-kcroc-rollout="contact-ar"', 'pages/ArabicContactPage.tsx'],
  [aboutPage, 'data-kcroc-rollout="about"', 'pages/About.tsx'],
  [galleryPage, 'data-kcroc-rollout="gallery"', 'pages/Gallery.tsx'],
]) requireContains(content, marker, file, 'this page family must opt into the shared KCROC editorial rollout.');

requireContains(locationArea, 'data-kcroc-editorial-panel="location-content"', 'pages/LocationDeepTemplate.tsx', 'service-area reading sections must use the shared editorial panels.');
requireContains(locationArea, 'data-tower-handover-generator="true"', 'pages/LocationDeepTemplate.tsx', 'the live tower handover tool must remain present.');
requireContains(locationArea, 'aria-labelledby="local-emergency-protocol"', 'pages/LocationDeepTemplate.tsx', 'the local emergency protocol must remain available separately.');
requireContains(hawalliLocation, 'data-kcroc-editorial-panel="hawalli-content"', 'pages/HawalliLocationPage.tsx', 'Hawalli content sections must opt into the editorial treatment.');
requireContains(arabicHawalliLocation, 'data-kcroc-editorial-panel="hawalli-content"', 'pages/ArabicHawalliLocationPage.tsx', 'Arabic Hawalli content sections must opt into the editorial treatment.');
requireContains(brandTemplate, 'data-brand-content="true"', 'pages/templates/BrandTemplate.tsx', 'brand engineering content must use its explicit editorial scope.');
requireContains(blogPostTemplate, 'data-kcroc-editorial-panel="article-body"', 'pages/BlogPostTemplate.tsx', 'the long-form article body must use the warm reading surface.');
requireContains(bookingPage, 'onSubmit={handleWhatsAppRedirect}', 'pages/BookingPage.tsx', 'the English booking WhatsApp submission behavior must remain intact.');
requireContains(arabicBookingPage, 'onSubmit={handleWhatsAppRedirect}', 'pages/ArabicBookingPage.tsx', 'the Arabic booking WhatsApp submission behavior must remain intact.');
requireContains(contactPage, 'onSubmit={handleSubmit}', 'pages/Contact.tsx', 'the English contact form submission behavior must remain intact.');
requireContains(arabicContactPage, 'onSubmit={handleSubmit}', 'pages/ArabicContactPage.tsx', 'the Arabic contact form submission behavior must remain intact.');
requireContains(aboutPage, 'data-kcroc-editorial-panel="about-story"', 'pages/About.tsx', 'the About story must use the shared editorial treatment.');
requireContains(galleryPage, 'data-kcroc-editorial-panel="gallery-conversion"', 'pages/Gallery.tsx', 'the Gallery enquiry panel must use the shared editorial treatment.');

// Secondary customer-page families now share the KCROC editorial system.
for (const [content, rootMarker, file] of [
  [faqPage, 'data-kcroc-rollout="faq"', 'pages/FAQ.tsx'],
  [brandsIndex, 'data-kcroc-rollout="brands-index"', 'pages/BrandsIndex.tsx'],
  [problemsIndex, 'data-kcroc-rollout="problems-index"', 'pages/ProblemsIndex.tsx'],
  [servicesIndex, 'data-kcroc-rollout="services-index"', 'pages/Services.tsx'],
  [nearMePage, 'data-kcroc-rollout="near-me"', 'pages/NearMe.tsx'],
  [authorPage, 'data-kcroc-rollout="author"', 'pages/AuthorImran.tsx'],
  [pillarPage, 'data-kcroc-rollout="pillar-article"', 'pages/PillarTemplate.tsx'],
  [privacyPolicyPage, 'data-kcroc-rollout="legal"', 'pages/PrivacyPolicy.tsx'],
  [termsPage, 'data-kcroc-rollout="legal"', 'pages/TermsOfService.tsx'],
  [privacySecurityPage, 'data-kcroc-rollout="privacy-security"', 'pages/PrivacySecurity.tsx'],
]) requireContains(content, rootMarker, file, 'this secondary page family must opt into the shared KCROC UI.');

for (const [content, panelMarker, file] of [
  [faqPage, 'data-kcroc-editorial-panel="faq-answers"', 'pages/FAQ.tsx'],
  [brandsIndex, 'data-kcroc-editorial-panel="brand-index-cards"', 'pages/BrandsIndex.tsx'],
  [problemsIndex, 'data-kcroc-editorial-panel="problem-index-cards"', 'pages/ProblemsIndex.tsx'],
  [servicesIndex, 'data-kcroc-editorial-panel="service-index-cards"', 'pages/Services.tsx'],
  [nearMePage, 'data-kcroc-editorial-panel="near-me-arabic"', 'pages/NearMe.tsx'],
  [authorPage, 'data-kcroc-editorial-panel="author-articles"', 'pages/AuthorImran.tsx'],
  [pillarPage, 'data-kcroc-editorial-panel="pillar-body"', 'pages/PillarTemplate.tsx'],
  [privacyPolicyPage, 'data-kcroc-editorial-panel="legal-body"', 'pages/PrivacyPolicy.tsx'],
  [termsPage, 'data-kcroc-editorial-panel="legal-body"', 'pages/TermsOfService.tsx'],
  [privacySecurityPage, 'data-kcroc-editorial-panel="security-related-services"', 'pages/PrivacySecurity.tsx'],
]) requireContains(content, panelMarker, file, 'the relevant content section must use the shared editorial surface.');

requireContains(faqPage, 'toggleFaq(faq.id, e)', 'pages/FAQ.tsx', 'FAQ accordions must retain their open-state interaction.');
requireContains(faqPage, 'copyToClipboard(faq.id, e)', 'pages/FAQ.tsx', 'FAQ direct-link copying must remain available.');
requireContains(pricingPage, 'setDeviceFilter(filter.value)', 'pages/Pricing.tsx', 'device pricing filters must remain functional.');
requireContains(pricingPage, 'setSymptomFilter(filter.value)', 'pages/Pricing.tsx', 'symptom pricing filters must remain functional.');
requireContains(pricingPage, 'data-pricing-table={category.anchor}', 'pages/Pricing.tsx', 'the price matrix must remain available in the page.');
requireContains(problemsIndex, "high: 'text-red-400", 'pages/ProblemsIndex.tsx', 'high urgency must keep its red status treatment.');
requireContains(problemsIndex, "medium: 'text-amber-400", 'pages/ProblemsIndex.tsx', 'medium urgency must keep its amber status treatment.');
requireContains(nearMePage, 'one strong hub', 'pages/NearMe.tsx', 'the near-me page must remain one consolidated local-intent hub.');
requireContains(privacyPolicyPage, 'onClick={openConsentPreferences}', 'pages/PrivacyPolicy.tsx', 'privacy consent settings must remain interactive.');
requireContains(rolloutCss, '[data-kcroc-rollout="privacy-security"]', 'pages/KCROCEditorialRollout.css', 'security and privacy pages must scope only their selected editorial sections.');

if (issues.length) {
  console.error('❌ Global UI/UX regression checks failed:');
  for (const issue of issues) console.error(`- ${issue}`);
  process.exit(1);
}

console.log(`✅ Global UI/UX source regression checks passed. Inventoried ${files.length} TypeScript/React/CSS source files.`);
console.log('   Coverage: shared control size/states, active navigation, E.164 display, footer address semantics, Contact labels/input mode, consent semantics, hero priority/logistics, focus styles, reduced motion, and JSON-LD escaping.');
console.log('   These source checks complement; they do not replace rendered contrast, keyboard, screen-reader, or viewport testing.');
