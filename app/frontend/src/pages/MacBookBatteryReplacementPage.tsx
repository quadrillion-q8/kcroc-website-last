import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import {
  ArrowRight,
  BatteryCharging,
  CheckCircle2,
  Cpu,
  MessageCircle,
  ShieldCheck,
  Thermometer,
  Truck,
  Zap
} from 'lucide-react';
import { KCROC_GRAPH } from '../data/graph';
import { IMAGES } from '../constants/images';
import { SEOEngine } from '../core/components/SEOEngine';
import SchemaMarkup from '../components/seo/SchemaMarkup';

const MODEL_CHOICES = [
  'MacBook Air M1 · A2337',
  'MacBook Air M2 · A2681 / A2941',
  'MacBook Air M3 · A3113 / A3114',
  'MacBook Pro 13-inch · A2338',
  'MacBook Pro 14-inch · A2442 / A2779 / A2918 / A2992',
  'MacBook Pro 16-inch · A2485 / A2780 / A2991',
  'Intel MacBook Air / Pro · older model',
  'I am not sure — help me identify it'
] as const;

const SYMPTOM_CHOICES = [
  'Service Recommended / fast battery drain',
  'Will not charge / stuck at 1%',
  'Swollen battery / raised trackpad or case',
  'Unexpected shutdown / battery percentage jumps',
  'Other battery or charging symptom'
] as const;

const MODEL_FAMILIES = [
  {
    family: 'MacBook Air — Intel and Apple silicon',
    models: 'A1466 · A1932 · A2179 · A2337 · A2681 · A2941 · A3113 · A3114',
    note: 'Includes commonly encountered 11-inch, 13-inch and 15-inch generations.'
  },
  {
    family: 'MacBook Pro — Intel Retina and Touch Bar',
    models: 'A1398 · A1502 · A1706 · A1707 · A1708 · A1989 · A1990 · A2141 · A2159 · A2251 · A2289',
    note: 'Battery construction and adhesive procedure vary between chassis generations.'
  },
  {
    family: 'MacBook Pro — Apple silicon',
    models: 'A2338 · A2442 · A2485 · A2779 · A2780 · A2918 · A2991 · A2992',
    note: 'The exact screen size, year and battery assembly still need to be matched.'
  }
];

