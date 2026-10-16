// File: app/frontend/src/pages/Services.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Laptop, Apple, Gamepad2, Cpu, Monitor, Wrench, ChevronRight, MapPin, BookOpen, MessageCircle } from 'lucide-react';
import { KCROC_GRAPH } from '../data/graph';
import { SEOEngine } from '../core/components/SEOEngine';

// Keep service cards connected to the knowledge graph so titles and URLs stay consistent.
const ICON_MAP: Record<string, React.ElementType> = {
  apple: Apple,
  laptop: Laptop,
  gaming: Gamepad2,
  cpu: Cpu,
  monitor: Monitor,
};

export default function Services() {
  const services = KCROC_GRAPH.services.filter((service) => service.isActive);

  return (
    <>
      <SEOEngine entityId="page-services" />

      <div className="min-h-screen bg-transparent text-white pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <header className="mb-12 max-w-4xl">
            <p className="text-xs uppercase tracking-[0.22em] font-bold text-emerald-400 mb-4">
              Laptop, PC, MacBook & component-level repairs
            </p>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
              Computer Repair Services in Kuwait
            </h1>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl">
              Choose a repair by device or fault. KCROC checks the symptoms, diagnoses the likely cause, explains the recommended work and shares a quote for approval before proceeding. Devices are handled at our Hawalli repair lab, with pickup and return arranged across Kuwait.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Link to="/book" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-emerald-500 px-6 py-3 font-bold text-slate-950 transition hover:bg-emerald-400">
                <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" /> Describe your repair
              </Link>
              <Link to="/near-me" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-700 px-6 py-3 font-bold text-white transition hover:border-emerald-500/60 hover:bg-slate-900">
                <MapPin className="mr-2 h-5 w-5" aria-hidden="true" /> Check local pickup
              </Link>
            </div>
          </header>

          <section aria-labelledby="service-list-heading">
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 id="service-list-heading" className="text-2xl md:text-3xl font-black text-white">Browse repair services</h2>
                <p className="mt-2 text-sm text-slate-400">Open a service page for the common symptoms, repair options and next steps.</p>
              </div>
              <span className="text-sm text-slate-500">{services.length} available service categories</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => {
                const ServiceIcon = ICON_MAP[service.iconKey] || Wrench;
                return (
                  <Link
                    key={service.id}
                    to={`/${service.slug}`}
                    className="group flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-900/80 p-7 transition duration-300 hover:border-emerald-500/50 hover:bg-slate-800/70"
                  >
                    <div className="mb-5 flex items-start justify-between gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-slate-800 bg-brand-dark transition-transform duration-300 group-hover:scale-105">
                        <ServiceIcon className="h-7 w-7 text-emerald-500" aria-hidden="true" />
                      </div>
                      {service.pricing?.displayLabel && (
                        <span className="rounded-full border border-emerald-500/20 bg-emerald-900/20 px-3 py-1 text-xs font-bold text-emerald-300">
                          {service.pricing.displayLabel}
                        </span>
                      )}
                    </div>
                    <h3 className="mb-3 text-xl font-bold text-white transition-colors group-hover:text-emerald-400">{service.title}</h3>
                    <p className="mb-6 flex-1 leading-relaxed text-slate-400">{service.description}</p>
                    <span className="inline-flex items-center text-sm font-bold text-emerald-400">
                      View repair details <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>

          <section className="mt-16 grid gap-5 border-t border-slate-800 pt-10 md:grid-cols-3" aria-label="Find the right next step">
            <Link to="/problems" className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition hover:border-emerald-500/40">
              <Wrench className="mb-4 h-6 w-6 text-emerald-400" aria-hidden="true" />
              <h2 className="text-lg font-bold text-white group-hover:text-emerald-300">Start with a symptom</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">Not sure which service applies? Browse common issues such as overheating, charging faults, startup failures and screen problems.</p>
              <span className="mt-4 inline-flex items-center text-sm font-bold text-emerald-400">Browse problems <ChevronRight className="ml-1 h-4 w-4" aria-hidden="true" /></span>
            </Link>
            <Link to="/near-me" className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition hover:border-emerald-500/40">
              <MapPin className="mb-4 h-6 w-6 text-emerald-400" aria-hidden="true" />
              <h2 className="text-lg font-bold text-white group-hover:text-emerald-300">Arrange service in your area</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">See how pickup and return work for customers across Kuwait and where repairs are carried out.</p>
              <span className="mt-4 inline-flex items-center text-sm font-bold text-emerald-400">Local service details <ChevronRight className="ml-1 h-4 w-4" aria-hidden="true" /></span>
            </Link>
            <Link to="/blog" className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-6 transition hover:border-emerald-500/40">
              <BookOpen className="mb-4 h-6 w-6 text-emerald-400" aria-hidden="true" />
              <h2 className="text-lg font-bold text-white group-hover:text-emerald-300">Learn before you book</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">Read practical troubleshooting and buying guides to understand the problem and your options.</p>
              <span className="mt-4 inline-flex items-center text-sm font-bold text-emerald-400">Read repair guides <ChevronRight className="ml-1 h-4 w-4" aria-hidden="true" /></span>
            </Link>
          </section>
        </div>
      </div>
    </>
  );
}
