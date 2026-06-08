import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Cpu, Gamepad2, Laptop, Monitor, Database, ShieldAlert, Star, 
  MessageCircle, Phone, ArrowRight, BadgeCheck, Zap, RefreshCcw,
  Truck, ClipboardList, Wrench, CheckCircle2, ChevronDown, MapPin
} from 'lucide-react';

// --- Static Data ---
const services = [
  { title: 'Chip-Level Motherboard Repair', description: 'Advanced logic board diagnostics, micro-soldering, and professional BIOS flashing.', icon: Cpu, path: '/motherboard-repair-kuwait' },
  { title: 'Gaming PC & Workstation Tuning', description: 'GPU troubleshooting, liquid cooling loop maintenance, and high-performance optimization.', icon: Gamepad2, path: '/gaming-pc-repair-kuwait' },
  { title: 'MacBook Professional Repair', description: 'Expert logic board repair, hardware diagnostics, and component replacement for all Mac models.', icon: Laptop, path: '/macbook-repair-kuwait' },
  { title: 'Screen & Glass Replacement', description: 'Crisp, high-quality replacement displays for premium laptops, MacBooks, and monitors.', icon: Monitor, path: '/screen-replacement-kuwait' },
  { title: 'Advanced Data Recovery', description: 'Secure retrieval of critical files from failing hard drives, SSDs, and corrupted media.', icon: Database, path: '/data-recovery-kuwait' },
  { title: 'OS Restoration & Virus Removal', description: 'Complete system cleanups, malware elimination, and clean operating system deployments.', icon: ShieldAlert, path: '/virus-removal-kuwait' },
];

const reviews = [
  { name: 'Dr. Ghanim Al-Khaledi', text: 'They fixed my Predator Helios motherboard... competent, reliable, and HONEST.', rating: 5 },
  { name: 'Mohammed Sabil', text: 'I had given my laptop for a motherboard replacement. They managed to find a compatible motherboard and replace it successfully.', rating: 5 },
  { name: 'Ayman Elnagar', text: 'The best IT support and laptop repair shop I\'ve visited in Kuwait.', rating: 5 },
];

const trustPoints = [
  { icon: BadgeCheck, title: 'No Fix, No Fee', description: 'You only pay if we successfully repair your device. Zero risk, full transparency.' },
  { icon: Zap, title: 'Same-Day Service', description: 'Most repairs completed the same day. We know your device is essential.' },
  { icon: RefreshCcw, title: '30-Day Warranty', description: 'Every repair is backed by a 30-day parts and labour warranty.' },
  { icon: Truck, title: 'Free Pickup & Delivery', description: 'We collect and return your device anywhere across all Kuwait governorates.' },
];

const steps = [
  { icon: Phone, step: '01', title: 'Call or WhatsApp', description: 'Describe your issue via call or WhatsApp. We respond fast and schedule free pickup at your convenience.' },
  { icon: Wrench, step: '02', title: 'Diagnose & Repair', description: 'Our technicians run full hardware diagnostics and carry out the repair — chip-level or component replacement.' },
  { icon: Truck, step: '03', title: 'Free Delivery Back', description: 'Your repaired device is delivered back to you, same day when possible, with a 30-day warranty.' },
];

const areas = ['Hawalli', 'Salmiya', 'Rumaithiya', 'Bayan', 'Mishref', 'Kuwait City', 'Sharq', 'Qibla', 'Dasman', 'Farwaniya', 'Fahaheel', 'Mahboula', 'Fintas', 'Jabriya', 'Salwa', 'Ruqqa', 'Zahra', 'Shuwaikh', 'Ardiya', 'Rai'];

