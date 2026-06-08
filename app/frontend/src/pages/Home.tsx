import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Cpu, Gamepad2, Laptop, Monitor, Database, ShieldAlert, Star,
  MessageCircle, Phone, ArrowRight, BadgeCheck, Zap, RefreshCcw,
  Truck, Wrench, CheckCircle2, ChevronDown, MapPin
} from 'lucide-react';

// ─── Static Data ─────────────────────────────────────────────────────────────

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
  { name: 'Ayman Elnagar', text: 'The best IT support and laptop repair shop I\u2019ve visited in Kuwait.', rating: 5 },
];

const trustPoints = [
  { icon: BadgeCheck, title: 'No Fix, No Fee', description: 'You only pay if we successfully repair your device. Zero risk, full transparency.' },
  { icon: Zap, title: 'Same-Day Service', description: 'Most repairs completed the same day. We know your device is essential.' },
  { icon: RefreshCcw, title: '30-Day Warranty', description: 'Every repair is backed by a 30-day parts and labour warranty.' },
  { icon: Truck, title: 'Free Pickup & Delivery', description: 'We collect and return your device anywhere across all Kuwait governorates.' },
];

const steps = [
  { icon: Phone, step: '01', title: 'Call or WhatsApp', description: 'Describe your issue via call or WhatsApp. We respond fast and schedule free pickup at your convenience.' },
  { icon: Wrench, step: '02', title: 'Diagnose & Repair', description: 'Our technicians run full hardware diagnostics and carry out the repair \u2014 chip-level or component replacement.' },
  { icon: Truck, step: '03', title: 'Free Delivery Back', description: 'Your repaired device is delivered back to you, same day when possible, with a 30-day warranty.' },
];

const areas = [
  'Hawalli', 'Salmiya', 'Rumaithiya', 'Bayan', 'Mishref',
  'Kuwait City', 'Sharq', 'Qibla', 'Dasman',
  'Farwaniya', 'Fahaheel', 'Mahboula', 'Fintas',
  'Jabriya', 'Salwa', 'Ruqqa', 'Zahra',
  'Shuwaikh', 'Ardiya', 'Rai',
];

const faqs = [
  { question: 'Do you offer free pickup anywhere in Kuwait?', answer: 'Yes. We offer free pickup and delivery across all six Kuwait governorates \u2014 Hawalli, Capital, Farwaniya, Ahmadi, Jahra, and Mubarak Al-Kabeer.' },
  { question: "What happens if you can't fix my device?", answer: 'Our No Fix, No Fee guarantee means you pay nothing if we cannot repair your device. We will return it to you at no charge.' },
  { question: 'How long does a typical repair take?', answer: 'Most software issues, screen replacements, and SSD upgrades are completed same day. Complex chip-level or motherboard repairs typically take 1\u20133 business days.' },
  { question: 'Do you repair all laptop brands?', answer: 'Yes \u2014 MacBook, Dell, HP, Lenovo, ASUS, Acer, MSI, Razer, Alienware, and more. We handle consumer laptops, gaming rigs, and professional workstations.' },
  { question: 'Is there a warranty on repairs?', answer: 'All repairs carry a 30-day warranty covering both parts and labour. If the same fault returns within 30 days, we fix it at no extra cost.' },
  { question: 'Where is your workshop located?', answer: 'Hawalli, Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19, Kuwait. But most customers never need to visit \u2014 we come to you.' },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Fade-up on scroll. Uses a ref so it never re-observes after becoming visible. */
const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
    >
      {children}
    </div>
  );
};

/** Animated counter — runs once when animated=true. */
const Counter = ({ end, suffix = '', animated }: { end: number; suffix?: string; animated: boolean }) => {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!animated) return;
    const duration = 2000;
    let startTime: number | null = null;
    const tick = (time: number) => {
      if (startTime === null) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [end, animated]);

  return <>{count}{suffix}</>;
};

