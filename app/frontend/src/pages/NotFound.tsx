// File: app/frontend/src/pages/NotFound.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowRight, Home } from 'lucide-react';

// 👈 Phase 2 SEO Engine Imported
import { SEOEngine } from '../core/components/SEOEngine';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
      
      {/* 🚀 Ensures the page doesn't index and handles basic titles */}
      <SEOEngine entityId="page-404" />

      {/* Icon with subtle pulse for visual interest */}
      <div className="mb-8 animate-pulse">
        <ShieldAlert className="w-24 h-24 text-cyan-500" />
      </div>

      <h1 className="text-6xl md:text-8xl font-black text-white mb-4 tracking-tighter">
        404
      </h1>
      <h2 className="text-2xl md:text-3xl font-bold text-slate-300 mb-6">
        Looks like your device wandered off.
      </h2>
      <p className="max-w-md text-slate-400 mb-10 text-lg mx-auto">
        We couldn't find the page you're looking for, but we're experts at recovering lost data and fixing broken systems. Let's get you back to the right place.
      </p>

      {/* Conversion Actions - Designed to keep users on-site */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link 
          to="/" 
          className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-full font-bold transition-all"
        >
          <Home className="w-5 h-5" /> Back to Home
        </Link>
        <Link 
          to="/services" 
          className="flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-8 py-4 rounded-full font-black transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:scale-105"
        >
          View Our Services <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}
