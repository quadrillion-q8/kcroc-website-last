// File: app/frontend/src/pages/BatteryReplacement.tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Battery, BatteryCharging, BatteryWarning, Flame, Zap, Clock, TrendingDown, CheckCircle2, Phone, MapPin, Wrench, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

import { KCROC_GRAPH } from '../data/graph';
import { SEOEngine } from '../core/components/SEOEngine';

const business = KCROC_GRAPH.business!;

export default function BatteryReplacement() {
  const statistics = [
    { value: '2-4', label: 'Years Average Battery Life', unit: 'Years' },
    { value: '300-500', label: 'Charge Cycles Expected', unit: 'Cycles' },
    { value: '80%', label: 'Capacity After 2 Years', unit: '' }
  ];

  const warningSigns = [
    {
      number: '1',
      title: 'Rapid Battery Drain',
      description: 'Your laptop battery depletes much faster than it used to, even with minimal usage.',
      icon: TrendingDown,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
      image: 'https://mgx-backend-cdn.metadl.com/generate/images/681399/2026-02-01/db82720b-7156-4030-9dc6-2fcfc8cb6328.png',
      points: [
        'Battery percentage drops rapidly within minutes',
        'Full charge lasts only 1-2 hours instead of the usual 4-6 hours',
        'Battery drains even when laptop is in sleep mode',
        'Inconsistent battery percentage readings'
      ]
    },
    {
      number: '2',
      title: 'Overheating Issues',
      description: 'The laptop becomes unusually hot, especially around the battery area, during normal use.',
      icon: Flame,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      image: 'https://mgx-backend-cdn.metadl.com/generate/images/681399/2026-02-01/81e751ce-5801-4009-b52c-ca7e4b1e135a.png',
      points: [
        'Excessive heat from the bottom of the laptop',
        'Fan runs constantly at high speed',
        'Uncomfortable to use on your lap due to heat',
        'System performance throttles due to thermal issues'
      ]
    },
    {
      number: '3',
      title: 'Physical Swelling',
      description: 'The battery or laptop case shows signs of physical deformation or bulging.',
      icon: AlertTriangle,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
      image: 'https://mgx-backend-cdn.metadl.com/generate/images/681399/2026-02-01/aa4f6a93-0032-4c62-b401-c7e4c4b13513.png',
      points: [
        'Visible bulge on the bottom of the laptop',
        'Trackpad becomes raised or difficult to click',
        'Gaps appearing between laptop panels',
        'Keyboard feels uneven or raised in certain areas'
      ]
    },
    {
      number: '4',
      title: 'Charging Problems',
      description: 'Inconsistent charging behavior or failure to charge properly despite being plugged in.',
      icon: BatteryCharging,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      image: 'https://mgx-backend-cdn.metadl.com/generate/images/681399/2026-02-01/a2250b0b-6f61-4042-bf43-6767e47c0580.png',
      points: [
        'Battery charges very slowly or not at all',
        'Charging stops at random percentages',
        'Charger needs to be repositioned frequently to work',
        'Battery percentage fluctuates while plugged in'
      ]
    },
    {
      number: '5',
      title: 'Age and Cycle Count',
      description: 'Your laptop battery has exceeded its expected lifespan or charge cycle limit.',
      icon: Clock,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      image: 'https://mgx-backend-cdn.metadl.com/generate/images/681399/2026-02-01/35de8e3f-a213-4587-90dc-a788627d2a25.png',
      points: [
        'Battery is more than 2-3 years old',
        'Exceeded 300-500 charge cycles (check in system settings)',
        'Battery health report shows less than 80% capacity',
        'Manufacturer warranty has expired'
      ]
    }
  ];

  const brandGuide = [
    {
      brand: 'Dell',
      image: 'https://mgx-backend-cdn.metadl.com/generate/images/681399/2026-02-01/4c565c12-e8bc-4501-9909-9d1c8099bc0a.png',
      signs: 'Dell laptops often show battery warnings in BIOS. Look for error codes 601-607.',
      replacement: 'Use genuine Dell batteries or high-quality compatible batteries with correct voltage (11.1V or 14.8V typical).',
      safety: 'Dell-compatible batteries from reputable brands are safe if they match specifications exactly.'
    },
    {
      brand: 'HP',
      image: 'https://mgx-backend-cdn.metadl.com/generate/images/681399/2026-02-01/2378ba08-ea69-4dcc-9ff5-29d999d459c9.png',
      signs: 'HP Battery Check utility shows "Replace Battery" message. System may throttle performance.',
      replacement: 'HP batteries have specific part numbers. Match the exact model for best compatibility.',
      safety: 'Third-party HP batteries are safe if certified and match voltage/capacity specifications.'
    },
    {
      brand: 'Lenovo',
      image: 'https://mgx-backend-cdn.metadl.com/generate/images/681399/2026-02-01/6e71c2a3-0935-47ce-a96d-19c7d088eaad.png',
      signs: 'Lenovo Vantage app shows battery health below 80%. May show "Consider replacing battery".',
      replacement: 'Lenovo uses specific battery connectors. Ensure exact model match for ThinkPad/IdeaPad series.',
      safety: 'Compatible Lenovo batteries are safe but verify connector type and voltage match.'
    },
    {
      brand: 'Acer',
      image: 'https://mgx-backend-cdn.metadl.com/generate/images/681399/2026-02-01/c058fb34-748b-4c71-8f92-e0f6e1fd3b97.png',
      signs: 'Acer Care Center shows battery wear level. Rapid drain and charging issues are common signs.',
      replacement: 'Acer batteries vary by model series (Aspire, Predator, Swift). Match exact part number.',
      safety: 'Quality compatible batteries are safe for Acer laptops with proper voltage matching.'
    },
    {
      brand: 'ASUS',
      image: 'https://mgx-backend-cdn.metadl.com/generate/images/681399/2026-02-01/e3c00fff-a5ca-47b9-83b7-2f35f8424d8a.png',
      signs: 'MyASUS app shows battery health. ROG gaming laptops may show performance throttling.',
      replacement: 'ASUS batteries differ between consumer and ROG gaming series. Verify exact model.',
      safety: 'Compatible ASUS batteries are safe if they meet original specifications and certifications.'
    },
    {
      brand: 'MacBook',
      image: 'https://mgx-backend-cdn.metadl.com/generate/images/681399/2026-02-01/ed78b449-fde5-4f53-bb8f-049472eaab41.png',
      signs: 'macOS shows "Service Battery" or "Replace Soon" warning. Trackpad may become raised.',
      replacement: 'MacBook batteries require professional installation. Use genuine Apple batteries for best results.',
      safety: 'Third-party MacBook batteries can be risky. Genuine Apple batteries strongly recommended.'
    }
  ];

  const batteryFAQ = [
    {
      question: 'How do I check my laptop battery health?',
      answer: 'On Windows: Run "powercfg /batteryreport" in Command Prompt. On macOS: Hold Option key and click battery icon. Most laptop brands also have dedicated battery health utilities.'
    },
    {
      question: 'Should I keep my laptop plugged in all the time?',
      answer: 'No. Keeping battery at 100% constantly accelerates degradation. Modern laptops have battery management, but it\'s best to keep charge between 20-80% for daily use.'
    },
    {
      question: 'Can I use my laptop while charging?',
      answer: 'Yes, it\'s safe. Modern laptops route power directly to components when plugged in, bypassing the battery to reduce wear.'
    },
    {
      question: 'Are compatible/non-original batteries safe?',
      answer: 'High-quality compatible batteries from reputable manufacturers are generally safe if they match original specifications (voltage, capacity, connector). Always verify certifications and buy from trusted sources.'
    },
    {
      question: 'How long does battery replacement take?',
      answer: 'For most laptops in Kuwait, battery replacement takes 1-2 hours if the battery is in stock. Some MacBook models require 1-2 days due to adhesive removal and calibration.'
    }
  ];

  const proTips = [
    {
      title: 'Keep It Cool',
      description: 'Avoid exposing your laptop to extreme temperatures. Heat is the enemy of battery longevity, especially in Kuwait\'s climate.',
      icon: Flame
    },
    {
      title: 'Optimal Charging',
      description: 'Keep battery level between 20-80% for daily use. Avoid leaving it plugged in at 100% constantly.',
      icon: BatteryCharging
    },
    {
      title: 'Use Original Chargers',
      description: 'Always use manufacturer-approved chargers to prevent damage and ensure proper charging cycles.',
      icon: Zap
    },
    {
      title: 'Regular Calibration',
      description: 'Once a month, let the battery drain to 0% then charge to 100% to calibrate the battery meter.',
      icon: Battery
    }
  ];

  const replacementSigns = [
    'Battery health drops below 80% capacity',
    'Laptop is more than 2-3 years old with heavy use',
    'Physical deformation or swelling is visible',
    'Battery runtime is less than 50% of original capacity'
  ];

  const actionCards = [
    {
      title: 'Check Battery Health',
      description: 'Run a diagnostic to see your current battery status',
      buttonText: 'Run Diagnostic',
      icon: Battery,
      link: '/contact'
    },
    {
      title: 'Find Replacement',
      description: 'Get genuine or compatible battery for your laptop',
      buttonText: 'Find Battery',
      icon: MapPin,
      link: '/contact'
    },
    {
      title: 'Get Expert Help',
      description: 'Contact our support team for assistance',
      buttonText: 'Contact Support',
      icon: Phone,
      link: '/contact'
    }
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      
      {/* ✅ FIXED: Maps exactly to the ID in graph.ts */}
      <SEOEngine entityId="srv-battery" />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 to-transparent"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center space-y-6">
            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 px-4 py-2 text-sm">
              <BatteryWarning className="w-4 h-4 mr-2 inline" />
              Battery Health Guide
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              5 Signs Your Laptop Battery<br />Needs Replacement
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Is your laptop battery draining faster than usual? Learn the critical warning signs that indicate it's time for a replacement.
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white"
                onClick={() => scrollToSection('warning-signs')}
              >
                Check the Signs
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                onClick={() => scrollToSection('brand-guide')}
              >
                Brand-Specific Guide
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section with Educational Infographics */}
      <section className="py-16 px-4 border-t border-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {statistics.map((stat, index) => (
              <Card key={index} className="bg-slate-900/50 border-emerald-500/20 backdrop-blur-sm">
                <CardContent className="pt-6 text-center">
                  <div className="text-5xl font-bold text-emerald-400 mb-2">{stat.value}</div>
                  <div className="text-sm text-slate-400">{stat.unit}</div>
                  <div className="text-lg text-slate-300 mt-2">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Educational Infographics Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/50 border border-emerald-500/20 rounded-xl p-4 backdrop-blur-sm">
              <img 
                src="https://mgx-backend-cdn.metadl.com/generate/images/681399/2026-02-01/12cfdc55-2200-437b-9a0b-4435286382fb.png"
                alt="Battery charge cycle degradation chart showing capacity loss over 300-500 cycles"
                className="w-full h-48 object-cover rounded-lg mb-3"
                loading="lazy"
              />
              <h3 className="text-white font-semibold text-center">Charge Cycle Degradation</h3>
            </div>
            <div className="bg-slate-900/50 border border-emerald-500/20 rounded-xl p-4 backdrop-blur-sm">
              <img 
                src="https://mgx-backend-cdn.metadl.com/generate/images/681399/2026-02-01/5b7054e7-b2af-4fb4-8088-464fd0e1a454.png"
                alt="Optimal battery charging zone diagram showing 20-80% range for longevity"
                className="w-full h-48 object-cover rounded-lg mb-3"
                loading="lazy"
              />
              <h3 className="text-white font-semibold text-center">Optimal Charging Zone</h3>
            </div>
            <div className="bg-slate-900/50 border border-emerald-500/20 rounded-xl p-4 backdrop-blur-sm">
              <img 
                src="https://mgx-backend-cdn.metadl.com/generate/images/681399/2026-02-01/240e5b23-3c09-4616-b888-fbe1dc6c60d5.png"
                alt="Battery lifespan timeline showing 2-4 years average usage with milestones"
                className="w-full h-48 object-cover rounded-lg mb-3"
                loading="lazy"
              />
              <h3 className="text-white font-semibold text-center">Battery Lifespan Timeline</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Warning Signs Section with Images */}
      <section id="warning-signs" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Warning Signs to Watch For
            </h2>
            <p className="text-xl text-slate-300">
              Recognize these critical indicators that your laptop battery needs immediate attention
            </p>
          </div>

          <div className="space-y-8">
            {warningSigns.map((sign, index) => {
              const Icon = sign.icon;
              return (
                <Card key={index} className="bg-slate-900/50 border-emerald-500/20 backdrop-blur-sm overflow-hidden">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <CardHeader>
                        <div className="flex items-start gap-4">
                          <div className={`${sign.bgColor} ${sign.color} p-4 rounded-xl`}>
                            <Icon className="w-8 h-8" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Badge className={`${sign.bgColor} ${sign.color} border-0`}>
                                {sign.number}
                              </Badge>
                              <CardTitle className="text-2xl text-white">{sign.title}</CardTitle>
                            </div>
                            <CardDescription className="text-slate-300 text-base">
                              {sign.description}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {sign.points.map((point, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-slate-300">
                              <CheckCircle2 className={`w-5 h-5 ${sign.color} flex-shrink-0 mt-0.5`} />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </div>
                    <div className="flex items-center justify-center p-6">
                      <img 
                        src={sign.image}
                        alt={`${sign.title} - visual warning sign for laptop battery replacement Kuwait`}
                        className="w-full h-full object-contain rounded-lg"
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

      {/* Battery Comparison Section */}
      <section className="py-16 px-4 border-t border-gray-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Battery Condition Comparison
            </h2>
            <p className="text-xl text-slate-300">
              Visual guide to identifying battery health and safety issues
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-slate-900/50 border-emerald-500/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-center">Genuine vs Compatible</CardTitle>
              </CardHeader>
              <CardContent>
                <img 
                  src="https://mgx-backend-cdn.metadl.com/generate/images/681399/2026-02-01/515e7d03-48da-4434-b788-b5c91d41b09d.png"
                  alt="Side by side comparison of genuine OEM battery versus compatible third-party battery showing quality differences"
                  className="w-full h-48 object-cover rounded-lg mb-3"
                  loading="lazy"
                />
                <p className="text-slate-300 text-sm text-center">Quality comparison between genuine and compatible batteries</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-emerald-500/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-center">Healthy vs Degraded</CardTitle>
              </CardHeader>
              <CardContent>
                <img 
                  src="https://mgx-backend-cdn.metadl.com/generate/images/681399/2026-02-01/026b62d3-01d0-46d3-8d34-58495b8d1299.png"
                  alt="Healthy laptop battery versus degraded battery showing physical condition differences and wear"
                  className="w-full h-48 object-cover rounded-lg mb-3"
                  loading="lazy"
                />
                <p className="text-slate-300 text-sm text-center">Physical condition differences between healthy and worn batteries</p>
              </CardContent>
            </Card>

            <Card className="bg-red-500/10 border-red-500/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-center flex items-center justify-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  Safety Warning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <img 
                  src="https://mgx-backend-cdn.metadl.com/generate/images/681399/2026-02-01/082b7e3c-da43-4cb8-a630-cdd58ebebb9d.png"
                  alt="New battery next to dangerously swollen battery showing safety hazard - immediate replacement needed"
                  className="w-full h-48 object-cover rounded-lg mb-3"
                  loading="lazy"
                />
                <p className="text-red-300 text-sm text-center font-semibold">Swollen battery - STOP using immediately!</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Brand-Specific Guide with Images */}
      <section id="brand-guide" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 px-4 py-2 text-sm mb-4">
              Brand Guide
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Battery Guide by Brand
            </h2>
            <p className="text-xl text-slate-300">
              Specific guidance for Dell, HP, Lenovo, Acer, ASUS, and MacBook batteries
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {brandGuide.map((brand, index) => (
              <Card key={index} className="bg-slate-900/50 border-emerald-500/20 backdrop-blur-sm overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 p-4 flex items-center justify-center bg-slate-800/50">
                    <img 
                      src={brand.image}
                      alt={`${brand.brand} genuine laptop battery with specifications and part number - Kuwait`}
                      className="w-full h-48 object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div className="md:w-2/3">
                    <CardHeader>
                      <CardTitle className="text-2xl text-white">{brand.brand}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="text-emerald-400 font-semibold mb-2">Signs of Bad Battery:</h4>
                        <p className="text-slate-300 text-sm">{brand.signs}</p>
                      </div>
                      <div>
                        <h4 className="text-cyan-400 font-semibold mb-2">Choosing Replacement:</h4>
                        <p className="text-slate-300 text-sm">{brand.replacement}</p>
                      </div>
                      <div>
                        <h4 className="text-blue-400 font-semibold mb-2">Compatible Battery Safety:</h4>
                        <p className="text-slate-300 text-sm">{brand.safety}</p>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Battery FAQ */}
      <section className="py-20 px-4 border-t border-gray-900">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Battery Health FAQ
            </h2>
            <p className="text-xl text-slate-300">
              Common questions about laptop battery health and maintenance
            </p>
          </div>

          <div className="space-y-4">
            {batteryFAQ.map((faq, index) => (
              <Card key={index} className="bg-slate-900/50 border-emerald-500/20 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-white mb-3 flex items-start gap-3">
                    <span className="text-emerald-400 flex-shrink-0">Q:</span>
                    {faq.question}
                  </h3>
                  <p className="text-slate-300 leading-relaxed pl-7">
                    <span className="text-cyan-400 font-semibold">A:</span> {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pro Tips Section */}
      <section id="pro-tips" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 px-4 py-2 text-sm mb-4">
              Pro Tips
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Extend Your Battery Life
            </h2>
            <p className="text-xl text-slate-300">
              Follow these best practices to maximize your laptop battery's lifespan and performance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {proTips.map((tip, index) => {
              const Icon = tip.icon;
              return (
                <Card key={index} className="bg-slate-900/50 border-emerald-500/20 backdrop-blur-sm hover:border-emerald-500/40 transition-all">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="bg-emerald-500/10 text-emerald-400 p-3 rounded-lg">
                        <Icon className="w-6 h-6" />
                      </div>
                      <CardTitle className="text-xl text-white">{tip.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-300">{tip.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* When to Replace Section */}
      <section className="py-20 px-4 border-t border-gray-900">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border-red-500/30 backdrop-blur-sm">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-red-500/20 text-red-400 p-4 rounded-full">
                  <AlertTriangle className="w-10 h-10" />
                </div>
              </div>
              <CardTitle className="text-3xl text-white mb-2">
                When to Replace Your Battery
              </CardTitle>
              <CardDescription className="text-slate-300 text-lg">
                If you're experiencing multiple signs mentioned above, it's time to consider a replacement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {replacementSigns.map((sign, index) => (
                  <li key={index} className="flex items-start gap-3 text-slate-200">
                    <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <span className="text-lg">{sign}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Need a New Battery in Kuwait?
            </h2>
            <p className="text-xl text-slate-300">
              Contact us for genuine or high-grade compatible laptop batteries with professional installation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {actionCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <Card key={index} className="bg-slate-900/50 border-emerald-500/20 backdrop-blur-sm hover:border-emerald-500/40 transition-all">
                  <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className="bg-emerald-500/10 text-emerald-400 p-4 rounded-full">
                        <Icon className="w-8 h-8" />
                      </div>
                    </div>
                    <CardTitle className="text-xl text-white">{card.title}</CardTitle>
                    <CardDescription className="text-slate-300">
                      {card.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Button 
                      asChild
                      className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white"
                    >
                      <Link to={card.link}>{card.buttonText}</Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Direct Contact CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
              <a href={`tel:+${business.telephone}`}>
                <Phone className="w-5 h-5 mr-2" />
                Call: +{business.telephone}
              </a>
            </Button>
            <Button asChild size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
              <a href={`https://wa.me/${business.telephone}?text=I need a laptop battery replacement in Kuwait`} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp Us
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Safety Warning */}
      <section className="py-12 px-4 border-t border-gray-900">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border-red-500/40 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-8 h-8 text-red-400 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Safety Warning</h3>
                  <p className="text-slate-200">
                    If you notice a swollen battery, stop using your laptop immediately and seek professional help. 
                    A swollen battery can be dangerous and should be handled by experts. Contact KCROC at +{business.telephone} for safe battery removal and replacement.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 px-4 border-t border-gray-900">
        <div className="container mx-auto max-w-4xl text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Ready to Get Your Battery Replaced?
          </h3>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              asChild
              size="lg" 
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white"
            >
              <Link to="/contact">Contact Us Today</Link>
            </Button>
            <Button 
              asChild
              size="lg" 
              variant="outline" 
              className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
            >
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
