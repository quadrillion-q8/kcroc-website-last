// File: app/frontend/src/components/home/Hero.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Phone, MessageCircle, Clock, ShieldCheck, Truck, Shield, Zap, Cpu } from 'lucide-react';
import { BUSINESS_INFO } from '../../constants/data'; 
import { IMAGES } from '../../constants/images';

export default function Hero() {
  const trustBadges = [
    { icon: Shield, text: "Data Privacy" },
    { icon: Zap, text: "ESD-Safe Lab" }, 
    { icon: Cpu, text: "Micro-Soldering" }
  ];

  return (
    <section className="w-full min-h-[90vh] bg-slate-950 pt-24 pb-16 relative overflow-hidden flex items-center">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-6">
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-6">
                {trustBadges.map((badge, index) => (
                  <div key={index} className="flex items-center gap-1 text-xs font-bold text-slate-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                    <badge.icon className="w-3 h-3" /> {badge.text}
                  </div>
                ))}
              </div>
              
              <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-300 px-4 py-2 border border-emerald-500/30">
                🏆 Kuwait's Component-Level Tech Experts
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                Kuwait’s Expert <br />
                <span className="text-cyan-400">Component-Level</span><br />
                Repair Service.
              </h1>
              
              <p className="text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                We don’t just swap expensive parts—we fix them. From logic board micro-soldering to gaming PC diagnostics, KCROC restores your device for a fraction of the cost of a replacement.
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-xs font-bold text-emerald-400 uppercase tracking-widest mt-4">
                <span className="flex items-center gap-2"><Clock size={16}/> 30-Day Warranty</span>
                <span className="flex items-center gap-2"><ShieldCheck size={16}/> No Fix No Fee</span>
                <span className="flex items-center gap-2"><Truck size={16}/> Free Pickup</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" asChild className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 px-8 py-6 text-lg font-black shadow-2xl">
                <a href={`tel:${BUSINESS_INFO.phone}`} aria-label="Call our computer repair technician now">
                  <Phone className="w-5 h-5 mr-2" /> Book Free Pickup
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-slate-700 bg-slate-900/50 text-white hover:bg-slate-800 px-8 py-6 text-lg font-bold">
                <a href="/services" aria-label="View all KCROC repair services">
                  View All Services
                </a>
              </Button>
            </div>
          </div>

          {/* Visual Content */}
          <div className="flex flex-col gap-6">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50 bg-slate-900">
              <img 
                src={IMAGES.brand.heroBanner.src} 
                alt={IMAGES.brand.heroBanner.alt} 
                className="w-full h-56 md:h-72 object-cover"
                loading="eager"
                fetchPriority="high"
              />
            </div>
            <Card className="border-0 bg-slate-900/60 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="text-center">
                  <h3 className="text-xl font-black text-white mb-2">Need a precise diagnostic?</h3>
                  <p className="text-sm text-slate-400 mb-4">Send us your device symptoms. We trace the fault.</p>
                  <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-white font-black py-6 text-lg" aria-label="Message us on WhatsApp for a free repair diagnostic">
                    <a href={`https://wa.me/${BUSINESS_INFO.cleanPhone}`} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-5 h-5 mr-2" /> WhatsApp Our Techs
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
