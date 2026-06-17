import { useState, useMemo } from 'react';
import { createClient } from '@metagptx/web-sdk';
import { 
  Calendar, Clock, Laptop, Phone, Mail, User, 
  MessageSquare, CheckCircle, Loader2, MessageCircle as MessageCircleIcon, 
  Truck, Shield, HelpCircle, Star, PhoneCall 
} from 'lucide-react';
import MetaSEO from '../components/seo/MetaSEO'; // 1. Added MetaSEO Component

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
                <MessageCircleIcon className="w-4 h-4 mr-2" />
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

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only absolute z-50 p-4 bg-emerald-600 text-white">
        Skip to main content
      </a>
      
      <main id="main-content" className="min-h-screen bg-slate-950 text-white font-sans">
        <MetaSEO 
            title="Book Laptop & Computer Repair Pickup in Kuwait | KCROC" 
            description="Book free laptop and computer repair pickup anywhere in Kuwait. Same-day hardware assessment. 30-day warranty." 
            canonical="https://www.computerrepairkuwait.com/book"
        />
        
        {/* Keeping existing Schema scripts */}
        <script type="application/ld+json">{JSON.stringify(pageSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>

        {/* ... Rest of your JSX code remains unchanged ... */}
      </main>
    </>
  );
}
