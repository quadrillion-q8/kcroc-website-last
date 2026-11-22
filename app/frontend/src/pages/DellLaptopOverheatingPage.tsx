// File: app/frontend/src/pages/DellLaptopOverheatingPage.tsx
import { Head } from 'vite-react-ssg';
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  AlertTriangle, CheckCircle2, XCircle, Thermometer, 
  HelpCircle, Wrench, ShieldAlert, Cpu, Fan, Wind, 
  Laptop 
} from 'lucide-react';

import SchemaMarkup from '../components/seo/SchemaMarkup';
import { KCROC_GRAPH } from '../data/graph';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StandaloneRelatedLinks } from '@/components/content/StandaloneRelatedLinks';
import { IMAGES } from '../constants/images';

export const DellLaptopOverheatingPage = () => {
  const business = KCROC_GRAPH.business!;
  const EN_PAGE_URL = `${business.websiteUrl}/guides/dell-laptop-overheating`;
  const AR_PAGE_URL = `${business.websiteUrl}/guides/ar/dell-laptop-overheating`;
  const PAGE_URL = EN_PAGE_URL;
  const AUTHOR_ID = `${business.websiteUrl}/author/imran#person`;
  const PUBLISHED_DATE = '2026-09-27';
  const DATE_MODIFIED = '2026-11-15';
  const LAST_UPDATED = 'November 15, 2026';
  const OG_IMAGE_URL = `${business.websiteUrl}${IMAGES.laptopHardware.cloggedFan.src}`;
  const PAGE_TITLE = 'Dell Laptop Overheating, Loud Fan & Thermal Shutdown Guide | KCROC';
  const PAGE_DESCRIPTION = 'Diagnose Dell laptop overheating, loud fans and thermal shutdowns with F12 ePSA codes, Dell Optimizer and AWCC profiles, BIOS, charger-identification and sleep-state checks.';
  

  const FAQS = [
    { q: 'Why does my Dell laptop get so hot?', a: "Common causes include restricted airflow, dust buildup inside the cooling system, sustained CPU/GPU load, fan problems and model-specific cooling limitations. High ambient temperature can reduce thermal headroom in any environment." },
    { q: 'Why does my Dell laptop shut down when it gets hot?', a: 'A laptop may shut down automatically when temperatures become unsafe, as a protective measure. However, unexpected shutdowns can also have power, firmware, hardware, or other causes.' },
    { q: 'How do I stop my Dell laptop from overheating?', a: 'Start with the basics: use it on a hard, flat surface, keep the vents clear, and check Task Manager for processes using unusually high CPU. If temperatures stay high after that, the cooling system likely needs inspection.' },
    { q: 'Can dust cause a Dell laptop to overheat?', a: 'Yes. Dust restricts airflow through the heatsink and fan, which is one of the most common causes of overheating in laptops that have been used for a couple of years without internal cleaning.' },
    { q: 'Does replacing thermal paste fix laptop overheating?', a: "It can, if degraded thermal interface material is the actual cause — but not every overheating issue is a thermal paste problem. Diagnosing the cause first avoids paying for a repair that doesn't address the real issue." },
    { q: 'Why is my Dell laptop fan so loud?', a: 'A loud fan is often the system compensating for higher internal temperatures or a performance profile. On some compatible G Series systems, Game Shift or G-Key mode can switch the system to a turbo performance preset and increase fan activity. Grinding or clicking noises specifically suggest a mechanical issue.' },
    { q: 'How do I run Dell laptop hardware diagnostics?', a: 'Restart or power on the Dell laptop, tap F12 repeatedly when the Dell logo appears, and choose Diagnostics from the One Time Boot Menu. The pre-boot test runs before Windows loads. Record the full error and validation codes if a test fails.' },
    { q: 'What does Dell fan error 2000-0511 mean?', a: 'Dell lists ePSA error 2000-0511 as a fan that failed to respond correctly to diagnostics. Check for external vent obstruction, repeat the test, and arrange model-specific inspection if the code returns. It does not identify the exact failed part by itself.' },
    { q: 'What does Dell fan error 2000-0512 mean?', a: 'Dell describes 2000-0512 as a fan running faster than expected. Dell notes that the cooling fan, temperature sensor or system board may be involved, so the code needs follow-up diagnosis rather than an automatic fan replacement.' },
    { q: 'Can a Dell thermal profile make the fan louder or the laptop warmer?', a: 'Yes. Supported Dell thermal profiles trade off processor performance, fan speed, noise and surface temperature. A Quiet profile can reduce fan and processor speeds, while Cool or Ultra Performance can change fan behaviour and system performance. Available modes vary by model and application.' },
    { q: 'Should I update my Dell BIOS to fix overheating?', a: 'Check the BIOS version and release notes for your exact Service Tag. Firmware updates can include platform-specific thermal or fan-control fixes, but they are not a substitute for clearing a blocked heatsink or repairing a failed fan. Follow Dell update precautions and do not interrupt the update.' },
    { q: 'When should I have my Dell laptop professionally inspected?', a: "If shutdowns are repeated, the fan sounds mechanically damaged, a pre-boot fan error returns, or temperatures stay high despite clear airflow and normal usage, have the exact cooling system inspected rather than continuing to run the machine hot." },
    { q: 'Which Dell application controls thermal settings in 2026?', a: 'Dell Optimizer 6.x is the consolidated application for most compatible Dell computers. Dell has published end-of-life and end-of-support dates for legacy MyDell, Dell Power Manager and Dell Optimizer 4.2 or older. Older systems may still show a legacy app installed, but compatibility and available thermal modes depend on the exact model. G Series and Alienware gaming systems use Alienware Command Center where supported.' },
    { q: 'Can Game Shift make a Dell G Series fan suddenly get louder?', a: 'Yes, on supported G Series models. The dedicated G-key can activate G-key mode and set performance to Turbo, which can increase fan activity. Some Alienware systems use a separate speedometer-marked function-key shortcut. The exact control varies by model, so check the keyboard marking and owner manual.' },
    { q: 'Why is my Dell CPU stuck at 0.39 GHz or another very low clock speed?', a: 'A very low clock is a symptom, not proof of CPU overheating. Check BIOS AC Adapter Type and wattage where available, the approved charger and connector, battery status, thermal profile and Windows power mode. Platform protection signals and power limits can reduce clock speed even when CPU core temperatures appear normal. Do not disable BD PROCHOT to mask the condition.' },
    { q: 'Why is my Dell laptop hot after being closed in a backpack?', a: 'Some Dell laptops use Windows Modern Standby (S0 Low Power Idle), which permits limited background activity during sleep. Use powercfg /a to check supported sleep states and powercfg /sleepstudy to investigate long screen-off sessions or excessive battery drain. Until resolved, use Hibernate or Shut Down before carrying the laptop in a closed bag.' },
    { q: 'What does Dell ePSA error 2000-0712 mean?', a: 'Dell’s general ePSA table describes 2000-0712 as a fan that failed to respond correctly, with BIOS detecting repeated issues while setting fan speed. A separate Dell KB documents a false 2000-0712 case on the Dell Tower DT1265 with BIOS 1.2.1 or 2.0.2 because the system checked for a second fan that was not installed in some configurations; BIOS 2.2.1 or later fixes that specific desktop issue. Check the exact model and BIOS release notes before concluding that the fan must be replaced.' },
  ];

  const GUIDE_SCHEMA = [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': AUTHOR_ID,
      name: 'Imran Natiq',
      url: `${business.websiteUrl}/author/imran`,
      jobTitle: 'Founder & Lead Technician',
      worksFor: { '@id': `${business.websiteUrl}/#business` },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      '@id': `${PAGE_URL}#article`,
      headline: 'Dell Laptop Overheating, Loud Fan & Thermal Shutdown Guide',
      description: PAGE_DESCRIPTION,
      url: PAGE_URL,
      image: [OG_IMAGE_URL],
      author: { '@id': AUTHOR_ID },
      publisher: { '@id': `${business.websiteUrl}/#business` },
      isPartOf: { '@id': `${business.websiteUrl}/#website` },
      mainEntityOfPage: { '@type': 'WebPage', '@id': PAGE_URL },
      datePublished: PUBLISHED_DATE,
      dateModified: DATE_MODIFIED,
      inLanguage: 'en',
      articleSection: 'Dell Laptop Troubleshooting',
      proficiencyLevel: 'Intermediate',
      keywords: [
        'Dell laptop overheating',
        'Dell laptop fan loud',
        'Dell Inspiron overheating',
        'Dell XPS thermal throttling',
        'Dell fan error 2000-0511',
        'Dell fan error 2000-0512',
        'Dell Optimizer 6.x thermal settings',
        'Dell G15 Game Shift G-Mode',
        'Dell laptop unknown AC adapter CPU throttling',
        'Dell laptop Modern Standby overheating',
      ],
      about: [
        { '@type': 'Brand', name: 'Dell' },
        { '@type': 'Thing', name: 'Laptop thermal management' },
        { '@type': 'Thing', name: 'Dell pre-boot diagnostics' },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${PAGE_URL}#faq`,
      mainEntity: FAQS.map(faq => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a }
      }))
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      '@id': `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: business.websiteUrl },
        { '@type': 'ListItem', position: 2, name: 'Guides', item: `${business.websiteUrl}/guides` },
        { '@type': 'ListItem', position: 3, name: 'Dell Laptop Overheating', item: PAGE_URL },
      ],
    },
  ];

  const DIAGNOSTIC_TABLE = [
    { symptom: 'Fan constantly at maximum speed', cause: 'High CPU load, restricted airflow, or a thermal problem' },
    { symptom: 'Grinding or clicking fan noise', cause: 'Fan bearing or other mechanical failure' },
    { symptom: 'Sudden shutdown under load', cause: 'Thermal protection triggering, or a power-related issue' },
    { symptom: 'Hot chassis but low CPU usage', cause: 'Cooling-system or airflow issue' },
    { symptom: 'High temperatures after years of use', cause: 'Dust buildup or degraded thermal interface material' },
    { symptom: 'Slow performance during heavy use', cause: 'Thermal throttling' },
    { symptom: 'Overheating immediately after startup', cause: 'Background process, fan failure, or a sensor/system issue' },
  ];

  const MISTAKES_TO_AVOID = [
    'Using the laptop on a bed, blanket, or other soft surface.',
    'Blocking the intake or exhaust vents while the laptop is running.',
    'Inserting objects into the fan assembly.',
    'Continuing to operate a laptop that is repeatedly shutting down from overheating.',
    'Applying thermal paste without first identifying the exact model and cooling assembly.',
    'Assuming every Dell laptop has the same internal cooling design. Different Dell families and generations can use very different cooling assemblies.',
  ];

  const REPAIR_TRIGGERS = [
    'The laptop shuts down repeatedly, even after basic troubleshooting.',
    'The fan makes grinding or clicking noises.',
    'The fan does not appear to spin up under load.',
    'Temperatures remain excessive despite clear, unobstructed airflow.',
    'Performance repeatedly throttles even under normal, everyday workloads.',
    'The machine has accumulated significant internal dust over several years of use.',
    "Thermal paste or thermal pad service is suspected but hasn't been done.",
    'The laptop has been exposed to liquid or physical impact damage.',
  ];

  return (
    <div className="min-h-screen bg-transparent text-slate-300 selection:bg-cyan-500/30 pb-24">
      <Head htmlAttributes={{ lang: 'en' }}>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESCRIPTION} />
        <link rel="canonical" href={PAGE_URL} />
        <link rel="alternate" hrefLang="en-KW" href={EN_PAGE_URL} />
        <link rel="alternate" hrefLang="ar-KW" href={AR_PAGE_URL} />
        <link rel="alternate" hrefLang="x-default" href={EN_PAGE_URL} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta property="og:image" content={OG_IMAGE_URL} />
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="600" />
        <meta property="og:image:alt" content="Dusty laptop cooling fan and heatsink airflow path" />
        <meta property="og:locale" content="en" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={OG_IMAGE_URL} />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:type" content="article" />
      </Head>

      <SchemaMarkup schema={{ '@graph': GUIDE_SCHEMA }} />

      {/* Breadcrumb */}
      <div className="pt-20 sm:pt-24 px-4 sm:px-6">
        <div className="container mx-auto max-w-5xl text-xs sm:text-sm text-slate-400 flex flex-wrap items-center gap-2">
          <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link> <span>/</span>
          <span className="text-slate-300">Guides</span> <span>/</span>
          <span className="text-cyan-400">Dell Overheating</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-8 pb-12 sm:pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-orange-500/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(239,68,68,0.08),transparent_50%)]"></div>

        <div className="container mx-auto max-w-5xl relative z-10 text-center">
          <Badge className="bg-red-500/20 text-red-300 border-red-500/30 px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide">
            <Thermometer className="w-4 h-4 mr-2 inline" /> Troubleshooting Guide
          </Badge>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6 tracking-tight">
            Dell Laptop <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
              Overheating, Loud Fan & Thermal Shutdown Guide
            </span>
          </h1>
          <p className="text-sm sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Is your Dell laptop running loud, getting unusually hot, or shutting down under load? Learn Dell-specific diagnostics, fan error codes, thermal profiles and model-family checks.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs sm:text-sm text-slate-400">
            <span>Written by <a href={`${business.websiteUrl}/author/imran`} className="text-cyan-300 hover:underline">Imran Natiq</a>, Founder &amp; Lead Technician</span>
            <span aria-hidden="true">·</span>
            <time dateTime={DATE_MODIFIED}>Updated {LAST_UPDATED}</time>
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-12 space-y-16">
        
        {/* Quick Answer */}
        <section className="bg-slate-900/60 border border-slate-800 p-6 sm:p-10 rounded-3xl shadow-2xl backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <AlertTriangle className="text-red-400 w-6 h-6" /> The Quick Answer
          </h2>
          <p className="text-slate-300 leading-relaxed text-lg m-0">
            A Dell laptop that becomes unusually hot can be affected by restricted airflow, dust buildup, high CPU usage, fan problems, thermal-interface condition, or another hardware or software issue. This guide stays focused on Dell hardware, firmware and utilities. For platform-independent temperature interpretation, sensor explanations and general cooling checks, continue to the <Link to="/guides/why-is-my-laptop-so-hot" className="text-cyan-300 hover:underline">universal laptop overheating guide</Link>; it is the main resource for all laptop brands. Start with the low-risk checks below. If the laptop repeatedly shuts down, the fan behaves abnormally, or temperatures remain high after basic checks, the cooling system should be professionally inspected rather than assuming thermal paste is the answer.
          </p>
          <p className="text-slate-400 leading-relaxed mt-5 mb-0">
            This guide applies across Dell laptop families including Inspiron, Latitude, Vostro, XPS, Precision, G Series, and Alienware. The exact cooling design varies by model and generation, so internal repair steps should always be matched to the specific service manual and hardware configuration.
          </p>
          <div className="mt-6 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5">
            <h3 className="font-bold text-amber-200 mb-2">Normal or not?</h3>
            <p className="text-sm leading-6 text-slate-300 mb-0">
              A Dell fan becoming louder when a game, render, update or other heavy task starts is often normal thermal control. It is more concerning when the fan grinds or clicks, a fan diagnostic fails, the laptop shuts down, performance drops sharply during light work, or high fan speed continues after the workload has ended. There is no single temperature limit for every Dell model: use the <Link to="/guides/why-is-my-laptop-so-hot" className="text-cyan-300 hover:underline">universal temperature guide</Link> for sensor interpretation, then check your exact Dell model documentation.
            </p>
          </div>
        </section>

        <section id="dell-quick-navigation" className="scroll-mt-28 rounded-3xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <Badge className="bg-cyan-500/10 text-cyan-300 border-cyan-500/20">Four-layer diagnostic workflow</Badge>
            <span className="text-xs uppercase tracking-wider text-slate-500">Start with low-risk checks</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Quick Navigation</h2>
          <ol className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-sm leading-6">
            <li><a href="#dell-preboot-diagnostics" className="text-cyan-300 hover:underline">1. Layer 1 — F12 pre-boot diagnostics and ePSA codes</a></li>
            <li><a href="#dell-thermal-profiles" className="text-cyan-300 hover:underline">2. Layer 2 — Dell Optimizer, legacy utilities and AWCC profiles</a></li>
            <li><a href="#dell-bios-updates" className="text-cyan-300 hover:underline">3. Layer 3 — BIOS, EC, charger ID and Modern Standby</a></li>
            <li><a href="#dell-model-families" className="text-cyan-300 hover:underline">4. Layer 4 — Model-family cooling and hardware checks</a></li>
            <li><a href="#dell-symptoms-and-causes" className="text-cyan-300 hover:underline">Warning symptoms and common causes</a></li>
            <li><a href="#dell-symptom-checker" className="text-cyan-300 hover:underline">Symptom-to-cause diagnostic matrix</a></li>
            <li><a href="#dell-safe-checks" className="text-cyan-300 hover:underline">Safe DIY checks and escalation signs</a></li>
            <li><a href="#dell-faq" className="text-cyan-300 hover:underline">Frequently asked questions</a></li>
            <li><a href="#official-dell-references" className="text-cyan-300 hover:underline">Official technical references</a></li>
          </ol>
        </section>

        {/* Symptoms & Causes Grid */}
        <div id="dell-symptoms-and-causes" className="grid md:grid-cols-2 gap-6 scroll-mt-28">
          <Card className="bg-brand-dark/50 border-slate-800">
            <CardHeader className="border-b border-slate-800/50 pb-4">
              <CardTitle className="text-xl text-white flex items-center gap-2">
                <Thermometer className="text-orange-400 w-5 h-5" /> Warning Symptoms
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-4">
                {[
                  "Fan runs continuously at high speed or makes unusual grinding noises.",
                  "Bottom of the laptop becomes uncomfortably hot during normal use.",
                  "Laptop shuts down or restarts unexpectedly during demanding tasks.",
                  "Performance drops, stutters, or freezes due to thermal throttling.",
                  "The laptop becomes significantly hotter than it was when new."
                ].map((symptom, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed">
                    <AlertTriangle className="w-4 h-4 text-orange-400 flex-shrink-0 mt-1" />
                    <span>{symptom}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-brand-dark/50 border-slate-800">
            <CardHeader className="border-b border-slate-800/50 pb-4">
              <CardTitle className="text-xl text-white flex items-center gap-2">
                <Cpu className="text-cyan-400 w-5 h-5" /> Common Causes
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-4">
                {[
                  "Dust Accumulation: Restricts airflow through the fan and heatsink fins.",
                  "Restricted Airflow: Using the laptop on beds or blankets suffocates the intake.",
                  "Thermal-interface condition: Paste or pads can contribute to heat problems, but their condition should be assessed alongside airflow, fan operation and heatsink mounting.",
                  "Fan Problems: A worn or failing cooling fan stops moving enough air.",
                  "High Ambient Temperature: Elevated room temperature reduces available thermal headroom, so the same workload can produce higher temperatures than it would in a cooler environment."
                ].map((cause, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed">
                    <Wind className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-1" />
                    <span>{cause}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Dell-specific diagnosis: keep the broad temperature guidance in the universal guide. */}
        <section id="dell-preboot-diagnostics" className="scroll-mt-28 rounded-3xl border border-cyan-500/20 bg-slate-900/60 p-6 sm:p-9">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge className="bg-cyan-500/10 text-cyan-300 border-cyan-500/20">Layer 1 — pre-boot diagnostics</Badge>
            <span className="text-xs uppercase tracking-wider text-slate-500">Before opening Windows</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5">Run Dell Pre-Boot Diagnostics (F12)</h2>
          <p className="text-slate-300 leading-7 mb-5">
            Dell's built-in pre-boot diagnostics can test hardware before Windows loads. This is useful when a Dell fan is noisy, fails to respond, or the laptop shuts down under load. The exact screens and available tests vary by model and BIOS version.
          </p>
          <ol className="list-decimal pl-6 space-y-3 text-sm sm:text-base leading-7 text-slate-300">
            <li>Save your work and shut down the laptop normally.</li>
            <li>Power it on and tap <strong className="text-white">F12 repeatedly</strong> when the Dell logo appears.</li>
            <li>In the One Time Boot Menu, choose <strong className="text-white">Diagnostics</strong>.</li>
            <li>Allow the quick test to complete. Use Advanced Test only when the diagnostic interface offers the specific component test you need.</li>
            <li>Photograph or write down the complete error code and validation code before exiting.</li>
          </ol>
          <div className="grid md:grid-cols-3 gap-4 mt-7">
            <div className="rounded-2xl border border-slate-700 bg-slate-950/70 p-5">
              <p className="font-mono text-lg font-bold text-red-300 mb-2">2000-0501</p>
              <h3 className="font-semibold text-white mb-2">Fan functional test failed</h3>
              <p className="text-sm leading-6 text-slate-400 mb-0">Dell describes this as one or more cooling fans failing the functional test. Check for external vent obstruction and repeat the test.</p>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-950/70 p-5">
              <p className="font-mono text-lg font-bold text-red-300 mb-2">2000-0511</p>
              <h3 className="font-semibold text-white mb-2">Fan did not respond correctly</h3>
              <p className="text-sm leading-6 text-slate-400 mb-0">The fan is not responding to the diagnostic tool. This is a diagnostic result, not proof that the fan alone is the failed part.</p>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-slate-950/70 p-5">
              <p className="font-mono text-lg font-bold text-amber-300 mb-2">2000-0512</p>
              <h3 className="font-semibold text-white mb-2">Fan running faster than expected</h3>
              <p className="text-sm leading-6 text-slate-400 mb-0">Dell notes possible fan, temperature-sensor or system-board involvement. Further diagnosis is needed before replacing hardware.</p>
            </div>
          </div>
          <div className="mt-6 rounded-2xl border border-amber-500/25 bg-amber-500/5 p-5">
            <h3 className="font-semibold text-amber-200 mb-2">Important boundary for error 2000-0712</h3>
            <p className="text-sm leading-6 text-slate-300 mb-0">
              Dell's general ePSA reference also lists 2000-0712 as a fan that failed to respond correctly, with BIOS detecting repeated issues while setting fan speed. Treat it as a fan-response diagnostic that needs the exact model's follow-up steps; it is not a universal airflow or shroud diagnosis. Separately, Dell KB 000480910 documents a known false 2000-0712 / 2000-0511 fan-check on the <strong>Dell Tower DT1265</strong> with BIOS 1.2.1 or 2.0.2, where firmware checked for a second system fan that was not installed. Dell identifies BIOS 2.2.1 or later as the fix for that specific desktop issue. This desktop exception should not be generalized to laptops.
            </p>
          </div>
          <p className="text-sm text-slate-400 leading-6 mt-5 mb-0">
            The Windows SupportAssist application can also offer hardware scans and update checks on supported systems. For a recorded pre-boot result, use the F12 Diagnostics path above. A passing quick test does not rule out every intermittent fan, airflow or thermal problem.
          </p>
        </section>

        <section id="dell-thermal-profiles" className="scroll-mt-28">
          <Badge className="bg-cyan-500/10 text-cyan-300 border-cyan-500/20 mb-3">Layer 2 — software and performance profiles</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5">Check Dell Thermal Profiles Before Assuming a Hardware Fault</h2>
          <p className="text-slate-300 leading-7 mb-5">
            Dell thermal controls are model-dependent. Dell Optimizer 6.0 and newer consolidates features from several older applications on <strong>most compatible Dell computers</strong>, but it is not a universal utility for every Dell generation or product family. Dell's transition notice lists MyDell, Dell Power Manager and Dell Optimizer 4.2 and older as legacy applications with published end-of-life and end-of-support dates. An older laptop may still have one of these applications installed, but an installed legacy utility should not be described as currently supported.
          </p>
          <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-5 mb-6">
            <h3 className="font-semibold text-white mb-2">Dell utility lifecycle — verified dates</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm leading-6 text-slate-300">
              <li><strong>MyDell:</strong> end of life June 23, 2025; end of support December 31, 2025.</li>
              <li><strong>Dell Power Manager:</strong> end of life October 20, 2025; end of support December 31, 2025.</li>
              <li><strong>Dell Optimizer 4.2 and older:</strong> end of life June 23, 2025; end of support June 30, 2026.</li>
              <li><strong>Dell Optimizer 6.x:</strong> the current consolidated application for most compatible Dell systems; availability and individual features still depend on the exact model.</li>
            </ul>
            <p className="text-xs leading-5 text-slate-400 mt-3 mb-0">Source: Dell KB 000226259. Check the Service Tag on Dell Support before installing or replacing any OEM utility.</p>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="p-4">Profile</th>
                  <th className="p-4">Typical behaviour</th>
                  <th className="p-4">What to watch for</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 bg-slate-900/40 text-slate-300">
                <tr><td className="p-4 font-semibold text-cyan-300">Optimized</td><td className="p-4">Balances performance, fan noise and temperature.</td><td className="p-4">A useful baseline for ordinary troubleshooting.</td></tr>
                <tr><td className="p-4 font-semibold text-cyan-300">Cool</td><td className="p-4">Raises fan speed to keep the system surface cooler.</td><td className="p-4">More fan noise and sometimes reduced performance.</td></tr>
                <tr><td className="p-4 font-semibold text-cyan-300">Quiet</td><td className="p-4">Reduces fan and processor speed to lower noise.</td><td className="p-4">The chassis may feel warmer and performance may be lower.</td></tr>
                <tr><td className="p-4 font-semibold text-cyan-300">Ultra Performance</td><td className="p-4">Raises processor and cooling-fan speeds for higher performance.</td><td className="p-4">Can create more noise and a warmer surface under sustained load.</td></tr>
              </tbody>
            </table>
          </div>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
              <h3 className="font-semibold text-white mb-2">XPS, Inspiron and Vostro</h3>
              <p className="text-sm leading-6 text-slate-400 mb-0">Check the Dell Support software list for the exact Service Tag. Compatible newer systems may use Dell Optimizer 6.x; older models may still show a legacy MyDell or Dell Power Manager installation, whose published support periods have ended.</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
              <h3 className="font-semibold text-white mb-2">Latitude and Precision</h3>
              <p className="text-sm leading-6 text-slate-400 mb-0">Check Dell Optimizer where supported, along with any Thermal Management option exposed in BIOS Setup. Not every model provides every control.</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
              <h3 className="font-semibold text-white mb-2">G Series and Alienware</h3>
              <p className="text-sm leading-6 text-slate-400 mb-0">Use Alienware Command Center (AWCC) and the profile supported by the exact model. Some G Series laptops include a dedicated G-key that activates G-key mode and sets performance to Turbo. Dell confirms that predefined AWCC performance presets are unavailable while this mode is active. Some Alienware systems use a separate function-key shortcut marked with a speedometer icon. Check the exact keyboard marking and owner manual rather than assuming a universal Fn + F9 shortcut. Higher performance can bring higher fan speed, so check whether a boost mode is active before diagnosing a sudden fan ramp as a fault.</p>
            </div>
          </div>
          <p className="text-xs leading-5 text-slate-500 mt-4">Important: profile names and availability are not universal across Dell models. Do not install a utility or force a profile intended for a different product.</p>
        </section>

        <section id="dell-bios-updates" className="scroll-mt-28 rounded-3xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Badge className="bg-cyan-500/10 text-cyan-300 border-cyan-500/20">Layer 3 — firmware and platform checks</Badge>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5">BIOS, Embedded Controller, Charger Identification and Sleep-State Diagnostics</h2>

          <h3 className="text-xl font-bold text-white mb-3">Check the exact Dell BIOS and embedded-controller behaviour</h3>
          <p className="text-slate-300 leading-7">
            BIOS firmware and the embedded controller (EC) participate in platform power, fan and thermal management. A firmware update can address a model-specific control issue, but it cannot clear compacted dust, repair a worn fan bearing or restore a damaged cable. Use only the BIOS package published for the exact Service Tag and read its release notes before updating.
          </p>
          <ol className="list-decimal pl-6 space-y-2 text-sm leading-6 text-slate-300 mt-4">
            <li>Find the model and Service Tag on the chassis or in Dell BIOS Setup (<strong>F2</strong>).</li>
            <li>In Windows, press <strong>Win + R</strong>, enter <code>msinfo32</code>, and record BIOS Version/Date.</li>
            <li>Open Dell Drivers &amp; Downloads for that Service Tag and review the BIOS release notes and prerequisites.</li>
            <li>Use reliable AC power, follow Dell's encryption and update precautions, and never interrupt a BIOS or firmware flash.</li>
            <li>Repeat the same diagnostic test or workload afterward so the comparison is meaningful.</li>
          </ol>

          <div className="grid md:grid-cols-2 gap-5 mt-7">
            <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-5">
              <h3 className="text-lg font-bold text-white mb-3">Very low CPU clocks with ordinary core temperatures</h3>
              <p className="text-sm leading-6 text-slate-300">
                A Dell processor that appears stuck around 0.39–0.79 GHz on some models is showing a symptom, not a diagnosis. Low clocks can result from thermal limits, platform power limits, an adapter that is not identified correctly, battery or charging faults, or an external platform-protection signal. A normal CPU core temperature does not rule out a VRM, adapter, battery or EC-related limit; the exact minimum clock varies by processor.
              </p>
              <ol className="list-decimal pl-5 space-y-2 text-sm leading-6 text-slate-300 mt-3">
                <li>Restart and press <strong>F2</strong> to open BIOS Setup.</li>
                <li>Where the BIOS exposes it, check <strong>AC Adapter Type</strong> or adapter wattage. An <strong>Unknown</strong> or incorrect value is a reason to investigate the charger-identification path.</li>
                <li>Verify that the adapter is an appropriate Dell-compatible model and wattage; inspect the cable, barrel connector centre pin or USB-C port/cable for looseness or damage.</li>
                <li>Check the battery health/status and compare behaviour on a known-good, correctly rated adapter. Do not assume the battery is the cause without testing.</li>
                <li>Return the Dell thermal profile and Windows power mode to a normal baseline, then compare clocks and workload.</li>
              </ol>
              <p className="text-xs leading-5 text-amber-200 mt-4 mb-0">
                PROCHOT# / BD PROCHOT is a platform protection mechanism, not an instruction to bypass throttling. An external platform signal can request a very low processor performance state. Do not disable BD PROCHOT, alter hidden throttle registers or use tuning software to force the CPU to ignore a protection signal; first find why the platform is asserting it.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-5">
              <h3 className="text-lg font-bold text-white mb-3">Laptop hot after being closed in a backpack</h3>
              <p className="text-sm leading-6 text-slate-300">
                Many newer Dell systems support Windows Modern Standby (S0 Low Power Idle). During this sleep model, the system can perform limited background activity and may briefly enter active screen-off phases. A laptop that is unexpectedly warm and has lost substantial battery charge after being carried may not have reached or remained in its low-power sleep phase. Modern Standby itself is not proof of a fault; inspect the recorded session.
              </p>
              <ol className="list-decimal pl-5 space-y-2 text-sm leading-6 text-slate-300 mt-3">
                <li>Open Command Prompt and run <code>powercfg /a</code> to see whether <strong>Standby (S0 Low Power Idle)</strong> is supported.</li>
                <li>Run <code>powercfg /sleepstudy</code> in an elevated Command Prompt and review the generated report for long screen-off sessions, high drain or activity that prevented low-power residency.</li>
                <li>Check the Windows lid-close action, scheduled maintenance, connected USB devices and docking accessories if the laptop is waking or staying active.</li>
                <li>Until the issue is understood, use <strong>Hibernate</strong> or a full shutdown before placing a warm laptop in a zipped bag or sleeve. Do not rely on the screen merely turning off.</li>
              </ol>
              <p className="text-xs leading-5 text-slate-400 mt-4 mb-0">Dell's Modern Standby troubleshooting guidance and Microsoft's SleepStudy documentation explain how to identify supported sleep states and investigate battery drain.</p>
            </div>
          </div>
          <p className="text-sm leading-6 text-slate-400 mt-6 mb-0">
            Firmware, adapter identification and sleep-state checks are model- and configuration-dependent. If BIOS does not show adapter identity, or a power/thermal lock persists after the correct adapter and normal profile are confirmed, stop repeated stress testing and arrange a model-specific power-path and board-level inspection.
          </p>
        </section>

        <section id="dell-model-families" className="scroll-mt-28">
          <Badge className="bg-cyan-500/10 text-cyan-300 border-cyan-500/20 mb-3">Layer 4 — model-specific cooling checks</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5">Dell Model-Family Notes: What to Check First</h2>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
              <h3 className="text-xl font-bold text-white mb-3">Dell XPS</h3>
              <p className="text-sm leading-7 text-slate-300 mb-0">Thin, compact designs have less room for large cooling assemblies. During sustained CPU/GPU work, fan ramp-up and a reduction in clocks or power can be part of the system's thermal control. Look for persistent throttling during light work, sudden shutdowns, abnormal noises or a fan diagnostic failure—not heat alone.</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
              <h3 className="text-xl font-bold text-white mb-3">Dell G Series and Alienware</h3>
              <p className="text-sm leading-7 text-slate-300 mb-0">Gaming can load the CPU and GPU at the same time. Check the active profile in the relevant Dell or Alienware utility, keep all intake and exhaust paths clear, and compare results using the same game, settings and power state.</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
              <h3 className="text-xl font-bold text-white mb-3">Inspiron and Vostro</h3>
              <p className="text-sm leading-7 text-slate-300 mb-0">For a laptop that has been used for years, inspect the airflow path, heatsink fins and fan condition before assuming the thermal paste is the cause. Dust loading, fan wear and a blocked exhaust can look similar from the outside.</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
              <h3 className="text-xl font-bold text-white mb-3">Latitude and Precision</h3>
              <p className="text-sm leading-7 text-slate-300 mb-0">Video meetings, docks, multiple displays, virtual machines, CAD and sustained workstation tasks can keep a system busy. Compare the actual workload and selected thermal profile before judging fan noise; then use BIOS and pre-boot diagnostics when symptoms persist.</p>
            </div>
          </div>
        </section>

        <section id="hot-ambient-conditions" className="scroll-mt-28 grid md:grid-cols-[1fr_.9fr] gap-6 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Why a Hot Room or Parked Car Changes the Result</h2>
            <p className="text-slate-300 leading-7">
              A laptop cools itself using the air around it. When intake air is already hot, the cooling system has less temperature headroom and may need higher fan speed or lower sustained power. Direct sunlight, a closed vehicle and an unventilated room can make a laptop behave very differently from the same machine on a desk in a climate-controlled space.
            </p>
            <p className="text-sm leading-6 text-slate-400 mb-0">Move the laptop to a shaded, ventilated place and let it return to a safe operating environment before testing. Never leave a powered laptop in a parked vehicle or use it on a surface that blocks its vents.</p>
          </div>
          <figure className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
            <img src={IMAGES.laptopHardware.cloggedFan.src} alt="Dust restricting airflow through a laptop cooling fan" width={800} height={600} loading="lazy" className="w-full h-auto" />
            <figcaption className="p-4 text-xs leading-5 text-slate-400">A blocked heatsink can compound the effect of warm intake air. Check external vents first; internal cleaning requires model-specific service steps.</figcaption>
          </figure>
        </section>

        <section id="dell-symptom-checker" className="scroll-mt-28 rounded-3xl border border-cyan-500/20 bg-slate-900/70 p-6 sm:p-9">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Dell Overheating Symptom-to-Cause Diagnostic Matrix</h2>
          <p className="text-slate-400 text-sm leading-6 mb-5">Every outcome below is rendered in the initial page HTML. Expand the symptom that best matches your Dell laptop. This is diagnostic triage, not a remote hardware diagnosis.</p>
          <div className="space-y-3">
            {[
              {
                title: '1. Fan is loud during light work or at idle',
                diagnosis: 'Possible causes include a background process, an aggressive thermal profile, restricted airflow or a fan-control issue. A loud fan alone does not prove that the fan is defective.',
                next: 'Check Task Manager for sustained CPU activity, return the supported Dell thermal profile to Optimized or Balanced, and check whether Game Shift is active on a compatible G Series model.',
                escalate: 'Have the cooling system checked if fan speed stays high at low workload, or if the fan grinds, clicks or vibrates.'
              },
              {
                title: '2. Fan gets louder during gaming or heavy work',
                diagnosis: 'A fan ramp during combined CPU/GPU load is often normal. High ambient temperature, a performance profile or restricted intake/exhaust can increase the fan response.',
                next: 'Use a hard, flat surface, keep all vents clear, check the selected Dell/AWCC profile and compare the same workload after returning to a normal profile.',
                escalate: 'Investigate if performance collapses, the system becomes unstable, the fan continues at high speed after the workload ends or the laptop shuts down.'
              },
              {
                title: '3. Laptop shuts down or restarts under load',
                diagnosis: 'Possible causes include a thermal protection event, fan or heatsink failure, an adapter/battery problem, firmware behaviour or another motherboard power fault.',
                next: 'Stop repeated stress testing. Save work, allow the system to cool in a ventilated place, then run F12 pre-boot diagnostics and record the complete error and validation code.',
                escalate: 'Repeated unexpected shutdowns require prompt cooling-system and power-path inspection even if a quick test passes.'
              },
              {
                title: '4. F12 reports a fan diagnostic code',
                diagnosis: 'Dell lists 2000-0501 as a failed fan functional test, 2000-0511 as a fan that did not respond correctly, 2000-0512 as a fan running faster than expected, and 2000-0712 as a fan-response error where BIOS detected repeated issues while setting fan speed. These codes do not independently identify the exact replaceable part.',
                next: 'Record the entire code and validation code, check for external vent obstruction, consult the Dell ePSA reference and check model-specific BIOS notes before repeating the test.',
                escalate: 'If the code returns or the fan makes mechanical noise, the fan, cable, sensor or system-board control path needs model-specific inspection. Treat 2000-0712 separately as described in the ePSA section.'
              },
              {
                title: '5. Performance drops or the CPU remains near 0.39–0.79 GHz',
                diagnosis: 'A very low clock can be caused by thermal throttling, an adapter that is not identified correctly, platform power limits, battery/charging faults or an external protection signal. Normal CPU core temperatures do not rule out every platform-level problem.',
                next: 'Check the Dell BIOS AC Adapter Type/wattage where available, verify the correct adapter and connection, review battery status, and compare clocks after returning thermal and Windows power modes to normal.',
                escalate: 'If the correct adapter is recognized and severe throttling persists during light work, stop stress tests and have the charging, EC and board power paths inspected. Do not disable BD PROCHOT.'
              }
            ].map((item) => (
              <details key={item.title} className="group rounded-2xl border border-slate-700 bg-slate-950/60 p-5">
                <summary className="cursor-pointer list-none text-base font-bold text-cyan-200 marker:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded">
                  <span className="flex items-start justify-between gap-4">
                    <span>{item.title}</span>
                    <span aria-hidden="true" className="text-cyan-400 transition-transform group-open:rotate-180">⌄</span>
                  </span>
                </summary>
                <p className="text-sm leading-7 text-slate-300 mt-4 mb-2">{item.diagnosis}</p>
                <p className="text-sm leading-7 text-slate-300 mb-2"><strong className="text-white">Safe next step:</strong> {item.next}</p>
                <p className="text-sm leading-7 text-amber-200 mb-0"><strong>When to escalate:</strong> {item.escalate}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-6 items-start">
          <figure className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
            <img src={IMAGES.laptopHardware.copperHeatsink3.src} alt="Laptop copper heatsink with dried thermal interface material" width={800} height={600} loading="lazy" className="w-full h-auto" />
            <figcaption className="p-4 text-xs leading-5 text-slate-400">Thermal interface condition is only one part of a cooling diagnosis; fan operation, heatsink contact and airflow matter too.</figcaption>
          </figure>
          <figure className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
            <img src={IMAGES.laptopHardware.fanReplace1.src} alt="Laptop cooling fan replacement assembly" width={800} height={600} loading="lazy" className="w-full h-auto" />
            <figcaption className="p-4 text-xs leading-5 text-slate-400">A replacement fan must match the exact Dell model and cooling assembly revision.</figcaption>
          </figure>
        </section>

                {/* Diagnostic Table */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">How to Tell What Is Causing It</h2>
          {/* 🚀 MOBILE TABLE FIX: was overflow-hidden, which on a ~320-375px
              viewport silently CLIPPED the longer "cause" cell text (e.g.
              "Thermal protection triggering, or a power-related issue")
              instead of letting it scroll — real content was invisible to
              mobile readers. overflow-x-auto (same pattern used elsewhere,
              e.g. BlogPostTemplate/LaptopBuyingGuide tables) makes the table
              horizontally scrollable instead of destroying its content. */}
          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full min-w-[480px] border-collapse text-left text-sm sm:text-base">
              <thead>
                <tr className="bg-slate-900 border-b border-slate-800">
                  <th className="py-4 px-6 font-bold text-white">If you notice this symptom...</th>
                  <th className="py-4 px-6 font-bold text-white border-l border-slate-800">It is likely caused by...</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 bg-slate-900/20">
                {DIAGNOSTIC_TABLE.map((row) => (
                  <tr key={row.symptom} className="hover:bg-slate-800/50 transition-colors">
                    <td className="py-4 px-6 text-cyan-300 font-medium">{row.symptom}</td>
                    <td className="py-4 px-6 text-slate-300 border-l border-slate-800/50">{row.cause}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* DIY Fixes & Warning */}
        <section id="dell-safe-checks" className="scroll-mt-28">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Safe DIY Checks You Can Try</h2>
          <div className="grid sm:grid-cols-3 gap-6 mb-8">
            <Card className="bg-slate-900/40 border-slate-800">
              <CardContent className="p-6">
                <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center mb-4 border border-cyan-500/20">
                  <Laptop className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">1. Use a Flat Surface</h3>
                <p className="text-sm text-slate-400">Place the laptop on a desk. Avoid beds, blankets, and cushions that sink in and block the bottom ventilation intakes.</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-900/40 border-slate-800">
              <CardContent className="p-6">
                <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center mb-4 border border-cyan-500/20">
                  <Cpu className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">2. Check CPU Usage</h3>
                <p className="text-sm text-slate-400">Press Ctrl+Shift+Esc to open Task Manager. Check if a rogue background process is pinning your CPU to 100%.</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-900/40 border-slate-800">
              <CardContent className="p-6">
                <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center mb-4 border border-cyan-500/20">
                  <Wind className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">3. Keep Vents Clear</h3>
                <p className="text-sm text-slate-400">Power off the laptop and ensure the external exhaust vents are free from visible dust and obstructions.</p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-red-950/20 border-l-4 border-red-500 p-6 rounded-r-2xl flex gap-4 items-start">
            <ShieldAlert className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-red-400 font-bold mb-2">Warning: Avoid Disassembly</h4>
              <p className="text-slate-300 text-sm leading-relaxed mb-0">
                These basic checks are intended to be low-risk. Do NOT open the laptop, remove the heatsink, disconnect delicate ZIF cables, or attempt to replace thermal compound unless you are trained. Dell laptops vary significantly across Inspiron, Latitude, Vostro, XPS, Precision, G Series, and Alienware families, as well as across individual generations. The internal cooling layout can differ substantially even within the same family. Mistakes during disassembly frequently cause permanent motherboard damage.
              </p>
            </div>
          </div>
        </section>

        {/* Pro Services & Avoid Mistakes */}
        <div className="grid md:grid-cols-2 gap-8">
          <section className="bg-red-950/10 border border-red-900/30 p-6 sm:p-8 rounded-3xl">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <XCircle className="text-red-400" /> Avoid These Mistakes
            </h2>
            <ul className="space-y-4">
              {MISTAKES_TO_AVOID.map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-emerald-950/10 border border-emerald-900/30 p-6 sm:p-8 rounded-3xl">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Wrench className="text-emerald-400" /> Seek Professional Repair If:
            </h2>
            <ul className="space-y-4">
              {REPAIR_TRIGGERS.map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <StandaloneRelatedLinks
          title="Related technical troubleshooting guides"
          intro="This is the Dell-specific child resource. For cross-brand temperature limits and general thermal interpretation, use the universal parent guide first."
          links={[
            { href: '/guides/why-is-my-laptop-so-hot', label: 'Universal Laptop Overheating Guide', description: 'Understand thermal limits, airflow, fan behaviour and safe temperature interpretation across laptop platforms.' },
            { href: '/guides/laptop-battery-warning-signs', label: 'Laptop Battery Warning Signs', description: 'Check whether swelling, battery heat or charging behaviour is contributing to the symptoms.' },
            { href: '/guides/gamebar-presence-writer-fix', label: 'Windows Gaming Stutter Guide', description: 'Investigate software, overlay and frame-time variables when overheating is not the only symptom.' },
          ]}
        />

        {/* FAQs */}
        <section id="dell-faq" className="scroll-mt-28 border-t border-slate-800 pt-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQS.map((item, idx) => (
              <Card key={idx} data-kcroc-faq-item="true" className="bg-slate-900/40 border-slate-800">
                <CardContent className="p-6">
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" /> 
                    {item.q}
                  </h3>
                  <p className="text-slate-400 text-sm sm:text-base ml-8 mb-0 leading-relaxed">
                    {item.a}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section id="official-dell-references" className="border-t border-slate-800 pt-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5">Official Dell References</h2>
          <p className="text-sm leading-6 text-slate-400 mb-5">Dell support instructions and utility availability can change by model and region. Use your exact Service Tag when opening product-specific downloads or manuals.</p>
          <ul className="space-y-3 text-sm leading-6">
            <li><a href="https://www.dell.com/support/kbdoc/en-us/000181163/how-to-enter-the-built-in-diagnostics-32-bit-diagnostics-supportassist-epsa-epsa-and-psa" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:underline">Dell KB 000181163 — Run pre-boot diagnostics and hardware tests (F12 / ePSA)</a></li>
            <li><a href="https://www.dell.com/support/kbdoc/en-us/000181167/reference-table-of-epsa-psa-error-codes-and-troubleshooting-steps-2000-0nnn-series" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:underline">Dell KB 000181167 — ePSA / PSA error-code reference (2000-0NNN series)</a></li>
            <li><a href="https://www.dell.com/support/kbdoc/en-us/000226259/transition-to-the-new-dell-optimizer" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:underline">Dell KB 000226259 — Transition to the new Dell Optimizer and legacy-app lifecycle dates</a></li>
            <li><a href="https://www.dell.com/support/kbdoc/en-us/000123108/maximizing-your-gaming-performance" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:underline">Dell KB 000123108 — Gaming performance, G-Key / Game Shift and AWCC</a></li>
            <li><a href="https://www.dell.com/support/product-details/en-us/product/g-series-15-5530-laptop/resources/manuals" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:underline">Dell G15 5530 — Official owner manuals and model-specific keyboard shortcuts</a></li>
            <li><a href="https://www.dell.com/support/kbdoc/en-us/000124211/dell-bios-updates" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:underline">Dell KB 000124211 — BIOS and UEFI update procedures and precautions</a></li>
            <li><a href="https://www.dell.com/support/kbdoc/en-us/000149580/why-is-my-system-not-going-to-sleep-mode" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:underline">Dell KB 000149580 — Sleep troubleshooting and Modern Standby on Dell systems</a></li>
            <li><a href="https://www.dell.com/support/kbdoc/en-us/000480910/dell-pro-fan-error-message-after-reboot-following-windows-update" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:underline">Dell KB 000480910 — DT1265-specific 2000-0511 / 2000-0712 false fan-error case</a></li>
            <li><a href="https://learn.microsoft.com/en-us/windows-hardware/design/device-experiences/modern-standby-sleepstudy" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:underline">Microsoft Learn — Modern Standby SleepStudy diagnostics</a></li>
            <li><a href="https://edc.intel.com/content/www/us/en/design/products/platforms/details/meteor-lake-u-p/core-ultra-processor-datasheet-volume-1-of-2/001/bi-directional-prochot/" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:underline">Intel — Bi-directional PROCHOT# and external platform protection signals</a></li>
          </ul>
        </section>

      </div>
    </div>
  );
};