const faqs = [
  { question: 'Do you offer free pickup anywhere in Kuwait?', answer: 'Yes. We offer free pickup and delivery across all six Kuwait governorates — Hawalli, Capital, Farwaniya, Ahmadi, Jahra, and Mubarak Al-Kabeer.' },
  { question: 'What happens if you can\'t fix my device?', answer: 'Our No Fix, No Fee guarantee means you pay nothing if we cannot repair your device. We will return it to you at no charge.' },
  { question: 'How long does a typical repair take?', answer: 'Most software issues, screen replacements, and SSD upgrades are completed same day. Complex chip-level or motherboard repairs typically take 1–3 business days.' },
  { question: 'Do you repair all laptop brands?', answer: 'Yes — MacBook, Dell, HP, Lenovo, ASUS, Acer, MSI, Razer, Alienware, and more. We handle consumer laptops, gaming rigs, and professional workstations.' },
  { question: 'Is there a warranty on repairs?', answer: 'All repairs carry a 30-day warranty covering both parts and labour. If the same fault returns within 30 days, we fix it at no extra cost.' },
  { question: 'Where is your workshop located?', answer: 'Hawalli, Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19, Kuwait. But most customers never need to visit — we come to you.' },
];

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-800 rounded-2xl overflow-hidden mb-4">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-900/40 transition-colors">
        <span className="font-semibold text-white pr-4">{question}</span>
        <ChevronDown size={20} className={`text-emerald-400 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="px-6 pb-6 text-gray-400 leading-relaxed text-sm border-t border-gray-800 pt-4">{answer}</div>}
    </div>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
      <Helmet>
        <title>Expert Computer & Laptop Repair in Kuwait | KCROC</title>
      </Helmet>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full text-emerald-400 text-sm font-medium mb-6">
          <Star size={14} className="fill-emerald-400" />
          <span>Rated 4.9/5 by 150+ Kuwait Customers</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black max-w-4xl mx-auto tracking-tight mb-6">Reliable Computer Repair <span className="text-emerald-500">On Call</span></h1>
        <p className="mt-6 text-xl text-gray-400 max-w-2xl mx-auto">Professional hardware diagnostics and free pick & drop service anywhere in Kuwait.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
          <a href="https://wa.me/96555301913" className="flex items-center justify-center gap-2 bg-green-500 px-8 py-4 rounded-full font-bold text-lg hover:bg-green-600 transition-all shadow-lg hover:shadow-green-500/20"><MessageCircle size={20} /> WhatsApp Us</a>
          <a href="tel:+96555301913" className="flex items-center justify-center gap-2 bg-gray-800 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-700 transition-all border border-gray-700"><Phone size={20} /> Call Now</a>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-900/30 border-y border-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Why Choose KCROC?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustPoints.map((t, i) => (
              <div key={i} className="bg-gray-950/60 p-8 rounded-3xl border border-gray-800 text-center">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-5"><t.icon className="w-7 h-7 text-emerald-400" /></div>
                <h3 className="text-lg font-bold mb-3">{t.title}</h3>
                <p className="text-gray-400 text-sm">{t.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">Hardware Solutions</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <Link key={i} to={s.path} className="bg-gray-900/30 p-8 rounded-3xl border border-gray-800 hover:border-emerald-500/50 transition-all">
              <s.icon className="w-8 h-8 text-emerald-400 mb-6" />
              <h3 className="text-xl font-bold mb-3">{s.title}</h3>
              <p className="text-gray-400 text-sm">{s.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 max-w-5xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <div key={i} className="text-center p-8 border border-gray-800 rounded-3xl bg-gray-900/30">
              <div className="text-emerald-500 font-bold mb-4">{s.step}</div>
              <s.icon className="w-8 h-8 text-emerald-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-3">{s.title}</h3>
              <p className="text-gray-400 text-sm">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Areas Served */}
      <section className="py-20 bg-gray-900/30 border-y border-gray-800">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-8">Areas We Serve</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {areas.map((area) => <span key={area} className="px-4 py-2 rounded-full text-sm bg-gray-900 border border-gray-800">{area}</span>)}
          </div>
        </div>
      </section>

      {/* Reviews & FAQ */}
      <section className="py-20 max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">Frequently Asked Questions</h2>
        {faqs.map((f, i) => <FAQItem key={i} {...f} />)}
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-emerald-500/10 to-gray-900 border border-emerald-500/20 rounded-3xl p-12 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Fix Your Device?</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="https://wa.me/96555301913" className="bg-green-500 px-8 py-4 rounded-full font-bold">WhatsApp Us</a>
            <a href="tel:+96555301913" className="bg-gray-800 px-8 py-4 rounded-full font-bold">Call Now</a>
          </div>
        </div>
      </section>
    </div>
  );
}
