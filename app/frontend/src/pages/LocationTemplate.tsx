// File: app/frontend/src/pages/LocationTemplate.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { locationRepository } from '../core/repositories/LocationRepository';
import { RelationshipService } from '../core/services/RelationshipService';
import { LocationEntity, ServiceEntity } from '../core/types';
import { Loader2, MapPin, Phone, ShieldCheck, ArrowRight } from 'lucide-react';
import { trackCallClick } from '../utils/analytics'; // Preserving your existing analytics!

export default function LocationTemplate() {
  // 1. Get the dynamic URL parameter (e.g., 'hawalli' from /location/hawalli)
  const { slug } = useParams<{ slug: string }>();

  // 2. Enterprise State Management (Now includes related services)
  const [location, setLocation] = useState<LocationEntity | null>(null);
  const [relatedServices, setRelatedServices] = useState<ServiceEntity[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 3. Fetch Location and Relationships Asynchronously based on the URL
  useEffect(() => {
    const fetchData = async () => {
      if (!slug) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        // Promise.all fetches both the Location and the Related Services simultaneously for maximum performance
        const [locationData, servicesData] = await Promise.all([
          locationRepository.findBySlug(slug),
          RelationshipService.getServicesForLocation(slug, 6)
        ]);
        
        setLocation(locationData || null);
        setRelatedServices(servicesData);
      } catch (error) {
        console.error(`Failed to fetch data for ${slug}:`, error);
        setLocation(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  // 4. Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white">
        <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mb-4" />
        <p className="text-slate-400 font-bold uppercase tracking-widest">Generating Local Experience...</p>
      </div>
    );
  }

  // 5. 404 / Not Found State (If someone types /location/fake-city)
  if (!location) {
    return <Navigate to="/404" replace />;
  }

  // 6. Success Render with Dynamic SEO, Schema, and Relationships
  return (
    <div className="min-h-screen bg-slate-950 text-white pb-24">
      
      {/* ==========================================
          PROGRAMMATIC SEO ENGINE
          ========================================== */}
      <Helmet>
        <title>{location.seo?.title || `Computer Repair in ${location.title} | KCROC`}</title>
        <meta name="description" content={location.seo?.description} />
        <link rel="canonical" href={location.seo?.canonicalUrl} />
        
        {/* Dynamic LocalBusiness Schema targeted to this specific city */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": `Kuwait Computer Repair On Call - ${location.title}`,
            "description": location.description,
            "telephone": location.phone || "+96555301913",
            "areaServed": {
              "@type": "City",
              "name": location.title
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": location.coords.lat,
              "longitude": location.coords.lng
            }
          })}
        </script>
      </Helmet>

      {/* ==========================================
          DYNAMIC UI (Pulls strictly from the Entity)
          ========================================== */}
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-slate-900/50 -z-10"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 text-cyan-400 font-medium text-sm mb-6 border border-cyan-500/20">
            <MapPin className="w-4 h-4" />
            Serving {location.title} & Surrounding Areas
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            Expert Computer Repair in <span className="text-cyan-400">{location.title}</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            {location.description} We offer free Pick & Drop services within a {location.serviceRadiusKm}km radius of {location.landmark}.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href={`tel:${location.phone || "+96555301913"}`}
              onClick={() => trackCallClick(`Location Template - ${location.title}`)}
              className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Call Now
            </a>
          </div>
        </div>
      </section>

      {/* Trust Factors */}
      <section className="py-12 px-6 border-b border-slate-800 bg-slate-900/20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center">
            <ShieldCheck className="w-10 h-10 text-emerald-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Certified Techs</h3>
            <p className="text-slate-400 text-sm">Professional motherboard and screen repair specialists.</p>
          </div>
          <div className="flex flex-col items-center">
            <MapPin className="w-10 h-10 text-cyan-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Free Pick & Drop</h3>
            <p className="text-slate-400 text-sm">Available everywhere in and around {location.title}.</p>
          </div>
          <div className="flex flex-col items-center">
            <Phone className="w-10 h-10 text-blue-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Same Day Service</h3>
            <p className="text-slate-400 text-sm">Most common repairs completed in under 24 hours.</p>
          </div>
        </div>
      </section>

      {/* ==========================================
          AUTOMATED INTERNAL LINKING ENGINE
          ========================================== */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Services Available in {location.title}
            </h2>
            <p className="text-slate-400">
              Our technicians bring these enterprise-grade repair services directly to your door in {location.title}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedServices.map((service) => (
              <a 
                key={service.id}
                href={`/${service.slug}`} // Passes SEO authority to the Service Page!
                className="group p-6 bg-slate-900 border border-slate-800 rounded-xl hover:border-cyan-500 transition-colors flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-400 text-sm line-clamp-2 mb-4">
                    {service.description}
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
}
