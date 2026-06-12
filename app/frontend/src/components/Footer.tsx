import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        {/* Brand Column */}
        <div className="space-y-5">
          <img 
            src="/kcroc-logo.png" 
            alt="KCROC - Kuwait Computer Repair On Call" 
            className="h-14 w-auto object-contain rounded-xl shadow-lg border border-slate-700/50 bg-slate-900/50" 
            loading="lazy" 
          />
          <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
            Professional computer and laptop repair in Kuwait. Free pickup & delivery across all governorates. No Fix, No Fee.
          </p>
          <a 
            href="https://wa.me/96555301913" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Chat with us on WhatsApp for repair services"
            className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500 hover:border-emerald-500 text-emerald-400 hover:text-white px-4 py-2 rounded-full text-xs font-bold transition-all"
          >
            <MessageCircle size={13} /> WhatsApp Us
          </a>
        </div>

        {/* Services Column */}
        <div>
          <h4 className="text-white font-bold mb-6">Services</h4>
          <ul className="space-y-3 text-sm text-slate-400">
            <li><Link to="/chip-level-motherboard-repair-hawalli" className="hover:text-cyan-400 transition-colors">Motherboard Repair</Link></li>
            <li><Link to="/macbook-repair-kuwait" className="hover:text-cyan-400 transition-colors">MacBook Repair</Link></li>
            <li><Link to="/gaming-pc-repair-kuwait" className="hover:text-cyan-400 transition-colors">Gaming PC Repair</Link></li>
            <li><Link to="/screen-replacement-kuwait" className="hover:text-cyan-400 transition-colors">Screen Replacement</Link></li>
            <li><Link to="/laptop-repair-kuwait" className="hover:text-cyan-400 transition-colors">Laptop Repair</Link></li>
            <li><Link to="/data-recovery-kuwait" className="hover:text-cyan-400 transition-colors">Data Privacy</Link></li>
            <li><Link to="/pricing" className="hover:text-cyan-400 transition-colors">Pricing</Link></li>
          </ul>
        </div>

        {/* Company Column */}
        <div>
          <h4 className="text-white font-bold mb-6">Company</h4>
          <ul className="space-y-3 text-sm text-slate-400">
            <li><Link to="/about" className="hover:text-cyan-400 transition-colors">About Us</Link></li>
            <li><Link to="/gallery" className="hover:text-cyan-400 transition-colors">Gallery</Link></li>
            <li><Link to="/contact" className="hover:text-cyan-400 transition-colors">Contact</Link></li>
            <li><Link to="/book" className="hover:text-cyan-400 transition-colors">Book Service</Link></li>
          </ul>
        </div>

        {/* Contact Column */}
        <div>
          <h4 className="text-white font-bold mb-6">Contact Us</h4>
          <div className="space-y-4 text-sm text-slate-400">
            <a href="tel:+96555301913" aria-label="Call KCROC support at +965 5530 1913" className="flex items-center gap-3 hover:text-cyan-400 transition-colors group">
              <Phone size={16} className="text-emerald-500 flex-shrink-0" /> +965 5530 1913
            </a>
            <a href="mailto:quadrillion1980@gmail.com" aria-label="Send an email to KCROC support" className="flex items-center gap-3 hover:text-cyan-400 transition-colors group">
              <Mail size={16} className="text-emerald-500 flex-shrink-0" /> Email Support
            </a>
            <div className="flex items-start gap-3">
              <MapPin size={16} className="mt-0.5 flex-shrink-0 text-emerald-500" />
              <span className="leading-relaxed">
                Al Mullah Complex, Ibn Khaldoun St,<br /> Basement Shop 19, Hawalli
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto border-t border-slate-800/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
        <p>© {new Date().getFullYear()} KCROC – Kuwait Computer Repair On Call.</p>
        <div className="flex gap-6">
          <Link to="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
