import React, { useState } from 'react';
import { createClient } from '@metagptx/web-sdk';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Calendar, Clock, Laptop, Phone, Mail, User, 
  MessageSquare, CheckCircle, MessageCircle as MessageCircleIcon, 
  HelpCircle, Star, PhoneCall 
} from 'lucide-react';
import MetaSEO from '../components/seo/MetaSEO';
import SchemaMarkup from '../components/seo/SchemaMarkup'; // Added to handle your schemas

const client = createClient();

const DEVICE_TYPES = [
  'Laptop',
  'Desktop PC',
  'MacBook / iMac',
  'Gaming PC',
  'Printer / Scanner',
  'Other',
];

const TIME_SLOTS = [
  { value: 'morning', label: 'Morning (10:00 AM – 1:00 PM)' },
  { value: 'afternoon', label: 'Afternoon (1:00 PM – 5:00 PM)' },
  { value: 'evening', label: 'Evening (5:00 PM – 10:00 PM)' },
];

/* ─────────────────────────────────────────────────────────────────────────────
   1. ZOD VALIDATION SCHEMA & STRUCTURED DATA
───────────────────────────────────────────────────────────────────────────── */

const bookingSchema = z.object({
  customer_name: z.string().min(3, { message: 'Name must be at least 3 characters' }),
  customer_phone: z.string().regex(/^(965)?[569]\d{7}$/, { 
    message: 'Valid Kuwait number required (e.g., 55301913 or 96555301913)' 
  }),
  customer_email: z.union([z.literal(''), z.string().email({ message: 'Invalid email address' })]).optional(),
  device_type: z.string().min(1, { message: 'Please select a device type' }),
  issue_description: z.string().min(10, { message: 'Please provide a brief description (min 10 chars)' }),
  pickup_date: z.string().min(1, { message: 'Please select a preferred date' }),
  pickup_time_slot: z.string().min(1, { message: 'Please select a time slot' }),
  honeypot: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

// Combined all your schemas into one standardized graph
const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.computerrepairkuwait.com/book#webpage",
      "name": "Book Laptop & Computer Repair Pickup in Kuwait | KCROC",
      "url": "https://www.computerrepairkuwait.com/book",
      "description": "Book free laptop and computer repair pickup anywhere in Kuwait. Same-day hardware assessment. 30-day warranty.",
      "mainEntity": {
        "@type": "LocalBusiness",
        "name": "Kuwait Computer Repair On Call (KCROC)",
        "telephone": "+96555301913",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Al Mullah Complex, Ibn Khaldoun Street, Basement Shop 19",
          "addressLocality": "Hawalli",
          "addressCountry": "KW"
        }
      }
    },
    {
      "@type": "Service",
      "name": "Computer Repair Booking",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Kuwait Computer Repair On Call (KCROC)",
        "telephone": "+96555301913",
        "url": "https://www.computerrepairkuwait.com"
      }
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
   2. MAIN COMPONENT
───────────────────────────────────────────────────────────────────────────── */

