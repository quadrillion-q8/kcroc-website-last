import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';
import Header from './Header';
import FloatingActions from './FloatingActions';

export default function Layout({ children }: { children: React.ReactNode }) {
  const currentYear = Math.max(new Date().getFullYear(), 2026);

  return (
    <div className="layout flex flex-col min-h-screen">
      {/* 1. Global Header Component */}
      <Header />

      {/* 2. Main Page Content */}
      <main className="main-content flex-grow" style={{ paddingTop: '4rem', paddingBottom: '5rem' }}>
        {children}
      </main>

      {/* 3. Global Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-column">
              <img
                src="https://res.cloudinary.com/dsbwzags3/image/upload/v1769908596/logo_btpfls.png"
                alt="KCROC - Kuwait Computer Repair On Call"
                width="140"
                height="50"
                style={{ width: '140px', height: 'auto' }}
                loading="lazy"
              />
              <p>Professional Computer Repair Services in Kuwait</p>
              <p className="footer-badge text-emerald-400 font-bold mt-2">
                🚨 Free Pick & Drop Included
              </p>
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
                <li><Link to="/gaming-pc-repair-kuwait">Gaming PC Repair</Link></li>
                <li><Link to="/book">Book Service</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Contact Us</h4>
              <ul>
                <li>📞 <a href="tel:+96555301913">+965 5530 1913</a></li>
                <li title="Business Email">✉️ <a href="mailto:quadrillion1980@gmail.com">quadrillion1980@gmail.com</a></li>
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
            <p>&copy; {currentYear} KCROC - Kuwait Computer Repair On Call. All rights reserved.</p>
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
                href="https://www.tiktok.com/@computer.q8" 
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

      {/* 4. Global Floating Actions */}
      <FloatingActions />
    </div>
  );
}
