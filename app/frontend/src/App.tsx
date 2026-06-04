import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { HelmetProvider } from 'react-helmet-async';

// Critical components load immediately
import Header from './components/Header';
import FloatingActions from './components/FloatingActions';
import Home from './pages/Home';

// Lazy loaded pages
const Services = lazy(() => import('./pages/Services'));
const Pricing = lazy(() => import('./pages/Pricing'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Gallery = lazy(() => import('./pages/Gallery'));
const BatteryReplacement = lazy(() => import('./pages/BatteryReplacement'));
const GamingPCCooling = lazy(() => import('./pages/GamingPCCooling'));
const GamingPC = lazy(() => import('./pages/GamingPC'));
const WebDesignKuwait = lazy(() => import('./pages/WebDesignKuwait'));
const BookingPage = lazy(() => import('./pages/BookingPage'));
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
        <Suspense fallback={<div className="p-20 text-center text-white">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/battery-replacement" element={<BatteryReplacement />} />
            <Route path="/gaming-pc-cooling" element={<GamingPCCooling />} />
            <Route path="/gaming-pc-repair-kuwait" element={<GamingPC />} />
            <Route path="/web-design-kuwait" element={<WebDesignKuwait />} />
            <Route path="/book" element={<BookingPage />} />
            <Route path="/laptop-repair-hawalli-kuwait" element={<LaptopRepair />} />
            <Route path="/macbook-repair" element={<MacBookRepair />} />
            <Route path="/screen-replacement" element={<ScreenReplacement />} />
            <Route path="/data-security" element={<PrivacySecurity />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-column">
              <img src="https://res.cloudinary.com/dsbwzags3/image/upload/v1769908596/logo_btpfls.png" alt="KCROC Logo" width="140" height="50" style={{ width: '140px', height: 'auto' }} loading="lazy" />
              <p>Professional Computer Repair Services in Kuwait</p>
            </div>
            <div className="footer-column">
              <h4>Quick Links</h4>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/services">Services</Link></li>
                <li><Link to="/book">Book Service</Link></li>
              </ul>
            </div>
            {/* Additional footer columns can remain here */}
          </div>
        </div>
      </footer>

      <FloatingActions />
      <Analytics />
      <SpeedInsights />
    </BrowserRouter>
  </HelmetProvider>
);

export default App;
