import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Cpu, Gamepad2, Laptop, Monitor, Database, ShieldAlert, Star, 
  MessageCircle, Phone, ArrowRight, BadgeCheck, Zap, RefreshCcw, 
  Truck, ChevronDown, MapPin 
} from 'lucide-react';

// ─── Static Data ────────────────────────────────────────────────────────────

const services = [
  { title: 'Chip-Level Motherboard Repair', description: 'Advanced logic board diagnostics, micro-soldering, and professional BIOS flashing.', icon: Cpu, path: '/chip-level-motherboard-repair-hawalli' },
  { title: 'Gaming PC & Tuning', description: 'GPU troubleshooting, liquid cooling loop maintenance, and high-performance optimization.', icon: Gamepad2, path: '/gaming-pc-repair-kuwait' },
  { title: 'MacBook Professional Repair', description: 'Expert logic board repair, hardware diagnostics, and component replacement for all models.', icon: Laptop, path: '/macbook-repair' },
  { title: 'Screen Replacement', description: 'High-quality replacement displays for premium laptops, MacBooks, and monitors.', icon: Monitor, path: '/screen-replacement' },
  { title: 'Data Recovery & Security', description: 'Secure retrieval of critical files from failing SSDs, HDDs, and corrupted media.', icon: Database, path: '/data-security' },
  { title: 'All Repair Services', description: 'Complete system cleanups, battery replacements, virus removal, and OS deployments.', icon: ShieldAlert, path: '/services' },
];

const trustPoints = [
  { icon: BadgeCheck, title: 'No Fix, No Fee', description: 'Pay only if we successfully repair your device.' },
  { icon: Zap, title: 'Same-Day Service', description: 'Most repairs completed the same day.' },
  { icon: RefreshCcw, title: '30-Day Warranty', description: 'Backed by a 30-day parts and labour warranty.' },
  { icon: Truck, title: 'Free Pickup', description: 'Across all Kuwait governorates.' },
];

const faqs = [
  { q: "Do you offer free pickup anywhere in Kuwait?", a: "Yes. We offer free pickup and delivery across all governorates including Kuwait City, Hawalli, Salmiya, Farwaniya, and Jahra. There are no hidden charges for collection or return." },
  { q: "What happens if you can't fix my device?", a: "Our No Fix, No Fee guarantee means you pay nothing if we cannot repair your device." },
  { q: "How long does a typical repair take?", a: "Most screen replacements and SSD upgrades are same-day. Complex motherboard repairs take 1-3 business days." }
];

const reviews = [
  { name: 'Dr. Ghanim Al-Khaledi', text: 'They fixed my Predator Helios motherboard... competent, reliable, and HONEST.', rating: 5 },
  { name: 'Mohammed Sabil', text: 'I had given my laptop for a motherboard replacement. They managed to find a compatible motherboard and replace it successfully.', rating: 5 },
  { name: 'Ayman Elnagar', text: 'The best IT support and laptop repair shop I’ve visited in Kuwait.', rating: 5 },
];

const targetAreas = [
  { name: 'Hawalli', text: 'Computer Repair Hawalli' },
  { name: 'Salmiya', text: 'Laptop Repair Salmiya' },
  { name: 'Kuwait City', text: 'PC Repair Kuwait City' },
  { name: 'Farwaniya', text: 'Device Service Farwaniya' },
  { name: 'Fahaheel', text: 'Mac Repair Fahaheel' },
  { name: 'Mahboula', text: 'Laptop Service Mahboula' },
  { name: 'Jabriya', text: 'Screen Replacement Jabriya' },
  { name: 'Ahmadi', text: 'Computer Maintenance Ahmadi' }
];

const graphSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.computerrepairkuwait.com/#webpage",
      "name": "Expert Computer & Laptop Repair in Kuwait | KCROC",
      "url": "https://www.computerrepairkuwait.com",
      "description": "Professional computer and laptop repair in Kuwait. MacBook repair, motherboard repair, and data recovery with free pickup.",
      "mainEntity": { "@id": "https://www.computerrepairkuwait.com/#business" }
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://www.computerrepairkuwait.com/#business",
      "name": "Kuwait Computer Repair On Call (KCROC)",
      "telephone": "+96555301913",
      "url": "https://www.computerrepairkuwait.com",
      "address": { 
        "@type": "PostalAddress", 
        "streetAddress": "Al Mullah Complex, Ibn Khaldoun Street, Basement Shop 19", 
        "addressLocality": "Hawalli", 
        "addressCountry": "KW" 
      },
      "aggregateRating": { 
        "@type": "AggregateRating", 
        "ratingValue": "4.9", 
        "reviewCount": "150" 
      }
    }
  ]
};

