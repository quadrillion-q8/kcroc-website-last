// File: app/frontend/src/components/home/Reviews.tsx
import React from 'react';
import { Star } from 'lucide-react';
import { KCROC_GRAPH } from '../../data/graph';
import { SectionHeader } from '@/components/ui/section-header';

export default function Reviews() {
  const reviewsData = KCROC_GRAPH?.entities?.['reviews-row'] as any;
  const reviews = reviewsData?.items || [];

  if (reviews.length === 0) return null;

  return (
    <section className="w-full py-8 sm:py-24 px-4 sm:px-6 border-t border-slate-800/50 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <SectionHeader title="Verified Customer Reviews" align="center" className="mb-4 sm:mb-16" />

        <div className="flex flex-row overflow-x-auto snap-x snap-mandatory gap-3 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-3 md:gap-6">
          {reviews.map((review: any, idx: number) => (
            <div
              key={idx}
              className="snap-center shrink-0 w-[82%] md:w-auto bg-slate-900/30 p-5 sm:p-8 rounded-3xl border border-slate-800 h-full hover:border-cyan-500/30 transition-all flex flex-col"
            >
              <div className="flex text-cyan-400 mb-3 sm:mb-5">
                {[...Array(review.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>

              <p className="text-slate-300 text-sm leading-relaxed mb-4 sm:mb-6 italic line-clamp-4 sm:line-clamp-none">
                "{review.text}"
              </p>

              <div className="flex flex-col mt-auto">
                <span className="text-cyan-400 font-bold text-sm">{review.name}</span>
                <span className="text-slate-500 text-xs mt-1">{review.device || 'Repaired device'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
