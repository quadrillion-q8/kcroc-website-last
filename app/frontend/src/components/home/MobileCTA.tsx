import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../../constants/data';

export default function MobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 w-full z-50 flex border-t border-slate-800 bg-slate-900/95 backdrop-blur-md">
      <a 
        href={`https://wa.me/${BUSINESS_INFO.cleanPhone}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-2 py-4 text-cyan-400 border-r border-slate-800 hover:bg-slate-800 transition-colors"
        aria-label="Message Kuwait Computer Repair On Call on WhatsApp for assistance"
      >
        <MessageCircle size={20} />
        <span className="font-bold">WhatsApp</span>
      </a>
      <a 
        href={`tel:${BUSINESS_INFO.phone}`} 
        className="flex-1 flex items-center justify-center gap-2 py-4 text-white hover:bg-slate-800 transition-colors"
        aria-label="Call Kuwait Computer Repair On Call directly at 55301913"
      >
        <Phone size={20} />
        <span className="font-bold">Call</span>
      </a>
    </div>
  );
}
