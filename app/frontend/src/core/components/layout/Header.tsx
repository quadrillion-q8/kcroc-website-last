// File: app/frontend/src/core/components/layout/Header.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown, Laptop, Phone, CalendarCheck, MessageCircle, ArrowRight, Wrench } from 'lucide-react';
import { NavigationBuilder } from '../../navigation/NavigationBuilder';
import { KCROC_GRAPH } from '../../../data/graph';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);

  const navData = NavigationBuilder.getFooterDirectory();
  const megaMenu = NavigationBuilder.getMegaMenuServices();
  const phone = KCROC_GRAPH.business?.telephone || '96555301913';

  const handleNavigate = () => {
    setIsMobileMenuOpen(false);
    setOpenMobileDropdown(null);
  };

  /* --- STANDARD DESKTOP DROPDOWN --- */
  const DesktopDropdown = ({ title, items }: { title: string, items: {label: string, route: string}[] }) => (
    <div className="relative group h-full flex items-center">
      <button className="flex items-center gap-1 text-sm font-bold text-slate-300 group-hover:text-cyan-400 transition-colors h-full">
        {title} <ChevronDown className="w-4 h-4" />
      </button>
      <div className="absolute top-[80px] left-0 hidden group-hover:flex flex-col w-64 bg-slate-900 border border-slate-800 rounded-xl p-2 shadow-2xl">
        {items.map((item, idx) => (
          <Link 
            key={idx} 
            to={item.route} 
            className="px-4 py-2.5 text-sm font-medium text-slate-400 hover:text-cyan-400 hover:bg-slate-800/50 rounded-lg transition-all"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );

  /* --- MOBILE ACCORDION --- */
  const MobileAccordion = ({ title, items }: { title: string, items: {label: string, route: string}[] }) => {
    const isOpen = openMobileDropdown === title;
    return (
      <div className="border-b border-slate-800">
        <button 
          onClick={() => setOpenMobileDropdown(isOpen ? null : title)}
          className="flex items-center justify-between w-full py-4 text-left font-bold text-slate-200"
        >
          {title}
          <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180 text-cyan-400' : 'text-slate-500'}`} />
        </button>
        {isOpen && (
          <div className="pb-4 pl-4 space-y-3 flex flex-col">
            {items.map((item, idx) => (
              <Link 
                key={idx} 
                to={item.route} 
                onClick={handleNavigate}
                className="text-slate-400 text-sm hover:text-cyan-400"
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <header className="w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50 h-20">
      <div className="max-w-[1400px] mx-auto px-4 xl:px-6 h-full flex items-center justify-between">
        
        <Link to="/" onClick={handleNavigate} className="flex items-center gap-2 text-white font-black text-2xl tracking-tight hover:opacity-90 flex-shrink-0">
          <Laptop className="w-6 h-6 text-cyan-400" />
          <span>KCROC</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 h-full">
          <Link to="/" className="text-sm font-bold text-slate-300 hover:text-cyan-400 transition-colors h-full flex items-center">Home</Link>
          
          <div className="relative group h-full flex items-center">
            <button className="flex items-center gap-1 text-sm font-bold text-slate-300 group-hover:text-cyan-400 transition-colors h-full">
              Services <ChevronDown className="w-4 h-4" />
            </button>
            
            <div className="absolute top-[80px] left-1/2 -translate-x-1/2 hidden group-hover:flex w-[800px] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden cursor-default">
              <div className="w-2/3 p-6">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-5">Hardware Repair Services</h3>
                <div className="grid grid-cols-1 gap-2">
                  {megaMenu.featured.map((item, idx) => (
                    <Link 
                      key={idx} 
                      to={`/${item.slug}`} 
                      className="group/card flex items-start gap-4 p-4 rounded-xl hover:bg-slate-800/50 transition-colors"
                    >
                      <div className="p-3 bg-slate-950 rounded-lg text-cyan-400 group-hover/card:bg-cyan-500 group-hover/card:text-slate-950 transition-colors">
                        <Wrench className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-slate-200 group-hover/card:text-cyan-400 transition-colors">{item.title}</h4>
                        <p className="text-sm text-slate-400 mt-1 mb-2 line-clamp-2">{item.description}</p>
                        <span className="text-xs font-bold text-cyan-500 flex items-center gap-1 group-hover/card:translate-x-1 transition-transform">
                          {item.callToAction} <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </Link>
                  ))}
                  {/* Safety fallback if you forget to add 'isFeatured' to graph.ts */}
                  {megaMenu.featured.length === 0 && (
                     <p className="text-slate-500 italic text-sm py-4">Add `isFeatured: true` to services in graph.ts to show cards here!</p>
                  )}
                </div>
              </div>
              
              <div className="w-1/3 p-6 bg-slate-950 border-l border-slate-800 flex flex-col">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-5">Popular Repairs</h3>
                <ul className="space-y-4 flex-grow">
                  {megaMenu.standardList.map((item, idx) => (
                    <li key={idx}>
                      <Link to={`/${item.slug}`} className="text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link to="/services" className="mt-6 pt-6 border-t border-slate-800 text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2">
                  View All Services <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          <DesktopDropdown title="Brands" items={navData.brands} />
          <DesktopDropdown title="Problems" items={navData.problems} />
          
          <Link to="/pricing" className="text-sm font-bold text-slate-300 hover:text-cyan-400 transition-colors h-full flex items-center">Pricing</Link>
          <Link to="/gallery" className="text-sm font-bold text-slate-300 hover:text-cyan-400 transition-colors h-full flex items-center">Gallery</Link>
          
          <DesktopDropdown title="About" items={[
            { label: 'About KCROC', route: '/about' },
            { label: 'Our Hawalli Location', route: '/location/hawalli' }
          ]} />
          
          <DesktopDropdown title="Resources" items={[
            { label: 'Tech Blog', route: '/blog' },
            { label: 'FAQ', route: '/faq' },
            { label: 'Laptop Screen Protection Tips', route: '/laptop-screen-protection-tips' }
          ]} />
          
          <Link to="/contact" className="text-sm font-bold text-slate-300 hover:text-cyan-400 transition-colors h-full flex items-center">Contact</Link>
        </nav>

        <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
          <Link 
            to="/book" 
            className="flex items-center gap-2 px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-full transition-all text-sm shadow-[0_0_15px_rgba(6,182,212,0.3)]"
          >
            <CalendarCheck className="w-4 h-4" /> Book Now
          </Link>
        </div>

        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-slate-400 hover:text-white"
        >
          {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-20 bg-slate-950 z-40 overflow-y-auto pb-32">
          <div className="px-6 py-4 flex flex-col">
            <Link to="/" onClick={handleNavigate} className="py-4 border-b border-slate-800 font-bold text-slate-200 text-left">Home</Link>
            
            <MobileAccordion title="Services" items={navData.services} />
            <MobileAccordion title="Brands" items={navData.brands} />
            <MobileAccordion title="Problems" items={navData.problems} />
            
            <Link to="/pricing" onClick={handleNavigate} className="py-4 border-b border-slate-800 font-bold text-slate-200 text-left">Pricing</Link>
            <Link to="/gallery" onClick={handleNavigate} className="py-4 border-b border-slate-800 font-bold text-slate-200 text-left">Gallery</Link>
            
            <MobileAccordion title="About" items={[
              { label: 'About KCROC', route: '/about' },
              { label: 'Our Hawalli Location', route: '/location/hawalli' }
            ]} />
            
            <MobileAccordion title="Resources" items={[
              { label: 'Tech Blog', route: '/blog' },
              { label: 'FAQ', route: '/faq' },
              { label: 'Screen Protection Tips', route: '/laptop-screen-protection-tips' }
            ]} />
            
            <Link to="/contact" onClick={handleNavigate} className="py-4 font-bold text-slate-200 text-left">Contact</Link>
          </div>

          <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-950/95 border-t border-slate-800 flex gap-3 backdrop-blur-md pb-8 shadow-2xl">
            <Link 
              to="/book" 
              onClick={handleNavigate}
              className="flex-1 flex justify-center items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black py-3 rounded-xl transition-colors text-sm"
            >
              Book Repair
            </Link>
            <a 
              href={`https://wa.me/${phone}`} 
              target="_blank" 
              rel="noreferrer"
              className="w-14 flex justify-center items-center bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <a 
              href={`tel:${phone}`} 
              className="w-14 flex justify-center items-center bg-slate-800 hover:bg-slate-700 text-white rounded-xl border border-slate-700 transition-colors"
            >
              <Phone className="w-5 h-5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
