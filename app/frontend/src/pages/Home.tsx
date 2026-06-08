import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Cpu, Gamepad2, Laptop, Monitor, Database, ShieldAlert, Star, 
  MessageCircle, Phone, ArrowRight, CheckCircle2
} from 'lucide-react';

// --- Static Data ---
const services = [
  { title: 'Chip-Level Motherboard Repair', description: 'Advanced logic board diagnostics, micro-soldering, and professional BIOS flashing.', icon: Cpu, path: '/motherboard-repair-kuwait' },
  { title: 'Gaming PC & Workstation Tuning', description: 'GPU troubleshooting, liquid cooling loop maintenance, and high-performance optimization.', icon: Gamepad2, path: '/gaming-pc-repair-kuwait' },
  { title: 'MacBook Professional Repair', description: 'Expert logic board repair, hardware diagnostics, and component replacement for all Mac models.', icon: Laptop, path: '/macbook-repair-kuwait' },
  { title: 'Screen & Glass Replacement', description: 'Crisp, high-quality replacement displays for premium laptops, MacBooks, and monitors.', icon: Monitor, path: '/screen-replacement-kuwait' },
  { title: 'Advanced Data Recovery', description: 'Secure retrieval of critical files from failing hard drives, SSDs, and corrupted media.', icon: Database, path: '/data-recovery-kuwait' },
  { title: 'OS Restoration & Virus Removal', description: 'Complete system cleanups, malware elimination, and clean operating system deployments.', icon: ShieldAlert, path: '/virus-removal-kuwait' }
];

const faqs = [
  { question: "Do you offer free pickup and delivery in Kuwait?", answer: "Yes! We provide completely free pickup and delivery service across all Kuwait governorates." },
  { question: "How long do repairs usually take?", answer: "Most laptop diagnostics are completed same-day. Common repairs typically take 24-48 hours." },
  { question: "Is my data safe during repair?", answer: "Absolutely. Data safety is our top priority. We never access, copy, or modify your personal files." },
  { question: "Do you repair Apple MacBooks?", answer: "Yes, we specialize in MacBook repairs including screen, battery, keyboard, and liquid damage." },
  { question: "Do you repair gaming PCs?", answer: "Yes! We are experts in gaming laptop and desktop PC repair." }
];

const reviews = [
  { name: 'Dr. Ghanim Al-Khaledi', text: 'They fixed my Predator Helios motherboard... competent, reliable, and HONEST.', rating: 5 },
  { name: 'Mohammed Sabil', text: 'I had given my laptop for a motherboard replacement. They managed to find a compatible motherboard and replace it successfully.', rating: 5 },
  { name: 'Ayman Elnagar', text: 'The best IT support and laptop repair shop I’ve visited in Kuwait.', rating: 5 }
];

const Counter = ({ end, suffix = '', animated }: { end: number; suffix?: string; animated: boolean }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!animated) return;
    const duration = 2000;
    let startTime: number | null = null;
    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, animated]);
  return <span className="counter">{count}{suffix}</span>;
};

export default function Home() {
  const [statsAnimated, setStatsAnimated] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) setStatsAnimated(true);
    }, { threshold: 0.5 });
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
      <Helmet>
        <title>Expert Computer & Laptop Repair in Kuwait | KCROC</title>
        <meta name="description" content="Professional diagnostics and free pickup/delivery anywhere in Kuwait. 4.9 Star Rated." />
      </Helmet>
      
      {/* Hero */}
      <section className="pt-32 pb-20 px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full text-emerald-400 text-sm font-medium mb-6">
          <Star size={14} className="fill-emerald-400" />
          <span>Rated 4.9/5 by 150+ Kuwait Customers</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black max-w-4xl mx-auto tracking-tight">
          Reliable Computer Repair <span className="text-emerald-500">On Call</span>
        </h1>
        <p className="mt-6 text-xl text-gray-400 max-w-2xl mx-auto">
          Professional hardware diagnostics and free pick & drop service anywhere in Kuwait.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
            <a href="https://wa.me/96555301913" className="flex items-center justify-center gap-2 bg-green-500 px-8 py-4 rounded-full font-bold text-lg hover:bg-green-600 transition-all shadow-lg hover:shadow-green-500/20">
              <MessageCircle className="h-5 w-5" /> WhatsApp Us
            </a>
            <a href="tel:+96555301913" className="flex items-center justify-center gap-2 bg-gray-800 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-700 transition-all border border-gray-700">
              <Phone className="h-5 w-5" /> Call Now
            </a>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-12 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-6">
        {[ { end: 4.9, suf: '', label: 'Rating' }, { end: 150, suf: '+', label: 'Verified Reviews' }, { end: 0, suf: ' KD', label: 'Free Pick & Drop' }, { end: 30, suf: ' Days', label: 'Warranty' } ].map((s, i) => (
          <div key={i} className="bg-gray-900/40 p-6 rounded-2xl border border-gray-800 text-center hover:border-emerald-500/30 transition-colors">
            <div className="text-4xl font-black text-white"><Counter end={s.end} suffix={s.suf} animated={statsAnimated} /></div>
            <div className="text-xs text-gray-400 uppercase tracking-widest mt-2">{s.label}</div>
          </div>
        ))}
      </section>

      {/* Services Grid */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4">Professional Hardware Solutions</h2>
        <p className="text-gray-400 text-center mb-16">High-precision repairs for laptops, desktops, and gaming rigs.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <Link key={i} to={s.path} className="bg-gray-900/30 p-8 rounded-3xl border border-gray-800 hover:border-emerald-500/50 hover:bg-gray-900/60 transition-all group">
              <div className="bg-gray-800/50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-500/20 transition-colors">
                <s.icon className="w-7 h-7 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">{s.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">{s.description}</p>
              <div className="text-emerald-500 text-sm font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20 max-w-6xl mx-auto px-6 border-t border-gray-900">
        <h2 className="text-4xl font-bold text-center mb-16">What Our Customers Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <div key={i} className="bg-gray-900/40 p-8 rounded-3xl border border-gray-800 flex flex-col h-full">
              <div className="flex text-yellow-500 mb-6 gap-1">
                {[...Array(r.rating)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
              </div>
              <p className="text-gray-300 italic mb-8 flex-grow">"{r.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center font-bold text-emerald-400">
                  {r.name.charAt(0)}
                </div>
                <p className="font-bold">{r.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
