// File: src/components/home/ServicesGrid.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Laptop, Gamepad2, Cpu, Apple, Wrench } from 'lucide-react';
import { KCROC_GRAPH } from '../../data/graph';
import { ServiceEntity } from '../../types/knowledgeGraph';
import { useFadeIn } from '../../hooks/useFadeIn';

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
  // 🩹 FIX: was rendering `service.description` — a multi-sentence, often
  // 500+ character paragraph meant for the full service page — which blew
  // the cards out to a huge, inconsistent height on the homepage grid.
  // `shortDescription` is the field actually written for card-length use.
  const cardText = service.shortDescription || service.description;

  return (
    <div 
      ref={ref} 
      style={{ transitionDelay: `${idx * 50}ms` }} 
      className={`scroll-row-item w-[78%] sm:w-auto transition-all duration-700 h-full ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >
      <Link 
        to={service.seo.canonicalUrl}
        className="group block relative bg-kcroc-card rounded-[14px] border border-white/[0.08] hover:border-kcroc-cyan transition-all duration-300 h-full overflow-hidden"
      >
        {cardImage && (
          <div className="relative h-32 sm:h-36 overflow-hidden">
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
        <div className="flex flex-col h-full gap-2 sm:gap-3 p-5 sm:p-6">
          {/* Icon styling matching kcroc_homepage_mockup.html */}
          <div className="w-10 h-10 rounded-[10px] bg-kcroc-cyan/10 border border-kcroc-cyan/25 flex items-center justify-center mb-1 sm:mb-2">
            <Icon className="w-5 h-5 text-kcroc-cyan" />
          </div>
          
          <h3 className="text-sm font-medium text-white leading-tight">
            {service.title}
          </h3>
          
          {/* 🩹 FIX: line-clamp now applies at every breakpoint (was
              `sm:line-clamp-none`, which let the long `description` text
              stretch cards to very different, oversized heights on
              desktop). 2 lines keeps every card the same compact size. */}
          <p className="text-kcroc-muted text-[13px] leading-relaxed line-clamp-2">
            {cardText}
          </p>
          
          <div className="text-kcroc-emerald text-[11px] font-bold flex items-center gap-1 mt-1 sm:mt-2">
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
    <section className="w-full py-6 sm:py-14 px-4 sm:px-8 bg-kcroc-slate-950">
      <div className="max-w-6xl mx-auto">
        <div className="mb-4 sm:mb-8">
          <div className="text-kcroc-cyan text-[11px] font-bold uppercase tracking-[1px] mb-2">What we fix</div>
          <h2 className="text-white mb-2">Component-level expertise.</h2>
          <p className="text-kcroc-muted text-sm">For the failures others give up on.</p>
        </div>

        {/* Mobile: horizontal swipe carousel, next card peeking. Desktop (sm+): grid. */}
        <div className="scroll-row gap-3 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
          {services.map((s, idx) => (
            <ServiceCard key={s.id} service={s} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
