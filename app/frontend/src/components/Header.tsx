import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileBlogsOpen, setMobileBlogsOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
    setMobileServicesOpen(false);
    setMobileBlogsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    { name: 'All Services', path: '/services' },
    { name: 'Laptop Repair', path: '/laptop-repair-hawalli-kuwait' },
    { name: 'MacBook Repair', path: '/macbook-repair-kuwait' },
    { name: 'Gaming PC Repair', path: '/gaming-pc-repair-kuwait' },
    { name: 'Screen Replacement', path: '/screen-replacement-kuwait' },
    { name: 'Motherboard Repair', path: '/chip-level-motherboard-repair-hawalli' },
    { name: 'Data Security', path: '/data-recovery-kuwait' },
  ];

  const blogs = [
    { name: 'Laptop Repair Guide', path: '/blog/laptop-repair-kuwait-2026' }, // Added this
    { name: 'Screen Protection', path: '/blog/how-to-protect-laptop-screen' },
    { name: 'Gaming PC Cooling', path: '/gaming-pc-cooling' },
    { name: 'Battery Replacement', path: '/battery-replacement' },
  ];

  return (
    <>
      <header className={`fixed top-0 w-full z-[1000] transition-all duration-300 ${scrolled ? 'bg-slate-950/95 border-b border-slate-800' : 'bg-slate-950 border-b border-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center" aria-label="KCROC Homepage">
              {!logoError ? (
                <img src="/kcroc-logo.png" alt="KCROC Logo" className="h-14 w-auto object-contain rounded-xl" onError={() => setLogoError(true)} />
              ) : (
                <span className="text-2xl font-black text-white">KCROC</span>
              )}
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link to="/services" className="text-sm font-bold text-white hover:text-emerald-400 transition-colors">Services</Link>
              <Link to="/pricing" className="text-sm font-bold text-white hover:text-emerald-400 transition-colors">Pricing</Link>
              <Link to="/gallery" className="text-sm font-bold text-white hover:text-emerald-400 transition-colors">Gallery</Link>
              <Link to="/about" className="text-sm font-bold text-white hover:text-emerald-400 transition-colors">About</Link>
              <Link to="/contact" className="text-sm font-bold text-white hover:text-emerald-400 transition-colors">Contact</Link>
              <Link to="/book" className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all">Booking</Link>
            </nav>

            {/* Hamburger Button */}
            <button 
              className="lg:hidden text-white p-2" 
              onClick={() => setIsOpen(true)}
              aria-label="Open mobile menu"
            >
              <Menu size={32} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Overlay */}
      <div className={`lg:hidden fixed inset-0 z-[99999] bg-slate-950 h-screen w-screen flex flex-col transition-all duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <div className="absolute top-4 right-4">
          <button 
            className="text-white p-2" 
            onClick={() => setIsOpen(false)}
            aria-label="Close mobile menu"
          >
            <X size={32} />
          </button>
        </div>
        
        <nav className="flex flex-col items-center justify-center h-full pt-16 pb-8 gap-3 w-full overflow-y-auto px-6">
          <Link to="/" className="text-2xl font-black text-white" onClick={() => setIsOpen(false)}>Home</Link>
          
          <div className="flex flex-col items-center gap-2 w-full">
            <button 
              onClick={() => setMobileServicesOpen(!mobileServicesOpen)} 
              className="text-2xl font-black text-white flex items-center gap-1"
              aria-expanded={mobileServicesOpen}
            >
              Services <ChevronDown size={20} />
            </button>
            <div className={`flex flex-col items-center gap-2 transition-all ${mobileServicesOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                {services.map(s => <Link key={s.path} to={s.path} className="text-slate-400 text-base" onClick={() => setIsOpen(false)}>{s.name}</Link>)}
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-2 w-full">
            <button 
              onClick={() => setMobileBlogsOpen(!mobileBlogsOpen)} 
              className="text-2xl font-black text-white flex items-center gap-1"
              aria-expanded={mobileBlogsOpen}
            >
              Blogs <ChevronDown size={20} />
            </button>
            <div className={`flex flex-col items-center gap-2 transition-all ${mobileBlogsOpen ? 'max-h-[250px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                {blogs.map(b => <Link key={b.path} to={b.path} className="text-slate-400 text-base" onClick={() => setIsOpen(false)}>{b.name}</Link>)}
            </div>
          </div>

          <Link to="/pricing" className="text-2xl font-black text-white" onClick={() => setIsOpen(false)}>Pricing</Link>
          <Link to="/gallery" className="text-2xl font-black text-white" onClick={() => setIsOpen(false)}>Gallery</Link>
          <Link to="/about" className="text-2xl font-black text-white" onClick={() => setIsOpen(false)}>About</Link>
          <Link to="/contact" className="text-2xl font-black text-white" onClick={() => setIsOpen(false)}>Contact</Link>
          <Link to="/book" className="text-2xl font-black text-emerald-400" onClick={() => setIsOpen(false)}>Booking</Link>
        </nav>
      </div>
    </>
  );
}
