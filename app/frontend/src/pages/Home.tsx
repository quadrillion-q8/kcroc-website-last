import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Cpu, Gamepad2, Laptop, Monitor, ShieldAlert, Star, 
  MessageCircle, Phone, ChevronDown, CheckCircle 
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

// ─── Components ─────────────────────────────────────────────────────────────

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { 
        setVisible(true); 
        observer.disconnect(); 
      }
    }, { threshold: 0.1 });
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  
  return (
    <div 
      ref={ref} 
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} 
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const FAQItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  const id = q.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  return (
    <div className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-900/20">
      <button 
        onClick={() => setOpen(!open)} 
        aria-expanded={open} 
        aria-controls={`${id}-panel`}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-800/50 transition-colors"
      >
        <span className="font-semibold text-white pr-4">{q}</span>
        <ChevronDown size={20} className={`text-cyan-400 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <div 
        id={`${id}-panel`}
        hidden={!open} 
        className="px-6 text-slate-400 text-sm leading-relaxed border-t border-slate-800/50"
      >
        <div className="py-4">{a}</div>
      </div>
    </div>
  );
};

// ─── Main Page ──────────────────────────────────────────────────────────────

export default function Home() {
  const waLink = `https://wa.me/${BUSINESS_PHONE.replace('+', '')}?text=Hi! I need help with my computer. Can you arrange a free pickup?`;

  return (
    <div className="w-full bg-slate-950 min-h-screen">
      <Helmet>
        <title>KCROC | Kuwait Computer Repair On Call</title>
        <meta name="description" content="Professional laptop, MacBook, and motherboard repair services in Hawalli, Kuwait. Free pickup and delivery across Kuwait. No Fix, No Charge." />
        <link rel="canonical" href={CANONICAL_URL} />
      </Helmet>

      <section className="pt-32 pb-12 px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-black text-white mb-6">Expert Computer Repair in Kuwait</h1>
        <p className="mt-6 text-xl text-slate-400 max-w-2xl mx-auto mb-10">Professional hardware assessment and component-level repairs with Free Pickup & Delivery.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href={waLink} className="bg-emerald-600 px-8 py-4 rounded-full font-bold text-lg text-white">Book Free Pickup</a>
          <a href={`tel:${BUSINESS_PHONE}`} className="bg-slate-800 px-8 py-4 rounded-full font-bold text-lg text-white border border-slate-700">Get Free Diagnostic</a>
        </div>
      </section>

      <section className="py-20 max-w-7xl mx-auto px-6 border-t border-slate-800">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <Link key={s.path} to={s.path} className="block bg-slate-900/40 p-8 rounded-3xl border border-slate-800 hover:border-cyan-500/30 transition-all">
              <s.icon className="w-8 h-8 text-cyan-400 mb-6" />
              <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
              <p className="text-slate-400 text-sm">{s.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-20 max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((faq) => <FAQItem key={faq.q} q={faq.q} a={faq.a} />)}
        </div>
      </section>
    </div>
  );
}
