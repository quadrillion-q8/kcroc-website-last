// File: app/frontend/src/pages/Locations.tsx
// Service-area hub for KCROC's dedicated Kuwait location pages.
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, MessageCircle, ShieldCheck, Truck } from 'lucide-react';
import { KCROC_GRAPH } from '../data/graph';
import { SEOEngine } from '../core/components/SEOEngine';

export default function Locations() {
  const locations = [...KCROC_GRAPH.locations].sort((a, b) => {
    const aName = a.title.replace(/ Repair Center$/i, '');
    const bName = b.title.replace(/ Repair Center$/i, '');
    return aName.localeCompare(bName);
  });

  const business = KCROC_GRAPH.business!;
  const waLink = `https://wa.me/${business.telephone}?text=${encodeURIComponent(
    'Hi KCROC, I need computer repair pickup in Kuwait.'
  )}`;

  return (
    <>
      <SEOEngine entityId="page-locations" />

      <main className="min-h-screen bg-transparent text-white pt-28 sm:pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-xs sm:text-sm text-slate-500">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-[#dfa86f]">Service Areas</li>
            </ol>
          </nav>

          <header className="max-w-4xl mb-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#dfa86f]/20 bg-[#dfa86f]/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#dfa86f] mb-5">
              <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
              {locations.length} dedicated service areas
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] mb-6">
              Computer &amp; Laptop Repair Service Areas Across Kuwait
            </h1>
            <p className="text-lg sm:text-xl text-slate-400 leading-relaxed max-w-3xl">
              Find your area below. KCROC provides free pickup and delivery across Kuwait, while diagnosis and repair are completed at the central Hawalli workshop.
            </p>
          </header>

          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5" aria-label="KCROC service areas">
            {locations.map((location) => {
              const name = location.title.replace(/ Repair Center$/i, '');
              return (
                <Link
                  key={location.id}
                  to={`/location/${location.slug}`}
                  className="group rounded-2xl border border-white/[0.08] bg-white/[0.025] hover:bg-white/[0.045] hover:border-[#dfa86f]/35 transition-all p-5 sm:p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-[#dfa86f]" aria-hidden="true" />
                        <span className="text-[11px] uppercase tracking-[0.14em] text-slate-500 font-bold">
                          {location.isPhysicalLocation ? 'Repair Lab' : 'Service Area'}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold text-white group-hover:text-[#dfa86f] transition-colors">
                        Computer Repair {name}
                      </h2>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-[#dfa86f] group-hover:translate-x-1 transition-all mt-1 shrink-0" aria-hidden="true" />
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed mt-4 line-clamp-3">
                    {location.description}
                  </p>
                </Link>
              );
            })}
          </section>

          <section className="mt-14 grid lg:grid-cols-3 gap-5">
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6">
              <ShieldCheck className="w-6 h-6 text-[#dfa86f] mb-4" aria-hidden="true" />
              <h2 className="text-lg font-bold text-white mb-2">One clear service model</h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                The listed areas are dedicated service-area pages, not claims of separate branches. Your device is collected from your home or office and processed at our Hawalli lab.
              </p>
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6">
              <Truck className="w-6 h-6 text-[#dfa86f] mb-4" aria-hidden="true" />
              <h2 className="text-lg font-bold text-white mb-2">Free pickup &amp; delivery</h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                Book collection from your area and we handle the transport. After repair and testing, your device is returned to you.
              </p>
            </div>
            <div className="rounded-2xl border border-[#dfa86f]/20 bg-[#dfa86f]/[0.06] p-6">
              <MessageCircle className="w-6 h-6 text-[#dfa86f] mb-4" aria-hidden="true" />
              <h2 className="text-lg font-bold text-white mb-2">Not sure which area to choose?</h2>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                Send us your location on WhatsApp and we can arrange the correct pickup route.
              </p>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-[#dfa86f] px-4 py-2.5 text-sm font-black text-[#101416] hover:bg-[#efc19c] transition-colors"
              >
                WhatsApp KCROC <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
