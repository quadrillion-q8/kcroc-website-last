// File: app/frontend/src/pages/Contact.tsx
import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Phone, Mail, MapPin, Clock, MessageCircle, Send, Loader2, Navigation, ArrowUpRight
} from 'lucide-react';
import { ROUTES } from '../constants/routes';
import MapComponent from '../components/MapComponent';
import { KCROC_GRAPH } from '../data/graph';

// 👈 Phase 2 SEO Engine Imported
import { SEOEngine } from '../core/components/SEOEngine';

/* ─────────────────────────────────────────────────────────────────────────────
   1. PAGE DATA & CONSTANTS
───────────────────────────────────────────────────────────────────────────── */

const business = KCROC_GRAPH.business!;

const EMAIL = business.email;
const PHONE_CLEAN = business.telephone.replace(/\D/g, '');
const PHONE_DISPLAY = '+965 ' + PHONE_CLEAN.replace(/^965/, '');
const MAPS_URL = business.socialLinks.googleMaps;
const WHATSAPP_URL = 'https://wa.me/' + PHONE_CLEAN + '?text=' + encodeURIComponent(
  'Hi KCROC, I would like to ask about computer or laptop repair in Kuwait. Please help me arrange a visit or free pickup.'
);

const LOCATION_PHOTOS = [
  {
    src: '/images/kcroc-al-mullah-complex-hawalli-exterior.webp',
    alt: 'Exterior of Al Mullah Complex in Hawalli, where the KCROC repair laboratory is located.',
    caption: 'Al Mullah Complex — Hawalli',
  },
  {
    src: '/images/kcroc-commercial-complex-view-dusk.webp',
    alt: 'Al Mullah commercial complex viewed at dusk in Hawalli, Kuwait.',
    caption: 'The commercial complex at dusk',
  },
  {
    src: '/images/kcroc-al-mullah-complex-hawalli-night-view.webp',
    alt: 'Night view of Al Mullah Complex in Hawalli, Kuwait.',
    caption: 'Al Mullah Complex at night',
  },
  {
    src: '/images/kcroc-al-mullah-complex-basement-shop-entrance.webp',
    alt: 'Basement entrance to KCROC repair laboratory at Shop 19, Al Mullah Complex, Hawalli.',
    caption: 'Basement entrance — Shop 19',
  },
  {
    src: '/images/gallery/computer-repair-shop-glass-entrance-used-monitors-kuwait.webp',
    alt: 'Genuine KCROC repair laboratory entrance with computer monitors visible inside.',
    caption: 'The KCROC repair laboratory',
  },
];

type FormData = {
  name: string;
  device: string;
  pickupArea: string;
  symptoms: string;
};

const initialFormData: FormData = {
  name: '',
  device: '',
  pickupArea: '',
  symptoms: '',
};

/* ─────────────────────────────────────────────────────────────────────────────
   2. MAIN COMPONENT
───────────────────────────────────────────────────────────────────────────── */

