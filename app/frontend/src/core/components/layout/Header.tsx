// File: app/frontend/src/core/components/layout/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Menu } from 'lucide-react';
import { BUSINESS_INFO } from '../../../constants/data';
import { ROUTES } from '../../../constants/routes';

export const Header: React.FC = () => {
  return (
    <header className="fixed top-0 w-full z-sticky bg-surface-glass backdrop-blur-md border-b border-surface-hover">
      {/* 
        We use h-24 here. This means the top of your page content 
        MUST have at least 24 (6rem) of padding to prevent hiding!
      */}
      <div className="container mx-auto px-4 h-24 flex items-center justify-between">
        
        {/* 1. LOGO SECTION - RESTORED */}
        <Link to="/" className="flex items-center gap-2">
          {/* Ensure logo.png is in your /public folder */}
          <img src="/logo.png" alt="KCROC Logo" className="h-12 w-auto object-contain" />
        </Link>

        {/* 2. MAIN MENU (Desktop Only) */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link to={ROUTES.home} className="text-body font-bold text-slate-300 hover:text-brand-primary transition-colors">Home</Link>
          <Link to={ROUTES.services} className="text-body font-bold text-slate-300 hover:text-brand-primary transition-colors">Services</Link>
          <Link to={ROUTES.contact} className="text-body font-bold text-slate-300 hover:text-brand-primary transition-colors">Contact Us</Link>
        </nav>

        {/* 3. CALL TO ACTION */}
        <div className="flex items-center gap-4">
          <a 
            href={`tel:${BUSINESS_INFO.phone}`} 
            className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-brand-primary hover:bg-brand-accent text-brand-dark font-bold rounded-button transition-colors"
          >
            <Phone className="w-4 h-4" />
            {BUSINESS_INFO.phone}
          </a>
          
          {/* Mobile Menu Trigger */}
          <button className="lg:hidden p-2 text-brand-primary hover:text-brand-accent transition-colors">
            <Menu className="w-7 h-7" />
          </button>
        </div>
      </div>
    </header>
  );
};
