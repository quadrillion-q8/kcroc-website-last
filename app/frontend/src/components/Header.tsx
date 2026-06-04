import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Menu, ChevronDown } from 'lucide-react';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  const primaryNav = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services', isDropdown: true },
    { href: '/pricing', label: 'Pricing' },
    { href: '/about', label: 'About' },
    { href: '/book', label: 'Book Now' },
  ];

  const serviceHubs = [
    { href: '/laptop-repair-hawalli-kuwait', label: 'Laptop Repair' },
    { href: '/macbook-repair', label: 'MacBook Repair' },
    { href: '/gaming-pc-repair-kuwait', label: 'Gaming PC Repair' },
    { href: '/screen-replacement', label: 'Screen Replacement' },
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
              {/* Dropdown Hubs */}
              {item.isDropdown && dropdownOpen && (
                <div className="absolute top-full left-0 bg-emerald-800 p-4 w-48 shadow-xl rounded-b-lg flex flex-col gap-2">
                  {serviceHubs.map(hub => (
                    <Link key={hub.href} to={hub.href} className="text-white hover:text-cyan-300 text-sm">{hub.label}</Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-white"><Menu size={28} /></button>
      </div>
    </header>
  );
}
