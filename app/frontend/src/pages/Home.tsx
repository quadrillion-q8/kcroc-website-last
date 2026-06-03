import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Cpu, Gamepad2, Laptop, Monitor, Database, ShieldAlert, ArrowRight, Star, CheckCircle,
  MessageCircle, Phone, MapPin, Users, Award, Truck, Shield, Package, ThumbsUp, Sparkles, Gauge, Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// ==========================================
// 1. STATIC DATA (Declared outside to optimize memory)
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

const faqs = [
  {
    question: "Do you offer free pickup and delivery in Kuwait?",
    answer: "Yes! We provide completely free pickup and delivery service across all Kuwait governorates including Hawalli, Salmiya, Farwaniya, Kuwait City, Jahra, Ahmadi, and Mubarak Al-Kabeer."
  },
  {
    question: "How long do repairs usually take?",
    answer: "Most laptop diagnostics are completed same-day. Common repairs like screen replacement, battery replacement, or Windows reinstall typically take 24-48 hours. Complex motherboard repairs may take 3-5 days."
  },
  {
    question: "Is my data safe during repair?",
    answer: "Absolutely. Data safety is our top priority. We never access, copy, or modify your personal files. For repairs requiring data backup, we inform you first and get your explicit permission."
  },
  {
    question: "Do you repair Apple MacBooks?",
    answer: "Yes, we specialize in MacBook repairs including screen replacement, battery replacement, keyboard repair, liquid damage repair, and logic board diagnostics for all MacBook models."
  },
  {
    question: "Do you repair gaming PCs and custom builds?",
    answer: "Yes! We are experts in gaming laptop and desktop PC repair. We handle high-performance systems including Alienware, ASUS ROG, MSI, Predator, and custom-built gaming rigs."
  },
  {
    question: "What areas of Kuwait do you cover?",
    answer: "We serve all Kuwait governorates: Hawalli, Salmiya, Farwaniya, Kuwait City, Jahra, Ahmadi, and Mubarak Al-Kabeer with free pickup and delivery service."
  },
  {
    question: "Do you offer emergency or after-hours service?",
    answer: "Yes, we offer emergency service for critical business systems or urgent home office issues in Kuwait. Contact us at +965 5530 1913 for emergency support."
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

const reviews = [
  { name: 'Dr. Ghanim Al-Khaledi', text: 'They fixed my Predator Helios motherboard, replaced all SSD, battery and charging cables, and the machine is roaring again. I am very happy with their services; they are competent, reliable, and HONEST.', rating: 5 },
  { name: 'Mohammed Sabil', text: 'I had given my laptop for a motherboard replacement. They managed to find a compatible motherboard and replace it successfully. They provide excellent service, are highly professional, and kept me informed.', rating: 5 },
  { name: 'Ayman Elnagar', text: 'The best IT support and laptop repair shop I’ve visited in Kuwait. Fixed my battery charging issue the same day. Professional service and very convenient location. 5 stars!', rating: 5 },
  { name: 'Ashley Pabillaran', text: 'Thank you very much for fixing my laptop and upgrading the software. You did a great job quickly and the technician was very good. The price was right.', rating: 5 },
  { name: 'Raymond Licuanan', text: 'Upgraded the RAM of my old laptop with them and now its running lightning fast and like brand new. Highly praised their professionalism and quality.', rating: 5 },
  { name: 'Hala Khatib', text: 'One of my All-in-One Desktop and two of my laptops are fixed and reinstalled by these guys. The best experience, fast, quick, reliable and cheap price, really recommended.', rating: 5 }
];

const whyKCROC = [
  { icon: Truck, title: 'Free Pickup & Delivery', description: 'Across all Kuwait governorates' },
  { icon: Package, title: 'Genuine Parts', description: 'Genuine or high-grade compatible parts' },
  { icon: ThumbsUp, title: 'Clear Explanations', description: 'Issues explained before any repair' },
  { icon: Shield, title: '30-Day Warranty', description: 'Extended warranty on all repairs' },
  { icon: Sparkles, title: 'Gaming & MacBook Specialists', description: 'Experts in gaming laptops and MacBooks' },
  { icon: Gauge, title: 'Same/Next-Day Service', description: 'Fast turnaround for most jobs' }
];

const serviceAreas = ['Hawalli', 'Salmiya', 'Kuwait City', 'Farwaniya', 'Jahra', 'Ahmadi', 'Mubarak Al-Kabeer'];

// ==========================================
// 2. COUNTER COMPONENT (With Explicit Animation Frame Handle Cleanup)
// ==========================================

const Counter = ({ 
  end, 
  suffix = '', 
  duration = 2000, 
  animated = false 
}: { 
  end: number; 
  suffix?: string; 
  duration?: number; 
  animated?: boolean 
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!animated) return;
    
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, animated]);

  return <span className="counter">{count}{suffix}</span>;
};

