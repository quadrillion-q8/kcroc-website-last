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
    { href: '/web-design-kuwait', label: 'Web Design' },
  ];

  // Close mobile menus whenever the route changes
  useEffect(() => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-950/95 backdrop-blur-md border-b border-gray-800 shadow-lg h-20 flex items-center">
      <div className="container mx-auto px-4 flex justify-between items-center w-full">
        {/* Logo Section */}
        <Link to="/" className="shrink-0">
          <img 
            src="https://res.cloudinary.com/dsbwzags3/image/upload/v1769908596/logo_btpfls.png" 
            alt="KCROC Logo" 
            width="140" 
            height="50" 
            className="object-contain h-12 w-auto"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center justify-between flex-1 ml-12">
          {/* Main Links Container */}
          <div className="flex items-center gap-8">
            {primaryNav.map((item) => {
              const isActive = location.pathname === item.href || (item.isDropdown && location.pathname.includes(item.label.toLowerCase()));
              
              return (
                <div 
                  key={item.label} 
                  className="relative group py-6" 
                  onMouseEnter={() => item.isDropdown && setDropdownOpen(true)} 
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  {item.isDropdown ? (
                    // Button element ensures touch compatibility on iPads/tablets
                    <button 
                      className={`font-semibold flex items-center gap-1 transition-colors ${isActive ? 'text-emerald-400' : 'text-gray-300 hover:text-emerald-400'}`}
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      aria-haspopup="true"
                      aria-expanded={dropdownOpen}
                    >
                      {item.label} <ChevronDown size={16} className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                  ) : (
                    <Link 
                      to={item.href} 
                      className={`font-semibold transition-colors ${isActive ? 'text-emerald-400' : 'text-gray-300 hover:text-emerald-400'}`}
                    >
                      {item.label}
                    </Link>
                  )}
                  
                  {/* Desktop Dropdown Menu */}
                  {item.isDropdown && (
                    <div className={`absolute top-[70px] left-0 bg-gray-900 border border-gray-800 p-3 w-64 shadow-2xl rounded-xl flex flex-col gap-1 z-50 transition-all duration-200 origin-top ${dropdownOpen ? 'opacity-100 scale-y-100 visible' : 'opacity-0 scale-y-95 invisible'}`}>
                      {serviceHubs.map(hub => (
                        <Link 
                          key={hub.href} 
                          to={hub.href} 
                          className="text-gray-300 hover:text-emerald-400 hover:bg-gray-800/50 px-4 py-3 rounded-lg text-sm font-medium transition-colors"
                        >
                          {hub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* CTA Button */}
          <a 
            href="tel:+96555301913" 
            className="flex items-center gap-2 bg-emerald-500 text-gray-950 px-6 py-2.5 rounded-lg font-bold hover:bg-emerald-400 transition-colors shadow-lg hover:shadow-emerald-500/20 shrink-0"
          >
            <Phone size={18} /> Call Now
          </a>
        </nav>

        {/* Mobile Toggle Button */}
        <button 
          onClick={() => setMobileOpen(!mobileOpen)} 
          className="xl:hidden text-gray-300 hover:text-emerald-400 p-2 transition-colors"
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {mobileOpen && (
        <div className="absolute top-20 left-0 w-full bg-gray-950 p-6 flex flex-col gap-2 xl:hidden border-t border-gray-800 z-50 shadow-2xl max-h-[calc(100vh-5rem)] overflow-y-auto">
          {primaryNav.map((item) => (
            <div key={item.label} className="border-b border-gray-800 pb-2 mb-2">
              <div className="flex justify-between items-center">
                {item.isDropdown ? (
                  // Clicking anywhere on this row triggers the mobile dropdown
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      setMobileServicesOpen(!mobileServicesOpen);
                    }} 
                    className="text-gray-200 text-lg font-semibold w-full text-left flex justify-between items-center py-2"
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
                    className="text-gray-200 hover:text-emerald-400 text-lg font-semibold w-full block py-2 transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
              
              {/* Mobile Dropdown Links */}
              {item.isDropdown && mobileServicesOpen && (
                <div className="flex flex-col gap-3 mt-2 ml-4 border-l-2 border-emerald-500/30 pl-4 mb-2">
                  {serviceHubs.map(hub => (
                    <Link 
                      key={hub.href} 
                      to={hub.href} 
                      onClick={() => setMobileOpen(false)} 
                      className="text-gray-400 hover:text-emerald-400 text-base font-medium block py-2 transition-colors"
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
            className="flex items-center justify-center gap-2 bg-emerald-500 text-gray-950 p-4 rounded-xl font-bold mt-6 mb-8 shadow-lg"
          >
            <Phone size={20} /> Call Now (+965 5530 1913)
          </a>
        </div>
      )}
    </header>
  );
}
