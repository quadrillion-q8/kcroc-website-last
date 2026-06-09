import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone, CalendarCheck } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [blogsOpen, setBlogsOpen] = useState(false);
  const [mobileBlogsOpen, setMobileBlogsOpen] = useState(false);
  const location = useLocation();

  // Close menus when route changes
  useEffect(() => {
    setIsOpen(false);
    setServicesOpen(false);
    setBlogsOpen(false);
  }, [location.pathname]);

  // Handle scroll for glass effect
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
    <>
      {/* ─── Top Navigation Bar ─── */}
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled || isOpen
            ? 'bg-slate-950/95 backdrop-blur-md border-b border-slate-800 shadow-lg' 
            : 'bg-slate-950/70 backdrop-blur-sm border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo Area */}
            <Link to="/" className="flex items-center z-50">
              {/* =================================================
                🚨 REPLACE THIS SRC WITH YOUR ACTUAL LOGO PATH 🚨
                =================================================
              */}
              <img 
                src="/your-logo-file.png" 
                alt="KCROC Logo" 
                className="h-16 w-auto object-contain" 
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
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
                
                <div className={`absolute top-[80px] left-0 w-64 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl transition-all duration-200 ${servicesOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2 pointer-events-none'}`}>
                  <div className="py-2">
                    {services.map((s) => (
                      <Link key={s.path} to={s.path} className="block px-5 py-3 text-sm text-slate-300 hover:bg-slate-800 hover:text-cyan-400 transition-colors">
                        {s.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Blogs Dropdown */}
              <div 
                className="relative group"
                onMouseEnter={() => setBlogsOpen(true)}
                onMouseLeave={() => setBlogsOpen(false)}
              >
                <button className="flex items-center gap-1 text-sm font-medium text-slate-300 hover:text-white py-8 transition-colors">
                  Blogs <ChevronDown size={14} className={`transition-transform duration-
