// File: app/frontend/src/utils/locale.ts
//
// Keep the language-switch routes reciprocal with each page's SEO alternate
// configuration. The English computer-repair hub is the counterpart of
// /ar/computer-repair-kuwait; Services and troubleshooting guides use explicit reciprocal pairs where localized versions exist.

export const ENGLISH_TO_ARABIC: Record<string, string> = {
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
  if (locale === 'ar') return ENGLISH_TO_ARABIC[normalized] ?? (normalized === '/locations' ? '/ar/near-me' : pathname);
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
