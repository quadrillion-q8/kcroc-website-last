import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { KCROC_GRAPH } from '../../data/graph';
import { SectionHeader } from '@/components/ui/section-header';

export default function Reviews() {
  const reviewsData = KCROC_GRAPH?.entities?.['reviews-row'] as any;
  const reviews = reviewsData?.items || [];
  const aggregate = reviewsData?.aggregateRating || KCROC_GRAPH?.business?.aggregateRating;
  const trackRef = useRef<HTMLDivElement>(null);

  if (reviews.length === 0) return null;

  const rating = Number(aggregate?.ratingValue || 4.9);
  const reviewCount = Number(aggregate?.reviewCount || reviews.length);

  const scrollReviews = (direction: number) => {
    trackRef.current?.scrollBy({
      left: direction * 360,
      behavior: 'smooth',
    });
  };

  return (
    <section className="w-full py-8 sm:py-24 px-4 sm:px-6 border-t border-slate-800/50 bg-brand-dark/40" aria-labelledby="reviews-title">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-4 sm:mb-10">
          <SectionHeader
            title="Verified Customer Reviews"
            align="left"
            className="mb-0"
          />
          <div className="shrink-0 md:text-right">
            <div className="text-white text-2xl sm:text-3xl font-black">{rating.toFixed(1)}/5</div>
            <div className="text-slate-500 text-xs sm:text-sm mt-1">{reviewCount}+ reviews</div>
          </div>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => scrollReviews(-1)}
            aria-label="Previous customer reviews"
            className="hidden lg:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full border border-slate-700 bg-brand-dark/95 text-slate-200 hover:border-cyan-500/50 hover:text-cyan-400 transition-colors shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          </button>

          <div
            ref={trackRef}
            className="flex gap-3 md:gap-6 overflow-x-auto snap-x snap-mandatory scroll-px-1 pb-4 pr-1 [scrollbar-width:thin]"
            tabIndex={0}
            aria-label="Customer reviews carousel"
          >
            {reviews.map((review: any, idx: number) => {
              const stars = Math.max(0, Math.min(5, Number(review.rating || 5)));

              return (
                <article
                  key={`${review.name || 'review'}-${idx}`}
                  className="snap-start shrink-0 w-[86vw] sm:w-[360px] bg-slate-900/30 p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-slate-800 hover:border-cyan-500/30 transition-colors flex flex-col"
                >
                  <div className="flex text-cyan-400 mb-3 sm:mb-5" aria-label={`${stars} out of 5 stars`}>
                    {[...Array(stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" aria-hidden="true" />
                    ))}
                  </div>

                  <blockquote className="text-slate-300 text-sm leading-relaxed mb-5 italic">
                    “{review.text}”
                  </blockquote>

                  <div className="flex flex-col mt-auto">
                    <span className="text-cyan-400 font-bold text-sm">{review.name}</span>
                    <span className="text-slate-500 text-xs mt-1">{review.device || 'Repaired device'}</span>
                    {(review.location || review.time) && (
                      <span className="text-slate-600 text-xs mt-1">
                        {[review.location, review.time].filter(Boolean).join(' · ')}
                      </span>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => scrollReviews(1)}
            aria-label="Next customer reviews"
            className="hidden lg:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full border border-slate-700 bg-brand-dark/95 text-slate-200 hover:border-cyan-500/50 hover:text-cyan-400 transition-colors shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
