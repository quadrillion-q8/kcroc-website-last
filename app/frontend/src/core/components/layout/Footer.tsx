// File: app/frontend/src/core/components/layout/Footer.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, MessageCircle, CalendarClock, ShieldCheck, Clock, Star, Facebook, Instagram, Truck, Zap } from 'lucide-react';

// ✅ FIXED: Correct relative path to reach the data folder
import { KCROC_GRAPH } from '../../../data/graph';

const TRUST_ICON_MAP: Record<string, React.ElementType> = {
  ShieldCheck,
  Truck,
  Clock,
  Zap,
};

export function Footer() {
  const [logoError, setLogoError] = useState(false);

  // Hook directly into the Knowledge Graph
  const business = KCROC_GRAPH.business;
  const footerData = KCROC_GRAPH.footer;
  const trustBadges = KCROC_GRAPH.trustBadges;

  // Failsafe in case graph is missing
  if (!business || !footerData) return null;

  const WA_LINK = `https://wa.me/${business.telephone}?text=${encodeURIComponent("Hi KCROC, I need computer repair assistance in Kuwait.")}`;

  return (
    <footer className="relative bg-[#0a0f1c]/80 backdrop-blur-md border-t border-slate-800/50 pt-16 pb-8 z-10" aria-label="Site Footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {trustBadges.length > 0 && (
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 pb-12 mb-12 border-b border-slate-800/50">
            {trustBadges.map((badge) => {
              const Icon = TRUST_ICON_MAP[badge.iconKey];
              return (
                <div key={badge.id} className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {Icon && <Icon className="w-4 h-4 text-cyan-400" aria-hidden="true" />}
                  {badge.title}
                </div>
              );
            })}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Info */}
          <div>
            <Link to="/" className="flex items-center mb-6 block w-fit" aria-label="Return to KCROC home page">
              {!logoError ? (
                <img 
                  src={business.logoUrl} 
                  alt={`${business.alternateName || business.title} Logo`} 
                  width="112"
                  height="112"
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
            {business.aggregateRating && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex" aria-hidden="true">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-cyan-400" />
                  ))}
                </div>
                <span className="text-slate-400 text-xs font-medium">
                  {business.aggregateRating.ratingValue} · {business.aggregateRating.reviewCount}+ reviews
                </span>
              </div>
            )}

            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Professional computer and laptop repair in Kuwait. Free pickup & delivery across all governorates. No Fix, No Fee.
            </p>

            {business.openingHours && (
              <p className="flex items-center gap-2 text-slate-500 text-xs mb-6">
                <Clock className="w-4 h-4 text-cyan-400 flex-shrink-0" aria-hidden="true" />
                {business.openingHours}
              </p>
            )}

            <div className="flex items-center gap-4">
              <a 
                href={WA_LINK} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-bold transition-colors"
              >
                <MessageCircle size={20} aria-hidden="true" /> WhatsApp Us
              </a>
            </div>

            {(business.socialLinks?.facebook || business.socialLinks?.instagram) && (
              <div className="flex items-center gap-3 mt-5">
                {business.socialLinks.facebook && (
                  <a
                    href={business.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${business.alternateName || business.title} on Facebook`}
                    className="w-9 h-9 flex items-center justify-center rounded-full border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-colors"
                  >
                    <Facebook size={16} aria-hidden="true" />
                  </a>
                )}
                {business.socialLinks.instagram && (
                  <a
                    href={business.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${business.alternateName || business.title} on Instagram`}
                    className="w-9 h-9 flex items-center justify-center rounded-full border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-colors"
                  >
                    <Instagram size={16} aria-hidden="true" />
                  </a>
                )}
              </div>
            )}
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

          {/* Contact & Service Areas */}
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
              <li className="flex items-center gap-3 text-slate-400 text-sm mt-4">
                <CalendarClock className="w-5 h-5 text-cyan-400 flex-shrink-0" aria-hidden="true" />
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="text-cyan-400 font-bold hover:text-cyan-300 transition-colors">
                  Book Free Pickup Now
                </a>
              </li>
            </ul>

            {/* Service Areas Rendered as small badges */}
            <div className="mt-6">
              <h4 className="text-slate-500 font-bold text-xs uppercase mb-3">Service Areas</h4>
              <div className="flex flex-wrap gap-2">
                {footerData.links.areas.map((area, idx) => (
                  <Link key={idx} to={area.path} className="text-xs text-slate-400 hover:text-cyan-400 transition-colors bg-slate-900/50 px-2 py-1 rounded border border-slate-800">
                    {area.label.replace('Computer Repair ', '')}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Legal */}
        <div className="border-t border-slate-800/50 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} {business.legalName}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-slate-600 hover:text-slate-400 text-sm transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-slate-600 hover:text-slate-400 text-sm transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
