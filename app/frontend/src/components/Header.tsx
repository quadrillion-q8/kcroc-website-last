import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Menu, ChevronDown, ChevronUp, Phone, BookOpen } from 'lucide-react';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);
  const location = useLocation();

  const repairServices = [
    { href: '/laptop-repair-hawalli-kuwait', label: 'Laptop Repair' },
    { href: '/macbook-repair', label: 'MacBook Repair' },
    { href: '/gaming-pc-repair-kuwait', label: 'Gaming PC Repair' },
    { href: '/screen-replacement', label: 'Screen Replacement' },
    { href: '/chip-level-motherboard-repair-hawalli', label: 'Motherboard Repair' },
    { href: '/web-design-kuwait', label: 'Web Design' },
  ];

  const techGuides = [
    { href: '/gaming-pc-cooling', label: 'Gaming PC Cooling Guide' },
    { href: '/battery-replacement', label: 'Battery Replacement Guide' },
  ];

  // Upgraded primaryNav structure: "Tech Guides" renamed to "Blogs"
  const primaryNav = [
    { href: '/', label: 'Home' },
    { href: '#', label: 'Services', isDropdown: true, dropdownItems: repairServices },
    { href: '#', label: 'Blogs', isDropdown: true, dropdownItems: techGuides },
    { href: '/pricing', label: 'Pricing' },
    { href: '/about', label: 'About' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/contact', label: 'Contact' },
    { href: '/book', label: 'Book Now' },
  ];

  // Close all menus whenever the route changes
  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
    setActiveMobileDropdown(null);
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
        <nav className="hidden xl:flex items-center justify-between flex-1 ml-8">
          {/* Main Links Container */}
          <div className="flex items-center gap-5">
            {primaryNav.map((item) => {
              // Active state logic to highlight the current page or its parent dropdown
              const isActive = location.pathname === item.href || 
                (item.isDropdown && item.dropdownItems?.some(sub => location.pathname.includes(sub.href)));
              
              return (
                <div 
                  key={item.label} 
                  className="relative group py-6" 
                  onMouseEnter={() => item.isDropdown && setActiveDropdown(item.label)} 
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {item.isDropdown ? (
                    // Button element ensures touch compatibility on iPads/tablets
                    <button 
                      className={`font-semibold flex items-center gap-1 transition-colors ${isActive ? 'text-emerald-400' : 'text-gray-300 hover:text-emerald-400'}`}
                      onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                      aria-haspopup="true"
                      aria-expanded={activeDropdown === item.label}
                    >
                      {item.label} <ChevronDown size={14} className={`transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
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
                    <div className={`absolute top-[70px] left-0 bg-gray-900 border border-gray-800 p-3 w-64 shadow-2xl rounded-xl flex flex-col gap-1 z-50 transition-all duration-200 origin-top ${activeDropdown === item.label ? 'opacity-100 scale-y-100 visible' : 'opacity-0 scale-y-95 invisible'}`}>
                      {item.dropdownItems?.map(subItem => (
                        <Link 
                          key={subItem.href} 
                          to={subItem.href} 
                          className="text-gray-300 hover:text-emerald-400 hover:bg-gray-800/50 px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                        >
                          {/* Render book icon only in the Blogs dropdown */}
                          {item.label === 'Blogs' && <BookOpen size={14} className="shrink-0" />}
                          {subItem.label}
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
            className="flex items-center gap-2 bg-emerald-500 text-gray-950 px-5 py-2.5 rounded-lg font-bold hover:bg-emerald-400 transition-colors shadow-lg hover:shadow-emerald-500/20 shrink-0"
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
                  // Clicking anywhere on this row triggers the mobile dropdown accordion
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveMobileDropdown(activeMobileDropdown === item.label ? null : item.label);
                    }} 
                    className="text-gray-200 text-lg font-semibold w-full text-left flex justify-between items-center py-2"
                  >
                    {item.label}
                    <span className="p-2 text-emerald-400">
                      {activeMobileDropdown === item.label ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
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
              {item.isDropdown && activeMobileDropdown === item.label && (
                <div className="flex flex-col gap-2 mt-2 ml-4 border-l-2 border-emerald-500/30 pl-4 mb-2">
                  {item.dropdownItems?.map(subItem => (
                    <Link 
                      key={subItem.href} 
                      to={subItem.href} 
                      onClick={() => setMobileOpen(false)} 
                      className="flex items-center gap-2 text-gray-400 hover:text-emerald-400 text-base font-medium block py-1.5 transition-colors"
                    >
                      {item.label === 'Blogs' && <BookOpen size={14} className="shrink-0" />}
                      {subItem.label}
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
