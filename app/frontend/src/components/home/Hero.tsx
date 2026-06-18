import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Phone, MessageCircle, Users, Truck, Zap, Shield, Award, MapPin, Clock, Wrench, ShieldCheck } from 'lucide-react';
import { useState, useEffect } from 'react';
import { BUSINESS_INFO } from '../../constants/data'; 

// IMPORT YOUR BACKGROUND IMAGE
import heroBg from '../../assets/hero-bg.webp'; 

// 1. IMPORT YOUR NEW SHOP PHOTO HERE
import shopPhoto from '../../assets/shop-photo.webp'; 

export default function Hero() {
  const [statsAnimated, setStatsAnimated] = useState(false);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setStatsLoading(false);
    }, 800);

    const animationTimer = setTimeout(() => {
      setStatsAnimated(true);
    }, 1000);

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
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }, [end, duration, statsAnimated, hasAnimated, statsLoading]);

    if (statsLoading) {
      return <span className="counter loading-state">--</span>;
    }

    return <span className="counter">{count}{suffix}</span>;
  };

  return (
    <>
      {/* Mobile Hero Section */}
      <section className="bg-transparent pt-32 pb-8 relative overflow-hidden lg:hidden">
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-white text-2xl font-bold text-center leading-tight mb-3">
            Laptop Repair, MacBook Repair &<br />Computer Repair in Kuwait
          </h1>

          <div className="flex flex-wrap justify-center gap-2 mb-4 text-xs font-semibold text-emerald-100">
             <span className="flex items-center"><Clock className="w-3 h-3 mr-1"/> Same Day Repair</span>
             <span className="flex items-center"><ShieldCheck className="w-3 h-3 mr-1"/> No Fix No Fee</span>
             <span className="flex items-center"><Wrench className="w-3 h-3 mr-1"/> 30 Day Warranty</span>
             <span className="flex items-center"><Truck className="w-3 h-3 mr-1"/> Free Pickup</span>
          </div>

          <p className="text-blue-100 text-base text-center leading-relaxed mb-6">
            Free pickup & delivery. Expert engineer. Data-safe repairs for home and office.
          </p>

          <div className="space-y-3 mb-4">
            <Button 
              size="lg" 
              asChild
              className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-full shadow-lg min-h-[44px]"
            >
              <a href={`tel:${BUSINESS_INFO.phone}`}>
                <Phone className="w-5 h-5 mr-2" />
                Call Technician
              </a>
            </Button>
            <Button 
              size="lg" 
              asChild
              className="w-full h-14 bg-green-600 hover:bg-green-700 text-white font-bold text-lg rounded-full shadow-lg min-h-[44px]"
            >
              <a href={`https://wa.me/${BUSINESS_INFO.cleanPhone}`} target="_blank" rel="noopener">
                <MessageCircle className="w-5 h-5 mr-2" />
                Get Free Diagnostic
              </a>
            </Button>
          </div>

          <p className="text-white/70 text-sm text-center font-medium mt-2">
            4.9★ Google rating · Trusted by 150+ verified customers
          </p>
        </div>
      </section>

      {/* Desktop Hero Section */}
      <section className="hidden lg:block min-h-screen bg-transparent pt-24 pb-16 relative overflow-hidden">
        
        {/* BACKGROUND IMAGE SETUP */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBg} 
            alt="KCROC Workshop Repair" 
            className="w-full h-full object-cover opacity-40" 
            loading="eager" 
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-900/40"></div>
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-[80px]"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[80px]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 stagger-animation">
              <div className="space-y-6">
                
                <div className="flex flex-wrap gap-3 mb-6">
                  {trustBadges.map((badge, index) => (
                    <div key={index} className={`trust-badge stagger-animation stagger-delay-${index + 1}`}>
                      <badge.icon className="w-4 h-4" />
                      {badge.text}
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

                <p className="text-xl text-slate-300 leading-relaxed">
                  Premium computer repair clinic delivering professional-grade service. 
                  We don't just fix problems — we{' '}
                  <span className="font-semibold text-emerald-400">upgrade your entire experience</span>.
                </p>
              </div>

              <div className="flex gap-12 py-6">
                <div className="text-center stagger-animation stagger-delay-3">
                  <div className={`stat-number gradient-text mb-1 ${statsLoading ? 'loading-state' : ''}`}>
                    <Counter end={500} suffix="+" />
                  </div>
                  <div className="text-sm text-slate-400 font-medium">Repairs Completed</div>
                </div>
                 <div className="text-center stagger-animation stagger-delay-4">
                  <div className={`stat-number gradient-text mb-1 ${statsLoading ? 'loading-state' : ''}`}>
                    <Counter end={98} suffix="%" />
                  </div>
                  <div className="text-sm text-slate-400 font-medium">Success Rate</div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="glass-card hover-lift p-4 rounded-xl stagger-animation stagger-delay-4 bg-slate-900/60 backdrop-blur-md">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center mb-3 neon-glow-green">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Pro Technicians</h3>
                    <p className="text-sm text-slate-400">Experienced professionals</p>
                  </div>
                </div>
                
                <div className="glass-card hover-lift p-4 rounded-xl stagger-animation stagger-delay-5 bg-slate-900/60 backdrop-blur-md">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-3 neon-glow-blue">
                    <Truck className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">FREE Pickup & Delivery</h3>
                    <p className="text-sm text-slate-400">Anywhere in Kuwait</p>
                  </div>
                </div>
                
                <div className="glass-card hover-lift p-4 rounded-xl stagger-animation stagger-delay-6 bg-slate-900/60 backdrop-blur-md">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center mb-3 neon-glow-red">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Visit Our Lab</h3>
                    <p className="text-sm text-slate-400">Al Mullah Complex, Basement Shop 19</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 stagger-animation stagger-delay-6">
                <Button 
                  size="lg" 
                  asChild
                  className="btn-neon px-8 py-6 text-lg font-black shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 min-h-[44px]"
                >
                  <a href={`tel:${BUSINESS_INFO.phone}`}>
                    <Phone className="w-5 h-5 mr-2" />
                    Call Technician
                  </a>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  asChild
                  className="border-2 border-green-500 text-green-400 hover:bg-green-500 hover:text-black font-black px-8 py-6 text-lg backdrop-blur-md bg-green-500/10 hover:shadow-green-500/25 transition-all duration-300 min-h-[44px]"
                >
                  <a href={`https://wa.me/${BUSINESS_INFO.cleanPhone}`} target="_blank" rel="noopener">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Request Free Pickup
                  </a>
                </Button>
              </div>
            </div>

            {/* Right Content - Enhanced Booking Card & Shop Photo */}
            {/* 2. ADDED flex container to stack the photo and the card beautifully */}
            <div className="stagger-animation stagger-delay-2 flex flex-col gap-6">
              
              {/* 3. NEW SHOP IMAGE CONTAINER */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50 group bg-slate-900">
                <img 
                  src={shopPhoto} 
                  alt="KCROC Workshop at Al Mullah Complex" 
                  className="w-full h-48 sm:h-56 object-cover transform group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                {/* Subtle gradient to ensure the transition down to the booking card looks natural */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent pointer-events-none"></div>
              </div>

              {/* Existing Booking Card */}
              <Card className="glass-card hover-lift shadow-2xl border-0 neon-glow-blue bg-slate-900/60 backdrop-blur-xl">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="text-center">
                      <h3 className="text-2xl font-black text-white mb-2 gradient-text">Get Free Diagnostic</h3>
                      <p className="text-slate-300">
                        Premium response — usually within{' '}
                        <span className="text-emerald-400 font-bold">5 minutes</span>. 
                        Describe your device and issue.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="glass-card p-4 rounded-lg border border-emerald-500/30 bg-slate-900/80">
                        <p className="font-bold text-emerald-400 mb-1 flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Direct Hotline:
                        </p>
                        <a 
                          href={`tel:${BUSINESS_INFO.phone}`} 
                          className="text-white hover:text-emerald-400 font-black text-lg transition-colors"
                        >
                          {BUSINESS_INFO.phone}
                        </a>
                      </div>

                      <Button 
                        asChild
                        size="lg"
                        className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-black py-6 text-lg shadow-lg hover:shadow-green-500/30 transition-all duration-300 min-h-[44px]"
                      >
                        <a href={`https://wa.me/${BUSINESS_INFO.cleanPhone}`} target="_blank" rel="noopener">
                          <MessageCircle className="w-5 h-5 mr-2" />
                          Message on WhatsApp
                        </a>
                      </Button>
                    </div>

                    <div className="text-center pt-4 border-t border-slate-700">
                      <p className="text-sm text-slate-400 flex items-center justify-center gap-2">
                        <Award className="w-4 h-4 text-emerald-400" />
                        ⭐ Rated 4.9/5 by 150+ verified customers
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
