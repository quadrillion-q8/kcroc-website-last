import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Monitor, Cpu, HardDrive, Laptop, Database, ShieldAlert,
  Wrench, Check, ChevronDown, MessageCircle, Phone,
  Star, CheckCircle2, MapPin
} from 'lucide-react';

// ─── Schema ──────────────────────────────────────────────────────────────────

const schemaOrg = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://computerrepairkuwait.com/pricing#webpage",
      "name": "Computer Repair Prices in Kuwait | KCROC – Free Diagnosis",
      "url": "https://computerrepairkuwait.com/pricing",
      "description": "Transparent repair prices for laptops & MacBooks in Kuwait. Screen replacements, SSDs & motherboard repairs. Free diagnosis, No Fix No Fee, 30-day warranty.",
      "mainEntity": { "@id": "https://computerrepairkuwait.com/#business" }
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://computerrepairkuwait.com/#business",
      "name": "Kuwait Computer Repair On Call (KCROC)",
      "url": "https://computerrepairkuwait.com",
      "logo": "https://computerrepairkuwait.com/logo.png",
      "image": "https://computerrepairkuwait.com/og-image.jpg",
      "telephone": "+96555301913",
      "priceRange": "KWD 8 - KWD 45",
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
      "openingHours": "Mo-Su 10:00-22:00",
      "aggregateRating": { 
        "@type": "AggregateRating", 
        "ratingValue": "4.9", 
        "reviewCount": "150" 
      },
      "sameAs": [
        "https://maps.google.com/?cid=13346903770453509930", // Replace with your exact Google Business CID link
        "https://www.facebook.com/kcrockw",
        "https://www.instagram.com/kcrockw"
      ]
    },
    {
      "@type": "Service",
      "name": "Computer, Laptop & MacBook Repair Services Kuwait",
      "provider": { "@id": "https://computerrepairkuwait.com/#business" },
      "areaServed": [
        { "@type": "AdministrativeArea", "name": "Hawalli" },
        { "@type": "AdministrativeArea", "name": "Capital" },
        { "@type": "AdministrativeArea", "name": "Farwaniya" },
        { "@type": "AdministrativeArea", "name": "Ahmadi" },
        { "@type": "AdministrativeArea", "name": "Jahra" },
        { "@type": "AdministrativeArea", "name": "Mubarak Al-Kabeer" }
      ],
      "offers": {
        "@type": "Offer",
        "priceCurrency": "KWD",
        "priceSpecification": {
          "@type": "PriceSpecification",
          "minPrice": "8",
          "maxPrice": "45",
          "priceCurrency": "KWD"
        }
      }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much does laptop repair cost in Kuwait?",
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "Repair costs vary by service. Screen replacements start from 15 KD, SSD upgrades from 8 KD (plus parts), virus removal from 10 KD, and motherboard/chip-level repairs from 25 KD. All repairs include a 30-day warranty and free pickup across Kuwait." 
          }
        },
        {
          "@type": "Question",
          "name": "Is the diagnostic free?",
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "Yes. Initial diagnosis is free. If we cannot fix your device, you pay nothing — our No Fix, No Fee guarantee applies to every job." 
          }
        },
        {
          "@type": "Question",
          "name": "Do you offer free pickup and delivery in Kuwait?",
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "Yes. Free pickup and delivery is included with every repair across all Kuwait governorates — Hawalli, Capital, Farwaniya, Ahmadi, Jahra, and Mubarak Al-Kabeer." 
          }
        },
        {
          "@type": "Question",
          "name": "What warranty is included with repairs?",
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "Every repair carries a 30-day warranty on both parts and labour. If the same fault returns within 30 days, we fix it at no extra cost." 
          }
        },
        {
          "@type": "Question",
          "name": "How long do repairs take?",
          "acceptedAnswer": { 
            "@type": "Answer", 
            "text": "Screen replacements, SSD upgrades, and virus removal are typically same-day. Motherboard and chip-level repairs take 1–3 business days. Data recovery timelines depend on drive condition." 
          }
        }
      ]
    }
  ]
};

// ─── Static Data ──────────────────────────────────────────────────────────────

