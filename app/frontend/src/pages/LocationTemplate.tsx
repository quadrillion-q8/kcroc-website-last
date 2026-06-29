// File: app/frontend/src/pages/LocationTemplate.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { locationRepository } from '../core/repositories/LocationRepository';
import { LocationEntity } from '../core/types';
import { Loader2, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { trackCallClick } from '../utils/analytics'; // Preserving your existing analytics!

export default function LocationTemplate() {
  // 1. Get the dynamic URL parameter (e.g., 'hawalli' from /location/hawalli)
  const { slug } = useParams<{ slug: string }>();

  // 2. Enterprise State Management
  const [location, setLocation] = useState<LocationEntity | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 3. Fetch Data Asynchronously based on the URL
  useEffect(() => {
    const fetchLocation = async () => {
      if (!slug) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        // Ask the repository for this specific city
        const data = await locationRepository.findBySlug(slug);
        setLocation(data || null);
      } catch (error) {
        console.error(`Failed to fetch location data for ${slug}:`, error);
        setLocation(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocation();
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

  // 6. Success Render with Dynamic SEO & Schema
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

    </div>
  );
}
