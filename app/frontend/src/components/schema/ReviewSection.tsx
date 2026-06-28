import React from 'react';
import { KCROCEntity } from '../../types/knowledgeGraph';

export const ReviewSection = ({ entity }: { entity: KCROCEntity }) => {
  if (!entity.reviews || entity.reviews.length === 0) return null;
  return (
    <section className="py-12">
      <h3 className="text-2xl font-black text-white mb-6">Customer Feedback</h3>
      <div className="grid gap-4">
        {entity.reviews.map((review, i) => (
          <div key={i} className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
            <p className="text-slate-300 italic mb-2">"{review.text}"</p>
            <p className="text-cyan-400 font-bold text-sm">- {review.author}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
