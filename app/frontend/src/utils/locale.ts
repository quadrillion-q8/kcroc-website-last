// File: app/frontend/src/utils/locale.ts
//
// Keep the language-switch routes reciprocal with each page's SEO alternate
// configuration. The homepage is the English counterpart of /ar/computer-repair-kuwait;
// Services and troubleshooting guides use explicit reciprocal pairs where a localized version exists.

const ENGLISH_TO_ARABIC: Record<string, string> = {
  '/': '/ar',
  '/services': '/ar/services',
  '/computer-repair-kuwait': '/ar/computer-repair-kuwait',
  '/near-me': '/ar/near-me',
  '/pricing': '/ar/pricing',

  '/laptop-repair-kuwait': '/ar/laptop-repair-kuwait',
  '/motherboard-repair-kuwait': '/ar/motherboard-repair-kuwait',
  '/gaming-pc-repair-kuwait': '/ar/gaming-pc-repair-kuwait',
  '/laptop-screen-repair-kuwait': '/ar/laptop-screen-repair-kuwait',
  '/macbook-repair-kuwait': '/ar/macbook-repair-kuwait',
  '/macbook-screen-replacement-kuwait': '/ar/macbook-screen-replacement-kuwait',
  '/battery-replacement-kuwait': '/ar/battery-replacement-kuwait',
  '/ssd-ram-upgrade-kuwait': '/ar/ssd-ram-upgrade-kuwait',
  '/gaming-laptop-repair-kuwait': '/ar/gaming-laptop-repair-kuwait',
  '/laptop-charging-port-repair-kuwait': '/ar/laptop-charging-port-repair-kuwait',
  '/laptop-plugged-in-not-charging': '/ar/laptop-plugged-in-not-charging',
  '/laptop-keyboard-replacement-kuwait': '/ar/laptop-keyboard-replacement-kuwait',
  '/laptop-liquid-damage-repair-kuwait': '/ar/laptop-liquid-damage-repair-kuwait',

  '/location/hawalli': '/ar/computer-repair-hawalli',
  '/location/salmiya': '/ar/computer-repair-salmiya',
  '/location/jahra': '/ar/computer-repair-jahra',
  '/location/farwaniya': '/ar/computer-repair-farwaniya',
  '/location/kuwait-city': '/ar/computer-repair-kuwait-city',

  '/guides/bios-uefi-recovery-kuwait': '/guides/ar/bios-uefi-recovery-kuwait',
  '/blog/laptop-buying-guide-kuwait-2026': '/blog/ar/laptop-buying-guide-kuwait-2026',
  '/blog/how-often-clean-laptop-replace-thermal-paste-kuwait': '/blog/ar/how-often-clean-laptop-replace-thermal-paste-kuwait',
};

const ARABIC_TO_ENGLISH: Record<string, string> = {
  '/ar': '/',
  '/ar/services': '/services',
  '/ar/computer-repair-kuwait': '/computer-repair-kuwait',
  '/ar/near-me': '/near-me',
  '/ar/pricing': '/pricing',

  '/ar/laptop-repair-kuwait': '/laptop-repair-kuwait',
  '/ar/motherboard-repair-kuwait': '/motherboard-repair-kuwait',
  '/ar/gaming-pc-repair-kuwait': '/gaming-pc-repair-kuwait',
  '/ar/laptop-screen-repair-kuwait': '/laptop-screen-repair-kuwait',
  '/ar/macbook-repair-kuwait': '/macbook-repair-kuwait',
  '/ar/macbook-screen-replacement-kuwait': '/macbook-screen-replacement-kuwait',
  '/ar/battery-replacement-kuwait': '/battery-replacement-kuwait',
  '/ar/ssd-ram-upgrade-kuwait': '/ssd-ram-upgrade-kuwait',
  '/ar/gaming-laptop-repair-kuwait': '/gaming-laptop-repair-kuwait',
  '/ar/laptop-charging-port-repair-kuwait': '/laptop-charging-port-repair-kuwait',
  '/ar/laptop-plugged-in-not-charging': '/laptop-plugged-in-not-charging',
  '/ar/laptop-keyboard-replacement-kuwait': '/laptop-keyboard-replacement-kuwait',
  '/ar/laptop-liquid-damage-repair-kuwait': '/laptop-liquid-damage-repair-kuwait',

  '/ar/computer-repair-hawalli': '/location/hawalli',
  '/ar/computer-repair-salmiya': '/location/salmiya',
  '/ar/computer-repair-jahra': '/location/jahra',
  '/ar/computer-repair-farwaniya': '/location/farwaniya',
  '/ar/computer-repair-kuwait-city': '/location/kuwait-city',

  '/guides/ar/bios-uefi-recovery-kuwait': '/guides/bios-uefi-recovery-kuwait',
  '/blog/ar/laptop-buying-guide-kuwait-2026': '/blog/laptop-buying-guide-kuwait-2026',
  '/blog/ar/how-often-clean-laptop-replace-thermal-paste-kuwait': '/blog/how-often-clean-laptop-replace-thermal-paste-kuwait',
};

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
