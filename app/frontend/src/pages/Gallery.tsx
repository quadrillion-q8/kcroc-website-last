import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Phone, MessageCircle, Camera, Filter, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BUSINESS_INFO } from '../constants/data';
import MetaSEO from '../components/seo/MetaSEO';
import SchemaMarkup from '../components/seo/SchemaMarkup';

// 1. IMPORT YOUR NEW LOCAL DATA!
import { galleryImages, galleryCategories } from '../constants/galleryData';
import { IMAGES } from '../constants/images';

/* ─────────────────────────────────────────────────────────────────────────────
   1. PAGE DATA
───────────────────────────────────────────────────────────────────────────── */

const PAGE_URL = `${BUSINESS_INFO.url}/gallery`;

const STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': `${BUSINESS_INFO.url}/#business`,
      name: BUSINESS_INFO.name,
      alternateName: 'KCROC',
      url: BUSINESS_INFO.url,
      telephone: BUSINESS_INFO.phone,
      image: IMAGES.brand.shopPhoto, // Using local image for schema!
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19',
        addressLocality: 'Hawalli',
        addressRegion: 'Hawalli Governorate',
        addressCountry: 'KW',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 29.3356,
        longitude: 48.025,
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
        opens: '10:00',
        closes: '22:00',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '150',
      },
    },
    {
      '@type': 'WebPage',
      '@id': `${PAGE_URL}#webpage`,
      name: 'KCROC Gallery – Computer Repair Work in Kuwait',
      url: PAGE_URL,
      isPartOf: { '@id': `${BUSINESS_INFO.url}/#website` },
    },
  ],
};

const WA_LINK = `https://wa.me/${BUSINESS_INFO.cleanPhone}?text=${encodeURIComponent('Hi, I need a repair. Please arrange free pickup.')}`;

