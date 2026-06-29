// File: app/frontend/src/pages/Services.tsx
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { serviceRepository } from '../core/repositories/ServiceRepository';
import { SchemaService } from '../core/services/SchemaService';
import { ServiceEntity } from '../core/types';
import { Loader2, ArrowRight } from 'lucide-react'; // Assuming you use lucide-react for icons

export default function Services() {
  // 1. Enterprise State Management for Async Data
  const [services, setServices] = useState<ServiceEntity[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 2. Fetch Data via Repository (UI doesn't know where it comes from!)
  useEffect(() => {
    const loadServices = async () => {
      try {
        setIsLoading(true);
        // We can easily add pagination later: await serviceRepository.findAll({ limit: 10 })
        const data = await serviceRepository.findAll();
        setServices(data);
      } catch (err) {
        console.error("Failed to fetch services:", err);
        setError("Unable to load repair services at this time.");
      } finally {
        setIsLoading(false);
      }
    };

    loadServices();
  }, []);

  // 3. Loading UI
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white">
        <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mb-4" />
        <p className="text-slate-400 font-bold uppercase tracking-widest">Loading Services...</p>
      </div>
    );
  }

  // 4. Error State UI
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <div className="bg-red-500/10 border border-red-500 text-red-500 p-6 rounded-xl">
          <p className="font-bold">{error}</p>
        </div>
      </div>
    );
  }

  // 5. Success Render
  return (
    <div className="min-h-screen bg-slate-950 text-white py-24 px-6">
      
      {/* ==========================================
          ENTERPRISE SEO ENGINE INJECTION
          ========================================== */}
      <Helmet>
        <title>Our Repair Services | Kuwait Computer Repair On Call</title>
        <meta name="description" content="Expert laptop, PC, and MacBook repair services in Kuwait. Free pick & drop included." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": services.map((service, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": SchemaService.generateServiceSchema(service) // Offloading logic to the Service Layer!
            }))
          })}
        </script>
      </Helmet>

      {/* ==========================================
          VISUAL UI (Pure Rendering)
          ========================================== */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black mb-6">Expert Repair Services</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            From shattered screens to motherboard microsoldering, our certified technicians handle it all. 
            Select a service below to learn more.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-cyan-500 transition-colors group"
            >
              <h2 className="text-2xl font-bold mb-4">{service.title}</h2>
              <p className="text-slate-400 mb-6 min-h-[80px]">
                {service.description}
              </p>
              
              <ul className="space-y-2 mb-8">
                {service.features.slice(0, 3).map((feature, i) => (
                  <li key={i} className="flex items-center text-sm text-slate-300">
                    <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>

              <a 
                href={`/${service.slug}`} 
                className="inline-flex items-center text-cyan-400 font-bold group-hover:text-cyan-300 transition-colors"
              >
                View Details <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
