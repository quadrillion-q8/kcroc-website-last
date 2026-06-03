import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, Star } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const whatsappMessage = `Hello KCROC! \n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nSubject: ${formData.subject}\n\nMessage: ${formData.message}`;
    
    const encodedMessage = encodeURIComponent(whatsappMessage);
    window.open(`https://wa.me/96555301913?text=${encodedMessage}`, '_blank');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-4 py-2">
            📞 Get In Touch
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">KCROC</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Need computer repair services? We're here to help! Reach out through any method below and we'll get back to you quickly.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 md:py-20 px-6 border-t border-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
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

                  <Button type="submit" size="lg" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl">
                    <Send className="w-5 h-5 mr-2" />
                    Send Message via WhatsApp
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Quick Contact */}
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
                        <a href="tel:+96555301913" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                          +965 5530 1913
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
                          href="https://wa.me/96555301913" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-green-400 hover:text-green-300 transition-colors"
                        >
                          +965 5530 1913
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
                          href="mailto:quadrillion1980@gmail.com" 
                          className="text-purple-400 hover:text-purple-300 transition-colors"
                          title="Business Email"
                        >
                          quadrillion1980@gmail.com
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Location & Hours */}
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
                          Kuwait Computer Repair On Call (KCROC)<br />
                          Al Mullah Complex<br />
                          Ibn Khaldoun St<br />
                          Hawalli, Kuwait
                        </p>
                        <p className="text-gray-500 text-sm mt-2">
                          Near Chinese Michael iPhone Repair Shop
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

              {/* Google Reviews CTA */}
              <Card className="bg-gray-900/40 border border-emerald-500/30 rounded-2xl">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Star className="w-8 h-8 text-yellow-400 fill-current" />
                    <div>
                      <h3 className="text-xl font-bold text-white">5.0 Rating</h3>
                      <p className="text-gray-400 text-sm">500+ Google Reviews</p>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4">
                    See what our customers say about our service
                  </p>
                  <Button asChild className="w-full border border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10 rounded-xl bg-transparent">
                    <a href="https://share.google/rE2M4xOsiQQ4mdnLv" target="_blank" rel="noopener noreferrer">
                      <Star className="w-4 h-4 mr-2 fill-current" />
                      View All Reviews on Google
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Emergency Contact */}
              <Card className="bg-gray-900/40 border border-red-500/30 rounded-2xl">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
                    🚨 Emergency Service
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Need urgent computer repair for critical business systems or urgent home office issues in Kuwait? We offer emergency services.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl">
                      <a href="tel:+96555301913">
                        <Phone className="w-4 h-4 mr-2" />
                        Emergency Call
                      </a>
                    </Button>
                    <Button asChild size="lg" className="border border-red-500/50 text-red-400 hover:bg-red-500/10 rounded-xl bg-transparent">
                      <a href="https://wa.me/96555301913?text=Emergency%20Computer%20Repair%20Needed" target="_blank" rel="noopener">
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

      {/* Map Section */}
      <section className="py-12 md:py-20 px-6 border-t border-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">Find Us on the Map</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Located in the heart of Hawalli, near Chinese Michael iPhone Repair Shop, with free pickup and delivery across all Kuwait governorates.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="rounded-2xl overflow-hidden border border-gray-800/80">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1738.9867253939326!2d48.00931473858233!3d29.341773831937658!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fcf9b4a9072aacd%3A0x368691a3a1f0ca66!2sKuwait%20Computer%20Repair%20on%20Call!5e0!3m2!1sen!2skw!4v1769645097684!5m2!1sen!2skw"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="KCROC Location - Al Mullah Complex, Ibn Khaldoun St, Hawalli, Kuwait"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 px-6 border-t border-gray-900">
        <div className="max-w-6xl mx-auto">
          <Card className="bg-gray-900/40 border border-gray-800/80 rounded-2xl max-w-4xl mx-auto">
            <CardContent className="p-12 text-center">
              <h2 className="text-4xl font-bold mb-6 text-white">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Don't let computer problems slow you down. Contact KCROC today for fast, 
                reliable repair services with free pickup and delivery across Kuwait.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl px-8 py-6 text-lg">
                  <a href="tel:+96555301913">
                    <Phone className="w-5 h-5 mr-2" />
                    Call Now: +965 5530 1913
                  </a>
                </Button>
                <Button asChild size="lg" className="bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl px-8 py-6 text-lg">
                  <a href="https://wa.me/96555301913" target="_blank" rel="noopener">
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