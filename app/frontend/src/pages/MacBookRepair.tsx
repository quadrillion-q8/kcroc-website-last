import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Monitor, Battery, Keyboard, Droplets, Cpu, HardDrive, Phone, MessageCircle, CheckCircle2, Clock, Shield, Truck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function MacBookRepair() {
  useEffect(() => {
    document.title = 'MacBook Repair Kuwait | Apple MacBook Fix – Free Pickup – KCROC';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', 'Professional MacBook repair in Kuwait. Screen replacement, battery, keyboard, liquid damage & logic board repair. Free pickup. تصليح ماك بوك الكويت.');
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', 'https://www.computerrepairkuwait.com/macbook-repair');
    return () => {
      document.title = 'Computer Repair Kuwait | MacBook & Laptop Repair – Free Pickup – KCROC';
      if (canonical) canonical.setAttribute('href', 'https://www.computerrepairkuwait.com/');
    };
  }, []);

  const services = [
    { icon: Monitor, title: 'MacBook Screen Replacement', desc: 'Cracked or damaged MacBook screen? We replace all MacBook Air and Pro screens with genuine panels. Starting 45 KD.', color: 'text-blue-400', bgColor: 'bg-blue-500/10' },
    { icon: Battery, title: 'MacBook Battery Replacement', desc: 'Battery not holding charge? We replace MacBook batteries for all models. Genuine Apple batteries available. Starting 25 KD.', color: 'text-emerald-400', bgColor: 'bg-emerald-500/10' },
    { icon: Keyboard, title: 'MacBook Keyboard Repair', desc: 'Stuck or broken keys, butterfly keyboard issues. Complete keyboard replacement for all MacBook models. Starting 30 KD.', color: 'text-purple-400', bgColor: 'bg-purple-500/10' },
    { icon: Droplets, title: 'Liquid Damage Repair', desc: 'Water or liquid spilled on MacBook? Expert liquid damage assessment and component-level repair. Call for pricing.', color: 'text-red-400', bgColor: 'bg-red-500/10' },
    { icon: Cpu, title: 'Logic Board Repair', desc: "MacBook not turning on? GPU issues? Component-level logic board diagnostics and repair. Call for assessment.", color: 'text-orange-400', bgColor: 'bg-orange-500/10' },
    { icon: HardDrive, title: 'SSD Upgrade & Data Recovery', desc: 'Upgrade your MacBook storage or recover lost data. Fast NVMe SSD upgrades. Starting 20 KD for upgrade.', color: 'text-cyan-400', bgColor: 'bg-cyan-500/10' },
  ];

  const whyChooseUs = [
    { icon: Truck, text: 'Free Pickup & Delivery across all Kuwait' },
    { icon: CheckCircle2, text: 'Genuine Apple & high-grade compatible parts' },
    { icon: Shield, text: '90-Day Warranty on all MacBook repairs' },
    { icon: Zap, text: 'Same/Next-Day service available' },
    { icon: Clock, text: '500+ MacBook repairs completed' },
    { icon: Phone, text: 'Free diagnosis before any repair' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10"></div>
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="text-center space-y-6">
            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 px-4 py-2 text-sm">
              🍎 Apple MacBook Specialist
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              MacBook Repair Kuwait
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              تصليح ماك بوك في الكويت – Expert Apple MacBook repair with free pickup across Kuwait
            </p>
            <p className="text-lg text-slate-400">
              MacBook Air, MacBook Pro (all models) – Screen, Battery, Keyboard, Liquid Damage, Logic Board
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white text-lg px-8 py-6"
                asChild
              >
                <a href="tel:+96555301913">
                  <Phone className="w-5 h-5 mr-2" />
                  Call +965 5530 1913
                </a>
              </Button>
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-lg px-8 py-6"
                asChild
              >
                <a href="https://wa.me/96555301913?text=I%20need%20MacBook%20repair.%20Please%20arrange%20free%20pickup." target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp Now
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 bg-slate-800/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              MacBook Repair Services in Kuwait
            </h2>
            <p className="text-xl text-slate-300">
              تصليح ماك بوك – All Apple MacBook models covered
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-purple-500/20 backdrop-blur-sm hover:border-purple-500/40 transition-all">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-2">
                      <div className={`${service.bgColor} p-3 rounded-lg`}>
                        <Icon className={`w-6 h-6 ${service.color}`} />
                      </div>
                    </div>
                    <CardTitle className="text-xl text-white">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-300 leading-relaxed">{service.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose KCROC for MacBook Repair?
            </h2>
            <p className="text-slate-300">Kuwait's trusted MacBook specialist – تصليح ماك بوك بالكويت</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card key={index} className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-purple-500/20 backdrop-blur-sm">
                  <CardContent className="pt-6 flex items-center gap-4">
                    <div className="bg-purple-500/10 p-3 rounded-lg flex-shrink-0">
                      <Icon className="w-6 h-6 text-purple-400" />
                    </div>
                    <p className="text-slate-300 font-medium">{item.text}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-slate-800/50">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-cyan-500/20 border-purple-500/30 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <h2 className="text-4xl font-bold text-white mb-6">
                Need MacBook Repair in Kuwait?
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                تواصل معنا الآن – Free pickup from anywhere in Kuwait. Call or WhatsApp for a free quote.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white text-lg px-8 py-6"
                  asChild
                >
                  <a href="tel:+96555301913">
                    <Phone className="w-5 h-5 mr-2" />
                    Call +965 5530 1913
                  </a>
                </Button>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-lg px-8 py-6"
                  asChild
                >
                  <a href="https://wa.me/96555301913?text=I%20need%20MacBook%20repair.%20Please%20arrange%20free%20pickup." target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    WhatsApp Us
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer Navigation */}
      <section className="py-8 px-4 bg-slate-900/50">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild variant="outline" className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10">
              <Link to="/">← Back to Home</Link>
            </Button>
            <Button asChild variant="outline" className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10">
              <Link to="/services">All Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}