import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, ChevronDown } from 'lucide-react';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
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

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-emerald-900 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 shrink-0">
            <img src="https://res.cloudinary.com/dsbwzags3/image/upload/v1769908596/logo_btpfls.png" alt="KCROC" width="140" height="auto" style={{ width: '140px' }} decoding="async" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-5">
            {primaryNav.map((item) =>
              item.label === 'Services' ? (
                <div key={item.href} className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
                  <button className="text-white text-sm font-medium">Services</button>
                  {servicesOpen && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-emerald-800 border rounded-lg shadow-xl z-50">
                      {serviceLinks.map((sub) => <Link key={sub.href} to={sub.href} className="block px-4 py-3 text-sm text-white hover:bg-emerald-900">{sub.label}</Link>)}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={item.href} to={item.href} className="text-sm font-medium text-white">{item.label}</Link>
              )
            )}
          </nav>

          {/* Mobile Toggle Button */}
          <button type="button" onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-white">
            Menu
          </button>
        </div>
      </div>

      {/* FIXED MOBILE MENU */}
      {mobileOpen && (
        <div className="lg:hidden bg-emerald-950 border-t border-white/10 p-4">
          <nav className="flex flex-col space-y-4">
            {primaryNav.map((item) => (
              item.label === 'Services' ? (
                <div key={item.href}>
                  <button onClick={() => setMobileServicesOpen(!mobileServicesOpen)} className="text-white w-full text-left">Services ▾</button>
                  {mobileServicesOpen && serviceLinks.map((sub) => (
                    <Link key={sub.href} to={sub.href} onClick={() => setMobileOpen(false)} className="block pl-4 py-2 text-white">{sub.label}</Link>
                  ))}
                </div>
              ) : (
                <Link key={item.href} to={item.href} onClick={() => setMobileOpen(false)} className="text-white">{item.label}</Link>
              )
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
