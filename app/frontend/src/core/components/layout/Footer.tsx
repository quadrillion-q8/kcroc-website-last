// File: app/frontend/src/core/components/layout/Footer.tsx
import React from 'react';
import { KCROC_GRAPH } from '../../../data/graph';

export const Footer = () => {
  const footer = KCROC_GRAPH.footer;
  const services = KCROC_GRAPH.services;
  
  // Extract dynamic service areas from the primary location
  const primaryLocation = KCROC_GRAPH.locations.find(l => l.id === 'loc-hawalli');
  const serviceAreas = primaryLocation?.serviceAreas || [];

  if (!footer) return null;

  return (
    <footer className="w-full py-16 px-6 bg-slate-950 border-t border-slate-900">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Dynamic Services Column */}
        <div>
          <h4 className="text-white font-bold mb-4">Repair Services</h4>
          <ul className="space-y-2 text-slate-400 text-sm">
            {services.map((srv) => (
              <li key={srv.id}>
                {/* When routing is ready, this becomes a <Link to={`/services/${srv.slug}`}> */}
                <a href={`/services/${srv.slug}`} className="hover:text-cyan-400 transition-colors">
                  {srv.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Static Company Links */}
        <div>
          <h4 className="text-white font-bold mb-4">Company</h4>
          <ul className="space-y-2 text-slate-400 text-sm">
            {footer.links.company.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>

        {/* Dynamic Service Areas Column */}
        <div>
          <h4 className="text-white font-bold mb-4">Service Areas</h4>
          <ul className="space-y-2 text-slate-400 text-sm">
            {serviceAreas.map((area) => <li key={area}>{area}</li>)}
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-900 text-center text-slate-500 text-sm">
        © {new Date().getFullYear()} {KCROC_GRAPH.business?.legalName || 'KCROC'}. All rights reserved.
      </div>
    </footer>
  );
};
