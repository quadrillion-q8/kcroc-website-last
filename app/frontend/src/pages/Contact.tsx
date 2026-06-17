import { useMemo, useState } from 'react';
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
import MetaSEO from '../components/seo/MetaSEO'; // 1. Added MetaSEO Component

type FormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const BUSINESS = {
  name: 'Kuwait Computer Repair On Call',
  shortName: 'KCROC',
  phone: '+96555301913',
  phoneDisplay: '+965 5530 1913',
  whatsapp: '96555301913',
  email: 'quadrillion1980@gmail.com',
  addressLines: [
    'Al Mullah Complex, Ibn Khaldoun Street',
    'Basement Shop 19',
    'Hawalli, Kuwait',
  ],
  mapTitle:
    'Kuwait Computer Repair On Call - Hawalli, Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19',
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
      `Hello ${BUSINESS.shortName}!\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nSubject: ${formData.subject}\n\nMessage: ${formData.message}`,
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
    <main className="w-full min-h-screen bg-transparent text-white font-sans selection:bg-cyan-500/30">
      <MetaSEO 
        title="Contact KCROC | Computer Repair in Hawalli, Kuwait" 
        description="Contact Kuwait Computer Repair On Call (KCROC). Call us, WhatsApp us, or visit our shop in Hawalli for expert tech support and free pickup." 
        canonical="https://computerrepairkuwait.com/contact"
      />

      {/* Hero / intro - Fixed padding to remove gaps */}
      <section className="relative pt-20 md:pt-32 pb-16 px-6 mt-2 md:mt-8 flex flex-col items-center text-center z-10">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-cyan-600/20 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 px-5 py-2 rounded-full text-cyan-400 text-xs font-black uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
            <Phone size={14} /> <span>Get In Touch</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-white">
            Contact{' '}
            <span className="text-cyan-400 drop-shadow-[0_0_25px_rgba(34,211,238,0.4)]">
              {BUSINESS.shortName}
            </span>
          </h1>
          <p className="text-base md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Need hardware support in Kuwait? Reach out by phone,
            WhatsApp, or email for quick evaluation and free pickup options.
          </p>
        </div>
      </section>

      {/* Form + side info */}
      <section className="py-12 md:py-20 px-6 border-t border-slate-800/50 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* Form card */}
            <div className="bg-slate-900/30 backdrop-blur-md border border-slate-800 rounded-3xl p-8 lg:p-10 transition-all hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(34,211,238,0.05)]">
              <h2 className="text-2xl font-black mb-4 text-white">
                Send us a Message
              </h2>
              <p className="text-slate-400 mb-8 leading-relaxed text-sm">
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
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-slate-950 border border-slate-700 text-white px-4 py-3 rounded-xl focus:border-cyan-500 outline-none transition-all placeholder-slate-600"
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
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-slate-950 border border-slate-700 text-white px-4 py-3 rounded-xl focus:border-cyan-500 outline-none transition-all placeholder-slate-600"
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
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950 border border-slate-700 text-white px-4 py-3 rounded-xl focus:border-cyan-500 outline-none transition-all placeholder-slate-600"
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
                    className="w-full bg-slate-950 border border-slate-700 text-white px-4 py-3 rounded-xl focus:border-cyan-500 outline-none transition-all placeholder-slate-600"
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
                    className="w-full bg-slate-950 border border-slate-700 text-white px-4 py-3 rounded-xl focus:border-cyan-500 outline-none transition-all placeholder-slate-600 resize-y"
                    placeholder="Describe your device issue..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black py-4 rounded-xl transition-all disabled:opacity-70 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
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

            {/* Side column */}
            <div className="space-y-6">
              
              <div className="bg-slate-900/30 backdrop-blur-md border border-slate-800 rounded-3xl p-8 hover:border-cyan-500/40 transition-all">
                <h3 className="text-xl font-bold mb-6 text-white">Direct Contact</h3>
                <div className="space-y-6">
                  <a href={`tel:${BUSINESS.phone}`} className="flex items-center gap-4 group">
                    <div className="w-12 h-12 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center group-hover:border-cyan-500 transition-colors">
                      <Phone className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-400 text-sm">Call Us</p>
                      <span className="text-white font-bold">{BUSINESS.phoneDisplay}</span>
                    </div>
                  </a>

                  <a href={BUSINESS.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                    <div className="w-12 h-12 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center group-hover:border-emerald-500 transition-colors">
                      <MessageCircle className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-400 text-sm">WhatsApp</p>
                      <span className="text-white font-bold">{BUSINESS.phoneDisplay}</span>
                    </div>
                  </a>

                  <a href={`mailto:${BUSINESS.email}`} className="flex items-center gap-4 group">
                    <div className="w-12 h-12 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center group-hover:border-purple-500 transition-colors">
                      <Mail className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-400 text-sm">Email</p>
                      <span className="text-white font-bold">{BUSINESS.email}</span>
                    </div>
                  </a>
                </div>
              </div>

              <div className="bg-slate-900/30 backdrop-blur-md border border-slate-800 rounded-3xl p-8 hover:border-cyan-500/40 transition-all">
                <h3 className="text-xl font-bold mb-6 text-white">Visit Our Lab</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4 cursor-default">
                    <div className="w-12 h-12 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-400 text-sm mb-1">Address</p>
                      <p className="text-white font-medium leading-relaxed text-sm">
                        {BUSINESS.addressLines.map((line) => (
                          <span key={line}>{line}<br /></span>
                        ))}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 cursor-default">
                    <div className="w-12 h-12 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-400 text-sm mb-1">Business Hours</p>
                      <div className="text-white font-medium text-sm space-y-1">
                        <p>Sat - Thu: 10:00 AM - 10:00 PM</p>
                        <p>Friday: 6:00 PM - 10:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-20 px-6 border-t border-slate-800/50 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900 p-2">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3477.976237935758!2d48.00761257498341!3d29.3416921515256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fcf9b4a9072aacd%3A0x368691a3a1f0ca66!2sKuwait%20Computer%20Repair%20on%20Call!5e0!3m2!1sen!2skw!4v1780875998873!5m2!1sen!2skw"
              width="100%"
              height="450"
              style={{ border: 0, borderRadius: '1.5rem' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={BUSINESS.mapTitle}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
