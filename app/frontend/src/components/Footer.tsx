// File: src/components/Footer.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, MessageCircle, CalendarClock, ShieldCheck } from 'lucide-react';

// ✅ FIXED: Correct relative path (one level up to src, then into data)
import { KCROC_GRAPH } from '../data/graph';

export default function Footer() {
  const [logoError, setLogoError] = useState(false);

  // Hook directly into the Knowledge Graph
  const business = KCROC_GRAPH.business;
  const footerData = KCROC_GRAPH.footer;

  if (!business || !footerData) return null;

  const WA_LINK = `https://wa.me/${business.telephone}?text=${encodeURIComponent("Hi KCROC, I need computer repair assistance in Kuwait.")}`;

  return (
    <footer className="relative bg-[#0a0f1c]/80 backdrop-blur-md border-t border-slate-800/50 pt-16 pb-8 z-10" aria-label="Site Footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Info */}
          <div>
            <Link to="/" className="flex items-center mb-6 block w-fit" aria-label="Return to KCROC home page">
              {!logoError ? (
                <img 
                  src={business.logoUrl} 
                  alt={`${business.alternateName || business.title} Logo`} 
                  className="h-14 w-auto object-contain rounded-xl" 
                  onError={() => setLogoError(true)} 
                />
              ) : (
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-8 h-8 text-cyan-400" aria-hidden="true" />
                  <span className="text-2xl font-black text-white tracking-tight">{business.alternateName || 'KCROC'}</span>
                </div>
              )}
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Professional computer and laptop repair in Kuwait. Free pickup & delivery across all governorates. No Fix, No Fee.
            </p>
            <a 
              href={WA_LINK} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-bold transition-colors"
            >
              <MessageCircle size={20} aria-hidden="true" /> WhatsApp Us
            </a>
          </div>

          {/* Expert Services */}
          <nav aria-label="Expert Services Navigation">
            <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Expert Services</h3>
            <ul className="space-y-3">
              {footerData.links.services.map((link, idx) => (
                <li key={idx}>
                  <Link to={link.path} className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company Links */}
          <nav aria-label="Company Navigation">
            <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Quick Links</h3>
            <ul className="space-y-3">
              {footerData.links.company.map((link, idx) => (
                <li key={idx}>
                  <Link to={link.path} className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Connect</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-slate-400 text-sm">
                <MapPin className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span className="leading-tight">{business.streetAddress}, {business.addressLocality}</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400 text-sm">
                <Phone className="w-5 h-5 text-cyan-400 flex-shrink-0" aria-hidden="true" />
                <a href={`tel:+${business.telephone}`} className="hover:text-white transition-colors">
                  +{business.telephone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal */}
        <div className="border-t border-slate-800/50 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} {business.legalName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
