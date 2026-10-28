import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BadgeCheck,
  BatteryCharging,
  CheckCircle2,
  Clock3,
  Cpu,
  HardDrive,
  Laptop,
  MapPin,
  MessageCircle,
  MonitorCog,
  Power,
  ShieldCheck,
  Thermometer,
  Truck,
  Wrench,
} from 'lucide-react';
import { KCROC_GRAPH } from '../data/graph';
import { IMAGES } from '../constants/images';
import { SEOEngine } from '../core/components/SEOEngine';
import SchemaMarkup from '../components/seo/SchemaMarkup';
import { buildWhatsAppLink } from '../utils/whatsappIntent';

const SERVICES = [
  {
    label: 'Laptop Repair Kuwait',
    path: '/laptop-repair-kuwait',
    icon: Laptop,
    image: IMAGES.services.laptopRepair,
    description: 'Diagnosis for startup faults, overheating, charging, hinges, keyboards and hardware failures.',
  },
  {
    label: 'Desktop & PC Repair Kuwait',
    path: '/desktop-pc-repair-kuwait',
    icon: MonitorCog,
    image: IMAGES.motherboard.allInOneDesktopInternalsMotherboard,
    description: 'Desktop towers, home PCs and office computers with power, display, stability or component issues.',
  },
  {
    label: 'Gaming PC Repair Kuwait',
    path: '/gaming-pc-repair-kuwait',
    icon: MonitorCog,
    image: IMAGES.gaming.diagnostics,
    description: 'Troubleshooting for GPU, temperature, crashes, no-display faults and unstable gaming performance.',
  },
  {
    label: 'Laptop & Computer Motherboard Repair Kuwait',
    path: '/motherboard-repair-kuwait',
    icon: Wrench,
    image: IMAGES.services.motherboardRepair,
    description: 'Component-level laptop, desktop PC and MacBook logic-board diagnosis for power, charging and board faults when repair is suitable.',
  },
  {
    label: 'MacBook Repair Kuwait',
    path: '/macbook-repair-kuwait',
    icon: Laptop,
    image: IMAGES.macbook.diagnostics,
    description: 'MacBook hardware assessment for power, charging, display, battery and logic-board issues.',
  },
  {
    label: 'Laptop Screen Repair Kuwait',
    path: '/laptop-screen-repair-kuwait',
    icon: MonitorCog,
    image: IMAGES.laptopHardware.screenBezel,
    description: 'Checks for cracked, black, flickering or lined displays, including related cable or connector faults.',
  },
  {
    label: 'Charging Port Repair Kuwait',
    path: '/laptop-charging-port-repair-kuwait',
    icon: BatteryCharging,
    image: IMAGES.motherboard.breadboarding,
    description: 'Checks the charger, port and power path before deciding which component needs attention.',
  },
  {
    label: 'SSD & RAM Upgrade Kuwait',
    path: '/ssd-ram-upgrade-kuwait',
    icon: HardDrive,
    image: IMAGES.laptopHardware.dellTeardown,
    description: 'Compatibility checks and storage or memory upgrades to suit the specific device.',
  },
];

const COMMON_ISSUES = [
  {
    title: 'Computer will not power on',
    description: 'Power adapter, charging path, power circuit or motherboard diagnosis.',
    path: '/motherboard-repair-kuwait',
    icon: Power,
  },
  {
    title: 'Black screen or no display',
    description: 'Display, cable, GPU, memory or other hardware checks based on symptoms.',
    path: '/desktop-pc-repair-kuwait',
    icon: MonitorCog,
  },
  {
    title: 'Overheating or loud fans',
    description: 'Cooling, airflow and thermal checks before recommending parts or service.',
    path: '/laptop-repair-kuwait',
    icon: Thermometer,
  },
  {
    title: 'Slow or unstable performance',
    description: 'Storage, memory, temperatures and hardware stability checked in context.',
    path: '/ssd-ram-upgrade-kuwait',
    icon: HardDrive,
  },
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
    a: 'Select common laptop repairs start from 15 KWD. The final price depends on the device model, diagnosis, fault and any required parts. We explain the quote before paid repair work begins.',
  },
  {
    q: 'Do you repair desktops, gaming PCs, laptops and MacBooks?',
    a: 'Yes. KCROC assesses supported laptops, desktop PCs, gaming PCs and MacBooks. The recommended repair depends on the symptoms, diagnostic findings, parts availability and whether repair is technically sensible.',
  },
  {
    q: 'Do you offer pickup and delivery across Kuwait?',
    a: 'Yes. Pickup and return delivery can be arranged across Kuwait. The physical repair work is carried out at the KCROC workshop in Hawalli, then the device is tested before return.',
  },
  {
    q: 'Can a technician repair my computer at home or at the office?',
    a: 'We do not provide on-site repair visits. We arrange pickup from your home or office, diagnose and repair the device at our Hawalli workshop, and arrange its return.',
  },
  {
    q: 'How long will the repair take?',
    a: 'We give a more reliable time estimate after the device has been assessed. Turnaround depends on the fault, the repair method, your approval and whether compatible parts are available; we do not promise the same timing for every repair.',
  },
  {
    q: 'Will you start repairing the device before I approve the price?',
    a: 'No paid repair work should begin before the diagnosis and quote are explained and you approve the proposed work. If the findings change the scope, we explain the next step first.',
  },
  {
    q: 'What should I do if liquid has spilled on my laptop?',
    a: 'Power it off and disconnect the charger if you can do so safely. Do not keep trying to start or charge it, and avoid applying heat. Tell us what liquid spilled and when it happened when arranging pickup.',
  },
  {
    q: 'Is there a warranty, and what if the repair cannot be completed?',
    a: 'Completed repairs carry a 30-day warranty under KCROC’s service terms. No Fix, No Fee applies where the stated service conditions are met; we explain the applicable terms before proceeding.',
  },
];

