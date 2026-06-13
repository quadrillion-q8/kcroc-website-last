import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Cpu, Gamepad2, Laptop, Monitor, ShieldAlert, 
  ChevronDown, Star 
} from 'lucide-react';

// ─── Constants & Data ────────────────────────────────────────────────────────

const BUSINESS_NAME = "Kuwait Computer Repair On Call (KCROC)";
const BUSINESS_PHONE = "+96555301913";
const CANONICAL_URL = "https://www.computerrepairkuwait.com";
// Added optimized Cloudinary Logo URL
const CLOUDINARY_LOGO = "https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto/v1769908596/logo_btpfls.png";

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

const trustStats = [
  { value: '500+', label: 'Repairs Completed', subtext: 'Since launch across Kuwait' },
  { value: '98%', label: 'Success Rate', subtext: 'On complex logic board repairs' },
  { value: '30 Days', label: 'Warranty', subtext: 'On all parts and labour' },
  { value: '100%', label: 'Free Pick & Drop', subtext: 'Zero hidden fees' },
];

const reviews = [
  { name: 'Dr. Ghanim Al-Khaledi', text: 'They fixed my Predator Helios motherboard, replaced all SSD, battery and charging cables, and the machine is roaring again. I am very happy with their services; they are competent, reliable, and HONEST.', rating: 5 },
  { name: 'Mohammed Sabil', text: 'I had given my laptop for a motherboard replacement. They managed to find a compatible motherboard and replace it successfully. They provide excellent service, are highly professional, and kept me informed.', rating: 5 },
  { name: 'Ayman Elnagar', text: 'The best IT support and laptop repair shop I\'ve visited in Kuwait. Fixed my battery charging issue the same day. Professional service and very convenient location. 5 stars!', rating: 5 },
  { name: 'Ashley Pabillaran', text: 'Thank you very much for fixing my laptop and upgrading the software. You did a great job quickly and the technician was very good. The price was right.', rating: 5 },
  { name: 'Raymond Licuanan', text: 'Upgraded the RAM of my old laptop with them and now its running lightning fast and like brand new. Highly praised their professionalism and quality.', rating: 5 },
  { name: 'Hala Khatib', text: 'One of my All-in-One Desktop and two of my laptops are fixed and reinstalled by these guys. The best experience, fast, quick, reliable and cheap price, really recommended.', rating: 5 }
];

