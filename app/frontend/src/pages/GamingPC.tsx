import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Zap, Gauge, Thermometer, ArrowRight, ExternalLink, ChevronRight, Truck, Shield, Clock, Wrench, AlertTriangle, CheckCircle2, ChevronDown 
} from 'lucide-react';

const FEATURES = [
  { icon: Thermometer, title: 'Thermal Management', desc: 'Custom thermal paste application & airflow optimization.', outcome: 'Prevents thermal throttling & lowers component temps' },
  { icon: Zap, title: 'High-Speed Tuning', desc: 'BIOS, RAM XMP profiling, & OS optimization for maximum performance.', outcome: 'More stable frame pacing during intense gaming' },
  { icon: Gauge, title: 'Cooling Loop Repair', desc: 'Professional maintenance for custom and AIO systems.', outcome: 'Reduced pump noise & smoother gameplay under load' },
];

const SERVICES = [
  'GPU repair & artifacting diagnostics',
  'Liquid cooling maintenance (Kuwait)',
  'FPS optimization & system tuning',
  'PSU power delivery & stability checks',
  'Motherboard VRM cooling & cable management',
  'Overclocking stability & driver conflict resolution',
];

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://www.computerrepairkuwait.com/gaming-pc-repair-kuwait#webpage",
  "name": "Gaming PC Repair & Performance Tuning in Kuwait | KCROC",
  "url": "https://www.computerrepairkuwait.com/gaming-pc-repair-kuwait",
  "description": "Expert gaming PC repair, liquid cooling maintenance & performance tuning in Kuwait.",
  "mainEntity": { "@id": "https://www.computerrepairkuwait.com/gaming-pc-repair-kuwait#service" },
  "breadcrumb": { "@id": "https://www.computerrepairkuwait.com/gaming-pc-repair-kuwait#breadcrumb" }
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.computerrepairkuwait.com/gaming-pc-repair-kuwait#service",
  "name": "Gaming PC Repair & Tuning",
  "provider": { "@type": "LocalBusiness", "@id": "https://www.computerrepairkuwait.com/#kcroc" }
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": "https://www.computerrepairkuwait.com/gaming-pc-repair-kuwait#breadcrumb",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.computerrepairkuwait.com/" },
    { "@type": "ListItem", "position": 2, "name": "Gaming PC Repair", "item": "https://www.computerrepairkuwait.com/gaming-pc-repair-kuwait" }
  ]
};

export default function GamingPC() {
  const [showAllServices, setShowAllServices] = useState(false);

  return (
    <main id="main-content" className="min-h-screen bg-gray-950 text-white pb-20">
      <Helmet>
        <title>Gaming PC Repair & Performance Tuning in Kuwait | KCROC</title>
        <script type="application/ld+json">{JSON.stringify([pageSchema, serviceSchema, breadcrumbSchema])}</script>
      </Helmet>

      {/* Hero Section */}
      <section className="py-20 px-6 text-center bg-gradient-to-b from-purple-900/20 to-gray-950 border-b border-gray-900">
        <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tight">Elite Gaming PC Performance Tuning</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">Professional gaming PC repair in Kuwait. From liquid cooling to FPS optimization, we keep your rig running at peak potential.</p>
        <Button size="lg" className="bg-purple-600 hover:bg-purple-700" asChild>
          <a href="https://wa.me/96555301913">Book Tuning <ExternalLink className="ml-2 w-4 h-4" /></a>
        </Button>
      </section>

      {/* Services Section with Expandable UX */}
      <section className="py-12 px-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Specialized Services</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {(showAllServices ? SERVICES : SERVICES.slice(0, 4)).map((item) => (
            <div key={item} className="flex items-center p-4 bg-gray-900/50 rounded-lg border border-gray-800">
              <ChevronRight aria-hidden="true" className="text-purple-500 mr-3" />
              <span>{item}</span>
            </div>
          ))}
        </div>
        {!showAllServices && (
          <button onClick={() => setShowAllServices(true)} className="mt-6 w-full py-3 text-purple-400 flex items-center justify-center gap-2 hover:text-purple-300">
            View All Services <ChevronDown className="w-4 h-4" />
          </button>
        )}
      </section>

      {/* Trust-Reinforced CTA */}
      <section className="py-12 text-center">
        <div className="flex justify-center gap-8 mb-6 text-sm text-emerald-400 font-semibold">
          <span>✓ Free Diagnosis</span>
          <span>✓ No Hidden Fees</span>
        </div>
        <Button size="lg" className="bg-green-600 hover:bg-green-700" asChild>
          <a href="https://wa.me/96555301913">Get Free Pickup & Drop <Truck className="ml-2 w-5 h-5" /></a>
        </Button>
      </section>
    </main>
  );
}
