// File: app/frontend/src/components/home/Hero.tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, MessageCircle, CalendarClock, Star } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { KCROC_GRAPH } from '../../data/graph';
import { useAnalytics } from '../../core/analytics/AnalyticsProvider';

export default function Hero() {
  const [statsAnimated, setStatsAnimated] = useState(false);
  const [statsLoading, setStatsLoading] = useState(true);
  const { trackConversion } = useAnalytics();

  const homePage = KCROC_GRAPH.pages?.find((p) => p.id === 'page-home');
  const hero = homePage?.hero;
  const business = KCROC_GRAPH.business;
  const phone = business?.telephone ?? '96555301913';
  const rating = business?.aggregateRating?.ratingValue ?? '4.9';
  const repairsStat = KCROC_GRAPH.stats?.items?.find((s: any) => s.label === 'Repairs completed');
  const logoUrl = business?.logoUrl ?? '/logo.png';

  const headline = hero?.headline ?? "Kuwait's Expert Component-Level Repair Service.";

  useEffect(() => {
    const loadingTimer = setTimeout(() => setStatsLoading(false), 800);
    const animationTimer = setTimeout(() => setStatsAnimated(true), 1000);
    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(animationTimer);
    };
  }, []);

  const stats = [
    { number: 500, suffix: '+', label: 'Repairs Completed' },
    { number: 98, suffix: '%', label: 'Success Rate' },
    { number: 24, suffix: '/7', label: 'Support Available' },
  ];

  const Counter = ({
    end,
    suffix = '',
    duration = 2000,
  }: {
    end: number;
    suffix?: string;
    duration?: number;
  }) => {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
      if (!statsAnimated || hasAnimated || statsLoading) return;
      setHasAnimated(true);

      let startTime: number;
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        setCount(Math.floor(progress * end));

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(end); 
        }
      };

      requestAnimationFrame(animate);
    }, [statsAnimated, hasAnimated, statsLoading, end, duration]);

    if (statsLoading) return <span className="counter loading-state">--</span>;

    return (
      <span className="counter">
        {count}{suffix}
      </span>
    );
  };

  return (
    <>
      <h1 className="sr-only">{headline}</h1>

      {/* Mobile Hero Section */}
      <section className="bg-transparent pt-24 pb-8 relative overflow-hidden lg:hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/40 via-transparent to-emerald-950/20" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex justify-center mb-4">
            <img
              src={logoUrl}
              alt={`${business?.title ?? 'KCROC'} Logo`}
              width="48"
              height="48"
              className="h-12 w-auto object-contain drop-shadow-xl"
            />
          </div>

          <p aria-hidden="true" className="text-white text-[28px] font-black text-center leading-[1.2]">
            {headline}
          </p>

          <p className="text-slate-400 text-base text-center leading-relaxed mt-3">
            {hero?.description ??
              'Free pickup & delivery. Expert engineer. Data-safe repairs for home and office.'}
          </p>

          <div className="flex items-center justify-center gap-1.5 mt-3 flex-wrap">
            {['Free pickup', '30-day warranty', 'No fix, no fee'].map((label) => (
              <span
                key={label}
                /* 🚀 FIX: Bumped emerald-400 to emerald-300 for perfect WCAG Contrast */
                className="text-[11px] font-semibold text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2.5 py-1"
              >
                {label}
              </span>
            ))}
          </div>

          <div className="space-y-3 mt-4">
            <Button
              size="lg"
              asChild
              className="w-full h-14 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-lg rounded-full shadow-lg min-h-[44px]"
            >
              <a
                href={`tel:+${phone}`}
                aria-label="Call Kuwait Computer Repair On Call"
                onClick={() => trackConversion('phone_call_click', { cta_name: 'hero_mobile_call', button_position: 'hero_mobile' })}
              >
                <Phone className="w-5 h-5 mr-2" aria-hidden="true" />
                Call Now
              </a>
            </Button>
            <Button
              size="lg"
              asChild
              variant="outline"
              className="w-full h-14 border-2 border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 font-bold text-lg rounded-full min-h-[44px]"
            >
              <a
                href={`https://wa.me/${phone}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Message Kuwait Computer Repair On Call on WhatsApp"
                onClick={() => trackConversion('whatsapp_click', { cta_name: 'hero_mobile_whatsapp', button_position: 'hero_mobile' })}
              >
                <MessageCircle className="w-5 h-5 mr-2" aria-hidden="true" />
                WhatsApp Us
              </a>
            </Button>
          </div>

          <p className="text-slate-400 text-sm text-center font-medium mt-3">
            {rating}★ Google rating · Trusted by {repairsStat?.value ?? '500+'} customers across Kuwait
          </p>
        </div>
      </section>

      {/* Desktop Hero Section */}
      <section className="hidden lg:block min-h-screen bg-transparent pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/30 via-transparent to-emerald-950/20" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <p aria-hidden="true" className="text-white text-4xl xl:text-5xl font-black leading-tight">
                  {headline}
                </p>
                <p className="mt-4 text-cyan-400 text-xl font-semibold">
                  {hero?.subheadline ?? "We fix the board. We don't just swap it."}
                </p>
                <p className="mt-4 text-slate-400 text-lg leading-relaxed max-w-xl">
                  {hero?.description ??
                    'We diagnose and repair failed components at board level — restoring devices that most repair shops in Kuwait would simply declare beyond repair.'}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 max-w-md">
                {stats.map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="text-2xl font-black text-white">
                      <Counter end={s.number} suffix={s.suffix} />
                    </div>
                    <div className="text-[11px] text-slate-400 uppercase tracking-wide mt-1">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  asChild
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-8 py-6 text-lg font-black rounded-full transition-all duration-300 min-h-[44px]"
                >
                  <a
                    href={`tel:+${phone}`}
                    aria-label="Call Kuwait Computer Repair On Call"
                    onClick={() => trackConversion('phone_call_click', { cta_name: 'hero_desktop_call', button_position: 'hero_desktop' })}
                  >
                    <Phone className="w-5 h-5 mr-2" aria-hidden="true" />
                    Call Now: +{phone}
                  </a>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-2 border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 px-8 py-6 text-lg font-black rounded-full min-h-[44px]"
                >
                  <Link
                    to={ROUTES.book}
                    onClick={() => trackConversion('cta_click', { cta_name: 'hero_book_pickup', button_position: 'hero_desktop' })}
                  >
                    <CalendarClock className="w-5 h-5 mr-2" aria-hidden="true" />
                    Book Pickup Now
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 rounded-3xl blur-2xl opacity-75"></div>
              <Card className="relative bg-slate-900/80 border border-slate-800 rounded-3xl backdrop-blur overflow-hidden shadow-2xl">
                <div className="aspect-[16/10] overflow-hidden bg-slate-950 relative group">
                  
                  {/* 🚀 FIX: Responsive Picture Tag with srcset.
                      This whole section is CSS-hidden below lg (1024px) via
                      the parent's `hidden lg:block`, but browsers still
                      fetch an <img> even when a display:none ancestor hides
                      it. Without a mobile-width source, phones were
                      downloading the 900w desktop photo at fetchPriority
                      "high" for an image they'd never see — stealing
                      network priority from the real above-the-fold mobile
                      content and hurting mobile LCP/FCP. The
                      (max-width: 1023px) source below routes mobile to a
                      1x1 placeholder instead. */}
                  <picture>
                    <source media="(max-width: 1023px)" srcSet="/images/home/blank.webp" />
                    <source media="(max-width: 1280px)" srcSet="/images/home/kcroc-component-level-motherboard-repair-lab-900.webp" />
                    <img 
                      src="/images/home/kcroc-component-level-motherboard-repair-lab.webp" 
                      alt="KCROC Component-Level Repair Lab in Hawalli Kuwait"
                      width="1600"
                      height="873"
                      fetchPriority="high"
                      loading="eager"
                      decoding="sync"
                      className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </picture>

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-bold text-cyan-400 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-cyan-500/20 shadow-lg">
                    <span>ESD-Safe Hawalli Laboratory</span>
                    <span className="text-emerald-400">● Live Diagnostics</span>
                  </div>
                </div>
                <CardContent className="p-8">
                  <div className="flex items-center gap-2 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current text-cyan-400" aria-hidden="true" />
                    ))}
                    <span className="text-slate-400 text-sm ml-1">
                      {rating} rated · {business?.aggregateRating?.reviewCount ?? 150}+ reviews
                    </span>
                  </div>
                  <h3 className="text-white text-xl font-bold mb-2">
                    {hero?.secondaryCTA?.text ?? 'Need a precise diagnostic?'}
                  </h3>
                  <p className="text-slate-400 text-sm mb-6">
                    Send us your device symptoms. We trace the fault at board-level — free of charge, no obligation.
                  </p>
                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-full shadow-lg"
                  >
                    <a
                      href={`https://wa.me/${phone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Message Kuwait Computer Repair On Call on WhatsApp"
                      onClick={() => trackConversion('whatsapp_click', { cta_name: 'hero_desktop_card_whatsapp', button_position: 'hero_desktop_card' })}
                    >
                      <MessageCircle className="w-5 h-5 mr-2" aria-hidden="true" />
                      Message on WhatsApp
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
