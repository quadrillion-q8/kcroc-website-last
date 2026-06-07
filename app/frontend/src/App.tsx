import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
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
const MotherboardRepair = lazy(() => import('./pages/MotherboardRepair'));
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
            <Route path="/chip-level-motherboard-repair-hawalli" element={<MotherboardRepair />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      {/* Restored Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-column">
              <img
                src="https://res.cloudinary.com/dsbwzags3/image/upload/v1769908596/logo_btpfls.png"
                alt="KCROC - Computer Repair Kuwait"
                width="140"
                height="50"
                style={{ width: '140px', height: 'auto' }}
                loading="lazy"
              />
              <p>Professional Computer Repair Services in Kuwait</p>
              <p className="footer-badge">🚨 Same-Day Service Available</p>
            </div>

            <div className="footer-column">
              <h4>Quick Links</h4>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/services">Services</Link></li>
                <li><Link to="/pricing">Pricing</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/gallery">Gallery</Link></li>
                <li><Link to="/laptop-repair-hawalli-kuwait">Laptop Repair</Link></li>
                <li><Link to="/macbook-repair">MacBook Repair</Link></li>
                <li><Link to="/screen-replacement">Screen Replacement</Link></li>
                <li><Link to="/battery-replacement">Battery Guide</Link></li>
                <li><Link to="/gaming-pc-cooling">Gaming PC Cooling</Link></li>
                <li><Link to="/gaming-pc-repair-kuwait">Gaming PC Repair</Link></li>
                <li><Link to="/web-design-kuwait">Web Design</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/book">Book Service</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Contact Us</h4>
              <ul>
                <li>📞 <a href="tel:+96555301913">+965 5530 1913</a></li>
                <li title="Business Email">✉️ <a href="mailto:quadrillion1980@gmail.com">quadrillion1980@gmail.com</a> <span style={{ fontSize: '0.75rem', color: '#94a3b8', marginLeft: '0.25rem' }}>(Business Email)</span></li>
                <li>📍 Hawalli, Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19</li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Business Hours</h4>
              <ul>
                <li>Saturday - Thursday</li>
                <li>10:00 AM - 10:00 PM</li>
                <li style={{ marginTop: '0.5rem' }}>Friday</li>
                <li>6:00 PM - 10:00 PM</li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} KCROC - Kuwait Computer Repair On Call. All rights reserved.</p>
            <div className="footer-social">
              <a 
                href="https://www.facebook.com/computerrepairkuwait" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Follow us on Facebook"
              >
                <span>📘</span>
              </a>
              <a 
                href="https://www.instagram.com/computerrepairkuwait" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Follow us on Instagram"
              >
                <span>📷</span>
              </a>
              <a 
                href="https://www.tiktok.com/@computer.q8?is_from_webapp=1&sender_device=pc" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Follow us on TikTok"
              >
                <span>🎵</span>
              </a>
            </div>
          </div>
        </div>
        <div style={{ fontSize: '0.85rem', opacity: 0.7, marginTop: '20px', textAlign: 'center', paddingBottom: '20px' }}>
          <p><strong>Kuwait Computer Repair On Call</strong> | Hawalli, Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19</p>
          <span>Local Tech Guides: </span>
          <Link to="/laptop-repair-hawalli-kuwait" style={{ color: 'inherit', textDecoration: 'underline' }}>
            Laptop Repair Hawalli Kuwait
          </Link>
          <span> | </span>
          <Link to="/chip-level-motherboard-repair-hawalli" style={{ color: 'inherit', textDecoration: 'underline' }}>
            Chip-Level Motherboard Repair
          </Link>
        </div>
      </footer>
      
      <FloatingActions />
      <Analytics />
      <SpeedInsights />
    </BrowserRouter>
  </HelmetProvider>
);

export default App;
