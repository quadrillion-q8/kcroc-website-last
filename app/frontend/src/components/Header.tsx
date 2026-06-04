import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Menu, ChevronDown, Phone } from 'lucide-react';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  const primaryNav = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services', isDropdown: true },
    { href: '/pricing', label: 'Pricing' },
    { href: '/about', label: 'About' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/contact', label: 'Contact' },
    { href: '/book', label: 'Book Now' },
  ];

  const serviceHubs = [
    { href: '/laptop-repair-hawalli-kuwait', label: 'Laptop Repair' },
    { href: '/macbook-repair', label: 'MacBook Repair' },
    { href: '/gaming-pc-repair-kuwait', label: 'Gaming PC Repair' },
    { href: '/gaming-pc-cooling', label: 'Gaming PC Cooling' },
    { href: '/screen-replacement', label: 'Screen Replacement' },
    { href: '/battery-replacement', label: 'Battery Replacement' },
  ];

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-emerald-900 shadow-lg h-16 flex items-center">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/"><img src="https://res.cloudinary.com/dsbwzags3/image/upload/v1769908596/logo_btpfls.png" alt="KCROC Logo" width="140" height="50" /></Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 relative">
          {primaryNav.map((item) => (
            <div key={item.href} className="relative" onMouseEnter={() => item.isDropdown && setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
              <Link to={item.href} className="text-white font-medium flex items-center gap-1 hover:text-cyan-300">
                {item.label} {item.isDropdown && <ChevronDown size={16} />}
              </Link>
              {item.isDropdown && dropdownOpen && (
                <div className="absolute top-full left-0 bg-emerald-800 p-4 w-52 shadow-xl rounded-b-lg flex flex-col gap-3 z-50">
                  {serviceHubs.map(hub => (
                    <Link key={hub.href} to={hub.href} className="text-white hover:text-cyan-300 text-sm block">{hub.label}</Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          {/* Direct Call-to-Action for Desktop */}
          <a href="tel:+96555301913" className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-emerald-500 transition-colors">
            <Phone size={18} /> Call Now
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-white"><Menu size={28} /></button>
      </div>

      {/* Mobile Menu Panel */}
      {mobileOpen && (
        <div className="absolute top-16 left-0 w-full bg-emerald-900 p-6 flex flex-col gap-4 lg:hidden border-t border-emerald-800 z-50">
          {primaryNav.map((item) => (
            <Link key={item.href} to={item.href} onClick={() => setMobileOpen(false)} className="text-white text-lg font-medium block">
              {item.label}
            </Link>
          ))}
          {/* Direct Call-to-Action for Mobile */}
          <a href="tel:+96555301913" className="flex items-center justify-center gap-2 bg-emerald-600 text-white p-3 rounded-lg font-bold">
            <Phone size={20} /> Call Now (+965 5530 1913)
          </a>
        </div>
      )}
    </header>
  );
}
