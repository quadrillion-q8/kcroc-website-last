// File: app/frontend/src/pages/DellInspiron15_3000OverheatingPage.tsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  AlertTriangle, CheckCircle2, XCircle, Thermometer, 
  HelpCircle, Wrench, ShieldAlert 
} from 'lucide-react';
import { ServiceGuide } from '../components/content/ServiceGuide';
import { SEOEngine } from '../core/components/SEOEngine';
import SchemaMarkup from '../components/seo/SchemaMarkup';
import { KCROC_GRAPH } from '../data/graph';
import { Card, CardContent } from '@/components/ui/card';

export const DellInspiron15_3000OverheatingPage = () => {
  const business = KCROC_GRAPH.business!;
  const PAGE_URL = `${business.websiteUrl}/guides/dell-inspiron-15-3000-overheating`;
  const PAGE_TITLE = 'Dell Inspiron 15 3000 Overheating: Causes, Fixes & Repair | KCROC Kuwait';
  const PAGE_DESCRIPTION = 'Is your Dell Inspiron 15 3000 overheating, shutting down, or running loud? Learn the common causes, safe fixes, thermal throttling signs, and when professional repair is needed.';

  const FAQS = [
    { q: 'Why does my Dell Inspiron 15 3000 get so hot?', a: "Most commonly it's a combination of restricted airflow, dust buildup inside the cooling system, and CPU load. In Kuwait's climate, high ambient temperatures can add to the problem." },
    { q: 'Why does my Dell Inspiron 15 3000 shut down when it gets hot?', a: 'A laptop may shut down automatically when temperatures become unsafe, as a protective measure. However, unexpected shutdowns can also have power, firmware, hardware, or other causes.' },
    { q: 'How do I stop my Dell Inspiron 15 3000 from overheating?', a: 'Start with the basics: use it on a hard, flat surface, keep the vents clear, and check Task Manager for processes using unusually high CPU. If temperatures stay high after that, the cooling system likely needs inspection.' },
    { q: 'Can dust cause a Dell Inspiron 15 3000 to overheat?', a: 'Yes. Dust restricts airflow through the heatsink and fan, which is one of the most common causes of overheating in laptops that have been used for a couple of years without internal cleaning.' },
    { q: 'Does replacing thermal paste fix laptop overheating?', a: "It can, if degraded thermal interface material is the actual cause — but not every overheating issue is a thermal paste problem. Diagnosing the cause first avoids paying for a repair that doesn't address the real issue." },
    { q: 'Why is my Dell Inspiron 15 3000 fan so loud?', a: 'A loud fan is often the system compensating for higher internal temperatures. Grinding or clicking noises specifically usually point to a mechanical fan problem rather than a purely thermal one.' },
    { q: 'When should I have my Dell laptop professionally inspected?', a: "If shutdowns are repeated, the fan sounds mechanically damaged, or temperatures stay high despite clear airflow and normal usage, it's worth having the cooling system inspected rather than continuing to run the machine hot." },
  ];

  const GUIDE_SCHEMA = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Dell Inspiron 15 3000 Overheating & Shutdown: Causes, Fixes & Repair Guide',
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
      inLanguage: 'en-KW',
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
        { '@type': 'ListItem', position: 3, name: 'Dell Inspiron Overheating', item: PAGE_URL },
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
    'Assuming every Inspiron 15 3000 has the same internal cooling design.',
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
    <div className="min-h-screen bg-gray-950 text-slate-300 selection:bg-cyan-500/30 pb-24">
      <Helmet>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESCRIPTION} />
        <link rel="canonical" href={PAGE_URL} />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={PAGE_DESCRIPTION} />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:type" content="article" />
      </Helmet>

      <SEOEngine entityId="guide-dell-inspiron-overheating" />
      <SchemaMarkup schema={{ '@graph': GUIDE_SCHEMA }} />

      {/* The Core Service Guide Component */}
      <ServiceGuide
        title="Dell Inspiron 15 3000 Overheating & Shutdown: Causes, Fixes & Repair Guide"
        subtitle="⭐ Expert Technical Advice from Kuwait Computer Repair On Call"
        symptoms={[
          'Fan runs continuously, at high speed, or makes unusual whirring or grinding noises.',
          'Bottom of the laptop becomes unusually hot during normal use.',
          'Laptop shuts down or restarts unexpectedly during demanding tasks.',
          'Performance drops, stutters, or freezes because of thermal throttling.',
          'The laptop becomes significantly hotter than it was previously.',
          'Fan repeatedly speeds up and slows down while the laptop is under load.',
        ]}
        causes={[
          'Dust Accumulation: Dust can restrict airflow through the fan, heatsink, and ventilation openings.',
          'Restricted Airflow: Using the laptop on beds, blankets, carpets, or other soft surfaces can obstruct ventilation.',
          'Thermal Interface Degradation: Thermal compound can degrade over years of repeated heat cycling and may require inspection.',
          'Fan Problems: A worn, obstructed, or failing cooling fan may not move enough air through the heatsink.',
          'High CPU Usage: Background applications, Windows processes, updates, or demanding software can generate excessive heat.',
          "Hot Environment: High ambient temperatures can make an already-stressed laptop cooling system less effective. In Kuwait's climate this can meaningfully reduce a laptop's ability to dissipate heat.",
        ]}
        diySteps={[
          {
            title: 'Use a Hard, Flat Surface',
            description: 'Place the laptop on a desk or other firm surface. Avoid beds, blankets, carpets, and cushions that can block ventilation openings.',
          },
          {
            title: 'Check CPU Usage',
            description: 'Press Ctrl+Shift+Esc to open Task Manager and check whether an application is continuously using a high percentage of CPU. Investigate unusually heavy background processes before assuming the cooling system has failed.',
          },
          {
            title: 'Keep External Vents Clear',
            description: 'Power off the laptop and keep the external ventilation openings free from dust and obstructions. Avoid inserting objects into the cooling system or attempting internal disassembly without the appropriate experience.',
          },
        ]}
        warning="These basic checks are intended to be low-risk. Do NOT open the laptop, remove the heatsink, disconnect internal cables, or replace thermal compound unless you know the correct procedure for your specific Inspiron 15 3000 model. The series includes multiple generations and hardware configurations, so the internal cooling system can differ between models."
        proServices={[
          {
            title: 'Thermal System Inspection',
            description: 'We inspect temperature behavior, fan operation, heatsink condition, airflow, and thermal performance to identify the actual source of overheating.',
          },
          {
            title: 'Fan Inspection & Replacement',
            description: 'We check the cooling fan for abnormal noise, obstruction, mechanical wear, or failure and replace the appropriate assembly when required.',
          },
          {
            title: 'Internal Cleaning & Thermal Service',
            description: 'ESD-safe internal cleaning and thermal-interface service where required, followed by testing to verify improved cooling performance.',
          },
        ]}
        businessInfo={{
          name: 'Kuwait Computer Repair On Call',
          address: 'Hawalli, Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19',
          phone: '55301913',
        }}
      />

      {/* --- EXTENDED CONTENT SECTIONS (Technical Noir Styled) --- */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-16 mt-12">
        
        {/* Quick Answer */}
        <section className="bg-slate-900/50 border border-slate-800 p-6 sm:p-8 rounded-2xl">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Thermometer className="text-red-400" /> Quick Answer
          </h2>
          <p className="text-slate-300 leading-relaxed m-0">
            A Dell Inspiron 15 3000 that becomes unusually hot is commonly affected by restricted airflow, dust buildup, high CPU usage, fan problems, or degraded thermal-interface material. Start with the low-risk checks. If the laptop repeatedly shuts down, the fan behaves abnormally, or temperatures remain high despite clear airflow, the cooling system should be professionally inspected.
          </p>
        </section>

        {/* Diagnostic Table */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">How to Tell What Is Causing the Overheating</h2>
          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full border-collapse text-left text-sm sm:text-base">
              <thead>
                <tr className="bg-slate-900">
                  <th className="py-4 px-6 font-bold text-white border-b border-slate-800">Symptom</th>
                  <th className="py-4 px-6 font-bold text-white border-b border-slate-800">Possible Cause</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 bg-slate-950/50">
                {DIAGNOSTIC_TABLE.map((row) => (
                  <tr key={row.symptom} className="hover:bg-slate-900/30 transition-colors">
                    <td className="py-4 px-6 text-cyan-300 font-medium">{row.symptom}</td>
                    <td className="py-4 px-6 text-slate-300">{row.cause}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Mistakes to Avoid */}
          <section className="bg-red-950/10 border border-red-900/30 p-6 rounded-2xl">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <XCircle className="text-red-400" /> Avoid These Mistakes
            </h2>
            <ul className="space-y-4">
              {MISTAKES_TO_AVOID.map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed">
                  <ShieldAlert className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* When to Seek Repair */}
          <section className="bg-emerald-950/10 border border-emerald-900/30 p-6 rounded-2xl">
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

        {/* Model Differentiation & Tech Note */}
        <section className="bg-slate-900/30 border-l-4 border-cyan-500 p-6 rounded-r-2xl">
          <h2 className="text-xl font-bold text-white mb-3">Which Inspiron 15 3000 Model Do You Have?</h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-0">
            <strong>Technical Note:</strong> Dell has released multiple Inspiron 15 3000 generations and configurations. The cooling assembly, fan design, processor, and internal layout vary heavily by model. Check your exact service tag before ordering parts — a fix that applies to one generation may not apply to another.
          </p>
        </section>

        {/* FAQs */}
        <section className="border-t border-slate-800 pt-12">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
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
