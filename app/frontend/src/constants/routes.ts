// File: app/frontend/src/constants/routes.ts

/**
 * SINGLE SOURCE OF TRUTH FOR APPLICATION ROUTING
 * All paths must match the canonical URL used in each page component.
 */
export const ROUTES = {
  // ─── CORE SHELL ───────────────────────────────────────────────────
  home:      '/',
  about:     '/about',
  contact:   '/contact',
  services:  '/services',
  pricing:   '/pricing',
  gallery:   '/gallery',
  faq:       '/faq',

  // ─── CONVERSION / UTILITY ─────────────────────────────────────────
  book:            '/book-repair',
  privacySecurity: '/privacy-security-kuwait',
  authCallback:    '/auth/callback',

  // ─── HARDWARE REPAIR FUNNELS ──────────────────────────────────────
  laptopRepair:       '/laptop-repair-kuwait',
  laptopRepairHawalli: '/laptop-repair-hawalli',
  macbookRepair:      '/macbook-repair-kuwait',
  screenReplacement:  '/laptop-screen-repair-kuwait',
  batteryReplacement: '/battery-replacement',
  motherboardRepair:  '/motherboard-repair-kuwait',

  // ─── SPECIALIZED VERTICALS ────────────────────────────────────────
  gamingPC:          '/gaming-pc-repair-kuwait',
  gamingPCCooling:   '/gaming-pc-cooling',
  webDesignKuwait:   '/web-design-kuwait',

  // ─── BLOG & CONTENT ENGINE ────────────────────────────────────────
  blog:                  '/blog',
  blogLaptopRepair:      '/blog/laptop-repair-kuwait-2026',
  blogScreenProtection:  '/blog/how-to-protect-laptop-screen',

  // ─── PROGRAMMATIC SEO ─────────────────────────────────────────────
  locationPage: '/computer-repair-in-:city',
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = typeof ROUTES[RouteKey];

/**
 * HELPER FUNCTIONS
 * Use these to generate paths dynamically throughout your components.
 */

// Fixes the build error by exporting the blog route generator
export const getBlogRoute = (slug: string) => `/blog/${slug}`;

// Helper for your programmatic location pages
export const getLocationRoute = (city: string) => `/computer-repair-in-${city.toLowerCase().replace(/\s+/g, '-')}`;
