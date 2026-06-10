import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Monitor, Apple, Smartphone, Zap, Cable, MonitorPlay,
  Phone, MessageCircle, CheckCircle2, Shield, Truck, Clock,
  ChevronDown,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

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
      '@type': 'RepairService',
      '@id': 'https://www.computerrepairkuwait.com/screen-replacement#service',
      name: 'Laptop & MacBook Screen Replacement Kuwait',
      provider: { '@id': 'https://www.computerrepairkuwait.com/#business' },
      areaServed: { '@type': 'Country', name: 'Kuwait' },
      description:
        'Professional laptop and MacBook screen replacement in Kuwait. Cracked, broken, flickering, or dead-pixel screens replaced fast with free pickup and delivery.',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Screen Replacement Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Laptop LCD/LED Screen Replacement' },
            priceSpecification: { '@type': 'PriceSpecification', price: '20', priceCurrency: 'KWD', minPrice: '20' },
          },
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'MacBook Retina Display Replacement' },
            priceSpecification: { '@type': 'PriceSpecification', price: '45', priceCurrency: 'KWD', minPrice: '45' },
          },
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Touch Screen Laptop Repair' },
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
          name: 'How much does laptop screen replacement cost in Kuwait?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Laptop LCD/LED screen replacement starts from 20 KD. MacBook Retina display replacement starts from 45 KD. The exact price depends on your laptop model and screen type. Diagnosis is free.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do you offer free pickup for screen replacement in Kuwait?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. KCROC offers free pickup and delivery across all areas of Kuwait for screen replacement and all other laptop repairs.',
          },
        },
        {
          '@type': 'Question',
          name: 'How long does laptop screen replacement take?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Most screen replacements are completed same day or next day. If you drop off or arrange pickup before 11 AM, same-day service is available for eligible repairs.',
          },
        },
        {
          '@type': 'Question',
          name: 'What warranty do you provide on screen replacements?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'All screen replacements come with a 30-day warranty covering parts and workmanship.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which laptop brands do you replace screens for?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We replace screens for HP, Dell, Lenovo, ASUS, Acer, MSI, MacBook Air, MacBook Pro, Samsung, Toshiba, Huawei, LG, and most other laptop brands.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can you fix a laptop screen that has lines or is flickering?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Horizontal or vertical lines, screen flickering, backlight failure, and dim screens are all diagnosed and repaired. In some cases a display cable replacement resolves the issue without needing a full screen swap.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do you use genuine screens for MacBook repairs?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We use genuine Apple panels where available, and high-grade compatible Retina displays for MacBook Air and MacBook Pro screen replacements.',
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
    title: 'Laptop LCD/LED Screen',
    desc: 'Cracked, broken, or dead-pixel screens replaced for all laptop brands. Starting 20 KD.',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
  },
  {
    icon: Apple,
    title: 'MacBook Retina Display',
    desc: 'MacBook Air and Pro Retina display replacement with genuine panels. Starting 45 KD.',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
  },
  {
    icon: Smartphone,
    title: 'Touch Screen Repair',
    desc: 'Touch-enabled laptop screens repaired or replaced. Digitizer and panel replacement available.',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
  },
  {
    icon: Zap,
    title: 'Flickering & Lines Fix',
    desc: 'Screen flickering, horizontal/vertical lines, or backlight issues diagnosed and fixed.',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
  },
  {
    icon: Cable,
    title: 'Display Cable Repair',
    desc: 'Loose or damaged display cables causing intermittent screen issues. Quick cable replacement.',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
  },
  {
    icon: MonitorPlay,
    title: 'External Monitor Setup',
    desc: 'Temporary external display setup while your screen is being repaired. Free with any screen service.',
    color: 'text-pink-400',
    bgColor: 'bg-pink-500/10',
  },
];

const brands = [
  'HP', 'Dell', 'Lenovo', 'ASUS', 'Acer', 'MSI',
  'MacBook Air', 'MacBook Pro', 'Samsung', 'Toshiba', 'Huawei', 'LG',
];

const areas = [
  { label: 'Hawalli', tip: 'Laptop screen replacement – Hawalli' },
  { label: 'Salmiya', tip: 'Broken screen repair – Salmiya' },
  { label: 'Kuwait City', tip: 'MacBook screen fix – Kuwait City' },
  { label: 'Farwaniya', tip: 'Screen replacement – Farwaniya' },
  { label: 'Mahboula', tip: 'Laptop screen repair – Mahboula' },
  { label: 'Jahra', tip: 'Screen replacement – Jahra' },
  { label: 'Rumaithiya', tip: 'Screen repair – Rumaithiya' },
  { label: 'Fahaheel', tip: 'Screen replacement – Fahaheel' },
];

const pricing = [
  { service: 'Laptop LCD/LED Screen', price: 'From 20 KD' },
  { service: 'MacBook Retina Display', price: 'From 45 KD' },
  { service: 'Touch Screen Replacement', price: 'Call for quote' },
  { service: 'Display Cable Replacement', price: 'Call for quote' },
  { service: 'Diagnosis', price: 'Free' },
];

