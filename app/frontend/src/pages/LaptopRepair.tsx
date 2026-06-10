import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Monitor, Battery, Keyboard, HardDrive, Zap, Droplets,
  Phone, MessageCircle, CheckCircle2, Shield, Truck, Clock,
  ChevronDown, Cpu,
} from 'lucide-react';

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
      '@id': 'https://www.computerrepairkuwait.com/laptop-repair#webpage',
      name: 'Laptop Repair in Kuwait',
      url: 'https://www.computerrepairkuwait.com/laptop-repair',
      isPartOf: { '@id': 'https://www.computerrepairkuwait.com/#website' },
    },
    {
      '@type': 'RepairService',
      '@id': 'https://www.computerrepairkuwait.com/laptop-repair#service',
      name: 'Laptop Repair Service Kuwait',
      provider: { '@id': 'https://www.computerrepairkuwait.com/#business' },
      areaServed: { '@type': 'Country', name: 'Kuwait' },
      description:
        'Full-service laptop repair in Kuwait covering all brands. Screen replacement, battery, keyboard, Windows install, SSD upgrade, liquid damage, and more. Free pickup and delivery.',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Laptop Repair Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Laptop Screen Replacement' },
            priceSpecification: { '@type': 'PriceSpecification', price: '20', priceCurrency: 'KWD', minPrice: '20' },
          },
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Laptop Battery Replacement' },
            priceSpecification: { '@type': 'PriceSpecification', price: '15', priceCurrency: 'KWD', minPrice: '15' },
          },
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Keyboard Repair or Replacement' },
            priceSpecification: { '@type': 'PriceSpecification', price: '12', priceCurrency: 'KWD', minPrice: '12' },
          },
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Windows / OS Installation' },
            priceSpecification: { '@type': 'PriceSpecification', price: '15', priceCurrency: 'KWD', minPrice: '15' },
          },
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'SSD & RAM Performance Upgrade' },
            priceSpecification: { '@type': 'PriceSpecification', price: '20', priceCurrency: 'KWD', minPrice: '20' },
          },
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Liquid Damage Repair' },
            priceSpecification: { '@type': 'PriceSpecification', priceCurrency: 'KWD' },
          },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Do you repair all laptop brands?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. We repair HP, Dell, Lenovo, ASUS, Acer, MSI, Alienware, Samsung, Toshiba, Huawei, LG, and most other major laptop brands.',
          },
        },
        {
          '@type': 'Question',
          name: 'How long does laptop repair take in Kuwait?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Most common repairs like screen and battery replacements are completed same day. Complex repairs such as motherboard or liquid damage may take 1–3 business days.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do you offer free laptop pickup in Kuwait?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. We provide free pickup and delivery across all areas of Kuwait. Call or WhatsApp 55301913 to arrange collection.',
          },
        },
        {
          '@type': 'Question',
          name: 'What warranty do you offer on laptop repairs?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'All laptop repairs come with a 30-day warranty covering parts and workmanship.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much does laptop repair cost in Kuwait?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Screen replacement starts from 20 KD, battery replacement from 15 KD, keyboard repair from 12 KD, and Windows installation from 15 KD. Diagnosis is always free.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do you charge if you cannot fix the laptop?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. We operate on a no-fix, no-fee basis. If we cannot repair your laptop, you pay nothing.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can you repair a laptop damaged by liquid?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. We assess and clean liquid-damaged laptops, replacing affected components where needed. Bring it in or arrange a free pickup as soon as possible after the incident.',
          },
        },
      ],
    },
  ],
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const services = [
  {
    icon: Monitor,
    title: 'Screen Replacement',
    desc: 'Panel replacement for all brands. Restores display clarity and touch function.',
    price: 'From 20 KD',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
  },
  {
    icon: Battery,
    title: 'Battery Replacement',
    desc: 'Fast cell replacement with verified, high-capacity parts.',
    price: 'From 15 KD',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
  },
  {
    icon: Keyboard,
    title: 'Keyboard Repair',
    desc: 'Individual key repair or full unit replacement for all brands.',
    price: 'From 12 KD',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
  },
  {
    icon: HardDrive,
    title: 'Windows / OS Install',
    desc: 'Fresh system installation with all drivers and updates configured.',
    price: 'From 15 KD',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
  },
  {
    icon: Zap,
    title: 'SSD & RAM Upgrade',
    desc: 'Hardware upgrades that dramatically improve speed and responsiveness.',
    price: 'From 20 KD',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
  },
  {
    icon: Droplets,
    title: 'Liquid Damage Repair',
    desc: 'Full assessment, component cleaning, and part replacement after spills.',
    price: 'Quote required',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
  },
];

