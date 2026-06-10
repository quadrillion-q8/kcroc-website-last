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

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Scroll effect
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

  const blogs = [{ name: 'Screen Protection', path: '/blog/how-to-protect-laptop-screen' }];

  return (
    <header className={`fixed top-0 w-full z-[1000] transition-all duration-300 ${scrolled ? 'bg-slate-950/95 backdrop-blur-md border-b border-slate-800 shadow-lg' : 'bg-slate-950/80 backdrop-blur-sm border-b border-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          <Link to="/" className="flex items-center z-[1005] relative">
            {!logoError ? (
              <img src="/kcroc-logo.png" alt="KCROC Logo" className="h-14 md:h-16 w-auto object-contain rounded-xl shadow-lg border border-slate-700/50 bg-slate-900/50" onError={() => setLogoError(true)} />
            ) : (
              <div className="flex flex-col ml-2">
                <span className="text-2xl font-black text-white">KCROC</span>
              </div>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 h-full">
            <Link to="/" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Home</Link>
            
            <div className="relative group h-full flex items-center">
              <button className="flex items-center gap-1 text-sm font-medium text-slate-300 group-hover:text-white h-full px-2">
                Services <ChevronDown size={14} />
              </button>
              <div className="absolute top-full left-0 w-64 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl py-2">
                  {services.map((s) => <Link key={s.path} to={s.path} className="block px-5 py-3 text-sm text-slate-300 hover:bg-slate-800 hover:text-cyan-400">{s.name}</Link>)}
                </div>
              </div>
            </div>

            <div className="relative group h-full flex items-center">
              <button className="flex items-center gap-1 text-sm font-medium text-slate-300 group-hover:text-white h-full px-2">
                Blogs <ChevronDown size={14} />
              </button>
              <div className="absolute top-full left-0 w-64 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl py-2">
                  {blogs.map((b) => <Link key={b.path} to={b.path} className="block px-5 py-3 text-sm text-slate-300 hover:bg-slate-800 hover:text-cyan-400">{b.name}</Link>)}
                </div>
              </div>
            </div>

            <Link to="/pricing" className="text-sm font-medium text-slate-300 hover:text-white">Pricing</Link>
            <Link to="/gallery" className="text-sm font-medium text-slate-300 hover:text-white">Gallery</Link>
            <Link to="/about" className="text-sm font-medium text-slate-300 hover:text-white">About</Link>
            <Link to="/contact" className="text-sm font-medium text-slate-300 hover:text-white">Contact</Link>
            <Link to="/book" className="text-sm font-bold text-emerald-400 hover:text-emerald-300">Booking</Link>
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:+96555301913" className="text-slate-300 hover:text-white text-sm font-bold flex items-center gap-2">
              <Phone size={16} /> 5530 1913
            </a>
            <Link to="/book" className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg flex items-center gap-2">
              <CalendarCheck size={16} /> Book Now
            </Link>
          </div>

          <button className="lg:hidden text-slate-300 p-2 z-[1005] relative" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer - Solid Background & High Z-Index */}
      <div className={`lg:hidden fixed inset-0 z-[99999] bg-slate-950 transition-all duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <div className="flex flex-col items-center justify-center h-full gap-8 p-6">
          <Link to="/" className="text-3xl font-black text-white" onClick={() => setIsOpen(false)}>Home</Link>
          <div className="text-center">
            <button onClick={() => setMobileServicesOpen(!mobileServicesOpen)} className="text-3xl font-black text-white flex items-center gap-2">Services <ChevronDown /></button>
            <div className={`flex flex-col gap-4 mt-4 transition-all ${mobileServicesOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                {services.map(s => <Link key={s.path} to={s.path} className="text-slate-400 text-lg" onClick={() => setIsOpen(false)}>{s.name}</Link>)}
            </div>
          </div>
          <Link to="/pricing" className="text-3xl font-black text-white" onClick={() => setIsOpen(false)}>Pricing</Link>
          <Link to="/gallery" className="text-3xl font-black text-white" onClick={() => setIsOpen(false)}>Gallery</Link>
          <Link to="/about" className="text-3xl font-black text-white" onClick={() => setIsOpen(false)}>About</Link>
          <Link to="/contact" className="text-3xl font-black text-white" onClick={() => setIsOpen(false)}>Contact</Link>
          <Link to="/book" className="text-3xl font-black text-emerald-400" onClick={() => setIsOpen(false)}>Booking</Link>
        </div>
      </div>
    </header>
  );
}
