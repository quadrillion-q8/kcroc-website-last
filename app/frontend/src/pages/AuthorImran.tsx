// File: app/frontend/src/pages/AuthorImran.tsx
import { Head } from 'vite-react-ssg';
import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin, Wrench, Microscope, Shield, BookOpen, ArrowRight, MessageCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import SchemaMarkup from '../components/seo/SchemaMarkup';
import { KCROC_GRAPH } from '../data/graph';

const business = KCROC_GRAPH.business!;

const PAGE_URL = `${business.websiteUrl}/author/imran`;

const AUTHOR_IMAGE_URL =
  'https://res.cloudinary.com/dsbwzags3/image/upload/f_auto,q_auto:good,w_800,c_limit/KCROC-Owner-Image_zpdyg4';

// PersonSchema — kept consistent with the Person entity referenced from the
// laptop-buying-guide (EN + AR) article schemas so search engines can match
// the same author identity across pages/languages.
const PERSON_SCHEMA = [
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Imran Natiq',
    url: PAGE_URL,
    image: AUTHOR_IMAGE_URL,
    jobTitle: 'Hardware Repair Engineer',
    worksFor: {
      '@type': 'Organization',
      name: business.legalName,
      url: business.websiteUrl,
    },
    knowsAbout: [
      'Laptop motherboard diagnostics',
      'MacBook logic board repair',
      'Component-level micro-soldering',
      'Gaming laptop thermal troubleshooting',
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: business.websiteUrl },
      { '@type': 'ListItem', position: 2, name: 'Imran Natiq', item: PAGE_URL },
    ],
  },
];

const articles = [
  { title: 'Laptop Temperatures in Kuwait: What Is Normal, What Is Too Hot?', href: '/blog/laptop-temperatures-kuwait-safe-cpu-gpu-temperatures' },
  { title: 'Laptop Buying Guide Kuwait (2026)', href: '/blog/laptop-buying-guide-kuwait-2026' },
  { title: 'دليل شراء اللابتوب في الكويت 2026', href: '/blog/ar/laptop-buying-guide-kuwait-2026' },
];

export default function AuthorImran() {
  const WA_LINK = `https://wa.me/${business.telephone}?text=${encodeURIComponent(
    'Hi KCROC, I read one of Imran\'s guides and have a question before I buy or repair my laptop.'
  )}`;

  return (
    <main className="w-full min-h-screen bg-gray-950 text-white font-sans selection:bg-cyan-500/30">
      <Head>
        <title>Imran Natiq — Hardware Repair Engineer at KCROC Kuwait</title>
        <meta
          name="description"
          content="Imran Natiq is a hardware repair engineer and founder of KCROC in Hawalli, Kuwait, specializing in motherboard diagnostics, micro-soldering, and laptop thermal repair."
        />
        <link rel="canonical" href={PAGE_URL} />
      </Head>

      <SchemaMarkup schema={{ '@graph': PERSON_SCHEMA }} />

      {/* Breadcrumb */}
      <div className="pt-24 sm:pt-28 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl text-xs sm:text-sm text-slate-400 flex items-center gap-2">
          <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-300">Imran Natiq</span>
        </div>
      </div>

      {/* Author Hero */}
      <section className="pt-6 pb-8 sm:pb-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
            <CardContent className="p-5 sm:p-10 flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
              <img
                src={AUTHOR_IMAGE_URL}
                alt="Imran Natiq — Founder & Lead Technician at KCROC Kuwait"
                loading="eager"
                className="w-24 h-24 sm:w-36 sm:h-36 rounded-2xl object-cover border border-slate-800 flex-shrink-0"
                onError={(e) => { e.currentTarget.src = 'https://ui-avatars.com/api/?name=Imran+Natiq&size=300&background=06b6d4&color=0A0A0A&bold=true'; }}
              />
              <div>
                <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30 px-3 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-3">
                  Founder &amp; Lead Technician
                </Badge>
                <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-3">
                  Imran Natiq
                </h1>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
                  Senior technician with 20+ years of experience in Kuwait's enterprise hardware market.
                  Specializes in advanced hardware testing, strict data safety protocols, and
                  component-level logic board recovery. Committed to transparent service and reclaiming
                  hardware from the "beyond repair" category.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['Hardware Testing', 'Data Safety', 'Micro-Soldering'].map((skill) => (
                    <span key={skill} className="bg-slate-950/80 border border-slate-800 text-slate-300 px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
                <p className="text-slate-500 text-xs sm:text-sm flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" /> Based in Hawalli, Kuwait
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-8 sm:py-16 px-4 sm:px-6 bg-slate-900/30 border-y border-slate-800">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-lg sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Microscope className="w-5 h-5 text-cyan-400" /> Areas of Expertise
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {[
              'Laptop motherboard diagnostics',
              'MacBook logic board repair',
              'Component-level micro-soldering',
              'Gaming laptop thermal troubleshooting',
            ].map((item) => (
              <Card key={item} className="bg-slate-950/40 border-slate-800">
                <CardContent className="p-4 flex items-center gap-3 text-sm sm:text-base text-slate-300">
                  <Wrench className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  {item}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="py-8 sm:py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-lg sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-cyan-400" /> Articles by Imran
          </h2>
          <div className="space-y-3">
            {articles.map((a) => (
              <Link key={a.href} to={a.href}>
                <Card className="bg-slate-900/50 border-slate-800 hover:border-cyan-500/40 transition-colors">
                  <CardContent className="p-4 sm:p-5 flex items-center justify-between text-sm sm:text-base text-slate-200">
                    {a.title}
                    <ArrowRight className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-8 sm:py-16 px-4 sm:px-6 bg-slate-900/30 border-y border-slate-800">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-gradient-to-bl from-cyan-600/20 via-blue-600/20 to-emerald-600/20 border-cyan-500/30 backdrop-blur-sm">
            <CardContent className="p-6 sm:p-10 text-center">
              <h2 className="text-xl sm:text-3xl font-bold text-white mb-3">
                Have a question for Imran?
              </h2>
              <p className="text-sm sm:text-base text-slate-300 mb-6 max-w-xl mx-auto">
                Reach out on WhatsApp for advice before you buy, or to book a free pickup and diagnosis
                anywhere in Kuwait.
              </p>
              <Button
                size="lg"
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black"
                asChild
              >
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 mr-2" /> Message on WhatsApp
                </a>
              </Button>
              <div className="mt-6 pt-6 border-t border-cyan-500/20 flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-400">
                <Shield className="w-3.5 h-3.5 text-cyan-400" /> Technical review by the KCROC diagnostics team
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
