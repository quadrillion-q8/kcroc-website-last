import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Phone, MessageCircle, Users, Truck, Zap, Shield, Award, MapPin, Clock, Wrench, ShieldCheck } from 'lucide-react';
import { useState, useEffect } from 'react';
import { BUSINESS_INFO } from '../../constants/data'; 

// Using the verified shop photo
import shopPhoto from '../../assets/shop-photo.webp'; 

export default function Hero() {
  const [statsAnimated, setStatsAnimated] = useState(false);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    const loadingTimer = setTimeout(() => { setStatsLoading(false); }, 800);
    const animationTimer = setTimeout(() => { setStatsAnimated(true); }, 1000);
    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(animationTimer);
    };
  }, []);

  const trustBadges = [
    { icon: Shield, text: "Data Privacy First" },
    { icon: Zap, text: "ESD-Safe Workshop" }, 
    { icon: Award, text: "Original Parts Only" }
  ];

  const Counter = ({ end, suffix = '', duration = 2000 }: { end: number; suffix?: string; duration?: number }) => {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    useEffect(() => {
      if (!statsAnimated || hasAnimated || statsLoading) return;
      setHasAnimated(true);
      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, [end, duration, statsAnimated, hasAnimated, statsLoading]);
    if (statsLoading) return <span className="counter loading-state">--</span>;
    return <span className="counter">{count}{suffix}</span>;
  };

  return (
    <section className="hidden lg:block min-h-screen bg-transparent pt-24 pb-16 relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-slate-950"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 stagger-animation">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-3 mb-6">
                {trustBadges.map((badge, index) => (
                  <div key={index} className={`trust-badge stagger-animation stagger-delay-${index + 1}`}>
                    <badge.icon className="w-4 h-4" /> {badge.text}
                  </div>
                ))}
              </div>
              <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-300 px-4 py-2 border border-emerald-500/30 backdrop-blur-sm">
                🏆 Kuwait's Most Trusted Tech Clinic
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                <span className="gradient-text">Laptop Repair,</span><br />
                <span className="gradient-text-purple">MacBook Repair &</span><br />
                <span className="text-white">Computer Repair</span><br />
                <span className="gradient-text">in Kuwait.</span>
              </h1>
              <div className="flex flex-wrap gap-4 text-sm font-bold text-emerald-400 uppercase tracking-widest mt-4">
                <span className="flex items-center gap-2"><Clock size={16}/> Same Day Repair</span>
                <span className="flex items-center gap-2"><ShieldCheck size={16}/> No Fix No Fee</span>
                <span className="flex items-center gap-2"><Wrench size={16}/> 30 Day Warranty</span>
                <span className="flex items-center gap-2"><Truck size={16}/> Free Pickup</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 stagger-animation stagger-delay-6">
              <Button size="lg" asChild className="btn-neon px-8 py-6 text-lg font-black shadow-2xl transition-all duration-300">
                <a href={`tel:${BUSINESS_INFO.phone}`}><Phone className="w-5 h-5 mr-2" /> Call Technician</a>
              </Button>
            </div>
          </div>

          <div className="stagger-animation stagger-delay-2 flex flex-col gap-6">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50 group bg-slate-900">
              <img 
                src={shopPhoto} 
                alt="KCROC Workshop at Al Mullah Complex" 
                className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </div>
            <Card className="glass-card shadow-2xl border-0 bg-slate-900/60 backdrop-blur-xl">
              <CardContent className="p-8">
                <div className="text-center">
                  <h3 className="text-2xl font-black text-white mb-2">Get Free Diagnostic</h3>
                  <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-white font-black py-6 text-lg">
                    <a href={`https://wa.me/${BUSINESS_INFO.cleanPhone}`} target="_blank" rel="noopener">
                      <MessageCircle className="w-5 h-5 mr-2" /> Message on WhatsApp
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
