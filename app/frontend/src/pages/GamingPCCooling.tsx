import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Thermometer, Wind, Droplets, AlertTriangle, CheckCircle2, Phone, MessageCircle, Shield, Zap, Clock, TrendingUp, Flame, Fan, Sun, CloudRain } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function GamingPCCooling() {
  const statistics = [
    { value: '50°C+', label: 'Summer Temperatures', icon: Sun, color: 'text-orange-400' },
    { value: '24/7', label: 'Cooling Required', icon: Fan, color: 'text-cyan-400' },
    { value: '100%', label: 'Performance Protected', icon: Shield, color: 'text-emerald-400' }
  ];

  const challenges = [
    {
      title: 'Extreme Heat',
      description: 'Kuwait\'s scorching summer temperatures push gaming PCs to their thermal limits, causing overheating and performance degradation.',
      icon: Sun,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/30',
      image: 'https://mgx-backend-cdn.metadl.com/generate/images/681399/2026-02-01/edb551b8-705a-4046-9050-5f5153e21b30.png'
    },
    {
      title: 'Desert Dust',
      description: 'Fine desert sand infiltrates cooling systems, clogging fans and heatsinks, reducing airflow and cooling efficiency.',
      icon: Wind,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
      borderColor: 'border-yellow-500/30',
      image: 'https://mgx-backend-cdn.metadl.com/generate/images/681399/2026-02-01/262a3196-0184-4b51-b22a-4467df6587ba.png'
    },
    {
      title: 'Humidity Fluctuations',
      description: 'Coastal humidity combined with AC usage creates condensation risks and accelerates thermal paste degradation.',
      icon: CloudRain,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      image: 'https://mgx-backend-cdn.metadl.com/generate/images/681399/2026-02-01/71cac026-c835-4be6-837c-96a2b32e7943.png'
    },
    {
      title: 'Component Stress',
      description: 'Constant thermal cycling from extreme heat stresses components, reducing lifespan and increasing failure rates.',
      icon: AlertTriangle,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/30',
      image: 'https://mgx-backend-cdn.metadl.com/generate/images/681399/2026-02-01/3f9ad6de-dc40-4816-b530-49fef2170549.png'
    }
  ];

  const temperatureThresholds = [
    {
      component: 'CPU',
      safe: '30-70°C',
      warning: '70-85°C',
      critical: '85°C+',
      description: 'Modern gaming CPUs throttle at 85°C, risking permanent damage above 95°C'
    },
    {
      component: 'GPU',
      safe: '30-75°C',
      warning: '75-85°C',
      critical: '85°C+',
      description: 'Graphics cards reduce clock speeds at 83°C, hotspot temps can exceed 100°C'
    },
    {
      component: 'RAM',
      safe: '30-45°C',
      warning: '45-55°C',
      critical: '55°C+',
      description: 'Memory errors increase above 50°C, stability issues common in Kuwait heat'
    },
    {
      component: 'SSD/NVMe',
      safe: '30-50°C',
      warning: '50-70°C',
      critical: '70°C+',
      description: 'Storage throttles at 70°C, data corruption risks above 80°C'
    }
  ];

  const coolingSolutions = [
    {
      title: 'Premium Thermal Paste Replacement',
      description: 'High-performance thermal compound application for CPU and GPU',
      price: '15 KD',
      duration: '1-2 hours',
      icon: Droplets,
      image: 'https://mgx-backend-cdn.metadl.com/generate/images/681399/2026-02-01/c18dc648-56ed-427e-8d69-b8a070590f50.png',
      benefits: [
        'Arctic MX-5 or Thermal Grizzly Kryonaut',
        'Professional application technique',
        'Temperature drop: 10-20°C typical',
        'CPU and GPU thermal paste service',
        'Includes thermal pad inspection'
      ]
    },
    {
      title: 'Advanced Case Airflow Optimization',
      description: 'Strategic fan placement and airflow configuration',
      price: '20 KD',
      duration: '2-3 hours',
      icon: Wind,
      image: 'https://mgx-backend-cdn.metadl.com/generate/images/681399/2026-02-01/b3690fc3-c4e7-4acb-bc6d-c3662c855485.png',
      benefits: [
        'Install 120mm/140mm high-airflow fans',
        'Positive/negative pressure optimization',
        'Dust filter installation and sealing',
        'Cable management for airflow',
        'PWM fan curve optimization'
      ]
    },
    {
      title: 'CPU Cooler Upgrade',
      description: 'Tower air cooler or AIO liquid cooling installation',
      price: '30 KD',
      duration: '2-4 hours',
      icon: Fan,
      image: 'https://mgx-backend-cdn.metadl.com/generate/images/681399/2026-02-01/d66aed0d-4e7e-404a-a109-5e6d64c5e51c.png',
      benefits: [
        'Noctua NH-D15 or be quiet! Dark Rock Pro',
        'Arctic Liquid Freezer II AIO options',
        'Temperature reduction: 20-30°C',
        'Whisper-quiet operation',
        'Kuwait climate optimized'
      ]
    },
    {
      title: 'GPU Thermal Management',
      description: 'Graphics card cooling enhancement and maintenance',
      price: '25 KD',
      duration: '2-3 hours',
      icon: Zap,
      image: 'https://mgx-backend-cdn.metadl.com/generate/images/681399/2026-02-01/07014549-46cb-4cb9-b5e1-50945eb33cc1.png',
      benefits: [
        'GPU die thermal paste replacement',
        'VRAM and VRM thermal pad upgrade',
        'Fan bearing service or replacement',
        'Backplate thermal contact improvement',
        'Hotspot temperature reduction'
      ]
    },
    {
      title: 'AIO Liquid Cooling',
      description: 'All-in-one liquid cooling system installation',
      price: '35 KD',
      duration: '3-4 hours',
      icon: Droplets,
      image: 'https://mgx-backend-cdn.metadl.com/generate/images/681399/2026-02-01/f712c925-e8cd-4753-ab40-36bbbca943f3.png',
      benefits: [
        'Arctic Liquid Freezer II 240/280/360mm',
        'Superior cooling performance',
        'Quiet operation under load',
        'RGB lighting options',
        'Long-term reliability'
      ]
    },
    {
      title: 'Complete Cooling System Overhaul',
      description: 'Comprehensive cooling upgrade for maximum performance',
      price: '60 KD',
      duration: '4-6 hours',
      icon: Shield,
      image: 'https://mgx-backend-cdn.metadl.com/generate/images/681399/2026-02-01/a86e6ff9-fbf7-40ab-8dd2-6889e290b66c.png',
      benefits: [
        'Full system thermal paste and pads',
        'Multiple case fan installation',
        'CPU cooler upgrade (air or AIO)',
        'GPU thermal service',
        'Airflow testing and validation',
        'Temperature monitoring setup'
      ]
    }
  ];

  const maintenanceTips = [
    {
      title: 'Monthly Dust Filter Cleaning',
      description: 'Remove and clean dust filters every 2-4 weeks in Kuwait\'s dusty environment',
      icon: Wind,
      frequency: 'Every 2-4 weeks'
    },
    {
      title: 'Quarterly Deep Cleaning',
      description: 'Full internal cleaning of fans, heatsinks, and components every 3 months',
      icon: Fan,
      frequency: 'Every 3 months'
    },
    {
      title: 'Annual Thermal Paste Refresh',
      description: 'Replace CPU and GPU thermal paste yearly in Kuwait\'s extreme heat',
      icon: Droplets,
      frequency: 'Annually'
    },
    {
      title: 'Temperature Monitoring',
      description: 'Use HWiNFO64 or MSI Afterburner to track temps during gaming sessions',
      icon: Thermometer,
      frequency: 'Continuous'
    }
  ];

  const gamingBrands = [
    {
      brand: 'ASUS ROG',
      models: 'Strix, TUF, Zephyrus',
      cooling: 'Dual/Triple fan, vapor chamber, heat pipes',
      common: 'Dust in dense fin arrays, thermal paste degradation',
      upgrade: 'Compatible with Noctua, Arctic Liquid Freezer II'
    },
    {
      brand: 'MSI Gaming',
      models: 'Trident, Aegis, MAG',
      cooling: 'TORX fans, heat pipe arrays, RGB cooling',
      common: 'Fan bearing wear, VRM overheating',
      upgrade: 'MSI MAG CoreLiquid, additional intake fans'
    },
    {
      brand: 'Alienware',
      models: 'Aurora, Area-51',
      cooling: 'Proprietary vapor chamber, high-RPM fans',
      common: 'Loud operation, limited upgrade options',
      upgrade: 'Thermal paste critical, external cooling pads'
    },
    {
      brand: 'Custom Builds',
      models: 'All configurations',
      cooling: 'Flexible - any cooler/fan combination',
      common: 'Poor initial airflow, inadequate cooling',
      upgrade: 'Full customization: AIO, 6+ fans, custom curves'
    }
  ];

  const faq = [
    {
      q: 'Why is gaming PC cooling critical in Kuwait?',
      a: 'Kuwait\'s extreme summer temperatures (45-50°C+) combined with desert dust make cooling challenging. Without proper cooling, gaming PCs overheat, throttle performance, and suffer reduced component lifespan. Professional cooling solutions are essential for reliable gaming performance.'
    },
    {
      q: 'How often should I service my gaming PC cooling in Kuwait?',
      a: 'Due to Kuwait\'s harsh climate: Clean dust filters monthly, deep clean internals every 3 months, replace thermal paste annually. More frequent service needed for overclocked systems or heavy gaming usage.'
    },
    {
      q: 'What temperature is dangerous for gaming components?',
      a: 'CPU: 85°C+ causes throttling, 95°C+ risks damage. GPU: 85°C+ triggers throttling, 90°C+ is critical. RAM: 55°C+ causes instability. SSD: 70°C+ triggers throttling. Kuwait\'s ambient heat makes these thresholds easier to reach.'
    },
    {
      q: 'Should I use air cooling or liquid cooling in Kuwait?',
      a: 'Both work well if properly maintained. AIO liquid coolers offer better performance for high-end CPUs and quieter operation. Quality air coolers (Noctua NH-D15) perform similarly at lower cost. Choice depends on case space, budget, and noise preference.'
    },
    {
      q: 'Do you service all gaming PC brands?',
      a: 'Yes! We service ASUS ROG, MSI, Alienware, HP Omen, Lenovo Legion, custom builds, and all gaming PC brands. Free pickup and delivery across Kuwait governorates.'
    },
    {
      q: 'How much does gaming PC cooling service cost?',
      a: 'Thermal paste replacement: 15 KD. Case fan upgrade: 20 KD. CPU cooler upgrade: 30 KD. GPU thermal service: 25 KD. Complete overhaul: 60 KD. All services include free pickup/delivery in Kuwait.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-orange-500/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(6,182,212,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(249,115,22,0.1),transparent_50%)]"></div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center space-y-6">
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 px-6 py-2 text-sm font-semibold">
              <Thermometer className="w-4 h-4 mr-2 inline" />
              Gaming PC Cooling Experts in Kuwait
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Keep Your Gaming PC Cool<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                in Kuwait's Heat
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Professional cooling solutions designed for Kuwait's extreme climate. Protect your gaming investment from overheating, dust, and thermal throttling.
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-6">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-lg px-8 py-6 shadow-lg shadow-orange-500/30"
                asChild
              >
                <a href="tel:+96555301913">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now: +965 5530 1913
                </a>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/10 text-lg px-8 py-6"
                asChild
              >
                <a href="https://wa.me/96555301913?text=I need gaming PC cooling service in Kuwait" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp Us
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 px-4 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {statistics.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-cyan-500/20 backdrop-blur-sm hover:border-cyan-500/40 transition-all">
                  <CardContent className="pt-8 text-center">
                    <div className="flex justify-center mb-4">
                      <div className="bg-cyan-500/10 p-4 rounded-full">
                        <Icon className={`w-10 h-10 ${stat.color}`} />
                      </div>
                    </div>
                    <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-lg text-slate-300 font-medium">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* The Challenge Section with Images */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30 px-4 py-2 text-sm mb-4">
              The Challenge
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Kuwait's Climate vs. Gaming PCs
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Gaming PCs face unique challenges in Kuwait's extreme environment. Understanding these threats is the first step to protecting your investment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {challenges.map((challenge, index) => {
              const Icon = challenge.icon;
              return (
                <Card key={index} className={`bg-slate-900/50 ${challenge.borderColor} backdrop-blur-sm hover:scale-105 transition-transform overflow-hidden`}>
                  <div className="grid md:grid-cols-2">
                    <div>
                      <CardHeader>
                        <div className="flex items-center gap-4 mb-3">
                          <div className={`${challenge.bgColor} p-4 rounded-xl`}>
                            <Icon className={`w-8 h-8 ${challenge.color}`} />
                          </div>
                        </div>
                        <CardTitle className="text-2xl text-white mb-3">{challenge.title}</CardTitle>
                        <CardDescription className="text-slate-300 text-base leading-relaxed">
                          {challenge.description}
                        </CardDescription>
                      </CardHeader>
                    </div>
                    <div className="flex items-center justify-center p-4">
                      <img 
                        src={challenge.image}
                        alt={`${challenge.title} - Gaming PC cooling challenge in Kuwait`}
                        className="w-full h-full object-cover rounded-lg"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Temperature Monitoring Section with Images */}
      <section className="py-24 px-4 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="bg-red-500/20 text-red-300 border-red-500/30 px-4 py-2 text-sm mb-4">
              <Flame className="w-4 h-4 mr-2 inline" />
              Temperature Monitoring
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Critical Temperature Thresholds
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Know when your components are running too hot. These temperature ranges help you identify cooling problems before damage occurs.
            </p>
          </div>

          {/* Temperature Monitoring Tools */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-cyan-500/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-center">HWiNFO64</CardTitle>
              </CardHeader>
              <CardContent>
                <img 
                  src="https://mgx-backend-cdn.metadl.com/generate/images/681399/2026-02-01/557e9419-8918-45dc-be92-ff0de2b9302e.png"
                  alt="HWiNFO64 software screenshot showing CPU GPU temperature monitoring real-time"
                  className="w-full h-48 object-cover rounded-lg mb-3"
                  loading="lazy"
                />
                <p className="text-slate-300 text-sm text-center">Real-time CPU & GPU temperature monitoring</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-cyan-500/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-center">MSI Afterburner</CardTitle>
              </CardHeader>
              <CardContent>
                <img 
                  src="https://mgx-backend-cdn.metadl.com/generate/images/681399/2026-02-01/246d74a5-d232-45b2-85b5-06395c6117b8.png"
                  alt="MSI Afterburner temperature graphs showing GPU temperature curves during gaming"
                  className="w-full h-48 object-cover rounded-lg mb-3"
                  loading="lazy"
                />
                <p className="text-slate-300 text-sm text-center">GPU temperature curves and monitoring</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-cyan-500/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-center">Thermal Imaging</CardTitle>
              </CardHeader>
              <CardContent>
                <img 
                  src="https://mgx-backend-cdn.metadl.com/generate/images/681399/2026-02-01/5c2943eb-d1a5-4876-9958-caf003211c51.png"
                  alt="Thermal camera image of gaming PC showing hot spots heat distribution"
                  className="w-full h-48 object-cover rounded-lg mb-3"
                  loading="lazy"
                />
                <p className="text-slate-300 text-sm text-center">Thermal camera hotspot detection</p>
              </CardContent>
            </Card>
          </div>

          {/* Temperature Zones Diagram */}
          <div className="mb-12 flex justify-center">
            <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-cyan-500/20 backdrop-blur-sm max-w-2xl">
              <CardHeader>
                <CardTitle className="text-white text-center">Temperature Safety Zones</CardTitle>
              </CardHeader>
              <CardContent>
                <img 
                  src="https://mgx-backend-cdn.metadl.com/generate/images/681399/2026-02-01/d1e21d3e-0010-4d04-b480-ce46e0782b3c.png"
                  alt="Color coded temperature zones diagram safe warning critical ranges"
                  className="w-full h-64 object-contain rounded-lg"
                  loading="lazy"
                />
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {temperatureThresholds.map((threshold, index) => (
              <Card key={index} className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-cyan-500/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center gap-3">
                    <Thermometer className="w-6 h-6 text-cyan-400" />
                    {threshold.component}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 text-center">
                      <div className="text-xs text-emerald-400 font-semibold mb-1">SAFE</div>
                      <div className="text-sm text-white font-bold">{threshold.safe}</div>
                    </div>
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 text-center">
                      <div className="text-xs text-yellow-400 font-semibold mb-1">WARNING</div>
                      <div className="text-sm text-white font-bold">{threshold.warning}</div>
                    </div>
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-center">
                      <div className="text-xs text-red-400 font-semibold mb-1">CRITICAL</div>
                      <div className="text-sm text-white font-bold">{threshold.critical}</div>
                    </div>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">{threshold.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cooling Solutions with Product Images */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 px-4 py-2 text-sm mb-4">
              Professional Solutions
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Gaming PC Cooling Services
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Expert cooling upgrades and maintenance designed specifically for Kuwait's extreme climate
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coolingSolutions.map((solution, index) => {
              const Icon = solution.icon;
              return (
                <Card key={index} className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-cyan-500/20 backdrop-blur-sm hover:border-cyan-500/40 transition-all overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={solution.image}
                      alt={`${solution.title} - Gaming PC cooling service Kuwait`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-orange-500/90 text-white border-0 text-lg px-3 py-1">
                        {solution.price}
                      </Badge>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-cyan-500/10 p-3 rounded-lg">
                        <Icon className="w-6 h-6 text-cyan-400" />
                      </div>
                    </div>
                    <CardTitle className="text-xl text-white mb-2">{solution.title}</CardTitle>
                    <CardDescription className="text-slate-300 text-sm">
                      {solution.description}
                    </CardDescription>
                    <div className="flex items-center gap-2 mt-3">
                      <Clock className="w-4 h-4 text-cyan-400" />
                      <span className="text-sm text-cyan-300">{solution.duration}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {solution.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-slate-300 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>{benefit}</span>
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

      {/* Gaming Brands with ASUS ROG Image */}
      <section className="py-24 px-4 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 px-4 py-2 text-sm mb-4">
              Brand Expertise
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              We Service All Gaming Brands
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Specialized cooling solutions for ASUS ROG, MSI, Alienware, and all gaming PC brands
            </p>
          </div>

          {/* Featured Brand Image */}
          <div className="mb-12 flex justify-center">
            <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-cyan-500/20 backdrop-blur-sm max-w-3xl overflow-hidden">
              <CardContent className="p-0">
                <img 
                  src="https://mgx-backend-cdn.metadl.com/generate/images/681399/2026-02-01/a86e6ff9-fbf7-40ab-8dd2-6889e290b66c.png"
                  alt="ASUS ROG Strix gaming PC internals showing advanced cooling system RGB fans"
                  className="w-full h-96 object-cover"
                  loading="lazy"
                />
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {gamingBrands.map((brand, index) => (
              <Card key={index} className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-cyan-500/20 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-white mb-1">{brand.brand}</CardTitle>
                  <Badge className="bg-cyan-500/20 text-cyan-300 border-0 w-fit">{brand.models}</Badge>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h4 className="text-cyan-400 font-semibold text-sm mb-1">Cooling System:</h4>
                    <p className="text-slate-300 text-sm">{brand.cooling}</p>
                  </div>
                  <div>
                    <h4 className="text-orange-400 font-semibold text-sm mb-1">Common Issues:</h4>
                    <p className="text-slate-300 text-sm">{brand.common}</p>
                  </div>
                  <div>
                    <h4 className="text-emerald-400 font-semibold text-sm mb-1">Upgrade Options:</h4>
                    <p className="text-slate-300 text-sm">{brand.upgrade}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Maintenance Tips */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 px-4 py-2 text-sm mb-4">
              <Shield className="w-4 h-4 mr-2 inline" />
              Maintenance Guide
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Keep Your Gaming PC Cool
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Essential maintenance schedule for gaming PCs in Kuwait's harsh environment
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {maintenanceTips.map((tip, index) => {
              const Icon = tip.icon;
              return (
                <Card key={index} className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-cyan-500/20 backdrop-blur-sm hover:border-cyan-500/40 transition-all">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-2">
                      <div className="bg-cyan-500/10 p-3 rounded-lg">
                        <Icon className="w-6 h-6 text-cyan-400" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl text-white">{tip.title}</CardTitle>
                        <Badge className="bg-emerald-500/20 text-emerald-300 border-0 mt-2">
                          {tip.frequency}
                        </Badge>
                      </div>
                    </div>
                    <CardDescription className="text-slate-300 text-base">
                      {tip.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-300">
              Common questions about gaming PC cooling in Kuwait
            </p>
          </div>

          <div className="space-y-4">
            {faq.map((item, index) => (
              <Card key={index} className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-cyan-500/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-white mb-3 flex items-start gap-3">
                    <span className="text-cyan-400 flex-shrink-0">Q:</span>
                    {item.q}
                  </h3>
                  <p className="text-slate-300 leading-relaxed pl-7">
                    <span className="text-orange-400 font-semibold">A:</span> {item.a}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <Card className="bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-orange-500/20 border-cyan-500/30 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Ready to Cool Your Gaming PC?
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Contact KCROC for professional gaming PC cooling solutions. Free pickup and delivery across all Kuwait governorates.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white text-lg px-8 py-6 shadow-lg shadow-orange-500/30"
                  asChild
                >
                  <a href="tel:+96555301913">
                    <Phone className="w-5 h-5 mr-2" />
                    Call: +965 5530 1913
                  </a>
                </Button>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white text-lg px-8 py-6"
                  asChild
                >
                  <a href="https://wa.me/96555301913?text=I need gaming PC cooling service in Kuwait" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    WhatsApp Us
                  </a>
                </Button>
              </div>
              <div className="mt-8 pt-8 border-t border-cyan-500/20">
                <p className="text-slate-300 mb-2">
                  <strong className="text-white">Location:</strong> Al Mullah Complex, Ibn Khaldoun St, Hawalli, Kuwait
                </p>
                <p className="text-slate-300">
                  <strong className="text-white">Service Areas:</strong> Hawalli, Salmiya, Farwaniya, Kuwait City, Jahra, Ahmadi, Mubarak Al-Kabeer
                </p>
                <p className="text-slate-300 mt-2">
                  <strong className="text-white">Hours:</strong> Sat-Thu 10:00 AM - 10:00 PM | Fri 6:00 PM - 10:00 PM
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 px-4 bg-gradient-to-b from-transparent to-cyan-500/10">
        <div className="container mx-auto max-w-4xl text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Protect Your Gaming Investment Today
          </h3>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              asChild
              size="lg" 
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
            <Button 
              asChild
              size="lg" 
              variant="outline" 
              className="border-cyan-500/50 text-cyan-300 hover:bg-cyan-500/10"
            >
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}