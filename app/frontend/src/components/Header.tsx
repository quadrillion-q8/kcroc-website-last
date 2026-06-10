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

  const blogs = [{ name: 'Screen Protection', path: '/blog/how-to-protect-laptop-screen' }];

  return (
    // Changed z-50 to z-[1000] to ensure the whole header is above content
    <header className={`fixed top-0 w-full z-[1000] transition-all duration-300 ${scrolled ? '!bg-slate-950/95 backdrop-blur-md border-b border-slate-800 shadow-lg' : '!bg-slate-950/80 backdrop-blur-sm border-b border-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          <Link to="/" className="flex items-center z-[1005] relative">
            {!logoError ? (
              <img src="/kcroc-logo.png" alt="KCROC Logo" className="h-14 md:h-16 w-auto object-contain rounded-xl shadow-lg border border-slate-700/50 bg-slate-900/50" onError={() => setLogoError(true)} />
            ) : (
              <div className="flex flex-col group ml-2">
                <span className="text-2xl font-black text-white tracking-tight group-hover:text-cyan-400 transition-colors">KCROC</span>
              </div>
            )}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 h-full">
            <Link to="/" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Home</Link>
            <Link to="/pricing" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Pricing</Link>
            <Link to="/gallery" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Gallery</Link>
            <Link to="/about" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">About</Link>
            <Link to="/contact" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Contact</Link>
            <Link to="/book" className="text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors">Booking</Link>
          </nav>

          <div className="hidden lg:flex items-center gap-4">
             <Link to="/book" className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2">
              <CalendarCheck size={16} /> Book Now
            </Link>
          </div>

          <button className="lg:hidden text-slate-300 hover:text-white p-2 z-[1005] relative" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav - Fixed Z-Index issue by making this its own high-layer overlay */}
      <div className={`lg:hidden fixed inset-0 top-0 pt-20 bg-slate-950 transition-all duration-300 z-[9999] ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <nav className="flex flex-col p-6 gap-2 h-full bg-slate-950">
          <Link to="/" className="text-xl font-bold text-white py-4 border-b border-slate-800">Home</Link>
          <Link to="/pricing" className="text-xl font-bold text-white py-4 border-b border-slate-800">Pricing</Link>
          <Link to="/gallery" className="text-xl font-bold text-white py-4 border-b border-slate-800">Gallery</Link>
          <Link to="/about" className="text-xl font-bold text-white py-4 border-b border-slate-800">About</Link>
          <Link to="/contact" className="text-xl font-bold text-white py-4 border-b border-slate-800">Contact</Link>
          <Link to="/book" className="text-xl font-bold text-white py-4 border-b border-slate-800">Booking</Link>
        </nav>
      </div>
    </header>
  );
}
