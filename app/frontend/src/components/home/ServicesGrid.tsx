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
  
  return (
    <div 
      ref={ref} 
      style={{ transitionDelay: `${idx * 50}ms` }} 
      className={`transition-all duration-700 h-full ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >
      <Link 
        to={service.seo.canonicalUrl}
        className="group block relative bg-kcroc-card p-8 rounded-[14px] border border-white/[0.08] hover:border-kcroc-cyan transition-all duration-300 h-full"
      >
        <div className="flex flex-col h-full gap-3">
          {/* Icon styling matching kcroc_homepage_mockup.html */}
          <div className="w-10 h-10 rounded-[10px] bg-kcroc-cyan/10 border border-kcroc-cyan/25 flex items-center justify-center mb-2">
            <Icon className="w-5 h-5 text-kcroc-cyan" />
          </div>
          
          <h3 className="text-sm font-medium text-white leading-tight">
            {service.title}
          </h3>
          
          <p className="text-kcroc-muted text-[13px] leading-relaxed flex-1">
            {service.description}
          </p>
          
          <div className="text-kcroc-emerald text-[11px] font-bold flex items-center gap-1 mt-2">
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
    <section className="w-full py-14 px-8 bg-kcroc-slate-950">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="text-kcroc-cyan text-[11px] font-bold uppercase tracking-[1px] mb-2">What we fix</div>
          <h2 className="text-2xl font-medium text-white mb-2">Component-level expertise.</h2>
          <p className="text-kcroc-muted text-sm">For the failures others give up on.</p>
        </div>
        
        {/* Adjusted to grid-cols-3 as per mockup[cite: 1] */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s, idx) => (
            <ServiceCard key={s.id} service={s} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
