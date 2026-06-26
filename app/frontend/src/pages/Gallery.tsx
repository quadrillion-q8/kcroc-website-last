import React, { useState, useMemo } from 'react';
import { X, Maximize2, Phone, MessageCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../constants/data';
import { ROUTES } from '../constants/routes';
import { GALLERY_ITEMS, galleryCategories } from '../constants/galleryData';
import MetaSEO from '../components/seo/MetaSEO';
import SchemaMarkup from '../components/seo/SchemaMarkup';

/* ─────────────────────────────────────────────────────────────────────────────
   1. PAGE CONFIGURATION
───────────────────────────────────────────────────────────────────────────── */
const PAGE_URL = `${BUSINESS_INFO.url}${ROUTES.gallery}`; 
const WA_LINK = `https://wa.me/${BUSINESS_INFO.cleanPhone}?text=${encodeURIComponent('Hi KCROC, I need a professional repair. Please arrange free pickup.')}`;

const STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${PAGE_URL}#webpage`,
      name: 'KCROC Gallery – Professional Computer Repair Work in Kuwait',
      url: PAGE_URL,
      description: 'See our high-quality laptop repair, motherboard soldering, and custom PC building work in Hawalli, Kuwait.'
    }
  ]
};

/* ─────────────────────────────────────────────────────────────────────────────
   2. MAIN COMPONENT
───────────────────────────────────────────────────────────────────────────── */
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
      <MetaSEO
        title="Gallery | Professional Computer Repair Work in Kuwait"
        description="Browse our professional repair portfolio: motherboard micro-soldering, laptop screen replacements, and custom gaming PC builds in Hawalli."
        canonical={PAGE_URL}
      />
      <SchemaMarkup schema={STRUCTURED_DATA} />

      {/* Lightbox for high-res viewing */}
      {selectedIndex !== null && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 backdrop-blur-xl p-4" 
          onClick={() => setSelectedIndex(null)}
        >
          <button className="absolute top-8 right-8 text-white p-3 hover:text-cyan-400 transition-colors" onClick={() => setSelectedIndex(null)}>
            <X size={40}/>
          </button>
          <img 
            src={filteredItems[selectedIndex].image.src} 
            alt={filteredItems[selectedIndex].image.alt} 
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl shadow-2xl" 
          />
        </div>
      )}

      {/* Header & Category Filters */}
      <section className="text-center pb-16 px-6">
        <h1 className="text-5xl font-black mb-6">Expert <span className="text-cyan-400">Repair Gallery</span></h1>
        <div className="flex flex-wrap justify-center gap-3">
          {galleryCategories.map((cat) => (
            <button 
              key={cat} 
              onClick={() => { setActiveCategory(cat); setSelectedIndex(null); }} 
              className={`px-6 py-2.5 rounded-full font-bold transition-all ${
                activeCategory === cat 
                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.3)]' 
                : 'bg-slate-900 border border-slate-700 hover:border-cyan-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Optimized Image Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, i) => (
            <div 
              key={`${item.image.src}-${i}`} 
              onClick={() => setSelectedIndex(i)} 
              className="group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer border border-slate-800 bg-slate-900/50"
            >
              <img 
                src={item.image.src} 
                alt={item.image.alt} 
                width={item.image.width || 800} 
                height={item.image.height || 600}
                loading="lazy" 
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100" 
                onError={(e) => {
                  console.error(`IMAGE FAILED TO LOAD: ${item.image.src}`);
                  e.currentTarget.style.display = 'none'; // Hide if broken
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/40 backdrop-blur-[2px]">
                <Maximize2 size={32} className="text-white" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-slate-800 text-center px-6">
        <h2 className="text-3xl font-black mb-8">Ready to Restore Your Device?</h2>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href={`tel:${BUSINESS_INFO.phone}`} className="bg-slate-900 border border-slate-700 px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:border-cyan-500 transition-colors">
            <Phone size={18} className="text-cyan-400" /> Call {BUSINESS_INFO.phone}
          </a>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="bg-cyan-500 text-slate-950 px-8 py-4 rounded-full font-black flex items-center justify-center gap-2 hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-900/20">
            <MessageCircle size={18} /> WhatsApp for Free Pickup
          </a>
        </div>
      </section>
    </main>
  );
}
