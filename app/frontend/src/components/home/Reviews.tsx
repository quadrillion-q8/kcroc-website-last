import React from 'react';
import { Star } from 'lucide-react';
import { REVIEWS, BUSINESS_INFO } from '../../constants/data';
import { useFadeIn } from '../../hooks/useFadeIn';

export default function Reviews() {
  return (
    <section className="w-full py-24 flex justify-center px-6 border-t border-slate-800/50 relative z-10">
      <div className="w-full max-w-7xl">
        <h2 className="text-3xl md:text-4xl font-black text-white text-center mb-16 tracking-tight">Verified Customer Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review, idx) => {
            const { ref, visible } = useFadeIn();
            return (
              <div ref={ref} key={review.name} style={{ transitionDelay: `${idx * 50}ms` }} className={`transition-all duration-700 h-full ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <a href={BUSINESS_INFO.googleReviewUrl} target="_blank" rel="noopener noreferrer" className="block bg-slate-900/30 backdrop-blur-sm p-8 rounded-3xl border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 h-full hover:shadow-[0_0_30px_rgba(34,211,238,0.05)] focus-visible:ring-2 focus-visible:ring-cyan-400">
                  <div className="flex text-cyan-400 mb-5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current drop-shadow-[0_0_5px_rgba(34,211,238,0.4)]" aria-hidden="true" />
                    ))}
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">"{review.text}"</p>
                  <div className="flex flex-col mt-auto">
                    <span className="text-cyan-400 font-bold text-sm">{review.name}</span>
                    <span className="text-slate-500 text-xs mt-1">Repaired: {review.device}</span>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
