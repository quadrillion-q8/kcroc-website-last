import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ShieldCheck, EyeOff, Truck, Lock, Cpu, Phone, MapPin, Check } from 'lucide-react';

// Define schema data outside the component to prevent recreation on every render
const schemaData = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Kuwait Computer Repair On Call",
  "alternateName": "KCROC",
  "image": "https://www.computerrepairkuwait.com/logo.jpg",
  "telephone": "+96555301913",
  "openingHours": "Mo-Su 10:00-22:00",
  "url": "https://www.computerrepairkuwait.com",
  "priceRange": "$$",
  "areaServed": "Kuwait",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19",
    "addressLocality": "Hawalli",
    "addressRegion": "Hawalli Governorate",
    "addressCountry": "KW"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 29.3356,
    "longitude": 48.0250
  },
  "sameAs": [
    "https://maps.google.com/?cid=3928987856909945446",
    "https://www.facebook.com/computerrepairkuwait",
    "https://www.instagram.com/computerrepairkuwait"
  ]
};

// Trust Badges Data
const trustBadges = [
  { id: 'pickup',  icon: Truck,       text: "Free Pickup Across Kuwait" },
  { id: 'cctv',    icon: ShieldCheck, text: "CCTV Monitored" },
  { id: 'nodata',  icon: EyeOff,      text: "No Data Access" },
  { id: 'esd',     icon: Cpu,         text: "ESD Safe Lab" },
  { id: 'auth',    icon: Lock,        text: "Authorized Technicians Only" },
];

