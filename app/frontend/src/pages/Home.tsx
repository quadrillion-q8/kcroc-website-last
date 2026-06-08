import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Cpu, Gamepad2, Laptop, Monitor, Database, ShieldAlert, Star,
  MessageCircle, Phone, ArrowRight, BadgeCheck, Zap, RefreshCcw,
  Truck, Wrench, ChevronDown, MapPin, CheckCircle2
} from 'lucide-react';

// ─── Static Data (Kept outside component) ──────────────────────────────────

const services = [
  { title: 'Chip-Level Motherboard Repair', description: 'Advanced logic board diagnostics, micro-soldering, and professional BIOS flashing.', icon: Cpu, path: '/motherboard-repair-kuwait' },
  { title: 'Gaming PC & Workstation Tuning', description: 'GPU troubleshooting, liquid cooling loop maintenance, and high-performance optimization.', icon: Gamepad2, path: '/gaming-pc-repair-kuwait' },
  { title: 'MacBook Professional Repair', description: 'Expert logic board repair, hardware diagnostics, and component replacement for all models.', icon: Laptop, path: '/macbook-repair-kuwait' },
  { title: 'Screen Replacement', description: 'High-quality replacement displays for premium laptops, MacBooks, and monitors.', icon: Monitor, path: '/screen-replacement-kuwait' },
  { title: 'Data Recovery', description: 'Secure retrieval of critical files from failing SSDs, HDDs, and corrupted media.', icon: Database, path: '/data-recovery-kuwait' },
  { title: 'Virus & OS Cleanup', description: 'Complete system cleanups, malware elimination, and clean OS deployments.', icon: ShieldAlert, path: '/virus-removal-kuwait' },
];

const trustPoints = [
  { icon: BadgeCheck, title: 'No Fix, No Fee', description: 'Pay only if we successfully repair your device.' },
  { icon: Zap, title: 'Same-Day Service', description: 'Most repairs completed the same day.' },
  { icon: RefreshCcw, title: '30-Day Warranty', description: 'Backed by a 30-day parts and labour warranty.' },
  { icon: Truck, title: 'Free Pickup & Delivery', description: 'Across all Kuwait governorates.' },
];

const faqs = [
  { q: "Do you offer free pickup anywhere in Kuwait?", a: "Yes. We offer free pickup and delivery across all governorates including Hawalli, Capital, Farwaniya, Ahmadi, Jahra, and Mubarak Al-Kabeer." },
  { q: "What happens if you can't fix my device?", a: "Our No Fix, No Fee guarantee means you pay nothing if we cannot repair your device." },
  { q: "How long does a typical repair take?", a: "Most screen replacements and SSD upgrades are same-day. Complex motherboard repairs take 1-3 business days." }
];

const reviews = [
  { name: 'Dr. Ghanim Al-Khaledi', text: 'They fixed my Predator Helios motherboard... competent, reliable, and HONEST.', rating: 5 },
  { name: 'Mohammed Sabil', text: 'I had given my laptop for a motherboard replacement. They managed to find a compatible motherboard and replace it successfully.', rating: 5 },
  { name: 'Ayman Elnagar', text: 'The best IT support and laptop repair shop I’ve visited in Kuwait.', rating: 5 },
];

// ─── Schema Objects ─────────────────────────────────────────────────────────

const graphSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "name": "KCROC",
      "telephone": "+96555301913",
      "url": "https://www.computerrepairkuwait.com",
      "address": { "@type": "PostalAddress", "streetAddress": "Al Mullah Complex, Ibn Khaldoun St, Basement Shop 19", "addressLocality": "Hawalli", "addressCountry": "KW" },
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "150" }
    },
    {
      "@type": "RepairService",
      "name": "Computer Repair Services",
      "areaServed": "Kuwait"
    },
    {
      "@type": "FAQPage",
      "mainEntity": faqs.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": { "@type": "Answer", "text": f.a } }))
    }
  ]
};

