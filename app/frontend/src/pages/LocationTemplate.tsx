// File: app/frontend/src/pages/LocationTemplate.tsx
import React, { useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  MapPin, Truck, Shield, Zap, Cpu, Wrench, 
  MessageCircle, Clock, CheckCircle2 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

// SEO & Data
import { SEOEngine } from '../core/components/SEOEngine';
import SchemaMarkup from '../components/seo/SchemaMarkup';
import { KCROC_GRAPH } from '../data/graph';

export default function LocationTemplate() {
  const { slug } = useParams<{ slug: string }>();
  
  // Find the location dynamically from the Knowledge Graph
  const location = KCROC_GRAPH.locations?.find(loc => loc.id === `loc-${slug}` || loc.title.toLowerCase() === slug?.replace(/-/g, ' '));
  const business = KCROC_GRAPH.business!;

  // If the URL slug doesn't match a known location, bounce them safely to the 404
  if (!location) {
    return <Navigate to="/404" replace />;
  }

  const WA_LINK = `https://wa.me/${business.telephone}?text=${encodeURIComponent(`Hi KCROC, I am located in ${location.title} and need a device repaired. Can we arrange a pickup?`)}`;

  const activeServices = KCROC_GRAPH.services?.filter(s => s.isActive).slice(0, 4) || [];

  // 🚀 Generate Breadcrumb Schema for Local SEO Rich Results
  const BASE_URL = 'https://www.computerrepairkuwait.com';
  const PAGE_URL = `${BASE_URL}/location/${slug}`;
  
  const BREADCRUMB_SCHEMA = useMemo(() => ({
    '@type': 'BreadcrumbList',
    '@id': `${PAGE_URL}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: location.title, item: PAGE_URL },
    ],
  }), [location.title, slug]);

  return (
    <main className="w-full min-h-screen bg-gray-950 text-white font-sans selection:bg-cyan-500/30">
      
      {/* 🚀 Dynamic SEO Engine automatically handles LocalBusiness/Service schema for this specific area */}
      <SEOEngine entityId={location.id} />
      <SchemaMarkup schema={BREADCRUMB_SCHEMA} />
      
      <Helmet>
        <title>Computer & Laptop Repair in {location.title} | KCROC</title>
        <meta name="description" content={`Expert computer, MacBook, and logic board repair in ${location.title}. Free pickup and delivery. We fix the board, we don't just swap it.`} />
      </Helmet>

      {/* ─── HERO SECTION ─── */}
      <section className="relative pt-8 sm:pt-16 lg:pt-24 pb-12 sm:pb-24 px-4 sm:px-6 overflow-hidden border-b border-slate-900">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-950 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(34,211,238,0.05),transparent_50%)]" />
        
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto mb-8 relative z-10 mt-8 sm:mt-0">
          <ol className="flex items-center space-x-2 text-xs sm:text-sm text-slate-400 font-medium">
            <li><Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
            <li><span className="text-slate-600">/</span></li>
            <li aria-current="page" className="text-cyan-400">{location.title}</li>
          </ol>
        </nav>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="max-w-3xl space-y-6">
            <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30 px-3 py-1.5 text-xs font-bold uppercase tracking-widest">
              <MapPin className="w-3 h-3 mr-2 inline" aria-hidden="true" />
              Now Serving {location.title}
            </Badge>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight">
              Elite Computer Repair in <br />
              <span className="text-cyan-400">{location.title}</span>
            </h1>
            <p className="text-sm sm:text-lg text-slate-300 leading-relaxed max-w-xl">
              {location.description || `Fast, component-level repair for laptops, MacBooks, and gaming PCs. We offer completely free pickup and delivery directly from your location in ${location.title}.`}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
              <Button size="lg" className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-8 w-full sm:w-auto shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:scale-[1.02] transition-all" asChild>
                <Link to="/book">
                  <Truck className="mr-2 h-5 w-5" aria-hidden="true" /> Book Free Pickup
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-slate-700 text-white hover:bg-slate-800 w-full sm:w-auto" asChild>
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" /> WhatsApp Us
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── VALUE PROPOSITION (.scroll-row on mobile) ─── */}
      <section className="py-12 sm:py-24 px-4 sm:px-6 relative z-10 border-b border-slate-800/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl font-black text-white mb-3 tracking-tight">We Fix The Board. We Don't Just Swap It.</h2>
            <p className="text-slate-400 text-sm sm:text-base">Premium micro-soldering and logic board recovery brought directly to your door.</p>
          </div>

          <div className="scroll-row gap-3 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 sm:gap-6">
            <Card className="scroll-row-item w-[85%] sm:w-auto bg-slate-900/30 backdrop-blur-md border border-slate-800 text-left">
              <CardHeader className="p-6">
                <div className="w-12 h-12 bg-slate-950 rounded-xl flex items-center justify-center mb-4 border border-slate-800 shrink-0">
                  <Truck className="w-5 h-5 text-cyan-400" aria-hidden="true" />
                </div>
                <CardTitle className="text-xl font-black text-white mb-2">Free Logistics</CardTitle>
                <p className="text-slate-400 text-sm leading-relaxed">No traffic, no parking. We dispatch a courier to {location.title} to collect your device securely and return it when fixed.</p>
              </CardHeader>
            </Card>
            
            <Card className="scroll-row-item w-[85%] sm:w-auto bg-slate-900/30 backdrop-blur-md border border-slate-800 text-left">
              <CardHeader className="p-6">
                <div className="w-12 h-12 bg-slate-950 rounded-xl flex items-center justify-center mb-4 border border-slate-800 shrink-0">
                  <Cpu className="w-5 h-5 text-cyan-400" aria-hidden="true" />
                </div>
                <CardTitle className="text-xl font-black text-white mb-2">Component-Level Repair</CardTitle>
                <p className="text-slate-400 text-sm leading-relaxed">We isolate and replace the exact failed chips on your logic board, saving you hundreds of dinars over standard part swapping.</p>
              </CardHeader>
            </Card>

            <Card className="scroll-row-item w-[85%] sm:w-auto bg-slate-900/30 backdrop-blur-md border border-slate-800 text-left">
              <CardHeader className="p-6">
                <div className="w-12 h-12 bg-slate-950 rounded-xl flex items-center justify-center mb-4 border border-slate-800 shrink-0">
                  <Shield className="w-5 h-5 text-cyan-400" aria-hidden="true" />
                </div>
                <CardTitle className="text-xl font-black text-white mb-2">Data Privacy</CardTitle>
                <p className="text-slate-400 text-sm leading-relaxed">Your personal files remain untouched. We utilize strict hardware-only diagnostic protocols to ensure your data stays private.</p>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* ─── LOCAL SERVICES GRID ─── */}
      <section className="py-12 sm:py-24 px-4 sm:px-6 bg-slate-900/20">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-2xl sm:text-4xl font-black mb-8 sm:mb-12 text-center text-white tracking-tight">Services Available in {location.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeServices.map((service) => (
              <Link
                key={service.id}
                to={`/${service.slug}`}
                className="group bg-slate-900/50 p-6 rounded-2xl border border-slate-800 hover:border-cyan-500 transition-all flex items-start text-left"
              >
                <div className="bg-slate-950 border border-slate-800 w-12 h-12 rounded-xl flex items-center justify-center mr-4 shrink-0 mt-1">
                  <Wrench className="w-5 h-5 text-cyan-500" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">{service.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-3">{service.shortDescription}</p>
                  <span className="text-xs font-bold text-cyan-500 flex items-center">
                    Learn More <CheckCircle2 className="w-3 h-3 ml-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
