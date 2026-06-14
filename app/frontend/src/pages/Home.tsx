import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Cpu, Gamepad2, Laptop, Monitor, ShieldAlert, 
  ChevronDown, Star, Phone, MessageCircle, ArrowRight
} from 'lucide-react';

// ─── Constants & Data ────────────────────────────────────────────────────────

const BUSINESS_NAME = "Kuwait Computer Repair On Call (KCROC)";
const BUSINESS_PHONE = "+96555301913";
const CANONICAL_URL = "https://www.computerrepairkuwait.com";
const CLOUDINARY_LOGO = "https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto/v1769908596/logo_btpfls.png";

const services = [
  { title: 'Motherboard Repair', description: 'Advanced logic board diagnostics, micro-soldering, and professional BIOS flashing.', icon: Cpu, path: '/motherboard-repair-kuwait' },
  { title: 'Gaming PC Tuning', description: 'GPU troubleshooting, liquid cooling maintenance, and performance tuning.', icon: Gamepad2, path: '/gaming-pc-repair-kuwait' },
  { title: 'MacBook Repair', description: 'Expert Apple logic board repair and genuine component replacement.', icon: Laptop, path: '/macbook-repair-kuwait' },
  { title: 'Screen Replacement', description: 'High-quality replacement displays for premium laptops and MacBooks.', icon: Monitor, path: '/laptop-screen-repair-kuwait' },
  { title: 'System Diagnostics', description: 'Complete system cleanups, battery replacements, and virus removal.', icon: ShieldAlert, path: '/services' },
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

const trustStats = [
  { value: '500+', label: 'Repairs', subtext: 'Completed in Kuwait' },
  { value: '98%', label: 'Success', subtext: 'On logic board repairs' },
  { value: '30 Days', label: 'Warranty', subtext: 'Parts and labour' },
  { value: '100%', label: 'Free Pickup', subtext: 'Zero hidden fees' },
];

const reviews = [
  { name: 'Dr. Ghanim Al-Khaledi', text: 'They fixed my Predator Helios motherboard, replaced all SSD, battery and charging cables, and the machine is roaring again. I am very happy with their services; they are competent, reliable, and HONEST.', rating: 5 },
  { name: 'Mohammed Sabil', text: 'I had given my laptop for a motherboard replacement. They managed to find a compatible motherboard and replace it successfully. They provide excellent service, are highly professional, and kept me informed.', rating: 5 },
  { name: 'Ayman Elnagar', text: 'The best IT support and laptop repair shop I\'ve visited in Kuwait. Fixed my battery charging issue the same day. Professional service and very convenient location. 5 stars!', rating: 5 },
];

// ─── Hooks & Components ──────────────────────────────────────────────────────

const useFadeIn = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });
    observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, []);

  return { ref, visible };
};

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const { ref, visible } = useFadeIn();
  return (
    <div 
      ref={ref} 
      className={`transition-all duration-700 w-full ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} 
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const FAQItem = ({ id, q, a }: { id: string; q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-slate-800/80 rounded-2xl overflow-hidden bg-slate-900/30 backdrop-blur-sm mb-3 hover:border-slate-700 transition-colors">
      <button 
        id={`${id}-button`}
        onClick={() => setOpen(!open)} 
        aria-expanded={open} 
        aria-controls={`${id}-panel`} 
        className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
      >
        <span className="font-bold text-white pr-4 text-sm tracking-wide">{q}</span>
        <ChevronDown size={18} className={`text-cyan-400 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <div id={`${id}-panel`} hidden={!open} className="px-6 text-slate-400 text-sm leading-relaxed border-t border-slate-800/50">
        <div className="py-5">{a}</div>
      </div>
    </div>
  );
};

// ─── Main Page ──────────────────────────────────────────────────────────────

