// File: src/constants/routes.ts
export const ROUTES = {
  home: "/",
  gallery: "/gallery",
  blog: "/blog",
  contact: "/contact",
  services: "/services",
  areas: "/areas",
  faq: "/faq",
  privacy: "/privacy-policy",
  terms: "/terms-and-conditions",
  book: "/book",
  servicesPages: {
    laptopRepair: "/services/laptop-repair",
    macbookRepair: "/services/macbook-repair",
    gamingPC: "/services/gaming-pc",
    motherboardRepair: "/services/motherboard-repair",
    customPC: "/services/custom-pc",
    printerRepair: "/services/printer-repair",
  },
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

export const getServiceRoute = (slug: string) => sanitize(`/services/${slug}`);
export const getAreaRoute = (slug: string) => sanitize(`/areas/${slug}`);
export const getBlogRoute = (slug: string) => sanitize(`/blog/${slug}`);

// Types
export type Route = typeof ROUTES;
export type ServiceKey = keyof typeof ROUTES.servicesPages;
export type AreaKey = keyof typeof ROUTES.areasServed;
