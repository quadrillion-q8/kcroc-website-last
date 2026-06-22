import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Phone, Mail, MapPin, Clock, MessageCircle, Send, Loader2, Facebook, Instagram
} from 'lucide-react';
import { BUSINESS_INFO } from '../constants/data';
import { ROUTES } from '../constants/routes'; // 🧠 Centralized Registry
import MetaSEO from '../components/seo/MetaSEO';
import SchemaMarkup from '../components/seo/SchemaMarkup';

/* ─────────────────────────────────────────────────────────────────────────────
   1. PAGE DATA
───────────────────────────────────────────────────────────────────────────── */

const PAGE_URL = `${BUSINESS_INFO.url}${ROUTES.contact}`;

const ADDRESS_LINES = [
  'Ibn Khaldoun St, Al Mullah Complex',
  'Basement Shop 19',
  'Hawalli, Kuwait',
];

const MAP_TITLE = 'Kuwait Computer Repair On Call – Hawalli, Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19';
const EMAIL = 'quadrillion1980@gmail.com';
const PHONE_DISPLAY = '+965 5530 1913';

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": `${PAGE_URL}#webpage`,
      "name": "Contact KCROC | Computer Repair in Hawalli, Kuwait",
      "url": PAGE_URL,
      "description": "Contact Kuwait Computer Repair On Call (KCROC). Call us, WhatsApp us, or visit our shop in Hawalli for expert tech support and free pickup.",
      "isPartOf": { "@id": `${BUSINESS_INFO.url}/#website` },
      "breadcrumb": { "@id": `${PAGE_URL}#breadcrumb` }
    },
    {
      "@type": "LocalBusiness",
      "@id": `${BUSINESS_INFO.url}/#business`,
      "name": BUSINESS_INFO.name,
      "url": BUSINESS_INFO.url,
      "telephone": BUSINESS_INFO.phone,
      "email": EMAIL,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19",
        "addressLocality": "Hawalli",
        "addressRegion": "Hawalli Governorate",
        "addressCountry": "KW"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 29.3356,
        "longitude": 48.025
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        "opens": "10:00",
        "closes": "22:00"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${PAGE_URL}#breadcrumb`,
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": BUSINESS_INFO.url + ROUTES.home },
        { "@type": "ListItem", "position": 2, "name": "Contact", "item": PAGE_URL }
      ]
    }
  ]
};

type FormData = {
  name: string; email: string; phone: string; subject: string; message: string;
};

const initialFormData: FormData = {
  name: '', email: '', phone: '', subject: '', message: ''
};

/* ─────────────────────────────────────────────────────────────────────────────
   2. MAIN COMPONENT
───────────────────────────────────────────────────────────────────────────── */

export default function Contact() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const whatsappMessage = useMemo(
    () => `*New Contact Enquiry*\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Email:* ${formData.email}\n*Subject:* ${formData.subject}\n\n*Message:*\n${formData.message}`,
    [formData]
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const url = `https://wa.me/${BUSINESS_INFO.cleanPhone}?text=${encodeURIComponent(whatsappMessage)}`;
      const popup = window.open(url, '_blank', 'noopener,noreferrer');
      if (!popup) window.location.href = url;
    } finally {
      setTimeout(() => setIsSubmitting(false), 800);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <main className="w-full min-h-screen bg-transparent text-white font-sans selection:bg-cyan-500/30 pt-32">
      <MetaSEO
        title="Contact KCROC | Computer Repair in Hawalli, Kuwait"
        description="Contact Kuwait Computer Repair On Call (KCROC). Call us, WhatsApp us, or visit our shop in Hawalli for expert tech support and free pickup."
        canonical={PAGE_URL}
      />
      <SchemaMarkup schema={STRUCTURED_DATA} />

      {/* Breadcrumbs using Registry */}
      <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-6 mb-8 relative z-10">
        <ol className="flex items-center space-x-2 text-sm text-slate-400 font-medium">
          <li><Link to={ROUTES.home} className="hover:text-cyan-400 transition-colors">Home</Link></li>
          <li><span className="text-slate-600">/</span></li>
          <li aria-current="page" className="text-cyan-400">Contact</li>
        </ol>
      </nav>

      {/* Rest of the component remains the same... */}
      {/* ... */}
    </main>
  );
}
