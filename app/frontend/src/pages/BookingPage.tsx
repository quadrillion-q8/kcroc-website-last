// File: app/frontend/src/pages/BookingPage.tsx
import React, { useRef, useState } from 'react';
import { ShieldCheck, Truck, Clock, MapPin, MessageCircle, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// SEO & Data
import SchemaMarkup from '../components/seo/SchemaMarkup';
import { SEOEngine } from '../core/components/SEOEngine';
import { KCROC_GRAPH } from '../data/graph';
import { useAnalytics } from '../core/analytics/AnalyticsProvider';
import { buildWhatsAppLink } from '../utils/whatsappIntent';

/* ─────────────────────────────────────────────────────────────────────────────
   1. PAGE DATA & SEO CONSTANTS (Retained from your original file)
───────────────────────────────────────────────────────────────────────────── */
const business = KCROC_GRAPH.business!;
const BASE_URL = business.websiteUrl;

// SEOEngine owns the page metadata and WebPage graph. This block adds only the
// Service node; the visible questions below intentionally do not emit FAQPage markup.
const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "name": "Computer Repair Pickup Booking",
      "description": "Request free computer and laptop repair pickup across Kuwait, with diagnosis and a quote before paid repair work.",
      "provider": { "@id": BASE_URL + "/#business" },
      "areaServed": { "@type": "Country", "name": "Kuwait" }
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
  const [deviceModel, setDeviceModel] = useState('');
  const [preferredPickup, setPreferredPickup] = useState('');
  const bookingStarted = useRef(false);

  // Count a booking start only once per visit to this form. A WhatsApp handoff
  // is tracked separately and is not treated as a completed booking.
  const trackBookingStart = () => {
    if (bookingStarted.current) return;
    bookingStarted.current = true;
    trackConversion('begin_booking', {
      booking_type: 'pickup',
      location_context: location.trim() || 'not_provided',
      cta_name: 'booking_form_interaction',
      button_position: 'booking_page',
    });
  };

  // Generate the formatted WhatsApp link
  const handleWhatsAppRedirect = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    trackBookingStart();
    trackConversion('whatsapp_click', { cta_name: 'booking_form_submit', button_position: 'booking_page' });
    
    const text = `*New Repair Inquiry*\n\n*Device:* ${deviceType}${deviceModel.trim() ? ` (${deviceModel.trim()})` : ''}\n*Location:* ${location.trim() || 'Not provided'}\n*Preferred pickup:* ${preferredPickup || 'Flexible / discuss on WhatsApp'}\n*Issue:* ${issue.trim() || 'Needs diagnostic'}\n\n_Hi KCROC, I would like to request free pickup and an initial diagnostic. Please confirm the pickup details with me._`;
    const url = buildWhatsAppLink(text);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full min-h-screen bg-transparent text-slate-100 font-sans pt-24 pb-16">
      
      {/* SEOEngine (driven by the 'page-booking' graph entity) is the single authority
          for title/meta/canonical/WebPage/BreadcrumbList on this page. SchemaMarkup below
          only supplies the Service + FAQPage nodes that SEOEngine doesn't generate. */}
      <SEOEngine entityId="page-booking" />
      <SchemaMarkup schema={STRUCTURED_DATA} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-3xl sm:text-5xl font-black mb-4 tracking-tight text-white">
            Book Laptop &amp; Computer Repair <span className="text-cyan-400">Pickup in Kuwait</span>
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed">
            Request free laptop or computer pickup from your home or office anywhere in Kuwait. Tell us your device model, symptoms and area. Our Hawalli lab will assess the device and explain the repair quote before any paid work begins.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-slate-500">
            Sending this form starts a repair enquiry; it does not confirm a booking or commit you to a repair.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          
          {/* LEFT: The Interactive Form */}
          <Card className="lg:col-span-3 bg-slate-900/50 border border-slate-800 backdrop-blur shadow-2xl rounded-3xl overflow-hidden">
            <div className="h-2 w-full bg-gradient-to-r from-cyan-500 to-emerald-500" />
            <CardContent className="p-6 sm:p-10">
              <form className="space-y-8" onFocusCapture={trackBookingStart} onSubmit={handleWhatsAppRedirect}>
                
                {/* Step 1: Device (Visual Chips instead of Dropdown) */}
                <div className="space-y-3">
                  <div id="device-type-label" className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <span className="bg-cyan-500/20 text-cyan-400 w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
                    What needs fixing?
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3" role="group" aria-labelledby="device-type-label">
                    {['MacBook / Apple', 'Gaming PC', 'Windows Laptop', 'Motherboard', 'Other'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        aria-pressed={deviceType === type}
                        onClick={() => { trackBookingStart(); setDeviceType(type); }}
                        className={`min-h-[44px] touch-manipulation p-3 text-sm font-semibold rounded-xl border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                          deviceType === type 
                            ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400 scale-[1.02]' 
                            : 'bg-brand-dark border-slate-800 text-slate-400 hover:border-slate-600'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Optional device model */}
                <div className="space-y-3">
                  <label htmlFor="booking-model" className="text-sm font-bold text-white uppercase tracking-wider">
                    Device brand and model <span className="font-normal normal-case text-slate-500">(optional)</span>
                  </label>
                  <input
                    id="booking-model"
                    name="deviceModel"
                    type="text"
                    autoComplete="off"
                    className="w-full min-h-[52px] bg-brand-dark border border-slate-800 rounded-xl px-4 py-4 text-base text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-shadow"
                    placeholder="e.g., Dell XPS 15, HP Pavilion, MacBook Pro M2"
                    value={deviceModel}
                    onChange={(e) => setDeviceModel(e.target.value)}
                  />
                </div>

                {/* Step 2: The Issue */}
                <div className="space-y-3">
                  <label htmlFor="booking-issue" className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <span className="bg-cyan-500/20 text-cyan-400 w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
                    What are the symptoms?
                  </label>
                  <textarea
                    id="booking-issue"
                    name="issue"
                    rows={3}
                    className="w-full min-h-[100px] bg-brand-dark border border-slate-800 rounded-xl p-4 text-base text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-shadow"
                    placeholder="e.g., Spilled water on it, won't turn on, overheating..."
                    value={issue}
                    onChange={(e) => setIssue(e.target.value)}
                  />
                </div>

                {/* Step 3: Location */}
                <div className="space-y-3">
                  <label htmlFor="booking-location" className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <span className="bg-cyan-500/20 text-cyan-400 w-6 h-6 rounded-full flex items-center justify-center text-xs">3</span>
                    Where in Kuwait are you?
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                      id="booking-location"
                      name="location"
                      type="text"
                      autoComplete="address-level2"
                      className="w-full min-h-[52px] bg-brand-dark border border-slate-800 rounded-xl py-4 pl-12 pr-4 text-base text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-shadow"
                      placeholder="e.g., Salmiya, Hawalli, Kuwait City..."
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>

                {/* Optional pickup preference */}
                <div className="space-y-3">
                  <label htmlFor="booking-pickup-time" className="text-sm font-bold text-white uppercase tracking-wider">
                    Preferred pickup time <span className="font-normal normal-case text-slate-500">(optional)</span>
                  </label>
                  <select
                    id="booking-pickup-time"
                    name="preferredPickup"
                    className="w-full min-h-[52px] bg-brand-dark border border-slate-800 rounded-xl px-4 py-4 text-base text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-shadow"
                    value={preferredPickup}
                    onChange={(e) => setPreferredPickup(e.target.value)}
                  >
                    <option value="">Flexible / discuss on WhatsApp</option>
                    <option value="Morning (10 AM–1 PM)">Morning (10 AM–1 PM)</option>
                    <option value="Afternoon (1 PM–5 PM)">Afternoon (1 PM–5 PM)</option>
                    <option value="Evening (5 PM–10 PM)">Evening (5 PM–10 PM)</option>
                  </select>
                  <p className="text-xs text-slate-500">This is a preference, not a confirmed pickup appointment. Our team will confirm availability with you.</p>
                </div>

                {/* Submit to WhatsApp */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full min-h-[56px] h-auto whitespace-normal px-4 sm:px-6 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-base sm:text-lg rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-colors"
                  >
                    <MessageCircle className="w-6 h-6 mr-2" />
                    Request Free Pickup on WhatsApp
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
                    <p className="text-sm text-slate-400 leading-relaxed">Free pick-up and delivery across all Kuwait governorates.</p>
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
                <p className="text-xs text-slate-400">Laptop, PC and gaming-system repair support across Kuwait.</p>
              </div>
            </div>
          </div>

        </div>

        <section className="mt-12 grid gap-6 lg:grid-cols-2" aria-label="Booking details and pricing">
          <div className="rounded-3xl border border-cyan-500/20 bg-slate-900/50 p-6 sm:p-8">
            <h2 className="text-2xl font-black text-white">Clear pricing before repair</h2>
            <p className="mt-3 leading-relaxed text-slate-400">The initial diagnostic and pickup are free. We explain the recommended repair and quote before any paid work begins.</p>
            <ul className="mt-5 space-y-2 text-sm text-slate-300">
              <li>Screen replacement labor from <strong className="text-white">30 KWD</strong>, plus the panel.</li>
              <li>Battery replacement labor from <strong className="text-white">8 KWD</strong>, plus the battery.</li>
              <li>Keyboard replacement labor from <strong className="text-white">10 KWD</strong>, plus the part.</li>
            </ul>
            <a href="/pricing" className="mt-5 inline-flex min-h-11 items-center font-bold text-cyan-300 underline-offset-4 hover:text-cyan-200 hover:underline">View full repair pricing and parts notes <span className="ml-2" aria-hidden="true">→</span></a>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-900/30 p-6 sm:p-8">
            <h2 className="text-2xl font-black text-white">Booking questions</h2>
            <div className="mt-4 divide-y divide-slate-800">
              <details className="py-3">
                <summary className="cursor-pointer font-semibold text-slate-200">Is the initial diagnostic free?</summary>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">Yes. The initial diagnostic is free. We share the recommended work and quote before any paid repair begins.</p>
              </details>
              <details className="py-3">
                <summary className="cursor-pointer font-semibold text-slate-200">Is pickup and delivery free across Kuwait?</summary>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">KCROC arranges free pickup and return across Kuwait governorates. Our team confirms collection details with you on WhatsApp.</p>
              </details>
              <details className="py-3">
                <summary className="cursor-pointer font-semibold text-slate-200">How long will a repair take?</summary>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">Timing depends on the fault, device model and parts availability. Many standard hardware repairs take around 24–48 hours; complex repairs may take longer.</p>
              </details>
            </div>
          </div>
        </section>

        <section className="mt-12 border-t border-slate-800 pt-10" aria-labelledby="booking-next-steps">
          <div className="mb-6 max-w-3xl">
            <h2 id="booking-next-steps" className="text-2xl font-black text-white sm:text-3xl">What happens after you contact us?</h2>
            <p className="mt-3 leading-relaxed text-slate-400">A clear process helps you decide what to do next without guessing the fault or approving work too early.</p>
          </div>
          <ol className="grid gap-4 md:grid-cols-3">
            <li className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
              <span className="text-xs font-black uppercase tracking-widest text-cyan-400">Step 1</span>
              <h3 className="mt-2 font-bold text-white">Share the symptoms</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">Tell us the device model if known, what happened, and your area in Kuwait. Photos or a short video can help explain visible symptoms.</p>
            </li>
            <li className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
              <span className="text-xs font-black uppercase tracking-widest text-cyan-400">Step 2</span>
              <h3 className="mt-2 font-bold text-white">Confirm pickup and diagnosis</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">Our team discusses the collection details. The device is assessed at the Hawalli lab; the exact fault may only be clear after testing.</p>
            </li>
            <li className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
              <span className="text-xs font-black uppercase tracking-widest text-cyan-400">Step 3</span>
              <h3 className="mt-2 font-bold text-white">Review the quote</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">We explain the recommended repair and cost so you can decide whether to proceed. Completion time depends on the fault and parts availability.</p>
            </li>
          </ol>
          <p className="mt-5 text-sm text-slate-500">Not sure which repair you need? <a href="/services" className="font-semibold text-cyan-400 hover:text-cyan-300">Browse repair services</a> or <a href="/near-me" className="font-semibold text-cyan-400 hover:text-cyan-300">read about local pickup</a>.</p>
        </section>
      </div>
    </div>
  );
}
