// File: app/frontend/src/pages/NotFound.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Home, Wrench } from 'lucide-react';
import { SEOEngine } from '../core/components/SEOEngine';

export default function NotFound() {
  return (
    <>
      <SEOEngine entityId="page-404" />
      <main className="min-h-screen bg-transparent flex items-center justify-center px-6 py-24">
        <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-3xl p-12 max-w-2xl w-full text-center shadow-2xl relative overflow-hidden">
          
          {/* Subtle glow behind the 404 */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none" />

          <ShieldAlert className="w-20 h-20 text-cyan-500 mx-auto mb-6 relative z-10" />
          
          <h1 className="text-6xl font-black text-white mb-4 relative z-10 tracking-tight">404</h1>
          <h2 className="text-2xl font-bold text-slate-200 mb-6 relative z-10">Looks like a dead trace.</h2>
          
          <p className="text-lg text-slate-400 mb-10 leading-relaxed relative z-10">
            We couldn't find the page you're looking for, but we are experts at repairing broken logic boards and reviving dead components. Let's get you back to safety.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <Link 
              to="/" 
              className="flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black py-4 px-8 rounded-xl transition-all shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:scale-105"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
            <Link 
              to="/services" 
              className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 px-8 rounded-xl border border-slate-700 transition-all"
            >
              <Wrench className="w-5 h-5 text-cyan-400" />
              View Our Services
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
