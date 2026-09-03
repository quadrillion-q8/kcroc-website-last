// File: app/frontend/src/pages/TermsOfService.tsx
import { Head } from 'vite-react-ssg';
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Mail, Phone } from 'lucide-react';

import { SEOEngine } from '../core/components/SEOEngine';
import SchemaMarkup from '../components/seo/SchemaMarkup';
import { KCROC_GRAPH } from '../data/graph';

const business = KCROC_GRAPH.business!;
const BASE_URL = business.websiteUrl;
const TERMS_PATH = '/terms-of-service';
const PHONE_DISPLAY = `+965 ${business.telephone.slice(3, 7)} ${business.telephone.slice(7)}`;
const PHONE_CLEAN = business.telephone;
const EMAIL = business.email;
const LEGAL_NAME = `${business.legalName} (${business.alternateName})`;
const LAST_UPDATED = 'August 4, 2026';

const SECTIONS = [
  {
    id: 'services',
    title: '1. Our Services',
    body: [
      `KCROC provides component-level and board-level diagnostic and repair services for laptops, desktops, MacBooks, and gaming PCs in Kuwait, including free pickup and delivery within our service areas.`,
    ],
  },
  {
    id: 'diagnostics-quotes',
    title: '2. Diagnostics & Quotes',
    body: [
      `We provide a diagnostic assessment before carrying out any paid repair. A quote is given based on this assessment; work will not proceed on a paid repair without your approval of the quoted price.`,
      `If a device is found to be unrepairable, or if you decline the quoted repair, standard diagnostic terms (including any applicable no-fix-no-fee policy communicated to you at booking) apply.`,
    ],
  },
  {
    id: 'pickup-delivery',
    title: '3. Pickup & Delivery',
    body: [
      `Free pickup and delivery is offered within our designated Kuwait service areas at scheduled time slots. Devices are transported directly from your location to our laboratory and back, and are logged at each stage of custody.`,
      `You are responsible for providing accurate contact and address details, and for being reasonably available at the agreed pickup/delivery window.`,
    ],
  },
  {
    id: 'warranty',
    title: '4. Warranty on Repairs',
    body: [
      `Repairs are covered by the warranty period communicated to you at the time of invoicing. The warranty covers the specific fault repaired and the parts/components we replace; it does not cover unrelated faults, physical/liquid damage occurring after repair, or issues caused by third-party servicing after our repair.`,
    ],
  },
  {
    id: 'customer-data',
    title: '5. Customer Data on Devices',
    body: [
      `We are not responsible for data loss that may occur during diagnostics or repair. We strongly recommend backing up your data beforehand where possible. You may remove your storage drive prior to handover for board-level repairs — see our Data Security page for details.`,
    ],
  },
  {
    id: 'payment',
    title: '6. Payment',
    body: [
      `Payment is due upon completion of the approved repair, before or at the time of delivery, using the payment methods we make available. Prices quoted are in Kuwaiti Dinar (KWD) unless stated otherwise.`,
    ],
  },
  {
    id: 'liability',
    title: '7. Limitation of Liability',
    body: [
      `To the extent permitted by Kuwaiti law, KCROC's liability for any claim arising from our services is limited to the amount paid for the specific repair in question. We are not liable for indirect or consequential losses, including loss of data, business, or use.`,
    ],
  },
  {
    id: 'governing-law',
    title: '8. Governing Law',
    body: [
      `These Terms are governed by the laws of the State of Kuwait. Any disputes will be subject to the exclusive jurisdiction of the competent courts of Kuwait.`,
    ],
  },
  {
    id: 'changes',
    title: '9. Changes to These Terms',
    body: [
      `We may revise these Terms of Service from time to time. Continued use of our services after changes are posted constitutes acceptance of the updated Terms.`,
    ],
  },
];

export default function TermsOfService() {
  const pageUrl = `${BASE_URL}${TERMS_PATH}`;

  const SCHEMA_DATA = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': `${pageUrl}#webpage`,
          url: pageUrl,
          name: 'Terms of Service | KCROC Computer Repair Kuwait',
          description:
            'The terms and conditions that apply when you book a computer or laptop repair with Kuwait Computer Repair On Call (KCROC).',
          isPartOf: { '@id': `${BASE_URL}/#website` },
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${pageUrl}#breadcrumb`,
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
            { '@type': 'ListItem', position: 2, name: 'Terms of Service', item: pageUrl },
          ],
        },
      ],
    }),
    [pageUrl]
  );

  return (
    <main className="w-full min-h-screen bg-transparent text-slate-200 pt-32 pb-24">
      <SEOEngine entityId="page-terms-of-service" />
      <Head>
        <title>Terms of Service | KCROC Computer Repair Kuwait</title>
        <meta
          name="description"
          content="Read the terms and conditions for KCROC's computer, laptop, and MacBook repair services, including pickup, delivery, warranty, and payment terms."
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
            Terms of Service
          </li>
        </ol>
      </nav>

      <section className="max-w-3xl mx-auto px-6 relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-cyan-500/10 p-2.5 rounded-xl border border-cyan-500/20">
            <FileText className="w-6 h-6 text-cyan-400" aria-hidden="true" />
          </div>
          <span className="text-cyan-400 font-bold tracking-wide uppercase text-xs">Legal</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">Terms of Service</h1>
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
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">10. Contact Us</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              Questions about these Terms of Service? Reach out to {LEGAL_NAME}:
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
