// File: app/frontend/src/pages/ProblemsIndex.tsx
//
// 🩹 FIX: "/problems" previously had no route at all — it fell through to the
// dynamic `:slug` handler (DynamicRoutes.tsx), which only matches slugs that
// exist as Services/Brands/Problems in KCROC_GRAPH, so it 404'd. It was also
// missing from the Problems mega menu dropdown (see NavigationCompiler.ts).
// This page + its route in App.tsx fixes both.
import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ChevronRight } from 'lucide-react';
import { KCROC_GRAPH } from '../data/graph';
import { SEOEngine } from '../core/components/SEOEngine';

const URGENCY_STYLES: Record<string, string> = {
  high: 'text-red-400 bg-red-900/20 border-red-500/20',
  medium: 'text-amber-400 bg-amber-900/20 border-amber-500/20',
  low: 'text-slate-400 bg-slate-800/40 border-slate-700/40',
};

export default function ProblemsIndex() {
  const problems = KCROC_GRAPH.problems;

  return (
    <>
      <SEOEngine entityId="page-problems" />

      <main className="min-h-screen bg-slate-950 text-white pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <header className="mb-16 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-6">Common Problems</h1>
            <p className="text-xl text-slate-400 max-w-2xl">
              Browse the issues we diagnose and repair every day, with the likely causes and our
              fix for each.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {problems.map((problem) => (
              <Link
                key={problem.id}
                to={`/${problem.slug}`}
                className="group block bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-cyan-500/50 hover:bg-slate-800/50 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <ShieldAlert className="w-7 h-7 text-cyan-400" />
                  </div>
                  {problem.urgency && (
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${URGENCY_STYLES[problem.urgency] || URGENCY_STYLES.low}`}>
                      {problem.urgency} urgency
                    </span>
                  )}
                </div>

                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {problem.title}
                </h2>

                <p className="text-slate-400 mb-6 line-clamp-2">{problem.description}</p>

                <div className="flex items-center text-sm font-bold text-cyan-500 group-hover:text-cyan-400">
                  Diagnosis & Fix <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