const FAQS = [
  {
    question: 'How much is a MacBook battery replacement in Kuwait, fully installed?',
    answer: 'We quote the complete installed price after checking the exact MacBook model and battery availability. The quote states the battery part, disclosed grade where supplier information is available, installation labour and applicable warranty together. Labour starts from 8 KWD, but that is not the installed total and does not include the battery.'
  },
  {
    question: 'Can I choose a standard or premium battery?',
    answer: 'Where both options are available from verified supplier stock, we can quote more than one compatible battery grade. We explain the documented manufacturer or grade information, warranty coverage and complete installed total for each option. We do not describe a compatible battery as a genuine Apple part or a zero-cycle cell unless that claim is supported by the part documentation.'
  },
  {
    question: 'Which MacBook Air and MacBook Pro A-numbers do you support?',
    answer: 'The page lists common examples including Air A1466, A1932, A2179, A2337, A2681, A2941, A3113 and A3114, plus Pro A1502, A1989, A1990, A2141, A2338, A2442, A2485, A2779, A2780 and other generations. The list is not exhaustive. We verify the exact year, model identifier and battery part number before confirming compatibility.'
  },
  {
    question: 'Does Service Recommended always mean the battery must be replaced?',
    answer: 'No. Apple describes Service Recommended as a battery that holds less charge than when new or is not functioning normally. We review the macOS battery-health status, cycle count where available, runtime symptoms and charging behaviour before recommending replacement.'
  },
  {
    question: 'Is a MacBook that will not charge always a bad battery?',
    answer: 'No. The adapter, cable, USB-C or MagSafe input, internal connector, battery communication or motherboard charging circuit may be responsible. Our initial diagnosis checks the relevant power path before a battery is ordered, so you are not quoted for a battery that may not solve the fault.'
  },
  {
    question: 'Do you check the charging IC or motherboard if the battery is not the cause?',
    answer: 'When symptoms and measurements point to a board-level fault, we can investigate the relevant USB-C power-delivery and charging stages and power rails for that specific board. Controller names and circuit layouts differ by model; we identify the board and test it rather than assuming one chip is responsible.'
  },
  {
    question: 'Do you calibrate the replacement battery?',
    answer: 'After installation we review battery reporting, state-of-charge behaviour and charging response where the model and macOS expose those readings. Any fuel-gauge procedure is model- and part-appropriate. We do not force an unnecessary full-discharge cycle, because modern Mac battery management is not improved by routinely draining a battery to zero.'
  },
  {
    question: 'Can you clean the fans or renew thermal material during the battery service?',
    answer: 'We can inspect the cooling system while assessing the device. Internal fan and heatsink cleaning or thermal-interface service may be recommended on compatible fan-equipped models when the condition justifies it. It is not required for every battery replacement, is not suitable for every MacBook, and is quoted separately before work.'
  },
  {
    question: 'What should I do if the battery is swollen or the trackpad is lifting?',
    answer: 'Stop using and charging the MacBook, disconnect the charger if it is safe to do so, and do not press, bend, puncture, open or try to remove the battery. Keep it away from heat and arrange safe handling instructions with us before attempting collection. Do not send or transport a visibly damaged battery without first agreeing the safe arrangement.'
  },
  {
    question: 'How long does MacBook battery replacement take?',
    answer: 'Timing depends on the exact model, the correct battery being in stock and the condition of the internal assembly. We confirm the expected turnaround after checking compatibility and availability. Same-day completion is not promised before those checks.'
  },
  {
    question: 'What warranty and pickup service do you provide?',
    answer: 'Covered completed repair work carries KCROC’s 30-day warranty under the stated service terms. Free pickup and delivery can be arranged across Kuwait; diagnosis and repair are completed at the KCROC workshop in Hawalli. We explain the applicable warranty and collection details before you approve the work.'
  }
];

