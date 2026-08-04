// File: app/frontend/src/constants/routes.ts

export const ROUTES = {
  // --- CORE STATIC PAGES ---
  HOME: '/',
  ABOUT: '/about',
  SERVICES: '/services',      
  CONTACT: '/contact',
  PRICING: '/pricing',
  FAQ: '/faq',
  GALLERY: '/gallery',
  BLOG: '/blog',              
  BOOKING: '/booking',        
  PRIVACY: '/privacy-policy', 
  TERMS: '/terms-of-service',

  // --- THE NEW DYNAMIC ARCHITECTURE ---
  SERVICE_DETAIL: '/services/:serviceSlug', 
  FAQ_DETAIL: '/faq/:faqSlug',               // Audit correction: FAQ routing
  LOCATION_DETAIL: '/location/:locationSlug', // Audit correction: Location routing
  BLOG_DETAIL: '/blog/:slug',                // Reconciled with getBlogRoute

  // --- SYSTEM ---
  NOT_FOUND: '*'
} as const;

// --- UTILITY FUNCTIONS ---
// Restoring the missing helper function required by BlogPostTemplate.tsx
export const getBlogRoute = (slug: string) => `/blog/${slug}`;

// New helpers to ensure type-safe and typo-free link generation across the app
export const getServiceRoute = (slug: string) => `/services/${slug}`;
export const getFaqRoute = (slug: string) => `/faq/${slug}`;
export const getLocationRoute = (slug: string) => `/location/${slug}`;
