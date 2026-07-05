// File: app/frontend/src/pages/Home.tsx
import React from 'react';
import { SEOEngine } from '../core/components/SEOEngine';
import Hero from '../components/home/Hero';
import ServicesGrid from '../components/home/ServicesGrid';
import { ChatWidget } from '../components/ChatWidget';
import { ShieldCheck, Zap, Clock, Star } from 'lucide-react';

// Simplified "Why Us" Section: Keeps the homepage assembly clean
const WhyUs = () => (
  <section className="w-full bg-slate-900 py-24 px-6 border-t border-slate-800">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-4xl font-black text-white mb-16 text-center">Why KCROC vs. Mall Shops?</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { icon: Zap, title: "Component-Level Repair", desc: "We fix the board, we don't just swap it. Saving you money and data." },
          { icon: ShieldCheck, title: "No Fix, No Fee", desc: "If our diagnostic reveals the repair isn't viable, you pay absolutely nothing." },
          { icon: Clock, title: "Free Pick & Drop", desc: "We collect from Hawalli, Salmiya, Kuwait City, and beyond. No travel required." }
        ].map((feature, idx) => (
          <div key={idx} className="bg-slate-950 p-8 rounded-2xl border border-slate-800 hover:border-emerald-500/30 transition-all">
            <feature.icon className="w-10 h-10 text-emerald-500 mb-6" />
            <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-slate-950">
      {/* 🚀 SEO Engine links this page to the Hawalli Location Entity */}
      <SEOEngine entityId="loc-hawalli" />

      {/* Dynamic Content Layers */}
      <Hero />
      <ServicesGrid />
      <WhyUs />
      
      {/* Global Conversions */}
      <ChatWidget />
    </main>
  );
}
