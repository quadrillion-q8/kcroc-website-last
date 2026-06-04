import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Cpu, Gamepad2, Laptop, Monitor, Database, ShieldAlert, ArrowRight, Star, CheckCircle,
  MessageCircle, Phone, MapPin, Truck, Shield, Package, ThumbsUp, Sparkles, Gauge
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// ... [Keep your existing 'services', 'faqs', 'brands', 'reviews', 'whyKCROC', 'serviceAreas' arrays here] ...

// --- Counter Component ---
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
        <meta name="description" content="Expert laptop & computer repair in Kuwait. Free pickup & delivery across all Kuwait. Call 55301913." />
      </Helmet>

      {/* HERO SECTION */}
      <section className="relative py-24 bg-gradient-to-br from-gray-900 to-black text-center">
        {/* ... [Insert your Hero section code from your previous version] ... */}
      </section>

      {/* STATS SECTION */}
      <section ref={statsRef} className="py-12 px-4 max-w-5xl mx-auto">
        {/* ... [Keep the Counter grid] ... */}
      </section>

      {/* SERVICES GRID */}
      <section className="py-12 md:py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12">Professional Hardware Solutions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
             <Link key={i} to={service.path} className="group relative block rounded-2xl bg-gray-900/40 border border-gray-800 p-6 transition-all hover:-translate-y-1">
                {/* ... [Service card content] ... */}
             </Link>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US, BRANDS, REVIEWS, AREAS, FAQ, LOCAL SEO & FINAL CTA */}
      {/* YOU CAN NOW COPY THESE SECTIONS FROM YOUR ORIGINAL FILE AND PASTE THEM BELOW */}
      
    </div>
  );
}