const brands = [
  'HP', 'Dell', 'Lenovo', 'ASUS', 'Acer', 'MSI',
  'Alienware', 'Samsung', 'Toshiba', 'Huawei', 'LG', 'Razer',
];

const areas = [
  { label: 'Hawalli', tip: 'Laptop repair – Hawalli' },
  { label: 'Salmiya', tip: 'Laptop repair – Salmiya' },
  { label: 'Kuwait City', tip: 'Laptop repair – Kuwait City' },
  { label: 'Farwaniya', tip: 'Laptop repair – Farwaniya' },
  { label: 'Mahboula', tip: 'Laptop repair – Mahboula' },
  { label: 'Jahra', tip: 'Laptop repair – Jahra' },
  { label: 'Rumaithiya', tip: 'Laptop repair – Rumaithiya' },
  { label: 'Fahaheel', tip: 'Laptop repair – Fahaheel' },
];

const pricing = [
  { service: 'Screen Replacement', price: 'From 20 KD' },
  { service: 'Battery Replacement', price: 'From 15 KD' },
  { service: 'Keyboard Repair / Replacement', price: 'From 12 KD' },
  { service: 'Windows / OS Installation', price: 'From 15 KD' },
  { service: 'SSD & RAM Upgrade', price: 'From 20 KD' },
  { service: 'Liquid Damage Assessment', price: 'Quote required' },
  { service: 'Diagnosis', price: 'Free' },
];

const trustItems = [
  { icon: Truck, text: 'Free Pickup & Delivery across all Kuwait' },
  { icon: Shield, text: '30-Day Warranty on all repairs' },
  { icon: CheckCircle2, text: 'No Fix, No Fee guarantee' },
  { icon: Zap, text: 'Same-day service on eligible repairs' },
  { icon: Clock, text: 'Open daily 10 AM – 10 PM' },
  { icon: Phone, text: 'Free diagnosis before any repair' },
];

const faqs = [
  {
    q: 'Do you repair all laptop brands?',
    a: 'Yes. We repair HP, Dell, Lenovo, ASUS, Acer, MSI, Alienware, Samsung, Toshiba, Huawei, LG, and most other major laptop brands.',
  },
  {
    q: 'How long does laptop repair take?',
    a: 'Most common repairs like screen and battery replacements are completed same day. Complex repairs such as motherboard or liquid damage may take 1–3 business days.',
  },
  {
    q: 'Do you offer free laptop pickup in Kuwait?',
    a: 'Yes. We provide free pickup and delivery across all areas of Kuwait. Call or WhatsApp 55301913 to arrange collection.',
  },
  {
    q: 'What warranty do you offer?',
    a: 'All laptop repairs come with a 30-day warranty covering parts and workmanship.',
  },
  {
    q: 'How much does laptop repair cost in Kuwait?',
    a: 'Screen replacement starts from 20 KD, battery from 15 KD, keyboard from 12 KD, and Windows installation from 15 KD. Diagnosis is always free.',
  },
  {
    q: 'Do you charge if you cannot fix the laptop?',
    a: 'No. We operate on a no-fix, no-fee basis. If we cannot repair your laptop, you pay nothing.',
  },
  {
    q: 'Can you repair a laptop damaged by liquid?',
    a: 'Yes. We assess and clean liquid-damaged laptops, replacing affected components where needed. Arrange a free pickup as soon as possible after the incident.',
  },
];

const WA_LINK =
  'https://wa.me/96555301913?text=Hi%2C+I+need+laptop+repair.+Please+arrange+free+pickup.';

