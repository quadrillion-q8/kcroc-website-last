import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { 
  Zap, Gauge, Thermometer, ArrowRight, ExternalLink, ChevronRight, Truck 
} from 'lucide-react';

// ==========================================
// 1. STATIC DATA
// ==========================================

const FEATURES = [
  { icon: Thermometer, title: 'Thermal Management', desc: 'Custom thermal paste application & airflow optimization.' },
  { icon: Zap,         title: 'High-Speed Tuning',  desc: 'BIOS, RAM XMP profiling, & OS optimization for maximum FPS.' },
  { icon: Gauge,       title: 'Cooling Loop Repair', desc: 'Professional maintenance for liquid cooling and AIO systems.' },
];

const SERVICES = [
  'GPU Artifacting Diagnostics',
  'Custom Loop Cleaning',
  'PSU Power Delivery Checks',
  'Driver Conflict Resolution',
  'Cable Management & Airflow',
  'Overclocking Stability Tests',
];

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Gaming PC Repair & Performance Tuning in Kuwait",
  "url": "https://www.computerrepairkuwait.com/gaming-pc-repair-kuwait",
  "mainEntity": {
    "@type": "Service",
    "serviceType": "Gaming PC Repair & Tuning",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Kuwait Computer Repair On Call (KCROC)",
      "telephone": "+96555301913",
      "url": "https://www.computerrepairkuwait.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19",
        "addressLocality": "Hawalli",
        "addressCountry": "KW"
      }
    },
    "areaServed": [
      { "@type": "City", "name": "Kuwait City" },
      { "@type": "City", "name": "Hawalli" },
      { "@type": "City", "name": "Salmiya" },
      { "@type": "City", "name": "Farwaniya" },
      { "@type": "City", "name": "Jahra" }
    ]
  }
};

// ==========================================
// 2. MAIN COMPONENT
// ==========================================

export default function GamingPC() {
  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only absolute z-50 p-4 bg-purple-600 text-white">
        Skip to main content
      </a>

      <main 
        id="main-content" 
        className="min-h-screen bg-gray-950 text-white selection:bg-purple-500/30 pb-20 md:pb-0"
      >
        <Helmet>
          <title>Gaming PC Repair & Performance Tuning in Kuwait | KCROC</title>
          <meta 
            name="description" 
            content="Expert gaming PC repair, liquid cooling maintenance & performance tuning in Kuwait. Restore peak FPS with KCROC's free pickup & delivery. Call +965 55301913." 
          />
          <script type="application/ld+json">{JSON.stringify(pageSchema)}</script>
        </Helmet>

        {/* Hero Section */}
        <section className="py-12 md:py-20 px-6 text-center bg-gradient-to-b from-purple-900/20 to-gray-950 border-b border-gray-900">
          <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tight">
            Elite Gaming PC <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Performance Tuning
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Is your high-end system underperforming? We specialize in thermal management, liquid cooling restoration, and GPU diagnostics for your custom rig.
          </p>
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700" asChild>
            <a href="https://wa.me/96555301913" target="_blank" rel="noopener noreferrer">
              Book Performance Tuning <ExternalLink aria-hidden="true" className="ml-2 w-4 h-4" />
              <span className="sr-only">(opens WhatsApp)</span>
            </a>
          </Button>
        </section>

        {/* Expertise Pillars */}
        <section className="py-12 md:py-20 px-6 max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {FEATURES.map((feat, i) => (
            <div key={i} className="p-8 bg-gray-900/50 rounded-2xl border border-gray-800 hover:border-purple-500 transition-all">
              <feat.icon className="w-10 h-10 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">{feat.title}</h3>
              <p className="text-gray-400 text-sm">{feat.desc}</p>
            </div>
          ))}
        </section>

        {/* Service List */}
        <section className="py-12 md:py-20 px-6 bg-gray-900/50 border-y border-gray-800">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Comprehensive Service Coverage</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {SERVICES.map((item) => (
                <div key={item} className="flex items-center p-4 bg-gray-950 rounded-lg border border-gray-800">
                  <ChevronRight className="text-purple-500 mr-3" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA with USP */}
        <section className="py-12 md:py-20 px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to dominate the game again?</h2>
          <div className="flex flex-col items-center gap-6">
            <p className="text-gray-400 flex items-center gap-2">
              <Truck className="w-5 h-5 text-purple-400" />
              We offer 100% Free Pickup & Delivery across all Kuwait governorates.
            </p>
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700" asChild>
              <a href="https://wa.me/96555301913" target="_blank" rel="noopener noreferrer">
                Get Your Free Pickup <ArrowRight className="ml-2 w-5 h-5" />
                <span className="sr-only">(opens WhatsApp)</span>
              </a>
            </Button>
          </div>
        </section>

        {/* Sticky Mobile CTA */}
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gray-950/95 backdrop-blur border-t border-gray-800 md:hidden">
          <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700 w-full">
            <a href="https://wa.me/96555301913" target="_blank" rel="noopener noreferrer">
              <Truck className="mr-2 w-4 h-4" />
              Free Pickup — Book Now
              <span className="sr-only">(opens WhatsApp)</span>
            </a>
          </Button>
        </div>
      </main>
    </>
  );
}
