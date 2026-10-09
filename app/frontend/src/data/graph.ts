// File: app/frontend/src/data/graph.ts
import {
  RawGraphData, RoutableEntity, LocationEntity, ServiceEntity,
  FAQEntity, WebPageEntity, BusinessEntity, USPEntity, TrustBadgeEntity,
  ProcessEntity, StatsEntity, FooterEntity, ReviewsEntity,
  BrandEntity, ProblemEntity, CaseStudyEntity
} from '../types/knowledgeGraph.js';
import { IMAGES } from '../constants/images.js';

export const rawGraphData: RawGraphData = {
  metadata: {
    version: '3.8.3',
    lastUpdated: '2026-10-08T00:00:00+03:00',
    environment: 'production'
  },

  entities: {

    /* ═══════════════════════════════════════════════════════════════
       BUSINESS ENTITY
    ═══════════════════════════════════════════════════════════════ */
    'biz-kcroc': {
      id: 'biz-kcroc', entityType: 'Business', isActive: true,
      title: 'Kuwait Computer Repair On Call', legalName: 'Kuwait Computer Repair On Call', alternateName: 'KCROC',
      telephone: '96555301913', streetAddress: 'Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19',
      addressLocality: 'Hawalli', addressRegion: 'Hawalli Governorate', addressCountry: 'KW',
      coords: { lat: 29.3416921515256, lng: 48.00761257498341 }, websiteUrl: 'https://www.computerrepairkuwait.com',
      logoUrl: 'https://www.computerrepairkuwait.com/logo.webp', email: 'info@computerrepairkuwait.com',
      priceRange: '$$', openingHours: 'Open daily 10:00 AM – 10:00 PM',
      schemaOpeningHours: { dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '10:00', closes: '22:00' },
      aggregateRating: { ratingValue: '4.9', reviewCount: 158, bestRating: 5 },
      socialLinks: { facebook: 'https://www.facebook.com/computerrepairkuwait', instagram: 'https://www.instagram.com/computerrepairkuwait', googleMaps: 'https://www.google.com/maps/place/?q=place_id:ChIJzapykEqbzz8RZsrwoaORhjY' },
      aiSummary: 'Kuwait Computer Repair On Call (KCROC) is a Hawalli-based component-level computer repair specialist. Services include laptop and MacBook repair, gaming PC repair, motherboard chip-level diagnostics, screen replacement, battery replacement, charging-port repair, hinge and chassis repair, keyboard replacement, SSD and RAM upgrades, liquid-damage repair, gaming laptop thermal servicing, and virus removal. Free pickup and delivery across all Kuwait governorates. 30-day warranty on completed repairs. No Fix, No Fee policy.',
    } as BusinessEntity,

    /* ═══════════════════════════════════════════════════════════════
       TRUST BADGES & STATS
    ═══════════════════════════════════════════════════════════════ */
    'badge-privacy':  { id: 'badge-privacy',  entityType: 'TrustBadge', isActive: true, title: 'Privacy Protected', iconKey: 'ShieldCheck' } as TrustBadgeEntity,
    'badge-pickup':   { id: 'badge-pickup',   entityType: 'TrustBadge', isActive: true, title: 'Free Pickup & Delivery',        iconKey: 'Truck'       } as TrustBadgeEntity,
    'badge-warranty': { id: 'badge-warranty', entityType: 'TrustBadge', isActive: true, title: '30-Day Repair Warranty',         iconKey: 'Clock'       } as TrustBadgeEntity,
    'badge-esd':      { id: 'badge-esd',      entityType: 'TrustBadge', isActive: true, title: 'ESD-Safe Lab',            iconKey: 'Zap'         } as TrustBadgeEntity,

    'stats-row': {
      id: 'stats-row', entityType: 'Stats', isActive: true, title: 'Homepage Stats',
      items: [
        { label: 'Repairs completed', value: '500+',    sub: 'Since launch across Kuwait' },
        { label: 'Success rate',        value: '98%',     sub: 'On complex motherboard repairs' },
        { label: 'Warranty',            value: '30 days', sub: 'All parts and labor' },
        { label: 'Pick & drop',         value: 'Free',    sub: 'Zero hidden transport fees' }
      ]
    } as StatsEntity,

    /* ═══════════════════════════════════════════════════════════════
       USPs
    ═══════════════════════════════════════════════════════════════ */
    'usp-component': { id: 'usp-component', entityType: 'USP', isActive: true, iconKey: 'Cpu', title: 'Component-Level Repair', description: 'We diagnose the board itself using micro-soldering and trace repair — not just replace it. This saves you from paying for an entirely new motherboard and keeps your original data intact.', differentiator: 'Most shops in Kuwait replace the whole board. We fix the one failed chip.' } as USPEntity,
    'usp-nofix': { id: 'usp-nofix', entityType: 'USP', isActive: true, iconKey: 'ShieldCheck', title: 'No Fix, No Fee', description: 'Our diagnostics are precise and risk-free. If your device is catastrophically damaged or not economically repairable, you pay absolutely nothing — not even for the diagnostic.', differentiator: 'You only pay when your device is fully repaired and working.' } as USPEntity,
    'usp-logistics': { id: 'usp-logistics', entityType: 'USP', isActive: true, iconKey: 'Truck', title: 'Free Pick & Drop — All Kuwait', description: 'We cover Hawalli, Salmiya, Kuwait City, Farwaniya, Ahmadi, Jahra, and beyond. Our courier collects from your home or office and returns the repaired device directly to you.', differentiator: 'No need to leave your home or office. We handle the traffic.' } as USPEntity,
    'usp-privacy': { id: 'usp-privacy', entityType: 'USP', isActive: true, iconKey: 'Lock', title: 'Strict Data Privacy', description: 'We operate under strict hardware-only protocols. Our technicians use diagnostic tools — not your files. For board-level repairs, you can remove your drive before handing over the device.', differentiator: 'Your personal files are never opened, accessed, or browsed during repair.' } as USPEntity,
    'usp-climate': { id: 'usp-climate', entityType: 'USP', isActive: true, iconKey: 'Thermometer', title: 'Kuwait Climate Expertise', description: 'Kuwait\'s extreme heat and dust accelerate hardware failure. We apply phase-change thermal materials and perform ultrasonic cleaning specifically tuned for our climate — not generic procedures.', differentiator: 'We know exactly how Kuwait summers destroy laptops. We fix that specifically.' } as USPEntity,

    /* ═══════════════════════════════════════════════════════════════
       PROCESS
    ═══════════════════════════════════════════════════════════════ */
    'proc-standard': {
      id: 'proc-standard', entityType: 'Process', isActive: true, title: 'Standard Repair Process',
      steps: [
        { step: 1, title: 'Free collection — we come to you', description: 'Book via WhatsApp. Our driver collects your device directly from your doorstep across all Kuwait — no deposit, no minimum spend. We tag and log every device for full chain-of-custody tracking.' },
        { step: 2, title: 'Precision diagnostic — no guesswork', description: 'Your device enters our Hawalli lab where technicians use thermal imaging, digital multimeters, and boardview software to trace the exact component fault. You receive a fixed quote before we touch a tool.' },
        { step: 3, title: 'Repair, stress-test, and return', description: "We execute the micro-soldering or hardware replacement, then stress-test the system under full load for stability. If it passes, we deliver it back. If we can't fix it, you pay nothing." }
      ]
    } as ProcessEntity,

    /* ═══════════════════════════════════════════════════════════════
       STATIC WEB PAGES (For Sitemap & SEO Architecture)
    ═══════════════════════════════════════════════════════════════ */
    'page-home': {
      id: 'page-home', slug: '', entityType: 'WebPage', isActive: true,
      title: 'Home', description: 'KCROC Homepage — Component-level computer repair in Kuwait',
      seo: { title: 'Laptop & Computer Repair Kuwait | From 15 KWD | KCROC', description: 'Laptop and computer repair in Kuwait from 15 KWD. Screen, battery, charging and motherboard diagnosis at our Hawalli lab, with free pickup, a clear quote before repair and a 30-day warranty.', canonicalUrl: 'https://www.computerrepairkuwait.com/', locale: 'en_KW', alternates: { 'en-KW': 'https://www.computerrepairkuwait.com/', 'ar-KW': 'https://www.computerrepairkuwait.com/ar/computer-repair-kuwait', 'x-default': 'https://www.computerrepairkuwait.com/' }, ogType: 'website', schemaTypes: ['LocalBusiness', 'WebSite', 'WebPage'], lastModified: '2026-10-10T00:00:00+03:00' },
      hero: { headline: 'Kuwait\'s Expert Component-Level Repair Service.', subheadline: 'We Fix the Board. We Don\'t Just Swap It.', description: 'We diagnose and repair failed components at board level — restoring devices that most repair shops in Kuwait would simply declare beyond repair.', primaryCTA: { text: 'WhatsApp a Technician', route: 'https://wa.me/96555301913' }, secondaryCTA: { text: 'View All Services', route: '/services' } },
      featuredFAQIds: [
        'faq-pick-and-drop', 
        'faq-liquid-damage', 
        'faq-no-fix',
        'faq-warranty',
        'faq-data-safe',
        'faq-same-day',
        'faq-cost'
      ], 
      featuredUSPIds: ['usp-component', 'usp-nofix', 'usp-logistics', 'usp-privacy']
    } as WebPageEntity,
    'page-services': { id: 'page-services', slug: 'services', entityType: 'WebPage', isActive: true, title: 'Services', description: 'All KCROC repair services', seo: { title: 'Laptop, MacBook & PC Repair Services Kuwait | KCROC', description: 'Specialist computer repair services in Kuwait including laptop, MacBook, gaming PC and gaming laptop repair, screens, batteries, charging ports, upgrades and board-level faults. Free pickup and 30-day warranty.', canonicalUrl: 'https://www.computerrepairkuwait.com/services', ogType: 'website', schemaTypes: ['CollectionPage', 'WebPage', 'BreadcrumbList', 'LocalBusiness'], breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }] } } as WebPageEntity,
    'page-locations': { id: 'page-locations', slug: 'locations', entityType: 'WebPage', isActive: true, title: 'Service Areas', description: 'KCROC service areas across Kuwait.', seo: { title: 'Computer Repair Service Areas Across Kuwait | KCROC', description: 'Explore KCROC\'s dedicated computer and laptop repair service areas across Kuwait. Free pickup and delivery from our central Hawalli repair lab.', canonicalUrl: 'https://www.computerrepairkuwait.com/locations', ogType: 'website', schemaTypes: ['CollectionPage', 'WebPage', 'BreadcrumbList'], lastModified: '2026-10-03T00:00:00+03:00', breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Service Areas', url: '/locations' }] } } as WebPageEntity,
    'page-near-me': {
      id: 'page-near-me', slug: 'near-me', entityType: 'WebPage', isActive: true,
      title: 'Computer Repair Near Me in Kuwait',
      description: 'Find a computer or laptop repair technician near you in Kuwait for PCs, MacBooks and gaming systems, with free pickup and delivery from our Hawalli repair lab.',
      seo: {
        title: 'Computer Repair Near Me | Free Pickup, Open Till 10 PM | KCROC',
        description: 'Computer repair near you in Kuwait: we collect your laptop or PC free, repair it at our Hawalli lab and deliver it back. Diagnosis first, 30-day warranty.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/near-me',
        locale: 'en_KW',
        alternates: {
          'en-KW': 'https://www.computerrepairkuwait.com/near-me',
          'ar-KW': 'https://www.computerrepairkuwait.com/ar/near-me',
          'x-default': 'https://www.computerrepairkuwait.com/near-me'
        },
        ogType: 'website',
        schemaTypes: ['WebPage', 'FAQPage', 'BreadcrumbList'],
        lastModified: '2026-09-27T00:00:00+03:00',
        breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Computer Repair Near Me', url: '/near-me' }]
      },
      hero: {
        headline: 'Computer Repair Near Me in Kuwait',
        subheadline: 'A local technician, without the trip to the shop.',
        description: 'KCROC provides professional PC, laptop, MacBook, gaming PC and motherboard repair from our Hawalli lab, with free pickup and delivery across Kuwait.',
        primaryCTA: { text: 'Book Free Pickup', route: '/book' },
        secondaryCTA: { text: 'Find Your Area', route: '/location/hawalli' }
      },
      featuredFAQIds: [
        'faq-pick-and-drop', 'faq-no-fix', 'faq-warranty', 'faq-same-day', 'faq-cost',
        'faq-near-me-local', 'faq-near-me-home', 'faq-near-me-reliable', 'faq-arabic-computer-technician'
      ],
      featuredUSPIds: ['usp-logistics', 'usp-component', 'usp-nofix', 'usp-privacy']
    } as WebPageEntity,

    // 🚀 ARABIC HUB: real, standalone, crawlable Arabic page — not just an
    // anchor/section inside the English near-me page. Targets the highest
    // demand-to-content-ratio queries in GSC (فني كمبيوتر at position #2 with
    // almost no dedicated Arabic content). Hreflang-linked to page-near-me
    // above, and locale 'ar_KW' makes SEOEngine render this page RTL with a
    // correct <html lang> automatically — see SEOEngine.tsx.
    'page-near-me-ar': {
      id: 'page-near-me-ar', slug: 'ar/near-me', entityType: 'WebPage', isActive: true,
      title: 'فني كمبيوتر وتصليح لابتوب في الكويت',
      description: 'فني كمبيوتر في الكويت لتشخيص وإصلاح الكمبيوتر واللابتوب والماك بوك. استلام من المنزل أو المكتب وتوصيل مجاني من مختبر حولي، مع عرض السعر قبل الإصلاح وضمان 30 يومًا.',
      seo: {
        title: 'فني كمبيوتر الكويت | تصليح كمبيوتر حولي ولابتوب | KCROC',
        description: 'تحتاج فني كمبيوتر في الكويت أو حولي؟ نشخص أعطال الكمبيوتر واللابتوب قبل الإصلاح، ونرتب استلام الجهاز من المنزل أو المكتب وتوصيله مجانًا من مختبرنا في حولي. عرض سعر واضح وضمان 30 يومًا.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/ar/near-me',
        locale: 'ar_KW',
        alternates: {
          'ar-KW': 'https://www.computerrepairkuwait.com/ar/near-me',
          'en-KW': 'https://www.computerrepairkuwait.com/near-me',
          'x-default': 'https://www.computerrepairkuwait.com/near-me'
        },
        ogType: 'website',
        schemaTypes: ['WebPage', 'FAQPage', 'BreadcrumbList'],
        lastModified: '2026-10-09T00:00:00+03:00',
        breadcrumbs: [{ name: 'الرئيسية', url: '/' }, { name: 'فني كمبيوتر في الكويت', url: '/ar/near-me' }]
      },
      featuredFAQIds: [
        'faq-arabic-computer-technician', 'faq-ar-hawalli-technician', 'faq-ar-pricing',
        'faq-ar-hours', 'faq-ar-maintenance', 'faq-ar-laptop-repair-process'
      ]
    } as WebPageEntity,
    'page-computer-repair': {
      id: 'page-computer-repair',
      slug: 'computer-repair-kuwait',
      entityType: 'WebPage',
      isActive: true,
      title: 'Computer Repair Kuwait',
      description: 'Computer and laptop repair in Kuwait with diagnosis before repair, free pickup and delivery, starting prices from 15 KWD, and a 30-day warranty on completed repairs.',
      seo: {
        title: 'Computer Repair Kuwait | PC & Laptop Repair | KCROC',
        description: 'Need computer repair in Kuwait? KCROC diagnoses laptop, desktop PC, MacBook and motherboard faults at our Hawalli lab. Free pickup and delivery, clear quote before repair, and a 30-day warranty.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/computer-repair-kuwait',
        locale: 'en_KW',
        alternates: {
          // No ar-KW alternate: /ar/computer-repair-kuwait is the Arabic counterpart of '/'
          // (it declares en-KW -> '/'), so claiming it here would be a non-reciprocal hreflang.
          'en-KW': 'https://www.computerrepairkuwait.com/computer-repair-kuwait',
          'x-default': 'https://www.computerrepairkuwait.com/computer-repair-kuwait'
        },
        ogType: 'website',
        schemaTypes: ['WebPage', 'BreadcrumbList', 'FAQPage'],
        lastModified: '2026-10-10T00:00:00+03:00',
        breadcrumbs: [
          { name: 'Home', url: '/' },
          { name: 'Computer Repair Kuwait', url: '/computer-repair-kuwait' }
        ]
      },
      featuredFAQIds: []
    } as WebPageEntity,

    'page-ar-computer-repair': {
      id: 'page-ar-computer-repair', slug: 'ar/computer-repair-kuwait', entityType: 'WebPage', isActive: true,
      title: 'فني كمبيوتر في الكويت | تصليح كمبيوتر ولابتوب',
      description: 'فني كمبيوتر في الكويت لتصليح الكمبيوتر واللابتوب مع تشخيص قبل الإصلاح، استلام وتوصيل مجاني، وضمان 30 يومًا من مختبر KCROC في حولي.',
      seo: {
        title: 'تصليح كمبيوتر الكويت | صيانة كمبيوتر ولابتوب | KCROC',
        description: 'تصليح وصيانة كمبيوتر ولابتوب في الكويت. تشخيص قبل الإصلاح، استلام وتوصيل مجاني، ضمان 30 يوم، ومختبر KCROC في حولي مفتوح يوميًا من 10 ص إلى 10 م.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/ar/computer-repair-kuwait',
        locale: 'ar_KW',
        alternates: {
          'ar-KW': 'https://www.computerrepairkuwait.com/ar/computer-repair-kuwait',
          'en-KW': 'https://www.computerrepairkuwait.com/',
          'x-default': 'https://www.computerrepairkuwait.com/'
        },
        ogType: 'website', schemaTypes: ['WebPage', 'BreadcrumbList', 'FAQPage', 'Service'],
        lastModified: '2026-09-28T00:00:00+03:00',
        breadcrumbs: [{ name: 'الرئيسية', url: '/' }, { name: 'تصليح كمبيوتر في الكويت', url: '/ar/computer-repair-kuwait' }]
      },
      relatedServiceIds: ['srv-laptop', 'srv-motherboard', 'srv-gaming', 'srv-macbook', 'srv-screen']
    } as WebPageEntity,

    'page-ar-laptop-repair': {
      id: 'page-ar-laptop-repair', slug: 'ar/laptop-repair-kuwait', entityType: 'WebPage', isActive: true,
      title: 'تصليح لابتوب في الكويت',
      description: 'تصليح لابتوبات في الكويت لمشاكل الشاشة والبطارية والشحن والتبريد واللوحة الأم، مع استلام وتوصيل مجاني.',
      seo: {
        title: 'تصليح لابتوب الكويت | فني لابتوب واستلام مجاني | KCROC',
        description: 'تصليح لابتوب في الكويت لمشاكل الشاشة، البطارية، الشحن، الحرارة واللوحة الأم. تشخيص قبل الإصلاح واستلام وتوصيل مجاني.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/ar/laptop-repair-kuwait',
        locale: 'ar_KW',
        alternates: { 'ar-KW': 'https://www.computerrepairkuwait.com/ar/laptop-repair-kuwait', 'en-KW': 'https://www.computerrepairkuwait.com/laptop-repair-kuwait', 'x-default': 'https://www.computerrepairkuwait.com/laptop-repair-kuwait' },
        ogType: 'website', schemaTypes: ['WebPage', 'BreadcrumbList'], lastModified: '2026-09-28T00:00:00+03:00',
        breadcrumbs: [{ name: 'الرئيسية', url: '/' }, { name: 'تصليح لابتوب في الكويت', url: '/ar/laptop-repair-kuwait' }]
      },
      relatedServiceIds: ['srv-laptop', 'srv-motherboard', 'srv-screen', 'srv-battery', 'srv-charging-port']
    } as WebPageEntity,

    'page-ar-motherboard-repair': {
      id: 'page-ar-motherboard-repair', slug: 'ar/motherboard-repair-kuwait', entityType: 'WebPage', isActive: true,
      title: 'تصليح اللوحة الأم في الكويت',
      description: 'تصليح مكونات اللوحة الأم للابتوب والكمبيوتر في الكويت بدل استبدال اللوحة كاملة عندما يكون الإصلاح ممكنًا.',
      seo: {
        title: 'تصليح المذربورد واللوحة الأم الكويت | إصلاح تشيب ليفل | KCROC',
        description: 'تشخيص وإصلاح أعطال اللوحة الأم والـ motherboard في الكويت، بما فيها دوائر الطاقة والشحن والأعطال الناتجة عن السوائل، مع استلام مجاني.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/ar/motherboard-repair-kuwait',
        locale: 'ar_KW',
        alternates: { 'ar-KW': 'https://www.computerrepairkuwait.com/ar/motherboard-repair-kuwait', 'en-KW': 'https://www.computerrepairkuwait.com/motherboard-repair-kuwait', 'x-default': 'https://www.computerrepairkuwait.com/motherboard-repair-kuwait' },
        ogType: 'website', schemaTypes: ['WebPage', 'BreadcrumbList'], lastModified: '2026-09-28T00:00:00+03:00',
        breadcrumbs: [{ name: 'الرئيسية', url: '/' }, { name: 'تصليح اللوحة الأم', url: '/ar/motherboard-repair-kuwait' }]
      },
      relatedServiceIds: ['srv-motherboard', 'srv-laptop', 'srv-charging-port', 'srv-liquid-damage']
    } as WebPageEntity,

    'page-ar-gaming-pc-repair': {
      id: 'page-ar-gaming-pc-repair', slug: 'ar/gaming-pc-repair-kuwait', entityType: 'WebPage', isActive: true,
      title: 'تصليح بي سي قيمنق وGaming PC في الكويت',
      description: 'تصليح Gaming PC وبي سي قيمنق وكرت الشاشة في الكويت: FPS، حرارة، تقطيع، إطفاء مفاجئ، GPU، VRAM، طاقة وتبريد، مع استلام وتوصيل داخل الكويت.',
      seo: {
        title: 'تصليح بي سي قيمنق وGaming PC الكويت | GPU وFPS | KCROC',
        description: 'بي سي قيمنق يهنّق أو يطفي؟ FPS نازل أو GPU يطلع خطوط؟ تشخيص وإصلاح Gaming PC وكرت الشاشة والحرارة والطاقة في الكويت. من 25 د.ك، واستلام وتوصيل.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/ar/gaming-pc-repair-kuwait',
        locale: 'ar_KW',
        alternates: { 'ar-KW': 'https://www.computerrepairkuwait.com/ar/gaming-pc-repair-kuwait', 'en-KW': 'https://www.computerrepairkuwait.com/gaming-pc-repair-kuwait', 'x-default': 'https://www.computerrepairkuwait.com/gaming-pc-repair-kuwait' },
        ogType: 'website', schemaTypes: ['WebPage', 'BreadcrumbList', 'Service'], lastModified: '2026-10-03T00:00:00+03:00',
        breadcrumbs: [{ name: 'الرئيسية', url: '/' }, { name: 'تصليح Gaming PC وبي سي قيمنق', url: '/ar/gaming-pc-repair-kuwait' }]
      },
      relatedServiceIds: ['srv-gaming', 'srv-gaming-laptop-cleaning', 'srv-motherboard', 'srv-laptop']
    } as WebPageEntity,

    'page-ar-laptop-screen-repair': {
      id: 'page-ar-laptop-screen-repair', slug: 'ar/laptop-screen-repair-kuwait', entityType: 'WebPage', isActive: true,
      title: 'تصليح وتبديل شاشة اللابتوب في الكويت',
      description: 'تبديل شاشة اللابتوب وإصلاح مشاكل الصورة والإضاءة في الكويت، مع مطابقة القطعة للموديل واستلام وتوصيل مجاني.',
      seo: {
        title: 'تبديل شاشة اللابتوب الكويت | تصليح شاشة اللاب | KCROC',
        description: 'شاشة اللابتوب مكسورة أو سوداء أو تومض؟ KCROC يشخص العطل ويبدل الشاشة المناسبة للموديل مع استلام وتوصيل مجاني في الكويت.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/ar/laptop-screen-repair-kuwait',
        locale: 'ar_KW',
        alternates: { 'ar-KW': 'https://www.computerrepairkuwait.com/ar/laptop-screen-repair-kuwait', 'en-KW': 'https://www.computerrepairkuwait.com/laptop-screen-repair-kuwait', 'x-default': 'https://www.computerrepairkuwait.com/laptop-screen-repair-kuwait' },
        ogType: 'website', schemaTypes: ['WebPage', 'BreadcrumbList'], lastModified: '2026-09-28T00:00:00+03:00',
        breadcrumbs: [{ name: 'الرئيسية', url: '/' }, { name: 'تصليح شاشة اللابتوب', url: '/ar/laptop-screen-repair-kuwait' }]
      },
      relatedServiceIds: ['srv-screen', 'srv-laptop', 'srv-battery', 'srv-hinge']
    } as WebPageEntity,

    'page-ar-hawalli-computer-repair': {
      id: 'page-ar-hawalli-computer-repair', slug: 'ar/computer-repair-hawalli', entityType: 'WebPage', isActive: true,
      title: 'تصليح كمبيوتر حولي وفني لابتوب',
      description: 'تصليح كمبيوتر ولابتوب في حولي من مختبر KCROC، مع استلام وتوصيل مجاني من المنزل أو المكتب وباقي مناطق الكويت.',
      seo: {
        title: 'تصليح كمبيوتر حولي | فني كمبيوتر ولابتوب | KCROC',
        description: 'تحتاج فني كمبيوتر في حولي؟ KCROC يصلح الكمبيوتر واللابتوب من مختبره في مجمع الملا، شارع ابن خلدون. تشخيص قبل الإصلاح، استلام وتوصيل مجاني، وعرض سعر واضح وضمان 30 يومًا.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/ar/computer-repair-hawalli',
        locale: 'ar_KW', alternates: { 'ar-KW': 'https://www.computerrepairkuwait.com/ar/computer-repair-hawalli', 'en-KW': 'https://www.computerrepairkuwait.com/location/hawalli', 'x-default': 'https://www.computerrepairkuwait.com/location/hawalli' },
        ogType: 'website', schemaTypes: ['WebPage', 'BreadcrumbList'], lastModified: '2026-10-09T00:00:00+03:00',
        breadcrumbs: [{ name: 'الرئيسية', url: '/' }, { name: 'تصليح كمبيوتر حولي', url: '/ar/computer-repair-hawalli' }]
      },
      relatedServiceIds: ['srv-laptop', 'srv-motherboard', 'srv-screen', 'srv-battery', 'srv-macbook', 'srv-gaming', 'srv-gaming-laptop']
    } as WebPageEntity,

    'page-ar-salmiya-computer-repair': {
      id: 'page-ar-salmiya-computer-repair', slug: 'ar/computer-repair-salmiya', entityType: 'WebPage', isActive: true,
      title: "تصليح كمبيوتر السالمية وفني لابتوب",
      description: "تصليح كمبيوتر ولابتوب في السالمية مع استلام وتوصيل مجاني من الرميثية وسلوى والبدع، والإصلاح في مختبر KCROC بحولي.",
      seo: {
        title: "تصليح كمبيوتر السالمية | فني لابتوب واستلام مجاني | KCROC",
        description: "تصليح كمبيوتر ولابتوب في السالمية والرميثية وسلوى والبدع. تشخيص قبل الإصلاح، معالجة أضرار السوائل، استلام وتوصيل مجاني، وضمان 30 يومًا.",
        canonicalUrl: 'https://www.computerrepairkuwait.com/ar/computer-repair-salmiya',
        locale: 'ar_KW', alternates: { 'ar-KW': 'https://www.computerrepairkuwait.com/ar/computer-repair-salmiya', 'en-KW': 'https://www.computerrepairkuwait.com/location/salmiya', 'x-default': 'https://www.computerrepairkuwait.com/location/salmiya' },
        ogType: 'website', schemaTypes: ['WebPage', 'BreadcrumbList'], lastModified: '2026-10-04T00:00:00+03:00',
        breadcrumbs: [{ name: 'الرئيسية', url: '/' }, { name: "تصليح كمبيوتر ولابتوب في السالمية", url: '/ar/computer-repair-salmiya' }]
      },
      relatedServiceIds: ['srv-laptop', 'srv-macbook', 'srv-motherboard', 'srv-screen', 'srv-battery']
    } as WebPageEntity,

    'page-ar-jahra-computer-repair': {
      id: 'page-ar-jahra-computer-repair', slug: 'ar/computer-repair-jahra', entityType: 'WebPage', isActive: true,
      title: "تصليح كمبيوتر الجهراء وفني لابتوب",
      description: "تصليح كمبيوتر ولابتوب في الجهراء مع استلام وتوصيل مجاني من سعد العبدالله والنعيم والقصر وتيماء، والإصلاح في مختبر KCROC بحولي.",
      seo: {
        title: "تصليح كمبيوتر الجهراء | فني لابتوب واستلام مجاني | KCROC",
        description: "تصليح كمبيوتر ولابتوب في الجهراء وسعد العبدالله والنعيم والقصر وتيماء. تنظيف وتغيير المعجون الحراري، فحص اللوحة الأم، استلام وتوصيل مجاني، وضمان 30 يومًا.",
        canonicalUrl: 'https://www.computerrepairkuwait.com/ar/computer-repair-jahra',
        locale: 'ar_KW', alternates: { 'ar-KW': 'https://www.computerrepairkuwait.com/ar/computer-repair-jahra', 'en-KW': 'https://www.computerrepairkuwait.com/location/jahra', 'x-default': 'https://www.computerrepairkuwait.com/location/jahra' },
        ogType: 'website', schemaTypes: ['WebPage', 'BreadcrumbList'], lastModified: '2026-10-07T00:00:00+03:00',
        breadcrumbs: [{ name: 'الرئيسية', url: '/' }, { name: "تصليح كمبيوتر ولابتوب في الجهراء", url: '/ar/computer-repair-jahra' }]
      },
      relatedServiceIds: ['srv-laptop', 'srv-gaming-laptop-cleaning', 'srv-motherboard', 'srv-gaming-laptop', 'srv-battery']
    } as WebPageEntity,

    'page-ar-farwaniya-computer-repair': {
      id: 'page-ar-farwaniya-computer-repair', slug: 'ar/computer-repair-farwaniya', entityType: 'WebPage', isActive: true,
      title: "تصليح كمبيوتر الفروانية وفني لابتوب",
      description: "تصليح كمبيوتر ولابتوب في الفروانية مع استلام وتوصيل مجاني من خيطان والرقعي والعارضية وجليب الشيوخ، والإصلاح في مختبر KCROC بحولي.",
      seo: {
        title: "تصليح كمبيوتر الفروانية | فني لابتوب واستلام مجاني | KCROC",
        description: "تصليح كمبيوتر ولابتوب في الفروانية وخيطان والرقعي والعارضية وجليب الشيوخ. فحص الطاقة والشحن، شاشات وبطاريات، استلام وتوصيل مجاني، وضمان 30 يومًا.",
        canonicalUrl: 'https://www.computerrepairkuwait.com/ar/computer-repair-farwaniya',
        locale: 'ar_KW', alternates: { 'ar-KW': 'https://www.computerrepairkuwait.com/ar/computer-repair-farwaniya', 'en-KW': 'https://www.computerrepairkuwait.com/location/farwaniya', 'x-default': 'https://www.computerrepairkuwait.com/location/farwaniya' },
        ogType: 'website', schemaTypes: ['WebPage', 'BreadcrumbList'], lastModified: '2026-10-04T00:00:00+03:00',
        breadcrumbs: [{ name: 'الرئيسية', url: '/' }, { name: "تصليح كمبيوتر ولابتوب في الفروانية", url: '/ar/computer-repair-farwaniya' }]
      },
      relatedServiceIds: ['srv-laptop', 'srv-motherboard', 'srv-screen', 'srv-battery', 'srv-gaming']
    } as WebPageEntity,

    'page-ar-kuwait-city-computer-repair': {
      id: 'page-ar-kuwait-city-computer-repair', slug: 'ar/computer-repair-kuwait-city', entityType: 'WebPage', isActive: true,
      title: "تصليح كمبيوتر مدينة الكويت وفني لابتوب",
      description: "تصليح كمبيوتر ولابتوب في مدينة الكويت مع استلام وتوصيل مجاني من شرق ودسمان والمرقاب والقبلة، والإصلاح في مختبر KCROC بحولي.",
      seo: {
        title: "تصليح كمبيوتر مدينة الكويت | فني لابتوب واستلام مجاني | KCROC",
        description: "تصليح كمبيوتر ولابتوب في مدينة الكويت وشرق ودسمان والمرقاب والقبلة. شاشات وأعطال الطاقة والشحن، استلام وتوصيل مجاني من البيت أو المكتب، وضمان 30 يومًا.",
        canonicalUrl: 'https://www.computerrepairkuwait.com/ar/computer-repair-kuwait-city',
        locale: 'ar_KW', alternates: { 'ar-KW': 'https://www.computerrepairkuwait.com/ar/computer-repair-kuwait-city', 'en-KW': 'https://www.computerrepairkuwait.com/location/kuwait-city', 'x-default': 'https://www.computerrepairkuwait.com/location/kuwait-city' },
        ogType: 'website', schemaTypes: ['WebPage', 'BreadcrumbList'], lastModified: '2026-10-04T00:00:00+03:00',
        breadcrumbs: [{ name: 'الرئيسية', url: '/' }, { name: "تصليح كمبيوتر ولابتوب في مدينة الكويت", url: '/ar/computer-repair-kuwait-city' }]
      },
      relatedServiceIds: ['srv-laptop', 'srv-screen', 'srv-motherboard', 'srv-macbook', 'srv-battery']
    } as WebPageEntity,

    'page-ar-macbook-repair': {
      id: 'page-ar-macbook-repair', slug: 'ar/macbook-repair-kuwait', entityType: 'WebPage', isActive: true,
      title: 'تصليح MacBook في الكويت', description: 'تصليح MacBook واللوحة الأم والشحن والطاقة وأعطال الشاشة والبطارية في الكويت، مع تشخيص قبل الإصلاح واستلام مجاني.',
      seo: {
        title: 'تصليح MacBook الكويت | ماك بوك واستلام مجاني | KCROC',
        description: 'تصليح MacBook في الكويت لمشاكل الشاشة والشحن والطاقة والبطارية واللوحة الأم. تشخيص قبل الإصلاح واستلام وتوصيل مجاني.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/ar/macbook-repair-kuwait', locale: 'ar_KW',
        alternates: { 'ar-KW': 'https://www.computerrepairkuwait.com/ar/macbook-repair-kuwait', 'en-KW': 'https://www.computerrepairkuwait.com/macbook-repair-kuwait', 'x-default': 'https://www.computerrepairkuwait.com/macbook-repair-kuwait' },
        ogType: 'website', schemaTypes: ['WebPage', 'BreadcrumbList'], lastModified: '2026-10-02T00:00:00+03:00', breadcrumbs: [{ name: 'الرئيسية', url: '/' }, { name: 'تصليح MacBook', url: '/ar/macbook-repair-kuwait' }]
      },
      relatedServiceIds: ['srv-macbook', 'srv-macbook-screen', 'srv-battery', 'srv-motherboard']
    } as WebPageEntity,

    'page-ar-macbook-screen-replacement': {
      id: 'page-ar-macbook-screen-replacement', slug: 'ar/macbook-screen-replacement-kuwait', entityType: 'WebPage', isActive: true,
      title: 'تبديل شاشة MacBook في الكويت', description: 'تبديل شاشة MacBook Air وMacBook Pro في الكويت للشاشة المكسورة أو السوداء أو التي فيها خطوط أو وميض، مع مطابقة الموديل.',
      seo: {
        title: 'تبديل شاشة MacBook الكويت | Air وPro | KCROC',
        description: 'تبديل شاشة MacBook Air وPro في الكويت للشاشات المكسورة أو السوداء أو التي تومض. مطابقة الموديل، استلام مجاني وضمان 30 يومًا.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/ar/macbook-screen-replacement-kuwait', locale: 'ar_KW',
        alternates: { 'ar-KW': 'https://www.computerrepairkuwait.com/ar/macbook-screen-replacement-kuwait', 'en-KW': 'https://www.computerrepairkuwait.com/macbook-screen-replacement-kuwait', 'x-default': 'https://www.computerrepairkuwait.com/macbook-screen-replacement-kuwait' },
        ogType: 'website', schemaTypes: ['WebPage', 'BreadcrumbList'], lastModified: '2026-10-02T00:00:00+03:00', breadcrumbs: [{ name: 'الرئيسية', url: '/' }, { name: 'تبديل شاشة MacBook', url: '/ar/macbook-screen-replacement-kuwait' }]
      },
      relatedServiceIds: ['srv-macbook-screen', 'srv-macbook', 'srv-screen']
    } as WebPageEntity,

    'page-ar-battery-replacement': {
      id: 'page-ar-battery-replacement', slug: 'ar/battery-replacement-kuwait', entityType: 'WebPage', isActive: true,
      title: 'تبديل بطارية اللابتوب وMacBook في الكويت', description: 'تبديل بطارية اللابتوب وMacBook في الكويت مع فحص صحة البطارية ودائرة الشحن قبل الاستبدال، واستلام وتوصيل مجاني.',
      seo: {
        title: 'تبديل بطارية اللابتوب الكويت | من 8 د.ك | KCROC',
        description: 'تبديل بطارية اللابتوب وMacBook في الكويت من 8 د.ك + القطعة. نفحص البطارية والشحن أولًا، مع استلام مجاني وضمان 30 يومًا.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/ar/battery-replacement-kuwait', locale: 'ar_KW',
        alternates: { 'ar-KW': 'https://www.computerrepairkuwait.com/ar/battery-replacement-kuwait', 'en-KW': 'https://www.computerrepairkuwait.com/battery-replacement-kuwait', 'x-default': 'https://www.computerrepairkuwait.com/battery-replacement-kuwait' },
        ogType: 'website', schemaTypes: ['WebPage', 'BreadcrumbList'], lastModified: '2026-10-02T00:00:00+03:00', breadcrumbs: [{ name: 'الرئيسية', url: '/' }, { name: 'تبديل بطارية اللابتوب', url: '/ar/battery-replacement-kuwait' }]
      },
      relatedServiceIds: ['srv-battery', 'srv-laptop', 'srv-macbook', 'srv-charging-port']
    } as WebPageEntity,

    'page-ar-ssd-ram-upgrade': {
      id: 'page-ar-ssd-ram-upgrade', slug: 'ar/ssd-ram-upgrade-kuwait', entityType: 'WebPage', isActive: true,
      title: 'ترقية SSD وRAM للابتوب في الكويت', description: 'ترقية SSD وRAM لتسريع اللابتوب والكمبيوتر في الكويت بعد فحص التخزين والرام والتوافق ومعرفة سبب البطء الحقيقي.',
      seo: {
        title: 'ترقية SSD وRAM للابتوب الكويت | تسريع اللابتوب | KCROC',
        description: 'لابتوبك بطيء؟ نحدد سبب البطء ثم نركب SSD أو RAM مناسب في الكويت، مع فحص التوافق والاستنساخ عند الإمكان واستلام مجاني.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/ar/ssd-ram-upgrade-kuwait', locale: 'ar_KW',
        alternates: { 'ar-KW': 'https://www.computerrepairkuwait.com/ar/ssd-ram-upgrade-kuwait', 'en-KW': 'https://www.computerrepairkuwait.com/ssd-ram-upgrade-kuwait', 'x-default': 'https://www.computerrepairkuwait.com/ssd-ram-upgrade-kuwait' },
        ogType: 'website', schemaTypes: ['WebPage', 'BreadcrumbList'], lastModified: '2026-10-02T00:00:00+03:00', breadcrumbs: [{ name: 'الرئيسية', url: '/' }, { name: 'ترقية SSD وRAM', url: '/ar/ssd-ram-upgrade-kuwait' }]
      },
      relatedServiceIds: ['srv-ssd-ram', 'srv-laptop', 'srv-gaming-laptop']
    } as WebPageEntity,

    'page-ar-gaming-laptop-repair': {
      id: 'page-ar-gaming-laptop-repair', slug: 'ar/gaming-laptop-repair-kuwait', entityType: 'WebPage', isActive: true,
      title: 'تصليح Gaming Laptop في الكويت', description: 'تصليح Gaming Laptop وROG وLegion وMSI في الكويت لمشاكل الحرارة والشاشة والشحن والطاقة والـGPU والـFPS.',
      seo: {
        title: 'تصليح Gaming Laptop الكويت | ROG وLegion وMSI | KCROC',
        description: 'تصليح Gaming Laptop في الكويت للحرارة، الشاشة السوداء، عدم التشغيل، الشحن، GPU وFPS Drops. استلام مجاني وضمان 30 يومًا.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/ar/gaming-laptop-repair-kuwait', locale: 'ar_KW',
        alternates: { 'ar-KW': 'https://www.computerrepairkuwait.com/ar/gaming-laptop-repair-kuwait', 'en-KW': 'https://www.computerrepairkuwait.com/gaming-laptop-repair-kuwait', 'x-default': 'https://www.computerrepairkuwait.com/gaming-laptop-repair-kuwait' },
        ogType: 'website', schemaTypes: ['WebPage', 'BreadcrumbList'], lastModified: '2026-10-02T00:00:00+03:00', breadcrumbs: [{ name: 'الرئيسية', url: '/' }, { name: 'تصليح Gaming Laptop', url: '/ar/gaming-laptop-repair-kuwait' }]
      },
      relatedServiceIds: ['srv-gaming-laptop', 'srv-gaming-laptop-cleaning', 'srv-gaming', 'srv-laptop', 'srv-screen', 'srv-battery']
    } as WebPageEntity,

    'page-brands': { id: 'page-brands', slug: 'brands', entityType: 'WebPage', isActive: true, title: 'Supported Laptop Brands', description: 'Laptop and computer brands repaired by KCROC in Kuwait.', seo: { title: 'Laptop Brands We Repair: Dell, HP, Lenovo & More | KCROC', description: 'Component-level laptop repair for Dell, HP, Lenovo, ASUS, Acer, MSI and other major brands across Kuwait.', canonicalUrl: 'https://www.computerrepairkuwait.com/brands', ogType: 'website', schemaTypes: ['CollectionPage', 'WebPage', 'BreadcrumbList'], breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Brands', url: '/brands' }] } } as WebPageEntity,
    'page-problems': { id: 'page-problems', slug: 'problems', entityType: 'WebPage', isActive: true, title: 'Common Computer Problems', description: 'Common laptop and computer problems diagnosed and repaired by KCROC in Kuwait.', seo: { title: 'Common Laptop & Computer Problems We Fix | KCROC Kuwait', description: 'Find causes, safe troubleshooting steps and repair options for common laptop and computer problems in Kuwait.', canonicalUrl: 'https://www.computerrepairkuwait.com/problems', ogType: 'website', schemaTypes: ['CollectionPage', 'WebPage', 'BreadcrumbList'], breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Problems', url: '/problems' }] } } as WebPageEntity,
    'page-guides': { id: 'page-guides', slug: 'guides', entityType: 'WebPage', isActive: true, title: 'DIY & Repair Guides', description: 'Technician-written laptop and computer troubleshooting guides from KCROC Kuwait.', seo: { title: 'Laptop & Computer Repair Guides | KCROC Kuwait', description: 'Free technician-written guides for diagnosing laptop and computer problems, battery issues, overheating, BIOS recovery and more.', canonicalUrl: 'https://www.computerrepairkuwait.com/guides', ogType: 'website', schemaTypes: ['CollectionPage', 'WebPage', 'BreadcrumbList'], breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Guides', url: '/guides' }] } } as WebPageEntity,
    'page-404': { id: 'page-404', slug: '404', entityType: 'WebPage', isActive: true, title: 'Page Not Found', description: 'The requested KCROC page could not be found.', seo: { title: 'Page Not Found | KCROC Kuwait', description: 'The requested page could not be found.', canonicalUrl: 'https://www.computerrepairkuwait.com/404', ogType: 'website', robots: 'noindex, follow, max-image-preview:none', schemaTypes: ['WebPage'] } } as WebPageEntity,
    'page-blog': { id: 'page-blog', slug: 'blog', entityType: 'WebPage', isActive: true, title: 'Tech Blog', description: 'Expert repair guides and tech insights.', seo: { title: 'KCROC Tech Blog | Computer Repair Guides Kuwait', description: 'Expert computer repair guides, laptop fixes, MacBook troubleshooting, and PC performance tips in Kuwait.', canonicalUrl: 'https://www.computerrepairkuwait.com/blog', ogImage: 'https://www.computerrepairkuwait.com/images/discover/laptop-repair-kuwait-1200x675.webp', ogType: 'website', schemaTypes: ['CollectionPage'] } } as WebPageEntity,
    'page-news': { id: 'page-news', slug: 'news', entityType: 'WebPage', isActive: true, title: 'KCROC Tech News', description: 'Current computer, Windows, hardware, gaming, Apple, cybersecurity and AI technology news explained with practical technician context.', seo: { title: 'KCROC Tech News | Windows, Hardware & Gaming News Kuwait', description: 'Latest computer, Windows, hardware, gaming, Apple, cybersecurity and AI technology news — explained by KCROC technicians for practical next steps.', canonicalUrl: 'https://www.computerrepairkuwait.com/news', ogType: 'website', schemaTypes: ['CollectionPage', 'WebPage', 'BreadcrumbList'], breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'News', url: '/news' }], lastModified: '2026-10-03T00:00:00+03:00' } } as WebPageEntity,
    'news-microsoft-windows-surface-event-october-7-2026': {
      id: 'news-microsoft-windows-surface-event-october-7-2026',
      slug: 'news/microsoft-windows-surface-event-october-7-2026',
      entityType: 'WebPage',
      isActive: true,
      title: 'Microsoft Windows & Surface Event on October 7, 2026: What to Expect',
      description: "Microsoft's October 7 Windows and Surface event puts local AI PCs, Surface hardware and NVIDIA RTX Spark technology in focus. Here is what is confirmed, what remains unknown, and what buyers in Kuwait should watch.",
      seo: {
        title: 'Microsoft Windows & Surface Event 2026: What to Expect',
        description: "Microsoft's October 7 Windows and Surface event: Surface Laptop Ultra, NVIDIA RTX Spark, local AI PCs, Windows news, and what buyers in Kuwait should know.",
        canonicalUrl: 'https://www.computerrepairkuwait.com/news/microsoft-windows-surface-event-october-7-2026',
        ogImage: 'https://www.computerrepairkuwait.com/images/news-microsoft-windows-surface-event-2026-kcroc.webp',
        ogType: 'article',
        schemaTypes: ['WebPage', 'NewsArticle', 'BreadcrumbList', 'Person'],
        lastModified: '2026-10-03T00:00:00+03:00',
        breadcrumbs: [
          { name: 'Home', url: '/' },
          { name: 'News', url: '/news' },
          { name: 'Microsoft Windows & Surface Event on October 7, 2026', url: '/news/microsoft-windows-surface-event-october-7-2026' }
        ]
      },
      relatedServiceIds: ['srv-laptop', 'srv-gaming', 'srv-ssd-ram'],
      relatedResourcePaths: [
        { label: 'Laptop Buying Guide 2026', path: '/blog/laptop-buying-guide-kuwait-2026' },
        { label: 'Intel Core Ultra vs AMD Ryzen AI', path: '/blog/intel-core-ultra-vs-amd-ryzen-ai' },
        { label: 'Laptop Repair Kuwait', path: '/laptop-repair-kuwait' },
        { label: 'Gaming PC & GPU Repair Kuwait', path: '/gaming-pc-repair-kuwait' }
      ]
    } as WebPageEntity,
    'news-windows-11-26h2-iso-released': {
      id: 'news-windows-11-26h2-iso-released',
      slug: 'news/windows-11-26h2-iso-released',
      entityType: 'WebPage',
      isActive: true,
      title: 'Windows 11 26H2 ISO Is Now Available — What PC Users Should Know Before Installing',
      description: 'Windows 11 26H2 ISO is now available. Learn the official download options, requirements, upgrade vs clean install paths, installation troubleshooting and post-install checks.',
      seo: {
        title: 'Windows 11 26H2 ISO: Install, Upgrade & Fixes | KCROC',
        description: 'Windows 11 26H2 ISO is now available. See official download options, requirements, upgrade vs clean install steps, and troubleshooting checks.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/news/windows-11-26h2-iso-released',
        ogImage: 'https://www.computerrepairkuwait.com/images/discover/windows-os-software-repair-and-installation-kuwait-1200x675.webp',
        ogType: 'article',
        schemaTypes: ['WebPage'],
        lastModified: '2026-09-30T00:00:00+03:00',
        breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'News', url: '/news' }, { name: 'Windows 11 26H2 ISO Is Now Available', url: '/news/windows-11-26h2-iso-released' }]
      },
      relatedServiceIds: ['srv-laptop', 'srv-ssd-ram', 'srv-motherboard', 'srv-gaming'],
      relatedResourcePaths: [
        { label: 'Windows 11 Update Problems', path: '/guides/windows-11-update-problems' },
        { label: 'SSD Not Detected in Windows 11', path: '/guides/ssd-not-detected-windows-11' },
        { label: 'BIOS & UEFI Recovery', path: '/guides/bios-uefi-recovery-kuwait' },
        { label: 'Windows 11 100% Disk Usage', path: '/blog/windows-11-100-disk-usage-causes-solutions' }
      ]
    } as WebPageEntity,
    'blog-windows-11-100-disk-usage': { id: 'blog-windows-11-100-disk-usage', slug: 'blog/windows-11-100-disk-usage-causes-solutions', entityType: 'WebPage', isActive: true, title: 'Windows 11 100% Disk Usage: Causes & Solutions', description: 'Windows 11 100% Disk Usage? Learn how to identify the process, separate software from hardware causes, and know when an SSD upgrade or professional diagnosis makes sense.', seo: { title: 'Windows 11 100% Disk Usage: Causes & Fixes | KCROC', description: 'Windows 11 100% Disk Usage? Learn the causes, safe fixes, HDD vs SSD warning signs, RAM paging, and when an SSD upgrade or KCROC diagnosis makes sense.', canonicalUrl: 'https://www.computerrepairkuwait.com/blog/windows-11-100-disk-usage-causes-solutions', ogType: 'article', schemaTypes: ['BlogPosting', 'Article', 'FAQPage', 'BreadcrumbList', 'Person'], lastModified: '2026-09-22T00:00:00+03:00' }, relatedServiceIds: ['srv-laptop', 'srv-ssd-ram'] } as WebPageEntity,
    'blog-laptop-slow-2026': { id: 'blog-laptop-slow-2026', slug: 'blog/why-is-my-laptop-so-slow-2026', entityType: 'WebPage', isActive: true, title: 'Why Is My Laptop So Slow in 2026? 15 Causes, Tests & Fixes', description: 'Diagnose 15 common causes of a slow laptop in 2026, including RAM pressure, storage, overheating, startup apps, Windows 11, unwanted software and hardware faults.', seo: { title: 'Why Is My Laptop So Slow in 2026? Causes & Fixes | KCROC', description: 'Why is your laptop so slow in 2026? Diagnose 15 common causes including RAM, SSD/HDD, 100% disk usage, overheating, startup apps, Windows 11 and hardware faults.', canonicalUrl: 'https://www.computerrepairkuwait.com/blog/why-is-my-laptop-so-slow-2026', ogType: 'article', schemaTypes: ['BlogPosting', 'Article', 'FAQPage', 'BreadcrumbList', 'Person'], lastModified: '2026-09-26T00:00:00+03:00' }, relatedServiceIds: ['srv-laptop', 'srv-ssd-ram'] } as WebPageEntity,
    'blog-laptop-wont-turn-on-causes-fixes': {
      id: 'blog-laptop-wont-turn-on-causes-fixes',
      slug: 'blog/laptop-wont-turn-on-causes-fixes',
      entityType: 'WebPage',
      // Consolidated into the stronger Problem entity at /laptop-wont-turn-on.
      // Keep the record for historical references, but exclude it from the
      // active sitemap/routable entity set.
      isActive: false,
      title: "Laptop Won’t Turn On? 15 Causes, Tests & What to Do Before Repair",
      description: "Consolidated into the KCROC no-power diagnostic page at /laptop-wont-turn-on.",
      seo: {
        title: "Laptop Won’t Turn On? 15 Causes & Fixes | Kuwait",
        description: "Laptop won’t turn on? Learn how to diagnose charging, battery, power, RAM, BIOS, display and motherboard problems safely before bringing your laptop for repair in Kuwait.",
        canonicalUrl: 'https://www.computerrepairkuwait.com/blog/laptop-wont-turn-on-causes-fixes',
        ogType: 'article',
        schemaTypes: ['BlogPosting', 'Article', 'FAQPage', 'BreadcrumbList', 'Person'],
        lastModified: '2026-09-07T00:00:00+03:00'
      },
      relatedServiceIds: ['srv-laptop', 'srv-motherboard', 'srv-screen', 'srv-battery', 'srv-charging-port']
    } as WebPageEntity,
    'page-about': { id: 'page-about', slug: 'about', entityType: 'WebPage', isActive: true, title: 'About Us', description: 'Learn about KCROC.', seo: { title: 'About KCROC | Computer Repair Experts Kuwait', description: 'Learn about Kuwait Computer Repair On Call, our Hawalli lab, and our commitment to component-level repair.', canonicalUrl: 'https://www.computerrepairkuwait.com/about', ogType: 'website', schemaTypes: ['AboutPage'] } } as WebPageEntity,
    'page-contact': { id: 'page-contact', slug: 'contact', entityType: 'WebPage', isActive: true, title: 'Contact Us', description: 'Contact KCROC for repair services.', seo: { title: 'Contact KCROC | Computer Repair Kuwait', description: 'Get in touch with Kuwait Computer Repair On Call. Book a free pick & drop repair service today.', canonicalUrl: 'https://www.computerrepairkuwait.com/contact', ogType: 'website', schemaTypes: ['ContactPage'] } } as WebPageEntity,
    'page-faq': { id: 'page-faq', slug: 'faq', entityType: 'WebPage', isActive: true, title: 'FAQ', description: 'Frequently asked questions.', seo: { title: 'Frequently Asked Questions | KCROC Kuwait', description: 'Answers to common questions about our laptop repair services, pricing, warranty, and data privacy.', canonicalUrl: 'https://www.computerrepairkuwait.com/faq', ogType: 'website', schemaTypes: ['FAQPage'] } } as WebPageEntity,
    'page-gallery': { id: 'page-gallery', slug: 'gallery', entityType: 'WebPage', isActive: true, title: 'Gallery', description: 'Lab and repair gallery.', seo: { title: 'Repair Gallery | KCROC Hawalli Lab', description: 'View our ESD-safe repair lab in Hawalli and real examples of our component-level micro-soldering.', canonicalUrl: 'https://www.computerrepairkuwait.com/gallery', ogType: 'website', schemaTypes: ['CollectionPage'] } } as WebPageEntity,
    'page-pricing': { id: 'page-pricing', slug: 'pricing', entityType: 'WebPage', isActive: true, title: 'Pricing', description: 'Transparent repair pricing.', seo: { title: 'Laptop Repair Prices Kuwait | Screen, Battery & PC | KCROC', description: 'Compare KCROC laptop and computer repair starting prices in Kuwait. Screen replacement from 30 KWD plus part, battery replacement from 8 KWD plus part, and SSD/RAM upgrades from 5 KWD plus part. Confirmed quote before repair.', canonicalUrl: 'https://www.computerrepairkuwait.com/pricing', ogType: 'website', schemaTypes: ['WebPage'], lastModified: '2026-10-10T00:00:00+03:00' } } as WebPageEntity,
    
    'page-booking': { id: 'page-booking', slug: 'book', entityType: 'WebPage', isActive: true, title: 'Book a Repair', description: 'Book free laptop and computer repair pickup anywhere in Kuwait. Same-day hardware assessment. 30-day warranty.', seo: { title: 'Book Laptop & Computer Repair Pickup in Kuwait | KCROC', description: 'Book free laptop and computer repair pickup anywhere in Kuwait. Same-day hardware assessment. 30-day warranty.', canonicalUrl: 'https://www.computerrepairkuwait.com/book', ogType: 'website', schemaTypes: ['WebPage'] } } as WebPageEntity,
    
    'page-privacy': { id: 'page-privacy', slug: 'privacy-security-kuwait', entityType: 'WebPage', isActive: true, title: 'Privacy & Security', description: 'Our data privacy guarantee.', seo: { title: 'Data Privacy & Security Guarantee | KCROC', description: 'Read about our strict hardware-only protocol that guarantees your personal data remains 100% private during repairs.', canonicalUrl: 'https://www.computerrepairkuwait.com/privacy-security-kuwait', ogType: 'website', schemaTypes: ['WebPage'] } } as WebPageEntity,
    'page-privacy-policy': { id: 'page-privacy-policy', slug: 'privacy-policy', entityType: 'WebPage', isActive: true, title: 'Privacy Policy', description: 'KCROC Privacy Policy and Data Handling', seo: { title: 'Privacy Policy | KCROC Kuwait', description: 'Read the official Privacy Policy for Kuwait Computer Repair On Call. We are committed to protecting your data and personal information.', canonicalUrl: 'https://www.computerrepairkuwait.com/privacy-policy', ogType: 'website', schemaTypes: ['WebPage'] } } as WebPageEntity,
    'page-terms-of-service': { id: 'page-terms-of-service', slug: 'terms-of-service', entityType: 'WebPage', isActive: true, title: 'Terms of Service', description: 'KCROC Terms and Conditions of Service', seo: { title: 'Terms of Service | KCROC Kuwait', description: 'Read the official Terms of Service and conditions for computer repair, pick & drop, and warranties at Kuwait Computer Repair On Call.', canonicalUrl: 'https://www.computerrepairkuwait.com/terms-of-service', ogType: 'website', schemaTypes: ['WebPage'] } } as WebPageEntity,
    'page-case-studies': { id: 'page-case-studies', slug: 'case-studies', entityType: 'WebPage', isActive: true, title: 'Case Studies', description: 'Real repair success stories.', seo: { title: 'Repair Case Studies | KCROC Kuwait', description: 'Read real case studies of laptops and MacBooks we saved from liquid damage and catastrophic failure.', canonicalUrl: 'https://www.computerrepairkuwait.com/case-studies', ogType: 'website', schemaTypes: ['CollectionPage'] } } as WebPageEntity,
    'page-author-imran': { id: 'page-author-imran', slug: 'author/imran', entityType: 'WebPage', isActive: true, title: 'Imran Natiq', description: 'Author bio page for Imran Natiq, Founder & Lead Technician at KCROC, referenced from the Person schema on blog articles he authored.', seo: { title: 'Imran Natiq — Hardware Repair Engineer at KCROC Kuwait', description: 'Imran Natiq is a hardware repair engineer and founder of KCROC in Hawalli, Kuwait, specializing in motherboard diagnostics and micro-soldering.', canonicalUrl: 'https://www.computerrepairkuwait.com/author/imran', ogType: 'profile', schemaTypes: ['ProfilePage', 'Person', 'BreadcrumbList'] } } as WebPageEntity,
    'guide-battery': { id: 'guide-battery', slug: 'guides/laptop-battery-warning-signs', entityType: 'WebPage', isActive: true, title: 'Laptop Battery Warning Signs: 15+ Signs & Tests', description: 'A practical laptop battery authority guide covering 15+ warning signs, Windows 11 and Mac battery-health checks, swollen-battery safety, diagnosis, and replacement decisions.', seo: { title: 'Laptop Battery Problems: 15 Warning Signs & Tests | KCROC', description: 'How can you tell if a laptop battery is failing? Check 15 warning signs, Windows and Mac battery-health tests, swollen-battery safety, and when to consider replacement.', canonicalUrl: 'https://www.computerrepairkuwait.com/guides/laptop-battery-warning-signs', ogImage: 'https://www.computerrepairkuwait.com/images/discover/swollen-macbook-battery-replacement-2-1200x675.webp', ogType: 'article', schemaTypes: ['Article', 'FAQPage', 'BreadcrumbList'], lastModified: '2026-09-30T00:00:00+03:00' },
      featuredFAQIds: [
        'faq-battery-how-to-know',
        'faq-battery-check-windows',
        'faq-battery-check-macbook',
        'faq-battery-replace-percentage',
        'faq-battery-lifespan',
        'faq-battery-cycles',
        'faq-battery-drain-fast',
        'faq-battery-shutdown-20',
        'faq-battery-not-charging',
        'faq-battery-swollen-safe',
        'faq-battery-plugged-in',
        'faq-battery-use-while-charging',
        'faq-battery-compatible-safe',
        'faq-battery-replacement-time'
      ]
    } as WebPageEntity,
    'guide-bios-uefi': {
      id: 'guide-bios-uefi', slug: 'guides/bios-uefi-recovery-kuwait', entityType: 'WebPage', isActive: true,
      title: 'BIOS & UEFI Troubleshooting, Update Failures & Firmware Recovery',
      description: "A black screen after a BIOS update, a boot loop, or a system that won't POST can come from corrupted firmware \u2014 or from RAM, power, EC, or motherboard faults that only look like a BIOS problem. Covers warning signs, Secure Boot/BitLocker behavior, manufacturer recovery methods, and professional SPI/EEPROM reprogramming.",
      seo: {
        title: 'BIOS/UEFI Recovery After a Failed Update | KCROC',
        description: "Laptop or PC won’t boot after a BIOS/UEFI update? Learn how to distinguish firmware corruption from RAM, power and motherboard faults, plus safe recovery options in Kuwait.",
        canonicalUrl: 'https://www.computerrepairkuwait.com/guides/bios-uefi-recovery-kuwait',
        ogImage: 'https://www.computerrepairkuwait.com/images/discover/bios-hero-motherboard-1200x675.webp',
        ogType: 'article',
        locale: 'en_KW',
        alternates: {
          'en-KW': 'https://www.computerrepairkuwait.com/guides/bios-uefi-recovery-kuwait',
          'ar-KW': 'https://www.computerrepairkuwait.com/guides/ar/bios-uefi-recovery-kuwait',
          'x-default': 'https://www.computerrepairkuwait.com/guides/bios-uefi-recovery-kuwait'
        },
        lastModified: '2026-10-05',
        schemaTypes: ['Article', 'FAQPage']
      },
      featuredFAQIds: [
        'faq-bios-bricked-repairable',
        'faq-bios-failed-update-chip-damaged',
        'faq-bios-eeprom-programmer',
        'faq-bios-reprogramming-serial',
        'faq-bios-keep-trying-files',
        'faq-bios-recovery-time',
        'faq-bios-update-vs-recovery',
        'faq-bios-cmos-reset-fix',
        'faq-bios-bitlocker-key-prompt',
        'faq-bios-damage-hard-drive',
        'faq-bios-similar-model-file',
        'faq-bios-hp-sure-start',
        'faq-bios-post-beep-codes',
        'faq-bios-dual-bios-chip',
        'faq-bios-mac-firmware-flash',
        'faq-bios-security-risk'
      ],
      relatedServiceIds: ['srv-motherboard', 'srv-laptop', 'srv-gaming'],
      dateModified: '2026-10-05',
      articleSection: 'BIOS, UEFI & Firmware Recovery',
      contentImages: [
        { src: '/images/guides/bios-recovery/bios-chip-repair-kuwait-laptop-motherboard.webp', alt: 'BIOS chip repair on a laptop motherboard in Kuwait', width: 800, height: 450, placement: 'hero', caption: 'BIOS chip and motherboard repair work for firmware recovery.' }
      ]
    } as WebPageEntity,
    'guide-intel-vs-amd': { 
      id: 'guide-intel-vs-amd', 
      slug: 'blog/intel-core-ultra-vs-amd-ryzen-ai', 
      entityType: 'WebPage', 
      isActive: true, 
      title: 'Intel Core Ultra vs AMD Ryzen AI: Which Is Better?', 
      description: 'Intel Core Ultra vs AMD Ryzen AI: compare CPU performance, integrated graphics, NPU features, power limits, cooling and laptop configuration before you buy.', 
      seo: { 
        title: 'Intel Core Ultra vs AMD Ryzen AI: 2026 Laptop Comparison | KCROC', 
        description: 'Intel Core Ultra vs AMD Ryzen AI in 2026: compare CPU performance, integrated graphics, NPU features, power limits, cooling and laptop configurations.', 
        canonicalUrl: 'https://www.computerrepairkuwait.com/blog/intel-core-ultra-vs-amd-ryzen-ai', 
        ogImage: 'https://www.computerrepairkuwait.com/images/blog/intel-core-ultra-vs-amd-ryzen-ai-comparison.webp',
        ogType: 'article', 
        schemaTypes: ['Article', 'FAQPage', 'BreadcrumbList'] 
      } 
    } as WebPageEntity,
    'guide-laptop-buying': {
      id: 'guide-laptop-buying',
      slug: 'blog/laptop-buying-guide-kuwait-2026',
      entityType: 'WebPage',
      isActive: true,
      title: 'Laptop Buying Guide Kuwait 2026 | Specs That Matter | KCROC',
      description: 'Laptop buying guide for Kuwait: compare CPU, RAM, SSD, GPU, cooling and upgradeability so you can choose a configuration that fits your actual workload.',
      seo: {
        title: 'Laptop Buying Guide Kuwait 2026 | Specs That Matter | KCROC',
        description: 'Laptop buying guide for Kuwait: compare CPU, RAM, SSD, GPU, cooling and upgradeability so you can choose a configuration that fits your actual workload.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/blog/laptop-buying-guide-kuwait-2026',
        ogType: 'article',
        alternates: { 'en-KW': '/blog/laptop-buying-guide-kuwait-2026', 'ar-KW': '/blog/ar/laptop-buying-guide-kuwait-2026', 'x-default': '/blog/laptop-buying-guide-kuwait-2026' },
        schemaTypes: ['Article', 'FAQPage', 'BreadcrumbList', 'Person']
      }
    } as WebPageEntity,
    'guide-bios-uefi-ar': {
      id: 'guide-bios-uefi-ar',
      slug: 'guides/ar/bios-uefi-recovery-kuwait',
      entityType: 'WebPage',
      isActive: true,
      title: 'استرداد BIOS بعد فشل التحديث: دليل UEFI والأعطال',
      description: 'دليل لتمييز تلف فيرموير BIOS/UEFI عن أعطال الرام والطاقة واللوحة الأم، مع طرق الاسترداد الآمنة وبرمجة شريحة SPI في الكويت.',
      seo: {
        title: 'استرداد BIOS بعد فشل التحديث: دليل UEFI والأعطال | KCROC',
        description: 'لابتوب أو كمبيوتر لا يقلع بعد تحديث BIOS أو UEFI؟ تعرّف كيف تفرّق بين تلف الفيرموير وأعطال الرام والطاقة واللوحة الأم، وخيارات الاسترداد الآمنة في الكويت.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/guides/ar/bios-uefi-recovery-kuwait',
        ogType: 'article',
        locale: 'ar_KW',
        alternates: {
          'en-KW': 'https://www.computerrepairkuwait.com/guides/bios-uefi-recovery-kuwait',
          'ar-KW': 'https://www.computerrepairkuwait.com/guides/ar/bios-uefi-recovery-kuwait',
          'x-default': 'https://www.computerrepairkuwait.com/guides/bios-uefi-recovery-kuwait'
        },
        lastModified: '2026-10-05',
        schemaTypes: ['Article', 'FAQPage', 'BreadcrumbList']
      }
    } as WebPageEntity,
    'guide-laptop-buying-ar': {
      id: 'guide-laptop-buying-ar',
      slug: 'blog/ar/laptop-buying-guide-kuwait-2026',
      entityType: 'WebPage',
      isActive: true,
      title: 'دليل شراء اللابتوب في الكويت 2026: اللي ما يقوله لك البائع',
      description: 'محتار بين Intel وRyzen وRTX؟ مهندس صيانة في الكويت يشرح لك المواصفات اللي تفرق بالأداء والمواصفات اللي مجرد تسويق.',
      seo: {
        title: 'دليل شراء اللابتوب في الكويت 2026 | KCROC',
        description: 'تبي تشتري لابتوب في الكويت؟ تعرّف على أفضل مواصفات المعالج والرام وSSD وRTX والتبريد والبطارية حسب استخدامك، مع قائمة فحص قبل الشراء.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/blog/ar/laptop-buying-guide-kuwait-2026',
        ogType: 'article',
        locale: 'ar_KW',
        alternates: { 'en-KW': '/blog/laptop-buying-guide-kuwait-2026', 'ar-KW': '/blog/ar/laptop-buying-guide-kuwait-2026', 'x-default': '/blog/laptop-buying-guide-kuwait-2026' },
        schemaTypes: ['Article', 'FAQPage', 'BreadcrumbList']
      }
    } as WebPageEntity,
    'blog-gaming-laptop-cleaning-ar': {
      id: 'blog-gaming-laptop-cleaning-ar',
      slug: 'blog/ar/how-often-clean-laptop-replace-thermal-paste-kuwait',
      entityType: 'WebPage',
      isActive: true,
      title: 'كل كم لازم تنظف لابتوب القيمنق وتغيّر المعجون الحراري في الكويت؟',
      description: 'دليل عملي باللهجة الكويتية عن تنظيف لابتوب القيمنق وتغيير المعجون الحراري وتأثير حرارة وغبار الكويت على التبريد.',
      seo: {
        title: 'تنظيف لابتوب القيمنق وتغيير المعجون الحراري في الكويت | KCROC',
        description: 'كل كم لازم تنظف لابتوب القيمنق في الكويت؟ تعرف على جدول تنظيف الغبار، متى تغيّر المعجون الحراري، وعلامات ارتفاع الحرارة والـthermal throttling.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/blog/ar/how-often-clean-laptop-replace-thermal-paste-kuwait',
        ogType: 'article',
        locale: 'ar_KW',
        alternates: {
          'en-KW': '/blog/how-often-clean-laptop-replace-thermal-paste-kuwait',
          'ar-KW': '/blog/ar/how-often-clean-laptop-replace-thermal-paste-kuwait',
          'x-default': '/blog/how-often-clean-laptop-replace-thermal-paste-kuwait'
        },
        schemaTypes: ['Article', 'FAQPage', 'BreadcrumbList', 'Person']
      }
    } as WebPageEntity,
    // 🩹 REMOVED (audit): 'guide-dell-inspiron-overheating' used to live here,
    // pointing at slug 'guides/dell-inspiron-15-3000-overheating' with its own
    // canonicalUrl declaring that URL canonical. But App.tsx's route for that
    // exact path is a pure `<Navigate to="/guides/dell-laptop-overheating" />`
    // stub — there was never a page component rendering this entity, so it
    // was dead data that nothing in the graph or router actually consumed
    // (confirmed: no other file referenced the 'guide-dell-inspiron-overheating'
    // key). Its canonicalUrl also directly contradicted the redirect. The real,
    // rendered page for this content is 'guides/dell-laptop-overheating' below
    // (DellLaptopOverheatingPage). Deleted rather than fixed in place, since
    // keeping a graph node for a URL that only ever redirects invites this
    // same drift again.

    'guide-dell-laptop-overheating': {
      id: 'guide-dell-laptop-overheating',
      slug: 'guides/dell-laptop-overheating',
      entityType: 'WebPage',
      isActive: true,
      title: 'Dell Laptop Overheating Guide',
      description: 'Step-by-step thermal troubleshooting for Dell laptops, including Inspiron, Latitude, Vostro, XPS, Precision, G Series, and Alienware families.',
      seo: {
        title: 'Dell Laptop Overheating | Causes & Fixes | KCROC',
        description: 'Is your Dell laptop overheating, shutting down, or running loud? Learn safe checks, thermal-throttling signs, cooling fixes, and when repair is needed in Kuwait.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/guides/dell-laptop-overheating',
        ogType: 'article',
        schemaTypes: ['WebPage', 'BreadcrumbList'],
        lastModified: '2026-09-27T00:00:00+03:00'
      },
      navigationPriority: 90,
      isFeatured: true,
      popular: true
    } as WebPageEntity,

    // 🚀 NEW: GameBarPresenceWriter.exe diagnostic guide. schemaTypes is
    // 'Article' only (no 'FAQPage') — this page's FAQPage + BreadcrumbList
    // schema is rendered directly in the page itself via SchemaMarkup, not
    // through this entity, since SEOEngine's WebPage->FAQPage branch falls
    // back to every site-wide FAQ when there's no featuredFAQIds set (see
    // the comment in GameBarPresenceWriterGuide.tsx for the full reasoning).
    'guide-gamebar-presence-writer': {
      id: 'guide-gamebar-presence-writer',
      slug: 'guides/gamebar-presence-writer-fix',
      entityType: 'WebPage',
      isActive: true,
      title: 'GameBarPresenceWriter.exe: What It Does, How to Fix Performance Issues, and How to Disable It',
      description: 'What is GameBarPresenceWriter.exe? A measured, evidence-first guide covering Game Bar stutter, background capture activity, the advanced Game DVR registry method, and safer rollback-first troubleshooting.',
      seo: {
        title: 'GameBarPresenceWriter.exe Fix for Windows 11 Stutter | KCROC',
        description: 'Troubleshoot GameBarPresenceWriter.exe, Xbox Game Bar capture activity and Windows 11 gaming stutter. Test the cause, change settings safely, and learn how to roll back.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/guides/gamebar-presence-writer-fix',
        ogImage: 'https://www.computerrepairkuwait.com/images/discover/windows-11-laptop-multitasking-1200x675.webp',
        ogType: 'article',
        // Deliberately just 'WebPage' — this page hand-rolls its own
        // TechArticle/Person/HowTo/FAQPage/BreadcrumbList via SchemaMarkup
        // (see the STRUCTURED_DATA comment in GameBarPresenceWriterGuide.tsx).
        // Previously included 'Article' + 'BreadcrumbList', which made
        // SEOEngine ALSO emit a generic Article node at the same #article
        // @id as the hand-rolled TechArticle, plus a duplicate
        // BreadcrumbList — two competing type declarations for one @id.
        // 'WebPage' is kept because the hand-rolled TechArticle/HowTo
        // reference `#webpage` via mainEntityOfPage.
        schemaTypes: ['WebPage']
      }
    } as WebPageEntity,

    'guide-laptop-overheating': {
      id: 'guide-laptop-overheating',
      slug: 'guides/why-is-my-laptop-so-hot',
      entityType: 'WebPage',
      isActive: true,
      title: 'Why Is My Laptop So Hot? Universal Overheating Causes, Diagnosis & Fixes',
      description: 'A universal, platform-independent laptop overheating guide covering workload, airflow, dust, fan faults, thermal throttling, temperature interpretation, safe checks and repair warning signs.',
      seo: {
        title: 'Why Is My Laptop So Hot? Universal Overheating Guide | KCROC',
        description: 'Why is your laptop hot? Diagnose workload, airflow, dust, fan faults, thermal throttling and cooling problems across Windows, macOS, Linux and ChromeOS.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/guides/why-is-my-laptop-so-hot',
        ogImage: 'https://www.computerrepairkuwait.com/images/discover/laptop-fan-copper-heatpipe-closeup-1200x675.webp',
        lastModified: '2026-09-30T00:00:00+03:00',
        ogType: 'article',
        schemaTypes: ['WebPage']
      }
    } as WebPageEntity,

    'guide-windows-10-eos': {
      id: 'guide-windows-10-eos',
      slug: 'guides/windows-10-end-of-support',
      entityType: 'WebPage',
      isActive: true,
      title: 'Windows 10 End of Support: What It Means and What to Do in 2026',
      description: 'Windows 10 support ended on October 14, 2025. Understand Consumer ESU through October 2027, Windows 11 eligibility, and when to upgrade, repair, replace, or switch operating systems.',
      seo: {
        title: 'Windows 10 End of Support (2026): ESU, Upgrade or Replace? | KCROC',
        description: 'Windows 10 support ended in 2025. Learn how ESU works through October 2027 and whether to upgrade to Windows 11, repair, or replace your PC.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/guides/windows-10-end-of-support',
        ogImage: 'https://www.computerrepairkuwait.com/images/discover/windows-os-software-repair-and-installation-kuwait-1200x675.webp',
        lastModified: '2026-09-09T00:00:00+03:00',
        ogType: 'article',
        // The custom page emits Article + FAQPage + BreadcrumbList directly.
        // Keep only WebPage here so SEOEngine supplies the canonical #webpage
        // without duplicating the page-specific structured data.
        schemaTypes: ['WebPage']
      }
    } as WebPageEntity,

    'guide-windows-11-services': {
      id: 'guide-windows-11-services',
      slug: 'guides/windows-11-background-services-audit',
      entityType: 'WebPage',
      isActive: true,
      title: 'Windows 11 Background Services You Can Audit in 2026',
      description: 'A technician-written Windows 11 guide covering WHESVC, DiagTrack, SysMain and MapsBroker, with evidence-first checks before changing service settings.',
      seo: {
        title: 'Windows 11 Background Services: What to Check | KCROC',
        description: 'Learn how to audit WHESVC, DiagTrack, SysMain and MapsBroker in Windows 11, what each service does, and what to check before disabling anything.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/guides/windows-11-background-services-audit',
        ogType: 'article',
        schemaTypes: ['Article', 'BreadcrumbList']
      }
    } as WebPageEntity,

    'guide-windows-11-settings-tweaks': {
      id: 'guide-windows-11-settings-tweaks',
      slug: 'guides/windows-11-settings-tweaks',
      entityType: 'WebPage',
      isActive: true,
      title: '18 Windows 11 Settings Worth Changing for Privacy, Speed & Better Control',
      description: 'Review 18 Windows 11 settings for privacy, startup speed, battery life, gaming and security. Practical advice from KCROC computer technicians in Kuwait.',
      seo: {
        title: '18 Windows 11 Settings to Change in 2026 | KCROC',
        description: 'Review 18 Windows 11 settings for privacy, startup, power, gaming and security. Practical technician guidance without unsafe “debloat” claims.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/guides/windows-11-settings-tweaks',
        ogType: 'article',
        schemaTypes: ['Article', 'BreadcrumbList', 'ImageObject']
      }
    } as WebPageEntity,

    'page-ar-charging-port-repair': {
      id: 'page-ar-charging-port-repair', slug: 'ar/laptop-charging-port-repair-kuwait', entityType: 'WebPage', isActive: true,
      title: 'تصليح مدخل شحن اللابتوب في الكويت', description: 'تصليح مدخل شحن اللابتوب وUSB-C وDC Jack في الكويت مع تشخيص مسار الطاقة وإصلاح المكونات عند الإمكان.',
      seo: { title: 'تصليح مدخل شحن اللابتوب الكويت | USB-C وDC Jack | KCROC', description: 'تصليح مدخل شحن اللابتوب وUSB-C وDC Jack في الكويت. تشخيص قبل الإصلاح، استلام وتوصيل مجاني، وضمان 30 يومًا.', canonicalUrl: 'https://www.computerrepairkuwait.com/ar/laptop-charging-port-repair-kuwait', locale: 'ar_KW', alternates: { 'ar-KW': 'https://www.computerrepairkuwait.com/ar/laptop-charging-port-repair-kuwait', 'en-KW': 'https://www.computerrepairkuwait.com/laptop-charging-port-repair-kuwait', 'x-default': 'https://www.computerrepairkuwait.com/laptop-charging-port-repair-kuwait' }, ogType: 'website', schemaTypes: ['WebPage', 'BreadcrumbList', 'FAQPage', 'Service'], lastModified: '2026-10-05T00:00:00+03:00', breadcrumbs: [{ name: 'الرئيسية', url: '/' }, { name: 'تصليح مدخل شحن اللابتوب', url: '/ar/laptop-charging-port-repair-kuwait' }] },
      relatedServiceIds: ['srv-charging-port', 'srv-motherboard', 'srv-battery', 'srv-laptop']
    } as WebPageEntity,
    'page-ar-keyboard-replacement': {
      id: 'page-ar-keyboard-replacement', slug: 'ar/laptop-keyboard-replacement-kuwait', entityType: 'WebPage', isActive: true,
      title: 'تصليح وتبديل كيبورد اللابتوب في الكويت', description: 'تبديل وتصليح كيبورد اللابتوب في الكويت مع فحص الكابل وأضرار السوائل والتوافق مع موديل الجهاز.',
      seo: { title: 'تبديل كيبورد اللابتوب الكويت | إصلاح أزرار اللابتوب | KCROC', description: 'تبديل وتصليح كيبورد اللابتوب في الكويت. فحص الكابل وأضرار السوائل والتوافق مع الموديل، مع استلام وتوصيل مجاني.', canonicalUrl: 'https://www.computerrepairkuwait.com/ar/laptop-keyboard-replacement-kuwait', locale: 'ar_KW', alternates: { 'ar-KW': 'https://www.computerrepairkuwait.com/ar/laptop-keyboard-replacement-kuwait', 'en-KW': 'https://www.computerrepairkuwait.com/laptop-keyboard-replacement-kuwait', 'x-default': 'https://www.computerrepairkuwait.com/laptop-keyboard-replacement-kuwait' }, ogType: 'website', schemaTypes: ['WebPage', 'BreadcrumbList', 'FAQPage', 'Service'], lastModified: '2026-10-05T00:00:00+03:00', breadcrumbs: [{ name: 'الرئيسية', url: '/' }, { name: 'تبديل كيبورد اللابتوب', url: '/ar/laptop-keyboard-replacement-kuwait' }] },
      relatedServiceIds: ['srv-keyboard', 'srv-laptop', 'srv-liquid-damage', 'srv-motherboard']
    } as WebPageEntity,
    'page-ar-liquid-damage-repair': {
      id: 'page-ar-liquid-damage-repair', slug: 'ar/laptop-liquid-damage-repair-kuwait', entityType: 'WebPage', isActive: true,
      title: 'تصليح لابتوب بعد انسكاب الماء والسوائل في الكويت', description: 'تصليح أضرار الماء والقهوة والسوائل للابتوب وMacBook في الكويت مع فحص التآكل واللوحة الأم وإصلاح المكونات عند الإمكان.',
      seo: { title: 'تصليح لابتوب بعد انسكاب الماء الكويت | KCROC', description: 'تصليح أضرار الماء والقهوة والسوائل للابتوب وMacBook في الكويت. فحص التآكل واللوحة الأم، استلام مجاني وضمان 30 يومًا.', canonicalUrl: 'https://www.computerrepairkuwait.com/ar/laptop-liquid-damage-repair-kuwait', locale: 'ar_KW', alternates: { 'ar-KW': 'https://www.computerrepairkuwait.com/ar/laptop-liquid-damage-repair-kuwait', 'en-KW': 'https://www.computerrepairkuwait.com/laptop-liquid-damage-repair-kuwait', 'x-default': 'https://www.computerrepairkuwait.com/laptop-liquid-damage-repair-kuwait' }, ogType: 'website', schemaTypes: ['WebPage', 'BreadcrumbList', 'FAQPage', 'Service'], lastModified: '2026-10-05T00:00:00+03:00', breadcrumbs: [{ name: 'الرئيسية', url: '/' }, { name: 'تصليح أضرار السوائل', url: '/ar/laptop-liquid-damage-repair-kuwait' }] },
      relatedServiceIds: ['srv-liquid-damage', 'srv-motherboard', 'srv-keyboard', 'srv-macbook']
    } as WebPageEntity,

    /* ═══════════════════════════════════════════════════════════════
       SERVICES
    ═══════════════════════════════════════════════════════════════ */
    'srv-charging-port': {
      id: 'srv-charging-port',
      slug: 'laptop-charging-port-repair-kuwait',
      entityType: 'Service',
      isActive: true,
      title: 'Laptop Charging Port Repair Kuwait',
      iconKey: 'cpu',
      shortDescription: 'DC jack and USB-C charging-port repair, connector replacement, and board-level power diagnostics for laptops across Kuwait.',
      description: 'If your laptop only charges when the cable is held at an angle, the charging port feels loose, USB-C charging suddenly stopped, or the machine shows no response from a known-good adapter, the fault may be the connector or the power path behind it. KCROC tests the adapter, port, connector pins, charging circuit, and motherboard before replacing anything. When the board is repairable, we micro-solder the damaged connector or failed power component instead of defaulting to a full motherboard replacement.',
      idealCustomer: 'Laptop owners dealing with intermittent charging, a loose or damaged DC jack, USB-C charging failure, or a machine that refuses to recognize a known-good charger.',
      deviceTypes: ['Windows Laptops', 'USB-C Charging Laptops', 'Gaming Laptops', 'Business Ultrabooks', '2-in-1 / Convertible Laptops'],
      repairLevel: 'component-level',
      estimatedTurnaround: 'Same Day / 24 Hours',
            pricing: { startingFrom: 20, currency: 'KWD', quoteRequired: true, displayLabel: 'From 20 KWD — free diagnostic first' },
      coreFeatures: ['DC Jack Replacement', 'USB-C Port Repair', 'Charging Connector Micro-Soldering', 'Charging IC Diagnostics', 'Power Rail Testing', 'Adapter & Cable Verification', 'Motherboard Trace Inspection', 'Post-Repair Charging Test', 'Free Pick & Drop', '30-Day Warranty'],
      brands: ['Dell', 'HP', 'Lenovo', 'ASUS', 'Acer', 'MSI', 'Microsoft Surface'],
      whyChooseUs: [
        { title: 'Test the Power Path First', description: 'We separate charger, connector, charging IC, and motherboard faults before recommending a part.' },
        { title: 'Micro-Soldering Where Appropriate', description: 'A damaged port does not automatically mean a motherboard replacement. Repairable connectors and board damage are handled at component level.' },
        { title: 'Known-Good Adapter Verification', description: 'We test with a verified compatible power source so a bad charger is not mistaken for a laptop fault.' },
        { title: 'No Guesswork Quotes', description: 'Diagnosis comes first and the repair quote is based on the confirmed failure, not the symptom alone.' }
      ],
      commonIssues: [
        { id: 'charging-port-loose', title: 'Charging Port Feels Loose', severity: 'high', description: 'A loose DC jack or USB-C connector can create intermittent contact and may damage the connector pads if continued use flexes it.' },
        { id: 'charges-angle', title: 'Laptop Charges Only at an Angle', severity: 'high', description: 'Often points to worn connector contacts, a cracked solder joint, or damaged port mounting rather than a bad battery.' },
        { id: 'usb-c-no-charge', title: 'USB-C Charger Not Recognized', severity: 'high', description: 'The connector, cable, PD negotiation, charging IC, or motherboard power path may be involved; each is tested separately.' },
        { id: 'no-charge-known-good', title: 'Known-Good Charger Still Does Not Charge', severity: 'critical', description: 'A verified adapter with no charging response warrants inspection of the port, input protection, charging circuit, and main power rails.' }
      ],
      process: [
        { step: 1, title: 'Free Pickup', description: 'We collect the laptop from your home or office anywhere in Kuwait.' },
        { step: 2, title: 'Power & Port Diagnosis', description: 'We test the adapter, connector, charging negotiation, and board-level power path.' },
        { step: 3, title: 'Repair Quote', description: 'You receive the confirmed fault and repair price before any paid work begins.' },
        { step: 4, title: 'Port or Board Repair', description: 'The damaged connector, solder joints, or failed power component is repaired or replaced as appropriate.' },
        { step: 5, title: 'Charging Stress Test', description: 'Charging stability, battery detection, and power delivery are tested before reassembly.' },
        { step: 6, title: 'Return with Warranty', description: 'The repaired laptop is returned with KCROC\'s 30-day parts and labour warranty.' }
      ],
      faqs: [
        { id: 'charging-port-faq-1', title: 'Can you repair a broken laptop charging port?', answer: 'Yes. We inspect the connector and the board behind it. If the damage is repairable, we can replace the port or micro-solder the affected connection rather than automatically replacing the motherboard.' },
        { id: 'charging-port-faq-2', title: 'Why does my laptop charge only when the cable is moved?', answer: 'A loose or worn connector, cracked solder joint, or damaged port mounting can cause intermittent contact. We test the port mechanically and electrically before quoting a repair.' },
        { id: 'charging-port-faq-3', title: 'Do you repair USB-C charging ports?', answer: 'Yes. USB-C charging faults are diagnosed at the connector, power-delivery, and charging-circuit levels where appropriate.' },
        { id: 'charging-port-faq-4', title: 'Is the charging port or motherboard damaged?', answer: 'It can be either. We test the charger, port, connector joints, input protection, charging circuit and relevant power rails so the quote reflects the confirmed fault.' },
        { id: 'charging-port-faq-5', title: 'Can you repair USB-C charging on a laptop?', answer: 'Yes. We can diagnose the USB-C connector and charging path, including power-delivery and board-level faults where the model supports repair.' },
        { id: 'charging-port-faq-6', title: 'Will charging-port repair affect my files?', answer: 'A connector-level repair does not normally affect your stored data. When board work is required, we work on the original board where practical rather than replacing it unnecessarily.' },
      ],
      relatedServiceIds: ['srv-battery', 'srv-motherboard', 'srv-laptop'],
      relatedProblemIds: ['problem-not-charging', 'problem-no-power'],
      relatedBrandIds: ['brand-dell', 'brand-hp', 'brand-lenovo', 'brand-asus'],
      relatedResourcePaths: [
        { label: 'Laptop Plugged In but Not Charging', path: '/laptop-plugged-in-not-charging' },
        { label: 'Laptop Repair Guide', path: '/laptop-repair-kuwait' },
      ],
      technicalOverview: {
        heading: 'What We Diagnose Behind a Charging Port',
        paragraphs: [
          'A laptop that will not charge is not automatically a battery problem. The fault can sit in the DC jack or USB-C connector, solder joints, input protection, charging controller, cable negotiation, or the motherboard power path.',
          'We start with a known-good compatible adapter and inspect the connector mechanically and electrically. Where board damage is present, relevant input and charging rails are measured before deciding whether a connector repair, component repair, or a larger repair is appropriate.'
        ]
      },
      repairDecision: {
        heading: 'Charging Port Repair vs Motherboard Repair',
        items: [
          { condition: 'Loose or physically damaged connector', action: 'Inspect and replace or rework the charging port where the board allows it.' },
          { condition: 'Cracked solder joints or lifted connector pads', action: 'Repair the connection and reinforce the affected mounting area where practical.' },
          { condition: 'Port is healthy but the laptop still will not charge', action: 'Trace the charging circuit, input protection and relevant power rails before replacing parts.' },
          { condition: 'Battery is the actual failed component', action: 'Redirect the repair to the battery service rather than replacing a healthy charging port.' }
        ]
      },
      inspectionChecklist: ['Test charger and cable', 'Inspect port mechanically', 'Check connector solder joints', 'Measure input and charging rails', 'Test USB-C power delivery where applicable', 'Confirm battery charging after repair'],
      performanceOutcomes: { disclaimer: 'Outcomes depend on the confirmed fault and the exact laptop model.', items: [
        { metric: 'Charging stability', outcome: 'Verified under repeated plug/unplug and load conditions.' },
        { metric: 'Power-path confidence', outcome: 'Connector and charging circuit tested before the device is returned.' }
      ] },
      contentImages: [
        { src: IMAGES.laptopHardware.laptopDcPowerJackConnectorReplacement.src, alt: IMAGES.laptopHardware.laptopDcPowerJackConnectorReplacement.alt, width: IMAGES.laptopHardware.laptopDcPowerJackConnectorReplacement.width, height: IMAGES.laptopHardware.laptopDcPowerJackConnectorReplacement.height, placement: 'commonIssues', caption: 'Laptop DC power jack and connector replacement during charging-port diagnosis.' },
        { src: IMAGES.laptopHardware.laptopOpenRepairBench.src, alt: IMAGES.laptopHardware.laptopOpenRepairBench.alt, width: IMAGES.laptopHardware.laptopOpenRepairBench.width, height: IMAGES.laptopHardware.laptopOpenRepairBench.height, placement: 'coreFeatures', caption: 'An opened laptop on the repair bench for connector, charging-circuit and motherboard inspection.' },
        { src: IMAGES.laptopHardware.laptopDcPowerJackConnectorReplacement.src, alt: IMAGES.laptopHardware.laptopDcPowerJackConnectorReplacement.alt, width: IMAGES.laptopHardware.laptopDcPowerJackConnectorReplacement.width, height: IMAGES.laptopHardware.laptopDcPowerJackConnectorReplacement.height, placement: 'process', caption: 'DC power jack replacement as part of a targeted laptop charging-port repair.' }
      ],
      warranty: { duration: '30 Days', coverage: 'Parts and labour for the completed charging-port repair', noFixNoFee: true },
      seo: { title: 'Laptop Charging Port Repair Kuwait | KCROC', description: 'Laptop DC jack and USB-C charging port repair in Kuwait. Board-level charging diagnostics, micro-soldering, free pickup and 30-day warranty.', canonicalUrl: 'https://www.computerrepairkuwait.com/laptop-charging-port-repair-kuwait', locale: 'en_KW', alternates: { 'en-KW': 'https://www.computerrepairkuwait.com/laptop-charging-port-repair-kuwait', 'ar-KW': 'https://www.computerrepairkuwait.com/ar/laptop-charging-port-repair-kuwait', 'x-default': 'https://www.computerrepairkuwait.com/laptop-charging-port-repair-kuwait' }, ogType: 'article', schemaTypes: ['Service', 'FAQPage'] },
      navigationPriority: 55,
      isFeatured: false,
      popular: false
    } as ServiceEntity,

    'srv-hinge': {
      id: 'srv-hinge',
      slug: 'laptop-hinge-repair-kuwait',
      entityType: 'Service',
      isActive: true,
      title: 'Laptop Hinge & Chassis Repair Kuwait',
      iconKey: 'laptop',
      shortDescription: 'Structural hinge, bezel, lid, and chassis repair for laptops before a stiff hinge turns into screen or cable damage.',
      description: 'A hinge that is stiff, cracking the bezel, or pulling the screen assembly away from the chassis should not be ignored. Continued force can damage the display cable, crack the panel, or tear the hinge mounts out of the plastic chassis. KCROC checks hinge tension, mounting points, bezel condition, lid alignment, and cable routing, then repairs the structural damage or replaces the failed hinge assembly where required.',
      idealCustomer: 'Laptop owners whose lid is difficult to open, the bezel is separating, the hinge has become uneven, or the chassis has cracked around the hinge mounts.',
      deviceTypes: ['Business Laptops', 'Everyday Windows Laptops', 'Gaming Laptops', '2-in-1 / Convertible Laptops', 'MacBooks'],
      repairLevel: 'advanced',
      estimatedTurnaround: 'Same Day / 24 Hours',
            pricing: { startingFrom: 15, currency: 'KWD', quoteRequired: true, displayLabel: 'From 15 KWD' },
      coreFeatures: ['Hinge Assembly Repair', 'Hinge Replacement', 'Chassis Reinforcement', 'Bezel Repair', 'Lid Alignment', 'Display Cable Inspection', 'Mounting Point Reconstruction', 'Post-Repair Hinge Tension Test', 'Free Pick & Drop', '30-Day Warranty'],
      brands: ['Dell', 'HP', 'Lenovo', 'ASUS', 'Acer', 'MSI', 'MacBook'],
      whyChooseUs: [
        { title: 'Prevent Secondary Damage', description: 'We address the hinge before continued force damages the display panel or internal cable.' },
        { title: 'Structural Repair', description: 'Broken mounting points can sometimes be reinforced rather than replacing a large assembly unnecessarily.' },
        { title: 'Cable & Bezel Inspection', description: 'We check surrounding components because hinge failures often create related display problems.' },
        { title: 'Model-Specific Diagnosis', description: 'Hinge tension and mounting design vary by model, so we inspect the actual assembly before quoting.' }
      ],
      commonIssues: [
        { id: 'hinge-stiff', title: 'Hinge Suddenly Became Very Stiff', severity: 'high', description: 'Excess hinge resistance can transfer force into the bezel and mounting points every time the lid is opened.' },
        { id: 'bezel-separating', title: 'Screen Bezel Is Popping Open', severity: 'high', description: 'Often caused by hinge or mounting-point failure. Continuing to open the lid can worsen the separation.' },
        { id: 'hinge-broken', title: 'Hinge Has Detached From the Chassis', severity: 'critical', description: 'Detached mounting points require structural inspection before the lid is operated again.' },
        { id: 'lid-uneven', title: 'Screen Lid Sits Unevenly', severity: 'medium', description: 'Uneven alignment can indicate hinge damage, bent hardware, or chassis distortion.' }
      ],
      process: [
        { step: 1, title: 'Free Pickup', description: 'We collect your laptop from home or office across Kuwait.' },
        { step: 2, title: 'Hinge & Chassis Inspection', description: 'We inspect hinge resistance, mounts, bezel, lid, and display cable routing.' },
        { step: 3, title: 'Repair Quote', description: 'The confirmed structural fault and required parts or reinforcement are explained before work starts.' },
        { step: 4, title: 'Structural Repair', description: 'We repair or replace the hinge assembly and reinforce damaged mounting points where appropriate.' },
        { step: 5, title: 'Alignment & Stress Test', description: 'The lid is aligned and opened and closed repeatedly to verify safe hinge movement.' },
        { step: 6, title: 'Return with Warranty', description: 'The completed repair is returned with a 30-day parts and labour warranty.' }
      ],
      faqs: [
        { id: 'hinge-faq-1', title: 'Can a broken laptop hinge be repaired?', answer: 'Yes. Depending on the model and damage, we can repair or replace the hinge assembly and reconstruct damaged chassis mounting points.' },
        { id: 'hinge-faq-2', title: 'Should I keep using a laptop with a stiff hinge?', answer: 'It is better to stop forcing it. A stiff hinge can transfer load into the bezel, display cable, and screen.' },
        { id: 'hinge-faq-3', title: 'Do you inspect the screen cable too?', answer: 'Yes. Hinge damage and repeated cable flexing can create display problems, so the cable and connector are checked during diagnosis.' },
        { id: 'hinge-faq-4', title: 'Can you repair the broken plastic around the hinge?', answer: 'In suitable cases, yes. We assess the mounting structure and can reinforce or reconstruct damaged hinge mounts when that is more appropriate than replacing an entire chassis assembly.' },
        { id: 'hinge-faq-5', title: 'Should I replace the hinge or the whole screen assembly?', answer: 'Not necessarily. We inspect the hinge, mounts, bezel, display cable and panel separately. The repair recommendation depends on which components are actually damaged.' },
        { id: 'hinge-faq-6', title: 'Can a broken hinge crack my laptop screen?', answer: 'Yes. A stiff or detached hinge can transfer force into the panel and cable. Stopping use early can prevent a hinge repair from becoming a hinge plus screen repair.' },
      ],
      relatedServiceIds: ['srv-screen', 'srv-laptop'],
      relatedProblemIds: ['problem-hinge-break', 'problem-cracked-screen'],
      relatedBrandIds: ['brand-dell', 'brand-hp', 'brand-lenovo', 'brand-msi'],
      relatedResourcePaths: [
        { label: 'How to Protect Your Laptop Screen', path: '/blog/how-to-protect-laptop-screen' },
        { label: 'Laptop Repair Guide', path: '/laptop-repair-kuwait' },
      ],
      technicalOverview: {
        heading: 'Why a Stiff Hinge Can Become a Screen Repair',
        paragraphs: [
          'Laptop hinges transfer opening and closing force into small mounting points inside the lid and base. When the hinge becomes excessively tight or its mounts crack, that force can pull the bezel apart and flex the display cable or panel.',
          'We inspect hinge resistance, mounting hardware, chassis plastics, bezel alignment and cable routing as one mechanical system. This lets us fix the structural cause instead of simply making the lid look closed again.'
        ]
      },
      repairDecision: {
        heading: 'Hinge Repair or Full Assembly Replacement?',
        items: [
          { condition: 'Hinge is damaged but mounts are intact', action: 'Replace the hinge assembly with the correct model-specific part where available.' },
          { condition: 'Plastic mounting points are cracked', action: 'Reinforce or reconstruct the mounting area when the chassis design permits a durable repair.' },
          { condition: 'Bezel or display cable is already damaged', action: 'Add the affected component to the repair plan so the hinge fault does not mask secondary damage.' },
          { condition: 'Screen panel is cracked from hinge stress', action: 'Assess the display separately and quote the necessary screen repair or replacement.' }
        ]
      },
      inspectionChecklist: ['Measure hinge resistance', 'Inspect mounting points', 'Check bezel and lid', 'Inspect display cable routing', 'Check screen for pressure damage', 'Test repeated open/close movement'],
      contentImages: [
        { src: IMAGES.laptopHardware.brokenHinge.src, alt: IMAGES.laptopHardware.brokenHinge.alt, width: IMAGES.laptopHardware.brokenHinge.width, height: IMAGES.laptopHardware.brokenHinge.height, placement: 'commonIssues', caption: 'Broken hinge mounts and cracked plastic chassis damage before structural repair.' },
        { src: IMAGES.laptopHardware.screenBezel.src, alt: IMAGES.laptopHardware.screenBezel.alt, width: IMAGES.laptopHardware.screenBezel.width, height: IMAGES.laptopHardware.screenBezel.height, placement: 'coreFeatures', caption: 'Screen bezel and hinge work during chassis reconstruction and alignment.' },
        { src: IMAGES.services.laptopRepair.src, alt: IMAGES.services.laptopRepair.alt, width: IMAGES.services.laptopRepair.width, height: IMAGES.services.laptopRepair.height, placement: 'process', caption: 'Laptop opened for inspection of the chassis, display cable routing and surrounding hardware.' }
      ],
      warranty: { duration: '30 Days', coverage: 'Parts and labour for the completed hinge/chassis repair', noFixNoFee: true },
      seo: { title: 'Laptop Hinge Repair Kuwait | Chassis Fix | KCROC', description: 'Broken or stiff laptop hinge repair in Kuwait. Chassis reinforcement, hinge replacement and display-cable inspection with free pickup and 30-day warranty.', canonicalUrl: 'https://www.computerrepairkuwait.com/laptop-hinge-repair-kuwait', ogType: 'article', schemaTypes: ['Service', 'FAQPage'] },
      navigationPriority: 54,
      isFeatured: false,
      popular: false
    } as ServiceEntity,

    'srv-keyboard': {
      id: 'srv-keyboard', slug: 'laptop-keyboard-replacement-kuwait', entityType: 'Service', isActive: true,
      title: 'Laptop Keyboard Replacement Kuwait', iconKey: 'laptop',
      shortDescription: 'Keyboard replacement and key-input fault diagnosis for Dell, HP, Lenovo, ASUS, Acer, MSI and MacBook systems.',
      description: 'Dead keys, repeated characters, liquid-damaged keyboards, stuck keys, and keyboards that stop responding can come from the keyboard assembly, ribbon connection, liquid contamination, or the motherboard input circuit. KCROC tests the failure first, then replaces the keyboard or repairs the related connection where appropriate. For MacBooks, we also distinguish between butterfly and Magic Keyboard generations before ordering parts.',
      idealCustomer: 'Students, office users, developers, gamers, and anyone with missing, stuck, liquid-damaged, or intermittently responding laptop keys.',
      deviceTypes: ['Windows Laptops', 'Gaming Laptops', 'Business Laptops', '2-in-1 Laptops', 'MacBook Air & MacBook Pro'],
      repairLevel: 'advanced', estimatedTurnaround: 'Same Day / 24 Hours',
            pricing: { startingFrom: 10, currency: 'KWD', quoteRequired: true, displayLabel: 'From 10 KWD + part' },
      coreFeatures: ['Keyboard Assembly Replacement', 'Individual Key Fault Diagnosis', 'Ribbon Connector Inspection', 'Liquid Contamination Inspection', 'Backlit Keyboard Testing', 'MacBook Keyboard Service', 'Post-Repair Input Testing', 'Free Pick & Drop', '30-Day Warranty'],
      brands: ['Dell', 'HP', 'Lenovo', 'ASUS', 'Acer', 'MSI', 'MacBook'],
      whyChooseUs: [
        { title: 'Diagnose Before Replacing', description: 'A dead key can be caused by the keyboard, connector, liquid damage, or input circuitry. We identify which one first.' },
        { title: 'Correct Part Matching', description: 'Keyboard layouts, backlighting, languages, and top-case designs vary by exact model and configuration.' },
        { title: 'Liquid Damage Inspection', description: 'Spills can affect more than the keyboard, so the surrounding area and connectors are checked when relevant.' },
        { title: 'Full Input Verification', description: 'Every key row, modifier, backlight function where fitted, and touchpad interaction is tested before return.' }
      ],
      commonIssues: [
        { id: 'dead-keys', title: 'Some Keys Do Not Work', severity: 'medium', description: 'A localized key failure may be the keyboard matrix, contamination, or a connector issue.' },
        { id: 'keyboard-not-working', title: 'Entire Keyboard Not Responding', severity: 'high', description: 'The keyboard assembly and ribbon connection are tested before assuming motherboard failure.' },
        { id: 'liquid-keyboard', title: 'Keys Stopped Working After a Spill', severity: 'critical', description: 'Power should be removed promptly because liquid can continue damaging the keyboard and motherboard.' },
        { id: 'repeated-keys', title: 'Keys Type Repeated Characters', severity: 'medium', description: 'Can result from switch or membrane damage, contamination, or a failing keyboard matrix.' }
      ],
      process: [
        { step: 1, title: 'Free Pickup', description: 'We collect the device across Kuwait.' },
        { step: 2, title: 'Keyboard Diagnosis', description: 'We test keys, ribbon connections, backlighting and related input circuitry.' },
        { step: 3, title: 'Confirm Model & Quote', description: 'The exact keyboard assembly and repair cost are confirmed before ordering or fitting.' },
        { step: 4, title: 'Keyboard Replacement', description: 'The damaged keyboard or required assembly is fitted carefully to the exact model.' },
        { step: 5, title: 'Full Input Test', description: 'Keys, modifiers, backlight, touchpad interaction and operating-system input are verified.' },
        { step: 6, title: 'Return with Warranty', description: 'The completed repair is returned with a 30-day parts and labour warranty.' }
      ],
      faqs: [
        { id: 'keyboard-faq-1', title: 'Can you replace a laptop keyboard?', answer: 'Yes. We replace keyboards for major Windows laptop brands and MacBook models after confirming the exact model and failure.' },
        { id: 'keyboard-faq-2', title: 'Can you fix a keyboard after a liquid spill?', answer: 'Yes, but the device should be powered off immediately. We inspect both the keyboard and the underlying electronics for liquid damage.' },
        { id: 'keyboard-faq-3', title: 'Do you replace backlit keyboards?', answer: 'Yes, where a compatible backlit assembly is available for the exact laptop configuration.' },
        { id: 'keyboard-faq-4', title: 'Can you repair the keyboard instead of replacing it?', answer: 'Sometimes. If the fault is a connector, contamination issue or related circuit problem, that can be addressed without replacing a healthy keyboard. A failed keyboard matrix usually requires the correct replacement assembly.' },
        { id: 'keyboard-faq-5', title: 'Do you install Arabic and English laptop keyboards?', answer: 'Where a compatible Arabic/English or other required layout is available for the exact model, we can source and install the appropriate assembly after confirmation.' },
        { id: 'keyboard-faq-6', title: 'Will a keyboard replacement erase my data?', answer: 'No. A normal keyboard replacement does not erase the operating system or personal files. We still test the device before and after the repair.' },
      ],
      relatedServiceIds: ['srv-laptop', 'srv-liquid-damage', 'srv-battery'],
      relatedProblemIds: ['problem-keyboard-fail', 'problem-liquid-spill'],
      relatedBrandIds: ['brand-dell', 'brand-hp', 'brand-lenovo', 'brand-asus'],
      relatedResourcePaths: [
        { label: 'Laptop Repair Guide', path: '/laptop-repair-kuwait' },
        { label: 'Liquid Damage Repair', path: '/laptop-liquid-damage-repair-kuwait' },
      ],
      technicalOverview: {
        heading: 'How We Diagnose a Laptop Keyboard Fault',
        paragraphs: [
          'A keyboard can fail because of the keyboard matrix, a loose ribbon connector, liquid contamination, damaged switches or membranes, or a fault in the input circuitry. Replacing the assembly without testing can therefore solve the wrong problem.',
          'We test representative keys and failure patterns, inspect the ribbon and connector, check for liquid contamination, and verify backlighting where fitted. The exact keyboard layout and assembly are matched to the laptop configuration before installation.'
        ]
      },
      repairDecision: {
        heading: 'Keyboard Repair or Replacement?',
        items: [
          { condition: 'Ribbon or connector issue', action: 'Repair, reseat or replace the affected connection when appropriate.' },
          { condition: 'Keyboard matrix has failed', action: 'Fit the correct keyboard assembly for the exact model and layout.' },
          { condition: 'Liquid reached the keyboard', action: 'Inspect the keyboard and underlying electronics before installing a replacement.' },
          { condition: 'MacBook top-case or model-specific assembly', action: 'Confirm the exact generation and compatible assembly before parts are ordered.' }
        ]
      },
      inspectionChecklist: ['Test every key', 'Check ribbon connector', 'Inspect for liquid contamination', 'Verify backlight where fitted', 'Confirm exact replacement part', 'Run post-repair input test'],
      contentImages: [
        { src: IMAGES.laptopHardware.laptopKeyboardTopCaseAssemblyRemoval.src, alt: IMAGES.laptopHardware.laptopKeyboardTopCaseAssemblyRemoval.alt, width: IMAGES.laptopHardware.laptopKeyboardTopCaseAssemblyRemoval.width, height: IMAGES.laptopHardware.laptopKeyboardTopCaseAssemblyRemoval.height, placement: 'commonIssues', caption: 'Removing the keyboard top-case assembly to inspect the keyboard and connector path.' },
        { src: IMAGES.laptopHardware.laptopKeyboardHeatsinkAssemblyRemoval.src, alt: IMAGES.laptopHardware.laptopKeyboardHeatsinkAssemblyRemoval.alt, width: IMAGES.laptopHardware.laptopKeyboardHeatsinkAssemblyRemoval.width, height: IMAGES.laptopHardware.laptopKeyboardHeatsinkAssemblyRemoval.height, placement: 'coreFeatures', caption: 'Internal assembly removal during keyboard replacement and related hardware diagnosis.' },
        { src: IMAGES.laptopHardware.laptopOpenRepairBench.src, alt: IMAGES.laptopHardware.laptopOpenRepairBench.alt, width: IMAGES.laptopHardware.laptopOpenRepairBench.width, height: IMAGES.laptopHardware.laptopOpenRepairBench.height, placement: 'process', caption: 'Laptop opened on the repair bench for connector checks and post-replacement testing.' }
      ],
      warranty: { duration: '30 Days', coverage: 'Parts and labour for the completed keyboard replacement', noFixNoFee: true },
      seo: { title: 'Laptop Keyboard Replacement Kuwait | KCROC', description: 'Laptop and MacBook keyboard replacement in Kuwait for Dell, HP, Lenovo, ASUS, Acer, MSI and Apple. Free pickup and 30-day warranty.', canonicalUrl: 'https://www.computerrepairkuwait.com/laptop-keyboard-replacement-kuwait', locale: 'en_KW', alternates: { 'en-KW': 'https://www.computerrepairkuwait.com/laptop-keyboard-replacement-kuwait', 'ar-KW': 'https://www.computerrepairkuwait.com/ar/laptop-keyboard-replacement-kuwait', 'x-default': 'https://www.computerrepairkuwait.com/laptop-keyboard-replacement-kuwait' }, ogType: 'article', schemaTypes: ['Service', 'FAQPage'] },
      navigationPriority: 53, isFeatured: false, popular: false
    } as ServiceEntity,

    'srv-macbook-screen': {
      id: 'srv-macbook-screen', slug: 'macbook-screen-replacement-kuwait', entityType: 'Service', isActive: true,
      title: 'MacBook Screen Replacement Kuwait', iconKey: 'monitor',
      shortDescription: 'MacBook Air and Pro display replacement for cracked, black, flickering or damaged Retina screens, with model-specific compatibility checks.',
      description: 'MacBook display damage needs more than a generic laptop panel swap. KCROC identifies the exact MacBook generation, screen assembly and display fault first, then matches the replacement to the model before installation. For cracked, black or flickering displays, we also check the display cable, backlight path and surrounding hardware so a full screen assembly is not ordered when a smaller fault explains the symptom.',
      idealCustomer: 'MacBook Air and MacBook Pro owners in Kuwait with cracked glass, dead pixels, black display, flickering, lines, backlight problems or display damage after a drop.',
      deviceTypes: ['MacBook Air', 'MacBook Pro 13-inch', 'MacBook Pro 14-inch', 'MacBook Pro 16-inch', 'Intel and Apple Silicon MacBooks'],
      repairLevel: 'basic', estimatedTurnaround: 'Same Day / 24-48 Hours',
      pricing: { startingFrom: 30, currency: 'KWD', quoteRequired: true, displayLabel: 'From 30 KWD + part' },
      coreFeatures: [
        'MacBook Air Display Replacement', 'MacBook Pro Retina Display Replacement', 'Model and Connector Matching',
        'Display Cable & Backlight Diagnosis', 'Dead Pixel and Uniformity Testing', 'True Tone / Display Function Checks Where Applicable',
        'Post-Repair Brightness and Colour Testing', 'Free Pick & Drop', '30-Day Warranty'
      ],
      brands: ['MacBook Air', 'MacBook Pro'],
      whyChooseUs: [
        { title: 'Model-Specific Matching', description: 'MacBook displays vary by generation, size, connector and assembly. We verify the exact model before ordering or fitting a panel.' },
        { title: 'Cable Before Panel', description: 'A flicker or black display is not automatically a failed screen. We check the display connection and related circuitry before quoting a full assembly.' },
        { title: 'Display Testing Before Return', description: 'The replacement is checked for brightness, dead pixels, image stability and the functions supported by the specific MacBook model.' },
        { title: 'Kuwait-Wide Pickup & Delivery', description: 'We collect and return your MacBook anywhere in Kuwait and complete the work in the Hawalli laboratory.' }
      ],
      commonIssues: [
        { id: 'macbook-cracked-display', title: 'Cracked Retina Display', severity: 'high', description: 'Physical damage after a drop or impact usually requires the correct display assembly for the exact MacBook generation.' },
        { id: 'macbook-black-screen', title: 'Black or Blank Internal Display', severity: 'high', description: 'We separate panel, cable, backlight and system-level causes before ordering a replacement.' },
        { id: 'macbook-flicker', title: 'Flickering or Lines', severity: 'medium', description: 'Intermittent display faults can come from the panel, connector, cable or related electronics, so the source is tested first.' },
        { id: 'macbook-dim-display', title: 'Dim or Uneven Backlight', severity: 'medium', description: 'A dim panel is checked for display and backlight faults rather than automatically replacing the full display.' }
      ],
      commercialAnswers: [
        { question: 'How much does MacBook screen replacement cost in Kuwait?', answer: 'MacBook display work starts from 30 KWD + part on the service page; the final quote depends on the exact MacBook model and display assembly required.' },
        { question: 'Do you replace MacBook Air and MacBook Pro screens?', answer: 'Yes. We work on MacBook Air and MacBook Pro generations after confirming the exact model and compatible display assembly.' },
        { question: 'Can a flickering MacBook screen be a cable problem?', answer: 'Yes. Flicker, lines and intermittent display behaviour can come from the display connection or related hardware, so we test those paths before quoting a complete replacement.' },
        { question: 'Do you offer pickup anywhere in Kuwait?', answer: 'Yes. KCROC provides free pickup and delivery across Kuwait, with the actual display work completed in the Hawalli lab.' }
      ],
      process: [
        { step: 1, title: 'Confirm Model', description: 'Identify the exact MacBook generation and display configuration.' },
        { step: 2, title: 'Inspect the Display Path', description: 'Check panel, cable, connectors, backlight and visible chassis damage.' },
        { step: 3, title: 'Quote the Correct Assembly', description: 'You receive the compatible part and price before installation.' },
        { step: 4, title: 'Install and Test', description: 'Fit the display assembly, verify image quality and test the completed MacBook.' }
      ],
      faqs: [
        { id: 'mac-screen-faq-1', title: 'How much is MacBook screen replacement in Kuwait?', answer: 'The service starts from 30 KWD + part. Exact pricing depends on the MacBook model and the display assembly required.' },
        { id: 'mac-screen-faq-2', title: 'Do you repair the screen cable instead of replacing the display?', answer: 'When the cable or connector is the actual fault, we diagnose that path before recommending a full display assembly.' },
        { id: 'mac-screen-faq-3', title: 'How quickly can a MacBook screen be replaced?', answer: 'Same-day service is possible for compatible displays that are in stock; otherwise the turnaround depends on part availability.' },
        { id: 'mac-screen-faq-4', title: 'Is my data safe during screen replacement?', answer: 'Yes. Display replacement is a hardware service and does not require browsing your stored files.' }
      ],
      relatedServiceIds: ['srv-macbook', 'srv-screen', 'srv-laptop', 'srv-battery'],
      relatedProblemIds: ['problem-cracked-screen', 'problem-black-screen'],
      relatedBrandIds: [],
      relatedResourcePaths: [
        { label: 'Laptop Screen Repair Guide', path: '/laptop-screen-repair-kuwait' },
        { label: 'MacBook Repair Kuwait', path: '/macbook-repair-kuwait' }
      ],
      contentImages: [
        { src: IMAGES.macbook.diagnostics.src, alt: 'MacBook diagnostics before display repair in Kuwait', width: IMAGES.macbook.diagnostics.width, height: IMAGES.macbook.diagnostics.height, placement: 'hero', caption: 'MacBook inspection before display repair and model matching.' },
        { src: IMAGES.laptopHardware.laptopScreenAssemblyDisassemblyRepair.src, alt: 'Laptop display assembly service and screen repair', width: IMAGES.laptopHardware.laptopScreenAssemblyDisassemblyRepair.width, height: IMAGES.laptopHardware.laptopScreenAssemblyDisassemblyRepair.height, placement: 'process', caption: 'Display assembly inspection and reassembly during screen service.' }
      ],
      warranty: { duration: '30 Days', coverage: 'Replacement display assembly and labour for the completed repair', noFixNoFee: true },
      seo: { title: 'MacBook Screen Replacement Kuwait | Air & Pro | KCROC', description: 'MacBook Air and Pro screen replacement in Kuwait for cracked, black or flickering displays. Model-specific matching, free pickup and 30-day warranty.', canonicalUrl: 'https://www.computerrepairkuwait.com/macbook-screen-replacement-kuwait', locale: 'en_KW', alternates: { 'en-KW': 'https://www.computerrepairkuwait.com/macbook-screen-replacement-kuwait', 'ar-KW': 'https://www.computerrepairkuwait.com/ar/macbook-screen-replacement-kuwait', 'x-default': 'https://www.computerrepairkuwait.com/macbook-screen-replacement-kuwait' }, ogType: 'article', schemaTypes: ['Service', 'FAQPage'], lastModified: '2026-10-02T00:00:00+03:00' },
      navigationPriority: 68, isFeatured: true,
      popular: true
    } as ServiceEntity,

    'srv-gaming-laptop': {
      id: 'srv-gaming-laptop', slug: 'gaming-laptop-repair-kuwait', entityType: 'Service', isActive: true,
      title: 'Gaming Laptop Repair Kuwait', iconKey: 'gaming',
      shortDescription: 'Gaming laptop repair for overheating, black screen, no power, charging, GPU, FPS drops, crashes, keyboard and motherboard faults.',
      description: 'Gaming laptops combine high-wattage CPU and GPU hardware with compact cooling, so the same symptom can come from heat, power, display, memory, firmware or board-level faults. KCROC diagnoses the actual cause before recommending a part swap. We work on ASUS ROG and TUF, Lenovo Legion, MSI, Acer Predator, HP OMEN and other performance laptops, with Kuwait-wide pickup and delivery from our Hawalli laboratory.',
      idealCustomer: 'Gamers, streamers, students and professionals whose gaming laptop runs hot, loses FPS, shuts down, shows no display, fails to charge, crashes or has another hardware problem.',
      deviceTypes: ['ASUS ROG / TUF', 'Lenovo Legion', 'MSI Gaming', 'Acer Predator / Nitro', 'HP OMEN / Victus', 'Dell G Series / Alienware', 'Razer Blade'],
      repairLevel: 'advanced', estimatedTurnaround: '24-48 Hours',
      coreFeatures: [
        'Gaming Laptop No-Power Diagnosis', 'Black Screen / No Display Diagnosis', 'CPU & GPU Thermal Testing', 'Fan, Heatsink and Thermal Service',
        'Charging and Power-Circuit Diagnosis', 'GPU / VRAM Stability Testing', 'Motherboard and VRM Diagnostics', 'BIOS / Firmware Recovery Where Repairable',
        'Keyboard, Hinge and Display Repair', 'Free Pick & Drop', '30-Day Warranty'
      ],
      brands: ['ASUS ROG', 'ASUS TUF Gaming', 'Lenovo Legion', 'MSI Gaming', 'Acer Predator', 'HP OMEN', 'Dell G Series', 'Alienware', 'Razer Blade'],
      whyChooseUs: [
        { title: 'Gaming-Specific Diagnostics', description: 'We test the components that fail under sustained gaming load instead of treating every performance problem as a Windows issue.' },
        { title: 'Thermals and Power Together', description: 'High temperatures and power faults can produce similar symptoms. We measure both before recommending an expensive replacement.' },
        { title: 'Kuwait Heat Context', description: 'Gaming laptops have less thermal headroom in Kuwait, so sustained load and cooling behaviour are part of the diagnostic picture.' },
        { title: 'Repair Before Replacement', description: 'When a board-level fault is technically repairable, we explain that option before defaulting to a complete motherboard replacement.' }
      ],
      commonIssues: [
        { id: 'gaming-laptop-overheating', title: 'Overheating or Thermal Throttling', severity: 'high', description: 'Dust, fan wear, blocked heatsinks, thermal interface problems and high ambient temperature can reduce sustained gaming performance.' },
        { id: 'gaming-laptop-black-screen', title: 'Black Screen or No Display', severity: 'high', description: 'We separate panel, cable, GPU, memory, BIOS and motherboard causes before replacing display hardware.' },
        { id: 'gaming-laptop-no-power', title: 'Gaming Laptop Won’t Turn On', severity: 'critical', description: 'Power rails, charging input, battery, motherboard and firmware are tested systematically before quoting repair.' },
        { id: 'gaming-laptop-fps-drop', title: 'FPS Drops After Playing for a While', severity: 'high', description: 'A strong clue for thermal throttling or another sustained-load problem, but it still requires measurement of CPU/GPU temperature and clocks.' },
        { id: 'gaming-laptop-charging', title: 'Not Charging or Charging Intermittently', severity: 'high', description: 'The adapter, DC-in/USB-C path, battery and charging circuitry need to be separated before any replacement is chosen.' }
      ],
      commercialAnswers: [
        { question: 'Do you repair ASUS ROG, Lenovo Legion and MSI gaming laptops?', answer: 'Yes. The service covers major gaming families including ASUS ROG/TUF, Lenovo Legion, MSI Gaming, Acer Predator, HP OMEN, Dell G Series, Alienware and Razer Blade.' },
        { question: 'Can you fix a gaming laptop that overheats and loses FPS?', answer: 'Yes. We test cooling, CPU/GPU temperatures, fan behaviour and sustained clocks so thermal throttling can be separated from a GPU, power or software issue.' },
        { question: 'Can you repair a gaming laptop with a black screen?', answer: 'Yes. We check display, cable, memory, GPU, BIOS and motherboard causes before ordering a replacement screen.' },
        { question: 'How much does gaming laptop repair cost in Kuwait?', answer: 'The service starts from 20 KWD for the repair/diagnostic path shown on this page; complex GPU, board, display and cooling work is quoted after diagnosis.' },
        { question: 'Do you collect gaming laptops from home?', answer: 'Yes. Free pickup and delivery are available across Kuwait, with the device repaired and tested in the Hawalli laboratory.' }
      ],
      process: [
        { step: 1, title: 'Collect & Log', description: 'We collect the gaming laptop and record the exact model and reported symptoms.' },
        { step: 2, title: 'Measure the Fault', description: 'Thermal, power, display, storage, memory and firmware checks are selected based on the symptoms.' },
        { step: 3, title: 'Quote the Repair', description: 'You receive a diagnosis and clear repair path before work starts.' },
        { step: 4, title: 'Repair & Stress-Test', description: 'The repair is completed, then the system is tested under the workload relevant to the failure.' }
      ],
      faqs: [
        { id: 'gaming-laptop-faq-1', title: 'Can you repair a gaming laptop that overheats?', answer: 'Yes. We check airflow, fans, heatsinks, thermal interfaces and sustained CPU/GPU behaviour before deciding what needs service.' },
        { id: 'gaming-laptop-faq-2', title: 'Do you repair gaming laptop GPU and motherboard faults?', answer: 'Where technically repairable, we diagnose GPU, VRM and motherboard faults before recommending complete board replacement.' },
        { id: 'gaming-laptop-faq-3', title: 'Do you repair gaming laptop charging problems?', answer: 'Yes. We separate adapter, port, battery and charging-circuit faults before choosing a replacement part.' },
        { id: 'gaming-laptop-faq-4', title: 'Do you replace gaming laptop screens?', answer: 'Yes. Display and cable faults are diagnosed first, with panel replacement when the display assembly is the failed component.' }
      ],
      relatedServiceIds: ['srv-gaming', 'srv-gaming-laptop-cleaning', 'srv-laptop', 'srv-screen', 'srv-battery', 'srv-motherboard'],
      relatedProblemIds: ['problem-overheating', 'problem-black-screen', 'problem-no-power', 'problem-not-charging', 'problem-freezing-crashing'],
      relatedBrandIds: ['brand-asus', 'brand-lenovo', 'brand-msi', 'brand-hp', 'brand-dell', 'brand-acer'],
      relatedLocationIds: ['loc-hawalli', 'loc-salmiya', 'loc-kuwait-city', 'loc-farwaniya', 'loc-jahra', 'loc-ahmadi', 'loc-fahaheel'],
      relatedResourcePaths: [
        { label: 'Gaming Laptop Cleaning & Thermal Service', path: '/gaming-laptop-cleaning-kuwait' },
        { label: 'Laptop Repair Kuwait', path: '/laptop-repair-kuwait' },
        { label: 'Gaming PC Repair Kuwait', path: '/gaming-pc-repair-kuwait' }
      ],
      contentImages: [
        { src: IMAGES.gaming.msiWorkstation.src, alt: 'Gaming laptop repair workstation in Kuwait', width: IMAGES.gaming.msiWorkstation.width, height: IMAGES.gaming.msiWorkstation.height, placement: 'hero', caption: 'Gaming laptop hardware diagnostics at the KCROC repair bench.' },
        { src: IMAGES.gaming.gamingLaptopFan.src, alt: 'Gaming laptop cooling and motherboard diagnostics', width: IMAGES.gaming.gamingLaptopFan.width, height: IMAGES.gaming.gamingLaptopFan.height, placement: 'commonIssues', caption: 'Gaming laptop cooling and motherboard inspection during diagnosis.' },
        { src: IMAGES.gaming.gamingOverheating.src, alt: 'Gaming laptop overheating repair in Kuwait', width: IMAGES.gaming.gamingOverheating.width, height: IMAGES.gaming.gamingOverheating.height, placement: 'process', caption: 'Thermal diagnostics for sustained gaming performance.' }
      ],
      warranty: { duration: '30 Days', coverage: 'Parts and labour for the completed gaming laptop repair', noFixNoFee: true },
      seo: { title: 'Gaming Laptop Repair Kuwait | ROG, Legion & MSI | KCROC', description: 'Gaming laptop repair in Kuwait for overheating, black screen, no power, charging, GPU, FPS drops and motherboard faults. Free pickup and 30-day warranty.', canonicalUrl: 'https://www.computerrepairkuwait.com/gaming-laptop-repair-kuwait', locale: 'en_KW', alternates: { 'en-KW': 'https://www.computerrepairkuwait.com/gaming-laptop-repair-kuwait', 'ar-KW': 'https://www.computerrepairkuwait.com/ar/gaming-laptop-repair-kuwait', 'x-default': 'https://www.computerrepairkuwait.com/gaming-laptop-repair-kuwait' }, ogType: 'article', schemaTypes: ['Service', 'FAQPage'], lastModified: '2026-10-02T00:00:00+03:00' },
      navigationPriority: 67, isFeatured: true,
      popular: true
    } as ServiceEntity,

    'srv-ssd-ram': {
      id: 'srv-ssd-ram', slug: 'ssd-ram-upgrade-kuwait', entityType: 'Service', isActive: true,
      title: 'SSD & RAM Upgrade Kuwait', iconKey: 'cpu',
      shortDescription: 'Practical SSD and memory upgrades for slower laptops and PCs, with compatibility checks, cloning options and post-upgrade testing.',
      description: 'If a laptop takes minutes to boot, browsers stutter under normal workloads, or Windows constantly runs short of usable memory, an SSD or RAM upgrade can produce a much larger real-world improvement than random software tweaks. KCROC checks the existing storage interface, memory type and upgrade limits first. Where practical, we can clone the existing system to the new SSD, verify the boot environment, and test the upgraded machine under normal workloads.',
      idealCustomer: 'Users with slow boot times, limited memory, an aging hard drive, frequent paging, or a laptop that is otherwise worth keeping.',
      deviceTypes: ['Windows Laptops', 'Business Laptops', 'Everyday Laptops', 'Gaming Laptops', 'Desktop PCs'],
      repairLevel: 'advanced', estimatedTurnaround: 'Same Day / 24 Hours',
            pricing: { startingFrom: 5, currency: 'KWD', quoteRequired: true, displayLabel: 'From 5 KWD + part' },
      coreFeatures: ['NVMe SSD Upgrade', 'SATA SSD Upgrade', 'RAM Upgrade', 'Memory Compatibility Check', 'Storage Health Check', 'System Cloning Where Suitable', 'Boot Verification', 'Performance Testing', 'Free Pick & Drop', '30-Day Warranty'],
      brands: ['Dell', 'HP', 'Lenovo', 'ASUS', 'Acer', 'MSI', 'Microsoft Surface'],
      whyChooseUs: [
        { title: 'Compatibility First', description: 'We verify interface, physical format, supported memory type, capacity limits, and model-specific constraints before recommending hardware.' },
        { title: 'Keep the Existing System Where Practical', description: 'Suitable systems can be cloned to the new SSD so applications and settings do not need to be rebuilt from scratch.' },
        { title: 'Measure the Bottleneck', description: 'We check storage health and memory pressure so you upgrade the part that is actually limiting the system.' },
        { title: 'Post-Upgrade Testing', description: 'The machine is boot-tested and checked for storage health, memory recognition, and stability before return.' }
      ],
      commonIssues: [
        { id: 'slow-hard-drive', title: 'Laptop Still Uses a Mechanical Hard Drive', severity: 'medium', description: 'An SSD upgrade can dramatically reduce boot and application load times when the existing HDD is the main storage bottleneck.' },
        { id: 'low-ram', title: 'Windows Runs Out of Memory', severity: 'medium', description: 'Heavy paging, browser workloads, and multitasking can expose a RAM limitation even when the laptop is otherwise healthy.' },
        { id: 'storage-health', title: 'Storage Health Is Declining', severity: 'high', description: 'A failing drive should be assessed before an upgrade so the replacement plan protects the system and existing data as far as possible.' },
        { id: 'slow-laptop', title: 'Laptop Is Slow Despite Being Clean', severity: 'medium', description: 'We separate storage, memory, thermal, startup and software bottlenecks before recommending an upgrade.' }
      ],
      process: [
        { step: 1, title: 'Free Pickup', description: 'We collect the laptop or PC across Kuwait.' },
        { step: 2, title: 'Hardware Assessment', description: 'We check storage health, RAM configuration, interfaces and supported upgrade limits.' },
        { step: 3, title: 'Upgrade Plan', description: 'You receive compatible SSD/RAM options and a clear quote before installation.' },
        { step: 4, title: 'Install or Clone', description: 'The selected hardware is installed and the existing system is cloned where the configuration supports it.' },
        { step: 5, title: 'Boot & Stability Test', description: 'Windows, storage health, memory recognition and basic workload stability are verified.' },
        { step: 6, title: 'Return with Warranty', description: 'The upgraded device is returned with a 30-day parts and labour warranty on the completed work.' }
      ],
      faqs: [
        { id: 'upgrade-faq-1', title: 'Will an SSD make my laptop faster?', answer: 'If the current drive is the main bottleneck, yes. We check the system first so you do not buy an SSD when another component is responsible for the slowdown.' },
        { id: 'upgrade-faq-2', title: 'Can you upgrade laptop RAM?', answer: 'Yes, when the laptop has upgradeable memory. We verify the exact model and supported capacity before recommending a module.' },
        { id: 'upgrade-faq-3', title: 'Can you clone my existing Windows installation?', answer: 'Often yes, when the existing storage is healthy and the hardware configuration supports a clean clone. We verify booting and storage health afterward.' },
        { id: 'upgrade-faq-4', title: 'Can every laptop have its RAM upgraded?', answer: 'No. Some laptops use soldered memory, while others have one or more SO-DIMM slots. We check the exact model before recommending an upgrade.' },
        { id: 'upgrade-faq-5', title: 'What is the difference between SATA and NVMe SSDs?', answer: 'They use different interfaces and can have different performance and physical formats. We identify the laptop’s supported interface before selecting the replacement drive.' },
        { id: 'upgrade-faq-6', title: 'Can you move my existing Windows installation to the new SSD?', answer: 'Often yes when the source drive is healthy and the configuration supports cloning. We verify the cloned system boots correctly and check the new drive after migration.' },
      ],
      relatedServiceIds: ['srv-laptop', 'srv-gaming', 'srv-gaming-laptop-cleaning', 'srv-gaming-laptop'],
      relatedProblemIds: ['problem-slow', 'problem-freezing-crashing'],
      relatedBrandIds: ['brand-dell', 'brand-hp', 'brand-lenovo', 'brand-asus'],
      relatedResourcePaths: [
        { label: 'Windows 11 100% Disk Usage: Causes & Solutions', path: '/blog/windows-11-100-disk-usage-causes-solutions' },
        { label: 'Why 8GB RAM Is No Longer Enough', path: '/blog/why-8gb-ram-is-no-longer-enough-for-windows-11' },
        { label: 'Laptop Buying Guide 2026', path: '/blog/laptop-buying-guide-kuwait-2026' },
      ],
      technicalOverview: {
        heading: 'SSD and RAM Upgrades Start With Compatibility',
        paragraphs: [
          'An upgrade only helps when it matches the machine and the actual bottleneck. We identify whether the laptop uses SATA or NVMe storage, check the physical format and supported capacity, and determine whether RAM is replaceable, partially soldered, or fully soldered.',
          'For storage migrations, we assess the health of the existing drive before cloning. A failing source drive may need a different migration strategy, while a healthy system can often be moved to the new SSD with its Windows installation and applications intact.'
        ]
      },
      repairDecision: {
        heading: 'Which Upgrade Makes More Sense?',
        items: [
          { condition: 'Mechanical HDD is the main bottleneck', action: 'Prioritize a compatible SSD to improve storage responsiveness and boot times.' },
          { condition: 'Memory pressure causes heavy paging', action: 'Add compatible RAM when the laptop supports a memory upgrade.' },
          { condition: 'RAM is soldered or storage is restricted', action: 'Confirm the platform limits before spending money on incompatible upgrade hardware.' },
          { condition: 'Existing drive is unhealthy', action: 'Prioritize a safe migration plan rather than blindly cloning a failing disk.' }
        ]
      },
      inspectionChecklist: ['Check storage health', 'Identify SSD interface', 'Check RAM type and slots', 'Confirm maximum supported capacity', 'Assess cloning suitability', 'Verify boot and stability after upgrade'],
      performanceOutcomes: { disclaimer: 'Actual gains depend on the original hardware and the bottleneck identified during diagnosis.', items: [
        { metric: 'Boot responsiveness', outcome: 'SSD upgrades can substantially reduce storage-related boot and application loading delays.' },
        { metric: 'Multitasking', outcome: 'Additional compatible RAM can reduce paging when memory pressure is the actual bottleneck.' }
      ] },
      contentImages: [
        { src: IMAGES.upgrades.ssdM2Install.src, alt: IMAGES.upgrades.ssdM2Install.alt, width: IMAGES.upgrades.ssdM2Install.width, height: IMAGES.upgrades.ssdM2Install.height, placement: 'commonIssues', caption: 'Installing an M.2 NVMe SSD as part of a laptop performance upgrade.' },
        { src: IMAGES.upgrades.acerLaptopMotherboardRamHeatsink.src, alt: IMAGES.upgrades.acerLaptopMotherboardRamHeatsink.alt, width: IMAGES.upgrades.acerLaptopMotherboardRamHeatsink.width, height: IMAGES.upgrades.acerLaptopMotherboardRamHeatsink.height, placement: 'coreFeatures', caption: 'Laptop motherboard with accessible RAM and storage components inspected for upgrade compatibility.' },
        { src: IMAGES.upgrades.ssdMicron.src, alt: IMAGES.upgrades.ssdMicron.alt, width: IMAGES.upgrades.ssdMicron.width, height: IMAGES.upgrades.ssdMicron.height, placement: 'process', caption: 'M.2 NVMe storage selected and installed after compatibility checks.' }
      ],
      warranty: { duration: '30 Days', coverage: 'Parts and labour for the completed SSD/RAM installation', noFixNoFee: true },
      seo: { title: 'Laptop SSD & RAM Upgrade Kuwait | Speed Up Slow Laptop | KCROC', description: 'Speed up a slow laptop with a compatible SSD or RAM upgrade in Kuwait. We check the real bottleneck, test compatibility and offer cloning where suitable.', canonicalUrl: 'https://www.computerrepairkuwait.com/ssd-ram-upgrade-kuwait', locale: 'en_KW', alternates: { 'en-KW': 'https://www.computerrepairkuwait.com/ssd-ram-upgrade-kuwait', 'ar-KW': 'https://www.computerrepairkuwait.com/ar/ssd-ram-upgrade-kuwait', 'x-default': 'https://www.computerrepairkuwait.com/ssd-ram-upgrade-kuwait' }, ogType: 'article', schemaTypes: ['Service', 'FAQPage'], lastModified: '2026-10-02T00:00:00+03:00' },
      navigationPriority: 52, isFeatured: false, popular: false
    } as ServiceEntity,

    'srv-liquid-damage': {
      id: 'srv-liquid-damage', slug: 'laptop-liquid-damage-repair-kuwait', entityType: 'Service', isActive: true,
      title: 'Laptop Liquid Damage Repair Kuwait', iconKey: 'cpu',
      shortDescription: 'Liquid-spill assessment, corrosion inspection, board cleaning and component-level repair for laptops and MacBooks.',
      description: 'Coffee, water, juice and other spills can create short circuits immediately and corrosion that continues after the visible liquid is gone. KCROC isolates power, documents the affected areas, inspects connectors and board traces, and cleans contamination before deciding which components can be saved. The objective is to repair the original electronics where practical, while being honest when corrosion or component damage makes a repair uneconomical.',
      idealCustomer: 'Laptop and MacBook owners who have experienced a recent spill, moisture exposure, corrosion, or a device that stopped working after liquid contact.',
      deviceTypes: ['Windows Laptops', 'MacBook Air', 'MacBook Pro', 'Gaming Laptops', 'Business Laptops'],
      repairLevel: 'component-level', estimatedTurnaround: '24-72 Hours',
            pricing: { startingFrom: 35, currency: 'KWD', quoteRequired: true, displayLabel: 'From 35 KWD' },
      coreFeatures: ['Immediate Power Isolation', 'Liquid Damage Inspection', 'Corrosion Mapping', 'Board Cleaning', 'Connector Inspection', 'Component-Level Diagnostics', 'Micro-Soldering Where Required', 'Post-Repair Stress Testing', 'Free Pick & Drop', '30-Day Warranty'],
      brands: ['Dell', 'HP', 'Lenovo', 'ASUS', 'Acer', 'MSI', 'MacBook'],
      whyChooseUs: [
        { title: 'Power-Off First', description: 'We prioritize electrical isolation because continuing to power a wet or contaminated board can worsen the damage.' },
        { title: 'Corrosion Inspection', description: 'Visible drying does not mean the electronics are safe. Connectors, traces and components are inspected for contamination and corrosion.' },
        { title: 'Original Board Where Practical', description: 'When the board is repairable, component-level work can preserve the original hardware instead of defaulting to a board swap.' },
        { title: 'Honest Repairability Assessment', description: 'If corrosion or component damage makes repair uneconomical, we explain that before further paid work.' }
      ],
      commonIssues: [
        { id: 'spill-no-power', title: 'Laptop Died After a Spill', severity: 'critical', description: 'Power should be isolated immediately. The board is then inspected for shorts, corrosion and damaged power components.' },
        { id: 'spill-keyboard', title: 'Keyboard Stopped Working After Liquid', severity: 'high', description: 'The keyboard and the electronics underneath it are checked because liquid can travel beyond the visible spill area.' },
        { id: 'liquid-black-screen', title: 'Laptop Powers On but Screen Is Black', severity: 'critical', description: 'Liquid can affect display power, backlight circuits, connectors or the motherboard even when fans still spin.' },
        { id: 'corrosion-later', title: 'Laptop Failed Days After a Spill', severity: 'high', description: 'Delayed corrosion can turn a minor-looking spill into an intermittent or complete hardware failure.' }
      ],
      process: [
        { step: 1, title: 'Emergency Pickup', description: 'We collect the affected device across Kuwait. If it is still powered on, shut it down and disconnect power first.' },
        { step: 2, title: 'Power Isolation & Teardown', description: 'The battery and power sources are isolated before the affected areas are inspected.' },
        { step: 3, title: 'Corrosion Assessment', description: 'We map contamination, inspect connectors and test relevant board rails and components.' },
        { step: 4, title: 'Cleaning & Component Repair', description: 'Contamination is cleaned and repairable components, traces or connectors are addressed at board level where practical.' },
        { step: 5, title: 'Functional Stress Test', description: 'Charging, display, keyboard, storage, thermals and other affected functions are tested after repair.' },
        { step: 6, title: 'Return with Warranty', description: 'The repaired device is returned with a 30-day parts and labour warranty on the completed repair.' }
      ],
      faqs: [
        { id: 'liquid-faq-1', title: 'What should I do immediately after spilling liquid on my laptop?', answer: 'Shut it down, disconnect the charger, and do not keep powering it on to check whether it works. Arrange an inspection as soon as practical.' },
        { id: 'liquid-faq-2', title: 'Can a laptop still be repaired after a coffee spill?', answer: 'Often yes, depending on where the liquid reached and how much corrosion or component damage occurred. Early power isolation improves the chances of saving the original board.' },
        { id: 'liquid-faq-3', title: 'Do you repair liquid-damaged MacBooks?', answer: 'Yes. We inspect the motherboard and affected circuits at component level where appropriate, including USB-C power and display-related faults.' },
        { id: 'liquid-faq-4', title: 'Should I put a wet laptop in rice?', answer: 'No. Rice does not remove contamination from connectors or circuit boards and can introduce debris. Shut the laptop down, disconnect power, and arrange a proper inspection instead.' },
        { id: 'liquid-faq-5', title: 'Can a laptop fail days after a spill?', answer: 'Yes. Residue and corrosion can continue affecting contacts and components after the device appears dry. Delayed faults are one reason a post-spill inspection matters.' },
        { id: 'liquid-faq-6', title: 'Can you save the original motherboard after liquid damage?', answer: 'Sometimes. The outcome depends on where the liquid reached, the corrosion level and which components or traces were affected. We assess repairability before recommending replacement.' },
      ],
      relatedServiceIds: ['srv-motherboard', 'srv-keyboard', 'srv-macbook'],
      relatedProblemIds: ['problem-liquid-spill', 'problem-no-power', 'problem-black-screen'],
      relatedBrandIds: ['brand-dell', 'brand-hp', 'brand-lenovo', 'brand-msi'],
      relatedResourcePaths: [
        { label: 'Laptop Repair Guide', path: '/laptop-repair-kuwait' },
        { label: 'MacBook Repair', path: '/macbook-repair-kuwait' },
      ],
      relatedCaseStudyPath: { label: 'Real MacBook Liquid-Damage Case Study', path: '/case-studies/macbook-liquid-damage-salmiya' },
      technicalOverview: {
        heading: 'What Happens Inside a Liquid-Damaged Laptop',
        paragraphs: [
          'Liquid can bridge electrical contacts immediately and leave residues that continue to affect connectors, traces and components after the visible moisture has disappeared. Coffee, soft drinks and other contaminated liquids can be especially problematic because drying does not remove the residue.',
          'KCROC isolates power before detailed inspection, maps contamination and corrosion, then tests affected circuits. When the original board is repairable, component-level work can preserve it instead of treating every spill as an automatic motherboard replacement.'
        ]
      },
      repairDecision: {
        heading: 'Liquid Damage: What To Do Before Pickup',
        items: [
          { condition: 'Laptop is still powered on', action: 'Shut it down immediately and disconnect the charger. Do not keep testing it.' },
          { condition: 'Liquid reached the keyboard or ports', action: 'Do not reconnect power just because the outside appears dry; internal contamination may remain.' },
          { condition: 'Laptop appears dead after a spill', action: 'Arrange inspection rather than repeatedly pressing the power button, which can worsen a short.' },
          { condition: 'Device failed days after the spill', action: 'Request a corrosion-focused inspection because delayed failures can occur after the original incident.' }
        ]
      },
      inspectionChecklist: ['Confirm liquid type and affected area', 'Isolate battery and external power', 'Inspect board and connectors', 'Map corrosion and contamination', 'Test affected power rails', 'Verify all repaired functions under load'],
      contentImages: [
        { src: IMAGES.laptopHardware.laptopOpenRepairBench.src, alt: IMAGES.laptopHardware.laptopOpenRepairBench.alt, width: IMAGES.laptopHardware.laptopOpenRepairBench.width, height: IMAGES.laptopHardware.laptopOpenRepairBench.height, placement: 'commonIssues', caption: 'An opened laptop ready for liquid-damage inspection and corrosion assessment.' },
        { src: IMAGES.laptopHardware.dellTeardown.src, alt: IMAGES.laptopHardware.dellTeardown.alt, width: IMAGES.laptopHardware.dellTeardown.width, height: IMAGES.laptopHardware.dellTeardown.height, placement: 'coreFeatures', caption: 'Internal hardware exposed for detailed motherboard and connector inspection after liquid exposure.' },
        { src: IMAGES.laptopHardware.dellRepair.src, alt: IMAGES.laptopHardware.dellRepair.alt, width: IMAGES.laptopHardware.dellRepair.width, height: IMAGES.laptopHardware.dellRepair.height, placement: 'process', caption: 'Component-level repair work after cleaning and fault isolation on a liquid-damaged laptop.' }
      ],
      warranty: { duration: '30 Days', coverage: 'Parts and labour for components repaired or replaced during the liquid-damage service', noFixNoFee: true },
      seo: { title: 'Laptop Liquid Damage Repair Kuwait | KCROC', description: 'Laptop and MacBook liquid damage repair in Kuwait. Corrosion inspection, board cleaning, micro-soldering and component-level diagnostics with free pickup.', canonicalUrl: 'https://www.computerrepairkuwait.com/laptop-liquid-damage-repair-kuwait', locale: 'en_KW', alternates: { 'en-KW': 'https://www.computerrepairkuwait.com/laptop-liquid-damage-repair-kuwait', 'ar-KW': 'https://www.computerrepairkuwait.com/ar/laptop-liquid-damage-repair-kuwait', 'x-default': 'https://www.computerrepairkuwait.com/laptop-liquid-damage-repair-kuwait' }, ogType: 'article', schemaTypes: ['Service', 'FAQPage'] },
      navigationPriority: 51, isFeatured: false, popular: false
    } as ServiceEntity,

    'srv-macbook': { 
      id: 'srv-macbook', 
      slug: 'macbook-repair-kuwait', 
      entityType: 'Service', 
      isActive: true, 
      title: 'MacBook Repair Kuwait', 
      iconKey: 'apple', 
      shortDescription: 'Chip-level motherboard repair, USB-C power IC replacement, and liquid damage recovery — without Apple\'s full board-swap and data-loss policy.',
      description: 'Your MacBook won\'t turn on, a spilled drink has just hit the keyboard, or neither Thunderbolt port will charge it anymore — and an Apple Authorized Service Provider has quoted a full motherboard replacement that costs hundreds of KWD and, on most Apple Silicon models, means starting over with zero access to your original files. That last part isn\'t a scare tactic — it\'s how the hardware works: on M1/M2/M3 MacBooks, storage is soldered directly to the board and encrypted against that specific board\'s Secure Enclave, so a swapped board is a genuinely different machine as far as your data is concerned. We take the other path. Using thermal imaging and a multimeter, we trace the fault to the exact failed component — a shorted MOSFET, a blown power IC, a corroded trace — and repair that one point via micro-soldering, on your original board. Your SSD, your Secure Enclave, and your data stay exactly where they were.', 
      idealCustomer: 'Creative professionals, developers, students, and business professionals who\'ve been quoted an expensive board-swap by Apple or a reseller and need the original motherboard — and the data on it — recovered rather than replaced.',
      deviceTypes: [
        'MacBook Air (M1, M2, M3)',
        'MacBook Pro 13" (Intel & M-series)',
        'MacBook Pro 14" (M1 Pro/Max, M2 Pro/Max, M3 Pro/Max)',
        'MacBook Pro 16" (Intel & M-series)',
        'Intel MacBooks (2015 and later)'
      ],
      repairLevel: 'chip-level', 
      estimatedTurnaround: '24-48 Hours', 
      pricing: { startingFrom: 25, currency: 'KWD', quoteRequired: true, displayLabel: 'From 25 KWD — free diagnostic first' }, 
      relatedServiceIds: ['srv-motherboard', 'srv-charging-port', 'srv-battery', 'srv-liquid-damage', 'srv-macbook-screen'],
      relatedProblemIds: ['problem-liquid-spill', 'problem-not-charging', 'problem-no-power', 'problem-black-screen'],
      relatedBrandIds: [],
      relatedResourcePaths: [
        { label: 'BIOS / UEFI Recovery Guide', path: '/guides/bios-uefi-recovery-kuwait' },
        { label: 'Laptop Battery Warning Signs', path: '/guides/laptop-battery-warning-signs' },
      ],
      relatedCaseStudyPath: { label: 'MacBook Liquid-Damage Case Study — Salmiya', path: '/case-studies/macbook-liquid-damage-salmiya' },
      coreFeatures: [
        'Motherboard Micro-Soldering',
        'USB-C Power IC Replacement',
        'Liquid Damage Ultrasonic Cleaning',
        'Data-Safe Board-Level Repair (Apple Silicon & Intel)',
        'MacBook Screen Replacement',
        'MacBook Battery Replacement',
        'Keyboard Replacement (Butterfly & Magic Keyboard)',
        'Trackpad & Taptic Engine Repair',
        'Speaker & Audio IC Repair',
        'WiFi / Bluetooth Module Replacement',
        'Free Pick & Drop',
        '30-Day Warranty'
      ], 
      brands: ['MacBook Air', 'MacBook Pro 13"', 'MacBook Pro 14"', 'MacBook Pro 16"'], 

      whyChooseUs: [
        { title: 'Chip-Level Motherboard Repair', description: 'We trace the fault to the specific failed component — a MOSFET, a power IC, a corroded trace — and repair it directly, instead of defaulting to a full board swap.' },
        { title: 'Data Preserved By Design', description: 'Because we repair your original board rather than replacing it, your SSD and Secure Enclave never change — a real distinction on Apple Silicon models, where a swapped board means the storage encryption no longer matches.' },
        { title: 'USB-C Power IC Specialists', description: 'Charging and port failures are among the most common MacBook faults we see, and are frequently a single failed IC rather than a reason to replace the board.' },
        { title: 'Liquid Damage Ultrasonic Cleaning', description: 'The board is fully stripped and run through an industrial ultrasonic cleaner to remove corrosion at a microscopic level before we assess what, if anything, needs replacing.' },
        { title: 'Free Diagnostic Before Any Quote', description: 'Thermal imaging and multimeter tracing happen before you\'re quoted anything — you know the actual fault, not a guess based on symptoms alone.' },
        { title: 'ESD-Safe Laboratory', description: 'All micro-soldering and board work is performed on grounded, static-controlled workstations in our Hawalli lab.' },
        { title: 'Free Pickup & Delivery, Kuwait-Wide', description: 'Collected from and returned to your home or office anywhere in Kuwait, at no extra cost.' },
        { title: 'No Fix, No Fee', description: 'If we can\'t repair it after diagnosis, you pay nothing — not even for the diagnostic.' }
      ],

      commonIssues: [
        { 
          id: 'no-power', 
          title: 'No Power / Completely Dead Device', 
          severity: 'critical', 
          description: 'No charging light, no fan spin, no response to the power button. Usually a shorted input MOSFET or a blown main power rail (PPBUS_G3H and similar) rather than a dead motherboard outright — we trace it with a multimeter before assuming the worst.' 
        },
        { 
          id: 'liquid-damage', 
          title: 'Liquid Spill / Water Damage', 
          severity: 'critical', 
          description: 'Coffee, water, or juice spilled on the keyboard creates conductive bridges across the board and can short components within hours as sugars and acids corrode copper traces. Power off immediately and don\'t try to turn it on to "check" it — that\'s what actually completes the short in most cases we see.' 
        },
        { 
          id: 'usb-c-not-charging', 
          title: 'USB-C Port Not Charging or Not Recognized', 
          severity: 'high', 
          description: 'Neither Thunderbolt port charges the machine or recognizes accessories. Most commonly a failed power negotiation IC on the board — the physical port itself is rarely the actual fault, which is why replacing just the port connector often doesn\'t fix it.' 
        },
        { 
          id: 'screen-flicker', 
          title: 'Screen Flickering or Backlight Failure', 
          severity: 'medium', 
          description: 'Can be a damaged display cable (common near the hinge on frequently opened/closed lids), a failing backlight driver, or — less often — a GPU-related fault on Intel models. We isolate which before quoting a screen replacement.' 
        },
        { 
          id: 'keyboard-not-responding', 
          title: 'Keyboard Keys Not Responding or Sticking', 
          severity: 'medium', 
          description: 'On 2016-2019 butterfly-mechanism keyboards, dust ingress under individual keys is a well-known failure point. On Magic Keyboard models (2020+), it\'s more often a ribbon cable or controller issue. We diagnose which mechanism is involved before replacing anything.' 
        },
        { 
          id: 'trackpad-unresponsive', 
          title: 'Trackpad Unresponsive or Not Clicking', 
          severity: 'medium', 
          description: 'Force Touch trackpads use a Taptic Engine to simulate a click rather than a physical switch — when that fails, the trackpad can still move the cursor but stop registering clicks entirely, which is a Taptic Engine fault, not a full trackpad replacement in most cases.' 
        },
        { 
          id: 'stuck-apple-logo', 
          title: 'Stuck on Apple Logo / Won\'t Boot Past Startup', 
          severity: 'high', 
          description: 'Can range from a corrupted macOS installation (software-level, no hardware repair needed) to a failing SSD controller or RAM fault on the board. We check software recovery options first before assuming a hardware repair is required.' 
        },
        { 
          id: 'random-restarts', 
          title: 'Random Restarts / Kernel Panics', 
          severity: 'high', 
          description: 'Intermittent, unpredictable restarts under normal use point toward a power delivery instability or a marginal RAM/storage connection rather than a software bug, especially if they happen regardless of which apps are running.' 
        },
        { 
          id: 'no-sound', 
          title: 'No Sound or Distorted Audio', 
          severity: 'low', 
          description: 'Usually a failed audio IC or a damaged speaker driver rather than a software setting — worth a diagnostic if a system reset hasn\'t resolved it.' 
        },
        { 
          id: 'wifi-bluetooth-fail', 
          title: 'WiFi or Bluetooth Not Working', 
          severity: 'low', 
          description: 'Can be a wireless card fault, a damaged antenna connection (common after screen or top-case work by other shops), or a driver-level issue on older macOS installs.' 
        },
        { 
          id: 'macbook-battery-swelling', 
          title: 'Swollen Battery Lifting the Trackpad', 
          severity: 'critical', 
          description: 'A visibly raised or uneven trackpad is frequently a swollen battery underneath it — a genuine safety issue, not cosmetic. Stop using the device and see our dedicated battery replacement service for safe removal.' 
        },
        { 
          id: 'overheating-fan-noise', 
          title: 'Overheating or Constant Fan Noise', 
          severity: 'medium', 
          description: 'More common on Intel MacBook Pro models under sustained loads (video export, compiling) than on Apple Silicon, but dust-clogged fans and degraded thermal paste affect both — we check airflow and thermal material condition as part of every diagnostic.' 
        },
        { 
          id: 'dead-macbook-data-recovery', 
          title: 'Dead MacBook With Important Data Still On It', 
          severity: 'critical', 
          description: 'Because storage is soldered and encrypted to the board on most modern MacBooks, a completely dead machine with unsaved data is precisely the scenario where board-swap (Apple\'s standard fix) permanently loses access to your files, while board-level component repair is often the only path that keeps them recoverable.' 
        }
      ], 

      process: [
        { step: 1, title: 'Free Pickup', description: 'We collect your MacBook from your home or office anywhere in Kuwait.' },
        { step: 2, title: 'Thermal Imaging & Multimeter Diagnostic', description: 'We trace the fault to the exact component — a shorted MOSFET, a blown power IC, a corroded trace — rather than assuming the whole board needs replacing.' },
        { step: 3, title: 'Confirm the Fault & Quote', description: 'You get a written explanation of what\'s actually wrong and an itemized quote before any work starts.' },
        { step: 4, title: 'Micro-Soldering Repair in an ESD-Safe Lab', description: 'The failed component is replaced or the board is ultrasonically cleaned for liquid damage, on grounded, static-controlled workstations.' },
        { step: 5, title: 'Full-Load Stress Testing', description: 'The board is stress-tested under sustained load to confirm the repair holds before reassembly.' },
        { step: 6, title: 'Return with 30-Day Warranty', description: 'Your MacBook is delivered back with your original SSD, Secure Enclave, and data untouched.' }
      ],

      performanceOutcomes: {
        disclaimer: 'The outcomes below describe typical results for these repair categories, not a guarantee for any specific device — every repair is quoted after its own diagnostic.',
        items: [
          { metric: 'Board Recovery Rate', outcome: 'The majority of motherboards referred to us as "needs full replacement" are repairable at component level once the fault is traced to its actual source.' },
          { metric: 'Data Preservation', outcome: 'Because the original board is repaired rather than swapped, the original SSD and Secure Enclave remain untouched in the large majority of repairs — data stays accessible without a separate recovery step.' },
          { metric: 'Liquid Damage Cases', outcome: 'Boards brought in within 24-48 hours of a spill, without being powered on again after the incident, have meaningfully better recovery outcomes than those that were repeatedly tested first.' },
          { metric: 'Cost vs. Board-Swap Quotes', outcome: 'Component-level repair typically costs a fraction of an out-of-warranty full motherboard replacement quote.' }
        ]
      },

      repairExamples: {
        disclaimer: 'These are representative repair scenarios illustrating common fault categories we service, not records of a specific named customer.',
        items: [
          {
            id: 'usb-c-power-ic',
            title: 'MacBook Pro: Neither Thunderbolt Port Would Charge',
            symptoms: 'The laptop wouldn\'t charge from either USB-C port, tested across three different chargers and cables.',
            diagnosis: 'Multimeter testing under load isolated the fault to the board\'s power negotiation IC, not the physical ports or the chargers.',
            repair: 'The failed power IC was replaced via micro-soldering.',
            outcome: 'Both ports charged normally and were verified across multiple chargers before return.'
          },
          {
            id: 'fast-response-liquid',
            title: 'MacBook Air: Spill Recovered With No Data Loss',
            symptoms: 'Liquid was spilled on the keyboard; the device was powered off immediately and brought in the same day without being tested again.',
            diagnosis: 'Because power was cut immediately and the device wasn\'t powered back on, ultrasonic cleaning found minimal corrosion and no shorted components.',
            repair: 'Full ultrasonic cleaning of the board; no component replacement was needed.',
            outcome: 'The MacBook returned to full function with no data loss and no chip-level repair required — illustrating why immediate power-off matters more than any repair technique afterward.'
          },
          {
            id: 'apple-said-unfixable',
            title: 'MacBook Pro: Data Recovered From a Board Apple Called Unfixable',
            symptoms: 'The MacBook was completely dead with no display; Apple quoted a full motherboard replacement with total data loss, since the Apple Silicon storage encryption is tied to the original board\'s Secure Enclave.',
            diagnosis: 'Thermal imaging under a safe test voltage located a single shorted component on the main power rail.',
            repair: 'The shorted component was replaced via micro-soldering rather than swapping the board.',
            outcome: 'The original SSD and Secure Enclave were never touched — all data remained accessible once the board powered on again.'
          }
        ]
      },

      inspectionChecklist: [
        'Power rail voltage tracing',
        'USB-C power IC diagnostics',
        'Battery health & charging circuit test',
        'Liquid damage / corrosion inspection under magnification',
        'Display & backlight circuit test',
        'Keyboard & trackpad function test',
        'Speaker & microphone test',
        'WiFi / Bluetooth module test',
        'Thermal imaging under sustained load'
      ],

      faqs: [
        {
          id: 'faq-apple-said-unfixable',
          title: 'Can you repair a MacBook Apple said needs a full motherboard replacement?',
          answer: 'Often, yes. Apple Authorized Service Providers are generally set up to replace the whole board rather than repair the individual failed component — "needs a new board" from Apple usually means beyond their repair model, not beyond repair entirely. We diagnose the specific fault before agreeing either way.'
        },
        {
          id: 'faq-data-loss-board-repair',
          title: 'Will I lose my data if my MacBook needs board-level repair?',
          answer: 'Not with component-level repair — we work on your original board, so your SSD and (on Apple Silicon) Secure Enclave never change. Data loss risk comes specifically from board-swap, where the new board\'s encryption no longer matches your original storage.'
        },
        {
          id: 'faq-apple-silicon-harder-repair',
          title: 'Is it true that Apple Silicon (M1/M2/M3) MacBooks are harder to repair than older Intel models?',
          answer: 'In some ways, yes — storage and memory are soldered directly to the board rather than removable, and storage encryption is tied to that specific board\'s Secure Enclave. That actually makes board-level component repair more important on Apple Silicon, not less, since board-swap is a bigger data-loss event than it was on older Intel models with removable SSDs.'
        },
        {
          id: 'faq-intel-macbooks',
          title: 'Do you repair Intel MacBooks as well as Apple Silicon models?',
          answer: 'Yes — Intel MacBooks from 2015 onward alongside M1, M2, and M3 generation Apple Silicon models.'
        },
        {
          id: 'faq-liquid-spill-immediate-steps',
          title: 'What should I do immediately after spilling liquid on my MacBook?',
          answer: 'Power it off immediately by holding the power button, don\'t plug it into a charger, and don\'t try to turn it on to "check" if it still works — that\'s what completes the electrical short in most cases we see. Bring it in as soon as possible; faster response meaningfully improves the outcome.'
        },
        {
          id: 'faq-usb-c-without-board-swap',
          title: 'Can a MacBook with USB-C charging problems be fixed without a full board replacement?',
          answer: 'Usually. Charging failures are most often a single failed power IC rather than a reason to replace the entire board, and we test for that specifically before quoting anything more extensive.'
        },
        {
          id: 'faq-macbook-repair-cost-vs-apple',
          title: 'How much does MacBook motherboard repair cost compared to Apple?',
          answer: 'Diagnostics are free, and component-level repairs start from 25 KWD, typically a fraction of an out-of-warranty full board-swap quote from Apple — the exact price depends on which component failed.'
        },
        {
          id: 'faq-genuine-parts-macbook',
          title: 'Do you use genuine Apple parts?',
          answer: 'For screens and batteries we use OEM and high-grade compatible options and explain the difference before you choose. For chip-level board repair, we source matched-spec components for the specific failed part rather than full genuine Apple sub-assemblies, which is what makes component-level repair possible at all.'
        },
        {
          id: 'faq-keyboard-without-top-case',
          title: 'Can you replace a MacBook keyboard without replacing the whole top case?',
          answer: 'It depends on the model and mechanism — some generations require top-case-level replacement due to how the keyboard is integrated, while others allow more targeted repair. We confirm which applies to your specific model before quoting.'
        },
        {
          id: 'faq-macbook-thermal-after-repair',
          title: 'Will my MacBook run hot after repair?',
          answer: 'It shouldn\'t — thermal paste condition and fan/vent cleanliness are checked as part of every diagnostic, and we address them if they\'re contributing to heat issues, not just the specific fault you came in for.'
        },
        {
          id: 'faq-macbook-warranty',
          title: 'Do you offer a warranty on motherboard repairs?',
          answer: 'Yes, 30 days covering all parts and labor on the repair performed.'
        },
        {
          id: 'faq-macbook-turn-around-time',
          title: 'How long does MacBook repair take?',
          answer: 'Most component-level repairs complete in 24-48 hours, including full-load stress testing before the device is returned to you.'
        }
      ],

      technicalOverview: {
        heading: 'Can your laptop be repaired, how much will it cost, and what happens first?',
        paragraphs: [
          'Most laptop faults are not a simple buy-or-replace decision. The repair path depends on the symptom, model, failed component, parts availability and whether the chassis, board or display is physically damaged. KCROC diagnoses the hardware first, then explains the practical repair options before work is approved.',
          'For power, charging, overheating, display, storage or motherboard problems, the technician starts by separating the symptom from the likely cause. A laptop that powers on with a black display is not the same problem as a machine with no charging response at all, so the diagnostic path and quote can be different.',
          'Pricing starts with diagnosis rather than a blanket promise. Common work has starting rates on the pricing page, while board-level, liquid-damage and model-specific repairs require a fault-based quotation. Pickup and delivery are handled through KCROC\'s Kuwait-wide service model, and data-sensitive board repairs can be performed without browsing personal files.'
        ]
      },
      repairDecision: {
        heading: 'When is laptop repair worth doing?',
        items: [
          { condition: 'Screen, hinge, battery, charging port, fan or keyboard has failed but the rest of the laptop is healthy.', action: 'A targeted part or structural repair is usually the first path to evaluate.' },
          { condition: 'Laptop is completely dead, not charging, or shuts down under load.', action: 'Test the power and thermal path before assuming the motherboard must be replaced.' },
          { condition: 'Motherboard has a component-level fault or liquid damage.', action: 'Trace the affected circuit and compare board-level repair with replacement cost before deciding.' },
          { condition: 'Older laptop is slow because of storage or memory limitations.', action: 'Check SSD/RAM upgrade compatibility and data-migration needs before replacing the machine.' },
          { condition: 'The chassis or board is severely burned or the repair is economically unreasonable.', action: 'KCROC will explain the limitation and, under the No Fix, No Fee policy, you are not charged for an unsuccessful repair diagnosis.' }
        ]
      },
      warranty: { duration: '30 Days', coverage: 'All parts and labor.', noFixNoFee: true }, 
      contentImages: [
        {
          src: IMAGES.macbook.diagnostics.src,
          alt: IMAGES.macbook.diagnostics.alt,
          width: IMAGES.macbook.diagnostics.width,
          height: IMAGES.macbook.diagnostics.height,
          placement: 'commonIssues',
          caption: 'A technician running board-level diagnostics on an opened MacBook to isolate the failed component.'
        },
        {
          src: IMAGES.macbook.logicBoard.src,
          alt: IMAGES.macbook.logicBoard.alt,
          width: IMAGES.macbook.logicBoard.width,
          height: IMAGES.macbook.logicBoard.height,
          placement: 'coreFeatures',
          caption: 'Component-level motherboard and fan repair — replacing the exact failed chip rather than the whole board.'
        },
        {
          src: IMAGES.macbook.swollenBattery1.src,
          alt: IMAGES.macbook.swollenBattery1.alt,
          width: IMAGES.macbook.swollenBattery1.width,
          height: IMAGES.macbook.swollenBattery1.height,
          placement: 'process',
          caption: 'A swollen MacBook battery safely removed during teardown before board-level repair begins.'
        }
      ],
      seo: { 
        title: 'MacBook Repair Kuwait | Screen & Board Repair | KCROC', 
        description: 'MacBook repair in Kuwait for charging, liquid and board-level faults. Original-board micro-soldering where practical, free pickup and 30-day warranty.', 
        canonicalUrl: 'https://www.computerrepairkuwait.com/macbook-repair-kuwait', locale: 'en_KW', alternates: { 'en-KW': 'https://www.computerrepairkuwait.com/macbook-repair-kuwait', 'ar-KW': 'https://www.computerrepairkuwait.com/ar/macbook-repair-kuwait', 'x-default': 'https://www.computerrepairkuwait.com/macbook-repair-kuwait' }, 
        ogType: 'article', 
        schemaTypes: ['Service', 'FAQPage'] 
      },
      navigationPriority: 100, 
      isFeatured: true, 
      popular: true 
    } as ServiceEntity,
    
    'srv-laptop': { 
      id: 'srv-laptop', 
      slug: 'laptop-repair-kuwait', 
      entityType: 'Service', 
      isActive: true, 
      title: 'Laptop Repair Kuwait', 
      iconKey: 'laptop', 
      shortDescription: 'Screen, hinge, battery, charging port, and motherboard repair for all major Windows laptop brands.', 
      description: 'Everyday Windows laptops—from budget student IdeaPads to high-end XPS workstations—face a tough life. Between daily transport, dropped bags, and Kuwait\'s extreme summer heat combined with fine desert dust, mechanical and thermal failures are inevitable. We see it every day: hinges separating from plastic chassis, DC charging jacks pushed inward, cooling fans grinding or seizing, and systems slowing to a crawl. Instead of telling you to buy a new laptop, we fix the actual broken part. We repair snapped hinges with structural resin, micro-solder broken charging ports directly to the motherboard, ultrasonic-clean dust-choked cooling systems, and revive slow systems with SSD and RAM upgrades. We stock OEM and high-grade compatible parts for Dell, HP, Lenovo, ASUS, Acer, and MSI.', 
      idealCustomer: 'Students, business professionals, remote workers, and everyday users who rely on their Windows laptops daily and need fast, reliable hardware restoration without losing their personal files or paying for a completely new machine.', 
      deviceTypes: [
        'Business Ultrabooks (XPS, ThinkPad, EliteBook)',
        'Everyday Laptops (Inspiron, Pavilion, IdeaPad)',
        'Creator Laptops (ZenBook, Envy)',
        '2-in-1 / Convertibles (Yoga, Spectre)',
        'Microsoft Surface Devices'
      ],
      commercialAnswers: [
        { question: 'Can my laptop actually be repaired?', answer: 'Usually the first step is diagnosis rather than replacement. KCROC checks the actual fault and explains whether a component repair, part replacement or a full replacement makes more sense.' },
        { question: 'How much does laptop repair cost in Kuwait?', answer: 'Common laptop repair services start from 15 KWD, while the final price depends on the device, fault and parts required. You receive the repair quote before paid work begins.' },
        { question: 'How long does laptop repair take?', answer: 'Many routine repairs are completed the same day or within 24 hours when the required part is available. Board-level faults and parts orders can take longer.' },
        { question: 'Do you pick up laptops from my area?', answer: 'Yes. Free pickup and delivery are available across Kuwait, including Farwaniya, Hawalli, Salmiya, Kuwait City, Jahra and Ahmadi.' },
        { question: 'Do you repair laptop motherboard faults?', answer: 'Yes. Power rails, charging circuits, MOSFETs, ICs and other board-level faults can be tested and repaired where the board is technically repairable.' },
        { question: 'Will my files stay safe during repair?', answer: 'The repair process focuses on the requested hardware fault. For board-level work, you can remove the SSD before handing over the laptop, and important files should always be backed up beforehand.' },
        { question: 'Which laptop brands do you repair?', answer: 'KCROC handles Dell, HP, Lenovo, ASUS, Acer, MSI and Microsoft Surface laptops, plus MacBook repair through a separate service page.' },
        { question: 'Do I have to visit the Hawalli workshop?', answer: 'No. Most customers use the pickup-and-delivery route. Devices are diagnosed and repaired at the Hawalli lab, then returned after testing.' },
      ],
      repairLevel: 'advanced', 
      estimatedTurnaround: 'Same Day / 24 Hours', 
      pricing: { startingFrom: 15, currency: 'KWD', quoteRequired: true, displayLabel: 'From 15 KWD' }, 
      relatedServiceIds: ['srv-gaming', 'srv-macbook', 'srv-motherboard', 'srv-screen', 'srv-battery', 'srv-charging-port', 'srv-gaming-laptop-cleaning'],
      relatedProblemIds: ['problem-no-power', 'problem-overheating', 'problem-black-screen', 'problem-not-charging', 'problem-slow', 'problem-freezing-crashing', 'problem-hinge-break', 'problem-cracked-screen', 'problem-windows-wont-boot'],
      relatedBrandIds: ['brand-dell', 'brand-hp', 'brand-lenovo', 'brand-asus', 'brand-acer', 'brand-msi'],
      relatedLocationIds: ['loc-hawalli', 'loc-salmiya', 'loc-kuwait-city', 'loc-farwaniya', 'loc-jahra', 'loc-ahmadi', 'loc-fahaheel'],
      relatedResourcePaths: [
        { label: "Laptop Won't Turn On? Complete Troubleshooting Guide", path: '/laptop-wont-turn-on' },
        { label: 'Laptop Battery Warning Signs', path: '/guides/laptop-battery-warning-signs' },
        { label: 'Laptop Overheating Diagnostic Path', path: '/laptop-overheating-kuwait' },
        { label: 'BIOS / UEFI Recovery Guide', path: '/guides/bios-uefi-recovery-kuwait' },
      ],
      coreFeatures: [
        'Hinge & Chassis Reconstruction',
        'DC Jack / Charging Port Micro-Soldering',
        'Screen Replacement (LCD/IPS/OLED)',
        'Thermal Paste & Fan Servicing',
        'SSD & RAM Upgrades',
        'Battery & Keyboard Replacement',
        'Liquid Damage Recovery',
        'Free Pick & Drop',
        '30-Day Warranty'
      ], 
      brands: ['Dell', 'HP', 'Lenovo', 'ASUS', 'Acer', 'MSI', 'Microsoft Surface'], 

      whyChooseUs: [
        { title: 'Repair Over Replacement', description: 'We reconstruct broken hinges and micro-solder broken charging ports instead of replacing the entire screen assembly or motherboard, saving you up to 70%.' },
        { title: 'Kuwait Climate Specialists', description: 'We don\'t just blow compressed air; we fully strip cooling assemblies, clean out fine desert dust, and apply phase-change thermal materials suited for 45°C+ ambient temperatures.' },
        { title: 'Privacy Protected', description: 'We work on the hardware, not your files. You can even remove your SSD before handing us the laptop for board-level repairs.' },
        { title: 'Broad Brand Expertise', description: 'Dell, HP, Lenovo, ASUS, Acer—we know the specific structural weaknesses (like Dell Inspiron hinges or HP Pavilion power ICs) of each brand.' },
        { title: 'Free Pickup & Delivery', description: 'We collect from Hawalli, Salmiya, Kuwait City, Farwaniya, Jahra, and Ahmadi at no extra cost.' },
        { title: 'No Fix, No Fee', description: 'If your laptop is catastrophically damaged and uneconomical to repair, you pay absolutely nothing for the diagnostic.' }
      ],

      commonIssues: [
        {
          id: 'hinge-separation',
          title: 'Hinge Separation & Chassis Cracking',
          severity: 'high',
          description: 'The screen hinge becomes stiff and snaps the plastic casing or bezel (very common on HP Envy and Dell Inspiron). We adjust tension and reconstruct the mounts using structural resin.'
        },
        {
          id: 'broken-dc-jack',
          title: 'Broken DC Charging Jack',
          severity: 'high',
          description: 'The charger pin is loose, bent, or pushed inside the laptop, meaning it only charges at a specific angle. We micro-solder a new DC jack directly to the board.'
        },
        {
          id: 'cracked-screen',
          title: 'Cracked or Flickering Screen',
          severity: 'high',
          description: 'Physical impact or display cable wear near the hinge causes lines, flickering, or a shattered display. We replace the LCD/IPS/OLED panel with an OEM-grade match.'
        },
        {
          id: 'overheating-loud-fans',
          title: 'Overheating & Loud Fans',
          severity: 'medium',
          description: 'Dust-clogged heatsinks cause thermal throttling and fan grinding. We perform deep ultrasonic cleaning, lubricate the fan bearings, and re-paste the CPU/GPU.'
        },
        {
          id: 'running-slow',
          title: 'Running Extremely Slow (100% Disk Usage)',
          severity: 'medium',
          description: 'Taking minutes to boot or freezing on basic tasks is usually a failing mechanical hard drive (HDD). An SSD upgrade and clean Windows install permanently revives aging laptops.'
        },
        {
          id: 'liquid-spills-laptop',
          title: 'Liquid Spills on Keyboard',
          severity: 'critical',
          description: 'Coffee or water on the keyboard. We fully strip the board and ultrasonic clean it to prevent corrosion before short circuits kill the motherboard.'
        },
        {
          id: 'laptop-dead-no-power',
          title: 'Dead / Won\'t Turn On',
          severity: 'high',
          description: 'No power lights, no fan spin. Usually a shorted input MOSFET or a blown fuse, which we trace with a multimeter and replace via micro-soldering.'
        },
        {
          id: 'keyboard-failure',
          title: 'Keyboard Keys Sticking or Not Working',
          severity: 'medium',
          description: 'Specific keys sticking from debris or failing from liquid exposure. We replace the entire keyboard assembly (top case or riveted layout depending on model).'
        },
        {
          id: 'battery-drain-laptop',
          title: 'Battery Draining Fast or Swelling',
          severity: 'high',
          description: 'Aging lithium cells cause short runtimes or dangerous physical chassis swelling. We safely remove swollen batteries and install certified replacements.'
        },
        {
          id: 'wifi-dropping',
          title: 'WiFi Dropping or Missing',
          severity: 'low',
          description: 'The WiFi card fails due to heat or driver conflicts (common with Realtek/MediaTek chips). We upgrade faulty cards to stable Intel Wi-Fi 6 modules.'
        }
      ],

      process: [
        { step: 1, title: 'Free Secure Pickup', description: 'We collect the laptop directly from your home or office anywhere in Kuwait.' },
        { step: 2, title: 'Hardware & Thermal Diagnostic', description: 'We test the charging circuit, assess chassis damage, check storage health, and measure thermal throttling under load.' },
        { step: 3, title: 'Quote & Approval', description: 'You receive a clear, itemized quote detailing the exact fix (e.g., "hinge repair + DC jack replacement") with zero hidden fees.' },
        { step: 4, title: 'Precision Repair', description: 'We reconstruct the chassis, solder the ports, replace the screen, or upgrade the drive in our ESD-safe lab.' },
        { step: 5, title: 'Burn-In Testing', description: 'The system is stress-tested to ensure hinges are smooth, temperatures are low, and power delivery is stable.' },
        { step: 6, title: 'Delivery with Warranty', description: 'We return the laptop to you with a 30-day warranty. You only pay after verifying the repair is successful.' }
      ],

      performanceOutcomes: {
        disclaimer: 'The figures below are representative outcomes based on typical before/after results for these common upgrades and repairs.',
        items: [
          { metric: 'Boot Times', outcome: 'Reduced from 2+ minutes on aging mechanical drives to under 15 seconds after an NVMe SSD upgrade.' },
          { metric: 'Thermal Reduction', outcome: '15-25°C drop in CPU temperatures under load after our deep-clean and phase-change thermal re-paste service.' },
          { metric: 'Chassis Integrity', outcome: 'Reconstructed hinges using structural resin are often mechanically stronger than the original factory plastic mounts.' },
          { metric: 'Component Lifespan', outcome: 'Micro-soldering a new DC jack saves the remaining 95% of the motherboard, extending the laptop\'s life by years instead of creating e-waste.' }
        ]
      },

      repairExamples: {
        disclaimer: 'These are representative scenarios illustrating common fault categories for Windows laptops.',
        items: [
          {
            id: 'hp-envy-hinge',
            title: 'HP Envy: Hinge Snapped and Screen Bezel Popped Open',
            symptoms: 'The screen was incredibly stiff to open, and eventually the lower left corner of the screen bezel popped open, exposing the internal display cables.',
            diagnosis: 'The factory hinge nut was over-tightened, causing the metal hinge to rip the threaded brass inserts completely out of the plastic chassis.',
            repair: 'We loosened the hinge tension to the correct spec and rebuilt the stripped brass inserts into the chassis using industrial structural resin.',
            outcome: 'The laptop opened and closed smoothly with one hand, saving the customer from buying an expensive complete display assembly.'
          },
          {
            id: 'dell-inspiron-dc-jack',
            title: 'Dell Inspiron: Wouldn\'t Charge Unless Cable Was Held at an Angle',
            symptoms: 'The laptop would only charge if the user applied upward pressure to the charging cable. Eventually, it stopped charging entirely.',
            diagnosis: 'The internal DC charging jack had broken off its solder pads on the motherboard due to repeated physical stress.',
            repair: 'We desoldered the broken port, cleaned the traces, and micro-soldered a brand-new, reinforced DC jack directly to the board.',
            outcome: 'The laptop charged perfectly without needing a 150+ KWD motherboard replacement. Total repair cost: 25 KWD.'
          },
          {
            id: 'lenovo-ideapad-slow',
            title: 'Lenovo IdeaPad: Taking 5 Minutes to Boot Up',
            symptoms: 'The laptop was unusable. Task Manager showed 100% Disk Usage constantly, and opening Chrome froze the system for a full minute.',
            diagnosis: 'The 1TB mechanical hard drive was failing mechanically, and 4GB of RAM was insufficient for modern Windows 11.',
            repair: 'We cloned the failing HDD byte-for-byte to a fast 1TB NVMe SSD and upgraded the RAM to 16GB.',
            outcome: 'The laptop booted in 12 seconds. All the customer\'s original files, programs, and passwords were right where they left them, but the machine ran 10x faster.'
          }
        ]
      },

      inspectionChecklist: [
        'Hinge tension and plastic mount integrity',
        'DC jack stability and voltage intake',
        'Battery health and swelling check',
        'CPU/GPU temperatures under synthetic load',
        'Storage drive health (SMART data)',
        'RAM stability test',
        'Keyboard and trackpad responsiveness',
        'Display cable and backlight circuit integrity'
      ],

      faqs: [
        {
          id: 'faq-fix-broken-hinge',
          title: 'Can you fix a broken hinge without replacing the whole screen?',
          answer: 'Yes. Most shops will quote a full "display assembly replacement" when a hinge breaks. We actually reconstruct the broken plastic mounts inside the chassis using industrial resin and loosen the over-tightened hinge to prevent it from happening again, saving you a massive amount of money.'
        },
        {
          id: 'faq-dc-jack-repair',
          title: 'My laptop only works when plugged in at a specific angle. Can this be fixed?',
          answer: 'Yes. This is a classic broken DC jack. Rather than replacing the motherboard, we micro-solder a new charging port directly to the board.'
        },
        {
          id: 'faq-ssd-upgrade-data',
          title: 'Will an SSD upgrade delete my files?',
          answer: 'No. We perform a 1-to-1 byte clone of your existing hard drive to the new SSD. Your laptop will look exactly the same—same desktop, same files, same passwords—it will just run up to 10x faster.'
        },
        {
          id: 'faq-screen-replacement-time',
          title: 'How long does a screen replacement take?',
          answer: 'Usually same-day if the panel is in stock. We carry standard 15.6" and 14" panels (FHD, IPS, OLED) for Dell, HP, Lenovo, Acer, and ASUS.'
        },
        {
          id: 'faq-overheating-fan-replace',
          title: 'My laptop is overheating and shutting down. Do I need a new fan?',
          answer: 'Not always. Often it just needs a deep ultrasonic clean of the heatsink fins and fresh thermal paste on the CPU. If the fan bearing is actually grinding or seized, we will replace the fan assembly.'
        },
        {
          id: 'faq-surface-repair',
          title: 'Do you repair Microsoft Surface laptops?',
          answer: 'Yes. Surface devices require specialized heat-separation tools to open without cracking the screen. We handle Surface Pro battery replacements, screen replacements, and Windows recovery.'
        },
        {
          id: 'faq-ram-upgrade',
          title: 'Can you upgrade the RAM in my laptop?',
          answer: 'It depends on the model. Most business and gaming laptops have upgradeable SO-DIMM slots, but many modern ultrabooks (like Dell XPS or HP Spectre) have RAM soldered directly to the board. Contact us with your model number and we can check instantly.'
        },
        {
          id: 'faq-no-fix-no-fee',
          title: 'What happens if you can\'t fix my laptop?',
          answer: 'Under our No Fix, No Fee policy, if the laptop is catastrophically damaged (like a severely burned motherboard) and uneconomical to repair, we return it to you and you pay absolutely nothing for the diagnostic time.'
        }
      ],

      warranty: { duration: '30 Days', coverage: 'All parts and labor.', noFixNoFee: true }, 
      contentImages: [
        {
          src: IMAGES.services.laptopRepair.src,
          alt: IMAGES.services.laptopRepair.alt,
          width: IMAGES.services.laptopRepair.width,
          height: IMAGES.services.laptopRepair.height,
          placement: 'commonIssues',
          caption: 'A representative laptop repair setup for diagnosing hardware, display, power, cooling and Windows faults.'
        },
        {
          src: IMAGES.laptopHardware.dellRepair.src,
          alt: IMAGES.laptopHardware.dellRepair.alt,
          width: IMAGES.laptopHardware.dellRepair.width,
          height: IMAGES.laptopHardware.dellRepair.height,
          placement: 'coreFeatures',
          caption: 'A Dell laptop chassis opened for hardware repair — a typical starting point for hinge, DC jack, and motherboard faults.'
        },
        {
          src: IMAGES.laptopHardware.hpLaptopMotherboardRepairOpen.src,
          alt: IMAGES.laptopHardware.hpLaptopMotherboardRepairOpen.alt,
          width: IMAGES.laptopHardware.hpLaptopMotherboardRepairOpen.width,
          height: IMAGES.laptopHardware.hpLaptopMotherboardRepairOpen.height,
          placement: 'coreFeatures',
          caption: 'HP laptop opened for motherboard and internal hardware diagnosis.'
        },
        {
          src: IMAGES.laptopHardware.laptopOpenRepairBench.src,
          alt: IMAGES.laptopHardware.laptopOpenRepairBench.alt,
          width: IMAGES.laptopHardware.laptopOpenRepairBench.width,
          height: IMAGES.laptopHardware.laptopOpenRepairBench.height,
          placement: 'process',
          caption: 'Laptop opened on the repair bench during diagnostic and reassembly work.'
        },
        {
          src: '/images/lenovo-laptop-battery-fan-heatsink-open.webp',
          alt: 'Lenovo laptop opened for battery, fan and heatsink inspection',
          width: 1000,
          height: 1000,
          placement: 'process',
          caption: 'Lenovo internal hardware inspection covering battery, cooling and motherboard access.'
        }
      ],
      seo: { 
        title: 'Laptop Repair Kuwait | Free Pickup, From 15 KWD | KCROC', 
        description: 'Laptop repair in Kuwait from 15 KWD. Screen, battery, charging, overheating and motherboard faults diagnosed at our Hawalli lab. Free pickup, clear quote before repair and 30-day warranty.', 
        canonicalUrl: 'https://www.computerrepairkuwait.com/laptop-repair-kuwait', locale: 'en_KW', alternates: { 'en-KW': 'https://www.computerrepairkuwait.com/laptop-repair-kuwait', 'ar-KW': 'https://www.computerrepairkuwait.com/ar/laptop-repair-kuwait', 'x-default': 'https://www.computerrepairkuwait.com/laptop-repair-kuwait' }, 
        ogType: 'article', 
        schemaTypes: ['Service', 'FAQPage'],
        lastModified: '2026-10-10T00:00:00+03:00'
      },
      navigationPriority: 90, 
      isFeatured: true, 
      popular: true
    } as ServiceEntity,
    
    'srv-desktop-pc': {
      id: 'srv-desktop-pc',
      slug: 'desktop-pc-repair-kuwait',
      entityType: 'Service',
      isActive: true,
      title: 'Desktop & PC Repair Kuwait',
      iconKey: 'monitor',
      shortDescription: 'Desktop and PC repair in Kuwait for no power, crashes, blue screens, overheating, storage faults, display problems, upgrades and motherboard issues.',
      description: 'Desktop PC repair in Kuwait for home computers, office desktops, workstations, pre-built towers and custom PCs. KCROC diagnoses the actual hardware or software fault before recommending a replacement. We handle power failures, no display, Windows boot problems, blue screens, overheating, fan faults, storage and SSD issues, RAM instability, motherboard faults, PSU-related shutdowns and hardware upgrades. Where a component-level repair is technically practical, we repair the failed stage instead of defaulting to a full motherboard or system replacement. Free pickup and delivery are available across Kuwait, with repair completed at the Hawalli laboratory.',
      idealCustomer: 'Home users, office users, professionals and PC owners with a desktop that will not power on, crashes, overheats, loses display, runs slowly or needs targeted hardware repair or upgrades.',
      deviceTypes: ['Desktop PCs', 'Custom-Built PCs', 'Pre-Built Towers', 'Office Workstations', 'All-in-One PCs', 'Small-Form-Factor Desktops'],
      repairLevel: 'component-level',
      estimatedTurnaround: '24–48 Hours',
      pricing: { startingFrom: 15, currency: 'KWD', quoteRequired: true, displayLabel: 'From 15 KWD — free diagnostic first' },
      coreFeatures: ['Desktop Power Diagnosis', 'No-Display Diagnosis', 'PSU & Power-Path Testing', 'Motherboard Repair', 'RAM & Storage Diagnostics', 'SSD Upgrade', 'Cooling & Thermal Service', 'Windows Boot Troubleshooting', 'Free Pick & Drop', '30-Day Warranty'],
      brands: ['Dell', 'HP', 'Lenovo', 'ASUS', 'Acer', 'MSI', 'Custom PC Builds'],
      commercialAnswers: [
        { question: 'Do you repair desktop PCs and computer towers in Kuwait?', answer: 'Yes. KCROC repairs home desktops, office PCs, workstations, pre-built towers and custom systems, with pickup and delivery across Kuwait.' },
        { question: 'Can you repair a desktop that has no power?', answer: 'Yes. We separate wall power, PSU, motherboard power delivery, front-panel faults and short-circuit conditions before recommending a replacement.' },
        { question: 'Can you fix a PC that turns on but shows no display?', answer: 'Yes. The diagnosis separates monitor and cable issues from RAM, GPU, BIOS, motherboard and power faults.' },
        { question: 'Do you repair PC motherboards instead of replacing them?', answer: 'When the board is technically repairable, component-level diagnosis can identify failed power components, shorted rails, damaged connectors and other board faults before a complete motherboard replacement is recommended.' },
        { question: 'Do you collect desktop PCs from home in Kuwait?', answer: 'Yes. Free pickup and delivery are available across Kuwait, including full-size desktop towers.' },
        { question: 'How much does desktop PC repair cost in Kuwait?', answer: 'The service starts from 15 KWD for the repair path shown here; complex motherboard, GPU, PSU and liquid-cooling work is quoted after diagnosis.' }
      ],
      symptomLinks: [
        { label: 'PC won’t turn on', path: '/guides/gaming-pc-not-turning-on-kuwait', description: 'Use the power and no-start troubleshooting path before replacing the PSU or motherboard.' },
        { label: 'PC has no display', path: '/guides/gaming-pc-black-screen-no-display-kuwait', description: 'Separate monitor, cable, RAM, GPU, BIOS and motherboard causes.' },
        { label: 'PC shuts down under load', path: '/guides/gaming-pc-random-shutdown-kuwait', description: 'Check thermal protection, PSU output and motherboard power delivery.' },
        { label: 'PC BIOS update failed', path: '/guides/gaming-pc-bios-failed-update-kuwait', description: 'Understand recovery options before clearing firmware or replacing the board.' }
      ],
      process: [
        { step: 1, title: 'Free Pickup', description: 'We collect the desktop or tower from your home or office anywhere in Kuwait.' },
        { step: 2, title: 'Hardware & System Diagnosis', description: 'We test power, display, storage, memory, thermals and relevant board-level circuits based on the symptom.' },
        { step: 3, title: 'Repair Quote', description: 'You receive the confirmed fault and repair price before paid work begins.' },
        { step: 4, title: 'Targeted Repair', description: 'We repair or replace the failed component or subsystem that the diagnosis identifies.' },
        { step: 5, title: 'Stress Test', description: 'The repaired system is tested under representative workload before return.' },
        { step: 6, title: 'Return with Warranty', description: 'The desktop is returned with KCROC’s 30-day parts and labour warranty.' }
      ],
      faqs: [
        { id: 'desktop-pc-faq-1', title: 'Do you repair desktop computers as well as laptops?', answer: 'Yes. KCROC repairs desktop PCs, towers, workstations and custom systems as well as laptops and MacBooks.' },
        { id: 'desktop-pc-faq-2', title: 'Can you diagnose a PC that powers on but does not boot?', answer: 'Yes. We separate POST, BIOS, RAM, storage, GPU and operating-system failures so the repair is based on evidence rather than the symptom alone.' },
        { id: 'desktop-pc-faq-3', title: 'Do you repair PSU-related PC shutdowns?', answer: 'Yes. PSU output and the motherboard power path can be tested when a desktop shuts down or restarts under load.' },
        { id: 'desktop-pc-faq-4', title: 'Can you upgrade a slow desktop with an SSD or RAM?', answer: 'Yes. We can assess the existing system and recommend compatible SSD or RAM upgrades where they provide a practical improvement.' },
        { id: 'desktop-pc-faq-5', title: 'Do you repair custom gaming desktops?', answer: 'Yes. Custom gaming systems are covered, including GPU, cooling, PSU, motherboard and stability problems. For specialist gaming faults, the Gaming PC Repair Kuwait service provides the deeper diagnostic path.' }
      ],
      whyChooseUs: [
        { title: 'Diagnosis Before Replacement', description: 'We identify the failed subsystem before recommending a motherboard, GPU, PSU or storage replacement.' },
        { title: 'Component-Level Capability', description: 'Where technically practical, board-level faults can be repaired instead of automatically replacing the entire board.' },
        { title: 'Large-System Pickup', description: 'You do not need to transport a heavy desktop tower yourself; pickup and delivery are available across Kuwait.' },
        { title: 'Kuwait Heat & Dust Awareness', description: 'Cooling, dust buildup and sustained summer heat are considered when diagnosing desktop stability and thermal problems.' }
      ],
      commonIssues: [
        { id: 'desktop-no-power', title: 'Desktop Has No Power', severity: 'critical', description: 'No fans, LEDs or response can come from PSU, motherboard power delivery, cabling or a short condition.' },
        { id: 'desktop-no-display', title: 'Desktop Turns On but No Display', severity: 'high', description: 'The cause can involve RAM, GPU, monitor path, BIOS or motherboard faults and should be separated systematically.' },
        { id: 'desktop-overheating', title: 'Desktop Overheats or Becomes Unstable', severity: 'high', description: 'Dust, failed fans, poor thermal contact, blocked airflow or component faults can cause throttling and shutdowns.' },
        { id: 'desktop-slow', title: 'Desktop Is Very Slow', severity: 'medium', description: 'Storage health, RAM, Windows load, background processes and thermal behaviour should be checked before assuming the CPU needs replacement.' }
      ],
      relatedServiceIds: ['srv-laptop', 'srv-gaming', 'srv-motherboard', 'srv-charging-port'],
      relatedProblemIds: ['problem-no-power', 'problem-black-screen', 'problem-overheating', 'problem-freezing-crashing'],
      relatedBrandIds: ['brand-dell', 'brand-hp', 'brand-lenovo', 'brand-asus', 'brand-acer', 'brand-msi'],
      relatedResourcePaths: [
        { label: 'Gaming PC Repair Kuwait', path: '/gaming-pc-repair-kuwait' },
        { label: 'Motherboard Repair Kuwait', path: '/motherboard-repair-kuwait' },
        { label: 'SSD & RAM Upgrade Kuwait', path: '/ssd-ram-upgrade-kuwait' },
        { label: 'Gaming PC No-Power Guide', path: '/guides/gaming-pc-not-turning-on-kuwait' }
      ],
      relatedLocationIds: ['loc-hawalli', 'loc-salmiya', 'loc-kuwait-city', 'loc-farwaniya', 'loc-jahra'],
      technicalOverview: {
        heading: 'Desktop PC repair in Kuwait: test the system layer by layer',
        paragraphs: [
          'A desktop that is dead, unstable or slow can have a fault in the power path, motherboard, memory, graphics card, storage, cooling system or Windows installation. Replacing the most expensive part first is rarely a reliable diagnostic method.',
          'KCROC starts with the symptom and builds an evidence trail: power behaviour, POST status, display output, memory stability, storage health, temperatures and component-level measurements where appropriate. This keeps the quote tied to the actual failure.',
          'For custom gaming towers, the specialist Gaming PC Repair Kuwait service adds GPU, VRAM, BIOS/VBIOS, sustained-load and thermal diagnostics.'
        ]
      },
      repairDecision: {
        heading: 'Repair or replace a desktop component?',
        items: [
          { condition: 'The PC is completely dead.', action: 'Test the incoming power path, PSU and motherboard rails before buying a replacement motherboard.' },
          { condition: 'Fans spin but there is no display.', action: 'Check RAM, GPU, display path and POST/BIOS behaviour before replacing graphics hardware.' },
          { condition: 'The PC shuts down during demanding workloads.', action: 'Test temperatures, PSU behaviour, cooling and motherboard power delivery under controlled load.' },
          { condition: 'The PC is slow but otherwise stable.', action: 'Check storage health, RAM pressure and Windows startup load before recommending a platform replacement.' }
        ]
      },
      inspectionChecklist: ['Verify power and PSU behaviour', 'Check POST/BIOS status', 'Test RAM and memory stability', 'Check GPU and display path', 'Inspect storage health', 'Measure temperatures and cooling performance', 'Stress-test after repair'],
      performanceOutcomes: { disclaimer: 'Results depend on the confirmed fault, hardware configuration and condition of the system.', items: [
        { metric: 'Power stability', outcome: 'Verified after repair under repeated startup and representative load conditions.' },
        { metric: 'Thermal behaviour', outcome: 'Checked after cooling or component work before return.' },
        { metric: 'System stability', outcome: 'Stress-tested after the confirmed fault is repaired.' }
      ] },
      warranty: { duration: '30 Days', coverage: 'Parts and labour for the completed desktop PC repair', noFixNoFee: true },
      seo: { title: 'Desktop & PC Repair Kuwait | Free Pickup | KCROC', description: 'Desktop and PC repair in Kuwait for no power, no display, crashes, overheating, PSU, motherboard, storage and upgrades. Free pickup, diagnosis first and 30-day warranty.', canonicalUrl: 'https://www.computerrepairkuwait.com/desktop-pc-repair-kuwait', locale: 'en_KW', alternates: { 'en-KW': 'https://www.computerrepairkuwait.com/desktop-pc-repair-kuwait', 'x-default': 'https://www.computerrepairkuwait.com/desktop-pc-repair-kuwait' }, ogType: 'article', schemaTypes: ['Service', 'FAQPage'], lastModified: '2026-10-05T00:00:00+03:00' },
      navigationPriority: 78,
      isFeatured: true,
      popular: false
    } as ServiceEntity,

    'srv-gaming': { 
      id: 'srv-gaming', 
      slug: 'gaming-pc-repair-kuwait', 
      entityType: 'Service', 
      isActive: true, 
      title: 'Gaming PC Repair Kuwait', 
      iconKey: 'gaming', 
      shortDescription: 'Gaming computer, GPU and performance repair in Kuwait for no power, black screen, GPU artifacts, FPS drops, overheating, crashes, shutdowns and cooling faults.', 
      description: 'Gaming PC repair in Kuwait for FPS drops, overheating, crashes, black screen, GPU artifacts and no-power faults. KCROC diagnoses the failure before recommending an expensive part swap. We use thermal imaging, controlled load testing and component-level diagnostics for custom desktops, pre-built gaming PCs, standalone GPUs, liquid-cooled systems and high-performance rigs. We service NVIDIA GeForce RTX and AMD Radeon systems, Ryzen and Intel builds, and major gaming-PC families. Where technically repairable, we repair the failed stage instead of defaulting to a full motherboard or GPU replacement. Free pickup and delivery are available across Kuwait, with a 30-day repair warranty.', 
      idealCustomer: 'Gaming PC owners, esports players, streamers, content creators, PC builders and professionals who need a real hardware diagnosis for power, display, GPU, FPS, cooling or stability problems.',
      symptomLinks: [
        { label: 'Gaming PC won’t turn on', path: '/guides/gaming-pc-not-turning-on-kuwait', description: 'No power, intermittent startup, dead tower or a PC that clicks on then shuts back off.' },
        { label: 'Gaming PC has no display', path: '/guides/gaming-pc-black-screen-no-display-kuwait', description: 'Fans and RGB work but the monitor stays black or reports no signal.' },
        { label: 'GPU artifacting / black screen', path: '/guides/gaming-gpu-artifacts-repair-kuwait', description: 'Colored blocks, flickering textures, driver resets or black screens under GPU load.' },
        { label: 'Gaming PC shuts down while gaming', path: '/guides/gaming-pc-random-shutdown-kuwait', description: 'Instant power loss or restarts during demanding games and stress tests.' },
        { label: 'BIOS update failed / no POST', path: '/guides/gaming-pc-bios-failed-update-kuwait', description: 'The system stopped booting or displaying after a BIOS/UEFI update.' },
      ],
      deviceTypes: [
        'Custom Desktop Builds', 
        'Pre-Built Gaming PCs (Alienware, OMEN)', 
        'High-End Gaming Laptops', 
        'Standalone GPUs (RTX / Radeon RX series)',
        'Streaming & Content Creation Workstations',
        'Liquid-Cooled Custom Loop Systems'
      ],
      commercialAnswers: [
        { question: 'Do you repair gaming computers and desktop towers in Kuwait?', answer: 'Yes. The service covers custom-built gaming PCs, pre-built towers, standalone GPUs and high-performance systems. Kuwait-wide pickup and delivery are available, including full-size desktop towers.' },
        { question: 'Can you fix a gaming PC with no display or a black screen?', answer: 'Yes. We separate monitor/cable issues from GPU, VRAM, motherboard, BIOS and power faults, then test the actual failure before quoting repair.' },
        { question: 'Can you repair GPU artifacting instead of replacing the graphics card?', answer: 'When the card is technically repairable, the diagnosis can include VRAM, GPU power delivery, board-level faults and solder-related failures before a replacement card is recommended.' },
        { question: 'Can you fix a gaming PC that keeps shutting down while gaming?', answer: 'Yes. We test thermal protection, PSU output, motherboard power stages, cooling and sustained-load stability so the cause is not guessed from the symptom alone.' },
        { question: 'Do you repair gaming PCs in Salmiya, Hawalli, Farwaniya and other Kuwait areas?', answer: 'Yes. KCROC collects and returns gaming PCs and other computers across Kuwait, so customers do not need to transport a large tower to the Hawalli laboratory themselves.' },

        { question: 'Can you repair a gaming PC instead of replacing the GPU or motherboard?', answer: 'That depends on the fault. KCROC diagnoses the GPU, power delivery, cooling and board-level circuits first, then explains whether component repair or replacement is appropriate.' },
        { question: 'How much does gaming PC repair cost in Kuwait?', answer: 'Gaming PC repair starts from 25 KWD for the service-level diagnosis/repair path shown on this page; complex GPU, motherboard and cooling work is quoted after diagnosis.' },
        { question: 'How long does gaming PC repair take?', answer: 'Typical specialist work is around 24–48 hours when the required parts are available. Complex board-level faults or parts orders may require more time.' },
        { question: 'Do you collect gaming PCs and towers from my area?', answer: 'Yes. Pickup and delivery are available Kuwait-wide, including large desktop systems, so you do not need to transport the tower to the Hawalli lab yourself.' },
        { question: 'Do you repair GPU, VRAM, VRM and BIOS/VBIOS faults?', answer: 'Yes. The service covers GPU and VRAM diagnosis, motherboard power-stage faults, and BIOS/VBIOS recovery where the hardware is technically repairable.' },
        { question: 'Can you diagnose FPS drops and overheating?', answer: 'Yes. The diagnostic path can include GPU/CPU temperatures, hotspot behaviour, fan or pump response, power delivery, memory stability and controlled load testing.' },
        { question: 'Which gaming brands do you work on?', answer: 'The service covers custom builds and major gaming hardware families including ASUS ROG, Alienware, MSI, Lenovo Legion, Razer, Gigabyte Aorus and NZXT systems.' },
        { question: 'Is my data touched during gaming PC repair?', answer: 'For GPU, motherboard and cooling work, the storage drive is normally not the repair target. Backups are still recommended before any hardware service.' },
      ],
      repairLevel: 'chip-level', 
      estimatedTurnaround: '24-48 Hours', 
      pricing: { 
        startingFrom: 25, 
        currency: 'KWD', 
        quoteRequired: true, 
        displayLabel: 'From 25 KWD — Free Diagnostic First' 
      }, 
      technicalOverview: {
        heading: 'Gaming PC repair in Kuwait: diagnose the fault before replacing expensive hardware',
        paragraphs: [
          'Gaming systems combine high power draw, dense cooling hardware and sustained load, so the same symptom can come from very different causes. FPS drops can be thermal throttling, a failing fan, unstable memory, a GPU fault, power delivery or software; random shutdowns can point to thermal protection or a power-stage problem.',
          'KCROC checks the system under the workload that exposes the fault. Depending on the device, this can include GPU and CPU temperatures, hotspot behaviour, fan response, power delivery, memory stability, storage health and firmware settings. The objective is to identify the failed layer before recommending a replacement GPU, motherboard or cooling assembly.',
          'For liquid cooling, thermal interface service or board-level GPU/motherboard faults, the quote follows the actual diagnosis. Free pickup and delivery are part of the Kuwait-wide service path, so gaming desktops and laptops do not need to be transported by the customer personally.'
        ]
      },
      repairDecision: {
        heading: 'What should be repaired first on a gaming PC?',
        items: [
          { condition: 'Temperatures rise quickly and performance falls during a sustained game.', action: 'Check dust, fan response, thermal interfaces and throttling before blaming the GPU.' },
          { condition: 'Screen artifacts, crashes or driver resets appear under GPU load.', action: 'Test the GPU, VRAM behaviour, power delivery and system stability before buying a replacement card.' },
          { condition: 'The PC or gaming laptop shuts down suddenly.', action: 'Separate thermal protection, PSU/power-stage faults and motherboard issues with controlled load testing.' },
          { condition: 'AIO or custom-loop temperatures rise unexpectedly.', action: 'Inspect pump/fan operation, coolant flow indicators where available, radiator condition and mounting.' },
          { condition: 'The motherboard has a localized power or VRM fault.', action: 'Assess component-level repair before defaulting to a full motherboard replacement.' }
        ]
      },
      relatedServiceIds: ['srv-gaming', 'srv-gaming-laptop', 'srv-gaming-laptop-cleaning', 'srv-motherboard', 'srv-laptop'],
      relatedProblemIds: ['problem-overheating', 'problem-freezing-crashing', 'problem-no-power', 'problem-black-screen'],
      relatedBrandIds: ['brand-asus', 'brand-msi', 'brand-lenovo', 'brand-dell', 'brand-hp', 'brand-acer'],
      relatedLocationIds: ['loc-hawalli', 'loc-salmiya', 'loc-kuwait-city', 'loc-farwaniya', 'loc-jahra', 'loc-ahmadi', 'loc-fahaheel', 'loc-mangaf', 'loc-abu-halifa', 'loc-jabriya', 'loc-mubarak-al-kabeer', 'loc-fintas', 'loc-sabah-al-salem'],
      relatedResourcePaths: [
        { label: 'Gaming PC Cooling Guide', path: '/blog/gaming-pc-cooling' },
        { label: 'Gaming PC Won’t Turn On? Diagnosis Guide', path: '/guides/gaming-pc-not-turning-on-kuwait' },
        { label: 'Gaming PC Black Screen / No Display Guide', path: '/guides/gaming-pc-black-screen-no-display-kuwait' },
        { label: 'GPU Artifacting & Black Screen Guide', path: '/guides/gaming-gpu-artifacts-repair-kuwait' },
        { label: 'Gaming PC Random Shutdown Guide', path: '/guides/gaming-pc-random-shutdown-kuwait' },
        { label: 'Failed Gaming PC BIOS Update Guide', path: '/guides/gaming-pc-bios-failed-update-kuwait' },
        { label: 'BIOS / UEFI Recovery Guide', path: '/guides/bios-uefi-recovery-kuwait' },
      ],
      relatedCaseStudyPath: { label: 'ASUS ROG Dead Motherboard Case Study — Hawalli', path: '/case-studies/asus-rog-dead-motherboard-hawalli' },
      coreFeatures: [
        'GPU Chip-Level & VRAM Repair',
        'Liquid Metal & Phase-Change Thermal Overhauls',
        'Custom Loop & AIO Cooler Diagnostics',
        'Motherboard Power Stage & VRM Restoration',
        'BIOS, VBIOS & Fan Curve Tuning',
        'Multi-Hour FPS & Stability Benchmarking'
      ], 
      brands: ['ASUS ROG', 'Alienware', 'MSI', 'Corsair', 'Lenovo Legion', 'Razer', 'Gigabyte Aorus', 'NZXT'], 

      whyChooseUs: [
        { title: 'Chip-Level Motherboard Repair', description: 'We trace and replace individual failed components — a MOSFET, a capacitor, a power stage — instead of writing off the whole board.' },
        { title: 'GPU VRAM & Chip-Level Repair', description: 'Failing VRAM modules and degraded solder joints beneath the GPU die are diagnosed and repaired directly whenever possible, rather than defaulting to a full card replacement.' },
        { title: 'BGA Micro-Soldering', description: 'We perform ball-grid-array rework on GPU and CPU packages under magnification with controlled reflow temperatures.' },
        { title: 'Thermal Imaging Diagnostics', description: 'We use thermal cameras during stress testing to identify exactly which component is overheating, instead of guessing from symptoms alone.' },
        { title: 'ESD-Safe Laboratory', description: 'All work is completed on grounded, static-controlled workstations in our Hawalli lab to protect sensitive GPU and motherboard components.' },
        { title: 'Premium Thermal Materials', description: 'We use branded liquid metal and phase-change thermal materials designed for sustained high-temperature performance, not generic paste.' },
        { title: 'Advanced BIOS & VBIOS Recovery', description: 'Corrupted BIOS or VBIOS firmware from a failed update or power interruption can often be reflashed directly, avoiding a full board or card replacement.' },
        { title: 'Free Pickup & Delivery, Kuwait-Wide', description: 'We collect and return full towers, gaming desktops, and other large systems anywhere in Kuwait at no extra cost.' },
        { title: 'No Fix, No Fee', description: 'If we cannot repair it after diagnosis, you do not pay — not even for the diagnostic.' },
        { title: 'Transparent Diagnostics', description: 'You receive a written explanation of the fault and an itemized quote before any repair work begins.' }
      ],

      commonIssues: [
        { 
          id: 'vrm-thermal-throttling', 
          title: 'Severe FPS Drops & Thermal Throttling', 
          severity: 'high', 
          description: 'Your frame rate tanks mid-session even though nothing in your setup changed — the system is protecting itself from heat by cutting clock speeds. Kuwait\'s ambient heat causes factory thermal paste to "pump out" or dry entirely, trapping heat on the CPU/GPU die and forcing the system to aggressively drop clock speeds. We perform deep chemical extraction and liquid metal upgrades to restore sustained boost clocks.' 
        },
        { 
          id: 'gpu-artifacting', 
          title: 'Screen Artifacting or Black Screens Under Load', 
          severity: 'critical', 
          description: 'Colored blocks, flickering textures, or a black screen show up specifically during demanding games, then clear up when you stop. Often misdiagnosed as a "dead GPU." Artifacting under heavy load — including on RTX and RX cards — is typically caused by failing VRAM modules or degraded solder balls beneath the GPU chip. We use thermal imaging and BGA rework to restore the card rather than replacing it.' 
        },
        { 
          id: 'aio-pump-failure', 
          title: 'AIO Water Cooler Pump Failure & Micro-Leaks', 
          severity: 'high', 
          description: 'Your CPU temperature spikes to dangerous levels the moment you boot, or you notice a rattling or gurgling sound from the cooler. Caused by coolant degradation, micro-blockages in the copper cold plate, or pump motor burnout. We service custom loops, clear blockages, and replace failing AIO units.' 
        },
        { 
          id: 'power-stage-short', 
          title: 'Motherboard VRM / Power Stage Failure', 
          severity: 'critical', 
          description: 'The PC shuts off suddenly mid-game and won\'t reboot for a while, sometimes with a faint burning smell. High-draw components like RTX 4090/5090-class cards or Ryzen/i9 processors can blow motherboard power stages. We micro-solder replacement MOSFETs to save the board.' 
        },
        {
          id: 'cpu-overheating',
          title: 'CPU Overheating Independent of GPU Load',
          severity: 'high',
          description: 'CPU temperatures climb well above normal even in light games. The likely causes are degraded thermal paste, a failing cooler pump, or poor case airflow starving the CPU cooler specifically — we identify the exact bottleneck and restore the cooling path.'
        },
        {
          id: 'random-shutdown-psu',
          title: 'Random Shutdowns Under Load (PSU Instability)',
          severity: 'critical',
          description: 'Instant power-off during demanding scenes, never at idle. Often a power supply that can no longer deliver clean, stable power at Kuwait\'s higher ambient temperatures — we load-test the PSU under real gaming conditions, not just at idle.'
        },
        {
          id: 'no-display-boot',
          title: 'No Display / Black Screen After Boot',
          severity: 'critical',
          description: 'Fans spin and lights come on, but nothing reaches the monitor. Common causes include a dislodged GPU, failed VRAM, a blown motherboard fuse, or a corrupted BIOS — we isolate which with boardview diagnostics before quoting.'
        },
        {
          id: 'driver-crash-tdr',
          title: 'Driver Crashes & TDR (Timeout Detection Recovery) Errors',
          severity: 'medium',
          description: 'The screen goes black and recovers with a "display driver stopped responding" message. It can look like a software issue, but recurring TDR under load specifically often points to a genuine hardware fault we can isolate with sustained stress testing.'
        },
        {
          id: 'coil-whine',
          title: 'Coil Whine Diagnosis',
          severity: 'low',
          description: 'A high-pitched whine that changes with FPS can be a normal (if annoying) characteristic of power delivery, or a sign of failing VRM components. We load-test to tell the difference before recommending any repair.'
        },
        {
          id: 'rgb-fan-controller',
          title: 'RGB & Fan Controller Failures',
          severity: 'low',
          description: 'Lighting or fan curves stop responding to software control, sometimes with fans stuck at full speed. Usually a failed controller hub or a firmware fault we can reset, reflash, or replace.'
        },
        {
          id: 'custom-loop-maintenance',
          title: 'Custom Loop & Water Cooler Maintenance',
          severity: 'medium',
          description: 'Temperatures slowly rise over time even though usage hasn\'t changed, usually from mineral buildup or biological growth restricting coolant flow. We flush, clean, and refill loops with distilled, biocide-treated coolant.'
        },
        {
          id: 'bios-corruption',
          title: 'BIOS Corruption / Failed Firmware Update',
          severity: 'critical',
          description: 'The system fails to POST after a bad BIOS update or power interruption, with no display and no diagnostic beep pattern. A simple CMOS reset may not be enough — we reflash the BIOS chip directly using an external programmer.'
        },
        {
          id: 'overclock-instability',
          title: 'Overclock Instability',
          severity: 'medium',
          description: 'Crashes or blue screens happen only after enabling an overclock or XMP/EXPO profile. The issue may be unstable settings, insufficient cooling, or weak silicon — we validate stability under real load and identify the actual cause.'
        },
        {
          id: 'ssd-thermal-throttle',
          title: 'SSD/NVMe Overheating & Throttling',
          severity: 'low',
          description: 'Load times drop or games stutter during texture streaming, which can trace back to an NVMe drive throttling from heat — especially common in cramped custom builds without a heatsink over the drive.'
        }
      ], 

      process: [
        { step: 1, title: 'Free Secure Pickup', description: 'We collect your gaming rig from your home or office anywhere in Kuwait, then tag and log it for secure, full chain-of-custody handling.' },
        { step: 2, title: 'Stress Test & Thermal Imaging', description: 'Your system is tested under real gaming benchmarks and synthetic load tests while we monitor CPU, GPU, VRM, and memory temperatures with thermal cameras to isolate the exact bottleneck.' },
        { step: 3, title: 'Precision Laboratory Repair', description: 'Repairs are completed in our ESD-compliant Hawalli lab using BGA micro-soldering, thermal service, firmware recovery, and other precision methods with genuine thermal compounds and controlled reflow.' },
        { step: 4, title: 'Extended Verification & Return', description: 'We re-run FPS consistency checks, thermal equilibrium testing, and power delivery validation — commonly a 6-hour gaming stability test for thermal-related repairs — before returning the system to you.' }
      ],

      performanceOutcomes: {
        disclaimer: 'The figures below are representative outcomes for these repair categories based on typical before/after results, not a specific customer\'s guaranteed result — every repair is quoted after its own diagnostic.',
        items: [
          { metric: 'CPU Temperatures', outcome: 'Often drop from 95-98°C under sustained load to around 70-75°C after a full re-paste and cooler service.' },
          { metric: 'GPU Hotspot Temperature', outcome: 'Hotspot-to-edge temperature delta can often be reduced by 15-25°C after a liquid metal replacement on supported models.' },
          { metric: 'Sustained Gaming Sessions', outcome: 'Systems that previously throttled or shut down within 20-30 minutes often remain stable through 6+ hour sessions after repair.' },
          { metric: 'Thermal Throttling', outcome: 'Eliminated in most cases where the root cause is degraded thermal material or blocked airflow rather than a failing component.' },
          { metric: 'Fan & Pump Noise', outcome: 'Noticeably reduced once dust-clogged fans are cleaned and worn AIO pumps or bearings are replaced.' }
        ]
      },

      repairExamples: {
        disclaimer: 'These are representative repair scenarios illustrating common fault categories we service, not records of a specific named customer.',
        items: [
          {
            id: 'gpu-vram-repair',
            title: 'GPU: Failed VRAM Modules Under Load',
            symptoms: 'Game crashes and driver TDR resets happen under heavy VRAM load — high-resolution textures or ray tracing — while lighter workloads seem fine.',
            diagnosis: 'Load testing isolates the fault to memory modules that fail under sustained thermal stress, supported by thermal imaging showing a localized hotspot.',
            repair: 'The affected VRAM modules were reworked via BGA micro-soldering and replaced with matched-spec components.',
            outcome: 'The card passes extended stress testing with no artifacting or driver resets across multiple sessions.'
          },
          {
            id: 'laptop-liquid-metal',
            title: 'Gaming Laptop: Liquid Metal Degradation',
            symptoms: 'CPU and GPU temperatures climb 15-20°C above the laptop\'s original benchmarks within a year, with loud fan ramp-up even under light use.',
            diagnosis: 'The factory liquid metal interface has partially migrated away from the die ("pump-out"), a known failure mode in high-wattage laptop chips under repeated heat cycling.',
            repair: 'Full disassembly, careful cleaning of the old liquid metal with proper containment, and reapplication with a conformal barrier to prevent recurrence.',
            outcome: 'Temperatures return close to factory benchmark levels under sustained load.'
          },
          {
            id: 'motherboard-vrm-rebuild',
            title: 'Custom Build: Motherboard VRM Failure',
            symptoms: 'The system powers off abruptly under load and may not reboot for several minutes.',
            diagnosis: 'Thermal imaging identifies an overheating VRM phase, and multimeter testing confirms a degraded MOSFET no longer regulating power cleanly to the CPU.',
            repair: 'The failed MOSFET was replaced via micro-soldering and VRM heatsink contact was restored with fresh thermal pads.',
            outcome: 'The system holds stable under multi-hour stress testing with normal VRM temperatures.'
          },
          {
            id: 'custom-loop-blockage',
            title: 'Custom Loop: Blocked Coolant Pathway',
            symptoms: 'CPU temperatures rise gradually over months despite no change in usage, eventually reaching thermal throttling under load.',
            diagnosis: 'Inspection reveals mineral buildup and biological growth restricting flow through the radiator and CPU block, common with non-distilled coolant over time.',
            repair: 'Full loop flush, radiator and block cleaning, coolant replacement with a distilled, biocide-treated fluid, and a leak test before refill.',
            outcome: 'Flow rate and CPU temperatures return to expected levels after service.'
          },
          {
            id: 'bios-recovery',
            title: 'Motherboard: Corrupted BIOS After Failed Update',
            symptoms: 'The system fails to POST after an interrupted BIOS update and shows no display output or diagnostic beep pattern.',
            diagnosis: 'The BIOS chip is confirmed corrupted through direct programmer readout rather than a simple CMOS reset issue.',
            repair: 'The BIOS chip was reflashed directly using an external programmer with the correct firmware version for the board revision.',
            outcome: 'The system POSTs normally again and retains BIOS settings without further instability.'
          }
        ]
      },

      inspectionChecklist: [
        'CPU core & package temperatures under load',
        'GPU core and hotspot temperatures',
        'VRAM temperature and stability under load',
        'Storage (SSD/NVMe) thermal behavior',
        'Memory (RAM) stability testing',
        'Motherboard voltage rails',
        'VRM temperatures under sustained load',
        'Power supply output stability',
        'Cooling system airflow and efficiency',
        'Fan and pump operation',
        'BIOS configuration and firmware version',
        'Multi-hour stress testing and gaming benchmarks',
        'Thermal imaging scan of the full board',
        'Dust and particulate contamination',
        'Internal cable and connector integrity'
      ],

      faqs: [
        {
          id: 'faq-gpu-repair',
          title: 'Can you repair a GPU that another shop or the manufacturer declared beyond repair?',
          answer: 'In many cases, yes. "Beyond repair" from a shop that only knows how to swap whole cards usually means beyond THEIR repair — our Hawalli lab repairs individual components, including blown fuses, shorted capacitors, damaged VRMs, and failing VRAM, at a fraction of replacement cost. We only turn a card away after our own diagnostic confirms the damage is genuinely uneconomical to fix.'
        },
        {
          id: 'faq-vram-replace',
          title: 'Can VRAM actually be replaced, or does the whole GPU need to go?',
          answer: 'VRAM can often be replaced via BGA micro-soldering when the board and GPU die itself are still undamaged. We confirm this with thermal imaging and load testing before quoting, so you know whether a VRAM-level repair is realistic for your specific card.'
        },
        {
          id: 'faq-repair-vs-replace',
          title: 'Should I repair my graphics card or just replace it?',
          answer: 'It depends on the fault, the card\'s age and value, and repair cost. For most VRM, VRAM, and thermal-related faults on mid-to-high-end cards, component-level repair costs a fraction of a replacement and restores original performance. We diagnose first and give you both the repair quote and an honest opinion on whether replacement makes more financial sense.'
        },
        {
          id: 'faq-liquid-metal',
          title: 'Is Liquid Metal safe for my gaming laptop?',
          answer: 'When applied by experienced technicians on supported hardware, yes. We use conformal barriers to isolate the liquid metal strictly to the CPU/GPU die, preventing electrical shorts while typically dropping peak temperatures by 15°C or more compared to standard paste.'
        },
        {
          id: 'faq-liquid-metal-motherboard',
          title: 'Can liquid metal damage a motherboard if it leaks or migrates?',
          answer: 'It can, if applied incorrectly or on a device not suited for it — liquid metal is electrically conductive and will short exposed components if it spreads beyond the die. This is exactly why controlled application, conformal coating, and proper inspection matter, and why we don\'t recommend DIY liquid metal application on tightly packed laptop boards.'
        },
        {
          id: 'faq-custom-loop',
          title: 'Do you repair custom water cooling loops?',
          answer: 'Yes. We service and maintain custom loops and AIO systems — flushing blocked radiators and blocks, replacing worn pump motors, fixing leaks, and refilling with distilled, biocide-treated coolant to prevent the mineral and biological buildup that causes gradual temperature creep.'
        },
        {
          id: 'faq-overheat-damage',
          title: 'Can sustained overheating cause permanent GPU damage?',
          answer: 'Yes, over time. Prolonged overheating accelerates solder joint fatigue and can degrade VRAM and VRM components permanently, which is why we recommend addressing thermal throttling early rather than treating it as a background annoyance — the earlier a system is inspected, the better the chance of a successful repair.'
        },
        {
          id: 'faq-gaming-laptops-repair',
          title: 'Do you repair gaming laptops, or only desktop PCs?',
          answer: 'Both. Gaming laptop repair — including ASUS ROG, MSI, Alienware, Legion, and Razer models — is one of our core services, alongside custom desktop builds, pre-built towers, and standalone GPU repair.'
        },
        {
          id: 'faq-service-frequency',
          title: 'How often should a gaming PC be serviced in Kuwait\'s climate?',
          answer: 'It depends on how dusty the environment is and how hard the system runs, but as a general guideline, a thermal service (dust removal, fresh thermal paste or liquid metal, fan/pump inspection) every 12-18 months is reasonable in Kuwait\'s heat and dust — noticeably more often than the 2-3 years typically recommended in cooler climates.'
        },
        {
          id: 'faq-bios-corruption',
          title: 'Do you fix BIOS corruption or a failed firmware update?',
          answer: 'Yes. Where a simple CMOS reset doesn\'t recover the board, we reflash the BIOS chip directly using an external programmer, which resolves the large majority of failed-update and corruption cases without replacing the motherboard.'
        },
        {
          id: 'faq-overclock-recovery',
          title: 'Can you recover a system that\'s unstable after overclocking?',
          answer: 'Yes. We test whether the instability is caused by unstable settings, insufficient cooling, memory tuning, or hardware weakness, then reset to stable defaults and run stability testing under real load to confirm the fix.'
        },
        {
          id: 'faq-data-safety-gaming',
          title: 'Will my saved games, settings, and files stay safe during repair?',
          answer: 'For GPU, motherboard, and cooling repairs, your storage drive is untouched — we work on the hardware, not your data. We still recommend backing up important files whenever possible before any repair, and for laptop repairs specifically, you\'re welcome to remove your drive before handing the device over for extra peace of mind.'
        }
      ],

      contentImages: [
        { src: IMAGES.gaming.rgbLighting.src, alt: IMAGES.gaming.rgbLighting.alt, width: IMAGES.gaming.rgbLighting.width, height: IMAGES.gaming.rgbLighting.height, placement: 'commonIssues', caption: 'A high-performance custom gaming PC representative of the systems we diagnose and repair.' },
        { src: IMAGES.gaming.diagnostics.src, alt: IMAGES.gaming.diagnostics.alt, width: IMAGES.gaming.diagnostics.width, height: IMAGES.gaming.diagnostics.height, placement: 'coreFeatures', caption: 'Gaming PC teardown and diagnostics at the workbench to isolate hardware faults.' },
        { src: IMAGES.gaming.zotacCard.src, alt: IMAGES.gaming.zotacCard.alt, width: IMAGES.gaming.zotacCard.width, height: IMAGES.gaming.zotacCard.height, placement: 'process', caption: 'GPU handling and component inspection during gaming PC diagnosis and repair.' }
      ],
      warranty: { 
        duration: '30 Days', 
        coverage: 'Covers all replaced components, thermal applications, and micro-soldering labor.', 
        noFixNoFee: true 
      }, 
      seo: { 
        title: 'Gaming PC Repair Kuwait | GPU, FPS & Overheating Fix | KCROC', 
        description: 'Gaming PC and gaming computer repair in Kuwait for no power, black screen, GPU artifacts, FPS drops, overheating, crashes, PSU and cooling faults. Free pickup.', 
        canonicalUrl: 'https://www.computerrepairkuwait.com/gaming-pc-repair-kuwait', locale: 'en_KW', alternates: { 'en-KW': 'https://www.computerrepairkuwait.com/gaming-pc-repair-kuwait', 'ar-KW': 'https://www.computerrepairkuwait.com/ar/gaming-pc-repair-kuwait', 'x-default': 'https://www.computerrepairkuwait.com/gaming-pc-repair-kuwait' }, 
        ogType: 'website', 
        schemaTypes: ['Service', 'FAQPage'], lastModified: '2026-10-01T00:00:00+03:00' 
      },
      navigationPriority: 80, 
      isFeatured: true, 
      popular: true
    } as ServiceEntity,

    'srv-gaming-laptop-cleaning': {
      id: 'srv-gaming-laptop-cleaning',
      slug: 'gaming-laptop-cleaning-kuwait',
      entityType: 'Service',
      isActive: true,
      title: 'Gaming Laptop Cleaning & Thermal Repaste Kuwait',
      iconKey: 'gaming',
      shortDescription: 'Professional internal cleaning, thermal-interface service and cooling-system testing for gaming laptops running hot, loud or slower than they used to.',
      description: 'If your gaming laptop is running hotter than it used to, the fans never seem to spool down, or your frame rate falls off during long sessions, the cooling system usually needs professional attention rather than a factory reset. Our gaming laptop thermal service follows a complete workflow — inspect, diagnose, clean, service the thermal interfaces, reassemble and test under load — so thermal paste replacement is only one part of what happens, not the whole plan. Kuwait\'s higher ambient temperatures reduce the thermal headroom available to a laptop during sustained CPU/GPU workloads, and airborne dust can build up inside the cooling system faster than in cooler, drier climates, which is why regular thermal maintenance matters more here than the generic advice most laptops ship with. We work on ASUS ROG and TUF Gaming, Lenovo Legion, MSI, Acer Predator, Alienware, Razer Blade, HP OMEN and Victus, Dell G Series, Gigabyte AORUS and other comparable gaming laptops. Pricing is confirmed after we\'ve seen the model and symptoms — send us a WhatsApp message for a free assessment, and pickup and delivery are free anywhere in Kuwait.',
      idealCustomer: 'Competitive gamers, casual gamers with high-performance laptops, streamers, content creators, developers running GPU-heavy workloads, 3D designers and engineers — essentially anyone whose gaming laptop is starting to run hotter, louder or slower than it used to.',
      deviceTypes: [
        'ASUS ROG & TUF Gaming Laptops',
        'Lenovo Legion Laptops',
        'MSI Gaming Laptops',
        'Acer Predator Laptops',
        'Alienware & Razer Blade Laptops',
        'HP OMEN & Victus Laptops',
        'Dell G Series Laptops',
        'Gigabyte AORUS Laptops'
      ],
      repairLevel: 'thermal-maintenance',
      estimatedTurnaround: '24-48 Hours',
      pricing: { startingFrom: 15, currency: 'KWD', quoteRequired: true, displayLabel: 'From 15 KWD — free diagnostic first' },
      coreFeatures: [
        'Model-Specific Internal Disassembly',
        'Internal Dust Removal from Fans & Airflow Paths',
        'Fan Cleaning, Inspection & Bearing Check',
        'Heatsink & Cooling-Channel Cleaning',
        'Thermal Paste Replacement',
        'Thermal Pad Inspection & Replacement Where Required',
        'Cooling-System & Heat-Pipe Inspection',
        'Post-Service Thermal Testing Under Load'
      ],
      brands: ['ASUS ROG', 'ASUS TUF Gaming', 'Lenovo Legion', 'MSI Gaming', 'Acer Predator', 'Alienware', 'Razer Blade', 'HP OMEN', 'HP Victus', 'Dell G Series', 'Gigabyte AORUS'],

      whyChooseUs: [
        { title: 'Diagnostic-First Approach', description: 'We inspect the cooling system before assuming the fix is thermal paste. If a fan, heatsink or another component is the real cause, we tell you before doing any work.' },
        { title: 'Kuwait Climate Expertise', description: 'We service gaming laptops with Kuwait\'s heat and dust specifically in mind, not a generic cleaning checklist written for a cooler climate.' },
        { title: 'Model-Specific Disassembly', description: 'Every gaming laptop has a different internal layout. We open each model using the correct procedure to avoid damaging clips, ribbon cables and antennas.' },
        { title: 'Thermal Testing, Not Guesswork', description: 'After reassembly, we run the system under load and check CPU/GPU temperatures and behaviour rather than assuming the service worked.' },
        { title: 'Free Pickup & Delivery, Kuwait-Wide', description: 'We collect and return your laptop anywhere in Kuwait at no extra cost.' },
        { title: 'No Fix, No Fee', description: 'If we can\'t safely service your specific laptop, you don\'t pay for the attempt.' },
        { title: 'ESD-Safe Laboratory', description: 'Work is carried out on grounded, static-controlled workstations in our Hawalli lab.' },
        { title: 'Honest Escalation', description: 'If your laptop still runs hot after proper thermal service, we\'ll tell you and point you toward the right deeper diagnostic instead of repeating the same service.' }
      ],

      commonIssues: [
        { id: 'running-hot', title: 'Laptop Running Unusually Hot', severity: 'medium', description: 'The chassis feels noticeably hotter than it used to, especially near the keyboard or underside during gaming — often a sign that heat isn\'t being carried away from the CPU/GPU as efficiently as before.' },
        { id: 'fans-constant', title: 'Fans Constantly Running at High Speed', severity: 'medium', description: 'The cooling fans ramp up quickly and rarely spool back down, even during lighter tasks, which usually means the system is working harder than it should to hold its temperature.' },
        { id: 'fan-noise', title: 'Excessive Fan Noise', severity: 'low', description: 'A loud, persistent whine or rattle under load can point to dust-clogged fan blades, a worn bearing, or the fan compensating for reduced cooling efficiency elsewhere.' },
        { id: 'fps-drops', title: 'FPS Drops After Extended Gaming', severity: 'high', description: 'Frame rates start normal but fall off the longer you play — a classic sign of the system reducing clock speeds once it hits a thermal limit.' },
        { id: 'thermal-throttling', title: 'Thermal Throttling', severity: 'high', description: 'The CPU or GPU visibly reduces its clock speed under sustained load to protect itself from heat, which shows up as stutter or a sudden performance drop mid-session.' },
        { id: 'declining-performance', title: 'Performance Starts Strong, Then Declines', severity: 'medium', description: 'The first few minutes of a session feel fine, then things gradually slow down — usually because temperatures are climbing faster than the cooling system can manage.' },
        { id: 'random-shutdown', title: 'Random Shutdowns Under Heavy Load', severity: 'critical', description: 'The system powers off unexpectedly during demanding games as a safety response to reaching a critical temperature — this shouldn\'t be ignored.' },
        { id: 'weak-airflow', title: 'Weak Airflow from Exhaust Vents', severity: 'medium', description: 'Little to no warm air coming from the exhaust vents during gaming, even with fans audibly spinning, often points to a blocked heatsink or restricted airflow path.' },
        { id: 'visible-dust', title: 'Visible Dust Accumulation', severity: 'low', description: 'Dust visible around vents or intake grilles is usually a sign of a larger buildup inside, restricting airflow across the heatsink fins.' },
        { id: 'never-serviced', title: 'Never Received Internal Cooling Maintenance', severity: 'low', description: 'A gaming laptop that has never been opened for cleaning is a strong candidate for preventive thermal maintenance, particularly after a year or more of regular use in Kuwait.' }
      ],

      environmentContext: {
        title: 'Why Gaming Laptops Can Struggle More During Kuwait\'s Hot Months',
        paragraphs: [
          'Gaming workloads push the CPU and GPU close to their thermal limits by design, generating substantial heat over sustained sessions.',
          'Kuwait\'s higher ambient temperatures reduce the thermal headroom available to a laptop, particularly during sustained CPU/GPU workloads, since the cooling system has less of a temperature gap to work with before it needs to react.',
          'Fine airborne dust can build up inside the cooling system and restrict airflow across the heatsink fins faster than it would in a cooler, drier climate.',
          'Aging thermal paste or pads gradually lose their ability to transfer heat efficiently, and this effect is more noticeable when ambient temperatures are already high.',
          'When temperatures climb, fans work harder to compensate, which shows up as more noise and, eventually, thermal throttling once the system hits its limit.',
          'The practical result for the user is heat, noise, stuttering or lower sustained FPS during longer sessions — not necessarily a single dramatic failure, but a gradual decline that\'s easy to write off as "the laptop getting old."'
        ]
      },

      materialsGuide: {
        title: 'Thermal Paste, Thermal Pads & Liquid Metal',
        intro: 'The correct thermal material depends on the laptop\'s cooling design, not a single default choice we apply to every model.',
        items: [
          { title: 'Conventional Thermal Paste', description: 'The standard interface between the CPU/GPU die and the heatsink on most gaming laptops. It degrades gradually with heat cycling and is the most common part of a thermal service.' },
          { title: 'Thermal Pads', description: 'Used on components like VRMs, memory chips or secondary heat-generating parts on many designs. We inspect existing pads and replace them where required rather than assuming every pad needs swapping.' },
          { title: 'Liquid Metal (Compatible Models Only)', description: 'A higher-conductivity option supported only on specific cooling designs. We don\'t recommend it automatically — it requires model-specific compatibility and careful, contained application, since it\'s electrically conductive and unsuitable for every laptop.' }
        ]
      },

      diagnosticNote: {
        title: 'Not Every Overheating Problem Is a Thermal Paste Problem',
        paragraphs: [
          'We don\'t blindly repaste every laptop that comes in and assume the problem is solved. Overheating can also result from a failed or degraded fan, a blocked heatsink, a damaged cooling assembly, a heat-pipe or vapor-chamber issue, incorrect heatsink contact after a previous repair, a faulty temperature sensor, or a motherboard or power-delivery fault.',
          'Our thermal service starts with an assessment of the cooling system, not a default repaste. If we find a deeper hardware fault during that assessment, we\'ll explain what we found and point you toward the right KCROC repair service instead of performing a cleaning that won\'t fix the actual cause.'
        ],
        relatedLinks: [
          { label: 'Laptop Overheating Kuwait — Diagnostic Guide', route: '/laptop-overheating-kuwait' },
          { label: 'Laptop Repair Kuwait', route: '/laptop-repair-kuwait' },
          { label: 'Motherboard Repair Kuwait', route: '/motherboard-repair-kuwait' },
          { label: 'Gaming PC & GPU Repair Kuwait', route: '/gaming-pc-repair-kuwait' }
        ]
      },

      process: [
        { step: 1, title: 'Contact KCROC', description: 'Send us your laptop model and the symptoms you\'re seeing — heat, noise, FPS drops or shutdowns — over WhatsApp for a free initial assessment.' },
        { step: 2, title: 'Free Pickup', description: 'We collect your laptop anywhere in Kuwait according to our standard pickup policy, at no extra cost.' },
        { step: 3, title: 'Initial Inspection', description: 'A technician evaluates the reported thermal symptoms and the general condition of the cooling system before any disassembly begins.' },
        { step: 4, title: 'Controlled Disassembly', description: 'The laptop is opened using the correct procedure for its specific model to avoid damaging clips, cables and antennas.' },
        { step: 5, title: 'Deep Internal Cleaning', description: 'Fans, heatsink fins, vents and accessible cooling paths are cleaned of accumulated dust and debris.' },
        { step: 6, title: 'Thermal Service', description: 'Thermal paste is replaced, and thermal pads or other interface materials are inspected and replaced where required for the specific model.' },
        { step: 7, title: 'Reassembly & Testing', description: 'The laptop is carefully reassembled, connectors are verified, and CPU/GPU behaviour is tested under load.' },
        { step: 8, title: 'Return', description: 'Once we\'ve confirmed the system boots correctly and operates normally, the laptop is returned to you.' }
      ],

      performanceOutcomes: {
        disclaimer: 'Results vary by laptop model, workload, ambient temperature, cooling design and the condition of the hardware. Thermal service does not guarantee a particular temperature or FPS improvement — these are representative outcomes where cooling degradation was the underlying cause, not a specific guaranteed result.',
        items: [
          { metric: 'Cooling System Condition', outcome: 'A cleaner cooling system with improved airflow once dust buildup on fans and heatsink fins is removed.' },
          { metric: 'Thermal-Interface Performance', outcome: 'Restored heat transfer where the original thermal paste or pads had degraded with age and heat cycling.' },
          { metric: 'Fan Workload', outcome: 'Reduced fan noise and workload in cases where dust or thermal-material degradation was contributing to the fans running harder than necessary.' },
          { metric: 'Sustained Performance', outcome: 'Improved sustained performance and thermal headroom in cases where thermal throttling was caused by cooling-system degradation rather than a separate hardware fault.' },
          { metric: 'System Stability', outcome: 'Improved stability during longer gaming sessions where heat-related instability was the underlying cause.' }
        ]
      },

      inspectionChecklist: [
        'CPU temperature under sustained load',
        'GPU temperature under sustained load',
        'GPU hotspot temperature where supported',
        'Fan behaviour and ramp response',
        'System behaviour during a sustained workload test',
        'Indicators of thermal throttling',
        'General system stability after reassembly',
        'Boot and normal operation verification'
      ],

      faqs: [
        { id: 'faq-clean-frequency', title: 'How often should I clean my gaming laptop in Kuwait?', answer: 'It depends on usage and environment, but given Kuwait\'s heat and dust, many gaming laptops benefit from a professional cleaning and thermal check roughly every 12-18 months — sooner if you\'re noticing rising temperatures, more fan noise, or your laptop has never been serviced.' },
        { id: 'faq-needs-repaste', title: 'Does my gaming laptop need thermal paste replacement?', answer: 'Not necessarily on every visit — that\'s something we determine during the assessment. Signs that repasting is likely needed include rising temperatures, thermal throttling, or a laptop that has never had its thermal interface serviced.' },
        { id: 'faq-know-overheating', title: 'How do I know if my gaming laptop is overheating?', answer: 'Common signs include a hot chassis, fans running constantly at high speed, FPS drops the longer you play, thermal throttling, or random shutdowns under heavy load. If you\'re seeing several of these together, it\'s worth having the cooling system checked.' },
        { id: 'faq-repaste-reduce-temps', title: 'Can thermal repasting reduce gaming temperatures?', answer: 'When degraded thermal paste is the actual cause, replacing it can meaningfully improve heat transfer. We don\'t promise a specific number of degrees, since the result depends on the laptop model and how degraded the original material was.' },
        { id: 'faq-fan-noise', title: 'Will cleaning stop my gaming laptop fan from being so loud?', answer: 'If the noise is caused by dust buildup or the fan compensating for poor heat transfer, cleaning and thermal service often reduces it. If the noise is from a worn or failing fan bearing, we\'ll flag that separately during inspection.' },
        { id: 'faq-rog', title: 'Can you service ASUS ROG laptops?', answer: 'Yes, ASUS ROG is one of the gaming laptop lines we regularly service, including internal cleaning and thermal repaste.' },
        { id: 'faq-legion', title: 'Can you service Lenovo Legion laptops?', answer: 'Yes, we service Lenovo Legion laptops, including their thermal maintenance and internal cleaning.' },
        { id: 'faq-msi', title: 'Do you service MSI gaming laptops?', answer: 'Yes, MSI gaming laptops are covered by this service, alongside ASUS, Acer, Alienware, Razer, HP and Dell gaming models.' },
        { id: 'faq-thermal-pads', title: 'Do you replace thermal pads?', answer: 'We inspect the existing thermal pads during the service and replace them where required for the specific model, rather than replacing every pad automatically on every laptop.' },
        { id: 'faq-liquid-metal-offer', title: 'Do you offer liquid-metal service?', answer: 'On compatible models, yes. Liquid metal isn\'t suitable for every gaming laptop\'s cooling design, so we confirm compatibility first rather than applying it by default.' },
        { id: 'faq-liquid-metal-safe', title: 'Is liquid metal safe for every gaming laptop?', answer: 'No — it depends on the specific model\'s cooling design and requires careful, contained application because it\'s electrically conductive. We only offer it where the laptop is genuinely suited to it.' },
        { id: 'faq-fps-drops-clean', title: 'Can cleaning fix FPS drops?', answer: 'If the FPS drops are caused by thermal throttling from a dust-clogged or degraded cooling system, cleaning and thermal service can help. If the cause is something else — a failing fan, a GPU fault or a software issue — we\'ll tell you during the assessment rather than assuming a cleaning will fix it.' },
        { id: 'faq-still-hot', title: 'What if my laptop still overheats after repasting?', answer: 'If temperatures don\'t improve after proper thermal service, the cause is likely something beyond the thermal interface — a failing fan, a cooling assembly fault, or a motherboard-level issue. We\'ll help you figure out which and point you toward the right next step, such as our laptop repair or motherboard repair service.' },
        { id: 'faq-pickup', title: 'Do you provide pickup and delivery in Kuwait?', answer: 'Yes, pickup and delivery are free anywhere in Kuwait for this service.' },
        { id: 'faq-turnaround', title: 'How long does gaming laptop thermal service take?', answer: 'Most gaming laptop cleaning and thermal service work is completed within 24-48 hours of us receiving the laptop, though this can vary depending on the model and whether any additional issue is found during inspection.' }
      ],

      relatedServiceIds: ['srv-gaming', 'srv-laptop', 'srv-motherboard'],
      relatedProblemIds: ['problem-overheating', 'problem-freezing-crashing'],
      relatedBrandIds: ['brand-asus', 'brand-lenovo', 'brand-msi', 'brand-acer', 'brand-dell', 'brand-hp'],
      relatedResourcePaths: [
        { label: 'Laptop Overheating Kuwait — Diagnostic Guide', path: '/laptop-overheating-kuwait' },
        { label: 'How Often to Clean a Gaming Laptop & Replace Thermal Paste', path: '/blog/how-often-clean-laptop-replace-thermal-paste-kuwait' },
        { label: 'Laptop Temperatures in Kuwait', path: '/blog/laptop-temperatures-kuwait-safe-cpu-gpu-temperatures' },
        { label: 'Gaming PC Cooling Guide', path: '/blog/gaming-pc-cooling' },
      ],

      warranty: {
        duration: '30 Days',
        coverage: 'Covers the workmanship on the disassembly, cleaning, thermal-material application and reassembly performed during the service. This is a workmanship warranty — because sustained temperatures depend on the laptop model, ambient conditions and workload, we do not guarantee a specific temperature or FPS result.',
        noFixNoFee: true
      },
      contentImages: [
        {
          src: IMAGES.gaming.gamingOverheating.src,
          alt: IMAGES.gaming.gamingOverheating.alt,
          width: IMAGES.gaming.gamingOverheating.width,
          height: IMAGES.gaming.gamingOverheating.height,
          placement: 'commonIssues',
          caption: 'A gaming laptop showing signs of overheating — hot chassis, loud fans and thermal throttling under load.'
        },
        {
          src: IMAGES.laptopHardware.dustyMotherboard.src,
          alt: IMAGES.laptopHardware.dustyMotherboard.alt,
          width: IMAGES.laptopHardware.dustyMotherboard.width,
          height: IMAGES.laptopHardware.dustyMotherboard.height,
          placement: 'coreFeatures',
          caption: 'Dust built up around the fan and WiFi card, restricting airflow through the cooling system.'
        },
        {
          src: IMAGES.laptopHardware.copperHeatsink3.src,
          alt: IMAGES.laptopHardware.copperHeatsink3.alt,
          width: IMAGES.laptopHardware.copperHeatsink3.width,
          height: IMAGES.laptopHardware.copperHeatsink3.height,
          placement: 'process',
          caption: 'A copper heatsink with dried, degraded thermal paste — a common cause of reduced heat transfer.'
        }
      ],
      seo: {
        title: 'Gaming Laptop Cleaning & Thermal Repaste Kuwait | KCROC',
        description: 'Professional gaming laptop cleaning, thermal repaste and cooling-system testing in Kuwait. ASUS ROG, Legion, MSI, Predator & more. Free pickup & delivery.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/gaming-laptop-cleaning-kuwait',
        ogType: 'article',
        schemaTypes: ['Service', 'FAQPage']
      },
      navigationPriority: 65,
      isFeatured: false,
      popular: false
    } as ServiceEntity,
    
    'srv-motherboard': { 
      id: 'srv-motherboard', 
      slug: 'motherboard-repair-kuwait', 
      entityType: 'Service', 
      isActive: true, 
      title: 'Motherboard Repair Kuwait', 
      iconKey: 'cpu', 
      shortDescription: 'Chip-level power rail tracing, MOSFET replacement, and BGA rework — for boards other shops call "beyond repair."',
      description: 'A laptop that\'s completely dead, one that shuts off randomly during normal use, or one a retail shop already quoted a "full motherboard replacement" for — these are the cases where component-level repair actually matters most, because a motherboard replacement usually costs more than the laptop is worth once you\'re past the second or third year of ownership. Most repair counters carry one tool for a dead board: swap the whole thing. We carry a multimeter, a thermal camera, and boardview schematics, and use them to trace the fault to the single component that actually failed — a shorted MOSFET, a blown fuse, a degraded capacitor, a corroded trace from an old spill — and repair that one point instead. The rest of the board, and anything soldered to it, stays exactly as it was.',
      idealCustomer: 'Users with completely dead or liquid-damaged devices who have been told by standard retail shops that their laptop is "unfixable" and want to save up to 80% versus a full board replacement.',
      deviceTypes: [
        'Windows Laptop Motherboards (Dell, HP, Lenovo, ASUS, Acer, MSI)',
        'MacBook Motherboards (Intel & Apple Silicon)',
        'Gaming Laptop Motherboards (high-draw VRM designs)',
        'Desktop Motherboards (ATX / Micro-ATX)'
      ],
      repairLevel: 'chip-level', 
      estimatedTurnaround: '24-48 Hours', 
      pricing: { startingFrom: 25, currency: 'KWD', quoteRequired: true, displayLabel: 'From 25 KWD — free diagnostic first' }, 
      relatedServiceIds: ['srv-laptop', 'srv-macbook', 'srv-charging-port', 'srv-liquid-damage', 'srv-gaming'],
      relatedProblemIds: ['problem-no-power', 'problem-not-charging', 'problem-black-screen', 'problem-liquid-spill'],
      relatedBrandIds: ['brand-dell', 'brand-hp', 'brand-lenovo', 'brand-asus', 'brand-msi'],
      relatedResourcePaths: [
        { label: 'BIOS / UEFI Recovery Guide', path: '/guides/bios-uefi-recovery-kuwait' },
        { label: "Laptop Won't Turn On? Complete Troubleshooting Guide", path: '/guides/laptop-wont-turn-on' },
      ],
      relatedCaseStudyPath: { label: 'ASUS ROG Dead Motherboard Case Study — Hawalli', path: '/case-studies/asus-rog-dead-motherboard-hawalli' },
      coreFeatures: [
        'Power Rail Voltage Tracing',
        'MOSFET & Power IC Replacement',
        'BGA Rework & Chip Reballing',
        'Liquid Damage Ultrasonic Cleaning',
        'Blown Fuse Diagnosis & Replacement',
        'Capacitor Replacement',
        'BIOS Chip Reflashing',
        'Boardview-Guided Fault Tracing',
        'Free Pick & Drop',
        '30-Day Warranty'
      ], 
      brands: ['MacBook', 'Dell', 'HP', 'ASUS', 'Lenovo', 'Acer', 'MSI'], 

      whyChooseUs: [
        { title: 'We Trace the Fault Before We Quote Anything', description: 'Multimeter testing and thermal imaging identify the actual failed component before any repair or replacement is discussed — not a guess based on symptoms.' },
        { title: 'Component-Level Repair, Not Board Swap', description: 'A shorted MOSFET or a blown fuse is a single-component fix. Most shops treat it as a reason to replace the entire board — we treat it as what it is.' },
        { title: 'BGA Rework Capability', description: 'Chip-level faults — including GPU, chipset, and memory controller issues — are reworked directly under magnification with controlled reflow, rather than declared unfixable.' },
        { title: 'Data Stays on the Original Board', description: 'Because we repair rather than replace, anything soldered to the board — storage, in particular on Apple Silicon and many modern ultrabooks — is never disturbed.' },
        { title: 'ESD-Safe Laboratory', description: 'All board-level work happens on grounded, static-controlled workstations in our Hawalli lab, where a single uncontrolled static discharge can be the difference between a repairable board and a dead one.' },
        { title: 'Kuwait Climate Expertise', description: 'Sustained heat accelerates capacitor degradation and solder joint fatigue well beyond what manufacturer specs assume — we see the resulting failure patterns daily and know what to check for.' },
        { title: 'Free Pickup & Delivery, Kuwait-Wide', description: 'Full laptops or desktop towers collected from and returned to your home or office anywhere in Kuwait, at no extra cost.' },
        { title: 'No Fix, No Fee', description: 'If the board is genuinely beyond economical repair after diagnosis, you pay nothing — not even for the diagnostic.' }
      ],

      commonIssues: [
        { 
          id: 'no-power', 
          title: 'Dead Laptop / No Power At All', 
          severity: 'critical', 
          description: 'No lights, no fan spin, no response to the power button. Most often an input MOSFET short or a blown fuse on the main power rail — a single-component fault we trace with a multimeter before assuming the board is a total loss.' 
        },
        { 
          id: 'liquid-damage-board', 
          title: 'Liquid-Damaged Motherboard', 
          severity: 'critical', 
          description: 'Spilled liquid creates conductive bridges across the board and corrodes copper traces within hours. We ultrasonically clean the board and replace only the components the short actually damaged.' 
        },
        { 
          id: 'random-shutdowns-board', 
          title: 'Random Shutdowns or Instability', 
          severity: 'high', 
          description: 'Unpredictable restarts regardless of workload usually point to a degrading power rail or a capacitor that can no longer hold a stable charge, not a software fault.' 
        },
        { 
          id: 'vrm-failure', 
          title: 'VRM Failure Under Load', 
          severity: 'high', 
          description: 'The system shuts off specifically under heavy CPU/GPU load — a voltage regulation module component has degraded to the point it can\'t sustain power delivery at higher draw.' 
        },
        { 
          id: 'wont-post', 
          title: 'Won\'t POST / No Display, No Boot', 
          severity: 'critical', 
          description: 'Fans and lights come on but nothing progresses past power-on. Can be a corrupted BIOS chip, a dislodged component from a previous repair elsewhere, or a failed RAM/chipset connection — we isolate which with boardview diagnostics.' 
        },
        { 
          id: 'bulging-capacitors', 
          title: 'Bulging or Leaking Capacitors', 
          severity: 'medium', 
          description: 'Visibly domed or leaking electrolytic capacitors are a heat-accelerated failure mode we see often in Kuwait — replacing them before they fail completely prevents a simple fix from becoming a dead board.' 
        },
        { 
          id: 'charging-port-ripped', 
          title: 'Charging Port Torn From the Board', 
          severity: 'high', 
          description: 'Repeated stress on the charging cable can rip the DC jack or USB-C port off its solder pads entirely. We reattach and reinforce the connection via micro-soldering.' 
        },
        { 
          id: 'bios-corruption-board', 
          title: 'Corrupted BIOS / Failed Firmware Update', 
          severity: 'critical', 
          description: 'A power interruption mid-update or a bad flash can leave a board unable to POST at all. Where a CMOS reset doesn\'t recover it, we reflash the BIOS chip directly with an external programmer.' 
        },
        { 
          id: 'intermittent-no-power', 
          title: 'Intermittently Powers On, Then Stops', 
          severity: 'medium', 
          description: 'A board that sometimes boots and sometimes doesn\'t often has a marginal, partially-failed component or a cracked solder joint under thermal stress — harder to catch than a clean dead-short, but traceable under load testing.' 
        }
      ], 

      process: [
        { step: 1, title: 'Free Pickup', description: 'We collect the device from your home or office anywhere in Kuwait.' },
        { step: 2, title: 'Multimeter & Thermal Imaging Diagnostic', description: 'We trace the fault to the exact failed component rather than assuming the whole board needs replacing.' },
        { step: 3, title: 'Confirm the Fault & Quote', description: 'You receive a written explanation of what\'s actually wrong and an itemized quote before any work starts.' },
        { step: 4, title: 'Micro-Soldering & BGA Rework in an ESD-Safe Lab', description: 'The failed component is replaced, or the board is ultrasonically cleaned for liquid damage, on grounded, static-controlled workstations.' },
        { step: 5, title: 'Full-Load Stress Testing', description: 'The board is stress-tested under sustained load to confirm the repair holds before reassembly.' },
        { step: 6, title: 'Return with 30-Day Warranty', description: 'Your device is delivered back with the original board repaired, not swapped.' }
      ],

      performanceOutcomes: {
        disclaimer: 'The outcomes below describe typical results for this repair category, not a guarantee for any specific board — every repair is quoted after its own diagnostic.',
        items: [
          { metric: 'Board Recovery Rate', outcome: 'The majority of boards referred to us as "needs full replacement" are repairable at component level once the fault is traced to its actual source.' },
          { metric: 'Cost vs. Full Replacement', outcome: 'Component-level motherboard repair typically costs a fraction of a full board replacement quote — often up to 80% less.' },
          { metric: 'Data Preservation', outcome: 'Because the original board is repaired rather than swapped, anything soldered to it — including storage on many modern ultrabooks and MacBooks — remains untouched.' },
          { metric: 'Liquid Damage Cases', outcome: 'Boards brought in promptly after a spill, without being powered back on, have meaningfully better recovery outcomes than those tested repeatedly first.' }
        ]
      },

      repairExamples: {
        disclaimer: 'These are representative repair scenarios illustrating common fault categories we service, not records of a specific named customer.',
        items: [
          {
            id: 'dell-mosfet-short',
            title: 'Dell Laptop: Completely Dead, Quoted a Full Board Replacement',
            symptoms: 'No power lights, no fan spin, no response to the power button — a retail shop quoted a full motherboard replacement.',
            diagnosis: 'Multimeter testing traced a dead short to a single input MOSFET on the main power rail.',
            repair: 'The shorted MOSFET was replaced via micro-soldering.',
            outcome: 'The laptop powered on and passed full-load stress testing, at a fraction of the quoted board-replacement cost.'
          },
          {
            id: 'hp-liquid-board',
            title: 'HP Laptop: Coffee Spill, Powered Off Immediately',
            symptoms: 'Coffee was spilled on the keyboard; the laptop was powered off right away and brought in the same day.',
            diagnosis: 'Ultrasonic cleaning revealed light corrosion with no shorted components, since power was cut before a short could develop.',
            repair: 'Full ultrasonic cleaning of the board; no component replacement was required.',
            outcome: 'The laptop returned to full function with no data loss, illustrating why an immediate power-off matters more than any repair technique afterward.'
          },
          {
            id: 'capacitor-instability',
            title: 'Windows Laptop: Random Shutdowns During Normal Use',
            symptoms: 'The laptop would shut off unpredictably, sometimes minutes after boot, sometimes hours in, with no pattern tied to any specific app.',
            diagnosis: 'Load testing identified a degraded capacitor on the power delivery circuit no longer holding a stable charge under minor voltage fluctuation.',
            repair: 'The failed capacitor was replaced.',
            outcome: 'The laptop ran stable through extended use testing with no further shutdowns.'
          }
        ]
      },

      inspectionChecklist: [
        'Power rail voltage tracing',
        'Input MOSFET and power IC test',
        'Capacitor condition inspection',
        'Liquid damage / corrosion inspection under magnification',
        'BIOS chip and firmware verification',
        'Charging port solder joint integrity',
        'Boardview-guided component testing',
        'Full-load stress test after repair'
      ],

      faqs: [
        {
          id: 'faq-motherboard-other-shop-unfixable',
          title: 'Can you repair a motherboard another shop said needs full replacement?',
          answer: 'Often, yes. Most repair counters only carry one solution for a dead board: full replacement. We trace the fault to the specific failed component first — "needs replacement" from a shop that doesn\'t do chip-level work usually means beyond their repair model, not beyond repair entirely.'
        },
        {
          id: 'faq-motherboard-data-loss',
          title: 'Will I lose my data during motherboard repair?',
          answer: 'No — we repair your original board rather than swapping it, so anything soldered to it, including storage on many modern ultrabooks and MacBooks, is never disturbed.'
        },
        {
          id: 'faq-motherboard-cost-vs-new',
          title: 'How much cheaper is motherboard repair than a full replacement?',
          answer: 'Component-level repair typically costs a fraction of a full board replacement — commonly up to 80% less, since you\'re paying for the one failed part and the labor to replace it, not an entire new board.'
        },
        {
          id: 'faq-bga-rework-explain',
          title: 'What is BGA rework, and why does it matter?',
          answer: 'BGA (ball-grid array) rework is the precision removal and reattachment of chips — GPUs, chipsets, memory controllers — that are soldered directly to the board rather than socketed. It\'s what makes chip-level faults repairable instead of automatically requiring a full board swap.'
        },
        {
          id: 'faq-liquid-damaged-motherboard',
          title: 'Do you repair motherboards damaged by spilled liquid?',
          answer: 'Yes. We fully disassemble the board and run it through an industrial ultrasonic cleaner to strip corrosion, then trace and replace only the components the short actually damaged.'
        },
        {
          id: 'faq-motherboard-turnaround',
          title: 'How long does motherboard repair take?',
          answer: 'Most component-level repairs complete in 24-48 hours, including full-load stress testing before the device is returned to you.'
        },
        {
          id: 'faq-macbook-and-windows-boards',
          title: 'Do you repair both MacBook motherboards and Windows motherboards?',
          answer: 'Yes — MacBook motherboards (Intel and Apple Silicon) and Windows laptop or desktop motherboards across all major brands.'
        },
        {
          id: 'faq-motherboard-not-repairable',
          title: 'What happens if my motherboard genuinely can\'t be repaired?',
          answer: 'Under our No Fix, No Fee policy, if the board is catastrophically damaged and uneconomical to repair, we return it to you and you pay nothing for the diagnostic time.'
        },
        {
          id: 'faq-random-shutdown-motherboard',
          title: 'My laptop shuts down randomly but still turns back on — is that a motherboard issue?',
          answer: 'It can be — unpredictable shutdowns unrelated to any specific task often point to a degrading power rail or capacitor rather than a software fault. We confirm this with load testing before quoting a repair.'
        },
        {
          id: 'faq-motherboard-warranty',
          title: 'Do you offer a warranty on motherboard repairs?',
          answer: 'Yes, 30 days covering all parts and labor on the repair performed.'
        },
        {
          id: 'faq-bios-corruption-motherboard',
          title: 'Can you fix a motherboard that won\'t POST after a failed BIOS update?',
          answer: 'Where a simple CMOS reset doesn\'t recover it, we reflash the BIOS chip directly using an external programmer, which resolves the large majority of failed-update and corruption cases without replacing the board.'
        }
      ],

      warranty: { duration: '30 Days', coverage: 'All parts and labor.', noFixNoFee: true }, 
      contentImages: [
        {
          src: IMAGES.laptopHardware.laptopMotherboardDiagnosticBenchRepair.src,
          alt: IMAGES.laptopHardware.laptopMotherboardDiagnosticBenchRepair.alt,
          width: IMAGES.laptopHardware.laptopMotherboardDiagnosticBenchRepair.width,
          height: IMAGES.laptopHardware.laptopMotherboardDiagnosticBenchRepair.height,
          placement: 'commonIssues',
          caption: 'A motherboard under diagnostic testing on the bench to trace a failed power rail before any part is replaced.'
        },
        {
          src: IMAGES.motherboard.breadboarding.src,
          alt: IMAGES.motherboard.breadboarding.alt,
          width: IMAGES.motherboard.breadboarding.width,
          height: IMAGES.motherboard.breadboarding.height,
          placement: 'coreFeatures',
          caption: 'Breadboarding a motherboard outside its case to isolate a fault at the component level.'
        },
        {
          src: IMAGES.motherboard.gigabyteAorus.src,
          alt: IMAGES.motherboard.gigabyteAorus.alt,
          width: IMAGES.motherboard.gigabyteAorus.width,
          height: IMAGES.motherboard.gigabyteAorus.height,
          placement: 'process',
          caption: 'Inspecting thermal paste and chip contacts as part of the board-level repair process.'
        }
      ],
      seo: { 
        title: 'Motherboard Repair Kuwait | Chip-Level MOSFET Fix | KCROC', 
        description: 'Chip-level motherboard repair in Kuwait for no-power, charging and short-circuit faults. Power-rail tracing, MOSFET replacement and board repair with free pickup and 30-day warranty.', 
        canonicalUrl: 'https://www.computerrepairkuwait.com/motherboard-repair-kuwait', locale: 'en_KW', alternates: { 'en-KW': 'https://www.computerrepairkuwait.com/motherboard-repair-kuwait', 'ar-KW': 'https://www.computerrepairkuwait.com/ar/motherboard-repair-kuwait', 'x-default': 'https://www.computerrepairkuwait.com/motherboard-repair-kuwait' }, 
        ogType: 'article', 
        schemaTypes: ['Service', 'FAQPage'] 
      },
      navigationPriority: 70, 
      isFeatured: true, 
      popular: true
    } as ServiceEntity,
    
    'srv-screen': {
      id: 'srv-screen',
      slug: 'laptop-screen-repair-kuwait',
      entityType: 'Service',
      isActive: true,
      title: 'Screen Replacement Kuwait',
      iconKey: 'monitor',
      shortDescription: 'Same-day LCD, IPS, and OLED panel replacement for cracked, flickering, or dead laptop and MacBook screens.',
      description: 'A cracked panel, a screen full of vertical lines, or a display that flickers whenever the lid moves doesn\'t mean the laptop is done — in almost every case it\'s a screen or cable fault, not a motherboard problem, and it\'s fixable the same day if the panel is in stock. We stock standard 14" and 15.6" FHD, IPS, and OLED panels for Dell, HP, Lenovo, ASUS, and Acer, plus Retina panels for MacBook Air and Pro. Kuwait\'s heat and dust also take a toll here specifically: display cables routed near the hinge flex thousands of times a year and wear through faster in high-temperature environments, which is why a "cracked screen" call often turns out to be a cable fault once we open the lid — a cheaper fix than a full panel.',
      idealCustomer: 'Anyone with a cracked, flickering, lined, or dead laptop or MacBook screen who needs a fast, OEM-quality panel replacement without paying for a new machine.',
      deviceTypes: [
        'Windows Laptops (14" & 15.6" FHD/IPS)',
        'MacBook Air & MacBook Pro (Retina)',
        'Gaming Laptops (high-refresh panels)',
        '2-in-1 / Convertible Touchscreens'
      ],
      repairLevel: 'basic',
      estimatedTurnaround: 'Same Day (if panel in stock)',
      pricing: { startingFrom: 30, currency: 'KWD', quoteRequired: true, displayLabel: 'From 30 KWD + part' },
      relatedServiceIds: ['srv-laptop', 'srv-hinge', 'srv-macbook-screen'],
      relatedProblemIds: ['problem-cracked-screen', 'problem-black-screen'],
      relatedBrandIds: ['brand-dell', 'brand-hp', 'brand-lenovo', 'brand-asus', 'brand-msi'],
      relatedResourcePaths: [
        { label: 'Laptop Repair Guide', path: '/laptop-repair-kuwait' },
        { label: 'Laptop Screen Cracked — What to Do', path: '/laptop-screen-cracked-kuwait' },
      ],
      relatedCaseStudyPath: { label: 'Dell XPS Screen Replacement Case Study — Kuwait City', path: '/case-studies/dell-xps-screen-replacement-kuwait-city' },
      coreFeatures: [
        'LCD / IPS / OLED Panel Replacement',
        'MacBook Retina Display Replacement',
        'Display Cable Repair & Replacement',
        'Touchscreen Digitizer Replacement',
        'Backlight & Backlight Fuse Repair',
        'Free Pick & Drop',
        '30-Day Warranty'
      ],
      brands: ['Dell', 'HP', 'Lenovo', 'ASUS', 'Acer', 'MacBook'],
    
      whyChooseUs: [
        { title: 'Cable Fault Checked Before Panel Replacement', description: 'A cracked-looking display with lines or flicker is sometimes a worn display cable near the hinge, not the panel itself — we check this first so you\'re not paying for a new screen you don\'t need.' },
        { title: 'OEM & High-Grade Compatible Panels In Stock', description: 'We stock standard 14" and 15.6" FHD/IPS panels for the most common brands, which is what makes same-day turnaround possible.' },
        { title: 'MacBook Retina Specialists', description: 'Retina and True Tone displays require careful handling of the delicate flex cables and True Tone sensor — we work on these daily, not occasionally.' },
        { title: 'Colour & Brightness Calibrated Before Return', description: 'Every replacement panel is checked for dead pixels, uniform backlighting, and colour accuracy before the laptop goes back to you.' },
        { title: 'Free Pickup & Delivery, Kuwait-Wide', description: 'Collected from and returned to your home or office anywhere in Kuwait at no extra cost.' },
        { title: 'No Fix, No Fee', description: 'If the fault turns out to be something we can\'t resolve, you pay nothing for the diagnostic.' }
      ],
    
      commonIssues: [
        { id: 'cracked-screen', title: 'Cracked or Shattered Screen', severity: 'high', description: 'Physical impact from a drop or closing the lid on an object. The panel itself is replaced; the surrounding bezel and hinge are checked for related damage at the same time.' },
        { id: 'screen-flicker', title: 'Screen Flickering', severity: 'medium', description: 'Often a worn display cable near the hinge rather than the panel — we test the cable separately before assuming a full panel swap is needed.' },
        { id: 'vertical-lines', title: 'Vertical or Horizontal Lines on Display', severity: 'high', description: 'Usually a damaged panel or a loose display cable connection. We reseat the cable first, since that alone resolves a portion of these cases.' },
        { id: 'black-screen-external-works', title: 'Black Screen, But External Monitor Works', severity: 'high', description: 'Points to the panel or its cable rather than the graphics hardware, since the system is clearly still rendering a display signal correctly.' },
        { id: 'backlight-dim', title: 'Screen Very Dim or Backlight Not Working', severity: 'medium', description: 'The image is faintly visible under a flashlight but not on its own — typically a blown backlight fuse or a failed backlight driver, not the panel itself.' },
        { id: 'discoloration', title: 'Discoloration or Uneven Tint', severity: 'low', description: 'Can be early-stage backlight degradation or a panel manufacturing fault appearing over time; we confirm which before quoting a replacement.' },
        { id: 'touchscreen-unresponsive', title: 'Touchscreen Not Responding', severity: 'medium', description: 'On 2-in-1 and convertible models, the touch digitizer layer can fail independently of the display panel underneath it.' },
        { id: 'hinge-related-cable-wear', title: 'Flicker That Gets Worse When Opening/Closing the Lid', severity: 'medium', description: 'A strong sign the display cable is worn from repeated flexing near the hinge rather than a fault in the panel itself.' }
      ],
    
      process: [
        { step: 1, title: 'Free Pickup', description: 'We collect your laptop or MacBook from your home or office anywhere in Kuwait.' },
        { step: 2, title: 'Panel & Cable Diagnostic', description: 'We confirm whether the fault is the panel, the display cable, or the backlight circuit before quoting anything.' },
        { step: 3, title: 'Confirm the Fault & Quote', description: 'You get a clear, itemized quote before any work starts — no surprise charges for parts that turned out not to be needed.' },
        { step: 4, title: 'Panel or Cable Replacement', description: 'The new panel or cable is fitted in our ESD-safe lab, with careful handling of ribbon connectors and, on MacBooks, the True Tone sensor.' },
        { step: 5, title: 'Calibration & Dead-Pixel Check', description: 'The new display is checked for dead pixels, backlight uniformity, and colour accuracy before reassembly.' },
        { step: 6, title: 'Return with 30-Day Warranty', description: 'Delivered back to you the same day in most cases, with a 30-day warranty on the panel and labor.' }
      ],
    
      performanceOutcomes: {
        disclaimer: 'The outcomes below describe typical results for this repair category, not a guarantee for any specific device — every repair is quoted after its own diagnostic.',
        items: [
          { metric: 'Turnaround', outcome: 'Most standard 14"/15.6" panel replacements complete same-day when the panel is in stock.' },
          { metric: 'Cable vs. Panel Diagnosis', outcome: 'A meaningful share of "cracked screen" calls that show no physical damage turn out to be a display cable fault, a cheaper fix than a full panel.' },
          { metric: 'Cost vs. Manufacturer Quotes', outcome: 'Panel replacement typically costs a fraction of a manufacturer or authorized-center screen assembly quote.' }
        ]
      },
    
      repairExamples: {
        disclaimer: 'These are representative repair scenarios illustrating common fault categories we service, not records of a specific named customer.',
        items: [
          {
            id: 'flicker-not-panel',
            title: 'Business Laptop: "Cracked Screen" That Was Actually a Cable',
            symptoms: 'Vertical lines and flickering appeared gradually, worsening whenever the lid was opened or closed, with no visible physical damage to the panel.',
            diagnosis: 'Testing an external monitor confirmed the graphics hardware was fine; reseating the display cable temporarily resolved the flicker, confirming a worn cable near the hinge.',
            repair: 'The display cable was replaced rather than the panel.',
            outcome: 'The screen returned to normal with no lines or flicker, at a fraction of the cost of a full panel replacement.'
          },
          {
            id: 'macbook-retina-crack',
            title: 'MacBook Air: Cracked Retina Display After a Drop',
            symptoms: 'The lid was dropped onto a hard surface, cracking the display in the upper corner with bleeding pixels spreading across part of the screen.',
            diagnosis: 'Physical inspection confirmed panel damage only, with the True Tone sensor and hinge undamaged.',
            repair: 'The Retina display assembly was replaced, with the True Tone sensor carefully transferred and recalibrated.',
            outcome: 'The MacBook returned to full brightness and colour accuracy with True Tone functioning correctly.'
          }
        ]
      },
    
      inspectionChecklist: [
        'Panel damage vs. display cable fault isolation',
        'Backlight and backlight fuse test',
        'Dead pixel and uniformity check',
        'Touch digitizer response test (2-in-1 models)',
        'Colour accuracy and True Tone calibration (MacBook)',
        'Hinge and bezel condition check'
      ],
    
      faqs: [
        { id: 'faq-screen-same-day', title: 'Can screen replacement be done the same day?', answer: 'Yes, in most cases, provided the panel is in stock — we carry standard 14" and 15.6" FHD/IPS panels for the most common brands.' },
        { id: 'faq-flicker-not-crack', title: 'My screen is flickering but not cracked — is that still a screen problem?', answer: 'Often, yes, but not always the panel itself. Flickering that worsens when opening or closing the lid usually points to a worn display cable near the hinge, which we test for before quoting a full panel replacement.' },
        { id: 'faq-external-monitor-works', title: 'The screen is black but an external monitor works fine — what does that mean?', answer: 'It points to the internal display or its cable rather than the graphics hardware, since the system is clearly still producing a valid display signal.' },
        { id: 'faq-macbook-retina-screen', title: 'Do you replace MacBook Retina displays?', answer: 'Yes, including careful handling of the True Tone sensor, which we recalibrate after replacement so colour accuracy stays correct.' },
        { id: 'faq-touchscreen-replace', title: 'Can you replace a touchscreen on a 2-in-1 laptop?', answer: 'Yes. The touch digitizer can fail independently of the display panel beneath it, and we diagnose and replace whichever layer is actually at fault.' },
        { id: 'faq-screen-cost', title: 'How much does laptop screen replacement cost?', answer: 'From 30 KWD for standard panels, with the exact price depending on size, resolution, and whether it\'s a standard panel or a MacBook Retina display.' },
        { id: 'faq-screen-oem', title: 'Do you use OEM screens?', answer: 'We offer OEM and high-grade compatible panels and explain the difference in quality and price before you choose.' },
        { id: 'faq-screen-data-safety', title: 'Is my data safe during a screen replacement?', answer: 'Yes — screen replacement is a hardware-only procedure that never touches your storage drive or files.' },
        { id: 'faq-screen-warranty', title: 'Is there a warranty on screen replacements?', answer: 'Yes, 30 days covering the panel and labor.' },
        { id: 'faq-backlight-vs-panel', title: 'My screen is very dim — do I need a new panel?', answer: 'Not necessarily. A dim but faintly visible image often means a blown backlight fuse or failed backlight driver rather than the panel itself, which is a cheaper fix — we test for this before quoting a full replacement.' }
      ],
    
      warranty: { duration: '30 Days', coverage: 'Screen panel and labor.', noFixNoFee: false },
      contentImages: [
        {
          src: IMAGES.laptopHardware.laptopScreenAssemblyDisassemblyRepair.src,
          alt: IMAGES.laptopHardware.laptopScreenAssemblyDisassemblyRepair.alt,
          width: IMAGES.laptopHardware.laptopScreenAssemblyDisassemblyRepair.width,
          height: IMAGES.laptopHardware.laptopScreenAssemblyDisassemblyRepair.height,
          placement: 'commonIssues',
          caption: 'A laptop screen assembly being disassembled to check whether the fault is the panel or the display cable.'
        },
        {
          src: IMAGES.laptopHardware.laptopLcdPanelReplacementPart.src,
          alt: IMAGES.laptopHardware.laptopLcdPanelReplacementPart.alt,
          width: IMAGES.laptopHardware.laptopLcdPanelReplacementPart.width,
          height: IMAGES.laptopHardware.laptopLcdPanelReplacementPart.height,
          placement: 'coreFeatures',
          caption: 'A replacement LCD panel ready for installation — we stock standard FHD and IPS panels for same-day turnaround.'
        },
        {
          src: IMAGES.laptopHardware.screenBezel.src,
          alt: IMAGES.laptopHardware.screenBezel.alt,
          width: IMAGES.laptopHardware.screenBezel.width,
          height: IMAGES.laptopHardware.screenBezel.height,
          placement: 'process',
          caption: 'Screen bezel and hinge work during reassembly after the new panel is fitted and tested.'
        }
      ],
      seo: {
        title: 'Laptop Screen Replacement Cost Kuwait | From 30 KWD | KCROC',
        description: 'Laptop screen replacement from 30 KWD + part. Cracked, black or flickering display? Free diagnosis, same-day service when in stock, Kuwait-wide pickup and 30-day warranty.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/laptop-screen-repair-kuwait', locale: 'en_KW', alternates: { 'en-KW': 'https://www.computerrepairkuwait.com/laptop-screen-repair-kuwait', 'ar-KW': 'https://www.computerrepairkuwait.com/ar/laptop-screen-repair-kuwait', 'x-default': 'https://www.computerrepairkuwait.com/laptop-screen-repair-kuwait' },
        ogType: 'article',
        schemaTypes: ['Service', 'FAQPage']
      },
      navigationPriority: 60,
      isFeatured: false,
      popular: false
    } as ServiceEntity,
    
    'srv-battery': { 
      id: 'srv-battery', 
      slug: 'battery-replacement-kuwait', 
      entityType: 'Service', 
      isActive: true, 
      title: 'Laptop & MacBook Battery Replacement Kuwait', 
      iconKey: 'battery', 
      shortDescription: 'Battery health diagnostics, charging circuit testing, and OEM battery replacement — we confirm the battery is the actual fault before replacing it.',
      description: 'A battery that drains in under an hour, a laptop that shuts down at "30% remaining," a charge percentage that jumps from 60% to 20% with no warning, or a trackpad that\'s started lifting on one side — these are five different symptoms, and not all of them mean the battery itself is the problem. A battery that reports 0% and won\'t charge at all is sometimes a dead cell, and sometimes a failed charging IC on the motherboard that would leave a brand-new battery just as unresponsive. That\'s why we test the charging circuit and power delivery path before we quote a replacement — we replace batteries only after confirming the battery, not the charging system, is the actual cause. In Kuwait, batteries also fail faster than the manufacturer\'s spec sheet assumes: lithium-ion cells degrade measurably faster at sustained temperatures above 40°C, and a laptop left in a parked car or by a sunlit window for part of the day pushes internal temperatures well past that.',
      idealCustomer: 'University students, business professionals, remote workers, developers, designers, and gamers — anyone on a Windows laptop or MacBook noticing rapid battery drain, unexpected shutdowns, a battery that only holds charge while plugged in, or visible swelling.',
      deviceTypes: [
        'Windows Laptops (all major brands)',
        'MacBook Air & MacBook Pro (all generations)',
        '2-in-1 / Convertible Laptops',
        'Gaming Laptops (high-drain battery systems)'
      ],
      repairLevel: 'basic', 
      estimatedTurnaround: 'Same Day', 
      pricing: { startingFrom: 8, currency: 'KWD', quoteRequired: true, displayLabel: 'From 8 KWD + part' }, 
      relatedServiceIds: ['srv-laptop', 'srv-macbook', 'srv-charging-port'],
      relatedProblemIds: ['problem-not-charging', 'problem-no-power', 'problem-slow'],
      relatedBrandIds: ['brand-dell', 'brand-hp', 'brand-lenovo', 'brand-asus', 'brand-acer', 'brand-msi'],
      relatedResourcePaths: [
        { label: 'Laptop Battery Warning Signs', path: '/guides/laptop-battery-warning-signs' },
        { label: 'Laptop Repair Guide', path: '/laptop-repair-kuwait' },
      ],
      coreFeatures: [
        'Battery Health & Wear Analysis',
        'Cycle Count Verification',
        'Charging Circuit & Power Delivery Diagnostics',
        'USB-C Power Verification',
        'OEM Battery Replacement',
        'Premium Compatible Battery Installation',
        'MacBook, Dell, HP, Lenovo, ASUS, Acer & MSI Battery Replacement',
        'Swollen Battery Safe Removal & Disposal',
        'BIOS Battery Verification',
        'Battery Calibration',
        'Thermal Inspection Under Load',
        'Post-Replacement Stress Testing',
        'Free Pick & Drop'
      ], 
      brands: ['MacBook', 'Dell', 'HP', 'Lenovo', 'ASUS', 'Acer', 'MSI', 'Microsoft Surface'], 

      whyChooseUs: [
        { title: 'Charging Circuit Diagnosis First', description: 'Before replacing anything, we test whether the fault is actually the battery cell or the charging IC/power delivery circuit — replacing a battery doesn\'t fix a bad charging chip, and we\'d rather tell you that upfront than sell you a battery you don\'t need.' },
        { title: 'Transparent Battery Grade Options', description: 'We offer OEM manufacturer cells and premium compatible alternatives, and explain the real difference — protection circuitry, cycle life, and reporting accuracy — before you choose. We don\'t install uncertified low-cost cells that lack proper protection ICs, regardless of price pressure.' },
        { title: 'Battery Health Reporting', description: 'You receive an actual cycle count and health percentage reading before we quote, not a guess based on the laptop\'s age.' },
        { title: 'Swollen Battery Safety Protocol', description: 'A swollen lithium-ion cell is a genuine safety issue, not a cosmetic one. Removal follows a controlled, ESD-safe procedure — never a bare workbench.' },
        { title: 'Calibration & Verification, Not Just a Swap', description: 'Every replacement is followed by a calibration cycle, a full charge/discharge verification, and a thermal check under load — so you know the new battery is actually reporting and charging correctly before it leaves our lab.' },
        { title: 'Free Pickup & Delivery, Kuwait-Wide', description: 'Same-day battery replacement collected from and returned to your home or office anywhere in Kuwait.' },
        { title: 'No Fix, No Fee', description: 'If diagnosis shows the fault isn\'t the battery and we can\'t resolve it, you pay nothing for the diagnostic.' }
      ],

      commonIssues: [
        { 
          id: 'fast-drain', 
          title: 'Battery Drains in Under an Hour', 
          severity: 'medium', 
          description: 'Usually straightforward capacity loss from normal lithium-ion aging, accelerated by Kuwait\'s heat. We measure actual remaining capacity against factory spec before recommending replacement — a battery reporting 90%+ health draining this fast points to a software/background-process issue instead, which we\'ll flag rather than replace a healthy battery.' 
        },
        { 
          id: 'percentage-jump', 
          title: 'Battery Percentage Jumps or Skips Unexpectedly', 
          severity: 'medium', 
          description: 'A reported charge that suddenly jumps from, say, 60% to 30% is typically the battery\'s internal fuel gauge losing sync with the cell\'s real voltage curve as it ages — common once health drops meaningfully below new-battery baseline. A full recalibration sometimes resolves it; if it recurs, the cell itself needs replacing.' 
        },
        { 
          id: 'sudden-drop', 
          title: 'Battery Drops From 40% to 5% Almost Instantly', 
          severity: 'high', 
          description: 'A near-instant drop under load points to a cell that can no longer sustain voltage once demand increases — the reported percentage was accurate at idle but the battery physically can\'t deliver power at that "remaining" level anymore. This is a genuine replacement case, not a calibration issue.' 
        },
        { 
          id: 'sudden-shutdown', 
          title: 'Laptop Shuts Down at 20-30% Battery', 
          severity: 'high', 
          description: 'Often a sign the battery\'s voltage curve no longer matches what the system expects at that reported percentage — usually resolved with replacement, but we confirm it isn\'t a charging IC fault first.' 
        },
        { 
          id: 'refuses-to-charge', 
          title: 'Battery Plugged In But Refuses to Charge', 
          severity: 'high', 
          description: 'Can be a dead cell, a failed charging IC, a damaged charging port, or — occasionally — an underpowered or non-compliant charger. We test each stage of the power delivery path separately rather than assuming it\'s the battery.' 
        },
        { 
          id: 'only-works-plugged-in', 
          title: 'Laptop Only Powers On While Plugged In', 
          severity: 'high', 
          description: 'The battery is either fully depleted beyond recovery, internally disconnected, or reporting a fault state the system won\'t run from. We confirm which before quoting, since a disconnected-connector fix is a very different repair from a full cell replacement.' 
        },
        { 
          id: 'battery-not-detected', 
          title: 'Battery Not Detected / 0% and Won\'t Charge At All', 
          severity: 'high', 
          description: 'Can be a fully dead cell, a disconnected battery connector, or a failed charging IC on the motherboard — we isolate which before replacing parts.' 
        },
        { 
          id: 'swollen-battery', 
          title: 'Swollen Battery / Lifting Trackpad, Keyboard, or Chassis', 
          severity: 'critical', 
          description: 'Lithium-ion cells swell from internal gas buildup as they degrade, and the resulting pressure can lift the trackpad, distort the keyboard deck, push against the display, or stress the motherboard directly above it. This is a genuine fire/chemical risk, not a cosmetic issue — never puncture or press on a swollen cell, and stop using the device until it\'s removed. We handle removal under controlled, ESD-safe conditions with proper containment, same-day where possible.' 
        },
        { 
          id: 'overheat-charging', 
          title: 'Laptop Overheats While Charging', 
          severity: 'medium', 
          description: 'Rising internal resistance in an aging cell generates more heat per watt delivered, which is often mistaken for a cooling-system fault when the battery itself is the source. We check both independently before recommending a fix.' 
        },
        { 
          id: 'charging-pauses', 
          title: 'Charging Pauses or Stops Randomly', 
          severity: 'medium', 
          description: 'Frequently a thermal-protection cutoff triggering intermittently, or a loose internal connector losing contact under vibration. Both are diagnosable without assuming a battery swap is needed.' 
        },
        {
          id: 'macbook-battery-service-recommended',
          title: '"Service Recommended" / "Replace Now" macOS Battery Warning',
          severity: 'medium',
          description: 'macOS\'s own battery health indicator flags degraded cells before they cause visible symptoms — we replace the internal battery without affecting the rest of the motherboard.'
        },
        {
          id: 'short-runtime-full-charge',
          title: 'Short Runtime Even Right After a Full Charge',
          severity: 'medium',
          description: 'Direct evidence of capacity loss — the battery is genuinely holding less energy than its rated capacity, not a reporting error. We confirm the actual capacity reading against factory spec before quoting.'
        },
        {
          id: 'slow-charging',
          title: 'Charging Takes Much Longer Than It Used To',
          severity: 'low',
          description: 'Can be a degrading charging IC, a lower-wattage or non-original charger being used, or a battery whose internal resistance has increased with age — we test the charger and circuit separately from the cell.'
        }
      ], 

      process: [
        { step: 1, title: 'Free Pickup', description: 'We collect your laptop or MacBook from your home or office anywhere in Kuwait, same day where scheduling allows.' },
        { step: 2, title: 'Battery, Circuit & Thermal Diagnostic', description: 'We measure actual battery capacity and cycle count against factory spec, test the charging IC and power delivery circuit, and check thermal behavior under load — to confirm the battery, not the circuit, is the actual fault.' },
        { step: 3, title: 'Confirm the Fault & Quote', description: 'You get a written explanation of what\'s actually wrong and an itemized quote before any work starts — including whether an OEM or premium compatible battery is the right fit for your situation.' },
        { step: 4, title: 'Safe Removal & Replacement', description: 'For swollen cells, removal follows a controlled safety protocol. Connectors, dust, and internal cleanliness are checked while the device is open, then the new battery is fitted.' },
        { step: 5, title: 'Calibration', description: 'The new battery is calibrated so the system\'s reported charge percentage accurately matches its real capacity from day one.' },
        { step: 6, title: 'Charge-Cycle & Stress Verification', description: 'A full charge/discharge cycle and a thermal check under load confirm the battery holds and reports capacity correctly before the device is returned to you.' }
      ],

      performanceOutcomes: {
        disclaimer: 'The figures below are representative outcomes for this repair category based on typical before/after results, not a specific customer\'s guaranteed result — every repair is quoted after its own diagnostic.',
        items: [
          { metric: 'Reported Battery Health', outcome: 'Devices arriving at 40-60% health typically return to 95-100% of rated capacity after OEM replacement.' },
          { metric: 'Unplugged Runtime', outcome: 'Laptops previously lasting 1-2 hours unplugged commonly return to 4-8+ hours depending on model and usage.' },
          { metric: 'Sudden Shutdowns', outcome: 'Eliminated in the large majority of cases where the root cause was a genuinely degraded cell rather than a charging circuit fault.' },
          { metric: 'Percentage Reporting Accuracy', outcome: 'Erratic or jumping percentage readings typically resolve after calibration, provided the fuel-gauge desync wasn\'t caused by a failing cell underneath it.' }
        ]
      },

      repairExamples: {
        disclaimer: 'These are representative repair scenarios illustrating common fault categories we service, not records of a specific named customer.',
        items: [
          {
            id: 'swollen-battery-emergency',
            title: 'MacBook Air: Swollen Battery Lifting the Trackpad',
            symptoms: 'The trackpad had become slightly raised on one side and no longer clicked evenly.',
            diagnosis: 'Visual and physical inspection confirmed battery swelling consistent with age-related cell degradation.',
            repair: 'The swollen cell was safely removed under controlled conditions and replaced with a new battery matched to the model.',
            outcome: 'The trackpad returned to its correct, flush position and the device passed a full charge-cycle test.'
          },
          {
            id: 'charging-ic-vs-battery',
            title: 'Windows Laptop: Misdiagnosed as a "Dead Battery"',
            symptoms: 'The laptop would only run while plugged in and showed 0% battery at all times, even after hours of charging.',
            diagnosis: 'Circuit-level testing found the charging IC itself had failed, while the battery cell tested as healthy.',
            repair: 'The charging IC was replaced rather than the battery, avoiding an unnecessary battery purchase.',
            outcome: 'The laptop charged and reported battery percentage normally, running for several hours unplugged as expected.'
          },
          {
            id: 'fuel-gauge-desync',
            title: 'Business Laptop: Battery Percentage Jumping Unpredictably',
            symptoms: 'The reported charge would jump from around 55% straight down to 20% with no gradual decline in between.',
            diagnosis: 'Capacity testing showed the cell itself was still within an acceptable range, but the fuel gauge had desynced from the actual voltage curve.',
            repair: 'A full calibration cycle (complete discharge and recharge) resynced the fuel gauge to the battery\'s real behavior.',
            outcome: 'Percentage reporting became linear and predictable again, with no battery replacement needed.'
          }
        ]
      },

      inspectionChecklist: [
        'Battery capacity vs. factory-rated spec',
        'Charge cycle count',
        'Physical inspection for swelling or deformation',
        'Charging IC / power delivery circuit test',
        'USB-C power delivery verification (where applicable)',
        'Internal battery connector and cable integrity',
        'Thermal behavior under charging load',
        'Charge/discharge cycle verification after replacement',
        'Fuel-gauge calibration accuracy'
      ],

      faqs: [
        {
          id: 'faq-battery-replacement-time',
          title: 'How long does battery replacement take?',
          answer: 'Same-day for most models when the correct battery is in stock, since it\'s a basic-level hardware swap rather than a chip-level repair — diagnosis, replacement, calibration, and verification typically fit into a single visit.'
        },
        {
          id: 'faq-battery-vs-performance',
          title: 'Will replacing my battery also improve my laptop\'s overall performance?',
          answer: 'It resolves anything caused by power delivery instability — random shutdowns, throttling from an unstable power state, or the system limiting performance because it can\'t trust the battery\'s reported charge. It won\'t speed up a laptop that\'s slow for unrelated reasons like an aging hard drive or insufficient RAM.'
        },
        {
          id: 'faq-replace-vs-new-laptop',
          title: 'Should I replace the battery or just buy a new laptop?',
          answer: 'If the rest of the machine — screen, keyboard, motherboard, storage — is in good condition, battery replacement is almost always the far cheaper path to a laptop that works like new again. We\'ll tell you honestly if we think the device has other issues that make replacement a better call.'
        },
        {
          id: 'faq-data-loss-battery',
          title: 'Can I lose data during battery replacement?',
          answer: 'No. Battery replacement is a hardware-only procedure that doesn\'t touch your storage drive, operating system, or files.'
        },
        {
          id: 'faq-battery-swelling-safety',
          title: 'Is battery swelling dangerous?',
          answer: 'Yes, treat it as a genuine safety issue. A swollen cell has built up internal gas pressure and carries a real fire/chemical risk if punctured or damaged further. Stop using the device, don\'t press on the swollen area, and don\'t leave it charging unattended — arrange removal as soon as possible.'
        },
        {
          id: 'faq-how-to-know-battery-failing',
          title: 'How do I know if my battery is actually failing?',
          answer: 'Watch for runtime noticeably shorter than when the laptop was new, sudden shutdowns at a non-zero percentage, a battery health warning from macOS or Windows, or any visible swelling. Any of these is worth a free diagnostic rather than guessing.'
        },
        {
          id: 'faq-diagnose-before-replace',
          title: 'Do you test battery health before replacing it?',
          answer: 'Always. We measure actual capacity and cycle count against factory spec and test the charging circuit separately, because a battery that tests healthy but still causes symptoms usually means the fault is elsewhere in the power delivery path.'
        },
        {
          id: 'faq-macbook-battery',
          title: 'Can you replace MacBook batteries?',
          answer: 'Yes — MacBook Air and MacBook Pro across all generations, as an internal battery replacement that doesn\'t affect the rest of the motherboard or your data.'
        },
        {
          id: 'faq-charging-not-battery',
          title: 'Can charging problems be caused by something other than the battery?',
          answer: 'Yes, frequently. A failed charging IC, a damaged charging port, a faulty or non-original charger, or a loose internal connector can all produce symptoms that look identical to a dead battery. This is exactly why we test the full circuit before quoting a battery replacement.'
        },
        {
          id: 'faq-battery-lifespan',
          title: 'How long do replacement batteries last?',
          answer: 'Typically 2-4 years or several hundred charge cycles under normal use, similar to the original battery\'s expected lifespan — Kuwait\'s heat is the main factor that shortens this, the same as it did for the original cell.'
        },
        {
          id: 'faq-oem-vs-compatible-vs-cheap',
          title: 'What\'s the difference between OEM, premium compatible, and cheap replacement batteries?',
          answer: 'OEM batteries are genuine manufacturer-spec cells with matching capacity and certified protection circuitry. Premium compatible batteries are third-party alternatives that can be a reasonable lower-cost option when built with proper protection ICs and safety certification. Low-cost, uncertified cells — the kind sold without proper protection circuitry — are more prone to inaccurate reporting, faster degradation, and heat issues, which is why we don\'t install them regardless of price pressure. We disclose which grade we\'re quoting and why before you approve the repair.'
        },
        {
          id: 'faq-battery-warranty',
          title: 'Do replacement batteries include a warranty?',
          answer: 'Yes, 30 days covering both the battery and the labor.'
        },
        {
          id: 'faq-overheat-damage-battery',
          title: 'Can overheating damage the battery over time?',
          answer: 'Yes. Sustained heat — from Kuwait\'s climate, a laptop left in a hot car, or a cooling system that isn\'t working properly — accelerates lithium-ion degradation regardless of how carefully the battery is otherwise used.'
        }
      ],

      warranty: { duration: '30 Days', coverage: 'Battery and labor.', noFixNoFee: true }, 
      contentImages: [
        {
          src: IMAGES.laptopHardware.hpBattery2.src,
          alt: IMAGES.laptopHardware.hpBattery2.alt,
          width: IMAGES.laptopHardware.hpBattery2.width,
          height: IMAGES.laptopHardware.hpBattery2.height,
          placement: 'commonIssues',
          caption: 'A mainstream laptop battery replacement example used during battery-health and power diagnosis.'
        },
        {
          src: IMAGES.macbook.expandedBattery.src,
          alt: IMAGES.macbook.expandedBattery.alt,
          width: IMAGES.macbook.expandedBattery.width,
          height: IMAGES.macbook.expandedBattery.height,
          placement: 'coreFeatures',
          caption: 'A swollen battery safely removed — swollen cells are handled and disposed of with proper safety precautions.'
        },
        {
          src: IMAGES.laptopHardware.hpBattery2.src,
          alt: IMAGES.laptopHardware.hpBattery2.alt,
          width: IMAGES.laptopHardware.hpBattery2.width,
          height: IMAGES.laptopHardware.hpBattery2.height,
          placement: 'process',
          caption: 'Installing and calibrating a replacement battery as the final step before post-repair stress testing.'
        }
      ],
      seo: { 
        title: 'Laptop Battery Replacement Cost Kuwait | From 8 KWD | KCROC', 
        description: 'Laptop battery replacement from 8 KWD + part. We test battery health and charging faults first, with same-day service, free pickup and a 30-day warranty.', 
        canonicalUrl: 'https://www.computerrepairkuwait.com/battery-replacement-kuwait', 
        locale: 'en_KW',
        alternates: { 'en-KW': 'https://www.computerrepairkuwait.com/battery-replacement-kuwait', 'ar-KW': 'https://www.computerrepairkuwait.com/ar/battery-replacement-kuwait', 'x-default': 'https://www.computerrepairkuwait.com/battery-replacement-kuwait' },
        ogType: 'article', 
        schemaTypes: ['Service', 'FAQPage'] 
      },
      navigationPriority: 50, 
      isFeatured: false, 
      popular: false
    } as ServiceEntity,

    /* ═══════════════════════════════════════════════════════════════
       LOCATION
    ═══════════════════════════════════════════════════════════════ */
    'loc-hawalli': { id: 'loc-hawalli', slug: 'hawalli', entityType: 'Location', isActive: true, isPhysicalLocation: true, title: 'Hawalli Repair Center', description: 'Professional laptop, MacBook, gaming PC and motherboard repair from KCROC\'s Hawalli service location, with pickup and delivery available across Kuwait.', landmark: 'Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19', coords: { lat: 29.3416921515256, lng: 48.00761257498341 }, serviceRadiusKm: 40, serviceAreas: ['Hawalli', 'Salmiya', 'Kuwait City', 'Farwaniya', 'Ahmadi', 'Jahra', 'Fahaheel', 'Mishrif'], contentImage: { src: IMAGES.brand.shopExteriorDay.src, alt: IMAGES.brand.shopExteriorDay.alt, width: IMAGES.brand.shopExteriorDay.width, height: IMAGES.brand.shopExteriorDay.height, caption: 'Our repair center at Al Mullah Complex, Ibn Khaldoun St, Hawalli.' }, seo: { title: 'Computer & Laptop Repair Hawalli | KCROC', description: 'Computer and laptop repair in Hawalli at KCROC, Al Mullah Complex on Ibn Khaldoun Street. Get fault diagnosis, a clear quote before repair, free pickup and delivery across Kuwait, and a 30-day repair warranty.', canonicalUrl: 'https://www.computerrepairkuwait.com/location/hawalli', alternates: { 'en-KW': 'https://www.computerrepairkuwait.com/location/hawalli', 'ar-KW': 'https://www.computerrepairkuwait.com/ar/computer-repair-hawalli', 'x-default': 'https://www.computerrepairkuwait.com/location/hawalli' }, ogType: 'website', schemaTypes: ['LocalBusiness'], lastModified: '2026-10-10T00:00:00+03:00' }, relatedServiceIds: ['srv-gaming', 'srv-laptop', 'srv-motherboard', 'srv-gaming-laptop-cleaning'], navigationPriority: 100 } as LocationEntity,

    'loc-kuwait-city': { 
      id: 'loc-kuwait-city', slug: 'kuwait-city', entityType: 'Location', isActive: true, isPhysicalLocation: false, localIntro: "Kuwait City is close to our Hawalli lab, so collection and return for Sharq, Dasman, Mirqab and Qibla is simple to arrange: you message us, we collect the device, diagnose it on the bench and bring it back once it has been tested. This page focuses on the faults people most often need sorted quickly in the city: black or cracked screens, laptops that will not power on, and charging problems.", localHighlights: [
        { title: "Pickup from Sharq, Dasman, Mirqab and Qibla", description: "Send your area and the fault on WhatsApp and we will arrange free collection from your home or office." },
        { title: "Screen faults handled properly", description: "Cracked or black displays are checked to separate a failed panel from a cable, backlight or board fault before you are quoted." },
        { title: "Dead laptops traced to the component", description: "If a laptop will not power on, we test the power path first and repair the failed component where possible instead of defaulting to a new board." },
        { title: "Repaired in Hawalli, returned to you", description: "Kuwait City is a service area, not a walk-in branch. Every device is repaired at our Hawalli lab and delivered back free." },
      ], localFaqs: [
        { id: "faq-kuwait-city-local-1", question: "Can you collect a laptop from an office in Kuwait City?", answer: "Yes. Free pickup is available from offices and homes in Kuwait City, including Sharq, Dasman, Mirqab and Qibla. Message us the area and the fault and we will arrange a collection time." },
        { id: "faq-kuwait-city-local-2", question: "My laptop screen is black but the laptop seems to be on. Can you check it from Kuwait City?", answer: "Yes. A black screen can come from the panel, the display cable, the backlight circuit or the motherboard. We diagnose it at the lab and tell you which one it is before you approve any repair." },
        { id: "faq-kuwait-city-local-3", question: "I need my laptop back urgently. Can you do it quickly?", answer: "Same-day service is possible for some screen and battery jobs when the part is in stock, and many repairs take 24-48 hours after we receive the device. Component-level motherboard work usually takes longer. Tell us your deadline when you message us and we will say what is realistic." },
        { id: "faq-kuwait-city-local-4", question: "I dropped my laptop and the screen is cracked. Is it only the screen?", answer: "Often it is, but a drop can also damage the display cable or the board. If you can connect the laptop to an external monitor or TV and the picture is fine, the panel is the likely cause. We confirm before quoting, and screen replacement starts from 30 KWD." },
        { id: "faq-kuwait-city-local-5", question: "My laptop will not turn on before an important meeting. What can I check quickly?", answer: "Try a different outlet, check the charger light and hold the power button for about 15 seconds. If it is still dead, message us the model and what happened just before it stopped. We trace dead laptops to the failed component instead of guessing." },
        { id: "faq-kuwait-city-local-6", question: "Is there a branch in Kuwait City, and what if you cannot fix it?", answer: "There is no branch in Kuwait City. Devices are repaired at our Hawalli lab (Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19) and delivered back for free. Under our No Fix, No Fee policy you pay nothing if we cannot fix it, and repairs carry a 30-day warranty." },
      ], title: 'Kuwait City', description: 'Fast, professional corporate IT support and component-level laptop repair for businesses and residents in Kuwait City.', landmark: 'Mobile Dispatch Area (Equipment processed at our central Hawalli workshop: Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19)', coords: { lat: 29.3759, lng: 47.9774 }, serviceRadiusKm: 15, serviceAreas: ['Kuwait City', 'Sharq', 'Dasman', 'Mirqab', 'Qibla'], 
      contentImage: { src: IMAGES.brand.technicians.src, alt: IMAGES.brand.technicians.alt, width: IMAGES.brand.technicians.width, height: IMAGES.brand.technicians.height, caption: 'Our technicians handling component-level laptop repair for businesses and residents across Kuwait City.' },
      seo: { title: 'Laptop Repair Kuwait City | Free Pickup, No Fix No Fee', description: 'Free pickup in Kuwait City, Sharq, Dasman, Mirqab and Qibla. Black or cracked screens, no power and charging faults diagnosed free. 30-day warranty.', canonicalUrl: 'https://www.computerrepairkuwait.com/location/kuwait-city', alternates: { 'en-KW': 'https://www.computerrepairkuwait.com/location/kuwait-city', 'ar-KW': 'https://www.computerrepairkuwait.com/ar/computer-repair-kuwait-city', 'x-default': 'https://www.computerrepairkuwait.com/location/kuwait-city' }, ogType: 'website', schemaTypes: ['LocalBusiness'], lastModified: '2026-09-27T00:00:00+03:00' }, 
      relatedServiceIds: ['srv-gaming', 'srv-laptop', 'srv-motherboard', 'srv-gaming-laptop-cleaning'], navigationPriority: 95 
    } as LocationEntity,
    
    'loc-salmiya': { id: 'loc-salmiya', slug: 'salmiya', entityType: 'Location', isActive: true, isPhysicalLocation: false, localIntro: "Salmiya customers can skip the drive: we collect the device, repair it at our Hawalli lab and return it after testing. The Salmiya service area also covers Rumaithiya, Salwa and Bidaa. This page leans on liquid damage, MacBook and motherboard repair, because those are the faults where component-level work makes the biggest difference to the final bill.", localHighlights: [
        { title: "Pickup from Salmiya, Rumaithiya, Salwa and Bidaa", description: "Tell us your block or landmark on WhatsApp and we will arrange free collection." },
        { title: "Liquid damage recovery", description: "Spills are treated as an urgent job: the board is cleaned and tested at component level so the original board can often be saved rather than replaced." },
        { title: "MacBook and laptop motherboard work", description: "Faults are traced to the failed chip or circuit, which is usually more economical than a full board swap." },
        { title: "One lab, one point of accountability", description: "Salmiya is a service area. All repairs are done in Hawalli and covered by our 30-day warranty." },
      ], localFaqs: [
        { id: "faq-salmiya-local-1", question: "I spilled water on my laptop in Salmiya. What should I do before you collect it?", answer: "Switch it off, unplug the charger and do not try to power it on again. Message us on WhatsApp and we will arrange pickup so the board can be cleaned and tested as soon as possible." },
        { id: "faq-salmiya-local-2", question: "Do you collect from Rumaithiya, Salwa and Bidaa as well?", answer: "Yes. These areas fall inside our Salmiya service zone and get the same free pickup and delivery." },
        { id: "faq-salmiya-local-3", question: "Can a MacBook with liquid damage be repaired without replacing the whole logic board?", answer: "Often, yes. We clean the board and trace the damage to the specific failed components, then repair those at component level where that is technically possible. Whether it can be saved depends on how far the damage has spread, which we confirm after diagnosis." },
        { id: "faq-salmiya-local-4", question: "Will my files be safe if the board is repaired?", answer: "A component-level repair works on the board itself, so your storage is not wiped as part of it. We cannot promise data survival after liquid damage, because it depends on the condition of the board and the storage. If the laptop still works, back up what you can before the repair." },
        { id: "faq-salmiya-local-5", question: "Can I get a quote before approving the repair?", answer: "Yes. Diagnostics are free, and you receive the confirmed quote before any paid work begins. Under our No Fix, No Fee policy you pay nothing if we cannot fix it, and pickup and delivery from Salmiya are free." },
        { id: "faq-salmiya-local-6", question: "Where is my device actually repaired?", answer: "There is no storefront in Salmiya. Your device is repaired at our Hawalli lab (Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19), tested before return, and covered by a 30-day warranty." },
      ], title: 'Salmiya', description: 'Fast, professional computer and laptop repair services for residents and businesses in Salmiya.', landmark: 'Mobile Dispatch Area (Equipment processed at our central Hawalli workshop: Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19)', coords: { lat: 29.3400, lng: 48.0800 }, serviceRadiusKm: 15, serviceAreas: ['Salmiya', 'Rumaithiya', 'Salwa', 'Bidaa'], contentImage: { src: IMAGES.services.laptopRepair.src, alt: IMAGES.services.laptopRepair.alt, width: IMAGES.services.laptopRepair.width, height: IMAGES.services.laptopRepair.height, caption: 'Professional laptop repair for residents and businesses across Salmiya.' }, seo: { title: 'Computer Repair Salmiya | Free Pickup, Open Till 10 PM | KCROC', description: 'Laptop and computer repair in Salmiya with free pickup and delivery. Devices are diagnosed and repaired at KCROC\'s central Hawalli lab.', canonicalUrl: 'https://www.computerrepairkuwait.com/location/salmiya', alternates: { 'en-KW': 'https://www.computerrepairkuwait.com/location/salmiya', 'ar-KW': 'https://www.computerrepairkuwait.com/ar/computer-repair-salmiya', 'x-default': 'https://www.computerrepairkuwait.com/location/salmiya' }, ogType: 'website', schemaTypes: ['LocalBusiness'], lastModified: '2026-09-27T00:00:00+03:00' }, navigationPriority: 90 } as LocationEntity,

    'loc-farwaniya': { id: 'loc-farwaniya', slug: 'farwaniya', entityType: 'Location', isActive: true, isPhysicalLocation: false, title: 'Farwaniya', description: 'Computer and laptop repair for Farwaniya, with a practical focus on power, charging, display, battery and motherboard faults and free pickup to KCROC\'s Hawalli workshop.', localIntro: 'For Farwaniya customers, the easiest path is usually pickup rather than driving to a shop. KCROC collects the device, performs the diagnosis in the Hawalli lab, explains the repair path and returns the device after testing. The Farwaniya service area includes Khaitan, Riggae, Ardiya and Jleeb Al-Shuyoukh.', localHighlights: [
        { title: 'Pickup from Farwaniya, Khaitan and Riggae', description: 'Tell us your area and device symptom and we can arrange the collection through the Kuwait-wide pickup service.' },
        { title: 'Power and charging diagnosis', description: 'For dead laptops, loose charging ports and no-charge symptoms, the power path is tested before a motherboard replacement is recommended.' },
        { title: 'Screen, battery and motherboard work', description: 'The page connects Farwaniya customers directly to the relevant repair services instead of forcing them through a generic computer-repair page.' },
        { title: 'Repair happens at the Hawalli lab', description: 'Farwaniya is a service area, not a walk-in branch. Devices are processed at the central KCROC repair lab and delivered back after testing.'
        },
      ], localFaqs: [
        { id: "faq-farwaniya-local-1", question: "Do you collect from Khaitan, Riggae, Ardiya and Jleeb Al-Shuyoukh?", answer: "Yes. Farwaniya, Khaitan, Riggae, Ardiya and Jleeb Al-Shuyoukh are covered by free pickup and delivery. Send your area and device symptoms on WhatsApp and we will arrange collection." },
        { id: "faq-farwaniya-local-2", question: "My charger is plugged in but the laptop is not charging. Is it the charger, the port or the board?", answer: "Check for a charging light, try another outlet and, if you can, another compatible charger. If the cable needs to be held at an angle to charge, the port is likely loose. We test the adapter, the port and the power path on the bench before recommending a motherboard replacement." },
        { id: "faq-farwaniya-local-3", question: "My laptop turns on but the screen stays black. What does that mean?", answer: "If the power light and fans come on but the display is black, shine a torch at the screen. A faint image points to the backlight, and an external monitor that works points to the panel or cable. If neither shows anything, the fault may be on the board. We diagnose before quoting, and you pay nothing if we cannot fix it." },
        { id: "faq-farwaniya-local-4", question: "Should I send the charger with the laptop?", answer: "It helps to include the charger you normally use, because charging faults can involve the adapter as well as the laptop. Mention anything you noticed, such as a burning smell, a loose plug or the laptop only charging at certain angles." },
        { id: "faq-farwaniya-local-5", question: "My battery drops from 30 percent to zero. Is it the battery or something else?", answer: "It can be a worn battery, but the charging circuit can also give the same symptom, so we check both. If the battery needs replacing, we explain the available options before you choose." },
        { id: "faq-farwaniya-local-6", question: "Is there a branch in Farwaniya, and where is the repair done?", answer: "There is no walk-in branch in Farwaniya. Devices are repaired at our Hawalli lab (Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19), open daily from 10:00 AM to 10:00 PM. You can bring a device in yourself or have it collected for free, and repairs carry a 30-day warranty." },
      ], landmark: 'Mobile Dispatch Area (Equipment processed at our central Hawalli workshop: Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19)', coords: { lat: 29.2770, lng: 47.9590 }, serviceRadiusKm: 20, serviceAreas: ['Farwaniya', 'Khaitan', 'Riggae', 'Ardiya', 'Jleeb Al-Shuyoukh'], contentImage: { src: IMAGES.services.motherboardRepair.src, alt: IMAGES.services.motherboardRepair.alt, width: IMAGES.services.motherboardRepair.width, height: IMAGES.services.motherboardRepair.height, caption: 'Chip-level motherboard repair and screen replacement serving the Farwaniya governorate.' }, seo: { title: 'Computer & Laptop Repair Farwaniya | KCROC', description: 'Computer and laptop repair for Farwaniya, Khaitan, Riggae, Ardiya and Jleeb Al-Shuyoukh. Free pickup to KCROC’s Hawalli lab, diagnosis and a clear quote before repair, plus return delivery and a 30-day warranty.', canonicalUrl: 'https://www.computerrepairkuwait.com/location/farwaniya', alternates: { 'en-KW': 'https://www.computerrepairkuwait.com/location/farwaniya', 'ar-KW': 'https://www.computerrepairkuwait.com/ar/computer-repair-farwaniya', 'x-default': 'https://www.computerrepairkuwait.com/location/farwaniya' }, ogType: 'website', schemaTypes: ['LocalBusiness'], lastModified: '2026-10-10T00:00:00+03:00' }, navigationPriority: 80 } as LocationEntity,

    'loc-jahra': { id: 'loc-jahra', slug: 'jahra', entityType: 'Location', isActive: true, isPhysicalLocation: false, localIntro: "Jahra is further from our Hawalli lab than most service areas, which is exactly why pickup matters: you do not need to make the trip. We collect from Jahra, Saad Al Abdullah, Naeem, Qasr and Taima, repair the device in Hawalli and return it once it has passed testing. Overheating, thermal maintenance and motherboard diagnostics are the main focus here.", localHighlights: [
        { title: "Pickup from Jahra, Naeem, Qasr, Taima and Saad Al Abdullah", description: "Share your area and device on WhatsApp and we will arrange free collection and return." },
        { title: "Thermal repasting and cleaning", description: "Laptops and gaming PCs that run hot or throttle are cleaned and repasted, with temperatures checked afterwards." },
        { title: "Motherboard diagnostics", description: "Dead or unstable machines are traced to the failed component before any board replacement is suggested." },
        { title: "No trip to Hawalli", description: "Jahra is a service area, not a walk-in branch. The drive is ours, not yours." },
      ], localFaqs: [
        { id: "faq-jahra-local-1", question: "Is pickup from Jahra really free given the distance?", answer: "Yes. Pickup and delivery are free from Jahra, Saad Al Abdullah, Naeem, Qasr and Taima. The drive to Hawalli is our cost, not yours." },
        { id: "faq-jahra-local-2", question: "My gaming laptop gets very hot and the fans are loud. What should I do?", answer: "Stop heavy use, keep the laptop on a hard flat surface and check that the vents are not blocked with dust. Dust and dried thermal paste are the most common causes. We clean the fans and heatsink, replace the paste and check cooling before looking at anything else." },
        { id: "faq-jahra-local-3", question: "How do I know when a laptop needs cleaning and repasting?", answer: "There is no fixed date. The signs are fans that run loudly at idle, performance that drops during games or video calls, a chassis that is too hot to touch, and sudden shutdowns. If you notice any of these, message us before the problem damages other components." },
        { id: "faq-jahra-local-4", question: "My laptop switches itself off under load. Is it overheating or a motherboard fault?", answer: "It can be either. Overheating shutdowns are a protective cut-off, while a failing power circuit can look the same. We check temperatures under load first, then test the power path on the bench before suggesting board work." },
        { id: "faq-jahra-local-5", question: "Can you collect a laptop from Jahra if it will not turn on at all?", answer: "Yes. Tell us what happened before it stopped and what lights, if any, come on. Collection is free, and the motherboard is diagnosed at the lab. You pay nothing if we cannot fix it." },
        { id: "faq-jahra-local-6", question: "Where is my laptop repaired, and do I have to travel?", answer: "You do not need to travel. Jahra is a service area, not a branch, and devices are repaired at our Hawalli lab (Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19). Repairs carry a 30-day warranty." },
      ], title: 'Jahra', description: 'Comprehensive computer repair, thermal repasting, and motherboard diagnostics delivered directly to Jahra.', landmark: 'Mobile Dispatch Area (Equipment processed at our central Hawalli workshop: Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19)', coords: { lat: 29.3370, lng: 47.6580 }, serviceRadiusKm: 40, serviceAreas: ['Jahra', 'Saad Al Abdullah', 'Naeem', 'Qasr', 'Taima'], contentImage: { src: IMAGES.motherboard.thermalGrizzly1.src, alt: IMAGES.motherboard.thermalGrizzly1.alt, width: IMAGES.motherboard.thermalGrizzly1.width, height: IMAGES.motherboard.thermalGrizzly1.height, caption: 'Thermal repasting and motherboard diagnostics delivered directly to Jahra.' }, seo: { title: 'Computer Repair Jahra | Free Pickup, Open Till 10 PM | KCROC', description: 'Computer and laptop repair in Jahra with free pickup and delivery, including thermal maintenance and motherboard diagnostics at KCROC\'s Hawalli lab.', canonicalUrl: 'https://www.computerrepairkuwait.com/location/jahra', alternates: { 'en-KW': 'https://www.computerrepairkuwait.com/location/jahra', 'ar-KW': 'https://www.computerrepairkuwait.com/ar/computer-repair-jahra', 'x-default': 'https://www.computerrepairkuwait.com/location/jahra' }, ogType: 'website', schemaTypes: ['LocalBusiness'], lastModified: '2026-09-27T00:00:00+03:00' }, navigationPriority: 70 } as LocationEntity,

    'loc-ahmadi': { id: 'loc-ahmadi', slug: 'ahmadi', entityType: 'Location', isActive: true, isPhysicalLocation: false, localIntro: "Ahmadi and southern Kuwait are served through free pickup rather than a long drive to Hawalli. We collect from Ahmadi, Fahaheel, Mangaf, Mahboula and Sabahiya, repair the device at our lab and deliver it back after testing. Gaming PCs, MacBooks and thermal problems are the focus of this page.", localHighlights: [
        { title: "Pickup from Ahmadi, Fahaheel, Mangaf, Mahboula and Sabahiya", description: "Message us your area and the fault and we will arrange free collection." },
        { title: "Gaming PC and gaming laptop service", description: "Overheating, crashes and performance drops are diagnosed on the bench, including cleaning and thermal work." },
        { title: "MacBook diagnostics", description: "Power, charging and liquid-damage faults are traced to the component level." },
        { title: "Repaired in Hawalli", description: "Ahmadi is a service area. All work is done at our central lab and covered by our 30-day warranty." },
      ], localFaqs: [
        { id: "faq-ahmadi-local-1", question: "Do you cover Mahboula and Sabahiya as part of Ahmadi?", answer: "Yes. Ahmadi, Fahaheel, Mangaf, Mahboula and Sabahiya are one pickup zone with free collection and delivery." },
        { id: "faq-ahmadi-local-2", question: "Can you collect a full gaming PC tower from Ahmadi?", answer: "Yes. Message us the main components, whether it has a liquid cooler, and what the PC is doing. We arrange collection of the whole machine, then diagnose and service it at the lab." },
        { id: "faq-ahmadi-local-3", question: "My PC keeps crashing or restarting during games. What could be causing it?", answer: "Common causes are heat, a power supply that cannot hold up under load, unstable memory or a failing graphics card. We test under load to find which one it is, instead of replacing parts by guesswork." },
        { id: "faq-ahmadi-local-4", question: "My PC turns on but nothing appears on the monitor. What can I try first?", answer: "Check that the monitor cable is plugged into the graphics card and not the motherboard port, then try another cable or display. If there is still no picture, send us the details, including any beeps or lights. We diagnose before quoting." },
        { id: "faq-ahmadi-local-5", question: "My MacBook will not start or has no display. Can you diagnose it?", answer: "Yes. We trace MacBook power and display faults at component level where that is technically possible, and explain the diagnosis and repair path before any paid work." },
        { id: "faq-ahmadi-local-6", question: "Where do you repair devices collected from Ahmadi?", answer: "At our Hawalli lab (Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19), open daily from 10:00 AM to 10:00 PM. Ahmadi is a service area, not a branch, and repairs carry a 30-day warranty." },
      ], title: 'Ahmadi', description: 'Premium gaming PC repair and Apple MacBook diagnostics serving Ahmadi and southern Kuwait.', landmark: 'Mobile Dispatch Area (Equipment processed at our central Hawalli workshop: Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19)', coords: { lat: 29.0833, lng: 48.0833 }, serviceRadiusKm: 30, serviceAreas: ['Ahmadi', 'Fahaheel', 'Mangaf', 'Mahboula', 'Sabahiya'], contentImage: { src: IMAGES.gaming.rgbLighting.src, alt: IMAGES.gaming.rgbLighting.alt, width: IMAGES.gaming.rgbLighting.width, height: IMAGES.gaming.rgbLighting.height, caption: 'Gaming PC and Apple MacBook diagnostics serving Ahmadi and southern Kuwait.' }, seo: { title: 'Computer Repair Ahmadi | Free Pickup, Open Till 10 PM | KCROC', description: 'Laptop, MacBook and gaming PC repair in Ahmadi, Fahaheel, Mangaf and Mahboula, with free pickup and delivery to KCROC\'s Hawalli lab.', canonicalUrl: 'https://www.computerrepairkuwait.com/location/ahmadi', ogType: 'website', schemaTypes: ['LocalBusiness'], lastModified: '2026-09-27T00:00:00+03:00' }, navigationPriority: 60 } as LocationEntity,

    // 🚀 NEW: Fahaheel, Mangaf, and Abu Halifa were previously only mentioned
    // as text inside Hawalli's and Ahmadi's `serviceAreas` arrays — they had
    // no dedicated entity, so /location/fahaheel etc. 404'd and none of the
    // three had their own indexable page, meta tags, or LocalBusiness schema.
    // Each gets its own entity below (same LocationDeepTemplate pattern as
    // Salmiya/Farwaniya/Jahra/Ahmadi) with a distinct angle and image per
    // page so the cluster doesn't read as templated duplicate content.
    'loc-fahaheel': { id: 'loc-fahaheel', slug: 'fahaheel', entityType: 'Location', isActive: true, isPhysicalLocation: false, localIntro: "For Fahaheel families and residents, the simplest route is pickup: we collect the laptop, MacBook or gaming PC, diagnose it in our Hawalli lab and return it after testing. The Fahaheel zone also takes in Mangaf, Abu Halifa and Sabah Al-Ahmad Sea City.", localHighlights: [
        { title: "Pickup across Fahaheel, Mangaf and Abu Halifa", description: "Send your area on WhatsApp and we will arrange free collection and delivery." },
        { title: "Dead and no-charge laptops", description: "Power and charging faults are traced to the specific component rather than assumed to be a full motherboard failure." },
        { title: "Overheating and liquid damage", description: "Cleaning, repasting and board-level liquid-damage work, all carried out at our lab." },
        { title: "Not a local shop, and clear about it", description: "Fahaheel is a service area. You are not sent to a branch that does not exist: devices are repaired in Hawalli." },
      ], localFaqs: [
        { id: "faq-fahaheel-local-1", question: "Do you collect from Sabah Al-Ahmad Sea City?", answer: "Yes. Fahaheel, Mangaf, Abu Halifa and Sabah Al-Ahmad Sea City are covered by free pickup and delivery. Send your area on WhatsApp to arrange a time." },
        { id: "faq-fahaheel-local-2", question: "My laptop is completely dead. What information helps you diagnose it?", answer: "Tell us when it stopped, whether it was dropped or exposed to liquid, whether the charger light comes on and whether the fans or any lights respond. That tells us where to start on the bench. You pay nothing if we cannot fix it." },
        { id: "faq-fahaheel-local-3", question: "My laptop stopped charging after I used a different charger. Can that be repaired?", answer: "Often yes. A wrong or faulty adapter can leave the charging circuit or the port damaged. We test the adapter, port and power path before recommending any board work." },
        { id: "faq-fahaheel-local-4", question: "I spilled a sweet drink on my laptop. Is that worse than water?", answer: "Yes, it can be. Sugar and milk residue stay on the board and keep causing damage after the liquid dries. Switch the laptop off, unplug it and message us as soon as possible, and do not try to power it on to check." },
        { id: "faq-fahaheel-local-5", question: "My laptop overheats and shuts down. Is it safe to keep using it?", answer: "It is better to stop. Repeated overheating shutdowns put stress on the board and battery. We clean the cooling system, replace the paste and test the machine under load before it is returned." },
        { id: "faq-fahaheel-local-6", question: "Is there a shop in Fahaheel?", answer: "No. Fahaheel is a service area, not a branch. Devices are repaired at our Hawalli lab (Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19), and we collect and deliver for free." },
      ], title: 'Fahaheel', description: 'Free pickup and delivery for laptop, MacBook, and gaming PC repair across Fahaheel\'s residential and family communities, with every device diagnosed at KCROC\'s Hawalli lab.', landmark: 'Mobile Dispatch Area (Equipment processed at our central Hawalli workshop: Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19)', coords: { lat: 29.0810, lng: 48.1288 }, serviceRadiusKm: 20, serviceAreas: ['Fahaheel', 'Mangaf', 'Abu Halifa', 'Sabah Al-Ahmad Sea City'], contentImage: { src: IMAGES.macbook.logicBoard.src, alt: IMAGES.macbook.logicBoard.alt, width: IMAGES.macbook.logicBoard.width, height: IMAGES.macbook.logicBoard.height, caption: 'MacBook motherboard repair for families and residents across Fahaheel.' }, seo: { title: 'Computer Repair Fahaheel | Free Pickup, Open Till 10 PM', description: 'Free pickup and delivery for laptop, MacBook, and gaming PC repair across Fahaheel\'s residential and family communities, with every device diagnosed at KCROC\'s Hawalli lab.', canonicalUrl: 'https://www.computerrepairkuwait.com/location/fahaheel', ogType: 'website', schemaTypes: ['LocalBusiness'] }, navigationPriority: 55 } as LocationEntity,

    'loc-mangaf': { id: 'loc-mangaf', slug: 'mangaf', entityType: 'Location', isActive: true, isPhysicalLocation: false, localIntro: "Mangaf residents can have laptops, MacBooks and motherboards repaired without leaving home: we collect, repair at our Hawalli lab and return the device free of charge. The Mangaf zone also covers Fahaheel, Abu Halifa and Ahmadi. Component-level motherboard repair is the speciality we lead with here.", localHighlights: [
        { title: "Pickup from Mangaf, Fahaheel, Abu Halifa and Ahmadi", description: "Tell us your area on WhatsApp to arrange free collection." },
        { title: "Motherboard repair at component level", description: "Failed chips and circuits are repaired individually where it is technically possible." },
        { title: "No power, overheating, liquid damage", description: "The three most common serious faults get a full bench diagnosis before you are quoted." },
        { title: "Repaired in Hawalli", description: "Mangaf is a service area. All repairs are done at our lab and carry a 30-day warranty." },
      ], localFaqs: [
        { id: "faq-mangaf-local-1", question: "What does component-level motherboard repair mean?", answer: "Instead of replacing the whole motherboard, we trace the fault to the specific failed component, such as a chip, a power section or a connector, and repair it where that is technically possible. It is often a cheaper route, and we explain it before any paid work." },
        { id: "faq-mangaf-local-2", question: "What if the repair turns out not to be possible?", answer: "Under our No Fix, No Fee policy you pay nothing if we cannot fix it. Diagnostics are free, and pickup and delivery from Mangaf are free." },
        { id: "faq-mangaf-local-3", question: "My laptop shows a charger light but will not power on. Is it the motherboard?", answer: "It can be. A dead laptop with a working charger often has a fault in the power circuit of the board, but a faulty battery or adapter can cause the same symptom. We test those first so the diagnosis is accurate." },
        { id: "faq-mangaf-local-4", question: "My laptop was exposed to liquid. How quickly should I act?", answer: "As soon as possible. Switch it off, unplug it and message us before trying to power it on. Liquid damage gets worse over time, and early cleaning and board-level repair gives the best chance of saving it." },
        { id: "faq-mangaf-local-5", question: "Can you repair the motherboard of a MacBook or gaming laptop?", answer: "Yes, on many models. MacBooks and gaming laptops are among the devices we repair at component level. Whether it is possible depends on the fault, which we confirm after diagnosis." },
        { id: "faq-mangaf-local-6", question: "Do you collect from Abu Halifa and Ahmadi as well as Mangaf?", answer: "Yes. Mangaf, Fahaheel, Abu Halifa and Ahmadi are covered by free pickup and delivery. Message your area on WhatsApp to arrange collection." },
      ], title: 'Mangaf', description: 'Component-level laptop, MacBook, and motherboard repair for Mangaf residents and the wider Ahmadi workforce community, collected and delivered free of charge.', landmark: 'Mobile Dispatch Area (Equipment processed at our central Hawalli workshop: Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19)', coords: { lat: 29.0975, lng: 48.1197 }, serviceRadiusKm: 20, serviceAreas: ['Mangaf', 'Fahaheel', 'Abu Halifa', 'Ahmadi'], contentImage: { src: IMAGES.gaming.waterCooled.src, alt: IMAGES.gaming.waterCooled.alt, width: IMAGES.gaming.waterCooled.width, height: IMAGES.gaming.waterCooled.height, caption: 'Custom water-cooled gaming PC build serviced for the Mangaf community.' }, seo: { title: 'Computer Repair Mangaf | Free Pickup, Open Till 10 PM | KCROC', description: 'Component-level laptop, MacBook, and motherboard repair for Mangaf residents and the wider Ahmadi workforce community, collected and delivered free of charge.', canonicalUrl: 'https://www.computerrepairkuwait.com/location/mangaf', ogType: 'website', schemaTypes: ['LocalBusiness'] }, navigationPriority: 50 } as LocationEntity,

    'loc-abu-halifa': { id: 'loc-abu-halifa', slug: 'abu-halifa', entityType: 'Location', isActive: true, isPhysicalLocation: false, localIntro: "Abu Halifa is served by free pickup from villas and residential compounds, so there is no need to travel to Hawalli. We collect, diagnose and repair at our lab, then return the device after testing. The service zone includes Mangaf, Fahaheel and Fintas.", localHighlights: [
        { title: "Pickup from Abu Halifa villas and compounds", description: "Share your area and a map pin on WhatsApp and we will arrange free collection." },
        { title: "Laptop, MacBook and gaming PC repair", description: "Power, charging, overheating and board-level faults are all handled in-house." },
        { title: "Diagnose first, then quote", description: "You receive the confirmed fault and the price before any paid work begins." },
        { title: "Repaired in Hawalli", description: "Abu Halifa is a service area, not a branch. Work is done at our central lab." },
      ], localFaqs: [
        { id: "faq-abu-halifa-local-1", question: "Can you collect from a compound in Abu Halifa?", answer: "Yes. Free pickup is available from villas, compounds and apartments across Abu Halifa. Send your area and a map pin and we will arrange the time." },
        { id: "faq-abu-halifa-local-2", question: "Do you also cover Fintas and Mangaf?", answer: "Yes. Both are close neighbours inside our service zone with the same free pickup and delivery." },
        { id: "faq-abu-halifa-local-3", question: "What does diagnose first, then quote mean?", answer: "We test the device and find the actual fault before giving you a price. Diagnostics are free, you approve the repair before any paid work starts, and under our No Fix, No Fee policy you pay nothing if we cannot fix it." },
        { id: "faq-abu-halifa-local-4", question: "We have more than one device that needs repair. Can you collect them together?", answer: "Message us the list of devices and what each one is doing, for example a laptop, a MacBook and a gaming PC. We will arrange collection and confirm what each device needs after diagnosis." },
        { id: "faq-abu-halifa-local-5", question: "My MacBook is not charging. Is it the cable, the port or the board?", answer: "It can be any of the three. We test the cable and charger first, then the port and the power circuit on the board. We trace MacBook charging faults at component level where that is technically possible, and explain the repair path before any paid work." },
        { id: "faq-abu-halifa-local-6", question: "Is there a shop in Abu Halifa, and where is the repair done?", answer: "There is no shop in Abu Halifa. Devices are repaired at our Hawalli lab (Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19), tested before return and covered by a 30-day warranty. Collection and delivery are free." },
      ], title: 'Abu Halifa', description: 'Laptop, MacBook, and gaming PC repair for Abu Halifa\'s villas and residential compounds, with free pickup and delivery to KCROC\'s Hawalli lab — no need to travel.', landmark: 'Mobile Dispatch Area (Equipment processed at our central Hawalli workshop: Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19)', coords: { lat: 29.1213, lng: 48.1268 }, serviceRadiusKm: 20, serviceAreas: ['Abu Halifa', 'Mangaf', 'Fahaheel', 'Fintas'], contentImage: { src: IMAGES.laptopHardware.hpLaptopMotherboardRepairOpen.src, alt: IMAGES.laptopHardware.hpLaptopMotherboardRepairOpen.alt, width: IMAGES.laptopHardware.hpLaptopMotherboardRepairOpen.width, height: IMAGES.laptopHardware.hpLaptopMotherboardRepairOpen.height, caption: 'Laptop motherboard repair for villas and compounds across Abu Halifa.' }, seo: { title: 'Computer Repair Abu Halifa | Free Pickup, Open Till 10 PM', description: 'Laptop, MacBook, and gaming PC repair for Abu Halifa\'s villas and residential compounds, with free pickup and delivery to KCROC\'s Hawalli lab — no need to travel.', canonicalUrl: 'https://www.computerrepairkuwait.com/location/abu-halifa', ogType: 'website', schemaTypes: ['LocalBusiness'] }, navigationPriority: 45 } as LocationEntity,

    // 🚀 NEW: Jabriya, Mubarak Al-Kabeer, Fintas, and Sabah Al-Salem — second
    // batch of previously-uncovered high-value areas. Each again gets a
    // distinct angle and a manually-verified (not just alt-text-matched)
    // contentImage so the growing location cluster keeps reading as
    // genuinely different pages rather than one template with area names
    // swapped in.
    'loc-jabriya': { id: 'loc-jabriya', slug: 'jabriya', entityType: 'Location', isActive: true, isPhysicalLocation: false, localIntro: "Jabriya is one of the closest areas to our Hawalli lab, which keeps pickup and return quick to arrange. We serve Jabriya, Shaab, Surra and surrounding streets, with laptop, MacBook, screen and motherboard repair. Black screens, dead laptops and charging faults are the focus of this page.", localHighlights: [
        { title: "Pickup from Jabriya, Shaab and Surra", description: "Message us your area on WhatsApp and we will arrange free collection." },
        { title: "Close to the lab", description: "Jabriya sits near Hawalli, so there is little distance between your door and our workbench." },
        { title: "Black screen and no-power diagnosis", description: "We find the actual fault before you are quoted: panel, cable, charger, battery or board." },
        { title: "Students and staff welcome", description: "Laptops for study and work get the same diagnosis and the same 30-day warranty as any other repair." },
      ], localFaqs: [
        { id: "faq-jabriya-local-1", question: "Do you collect from apartments and shared housing in Jabriya?", answer: "Yes. Send your building or block, floor and a contact number on WhatsApp and we will arrange collection and return." },
        { id: "faq-jabriya-local-2", question: "Is Jabriya really close enough for quick turnaround?", answer: "Jabriya is one of the closest areas to our Hawalli lab, so pickup and return are quick to arrange. The repair itself depends on the fault. Many repairs take 24-48 hours after we receive the device, and we confirm a realistic estimate after diagnosis." },
        { id: "faq-jabriya-local-3", question: "My laptop screen flickers or shows coloured lines. Is it the screen?", answer: "Often it is the panel or the display cable. We confirm which before quoting. Screen replacement starts from 30 KWD, and the part and price are confirmed with you before work begins." },
        { id: "faq-jabriya-local-4", question: "My laptop worked yesterday and is completely dead today. What should I check?", answer: "Try a different outlet, check the charger light and hold the power button for about 15 seconds. If it is still dead, message us. We test the battery, the charging circuit and the board in that order, and you pay nothing if we cannot fix it." },
        { id: "faq-jabriya-local-5", question: "Can you do a same-day repair?", answer: "Same-day service is possible for some screen and battery jobs when the part is in stock. Component-level motherboard work usually takes longer, typically 24-72 hours. Message us with your deadline and the symptoms and we will tell you what is realistic." },
        { id: "faq-jabriya-local-6", question: "Do you collect from Shaab, Surra, Hawalli and Salmiya as well?", answer: "Yes. Jabriya, Shaab, Surra, Hawalli and Salmiya are covered by free pickup and delivery." },
      ], title: 'Jabriya', description: 'Fast laptop, MacBook, and gaming PC repair for Jabriya, one of the closest neighborhoods to KCROC\'s Hawalli lab, with free pickup and delivery for students, university staff, and residents.', landmark: 'Mobile Dispatch Area (Equipment processed at our central Hawalli workshop: Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19)', coords: { lat: 29.3186, lng: 48.0154 }, serviceRadiusKm: 10, serviceAreas: ['Jabriya', 'Hawalli', 'Salmiya', 'Shaab', 'Surra'], contentImage: { src: IMAGES.macbook.macbookProOpenMacosScreen.src, alt: IMAGES.macbook.macbookProOpenMacosScreen.alt, width: IMAGES.macbook.macbookProOpenMacosScreen.width, height: IMAGES.macbook.macbookProOpenMacosScreen.height, caption: 'MacBook Pro repair completed for a customer in Jabriya.' }, seo: { title: 'Computer Repair Jabriya | Free Pickup, Open Till 10 PM | KCROC', description: 'Fast laptop, MacBook, and gaming PC repair for Jabriya, one of the closest neighborhoods to KCROC\'s Hawalli lab, with free pickup and delivery for students, university staff, and residents.', canonicalUrl: 'https://www.computerrepairkuwait.com/location/jabriya', ogType: 'website', schemaTypes: ['LocalBusiness'] }, navigationPriority: 40 } as LocationEntity,

    'loc-mubarak-al-kabeer': { id: 'loc-mubarak-al-kabeer', slug: 'mubarak-al-kabeer', entityType: 'Location', isActive: true, isPhysicalLocation: false, localIntro: "If your laptop battery fades within minutes, a screen has cracked or the motherboard has stopped responding, you can hand it over without leaving home: pickup and delivery are free across Mubarak Al-Kabeer, Qusour, Adan, Qurain and Sabah Al-Salem. Panels and batteries are matched to your exact model, and board faults are traced to the failed component before any replacement is suggested. Work is done at our Hawalli lab under No Fix, No Fee.", localHighlights: [
        { title: "Pickup from Adan, Qurain, Qusour and Sabah Al-Salem", description: "Send your area on WhatsApp and we will arrange free collection." },
        { title: "Screen and battery replacement", description: "Panels and batteries are matched to your model, with the options explained before you choose." },
        { title: "Motherboard repair at component level", description: "Faults are traced to the failed component rather than automatically replacing the board." },
        { title: "Repaired in Hawalli", description: "Mubarak Al-Kabeer is a service area. All work is done at our central lab." },
      ], localFaqs: [
        { id: "faq-mubarak-al-kabeer-local-1", question: "Do you collect from Qusour and Sabah Al-Salem as well as Adan and Qurain?", answer: "Yes. Mubarak Al-Kabeer, Adan, Qurain, Qusour and Sabah Al-Salem are covered by free pickup and delivery. Message your area on WhatsApp and we will arrange a time." },
        { id: "faq-mubarak-al-kabeer-local-2", question: "My laptop battery drains very quickly. Does it need replacing?", answer: "Often yes, especially if it shuts off suddenly at 20 to 30 percent or loses charge within minutes of unplugging. We check the battery health and the charging circuit first, because a charging fault can look like a weak battery. We explain OEM and compatible options before you choose." },
        { id: "faq-mubarak-al-kabeer-local-3", question: "My laptop battery looks swollen or the trackpad is lifting. What should I do?", answer: "Stop using it, unplug the charger and do not press on the swollen area. A swollen battery is a safety risk and should not be charged again. Message us and we will arrange pickup so the battery can be replaced safely." },
        { id: "faq-mubarak-al-kabeer-local-4", question: "Can you replace a battery that is built into the laptop?", answer: "In most cases, yes. Many thin laptops and MacBooks have internal batteries that need the case opened. Availability depends on the model, so send the exact model name on WhatsApp and we will confirm whether a suitable battery is available before you commit." },
        { id: "faq-mubarak-al-kabeer-local-5", question: "My motherboard has failed. Do I need a new laptop?", answer: "Not necessarily. We trace the fault to the failed component and repair it where that is technically possible, instead of automatically swapping the whole board. Diagnostics are free, and you pay nothing if we cannot fix it." },
        { id: "faq-mubarak-al-kabeer-local-6", question: "How can I get an idea of the cost without bringing the laptop in?", answer: "Send the model, the symptoms and a photo of any error on WhatsApp for a first opinion. A firm quote is confirmed after diagnosis and before any paid work, and repairs carry a 30-day warranty. Screen replacement starts from 30 KWD and component-level motherboard repair from 25 KWD." },
      ], title: 'Mubarak Al-Kabeer', description: 'Component-level laptop and motherboard repair for residents across Mubarak Al-Kabeer Governorate, from Adan to Qurain, collected and delivered free of charge to KCROC\'s Hawalli lab.', landmark: 'Mobile Dispatch Area (Equipment processed at our central Hawalli workshop: Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19)', coords: { lat: 29.2436, lng: 48.0783 }, serviceRadiusKm: 25, serviceAreas: ['Mubarak Al-Kabeer', 'Adan', 'Qurain', 'Sabah Al-Salem', 'Qusour'], contentImage: { src: IMAGES.gaming.deepcoolAio.src, alt: IMAGES.gaming.deepcoolAio.alt, width: IMAGES.gaming.deepcoolAio.width, height: IMAGES.gaming.deepcoolAio.height, caption: 'Custom-built PC repair and liquid-cooler servicing for Mubarak Al-Kabeer Governorate.' }, seo: { title: 'Computer Repair Mubarak Al-Kabeer, Kuwait | KCROC', description: 'Component-level laptop and motherboard repair for residents across Mubarak Al-Kabeer Governorate, from Adan to Qurain, collected and delivered free of charge to KCROC\'s Hawalli lab.', canonicalUrl: 'https://www.computerrepairkuwait.com/location/mubarak-al-kabeer', ogType: 'website', schemaTypes: ['LocalBusiness'] }, navigationPriority: 35 } as LocationEntity,

    'loc-fintas': { id: 'loc-fintas', slug: 'fintas', entityType: 'Location', isActive: true, isPhysicalLocation: false, localIntro: "Fintas and the surrounding coastal communities are served by free pickup, so a repair does not mean a drive to Hawalli. We collect, diagnose and repair at our lab, then return the device after testing. Gaming PCs, overheating and liquid damage are the focus of this page.", localHighlights: [
        { title: "Pickup from Fintas, Abu Halifa, Mangaf and Fahaheel", description: "Message us your area on WhatsApp and we will arrange free collection." },
        { title: "Gaming PC and laptop thermal service", description: "Cleaning, repasting and cooling checks for machines that run hot or throttle." },
        { title: "Liquid damage and no-power faults", description: "Board-level diagnosis and repair rather than a guess." },
        { title: "Repaired in Hawalli", description: "Fintas is a service area. All repairs are carried out at our central lab." },
      ], localFaqs: [
        { id: "faq-fintas-local-1", question: "Do you service gaming PCs for customers in Fintas?", answer: "Yes. We repair and service gaming PCs and gaming laptops, including machines with liquid coolers. Free pickup is available from Fintas, Abu Halifa, Mangaf and Fahaheel." },
        { id: "faq-fintas-local-2", question: "My gaming PC runs hot and the fans are loud. What do you do about it?", answer: "We check dust build-up, fan operation and heatsink or cooler contact, and replace the thermal paste where needed. Then we test under load to confirm the temperatures have come down." },
        { id: "faq-fintas-local-3", question: "My laptop got wet near the coast. Is it urgent?", answer: "Yes. Switch it off and unplug it, then message us. Quick cleaning of the board gives the best chance of saving it." },
        { id: "faq-fintas-local-4", question: "My games stutter or the frame rate drops after a few minutes. Why?", answer: "Often the machine is overheating and slowing itself down to protect the hardware. Dust and old paste are the usual causes, though the power supply or graphics card can also be a factor. We test under load to find the real cause." },
        { id: "faq-fintas-local-5", question: "Can you collect a custom-built PC with RGB lighting and a liquid cooler?", answer: "Yes. Tell us the main components and the symptoms. We arrange collection of the whole PC, service it at the lab and return it after testing." },
        { id: "faq-fintas-local-6", question: "Do you collect from Abu Halifa, Mangaf and Fahaheel as well as Fintas?", answer: "Yes. Fintas, Abu Halifa, Mangaf and Fahaheel are covered by free pickup and delivery. Message your area on WhatsApp to arrange a time." },
      ], title: 'Fintas', description: 'Laptop, MacBook, and gaming PC repair for Fintas and the surrounding coastal communities, with free pickup and delivery to KCROC\'s Hawalli lab — no need to travel.', landmark: 'Mobile Dispatch Area (Equipment processed at our central Hawalli workshop: Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19)', coords: { lat: 29.1362, lng: 48.1256 }, serviceRadiusKm: 15, serviceAreas: ['Fintas', 'Abu Halifa', 'Mangaf', 'Fahaheel', 'Abu Ftaira'], contentImage: { src: IMAGES.gaming.asusRogCase.src, alt: IMAGES.gaming.asusRogCase.alt, width: IMAGES.gaming.asusRogCase.width, height: IMAGES.gaming.asusRogCase.height, caption: 'Custom gaming PC repair and RGB build servicing for Fintas.' }, seo: { title: 'Computer Repair Fintas | Free Pickup, Open Till 10 PM | KCROC', description: 'Laptop, MacBook, and gaming PC repair for Fintas and the surrounding coastal communities, with free pickup and delivery to KCROC\'s Hawalli lab — no need to travel.', canonicalUrl: 'https://www.computerrepairkuwait.com/location/fintas', ogType: 'website', schemaTypes: ['LocalBusiness'] }, navigationPriority: 30 } as LocationEntity,

    'loc-sabah-al-salem': { id: 'loc-sabah-al-salem', slug: 'sabah-al-salem', entityType: 'Location', isActive: true, isPhysicalLocation: false, localIntro: "There is no KCROC branch in Sabah Al-Salem, so a laptop that will not power on or a MacBook that stopped charging does not mean a trip to Hawalli. Message your area and we arrange free pickup, then trace charging, no-power and dropped-device faults to the actual part before you are quoted. The device comes back tested with a 30-day warranty. Adan, Qurain and Mubarak Al-Kabeer share the same pickup zone.", localHighlights: [
        { title: "Pickup from Sabah Al-Salem, Adan and Qurain", description: "Share your area on WhatsApp and we will arrange free collection." },
        { title: "Screen, charging and no-power faults", description: "The faults this page focuses on are diagnosed on the bench before you are quoted." },
        { title: "MacBook and laptop motherboard repair", description: "Component-level work where it is technically possible." },
        { title: "Repaired in Hawalli", description: "Sabah Al-Salem is a service area. All work is done at our central lab and covered by a 30-day warranty." },
      ], localFaqs: [
        { id: "faq-sabah-al-salem-local-1", question: "Do you collect from Adan and Qurain as well as Sabah Al-Salem?", answer: "Yes. Sabah Al-Salem, Adan, Qurain and Mubarak Al-Kabeer are one pickup zone, with free collection and delivery. Send your area and street or block on WhatsApp and we will agree a collection time." },
        { id: "faq-sabah-al-salem-local-2", question: "My laptop will not turn on. What can I check before sending it?", answer: "Try a different power outlet, check that the charger light is on, unplug USB devices and hold the power button for about 15 seconds. If it is still dead, message us the model and what happened just before it stopped. We test the power path on the bench first, so you are not told to replace the motherboard before the real fault is found." },
        { id: "faq-sabah-al-salem-local-3", question: "My laptop screen is cracked but still shows a picture. Can I keep using it?", answer: "We would not. A crack usually spreads and can leave lines or dark patches that make the display unusable. While it still works, back up what you need. Screen replacement starts from 30 KWD, and we confirm the part and price with you before any paid work begins." },
        { id: "faq-sabah-al-salem-local-4", question: "The laptop was dropped and now shows nothing. Is it the screen or the board?", answer: "Both are possible, which is why we diagnose before quoting. If the machine powers on but the display stays black, the panel or its cable is a common cause. If it does not power on at all, the fault is more likely on the board. We tell you which it is, and under our No Fix, No Fee policy you pay nothing if we cannot fix it." },
        { id: "faq-sabah-al-salem-local-5", question: "Can you repair a MacBook that does not charge or does not start?", answer: "Yes. Charging and no-power faults on MacBooks are traced at component level where that is technically possible, instead of defaulting to a full logic-board replacement. We explain the diagnosis and the repair path before any paid work begins." },
        { id: "faq-sabah-al-salem-local-6", question: "Where is my device repaired, and can I visit in person?", answer: "Sabah Al-Salem is a service area, not a branch. Your device is repaired at our Hawalli lab (Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19), which is open daily from 10:00 AM to 10:00 PM. You can bring it in yourself or have us collect it for free, and repairs carry a 30-day warranty." },
      ], title: 'Sabah Al-Salem', description: 'Laptop, MacBook, and motherboard repair for Sabah Al-Salem families and residents, with free door-to-door pickup and delivery to KCROC\'s Hawalli lab.', landmark: 'Mobile Dispatch Area (Equipment processed at our central Hawalli workshop: Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19)', coords: { lat: 29.2075, lng: 48.0975 }, serviceRadiusKm: 15, serviceAreas: ['Sabah Al-Salem', 'Mubarak Al-Kabeer', 'Adan', 'Qurain'], contentImage: { src: IMAGES.laptopHardware.dellLaptopScreenRepairCompleted.src, alt: IMAGES.laptopHardware.dellLaptopScreenRepairCompleted.alt, width: IMAGES.laptopHardware.dellLaptopScreenRepairCompleted.width, height: IMAGES.laptopHardware.dellLaptopScreenRepairCompleted.height, caption: 'Laptop screen repair completed and back in service for a Sabah Al-Salem family.' }, seo: { title: 'Computer Repair Sabah Al-Salem | Free Pickup, Open Till 10 PM', description: 'Laptop, MacBook, and motherboard repair for Sabah Al-Salem families and residents, with free door-to-door pickup and delivery to KCROC\'s Hawalli lab.', canonicalUrl: 'https://www.computerrepairkuwait.com/location/sabah-al-salem', ogType: 'website', schemaTypes: ['LocalBusiness'] }, navigationPriority: 25 } as LocationEntity,

    'loc-salwa': { id: 'loc-salwa', slug: 'salwa', entityType: 'Location', isActive: true, isPhysicalLocation: false,
      title: 'Salwa',
      description: 'Computer and laptop repair for Salwa residents and families, with free pickup to KCROC\'s Hawalli lab for screen, battery, charging and motherboard faults.',
      localIntro: 'For Salwa customers, KCROC keeps the repair process simple: we collect the laptop or MacBook from your area, diagnose it at the Hawalli lab, explain the repair options and return it after testing. Salwa is served as a pickup area rather than a separate walk-in branch.',
      localHighlights: [
        { title: 'Pickup across Salwa blocks', description: 'Free device collection is available across Salwa, with return delivery after diagnosis and testing.' },
        { title: 'Screen, battery and charging faults', description: 'Common laptop problems are assessed at component and part level before replacement is recommended.' },
        { title: 'MacBook and laptop repair', description: 'Apple MacBooks and Windows laptops are both supported, including motherboard and liquid-damage diagnosis.' },
        { title: 'Central Hawalli repair lab', description: 'Repairs are completed by KCROC\'s technicians at the main Hawalli workshop, not at a temporary local storefront.' }
      ],
      landmark: 'Mobile Dispatch Area (Equipment processed at our central Hawalli workshop: Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19)',
      coords: { lat: 29.2950, lng: 48.0780 }, serviceRadiusKm: 15, serviceAreas: ['Salwa', 'Rumaithiya', 'Bidaa', 'Shaab'],
      contentImage: { src: IMAGES.services.laptopRepair.src, alt: IMAGES.services.laptopRepair.alt, width: IMAGES.services.laptopRepair.width, height: IMAGES.services.laptopRepair.height, caption: 'Laptop and MacBook repair serving Salwa and nearby coastal neighborhoods.' },
      seo: { title: 'Computer Repair Salwa | Free Pickup, Open Till 10 PM | KCROC', description: 'Laptop, MacBook and computer repair in Salwa with free pickup and delivery to KCROC\'s Hawalli lab, including screen, battery, charging and motherboard diagnosis.', canonicalUrl: 'https://www.computerrepairkuwait.com/location/salwa', ogType: 'website', schemaTypes: ['LocalBusiness'], lastModified: '2026-10-02T00:00:00+03:00' },
      navigationPriority: 80
    } as LocationEntity,

    'loc-rumaithiya': { id: 'loc-rumaithiya', slug: 'rumaithiya', entityType: 'Location', isActive: true, isPhysicalLocation: false,
      title: 'Rumaithiya',
      description: 'Laptop, MacBook and gaming PC repair for Rumaithiya with free pickup and delivery to KCROC\'s central Hawalli workshop.',
      localIntro: 'Rumaithiya is close to KCROC\'s Hawalli service area, so customers can use the same pickup-and-lab workflow without bringing a heavy desktop or laptop across Kuwait. Devices are diagnosed in the central workshop and returned after repair testing.',
      localHighlights: [
        { title: 'Close-in pickup service', description: 'Pickup is available throughout Rumaithiya and nearby Hawalli-side neighborhoods.' },
        { title: 'Gaming and thermal problems', description: 'Gaming laptops and PCs can be checked for overheating, cooling faults, shutdowns and performance issues.' },
        { title: 'Board-level diagnosis', description: 'Motherboard faults are investigated to the component level where technically feasible instead of defaulting to whole-board replacement.' },
        { title: 'Privacy-conscious handling', description: 'Repair diagnostics focus on the hardware fault, with files left untouched unless customer-authorized work requires otherwise.' }
      ],
      landmark: 'Mobile Dispatch Area (Equipment processed at our central Hawalli workshop: Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19)',
      coords: { lat: 29.3270, lng: 48.0510 }, serviceRadiusKm: 10, serviceAreas: ['Rumaithiya', 'Salwa', 'Shaab', 'Jabriya'],
      contentImage: { src: IMAGES.gaming.gamingLaptopFan.src, alt: IMAGES.gaming.gamingLaptopFan.alt, width: IMAGES.gaming.gamingLaptopFan.width, height: IMAGES.gaming.gamingLaptopFan.height, caption: 'Gaming laptop cooling and motherboard diagnostics for Rumaithiya customers.' },
      seo: { title: 'Computer Repair Rumaithiya | Free Pickup, Open Till 10 PM', description: 'Computer and laptop repair in Rumaithiya with free pickup and delivery, including gaming laptop cooling, motherboard and screen repairs.', canonicalUrl: 'https://www.computerrepairkuwait.com/location/rumaithiya', ogType: 'website', schemaTypes: ['LocalBusiness'], lastModified: '2026-10-02T00:00:00+03:00' },
      navigationPriority: 78
    } as LocationEntity,

    'loc-shaab': { id: 'loc-shaab', slug: 'shaab', entityType: 'Location', isActive: true, isPhysicalLocation: false,
      title: 'Shaab',
      description: 'Professional laptop, MacBook and computer repair for Shaab residents and businesses, with pickup to KCROC\'s Hawalli lab.',
      localIntro: 'Shaab customers can arrange pickup without visiting a repair shop. KCROC handles diagnosis and repair at the Hawalli workshop, with service coverage suited to laptops, MacBooks, gaming machines and common power or display faults.',
      localHighlights: [
        { title: 'Pickup for homes and offices', description: 'Collection is available for residents and small businesses in Shaab and nearby areas.' },
        { title: 'Display and no-power diagnostics', description: 'Black screens, no-power symptoms and charging faults are checked systematically before parts are replaced.' },
        { title: 'MacBook and component repair', description: 'MacBook board faults and component-level laptop repairs are available through the central lab.' },
        { title: 'Return after testing', description: 'Devices are tested after repair before they are delivered back to the customer.' }
      ],
      landmark: 'Mobile Dispatch Area (Equipment processed at our central Hawalli workshop: Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19)',
      coords: { lat: 29.3500, lng: 48.0350 }, serviceRadiusKm: 12, serviceAreas: ['Shaab', 'Kuwait City', 'Salmiya', 'Rumaithiya'],
      contentImage: { src: IMAGES.macbook.logicBoard.src, alt: IMAGES.macbook.logicBoard.alt, width: IMAGES.macbook.logicBoard.width, height: IMAGES.macbook.logicBoard.height, caption: 'Component-level MacBook and laptop diagnostics for Shaab customers.' },
      seo: { title: 'Computer Repair Shaab | Free Pickup, Open Till 10 PM | KCROC', description: 'Laptop, MacBook and computer repair in Shaab with free pickup, component-level diagnostics and delivery from KCROC\'s Hawalli workshop.', canonicalUrl: 'https://www.computerrepairkuwait.com/location/shaab', ogType: 'website', schemaTypes: ['LocalBusiness'], lastModified: '2026-10-02T00:00:00+03:00' },
      navigationPriority: 76
    } as LocationEntity,

    'loc-surra': { id: 'loc-surra', slug: 'surra', entityType: 'Location', isActive: true, isPhysicalLocation: false,
      title: 'Surra',
      description: 'Laptop and computer repair for Surra residents with free pickup to KCROC\'s Hawalli lab, covering no-power, overheating, screen and charging problems.',
      localIntro: 'For Surra homes and small offices, KCROC provides a pickup-first repair workflow. Devices are collected locally, repaired and tested at the Hawalli lab, then delivered back without requiring the customer to arrange transport.',
      localHighlights: [
        { title: 'Residential pickup service', description: 'Free collection is available across Surra and nearby central neighborhoods.' },
        { title: 'Laptop fault diagnosis', description: 'No-power, charging, overheating and black-screen faults are diagnosed before a repair path is quoted.' },
        { title: 'Screen and battery work', description: 'Common wear parts such as screens and batteries are replaced when diagnosis shows they are the correct fix.' },
        { title: 'Central workshop processing', description: 'Surra is a service area; devices are repaired at KCROC\'s Hawalli workshop by the main technical team.' }
      ],
      landmark: 'Mobile Dispatch Area (Equipment processed at our central Hawalli workshop: Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19)',
      coords: { lat: 29.3050, lng: 48.0400 }, serviceRadiusKm: 12, serviceAreas: ['Surra', 'Qadsiya', 'Jabriya', 'Hawalli'],
      contentImage: { src: IMAGES.laptopHardware.dellLaptopScreenRepairCompleted.src, alt: IMAGES.laptopHardware.dellLaptopScreenRepairCompleted.alt, width: IMAGES.laptopHardware.dellLaptopScreenRepairCompleted.width, height: IMAGES.laptopHardware.dellLaptopScreenRepairCompleted.height, caption: 'Laptop screen and hardware repair serving Surra and nearby central Kuwait areas.' },
      seo: { title: 'Computer Repair Surra | Free Pickup, Open Till 10 PM | KCROC', description: 'Laptop and computer repair in Surra with free pickup and delivery, including screen, battery, charging and motherboard diagnosis at KCROC\'s Hawalli lab.', canonicalUrl: 'https://www.computerrepairkuwait.com/location/surra', ogType: 'website', schemaTypes: ['LocalBusiness'], lastModified: '2026-10-02T00:00:00+03:00' },
      navigationPriority: 74
    } as LocationEntity,

    'loc-khaitan': { id: 'loc-khaitan', slug: 'khaitan', entityType: 'Location', isActive: true, isPhysicalLocation: false,
      title: 'Khaitan',
      description: 'Computer and laptop repair for Khaitan, with free pickup for screen, charging, battery, no-power and motherboard faults.',
      localIntro: 'Khaitan customers can use KCROC\'s Farwaniya-side pickup service without needing to carry a damaged laptop across Kuwait. Devices are collected from Khaitan, diagnosed at the Hawalli workshop and returned after testing.',
      localHighlights: [
        { title: 'Khaitan pickup coverage', description: 'Free pickup is available from Khaitan and connects directly into KCROC\'s existing Farwaniya service network.' },
        { title: 'Power and charging faults', description: 'Dead laptops, intermittent charging and damaged charging ports are tested before component replacement.' },
        { title: 'Screens and batteries', description: 'Screen and battery replacement are available for supported laptop and MacBook models.' },
        { title: 'Motherboard repair', description: 'Component-level board diagnosis is available when a simple part swap is not the right answer.' }
      ],
      landmark: 'Mobile Dispatch Area (Equipment processed at our central Hawalli workshop: Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19)',
      coords: { lat: 29.2700, lng: 47.9900 }, serviceRadiusKm: 18, serviceAreas: ['Khaitan', 'Farwaniya', 'Riggae', 'Ardiya'],
      contentImage: { src: IMAGES.motherboard.thermalGrizzly1.src, alt: IMAGES.motherboard.thermalGrizzly1.alt, width: IMAGES.motherboard.thermalGrizzly1.width, height: IMAGES.motherboard.thermalGrizzly1.height, caption: 'Motherboard and thermal repair serving Khaitan and Farwaniya-area customers.' },
      seo: { title: 'Computer Repair Khaitan | Free Pickup, Open Till 10 PM | KCROC', description: 'Laptop and computer repair in Khaitan with free pickup and delivery, covering charging, screen, battery, overheating and motherboard faults.', canonicalUrl: 'https://www.computerrepairkuwait.com/location/khaitan', ogType: 'website', schemaTypes: ['LocalBusiness'], lastModified: '2026-10-02T00:00:00+03:00' },
      navigationPriority: 72
    } as LocationEntity,

    'loc-riggae': { id: 'loc-riggae', slug: 'riggae', entityType: 'Location', isActive: true, isPhysicalLocation: false,
      title: 'Riggae',
      description: 'Laptop, MacBook and computer repair for Riggae with free pickup to KCROC\'s Hawalli lab, covering common power, display and charging issues.',
      localIntro: 'Riggae is part of KCROC\'s Farwaniya-area pickup network. Customers can arrange collection locally while the actual diagnosis, board work and testing happen at the main Hawalli workshop.',
      localHighlights: [
        { title: 'Pickup from Riggae', description: 'Free collection and return delivery are available for residents and home offices in Riggae.' },
        { title: 'No-power and charging diagnosis', description: 'Charging ports, power rails and related motherboard faults are checked systematically.' },
        { title: 'Screen repair', description: 'Cracked, dim or failed laptop displays can be assessed for panel, cable and board causes.' },
        { title: 'MacBook support', description: 'Apple MacBooks are handled alongside Windows laptops, including liquid-damage and board diagnostics.' }
      ],
      landmark: 'Mobile Dispatch Area (Equipment processed at our central Hawalli workshop: Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19)',
      coords: { lat: 29.2770, lng: 47.9500 }, serviceRadiusKm: 18, serviceAreas: ['Riggae', 'Khaitan', 'Farwaniya', 'Ardiya'],
      contentImage: { src: IMAGES.services.motherboardRepair.src, alt: IMAGES.services.motherboardRepair.alt, width: IMAGES.services.motherboardRepair.width, height: IMAGES.services.motherboardRepair.height, caption: 'Laptop motherboard and computer repair serving Riggae and nearby Farwaniya areas.' },
      seo: { title: 'Computer Repair Riggae | Free Pickup, Open Till 10 PM | KCROC', description: 'Computer and laptop repair in Riggae with free pickup and delivery, including charging, screen, motherboard and MacBook repairs.', canonicalUrl: 'https://www.computerrepairkuwait.com/location/riggae', ogType: 'website', schemaTypes: ['LocalBusiness'], lastModified: '2026-10-02T00:00:00+03:00' },
      navigationPriority: 70
    } as LocationEntity,

    'loc-ardiya': { id: 'loc-ardiya', slug: 'ardiya', entityType: 'Location', isActive: true, isPhysicalLocation: false,
      title: 'Ardiya',
      description: 'Laptop and computer repair for Ardiya with pickup to KCROC\'s Hawalli lab, including motherboard, screen, battery and gaming PC work.',
      localIntro: 'Ardiya customers can book a pickup instead of searching for a local shop. KCROC diagnoses the device in the central workshop, performs the approved repair and returns it after functional testing.',
      localHighlights: [
        { title: 'Ardiya pickup service', description: 'Free device collection is available across Ardiya and nearby Farwaniya-area communities.' },
        { title: 'Laptop and gaming PC repair', description: 'Both everyday laptops and gaming systems are supported, including thermal and no-power issues.' },
        { title: 'Board-level troubleshooting', description: 'Motherboard faults can be traced to individual components when repairable at component level.' },
        { title: 'Free return delivery', description: 'After the repair is tested, the device is delivered back to the customer.' }
      ],
      landmark: 'Mobile Dispatch Area (Equipment processed at our central Hawalli workshop: Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19)',
      coords: { lat: 29.2850, lng: 47.9250 }, serviceRadiusKm: 20, serviceAreas: ['Ardiya', 'Farwaniya', 'Riggae', 'Jleeb Al-Shuyoukh'],
      contentImage: { src: IMAGES.gaming.gamingOverheating.src, alt: IMAGES.gaming.gamingOverheating.alt, width: IMAGES.gaming.gamingOverheating.width, height: IMAGES.gaming.gamingOverheating.height, caption: 'Gaming PC cooling and laptop repair serving Ardiya customers.' },
      seo: { title: 'Computer Repair Ardiya | Free Pickup, Open Till 10 PM | KCROC', description: 'Computer, laptop and gaming PC repair in Ardiya with free pickup and delivery, including motherboard, screen and thermal diagnostics.', canonicalUrl: 'https://www.computerrepairkuwait.com/location/ardiya', ogType: 'website', schemaTypes: ['LocalBusiness'], lastModified: '2026-10-02T00:00:00+03:00' },
      navigationPriority: 68
    } as LocationEntity,

    'loc-mahboula': { id: 'loc-mahboula', slug: 'mahboula', entityType: 'Location', isActive: true, isPhysicalLocation: false,
      title: 'Mahboula',
      description: 'Laptop, MacBook and gaming PC repair for Mahboula with free pickup and delivery to KCROC\'s Hawalli lab.',
      localIntro: 'Mahboula customers can use KCROC\'s southern pickup route for laptops, MacBooks and gaming systems. Devices are repaired and tested centrally rather than at a separate local branch.',
      localHighlights: [
        { title: 'Southern Kuwait pickup', description: 'Free pickup is available in Mahboula and nearby Ahmadi-area communities.' },
        { title: 'Gaming PC and laptop cooling', description: 'Overheating, thermal throttling, shutdowns and fan-related issues can be diagnosed and repaired.' },
        { title: 'MacBook and board repair', description: 'MacBook liquid damage and motherboard faults are handled at component level where feasible.' },
        { title: 'Convenient return delivery', description: 'After testing, the repaired device is delivered back without requiring a second shop visit.' }
      ],
      landmark: 'Mobile Dispatch Area (Equipment processed at our central Hawalli workshop: Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19)',
      coords: { lat: 29.1470, lng: 48.1300 }, serviceRadiusKm: 20, serviceAreas: ['Mahboula', 'Mangaf', 'Abu Halifa', 'Fahaheel'],
      contentImage: { src: IMAGES.gaming.waterCooled.src, alt: IMAGES.gaming.waterCooled.alt, width: IMAGES.gaming.waterCooled.width, height: IMAGES.gaming.waterCooled.height, caption: 'Gaming PC and hardware servicing for Mahboula and nearby southern Kuwait.' },
      seo: { title: 'Computer Repair Mahboula | Free Pickup, Open Till 10 PM', description: 'Laptop, MacBook and gaming PC repair in Mahboula with free pickup and delivery to KCROC\'s Hawalli lab, including thermal and motherboard diagnostics.', canonicalUrl: 'https://www.computerrepairkuwait.com/location/mahboula', ogType: 'website', schemaTypes: ['LocalBusiness'], lastModified: '2026-10-02T00:00:00+03:00' },
      navigationPriority: 64
    } as LocationEntity,

    'loc-qurain': { id: 'loc-qurain', slug: 'qurain', entityType: 'Location', isActive: true, isPhysicalLocation: false,
      title: 'Qurain',
      description: 'Computer, laptop and MacBook repair for Qurain with free pickup and delivery to KCROC\'s Hawalli lab.',
      localIntro: 'Qurain customers can arrange a pickup for laptops, MacBooks and gaming systems. KCROC performs the detailed diagnosis and repair at its central Hawalli workshop, then returns the tested device.',
      localHighlights: [
        { title: 'Pickup across Qurain', description: 'Free collection is available throughout Qurain and nearby Mubarak Al-Kabeer areas.' },
        { title: 'Motherboard and power diagnosis', description: 'No-power, intermittent power and charging problems are investigated at component level where possible.' },
        { title: 'MacBook and screen repair', description: 'MacBook board faults and laptop display problems are supported through the central repair lab.' },
        { title: 'No need to travel', description: 'The pickup-and-delivery workflow means customers can start the repair from home.' }
      ],
      landmark: 'Mobile Dispatch Area (Equipment processed at our central Hawalli workshop: Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19)',
      coords: { lat: 29.2320, lng: 48.0650 }, serviceRadiusKm: 20, serviceAreas: ['Qurain', 'Adan', 'Qusour', 'Mubarak Al-Kabeer'],
      contentImage: { src: IMAGES.macbook.macbookProOpenMacosScreen.src, alt: IMAGES.macbook.macbookProOpenMacosScreen.alt, width: IMAGES.macbook.macbookProOpenMacosScreen.width, height: IMAGES.macbook.macbookProOpenMacosScreen.height, caption: 'MacBook and laptop repair serving Qurain and nearby Mubarak Al-Kabeer areas.' },
      seo: { title: 'Computer Repair Qurain | Free Pickup, Open Till 10 PM | KCROC', description: 'Computer, laptop and MacBook repair in Qurain with free pickup and delivery, including screen, charging and motherboard repair.', canonicalUrl: 'https://www.computerrepairkuwait.com/location/qurain', ogType: 'website', schemaTypes: ['LocalBusiness'], lastModified: '2026-10-02T00:00:00+03:00' },
      navigationPriority: 60
    } as LocationEntity,

    'loc-qortuba': { id: 'loc-qortuba', slug: 'qortuba', entityType: 'Location', isActive: true, isPhysicalLocation: false,
      title: 'Qortuba',
      description: 'Laptop, MacBook and computer repair for Qortuba with free pickup and delivery from KCROC\'s Hawalli workshop.',
      localIntro: 'Qortuba customers can book pickup from home or office and have the device diagnosed at KCROC\'s central workshop. The service covers common laptop, MacBook and desktop faults without requiring a trip to the lab.',
      localHighlights: [
        { title: 'Central Kuwait pickup', description: 'Free pickup is available throughout Qortuba and nearby Capital Governorate neighborhoods.' },
        { title: 'Power, charging and display faults', description: 'No-power, charging and black-screen symptoms are diagnosed systematically before parts are replaced.' },
        { title: 'MacBook and motherboard repair', description: 'MacBook logic-board and component-level laptop faults are supported through the specialist repair lab.' },
        { title: 'Tested before return', description: 'Repairs are function-tested at the workshop before the device is delivered back to the customer.' }
      ],
      landmark: 'Mobile Dispatch Area (Equipment processed at our central Hawalli workshop: Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19)',
      coords: { lat: 29.31194, lng: 47.98727 }, serviceRadiusKm: 12, serviceAreas: ['Qortuba', 'Adailiya', 'Rawda', 'Surra'],
      contentImage: { src: IMAGES.macbook.logicBoard.src, alt: IMAGES.macbook.logicBoard.alt, width: IMAGES.macbook.logicBoard.width, height: IMAGES.macbook.logicBoard.height, caption: 'Component-level MacBook and laptop diagnostics serving Qortuba and nearby Capital areas.' },
      seo: { title: 'Computer Repair Qortuba | Free Pickup, Open Till 10 PM | KCROC', description: 'Laptop, MacBook and computer repair in Qortuba with free pickup and delivery, including screen, charging, power and motherboard diagnosis.', canonicalUrl: 'https://www.computerrepairkuwait.com/location/qortuba', ogType: 'website', schemaTypes: ['LocalBusiness'], lastModified: '2026-10-02T00:00:00+03:00' },
      navigationPriority: 54
    } as LocationEntity,

    'loc-rawda': { id: 'loc-rawda', slug: 'rawda', entityType: 'Location', isActive: true, isPhysicalLocation: false,
      title: 'Rawda',
      description: 'Computer, laptop and MacBook repair for Rawda with free pickup and delivery to KCROC\'s Hawalli lab.',
      localIntro: 'Rawda residents can arrange pickup from home or office, with diagnosis and repair handled at KCROC\'s central Hawalli workshop. The pickup-first process avoids carrying a faulty device across Kuwait.',
      localHighlights: [
        { title: 'Pickup across Rawda', description: 'Free collection is available across Rawda and nearby central residential areas.' },
        { title: 'Laptop and MacBook support', description: 'Screen, battery, charging, overheating and motherboard faults are diagnosed before repair approval.' },
        { title: 'No-power and black-screen diagnosis', description: 'Power-path and display faults are investigated systematically rather than replaced by guesswork.' },
        { title: 'Central workshop processing', description: 'Rawda is a service area, not a separate branch; repairs are completed at the Hawalli lab and returned after testing.' }
      ],
      landmark: 'Mobile Dispatch Area (Equipment processed at our central Hawalli workshop: Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19)',
      coords: { lat: 29.32992, lng: 47.99842 }, serviceRadiusKm: 12, serviceAreas: ['Rawda', 'Adailiya', 'Surra', 'Hawalli'],
      contentImage: { src: IMAGES.services.laptopRepair.src, alt: IMAGES.services.laptopRepair.alt, width: IMAGES.services.laptopRepair.width, height: IMAGES.services.laptopRepair.height, caption: 'Laptop and computer repair serving Rawda and nearby central Kuwait neighborhoods.' },
      seo: { title: 'Computer Repair Rawda | Free Pickup, Open Till 10 PM | KCROC', description: 'Computer, laptop and MacBook repair in Rawda with free pickup and delivery, including screen, battery, charging and motherboard diagnosis.', canonicalUrl: 'https://www.computerrepairkuwait.com/location/rawda', ogType: 'website', schemaTypes: ['LocalBusiness'], lastModified: '2026-10-02T00:00:00+03:00' },
      navigationPriority: 52
    } as LocationEntity,

    'loc-messila': { id: 'loc-messila', slug: 'messila', entityType: 'Location', isActive: true, isPhysicalLocation: false,
      title: 'Messila',
      description: 'Laptop, MacBook and gaming PC repair for Messila with free pickup and delivery to KCROC\'s Hawalli workshop.',
      localIntro: 'Messila customers can start the repair process from home using KCROC\'s free pickup and delivery service. Devices are diagnosed and repaired centrally, then returned after functional testing.',
      localHighlights: [
        { title: 'Messila pickup service', description: 'Free collection is available across Messila and nearby Mubarak Al-Kabeer communities.' },
        { title: 'Laptop and MacBook repairs', description: 'Screen, battery, charging, liquid-damage and motherboard faults are supported after diagnosis.' },
        { title: 'Gaming PC support', description: 'Gaming systems can be checked for overheating, shutdowns, thermal throttling and hardware instability.' },
        { title: 'No need to visit the lab', description: 'Pickup and return delivery keep the repair process convenient for customers in Messila.' }
      ],
      landmark: 'Mobile Dispatch Area (Equipment processed at our central Hawalli workshop: Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19)',
      coords: { lat: 29.24961, lng: 48.09397 }, serviceRadiusKm: 20, serviceAreas: ['Messila', 'Abu Ftaira', 'Fnaitees', 'Mubarak Al-Kabeer'],
      contentImage: { src: IMAGES.gaming.gamingLaptopFan.src, alt: IMAGES.gaming.gamingLaptopFan.alt, width: IMAGES.gaming.gamingLaptopFan.width, height: IMAGES.gaming.gamingLaptopFan.height, caption: 'Gaming laptop cooling and hardware diagnostics for customers in Messila.' },
      seo: { title: 'Computer Repair Messila | Free Pickup, Open Till 10 PM | KCROC', description: 'Laptop, MacBook and gaming PC repair in Messila with free pickup and delivery, including screen, battery, thermal and motherboard diagnosis.', canonicalUrl: 'https://www.computerrepairkuwait.com/location/messila', ogType: 'website', schemaTypes: ['LocalBusiness'], lastModified: '2026-10-02T00:00:00+03:00' },
      navigationPriority: 50
    } as LocationEntity,

    'loc-adailiya': { id: 'loc-adailiya', slug: 'adailiya', entityType: 'Location', isActive: true, isPhysicalLocation: false,
      title: 'Adailiya',
      description: 'Laptop, MacBook and computer repair for Adailiya with free pickup and delivery to KCROC\'s Hawalli workshop.',
      localIntro: 'Adailiya customers can book a pickup from home or office and have the device assessed at KCROC\'s central Hawalli lab. This keeps diagnosis and repair in one controlled workshop while making collection and return convenient.',
      localHighlights: [
        { title: 'Adailiya pickup coverage', description: 'Free collection is available across Adailiya and nearby Capital Governorate neighborhoods.' },
        { title: 'Screen and battery replacement', description: 'Cracked displays, worn batteries and charging problems are diagnosed before compatible parts are fitted.' },
        { title: 'Motherboard and power diagnosis', description: 'No-power and board faults are traced at component level where technically feasible.' },
        { title: 'Central Hawalli repair lab', description: 'Adailiya is a service area rather than a separate walk-in branch; completed devices are tested before return.' }
      ],
      landmark: 'Mobile Dispatch Area (Equipment processed at our central Hawalli workshop: Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19)',
      coords: { lat: 29.32655, lng: 47.98141 }, serviceRadiusKm: 12, serviceAreas: ['Adailiya', 'Qortuba', 'Rawda', 'Qadsiya'],
      contentImage: { src: IMAGES.macbook.logicBoard.src, alt: IMAGES.macbook.logicBoard.alt, width: IMAGES.macbook.logicBoard.width, height: IMAGES.macbook.logicBoard.height, caption: 'MacBook and component-level laptop diagnostics serving Adailiya and nearby Capital areas.' },
      seo: { title: 'Computer Repair Adailiya | Free Pickup, Open Till 10 PM', description: 'Laptop, MacBook and computer repair in Adailiya with free pickup and delivery, including screen, battery, charging and motherboard diagnosis.', canonicalUrl: 'https://www.computerrepairkuwait.com/location/adailiya', ogType: 'website', schemaTypes: ['LocalBusiness'], lastModified: '2026-10-02T00:00:00+03:00' },
      navigationPriority: 46
    } as LocationEntity,

    /* ═══════════════════════════════════════════════════════════════
       REVIEWS
    ═══════════════════════════════════════════════════════════════ */
    'reviews-row': { 
      id: 'reviews-row', entityType: 'Reviews', isActive: true, title: 'Verified Google Reviews', aggregateRating: { ratingValue: '4.9', reviewCount: 158 }, 
      items: [
        { name: 'Ahmad Al-Sabah', location: 'Salmiya', time: '2 weeks ago', rating: 5, device: 'MacBook Pro — Screen Replacement', text: 'Fixed the MacBook Pro screen in 24 hours, price exactly as quoted.' },
        { name: 'Fatima A.', location: 'Hawalli', time: '1 month ago', rating: 5, device: 'MacBook Air — Liquid Damage', text: 'Spilled coffee on my Mac. Apple told me I lost all my data and needed a new board. KCROC fixed the original board and saved my files. Absolute lifesavers.' },
        { name: 'Tareq M.', location: 'Kuwait City', time: '2 months ago', rating: 5, device: 'ASUS ROG — Overheating', text: 'My gaming laptop was hitting 95C and dropping frames. They cleaned it and apply liquid metal. Now it runs perfectly cool. Very professional lab.' },
        { name: 'Sarah K.', location: 'Farwaniya', time: '3 months ago', rating: 5, device: 'Dell XPS — Dead Motherboard', text: 'Laptop was completely dead. The free pick and drop service was super convenient. They diagnosed a shorted chip, fixed it in 2 days, and gave a 30-day warranty.' }
      ] 
    } as ReviewsEntity,

    'faq-near-me-local': {
      id: 'faq-near-me-local', slug: 'local-computer-repair-near-me', entityType: 'FAQ', isActive: true,
      title: 'How do I find a reliable local computer repair service near me in Kuwait?',
      description: 'How KCROC handles local computer repair requests across Kuwait.',
      answer: 'KCROC is a Hawalli-based computer repair business serving customers across Kuwait. You can arrange free pickup and delivery from your home or office, while complex diagnostics and repairs are performed at our central Hawalli lab. Check the service-area pages for your location and contact us to confirm the collection details.',
      seo: { title: 'FAQ: Local Computer Repair Near Me Kuwait', description: 'How KCROC provides local computer repair across Kuwait.', canonicalUrl: 'https://www.computerrepairkuwait.com/faq#local-computer-repair-near-me', schemaTypes: ['FAQPage'] }
    } as FAQEntity,
    'faq-near-me-home': {
      id: 'faq-near-me-home', slug: 'in-home-computer-repair', entityType: 'FAQ', isActive: true,
      title: 'Can I arrange computer repair from my home or office?',
      description: 'Pickup and on-call options for customers who need repair at their location.',
      answer: 'Yes. KCROC can arrange pickup from your home or office across Kuwait, so you do not need to carry a heavy desktop or laptop to the workshop. Where an on-site visit is appropriate, we can confirm the available option for your specific problem; board-level repairs are performed at the Hawalli lab.',
      seo: { title: 'FAQ: In-Home Computer Repair Kuwait', description: 'Arrange computer repair pickup from your home or office in Kuwait.', canonicalUrl: 'https://www.computerrepairkuwait.com/faq#in-home-computer-repair', schemaTypes: ['FAQPage'] }
    } as FAQEntity,
    'faq-arabic-computer-technician': {
      id: 'faq-arabic-computer-technician', slug: 'arabic-computer-technician-kuwait', entityType: 'FAQ', isActive: true,
      title: 'هل يمكنني ترتيب استلام الكمبيوتر أو اللابتوب من المنزل؟',
      description: 'معلومات عن خدمة فني الكمبيوتر وإصلاح اللابتوب والكمبيوتر في الكويت.',
      answer: 'نعم، نوفّر خدمة استلام وتوصيل مجانية من مختلف مناطق الكويت. يتم تشخيص وإصلاح الأجهزة في مختبرنا المركزي في حولي، وكل ما عليك هو مراسلتنا على واتساب وذكر منطقتك ونوع الجهاز والمشكلة لتأكيد طريقة الاستلام.',
      seo: { title: 'فني كمبيوتر في الكويت | إصلاح لابتوب وكمبيوتر', description: 'خدمة فني كمبيوتر وإصلاح لابتوب وكمبيوتر في الكويت مع استلام وتوصيل مجاني.', canonicalUrl: 'https://www.computerrepairkuwait.com/near-me#arabic-computer-technician', schemaTypes: ['FAQPage'] }
    } as FAQEntity,

    'faq-ar-hawalli-technician': {
      id: 'faq-ar-hawalli-technician', slug: 'tasleeh-kombyuter-hawalli', entityType: 'FAQ', isActive: true,
      title: 'هل تتوفر خدمة فني تصليح كمبيوتر في حولي والمناطق القريبة؟',
      description: 'معلومات عن مختبر KCROC لتصليح الكمبيوتر في حولي وتغطيته لمنطقة النعيمي والمناطق المجاورة.',
      answer: 'نعم، مختبرنا المركزي يقع في حولي (شارع ابن خلدون، مجمع الملا)، ونوفر منه استلامًا وتوصيلًا مجانيًا لمنطقة النعيمي والمناطق المجاورة. أرسل لنا موقعك ونوع المشكلة على واتساب، وسنرتب استلام جهازك دون الحاجة للحضور إلى المختبر.',
      seo: { title: 'تصليح كمبيوتر حولي والنعيمي | KCROC', description: 'فني تصليح كمبيوتر في حولي يغطي النعيمي والمناطق المجاورة، مع استلام وتوصيل مجاني لجهازك.', canonicalUrl: 'https://www.computerrepairkuwait.com/ar/near-me#hawalli', schemaTypes: ['FAQPage'] }
    } as FAQEntity,

    'faq-ar-pricing': {
      id: 'faq-ar-pricing', slug: 'taklifat-tasleeh-kombyuter', entityType: 'FAQ', isActive: true,
      title: 'كم تبلغ تكلفة تصليح الكمبيوتر أو اللابتوب؟',
      description: 'معلومات عن تسعير خدمات تصليح الكمبيوتر واللابتوب لدى KCROC في الكويت.',
      answer: 'تعتمد التكلفة على نوع العطل والجهاز والقطعة المطلوبة، ولهذا نقدم فحصًا وتشخيصًا مجانيًا قبل أي التزام. بعد التشخيص نوضح لك السعر بشكل واضح، ونطبق سياسة "إذا لم يمكن الإصلاح، فلا رسوم عليك" — فإذا تبيّن أن الجهاز غير قابل للإصلاح اقتصاديًا، لا تدفع شيئًا. راجع صفحة الأسعار لدينا للاطلاع على نطاقات الأسعار التقريبية.',
      seo: { title: 'أسعار تصليح الكمبيوتر واللابتوب في الكويت | KCROC', description: 'فحص وتشخيص مجاني، وسعر واضح بعد التشخيص. بدون إصلاح، بدون رسوم — لا تدفع إذا لم يتم الإصلاح.', canonicalUrl: 'https://www.computerrepairkuwait.com/ar/near-me#pricing', schemaTypes: ['FAQPage'] }
    } as FAQEntity,

    'faq-ar-hours': {
      id: 'faq-ar-hours', slug: 'awqat-aml-fani-kombyuter', entityType: 'FAQ', isActive: true,
      title: 'ما هي أوقات عملكم؟',
      description: 'أوقات عمل مختبر KCROC وكيفية التواصل خارج ساعات الدوام.',
      answer: 'مختبرنا مفتوح يوميًا من 10:00 صباحًا إلى 10:00 مساءً. لسنا متاحين على مدار الساعة، لكن يمكنك مراسلتنا على واتساب في أي وقت، وسنرد عليك في أقرب فرصة خلال ساعات العمل لترتيب الاستلام أو الرد على استفسارك.',
      seo: { title: 'أوقات عمل KCROC لتصليح الكمبيوتر في الكويت', description: 'مفتوح يوميًا 10 صباحًا – 10 مساءً. راسلنا واتساب في أي وقت للرد عليك في أقرب فرصة.', canonicalUrl: 'https://www.computerrepairkuwait.com/ar/near-me#hours', schemaTypes: ['FAQPage'] }
    } as FAQEntity,

    'faq-ar-maintenance': {
      id: 'faq-ar-maintenance', slug: 'siyanat-kombyuter-shamila', entityType: 'FAQ', isActive: true,
      title: 'هل تقدّمون صيانة شاملة للكمبيوتر؟',
      description: 'نبذة عن خدمات صيانة الكمبيوتر الشاملة لدى KCROC، من التنظيف إلى إصلاح اللوحة الأم.',
      answer: 'نعم، نقدّم مجموعة من خدمات تشخيص وصيانة وإصلاح الكمبيوتر واللابتوب، تبدأ من التنظيف الداخلي وتغيير المعجون الحراري، مرورًا بفحص وترقية الذاكرة والتخزين (SSD)، وصولًا إلى إصلاح اللوحة الأم على مستوى القطعة الإلكترونية نفسها — وهو ما يميزنا عن أغلب المحلات التي تكتفي باستبدال اللوحة بالكامل.',
      seo: { title: 'صيانة كمبيوتر شاملة في الكويت | KCROC', description: 'صيانة شاملة من التنظيف والترقية إلى إصلاح اللوحة الأم على مستوى القطعة، بدل استبدالها بالكامل.', canonicalUrl: 'https://www.computerrepairkuwait.com/ar/near-me#maintenance', schemaTypes: ['FAQPage'] }
    } as FAQEntity,

    'faq-ar-laptop-repair-process': {
      id: 'faq-ar-laptop-repair-process', slug: 'kayfa-tatimm-tasleeh-laptop', entityType: 'FAQ', isActive: true,
      title: 'كيف تتم عملية تصليح اللابتوب لديكم؟',
      description: 'شرح خطوات عملية إصلاح اللابتوب لدى KCROC من الاستلام حتى التسليم.',
      answer: 'نبدأ بتشخيص المشكلة عبر واتساب ونرتب استلام الجهاز مجانًا من عندك. بعدها نجري الفحص والتشخيص في مختبرنا بحولي، ونوضح لك العطل والتكلفة قبل البدء بأي إصلاح. بعد موافقتك، ننفّذ الإصلاح ونختبر الجهاز جيدًا، ثم نوصله إليك مع ضمان 30 يومًا على القطع والعمل.',
      seo: { title: 'خطوات تصليح اللابتوب في الكويت | KCROC', description: 'استلام مجاني، تشخيص وتسعير واضح، إصلاح واختبار، ثم توصيل مع ضمان 30 يومًا.', canonicalUrl: 'https://www.computerrepairkuwait.com/ar/near-me#process', schemaTypes: ['FAQPage'] }
    } as FAQEntity,

    'faq-near-me-reliable': {
      id: 'faq-near-me-reliable', slug: 'reliable-computer-repair-near-me', entityType: 'FAQ', isActive: true,
      title: 'What should I look for in a reliable computer repair technician near me?',
      description: 'Practical criteria for choosing a local computer repair service.',
      answer: 'Look for clear diagnostics, transparent pricing, genuine repair expertise, a documented service process, appropriate warranty coverage, and real customer feedback. KCROC combines component-level diagnostics, a central repair lab in Hawalli, free pickup and delivery across Kuwait, and a No Fix, No Fee policy for eligible repairs.',
      seo: { title: 'FAQ: Reliable Computer Repair Technician Near Me', description: 'What to look for when choosing a reliable computer repair technician in Kuwait.', canonicalUrl: 'https://www.computerrepairkuwait.com/faq#reliable-computer-repair-near-me', schemaTypes: ['FAQPage'] }
    } as FAQEntity,

    /* ═══════════════════════════════════════════════════════════════
       FAQS
    ═══════════════════════════════════════════════════════════════ */
    'faq-pick-and-drop': { id: 'faq-pick-and-drop', slug: 'pick-and-drop', entityType: 'FAQ', isActive: true, title: 'Do you offer a pick and drop service across Kuwait?', description: 'Free pickup and delivery across all Kuwait governorates.', answer: 'Yes. Kuwait Computer Repair On Call provides completely free pickup and delivery across all Kuwait governorates — including Hawalli, Salmiya, Kuwait City, Farwaniya, Ahmadi, Jahra, Fahaheel, Mangaf, and Mahboula. Book via WhatsApp at any time. There are no hidden transport charges.', seo: { title: 'FAQ: Free Pick & Drop Service', description: 'Free pickup and delivery across all Kuwait.', canonicalUrl: 'https://www.computerrepairkuwait.com/faq#pick-and-drop', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-liquid-damage': { id: 'faq-liquid-damage', slug: 'liquid-damage', entityType: 'FAQ', isActive: true, title: 'Do you repair liquid-damaged laptops and MacBooks?', description: 'Details about our ultrasonic liquid damage repair process.', answer: 'Yes. We fully disassemble the device, run the motherboard through an industrial ultrasonic cleaner to strip corrosion, then trace and replace the specific shorted components using micro-soldering.', seo: { title: 'FAQ: Liquid Damage Repair', description: 'Liquid damage repair process details.', canonicalUrl: 'https://www.computerrepairkuwait.com/faq#liquid-damage', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-no-fix': { id: 'faq-no-fix', slug: 'no-fix', entityType: 'FAQ', isActive: true, title: 'What does No Fix, No Fee mean exactly?', description: 'Our transparent pricing guarantee.', answer: 'If we cannot successfully repair your device after a full diagnostic, you pay absolutely nothing — not for the diagnostic, labor, or parts tested. You only pay if you approve the quote and the repair is successful.', seo: { title: 'FAQ: No Fix No Fee Policy', description: 'How our no fix no fee guarantee works.', canonicalUrl: 'https://www.computerrepairkuwait.com/faq#no-fix', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-warranty': { id: 'faq-warranty', slug: 'warranty', entityType: 'FAQ', isActive: true, title: 'What warranty do you provide on repairs?', description: '30-day warranty coverage details.', answer: 'All successful hardware repairs at KCROC carry a 30-day warranty covering both parts and labor. Screen replacements, battery replacements, and board-level repairs all carry this same 30-day coverage.', seo: { title: 'FAQ: Repair Warranty', description: '30-day warranty on all hardware repairs.', canonicalUrl: 'https://www.computerrepairkuwait.com/faq#warranty', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-data-safe': { id: 'faq-data-safe', slug: 'data-safety', entityType: 'FAQ', isActive: true, title: 'Is my personal data safe during repair?', description: 'Our strict data privacy protocol.', answer: 'Yes. We operate a strict hardware-only, no-snooping policy. For motherboard and motherboard repairs, you are welcome to remove your storage drive before handing the device over.', seo: { title: 'FAQ: Data Safety During Repair', description: 'How we protect your data during computer repair.', canonicalUrl: 'https://www.computerrepairkuwait.com/faq#data-safety', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-same-day': { id: 'faq-same-day', slug: 'same-day-repair', entityType: 'FAQ', isActive: true, title: 'Do you offer same-day computer repair in Kuwait?', description: 'Same-day service availability and cutoff times.', answer: 'Yes, same-day repair is available for eligible jobs booked before 11:00 AM. Services typically completed same day include: screen replacements, battery replacements, keyboard repairs, SSD upgrades, and Windows installation.', seo: { title: 'FAQ: Same-Day Repair Service', description: 'Same-day computer repair availability in Kuwait.', canonicalUrl: 'https://www.computerrepairkuwait.com/faq#same-day', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-cost': { id: 'faq-cost', slug: 'repair-cost', entityType: 'FAQ', isActive: true, title: 'How much does computer repair cost in Kuwait?', description: 'Base pricing for common repair services.', answer: 'Diagnostics are free. Screen replacement starts from 20 KWD, battery replacement from 12 KWD, laptop hardware repair from 15 KWD, MacBook repair from 25 KWD, and motherboard chip-level repair from 25 KWD.', seo: { title: 'FAQ: Repair Costs Kuwait', description: 'Computer repair pricing in Kuwait.', canonicalUrl: 'https://www.computerrepairkuwait.com/faq#cost', schemaTypes: ['FAQPage'] } } as FAQEntity,
    
    'faq-macbook-brands': { id: 'faq-macbook-brands', slug: 'macbook-models', entityType: 'FAQ', isActive: true, title: 'Which MacBook models do you repair?', description: 'List of supported Apple MacBook models for repair.', answer: 'We repair all MacBook models including MacBook Air (M1, M2, M3), MacBook Pro 13", 14", and 16" (M1, M2, M3, M3 Pro, M3 Max), and all Intel MacBook models from 2015 onward. This includes motherboard micro-soldering, USB-C power IC replacement, screen replacement, battery replacement, and liquid damage recovery for all these models.', seo: { title: 'Which MacBook models do you repair?', description: 'We repair all MacBook Air and Pro models including M1, M2, M3, and Intel variations.', canonicalUrl: 'https://www.computerrepairkuwait.com/faq#macbook-models', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-data-loss': { id: 'faq-data-loss', slug: 'data-loss', entityType: 'FAQ', isActive: true, title: 'Will I lose my data during repair?', description: 'Information regarding data preservation during component repairs.', answer: 'Most hardware repairs — including screen replacement, battery replacement, keyboard repair, and charging port repair — do not affect your data at all. For motherboard and motherboard repairs, we repair your original board rather than replacing it, which preserves your data entirely.', seo: { title: 'Will I lose my data during repair?', description: 'Our component-level repair preserves your data completely.', canonicalUrl: 'https://www.computerrepairkuwait.com/faq#data-loss', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-same-day-booking': { id: 'faq-same-day-booking', slug: 'same-day-booking', entityType: 'FAQ', isActive: true, title: 'How do I book a same-day repair?', description: 'Instructions for booking a same-day repair service.', answer: 'Message us on WhatsApp before 11:00 AM for same-day collection and repair eligibility. Share your device model, the fault description, and your area in Kuwait. We confirm availability and send our driver to collect within a few hours.', seo: { title: 'How do I book a same-day repair?', description: 'Message us on WhatsApp before 11:00 AM for same-day computer repair in Kuwait.', canonicalUrl: 'https://www.computerrepairkuwait.com/faq#same-day-booking', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-payment': { id: 'faq-payment', slug: 'payment', entityType: 'FAQ', isActive: true, title: 'What payment methods do you accept?', description: 'Available payment methods for repair services.', answer: 'We accept cash on delivery when we return your repaired device. Payment is only due after the repair is completed, tested, and you are satisfied. We never take payment upfront.', seo: { title: 'What payment methods do you accept?', description: 'Cash on delivery accepted after successful computer repair.', canonicalUrl: 'https://www.computerrepairkuwait.com/faq#payment', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-ssd-upgrade': { id: 'faq-ssd-upgrade', slug: 'ssd-upgrade', entityType: 'FAQ', isActive: true, title: 'Can you upgrade my laptop to an SSD?', description: 'Information on NVMe and SATA SSD upgrade services.', answer: 'Yes. SSD upgrades are one of the most cost-effective performance improvements for older laptops. We install NVMe or SATA SSDs compatible with your model, migrate your existing Windows installation to the new drive, and verify performance after installation.', seo: { title: 'Can you upgrade my laptop to an SSD?', description: 'We provide NVMe and SATA SSD upgrades to drastically improve laptop speed.', canonicalUrl: 'https://www.computerrepairkuwait.com/faq#ssd-upgrade', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-ram-upgrade': { id: 'faq-ram-upgrade', slug: 'ram-upgrade', entityType: 'FAQ', isActive: true, title: 'Can you upgrade my laptop RAM?', description: 'Details on DDR4 and DDR5 laptop memory upgrades.', answer: 'Yes, for laptops with upgradeable RAM slots. We install compatible DDR4 or DDR5 memory and verify stability with stress testing. Note that some modern laptops have soldered RAM that cannot be upgraded.', seo: { title: 'Can you upgrade my laptop RAM?', description: 'DDR4 and DDR5 RAM upgrades available for compatible laptops.', canonicalUrl: 'https://www.computerrepairkuwait.com/faq#ram-upgrade', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-gaming-laptops': { id: 'faq-gaming-laptops', slug: 'gaming-laptops', entityType: 'FAQ', isActive: true, title: 'Do you repair gaming laptops like ASUS ROG, MSI, and Alienware?', description: 'Information on specialized gaming laptop repairs.', answer: 'Yes. Gaming laptop repair is a specialist service at KCROC. We handle ASUS ROG, MSI, Lenovo Legion, Acer Predator, Alienware, Razer, and other high-performance laptops. Common gaming laptop repairs include thermal paste and liquid metal replacement, fan replacement, and GPU diagnostics.', seo: { title: 'Do you repair gaming laptops?', description: 'We specialize in repairing ASUS ROG, MSI, Alienware, and other gaming laptops.', canonicalUrl: 'https://www.computerrepairkuwait.com/faq#gaming-laptops', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-parts': { id: 'faq-parts', slug: 'replacement-parts', entityType: 'FAQ', isActive: true, title: 'Do you use genuine or original replacement parts?', description: 'Policy on sourcing OEM and high-grade compatible parts.', answer: 'We use OEM (Original Equipment Manufacturer) parts wherever available. For screens, batteries, and keyboards, we offer both OEM and high-grade compatible options and explain the difference in quality and price before repair.', seo: { title: 'Do you use genuine replacement parts?', description: 'We use OEM and high-grade compatible parts for all computer repairs.', canonicalUrl: 'https://www.computerrepairkuwait.com/faq#replacement-parts', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-surface': { id: 'faq-surface', slug: 'surface-repair', entityType: 'FAQ', isActive: true, title: 'Do you repair Microsoft Surface laptops?', description: 'Information on Microsoft Surface screen and hardware repair.', answer: 'Yes. We repair Microsoft Surface devices including Surface Pro, Surface Laptop, and Surface Book models. Surface repair is specialist work due to their adhesive-sealed construction. We have the correct tools and experience for Surface disassembly and repair.', seo: { title: 'Do you repair Microsoft Surface laptops?', description: 'Expert Microsoft Surface Pro and Laptop repair in Kuwait.', canonicalUrl: 'https://www.computerrepairkuwait.com/faq#surface-repair', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-corporate': { id: 'faq-corporate', slug: 'corporate', entityType: 'FAQ', isActive: true, title: 'Do you provide repair services for businesses and offices?', description: 'Details regarding corporate B2B IT support and batch repairs.', answer: 'Yes. We service offices, schools, and businesses throughout Kuwait with hardware repair, SSD upgrades, Windows reinstallation, and preventive maintenance. For businesses with multiple devices, we arrange batch collection and provide itemised invoices.', seo: { title: 'Do you provide IT repair for businesses?', description: 'Corporate and business IT support, batch repairs, and maintenance across Kuwait.', canonicalUrl: 'https://www.computerrepairkuwait.com/faq#corporate', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-hinge': { id: 'faq-hinge', slug: 'hinge-repair', entityType: 'FAQ', isActive: true, title: 'Can you repair a broken laptop hinge?', description: 'Information on broken laptop hinge and chassis repair.', answer: 'Yes. Broken hinges are a common failure on heavily used laptops. Left unrepaired, a loose hinge will crack the screen bezel, damage the display cable, and eventually crack the screen itself. We repair or replace hinge assemblies and reinforce the chassis.', seo: { title: 'Can you repair a broken laptop hinge?', description: 'Fast laptop hinge and chassis repair to prevent further screen damage.', canonicalUrl: 'https://www.computerrepairkuwait.com/faq#hinge-repair', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-keyboard': { id: 'faq-keyboard', slug: 'keyboard-repair', entityType: 'FAQ', isActive: true, title: 'Can you replace a laptop keyboard?', description: 'Details on laptop and MacBook keyboard replacement services.', answer: 'Yes. We replace laptop keyboards for all major brands including Dell, HP, Lenovo, ASUS, and Acer. For MacBook keyboard replacement, we handle both the butterfly mechanism and the Magic Keyboard.', seo: { title: 'Can you replace a laptop keyboard?', description: 'Keyboard replacement for Windows laptops and Apple MacBooks.', canonicalUrl: 'https://www.computerrepairkuwait.com/faq#keyboard-repair', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-wifi': { id: 'faq-wifi', slug: 'wifi-repair', entityType: 'FAQ', isActive: true, title: 'My laptop WiFi stopped working. Can you fix it?', description: 'Diagnostics and repair for laptop wireless connectivity issues.', answer: 'Yes. WiFi failure can have several causes: a damaged wireless card, a loose antenna connector, a driver issue, or a failed BIOS setting. In most cases, WiFi card replacement resolves the issue and is a same-day repair.', seo: { title: 'Laptop WiFi stopped working. Can you fix it?', description: 'Diagnosis and replacement of failed laptop WiFi cards and antennas.', canonicalUrl: 'https://www.computerrepairkuwait.com/faq#wifi-repair', schemaTypes: ['FAQPage'] } } as FAQEntity,

    /* ═══════════════════════════════════════════════════════════════
       BATTERY HEALTH GUIDE FAQs (guide-battery)
    ═══════════════════════════════════════════════════════════════ */
    'faq-battery-how-to-know': { id: 'faq-battery-how-to-know', slug: 'battery-how-to-know', entityType: 'FAQ', isActive: true, title: 'How do I know if my laptop battery needs replacing?', description: 'The strongest combined indicators of a failing laptop battery.', answer: 'Look at the pattern, not one symptom in isolation: fast drain, a battery health report showing severe wear, unexpected shutdowns, or swelling are the strongest indicators. A single odd reading is usually software, not a bad battery.', seo: { title: 'How do I know if my laptop battery needs replacing?', description: 'The strongest combined indicators of a failing laptop battery.', canonicalUrl: 'https://www.computerrepairkuwait.com/guides/laptop-battery-warning-signs#faq', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-battery-check-windows': { id: 'faq-battery-check-windows', slug: 'battery-check-windows', entityType: 'FAQ', isActive: true, title: 'How do I check battery health in Windows 11?', description: 'Using powercfg to generate a battery health report.', answer: 'Open Command Prompt or Terminal and run "powercfg /batteryreport", then open the generated HTML file. It shows Design Capacity vs Full Charge Capacity, plus recent usage and capacity history.', seo: { title: 'How do I check battery health in Windows 11?', description: 'Using powercfg to generate a battery health report.', canonicalUrl: 'https://www.computerrepairkuwait.com/guides/laptop-battery-warning-signs#faq', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-battery-check-macbook': { id: 'faq-battery-check-macbook', slug: 'battery-check-macbook', entityType: 'FAQ', isActive: true, title: 'How do I check MacBook battery health?', description: 'Finding Maximum Capacity and Condition in System Settings.', answer: 'Go to System Settings \u2192 Battery \u2192 Battery Health. It shows a Maximum Capacity percentage and a Condition status such as Normal, Service Recommended, or Replace Soon.', seo: { title: 'How do I check MacBook battery health?', description: 'Finding Maximum Capacity and Condition in System Settings.', canonicalUrl: 'https://www.computerrepairkuwait.com/guides/laptop-battery-warning-signs#faq', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-battery-replace-percentage': { id: 'faq-battery-replace-percentage', slug: 'battery-replace-percentage', entityType: 'FAQ', isActive: true, title: 'What percentage of battery health means I should replace it?', description: 'Why there is no single universal replacement threshold.', answer: 'There\u2019s no single universal threshold across brands and models. As a general guide, health well below 80% combined with real-world symptoms (short runtime, shutdowns) is a reasonable point to consider replacement \u2014 treat it as one input, not a strict rule.', seo: { title: 'What battery health percentage means I should replace it?', description: 'Why there is no single universal replacement threshold.', canonicalUrl: 'https://www.computerrepairkuwait.com/guides/laptop-battery-warning-signs#faq', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-battery-lifespan': { id: 'faq-battery-lifespan', slug: 'battery-lifespan', entityType: 'FAQ', isActive: true, title: 'How many years does a laptop battery last?', description: 'Typical lithium-ion laptop battery lifespan.', answer: 'It varies with chemistry, charge cycles, heat exposure, and charging habits \u2014 commonly somewhere in the 2\u20134 year range for typical daily use, but a well-cared-for battery can last longer and a poorly treated one can degrade faster.', seo: { title: 'How many years does a laptop battery last?', description: 'Typical lithium-ion laptop battery lifespan.', canonicalUrl: 'https://www.computerrepairkuwait.com/guides/laptop-battery-warning-signs#faq', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-battery-cycles': { id: 'faq-battery-cycles', slug: 'battery-cycles', entityType: 'FAQ', isActive: true, title: 'How many charge cycles does a laptop battery have?', description: 'Typical rated charge-cycle counts for laptop batteries.', answer: 'Most modern laptop batteries are rated for roughly 300\u2013500 full cycles before capacity drops meaningfully, though this varies by manufacturer and cell chemistry. A "cycle" is one full discharge, not necessarily one charging session.', seo: { title: 'How many charge cycles does a laptop battery have?', description: 'Typical rated charge-cycle counts for laptop batteries.', canonicalUrl: 'https://www.computerrepairkuwait.com/guides/laptop-battery-warning-signs#faq', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-battery-drain-fast': { id: 'faq-battery-drain-fast', slug: 'battery-drain-fast', entityType: 'FAQ', isActive: true, title: 'Why is my laptop battery draining so fast?', description: 'Common software causes of fast battery drain.', answer: 'It isn\u2019t always the battery. Background apps, brightness, connected peripherals, and pending updates are common software causes \u2014 rule these out before assuming the battery is bad.', seo: { title: 'Why is my laptop battery draining so fast?', description: 'Common software causes of fast battery drain.', canonicalUrl: 'https://www.computerrepairkuwait.com/guides/laptop-battery-warning-signs#faq', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-battery-shutdown-20': { id: 'faq-battery-shutdown-20', slug: 'battery-shutdown-20', entityType: 'FAQ', isActive: true, title: 'Why does my laptop shut down at 20% or higher?', description: 'Why reported battery percentage becomes unreliable with wear.', answer: 'This usually means the battery can no longer maintain voltage under load, so the reported percentage becomes unreliable near that threshold \u2014 a fairly reliable sign of real wear.', seo: { title: 'Why does my laptop shut down at 20% battery?', description: 'Why reported battery percentage becomes unreliable with wear.', canonicalUrl: 'https://www.computerrepairkuwait.com/guides/laptop-battery-warning-signs#faq', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-battery-not-charging': { id: 'faq-battery-not-charging', slug: 'battery-not-charging', entityType: 'FAQ', isActive: true, title: 'Why is my laptop battery not charging?', description: 'Common causes of a laptop battery that will not charge.', answer: 'Could be the charger, the cable, the port, the internal charging circuit, or the battery itself. Test with a known-good charger first; if that doesn\u2019t help, it needs a proper diagnosis rather than a battery swap on a guess.', seo: { title: 'Why is my laptop battery not charging?', description: 'Common causes of a laptop battery that will not charge.', canonicalUrl: 'https://www.computerrepairkuwait.com/guides/laptop-battery-warning-signs#faq', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-battery-swollen-safe': { id: 'faq-battery-swollen-safe', slug: 'battery-swollen-safe', entityType: 'FAQ', isActive: true, title: 'Is it safe to use a laptop with a swollen battery?', description: 'Safety guidance for a physically swollen lithium-ion battery.', answer: 'No. Stop using it immediately, keep it away from heat, and arrange professional removal. A swollen lithium-ion cell can pose a fire risk.', seo: { title: 'Is it safe to use a laptop with a swollen battery?', description: 'Safety guidance for a physically swollen lithium-ion battery.', canonicalUrl: 'https://www.computerrepairkuwait.com/guides/laptop-battery-warning-signs#faq', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-battery-plugged-in': { id: 'faq-battery-plugged-in', slug: 'battery-plugged-in', entityType: 'FAQ', isActive: true, title: 'Should I keep my laptop plugged in all the time?', description: 'Whether staying at 100% charge harms battery health.', answer: 'Keeping it at 100% constantly adds some stress over time. If your laptop offers a charge-limit or optimized-charging feature, use it; otherwise, avoiding long stretches at exactly 100% or 0% is a reasonable habit.', seo: { title: 'Should I keep my laptop plugged in all the time?', description: 'Whether staying at 100% charge harms battery health.', canonicalUrl: 'https://www.computerrepairkuwait.com/guides/laptop-battery-warning-signs#faq', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-battery-use-while-charging': { id: 'faq-battery-use-while-charging', slug: 'battery-use-while-charging', entityType: 'FAQ', isActive: true, title: 'Can I use my laptop while charging?', description: 'Whether using a laptop while plugged in adds battery wear.', answer: 'Yes. Modern laptops route power directly to components when plugged in, largely bypassing the battery, so this doesn\u2019t meaningfully add wear.', seo: { title: 'Can I use my laptop while charging?', description: 'Whether using a laptop while plugged in adds battery wear.', canonicalUrl: 'https://www.computerrepairkuwait.com/guides/laptop-battery-warning-signs#faq', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-battery-compatible-safe': { id: 'faq-battery-compatible-safe', slug: 'battery-compatible-safe', entityType: 'FAQ', isActive: true, title: 'Is a compatible (non-original) laptop battery safe?', description: 'What makes a third-party laptop battery safe to use.', answer: 'A high-quality compatible battery from a reputable manufacturer, matched exactly to voltage, connector, and certification, is generally safe. Not every third-party battery meets that bar, so sourcing matters more than the genuine-vs-compatible label alone.', seo: { title: 'Is a compatible laptop battery safe?', description: 'What makes a third-party laptop battery safe to use.', canonicalUrl: 'https://www.computerrepairkuwait.com/guides/laptop-battery-warning-signs#faq', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-battery-replacement-time': { id: 'faq-battery-replacement-time', slug: 'battery-replacement-time', entityType: 'FAQ', isActive: true, title: 'How long does laptop battery replacement take?', description: 'Typical turnaround time for laptop and MacBook battery replacement in Kuwait.', answer: 'For most laptops in Kuwait, 1\u20132 hours if the correct battery is in stock. Some MacBook models take 1\u20132 days due to adhesive removal and calibration.', seo: { title: 'How long does laptop battery replacement take?', description: 'Typical turnaround time for laptop and MacBook battery replacement in Kuwait.', canonicalUrl: 'https://www.computerrepairkuwait.com/guides/laptop-battery-warning-signs#faq', schemaTypes: ['FAQPage'] } } as FAQEntity,
    /* ═══════════════════════════════════════════════════════════════
       BIOS & UEFI RECOVERY GUIDE FAQs (guide-bios-uefi)
    ═══════════════════════════════════════════════════════════════ */
    'faq-bios-bricked-repairable': { id: 'faq-bios-bricked-repairable', slug: 'bios-bricked-repairable', entityType: 'FAQ', isActive: true, title: 'Can a laptop that was bricked by a BIOS update be repaired?', description: 'Whether firmware-corrupted laptops are recoverable.', answer: 'Often, yes. Many firmware-corruption cases are recoverable when the flash device and underlying motherboard hardware are healthy. However, a black screen or failed POST can also be caused by RAM, power, EC, CPU, PCH or other board-level faults, so diagnosis comes first.', seo: { title: 'Can a laptop bricked by a BIOS update be repaired?', description: 'Whether firmware-corrupted laptops are recoverable.', canonicalUrl: 'https://www.computerrepairkuwait.com/guides/bios-uefi-recovery-kuwait#faq', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-bios-failed-update-chip-damaged': { id: 'faq-bios-failed-update-chip-damaged', slug: 'bios-failed-update-chip-damaged', entityType: 'FAQ', isActive: true, title: 'Does a failed BIOS update always mean the BIOS chip is damaged?', description: 'Why a failed flash does not always mean the chip is physically damaged.', answer: 'No. The flash chip itself may be completely healthy while the data stored on it is incomplete or invalid. Conversely, a system that looks bricked may have a physical motherboard fault unrelated to firmware.', seo: { title: 'Does a failed BIOS update mean the chip is damaged?', description: 'Why a failed flash does not always mean the chip is physically damaged.', canonicalUrl: 'https://www.computerrepairkuwait.com/guides/bios-uefi-recovery-kuwait#faq', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-bios-eeprom-programmer': { id: 'faq-bios-eeprom-programmer', slug: 'bios-eeprom-programmer', entityType: 'FAQ', isActive: true, title: 'Can you recover BIOS using an EEPROM programmer?', description: 'How professional SPI flash programming works.', answer: 'In appropriate cases, a technician can directly program the SPI flash device using professional hardware. The correct image, chip voltage, board architecture and board-specific data must be verified first.', seo: { title: 'Can you recover BIOS using an EEPROM programmer?', description: 'How professional SPI flash programming works.', canonicalUrl: 'https://www.computerrepairkuwait.com/guides/bios-uefi-recovery-kuwait#faq', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-bios-reprogramming-serial': { id: 'faq-bios-reprogramming-serial', slug: 'bios-reprogramming-serial', entityType: 'FAQ', isActive: true, title: 'Will BIOS reprogramming erase my serial number?', description: 'Whether firmware reprogramming affects DMI/SMBIOS platform data.', answer: 'It can affect board-specific firmware data if the wrong image is written. Professional recovery should preserve relevant DMI/SMBIOS information and other platform-specific data where applicable before programming.', seo: { title: 'Will BIOS reprogramming erase my serial number?', description: 'Whether firmware reprogramming affects DMI/SMBIOS platform data.', canonicalUrl: 'https://www.computerrepairkuwait.com/guides/bios-uefi-recovery-kuwait#faq', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-bios-keep-trying-files': { id: 'faq-bios-keep-trying-files', slug: 'bios-keep-trying-files', entityType: 'FAQ', isActive: true, title: 'Should I keep trying different BIOS files if the laptop is not booting?', description: 'Why repeatedly flashing unverified firmware is risky.', answer: 'No. Repeatedly writing unverified firmware can make diagnosis harder and can create additional problems. Once the correct manufacturer recovery process has been verified and fails, professional diagnosis is the safer next step.', seo: { title: 'Should I keep trying different BIOS files?', description: 'Why repeatedly flashing unverified firmware is risky.', canonicalUrl: 'https://www.computerrepairkuwait.com/guides/bios-uefi-recovery-kuwait#faq', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-bios-recovery-time': { id: 'faq-bios-recovery-time', slug: 'bios-recovery-time', entityType: 'FAQ', isActive: true, title: 'How long does BIOS recovery take?', description: 'Typical turnaround time for firmware reprogramming.', answer: 'A straightforward firmware reprogramming job can sometimes be completed the same day. More complicated cases involving board diagnosis, multiple firmware devices, EC firmware or hardware faults can take longer.', seo: { title: 'How long does BIOS recovery take?', description: 'Typical turnaround time for firmware reprogramming.', canonicalUrl: 'https://www.computerrepairkuwait.com/guides/bios-uefi-recovery-kuwait#faq', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-bios-update-vs-recovery': { id: 'faq-bios-update-vs-recovery', slug: 'bios-update-vs-recovery', entityType: 'FAQ', isActive: true, title: "What's the difference between updating BIOS and recovering BIOS?", description: 'Routine firmware updates vs firmware recovery after failure.', answer: 'Updating is a routine, intentional install of newer firmware on a working system. Recovery is restoring firmware after it has been lost or corrupted, on a system that is failing to boot properly.', seo: { title: 'Difference between updating and recovering BIOS?', description: 'Routine firmware updates vs firmware recovery after failure.', canonicalUrl: 'https://www.computerrepairkuwait.com/guides/bios-uefi-recovery-kuwait#faq', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-bios-cmos-reset-fix': { id: 'faq-bios-cmos-reset-fix', slug: 'bios-cmos-reset-fix', entityType: 'FAQ', isActive: true, title: 'Does resetting CMOS fix a corrupted BIOS?', description: 'Why a CMOS reset cannot repair firmware corruption.', answer: 'No. CMOS reset only clears stored settings such as boot order and overclock profiles \u2014 it does not touch the firmware code itself, so it will not fix genuine firmware corruption.', seo: { title: 'Does resetting CMOS fix a corrupted BIOS?', description: 'Why a CMOS reset cannot repair firmware corruption.', canonicalUrl: 'https://www.computerrepairkuwait.com/guides/bios-uefi-recovery-kuwait#faq', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-bios-bitlocker-key-prompt': { id: 'faq-bios-bitlocker-key-prompt', slug: 'bios-bitlocker-key-prompt', entityType: 'FAQ', isActive: true, title: 'Why is Windows asking for a BitLocker recovery key after a BIOS update?', description: 'Why firmware updates trigger a BitLocker recovery-key prompt.', answer: 'This is expected security behavior, not a fault. A firmware update changes the boot-environment measurements BitLocker checks, so Windows asks for the key to confirm the boot chain is still trustworthy.', seo: { title: 'Why does Windows ask for a BitLocker key after a BIOS update?', description: 'Why firmware updates trigger a BitLocker recovery-key prompt.', canonicalUrl: 'https://www.computerrepairkuwait.com/guides/bios-uefi-recovery-kuwait#faq', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-bios-damage-hard-drive': { id: 'faq-bios-damage-hard-drive', slug: 'bios-damage-hard-drive', entityType: 'FAQ', isActive: true, title: 'Can a failed BIOS update damage my hard drive or files?', description: 'Whether firmware recovery puts stored data at risk.', answer: 'A BIOS/UEFI recovery normally targets the firmware chip, not the files on the storage drive \u2014 the two are physically separate. That said, some manufacturer "restore to factory" workflows can erase data as part of the process, and firmware changes can affect access to encrypted storage. Always confirm exactly what a given recovery option does, and have recovery credentials on hand first.', seo: { title: 'Can a failed BIOS update damage my hard drive?', description: 'Whether firmware recovery puts stored data at risk.', canonicalUrl: 'https://www.computerrepairkuwait.com/guides/bios-uefi-recovery-kuwait#faq', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-bios-similar-model-file': { id: 'faq-bios-similar-model-file', slug: 'bios-similar-model-file', entityType: 'FAQ', isActive: true, title: 'Is it safe to use a BIOS file from a different but similar laptop model?', description: 'Why firmware must match the exact board revision.', answer: 'No. Firmware must match the exact platform and board revision. A similar model is not necessarily compatible and can worsen the failure.', seo: { title: 'Is it safe to use a BIOS file from a similar model?', description: 'Why firmware must match the exact board revision.', canonicalUrl: 'https://www.computerrepairkuwait.com/guides/bios-uefi-recovery-kuwait#faq', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-bios-hp-sure-start': { id: 'faq-bios-hp-sure-start', slug: 'bios-hp-sure-start', entityType: 'FAQ', isActive: true, title: "My laptop has HP Sure Start \u2014 what do I do if it still won't boot?", description: 'Why manual BIOS recovery methods do not apply to HP Sure Start systems.', answer: "Manual key-combination and USB recovery methods are explicitly not supported on Sure Start systems, since the platform handles firmware recovery automatically. A boot failure on this hardware more likely points to a non-firmware fault and warrants diagnosis rather than manual recovery attempts.", seo: { title: 'HP Sure Start laptop still not booting \u2014 what now?', description: 'Why manual BIOS recovery methods do not apply to HP Sure Start systems.', canonicalUrl: 'https://www.computerrepairkuwait.com/guides/bios-uefi-recovery-kuwait#faq', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-bios-post-beep-codes': { id: 'faq-bios-post-beep-codes', slug: 'bios-post-beep-codes', entityType: 'FAQ', isActive: true, title: 'What are POST codes and beep codes, and do I need to know mine?', description: 'What POST and beep codes indicate during a boot failure.', answer: "They're a manufacturer-specific early diagnostic signal. You don't need to decode them yourself, but noting the exact pattern helps a technician diagnose faster.", seo: { title: 'What are POST codes and beep codes?', description: 'What POST and beep codes indicate during a boot failure.', canonicalUrl: 'https://www.computerrepairkuwait.com/guides/bios-uefi-recovery-kuwait#faq', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-bios-dual-bios-chip': { id: 'faq-bios-dual-bios-chip', slug: 'bios-dual-bios-chip', entityType: 'FAQ', isActive: true, title: 'Does every motherboard have a backup BIOS chip?', description: 'How common Dual BIOS and Flashback-style hardware actually is.', answer: 'No. Dual BIOS / Flashback-style hardware is common on Gigabyte and higher-end MSI/ASUS boards, but far from universal, and most laptops don\u2019t have it at all.', seo: { title: 'Does every motherboard have a backup BIOS chip?', description: 'How common Dual BIOS and Flashback-style hardware actually is.', canonicalUrl: 'https://www.computerrepairkuwait.com/guides/bios-uefi-recovery-kuwait#faq', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-bios-mac-firmware-flash': { id: 'faq-bios-mac-firmware-flash', slug: 'bios-mac-firmware-flash', entityType: 'FAQ', isActive: true, title: "Can a Mac's firmware be \"flashed\" like a PC's BIOS?", description: 'How Mac firmware recovery differs from PC BIOS flashing.', answer: "Not in the same way. Mac firmware recovery uses Apple's DFU mode with a second Mac and Apple's own tools \u2014 not third-party SPI programming of the main system firmware.", seo: { title: "Can a Mac's firmware be flashed like a PC's BIOS?", description: 'How Mac firmware recovery differs from PC BIOS flashing.', canonicalUrl: 'https://www.computerrepairkuwait.com/guides/bios-uefi-recovery-kuwait#faq', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-bios-security-risk': { id: 'faq-bios-security-risk', slug: 'bios-security-risk', entityType: 'FAQ', isActive: true, title: 'Is BIOS/UEFI firmware a security risk?', description: 'Why firmware-update authentication and secure recovery matter.', answer: 'Yes, in principle. It\u2019s part of why the industry treats firmware-update authentication, signature verification and secure recovery as standard protections, and why manufacturers restrict which firmware files a board will accept.', seo: { title: 'Is BIOS/UEFI firmware a security risk?', description: 'Why firmware-update authentication and secure recovery matter.', canonicalUrl: 'https://www.computerrepairkuwait.com/guides/bios-uefi-recovery-kuwait#faq', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-virus': { id: 'faq-virus', slug: 'virus-removal', entityType: 'FAQ', isActive: true, title: 'Can you remove viruses and malware from my laptop?', description: 'Information on professional virus, malware, and ransomware removal.', answer: 'Yes. We perform complete malware and virus removal, including ransomware, adware, browser hijackers, and rootkits. For severe infections, we back up your personal files and perform a clean Windows installation.', seo: { title: 'Can you remove viruses and malware?', description: 'Professional malware, virus, and adware removal services in Kuwait.', canonicalUrl: 'https://www.computerrepairkuwait.com/faq#virus-removal', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-windows': { id: 'faq-windows', slug: 'windows-install', entityType: 'FAQ', isActive: true, title: 'Can you reinstall Windows on my laptop?', description: 'Details on clean Windows 10 and 11 installation services.', answer: 'Yes. We perform clean Windows 10 and Windows 11 installations with driver installation, Windows Update, and system optimization included. If you have data to preserve, we back up your files before reinstalling.', seo: { title: 'Can you reinstall Windows on my laptop?', description: 'Clean Windows 10 and 11 installations with full data backup and driver setup.', canonicalUrl: 'https://www.computerrepairkuwait.com/faq#windows-install', schemaTypes: ['FAQPage'] } } as FAQEntity,

    /* ═══════════════════════════════════════════════════════════════
       BRANDS
    ═══════════════════════════════════════════════════════════════ */
    'brand-dell': {
      id: 'brand-dell', slug: 'dell-laptop-repair-kuwait', entityType: 'Brand', isActive: true,
      title: 'Dell Laptop Repair Kuwait', brandName: 'Dell', officialWebsite: 'https://www.dell.com',
      description: 'Dell laptops — Inspiron, Latitude, XPS, and Alienware — have specific failure patterns in Kuwait\'s climate. The cooling systems on Dell Inspiron and Latitude models are particularly vulnerable to dust ingress from Kuwait\'s particulate-heavy air. XPS models use soldered RAM and storage, making component-level repair the only cost-effective path when hardware fails.',
      commonModels: ['Inspiron 15', 'Inspiron 14', 'Latitude 5420', 'XPS 13', 'XPS 15', 'G15 Gaming', 'Alienware m16'],
      commonIssues: [
        { id: 'dell-hinge',    title: 'Hinge cracking the bezel',      severity: 'high',   description: 'Dell Inspiron hinges frequently crack the plastic chassis.' },
        { id: 'dell-thermal',  title: 'CPU throttling under load',     severity: 'high',   description: 'Clogged heatsink fins in Kuwait dust conditions.' },
        { id: 'dell-dc-jack',  title: 'Charging port loose or dead',   severity: 'medium', description: 'Dell barrel DC jack failure from heavy plug cycling.' },
        { id: 'dell-screen',   title: 'Screen flickering or lines',    severity: 'medium', description: 'Display cable wear near the hinge.' },
        { id: 'dell-battery',  title: 'Battery swollen',               severity: 'high',   description: 'Lithium degradation from Kuwait summer temperatures.' }
      ],
      relatedServiceIds: ['srv-gaming', 'srv-laptop', 'srv-motherboard', 'srv-screen', 'srv-battery', 'srv-charging-port', 'srv-hinge', 'srv-gaming-laptop-cleaning'],
      relatedProblemIds: ['problem-hinge-break', 'problem-overheating', 'problem-not-charging', 'problem-black-screen'],
      relatedLocationIds: ['loc-hawalli', 'loc-salmiya', 'loc-kuwait-city', 'loc-farwaniya', 'loc-jahra', 'loc-ahmadi'],
      relatedResourcePaths: [{ label: 'Dell laptop overheating guide', path: '/guides/dell-laptop-overheating' }],
      contentImages: [{ src: IMAGES.laptopHardware.dellTeardown.src, alt: IMAGES.laptopHardware.dellTeardown.alt, width: IMAGES.laptopHardware.dellTeardown.width, height: IMAGES.laptopHardware.dellTeardown.height, caption: 'Dell laptop internal hardware opened for repair and diagnosis.' }],
      familyGroups: [
        { name: 'Inspiron & Vostro', description: 'Everyday and business Dell laptops with frequent hinge, charging, battery and thermal repair needs.', models: ['Inspiron 14', 'Inspiron 15', 'Vostro'], repairFocus: ['Hinge/chassis', 'DC jack', 'Battery', 'Cooling'] },
        { name: 'Latitude', description: 'Business systems where reliable power, USB-C charging, keyboard and board diagnosis matter.', models: ['Latitude 5xxx', 'Latitude 7xxx'], repairFocus: ['Charging', 'Power rails', 'Keyboard', 'Motherboard'] },
        { name: 'XPS & Alienware', description: 'Premium and gaming Dell systems where thermals, display assemblies and board faults can be costly.', models: ['XPS 13', 'XPS 15', 'Alienware m16', 'G15 Gaming'], repairFocus: ['Display', 'Thermals', 'GPU/power', 'Motherboard'] }
      ],
      repairProcess: [
        { step: 1, title: 'Confirm model and symptom', description: 'We identify the exact Dell model, reported symptom and any recent drop, spill, charger or overheating event.' },
        { step: 2, title: 'Inspect power, display and thermal paths', description: 'The diagnostic follows the symptom instead of replacing parts by assumption.' },
        { step: 3, title: 'Quote the repair path', description: 'You receive the repair recommendation and pricing before component work is approved.' },
        { step: 4, title: 'Repair and test', description: 'Relevant power, display, charging, thermals and stability are tested before return.' }
      ],
      technicalCapabilities: ['DC jack and USB-C charging diagnosis', 'Motherboard power-rail testing', 'Screen and display-cable diagnosis', 'Hinge and chassis repair', 'Battery and thermal service', 'Board-level repair where technically practical'],
      faqs: [
        { id: 'dell-cost', title: 'How much does Dell laptop repair cost in Kuwait?', answer: 'The cost depends on the model and fault. KCROC diagnoses the problem first and gives the repair quotation before repair work begins; common service starting rates are listed on the pricing page.' },
        { id: 'dell-motherboard', title: 'Do you repair Dell motherboards?', answer: 'Yes, when the board fault is technically repairable. The diagnostic looks for the failed component or circuit before a full-board replacement is considered.' },
        { id: 'dell-pickup', title: 'Do you offer Dell laptop pickup in Kuwait?', answer: 'Yes. Pickup and delivery are available across Kuwait through KCROC\'s repair service.' },
        { id: 'dell-screen', title: 'Can you replace a Dell laptop screen?', answer: 'Yes. The display panel and cable path are checked first so the repair matches the actual fault.' },
        { id: 'dell-authorized', title: 'Is KCROC an official Dell service center?', answer: 'No. KCROC is an independent computer-repair provider in Kuwait, not an official Dell-authorized service center. We diagnose and repair Dell hardware independently and explain the repair path before work begins.' }
      ],
      pricing: { startingFrom: 15, currency: 'KWD', quoteRequired: true, displayLabel: 'From 15 KWD — free diagnostic first' },
      seo: { title: 'Dell Laptop Service Center Kuwait (Independent) | KCROC', description: 'Independent Dell laptop service in Kuwait, not Dell-authorized. Inspiron, Latitude, XPS, G-series and Alienware: screen, battery, hinge and motherboard repair with free pickup.', canonicalUrl: 'https://www.computerrepairkuwait.com/dell-laptop-repair-kuwait', ogType: 'article', schemaTypes: ['Brand', 'Service', 'FAQPage', 'BreadcrumbList'] },
      navigationPriority: 90, popular: true 
    } as BrandEntity,

    'brand-hp': {
      id: 'brand-hp', slug: 'hp-laptop-repair-kuwait', entityType: 'Brand', isActive: true,
      title: 'HP Laptop Repair Kuwait', brandName: 'HP', officialWebsite: 'https://www.hp.com',
      description: 'HP laptops — from the budget Pavilion to the business EliteBook — are among the most repaired devices in our Hawalli lab. HP\'s power management systems are particularly sensitive to Kuwait\'s frequent voltage fluctuations, which cause power IC failures more commonly than in other markets.',
      commonModels: ['Pavilion', 'EliteBook', 'ProBook', 'Spectre x360', 'Envy', 'OMEN', 'Victus'],
      commonIssues: [
        { id: 'hp-power', title: 'Power IC Failure', severity: 'high', description: 'Voltage fluctuation damages power management chips.' },
        { id: 'hp-hinge', title: 'Hinge separation', severity: 'high', description: 'Envy and Pavilion hinge mounts breaking from chassis.' },
        { id: 'hp-fan',   title: 'Fan error on boot', severity: 'medium', description: 'HP system fan (90b) error due to dust accumulation.' }
      ],
      relatedServiceIds: ['srv-gaming', 'srv-laptop', 'srv-motherboard', 'srv-hinge', 'srv-gaming-laptop-cleaning'],
      relatedProblemIds: ['problem-no-power', 'problem-hinge-break', 'problem-overheating'],
      relatedLocationIds: ['loc-hawalli', 'loc-salmiya', 'loc-kuwait-city', 'loc-farwaniya', 'loc-jahra', 'loc-ahmadi'],
      contentImages: [
        { src: IMAGES.laptopHardware.hpLaptopMotherboardRepairOpen.src, alt: IMAGES.laptopHardware.hpLaptopMotherboardRepairOpen.alt, width: IMAGES.laptopHardware.hpLaptopMotherboardRepairOpen.width, height: IMAGES.laptopHardware.hpLaptopMotherboardRepairOpen.height, caption: 'HP laptop opened for motherboard and internal hardware diagnosis.' },
        { src: IMAGES.laptopHardware.hpLaptopMotherboardThermalPasteCleanup.src, alt: IMAGES.laptopHardware.hpLaptopMotherboardThermalPasteCleanup.alt, width: IMAGES.laptopHardware.hpLaptopMotherboardThermalPasteCleanup.width, height: IMAGES.laptopHardware.hpLaptopMotherboardThermalPasteCleanup.height, caption: 'HP cooling and thermal hardware inspected as part of repair.' }
      ],
      familyGroups: [
        { name: 'Pavilion & Envy', description: 'Consumer HP systems where hinges, thermals, batteries, screens and everyday charging faults are common repair paths.', models: ['Pavilion', 'Envy', '14/15-inch systems'], repairFocus: ['Hinge/chassis', 'Cooling', 'Battery', 'Screen'] },
        { name: 'EliteBook & ProBook', description: 'Business laptops where power, keyboard, USB-C and board-level diagnosis can matter more than cosmetic repair.', models: ['EliteBook', 'ProBook'], repairFocus: ['Power', 'Charging', 'Keyboard', 'Motherboard'] },
        { name: 'OMEN & Victus', description: 'Gaming-focused HP systems that need thermal, GPU, power and display diagnosis under load.', models: ['OMEN', 'Victus'], repairFocus: ['Thermals', 'GPU', 'Power', 'Cooling'] }
      ],
      repairProcess: [
        { step: 1, title: 'Model and symptom check', description: 'We confirm the HP family and separate no-power, black-screen, thermal and charging symptoms.' },
        { step: 2, title: 'Hardware diagnosis', description: 'Power, charging, cooling, display and board paths are tested before a part is ordered.' },
        { step: 3, title: 'Clear quotation', description: 'The repair path and expected cost are explained before work starts.' },
        { step: 4, title: 'Repair and verification', description: 'The repaired HP is stress-tested and key functions are checked before delivery.' }
      ],
      technicalCapabilities: ['HP power and charging diagnosis', 'Hinge and chassis repair', 'Cooling and fan service', 'Screen and display diagnosis', 'Motherboard fault tracing', 'Battery replacement'],
      faqs: [
        { id: 'hp-cost', title: 'How much does HP laptop repair cost in Kuwait?', answer: 'Pricing depends on the exact HP model, fault and parts required. KCROC diagnoses first, then gives a quotation before repair.' },
        { id: 'hp-motherboard', title: 'Do you repair HP motherboard faults?', answer: 'Yes, where technically practical. A board-level fault can be investigated before deciding that the entire motherboard needs replacement.' },
        { id: 'hp-pickup', title: 'Can you collect my HP laptop from Farwaniya or Salmiya?', answer: 'Yes. KCROC offers pickup and delivery across Kuwait.' },
        { id: 'hp-overheating', title: 'Can you fix an HP laptop that overheats?', answer: 'Yes. The cooling system, fan behaviour and thermal interface are checked to determine whether cleaning, fan replacement or another hardware repair is appropriate.' },
        { id: 'hp-authorized', title: 'Is KCROC an official HP service center?', answer: 'No. KCROC is an independent computer-repair provider in Kuwait, not an official HP-authorized service center. We diagnose the actual hardware fault and quote the repair path before work begins.' }
      ],
      pricing: { startingFrom: 15, currency: 'KWD', quoteRequired: true, displayLabel: 'From 15 KWD — free diagnostic first' },
      seo: { title: 'HP Laptop Service Center Kuwait (Independent) | KCROC', description: 'Independent HP laptop service in Kuwait, not HP-authorized. EliteBook, Pavilion, ProBook and OMEN repair with free pickup, diagnosis first and a 30-day warranty.', canonicalUrl: 'https://www.computerrepairkuwait.com/hp-laptop-repair-kuwait', ogType: 'article', schemaTypes: ['Brand', 'Service', 'FAQPage', 'BreadcrumbList'] },
      navigationPriority: 80, popular: true 
    } as BrandEntity,

    'brand-lenovo': {
      id: 'brand-lenovo', slug: 'lenovo-laptop-repair-kuwait', entityType: 'Brand', isActive: true,
      title: 'Lenovo Laptop Repair Kuwait', brandName: 'Lenovo', officialWebsite: 'https://www.lenovo.com',
      description: 'Independent Lenovo laptop repair in Kuwait for ThinkPad, IdeaPad, Yoga, Legion, LOQ and ThinkBook systems. KCROC diagnoses the fault before recommending repair, with component-level board work where practical, plus screen, charging, battery, cooling and upgrade services.',
      commonModels: [
        'ThinkPad T Series', 'ThinkPad X Series', 'ThinkPad L Series', 'ThinkPad E Series', 'ThinkPad P Series',
        'IdeaPad 1', 'IdeaPad 3', 'IdeaPad 5', 'IdeaPad Slim', 'IdeaPad Pro',
        'Yoga 6', 'Yoga 7', 'Yoga Slim', 'Yoga Pro',
        'Legion 5', 'Legion 7', 'Legion Pro', 'Legion Slim', 'LOQ',
        'ThinkBook'
      ],
      commonIssues: [
        { id: 'lenovo-no-power', title: 'Lenovo will not turn on', severity: 'high', description: 'Power-button, charging-input and motherboard faults are diagnosed before a board replacement is recommended.' },
        { id: 'lenovo-not-charging', title: 'Lenovo plugged in but not charging', severity: 'high', description: 'Battery, charger, DC-in or USB-C charging paths can be tested to isolate the actual failure.' },
        { id: 'lenovo-usb-c', title: 'USB-C charging or port failure', severity: 'high', description: 'The port and surrounding power-delivery circuitry can be inspected before deciding on port or board repair.' },
        { id: 'lenovo-overheating', title: 'Lenovo overheating and thermal throttling', severity: 'high', description: 'Cooling, fan and thermal-material condition can be checked, especially on performance-oriented Legion and LOQ systems.' },
        { id: 'lenovo-black-screen', title: 'Lenovo turns on but screen is black', severity: 'high', description: 'Display, cable, RAM, firmware and board-level causes can be isolated through staged testing.' },
        { id: 'lenovo-hinge', title: 'Broken or damaged Lenovo hinge', severity: 'high', description: 'Hinge tension, mounting points and surrounding chassis damage are inspected before structural repair or part replacement.' },
        { id: 'lenovo-keyboard', title: 'Lenovo keyboard not working', severity: 'medium', description: 'Keyboard, connector and board-side causes can be tested rather than assuming the keyboard assembly is the only fault.' },
        { id: 'lenovo-wifi', title: 'Lenovo Wi-Fi problems', severity: 'medium', description: 'Adapter, antenna, driver and board-side causes can be separated during diagnosis.' },
        { id: 'lenovo-slow', title: 'Lenovo laptop running slowly', severity: 'medium', description: 'Storage health, RAM capacity, thermals and Windows performance are checked before recommending an upgrade.' },
        { id: 'lenovo-boot', title: 'Lenovo Windows or boot problems', severity: 'high', description: 'Storage, firmware and operating-system causes are checked to determine whether the fault is hardware or software.' },
        { id: 'lenovo-motherboard', title: 'Lenovo motherboard fault', severity: 'high', description: 'Where technically practical, component-level diagnosis is used to identify the failed circuit or component before a full-board replacement is considered.' },
        { id: 'lenovo-liquid', title: 'Lenovo liquid damage', severity: 'critical', description: 'Power isolation, corrosion inspection and board cleaning can be used to assess liquid-damaged hardware.' }
      ],
      familyGroups: [
        {
          name: 'ThinkPad',
          description: 'Business and professional Lenovo laptops.',
          models: ['T Series', 'X Series', 'L Series', 'E Series', 'P Series'],
          repairFocus: ['Power', 'Charging', 'Keyboard', 'Display', 'USB-C', 'Battery', 'Motherboard']
        },
        {
          name: 'IdeaPad',
          description: 'Everyday, student and productivity laptops.',
          models: ['IdeaPad 1', 'IdeaPad 3', 'IdeaPad 5', 'IdeaPad Slim', 'IdeaPad Pro'],
          repairFocus: ['Hinges', 'Screens', 'Battery', 'Charging', 'Keyboard', 'Cooling', 'Motherboard']
        },
        {
          name: 'Yoga',
          description: 'Convertible and 2-in-1 Lenovo systems.',
          models: ['Yoga 6', 'Yoga 7', 'Yoga Slim', 'Yoga Pro'],
          repairFocus: ['Hinges', 'Touch/Display', 'Battery', 'Charging', 'Keyboard', 'Motherboard']
        },
        {
          name: 'Legion',
          description: 'Performance and gaming laptops.',
          models: ['Legion 5', 'Legion 7', 'Legion Pro', 'Legion Slim'],
          repairFocus: ['Cooling', 'Thermals', 'Power', 'Charging', 'Display', 'Motherboard', 'GPU-related diagnosis']
        },
        {
          name: 'LOQ',
          description: 'Lenovo gaming laptops in the LOQ family.',
          models: ['LOQ'],
          repairFocus: ['Thermals', 'Charging', 'Power', 'Display', 'Performance', 'Motherboard']
        },
        {
          name: 'ThinkBook',
          description: 'Business-focused Lenovo laptops.',
          models: ['ThinkBook'],
          repairFocus: ['USB-C', 'Charging', 'Display', 'Keyboard', 'Battery', 'Motherboard']
        }
      ],
      relatedServiceIds: ['srv-gaming', 'srv-laptop', 'srv-motherboard', 'srv-screen', 'srv-battery', 'srv-gaming-laptop-cleaning'],
      relatedProblemIds: [
        'problem-no-power', 'problem-not-charging', 'problem-overheating', 'problem-black-screen',
        'problem-hinge-break', 'problem-keyboard-fail', 'problem-wifi-fail', 'problem-slow',
        'problem-windows-wont-boot', 'problem-liquid-spill', 'problem-cracked-screen'
      ],
      relatedLocationIds: ['loc-hawalli', 'loc-salmiya', 'loc-kuwait-city', 'loc-farwaniya', 'loc-jahra', 'loc-ahmadi', 'loc-fahaheel'],
      relatedResourcePaths: [
        { label: 'Laptop Overheating Problem', path: '/laptop-overheating-kuwait' },
        { label: 'Laptop battery warning signs', path: '/guides/laptop-battery-warning-signs' },
        { label: 'BIOS / UEFI recovery guide', path: '/guides/bios-uefi-recovery-kuwait' }
      ],
      repairProcess: [
        { step: 1, title: 'Pickup & intake', description: 'Arrange KCROC pickup and provide the Lenovo model and symptoms so the repair can be triaged correctly.' },
        { step: 2, title: 'Diagnostic inspection', description: 'The laptop is inspected and tested to identify the fault before repair work is approved.' },
        { step: 3, title: 'Repair quotation', description: 'You receive the recommended repair and price before paid repair work begins.' },
        { step: 4, title: 'Targeted repair', description: 'Where practical, KCROC repairs the failed component or assembly instead of automatically replacing the entire motherboard.' },
        { step: 5, title: 'Post-repair testing', description: 'Relevant power, charging, display, ports, thermals and stability functions are tested before return.' },
        { step: 6, title: 'Return', description: 'The repaired Lenovo is returned through KCROC pickup and delivery service across Kuwait.' }
      ],
      technicalCapabilities: [
        'Multimeter-based electrical diagnosis',
        'Thermal inspection and cooling-system diagnosis',
        'Board-level fault tracing',
        'Micro-soldering where technically appropriate',
        'Power-rail and charging-circuit testing',
        'USB-C and charging-path diagnosis',
        'Corrosion inspection after liquid exposure',
        'Post-repair functional and stability testing'
      ],
      faqs: [
        { id: 'lenovo-cost', title: 'How much does Lenovo laptop repair cost in Kuwait?', answer: 'The cost depends on the model, fault and parts required. KCROC diagnoses the problem first and provides the repair quotation before repair work begins. The current Lenovo page lists diagnostics first with repairs from 15 KWD where applicable.' },
        { id: 'lenovo-motherboard', title: 'Do you repair Lenovo motherboards?', answer: 'Yes, where the fault is technically repairable. KCROC can diagnose individual board-level faults and repair failed components where practical rather than automatically recommending a complete motherboard replacement.' },
        { id: 'lenovo-legion', title: 'Do you repair Lenovo Legion gaming laptops?', answer: 'Yes. Legion systems can require cooling, power, charging, display or motherboard diagnosis, and the repair path depends on the actual fault found.' },
        { id: 'lenovo-thinkpad', title: 'Do you repair Lenovo ThinkPad laptops?', answer: 'Yes. KCROC handles ThinkPad-related power, charging, display, keyboard, USB-C, battery and motherboard faults.' },
        { id: 'lenovo-usbc', title: 'Can you repair a Lenovo USB-C charging port?', answer: 'Yes. The port and surrounding charging or power-delivery circuitry can be tested to determine whether the appropriate repair is a port replacement or a board-level repair.' },
        { id: 'lenovo-yoga', title: 'Do you repair Lenovo Yoga laptops?', answer: 'Yes. Yoga systems can be assessed for hinge, touch/display, battery, charging, keyboard and motherboard-related faults.' },
        { id: 'lenovo-pickup', title: 'Do you offer Lenovo laptop pickup in Kuwait?', answer: 'Yes. KCROC offers pickup and delivery service across Kuwait.' },
        { id: 'lenovo-diagnosis', title: 'Is Lenovo diagnosis free?', answer: 'The current KCROC Lenovo offer lists a free diagnostic before repair. The final repair quotation depends on the fault and required work.' }
      ],
      contentImages: [
        { src: '/images/lenovo-laptop-battery-fan-heatsink-open.webp', alt: 'Lenovo laptop opened for battery, fan and heatsink inspection', caption: 'Lenovo cooling and internal hardware inspection on the repair bench.' },
        { src: '/images/lenovo-laptop-cooling-fan-ssd-slot.webp', alt: 'Lenovo laptop cooling fan and M.2 SSD area', caption: 'Inspecting the cooling system and internal upgrade components.' },
        { src: '/images/lenovo-laptop-dc-power-adapter.webp', alt: 'Lenovo laptop DC power adapter', caption: 'Checking the correct power adapter as part of charging diagnosis.' }
      ],
      pricing: { startingFrom: 15, currency: 'KWD', quoteRequired: true, displayLabel: 'From 15 KWD — free diagnostic first' },
      seo: {
        title: 'Lenovo Laptop Service Center Kuwait (Independent) | KCROC',
        description: 'Independent Lenovo laptop service in Kuwait, not Lenovo-authorized. ThinkPad, IdeaPad, Yoga, Legion, LOQ and ThinkBook repair, quote before repair, component-level where practical.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/lenovo-laptop-repair-kuwait',
        ogType: 'website',
        schemaTypes: ['Brand', 'Service', 'FAQPage', 'BreadcrumbList'],
        breadcrumbs: [
          { name: 'Home', url: '/' },
          { name: 'Brands', url: '/brands' },
          { name: 'Lenovo Laptop Repair Kuwait', url: '/lenovo-laptop-repair-kuwait' }
        ]
      },
      navigationPriority: 95, isFeatured: true, popular: true
    } as BrandEntity,

    'brand-asus': {
      id: 'brand-asus', slug: 'asus-laptop-repair-kuwait', entityType: 'Brand', isActive: true,
      title: 'ASUS Laptop Repair Kuwait', brandName: 'ASUS', officialWebsite: 'https://www.asus.com',
      description: 'ASUS Republic of Gamers (ROG) and TUF laptops are powerhouses, but Kuwait\'s heat pushes their liquid metal and thermal paste to the limit. We specialize in ASUS thermal recovery, ROG motherboard component-level repair, and TUF series screen and battery replacements.',
      commonModels: ['ROG Strix G15', 'ROG Zephyrus G14', 'TUF Gaming A15', 'ZenBook 14', 'VivoBook 15'],
      commonIssues: [
        { id: 'asus-liquid-metal', title: 'Liquid metal dry-out', severity: 'high', description: 'ROG models hitting 95°C+ due to liquid metal pump-out effect.' },
        { id: 'asus-power', title: 'Dead motherboard (No power)', severity: 'high', description: 'TUF series input MOSFET or charging IC failure.' },
        { id: 'asus-wifi', title: 'MediaTek WiFi dropping', severity: 'medium', description: 'Frequent WiFi drops requiring card upgrade to Intel AX series.' },
        { id: 'asus-screen', title: 'Screen flickering', severity: 'medium', description: 'Display cable wear from Zephyrus "ErgoLift" hinge design.' }
      ],
      relatedServiceIds: ['srv-laptop', 'srv-gaming', 'srv-gaming-laptop-cleaning', 'srv-motherboard', 'srv-screen'],
      relatedProblemIds: ['problem-overheating', 'problem-no-power', 'problem-wifi-fail', 'problem-black-screen'],
      relatedLocationIds: ['loc-hawalli', 'loc-salmiya', 'loc-kuwait-city', 'loc-farwaniya', 'loc-ahmadi', 'loc-fahaheel'],
      contentImages: [
        { src: IMAGES.laptopHardware.laptopDisassemblyInternalRepair.src, alt: 'ASUS laptop opened for internal repair and diagnosis', width: IMAGES.laptopHardware.laptopDisassemblyInternalRepair.width, height: IMAGES.laptopHardware.laptopDisassemblyInternalRepair.height, caption: 'ASUS laptop opened for internal hardware diagnosis and repair.' },
        { src: IMAGES.motherboard.asusMotherboardChipsetHeatsinkRepair.src, alt: IMAGES.motherboard.asusMotherboardChipsetHeatsinkRepair.alt, width: IMAGES.motherboard.asusMotherboardChipsetHeatsinkRepair.width, height: IMAGES.motherboard.asusMotherboardChipsetHeatsinkRepair.height, caption: 'ASUS motherboard and heatsink area during component-level diagnosis and repair.' }
      ],
      familyGroups: [
        { name: 'ROG & TUF Gaming', description: 'High-performance ASUS systems where thermal, power and display faults often need model-specific diagnosis.', models: ['ROG Strix', 'ROG Zephyrus', 'TUF Gaming'], repairFocus: ['Thermal service', 'GPU/power', 'Motherboard', 'Display'] },
        { name: 'ZenBook & VivoBook', description: 'Thin and everyday ASUS laptops with charging, display, battery and board-level repair needs.', models: ['ZenBook', 'VivoBook'], repairFocus: ['Charging', 'Battery', 'Screen', 'Motherboard'] }
      ],
      repairProcess: [
        { step: 1, title: 'Identify the ASUS platform', description: 'We confirm the exact model and whether the symptom is thermal, power, charging, display or motherboard related.' },
        { step: 2, title: 'Inspect the cooling and power path', description: 'High-load systems are assessed for fan, thermal-interface, power and board behaviour.' },
        { step: 3, title: 'Approve the repair plan', description: 'We quote the required work before repair.' },
        { step: 4, title: 'Repair and load-test', description: 'Relevant temperatures, charging, display and stability functions are verified.' }
      ],
      technicalCapabilities: ['ROG/TUF thermal service', 'USB-C and DC charging diagnosis', 'GPU and motherboard fault tracing', 'Liquid-metal service on compatible models', 'Screen replacement', 'Battery service'],
      faqs: [
        { id: 'asus-cost', title: 'How much does ASUS laptop repair cost in Kuwait?', answer: 'The cost depends on the ASUS model and the fault found. KCROC diagnoses first and quotes the repair path before work.' },
        { id: 'asus-liquid-metal', title: 'Do you service ASUS ROG liquid-metal cooling?', answer: 'On compatible models, yes. The cooling design is checked first because liquid metal is not suitable for every laptop.' },
        { id: 'asus-pickup', title: 'Do you offer ASUS laptop pickup in Kuwait?', answer: 'Yes. Pickup and delivery are available across Kuwait.' },
        { id: 'asus-motherboard', title: 'Can you repair a dead ASUS motherboard?', answer: 'A dead board can be diagnosed at component level when practical, rather than automatically assuming a full motherboard replacement is required.' }
      ],
      pricing: { startingFrom: 15, currency: 'KWD', quoteRequired: true, displayLabel: 'From 15 KWD — free diagnostic first' },
      seo: { title: 'ASUS Service Center Kuwait | ROG & TUF (Independent) | KCROC', description: 'Independent ASUS service center in Kuwait, not ASUS-authorized. ROG and TUF liquid-metal thermal service, motherboard, charging and screen repair with free pick-up and drop-off.', canonicalUrl: 'https://www.computerrepairkuwait.com/asus-laptop-repair-kuwait', ogType: 'article', schemaTypes: ['Brand', 'Service', 'FAQPage', 'BreadcrumbList'] },
      navigationPriority: 60, popular: false
    } as BrandEntity,

    'brand-acer': {
      id: 'brand-acer', slug: 'acer-laptop-repair-kuwait', entityType: 'Brand', isActive: true,
      title: 'Acer Laptop Repair Kuwait', brandName: 'Acer', officialWebsite: 'https://www.acer.com',
      description: 'Acer Nitro and Predator gaming laptops offer great value but frequently suffer from DC charging jack failures and cooling system blockages in Kuwait. We provide comprehensive repair for Acer Aspire, Nitro, and Predator models, including motherboard diagnostics and screen replacements.',
      commonModels: ['Nitro 5', 'Predator Helios 300', 'Aspire 5', 'Aspire 3', 'Swift 3'],
      commonIssues: [
        { id: 'acer-dc-jack', title: 'Charging port pushed in', severity: 'high', description: 'Nitro 5 DC jack breaking loose from its housing.' },
        { id: 'acer-thermal', title: 'Loud fans & high temps', severity: 'medium', description: 'Predator cooling fins heavily blocked by dust.' },
        { id: 'acer-hinge', title: 'Screen bezel separating', severity: 'medium', description: 'Aspire hinge stress causing the screen assembly to split.' }
      ],
      relatedServiceIds: ['srv-gaming', 'srv-laptop', 'srv-gaming-laptop-cleaning', 'srv-charging-port', 'srv-hinge', 'srv-motherboard'],
      relatedProblemIds: ['problem-not-charging', 'problem-overheating', 'problem-hinge-break'],
      relatedLocationIds: ['loc-hawalli', 'loc-salmiya', 'loc-kuwait-city', 'loc-farwaniya', 'loc-jahra', 'loc-ahmadi'],
      contentImages: [{ src: IMAGES.upgrades.acerLaptopMotherboardRamHeatsink.src, alt: IMAGES.upgrades.acerLaptopMotherboardRamHeatsink.alt, width: IMAGES.upgrades.acerLaptopMotherboardRamHeatsink.width, height: IMAGES.upgrades.acerLaptopMotherboardRamHeatsink.height, caption: 'Acer laptop internal motherboard, RAM and cooling hardware inspected for repair.' }],
      familyGroups: [
        { name: 'Aspire & Swift', description: 'Everyday Acer systems where charging, hinge, battery, display and cooling issues are common repair paths.', models: ['Aspire 3', 'Aspire 5', 'Swift 3'], repairFocus: ['Charging', 'Hinge', 'Battery', 'Display'] },
        { name: 'Nitro & Predator', description: 'Gaming Acer systems that need thermal, GPU, power and cooling checks under sustained load.', models: ['Nitro 5', 'Predator Helios 300'], repairFocus: ['Thermals', 'GPU', 'Cooling', 'Motherboard'] }
      ],
      repairProcess: [
        { step: 1, title: 'Confirm model', description: 'We identify the Acer model and the symptom that needs to be repaired.' },
        { step: 2, title: 'Trace the fault', description: 'Charging, power, thermal, display and board circuits are tested as appropriate.' },
        { step: 3, title: 'Quote before repair', description: 'The repair path is explained before any paid repair work starts.' },
        { step: 4, title: 'Repair and test', description: 'The system is tested for normal operation before return.' }
      ],
      technicalCapabilities: ['DC jack and charging repair', 'Cooling and fan service', 'Hinge/chassis repair', 'Screen replacement', 'Motherboard fault diagnosis', 'Battery replacement'],
      faqs: [
        { id: 'acer-cost', title: 'How much does Acer laptop repair cost in Kuwait?', answer: 'The quotation depends on the Acer model and actual fault. KCROC diagnoses first and gives the repair price before work begins.' },
        { id: 'acer-charging', title: 'Can you repair an Acer charging port?', answer: 'Yes. The port and charging circuit are checked to determine whether a connector repair or board-level repair is required.' },
        { id: 'acer-pickup', title: 'Do you collect Acer laptops from Farwaniya or Jahra?', answer: 'Yes. Pickup and delivery are available across Kuwait.' },
        { id: 'acer-gaming', title: 'Can you service Acer Nitro and Predator laptops?', answer: 'Yes. Gaming thermal, power, charging, display and motherboard faults are covered as part of the relevant repair services.' }
      ],
      pricing: { startingFrom: 15, currency: 'KWD', quoteRequired: true, displayLabel: 'From 15 KWD — free diagnostic first' },
      seo: { title: 'Acer Laptop Repair Kuwait | Nitro & Predator | KCROC', description: 'Independent Acer laptop repair in Kuwait for Nitro, Predator, Aspire and Swift. Charging-port, cooling, hinge and motherboard diagnostics with free pick-up and drop-off.', canonicalUrl: 'https://www.computerrepairkuwait.com/acer-laptop-repair-kuwait', ogType: 'article', schemaTypes: ['Brand', 'Service', 'FAQPage', 'BreadcrumbList'] },
      navigationPriority: 50, popular: false
    } as BrandEntity,

    'brand-msi': {
      id: 'brand-msi', slug: 'msi-laptop-repair-kuwait', entityType: 'Brand', isActive: true,
      title: 'MSI Laptop Repair Kuwait', brandName: 'MSI', officialWebsite: 'https://www.msi.com',
      description: 'MSI laptops are premium gaming machines that require specialized care. In Kuwait, MSI hinges (particularly on GE and GF series) are notorious for breaking. We repair MSI chassis damage, resolve complex motherboard power faults, and provide advanced thermal repasting.',
      commonModels: ['Katana GF66', 'Raider GE76', 'Stealth GS66', 'Thin GF63', 'Cyborg 15'],
      commonIssues: [
        { id: 'msi-hinge', title: 'Hinge breaking the screen cover', severity: 'high', description: 'GF and GE series severe hinge failure.' },
        { id: 'msi-motherboard', title: 'Short circuit on power', severity: 'high', description: 'Blown capacitors on the main power rail preventing boot.' },
        { id: 'msi-battery', title: 'Battery expanding', severity: 'medium', description: 'Swollen battery pushing up on the trackpad.' }
      ],
      relatedServiceIds: ['srv-laptop', 'srv-gaming', 'srv-gaming-laptop-cleaning', 'srv-motherboard', 'srv-hinge', 'srv-battery'],
      relatedProblemIds: ['problem-hinge-break', 'problem-no-power', 'problem-not-charging', 'problem-overheating'],
      relatedLocationIds: ['loc-hawalli', 'loc-salmiya', 'loc-kuwait-city', 'loc-farwaniya', 'loc-ahmadi', 'loc-fahaheel'],
      contentImages: [{ src: IMAGES.gaming.msiWorkstation.src, alt: IMAGES.gaming.msiWorkstation.alt, width: IMAGES.gaming.msiWorkstation.width, height: IMAGES.gaming.msiWorkstation.height, caption: 'MSI gaming laptop and GPU repair workstation for high-performance hardware diagnosis.' }],
      familyGroups: [
        { name: 'Katana & Thin', description: 'Gaming MSI laptops where thermals, hinges, charging and power circuits need practical diagnosis.', models: ['Katana GF66', 'Thin GF63'], repairFocus: ['Thermals', 'Hinge', 'Charging', 'Power'] },
        { name: 'Raider & Stealth', description: 'Higher-end MSI systems with dense cooling and high-load power requirements.', models: ['Raider GE76', 'Stealth GS66', 'Cyborg 15'], repairFocus: ['Cooling', 'GPU/power', 'Display', 'Motherboard'] }
      ],
      repairProcess: [
        { step: 1, title: 'Confirm MSI model and symptom', description: 'We establish whether the issue is power, cooling, charging, display, battery or board related.' },
        { step: 2, title: 'Controlled diagnosis', description: 'Thermal behaviour, charging input and board-level power can be checked under the conditions that reproduce the fault.' },
        { step: 3, title: 'Quote and approval', description: 'The actual repair path and price are presented before work begins.' },
        { step: 4, title: 'Repair and stability test', description: 'Key power, temperature, display and system stability functions are verified.' }
      ],
      technicalCapabilities: ['MSI thermal and fan service', 'Hinge/chassis repair', 'Charging and power diagnosis', 'Motherboard fault tracing', 'Battery replacement', 'Gaming stability testing'],
      faqs: [
        { id: 'msi-cost', title: 'How much does MSI laptop repair cost in Kuwait?', answer: 'MSI repair cost depends on the model, fault and parts required. KCROC diagnoses first and quotes before repair.' },
        { id: 'msi-motherboard', title: 'Do you repair MSI motherboard power faults?', answer: 'Yes, when the failed component or circuit is technically repairable. We diagnose the board before considering a full replacement.' },
        { id: 'msi-pickup', title: 'Do you offer MSI laptop pickup in Kuwait?', answer: 'Yes. Pickup and delivery are available across Kuwait.' },
        { id: 'msi-overheating', title: 'Can you service an overheating MSI gaming laptop?', answer: 'Yes. Cooling condition, fan operation and thermal interface are checked, and the repair path is based on the actual cause.' }
      ],
      pricing: { startingFrom: 20, currency: 'KWD', quoteRequired: true, displayLabel: 'From 20 KWD — free diagnostic first' },
      seo: { title: 'MSI Laptop Repair Kuwait | Hinge & Motherboard | KCROC', description: 'Professional MSI laptop repair in Kuwait. Specialist in MSI hinge repair, motherboard short circuits, and thermal repasting. Free pick & drop.', canonicalUrl: 'https://www.computerrepairkuwait.com/msi-laptop-repair-kuwait', ogType: 'article', schemaTypes: ['Brand', 'Service', 'FAQPage', 'BreadcrumbList'] },
      navigationPriority: 40, popular: false
    } as BrandEntity,

    /* ═══════════════════════════════════════════════════════════════
       PROBLEMS
    ═══════════════════════════════════════════════════════════════ */
    'problem-no-power': {
      id: 'problem-no-power', slug: 'laptop-wont-turn-on', entityType: 'Problem', isActive: true,
      title: 'Laptop Won\'t Turn On (No Power)',
      primaryKeyword: "laptop won't turn on",
      secondaryKeywords: [
        'laptop no power', 'laptop not turning on', 'dead laptop',
        'laptop completely dead', 'laptop won\'t start', 'computer no power'
      ],
      synonyms: ['laptop will not turn on', 'laptop completely dead', 'laptop has no power'],
      description: 'A technician-led no-power diagnostic for laptops with no lights, no fan spin, no charging response or a dead power button.',
      shortDescription: 'Find out whether the fault is the charger, charging port, battery, firmware or motherboard before replacing parts.',
      intro: 'When a laptop will not turn on, the most important question is not “what part should I replace?” It is “is this actually a no-power fault?” A machine with no LEDs, no fan movement and no response needs a different diagnosis from one that powers on with a black screen or reaches the manufacturer logo and then stops. This KCROC problem page is built around that distinction, with safe checks first and technician-level diagnosis only when the external power path has been ruled out.',
      symptom: 'The laptop is completely unresponsive when the power button is pressed. No charging lights illuminate when plugged in, no fan noise is heard, and there is no visible sign of startup.',
      causes: [
        'Failed or incorrectly rated charger or power adapter',
        'Damaged DC charging jack or USB-C charging input',
        'Dead, disconnected or shorted battery',
        'Input protection component, fuse or MOSFET failure',
        'Shorted motherboard power rail or charging circuit',
        'Liquid damage, corrosion or a damaged connector',
        'Embedded-controller or firmware fault that prevents normal power sequencing'
      ],
      doNotDo: 'Do not repeatedly force the power button, wiggle a loose charging connector, reconnect a charger that sparks or trips its protection, puncture a swollen battery, or attempt a DIY motherboard “reflow.” If there is liquid, burning smell, sparking, melted plastic or a swollen battery, disconnect power and stop testing.',
      solution: 'KCROC works from the outside in: verify the power source and correct adapter, inspect the charging input, isolate the battery when appropriate, then measure the motherboard power path if the laptop remains genuinely dead. On board-level cases, the objective is to locate the failed stage—such as an input MOSFET, fuse, charging IC, shorted capacitor or damaged rail—before deciding whether a component repair or board replacement makes financial sense.',
      urgency: 'high',
      relatedServiceIds: ['srv-motherboard', 'srv-laptop', 'srv-charging-port', 'srv-liquid-damage'],
      relatedGuideSlug: 'laptop-wont-turn-on',
      coveredBrands: ['Dell', 'HP', 'Lenovo', 'ASUS', 'Acer', 'MSI', 'Apple MacBook'],
      diagnosticSteps: [
        { step: 1, title: 'Confirm the symptom', description: 'Press the power button once and watch for any charging LED, keyboard light, fan movement, screen backlight, startup sound or blink code. If there is any consistent activity, the case may belong to a black-screen or boot-failure path instead.' },
        { step: 2, title: 'Verify the external power path', description: 'Test a known-good wall outlet and the correct charger. Check the cable, adapter indicator and connector for damage. On USB-C laptops, use a charger and cable capable of delivering the power profile the laptop requires.' },
        { step: 3, title: 'Inspect the charging input', description: 'Look for a loose or damaged DC jack, debris, a recessed connector or a USB-C port that does not accept charging. Do not force a plug or keep testing a port that sparks or becomes abnormally hot.' },
        { step: 4, title: 'Remove simple variables', description: 'Disconnect docks, USB devices, external drives, memory-card readers and other accessories. On models that support it safely, perform the manufacturer-recommended power reset without opening the chassis.' },
        { step: 5, title: 'Separate battery from board fault', description: 'A removable battery can sometimes be isolated safely and the laptop tested on the correct AC adapter. Internal battery isolation is a technician-level procedure on many modern laptops and should not be attempted just to “see if it works.”' },
        { step: 6, title: 'Measure before replacing parts', description: 'If a known-good power source and charging input produce no response, electrical diagnosis can identify missing or collapsed power rails, input protection faults, shorted components or charging-circuit failures instead of guessing at an entire motherboard replacement.' }
      ],
      decisionTree: [
        { symptom: 'No lights + no fan + no response', direction: 'Treat it as a true no-power case. Check outlet → correct charger → charging input → battery → motherboard power path.', href: '#technician-diagnosis', linkLabel: 'See technician diagnosis' },
        { symptom: 'Charging light works but power button does nothing', direction: 'Some input power is present. Investigate the power-button circuit, embedded controller, battery state and motherboard sequencing.' },
        { symptom: 'Lights or fans turn on but screen stays black', direction: 'This is usually not a true no-power fault. Follow the black-screen diagnostic path.', href: '/laptop-black-screen-kuwait', linkLabel: 'Laptop black-screen problem' },
        { symptom: 'Logo appears but Windows does not load', direction: 'Power-up succeeded; investigate boot, storage, Windows or firmware instead of the no-power path.', href: '/windows-wont-boot-kuwait', linkLabel: 'Windows boot problem' },
        { symptom: 'Laptop turns on only with charger connected', direction: 'Battery health, battery connection or the charging system may be involved.', href: '/battery-replacement-kuwait', linkLabel: 'Battery service' }
      ],
      technicianMethod: [
        { step: 1, title: 'Visual and safety inspection', description: 'Inspect the chassis, charging connector, battery condition and signs of liquid or corrosion before energizing a suspicious machine.' },
        { step: 2, title: 'Input voltage verification', description: 'Confirm that the correct adapter is delivering the expected input and that power reaches the laptop’s charging/input stage.' },
        { step: 3, title: 'Resistance and short testing', description: 'Measure relevant rails and compare readings to the board design to identify a rail being pulled down by a short or failed component.' },
        { step: 4, title: 'Power-rail sequencing', description: 'Trace the always-on and startup rails to determine where power stops progressing through the board.' },
        { step: 5, title: 'Thermal and component isolation', description: 'Where appropriate, controlled testing and thermal imaging can help localize a component creating an abnormal heat signature on a shorted rail.' },
        { step: 6, title: 'Repair and post-repair validation', description: 'Repair the confirmed fault at component level when practical, then verify startup and perform stability testing before the device is returned.' }
      ],
      safetyNotes: [
        'Stop immediately if the laptop has a swollen battery, liquid exposure, burning smell, visible sparking or melted plastic.',
        'Do not keep reconnecting a charger that immediately trips, sparks or becomes unusually hot.',
        'Do not open a sealed laptop solely to disconnect the battery unless you are qualified to work around internal batteries and board components.',
        'Do not assume a black screen means the motherboard is dead; lights and fan activity change the diagnostic path.'
      ],
      kuwaitContext: [
        'Laptops used in Kuwait can move between very hot vehicles or outdoor conditions and strongly air-conditioned rooms. Let an overheated device return to normal indoor temperature before powering it if there is concern about heat exposure.',
        'Fine dust can accumulate around ports and inside chassis openings. Dust is not proof of a no-power fault, but it can contribute to connector and cooling problems and is worth documenting during inspection.',
        'KCROC diagnoses no-power faults from its Hawalli lab and offers free pickup and delivery across Kuwait, so customers do not need to transport a completely dead laptop themselves.'
      ],
      faqs: [
        { question: 'Why is my laptop completely dead even when plugged in?', answer: 'Start with the wall outlet and the correct charger. If both are known good and there is still no charging light, fan activity or other response, the fault may be the charging port, battery, input protection, charging circuit or motherboard power rails. Measurements are needed to separate those possibilities.' },
        { question: 'Can a dead battery stop a laptop from turning on?', answer: 'Yes, depending on the laptop design and how the battery has failed. Some models can operate from the correct AC adapter with the battery isolated, while others can behave differently when the battery or its connection is faulty. A swollen battery should not be repeatedly charged or tested.' },
        { question: 'Why does my charger light turn off when I plug it into the laptop?', answer: 'On some adapter designs, an indicator that goes out when connected can indicate the adapter is entering protection because of an overload or short on the laptop side. A faulty adapter can cause similar behavior, so controlled testing with a correct known-good adapter is safer than repeated reconnection.' },
        { question: 'My laptop has lights and fan noise but no picture. Is that a no-power fault?', answer: 'Usually not. Lights or fans show that at least part of the power system is active. The more appropriate path is black-screen or POST diagnosis, which can involve RAM, the display system, BIOS/UEFI, GPU or motherboard initialization.' },
        { question: 'Can I use a phone USB-C charger to test my laptop?', answer: 'Only if it supports the USB Power Delivery profile and wattage the laptop requires. A connector can fit while the charger is still too low-powered to start the laptop. Use a manufacturer-approved or correctly rated USB-C PD charger for a meaningful test.' },
        { question: 'Will holding the power button for 30 seconds fix a dead laptop?', answer: 'It can clear residual power or reset a controller that is stuck, but it cannot repair a failed charger, broken jack, shorted component or damaged motherboard. Treat it as a safe reset step, not a guaranteed repair.' },
        { question: 'Is a laptop that will not turn on automatically a motherboard replacement?', answer: 'No. The cause can be the outlet, charger, charging jack, battery, cable, firmware or a localized board-level component. A diagnosis should identify the failed stage before an entire motherboard is replaced.' },
        { question: 'Can my files stay safe if the laptop has a no-power motherboard fault?', answer: 'Often, the goal of repair is to restore the original board rather than replace it. Whether data remains accessible depends on the device design and the nature of the damage. KCROC diagnoses the original hardware first and does not assume a board replacement is necessary.' }
      ],
      contentImages: [
        { src: IMAGES.laptopHardware.dellChassis.src, alt: IMAGES.laptopHardware.dellChassis.alt, width: IMAGES.laptopHardware.dellChassis.width, height: IMAGES.laptopHardware.dellChassis.height, placement: 'causes', caption: 'Inspecting the chassis and power-delivery area before deeper no-power diagnosis.' },
        { src: IMAGES.motherboard.breadboarding.src, alt: IMAGES.motherboard.breadboarding.alt, width: IMAGES.motherboard.breadboarding.width, height: IMAGES.motherboard.breadboarding.height, placement: 'solution', caption: 'Breadboarding the motherboard outside the chassis to trace a power fault with electrical measurements.' },
      ],
      seo: {
        title: 'Laptop Won\'t Turn On in Kuwait? | No-Power Diagnosis | KCROC',
        description: 'Laptop won\'t turn on in Kuwait? Separate charger, battery, charging-port, display and motherboard faults with a technician-led no-power diagnosis from KCROC.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/laptop-wont-turn-on',
        ogType: 'article',
        schemaTypes: ['TechArticle', 'FAQPage', 'BreadcrumbList'],
        lastModified: '2026-09-27T00:00:00+03:00'
      },
      navigationPriority: 100, popular: true
    } as ProblemEntity,

    'problem-overheating': {
      id: 'problem-overheating', slug: 'laptop-overheating-kuwait', entityType: 'Problem', isActive: true,
      title: 'Laptop Overheating Kuwait',
      primaryKeyword: 'laptop overheating kuwait',
      secondaryKeywords: ['laptop overheating', 'laptop shutting down from heat', 'laptop thermal throttling', 'laptop fan loud and hot'],
      synonyms: ['laptop running hot', 'laptop gets too hot', 'laptop overheats and shuts down'],
      description: 'Diagnostic guide for laptops thermal throttling and shutting down from extreme heat.',
      shortDescription: 'Separate normal fan noise from a real thermal fault before deciding the laptop needs a full cleaning and re-paste.',
      intro: 'An overheating laptop is rarely a single-part failure — it is usually a chain of small problems (dust, dried thermal paste, a tired fan) that compound each other, and Kuwait\'s climate accelerates every link in that chain. This page walks through how to tell normal warm-running from a genuine thermal fault, what to check before booking a cleaning, and what KCROC actually does once the laptop is on the bench.',
      symptom: 'Laptop extremely hot to touch, fans running at maximum speed, performance dropping under load.',
      causes: ['Dust-blocked cooling fins — most common in Kuwait\'s particulate environment', 'Dried thermal paste — accelerates in 45°C+ summer temperatures', 'Failed or worn fan bearing'],
      doNotDo: 'Do not use a laptop that is thermal throttling on intensive tasks — sustained overheating degrades the CPU and eventually kills the motherboard.',
      solution: 'Ultrasonic cleaning of the cooling system, fresh phase-change thermal material application, and fan inspection. We also check BIOS thermal limits.',
      urgency: 'medium',
      relatedServiceIds: ['srv-laptop', 'srv-gaming', 'srv-gaming-laptop-cleaning'],
      relatedResourcePaths: [
        { label: 'Gaming Laptop Cleaning & Thermal Repaste Kuwait', path: '/gaming-laptop-cleaning-kuwait' },
        { label: 'How Often to Clean a Gaming Laptop & Replace Thermal Paste', path: '/blog/how-often-clean-laptop-replace-thermal-paste-kuwait' },
        { label: 'Laptop Temperatures in Kuwait', path: '/blog/laptop-temperatures-kuwait-safe-cpu-gpu-temperatures' },
      ],
      coveredBrands: ['Dell', 'HP', 'Lenovo', 'ASUS', 'Acer', 'MSI', 'Apple MacBook'],
      diagnosticSteps: [
        { step: 1, title: 'Check where the heat actually is', description: 'Feel the underside near the vents and the keyboard area above the CPU/GPU. Heat concentrated in one spot near the fan exhaust points to a cooling blockage; even heat across the whole chassis is more often a design characteristic than a fault.' },
        { step: 2, title: 'Listen to the fan behavior', description: 'A fan that spins at maximum speed constantly, or that changes pitch/grinds, suggests dust resistance or a worn bearing. A fan that never seems to speed up under load can point to a blocked airflow path instead.' },
        { step: 3, title: 'Check the vents and intake', description: 'Look at the visible vents and intake grille for dust or lint. Elevate the laptop off soft surfaces like beds and cushions, which block the intake and can look like a hardware fault by themselves.' },
        { step: 4, title: 'Watch for throttling patterns', description: 'Note whether performance only drops during sustained load (gaming, exports, compiling) or even during light use — sustained-only throttling points toward thermal paste and dust; constant slowness can indicate a separate issue.' },
        { step: 5, title: 'Rule out software causes', description: 'Background updates, malware, or a stuck process pinning the CPU can look identical to a thermal fault. Check Task Manager for a process using continuous high CPU before assuming it is hardware.' },
        { step: 6, title: 'Decide if it is time for a professional cleaning', description: 'If the laptop is 12+ months old, has never been cleaned, or shows the pattern above, an internal cleaning and re-paste is the appropriate next step rather than continuing to run it hot.' }
      ],
      decisionTree: [
        { symptom: 'Hot only under heavy load, fan loud but performance still fine', direction: 'Likely early-stage dust buildup or aging thermal paste. Cleaning now can prevent throttling from developing.' },
        { symptom: 'Hot and throttling (visible slowdown) during gaming or heavy tasks', direction: 'Thermal paste has likely dried out or the cooling fins are blocked. A cleaning and re-paste service is the direct fix.', href: '#technician-diagnosis', linkLabel: 'See how KCROC diagnoses this' },
        { symptom: 'Hot even during light browsing, or shuts down unexpectedly', direction: 'This is more advanced — check for a runaway background process first, then treat as an urgent cooling-system fault if the laptop shuts itself off.' },
        { symptom: 'Laptop is hot but the screen is also flickering or has display corruption', direction: 'Extreme heat can affect the GPU or the display cable. Also check the black-screen problem path if the display is affected.', href: '/laptop-black-screen-kuwait', linkLabel: 'Laptop black-screen problem' }
      ],
      technicianMethod: [
        { step: 1, title: 'Baseline temperature test', description: 'We run the laptop under controlled load and log CPU/GPU temperatures before opening the chassis, so the improvement after service can be verified rather than assumed.' },
        { step: 2, title: 'Full disassembly and inspection', description: 'The chassis is opened and the heatsink, fan assembly and vents are inspected directly for dust density, worn fan grease and paste condition.' },
        { step: 3, title: 'Ultrasonic and compressed cleaning', description: 'The heatsink and fan are cleaned to remove dust and debris that surface cleaning through vents cannot reach.' },
        { step: 4, title: 'Fresh thermal material application', description: 'Dried factory paste is removed and replaced with a phase-change or high-grade thermal compound rated for sustained performance in high-heat environments.' },
        { step: 5, title: 'BIOS thermal-limit and fan-curve check', description: 'We confirm the fan curve and thermal limits in BIOS are behaving as designed, since an incorrect fan curve can mimic a hardware cooling fault.' },
        { step: 6, title: 'Post-service verification', description: 'The same load test is repeated after service and compared against the baseline reading before the laptop is returned.' }
      ],
      safetyNotes: [
        'Stop running intensive workloads (gaming, exports, compiling) on a laptop that is visibly throttling — sustained heat stress shortens CPU and motherboard life.',
        'Do not block the intake vents by using the laptop on a bed, sofa or other soft surface for extended periods.',
        'Do not attempt to open the chassis and apply thermal paste yourself unless you are comfortable with laptop disassembly — incorrect paste application or reassembly can cause more damage than the original heat issue.'
      ],
      kuwaitContext: [
        'Kuwait\'s ambient summer temperatures regularly exceed 45°C, which accelerates the drying and cracking of factory thermal paste well ahead of the timelines seen in cooler climates.',
        'Fine airborne dust and sand are more prevalent locally, which clogs cooling fins faster than in most other regions — a laptop that would need cleaning every 18-24 months elsewhere may need it every 8-12 months here.',
        'KCROC sees overheating as one of the most common Kuwait-specific repair categories and offers free pickup and delivery across all governorates so the laptop does not need to be carried in during peak heat.'
      ],
      faqs: [
        { question: 'Is it normal for a laptop to feel hot in Kuwait?', answer: 'Some warmth under load is normal, especially with high ambient room temperatures. It becomes a problem when the fan runs at maximum constantly, performance visibly drops under load, or the laptop shuts down unexpectedly.' },
        { question: 'How often should a laptop be cleaned in Kuwait\'s climate?', answer: 'As a general guide, every 8-12 months for regular use, sooner for gaming laptops or laptops used in dusty environments. A laptop that has never been cleaned and is 12+ months old is a reasonable candidate regardless of symptoms.' },
        { question: 'Can overheating actually damage my laptop permanently?', answer: 'Yes. Sustained high temperatures accelerate wear on the CPU, GPU, battery and solder joints, and can eventually cause motherboard-level failures that are far more expensive than a routine cleaning.' },
        { question: 'Will cleaning fix my laptop if it is already shutting down from heat?', answer: 'In most cases a cleaning and re-paste resolves shutdown-from-heat issues caused by dust and dried paste. If the fan bearing has failed or the shutdown persists after cleaning, further diagnosis of the fan or thermal sensor may be needed.' },
        { question: 'Does using a cooling pad actually help?', answer: 'A cooling pad can modestly reduce ambient temperature around the chassis, but it cannot remove internal dust or restore dried thermal paste — it is a supplement to cleaning, not a replacement for it.' },
        { question: 'How long does a laptop cleaning and re-paste take at KCROC?', answer: 'Most laptops are completed within a few hours for standard cleaning and re-pasting, same-day in most cases when the laptop is dropped off or picked up in the morning.' }
      ],
      contentImages: [
        { src: IMAGES.laptopHardware.laptopDustCleaningOverheatingKuwait.src, alt: IMAGES.laptopHardware.laptopDustCleaningOverheatingKuwait.alt, width: IMAGES.laptopHardware.laptopDustCleaningOverheatingKuwait.width, height: IMAGES.laptopHardware.laptopDustCleaningOverheatingKuwait.height, placement: 'causes', caption: 'Dust buildup inside the cooling system — the leading cause of overheating in Kuwait\'s climate.' },
        { src: IMAGES.laptopHardware.copperHeatsink2.src, alt: IMAGES.laptopHardware.copperHeatsink2.alt, width: IMAGES.laptopHardware.copperHeatsink2.width, height: IMAGES.laptopHardware.copperHeatsink2.height, placement: 'solution', caption: 'Cleaning the copper heatsink and applying fresh thermal material during the repair.' },
      ],
      seo: { title: 'Laptop Overheating Kuwait — Fix & Thermal Service | KCROC', description: 'Laptop overheating in Kuwait? Kuwait\'s summer heat destroys thermal paste and clogs cooling fins. We deep-clean and re-paste. Free pick & drop. Same-day service.', canonicalUrl: 'https://www.computerrepairkuwait.com/laptop-overheating-kuwait', ogType: 'article', schemaTypes: ['TechArticle', 'FAQPage'], lastModified: '2026-09-10T00:00:00+03:00' },
      navigationPriority: 90, popular: true 
    } as ProblemEntity,

    'problem-black-screen': {
      id: 'problem-black-screen', slug: 'laptop-black-screen-kuwait', entityType: 'Problem', isActive: true,
      title: 'Laptop Turns On But Screen is Black',
      primaryKeyword: 'laptop screen black',
      secondaryKeywords: ['laptop turns on but no display', 'laptop black screen fix', 'laptop powers on no picture', 'blank screen laptop fan running'],
      synonyms: ['laptop powers on but no display', 'blank screen laptop', 'laptop black screen but fans running'],
      description: 'Diagnostic guide for laptops that power on (lights/fans) but display nothing on the screen.',
      shortDescription: 'Tell apart a display-cable fault, a blown backlight fuse, a RAM issue and a GPU or firmware failure before opening the laptop.',
      intro: 'A black screen with the fans running and lights on is one of the most confusing laptop faults, because it means the laptop is powering up — the fault is somewhere between the power-on stage and the point where an image should appear. That could be RAM, the display panel, the video cable, the GPU or the firmware. This page walks through the checks that narrow that list before any parts are opened or replaced.',
      symptom: 'You press the power button, the keyboard lights up, and you can hear the fans spinning, but the screen remains completely black. Connecting to an external monitor might sometimes show a picture.',
      causes: ['Failed RAM stick or poorly seated RAM', 'Blown backlight fuse on the motherboard', 'Damaged internal display cable', 'Failed GPU (Graphics Processing Unit)', 'Corrupted BIOS firmware'],
      doNotDo: 'Do not repeatedly force-restart the laptop by holding the power button. If the BIOS is trying to recover or update, force-restarting will brick the motherboard permanently.',
      solution: 'We first test RAM and external outputs. If it is a motherboard issue, we use boardview schematics to locate and replace the blown backlight fuse or reflash the BIOS chip directly.',
      urgency: 'high',
      relatedServiceIds: ['srv-screen', 'srv-motherboard'],
      coveredBrands: ['Dell', 'HP', 'Lenovo', 'ASUS', 'Acer', 'MSI', 'Apple MacBook'],
      diagnosticSteps: [
        { step: 1, title: 'Test on an external monitor', description: 'Connect an external monitor or TV via HDMI/USB-C. If a picture appears there, the fault is likely the internal panel, its cable or the backlight — not the GPU or motherboard.' },
        { step: 2, title: 'Check for any faint image', description: 'Shine a flashlight closely at the screen at an angle in a dark room. A very faint, dim image usually means a backlight fault (the screen is technically working); no image at all points elsewhere.' },
        { step: 3, title: 'Listen for POST beep codes', description: 'Some laptops emit a beep pattern when RAM or the display path fails during startup. Note the pattern and check the manufacturer\'s beep-code reference if present.' },
        { step: 4, title: 'Try a single-RAM-stick test', description: 'On laptops with accessible RAM, if there are two modules, try booting with only one installed at a time — a failed or poorly seated stick is a common and inexpensive cause of a black screen.' },
        { step: 5, title: 'Rule out sleep/display-driver confusion', description: 'Press the power button briefly and wait, and try the keyboard backlight or caps-lock key to see if the system responds — occasionally a stuck sleep state or corrupted display driver looks identical to a hardware fault.' },
        { step: 6, title: 'Stop if the fault followed a BIOS update', description: 'If the black screen appeared right after a firmware/BIOS update, treat it as a firmware recovery case rather than a display fault — do not repeatedly power-cycle the laptop.' }
      ],
      decisionTree: [
        { symptom: 'External monitor shows a picture, internal screen stays black', direction: 'Points to the internal panel, backlight fuse or display cable rather than the GPU or motherboard logic.' },
        { symptom: 'No image on external monitor either, but lights/fans are on', direction: 'Points toward RAM, GPU or motherboard-level POST failure. Try the single-RAM-stick test before assuming a board fault.', href: '#technician-diagnosis', linkLabel: 'See technician diagnosis' },
        { symptom: 'Black screen appeared right after a BIOS/firmware update', direction: 'This is a firmware recovery case, not a typical black-screen fault. See the BIOS & UEFI recovery guide.', href: '/guides/bios-uefi-recovery-kuwait', linkLabel: 'BIOS & UEFI recovery guide' },
        { symptom: 'No lights, no fan, completely unresponsive', direction: 'This is not a black-screen case — it is a true no-power fault. Follow the no-power diagnostic path instead.', href: '/laptop-wont-turn-on', linkLabel: 'Laptop won\'t turn on problem' }
      ],
      technicianMethod: [
        { step: 1, title: 'External display and POST verification', description: 'We confirm whether the system POSTs correctly and outputs to an external display before opening the chassis, isolating the panel/cable from the motherboard/GPU path.' },
        { step: 2, title: 'RAM testing and reseating', description: 'RAM modules are tested individually and reseated or swapped to rule out a seating or module failure.' },
        { step: 3, title: 'Backlight fuse and inverter check', description: 'Using boardview schematics, we test the backlight fuse and related circuit for continuity — a common, relatively low-cost point of failure.' },
        { step: 4, title: 'Display cable and panel inspection', description: 'The internal video/eDP cable and connector are inspected for damage, pinched routing or a loose connection at the hinge.' },
        { step: 5, title: 'GPU and firmware diagnosis', description: 'Where the fault is not explained by the above, GPU-level testing and firmware/BIOS verification (including reflashing where appropriate) are used to isolate the remaining possibilities.' },
        { step: 6, title: 'Repair and verification', description: 'The confirmed component (fuse, cable, panel or chip-level fault) is repaired or replaced, then the laptop is run through a full display and stability test before return.' }
      ],
      safetyNotes: [
        'Do not repeatedly force-restart a laptop that just received a BIOS/firmware update — this can turn a recoverable firmware issue into a bricked motherboard.',
        'Avoid pressing on or flexing the display panel to "test" it — physical pressure can turn a cable fault into a cracked panel.',
        'If the black screen followed a drop or impact, treat it as possible physical damage and avoid closing/opening the lid repeatedly.'
      ],
      kuwaitContext: [
        'Heat and dust exposure common in Kuwait can accelerate connector and cable wear at the hinge, which is one of the more common causes of an intermittent or permanent black screen over a laptop\'s lifetime.',
        'Voltage fluctuations during power outages, which occur periodically in parts of Kuwait, can occasionally coincide with firmware corruption — if the black screen started right after a power interruption, mention this during diagnosis.',
        'KCROC keeps common backlight fuses, display cables and panels for major brands in stock at the Hawalli lab to shorten turnaround on this specific fault.'
      ],
      faqs: [
        { question: 'My laptop has power and fan noise but a black screen — is this a motherboard problem?', answer: 'Not necessarily. It can be RAM, the display panel, the backlight fuse, the display cable, the GPU or firmware. An external-monitor test is the fastest way to narrow it down before assuming the motherboard is at fault.' },
        { question: 'Can a failed RAM stick really cause a completely black screen?', answer: 'Yes. Many laptops will not display anything, not even a manufacturer logo, if the installed RAM is faulty or poorly seated. This is one of the most common and least expensive causes of this symptom.' },
        { question: 'What is a backlight fuse and why does it blow?', answer: 'It is a small protective component on the motherboard that can fail due to a power surge, physical damage or age. When it blows, the screen usually still works but produces no visible light, which can look identical to a fully dead display.' },
        { question: 'Should I try reflashing the BIOS myself?', answer: 'This is not recommended without the correct equipment and file for your exact model. An incorrect or interrupted flash can turn a recoverable issue into a laptop that will not power on at all.' },
        { question: 'Does an external monitor working mean my laptop screen is definitely broken?', answer: 'It strongly suggests the fault is isolated to the internal display path (panel, cable or backlight) rather than the motherboard or GPU, but a technician inspection is still needed to confirm the exact component.' },
        { question: 'How long does black-screen diagnosis and repair typically take?', answer: 'Simple cases like RAM reseating or a backlight fuse replacement can often be completed the same day. Panel replacements or firmware recovery cases may take 1-2 days depending on parts availability.' }
      ],
      contentImages: [
        { src: IMAGES.laptopHardware.dellLaptopScreenRepairCompleted.src, alt: IMAGES.laptopHardware.dellLaptopScreenRepairCompleted.alt, width: IMAGES.laptopHardware.dellLaptopScreenRepairCompleted.width, height: IMAGES.laptopHardware.dellLaptopScreenRepairCompleted.height, placement: 'causes', caption: 'Laptop display hardware during screen-failure diagnosis and repair.' },
        { src: IMAGES.laptopHardware.laptopBiosDiagnosticScreenRepair.src, alt: IMAGES.laptopHardware.laptopBiosDiagnosticScreenRepair.alt, width: IMAGES.laptopHardware.laptopBiosDiagnosticScreenRepair.width, height: IMAGES.laptopHardware.laptopBiosDiagnosticScreenRepair.height, placement: 'solution', caption: 'Running BIOS-level diagnostics to locate the blown fuse or corrupted firmware causing the black screen.' },
      ],
      seo: { title: 'Laptop Turns On But Screen is Black — Fix in Kuwait | KCROC', description: 'Laptop has power but a black screen? We diagnose backlight fuses, RAM failures, and dead displays. Free pick & drop in Kuwait.', canonicalUrl: 'https://www.computerrepairkuwait.com/laptop-black-screen-kuwait', ogType: 'article', schemaTypes: ['TechArticle', 'FAQPage'], lastModified: '2026-09-10T00:00:00+03:00' },
      navigationPriority: 80, popular: true 
    } as ProblemEntity,

    'problem-liquid-spill': {
      id: 'problem-liquid-spill', slug: 'spilled-water-on-laptop', entityType: 'Problem', isActive: true,
      title: 'Spilled Water or Coffee on Laptop',
      description: 'Emergency guide for liquid damage on laptops and MacBooks.',
      symptom: 'Liquid (water, coffee, juice) has been spilled on the keyboard. The device may have shut off instantly, or the keyboard may be acting erratically.',
      causes: ['Liquid creates conductive bridges across motherboard components, causing immediate electrical shorts.', 'Sugars and acids in coffee/juice accelerate copper corrosion within hours.'],
      doNotDo: 'DO NOT put it in rice (rice dust makes it worse). DO NOT use a hairdryer (pushes liquid deeper). DO NOT TRY TO TURN IT ON to "see if it works" — this causes the electrical shorts that kill the board.',
      solution: 'Immediate power disconnection. We fully disassemble the device, remove the motherboard, and run it through an industrial ultrasonic cleaner to strip all liquid and corrosion. We then replace any shorted chips via micro-soldering.',
      urgency: 'critical',
      relatedServiceIds: ['srv-motherboard', 'srv-macbook', 'srv-liquid-damage'],
      contentImages: [
        { src: IMAGES.laptopHardware.dellLaptopCorruptedScreenGpuFailure.src, alt: IMAGES.laptopHardware.dellLaptopCorruptedScreenGpuFailure.alt, width: IMAGES.laptopHardware.dellLaptopCorruptedScreenGpuFailure.width, height: IMAGES.laptopHardware.dellLaptopCorruptedScreenGpuFailure.height, placement: 'causes', caption: 'Display corruption after a liquid spill — a sign the short has reached the graphics circuit.' },
        { src: IMAGES.laptopHardware.laptopBatteryMotherboardOpenRepair.src, alt: IMAGES.laptopHardware.laptopBatteryMotherboardOpenRepair.alt, width: IMAGES.laptopHardware.laptopBatteryMotherboardOpenRepair.width, height: IMAGES.laptopHardware.laptopBatteryMotherboardOpenRepair.height, placement: 'solution', caption: 'The motherboard removed for ultrasonic cleaning and corrosion inspection before any chip is replaced.' },
      ],
      seo: { title: 'Spilled Water on Laptop in Kuwait? Emergency Repair | KCROC', description: 'Spilled coffee or water on your laptop? Do not turn it on! We offer ultrasonic motherboard cleaning and chip-level repair to save your device and data.', canonicalUrl: 'https://www.computerrepairkuwait.com/spilled-water-on-laptop', ogType: 'article', schemaTypes: ['Article', 'FAQPage'] },
      navigationPriority: 70, popular: false
    } as ProblemEntity,

    'problem-not-charging': {
      id: 'problem-not-charging', slug: 'laptop-plugged-in-not-charging', entityType: 'Problem', isActive: true,
      title: 'Laptop Plugged In But Not Charging',
      primaryKeyword: 'laptop plugged in not charging',
      secondaryKeywords: ['laptop says plugged in not charging', 'laptop battery not charging', 'laptop only works plugged in', 'laptop charging port broken'],
      synonyms: ['laptop won\'t charge', 'laptop battery stuck at percentage', 'laptop dies when unplugged'],
      description: 'Troubleshooting a laptop that detects the charger but the battery percentage does not increase.',
      shortDescription: 'Work out whether it is the battery, the charging port, the charger itself, or a motherboard charging chip before booking a repair.',
      intro: '"Plugged in, not charging" is a message that can mean several unrelated things: the battery itself has degraded, the charging port is loose or damaged, the adapter is failing, or the charging circuit on the motherboard has failed. Guessing which one it is by replacing parts one at a time gets expensive fast — this page walks through the checks that actually narrow it down first.',
      symptom: 'The laptop recognizes the charger is plugged in (Windows says "Plugged in"), but the battery level stays the same or slowly drops. Or, the laptop only works when plugged into the wall and dies instantly if unplugged.',
      causes: ['Severely degraded lithium battery cells', 'Damaged DC-In charging jack', 'Failed charging IC chip on the motherboard', 'Counterfeit or underpowered charger'],
      doNotDo: 'Do not forcefully bend the charging cable at extreme angles trying to "find the sweet spot" to make it charge — this usually breaks the internal port off the motherboard.',
      solution: 'We test your battery health and charger voltage. If the battery is dead, we replace it. If the motherboard charging circuit has failed, we replace the specific charging IC (like the BQ chip or CD3215 on MacBooks).',
      urgency: 'medium',
      relatedServiceIds: ['srv-battery', 'srv-laptop', 'srv-charging-port'],
      relatedGuideSlug: 'laptop-battery-warning-signs',
      coveredBrands: ['Dell', 'HP', 'Lenovo', 'ASUS', 'Acer', 'MSI', 'Apple MacBook'],
      diagnosticSteps: [
        { step: 1, title: 'Test with a known-good charger', description: 'If possible, borrow or buy a correctly rated OEM or certified charger and cable, and test with that first — a failing or counterfeit adapter is one of the most common and cheapest causes.' },
        { step: 2, title: 'Check the "plugged in" message carefully', description: 'Windows distinguishes between "Plugged in, charging" and "Plugged in, not charging." The latter specifically points away from a totally dead charger (which would usually show no charging status at all) and toward the battery or charging circuit.' },
        { step: 3, title: 'Inspect and wiggle-test the port gently', description: 'With the laptop off, gently check if the charging port feels loose, wobbly or recessed compared to when new. Do not force or repeatedly flex the connector — a visibly damaged port is enough evidence on its own.' },
        { step: 4, title: 'Check the battery health report', description: 'On Windows, generate a battery report (see the battery warning-signs guide) — a battery showing severely reduced capacity is a likely contributor even if it is not the whole story.' },
        { step: 5, title: 'Note whether it charges intermittently', description: 'If gently repositioning the cable makes charging start and stop, this points strongly to a loose DC jack or connector rather than the battery or motherboard chip.' },
        { step: 6, title: 'Decide the likely path before booking', description: 'A dead-but-stable charging status with a known-good charger usually means battery or motherboard charging IC; an intermittent, cable-position-dependent fault usually means the port.' }
      ],
      decisionTree: [
        { symptom: 'Known-good charger tested, still "plugged in, not charging"', direction: 'Points toward the battery itself or the motherboard charging circuit. A battery health check is the next step.', href: '/guides/laptop-battery-warning-signs', linkLabel: 'Battery warning signs guide' },
        { symptom: 'Charging works only when the cable is held at a specific angle', direction: 'Points strongly toward a loose or damaged DC-in/USB-C charging port rather than the battery.' },
        { symptom: 'Original charger shows no light or response at all, on any device', direction: 'The charger itself has likely failed — replace with a correct-wattage OEM or certified adapter before assuming a laptop-side fault.' },
        { symptom: 'Laptop shuts off instantly when unplugged, even at high reported battery %', direction: 'The reported percentage is unreliable — this is a strong sign of a genuinely failed battery that can no longer hold or deliver charge.' }
      ],
      technicianMethod: [
        { step: 1, title: 'Charger output verification', description: 'The adapter\'s voltage and current output are measured directly to confirm it is delivering the correct, stable power before any laptop-side component is suspected.' },
        { step: 2, title: 'Charging port inspection', description: 'The DC-in or USB-C port is inspected and tested for a secure mechanical and electrical connection, since a loose port is a common and low-cost fix.' },
        { step: 3, title: 'Battery health and cell testing', description: 'The battery is tested for capacity, voltage under load and physical condition (checking for swelling) to determine whether it can still hold and deliver a usable charge.' },
        { step: 4, title: 'Charging IC diagnosis', description: 'If the charger, port and battery all test as functional, the motherboard\'s charging IC (such as a BQ-series chip or Apple\'s CD3215 on MacBooks) is tested for the specific failure.' },
        { step: 5, title: 'Component-level repair', description: 'Depending on findings, we replace the battery, repair or replace the charging port, or replace the specific failed charging IC rather than the entire motherboard.' },
        { step: 6, title: 'Charge-cycle verification', description: 'After repair, the laptop is charged and discharged through a verification cycle to confirm stable charging before it is returned.' }
      ],
      safetyNotes: [
        'Do not continue using a laptop that only powers on while plugged in if the battery also shows any swelling or unusual heat — disconnect and have it inspected.',
        'Do not use uncertified or unbranded fast chargers not rated for your laptop\'s required wattage; they can damage the charging circuit over time.',
        'Avoid forcing a charging cable into a port that feels loose or misaligned — this often breaks the port fully off the motherboard, turning a simple repair into a bigger one.'
      ],
      kuwaitContext: [
        'Kuwait\'s heat can accelerate battery cell degradation, so a "plugged in, not charging" fault paired with a laptop that is 2+ years old is statistically more likely to be the battery than in a cooler climate.',
        'Counterfeit and third-party chargers are common in the local market — verifying the charger with a known-good replacement early in diagnosis avoids paying for a battery or board repair that would not have fixed the actual fault.',
        'KCROC stocks common OEM-equivalent batteries and charging ICs for major brands at the Hawalli lab, and offers free pickup and delivery across Kuwait for this repair.'
      ],
      faqs: [
        { question: 'Why does my laptop say "plugged in, not charging"?', answer: 'This specific message usually means the laptop is receiving some power but the battery cannot accept a charge — most often due to a degraded battery or a failed charging circuit, rather than a completely dead charger.' },
        { question: 'Can a bad charger cause "plugged in, not charging" specifically?', answer: 'It can, particularly with counterfeit or underpowered chargers that deliver unstable power. Testing with a known-good, correctly rated charger is the fastest way to rule this out.' },
        { question: 'Is it dangerous to keep using a laptop that only works when plugged in?', answer: 'It is not inherently dangerous by itself, but it means the battery has likely failed and can no longer act as a safety buffer against power interruptions, and in some cases indicates an underlying issue worth diagnosing before it worsens.' },
        { question: 'How much does it cost to fix a laptop charging port?', answer: 'This depends on the laptop model and whether the port itself needs replacement or the surrounding motherboard connector is affected. A diagnosis at KCROC identifies the exact scope before any cost is quoted.' },
        { question: 'Can I just replace the battery myself to fix this?', answer: 'Only if the battery is confirmed to be the actual cause. Replacing a battery when the real fault is the charging port or a motherboard IC will not solve the problem and adds unnecessary cost.' },
        { question: 'Will I lose my data if the charging IC needs replacing?', answer: 'No — a charging IC repair is a motherboard power-circuit fix and does not involve the storage drive. Your data is not touched during this type of repair.' }
      ],
      contentImages: [
        { src: IMAGES.laptopHardware.chargerInventory.src, alt: IMAGES.laptopHardware.chargerInventory.alt, width: IMAGES.laptopHardware.chargerInventory.width, height: IMAGES.laptopHardware.chargerInventory.height, placement: 'causes', caption: 'Testing charger output and battery health — a "plugged in, not charging" fault can be either component.' },
        { src: IMAGES.laptopHardware.laptopDcPowerJackConnectorReplacement.src, alt: IMAGES.laptopHardware.laptopDcPowerJackConnectorReplacement.alt, width: IMAGES.laptopHardware.laptopDcPowerJackConnectorReplacement.width, height: IMAGES.laptopHardware.laptopDcPowerJackConnectorReplacement.height, placement: 'solution', caption: 'Inspecting and repairing the DC charging jack when the laptop is plugged in but not charging.' },
        { src: IMAGES.laptopHardware.dellAdapter.src, alt: IMAGES.laptopHardware.dellAdapter.alt, width: IMAGES.laptopHardware.dellAdapter.width, height: IMAGES.laptopHardware.dellAdapter.height, placement: 'solution', caption: 'Verifying the correct-wattage adapter as part of confirming the actual cause of the charging fault.' },
      ],
      seo: { title: 'Laptop Plugged In But Not Charging — Repair Kuwait | KCROC', description: 'Laptop battery not charging? We diagnose dead batteries, broken charging ports, and failed motherboard power chips. Same-day service available.', canonicalUrl: 'https://www.computerrepairkuwait.com/laptop-plugged-in-not-charging', ogType: 'article', schemaTypes: ['TechArticle', 'FAQPage'], lastModified: '2026-09-10T00:00:00+03:00' },
      navigationPriority: 60, popular: false
    } as ProblemEntity,

    'problem-keyboard-fail': {
      id: 'problem-keyboard-fail', slug: 'laptop-keyboard-not-working', entityType: 'Problem', isActive: true,
      title: 'Laptop Keyboard Not Working',
      description: 'Troubleshooting guide for laptops where some or all keyboard keys have stopped responding.',
      symptom: 'Specific keys (often in a diagonal line) stop working, the entire keyboard is dead, or keys are typing multiple characters at once. Sometimes accompanied by a continuously pressing "ghost" key.',
      causes: ['Liquid spill damage causing track corrosion', 'Dust or sand blocking the membrane mechanism', 'Swollen battery pushing up against the keyboard from underneath', 'Damaged ribbon cable connection to the motherboard'],
      doNotDo: 'Do not pry the keys off with a knife or screwdriver to "clean underneath." Modern laptop key hinges (especially MacBooks) are extremely fragile and will snap, requiring a full keyboard replacement anyway.',
      solution: 'We first check for software/driver issues. If hardware has failed, we replace the entire keyboard assembly. If the battery is swollen and crushing the keyboard, we safely remove the hazard and replace both.',
      urgency: 'medium',
      relatedServiceIds: ['srv-laptop', 'srv-macbook', 'srv-keyboard'],
      contentImages: [
        { src: IMAGES.laptopHardware.laptopKeyboardTopCaseAssemblyRemoval.src, alt: IMAGES.laptopHardware.laptopKeyboardTopCaseAssemblyRemoval.alt, width: IMAGES.laptopHardware.laptopKeyboardTopCaseAssemblyRemoval.width, height: IMAGES.laptopHardware.laptopKeyboardTopCaseAssemblyRemoval.height, placement: 'causes', caption: 'The keyboard and top case assembly removed to check for liquid damage, dust, or a swollen battery underneath.' },
        { src: IMAGES.laptopHardware.laptopKeyboardHeatsinkAssemblyRemoval.src, alt: IMAGES.laptopHardware.laptopKeyboardHeatsinkAssemblyRemoval.alt, width: IMAGES.laptopHardware.laptopKeyboardHeatsinkAssemblyRemoval.width, height: IMAGES.laptopHardware.laptopKeyboardHeatsinkAssemblyRemoval.height, placement: 'solution', caption: 'Replacing the keyboard assembly and ribbon cable connection during reassembly.' },
      ],
      seo: { title: 'Laptop Keyboard Not Working — Repair in Kuwait | KCROC', description: 'Laptop keyboard dead or typing by itself? We replace keyboards for Dell, HP, Lenovo, and MacBooks. Fast service with free pick & drop in Kuwait.', canonicalUrl: 'https://www.computerrepairkuwait.com/laptop-keyboard-not-working', ogType: 'article', schemaTypes: ['Article', 'FAQPage'] },
      navigationPriority: 50, popular: false
    } as ProblemEntity,

    'problem-wifi-fail': {
      id: 'problem-wifi-fail', slug: 'laptop-wifi-not-connecting', entityType: 'Problem', isActive: true,
      title: 'Laptop WiFi Not Connecting or Missing',
      description: 'Diagnosis for laptops that cannot find WiFi networks, frequently drop connection, or are missing the WiFi icon entirely.',
      symptom: 'The WiFi icon disappears from Windows, the laptop cannot find any networks despite phones connecting fine, or the connection drops repeatedly during gaming or streaming.',
      causes: ['Failed internal WiFi card (common with older Realtek or MediaTek cards in Kuwait heat)', 'Loose antenna cables connecting the card to the screen', 'Corrupted Windows networking drivers', 'Motherboard PCIe slot failure'],
      doNotDo: 'Do not attempt a "Network Reset" if the WiFi card is physically missing from the Device Manager — this will not fix a dead hardware component and wastes time.',
      solution: 'We diagnose the M.2/PCIe WiFi card. Usually, upgrading a failed budget card to a high-quality Intel AX (Wi-Fi 6) card permanently resolves dropouts and significantly boosts speeds.',
      urgency: 'low',
      relatedServiceIds: ['srv-laptop', 'srv-gaming'],
      contentImages: [
        { src: IMAGES.laptopHardware.wifiLaptop1.src, alt: IMAGES.laptopHardware.wifiLaptop1.alt, width: IMAGES.laptopHardware.wifiLaptop1.width, height: IMAGES.laptopHardware.wifiLaptop1.height, placement: 'causes', caption: 'Checking the internal Wi-Fi card and antenna connections when the network icon disappears.' },
        { src: IMAGES.laptopHardware.wifiIntel2.src, alt: IMAGES.laptopHardware.wifiIntel2.alt, width: IMAGES.laptopHardware.wifiIntel2.width, height: IMAGES.laptopHardware.wifiIntel2.height, placement: 'solution', caption: 'Installing a high-quality Intel Wi-Fi 6 card to permanently resolve dropouts from a failed budget card.' },
      ],
      seo: { title: 'Laptop WiFi Not Connecting — Fix & Upgrade Kuwait | KCROC', description: 'WiFi icon missing or connection dropping on your laptop? We diagnose driver issues and upgrade failed WiFi cards to fast Wi-Fi 6. Free pick & drop.', canonicalUrl: 'https://www.computerrepairkuwait.com/laptop-wifi-not-connecting', ogType: 'article', schemaTypes: ['Article', 'FAQPage'] },
      navigationPriority: 40, popular: false
    } as ProblemEntity,

    'problem-slow': {
      id: 'problem-slow', slug: 'laptop-running-very-slow', entityType: 'Problem', isActive: true,
      title: 'Laptop Running Extremely Slow',
      description: 'Solutions for laptops that take minutes to boot up, freeze during basic tasks, or show 100% disk usage.',
      symptom: 'The laptop takes over 2 minutes to reach the desktop, opening Chrome freezes the system, and Task Manager consistently shows 100% Disk Usage or 100% CPU Usage.',
      causes: ['Failing mechanical Hard Drive (HDD)', 'Thermal throttling due to overheating', 'Insufficient RAM for Windows 11 (less than 8GB)', 'Severe malware or bloatware infection'],
      doNotDo: 'Do not buy expensive "PC Cleaner" software subscriptions online. They rarely solve hardware bottlenecks and often act as malware themselves.',
      solution: 'If the laptop has an old HDD, an SSD upgrade is the ultimate fix—it reduces boot times from minutes to seconds. We clone your exact system to a new SSD or perform a clean Windows installation.',
      urgency: 'medium',
      relatedServiceIds: ['srv-laptop', 'srv-gaming', 'srv-ssd-ram'],
      contentImages: [
        { src: IMAGES.upgrades.hddSeagate.src, alt: IMAGES.upgrades.hddSeagate.alt, width: IMAGES.upgrades.hddSeagate.width, height: IMAGES.upgrades.hddSeagate.height, placement: 'causes', caption: 'An aging mechanical hard drive — one of the most common causes of a laptop that takes minutes to boot.' },
        { src: IMAGES.upgrades.ssdSamsung2.src, alt: IMAGES.upgrades.ssdSamsung2.alt, width: IMAGES.upgrades.ssdSamsung2.width, height: IMAGES.upgrades.ssdSamsung2.height, placement: 'solution', caption: 'Cloning the system to a new SSD — the fix that cuts boot times from minutes to seconds.' },
      ],
      relatedResourcePaths: [
        { label: 'Windows 11 100% Disk Usage: Causes & Solutions', path: '/blog/windows-11-100-disk-usage-causes-solutions' },
      ],
      seo: { title: 'Laptop Running Extremely Slow? SSD Upgrades Kuwait | KCROC', description: 'Laptop freezing or taking forever to turn on? An SSD upgrade and RAM boost will make it 10x faster. We migrate your data safely. Free diagnostic.', canonicalUrl: 'https://www.computerrepairkuwait.com/laptop-running-very-slow', ogType: 'article', schemaTypes: ['Article', 'FAQPage'] },
      navigationPriority: 30, popular: false
    } as ProblemEntity,

    'problem-hinge-break': {
      id: 'problem-hinge-break', slug: 'laptop-hinge-broken', entityType: 'Problem', isActive: true,
      title: 'Laptop Hinge Broken or Splitting',
      description: 'Repair guide for laptops where the screen hinge is stiff, broken, or separating from the plastic casing.',
      symptom: 'The screen is difficult to open or close, the plastic bezel around the screen pops open when moving the lid, or the hinge has completely detached from the bottom chassis.',
      causes: ['Plastic fatigue from heat cycles in Kuwait', 'Over-tightened hinge nuts from the factory (very common on HP and Dell)', 'Dropping the laptop on its corner'],
      doNotDo: 'DO NOT force the laptop open or closed if you feel resistance. Forcing a stiff hinge will snap the internal display cable and crack the actual LCD screen, doubling the repair cost.',
      solution: 'We loosen the hinge mechanism to factory tension, repair the broken plastic chassis using industrial resin or structural replacement, and realign the screen assembly.',
      urgency: 'high',
      relatedServiceIds: ['srv-laptop', 'srv-screen', 'srv-hinge'],
      contentImages: [
        { src: IMAGES.laptopHardware.brokenHinge.src, alt: IMAGES.laptopHardware.brokenHinge.alt, width: IMAGES.laptopHardware.brokenHinge.width, height: IMAGES.laptopHardware.brokenHinge.height, placement: 'causes', caption: 'A hinge that has cracked the surrounding plastic chassis — common after heat cycles or a corner drop.' },
        { src: IMAGES.laptopHardware.laptopLidBackCoverPanelReplacement.src, alt: IMAGES.laptopHardware.laptopLidBackCoverPanelReplacement.alt, width: IMAGES.laptopHardware.laptopLidBackCoverPanelReplacement.width, height: IMAGES.laptopHardware.laptopLidBackCoverPanelReplacement.height, placement: 'solution', caption: 'Fitting a replacement lid and back cover panel after the hinge mechanism is repaired and re-tensioned.' },
      ],
      seo: { title: 'Broken Laptop Hinge Repair Kuwait — Fast Fix | KCROC', description: 'Laptop screen hinge broken or popping open? Stop using it before the screen cracks! We repair chassis and hinges for HP, Dell, Lenovo, and MSI.', canonicalUrl: 'https://www.computerrepairkuwait.com/laptop-hinge-broken', ogType: 'article', schemaTypes: ['Article', 'FAQPage'] },
      navigationPriority: 20, popular: false
    } as ProblemEntity,

    'problem-cracked-screen': {
      id: 'problem-cracked-screen', slug: 'laptop-screen-cracked-kuwait', entityType: 'Problem', isActive: true,
      title: 'Laptop Screen Cracked or Shattered',
      description: 'Repair guide for laptops with a physically cracked, shattered, or spider-webbed display panel after a drop or impact.',
      symptom: 'The screen shows spiderweb cracks, dark ink-like bleeding, discoloured patches, or areas with no picture at all after a drop, knock, or something pressing on the closed lid. An external monitor usually displays a perfect picture.',
      causes: ['Dropping the laptop or closing it on an object left on the keyboard', 'Impact or pressure on the closed lid while packed in a bag', 'Pre-existing hinge damage allowing the lid to close unevenly onto the bezel'],
      doNotDo: 'Do not keep using the laptop with a cracked panel — flexing or pressing on a shattered screen can push liquid crystal further into the bezel and, on some models, damage the display cable connector underneath.',
      solution: 'We confirm the fault is the panel and not the board by testing output on an external monitor, then fit and calibrate an OEM-spec replacement LCD/IPS/OLED panel matched to your exact model, checking hinges and the display cable at the same time.',
      urgency: 'high',
      relatedServiceIds: ['srv-screen', 'srv-laptop'],
      contentImages: [
        { src: IMAGES.laptopHardware.dellLaptopCorruptedScreenGpuFailure.src, alt: IMAGES.laptopHardware.dellLaptopCorruptedScreenGpuFailure.alt, width: IMAGES.laptopHardware.dellLaptopCorruptedScreenGpuFailure.width, height: IMAGES.laptopHardware.dellLaptopCorruptedScreenGpuFailure.height, placement: 'causes', caption: 'A cracked panel showing display bleed — we confirm on an external monitor that the board itself is unaffected.' },
        { src: IMAGES.laptopHardware.laptopLcdPanelReplacementPart.src, alt: IMAGES.laptopHardware.laptopLcdPanelReplacementPart.alt, width: IMAGES.laptopHardware.laptopLcdPanelReplacementPart.width, height: IMAGES.laptopHardware.laptopLcdPanelReplacementPart.height, placement: 'solution', caption: 'Fitting an OEM-spec replacement panel matched to the exact model before calibration.' },
      ],
      seo: { title: 'Laptop Screen Cracked in Kuwait? Same-Day Fix | KCROC', description: 'Cracked, shattered, or bleeding laptop screen? We fit OEM-spec panels matched to your model, often same-day. Free pick & drop across Kuwait.', canonicalUrl: 'https://www.computerrepairkuwait.com/laptop-screen-cracked-kuwait', ogType: 'article', schemaTypes: ['Article', 'FAQPage'] },
      navigationPriority: 75, popular: true
    } as ProblemEntity,

    'problem-windows-wont-boot': {
      id: 'problem-windows-wont-boot', slug: 'windows-wont-boot-kuwait', entityType: 'Problem', isActive: true,
      title: "Windows Won't Boot or Stuck in Repair Loop",
      description: "Diagnostic guide for laptops that get stuck on the manufacturer logo, drop into 'Preparing Automatic Repair', or loop endlessly instead of reaching the Windows desktop.",
      symptom: "The laptop powers on normally and reaches the logo screen, but then either freezes there, drops into a blue 'Automatic Repair' / 'Recovery' screen, or restarts and repeats the same failed boot attempt over and over.",
      causes: ['Corrupted Windows system files from an interrupted update or improper shutdown', 'A failing hard drive or SSD with bad sectors that the OS can no longer read from', 'A recently added driver or Windows update conflicting with existing hardware', 'Disconnected or failing storage cable/connector (desktops and some laptops)'],
      doNotDo: 'Do not keep letting it attempt "Automatic Repair" over and over, and do not run disk-repair tools blindly — on a genuinely failing drive, repeated read/write attempts can push it from recoverable to completely dead before your files are backed up.',
      solution: 'We first determine whether the drive itself is healthy using SMART diagnostics. If the drive is fine, we repair the Windows boot files and startup configuration without touching your data. If the drive is failing, we prioritise pulling your files off first, then clone or replace it and reinstall Windows clean.',
      urgency: 'high',
      relatedServiceIds: ['srv-laptop', 'srv-gaming'],
      contentImages: [
        { src: IMAGES.laptopHardware.laptopBiosDiagnosticScreenRepair.src, alt: IMAGES.laptopHardware.laptopBiosDiagnosticScreenRepair.alt, width: IMAGES.laptopHardware.laptopBiosDiagnosticScreenRepair.width, height: IMAGES.laptopHardware.laptopBiosDiagnosticScreenRepair.height, placement: 'causes', caption: 'Running diagnostics to tell a failing drive apart from a corrupted Windows boot configuration.' },
        { src: IMAGES.services.windowsInstall.src, alt: IMAGES.services.windowsInstall.alt, width: IMAGES.services.windowsInstall.width, height: IMAGES.services.windowsInstall.height, placement: 'solution', caption: 'Repairing the boot files or performing a clean Windows install once your data is safely backed up.' },
      ],
      seo: { title: "Windows Won't Boot? Repair Loop Fix in Kuwait | KCROC", description: "Laptop stuck on the logo screen or looping 'Automatic Repair'? We diagnose failing drives vs corrupted Windows files and fix it without losing your data. Free pick & drop.", canonicalUrl: 'https://www.computerrepairkuwait.com/windows-wont-boot-kuwait', ogType: 'article', schemaTypes: ['Article', 'FAQPage'] },
      navigationPriority: 95, popular: true
    } as ProblemEntity,

    'problem-bsod': {
      id: 'problem-bsod', slug: 'blue-screen-of-death-bsod-fix-kuwait', entityType: 'Problem', isActive: true,
      title: 'Blue Screen of Death (BSOD)',
      description: 'Diagnostic guide for laptops and PCs that crash to a blue error screen with a stop code, either occasionally or repeatedly.',
      symptom: "The screen suddenly turns blue, displays a sad-face icon and a stop code (e.g. 'MEMORY_MANAGEMENT', 'DRIVER_IRQL_NOT_LESS_OR_EQUAL'), collects some data, and restarts the computer. It may happen once a week or several times an hour.",
      causes: ['Failing or incompatible RAM module', 'A corrupted or outdated driver, most often graphics or storage drivers', 'A failing hard drive or SSD reporting read errors to Windows', 'Overheating causing the CPU or GPU to fail mid-task', 'Corrupted Windows system files'],
      doNotDo: "Do not rely on the stop code alone to self-diagnose and reinstall Windows repeatedly — the same code can point to RAM, drive, driver, or thermal problems, and reinstalling won't fix a hardware fault underneath.",
      solution: 'We run a memory diagnostic and drive health check first, since those cause the majority of recurring BSODs. We then check thermal behaviour under load and review the crash dump logs to identify the exact faulting driver or component before replacing anything.',
      urgency: 'medium',
      relatedServiceIds: ['srv-laptop', 'srv-gaming'],
      contentImages: [
        { src: IMAGES.laptopHardware.monitorBlueScreenErrorDiagnostic.src, alt: IMAGES.laptopHardware.monitorBlueScreenErrorDiagnostic.alt, width: IMAGES.laptopHardware.monitorBlueScreenErrorDiagnostic.width, height: IMAGES.laptopHardware.monitorBlueScreenErrorDiagnostic.height, placement: 'causes', caption: 'A Blue Screen of Death stop code — the same code can point to RAM, drive, driver, or thermal faults.' },
        { src: IMAGES.upgrades.ramHynix3.src, alt: IMAGES.upgrades.ramHynix3.alt, width: IMAGES.upgrades.ramHynix3.width, height: IMAGES.upgrades.ramHynix3.height, placement: 'solution', caption: 'Testing and, where needed, replacing the RAM module identified as the actual cause via crash dump analysis.' },
      ],
      seo: { title: 'Blue Screen of Death (BSOD) Repair Kuwait | KCROC', description: 'Laptop or PC crashing to a blue screen with a stop code? We diagnose RAM, drive, driver, and thermal faults from the actual crash logs. Free pick & drop.', canonicalUrl: 'https://www.computerrepairkuwait.com/blue-screen-of-death-bsod-fix-kuwait', ogType: 'article', schemaTypes: ['Article', 'FAQPage'] },
      navigationPriority: 85, popular: true
    } as ProblemEntity,

    'problem-freezing-crashing': {
      id: 'problem-freezing-crashing', slug: 'computer-freezing-crashing-kuwait', entityType: 'Problem', isActive: true,
      title: 'Computer Freezing or Randomly Crashing',
      description: 'Diagnosis for laptops and PCs that freeze mid-task, require a hard restart, or reboot themselves without warning.',
      symptom: 'The mouse and keyboard stop responding, the screen locks up completely, or the computer suddenly restarts or shuts off on its own — with no blue screen or error message, just a sudden freeze or reboot.',
      causes: ['Failing RAM causing random lockups under memory pressure', 'Overheating triggering an automatic emergency shutdown', 'A degrading power supply or battery unable to sustain load', 'Storage drive intermittently dropping out under heavy read/write'],
      doNotDo: "Do not keep force-restarting and continuing to use the machine as normal — a laptop that shuts itself off from heat will keep doing so at progressively lower temperatures as thermal paste and components degrade further.",
      solution: 'We stress-test RAM, monitor CPU/GPU temperatures under sustained load, and check the storage drive and power delivery, since freezing and unexpected shutdowns are almost always one of these four causes rather than a software problem.',
      urgency: 'medium',
      relatedServiceIds: ['srv-laptop', 'srv-gaming'],
      contentImages: [
        { src: IMAGES.upgrades.laptopRamSticksComparisonUpgrade.src, alt: IMAGES.upgrades.laptopRamSticksComparisonUpgrade.alt, width: IMAGES.upgrades.laptopRamSticksComparisonUpgrade.width, height: IMAGES.upgrades.laptopRamSticksComparisonUpgrade.height, placement: 'causes', caption: 'Comparing RAM modules during a stress test — failing memory is one of the most common causes of random freezes.' },
        { src: IMAGES.upgrades.ssdSamsung1.src, alt: IMAGES.upgrades.ssdSamsung1.alt, width: IMAGES.upgrades.ssdSamsung1.width, height: IMAGES.upgrades.ssdSamsung1.height, placement: 'solution', caption: 'Replacing a drive that was intermittently dropping out under load once it is confirmed as the fault.' },
      ],
      seo: { title: 'Computer Freezing or Crashing? Fix in Kuwait | KCROC', description: 'Laptop or PC freezing, locking up, or restarting on its own? We stress-test RAM, thermals, storage, and power to find the real cause. Free pick & drop.', canonicalUrl: 'https://www.computerrepairkuwait.com/computer-freezing-crashing-kuwait', ogType: 'article', schemaTypes: ['Article', 'FAQPage'] },
      navigationPriority: 55, popular: true
    } as ProblemEntity,

    'problem-malware': {
      id: 'problem-malware', slug: 'virus-malware-removal-kuwait', entityType: 'Problem', isActive: true,
      title: 'Virus, Malware or Ransomware Infection',
      description: 'Removal service for laptops and PCs showing signs of viruses, adware, browser hijackers, or ransomware.',
      symptom: 'Constant pop-up ads even outside the browser, a homepage or search engine that changed itself, unfamiliar toolbars, the antivirus getting disabled on its own, or — in serious cases — files that suddenly cannot be opened with a ransom message demanding payment.',
      causes: ['Downloaded software bundled with adware or a browser hijacker', 'Opening an infected email attachment or fake software update', 'Outdated Windows or browser software with unpatched security holes', 'Pirated software or "cracked" program installers'],
      doNotDo: 'Do not pay a ransomware demand, and do not install multiple "PC cleaner" or antivirus tools on top of each other trying to fix it yourself — conflicting security tools often make removal harder and some free "cleaner" downloads are malware themselves.',
      solution: 'We fully scan and remove the infection using professional-grade tools run outside the compromised operating system, so the malware cannot hide from or disable the scanner. For severe or ransomware infections, we back up any recoverable personal files first, then perform a clean Windows installation to guarantee nothing survives.',
      urgency: 'medium',
      relatedServiceIds: ['srv-laptop', 'srv-gaming'],
      contentImages: [
        { src: IMAGES.laptopHardware.fujitsuLaptopWindowsErrorScreenRepair.src, alt: IMAGES.laptopHardware.fujitsuLaptopWindowsErrorScreenRepair.alt, width: IMAGES.laptopHardware.fujitsuLaptopWindowsErrorScreenRepair.width, height: IMAGES.laptopHardware.fujitsuLaptopWindowsErrorScreenRepair.height, placement: 'causes', caption: 'Windows software-repair diagnostics before malware cleanup or system recovery.' },
        { src: IMAGES.services.windowsInstall.src, alt: IMAGES.services.windowsInstall.alt, width: IMAGES.services.windowsInstall.width, height: IMAGES.services.windowsInstall.height, placement: 'solution', caption: 'A clean Windows installation guarantees a severe or ransomware infection cannot survive, once your files are safely backed up.' },
      ],
      seo: { title: 'Virus & Malware Removal Kuwait — Same-Day Service | KCROC', description: 'Pop-ups, hijacked browser, or ransomware on your laptop? Professional virus and malware removal, with safe file backup first. Free pick & drop in Kuwait.', canonicalUrl: 'https://www.computerrepairkuwait.com/virus-malware-removal-kuwait', ogType: 'article', schemaTypes: ['Article', 'FAQPage'] },
      navigationPriority: 45, popular: false
    } as ProblemEntity,

    /* ═══════════════════════════════════════════════════════════════
       CASE STUDY ENTITIES
    ═══════════════════════════════════════════════════════════════ */
    'case-macbook-liquid-salmiya': {
      id: 'case-macbook-liquid-salmiya', slug: 'macbook-liquid-damage-salmiya', entityType: 'CaseStudy', isActive: true,
      title: 'MacBook Pro M2 Liquid Damage Repair — Salmiya',
      description: 'Real repair case study of a coffee-damaged MacBook Pro M2 motherboard restoration.',
      device: 'MacBook Pro 14" M2 Pro',
      location: 'Salmiya',
      symptom: 'Coffee spill. Device powered off immediately. Fan spins briefly on power button, no display.',
      diagnosis: 'Ultrasonic cleaning revealed corrosion on the PPBUS_G3H main power rail and a shorted Q7510 MOSFET. Secondary damage to the backlight circuit.',
      repair: 'Q7510 MOSFET replaced via micro-soldering. Backlight fuse replaced. Board cleaned and re-tested under full load for 4 hours.',
      outcome: 'Device fully restored. The original onboard storage remained untouched. Customer data intact.',
      timeToRepair: '36 hours',
      costVsReplacement: 'Repair: 65 KWD. Apple Authorized Center quote: 280 KWD for board swap with data loss.',
      publishDate: '2026-05-12',
      deviceCategory: 'macbook',
      deviceModel: 'MacBook Pro 14" M2 Pro',
      brandId: undefined,
      serviceIds: ['srv-macbook', 'srv-motherboard'],
      problemIds: ['problem-liquid-spill'],
      locationId: 'loc-salmiya',
      authorId: 'https://www.computerrepairkuwait.com/author/imran#person',
      repairCategory: 'Motherboard liquid-damage repair',
      difficulty: 'component-level',
      repairStatus: 'success',
      diagnosticTools: ['Ultrasonic cleaner', 'Multimeter', 'Micro-soldering / hot-air rework'],
      componentsTested: ['PPBUS_G3H main power rail', 'Q7510 MOSFET', 'Backlight circuit'],
      partsReplaced: ['Q7510 MOSFET', 'Backlight fuse'],
      testingPerformed: ['Full hardware diagnostics', '4-hour full-load stress test', 'Display verification'],
      repairDuration: '36 hours',
      warranty: { durationDays: 30, coverage: 'All parts and labor on the repair performed.' },
      evidence: [],
      customerConsent: { granted: false, scope: [] },
      featuredImage: {
        thumbnail: { raw: IMAGES.macbook.diagnostics.src, webp: IMAGES.macbook.diagnostics.src, avif: IMAGES.macbook.diagnostics.src, width: IMAGES.macbook.diagnostics.width, height: IMAGES.macbook.diagnostics.height },
        hero: { raw: IMAGES.macbook.logicBoard.src, webp: IMAGES.macbook.logicBoard.src, avif: IMAGES.macbook.logicBoard.src, width: IMAGES.macbook.logicBoard.width, height: IMAGES.macbook.logicBoard.height },
        altText: 'MacBook Pro M2 motherboard diagnostic and repair after coffee spill damage'
      },
      seo: { title: 'MacBook Pro M2 Liquid Damage Repair — Salmiya | KCROC', description: 'Coffee spill destroyed a MacBook Pro M2 in Salmiya. KCROC repaired the motherboard for 65 KWD, preserving all data. Apple wanted 280 KWD for a board swap.', canonicalUrl: 'https://www.computerrepairkuwait.com/case-studies/macbook-liquid-damage-salmiya', ogType: 'article', schemaTypes: ['Article', 'BreadcrumbList', 'ImageObject'] },
      
      // 🚀 NEW
      narrative: {
        clientContext: 'Graphic designer, Salmiya',
        hook: 'The client accidentally spilled coffee across the keyboard of their MacBook Pro 14" M2 Pro. The device powered off immediately, and on restart the fan spun briefly but the screen stayed completely black. With months of unbacked-up project files on the drive, an Apple Authorized Center quote of 280 KWD for a full board swap — with total data loss — was not an option. The client reached out via WhatsApp for a second opinion, and we dispatched a free emergency pickup to Salmiya the same day.',
        diagnosisSteps: [
          'Main power rail short: corrosion found on the PPBUS_G3H rail, which distributes power throughout the board.',
          'Blown MOSFET: the Q7510 MOSFET had shorted out, cutting power delivery entirely.',
          'Display circuit: secondary liquid damage had tripped the backlight fuse, explaining the black screen despite the fan spinning.'
        ],
        repairSteps: [
          'Ultrasonic cleaning: the board was stripped and run through an industrial ultrasonic cleaner to remove microscopic coffee residue and copper corrosion from beneath the chips.',
          'Micro-soldering: the shorted Q7510 MOSFET was removed with precision hot-air rework and replaced with an OEM equivalent.',
          'Fuse replacement: the blown backlight fuse was traced and replaced, restoring power to the display.',
          'Stress testing: after reassembly with fresh thermal paste, the board ran a continuous 4-hour full-load test to confirm thermal and electrical stability.'
        ],
        closingOutcome: 'The MacBook powered on and passed full hardware diagnostics. Because the original motherboard was repaired rather than replaced, the onboard storage — soldered directly to that board and tied to its Secure Enclave — was never touched, so all client data was preserved. The device was back in Salmiya within 36 hours, at 65 KWD versus the 280 KWD board-swap quote: a 215 KWD saving, with data intact and a 30-day warranty included.',
        urgentWarning: 'If you spill liquid on a MacBook: disconnect power immediately, do not attempt to turn it on to "check" it, and do not plug it into a charger. Both actions risk completing an electrical short that a simple clean-and-repair could otherwise avoid.'
      }
    } as CaseStudyEntity,

    'case-rog-motherboard-hawalli': {
      id: 'case-rog-motherboard-hawalli', slug: 'asus-rog-dead-motherboard-hawalli', entityType: 'CaseStudy', isActive: true,
      title: 'ASUS ROG Strix Dead Motherboard Recovery — Hawalli',
      description: 'Component-level restoration of a completely dead gaming laptop motherboard.',
      device: 'ASUS ROG Strix G15',
      location: 'Hawalli',
      symptom: 'Laptop completely dead. No charging lights, no fan spin when power button pressed.',
      diagnosis: 'Multimeter testing found a dead short on the main 19V power rail. Traced to a blown MOSFET near the CPU VRM.',
      repair: 'Micro-soldering to remove the shorted MOSFET. Replaced with OEM equivalent. Re-pasted CPU/GPU with fresh liquid metal.',
      outcome: 'System booted successfully under full load. Customer avoided replacing the entire 350 KWD motherboard.',
      timeToRepair: '48 hours total (repair completed same-day, followed by a 24-hour stability stress test before return)',
      costVsReplacement: 'Repair: 45 KWD. Replacement board: 350 KWD.',
      publishDate: '2026-06-20',
      deviceCategory: 'gaming-laptop',
      deviceModel: 'ASUS ROG Strix G15',
      brandId: 'brand-asus',
      serviceIds: ['srv-gaming', 'srv-motherboard'],
      problemIds: ['problem-no-power'],
      locationId: 'loc-hawalli',
      authorId: 'https://www.computerrepairkuwait.com/author/imran#person',
      repairCategory: 'Gaming laptop motherboard component-level repair',
      difficulty: 'component-level',
      repairStatus: 'success',
      diagnosticTools: ['Bench power supply', 'Multimeter', 'Thermal camera', 'Hot-air rework station'],
      componentsTested: ['19V main power rail', 'CPU VRM power stage', 'System power sequence'],
      partsReplaced: ['Shorted MOSFET'],
      testingPerformed: ['Power-on verification', '24-hour graphical stress test', 'Thermal verification'],
      repairDuration: '48 hours total (same-day repair plus a 24-hour post-repair stress test)',
      warranty: { durationDays: 30, coverage: 'All parts and labor on the repair performed.' },
      evidence: [],
      customerConsent: { granted: false, scope: [] },
      featuredImage: {
        thumbnail: { raw: IMAGES.gaming.diagnostics.src, webp: IMAGES.gaming.diagnostics.src, avif: IMAGES.gaming.diagnostics.src, width: IMAGES.gaming.diagnostics.width, height: IMAGES.gaming.diagnostics.height },
        hero: { raw: IMAGES.gaming.asusRogCpuThermalPasteGpuBuild.src, webp: IMAGES.gaming.asusRogCpuThermalPasteGpuBuild.src, avif: IMAGES.gaming.asusRogCpuThermalPasteGpuBuild.src, width: IMAGES.gaming.asusRogCpuThermalPasteGpuBuild.width, height: IMAGES.gaming.asusRogCpuThermalPasteGpuBuild.height },
        altText: 'ASUS ROG Strix gaming laptop motherboard teardown and MOSFET repair'
      },
      seo: { title: 'ASUS ROG Dead Motherboard Repair — Hawalli | KCROC', description: 'Dead ASUS ROG Strix gaming laptop restored via chip-level micro-soldering in Hawalli. Saved customer 300+ KWD on a replacement board.', canonicalUrl: 'https://www.computerrepairkuwait.com/case-studies/asus-rog-dead-motherboard-hawalli', ogType: 'article', schemaTypes: ['Article', 'BreadcrumbList', 'ImageObject'] },
      narrative: {
        clientContext: 'Hardcore Gamer, Hawalli',
        hook: 'The client was in the middle of an intense gaming session when their ASUS ROG Strix G15 abruptly shut off with a quiet pop. The laptop was completely dead—no charging lights, no fan spin, and totally unresponsive to the power button. An official service center diagnosed a catastrophically failed motherboard and quoted an astronomical 350 KWD for a complete board replacement. Hoping for a more reasonable solution, the client brought the heavy machine to our Hawalli lab for a component-level diagnostic.',
        diagnosisSteps: [
          'Initial inspection: We disconnected the battery and connected a bench power supply, which immediately indicated a dead short circuit preventing power draw.',
          'Multimeter testing: We traced the 19V main power rail and found the exact point of failure.',
          'Thermal imaging: By injecting a safe, low voltage into the shorted line, our thermal camera pinpointed a blown MOSFET located directly next to the CPU Voltage Regulator Module (VRM).'
        ],
        repairSteps: [
          'Micro-soldering: Using a hot-air rework station and flux, the damaged MOSFET was carefully removed from the motherboard and replaced with a high-quality OEM equivalent.',
          'Thermal optimization: Because ASUS ROG laptops run exceptionally hot, we cleaned off the degraded factory paste and applied fresh liquid metal to the CPU and GPU to prevent future thermal stress on the surrounding power delivery components.',
          'Stress testing: The laptop was reassembled and subjected to a grueling 24-hour graphical benchmark to guarantee absolute stability.'
        ],
        closingOutcome: 'The ASUS ROG Strix booted successfully, passing all stress tests with improved thermal performance thanks to the fresh liquid metal. By fixing the specific burned component instead of discarding the entire motherboard, we completed the repair for just 45 KWD. The client saved 305 KWD, retained all their installed games and data, and was back online within 48 hours — including a full 24-hour stress test to confirm the fix would hold under sustained gaming load.'
      }
    } as CaseStudyEntity,

    'case-dell-screen-kuwait-city': {
      id: 'case-dell-screen-kuwait-city', slug: 'dell-xps-screen-replacement-kuwait-city', entityType: 'CaseStudy', isActive: true,
      title: 'Same-Day Dell XPS Screen Replacement — Kuwait City',
      description: 'Rapid turnaround logistics and OEM display replacement for a corporate client.',
      device: 'Dell XPS 15',
      location: 'Kuwait City',
      symptom: 'Cracked LCD panel from a drop. Customer needed the laptop urgently for a corporate presentation.',
      diagnosis: 'Screen panel physically shattered, but chassis and hinges remained intact. External display worked perfectly.',
      repair: 'Device collected from the client\'s office at 10 AM. OEM 4K display assembly fitted and calibrated in the lab.',
      outcome: 'Flawless display restoration. Delivered back to the client\'s office by 3 PM the same day.',
      timeToRepair: '5 hours (including transit)',
      costVsReplacement: 'Repair: 85 KWD. New XPS 15: 600+ KWD.',
      publishDate: '2026-07-05',
      deviceCategory: 'laptop',
      deviceModel: 'Dell XPS 15',
      brandId: 'brand-dell',
      serviceIds: ['srv-screen', 'srv-laptop'],
      problemIds: ['problem-cracked-screen'],
      locationId: 'loc-kuwait-city',
      authorId: 'https://www.computerrepairkuwait.com/author/imran#person',
      repairCategory: 'Laptop display replacement',
      difficulty: 'routine',
      repairStatus: 'success',
      diagnosticTools: ['Display test monitor', 'Dead-pixel test'],
      componentsTested: ['LCD panel', 'Display cable', 'Hinges', 'Aluminum chassis'],
      partsReplaced: ['OEM 4K display assembly'],
      testingPerformed: ['Dead-pixel inspection', 'Display brightness/color verification', 'External display verification'],
      repairDuration: '5 hours (including transit)',
      warranty: { durationDays: 30, coverage: 'All parts and labor on the repair performed.' },
      evidence: [],
      customerConsent: { granted: false, scope: [] },
      featuredImage: {
        thumbnail: { raw: IMAGES.laptopHardware.dellLaptopCorruptedScreenGpuFailure.src, webp: IMAGES.laptopHardware.dellLaptopCorruptedScreenGpuFailure.src, avif: IMAGES.laptopHardware.dellLaptopCorruptedScreenGpuFailure.src, width: IMAGES.laptopHardware.dellLaptopCorruptedScreenGpuFailure.width, height: IMAGES.laptopHardware.dellLaptopCorruptedScreenGpuFailure.height },
        hero: { raw: IMAGES.laptopHardware.laptopLcdPanelReplacementPart.src, webp: IMAGES.laptopHardware.laptopLcdPanelReplacementPart.src, avif: IMAGES.laptopHardware.laptopLcdPanelReplacementPart.src, width: IMAGES.laptopHardware.laptopLcdPanelReplacementPart.width, height: IMAGES.laptopHardware.laptopLcdPanelReplacementPart.height },
        altText: 'Dell XPS 15 cracked screen diagnosis and OEM 4K panel replacement'
      },
      seo: { title: 'Same-Day Dell XPS Screen Replacement Kuwait City | KCROC', description: 'Cracked Dell XPS 15 screen replaced with OEM panel in just 5 hours, including free pick and drop to Kuwait City.', canonicalUrl: 'https://www.computerrepairkuwait.com/case-studies/dell-xps-screen-replacement-kuwait-city', ogType: 'article', schemaTypes: ['Article'] },
      narrative: {
        clientContext: 'Corporate Executive, Kuwait City',
        hook: 'A corporate executive in Kuwait City dropped their Dell XPS 15 right before a critical board presentation, completely shattering the premium 4K display. While the laptop still functioned when plugged into an external monitor, it was useless for travel or the upcoming meeting. Buying a brand-new XPS 15 would cost over 600 KWD, and waiting weeks for a warranty mail-in repair was out of the question. The client contacted us at 9:00 AM needing an emergency same-day turnaround.',
        diagnosisSteps: [
          'Damage assessment: The LCD panel was physically destroyed, showing spiderweb cracks and bleeding liquid crystals.',
          'Chassis inspection: We thoroughly examined the aluminum lid, hinges, and display cables, confirming they had survived the drop intact.',
          'Part verification: We immediately pulled a matching, brand-new OEM 4K Dell display assembly from our local Hawalli inventory.'
        ],
        repairSteps: [
          'Rapid collection: Our driver collected the damaged XPS 15 directly from the client\'s corporate office in Kuwait City at 10:00 AM and brought it securely to our lab.',
          'Screen replacement: We safely removed the shattered display assembly, meticulously routing the delicate Wi-Fi antennas and display cables into the new OEM 4K panel.',
          'Calibration: The new screen was powered on, tested for dead pixels, and color-calibrated to match Dell\'s factory standards.'
        ],
        closingOutcome: 'The Dell XPS 15 looked and functioned flawlessly. We rushed the repaired laptop back to Kuwait City, handing it to the executive at 3:00 PM—just five hours after they initiated the pickup. For 85 KWD, the client avoided a 600+ KWD replacement cost, kept their highly sensitive corporate data in their own possession, and successfully presented at their meeting.'
      }
    } as CaseStudyEntity,

    /* ═══════════════════════════════════════════════════════════════
       FOOTER
    ═══════════════════════════════════════════════════════════════ */
    'footer-data': {
      id: 'footer-data', entityType: 'Footer', isActive: true, title: 'Footer Links',
      links: {
        services: [
          { label: 'Laptop Repair Kuwait',     path: '/laptop-repair-kuwait' },
          { label: 'MacBook Repair Kuwait',     path: '/macbook-repair-kuwait' },
          { label: 'Gaming PC Repair Kuwait',   path: '/gaming-pc-repair-kuwait' },
          { label: 'Gaming Laptop Cleaning Kuwait', path: '/gaming-laptop-cleaning-kuwait' },
          { label: 'Motherboard Repair Kuwait', path: '/motherboard-repair-kuwait' },
          { label: 'Screen Replacement Kuwait', path: '/laptop-screen-repair-kuwait' },
          { label: 'Battery Replacement Kuwait', path: '/battery-replacement-kuwait' },
          { label: 'Laptop Charging Port Repair', path: '/laptop-charging-port-repair-kuwait' },
          { label: 'Laptop Hinge & Chassis Repair', path: '/laptop-hinge-repair-kuwait' },
          { label: 'Laptop Keyboard Replacement', path: '/laptop-keyboard-replacement-kuwait' },
          { label: 'SSD & RAM Upgrade Kuwait', path: '/ssd-ram-upgrade-kuwait' },
          { label: 'Laptop Liquid Damage Repair', path: '/laptop-liquid-damage-repair-kuwait' }
        ],
        company: [
          { label: 'About us',       path: '/about' },
          { label: 'Contact',        path: '/contact' },
          { label: 'Tech News',      path: '/news' },
          { label: 'Tech Blog',      path: '/blog' },
          { label: 'Battery Health Guide', path: '/guides/laptop-battery-warning-signs' },
          { label: 'FAQ',            path: '/faq' },
          { label: 'Pricing',        path: '/pricing' },
          { label: 'Computer Repair Kuwait', path: '/computer-repair-kuwait' },
          { label: 'Computer Repair Near Me', path: '/near-me' },
          { label: 'All Service Areas', path: '/locations' },
        ],
        areas: [
          { label: 'Computer Repair Hawalli',      path: '/location/hawalli' },
          { label: 'Computer Repair Salmiya',      path: '/location/salmiya' },
          { label: 'Computer Repair Kuwait City',  path: '/location/kuwait-city' },
          { label: 'Computer Repair Farwaniya',    path: '/location/farwaniya' },
          { label: 'Computer Repair Jahra',        path: '/location/jahra' },
          { label: 'Computer Repair Ahmadi',       path: '/location/ahmadi' },
          { label: 'Computer Repair Fahaheel',     path: '/location/fahaheel' },
          { label: 'Computer Repair Mangaf',       path: '/location/mangaf' },
          { label: 'Computer Repair Abu Halifa',   path: '/location/abu-halifa' },
          { label: 'Computer Repair Jabriya',      path: '/location/jabriya' },
          { label: 'Computer Repair Mubarak Al-Kabeer', path: '/location/mubarak-al-kabeer' },
          { label: 'Computer Repair Fintas',       path: '/location/fintas' },
          { label: 'Computer Repair Sabah Al-Salem', path: '/location/sabah-al-salem' },
          { label: 'Computer Repair Salwa',         path: '/location/salwa' },
          { label: 'Computer Repair Rumaithiya',    path: '/location/rumaithiya' },
          { label: 'Computer Repair Shaab',         path: '/location/shaab' },
          { label: 'Computer Repair Surra',         path: '/location/surra' },
          { label: 'Computer Repair Khaitan',       path: '/location/khaitan' },
          { label: 'Computer Repair Riggae',        path: '/location/riggae' },
          { label: 'Computer Repair Ardiya',        path: '/location/ardiya' },
          { label: 'Computer Repair Mahboula',      path: '/location/mahboula' },
          { label: 'Computer Repair Qurain',        path: '/location/qurain' },
          { label: 'Computer Repair Qortuba',       path: '/location/qortuba' },
          { label: 'Computer Repair Rawda',         path: '/location/rawda' },
          { label: 'Computer Repair Messila',       path: '/location/messila' },
          { label: 'Computer Repair Adailiya',      path: '/location/adailiya' },
        ]
      }
    } as FooterEntity,
  }
};

/* ═══════════════════════════════════════════════════════════════════
   KCROC_GRAPH SINGLETON — consumed by all UI components and SEO Engine
   Contains strict null-safe fallbacks (?? []) to ensure 100% build stability.
   Phase 4 adds explicit location topology and case-study inbound edges here
   so the runtime graph matches the links already rendered by the UI.
═══════════════════════════════════════════════════════════════════ */
const LOCATION_RELATIONSHIPS: Record<string, {
  relatedServiceIds: string[];
  relatedProblemIds: string[];
  relatedBrandIds: string[];
  relatedLocationIds: string[];
}> = {
  hawalli: {
    relatedServiceIds: ['srv-laptop', 'srv-motherboard', 'srv-gaming', 'srv-macbook', 'srv-screen'],
    relatedProblemIds: ['problem-no-power', 'problem-overheating', 'problem-black-screen', 'problem-not-charging', 'problem-liquid-spill'],
    relatedBrandIds: ['brand-dell', 'brand-lenovo', 'brand-asus', 'brand-hp'],
    relatedLocationIds: ['loc-salmiya', 'loc-kuwait-city', 'loc-farwaniya', 'loc-jahra', 'loc-ahmadi'],
  },
  salmiya: {
    relatedServiceIds: ['srv-laptop', 'srv-macbook', 'srv-liquid-damage', 'srv-motherboard', 'srv-screen'],
    relatedProblemIds: ['problem-liquid-spill', 'problem-no-power', 'problem-black-screen', 'problem-not-charging'],
    relatedBrandIds: ['brand-dell', 'brand-lenovo', 'brand-hp', 'brand-asus'],
    relatedLocationIds: ['loc-hawalli', 'loc-kuwait-city', 'loc-jabriya'],
  },
  'kuwait-city': {
    relatedServiceIds: ['srv-laptop', 'srv-screen', 'srv-motherboard', 'srv-macbook'],
    relatedProblemIds: ['problem-black-screen', 'problem-cracked-screen', 'problem-no-power', 'problem-not-charging'],
    relatedBrandIds: ['brand-dell', 'brand-lenovo', 'brand-hp', 'brand-asus'],
    relatedLocationIds: ['loc-hawalli', 'loc-salmiya', 'loc-jabriya'],
  },
  farwaniya: {
    relatedServiceIds: ['srv-laptop', 'srv-motherboard', 'srv-screen', 'srv-battery', 'srv-charging-port', 'srv-gaming'],
    relatedProblemIds: ['problem-no-power', 'problem-cracked-screen', 'problem-not-charging', 'problem-black-screen', 'problem-overheating'],
    relatedBrandIds: ['brand-dell', 'brand-hp', 'brand-lenovo', 'brand-asus', 'brand-msi'],
    relatedLocationIds: ['loc-hawalli', 'loc-kuwait-city', 'loc-salmiya', 'loc-jahra'],
  },
  jahra: {
    relatedServiceIds: ['srv-gaming', 'srv-laptop', 'srv-motherboard', 'srv-gaming-laptop-cleaning', 'srv-battery', 'srv-screen'],
    relatedProblemIds: ['problem-overheating', 'problem-no-power', 'problem-not-charging', 'problem-black-screen'],
    relatedBrandIds: ['brand-dell', 'brand-lenovo', 'brand-hp', 'brand-asus'],
    relatedLocationIds: ['loc-hawalli', 'loc-kuwait-city', 'loc-farwaniya'],
  },
  ahmadi: {
    relatedServiceIds: ['srv-gaming', 'srv-macbook', 'srv-laptop', 'srv-motherboard', 'srv-gaming-laptop-cleaning'],
    relatedProblemIds: ['problem-overheating', 'problem-no-power', 'problem-freezing-crashing', 'problem-liquid-spill'],
    relatedBrandIds: ['brand-asus', 'brand-msi', 'brand-dell', 'brand-lenovo'],
    relatedLocationIds: ['loc-fahaheel', 'loc-mangaf', 'loc-abu-halifa'],
  },
  fahaheel: { relatedServiceIds: ['srv-laptop','srv-motherboard','srv-charging-port','srv-liquid-damage','srv-gaming-laptop-cleaning'], relatedProblemIds: ['problem-no-power','problem-overheating','problem-not-charging','problem-liquid-spill'], relatedBrandIds: ['brand-dell','brand-lenovo','brand-asus','brand-hp'], relatedLocationIds: ['loc-ahmadi','loc-mangaf','loc-abu-halifa'] },
  mangaf: { relatedServiceIds: ['srv-laptop','srv-motherboard','srv-macbook','srv-liquid-damage','srv-gaming-laptop'], relatedProblemIds: ['problem-no-power','problem-overheating','problem-liquid-spill'], relatedBrandIds: ['brand-dell','brand-lenovo','brand-asus','brand-msi'], relatedLocationIds: ['loc-ahmadi','loc-fahaheel','loc-abu-halifa'] },
  'abu-halifa': { relatedServiceIds: ['srv-laptop','srv-macbook','srv-charging-port','srv-gaming','srv-desktop-pc'], relatedProblemIds: ['problem-no-power','problem-overheating','problem-not-charging'], relatedBrandIds: ['brand-dell','brand-lenovo','brand-hp','brand-asus'], relatedLocationIds: ['loc-fahaheel','loc-mangaf','loc-fintas'] },
  jabriya: { relatedServiceIds: ['srv-laptop','srv-screen','srv-battery','srv-motherboard','srv-macbook'], relatedProblemIds: ['problem-black-screen','problem-no-power','problem-not-charging','problem-overheating'], relatedBrandIds: ['brand-dell','brand-lenovo','brand-hp','brand-asus'], relatedLocationIds: ['loc-hawalli','loc-kuwait-city','loc-salmiya'] },
  'mubarak-al-kabeer': { relatedServiceIds: ['srv-laptop','srv-battery','srv-screen','srv-motherboard','srv-charging-port'], relatedProblemIds: ['problem-no-power','problem-overheating','problem-not-charging'], relatedBrandIds: ['brand-dell','brand-lenovo','brand-hp','brand-asus'], relatedLocationIds: ['loc-fintas','loc-sabah-al-salem','loc-abu-halifa'] },
  fintas: { relatedServiceIds: ['srv-laptop','srv-gaming','srv-gaming-laptop-cleaning','srv-liquid-damage','srv-desktop-pc'], relatedProblemIds: ['problem-overheating','problem-no-power','problem-liquid-spill'], relatedBrandIds: ['brand-asus','brand-msi','brand-dell','brand-lenovo'], relatedLocationIds: ['loc-abu-halifa','loc-fahaheel','loc-mangaf'] },
  'sabah-al-salem': { relatedServiceIds: ['srv-laptop','srv-macbook','srv-screen','srv-motherboard','srv-charging-port'], relatedProblemIds: ['problem-no-power','problem-black-screen','problem-cracked-screen','problem-not-charging'], relatedBrandIds: ['brand-dell','brand-lenovo','brand-hp','brand-asus'], relatedLocationIds: ['loc-mubarak-al-kabeer','loc-fintas','loc-hawalli'] },

  salwa: { relatedServiceIds: ['srv-laptop','srv-macbook','srv-screen','srv-battery'], relatedProblemIds: ['problem-cracked-screen','problem-black-screen','problem-not-charging','problem-liquid-spill'], relatedBrandIds: ['brand-dell','brand-lenovo','brand-hp','brand-asus'], relatedLocationIds: ['loc-salmiya','loc-rumaithiya','loc-shaab','loc-jabriya'] },
  rumaithiya: { relatedServiceIds: ['srv-laptop','srv-gaming-laptop-cleaning','srv-macbook','srv-motherboard'], relatedProblemIds: ['problem-overheating','problem-no-power','problem-black-screen','problem-not-charging'], relatedBrandIds: ['brand-asus','brand-dell','brand-lenovo','brand-hp'], relatedLocationIds: ['loc-salwa','loc-shaab','loc-jabriya','loc-hawalli'] },
  shaab: { relatedServiceIds: ['srv-laptop','srv-macbook','srv-motherboard','srv-screen'], relatedProblemIds: ['problem-black-screen','problem-no-power','problem-cracked-screen','problem-liquid-spill'], relatedBrandIds: ['brand-dell','brand-lenovo','brand-hp','brand-asus'], relatedLocationIds: ['loc-kuwait-city','loc-salwa','loc-rumaithiya','loc-jabriya'] },
  surra: { relatedServiceIds: ['srv-laptop','srv-screen','srv-battery','srv-motherboard'], relatedProblemIds: ['problem-no-power','problem-not-charging','problem-overheating','problem-black-screen'], relatedBrandIds: ['brand-dell','brand-hp','brand-lenovo','brand-asus'], relatedLocationIds: ['loc-jabriya','loc-salwa','loc-hawalli'] },
  khaitan: { relatedServiceIds: ['srv-laptop','srv-charging-port','srv-screen','srv-motherboard'], relatedProblemIds: ['problem-no-power','problem-not-charging','problem-cracked-screen','problem-overheating'], relatedBrandIds: ['brand-dell','brand-hp','brand-lenovo','brand-asus'], relatedLocationIds: ['loc-farwaniya','loc-riggae','loc-ardiya'] },
  riggae: { relatedServiceIds: ['srv-laptop','srv-macbook','srv-screen','srv-motherboard'], relatedProblemIds: ['problem-no-power','problem-not-charging','problem-black-screen','problem-liquid-spill'], relatedBrandIds: ['brand-dell','brand-hp','brand-lenovo','brand-asus'], relatedLocationIds: ['loc-khaitan','loc-farwaniya','loc-ardiya'] },
  ardiya: { relatedServiceIds: ['srv-laptop','srv-gaming','srv-motherboard','srv-screen'], relatedProblemIds: ['problem-overheating','problem-no-power','problem-black-screen','problem-not-charging'], relatedBrandIds: ['brand-asus','brand-msi','brand-dell','brand-lenovo'], relatedLocationIds: ['loc-farwaniya','loc-riggae'] },
  mahboula: { relatedServiceIds: ['srv-laptop','srv-macbook','srv-gaming','srv-gaming-laptop-cleaning'], relatedProblemIds: ['problem-overheating','problem-freezing-crashing','problem-no-power','problem-liquid-spill'], relatedBrandIds: ['brand-asus','brand-msi','brand-dell','brand-lenovo'], relatedLocationIds: ['loc-mangaf','loc-abu-halifa','loc-fahaheel','loc-ahmadi'] },
  qurain: { relatedServiceIds: ['srv-laptop','srv-macbook','srv-motherboard','srv-screen'], relatedProblemIds: ['problem-no-power','problem-not-charging','problem-black-screen','problem-liquid-spill'], relatedBrandIds: ['brand-dell','brand-lenovo','brand-hp','brand-asus'], relatedLocationIds: ['loc-mubarak-al-kabeer','loc-sabah-al-salem'] },
  qortuba: { relatedServiceIds: ['srv-laptop','srv-macbook','srv-motherboard','srv-screen'], relatedProblemIds: ['problem-no-power','problem-black-screen','problem-not-charging','problem-overheating'], relatedBrandIds: ['brand-dell','brand-lenovo','brand-hp','brand-asus'], relatedLocationIds: ['loc-adailiya','loc-rawda','loc-surra','loc-jabriya'] },
  rawda: { relatedServiceIds: ['srv-laptop','srv-macbook','srv-screen','srv-battery'], relatedProblemIds: ['problem-black-screen','problem-no-power','problem-not-charging','problem-liquid-spill'], relatedBrandIds: ['brand-dell','brand-hp','brand-lenovo','brand-asus'], relatedLocationIds: ['loc-adailiya','loc-qortuba','loc-surra','loc-hawalli'] },
  messila: { relatedServiceIds: ['srv-laptop','srv-macbook','srv-gaming','srv-motherboard'], relatedProblemIds: ['problem-overheating','problem-no-power','problem-not-charging','problem-liquid-spill'], relatedBrandIds: ['brand-asus','brand-msi','brand-dell','brand-lenovo'], relatedLocationIds: ['loc-fintas','loc-mubarak-al-kabeer'] },
  adailiya: { relatedServiceIds: ['srv-laptop','srv-macbook','srv-screen','srv-motherboard'], relatedProblemIds: ['problem-no-power','problem-black-screen','problem-not-charging','problem-cracked-screen'], relatedBrandIds: ['brand-dell','brand-hp','brand-lenovo','brand-asus'], relatedLocationIds: ['loc-qortuba','loc-rawda','loc-surra','loc-jabriya'] },
};

const rawEntities = Object.values(rawGraphData.entities);
const rawCaseStudies = rawEntities.filter((e): e is CaseStudyEntity => e.entityType === 'CaseStudy' && e.isActive);
const brandIdByName = new Map(
  rawEntities
    .filter((e): e is BrandEntity => e.entityType === 'Brand' && e.isActive)
    .map((brand) => [brand.brandName.trim().toLowerCase(), brand.id])
);

const allEntities = rawEntities.map((entity) => {
  if (entity.entityType === 'Location') {
    const rel = LOCATION_RELATIONSHIPS[entity.slug];
    const relatedCaseStudyIds = rawCaseStudies
      .filter((caseStudy) => caseStudy.locationId === entity.id || caseStudy.location === entity.title)
      .map((caseStudy) => caseStudy.id);
    return {
      ...entity,
      ...(rel ?? { relatedServiceIds: [], relatedProblemIds: [], relatedBrandIds: [], relatedLocationIds: [] }),
      relatedCaseStudyIds,
    } as LocationEntity;
  }

  if (entity.entityType === 'Problem') {
    const explicitBrandIds = Array.isArray(entity.relatedBrandIds) ? entity.relatedBrandIds : [];
    const derivedBrandIds = (entity.coveredBrands ?? [])
      .map((brandName) => brandIdByName.get(brandName.trim().toLowerCase()))
      .filter((id): id is string => Boolean(id));
    return {
      ...entity,
      relatedBrandIds: explicitBrandIds.length > 0 ? explicitBrandIds : derivedBrandIds,
    } as ProblemEntity;
  }

  if (entity.entityType === 'Service' || entity.entityType === 'Brand') {
    const relatedCaseStudyIds = rawCaseStudies
      .filter((caseStudy) => {
        if (entity.entityType === 'Service') return caseStudy.serviceIds?.includes(entity.id);
        return caseStudy.brandId === entity.id;
      })
      .map((caseStudy) => caseStudy.id);
    return { ...entity, relatedCaseStudyIds } as ServiceEntity | BrandEntity;
  }

  return entity;
});

export const GRAPH_INDEXES = Object.fromEntries(allEntities.map((entity) => [entity.id, entity]));

export const KCROC_GRAPH = {
  ...rawGraphData,
  entities: GRAPH_INDEXES,
  routableEntities: allEntities.filter((e): e is RoutableEntity => 'seo' in e && e.isActive && e.entityType !== 'FAQ') ?? [],
  business:    allEntities.find((e): e is BusinessEntity    => e.entityType === 'Business') ?? null,
  pages:       allEntities.filter((e): e is WebPageEntity   => e.entityType === 'WebPage'   && e.isActive) ?? [],
  services:    allEntities.filter((e): e is ServiceEntity   => e.entityType === 'Service'   && e.isActive) ?? [],
  faqs:        allEntities.filter((e): e is FAQEntity       => e.entityType === 'FAQ'       && e.isActive) ?? [],
  usps:        allEntities.filter((e): e is USPEntity       => e.entityType === 'USP'       && e.isActive) ?? [],
  trustBadges: allEntities.filter((e): e is TrustBadgeEntity => e.entityType === 'TrustBadge' && e.isActive) ?? [],
  processes:   allEntities.filter((e): e is ProcessEntity   => e.entityType === 'Process'   && e.isActive) ?? [],
  locations:   allEntities.filter((e): e is LocationEntity  => e.entityType === 'Location'  && e.isActive) ?? [],
  reviews:     allEntities.find((e): e is ReviewsEntity     => e.entityType === 'Reviews'   && e.isActive) ?? null,
  footer:      allEntities.find((e): e is FooterEntity      => e.entityType === 'Footer') ?? null,
  stats:       allEntities.find((e): e is StatsEntity       => e.entityType === 'Stats') ?? null,
  
  brands:      allEntities.filter((e): e is BrandEntity     => e.entityType === 'Brand'     && e.isActive) ?? [],
  problems:    allEntities.filter((e): e is ProblemEntity   => e.entityType === 'Problem'   && e.isActive) ?? [],
  caseStudies: allEntities.filter((e): e is CaseStudyEntity => e.entityType === 'CaseStudy' && e.isActive) ?? [],
};

export const KCROC_AGGREGATE_RATING = {
  ratingValue: '4.9',
  reviewCount:  158,
  bestRating:   5,
};