/** Accordion FAQ row. */
const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-800 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-900/40 transition-colors"
        aria-expanded={open}
      >
        <span className="font-semibold text-white pr-4">{question}</span>
        <ChevronDown size={20} className={`text-emerald-400 flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-6 pb-6 text-gray-400 leading-relaxed text-sm border-t border-gray-800 pt-4">
          {answer}
        </div>
      )}
    </div>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [statsAnimated, setStatsAnimated] = useState(false);
  const statsRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const target = statsRef.current;
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStatsAnimated(true); observer.disconnect(); } },
      { threshold: 0.5 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans">
      <Helmet>
        <title>Expert Computer &amp; Laptop Repair in Kuwait | KCROC</title>
        <meta name="description" content="Professional diagnostics and free pickup/delivery anywhere in Kuwait. 4.9 Star Rated. No Fix No Fee." />
      </Helmet>

      {/* ── Hero ── */}
      <section className="pt-32 pb-20 px-6 text-center">
        <FadeIn>
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full text-emerald-400 text-sm font-medium mb-6">
            <Star size={14} className="fill-emerald-400" />
            <span>Rated 4.9/5 by 150+ Kuwait Customers</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black max-w-4xl mx-auto tracking-tight mb-6">
            Reliable Computer Repair <span className="text-emerald-500">On Call</span>
          </h1>
          <p className="mt-6 text-xl text-gray-400 max-w-2xl mx-auto">
            Professional hardware diagnostics and free pick &amp; drop service anywhere in Kuwait.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
            <a href="https://wa.me/96555301913" className="flex items-center justify-center gap-2 bg-green-500 px-8 py-4 rounded-full font-bold text-lg hover:bg-green-600 transition-all shadow-lg hover:shadow-green-500/20">
              <MessageCircle className="h-5 w-5" /> WhatsApp Us
            </a>
            <a href="tel:+96555301913" className="flex items-center justify-center gap-2 bg-gray-800 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-700 transition-all border border-gray-700">
              <Phone className="h-5 w-5" /> Call Now
            </a>
          </div>
        </FadeIn>
      </section>

      {/* ── Stats ── */}
      <section ref={statsRef} className="py-12 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-6">
        {[
          { value: <span>4.9</span>, label: 'Google Rating' },
          { value: <Counter end={150} suffix="+" animated={statsAnimated} />, label: 'Verified Reviews' },
          { value: <span>Free</span>, label: 'Pick & Drop' },
          { value: <span>30 Days</span>, label: 'Warranty' },
        ].map((stat, i) => (
          <FadeIn key={i} delay={i * 80}>
            <div className="bg-gray-900/40 p-6 rounded-2xl border border-gray-800 text-center hover:border-emerald-500/30 transition-colors">
              <div className="text-4xl font-black text-white">{stat.value}</div>
              <div className="text-xs text-gray-400 uppercase tracking-widest mt-2">{stat.label}</div>
            </div>
          </FadeIn>
        ))}
      </section>

      {/* ── Services Grid ── */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <FadeIn>
          <h2 className="text-4xl font-bold text-center mb-4">Professional Hardware Solutions</h2>
          <p className="text-gray-400 text-center mb-16">High-precision repairs for laptops, desktops, and gaming rigs.</p>
        </FadeIn>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <FadeIn key={i} delay={i * 60}>
              <Link
                to={s.path}
                className="block bg-gray-900/30 p-8 rounded-3xl border border-gray-800 hover:border-emerald-500/50 hover:bg-gray-900/60 transition-all group h-full"
              >
                <div className="bg-gray-800/50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-500/20 transition-colors">
                  <s.icon className="w-7 h-7 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{s.description}</p>
                <div className="text-emerald-500 text-sm font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ArrowRight size={14} />
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="py-20 bg-gray-900/30 border-y border-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-4xl font-bold text-center mb-4">Why Choose KCROC?</h2>
            <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
              Every repair comes with guarantees that protect you — no hidden costs, no surprises.
            </p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustPoints.map((t, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div className="bg-gray-950/60 p-8 rounded-3xl border border-gray-800 hover:border-emerald-500/30 transition-colors text-center h-full">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-5">
                    <t.icon className="w-7 h-7 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-bold mb-3">{t.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{t.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-20 max-w-5xl mx-auto px-6">
        <FadeIn>
          <h2 className="text-4xl font-bold text-center mb-4">How It Works</h2>
          <p className="text-gray-400 text-center mb-16">Three simple steps from broken to fixed.</p>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div className="flex flex-col items-center text-center p-8 rounded-3xl border border-gray-800 bg-gray-900/30 hover:border-emerald-500/30 transition-colors h-full">
                <div className="text-xs font-black text-emerald-500 tracking-widest mb-4">{s.step}</div>
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5">
                  <s.icon className="w-7 h-7 text-emerald-400" />
                </div>
                <h3 className="text-lg font-bold mb-3">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── Areas We Serve ── */}
      <section className="py-20 bg-gray-900/30 border-y border-gray-800">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <div className="flex items-center justify-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-emerald-400" />
              <h2 className="text-4xl font-bold">Areas We Serve</h2>
            </div>
            <p className="text-gray-400 text-center mb-12">
              Free pickup and delivery across all Kuwait governorates — wherever you are, we come to you.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {areas.map((area, i) => (
                <span key={i} className="px-4 py-2 rounded-full text-sm font-medium bg-gray-900/60 border border-gray-700 text-gray-300 hover:border-emerald-500/40 hover:text-emerald-400 transition-colors cursor-default">
                  {area}
                </span>
              ))}
            </div>
            <p className="text-center text-gray-500 text-sm mt-8">
              Don't see your area?{' '}
              <a href="https://wa.me/96555301913" className="text-emerald-400 hover:underline">WhatsApp us</a>
              {' '}— we cover all of Kuwait.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Reviews ── */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <FadeIn>
          <h2 className="text-4xl font-bold text-center mb-16">What Our Customers Say</h2>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div className="bg-gray-900/40 p-8 rounded-3xl border border-gray-800 flex flex-col h-full hover:border-gray-700 transition-colors">
                <div className="flex text-yellow-500 mb-6 gap-1">
                  {[...Array(r.rating)].map((_, j) => <Star key={j} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-gray-300 italic mb-8 flex-grow">"{r.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center font-bold text-emerald-400">
                    {r.name.charAt(0)}
                  </div>
                  <p className="font-bold">{r.name}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-gray-900/30 border-t border-gray-800">
        <div className="max-w-3xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-4xl font-bold text-center mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-400 text-center mb-12">Everything you need to know before booking a repair.</p>
          </FadeIn>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FadeIn key={i} delay={i * 50}>
                <FAQItem question={faq.question} answer={faq.answer} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-24 px-6">
        <FadeIn>
          <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-emerald-500/10 to-gray-900/0 border border-emerald-500/20 rounded-3xl p-12">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full text-emerald-400 text-sm font-medium mb-6">
              <CheckCircle2 size={14} />
              <span>No Fix, No Fee · Free Pickup · 30-Day Warranty</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-4">Ready to Fix Your Device?</h2>
            <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
              Call or WhatsApp now. We'll arrange free pickup across Kuwait and get your device running — often same day.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="https://wa.me/96555301913" className="flex items-center justify-center gap-2 bg-green-500 px-8 py-4 rounded-full font-bold text-lg hover:bg-green-600 transition-all shadow-lg hover:shadow-green-500/30">
                <MessageCircle className="h-5 w-5" /> WhatsApp: 55301913
              </a>
              <a href="tel:+96555301913" className="flex items-center justify-center gap-2 bg-gray-800 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-700 transition-all border border-gray-700">
                <Phone className="h-5 w-5" /> Call: 55301913
              </a>
            </div>
            <p className="text-gray-600 text-sm mt-6">
              Hawalli, Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19
            </p>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
