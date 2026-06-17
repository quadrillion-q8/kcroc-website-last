import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Phone } from 'lucide-react';
import { BUSINESS_INFO } from '../../constants/data';

export default function StickyCTA() {
  const waMessage = encodeURIComponent("Hi KCROC, I would like to book a repair service.");
  const waLink = `https://wa.me/${BUSINESS_INFO.cleanPhone}?text=${waMessage}`;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 w-full z-[999] p-4 bg-slate-950/80 backdrop-blur-lg border-t border-slate-800 flex gap-3">
      <a 
        href={waLink} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="flex-1 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)]"
      >
        <MessageCircle size={18} /> WhatsApp
      </a>
      <a 
        href={`tel:${BUSINESS_INFO.phone}`} 
        className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all border border-slate-700"
      >
        <Phone size={18} /> Call
      </a>
    </div>
  );
}
