import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  Star,
  Loader2
} from 'lucide-react';
import { useMemo, useState } from 'react';

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
    'Kuwait'
  ],
  mapTitle: 'Kuwait Computer Repair on Call - Hawalli, Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19',
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

  const whatsappMessage = useMemo(() => {
    return `Hello ${BUSINESS.shortName}!

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Subject: ${formData.subject}

Message: ${formData.message}`;
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
    <div className="min-h-screen bg-gray-950 text-white">
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <Badge
            variant="secondary"
            className="mb-6 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-4 py-2"
          >
            📞 Get In Touch
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">{BUSINESS.name}</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Need computer repair services in Kuwait? Reach out by phone, WhatsApp, or email for quick support and pickup options.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-20 px-6 border-t border-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <Card className="bg-gray-900/40 border border-gray-800/80 rounded-2xl">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4 text-white">Send us a Message</h2>
                <p className="text-gray-400 mb-6">
                  Send your issue and we'll reply on WhatsApp or phone with a quick diagnosis and pickup time.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <Input
                        type="text"
                        name="name"
                        autoComplete="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-cyan-500 rounded-xl"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Phone Number *
                      </label>
                      <Input
                        type="tel"
                        name="phone"
                        autoComplete="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-cyan-500 rounded-xl"
                        placeholder="+965 XXXX XXXX"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      name="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-cyan-500 rounded-xl"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Subject *
                    </label>
                    <Input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-cyan-500 rounded-xl"
                      placeholder="e.g., Laptop Screen Repair"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Message *
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-500 focus:border-cyan-500 rounded-xl"
                      placeholder="Describe your computer issue or service needed..."
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5 mr-2" />
                    )}
                    {isSubmitting ? 'Opening WhatsApp...' : 'Send Message via WhatsApp'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="bg-gray-900/40 border border-gray-800/80 rounded-2xl">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-6 text-white">Quick Contact</h3>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                        <Phone className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-white">Phone</p>
                        <a href={`tel:${BUSINESS.phone}`} className="text-cyan-400 hover:text-cyan-300 transition-colors">
                          {BUSINESS.phoneDisplay}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                        <MessageCircle className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-white">WhatsApp</p>
                        <a
                          href={BUSINESS.whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-400 hover:text-green-300 transition-colors"
                        >
                          {BUSINESS.phoneDisplay}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-white">Business Email</p>
                        <a
                          href={`mailto:${BUSINESS.email}`}
                          className="text-purple-400 hover:text-purple-300 transition-colors"
                          title="Business Email"
                        >
                          {BUSINESS.email}
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/40 border border-gray-800/80 rounded-2xl">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-6 text-white">Visit Our Shop</h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-white mb-2">Address</p>
                        <p className="text-gray-300 leading-relaxed">
                          {BUSINESS.addressLines.map((line) => (
                            <span key={line}>
                              {line}
                              <br />
                            </span>
                          ))}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-white mb-2">Business Hours</p>
                        <div className="text-gray-300 space-y-1">
                          <p>Saturday - Thursday: 10:00 AM - 10:00 PM</p>
                          <p>Friday: 6:00 PM - 10:00 PM</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 4.9 Google Rating Card with 150+ Reviews added back! */}
              <Card className="bg-gray-900/40 border border-emerald-500/30 rounded-2xl">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Star className="w-8 h-8 text-yellow-400 fill-current" />
                    <div>
                      <div className="flex items-baseline gap-2">
                        <h3 className="text-xl font-bold text-white">4.9 Google Rating</h3>
                        <span className="text-emerald-400 font-semibold text-sm">(150+ Reviews)</span>
                      </div>
                      <p className="text-gray-400 text-sm">Top-rated by Kuwait locals</p>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4">
                    We take pride in our service. Browse our real customer feedback before booking your repair.
                  </p>
                  <Button asChild className="w-full border border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 rounded-xl bg-transparent">
                    <a href={BUSINESS.reviewsUrl} target="_blank" rel="noopener noreferrer">
                      <Star className="w-4 h-4 mr-2 fill-current" />
                      View Reviews on Google
                    </a>
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gray-900/40 border border-red-500/30 rounded-2xl">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                    🚨 Emergency Service
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Need urgent computer repair for critical business systems or home office issues in Kuwait? We offer emergency support.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl">
                      <a href={`tel:${BUSINESS.phone}`}>
                        <Phone className="w-4 h-4 mr-2" />
                        Emergency Call
                      </a>
                    </Button>
                    <Button asChild size="lg" className="border border-red-500/50 text-red-400 hover:bg-red-500/10 rounded-xl bg-transparent">
                      <a
                        href={`${BUSINESS.whatsappUrl}?text=${encodeURIComponent(BUSINESS.emergencyText)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Emergency WhatsApp
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section with live source link preserved! */}
      <section className="py-12 md:py-20 px-6 border-t border-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">Find Us on the Map</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Located in Hawalli at Al Mullah Complex on Ibn Khaldoun Street, with free pickup and delivery across Kuwait.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="rounded-2xl overflow-hidden border border-gray-800/80 shadow-2xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3477.976237935758!2d48.00761257498341!3d29.3416921515256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fcf9b4a9072aacd%3A0x368691a3a1f0ca66!2sKuwait%20Computer%20Repair%20on%20Call!5e0!3m2!1sen!2skw!4v1780875998873!5m2!1sen!2skw"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={BUSINESS.mapTitle}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 px-6 border-t border-gray-900">
        <div className="max-w-6xl mx-auto">
          <Card className="bg-gray-900/40 border border-gray-800/80 rounded-2xl max-w-4xl mx-auto">
            <CardContent className="p-12 text-center">
              <h2 className="text-4xl font-bold mb-6 text-white">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Don't let computer problems slow you down. Contact {BUSINESS.shortName} today for fast, reliable repair services with free pickup and delivery across Kuwait.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl px-8 py-6 text-lg">
                  <a href={`tel:${BUSINESS.phone}`}>
                    <Phone className="w-5 h-5 mr-2" />
                    Call Now: {BUSINESS.phoneDisplay}
                  </a>
                </Button>
                <Button asChild size="lg" className="bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl px-8 py-6 text-lg">
                  <a href={BUSINESS.whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    WhatsApp Us
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
