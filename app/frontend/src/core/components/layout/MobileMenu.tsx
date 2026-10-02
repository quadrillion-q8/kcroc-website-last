// File: app/frontend/src/core/components/layout/MobileMenu.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, matchPath } from 'react-router-dom';
import {
  ChevronDown,
  ChevronRight,
  Phone,
  CalendarCheck,
  X,
  Wrench,
  ShieldCheck,
  Laptop,
  Apple,
  Gamepad2,
  Cpu,
  Monitor,
  BatteryWarning,
  HardDrive,
  MapPin,
  MessageCircle,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { CompiledNavigationModel, MegaMenuConfig } from '../../navigation/types';
import { useAnalytics } from '../../analytics/AnalyticsProvider';
import { getLanguageSwitchPath } from '../../../utils/locale';

const ICON_REGISTRY: Record<string, React.ElementType> = {
  apple: Apple,
  laptop: Laptop,
  gaming: Gamepad2,
  cpu: Cpu,
  monitor: Monitor,
  battery: BatteryWarning,
  hardDrive: HardDrive,
  'hard-drive': HardDrive,
  shield: ShieldCheck,
  wrench: Wrench,
  'map-pin': MapPin,
};
const getIcon = (key: string) => ICON_REGISTRY[key] ?? Wrench;

const MENU_COPY: Record<string, { eyebrow: string; subtitle: string; allLabel: string; allHref: string }> = {
  services_mega: { eyebrow: 'REPAIR SERVICES', subtitle: 'Find the right repair by device or fault.', allLabel: 'All services', allHref: '/services' },
  brands_mega: { eyebrow: 'SUPPORTED BRANDS', subtitle: 'Browse brands supported by the KCROC lab.', allLabel: 'All brands', allHref: '/brands' },
  problems_mega: { eyebrow: 'COMMON PROBLEMS', subtitle: 'Start with the symptom and work toward the cause.', allLabel: 'All problems', allHref: '/problems' },
  case_studies_mega: { eyebrow: 'REAL REPAIR STORIES', subtitle: 'See difficult faults that made it to the bench.', allLabel: 'All case studies', allHref: '/case-studies' },
  pricing_mega: { eyebrow: 'REPAIR PRICING', subtitle: 'See starting points before you book a diagnosis.', allLabel: 'Full pricing', allHref: '/pricing' },
  blog_mega: { eyebrow: 'TECH BLOG', subtitle: 'Useful tech articles for everyday users.', allLabel: 'All articles', allHref: '/blog' },
  news_mega: { eyebrow: 'TECH NEWS', subtitle: 'Current computer, Windows, hardware, gaming, Apple, cybersecurity and AI news with technician context.', allLabel: 'All news', allHref: '/news' },
  guides_mega: { eyebrow: 'TROUBLESHOOTING GUIDES', subtitle: 'Safe, practical steps before you book repair.', allLabel: 'All guides', allHref: '/guides' },
  locations_mega: { eyebrow: 'KUWAIT SERVICE AREAS', subtitle: 'Browse all 31 pickup and delivery service areas.', allLabel: 'All 31 areas', allHref: '/locations' },
  resources_mega: { eyebrow: 'KCROC RESOURCES', subtitle: 'Guides, blog, news and real repair case studies.', allLabel: 'Start with guides', allHref: '/guides' },
  about_mega: { eyebrow: 'KCROC', subtitle: 'The lab, the team and the Kuwait service area.', allLabel: 'About KCROC', allHref: '/about' },
};

const getMenuCopy = (id: string) => MENU_COPY[id] ?? { eyebrow: 'KCROC', subtitle: 'Component-level repair and practical technical guidance.', allLabel: 'Explore', allHref: '/' };

const getIndexEntity = (config: MegaMenuConfig) => config.sections.flatMap(section => section.items).find((item) => item.entityType === 'Page' && /^(services|brands|problems|case-studies|pricing|blog|news|guides)$/.test(item.slug));
const getMoreItems = (config: MegaMenuConfig) => {
  const featured = new Set((config.featured ?? []).map(item => item.slug));
  return config.sections.flatMap(section => section.items).filter(item => !featured.has(item.slug));
};

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  mobileRef: React.RefObject<HTMLDivElement>;
  navModel: CompiledNavigationModel;
  cleanTel: string;
  phoneDisplay: string;
  triggerRef?: React.RefObject<HTMLButtonElement>;
}

