import { Link, useLocation } from 'react-router-dom';
import { Phone, Mail, MapPin, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showFloatingWhatsApp, setShowFloatingWhatsApp] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  // Hamburger Menu Toggle JavaScript
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close mobile menu when clicking outside or on link
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Auto-updating Copyright Year
  const getCurrentYear = () => {
    const currentYear = new Date().getFullYear();
    return Math.max(currentYear, 2026);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setShowFloatingWhatsApp(scrollPercentage > 30);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && mobileMenuOpen) {
        closeMobileMenu();
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [mobileMenuOpen]);

  return (
    <div className="layout">
      <header className="header">
        <div className="container header-content">
          {/* Improved and Enlarged Logo */}
          <Link to="/" className="logo">
            <img 
              src="https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto:good,w_200,c_limit/KCROC_official_logo_and_branding_-_favicon" 
              alt="KCROC - Kuwait Computer Repair On Call" 
              width="120" 
              height="78"
              loading="eager"
              decoding="async"
              style={{width: '120px', height: '78px'}}
              className="logo-image"
              onError={(e) => {
                e.currentTarget.src = `https://ui-avatars.com/api/?name=KCROC&background=00D9FF&color=0A0A0A&size=120x78&format=png&bold=true`;
              }}
            />
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>Home</Link>
            <Link to="/services" className={`nav-link ${isActive('/services') ? 'active' : ''}`}>Services</Link>
            <Link to="/pricing" className={`nav-link ${isActive('/pricing') ? 'active' : ''}`}>Pricing</Link>
            <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}>About</Link>
            <Link to="/gallery" className={`nav-link ${isActive('/gallery') ? 'active' : ''}`}>Gallery</Link>
            <Link to="/contact" className={`nav-link ${isActive('/contact') ? 'active' : ''}`}>Contact</Link>
            <a href="tel:+96555301913" className="cta-button">
              <Phone size={16} /> Call Now
            </a>
          </nav>

          {/* Enhanced Hamburger Menu Toggle */}
          <button 
            className="mobile-menu-toggle"
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            <div className={`hamburger-icon ${mobileMenuOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>

        {/* Fixed Mobile Menu Dropdown Panel */}
        {mobileMenuOpen && (
          <div className="mobile-menu-dropdown">
            <div className="container py-6">
              {/* Close Button */}
              <div className="flex justify-end mb-4">
                <button
                  onClick={closeMobileMenu}
                  className="p-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-colors"
                  aria-label="Close menu"
                >
                  <X size={20} className="text-white" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-2">
                <Link 
                  to="/" 
                  className={`mobile-nav-item ${isActive('/') ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  Home
                </Link>
                
                <Link 
                  to="/services" 
                  className={`mobile-nav-item ${isActive('/services') ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  Services
                </Link>
                
                <Link 
                  to="/pricing" 
                  className={`mobile-nav-item ${isActive('/pricing') ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  Pricing
                </Link>
                
                <Link 
                  to="/about" 
                  className={`mobile-nav-item ${isActive('/about') ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  About
                </Link>
                
                <Link 
                  to="/gallery" 
                  className={`mobile-nav-item ${isActive('/gallery') ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  Gallery
                </Link>
                
                <Link 
                  to="/contact" 
                  className={`mobile-nav-item ${isActive('/contact') ? 'active' : ''}`}
                  onClick={closeMobileMenu}
                >
                  Contact
                </Link>

                {/* Call to Action Buttons */}
                <div className="pt-4 mt-4 border-t border-slate-700/50 space-y-3">
                  <a 
                    href="tel:+96555301913" 
                    className="mobile-cta-primary"
                    onClick={closeMobileMenu}
                  >
                    <Phone size={20} />
                    Call Now: +965 5530 1913
                  </a>

                  <a 
                    href="https://wa.me/96555301913" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mobile-cta-secondary"
                    onClick={closeMobileMenu}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    WhatsApp Us
                  </a>
                </div>
              </nav>
            </div>
          </div>
        )}

        {/* Mobile Menu Backdrop */}
        {mobileMenuOpen && (
          <div 
            className="mobile-menu-backdrop"
            onClick={closeMobileMenu}
          />
        )}
      </header>

      <main className="main-content">{children}</main>

      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-column">
              <h3>KCROC</h3>
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
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Contact Us</h4>
              <ul>
                <li><Phone size={16} /> <a href="tel:+96555301913">+965 5530 1913</a></li>
                <li><Mail size={16} /> <a href="mailto:quadrillion1980@gmail.com">quadrillion1980@gmail.com</a></li>
                <li><MapPin size={16} /> Al Mullah Complex, Ibn Khaldoun St, Hawalli, Kuwait</li>
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
            <p>&copy; {getCurrentYear()} KCROC - Kuwait Computer Repair On Call. All rights reserved.</p>
            <div className="footer-social">
              <a 
                href="https://www.facebook.com/profile.php?id=61572103117031" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Follow us on Facebook"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="https://www.instagram.com/quadrillion.q8/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Follow us on Instagram"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href="https://www.tiktok.com/@computer.q8?is_from_webapp=1&sender_device=pc" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Follow us on TikTok"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/96555301913" 
        className={`floating-whatsapp-mobile ${showFloatingWhatsApp ? 'visible' : ''}`}
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Contact us on WhatsApp"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>

      {/* Desktop Floating Actions */}
      <div className="floating-actions">
        <a 
          href="https://wa.me/96555301913" 
          className="floating-btn floating-whatsapp" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Contact us on WhatsApp"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        </a>
        <a 
          href="tel:+96555301913" 
          className="floating-btn floating-call"
          aria-label="Call us now"
        >
          <Phone size={24} />
        </a>
      </div>
    </div>
  );
}