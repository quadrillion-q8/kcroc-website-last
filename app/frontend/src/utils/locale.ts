// File: app/frontend/src/utils/locale.ts

const ENGLISH_TO_ARABIC: Record<string, string> = {
  '/': '/ar/computer-repair-kuwait',
  '/services': '/ar/computer-repair-kuwait',
  '/near-me': '/ar/near-me',
  '/laptop-repair-kuwait': '/ar/laptop-repair-kuwait',
  '/motherboard-repair-kuwait': '/ar/motherboard-repair-kuwait',
  '/gaming-pc-repair-kuwait': '/ar/gaming-pc-repair-kuwait',
  '/laptop-screen-repair-kuwait': '/ar/laptop-screen-repair-kuwait',
  '/blog/laptop-buying-guide-kuwait-2026': '/blog/ar/laptop-buying-guide-kuwait-2026',
  '/blog/how-often-clean-laptop-replace-thermal-paste-kuwait': '/blog/ar/how-often-clean-laptop-replace-thermal-paste-kuwait',
};

const ARABIC_TO_ENGLISH: Record<string, string> = {
  '/ar/near-me': '/near-me',
  '/ar/computer-repair-kuwait': '/services',
  '/ar/laptop-repair-kuwait': '/laptop-repair-kuwait',
  '/ar/motherboard-repair-kuwait': '/motherboard-repair-kuwait',
  '/ar/gaming-pc-repair-kuwait': '/gaming-pc-repair-kuwait',
  '/ar/laptop-screen-repair-kuwait': '/laptop-screen-repair-kuwait',
  '/blog/ar/laptop-buying-guide-kuwait-2026': '/blog/laptop-buying-guide-kuwait-2026',
  '/blog/ar/how-often-clean-laptop-replace-thermal-paste-kuwait': '/blog/how-often-clean-laptop-replace-thermal-paste-kuwait',
};

export function getLanguageSwitchPath(pathname: string): { href: string; targetLanguage: 'ar' | 'en' } {
  const normalized = pathname.replace(/\/+$/, '') || '/';

  if (normalized.startsWith('/ar/')) {
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
