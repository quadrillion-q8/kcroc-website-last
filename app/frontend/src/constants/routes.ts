// File: app/frontend/src/constants/routes.ts

/**
 * SINGLE SOURCE OF TRUTH FOR APPLICATION ROUTING
 * All paths must match the canonical URL used in each page component.
 */
export const ROUTES = {
  // ─── CORE SHELL ───────────────────────────────────────────────────
  home:     '/',
  about:    '/about',
  contact:  '/contact',
  services: '/services',
  pricing:  '/pricing',
  gallery:  '/gallery',
  faq:      '/faq',

  // ─── CONVERSION / UTILITY ─────────────────────────────────────────
  book:            '/book-repair',
  privacySecurity: '/privacy-security-kuwait', // ✅ Fixed: match page canonical
  authCallback:    '/auth/callback',

  // ─── HARDWARE REPAIR FUNNELS ──────────────────────────────────────
  // ✅ Fixed: all paths match canonical URLs set in page components
  laptopRepair:      '/laptop-repair-kuwait',
  laptopRepairHawalli: '/laptop-repair-hawalli', // alias → same component
  macbookRepair:     '/macbook-repair-kuwait',
  screenReplacement: '/laptop-screen-repair-kuwait',
  batteryReplacement: '/battery-replacement',
  motherboardRepair: '/motherboard-repair-kuwait',

  // ─── SPECIALIZED VERTICALS ────────────────────────────────────────
  gamingPC:         '/gaming-pc-repair-kuwait',
  gamingPCCooling:  '/gaming-pc-cooling',
  webDesignKuwait:  '/web-design-kuwait',

  // ─── BLOG & CONTENT ENGINE ────────────────────────────────────────
  blog:                '/blog',
  blogLaptopRepair:    '/blog/laptop-repair-kuwait-2026',
  blogScreenProtection: '/blog/how-to-protect-laptop-screen',

  // ─── PROGRAMMATIC SEO ─────────────────────────────────────────────
  // ✅ Added: dynamic location page pattern
  // Used by LocationTemplate.tsx — matches /computer-repair-in-hawalli etc.
  locationPage: '/computer-repair-in-:city',

  // ─── LEGACY REDIRECTS ─────────────────────────────────────────────
  // These are handled in App.tsx via <Navigate> — listed here for documentation
  // '/data-recovery-kuwait'              → ROUTES.services
  // '/screen-replacement-kuwait'         → ROUTES.screenReplacement
  // '/chip-level-motherboard-repair-hawalli' → ROUTES.motherboardRepair
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = typeof ROUTES[RouteKey];
