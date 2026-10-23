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
const [button, header, footer, contact, cookie, hero, globalCss, legacyCss, schema, servicesGrid, booking, repairProof, stickyCta] = await Promise.all([
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
for (const id of ['contact-name', 'contact-phone', 'contact-email', 'contact-subject', 'contact-message']) {
  requireContains(contact, `htmlFor="${id}"`, 'pages/Contact.tsx', `field ${id} must have an associated label.`);
  requireContains(contact, `id="${id}"`, 'pages/Contact.tsx', `field ${id} must have a stable input ID.`);
}
requireContains(contact, 'inputMode="tel"', 'pages/Contact.tsx', 'the phone field must present a telephone-friendly mobile keyboard.');
if (contact.includes('placeholder="+965 55301913"')) issues.push('pages/Contact.tsx: do not hardcode KCROC\'s own phone number as an example customer phone; it trips constant-drift validation.');
requireContains(contact, 'aria-live="polite"', 'pages/Contact.tsx', 'submit feedback must be announced accessibly.');
requireContains(cookie, 'role="region"', 'core/components/CookieConsentBanner.tsx', 'the non-modal consent banner must not claim modal dialog semantics.');
requireContains(cookie, 'aria-labelledby="cookie-consent-title"', 'core/components/CookieConsentBanner.tsx', 'the consent region must have an accessible name.');
requireContains(hero, 'fetchPriority="high"', 'components/home/Hero.tsx', 'the hero image must retain high fetch priority.');
requireContains(hero, 'Free pick-up & drop across all Kuwait governorates', 'components/home/Hero.tsx', 'hero trust signals must state the full governorate-wide pickup promise.');
requireContains(servicesGrid, 'Free pick-up &amp; drop across all Kuwait governorates', 'components/home/ServicesGrid.tsx', 'the service grid must expose the Kuwait-wide free pickup promise.');
requireContains(servicesGrid, 'Arrange free pickup', 'components/home/ServicesGrid.tsx', 'the service-grid logistics banner must have a next step.');
requireContains(booking, 'Free pick-up and delivery across all Kuwait governorates.', 'pages/BookingPage.tsx', 'the booking page must restate the accurate governorate-wide pickup guarantee.');
requireContains(repairProof, 'WhatsApp a Technician', 'components/home/RepairProofCTA.tsx', 'the repair proof CTA must use its visible label as its accessible name.');
if (repairProof.includes('aria-label="Message KCROC on WhatsApp"')) issues.push('components/home/RepairProofCTA.tsx: accessible name must contain the visible “WhatsApp a Technician” text.');
requireContains(stickyCta, 'aria-label={`${ctaLabel} via WhatsApp`}', 'components/home/StickyMobileCTA.tsx', 'dynamic sticky CTA accessible name must include its visible label.');
requireContains(globalCss, 'outline: 3px solid #efc697', 'index.css', 'global focus visibility must use a prominent outline.');
requireContains(globalCss, '@media (prefers-reduced-motion: reduce)', 'index.css', 'global UI motion must respect reduced-motion preferences.');
requireContains(legacyCss, "'Plus Jakarta Sans'", 'styles/kcroc.css', 'legacy CSS must not override the site-wide typography.');
requireContains(legacyCss, '@media (prefers-reduced-motion: reduce)', 'styles/kcroc.css', 'legacy animations and smooth scrolling must respect reduced motion.');
requireContains(schema, '.replace(/</g,', 'components/seo/SchemaMarkup.tsx', 'JSON-LD must escape less-than characters before inline script rendering.');

if (issues.length) {
  console.error('❌ Global UI/UX regression checks failed:');
  for (const issue of issues) console.error(`- ${issue}`);
  process.exit(1);
}

console.log(`✅ Global UI/UX source regression checks passed. Inventoried ${files.length} TypeScript/React/CSS source files.`);
console.log('   Coverage: shared control size/states, active navigation, E.164 display, footer address semantics, Contact labels/input mode, consent semantics, hero priority/logistics, focus styles, reduced motion, and JSON-LD escaping.');
console.log('   These source checks complement; they do not replace rendered contrast, keyboard, screen-reader, or viewport testing.');
