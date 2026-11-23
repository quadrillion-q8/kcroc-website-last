// File: app/frontend/src/utils/locale.ts
//
// Keep the language-switch routes reciprocal with each page's SEO alternate
// configuration. The English computer-repair hub is the counterpart of
// /ar/computer-repair-kuwait; Services and troubleshooting guides use explicit reciprocal pairs where localized versions exist.

export const ENGLISH_TO_ARABIC: Record<string, string> = {
  '/laptop-cleaning-thermal-paste-kuwait': '/ar/laptop-cleaning-thermal-paste-kuwait',
  '/laptop-fan-replacement-kuwait': '/ar/laptop-fan-replacement-kuwait',
  '/macbook-charging-port-repair-kuwait': '/ar/macbook-charging-port-repair-kuwait',
  '/bios-repair-kuwait': '/ar/bios-repair-kuwait',
  '/pc-power-supply-replacement-kuwait': '/ar/pc-power-supply-replacement-kuwait',
  '/macbook-liquid-damage-repair-kuwait': '/ar/macbook-liquid-damage-repair-kuwait',
  '/author/imran': '/ar/author/imran',
  '/about': '/ar/about',
  '/gallery': '/ar/gallery',
  '/faq': '/ar/faq',
  '/privacy-policy': '/ar/privacy-policy',
  '/terms-of-service': '/ar/terms-of-service',
  '/privacy-security-kuwait': '/ar/privacy-security-kuwait',
  '/location/abu-halifa': '/ar/computer-repair-abu-halifa',
  '/location/mubarak-al-kabeer': '/ar/computer-repair-mubarak-al-kabeer',
  '/location/sabah-al-salem': '/ar/computer-repair-sabah-al-salem',
  '/location/rumaithiya': '/ar/computer-repair-rumaithiya',
  '/location/surra': '/ar/computer-repair-surra',
  '/location/khaitan': '/ar/computer-repair-khaitan',
  '/location/riggae': '/ar/computer-repair-riggae',
  '/location/mahboula': '/ar/computer-repair-mahboula',
  '/location/messila': '/ar/computer-repair-messila',
  '/location/shuwaikh-residential': '/ar/computer-repair-shuwaikh-residential',
  '/location/abdullah-al-salem': '/ar/computer-repair-abdullah-al-salem',
  '/location/shamiya': '/ar/computer-repair-shamiya',
  '/location/nuzha': '/ar/computer-repair-nuzha',
  '/location/adailiya': '/ar/computer-repair-adailiya',
  '/location/kaifan': '/ar/computer-repair-kaifan',
  '/location/yarmouk': '/ar/computer-repair-yarmouk',
  '/location/qortuba': '/ar/computer-repair-qortuba',
  '/location/mishref': '/ar/computer-repair-mishref',
  '/laptop-wont-turn-on': '/ar/laptop-wont-turn-on',
  '/laptop-overheating-kuwait': '/ar/laptop-overheating-kuwait',
  '/laptop-black-screen-kuwait': '/ar/laptop-black-screen-kuwait',
  '/spilled-water-on-laptop': '/ar/spilled-water-on-laptop',
  '/laptop-keyboard-not-working': '/ar/laptop-keyboard-not-working',
  '/laptop-running-very-slow': '/ar/laptop-running-very-slow',
  '/laptop-hinge-broken': '/ar/laptop-hinge-broken',
  '/laptop-screen-cracked-kuwait': '/ar/laptop-screen-cracked-kuwait',
  '/windows-wont-boot-kuwait': '/ar/windows-wont-boot-kuwait',
  '/blue-screen-of-death-bsod-fix-kuwait': '/ar/blue-screen-of-death-bsod-fix-kuwait',
  '/computer-freezing-crashing-kuwait': '/ar/computer-freezing-crashing-kuwait',
  '/locations': '/ar/locations',
  '/problems': '/ar/problems',
  '/brands': '/ar/brands',
  '/dell-laptop-repair-kuwait': '/ar/brands/dell-laptop-repair-kuwait',
  '/hp-laptop-repair-kuwait': '/ar/brands/hp-laptop-repair-kuwait',
  '/lenovo-laptop-repair-kuwait': '/ar/brands/lenovo-laptop-repair-kuwait',
  '/asus-laptop-repair-kuwait': '/ar/brands/asus-laptop-repair-kuwait',
  '/acer-laptop-repair-kuwait': '/ar/brands/acer-laptop-repair-kuwait',
  '/msi-laptop-repair-kuwait': '/ar/brands/msi-laptop-repair-kuwait',
  '/guides/dell-laptop-overheating': '/guides/ar/dell-laptop-overheating',
  '/contact': '/ar/contact',
  '/': '/ar',
  '/services': '/ar/services',
  '/computer-repair-kuwait': '/ar/computer-repair-kuwait',
  '/desktop-pc-repair-kuwait': '/ar/desktop-pc-repair-kuwait',
  '/near-me': '/ar/near-me',
  '/pricing': '/ar/pricing',
  '/book': '/ar/book',
  '/macbook-battery-replacement-kuwait': '/ar/macbook-battery-replacement-kuwait',

  '/laptop-repair-kuwait': '/ar/laptop-repair-kuwait',
  '/motherboard-repair-kuwait': '/ar/motherboard-repair-kuwait',
  '/gaming-pc-repair-kuwait': '/ar/gaming-pc-repair-kuwait',
  '/gaming-laptop-cleaning-kuwait': '/ar/gaming-laptop-cleaning-kuwait',
  '/laptop-screen-repair-kuwait': '/ar/laptop-screen-repair-kuwait',
  '/macbook-repair-kuwait': '/ar/macbook-repair-kuwait',
  '/macbook-screen-replacement-kuwait': '/ar/macbook-screen-replacement-kuwait',
  '/battery-replacement-kuwait': '/ar/laptop-battery-replacement-kuwait',
  '/ssd-ram-upgrade-kuwait': '/ar/ssd-ram-upgrade-kuwait',
  '/gaming-laptop-repair-kuwait': '/ar/gaming-laptop-repair-kuwait',
  '/laptop-charging-port-repair-kuwait': '/ar/laptop-charging-port-repair-kuwait',
  '/laptop-plugged-in-not-charging': '/ar/laptop-plugged-in-not-charging',
  '/laptop-keyboard-replacement-kuwait': '/ar/laptop-keyboard-replacement-kuwait',
  '/laptop-liquid-damage-repair-kuwait': '/ar/laptop-liquid-damage-repair-kuwait',
  '/laptop-hinge-repair-kuwait': '/ar/laptop-hinge-repair-kuwait',

  '/location/hawalli': '/ar/computer-repair-hawalli',
  '/location/salmiya': '/ar/computer-repair-salmiya',
  '/location/jahra': '/ar/computer-repair-jahra',
  '/location/farwaniya': '/ar/computer-repair-farwaniya',
  '/location/kuwait-city': '/ar/computer-repair-kuwait-city',
  '/location/ahmadi': '/ar/computer-repair-ahmadi',
  '/location/fahaheel': '/ar/computer-repair-fahaheel',
  '/location/mangaf': '/ar/computer-repair-mangaf',

  '/guides/bios-uefi-recovery-kuwait': '/guides/ar/bios-uefi-recovery-kuwait',
  '/blog/laptop-buying-guide-kuwait-2026': '/blog/ar/laptop-buying-guide-kuwait-2026',
  '/blog/how-often-clean-laptop-replace-thermal-paste-kuwait': '/blog/ar/how-often-clean-laptop-replace-thermal-paste-kuwait',
};

