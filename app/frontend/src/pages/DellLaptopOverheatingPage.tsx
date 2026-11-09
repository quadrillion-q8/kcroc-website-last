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

export const DellLaptopOverheatingPage = () => {
  const business = KCROC_GRAPH.business!;
  const PAGE_URL = `${business.websiteUrl}/guides/dell-laptop-overheating`;
  const PAGE_TITLE = 'Dell Laptop Overheating: Causes, Diagnostics & Safe Fixes | KCROC';
  const PAGE_DESCRIPTION = 'Is your Dell laptop overheating, shutting down or running loud? Learn the common causes, safe checks, thermal-throttling signs and model-specific diagnostic considerations.';
  

  const FAQS = [
    { q: 'Why does my Dell laptop get so hot?', a: "Common causes include restricted airflow, dust buildup inside the cooling system, sustained CPU/GPU load, fan problems and model-specific cooling limitations. High ambient temperature can reduce thermal headroom in any environment." },
    { q: 'Why does my Dell laptop shut down when it gets hot?', a: 'A laptop may shut down automatically when temperatures become unsafe, as a protective measure. However, unexpected shutdowns can also have power, firmware, hardware, or other causes.' },
    { q: 'How do I stop my Dell laptop from overheating?', a: 'Start with the basics: use it on a hard, flat surface, keep the vents clear, and check Task Manager for processes using unusually high CPU. If temperatures stay high after that, the cooling system likely needs inspection.' },
    { q: 'Can dust cause a Dell laptop to overheat?', a: 'Yes. Dust restricts airflow through the heatsink and fan, which is one of the most common causes of overheating in laptops that have been used for a couple of years without internal cleaning.' },
    { q: 'Does replacing thermal paste fix laptop overheating?', a: "It can, if degraded thermal interface material is the actual cause — but not every overheating issue is a thermal paste problem. Diagnosing the cause first avoids paying for a repair that doesn't address the real issue." },
    { q: 'Why is my Dell laptop fan so loud?', a: 'A loud fan is often the system compensating for higher internal temperatures. Grinding or clicking noises specifically usually point to a mechanical fan problem rather than a purely thermal one.' },
    { q: 'When should I have my Dell laptop professionally inspected?', a: "If shutdowns are repeated, the fan sounds mechanically damaged, or temperatures stay high despite clear airflow and normal usage, it's worth having the cooling system inspected rather than continuing to run the machine hot." },
  ];

  const GUIDE_SCHEMA = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Dell Laptop Overheating & Shutdown: Causes, Diagnostics & Safe Fixes',
      description: PAGE_DESCRIPTION,
      url: PAGE_URL,
      publisher: {
        '@type': 'Organization',
        name: business.legalName,
        logo: { '@type': 'ImageObject', url: business.logoUrl },
      },
      author: {
        '@type': 'Organization',
        name: business.legalName,
      },
      inLanguage: 'en',
      mainEntityOfPage: { '@type': 'WebPage', '@id': PAGE_URL },
      articleSection: 'Laptop Repair Guides',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQS.map(faq => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a }
      }))
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
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
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta property="og:image" content={`${business.websiteUrl}/images/discover/gaming-laptop-overheating-repair-1200x675.webp`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="675" />
        <meta property="og:image:alt" content="Laptop cooling fan and overheating repair diagnostics" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={`${business.websiteUrl}/images/discover/gaming-laptop-overheating-repair-1200x675.webp`} />
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
            Is your Dell Inspiron running loud, getting unusually hot, or shutting down under load? Learn the common causes, safe checks and model-specific diagnostic steps.
          </p>
        </div>
      </section>

      <div className="container mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-12 space-y-16">
        
        {/* Quick Answer */}
        <section className="bg-slate-900/60 border border-slate-800 p-6 sm:p-10 rounded-3xl shadow-2xl backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <AlertTriangle className="text-red-400 w-6 h-6" /> The Quick Answer
          </h2>
          <p className="text-slate-300 leading-relaxed text-lg m-0">
            A Dell laptop that becomes unusually hot can be affected by restricted airflow, dust buildup, high CPU usage, fan problems, thermal-interface condition, or another hardware or software issue. This guide focuses on Dell-specific checks and symptoms; use the separate laptop-temperature guide when you need help interpreting a CPU/GPU reading, and use the gaming-laptop cleaning guide for maintenance intervals. Start with the low-risk checks below. If the laptop repeatedly shuts down, the fan behaves abnormally, or temperatures remain high after basic checks, the cooling system should be professionally inspected rather than assuming thermal paste is the answer.
          </p>
          <p className="text-slate-400 leading-relaxed mt-5 mb-0">
            This guide applies across Dell laptop families including Inspiron, Latitude, Vostro, XPS, Precision, G Series, and Alienware. The exact cooling design varies by model and generation, so internal repair steps should always be matched to the specific service manual and hardware configuration.
          </p>
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
          intro="Use these guides to compare overlapping symptoms and choose the next diagnostic branch."
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


      </div>
    </div>
  );
};
