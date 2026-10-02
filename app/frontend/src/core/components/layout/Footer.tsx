// File: app/frontend/src/core/components/layout/Footer.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  MessageCircle,
  CalendarClock,
  ShieldCheck,
  Clock,
  Star,
  Facebook,
  Instagram,
  Truck,
  Zap,
  ChevronDown,
  ArrowRight,
} from 'lucide-react';

// PERF: Footer renders on every route. It only needs a handful of small
// fields (business contact info, footer links, trust badges) - not the full
// ~190KB knowledge graph. NAV_GRAPH is a generated slim projection of
// graph.ts (see scripts/generate-nav-data.ts) kept in sync automatically.
import { NAV_GRAPH } from '../../../data/navGraph.generated';
import { openConsentPreferences } from '../../privacy/consent';

const TRUST_ICON_MAP: Record<string, React.ElementType> = {
  ShieldCheck,
  Truck,
  Clock,
  Zap,
};

export function Footer() {
  const [logoError, setLogoError] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileCompanyOpen, setMobileCompanyOpen] = useState(false);
  const [mobileAreasOpen, setMobileAreasOpen] = useState(false);

  const business = NAV_GRAPH.business;
  const footerData = NAV_GRAPH.footer ? { links: NAV_GRAPH.footer } : null;
  const trustBadges = NAV_GRAPH.trustBadges;

  if (!business || !footerData) return null;

  const waMessage = 'Hi KCROC, I need computer repair assistance in Kuwait.';
  const WA_LINK = 'https://wa.me/' + business.telephone + '?text=' + encodeURIComponent(waMessage);

  const brandLabel = business.alternateName || business.title;
  const facebookAriaLabel = brandLabel + ' on Facebook';
  const instagramAriaLabel = brandLabel + ' on Instagram';

  const visibleServices = footerData.links.services.slice(0, 8);
  const visibleAreas = footerData.links.areas.slice(0, 8);
  const totalAreas = footerData.links.areas.length;

  const CollapsibleHeading = ({
    title,
    open,
    onToggle,
    desktopLabel,
  }: {
    title: string;
    open: boolean;
    onToggle: () => void;
    desktopLabel?: string;
  }) => (
    <>
      <h3 className="hidden md:block text-white font-bold mb-6 uppercase tracking-[0.16em] text-xs">
        {desktopLabel || title}
      </h3>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="md:hidden w-full flex items-center justify-between text-left text-white font-bold py-2 mb-2 uppercase tracking-[0.16em] text-xs"
      >
        <span>{title}</span>
        <ChevronDown className={`w-4 h-4 text-[#dfa86f] transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>
    </>
  );

  return (
    <footer
      className="relative bg-[#0c1214]/[0.98] backdrop-blur-md border-t border-white/[0.10] pt-14 pb-28 md:pb-8 z-10"
      aria-label="Site Footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {trustBadges.length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pb-10 mb-12 border-b border-white/[0.10]">
            {trustBadges.map((badge) => {
              const Icon = TRUST_ICON_MAP[badge.iconKey];
              return (
                <div
                  key={badge.id}
                  className="flex items-center justify-center gap-2 text-[11px] sm:text-xs font-semibold text-slate-400 uppercase tracking-[0.12em] text-center"
                >
                  {Icon && <Icon className="w-4 h-4 text-[#dfa86f] shrink-0" aria-hidden="true" />}
                  <span>{badge.title}</span>
                </div>
              );
            })}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-flex items-center mb-5" aria-label="Return to KCROC home page">
              {!logoError ? (
                <img
                  src="/logo.webp"
                  alt={brandLabel + ' Logo'}
                  width="112"
                  height="112"
                  loading="lazy"
                  decoding="async"
                  className="h-16 sm:h-[4.5rem] w-auto object-contain"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-8 h-8 text-[#dfa86f]" aria-hidden="true" />
                  <span className="text-2xl font-black text-white tracking-tight">{business.alternateName || 'KCROC'}</span>
                </div>
              )}
            </Link>

            {business.aggregateRating && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex" aria-hidden="true">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-[#dfa86f]" />
                  ))}
                </div>
                <span className="text-slate-400 text-xs font-medium">
                  {business.aggregateRating.ratingValue} - {business.aggregateRating.reviewCount}+ reviews
                </span>
              </div>
            )}

            <h2 className="text-white text-lg sm:text-xl font-bold leading-tight mb-2">
              Trusted Computer &amp; Laptop Repair in Kuwait
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-4 max-w-sm">
              Professional repair for laptops, MacBooks, gaming PCs and computers. Free pickup and delivery across Kuwait. No Fix, No Fee.
            </p>

            {business.openingHours && (
              <p className="flex items-center gap-2 text-slate-500 text-xs mb-5">
                <Clock className="w-4 h-4 text-[#dfa86f] flex-shrink-0" aria-hidden="true" />
                {business.openingHours}
              </p>
            )}

            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#dfa86f] hover:text-white font-bold transition-colors"
            >
              <MessageCircle size={19} aria-hidden="true" />
              <span>Chat with us on WhatsApp</span>
            </a>

            {(business.socialLinks?.facebook || business.socialLinks?.instagram) && (
              <div className="flex items-center gap-3 mt-5">
                {business.socialLinks.facebook && (
                  <a
                    href={business.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={facebookAriaLabel}
                    className="w-9 h-9 flex items-center justify-center rounded-full border border-white/[0.10] text-slate-400 hover:text-[#dfa86f] hover:border-[#c9804d]/30 transition-colors"
                  >
                    <Facebook size={16} aria-hidden="true" />
                  </a>
                )}
                {business.socialLinks.instagram && (
                  <a
                    href={business.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={instagramAriaLabel}
                    className="w-9 h-9 flex items-center justify-center rounded-full border border-white/[0.10] text-slate-400 hover:text-[#dfa86f] hover:border-[#c9804d]/30 transition-colors"
                  >
                    <Instagram size={16} aria-hidden="true" />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Services */}
          <nav aria-label="Expert Services Navigation">
            <CollapsibleHeading
              title="Services"
              open={mobileServicesOpen}
              onToggle={() => setMobileServicesOpen((value) => !value)}
            />
            <ul className={`${mobileServicesOpen ? 'block' : 'hidden'} md:block space-y-3`}>
              {visibleServices.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-slate-400 hover:text-[#dfa86f] transition-colors text-sm">
                    {link.label.replace(' Kuwait', '')}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link to="/services" className="inline-flex items-center gap-1.5 text-[#dfa86f] hover:text-white transition-colors text-sm font-bold">
                  View all services <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </nav>

          {/* Quick Links */}
          <nav aria-label="Company Navigation">
            <CollapsibleHeading
              title="Quick Links"
              open={mobileCompanyOpen}
              onToggle={() => setMobileCompanyOpen((value) => !value)}
            />
            <ul className={`${mobileCompanyOpen ? 'block' : 'hidden'} md:block space-y-3`}>
              {footerData.links.company.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-slate-400 hover:text-[#dfa86f] transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact + Service Areas */}
          <div>
            <h3 className="text-white font-bold mb-5 uppercase tracking-[0.16em] text-xs">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-slate-400 text-sm">
                <MapPin className="w-5 h-5 text-[#dfa86f] flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span className="leading-relaxed">{business.streetAddress}, {business.addressLocality}</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400 text-sm">
                <Phone className="w-5 h-5 text-[#dfa86f] flex-shrink-0" aria-hidden="true" />
                <a href={'tel:+' + business.telephone} className="hover:text-white transition-colors">
                  +965 {business.telephone.slice(3, 6)} {business.telephone.slice(6, 9)} {business.telephone.slice(9)}
                </a>
              </li>
              <li className="pt-1">
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#dfa86f] px-4 py-2.5 text-sm font-black text-[#101416] hover:bg-[#efc19c] transition-colors"
                >
                  <CalendarClock className="w-4 h-4" aria-hidden="true" />
                  BOOK FREE PICKUP
                </a>
                <span className="block text-slate-500 text-xs mt-2 ml-1">Pickup &amp; delivery across Kuwait</span>
              </li>
            </ul>

            <div className="mt-8 pt-6 border-t border-white/[0.08]">
              <CollapsibleHeading
                title={`Service Areas (${totalAreas})`}
                desktopLabel="Popular Service Areas"
                open={mobileAreasOpen}
                onToggle={() => setMobileAreasOpen((value) => !value)}
              />
              <div className={`${mobileAreasOpen ? 'block' : 'hidden'} md:block`}>
                <div className="flex flex-wrap gap-2">
                  {visibleAreas.map((area) => (
                    <Link
                      key={area.path}
                      to={area.path}
                      className="text-xs text-slate-400 hover:text-[#dfa86f] transition-colors bg-white/[0.03] px-2 py-1.5 rounded border border-white/[0.10]"
                    >
                      {area.label.replace('Computer Repair ', '')}
                    </Link>
                  ))}
                </div>
                <Link to="/locations" className="inline-flex items-center gap-1.5 mt-4 text-[#dfa86f] hover:text-white transition-colors text-sm font-bold">
                  View all {totalAreas} service areas <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Legal */}
        <div className="border-t border-white/[0.10] pt-7 mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs sm:text-sm text-center md:text-left">
            {'© ' + new Date().getFullYear() + ' ' + business.legalName + '. All rights reserved.'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link to="/privacy-policy" className="text-slate-600 hover:text-slate-400 text-xs sm:text-sm transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-slate-600 hover:text-slate-400 text-xs sm:text-sm transition-colors">Terms of Service</Link>
            <button type="button" onClick={openConsentPreferences} className="text-slate-600 hover:text-slate-400 text-xs sm:text-sm transition-colors">Cookie Settings</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
