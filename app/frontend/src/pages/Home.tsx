import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Cpu, Gamepad2, Laptop, Monitor, ShieldAlert, 
  ChevronDown, Star, Phone, MessageCircle, ArrowRight, ShieldCheck
} from 'lucide-react';

// ─── Constants & Data ────────────────────────────────────────────────────────
const BUSINESS_NAME = "Kuwait Computer Repair On Call (KCROC)";
const BUSINESS_PHONE = "+96555301913";
const CANONICAL_URL = "https://www.computerrepairkuwait.com";
const CLOUDINARY_LOGO = "https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto/v1769908596/logo_btpfls.png";

const SERVICES = [
  { title: 'Motherboard Repair', description: 'Advanced logic board diagnostics, micro-soldering, and professional BIOS flashing.', icon: Cpu, path: '/motherboard-repair-kuwait' },
  { title: 'Gaming PC Tuning', description: 'GPU troubleshooting, liquid cooling maintenance, and performance tuning.', icon: Gamepad2, path: '/gaming-pc-repair-kuwait' },
  { title: 'MacBook Repair', description: 'Expert Apple logic board repair and genuine component replacement.', icon: Laptop, path: '/macbook-repair-kuwait' },
  { title: 'Screen Replacement', description: 'High-quality replacement displays for premium laptops and MacBooks.', icon: Monitor, path: '/laptop-screen-repair-kuwait' },
  { title: 'System Diagnostics', description: 'Complete system cleanups, battery replacements, and virus removal.', icon: ShieldAlert, path: '/services' },
];

const FAQS = [
  { q: "Do you repair MacBooks?", a: "Yes, we specialize in Apple MacBook repair including logic board micro-soldering, screen replacements, and battery service." },
  { q: "Do you offer same-day repair?", a: "Yes, common repairs like screen replacements and SSD upgrades are often completed the same day." },
  { q: "Do you repair gaming PCs?", a: "Absolutely. We handle custom gaming PC troubleshooting, cooling loops, GPU repairs, and performance tuning." },
  { q: "Do you offer warranty?", a: "Yes, all our repairs are backed by a 30-day parts and labour warranty." },
  { q: "How much does motherboard repair cost?", a: "Motherboard repair pricing is diagnostic-first. We assess the damage and provide a quote before proceeding." },
  { q: "Do you provide free pickup and delivery?", a: "Yes, we offer free pickup and delivery across all Kuwait governorates." },
  { q: "What happens if my device cannot be repaired?", a: "Our No Fix, No Fee policy ensures you pay nothing if we cannot successfully repair your device." }
];

const TRUST_STATS = [
  { value: '500+', label: 'Repairs Completed', subtext: 'Since launch across Kuwait' },
  { value: '98%', label: 'Success Rate', subtext: 'On complex logic board repairs' },
  { value: '30 Days', label: 'Warranty', subtext: 'On all parts and labour' },
  { value: '100%', label: 'Free Pick & Drop', subtext: 'Zero hidden fees' },
];

const REVIEWS = [
  { name: 'Dr. Ghanim Al-Khaledi', text: 'They fixed my Predator Helios motherboard, replaced all SSD, battery and charging cables, and the machine is roaring again. I am very happy with their services; they are competent, reliable, and HONEST.', rating: 5 },
  { name: 'Mohammed Sabil', text: 'I had given my laptop for a motherboard replacement. They managed to find a compatible motherboard and replace it successfully. They provide excellent service, are highly professional, and kept me informed.', rating: 5 },
  { name: 'Ayman Elnagar', text: 'The best IT support and laptop repair shop I\'ve visited in Kuwait. Fixed my battery charging issue the same day. Professional service and very convenient location. 5 stars!', rating: 5 },
  { name: 'Ashley Pabillaran', text: 'Thank you very much for fixing my laptop and upgrading the software. You did a great job quickly and the technician was very good. The price was right.', rating: 5 },
  { name: 'Raymond Licuanan', text: 'Upgraded the RAM of my old laptop with them and now its running lightning fast and like brand new. Highly praised their professionalism and quality.', rating: 5 },
  { name: 'Hala Khatib', text: 'One of my All-in-One Desktop and two of my laptops are fixed and reinstalled by these guys. The best experience, fast, quick, reliable and cheap price, really recommended.', rating: 5 }
];

