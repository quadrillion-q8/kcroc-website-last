// File: app/frontend/src/pages/templates/ProblemTemplate.tsx
import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { KCROC_GRAPH } from '../../data/graph'; // ✅ FIXED IMPORT
import { SEOEngine } from '../../core/components/SEOEngine';
import { AlertOctagon, CheckCircle2, ShieldAlert } from 'lucide-react';

const ProblemTemplate: React.FC = () => {
  const location = useLocation();
  const slug = location.pathname.replace(/^\/+/, ''); 
  
  const problem = KCROC_GRAPH.problems.find(p => p.slug === slug);

  if (!problem) return <Navigate to="/404" replace />;

  return (
    <div className="bg-slate-950 min-h-screen text-slate-200">
      <SEOEngine entityId={problem.id} />
      
      <section className="pt-24 pb-16 px-6 bg-slate-900 border-b border-slate-800">
        <div className="max-w-3xl mx-auto text-center">
          <AlertOctagon className="w-16 h-16 text-rose-500 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
            {problem.title}
          </h1>
          <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700 text-left inline-block">
            <span className="text-sm font-bold text-rose-400 uppercase tracking-wider block mb-1">Symptom</span>
            <p className="text-slate-300">{problem.symptom}</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 max-w-3xl mx-auto">
        <div className="space-y-12">
          
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Common Causes</h2>
            <ul className="space-y-3">
              {problem.causes.map((cause, idx) => (
                <li key={idx} className="flex items-start gap-3 bg-slate-900 p-4 rounded-xl border border-slate-800">
                  <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0" />
                  <span className="text-slate-300">{cause}</span>
                </li>
              ))}
            </ul>
          </div>

          {problem.doNotDo && (
            <div className="p-6 bg-rose-950/20 border border-rose-900/50 rounded-2xl">
              <h2 className="text-xl font-bold text-rose-400 mb-3 flex items-center gap-2">
                <ShieldAlert className="w-6 h-6" /> What NOT To Do
              </h2>
              <p className="text-rose-200/80">{problem.doNotDo}</p>
            </div>
          )}

          <div>
            <h2 className="text-2xl font-bold text-white mb-6">The KCROC Solution</h2>
            <div className="p-6 bg-cyan-950/20 border border-cyan-900/50 rounded-2xl">
              <CheckCircle2 className="w-8 h-8 text-cyan-400 mb-4" />
              <p className="text-slate-300 leading-relaxed mb-6">
                {problem.solution}
              </p>
              <a 
                href={`https://wa.me/${KCROC_GRAPH.business?.telephone}`}
                target="_blank"
                rel="noreferrer"
                className="inline-block py-3 px-8 bg-cyan-500 text-slate-950 font-black rounded-full"
              >
                Book a Free Diagnostic
              </a>
            </div>
          </div>
          
        </div>
      </section>
    </div>
  );
};

export default ProblemTemplate;
