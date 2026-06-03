import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, ChevronDown } from 'lucide-react';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  /* Primary nav items */
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

  /* Service sub-links */
  const serviceLinks = [
    { href: '/laptop-repair-hawalli-kuwait', label: 'Laptop Repair' },
    { href: '/macbook-repair', label: 'MacBook Repair' },
    { href: '/screen-replacement', label: 'Screen Replacement' },
    { href: '/battery-replacement', label: 'Battery Guide' },
    { href: '/gaming-pc-cooling', label: 'Gaming PC Cooling' },
    { href: '/gaming-pc-repair-kuwait', label: 'Gaming PC Repair' },
    { href: '/web-design-kuwait', label: 'Web Design Kuwait' },
  ];

  const isActive = (path: string) => location.pathname === path;
  const isServiceActive = serviceLinks.some((item) => location.pathname === item.href);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    if (servicesOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [servicesOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [mobileOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-emerald-900 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 shrink-0">
            <img
              src="https://res.cloudinary.com/dsbwzags3/image/upload/v1769908596/logo_btpfls.png"
              alt="KCROC - Computer Repair Kuwait"
              width="140"
              height="auto"
              style={{ width: '140px', height: 'auto' }}
              className="logo-image"
            />
          </Link>

          <nav className="hidden lg:flex items-center space-x-5">
            {primaryNav.map((item) =>
              item.label === 'Services' ? (
                <div
                  key={item.href}
                  ref={servicesRef}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <button
                    type="button"
                    onClick={() => setServicesOpen(!servicesOpen)}
                    className={`flex items-center gap-1 text-sm font-medium transition-colors whitespace-nowrap ${
                      isActive(item.href) || isServiceActive ? 'text-cyan-300' : 'text-white hover:text-cyan-200'
                    }`}
                  >
                    Services
                    <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {servicesOpen && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-emerald-800 border border-emerald-700 rounded-lg shadow-xl overflow-hidden z-50">
                      <Link to="/services" className="block px-4 py-3 text-sm font-semibold border-b border-emerald-700 text-white hover:bg-emerald-900/50">
                        All Services
                      </Link>
                      {serviceLinks.map((sub) => (
                        <Link key={sub.href} to={sub.href} className="block px-4 py-3 text-sm text-white hover:bg-emerald-900/50">
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={item.href} to={item.href} className={`text-sm font-medium transition-colors ${isActive(item.href) ? 'text-cyan-300' : 'text-white hover:text-cyan-200'}`}>
                  {item.label}
                </Link>
              )
            )}
            <a href="tel:+96555301913" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg">
              <Phone className="w-4 h-4" /> Call Now
            </a>
          </nav>

          <button type="button" onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-white" aria-label="Toggle menu">
            <div className="w-6 h-5 flex flex-col justify-between">
              <div className={`w-6 h-0.5 bg-white transition-transform ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <div className={`w-6 h-0.5 bg-white ${mobileOpen ? 'opacity-0' : ''}`} />
              <div className={`w-6 h-0.5 bg-white transition-transform ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>

        {mobileOpen && (
          <div className="lg:hidden bg-emerald-950/95 border-t border-white/10 overflow-y-auto max-h-[80vh]">
            <nav className="flex flex-col">
              {primaryNav.map((item) =>
                item.label === 'Services' ? (
                  <div key={item.href}>
                    <button type="button" onClick={() => setMobileServicesOpen(!mobileServicesOpen)} className="w-full flex justify-between px-4 py-4 text-sm text-white">
                      Services <ChevronDown className={`w-4 h-4 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {mobileServicesOpen && (
                      <div className="bg-emerald-900/50">
                        {serviceLinks.map((sub) => (
                          <Link key={sub.href} to={sub.href} onClick={() => setMobileOpen(false)} className="block pl-8 py-3 text-sm text-white">
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link key={item.href} to={item.href} onClick={() => setMobileOpen(false)} className="px-4 py-4 text-sm text-white">
                    {item.label}
                  </Link>
                )
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