// ==========================================
// 3. MAIN PAGE COMPONENT
// ==========================================

export default function Home() {
  const [statsAnimated, setStatsAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStatsAnimated(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  // ------------------------------------------
  // NEW: Google Ads Tracking Function Added Here
  // ------------------------------------------
  const trackConversion = () => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
          'send_to': 'AW-402583081/SWdgCPrgwrMcEKnc-78B',
          'value': 1.0,
          'currency': 'USD'
      });
      console.log('Google Ads Conversion Tracked!');
    }
  };
  
  // Structured Schema Configurations
  const schemaGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://www.computerrepairkuwait.com/#localbusiness",
        "name": "Kuwait Computer Repair On Call (KCROC)",
        "image": "https://www.computerrepairkuwait.com/logo.jpg",
        "telephone": "+96555301913",
        "url": "https://www.computerrepairkuwait.com",
        "priceRange": "$$",
        "openingHours": "Mo-Su 10:00-22:00",
        "areaServed": "Kuwait",
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
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://www.computerrepairkuwait.com/#website",
        "url": "https://www.computerrepairkuwait.com",
        "name": "Kuwait Computer Repair On Call"
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.computerrepairkuwait.com/#faq",
        "mainEntity": faqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white selection:bg-green-500/30">
      <Helmet>
        <title>Expert Computer & Laptop Repair in Kuwait | KCROC</title>
        <meta name="description" content="Expert laptop & computer repair in Kuwait — MacBook, gaming PC, screen replacement, virus removal. Free pickup & delivery across all Kuwait. Call 55301913." />
        <link rel="canonical" href="https://www.computerrepairkuwait.com/" />
        <meta property="og:title" content="Expert Computer & Laptop Repair Kuwait | KCROC" />
        <meta property="og:description" content="Expert laptop & computer repair in Kuwait — MacBook, gaming PC, screen replacement, virus removal. Free pickup & delivery across all Kuwait. Call 55301913." />
        <meta property="og:image" content="https://www.computerrepairkuwait.com/logo.jpg" />
        <meta property="og:url" content="https://www.computerrepairkuwait.com/" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(schemaGraph)}</script>
      </Helmet>

      {/* HERO SECTION WITH OPTIMIZED H1 SIGNALS & CONVERSION TRUST BADGES */}
      <section className="relative py-12 md:py-20 lg:py-24 bg-gradient-to-br from-gray-900 via-gray-950 to-black overflow-hidden border-b border-gray-900">
        <div className="container mx-auto px-4 text-center relative z-10 space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
            Kuwait Computer <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              Repair On Call
            </span>
            <span className="block text-2xl md:text-3xl font-semibold text-slate-300 mt-3">
              KCROC – MacBook, Gaming PC & Motherboard Specialists
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
            Get professional diagnostics and reliable hardware repairs handled by experienced technicians. We make it completely hassle-free with 100% free pickup and delivery straight to your door anywhere in Kuwait.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
            
            {/* NEW: onClick added to Hero WhatsApp Button */}
            <a 
              href="https://wa.me/96555301913" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full sm:w-auto"
              onClick={trackConversion}
            >
              <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white font-bold w-full">
                <MessageCircle className="mr-2 h-5 w-5" /> WhatsApp Us Now
              </Button>
            </a>
            
            {/* NEW: onClick added to Hero Phone Button */}
            <a 
              href="tel:+96555301913" 
              className="w-full sm:w-auto"
              onClick={trackConversion}
            >
              <Button size="lg" variant="outline" className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10 w-full">
                <Phone className="mr-2 h-5 w-5" /> Call 5530 1913
              </Button>
            </a>
          </div>

          {/* ─── Hero Trust Badges ─── */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {[
              '✓ Free Pickup Across Kuwait',
              '✓ Same-Day Diagnostics',
              '✓ 30-Day Warranty',
              '✓ MacBook & Gaming PC Experts',
            ].map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold bg-white/5 border border-white/10 text-slate-300 backdrop-blur-sm"
              >
                {badge}
              </span>
            ))}
          </div>

          {/* Visible rating display — satisfies Google's on-page requirement */}
          <div className="flex items-center gap-2 justify-center mt-4">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" aria-hidden="true" />
              ))}
            </div>
            <span className="text-white font-bold">4.9</span>
            <span className="text-slate-400 text-sm">· 150+ Google Reviews</span>
          </div>

        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-8 md:py-12 px-4 max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-y border-gray-800/60 py-8">
          <div className="text-center md:border-r border-gray-800/60 last:border-0 p-2">
            <div className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
              <Counter end={500} suffix="+" animated={statsAnimated} />
            </div>
            <div className="text-xs md:text-sm text-gray-400 mt-2 font-medium tracking-wide uppercase">Repairs Done</div>
          </div>
          <div className="text-center md:border-r border-gray-800/60 last:border-0 p-2">
            <div className="text-3xl md:text-5xl font-extrabold text-green-500 tracking-tight">
              <Counter end={98} suffix="%" animated={statsAnimated} />
            </div>
            <div className="text-xs md:text-sm text-gray-400 mt-2 font-medium tracking-wide uppercase">Success Rate</div>
          </div>
          <div className="text-center md:border-r border-gray-800/60 last:border-0 p-2">
            <div className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
              <Counter end={0} suffix=" KD" animated={statsAnimated} />
            </div>
            <div className="text-xs md:text-sm text-gray-400 mt-2 font-medium tracking-wide uppercase">Free Pick & Drop</div>
          </div>
          <div className="text-center md:border-r border-gray-800/60 last:border-0 p-2">
            <div className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
              <Counter end={30} suffix=" Days" animated={statsAnimated} />
            </div>
            <div className="text-xs md:text-sm text-gray-400 mt-2 font-medium tracking-wide uppercase">Warranty</div>
          </div>
        </div>
      </section>

      {/* INTERLINKING SERVICE GRID SECTION */}
      <section className="py-12 md:py-20 px-6 max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Professional Hardware Solutions
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            Select a specialized service below to view our technical workflows, expert repair parameters, and structural diagnostics.
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

      {/* WHY CHOOSE US SECTION */}
      <section className="py-12 md:py-20 px-6 max-w-6xl mx-auto space-y-12 border-t border-gray-900">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white">
          Why Choose <span className="text-blue-400">KCROC</span>?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {whyKCROC.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={index} className="bg-gray-900/30 border border-gray-800/60 p-6 rounded-xl border-l-4 border-l-blue-500">
                <IconComponent className="w-10 h-10 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* AI SEARCH OPTIMIZATION SECTION */}
      <section className="py-12 md:py-20 px-6 max-w-6xl mx-auto border-t border-gray-800/50">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 space-y-6 text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              Laptop & PC Brands We Repair in Kuwait
            </h2>
            <p className="text-sm md:text-base text-gray-400 leading-relaxed">
              Kuwait Computer Repair On Call (KCROC) repairs Apple MacBooks, ASUS ROG gaming laptops, MSI gaming systems, Acer Predator laptops, HP laptops, Dell Inspiron and XPS models, Lenovo ThinkPad devices, Alienware gaming PCs, and custom desktop computers across Kuwait.
            </p>
            <p className="text-sm text-gray-400 leading-relaxed">
              Whether you need complex logic board micro-soldering for a MacBook or professional cooling system restoration for a high-performance gaming laptop, our repair processes are designed to restore your hardware back to factory standards.
            </p>
          </div>

          <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
            {brands.map((brand, index) => (
              <div key={index} className="flex items-center space-x-3 bg-gray-900/50 border border-gray-800 p-4 rounded-xl">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span className="text-sm font-semibold text-gray-200">{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS SECTION */}
      <section className="py-12 md:py-20 px-6 max-w-6xl mx-auto space-y-12 border-t border-gray-900">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            Customer Testimonials
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <a 
              href="https://maps.google.com/?cid=3928987856909945446" 
              target="_blank" 
              rel="noopener noreferrer" 
              key={index} 
              className="bg-gray-800/40 border border-gray-700/60 rounded-2xl p-6 shadow-xl hover:border-gray-600 transition-colors block group"
            >
              <div className="flex text-yellow-500 mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 italic text-sm leading-relaxed mb-4">
                "{review.text}"
              </p>
              <p className="text-white font-bold text-sm group-hover:text-blue-400 transition-colors">
                - {review.name}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* SERVICE AREAS SELECTION ROW */}
      <section className="py-12 max-w-6xl mx-auto px-6 border-t border-gray-900">
        <h2 className="text-2xl font-bold text-center text-white mb-8">Areas We Serve Across Kuwait</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
          {serviceAreas.map((area, index) => (
            <div key={index} className="bg-gray-900/50 border border-gray-800 p-4 rounded-xl text-center flex flex-col items-center justify-center gap-2">
              <MapPin className="w-5 h-5 text-green-400" />
              <span className="text-gray-200 font-medium text-xs sm:text-sm">{area}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-12 md:py-20 px-6 max-w-3xl mx-auto space-y-8 border-t border-gray-900">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-center text-white">
          Frequently Asked Questions
        </h2>
        <div className="divide-y divide-gray-800">
          {faqs.map((faq, index) => (
            <details key={index} className="py-5 group cursor-pointer">
              <summary className="flex justify-between items-center font-semibold text-base sm:text-lg text-white list-none marker:hidden">
                <span>{faq.question}</span>
                <span className="text-green-500 transition-transform group-open:rotate-180 font-bold text-xl">+</span>
              </summary>
              <p className="text-gray-400 mt-4 leading-relaxed text-sm sm:text-base">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* LONG-FORM LOCAL SEO SECTION */}
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
            <p className="text-gray-300 text-sm">
              Hawalli, Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19
            </p>
            <p className="text-gray-300 text-sm font-medium">
              Call for technical dispatch: <a href="tel:55301913" className="text-white font-bold hover:text-green-400 transition-colors">55301913</a>
            </p>
            <div className="inline-block mt-4 px-5 py-1.5 bg-green-500/10 text-green-400 text-xs sm:text-sm font-bold rounded-full border border-green-500/20">
              ✓ Free Pick & Drop Service Across Kuwait Area
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="py-16 bg-gradient-to-br from-blue-950/40 via-gray-950 to-black text-center relative border-t border-gray-900">
        <div className="container mx-auto px-4 space-y-6 relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">Ready to fix your device?</h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-400 max-w-xl mx-auto font-light">
            Contact KCROC today. We manage technical pickups and safe drop-off logistics anywhere across Kuwait completely free of charge.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
             
             {/* NEW: onClick added to CTA WhatsApp Button */}
             <a 
               href="https://wa.me/96555301913" 
               target="_blank" 
               rel="noopener noreferrer" 
               className="w-full sm:w-auto"
               onClick={trackConversion}
             >
              <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white font-bold w-full">
                <MessageCircle className="mr-2 h-5 w-5" /> Chat on WhatsApp
              </Button>
            </a>
            
            {/* NEW: onClick added to CTA Phone Button */}
            <a 
              href="tel:+96555301913" 
              className="w-full sm:w-auto"
              onClick={trackConversion}
            >
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 w-full">
                <Phone className="mr-2 h-5 w-5" /> Call +965 5530 1913
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
