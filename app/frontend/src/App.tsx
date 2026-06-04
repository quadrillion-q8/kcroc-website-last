import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { HelmetProvider } from 'react-helmet-async';

// Layout & Critical Components
import Header from './components/Header';
import FloatingActions from './components/FloatingActions';
import Home from './pages/Home';

// Lazy Loaded Pages for Performance
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
const NotFound = lazy(() => import('./pages/NotFound'));

import './styles/kcroc.css';

const App = () => (
  <HelmetProvider>
    <BrowserRouter>
      <Header />
      <main style={{ paddingTop: '4rem', paddingBottom: '5rem' }}>
        <Suspense fallback={<div className="p-20 text-center text-emerald-500">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/book" element={<BookingPage />} />
            <Route path="/battery-replacement" element={<BatteryReplacement />} />
            <Route path="/gaming-pc-cooling" element={<GamingPCCooling />} />
            <Route path="/gaming-pc-repair-kuwait" element={<GamingPC />} />
            <Route path="/web-design-kuwait" element={<WebDesignKuwait />} />
            <Route path="/laptop-repair-hawalli-kuwait" element={<LaptopRepair />} />
            <Route path="/macbook-repair" element={<MacBookRepair />} />
            <Route path="/screen-replacement" element={<ScreenReplacement />} />
            <Route path="/data-security" element={<PrivacySecurity />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      
      <FloatingActions />
      <Analytics />
      <SpeedInsights />
    </BrowserRouter>
  </HelmetProvider>
);

export default App;
