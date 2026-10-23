// File: app/frontend/src/components/home/Hero.tsx
import { Button } from '@/components/ui/button';
import { CalendarClock, Check, MessageCircle, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { KCROC_GRAPH } from '../../data/graph';
import { useAnalytics } from '../../core/analytics/AnalyticsProvider';
import { buildWhatsAppLink } from '../../utils/whatsappIntent';

const TRUST_CHIPS = [
  'Free pick-up & drop across all Kuwait governorates',
  '30-day parts + labour warranty',
  'No fix, no fee',
];

const DESKTOP_FACTS = [
  { value: 'Free', label: 'Initial diagnosis' },
  { value: 'Quote first', label: 'Before paid work' },
  { value: '30 days', label: 'Repair warranty' },
];

const LAB_FACTS = [
  { label: 'ESD-safe lab', value: 'Precision work' },
  { label: 'Pickup', value: 'Across Kuwait' },
  { label: 'Warranty', value: '30 days' },
];

/**
 * Homepage hero — rendered ONCE.
 *
 * Previously this file shipped two complete <section> trees (mobile + desktop)
 * toggled with `lg:hidden` / `hidden lg:block`. Both were always in the DOM, so
 * the page had two <h1>s, two eager high-priority hero images and duplicated
 * trust/CTA blocks. Now there is a single tree and only presentation changes
 * per breakpoint; the few desktop-only extras use `hidden lg:*` utilities.
 */
export default function Hero() {
  const { trackConversion } = useAnalytics();

  const homePage = KCROC_GRAPH.pages?.find((p) => p.id === 'page-home');
  const hero = homePage?.hero;
  const business = KCROC_GRAPH.business;
  const heroWhatsAppLink = buildWhatsAppLink('Hi KCROC, I need computer repair in Kuwait. Can I get a free diagnosis and pickup?');
  const rating = business?.aggregateRating?.ratingValue;
  const googleProfileUrl = business?.socialLinks?.googleMaps;
  const headline = hero?.headline ?? "Kuwait's Expert Component-Level Repair Service.";
  const desktopImage = '/images/kcroc-pc-doctor-windows-repair-services.webp';
  const heroImage768 = '/images/kcroc-pc-doctor-windows-repair-services.w768.webp';

  return (
    <section
      aria-labelledby="home-hero-heading"
      className="relative overflow-hidden bg-transparent pt-5 pb-8 sm:pt-7 sm:pb-10 lg:flex lg:min-h-[calc(100vh-70px)] lg:items-center lg:pt-20 lg:pb-14"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(201,128,77,0.18),transparent_42%)] lg:bg-[radial-gradient(circle_at_15%_20%,rgba(201,128,77,0.13),transparent_32%),radial-gradient(circle_at_86%_18%,rgba(223,170,98,0.08),transparent_26%)]"
      />

      <div className="container relative z-10 mx-auto w-full max-w-xl px-4 lg:max-w-none lg:px-8">
        <div className="grid items-center gap-6 lg:gap-12 xl:grid-cols-[0.98fr_1.02fr] 2xl:gap-16">
          {/* ── Copy column ───────────────────────────────────────────── */}
          <div className="min-w-0 text-center lg:max-w-2xl lg:text-start">
            <div className="mb-4 flex items-center justify-center lg:mb-6 lg:justify-start">
              <span className="kcroc-kicker">
                <span className="lg:hidden">Precision repair laboratory</span>
                <span className="hidden lg:inline">Kuwait · Component-level specialists</span>
              </span>
            </div>

            <h1 id="home-hero-heading"
              className="kcroc-display max-w-2xl text-[2rem] font-black leading-[1.03] tracking-[-0.045em] text-white sm:text-[2.4rem] lg:text-[3.3rem] lg:leading-[1.01] xl:text-[3.85rem] 2xl:text-[4.25rem]"
            >
              {headline}
            </h1>

            <p className="mx-auto mt-3 max-w-lg text-base font-extrabold leading-snug text-cyan-300 sm:text-lg lg:mx-0 lg:mt-5 lg:max-w-xl lg:text-[1.7rem] lg:leading-tight">
              {hero?.subheadline ?? "We fix the board. We don't just swap it."}
            </p>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-slate-300 sm:text-base lg:mx-0 lg:mt-4 lg:max-w-xl lg:text-[1.05rem] lg:leading-7">
              {hero?.description ?? 'Free pickup and delivery across Kuwait. Diagnosis first, quote second, repair only with your approval.'}
            </p>

            <ul className="mt-4 flex flex-wrap justify-center gap-2 lg:mt-6 lg:justify-start lg:gap-2.5">
              {TRUST_CHIPS.map((label) => (
                <li
                  key={label}
                  className="inline-flex min-h-10 items-center gap-1.5 rounded-lg border border-white/[0.12] bg-white/[0.04] px-3 py-1.5 text-[11px] font-bold text-[#D4DBDE] lg:gap-2 lg:px-3.5 lg:py-2 lg:text-xs"
                >
                  <Check className="h-3.5 w-3.5 shrink-0 text-[#AAB5B9] lg:h-4 lg:w-4" aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>

            <div className="mt-5 grid grid-cols-2 gap-2.5 lg:mt-8 lg:flex lg:flex-wrap lg:gap-3.5">
              <Button asChild size="lg" variant="ctaPrimary" className="h-14 w-full min-w-0 rounded-xl px-2 text-[13px] sm:px-5 sm:text-base lg:w-auto lg:px-7">
                <Link
                  to={ROUTES.BOOKING}
                  onClick={() => trackConversion('cta_click', { cta_name: 'hero_book_pickup', button_position: 'hero' })}
                >
                  <CalendarClock className="h-5 w-5" aria-hidden="true" />
                  Get Free Quote
                </Link>
              </Button>
              <Button asChild size="lg" className="h-14 w-full min-w-0 rounded-xl bg-[#25D366] px-2 text-[13px] font-extrabold text-[#062B15] hover:bg-[#4AE487] sm:px-5 sm:text-base lg:w-auto lg:px-7">
                <a
                  href={heroWhatsAppLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackConversion('whatsapp_click', { cta_name: 'hero_quote', button_position: 'hero' })}
                >
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  Book Pickup
                </a>
              </Button>
            </div>

            {/* Arabic entry point: isolated RTL inline context inside the LTR flow */}
            <div className="mt-4 flex justify-center lg:justify-start">
              <Link
                to="/ar/computer-repair-kuwait"
                lang="ar"
                dir="rtl"
                onClick={() => trackConversion('cta_click', { cta_name: 'hero_arabic_computer_repair', button_position: 'hero' })}
                className="inline-flex min-h-12 max-w-full items-center justify-center rounded-lg px-3 py-2 text-center text-sm font-bold text-[#D4DBDE] underline decoration-white/35 underline-offset-4 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#dfa86f]"
              >
                فني كمبيوتر في الكويت · تصليح كمبيوتر ولابتوب
              </Link>
            </div>

            {/* Rating line below xl (xl+ shows it inside the photo card) */}
            <div className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold text-slate-300 xl:hidden">
              <div className="flex" aria-hidden="true">{[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current text-cyan-400" />)}</div>
              {rating && googleProfileUrl ? (
                <a href={googleProfileUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center underline-offset-4 hover:text-cyan-200 hover:underline">
                  {rating} Google rating · Read current reviews
                </a>
              ) : <span>Customer reviews on Google</span>}
            </div>

            {/* Desktop-only fact strip */}
            <dl className="mt-8 hidden max-w-xl grid-cols-3 divide-x divide-white/10 border-y border-white/[0.10] py-5 text-start lg:grid">
              {DESKTOP_FACTS.map((item) => (
                <div key={item.label} className="flex flex-col-reverse px-4 first:ps-0 last:pe-0">
                  <dt className="mt-1 text-[10px] font-bold uppercase leading-tight tracking-[0.12em] text-slate-400">{item.label}</dt>
                  <dd className="text-lg font-black tracking-tight text-white xl:text-2xl">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* ── Media column (single <img>, shared by every breakpoint) ── */}
          <div className="relative mt-2 min-w-0 lg:mt-0">
            <div aria-hidden="true" className="absolute -inset-4 hidden rounded-[2rem] bg-[#c9804d]/[0.06] blur-3xl lg:block" />
            <div className="relative">
              <figure className="kcroc-photo-frame kcroc-copper-glow relative aspect-[4/3] bg-slate-900">
                <img
                  src={heroImage768}
                  srcSet={`${heroImage768} 768w, ${desktopImage} 1000w`}
                  sizes="(max-width: 1023px) calc(100vw - 2rem), 50vw"
                  alt="KCROC technicians working on a laptop in the Hawalli computer repair workshop"
                  width="1000"
                  height="1000"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="h-full w-full object-cover object-center lg:transition-transform lg:duration-500 lg:hover:scale-[1.015]"
                />
                <figcaption className="absolute inset-x-3 bottom-3 z-10 flex items-center justify-between gap-3 rounded-xl border border-white/[0.10] bg-black/[0.55] px-3 py-2 backdrop-blur-md lg:inset-x-5 lg:bottom-5 lg:rounded-2xl lg:bg-[#0b1113]/[0.88] lg:p-4">
                  {/* mobile caption */}
                  <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-white lg:hidden">Hawalli workshop</span>
                  <span className="text-[10px] font-bold text-cyan-300 lg:hidden">Open 10 AM–10 PM</span>
                  {/* desktop caption */}
                  <span className="hidden min-w-0 lg:block">
                    <span className="block text-[10px] font-black uppercase tracking-[0.16em] text-[#dfa86f]">KCROC Hawalli Laboratory</span>
                    <span className="mt-1 block text-lg font-black text-white">Board repair. Microsoldering. Precision diagnostics.</span>
                  </span>
                  <span className="hidden shrink-0 text-right xl:block">
                    <span className="flex justify-end" aria-hidden="true">{[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current text-cyan-400" />)}</span>
                    {rating && googleProfileUrl ? (
                      <a href={googleProfileUrl} target="_blank" rel="noopener noreferrer" className="mt-1 flex min-h-12 items-center justify-end text-xs font-semibold text-[#C4CDD1] hover:text-white">{rating} Google rating · View reviews</a>
                    ) : <span className="mt-1 block text-[11px] font-semibold text-slate-300">Customer reviews</span>}
                  </span>
                </figcaption>
              </figure>

              <div className="mt-4 hidden grid-cols-3 gap-3 lg:grid">
                {LAB_FACTS.map((item) => (
                  <div key={item.label} className="rounded-[14px] border border-white/[0.075] bg-white/[0.028] px-3 py-3 text-center">
                    <p className="text-[9px] font-black uppercase tracking-[0.13em] text-slate-400">{item.label}</p>
                    <p className="mt-1 text-xs font-bold text-slate-200">{item.value}</p>
                  </div>
                ))}
              </div>

              <Link to="/gallery" className="mt-4 hidden min-h-12 items-center gap-2 text-sm font-extrabold text-[#D4DBDE] transition-colors hover:text-white lg:inline-flex">
                Explore our repair gallery <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
