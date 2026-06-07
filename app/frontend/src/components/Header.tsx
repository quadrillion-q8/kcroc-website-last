import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Menu, ChevronDown, ChevronUp, Phone } from 'lucide-react';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  const primaryNav = [
    { href: '/', label: 'Home' },
    // isDropdown triggers special button behavior instead of a standard link
    { href: '#', label: 'Services', isDropdown: true },
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
    { href: '/chip-level-motherboard-repair-hawalli', label: 'Motherboard Repair' },
  ];

  // Close mobile menus whenever the route changes
  useEffect(() => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-emerald-900 shadow-lg h-16 flex items-center">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/">
          <img 
            src="https://res.cloudinary.com/dsbwzags3/image/upload/v1769908596/logo_btpfls.png" 
            alt="KCROC Logo" 
            width="140" 
            height="50" 
            className="object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6 relative">
          {primaryNav.map((item) => (
            <div 
              key={item.label} 
              className="relative" 
              onMouseEnter={() => item.isDropdown && setDropdownOpen(true)} 
              onMouseLeave={() => setDropdownOpen(false)}
            >
              {item.isDropdown ? (
                // Button element ensures touch compatibility on iPads/tablets
                <button 
                  className="text-white font-medium flex items-center gap-1 hover:text-emerald-400 transition-colors py-2"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  aria-haspopup="true"
                  aria-expanded={dropdownOpen}
                >
                  {item.label} <ChevronDown size={16} />
                </button>
              ) : (
                <Link 
                  to={item.href} 
                  className="text-white font-medium flex items-center gap-1 hover:text-emerald-400 transition-colors py-2"
                >
                  {item.label}
                </Link>
              )}
              
              {/* Desktop Dropdown Menu */}
              {item.isDropdown && dropdownOpen && (
                <div className="absolute top-full left-0 bg-emerald-800 p-4 w-52 shadow-xl rounded-b-lg flex flex-col gap-3 z-50">
                  {serviceHubs.map(hub => (
                    <Link 
                      key={hub.href} 
                      to={hub.href} 
                      className="text-white hover:text-emerald-400 text-sm block transition-colors"
                    >
                      {hub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <a 
            href="tel:+96555301913" 
            className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-emerald-500 transition-colors shadow-md"
          >
            <Phone size={18} /> Call Now
          </a>
        </nav>

        {/* Mobile Toggle Button */}
        <button 
          onClick={() => setMobileOpen(!mobileOpen)} 
          className="lg:hidden text-white p-2"
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {mobileOpen && (
        <div className="absolute top-16 left-0 w-full bg-emerald-900 p-6 flex flex-col gap-2 lg:hidden border-t border-emerald-800 z-50 shadow-xl max-h-[calc(100vh-4rem)] overflow-y-auto">
          {primaryNav.map((item) => (
            <div key={item.label} className="border-b border-emerald-800/50 pb-2 mb-2">
              <div className="flex justify-between items-center">
                {item.isDropdown ? (
                  // Clicking anywhere on this row triggers the mobile dropdown
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      setMobileServicesOpen(!mobileServicesOpen);
                    }} 
                    className="text-white text-lg font-medium w-full text-left flex justify-between items-center py-2"
                  >
                    {item.label}
                    <span className="p-2 text-emerald-400">
                      {mobileServicesOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </span>
                  </button>
                ) : (
                  <Link 
                    to={item.href} 
                    onClick={() => setMobileOpen(false)} 
                    className="text-white text-lg font-medium w-full block py-2"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
              
              {/* Mobile Dropdown Links */}
              {item.isDropdown && mobileServicesOpen && (
                <div className="flex flex-col gap-3 mt-2 ml-4 border-l-2 border-emerald-700 pl-4 mb-2">
                  {serviceHubs.map(hub => (
                    <Link 
                      key={hub.href} 
                      to={hub.href} 
                      onClick={() => setMobileOpen(false)} 
                      className="text-emerald-100 hover:text-emerald-400 text-sm block py-2"
                    >
                      {hub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          {/* Mobile Call to Action */}
          <a 
            href="tel:+96555301913" 
            className="flex items-center justify-center gap-2 bg-emerald-600 text-white p-4 rounded-lg font-bold mt-4 mb-8 shadow-md"
          >
            <Phone size={20} /> Call Now (+965 5530 1913)
          </a>
        </div>
      )}
    </header>
  );
}