export default function BookingPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [hasStarted, setHasStarted] = useState(false);

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const customerName = watch('customer_name');
  const customerPhone = watch('customer_phone');

  const trackEvent = (eventName: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName);
    }
  };

  const onSubmit = async (data: BookingFormData) => {
    setSubmitError('');

    // Spam protection
    if (data.honeypot) {
      setSubmitted(true);
      return;
    }

    const cleanPhone = data.customer_phone.replace(/\s|-|\+/g, '');

    try {
      const response = await client.entities.service_bookings.create({
        data: {
          customer_name: data.customer_name,
          customer_phone: cleanPhone,
          customer_email: data.customer_email || '',
          device_type: data.device_type,
          issue_description: data.issue_description,
          pickup_date: data.pickup_date,
          pickup_time_slot: data.pickup_time_slot,
          status: 'pending',
          created_at: new Date().toISOString(),
        },
      });

      if (response?.data) {
        setSubmitted(true);
        trackEvent('booking_submitted');
      } else {
        throw new Error('DATABASE_ERROR');
      }
    } catch (err: any) {
      console.error('Booking submission error:', err);
      trackEvent('booking_failed');
      
      if (err.message?.includes('Network Error') || err.name === 'TypeError') {
        setSubmitError('Network connection failed. Please check your internet and try again.');
      } else if (err.message === 'DATABASE_ERROR') {
        setSubmitError('Our system is currently busy. Please call us directly to book.');
      } else {
        setSubmitError('Failed to submit booking. Please try again or contact us via WhatsApp.');
      }
    }
  };

  // Tracking first interaction
  const handleFormInteraction = () => {
    if (!hasStarted) {
      setHasStarted(true);
      trackEvent('booking_started');
    }
  };

  /* ─────────────────────────────────────────────────────────────────────────────
     SUCCESS SCREEN
  ───────────────────────────────────────────────────────────────────────────── */
  if (submitted) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6 pt-20 font-sans">
        <div className="bg-slate-900/40 border border-slate-800 rounded-3xl max-w-xl w-full shadow-2xl p-8 md:p-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/30">
            <CheckCircle className="w-10 h-10 text-emerald-400" />
          </div>
          <h2 className="text-3xl font-black text-white mb-4 tracking-tight">Booking Confirmed!</h2>
          <p className="text-slate-400 mb-8 leading-relaxed">
            Thank you, <strong className="text-white">{customerName}</strong>! Your hardware assessment booking has been received. 
            We'll contact you on <strong className="text-emerald-400">{customerPhone}</strong> to confirm your pickup details.
          </p>

          <div className="bg-slate-950 rounded-2xl p-6 mb-8 text-left space-y-4 border border-slate-800 shadow-inner">
            <h3 className="text-white font-bold flex items-center gap-2 mb-4">
              <HelpCircle className="w-5 h-5 text-emerald-400" /> Need immediate assistance?
            </h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="tel:+96555301913" className="flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl flex-1 transition-all border border-slate-700">
                <PhoneCall className="w-4 h-4 mr-2 text-cyan-400" /> Call +965 5530 1913
              </a>
              <a href="https://wa.me/96555301913" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl flex-1 transition-all shadow-lg shadow-emerald-900/20">
                <MessageCircleIcon className="w-4 h-4 mr-2" /> WhatsApp Us
              </a>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8">
            <p className="text-slate-500 text-sm mb-4">Happy with our easy booking process? Help us grow!</p>
            <a href="https://g.page/r/CWbK8KGjkYY2EAE/review" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-full border border-yellow-500/30 text-yellow-500 hover:bg-yellow-500/10 font-bold py-3 rounded-xl transition-all">
              <Star className="w-4 h-4 mr-2 fill-yellow-500" /> Leave us a Google Review
            </a>
          </div>
        </div>
      </main>
    );
  }

  /* ─────────────────────────────────────────────────────────────────────────────
     FORM SCREEN
  ───────────────────────────────────────────────────────────────────────────── */
  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only absolute z-50 p-4 bg-emerald-600 text-white">
        Skip to main content
      </a>
      
      <main id="main-content" className="min-h-screen bg-slate-950 text-white font-sans selection:bg-cyan-500/30 pt-32 pb-24 px-6">
        <MetaSEO 
            title="Book Laptop & Computer Repair Pickup in Kuwait | KCROC" 
            description="Book free laptop and computer repair pickup anywhere in Kuwait. Same-day hardware assessment. 30-day warranty." 
            canonical="https://www.computerrepairkuwait.com/book"
        />
        <SchemaMarkup schema={STRUCTURED_DATA} />

        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
              Book a <span className="text-cyan-400">Repair Pickup</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Fill out the details below to schedule your free diagnostic and device pickup anywhere in Kuwait.
            </p>
          </div>

          <form 
            onSubmit={handleSubmit(onSubmit)} 
            onFocus={handleFormInteraction}
            className="bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6"
          >
            {submitError && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl text-sm font-medium">
                {submitError}
              </div>
            )}

            {/* Honeypot Field (Hidden from users, stops bots) */}
            <input type="text" {...register('honeypot')} className="hidden" aria-hidden="true" tabIndex={-1} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                  <input
                    {...register('customer_name')}
                    type="text"
                    placeholder="e.g. Abdullah Salem"
                    className={`w-full bg-slate-950 border rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 transition-all ${
                      errors.customer_name ? 'border-red-500 focus:ring-red-500/50' : 'border-slate-800 focus:border-cyan-500 focus:ring-cyan-500/20'
                    }`}
                  />
                </div>
                {errors.customer_name && <p className="text-red-400 text-xs mt-2">{errors.customer_name.message}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">Kuwait Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                  <span className="absolute left-11 top-1/2 -translate-y-1/2 text-slate-500 font-bold border-r border-slate-800 pr-2">+965</span>
                  <input
                    {...register('customer_phone')}
                    type="tel"
                    placeholder="5XXXXXXX"
                    className={`w-full bg-slate-950 border rounded-xl py-3 pl-28 pr-4 text-white focus:outline-none focus:ring-2 transition-all ${
                      errors.customer_phone ? 'border-red-500 focus:ring-red-500/50' : 'border-slate-800 focus:border-cyan-500 focus:ring-cyan-500/20'
                    }`}
                  />
                </div>
                {errors.customer_phone && <p className="text-red-400 text-xs mt-2">{errors.customer_phone.message}</p>}
              </div>
            </div>

            {/* Email & Device Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">Email Address (Optional)</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                  <input
                    {...register('customer_email')}
                    type="email"
                    placeholder="email@example.com"
                    className={`w-full bg-slate-950 border rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 transition-all ${
                      errors.customer_email ? 'border-red-500 focus:ring-red-500/50' : 'border-slate-800 focus:border-cyan-500 focus:ring-cyan-500/20'
                    }`}
                  />
                </div>
                {errors.customer_email && <p className="text-red-400 text-xs mt-2">{errors.customer_email.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">Device Type</label>
                <div className="relative">
                  <Laptop className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                  <select
                    {...register('device_type')}
                    className={`w-full bg-slate-950 border rounded-xl py-3 pl-12 pr-4 text-white appearance-none focus:outline-none focus:ring-2 transition-all ${
                      errors.device_type ? 'border-red-500 focus:ring-red-500/50' : 'border-slate-800 focus:border-cyan-500 focus:ring-cyan-500/20'
                    }`}
                  >
                    <option value="">Select a device</option>
                    {DEVICE_TYPES.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                {errors.device_type && <p className="text-red-400 text-xs mt-2">{errors.device_type.message}</p>}
              </div>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">Preferred Pickup Date</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                  <input
                    {...register('pickup_date')}
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    className={`w-full bg-slate-950 border rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 transition-all ${
                      errors.pickup_date ? 'border-red-500 focus:ring-red-500/50' : 'border-slate-800 focus:border-cyan-500 focus:ring-cyan-500/20'
                    }`}
                  />
                </div>
                {errors.pickup_date && <p className="text-red-400 text-xs mt-2">{errors.pickup_date.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2">Preferred Time Slot</label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                  <select
                    {...register('pickup_time_slot')}
                    className={`w-full bg-slate-950 border rounded-xl py-3 pl-12 pr-4 text-white appearance-none focus:outline-none focus:ring-2 transition-all ${
                      errors.pickup_time_slot ? 'border-red-500 focus:ring-red-500/50' : 'border-slate-800 focus:border-cyan-500 focus:ring-cyan-500/20'
                    }`}
                  >
                    <option value="">Select a time slot</option>
                    {TIME_SLOTS.map(slot => (
                      <option key={slot.value} value={slot.value}>{slot.label}</option>
                    ))}
                  </select>
                </div>
                {errors.pickup_time_slot && <p className="text-red-400 text-xs mt-2">{errors.pickup_time_slot.message}</p>}
              </div>
            </div>

            {/* Issue Description */}
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">Issue Description</label>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-4 text-slate-500 w-5 h-5" />
                <textarea
                  {...register('issue_description')}
                  rows={4}
                  placeholder="Please describe what is happening with your device..."
                  className={`w-full bg-slate-950 border rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 transition-all ${
                    errors.issue_description ? 'border-red-500 focus:ring-red-500/50' : 'border-slate-800 focus:border-cyan-500 focus:ring-cyan-500/20'
                  }`}
                />
              </div>
              {errors.issue_description && <p className="text-red-400 text-xs mt-2">{errors.issue_description.message}</p>}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-lg py-4 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:scale-[1.01] transition-all disabled:opacity-70 disabled:pointer-events-none flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                    Processing Request...
                  </>
                ) : (
                  'Confirm Booking'
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
