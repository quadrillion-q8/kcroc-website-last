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

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
    setActiveMobileDropdown(null);
  }, [location.pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-800 h-20 flex items-center transition-all duration-300">
      <div className="container mx-auto px-6 flex justify-between items-center w-full">
        {/* Logo */}
        <Link to="/" className="shrink-0 transition-opacity hover:opacity-90">
          <img 
            src="https://res.cloudinary.com/dsbwzags3/image/upload/v1769908596/logo_btpfls.png" 
            alt="KCROC Logo" 
            width="120" 
            height="40" 
            className="object-contain h-10 w-auto"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-1">
          {primaryNav.map((item) => {
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
                  <button 
                    className={`px-4 py-2 text-sm font-medium transition-all flex items-center gap-1 ${isActive ? 'text-emerald-400' : 'text-gray-300 hover:text-white'}`}
                    onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                  >
                    {item.label} <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <Link 
                    to={item.href} 
                    className={`px-4 py-2 text-sm font-medium transition-all ${isActive ? 'text-emerald-400' : 'text-gray-300 hover:text-white'}`}
                  >
                    {item.label}
                  </Link>
                )}
                
                {/* Dropdown Box */}
                {item.isDropdown && (
                  <div className={`absolute top-[75px] left-0 bg-gray-900 border border-gray-800 p-2 w-64 shadow-2xl rounded-2xl flex flex-col z-50 transition-all duration-300 origin-top ${activeDropdown === item.label ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
                    {item.dropdownItems?.map(subItem => (
                      <Link 
                        key={subItem.href} 
                        to={subItem.href} 
                        className="text-gray-400 hover:text-white hover:bg-gray-800 px-4 py-3 rounded-xl text-sm font-medium transition-colors flex items-center gap-2"
                      >
                        {item.label === 'Blogs' && <BookOpen size={14} />}
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          
          {/* CTA */}
          <a 
            href="tel:+96555301913" 
            className="ml-4 flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-full font-bold transition-all shadow-lg hover:shadow-emerald-900/50"
          >
            <Phone size={16} /> Call Now
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="xl:hidden text-gray-300 p-2">
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Panel */}
      {mobileOpen && (
        <div className="absolute top-20 left-0 w-full bg-gray-950/95 backdrop-blur-lg border-b border-gray-800 p-6 flex flex-col gap-4 xl:hidden shadow-2xl">
          {primaryNav.map((item) => (
            <div key={item.label} className="border-b border-gray-900 pb-2">
              {item.isDropdown ? (
                <button onClick={() => setActiveMobileDropdown(activeMobileDropdown === item.label ? null : item.label)} className="text-gray-200 text-lg w-full flex justify-between items-center py-2">
                  {item.label}
                  {activeMobileDropdown === item.label ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              ) : (
                <Link to={item.href} onClick={() => setMobileOpen(false)} className="text-gray-200 text-lg block py-2">{item.label}</Link>
              )}
              {item.isDropdown && activeMobileDropdown === item.label && (
                <div className="flex flex-col gap-2 mt-2 ml-4 border-l border-gray-800 pl-4">
                  {item.dropdownItems?.map(subItem => (
                    <Link key={subItem.href} to={subItem.href} onClick={() => setMobileOpen(false)} className="text-gray-400 py-1.5 text-sm">{subItem.label}</Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
