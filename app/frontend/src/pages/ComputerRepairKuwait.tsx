import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Laptop,
  MessageCircle,
  MonitorCog,
  ShieldCheck,
  Star,
  Truck,
  Wrench,
} from 'lucide-react';
import { KCROC_GRAPH } from '../data/graph';
import { SEOEngine } from '../core/components/SEOEngine';
import SchemaMarkup from '../components/seo/SchemaMarkup';
import { buildWhatsAppLink } from '../utils/whatsappIntent';
import CoreRepairPillars from '../components/content/CoreRepairPillars';

const SERVICES = [
  { label: 'Laptop Repair Kuwait', path: '/laptop-repair-kuwait', icon: Laptop, description: 'Screens, batteries, charging, overheating, hinges, keyboards and motherboard faults.' },
  { label: 'Gaming PC Repair Kuwait', path: '/gaming-pc-repair-kuwait', icon: MonitorCog, description: 'GPU, thermal, power, stability and performance problems for gaming desktops.' },
  { label: 'Motherboard Repair Kuwait', path: '/motherboard-repair-kuwait', icon: Wrench, description: 'Component-level diagnostics, charging circuits, power faults and microsoldering.' },
  { label: 'MacBook Repair Kuwait', path: '/macbook-repair-kuwait', icon: Laptop, description: 'MacBook hardware diagnosis, board repair, screens, batteries and storage-related faults.' },
  { label: 'Laptop Screen Repair Kuwait', path: '/laptop-screen-repair-kuwait', icon: MonitorCog, description: 'Cracked, black, flickering or damaged laptop displays and related cable faults.' },
  { label: 'Battery Replacement Kuwait', path: '/battery-replacement-kuwait', icon: ShieldCheck, description: 'Battery health checks and model-matched replacement for supported laptops.' },
];

const AREAS = [
  ['Hawalli', '/location/hawalli'],
  ['Salmiya', '/location/salmiya'],
  ['Farwaniya', '/location/farwaniya'],
  ['Kuwait City', '/location/kuwait-city'],
  ['Jahra', '/location/jahra'],
  ['Ahmadi', '/location/ahmadi'],
];

const FAQ = [
  {
    q: 'How much does computer repair cost in Kuwait?',
    a: 'Common laptop repairs start from 15 KWD. The final price depends on the device, fault and required part. KCROC diagnoses the problem first and explains the price before paid repair work.',
  },
  {
    q: 'Do you repair computers and laptops at component level?',
    a: 'Yes. Depending on the fault, KCROC can diagnose and repair charging circuits, power components, motherboard faults and other board-level problems when repair is technically and economically suitable.',
  },
  {
    q: 'Do you provide free pickup and delivery in Kuwait?',
    a: 'Yes. KCROC can arrange free pickup and delivery across Kuwait. The device is diagnosed and repaired at the Hawalli laboratory, then returned after testing.',
  },
  {
    q: 'How long does a computer repair take?',
    a: 'Many common repairs are completed within 24–48 hours after diagnosis. Board-level repairs can take longer, and part availability can affect the turnaround time. You receive a realistic estimate after inspection.',
  },
  {
    q: 'Do I have to visit the Hawalli repair lab?',
    a: 'No. Pickup and delivery are available across Kuwait, so you can send the device from home or work without bringing it to Hawalli yourself.',
  },
];

