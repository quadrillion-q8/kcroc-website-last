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
  GUIDES: '/guides',
  BOOKING: '/book',        
  PRIVACY: '/privacy-policy', 
  TERMS: '/terms-of-service',

  // --- THE NEW DYNAMIC ARCHITECTURE ---
  SERVICE_DETAIL: '/services/:serviceSlug', 
  FAQ_DETAIL: '/faq/:faqSlug',               // Audit correction: FAQ routing
  LOCATION_DETAIL: '/location/:locationSlug', // Audit correction: Location routing
  BLOG_DETAIL: '/blog/:slug',                // Dynamic blog post route
  GUIDE_DETAIL: '/guides/:slug',             // Dynamic guide post route

  // --- SYSTEM ---
  NOT_FOUND: '*'
} as const;

// --- UTILITY FUNCTIONS ---
// Restoring the missing helper function required by BlogPostTemplate.tsx
export const getBlogRoute = (slug: string) => `/blog/${slug}`;
export const getGuideRoute = (slug: string) => `/guides/${slug}`;

// Content posts can be rendered by the shared BlogPostTemplate while keeping
// their public information architecture explicit and crawlable.
export const getContentRoute = (slug: string, contentType: BlogPostRoute = 'blog') =>
  contentType === 'guide' ? getGuideRoute(slug) : getBlogRoute(slug);

export type BlogPostRoute = 'blog' | 'guide';
