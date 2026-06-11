import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Cpu, PenTool, Shield, MessageCircle, Phone, CheckCircle, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// ─── Schema Module ───────────────────────────────────────────────────────────
const schemaData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': 'https://www.computerrepairkuwait.com/#business',
      "name": "Kuwait Computer Repair On Call (KCROC)",
      "url": "https://www.computerrepairkuwait.com",
      "telephone": "+96555301913",
      "email": "quadrillion1980@gmail.com",
      "image": "https://www.computerrepairkuwait.com/logo.png",
      "priceRange": "$$",
      "address": { "@type": "PostalAddress", "streetAddress": "Al Mullah Complex, Ibn Khaldoun St, Shop 19", "addressLocality": "Hawalli", "addressCountry": "KW" },
      "geo": { "@type": "GeoCoordinates", "latitude": 29.3356, "longitude": 48.025 },
      "openingHoursSpecification": { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], "opens": "10:00", "closes": "22:00" },
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "150" }
    },
    {
      '@type': 'WebPage',
      '@id': 'https://www.computerrepairkuwait.com/motherboard-repair-kuwait#webpage',
      "name": "Motherboard Repair in Kuwait | Chip-Level Services | KCROC",
      "url": "https://www.computerrepairkuwait.com/motherboard-repair-kuwait",
      "isPartOf": { "@id": "https://www.computerrepairkuwait.com/#website" }
    },
    {
      '@type': 'Service',
      "@id": "https://www.computerrepairkuwait.com/motherboard-repair-kuwait#service",
      "name": "Chip-Level Motherboard Repair",
      "provider": { "@id": "https://www.computerrepairkuwait.com/#business" },
      "areaServed": [ { "@type": "Country", "name": "Kuwait" }, { "@type": "City", "name": "Hawalli" } ],
      "description": "Professional chip-level motherboard repair in Kuwait. We handle micro-soldering, liquid damage, and power rail failures."
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "Can a dead motherboard be repaired?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. At KCROC, we perform chip-level diagnostics to find and replace shorted components rather than swapping the whole board." } },
        { "@type": "Question", "name": "Do you offer free pickup?", "acceptedAnswer": { "@type": "Answer", "text": "Yes, we provide free pickup and delivery across all Kuwait governorates." } }
      ]
    }
  ]
};

export default function MotherboardRepair() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <Helmet>
        <title>Motherboard Repair in Kuwait | Chip-Level Services | KCROC</title>
        <meta name="description" content="Expert motherboard repair in Kuwait. KCROC specializes in micro-soldering, short-circuit repair, and liquid damage restoration. No Fix, No Charge. Free pickup." />
        <link rel="canonical" href="https://www.computerrepairkuwait.com/motherboard-repair-kuwait" />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 text-center">
        <Badge className="mb-6 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-4 py-2">
            <Cpu className="w-4 h-4 mr-2" /> Expert Hardware Engineering
        </Badge>
        <h1 className="text-4xl md:text-6xl font-black mb-6">Motherboard Repair in <span className="text-cyan-400">Kuwait</span></h1>
        <div className="flex flex-wrap justify-center gap-6 text-sm font-bold text-gray-300 mb-10">
          {[ 'Free Diagnostics', 'No Fix, No Charge', 'Free Pickup & Delivery' ].map(t => (
            <span key={t} className="flex items-center gap-2"><CheckCircle className="text-emerald-500" size={18}/> {t}</span>
          ))}
        </div>
        <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-lg px-8 py-6" asChild>
          <Link to="/book">Schedule Repair</Link>
        </Button>
      </section>

      {/* Deep Content Section */}
      <section className="py-20 px-6 max-w-4xl mx-auto space-y-12">
        <h2 className="text-3xl font-black">Advanced Troubleshooting at KCROC</h2>
        <p className="text-gray-400 leading-relaxed">Kuwait Computer Repair On Call (KCROC) provides specialized chip-level repair. Unlike standard shops that suggest expensive board replacements, we isolate faults...</p>
        
        {/* Placeholder for your 1000+ words */}
        <div className="bg-gray-900/40 p-8 rounded-3xl border border-gray-800">
            <h3 className="font-bold text-xl mb-4">Our Repair Capabilities</h3>
            <ul className="grid md:grid-cols-2 gap-4 text-gray-400">
                <li>• No Power / Dead Motherboard</li>
                <li>• Liquid Damage & Corrosion Removal</li>
                <li>• GPU & Display Controller Repair</li>
                <li>• MOSFET & IC Replacement</li>
            </ul>
        </div>
      </section>

      {/* Visible FAQ */}
      <section className="py-20 bg-gray-900/20">
        <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-black mb-12 text-center">Frequently Asked Questions</h2>
            <div className="space-y-6">
                <div className="border-b border-gray-800 pb-6">
                    <h4 className="font-bold mb-2">Can a dead motherboard be repaired?</h4>
                    <p className="text-gray-400">Yes. At Kuwait Computer Repair On Call (KCROC), we perform chip-level diagnostics and component replacement to revive dead boards.</p>
                </div>
            </div>
        </div>
      </section>
    </main>
  );
}
