// File: app/frontend/src/pages/PrivacyPolicy.tsx
import { Head } from 'vite-react-ssg';
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Mail, Phone } from 'lucide-react';

import { SEOEngine } from '../core/components/SEOEngine';
import SchemaMarkup from '../components/seo/SchemaMarkup';
import { ROUTES } from '../constants/routes';

const BASE_URL = 'https://www.computerrepairkuwait.com';
const PHONE_DISPLAY = '+965 5530 1913';
const PHONE_CLEAN = '96555301913';
const EMAIL = 'quadrillion1980@gmail.com';
const LEGAL_NAME = 'Kuwait Computer Repair On Call (KCROC)';
const LAST_UPDATED = 'August 4, 2026';

const SECTIONS = [
  {
    id: 'info-we-collect',
    title: '1. Information We Collect',
    body: [
      `When you book a repair, contact us, or use our website, we may collect: your name, phone number, email address, pickup/drop-off address, and details about the device and issue you describe to us.`,
      `When you browse our website, we may automatically collect standard analytics data such as your approximate location (city/country level), device type, and pages visited, via tools like Google Analytics and Google Tag Manager.`,
    ],
  },
  {
    id: 'how-we-use',
    title: '2. How We Use Your Information',
    body: [
      `We use your information to schedule and carry out pickups, deliveries, and repairs; to communicate with you about your booking (by phone, WhatsApp, or email); to provide quotes and invoices; and to improve our services and website.`,
      `We do not sell your personal information to third parties, and we do not use it for purposes unrelated to providing our repair service to you.`,
    ],
  },
  {
    id: 'device-data',
    title: '3. Your Device Data',
    body: [
      `During diagnostics and repair, our technicians only use specialized hardware/software tools. We do not browse, copy, or share the personal files stored on your device.`,
      `You are always welcome to remove your storage drive before handing us your device for motherboard-level or component-level repairs. See our Data Security page for full details on our lab handling protocols.`,
    ],
  },
  {
    id: 'sharing',
    title: '4. Sharing of Information',
    body: [
      `We share your information only where necessary to run our business: with our own technicians and drivers to fulfil your booking, and with service providers that help us operate (e.g. hosting, analytics, payment processing), each bound to protect your data.`,
      `We may disclose information if required to do so by Kuwaiti law or a valid legal request.`,
    ],
  },
  {
    id: 'cookies',
    title: '5. Cookies & Analytics',
    body: [
      `Our website uses cookies and similar technologies (including Google Analytics and Google Ads/Tag Manager) to understand how visitors use the site and to measure the performance of our marketing. You can disable cookies in your browser settings, though some site features may not work as intended.`,
    ],
  },
  {
    id: 'retention',
    title: '6. Data Retention',
    body: [
      `We retain booking and repair records for as long as reasonably necessary to provide support, honor warranties, and meet accounting/legal obligations, after which they are securely deleted or anonymized.`,
    ],
  },
  {
    id: 'your-rights',
    title: '7. Your Rights',
    body: [
      `You may request access to, correction of, or deletion of the personal information we hold about you at any time by contacting us using the details below.`,
    ],
  },
  {
    id: 'changes',
    title: '8. Changes to This Policy',
    body: [
      `We may update this Privacy Policy from time to time to reflect changes in our practices or for legal reasons. The "last updated" date at the top of this page will always reflect the most recent revision.`,
    ],
  },
];

export default function PrivacyPolicy() {
  const pageUrl = `${BASE_URL}${ROUTES.PRIVACY}`;

  const SCHEMA_DATA = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': `${pageUrl}#webpage`,
          url: pageUrl,
          name: 'Privacy Policy | KCROC Computer Repair Kuwait',
          description:
            'How Kuwait Computer Repair On Call (KCROC) collects, uses, and protects your personal information.',
          isPartOf: { '@id': `${BASE_URL}/#website` },
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${pageUrl}#breadcrumb`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
            { '@type': 'ListItem', position: 2, name: 'Privacy Policy', item: pageUrl },
          ],
        },
      ],
    }),
    [pageUrl]
  );

  return (
    <main className="w-full min-h-screen bg-transparent text-slate-200 pt-32 pb-24">
      <SEOEngine entityId="page-privacy-policy" />
      <Head>
        <title>Privacy Policy | KCROC Computer Repair Kuwait</title>
        <meta
          name="description"
          content="Read the KCROC privacy policy to learn how we collect, use, and protect your personal data when you book a computer or laptop repair in Kuwait."
        />
        <link rel="canonical" href={pageUrl} />
      </Head>
      <SchemaMarkup schema={SCHEMA_DATA} />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="max-w-3xl mx-auto px-6 mb-8 relative z-10">
        <ol className="flex items-center space-x-2 text-sm text-slate-400 font-medium">
          <li>
            <Link to="/" className="hover:text-cyan-400 transition-colors">
              Home
            </Link>
          </li>
          <li>
            <span className="text-slate-600" aria-hidden="true">
              /
            </span>
          </li>
          <li aria-current="page" className="text-cyan-400">
            Privacy Policy
          </li>
        </ol>
      </nav>

      <section className="max-w-3xl mx-auto px-6 relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-cyan-500/10 p-2.5 rounded-xl border border-cyan-500/20">
            <ShieldCheck className="w-6 h-6 text-cyan-400" aria-hidden="true" />
          </div>
          <span className="text-cyan-400 font-bold tracking-wide uppercase text-xs">Legal</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">Privacy Policy</h1>
        <p className="text-slate-400 mb-12">Last updated: {LAST_UPDATED}</p>

        <div className="space-y-10">
          {SECTIONS.map((section) => (
            <div key={section.id}>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">{section.title}</h2>
              {section.body.map((para, idx) => (
                <p key={idx} className="text-slate-300 leading-relaxed mb-3">
                  {para}
                </p>
              ))}
            </div>
          ))}

          <div className="border-t border-slate-800 pt-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">9. Contact Us</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              If you have any questions about this Privacy Policy or how we handle your data, reach out to{' '}
              {LEGAL_NAME}:
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <Mail className="w-4 h-4" aria-hidden="true" /> {EMAIL}
              </a>
              <a
                href={`tel:${PHONE_CLEAN}`}
                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <Phone className="w-4 h-4" aria-hidden="true" /> {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
