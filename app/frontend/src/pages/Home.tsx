import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Cpu, Gamepad2, Laptop, Monitor, Database, ShieldAlert, ArrowRight, Star, CheckCircle2 
} from 'lucide-react';

// ==========================================
// 1. STATIC DATA (Moved outside to prevent re-renders)
// ==========================================

const services = [
  {
    title: 'Chip-Level Motherboard Repair',
    description: 'Advanced logic board diagnostics, micro-soldering, and professional BIOS flashing.',
    icon: Cpu,
    path: '/motherboard-repair-kuwait',
    gradient: 'from-green-500/20 to-emerald-500/5',
    borderColor: 'group-hover:border-green-500/50'
  },
  {
    title: 'Gaming PC & Workstation Tuning',
    description: 'GPU troubleshooting, liquid cooling loop maintenance, and high-performance optimization.',
    icon: Gamepad2,
    path: '/gaming-pc-repair-kuwait',
    gradient: 'from-purple-500/20 to-indigo-500/5',
    borderColor: 'group-hover:border-purple-500/50'
  },
  {
    title: 'MacBook Professional Repair',
    description: 'Expert logic board repair, hardware diagnostics, and component replacement for all Mac models.',
    icon: Laptop,
    path: '/macbook-repair-kuwait',
    gradient: 'from-blue-500/20 to-cyan-500/5',
    borderColor: 'group-hover:border-blue-500/50'
  },
  {
    title: 'Screen & Glass Replacement',
    description: 'Crisp, high-quality replacement displays for premium laptops, MacBooks, and monitors.',
    icon: Monitor,
    path: '/screen-replacement-kuwait',
    gradient: 'from-amber-500/20 to-orange-500/5',
    borderColor: 'group-hover:border-amber-500/50'
  },
  {
    title: 'Advanced Data Recovery',
    description: 'Secure retrieval of critical files from failing hard drives, SSDs, and corrupted media.',
    icon: Database,
    path: '/data-recovery-kuwait',
    gradient: 'from-red-500/20 to-rose-500/5',
    borderColor: 'group-hover:border-red-500/50'
  },
  {
    title: 'OS Restoration & Virus Removal',
    description: 'Complete system cleanups, malware elimination, and clean operating system deployments.',
    icon: ShieldAlert,
    path: '/virus-removal-kuwait',
    gradient: 'from-teal-500/20 to-cyan-500/5',
    borderColor: 'group-hover:border-teal-500/50'
  }
];

const reviews = [
  {
    id: 1,
    author: "Ahmad Al-Fadhli",
    rating: 5,
    text: "KCROC fixed my MacBook motherboard in 2 days. The free pick up and drop off in Hawalli was a lifesaver."
  },
  {
    id: 2,
    author: "Sarah J.",
    rating: 5,
    text: "Excellent gaming PC repair. Very professional and fast service."
  },
  {
    id: 3,
    author: "Fahad M.",
    rating: 5,
    text: "Recovered all my data from a dead hard drive. Highly recommended."
  }
];

const brands = [
  "Apple MacBooks", 
  "ASUS ROG Gaming Laptops", 
  "MSI Gaming Systems", 
  "Acer Predator Laptops", 
  "HP Laptops", 
  "Dell Inspiron & XPS", 
  "Lenovo ThinkPad", 
  "Alienware Gaming PCs",
  "Custom Desktop Computers"
];

const faqs = [
  {
    question: "Where is your workshop located?",
    answer: "Our workshop is located at Hawalli, Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19. If you cannot visit us, remember that we offer a Free Pick & Drop service across all areas in Kuwait."
  },
  {
    question: "Do you offer pick up and delivery?",
    answer: "Yes, Kuwait Computer Repair On Call (KCROC) offers a 100% Free Pick & Drop service across all Kuwait governorates for your convenience."
  },
  {
    question: "How long does a motherboard repair usually take?",
    answer: "Most component-level motherboard repairs are completed within 48 to 72 hours, depending on the availability of specific micro-components and IC chips."
  }
];

