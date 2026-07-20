// File: app/frontend/src/pages/BookingPage.tsx
import React, { useState } from 'react';
import { createClient } from '@metagptx/web-sdk';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link } from 'react-router-dom';
import { 
  Calendar, Clock, Laptop, Phone, Mail, User, 
  MessageSquare, CheckCircle, MessageCircle as MessageCircleIcon, 
  HelpCircle, Star, PhoneCall 
} from 'lucide-react';

import SchemaMarkup from '../components/seo/SchemaMarkup';
import { SEOEngine } from '../core/components/SEOEngine';

// Global declaration to fix TypeScript 'any' issues with window.gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

const client = createClient();

/* ─────────────────────────────────────────────────────────────────────────────
   1. PAGE DATA & CONSTANTS
───────────────────────────────────────────────────────────────────────────── */
const BASE_URL = 'https://computerrepairkuwait.com';
const PAGE_URL = `${BASE_URL}/book`;
const REVIEWS_URL = 'https://g.page/r/CWbK8KGjkYY2EAE/review';
const PHONE_DISPLAY = '+965 5530 1913';
const PHONE_CLEAN = '96555301913';
const BUSINESS_NAME = 'Kuwait Computer Repair On Call';

const DEVICE_TYPES = [
  'Laptop', 'Desktop PC', 'MacBook / iMac', 'Gaming PC', 'Printer / Scanner', 'Other'
];

const TIME_SLOTS = [
  { value: 'morning',   label: 'Morning (10:00 AM – 1:00 PM)' },
  { value: 'afternoon', label: 'Afternoon (1:00 PM – 5:00 PM)' },
  { value: 'evening',   label: 'Evening (5:00 PM – 10:00 PM)' },
];

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      "name": "Book Laptop & Computer Repair Pickup in Kuwait | KCROC",
      "url": PAGE_URL,
      "description": "Book free laptop and computer repair pickup anywhere in Kuwait. Same-day hardware assessment. 30-day warranty.",
      "isPartOf": { "@id": `${BASE_URL}/#website` },
      "breadcrumb": { "@id": `${PAGE_URL}#breadcrumb` },
      "mainEntity": {
        "@type": "LocalBusiness",
        "name": BUSINESS_NAME,
        "telephone": PHONE_DISPLAY,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19",
          "addressLocality": "Hawalli",
          "addressRegion": "Hawalli Governorate",
          "addressCountry": "KW"
        }
      }
    },
    {
      "@type": "Service",
      "name": "Computer Repair Booking",
      "provider": {
        "@type": "LocalBusiness",
        "name": BUSINESS_NAME,
        "telephone": PHONE_DISPLAY,
        "url": BASE_URL
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
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${PAGE_URL}#breadcrumb`,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home",    "item": BASE_URL },
        { "@type": "ListItem", "position": 2, "name": "Book",    "item": PAGE_URL }
      ]
    }
  ]
};

