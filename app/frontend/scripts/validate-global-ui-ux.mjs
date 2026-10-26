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
const [button, header, footer, contact, cookie, hero, globalCss, legacyCss, schema, servicesGrid, booking, repairProof, stickyCta, leadMagnet, pricingTable] = await Promise.all([
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
]);

const [serviceTemplate, graph, graphSchema] = await Promise.all([
  read('pages/templates/ServiceTemplate.tsx'),
  read('data/graph.ts'),
  read('types/knowledgeGraph.ts'),
]);

const issues = [];
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
requireContains(servicesGrid, 'Free pick-up &amp; drop across all Kuwait governorates', 'components/home/ServicesGrid.tsx', 'the service grid must expose the Kuwait-wide free pickup promise.');
requireContains(servicesGrid, 'Arrange free pickup', 'components/home/ServicesGrid.tsx', 'the service-grid logistics banner must have a next step.');
requireContains(servicesGrid, 'services.slice(0, 6)', 'components/home/ServicesGrid.tsx', 'the homepage must initially show six services.');
requireContains(servicesGrid, 'aria-expanded={showAllServices}', 'components/home/ServicesGrid.tsx', 'the show-all-services control must expose its expanded state.');
requireContains(servicesGrid, 'aria-controls="homepage-services-grid"', 'components/home/ServicesGrid.tsx', 'the show-all-services control must identify the service grid it controls.');
requireContains(servicesGrid, 'aspect-[16/9]', 'components/home/ServicesGrid.tsx', 'service thumbnails must reserve a consistent 16:9 aspect ratio.');
requireContains(pricingTable, 'aspect-[16/9]', 'components/home/PricingTable.tsx', 'pricing thumbnails must reserve a consistent 16:9 aspect ratio.');
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
requireContains(graph, "description: 'Expert laptop repair in Kuwait from 15 KWD.", 'data/graph.ts', 'laptop repair meta description must state the starting price and warranty.');
requireContains(graph, 'pricingGuide: {', 'data/graph.ts', 'laptop pricing rows must remain in the canonical knowledge graph.');
requireContains(graphSchema, 'pricingGuide: z.object({', 'types/knowledgeGraph.ts', 'graph schema must validate service pricing-guide data.');
requireContains(serviceTemplate, 'entity.pricingGuide.rows.map', 'pages/templates/ServiceTemplate.tsx', 'pricing rows must render as a semantic table from graph data.');
requireContains(serviceTemplate, '<details', 'pages/templates/ServiceTemplate.tsx', 'service FAQ answers must remain in initial HTML DOM in native disclosure elements.');
requireContains(serviceTemplate, 'onToggle={(event) => {', 'pages/templates/ServiceTemplate.tsx', 'opening a service FAQ must retain the analytics event.');
requireContains(serviceTemplate, '.filter((feature) => feature.trim().length > 0)', 'pages/templates/ServiceTemplate.tsx', 'blank capability entries must not create empty list items.');
requireContains(serviceTemplate, '.filter((item) => item.trim().length > 0)', 'pages/templates/ServiceTemplate.tsx', 'blank inspection entries must not create empty list items.');

if (issues.length) {
  console.error('❌ Global UI/UX regression checks failed:');
  for (const issue of issues) console.error(`- ${issue}`);
  process.exit(1);
}

console.log(`✅ Global UI/UX source regression checks passed. Inventoried ${files.length} TypeScript/React/CSS source files.`);
console.log('   Coverage: shared control size/states, active navigation, E.164 display, footer address semantics, Contact labels/input mode, consent semantics, hero priority/logistics, focus styles, reduced motion, and JSON-LD escaping.');
console.log('   These source checks complement; they do not replace rendered contrast, keyboard, screen-reader, or viewport testing.');