export default function ComputerRepairKuwait() {
  const business = KCROC_GRAPH.business;
  const page = KCROC_GRAPH.pages.find((item) => item.slug === 'computer-repair-kuwait');
  const heroImage = IMAGES.brand.heroBanner;

  if (!business || !page) return null;

  const wa = buildWhatsAppLink(
    'Hi KCROC, I need computer repair in Kuwait. My device model is __, the issue is __, and my area is __. Please advise on diagnosis and pickup.',
    business.telephone,
  );

  const pageSchema = {
    '@graph': [
      {
        '@type': 'Service',
        '@id': page.seo.canonicalUrl + '#service',
        name: 'Computer Repair Kuwait',
        serviceType: [
          'Desktop computer repair',
          'Laptop repair',
          'Gaming PC repair',
          'MacBook hardware repair',
          'Component-level motherboard diagnosis',
        ],
        description: page.description,
        provider: { '@id': business.websiteUrl + '/#business' },
        areaServed: { '@type': 'Country', name: 'Kuwait' },
        offers: {
          '@type': 'Offer',
          priceCurrency: 'KWD',
          price: '15',
          description: 'Starting price for select common repair work. Final price depends on the device, fault and parts and is confirmed before paid work.',
          url: page.seo.canonicalUrl,
        },
      },
      {
        '@type': 'FAQPage',
        '@id': page.seo.canonicalUrl + '#faq',
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
      <SchemaMarkup schema={pageSchema} />

      <div className="mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 sm:pt-12">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500">
          <Link to="/" className="rounded-sm transition hover:text-cyan-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400">Home</Link>
          <span className="mx-2" aria-hidden="true">/</span>
          <span className="text-slate-300">Computer Repair Kuwait</span>
        </nav>

        <section aria-labelledby="computer-repair-hero-title" className="relative isolate overflow-hidden rounded-[2rem] border border-cyan-900/50 bg-slate-950/85 shadow-2xl shadow-black/20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(6,182,212,0.13),transparent_45%),radial-gradient(ellipse_at_bottom_right,rgba(16,185,129,0.08),transparent_42%)]" aria-hidden="true" />
          <div className="relative grid gap-8 p-5 sm:p-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-10 lg:p-11">
            <div className="max-w-3xl">
              <p className="inline-flex items-center gap-2 rounded-full border border-cyan-500/25 bg-cyan-500/10 px-3.5 py-2 text-xs font-black uppercase tracking-[0.12em] text-cyan-200 sm:text-sm">
                <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                Hawalli repair workshop · Kuwait-wide pickup
              </p>
              <h1 id="computer-repair-hero-title" className="mt-5 text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                Computer Repair Kuwait
                <span className="mt-2 block text-2xl font-bold leading-snug text-cyan-200 sm:text-3xl">PC, laptop, gaming computer and MacBook diagnostics</span>
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                Start with the fault, not a guessed replacement. KCROC diagnoses supported computers at our Hawalli workshop, explains the repair options and price before paid work, then tests the device before arranging its return.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {[
                  ['Diagnosis before repair', 'Understand the fault and quote before approving paid work.'],
                  ['Component-level assessment', 'Board repair is considered when technically suitable.'],
                  ['Pickup and return delivery', 'Arrange collection from home or office across Kuwait.'],
                  ['30-day repair warranty', 'Applies to completed repairs under service terms.'],
                ].map(([title, description]) => (
                  <div key={title} className="flex items-start gap-3 rounded-xl border border-white/10 bg-slate-900/65 p-3.5">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-bold text-white">{title}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-400">{description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href={wa}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-cyan-400 px-6 py-3 font-black text-slate-950 transition hover:bg-cyan-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  WhatsApp a Technician
                </a>
                <Link
                  to="/book"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/75 px-6 py-3 font-black text-white transition hover:border-cyan-400/60 hover:text-cyan-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  <Truck className="h-5 w-5" aria-hidden="true" />
                  Arrange Free Pickup
                </Link>
                <Link
                  to="/pricing"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-4 py-3 font-bold text-slate-300 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  View repair pricing <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
              <p className="mt-4 text-xs leading-6 text-slate-500">
                The workshop is in Hawalli. We arrange pickup; we do not advertise this as an at-home repair service.
              </p>
            </div>

            <figure className="relative min-w-0">
              <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-900 shadow-xl">
                <img
                  src={heroImage.src}
                  alt={heroImage.alt}
                  width={heroImage.width}
                  height={heroImage.height}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover object-center sm:aspect-[5/4] lg:aspect-[4/5]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-slate-950/5" aria-hidden="true" />
                <figcaption className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-200">Inside the KCROC workshop</p>
                  <p className="mt-1 max-w-sm text-lg font-extrabold leading-snug text-white">Diagnosis, repair and testing in one place</p>
                </figcaption>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/10 bg-slate-900/80 p-4">
                  <Clock3 className="h-5 w-5 text-cyan-300" aria-hidden="true" />
                  <p className="mt-2 text-sm font-bold text-white">Quote before work</p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">Approve the proposed repair first.</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-slate-900/80 p-4">
                  <ShieldCheck className="h-5 w-5 text-emerald-400" aria-hidden="true" />
                  <p className="mt-2 text-sm font-bold text-white">Tested before return</p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">Post-repair checks before delivery.</p>
                </div>
              </div>
            </figure>
          </div>
        </section>

        <section className="mt-14" aria-labelledby="repair-services-heading">
          <div className="mb-7 max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.15em] text-cyan-300">Choose the right repair path</p>
            <h2 id="repair-services-heading" className="mt-2 text-3xl font-black text-white sm:text-4xl">
              Computer repair services in Kuwait
            </h2>
            <p className="mt-3 leading-7 text-slate-400">
              Choose a service to see the relevant symptoms, repair scope and next steps. The final recommendation depends on diagnosis, not just the symptom.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map(({ label, path, icon: Icon, image, description }) => (
              <Link
                key={path}
                to={path}
                className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900/55 transition duration-200 hover:-translate-y-0.5 hover:border-cyan-400/45 hover:bg-slate-900/85 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <div className="relative overflow-hidden bg-slate-950">
                  <img
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[16/10] w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" aria-hidden="true" />
                  <span className="absolute bottom-3 left-3 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-slate-950/75 text-cyan-200 backdrop-blur-sm">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-extrabold leading-snug text-white transition-colors group-hover:text-cyan-200">{label}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-slate-400">{description}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-cyan-300">
                    View service <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-3xl border border-white/10 bg-slate-950/60 p-6 sm:p-8" aria-labelledby="common-symptoms">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.15em] text-cyan-300">Start with the symptoms</p>
            <h2 id="common-symptoms" className="mt-2 text-3xl font-black text-white sm:text-4xl">What is your computer doing?</h2>
            <p className="mt-3 leading-7 text-slate-400">Similar symptoms can have different causes. These pages help you find the most relevant diagnostic route.</p>
          </div>
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {COMMON_ISSUES.map(({ title, description, path, icon: Icon }) => (
              <Link key={title} to={path} className="group rounded-2xl border border-slate-800 bg-slate-900/70 p-5 transition hover:border-cyan-400/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400">
                <Icon className="h-6 w-6 text-cyan-300" aria-hidden="true" />
                <h3 className="mt-4 font-extrabold text-white group-hover:text-cyan-200">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-cyan-300">Explore repair options <ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-14 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]" aria-labelledby="repair-process">
          <div className="rounded-3xl border border-cyan-900/50 bg-cyan-950/15 p-7 sm:p-8">
            <p className="text-sm font-black uppercase tracking-[0.15em] text-cyan-300">How it works</p>
            <h2 id="repair-process" className="mt-2 text-3xl font-black text-white">A clear process from pickup to return</h2>
            <p className="mt-4 leading-7 text-slate-300">
              You stay in control of the decision. We explain what the diagnosis shows and what the proposed repair will cost before paid work begins.
            </p>
            <Link to="/book" className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 font-extrabold text-slate-950 transition hover:bg-cyan-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200">
              Arrange pickup <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ['01', 'Share the details', 'Send the model, symptoms and Kuwait area via WhatsApp or the booking page.'],
              ['02', 'Diagnosis and quote', 'The device is assessed at the Hawalli workshop; we explain the repair options and quote.'],
              ['03', 'Repair and test', 'After approval, we complete the agreed work, run relevant checks and arrange the return.'],
            ].map(([number, title, description]) => (
              <div key={number} className="rounded-2xl border border-white/10 bg-slate-900/55 p-5">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-cyan-400/25 bg-cyan-400/10 text-sm font-black text-cyan-200">{number}</span>
                <h3 className="mt-4 font-extrabold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 overflow-hidden rounded-3xl border border-white/10 bg-slate-900/55" aria-labelledby="repair-pricing">
          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_0.85fr] lg:p-10">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.15em] text-cyan-300">Repair pricing</p>
              <h2 id="repair-pricing" className="mt-2 text-3xl font-black text-white sm:text-4xl">Know the price before work begins</h2>
              <p className="mt-4 max-w-2xl leading-7 text-slate-400">
                These are starting points for selected services, not a fixed price for every computer. Model, fault complexity and parts can change the total. We explain the quote before paid work and separate part costs where relevant.
              </p>
              <Link to="/pricing" className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-cyan-400/35 px-5 py-3 font-bold text-cyan-200 transition hover:bg-cyan-400/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400">
                View the full pricing guide <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {[
                ['Selected common laptop repairs', 'From 15 KWD', 'Depends on the fault and work needed.'],
                ['Laptop screen replacement', 'Labor from 30 KWD + panel', 'Panel price depends on model and specification.'],
                ['Motherboard repair', 'From 25 KWD', 'Complexity and board condition affect the quote.'],
              ].map(([label, price, note]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-slate-950/65 p-4">
                  <p className="text-sm font-semibold text-slate-400">{label}</p>
                  <p className="mt-1 text-xl font-black text-white">{price}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-500">{note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-14" aria-labelledby="kuwait-service-areas">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.15em] text-cyan-300">Local service</p>
              <h2 id="kuwait-service-areas" className="mt-2 text-3xl font-black text-white sm:text-4xl">Computer repair pickup across Kuwait</h2>
              <p className="mt-3 max-w-3xl leading-7 text-slate-400">
                KCROC’s physical workshop is in Hawalli. Other areas below are pickup and delivery service areas, not separate walk-in branches.
              </p>
            </div>
            <Link to="/locations" className="inline-flex min-h-11 shrink-0 items-center gap-2 font-bold text-cyan-300 transition hover:text-cyan-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400">
              All service areas <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {AREAS.map(([label, path]) => (
              <Link key={path} to={path} className="group flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-slate-900/55 px-5 py-4 font-bold text-slate-200 transition hover:border-cyan-400/40 hover:text-cyan-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400">
                <span className="flex min-w-0 items-center gap-3">
                  <MapPin className="h-5 w-5 shrink-0 text-cyan-300" aria-hidden="true" />
                  <span>Computer Repair {label}</span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-slate-500 group-hover:text-cyan-200" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-14" aria-labelledby="computer-repair-faq">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.15em] text-cyan-300">FAQ</p>
            <h2 id="computer-repair-faq" className="mt-2 text-3xl font-black text-white sm:text-4xl">Computer repair questions</h2>
            <p className="mt-3 leading-7 text-slate-400">Clear answers about diagnosis, cost, pickup, timing and what to expect from the workshop.</p>
          </div>
          <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/55">
            {FAQ.map((item) => (
              <details key={item.q} className="group border-b border-white/10 last:border-b-0">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-5 px-5 py-4 font-bold text-white transition hover:bg-white/[0.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-400 sm:px-6 [&::-webkit-details-marker]:hidden">
                  <span>{item.q}</span>
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cyan-400/20 text-lg font-normal text-cyan-200 transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="px-5 pb-5 leading-7 text-slate-300 sm:px-6">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-14 overflow-hidden rounded-[2rem] border border-cyan-400/20 bg-gradient-to-br from-cyan-400/10 via-slate-950/90 to-slate-950 p-6 sm:p-9 lg:p-11" aria-labelledby="final-computer-repair-cta">
          <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.15em] text-cyan-200">Ready to arrange diagnosis?</p>
              <h2 id="final-computer-repair-cta" className="mt-2 text-3xl font-black leading-tight text-white sm:text-4xl">
                Tell us the model, symptoms and your Kuwait area.
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-slate-300">
                We’ll help you find the right diagnostic path and arrange pickup. The repair options and price are explained before paid work begins.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:min-w-56">
              <a href={wa} target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-cyan-400 px-6 py-3 font-black text-slate-950 transition hover:bg-cyan-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200">
                <MessageCircle className="h-5 w-5" aria-hidden="true" /> WhatsApp KCROC
              </a>
              <Link to="/book" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-950/60 px-6 py-3 font-black text-white transition hover:border-cyan-300/50 hover:text-cyan-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400">
                <Truck className="h-5 w-5" aria-hidden="true" /> Book a pickup
              </Link>
              <a href={"tel:" + business.telephone} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-6 py-2 font-bold text-slate-300 transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400">
                Call {business.telephone}
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
