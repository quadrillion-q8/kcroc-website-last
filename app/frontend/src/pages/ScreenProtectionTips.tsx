// File: app/frontend/src/pages/ScreenProtectionTips.tsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ShieldCheck, AlertTriangle, CheckCircle2, 
  Phone, MessageCircle, Sun, Wind, Droplets, Monitor, Laptop 
} from 'lucide-react';
import { Link } from 'react-router-dom';

import { KCROC_GRAPH } from '../data/graph';

// Dynamic Business Data
const business = KCROC_GRAPH.business!;

export default function ScreenProtectionTips() {
  const protectionTips = [
    { title: '1. Invest in a Quality Protective Case', description: 'Use a padded sleeve or hard-shell case to buffer against knocks, bumps, or compression damage during transit.', icon: ShieldCheck, color: 'text-emerald-500', bgColor: 'bg-emerald-500/10', borderColor: 'border-emerald-500/30' },
    { title: '2. Mind Your Environment', description: 'Avoid placing your laptop on beds, floors, or desk edges where accidental stepping or sitting—the leading causes of cracked screens—can occur.', icon: AlertTriangle, color: 'text-orange-500', bgColor: 'bg-orange-500/10', borderColor: 'border-orange-500/30' },
    { title: '3. Lift with Care', description: 'Always lift by the base, never the screen. Holding by the display puts torque on hinges and the glass, leading to fatigue cracks.', icon: Laptop, color: 'text-cyan-500', bgColor: 'bg-cyan-500/10', borderColor: 'border-cyan-500/30' },
    { title: '4. Keep Liquids Away', description: 'Liquids destroy screens and internal motherboards. Keep coffee and water well away from your workspace to protect your system.', icon: Droplets, color: 'text-blue-500', bgColor: 'bg-blue-500/10', borderColor: 'border-blue-500/30' },
    { title: '5. Clean Safely', description: 'Never spray directly on the screen. Use a screen-safe cleaner on a microfiber cloth to prevent liquid seepage.', icon: Monitor, color: 'text-purple-500', bgColor: 'bg-purple-500/10', borderColor: 'border-purple-500/30' },
    { title: '6. Clear the Keyboard', description: 'Before closing, check for tiny crumbs or sand. Objects trapped between screen and keys cause pressure points and fractures.', icon: Wind, color: 'text-yellow-500', bgColor: 'bg-yellow-500/10', borderColor: 'border-yellow-500/30' },
    { title: '7. Skip the Webcam Cover', description: 'Plastic webcam covers are too thick for modern laptops; they create concentrated pressure that often cracks the display panel.', icon: Sun, color: 'text-red-500', bgColor: 'bg-red-500/10', borderColor: 'border-red-500/30' }
  ];

  const faq = [
    { q: 'Can a cracked laptop screen be repaired or must it be replaced?', a: 'Unfortunately, internal LCD/LED cracks cannot be repaired; the entire panel must be replaced. We perform this service professionally at our Hawalli workshop.' },
    { q: 'Do you provide free pickup for screen replacements in Kuwait?', a: 'Yes! We offer free pickup and delivery service across all Kuwait governorates for screen replacement services.' }
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      
      {/* 🚀 Independent SEO Helmet */}
      <Helmet>
        <title>7 Tips to Protect Your Laptop Screen | KCROC Kuwait</title>
        <meta name="description" content="Expert tips from Kuwait Computer Repair On Call to help you avoid broken screens, compression damage, and costly display repairs." />
        <link rel="canonical" href={`${business.websiteUrl}/laptop-screen-protection-tips`} />
      </Helmet>

      {/* Hero */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-500/10"></div>
        <div className="container mx-auto max-w-5xl relative z-10">
          <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 px-6 py-2 text-sm font-semibold mb-6">
            <ShieldCheck className="w-4 h-4 mr-2 inline" /> Screen Protection Guide
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8">
            How to Protect Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Laptop Screen</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-10">
            7 Expert Tips from Kuwait Computer Repair On Call to help you avoid broken screens and costly display repairs.
          </p>
        </div>
      </section>

      {/* Tips Grid */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-6">
            {protectionTips.map((tip, index) => (
              <Card key={index} className={`bg-slate-900/50 ${tip.borderColor} backdrop-blur-sm hover:scale-[1.02] transition-transform`}>
                <CardHeader>
                  <div className={`${tip.bgColor} w-16 h-16 rounded-xl flex items-center justify-center mb-4`}>
                    <tip.icon className={`w-8 h-8 ${tip.color}`} />
                  </div>
                  <CardTitle className="text-2xl text-white mb-3">{tip.title}</CardTitle>
                  <CardDescription className="text-slate-300 text-base">{tip.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Repair Solution */}
      <section className="py-24 px-4 bg-slate-900/50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-8">Accidents happen—we’re here to help.</h2>
          <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-emerald-500/30">
            <CardContent className="p-12">
              <p className="text-lg text-slate-300 mb-8">
                If your screen is damaged, flickering, or showing signs of internal leakage, we specialize in professional display replacements and hardware repairs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-lg px-8 py-6 font-black" asChild>
                  <Link to="/book">Book Free Pickup</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-emerald-500 text-emerald-400 text-lg px-8 py-6 font-black" asChild>
                  <a href={`tel:+${business.telephone}`}><Phone className="mr-2"/> Call +{business.telephone}</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faq.map((item, i) => (
              <Card key={i} className="bg-slate-900/50 border-gray-800">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2 text-white">{item.q}</h3>
                  <p className="text-slate-400">{item.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
