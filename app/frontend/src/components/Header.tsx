import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, X, Menu } from 'lucide-react';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const primaryNav = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/about', label: 'About' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/contact', label: 'Contact' },
  ];

  // Updated to match your file structure from 207304.jpg
  const serviceLinks = [
    { href: '/laptop-repair', label: 'Laptop Repair' },
    { href: '/macbook-repair', label: 'MacBook Repair' },
    { href: '/screen-replacement', label: 'Screen Replacement' },
    { href: '/battery-replacement', label: 'Battery Guide' },
    { href: '/gaming-pc-repair', label: 'Gaming PC Repair' },
    { href: '/gaming-pc-cooling', label: 'Gaming PC Cooling' },
    { href: '/web-design-kuwait', label: 'Web Design Kuwait' },
  ];

  const toggleMenu = () => setMobileOpen(!mobileOpen);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-emerald-900 shadow-lg h-16 flex items-center">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/">
          <img 
            src="https://res.cloudinary.com/dsbwzags3/image/upload/v1769908596/logo_btpfls.png" 
            alt="KCROC Logo" 
            width="140" 
            height="91" 
            style={{ width: '140px', height: '91px' }} 
          />
        </Link>

        <button onClick={toggleMenu} className="lg:hidden text-white p-2">
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu Panel */}
        {mobileOpen && (
          <div className="absolute top-16 left-0 w-full bg-emerald-900 p-6 flex flex-col gap-3 lg:hidden border-t border-emerald-800 z-50">
            {primaryNav.map((item) => (
              <Link key={item.href} to={item.href} onClick={toggleMenu} className="text-white font-medium">{item.label}</Link>
            ))}
            <hr className="border-emerald-800" />
            {serviceLinks.map((sub) => (
              <Link key={sub.href} to={sub.href} onClick={toggleMenu} className="text-emerald-200 text-sm">{sub.label}</Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
