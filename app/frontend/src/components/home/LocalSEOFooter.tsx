import React from 'react';
import { Link } from 'react-router-dom';
import { INTERNAL_FOOTER_LINKS, AREAS } from '../../constants/data';

export default function LocalSEOFooter() {
  const areaList = Object.values(AREAS);

  return (
    <footer className="w-full py-12 px-6 bg-slate-950 border-t border-slate-800" aria-label="Site Footer">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        
        {/* Services Links */}
        <nav aria-label="Our Services Navigation">
          <h4 className="text-white font-black mb-4">Our Services</h4>
          <div className="grid grid-cols-1 gap-2">
            {INTERNAL_FOOTER_LINKS.map((link) => (
              <Link 
                key={link.title} 
                to={link.path} 
                className="text-slate-400 hover:text-cyan-400 transition-colors text-sm"
                aria-label={`View details about our ${link.title} services`}
              >
                {link.title}
              </Link>
            ))}
          </div>
        </nav>

        {/* Location Links */}
        <nav aria-label="Service Areas Navigation">
          <h4 className="text-white font-black mb-4">Service Areas</h4>
          <div className="flex flex-wrap gap-2">
            {areaList.map((area, index) => (
              <Link 
                key={area.name} 
                to={`/computer-repair-in-${area.name.toLowerCase().replace(/\s/g, '')}`} 
                className="text-slate-400 hover:text-cyan-400 transition-colors text-sm"
                aria-label={`Navigate to computer repair services in ${area.name}`}
              >
                {area.name}{index !== areaList.length - 1 ? ',' : ''}
              </Link>
            ))}
          </div>
        </nav>
      </div>
      
      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-slate-900 text-center text-slate-600 text-xs">
        <p>© 2026 KCROC. Professional repair services across Kuwait.</p>
      </div>
    </footer>
  );
}
