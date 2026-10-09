// File: app/frontend/src/pages/Gallery.tsx
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { X, Maximize2, Phone, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { GALLERY_ITEMS, galleryCategories } from '../constants/galleryData';
import { SEOEngine } from '../core/components/SEOEngine';
import { buildWhatsAppLink } from '../utils/whatsappIntent';
import { KCROC_GRAPH } from '../data/graph';

// 🩹 FIX: WhatsApp link previously hardcoded the phone number instead of
// sourcing from the graph's business entity — if the phone number is ever
// updated centrally, this file would silently keep pointing at the old
// number. Now routed through the shared buildWhatsAppLink helper, which
// reads KCROC_GRAPH.business.telephone.
const WA_LINK = buildWhatsAppLink('Hi KCROC, I need a professional repair. Please arrange free pickup.');
const CALL_LINK = `tel:+${KCROC_GRAPH.business!.telephone}`;

// Only this many tiles are rendered at a time; "Load more" reveals the next
// batch. Keeps the DOM and image requests small no matter how many photos the
// gallery grows to.
const PAGE_SIZE = 24;
const withSlash = (src: string) => (src.startsWith('/') ? src : `/${src}`);

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);

  const filteredItems = useMemo(() =>
      activeCategory === 'All'
        ? GALLERY_ITEMS
        : GALLERY_ITEMS.filter((item) => item.category === activeCategory),
    [activeCategory]
  );
  const visibleItems = filteredItems.slice(0, visibleCount);
  const remaining = filteredItems.length - visibleItems.length;

  // Lightbox navigation: wraps around the full filtered list (not just the
  // tiles currently rendered), so arrows keep working past the last tile.
  const closeLightbox = useCallback(() => setSelectedIndex(null), []);
  const showPrev = useCallback(() => {
    setSelectedIndex((i) => (i === null ? i : (i - 1 + filteredItems.length) % filteredItems.length));
  }, [filteredItems.length]);
  const showNext = useCallback(() => {
    setSelectedIndex((i) => (i === null ? i : (i + 1) % filteredItems.length));
  }, [filteredItems.length]);

  // Keyboard: Esc closes, arrow keys move. Only active while the lightbox is open.
  useEffect(() => {
    if (selectedIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowLeft') showPrev();
      else if (e.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedIndex, closeLightbox, showPrev, showNext]);

  // Preload only the next full-size photo so "next" feels instant without
  // downloading the whole set.
  useEffect(() => {
    if (selectedIndex === null || filteredItems.length < 2) return;
    const next = filteredItems[(selectedIndex + 1) % filteredItems.length];
    const img = new Image();
    img.src = withSlash(next.image.src);
  }, [selectedIndex, filteredItems]);

  return (
    <main className="w-full min-h-screen bg-transparent text-white font-sans pt-8 sm:pt-16 lg:pt-24 pb-8 sm:pb-24 px-4 sm:px-6">
      
      <SEOEngine entityId="page-gallery" />

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-dark/95 backdrop-blur-sm p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={closeLightbox}
        >
          <button
            type="button"
            aria-label="Close photo"
            className="absolute top-4 sm:top-8 right-4 sm:right-8 text-white p-2 sm:p-3 bg-slate-900/50 rounded-full hover:bg-slate-800 transition-colors"
            onClick={closeLightbox}
          >
            <X className="w-8 h-8 sm:w-10 sm:h-10" aria-hidden="true" />
          </button>

          {filteredItems.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous photo"
                className="absolute left-2 sm:left-8 top-1/2 -translate-y-1/2 text-white p-2 sm:p-3 bg-slate-900/50 rounded-full hover:bg-slate-800 transition-colors"
                onClick={(e) => { e.stopPropagation(); showPrev(); }}
              >
                <ChevronLeft className="w-7 h-7 sm:w-9 sm:h-9" aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="Next photo"
                className="absolute right-2 sm:right-8 top-1/2 -translate-y-1/2 text-white p-2 sm:p-3 bg-slate-900/50 rounded-full hover:bg-slate-800 transition-colors"
                onClick={(e) => { e.stopPropagation(); showNext(); }}
              >
                <ChevronRight className="w-7 h-7 sm:w-9 sm:h-9" aria-hidden="true" />
              </button>
            </>
          )}

          <img 
            src={withSlash(filteredItems[selectedIndex].image.src)} 
            alt={filteredItems[selectedIndex].image.alt} 
            className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl" 
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 sm:mb-12 mt-4 sm:mt-0">
          <h1 className="text-3xl sm:text-5xl font-black text-white mb-3 sm:mb-4">Repair <span className="text-cyan-400">Gallery</span></h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">View real examples of our component-level micro-soldering and lab environment.</p>
        </div>

        {/* Category Filter - Horizontal Scroll on Mobile */}
        <div className="scroll-row gap-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center mb-6 sm:mb-10">
          {['All', ...galleryCategories].map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setVisibleCount(PAGE_SIZE); }}
              className={`scroll-row-item px-4 py-2 rounded-full text-[11px] sm:text-sm font-bold transition-colors whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-cyan-500 text-slate-950'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 mb-12 sm:mb-24">
          {visibleItems.map((item, i) => (
            <div 
              key={item.image.src} 
              onClick={() => setSelectedIndex(i)} 
              className="group relative aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer border border-slate-800 bg-slate-900 shadow-xl"
            >
              <img 
                src={withSlash(item.image.thumb ?? item.image.src)}
                alt={item.image.alt} 
                width={item.image.thumb ? item.image.thumbWidth : item.image.width}
                height={item.image.thumb ? item.image.thumbHeight : item.image.height}
                loading={i < 4 ? 'eager' : 'lazy'}
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  if (import.meta.env.DEV) console.error("Image load error:", item.image.src);
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-cyan-950/60 backdrop-blur-sm">
                <Maximize2 className="text-white w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[10px] sm:text-xs font-bold text-cyan-400 uppercase tracking-wider">{item.category}</span>
              </div>
            </div>
          ))}
        </section>

        {remaining > 0 && (
          <div className="text-center -mt-6 sm:-mt-16 mb-12 sm:mb-24">
            <button
              type="button"
              onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
              className="px-8 py-3 rounded-full bg-slate-800 border border-slate-700 hover:border-cyan-500/50 text-white font-bold text-sm sm:text-base transition-colors"
            >
              Load more photos ({remaining} left)
            </button>
          </div>
        )}

        {/* CTA Footer */}
        <section className="max-w-4xl mx-auto text-center">
            <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
              <h2 className="text-xl sm:text-3xl font-black text-white mb-4 sm:mb-6">See a repair you need?</h2>
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] w-full sm:w-auto text-sm sm:text-base">
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" /> Request Free Pickup
                </a>
                <a href={CALL_LINK} className="bg-slate-800 border border-slate-700 hover:border-cyan-500/50 text-white font-bold px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl flex items-center justify-center gap-2 transition-colors w-full sm:w-auto text-sm sm:text-base">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" /> Call Technician
                </a>
              </div>
            </div>
        </section>
      </div>
    </main>
  );
}
