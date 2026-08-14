// File: app/frontend/src/pages/GamingPCCooling.tsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Thermometer, Wind, Droplets, AlertTriangle, CheckCircle2, Phone, MessageCircle, Shield, Zap, Clock, Flame, Fan, Sun, CloudRain } from 'lucide-react';
import { Link } from 'react-router-dom';

import { KCROC_GRAPH } from '../data/graph';

// Dynamic Business Data
const business = KCROC_GRAPH.business!;

export default function GamingPCCooling() {
  const statistics = [
    { value: '50°C+', label: 'Summer Temperatures', icon: Sun, color: 'text-orange-400' },
    { value: '24/7', label: 'Cooling Required', icon: Fan, color: 'text-cyan-400' },
    { value: '100%', label: 'Performance Protected', icon: Shield, color: 'text-emerald-400' }
  ];

  const challenges = [
    {
      title: 'Extreme Heat',
      description: 'Scorching summer temperatures push gaming PCs to their thermal limits, causing overheating.',
      icon: Sun,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/30',
      image: '/images/gaming-laptop-overheating-repair.webp'
    },
    {
      title: 'Desert Dust',
      description: 'Fine sand infiltrates cooling systems, clogging fans and reducing airflow efficiency.',
      icon: Wind,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/30',
      image: '/images/dusty-laptop-heatsink-fan-dust-buildup.webp'
    },
    {
      title: 'Humidity Shifts',
      description: 'Coastal humidity combined with AC usage accelerates thermal paste degradation.',
      icon: CloudRain,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      image: '/images/corsair-tm30-thermal-paste-package.webp'
    },
    {
      title: 'Component Stress',
      description: 'Constant thermal cycling stresses components, increasing motherboard failure rates.',
      icon: AlertTriangle,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/30',
      image: '/images/asus-rog-strix-motherboard-cpu-socket.webp'
    }
  ];

  const temperatureThresholds = [
    {
      component: 'CPU',
      safe: '30-70°C',
      warning: '70-85°C',
      critical: '85°C+',
      description: 'Throttles at 85°C, risking damage above 95°C'
    },
    {
      component: 'GPU',
      safe: '30-75°C',
      warning: '75-85°C',
      critical: '85°C+',
      description: 'Clocks reduce at 83°C, hotspots exceed 100°C'
    },
    {
      component: 'RAM',
      safe: '30-45°C',
      warning: '45-55°C',
      critical: '55°C+',
      description: 'Memory errors and instability increase above 50°C'
    },
    {
      component: 'SSD/NVMe',
      safe: '30-50°C',
      warning: '50-70°C',
      critical: '70°C+',
      description: 'Storage throttles at 70°C, data risks above 80°C'
    }
  ];

  const coolingSolutions = [
    {
      title: 'Premium Paste Replacement',
      description: 'High-performance compound application.',
      price: '15 KD',
      duration: '1-2 hours',
      icon: Droplets,
      image: '/images/gaming-motherboard-cpu-fresh-thermal-paste.webp',
      benefits: [
        'Arctic MX-5 / Kryonaut',
        'Drop temps 10-20°C',
        'CPU & GPU service'
      ]
    },
    {
      title: 'Airflow Optimization',
      description: 'Strategic fan and airflow configuration.',
      price: '20 KD',
      duration: '2-3 hours',
      icon: Wind,
      image: '/images/pc-case-radiator-fans-installation.webp',
      benefits: [
        'High-airflow fans',
        'Pressure balancing',
        'Cable management'
      ]
    },
    {
      title: 'CPU Cooler Upgrade',
      description: 'Tower air or AIO liquid installation.',
      price: '30 KD',
      duration: '2-4 hours',
      icon: Fan,
      image: '/images/nzxt-aio-liquid-cooler-pc-build.webp',
      benefits: [
        'Noctua / be quiet!',
        'Drop temps 20-30°C',
        'Whisper-quiet'
      ]
    },
    {
      title: 'GPU Thermal Service',
      description: 'Graphics card cooling enhancement.',
      price: '25 KD',
      duration: '2-3 hours',
      icon: Zap,
      image: '/images/motherboard-gpu-chip-thermal-paste-applied.webp',
      benefits: [
        'Die paste replacement',
        'VRAM pad upgrade',
        'Hotspot reduction'
      ]
    }
  ];

  const maintenanceTips = [
    {
      title: 'Monthly Filter Clean',
      description: 'Remove dust filters every 2-4 weeks.',
      icon: Wind,
      frequency: '2-4 weeks'
    },
    {
      title: 'Quarterly Deep Clean',
      description: 'Full internal component cleaning.',
      icon: Fan,
      frequency: '3 months'
    },
    {
      title: 'Annual Paste Refresh',
      description: 'Replace CPU/GPU paste yearly.',
      icon: Droplets,
      frequency: 'Annually'
    },
    {
      title: 'Temp Monitoring',
      description: 'Track loads with MSI Afterburner.',
      icon: Thermometer,
      frequency: 'Continuous'
    }
  ];

  const gamingBrands = [
    {
      brand: 'ASUS ROG',
      models: 'Strix, TUF, Zephyrus',
      common: 'Dust in dense fin arrays, paste degradation',
    },
    {
      brand: 'MSI Gaming',
      models: 'Trident, Aegis, MAG',
      common: 'Fan bearing wear, VRM overheating',
    },
    {
      brand: 'Alienware',
      models: 'Aurora, Area-51',
      common: 'Loud operation, thermal throttling',
    },
    {
      brand: 'Custom Builds',
      models: 'All configurations',
      common: 'Poor initial airflow, inadequate cooling',
    }
  ];

  const faq = [
    {
      q: 'Why is gaming PC cooling critical in Kuwait?',
      a: 'Extreme summer temperatures combined with desert dust make cooling challenging. Without it, PCs overheat, throttle, and suffer reduced component lifespan.'
    },
    {
      q: 'Should I use air cooling or liquid cooling?',
      a: 'Both work well if properly maintained. AIO liquid coolers offer better performance for high-end CPUs, while quality air coolers perform similarly at a lower cost.'
    },
    {
      q: 'How much does gaming PC cooling service cost?',
      a: 'Thermal paste replacement starts at 15 KD. Case fan upgrades are 20 KD. All services include our free pick & drop offering.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white selection:bg-cyan-500/30">
      
      {/* 🚀 Independent SEO Helmet */}
      <Helmet>
        <title>Gaming PC Cooling Services Kuwait | KCROC</title>
        <meta name="description" content="Professional cooling solutions designed for extreme climates. Protect your gaming PC from overheating and thermal throttling in Kuwait." />
        <link rel="canonical" href={`${business.websiteUrl}/blog/gaming-pc-cooling`} />
      </Helmet>

      {/* ─── HERO SECTION ─── */}
      <section className="relative pt-24 pb-8 sm:pb-24 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-orange-500/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(6,182,212,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(249,115,22,0.1),transparent_50%)]"></div>
        
        <div className="container mx-auto max-w-6xl relative z-10 mt-8 sm:mt-0">
          <div className="text-center space-y-4 sm:space-y-6">
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold">
              <Thermometer className="w-4 h-4 mr-2 inline" />
              Gaming PC Cooling Experts
            </Badge>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Keep Your Gaming PC Cool<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                in Kuwait's Heat
              </span>
            </h1>
            <p className="text-sm sm:text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Professional cooling solutions designed for extreme climates. Protect your investment from overheating and thermal throttling.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4 sm:pt-6">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-base sm:text-lg px-6 sm:px-8 py-6 shadow-lg shadow-orange-500/30 w-full sm:w-auto"
                asChild
              >
                <a href={`tel:+${business.telephone}`}>
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Call: +{business.telephone}
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/10 text-base sm:text-lg px-6 sm:px-8 py-6 w-full sm:w-auto"
                asChild
              >
                <a href={`https://wa.me/${business.telephone}?text=I need gaming PC cooling service`} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  WhatsApp Us
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATISTICS ─── */}
      <section className="py-8 sm:py-16 px-4 sm:px-6 bg-slate-900/50 backdrop-blur-sm relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-8">
            {statistics.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-cyan-500/20 backdrop-blur-sm hover:border-cyan-500/40 transition-all">
                  <CardContent className="pt-6 sm:pt-8 text-center p-4 sm:p-6">
                    <div className="flex justify-center mb-2 sm:mb-4">
                      <div className="bg-cyan-500/10 p-3 sm:p-4 rounded-full">
                        <Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${stat.color}`} />
                      </div>
                    </div>
                    <div className="text-3xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-1 sm:mb-2">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-300 font-medium tracking-wide uppercase">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── CHALLENGES ─── */}
      <section className="py-8 sm:py-24 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 sm:mb-16">
            <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30 px-3 sm:px-4 py-1.5 md:py-2 text-[10px] sm:text-sm mb-3 sm:mb-4">
              The Challenge
            </Badge>
            <h2 className="text-2xl sm:text-5xl font-bold text-white mb-3 sm:mb-6">
              Climate vs. Gaming PCs
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {challenges.map((challenge, index) => {
              const Icon = challenge.icon;
              return (
                <Card key={index} className={`bg-slate-900/50 ${challenge.borderColor} backdrop-blur-sm hover:scale-[1.02] transition-transform overflow-hidden flex flex-col`}>
                  <div className="h-32 sm:h-48 overflow-hidden shrink-0">
                    <img 
                      src={challenge.image}
                      alt={challenge.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <CardHeader className="p-4 md:p-6 flex-grow">
                    <div className="flex items-center gap-3 mb-2 md:mb-3">
                      <div className={`${challenge.bgColor} p-2 md:p-3 rounded-lg md:rounded-xl`}>
                        <Icon className={`w-4 h-4 md:w-6 md:h-6 ${challenge.color}`} />
                      </div>
                    </div>
                    <CardTitle className="text-lg md:text-2xl text-white mb-1 md:mb-2 leading-tight">{challenge.title}</CardTitle>
                    <CardDescription className="text-slate-300 text-xs md:text-sm leading-relaxed">
                      {challenge.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── TEMPERATURE MONITORING ─── */}
      <section className="py-8 sm:py-24 px-4 sm:px-6 bg-slate-900/50 backdrop-blur-sm relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 sm:mb-16">
            <Badge className="bg-red-500/20 text-red-300 border-red-500/30 px-3 sm:px-4 py-1.5 md:py-2 text-[10px] sm:text-sm mb-3 sm:mb-4">
              <Flame className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 inline" />
              Monitoring
            </Badge>
            <h2 className="text-2xl sm:text-5xl font-bold text-white mb-3 sm:mb-6">
              Critical Thresholds
            </h2>
          </div>

          <div className="mb-8 md:mb-12 flex justify-center">
            <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-cyan-500/20 backdrop-blur-sm w-full max-w-2xl">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-white text-center text-sm md:text-xl">Temperature Safety Zones</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <img 
                  src="https://mgx-backend-cdn.metadl.com/generate/images/681399/2026-02-01/d1e21d3e-0010-4d04-b480-ce46e0782b3c.png"
                  alt="Temperature zones diagram"
                  className="w-full h-auto object-contain rounded-lg"
                  loading="lazy"
                />
              </CardContent>
            </Card>
          </div>

          <div className="scroll-row gap-3 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 md:grid-cols-4 sm:gap-6">
            {temperatureThresholds.map((threshold, index) => (
              <Card key={index} className="scroll-row-item w-[85%] sm:w-auto bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-cyan-500/20 backdrop-blur-sm">
                <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-4">
                  <CardTitle className="text-base sm:text-xl text-white flex items-center gap-2 sm:gap-3">
                    <Thermometer className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                    {threshold.component}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0 space-y-3 md:space-y-4">
                  <div className="space-y-2">
                    <div className="bg-emerald-500/10 border border-emerald-500/30 rounded p-1.5 sm:p-2 flex justify-between items-center">
                      <span className="text-[10px] md:text-xs text-emerald-400 font-bold">SAFE</span>
                      <span className="text-[10px] md:text-sm text-white font-bold">{threshold.safe}</span>
                    </div>
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded p-1.5 sm:p-2 flex justify-between items-center">
                      <span className="text-[10px] md:text-xs text-yellow-400 font-bold">WARN</span>
                      <span className="text-[10px] md:text-sm text-white font-bold">{threshold.warning}</span>
                    </div>
                    <div className="bg-red-500/10 border border-red-500/30 rounded p-1.5 sm:p-2 flex justify-between items-center">
                      <span className="text-[10px] md:text-xs text-red-400 font-bold">CRIT</span>
                      <span className="text-[10px] md:text-sm text-white font-bold">{threshold.critical}</span>
                    </div>
                  </div>
                  <p className="text-slate-300 text-[11px] sm:text-sm leading-relaxed">{threshold.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SOLUTIONS CATALOG ─── */}
      <section className="py-8 sm:py-24 px-4 sm:px-6 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 sm:mb-16">
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 px-3 sm:px-4 py-1.5 md:py-2 text-[10px] sm:text-sm mb-3 sm:mb-4">
              Professional Solutions
            </Badge>
            <h2 className="text-2xl sm:text-5xl font-bold text-white mb-3 sm:mb-6">
              Cooling Services
            </h2>
          </div>

          <div className="scroll-row gap-3 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
            {coolingSolutions.map((solution, index) => {
              const Icon = solution.icon;
              return (
                <Card key={index} className="scroll-row-item w-[85%] sm:w-auto bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-cyan-500/20 backdrop-blur-sm flex flex-col overflow-hidden">
                  <div className="relative h-28 sm:h-40 shrink-0">
                    <img 
                      src={solution.image}
                      alt={solution.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-2 right-2 md:top-3 md:right-3">
                      <Badge className="bg-orange-500/90 text-white border-0 text-[10px] sm:text-sm px-2 py-0.5 md:px-3 md:py-1 font-bold">
                        {solution.price}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader className="p-4 md:p-6 flex-grow">
                    <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                      <div className="bg-cyan-500/10 p-2 md:p-2.5 rounded-md">
                        <Icon className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" />
                      </div>
                    </div>
                    <CardTitle className="text-base md:text-lg text-white mb-1 md:mb-2 leading-tight">{solution.title}</CardTitle>
                    <div className="flex items-center gap-1.5 md:gap-2 mt-2 md:mt-3">
                      <Clock className="w-3 h-3 md:w-4 md:h-4 text-cyan-400" />
                      <span className="text-[10px] md:text-xs text-cyan-300 font-bold">{solution.duration}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6 pt-0">
                    <ul className="space-y-1.5 sm:space-y-2">
                      {solution.benefits.slice(0, 3).map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 md:gap-2 text-slate-300 text-[11px] md:text-sm">
                          <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span className="leading-tight">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── BRANDS & MAINTENANCE ─── */}
      <section className="py-8 sm:py-24 px-4 sm:px-6 border-t border-gray-900 bg-slate-900/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 sm:mb-16">
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 px-3 sm:px-4 py-1.5 md:py-2 text-[10px] sm:text-sm mb-3 sm:mb-4">
              <Shield className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 inline" /> Maintenance Guide
            </Badge>
            <h2 className="text-2xl sm:text-5xl font-bold text-white mb-3 sm:mb-6">
              Keep It Cool
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 mb-8 sm:mb-16">
            {maintenanceTips.map((tip, index) => {
              const Icon = tip.icon;
              return (
                <Card key={index} className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-cyan-500/20 backdrop-blur-sm p-4 sm:p-6 text-left flex items-start gap-3 sm:gap-4">
                  <div className="bg-cyan-500/10 p-2 sm:p-3 rounded-lg shrink-0">
                    <Icon className="w-4 h-4 sm:w-6 sm:h-6 text-cyan-400" />
                  </div>
                  <div>
                    <CardTitle className="text-sm sm:text-lg text-white mb-1">{tip.title}</CardTitle>
                    <p className="text-slate-400 text-[11px] sm:text-sm leading-relaxed mb-2">{tip.description}</p>
                    <Badge className="bg-emerald-500/20 text-emerald-300 border-0 text-[9px] sm:text-xs">
                      {tip.frequency}
                    </Badge>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="scroll-row gap-3 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 md:grid-cols-4 sm:gap-6">
            {gamingBrands.map((brand, index) => (
              <Card key={index} className="scroll-row-item w-[80%] sm:w-auto bg-slate-800/50 border-cyan-500/20 p-4 sm:p-6 text-center flex flex-col justify-center">
                <CardTitle className="text-base sm:text-xl text-white mb-2">{brand.brand}</CardTitle>
                <Badge variant="outline" className="text-[10px] sm:text-xs border-cyan-500/30 text-cyan-300 mx-auto">{brand.models}</Badge>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA SECTION ─── */}
      <section className="py-8 sm:py-24 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl text-center bg-gradient-to-br from-cyan-500/10 to-orange-500/10 border border-cyan-500/30 p-6 sm:p-12 rounded-3xl backdrop-blur-sm">
          <h3 className="text-xl sm:text-4xl font-bold text-white mb-3 sm:mb-6">
            Protect Your Gaming Investment
          </h3>
          <p className="text-xs sm:text-lg text-slate-300 mb-6 sm:mb-8 max-w-xl mx-auto">
            Contact us for professional cooling solutions. Free pick & drop across all Kuwait governorates.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <Button 
              asChild
              size="lg" 
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white w-full sm:w-auto font-black text-sm sm:text-base py-5 sm:py-7"
            >
              <a href={`tel:+${business.telephone}`}>Call: +{business.telephone}</a>
            </Button>
            <Button 
              asChild
              size="lg" 
              variant="outline" 
              className="border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/10 w-full sm:w-auto text-sm sm:text-base py-5 sm:py-7"
            >
              <Link to="/book">Book Free Pickup</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
