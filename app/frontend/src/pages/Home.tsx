import { Helmet } from 'react-helmet-async';
import { Phone, Clock, Shield, Wrench, Laptop, Monitor, HardDrive, Cpu, MapPin, Truck, Award, Zap, Users, Star, CheckCircle, Printer, MessageCircle, DollarSign, ThumbsUp, Package, Gauge, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// ─── Master FAQ Data (Single Source of Truth) ───────────────────────────────
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

// ─── FAQPage Schema ─────────────────────────────────────────────────────────
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
};

// ─── LocalBusiness Schema ───────────────────────────────────────────────────
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Kuwait Computer Repair On Call",
  "alternateName": "KCROC",
  "url": "https://www.computerrepairkuwait.com",
  "telephone": "+96555301913",
  "image": "https://www.computerrepairkuwait.com/logo.jpg",
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
  ]
};

// ─── Utility Arrays for Custom CSS Animation Delays ─────────────────────────
const delays3 = ['stagger-delay-1', 'stagger-delay-2', 'stagger-delay-3'];
const delays4 = ['stagger-delay-1', 'stagger-delay-2', 'stagger-delay-3', 'stagger-delay-4'];

// ─── Optimized Counter Component ────────────────────────────────────────────
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
    
    let startTime: number;
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
