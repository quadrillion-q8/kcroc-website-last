// File: app/frontend/src/pages/templates/BrandTemplate.tsx
import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { KCROC_GRAPH } from '../../../data/graph';
import { SEOEngine } from '../../core/components/SEOEngine';
import { Wrench, CheckCircle, AlertTriangle, MonitorSmartphone } from 'lucide-react';

const BrandTemplate: React.FC = () => {
  const location = useLocation();
  // Extract slug from URL (e.g., "/dell-laptop-repair-kuwait" -> "dell-laptop-repair-kuwait")
  const slug = location.pathname.replace(/^\/+/, ''); 
  
  const brand = KCROC_GRAPH.brands.find(b => b.slug === slug);

  if (!brand) return <Navigate to="/404" replace />;

  return (
    <div className="bg-slate-950 min-h-screen text-slate-200">
      <SEOEngine entityId={brand.id} />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6 bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <MonitorSmartphone className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
            {brand.title}
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
            {brand.description}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Common Issues */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <AlertTriangle className="text-red-400 w-6 h-6" /> Common {brand.brandName} Issues
            </h2>
            <div className="space-y-4">
              {brand.commonIssues.map((issue) => (
                <div key={issue.id} className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
                  <h3 className="font-bold text-slate-200 mb-1">{issue.title}</h3>
                  <p className="text-sm text-slate-400">{issue.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Details & CTA */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Wrench className="text-cyan-400 w-6 h-6" /> Supported Models
            </h2>
            <ul className="space-y-3 mb-10">
              {brand.commonModels.map((model, idx) => (
                <li key={idx} className="flex items-center gap-3 text-slate-300">
                  <CheckCircle className="text-cyan-500 w-5 h-5 flex-shrink-0" />
                  {model}
                </li>
              ))}
            </ul>

            <div className="p-6 bg-cyan-950/30 border border-cyan-900/50 rounded-2xl text-center">
              <h3 className="text-xl font-bold text-white mb-2">Need a Repair?</h3>
              {brand.pricing && (
                <p className="text-cyan-400 font-medium mb-6">{brand.pricing.displayLabel}</p>
              )}
              <a 
                href={`https://wa.me/${KCROC_GRAPH.business?.telephone}`}
                target="_blank"
                rel="noreferrer"
                className="inline-block w-full py-3 px-6 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-full transition-colors"
              >
                WhatsApp a Technician
              </a>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default BrandTemplate;
