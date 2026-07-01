// File: app/frontend/src/pages/templates/ServiceTemplate.tsx
import React, { useMemo } from 'react';
import { Phone, MessageCircle, ShieldCheck, Clock, Truck, CheckCircle2, ChevronRight, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BUSINESS_INFO } from '../../constants';
import { SEOEngine } from '../../core/components/SEOEngine';
import { ROUTES } from '../../constants/routes';

export interface ServiceTemplateProps {
  seoTitle: string;
  seoDescription: string;
  title: string;
  subtitle: string;
  heroImage?: string;
  icon: React.ElementType;
  commonIssues: { title: string; description: string }[];
}

export const ServiceTemplate: React.FC<ServiceTemplateProps> = ({
  seoTitle,
  seoDescription,
  title,
  subtitle,
  icon: Icon,
  commonIssues,
}) => {
  // ─── DYNAMIC SEO & SCHEMA ───
  const pageCanonical = `${BUSINESS_INFO.url}${window.location.pathname}`;
  
  const seoData = useMemo(() => ({
    title: seoTitle,
    description: seoDescription,
    canonicalUrl: pageCanonical,
    robots: 'index, follow',
  }), [seoTitle, seoDescription, pageCanonical]);

  const schemaData = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': title,
    'provider': { '@id': `${BUSINESS_INFO.url}/#business` },
    'areaServed': { '@type': 'Country', 'name': 'Kuwait' },
    'description': seoDescription,
  }), [title, seoDescription]);

  return (
    <div className="w-full flex flex-col items-center">
      <SEOEngine seo={seoData} schemas={[schemaData]} />

      {/* ─── HERO SECTION ─── */}
      <section className="relative w-full max-w-7xl mx-auto px-6 pt-16 pb-20 flex flex-col items-center text-center">
        <div className="w-20 h-20 bg-brand-primary/10 rounded-full flex items-center justify-center mb-8 border border-brand-primary/20 shadow-glow">
          <Icon className="w-10 h-10 text-brand-primary" aria-hidden="true" />
        </div>
        
        <h1 className="text-h2 md:text-h1 font-heading font-black mb-6 max-w-4xl tracking-tight text-white">
          {title}
        </h1>
        
        <p className="text-subtitle text-slate-300 max-w-2xl mb-10">
          {subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <a
            href={`tel:${BUSINESS_INFO.phone}`}
            className="flex items-center justify-center gap-2 px-8 py-4 bg-brand-primary hover:bg-brand-accent text-brand-dark font-bold rounded-button transition-all text-body"
          >
            <Phone className="w-5 h-5" aria-hidden="true" /> Call Technician
          </a>
          <a
            href={`https://wa.me/${BUSINESS_INFO.cleanPhone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-8 py-4 bg-surface-elevated hover:bg-surface-hover text-white font-bold rounded-button transition-all text-body border border-surface-hover"
          >
            <MessageCircle className="w-5 h-5 text-status-success" aria-hidden="true" /> WhatsApp for Quote
          </a>
        </div>
      </section>

      {/* ─── COMMON ISSUES GRID ─── */}
      <section className="w-full bg-surface-glass border-y border-surface-hover py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-h2 font-heading font-black mb-4">Common Issues We Fix</h2>
            <p className="text-body text-slate-400 max-w-2xl mx-auto">
              If you are experiencing any of these symptoms, our enterprise-grade lab can diagnose and resolve the problem down to the component level.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {commonIssues.map((issue, idx) => (
              <div key={idx} className="bg-surface border border-surface-hover rounded-card p-6 shadow-surface hover:border-brand-primary/50 transition-colors">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-brand-primary flex-shrink-0 mt-1" aria-hidden="true" />
                  <div>
                    <h3 className="text-body font-bold text-white mb-2">{issue.title}</h3>
                    <p className="text-caption text-slate-400">{issue.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── THE KCROC PROCESS ─── */}
      <section className="w-full max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-h2 font-heading font-black mb-4">How It Works</h2>
          <p className="text-body text-slate-400">Zero hassle. Free transport. Enterprise engineering.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-surface-hover -z-10 -translate-y-1/2"></div>
          
          {[
            { icon: Truck, title: "1. Free Pick & Drop", desc: "We collect your device from anywhere in Kuwait." },
            { icon: Wrench, title: "2. Lab Diagnosis", desc: "Expert component-level troubleshooting & repair." },
            { icon: ShieldCheck, title: "3. Tested & Returned", desc: "Delivered back to your door with a 30-day warranty." }
          ].map((step, idx) => (
            <div key={idx} className="bg-surface border border-surface-hover rounded-card p-8 text-center shadow-surface flex flex-col items-center">
              <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center border border-brand-primary/20 mb-6">
                <step.icon className="w-8 h-8 text-brand-primary" aria-hidden="true" />
              </div>
              <h3 className="text-h3 font-bold text-white mb-3">{step.title}</h3>
              <p className="text-body text-slate-400">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
