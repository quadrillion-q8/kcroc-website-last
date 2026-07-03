// File: app/frontend/src/core/components/layout/Footer.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, ChevronRight, Laptop } from 'lucide-react';
import { getPopularServices } from '../../../knowledge/registry';

// Standardized Constants
const PHONE_DISPLAY = '+965 5530 1913';
const PHONE_CLEAN = '96555301913';
const ADDRESS = 'Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19, Hawalli';

// Local SEO Clusters
const LOCATIONS = [
  { name: 'Hawalli', slug: 'hawalli' },
  { name: 'Salmiya', slug: 'salmiya' },
  { name: 'Kuwait City', slug: 'kuwait-city' },
  { name: 'Farwaniya', slug: 'farwaniya' },
  { name: 'Mangaf', slug: 'mangaf' },
  { name: 'Jahra', slug: 'jahra' }
];

export const Footer: React.FC = () => {
  const services = getPopularServices();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800 pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: Brand & Contact */}
          <div className="flex flex-col">
            <Link to="/" className="flex items-center gap-2 text-white font-black text-2xl tracking-tight hover:opacity-90 transition-opacity mb-4">
              <Laptop className="w-6 h-6 text-cyan-400" />
              <span>KCROC</span>
            </Link>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              Enterprise-grade computer, laptop, and MacBook repair services in Kuwait. Free pick & drop across all governorates with a no-fix, no-fee guarantee.
            </p>
            <div className="flex flex-col gap-4">
              <a href={`tel:${PHONE_CLEAN}`} className="flex items-center gap-3 text-sm font-bold text-slate-300 hover:text-cyan-400 transition-colors">
                <div className="bg-cyan-500/10 p-2 rounded-lg"><Phone className="w-4 h-4 text-cyan-400" /></div>
                <span>{PHONE_DISPLAY}</span>
              </a>
              <div className="flex items-start gap-3 text-sm text-slate-300">
                <div className="bg-cyan-500/10 p-2 rounded-lg shrink-0"><MapPin className="w-4 h-4 text-cyan-400" /></div>
                <span className="leading-relaxed">{ADDRESS}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Dynamic Services */}
          <div className="flex flex-col">
            <h4 className="text-sm font-black text-white mb-6 uppercase tracking-wider">Repair Services</h4>
            <ul className="flex flex-col gap-3">
              {services.map((service) => (
                <li key={service.id}>
                  <Link 
                    to={`/${service.slug}`} 
                    className="flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors group"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                    {service.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/services" className="flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors group">
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                  View All Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company & Resources */}
          <div className="flex flex-col">
            <h4 className="text-sm font-black text-white mb-6 uppercase tracking-wider">Company & Resources</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <Link to="/about" className="flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors group">
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-cyan-400 transition-colors" /> About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors group">
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-cyan-400 transition-colors" /> Contact Center
                </Link>
              </li>
              <li>
                <Link to="/blog" className="flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors group">
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-cyan-400 transition-colors" /> Tech Blog
                </Link>
              </li>
              <li>
                <Link to="/faq" className="flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors group">
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-cyan-400 transition-colors" /> FAQ
                </Link>
              </li>
              <li>
                <Link to="/laptop-screen-protection-tips" className="flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors group">
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-cyan-400 transition-colors" /> Screen Protection Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Service Areas (Local SEO) */}
          <div className="flex flex-col">
            <h4 className="text-sm font-black text-white mb-6 uppercase tracking-wider">Service Areas</h4>
            <ul className="flex flex-col gap-3">
              {LOCATIONS.map((loc) => (
                <li key={loc.slug}>
                  <Link 
                    to={`/location/${loc.slug}`} 
                    className="flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors group"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-cyan-400 transition-colors" />
                    Computer Repair in {loc.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Copyright Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-medium">
          <p>&copy; {currentYear} Kuwait Computer Repair On Call. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy-security-kuwait" className="hover:text-cyan-400 transition-colors">Privacy & Security Policy</Link>
            <Link to="/pricing" className="hover:text-cyan-400 transition-colors">Pricing & Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
