// File: app/frontend/src/core/components/layout/Footer.tsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
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

const ARABIC_PATHS: Record<string, string> = {
  '/services': '/ar/services',
  '/laptop-repair-kuwait': '/ar/laptop-repair-kuwait',
  '/macbook-repair-kuwait': '/ar/macbook-repair-kuwait',
  '/gaming-pc-repair-kuwait': '/ar/gaming-pc-repair-kuwait',
  '/macbook-screen-replacement-kuwait': '/ar/macbook-screen-replacement-kuwait',
  '/motherboard-repair-kuwait': '/ar/motherboard-repair-kuwait',
  '/laptop-screen-repair-kuwait': '/ar/laptop-screen-repair-kuwait',
  '/battery-replacement-kuwait': '/ar/battery-replacement-kuwait',
  '/laptop-charging-port-repair-kuwait': '/ar/laptop-charging-port-repair-kuwait',
  '/laptop-keyboard-replacement-kuwait': '/ar/laptop-keyboard-replacement-kuwait',
  '/ssd-ram-upgrade-kuwait': '/ar/ssd-ram-upgrade-kuwait',
  '/laptop-liquid-damage-repair-kuwait': '/ar/laptop-liquid-damage-repair-kuwait',
  '/computer-repair-kuwait': '/ar/computer-repair-kuwait',
  '/near-me': '/ar/near-me',
  '/locations': '/ar/near-me',
  '/pricing': '/ar/pricing',
  '/location/hawalli': '/ar/computer-repair-hawalli',
  '/location/salmiya': '/ar/computer-repair-salmiya',
  '/location/kuwait-city': '/ar/computer-repair-kuwait-city',
  '/location/farwaniya': '/ar/computer-repair-farwaniya',
  '/location/jahra': '/ar/computer-repair-jahra',
};

const ARABIC_SERVICE_LABELS: Record<string, string> = {
  '/laptop-repair-kuwait': 'تصليح اللابتوب',
  '/macbook-repair-kuwait': 'تصليح MacBook',
  '/gaming-pc-repair-kuwait': 'تصليح كمبيوتر الألعاب',
  '/gaming-laptop-cleaning-kuwait': 'تنظيف لابتوب الألعاب',
  '/motherboard-repair-kuwait': 'تصليح المذربورد واللوحة الأم',
  '/laptop-screen-repair-kuwait': 'تبديل شاشة اللابتوب',
  '/macbook-screen-replacement-kuwait': 'تبديل شاشة ماك بوك',
  '/battery-replacement-kuwait': 'تبديل بطارية اللابتوب وMacBook',
  '/laptop-charging-port-repair-kuwait': 'تصليح مدخل شحن اللابتوب',
  '/laptop-hinge-repair-kuwait': 'تصليح مفصلات وهيكل اللابتوب',
  '/laptop-keyboard-replacement-kuwait': 'تبديل كيبورد اللابتوب',
  '/ssd-ram-upgrade-kuwait': 'ترقية SSD وRAM',
  '/laptop-liquid-damage-repair-kuwait': 'تصليح أضرار السوائل',
};

const ARABIC_COMPANY_LABELS: Record<string, string> = {
  '/about': 'عن KCROC',
  '/contact': 'اتصل بنا',
  '/news': 'أخبار التقنية',
  '/blog': 'المدونة التقنية',
  '/guides/laptop-battery-warning-signs': 'دليل علامات تلف البطارية',
  '/faq': 'الأسئلة الشائعة',
  '/pricing': 'الأسعار',
  '/computer-repair-kuwait': 'تصليح الكمبيوتر في الكويت',
  '/near-me': 'فني كمبيوتر بالقرب منك',
  '/locations': 'مناطق الخدمة',
};

const ARABIC_AREA_LABELS: Record<string, string> = {
  '/location/hawalli': 'حولي',
  '/location/salmiya': 'السالمية',
  '/location/kuwait-city': 'مدينة الكويت',
  '/location/farwaniya': 'الفروانية',
  '/location/jahra': 'الجهراء',
  '/location/ahmadi': 'الأحمدي',
  '/location/fahaheel': 'الفحيحيل',
  '/location/mangaf': 'المنقف',
};

const ARABIC_TRUST_LABELS: Record<string, string> = {
  'Privacy Protected': 'حماية الخصوصية',
  'Free Pickup & Delivery': 'استلام وتوصيل مجاني',
  '30-Day Repair Warranty': 'ضمان 30 يومًا على الإصلاح',
  'ESD-Safe Lab': 'مختبر آمن ضد الكهرباء الساكنة',
};

