import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Monitor, Apple, Smartphone, Zap, Cable, Tv, Phone, MessageCircle, CheckCircle2, Shield, Truck, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  { icon: Monitor, title: 'Laptop LCD/LED Screen', desc: 'Cracked, broken, or dead pixel screens replaced for all laptop brands. Starting 20 KD.', color: 'text-blue-400', bgColor: 'bg-blue-500/10' },
  { icon: Apple, title: 'MacBook Retina Display', desc: 'MacBook Air and Pro Retina display replacement with genuine panels. Starting 45 KD.', color: 'text-purple-400', bgColor: 'bg-purple-500/10' },
  { icon: Smartphone, title: 'Touch Screen Repair', desc: 'Touch-enabled laptop screens repaired or replaced. Digitizer and panel replacement available.', color: 'text-emerald-400', bgColor: 'bg-emerald-500/10' },
  { icon: Zap, title: 'Flickering & Lines Fix', desc: 'Screen flickering, horizontal/vertical lines, or backlight issues diagnosed and fixed.', color: 'text-orange-400', bgColor: 'bg-orange-500/10' },
  { icon: Cable, title: 'Display Cable Repair', desc: 'Loose or damaged display cables causing intermittent screen issues. Quick cable replacement.', color: 'text-cyan-400', bgColor: 'bg-cyan-500/10' },
  { icon: Tv, title: 'External Monitor Setup', desc: 'Temporary external display setup while your screen is being repaired. Free with any screen service.', color: 'text-pink-400', bgColor: 'bg-pink-500/10' },
];

const brands = ['HP', 'Dell', 'Lenovo', 'ASUS', 'Acer', 'MSI', 'MacBook Air', 'MacBook Pro', 'Samsung', 'Toshiba', 'Huawei', 'LG'];

const whyChooseUs = [
  { icon: Truck, text: 'Free Pickup & Delivery across all Kuwait' },
  { icon: CheckCircle2, text: 'Genuine & high-grade compatible screens' },
  { icon: Shield, text: '90-Day Warranty on all screen replacements' },
  { icon: Zap, text: 'Same/Next-Day service available' },
  { icon: Clock, text: 'Expert screen calibration included' },
  { icon: Phone, text: 'Free diagnosis before any repair' },
];

export default function ScreenReplacement() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <Helmet>
        <title>Screen Replacement Kuwait | Laptop & MacBook Screen Fix – KCROC</title>
        <meta name="description" content="Professional laptop and MacBook screen replacement in Kuwait. Cracked, broken, or flickering screens fixed fast. Free pickup. تبديل شاشة لاب توب الكويت." />
        <link rel="canonical" href="https://www.computerrepairkuwait.com/screen-replacement" />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 text-center">
        <Badge className="mb-6 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-4 py-2">
          🖥️ Screen Replacement Experts
        </Badge>
        <h1 className="text-4xl md:text-6xl font-black mb-6">Screen Replacement Kuwait</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
          تبديل شاشة لاب توب في الكويت – All laptop and MacBook screens replaced with free pickup. HP, Dell, Lenovo, ASUS, Acer, MacBook Air, MacBook Pro & more.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-lg px-8 py-6" asChild>
            <a href="tel:+96555301913"><Phone className="mr-2" /> Call +965 5530 1913</a>
          </Button>
          <Button size="lg" variant="secondary" className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-6" asChild>
            <a href="https://wa.me/96555301913?text=I need screen replacement. Please arrange free pickup." target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2" /> WhatsApp Now
            </a>
          </Button>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-6 bg-gray-900/40">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Screen Replacement Services</h2>
            <p className="text-xl text-gray-400">تبديل شاشة – Fast, professional screen replacement for all brands</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="bg-gray-900/50 border-gray-800 hover:border-emerald-500/40 transition-all">
                  <CardHeader>
                    <div className={`${service.bgColor} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                      <Icon className={`w-6 h-6 ${service.color}`} />
                    </div>
                    <CardTitle className="text-xl text-white">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 leading-relaxed">{service.desc}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Brands & Why Choose Us */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Screens We Replace</h2>
            <p className="text-gray-400">All major brands and screen types</p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center mb-20">
            {brands.map((brand, index) => (
              <Badge key={index} variant="secondary" className="bg-gray-800 text-gray-300 border-gray-700 px-4 py-2 hover:border-emerald-500/40">
                {brand}
              </Badge>
            ))}
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose KCROC?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card key={index} className="bg-gray-900/50 border-gray-800">
                  <CardContent className="pt-6 flex items-center gap-4">
                    <div className="bg-emerald-500/10 p-3 rounded-lg flex-shrink-0">
                      <Icon className="w-6 h-6 text-emerald-400" />
                    </div>
                    <p className="text-gray-300 font-medium">{item.text}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer Nav */}
      <section className="py-8 px-6 bg-gray-900/30 border-t border-gray-800">
        <div className="flex flex-wrap gap-4 justify-center">
          <Button variant="outline" className="border-gray-700 text-gray-300" asChild>
            <Link to="/">← Back to Home</Link>
          </Button>
          <Button variant="outline" className="border-gray-700 text-gray-300" asChild>
            <Link to="/services">All Services</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
