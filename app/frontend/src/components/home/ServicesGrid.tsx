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
  const cardImage =
    service.contentImages?.find((image) => image.placement === 'hero') ??
    service.contentImages?.find((image) => image.placement === 'coreFeatures') ??
    service.contentImages?.find((image) => image.placement === 'commonIssues') ??
    service.contentImages?.[0];
  const cardText = service.shortDescription || service.description;

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${idx * 50}ms` }}
      className={`w-full transition-all duration-700 h-full ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >
      <Link
        to={`/${service.slug}`}
        className="group relative flex h-full min-h-[15rem] flex-col overflow-hidden rounded-2xl border border-[#e4dbd0] bg-white shadow-sm transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-px hover:border-[#c9804d]/55 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8f4f2c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f4efe7]"
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
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent" />
          </div>
        )}
        <div className="flex flex-1 flex-col gap-2 p-4 sm:gap-3 sm:p-6 lg:p-8">
          <div className="mb-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#e8ded2] bg-[#f4efe7] sm:mb-2 sm:h-10 sm:w-10">
            <Icon className="h-4 w-4 text-[#8f4f2c] sm:h-5 sm:w-5" aria-hidden="true" />
          </div>

          <h3 className="min-h-[2.3rem] text-sm font-semibold leading-snug text-[#172022] line-clamp-2 sm:min-h-[2.5rem] sm:text-base">
            {service.title}
          </h3>

          <p className="min-h-[3.75rem] text-xs leading-5 text-[#566467] line-clamp-3 sm:min-h-[4rem] sm:text-sm">
            {cardText}
          </p>

          <div className="mt-auto flex min-h-12 items-center gap-2 pt-2 text-xs font-bold text-[#8f4f2c] sm:text-sm">
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
    <section className="kcroc-section-light kcroc-editorial-section w-full border-y border-[#e7ded3] px-4 py-10 sm:px-8 sm:py-16">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="What we fix"
          tone="ink"
          title="Laptop, MacBook & Computer Repair Services"
          description="From everyday laptop faults to board-level repairs, with dedicated pages for each service."
          className="mb-4 sm:mb-8"
        />

        {/* Mobile-first two-column service grid; desktop expands to three columns. */}
        <div id="homepage-services-grid" className="grid grid-cols-1 gap-4 min-[560px]:grid-cols-2 sm:gap-5 lg:grid-cols-3">
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
              className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-xl border border-[#d8cfc3] bg-white px-6 py-3 text-sm font-bold text-[#263234] transition-colors hover:border-[#c9804d]/65 hover:bg-[#fffaf4] hover:text-[#8f4f2c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8f4f2c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f4efe7] motion-reduce:transition-none"
            >
              {showAllServices ? 'Show fewer services' : `Show all ${services.length} services`}
            </button>
          </div>
        )}

        <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-[#decbb8] bg-white p-4 shadow-sm sm:mt-6 sm:flex-row sm:items-center sm:gap-4 sm:px-5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#e8ded2] bg-[#f4efe7] text-[#8f4f2c]">
            <Truck className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-extrabold text-[#172022] sm:text-base">Free pick-up &amp; drop across all Kuwait governorates</h3>
            <p className="mt-1 text-xs leading-relaxed text-[#566467] sm:text-sm">We collect from your home or office. Diagnosis first, quote second, repair only with your approval.</p>
          </div>
          <Link
            to="/book"
            className="inline-flex min-h-12 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-[#dfa86f] px-4 py-2.5 text-sm font-extrabold text-[#17110c] transition-colors hover:bg-[#efc697] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#efc697] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f4efe7] sm:w-auto"
          >
            Arrange free pickup <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {featuredServices.length > 0 && (
          <div className="mt-5 rounded-2xl border border-[#e3dace] bg-white px-4 py-4 shadow-sm sm:mt-7 sm:px-6">
            <p className="text-xs leading-relaxed text-[#566467] sm:text-sm">
              Need a specific repair? Go directly to our main laptop repair service, dedicated screen repair, or laptop battery replacement page.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {featuredServices.map((service) => (
                <Link
                  key={service.id}
                  to={`/${service.slug}`}
                  className="inline-flex min-h-12 items-center rounded-xl border border-[#e3dace] bg-[#fffaf4] px-3 py-2 text-xs font-semibold text-[#354245] transition-colors hover:border-[#c9804d]/55 hover:bg-[#f4efe7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8f4f2c] sm:text-sm"
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
