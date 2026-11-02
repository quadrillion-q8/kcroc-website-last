import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ArrowRight, BatteryCharging, CheckCircle2, MessageCircle, Truck } from 'lucide-react';
import { KCROC_GRAPH } from '../data/graph';
import { IMAGES } from '../constants/images';
import { SEOEngine } from '../core/components/SEOEngine';
import SchemaMarkup from '../components/seo/SchemaMarkup';

const FAQS = [
  {
    question: 'How much does MacBook battery replacement cost in Kuwait?',
    answer: 'Labour starts from 8 KWD and the battery is priced separately. The exact part and total quote depend on the MacBook model, battery part number, grade and availability. We confirm the total before paid work.'
  },
  {
    question: 'Do you replace batteries in MacBook Air and MacBook Pro?',
    answer: 'We inspect MacBook Air and MacBook Pro models across Intel and Apple Silicon generations. We do not assume one battery fits every generation: the exact model identifier or A-number and year must be checked before confirming compatibility.'
  },
  {
    question: 'What does the macOS Service Recommended warning mean?',
    answer: 'It indicates macOS has detected a battery condition worth checking. Battery health, cycle count, runtime and charging behaviour are reviewed together before we recommend replacement.'
  },
  {
    question: 'How do I identify my exact MacBook model?',
    answer: 'Send the MacBook name and year if known, or the A-number model identifier. A screenshot of About This Mac can also help; hide the serial number and personal information before sharing it.'
  },
  {
    question: 'Is a MacBook that will not charge always caused by the battery?',
    answer: 'No. The adapter, cable, USB-C or MagSafe input, internal connector or charging circuitry may be involved. We check the relevant charging path for the model before recommending a battery.'
  },
  {
    question: 'What should I do if the battery is swollen or the trackpad is lifting?',
    answer: 'Stop using and charging the MacBook, disconnect power if safe, and do not press, puncture or try to remove the battery. Arrange a safe inspection instead of continuing to use the device.'
  },
  {
    question: 'Will battery replacement delete my files?',
    answer: 'Battery replacement is not intended to modify the storage drive or files. Keep a backup where possible before any repair; no repair can carry an absolute data-preservation guarantee, especially when another board fault is present.'
  },
  {
    question: 'How long does MacBook battery replacement take?',
    answer: 'Timing depends on the exact model, battery assembly and part availability. We confirm a realistic estimate after identifying the correct part rather than promising same-day repair before checking stock.'
  },
  {
    question: 'Does the replacement include a warranty?',
    answer: 'Completed repair work is covered by a 30-day warranty on the part and labour within the scope of the repair and the stated service terms. We explain the coverage before you approve the work.'
  },
  {
    question: 'Do you collect MacBooks from all areas of Kuwait?',
    answer: 'Yes. Free pickup and delivery can be arranged across Kuwait. Diagnosis and repair are completed at the KCROC workshop in Hawalli, Al Mullah Complex, Basement, Shop 19.'
  }
];

