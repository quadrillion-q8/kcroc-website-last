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
  privacySecurity: "/privacy-policy", // Renamed for clarity
  terms: "/terms-and-conditions",

  // SEO Aligned Tech Service Routes (Synchronized to Canonical URLs)
  macbookRepair: "/macbook-repair-kuwait",
  laptopRepair: "/laptop-repair-kuwait",
  laptopRepairHawalli: "/laptop-repair-hawalli-kuwait",
  gamingPC: "/gaming-pc-repair-kuwait",
  // ✅ Fixed: Synced to canonical "/laptop-screen-repair-kuwait"
  screenReplacement: "/laptop-screen-repair-kuwait",
  // ✅ Fixed: Synced to canonical "/motherboard-repair-kuwait"
  motherboardRepair: "/motherboard-repair-kuwait",

  // Programmatic SEO Dynamic Route
  programmaticSEO: "/:service-in-:city",

  // Blog Hub
  blog: "/blog",
  
  // General Technical Sub-Pages
  batteryReplacement: "/battery-replacement",
  gamingPCCooling: "/gaming-pc-cooling",
  webDesign: "/web-design-kuwait",
} as const;

// Helper functions with path sanitization
const sanitize = (path: string) => path.replace(/\/+/g, '/').replace(/\/$/, '') || '/';

// Dynamic Route Generators
export const getServiceRoute = (slug: string) => sanitize(`/services/${slug}`);
export const getBlogRoute = (slug: string) => sanitize(`/blog/${slug}`);

// ✅ Automatically generates programmatic URLs like "/laptop-repair-in-hawalli"
export const getProgrammaticRoute = (service: string, citySlug: string) => {
  const formattedService = service.toLowerCase().replace(/\s+/g, '-');
  return sanitize(`/${formattedService}-in-${citySlug}`);
};

// Types
export type Route = typeof ROUTES;
