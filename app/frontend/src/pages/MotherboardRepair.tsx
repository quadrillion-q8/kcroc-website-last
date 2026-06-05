import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Cpu, CheckCircle, PenTool, Shield, MessageCircle, PhoneCall } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function MotherboardRepair() {
  // SEO Schema specific to this high-value service
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Chip-Level Motherboard Repair",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Kuwait Computer Repair On Call (KCROC)",
      "telephone": "+96555301913",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19",
        "addressLocality": "Hawalli",
        "addressCountry": "KW"
      }
    },
    "description": "Advanced micro-soldering, IC replacement, and liquid damage repair for laptop and PC motherboards in Hawalli, Kuwait."
  };

  return (
    <>
      <main className="min-h-screen bg-gray-950 text-white">
        <Helmet htmlAttributes={{ lang: 'en' }}>
          <title>Chip-Level Motherboard Repair in Hawalli | KCROC</title>
          <meta name="description" content="Expert chip-level motherboard repair, micro-soldering, and liquid damage restoration in Hawalli, Kuwait. Free pickup and delivery." />
          <link rel="canonical" href="https://www.computerrepairkuwait.com/chip-level-motherboard-repair-hawalli" />
          <meta property="og:locale" content="en_KW" />
          <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        </Helmet>

        {/* Hero Section */}
        <section className="pt-32 pb-16 px-6 bg-gradient-to-b from-emerald-900/20 to-gray-950">
          <div className="max-w-4xl mx-auto text-center">
            <Cpu className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Expert <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400">Chip-Level Motherboard Repair</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Don't replace your entire laptop. We specialize in advanced micro-soldering, IC replacement, and dead motherboard recovery in Hawalli, Kuwait.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white transition-colors">
                <Link to="/book">Book Free Pickup</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-emerald-600 text-emerald-400 hover:bg-emerald-600/10 transition-colors">
                <a href="https://wa.me/96555301913" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5 mr-2" /> Consult an Expert
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Service Details */}
        <section className="py-16 px-6 border-t border-gray-900">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            <Card className="bg-gray-900/40 border-gray-800">
              <CardContent className="p-6">
                <PenTool className="w-10 h-10 text-emerald-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Micro-Soldering</h3>
                <p className="text-gray-400">Precision replacement of burned ICs, capacitors, and resistors using professional soldering stations.</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-900/40 border-gray-800">
              <CardContent className="p-6">
                <Cpu className="w-10 h-10 text-emerald-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">BIOS Flashing</h3>
                <p className="text-gray-400">Recovery from corrupted BIOS updates or boot failures using hardware-level programming.</p>
              </CardContent>
            </Card>
            <Card className="bg-gray-900/40 border-gray-800">
              <CardContent className="p-6">
                <Shield className="w-10 h-10 text-emerald-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Liquid Damage</h3>
                <p className="text-gray-400">Ultrasonic cleaning and short-circuit repair to revive motherboards damaged by spills.</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </>
  );
}
