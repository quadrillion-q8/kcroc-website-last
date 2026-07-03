// File: app/frontend/src/pages/Services.tsx
import React, { useEffect, useState } from 'react';
import { serviceRepository } from '../core/repositories/ServiceRepository';
import { locationRepository } from '../core/repositories/LocationRepository';
import { SchemaService } from '../core/services/SchemaService';
import { ServiceEntity, LocationEntity } from '../core/types';
import { Loader2, ArrowRight, MapPin } from 'lucide-react';

// 👈 Phase 2 SEO Engine Imported
import { SEOEngine } from '../core/components/SEOEngine';
import SchemaMarkup from '../components/seo/SchemaMarkup';

export default function Services() {
  const [services, setServices] = useState<ServiceEntity[]>([]);
  const [locations, setLocations] = useState<LocationEntity[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPageData = async () => {
      try {
        setIsLoading(true);
        const [servicesData, locationsData] = await Promise.all([
          serviceRepository.findAll(),
          locationRepository.findAll()
        ]);
        
        setServices(servicesData);
        setLocations(locationsData);
      } catch (err) {
        console.error("Failed to fetch services data:", err);
        setError("Unable to load repair services at this time.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPageData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white">
        <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mb-4" />
        <p className="text-slate-400 font-bold uppercase tracking-widest">Loading Services...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <div className="bg-red-500/10 border border-red-500 text-red-500 p-6 rounded-xl">
          <p className="font-bold">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white py-24 px-6">
      
      {/* 🚀 PHASE 2 AUTOMATION IN ACTION: Basic Tags Handled */}
      <SEOEngine entityId="page-services" />

      {/* 🚀 Dynamic Schema Injection for the Service List */}
      <SchemaMarkup schema={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "itemListElement": services.map((service, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": SchemaService.generateServiceSchema(service)
          }))
      }} />

      {/* Main Services Grid */}
      <div className="max-w-7xl mx-auto mb-32">
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
              className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-cyan-500 transition-colors group flex flex-col justify-between"
            >
              <div>
                <h2 className="text-2xl font-bold mb-4 group-hover:text-cyan-400 transition-colors">{service.title}</h2>
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
              </div>

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

      {/* Automated Internal Linking: Locations */}
      <div className="max-w-7xl mx-auto pt-16 border-t border-slate-800/50">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Available Service Areas
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            We provide fast, reliable repair services with Free Pick & Drop across Kuwait. Find a local repair hub near you.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {locations.map((location) => (
            <a 
              key={location.id}
              href={`/location/${location.slug}`}
              className="flex items-center gap-3 p-4 bg-slate-900/50 border border-slate-800 rounded-xl hover:bg-slate-800 hover:border-cyan-500 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="block font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {location.title}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
