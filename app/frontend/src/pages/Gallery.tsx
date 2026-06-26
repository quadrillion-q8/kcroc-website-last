import React, { useState, useMemo } from 'react';
import { X, Maximize2, Phone, MessageCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../constants/data';
import { ROUTES } from '../constants/routes';
import { GALLERY_ITEMS, galleryCategories } from '../constants/galleryData';
import MetaSEO from '../components/seo/MetaSEO';
import SchemaMarkup from '../components/seo/SchemaMarkup';

const PAGE_URL = `${BUSINESS_INFO.url}${ROUTES.gallery}`; 
const WA_LINK = `https://wa.me/${BUSINESS_INFO.cleanPhone}?text=${encodeURIComponent('Hi KCROC, I need a professional repair. Please arrange free pickup.')}`;

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
        description="Browse our professional repair portfolio."
        canonical={PAGE_URL}
      />

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
      <section className="max-w-7xl mx-auto px-6 pb-24 grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredItems.map((item, i) => (
          <div 
            key={i} 
            onClick={() => setSelectedIndex(i)} 
            className="group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer border border-slate-800 bg-slate-900"
          >
            <img 
              // FORCE ABSOLUTE PATHS: Prepending a leading / to ensure root resolution
              src={item.image.src.startsWith('/') ? item.image.src : `/${item.image.src}`}
              alt={item.image.alt} 
              loading="lazy"
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
              onError={(e) => {
                console.error("Image load error:", item.image.src);
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
              <Maximize2 size={32} />
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
