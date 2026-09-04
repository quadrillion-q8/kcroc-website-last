// File: app/frontend/src/App.tsx
import React, { Suspense, lazy } from 'react';
import { RouteObject, Navigate, Outlet } from 'react-router-dom';
import { RootLayout } from './core/components/layout/RootLayout';
import { AnalyticsProvider } from './core/analytics/AnalyticsProvider';

// 🚀 CWV Optimization: Defer heavy third-party UI to protect Interaction to Next Paint (INP)
const ChatWidget = lazy(() => import('./components/ChatWidget').then(module => ({ default: module.ChatWidget })));

// Core Pages
const Home = lazy(() => import('./pages/Home'));
const NearMe = lazy(() => import('./pages/NearMe'));
const NearMeAR = lazy(() => import('./pages/NearMeAR'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Contact = lazy(() => import('./pages/Contact'));
const Gallery = lazy(() => import('./pages/Gallery'));
const About = lazy(() => import('./pages/About'));
const PrivacySecurity = lazy(() => import('./pages/PrivacySecurity'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Blog = lazy(() => import('./pages/Blog')); 
const NotFound = lazy(() => import('./pages/NotFound'));
const BookingPage = lazy(() => import('./pages/BookingPage'));

// Dynamic Enterprise Templates
const Services = lazy(() => import('./pages/Services'));
const PillarTemplate = lazy(() => import('./pages/PillarTemplate'));
const LocationTemplate = lazy(() => import('./pages/LocationTemplate'));
// 🩹 FIX: index pages for /brands, /problems, /guides — previously missing
// entirely, which is why those URLs 404'd and had no home in the mega menus.
const BrandsIndex = lazy(() => import('./pages/BrandsIndex'));
const ProblemsIndex = lazy(() => import('./pages/ProblemsIndex'));
const GuidesIndex = lazy(() => import('./pages/GuidesIndex'));
// 🚀 Hawalli is KCROC's only physical branch and one of the site's
// highest-traffic pages — it gets a dedicated page instead of being forced
// through the shared LocationTemplate used by the other (service-area) locations.
const HawalliLocationPage = lazy(() => import('./pages/HawalliLocationPage'));
// 🚀 The five service-area locations (Farwaniya, Salmiya, Kuwait City, Jahra,
// Ahmadi) now get the same rich page depth as Hawalli via a shared,
// data-driven template rather than the older, thinner LocationTemplate.
//
// 🩹 FIX: this MUST stay a single dynamic `location/:slug` route (below),
// not five separate static route entries (one per location). vite-react-ssg
// prerenders every route in `public/sitemap.xml` in one Node process, and
// registering five sibling static RouteObjects for the same `location/*`
// pattern caused the SSG renderer to flush several of them before the page
// content actually resolved — producing near-empty static HTML (no <h1>,
// wrong content) for everything except Hawalli, even though the page
// worked perfectly in the browser after client-side hydration. Routing all
// five through one dynamic route — the same pattern the old LocationTemplate
// already used successfully — avoids the issue entirely.
const LocationDeepTemplate = lazy(() => import('./pages/LocationDeepTemplate'));
const BlogPostTemplate = lazy(() => import('./pages/BlogPostTemplate'));

// Case Studies Index Page
const CaseStudiesIndex = lazy(() => import('./pages/CaseStudiesIndex'));
const CaseStudyTemplate = lazy(() => import('./pages/templates/CaseStudyTemplate'));

// Custom Standalone Blog Pages
const BlogLaptopRepair = lazy(() => import('./pages/BlogLaptopRepair'));
const BlogScreenProtection = lazy(() => import('./pages/BlogScreenProtection'));
const GamingPCCooling = lazy(() => import('./pages/GamingPCCooling'));
const ScreenProtectionTips = lazy(() => import('./pages/ScreenProtectionTips'));

// Content Pillars & Clusters
const LaptopBuyingGuide = lazy(() => import('./pages/LaptopBuyingGuide'));
const LaptopBuyingGuideAR = lazy(() => import('./pages/LaptopBuyingGuideAR'));
const IntelVsAmdGuide = lazy(() => import('./pages/IntelVsAmdGuide')); 

// Author Bio Pages
const AuthorImran = lazy(() => import('./pages/AuthorImran'));

// 🚀 Custom AI-Generated Guides
const BatteryHealthGuide = lazy(() => import('./pages/BatteryHealthGuide'));
const BiosUefiRecoveryGuide = lazy(() => import('./pages/BiosUefiRecoveryGuide'));
const DellLaptopOverheatingPage = lazy(() => import('./pages/DellLaptopOverheatingPage').then(module => ({ default: module.DellLaptopOverheatingPage })));
const GameBarPresenceWriterGuide = lazy(() => import('./pages/GameBarPresenceWriterGuide'));

// 🚀 CWV Optimization: Extracted routing logic that requires graph.ts into a deferred chunk.
const DynamicRouteHandler = lazy(() => import('./core/routing/DynamicRoutes').then(m => ({ default: m.DynamicRouteHandler })));
const LegacyServiceRedirect = lazy(() => import('./core/routing/DynamicRoutes').then(m => ({ default: m.LegacyServiceRedirect })));

// UI: Global loading spinner
const PageLoader = () => (
  <div className="w-full h-[60vh] flex items-center justify-center bg-transparent">
    <div className="w-10 h-10 border-4 border-slate-800 border-t-cyan-400 rounded-full animate-spin"></div>
  </div>
);

// High-level wrapper to maintain Context Providers without a BrowserRouter
// (ViteReactSSG provides its own Router implementation automatically)
const AppWrapper = () => (
  <AnalyticsProvider>
    <Suspense fallback={<PageLoader />}>
      <Outlet />
    </Suspense>
    
    {/* CWV Optimization: Background boundary for the chat widget */}
    <Suspense fallback={null}>
      <ChatWidget /> 
    </Suspense>
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
          { index: true, element: <Home /> },
          { path: 'near-me', element: <NearMe /> },
          { path: 'ar/near-me', element: <NearMeAR /> },
          { path: 'services', element: <Services /> },
          { path: 'services/:serviceSlug', element: <LegacyServiceRedirect /> },
          // 🩹 FIX: these three 404'd previously — there was no route for
          // them at all, so they fell through to the dynamic `:slug`
          // handler, which only resolves slugs that exist as an actual
          // Service/Brand/Problem entity in the graph.
          { path: 'brands', element: <BrandsIndex /> },
          { path: 'problems', element: <ProblemsIndex /> },
          { path: 'guides', element: <GuidesIndex /> },
          { path: 'case-studies', element: <CaseStudiesIndex /> },
          { path: 'case-studies/:slug', element: <CaseStudyTemplate /> },
          { path: 'book', element: <BookingPage /> },
          { path: 'booking', element: <Navigate to="/book" replace /> },
          { path: 'pricing', element: <Pricing /> },
          { path: 'contact', element: <Contact /> },
          { path: 'gallery', element: <Gallery /> },
          { path: 'about', element: <About /> },
          { path: 'privacy-security-kuwait', element: <PrivacySecurity /> },
          { path: 'privacy-policy', element: <PrivacyPolicy /> },
          { path: 'terms-of-service', element: <TermsOfService /> },
          { path: 'privacy', element: <Navigate to="/privacy-policy" replace /> },
          { path: 'terms', element: <Navigate to="/terms-of-service" replace /> },
          { path: 'faq', element: <FAQ /> },
          { path: 'blog', element: <Blog /> },
          { path: 'blog/laptop-repair-kuwait-2026', element: <BlogLaptopRepair /> },
          { path: 'blog/how-to-protect-laptop-screen', element: <BlogScreenProtection /> },
          { path: 'blog/gaming-pc-cooling', element: <GamingPCCooling /> },
          { path: 'blog/laptop-buying-guide-kuwait-2026', element: <LaptopBuyingGuide /> },
          { path: 'blog/ar/laptop-buying-guide-kuwait-2026', element: <LaptopBuyingGuideAR /> },
          { path: 'blog/intel-core-ultra-vs-amd-ryzen-ai', element: <IntelVsAmdGuide /> },
          { path: 'author/imran', element: <AuthorImran /> },
          { path: 'guides/laptop-battery-warning-signs', element: <BatteryHealthGuide /> },
          { path: 'guides/bios-uefi-recovery-kuwait', element: <BiosUefiRecoveryGuide /> },
          { path: 'guides/dell-laptop-overheating', element: <DellLaptopOverheatingPage /> },
          { path: 'guides/gamebar-presence-writer-fix', element: <GameBarPresenceWriterGuide /> },
          // 🩹 FIX (audit): both of these now also have real server-side 301s in
          // vercel.json (added alongside this fix), so production traffic never
          // hits this client-only stub. Kept as a fallback for local dev / any
          // deploy target without vercel.json's redirects applied.
          { path: 'guides/dell-inspiron-15-3000-overheating', element: <Navigate to="/guides/dell-laptop-overheating" replace /> },
          { path: 'guides/dell-overheating', element: <Navigate to="/guides/dell-laptop-overheating" replace /> },
          { path: 'laptop-screen-protection-tips', element: <ScreenProtectionTips /> },
          { path: 'blog/laptop-screen-protection-tips', element: <Navigate to="/laptop-screen-protection-tips" replace /> },
          { path: 'battery-replacement', element: <Navigate to="/battery-replacement-kuwait" replace /> },
          { path: 'blog/:slug', element: <BlogPostTemplate /> },
          { path: 'computer-repair-:slug', element: <LocationTemplate /> },
          { path: 'laptop-repair-:slug', element: <LocationTemplate /> },
          { path: 'location/hawalli', element: <HawalliLocationPage /> },
          { path: 'location/:slug', element: <LocationDeepTemplate /> },
          { path: 'pillar/:slug', element: <PillarTemplate /> },
          { path: 'faq/:faqSlug', element: <Navigate to="/faq" replace /> },

          // 🩹 FIX: explicit /404 route. Previously `<Navigate to="/404" />`
          // calls relied on falling through the dynamic `:slug` handler
          // (which only resolves to NotFound indirectly, when no graph
          // entity is named "404"). This registers it directly so it no
          // longer depends on that indirection.
          { path: '404', element: <NotFound /> },

          // 🚀 DYNAMIC ROOT-LEVEL SEO ROUTES (Services, Brands, Problems)
          // Moved to the bottom so explicit routes match first
          { path: ':slug', element: <DynamicRouteHandler /> },
          
          // Secure Catch-All for 404s
          { path: '*', element: <NotFound /> }
        ]
      }
    ]
  }
];

// Provide a default export as a fallback for standard dev server environments
export default function App() {
  return <AppWrapper />;
}