// ─── FAQ Accordion Item ───────────────────────────────────────────────────────
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-800 rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left text-white font-medium hover:bg-gray-900/60 transition-colors"
        aria-expanded={open}
      >
        <span>{q}</span>
        <ChevronDown
          className={`w-5 h-5 text-emerald-400 flex-shrink-0 ml-4 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      {open && (
        <div className="px-6 pb-5 text-gray-400 leading-relaxed border-t border-gray-800 pt-4">
          {a}
        </div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function LaptopRepair() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <Helmet>
        <title>Laptop Repair in Kuwait | All Brands Fixed – KCROC</title>
        <meta
          name="description"
          content="Expert laptop repair in Kuwait for all brands. Screen, battery, keyboard, Windows reinstall, SSD upgrade. Free pickup. 30-day warranty. تصليح لاب توب الكويت."
        />
        <link rel="canonical" href="https://www.computerrepairkuwait.com/laptop-repair" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Laptop Repair in Kuwait | All Brands Fixed – KCROC" />
        <meta
          property="og:description"
          content="Full-service laptop repair in Kuwait. Screen, battery, keyboard, OS install, SSD upgrade. Free pickup across all Kuwait. 30-day warranty. No fix, no fee."
        />
        <meta property="og:url" content="https://www.computerrepairkuwait.com/laptop-repair" />
        <meta property="og:image" content="https://www.computerrepairkuwait.com/og-laptop-repair.jpg" />
        <meta property="og:site_name" content="Kuwait Computer Repair On Call" />

        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 text-center">
        <Badge className="mb-6 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-4 py-2">
          💻 Laptop Repair Experts — Kuwait
        </Badge>
        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
          Laptop Repair in Kuwait
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-4">
          تصليح لاب توب في الكويت — All brands repaired with free pickup, same-day service, and a 30-day warranty.
        </p>
        <p className="text-gray-400 max-w-xl mx-auto mb-10">
          HP, Dell, Lenovo, ASUS, Acer, MSI, Alienware & more. Hawalli expert service.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-lg px-8 py-6" asChild>
            <a href="tel:+96555301913">
              <Phone className="mr-2" /> Call +965 5530 1913
            </a>
          </Button>
          <Button
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-6"
            asChild
          >
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2" /> WhatsApp Now
            </a>
          </Button>
        </div>
      </section>

      {/* Area Pills */}
      <section className="pb-12 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-gray-500 text-sm mb-4 uppercase tracking-wider">
            Serving all Kuwait areas
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {areas.map((area) => (
              <span
                key={area.label}
                title={area.tip}
                className="bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-700 hover:border-emerald-500/40 text-sm px-3 py-1.5 rounded-full cursor-default transition-colors"
              >
                {area.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-6 bg-gray-900/40">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Laptop Repair Services</h2>
            <p className="text-xl text-gray-400">
              تصليح لاب توب — Fast, professional repair for all brands
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <Card
                  key={i}
                  className="bg-gray-900/50 border-gray-800 hover:border-emerald-500/40 transition-all flex flex-col"
                >
                  <CardHeader>
                    <div
                      className={`${service.bgColor} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}
                    >
                      <Icon className={`w-6 h-6 ${service.color}`} />
                    </div>
                    <CardTitle className="text-xl text-white">{service.title}</CardTitle>
                    <p className="text-emerald-400 font-semibold text-sm">{service.price}</p>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-gray-400 leading-relaxed">{service.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Laptop Repair Pricing</h2>
            <p className="text-gray-400">Transparent pricing. Free diagnosis before any repair.</p>
          </div>
          <div className="rounded-xl border border-gray-800 overflow-hidden">
            {pricing.map((row, i) => (
              <div
                key={i}
                className={`flex items-center justify-between px-6 py-4 ${
                  i % 2 === 0 ? 'bg-gray-900/50' : 'bg-gray-900/20'
                } border-b border-gray-800 last:border-b-0`}
              >
                <span className="text-gray-300">{row.service}</span>
                <span className="text-emerald-400 font-semibold">{row.price}</span>
              </div>
            ))}
          </div>
          <p className="text-gray-500 text-sm text-center mt-4">
            Prices vary by model. Call or WhatsApp for an exact quote.
          </p>
        </div>
      </section>

      {/* Brands */}
      <section className="py-20 px-6 bg-gray-900/40">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Brands We Repair</h2>
            <p className="text-gray-400">All major laptop brands serviced</p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {brands.map((brand, i) => (
              <Badge
                key={i}
                variant="secondary"
                className="bg-gray-800 text-gray-300 border-gray-700 px-4 py-2 hover:border-emerald-500/40"
              >
                {brand}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose KCROC?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trustItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <Card key={i} className="bg-gray-900/50 border-gray-800">
                  <CardContent className="pt-6 flex items-center gap-4">
                    <div className="bg-emerald-500/10 p-3 rounded-lg flex-shrink-0">
                      <Icon className="w-6 h-6 text-emerald-400" />
                    </div>
                    <p className="text-gray-300 font-medium">{item.text}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-gray-900/40">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-400">Laptop repair in Kuwait — common questions answered</p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-6 border-t border-gray-800">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Ready to fix your laptop?</h2>
          <p className="text-gray-400 mb-8">
            Kuwait Computer Repair On Call — Hawalli, Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19.
            Free pickup across all Kuwait.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-lg px-8 py-6" asChild>
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

      {/* Footer Nav */}
      <section className="py-8 px-6 bg-gray-900/30 border-t border-gray-800">
        <div className="flex flex-wrap gap-4 justify-center">
          <Button variant="outline" className="border-gray-700 text-gray-300" asChild>
            <Link to="/">← Back to Home</Link>
          </Button>
          <Button variant="outline" className="border-gray-700 text-gray-300" asChild>
            <Link to="/services">All Services</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