const TRUST_ICON_MAP: Record<string, React.ElementType> = {
  ShieldCheck,
  Truck,
  Clock,
  Zap,
};

export function Footer() {
  const location = useLocation();
  const isArabicRoute = location.pathname === '/ar' || location.pathname.startsWith('/ar/') || location.pathname.startsWith('/blog/ar/') || location.pathname.startsWith('/guides/ar/');
  const isHawalliLandingPage = location.pathname.replace(/\/+$/, '') === '/location/hawalli';
  const localizedPath = (path: string) => isArabicRoute ? (ARABIC_PATHS[path] ?? path) : path;
  const serviceLabel = (path: string, label: string) => isArabicRoute ? (ARABIC_SERVICE_LABELS[path] ?? label.replace(' Kuwait', '')) : label.replace(' Kuwait', '');
  const companyLabel = (path: string, label: string) => isArabicRoute ? (ARABIC_COMPANY_LABELS[path] ?? label) : label;
  const areaLabel = (path: string, label: string) => isArabicRoute ? (ARABIC_AREA_LABELS[path] ?? label.replace('Computer Repair ', '')) : label.replace('Computer Repair ', '');
  const [logoError, setLogoError] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileCompanyOpen, setMobileCompanyOpen] = useState(false);
  const [mobileAreasOpen, setMobileAreasOpen] = useState(false);

  const business = NAV_GRAPH.business;
  const footerData = NAV_GRAPH.footer ? { links: NAV_GRAPH.footer } : null;
  const trustBadges = NAV_GRAPH.trustBadges;

  if (!business || !footerData) return null;

  const waMessage = isArabicRoute ? 'السلام عليكم KCROC، أحتاج مساعدة في تصليح جهاز كمبيوتر أو لابتوب في الكويت. فضلاً نسّقوا استلامًا مجانيًا.' : 'Hi KCROC, I need computer repair assistance in Kuwait.';
  const WA_LINK = 'https://wa.me/' + business.telephone + '?text=' + encodeURIComponent(waMessage);

  const brandLabel = business.alternateName || business.title;
  const facebookAriaLabel = brandLabel + ' on Facebook';
  const instagramAriaLabel = brandLabel + ' on Instagram';
  const googleAriaLabel = brandLabel + ' on Google';

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
        className="md:hidden flex min-h-12 w-full items-center justify-between text-start text-white font-bold py-2 mb-2 uppercase tracking-[0.16em] text-xs"
      >
        <span>{title}</span>
        <ChevronDown className={`w-4 h-4 text-[#dfa86f] transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>
    </>
  );

  return (
    <footer
      dir={isArabicRoute ? 'rtl' : undefined}
      lang={isArabicRoute ? 'ar-KW' : undefined}
      className="relative bg-[#0c1214]/[0.98] backdrop-blur-md border-t border-white/[0.10] pt-14 pb-28 md:pb-8 z-10"
      aria-label={isArabicRoute ? "تذييل الموقع" : "Site Footer"}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {trustBadges.length > 0 && !isHawalliLandingPage && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pb-10 mb-12 border-b border-white/[0.10]">
            {trustBadges.map((badge) => {
              const Icon = TRUST_ICON_MAP[badge.iconKey];
              return (
                <div
                  key={badge.id}
                  className="flex items-center justify-center gap-2 text-[11px] sm:text-xs font-semibold text-slate-400 uppercase tracking-[0.12em] text-center"
                >
                  {Icon && <Icon className="w-4 h-4 text-[#dfa86f] shrink-0" aria-hidden="true" />}
                  <span>{isArabicRoute ? (ARABIC_TRUST_LABELS[badge.title] ?? badge.title) : badge.title}</span>
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
                  src="/logo-128.webp"
                  srcSet="/logo-128.webp 128w, /logo-256.webp 256w"
                  sizes="(max-width: 640px) 80px, 112px"
                  alt={brandLabel + ' Logo'}
                  width="112"
                  height="112"
                  loading="lazy"
                  decoding="async"
                  className="h-20 sm:h-[5.5rem] w-auto object-contain"
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
                  {isArabicRoute ? `تقييم Google ${business.aggregateRating.ratingValue} · عرض المراجعات الحالية` : `${business.aggregateRating.ratingValue} Google rating · view current reviews`}
                </span>
              </div>
            )}

            <h2 className="text-white text-lg sm:text-xl font-bold leading-tight mb-2">
              {isArabicRoute ? 'تصليح الكمبيوتر واللابتوب في الكويت' : 'Trusted Computer & Laptop Repair in Kuwait'}
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-4 max-w-sm">
              {isArabicRoute ? 'تصليح اللابتوبات وأجهزة MacBook وكمبيوتر الألعاب في الكويت، مع استلام وتوصيل مجانيين وضمان 30 يومًا على الإصلاحات المشمولة.' : 'Professional repair for laptops, MacBooks, gaming PCs and computers. Free pick-up and delivery across all Kuwait governorates. No Fix, No Fee.'}
            </p>

            {business.openingHours && (
              <p className="flex items-center gap-2 text-slate-500 text-xs mb-5">
                <Clock className="w-4 h-4 text-[#dfa86f] flex-shrink-0" aria-hidden="true" />
                {isArabicRoute && business.openingHours === 'Open daily 10:00 AM – 10:00 PM' ? 'يوميًا من 10 صباحًا إلى 10 مساءً' : business.openingHours}
              </p>
            )}

            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center gap-2 text-[#dfa86f] hover:text-white font-bold transition-colors"
            >
              <MessageCircle size={19} aria-hidden="true" />
              <span>{isArabicRoute ? 'راسلنا عبر واتساب' : 'Chat with us on WhatsApp'}</span>
            </a>

            {(business.socialLinks?.facebook || business.socialLinks?.instagram || business.socialLinks?.googleMaps) && (
              <div className="flex items-center gap-3 mt-5">
                {business.socialLinks.facebook && (
                  <a
                    href={business.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={facebookAriaLabel}
                    className="w-12 h-12 flex items-center justify-center rounded-full border border-white/[0.10] text-slate-400 hover:text-[#dfa86f] hover:border-[#c9804d]/30 transition-colors"
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
                    className="w-12 h-12 flex items-center justify-center rounded-full border border-white/[0.10] text-slate-400 hover:text-[#dfa86f] hover:border-[#c9804d]/30 transition-colors"
                  >
                    <Instagram size={16} aria-hidden="true" />
                  </a>
                )}
                {business.socialLinks.googleMaps && (
                  <a
                    href={business.socialLinks.googleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={googleAriaLabel}
                    className="w-12 h-12 flex items-center justify-center rounded-full border border-white/[0.10] text-slate-400 hover:text-[#dfa86f] hover:border-[#c9804d]/30 transition-colors"
                  >
                    <MapPin size={16} aria-hidden="true" />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Services */}
          <nav aria-label={isArabicRoute ? "روابط خدمات الإصلاح" : "Expert Services Navigation"}>
            <CollapsibleHeading
              title={isArabicRoute ? "الخدمات" : "Services"}
              open={mobileServicesOpen}
              onToggle={() => setMobileServicesOpen((value) => !value)}
            />
            <ul className={`${mobileServicesOpen ? 'block' : 'hidden'} md:block space-y-3`}>
              {visibleServices.map((link) => (
                <li key={link.path}>
                  <Link to={localizedPath(link.path)} className="inline-flex min-h-12 items-center text-slate-400 hover:text-[#dfa86f] transition-colors text-sm">
                    {serviceLabel(link.path, link.label)}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link to={localizedPath("/services")} className="inline-flex min-h-12 items-center gap-1.5 text-[#dfa86f] hover:text-white transition-colors text-sm font-bold">
                  {isArabicRoute ? "عرض جميع الخدمات" : "View all services"} <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </nav>

          {/* Quick Links */}
          <nav aria-label={isArabicRoute ? "روابط معلومات الشركة" : "Company Navigation"}>
            <CollapsibleHeading
              title={isArabicRoute ? "روابط مهمة" : "Quick Links"}
              open={mobileCompanyOpen}
              onToggle={() => setMobileCompanyOpen((value) => !value)}
            />
            <ul className={`${mobileCompanyOpen ? 'block' : 'hidden'} md:block space-y-3`}>
              {footerData.links.company.map((link) => (
                <li key={link.path}>
                  <Link to={localizedPath(link.path)} className="inline-flex min-h-12 items-center text-slate-400 hover:text-[#dfa86f] transition-colors text-sm">
                    {companyLabel(link.path, link.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact + Service Areas */}
          <div>
            <h3 className="text-white font-bold mb-5 uppercase tracking-[0.16em] text-xs">{isArabicRoute ? "تواصل معنا" : "Contact"}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-slate-400 text-sm">
                <MapPin className="w-5 h-5 text-[#dfa86f] flex-shrink-0 mt-0.5" aria-hidden="true" />
                <address className="not-italic leading-relaxed">{isArabicRoute ? "شارع ابن خلدون، مجمع الملا، السرداب، محل 19، حولي، الكويت" : `${business.streetAddress}, ${business.addressLocality}, Kuwait`}</address>
              </li>
              <li className="flex items-center gap-3 text-slate-400 text-sm">
                <Phone className="w-5 h-5 text-[#dfa86f] flex-shrink-0" aria-hidden="true" />
                <a href={'tel:+' + business.telephone} className="inline-flex min-h-12 items-center hover:text-white transition-colors">
                  +965 {business.telephone.replace(/^965/, '')}
                </a>
              </li>
              <li className="pt-1">
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-[#dfa86f] px-4 py-2.5 text-sm font-black text-[#101416] hover:bg-[#efc19c] transition-colors"
                >
                  <CalendarClock className="w-4 h-4" aria-hidden="true" />
                  {isArabicRoute ? "احجز استلام مجاني" : "BOOK FREE PICKUP"}
                </a>
                <span className="block text-slate-500 text-xs mt-2 ml-1">{isArabicRoute ? "استلام وتوصيل مجاني في مناطق الكويت" : "Pick-up & drop across all Kuwait governorates"}</span>
              </li>
            </ul>

            <div className="mt-8 pt-6 border-t border-white/[0.08]">
              <CollapsibleHeading
                title={isArabicRoute ? `مناطق الخدمة (${totalAreas})` : `Service Areas (${totalAreas})`}
                desktopLabel={isArabicRoute ? "مناطق الاستلام الشائعة" : "Popular Service Areas"}
                open={mobileAreasOpen}
                onToggle={() => setMobileAreasOpen((value) => !value)}
              />
              <div className={`${mobileAreasOpen ? 'block' : 'hidden'} md:block`}>
                <nav aria-label={isArabicRoute ? "روابط مناطق الخدمة" : "Footer service areas"}>
                  <ul role="list" className="flex flex-wrap gap-2">
                    {visibleAreas.map((area) => (
                      <li key={area.path}>
                        <Link
                          to={localizedPath(area.path)}
                          className="inline-flex min-h-12 items-center text-xs text-slate-400 hover:text-[#dfa86f] transition-colors bg-white/[0.03] px-2.5 py-2 rounded border border-white/[0.10]"
                        >
                          {areaLabel(area.path, area.label)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
                <Link to={localizedPath("/locations")} className="inline-flex min-h-12 items-center gap-1.5 mt-4 text-[#dfa86f] hover:text-white transition-colors text-sm font-bold">
                  {isArabicRoute ? `عرض كل ${totalAreas} منطقة خدمة` : `View all ${totalAreas} service areas`} <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Legal */}
        <div className="border-t border-white/[0.10] pt-7 mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs sm:text-sm text-center md:text-left">
            {isArabicRoute ? `© ${new Date().getFullYear()} ${business.legalName}. جميع الحقوق محفوظة.` : `© ${new Date().getFullYear()} ${business.legalName}. All rights reserved.`}
          </p>
          <div role="group" aria-label={isArabicRoute ? "سياسات وإعدادات الموقع" : "Site policies and settings"} className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
            <span className="inline-flex items-center gap-3">
              <Link to="/privacy-policy" className="min-h-12 inline-flex items-center text-slate-400 hover:text-white text-xs sm:text-sm transition-colors" aria-label={isArabicRoute ? "سياسة الخصوصية" : "Privacy Policy"}>{isArabicRoute ? "سياسة الخصوصية" : "Privacy Policy"}</Link>
              <span aria-hidden="true" className="text-slate-700">·</span>
            </span>
            <span className="inline-flex items-center gap-3">
              <Link to="/terms-of-service" className="min-h-12 inline-flex items-center text-slate-400 hover:text-white text-xs sm:text-sm transition-colors" aria-label={isArabicRoute ? "شروط الخدمة" : "Terms of Service"}>{isArabicRoute ? "شروط الخدمة" : "Terms of Service"}</Link>
              <span aria-hidden="true" className="text-slate-700">·</span>
            </span>
            <button type="button" onClick={openConsentPreferences} className="min-h-12 inline-flex items-center text-slate-400 hover:text-white text-xs sm:text-sm transition-colors" aria-label={isArabicRoute ? "إعدادات ملفات الارتباط" : "Cookie Settings"}>{isArabicRoute ? "إعدادات ملفات الارتباط" : "Cookie Settings"}</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
