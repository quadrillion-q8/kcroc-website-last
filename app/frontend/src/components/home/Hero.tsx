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
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, [end, duration, statsAnimated, hasAnimated, statsLoading]);

    if (statsLoading) {
      return <span className="counter loading-state">--</span>;
    }
    return (
      <span className="counter">
        {count}
        {suffix}
      </span>
    );
  };

  return (
    <>
      {/* Mobile Hero Section */}
      <section className="min-h-screen bg-transparent pt-20 pb-16 relative overflow-hidden lg:hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/40 via-transparent to-emerald-950/20" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex justify-center mb-6">
            <img
              src={logoUrl}
              alt={`${business?.title ?? 'KCROC'} Logo`}
              className="h-16 w-auto object-contain drop-shadow-xl"
            />
          </div>

          <h1 className="text-white text-2xl font-black text-center leading-tight mt-4 mb-2">
            {hero?.headline ?? "Kuwait's Expert Component-Level Repair Service."}
          </h1>

          <p className="text-slate-400 text-base text-center leading-relaxed mb-5">
            {hero?.description ??
              'Free pickup & delivery. Expert engineer. Data-safe repairs for home and office.'}
          </p>

          <div className="space-y-3 mb-3">
            <Button
              size="lg"
              asChild
              className="w-full h-14 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-lg rounded-full shadow-lg min-h-[44px]"
            >
              <a
                href={`tel:+${phone}`}
                onClick={() =>
                  trackConversion('phone_call_click', {
                    cta_name: 'hero_mobile_call',
                    button_position: 'hero_mobile',
                  })
                }
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Now
              </a>
            </Button>
            <Button
              size="lg"
              asChild
              className="w-full h-14 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-lg rounded-full shadow-lg min-h-[44px]"
            >
              <a
                href={`https://wa.me/${phone}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackConversion('whatsapp_click', {
                    cta_name: 'hero_mobile_whatsapp',
                    button_position: 'hero_mobile',
                  })
                }
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp Us
              </a>
            </Button>
          </div>

          <p className="text-slate-500 text-sm text-center font-medium mt-3 mb-6">
            {rating}★ Google rating · Trusted by {repairsStat?.value ?? '500+'} customers across Kuwait
          </p>
        </div>
      </section>

      {/* Desktop Hero Section */}
      <section className="hidden lg:block min-h-screen bg-transparent pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/30 via-transparent to-emerald-950/20" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div>
                <h1 className="text-white text-4xl xl:text-5xl font-black leading-tight">
                  {hero?.headline ?? "Kuwait's Expert Component-Level Repair Service."}
                </h1>
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
                    <div className="text-[11px] text-slate-500 uppercase tracking-wide mt-1">
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
                    onClick={() =>
                      trackConversion('phone_call_click', {
                        cta_name: 'hero_desktop_call',
                        button_position: 'hero_desktop',
                      })
                    }
                  >
                    <Phone className="w-5 h-5 mr-2" />
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
                    onClick={() =>
                      trackConversion('cta_click', {
                        cta_name: 'hero_book_pickup',
                        button_position: 'hero_desktop',
                      })
                    }
                  >
                    <CalendarClock className="w-5 h-5 mr-2" />
                    Book Pickup Now
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right Content */}
            <div>
              <Card className="bg-slate-900/40 border border-slate-800 rounded-3xl backdrop-blur">
                <CardContent className="p-8">
                  <div className="flex items-center gap-2 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current text-cyan-400" />
                    ))}
                    <span className="text-slate-400 text-sm ml-1">
                      {rating} rated · {business?.aggregateRating?.reviewCount ?? 150}+ reviews
                    </span>
                  </div>
                  <h3 className="text-white text-xl font-bold mb-2">
                    {hero?.secondaryCTA?.text ?? 'Need a precise diagnostic?'}
                  </h3>
                  <p className="text-slate-400 text-sm mb-6">
                    Send us your device symptoms. We trace the fault — free of charge, no obligation.
                  </p>
                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-full"
                  >
                    <a
                      href={`https://wa.me/${phone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackConversion('whatsapp_click', {
                          cta_name: 'hero_desktop_card_whatsapp',
                          button_position: 'hero_desktop_card',
                        })
                      }
                    >
                      <MessageCircle className="w-5 h-5 mr-2" />
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
