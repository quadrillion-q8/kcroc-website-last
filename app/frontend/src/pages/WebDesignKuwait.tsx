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
  Monitor,
  Smartphone,
  Search,
  Settings,
  Layout,
  BarChart3,
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

// "What We Build" services
const whatWeBuild = [
  { icon: <Layout className="w-8 h-8 text-cyan-400" />, title: 'Business Landing Pages', text: 'Fast, SEO-optimized single-page sites that convert visitors into customers' },
  { icon: <Monitor className="w-8 h-8 text-cyan-400" />, title: 'Multi-Page Service Websites', text: 'Full websites with service pages, pricing, contact and more' },
  { icon: <MapPin className="w-8 h-8 text-cyan-400" />, title: 'Google Business Integration', text: 'Embed maps, reviews, and click-to-call features for local visibility' },
  { icon: <Smartphone className="w-8 h-8 text-cyan-400" />, title: 'Mobile-First Design', text: 'Optimized for Arabic & English audiences in Kuwait' },
  { icon: <Search className="w-8 h-8 text-cyan-400" />, title: 'SEO Optimization', text: 'On-page SEO, meta tags, structured data, page speed tuning' },
  { icon: <Settings className="w-8 h-8 text-cyan-400" />, title: 'Website Maintenance & Hosting', text: 'Ongoing support, updates, and performance monitoring' },
];

