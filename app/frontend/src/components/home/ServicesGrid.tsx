// File: src/components/home/ServicesGrid.tsx
import React from 'react';
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
        className="group block relative bg-kcroc-card rounded-[16px] border border-white/[0.08] hover:border-kcroc-cyan transition-[border-color,background-color,transform] duration-300 hover:-translate-y-px h-full overflow-hidden"
      >
        {cardImage && (
          <div className="relative h-28 sm:h-40 overflow-hidden">
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
        <div className="flex flex-col h-full gap-1.5 sm:gap-3 p-3.5 sm:p-6">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-[10px] bg-kcroc-cyan/10 border border-kcroc-cyan/25 flex items-center justify-center mb-1 sm:mb-2">
            <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-kcroc-cyan" />
          </div>

          <h3 className="text-sm sm:text-[15px] font-semibold text-white leading-tight">
            {service.title}
          </h3>

          <p className="text-kcroc-muted text-xs sm:text-[13px] leading-relaxed line-clamp-2">
            {cardText}
          </p>

          <div className="text-[#dfa86f] text-[11px] sm:text-xs font-bold flex items-center gap-1 mt-1 sm:mt-2">
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
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
          {services.map((s, idx) => (
            <ServiceCard key={s.id} service={s} idx={idx} />
          ))}
        </div>

        <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-[#c9804d]/25 bg-[#c9804d]/[0.06] p-4 sm:mt-6 sm:flex-row sm:items-center sm:gap-4 sm:px-5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#c9804d]/25 bg-[#c9804d]/[0.10] text-[#dfa86f]">
            <Truck className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-extrabold text-white sm:text-base">Free pick-up &amp; drop across all Kuwait governorates</h3>
            <p className="mt-1 text-xs leading-relaxed text-slate-300 sm:text-sm">We collect from your home or office. Diagnosis first, quote second, repair only with your approval.</p>
          </div>
          <Link
            to="/book"
            className="inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-[#dfa86f] px-4 py-2.5 text-sm font-extrabold text-[#17110c] transition-colors hover:bg-[#efc697] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#efc697] focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark sm:w-auto"
          >
            Arrange free pickup <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {featuredServices.length > 0 && (
          <div className="mt-5 rounded-2xl border border-white/[0.08] bg-slate-900/35 px-4 py-4 sm:mt-7 sm:px-6">
            <p className="text-xs leading-relaxed text-kcroc-muted sm:text-sm">
              Need a specific repair? Go directly to our main laptop repair service, dedicated screen repair, or laptop battery replacement page.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {featuredServices.map((service) => (
                <Link
                  key={service.id}
                  to={`/${service.slug}`}
                  className="inline-flex items-center rounded-full border border-kcroc-cyan/25 bg-kcroc-cyan/5 px-3 py-2 text-xs font-semibold text-kcroc-cyan transition-colors hover:border-kcroc-cyan/50 hover:bg-kcroc-cyan/10 sm:text-sm"
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
