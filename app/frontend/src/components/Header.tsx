import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone, CalendarCheck } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileBlogsOpen, setMobileBlogsOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    { name: 'All Services', path: '/services' },
    { name: 'Laptop Repair', path: '/laptop-repair-hawalli-kuwait' },
    { name: 'MacBook Repair', path: '/macbook-repair' },
    { name: 'Gaming PC Repair', path: '/gaming-pc-repair-kuwait' },
    { name: 'Gaming PC Cooling', path: '/gaming-pc-cooling' },
    { name: 'Screen Replacement', path: '/screen-replacement' },
    { name: 'Battery Replacement', path: '/battery-replacement' },
    { name: 'Motherboard Repair', path: '/chip-level-motherboard-repair-hawalli' },
    { name: 'Data Security', path: '/data-security' },
  ];

  const blogs = [
    { name: 'Screen Protection', path: '/blog/how-to-protect-laptop-screen' }
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? '!bg-slate-950/90 backdrop-blur-md border-b border-slate-800 shadow-lg' 
          : '!bg-slate-950/70 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Area */}
          <Link to="/" className="flex items-center z-50">
            {!logoError ? (
              <img 
                /* 👇 CHANGE THIS PATH TO MATCH YOUR ACTUAL IMAGE NAME 👇 */
                src="/logo.png" 
                alt="KCROC Logo" 
                className="h-16 w-auto object-contain" 
                onError={() => setLogoError(true)}
              />
            ) : (
              /* This premium text fallback shows up instantly if the image path is wrong */
              <div className="flex flex-col group">
                <span className="text-2xl font-black text-white tracking-tight group-hover:text-cyan-400 transition-colors">
                  KCROC
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest">
                  Computer Repair
                </span>
              </div>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 h-full">
            <Link to="/" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Home</Link>
            
            <div className="relative group h-full flex items-center">
              <button className="flex items-center gap-1 text-sm font-medium text-slate-300 group-hover:text-white h-full px-2 transition-colors">
                Services <ChevronDown size={14} className="transition-transform duration-200 group-hover:rotate-180 group-hover:text-cyan-400" />
              </button>
              <div className="absolute top-full left-0 w-64 pt-4 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden py-2">
                  {services.map((s) => (
                    <Link key={s.path} to={s.path} className="block px-5 py-3 text-sm text-slate-300 hover:bg-slate-800 hover:text-cyan-400 transition-colors">
                      {s.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative group h-full flex items-center">
              <button className="flex items-center gap-1 text-sm font-medium text-slate-300 group-hover:text-white h-full px-2 transition-colors">
                Blogs <ChevronDown size={14} className="transition-transform duration-200 group-hover:rotate-180 group-hover:text-cyan-400" />
              </button>
              <div className="absolute top-full left-0 w-64 pt-4 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-200">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden py-2">
                  {blogs.map((b) => (
                    <Link key={b.path} to={b.path} className="block px-5 py-3 text-sm text-slate-300 hover:bg-slate-800 hover:text-cyan-400 transition-colors">
                      {b.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link to="/pricing" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Pricing</Link>
            <Link to="/about" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">About</Link>
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:+96555301913" className="text-slate-300 hover:text-white flex items-center gap-2 text-sm font-bold transition-colors">
              <Phone size={16} className="text-cyan-400" /> 5530 1913
            </a>
            <Link to="/book" className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg hover:shadow-emerald-500/25 flex items-center gap-2">
              <CalendarCheck size={16} /> Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden text-slate-300 hover:text-white p-2 z-50 relative" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div className={`lg:hidden fixed inset-0 top-0 pt-20 bg-slate-950/98 backdrop-blur-xl transition-all duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <nav className="flex flex-col p-6 gap-2 h-full overflow-y-auto pb-24">
          <Link to="/" className="text-xl font-bold text-white py-4 border-b border-slate-800">Home</Link>
          
          <div className="py-4 border-b border-slate-800">
            <button onClick={() => setMobileServicesOpen(!mobileServicesOpen)} className="w-full flex items-center justify-between text-xl font-bold text-white">
              Services <ChevronDown size={20} className={`transition-transform duration-300 ${mobileServicesOpen ? 'rotate-180 text-cyan-400' : 'text-slate-500'}`} />
            </button>
            <div className={`flex flex-col gap-3 pl-4 border-l-2 border-slate-800 mt-4 overflow-hidden transition-all duration-300 ${mobileServicesOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
              {services.map((s) => <Link key={s.path} to={s.path} className="text-slate-400 hover:text-cyan-400 py-2">{s.name}</Link>)}
            </div>
          </div>

          <div className="py-4 border-b border-slate-800">
            <button onClick={() => setMobileBlogsOpen(!mobileBlogsOpen)} className="w-full flex items-center justify-between text-xl font-bold text-white">
              Blogs <ChevronDown size={20} className={`transition-transform duration-300 ${mobileBlogsOpen ? 'rotate-180 text-cyan-400' : 'text-slate-500'}`} />
            </button>
            <div className={`flex flex-col gap-3 pl-4 border-l-2 border-slate-800 mt-4 overflow-hidden transition-all duration-300 ${mobileBlogsOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
              {blogs.map((b) => <Link key={b.path} to={b.path} className="text-slate-400 hover:text-cyan-400 py-2">{b.name}</Link>)}
            </div>
          </div>

          <Link to="/pricing" className="text-xl font-bold text-white py-4 border-b border-slate-800">Pricing</Link>
          <Link to="/about" className="text-xl font-bold text-white py-4 border-b border-slate-800">About</Link>
          
          <div className="mt-8 flex flex-col gap-4">
            <a href="tel:+96555301913" className="flex items-center justify-center gap-2 bg-slate-800 text-white py-4 rounded-xl font-bold">
              <Phone size={20} /> Call 5530 1913
            </a>
            <Link to="/book" className="flex items-center justify-center gap-2 bg-emerald-600 text-white py-4 rounded-xl font-bold">
              <CalendarCheck size={20} /> Book Free Pickup
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