export default function Contact() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const whatsappMessage = useMemo(
    () => [
      '*New Repair Enquiry*',
      '',
      `*Name:* ${formData.name}`,
      `*Device type / model:* ${formData.device}`,
      `*Pickup area / governorate:* ${formData.pickupArea}`,
      '',
      '*Fault / symptoms:*',
      formData.symptoms,
    ].join('\n'),
    [formData]
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 🚀 FIX: this form previously had `noValidate` on the <form> tag with no
    // replacement validation logic — the `required` attributes on Name/Phone/
    // Subject/Message were purely decorative. Confirmed via a full Puppeteer
    // submission test: clicking submit with every field empty successfully
    // opened WhatsApp with a blank templated message ("Name: \nPhone: \n...").
    // Guard explicitly here now that native browser validation is restored
    // (see the <form> tag) as defense in depth, in case this handler is ever
    // reached with an incomplete formData some other way.
    if (
      !formData.name.trim() ||
      !formData.device.trim() ||
      !formData.pickupArea.trim() ||
      !formData.symptoms.trim()
    ) {
      return;
    }
    setIsSubmitting(true);
    try {
      const url = `https://wa.me/${PHONE_CLEAN}?text=${encodeURIComponent(whatsappMessage)}`;
      const popup = window.open(url, '_blank', 'noopener,noreferrer');
      if (!popup) window.location.href = url;
    } finally {
      setTimeout(() => setIsSubmitting(false), 800);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full min-h-screen bg-transparent text-white font-sans selection:bg-cyan-500/30 pt-8 sm:pt-16 lg:pt-32">
      
      {/* 🚀 PHASE 2 AUTOMATION IN ACTION: Using the Hawalli Location Entity */}
      <SEOEngine entityId="page-contact" />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-6 mb-8 relative z-10">
        <ol className="flex items-center space-x-2 text-sm text-slate-400 font-medium">
          <li><Link to={ROUTES.HOME} className="hover:text-cyan-400 transition-colors">Home</Link></li>
          <li><span className="text-slate-600">/</span></li>
          <li aria-current="page" className="text-cyan-400">Contact</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="relative pb-16 px-6 flex flex-col items-center text-center z-10">
        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-white">
          Contact <span className="text-cyan-400">KCROC</span> – Computer Repair in Hawalli, Kuwait
        </h1>
        <p className="text-slate-300 max-w-3xl mx-auto text-base md:text-lg leading-8">
          Speak with the KCROC computer repair team in Hawalli, Kuwait. Visit our component-level repair laboratory at Al Mullah Complex, Basement Shop 19, or arrange free laptop and computer pickup from your home or office anywhere across Kuwait. Our technicians handle laptops, MacBooks, gaming PCs and motherboard faults, with a free initial diagnosis and a clear quote before paid repair work begins.
        </p>
        <div className="mt-8 flex w-full max-w-4xl flex-col justify-center gap-3 sm:flex-row">
          <a href={'tel:+' + PHONE_CLEAN} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 font-black text-slate-950 transition-colors hover:bg-cyan-400">
            <Phone size={19} aria-hidden="true" /> Call {PHONE_DISPLAY}
          </a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-6 py-3 font-bold text-emerald-300 transition-colors hover:bg-emerald-500/20">
            <MessageCircle size={19} aria-hidden="true" /> WhatsApp KCROC
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/60 px-6 py-3 font-bold text-white transition-colors hover:border-cyan-500/50 hover:text-cyan-300">
            <Navigation size={19} aria-hidden="true" /> Get Directions
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
        <p className="mt-4 text-sm text-slate-400">
          KCROC has one physical repair laboratory in Hawalli. Free pickup and delivery are available across Kuwait.
        </p>
      </section>

      {/* Form + Info */}
      <section className="py-12 md:py-20 px-6 border-t border-slate-800/50 relative z-10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          
          {/* Glassmorphism Form Container */}
          <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 lg:p-10 transition-all duration-500 ease-out hover:border-cyan-500/50 hover:shadow-[0_0_40px_-10px_rgba(6,182,212,0.3)] hover:-translate-y-1">
            <h2 className="text-2xl font-black mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="sr-only" htmlFor="contact-name">Full name</label>
                <input id="contact-name" autoComplete="name" name="name" value={formData.name} onChange={handleInputChange} required placeholder="Full name" className="w-full bg-brand-dark/50 border border-slate-700 px-4 py-3 rounded-xl text-white focus:outline-none focus:border-cyan-500 transition-colors" />
              </div>
              <div>
                <label className="sr-only" htmlFor="contact-device">Device type / model</label>
                <input id="contact-device" name="device" value={formData.device} onChange={handleInputChange} required placeholder="Device type / model (e.g., MacBook Pro 14-inch)" className="w-full bg-brand-dark/50 border border-slate-700 px-4 py-3 rounded-xl text-white focus:outline-none focus:border-cyan-500 transition-colors" />
              </div>
              <div>
                <label className="sr-only" htmlFor="contact-area">Pickup area / governorate</label>
                <select id="contact-area" name="pickupArea" value={formData.pickupArea} onChange={handleInputChange} required className="w-full bg-brand-dark/50 border border-slate-700 px-4 py-3 rounded-xl text-white focus:outline-none focus:border-cyan-500 transition-colors [color-scheme:dark]">
                  <option value="" disabled>Select your pickup area / governorate</option>
                  <option value="Hawalli">Hawalli</option>
                  <option value="Salmiya">Salmiya</option>
                  <option value="Kuwait City">Kuwait City</option>
                  <option value="Farwaniya">Farwaniya</option>
                  <option value="Ahmadi">Ahmadi</option>
                  <option value="Jahra">Jahra</option>
                  <option value="Fahaheel">Fahaheel</option>
                  <option value="Mangaf">Mangaf</option>
                  <option value="Other Kuwait area">Other Kuwait area</option>
                </select>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">Free pickup and delivery are available across Kuwait. Your area helps us coordinate collection.</p>
              </div>
              <div>
                <label className="sr-only" htmlFor="contact-symptoms">Fault / symptoms</label>
                <textarea id="contact-symptoms" name="symptoms" value={formData.symptoms} onChange={handleInputChange} required rows={4} placeholder="Fault / symptoms (e.g., no power, liquid damage, overheating, broken screen, charging issue)" className="w-full bg-brand-dark/50 border border-slate-700 px-4 py-3 rounded-xl text-white focus:outline-none focus:border-cyan-500 transition-colors resize-y" />
              </div>
              <button type="submit" disabled={isSubmitting} aria-busy={isSubmitting} className="w-full min-h-11 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed">
                {isSubmitting ? (
                  <><Loader2 className="animate-spin" size={20} aria-hidden="true" /> Preparing WhatsApp...</>
                ) : (
                  <><Send size={20} aria-hidden="true" /> Send Repair Details via WhatsApp</>
                )}
              </button>
              <p className="sr-only" aria-live="polite">{isSubmitting ? 'Preparing your WhatsApp repair enquiry.' : ''}</p>
            </form>
          </div>

          {/* Side Info */}
          <div className="space-y-6">
            <div className="bg-slate-900/40 backdrop-blur-xl p-8 lg:p-10 rounded-3xl border border-slate-800 h-full">
              <h2 className="text-2xl font-black mb-8">Direct Contact</h2>
              
              <div className="space-y-8">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="bg-cyan-500/10 p-3 rounded-full shrink-0">
                    <Phone className="text-cyan-400" size={24} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Call Us</h3>
                    <a href={`tel:+${PHONE_CLEAN}`} className="text-slate-400 hover:text-cyan-400 transition-colors block">
                      {PHONE_DISPLAY}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="bg-cyan-500/10 p-3 rounded-full shrink-0">
                    <Mail className="text-cyan-400" size={24} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Email</h3>
                    <a href={`mailto:${EMAIL}`} className="text-slate-400 hover:text-cyan-400 transition-colors block">
                      {EMAIL}
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="bg-cyan-500/10 p-3 rounded-full shrink-0">
                    <MapPin className="text-cyan-400" size={24} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Visit Lab</h3>
                    <address className="not-italic text-slate-400">
                      {business.streetAddress}<br />
                      {business.addressLocality}, Kuwait
                    </address>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="bg-cyan-500/10 p-3 rounded-full shrink-0">
                    <Clock className="text-cyan-400" size={24} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Business Hours</h3>
                    <p className="text-slate-400">{business.openingHours}</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real photos help visitors identify the actual complex, basement entrance and lab. */}
      <section className="border-t border-slate-800/50 px-6 py-14 md:py-20" aria-labelledby="contact-location-photos">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 id="contact-location-photos" className="text-2xl font-black text-white md:text-3xl">Find the KCROC Lab at Al Mullah Complex</h2>
            <p className="mx-auto mt-3 max-w-3xl leading-7 text-slate-300">
              These are real photos of the Hawalli commercial complex, the basement entrance at Shop 19 and the KCROC repair laboratory. Use them to recognise the building when visiting.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {LOCATION_PHOTOS.map((photo) => (
              <figure key={photo.src} className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  width={640}
                  height={480}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover"
                />
                <figcaption className="px-4 py-3 text-sm font-medium text-slate-300">{photo.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-20 px-6 border-t border-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-black mb-4 text-center">Find Us in Hawalli</h2>
          <p className="max-w-3xl mx-auto mb-3 text-center text-slate-300 leading-7">
            <strong className="text-white">Dropping off in person?</strong> Visit our ESD-safe repair lab at Ibn Khaldoun Street, Al Mullah Complex, Basement Shop 19, Hawalli. We&apos;re open daily from 10:00 AM to 10:00 PM, and no appointment is needed.
          </p>
          <p className="max-w-3xl mx-auto mb-8 text-center text-slate-400 leading-7">
            Prefer not to drive? Arrange free door-to-door pickup and delivery from any of our Kuwait service areas.
          </p>
          <div className="rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
            <MapComponent />
          </div>
        </div>
      </section>

      {/* Short, contact-specific answers; FAQPage markup is intentionally not added. */}
      <section className="border-t border-slate-800/50 px-6 py-14" aria-labelledby="contact-questions">
        <div className="mx-auto max-w-5xl">
          <h2 id="contact-questions" className="mb-6 text-center text-2xl font-black text-white">Visiting and Contact Questions</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <details className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
              <summary className="cursor-pointer font-bold text-white">Can I visit KCROC in person?</summary>
              <p className="mt-3 leading-7 text-slate-300">Yes. Dropping off in person? Visit our ESD-safe repair lab at Ibn Khaldoun Street, Al Mullah Complex, Basement Shop 19, Hawalli. We are open daily from 10:00 AM to 10:00 PM.</p>
            </details>
            <details className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
              <summary className="cursor-pointer font-bold text-white">Do you have repair branches outside Hawalli?</summary>
              <p className="mt-3 leading-7 text-slate-300">Hawalli is KCROC&apos;s physical repair laboratory. For other areas, we arrange free pickup and delivery across Kuwait rather than presenting service areas as additional storefronts.</p>
            </details>
            <details className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
              <summary className="cursor-pointer font-bold text-white">Can I arrange pickup without visiting the lab?</summary>
              <p className="mt-3 leading-7 text-slate-300">Yes. Use the WhatsApp button or booking page to share your device model, fault and area so the team can coordinate free pickup.</p>
            </details>
            <details className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
              <summary className="cursor-pointer font-bold text-white">What should I send before contacting a technician?</summary>
              <p className="mt-3 leading-7 text-slate-300">Share the device brand and model, a short description of the fault, and your area. You can use the form above to prepare those details in WhatsApp.</p>
            </details>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-800/50 px-6 py-12" aria-labelledby="contact-helpful-pages">
        <div className="mx-auto max-w-6xl">
          <h2 id="contact-helpful-pages" className="mb-5 text-2xl font-black text-white">Explore KCROC Repair Services</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Link to="/location/hawalli" className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 font-semibold text-cyan-300 transition-colors hover:border-cyan-500/50 hover:text-cyan-200">Hawalli repair lab and local services <ArrowUpRight className="ml-1 inline h-4 w-4" aria-hidden="true" /></Link>
            <Link to="/computer-repair-kuwait" className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 font-semibold text-cyan-300 transition-colors hover:border-cyan-500/50 hover:text-cyan-200">Computer repair in Kuwait <ArrowUpRight className="ml-1 inline h-4 w-4" aria-hidden="true" /></Link>
            <Link to="/laptop-repair-kuwait" className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 font-semibold text-cyan-300 transition-colors hover:border-cyan-500/50 hover:text-cyan-200">Laptop repair in Kuwait <ArrowUpRight className="ml-1 inline h-4 w-4" aria-hidden="true" /></Link>
            <Link to="/pricing" className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 font-semibold text-cyan-300 transition-colors hover:border-cyan-500/50 hover:text-cyan-200">Computer and laptop repair prices <ArrowUpRight className="ml-1 inline h-4 w-4" aria-hidden="true" /></Link>
            <Link to="/book" className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 font-semibold text-cyan-300 transition-colors hover:border-cyan-500/50 hover:text-cyan-200">Book free pickup across Kuwait <ArrowUpRight className="ml-1 inline h-4 w-4" aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
