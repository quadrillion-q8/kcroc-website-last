import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Search, X } from 'lucide-react';
import { IMAGES } from '../constants/images'; // 👈 Using your verified dictionary
import MobileMenu from './layout/MobileMenu';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
    setIsSearchOpen(false);
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
      <header className={`fixed top-0 w-full z-[1000] transition-all duration-300 ${scrolled ? 'bg-[#0a0f1c]/80 backdrop-blur-xl border-b border-slate-800/50' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            {/* Logo Section - Uses local image dictionary */}
            <Link to="/" className="flex items-center group">
              <img 
                src={IMAGES.brand.logo} 
                alt="KCROC Logo" 
                className="h-16 md:h-20 w-auto object-contain transition-all duration-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] hover:scale-105" 
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link to="/services" className="text-sm font-bold text-slate-200 hover:text-cyan-400">Services</Link>
              <Link to="/pricing" className="text-sm font-bold text-slate-200 hover:text-cyan-400">Pricing</Link>
              <Link to="/gallery" className="text-sm font-bold text-slate-200 hover:text-cyan-400">Gallery</Link>
              <Link to="/about" className="text-sm font-bold text-slate-200 hover:text-cyan-400">About</Link>
              <Link to="/blog" className="text-sm font-bold text-slate-200 hover:text-cyan-400">Blog</Link>
              <Link to="/contact" className="text-sm font-bold text-slate-200 hover:text-cyan-400">Contact</Link>
              
              <button onClick={() => setIsSearchOpen(true)} className="text-slate-200 hover:text-cyan-400">
                <Search size={20} />
              </button>

              <Link to="/book" className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-6 py-2.5 rounded-full text-sm font-black transition-all hover:scale-105">Book Repair</Link>
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
                <Link key={item.path} to={item.path} onClick={() => setIsSearchOpen(false)} className="p-4 bg-slate-900/50 hover:bg-cyan-500/10 rounded-lg text-white font-bold">
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} services={services} blogs={blogs} />
    </>
  );
}
