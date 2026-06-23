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
  areas: "/areas",
  privacy: "/privacy-policy",
  terms: "/terms-and-conditions",

  // SEO Aligned Tech Service Routes (The Goldmine URLs)
  macbookRepair: "/macbook-repair-kuwait",
  laptopRepair: "/laptop-repair-kuwait",
  laptopRepairHawalli: "/laptop-repair-hawalli-kuwait",
  gamingPC: "/gaming-pc-repair-kuwait",
  screenReplacement: "/screen-replacement-kuwait",
  dataRecovery: "/data-recovery-kuwait",
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

  // Keep these for future expansion if you decide to build out dedicated area pages!
  areasServed: {
    hawalli: "/areas/hawalli",
    salmiya: "/areas/salmiya",
    farwaniya: "/areas/farwaniya",
    mahboula: "/areas/mahboula",
    fahaheel: "/areas/fahaheel",
  }
} as const;

// Helper functions with path sanitization
const sanitize = (path: string) => path.replace(/\/+/g, '/').replace(/\/$/, '') || '/';

// Keep helper functions in case you need to dynamically generate URLs later
export const getServiceRoute = (slug: string) => sanitize(`/services/${slug}`);
export const getAreaRoute = (slug: string) => sanitize(`/areas/${slug}`);
export const getBlogRoute = (slug: string) => sanitize(`/blog/${slug}`);

// Types
export type Route = typeof ROUTES;
export type AreaKey = keyof typeof ROUTES.areasServed;
