// File: app/frontend/src/pages/AuthorImran.tsx
import { Head } from 'vite-react-ssg';
import React from 'react';
import './KCROCEditorialRollout.css';
import { Link, useLocation } from 'react-router-dom';
import {
  MapPin, Wrench, Microscope, Shield, BookOpen, ArrowRight, MessageCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

import { buildWhatsAppLink } from '../utils/whatsappIntent';
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
    '@id': PAGE_URL + '#person',
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
      'MacBook motherboard repair',
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
  const ar = useLocation().pathname.startsWith('/ar/');
  const url = ar ? business.websiteUrl + '/ar/author/imran' : PAGE_URL;
  const title = ar ? 'عمران ناطق — مهندس تصليح الكمبيوتر ومؤسس KCROC' : 'Imran Natiq — Hardware Repair Engineer at KCROC Kuwait';
  const description = ar ? 'تعرف على عمران ناطق، مؤسس KCROC والفني الرئيسي في مختبر حولي، المتخصص في تشخيص المذربورد واللحام الدقيق وتبريد اللابتوب.' : 'Imran Natiq is a hardware repair engineer and founder of KCROC in Hawalli, Kuwait, specializing in motherboard diagnostics, micro-soldering, and laptop thermal repair.';
  const arabicArticles = [articles[2],{...articles[0],title:'درجات حرارة اللابتوب في الكويت (بالإنجليزي)'},{...articles[1],title:'دليل شراء اللابتوب في الكويت 2026 (بالإنجليزي)'}];
  const schema = {'@graph':[PERSON_SCHEMA[0],{...PERSON_SCHEMA[1],itemListElement:[{'@type':'ListItem',position:1,name:ar?'الرئيسية':'Home',item:business.websiteUrl+(ar?'/ar':'')},{'@type':'ListItem',position:2,name:ar?'عمران ناطق':'Imran Natiq',item:url}]},{'@type':'ProfilePage','@id':url+'#webpage',url,inLanguage:ar?'ar-KW':'en-KW',name:title,mainEntity:{'@id':PAGE_URL+'#person'}}]};
  const WA_LINK = buildWhatsAppLink("Hi KCROC, I read one of Imran's guides and have a question before I buy or repair my laptop.");

  return (
    <div className="w-full min-h-screen bg-gray-950 text-white font-sans selection:bg-cyan-500/30" data-kcroc-rollout="author" lang={ar?"ar-KW":"en-KW"} dir={ar?"rtl":"ltr"}>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content={description}
        />
        <link rel="canonical" href={url} />
        <link rel="alternate" hrefLang="en-KW" href={PAGE_URL}/>
        <link rel="alternate" hrefLang="ar-KW" href={business.websiteUrl+"/ar/author/imran"}/>
        <link rel="alternate" hrefLang="x-default" href={PAGE_URL}/>
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta property="og:type" content="profile" />
        <meta property="og:locale" content={ar?"ar_KW":"en_KW"}/>
        <meta property="og:locale:alternate" content={ar?"en_KW":"ar_KW"}/>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={`${business.websiteUrl}/logo.webp`} />
        <meta property="og:image:width" content="1024" />
        <meta property="og:image:height" content="1024" />
      </Head>

      <SchemaMarkup schema={schema} />

      {/* Breadcrumb */}
      <div className="pt-24 sm:pt-28 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl text-xs sm:text-sm text-slate-400 flex items-center gap-2">
          <Link to={ar?"/ar":"/"} className="hover:text-cyan-400 transition-colors">{ar?"الرئيسية":"Home"}</Link>
          <span>/</span>
          <span className="text-slate-300">{ar?"عمران ناطق":"Imran Natiq"}</span>
        </div>
      </div>

      {/* Author Hero */}
      <section className="pt-6 pb-8 sm:pb-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
            <CardContent className="p-5 sm:p-10 flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
              <img
                src={AUTHOR_IMAGE_URL}
                alt={ar?"عمران ناطق — المؤسس والفني الرئيسي في KCROC":"Imran Natiq — Founder & Lead Technician at KCROC Kuwait"}
                loading="eager"
                className="w-24 h-24 sm:w-36 sm:h-36 rounded-2xl object-cover border border-slate-800 flex-shrink-0"
                onError={(e) => { e.currentTarget.src = 'https://ui-avatars.com/api/?name=Imran+Natiq&size=300&background=06b6d4&color=0A0A0A&bold=true'; }}
              />
              <div>
                <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30 px-3 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-3">
                  {ar?"المؤسس والفني الرئيسي":"Founder & Lead Technician"}
                </Badge>
                <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-3">
                  {ar?"عمران ناطق":"Imran Natiq"}
                </h1>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
                  {ar?"فني متخصص بخبرة أكثر من 20 سنة في مجال الهاردوير في الكويت. أركز على فحص الأجهزة واللحام الدقيق وتشخيص وإصلاح المذربورد على مستوى المكونات، مع مراعاة خصوصية البيانات وتوضيح خيارات الإصلاح قبل بدء العمل.":"Senior technician with 20+ years of experience in Kuwait's enterprise hardware market. Specializes in advanced hardware testing, strict data safety protocols, and component-level motherboard recovery. Committed to transparent service and reclaiming hardware from the beyond repair category."}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {(ar?['فحص الهاردوير','خصوصية البيانات','اللحام الدقيق']:['Hardware Testing', 'Data Safety', 'Micro-Soldering']).map((skill) => (
                    <span key={skill} className="bg-brand-dark/80 border border-slate-800 text-slate-300 px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
                <p className="text-slate-500 text-xs sm:text-sm flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" /> {ar?"حولي، الكويت":"Based in Hawalli, Kuwait"}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-8 sm:py-16 px-4 sm:px-6 bg-slate-900/30 border-y border-slate-800" data-kcroc-editorial-panel="author-expertise">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-lg sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Microscope className="w-5 h-5 text-cyan-400" /> {ar?"مجالات الخبرة":"Areas of Expertise"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {(ar?['تشخيص مذربورد اللابتوب','تصليح لوحة ماك بوك','اللحام الدقيق على مستوى المكونات','تشخيص حرارة لابتوبات الألعاب']:[
              'Laptop motherboard diagnostics',
              'MacBook motherboard repair',
              'Component-level micro-soldering',
              'Gaming laptop thermal troubleshooting',
            ]).map((item) => (
              <Card key={item} className="bg-brand-dark/40 border-slate-800">
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
      <section className="py-8 sm:py-16 px-4 sm:px-6" data-kcroc-editorial-panel="author-articles">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-lg sm:text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-cyan-400" /> {ar?"مقالات عمران":"Articles by Imran"}
          </h2>
          <div className="space-y-3">
            {(ar?arabicArticles:articles).map((a) => (
              <Link key={a.href} to={a.href} lang={a.href.startsWith('/blog/ar/')?'ar':ar?'ar':'en'} data-author-article-language={a.href.startsWith('/blog/ar/')?'ar':'en'} className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
                <Card className="bg-slate-900/50 border-slate-800 hover:border-cyan-500/40 transition-colors">
                  <CardContent className="p-4 sm:p-5 flex items-center justify-between text-sm sm:text-base text-slate-200">
                    {a.title}
                    <ArrowRight className={"w-4 h-4 text-cyan-400 flex-shrink-0 "+(ar?"rotate-180":"")} aria-hidden="true"/>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-8 sm:py-16 px-4 sm:px-6 bg-slate-900/30 border-y border-slate-800" data-kcroc-editorial-panel="author-cta">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-gradient-to-bl from-cyan-600/20 via-blue-600/20 to-emerald-600/20 border-cyan-500/30 backdrop-blur-sm">
            <CardContent className="p-6 sm:p-10 text-center">
              <h2 className="text-xl sm:text-3xl font-bold text-white mb-3">
                {ar?"عندك سؤال لعمران؟":"Have a question for Imran?"}
              </h2>
              <p className="text-sm sm:text-base text-slate-300 mb-6 max-w-xl mx-auto">
                {ar?"تواصل معانا على واتساب للاستفسار قبل الشراء أو لترتيب استلام وفحص مجاني في الكويت.":"Reach out on WhatsApp for advice before you buy, or to book a free pickup and diagnosis anywhere in Kuwait."}
              </p>
              <Button
                size="lg"
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black"
                asChild
              >
                <a href={ar?buildWhatsAppLink("السلام عليكم، قريت دليل عمران وعندي استفسار قبل شراء أو تصليح اللابتوب."):WA_LINK} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 me-2" aria-hidden="true"/> {ar?"راسلنا على واتساب":"Message on WhatsApp"}
                </a>
              </Button>
              <div className="mt-4 flex flex-wrap justify-center gap-4"><Link to={ar?"/ar/book":"/book"} className="text-cyan-300 underline">{ar?"احجز استلام مجاني":"Book free pickup"}</Link><Link to={ar?"/ar/about":"/about"} className="text-cyan-300 underline">{ar?"عن مختبر KCROC":"About the KCROC lab"}</Link></div>
              <div className="mt-6 pt-6 border-t border-cyan-500/20 flex items-center justify-center gap-2 text-xs sm:text-sm text-slate-400">
                <Shield className="w-3.5 h-3.5 text-cyan-400" /> {ar?"مراجعة فنية من فريق تشخيص KCROC":"Technical review by the KCROC diagnostics team"}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
