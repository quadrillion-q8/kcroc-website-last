import React from 'react';
import { Star } from 'lucide-react';
import { KCROC_GRAPH } from '../../data/graph';

export default function Reviews() {
  const reviewsRow = KCROC_GRAPH.entities['reviews-row'] as any;
  const reviews = reviewsRow?.items || [];

  return (
    <section className="w-full py-24 flex justify-center px-6 border-t border-slate-800/50">
      <div className="w-full max-w-7xl">
        <h2 className="text-3xl font-black text-white text-center mb-16">Verified Customer Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review: any, idx: number) => (
            <div key={idx} className="bg-slate-900/30 p-8 rounded-3xl border border-slate-800 h-full">
              <div className="flex text-cyan-400 mb-5">
                {[...Array(review.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-slate-300 text-sm italic mb-6">"{review.text}"</p>
              <div className="text-cyan-400 font-bold text-sm">{review.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
