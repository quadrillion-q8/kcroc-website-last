import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
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
import GamingPC from './pages/GamingPC';
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
          <Route path="/gaming-pc-repair-kuwait" element={<GamingPC />} />
          <Route path="/web-design-kuwait" element={<WebDesignKuwait />} />
          <Route path="/book" element={<BookingPage />} />
          <Route path="/laptop-repair-hawalli-kuwait" element={<LaptopRepair />} />
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
                <li>✉️ <a href="mailto:quadrillion1980@gmail.com">quadrillion1980@gmail.com</a></li>
                <li>📍 Al Mullah Complex, Ibn Khaldoun St, Hawalli, Kuwait</li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Business Hours</h4>
              <ul>
                <li>Saturday - Thursday: 10AM - 10PM</li>
                <li>Friday: 6PM - 10PM</li>
              </ul>
            </div>
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
