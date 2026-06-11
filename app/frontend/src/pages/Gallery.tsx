import { Helmet } from 'react-helmet-async';
import { Camera } from 'lucide-react';

// ─── Schema Module Scope ────────────────────────────────────────────────────
const gallerySchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://computerrepairkuwait.com/gallery#webpage",
      "name": "KCROC Gallery – Computer Repair in Hawalli",
      "url": "https://computerrepairkuwait.com/gallery",
      "isPartOf": { "@id": "https://computerrepairkuwait.com/#business" }
    }
  ]
};

// ─── Cloudinary Config ──────────────────────────────────────────────────────
// Replace 'YOUR_IMAGE_ID' with the specific IDs from your Cloudinary media library
const images = [
  { id: 'ssd-upgrade-sample', alt: 'SSD Upgrade Service' },
  { id: 'logic-board-repair', alt: 'Logic Board Micro-soldering' },
  { id: 'gaming-pc-build', alt: 'Custom Gaming PC Build' },
  // Add all your IDs here
];

const CLOUDINARY_URL = "https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto,w_800/v1/";

export default function Gallery() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-200 pt-32 pb-20 px-6">
      <Helmet>
        <title>KCROC Gallery | Professional Computer Repair in Kuwait</title>
        <meta name="description" content="View our expert repair work in Hawalli. From custom gaming builds to logic board micro-soldering, see the quality KCROC delivers." />
        <link rel="canonical" href="https://computerrepairkuwait.com/gallery" />
        <script type="application/ld+json">{JSON.stringify(gallerySchema)}</script>
      </Helmet>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
            Our Work in <span className="text-cyan-400">Kuwait</span>
          </h1>
          <p className="text-xl text-slate-400">Precision engineering and quality repairs across all governorates.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, i) => (
            <div key={i} className="group relative aspect-video bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 transition-all hover:border-emerald-500/50">
              <img 
                src={`${CLOUDINARY_URL}${img.id}`} 
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.src = 'https://ui-avatars.com/api/?name=KCROC&background=1e293b&color=10b981&size=400';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-60" />
              <div className="absolute bottom-4 left-4 text-white font-bold text-sm">
                {img.alt}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
