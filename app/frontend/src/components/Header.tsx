import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Menu, ChevronDown, ChevronUp, Phone } from 'lucide-react';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);
  const location = useLocation();

  const serviceHubs = [
    { href: '/laptop-repair-hawalli-kuwait', label: 'Laptop Repair' },
    { href: '/macbook-repair', label: 'MacBook Repair' },
    { href: '/gaming-pc-repair-kuwait', label: 'Gaming PC Repair' },
    { href: '/gaming-pc-cooling', label: 'Gaming PC Cooling' },
    { href: '/screen-replacement', label: 'Screen Replacement' },
    { href: '/battery-replacement', label: 'Battery Replacement' },
    { href: '/chip-level-motherboard-repair-hawalli', label: 'Motherboard Repair' },
  ];

  const blogHubs = [
    { href: '/gaming-pc-cooling', label: 'Gaming PC Cooling Guide' },
    { href: '/battery-replacement', label: 'Battery Replacement Guide' },
    { href: '/blog/how-to-protect-laptop-screen', label: 'Screen Protection Guide' },
  ];

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services', subItems: serviceHubs },
    { label: 'Blogs', href: '#', subItems: blogHubs },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact', href: '/contact' },
    { label: 'Book Now', href: '/book' },
  ];

  useEffect(() => {
    setMobileOpen(false);
    setActiveMobileDropdown(null);
  }, [location.pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-emerald-900 shadow-lg h-16 flex items-center">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/"><img src="https://res.cloudinary.com/dsbwzags3/image/upload/v1769908596/logo_btpfls.png" alt="KCROC Logo" width="140" height="50" /></Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <div key={item.label} className="relative group">
              <Link to={item.href} className="text-white font-medium flex items-center gap-1 hover:text-emerald-400">
                {item.label} {item.subItems && <ChevronDown size={16} />}
              </Link>
              {item.subItems && (
                <div className="absolute top-full left-0 bg-emerald-800 p-4 w-52 shadow-xl rounded-b-lg hidden group-hover:flex flex-col gap-3 z-50">
                  {item.subItems.map(sub => (
                    <Link key={sub.href} to={sub.href} className="text-white hover:text-emerald-400 text-sm">{sub.label}</Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <a href="tel:+96555301913" className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-emerald-500 transition-colors flex items-center gap-2">
            <Phone size={18} /> Call Now
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-white"><Menu size={28} /></button>
      </div>

      {/* Mobile Menu Panel */}
      {mobileOpen && (
        <div className="absolute top-16 left-0 w-full bg-emerald-950 p-6 flex flex-col gap-4 lg:hidden border-t border-emerald-800 z-50 h-[calc(100vh-4rem)] overflow-y-auto">
          {navItems.map((item) => (
            <div key={item.label}>
              <div className="flex justify-between items-center py-2">
                <Link to={item.href} onClick={() => !item.subItems && setMobileOpen(false)} className="text-white text-lg font-medium">{item.label}</Link>
                {item.subItems && (
                  <button onClick={() => setActiveMobileDropdown(activeMobileDropdown === item.label ? null : item.label)} className="text-white p-2">
                    {activeMobileDropdown === item.label ? <ChevronUp /> : <ChevronDown />}
                  </button>
                )}
              </div>
              
              {/* Expandable Content */}
              {item.subItems && activeMobileDropdown === item.label && (
                <div className="flex flex-col gap-3 mt-2 ml-4 border-l-2 border-emerald-700 pl-4">
                  {item.subItems.map(sub => (
                    <Link key={sub.href} to={sub.href} onClick={() => setMobileOpen(false)} className="text-emerald-200 text-sm py-1 hover:text-white">{sub.label}</Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <a href="tel:+96555301913" className="flex items-center justify-center gap-2 bg-emerald-600 text-white p-3 rounded-lg font-bold mt-4">
            <Phone size={20} /> Call Now (+965 5530 1913)
          </a>
        </div>
      )}
    </header>
  );
}
