// File: app/frontend/src/constants/routes.ts

export const ROUTES = {
  // --- CORE STATIC PAGES ---
  HOME: '/',
  NEWS: '/news',
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
  NEWS_DETAIL: '/news/:slug',                // Dynamic news article route

  // --- SYSTEM ---
  NOT_FOUND: '*'
} as const;

// --- UTILITY FUNCTIONS ---
// Restoring the missing helper function required by BlogPostTemplate.tsx
export const getBlogRoute = (slug: string) => `/blog/${slug}`;
export const getGuideRoute = (slug: string) => `/guides/${slug}`;

// Content posts can be rendered by the shared BlogPostTemplate while keeping
// their public information architecture explicit and crawlable.
export const getNewsRoute = (slug: string) => `/news/${slug}`;

export const getContentRoute = (slug: string, contentType: BlogPostRoute = 'blog') => {
  if (contentType === 'guide') return getGuideRoute(slug);
  if (contentType === 'news') return getNewsRoute(slug);
  return getBlogRoute(slug);
};

export type BlogPostRoute = 'blog' | 'guide' | 'news';
