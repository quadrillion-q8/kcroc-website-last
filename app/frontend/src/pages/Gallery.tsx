import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Phone, MessageCircle } from 'lucide-react';

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
      name: 'KCROC Gallery – Computer Repair Work in Kuwait',
      url: 'https://www.computerrepairkuwait.com/gallery',
      isPartOf: { '@id': 'https://www.computerrepairkuwait.com/#website' },
    },
  ],
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const WA_LINK =
  'https://wa.me/96555301913?text=Hi%2C+I+need+a+repair.+Please+arrange+free+pickup.';

const images = [
  {
    src: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1769908596/Whats-App-Image-2026-01-29-at-3-19-40-AM_i2mpms.jpg',
    alt: 'KCROC repair workshop – Kuwait Computer Repair On Call, Hawalli',
  },
  {
    src: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1769908596/CPU_cooling_fan_replacement_and_maintenance_-_Salmiya_client_mflsla.png',
    alt: 'CPU cooling fan replacement and maintenance – Salmiya client',
  },
  {
    src: 'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1769908594/Modern_repair_facility_interior_-_KCROC_Kuwait_tkxkat.jpg',
    alt: 'Modern repair facility interior – KCROC Kuwait, Hawalli',
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Gallery() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <Helmet>
        <title>Gallery | KCROC Computer Repair Work in Kuwait</title>
        <meta
          name="description"
          content="See our professional computer and laptop repair work in Kuwait. CPU cooling, motherboard repair, workshop facility. Free pickup across all Kuwait. KCROC Hawalli."
        />
        <link rel="canonical" href="https://www.computerrepairkuwait.com/gallery" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Gallery | KCROC Computer Repair Work in Kuwait" />
        <meta
          property="og:description"
          content="See our professional computer and laptop repair work in Kuwait. CPU cooling, motherboard repair, workshop facility. Free pickup across all Kuwait."
        />
        <meta property="og:url" content="https://www.computerrepairkuwait.com/gallery" />
        <meta property="og:image" content="https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_1200/v1769908594/Modern_repair_facility_interior_-_KCROC_Kuwait_tkxkat.jpg" />
        <meta property="og:site_name" content="Kuwait Computer Repair On Call" />

        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-6 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-4 py-2">
            📷 Our Work
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            Repair Work{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              in Kuwait
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Precision engineering and quality repairs across all Kuwait governorates.
            Hawalli, Salmiya, Farwaniya, Kuwait City and beyond.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((img, i) => (
              <div
                key={i}
                className="group relative aspect-video bg-gray-900 rounded-3xl overflow-hidden border border-gray-800 hover:border-emerald-500/40 transition-all"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://ui-avatars.com/api/?name=KCROC&background=111827&color=10b981&size=400';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-transparent opacity-60" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-semibold text-sm leading-snug">{img.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-6 mt-8 border-t border-gray-800">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Need a repair?</h2>
          <p className="text-gray-400 mb-8">
            Kuwait Computer Repair On Call — Hawalli, Ibn Khaldoun St, Al Mullah Complex,
            Basement Shop 19. Free pickup across all Kuwait.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-500 text-lg px-8 py-6"
              asChild
            >
              <a href="tel:+96555301913">
                <Phone className="mr-2" /> Call 55301913
              </a>
            </Button>
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-6"
              asChild
            >
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2" /> WhatsApp 55301913
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
