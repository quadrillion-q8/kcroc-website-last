import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Phone, MessageCircle, Users, Truck, Zap, Shield, Award } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function Hero() {
  const [statsAnimated, setStatsAnimated] = useState(false);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    const loadingTimer = setTimeout(() => setStatsLoading(false), 800);
    const animationTimer = setTimeout(() => setStatsAnimated(true), 1000);
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

  const Counter = ({ end, suffix = '' }: { end: number; suffix?: string }) => {
    const [count, setCount] = useState(0);
    const hasAnimated = useRef(false);

    useEffect(() => {
      if (!statsAnimated || hasAnimated.current || statsLoading) return;
      hasAnimated.current = true;
      
      let start: number;
      const duration = 2000;
      const animate = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, [end, statsAnimated, statsLoading]);

    return <span>{statsLoading ? '--' : `${count}${suffix}`}</span>;
  };

  return (
    <>
      {/* Mobile Hero Section */}
      <section className="lg:hidden min-h-screen bg-gradient-to-br from-blue-400 via-blue-600 to-slate-900 pt-20 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-blue-700/30 to-slate-900/40" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-white text-3xl font-black leading-tight mt-4 mb-4">
            Same-day computer & laptop repair in Kuwait
          </h1>
          <p className="text-blue-100 text-base mb-8">
            Free pickup & delivery. Expert engineer. Data-safe repairs.
          </p>
          <div className="space-y-3">
            <Button size="lg" asChild className="w-full h-14 bg-blue-600 rounded-full font-bold text-lg">
              <a href="tel:+96555301913" aria-label="Call KCROC for repair services">
                <Phone className="w-5 h-5 mr-2" /> Call Now
              </a>
            </Button>
            <Button size="lg" asChild className="w-full h-14 bg-green-600 rounded-full font-bold text-lg">
              <a href="https://wa.me/96555301913" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp KCROC for support">
                <MessageCircle className="w-5 h-5 mr-2" /> WhatsApp Us
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Desktop Hero Section */}
      <section className="hidden lg:block min-h-screen bg-slate-900 pt-24 pb-16 relative overflow-hidden">
        {/* ... desktop content preserved as in your provided snippet ... */}
      </section>

      {/* Sticky Bottom Bar - Mobile Only */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white shadow-lg border-t border-gray-200">
        <div className="flex h-16">
          <a href="tel:+96555301913" className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white font-bold text-lg">
            <Phone className="w-5 h-5" /> Call
          </a>
          <a href="https://wa.me/96555301913" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white font-bold text-lg">
            <MessageCircle className="w-5 h-5" /> WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
