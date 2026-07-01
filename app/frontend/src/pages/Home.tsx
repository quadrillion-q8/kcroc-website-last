// File: app/frontend/src/pages/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, ShieldCheck, Clock, Star, ArrowRight, Laptop, Apple, Gamepad2, Cpu, Monitor } from 'lucide-react';
import { BUSINESS_INFO } from '../constants';
import { getPopularServices } from '../knowledge/registry';
import { SEOEngine } from '../core/components/SEOEngine';
import { trackEvent } from '../analytics/Telemetry'; // ✅ IMPORTED TELEMETRY HERE

const IconMap: Record<string, React.ElementType> = {
  Laptop, Apple, Gamepad2, Cpu, Monitor
};

const Home: React.FC = () => {
  const popularServices = getPopularServices();

  const seoData = {
    title: "Kuwait Computer Repair On Call | MacBook & Laptop Repair",
    description: "Same-day laptop, MacBook & PC repair in Kuwait. Free Pick & Drop. 4.9★ Google rating, 30-day warranty. Call +965 55301913.",
    canonicalUrl: BUSINESS_INFO.url,
    robots: "index, follow"
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "KCROC - Kuwait Computer Repair On Call",
    "image": BUSINESS_INFO.logo || BUSINESS_INFO.url + "/logo.png",
    "@id": BUSINESS_INFO.url,
    "url": BUSINESS_INFO.url,
    "telephone": BUSINESS_INFO.phone,
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kuwait City",
      "addressCountry": "KW"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 29.3759,
      "longitude": 47.9774
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "00:00",
      "closes": "23:59"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "142"
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <SEOEngine seo={seoData} schemas={[localBusinessSchema]} />

      <section className="relative w-full max-w-7xl mx-auto px-6 pt-20 pb-24 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-elevated border border-surface-hover mb-8">
          <Star className="w-4 h-4 text-status-warning fill-status-warning" />
          <span className="text-caption font-bold text-white">4.9/5 Average Rating in Kuwait</span>
        </div>
        
        <h1 className="text-display font-heading font-black mb-6 max-w-5xl tracking-tight text-foreground">
          Kuwait's Most Trusted <br />
          <span className="text-brand-primary">Tech Clinic</span>
        </h1>
        
        <p className="text-subtitle text-slate-300 max-w-2xl mb-10">
          Enterprise-grade repair for Laptops, MacBooks, and Gaming PCs. Free pick-up and delivery across all governorates with a strict no-fix, no-fee policy.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <a
            href={`tel:${BUSINESS_INFO.phone}`}
            // ✅ ADDED TELEMETRY TRACKING TO PHONE BUTTON
            onClick={() => trackEvent({ category: 'Contact', action: 'Click_Phone', label: 'Hero_Section' })}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-brand-primary hover:bg-brand-accent text-brand-dark font-bold rounded-button transition-all text-body"
          >
            <Phone className="w-5 h-5" /> Call Technician
          </a>
          <a
            href={`https://wa.me/${BUSINESS_INFO.cleanPhone}`}
            target="_blank"
            rel="noopener noreferrer"
            // ✅ ADDED TELEMETRY TRACKING TO WHATSAPP BUTTON
            onClick={() => trackEvent({ category: 'Contact', action: 'Click_WhatsApp', label: 'Hero_Section' })}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-surface-elevated hover:bg-surface-hover text-white font-bold rounded-button transition-all text-body border border-surface-hover"
          >
            <MessageCircle className="w-5 h-5 text-status-success" /> Message on WhatsApp
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-10 border-t border-surface-hover w-full max-w-4xl">
          {[
            { label: "Repairs Completed", value: "500+" },
            { label: "Success Rate", value: "98%" },
            { label: "Warranty", value: "30 Days" },
            { label: "Pick & Drop", value: "Free" }
          ].map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <span className="text-h2 font-black text-white">{stat.value}</span>
              <span className="text-caption text-slate-400">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full bg-surface-glass border-y border-surface-hover py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-h2 font-heading font-black mb-4">Our Capabilities</h2>
              <p className="text-body text-slate-400 max-w-2xl">
                Component-level engineering direct from our lab to your door.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularServices.map((service) => {
              const ServiceIcon = IconMap[service.icon] || Laptop;
              return (
                <Link 
                  key={service.id} 
                  to={`/${service.slug}`}
                  // ✅ ADDED TELEMETRY TRACKING TO SERVICE CARDS
                  onClick={() => trackEvent({ category: 'Navigation', action: 'Click_ServiceCard', label: service.name })}
                  className="group bg-surface-default border border-surface-hover rounded-card p-8 hover:border-brand-primary transition-all duration-300 flex flex-col h-full"
                >
                  <div className="w-14 h-14 bg-surface-elevated rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-primary/10 transition-colors">
                    <ServiceIcon className="w-7 h-7 text-brand-primary" />
                  </div>
                  <h3 className="text-h3 font-bold text-white mb-3">{service.name}</h3>
                  <p className="text-body text-slate-400 mb-8 flex-grow">{service.description}</p>
                  
                  <div className="flex items-center text-brand-primary font-bold text-sm mt-auto group-hover:translate-x-2 transition-transform">
                    View Service Details <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="w-full max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Clock, title: "Same-Day Service", desc: "Most repairs are completed and returned to you within 24 hours." },
            { icon: ShieldCheck, title: "Data Privacy", desc: "Military-grade data protection protocols. We never browse your files." },
            { icon: Star, title: "Original Parts", desc: "We only use OEM or high-tier certified replacement components." }
          ].map((feature, idx) => (
            <div key={idx} className="bg-surface-default border border-surface-hover rounded-card p-8 text-center flex flex-col items-center">
              <feature.icon className="w-10 h-10 text-brand-primary mb-6" />
              <h3 className="text-h3 font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-body text-slate-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;
