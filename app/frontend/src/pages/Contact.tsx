// File: app/frontend/src/pages/Contact.tsx
import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Phone, Mail, MapPin, Clock, MessageCircle, Send, Loader2
} from 'lucide-react';
import { ROUTES } from '../constants/routes';
import MapComponent from '../components/MapComponent';

// 👈 Phase 2 SEO Engine Imported
import { SEOEngine } from '../core/components/SEOEngine';

/* ─────────────────────────────────────────────────────────────────────────────
   1. PAGE DATA & CONSTANTS
───────────────────────────────────────────────────────────────────────────── */

const ADDRESS_LINES = [
  'Ibn Khaldoun St, Al Mullah Complex',
  'Basement Shop 19',
  'Hawalli, Kuwait',
];

const EMAIL = 'quadrillion1980@gmail.com';
const PHONE_DISPLAY = '+965 5530 1913';
const PHONE_CLEAN = '96555301913';

type FormData = {
  name: string; email: string; phone: string; subject: string; message: string;
};

const initialFormData: FormData = {
  name: '', email: '', phone: '', subject: '', message: ''
};

/* ─────────────────────────────────────────────────────────────────────────────
   2. MAIN COMPONENT
───────────────────────────────────────────────────────────────────────────── */

export default function Contact() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const whatsappMessage = useMemo(
    () => `*New Contact Enquiry*\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Email:* ${formData.email}\n*Subject:* ${formData.subject}\n\n*Message:*\n${formData.message}`,
    [formData]
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const url = `https://wa.me/${PHONE_CLEAN}?text=${encodeURIComponent(whatsappMessage)}`;
      const popup = window.open(url, '_blank', 'noopener,noreferrer');
      if (!popup) window.location.href = url;
    } finally {
      setTimeout(() => setIsSubmitting(false), 800);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <main className="w-full min-h-screen bg-transparent text-white font-sans selection:bg-cyan-500/30 pt-32">
      
      {/* 🚀 PHASE 2 AUTOMATION IN ACTION: Using the Hawalli Location Entity */}
      <SEOEngine entityId="loc-hawalli" />

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
          Contact <span className="text-cyan-400">KCROC</span>
        </h1>
        <p className="text-slate-400 max-w-md mx-auto text-lg">
          Expert hardware support. We offer free pick & drop service across Kuwait.
        </p>
      </section>

      {/* Form + Info */}
      <section className="py-12 md:py-20 px-6 border-t border-slate-800/50 relative z-10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          
          {/* Glassmorphism Form Container */}
          <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 lg:p-10 transition-all duration-500 ease-out hover:border-cyan-500/50 hover:shadow-[0_0_40px_-10px_rgba(6,182,212,0.3)] hover:-translate-y-1">
            <h2 className="text-2xl font-black mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="grid md:grid-cols-2 gap-6">
                <input name="name" value={formData.name} onChange={handleInputChange} required placeholder="Full Name" className="w-full bg-slate-950/50 border border-slate-700 px-4 py-3 rounded-xl focus:outline-none focus:border-cyan-500 transition-colors" />
                <input name="phone" value={formData.phone} onChange={handleInputChange} required placeholder="+965 XXXX XXXX" className="w-full bg-slate-950/50 border border-slate-700 px-4 py-3 rounded-xl focus:outline-none focus:border-cyan-500 transition-colors" />
              </div>
              <input name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="Email" className="w-full bg-slate-950/50 border border-slate-700 px-4 py-3 rounded-xl focus:outline-none focus:border-cyan-500 transition-colors" />
              <input name="subject" value={formData.subject} onChange={handleInputChange} required placeholder="Subject" className="w-full bg-slate-950/50 border border-slate-700 px-4 py-3 rounded-xl focus:outline-none focus:border-cyan-500 transition-colors" />
              <textarea name="message" value={formData.message} onChange={handleInputChange} required rows={5} placeholder="Message" className="w-full bg-slate-950/50 border border-slate-700 px-4 py-3 rounded-xl focus:outline-none focus:border-cyan-500 transition-colors resize-none" />
              <button type="submit" disabled={isSubmitting} className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed">
                {isSubmitting ? (
                  <><Loader2 className="animate-spin" size={20} /> Sending...</>
                ) : (
                  <><Send size={20} /> Send Message via WhatsApp</>
                )}
              </button>
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
                    <Phone className="text-cyan-400" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Call Us</h3>
                    <a href={`tel:${PHONE_CLEAN}`} className="text-slate-400 hover:text-cyan-400 transition-colors block">
                      {PHONE_DISPLAY}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="bg-cyan-500/10 p-3 rounded-full shrink-0">
                    <Mail className="text-cyan-400" size={24} />
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
                    <MapPin className="text-cyan-400" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Visit Lab</h3>
                    <p className="text-slate-400">
                      {ADDRESS_LINES[0]}<br />
                      {ADDRESS_LINES[1]}<br />
                      {ADDRESS_LINES[2]}
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="bg-cyan-500/10 p-3 rounded-full shrink-0">
                    <Clock className="text-cyan-400" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Business Hours</h3>
                    <p className="text-slate-400">10:00 AM – 10:00 PM Daily</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-20 px-6 border-t border-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-black mb-8 text-center">Find Us in Hawalli</h2>
          <div className="rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
            <MapComponent />
          </div>
        </div>
      </section>
    </main>
  );
}
