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

  // --- THE NEW DYNAMIC ARCHITECTURE ---
  SERVICE_DETAIL: '/services/:serviceSlug', 

  // --- SYSTEM ---
  NOT_FOUND: '*'
} as const;