const schemaData = {
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
        "https://maps.google.com/?cid=3928987856909945446",
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
      "areaServed": [
        { "@type": "City", "name": "Hawalli" },
        { "@type": "City", "name": "Salmiya" },
        { "@type": "City", "name": "Kuwait City" },
        { "@type": "City", "name": "Farwaniya" },
        { "@type": "City", "name": "Jahra" }
      ],
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
      "sameAs": [
        "https://maps.google.com/?cid=3928987856909945446",
        "https://www.facebook.com/computerrepairkuwait",
        "https://www.instagram.com/computerrepairkuwait"
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "150"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Computer Repair Services",
        "itemListElement": services.map(s => ({
          "@type": "Offer",
          "itemOffered": { "@type": "Service", "name": s.title }
        }))
      }
    },
    {
      "@type": "FAQPage",
      "@id": `${CANONICAL_URL}/#faq`,
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": { "@type": "Answer", "text": faq.a }
      }))
    },
    { "@type": "Service", "name": "Motherboard Repair", "provider": { "@id": `${CANONICAL_URL}/#business` } },
    { "@type": "Service", "name": "MacBook Repair", "provider": { "@id": `${CANONICAL_URL}/#business` } },
    { "@type": "Service", "name": "Laptop Screen Repair", "provider": { "@id": `${CANONICAL_URL}/#business` } },
    { "@type": "Service", "name": "Gaming PC Repair", "provider": { "@id": `${CANONICAL_URL}/#business` } }
  ]
};

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
    <div className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-900/20">
      <button 
        id={`${id}-button`}
        onClick={() => setOpen(!open)} 
        aria-expanded={open} 
        aria-controls={`${id}-panel`} 
        className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-800/50 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
      >
        <span className="font-semibold text-white pr-4">{q}</span>
        <ChevronDown size={20} className={`text-cyan-400 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <div 
        id={`${id}-panel`} 
        role="region" 
        aria-labelledby={`${id}-button`} 
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
  const waMessage = encodeURIComponent("Hi KCROC, I need computer repair in Kuwait. Please arrange free pickup & diagnostic.");
  const waLink = `https://wa.me/${BUSINESS_PHONE.replace('+', '')}?text=${waMessage}`;

  return (
    <div className="w-full bg-slate-950 flex flex-col items-center overflow-x-hidden pb-24 md:pb-0">
      <Helmet>
        <title>KCROC | Kuwait Computer Repair On Call</title>
        <meta name="description" content="Professional laptop, MacBook, motherboard, and gaming PC repair services in Hawalli, Kuwait. Free pickup and delivery across Kuwait." />
        <link rel="canonical" href={CANONICAL_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="KCROC | Kuwait Computer Repair On Call" />
        <meta property="og:description" content="Professional laptop, MacBook, and motherboard repair services in Hawalli, Kuwait. Free pickup and delivery across Kuwait." />
        <meta property="og:url" content={CANONICAL_URL} />
        {/* Updated Open Graph image */}
        <meta property="og:image" content={CLOUDINARY_LOGO} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>

      {/* Hero Section */}
      <section className="w-full pt-32 pb-12 flex justify-center px-6">
        <div className="w-full max-w-4xl text-center">
          <FadeIn>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6">Expert Computer Repair in <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Kuwait</span></h1>
            <p className="mt-6 text-xl text-slate-400 mb-8">Professional hardware assessment and component-level repairs with Free Pickup & Delivery.</p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-3">
              <a href={waLink} target="_blank" rel="noopener noreferrer" className="bg-emerald-600 px-8 py-4 rounded-full font-bold text-lg text-white hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-900/20">Book Free Pickup</a>
              <a href={`tel:${BUSINESS_PHONE}`} className="bg-slate-800 px-8 py-4 rounded-full font-bold text-lg text-white border border-slate-700 hover:bg-slate-700 transition-colors">Get Free Diagnostic</a>
            </div>
            
            <div className="text-center mb-8">
              <span className="text-xs text-slate-500 font-medium tracking-wide uppercase">Avg response time: under 15 minutes</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-300">
              {['✓ Free Pickup & Delivery', '✓ No Fix, No Fee', '✓ Same-Day Repairs', '✓ Apple & Windows Specialists'].map(t => <span key={t}>{t}</span>)}
            </div>

            {/* Google Reviews Badge */}
            <div className="flex items-center gap-2 justify-center mt-6">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" aria-hidden="true" />
                ))}
              </div>
              <span className="text-white font-bold">4.9</span>
              <span className="text-slate-400 text-sm">· 150+ Google Reviews</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Trust Stats Section */}
      <section className="w-full py-12 flex justify-center px-6 border-t border-slate-800">
        <div className="w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {trustStats.map((stat, idx) => (
            <FadeIn key={stat.label} delay={idx * 50}>
              <div className="text-3xl md:text-5xl font-extrabold text-white">{stat.value}</div>
              <div className="text-xs md:text-sm text-slate-400 mt-2 uppercase tracking-wide font-bold">{stat.label}</div>
              <div className="text-[11px] text-slate-500 mt-1">{stat.subtext}</div>
            </FadeIn>
          ))}
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
          {/* Breadcrumb Navigation */}
          <nav className="text-sm text-slate-500 mb-8 font-medium">
            <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link> 
            <span className="mx-2">/</span> Computer Repair Kuwait 
            <span className="mx-2">/</span> <span className="text-slate-300">Services</span>
          </nav>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, idx) => (
              <FadeIn key={s.path} delay={idx * 50}>
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

      {/* Reviews Section */}
      <section className="w-full py-20 flex justify-center px-6 border-t border-slate-800">
        <div className="w-full max-w-7xl">
          <h2 className="text-3xl font-extrabold text-white text-center mb-12">Verified Customer Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, idx) => (
              <FadeIn key={idx} delay={idx * 50}>
                <a 
                  href="https://maps.google.com/?cid=3928987856909945446" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block bg-slate-900/40 p-8 rounded-3xl border border-slate-800 hover:border-cyan-500/30 transition-all h-full"
                >
                  <div className="flex text-yellow-400 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" aria-hidden="true" />
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
          <h2 className="text-3xl font-bold text-white text-center mb-2">Frequently Asked Questions</h2>
          <p className="text-xs text-slate-500 text-center mb-10 uppercase tracking-widest font-medium">Common questions about computer repair in Kuwait</p>
          <div className="space-y-3">
            {faqs.map((faq) => {
              const faqId = faq.q.toLowerCase().replace(/[^a-z0-9]+/g, '-');
              return <FAQItem key={faqId} id={faqId} q={faq.q} a={faq.a} />;
            })}
          </div>
        </div>
      </section>

      {/* Long-form Local SEO Section */}
      <section className="w-full py-16 bg-slate-900/30 border-t border-slate-800 flex justify-center px-6">
        <div className="w-full max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-6">
            Professional Computer Repair Services in Kuwait
          </h2>
          <div className="space-y-4 text-slate-400 text-sm md:text-base leading-relaxed">
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
              delivery across Kuwait with fast turnaround times and reliable diagnostics.
            </p>
          </div>
        </div>
      </section>
      
      {/* Sticky Mobile CTA Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 p-4 flex justify-center gap-3 z-50 md:hidden">
        <a href={waLink} target="_blank" rel="noopener noreferrer" className="flex-1 bg-emerald-600 py-3 rounded-full text-white font-bold text-center text-sm shadow-lg shadow-emerald-900/20">
          WhatsApp Pickup
        </a>
        <a href={`tel:${BUSINESS_PHONE}`} className="flex-1 bg-slate-800 border border-slate-700 py-3 rounded-full text-white font-bold text-center text-sm">
          Call Now
        </a>
      </div>

    </div>
  );
}
