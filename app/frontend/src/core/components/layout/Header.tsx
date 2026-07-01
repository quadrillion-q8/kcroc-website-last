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
    
      
        
        {/* Logo / Brand Anchor */}
        
          
          KCROC
        

        {/* Desktop Menu */}
        
          
            Home
          
          
            
              Services
            
            {/* Mega Dropdown */}
            
              {services.map((service) => (
                
                  {service.name}
                
              ))}
            
          
        

        {/* Desktop Action Call Button */}
        
          
             {BUSINESS_INFO.phone}
          
        

        {/* Mobile Menu Toggle Button */}
         setIsOpen(!isOpen)}
          className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
          aria-label="Toggle navigation menu"
        >
          {isOpen ?  : }
        
      

      {/* Mobile Overlay Menu */}
      {isOpen && (
        
          
             setIsOpen(false)}
              className="text-body font-bold text-white border-b border-surface-hover pb-2"
            >
              Home
            
            
              Our Services
            
            
              {services.map((service) => (
                 setIsOpen(false)}
                  className="text-body text-slate-300 hover:text-brand-primary transition-colors"
                >
                  {service.name}
                
              ))}
            
          
          
           {
              handlePhoneClick();
              setIsOpen(false);
            }}
            className="flex items-center justify-center gap-2 w-full py-4 bg-brand-primary text-brand-dark font-bold rounded-button transition-all text-body"
          >
             Call {BUSINESS_INFO.phone}
          
        
      )}
    
  );
};
