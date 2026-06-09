import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  Star,
  Loader2,
} from 'lucide-react';

type FormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const BUSINESS = {
  name: 'Kuwait Computer Repair on Call',
  shortName: 'KCROC',
  phone: '+96555301913',
  phoneDisplay: '+965 5530 1913',
  whatsapp: '96555301913',
  email: 'quadrillion1980@gmail.com',
  addressLines: [
    'Hawalli, Ibn Khaldoun St',
    'Al Mullah Complex',
    'Basement Shop 19',
    'Kuwait',
  ],
  mapTitle:
    'Kuwait Computer Repair on Call - Hawalli, Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19',
  whatsappUrl: 'https://wa.me/96555301913',
  reviewsUrl: 'https://share.google/a1XlHbHRHMPrrNfpr',
  websiteUrl: 'https://www.computerrepairkuwait.com',
  emergencyText: 'Emergency Computer Repair Needed',
};

const initialFormData: FormData = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};

export default function Contact() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const whatsappMessage = useMemo(
    () =>
      `Hello ${BUSINESS.shortName}!

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Subject: ${formData.subject}

Message: ${formData.message}`,
    [formData]
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const encodedMessage = encodeURIComponent(whatsappMessage);
      const url = `${BUSINESS.whatsappUrl}?text=${encodedMessage}`;
      const popup = window.open(url, '_blank', 'noopener,noreferrer');

      if (!popup) {
        window.location.href = url;
      }
    } finally {
      setTimeout(() => setIsSubmitting(false), 800);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      <Helmet>
        <title>Contact KCROC | Computer Repair in Hawalli, Kuwait</title>
        <meta name="description" content="Contact Kuwait Computer Repair On Call (KCROC). Call us, WhatsApp us, or visit our shop in Hawalli for expert tech support and free pickup." />
      </Helmet>

      {/* Hero / intro */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 px-4 py-1.5 rounded-full text-cyan-400 text-sm font-medium mb-6">
            <Phone size={14} />
            <span>Get In Touch</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            Contact{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
              {BUSINESS.shortName}
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Need hardware support in Kuwait? Reach out by phone,
            WhatsApp, or email for quick evaluation and free pickup options.
          </p>
        </div>
      </section>

      {/* Form + side info */}
      <section className="py-12 md:py-20 px-6 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* Form card */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8 lg:p-10 shadow-xl">
              <h2 className="text-2xl font-black mb-4 text-white">
                Send us a Message
              </h2>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Describe your issue and we'll reply instantly on WhatsApp with a
                quick assessment and pickup time.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-bold text-slate-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      autoComplete="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-slate-950 border border-slate-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder-slate-600"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-bold text-slate-300 mb-2">
                      Phone Number *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-slate-950 border border-slate-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder-slate-600"
                      placeholder="+965 XXXX XXXX"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-slate-300 mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950 border border-slate-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder-slate-600"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-bold text-slate-300 mb-2">
                    Subject *
                  </label>
                  <input
                    id="subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-slate-950 border border-slate-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder-slate-600"
                    placeholder="e.g., MacBook Logic Board Repair"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-slate-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full bg-slate-950 border border-slate-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder-slate-600 resize-y"
                    placeholder="Describe your device issue..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl transition-all disabled:opacity-70 shadow-lg shadow-emerald-900/20"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5 mr-2" />
                  )}
                  {isSubmitting ? 'Opening WhatsApp...' : 'Send Message via WhatsApp'}
                </button>
              </form>
            </div>

            {/* Side column: quick contact, address, rating, emergency */}
            <div className="space-y-6">
              
              {/* Quick contact */}
              <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-8">
                <h3 className="text-xl font-bold mb-6 text-white">
                  Direct Contact
                </h3>
                <div
