// File: app/frontend/src/core/components/layout/Footer.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Mail, ChevronRight } from 'lucide-react';
import { BUSINESS_INFO } from '../../../../constants';
import { getPopularServices } from '../../../../knowledge/registry';

export const Footer: React.FC = () => {
  // Pull our services from the Knowledge Graph
  const services = getPopularServices();
  const currentYear = new Date().getFullYear();

  return (
    
      
        
          
          {/* Column 1: Brand & Contact */}
          
            KCROC
            
              Enterprise-grade computer, laptop, and MacBook repair services in Kuwait. We bring the lab to your door.
            
            
              
                
                {BUSINESS_INFO.phone}
              
              
                
                {BUSINESS_INFO.address}
              
            
          

          {/* Column 2: Dynamic Services */}
          
            Our Services
            
              {services.map((service) => (
                
                  
                    
                    {service.name}
                  
                
              ))}
            
          

          {/* Column 3: Hours & Trust */}
          
            Operating Hours
            
              
                Monday - Sunday
                24 Hours / On Call
              
            
            
              
                Free Pick & Drop available across all governorates in Kuwait. No-fix, no-fee guarantee.
              
            
          

        

        {/* Copyright Bar */}
        
          © {currentYear} Kuwait Computer Repair On Call. All rights reserved.
          
            Privacy Policy
            Terms of Service
          
        
      
    
  );
};
