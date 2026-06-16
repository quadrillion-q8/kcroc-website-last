import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  MapPin, ShieldCheck, Clock, CheckCircle2, 
  Phone, ExternalLink, Wrench, Truck 
} from 'lucide-react';
import { BUSINESS_INFO } from '../constants/data';

/* ─────────────────────────────────────────────────────────────────────────────
   1. UTILITY FUNCTIONS
───────────────────────────────────────────────────────────────────────────── */

// Helper to format URL slugs into Title Case (e.g., "laptop-repair" -> "Laptop Repair")
const formatTitleCase = (slug: string = '') => {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

/* ─────────────────────────────────────────────────────────────────────────────
   2. MAIN DYNAMIC COMPONENT
───────────────────────────────────────────────────────────────────────────── */

export default function LocationTemplate() {
  // Extract the dynamic parts of the URL (e.g., /:service-in-:city)
  const { service, city } = useParams();

  // Format the parameters for display
  const formattedCity = formatTitleCase(city || 'Kuwait');
  const formattedService = formatTitleCase(service || 'Computer Repair');
  
  const pageUrl = `${BUSINESS_INFO.url}/${service}-in-${city}`;
  const waMessage = encodeURIComponent(`Hi KCROC, I am in ${formattedCity} and need ${formattedService}. Please arrange a free pickup.`);
  const waLink = `https://wa.me/${BUSINESS_INFO.cleanPhone}?text=${waMessage}`;

  // Dynamically generate the localized SEO Schema
  const SCHEMA_DATA = useMemo(() => ({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        "name": `${formattedService} in ${formattedCity} | KCROC`,
        "url": pageUrl,
        "description": `Professional ${formattedService.toLowerCase()} services in ${formattedCity}. Free pickup, component-level diagnostics, and fast turnaround.`,
        "isPartOf": { "@id": `${BUSINESS_INFO.url}/#website` }
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        "name": `${formattedService} ${formattedCity}`,
        "provider": {
          "@type": "LocalBusiness",
          "name": BUSINESS_INFO.name,
          "image": BUSINESS_INFO.logo,
          "telephone": BUSINESS_INFO.phone,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Ibn Khaldoun St, Basement Shop 19",
            "addressLocality": "Hawalli",
            "addressCountry": "KW"
          }
        },
        "areaServed": {
          "@type": "City",
          "name": formattedCity
        },
        "description": `Fast and reliable ${formattedService.toLowerCase()} for residents and businesses in ${formattedCity}.`
      }
    ]
  }), [formattedCity, formattedService, pageUrl]);

  return (
    <main className="w-full min-h-screen bg-transparent text-slate-200 selection:bg-cyan-500/30 pt-32 pb-24 font-sans">
      <Helmet>
        <title>{formattedService} in {formattedCity} | Fast Repair - KCROC</title>
        <meta name="description" content={`Top-rated ${formattedService.toLowerCase()} in ${formattedCity}. We offer free diagnostic pickups directly from your location. No Fix, No Fee.`} />
        <link rel="canonical" href={pageUrl} />
        <script type="application/ld+json">{JSON.stringify(SCHEMA_DATA)}</script>
      </Helmet>

      {/* ─── BREADCRUMBS ─── */}
      <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-6 mb-8 relative z-10">
        <ol className="flex items-center space-x-2 text-sm text-slate-400 font-medium">
          <li><Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
          <li><span className="text-slate-600">/</span></li>
          <li><span className="text-slate-400">Locations</span></li>
          <li><span className="text-slate-600">/</span></li>
          <li aria-current="page" className="text-cyan-400">{formattedCity}</li>
        </ol>
      </nav>

      {/* ─── DYNAMIC HERO SECTION ─── */}
      <section className="relative px-6 text-center z-10 mb-24">
        <div className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-cyan-600/20 blur-[80px] rounded-full pointer-events-none transform-gpu translate-z-0"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 px-5 py-2 rounded-full text-cyan-400 text-xs font-black uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
            <MapPin size={16} aria-hidden="true" /> Local Service Area: {formattedCity}
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
            Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">{formattedService}</span><br />
            in {formattedCity}
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            Are you located in {formattedCity} and dealing with hardware failure? Our mobile lab team provides free pickup directly from your home or office for immediate diagnostics.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full sm:w-auto bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-8 py-4 rounded-full font-black text-base transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:scale-[1.02]">
              Request {formattedCity} Pickup <ExternalLink size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* ─── LOCALIZED VALUE PROPOSITION ─── */}
      <section className="max-w-6xl mx-auto px-6 relative z-10 mb-24 grid md:grid-cols-3 gap-6">
        <div className="bg-slate-900/30 backdrop-blur-md p-8 rounded-3xl border border-slate-800 flex flex-col items-center text-center">
          <Truck className="w-12 h-12 text-cyan-400 mb-6" />
          <h3 className="text-xl font-black text-white mb-3">Rapid {formattedCity} Dispatch</h3>
          <p className="text-slate-400 text-sm leading-relaxed">We bypass traffic. Our dedicated drivers frequently route through {formattedCity} for seamless device collection.</p>
        </div>
        <div className="bg-slate-900/30 backdrop-blur-md p-8 rounded-3xl border border-slate-800 flex flex-col items-center text-center">
          <Wrench className="w-12 h-12 text-cyan-400 mb-6" />
          <h3 className="text-xl font-black text-white mb-3">Component-Level Fixes</h3>
          <p className="text-slate-400 text-sm leading-relaxed">Unlike basic IT shops, we specialize in micro-soldering, liquid damage, and advanced board repair.</p>
        </div>
        <div className="bg-slate-900/30 backdrop-blur-md p-8 rounded-3xl border border-slate-800 flex flex-col items-center text-center">
          <ShieldCheck className="w-12 h-12 text-cyan-400 mb-6" />
          <h3 className="text-xl font-black text-white mb-3">No Fix, No Charge</h3>
          <p className="text-slate-400 text-sm leading-relaxed">If we cannot successfully execute your {formattedService.toLowerCase()}, you pay absolutely nothing.</p>
        </div>
      </section>

      {/* ─── BOTTOM CTA ─── */}
      <section className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="bg-gradient-to-br from-cyan-900/40 to-slate-900/80 backdrop-blur-xl p-10 md:p-16 rounded-3xl border border-cyan-500/30 text-center shadow-[0_0_40px_rgba(34,211,238,0.1)]">
          <Clock className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
          <h2 className="text-3xl font-black text-white mb-6 tracking-tight">Need It Fixed Fast?</h2>
          <p className="text-lg text-slate-300 mb-10 max-w-xl mx-auto">
            Contact our lab now. We are actively accepting {formattedService.toLowerCase()} tickets from the {formattedCity} area today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href={`tel:${BUSINESS_INFO.phone}`} className="bg-slate-900 border border-slate-700 hover:border-cyan-500/50 text-white font-bold px-8 py-4 rounded-full transition-all flex items-center justify-center gap-2">
              <Phone size={20} className="text-cyan-400" /> Call Technician
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
