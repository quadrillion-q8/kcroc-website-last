import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        {/* Brand Column */}
        <div className="space-y-4">
          <img src="https://res.cloudinary.com/dsbwzags3/image/upload/v1769908596/logo_btpfls.png" alt="KCROC Logo" className="h-12 w-auto" />
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            Professional computer and laptop repair services in Kuwait. We offer free pick-up and delivery for all your tech needs.
          </p>
        </div>

        {/* Services Column */}
        <div>
          <h4 className="text-white font-bold mb-6">Services</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><Link to="/motherboard-repair-kuwait" className="hover:text-emerald-400 transition-colors">Motherboard Repair</Link></li>
            <li><Link to="/macbook-repair-kuwait" className="hover:text-emerald-400 transition-colors">MacBook Repair</Link></li>
            <li><Link to="/gaming-pc-repair-kuwait" className="hover:text-emerald-400 transition-colors">Gaming PC Repair</Link></li>
            <li><Link to="/screen-replacement-kuwait" className="hover:text-emerald-400 transition-colors">Screen Replacement</Link></li>
          </ul>
        </div>

        {/* Company Column */}
        <div>
          <h4 className="text-white font-bold mb-6">Company</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><Link to="/about" className="hover:text-emerald-400 transition-colors">About Us</Link></li>
            <li><Link to="/gallery" className="hover:text-emerald-400 transition-colors">Gallery</Link></li>
            <li><Link to="/contact" className="hover:text-emerald-400 transition-colors">Contact</Link></li>
            <li><Link to="/book" className="hover:text-emerald-400 transition-colors">Book Service</Link></li>
          </ul>
        </div>

        {/* Contact Column */}
        <div>
          <h4 className="text-white font-bold mb-6">Contact Us</h4>
          <div className="space-y-4 text-sm text-gray-400">
            <a href="tel:+96555301913" className="flex items-center gap-3 hover:text-emerald-400 transition-colors">
              <Phone size={16} /> +965 5530 1913
            </a>
            <a href="mailto:quadrillion1980@gmail.com" className="flex items-center gap-3 hover:text-emerald-400 transition-colors">
              <Mail size={16} /> quadrillion1980@gmail.com
            </a>
            <div className="flex items-start gap-3">
              <MapPin size={16} className="mt-1 flex-shrink-0" />
              <span>Hawalli, Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
        <p>© 2026 KCROC - Kuwait Computer Repair On Call. All rights reserved.</p>
        <div className="flex gap-6">
          <Link to="/privacy" className="hover:text-gray-300">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-gray-300">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
