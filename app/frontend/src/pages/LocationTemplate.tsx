import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, ExternalLink, ArrowRight, Clock 
} from 'lucide-react';
import { BUSINESS_INFO, AREAS } from '../constants/data';
import MetaSEO from '../components/seo/MetaSEO';
import SchemaMarkup from '../components/seo/SchemaMarkup';

const formatTitleCase = (slug: string = '') => 
  slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');

export default function LocationTemplate() {
  const { service, city } = useParams();
  
  // Normalize the city for object lookup
  const cityKey = city?.toLowerCase().replace(/\s/g, '').replace(/-/g, '') as keyof typeof AREAS;
  const cityData = AREAS[cityKey];
  
  const formattedCity = cityData ? cityData.name : formatTitleCase(city || 'Kuwait');
  const formattedService = formatTitleCase(service || 'Computer Repair');
  
  const pageUrl = `${BUSINESS_INFO.url}/${service}-in-${city}`;
  const waMessage = encodeURIComponent(`Hi KCROC, I'm in ${formattedCity} and need ${formattedService}.`);
  const waLink = `https://wa.me/${BUSINESS_INFO.cleanPhone}?text=${waMessage}`;

  // Generate dynamic nearby areas
  const allAreaKeys = Object.keys(AREAS);
  const nearbyAreas = allAreaKeys
    .filter(key => key !== cityKey)
    .slice(0, 3)
    .map(key => AREAS[key as keyof typeof AREAS].name);

  // 1. DYNAMIC FAQ DATA
  const FAQ_DATA = useMemo(() => [
    {
      question: `Do you provide free pickup for ${formattedService} in ${formattedCity}?`,
      answer: `Yes, we provide completely free pickup and delivery for ${formattedService.toLowerCase()} services throughout ${formattedCity}. Our technicians prioritize local routes in your area to ensure fast turnaround times.`
    },
    {
      question: `What is your turnaround time for ${formattedService} in ${formattedCity}?`,
      answer: `Most ${formattedService.toLowerCase()} diagnostics are completed within 24 hours. Because we have a dedicated team for ${formattedCity}, we can often pick up your device the same day you contact us.`
    }
  ], [formattedCity, formattedService]);

  // 2. UPDATED SCHEMA
  const SCHEMA_DATA = useMemo(() => ({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        "name": `${formattedService} in ${formattedCity} | KCROC`,
        "url": pageUrl,
        "description": cityData ? cityData.description : `Fast ${formattedService} in ${formattedCity}.`,
        "isPartOf": { "@id": `${BUSINESS_INFO.url}/#website` }
      },
      {
        "@type": "FAQPage",
        "mainEntity": FAQ_DATA.map(item => ({
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": { "@type": "Answer", "text": item.answer }
        }))
      }
    ]
  }), [formattedCity, formattedService, pageUrl, cityData, FAQ_DATA]);

  return (
    <main className="w-full min-h-screen bg-slate-950 text-slate-200 pt-32 pb-24">
      <MetaSEO 
        title={`${formattedService} in ${formattedCity} | Trusted Repair - KCROC`}
        description={cityData ? cityData.description : `Expert ${formattedService.toLowerCase()} in ${formattedCity}.`}
        canonical={pageUrl}
      />
      <SchemaMarkup schema={SCHEMA_DATA} />

      {/* Hero Section */}
      <section className="px-6 text-center mb-24">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
          {formattedService} in <span className="text-cyan-400">{formattedCity}</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10">
          {cityData ? cityData.description : `We provide specialized ${formattedService.toLowerCase()} services for residents in ${formattedCity}.`}
          {cityData && ` Our team is frequently active near ${cityData.landmark}.`}
        </p>
        <a href={waLink} className="bg-cyan-500 text-slate-950 px-8 py-4 rounded-full font-black hover:scale-105 transition-transform inline-flex items-center gap-2">
          Book {formattedCity} Pickup <ExternalLink size={20} />
        </a>
      </section>

      {/* Internal Linking Hub */}
      <section className="max-w-4xl mx-auto px-6 mb-16">
        <div className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800">
          <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <MapPin className="text-cyan-400" /> Serving {formattedCity} & Nearby
          </h3>
          <div className="flex flex-wrap gap-3">
            {nearbyAreas.map(area => (
              <Link key={area} to={`/${service}-in-${area.toLowerCase().replace(/\s/g, '')}`} className="px-4 py-2 bg-slate-800 hover:bg-cyan-900/30 rounded-lg text-sm transition-colors border border-slate-700">
                {formattedService} in {area} <ArrowRight size={14} className="inline ml-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Lab Location & Map Section */}
      <section className="max-w-4xl mx-auto px-6 mb-24">
        <h2 className="text-2xl font-black text-white mb-8 text-center">Visit Our Central Lab</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center bg-slate-900/30 p-4 md:p-8 rounded-3xl border border-slate-800">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-cyan-400" /> 
              </div>
              <div>
                <p className="font-medium text-slate-400 text-sm mb-1">HQ Address</p>
                <address className="not-italic text-white font-medium leading-relaxed text-sm">
                  Hawalli, Ibn Khaldoun St<br />
                  Al Mullah Complex<br />
                  Basement Shop 19
                </address>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-cyan-400" /> 
              </div>
              <div>
                <p className="font-medium text-slate-400 text-sm mb-1">Business Hours</p>
                <p className="text-white font-medium text-sm">Open Daily: 10:00 AM – 10:00 PM</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden border border-slate-700 h-64">
            <iframe
              src="https://maps.google.com/maps?q=Al+Mullah+Complex,+Ibn+Khaldoun+St,+Basement+Shop+19,+Hawalli,+Kuwait&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="KCROC Computer Repair - Hawalli Lab Location"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto px-6 mb-24">
        <h2 className="text-2xl font-black text-white mb-8">Frequently Asked Questions for {formattedCity}</h2>
        <div className="space-y-4">
          {FAQ_DATA.map((item, i) => (
            <div key={i} className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
              <h4 className="font-bold text-cyan-400 mb-2">{item.question}</h4>
              <p className="text-slate-400 text-sm">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
