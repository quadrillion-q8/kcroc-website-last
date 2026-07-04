// File: app/frontend/src/constants/routes.ts

export const APP_ROUTES = {
  // Core Pages (KEEP THESE)
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
  PRICING: '/pricing',
  FAQ: '/faq',
  GALLERY: '/gallery',
  
  // The New Dynamic Architecture
  // This single line replaces all hard-coded service pages
  SERVICE_DETAIL: '/services/:serviceSlug', 
  
  // Catch-all
  NOT_FOUND: '*'
} as const;
