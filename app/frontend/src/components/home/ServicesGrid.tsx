// File: src/components/home/ServicesGrid.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Laptop, Gamepad2, Cpu, Apple, Wrench } from 'lucide-react';
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
        className="group block relative bg-kcroc-card rounded-2xl border border-white/[0.08] hover:border-kcroc-cyan transition-all duration-300 h-full overflow-hidden"
      >
        {cardImage && (
          <div className="relative h-24 sm:h-36 overflow-hidden">
            <img
              src={cardImage.src}
              alt={cardImage.alt}
              width={cardImage.width}
              height={cardImage.height}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-kcroc-card via-kcroc-card/10 to-transparent" />
          </div>
        )}
        <div className="flex flex-col h-full gap-1.5 sm:gap-3 p-3.5 sm:p-6">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-[10px] bg-kcroc-cyan/10 border border-kcroc-cyan/25 flex items-center justify-center mb-1 sm:mb-2">
            <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-kcroc-cyan" />
          </div>

          <h3 className="text-[13px] sm:text-sm font-semibold text-white leading-tight">
            {service.title}
          </h3>

          <p className="text-kcroc-muted text-xs sm:text-[13px] leading-relaxed line-clamp-2">
            {cardText}
          </p>

          <div className="text-kcroc-emerald text-[10px] sm:text-[11px] font-bold flex items-center gap-1 mt-1 sm:mt-2">
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

  if (!services || services.length === 0) return null;

  return (
    <section className="w-full py-7 sm:py-14 px-4 sm:px-8 bg-brand-dark">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="What we fix"
          tone="cyan"
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
      </div>
    </section>
  );
}
