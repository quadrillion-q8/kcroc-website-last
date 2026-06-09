import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone, CalendarCheck } from 'lucide-react';

// NOTE: If your logo is in the assets folder, uncomment the line below and change the path:
// import myLogo from '../assets/logo.png'; 

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileBlogsOpen, setMobileBlogsOpen] = useState(false);
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
          
          {/* LOGO FIX AREA */}
          <Link to="/" className="flex items-center z-50">
            {/* If your logo is broken, it means "/logo.png" is the wrong path. 
              Change src="/logo.png" to src="/logo.jpg" OR if you imported it above, use src={myLogo} 
            */}
            <img 
              src="/logo.png" 
              alt="KCROC Logo" 
              className="h-16 w-auto object-contain" 
            />
            {/* If the image above is broken, you will see a broken image icon. You MUST fix the src path above to match your actual file! */}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 h-full">
            <Link to="/" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Home</Link>
            
            {/* Bulletproof Dropdown: Services */}
            <div className="relative group h-full
