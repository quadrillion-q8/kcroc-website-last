import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { HelmetProvider } from 'react-helmet-async';
import { Loader2 } from 'lucide-react';

// Single Source of Truth Routes Registry
import { ROUTES } from './constants/routes';

// Layout & Wrapper
import Layout from './components/Layout'; 

// Eagerly loaded Home for performance
import Home from './pages/Home';

// Lazy Loaded Pages
const Services = lazy(() => import('./pages/Services'));
const Pricing = lazy(() => import('./pages/Pricing'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Gallery = lazy(() => import('./pages/Gallery'));
const BookingPage = lazy(() => import('./pages/BookingPage'));
const BatteryReplacement = lazy(() => import('./pages/BatteryReplacement'));
const GamingPCCooling = lazy(() => import('./pages/GamingPCCooling'));
const GamingPC = lazy(() => import('./pages/GamingPC'));
const WebDesignKuwait = lazy(() => import('./pages/WebDesignKuwait'));
const LaptopRepair = lazy(() => import('./pages/LaptopRepair'));
const MacBookRepair = lazy(() => import('./pages/MacBookRepair'));
const ScreenReplacement = lazy(() => import('./pages/ScreenReplacement'));
const MotherboardRepair = lazy(() => import('./pages/MotherboardRepair'));

// Lazy load the programmatic FAQ page
const FAQ = lazy(() => import('./pages/FAQ')); 

// Dynamic Programmatic SEO Template
const LocationTemplate = lazy(() => import('./pages/LocationTemplate'));

// Dynamic Programmatic Blog Engine
const Blog = lazy(() => import('./pages/Blog')); 
const BlogPostTemplate = lazy(() => import('./pages/BlogPostTemplate'));

// 👈 NEW: Deep-Intent AI SEO Pages
const AILandingTemplate = lazy(() => import('./pages/ai/AILandingTemplate'));

const NotFound = lazy(() => import('./pages/NotFound'));

// Global Styles
import './styles/kcroc.css';

// Premium Loading Fallback
const PageLoader = () => (
  <div className="min-h-screen w-full bg-slate-950 flex flex-col items-center justify-center">
    <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mb-4" />
    <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Loading Interface...</p>
  </div>
);

const App = () => (
  <HelmetProvider>
    <BrowserRouter>
      <div className="w-full min-h-screen flex flex-col overflow-x-hidden bg-slate-950 m-0 p-0">
        {/* Global Layout Wrapper */}
        <Layout>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Core Navigation Routes */}
              <Route path={ROUTES.home} element={<Home />} />
              <Route path={ROUTES.services} element={<Services />} />
              <Route path={ROUTES.pricing} element={<Pricing />} />
              <Route path={ROUTES.about} element={<About />} />
              <Route path={ROUTES.contact} element={<Contact />} />
              <Route path={ROUTES.gallery} element={<Gallery />} />
              <Route path={ROUTES.book} element={<BookingPage />} />
              
              {/* FAQ Route */}
              <Route path={ROUTES.faq} element={<FAQ />} />
              
              {/* SEO Aligned & Hardened Tech Service Routes */}
              <Route path={ROUTES.macbookRepair} element={<MacBookRepair />} />
              <Route path={ROUTES.laptopRepair} element={<LaptopRepair />} />
              <Route path={ROUTES.laptopRepairHawalli} element={<LaptopRepair />} />
              <Route path={ROUTES.gamingPC} element={<GamingPC />} />
              <Route path={ROUTES.screenReplacement} element={<ScreenReplacement />} />
              <Route path={ROUTES.motherboardRepair} element={<MotherboardRepair />} />
              
              {/* Programmatic SEO Dynamic Area Route */}
              <Route path={ROUTES.programmaticSEO} element={<LocationTemplate />} />
              
              {/* Programmatic Blog Engine */}
              <Route path={ROUTES.blog} element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPostTemplate />} />
              
              {/* 👈 NEW: AI & Intent-based Semantic Landing Pages */}
              <Route path="/ai/:intentSlug" element={<AILandingTemplate />} />
              
              {/* General Technical Sub-Pages */}
              <Route path={ROUTES.batteryReplacement} element={<BatteryReplacement />} />
              <Route path={ROUTES.gamingPCCooling} element={<GamingPCCooling />} />
              <Route path={ROUTES.webDesign} element={<WebDesignKuwait />} />
              
              {/* Catch-All 404 Route */}
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
