import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone } from 'lucide-react';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  /* All nav items in a single flat list */
  const allNav = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/about', label: 'About' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/contact', label: 'Contact' },
    { href: '/book', label: 'Book Now' },
    { href: '/laptop-repair', label: 'Laptop Repair' },
    { href: '/macbook-repair', label: 'MacBook Repair' },
    { href: '/screen-replacement', label: 'Screen Replacement' },
    { href: '/battery-replacement', label: 'Battery Guide' },
    { href: '/gaming-pc-cooling', label: 'Gaming PC Cooling' },
    { href: '/web-design-kuwait', label: 'Web Design Kuwait' },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [mobileOpen]);

  // Escape key closes menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-emerald-900 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 shrink-0">
            <img
              src="https://res.cloudinary.com/dsbwzags3/image/upload/v1769908596/logo_btpfls.png"
              alt="KCROC - Computer Repair Kuwait"
              width="140"
              height="auto"
              loading="eager"
              decoding="async"
              style={{ width: '140px', height: 'auto' }}
              className="logo-image"
            />
          </Link>

          {/* Desktop Navigation - Two-line flex-wrap layout */}
          <nav className="hidden lg:flex flex-wrap items-center justify-end gap-x-5 gap-y-3 max-w-[75%]">
            {allNav.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-sm font-medium transition-colors whitespace-nowrap ${
                  isActive(item.href)
                    ? 'text-cyan-300'
                    : 'text-white hover:text-cyan-200'
                }`}
              >
                {item.label}
              </Link>
            ))}

            <a
              href="tel:+96555301913"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors whitespace-nowrap"
            >
              <Phone className="w-4 h-4" />
              Call Now
            </a>
          </nav>

          {/* Mobile / Tablet Hamburger Button (below lg) */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-3 py-2 text-white shadow-sm transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-emerald-900"
            aria-label="Toggle navigation menu"
          >
            <div className="flex flex-col justify-center items-center w-6 h-5 space-y-1.5">
              <div className={`w-6 h-0.5 bg-white transition-transform duration-200 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <div className={`w-6 h-0.5 bg-white transition-opacity duration-200 ${mobileOpen ? 'opacity-0' : ''}`} />
              <div className={`w-6 h-0.5 bg-white transition-transform duration-200 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden mt-1 rounded-2xl border border-white/20 bg-emerald-950/95 shadow-2xl backdrop-blur-md mb-4">
            <nav className="flex flex-col divide-y divide-white/10">
              {allNav.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 text-left text-sm transition-colors ${
                    isActive(item.href)
                      ? 'text-cyan-300 bg-emerald-900/70'
                      : 'text-white hover:bg-emerald-900/70'
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              {/* Call to Action Buttons */}
              <div className="px-4 py-4 space-y-3">
                <a
                  href="tel:+96555301913"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold text-sm rounded-lg shadow-lg hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300"
                  onClick={() => setMobileOpen(false)}
                >
                  <Phone size={16} />
                  Call Now: +965 5530 1913
                </a>

                <a
                  href="https://wa.me/96555301913"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold text-sm rounded-lg shadow-lg hover:from-green-600 hover:to-green-700 transition-all duration-300"
                  onClick={() => setMobileOpen(false)}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  WhatsApp Us
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}