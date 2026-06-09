import { useState } from 'react';
import { createClient } from '@metagptx/web-sdk';
import { Helmet } from 'react-helmet-async';
import { 
  Calendar, Clock, Laptop, Phone, Mail, User, 
  MessageSquare, CheckCircle, Loader2, MessageCircle, 
  Truck, Shield, HelpCircle, Star, PhoneCall 
} from 'lucide-react';

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

interface BookingForm {
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  device_type: string;
  issue_description: string;
  pickup_date: string;
  pickup_time_slot: string;
  honeypot: string;
}

const initialForm: BookingForm = {
  customer_name: '',
  customer_phone: '',
  customer_email: '',
  device_type: '',
  issue_description: '',
  pickup_date: '',
  pickup_time_slot: '',
  honeypot: '',
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
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
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Computer Repair Booking",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Kuwait Computer Repair On Call (KCROC)",
    "telephone": "+96555301913",
    "url": "https://www.computerrepairkuwait.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Al Mullah Complex, Ibn Khaldoun Street, Basement Shop 19",
      "addressLocality": "Hawalli",
      "addressCountry": "KW"
    }
  }
};

const faqSchema = {
  "@context": "https://schema.org",
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
};

export default function BookingPage() {
  const [form, setForm] = useState<BookingForm>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [hasStarted, setHasStarted] = useState(false);

  const trackEvent = (eventName: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    if (!hasStarted) {
      setHasStarted(true);
      trackEvent('booking_started');
    }
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const getTodayDate = () => {
    const today = new Date();
    return new Date(today.getTime() - today.getTimezoneOffset() * 60000)
      .toISOString()
      .split('T')[0];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (form.honeypot) {
      setSubmitted(true);
      return;
    }

    const phoneRegex = /^(965)?[569]\d{7}$/;
    const cleanPhone = form.customer_phone.replace(/\s|-|\+/g, '');
    if (!phoneRegex.test(cleanPhone)) {
      setError('Please enter a valid Kuwait phone number (e.g., 55301913 or 96555301913).');
      trackEvent('booking_failed_validation');
      return;
    }

    if (
      !form.customer_name ||
      !form.device_type ||
      !form.issue_description ||
      !form.pickup_date ||
      !form.pickup_time_slot
    ) {
      setError('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await client.entities.service_bookings.create({
        data: {
          customer_name: form.customer_name,
          customer_phone: cleanPhone,
          customer_email: form.customer_email || '',
          device_type: form.device_type,
          issue_description: form.issue_description,
          pickup_date: form.pickup_date,
          pickup_time_slot: form.pickup_time_slot,
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
        setError('Network connection failed. Please check your internet and try again.');
      } else if (err.message === 'DATABASE_ERROR') {
        setError('Our system is currently busy. Please call us directly to book.');
      } else {
        setError('Failed to submit booking. Please try again or contact us via WhatsApp.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  // SUCCESS SCREEN
  if (submitted) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6 pt-20 font-sans">
        <div className="bg-slate-900/40 border border-slate-800 rounded-3xl max-w-xl w-full shadow-2xl p-8 md:p-12 text-center">
          <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/30">
            <CheckCircle className="w-10 h-10 text-emerald-400" />
          </div>
          <h2 className="text-3xl font-black text-white mb-4 tracking-tight">Booking Confirmed!</h2>
          <p className="text-slate-400 mb-8 leading-relaxed">
            Thank you, <strong className="text-white">{form.customer_name}</strong>! Your hardware assessment booking has been received. 
            We'll contact you on <strong className="text-emerald-400">{form.customer_phone}</strong> to confirm your pickup details.
          </p>

          <div className="bg-slate-950 rounded-2xl p-6 mb-8 text-left space-y-4 border border-slate-800 shadow-inner">
            <h3 className="text-white font-bold flex items-center gap-2 mb-4">
              <HelpCircle className="w-5 h-5 text-emerald-400" /> Need immediate assistance?
            </h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <a 
                href="tel:+96555301913" 
                className="flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl flex-1 transition-all border border-slate-700"
              >
                <PhoneCall className="w-4 h-4 mr-2 text-cyan-400" />
                Call +965 5530 1913
              </a>
              <a 
                href="https://wa.me/96555301913" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl flex-1 transition-all shadow-lg shadow-emerald-900/20"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp Us
              </a>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8">
            <p className="text-slate-500 text-sm mb-4">Happy with our easy booking process? Help us grow!</p>
            <a 
              href="https://g.page/r/CWbK8KGjkYY2EAE/review" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Leave KCROC a review on Google"
              className="flex items-center justify-center w-full border border-yellow-500/30 text-yellow-500 hover:bg-yellow-500/10 font-bold py-3 rounded-xl transition-all"
            >
              <Star className="w-4 h-4 mr-2 fill-yellow-500" />
              Leave us a Google Review
            </a>
          </div>
        </div>
      </main>
    );
  }

  // BOOKING FORM SCREEN
  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only absolute z-50 p-4 bg-emerald-600 text-white">
        Skip to main content
      </a>
      
      <main id="main-content" className="min-h-screen bg-slate-950 text-white font-sans">
        <Helmet htmlAttributes={{ lang: 'en' }}>
          <title>Book Laptop & Computer Repair Pickup in Kuwait | KCROC</title>
          <meta name="description" content="Book free laptop and computer repair pickup anywhere in Kuwait. Same-day hardware assessment. 30-day warranty." />
          <link rel="canonical" href="https://www.computerrepairkuwait.com/book" />
          
          <meta property="og:locale" content="en_KW" />
          <meta property="og:locale:alternate" content="ar_KW" />
          <link rel="alternate" hreflang="en-kw" href="https://www.computerrepairkuwait.com/book" />
          <link rel="alternate" hreflang="ar-kw" href="https://www.computerrepairkuwait.com/ar/book" />
          <link rel="alternate" hreflang="x-default" href="https://www.computerrepairkuwait.com/book" />

          <meta property="og:title" content="Book Laptop & Computer Repair Pickup in Kuwait | KCROC" />
          <meta property="og:description" content="Free pickup across Kuwait. Same-day hardware assessment. 30-day warranty." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.computerrepairkuwait.com/book" />
          <meta property="og:image" content="https://www.computerrepairkuwait.com/kcroc-logo.png" />

          <script type="application/ld+json">{JSON.stringify(pageSchema)}</script>
          <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
          <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        </Helmet>

        {/* Hero Section */}
        <section className="pt-32 pb-16 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full text-emerald-400 text-sm font-medium mb-6">
              <Calendar size={14} />
              <span>Book a Service</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
              Schedule Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Free Pickup</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Fill in the form below and we'll arrange a free collection from your location. Same-day initial assessment available across all governorates.
            </p>
          </div>
        </section>

        {/* Trust Strip */}
        <section className="py-8 px-6 border-y border-slate-800 bg-slate-900/30">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center justify-center gap-3">
                <Truck className="w-6 h-6 text-cyan-400" />
                <div>
                  <p className="text-white font-bold text-sm">Free Pickup</p>
                  <p className="text-slate-500 text-xs">All Kuwait areas</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Clock className="w-6 h-6 text-emerald-400" />
                <div>
                  <p className="text-white font-bold text-sm">Same-Day Assessment</p>
                  <p className="text-slate-500 text-xs">Fast turnaround</p>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Shield className="w-6 h-6 text-cyan-400" />
                <div>
                  <p className="text-white font-bold text-sm">30-Day Warranty</p>
                  <p className="text-slate-500 text-xs">On all repairs</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-16 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl">
              <h2 className="text-2xl font-black text-white mb-8">Booking Details</h2>

              {error && (
                <div className="mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm font-medium">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <input 
                  type="text" 
                  name="honeypot" 
                  style={{ display: 'none' }} 
                  tabIndex={-1} 
                  autoComplete="off"
                  value={form.honeypot} 
                  onChange={handleChange} 
                />

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="customer_name" className="flex items-center gap-2 text-sm font-bold text-slate-300 mb-2">
                      <User className="w-4 h-4 text-cyan-400" /> Full Name *
                    </label>
                    <input 
                      id="customer_name" 
                      type="text" 
                      name="customer_name" 
                      autoComplete="name" 
                      value={form.customer_name} 
                      onChange={handleChange} 
                      required 
                      className="w-full bg-slate-950 border border-slate-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder-slate-600" 
                      placeholder="Your full name" 
                    />
                  </div>
                  <div>
                    <label htmlFor="customer_phone" className="flex items-center gap-2 text-sm font-bold text-slate-300 mb-2">
                      <Phone className="w-4 h-4 text-cyan-400" /> Phone Number *
                    </label>
                    <input 
                      id="customer_phone" 
                      type="tel" 
                      name="customer_phone" 
                      pattern="^\+?[0-9\s-]{8,15}$" 
                      autoComplete="tel" 
                      value={form.customer_phone} 
                      onChange={handleChange} 
                      required 
                      className="w-full bg-slate-950 border border-slate-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder-slate-600" 
                      placeholder="+965 XXXX XXXX" 
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="customer_email" className="flex items-center gap-2 text-sm font-bold text-slate-300 mb-2">
                    <Mail className="w-4 h-4 text-cyan-400" /> Email (Optional)
                  </label>
                  <input 
                    id="customer_email" 
                    type="email" 
                    name="customer_email" 
                    autoComplete="email" 
                    value={form.customer_email} 
                    onChange={handleChange} 
                    className="w-full bg-slate-950 border border-slate-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder-slate-600" 
                    placeholder="your.email@example.com" 
                  />
                </div>

                <div>
                  <label htmlFor="device_type" className="flex items-center gap-2 text-sm font-bold text-slate-300 mb-2">
                    <Laptop className="w-4 h-4 text-cyan-400" /> Device Type *
                  </label>
                  <select 
                    id="device_type" 
                    name="device_type" 
                    value={form.device_type} 
                    onChange={handleChange} 
                    required 
                    className="w-full bg-slate-950 border border-slate-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all appearance-none"
                  >
                    <option value="" className="bg-slate-900">Select device type...</option>
                    {DEVICE_TYPES.map((type) => (
                      <option key={type} value={type} className="bg-slate-900">{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="issue_description" className="flex items-center gap-2 text-sm font-bold text-slate-300 mb-2">
                    <MessageSquare className="w-4 h-4 text-cyan-400" /> Describe the Issue *
                  </label>
                  <textarea 
                    id="issue_description" 
                    name="issue_description" 
                    value={form.issue_description} 
                    onChange={handleChange} 
                    required 
                    rows={4} 
                    className="w-full bg-slate-950 border border-slate-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder-slate-600 resize-y" 
                    placeholder="Describe the hardware or software problem..." 
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="pickup_date" className="flex items-center gap-2 text-sm font-bold text-slate-300 mb-2">
                      <Calendar className="w-4 h-4 text-cyan-400" /> Preferred Pickup Date *
                    </label>
                    <input 
                      id="pickup_date" 
                      type="date" 
                      name="pickup_date" 
                      value={form.pickup_date} 
                      onChange={handleChange} 
                      min={getTodayDate()} 
                      required 
                      className="w-full bg-slate-950 border border-slate-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all [color-scheme:dark]" 
                    />
                  </div>
                  <div>
                    <label htmlFor="pickup_time_slot" className="flex items-center gap-2 text-sm font-bold text-slate-300 mb-2">
                      <Clock className="w-4 h-4 text-cyan-400" /> Preferred Time Slot *
                    </label>
                    <select 
                      id="pickup_time_slot" 
                      name="pickup_time_slot" 
                      value={form.pickup_time_slot} 
                      onChange={handleChange} 
                      required 
                      className="w-full bg-slate-950 border border-slate-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all appearance-none"
                    >
                      <option value="" className="bg-slate-900">Select time slot...</option>
                      {TIME_SLOTS.map((slot) => (
                        <option key={slot.value} value={slot.value} className="bg-slate-900">{slot.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={submitting} 
                  className="w-full flex items-center justify-center bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl py-4 transition-all disabled:opacity-50 mt-4 shadow-lg shadow-emerald-900/20"
                >
                  {submitting ? (
                    <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Processing...</>
                  ) : (
                    <><CheckCircle className="w-5 h-5 mr-2" /> Submit Booking Request</>
                  )}
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-6 border-t border-slate-800 bg-slate-900/20">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 justify-center mb-10">
               <HelpCircle className="w-6 h-6 text-cyan-400" />
               <h2 className="text-3xl font-black text-center text-white">Booking FAQs</h2>
            </div>
            <div className="space-y-4">
              <div className="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl hover:border-cyan-500/30 transition-colors">
                <h3 className="text-lg font-bold text-white mb-2">Is the pickup and delivery truly free in Kuwait?</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Yes, KCROC offers completely free pickup and delivery across all Kuwait governorates including Kuwait City, Hawalli, Salmiya, Farwaniya, and Jahra. There are no hidden charges for collection or return.</p>
              </div>
              <div className="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl hover:border-cyan-500/30 transition-colors">
                <h3 className="text-lg font-bold text-white mb-2">How long will my computer repair take?</h3>
                <p className="text-slate-400 text-sm leading-relaxed">We provide same-day hardware assessment for all devices. Repair times vary based on the fault and component availability, but most standard repairs are completed within 24 to 48 hours.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