// ─── Components ─────────────────────────────────────────────────────────────

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
  return <div ref={ref} className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
};

const FAQItem = ({ q, a, index }: { q: string; a: string; index: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-900/20">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-800/50 transition-colors">
        <span className="font-semibold text-white pr-4">{q}</span>
        <ChevronDown size={20} className={`text-cyan-400 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`px-6 text-slate-400 text-sm leading-relaxed border-t border-slate-800/50 transition-all duration-200 ${open ? 'max-h-96 pb-6 pt-4 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
        {a}
      </div>
    </div>
  );
};

// ─── Main Page ──────────────────────────────────────────────────────────────

export default function Home() {
  const finalCtaWaLink = `https://wa.me/96555301913?text=${encodeURIComponent("Hi! I need help with my computer. Can you arrange a pickup?")}`;

  return (
    <div className="w-full bg-slate-950">
      <Helmet>
        <title>Computer & Laptop Repair in Kuwait | MacBook, Motherboard & Data Recovery | KCROC</title>
        <meta name="description" content="Professional computer and laptop repair in Kuwait. MacBook repair, motherboard repair, gaming PC repair, data recovery, and no-fix-no-fee service with free pickup." />
        <link rel="canonical" href="https://www.computerrepairkuwait.com" />
        <script type="application/ld+json">{JSON.stringify(graphSchema)}</script>
      </Helmet>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 text-center">
        <FadeIn>
          <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-1.5 rounded-full text-slate-300 text-sm font-medium mb-8">
            <Star size={14} className="text-yellow-400 fill-current" />
            <span>Rated 4.9/5 by 150+ Kuwait Customers</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black max-w-4xl mx-auto tracking-tight mb-6 text-white">
            Expert Computer & Laptop Repair in <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Kuwait</span>
          </h1>
          <p className="mt-6 text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Professional hardware assessment, motherboard micro-soldering, MacBook logic board repair, and secure data recovery with free home pickup.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
            <a href={finalCtaWaLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-emerald-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-500 transition-all text-white shadow-lg shadow-emerald-900/20">
              <MessageCircle className="h-5 w-5" /> WhatsApp Us
            </a>
            <a href="tel:+96555301913" className="flex items-center justify-center gap-2 bg-slate-800 px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-700 transition-all border border-slate-700 text-white">
              <Phone className="h-5 w-5" /> Call Now
            </a>
          </div>
        </FadeIn>
      </section>

      {/* Services Section */}
      <section className="py-20 max-w-7xl mx-auto px-6 border-t border-slate-800">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Professional Hardware Solutions</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">We specialize in advanced repairs that other shops reject. From liquid damage to complete logic board rebuilds.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <FadeIn key={i} delay={i * 50}>
              <Link to={s.path} className="block bg-slate-900/40 p-8 rounded-3xl border border-slate-800 hover:border-cyan-500/30 hover:bg-slate-800/50 transition-all group h-full">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center mb-6 group-hover:bg-cyan-500/10 transition-colors">
                  <s.icon className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">{s.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">{s.description}</p>
                <div className="text-cyan-400 text-sm font-bold flex items-center gap-2 mt-auto">
                  Learn more <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Trust Strip */}
      <section className="py-12 bg-slate-900/30 border-y border-slate-800">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {trustPoints.map((t, i) => (
            <div key={i} className="flex flex-col items-center justify-center p-4">
              <t.icon className="w-8 h-8 text-emerald-400 mb-3" />
              <h4 className="font-bold text-white text-sm mb-1">{t.title}</h4>
              <p className="text-xs text-slate-500 hidden sm:block">{t.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-24 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16">What Our Customers Say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div key={i} className="bg-slate-900/40 p-8 rounded-3xl border border-slate-800 flex flex-col">
              <div className="flex gap-1 mb-6">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed mb-8 flex-grow">"{r.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-cyan-400 font-bold">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-white text-sm">{r.name}</p>
                  <p className="text-xs text-slate-500">Verified Customer</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 max-w-3xl mx-auto px-6 border-t border-slate-800">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} index={i} q={faq.q} a={faq.a} />
          ))}
        </div>
      </section>

      {/* Local SEO Areas */}
      <section className="py-12 bg-slate-900/30 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-semibold text-cyan-400 uppercase tracking-widest">Free Pickup Across Kuwait</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {targetAreas.map((area) => (
              <span key={area.name} className="px-3 py-1.5 rounded-full text-xs font-medium bg-slate-900 border border-slate-800 text-slate-400">{area.name}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
