import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Phone,
  MessageCircle,
  Check,
  ExternalLink,
  Send,
  MapPin,
  Clock,
  Globe,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Fade-in on scroll hook                                             */
/* ------------------------------------------------------------------ */
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, className: visible ? 'wd-fade-in wd-visible' : 'wd-fade-in' };
}

function Section({ id, className = '', children }: { id: string; className?: string; children: React.ReactNode }) {
  const fade = useFadeIn();
  return (
    <section id={id} ref={fade.ref} className={`${fade.className} ${className}`}>
      {children}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const features = [
  { icon: '📱', title: 'Mobile-Friendly', text: 'Looks great on all phones, tablets and computers' },
  { icon: '💬', title: 'WhatsApp Button', text: 'Customers contact you directly from your website' },
  { icon: '📍', title: 'Google Maps', text: 'Show your exact business location to every visitor' },
  { icon: '⚡', title: 'Ready in 3 Days', text: 'Fast delivery — no waiting weeks for your website' },
];

const checklist = [
  '1-Page Professional Website',
  'Mobile-Friendly & Responsive Design',
  'WhatsApp Chat Button',
  'Google Maps Integration',
  'Your Logo, Photos & Services Listed',
  'Contact Form',
  'Basic On-Page SEO',
  'Hosting Setup Guidance',
  'Up to 3 Free Revisions',
  'Delivered in 3 Days',
];

const audiences = [
  { icon: '🛒', title: 'Small Shop Owners' },
  { icon: '💇', title: 'Salons & Beauty' },
  { icon: '🍕', title: 'Restaurants & Cafes' },
  { icon: '💼', title: 'Freelancers & Consultants' },
  { icon: '🏢', title: 'Small Businesses' },
  { icon: '👤', title: 'Personal Portfolio' },
];

const steps = [
  { num: '1', icon: '💬', title: 'Contact Us on WhatsApp', text: 'Tell us your business name, what you do, and any photos you have' },
  { num: '2', icon: '🎨', title: 'We Build Your Website', text: 'We design and develop your website in just 3 days' },
  { num: '3', icon: '🚀', title: 'You Go Live!', text: 'Your website is ready. We guide you through going live.' },
];

const faqs = [
  { q: 'Do you only build one-page websites?', a: 'The 60 KD package includes a professional one-page website. Multi-page websites are available at custom pricing — contact us on WhatsApp for details.' },
  { q: 'What do I need to provide?', a: 'Just your business name, logo (if you have one), photos, services list, WhatsApp number and location. We handle everything else.' },
  { q: 'How do I pay?', a: 'Payment is made in Kuwait after you see and approve the design. We accept KNET and cash. No upfront payment required.' },
  { q: 'Can I get the website in Arabic too?', a: 'Yes! Bilingual websites in English and Arabic are available. Contact us on WhatsApp for custom pricing.' },
  { q: 'Do you host the website for me?', a: 'We guide you through the hosting setup process. Hosting is paid separately and is very affordable (starting around 5 KD per month).' },
  { q: 'What if I want changes after delivery?', a: 'We include up to 3 free revisions after delivery. Additional changes are available at a small fee.' },
  { q: 'How long does it take?', a: 'Your website will be ready within 3 business days after you provide your content (logo, photos, text).' },
  { q: 'Do I need any technical knowledge?', a: 'No technical knowledge needed at all. We handle everything and explain everything in simple terms.' },
];

const businessTypes = [
  'Shop',
  'Restaurant or Cafe',
  'Salon or Beauty',
  'Freelancer',
  'Personal Portfolio',
  'Other',
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function WebDesignKuwait() {
  /* SEO title */
  useEffect(() => {
    document.title = 'Web Design Kuwait | Only 60 KD | KCROC';
  }, []);

  /* Contact form state */
  const [form, setForm] = useState({
    name: '',
    phone: '',
    businessType: '',
    hasLogo: 'Yes',
    message: '',
  });

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    },
    []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Name: ${form.name}\nWhatsApp: ${form.phone}\nBusiness Type: ${form.businessType}\nHas Logo: ${form.hasLogo}\nNotes: ${form.message}`;
    window.open(`https://wa.me/96555301913?text=${encodeURIComponent(text)}`, '_blank');
  };

  /* Smooth scroll helper */
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="wd-page">
      {/* ============================================================ */}
      {/*  SECTION 1 — HERO                                            */}
      {/* ============================================================ */}
      <Section id="hero" className="wd-hero">
        <div className="container mx-auto px-4 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left — Text */}
            <div className="space-y-6">
              <Badge className="bg-cyan-500/15 text-cyan-400 border-cyan-500/30 px-4 py-1.5 text-sm">
                🌐 New Service
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                <span className="text-white">Get Your Business</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-300">
                  Website in Kuwait
                </span>
              </h1>

              <p className="text-xl md:text-2xl">
                <span className="text-cyan-400 font-semibold">Simple. Fast. Affordable.</span>{' '}
                <span className="text-white font-bold text-2xl md:text-3xl">Only 60 KD.</span>
              </p>

              <p className="text-slate-300 text-lg leading-relaxed max-w-lg">
                We build clean, mobile-friendly websites for small businesses, shops, freelancers
                and expats in Kuwait. Ready in 3 days.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-green-500 hover:bg-green-600 text-white font-bold shadow-lg shadow-green-500/25"
                  asChild
                >
                  <a
                    href="https://wa.me/96555301913?text=Hi+I+want+a+website"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    💬 WhatsApp Us Now
                  </a>
                </Button>
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold"
                  onClick={() => scrollTo('contact')}
                >
                  Get a Free Quote
                </Button>
              </div>

              <p className="text-slate-400 text-sm flex flex-wrap gap-4">
                <span>✓ Fixed price</span>
                <span>✓ No hidden fees</span>
                <span>✓ Ready in 3 days</span>
              </p>
            </div>

            {/* Right — Laptop Mockup */}
            <div className="relative flex justify-center">
              <div className="wd-laptop">
                <div className="wd-laptop-screen">
                  <div className="wd-laptop-content">
                    <div className="text-cyan-400 text-xs font-mono mb-1">www.yourbusiness.com</div>
                    <div className="h-3 w-3/4 bg-cyan-500/30 rounded mb-2"></div>
                    <div className="h-2 w-full bg-slate-600/40 rounded mb-1"></div>
                    <div className="h-2 w-5/6 bg-slate-600/40 rounded mb-1"></div>
                    <div className="h-2 w-2/3 bg-slate-600/40 rounded mb-3"></div>
                    <div className="flex gap-2">
                      <div className="h-6 w-20 bg-green-500/40 rounded"></div>
                      <div className="h-6 w-16 bg-blue-500/40 rounded"></div>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <div className="h-12 bg-slate-700/40 rounded"></div>
                      <div className="h-12 bg-slate-700/40 rounded"></div>
                    </div>
                  </div>
                </div>
                <div className="wd-laptop-base"></div>
              </div>

              {/* Floating 60 KD badge */}
              <div className="absolute -top-2 -right-2 lg:top-4 lg:-right-4 bg-[#0d1a2e] border-2 border-cyan-400/60 rounded-2xl px-5 py-3 shadow-xl shadow-cyan-500/20 z-10">
                <div className="text-cyan-400 text-3xl font-extrabold">60 KD</div>
                <div className="text-slate-400 text-xs text-center">one-time</div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  SECTION 2 — WHY CHOOSE US                                   */}
      {/* ============================================================ */}
      <Section id="features" className="py-20 px-4" style-bg="alt">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="text-white">Why Choose</span>{' '}
              <span className="text-cyan-400">KCROC Web Design</span>
            </h2>
            <p className="text-slate-300 mt-3 text-lg">
              Everything your business needs to get online fast
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {features.map((f, i) => (
              <Card
                key={i}
                className="bg-[#0d1a2e] border-cyan-500/15 rounded-xl hover:border-cyan-500/40 transition-all"
              >
                <CardContent className="p-6 text-center space-y-3">
                  <div className="text-4xl">{f.icon}</div>
                  <h3 className="text-white text-xl font-bold">{f.title}</h3>
                  <p className="text-slate-300">{f.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  SECTION 3 — WHAT'S INCLUDED                                 */}
      {/* ============================================================ */}
      <Section id="package" className="py-20 px-4 bg-[#0d1a2e]">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="text-white">Everything Included</span>{' '}
              <span className="text-cyan-400">— Only 60 KD</span>
            </h2>
            <p className="text-slate-300 mt-3 text-lg">
              One simple package. One fixed price. No surprises.
            </p>
          </div>

          <Card className="bg-[#111827] border-cyan-500/20 rounded-2xl overflow-hidden relative">
            {/* Popular badge */}
            <div className="absolute top-4 right-4 z-10">
              <Badge className="bg-green-500 text-white border-0 px-4 py-1 text-sm font-bold">
                Most Popular
              </Badge>
            </div>

            <CardContent className="p-8 md:p-12">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Starter Website</h3>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-6xl font-extrabold text-cyan-400">60</span>
                  <span className="text-2xl font-bold text-cyan-400">KD</span>
                </div>
                <p className="text-slate-400 mt-1">One-Time Payment</p>
              </div>

              {/* Checklist */}
              <div className="grid sm:grid-cols-2 gap-3 mb-10">
                {checklist.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
                    <span className="text-slate-200">{item}</span>
                  </div>
                ))}
              </div>

              <Button
                size="lg"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold text-lg py-6 shadow-lg shadow-green-500/25"
                asChild
              >
                <a
                  href="https://wa.me/96555301913?text=Hi+I+want+a+website+60KD"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  💬 Order Now via WhatsApp
                </a>
              </Button>

              <p className="text-slate-400 text-sm text-center mt-4">
                Pay after you see and approve the design. KNET or cash accepted.
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  SECTION 4 — WHO IS THIS FOR                                 */}
      {/* ============================================================ */}
      <Section id="for-who" className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="text-cyan-400">Perfect</span>{' '}
              <span className="text-white">For...</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {audiences.map((a, i) => (
              <Card
                key={i}
                className="bg-[#0d1a2e] border-cyan-500/15 rounded-xl hover:scale-105 hover:border-cyan-500/40 transition-all duration-300 cursor-default"
              >
                <CardContent className="p-6 text-center space-y-3">
                  <div className="text-5xl">{a.icon}</div>
                  <h3 className="text-white font-bold">{a.title}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  SECTION 5 — HOW IT WORKS                                    */}
      {/* ============================================================ */}
      <Section id="how-it-works" className="py-20 px-4 bg-[#0d1a2e]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="text-white">How It</span>{' '}
              <span className="text-cyan-400">Works</span>
            </h2>
            <p className="text-slate-300 mt-3 text-lg">
              Get your website in 3 simple steps
            </p>
          </div>

          <div className="relative">
            {/* Connecting line (desktop only) */}
            <div className="hidden md:block absolute top-16 left-[16.67%] right-[16.67%] h-0.5 border-t-2 border-dashed border-cyan-500/30"></div>

            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((s, i) => (
                <div key={i} className="relative text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cyan-500/20 border-2 border-cyan-400 text-cyan-400 font-bold text-xl mx-auto relative z-10">
                    {s.num}
                  </div>
                  <div className="text-4xl">{s.icon}</div>
                  <h3 className="text-white text-xl font-bold">{s.title}</h3>
                  <p className="text-slate-300">{s.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-white font-bold shadow-lg shadow-green-500/25"
              asChild
            >
              <a
                href="https://wa.me/96555301913?text=Hi+I+want+to+start+my+website"
                target="_blank"
                rel="noopener noreferrer"
              >
                Start Now → WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  SECTION 6 — PORTFOLIO                                       */}
      {/* ============================================================ */}
      <Section id="portfolio" className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="text-white">Our</span>{' '}
              <span className="text-cyan-400">Work</span>
            </h2>
            <p className="text-slate-300 mt-3 text-lg">See what we've built</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Real portfolio card */}
            <Card className="bg-[#0d1a2e] border-cyan-500/20 rounded-xl overflow-hidden hover:border-cyan-500/40 transition-all">
              <div className="h-40 bg-[#111827] flex items-center justify-center border-b border-cyan-500/10">
                <div className="text-center">
                  <Globe className="w-10 h-10 text-cyan-400 mx-auto mb-2" />
                  <span className="text-cyan-400 text-sm font-mono">computerrepairkuwait.com</span>
                </div>
              </div>
              <CardContent className="p-5 space-y-3">
                <h3 className="text-white font-bold text-lg">Kuwait Computer Repair On Call</h3>
                <p className="text-slate-300 text-sm">
                  Multi-page business website with SEO, WhatsApp integration and Google Maps
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Next.js', 'SEO', 'WhatsApp', 'Google Maps'].map((tag) => (
                    <Badge
                      key={tag}
                      className="bg-cyan-500/15 text-cyan-300 border-cyan-500/30 text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button
                  size="sm"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-2"
                  asChild
                >
                  <a
                    href="https://computerrepairkuwait.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Live Site <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Placeholder cards */}
            {[0, 1].map((i) => (
              <Card
                key={i}
                className="bg-[#0d1a2e] border-cyan-500/20 rounded-xl overflow-hidden hover:border-cyan-500/40 transition-all border-dashed"
              >
                <div className="h-40 bg-[#111827] flex items-center justify-center border-b border-cyan-500/10">
                  <span className="text-5xl">🌐</span>
                </div>
                <CardContent className="p-5 space-y-3">
                  <h3 className="text-white font-bold text-lg">Your Business Here?</h3>
                  <p className="text-slate-300 text-sm">Could be your website</p>
                  <Button
                    size="sm"
                    className="w-full bg-green-500 hover:bg-green-600 text-white mt-2"
                    asChild
                  >
                    <a
                      href="https://wa.me/96555301913?text=Hi+I+want+a+website"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Get Started →
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  SECTION 7 — FAQ                                             */}
      {/* ============================================================ */}
      <Section id="faq" className="py-20 px-4 bg-[#0d1a2e]">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="text-cyan-400">Frequently Asked</span>{' '}
              <span className="text-white">Questions</span>
            </h2>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-[#111827] border border-cyan-500/15 rounded-xl px-5 overflow-hidden"
              >
                <AccordionTrigger className="text-white text-left font-semibold hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-slate-300 pb-5 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  SECTION 8 — CONTACT / QUOTE FORM                           */}
      {/* ============================================================ */}
      <Section id="contact" className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="text-white">Get Your</span>{' '}
              <span className="text-cyan-400">Free Quote</span>
            </h2>
            <p className="text-slate-300 mt-3 text-lg">
              Fill in the form and we'll reply within a few hours on WhatsApp
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* LEFT — Form (3 cols) */}
            <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-5">
              {/* Name */}
              <div>
                <label className="block text-slate-300 text-sm mb-1.5">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full bg-[#111827] border border-cyan-500/20 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
                  placeholder="Your full name"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-slate-300 text-sm mb-1.5">WhatsApp Number *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full bg-[#111827] border border-cyan-500/20 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition"
                  placeholder="+965 XXXX XXXX"
                />
              </div>

              {/* Business Type */}
              <div>
                <label className="block text-slate-300 text-sm mb-1.5">Business Type *</label>
                <select
                  name="businessType"
                  required
                  value={form.businessType}
                  onChange={handleChange}
                  className="w-full bg-[#111827] border border-cyan-500/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 transition appearance-none"
                >
                  <option value="" disabled>
                    Select your business type
                  </option>
                  {businessTypes.map((bt) => (
                    <option key={bt} value={bt}>
                      {bt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Has Logo */}
              <div>
                <label className="block text-slate-300 text-sm mb-2">Do you have a logo?</label>
                <div className="flex gap-6">
                  {['Yes', 'Not yet'].map((opt) => (
                    <label key={opt} className="flex items-center gap-2 text-slate-200 cursor-pointer">
                      <input
                        type="radio"
                        name="hasLogo"
                        value={opt}
                        checked={form.hasLogo === opt}
                        onChange={handleChange}
                        className="accent-cyan-400"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-slate-300 text-sm mb-1.5">Message / Notes</label>
                <textarea
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full bg-[#111827] border border-cyan-500/20 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition resize-none"
                  placeholder="Tell us about your business..."
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold text-lg py-6 shadow-lg shadow-green-500/25"
              >
                <Send className="w-5 h-5 mr-2" />
                📩 Send via WhatsApp
              </Button>
            </form>

            {/* RIGHT — Contact Info (2 cols) */}
            <Card className="lg:col-span-2 bg-[#111827] border-cyan-500/20 rounded-xl h-fit">
              <CardContent className="p-6 space-y-5">
                <h3 className="text-white text-xl font-bold">Or Contact Us Directly</h3>

                <div className="space-y-4">
                  <a
                    href="https://wa.me/96555301913"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-slate-300 hover:text-green-400 transition"
                  >
                    <MessageCircle className="w-5 h-5 text-green-400" />
                    <span>WhatsApp: +965 5530 1913</span>
                  </a>

                  <a
                    href="tel:+96555301913"
                    className="flex items-center gap-3 text-slate-300 hover:text-cyan-400 transition"
                  >
                    <Phone className="w-5 h-5 text-cyan-400" />
                    <span>Call: +965 5530 1913</span>
                  </a>

                  <a
                    href="https://computerrepairkuwait.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-slate-300 hover:text-cyan-400 transition"
                  >
                    <Globe className="w-5 h-5 text-cyan-400" />
                    <span>computerrepairkuwait.com</span>
                  </a>

                  <div className="flex items-center gap-3 text-slate-300">
                    <MapPin className="w-5 h-5 text-cyan-400" />
                    <span>Hawalli, Kuwait</span>
                  </div>

                  <div className="flex items-center gap-3 text-slate-300">
                    <Clock className="w-5 h-5 text-cyan-400" />
                    <span>Sat–Thu 10AM–10PM, Fri 6PM–10PM</span>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold mt-4"
                  asChild
                >
                  <a
                    href="https://wa.me/96555301913?text=Hi+I+want+a+website"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    💬 Chat on WhatsApp
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  SECTION 9 — BOTTOM CTA BANNER                              */}
      {/* ============================================================ */}
      <section className="wd-bottom-cta py-16 px-4">
        <div className="container mx-auto max-w-3xl text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Ready to get your website?
          </h2>
          <p className="text-emerald-100 text-lg">
            Let's build it today — only 60 KD, ready in 3 days.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-white font-bold shadow-lg"
              asChild
            >
              <a
                href="https://wa.me/96555301913?text=Hi+I+want+a+website+60KD"
                target="_blank"
                rel="noopener noreferrer"
              >
                💬 WhatsApp Now – 60 KD
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/60 text-white hover:bg-white/10 font-bold"
              asChild
            >
              <a href="tel:+96555301913">📞 Call Now</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}