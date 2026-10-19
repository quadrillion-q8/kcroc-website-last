// File: app/frontend/src/components/home/Hero.tsx
import { Button } from '@/components/ui/button';
import { CalendarClock, Check, MessageCircle, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { KCROC_GRAPH } from '../../data/graph';
import { useAnalytics } from '../../core/analytics/AnalyticsProvider';
import { buildWhatsAppLink } from '../../utils/whatsappIntent';

export default function Hero() {
  const { trackConversion } = useAnalytics();

  const homePage = KCROC_GRAPH.pages?.find((p) => p.id === 'page-home');
  const hero = homePage?.hero;
  const business = KCROC_GRAPH.business;
  const heroWhatsAppLink = buildWhatsAppLink('Hi KCROC, I need computer repair in Kuwait. Can I get a free diagnosis and pickup?');
  const rating = business?.aggregateRating?.ratingValue;
  const googleProfileUrl = business?.socialLinks?.googleMaps;
  const headline = hero?.headline ?? "Kuwait's Expert Component-Level Repair Service.";
  const desktopImage = '/images/kcroc-laptop-repair-technicians-hawalli-kuwait.webp';
  const heroImage768 = '/images/kcroc-laptop-repair-technicians-hawalli-kuwait.w768.webp';

  return (
    <>
      {/* Mobile */}
      <section className="relative overflow-hidden lg:hidden bg-transparent pt-5 pb-8 sm:pt-7 sm:pb-10">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,rgba(201,128,77,0.18),transparent_42%)]" />
        <div className="container relative z-10 mx-auto px-4 max-w-xl">
          <div className="mb-4 flex items-center justify-center gap-2">
            <span className="kcroc-kicker">Precision repair laboratory</span>
          </div>

          <h1 className="kcroc-display text-center text-[2rem] sm:text-[2.4rem] font-black leading-[1.03] tracking-[-0.045em] text-white">
            {headline}
          </h1>

          <p className="mx-auto mt-3 max-w-lg text-center text-base sm:text-lg font-extrabold leading-snug text-cyan-300">
            {hero?.subheadline ?? "We fix the board. We don't just swap it."}
          </p>

          <p className="mx-auto mt-3 max-w-lg text-center text-sm sm:text-base leading-relaxed text-slate-300">
            {hero?.description ?? 'Free pickup and delivery across Kuwait. Diagnosis first, quote second, repair only with your approval.'}
          </p>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {['Free pickup & delivery across Kuwait', '30-day warranty', 'No fix, no fee'].map((label) => (
              <span key={label} className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/25 bg-cyan-500/10 px-3 py-1.5 text-[11px] font-bold text-cyan-200">
                <Check className="h-3.5 w-3.5 text-cyan-400" aria-hidden="true" />
                {label}
              </span>
            ))}
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2.5">
            <Button asChild size="lg" variant="ctaPrimary" className="h-14 min-w-0 w-full rounded-xl px-2 sm:px-5 text-[13px] sm:text-base">
              <Link to={ROUTES.BOOKING} onClick={() => trackConversion('cta_click', { cta_name: 'hero_mobile_book_pickup', button_position: 'hero_mobile' })}>
                <CalendarClock className="h-5 w-5" aria-hidden="true" />
                Get Free Quote
              </Link>
            </Button>
            <Button asChild size="lg" className="h-14 min-w-0 w-full rounded-xl px-2 sm:px-5 text-[13px] sm:text-base font-extrabold text-slate-950 hover:brightness-95">
              <a href={heroWhatsAppLink} target="_blank" rel="noopener noreferrer" onClick={() => trackConversion('whatsapp_click', { cta_name: 'hero_mobile_quote', button_position: 'hero_mobile' })}>
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                Book Pickup
              </a>
            </Button>
          </div>

          <div className="mt-4 flex justify-center">
            <Link
              to="/ar/computer-repair-kuwait"
              lang="ar"
              dir="rtl"
              onClick={() => trackConversion('cta_click', { cta_name: 'hero_arabic_computer_repair', button_position: 'hero_mobile' })}
              className="inline-flex min-h-11 items-center justify-center rounded-lg px-3 py-2 text-sm font-bold text-cyan-200 underline decoration-cyan-500/50 underline-offset-4 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              فني كمبيوتر في الكويت · تصليح كمبيوتر ولابتوب
            </Link>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold text-slate-300">
            <div className="flex" aria-hidden="true">{[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current text-cyan-400" />)}</div>
            {rating && googleProfileUrl ? (
              <a href={googleProfileUrl} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:text-cyan-200 hover:underline">
                {rating} Google rating · Read current reviews
              </a>
            ) : <span>Customer reviews on Google</span>}
          </div>

          <div className="kcroc-photo-frame kcroc-copper-glow mt-6 aspect-[4/3] bg-slate-900">
            <img
              src={heroImage768}
              srcSet={`${heroImage768} 768w, ${desktopImage} 1000w`}
              sizes="(max-width: 1023px) calc(100vw - 2rem), 50vw"
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
                    Get Free Repair Quote
                  </Link>
                </Button>
                <Button asChild size="lg" className="h-14 rounded-xl bg-[#25D366] px-7 text-base font-extrabold text-slate-950 hover:brightness-95">
                  <a href={heroWhatsAppLink} target="_blank" rel="noopener noreferrer" onClick={() => trackConversion('whatsapp_click', { cta_name: 'hero_desktop_quote', button_position: 'hero_desktop' })}>
                    <MessageCircle className="h-5 w-5" aria-hidden="true" />
                    Book Free Pickup
                  </a>
                </Button>
              </div>

              <div className="mt-4">
                <Link
                  to="/ar/computer-repair-kuwait"
                  lang="ar"
                  dir="rtl"
                  onClick={() => trackConversion('cta_click', { cta_name: 'hero_arabic_computer_repair', button_position: 'hero_desktop' })}
                  className="inline-flex min-h-11 items-center rounded-lg px-2 py-2 text-sm font-bold text-cyan-200 underline decoration-cyan-500/50 underline-offset-4 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  فني كمبيوتر في الكويت · تصليح كمبيوتر ولابتوب
                </Link>
              </div>

              <div className="mt-8 grid max-w-xl grid-cols-3 divide-x divide-white/10 border-y border-white/[0.10] py-5">
                {[
                  { value: 'Free', label: 'Initial diagnosis' },
                  { value: 'Quote first', label: 'Before paid work' },
                  { value: '30 days', label: 'Repair warranty' },
                ].map((item) => (
                  <div key={item.label} className="px-4 first:pl-0 last:pr-0">
                    <div className="text-lg font-black tracking-tight text-white xl:text-2xl">{item.value}</div>
                    <div className="mt-1 text-[10px] font-bold uppercase leading-tight tracking-[0.12em] text-slate-500">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-[2rem] bg-[#c9804d]/[0.06] blur-3xl" />
              <div className="relative">
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
                  <div className="absolute inset-x-5 bottom-5 z-10 rounded-2xl border border-white/[0.08] bg-[#0b1113]/[0.84] p-4">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#dfa86f]">KCROC Hawalli Laboratory</p>
                        <p className="mt-1 text-lg font-black text-white">Board repair. Microsoldering. Precision diagnostics.</p>
                      </div>
                      <div className="hidden shrink-0 text-right sm:block">
                        <div className="flex justify-end" aria-hidden="true">{[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current text-cyan-400" />)}</div>
                        {rating && googleProfileUrl ? (
                          <a href={googleProfileUrl} target="_blank" rel="noopener noreferrer" className="mt-1 block text-[11px] font-semibold text-slate-400 hover:text-cyan-300">{rating} Google rating · View reviews</a>
                        ) : <p className="mt-1 text-[11px] font-semibold text-slate-400">Customer reviews</p>}
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

                <Link to="/case-studies" className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-[#efc19c] hover:text-white transition-colors">
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
