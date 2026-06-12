import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Cpu, Gamepad2, Laptop, Monitor, ShieldAlert, 
  ChevronDown 
} from 'lucide-react';

// ─── Constants & Data ────────────────────────────────────────────────────────

const BUSINESS_NAME = "Kuwait Computer Repair On Call (KCROC)";
const BUSINESS_PHONE = "+96555301913";
const CANONICAL_URL = "https://www.computerrepairkuwait.com";

const services = [
  { title: 'Motherboard Repair Kuwait', description: 'Advanced logic board diagnostics, micro-soldering, and professional BIOS flashing.', icon: Cpu, path: '/motherboard-repair-kuwait' },
  { title: 'Gaming PC Repair Kuwait', description: 'GPU troubleshooting, liquid cooling maintenance, and performance tuning.', icon: Gamepad2, path: '/gaming-pc-repair-kuwait' },
  { title: 'MacBook Repair Kuwait', description: 'Expert Apple logic board repair and genuine component replacement.', icon: Laptop, path: '/macbook-repair-kuwait' },
  { title: 'Laptop Screen Repair Kuwait', description: 'High-quality replacement displays for premium laptops and MacBooks.', icon: Monitor, path: '/laptop-screen-repair-kuwait' },
  { title: 'Hawalli Computer Repair', description: 'Complete system cleanups, battery replacements, virus removal, and OS deployments.', icon: ShieldAlert, path: '/services' },
];

const faqs = [
  { q: "Do you repair MacBooks?", a: "Yes, we specialize in Apple MacBook repair including logic board micro-soldering, screen replacements, and battery service." },
  { q: "Do you offer same-day repair?", a: "Yes, common repairs like screen replacements and SSD upgrades are often completed the same day." },
  { q: "Do you repair gaming PCs?", a: "Absolutely. We handle custom gaming PC troubleshooting, cooling loops, GPU repairs, and performance tuning." },
  { q: "Do you offer warranty?", a: "Yes, all our repairs are backed by a 30-day parts and labour warranty." },
  { q: "How much does motherboard repair cost?", a: "Motherboard repair pricing is diagnostic-first. We assess the damage and provide a quote before proceeding." },
  { q: "Do you provide free pickup and delivery?", a: "Yes, we offer free pickup and delivery across all Kuwait governorates." },
  { q: "What happens if my device cannot be repaired?", a: "Our No Fix, No Fee policy ensures you pay nothing if we cannot successfully repair your device." }
];

const schemaData = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", "name": BUSINESS_NAME, "url": CANONICAL_URL, "telephone": BUSINESS_PHONE },
    {
      "@type": "LocalBusiness",
      "@id": `${CANONICAL_URL}/#business`,
      "name": BUSINESS_NAME,
      "telephone": BUSINESS_PHONE,
      "url": CANONICAL_URL,
      "address": { "@type": "PostalAddress", "streetAddress": "Al Mullah Complex, Ibn Khaldoun Street, Shop 19", "addressLocality": "Hawalli", "addressRegion": "Hawalli", "addressCountry": "KW" }
    },
    { "@type": "Service", "name": "Motherboard Repair", "provider": { "@id": `${CANONICAL_URL}/#business` } },
    { "@type": "Service", "name": "MacBook Repair", "provider": { "@id": `${CANONICAL_URL}/#business` } },
    { "@type": "Service", "name": "Laptop Screen Repair", "provider": { "@id": `${CANONICAL_URL}/#business` } }
  ]
};

// ─── Components ─────────────────────────────────────────────────────────────

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') { setVisible(true); return; }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`transition-all duration-700 w-full ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
};

const FAQItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  const id = q.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  return (
    <div className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-900/20">
      <button onClick={() => setOpen(!open)} aria-expanded={open} aria-controls={`${id}-panel`} className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-800/50 transition-colors">
        <span className="font-semibold text-white pr-4">{q}</span>
        <ChevronDown size={20} className={`text-cyan-400 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <div id={`${id}-panel`} hidden={!open} className="px-6 text-slate-400 text-sm leading-relaxed border-t border-slate-800/50">
        <div className="py-4">{a}</div>
      </div>
    </div>
  );
};

// ─── Main Page ──────────────────────────────────────────────────────────────

export default function Home() {
  const waLink = `https://wa.me/${BUSINESS_PHONE.replace('+', '')}?text=Hi! I need help with my computer. Can you arrange a free pickup?`;

  return (
    <div className="w-full bg-slate-950 flex flex-col items-center overflow-x-hidden">
      <Helmet>
        <title>KCROC | Kuwait Computer Repair On Call</title>
        <meta name="description" content="Professional laptop, MacBook, and motherboard repair services in Hawalli, Kuwait. Free pickup and delivery across Kuwait." />
        <link rel="canonical" href={CANONICAL_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="KCROC | Kuwait Computer Repair On Call" />
        <meta property="og:description" content="Professional laptop, MacBook, and motherboard repair services in Hawalli, Kuwait. Free pickup and delivery across Kuwait." />
        <meta property="og:url" content={CANONICAL_URL} />
        <meta property="og:image" content={`${CANONICAL_URL}/og-image.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>

      {/* Hero Section */}
      <section className="w-full pt-32 pb-12 flex justify-center px-6">
        <div className="w-full max-w-4xl text-center">
          <FadeIn>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6">Expert Computer Repair in <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Kuwait</span></h1>
            <p className="mt-6 text-xl text-slate-400 mb-10">Professional hardware assessment and component-level repairs with Free Pickup & Delivery.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
              <a href={waLink} className="bg-emerald-600 px-8 py-4 rounded-full font-bold text-lg text-white hover:bg-emerald-500 transition-colors">Book Free Pickup</a>
              <a href={`tel:${BUSINESS_PHONE}`} className="bg-slate-800 px-8 py-4 rounded-full font-bold text-lg text-white border border-slate-700 hover:bg-slate-700 transition-colors">Get Free Diagnostic</a>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-300">
              {['✓ Free Pickup & Delivery', '✓ No Fix, No Fee', '✓ Same-Day Repairs', '✓ Apple & Windows Specialists'].map(t => <span key={t}>{t}</span>)}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Entity Reinforcement */}
      <section className="w-full py-8 flex justify-center px-6 text-center text-slate-400">
        <div className="w-full max-w-4xl">
          <h2 className="text-lg font-semibold mb-2">Professional Computer Repair Services Across Kuwait</h2>
          <p>Looking for specialised repairs? Explore our 
            <Link to="/motherboard-repair-kuwait" className="text-cyan-400 hover:underline mx-1">Motherboard Repair</Link>, 
            <Link to="/macbook-repair-kuwait" className="text-cyan-400 hover:underline mx-1">MacBook Repair</Link>, and 
            <Link to="/laptop-screen-repair-kuwait" className="text-cyan-400 hover:underline mx-1">Laptop Screen Repair</Link> services.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="w-full py-20 flex justify-center px-6 border-t border-slate-800">
        <div className="w-full max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <FadeIn key={s.path}>
                <Link to={s.path} className="block bg-slate-900/40 p-8 rounded-3xl border border-slate-800 hover:border-cyan-500/30 transition-all h-full">
                  <s.icon className="w-8 h-8 text-cyan-400 mb-6" />
                  <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
                  <p className="text-slate-400 text-sm">{s.description}</p>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Areas Section */}
      <section className="w-full py-12 bg-slate-900/30 border-y border-slate-800 flex justify-center px-6 text-center">
        <div className="w-full max-w-4xl">
          <h2 className="text-2xl font-bold text-white mb-6">Serving Customers Across Kuwait</h2>
          <p className="text-slate-400 mb-8">{BUSINESS_NAME} provides free pickup and delivery throughout Hawalli, Salmiya, Kuwait City, Farwaniya, Jahra, Ahmadi, and Mubarak Al-Kabeer.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Hawalli', 'Salmiya', 'Farwaniya', 'Kuwait City', 'Jahra', 'Ahmadi', 'Mubarak Al-Kabeer'].map(area => <span key={area} className="px-4 py-2 rounded-full bg-slate-950 border border-slate-800 text-slate-300 text-sm">{area}</span>)}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-20 flex justify-center px-6">
        <div className="w-full max-w-3xl">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq) => <FAQItem key={faq.q} q={faq.q} a={faq.a} />)}
          </div>
        </div>
      </section>
      
    </div>
  );
}
