// File: app/frontend/src/pages/LocationTemplate.tsx
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { KCROC_GRAPH } from '../data/graph';
import { SEOEngine } from '../core/components/SEOEngine';
import { MapPin, Phone, Clock, Wrench, ShieldCheck, ArrowRight } from 'lucide-react';

const LocationTemplate: React.FC = () => {
  // Grab the exact slug from the URL (e.g., "hawalli" from "/location/hawalli")
  const { slug } = useParams<{ slug: string }>(); 
  
  // Instantly query the static graph (No async/await needed)
  const locationData = KCROC_GRAPH.locations.find((loc) => loc.slug === slug);

  // If the slug doesn't exist in the graph, safely 404
  if (!locationData) {
    return <Navigate to="/404" replace />;
  }

  const business = KCROC_GRAPH.business;
  // Automatically pull the top 6 active services for the internal linking grid
  const relatedServices = KCROC_GRAPH.services.slice(0, 6); 

  return (
    <div className="bg-slate-950 min-h-screen text-slate-200">
      {/* ==========================================
        PROGRAMMATIC SEO ENGINE
        ========================================== 
      */}
      <SEOEngine entityId={locationData.id} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-slate-900/50 -z-10"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-400 font-medium text-sm mb-6 border border-cyan-500/20">
            <MapPin className="w-4 h-4" />
            Serving {locationData.title} & Surrounding Areas
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            Expert Computer Repair in <span className="text-cyan-400">{locationData.title}</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            {locationData.description} We offer free Pick & Drop services within a {locationData.serviceRadiusKm}km radius of our main lab.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href={`https://wa.me/${business?.telephone}`}
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              WhatsApp Us Now
            </a>
          </div>
        </div>
      </section>

      {/* Trust Factors */}
      <section className="py-12 px-6 border-b border-slate-800 bg-slate-900/20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <ShieldCheck className="w-10 h-10 text-emerald-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Certified Techs</h3>
            <p className="text-slate-400 text-sm">Professional motherboard and screen repair specialists.</p>
          </div>
          <div className="flex flex-col items-center">
            <MapPin className="w-10 h-10 text-cyan-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Free Pick & Drop</h3>
            <p className="text-slate-400 text-sm">Available everywhere in and around {locationData.title}.</p>
          </div>
          <div className="flex flex-col items-center">
            <Clock className="w-10 h-10 text-blue-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Same Day Service</h3>
            <p className="text-slate-400 text-sm">Most common repairs completed in under 24 hours.</p>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-16 px-6 max-w-4xl mx-auto border-b border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <MapPin className="text-cyan-400 w-6 h-6" /> Physical Address
              </h2>
              <p className="text-slate-300 bg-slate-900 p-4 rounded-xl border border-slate-800">
                {locationData.landmark}
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Clock className="text-cyan-400 w-6 h-6" /> Working Hours
              </h2>
              <p className="text-slate-300 bg-slate-900 p-4 rounded-xl border border-slate-800">
                {business?.openingHours || 'Open daily 10:00 AM – 10:00 PM'}
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Wrench className="text-cyan-400 w-6 h-6" /> Supported Service Areas
            </h2>
            <ul className="space-y-3">
              {locationData.serviceAreas.map((area, idx) => (
                <li key={idx} className="flex items-center gap-3 text-slate-300 bg-slate-900 p-3 rounded-lg border border-slate-800">
                  <div className="w-2 h-2 rounded-full bg-cyan-500 flex-shrink-0" />
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Automated Internal Linking Engine */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Services Available in {locationData.title}
            </h2>
            <p className="text-slate-400">
              Our technicians bring these enterprise-grade repair services directly to your door.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedServices.map((service) => (
              <a 
                key={service.id}
                href={`/${service.slug}`}
                className="group p-6 bg-slate-900 border border-slate-800 rounded-xl hover:border-cyan-500 transition-colors flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-bold text-slate-200 mb-2 group-hover:text-cyan-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-400 text-sm line-clamp-2 mb-4">
                    {service.shortDescription || service.description}
                  </p>
                </div>
                <div className="flex items-center text-cyan-400 font-bold text-sm">
                  View Service <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocationTemplate;
