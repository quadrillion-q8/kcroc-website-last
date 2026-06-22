import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Phone, MessageCircle, Users, Truck, Zap, Shield, Award, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes'; // 🧠 The Centralized Registry

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
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-blue-700/30 to-slate-900/40"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex justify-center mb-6">
            <img 
              src="https://res.cloudinary.com/dsbwzags3/image/upload/v1769908596/logo_btpfls.png" 
              alt="Kuwait Computer Repair On Call Logo" 
              className="h-16 w-auto object-contain drop-shadow-xl"
            />
          </div>

          <h1 className="text-white text-2xl font-bold text-center leading-tight mt-4 mb-2">
            Same-day computer & laptop<br />repair in Kuwait
          </h1>

          <p className="text-blue-100 text-base text-center leading-relaxed mb-5">
            Free pickup & delivery. Expert engineer. Data-safe repairs for home and office.
          </p>

          <div className="space-y-3 mb-3">
            <Button size="lg" asChild className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-full shadow-lg min-h-[44px]">
              <a href="tel:+96555301913">
                <Phone className="w-5 h-5 mr-2" />
                Call Now
              </a>
            </Button>
            <Button size="lg" asChild className="w-full h-14 bg-green-600 hover:bg-green-700 text-white font-bold text-lg rounded-full shadow-lg min-h-[44px]">
              <a href="https://wa.me/96555301913" target="_blank" rel="noopener">
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp Us
              </a>
            </Button>
          </div>

          <p className="text-white/70 text-sm text-center font-medium mt-3 mb-6">
            4.9★ Google rating · Trusted by 500+ customers across Kuwait
          </p>
        </div>
      </section>

      {/* Desktop Hero Section */}
      <section className="hidden lg:block min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/20 to-emerald-900/20 pt-24 pb-16 relative overflow-hidden">
        {/* ... (Keep background elements as they are) */}
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 stagger-animation">
              {/* ... (Keep Trust Badges and Title as they are) */}
              
              {/* CTA Buttons - UPDATED TO ROUTES */}
              <div className="flex flex-col sm:flex-row gap-4 stagger-animation stagger-delay-6">
                <Button size="lg" asChild className="btn-neon px-8 py-6 text-lg font-black transition-all duration-300 min-h-[44px]">
                  <a href="tel:+96555301913">
                    <Phone className="w-5 h-5 mr-2" />
                    Call Now: +965 5530 1913
                  </a>
                </Button>
                
                {/* Example of linking to a page using ROUTES */}
                <Button size="lg" variant="outline" asChild className="border-2 border-green-500 ...">
                  <Link to={ROUTES.book}>
                    <CalendarClock className="w-5 h-5 mr-2" />
                    Book Pickup Now
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right Content */}
            <div className="stagger-animation stagger-delay-2">
              <Card className="glass-card ...">
                <CardContent className="p-8">
                  {/* ... (Keep content as is) */}
                  <Button asChild size="lg" className="w-full bg-gradient-to-r from-green-500 to-green-600 ...">
                    <a href="https://wa.me/96555301913" target="_blank" rel="noopener">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Message on WhatsApp
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
