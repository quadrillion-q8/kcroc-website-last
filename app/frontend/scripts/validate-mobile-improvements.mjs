import { readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const root = path.resolve('src');
const files = {
  home: 'pages/Home.tsx',
  hero: 'components/home/Hero.tsx',
  sticky: 'components/home/StickyMobileCTA.tsx',
  rootLayout: 'core/components/layout/RootLayout.tsx',
  cookie: 'core/components/CookieConsentBanner.tsx',
  css: 'index.css',
  booking: 'pages/BookingPage.tsx',
  mobileMenu: 'core/components/layout/MobileMenu.tsx',
};
const source = {};
for (const [key, relativePath] of Object.entries(files)) {
  source[key] = await readFile(path.join(root, relativePath), 'utf8');
}

const issues = [];
const requireText = (key, needle, reason) => {
  if (!source[key].includes(needle)) issues.push(`${files[key]}: ${reason}`);
};

const serviceIndex = source.home.indexOf('<ServicesGrid />');
const quoteSelectorIndex = source.home.indexOf('<LeadMagnet />');
if (serviceIndex < 0 || quoteSelectorIndex < 0 || serviceIndex > quoteSelectorIndex) {
  issues.push('pages/Home.tsx: core service categories must render before the interactive quote selector.');
}

requireText('hero', '<h1 ', 'the mobile hero must expose a native H1 heading.');
requireText('hero', 'fetchPriority="high"', 'the hero image must retain high fetch priority.');
requireText('hero', 'sizes="(max-width: 1023px) calc(100vw - 2rem), 50vw"', 'the hero image sizes must reflect mobile container width.');
requireText('hero', 'Get Free Quote', 'the mobile hero quote CTA is missing.');
requireText('hero', 'Book Pickup', 'the mobile hero pickup CTA is missing.');

requireText('sticky', 'kcroc-mobile-sticky-cta', 'the persistent contact bar must remain identifiable for mobile layout styling.');
requireText('sticky', 'min-h-[48px]', 'sticky actions must meet the 48px minimum touch target height.');
requireText('sticky', "env(safe-area-inset-bottom)", 'the sticky bar must respect device safe areas.');
requireText('rootLayout', 'kcroc-mobile-cta-spacer', 'page content needs a matching spacer below the fixed CTA.');
requireText('rootLayout', 'calc(5.25rem + env(safe-area-inset-bottom))', 'the CTA spacer must account for the device safe area.');

requireText('cookie', 'kcroc-cookie-banner', 'the consent panel must use the responsive mobile layout class.');
requireText('cookie', 'min-h-[48px]', 'cookie choice actions must meet the 48px minimum touch target height.');
requireText('cookie', '<span className="sm:hidden">Reject</span>', 'the cookie reject action must use a compact mobile label.');
requireText('css', '15rem', 'the cookie panel must stay compact on short mobile screens.');
requireText('css', 'max-height: calc(100dvh - 7rem - env(safe-area-inset-bottom))', 'the consent panel must be constrained to the dynamic mobile viewport.');
requireText('css', 'overflow-y: auto;', 'the consent panel must scroll when short viewports cannot fit its content.');

requireText('booking', 'onSubmit={handleWhatsAppRedirect}', 'the booking form must submit through a semantic form handler.');
requireText('booking', "trackConversion('begin_booking'", 'the booking funnel must record a begin_booking event.');
requireText('booking', "trackConversion('whatsapp_click'", 'the WhatsApp handoff click must remain measurable.');
requireText('booking', "import { buildWhatsAppLink }", 'the booking form must use the shared normalized WhatsApp link builder.');
requireText('booking', 'htmlFor="booking-issue"', 'the issue textarea must have an associated label.');
requireText('booking', 'htmlFor="booking-location"', 'the location input must have an associated label.');
requireText('booking', 'aria-pressed={deviceType === type}', 'device-choice buttons must expose their selected state.');
requireText('mobileMenu', "import { buildWhatsAppLink }", 'mobile navigation must use the normalized WhatsApp link builder.');
requireText('mobileMenu', 'href={mobileMenuWhatsAppLink}', 'mobile navigation WhatsApp actions must use the normalized phone number.');
requireText('mobileMenu', "trackConversion('whatsapp_click', { cta_name: 'mobile_menu_quick_whatsapp'", 'mobile navigation WhatsApp taps must fire an explicit contact conversion.');
requireText('mobileMenu', 'z-[110]', 'the open mobile navigation must remain above the consent panel.');
if (source.mobileMenu.includes('href={`https://wa.me/${cleanTel}`}')) {
  issues.push('core/components/layout/MobileMenu.tsx: a raw local-format WhatsApp number remains in the mobile menu.');
}

if (issues.length) {
  console.error('❌ Mobile improvement validation failed:');
  for (const issue of issues) console.error(`- ${issue}`);
  process.exit(1);
}

console.log('✅ Mobile improvement source checks passed (layout, touch targets, cookie panel, image priority, accessible booking fields, and conversion tracking).');
