import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getRelatedServices } from '../../utils/graphQueries';

export const RelatedServicesList = ({ currentEntityId }: { currentEntityId: string }) => {
  const related = getRelatedServices(currentEntityId);

  if (related.length === 0) return null;

  return (
    <section className="py-12 border-t border-slate-800">
      <h3 className="text-xl font-black text-white mb-8">Related Repair Services</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {related.map((service) => (
          <Link 
            key={service.id}
            to={service.seo.canonicalUrl}
            className="flex items-center justify-between p-6 bg-slate-900 rounded-xl border border-slate-800 hover:border-cyan-500 transition-all group"
          >
            <span className="font-bold text-slate-200 group-hover:text-cyan-400">{service.title}</span>
            <ArrowRight size={18} className="text-slate-600 group-hover:text-cyan-400 transition-transform group-hover:translate-x-1" />
          </Link>
        ))}
      </div>
    </section>
  );
};