const services = [
  {
    icon: Monitor,
    title: 'Screen Replacement',
    subtitle: 'Laptop & MacBook displays',
    from: 15,
    note: 'Parts included. Same-day on most models.',
    items: [
      'Laptop LCD / IPS panel swap',
      'MacBook Retina display replacement',
      'Touch screen digitizer repair',
      'Backlight & inverter repair',
    ],
    wa: 'Hi! I need a screen replacement. Please advise on price and availability.',
  },
  {
    icon: Cpu,
    title: 'Motherboard & Chip-Level',
    subtitle: 'Logic board diagnostics & micro-soldering',
    from: 25,
    note: 'No Fix, No Fee applies.',
    items: [
      'Full logic board diagnostics',
      'BGA re-balling & micro-soldering',
      'BIOS / EC chip flashing',
      'Liquid damage assessment & cleaning',
    ],
    wa: 'Hi! I need motherboard or chip-level repair. Please advise.',
  },
  {
    icon: HardDrive,
    title: 'SSD & RAM Upgrade',
    subtitle: 'Speed up your existing device',
    from: 8,
    note: 'Labour from 8 KD. Parts quoted separately.',
    items: [
      'SSD installation (SATA / NVMe)',
      'RAM upgrade & compatibility check',
      'OS migration to new drive',
      'Old drive data transfer',
    ],
    wa: 'Hi! I want to upgrade my SSD or RAM. Please advise on options and pricing.',
  },
  {
    icon: Laptop,
    title: 'MacBook Repair',
    subtitle: 'All models, all faults',
    from: 20,
    note: 'Covers Air, Pro, M-series.',
    items: [
      'Logic board fault diagnosis',
      'Keyboard & trackpad replacement',
      'Battery & charging port repair',
      'Thermal paste & cooling service',
    ],
    wa: 'Hi! I need MacBook repair. Please advise on diagnosis and pricing.',
  },
  {
    icon: Database,
    title: 'Data Recovery',
    subtitle: 'HDD, SSD, corrupted media',
    from: 20,
    note: 'No data recovered, no charge.',
    items: [
      'Failed / clicking hard drive recovery',
      'SSD controller fault recovery',
      'Deleted / formatted partition recovery',
      'Encrypted & corrupted volume recovery',
    ],
    wa: 'Hi! I need data recovery. Please advise on what\'s possible and the cost.',
  },
  {
    icon: ShieldAlert,
    title: 'Virus Removal & OS Restore',
    subtitle: 'Clean slate, fast turnaround',
    from: 10,
    note: 'Includes post-clean optimisation.',
    items: [
      'Full malware & ransomware removal',
      'Clean Windows / macOS reinstall',
      'Driver & software setup',
      'Startup & performance optimisation',
    ],
    wa: 'Hi! I need virus removal or OS reinstall. Please advise.',
  },
];

const guarantees = [
  { label: 'Free Diagnosis', sub: 'No charge to assess your device' },
  { label: 'No Fix, No Fee', sub: 'You only pay if we fix it' },
  { label: '30-Day Warranty', sub: 'Parts and labour, every repair' },
  { label: 'Free Pickup', sub: 'All Kuwait governorates' },
];

const faqs = [
  {
    q: 'How much does laptop repair cost in Kuwait?',
    a: 'It depends on the fault. Screen replacements start from 15 KD, SSD upgrades from 8 KD (labour; parts quoted separately), virus removal from 10 KD, and motherboard/chip-level work from 25 KD. We give a fixed quote before any work begins.',
  },
  {
    q: 'Is the diagnostic free?',
    a: 'Yes. We diagnose your device at no charge. If we cannot fix it, you pay nothing — our No Fix, No Fee guarantee covers every job.',
  },
  {
    q: 'Do you offer free pickup and delivery?',
    a: 'Yes. Free pickup and delivery is included with every repair, across all Kuwait governorates — Hawalli, Capital, Farwaniya, Ahmadi, Jahra, and Mubarak Al-Kabeer.',
  },
  {
    q: 'What warranty is included?',
    a: 'Every repair carries a 30-day warranty covering both parts and labour. If the same fault returns within 30 days, we fix it at no extra cost.',
  },
  {
    q: 'How long do repairs take?',
    a: 'Screen replacements, SSD upgrades, and virus removal are typically same-day. Motherboard and chip-level repairs take 1–3 business days. Data recovery timelines depend on the condition of the drive.',
  },
];

