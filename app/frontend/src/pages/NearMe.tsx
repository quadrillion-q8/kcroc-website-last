// File: app/frontend/src/pages/NearMe.tsx
// Local-intent hub for searches such as "computer repair near me", "local
// computer repair", "reliable computer technician near me", and related
// Kuwait service-intent variations. This is intentionally one strong hub —
// not a collection of doorway pages for every keyword variation.
import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin, Truck, ShieldCheck, Wrench, Laptop, Monitor, Cpu, Apple,
  Gamepad2, CheckCircle2, ArrowRight, MessageCircle, Star, Home as HomeIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SEOEngine } from '../core/components/SEOEngine';
import { KCROC_GRAPH } from '../data/graph';
import { IMAGES } from '../constants/images';

const SERVICE_ICONS: Record<string, React.ElementType> = {
  'laptop-repair-kuwait': Laptop,
  'macbook-repair-kuwait': Apple,
  'gaming-pc-repair-kuwait': Gamepad2,
  'motherboard-repair-kuwait': Cpu,
  'laptop-screen-repair-kuwait': Monitor,
};

export default function NearMe() {
  const business = KCROC_GRAPH.business;
  const page = KCROC_GRAPH.pages.find((p) => p.id === 'page-near-me');
  const locations = KCROC_GRAPH.locations
    .filter((location) => location.isActive)
    .sort((a, b) => (b.navigationPriority ?? 0) - (a.navigationPriority ?? 0));
  const services = KCROC_GRAPH.services.filter((service) => service.isActive);
  const usps = KCROC_GRAPH.usps.filter((usp) => ['usp-logistics', 'usp-component', 'usp-nofix', 'usp-privacy'].includes(usp.id));
  const faqs = (page?.featuredFAQIds ?? [])
    .map((id) => KCROC_GRAPH.faqs.find((faq) => faq.id === id))
    .filter(Boolean);

  if (!business || !page) return null;

  const phone = business.telephone;
  const waLink = `https://wa.me/${phone}?text=${encodeURIComponent('Hi KCROC, I am looking for computer repair near me in Kuwait. I would like to arrange a pickup.')}`;

  return (
    <div className="w-full min-h-screen bg-transparent text-slate-200">
      <SEOEngine entityId="page-near-me" />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-800 px-4 pb-14 pt-10 sm:px-6 sm:pb-24 sm:pt-16 lg:pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_15%,rgba(34,211,238,0.10),transparent_45%)]" />
        <div className="relative z-10 mx-auto max-w-6xl">
          <nav aria-label="Breadcrumb" className="mb-8 text-xs font-medium text-slate-400 sm:text-sm">
            <ol className="flex items-center gap-2">
              <li><Link to="/" className="hover:text-cyan-400">Home</Link></li>
              <li className="text-slate-600">/</li>
              <li aria-current="page" className="text-cyan-400">Computer Repair Near Me</li>
            </ol>
          </nav>

          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_.85fr] lg:gap-14">
            <div className="max-w-3xl">
              <Badge className="mb-5 border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-cyan-400">
                <MapPin className="mr-2 inline h-3.5 w-3.5" aria-hidden="true" /> Local Kuwait Computer Repair
              </Badge>
              <h1 className="text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Computer Repair Near Me in <span className="text-cyan-400">Kuwait</span>
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
                Looking for a reliable computer repair technician near you? KCROC repairs laptops, PCs, MacBooks, gaming systems and motherboards from our Hawalli lab, with free pickup and delivery across Kuwait.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="w-full bg-cyan-500 font-black text-slate-950 hover:bg-cyan-400 sm:w-auto" asChild>
                  <Link to="/book"><Truck className="mr-2 h-5 w-5" aria-hidden="true" /> Book Free Pickup</Link>
                </Button>
                <Button size="lg" variant="outline" className="w-full border-slate-700 text-white hover:bg-slate-800 sm:w-auto" asChild>
                  <a href={waLink} target="_blank" rel="noopener noreferrer"><MessageCircle className="mr-2 h-5 w-5" aria-hidden="true" /> WhatsApp a Technician</a>
                </Button>
              </div>
              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-400">
                <span className="inline-flex items-center gap-1.5"><Star className="h-4 w-4 fill-current text-amber-400" aria-hidden="true" /> {business.aggregateRating.ratingValue}★ rated</span>
                <span>{business.aggregateRating.reviewCount}+ reviews</span>
                <span>Free pickup & delivery</span>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">
              <img
                src={IMAGES.brand.technicians.src}
                alt="KCROC technicians working on computer repairs in Hawalli, Kuwait"
                width={IMAGES.brand.technicians.width}
                height={IMAGES.brand.technicians.height}
                loading="eager"
                className="h-72 w-full object-cover sm:h-80"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent px-5 pb-5 pt-16">
                <p className="text-sm font-bold text-white">Central Hawalli repair lab</p>
                <p className="mt-1 text-xs text-slate-300">Devices collected locally are diagnosed and repaired at our workshop.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust / service model */}
      <section className="border-b border-slate-800/60 px-4 py-12 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-cyan-400">Local service, real repair capability</p>
            <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">A nearby technician without the hassle of finding a shop</h2>
            <p className="mt-4 leading-relaxed text-slate-400">If you are searching for a computer repair service near you, the most useful question is not simply how close the shop is. It is whether the technician can diagnose the actual fault, explain the repair, and make the logistics easy.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {usps.map((usp) => (
              <div key={usp.id} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-slate-700 bg-slate-950 text-cyan-400"><ShieldCheck className="h-5 w-5" aria-hidden="true" /></div>
                <h3 className="font-bold text-white">{usp.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{usp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Area selector */}
      <section className="border-b border-slate-800/60 bg-slate-900/30 px-4 py-12 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-cyan-400">Find your service area</p>
            <h2 className="text-3xl font-black text-white sm:text-4xl">Computer Repair Near You</h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-400">Choose your area to see the local service details, nearby districts, available repairs and pickup information.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {locations.map((location) => (
              <Link key={location.id} to={`/location/${location.slug}`} className="group rounded-2xl border border-slate-800 bg-slate-950/70 p-5 transition hover:border-cyan-500/50 hover:bg-slate-900">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-cyan-400"><MapPin className="h-4 w-4" aria-hidden="true" /><span className="text-xs font-bold uppercase tracking-wider">Service Area</span></div>
                    <h3 className="mt-2 text-xl font-black text-white">Computer Repair {location.title}</h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-400">{location.description}</p>
                  </div>
                  <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-slate-600 transition group-hover:translate-x-1 group-hover:text-cyan-400" aria-hidden="true" />
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {location.serviceAreas.slice(0, 4).map((area) => <span key={area} className="rounded-lg border border-slate-800 bg-slate-900 px-2.5 py-1 text-xs text-slate-300">{area}</span>)}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="px-4 py-12 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-cyan-400">What we repair</p>
              <h2 className="text-3xl font-black text-white sm:text-4xl">Computer & Laptop Repair Services</h2>
            </div>
            <Link to="/services" className="inline-flex items-center text-sm font-bold text-cyan-400 hover:text-cyan-300">View all services <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" /></Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = SERVICE_ICONS[service.slug] ?? Wrench;
              return <Link key={service.id} to={`/${service.slug}`} className="group rounded-2xl border border-slate-800 bg-slate-900/40 p-5 transition hover:border-cyan-500/40 hover:bg-slate-900">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-700 bg-slate-950 text-cyan-400"><Icon className="h-5 w-5" aria-hidden="true" /></div>
                  <div><h3 className="font-bold text-white group-hover:text-cyan-300">{service.title}</h3><p className="mt-1 text-sm leading-relaxed text-slate-400">{service.description}</p></div>
                </div>
              </Link>;
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-slate-800/60 bg-slate-900/40 px-4 py-12 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-3xl">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-cyan-400">Simple local logistics</p>
            <h2 className="text-3xl font-black text-white sm:text-4xl">How Computer Repair Near You Works</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              ['1', 'Tell us what is wrong', 'Message KCROC with your area, device and symptoms. We help identify the right next step.'],
              ['2', 'We collect your device', 'Arrange a pickup from your home or office across Kuwait. Your device comes to the Hawalli lab for proper diagnosis.'],
              ['3', 'Repair, test and return', 'We diagnose the fault, explain the repair, complete the approved work, test the device and arrange its return.'],
            ].map(([number, title, text]) => <div key={number} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-6"><div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500 font-black text-slate-950">{number}</div><h3 className="text-lg font-bold text-white">{title}</h3><p className="mt-2 text-sm leading-relaxed text-slate-400">{text}</p></div>)}
          </div>
        </div>
      </section>

      {/* Problems / intent expansion */}
      <section className="px-4 py-12 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-cyan-400">Common reasons customers search nearby</p>
              <h2 className="text-3xl font-black text-white sm:text-4xl">Whatever the symptom, start with the diagnosis</h2>
              <p className="mt-4 leading-relaxed text-slate-400">A local search may start with a symptom rather than a service name. KCROC can assess common hardware and software problems and route the repair to the appropriate service.</p>
              <div className="mt-6"><Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800" asChild><Link to="/problems">Browse Common Problems <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {KCROC_GRAPH.problems.slice(0, 10).map((problem) => <Link key={problem.id} to={`/${problem.slug}`} className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/50 p-4 text-sm font-semibold text-slate-200 transition hover:border-cyan-500/40 hover:text-cyan-300"><CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-400" aria-hidden="true" />{problem.title}</Link>)}
            </div>
          </div>
        </div>
      </section>

      {/* Arabic local-intent section */}
      <section lang="ar" dir="rtl" className="border-t border-slate-800/60 px-4 py-12 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-5xl rounded-3xl border border-slate-800 bg-slate-950/60 p-6 sm:p-10">
          <p className="text-xs font-bold uppercase tracking-widest text-cyan-400">خدمة إصلاح محلية في الكويت</p>
          <h2 className="mt-2 text-3xl font-black text-white sm:text-4xl">فني كمبيوتر في الكويت وإصلاح لابتوب قريب منك</h2>
          <p className="mt-5 max-w-3xl text-base leading-loose text-slate-300">
            هل تبحث عن فني كمبيوتر أو محل تصليح لابتوب قريب منك؟ توفر KCROC إصلاح الكمبيوتر واللابتوب والـ MacBook وأجهزة الألعاب في الكويت، مع استلام وتوصيل مجاني من المنزل أو المكتب. يتم فحص الجهاز وإجراء الإصلاح في مختبرنا المركزي في حولي، مع توضيح العطل والتكلفة قبل تنفيذ الإصلاح.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <h3 className="font-bold text-white">فني كمبيوتر</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-400">تشخيص أعطال الكمبيوتر واللابتوب وإصلاح الأعطال الهاردوير واللوحة الأم عند الحاجة.</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <h3 className="font-bold text-white">استلام من المنزل</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-400">حدد منطقتك في الكويت وسننسق استلام الجهاز ونقله إلى مختبر حولي.</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
              <h3 className="font-bold text-white">إصلاح لابتوب</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-400">إصلاح الشاشات والبطاريات والشحن والتبريد واللوحات الأم للعديد من الماركات.</p>
            </div>
          </div>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-row-reverse sm:justify-start">
            <Button size="lg" className="bg-cyan-500 font-black text-slate-950 hover:bg-cyan-400" asChild>
              <a href={waLink} target="_blank" rel="noopener noreferrer">تواصل مع فني عبر واتساب</a>
            </Button>
            <Button size="lg" variant="outline" className="border-slate-700 text-white hover:bg-slate-800" asChild>
              <Link to="/ar/near-me">الصفحة الكاملة بالعربي</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="border-t border-slate-800/60 bg-slate-900/30 px-4 py-12 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center"><p className="mb-2 text-xs font-bold uppercase tracking-widest text-cyan-400">Near-me questions</p><h2 className="text-3xl font-black text-white sm:text-4xl">Computer Repair Near Me — FAQs</h2></div>
          <div className="space-y-3">
            {faqs.map((faq) => faq && <details key={faq.id} className="group rounded-2xl border border-slate-800 bg-slate-950/70 p-5"><summary className="cursor-pointer list-none pr-8 font-bold text-white marker:hidden">{faq.title}<span className="float-right text-cyan-400 group-open:rotate-45">+</span></summary><p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-400">{faq.answer}</p></details>)}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 py-14 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-cyan-500/20 bg-slate-900/80 p-7 text-center shadow-2xl sm:p-12">
          <HomeIcon className="mx-auto h-8 w-8 text-cyan-400" aria-hidden="true" />
          <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl">Need a computer technician near you?</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-slate-400">Tell us your Kuwait area, device and problem. We will confirm the right repair route and arrange pickup when appropriate.</p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row"><Button size="lg" className="bg-cyan-500 font-black text-slate-950 hover:bg-cyan-400" asChild><Link to="/book">Book Free Pickup</Link></Button><Button size="lg" variant="outline" className="border-slate-700 text-white hover:bg-slate-800" asChild><a href={waLink} target="_blank" rel="noopener noreferrer">WhatsApp KCROC</a></Button></div>
          <p className="mt-5 text-xs text-slate-500">Central repair lab: {business.streetAddress}, {business.addressLocality}, Kuwait</p>
        </div>
      </section>
    </div>
  );
}
