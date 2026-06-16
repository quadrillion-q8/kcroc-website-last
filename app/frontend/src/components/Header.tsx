import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ShieldCheck, Search } from 'lucide-react';
import logo from '../assets/logo.png';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileBlogsOpen, setMobileBlogsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
    setIsSearchOpen(false);
    setMobileServicesOpen(false);
    setMobileBlogsOpen(false);
    setSearchTerm('');
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
    { name: 'Laptop Repair Guide', path: '/blog/laptop-repair-kuwait-2026' },
    { name: 'Screen Protection', path: '/blog/how-to-protect-laptop-screen' },
    { name: 'Gaming PC Cooling', path: '/gaming-pc-cooling' },
    { name: 'Battery Replacement', path: '/battery-replacement' },
  ];

  const allItems = [...services, ...blogs];
  const filteredItems = searchTerm.length > 0 
    ? allItems.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : [];

  return (
    <>
      <header className={`fixed top-0 w-full z-[1000] transition-all duration-300 ${scrolled ? 'bg-[#0a0f1c]/80 backdrop-blur-xl border-b border-slate-800/50 shadow-[0_4px_30px_rgba(0,0,0,0.3)]' : 'bg-transparent border-b border-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="KCROC Logo" className="h-14 w-auto object-contain rounded-xl" />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link to="/services" className="text-sm font-bold text-slate-200 hover:text-cyan-400 transition-colors">Services</Link>
              <Link to="/pricing" className="text-sm font-bold text-slate-200 hover:text-cyan-400 transition-colors">Pricing</Link>
              <Link to="/gallery" className="text-sm font-bold text-slate-200 hover:text-cyan-400 transition-colors">Gallery</Link>
              <Link to="/about" className="text-sm font-bold text-slate-200 hover:text-cyan-400 transition-colors">About</Link>
              <Link to="/blog" className="text-sm font-bold text-slate-200 hover:text-cyan-400 transition-colors">Blog</Link>
              <Link to="/contact" className="text-sm font-bold text-slate-200 hover:text-cyan-400 transition-colors">Contact</Link>
              
              <button onClick={() => setIsSearchOpen(true)} className="text-slate-200 hover:text-cyan-400 transition-colors">
                <Search size={20} />
              </button>

              <Link to="/book" className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-6 py-2.5 rounded-full text-sm font-black transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:scale-105">Book Repair</Link>
            </nav>

            <button className="lg:hidden text-white p-2" onClick={() => setIsOpen(true)}><Menu size={32} /></button>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[2000] bg-[#0a0f1c]/95 backdrop-blur-2xl p-6 pt-24">
          <button className="absolute top-6 right-6 text-white" onClick={() => setIsSearchOpen(false)}><X size={32} /></button>
          <div className="max-w-2xl mx-auto">
            <input 
              type="text" 
              autoFocus
              placeholder="Search services, repairs, or guides..." 
              className="w-full bg-slate-900 border border-slate-700 text-white p-4 rounded-xl text-xl outline-none focus:border-cyan-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="mt-8 flex flex-col gap-2">
              {filteredItems.map(item => (
                <Link key={item.path} to={item.path} onClick={() => setIsSearchOpen(false)} className="p-4 bg-slate-900/50 hover:bg-cyan-500/10 rounded-lg text-white font-bold transition-all">
                  {item.name}
                </Link>
              ))}
              {searchTerm && filteredItems.length === 0 && <p className="text-slate-500 text-center mt-10">No results found.</p>}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed inset-0 z-[99999] bg-[#0a0f1c]/95 backdrop-blur-2xl h-screen w-screen flex flex-col transition-all duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <div className="absolute top-4 right-4"><button className="text-slate-300 hover:text-cyan-400 transition-colors p-2" onClick={() => setIsOpen(false)}><X size={32} /></button></div>
        
        <nav className="flex flex-col items-center justify-center h-full pt-16 pb-8 gap-4 w-full overflow-y-auto px-6">
          <Link to="/" className="text-2xl font-black text-white hover:text-cyan-400 transition-colors" onClick={() => setIsOpen(false)}>Home</Link>
          
          <div className="flex flex-col items-center gap-2 w-full">
            <button onClick={() => setMobileServicesOpen(!mobileServicesOpen)} className="text-2xl font-black text-white hover:text-cyan-400 transition-colors flex items-center gap-1">
              Services <ChevronDown size={20} className={mobileServicesOpen ? 'rotate-180' : ''} />
            </button>
            <div className={`flex flex-col items-center gap-3 transition-all ${mobileServicesOpen ? 'max-h-[300px] opacity-100 mt-2' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                {services.map(s => <Link key={s.path} to={s.path} className="text-slate-400 hover:text-cyan-400 text-base" onClick={() => setIsOpen(false)}>{s.name}</Link>)}
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-2 w-full">
            <button onClick={() => setMobileBlogsOpen(!mobileBlogsOpen)} className="text-2xl font-black text-white hover:text-cyan-400 transition-colors flex items-center gap-1">
              Blogs <ChevronDown size={20} className={mobileBlogsOpen ? 'rotate-180' : ''} />
            </button>
            <div className={`flex flex-col items-center gap-3 transition-all ${mobileBlogsOpen ? 'max-h-[250px] opacity-100 mt-2' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                {blogs.map(b => <Link key={b.path} to={b.path} className="text-slate-400 hover:text-cyan-400 text-base" onClick={() => setIsOpen(false)}>{b.name}</Link>)}
            </div>
          </div>

          <Link to="/pricing" className="text-2xl font-black text-white hover:text-cyan-400 transition-colors" onClick={() => setIsOpen(false)}>Pricing</Link>
          <Link to="/about" className="text-2xl font-black text-white hover:text-cyan-400 transition-colors" onClick={() => setIsOpen(false)}>About</Link>
          <Link to="/book" className="text-2xl font-black text-cyan-400 mt-4 px-8 py-3 border border-cyan-500/30 rounded-full" onClick={() => setIsOpen(false)}>Book Repair</Link>
        </nav>
      </div>
    </>
  );
}
