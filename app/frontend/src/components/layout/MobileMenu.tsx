import { Link } from 'react-router-dom';
import { X, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  services: { name: string; path: string }[];
  blogs: { name: string; path: string }[];
}

export default function MobileMenu({ isOpen, onClose, services, blogs }: MobileMenuProps) {
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileBlogsOpen, setMobileBlogsOpen] = useState(false);

  return (
    <div className={`lg:hidden fixed inset-0 z-[99999] bg-[#0a0f1c]/95 backdrop-blur-2xl h-screen w-screen flex flex-col transition-all duration-300 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
      <div className="absolute top-4 right-4">
        <button className="text-slate-300 hover:text-cyan-400 transition-colors p-2" onClick={onClose}>
          <X size={32} />
        </button>
      </div>
      
      <nav className="flex flex-col items-center justify-center h-full pt-16 pb-8 gap-4 w-full overflow-y-auto px-6">
        <Link to="/" className="text-2xl font-black text-white hover:text-cyan-400 transition-colors" onClick={onClose}>Home</Link>
        
        <div className="flex flex-col items-center gap-2 w-full">
          <button onClick={() => setMobileServicesOpen(!mobileServicesOpen)} className="text-2xl font-black text-white hover:text-cyan-400 transition-colors flex items-center gap-1">
            Services <ChevronDown size={20} className={mobileServicesOpen ? 'rotate-180' : ''} />
          </button>
          <div className={`flex flex-col items-center gap-3 transition-all ${mobileServicesOpen ? 'max-h-[300px] opacity-100 mt-2' : 'max-h-0 opacity-0 overflow-hidden'}`}>
              {services.map(s => <Link key={s.path} to={s.path} className="text-slate-400 hover:text-cyan-400 text-base" onClick={onClose}>{s.name}</Link>)}
          </div>
        </div>
        
        <div className="flex flex-col items-center gap-2 w-full">
          <button onClick={() => setMobileBlogsOpen(!mobileBlogsOpen)} className="text-2xl font-black text-white hover:text-cyan-400 transition-colors flex items-center gap-1">
            Blogs <ChevronDown size={20} className={mobileBlogsOpen ? 'rotate-180' : ''} />
          </button>
          <div className={`flex flex-col items-center gap-3 transition-all ${mobileBlogsOpen ? 'max-h-[250px] opacity-100 mt-2' : 'max-h-0 opacity-0 overflow-hidden'}`}>
              {blogs.map(b => <Link key={b.path} to={b.path} className="text-slate-400 hover:text-cyan-400 text-base" onClick={onClose}>{b.name}</Link>)}
          </div>
        </div>

        <Link to="/pricing" className="text-2xl font-black text-white hover:text-cyan-400 transition-colors" onClick={onClose}>Pricing</Link>
        <Link to="/gallery" className="text-2xl font-black text-white hover:text-cyan-400 transition-colors" onClick={onClose}>Gallery</Link>
        <Link to="/about" className="text-2xl font-black text-white hover:text-cyan-400 transition-colors" onClick={onClose}>About</Link>
        <Link to="/contact" className="text-2xl font-black text-white hover:text-cyan-400 transition-colors" onClick={onClose}>Contact</Link>
        <Link to="/book" className="text-2xl font-black text-cyan-400 mt-4 px-8 py-3 border border-cyan-500/30 rounded-full" onClick={onClose}>Book Repair</Link>
      </nav>
    </div>
  );
}