const targetAreas = [
  { name: 'Hawalli', text: 'Computer Repair Hawalli' },
  { name: 'Salmiya', text: 'Laptop Repair Salmiya' },
  { name: 'Kuwait City', text: 'PC Repair Kuwait City' },
  { name: 'Farwaniya', text: 'Device Service Farwaniya' },
  { name: 'Fahaheel', text: 'Mac Repair Fahaheel' },
  { name: 'Mahboula', text: 'Laptop Service Mahboula' },
  { name: 'Jabriya', text: 'Screen Replacement Jabriya' },
  { name: 'Rumaithiya', text: 'Computer Maintenance Rumaithiya' },
  { name: 'Salwa', text: 'PC Fix Salwa' },
  { name: 'Shuwaikh', text: 'Hardware Service Shuwaikh' },
  { name: 'Ardiya', text: 'Tech Support Ardiya' },
  { name: 'Fintas', text: 'MacBook Repair Fintas' }
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const FAQItem = ({ q, a, index }: { q: string; a: string; index: number }) => {
  const [open, setOpen] = useState(false);
  const panelId = `faq-panel-${index}`;
  
  return (
    <div className="border border-gray-800 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-900/40 transition-colors"
        aria-expanded={open}
        aria-controls={panelId}
      >
        <span className="font-semibold text-white pr-4">{q}</span>
        <ChevronDown
          size={20}
          className={`text-emerald-400 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div 
        id={panelId}
        aria-hidden={!open}
        className={`px-6 text-gray-400 text-sm leading-relaxed border-t border-gray-800/50 transition-all duration-200 ease-in-out ${
          open ? 'max-h-96 pb-6 pt-4 opacity-100' : 'max-h-0 opacity-0 pointer-events-none overflow-hidden border-none'
        }`}
      >
        {a}
      </div>
    </div>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Pricing() {
  const finalCtaWaLink = `https://wa.me/96555301913?text=${encodeURIComponent("Hi! I'd like a repair quote. My device has:")}`;

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
      <Helmet>
        <title>Computer Repair Prices in Kuwait | KCROC – Free Diagnosis</title>
        <meta
          name="description"
          content="Transparent repair prices for laptops & MacBooks in Kuwait. Screen replacements, SSDs & motherboard repairs. Free diagnosis, No Fix No Fee, 30-day warranty."
        />
        <link rel="canonical" href="https://computerrepairkuwait.com/pricing" />
        <script type="application/ld+json">{JSON.stringify(schemaOrg)}</script>
      </Helmet>

      {/* ── Hero ── */}
      <section className="pt-32 pb-16 px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full text-emerald-400 text-sm font-medium mb-6">
          <CheckCircle2 size={14} />
          <span>Free Diagnosis · No Fix, No Fee · 30-Day Warranty</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black max-w-3xl mx-auto tracking-tight mb-6">
          Computer Repair Prices{' '}
          <span className="text-emerald-500">in Kuwait</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Fixed quotes before we start. Free pickup across all Kuwait governorates.
          You only pay if we fix it.
        </p>
      </section>

      {/* ── Trust Strip ── */}
      <div className="border-y border-gray-800 bg-gray-900/30">
        <div className="max-w-5xl mx-auto px-6 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
          {guarantees.map((g, i) => (
            <div key={i} className="flex items-center gap-3">
              <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <div>
                <div className="text-sm font-bold text-white">{g.label}</div>
                <div className="text-xs text-gray-500">{g.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Service Pricing ── */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Repair Prices by Service</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            All prices are starting rates. We give you a fixed quote after free diagnosis — no surprises.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div
              key={i}
              className="bg-gray-900/40 rounded-3xl border border-gray-800 hover:border-emerald-500/40 transition-all flex flex-col group"
            >
              {/* Card header */}
              <div className="p-7 pb-5">
                <div className="flex items-start justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                    <s.icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">From</div>
                    <div className="text-2xl font-black text-white">{s.from} <span className="text-sm font-normal text-gray-400">KD</span></div>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-1">{s.title}</h3>
                <p className="text-sm text-gray-400">{s.subtitle}</p>
              </div>

              {/* Feature list */}
              <div className="px-7 pb-5 flex-grow">
                <ul className="space-y-2.5">
                  {s.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-gray-300">
                      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Note + CTA */}
              <div className="px-7 pb-7 pt-4 border-t border-gray-800/60 mt-auto">
                <p className="text-xs text-gray-500 mb-4">{s.note}</p>
                <a
                  href={`https://wa.me/96555301913?text=${encodeURIComponent(s.wa)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500 hover:border-emerald-500 text-emerald-400 hover:text-white font-bold py-3 rounded-xl transition-all text-sm"
                >
                  <MessageCircle size={15} />
                  Get a Quote
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── How Pricing Works ── */}
      <section className="py-16 bg-gray-900/30 border-y border-gray-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-3">How Our Pricing Works</h2>
          <p className="text-gray-400 mb-12">No hidden fees. No commitment to repair until you approve the quote.</p>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            {[
              { n: '01', title: 'Free Diagnosis', body: 'We collect your device and run full hardware diagnostics at no charge. You get a clear fault report.' },
              { n: '02', title: 'Fixed Quote', body: 'We send you a fixed price before touching anything. No work starts until you approve it.' },
              { n: '03', title: 'Repair & Return', body: 'Repair is completed, tested, and delivered back to you with a 30-day warranty — often same day.' },
            ].map((step, i) => (
              <div key={i} className="bg-gray-950/60 rounded-2xl border border-gray-800 p-6">
                <div className="text-xs font-black text-emerald-500 tracking-widest mb-3">{step.n}</div>
                <h3 className="font-bold text-white mb-2">{step.title}</h3>
                <div className="text-gray-400 text-sm leading-relaxed">{step.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Google Rating Bar ── */}
      <section className="py-12 max-w-4xl mx-auto px-6">
        <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-6 justify-between">
          <div className="flex items-center gap-4">
            <div className="text-5xl font-black text-white">4.9</div>
            <div>
              <div className="flex gap-1 mb-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <div className="text-sm text-gray-400">150+ verified Google reviews</div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://wa.me/96555301913"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 px-6 py-3 rounded-full font-bold text-sm transition-all text-white"
            >
              <MessageCircle size={16} /> WhatsApp Us
            </a>
            <a
              href="tel:+96555301913"
              className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 px-6 py-3 rounded-full font-bold text-sm transition-all text-white"
            >
              <Phone size={16} /> 55301913
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-3">Pricing FAQs</h2>
        <p className="text-gray-400 text-center mb-10">Common questions about repair costs and how we work.</p>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <FAQItem key={i} index={i} q={f.q} a={f.a} />
          ))}
        </div>
      </section>

      {/* ── Areas ── */}
      <section className="py-12 bg-gray-900/30 border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-semibold text-emerald-400 uppercase tracking-widest">Free Pickup Across Kuwait</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {targetAreas.map((area) => (
              <span 
                key={area.name} 
                title={area.text} 
                className="px-3 py-1.5 rounded-full text-xs font-medium bg-gray-900 border border-gray-800 text-gray-400 transition-colors hover:text-emerald-400 hover:border-emerald-500/30 cursor-help"
              >
                {area.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-emerald-500/10 to-gray-900/0 border border-emerald-500/20 rounded-3xl p-12">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full text-emerald-400 text-sm font-medium mb-6">
            <CheckCircle2 size={14} />
            <span>No Fix, No Fee · Free Pickup · 30-Day Warranty</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4">Get a Free Quote Today</h2>
          <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
            Describe your issue and we'll give you a price before collecting your device.
            No commitment required.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={finalCtaWaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-green-500/30 text-white"
            >
              <MessageCircle className="h-5 w-5" /> WhatsApp: 55301913
            </a>
            <a
              href="tel:+96555301913"
              className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 px-8 py-4 rounded-full font-bold text-lg transition-all text-white"
            >
              <Phone className="h-5 w-5" /> Call: 55301913
            </a>
          </div>
          <p className="text-gray-600 text-sm mt-6">
            Hawalli, Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19
          </p>
        </div>
      </section>
    </div>
  );
}
