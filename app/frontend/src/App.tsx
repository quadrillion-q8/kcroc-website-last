// File: app/frontend/src/App.tsx
import React, { lazy } from 'react';
import { RouteObject, Navigate, Outlet } from 'react-router-dom';
import { RootLayout } from './core/components/layout/RootLayout';
import { AnalyticsProvider } from './core/analytics/AnalyticsProvider';

// High-level wrapper to maintain Context Providers without a BrowserRouter
// (ViteReactSSG provides its own Router implementation automatically)
const AppWrapper = () => (
  <AnalyticsProvider>
    <Outlet />
  </AnalyticsProvider>
);

// 🚀 EXPLICIT ROUTE ARRAY EXPORT REQUIRED BY VITE-REACT-SSG
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <AppWrapper />,
    children: [
      {
        path: '/',
        element: <RootLayout />,
        children: [
          { index: true, lazy: async () => ({ Component: (await import('./pages/Home')).default }) },
          { path: 'near-me', lazy: async () => ({ Component: (await import('./pages/NearMe')).default }) },
          { path: 'ar/near-me', lazy: async () => ({ Component: (await import('./pages/NearMeAR')).default }) },
          { path: 'ar/:slug', lazy: async () => ({ Component: (await import('./pages/ArabicCommercialPage')).default }) },
          { path: 'services', lazy: async () => ({ Component: (await import('./pages/Services')).default }) },
          { path: 'locations', lazy: async () => ({ Component: (await import('./pages/Locations')).default }) },
          { path: 'services/:serviceSlug', lazy: async () => { const { LegacyServiceRedirect } = await import('./core/routing/DynamicRoutes'); return { Component: LegacyServiceRedirect }; } },
          // 🩹 FIX: these three 404'd previously — there was no route for
          // them at all, so they fell through to the dynamic `:slug`
          // handler, which only resolves slugs that exist as an actual
          // Service/Brand/Problem entity in the graph.
          { path: 'brands', lazy: async () => ({ Component: (await import('./pages/BrandsIndex')).default }) },
          { path: 'problems', lazy: async () => ({ Component: (await import('./pages/ProblemsIndex')).default }) },
          { path: 'guides', lazy: async () => ({ Component: (await import('./pages/GuidesIndex')).default }) },
          { path: 'case-studies', lazy: async () => ({ Component: (await import('./pages/CaseStudiesIndex')).default }) },
          { path: 'case-studies/:slug', lazy: async () => ({ Component: (await import('./pages/templates/CaseStudyTemplate')).default }) },
          { path: 'book', lazy: async () => ({ Component: (await import('./pages/BookingPage')).default }) },
          { path: 'booking', element: <Navigate to="/book" replace /> },
          { path: 'book-repair', element: <Navigate to="/book" replace /> },
          { path: 'pricing', lazy: async () => ({ Component: (await import('./pages/Pricing')).default }) },
          { path: 'contact', lazy: async () => ({ Component: (await import('./pages/Contact')).default }) },
          { path: 'gallery', lazy: async () => ({ Component: (await import('./pages/Gallery')).default }) },
          { path: 'about', lazy: async () => ({ Component: (await import('./pages/About')).default }) },
          { path: 'privacy-security-kuwait', lazy: async () => ({ Component: (await import('./pages/PrivacySecurity')).default }) },
          { path: 'privacy-policy', lazy: async () => ({ Component: (await import('./pages/PrivacyPolicy')).default }) },
          { path: 'terms-of-service', lazy: async () => ({ Component: (await import('./pages/TermsOfService')).default }) },
          { path: 'privacy', element: <Navigate to="/privacy-policy" replace /> },
          { path: 'terms', element: <Navigate to="/terms-of-service" replace /> },
          { path: 'faq', lazy: async () => ({ Component: (await import('./pages/FAQ')).default }) },
          { path: 'blog', lazy: async () => ({ Component: (await import('./pages/Blog')).default }) },
          { path: 'news', lazy: async () => ({ Component: (await import('./pages/News')).default }) },
          { path: 'blog/laptop-repair-kuwait-2026', lazy: async () => ({ Component: (await import('./pages/BlogLaptopRepair')).default }) },
          { path: 'blog/gaming-pc-cooling', lazy: async () => ({ Component: (await import('./pages/GamingPCCooling')).default }) },
          { path: 'blog/laptop-buying-guide-kuwait-2026', lazy: async () => ({ Component: (await import('./pages/LaptopBuyingGuide')).default }) },
          { path: 'blog/ar/laptop-buying-guide-kuwait-2026', lazy: async () => ({ Component: (await import('./pages/LaptopBuyingGuideAR')).default }) },
          { path: 'blog/ar/how-often-clean-laptop-replace-thermal-paste-kuwait', lazy: async () => ({ Component: (await import('./pages/GamingLaptopCleaningAR')).default }) },
          { path: 'blog/intel-core-ultra-vs-amd-ryzen-ai', lazy: async () => ({ Component: (await import('./pages/IntelVsAmdGuide')).default }) },
          { path: 'blog/laptop-wont-turn-on', element: <Navigate to="/blog/laptop-wont-turn-on-causes-fixes" replace /> },
          { path: 'author/imran', lazy: async () => ({ Component: (await import('./pages/AuthorImran')).default }) },
          { path: 'guides/laptop-battery-warning-signs', lazy: async () => ({ Component: (await import('./pages/BatteryHealthGuide')).default }) },
          { path: 'guides/why-is-my-laptop-so-hot', lazy: async () => ({ Component: (await import('./pages/LaptopOverheatingGuide')).default }) },
          { path: 'guides/bios-uefi-recovery-kuwait', lazy: async () => ({ Component: (await import('./pages/BiosUefiRecoveryGuide')).default }) },
          { path: 'guides/ar/bios-uefi-recovery-kuwait', lazy: async () => ({ Component: (await import('./pages/BiosUefiRecoveryGuideAR')).default }) },
          { path: 'guides/dell-laptop-overheating', lazy: async () => { const { DellLaptopOverheatingPage } = await import('./pages/DellLaptopOverheatingPage'); return { Component: DellLaptopOverheatingPage }; } },
          { path: 'guides/gamebar-presence-writer-fix', lazy: async () => ({ Component: (await import('./pages/GameBarPresenceWriterGuide')).default }) },
          { path: 'guides/windows-10-end-of-support', lazy: async () => ({ Component: (await import('./pages/Windows10EndOfSupportGuide')).default }) },
          // 🩹 FIX (audit): both of these now also have real server-side 301s in
          // vercel.json (added alongside this fix), so production traffic never
          // hits this client-only stub. Kept as a fallback for local dev / any
          // deploy target without vercel.json's redirects applied.
          { path: 'guides/dell-inspiron-15-3000-overheating', element: <Navigate to="/guides/dell-laptop-overheating" replace /> },
          { path: 'guides/dell-overheating', element: <Navigate to="/guides/dell-laptop-overheating" replace /> },
          { path: 'battery-replacement', element: <Navigate to="/battery-replacement-kuwait" replace /> },
          // 🩹 FIX: was a static path with no `:slug` param, so
          // BlogPostTemplate's useParams<{slug}>() read undefined and could
          // never match this post in BLOG_POSTS — the page rendered as an
          // empty shell (nav/footer only, no article). Made it a dynamic
          // segment so `slug` actually resolves. React Router scores static
          // segments (guides/dell-laptop-overheating, etc., registered
          // above) higher than this dynamic one, so those routes still win
          // and only this one falls through to BlogPostTemplate.
          { path: 'guides/:slug', lazy: async () => ({ Component: (await import('./pages/BlogPostTemplate')).default }) },
          { path: 'blog/windows-11-background-services-audit', element: <Navigate to="/guides/windows-11-background-services-audit" replace /> },
          { path: 'blog/:slug', lazy: async () => ({ Component: (await import('./pages/BlogPostTemplate')).default }) },
          { path: 'news/:slug', lazy: async () => ({ Component: (await import('./pages/BlogPostTemplate')).default }) },
          // Keep explicit client fallbacks alongside the server-side 301s in vercel.json.
          { path: 'computer-repair-in-farwaniya', element: <Navigate to="/location/farwaniya" replace /> },
          { path: 'laptop-repair-in-hawalli', element: <Navigate to="/location/hawalli" replace /> },
          { path: 'computer-repair-:slug', lazy: async () => ({ Component: (await import('./pages/LocationTemplate')).default }) },
          { path: 'laptop-repair-:slug', lazy: async () => ({ Component: (await import('./pages/LocationTemplate')).default }) },
          { path: 'location/hawalli', lazy: async () => ({ Component: (await import('./pages/HawalliLocationPage')).default }) },
          { path: 'location/:slug', lazy: async () => ({ Component: (await import('./pages/LocationDeepTemplate')).default }) },
          { path: 'pillar/:slug', lazy: async () => ({ Component: (await import('./pages/PillarTemplate')).default }) },
          { path: 'faq/:faqSlug', element: <Navigate to="/faq" replace /> },

          // 🩹 FIX: explicit /404 route. Previously `<Navigate to="/404" />`
          // calls relied on falling through the dynamic `:slug` handler
          // (which only resolves to NotFound indirectly, when no graph
          // entity is named "404"). This registers it directly so it no
          // longer depends on that indirection.
          { path: '404', lazy: async () => ({ Component: (await import('./pages/NotFound')).default }) },

          // 🚀 DYNAMIC ROOT-LEVEL SEO ROUTES (Services, Brands, Problems)
          // Moved to the bottom so explicit routes match first
          { path: ':slug', lazy: async () => { const { DynamicRouteHandler } = await import('./core/routing/DynamicRoutes'); return { Component: DynamicRouteHandler }; } },
          
          // Secure Catch-All for 404s
          { path: '*', lazy: async () => ({ Component: (await import('./pages/NotFound')).default }) }
        ]
      }
    ]
  }
];

// Provide a default export as a fallback for standard dev server environments
export default function App() {
  return <AppWrapper />;
}
