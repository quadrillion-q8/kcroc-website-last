// File: app/frontend/src/components/layout/Footer.tsx
import React from 'react';
import { KCROC_GRAPH } from '../../data/graph';

export const Footer = () => {
  const footer = KCROC_GRAPH.footer;

  if (!footer) return null;

  return (
    <footer className="w-full py-16 px-6 bg-slate-950 border-t border-slate-900">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Services Column */}
        <div>
          <h4 className="text-white font-bold mb-4">Repair Services</h4>
          <ul className="space-y-2 text-slate-400 text-sm">
            {footer.links.services.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        
        {/* Company Column */}
        <div>
          <h4 className="text-white font-bold mb-4">Company</h4>
          <ul className="space-y-2 text-slate-400 text-sm">
            {footer.links.company.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>

        {/* Areas Column */}
        <div>
          <h4 className="text-white font-bold mb-4">Service Areas</h4>
          <ul className="space-y-2 text-slate-400 text-sm">
            {footer.links.areas.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-900 text-center text-slate-500 text-sm">
        © 2026 Kuwait Computer Repair On Call. All rights reserved.
      </div>
    </footer>
  );
};