const SCHEMA_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${CANONICAL_URL}/#organization`,
      "name": BUSINESS_NAME,
      "url": CANONICAL_URL,
      "logo": CLOUDINARY_LOGO,
      "telephone": BUSINESS_PHONE,
      "sameAs": [
        "https://www.facebook.com/computerrepairkuwait",
        "https://www.instagram.com/computerrepairkuwait"
      ]
    },
    {
      "@type": "WebSite",
      "@id": `${CANONICAL_URL}/#website`,
      "url": CANONICAL_URL,
      "name": BUSINESS_NAME,
      "image": CLOUDINARY_LOGO,
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${CANONICAL_URL}/search?q={query}`,
        "query-input": "required name=query"
      }
    },
    {
      "@type": "LocalBusiness",
      "@id": `${CANONICAL_URL}/#business`,
      "name": BUSINESS_NAME,
      "image": CLOUDINARY_LOGO,
      "telephone": BUSINESS_PHONE,
      "url": CANONICAL_URL,
      "priceRange": "$$",
      "openingHours": "Mo-Su 10:00-22:00",
      "areaServed": ["Hawalli", "Salmiya", "Kuwait City", "Farwaniya", "Jahra"],
      "paymentAccepted": "Cash, Credit Card, KNET",
      "currenciesAccepted": "KWD",
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
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "150"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Computer Repair Services",
        "itemListElement": SERVICES.map(s => ({
          "@type": "Offer",
          "itemOffered": { "@type": "Service", "name": s.title }
        }))
      }
    },
    {
      "@type": "FAQPage",
      "@id": `${CANONICAL_URL}/#faq`,
      "mainEntity": FAQS.map(faq => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": { "@type": "Answer", "text": faq.a }
      }))
    }
  ]
};

