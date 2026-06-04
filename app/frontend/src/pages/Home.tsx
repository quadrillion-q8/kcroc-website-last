import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Cpu, Gamepad2, Laptop, Monitor, Database, ShieldAlert, ArrowRight, Star, CheckCircle,
  MessageCircle, Phone, MapPin, Truck, Shield, Package, ThumbsUp, Sparkles, Gauge
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// --- Static Data ---
const services = [
  { title: 'Chip-Level Motherboard Repair', description: 'Advanced logic board diagnostics, micro-soldering, and professional BIOS flashing.', icon: Cpu, path: '/motherboard-repair-kuwait', gradient: 'from-green-500/20 to-emerald-500/5', borderColor: 'group-hover:border-green-500/50' },
  { title: 'Gaming PC & Workstation Tuning', description: 'GPU troubleshooting, liquid cooling loop maintenance, and high-performance optimization.', icon: Gamepad2, path: '/gaming-pc-repair-kuwait', gradient: 'from-purple-500/20 to-indigo-500/5', borderColor: 'group-hover:border-purple-500/50' },
  { title: 'MacBook Professional Repair', description: 'Expert logic board repair, hardware diagnostics, and component replacement for all Mac models.', icon: Laptop, path: '/macbook-repair-kuwait', gradient: 'from-blue-500/20 to-cyan-500/5', borderColor: 'group-hover:border-blue-500/50' },
  { title: 'Screen & Glass Replacement', description: 'Crisp, high-quality replacement displays for premium laptops, MacBooks, and monitors.', icon: Monitor, path: '/screen-replacement-kuwait', gradient: 'from-amber-500/20 to-orange-500/5', borderColor: 'group-hover:border-amber-500/50' },
  { title: 'Advanced Data Recovery', description: 'Secure retrieval of critical files from failing hard drives, SSDs, and corrupted media.', icon: Database, path: '/data-recovery-kuwait', gradient: 'from-red-500/20 to-rose-500/5', borderColor: 'group-hover:border-red-500/50' },
  { title: 'OS Restoration & Virus Removal', description: 'Complete system cleanups, malware elimination, and clean operating system deployments.', icon: ShieldAlert, path: '/virus-removal-kuwait', gradient: 'from-teal-500/20 to-cyan-500/5', borderColor: 'group-hover:border-teal-500/50' }
];

const whyKCROC = [
  { icon: Truck, title: 'Free Pickup & Delivery', description: 'Across all Kuwait governorates' },
  { icon: Package, title: 'Genuine Parts', description: 'Genuine or high-grade compatible parts' },
  { icon: ThumbsUp, title: 'Clear Explanations', description: 'Issues explained before any repair' },
  { icon: Shield, title: '30-Day Warranty', description: 'Extended warranty on all repairs' },
  { icon: Sparkles, title: 'Gaming & MacBook Specialists', description: 'Experts in gaming laptops and MacBooks' },
  { icon: Gauge, title: 'Same/Next-Day Service', description: 'Fast turnaround for most jobs' }
];

// --- Counter Component ---
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

// --- Home Component ---
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
    <div className="min-h-screen bg-gray-950 text-white">
      <Helmet>
        <title>Expert Computer & Laptop Repair in Kuwait | KCROC</title>
      </Helmet>

      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-gray-900 to-black text-center">
        <h1 className="text-4xl md:text-7xl font-black">Kuwait Computer Repair On Call</h1>
        <p className="mt-6 text-xl text-gray-400">Professional diagnostics and free pickup/delivery anywhere in Kuwait.</p>
      </section>

      {/* Stats */}
      <section ref={statsRef} className="py-12 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {[ { end: 500, suf: '+', label: 'Repairs' }, { end: 98, suf: '%', label: 'Success' }, { end: 0, suf: ' KD', label: 'Pick & Drop' }, { end: 30, suf: ' Days', label: 'Warranty' } ].map((s, i) => (
          <div key={i} className="text-center">
            <div className="text-4xl font-bold"><Counter end={s.end} suffix={s.suf} animated={statsAnimated} /></div>
            <div className="text-sm text-gray-400 uppercase mt-2">{s.label}</div>
          </div>
        ))}
      </section>

      {/* Services Grid */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Professional Hardware Solutions</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <Link key={i} to={s.path} className="bg-gray-900/40 p-6 rounded-2xl border border-gray-800 hover:border-blue-500 transition-all">
              <s.icon className="w-10 h-10 mb-4" />
              <h3 className="text-xl font-bold mb-2">{s.title}</h3>
              <p className="text-gray-400 text-sm">{s.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