export default function Home() {
  const waMessage = encodeURIComponent("Hi KCROC, I need computer repair in Kuwait. Please arrange free pickup & diagnostic.");
  const waLink = `https://wa.me/${BUSINESS_PHONE.replace('+', '')}?text=${waMessage}`;

  return (
    <div className="w-full bg-[#0a0f1c] flex flex-col items-center overflow-x-hidden pb-24 md:pb-0 selection:bg-cyan-500/30">
      <Helmet>
        <title>Premium Computer Repair in Kuwait | KCROC</title>
        <meta name="description" content="Professional laptop, MacBook, motherboard, and gaming PC repair services in Hawalli, Kuwait. Free pickup and delivery across Kuwait." />
      </Helmet>

      {/* Premium Hero Section */}
      <section className="relative w-full pt-32 pb-20 flex flex-col items-center px-6 min-h-[90vh] justify-center overflow-hidden">
        
        {/* Abstract Tech Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none"></div>
        
        {/* Core Electric Glow */}
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-cyan-600/20 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="relative w-full max-w-3xl text-center z-10 flex flex-col items-center mt-8">
          <FadeIn>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight leading-[1.1]">
              Premium computer repair <br className="hidden md:block"/>
              <span className="text-cyan-400 drop-shadow-[0_0_25px_rgba(34,211,238,0.4)]">& tech support</span> <br className="hidden md:block"/>
              in Kuwait.
            </h1>
            
            <p className="mt-6 text-base md:text-lg text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Professional laptop & desktop repair, data recovery, and IT solutions — delivered with speed, precision, and the care your devices deserve.
            </p>
            
            {/* Stacked Action Buttons (Matching the Reference) */}
            <div className="flex flex-col gap-3 w-full max-w-sm mx-auto">
              {/* Primary Blue Button */}
              <Link 
                to="/book" 
                className="flex items-center justify-center gap-2 w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-8 py-4 rounded-full font-black text-base transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:scale-[1.02]"
              >
                Book a repair <ArrowRight className="w-5 h-5" />
              </Link>
              
              {/* Secondary Dark Button 1 */}
              <a 
                href={waLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center gap-3 w-full bg-slate-900/60 backdrop-blur-md border border-slate-700/50 hover:bg-slate-800 text-slate-200 px-8 py-4 rounded-full font-bold text-sm transition-all hover:border-cyan-500/30"
              >
                <MessageCircle className="w-5 h-5 text-cyan-400" /> WhatsApp us
              </a>

              {/* Secondary Dark Button 2 */}
              <a 
                href={`tel:${BUSINESS_PHONE}`} 
                className="flex items-center justify-center gap-3 w-full bg-slate-900/60 backdrop-blur-md border border-slate-700/50 hover:bg-slate-800 text-slate-200 px-8 py-4 rounded-full font-bold text-sm transition-all hover:border-cyan-500/30"
              >
                <Phone className="w-5 h-5 text-cyan-400" /> Call now
              </a>
            </div>

            {/* Glowing Tech Image Container (Placeholder for your glowing laptop image/video) */}
            <div className="w-full max-w-2xl mx-auto mt-16 rounded-3xl overflow-hidden border border-slate-800/80 shadow-[0_0_50px_rgba(34,211,238,0.1)] relative group">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c] to-transparent z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=1200&q=80" 
                  alt="High-tech computer motherboard repair" 
                  className="w-full h-auto object-cover opacity-80 mix-blend-screen group-hover:scale-105 transition-transform duration-1000"
                />
            </div>
            
          </FadeIn>
        </div>
      </section>

      {/* Trust Stats Section */}
      <section className="w-full py-12 flex justify-center px-6 border-t border-slate-800/50 bg-slate-900/20">
        <div className="w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {trustStats.map((stat, idx) => (
            <FadeIn key={stat.label} delay={idx * 50}>
              <div className="text-3xl md:text-5xl font-black text-white tracking-tight">{stat.value}</div>
              <div className="text-xs md:text-sm text-cyan-400 mt-2 uppercase tracking-widest font-bold">{stat.label}</div>
              <div className="text-[11px] text-slate-500 mt-1">{stat.subtext}</div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Services Grid (Upgraded to Glassmorphism) */}
      <section className="w-full py-24 flex justify-center px-6">
        <div className="w-full max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Engineering Capabilities</h2>
            <p className="text-slate-400">Comprehensive hardware solutions for modern devices.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, idx) => (
              <FadeIn key={s.path} delay={idx * 50}>
                <Link to={s.path} className="group block bg-slate-900/30 backdrop-blur-sm p-8 rounded-3xl border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900/50 transition-all duration-300 h-full hover:shadow-[0_0_30px_rgba(34,211,238,0.05)]">
                  <div className="w-14 h-14 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-center mb-6 group-hover:border-cyan-500/30 transition-colors">
                    <s.icon className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{s.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{s.description}</p>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-20 flex justify-center px-6 border-t border-slate-800/50 bg-slate-900/10">
        <div className="w-full max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-white mb-3 tracking-tight">Service Protocol</h2>
            <p className="text-slate-400 text-sm uppercase tracking-widest font-bold">Frequently Asked Questions</p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq) => {
              const faqId = faq.q.toLowerCase().replace(/[^a-z0-9]+/g, '-');
              return <FAQItem key={faqId} id={faqId} q={faq.q} a={faq.a} />;
            })}
          </div>
        </div>
      </section>

      {/* Sticky Mobile CTA Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-950/90 backdrop-blur-xl border-t border-slate-800/80 p-4 flex justify-center gap-3 z-50 md:hidden">
        <Link to="/book" className="flex-1 bg-cyan-500 py-3 rounded-xl text-slate-950 font-black text-center text-sm shadow-[0_0_15px_rgba(6,182,212,0.3)] uppercase tracking-wider">
          Book Repair
        </Link>
        <a href={waLink} target="_blank" rel="noopener noreferrer" className="flex-1 bg-slate-900 border border-slate-700 py-3 rounded-xl text-white font-bold text-center text-sm tracking-wider uppercase flex items-center justify-center gap-2">
           <MessageCircle className="w-4 h-4 text-cyan-400" /> Chat
        </a>
      </div>

    </div>
  );
}