export const ARABIC_TO_ENGLISH: Record<string, string> = {
  '/ar/laptop-cleaning-thermal-paste-kuwait': '/laptop-cleaning-thermal-paste-kuwait',
  '/ar/laptop-fan-replacement-kuwait': '/laptop-fan-replacement-kuwait',
  '/ar/macbook-charging-port-repair-kuwait': '/macbook-charging-port-repair-kuwait',
  '/ar/bios-repair-kuwait': '/bios-repair-kuwait',
  '/ar/pc-power-supply-replacement-kuwait': '/pc-power-supply-replacement-kuwait',
  '/ar/macbook-liquid-damage-repair-kuwait': '/macbook-liquid-damage-repair-kuwait',
  '/ar/author/imran': '/author/imran',
  '/ar/about': '/about',
  '/ar/gallery': '/gallery',
  '/ar/faq': '/faq',
  '/ar/privacy-policy': '/privacy-policy',
  '/ar/terms-of-service': '/terms-of-service',
  '/ar/privacy-security-kuwait': '/privacy-security-kuwait',
  '/ar/computer-repair-abu-halifa': '/location/abu-halifa',
  '/ar/computer-repair-mubarak-al-kabeer': '/location/mubarak-al-kabeer',
  '/ar/computer-repair-sabah-al-salem': '/location/sabah-al-salem',
  '/ar/computer-repair-rumaithiya': '/location/rumaithiya',
  '/ar/computer-repair-surra': '/location/surra',
  '/ar/computer-repair-khaitan': '/location/khaitan',
  '/ar/computer-repair-riggae': '/location/riggae',
  '/ar/computer-repair-mahboula': '/location/mahboula',
  '/ar/computer-repair-messila': '/location/messila',
  '/ar/computer-repair-shuwaikh-residential': '/location/shuwaikh-residential',
  '/ar/computer-repair-abdullah-al-salem': '/location/abdullah-al-salem',
  '/ar/computer-repair-shamiya': '/location/shamiya',
  '/ar/computer-repair-nuzha': '/location/nuzha',
  '/ar/computer-repair-adailiya': '/location/adailiya',
  '/ar/computer-repair-kaifan': '/location/kaifan',
  '/ar/computer-repair-yarmouk': '/location/yarmouk',
  '/ar/computer-repair-qortuba': '/location/qortuba',
  '/ar/computer-repair-mishref': '/location/mishref',
  '/ar/laptop-wont-turn-on': '/laptop-wont-turn-on',
  '/ar/laptop-overheating-kuwait': '/laptop-overheating-kuwait',
  '/ar/laptop-black-screen-kuwait': '/laptop-black-screen-kuwait',
  '/ar/spilled-water-on-laptop': '/spilled-water-on-laptop',
  '/ar/laptop-keyboard-not-working': '/laptop-keyboard-not-working',
  '/ar/laptop-running-very-slow': '/laptop-running-very-slow',
  '/ar/laptop-hinge-broken': '/laptop-hinge-broken',
  '/ar/laptop-screen-cracked-kuwait': '/laptop-screen-cracked-kuwait',
  '/ar/windows-wont-boot-kuwait': '/windows-wont-boot-kuwait',
  '/ar/blue-screen-of-death-bsod-fix-kuwait': '/blue-screen-of-death-bsod-fix-kuwait',
  '/ar/computer-freezing-crashing-kuwait': '/computer-freezing-crashing-kuwait',
  '/ar/locations': '/locations',
  '/ar/problems': '/problems',
  '/ar/brands': '/brands',
  '/ar/brands/dell-laptop-repair-kuwait': '/dell-laptop-repair-kuwait',
  '/ar/brands/hp-laptop-repair-kuwait': '/hp-laptop-repair-kuwait',
  '/ar/brands/lenovo-laptop-repair-kuwait': '/lenovo-laptop-repair-kuwait',
  '/ar/brands/asus-laptop-repair-kuwait': '/asus-laptop-repair-kuwait',
  '/ar/brands/acer-laptop-repair-kuwait': '/acer-laptop-repair-kuwait',
  '/ar/brands/msi-laptop-repair-kuwait': '/msi-laptop-repair-kuwait',
  '/guides/ar/dell-laptop-overheating': '/guides/dell-laptop-overheating',
  '/ar/contact': '/contact',
  '/ar': '/',
  '/ar/services': '/services',
  '/ar/computer-repair-kuwait': '/computer-repair-kuwait',
  '/ar/desktop-pc-repair-kuwait': '/desktop-pc-repair-kuwait',
  '/ar/near-me': '/near-me',
  '/ar/pricing': '/pricing',
  '/ar/book': '/book',
  '/ar/macbook-battery-replacement-kuwait': '/macbook-battery-replacement-kuwait',

  '/ar/laptop-repair-kuwait': '/laptop-repair-kuwait',
  '/ar/motherboard-repair-kuwait': '/motherboard-repair-kuwait',
  '/ar/gaming-pc-repair-kuwait': '/gaming-pc-repair-kuwait',
  '/ar/gaming-laptop-cleaning-kuwait': '/gaming-laptop-cleaning-kuwait',
  '/ar/laptop-screen-repair-kuwait': '/laptop-screen-repair-kuwait',
  '/ar/macbook-repair-kuwait': '/macbook-repair-kuwait',
  '/ar/macbook-screen-replacement-kuwait': '/macbook-screen-replacement-kuwait',
  '/ar/laptop-battery-replacement-kuwait': '/battery-replacement-kuwait',
  '/ar/ssd-ram-upgrade-kuwait': '/ssd-ram-upgrade-kuwait',
  '/ar/gaming-laptop-repair-kuwait': '/gaming-laptop-repair-kuwait',
  '/ar/laptop-charging-port-repair-kuwait': '/laptop-charging-port-repair-kuwait',
  '/ar/laptop-plugged-in-not-charging': '/laptop-plugged-in-not-charging',
  '/ar/laptop-keyboard-replacement-kuwait': '/laptop-keyboard-replacement-kuwait',
  '/ar/laptop-liquid-damage-repair-kuwait': '/laptop-liquid-damage-repair-kuwait',
  '/ar/laptop-hinge-repair-kuwait': '/laptop-hinge-repair-kuwait',

  '/ar/computer-repair-hawalli': '/location/hawalli',
  '/ar/computer-repair-salmiya': '/location/salmiya',
  '/ar/computer-repair-jahra': '/location/jahra',
  '/ar/computer-repair-farwaniya': '/location/farwaniya',
  '/ar/computer-repair-kuwait-city': '/location/kuwait-city',
  '/ar/computer-repair-ahmadi': '/location/ahmadi',
  '/ar/computer-repair-fahaheel': '/location/fahaheel',
  '/ar/computer-repair-mangaf': '/location/mangaf',

  '/guides/ar/bios-uefi-recovery-kuwait': '/guides/bios-uefi-recovery-kuwait',
  '/blog/ar/laptop-buying-guide-kuwait-2026': '/blog/laptop-buying-guide-kuwait-2026',
  '/blog/ar/how-often-clean-laptop-replace-thermal-paste-kuwait': '/blog/how-often-clean-laptop-replace-thermal-paste-kuwait',
};

