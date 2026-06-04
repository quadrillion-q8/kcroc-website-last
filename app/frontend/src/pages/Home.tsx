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

const faqs = [
  { question: "Do you offer free pickup and delivery in Kuwait?", answer: "Yes! We provide completely free pickup and delivery service across all Kuwait governorates including Hawalli, Salmiya, Farwaniya, Kuwait City, Jahra, Ahmadi, and Mubarak Al-Kabeer." },
  { question: "How long do repairs usually take?", answer: "Most laptop diagnostics are completed same-day. Common repairs like screen replacement, battery replacement, or Windows reinstall typically take 24-48 hours. Complex motherboard repairs may take 3-5 days." },
  { question: "Is my data safe during repair?", answer: "Absolutely. Data safety is our top priority. We never access, copy, or modify your personal files." },
  { question: "Do you repair Apple MacBooks?", answer: "Yes, we specialize in MacBook repairs including screen replacement, battery replacement, keyboard repair, liquid damage repair, and logic board diagnostics for all MacBook models." },
  { question: "Do you repair gaming PCs and custom builds?", answer: "Yes! We are experts in gaming laptop and desktop PC repair." },
  { question: "What areas of Kuwait do you cover?", answer: "We serve all Kuwait governorates: Hawalli, Salmiya, Farwaniya, Kuwait City, Jahra, Ahmadi, and Mubarak Al-Kabeer with free pickup and delivery service." },
  { question: "Do you offer emergency or after-hours service?", answer: "Yes, we offer emergency service for critical business systems. Contact us at +965 5530 1913." }
];

const brands = ["Apple MacBooks", "ASUS ROG Gaming Laptops", "MSI Gaming Systems", "Acer Predator Laptops", "HP Laptops", "Dell Inspiron & XPS", "Lenovo ThinkPad", "Alienware Gaming PCs", "Custom Desktop Computers"];

const reviews = [
  { name: 'Dr. Ghanim Al-Khaledi', text: 'They fixed my Predator Helios motherboard... competent, reliable, and HONEST.', rating: 5 },
  { name: 'Mohammed Sabil', text: 'I had given my laptop for a motherboard replacement. They managed to find a compatible motherboard and replace it successfully.', rating: 5 },
  { name: 'Ayman Elnagar', text: 'The best IT support and laptop repair shop I’ve visited in Kuwait.', rating: 5 }
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

// --- Counter Component with Intersection Observer ---
const Counter = ({ end, suffix = '', duration = 2000, animated = false }: { end: number; suffix?: string; duration?: number; animated: boolean }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!animated) return;
    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration, animated]);
  return <span className="counter">{count}{suffix}</span>;
};

// --- Main Home Component ---
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
    <div className="min-h-screen bg-gray-950 text-white selection:bg-green-500/30">
      <Helmet>
        <title>Expert Computer & Laptop Repair in Kuwait | KCROC</title>
        <meta name="description" content="Expert laptop & computer repair in Kuwait — MacBook, gaming PC, screen replacement, virus removal. Free pickup & delivery across all Kuwait. Call 55301913." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-gray-900 to-black text-center">
        <div className="container mx-auto px-4 space-y-6">
          <h1 className="text-4xl md:text-7xl font-black tracking-tight">
            Kuwait Computer <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Repair On Call</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Professional diagnostics and reliable hardware repairs with 100% free pickup and delivery.</p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="bg-green-500 hover:bg-green-600"><MessageCircle className="mr-2" /> WhatsApp Us</Button>
          </div>
        </div>
      </section>

      {/* Stats Section (Animated on View) */}
      <section ref={statsRef} className="py-12 px-4 max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-y border-gray-800 py-8">
          {[
            { end: 500, suffix: '+', label: 'Repairs Done' },
            { end: 98, suffix: '%', label: 'Success Rate' },
            { end: 0, suffix: ' KD', label: 'Free Pick & Drop' },
            { end: 30, suffix: ' Days', label: 'Warranty' }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl font-extrabold"><Counter end={stat.end} suffix={stat.suffix} animated={statsAnimated} /></div>
              <div className="text-sm text-gray-400 uppercase tracking-widest mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services, Why Choose, Brands, Reviews, Areas, FAQ sections follow same structural patterns... */}
    </div>
  );
}
