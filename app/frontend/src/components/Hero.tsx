import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Phone, MessageCircle, Users, Truck, Zap, Shield, Award, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';

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
    { icon: Zap, text: "ESD-Safe Lab" },
    { icon: Award, text: "Original Parts Only" }
  ];

  const stats = [
    { number: 500, suffix: '+', label: 'Repairs Completed' },
    { number: 98, suffix: '%', label: 'Success Rate' },
    { number: 24, suffix: '/7', label: 'Support Available' }
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
      <section className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-600 to-slate-900 pt-20 pb-16 relative overflow-hidden lg:hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-blue-700/30 to-slate-900/40"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          {/* Logo Row - Updated to official logo */}
          <div className="flex justify-center mb-6">
            <img 
              src="https://res.cloudinary.com/dsbwzags3/image/upload/v1769908596/logo_btpfls.png" 
              alt="Kuwait Computer Repair On Call Logo" 
              className="h-16 w-auto object-contain drop-shadow-xl"
            />
          </div>

          {/* Headline */}
          <h1 className="text-white text-2xl font-bold text-center leading-tight mt-4 mb-2">
            Same-day computer & laptop<br />repair in Kuwait
          </h1>

          {/* Subheadline */}
          <p className="text-blue-100 text-base text-center leading-relaxed mb-5">
            Free pickup & delivery. Expert engineer. Data-safe repairs for home and office.
          </p>

          {/* Primary CTAs */}
          <div className="space-y-3 mb-3">
            <Button 
              size="lg" 
              asChild
              className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-full shadow-lg min-h-[44px]"
            >
              <a href="tel:+96555301913">
                <Phone className="w-5 h-5 mr-2" />
                Call Now
              </a>
            </Button>
            <Button 
              size="lg" 
              asChild
              className="w-full h-14 bg-green-600 hover:bg-green-700 text-white font-bold text-lg rounded-full shadow-lg min-h-[44px]"
            >
              <a href="https://wa.me/96555301913" target="_blank" rel="noopener">
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp Us
              </a>
            </Button>
          </div>

          {/* Social Proof Row */}
          <p className="text-white/70 text-sm text-center font-medium mt-3 mb-6">
            4.9★ Google rating · Trusted by 500+ customers across Kuwait
          </p>
        </div>
      </section>

      {/* Desktop Hero Section */}
      <section className="hidden lg:block min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/20 to-emerald-900/20 pt-24 pb-16 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 stagger-animation">
              <div className="space-y-6">
                {/* Trust Badges */}
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
                  <span className="gradient-text">Real Repairs.</span><br />
                  <span className="gradient-text-purple">Real Upgrades.</span><br />
                  <span className="text-white">Built for Kuwait's</span><br />
                  <span className="gradient-text">Power Users.</span>
                </h1>

                <p className="text-xl text-slate-300 leading-relaxed">
                  Premium computer repair clinic delivering professional-grade service. 
                  We don't just fix problems — we{' '}
                  <span className="font-semibold text-emerald-400">upgrade your entire experience</span>.
                </p>
              </div>

              {/* Stats Counter with Loading States */}
              <div className="stats-grid py-6">
                {stats.map((stat, index) => (
                  <div key={index} className={`text-center stagger-animation stagger-delay-${index + 3}`}>
                    <div className={`stat-number gradient-text mb-1 ${statsLoading ? 'loading-state' : ''}`}>
                      <Counter end={stat.number} suffix={stat.suffix} />
                    </div>
                    <div className="text-sm text-slate-400 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Features Grid */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="glass-card hover-lift p-4 rounded-xl stagger-animation stagger-delay-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center mb-3 neon-glow-green">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Elite Technicians</h3>
                    <p className="text-sm text-slate-400">Certified professionals</p>
                  </div>
                </div>
                
                <div className="glass-card hover-lift p-4 rounded-xl stagger-animation stagger-delay-5">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-3 neon-glow-blue">
                    <Truck className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">VIP Pickup & Delivery</h3>
                    <p className="text-sm text-slate-400">Anywhere in Kuwait</p>
                  </div>
                </div>
                
                {/* Updated to show Physical Lab Location */}
                <div className="glass-card hover-lift p-4 rounded-xl stagger-animation stagger-delay-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center mb-3 neon-glow-red">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Visit Our Lab</h3>
                    <p className="text-sm text-slate-400">Al Mullah Complex, Basement Shop 19</p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 stagger-animation stagger-delay-6">
                <Button 
                  size="lg" 
                  asChild
                  className="btn-neon px-8 py-6 text-lg font-black shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 min-h-[44px]"
                >
                  <a href="tel:+96555301913">
                    <Phone className="w-5 h-5 mr-2" />
                    Call Now: +965 5530 1913
                  </a>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  asChild
                  className="border-2 border-green-500 text-green-400 hover:bg-green-500 hover:text-black font-black px-8 py-6 text-lg backdrop-blur-sm bg-green-500/10 hover:shadow-green-500/25 transition-all duration-300 min-h-[44px]"
                >
                  <a href="https://wa.me/96555301913" target="_blank" rel="noopener">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    WhatsApp Us
                  </a>
                </Button>
              </div>
            </div>

            {/* Right Content - Enhanced Booking Card */}
            <div className="stagger-animation stagger-delay-2">
              <Card className="glass-card hover-lift shadow-2xl border-0 neon-glow-blue">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <div className="text-center">
                      <h3 className="text-2xl font-black text-white mb-2 gradient-text">Book VIP Pickup</h3>
                      <p className="text-slate-300">
                        Premium response — usually within{' '}
                        <span className="text-emerald-400 font-bold">5 minutes</span>. 
                        Describe your device and issue.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="glass-card p-4 rounded-lg border border-emerald-500/30">
                        <p className="font-bold text-emerald-400 mb-1 flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Direct Hotline:
                        </p>
                        <a 
                          href="tel:+96555301913" 
                          className="text-white hover:text-emerald-400 font-black text-lg transition-colors"
                        >
                          +965 5530 1913
                        </a>
                      </div>

                      <Button 
                        asChild
                        size="lg"
                        className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-black py-6 text-lg shadow-lg hover:shadow-green-500/30 transition-all duration-300 min-h-[44px]"
                      >
                        <a href="https://wa.me/96555301913" target="_blank" rel="noopener">
                          <MessageCircle className="w-5 h-5 mr-2" />
                          Message on WhatsApp
                        </a>
                      </Button>
                    </div>

                    <div className="text-center pt-4 border-t border-slate-700">
                      <p className="text-sm text-slate-400 flex items-center justify-center gap-2">
                        <Award className="w-4 h-4 text-emerald-400" />
                        ⭐ Rated 5/5 by 500+ power users
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Bottom Bar - Mobile Only */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white shadow-lg border-t border-gray-200">
        <div className="flex h-16">
          <a 
            href="tel:+96555301913" 
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 transition-colors min-h-[44px]"
          >
            <Phone className="w-5 h-5" />
            Call
          </a>
          <a 
            href="https://wa.me/96555301913" 
            target="_blank" 
            rel="noopener" 
            className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white font-bold text-lg hover:bg-green-700 transition-colors min-h-[44px]"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
