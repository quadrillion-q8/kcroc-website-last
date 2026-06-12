import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { HelmetProvider } from 'react-helmet-async';
import { Loader2 } from 'lucide-react';

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
const PrivacySecurity = lazy(() => import('./pages/PrivacySecurity'));
const MotherboardRepair = lazy(() => import('./pages/MotherboardRepair'));
const BlogScreenProtection = lazy(() => import('./pages/BlogScreenProtection'));
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
      {/* Strict Root Wrapper: 
        Forces the app to take exactly 100% width and prevents right-shifting/horizontal scrolling 
      */}
      <div className="w-full min-h-screen flex flex-col overflow-x-hidden bg-slate-950 m-0 p-0">
        <Layout>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/book" element={<BookingPage />} />
              
              {/* SEO Aligned Routes: Matching your sitemap.xml */}
              <Route path="/macbook-repair-kuwait" element={<MacBookRepair />} />
              <Route path="/laptop-repair-kuwait" element={<LaptopRepair />} />
              <Route path="/gaming-pc-repair-kuwait" element={<GamingPC />} />
              <Route path="/screen-replacement-kuwait" element={<ScreenReplacement />} />
              <Route path="/data-recovery-kuwait" element={<PrivacySecurity />} />
              <Route path="/chip-level-motherboard-repair-hawalli" element={<MotherboardRepair />} />
              
              {/* Supporting & Blog Routes */}
              <Route path="/battery-replacement" element={<BatteryReplacement />} />
              <Route path="/gaming-pc-cooling" element={<GamingPCCooling />} />
              <Route path="/web-design-kuwait" element={<WebDesignKuwait />} />
              <Route path="/blog/how-to-protect-laptop-screen" element={<BlogScreenProtection />} />
              
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
