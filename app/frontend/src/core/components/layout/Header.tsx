// File: app/frontend/src/core/components/layout/Header.tsx
import React from 'react';
import { Phone } from 'lucide-react';
import { BUSINESS_INFO } from '../../../constants/data';

export const Header: React.FC = () => {
  return (
    // Uses your glass surface token and sticky z-index
    <header className="fixed top-0 w-full z-sticky bg-surface-glass backdrop-blur-md border-b border-surface-hover">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        
        {/* Logo Section using your new font-heading */}
        <a href="/" className="flex items-center gap-2">
          <span className="text-h3 font-heading font-black text-white">
            KC<span className="text-brand-primary">ROC</span>
          </span>
        </a>

        {/* Global Call-to-Action using your button shapes and brand colors */}
        <a 
          href={`tel:${BUSINESS_INFO.phone}`} 
          className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-brand-primary hover:bg-brand-accent text-brand-dark font-bold rounded-button transition-colors"
        >
          <Phone className="w-4 h-4" />
          {BUSINESS_INFO.phone}
        </a>
      </div>
    </header>
  );
};
