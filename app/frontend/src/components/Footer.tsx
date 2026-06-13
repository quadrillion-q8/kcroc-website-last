import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, MessageCircle, CalendarClock, ShieldCheck } from 'lucide-react';

const BUSINESS_PHONE = "+96555301913";
const cleanPhone = BUSINESS_PHONE.replace(/\D/g, '');
const WA_LINK = `https://wa.me/${cleanPhone}?text=${encodeURIComponent("Hi KCROC, I need computer repair assistance in Kuwait.")}`;

export default function Footer() {
  const [logoError, setLogoError] = useState(false);

  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Info */}
          <div>
            <Link to="/" className="flex items-center mb-6 block w-fit">
              {!logoError ? (
                <img 
                  src="/kcroc-logo.png" 
                  alt="KCROC Logo" 
                  className="h-14 w-auto object-contain rounded-xl" 
                  onError={() => setLogoError(true)} 
                />
              ) : (
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-8 h-8 text-cyan-400" />
                  <span className="text-2xl font-black text-white tracking-tight">KCROC</span>
                </div>
              )}
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Professional computer and laptop repair in Kuwait. Free pickup & delivery across all governorates. No Fix, No Fee.
            </p>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-bold transition-colors">
              <MessageCircle size={20} />
              WhatsApp Us
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Expert Services</h3>
            <ul className="space-y-3">
              <li><Link to="/chip-level-motherboard-repair-hawalli" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">Motherboard Repair</Link></li>
              <li><Link to="/macbook-repair-kuwait" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">MacBook Repair</Link></li>
              <li><Link to="/gaming-pc-repair-kuwait" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">Gaming PC Repair</Link></li>
              <li><Link to="/screen-replacement-kuwait" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">Screen Replacement</Link></li>
              <li><Link to="/laptop-repair-kuwait" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">Laptop Repair</Link></li>
              <li><Link to="/data-recovery-kuwait" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">Data Recovery</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">About Us</Link></li>
              <li><Link to="/pricing" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">Transparent Pricing</Link></li>
              <li><Link to="/gallery" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">Repair Gallery</Link></li>
              <li><Link to="/contact" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">Contact Location</Link></li>
              <li><Link to="/blog/laptop-repair-kuwait-2026" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">Tech Guides</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Connect</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-slate-400 text-sm">
                <MapPin className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <span>Al Mullah Complex, Ibn Khaldoun St, Basement Shop 19, Hawalli</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400 text-sm">
                <Phone className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <a href={`tel:${cleanPhone}`} className="hover:text-white transition-colors">{BUSINESS_PHONE}</a>
              </li>
              <li className="flex items-center gap-3 text-slate-400 text-sm mt-4">
                <CalendarClock className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <Link to="/book" className="text-emerald-400 font-bold hover:text-emerald-300 transition-colors">Book Free Pickup Now</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} KCROC – Kuwait Computer Repair On Call.
          </p>
          <div className="flex gap-6">
            <span className="text-slate-600 text-sm cursor-not-allowed">Privacy Policy</span>
            <span className="text-slate-600 text-sm cursor-not-allowed">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