// "Why Choose KCROC" reasons
const whyChooseUs = [
  { icon: '🇰🇼', title: 'Deep Kuwait Market Knowledge', text: 'We know what local clients need and how to reach them' },
  { icon: '📱', title: 'Mobile-First', text: 'Most Kuwait users browse on mobile — we design for that first' },
  { icon: '🌐', title: 'Bilingual Ready', text: 'Arabic + English support built into every project' },
  { icon: '🔍', title: 'Built-in SEO', text: 'Google Kuwait rankings from day one with proper optimization' },
  { icon: '⚡', title: 'Fast Turnaround', text: 'Same speed as our repairs — most sites launch in 3–7 days' },
  { icon: '💰', title: 'Affordable Local Pricing', text: 'No agency overheads — professional quality at fair prices' },
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

// Updated 4-step process
const steps = [
  { num: '1', icon: '💬', title: 'Free Consultation', text: 'Tell us your goals via WhatsApp' },
  { num: '2', icon: '🎨', title: 'Design Proposal', text: 'We share a mockup within 48 hours' },
  { num: '3', icon: '⚙️', title: 'Development', text: 'We build fast using modern frameworks' },
  { num: '4', icon: '🚀', title: 'Launch & Support', text: 'We deploy, test, and hand over' },
];

// Updated FAQs from spec
const faqs = [
  { q: 'Do you build websites for businesses in Kuwait?', a: 'Yes! We specialize in building professional websites for businesses of all sizes in Kuwait — from small shops and freelancers to larger service companies. We understand the local market and build sites that work for Kuwait audiences.' },
  { q: 'How long does it take to build a website?', a: 'Most websites are ready within 3–7 business days depending on the package. Our Starter package (single-page) is delivered in 3 days, Business package in 7 days, and Premium package in 14 days.' },
  { q: 'Do you offer Arabic language websites?', a: 'Yes! We build bilingual websites in both English and Arabic with proper RTL (right-to-left) support. This is included in our Premium package or available as an add-on for other packages.' },
  { q: 'Can you help with SEO and Google ranking?', a: 'Absolutely. Every website we build includes basic on-page SEO. Our Business and Premium packages include advanced SEO with structured data, meta tags, and page speed optimization to help you rank on Google Kuwait.' },
  { q: 'Do you provide website maintenance?', a: 'Yes, we offer ongoing maintenance and support. Our Premium package includes 1 month of free maintenance. After that, affordable monthly plans are available to keep your site updated and running smoothly.' },
  { q: 'What is the payment method?', a: 'Payment is made in Kuwait after you see and approve the design. We accept KNET and cash. No upfront payment required — you only pay when you\'re satisfied with the result.' },
  { q: 'Do I need any technical knowledge?', a: 'No technical knowledge needed at all. We handle everything from design to deployment and explain everything in simple terms. You just provide your content (logo, photos, text) and we do the rest.' },
  { q: 'What if I want changes after delivery?', a: 'We include up to 3 free revisions after delivery. Additional changes are available at a small fee. We want you to be 100% happy with your website.' },
];

// Portfolio data
const portfolioItems = [
  {
    title: 'KCROC Main Website',
    url: 'computerrepairkuwait.com',
    liveUrl: 'https://www.computerrepairkuwait.com',
    description: 'Designed and developed the full KCROC brand website from concept to launch. Includes service pages, pricing tables, gallery, WhatsApp CTA, SEO-optimized content, and free pickup lead generation flow.',
    tags: ['Next.js', 'React', 'Tailwind CSS', 'Netlify', 'Google Business API'],
  },
  {
    title: 'KCROC Battery Replacement Guide',
    url: 'computerrepairkuwait.com/battery-replacement',
    liveUrl: 'https://www.computerrepairkuwait.com/battery-replacement',
    description: 'A dedicated informational landing page targeting high-intent SEO keywords for laptop battery replacement in Kuwait. Includes model-specific pricing hints, FAQ schema, and WhatsApp booking CTA.',
    tags: ['Next.js', 'SEO Schema Markup', 'Mobile-First Design'],
  },
  {
    title: 'KCROC Gaming PC Cooling Page',
    url: 'computerrepairkuwait.com/gaming-pc-cooling',
    liveUrl: 'https://www.computerrepairkuwait.com/gaming-pc-cooling',
    description: 'A targeted content page designed around Kuwait\'s extreme heat and gamer audience. Covers thermal paste replacement, fan cleaning, airflow optimization, and booking CTAs for gaming PC owners.',
    tags: ['Next.js', 'Content Marketing', 'Responsive Layout'],
  },
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
  /* SEO metadata */
  useEffect(() => {
    document.title = 'Web Design Kuwait | Affordable Business Websites — KCROC';

    // Meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', 'Professional web design services in Kuwait by KCROC. We build fast, mobile-first, SEO-optimized websites for businesses. Get your site live in 3–7 days. Free consultation.');

    // OG Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', 'Web Design Kuwait | Affordable Business Websites — KCROC');

    // OG Description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', 'Professional web design services in Kuwait by KCROC. We build fast, mobile-first, SEO-optimized websites for businesses. Get your site live in 3–7 days. Free consultation.');

    // OG Image
    let ogImage = document.querySelector('meta[property="og:image"]');
    if (!ogImage) {
      ogImage = document.createElement('meta');
      ogImage.setAttribute('property', 'og:image');
      document.head.appendChild(ogImage);
    }
    ogImage.setAttribute('content', 'https://www.computerrepairkuwait.com/og-web-design.jpg');

    // OG Type
    let ogType = document.querySelector('meta[property="og:type"]');
    if (!ogType) {
      ogType = document.createElement('meta');
      ogType.setAttribute('property', 'og:type');
      document.head.appendChild(ogType);
    }
    ogType.setAttribute('content', 'website');

    // Keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'web design Kuwait, website development Kuwait, affordable web design Kuwait, business website Kuwait, Next.js developer Kuwait');
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
      {/*  SECTION 1 — HERO (Updated copy)                             */}
      {/* ============================================================ */}
      <Section id="hero" className="wd-hero">
        <div className="container mx-auto px-4 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left — Text */}
            <div className="space-y-6">
              <Badge className="bg-cyan-500/15 text-cyan-400 border-cyan-500/30 px-4 py-1.5 text-sm">
                🌐 Professional Web Design
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                <span className="text-white">Professional</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-300">
                  Web Design in Kuwait
                </span>
              </h1>

              <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-lg">
                We build fast, modern, mobile-first websites for businesses in Kuwait — from landing pages to full service portals.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-green-500 hover:bg-green-600 text-white font-bold shadow-lg shadow-green-500/25"
                  asChild
                >
                  <a
                    href="https://wa.me/96555301913?text=I'm interested in web design services"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    💬 Get a Free Quote
                  </a>
                </Button>
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold"
                  onClick={() => scrollTo('portfolio')}
                >
                  View Our Work
                </Button>
              </div>

              <p className="text-slate-400 text-sm flex flex-wrap gap-4">
                <span>✓ Mobile-first design</span>
                <span>✓ SEO optimized</span>
                <span>✓ Ready in 3–7 days</span>
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

              {/* Floating badge */}
              <div className="absolute -top-2 -right-2 lg:top-4 lg:-right-4 bg-[#0d1a2e] border-2 border-cyan-400/60 rounded-2xl px-5 py-3 shadow-xl shadow-cyan-500/20 z-10">
                <div className="text-cyan-400 text-3xl font-extrabold">60 KD</div>
                <div className="text-slate-400 text-xs text-center">starting at</div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  SECTION 2 — WHAT WE BUILD (New)                             */}
      {/* ============================================================ */}
      <Section id="what-we-build" className="py-20 px-4 bg-[#0d1a2e]">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="text-white">What We</span>{' '}
              <span className="text-cyan-400">Build</span>
            </h2>
            <p className="text-slate-300 mt-3 text-lg">
              Professional web solutions tailored for Kuwait businesses
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whatWeBuild.map((item, i) => (
              <Card
                key={i}
                className="bg-[#111827] border-cyan-500/15 rounded-xl hover:border-cyan-500/40 transition-all"
              >
                <CardContent className="p-6 space-y-3">
                  <div className="w-14 h-14 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h3 className="text-white text-lg font-bold">{item.title}</h3>
                  <p className="text-slate-300 text-sm">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  SECTION 3 — WHY CHOOSE KCROC (Updated)                      */}
      {/* ============================================================ */}
      <Section id="why-choose-us" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="text-white">Why Choose</span>{' '}
              <span className="text-cyan-400">KCROC for Web Design?</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, i) => (
              <Card
                key={i}
                className="bg-[#0d1a2e] border-cyan-500/15 rounded-xl hover:border-cyan-500/40 transition-all"
              >
                <CardContent className="p-6 text-center space-y-3">
                  <div className="text-4xl">{item.icon}</div>
                  <h3 className="text-white text-lg font-bold">{item.title}</h3>
                  <p className="text-slate-300 text-sm">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  SECTION 4 — WHAT'S INCLUDED (60 KD — unchanged)             */}
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
      {/*  SECTION 5 — WHO IS THIS FOR (unchanged)                     */}
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
      {/*  SECTION 6 — HOW IT WORKS (Updated to 4 steps)               */}
      {/* ============================================================ */}
      <Section id="how-it-works" className="py-20 px-4 bg-[#0d1a2e]">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="text-white">How It</span>{' '}
              <span className="text-cyan-400">Works</span>
            </h2>
            <p className="text-slate-300 mt-3 text-lg">
              From consultation to launch in 4 simple steps
            </p>
          </div>

          <div className="relative">
            {/* Connecting line (desktop only) */}
            <div className="hidden md:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 border-t-2 border-dashed border-cyan-500/30"></div>

            <div className="grid md:grid-cols-4 gap-8">
              {steps.map((s, i) => (
                <div key={i} className="relative text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cyan-500/20 border-2 border-cyan-400 text-cyan-400 font-bold text-xl mx-auto relative z-10">
                    {s.num}
                  </div>
                  <div className="text-4xl">{s.icon}</div>
                  <h3 className="text-white text-lg font-bold">{s.title}</h3>
                  <p className="text-slate-300 text-sm">{s.text}</p>
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
      {/*  SECTION 7 — PORTFOLIO (Updated with real projects)          */}
      {/* ============================================================ */}
      <Section id="portfolio" className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="text-white">Our Work —</span>{' '}
              <span className="text-cyan-400">Real Projects, Real Results</span>
            </h2>
            <p className="text-slate-300 mt-3 text-lg">
              We designed and built these platforms from scratch.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {portfolioItems.map((project, i) => (
              <Card
                key={i}
                className="bg-[#0d1a2e] border-cyan-500/20 rounded-xl overflow-hidden hover:border-cyan-500/40 transition-all"
              >
                <div className="h-40 bg-gradient-to-br from-[#111827] to-[#0d2847] flex items-center justify-center border-b border-cyan-500/10">
                  <div className="text-center">
                    <Globe className="w-10 h-10 text-cyan-400 mx-auto mb-2" />
                    <span className="text-cyan-400 text-xs font-mono">{project.url}</span>
                  </div>
                </div>
                <CardContent className="p-5 space-y-3">
                  <h3 className="text-white font-bold text-lg">{project.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
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
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Live Site <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* ============================================================ */}
      {/*  SECTION 8 — FAQ (Updated questions)                         */}
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
      {/*  SECTION 9 — CONTACT / QUOTE FORM (unchanged)               */}
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
      {/*  SECTION 10 — BOTTOM CTA BANNER (unchanged)                  */}
      {/* ============================================================ */}
      <section className="wd-bottom-cta py-16 px-4">
        <div className="container mx-auto max-w-3xl text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Ready to Launch Your Website?
          </h2>
          <p className="text-emerald-100 text-lg">
            Contact us today for a free consultation. We'll get back to you within 2 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-white font-bold shadow-lg"
              asChild
            >
              <a
                href="https://wa.me/96555301913?text=Hi+I+want+a+website"
                target="_blank"
                rel="noopener noreferrer"
              >
                💬 WhatsApp Now
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/60 text-white hover:bg-white/10 font-bold"
              asChild
            >
              <a href="tel:+96555301913">📞 Call +965 5530 1913</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}