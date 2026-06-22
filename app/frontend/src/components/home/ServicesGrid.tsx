import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
// Import your registry
import { SERVICES } from '../../constants/services'; 
import { useFadeIn } from '../../hooks/useFadeIn';

const ServiceCard = React.memo(({ service, idx }: { service: any, idx: number }) => {
  const { ref, visible } = useFadeIn();
  
  // Destructure the image directly from your self-aware service object
  const { image, route, title, name, description, icon: Icon } = service;

  return (
    <div 
      ref={ref} 
      style={{ transitionDelay: `${idx * 50}ms` }} 
      className={`transition-all duration-700 h-full ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >
      <Link 
        to={route} 
        className="group block relative overflow-hidden bg-slate-900/30 p-8 rounded-3xl border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 h-full"
      >
        {/* Render the image directly from the service data */}
        {image && image.src && (
          <div className="absolute inset-0 z-0">
            <img 
              src={image.src} 
              alt={image.alt || title || name} 
              width={image.width} 
              height={image.height}
              loading="lazy" 
              decoding="async"
              className="w-full h-full object-cover opacity-40 group-hover:opacity-70 transition-all duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
          </div>
        )}

        <div className="relative z-10 flex flex-col h-full">
          <div className="w-14 h-14 bg-slate-950/80 border border-slate-800 rounded-2xl flex items-center justify-center mb-6">
            <Icon className="w-6 h-6 text-cyan-400" />
          </div>
          <h3 className="text-2xl font-black text-white mb-3">{title || name}</h3>
          <p className="text-slate-200 text-sm leading-relaxed mb-6">{description}</p>
          <div className="flex items-center text-cyan-400 font-bold text-sm mt-auto">
            View Details <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </div>
  );
});

ServiceCard.displayName = 'ServiceCard';

export default function ServicesGrid() {
  return (
    <section className="w-full py-24 flex justify-center px-6 border-t border-slate-800/50">
      <div className="w-full max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-white mb-4">Our Repair Capabilities</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, idx) => (
            <ServiceCard key={s.slug} service={s} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
