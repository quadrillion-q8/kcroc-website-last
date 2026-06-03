import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { HelmetProvider } from 'react-helmet-async';

// Components
import Header from './components/Header';
import FloatingActions from './components/FloatingActions';

// Pages
import Home from './pages/Home';
import Services from './pages/Services';
import Pricing from './pages/Pricing';
import About from './pages/About';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import BatteryReplacement from './pages/BatteryReplacement';
import GamingPCCooling from './pages/GamingPCCooling';
import GamingPC from './pages/GamingPC'; // New Page Imported
import WebDesignKuwait from './pages/WebDesignKuwait';
import BookingPage from './pages/BookingPage';
import LaptopRepair from './pages/LaptopRepair';
import MacBookRepair from './pages/MacBookRepair';
import ScreenReplacement from './pages/ScreenReplacement';
import PrivacySecurity from './pages/PrivacySecurity';
import NotFound from './pages/NotFound';

// Styles
import './styles/kcroc.css';

const App = () => (
  <HelmetProvider>
    <BrowserRouter>
      <Header />
      <main style={{ paddingTop: '4rem', paddingBottom: '5rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/battery-replacement" element={<BatteryReplacement />} />
          <Route path="/gaming-pc-cooling" element={<GamingPCCooling />} />
          <Route path="/gaming-pc-repair-kuwait" element={<GamingPC />} /> {/* New Route Added */}
          <Route path="/web-design-kuwait" element={<WebDesignKuwait />} />
          <Route path="/book" element={<BookingPage />} />
          <Route path="/laptop-repair" element={<LaptopRepair />} />
          <Route path="/macbook-repair" element={<MacBookRepair />} />
          <Route path="/screen-replacement" element={<ScreenReplacement />} />
          <Route path="/data-security" element={<PrivacySecurity />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      
      {/* Footer */}
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
                <li><a href="/">Home</a></li>
                <li><a href="/services">Services</a></li>
                <li><a href="/pricing">Pricing</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/gallery">Gallery</a></li>
                <li><a href="/laptop-repair">Laptop Repair</a></li>
                <li><a href="/macbook-repair">MacBook Repair</a></li>
                <li><a href="/screen-replacement">Screen Replacement</a></li>
                <li><a href="/battery-replacement">Battery Guide</a></li>
                <li><a href="/gaming-pc-cooling">Gaming PC Cooling</a></li>
                <li><a href="/gaming-pc-repair-kuwait">Gaming PC Repair</a></li>
                <li><a href="/web-design-kuwait">Web Design</a></li>
                <li><a href="/contact">Contact</a></li>
                <li><a href="/book">Book Service</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Contact Us</h4>
              <ul>
                <li>📞 <a href="tel:+96555301913">+965 5530 1913</a></li>
                <li title="Business Email">✉️ <a href="mailto:quadrillion1980@gmail.com">quadrillion1980@gmail.com</a> <span style={{ fontSize: '0.75rem', color: '#94a3b8', marginLeft: '0.25rem' }}>(Business Email)</span></li>
                <li>📍 Al Mullah Complex, Ibn Khaldoun St, Hawalli, Kuwait</li>
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
                href="https://www.facebook.com/profile.php?id=61572103117031" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Follow us on Facebook"
              >
                📘
              </a>
              <a 
                href="https://www.instagram.com/quadrillion.q8/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Follow us on Instagram"
              >
                📷
              </a>
              <a 
                href="https://www.tiktok.com/@computer.q8?is_from_webapp=1&sender_device=pc" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Follow us on TikTok"
              >
                🎵
              </a>
            </div>
          </div>
        </div>
        <div style={{ fontSize: '0.85rem', opacity: 0.7, marginTop: '20px', textAlign: 'center' }}>
          <p><strong>Kuwait Computer Repair On Call</strong> | Hawalli, Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19</p>
          <span>Local Tech Guides: </span>
          <a href="/laptop-repair-hawalli-kuwait" style={{ color: 'inherit', textDecoration: 'underline' }}>Laptop Repair Hawalli Kuwait</a>
          <span> | </span>
          <a href="/chip-level-motherboard-repair-hawalli" style={{ color: 'inherit', textDecoration: 'underline' }}>Chip-Level Motherboard Repair</a>
        </div>
      </footer>

      <FloatingActions />
      <Analytics />
      <SpeedInsights />
    </BrowserRouter>
  </HelmetProvider>
);

export default App;
            <a 
              href="https://www.facebook.com/profile.php?id=61572103117031" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Follow us on Facebook"
            >
              📘
            </a>
            <a 
              href="https://www.instagram.com/quadrillion.q8/" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Follow us on Instagram"
            >
              📷
            </a>
            <a 
              href="https://www.tiktok.com/@computer.q8?is_from_webapp=1&sender_device=pc" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Follow us on TikTok"
            >
              🎵
            </a>
          </div>
        </div>
      </div>
      <div style={{ fontSize: '0.85rem', opacity: 0.7, marginTop: '20px', textAlign: 'center' }}>
  <p><strong>Kuwait Computer Repair On Call</strong> | Hawalli, Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19</p>
  <span>Local Tech Guides: </span>
  <a 
    href="/laptop-repair-hawalli-kuwait" 
    style={{ color: 'inherit', textDecoration: 'underline' }}
  >
    Laptop Repair Hawalli Kuwait
  </a>
  <span> | </span>
  <a 
    href="/chip-level-motherboard-repair-hawalli" 
    style={{ color: 'inherit', textDecoration: 'underline' }}
  >
    Chip-Level Motherboard Repair
  </a>
</div>


    </footer>

    <FloatingActions />
    <Analytics />
    <SpeedInsights />
  </BrowserRouter>
  </HelmetProvider>
);

export default App;
