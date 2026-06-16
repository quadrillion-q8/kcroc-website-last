import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../../constants/data';

export default function MobileCTA() {
  const waMessage = encodeURIComponent("Hi KCROC, I need computer repair in Kuwait. Please arrange free pickup & diagnostic.");
  const waLink = `https://wa.me/${BUSINESS_INFO.cleanPhone}?text=${waMessage}`;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-950/90 backdrop-blur-xl border-t border-slate-800/80 p-4 flex justify-center gap-3 z-50 md:hidden">
      <a 
        href={waLink} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="flex-1 bg-cyan-500 py-3 rounded-xl text-slate-950 font-black text-center text-sm shadow-[0_0_15px_rgba(6,182,212,0.3)] tracking-wider uppercase flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-cyan-400 outline-none"
      >
        <MessageCircle className="w-4 h-4" aria-hidden="true" /> Chat
      </a>
      <a 
        href={`tel:${BUSINESS_INFO.phone}`} 
        className="flex-1 bg-slate-900 border border-slate-700 py-3 rounded-xl text-white font-bold text-center text-sm tracking-wider uppercase flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-cyan-400 outline-none"
      >
        <Phone className="w-4 h-4 text-cyan-400" aria-hidden="true" /> Call Lab
      </a>
    </div>
  );
}
