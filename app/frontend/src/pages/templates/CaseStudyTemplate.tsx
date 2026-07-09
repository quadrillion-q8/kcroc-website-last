// File: app/frontend/src/pages/templates/CaseStudyTemplate.tsx
import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { KCROC_GRAPH } from '../../data/graph'; // ✅ FIXED IMPORT
import { SEOEngine } from '../../core/components/SEOEngine';
import { Microscope, Clock, BadgeDollarSign, MapPin } from 'lucide-react';

const CaseStudyTemplate: React.FC = () => {
  const location = useLocation();
  const slug = location.pathname.split('/').pop(); 
  
  const caseStudy = KCROC_GRAPH.caseStudies?.find(c => c.slug === slug);

  if (!caseStudy) return <Navigate to="/404" replace />;

  return (
    <div className="bg-slate-950 min-h-screen text-slate-200">
      <SEOEngine entityId={caseStudy.id} />
      
      <section className="pt-24 pb-12 px-6 border-b border-slate-800">
        <div className="max-w-4xl mx-auto">
          <span className="text-cyan-400 font-bold uppercase tracking-widest text-sm mb-4 block">Repair Case Study</span>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
            {caseStudy.title}
          </h1>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
              <Microscope className="w-5 h-5 text-cyan-500 mb-2" />
              <p className="text-xs text-slate-500 uppercase font-bold mb-1">Device</p>
              <p className="text-sm font-medium text-white">{caseStudy.device}</p>
            </div>
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
              <MapPin className="w-5 h-5 text-cyan-500 mb-2" />
              <p className="text-xs text-slate-500 uppercase font-bold mb-1">Location</p>
              <p className="text-sm font-medium text-white">{caseStudy.location}</p>
            </div>
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
              <Clock className="w-5 h-5 text-cyan-500 mb-2" />
              <p className="text-xs text-slate-500 uppercase font-bold mb-1">Time</p>
              <p className="text-sm font-medium text-white">{caseStudy.timeToRepair}</p>
            </div>
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
              <BadgeDollarSign className="w-5 h-5 text-cyan-500 mb-2" />
              <p className="text-xs text-slate-500 uppercase font-bold mb-1">Saved</p>
              <p className="text-sm font-medium text-white text-wrap overflow-hidden">{caseStudy.costVsReplacement}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 max-w-4xl mx-auto">
        <div className="prose prose-invert prose-cyan max-w-none">
          <h3 className="text-xl font-bold text-white mb-2">The Symptom</h3>
          <p className="text-slate-300 bg-slate-900/50 p-4 rounded-lg border-l-4 border-rose-500 mb-8">{caseStudy.symptom}</p>
          
          <h3 className="text-xl font-bold text-white mb-2">The Diagnosis</h3>
          <p className="text-slate-300 leading-relaxed mb-8">{caseStudy.diagnosis}</p>
          
          <h3 className="text-xl font-bold text-white mb-2">The Repair Process</h3>
          <p className="text-slate-300 leading-relaxed mb-8">{caseStudy.repair}</p>
          
          <h3 className="text-xl font-bold text-white mb-2">The Outcome</h3>
          <div className="p-6 bg-cyan-950/20 border border-cyan-900/50 rounded-xl">
            <p className="text-cyan-100 font-medium leading-relaxed">{caseStudy.outcome}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudyTemplate;
