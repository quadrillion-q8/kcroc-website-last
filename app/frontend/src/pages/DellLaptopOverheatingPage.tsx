// File: app/frontend/src/pages/DellLaptopOverheatingPage.tsx
import { Head } from 'vite-react-ssg';
import React, { useState } from 'react';
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
  const [selectedSymptom, setSelectedSymptom] = useState('fan-idle');
  const symptomAdvice: Record<string, { title: string; advice: string; next: string }> = {
    'fan-idle': {
      title: 'Fan is loud during light work or at idle',
      advice: 'Check Task Manager for sustained CPU activity, then confirm the Dell thermal profile is not set to a performance-oriented mode. If the fan remains loud with low workload, run F12 diagnostics and listen for grinding or clicking.',
      next: 'If the fan test fails or the noise is mechanical, stop stress testing and arrange a fan/cooling inspection.',
    },
    'load-heat': {
      title: 'Heat and fan speed rise during gaming or heavy work',
      advice: 'A fan ramp-up under sustained CPU/GPU load can be normal. Check the active thermal profile, keep intake and exhaust vents unobstructed, and compare performance with the same workload after returning to the normal Optimized or Balanced profile.',
      next: 'Investigate further if performance collapses, the laptop shuts down, or high fan speed continues after the workload ends.',
    },
    'shutdown': {
      title: 'The Dell laptop shuts down or restarts under load',
      advice: 'Save work and avoid repeated stress tests. Check the external vents, then run the F12 pre-boot diagnostics and record every error and validation code.',
      next: 'Repeated thermal shutdowns need a cooling and power-path inspection even if a quick test reports no error.',
    },
    'fan-code': {
      title: 'F12 diagnostics reports a fan code',
      advice: 'Record the complete code. 2000-0511 means the fan did not respond correctly to the diagnostic test; 2000-0512 means the fan ran faster than expected. Neither code alone identifies the exact component to replace.',
      next: 'Check for visible external obstruction and repeat the test. If the code returns, arrange model-specific inspection; do not open the laptop just to check the fan.',
    },
    throttling: {
      title: 'Performance drops or the XPS slows down under sustained load',
      advice: 'Check CPU/GPU utilization, clocks and the selected Dell thermal profile. Thin systems can reduce sustained power to control heat; compare behaviour with the exact model specification and the same workload.',
      next: 'Persistent throttling during light work, sudden shutdowns or abnormal fan behaviour warrants diagnosis.',
    },
  };
  const activeSymptomAdvice = symptomAdvice[selectedSymptom];
  const PAGE_URL = `${business.websiteUrl}/guides/dell-laptop-overheating`;
  const EN_PAGE_URL = `${business.websiteUrl}/guides/dell-laptop-overheating`;
  const AR_PAGE_URL = `${business.websiteUrl}/guides/ar/dell-laptop-overheating`;
  const PAGE_URL = EN_PAGE_URL;
  const AUTHOR_ID = `${business.websiteUrl}/author/imran#person`;
  const PUBLISHED_DATE = '2026-09-27';
  const DATE_MODIFIED = '2026-11-15';
  const LAST_UPDATED = 'November 15, 2026';
  const OG_IMAGE_URL = `${business.websiteUrl}${IMAGES.laptopHardware.cloggedFan.src}`;
  const PAGE_TITLE = 'Dell Laptop Overheating: Diagnostics, Fan Noise & Fixes | KCROC';
  const PAGE_DESCRIPTION = 'Dell laptop overheating, fan noise or shutdowns? Run F12 diagnostics, understand fan error codes, check thermal profiles and update BIOS safely.';
  

  const FAQS = [
    { q: 'Why does my Dell laptop get so hot?', a: "Common causes include restricted airflow, dust buildup inside the cooling system, sustained CPU/GPU load, fan problems and model-specific cooling limitations. High ambient temperature can reduce thermal headroom in any environment." },
    { q: 'Why does my Dell laptop shut down when it gets hot?', a: 'A laptop may shut down automatically when temperatures become unsafe, as a protective measure. However, unexpected shutdowns can also have power, firmware, hardware, or other causes.' },
    { q: 'How do I stop my Dell laptop from overheating?', a: 'Start with the basics: use it on a hard, flat surface, keep the vents clear, and check Task Manager for processes using unusually high CPU. If temperatures stay high after that, the cooling system likely needs inspection.' },
    { q: 'Can dust cause a Dell laptop to overheat?', a: 'Yes. Dust restricts airflow through the heatsink and fan, which is one of the most common causes of overheating in laptops that have been used for a couple of years without internal cleaning.' },
    { q: 'Does replacing thermal paste fix laptop overheating?', a: "It can, if degraded thermal interface material is the actual cause — but not every overheating issue is a thermal paste problem. Diagnosing the cause first avoids paying for a repair that doesn't address the real issue." },
    { q: 'Why is my Dell laptop fan so loud?', a: 'A loud fan is often the system compensating for higher internal temperatures. Grinding or clicking noises specifically usually point to a mechanical fan problem rather than a purely thermal one.' },
    { q: 'How do I run Dell laptop hardware diagnostics?', a: 'Restart or power on the Dell laptop, tap F12 repeatedly when the Dell logo appears, and choose Diagnostics from the One Time Boot Menu. The pre-boot test runs before Windows loads. Record the full error and validation codes if a test fails.' },
    { q: 'What does Dell fan error 2000-0511 mean?', a: 'Dell lists ePSA error 2000-0511 as a fan that failed to respond correctly to diagnostics. Check for external vent obstruction, repeat the test, and arrange model-specific inspection if the code returns. It does not identify the exact failed part by itself.' },
    { q: 'What does Dell fan error 2000-0512 mean?', a: 'Dell describes 2000-0512 as a fan running faster than expected. Dell notes that the cooling fan, temperature sensor or system board may be involved, so the code needs follow-up diagnosis rather than an automatic fan replacement.' },
    { q: 'Can a Dell thermal profile make the fan louder or the laptop warmer?', a: 'Yes. Supported Dell thermal profiles trade off processor performance, fan speed, noise and surface temperature. A Quiet profile can reduce fan and processor speeds, while Cool or Ultra Performance can change fan behaviour and system performance. Available modes vary by model and application.' },
    { q: 'Should I update my Dell BIOS to fix overheating?', a: 'Check the BIOS version and release notes for your exact Service Tag. Firmware updates can include platform-specific thermal or fan-control fixes, but they are not a substitute for clearing a blocked heatsink or repairing a failed fan. Follow Dell update precautions and do not interrupt the update.' },
    { q: 'When should I have my Dell laptop professionally inspected?', a: "If shutdowns are repeated, the fan sounds mechanically damaged, a pre-boot fan error returns, or temperatures stay high despite clear airflow and normal usage, have the exact cooling system inspected rather than continuing to run the machine hot." },
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
      headline: 'Dell Laptop Overheating: Diagnostics, Fan Noise & Safe Fixes',
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
        'Dell Power Manager thermal settings',
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
              Overheating & Shutdown
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

        {/* Symptoms & Causes Grid */}
        <div className="grid md:grid-cols-2 gap-6">
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
            <Badge className="bg-cyan-500/10 text-cyan-300 border-cyan-500/20">Dell-specific check</Badge>
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
          <p className="text-sm text-slate-400 leading-6 mt-5 mb-0">
            The Windows SupportAssist application can also offer hardware scans and update checks on supported systems. For a recorded pre-boot result, use the F12 Diagnostics path above. A passing quick test does not rule out every intermittent fan, airflow or thermal problem.
          </p>
        </section>

        <section id="dell-thermal-profiles" className="scroll-mt-28">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-5">Check Dell Thermal Profiles Before Assuming a Hardware Fault</h2>
          <p className="text-slate-300 leading-7 mb-5">
            Dell utilities can change processor behaviour and cooling-fan response. Dell Power Manager functions are integrated into newer MyDell and Dell Optimizer applications on supported product families. The utility and labels available on your machine depend on its model and generation.
          </p>
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
              <p className="text-sm leading-6 text-slate-400 mb-0">Check MyDell or the Dell utility listed for the exact model. Dell says newer XPS, Inspiron and Vostro systems use MyDell for functions that were previously in Dell Power Manager.</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
              <h3 className="font-semibold text-white mb-2">Latitude and Precision</h3>
              <p className="text-sm leading-6 text-slate-400 mb-0">Check Dell Optimizer where supported, along with any Thermal Management option exposed in BIOS Setup. Not every model provides every control.</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5">
              <h3 className="font-semibold text-white mb-2">G Series and Alienware</h3>
              <p className="text-sm leading-6 text-slate-400 mb-0">Alienware Command Center uses model-specific thermal profiles. Full Speed or Performance profiles can make fans noticeably louder; compare against Balanced or the model's normal profile.</p>
            </div>
          </div>
          <p className="text-xs leading-5 text-slate-500 mt-4">Important: profile names and availability are not universal across Dell models. Do not install a utility or force a profile intended for a different product.</p>
        </section>

        <section id="dell-bios-updates" className="scroll-mt-28 rounded-3xl border border-slate-800 bg-slate-900/50 p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Check the Exact Dell BIOS Version and Release Notes</h2>
          <p className="text-slate-300 leading-7">
            BIOS and embedded-controller firmware can influence fan curves, sensor handling and platform power behaviour on particular models. Before changing hardware, enter your Service Tag on Dell Support and compare the installed BIOS with the version listed for that exact system. Read the release notes: update only when the update applies to your model and addresses a relevant issue or security requirement.
          </p>
          <ol className="list-decimal pl-6 space-y-2 text-sm leading-6 text-slate-300 mt-4">
            <li>Identify the full model and Service Tag from the laptop or Windows System Information.</li>
            <li>Open Dell Drivers &amp; Downloads and select the correct device.</li>
            <li>Review the BIOS release notes and Dell's precautions before downloading.</li>
            <li>Connect reliable AC power, keep the laptop on a stable surface, and never interrupt a firmware update.</li>
            <li>After restart, repeat the same workload or pre-boot test and compare the result.</li>
          </ol>
          <p className="text-sm leading-6 text-amber-200 mt-5 mb-0">
            A BIOS update cannot clear compacted dust, repair a worn fan bearing or restore a damaged fan cable. If the diagnostics report a persistent fan error, investigate the cooling hardware as well.
          </p>
        </section>

        <section id="dell-model-families" className="scroll-mt-28">
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
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Dell Overheating Symptom Checker</h2>
          <p className="text-slate-400 text-sm leading-6 mb-5">Choose the symptom that best matches what you see. This is a first-step guide, not a remote hardware diagnosis.</p>
          <label htmlFor="dell-symptom" className="block text-sm font-semibold text-slate-200 mb-2">What is your Dell laptop doing?</label>
          <select id="dell-symptom" value={selectedSymptom} onChange={(event) => setSelectedSymptom(event.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-950 text-white p-4 focus:outline-none focus:ring-2 focus:ring-cyan-500">
            <option value="fan-idle">Fan is loud during light work or at idle</option>
            <option value="load-heat">Fan gets louder during gaming or heavy work</option>
            <option value="shutdown">Laptop shuts down or restarts under load</option>
            <option value="fan-code">F12 reports a fan error code</option>
            <option value="throttling">Performance drops or XPS slows down under load</option>
          </select>
          <div className="mt-5 rounded-2xl border border-slate-700 bg-slate-950/70 p-5" aria-live="polite">
            <h3 className="text-lg font-bold text-cyan-200 mb-2">{activeSymptomAdvice.title}</h3>
            <p className="text-sm leading-7 text-slate-300">{activeSymptomAdvice.advice}</p>
            <p className="text-sm leading-7 text-amber-200 mb-0"><strong>Next step:</strong> {activeSymptomAdvice.next}</p>
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
        <section>
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
        <section className="border-t border-slate-800 pt-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQS.map((item, idx) => (
              <Card key={idx} className="bg-slate-900/40 border-slate-800">
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
            <li><a href="https://www.dell.com/support/kbdoc/en-us/000181163/how-to-enter-the-built-in-diagnostics-32-bit-diagnostics-supportassist-epsa-epsa-and-psa" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:underline">Dell: Run pre-boot diagnostics and hardware tests</a></li>
            <li><a href="https://www.dell.com/support/kbdoc/en-us/000181167/reference-table-of-epsa-psa-error-codes-and-troubleshooting-steps-2000-0nnn-series" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:underline">Dell: ePSA 2000-series error-code reference</a></li>
            <li><a href="https://www.dell.com/support/contents/en-us/article/product-support/self-support-knowledgebase/software-and-downloads/dell-power-manager" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:underline">Dell: Power Manager and newer MyDell / Dell Optimizer applications</a></li>
            <li><a href="https://www.dell.com/support/kbdoc/en-us/000189990/alienware-m15-ryzen-edition-r5-thermal-measurement-guidance" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:underline">Dell: Alienware Command Center thermal modes (model-specific example)</a></li>
            <li><a href="https://www.dell.com/support/contents/en-us/article/product-support/self-support-knowledgebase/fix-common-issues/bios-uefi" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:underline">Dell: BIOS / UEFI update guidance</a></li>
            <li><a href="https://www.dell.com/support/kbdoc/en-us/000130867/how-to-troubleshoot-a-overheating-shutdown-or-thermal-issue-on-a-dell-pc" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:underline">Dell: Overheating, shutdown and thermal troubleshooting</a></li>
          </ul>
        </section>

      </div>
    </div>
  );
};
