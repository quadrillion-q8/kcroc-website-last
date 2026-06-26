import React, { useMemo } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { ShieldCheck, Truck, Zap, MessageCircle, ArrowRight } from 'lucide-react';

import { BUSINESS_INFO } from '../../constants/data';
import { ROUTES } from '../../constants/routes';
import { AI_PAGES_DATA } from '../../constants/aiPagesData';
import { autoLinkText } from '../../utils/linkGraph';
import { getIntentWhatsAppLink } from '../../utils/whatsappIntent';
import MetaSEO from '../../components/seo/MetaSEO';
import SchemaMarkup from '../../components/seo/SchemaMarkup';

export default function AILandingTemplate() {
  const { intentSlug } = useParams<{ intentSlug: string }>();
  
  const pageData = intentSlug ? AI_PAGES_DATA[intentSlug] : null;

  if (!pageData) {
    return <Navigate to={ROUTES.home} replace />;
  }

  const pageUrl = `${BUSINESS_INFO.url}/ai/${pageData.slug}`;
  const waLink = getIntentWhatsAppLink("service", pageData.h1);

  // ─── SEMANTIC SCHEMA GENERATION ───
  const SCHEMA_DATA = useMemo(() => ({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        "url": pageUrl,
        "name": pageData.metaTitle,
        "description": pageData.metaDescription,
        "isPartOf": { "@id": `${BUSINESS_INFO.url}/#website` }
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        "mainEntity": pageData.faqs.map(faq => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": { "@type": "Answer", "text": faq.a }
        }))
      },
      {
        "@type": "Service",
        "name": pageData.h1,
        "provider": {
          "@type": "LocalBusiness",
          "name": BUSINESS_INFO.name,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19",
            "addressLocality": "Hawalli",
            "addressCountry": "KW"
          }
        }
      }
    ]
  }), [pageData, pageUrl]);

  return (
    <main className="w-full min-h-screen bg-transparent text-slate-200 pt-32 pb-24">
      <MetaSEO
        title={pageData.metaTitle}
        description={pageData.metaDescription}
        canonical={pageUrl}
      />
      <SchemaMarkup schema={SCHEMA_DATA} />

      {/* ─── HERO ─── */}
      <header className="max-w-4xl mx-auto px-6 mb-16">
        <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
          {pageData.h1}
        </h1>
        <p className="text-xl text-slate-400 leading-relaxed border-l-4 border-cyan-500 pl-6 mb-8">
          {autoLinkText(pageData.intro)}
        </p>

        <div className="flex flex-wrap gap-4 mt-8">
          <span className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-2 rounded-full text-sm font-bold text-emerald-400">
            <Truck size={16} /> Free Pick & Drop
          </span>
          <span className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-2 rounded-full text-sm font-bold text-cyan-400">
            <ShieldCheck size={16} /> 30-Day Warranty
          </span>
          <span className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-2 rounded-full text-sm font-bold text-amber-400">
            <Zap size={16} /> No Fix, No Fee
          </span>
        </div>
      </header>

      {/* ─── CONTENT SECTIONS ─── */}
      <article className="max-w-4xl mx-auto px-6 space-y-12 mb-20">
        {pageData.sections.map((section, idx) => (
          <section key={idx} className="bg-slate-900/40 backdrop-blur-sm p-8 rounded-3xl border border-slate-800/50 hover:border-cyan-500/30 transition-colors">
            <h2 className="text-2xl font-bold text-white mb-4">{section.heading}</h2>
            <p className="text-slate-300 leading-relaxed text-lg">
              {autoLinkText(section.content)}
            </p>
          </section>
        ))}
      </article>

      {/* ─── FAQ CLUSTER ─── */}
      <section className="max-w-3xl mx-auto px-6 mb-20">
        <h2 className="text-3xl font-black text-white mb-8 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {pageData.faqs.map((faq, idx) => (
            <div key={idx} className="bg-slate-900/50 p-6 rounded-2xl border border-slate-700/50">
              <h3 className="font-bold text-cyan-400 mb-2">{faq.q}</h3>
              <p className="text-slate-300">{autoLinkText(faq.a)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── INTENT CTA ─── */}
      <section className="max-w-4xl mx-auto px-6">
        <div className="bg-gradient-to-br from-slate-900 to-[#0a0f1c] border border-cyan-900/50 p-10 rounded-3xl text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[60px] rounded-full pointer-events-none" aria-hidden="true" />
          <h2 className="text-3xl font-black text-white mb-4">Ready to fix your device?</h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Book a free pick-up today. Our technicians will diagnose your computer and provide a transparent quote before any work begins.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-8 py-4 rounded-xl font-black transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:scale-105"
            >
              <MessageCircle size={20} /> Chat via WhatsApp
            </a>
            <Link 
              to={ROUTES.contact}
              className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 hover:border-slate-600 px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
            >
              Contact Lab <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