export default function MacBookBatteryReplacementPage() {
  const page = KCROC_GRAPH.pages.find((entry) => entry.id === 'page-macbook-battery-replacement');
  const business = KCROC_GRAPH.business;

  if (!page || !business) return <Navigate to="/404" replace />;

  const whatsappMessage = 'Hi KCROC, I need MacBook battery diagnosis or replacement in Kuwait. Device: MacBook Air / MacBook Pro: ____. Year: ____. A-number/model identifier: ____. Chip: Intel / M1 / M2 / M3 / M4 / M5 / not sure. Symptoms: fast drain / Service Recommended / will not charge through USB-C or MagSafe / swelling or lifting trackpad / other: ____. Kuwait area: ____. Please confirm diagnosis, exact battery compatibility, available part grade, part availability, labour and total price, and expected timing before paid work. I will not open or press a swollen battery.';
  const whatsappUrl = `https://wa.me/${business.telephone}?text=${encodeURIComponent(whatsappMessage)}`;
  const canonical = page.seo.canonicalUrl;

  const serviceSchema = {
    '@graph': [{
      '@type': 'Service',
      '@id': `${canonical}#service`,
      name: 'MacBook Air and MacBook Pro Battery Replacement in Kuwait',
      alternateName: 'MacBook Battery Replacement Kuwait',
      serviceType: 'MacBook battery health checks, charging-path diagnosis and model-matched battery replacement',
      description: page.description,
      url: canonical,
      image: [
        `${business.websiteUrl}${IMAGES.macbook.service.src}`,
        `${business.websiteUrl}${IMAGES.macbook.swollenBattery1.src}`,
        `${business.websiteUrl}${IMAGES.macbook.macbookProBatteryRemovalRepair.src}`
      ],
      areaServed: { '@type': 'Country', name: 'Kuwait' },
      provider: { '@id': `${business.websiteUrl}/#business` },
      availableChannel: {
        '@type': 'ServiceChannel',
        servicePhone: `+${business.telephone}`,
        serviceLocation: {
          '@type': 'Place',
          name: 'KCROC repair workshop — Hawalli',
          address: {
            '@type': 'PostalAddress',
            streetAddress: business.streetAddress,
            addressLocality: business.addressLocality,
            addressRegion: business.addressRegion,
            addressCountry: business.addressCountry
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: business.coords?.lat,
            longitude: business.coords?.lng
          }
        }
      },
      offers: {
        '@type': 'Offer',
        name: 'Battery replacement labour from 8 KWD + battery',
        description: 'The published starting figure is labour only. The battery price is separate and depends on exact MacBook model, part and availability; the total is confirmed before work.',
        priceCurrency: 'KWD',
        priceSpecification: {
          '@type': 'PriceSpecification',
          priceCurrency: 'KWD',
          minPrice: 8,
          description: 'Labour starting price only; does not include the battery.'
        }
      }
    }]
  };

  const faqSchema = {
    '@graph': [{
      '@type': 'FAQPage',
      '@id': `${canonical}#faq`,
      inLanguage: 'en-KW',
      mainEntity: FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer }
      }))
    }]
  };

  return (
    <>
      <SEOEngine entityId={page.id} />
      <SchemaMarkup schema={serviceSchema} />
      <SchemaMarkup schema={faqSchema} />

      <main className="min-h-screen bg-transparent pb-20 pt-8 text-white sm:pt-16 lg:pt-24">
        <div className="mx-auto max-w-7xl px-6">
          <nav aria-label="Breadcrumb" className="mb-7 text-sm text-slate-500">
            <Link to="/" className="hover:text-cyan-300">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/macbook-repair-kuwait" className="hover:text-cyan-300">MacBook Repair Kuwait</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-300">MacBook Battery Replacement</span>
          </nav>

          <header className="grid gap-8 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/50 p-6 shadow-2xl backdrop-blur sm:p-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div>
              <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-cyan-400">MacBook Air &amp; MacBook Pro • Kuwait</p>
              <h1 className="text-3xl font-black leading-tight text-white sm:text-5xl">MacBook Battery Replacement in Kuwait</h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                Is your MacBook Air or MacBook Pro losing charge quickly, showing a Service Recommended warning, or shutting down before the battery is empty? KCROC checks battery condition, cycle count and the relevant USB-C or MagSafe charging path, then confirms the exact model and compatible battery availability before quoting.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 font-extrabold text-slate-950 hover:brightness-95">
                  <MessageCircle className="h-5 w-5" aria-hidden="true" /> Send your MacBook model on WhatsApp
                </a>
                <Link to="/book" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-950/50 px-5 py-3 font-bold text-white hover:border-cyan-500/50">
                  <Truck className="h-5 w-5" aria-hidden="true" /> Arrange free pickup
                </Link>
              </div>
              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
                  <strong className="block text-lg text-cyan-300">From 8 KWD</strong>
                  <span className="text-xs leading-5 text-slate-400">Labour only; battery priced separately</span>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
                  <strong className="block text-lg text-cyan-300">Free</strong>
                  <span className="text-xs leading-5 text-slate-400">Pickup and delivery across Kuwait</span>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
                  <strong className="block text-lg text-cyan-300">30 days</strong>
                  <span className="text-xs leading-5 text-slate-400">Warranty on covered repair work</span>
                </div>
              </div>
            </div>
            <figure className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
              <img src={IMAGES.macbook.service.src} alt="MacBook internal battery service and replacement at KCROC in Hawalli, Kuwait" width={IMAGES.macbook.service.width} height={IMAGES.macbook.service.height} fetchPriority="high" decoding="async" className="h-full max-h-[440px] w-full object-cover" />
              <figcaption className="px-4 py-3 text-sm leading-6 text-slate-400">The exact MacBook model and battery part are checked before replacement is approved.</figcaption>
            </figure>
          </header>

          <section className="mt-12 grid gap-8 lg:grid-cols-[1fr_0.9fr]" aria-labelledby="symptoms-heading">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-400">Battery symptoms</p>
              <h2 id="symptoms-heading" className="mt-2 text-2xl font-black text-white sm:text-3xl">When should a MacBook battery be checked?</h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  'Battery runtime has fallen noticeably compared with its earlier condition.',
                  'macOS displays Service Recommended or another battery-health warning.',
                  'The MacBook shuts down or loses charge unusually quickly.',
                  'The device does not charge consistently through USB-C or MagSafe.',
                  'The trackpad, keyboard deck or bottom case appears raised.',
                  'Battery percentage or charging behaviour is inconsistent.'
                ].map((item) => (
                  <div key={item} className="flex gap-3 rounded-xl border border-slate-800 bg-slate-900/45 p-4 text-sm leading-6 text-slate-300">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" aria-hidden="true" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <aside className="rounded-2xl border border-amber-700/40 bg-amber-950/20 p-6" aria-labelledby="swelling-warning">
              <div className="flex items-center gap-3">
                <BatteryCharging className="h-6 w-6 text-amber-300" aria-hidden="true" />
                <h2 id="swelling-warning" className="text-xl font-black text-amber-100">Important: swollen battery safety</h2>
              </div>
              <p className="mt-4 leading-7 text-amber-50/90">
                If the battery is visibly swollen or the trackpad is lifting, stop using and charging the MacBook. Disconnect the adapter if safe. Do not press, puncture, bend or attempt to remove the battery yourself. Arrange a safe inspection.
              </p>
            </aside>
          </section>

          <section className="mt-14 rounded-3xl border border-slate-800 bg-slate-900/45 p-6 sm:p-9" aria-labelledby="diagnostic-heading">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-400">Model-specific diagnosis</p>
            <h2 id="diagnostic-heading" className="mt-2 text-2xl font-black text-white sm:text-3xl">How KCROC checks a MacBook battery before replacement</h2>
            <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {[
                ['Identify the exact model', 'We check the MacBook Air or Pro model, year, screen size and A-number where available. Similar-looking generations can use different battery assemblies.'],
                ['Review battery condition', 'We assess macOS battery health, cycle count and the symptoms together. A warning is an important clue, not a substitute for diagnosis.'],
                ['Check the charging path', 'USB-C, MagSafe, adapter, cable, connector and relevant charging behaviour are considered before blaming the battery.'],
                ['Confirm the battery part', 'We match the part number and fitment to the exact model. Availability and the available part grade are confirmed before you approve the quote.'],
                ['Explain the quote first', 'Labour starts from 8 KWD; the battery is a separate cost. We explain the model-specific part price and expected timing before paid work.'],
                ['Verify after installation', 'The agreed post-repair checks include charging behaviour and battery reporting for the supplied replacement and device model.']
              ].map(([title, body]) => (
                <article key={title} className="rounded-2xl border border-slate-800 bg-slate-950/45 p-5">
                  <h3 className="font-bold text-white">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-400">{body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-14 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
              <img src={IMAGES.macbook.swollenBattery1.src} alt="Swollen MacBook battery requiring safe inspection and handling" width={IMAGES.macbook.swollenBattery1.width} height={IMAGES.macbook.swollenBattery1.height} loading="lazy" decoding="async" className="h-full max-h-[360px] w-full object-cover" />
              <div className="p-5">
                <h2 className="text-lg font-bold text-white">Part compatibility matters</h2>
                <p className="mt-2 text-sm leading-7 text-slate-400">Battery assemblies, connectors and installation methods vary between MacBook generations. We do not confirm a fit from the family name alone.</p>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-black text-white">What to send before arranging service</h2>
              <p className="mt-3 leading-7 text-slate-400">A clear model name and year are helpful. The A-number is especially useful for matching the right assembly. You can send an external photo or a screenshot of About This Mac after hiding the serial number and personal information.</p>
              <p className="mt-3 leading-7 text-slate-400">Do not open the MacBook to find a part number. If the battery looks swollen, do not press the case or attempt to photograph the battery internally.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/macbook-repair-kuwait" className="inline-flex items-center gap-2 font-bold text-cyan-300 hover:text-cyan-200">MacBook repair Kuwait <ArrowRight className="h-4 w-4" /></Link>
                <Link to="/battery-replacement-kuwait" className="inline-flex items-center gap-2 font-bold text-cyan-300 hover:text-cyan-200">Windows laptop battery replacement <ArrowRight className="h-4 w-4" /></Link>
                <Link to="/macbook-screen-replacement-kuwait" className="inline-flex items-center gap-2 font-bold text-cyan-300 hover:text-cyan-200">MacBook screen replacement <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </div>
          </section>

          <section className="mt-14" aria-labelledby="macbook-battery-faqs">
            <h2 id="macbook-battery-faqs" className="text-2xl font-black text-white sm:text-3xl">MacBook battery replacement FAQs</h2>
            <div className="mt-6 grid gap-3 md:grid-cols-2">
              {FAQS.map((faq) => (
                <details key={faq.question} className="group rounded-xl border border-slate-800 bg-slate-900/45 p-5">
                  <summary className="cursor-pointer list-none font-bold text-white marker:hidden">{faq.question}</summary>
                  <p className="mt-3 text-sm leading-7 text-slate-400">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="mt-14 rounded-3xl border border-cyan-900/50 bg-slate-900/55 p-7 text-center sm:p-10" aria-labelledby="book-macbook-battery">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-400">KCROC • Hawalli repair lab • Kuwait-wide pickup</p>
            <h2 id="book-macbook-battery" className="mt-2 text-2xl font-black text-white sm:text-3xl">Check the right battery before you pay for a replacement</h2>
            <p className="mx-auto mt-4 max-w-3xl leading-7 text-slate-400">Send your exact MacBook model and symptoms. We will check the next diagnostic and parts-availability steps, then explain the quote before paid work.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 font-bold text-slate-950"><MessageCircle className="h-5 w-5" /> WhatsApp KCROC</a>
              <Link to="/book" className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-slate-700 px-6 py-3 font-bold text-white"><Truck className="h-5 w-5" /> Book free pickup</Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
