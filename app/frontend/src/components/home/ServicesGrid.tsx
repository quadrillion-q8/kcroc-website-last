// File: src/components/home/ServicesGrid.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Laptop, Gamepad2, Cpu, Apple, Wrench } from 'lucide-react';
import { KCROC_GRAPH } from '../../data/graph';
import { ServiceEntity } from '../../types/knowledgeGraph';
import { useFadeIn } from '../../hooks/useFadeIn';

// UI Layer: Map graph iconKey to actual Lucide components
const ICON_MAP: Record<string, React.ElementType> = {
  'apple': Apple,
  'laptop': Laptop,
  'gaming': Gamepad2,
  'cpu': Cpu,
};

const ServiceCard = React.memo(({ service, idx }: { service: ServiceEntity, idx: number }) => {
  const { ref, visible } = useFadeIn();
  
  // Resolve Icon from the graph's iconKey, fallback to Wrench
  const Icon = ICON_MAP[service.iconKey] || Wrench;
  
  return (
    <div 
      ref={ref} 
      style={{ transitionDelay: `${idx * 50}ms` }} 
      className={`transition-all duration-700 h-full ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >
      <Link 
        to={service.seo.canonicalUrl}
        className="group block relative overflow-hidden bg-slate-900/40 p-8 rounded-3xl border border-slate-800 hover:border-emerald-500/50 transition-all duration-300 h-full hover:shadow-[0_0_30px_-10px_rgba(16,185,129,0.2)]"
      >
        <div className="relative z-10 flex flex-col h-full">
          <div className="w-14 h-14 bg-slate-950/80 border border-slate-700 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30 transition-colors">
            <Icon className="w-7 h-7 text-emerald-500" />
          </div>
          
          <h3 className="text-2xl font-black text-white mb-3 group-hover:text-emerald-400 transition-colors">
            {service.title}
          </h3>
          
          <p className="text-slate-300 text-sm leading-relaxed mb-6 line-clamp-3">
            {service.description}
          </p>
          
          <div className="flex items-center text-emerald-500 font-bold text-sm mt-auto">
            Explore Solutions <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </div>
  );
});

ServiceCard.displayName = 'ServiceCard';

export default function ServicesGrid() {
  // Directly consume the typed graph services
  const services = KCROC_GRAPH.services;

  if (!services || services.length === 0) return null;

  return (
    <section className="w-full py-24 flex justify-center px-6 bg-slate-950">
      <div className="w-full max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-white mb-4">What We Actually Fix</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Component-level expertise for critical hardware failures in Kuwait.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, idx) => (
            <ServiceCard key={s.id} service={s} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
