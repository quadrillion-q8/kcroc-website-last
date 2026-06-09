import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone, CalendarCheck } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setServicesOpen(false);
  }, [location.pathname]);

  // Add frosted glass effect on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    { name: 'Laptop Repair', path: '/laptop-repair-hawalli-kuwait' },
    { name: 'MacBook Repair', path: '/macbook-repair' },
    { name: 'Screen Replacement', path: '/screen-replacement' },
    { name: 'Battery Replacement', path: '/battery-replacement' },
    { name: 'Motherboard Repair', path: '/chip-level-motherboard-repair-hawalli' },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-slate-950/80 backdrop-blur-md border-b border-slate-800 shadow-lg' 
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Area */}
          <Link to="/" className="flex items-center gap-2 group">
            {/* If you have a logo image, uncomment the line below and remove the text */}
            {/* <img src="/logo.png" alt="KCROC Logo" className="h-12 w-auto" /> */}
            <div className="flex flex-col">
              <span className="text-2xl font-black text-white tracking-tight group-hover:text-cyan-400 transition-colors">
                KCROC
              </span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest">
                Computer Repair
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Home</Link>
            
            {/* Services Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button className="flex items-center gap-1 text-sm font-medium text-slate-300 hover:text-white py-8 transition-colors">
                Services <ChevronDown size={14} className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180 text-cyan-400' : ''}`} />
              </button>
              
              <div className={`absolute top-[80px] left-0 w-64 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl transition-all duration-200 ${servicesOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}>
                <div className="py-2">
                  {services.map((s) => (
                    <Link 
                      key={s.path} 
                      to={s.path}
                      className="block px-5 py-3 text-sm text-slate-300 hover:bg-slate-800 hover:text-cyan-400 transition-colors"
                    >
                      {s.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link to="/pricing" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Pricing</Link>
            <Link to="/about" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">About</Link>
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <a href="tel:+96555301913" className="text-slate-300 hover:text-white flex items-center gap-2 text-sm font-bold transition-colors">
              <Phone size={16} className="text-cyan-400" /> 5530 1913
            </a>
            <Link to="/book" className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg hover:shadow-emerald-500/25 flex items-center gap-2">
              <CalendarCheck size={16} /> Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-slate-300 hover:text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div className={`md:hidden fixed inset-0 top-20 bg-slate-950/95 backdrop-blur-xl transition-all duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <nav className="flex flex-col p-6 gap-2 h-full overflow-y-auto">
          <Link to="/" className="text-xl font-bold text-white py-4 border-b border-slate-800">Home</Link>
          
          <div className="py-4 border-b border-slate-800">
            <div className="text-xl font-bold text-white mb-4">Services</div>
            <div className="flex flex-col gap-3 pl-4 border-l-2 border-slate-800">
              {services.map((s) => (
                <Link key={s.path} to={s.path} className="text-slate-400 hover:text-cyan-400 py-2">{s.name}</Link>
              ))}
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
