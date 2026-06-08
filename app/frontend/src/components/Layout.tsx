import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import Header from './Header';
import FloatingActions from './FloatingActions';

export default function Layout({ children }: { children: React.ReactNode }) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col min-h-[100dvh]">
      {/* 1. Global Header */}
      <Header />

      {/* 2. Main Page Content - Responsive padding replaces fixed 5rem gap */}
      <main className="flex-grow pt-16 pb-12 md:pb-20">
        {children}
      </main>

      {/* 3. Global Footer */}
      <footer className="bg-gray-950 border-t border-gray-800">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            {/* Brand Column */}
            <div className="space-y-4">
              <img
                src="https://res.cloudinary.com/dsbwzags3/image/upload/v1769908596/logo_btpfls.png"
                alt="KCROC - Kuwait Computer Repair On Call"
                width="140"
                height="50"
                className="w-[140px] h-auto"
                loading="lazy"
              />
              <p className="text-gray-400 text-sm">Professional Computer Repair Services in Kuwait</p>
              <p className="text-emerald-400 font-bold text-sm">🚨 Free Pick & Drop Included</p>
            </div>

            {/* Quick Links Column */}
            <div>
              <h4 className="text-white font-bold mb-6">Quick Links</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><Link to="/" className="hover:text-emerald-400 transition-colors">Home</Link></li>
                <li><Link to="/services" className="hover:text-emerald-400 transition-colors">Services</Link></li>
                <li><Link to="/pricing" className="hover:text-emerald-400 transition-colors">Pricing</Link></li>
                <li><Link to="/about" className="hover:text-emerald-400 transition-colors">About</Link></li>
                <li><Link to="/gallery" className="hover:text-emerald-400 transition-colors">Gallery</Link></li>
                <li><Link to="/contact" className="hover:text-emerald-400 transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h4 className="text-white font-bold mb-6">Contact Us</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li className="flex items-center gap-2"><Phone size={16} /> <a href="tel:+96555301913">+965 5530 1913</a></li>
                <li className="flex items-center gap-2"><Mail size={16} /> <a href="mailto:quadrillion1980@gmail.com">quadrillion1980@gmail.com</a></li>
                <li className="flex items-start gap-2"><MapPin size={16} className="mt-1" /> Hawalli, Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19</li>
              </ul>
            </div>

            {/* Business Hours */}
            <div>
              <h4 className="text-white font-bold mb-6">Business Hours</h4>
              <ul className="text-sm text-gray-400 space-y-2">
                <li><span className="text-white">Sat - Thu:</span> 10:00 AM - 10:00 PM</li>
                <li><span className="text-white">Fri:</span> 6:00 PM - 10:00 PM</li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-gray-900 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-gray-500">
            <p>&copy; {currentYear} KCROC - Kuwait Computer Repair On Call. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="https://www.facebook.com/computerrepairkuwait" target="_blank" rel="noopener noreferrer">📘 Facebook</a>
              <a href="https://www.instagram.com/computerrepairkuwait" target="_blank" rel="noopener noreferrer">📷 Instagram</a>
              <a href="https://www.tiktok.com/@computer.q8" target="_blank" rel="noopener noreferrer">🎵 TikTok</a>
            </div>
          </div>
        </div>
      </footer>

      {/* 4. Global Floating Actions */}
      <FloatingActions />
    </div>
  );
}