/* ─────────────────────────────────────────────────────────────────────────────
   2. ZOD SCHEMA
───────────────────────────────────────────────────────────────────────────── */
const bookingSchema = z.object({
  customer_name:      z.string().min(3, { message: 'Name must be at least 3 characters' }),
  customer_phone:     z.string().regex(/^(965)?[569]\d{7}$/, {
    message: 'Valid Kuwait number required (e.g., 55301913 or 96555301913)'
  }),
  customer_email:     z.union([z.literal(''), z.string().email({ message: 'Invalid email address' })]).optional(),
  device_type:        z.string().min(1, { message: 'Please select a device type' }),
  issue_description:  z.string().min(10, { message: 'Please provide a brief description (min 10 chars)' }),
  pickup_date:        z.string().min(1, { message: 'Please select a preferred date' }),
  pickup_time_slot:   z.string().min(1, { message: 'Please select a time slot' }),
  honeypot:           z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

/* ─────────────────────────────────────────────────────────────────────────────
   3. MAIN COMPONENT
───────────────────────────────────────────────────────────────────────────── */
export default function BookingPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [hasStarted, setHasStarted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormData>({ resolver: zodResolver(bookingSchema) });

  const customerName  = watch('customer_name');
  const customerPhone = watch('customer_phone');

  const trackEvent = (eventName: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName);
    }
  };

  const onSubmit = async (data: BookingFormData) => {
    setSubmitError('');
    if (data.honeypot) { setSubmitted(true); return; }

    const cleanPhone = data.customer_phone.replace(/\s|-|\+/g, '');
    try {
      const response = await client.entities.service_bookings.create({
        data: {
          customer_name:      data.customer_name,
          customer_phone:     cleanPhone,
          customer_email:     data.customer_email || '',
          device_type:        data.device_type,
          issue_description:  data.issue_description,
          pickup_date:        data.pickup_date,
          pickup_time_slot:   data.pickup_time_slot,
          status:             'pending',
          created_at:         new Date().toISOString(),
        },
      });
      if (response?.data) {
        setSubmitted(true);
        trackEvent('booking_submitted');
      } else {
        throw new Error('DATABASE_ERROR');
      }
    } catch (err: unknown) {
      // Keep console clean for production, only log to console in dev mode
      if (import.meta.env.DEV) {
        console.error('Booking submission error:', err);
      }
      
      trackEvent('booking_failed');
      
      const errorMessage = err instanceof Error ? err.message : String(err);
      
      if (errorMessage.includes('Network Error') || err instanceof TypeError) {
        setSubmitError('Network connection failed. Please check your internet and try again.');
      } else if (errorMessage === 'DATABASE_ERROR') {
        setSubmitError('Our system is currently busy. Please call us directly to book.');
      } else {
        setSubmitError('Failed to submit booking. Please try again or contact us via WhatsApp.');
      }
    }
  };

  const handleFormInteraction = () => {
    if (!hasStarted) {
      setHasStarted(true);
      trackEvent('booking_started');
    }
  };

  // ─── INPUT FIELD STYLES ───────────────────────────────────────────────────
  const fieldClass = (hasError: boolean) =>
    `w-full bg-slate-950 border rounded-xl py-3 pr-4 text-white focus:outline-none focus:ring-2 transition-all ${
      hasError
        ? 'border-red-500 focus:ring-red-500/50'
        : 'border-slate-800 focus:border-cyan-500 focus:ring-cyan-500/20'
    }`;

  /* ─────────────────────────────────────────────────────────────────────────
     SEO — rendered unconditionally above both screens
  ───────────────────────────────────────────────────────────────────────── */
  const seoBlock = (
    <>
      <SEOEngine entityId="page-booking" />
      <SchemaMarkup schema={STRUCTURED_DATA} />
    </>
  );

  /* ─────────────────────────────────────────────────────────────────────────
     SUCCESS SCREEN
  ───────────────────────────────────────────────────────────────────────── */
  if (submitted) {
    return (
      <>
        {seoBlock}
        <main className="min-h-screen bg-transparent text-white flex items-center justify-center px-4 sm:px-6 pt-24 pb-8 font-sans">
          <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl max-w-xl w-full shadow-2xl p-6 sm:p-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 border border-emerald-500/30">
              <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-400" aria-hidden="true" /> 
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white mb-3 tracking-tight">Booking Confirmed!</h1>
            <p className="text-slate-400 text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed">
              Thank you, <strong className="text-white">{customerName}</strong>! Your hardware assessment booking has been received.
              We'll contact you on <strong className="text-emerald-400">{customerPhone}</strong> to confirm your pickup details.
            </p>

            <div className="bg-slate-950 rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 text-left space-y-4 border border-slate-800 shadow-inner">
              <h2 className="text-white font-bold flex items-center gap-2 mb-3">
                <HelpCircle className="w-5 h-5 text-emerald-400" aria-hidden="true" /> 
                Need immediate assistance?
              </h2>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`tel:${PHONE_CLEAN}`}
                  className="flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl flex-1 transition-all border border-slate-700 text-sm sm:text-base"
                >
                  <PhoneCall className="w-4 h-4 mr-2 text-cyan-400" aria-hidden="true" /> 
                  Call {PHONE_DISPLAY}
                </a>
                
                <a
                  href={`https://wa.me/${PHONE_CLEAN}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl flex-1 transition-all shadow-lg shadow-emerald-900/20 text-sm sm:text-base"
                >
                  <MessageCircleIcon className="w-4 h-4 mr-2" aria-hidden="true" /> 
                  WhatsApp Us
                </a>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-6 sm:pt-8">
              <p className="text-slate-500 text-xs sm:text-sm mb-3 sm:mb-4">Happy with our easy booking process? Help us grow!</p>
              
              <a
                href={REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full border border-yellow-500/30 text-yellow-500 hover:bg-yellow-500/10 font-bold py-3 rounded-xl transition-all text-sm sm:text-base"
              >
                <Star className="w-4 h-4 mr-2 fill-yellow-500" aria-hidden="true" /> 
                Leave us a Google Review
              </a>
            </div>
          </div>
        </main>
      </>
    );
  }

  /* ─────────────────────────────────────────────────────────────────────────
     FORM SCREEN
  ───────────────────────────────────────────────────────────────────────── */
  return (
    <>
      {seoBlock}

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:p-4 focus:bg-emerald-600 focus:text-white focus:rounded-lg"
      >
        Skip to main content
      </a>

      <main
        id="main-content"
        className="min-h-screen bg-transparent text-white font-sans selection:bg-cyan-500/30 pt-24 pb-8 sm:pb-24 px-4 sm:px-6"
      >
        {/* ─── BREADCRUMBS ─── */}
        <nav aria-label="Breadcrumb" className="max-w-3xl mx-auto mb-6 sm:mb-8 mt-4 sm:mt-0">
          <ol className="flex items-center space-x-2 text-xs sm:text-sm text-slate-400 font-medium">
            <li><Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
            <li><span className="text-slate-600">/</span></li>
            <li aria-current="page" className="text-cyan-400">Book a Repair</li>
          </ol>
        </nav>

        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-white mb-2 sm:mb-4">
              Book a <span className="text-cyan-400">Repair Pickup</span>
            </h1>
            <p className="text-slate-400 text-sm sm:text-lg max-w-xl mx-auto">
              Fill out the details below to schedule your free diagnostic and device pickup anywhere in Kuwait.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            onFocus={handleFormInteraction}
            className="bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-3xl p-5 sm:p-8 shadow-2xl space-y-4 sm:space-y-6"
            noValidate
          >
            {submitError && (
              <div role="alert" className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl text-sm font-medium">
                {submitError}
              </div>
            )}

            {/* Honeypot — hidden from users, catches bots */}
            <input type="text" {...register('honeypot')} className="hidden" aria-hidden="true" tabIndex={-1} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Full Name */}
              <div>
                <label htmlFor="customer_name" className="block text-xs sm:text-sm font-bold text-slate-300 mb-1.5 sm:mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" /> 
                  <input
                    id="customer_name"
                    {...register('customer_name')}
                    type="text"
                    autoComplete="name"
                    placeholder="e.g. Abdullah Salem"
                    className={`${fieldClass(!!errors.customer_name)} pl-10 sm:pl-12 text-sm sm:text-base`}
                  />
                </div>
                {errors.customer_name && <p role="alert" className="text-red-400 text-xs mt-1.5 sm:mt-2">{errors.customer_name.message}</p>}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="customer_phone" className="block text-xs sm:text-sm font-bold text-slate-300 mb-1.5 sm:mb-2">Kuwait Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" /> 
                  <span className="absolute left-10 sm:left-11 top-1/2 -translate-y-1/2 text-slate-500 font-bold border-r border-slate-800 pr-2 text-sm sm:text-base" aria-hidden="true">+965</span>
                  <input
                    id="customer_phone"
                    {...register('customer_phone')}
                    type="tel"
                    autoComplete="tel"
                    placeholder="5XXXXXXX"
                    className={`${fieldClass(!!errors.customer_phone)} pl-24 sm:pl-28 text-sm sm:text-base`}
                  />
                </div>
                {errors.customer_phone && <p role="alert" className="text-red-400 text-xs mt-1.5 sm:mt-2">{errors.customer_phone.message}</p>}
              </div>
            </div>

            {/* Email & Device Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label htmlFor="customer_email" className="block text-xs sm:text-sm font-bold text-slate-300 mb-1.5 sm:mb-2">Email Address (Optional)</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" /> 
                  <input
                    id="customer_email"
                    {...register('customer_email')}
                    type="email"
                    autoComplete="email"
                    placeholder="email@example.com"
                    className={`${fieldClass(!!errors.customer_email)} pl-10 sm:pl-12 text-sm sm:text-base`}
                  />
                </div>
                {errors.customer_email && <p role="alert" className="text-red-400 text-xs mt-1.5 sm:mt-2">{errors.customer_email.message}</p>}
              </div>

              <div>
                <label htmlFor="device_type" className="block text-xs sm:text-sm font-bold text-slate-300 mb-1.5 sm:mb-2">Device Type</label>
                <div className="relative">
                  <Laptop className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" /> 
                  <select
                    id="device_type"
                    {...register('device_type')}
                    className={`${fieldClass(!!errors.device_type)} pl-10 sm:pl-12 appearance-none text-sm sm:text-base`}
                  >
                    <option value="">Select a device</option>
                    {DEVICE_TYPES.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                {errors.device_type && <p role="alert" className="text-red-400 text-xs mt-1.5 sm:mt-2">{errors.device_type.message}</p>}
              </div>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label htmlFor="pickup_date" className="block text-xs sm:text-sm font-bold text-slate-300 mb-1.5 sm:mb-2">Preferred Pickup Date</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" /> 
                  <input
                    id="pickup_date"
                    {...register('pickup_date')}
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    className={`${fieldClass(!!errors.pickup_date)} pl-10 sm:pl-12 text-sm sm:text-base`}
                  />
                </div>
                {errors.pickup_date && <p role="alert" className="text-red-400 text-xs mt-1.5 sm:mt-2">{errors.pickup_date.message}</p>}
              </div>

              <div>
                <label htmlFor="pickup_time_slot" className="block text-xs sm:text-sm font-bold text-slate-300 mb-1.5 sm:mb-2">Preferred Time Slot</label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" /> 
                  <select
                    id="pickup_time_slot"
                    {...register('pickup_time_slot')}
                    className={`${fieldClass(!!errors.pickup_time_slot)} pl-10 sm:pl-12 appearance-none text-sm sm:text-base`}
                  >
                    <option value="">Select a time slot</option>
                    {TIME_SLOTS.map(slot => (
                      <option key={slot.value} value={slot.value}>{slot.label}</option>
                    ))}
                  </select>
                </div>
                {errors.pickup_time_slot && <p role="alert" className="text-red-400 text-xs mt-1.5 sm:mt-2">{errors.pickup_time_slot.message}</p>}
              </div>
            </div>

            {/* Issue Description */}
            <div>
              <label htmlFor="issue_description" className="block text-xs sm:text-sm font-bold text-slate-300 mb-1.5 sm:mb-2">Issue Description</label>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-4 text-slate-500 w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" /> 
                <textarea
                  id="issue_description"
                  {...register('issue_description')}
                  rows={4}
                  placeholder="Please describe what is happening with your device..."
                  className={`${fieldClass(!!errors.issue_description)} pl-10 sm:pl-12 text-sm sm:text-base`}
                />
              </div>
              {errors.issue_description && <p role="alert" className="text-red-400 text-xs mt-1.5 sm:mt-2">{errors.issue_description.message}</p>}
            </div>

            {/* Submit */}
            <div className="pt-2 sm:pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-base sm:text-lg py-3 sm:py-4 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:scale-[1.01] transition-all disabled:opacity-70 disabled:pointer-events-none flex items-center justify-center gap-2 sm:gap-3"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" aria-hidden="true" />
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
