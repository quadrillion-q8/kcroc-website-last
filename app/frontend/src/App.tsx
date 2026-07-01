// File: app/frontend/src/App.tsx
import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Loader2 } from 'lucide-react';

import { ROUTES } from './constants/routes';
import { RootLayout } from './core/components/layout/RootLayout'; // ✅ Injected New Design System
import Home from './pages/Home';
import { trackPageView } from './utils/analytics';
import { useGlobalClickTracker } from './hooks/useGlobalClickTracker';

// ─── UTILITY: SCROLL TO TOP ON NAVIGATION ────────────────────────────────────
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// ─── LAZY PAGES ──────────────────────────────────────────────────────────────
const Services          = lazy(() => import('./pages/Services'));
const Pricing           = lazy(() => import('./pages/Pricing'));
const About             = lazy(() => import('./pages/About'));
const Contact           = lazy(() => import('./pages/Contact'));
const Gallery           = lazy(() => import('./pages/Gallery'));
const BookingPage       = lazy(() => import('./pages/BookingPage'));
const FAQ               = lazy(() => import('./pages/FAQ'));

const LaptopRepair      = lazy(() => import('./pages/LaptopRepair'));
const MacBookRepair     = lazy(() => import('./pages/MacBookRepair'));
const GamingPC          = lazy(() => import('./pages/GamingPC'));
const ScreenReplacement = lazy(() => import('./pages/ScreenReplacement'));
const MotherboardRepair = lazy(() => import('./pages/MotherboardRepair'));
const PrivacySecurity   = lazy(() => import('./pages/PrivacySecurity'));

const BatteryReplacement = lazy(() => import('./pages/BatteryReplacement'));
const GamingPCCooling    = lazy(() => import('./pages/GamingPCCooling'));

const LocationTemplate  = lazy(() => import('./pages/LocationTemplate'));
const Blog              = lazy(() => import('./pages/Blog'));
const BlogPostTemplate  = lazy(() => import('./pages/BlogPostTemplate'));
const PillarTemplate    = lazy(() => import('./pages/PillarTemplate'));
const AILandingTemplate = lazy(() => import('./pages/ai/AILandingTemplate'));
const NotFound          = lazy(() => import('./pages/NotFound'));

// import './styles/kcroc.css';

// ─── LOADING FALLBACK ─────────────────────────────────────────────────────────
const PageLoader = () => (
  <div className="min-h-screen w-full bg-brand-dark flex flex-col items-center justify-center" role="status">
    <Loader2 className="w-12 h-12 text-brand-primary animate-spin mb-4" />
    <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Loading Interface...</p>
  </div>
);

// ─── ANALYTICS TRACKER ───────────────────────────────────────────────────────
const AnalyticsTracker = () => {
  const location = useLocation();
  useEffect(() => {
    trackPageView(location.pathname + location.search);
  }, [location]);
  return null;
};

// ─── APP ─────────────────────────────────────────────────────────────────────
const App = () => {
  // Activate global click interception for WhatsApp and Phone links
  useGlobalClickTracker();

  return (
    // ✅ Removed duplicate HelmetProvider (it safely lives in main.tsx now)
    <BrowserRouter>
      <ScrollToTop />
      <AnalyticsTracker />
      
      {/* ✅ Removed hardcoded bg-slate-950 wrapper (RootLayout handles this globally now) */}
      <Suspense fallback={<PageLoader />}>
        <Routes>
          
          {/* ✅ THE ORCHESTRATOR: All routes are now wrapped inside RootLayout */}
          <Route element={<RootLayout />}>
            
            {/* CORE NAVIGATION */}
            <Route path={ROUTES.home}        element={<Home />} />
            <Route path={ROUTES.services}    element={<Services />} />
            <Route path={ROUTES.pricing}     element={<Pricing />} />
            <Route path={ROUTES.about}       element={<About />} />
            <Route path={ROUTES.contact}     element={<Contact />} />
            <Route path={ROUTES.gallery}     element={<Gallery />} />
            <Route path={ROUTES.book}        element={<BookingPage />} />
            <Route path={ROUTES.faq}         element={<FAQ />} />

            {/* SERVICE PAGES */}
            <Route path={ROUTES.laptopRepair}        element={<LaptopRepair />} />
            <Route path={ROUTES.laptopRepairHawalli} element={<LaptopRepair />} />
            <Route path={ROUTES.macbookRepair}       element={<MacBookRepair />} />
            <Route path={ROUTES.gamingPC}            element={<GamingPC />} />
            <Route path={ROUTES.screenReplacement}   element={<ScreenReplacement />} />
            <Route path={ROUTES.motherboardRepair}   element={<MotherboardRepair />} />

            {/* UTILITY & SUB-PAGES */}
            <Route path={ROUTES.privacySecurity}     element={<PrivacySecurity />} />
            <Route path={ROUTES.batteryReplacement}  element={<BatteryReplacement />} />
            <Route path={ROUTES.gamingPCCooling}     element={<GamingPCCooling />} />

            {/* PROGRAMMATIC SEO & BLOG */}
            <Route path={ROUTES.programmaticSEO} element={<LocationTemplate />} />
            <Route path={ROUTES.blog}             element={<Blog />} />
            <Route path="/blog/pillar/:slug"      element={<PillarTemplate />} />
            <Route path="/blog/:slug"             element={<BlogPostTemplate />} />
            <Route path="/ai/:intentSlug"         element={<AILandingTemplate />} />

            {/* REDIRECTS */}
            <Route path="/data-recovery-kuwait" element={<Navigate to={ROUTES.services} replace />} />
            <Route path="*" element={<NotFound />} />
            
          </Route>
        </Routes>
      </Suspense>
      
      <Analytics />
      <SpeedInsights />
    </BrowserRouter>
  );
};

export default App;
