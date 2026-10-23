// File: src/components/home/ServicesGrid.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Laptop, Gamepad2, Cpu, Apple, Wrench, Truck } from 'lucide-react';
import { KCROC_GRAPH } from '../../data/graph';
import { ServiceEntity } from '../../types/knowledgeGraph';
import { useFadeIn } from '../../hooks/useFadeIn';
import { SectionHeader } from '@/components/ui/section-header';

const ICON_MAP: Record<string, React.ElementType> = {
  'apple': Apple,
  'laptop': Laptop,
  'gaming': Gamepad2,
  'cpu': Cpu,
};

const ServiceCard = React.memo(({ service, idx }: { service: ServiceEntity, idx: number }) => {
  const { ref, visible } = useFadeIn();
  const Icon = ICON_MAP[service.iconKey] || Wrench;
  const cardImage = service.contentImages?.[0];
  const cardText = service.shortDescription || service.description;

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${idx * 50}ms` }}
      className={`w-full transition-all duration-700 h-full ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >
      <Link
        to={`/${service.slug}`}
        className="group relative flex h-full min-h-[15rem] flex-col overflow-hidden rounded-2xl border border-white/[0.10] bg-kcroc-card transition-[border-color,background-color,transform] duration-300 hover:-translate-y-px hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dfa86f] focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark"
      >
        {cardImage && (
          <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden">
            <img
              src={cardImage.src}
              srcSet={`${cardImage.src.replace(/\.webp$/, '.w480.webp')} 480w, ${cardImage.src} ${cardImage.width || 1000}w`}
              alt={cardImage.alt}
              width={cardImage.width}
              height={cardImage.height}
              loading="lazy"
              decoding="async"
              fetchPriority="low"
              sizes="(max-width: 639px) 50vw, (max-width: 1023px) 50vw, 33vw"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-kcroc-card via-kcroc-card/10 to-transparent" />
          </div>
        )}
        <div className="flex flex-1 flex-col gap-2 p-4 sm:gap-3 sm:p-6 lg:p-8">
          <div className="mb-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.10] bg-white/[0.045] sm:mb-2 sm:h-10 sm:w-10">
            <Icon className="h-4 w-4 text-[#C4CDD1] sm:h-5 sm:w-5" aria-hidden="true" />
          </div>

          <h3 className="min-h-[2.3rem] text-sm font-semibold leading-snug text-white line-clamp-2 sm:min-h-[2.5rem] sm:text-base">
            {service.title}
          </h3>

          <p className="min-h-[3.75rem] text-xs leading-5 text-[#C4CDD1] line-clamp-3 sm:min-h-[4rem] sm:text-sm">
            {cardText}
          </p>

          <div className="mt-auto flex min-h-12 items-center gap-2 pt-2 text-xs font-bold text-[#E8BA90] sm:text-sm">
            <i className="ti ti-clock" aria-hidden="true" />
            Learn more
          </div>
        </div>
      </Link>
    </div>
  );
});

ServiceCard.displayName = 'ServiceCard';

export default function ServicesGrid() {
  const services = KCROC_GRAPH.services;
  const [showAllServices, setShowAllServices] = useState(false);
  const visibleServices = showAllServices ? services : services.slice(0, 6);
  const featuredServiceIds = ['srv-laptop', 'srv-screen', 'srv-battery'];
  const featuredServices = featuredServiceIds
    .map((id) => services.find((service) => service.id === id))
    .filter((service): service is ServiceEntity => Boolean(service));

  if (!services || services.length === 0) return null;

  return (
    <section className="w-full py-7 sm:py-14 px-4 sm:px-8 bg-brand-dark">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="What we fix"
          tone="copper"
          title="Laptop, MacBook & Computer Repair Services"
          description="From everyday laptop faults to board-level repairs, with dedicated pages for each service."
          className="mb-4 sm:mb-8"
        />

        {/* Mobile-first two-column service grid; desktop expands to three columns. */}
        <div id="homepage-services-grid" className="grid grid-cols-1 gap-4 min-[400px]:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {visibleServices.map((s, idx) => (
            <ServiceCard key={s.id} service={s} idx={idx} />
          ))}
        </div>

        {services.length > 6 && (
          <div className="mt-5 flex justify-center">
            <button
              type="button"
              aria-expanded={showAllServices}
              aria-controls="homepage-services-grid"
              onClick={() => setShowAllServices((current) => !current)}
              className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-xl border border-white/15 bg-white/[0.045] px-6 py-3 text-sm font-bold text-[#D4DBDE] transition-colors hover:border-[#dfa86f]/60 hover:bg-white/[0.07] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dfa86f] focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark motion-reduce:transition-none"
            >
              {showAllServices ? 'Show fewer services' : `Show all ${services.length} services`}
            </button>
          </div>
        )}

        <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-[#c9804d]/25 bg-[#c9804d]/[0.06] p-4 sm:mt-6 sm:flex-row sm:items-center sm:gap-4 sm:px-5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/[0.10] bg-white/[0.045] text-[#C4CDD1]">
            <Truck className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-extrabold text-white sm:text-base">Free pick-up &amp; drop across all Kuwait governorates</h3>
            <p className="mt-1 text-xs leading-relaxed text-[#C4CDD1] sm:text-sm">We collect from your home or office. Diagnosis first, quote second, repair only with your approval.</p>
          </div>
          <Link
            to="/book"
            className="inline-flex min-h-12 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-[#dfa86f] px-4 py-2.5 text-sm font-extrabold text-[#17110c] transition-colors hover:bg-[#efc697] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#efc697] focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark sm:w-auto"
          >
            Arrange free pickup <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {featuredServices.length > 0 && (
          <div className="mt-5 rounded-2xl border border-white/[0.08] bg-slate-900/35 px-4 py-4 sm:mt-7 sm:px-6">
            <p className="text-xs leading-relaxed text-[#C4CDD1] sm:text-sm">
              Need a specific repair? Go directly to our main laptop repair service, dedicated screen repair, or laptop battery replacement page.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {featuredServices.map((service) => (
                <Link
                  key={service.id}
                  to={`/${service.slug}`}
                  className="inline-flex min-h-12 items-center rounded-xl border border-white/[0.12] bg-white/[0.035] px-3 py-2 text-xs font-semibold text-[#D4DBDE] transition-colors hover:border-white/25 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#dfa86f] sm:text-sm"
                >
                  {service.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
