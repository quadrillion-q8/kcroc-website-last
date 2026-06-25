import React, { useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { MapPin, ExternalLink, ArrowRight, Clock } from 'lucide-react';

import { BUSINESS_INFO } from '../constants/data';
import { LOCATION_AREAS } from '../constants/locationAreas';
import MetaSEO from '../components/seo/MetaSEO';
import SchemaMarkup from '../components/seo/SchemaMarkup';
import Layout from '../components/Layout';
import MapComponent from '../components/MapComponent';

/* ─────────────────────────────────────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────────────────────────────────────── */

const formatTitleCase = (slug: string = '') =>
  slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');

const toSlug = (str: string) => str.toLowerCase().replace(/\s+/g, '-');

/* ─────────────────────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────────────────────── */

export default function LocationTemplate() {
  const { service, city } = useParams<{ service?: string; city?: string }>();

  // ✅ FIXED: Look up by slug, not by object key, to handle hyphens (e.g., "abu-halifa")
  const targetSlug = city?.toLowerCase() || '';
  const cityData = Object.values(LOCATION_AREAS).find(area => area.slug === targetSlug);

  // Fallbacks if data doesn't exist
  const formattedCity = cityData?.name || formatTitleCase(city || 'Kuwait');
  const formattedService = formatTitleCase(service || 'Computer Repair');
  const pageUrl = `${BUSINESS_INFO.url}/${service?.toLowerCase()}-in-${targetSlug}`;

  // If no city data is found, redirect to home to prevent 404 indexing
  if (!cityData) {
    return <Navigate to="/" replace />;
  }

  const waMessage = encodeURIComponent(
    `Hi KCROC, I'm in ${formattedCity} and need ${formattedService}.`
  );
  const waLink = `https://wa.me/${BUSINESS_INFO.cleanPhone}?text=${waMessage}`;

  const nearbyAreas = cityData.nearbyAreas || [];

  /* ─── FAQ ─── */
  const FAQ_DATA = useMemo(() => {
    return cityData.faq || [
      {
        question: `Do you provide ${formattedService} in ${formattedCity}?`,
        answer: `Yes, we provide professional ${formattedService.toLowerCase()} services across ${formattedCity}, Kuwait.`
      },
      {
        question: `Do you offer free pickup in ${formattedCity}?`,
        answer: `Yes, we offer free pickup and delivery for customers in ${formattedCity}.`
      }
    ];
  }, [cityData, formattedCity, formattedService]);

  /* ─── SCHEMA ─── */
  const SCHEMA_DATA = useMemo(() => ({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        "name": `${formattedService} in ${formattedCity} | KCROC`,
        "url": pageUrl,
        "description": cityData.description,
        "isPartOf": { "@id": `${BUSINESS_INFO.url}/#website` }
      },
      {
        "@type": "LocalBusiness",
        "@id": `${BUSINESS_INFO.url}/#business`,
        "name": BUSINESS_INFO.name,
        "url": BUSINESS_INFO.url,
        "telephone": BUSINESS_INFO.phone,
        "areaServed": formattedCity,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19",
          "addressLocality": "Hawalli",
          "addressRegion": "Hawalli Governorate",
          "addressCountry": "KW"
        },
        ...(cityData.coordinates && {
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": cityData.coordinates.lat,
            "longitude": cityData.coordinates.lng
          }
        })
      },
      {
        "@type": "Service",
        "name": formattedService,
        "provider": {
          "@type": "LocalBusiness",
          "name": BUSINESS_INFO.name
        },
        "areaServed": {
          "@type": "City",
          "name": formattedCity
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": FAQ_DATA.map(item => ({
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": { "@type": "Answer", "text": item.answer }
        }))
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": BUSINESS_INFO.url },
          { "@type": "ListItem", "position": 2, "name": formattedService, "item": `${BUSINESS_INFO.url}/${service?.toLowerCase()}-kuwait` },
          { "@type": "ListItem", "position": 3, "name": formattedCity, "item": pageUrl }
        ]
      }
    ]
  }), [pageUrl, cityData, formattedCity, formattedService, FAQ_DATA, service]);

  return (
    <Layout> {/* ✅ FIXED: Wrapped in Layout to preserve Header/Footer */}
      <main className="w-full min-h-screen bg-transparent text-slate-200 pt-32 pb-24">

        {/* ─── SEO ─── */}
        <MetaSEO
          title={cityData.title || `${formattedService} in ${formattedCity} | KCROC Kuwait`}
          description={cityData.description || `Professional ${formattedService.toLowerCase()} in ${formattedCity}, Kuwait.`}
          canonical={pageUrl}
        />
        <SchemaMarkup schema={SCHEMA_DATA} />

        {/* ─── BREADCRUMBS ─── */}
        <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-6 mb-8 relative z-10">
          <ol className="flex items-center space-x-2 text-sm text-slate-400 font-medium">
            <li><Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
            <li><span className="text-slate-600" aria-hidden="true">/</span></li>
            <li><span className="text-slate-400">{formattedService}</span></li>
            <li><span className="text-slate-600" aria-hidden="true">/</span></li>
            <li aria-current="page" className="text-cyan-400">{formattedCity}</li>
          </ol>
        </nav>

        {/* ─── HERO ─── */}
        <section className="relative px-6 text-center mb-20 z-10">
          <div
            className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-cyan-600/20 blur-[80px] rounded-full pointer-events-none"
            aria-hidden="true"
          />
          <div className="max-w-4xl mx-auto relative z-10">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
              {formattedService} in{' '}
              <span className="text-cyan-400">{formattedCity}</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10">
              {cityData.description || `Fast and reliable ${formattedService.toLowerCase()} in ${formattedCity}.`}
              {cityData.landmark && (
                <span> We operate near {cityData.landmark}.</span>
              )}
            </p>
            
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-8 py-4 rounded-full font-black hover:scale-105 transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] inline-flex items-center gap-2"
            >
              Book Free Pickup <ExternalLink size={20} aria-hidden="true" />
            </a>
          </div>
        </section>

        {/* ─── IMAGE ─── */}
        {cityData.image && (
          <div className="max-w-5xl mx-auto px-6 mb-20">
            <img
              src={cityData.image}
              alt={`${formattedService} in ${formattedCity}, Kuwait`}
              width="1200"
              height="630"
              loading="lazy"
              decoding="async"
              className="rounded-3xl w-full object-cover aspect-[1200/630]"
            />
          </div>
        )}

        {/* ─── NEARBY AREAS ─── */}
        {nearbyAreas.length > 0 && (
          <section aria-labelledby="nearby-heading" className="max-w-4xl mx-auto px-6 mb-16">
            <div className="bg-slate-900/50 backdrop-blur-md p-8 rounded-3xl border border-slate-800">
              <h2 id="nearby-heading" className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <MapPin className="text-cyan-400" aria-hidden="true" />
                Nearby Areas from {formattedCity}
              </h2>
              <div className="flex flex-wrap gap-3">
                {nearbyAreas.map(area => (
                  <Link
                    key={area}
                    to={`/${service}-in-${toSlug(area)}`}
                    className="px-4 py-2 bg-slate-800 hover:bg-cyan-900/30 rounded-lg text-sm border border-slate-700 hover:border-cyan-500/50 transition-colors flex items-center gap-1"
                  >
                    {formattedService} in {area}
                    <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ─── LOCATION INFO ─── */}
        <section aria-labelledby="location-heading" className="max-w-4xl mx-auto px-6 mb-20">
          <h2 id="location-heading" className="text-2xl font-black text-white mb-8 text-center">
            Visit Our Central Repair Lab
          </h2>
          <div className="grid md:grid-cols-2 gap-8 bg-slate-900/30 backdrop-blur-md p-6 rounded-3xl border border-slate-800">
            <div className="space-y-6">
              <div className="flex gap-4">
                <MapPin className="text-cyan-400 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-sm text-slate-400">Location</p>
                  <p className="text-white font-medium">
                    Ibn Khaldoun St, Al Mullah Complex,<br />
                    Basement Shop 19, Hawalli
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Clock className="text-cyan-400 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-sm text-slate-400">Hours</p>
                  <p className="text-white font-medium">10:00 AM – 10:00 PM Daily</p>
                </div>
              </div>
            </div>
            {/* ✅ FIXED: Reused your MapComponent instead of hardcoding an iframe */}
            <MapComponent />
          </div>
        </section>

        {/* ─── FAQ ─── */}
        <section aria-labelledby="faq-heading" className="max-w-3xl mx-auto px-6 mb-24">
          <h2 id="faq-heading" className="text-2xl font-black text-white mb-8">
            FAQs for {formattedCity}
          </h2>
          <div className="space-y-4">
            {FAQ_DATA.map((item) => (
              <div
                key={item.question}
                className="bg-slate-900/50 backdrop-blur-md p-6 rounded-2xl border border-slate-800"
              >
                <h3 className="font-bold text-cyan-400 mb-2">{item.question}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>

      </main>
    </Layout>
  );
}
