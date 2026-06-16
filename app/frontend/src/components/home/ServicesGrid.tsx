import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SERVICES } from '../../constants/data';
import { useFadeIn } from '../../hooks/useFadeIn';

const ServiceCard = ({ service, idx }: { service: any, idx: number }) => {
  const { ref, visible } = useFadeIn();
  return (
    <div ref={ref} style={{ transitionDelay: `${idx * 50}ms` }} className={`transition-all duration-700 h-full ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <Link to={service.path} className="group block bg-slate-900/30 backdrop-blur-sm p-8 rounded-3xl border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 h-full hover:shadow-[0_0_30px_rgba(34,211,238,0.05)] focus-visible:ring-2 focus-visible:ring-cyan-400">
        <div className="w-14 h-14 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-center mb-6 group-hover:border-cyan-500/30 transition-colors shadow-inner">
          <service.icon className="w-6 h-6 text-cyan-400" aria-hidden="true" />
        </div>
        <h3 className="text-2xl font-black text-white mb-3 tracking-tight group-hover:text-cyan-400 transition-colors">{service.title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-6">{service.description}</p>
        <div className="flex items-center text-cyan-500 font-bold text-sm mt-auto">
          View Details <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
        </div>
      </Link>
    </div>
  );
};

export default function ServicesGrid() {
  return (
    <section className="w-full py-24 flex justify-center px-6 border-t border-slate-800/50 relative z-10">
      <div className="w-full max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">Our Repair Capabilities</h2>
          <p className="text-slate-400">Comprehensive hardware solutions engineered for reliability.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, idx) => <ServiceCard key={s.title} service={s} idx={idx} />)}
        </div>
      </div>
    </section>
  );
}
