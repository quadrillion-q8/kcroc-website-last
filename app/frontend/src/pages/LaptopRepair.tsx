import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Monitor, Battery, Keyboard, HardDrive, Zap, Droplets, Phone, MessageCircle, CheckCircle2, Clock, Shield, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function LaptopRepair() {
  useEffect(() => {
    document.title = 'Laptop Repair Kuwait | All Brands Fixed – Free Pickup – KCROC';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', 'Expert laptop repair in Kuwait for all brands. Screen, battery, keyboard, Windows reinstall & more. Free pickup across Kuwait. تصليح لاب توب الكويت.');
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', 'https://www.computerrepairkuwait.com/laptop-repair');
    return () => {
      document.title = 'Computer Repair Kuwait | MacBook & Laptop Repair – Free Pickup – KCROC';
      if (canonical) canonical.setAttribute('href', 'https://www.computerrepairkuwait.com/');
    };
  }, []);

  const services = [
    { icon: Monitor, title: 'Screen Replacement', desc: 'Cracked or damaged laptop screen? We replace screens for all brands and sizes. Starting 20 KD.', color: 'text-blue-400', bgColor: 'bg-blue-500/10' },
    { icon: Battery, title: 'Battery Replacement', desc: 'Laptop not holding charge? Fast battery replacement for all laptop brands. Starting 15 KD.', color: 'text-emerald-400', bgColor: 'bg-emerald-500/10' },
    { icon: Keyboard, title: 'Keyboard Repair', desc: 'Broken or unresponsive keys? Keyboard repair or full replacement. Starting 12 KD.', color: 'text-purple-400', bgColor: 'bg-purple-500/10' },
    { icon: HardDrive, title: 'Windows Reinstall', desc: 'Laptop running slow or crashing? Fresh Windows installation with all drivers. Starting 15 KD.', color: 'text-cyan-400', bgColor: 'bg-cyan-500/10' },
    { icon: Zap, title: 'Performance Upgrade', desc: 'SSD and RAM upgrades to make your laptop fast again. Starting 20 KD for SSD upgrade.', color: 'text-orange-400', bgColor: 'bg-orange-500/10' },
    { icon: Droplets, title: 'Liquid Damage Repair', desc: 'Liquid spilled on your laptop? Expert assessment and component repair. Call for pricing.', color: 'text-red-400', bgColor: 'bg-red-500/10' },
  ];

  const brands = ['HP', 'Dell', 'Lenovo', 'ASUS', 'Acer', 'MSI', 'Alienware', 'Samsung', 'Toshiba', 'Huawei', 'LG', 'Razer', 'Apple MacBook'];

  const whyChooseUs = [
    { icon: Truck, text: 'Free Pickup & Delivery across all Kuwait' },
    { icon: CheckCircle2, text: 'Genuine & high-grade compatible parts' },
    { icon: Shield, text: '90-Day Warranty on all repairs' },
    { icon: Zap, text: 'Same/Next-Day service available' },
    { icon: Clock, text: '500+ laptops repaired successfully' },
    { icon: Phone, text: 'Free diagnosis before any repair' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-cyan-500/10"></div>
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="text-center space-y-6">
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 px-4 py-2 text-sm">
              💻 Expert Laptop Repair
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Laptop Repair Kuwait
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              تصليح لاب توب في الكويت – All brands repaired with free pickup across Kuwait
            </p>
            <p className="text-lg text-slate-400">
              HP, Dell, Lenovo, ASUS, Acer, MSI, Alienware, Samsung, Toshiba & more
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
                <a href="https://wa.me/96555301913?text=I%20need%20laptop%20repair.%20Please%20arrange%20free%20pickup." target="_blank" rel="noopener noreferrer">
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
              Laptop Repair Services in Kuwait
            </h2>
            <p className="text-xl text-slate-300">
              تصليح لاب توب – Professional repairs for all laptop brands
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-cyan-500/20 backdrop-blur-sm hover:border-cyan-500/40 transition-all">
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

      {/* Brands Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Laptop Brands We Repair
            </h2>
            <p className="text-slate-300">All major brands serviced in Kuwait</p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {brands.map((brand, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-slate-800/80 text-slate-300 border border-slate-700 px-4 py-2 text-sm hover:border-cyan-500/40 transition-all"
              >
                {brand}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 bg-slate-800/50">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Choose KCROC for Laptop Repair?
            </h2>
            <p className="text-slate-300">Kuwait's trusted laptop repair specialist – تصليح لاب توب بالكويت</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card key={index} className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-cyan-500/20 backdrop-blur-sm">
                  <CardContent className="pt-6 flex items-center gap-4">
                    <div className="bg-cyan-500/10 p-3 rounded-lg flex-shrink-0">
                      <Icon className="w-6 h-6 text-cyan-400" />
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
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-gradient-to-br from-blue-500/20 via-cyan-500/20 to-emerald-500/20 border-cyan-500/30 backdrop-blur-sm">
            <CardContent className="p-12 text-center">
              <h2 className="text-4xl font-bold text-white mb-6">
                Book Your Laptop Repair in Kuwait
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                تواصل معنا – Free pickup from anywhere. Call or WhatsApp for a free quote.
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
                  <a href="https://wa.me/96555301913?text=I%20need%20laptop%20repair.%20Please%20arrange%20free%20pickup." target="_blank" rel="noopener noreferrer">
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
            <Button asChild variant="outline" className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10">
              <Link to="/">← Back to Home</Link>
            </Button>
            <Button asChild variant="outline" className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10">
              <Link to="/services">All Services</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}