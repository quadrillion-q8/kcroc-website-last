import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Phone, MessageCircle, Clock, Wrench, ShieldCheck, Truck, Shield, Zap, Award } from 'lucide-react';
import { BUSINESS_INFO } from '../../constants/data'; 
import { IMAGES } from '../../constants/images'; // 👈 Using your centralized image dictionary

export default function Hero() {
  const trustBadges = [
    { icon: Shield, text: "Data Privacy" },
    { icon: Zap, text: "ESD-Safe" }, 
    { icon: Award, text: "Original Parts" }
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
                🏆 Kuwait's Most Trusted Tech Clinic
              </Badge>
              <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
                <span className="text-cyan-400">Laptop Repair,</span><br />
                <span className="text-purple-400">MacBook Repair &</span><br />
                Computer Repair<br />
                <span className="text-cyan-400">in Kuwait.</span>
              </h1>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-xs font-bold text-emerald-400 uppercase tracking-widest mt-4">
                <span className="flex items-center gap-2"><Clock size={16}/> Same Day</span>
                <span className="flex items-center gap-2"><ShieldCheck size={16}/> No Fix No Fee</span>
                <span className="flex items-center gap-2"><Truck size={16}/> Free Pickup</span>
              </div>
            </div>

            <Button size="lg" asChild className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 px-8 py-6 text-lg font-black shadow-2xl">
              <a href={`tel:${BUSINESS_INFO.phone}`} aria-label="Call our computer repair technician now">
                <Phone className="w-5 h-5 mr-2" /> Call Technician
              </a>
            </Button>
          </div>

          {/* Visual Content */}
          <div className="flex flex-col gap-6">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50 bg-slate-900">
              {/* ✅ FIXED: Now correctly pointing to heroBanner from your images.ts file */}
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
                  <h3 className="text-xl font-black text-white mb-4">Get Free Diagnostic</h3>
                  <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-white font-black py-6 text-lg" aria-label="Message us on WhatsApp for a free repair diagnostic">
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