// ─── Hooks & Sub-Components ──────────────────────────────────────────────────
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

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const { ref, visible } = useFadeIn();
  return (
    <div 
      ref={ref} 
      className={`transition-all duration-700 w-full ${className} ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} 
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
        className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
      >
        <span className="font-bold text-white pr-4 text-sm tracking-wide">{q}</span>
        <ChevronDown size={18} className={`text-cyan-400 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>
      <div 
        id={`${id}-panel`} 
        role="region" 
        aria-labelledby={`${id}-button`} 
        hidden={!open} 
        className={`grid transition-all duration-300 ${open ? 'grid-rows-[1fr] opacity-100 border-t border-slate-800/50' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="px-6 text-slate-400 text-sm leading-relaxed overflow-hidden">
          <div className="py-5">{a}</div>
        </div>
      </div>
    </div>
  );
};

// ─── Main Page Component ─────────────────────────────────────────────────────
export default function Home() {
  const waMessage = encodeURIComponent("Hi KCROC, I need computer repair in Kuwait. Please arrange free pickup & diagnostic.");
  const cleanPhoneStr = BUSINESS_PHONE.replace(/\D/g, '');
  const waLink = `https://wa.me/${cleanPhoneStr}?text=${waMessage}`;

  return (
    <main className="w-full bg-transparent flex flex-col items-center overflow-x-hidden pb-24 md:pb-0 selection:bg-cyan-500/30 scroll-smooth">
      <Helmet>
        <title>KCROC | Premium Computer Repair On Call in Kuwait</title>
        <meta name="description" content="Professional laptop, MacBook, motherboard, and gaming PC repair services in Hawalli, Kuwait. Free pickup and delivery across Kuwait." />
        <link rel="canonical" href={CANONICAL_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="KCROC | Premium Computer Repair On Call in Kuwait" />
        <meta property="og:description" content="Professional laptop, MacBook, and motherboard repair services in Hawalli, Kuwait. Free pickup and delivery across Kuwait." />
        <meta property="og:url" content={CANONICAL_URL} />
        <meta property="og:image" content={CLOUDINARY_LOGO} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(SCHEMA_DATA)}</script>
      </Helmet>

      {/* ─── PREMIUM HERO SECTION ─── */}
      <section className="relative w-full pt-20 md:pt-32 pb-16 flex flex-col items-center px-6 min-h-[80vh] md:min-h-[90vh] justify-center overflow-hidden z-10">
        {/* Core Electric Glow */}
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-cyan-600/20 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="relative w-full max-w-5xl text-center z-10 flex flex-col items-center mt-2 md:mt-8">
          <FadeIn className="flex flex-col items-center">
            
            <div className="inline-flex items-center gap-2 bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 px-5 py-2 rounded-full text-cyan-400 text-xs font-black uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
              <ShieldCheck size={16} aria-hidden="true" /> Component-Level Diagnostic Lab
            </div>

            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight leading-[1.1]">
                Premium computer repair <br className="hidden md:block"/>
                <span className="text-cyan-400 drop-shadow-[0_0_25px_rgba(34,211,238,0.4)]">& tech support</span> in Kuwait.
              </h1>
            </div>
            
            <p className="mt-4 md:mt-6 text-base md:text-lg text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Professional laptop & desktop repair, chip-level diagnostics, and IT solutions — delivered with speed, precision, and the care your devices deserve.
            </p>
            
            {/* Desktop-optimized Button Layout */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full max-w-xl mx-auto mb-10">
              <Link 
                to="/services" 
                className="flex items-center justify-center gap-2 w-full sm:w-auto bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-8 py-4 rounded-full font-black text-base transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                View our services <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Link>
              
              <a 
                href={waLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-center gap-3 w-full sm:w-auto bg-slate-900/60 backdrop-blur-md border border-slate-700/50 hover:bg-slate-800 text-slate-200 px-8 py-4 rounded-full font-bold text-base transition-all hover:border-cyan-500/30 focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <MessageCircle className="w-5 h-5 text-cyan-400" aria-hidden="true" /> WhatsApp us
              </a>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-xs md:text-sm text-slate-300 font-medium">
              {['✓ Free Pickup & Delivery', '✓ No Fix, No Fee', '✓ Same-Day Repairs', '✓ Apple & Windows Specialists'].map(t => <span key={t}>{t}</span>)}
            </div>

            {/* Google Reviews Badge */}
            <a href="https://share.google/a1XlHbHRHMPrrNfpr" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 justify-center mt-10 p-4 bg-slate-900/40 border border-slate-800 rounded-full w-fit mx-auto backdrop-blur-md hover:border-cyan-500/30 transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400 group">
              <div className="flex text-cyan-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" aria-hidden="true" />
                ))}
              </div>
              <span className="text-white font-bold text-sm ml-1 group-hover:text-cyan-400 transition-colors">4.9</span>
              <span className="text-slate-400 text-sm group-hover:text-slate-300 transition-colors">· 150+ Google Reviews</span>
            </a>
          </FadeIn>
        </div>
      </section>

      {/* ─── TRUST STATS ─── */}
      <section className="w-full py-16 flex justify-center px-6 border-t border-slate-800/50 bg-slate-900/10 relative z-10">
        <div className="w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {TRUST_STATS.map((stat, idx) => (
            <FadeIn key={stat.label} delay={idx * 50}>
              <div className="text-3xl md:text-5xl font-black text-white tracking-tight drop-shadow-sm">{stat.value}</div>
              <div className="text-xs md:text-sm text-cyan-400 mt-2 uppercase tracking-widest font-bold">{stat.label}</div>
              <div className="text-[11px] text-slate-500 mt-1">{stat.subtext}</div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ─── ENTITY REINFORCEMENT ─── */}
      <section className="w-full py-12 flex justify-center px-6 text-center bg-slate-900/20 border-t border-slate-800/50 backdrop-blur-sm relative z-10">
        <div className="w-full max-w-4xl">
          <h2 className="text-lg font-bold text-white mb-2 tracking-wide">Professional Computer Repair Services Across Kuwait</h2>
          <p className="text-slate-400 text-sm leading-relaxed">Looking for specialised repairs? Explore our 
            <Link to="/motherboard-repair-kuwait" className="text-cyan-400 hover:text-cyan-300 hover:underline mx-1 transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400 rounded">Motherboard Repair</Link>, 
            <Link to="/macbook-repair-kuwait" className="text-cyan-400 hover:text-cyan-300 hover:underline mx-1 transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400 rounded">MacBook Repair</Link>, and 
            <Link to="/laptop-screen-repair-kuwait" className="text-cyan-400 hover:text-cyan-300 hover:underline mx-1 transition-colors focus-visible:ring-2 focus-visible:ring-cyan-400 rounded">Laptop Screen Repair</Link> services.
          </p>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section className="w-full py-24 flex justify-center px-6 border-t border-slate-800/50 relative z-10">
        <div className="w-full max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">Our Repair Capabilities</h2>
            <p className="text-slate-400">Comprehensive hardware solutions engineered for reliability.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, idx) => (
              <FadeIn key={s.title} delay={idx * 50}>
                <Link to={s.path} className="group block bg-slate-900/30 backdrop-blur-sm p-8 rounded-3xl border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 h-full hover:shadow-[0_0_30px_rgba(34,211,238,0.05)] focus-visible:ring-2 focus-visible:ring-cyan-400">
                  <div className="w-14 h-14 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-center mb-6 group-hover:border-cyan-500/30 transition-colors">
                    <s.icon className="w-6 h-6 text-cyan-400" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-cyan-400 transition-colors">{s.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{s.description}</p>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── REVIEWS ─── */}
      <section className="w-full py-24 flex justify-center px-6 border-t border-slate-800/50 bg-slate-900/10 relative z-10">
        <div className="w-full max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-black text-white text-center mb-16 tracking-tight">Verified Customer Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REVIEWS.map((review, idx) => (
              <FadeIn key={review.name} delay={idx * 50}>
                <a 
                  href="https://share.google/a1XlHbHRHMPrrNfpr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block bg-slate-900/30 backdrop-blur-sm p-8 rounded-3xl border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 h-full hover:shadow-[0_0_30px_rgba(34,211,238,0.05)] focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  <div className="flex text-cyan-400 mb-5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current drop-shadow-[0_0_5px_rgba(34,211,238,0.4)]" aria-hidden="true" />
                    ))}
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">"{review.text}"</p>
                  <div className="text-cyan-400 font-bold text-sm">- {review.name}</div>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── AREAS SERVED ─── */}
      <section className="w-full py-16 border-y border-slate-800/50 flex justify-center px-6 text-center bg-slate-900/20 backdrop-blur-sm relative z-10">
        <div className="w-full max-w-4xl">
          <h2 className="text-2xl font-black text-white mb-6 tracking-tight">Serving Customers Across Kuwait</h2>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto">{BUSINESS_NAME} provides free pickup and delivery throughout Hawalli, Salmiya, Kuwait City, Farwaniya, Jahra, Ahmadi, and Mubarak Al-Kabeer.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {['Hawalli', 'Salmiya', 'Farwaniya', 'Kuwait City', 'Jahra', 'Ahmadi', 'Mubarak Al-Kabeer'].map(area => (
              <span key={area} className="px-4 py-2 rounded-full bg-slate-950/80 border border-slate-800 text-slate-300 text-sm font-medium hover:border-cyan-500/30 transition-colors cursor-default">
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="w-full py-24 flex justify-center px-6 relative z-10">
        <div className="w-full max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-white mb-3 tracking-tight">Service Protocol</h2>
            <p className="text-slate-400 text-sm uppercase tracking-widest font-bold">Frequently Asked Questions</p>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq) => {
              const faqId = faq.q.toLowerCase().replace(/[^a-z0-9]+/g, '-');
              return <FAQItem key={faqId} id={faqId} q={faq.q} a={faq.a} />;
            })}
          </div>
        </div>
      </section>

      {/* ─── LOCAL SEO FOOTER ─── */}
      <section className="w-full py-20 bg-slate-900/10 border-t border-slate-800/50 flex justify-center px-6 relative z-10">
        <div className="w-full max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-8 tracking-tight text-center">
            Professional Computer Repair Services in Kuwait
          </h2>
          <div className="space-y-6 text-slate-400 text-sm md:text-base leading-relaxed">
            <p>
              KCROC provides professional laptop and computer repair services throughout 
              Kuwait including Hawalli, Salmiya, Farwaniya, Kuwait City, Jahra, Ahmadi, 
              and Mubarak Al-Kabeer. We specialize in MacBook repair, gaming laptop repair, 
              motherboard diagnostics, liquid damage repair, screen replacement, battery 
              replacement, SSD upgrades, RAM upgrades, virus removal, and Windows installation.
            </p>
            <p>
              Our technicians work on Apple, ASUS, MSI, Acer Predator, HP, Dell, Lenovo, 
              Alienware, and custom-built desktop systems. We offer free pickup and 
              delivery across Kuwait with fast turnaround times and reliable chip-level diagnostics.
            </p>
          </div>
        </div>
      </section>
      
      {/* ─── MOBILE CTA BOTTOM BAR ─── */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-950/90 backdrop-blur-xl border-t border-slate-800/80 p-4 flex justify-center gap-3 z-50 md:hidden">
        <a 
          href={waLink} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex-1 bg-cyan-500 py-3 rounded-xl text-slate-950 font-black text-center text-sm shadow-[0_0_15px_rgba(6,182,212,0.3)] tracking-wider uppercase flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-cyan-400 outline-none"
        >
          <MessageCircle className="w-4 h-4" aria-hidden="true" /> Chat
        </a>
        <a 
          href={`tel:${cleanPhoneStr}`} 
          className="flex-1 bg-slate-900 border border-slate-700 py-3 rounded-xl text-white font-bold text-center text-sm tracking-wider uppercase flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-cyan-400 outline-none"
        >
          <Phone className="w-4 h-4 text-cyan-400" aria-hidden="true" /> Call Lab
        </a>
      </div>

    </main>
  );
}
