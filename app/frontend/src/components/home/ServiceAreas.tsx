// File: app/frontend/src/components/home/ServiceAreas.tsx
import React from 'react';
import { KCROC_GRAPH } from '../../data/graph';
import { MapPin, ShieldCheck, Truck, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const GOVERNORATES = [
  { name: 'Capital', arabic: 'العاصمة', path: '/location/kuwait-city', note: 'Kuwait City & nearby business districts' },
  { name: 'Hawalli', arabic: 'حولي', path: '/location/hawalli', note: 'Central lab & nearby residential areas' },
  { name: 'Farwaniya', arabic: 'الفروانية', path: '/location/farwaniya', note: 'Farwaniya, Khaitan & Riggae' },
  { name: 'Ahmadi', arabic: 'الأحمدي', path: '/location/ahmadi', note: 'Ahmadi, Fahaheel & coastal areas' },
  { name: 'Jahra', arabic: 'الجهراء', path: '/location/jahra', note: 'Jahra and surrounding areas' },
  { name: 'Mubarak Al-Kabeer', arabic: 'مبارك الكبير', path: '/location/mubarak-al-kabeer', note: 'Adan, Qurain & Sabah Al-Salem' },
];

export const ServiceAreas = () => {
  const loc = KCROC_GRAPH.entities['loc-hawalli'] as any;
  const areas = loc?.serviceAreas || [];

  return (
    <section className="py-12 sm:py-24 px-4 sm:px-6 bg-slate-900/40 border-t border-slate-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center mb-10 sm:mb-14">
          <div>
            <div className="mb-4 inline-flex min-h-10 items-center gap-2 rounded-lg border border-white/[0.12] bg-white/[0.04] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#D4DBDE]">
              <MapPin className="w-3.5 h-3.5" aria-hidden="true" /> Kuwait-Wide Pickup
            </div>
            <h2 className="text-white text-3xl sm:text-4xl font-black mb-4">Free Pickup &amp; Delivery Across Kuwait</h2>
            <p className="mb-6 text-base leading-relaxed text-[#C4CDD1]">
              Based in Hawalli (Al-Mulla Complex), KCROC collects laptops, MacBooks, gaming PCs and other computers from homes and offices across Kuwait. Repairs are completed at the central lab, then the device is returned after testing. See our main pages for{' '}
              <Link to="/laptop-repair-kuwait" className="font-semibold text-[#D4DBDE] underline decoration-white/35 underline-offset-4 hover:text-white">laptop repair in Kuwait</Link>
              {' '}and{' '}
              <Link to="/computer-repair-kuwait" className="font-semibold text-[#D4DBDE] underline decoration-white/35 underline-offset-4 hover:text-white">computer repair in Kuwait</Link>.
            </p>

            <div className="mb-5 grid grid-cols-1 gap-3 min-[400px]:grid-cols-2">
              {GOVERNORATES.map((gov) => (
                <Link
                  key={gov.name}
                  to={gov.path}
                  className="group min-h-[76px] rounded-2xl border border-white/[0.10] bg-white/[0.025] p-3.5 transition hover:border-white/20 hover:bg-white/[0.045] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfa86f]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-white group-hover:text-cyan-300">{gov.name}</span>
                        <span className="text-xs text-[#B7C1C5]">{gov.arabic}</span>
                      </div>
                      <p className="mt-1 text-xs leading-5 text-[#B7C1C5] line-clamp-2">{gov.note}</p>
                    </div>
                    <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-[#AAB5B9] group-hover:text-white" aria-hidden="true" />
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-5 flex flex-col sm:flex-row gap-2.5">
              <Link to="/near-me" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.035] px-4 py-3 text-sm font-bold text-[#D4DBDE] transition hover:border-white/20 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dfa86f]">
                <MapPin className="h-4 w-4" aria-hidden="true" /> Find computer repair near you
              </Link>
              <Link to="/location/hawalli" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.025] px-4 py-3 text-sm font-bold text-[#D4DBDE] transition hover:border-white/20 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dfa86f]">
                Computer Repair Hawalli <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-2.5 text-xs font-semibold text-[#C4CDD1] sm:flex sm:flex-wrap">
              <div className="flex min-h-12 items-center gap-2 rounded-xl border border-white/[0.10] bg-white/[0.035] px-3.5 py-2.5">
                <Truck className="h-4 w-4 text-[#AAB5B9]" aria-hidden="true" /> Free Door-to-Door Collection
              </div>
              <div className="flex min-h-12 items-center gap-2 rounded-xl border border-white/[0.10] bg-white/[0.035] px-3.5 py-2.5">
                <ShieldCheck className="h-4 w-4 text-[#AAB5B9]" aria-hidden="true" /> Secure Transport
              </div>
            </div>
          </div>

          <div className="relative group rounded-3xl overflow-hidden border border-slate-800 bg-brand-dark shadow-2xl">
            <div className="aspect-[16/9] sm:aspect-[16/10] relative overflow-hidden">
              <picture>
                <source media="(max-width: 640px)" srcSet="/images/kcroc-pc-doctor-windows-repair-services.webp" />
                <img
                  src="/images/kcroc-pc-doctor-windows-repair-services.webp"
                  alt="KCROC computer repair technicians serving customers across Kuwait from the Hawalli lab"
                  width="960"
                  height="524"
                  sizes="(max-width: 1023px) 100vw, 50vw"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-70" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-xl border border-white/[0.12] bg-brand-dark/90 px-4 py-2 text-xs font-bold text-[#D4DBDE] backdrop-blur-md sm:bottom-4 sm:left-4 sm:right-4">
                <span className="truncate">Hawalli Lab · Pickup &amp; Delivery</span>
                <span className="text-[#D4DBDE]">Kuwait-wide</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 min-[400px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {areas.map((area: string) => (
            <span key={area} className="flex min-h-12 min-w-0 items-center rounded-xl border border-white/[0.10] bg-white/[0.035] px-3 py-2 text-sm leading-snug text-[#D4DBDE] whitespace-normal break-words">
              {area}
            </span>
          ))}
        </div>

        {/* Existing Arabic commercial URLs are surfaced from the homepage for bilingual local discovery.
            This strengthens internal paths without generating thin service-by-area URL combinations. */}
        <section
          dir="rtl"
          lang="ar"
          aria-labelledby="ar-local-heading"
          className="mt-10 w-full min-w-0 max-w-full rounded-2xl border border-white/[0.10] bg-slate-950/40 p-4 text-start sm:p-6"
        >
          <p className="text-sm font-bold text-[#D4DBDE]">خدمة الكمبيوتر واللابتوب في الكويت</p>
          <h3 id="ar-local-heading" className="mt-2 break-words text-xl font-black leading-snug text-white sm:text-2xl">تبحث عن فني كمبيوتر أو تصليح لابتوب؟</h3>
          <p className="mt-3 max-w-3xl break-words text-sm leading-7 text-[#D4DBDE]">
            نشخص أعطال الكمبيوتر واللابتوب قبل الإصلاح، ونرتب استلام الجهاز من المنزل أو المكتب وتوصيله من مختبرنا في حولي. اختر الخدمة المناسبة أو افتح صفحة المنطقة لمعرفة تفاصيل التغطية.
          </p>
          <ul className="mt-4 flex min-w-0 list-none flex-wrap gap-2 p-0">
            {[
              { label: 'فني كمبيوتر في الكويت', path: '/ar/computer-repair-kuwait' },
              { label: 'تصليح كمبيوتر بالقرب مني', path: '/ar/near-me' },
              { label: 'تصليح كمبيوتر حولي', path: '/ar/computer-repair-hawalli' },
              { label: 'تصليح لابتوب', path: '/ar/laptop-repair-kuwait' },
              { label: 'تبديل بطارية', path: '/ar/battery-replacement-kuwait' },
              { label: 'تبديل شاشة', path: '/ar/laptop-screen-repair-kuwait' },
              { label: 'تبديل كيبورد', path: '/ar/laptop-keyboard-replacement-kuwait' },
              { label: 'ترقية SSD وRAM', path: '/ar/ssd-ram-upgrade-kuwait' },
            ].map((item) => (
              <li key={item.path} className="max-w-full min-w-0">
                <Link to={item.path} className="inline-flex min-h-12 max-w-full items-center justify-center rounded-xl border border-white/[0.12] bg-white/[0.035] px-3.5 py-2.5 text-center text-sm font-semibold leading-snug text-[#D4DBDE] transition hover:border-white/25 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dfa86f]">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
};
