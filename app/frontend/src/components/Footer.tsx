import { Phone, MessageCircle, Mail, MapPin, Clock, Facebook, Instagram, Star, Shield, Award, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/about', label: 'About Us' },
    { href: '/battery-replacement', label: 'Battery Guide' },
    { href: '/contact', label: 'Contact' },
  ];

  const services = [
    'Laptop Screen Repair',
    'Desktop PC Building',
    'MacBook Repair',
    'Data Recovery',
    'Hardware Upgrades',
    'Virus Removal',
  ];

  const socialLinks = [
    {
      icon: Facebook,
      href: 'https://facebook.com/kcroc.kuwait',
      label: 'Facebook',
      color: 'hover:text-blue-400 hover:shadow-blue-400/50'
    },
    {
      icon: Instagram,
      href: 'https://instagram.com/kcroc.kuwait',
      label: 'Instagram',
      color: 'hover:text-pink-400 hover:shadow-pink-400/50'
    },
    {
      icon: MessageCircle,
      href: 'https://wa.me/96555301913',
      label: 'Chat on WhatsApp',
      color: 'hover:text-green-400 hover:shadow-green-400/50'
    },
  ];

  const trustBadges = [
    { icon: Shield, text: 'Data Privacy First' },
    { icon: Award, text: 'Certified Technicians' },
    { icon: Zap, text: 'Same-Day Service' },
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-t border-slate-700/50">
      {/* Trust Badges Bar */}
      <div className="border-b border-slate-700/50 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8">
            {trustBadges.map((badge, index) => (
              <div key={index} className="flex items-center gap-3 text-slate-300">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center neon-glow-blue">
                  <badge.icon className="w-5 h-5 text-white" />
                </div>
                <span className="font-semibold">{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <img
                  src="https://res.cloudinary.com/dsbwzags3/image/upload/v1769908596/logo_btpfls.png"
                  alt="KCROC - Computer Repair Kuwait"
                  width="140"
                  height="50"
                  style={{ width: '140px', height: 'auto' }}
                  loading="lazy"
                />
              </div>
              
              <p className="text-slate-400 leading-relaxed mb-6">
                Kuwait's premier computer repair clinic delivering elite-level service 
                with cutting-edge solutions and unmatched expertise.
              </p>

              <div className="flex items-center gap-2 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
                <span className="text-slate-300 font-semibold ml-2">5.0 (500+ Reviews)</span>
              </div>

              <div className="bg-gradient-to-r from-emerald-500/20 to-blue-500/20 border border-emerald-500/30 rounded-lg p-4">
                <p className="text-emerald-400 font-bold text-sm">🏆 Kuwait's #1 Tech Clinic</p>
                <p className="text-slate-300 text-xs mt-1">Trusted by 500+ satisfied customers</p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold text-lg mb-6 gradient-text">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link 
                      to={link.href} 
                      className="text-slate-400 hover:text-white transition-colors duration-300 hover:translate-x-2 transform inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white font-bold text-lg mb-6 gradient-text">Our Services</h4>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service} className="text-slate-400 text-sm flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full"></div>
                    {service}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-white font-bold text-lg mb-6 gradient-text">Contact Info</h4>
              
              <div className="space-y-4">
                <div className="glass-card p-4 rounded-lg hover-lift">
                  <div className="flex items-start gap-3 mb-2">
                    <MapPin className="w-5 h-5 text-orange-400 flex-shrink-0 mt-1" />
                    <div>
                      <span className="text-white font-semibold block mb-1">Address</span>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        Kuwait Computer Repair On Call (KCROC)<br />
                        Al Mullah Complex<br />
                        Ibn Khaldoun St<br />
                        Hawalli, Kuwait
                      </p>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-4 rounded-lg hover-lift">
                  <div className="flex items-center gap-3 mb-3">
                    <Phone className="w-5 h-5 text-blue-400" />
                    <span className="text-white font-semibold">Phone / WhatsApp</span>
                  </div>
                  <a 
                    href="tel:+96555301913" 
                    className="text-slate-300 hover:text-blue-400 transition-colors font-medium block mb-2"
                  >
                    +965 5530 1913
                  </a>
                  <a 
                    href="https://wa.me/96555301913" 
                    target="_blank" 
                    rel="noopener"
                    className="text-green-400 hover:text-green-300 transition-colors font-medium text-sm"
                  >
                    Chat on WhatsApp →
                  </a>
                </div>

                <div className="glass-card p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="w-5 h-5 text-purple-400" />
                    <span className="text-white font-semibold">Hours</span>
                  </div>
                  <div className="text-slate-300 text-sm space-y-1">
                    <div>Saturday-Thursday: 10:00 AM - 10:00 PM</div>
                    <div>Friday: 6:00 PM - 10:00 PM</div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-6">
                <h5 className="text-white font-semibold mb-4">Follow Us</h5>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={social.label}
                      className={`w-10 h-10 glass-card rounded-lg flex items-center justify-center text-slate-400 transition-all duration-300 hover:scale-110 hover:shadow-lg ${social.color}`}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-700/50 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-slate-400 text-sm text-center md:text-left">
              © {currentYear} Kuwait Computer Repair On Call (KCROC). All rights reserved.
            </div>
            
            <div className="flex items-center gap-6 text-sm flex-wrap justify-center">
              <a href="/privacy" className="text-slate-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="text-slate-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <div className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-4 h-4" />
                <span>Hawalli, Kuwait</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}