export default function MacBookBatteryReplacementPage() {
  const page = KCROC_GRAPH.pages.find((entry) => entry.id === 'page-macbook-battery-replacement');
  const business = KCROC_GRAPH.business;
  const [selectedModel, setSelectedModel] = useState<string>(MODEL_CHOICES[7]);
  const [selectedSymptom, setSelectedSymptom] = useState<string>(SYMPTOM_CHOICES[0]);
  const [pickupArea, setPickupArea] = useState('');

  if (!page || !business) return <Navigate to="/404" replace />;

  const canonical = page.seo.canonicalUrl;
  const isSwollen = selectedSymptom.toLowerCase().includes('swollen');
  const whatsappLink = (message: string) =>
    'https://wa.me/' + business.telephone + '?text=' + encodeURIComponent(message);

  const quoteMessage = [
    'Hi KCROC, please quote a MacBook battery diagnosis and replacement in Kuwait.',
    'Model / A-number: ' + selectedModel,
    'Symptom: ' + selectedSymptom,
    'Pickup area: ' + (pickupArea.trim() || 'Please ask me for my area'),
    'Please confirm whether the issue is the battery or charging circuit, the available battery part and documented grade, the complete installed total (part + labour), the warranty and the expected timing before paid work.',
    isSwollen ? 'The battery may be swollen. Please send safe handling and collection instructions before any transport.' : 'I will not open the MacBook or remove the battery myself.',
    'Thank you.'
  ].join('\n');
  const whatsappUrl = whatsappLink(quoteMessage);
  const swollenUrl = whatsappLink([
    'Hi KCROC, my MacBook may have a swollen battery or a lifting trackpad/case.',
    'Model if known: ' + selectedModel,
    'Pickup area: ' + (pickupArea.trim() || 'Please ask me for my area'),
    'I have stopped using and charging it. Please advise safe handling and confirm whether a safe pickup can be arranged before transport.'
  ].join('\n'));

  const serviceSchema = {
    '@graph': [{
      '@type': 'Service',
      '@id': canonical + '#service',
      name: 'MacBook Air and MacBook Pro Battery Diagnosis and Replacement in Kuwait',
      alternateName: 'MacBook Battery Replacement Kuwait',
      serviceType: 'MacBook battery health assessment, charging-path diagnosis and model-matched battery installation',
      description: page.description,
      url: canonical,
      image: [
        business.websiteUrl + IMAGES.macbook.service.src,
        business.websiteUrl + IMAGES.macbook.swollenBattery1.src,
        business.websiteUrl + IMAGES.macbook.macbookProBatteryRemovalRepair.src
      ],
      areaServed: { '@type': 'Country', name: 'Kuwait' },
      provider: { '@id': business.websiteUrl + '/#business' },
      availableChannel: {
        '@type': 'ServiceChannel',
        servicePhone: '+' + business.telephone,
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
        name: 'MacBook battery installation labour — starting price',
        description: 'Labour starts from 8 KWD and excludes the battery. The complete installed quote depends on the exact MacBook model, compatible battery, documented part grade and availability; it is confirmed before paid work.',
        priceCurrency: 'KWD',
        priceSpecification: {
          '@type': 'PriceSpecification',
          minPrice: 8,
          priceCurrency: 'KWD',
          description: 'Starting labour only; battery not included.'
        }
      }
    }]
  };

  const faqSchema = {
    '@graph': [{
      '@type': 'FAQPage',
      '@id': canonical + '#faq',
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

      <div className="min-h-screen bg-transparent pb-20 pt-8 text-white sm:pt-16 lg:pt-24">
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
              <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-cyan-400">MacBook Air &amp; MacBook Pro • Hawalli lab • Kuwait-wide pickup</p>
              <h1 className="text-3xl font-black leading-tight text-white sm:text-5xl">MacBook Battery Replacement in Kuwait — Model-Matched, Installed &amp; Checked</h1>
              <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                Seeing Service Recommended, losing charge quickly, shutting down early, or stuck at 1%? Before fitting a battery, KCROC checks the battery and the relevant USB-C or MagSafe charging path. We match the replacement to your MacBook, explain the available part grade and send the complete installed price before you approve paid work.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 font-extrabold text-slate-950 hover:brightness-95">
                  <MessageCircle className="h-5 w-5" aria-hidden="true" /> Get My Installed Quote
                </a>
                <Link to="/book" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-950/50 px-5 py-3 font-bold text-white hover:border-cyan-500/50">
                  <Truck className="h-5 w-5" aria-hidden="true" /> Arrange Free Kuwait Pickup
                </Link>
              </div>
              <div className="mt-7 grid gap-3 sm:grid-cols-4">
                <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
                  <strong className="block text-lg text-cyan-300">Free</strong>
                  <span className="text-xs leading-5 text-slate-400">Initial battery and charging diagnosis</span>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
                  <strong className="block text-lg text-cyan-300">Installed total</strong>
                  <span className="text-xs leading-5 text-slate-400">Part and labour quoted together before work</span>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
                  <strong className="block text-lg text-cyan-300">30 days</strong>
                  <span className="text-xs leading-5 text-slate-400">Warranty on covered completed repairs</span>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
                  <strong className="block text-lg text-cyan-300">No Fix, No Fee</strong>
                  <span className="text-xs leading-5 text-slate-400">KCROC published policy, subject to its terms</span>
                </div>
              </div>
            </div>
            <figure className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
              <img src={IMAGES.macbook.service.src} alt="MacBook internal battery service and replacement at KCROC in Hawalli, Kuwait" width={IMAGES.macbook.service.width} height={IMAGES.macbook.service.height} fetchPriority="high" decoding="async" className="h-full max-h-[440px] w-full object-cover" />
              <figcaption className="px-4 py-3 text-sm leading-6 text-slate-400">We verify the exact model and compatible battery before confirming the installed price.</figcaption>
            </figure>
          </header>

          <section className="mt-8 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]" aria-label="Installed price and quote contents">
            <article className="rounded-2xl border border-cyan-900/50 bg-slate-900/55 p-6 sm:p-8">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-400">No parts-price surprise</p>
              <h2 className="mt-2 text-2xl font-black text-white">One installed quote. Battery and labour shown together.</h2>
              <p className="mt-3 leading-7 text-slate-300">Your quote is built around the exact A-number, compatible battery assembly, documented part grade and current stock. We give you the complete amount in KWD before any paid work begins.</p>
              <div className="mt-5 rounded-xl border border-slate-700 bg-slate-950/60 p-4">
                <strong className="text-xl text-cyan-300">Labour from 8 KWD</strong>
                <p className="mt-1 text-sm leading-6 text-slate-400">This is the installation labour starting rate only — not the full installed price. The battery is additional. Ask for the all-in total for your exact model.</p>
              </div>
            </article>
            <article className="rounded-2xl border border-slate-800 bg-slate-900/45 p-6">
              <h2 className="text-lg font-black text-white">What your installed quote covers</h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-300">
                <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" /> Compatible battery assembly matched to the model</li>
                <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" /> Installation labour and internal fitment checks</li>
                <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" /> Battery reporting and charging verification where supported</li>
                <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" /> Part grade, warranty and total confirmed before approval</li>
              </ul>
            </article>
          </section>

          <section id="quote-builder" className="mt-12 scroll-mt-24 rounded-3xl border border-cyan-900/50 bg-slate-900/55 p-6 sm:p-9" aria-labelledby="quote-builder-heading">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-400">One-tap WhatsApp quote</p>
              <h2 id="quote-builder-heading" className="mt-2 text-2xl font-black text-white sm:text-3xl">Choose your MacBook and symptom</h2>
              <p className="mt-3 leading-7 text-slate-400">No screenshot or serial number is required to start. Choose the closest model, or select “I am not sure”; tell us the pickup area and we will help identify the correct battery.</p>
            </div>
            <div className="mt-7">
              <h3 className="text-sm font-bold text-white">1. Which MacBook do you have?</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {MODEL_CHOICES.map((model) => (
                  <button key={model} type="button" onClick={() => setSelectedModel(model)} aria-pressed={selectedModel === model} className={'rounded-full border px-4 py-2.5 text-left text-sm font-semibold transition-colors ' + (selectedModel === model ? 'border-cyan-400 bg-cyan-400/15 text-cyan-200' : 'border-slate-700 bg-slate-950/50 text-slate-300 hover:border-cyan-500/60')}>
                    {model}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-7">
              <h3 className="text-sm font-bold text-white">2. What is happening?</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {SYMPTOM_CHOICES.map((symptom) => (
                  <button key={symptom} type="button" onClick={() => setSelectedSymptom(symptom)} aria-pressed={selectedSymptom === symptom} className={'rounded-full border px-4 py-2.5 text-left text-sm font-semibold transition-colors ' + (selectedSymptom === symptom ? 'border-cyan-400 bg-cyan-400/15 text-cyan-200' : 'border-slate-700 bg-slate-950/50 text-slate-300 hover:border-cyan-500/60')}>
                    {symptom}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-7 grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
              <label className="block">
                <span className="text-sm font-bold text-white">3. Your Kuwait pickup area (optional)</span>
                <input value={pickupArea} onChange={(event) => setPickupArea(event.target.value)} placeholder="e.g. Salmiya, Mishref, Kuwait City" className="mt-2 min-h-12 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20" />
              </label>
              <a href={isSwollen ? swollenUrl : whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 font-extrabold text-slate-950 hover:brightness-95">
                <MessageCircle className="h-5 w-5" aria-hidden="true" /> {isSwollen ? 'Ask for Safe Swollen-Battery Pickup' : 'Send My MacBook Quote Request'}
              </a>
            </div>
            <p className="mt-4 text-xs leading-5 text-slate-500">WhatsApp opens with your selected model and symptom pre-filled. You can edit the message before sending.</p>
          </section>

          <section className="mt-14" aria-labelledby="model-number-heading">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-400">MacBook model and A-number guide</p>
            <h2 id="model-number-heading" className="mt-2 text-2xl font-black text-white sm:text-3xl">Find your MacBook battery model before requesting a price</h2>
            <p className="mt-3 max-w-4xl leading-7 text-slate-400">These are common A-number examples customers search for. They help us narrow down the correct battery, but they are not a substitute for checking the exact model identifier, year and part number. Newer and less common models can still be checked individually.</p>
            <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-800">
              <table className="w-full min-w-[760px] border-collapse text-left text-sm">
                <thead className="bg-slate-900 text-slate-300">
                  <tr>
                    <th scope="col" className="px-5 py-4 font-bold">MacBook family</th>
                    <th scope="col" className="px-5 py-4 font-bold">Common A-numbers</th>
                    <th scope="col" className="px-5 py-4 font-bold">Installed price</th>
                    <th scope="col" className="px-5 py-4 font-bold">Turnaround</th>
                  </tr>
                </thead>
                <tbody>
                  {MODEL_FAMILIES.map((row) => (
                    <tr key={row.family} className="border-t border-slate-800 bg-slate-950/50 align-top">
                      <th scope="row" className="px-5 py-4 font-semibold text-white">{row.family}<p className="mt-1 font-normal leading-5 text-slate-500">{row.note}</p></th>
                      <td className="px-5 py-4 leading-7 text-slate-300">{row.models}</td>
                      <td className="px-5 py-4 leading-6 text-cyan-200">Complete KWD quote after part and stock check</td>
                      <td className="px-5 py-4 leading-6 text-slate-300">Confirmed after compatibility and availability checks</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs leading-6 text-slate-500">Price transparency: the 8 KWD figure is starting labour only. We do not publish an installed range until the exact battery grade and supplier cost are verified. Every customer receives the all-in total before approving the repair.</p>
          </section>

          <section className="mt-14 grid gap-6 lg:grid-cols-3" aria-label="Battery package, charging diagnosis and optional thermal care">
            <article className="rounded-2xl border border-slate-800 bg-slate-900/45 p-6">
              <BatteryCharging className="h-7 w-7 text-cyan-300" aria-hidden="true" />
              <p className="mt-4 text-xs font-black uppercase tracking-[0.14em] text-cyan-400">Package 1</p>
              <h2 className="mt-2 text-xl font-black text-white">Complete installed battery replacement</h2>
              <p className="mt-3 text-sm leading-7 text-slate-400">For confirmed battery wear or failure. The quote combines the model-matched battery and installation, states the available part grade and warranty, and includes post-install battery-status and charging checks.</p>
              <p className="mt-4 text-sm font-semibold text-cyan-200">Request standard and premium-compatible options when verified stock is available.</p>
            </article>
            <article className="rounded-2xl border border-slate-800 bg-slate-900/45 p-6">
              <Cpu className="h-7 w-7 text-cyan-300" aria-hidden="true" />
              <p className="mt-4 text-xs font-black uppercase tracking-[0.14em] text-cyan-400">Package 2</p>
              <h2 className="mt-2 text-xl font-black text-white">Charging-circuit diagnosis and board repair</h2>
              <p className="mt-3 text-sm leading-7 text-slate-400">For a MacBook that will not charge, stays at 1%, disconnects intermittently or behaves the same with a known-good adapter. Where measurements point to the logic board, we investigate the model-specific USB-C power-delivery, charging-controller and power-rail stages before quoting a component-level repair.</p>
              <p className="mt-4 text-sm font-semibold text-cyan-200">A new battery is not recommended until the fault is identified.</p>
            </article>
            <article className="rounded-2xl border border-slate-800 bg-slate-900/45 p-6">
              <Thermometer className="h-7 w-7 text-cyan-300" aria-hidden="true" />
              <p className="mt-4 text-xs font-black uppercase tracking-[0.14em] text-cyan-400">Optional care</p>
              <h2 className="mt-2 text-xl font-black text-white">Cooling inspection while the MacBook is open</h2>
              <p className="mt-3 text-sm leading-7 text-slate-400">On compatible fan-equipped models, we can inspect fan and heatsink dust buildup and assess whether internal cleaning or thermal-interface service is justified. This is not a standard battery-replacement requirement, may not apply to every MacBook, and is separately quoted before work.</p>
              <p className="mt-4 text-sm font-semibold text-cyan-200">No automatic thermal add-on or unapproved charge.</p>
            </article>
          </section>

          <section className="mt-14 grid gap-8 lg:grid-cols-[1fr_0.95fr]" aria-labelledby="diagnostic-heading">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-400">Diagnosis before parts</p>
              <h2 id="diagnostic-heading" className="mt-2 text-2xl font-black text-white sm:text-3xl">How KCROC checks a MacBook battery before replacement</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  ['Identify the exact MacBook', 'Confirm the model family, screen size, year and A-number or model identifier. Similar-looking models can use different battery assemblies.'],
                  ['Review battery condition', 'Read macOS battery health and cycle information where available, then compare it with runtime, shutdown and percentage symptoms.'],
                  ['Separate battery from charging fault', 'Check the adapter, cable, USB-C or MagSafe input and relevant battery/charging behaviour before blaming the battery.'],
                  ['Inspect the board when indicated', 'If measurements point beyond the battery, investigate the model-specific power-delivery and charging path rather than swapping parts by guesswork. On applicable boards, examples can include CD3215 or CD3217 USB-C PD controllers, ISL9239 or ISL9240 charging controllers, and rails such as PPBUS_G3H. These are model-dependent examples, not a universal parts list.'],
                  ['Match the replacement', 'Confirm compatible part number, supplier availability and documented grade. We explain the options and total before approval.'],
                  ['Verify after installation', 'Review battery reporting and charging response, and check temperature behaviour during appropriate normal-load charging verification.']
                ].map(([title, body]) => (
                  <article key={title} className="rounded-2xl border border-slate-800 bg-slate-900/45 p-5">
                    <h3 className="font-bold text-white">{title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-400">{body}</p>
                  </article>
                ))}
              </div>
            </div>
            <aside className="rounded-2xl border border-slate-800 bg-slate-950/70 p-6">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-6 w-6 text-cyan-300" aria-hidden="true" />
                <h2 className="text-xl font-black text-white">What makes a useful battery diagnosis?</h2>
              </div>
              <p className="mt-4 leading-7 text-slate-300">A battery-health warning, high cycle count or short runtime is a clue—not a complete diagnosis. Apple notes that battery ageing is influenced by chemical age, temperature history and charging patterns. We use the Mac's own health reporting alongside physical symptoms and charging-path checks.</p>
              <div className="mt-5 space-y-3 text-sm">
                <a href="https://support.apple.com/en-kw/108376" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-3 text-cyan-300 underline underline-offset-4 hover:text-cyan-200">Apple: Service Recommended battery status <ArrowRight className="h-4 w-4 shrink-0" /></a>
                <a href="https://support.apple.com/en-euro/102589" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-3 text-cyan-300 underline underline-offset-4 hover:text-cyan-200">Apple: Battery health management and ageing <ArrowRight className="h-4 w-4 shrink-0" /></a>
                <a href="https://support.apple.com/en-au/102888" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-3 text-cyan-300 underline underline-offset-4 hover:text-cyan-200">Apple: How Mac battery cycles are counted <ArrowRight className="h-4 w-4 shrink-0" /></a>
              </div>
            </aside>
          </section>

          <section className="mt-14 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]" aria-labelledby="swollen-heading">
            <figure className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950">
              <img src={IMAGES.macbook.swollenBattery1.src} alt="Swollen MacBook battery requiring safe professional assessment" width={IMAGES.macbook.swollenBattery1.width} height={IMAGES.macbook.swollenBattery1.height} loading="lazy" decoding="async" className="h-full max-h-[360px] w-full object-cover" />
              <figcaption className="px-5 py-3 text-sm leading-6 text-slate-400">Do not press or attempt to remove a swollen lithium-ion battery.</figcaption>
            </figure>
            <div className="rounded-2xl border border-amber-700/40 bg-amber-950/20 p-6 sm:p-8">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-amber-300">Safety first</p>
              <h2 id="swollen-heading" className="mt-2 text-2xl font-black text-amber-100">Swollen battery or lifting trackpad? Stop using the MacBook.</h2>
              <p className="mt-4 leading-7 text-amber-50/90">A swollen pack can press against the trackpad, keyboard and internal components. Stop using and charging the device. Disconnect the charger only if safe; do not press the case, close it against resistance, puncture the pack or try to open the device yourself.</p>
              <p className="mt-3 leading-7 text-amber-50/90">Contact KCROC first for safety instructions. We will confirm whether and how a safe collection can be arranged for your area; do not place a visibly damaged battery into ordinary courier transport without prior instructions.</p>
              <a href={swollenUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-amber-300 px-5 py-3 font-extrabold text-amber-950 hover:brightness-95">
                <MessageCircle className="h-5 w-5" aria-hidden="true" /> Request Swollen-Battery Safety Advice
              </a>
            </div>
          </section>

          <section className="mt-14 rounded-2xl border border-slate-800 bg-slate-900/45 p-6 sm:p-8" aria-labelledby="identify-heading">
            <h2 id="identify-heading" className="text-2xl font-black text-white">How to identify your MacBook without taking a screenshot</h2>
            <div className="mt-5 grid gap-5 md:grid-cols-3">
              <div>
                <strong className="text-cyan-200">MacBook starts normally</strong>
                <p className="mt-2 text-sm leading-7 text-slate-400">Open Apple menu → About This Mac and tell us the model name, screen size and year shown. You do not need to send the serial number.</p>
              </div>
              <div>
                <strong className="text-cyan-200">MacBook does not start</strong>
                <p className="mt-2 text-sm leading-7 text-slate-400">Send the model name from your purchase record or a clear external photo of the bottom case if the A-number is legible.</p>
              </div>
              <div>
                <strong className="text-cyan-200">You cannot identify it</strong>
                <p className="mt-2 text-sm leading-7 text-slate-400">Choose “I am not sure” in the WhatsApp quote selector. We can guide you through the next safe identification step.</p>
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
            <h2 id="book-macbook-battery" className="mt-2 text-2xl font-black text-white sm:text-3xl">Get the correct battery and the complete price before you book</h2>
            <p className="mx-auto mt-4 max-w-3xl leading-7 text-slate-400">Choose your model and symptom above or send us a message with “I am not sure”. We will check the diagnosis and compatible part, then confirm the installed total, warranty and expected timing before paid work.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 font-bold text-slate-950"><MessageCircle className="h-5 w-5" aria-hidden="true" /> WhatsApp for Installed Price</a>
              <Link to="/book" className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-slate-700 px-6 py-3 font-bold text-white"><Truck className="h-5 w-5" aria-hidden="true" /> Book Free Pickup</Link>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-semibold text-slate-400">
              <span className="inline-flex items-center gap-2"><Zap className="h-4 w-4 text-cyan-300" /> Free initial diagnosis</span>
              <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-cyan-300" /> 30-day covered-work warranty</span>
              <span className="inline-flex items-center gap-2"><Truck className="h-4 w-4 text-cyan-300" /> Free Kuwait-wide pickup</span>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
