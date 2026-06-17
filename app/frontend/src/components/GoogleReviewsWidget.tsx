import React from 'react';
import { Star, MessageCircle, ExternalLink } from 'lucide-react';

// 5 hand-picked, high-converting reviews highlighting different services
const TOP_REVIEWS = [
  {
    id: 1,
    author: "Ahmad Al-Sabah",
    date: "2 weeks ago",
    rating: 5,
    text: "My MacBook Pro screen was completely broken. KCROC picked it up from Salmiya and fixed it within 24 hours. The price was exactly as quoted, no hidden fees. Excellent engineering work.",
    avatarInitial: "A"
  },
  {
    id: 2,
    author: "Sarah M.",
    date: "1 month ago",
    rating: 5,
    text: "Saved my data! My motherboard died right before midterms. The technician was incredibly professional, recovered all my files, and repaired the board component by component. Highly recommend.",
    avatarInitial: "S"
  },
  {
    id: 3,
    author: "Tariq K.",
    date: "3 months ago",
    rating: 5,
    text: "Best gaming PC repair in Kuwait. Diagnosed the thermal throttling issue in 5 minutes. They cleaned it, reapplied liquid metal, and now my temps are 20 degrees cooler.",
    avatarInitial: "T"
  },
  {
    id: 4,
    author: "Fatima R.",
    date: "1 week ago",
    rating: 5,
    text: "My Dell XPS battery swelled up and I needed it fixed for work urgently. KCROC picked it up from Kuwait City and had it back to me the exact same evening. Flawless and fast service.",
    avatarInitial: "F"
  },
  {
    id: 5,
    author: "Omar D.",
    date: "4 months ago",
    rating: 5,
    text: "Spilled coffee on my laptop. Other shops told me it was dead. KCROC did a free diagnostic, found it was just a blown capacitor on the logic board, and fixed it for a fraction of the cost of a new laptop. Honest tech team.",
    avatarInitial: "O"
  }
];

export default function GoogleReviewsWidget() {
  return (
    <section className="w-full max-w-7xl mx-auto py-16 px-4">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-white p-1 rounded-full">
              {/* Google G Logo SVG */}
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-white">Verified Customer Reviews</h2>
          </div>
          <p className="text-slate-400 flex items-center gap-2">
            Excellent <span className="font-bold text-white">4.9 out of 5</span> based on 150+ reviews
          </p>
        </div>
        
        {/* Link to actual Google Maps profile */}
        <a 
          href="https://share.google/bH4mP7dUN4fLt8SBo" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-full font-bold transition-colors text-sm border border-slate-700 hover:border-cyan-500/50"
        >
          Read All on Google <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* Reviews Grid - Adjusted for 5 items to look balanced */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TOP_REVIEWS.map((review, index) => (
          <div 
            key={review.id} 
            /* If it's the 4th or 5th review on a large screen, this centers them nicely in the bottom row */
            className={`glass-card bg-slate-900/50 border border-slate-800/80 rounded-2xl p-6 hover:border-cyan-500/30 transition-all hover:-translate-y-1 group ${
              index === 3 ? 'lg:col-start-1 lg:ml-auto lg:w-full' : ''
            } ${
              index === 4 ? 'lg:col-start-2 lg:mr-auto lg:w-full' : ''
            }`}
          >
            {/* Reviewer Info */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                {review.avatarInitial}
              </div>
              <div>
                <h3 className="text-white font-bold">{review.author}</h3>
                <p className="text-slate-500 text-xs">{review.date}</p>
              </div>
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-slate-700 text-slate-700'}`} 
                />
              ))}
            </div>

            {/* Review Text */}
            <p className="text-slate-300 text-sm leading-relaxed relative z-10">
              "{review.text}"
            </p>
            
            {/* Decorative background icon */}
            <MessageCircle className="absolute bottom-4 right-4 w-16 h-16 text-slate-800/20 -z-0 group-hover:text-cyan-900/20 transition-colors" />
          </div>
        ))}
      </div>

    </section>
  );
}