const whyChooseUs = [
  { icon: Truck, text: 'Free Pickup & Delivery across all Kuwait' },
  { icon: CheckCircle2, text: 'Genuine & high-grade compatible screens' },
  { icon: Shield, text: '30-Day Warranty on all screen replacements' },
  { icon: Zap, text: 'Same/Next-Day service available' },
  { icon: Clock, text: 'Expert screen calibration included' },
  { icon: Phone, text: 'Free diagnosis before any repair' },
];

const faqs = [
  {
    q: 'How much does laptop screen replacement cost in Kuwait?',
    a: 'Laptop LCD/LED screens start from 20 KD. MacBook Retina displays start from 45 KD. Exact price depends on your model and screen type — diagnosis is always free.',
  },
  {
    q: 'Do you offer free pickup for screen replacement?',
    a: 'Yes. We provide free pickup and delivery across all areas of Kuwait for screen replacement and all other repairs.',
  },
  {
    q: 'How long does screen replacement take?',
    a: 'Most replacements are completed same day or next day. Drop off or arrange pickup before 11 AM for same-day service on eligible repairs.',
  },
  {
    q: 'What warranty is included?',
    a: 'All screen replacements come with a 30-day warranty covering parts and workmanship.',
  },
  {
    q: 'Which brands do you service?',
    a: 'HP, Dell, Lenovo, ASUS, Acer, MSI, MacBook Air, MacBook Pro, Samsung, Toshiba, Huawei, LG, and most other brands.',
  },
  {
    q: 'Can you fix lines or flickering without replacing the full screen?',
    a: 'Yes. In many cases, a display cable replacement resolves flickering or line issues without a full screen swap. We diagnose first.',
  },
  {
    q: 'Do you use genuine screens for MacBook repairs?',
    a: 'We use genuine Apple panels where available, and high-grade compatible Retina displays for MacBook Air and Pro replacements.',
  },
];

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
          className={`w-5 h-5 text-emerald-400 flex-shrink-0 ml-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
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
export default function ScreenReplacement() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <Helmet>
        <title>Screen Replacement Kuwait | Laptop & MacBook Screen Fix – KCROC</title>
        <meta
          name="description"
          content="Professional laptop and MacBook screen replacement in Kuwait. Cracked, broken, or flickering screens fixed fast with free pickup. Starting 20 KD. تبديل شاشة لاب توب الكويت."
        />
        <link rel="canonical" href="https://www.computerrepairkuwait.com/screen-replacement" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Screen Replacement Kuwait | Laptop & MacBook Screen Fix – KCROC" />
        <meta
          property="og:description"
          content="Cracked or broken laptop screen? KCROC replaces all brands in Kuwait with free pickup, same-day service, and a 30-day warranty."
        />
        <meta property="og:url" content="https://www.computerrepairkuwait.com/screen-replacement" />
        <meta property="og:image" content="https://www.computerrepairkuwait.com/og-screen-replacement.jpg" />
        <meta property="og:site_name" content="Kuwait Computer Repair On Call" />

        {/* Schema */}
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 text-center">
        <Badge className="mb-6 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-4 py-2">
          🖥️ Screen Replacement Experts
        </Badge>
        <h1 className="text-4xl md:text-6xl font-black mb-6">
          Screen Replacement Kuwait
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-4">
          تبديل شاشة لاب توب في الكويت – All laptop and MacBook screens replaced with free pickup.
        </p>
        <p className="text-gray-400 max-w-xl mx-auto mb-10">
          HP, Dell, Lenovo, ASUS, Acer, MacBook Air, MacBook Pro & more. Starting 20 KD.
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
            <a
              href="https://wa.me/96555301913?text=Hi%2C+I+need+laptop+screen+replacement.+Please+arrange+free+pickup."
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="mr-2" /> WhatsApp Now
            </a>
          </Button>
        </div>
      </section>

      {/* Service Area Pills */}
      <section className="pb-12 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-gray-500 text-sm mb-4 uppercase tracking-wider">Serving all Kuwait areas</p>
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

      {/* Services */}
      <section className="py-20 px-6 bg-gray-900/40">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Screen Replacement Services</h2>
            <p className="text-xl text-gray-400">تبديل شاشة – Fast, professional screen replacement for all brands</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="bg-gray-900/50 border-gray-800 hover:border-emerald-500/40 transition-all">
                  <CardHeader>
                    <div className={`${service.bgColor} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                      <Icon className={`w-6 h-6 ${service.color}`} />
                    </div>
                    <CardTitle className="text-xl text-white">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Screen Replacement Pricing</h2>
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

      {/* Brands & Why Choose Us */}
      <section className="py-20 px-6 bg-gray-900/40">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Screens We Replace</h2>
            <p className="text-gray-400">All major brands and screen types</p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center mb-20">
            {brands.map((brand, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-gray-800 text-gray-300 border-gray-700 px-4 py-2 hover:border-emerald-500/40"
              >
                {brand}
              </Badge>
            ))}
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose KCROC?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card key={index} className="bg-gray-900/50 border-gray-800">
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
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-400">Screen replacement in Kuwait — common questions answered</p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-6 bg-gray-900/40 border-t border-gray-800">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Ready to fix your screen?</h2>
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
              <a
                href="https://wa.me/96555301913?text=Hi%2C+I+need+laptop+screen+replacement.+Please+arrange+free+pickup."
                target="_blank"
                rel="noopener noreferrer"
              >
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
