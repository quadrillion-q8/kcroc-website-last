import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';
import Header from './Header';
import FloatingActions from './FloatingActions';

export default function Layout({ children }: { children: React.ReactNode }) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow pt-16">
        {children}
      </main>

      {/* Refined Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 pt-16 pb-6 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <img src="https://res.cloudinary.com/dsbwzags3/image/upload/v1769908596/logo_btpfls.png" alt="KCROC Logo" className="h-10 w-auto" />
            <p className="text-gray-400 text-sm">Professional Computer Repair Services in Kuwait.</p>
            <p className="text-emerald-400 font-bold text-sm">🚨 Free Pick & Drop Included</p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/" className="hover:text-emerald-400">Home</Link></li>
              <li><Link to="/services" className="hover:text-emerald-400">Services</Link></li>
              <li><Link to="/pricing" className="hover:text-emerald-400">Pricing</Link></li>
              <li><Link to="/about" className="hover:text-emerald-400">About</Link></li>
              <li><Link to="/gallery" className="hover:text-emerald-400">Gallery</Link></li>
              <li><Link to="/contact" className="hover:text-emerald-400">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="text-white font-bold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2"><Phone size={16} /> <a href="tel:+96555301913">+965 5530 1913</a></li>
              <li className="flex items-center gap-2"><Mail size={16} /> <a href="mailto:quadrillion1980@gmail.com">quadrillion1980@gmail.com</a></li>
              <li className="flex items-start gap-2"><MapPin size={16} className="mt-1" /> Hawalli, Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19</li>
            </ul>
          </div>

          {/* Column 4: Hours */}
          <div>
            <h4 className="text-white font-bold mb-4">Business Hours</h4>
            <ul className="text-sm text-gray-400 space-y-1">
              <li><span className="text-white">Sat - Thu:</span> 10am - 10pm</li>
              <li><span className="text-white">Fri:</span> 6pm - 10pm</li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom with Socials */}
        <div className="max-w-7xl mx-auto border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-gray-500">&copy; {currentYear} KCROC. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="https://www.facebook.com/computerrepairkuwait" className="p-2 bg-gray-800 rounded-full hover:bg-emerald-600 transition-colors"><Facebook size={18} /></a>
            <a href="https://www.instagram.com/computerrepairkuwait" className="p-2 bg-gray-800 rounded-full hover:bg-emerald-600 transition-colors"><Instagram size={18} /></a>
          </div>
        </div>
      </footer>

      <FloatingActions />
    </div>
  );
}
