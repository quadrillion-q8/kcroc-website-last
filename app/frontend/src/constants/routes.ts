// File: src/constants/routes.ts

export const ROUTES = {
  // Core Pages
  home: "/",
  services: "/services",
  pricing: "/pricing",
  about: "/about",
  contact: "/contact",
  gallery: "/gallery",
  book: "/book",
  faq: "/faq",
  privacy: "/privacy-policy",
  terms: "/terms-and-conditions",

  // SEO Aligned Tech Service Routes (The Goldmine URLs)
  macbookRepair: "/macbook-repair-kuwait",
  laptopRepair: "/laptop-repair-kuwait",
  laptopRepairHawalli: "/laptop-repair-hawalli-kuwait",
  gamingPC: "/gaming-pc-repair-kuwait",
  screenReplacement: "/screen-replacement-kuwait",
  // ✅ Fixed: Removed Data Recovery
  motherboardRepair: "/chip-level-motherboard-repair-hawalli",

  // Programmatic SEO Dynamic Route
  programmaticSEO: "/:service-in-:city",

  // Blog Hub & Sub-Articles
  blog: "/blog",
  blogLaptopRepair: "/blog/laptop-repair-kuwait-2026",
  blogScreenProtection: "/blog/how-to-protect-laptop-screen",

  // General Technical Sub-Pages
  batteryReplacement: "/battery-replacement",
  gamingPCCooling: "/gaming-pc-cooling",
  webDesign: "/web-design-kuwait",

  // ✅ Fixed: Removed hardcoded `areasServed`. `locationAreas.ts` is now the single source of truth.
} as const;

// Helper functions with path sanitization
const sanitize = (path: string) => path.replace(/\/+/g, '/').replace(/\/$/, '') || '/';

// Dynamic Route Generators
export const getServiceRoute = (slug: string) => sanitize(`/services/${slug}`);
export const getBlogRoute = (slug: string) => sanitize(`/blog/${slug}`);

// ✅ NEW: Automatically generates programmatic URLs like "/laptop-repair-in-hawalli"
export const getProgrammaticRoute = (service: string, citySlug: string) => {
  const formattedService = service.toLowerCase().replace(/\s+/g, '-');
  return sanitize(`/${formattedService}-in-${citySlug}`);
};

// Types
export type Route = typeof ROUTES;