const PrivacySecurity: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* SEO & Metadata Injection */}
      <Helmet>
        <title>Privacy Guarantee & Data Security | KCROC Kuwait</title>
        <meta 
          name="description" 
          content="Your data is safe with Kuwait Computer Repair On Call. Read our 4-Point Zero-Risk Privacy Protocol for chip-level repairs." 
        />
        <link rel="canonical" href="https://www.computerrepairkuwait.com/data-security/" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Privacy Guarantee & Data Security | KCROC Kuwait" />
        <meta property="og:description" content="Your data is safe with Kuwait Computer Repair On Call. Read our 4-Point Zero-Risk Privacy Protocol." />
        <meta property="og:image" content="https://www.computerrepairkuwait.com/logo.jpg" />
        <meta property="og:url" content="https://www.computerrepairkuwait.com/data-security/" />
        <meta property="og:type" content="website" />

        {/* JSON-LD Schema */}
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      {/* Header Section */}
      <header className="bg-slate-900 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <ShieldCheck className="w-16 h-16 mx-auto mb-4 text-emerald-400" aria-hidden="true" />
          <h1 className="text-4xl font-bold mb-4">Privacy Guarantee & Data Security</h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Your data is safe with KCROC. When you hand your computer over for repair, you aren’t just trusting someone with expensive hardware—you are trusting them with your digital life.
          </p>
        </div>
      </header>

      {/* Trust Badges Ribbon */}
      <section
        className="py-8 px-6 bg-white border-b border-gray-200"
        aria-label="Security and trust credentials"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {trustBadges.map((badge, index) => {
              const Icon = badge.icon;
              const isOrphan = index === trustBadges.length - 1 && trustBadges.length % 2 !== 0;
              return (
                <div
                  key={badge.id}
                  className={`flex flex-col items-center justify-center bg-gray-50 border border-gray-200 rounded-xl p-4 text-center hover:shadow-md hover:-translate-y-0.5 transition-all ${isOrphan ? 'col-span-2 md:col-span-1' : ''}`}
                >
                  <Icon className="w-7 h-7 text-emerald-600 mb-2" aria-hidden="true" />
                  <span className="text-sm font-semibold text-slate-800 leading-tight">
                    {badge.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content / 4-Point Protocol */}
      <main className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900">Our 4-Point Zero-Risk Privacy Protocol</h2>
          <p className="text-gray-600 mt-4">We built our reputation on a zero-compromise approach to your privacy and device security.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Point 1 */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <EyeOff className="w-10 h-10 text-blue-600 mb-4" aria-hidden="true" />
            <h3 className="text-xl font-bold mb-3">1. Strict "No-Snooping" Policy</h3>
            <ul className="space-y-3 text-gray-600 list-none" role="list">
              <li className="flex gap-2">
                <Check className="w-5 h-5 text-emerald-500 mt-1 shrink-0" aria-hidden="true" />
                <span><strong>Zero File Interaction:</strong> We only utilize specialized diagnostic software. We never open, view, or browse your personal folders or histories.</span>
              </li>
              <li className="flex gap-2">
                <Check className="w-5 h-5 text-emerald-500 mt-1 shrink-0" aria-hidden="true" />
                <span><strong>Drive Removal Option:</strong> For motherboard-level repairs, you are completely welcome to remove your storage drive before handing the machine to us.</span>
              </li>
            </ul>
          </div>

          {/* Point 2 */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <Truck className="w-10 h-10 text-blue-600 mb-4" aria-hidden="true" />
            <h3 className="text-xl font-bold mb-3">2. Secure Pick & Drop Chain of Custody</h3>
            <ul className="space-y-3 text-gray-600 list-none" role="list">
              <li className="flex gap-2">
                <Check className="w-5 h-5 text-emerald-500 mt-1 shrink-0" aria-hidden="true" />
                <span><strong>Logged Logistics:</strong> From the moment our driver collects your device, it is tagged and placed directly into a secure transport enclosure.</span>
              </li>
              <li className="flex gap-2">
                <Check className="w-5 h-5 text-emerald-500 mt-1 shrink-0" aria-hidden="true" />
                <span><strong>Direct Routing:</strong> Your machine goes straight from your location to our laboratory. It is never passed to a third-party courier.</span>
              </li>
            </ul>
          </div>

          {/* Point 3 */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <Lock className="w-10 h-10 text-blue-600 mb-4" aria-hidden="true" />
            <h3 className="text-xl font-bold mb-3">3. Fortified Technical Laboratory</h3>
            <ul className="space-y-3 text-gray-600 list-none" role="list">
              <li className="flex gap-2">
                <Check className="w-5 h-5 text-emerald-500 mt-1 shrink-0" aria-hidden="true" />
                <span><strong>Monitored Premises:</strong> Our specialized Hawalli facility operates under continuous video surveillance with devices stored in secure tech lockers.</span>
              </li>
              <li className="flex gap-2">
                <Check className="w-5 h-5 text-emerald-500 mt-1 shrink-0" aria-hidden="true" />
                <span><strong>Authorized Access Only:</strong> Only the specific technician assigned to your chip-level diagnostics handles your hardware.</span>
              </li>
            </ul>
          </div>

          {/* Point 4 */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <Cpu className="w-10 h-10 text-blue-600 mb-4" aria-hidden="true" />
            <h3 className="text-xl font-bold mb-3">4. Component & Repair Transparency</h3>
            <ul className="space-y-3 text-gray-600 list-none" role="list">
              <li className="flex gap-2">
                <Check className="w-5 h-5 text-emerald-500 mt-1 shrink-0" aria-hidden="true" />
                <span><strong>Original Parts Protection:</strong> We never swap or substitute your original factory components. Every microscopic part replaced is documented.</span>
              </li>
              <li className="flex gap-2">
                <Check className="w-5 h-5 text-emerald-500 mt-1 shrink-0" aria-hidden="true" />
                <span><strong>Formal Documentation:</strong> You receive a transparent digital invoice detailing the exact work. We do not do unrecorded repairs.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Targeted Internal Links */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <a href="/laptop-repair-hawalli-kuwait/" className="bg-slate-800 text-white font-bold py-3 px-6 rounded-lg hover:bg-slate-900 transition shadow-sm">
            Laptop Repair
          </a>
          <a href="/macbook-repair/" className="bg-slate-800 text-white font-bold py-3 px-6 rounded-lg hover:bg-slate-900 transition shadow-sm">
            MacBook Repair
          </a>
          <a href="/chip-level-motherboard-repair-hawalli/" className="bg-slate-800 text-white font-bold py-3 px-6 rounded-lg hover:bg-slate-900 transition shadow-sm">
            Motherboard Repair
          </a>
        </div>
      </main>

      {/* Footer / Contact Information */}
      <footer className="bg-slate-100 py-12 px-6 border-t border-slate-200">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Absolute Transparency. Total Peace of Mind.</h3>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            If you have any questions regarding our security protocols, or want to discuss a non-disclosure requirement for sensitive data before scheduling, contact our technical desk directly.
          </p>
          
          <div className="bg-white p-6 rounded-xl shadow-sm block mx-auto text-left border border-gray-200 w-full max-w-md">
            <h4 className="font-bold text-lg mb-4 text-slate-900 border-b pb-2">Kuwait Computer Repair On Call (KCROC)</h4>
            <div className="space-y-4 text-gray-700">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 text-emerald-600 mt-0.5 shrink-0" aria-hidden="true" />
                <span>Hawalli, Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-emerald-600 shrink-0" aria-hidden="true" />
                <a href="tel:+96555301913" className="font-semibold text-slate-900 hover:text-blue-600 hover:underline transition">
                  55301913
                </a>
              </div>
              <div className="flex items-center">
                <Truck className="w-5 h-5 mr-3 text-emerald-600 shrink-0" aria-hidden="true" />
                <span className="font-semibold text-blue-600">Free Pick & Drop Service</span>
              </div>
              
              {/* WhatsApp Call to Action */}
              <div className="pt-2">
                <a 
                  href="https://wa.me/96555301913" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full bg-emerald-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-emerald-600 transition shadow-sm"
                >
                  Message Us on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PrivacySecurity;
