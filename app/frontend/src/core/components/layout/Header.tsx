// File: app/frontend/src/core/components/layout/Header.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Menu, X, Laptop } from 'lucide-react';
import { BUSINESS_INFO } from '../../../constants';
import { getPopularServices } from '../../../knowledge/registry';
import { trackEvent } from '../../../analytics/Telemetry';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const services = getPopularServices();

  const handlePhoneClick = () => {
    trackEvent({
      category: 'Contact',
      action: 'Click_Phone',
      label: 'Header_Navigation'
    });
  };

  return (
    <header className="w-full bg-brand-dark/80 backdrop-blur-md border-b border-surface-hover sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo / Brand Anchor */}
        <Link 
          to="/" 
          className="flex items-center gap-2 text-white font-heading font-black text-h3 tracking-tight hover:opacity-90 transition-opacity"
        >
          <Laptop className="w-6 h-6 text-brand-primary" />
          <span>KCROC</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-body font-medium text-slate-300 hover:text-brand-primary transition-colors">
            Home
          </Link>
          <Link to="/pricing" className="text-body font-medium text-slate-300 hover:text-brand-primary transition-colors">
            Pricing
          </Link>
          <Link to="/faq" className="text-body font-medium text-slate-300 hover:text-brand-primary transition-colors">
            FAQ
          </Link>
          <div className="relative group py-2">
            <button className="text-body font-medium text-slate-300 group-hover:text-brand-primary transition-colors flex items-center gap-1">
              Services
            </button>
            {/* Mega Dropdown */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 hidden group-hover:flex flex-col w-64 bg-surface-default border border-surface-hover rounded-card p-4 shadow-xl mt-1">
              {services.map((service) => (
                <Link
                  key={service.id}
                  to={`/${service.slug}`}
                  className="px-3 py-2 text-sm text-slate-400 hover:text-brand-primary hover:bg-surface-elevated rounded transition-all"
                >
                  {service.name}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {/* Desktop Action Call Button */}
        <div className="hidden md:flex items-center">
          <a
            href={`tel:${BUSINESS_INFO.phone}`}
            onClick={handlePhoneClick}
            className="flex items-center gap-2 px-5 py-2.5 bg-brand-primary hover:bg-brand-accent text-brand-dark font-bold rounded-button transition-all text-sm"
          >
            <Phone className="w-4 h-4" /> {BUSINESS_INFO.phone}
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Overlay Menu */}
      {isOpen && (
        <div className="md:hidden w-full bg-surface-default border-b border-surface-hover px-6 py-6 flex flex-col gap-6 animate-fade-in-up">
          <nav className="flex flex-col gap-4">
            <Link to="/" onClick={() => setIsOpen(false)} className="text-body font-bold text-white border-b border-surface-hover pb-2">Home</Link>
            <Link to="/pricing" onClick={() => setIsOpen(false)} className="text-body font-bold text-white border-b border-surface-hover pb-2">Pricing</Link>
            <Link to="/faq" onClick={() => setIsOpen(false)} className="text-body font-bold text-white border-b border-surface-hover pb-2">FAQ</Link>
            <Link to="/gallery" onClick={() => setIsOpen(false)} className="text-body font-bold text-white border-b border-surface-hover pb-2">Gallery</Link>
            
            <span className="text-caption font-bold text-slate-500 uppercase tracking-wider mt-2">Our Services</span>
            <div className="flex flex-col gap-3 pl-2">
              {services.map((service) => (
                <Link
                  key={service.id}
                  to={`/${service.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="text-body text-slate-300 hover:text-brand-primary transition-colors"
                >
                  {service.name}
                </Link>
              ))}
            </div>
          </nav>
          
          <a
            href={`tel:${BUSINESS_INFO.phone}`}
            onClick={() => { handlePhoneClick(); setIsOpen(false); }}
            className="flex items-center justify-center gap-2 w-full py-4 bg-brand-primary text-brand-dark font-bold rounded-button transition-all text-body"
          >
            <Phone className="w-5 h-5" /> Call {BUSINESS_INFO.phone}
          </a>
        </div>
      )}
    </header>
  );
};
