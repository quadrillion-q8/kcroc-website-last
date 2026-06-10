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
    { name: 'MacBook Repair', path: '/macbook-repair' },
    { name: 'Gaming PC Repair', path: '/gaming-pc-repair-kuwait' },
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
              <img src="/kcroc-logo.png" alt="KCROC Logo" className="h-14 w-auto object-contain rounded-xl" onError={() => setLogoError(true)} />
            ) : (
              <span className="text-2xl font-black text-white">KCROC</span>
            )}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 h-full">
            <Link to="/" className="text-sm font-medium text-slate-300 hover:text-white">Home</Link>
            
            <div className="relative group h-full flex items-center">
              <button className="flex items-center gap-1 text-sm font-medium text-slate-300 group-hover:text-white h-full">Services <ChevronDown size={14} /></button>
              <div className="absolute top-full left-0 w-64 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl py-2">
                  {services.map((s) => <Link key={s.path} to={s.path} className="block px-5 py-3 text-sm text-slate-300 hover:bg-slate-800 hover:text-cyan-400">{s.name}</Link>)}
                </div>
              </div>
            </div>

            <div className="relative group h-full flex items-center">
              <button className="flex items-center gap-1 text-sm font-medium text-slate-300 group-hover:text-white h-full">Blogs <ChevronDown size={14} /></button>
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

          <button className="lg:hidden text-white p-2 z-[1005] relative" onClick={() => setIsOpen(true)}>
            <Menu size={32} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`lg:hidden fixed inset-0 z-[99999] bg-slate-950 transition-all duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <button className="absolute top-6 right-6 text-white p-2" onClick={() => setIsOpen(false)}><X size={40} /></button>
        <div className="flex flex-col items-center justify-center h-full gap-6 p-6">
          <Link to="/" className="text-2xl font-black text-white" onClick={() => setIsOpen(false)}>Home</Link>
          
          <button onClick={() => setMobileServicesOpen(!mobileServicesOpen)} className="text-2xl font-black text-white flex items-center gap-2">Services <ChevronDown size={20} /></button>
          <div className={`flex flex-col items-center gap-3 transition-all ${mobileServicesOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
             {services.map(s => <Link key={s.path} to={s.path} className="text-slate-400 text-lg" onClick={() => setIsOpen(false)}>{s.name}</Link>)}
          </div>

          <button onClick={() => setMobileBlogsOpen(!mobileBlogsOpen)} className="text-2xl font-black text-white flex items-center gap-2">Blogs <ChevronDown size={20} /></button>
          <div className={`flex flex-col items-center gap-3 transition-all ${mobileBlogsOpen ? 'max-h-[100px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
             {blogs.map(b => <Link key={b.path} to={b.path} className="text-slate-400 text-lg" onClick={() => setIsOpen(false)}>{b.name}</Link>)}
          </div>

          <Link to="/pricing" className="text-2xl font-black text-white" onClick={() => setIsOpen(false)}>Pricing</Link>
          <Link to="/gallery" className="text-2xl font-black text-white" onClick={() => setIsOpen(false)}>Gallery</Link>
          <Link to="/about" className="text-2xl font-black text-white" onClick={() => setIsOpen(false)}>About</Link>
          <Link to="/contact" className="text-2xl font-black text-white" onClick={() => setIsOpen(false)}>Contact</Link>
          <Link to="/book" className="text-2xl font-black text-emerald-400" onClick={() => setIsOpen(false)}>Booking</Link>
        </div>
      </div>
    </header>
  );
}
