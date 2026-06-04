import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, ChevronDown, X, Menu } from 'lucide-react';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const primaryNav = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/about', label: 'About' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/contact', label: 'Contact' },
    { href: '/data-security', label: 'Privacy & Security' },
    { href: '/book', label: 'Book Now' },
  ];

  const serviceLinks = [
    { href: '/laptop-repair-hawalli-kuwait', label: 'Laptop Repair' },
    { href: '/macbook-repair', label: 'MacBook Repair' },
    { href: '/screen-replacement', label: 'Screen Replacement' },
    { href: '/battery-replacement', label: 'Battery Guide' },
    { href: '/gaming-pc-cooling', label: 'Gaming PC Cooling' },
    { href: '/gaming-pc-repair-kuwait', label: 'Gaming PC Repair' },
    { href: '/web-design-kuwait', label: 'Web Design Kuwait' },
  ];

  const toggleMenu = () => setMobileOpen(!mobileOpen);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-emerald-900 shadow-lg h-16 flex items-center">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center shrink-0">
          <img
            src="https://res.cloudinary.com/dsbwzags3/image/upload/v1769908596/logo_btpfls.png"
            alt="KCROC - Computer Repair Kuwait"
            width="140"
            height="91"
            loading="eager"
            decoding="async"
            style={{ width: '140px', height: '91px' }}
            className="logo-image"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-5">
          {primaryNav.map((item) => (
            <Link key={item.href} to={item.href} className="text-sm font-medium text-white hover:text-cyan-200">
              {item.label}
            </Link>
          ))}
          <a href="tel:+96555301913" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg">
            <Phone className="w-4 h-4" /> Call Now
          </a>
        </nav>

        {/* Mobile Toggle Button */}
        <button onClick={toggleMenu} className="lg:hidden text-white p-2" aria-label="Toggle menu">
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu Panel */}
        {mobileOpen && (
          <div className="absolute top-16 left-0 w-full bg-emerald-900 p-6 flex flex-col gap-4 lg:hidden border-t border-emerald-800 z-50">
            {primaryNav.map((item) => (
              <Link key={item.href} to={item.href} onClick={toggleMenu} className="text-white text-lg font-medium hover:text-cyan-300">
                {item.label}
              </Link>
            ))}
            <a href="tel:+96555301913" className="mt-4 inline-flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg">
              <Phone className="w-5 h-5" /> Call 5530 1913
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