/* ─────────────────────────────────────────────────────────────────────────────
   2. MAIN COMPONENT
───────────────────────────────────────────────────────────────────────────── */

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  
  // State for the Lightbox (Full Screen View)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Filter the massive local image array based on the clicked category
  const filteredImages = activeCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  // Handle Keyboard Navigation for the Lightbox (Escape to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowRight' && selectedIndex !== null) {
        setSelectedIndex((prev) => (prev !== null && prev < filteredImages.length - 1 ? prev + 1 : 0));
      }
      if (e.key === 'ArrowLeft' && selectedIndex !== null) {
        setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredImages.length - 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, filteredImages.length]);

  return (
    <main className="w-full min-h-screen bg-transparent text-white font-sans selection:bg-cyan-500/30 pt-32">
      <MetaSEO
        title="Gallery | KCROC Computer Repair Work in Kuwait"
        description="See our professional computer and laptop repair work in Kuwait. Motherboard soldering, battery replacement, screen repair, and more. Free pickup across all Kuwait. KCROC Hawalli."
        canonical={PAGE_URL}
      />
      <SchemaMarkup schema={STRUCTURED_DATA} />

      {/* ─── LIGHTBOX OVERLAY (FULL VIEW) ─── */}
      {selectedIndex !== null && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 backdrop-blur-xl p-4 md:p-12"
          onClick={() => setSelectedIndex(null)} // Click outside to close
        >
          {/* Close Button */}
          <button 
            className="absolute top-6 right-6 md:top-8 md:right-8 text-slate-400 hover:text-white bg-slate-900/80 p-3 rounded-full transition-all hover:scale-110 z-[110]"
            onClick={(e) => { e.stopPropagation(); setSelectedIndex(null); }}
          >
            <X className="w-6 h-6 md:w-8 md:h-8" />
          </button>

          {/* Previous Button */}
          <button 
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white bg-slate-900/80 p-3 md:p-4 rounded-full transition-all hover:scale-110 hover:bg-cyan-500 hover:text-slate-950 z-[110]"
            onClick={(e) => { 
              e.stopPropagation(); 
              setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredImages.length - 1)); 
            }}
          >
            <ChevronLeft className="w-6 h-6 md:w-10 md:h-10" />
          </button>

          {/* Next Button */}
          <button 
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white bg-slate-900/80 p-3 md:p-4 rounded-full transition-all hover:scale-110 hover:bg-cyan-500 hover:text-slate-950 z-[110]"
            onClick={(e) => { 
              e.stopPropagation(); 
              setSelectedIndex((prev) => (prev !== null && prev < filteredImages.length - 1 ? prev + 1 : 0)); 
            }}
          >
            <ChevronRight className="w-6 h-6 md:w-10 md:h-10" />
          </button>

          {/* Full Screen Image */}
          <div className="relative max-w-7xl max-h-full w-full flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img 
              src={filteredImages[selectedIndex].src} 
              alt={filteredImages[selectedIndex].alt} 
              className="max-h-[75vh] md:max-h-[85vh] w-auto object-contain rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-slate-800"
            />
            
            {/* Image Details Panel */}
            <div className="mt-6 md:mt-8 text-center bg-slate-900/80 border border-slate-800 px-6 py-4 rounded-2xl max-w-3xl w-full">
              <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 mb-2">
                {filteredImages[selectedIndex].category}
              </Badge>
              <p className="text-white font-bold text-lg md:text-xl">
                {filteredImages[selectedIndex].alt}
              </p>
              <p className="text-slate-500 text-sm mt-2 font-medium">
                Image {selectedIndex + 1} of {filteredImages.length}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ─── BREADCRUMBS ─── */}
      <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-6 mb-8 relative z-10">
        <ol className="flex items-center space-x-2 text-sm text-slate-400 font-medium">
          <li><Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
          <li><span className="text-slate-600">/</span></li>
          <li aria-current="page" className="text-cyan-400">Gallery</li>
        </ol>
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative pb-12 px-6 flex flex-col items-center overflow-hidden text-center z-10">
        <div
          className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-cyan-600/20 blur-[120px] rounded-full pointer-events-none"
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <Badge className="mb-6 bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 text-cyan-400 px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-[0_0_15px_rgba(34,211,238,0.1)]">
            <Camera className="w-4 h-4 mr-2 inline" aria-hidden="true" /> Our Work
          </Badge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight leading-[1.1]">
            Repair Work{' '}
            <span className="text-cyan-400 drop-shadow-[0_0_25px_rgba(34,211,238,0.4)]">in Kuwait</span>
          </h1>
          <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8">
            Precision engineering and quality repairs across all Kuwait governorates —
            Hawalli, Salmiya, Farwaniya, Kuwait City, Ahmadi, and Jahra.
          </p>
        </div>
      </section>

      {/* ─── CATEGORY FILTERS ─── */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 mb-12">
        <div className="flex flex-wrap justify-center gap-3">
           <div className="hidden md:flex items-center text-slate-400 mr-2 text-sm font-bold uppercase tracking-wider">
             <Filter className="w-4 h-4 mr-1" /> Filter:
           </div>
           {galleryCategories.map((cat) => (
             <button
               key={cat}
               onClick={() => {
                 setActiveCategory(cat);
                 setSelectedIndex(null); // Reset lightbox if open when category changes
               }}
               className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                 activeCategory === cat 
                 ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.4)]' 
                 : 'bg-slate-900/80 text-slate-300 border border-slate-700 hover:border-cyan-500/50 hover:text-cyan-400'
               }`}
             >
               {cat}
             </button>
           ))}
        </div>
      </section>

      {/* ─── IMAGE GRID ─── */}
      <section aria-labelledby="gallery-heading" className="pb-16 px-6 relative z-10">
        <h2 id="gallery-heading" className="sr-only">Gallery of Repair Work</h2>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((img, i) => (
              <div
                key={img.src}
                onClick={() => setSelectedIndex(i)} // 👈 Opens the Lightbox!
                className="group relative aspect-video bg-slate-900/30 backdrop-blur-sm rounded-3xl overflow-hidden border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.1)] cursor-pointer"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  width="400"
                  height="225"
                  decoding="async"
                  loading={i < 6 ? 'eager' : 'lazy'}
                  fetchPriority={i < 2 ? 'high' : 'auto'}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-40"
                  aria-hidden="true"
                />
                
                {/* Expand Icon on Hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-slate-900/80 p-3 rounded-full backdrop-blur-sm text-cyan-400">
                    <Maximize2 className="w-6 h-6" />
                  </div>
                </div>

                <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-2">
                  <Badge className="w-fit bg-slate-950/80 text-cyan-400 border-cyan-500/30 text-[10px] uppercase tracking-wider">{img.category}</Badge>
                  <p className="text-white font-bold text-sm leading-snug drop-shadow-md line-clamp-2">{img.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section aria-labelledby="cta-heading" className="py-24 px-6 mt-8 border-t border-slate-800/50 bg-slate-900/10 backdrop-blur-sm relative z-10">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 id="cta-heading" className="text-3xl md:text-4xl font-black mb-4 tracking-tight">Need a repair?</h2>
          <p className="text-slate-400 mb-10 text-sm md:text-base leading-relaxed">
            Kuwait Computer Repair On Call — Hawalli, Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19. Free pickup across all Kuwait.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              className="bg-slate-900 border border-slate-700 hover:bg-slate-800 text-white font-bold px-8 py-6 rounded-full text-base transition-all"
              asChild
            >
              <a href={`tel:${BUSINESS_INFO.phone}`} aria-label="Call KCROC support at 55301913">
                <Phone className="mr-2 h-5 w-5 text-cyan-400" aria-hidden="true" /> Call 55301913
              </a>
            </Button>
            <Button
              size="lg"
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-8 py-6 rounded-full text-base transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:scale-[1.02]"
              asChild
            >
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp KCROC for free pickup">
                <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" /> WhatsApp 55301913
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