// ==========================================
// 2. HIGH-PERFORMANCE UTILITY COMPONENTS
// ==========================================

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
}

function AnimatedCounter({ end, duration = 2000, suffix = "" }: AnimatedCounterProps) {
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const rawProgress = Math.min((currentTime - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - rawProgress, 4);
      const currentCount = Math.floor(easeOutQuart * end);

      if (countRef.current) {
        countRef.current.innerText = `${currentCount}${suffix}`;
      }

      if (rawProgress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [end, duration, suffix]);

  return <span ref={countRef}>0{suffix}</span>;
}

// ==========================================
// 3. MAIN PAGE COMPONENT
// ==========================================

export default function Home() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.computerrepairkuwait.com/#organization",
        "name": "Kuwait Computer Repair On Call (KCROC)",
        "url": "https://www.computerrepairkuwait.com",
        "logo": "https://www.computerrepairkuwait.com/logo.png",
        "sameAs": [
          "https://www.facebook.com/computerrepairkuwait",
          "https://www.instagram.com/computerrepairkuwait",
          "https://maps.app.goo.gl/QGxYi2kWUJGfiBe47"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+965-55301913",
          "contactType": "customer service",
          "areaServed": "KW",
          "availableLanguage": ["English", "Arabic"]
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://www.computerrepairkuwait.com/#website",
        "url": "https://www.computerrepairkuwait.com",
        "name": "Kuwait Computer Repair On Call",
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://www.computerrepairkuwait.com/search?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://www.computerrepairkuwait.com/#localbusiness",
        "name": "Kuwait Computer Repair On Call (KCROC)",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19",
          "addressLocality": "Hawalli",
          "addressRegion": "Hawalli Governorate",
          "addressCountry": "KW"
        },
        "telephone": "55301913",
        "priceRange": "$$",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "150"
        },
        "review": reviews.map(rev => ({
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": rev.author
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": rev.rating.toString()
          },
          "reviewBody": rev.text
        }))
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white selection:bg-green-500/30">
      <Helmet>
        <title>Expert Computer & Laptop Repair in Kuwait | KCROC</title>
        <meta name="description" content="Professional computer and laptop repair in Kuwait. MacBook logic board repair, Gaming PC diagnostics, data recovery, and free pick & drop in all governorates." />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-950 to-black py-16 md:py-24 px-6 border-b border-gray-800">
        <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
            Expert Laptop & Computer Repair Services in Kuwait
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Fast diagnostics, motherboard repair, screen replacement, battery replacement, and <strong>Free Pick & Drop service across Kuwait</strong>.
          </p>
          
          <div className="mt-8 p-6 md:p-8 bg-gray-900/80 rounded-2xl border border-gray-800 shadow-2xl backdrop-blur-sm mx-auto max-w-2xl text-left md:text-center">
            <h2 className="text-xl md:text-2xl font-bold mb-3 text-green-400">Kuwait Computer Repair On Call (KCROC)</h2>
            <p className="text-gray-300 leading-relaxed space-y-2">
              <span className="block">Hawalli, Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19</span>
              <span className="block text-lg mt-2">
                Direct Line: <a href="tel:55301913" className="font-bold text-white hover:text-green-400 transition-colors">55301913</a>
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* 2. STATS SECTION (Minimalist Grid) */}
      <section className="py-12 md:py-16 px-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-gray-800/60 py-8">
          <div className="text-center md:border-r border-gray-800/60 last:border-0 p-2 md:p-4">
            <div className="text-4xl md:text-5xl font-extrabold text-green-500 tracking-tight">4.9/5</div>
            <div className="text-xs md:text-sm text-gray-400 mt-2 font-medium tracking-wide uppercase">Google Rating</div>
          </div>
          <div className="text-center md:border-r border-gray-800/60 last:border-0 p-2 md:p-4">
            <div className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              <AnimatedCounter end={150} suffix="+" />
            </div>
            <div className="text-xs md:text-sm text-gray-400 mt-2 font-medium tracking-wide uppercase">Verified Reviews</div>
          </div>
          <div className="text-center md:border-r border-gray-800/60 last:border-0 p-2 md:p-4">
            <div className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              <AnimatedCounter end={15} suffix="+" />
            </div>
            <div className="text-xs md:text-sm text-gray-400 mt-2 font-medium tracking-wide uppercase">Years Experience</div>
          </div>
          <div className="text-center md:border-r border-gray-800/60 last:border-0 p-2 md:p-4">
            <div className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">100%</div>
            <div className="text-xs md:text-sm text-gray-400 mt-2 font-medium tracking-wide uppercase">Free Pick & Drop</div>
          </div>
        </div>
      </section>

      {/* 3. SERVICE CARDS SECTION (Premium Glossy) */}
      <section className="py-12 md:py-20 px-6 max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Professional Hardware Solutions
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
            Select a specialized service below to view our expert repair processes, diagnostics, and pricing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Link 
                key={index} 
                to={service.path}
                className="group relative block rounded-2xl bg-gray-900/40 border border-gray-800/80 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className={`absolute inset-0 border border-transparent rounded-2xl transition-colors duration-300 ${service.borderColor}`} />

                <div className="relative space-y-4 z-10">
                  <div className="inline-flex p-3 rounded-xl bg-gray-800/80 text-white group-hover:bg-white group-hover:text-gray-950 transition-colors duration-300 shadow-inner">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-green-400 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed min-h-[60px]">
                      {service.description}
                    </p>
                  </div>

                  <div className="flex items-center text-sm font-semibold text-gray-400 group-hover:text-white pt-2 transition-colors duration-200">
                    <span>View Service details</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 4. AI SEARCH / BRANDS SECTION */}
      <section className="py-12 md:py-20 px-6 max-w-6xl mx-auto border-t border-gray-800/50">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 space-y-6 text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              Laptop & PC Brands We Repair in Kuwait
            </h2>
            <p className="text-base md:text-lg text-gray-400 leading-relaxed">
              Kuwait Computer Repair On Call (KCROC) repairs Apple MacBooks, ASUS ROG gaming laptops, MSI gaming systems, Acer Predator laptops, HP laptops, Dell Inspiron and XPS models, Lenovo ThinkPad devices, Alienware gaming PCs, and custom desktop computers across Kuwait.
            </p>
            <p className="text-base text-gray-400 leading-relaxed">
              Whether you need chip-level diagnostics for an Apple logic board or thermal paste replacement for a high-performance MSI gaming rig, our technical team provides factory-standard component restoration.
            </p>
          </div>

          <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
            {brands.map((brand, index) => (
              <div 
                key={index} 
                className="flex items-center space-x-3 bg-gray-900/50 border border-gray-800 p-4 rounded-xl"
              >
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-sm md:text-base font-semibold text-gray-200">{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. REVIEWS SECTION (Deep Contrast) */}
      <section className="py-12 md:py-20 px-6 max-w-6xl mx-auto space-y-12 bg-gray-950">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            Client Testimonials
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div 
              key={review.id} 
              className="bg-gray-800/40 border border-gray-700/60 rounded-2xl p-6 shadow-xl hover:border-gray-600 transition-colors"
            >
              <div className="flex items-center space-x-1 text-amber-400 mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 italic leading-relaxed text-sm md:text-base">
                "{review.text}"
              </p>
              <div className="mt-4 text-sm font-semibold text-white">
                - {review.author}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. FAQ SECTION (Clean Accordion) */}
      <section className="py-12 md:py-20 px-6 max-w-3xl mx-auto space-y-8">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-center text-white mb-8">
          Frequently Asked Questions
        </h2>
        <div className="divide-y divide-gray-800">
          {faqs.map((faq, index) => (
            <details key={index} className="py-5 group cursor-pointer">
              <summary className="flex justify-between items-center font-semibold text-lg text-white list-none marker:hidden">
                <span>{faq.question}</span>
                <span className="text-green-500 transition-transform group-open:rotate-180">+</span>
              </summary>
              <p className="text-gray-400 mt-4 leading-relaxed text-sm md:text-base">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* 7. LONG-FORM LOCAL SEO SECTION */}
      <section className="py-12 md:py-20 px-6 bg-gray-900 border-t border-gray-800">
        <div className="max-w-5xl mx-auto">
          <article className="space-y-6 text-left">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Professional Computer Repair Services in Kuwait
            </h2>
            <div className="space-y-4 text-gray-400 text-sm md:text-base leading-relaxed">
              <p>
                KCROC provides professional laptop and computer repair services throughout Kuwait including Hawalli, Salmiya, Farwaniya, Kuwait City, Jahra, Ahmadi, and Mubarak Al-Kabeer. We specialize in MacBook repair, gaming laptop repair, motherboard diagnostics, liquid damage repair, screen replacement, battery replacement, SSD upgrades, RAM upgrades, virus removal, Windows installation, and data recovery services.
              </p>
              <p>
                Our technicians work on Apple, ASUS, MSI, Acer Predator, HP, Dell, Lenovo, Alienware, and custom-built desktop systems. We offer free pickup and delivery across Kuwait with fast turnaround times and reliable repair diagnostics.
              </p>
            </div>
          </article>

          <div className="mt-12 bg-gray-950 border border-gray-800 rounded-2xl p-6 md:p-8 text-center space-y-2 shadow-2xl">
            <h3 className="text-xl font-bold text-green-400">
              Kuwait Computer Repair On Call (KCROC)
            </h3>
            <p className="text-gray-300">
              Hawalli, Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19
            </p>
            <p className="text-gray-300 font-medium">
              Call for support: <a href="tel:55301913" className="text-white font-bold hover:text-green-400 transition-colors">55301913</a>
            </p>
            <div className="inline-block mt-4 px-5 py-2 bg-green-500/10 text-green-400 text-sm font-bold rounded-full border border-green-500/20">
              ✓ Free Pick & Drop Service Across Kuwait
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [end, duration, animated]);

  return <span className="counter">{count}{suffix}</span>;
};

// ─── Main Home Component ────────────────────────────────────────────────────
export default function Home() {
  const [statsAnimated, setStatsAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStatsAnimated(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const trustStats = [
    { icon: Users, number: 500, suffix: '+', label: 'Repairs Completed' },
    { icon: Award, number: 98, suffix: '%', label: 'Success Rate' },
    { icon: Truck, number: 0, suffix: 'KD', label: 'Free Pick & Drop' },
    { icon: Shield, number: 30, suffix: ' Days', label: 'Warranty' },
  ];

  const whyKCROC = [
    {
      icon: Truck,
      title: 'Free Pickup & Delivery',
      description: 'Across all Kuwait governorates',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: Package,
      title: 'Genuine Parts',
      description: 'Genuine or high-grade compatible parts',
      gradient: 'from-emerald-500 to-emerald-600'
    },
    {
      icon: ThumbsUp,
      title: 'Clear Explanations',
      description: 'Issues explained before any repair',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      icon: Shield,
      title: '30-Day Warranty',
      description: 'Extended warranty on all repairs',
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      icon: Sparkles,
      title: 'Gaming & MacBook Specialists',
      description: 'Experts in gaming laptops and MacBooks',
      gradient: 'from-pink-500 to-pink-600'
    },
    {
      icon: Gauge,
      title: 'Same/Next-Day Service',
      description: 'Fast turnaround for most jobs',
      gradient: 'from-cyan-500 to-cyan-600'
    }
  ];

  const commonRepairs = [
    { icon: Monitor, title: 'Screen Replacement', desc: 'Cracked or dead screens fixed quickly' },
    { icon: Zap, title: 'Battery Replacement', desc: 'Restore your laptop\'s full battery life' },
    { icon: Cpu, title: 'Motherboard Repair', desc: 'Chip-level diagnostics and soldering' },
  ];

  const serviceAreas = [
    'Hawalli', 
    'Salmiya', 
    'Kuwait City', 
    'Farwaniya', 
    'Jahra', 
    'Ahmadi', 
    'Mubarak Al-Kabeer'
  ];

  const reviews = [
    { name: 'Dr. Ghanim Al-Khaledi', text: 'They fixed my Predator Helios motherboard, replaced all SSD, battery and charging cables, and the machine is roaring again. I am very happy with their services; they are competent, reliable, and HONEST.', rating: 5 },
    { name: 'Mohammed Sabil', text: 'I had given my laptop for a motherboard replacement. They managed to find a compatible motherboard and replace it successfully. They provide excellent service, are highly professional, and kept me informed.', rating: 5 },
    { name: 'Ayman Elnagar', text: 'The best IT support and laptop repair shop I’ve visited in Kuwait. Fixed my battery charging issue the same day. Professional service and very convenient location. 5 stars!', rating: 5 },
    { name: 'Ashley Pabillaran', text: 'Thank you very much for fixing my laptop and upgrading the software. You did a great job quickly and the technician was very good. The price was right.', rating: 5 },
    { name: 'Raymond Licuanan', text: 'Upgraded the RAM of my old laptop with them and now its running lightning fast and like brand new. Highly praised their professionalism and quality.', rating: 5 },
    { name: 'Hala Khatib', text: 'One of my All-in-One Desktop and two of my laptops are fixed and reinstalled by these guys. The best experience, fast, quick, reliable and cheap price, really recommended.', rating: 5 }
  ];

  return (
    <>
      {/* ─── SEO & Schema Markup ─── */}
      <Helmet>
        {/* Standard Metadata */}
        <title>Expert Computer & Laptop Repair in Kuwait | KCROC</title>
        <meta
          name="description"
          content="Expert laptop & computer repair in Kuwait — MacBook, gaming PC, screen replacement, virus removal. Free pickup & delivery across all Kuwait. Call 55301913."
        />
        <link rel="canonical" href="https://www.computerrepairkuwait.com/" />

        {/* Open Graph */}
        <meta property="og:title" content="Expert Computer & Laptop Repair Kuwait | KCROC" />
        <meta 
          property="og:description" 
          content="Expert laptop & computer repair in Kuwait — MacBook, gaming PC, screen replacement, virus removal. Free pickup & delivery across all Kuwait. Call 55301913." 
        />
        <meta property="og:image" content="https://www.computerrepairkuwait.com/logo.jpg" />
        <meta property="og:url" content="https://www.computerrepairkuwait.com/" />
        <meta property="og:type" content="website" />

        {/* LocalBusiness Schema */}
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>

        {/* FAQPage Schema */}
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      {/* ─── Hero Section ─── */}
      <section className="relative py-32 bg-gradient-to-br from-slate-900 via-blue-900/20 to-emerald-900/20 overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
            Kuwait Computer <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              Repair On Call
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-2xl mx-auto font-light">
            Expert repairs for MacBooks, Gaming PCs, and Laptops. Fast, reliable, and right to your door.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="https://wa.me/96555301913" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold w-full sm:w-auto">
                <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" /> WhatsApp Us Now
              </Button>
            </a>
            <a href="tel:+96555301913">
              <Button size="lg" variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500/10 w-full sm:w-auto">
                <Phone className="mr-2 h-5 w-5" aria-hidden="true" /> Call 5530 1913
              </Button>
            </a>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          
          {/* ─── Trust Stats ─── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {trustStats.map((stat, index) => (
              <div key={index} className={`glass-card hover-lift text-center p-6 rounded-xl stagger-animation ${delays4[index % 4]}`}>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 neon-glow-blue">
                  <stat.icon className="w-8 h-8 text-white" aria-hidden="true" />
                </div>
                <div className="text-3xl font-black gradient-text mb-2">
                  <Counter end={stat.number} suffix={stat.suffix} animated={statsAnimated} />
                </div>
                <div className="text-sm text-slate-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* ─── Why KCROC ─── */}
          <h2 className="text-4xl font-bold text-center text-white mb-12">Why Choose <span className="text-blue-400">KCROC</span>?</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-24">
            {whyKCROC.map((feature, index) => (
              <div key={index} className={`glass-card hover-lift p-6 rounded-xl border-l-4 border-purple-500 stagger-animation ${delays3[index % 3]}`}>
                <feature.icon className="w-10 h-10 text-purple-400 mb-4" aria-hidden="true" />
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* ─── Common Repairs ─── */}
          <h2 className="text-4xl font-bold text-center text-white mb-12">Expert <span className="text-emerald-400">Services</span></h2>
          <div className="grid md:grid-cols-3 gap-8 mb-24">
            {commonRepairs.map((repair, index) => (
              <Link to="/services" key={index} className={`glass-card hover-lift p-6 rounded-xl stagger-animation ${delays3[index % 3]} block transition-all duration-300 hover:border-cyan-400`}>
                <repair.icon className="w-12 h-12 text-cyan-400 mb-4 mx-auto" aria-hidden="true" />
                <h3 className="text-xl font-bold text-white text-center mb-2">{repair.title}</h3>
                <p className="text-slate-400 text-center">{repair.desc}</p>
              </Link>
            ))}
          </div>

          {/* ─── Service Areas ─── */}
          <h2 className="text-4xl font-bold text-center text-white mb-12">Areas We <span className="text-blue-400">Serve</span></h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-24 max-w-6xl mx-auto">
            {serviceAreas.map((area, index) => (
              <div key={index} className={`glass-card hover-lift p-4 rounded-xl text-center stagger-animation ${delays4[index % 4]}`}>
                <MapPin className="w-6 h-6 text-emerald-400 mx-auto mb-2" aria-hidden="true" />
                <span className="text-white font-medium">{area}</span>
              </div>
            ))}
          </div>

          {/* ─── Reviews Section ─── */}
          <h2 className="text-4xl font-bold text-center text-white mb-12">Customer <span className="text-purple-400">Reviews</span></h2>
          <div className="grid md:grid-cols-3 gap-8 mb-24">
            {reviews.map((review, index) => (
              <a href="https://maps.google.com/?cid=3928987856909945446" target="_blank" rel="noopener noreferrer" key={index} className={`glass-card hover-lift p-6 rounded-xl stagger-animation ${delays3[index % 3]} block no-underline cursor-pointer transition-all duration-300 hover:border-cyan-400 hover:shadow-lg hover:scale-105`}>
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" aria-hidden="true" />
                    ))}
                  </div>
                </div>
                <p className="text-slate-300 mb-4 italic">"{review.text}"</p>
                <p className="text-white font-bold">- {review.name}</p>
              </a>
            ))}
          </div>

          {/* ─── FAQ Section ─── */}
          <h2 className="text-4xl font-bold text-center text-white mb-12">Frequently Asked <span className="text-emerald-400">Questions</span></h2>
          <div className="max-w-4xl mx-auto space-y-4 mb-24">
            {faqs.map((faq, index) => (
              <Card key={index} className="glass-card hover-lift">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-white mb-3 flex items-start gap-3">
                    <span className="text-emerald-400 flex-shrink-0">Q:</span>
                    {faq.question}
                  </h3>
                  <p className="text-slate-300 leading-relaxed pl-7">
                    <span className="text-cyan-400 font-semibold">A:</span> {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="py-24 bg-gradient-to-br from-blue-900 to-slate-900 text-center relative overflow-hidden">
        {/* Local transparent texture applied here */}
        <div className="absolute inset-0 bg-[url('/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Ready to fix your device?</h2>
          <p className="text-xl text-blue-200 mb-10 max-w-2xl mx-auto">
            Contact KCROC today. We offer free pickup and delivery anywhere in Kuwait.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
             <a href="https://wa.me/96555301913" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold w-full sm:w-auto">
                <MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" /> Chat on WhatsApp
              </Button>
            </a>
            <a href="tel:+96555301913">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900 w-full sm:w-auto">
                <Phone className="mr-2 h-5 w-5" aria-hidden="true" /> Call +965 5530 1913
              </Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
