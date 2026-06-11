import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Camera, MapPin, Phone, MessageCircle, Star, Shield, Zap } from 'lucide-react';

// ─── Schema ──────────────────────────────────────────────────────────────────
const schemaData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': 'https://www.computerrepairkuwait.com/#business',
      name: 'Kuwait Computer Repair On Call',
      alternateName: 'KCROC',
      url: 'https://www.computerrepairkuwait.com',
      telephone: '+96555301913',
      email: 'quadrillion1980@gmail.com',
      image: 'https://www.computerrepairkuwait.com/logo.png',
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19',
        addressLocality: 'Hawalli',
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
      sameAs: ['https://www.computerrepairkuwait.com'],
    },
    {
      '@type': 'WebPage',
      '@id': 'https://www.computerrepairkuwait.com/gallery#webpage',
      name: 'KCROC Gallery – Computer Repair in Hawalli',
      url: 'https://www.computerrepairkuwait.com/gallery',
      isPartOf: { '@id': 'https://www.computerrepairkuwait.com/#website' },
    },
  ],
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const WA_LINK = 'https://wa.me/96555301913?text=Hi%2C+I+have+a+repair+enquiry.+Please+help.';
const CLOUDINARY_URL = "https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800,c_limit/";

// REPLACE THESE IDS with your actual live Cloudinary IDs
const images = [
  { id: 'v1/ssd-upgrade-sample', alt: 'SSD Upgrade Service' },
  { id: 'v1/logic-board-repair', alt: 'Logic Board Micro-soldering' },
  { id: 'v1/gaming-pc-build', alt: 'Custom Gaming PC Build' },
];

export default function Gallery() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <Helmet>
        <title>KCROC Gallery | Professional Computer Repair in Kuwait</title>
        <meta name="description" content="View our expert repair work in Hawalli. From custom gaming builds to logic board micro-soldering, see the quality KCROC delivers." />
        <link rel="canonical" href="https://www.computerrepairkuwait.com/gallery" />
        
        {/* Open Graph Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="KCROC Gallery | Professional Computer Repair in Kuwait" />
        <meta property="og:description" content="View our expert repair work in Hawalli. From custom gaming builds to logic board micro-soldering, see the quality KCROC delivers." />
        <meta property="og:url" content="https://www.computerrepairkuwait.com/gallery" />
        <meta property="og:image" content="https://www.computerrepairkuwait.com/og-gallery.jpg" />
        <meta property="og:site_name" content="Kuwait Computer Repair On Call" />
        
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 text-center">
        <div className="max-w-6xl mx-auto">
          <Badge className="mb-6 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-4 py-2">
            <Camera className="w-4 h-4 mr-2" /> Gallery
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            Our Work in <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Kuwait</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Precision engineering and quality repairs across all governorates.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, i) => (
            <div key={i} className="group relative aspect-video bg-gray-900 rounded-3xl overflow-hidden border border-gray-800 transition-all hover:border-emerald-500/50">
              <img 
                src={`${CLOUDINARY_URL}${img.id}`} 
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.src = 'https://ui-avatars.com/api/?name=KCROC&background=1e293b&color=10b981&size=400';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 text-white font-bold text-lg">
                {img.alt}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA Strip */}
      <section className="py-24 px-6 border-t border-gray-800">
        <div className="max-w-3xl mx-auto text-center bg-gray-900/40 border border-gray-800 rounded-3xl p-12">
            <h2 className="text-3xl font-black text-white mb-8">Need Expert Repairs?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-lg px-8 py-6" asChild>
                    <a href="tel:+96555301913"><Phone className="mr-2" /> Call 55301913</a>
                </Button>
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-6" asChild>
                    <a href={WA_LINK} target="_blank" rel="noopener noreferrer"><MessageCircle className="mr-2" /> WhatsApp 55301913</a>
                </Button>
            </div>
            <p className="text-gray-500 text-sm mt-8">Hawalli, Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19. Open daily 10 AM – 10 PM.</p>
        </div>
      </section>
    </main>
  );
}
