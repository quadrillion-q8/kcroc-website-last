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
const [button, header, footer, contact, cookie, hero, globalCss, legacyCss, schema] = await Promise.all([
  read('components/ui/button.tsx'),
  read('core/components/layout/Header.tsx'),
  read('core/components/layout/Footer.tsx'),
  read('pages/Contact.tsx'),
  read('core/components/CookieConsentBanner.tsx'),
  read('components/home/Hero.tsx'),
  read('index.css'),
  read('styles/kcroc.css'),
  read('components/seo/SchemaMarkup.tsx'),
]);

const issues = [];
const requireContains = (content, text, file, description) => {
  if (!content.includes(text)) issues.push(`${file}: ${description}`);
};

requireContains(button, 'min-h-11', 'components/ui/button.tsx', 'shared buttons must provide a 44px minimum height.');
requireContains(button, "icon: 'h-11 w-11'", 'components/ui/button.tsx', 'icon buttons must provide a 44px square target.');
requireContains(button, 'disabled:cursor-not-allowed', 'components/ui/button.tsx', 'disabled controls must visually communicate state.');
requireContains(button, 'motion-reduce:transition-none', 'components/ui/button.tsx', 'shared button transitions must honour reduced motion.');
requireContains(header, 'aria-current={!!matchPath', 'core/components/layout/Header.tsx', 'the active desktop route must be announced to assistive technology.');
requireContains(header, "phoneDigits.startsWith('965')", 'core/components/layout/Header.tsx', 'display phone numbers in the Kuwait international format.');
requireContains(footer, 'w-11 h-11 flex items-center justify-center rounded-full', 'core/components/layout/Footer.tsx', 'footer social controls must use 44px square targets.');
requireContains(footer, '<address className="not-italic', 'core/components/layout/Footer.tsx', 'the NAP address must use semantic address markup.');
for (const id of ['contact-name', 'contact-phone', 'contact-email', 'contact-subject', 'contact-message']) {
  requireContains(contact, `htmlFor="${id}"`, 'pages/Contact.tsx', `field ${id} must have an associated label.`);
  requireContains(contact, `id="${id}"`, 'pages/Contact.tsx', `field ${id} must have a stable input ID.`);
}
requireContains(contact, 'inputMode="tel"', 'pages/Contact.tsx', 'the phone field must present a telephone-friendly mobile keyboard.');
requireContains(contact, 'aria-live="polite"', 'pages/Contact.tsx', 'submit feedback must be announced accessibly.');
requireContains(cookie, 'role="region"', 'core/components/CookieConsentBanner.tsx', 'the non-modal consent banner must not claim modal dialog semantics.');
requireContains(cookie, 'aria-labelledby="cookie-consent-title"', 'core/components/CookieConsentBanner.tsx', 'the consent region must have an accessible name.');
requireContains(hero, 'fetchPriority="high"', 'components/home/Hero.tsx', 'the hero image must retain high fetch priority.');
requireContains(hero, 'Free pickup & delivery across Kuwait', 'components/home/Hero.tsx', 'mobile hero trust signals must state the Kuwait-wide pickup promise.');
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
