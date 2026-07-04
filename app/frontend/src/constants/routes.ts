export const APP_ROUTES = {
  // --- CORE STATIC PAGES (Keep these as they are) ---
  HOME: '/',
  ABOUT: '/about',
  SERVICES: '/services',      // Your main index listing all services (Services.tsx)
  CONTACT: '/contact',
  PRICING: '/pricing',
  FAQ: '/faq',
  GALLERY: '/gallery',
  BLOG: '/blog',              // (Blog.tsx)
  BOOKING: '/booking',        // (BookingPage.tsx)
  PRIVACY: '/privacy-policy', // (PrivacySecurity.tsx)

  // --- THE NEW DYNAMIC ARCHITECTURE ---
  // This SINGLE line replaces all the hard-coded individual service pages 
  // (e.g., BatteryReplacement, GamingPC, MacBookRepair, MotherboardRepair, etc.)
  SERVICE_DETAIL: '/services/:serviceSlug', 

  // --- SYSTEM ---
  NOT_FOUND: '*'
} as const;
