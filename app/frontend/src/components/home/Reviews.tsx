// File: app/frontend/src/components/home/Reviews.tsx
import React from 'react';
import { Star } from 'lucide-react';
import { KCROC_GRAPH } from '../../data/graph';
import { useFadeIn } from '../../hooks/useFadeIn';

export default function Reviews() {
  const reviewsData = KCROC_GRAPH.entities['reviews-row'] as any;
  const reviews = reviewsData?.items || [];

  return (
    <section className="w-full py-24 flex justify-center px-6 border-t border-slate-800/50 relative z-10 bg-slate-950">
      <div className="w-full max-w-7xl">
        <h2 className="text-3xl md:text-4xl font-black text-white text-center mb-16 tracking-tight">Verified Customer Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review: any, idx: number) => {
            const { ref, visible } = useFadeIn();
            return (
              <div ref={ref} key={idx} style={{ transitionDelay: `${idx * 50}ms` }} className={`transition-all duration-700 h-full ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <div className="block bg-slate-900/30 backdrop-blur-sm p-8 rounded-3xl border border-slate-800 h-full">
                  <div className="flex text-cyan-400 mb-5">
                    {[...Array(review.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" aria-hidden="true" />
                    ))}
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">"{review.text}"</p>
                  <div className="flex flex-col mt-auto">
                    <span className="text-cyan-400 font-bold text-sm">{review.name}</span>
                    <span className="text-slate-500 text-xs mt-1">{review.device || 'Repaired device'}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