// ─── Sub-Components ─────────────────────────────────────────────────────────

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className={`transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
};

// ─── Page Component ─────────────────────────────────────────────────────────

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white font-sans">
      <a href="#main" className="sr-only focus:not-sr-only fixed top-4 left-4 z-50 bg-emerald-600 px-4 py-2">Skip to content</a>
      
      <Helmet>
        <title>Computer & Laptop Repair in Kuwait | MacBook, Motherboard & Data Recovery | KCROC</title>
        <meta name="description" content="Professional computer and laptop repair in Kuwait. MacBook repair, motherboard repair, gaming PC repair, data recovery, virus removal, free pickup and delivery, and no-fix-no-fee service." />
        <link rel="canonical" href="https://www.computerrepairkuwait.com" />
        <meta property="og:title" content="Expert Computer & Laptop Repair in Kuwait | KCROC" />
        <meta property="og:description" content="Professional computer and laptop repair in Kuwait. MacBook, Motherboard, Data Recovery & more." />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(graphSchema)}</script>
      </Helmet>

      {/* Hero Section */}
      <section id="main" className="pt-32 pb-20 px-6 text-center" aria-label="Hero Section">
        <FadeIn>
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full text-emerald-400 text-sm mb-6">
            <Star size={14} className="fill-emerald-400" />
            <span>Rated 4.9/5 by 150+ Kuwait Customers</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black max-w-4xl mx-auto tracking-tight mb-6">
            Expert Computer & Laptop Repair in <span className="text-emerald-500">Kuwait</span>
          </h1>
          <p className="mt-6 text-xl text-gray-400 max-w-2xl mx-auto">
            Professional diagnostics, <Link to="/motherboard-repair-kuwait" className="text-emerald-400 hover:underline">motherboard repair</Link>, <Link to="/macbook-repair-kuwait" className="text-emerald-400 hover:underline">MacBook repair</Link>, and <Link to="/data-recovery-kuwait" className="text-emerald-400 hover:underline">data recovery</Link> with free pickup.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
            <a href="https://wa.me/96555301913" aria-label="Contact KCROC via WhatsApp" className="flex items-center justify-center gap-2 bg-green-500 px-8 py-4 rounded-full font-bold text-lg hover:bg-green-600 transition-all">
              <MessageCircle className="h-5 w-5" /> WhatsApp Us
            </a>
            <a href="tel:+96555301913" aria-label="Call KCROC" className="flex items-center justify-center gap-2 bg-gray-800 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-700 transition-all border border-gray-700">
              <Phone className="h-5 w-5" /> Call Now
            </a>
          </div>
        </FadeIn>
      </section>

      {/* Services Section */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">Professional Hardware Solutions</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <FadeIn key={i} delay={i * 50}>
              <Link to={s.path} className="block bg-gray-900/30 p-8 rounded-3xl border border-gray-800 hover:border-emerald-500/50 transition-all group h-full">
                <s.icon className="w-10 h-10 mb-6 text-emerald-400" />
                <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{s.description}</p>
                <div className="text-emerald-500 text-sm font-bold flex items-center gap-1">
                  Learn more <ArrowRight size={14} />
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-900/30 border-y border-gray-800 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6">Trusted Computer Repair Specialists Across Kuwait</h2>
          <p className="text-gray-400 leading-relaxed mb-10">
            Whether you are in Hawalli, Salmiya, or Kuwait City, our expert technicians provide unmatched service. 
            We support users in Jabriya, Farwaniya, Mahboula, Fahaheel, Shuwaikh, Ahmadi, and Mubarak Al Kabeer 
            with dedicated <Link to="/motherboard-repair-kuwait" className="text-emerald-400 hover:underline">motherboard repair</Link>, 
            <Link to="/macbook-repair-kuwait" className="text-emerald-400 hover:underline">MacBook repair</Link>, 
            <Link to="/gaming-pc-repair-kuwait" className="text-emerald-400 hover:underline">gaming PC repair</Link>, 
            and <Link to="/data-recovery-kuwait" className="text-emerald-400 hover:underline">data recovery</Link> services. 
            We provide fast, reliable <Link to="/virus-removal-kuwait" className="text-emerald-400 hover:underline">virus removal</Link> and expert diagnostic solutions.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustPoints.map((t, i) => (
              <div key={i} className="bg-gray-950 p-6 rounded-2xl border border-gray-800">
                <t.icon className="w-8 h-8 text-emerald-400 mb-4 mx-auto" />
                <h4 className="font-bold mb-2">{t.title}</h4>
                <p className="text-xs text-gray-500">{t.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">What Our Customers Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <div key={i} className="bg-gray-900/40 p-8 rounded-3xl border border-gray-800">
              <div className="flex text-yellow-500 mb-6 gap-1">
                {[...Array(r.rating)].map((_, j) => <Star key={j} className="w-5 h-5 fill-current" />)}
              </div>
              <p className="text-gray-300 italic mb-8">"{r.text}"</p>
              <p className="font-bold text-emerald-400">- {r.name}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
           <a href="https://g.page/r/CWbK8KGjkYY2EAE/review" target="_blank" rel="noopener noreferrer" className="text-emerald-400 font-bold hover:underline">Read More Google Reviews</a>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 max-w-3xl mx-auto px-6" aria-labelledby="faq-title">
        <h2 id="faq-title" className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="border border-gray-800 rounded-2xl p-6" role="region" aria-labelledby={`faq-summary-${i}`}>
              <summary id={`faq-summary-${i}`} className="font-bold cursor-pointer list-none flex justify-between items-center">
                {faq.q} <ChevronDown className="text-emerald-400" />
              </summary>
              <p className="mt-4 text-gray-400 text-sm leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* NAP & Final CTA */}
      <footer className="border-t border-gray-800 py-16 text-center px-6">
        <h2 className="text-3xl font-bold mb-8">Ready to Fix Your Device?</h2>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <a href="https://wa.me/96555301913" aria-label="Contact KCROC via WhatsApp" className="bg-green-500 px-8 py-4 rounded-full font-bold hover:bg-green-600 transition-all">WhatsApp Us</a>
            <a href="tel:+96555301913" aria-label="Call KCROC" className="bg-gray-800 px-8 py-4 rounded-full font-bold hover:bg-gray-700 border border-gray-700 transition-all">Call Now</a>
        </div>
        <div className="text-gray-500 space-y-1">
          <p className="font-bold text-white">KCROC</p>
          <p>Al Mullah Complex, Ibn Khaldoun Street, Basement Shop 19, Hawalli, Kuwait</p>
          <p>Phone: +965 55301913</p>
        </div>
      </footer>
    </main>
  );
}
