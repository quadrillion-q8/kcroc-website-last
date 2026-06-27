// File: src/App.tsx
import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { HelmetProvider } from 'react-helmet-async';
import { Loader2 } from 'lucide-react';

import { ROUTES } from './constants/routes';
import Layout from './components/Layout';
import Home from './pages/Home';
import { trackPageView } from './utils/analytics';

// ─── LAZY PAGES ──────────────────────────────────────────────────────────────
const Services          = lazy(() => import('./pages/Services'));
const Pricing           = lazy(() => import('./pages/Pricing'));
const About             = lazy(() => import('./pages/About'));
const Contact           = lazy(() => import('./pages/Contact'));
const Gallery           = lazy(() => import('./pages/Gallery'));
const BookingPage       = lazy(() => import('./pages/BookingPage'));
const FAQ               = lazy(() => import('./pages/FAQ'));

// Service pages
const LaptopRepair      = lazy(() => import('./pages/LaptopRepair'));
const MacBookRepair     = lazy(() => import('./pages/MacBookRepair'));
const GamingPC          = lazy(() => import('./pages/GamingPC'));
const ScreenReplacement = lazy(() => import('./pages/ScreenReplacement'));
const MotherboardRepair = lazy(() => import('./pages/MotherboardRepair'));
const PrivacySecurity   = lazy(() => import('./pages/PrivacySecurity')); // ✅ Fixed: added

// Sub-pages
const BatteryReplacement = lazy(() => import('./pages/BatteryReplacement'));
const GamingPCCooling    = lazy(() => import('./pages/GamingPCCooling'));

// Programmatic SEO
const LocationTemplate  = lazy(() => import('./pages/LocationTemplate'));

// Blog engine
const Blog              = lazy(() => import('./pages/Blog'));
const BlogPostTemplate  = lazy(() => import('./pages/BlogPostTemplate'));
const PillarTemplate    = lazy(() => import('./pages/PillarTemplate'));

// AI intent pages
const AILandingTemplate = lazy(() => import('./pages/ai/AILandingTemplate'));

// 404
const NotFound          = lazy(() => import('./pages/NotFound'));

import './styles/kcroc.css';

// ─── LOADING FALLBACK ─────────────────────────────────────────────────────────
const PageLoader = () => (
  // ✅ Fixed: role="status" + aria-live for screen readers; removed hardcoded bg
  <div
    className="min-h-screen w-full bg-slate-950 flex flex-col items-center justify-center"
    role="status"
    aria-live="polite"
    aria-label="Loading page"
  >
    <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mb-4" aria-hidden="true" />
    <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">
      Loading Interface...
    </p>
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
const App = () => (
  <HelmetProvider>
    <BrowserRouter>
      <AnalyticsTracker />
      <div className="w-full min-h-screen flex flex-col overflow-x-hidden bg-slate-950 m-0 p-0">
        <Layout>
          <Suspense fallback={<PageLoader />}>
            <Routes>

              {/* ─── CORE NAVIGATION ─── */}
              <Route path={ROUTES.home}     element={<Home />} />
              <Route path={ROUTES.services} element={<Services />} />
              <Route path={ROUTES.pricing}  element={<Pricing />} />
              <Route path={ROUTES.about}    element={<About />} />
              <Route path={ROUTES.contact}  element={<Contact />} />
              <Route path={ROUTES.gallery}  element={<Gallery />} />
              <Route path={ROUTES.book}     element={<BookingPage />} />
              <Route path={ROUTES.faq}      element={<FAQ />} />

              {/* ─── SERVICE PAGES ─── */}
              <Route path={ROUTES.laptopRepair}      element={<LaptopRepair />} />
              <Route path={ROUTES.laptopRepairHawalli} element={<LaptopRepair />} />
              <Route path={ROUTES.macbookRepair}     element={<MacBookRepair />} />
              <Route path={ROUTES.gamingPC}          element={<GamingPC />} />
              <Route path={ROUTES.screenReplacement} element={<ScreenReplacement />} />
              <Route path={ROUTES.motherboardRepair} element={<MotherboardRepair />} />

              {/* ─── UTILITY PAGES ─── */}
              {/* ✅ Fixed: added PrivacySecurity route */}
              <Route path={ROUTES.privacySecurity}   element={<PrivacySecurity />} />

              {/* ─── SUB-PAGES ─── */}
              <Route path={ROUTES.batteryReplacement} element={<BatteryReplacement />} />
              <Route path={ROUTES.gamingPCCooling}    element={<GamingPCCooling />} />

              {/* ─── REDIRECTS for old/corrected slugs ─── */}
              {/* ✅ Fixed: 301-equivalent redirects for discontinued/renamed routes */}
              <Route path="/data-recovery-kuwait"              element={<Navigate to={ROUTES.services} replace />} />
              <Route path="/screen-replacement-kuwait"         element={<Navigate to={ROUTES.screenReplacement} replace />} />
              <Route path="/chip-level-motherboard-repair-hawalli" element={<Navigate to={ROUTES.motherboardRepair} replace />} />

              {/* ─── PROGRAMMATIC SEO ─── */}
              <Route path={ROUTES.programmaticSEO} element={<LocationTemplate />} />

              {/* ─── BLOG ENGINE ─── */}
              <Route path={ROUTES.blog}          element={<Blog />} />
              <Route path="/blog/pillar/:slug"   element={<PillarTemplate />} />
              <Route path="/blog/:slug"          element={<BlogPostTemplate />} />

              {/* ─── AI INTENT PAGES ─── */}
              <Route path="/ai/:intentSlug" element={<AILandingTemplate />} />

              {/* ─── 404 ─── */}
              <Route path="*" element={<NotFound />} />

            </Routes>
          </Suspense>
        </Layout>
      </div>
      <Analytics />
      <SpeedInsights />
    </BrowserRouter>
  </HelmetProvider>
);

export default App;
