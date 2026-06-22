import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Phone, MessageCircle, Camera, Filter, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BUSINESS_INFO } from '../constants/data';
import { galleryImages, galleryCategories } from '../constants/galleryData';
import { IMAGES } from '../constants/images';
import MetaSEO from '../components/seo/MetaSEO';
import SchemaMarkup from '../components/seo/SchemaMarkup';

/* ─────────────────────────────────────────────────────────────────────────────
   1. PAGE DATA & SCHEMA
───────────────────────────────────────────────────────────────────────────── */

const PAGE_URL = `${BUSINESS_INFO.url}/gallery`;
const WA_LINK = `https://wa.me/${BUSINESS_INFO.cleanPhone}?text=${encodeURIComponent('Hi, I need a repair. Please arrange free pickup.')}`;

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
      image: IMAGES.brand.shopPhoto,
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

/* ─────────────────────────────────────────────────────────────────────────────
   2. MAIN COMPONENT
───────────────────────────────────────────────────────────────────────────── */

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filteredImages = useMemo(
    () =>
      activeCategory === 'All'
        ? galleryImages
        : galleryImages.filter((img) => img.category === activeCategory),
    [activeCategory]
  );

  return (
    <main className="w-full min-h-screen bg-transparent text-white font-sans pt-32">
      <MetaSEO
        title="Gallery | KCROC Computer Repair Work in Kuwait"
        description="See our professional computer and laptop repair work in Kuwait. Motherboard soldering, battery replacement, screen repair, and more. Free pickup across all Kuwait."
        canonical={PAGE_URL}
      />
      <SchemaMarkup schema={STRUCTURED_DATA} />

      {/* Lightbox for Full View */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 backdrop-blur-xl p-4" onClick={() => setSelectedIndex(null)}>
          <button className="absolute top-8 right-8 text-white p-3" onClick={() => setSelectedIndex(null)}><X size={40}/></button>
          <img src={filteredImages[selectedIndex].src} alt={filteredImages[selectedIndex].alt} className="max-h-[80vh] object-contain rounded-xl" />
        </div>
      )}

      {/* Hero Section */}
      <section className="text-center pb-16 px-6">
        <h1 className="text-5xl font-black mb-6">Repair Work in <span className="text-cyan-400">Kuwait</span></h1>
        <div className="flex flex-wrap justify-center gap-3">
          {galleryCategories.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-5 py-2 rounded-full font-bold ${activeCategory === cat ? 'bg-cyan-500 text-slate-950' : 'bg-slate-900 border'}`}>
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-24 grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredImages.map((img, i) => (
          <div key={img.src} onClick={() => setSelectedIndex(i)} className="group relative aspect-video rounded-3xl overflow-hidden cursor-pointer border border-slate-800">
            <img src={img.src} alt={img.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/60"><Maximize2 size={48} /></div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-slate-800 text-center">
        <h2 className="text-3xl font-black mb-6">Need a repair?</h2>
        <div className="flex justify-center gap-4">
          <a href={`tel:${BUSINESS_INFO.phone}`} className="bg-slate-900 border px-8 py-4 rounded-full font-bold flex items-center gap-2"><Phone className="text-cyan-400" /> Call {BUSINESS_INFO.phone}</a>
          <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="bg-cyan-500 text-slate-950 px-8 py-4 rounded-full font-black flex items-center gap-2"><MessageCircle /> WhatsApp</a>
        </div>
      </section>
    </main>
  );
}
