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

// Dynamic Programmatic SEO Template
const LocationTemplate = lazy(() => import('./pages/LocationTemplate'));

// Blog Components
const Blog = lazy(() => import('./pages/Blog')); 
const BlogScreenProtection = lazy(() => import('./pages/BlogScreenProtection'));
const BlogLaptopRepair = lazy(() => import('./pages/BlogLaptopRepair')); 

const NotFound = lazy(() => import('./pages/NotFound'));

// Global Styles
import './styles/kcroc.css';

// Premium Loading Fallback
const PageLoader = () => (
  <div className="min-h-screen w-full bg-slate-950 flex flex-col items-center justify-center">
    <Flexible className="w-12 h-12 text-cyan-400 animate-spin mb-4" />
    <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mb-4" />
    <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Loading Interface...</p>
  </div>
);

const App = () => (
  <HelmetProvider>
    <BrowserRouter>
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
              
              {/* SEO Aligned Routes */}
              <Route path="/macbook-repair-kuwait" element={<MacBookRepair />} />
              
              {/* Bulletproof Laptop Repair Routes */}
              <Route path="/laptop-repair-kuwait" element={<LaptopRepair />} />
              <Route path="/laptop-repair-hawalli-kuwait" element={<LaptopRepair />} />
              
              <Route path="/gaming-pc-repair-kuwait" element={<GamingPC />} />
              <Route path="/screen-replacement-kuwait" element={<ScreenReplacement />} />
              <Route path="/data-recovery-kuwait" element={<PrivacySecurity />} />
              <Route path="/chip-level-motherboard-repair-hawalli" element={<MotherboardRepair />} />
              
              {/* 
                Programmatic SEO Dynamic Route 
                Catches URLs like /macbook-repair-in-salmiya or /laptop-screen-replacement-in-jahra 
              */}
              <Route path="/:service-in-:city" element={<LocationTemplate />} />
              
              {/* Blog Hub & Supporting Routes */}
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/laptop-repair-kuwait-2026" element={<BlogLaptopRepair />} />
              <Route path="/blog/how-to-protect-laptop-screen" element={<BlogScreenProtection />} />
              
              {/* General Tech Pages */}
              <Route path="/battery-replacement" element={<BatteryReplacement />} />
              <Route path="/gaming-pc-cooling" element={<GamingPCCooling />} />
              <Route path="/web-design-kuwait" element={<WebDesignKuwait />} />
              
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
