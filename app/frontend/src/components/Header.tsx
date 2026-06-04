import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Menu } from 'lucide-react';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Ensure ALL your pages are represented here
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/about', label: 'About' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/contact', label: 'Contact' },
    { href: '/book', label: 'Book Now' },
  ];

  const toggleMenu = () => setMobileOpen(!mobileOpen);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-emerald-900 shadow-lg h-16 flex items-center">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img 
            src="https://res.cloudinary.com/dsbwzags3/image/upload/v1769908596/logo_btpfls.png" 
            alt="KCROC Logo" 
            width="140" 
            height="50" 
            style={{ width: '140px', height: 'auto' }} 
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((item) => (
            <Link key={item.href} to={item.href} className="text-white font-medium hover:text-cyan-300 transition-colors">
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button onClick={toggleMenu} className="lg:hidden text-white p-2">
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="absolute top-16 left-0 w-full bg-emerald-900 p-6 flex flex-col gap-4 lg:hidden border-t border-emerald-800 z-50">
            {navLinks.map((item) => (
              <Link key={item.href} to={item.href} onClick={toggleMenu} className="text-white text-lg font-medium">
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
