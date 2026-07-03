// File: app/frontend/src/pages/Gallery.tsx
import React, { useState, useMemo } from 'react';
import { X, Maximize2, Phone, MessageCircle } from 'lucide-react';
import { ROUTES } from '../constants/routes';
import { GALLERY_ITEMS, galleryCategories } from '../constants/galleryData';

// 👈 Phase 2 SEO Engine Imported
import { SEOEngine } from '../core/components/SEOEngine';

const WA_LINK = `https://wa.me/96555301913?text=${encodeURIComponent('Hi KCROC, I need a professional repair. Please arrange free pickup.')}`;

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filteredItems = useMemo(() =>
      activeCategory === 'All'
        ? GALLERY_ITEMS
        : GALLERY_ITEMS.filter((item) => item.category === activeCategory),
    [activeCategory]
  );

  return (
    <main className="w-full min-h-screen bg-transparent text-white font-sans pt-32">
      
      {/* 🚀 PHASE 2 AUTOMATION IN ACTION: Basic Tags Handled */}
      <SEOEngine entityId="page-gallery" />

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4" onClick={() => setSelectedIndex(null)}>
          <button className="absolute top-8 right-8 text-white p-3" onClick={() => setSelectedIndex(null)}><X size={40}/></button>
          <img 
            // Ensure the path is absolute from the root
            src={filteredItems[selectedIndex].image.src.startsWith('/') ? filteredItems[selectedIndex].image.src : `/${filteredItems[selectedIndex].image.src}`} 
            alt={filteredItems[selectedIndex].image.alt} 
            className="max-h-[85vh] object-contain rounded-xl" 
          />
        </div>
      )}

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-24 grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {filteredItems.map((item, i) => (
          <div 
            key={i} 
            onClick={() => setSelectedIndex(i)} 
            className="group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer border border-slate-800 bg-slate-900 shadow-xl"
          >
            <img 
              // FORCE ABSOLUTE PATHS: Prepending a leading / to ensure root resolution
              src={item.image.src.startsWith('/') ? item.image.src : `/${item.image.src}`}
              alt={item.image.alt} 
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                console.error("Image load error:", item.image.src);
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-cyan-900/40 backdrop-blur-sm">
              <Maximize2 size={32} className="text-white" />
            </div>
            
            {/* Added a subtle overlay for category/alt-text on hover */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
               <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">{item.category}</span>
            </div>
          </div>
        ))}
      </section>

      {/* Simple CTA Footer for Gallery */}
      <section className="max-w-4xl mx-auto px-6 pb-24 text-center">
         <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-2xl font-black text-white mb-4">See a repair you need?</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-8 py-4 rounded-xl flex items-center justify-center gap-2 transition-transform hover:scale-105">
                <MessageCircle size={18} /> Request Free Pickup
              </a>
              <a href="tel:+96555301913" className="bg-slate-800 border border-slate-700 hover:border-cyan-500/50 text-white font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-2 transition-colors">
                <Phone size={18} /> Call Technician
              </a>
            </div>
         </div>
      </section>

    </main>
  );
}