export default function ComputerRepairKuwait() {
  const business = KCROC_GRAPH.business;
  const page = KCROC_GRAPH.pages.find((item) => item.slug === 'computer-repair-kuwait');

  if (!business || !page) return null;

  const wa = buildWhatsAppLink(
    'Hi KCROC, I need computer repair in Kuwait. I would like to arrange diagnosis and free pickup.',
    business.telephone,
  );

  const faqSchema = {
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${page.seo.canonicalUrl}#service`,
        name: 'Computer Repair Kuwait',
        description: page.description,
        provider: { '@id': `${business.websiteUrl}/#business` },
        areaServed: { '@type': 'Country', name: 'Kuwait' },
        offers: {
          '@type': 'Offer',
          priceCurrency: 'KWD',
          price: '15',
          availability: 'https://schema.org/InStock',
          url: page.seo.canonicalUrl,
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `${page.seo.canonicalUrl}#faq`,
        mainEntity: FAQ.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-transparent text-slate-100">
      <SEOEngine entityId={page.id} />
      <SchemaMarkup schema={faqSchema} />

      <main className="mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 sm:pt-12">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-slate-500">
          <Link to="/" className="hover:text-cyan-300">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-300">Computer Repair Kuwait</span>
        </nav>

        <section className="overflow-hidden rounded-[2rem] border border-cyan-900/50 bg-slate-900/55 p-6 shadow-2xl backdrop-blur-md sm:p-10 lg:p-14">
          <div className="max-w-4xl">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-cyan-400">
              Kuwait-wide computer & laptop repair
            </p>
            <h1 className="mt-3 text-4xl font-black leading-tight text-white sm:text-6xl">
              Computer Repair Kuwait
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-xl">
              Professional computer and laptop repair in Kuwait, starting with diagnosis instead of guesswork.
              We repair laptops, desktops, gaming PCs, MacBooks and component-level motherboard faults from our
              Hawalli laboratory, with free pickup and delivery across Kuwait.
            </p>
          </div>

          <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['From 15 KWD', 'Common laptop repairs start here'],
              ['Free pickup', 'Kuwait-wide collection & delivery'],
              ['30-day warranty', 'On completed repairs'],
              ['4.9★', '158+ customer reviews'],
            ].map(([title, text]) => (
              <div key={title} className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5">
                <p className="text-lg font-black text-white">{title}</p>
                <p className="mt-1 text-sm leading-6 text-slate-400">{text}</p>
              </div>
            ))}
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={wa}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-cyan-500 px-7 py-3.5 font-black text-slate-950 transition hover:bg-cyan-400"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              WhatsApp a Technician
            </a>
            <Link
              to="/book"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-slate-700 bg-slate-950/60 px-7 py-3.5 font-black text-white transition hover:border-cyan-500/50 hover:text-cyan-300"
            >
              <Truck className="h-5 w-5" aria-hidden="true" />
              Arrange Free Pickup
            </Link>
            <Link
              to="/pricing"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-slate-800 px-7 py-3.5 font-semibold text-slate-300 transition hover:text-white"
            >
              View Repair Pricing
            </Link>
          </div>
        </section>

        <CoreRepairPillars context="This is the broad Computer Repair Kuwait hub. If your device is specifically a laptop, use the focused laptop repair service for the most relevant repair path." />

        <section className="mt-14" aria-labelledby="repair-types">
          <div className="mb-7">
            <p className="text-sm font-black uppercase tracking-[0.14em] text-cyan-400">What we repair</p>
            <h2 id="repair-types" className="mt-2 text-3xl font-black text-white sm:text-4xl">
              Computer repair services in Kuwait
            </h2>
            <p className="mt-3 max-w-3xl leading-7 text-slate-400">
              Start with the service that matches the problem. Each page explains the repair scope, common symptoms,
              pricing and the next step.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map(({ label, path, icon: Icon, description }) => (
              <Link
                key={path}
                to={path}
                className="group rounded-2xl border border-slate-800 bg-slate-900/45 p-6 transition hover:border-cyan-500/40 hover:bg-slate-900/70"
              >
                <Icon className="h-6 w-6 text-cyan-400" aria-hidden="true" />
                <h3 className="mt-4 text-xl font-bold text-white group-hover:text-cyan-300">{label}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-400">{description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-cyan-300">
                  View service <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-14 grid gap-5 lg:grid-cols-3" aria-labelledby="why-kcroc">
          <div className="lg:col-span-2 rounded-3xl border border-slate-800 bg-slate-900/45 p-7 sm:p-9">
            <p className="text-sm font-black uppercase tracking-[0.14em] text-cyan-400">Why KCROC</p>
            <h2 id="why-kcroc" className="mt-2 text-3xl font-black text-white">Diagnose first. Repair what is actually broken.</h2>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {[
                'Diagnosis before paid repair work',
                'Component-level motherboard diagnostics when suitable',
                'Free pickup and delivery across Kuwait',
                '30-day warranty on completed repairs',
                'No-fix, no-fee policy where applicable',
                'Testing after repair before return',
              ].map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" aria-hidden="true" />
                  <span className="text-sm font-semibold leading-6 text-slate-200">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-cyan-900/50 bg-cyan-950/20 p-7">
            <Star className="h-7 w-7 fill-current text-cyan-300" aria-hidden="true" />
            <p className="mt-5 text-4xl font-black text-white">4.9★</p>
            <p className="mt-1 font-bold text-slate-200">158+ reviews</p>
            <p className="mt-5 text-sm leading-7 text-slate-400">
              Customers across Kuwait use KCROC for laptop, PC, MacBook and component-level repair.
            </p>
            <Link to="/near-me" className="mt-6 inline-flex items-center gap-2 font-bold text-cyan-300 hover:text-cyan-200">
              Find computer repair near you <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>

        <section className="mt-14 rounded-3xl border border-slate-800 bg-slate-900/45 p-7 sm:p-9" aria-labelledby="process">
          <p className="text-sm font-black uppercase tracking-[0.14em] text-cyan-400">Simple process</p>
          <h2 id="process" className="mt-2 text-3xl font-black text-white">How computer repair works</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {[
              ['1', 'Tell us the problem', 'Send the device model, your Kuwait area and a short description by WhatsApp or booking form.'],
              ['2', 'We diagnose it', 'We inspect the hardware, identify the actual fault and explain the repair and price before paid work.'],
              ['3', 'Repair, test & return', 'We complete the approved repair, test the device and arrange pickup or delivery back to you.'],
            ].map(([num, title, text]) => (
              <div key={num} className="rounded-2xl border border-slate-800 bg-slate-950/40 p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500 font-black text-slate-950">{num}</div>
                <h3 className="mt-5 text-lg font-bold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-400">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14" aria-labelledby="pricing">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/45 p-7 sm:p-9">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.14em] text-cyan-400">Repair pricing</p>
                <h2 id="pricing" className="mt-2 text-3xl font-black text-white">Clear starting prices, diagnosis before commitment</h2>
                <p className="mt-3 max-w-3xl leading-7 text-slate-400">
                  Common laptop repairs start from 15 KWD. Screen replacement starts from 30 KWD and
                  component-level motherboard repair starts from 25 KWD. The final price depends on the model,
                  fault and part required.
                </p>
              </div>
              <Link to="/pricing" className="shrink-0 font-bold text-cyan-300 hover:text-cyan-200">
                See full pricing →
              </Link>
            </div>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {[
                ['Laptop repair', 'From 15 KWD'],
                ['Screen replacement', 'From 30 KWD'],
                ['Motherboard repair', 'From 25 KWD'],
              ].map(([name, price]) => (
                <div key={name} className="rounded-2xl border border-slate-800 bg-slate-950/45 p-5">
                  <p className="text-sm text-slate-400">{name}</p>
                  <p className="mt-1 text-xl font-black text-white">{price}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-14" aria-labelledby="areas">
          <p className="text-sm font-black uppercase tracking-[0.14em] text-cyan-400">Kuwait service areas</p>
          <h2 id="areas" className="mt-2 text-3xl font-black text-white">Computer repair pickup across Kuwait</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {AREAS.map(([label, path]) => (
              <Link key={path} to={path} className="rounded-2xl border border-slate-800 bg-slate-900/45 px-5 py-4 font-bold text-slate-200 transition hover:border-cyan-500/40 hover:text-cyan-300">
                Computer Repair {label}
              </Link>
            ))}
          </div>
          <Link to="/locations" className="mt-5 inline-flex items-center gap-2 font-bold text-cyan-300 hover:text-cyan-200">
            See all service areas <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </section>

        <section className="mt-14" aria-labelledby="faq">
          <p className="text-sm font-black uppercase tracking-[0.14em] text-cyan-400">FAQ</p>
          <h2 id="faq" className="mt-2 text-3xl font-black text-white">Computer repair questions</h2>
          <div className="mt-6 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/45">
            {FAQ.map((item) => (
              <details key={item.q} className="group border-b border-slate-800 last:border-b-0">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-6 py-5 font-bold text-white [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span className="text-cyan-400">+</span>
                </summary>
                <p className="px-6 pb-6 leading-7 text-slate-400">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-[2rem] border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 via-slate-950/90 to-slate-950 p-7 sm:p-10" aria-labelledby="final-cta">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.14em] text-cyan-300">Need a repair?</p>
              <h2 id="final-cta" className="mt-2 text-3xl font-black text-white sm:text-4xl">
                Tell us what is wrong. We will start with the diagnosis.
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-slate-300">
                Send the model, your Kuwait area and the problem. We will explain the next step before repair.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a href={wa} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-cyan-500 px-7 py-3.5 font-black text-slate-950 hover:bg-cyan-400">
                <MessageCircle className="h-5 w-5" aria-hidden="true" /> WhatsApp KCROC
              </a>
              <Link to="/book" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-slate-700 bg-slate-950/60 px-7 py-3.5 font-black text-white hover:border-cyan-500/40 hover:text-cyan-300">
                <ClipboardCheck className="h-5 w-5" aria-hidden="true" /> Book a Repair
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
