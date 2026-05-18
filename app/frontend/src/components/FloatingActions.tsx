import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Phone, MessageCircle, ArrowUp, MapPin } from 'lucide-react';

export default function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          size="icon"
          className="fixed bottom-24 right-4 z-50 w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          <ArrowUp className="w-6 h-6" />
        </Button>
      )}

      {/* Floating Action Bar - Mobile only, hidden on md+ */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white shadow-2xl border-t border-slate-200 md:hidden">
        <div className="flex">
          <Button 
            asChild
            className="flex-1 h-14 min-h-[44px] rounded-none bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm"
          >
            <a href="tel:+96555301913" className="flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              <span>Call</span>
            </a>
          </Button>
          <Button 
            asChild
            className="flex-1 h-14 min-h-[44px] rounded-none bg-green-500 hover:bg-green-600 text-white font-bold text-sm"
          >
            <a 
              href="https://wa.me/96555301913" 
              target="_blank" 
              rel="noopener"
              className="flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp</span>
            </a>
          </Button>
          <Button 
            asChild
            className="flex-1 h-14 min-h-[44px] rounded-none bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm"
          >
            <a 
              href="https://maps.google.com/?cid=3928987856909945446&g_mp=Cidnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLlNlYXJjaFRleHQ" 
              target="_blank" 
              rel="noopener"
              className="flex items-center justify-center gap-2"
            >
              <MapPin className="w-5 h-5" />
              <span>Directions</span>
            </a>
          </Button>
        </div>
      </div>

      {/* Floating Buttons for Desktop */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-40 flex-col gap-3">
        <Button 
          asChild
          size="lg"
          className="bg-green-500 hover:bg-green-600 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <a 
            href="https://wa.me/96555301913" 
            target="_blank" 
            rel="noopener"
            className="flex items-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp
          </a>
        </Button>
        
        <Button 
          asChild
          size="lg"
          className="bg-amber-500 hover:bg-amber-600 text-emerald-900 font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <a href="tel:+96555301913" className="flex items-center gap-2">
            <Phone className="w-5 h-5" />
            Call Now
          </a>
        </Button>
      </div>
    </>
  );
}