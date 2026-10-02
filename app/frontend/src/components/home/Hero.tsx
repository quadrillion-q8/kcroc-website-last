// File: app/frontend/src/components/home/Hero.tsx
import { Button } from '@/components/ui/button';
import { CalendarClock, Check, MessageCircle, ShieldCheck, Star, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
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
  const phone = business!.telephone;
  const rating = business!.aggregateRating!.ratingValue;
  const reviewCount = business?.aggregateRating?.reviewCount ?? 150;
  const headline = hero?.headline ?? "Kuwait's Expert Component-Level Repair Service.";
  const desktopImage = '/images/kcroc-laptop-repair-technicians-hawalli-kuwait.webp';
  const heroImage768 = '/images/kcroc-laptop-repair-technicians-hawalli-kuwait.w768.webp';

  useEffect(() => {
    const loadingTimer = setTimeout(() => setStatsLoading(false), 500);
    const animationTimer = setTimeout(() => setStatsAnimated(true), 700);
    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(animationTimer);
    };
  }, []);

  const stats = [
    { number: 500, suffix: '+', label: 'repairs completed' },
    { number: 98, suffix: '%', label: 'success rate' },
    { number: 30, suffix: ' days', label: 'parts + labour warranty' },
  ];

  const Counter = ({ end, suffix = '', duration = 1300 }: { end: number; suffix?: string; duration?: number }) => {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
      if (!statsAnimated || hasAnimated || statsLoading) return;
      setHasAnimated(true);
      let startTime = 0;
      const animate = (time: number) => {
        if (!startTime) startTime = time;
        const progress = Math.min((time - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) requestAnimationFrame(animate);
        else setCount(end);
      };
      requestAnimationFrame(animate);
    }, [statsAnimated, hasAnimated, statsLoading, end, duration]);

    if (statsLoading) return <span>—</span>;
    return <span>{count}{suffix}</span>;
  };

  return (
    <>
      {/* Mobile */}
      <section className="relative overflow-hidden lg:hidden bg-transparent pt-5 pb-8 sm:pt-7 sm:pb-10">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(201,128,77,0.18),transparent_42%)]" />
        <div className="container relative z-10 mx-auto px-4 max-w-xl">
          <div className="mb-4 flex items-center justify-center gap-2">
            <span className="kcroc-kicker">Precision repair laboratory</span>
          </div>

          <div role="heading" aria-level={1} className="kcroc-display text-center text-[2rem] sm:text-[2.4rem] font-black leading-[1.03] tracking-[-0.045em] text-white">
            {headline}
          </div>

          <p className="mx-auto mt-3 max-w-lg text-center text-base sm:text-lg font-extrabold leading-snug text-cyan-300">
            {hero?.subheadline ?? "We fix the board. We don't just swap it."}
          </p>

          <p className="mx-auto mt-3 max-w-lg text-center text-sm sm:text-base leading-relaxed text-slate-300">
            {hero?.description ?? 'Free pickup and delivery across Kuwait. Diagnosis first, quote second, repair only with your approval.'}
          </p>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {['Free pickup', '30-day warranty', 'No fix, no fee'].map((label) => (
              <span key={label} className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/25 bg-cyan-500/10 px-3 py-1.5 text-[11px] font-bold text-cyan-200">
                <Check className="h-3.5 w-3.5 text-cyan-400" aria-hidden="true" />
                {label}
              </span>
            ))}
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2.5">
            <Button asChild size="lg" variant="ctaPrimary" className="h-14 w-full rounded-xl text-sm sm:text-base">
              <Link to={ROUTES.BOOKING} onClick={() => trackConversion('cta_click', { cta_name: 'hero_mobile_book_pickup', button_position: 'hero_mobile' })}>
                <CalendarClock className="h-5 w-5" aria-hidden="true" />
                Book Pickup
              </Link>
            </Button>
            <Button asChild size="lg" className="h-14 w-full rounded-xl bg-[#25D366] font-extrabold text-slate-950 hover:brightness-95 whatsapp-pulse">
              <a href={`https://wa.me/${phone}`} target="_blank" rel="noopener noreferrer" onClick={() => trackConversion('whatsapp_click', { cta_name: 'hero_mobile_whatsapp', button_position: 'hero_mobile' })}>
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                WhatsApp
              </a>
            </Button>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold text-slate-300">
            <div className="flex" aria-hidden="true">{[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current text-cyan-400" />)}</div>
            <span>{rating} Google rating · {reviewCount}+ reviews</span>
          </div>

          <div className="kcroc-photo-frame kcroc-copper-glow mt-6 aspect-[4/3] bg-slate-900">
            <img
              src={heroImage768}
              srcSet={`${heroImage768} 768w, ${desktopImage} 1000w`}
              sizes="(max-width: 1023px) 100vw, 50vw"
              alt="KCROC technician working on a laptop in the Hawalli repair laboratory"
              width="1000"
              height="1000"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-x-3 bottom-3 z-10 flex items-center justify-between rounded-xl border border-white/[0.10] bg-black/[0.45] px-3 py-2 backdrop-blur-md">
              <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-white">Hawalli workshop</span>
              <span className="text-[10px] font-bold text-cyan-300">Open 10 AM–10 PM</span>
            </div>
          </div>
        </div>
      </section>

      {/* Desktop */}
      <section className="relative hidden min-h-[calc(100vh-70px)] overflow-hidden bg-transparent pt-20 pb-14 lg:block">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_15%_20%,rgba(201,128,77,0.13),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(223,170,98,0.08),transparent_26%)]" />
        <div className="container relative z-10 mx-auto px-4 lg:px-8">
          <div className="grid items-center gap-12 xl:grid-cols-[0.98fr_1.02fr] 2xl:gap-16">
            <div className="max-w-2xl">
              <div className="mb-6 flex items-center gap-3">
                <span className="kcroc-kicker">Kuwait · Component-level specialists</span>
              </div>

              <h1 className="kcroc-display max-w-2xl text-[3.3rem] font-black leading-[1.01] tracking-[-0.045em] text-white xl:text-[3.85rem] 2xl:text-[4.25rem]">
                {headline}
              </h1>

              <p className="mt-5 max-w-xl text-[1.7rem] font-extrabold leading-tight text-cyan-300">
                {hero?.subheadline ?? "We fix the board. We don't just swap it."}
              </p>

              <p className="mt-4 max-w-xl text-[1.05rem] leading-7 text-slate-300">
                {hero?.description ?? 'We diagnose failed components at board level and restore devices that other repair shops may write off as uneconomical to repair.'}
              </p>

              <div className="mt-6 flex flex-wrap gap-2.5">
                {['Free pickup & delivery', '30-day parts + labour warranty', 'No fix, no fee'].map((label) => (
                  <span key={label} className="inline-flex items-center gap-2 rounded-full border border-white/[0.10] bg-white/[0.035] px-3.5 py-2 text-xs font-bold text-slate-200">
                    <Check className="h-4 w-4 text-cyan-400" aria-hidden="true" />
                    {label}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3.5">
                <Button asChild size="lg" variant="ctaPrimary" className="h-14 rounded-xl px-7 text-base">
                  <Link to={ROUTES.BOOKING} onClick={() => trackConversion('cta_click', { cta_name: 'hero_book_pickup', button_position: 'hero_desktop' })}>
                    <CalendarClock className="h-5 w-5" aria-hidden="true" />
                    Book Free Pickup
                  </Link>
                </Button>
                <Button asChild size="lg" className="h-14 rounded-xl bg-[#25D366] px-7 text-base font-extrabold text-slate-950 hover:brightness-95 whatsapp-pulse">
                  <a href={`https://wa.me/${phone}`} target="_blank" rel="noopener noreferrer" onClick={() => trackConversion('whatsapp_click', { cta_name: 'hero_desktop_whatsapp', button_position: 'hero_desktop' })}>
                    <MessageCircle className="h-5 w-5" aria-hidden="true" />
                    WhatsApp a Technician
                  </a>
                </Button>
              </div>

              <div className="mt-8 grid max-w-xl grid-cols-3 divide-x divide-white/10 border-y border-white/[0.10] py-5">
                {stats.map((stat) => (
                  <div key={stat.label} className="px-4 first:pl-0 last:pr-0">
                    <div className="text-2xl font-black tracking-tight text-white xl:text-3xl">
                      <Counter end={stat.number} suffix={stat.suffix} />
                    </div>
                    <div className="mt-1 text-[10px] font-bold uppercase leading-tight tracking-[0.12em] text-slate-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-8 rounded-[2rem] bg-cyan-500/10 blur-3xl" />
              <div className="relative">
                <div className="absolute -right-5 -top-5 z-20 flex max-w-xs items-center gap-3 rounded-[16px] border border-white/[0.10] bg-[#0f1618]/[0.90] px-4 py-3 shadow-2xl backdrop-blur-xl">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-cyan-500/10 text-cyan-300">
                    <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.12em] text-white">Diagnosis first</p>
                    <p className="mt-0.5 text-[11px] text-slate-400">Repair only after approval</p>
                  </div>
                </div>

                <div className="kcroc-photo-frame kcroc-copper-glow aspect-[4/3] bg-slate-900">
                  <img
                    src={heroImage768}
                    srcSet={`${heroImage768} 768w, ${desktopImage} 1000w`}
                    sizes="(min-width: 1280px) 50vw, 52vw"
                    alt="KCROC technicians working in the Hawalli computer repair workshop"
                    width="1000"
                    height="1000"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    className="h-full w-full object-cover object-center transition-transform duration-500 hover:scale-[1.015]"
                  />
                  <div className="absolute inset-x-5 bottom-5 z-10 rounded-2xl border border-white/[0.10] bg-[#0b1113]/[0.78] p-4 backdrop-blur-xl">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.16em] text-cyan-300">KCROC Hawalli Laboratory</p>
                        <p className="mt-1 text-lg font-black text-white">Board repair. Microsoldering. Precision diagnostics.</p>
                      </div>
                      <div className="hidden shrink-0 text-right sm:block">
                        <div className="flex justify-end" aria-hidden="true">{[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current text-cyan-400" />)}</div>
                        <p className="mt-1 text-[11px] font-semibold text-slate-400">{rating} · {reviewCount}+ reviews</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3">
                  {[
                    { label: 'ESD-safe lab', value: 'Precision work' },
                    { label: 'Pickup', value: 'Across Kuwait' },
                    { label: 'Warranty', value: '30 days' },
                  ].map((item) => (
                    <div key={item.label} className="rounded-[14px] border border-white/[0.075] bg-white/[0.028] px-3 py-3 text-center">
                      <p className="text-[9px] font-black uppercase tracking-[0.13em] text-slate-500">{item.label}</p>
                      <p className="mt-1 text-xs font-bold text-slate-200">{item.value}</p>
                    </div>
                  ))}
                </div>

                <Link to="/case-studies" className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-cyan-300 hover:text-cyan-200 transition-colors">
                  See real repair case studies <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
