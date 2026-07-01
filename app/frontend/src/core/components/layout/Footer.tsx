// File: app/frontend/src/core/components/layout/Footer.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, ChevronRight } from 'lucide-react';
import { BUSINESS_INFO } from '../../../constants';
import { getPopularServices } from '../../../knowledge/registry';

export const Footer: React.FC = () => {
  const services = getPopularServices();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-surface-default border-t border-surface-hover pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Column 1: Brand & Contact */}
          <div className="flex flex-col">
            <h3 className="text-h3 font-heading font-black text-white mb-4">KCROC</h3>
            <p className="text-body text-slate-400 mb-6">
              Enterprise-grade computer, laptop, and MacBook repair services in Kuwait. We bring the lab to your door.
            </p>
            <div className="flex flex-col gap-3">
              <a href={`tel:${BUSINESS_INFO.phone}`} className="flex items-center gap-3 text-slate-300 hover:text-brand-primary transition-colors">
                <Phone className="w-5 h-5" />
                <span>{BUSINESS_INFO.phone}</span>
              </a>
              <div className="flex items-start gap-3 text-slate-300">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-1" />
                <span>{BUSINESS_INFO.address}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Dynamic Services */}
          <div className="flex flex-col">
            <h4 className="text-body font-bold text-white mb-4 uppercase tracking-wider">Our Services</h4>
            <ul className="flex flex-col gap-3">
              {services.map((service) => (
                <li key={service.id}>
                  <Link 
                    to={`/${service.slug}`} 
                    className="flex items-center gap-2 text-slate-400 hover:text-brand-primary transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Hours & Trust */}
          <div className="flex flex-col">
            <h4 className="text-body font-bold text-white mb-4 uppercase tracking-wider">Operating Hours</h4>
            <ul className="flex flex-col gap-3 text-slate-400 mb-6">
              <li className="flex justify-between border-b border-surface-hover pb-2">
                <span>Monday - Sunday</span>
                <span className="text-white font-medium">24 Hours / On Call</span>
              </li>
            </ul>
            <div className="p-4 bg-surface-elevated rounded-card border border-surface-hover">
              <p className="text-caption text-slate-300">
                <span className="font-bold text-white">Free Pick & Drop</span> available across all governorates in Kuwait. No-fix, no-fee guarantee.
              </p>
            </div>
          </div>

        </div>

        {/* Copyright Bar */}
        <div className="border-t border-surface-hover pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-caption text-slate-500">
          <p>&copy; {currentYear} Kuwait Computer Repair On Call. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/" className="hover:text-brand-primary transition-colors">Privacy Policy</Link>
            <Link to="/" className="hover:text-brand-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
