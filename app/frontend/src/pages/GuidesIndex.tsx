// File: app/frontend/src/pages/GuidesIndex.tsx
//
// 🩹 FIX: "/guides" previously had no route at all, so it 404'd — the only
// registered guide routes were the two specific guide pages themselves
// (App.tsx: /guides/laptop-battery-warning-signs and
// /guides/dell-inspiron-15-3000-overheating). It was also missing from the
// Guides mega menu dropdown, whose `sections` array was empty (see
// NavigationCompiler.ts). This page + its route in App.tsx fixes both.
import React from 'react';
import { Link } from 'react-router-dom';
import { BatteryWarning, Cpu, ChevronRight } from 'lucide-react';
import { SEOEngine } from '../core/components/SEOEngine';

interface GuideLink {
  slug: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

// Kept as a small static list (rather than pulled from the graph) because
// there are only two of these hand-written diagnostic guides today. Add new
// guides here, in App.tsx's routes array, and in NavigationCompiler.ts's
// compileGuidesMegaMenu() when a new one is published.
const GUIDES: GuideLink[] = [
  {
    slug: 'guides/dell-inspiron-15-3000-overheating',
    title: 'Dell Inspiron 15 3000 Overheating',
    description: 'Step-by-step thermal troubleshooting for the Dell Inspiron 15 3000 series — causes, safe checks, and when to bring it in.',
    icon: Cpu,
  },
  {
    slug: 'guides/laptop-battery-warning-signs',
    title: 'Laptop Battery Warning Signs',
    description: 'The 4 critical warning signs of lithium-ion battery failure, and what to do before it becomes a safety issue.',
    icon: BatteryWarning,
  },
];

export default function GuidesIndex() {
  return (
    <>
      <SEOEngine
        fallback={{
          title: 'DIY & Repair Guides | KCROC Kuwait',
          description: 'Free diagnostic and troubleshooting guides for common laptop problems, written by KCROC\u2019s Kuwait-based repair technicians.',
        }}
      />

      <main className="min-h-screen bg-slate-950 text-white pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <header className="mb-16 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-6">DIY & Repair Guides</h1>
            <p className="text-xl text-slate-400 max-w-2xl">
              Free, technician-written guides to help you diagnose common laptop problems before
              deciding whether it's a DIY fix or a job for the lab.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {GUIDES.map((guide) => {
              const Icon = guide.icon;
              return (
                <Link
                  key={guide.slug}
                  to={`/${guide.slug}`}
                  className="group block bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-cyan-500/50 hover:bg-slate-800/50 transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mb-6">
                    <Icon className="w-7 h-7 text-cyan-400" />
                  </div>

                  <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {guide.title}
                  </h2>

                  <p className="text-slate-400 mb-6 line-clamp-2">{guide.description}</p>

                  <div className="flex items-center text-sm font-bold text-cyan-500 group-hover:text-cyan-400">
                    Read Guide <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}
