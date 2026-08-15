// File: app/frontend/src/pages/templates/ProblemTemplate.tsx
import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { KCROC_GRAPH } from '../../data/graph'; 
import { SEOEngine } from '../../core/components/SEOEngine';
import { AlertOctagon, CheckCircle2, ShieldAlert } from 'lucide-react';

const ProblemTemplate: React.FC = () => {
  const location = useLocation();
  const slug = location.pathname.replace(/^\/+/, ''); 
  
  const problem = KCROC_GRAPH.problems.find(p => p.slug === slug);

  if (!problem) return <Navigate to="/404" replace />;

  const getContentImage = (placement: 'causes' | 'solution') =>
    problem.contentImages?.find((img) => img.placement === placement);

  const ContentImage = ({ image }: { image: NonNullable<typeof problem.contentImages>[number] }) => (
    <a
      href="/gallery"
      className="group block mb-6 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/50 hover:border-cyan-500/40 transition-colors"
      aria-label={`${image.alt} — view more repair photos in our gallery`}
    >
      <img
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading="lazy"
        className="w-full max-h-80 object-cover group-hover:opacity-90 transition-opacity"
      />
      {image.caption && (
        <p className="text-xs text-slate-400 px-5 py-3 border-t border-slate-800/70">
          {image.caption}
        </p>
      )}
    </a>
  );

  return (
    // ✅ FIXED: Changed bg-slate-950 to bg-transparent
    <div className="bg-transparent min-h-screen text-slate-200">
      <SEOEngine entityId={problem.id} />
      
      {/* Hero Section - Added glass effect */}
      <section className="pt-24 pb-16 px-6 bg-slate-900/40 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-3xl mx-auto text-center">
          <AlertOctagon className="w-16 h-16 text-rose-500 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
            {problem.title}
          </h1>
          <div className="p-4 bg-slate-950/60 backdrop-blur-md rounded-xl border border-slate-700 text-left inline-block shadow-inner">
            <span className="text-sm font-bold text-rose-400 uppercase tracking-wider block mb-1">Symptom</span>
            <p className="text-slate-300">{problem.symptom}</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 max-w-3xl mx-auto relative z-10">
        <div className="space-y-12">
          
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Common Causes</h2>
            {getContentImage('causes') && <ContentImage image={getContentImage('causes')!} />}
            <ul className="space-y-3">
              {problem.causes.map((cause, idx) => (
                <li key={idx} className="flex items-start gap-3 bg-slate-900/50 backdrop-blur-sm p-4 rounded-xl border border-slate-800">
                  <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0" />
                  <span className="text-slate-300">{cause}</span>
                </li>
              ))}
            </ul>
          </div>

          {problem.doNotDo && (
            <div className="p-6 bg-rose-950/30 backdrop-blur-md border border-rose-900/50 rounded-2xl shadow-lg">
              <h2 className="text-xl font-bold text-rose-400 mb-3 flex items-center gap-2">
                <ShieldAlert className="w-6 h-6" /> What NOT To Do
              </h2>
              <p className="text-rose-200/80">{problem.doNotDo}</p>
            </div>
          )}

          <div>
            <h2 className="text-2xl font-bold text-white mb-6">The KCROC Solution</h2>
            <div className="p-8 bg-cyan-950/30 backdrop-blur-xl border border-cyan-900/50 rounded-3xl shadow-2xl">
              <CheckCircle2 className="w-8 h-8 text-cyan-400 mb-4" />
              {getContentImage('solution') && <ContentImage image={getContentImage('solution')!} />}
              <p className="text-slate-300 leading-relaxed mb-8 text-lg">
                {problem.solution}
              </p>
              <a 
                href={`https://wa.me/${KCROC_GRAPH.business?.telephone}`}
                target="_blank"
                rel="noreferrer"
                className="inline-block py-4 px-8 bg-cyan-500 hover:bg-cyan-400 transition-colors text-slate-950 font-black rounded-full shadow-[0_0_15px_rgba(34,211,238,0.3)]"
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
