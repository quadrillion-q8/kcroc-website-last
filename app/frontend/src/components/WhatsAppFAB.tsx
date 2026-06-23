import { MessageCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../constants/data';

export default function WhatsAppFAB() {
  return (
    <a
      href={`https://wa.me/${BUSINESS_INFO.cleanPhone}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-emerald-500 text-white p-4 rounded-full shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:scale-110 transition-transform duration-300 animate-bounce"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle size={32} />
    </a>
  );
}
