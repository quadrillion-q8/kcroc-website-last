// File: app/frontend/src/pages/BookingPage.tsx
import React, { useState } from 'react';
import { ShieldCheck, Truck, Clock, MapPin, MessageCircle, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// SEO & Data
import SchemaMarkup from '../components/seo/SchemaMarkup';
import { SEOEngine } from '../core/components/SEOEngine';
import { KCROC_GRAPH } from '../data/graph';
import { useAnalytics } from '../core/analytics/AnalyticsProvider';

/* ─────────────────────────────────────────────────────────────────────────────
   1. PAGE DATA & SEO CONSTANTS (Retained from your original file)
───────────────────────────────────────────────────────────────────────────── */
const business = KCROC_GRAPH.business!;
const BASE_URL = business.websiteUrl;
const PAGE_URL = `${BASE_URL}/book`;
const PHONE_DISPLAY = `+${business.telephone}`;
const PHONE_CLEAN = business.telephone;
const BUSINESS_NAME = business.legalName;

// NOTE: WebPage + BreadcrumbList nodes are intentionally omitted here — SEOEngine
// (driven by the 'page-booking' graph entity) is the single authority for those on
// this page. This object only carries schema types SEOEngine doesn't generate.
const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "Computer Repair Booking",
      "provider": { "@id": `${BASE_URL}/#business` }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is the pickup and delivery truly free in Kuwait?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, KCROC offers completely free pickup and delivery across all Kuwait governorates including Kuwait City, Hawalli, Salmiya, Farwaniya, and Jahra. There are no hidden charges for collection or return."
          }
        },
        {
          "@type": "Question",
          "name": "How long will my computer repair take?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We provide same-day hardware testing for all devices. Repair times vary based on the issue and parts availability, but most standard repairs are completed within 24 to 48 hours."
          }
        }
      ]
    }
  ]
};

/* ─────────────────────────────────────────────────────────────────────────────
   2. MAIN COMPONENT (Frictionless WhatsApp Flow)
───────────────────────────────────────────────────────────────────────────── */
export default function BookingPage() {
  const { trackConversion } = useAnalytics();
  
  // Interactive Form State
  const [deviceType, setDeviceType] = useState('MacBook / Apple');
  const [issue, setIssue] = useState('');
  const [location, setLocation] = useState('');

  // Generate the formatted WhatsApp link
  const handleWhatsAppRedirect = (e: React.MouseEvent) => {
    e.preventDefault();
    trackConversion('whatsapp_click', { cta_name: 'booking_form_submit', button_position: 'booking_page' });
    
    const text = `*New Repair Inquiry*\n\n*Device:* ${deviceType}\n*Location:* ${location || 'Not provided'}\n*Issue:* ${issue || 'Needs diagnostic'}\n\n_Hi KCROC, I would like to claim my free diagnostic and pickup._`;
    const url = `https://wa.me/${PHONE_CLEAN}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <main className="w-full min-h-screen bg-slate-950 text-slate-100 font-sans pt-24 pb-16">
      
      {/* SEOEngine (driven by the 'page-booking' graph entity) is the single authority
          for title/meta/canonical/WebPage/BreadcrumbList on this page. SchemaMarkup below
          only supplies the Service + FAQPage nodes that SEOEngine doesn't generate. */}
      <SEOEngine entityId="page-booking" />
      <SchemaMarkup schema={STRUCTURED_DATA} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl sm:text-5xl font-black mb-4 tracking-tight text-white">
            Claim Your <span className="text-cyan-400">Free Diagnostic</span>
          </h1>
          <p className="text-slate-400 text-lg">
            Tell us what's wrong. We'll pick it up, diagnose it at the component level for free, and give you a fixed quote.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          
          {/* LEFT: The Interactive Form */}
          <Card className="lg:col-span-3 bg-slate-900/50 border border-slate-800 backdrop-blur shadow-2xl rounded-3xl overflow-hidden">
            <div className="h-2 w-full bg-gradient-to-r from-cyan-500 to-emerald-500" />
            <CardContent className="p-6 sm:p-10">
              <form className="space-y-8">
                
                {/* Step 1: Device (Visual Chips instead of Dropdown) */}
                <div className="space-y-3">
                  <label className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <span className="bg-cyan-500/20 text-cyan-400 w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
                    What needs fixing?
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {['MacBook / Apple', 'Gaming PC', 'Windows Laptop', 'Logic Board', 'Other'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setDeviceType(type)}
                        className={`p-3 text-sm font-semibold rounded-xl border transition-all ${
                          deviceType === type 
                            ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400 scale-[1.02]' 
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: The Issue */}
                <div className="space-y-3">
                  <label className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <span className="bg-cyan-500/20 text-cyan-400 w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
                    What are the symptoms?
                  </label>
                  <textarea 
                    rows={3}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-shadow"
                    placeholder="e.g., Spilled water on it, won't turn on, overheating..."
                    value={issue}
                    onChange={(e) => setIssue(e.target.value)}
                  />
                </div>

                {/* Step 3: Location */}
                <div className="space-y-3">
                  <label className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <span className="bg-cyan-500/20 text-cyan-400 w-6 h-6 rounded-full flex items-center justify-center text-xs">3</span>
                    Where in Kuwait are you?
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input 
                      type="text"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-4 pl-12 pr-4 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-shadow"
                      placeholder="e.g., Salmiya, Hawalli, Kuwait City..."
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>

                {/* Submit to WhatsApp */}
                <div className="pt-4">
                  <Button 
                    onClick={handleWhatsAppRedirect}
                    size="lg" 
                    className="w-full h-16 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-lg rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-[1.02] transition-all"
                  >
                    <MessageCircle className="w-6 h-6 mr-2" />
                    Send to WhatsApp & Book
                    <ChevronRight className="w-5 h-5 ml-2 opacity-50" />
                  </Button>
                  <p className="text-center text-xs text-slate-500 mt-4 flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" /> Secure & Instant. Speak directly with our engineers.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* RIGHT: Trust Anchors */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-cyan-950/20 border border-cyan-900/50 rounded-3xl p-6 sm:p-8">
              <h3 className="text-xl font-bold text-white mb-6 border-b border-cyan-900/50 pb-4">Our Service Guarantee</h3>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="bg-slate-900 p-3 rounded-xl shrink-0 h-fit">
                    <Truck className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Free Pick & Drop</h4>
                    <p className="text-sm text-slate-400 leading-relaxed">Secure, insured collection and delivery to any governorate in Kuwait.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="bg-slate-900 p-3 rounded-xl shrink-0 h-fit">
                    <ShieldCheck className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">No Fix, No Fee</h4>
                    <p className="text-sm text-slate-400 leading-relaxed">If your device is catastrophically damaged and beyond repair, you pay zero.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="bg-slate-900 p-3 rounded-xl shrink-0 h-fit">
                    <Clock className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-1">Fast Turnaround</h4>
                    <p className="text-sm text-slate-400 leading-relaxed">Most component-level board repairs are completed within 24-48 hours.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-slate-900/30 border border-slate-800 rounded-3xl p-6 flex items-start gap-4">
              <div className="text-4xl font-black text-white leading-none">4.9<span className="text-cyan-400 text-2xl">★</span></div>
              <div>
                <p className="text-sm text-white font-bold mb-1">Google Reviews</p>
                <p className="text-xs text-slate-400">Trusted by over 500+ professionals and gamers across Kuwait.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
