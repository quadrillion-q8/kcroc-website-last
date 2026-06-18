import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  MapPin, ShieldCheck, Clock, CheckCircle2, 
  Phone, ExternalLink, Wrench, Truck, ArrowRight 
} from 'lucide-react';
import { BUSINESS_INFO, SERVICE_AREAS } from '../constants/data';

const formatTitleCase = (slug: string = '') => 
  slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');

export default function LocationTemplate() {
  const { service, city } = useParams();
  const formattedCity = formatTitleCase(city || 'Kuwait');
  const formattedService = formatTitleCase(service || 'Computer Repair');
  
  const pageUrl = `${BUSINESS_INFO.url}/${service}-in-${city}`;
  const waMessage = encodeURIComponent(`Hi KCROC, I'm in ${formattedCity} and need ${formattedService}.`);
  const waLink = `https://wa.me/${BUSINESS_INFO.cleanPhone}?text=${waMessage}`;

  // Generate dynamic nearby areas to build a "Linking Hub"
  const nearbyAreas = SERVICE_AREAS.filter(area => area.toLowerCase() !== formattedCity.toLowerCase()).slice(0, 3);

  const SCHEMA_DATA = useMemo(() => ({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        "name": `${formattedService} in ${formattedCity} | KCROC`,
        "url": pageUrl,
        "description": `Fast ${formattedService} in ${formattedCity}. Free pickup, component-level repairs, and same-day service from KCROC.`,
        "isPartOf": { "@id": `${BUSINESS_INFO.url}/#website` }
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        "name": `${formattedService} ${formattedCity}`,
        "provider": { "@type": "LocalBusiness", "name": BUSINESS_INFO.name, "telephone": BUSINESS_INFO.phone },
        "areaServed": { "@type": "City", "name": formattedCity }
      }
    ]
  }), [formattedCity, formattedService, pageUrl]);

  return (
    <main className="w-full min-h-screen bg-slate-950 text-slate-200 pt-32 pb-24">
      <Helmet>
        <title>{formattedService} in {formattedCity} | Trusted Repair - KCROC</title>
        <meta name="description" content={`Need ${formattedService} in ${formattedCity}? We provide expert diagnostics, component-level repair, and free pickup. No Fix, No Fee. Book your repair today.`} />
        <link rel="canonical" href={pageUrl} />
        <script type="application/ld+json">{JSON.stringify(SCHEMA_DATA)}</script>
      </Helmet>

      {/* Hero */}
      <section className="px-6 text-center mb-24">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
          {formattedService} in <span className="text-cyan-400">{formattedCity}</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10">
          We provide specialized {formattedService.toLowerCase()} services for residents in {formattedCity}. 
          Our mobile lab team handles everything from screen replacements to complex motherboard diagnostics.
        </p>
        <a href={waLink} className="bg-cyan-500 text-slate-950 px-8 py-4 rounded-full font-black hover:scale-105 transition-transform inline-flex items-center gap-2">
          Book {formattedCity} Pickup <ExternalLink size={20} />
        </a>
      </section>

      {/* Internal Linking Hub (The "SEO Multiplier") */}
      <section className="max-w-4xl mx-auto px-6 mb-24">
        <div className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <MapPin className="text-cyan-400" /> Serving {formattedCity} & Nearby
          </h3>
          <div className="flex flex-wrap gap-3">
            {nearbyAreas.map(area => (
              <Link 
                key={area} 
                to={`/${service}-in-${area.toLowerCase()}`}
                className="px-4 py-2 bg-slate-800 hover:bg-cyan-900/30 rounded-lg text-sm transition-colors border border-slate-700"
              >
                {formattedService} in {area} <ArrowRight size={14} className="inline ml-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ... rest of your existing value prop and CTA sections ... */}
    </main>
  );
}