export default function MobileMenu({ isOpen, onClose, mobileRef, navModel, cleanTel, phoneDisplay, triggerRef }: MobileMenuProps) {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const location = useLocation();
  const languageSwitch = getLanguageSwitchPath(location.pathname);
  const { trackConversion } = useAnalytics();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    onClose();
    setOpenAccordion(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key !== 'Tab' || !mobileRef.current) return;
      const focusable = Array.from(mobileRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')).filter((el) => el.tabIndex !== -1);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, mobileRef, onClose]);

  useEffect(() => {
    if (isOpen) {
      wasOpenRef.current = true;
      requestAnimationFrame(() => closeButtonRef.current?.focus());
    } else if (wasOpenRef.current) {
      wasOpenRef.current = false;
      triggerRef?.current?.focus();
    }
  }, [isOpen, triggerRef]);

  const toggleAccordion = (id: string) => {
    setOpenAccordion(prev => prev === id ? null : id);
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-[90] bg-black/70 backdrop-blur-md transition-opacity duration-300 motion-reduce:transition-none xl:hidden ${isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={mobileRef}
        id="mobile-nav-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        aria-hidden={!isOpen}
        className={`fixed inset-y-0 right-0 z-[100] w-full max-w-lg border-l border-white/[0.08] bg-[#0b1012] shadow-[0_30px_90px_rgba(0,0,0,0.6)] transform transition-transform duration-300 ease-out motion-reduce:transition-none xl:hidden flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="shrink-0 border-b border-white/[0.08] bg-[#0b1012]/95 px-4 pb-4 pt-[max(0.75rem,env(safe-area-inset-top))] backdrop-blur-xl sm:px-5">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="kcroc-kicker">NAVIGATION</span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#c9804d]/20 bg-[#c9804d]/[0.07] px-2 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#efc19c]">
                  <Sparkles className="h-3 w-3" aria-hidden="true" />
                  KCROC
                </span>
              </div>
              <p className="mt-1 text-sm font-semibold text-slate-400">Repair, guides and service areas in one place.</p>
            </div>
            <div className="flex items-center gap-1">
              <Link
                to={languageSwitch.href}
                lang={languageSwitch.targetLanguage === 'ar' ? 'ar' : 'en'}
                onClick={onClose}
                className="min-h-11 min-w-11 rounded-xl border border-white/[0.09] px-3 text-xs font-black text-slate-200 transition-colors hover:border-[#c9804d]/40 hover:text-[#efc19c] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfa86f]"
              >
                {languageSwitch.targetLanguage === 'ar' ? 'عربي' : 'EN'}
              </Link>
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="min-h-11 min-w-11 flex items-center justify-center rounded-xl border border-white/[0.06] text-slate-400 transition-colors hover:bg-white/[0.04] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfa86f]"
                aria-label="Close menu"
                tabIndex={isOpen ? 0 : -1}
              >
                <X size={22} aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <a
              href={`tel:+${cleanTel}`}
              onClick={() => trackConversion('phone_call_click', { cta_name: 'mobile_menu_quick_call', button_position: 'mobile_menu' })}
              tabIndex={isOpen ? 0 : -1}
              className="min-h-11 rounded-xl border border-white/[0.07] bg-white/[0.025] px-2.5 py-2 text-center text-xs font-bold text-slate-200 transition-colors hover:border-[#c9804d]/25 hover:bg-[#c9804d]/[0.05] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfa86f]"
            >
              <span className="flex items-center justify-center gap-1.5"><Phone className="h-3.5 w-3.5 text-[#dfa86f]" aria-hidden="true" /> Call</span>
            </a>
            <a
              href={`https://wa.me/${cleanTel}`}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackConversion('cta_click', { cta_name: 'mobile_menu_quick_whatsapp', button_position: 'mobile_menu' })}
              tabIndex={isOpen ? 0 : -1}
              className="min-h-11 rounded-xl border border-[#25D366]/15 bg-[#25D366]/[0.06] px-2.5 py-2 text-center text-xs font-bold text-[#7cf0ab] transition-colors hover:border-[#25D366]/30 hover:bg-[#25D366]/[0.10] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
            >
              <span className="flex items-center justify-center gap-1.5"><MessageCircle className="h-3.5 w-3.5" aria-hidden="true" /> WhatsApp</span>
            </a>
            <Link
              to="/book"
              onClick={() => trackConversion('cta_click', { cta_name: 'mobile_menu_quick_book', button_position: 'mobile_menu' })}
              tabIndex={isOpen ? 0 : -1}
              className="min-h-11 rounded-xl bg-[#c9804d] px-2.5 py-2 text-center text-xs font-black text-[#100d0a] transition-colors hover:bg-[#dfa86f] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfa86f]"
            >
              <span className="flex items-center justify-center gap-1.5"><CalendarCheck className="h-3.5 w-3.5" aria-hidden="true" /> Book</span>
            </Link>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-5" style={{ WebkitOverflowScrolling: 'touch' }}>
          <div className="space-y-3">
            {navModel.header.map((link) => {
              const isActive = link.href !== '/' && link.href !== '#' && !!matchPath({ path: link.href, end: false }, location.pathname);
              const isHomeActive = link.href === '/' && location.pathname === '/';
              const activelyHighlighted = isActive || isHomeActive;

              if (link.hasMega && link.megaMenuId) {
                const megaConfig = navModel.megaMenus[link.megaMenuId];
                if (!megaConfig) return null;

                const isExpanded = openAccordion === link.id;
                const copy = getMenuCopy(link.megaMenuId);
                const indexEntity = getIndexEntity(megaConfig);
                const allHref = indexEntity ? `/${indexEntity.slug}` : copy.allHref;
                const moreItems = getMoreItems(megaConfig);

                return (
                  <section key={link.id} className={`overflow-hidden rounded-2xl border transition-colors ${isExpanded || activelyHighlighted ? 'border-[#c9804d]/30 bg-[#c9804d]/[0.04]' : 'border-white/[0.07] bg-white/[0.018]'}`}>
                    <button
                      type="button"
                      onClick={() => toggleAccordion(link.id)}
                      aria-expanded={isExpanded}
                      aria-controls={`mobile-mega-${link.id}`}
                      tabIndex={isOpen ? 0 : -1}
                      className={`w-full min-h-14 flex items-center justify-between gap-3 px-4 py-3.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfa86f] ${isExpanded ? 'text-white' : 'text-slate-100'}`}
                    >
                      <span className="min-w-0">
                        <span className="block text-sm font-black">{link.label}</span>
                        <span className="mt-0.5 block truncate text-[11px] font-medium text-slate-500">{copy.subtitle}</span>
                      </span>
                      <ChevronDown className={`h-5 w-5 shrink-0 transition-transform motion-reduce:transition-none ${isExpanded ? 'rotate-180 text-[#dfa86f]' : 'text-slate-600'}`} aria-hidden="true" />
                    </button>

                    <div
                      id={`mobile-mega-${link.id}`}
                      className={`grid transition-[grid-template-rows,opacity] duration-300 motion-reduce:transition-none ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                    >
                      <div className="min-h-0 overflow-hidden border-t border-white/[0.07]">
                        <div className="space-y-5 px-3 pb-4 pt-4">
                          <div className="flex items-center justify-between gap-3 rounded-xl border border-[#c9804d]/15 bg-[#c9804d]/[0.045] px-3 py-3">
                            <div className="min-w-0">
                              <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#dfa86f]">{copy.eyebrow}</p>
                              <p className="mt-1 text-xs leading-5 text-slate-400">{copy.subtitle}</p>
                            </div>
                            <Link
                              to={allHref}
                              onClick={() => onClose()}
                              tabIndex={isOpen ? 0 : -1}
                              className="inline-flex min-h-10 shrink-0 items-center gap-1 rounded-lg border border-white/[0.08] bg-black/10 px-3 text-xs font-extrabold text-white hover:border-[#c9804d]/30 hover:text-[#efc19c] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfa86f]"
                            >
                              {copy.allLabel}
                              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                            </Link>
                          </div>

                          {megaConfig.featured?.length ? (
                            <div>
                              <div className="mb-2 flex items-center justify-between px-1">
                                <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-500">Featured</p>
                                <span className="text-[10px] font-bold text-slate-700">{megaConfig.featured.length}</span>
                              </div>
                              <div className="space-y-2">
                                {megaConfig.featured.map((entity) => {
                                  const Icon = getIcon(entity.iconKey);
                                  return (
                                    <Link
                                      key={entity.slug}
                                      to={`/${entity.slug}`}
                                      onClick={() => trackConversion('cta_click', { cta_name: 'mobile_mega_featured', button_position: 'mobile_menu' })}
                                      tabIndex={isOpen ? 0 : -1}
                                      className="group flex min-h-14 items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.018] px-3 py-2.5 transition-colors hover:border-[#c9804d]/25 hover:bg-[#c9804d]/[0.045] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfa86f]"
                                    >
                                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#c9804d]/20 bg-[#c9804d]/[0.08] text-[#dfa86f]">
                                        <Icon className="h-4 w-4" aria-hidden="true" />
                                      </div>
                                      <span className="min-w-0 flex-1 text-sm font-bold leading-5 text-slate-100 group-hover:text-[#efc19c]">{entity.title}</span>
                                      <ChevronRight className="h-4 w-4 shrink-0 text-slate-700 group-hover:text-[#dfa86f]" aria-hidden="true" />
                                    </Link>
                                  );
                                })}
                              </div>
                            </div>
                          ) : null}

                          {moreItems.length ? (
                            <div>
                              <div className="mb-2 flex items-center justify-between px-1">
                                <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-500">Explore more</p>
                                <span className="text-[10px] font-bold text-slate-700">{moreItems.length} links</span>
                              </div>
                              <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                                {moreItems.map((entity) => {
                                  const Icon = getIcon(entity.iconKey);
                                  return (
                                    <Link
                                      key={entity.slug}
                                      to={`/${entity.slug}`}
                                      onClick={() => trackConversion('cta_click', { cta_name: 'mobile_mega_link', button_position: 'mobile_menu' })}
                                      tabIndex={isOpen ? 0 : -1}
                                      className="group flex min-h-11 items-center gap-2.5 rounded-xl border border-transparent px-3 py-2.5 text-xs font-semibold text-slate-400 transition-colors hover:border-white/[0.06] hover:bg-white/[0.035] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfa86f]"
                                    >
                                      <Icon className="h-3.5 w-3.5 shrink-0 text-slate-600 group-hover:text-[#dfa86f]" aria-hidden="true" />
                                      <span className="min-w-0 flex-1 truncate">{entity.title}</span>
                                      <ChevronRight className="h-3.5 w-3.5 shrink-0 text-slate-800 group-hover:text-[#dfa86f]" aria-hidden="true" />
                                    </Link>
                                  );
                                })}
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </section>
                );
              }

              return (
                <Link
                  key={link.id}
                  to={link.href}
                  tabIndex={isOpen ? 0 : -1}
                  className={`flex min-h-14 items-center justify-between gap-3 rounded-2xl border px-4 py-3 font-bold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfa86f] ${activelyHighlighted ? 'border-[#c9804d]/30 bg-[#c9804d]/[0.06] text-[#efc19c]' : 'border-white/[0.07] bg-white/[0.018] text-slate-200 hover:border-white/[0.11] hover:bg-white/[0.035]'}`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="h-4 w-4 text-slate-600" aria-hidden="true" />
                </Link>
              );
            })}
          </div>
        </div>

        <div className="shrink-0 border-t border-white/[0.08] bg-[#0b1012]/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl sm:px-5">
          <a
            href={`https://wa.me/${cleanTel}`}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackConversion('cta_click', { cta_name: 'mobile_menu_footer_whatsapp', button_position: 'mobile_menu' })}
            tabIndex={isOpen ? 0 : -1}
            className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-black text-[#062b16] transition-all hover:brightness-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            WhatsApp a technician
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <p className="mt-2 text-center text-[10px] font-medium text-slate-600">{phoneDisplay} · Free pickup & delivery across Kuwait</p>
        </div>
      </div>
    </>
  );
}
