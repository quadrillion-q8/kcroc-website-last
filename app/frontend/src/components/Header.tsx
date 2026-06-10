import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone, CalendarCheck } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
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
    { name: 'Screen Replacement', path: '/screen-replacement' },
  ];

  return (
    <>
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

            <nav className="hidden lg:flex items-center gap-6">
              <Link to="/" className="text-sm font-medium text-slate-300 hover:text-white">Home</Link>
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
      </header>

      {/* Full Screen Mobile Overlay - Forced Z-Index and Solid Background */}
      <div className={`lg:hidden fixed inset-0 z-[99999] bg-slate-950 flex flex-col items-center justify-center transition-all duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <button className="absolute top-6 right-6 text-white p-2" onClick={() => setIsOpen(false)}>
          <X size={40} />
        </button>
        
        <nav className="flex flex-col items-center gap-8 text-center">
          <Link to="/" className="text-3xl font-black text-white" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/services" className="text-3xl font-black text-white" onClick={() => setIsOpen(false)}>Services</Link>
          <Link to="/pricing" className="text-3xl font-black text-white" onClick={() => setIsOpen(false)}>Pricing</Link>
          <Link to="/gallery" className="text-3xl font-black text-white" onClick={() => setIsOpen(false)}>Gallery</Link>
          <Link to="/about" className="text-3xl font-black text-white" onClick={() => setIsOpen(false)}>About</Link>
          <Link to="/contact" className="text-3xl font-black text-white" onClick={() => setIsOpen(false)}>Contact</Link>
          <Link to="/book" className="text-3xl font-black text-emerald-400" onClick={() => setIsOpen(false)}>Booking</Link>
        </nav>
      </div>
    </>
  );
}
