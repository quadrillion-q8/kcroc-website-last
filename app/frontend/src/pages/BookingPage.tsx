import { useState } from 'react';
import { createClient } from '@metagptx/web-sdk';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Clock, Laptop, Phone, Mail, User, MessageSquare, CheckCircle, Loader2, MessageCircle, Truck, Shield, HelpCircle, Star, PhoneCall } from 'lucide-react';

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

// 1 & 2. Corrected Warranty and URLs
const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Book Laptop & Computer Repair Pickup in Kuwait | KCROC",
  "url": "https://www.computerrepairkuwait.com/book",
  "description": "Book free laptop and computer repair pickup anywhere in Kuwait. Same-day diagnostics. 30-day warranty.",
  "mainEntity": {
    "@type": "LocalBusiness",
    "name": "Kuwait Computer Repair On Call (KCROC)",
    "telephone": "+96555301913",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19",
      "addressLocality": "Hawalli",
      "addressCountry": "KW"
    }
  }
};

// 3. Fully Populated Service Schema
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
      "streetAddress": "Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19",
      "addressLocality": "Hawalli",
      "addressCountry": "KW"
    }
  }
};

// 6. Expanded FAQ Schema for Rich Snippets
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
        "text": "We provide same-day diagnostics for all devices. Repair times vary based on the issue and parts availability, but most standard repairs are completed within 24 to 48 hours."
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

  if (submitted) {
    return (
      <main className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-6 pt-20">
        <Card className="bg-gray-900/40 border border-gray-800/80 rounded-2xl max-w-xl w-full shadow-2xl">
          <CardContent className="p-6 md:p-12 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Booking Confirmed!</h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Thank you, <strong className="text-white">{form.customer_name}</strong>! Your repair booking has been received. 
              We'll contact you on <strong className="text-cyan-400">{form.customer_phone}</strong> to confirm your pickup details.
            </p>

            <div className="bg-gray-800/50 rounded-xl p-6 mb-8 text-left space-y-4">
              <h3 className="text-white font-semibold flex items-center gap-2 mb-2">
                <HelpCircle className="w-5 h-5 text-cyan-400" /> Need immediate assistance?
              </h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white flex-1 transition-colors">
                  <a href="tel:+96555301913">
                    <PhoneCall className="w-4 h-4 mr-2" />
                    Call +965 55301913
                  </a>
                </Button>
                <Button asChild className="bg-green-600 hover:bg-green-700 text-white flex-1 transition-colors">
                  <a href="https://wa.me/96555301913" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp Us
                  </a>
                </Button>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-6">
              <p className="text-gray-400 text-sm mb-4">Happy with our easy booking process? Help us grow!</p>
              <Button asChild variant="outline" className="w-full border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10 transition-colors">
                <a href="https://g.page/r/CWbK8KGjkYY2EAE/review" target="_blank" rel="noopener noreferrer" aria-label="Leave KCROC a review on Google">
                  <Star className="w-4 h-4 mr-2 fill-yellow-500" />
                  Leave us a Google Review
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    );
  }

  // 5. Semantic HTML wrapping applied
  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only absolute z-50 p-4 bg-emerald-600 text-white">
        Skip to main content
      </a>
      
      <main id="main-content" className="min-h-screen bg-gray-950 text-white">
        <Helmet>
          <title>Book Laptop & Computer Repair Pickup in Kuwait | KCROC</title>
          <meta name="description" content="Book free laptop and computer repair pickup anywhere in Kuwait. Same-day diagnostics. 30-day warranty." />
          <link rel="canonical" href="https://www.computerrepairkuwait.com/book" />
          
          <meta property="og:title" content="Book Laptop & Computer Repair Pickup in Kuwait | KCROC" />
          <meta property="og:description" content="Free pickup across Kuwait. Same-day diagnostics. 30-day warranty." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.computerrepairkuwait.com/book" />
          {/* 4. Resolved Placeholder Image */}
          <meta property="og:image" content="https://res.cloudinary.com/dsbwzags3/image/upload/v1769908596/logo_btpfls.png" />

          <script type="application/ld+json">{JSON.stringify(pageSchema)}</script>
          <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
          <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        </Helmet>

        <section className="pt-20 md:pt-32 pb-16 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-4 py-2">
              📅 Book a Repair
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Schedule Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Free Pickup</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Fill in the form below and we'll arrange a free pickup from your location. Same-day diagnostics available.
            </p>
          </div>
        </section>

        <section className="py-8 px-6 border-t border-gray-900">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 bg-gray-900/40 border border-gray-800/80 rounded-xl p-4">
                <Truck className="w-8 h-8 text-cyan-400" />
                <div>
                  <p className="text-white font-semibold text-sm">Free Pickup</p>
                  <p className="text-gray-400 text-xs">All Kuwait areas</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-gray-900/40 border border-gray-800/80 rounded-xl p-4">
                <Clock className="w-8 h-8 text-emerald-400" />
                <div>
                  <p className="text-white font-semibold text-sm">Same-Day Diagnostics</p>
                  <p className="text-gray-400 text-xs">Fast turnaround</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-gray-900/40 border border-gray-800/80 rounded-xl p-4">
                <Shield className="w-8 h-8 text-purple-400" />
                <div>
                  {/* 1. Warranty text corrected in UI */}
                  <p className="text-white font-semibold text-sm">30-Day Warranty</p>
                  <p className="text-gray-400 text-xs">On all repairs</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 px-6 border-t border-gray-900">
          <div className="max-w-3xl mx-auto">
            <Card className="bg-gray-900/40 border border-gray-800/80 rounded-2xl">
              <CardContent className="p-6 md:p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Booking Details</h2>

                {error && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
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

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="customer_name" className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                        <User className="w-4 h-4 text-cyan-400" /> Full Name *
                      </label>
                      <Input id="customer_name" type="text" name="customer_name" autoComplete="name" value={form.customer_name} onChange={handleChange} required className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-cyan-500 rounded-xl" placeholder="Your full name" />
                    </div>
                    <div>
                      <label htmlFor="customer_phone" className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                        <Phone className="w-4 h-4 text-cyan-400" /> Phone Number *
                      </label>
                      <Input id="customer_phone" type="tel" name="customer_phone" pattern="^\+?[0-9\s-]{8,15}$" autoComplete="tel" value={form.customer_phone} onChange={handleChange} required className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-cyan-500 rounded-xl" placeholder="+965 XXXX XXXX" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="customer_email" className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                      <Mail className="w-4 h-4 text-cyan-400" /> Email (Optional)
                    </label>
                    <Input id="customer_email" type="email" name="customer_email" autoComplete="email" value={form.customer_email} onChange={handleChange} className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-cyan-500 rounded-xl" placeholder="your.email@example.com" />
                  </div>

                  <div>
                    <label htmlFor="device_type" className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                      <Laptop className="w-4 h-4 text-cyan-400" /> Device Type *
                    </label>
                    <select id="device_type" name="device_type" value={form.device_type} onChange={handleChange} required className="w-full bg-gray-800/50 border border-gray-700 text-white rounded-xl px-4 py-3 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500">
                      <option value="" className="bg-gray-900">Select device type...</option>
                      {DEVICE_TYPES.map((type) => (
                        <option key={type} value={type} className="bg-gray-900">{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="issue_description" className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                      <MessageSquare className="w-4 h-4 text-cyan-400" /> Describe the Issue *
                    </label>
                    <Textarea id="issue_description" name="issue_description" value={form.issue_description} onChange={handleChange} required rows={4} className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-cyan-500 rounded-xl" placeholder="Describe the problem you're experiencing..." />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="pickup_date" className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                        <Calendar className="w-4 h-4 text-cyan-400" /> Preferred Pickup Date *
                      </label>
                      <Input id="pickup_date" type="date" name="pickup_date" value={form.pickup_date} onChange={handleChange} min={getTodayDate()} required className="bg-gray-800/50 border-gray-700 text-white rounded-xl [color-scheme:dark]" />
                    </div>
                    <div>
                      <label htmlFor="pickup_time_slot" className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                        <Clock className="w-4 h-4 text-cyan-400" /> Preferred Time Slot *
                      </label>
                      <select id="pickup_time_slot" name="pickup_time_slot" value={form.pickup_time_slot} onChange={handleChange} required className="w-full bg-gray-800/50 border border-gray-700 text-white rounded-xl px-4 py-3 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500">
                        <option value="" className="bg-gray-900">Select time slot...</option>
                        {TIME_SLOTS.map((slot) => (
                          <option key={slot.value} value={slot.value} className="bg-gray-900">{slot.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <Button type="submit" size="lg" disabled={submitting} className="w-full bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl py-6 text-lg transition-colors disabled:opacity-50">
                    {submitting ? <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Submitting...</> : <><CheckCircle className="w-5 h-5 mr-2" /> Book Free Pickup</>}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-12 md:py-20 px-6 border-t border-gray-900 bg-gray-950">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-2 justify-center mb-8">
               <HelpCircle className="w-6 h-6 text-cyan-400" />
               <h2 className="text-2xl font-bold text-center">Frequently Asked Booking Questions</h2>
            </div>
            <div className="space-y-4">
              {/* 6. Expanded UI FAQs to match Schema */}
              <div className="p-5 bg-gray-900/50 border border-gray-800 rounded-xl hover:border-gray-700 transition-colors">
                <h3 className="text-lg font-semibold text-white mb-2">Is the pickup and delivery truly free in Kuwait?</h3>
                <p className="text-gray-400 text-sm">Yes, KCROC offers completely free pickup and delivery across all Kuwait governorates including Kuwait City, Hawalli, Salmiya, Farwaniya, and Jahra. There are no hidden charges for collection or return.</p>
              </div>
              <div className="p-5 bg-gray-900/50 border border-gray-800 rounded-xl hover:border-gray-700 transition-colors">
                <h3 className="text-lg font-semibold text-white mb-2">How long will my computer repair take?</h3>
                <p className="text-gray-400 text-sm">We provide same-day diagnostics for all devices. Repair times vary based on the issue and parts availability, but most standard repairs are completed within 24 to 48 hours.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