export type SiteLocale = 'en' | 'ar';

export function isArabicPath(pathname: string): boolean {
  const normalized = pathname.replace(/\/+$/, '') || '/';
  return normalized === '/ar' || normalized.startsWith('/ar/') || normalized.startsWith('/blog/ar/') || normalized.startsWith('/guides/ar/');
}

// For a link inside translated content, preserve the real English route if no translation exists.
// This intentionally differs from the language-switch fallback, which takes users to the Arabic hub.
export function localizedSitePath(pathname: string, locale: SiteLocale): string {
  const normalized = pathname.replace(/\/+$/, '') || '/';
  if (locale === 'ar') return ENGLISH_TO_ARABIC[normalized] ?? pathname;
  return ARABIC_TO_ENGLISH[normalized] ?? pathname;
}

export function hasArabicCounterpart(pathname: string): boolean {
  return Boolean(ENGLISH_TO_ARABIC[pathname.replace(/\/+$/, '') || '/']);
}

export function getLanguageSwitchPath(pathname: string): { href: string; targetLanguage: 'ar' | 'en' } {
  const normalized = pathname.replace(/\/+$/, '') || '/';
  const isArabicRoute = normalized === '/ar' || normalized.startsWith('/ar/') || normalized.startsWith('/blog/ar/') || normalized.startsWith('/guides/ar/');

  if (isArabicRoute) {
    return {
      href: ARABIC_TO_ENGLISH[normalized] ?? '/',
      targetLanguage: 'en',
    };
  }

  return {
    href: ENGLISH_TO_ARABIC[normalized] ?? '/ar/computer-repair-kuwait',
    targetLanguage: 'ar',
  };
}
