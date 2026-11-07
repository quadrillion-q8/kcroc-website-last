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
    version: '3.8.5',
    lastUpdated: '2026-11-05T00:00:00+03:00',
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
      aggregateRating: { ratingValue: '4.9', reviewCount: 161, bestRating: 5 },
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
        { label: 'Initial diagnosis', value: 'FREE', sub: 'No-obligation assessment' },
        { label: 'Repair quote', value: 'First', sub: 'Approve before paid work' },
        { label: 'Repair warranty', value: '30 days', sub: 'On completed repairs' },
        { label: 'Pickup & delivery', value: 'Free', sub: 'Across Kuwait' }
      ]
    } as StatsEntity,

    /* ═══════════════════════════════════════════════════════════════
       USPs
    ═══════════════════════════════════════════════════════════════ */
    'usp-component': { id: 'usp-component', entityType: 'USP', isActive: true, iconKey: 'Cpu', title: 'Component-Level Repair', description: 'We diagnose the board itself using micro-soldering and trace repair — not just replace it. This can avoid an unnecessary full-board replacement, but data access depends on the device and fault and cannot be guaranteed.', differentiator: 'Most shops in Kuwait replace the whole board. We fix the one failed chip.' } as USPEntity,
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
      seo: { title: 'Laptop & Computer Repair Kuwait | From 15 KWD | KCROC', description: 'Laptop and computer repair in Kuwait from 15 KWD. Free pickup and delivery, a quote before work, and a 30-day warranty on completed repairs.', canonicalUrl: 'https://www.computerrepairkuwait.com/', locale: 'en_KW', alternates: { 'en-KW': 'https://www.computerrepairkuwait.com/', 'ar-KW': 'https://www.computerrepairkuwait.com/ar', 'x-default': 'https://www.computerrepairkuwait.com/' }, ogType: 'website', schemaTypes: ['LocalBusiness', 'WebSite', 'WebPage'], lastModified: '2026-10-13T00:00:00+03:00' },
      hero: { headline: 'Expert Laptop & Computer Repair in Kuwait.', subheadline: 'We Fix the Board. We Don\'t Just Swap It.', description: 'We diagnose and repair failed components at board level — restoring devices that most repair shops in Kuwait would simply declare beyond repair.', primaryCTA: { text: 'WhatsApp a Technician', route: 'https://wa.me/96555301913' }, secondaryCTA: { text: 'View All Services', route: '/services' } },
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
    'page-services': {
      id: 'page-services', slug: 'services', entityType: 'WebPage', isActive: true,
      title: 'Services',
      description: 'Browse KCROC repair services by device or fault, including laptops, desktop PCs, MacBooks, gaming systems and component-level repairs in Kuwait.',
      seo: {
        title: 'Laptop, MacBook & PC Repair Services Kuwait | KCROC',
        description: 'Browse laptop, desktop PC, MacBook, gaming, screen, battery, charging and motherboard repair in Kuwait. Free diagnosis, quote before work and free pickup.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/services',
        locale: 'en_KW',
        alternates: {
          'en-KW': 'https://www.computerrepairkuwait.com/services',
          'ar-KW': 'https://www.computerrepairkuwait.com/ar/services',
          'x-default': 'https://www.computerrepairkuwait.com/services'
        },
        ogType: 'website',
        schemaTypes: ['CollectionPage', 'WebPage', 'FAQPage', 'BreadcrumbList', 'LocalBusiness'],
        lastModified: '2026-10-26T00:00:00+03:00',
        breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }]
      },
      featuredFAQIds: ['faq-cost', 'faq-pick-and-drop', 'faq-warranty', 'faq-no-fix']
    } as WebPageEntity,
    'page-ar-home': {
      id: 'page-ar-home', slug: 'ar', entityType: 'WebPage', isActive: true,
      title: 'تصليح وصيانة الكمبيوتر واللابتوب في الكويت | مختبر KCROC حولي',
      description: 'تصليح وصيانة الكمبيوتر واللابتوب في الكويت، مع فحص أولي مجاني واستلام وتوصيل مجاني من المنزل أو المكتب. نصلح الأعطال في مختبر KCROC بحولي ونوضح التكلفة قبل بدء العمل.',
      seo: {
        title: 'تصليح وصيانة الكمبيوتر واللابتوب في الكويت | KCROC',
        description: 'تصليح وصيانة الكمبيوتر واللابتوب في الكويت، مع فحص أولي مجاني واستلام وتوصيل مجاني من المنزل أو المكتب. نصلح الأعطال في مختبر KCROC بحولي ونوضح التكلفة قبل بدء العمل.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/ar',
        locale: 'ar_KW',
        alternates: {
          'ar-KW': 'https://www.computerrepairkuwait.com/ar',
          'en-KW': 'https://www.computerrepairkuwait.com/',
          'x-default': 'https://www.computerrepairkuwait.com/'
        },
        ogType: 'website',
        schemaTypes: ['LocalBusiness', 'WebPage', 'FAQPage', 'BreadcrumbList'],
        lastModified: '2026-11-03T00:00:00+03:00',
        breadcrumbs: [{ name: 'الرئيسية', url: '/ar' }]
      },
      featuredFAQIds: [
        'faq-ar-home-motherboard',
        'faq-ar-home-pickup',
        'faq-ar-home-data',
        'faq-ar-home-pricing',
        'faq-ar-home-turnaround'
      ]
    } as WebPageEntity,

    'page-ar-services': {
      id: 'page-ar-services', slug: 'ar/services', entityType: 'WebPage', isActive: true,
      title: 'خدمات تصليح الكمبيوتر واللابتوب في الكويت',
      description: 'تصفح خدمات تصليح اللابتوب والكمبيوتر المكتبي وMacBook وGaming PC والشاشة والبطارية والشحن واللوحة الأم في الكويت. فحص مجاني وسعر قبل الإصلاح واستلام مجاني.',
      seo: {
        title: 'خدمات تصليح الكمبيوتر واللابتوب في الكويت | KCROC',
        description: 'تصفح خدمات تصليح اللابتوب والكمبيوتر المكتبي وMacBook وGaming PC والشاشة والبطارية والشحن واللوحة الأم في الكويت. فحص مجاني وسعر قبل الإصلاح واستلام مجاني.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/ar/services',
        locale: 'ar_KW',
        alternates: {
          'ar-KW': 'https://www.computerrepairkuwait.com/ar/services',
          'en-KW': 'https://www.computerrepairkuwait.com/services',
          'x-default': 'https://www.computerrepairkuwait.com/services'
        },
        ogType: 'website',
        schemaTypes: ['CollectionPage', 'WebPage', 'FAQPage', 'BreadcrumbList'],
        lastModified: '2026-10-26T00:00:00+03:00',
        breadcrumbs: [
          { name: 'الرئيسية', url: '/ar' },
          { name: 'الخدمات', url: '/ar/services' }
        ]
      },
      featuredFAQIds: ['faq-ar-pricing', 'faq-arabic-computer-technician', 'faq-ar-hours', 'faq-ar-laptop-repair-process'],
      relatedServiceIds: ['srv-laptop', 'srv-motherboard', 'srv-gaming', 'srv-macbook', 'srv-screen', 'srv-battery', 'srv-charging-port', 'srv-keyboard', 'srv-macbook-screen', 'srv-ssd-ram', 'srv-gaming-laptop', 'srv-liquid-damage']
    } as WebPageEntity,

    'page-locations': { id: 'page-locations', slug: 'locations', entityType: 'WebPage', isActive: true, title: 'Service Areas', description: 'KCROC service areas across Kuwait.', seo: { title: 'Computer Repair Service Areas Across Kuwait | KCROC', description: 'Explore KCROC\'s dedicated computer and laptop repair service areas across Kuwait. Free pickup and delivery from our central Hawalli repair lab.', canonicalUrl: 'https://www.computerrepairkuwait.com/locations', ogType: 'website', schemaTypes: ['CollectionPage', 'WebPage', 'BreadcrumbList'], lastModified: '2026-10-03T00:00:00+03:00', breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Service Areas', url: '/locations' }] } } as WebPageEntity,
    'page-near-me': {
      id: 'page-near-me', slug: 'near-me', entityType: 'WebPage', isActive: true,
      title: 'Computer Repair Near Me in Kuwait',
      description: 'Find computer and laptop repair near you in Kuwait. Free pickup from your home or office, with all diagnosis and repairs performed at KCROC’s Hawalli workshop.',
      seo: {
        title: 'Computer Repair Near Me | Free Pickup & Delivery | KCROC',
        description: 'Computer repair near you in Kuwait with free home or office pickup, diagnosis at our Hawalli lab, a quote before paid work and a 30-day repair warranty.', canonicalUrl: 'https://www.computerrepairkuwait.com/near-me',
        locale: 'en_KW',
        alternates: {
          'en-KW': 'https://www.computerrepairkuwait.com/near-me',
          'ar-KW': 'https://www.computerrepairkuwait.com/ar/near-me',
          'x-default': 'https://www.computerrepairkuwait.com/near-me'
        },
        ogType: 'website',
        schemaTypes: ['WebPage', 'FAQPage', 'BreadcrumbList'],
        lastModified: '2026-10-25T00:00:00+03:00',
        breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Computer Repair Near Me', url: '/near-me' }]
      },
      hero: {
        headline: 'Computer Repair Near Me in Kuwait',
        subheadline: 'Local workshop repairs, with convenient pickup and delivery.',
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

    // Arabic near-me page: standalone, crawlable, and language-linked to the
    // English near-me route. Keep this page focused on proximity and pickup /
    // delivery intent; the broad high-value query “فني كمبيوتر” is assigned to
    // /ar/computer-repair-kuwait to reduce overlap between the two destinations.
    // Locale 'ar_KW' lets SEOEngine emit the appropriate language/direction.
    'page-near-me-ar': {
      id: 'page-near-me-ar', slug: 'ar/near-me', entityType: 'WebPage', isActive: true,
      title: 'تصليح كمبيوتر ولابتوب بالقرب منك في الكويت',
      description: 'خدمة تصليح كمبيوتر ولابتوب بالقرب منك في الكويت مع استلام وتوصيل مجاني من المنزل أو المكتب، وفحص وإصلاح في مختبر KCROC الفعلي بحولي. نوضح التكلفة قبل الإصلاح؛ لا نقدم زيارات إصلاح داخل المنزل.',
      seo: {
        title: 'تصليح كمبيوتر بالقرب منك في الكويت | استلام مجاني | KCROC',
        description: 'تحتاج تصليح كمبيوتر أو لابتوب بالقرب منك؟ نرتب الاستلام من المنزل أو المكتب ونفحص الجهاز في مختبرنا بحولي، مع توصيل مجاني وعرض سعر قبل الإصلاح. لا نقدم إصلاحًا داخل المنزل.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/ar/near-me',
        locale: 'ar_KW',
        alternates: {
          'ar-KW': 'https://www.computerrepairkuwait.com/ar/near-me',
          'en-KW': 'https://www.computerrepairkuwait.com/near-me',
          'x-default': 'https://www.computerrepairkuwait.com/near-me'
        },
        ogType: 'website',
        ogImage: '/images/kcroc-al-mullah-complex-hawalli-exterior.webp',
        ogImageAlt: 'واجهة موقع KCROC في مجمع المله بحولي، الكويت',
        ogImageWidth: 1200,
        ogImageHeight: 800,
        schemaTypes: ['WebPage', 'FAQPage', 'BreadcrumbList', 'Service'],
        lastModified: '2026-11-01T00:00:00+03:00',
        breadcrumbs: [{ name: 'الرئيسية', url: '/' }, { name: 'تصليح كمبيوتر بالقرب منك', url: '/ar/near-me' }]
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
      title: 'Computer & Laptop Repair Kuwait',
      description: 'Computer repair in Kuwait for desktops, laptops, gaming PCs and MacBooks. Diagnosis first, free pickup and delivery, a clear quote before repair and 30-day warranty.',
      seo: {
        title: 'Computer Repair Kuwait | PC, Laptop & MacBook | KCROC',
        description: 'Computer repair in Kuwait for desktops, laptops, gaming PCs and MacBooks. Diagnosis first, free pickup and delivery, a clear quote before repair and 30-day warranty.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/computer-repair-kuwait',
        locale: 'en_KW',
        alternates: {
          'en-KW': 'https://www.computerrepairkuwait.com/computer-repair-kuwait',
          'ar-KW': 'https://www.computerrepairkuwait.com/ar/computer-repair-kuwait',
          'x-default': 'https://www.computerrepairkuwait.com/computer-repair-kuwait'
        },
        ogType: 'website',
        schemaTypes: ['WebPage', 'BreadcrumbList', 'FAQPage'],
        lastModified: '2026-10-22T00:00:00+03:00',
        breadcrumbs: [
          { name: 'Home', url: '/' },
          { name: 'Computer Repair Kuwait', url: '/computer-repair-kuwait' }
        ]
      },
      featuredImage: {
        ogImage: IMAGES.services.laptopRepair.src,
        altText: 'Computer and laptop repair diagnosis at KCROC in Hawalli, Kuwait'
      },
      featuredFAQIds: ['faq-cost', 'faq-pick-and-drop', 'faq-warranty']
    } as WebPageEntity,

    'page-ar-computer-repair': {
      id: 'page-ar-computer-repair', slug: 'ar/computer-repair-kuwait', entityType: 'WebPage', isActive: true,
      title: 'فني كمبيوتر في الكويت | تصليح كمبيوتر ولابتوب',
      description: 'خدمة فني كمبيوتر في الكويت للابتوب والكمبيوتر المكتبي وأجهزة ماك بوك وأجهزة الألعاب، مع فحص أولي مجاني واستلام وتوصيل من المنزل أو المكتب وإصلاح في مختبر KCROC بحولي.',
      seo: {
        title: 'فني كمبيوتر في الكويت | فحص واستلام مجاني | KCROC',
        description: 'تحتاج فني كمبيوتر في الكويت؟ ننسق استلام الجهاز مجانًا من المنزل أو المكتب، ونفحصه في مختبر حولي ونوضح التكلفة قبل العمل. يشمل ذلك فحصًا أوليًا مجانيًا وضمان 30 يومًا على الإصلاح المكتمل.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/ar/computer-repair-kuwait',
        locale: 'ar_KW',
        alternates: {
          'ar-KW': 'https://www.computerrepairkuwait.com/ar/computer-repair-kuwait',
          'en-KW': 'https://www.computerrepairkuwait.com/computer-repair-kuwait',
          'x-default': 'https://www.computerrepairkuwait.com/computer-repair-kuwait'
        },
        ogType: 'website', schemaTypes: ['WebPage', 'BreadcrumbList', 'FAQPage', 'Service'],
        lastModified: '2026-11-03T00:00:00+03:00',
        breadcrumbs: [{ name: 'الرئيسية', url: '/' }, { name: 'تصليح كمبيوتر في الكويت', url: '/ar/computer-repair-kuwait' }]
      },
      relatedServiceIds: ['srv-laptop', 'srv-motherboard', 'srv-gaming', 'srv-macbook', 'srv-screen']
    } as WebPageEntity,

    'page-ar-laptop-repair': {
      id: 'page-ar-laptop-repair', slug: 'ar/laptop-repair-kuwait', entityType: 'WebPage', isActive: true,
      title: 'تصليح لابتوب في الكويت',
      description: 'تصليح لابتوب في الكويت لأعطال عدم التشغيل والشاشة السوداء والبطارية والشحن والحرارة والمفصلات واللوحة الأم. فحص أولي مجاني، عرض سعر قبل الإصلاح، استلام وتوصيل داخل الكويت وضمان 30 يومًا.',
      seo: {
        title: 'تصليح لابتوب في الكويت | شاشة وشحن وبطارية | KCROC',
        description: 'تصليح لابتوب في الكويت لمشاكل الشاشة والبطارية والشحن والحرارة وعدم التشغيل. فحص أولي مجاني، عرض سعر قبل الإصلاح، استلام وتوصيل وضمان 30 يومًا.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/ar/laptop-repair-kuwait',
        locale: 'ar_KW',
        alternates: { 'ar-KW': 'https://www.computerrepairkuwait.com/ar/laptop-repair-kuwait', 'en-KW': 'https://www.computerrepairkuwait.com/laptop-repair-kuwait', 'x-default': 'https://www.computerrepairkuwait.com/laptop-repair-kuwait' },
        ogType: 'website',
        ogImage: '/images/laptop-repair-kuwait.webp',
        ogImageAlt: 'تصليح وفحص اللابتوب في مختبر KCROC بالكويت',
        ogImageWidth: 1200,
        ogImageHeight: 630,
        schemaTypes: ['WebPage', 'BreadcrumbList'],
        lastModified: '2026-10-21T00:00:00+03:00',
        breadcrumbs: [{ name: 'الرئيسية', url: '/' }, { name: 'تصليح لابتوب في الكويت', url: '/ar/laptop-repair-kuwait' }]
      },
      relatedServiceIds: ['srv-laptop', 'srv-motherboard', 'srv-screen', 'srv-battery', 'srv-charging-port', 'srv-keyboard', 'srv-liquid-damage', 'srv-ssd-ram', 'srv-gaming-laptop']
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
      title: 'تصليح كمبيوتر ألعاب كامل في الكويت | Gaming PC وفحص GPU',
      description: 'تشخيص وإصلاح كمبيوتر ألعاب مكتبي كامل في الكويت، بما في ذلك GPU وVRAM عندما تكون البطاقة مركبة داخل الجهاز، مع فحص الحرارة والطاقة والشاشة السوداء واستلام البرج كاملًا. لا تشمل الخدمة استقبال كروت شاشة منفصلة.',
      seo: {
        title: 'تصليح Gaming PC في الكويت | فحص GPU ضمن الكمبيوتر الكامل | KCROC',
        description: 'تصليح Gaming PC مكتبي كامل في الكويت لمشاكل GPU المركب وFPS والحرارة والطاقة والشاشة السوداء. لا نستقبل كروت شاشة منفصلة؛ فحص أولي مجاني واستلام البرج وضمان 30 يومًا.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/ar/gaming-pc-repair-kuwait',
        locale: 'ar_KW',
        alternates: { 'ar-KW': 'https://www.computerrepairkuwait.com/ar/gaming-pc-repair-kuwait', 'en-KW': 'https://www.computerrepairkuwait.com/gaming-pc-repair-kuwait', 'x-default': 'https://www.computerrepairkuwait.com/gaming-pc-repair-kuwait' },
        ogType: 'website',
        ogImage: '/images/custom-gaming-pc-teardown-and-diagnostics-workbench.webp',
        ogImageAlt: 'تشخيص كمبيوتر ألعاب كامل وفحص كرت الشاشة المركب داخل الجهاز في مختبر KCROC بالكويت',
        ogImageWidth: 1200,
        ogImageHeight: 630,
        schemaTypes: ['WebPage', 'BreadcrumbList', 'Service'],
        lastModified: '2026-10-21T00:00:00+03:00',
        breadcrumbs: [{ name: 'الرئيسية', url: '/' }, { name: 'تصليح كمبيوتر ألعاب في الكويت', url: '/ar/gaming-pc-repair-kuwait' }]
      },
      relatedServiceIds: ['srv-gaming', 'srv-gaming-laptop-cleaning', 'srv-motherboard', 'srv-laptop', 'srv-ssd-ram']
    } as WebPageEntity,

    'page-ar-laptop-screen-repair': {
      id: 'page-ar-laptop-screen-repair',
      slug: 'ar/laptop-screen-repair-kuwait',
      entityType: 'WebPage',
      isActive: true,
      title: 'تبديل وتصليح شاشة اللابتوب في الكويت',
      description: 'تبديل شاشة اللابتوب في الكويت لأجهزة HP وDell وLenovo وASUS وAcer وMSI وHuawei. فحص الكابل والإضاءة ومطابقة رقم القطعة واللمس ومعدل التحديث، مع فحص أولي مجاني واستلام وتوصيل مجاني.',
      seo: {
        title: 'تبديل شاشة اللابتوب الكويت | HP وDell وLenovo | KCROC',
        description: 'تبديل شاشة اللابتوب في الكويت لأجهزة HP وDell وLenovo وASUS وAcer وMSI وHuawei. نفحص الكابل والإضاءة ونطابق رقم القطعة واللمس ومعدل التحديث. فحص أولي مجاني واستلام وتوصيل مجاني.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/ar/laptop-screen-repair-kuwait',
        locale: 'ar_KW',
        alternates: {
          'ar-KW': 'https://www.computerrepairkuwait.com/ar/laptop-screen-repair-kuwait',
          'en-KW': 'https://www.computerrepairkuwait.com/laptop-screen-repair-kuwait',
          'x-default': 'https://www.computerrepairkuwait.com/laptop-screen-repair-kuwait'
        },
        ogType: 'website',
        schemaTypes: ['WebPage', 'BreadcrumbList', 'FAQPage', 'Service', 'OfferCatalog', 'ImageObject'],
        lastModified: '2026-10-29T00:00:00+03:00',
        breadcrumbs: [
          { name: 'الرئيسية', url: '/' },
          { name: 'تصليح شاشة اللابتوب', url: '/ar/laptop-screen-repair-kuwait' }
        ]
      },
      featuredImage: {
        ogImage: IMAGES.laptopHardware.laptopScreenAssemblyDisassemblyRepair.src,
        altText: 'فني يفحص مجموعة شاشة اللابتوب وكابل العرض قبل تحديد هل العطل من لوحة LCD أو التوصيل'
      },
      relatedServiceIds: ['srv-screen', 'srv-laptop', 'srv-battery', 'srv-hinge', 'srv-macbook-screen']
    } as WebPageEntity,

    'page-ar-hawalli-computer-repair': {
      id: 'page-ar-hawalli-computer-repair', slug: 'ar/computer-repair-hawalli', entityType: 'WebPage', isActive: true,
      title: 'تصليح كمبيوتر حولي | فني لابتوب وموقع المختبر',
      description: 'تصليح كمبيوتر ولابتوب في حولي من مختبر KCROC الفعلي في مجمع الملا. زيارة مباشرة أو استلام وتوصيل مجاني، مع تشخيص واضح وضمان 30 يومًا.',
      seo: { title: "تصليح كمبيوتر حولي | فني كمبيوتر ولابتوب | KCROC", description: "تحتاج فني كمبيوتر في حولي؟ زر مختبر KCROC في مجمع الملا، شارع ابن خلدون، محل 19، أو اطلب الاستلام والتوصيل مجانًا. تشخيص واضح وضمان 30 يومًا.",
        canonicalUrl: 'https://www.computerrepairkuwait.com/ar/computer-repair-hawalli',
        locale: 'ar_KW', alternates: { 'ar-KW': 'https://www.computerrepairkuwait.com/ar/computer-repair-hawalli', 'en-KW': 'https://www.computerrepairkuwait.com/location/hawalli', 'x-default': 'https://www.computerrepairkuwait.com/location/hawalli' },
        ogType: 'website', schemaTypes: ['WebPage', 'BreadcrumbList'], lastModified: '2026-10-27T00:00:00+03:00',
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
      title: "تصليح كمبيوتر ولابتوب في الفروانية | استلام مجاني",
      description: "خدمة تصليح كمبيوتر ولابتوب وماك بوك (MacBook) وكمبيوتر قيمنق في الفروانية وخيطان والرقعي والعارضية وجليب الشيوخ وعبدالله المبارك وصباح الناصر، مع استلام مجاني من المنزل أو المكتب وفحص في مختبر KCROC بحولي وعرض سعر قبل الإصلاح.",
      seo: {
        title: "تصليح كمبيوتر الفروانية | فحص مجاني واستلام | KCROC",
        description: "تصليح كمبيوتر ولابتوب وماك بوك (MacBook) وكمبيوتر قيمنق في الفروانية وخيطان والرقعي والعارضية وعبدالله المبارك وصباح الناصر. استلام مجاني وفحص في مختبر حولي.",
        canonicalUrl: 'https://www.computerrepairkuwait.com/ar/computer-repair-farwaniya',
        locale: 'ar_KW', alternates: { 'ar-KW': 'https://www.computerrepairkuwait.com/ar/computer-repair-farwaniya', 'en-KW': 'https://www.computerrepairkuwait.com/location/farwaniya', 'x-default': 'https://www.computerrepairkuwait.com/location/farwaniya' },
        ogType: 'website', ogImage: 'https://www.computerrepairkuwait.com/images/laptop-repair-kuwait.webp', ogImageAlt: 'تصليح كمبيوتر ولابتوب في الفروانية مع استلام مجاني', ogImageWidth: 1200, ogImageHeight: 630, schemaTypes: ['WebPage', 'BreadcrumbList'], lastModified: '2026-10-29T00:00:00+03:00',
        breadcrumbs: [{ name: 'الرئيسية', url: '/' }, { name: "تصليح كمبيوتر ولابتوب في الفروانية", url: '/ar/computer-repair-farwaniya' }]
      },
      featuredImage: { ogImage: 'https://www.computerrepairkuwait.com/images/laptop-repair-kuwait.webp', altText: 'صورة توضيحية لفحص وتصليح اللابتوب لدى KCROC' },
      relatedServiceIds: ['srv-laptop', 'srv-charging-port', 'srv-motherboard', 'srv-screen', 'srv-battery', 'srv-gaming-laptop']
    } as WebPageEntity,

    'page-ar-kuwait-city-computer-repair': {
      id: 'page-ar-kuwait-city-computer-repair',
      slug: 'ar/computer-repair-kuwait-city',
      entityType: 'WebPage',
      isActive: true,
      title: 'تصليح كمبيوتر ولابتوب وماك بوك في مدينة الكويت ومحافظة العاصمة',
      description: 'تصليح كمبيوتر ولابتوب وماك بوك (MacBook) وكمبيوتر قيمنق في مدينة الكويت ومحافظة العاصمة، مع استلام وتوصيل مجاني من المكتب أو المنزل إلى مختبر KCROC في حولي.',
      seo: {
        title: 'تصليح كمبيوتر وماك بوك في مدينة الكويت والعاصمة | KCROC',
        description: 'تصليح كمبيوتر ولابتوب وماك بوك وكمبيوتر قيمنق في مدينة الكويت والعاصمة. استلام وتوصيل مجاني من المكتب أو المنزل في شرق والمرقاب والقبلة ومناطق العاصمة، مع الإصلاح في مختبر حولي وعرض سعر واضح وضمان 30 يومًا.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/ar/computer-repair-kuwait-city',
        locale: 'ar_KW',
        alternates: {
          'ar-KW': 'https://www.computerrepairkuwait.com/ar/computer-repair-kuwait-city',
          'en-KW': 'https://www.computerrepairkuwait.com/location/kuwait-city',
          'x-default': 'https://www.computerrepairkuwait.com/location/kuwait-city'
        },
        ogType: 'website',
        schemaTypes: ['WebPage', 'BreadcrumbList'],
        lastModified: '2026-10-29T00:00:00+03:00',
        breadcrumbs: [
          { name: 'الرئيسية', url: '/' },
          { name: 'تصليح كمبيوتر ولابتوب وماك بوك في مدينة الكويت ومحافظة العاصمة', url: '/ar/computer-repair-kuwait-city' }
        ]
      },
      relatedServiceIds: ['srv-laptop', 'srv-screen', 'srv-motherboard', 'srv-macbook', 'srv-battery', 'srv-gaming', 'srv-desktop-pc', 'srv-hinge', 'srv-liquid-damage', 'srv-charging-port']
    } as WebPageEntity,

    'page-ar-macbook-repair': {
      id: 'page-ar-macbook-repair',
      slug: 'ar/macbook-repair-kuwait',
      entityType: 'WebPage',
      isActive: true,
      title: 'تصليح ماك بوك إير وبرو (MacBook Air & Pro) في الكويت',
      description: 'تصليح ماك بوك في الكويت لأعطال المذربورد والطاقة وUSB-C وMagSafe والشاشة والبطارية وأضرار السوائل والكيبورد والتراك باد، حسب رقم الموديل والجيل.',
      seo: {
        title: 'تصليح ماك بوك بالكويت | Air وPro ومذربورد | KCROC',
        description: 'تصليح ماك بوك إير وبرو (MacBook Air/Pro) في الكويت: M1 إلى M5 وIntel. فحص المذربورد والشحن والشاشة والبطارية وأضرار السوائل؛ نناقش حماية البيانات حسب الحالة، مع استلام مجاني من مناطق الكويت.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/ar/macbook-repair-kuwait',
        locale: 'ar_KW',
        alternates: {
          'ar-KW': 'https://www.computerrepairkuwait.com/ar/macbook-repair-kuwait',
          'en-KW': 'https://www.computerrepairkuwait.com/macbook-repair-kuwait',
          'x-default': 'https://www.computerrepairkuwait.com/macbook-repair-kuwait'
        },
        ogType: 'website',
        schemaTypes: ['WebPage', 'BreadcrumbList', 'FAQPage', 'Service', 'OfferCatalog', 'ImageObject'],
        lastModified: '2026-10-29T00:00:00+03:00',
        breadcrumbs: [
          { name: 'الرئيسية', url: '/ar' },
          { name: 'تصليح ماك بوك (MacBook)', url: '/ar/macbook-repair-kuwait' }
        ]
      },
      featuredImage: {
        ogImage: IMAGES.macbook.diagnostics.src,
        altText: 'فني يفحص ماك بوك (MacBook) مفتوحًا لتشخيص أعطال الشاشة والبطارية والمذربورد في مختبر KCROC بحولي الكويت'
      },
      relatedServiceIds: ['srv-macbook', 'srv-macbook-screen', 'srv-battery', 'srv-motherboard', 'srv-liquid-damage']
    } as WebPageEntity,
    'page-ar-macbook-screen-replacement': {
      id: 'page-ar-macbook-screen-replacement', slug: 'ar/macbook-screen-replacement-kuwait', entityType: 'WebPage', isActive: true,
      title: 'تصليح وتبديل شاشة ماك بوك في الكويت | MacBook Air وPro',
      description: 'تصليح أعطال شاشة ماك بوك في الكويت: فحص الكابل والموصل ودائرة الإضاءة، وإمكانية الإصلاح على مستوى المكونات أو تبديل تجميعة الشاشة حسب الموديل. فحص أولي مجاني واستلام وتوصيل مجاني.',
      seo: {
        title: 'تصليح وتبديل شاشة ماك بوك في الكويت | Air وPro | KCROC',
        description: 'شاشة MacBook مكسورة أو سوداء؟ فحص أولي مجاني في مختبر KCROC بحولي. أجرة العمل من 30 د.ك + الشاشة. أرسل صورة الجهاز للسعر النهائي. استلام مجاني بالكويت.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/ar/macbook-screen-replacement-kuwait', locale: 'ar_KW',
        alternates: { 'ar-KW': 'https://www.computerrepairkuwait.com/ar/macbook-screen-replacement-kuwait', 'en-KW': 'https://www.computerrepairkuwait.com/macbook-screen-replacement-kuwait', 'x-default': 'https://www.computerrepairkuwait.com/macbook-screen-replacement-kuwait' },
        ogType: 'website',
        ogImage: '/images/technician-holding-opened-macbook-for-repair.webp',
        ogImageAlt: 'فحص وتبديل شاشة ماك بوك وMacBook في مختبر KCROC بحولي الكويت قبل مطابقة الموديل والقطعة',
        ogImageWidth: 1200,
        ogImageHeight: 630,
        schemaTypes: ['WebPage', 'BreadcrumbList', 'Service', 'FAQPage', 'ImageObject'],
        lastModified: '2026-10-31T00:00:00+03:00',
        breadcrumbs: [{ name: 'الرئيسية', url: '/ar' }, { name: 'تبديل شاشة MacBook في الكويت', url: '/ar/macbook-screen-replacement-kuwait' }]
      },
      relatedServiceIds: ['srv-macbook-screen', 'srv-macbook', 'srv-screen', 'srv-battery', 'srv-motherboard', 'srv-liquid-damage']
    } as WebPageEntity,

    'page-ar-battery-replacement': {
      id: 'page-ar-battery-replacement', slug: 'ar/battery-replacement-kuwait', entityType: 'WebPage', isActive: true,
      title: 'تبديل بطارية لابتوبات Windows في الكويت — HP وDell وLenovo',
      description: 'فحص وتبديل بطارية لابتوبات Windows في الكويت لموديلات HP وDell وLenovo وASUS وAcer وغيرها، مع فحص دائرة الشحن ومطابقة رقم القطعة. أجرة العمل من 8 د.ك + البطارية، واستلام مجاني وضمان 30 يومًا.',
      seo: {
        title: 'تبديل بطارية لابتوب Windows في الكويت | HP وDell وLenovo | KCROC',
        description: 'تبديل بطارية لابتوبات Windows من HP وDell وLenovo وASUS وAcer وغيرها في الكويت. نفحص صحة البطارية ودائرة الشحن ونطابق رقم القطعة؛ أجرة العمل من 8 د.ك + سعر البطارية، مع استلام مجاني وضمان 30 يومًا.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/ar/battery-replacement-kuwait', locale: 'ar_KW',
        ogImage: 'https://www.computerrepairkuwait.com/images/laptop-bottom-chassis-battery-ram-open.webp', ogImageAlt: 'فحص داخلي لبطارية لابتوب Windows ومطابقة رقم القطعة في مختبر KCROC بحولي', ogImageWidth: 800, ogImageHeight: 600,
        alternates: { 'ar-KW': 'https://www.computerrepairkuwait.com/ar/battery-replacement-kuwait', 'en-KW': 'https://www.computerrepairkuwait.com/battery-replacement-kuwait', 'x-default': 'https://www.computerrepairkuwait.com/battery-replacement-kuwait' },
        ogType: 'website', schemaTypes: ['WebPage', 'BreadcrumbList', 'Service', 'FAQPage'], lastModified: '2026-11-03T00:00:00+03:00', breadcrumbs: [{ name: 'الرئيسية', url: '/ar' }, { name: 'تبديل بطارية اللابتوب', url: '/ar/battery-replacement-kuwait' }]
      },
      relatedServiceIds: ['srv-battery', 'srv-laptop', 'srv-charging-port', 'srv-motherboard']
    } as WebPageEntity,

    'page-macbook-battery-replacement': {
      id: 'page-macbook-battery-replacement', slug: 'macbook-battery-replacement-kuwait', entityType: 'WebPage', isActive: true,
      title: 'MacBook Battery Replacement Kuwait — Installed Price & Diagnostics',
      description: 'MacBook Air and Pro battery replacement in Kuwait with free battery and charging diagnosis, A-number matching, transparent installed quotes, charging-circuit checks and free pickup. Labour starts from 8 KWD plus the battery; the complete installed price is confirmed before work.',
      seo: {
        title: 'MacBook Battery Replacement Kuwait | Installed Quote | KCROC',
        description: 'MacBook battery replacement in Kuwait with free battery and charging diagnosis, A-number matching and transparent installed quotes. Free pickup; 30-day warranty on covered repairs.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/macbook-battery-replacement-kuwait', locale: 'en_KW',
        ogImage: 'https://www.computerrepairkuwait.com/images/macbook-internal-battery-replacement-service.webp', ogImageAlt: 'MacBook internal battery service and model-matched replacement at KCROC in Hawalli, Kuwait', ogImageWidth: 800, ogImageHeight: 600,
        alternates: { 'en-KW': 'https://www.computerrepairkuwait.com/macbook-battery-replacement-kuwait', 'ar-KW': 'https://www.computerrepairkuwait.com/ar/macbook-battery-replacement-kuwait', 'x-default': 'https://www.computerrepairkuwait.com/macbook-battery-replacement-kuwait' },
        ogType: 'website', schemaTypes: ['WebPage', 'BreadcrumbList'], lastModified: '2026-11-03T00:00:00+03:00',
        breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'MacBook Repair Kuwait', url: '/macbook-repair-kuwait' }, { name: 'MacBook Battery Replacement', url: '/macbook-battery-replacement-kuwait' }]
      },
      relatedServiceIds: ['srv-macbook', 'srv-charging-port', 'srv-motherboard', 'srv-macbook-screen']
    } as WebPageEntity,

    'page-ar-macbook-battery-replacement': {
      id: 'page-ar-macbook-battery-replacement', slug: 'ar/macbook-battery-replacement-kuwait', entityType: 'WebPage', isActive: true,
      title: 'تبديل بطارية MacBook في الكويت — السعر والتركيب وموديلات Air وPro',
      description: 'تبديل بطارية MacBook Air وMacBook Pro في الكويت مع دليل أرقام A-number، وفحص صحة البطارية ودائرة الشحن وUSB-C أو MagSafe وخط بيانات البطارية. السعر الشامل بعد مطابقة القطعة؛ أجرة التركيب من 8 د.ك + البطارية.',
      seo: {
        title: 'تبديل بطارية MacBook في الكويت | السعر مع التركيب وموديلات A | KCROC',
        description: 'تبديل بطارية ماك بوك في الكويت (MacBook Air وPro) مع موديلات A-number وفحص آيسي الشحن وUSB-C أو MagSafe وخط بيانات البطارية حسب الموديل. عرض سعر شامل قبل الإصلاح، استلام مجاني وضمان 30 يومًا على الإصلاحات المشمولة.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/ar/macbook-battery-replacement-kuwait', locale: 'ar_KW',
        ogImage: 'https://www.computerrepairkuwait.com/images/macbook-internal-battery-replacement-service.webp', ogImageAlt: 'فحص وتبديل بطارية MacBook Air وPro داخل مختبر KCROC بحولي', ogImageWidth: 800, ogImageHeight: 600,
        alternates: { 'ar-KW': 'https://www.computerrepairkuwait.com/ar/macbook-battery-replacement-kuwait', 'en-KW': 'https://www.computerrepairkuwait.com/macbook-battery-replacement-kuwait', 'x-default': 'https://www.computerrepairkuwait.com/macbook-battery-replacement-kuwait' },
        ogType: 'website', schemaTypes: ['WebPage', 'BreadcrumbList', 'Service', 'FAQPage'], lastModified: '2026-11-03T00:00:00+03:00',
        breadcrumbs: [{ name: 'الرئيسية', url: '/ar' }, { name: 'تصليح MacBook', url: '/ar/macbook-repair-kuwait' }, { name: 'تبديل بطارية MacBook', url: '/ar/macbook-battery-replacement-kuwait' }]
      },
      relatedServiceIds: ['srv-macbook', 'srv-macbook-screen', 'srv-charging-port', 'srv-motherboard']
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
      title: 'تصليح Gaming Laptop في الكويت', description: 'تصليح لابتوب قيمنق في الكويت لمشاكل الحرارة وهبوط FPS والشاشة السوداء والطاقة والشحن وGPU والمذربورد.',
      seo: {
        title: 'تصليح Gaming Laptop في الكويت | ROG وLegion وMSI | KCROC',
        description: 'تصليح لابتوب قيمنق في الكويت لمشاكل الحرارة وهبوط FPS والشاشة السوداء والطاقة والشحن وGPU والمذربورد. تشخيص مجاني، استلام وتوصيل مجاني وضمان 30 يومًا.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/ar/gaming-laptop-repair-kuwait',
        ogImage: '/images/msi-gaming-laptop-and-gpu-repair-workstation.webp',
        ogImageAlt: 'لابتوب MSI للألعاب على طاولة فحص داخل ورشة KCROC',
        ogImageWidth: 1200, ogImageHeight: 800,
        locale: 'ar_KW',
        alternates: { 'ar-KW': 'https://www.computerrepairkuwait.com/ar/gaming-laptop-repair-kuwait', 'en-KW': 'https://www.computerrepairkuwait.com/gaming-laptop-repair-kuwait', 'x-default': 'https://www.computerrepairkuwait.com/gaming-laptop-repair-kuwait' },
        ogType: 'website', schemaTypes: ['WebPage', 'BreadcrumbList'], lastModified: '2026-10-17T00:00:00+03:00', breadcrumbs: [{ name: 'الرئيسية', url: '/' }, { name: 'تصليح Gaming Laptop', url: '/ar/gaming-laptop-repair-kuwait' }]
      },
      relatedServiceIds: ['srv-gaming-laptop', 'srv-gaming-laptop-cleaning', 'srv-gaming', 'srv-laptop', 'srv-screen', 'srv-battery']
    } as WebPageEntity,

        'page-ar-desktop-pc-repair': {
      id: 'page-ar-desktop-pc-repair', slug: 'ar/desktop-pc-repair-kuwait', entityType: 'WebPage', isActive: true,
      title: 'تصليح الكمبيوتر المكتبي (Desktop & PC) في الكويت',
      description: 'تصليح الكمبيوتر المكتبي في الكويت لأعطال الطاقة والشاشة السوداء والحرارة والتوقف المفاجئ والتخزين والرام والمذربورد. بعض الإصلاحات تبدأ من 15 د.ك مع فحص أولي مجاني واستلام وتوصيل وضمان 30 يومًا.',
      seo: {
        title: 'تصليح الكمبيوتر المكتبي في الكويت | Desktop & PC | KCROC',
        description: 'تصليح الكمبيوتر المكتبي وPC في الكويت لأعطال الطاقة والشاشة والحرارة والمذربورد. بعض الإصلاحات تبدأ من 15 د.ك، مع فحص أولي مجاني واستلام وتوصيل وضمان 30 يومًا.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/ar/desktop-pc-repair-kuwait',
        locale: 'ar_KW',
        alternates: { 'ar-KW': 'https://www.computerrepairkuwait.com/ar/desktop-pc-repair-kuwait', 'en-KW': 'https://www.computerrepairkuwait.com/desktop-pc-repair-kuwait', 'x-default': 'https://www.computerrepairkuwait.com/desktop-pc-repair-kuwait' },
        ogType: 'website', schemaTypes: ['WebPage', 'BreadcrumbList', 'Service'], lastModified: '2026-11-01T00:00:00+03:00',
        breadcrumbs: [{ name: 'الرئيسية', url: '/' }, { name: 'تصليح الكمبيوتر المكتبي', url: '/ar/desktop-pc-repair-kuwait' }]
      },
      relatedServiceIds: ['srv-motherboard', 'srv-gaming', 'srv-ssd-ram']
    } as WebPageEntity,
    'page-ar-laptop-hinge-repair': {
      id: 'page-ar-laptop-hinge-repair', slug: 'ar/laptop-hinge-repair-kuwait', entityType: 'WebPage', isActive: true,
      title: 'تصليح مفصلات وهيكل اللابتوب في الكويت',
      description: 'إصلاح مفصلات اللابتوب القاسية أو المكسورة وترميم نقاط التثبيت والهيكل وفحص كابل الشاشة، مع استلام وتوصيل مجاني وضمان 30 يومًا.',
      seo: {
        title: 'تصليح مفصلات اللابتوب والهيكل في الكويت | KCROC',
        description: 'تصليح مفصلات اللابتوب المكسورة أو القاسية وترميم الهيكل وفحص كابل الشاشة في الكويت. السعر يبدأ من 15 د.ك، مع استلام مجاني وضمان 30 يومًا.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/ar/laptop-hinge-repair-kuwait',
        locale: 'ar_KW',
        alternates: { 'ar-KW': 'https://www.computerrepairkuwait.com/ar/laptop-hinge-repair-kuwait', 'en-KW': 'https://www.computerrepairkuwait.com/laptop-hinge-repair-kuwait', 'x-default': 'https://www.computerrepairkuwait.com/laptop-hinge-repair-kuwait' },
        ogType: 'website', schemaTypes: ['WebPage', 'BreadcrumbList'], lastModified: '2026-11-02T00:00:00+03:00',
        breadcrumbs: [{ name: 'الرئيسية', url: '/' }, { name: 'تصليح مفصلات اللابتوب', url: '/ar/laptop-hinge-repair-kuwait' }]
      },
      relatedServiceIds: ['srv-laptop', 'srv-screen', 'srv-charging-port']
    } as WebPageEntity,

    'page-ar-gaming-laptop-cleaning': {
      id: 'page-ar-gaming-laptop-cleaning', slug: 'ar/gaming-laptop-cleaning-kuwait', entityType: 'WebPage', isActive: true,
      title: 'تنظيف لابتوب الألعاب وصيانة التبريد في الكويت',
      description: 'تنظيف داخلي للابتوبات المخصصة للألعاب وفحص المراوح والمشتت والمعجون والوسائد الحرارية عند الحاجة، مع اختبار الحرارة بعد الخدمة.',
      seo: {
        title: 'تنظيف وصيانة تبريد لابتوب الألعاب في الكويت | KCROC',
        description: 'تنظيف لابتوب الألعاب وصيانة نظام التبريد في الكويت، مع فحص المراوح والمواد الحرارية واختبار الحرارة. السعر الإرشادي 15–20 د.ك واستلام مجاني.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/ar/gaming-laptop-cleaning-kuwait',
        locale: 'ar_KW',
        alternates: { 'ar-KW': 'https://www.computerrepairkuwait.com/ar/gaming-laptop-cleaning-kuwait', 'en-KW': 'https://www.computerrepairkuwait.com/gaming-laptop-cleaning-kuwait', 'x-default': 'https://www.computerrepairkuwait.com/gaming-laptop-cleaning-kuwait' },
        ogType: 'website', schemaTypes: ['WebPage', 'BreadcrumbList'], lastModified: '2026-11-02T00:00:00+03:00',
        breadcrumbs: [{ name: 'الرئيسية', url: '/' }, { name: 'تنظيف لابتوب الألعاب', url: '/ar/gaming-laptop-cleaning-kuwait' }]
      },
      relatedServiceIds: ['srv-gaming-laptop-cleaning', 'srv-gaming-laptop', 'srv-laptop']
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
    'page-contact': {
      id: 'page-contact', slug: 'contact', entityType: 'WebPage', isActive: true,
      title: 'Contact KCROC – Computer Repair in Hawalli, Kuwait',
      description: 'Contact KCROC in Hawalli, Kuwait. Visit the Al Mullah Complex repair lab at Basement Shop 19, call or WhatsApp our team, or arrange free pickup across Kuwait.',
      seo: {
        title: 'Contact KCROC | Computer Repair in Hawalli, Kuwait',
        description: 'Contact KCROC in Hawalli, Kuwait for laptop, MacBook and computer repair. Call +965 55301913, WhatsApp our team, visit our Al Mullah Complex lab at Basement Shop 19, or arrange free pickup across Kuwait.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/contact',
        locale: 'en_KW',
        alternates: {
          'en-KW': 'https://www.computerrepairkuwait.com/contact',
          'ar-KW': 'https://www.computerrepairkuwait.com/ar/contact',
          'x-default': 'https://www.computerrepairkuwait.com/contact'
        },
        ogType: 'website',
        schemaTypes: ['ContactPage'],
        lastModified: '2026-10-30T00:00:00+03:00'
      }
    } as WebPageEntity,
    'page-ar-contact': {
      id: 'page-ar-contact', slug: 'ar/contact', entityType: 'WebPage', isActive: true,
      title: 'اتصل بنا – تصليح الكمبيوتر واللابتوب في حولي، الكويت',
      description: 'تواصل مع KCROC لتصليح الكمبيوتر واللابتوب في حولي. زر مختبرنا في مجمع الملا، اتصل أو راسلنا واتساب، أو اطلب استلامًا مجانيًا من مناطق الكويت.',
      seo: {
        title: 'اتصل بـ KCROC | تصليح الكمبيوتر واللابتوب في حولي، الكويت',
        description: 'تواصل مع KCROC لتصليح الكمبيوتر واللابتوب في حولي، الكويت. اتصل على +965 55301913 أو راسلنا واتساب أو زر مختبرنا في مجمع الملا، مع استلام مجاني من مناطق الكويت.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/ar/contact',
        locale: 'ar_KW',
        alternates: {
          'ar-KW': 'https://www.computerrepairkuwait.com/ar/contact',
          'en-KW': 'https://www.computerrepairkuwait.com/contact',
          'x-default': 'https://www.computerrepairkuwait.com/contact'
        },
        ogType: 'website',
        schemaTypes: ['ContactPage'],
        lastModified: '2026-10-30T00:00:00+03:00'
      }
    } as WebPageEntity,
    'page-faq': { id: 'page-faq', slug: 'faq', entityType: 'WebPage', isActive: true, title: 'FAQ', description: 'Frequently asked questions.', seo: { title: 'Frequently Asked Questions | KCROC Kuwait', description: 'Answers to common questions about our laptop repair services, pricing, warranty, and data privacy.', canonicalUrl: 'https://www.computerrepairkuwait.com/faq', ogType: 'website', schemaTypes: ['FAQPage'] } } as WebPageEntity,
    'page-gallery': { id: 'page-gallery', slug: 'gallery', entityType: 'WebPage', isActive: true, title: 'Gallery', description: 'Lab and repair gallery.', seo: { title: 'Repair Gallery | KCROC Hawalli Lab', description: 'View our ESD-safe repair lab in Hawalli and real examples of our component-level micro-soldering.', canonicalUrl: 'https://www.computerrepairkuwait.com/gallery', ogType: 'website', schemaTypes: ['CollectionPage'] } } as WebPageEntity,
    'page-pricing': { id: 'page-pricing', slug: 'pricing', entityType: 'WebPage', isActive: true, title: 'Pricing', description: 'Transparent repair pricing for common computer and laptop repairs in Kuwait.', seo: { title: 'Computer Repair Prices Kuwait | Screen & Battery Labor | KCROC', description: 'Laptop screen labor from 30 KWD + panel; battery labor from 8 KWD + battery. Keyboard labor starts from 10 KWD; part cost varies by model. Free initial diagnosis and a quote before repair in Kuwait.', canonicalUrl: 'https://www.computerrepairkuwait.com/pricing', locale: 'en_KW', alternates: { 'en-KW': 'https://www.computerrepairkuwait.com/pricing', 'ar-KW': 'https://www.computerrepairkuwait.com/ar/pricing', 'x-default': 'https://www.computerrepairkuwait.com/pricing' }, ogType: 'website', schemaTypes: ['WebPage'], lastModified: '2026-10-24T00:00:00+03:00', breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Pricing', url: '/pricing' }] } } as WebPageEntity,
    'page-ar-pricing': {
      id: 'page-ar-pricing',
      slug: 'ar/pricing',
      entityType: 'WebPage',
      isActive: true,
      title: 'أسعار تصليح الكمبيوتر واللابتوب في الكويت',
      description: 'قائمة أسعار تصليح الكمبيوتر واللابتوب في الكويت لدى KCROC: فحص أولي مجاني، أجور عمل مبدئية للشاشة والبطارية والكيبورد وSSD وRAM، وأسعار إرشادية لإصلاح اللوحة الأم مع توضيح تكلفة القطع قبل الموافقة.',
      seo: {
        title: 'أسعار تصليح الكمبيوتر واللابتوب في الكويت | KCROC',
        description: 'تعرف على أسعار تصليح الكمبيوتر واللابتوب في الكويت لدى KCROC. أجور عمل الشاشة تبدأ من 30 د.ك دون سعر الشاشة، والبطارية من 8 د.ك دون سعر البطارية، والكيبورد من 10 د.ك مع تحديد تكلفة القطعة حسب الموديل. فحص أولي مجاني واستلام وتوصيل مجاني وعرض سعر قبل الإصلاح.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/ar/pricing',
        locale: 'ar_KW',
        alternates: {
          'ar-KW': 'https://www.computerrepairkuwait.com/ar/pricing',
          'en-KW': 'https://www.computerrepairkuwait.com/pricing',
          'x-default': 'https://www.computerrepairkuwait.com/pricing'
        },
        ogType: 'website',
        schemaTypes: ['WebPage'],
        lastModified: '2026-10-24T00:00:00+03:00',
        breadcrumbs: [
          { name: 'الرئيسية', url: '/' },
          { name: 'أسعار التصليح', url: '/ar/pricing' }
        ]
      },
      featuredImage: {
        ogImage: IMAGES.brand.heroBanner.src,
        altText: 'فني يعمل على إصلاح لابتوب في مختبر KCROC في حولي مع خدمة أسعار تصليح الكمبيوتر بالكويت'
      },
      relatedServiceIds: ['srv-laptop', 'srv-screen', 'srv-battery', 'srv-charging-port', 'srv-motherboard', 'srv-ssd-ram']
    } as WebPageEntity,
    'page-booking': {
      id: 'page-booking', slug: 'book', entityType: 'WebPage', isActive: true,
      title: 'Book Laptop & Computer Repair Pickup in Kuwait',
      description: 'Request free laptop and computer repair pickup anywhere in Kuwait. Free initial diagnosis, a clear quote before repair, and a 30-day repair warranty.',
      seo: {
        title: 'Book Laptop & Computer Repair Pickup in Kuwait | KCROC',
        description: 'Request free laptop and computer repair pickup anywhere in Kuwait. Get a free initial diagnosis, a repair quote before paid work, and a 30-day repair warranty.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/book',
        locale: 'en_KW',
        alternates: {
          'en-KW': 'https://www.computerrepairkuwait.com/book',
          'ar-KW': 'https://www.computerrepairkuwait.com/ar/book',
          'x-default': 'https://www.computerrepairkuwait.com/book'
        },
        ogType: 'website',
        schemaTypes: ['WebPage'],
        lastModified: '2026-10-30T00:00:00+03:00'
      }
    } as WebPageEntity,
    'page-ar-booking': {
      id: 'page-ar-booking', slug: 'ar/book', entityType: 'WebPage', isActive: true,
      title: 'حجز استلام اللابتوب والكمبيوتر للتصليح في الكويت',
      description: 'احجز استلام اللابتوب أو الكمبيوتر مجانًا من المنزل أو المكتب في الكويت. فحص أولي مجاني، وتوضيح التكلفة قبل بدء الإصلاح، وضمان إصلاح لمدة 30 يومًا.',
      seo: {
        title: 'احجز استلام اللابتوب والكمبيوتر للتصليح في الكويت | KCROC',
        description: 'اطلب استلام اللابتوب أو الكمبيوتر للتصليح مجانًا في جميع مناطق الكويت. فحص أولي مجاني، وعرض سعر قبل الإصلاح، وضمان لمدة 30 يومًا.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/ar/book',
        locale: 'ar_KW',
        alternates: {
          'ar-KW': 'https://www.computerrepairkuwait.com/ar/book',
          'en-KW': 'https://www.computerrepairkuwait.com/book',
          'x-default': 'https://www.computerrepairkuwait.com/book'
        },
        ogType: 'website',
        schemaTypes: ['WebPage'],
        lastModified: '2026-10-30T00:00:00+03:00'
      }
    } as WebPageEntity,
    
    'page-privacy': { id: 'page-privacy', slug: 'privacy-security-kuwait', entityType: 'WebPage', isActive: true, title: 'Privacy & Security', description: 'Our data privacy guarantee.', seo: { title: 'Data Privacy & Security Guarantee | KCROC', description: 'Read about our strict hardware-only protocol that guarantees your personal data remains 100% private during repairs.', canonicalUrl: 'https://www.computerrepairkuwait.com/privacy-security-kuwait', ogType: 'website', schemaTypes: ['WebPage'] } } as WebPageEntity,
    'page-privacy-policy': { id: 'page-privacy-policy', slug: 'privacy-policy', entityType: 'WebPage', isActive: true, title: 'Privacy Policy', description: 'KCROC Privacy Policy and Data Handling', seo: { title: 'Privacy Policy | KCROC Kuwait', description: 'Read the official Privacy Policy for Kuwait Computer Repair On Call. We are committed to protecting your data and personal information.', canonicalUrl: 'https://www.computerrepairkuwait.com/privacy-policy', ogType: 'website', schemaTypes: ['WebPage'] } } as WebPageEntity,
    'page-terms-of-service': { id: 'page-terms-of-service', slug: 'terms-of-service', entityType: 'WebPage', isActive: true, title: 'Terms of Service', description: 'KCROC Terms and Conditions of Service', seo: { title: 'Terms of Service | KCROC Kuwait', description: 'Read the official Terms of Service and conditions for computer repair, pick & drop, and warranties at Kuwait Computer Repair On Call.', canonicalUrl: 'https://www.computerrepairkuwait.com/terms-of-service', ogType: 'website', schemaTypes: ['WebPage'] } } as WebPageEntity,
    'page-author-imran': { id: 'page-author-imran', slug: 'author/imran', entityType: 'WebPage', isActive: true, title: 'Imran Natiq', description: 'Author bio page for Imran Natiq, Founder & Lead Technician at KCROC, referenced from the Person schema on blog articles he authored.', seo: { title: 'Imran Natiq — Hardware Repair Engineer at KCROC Kuwait', description: 'Imran Natiq is a hardware repair engineer and founder of KCROC in Hawalli, Kuwait, specializing in motherboard diagnostics and micro-soldering.', canonicalUrl: 'https://www.computerrepairkuwait.com/author/imran', ogType: 'profile', schemaTypes: ['ProfilePage', 'Person', 'BreadcrumbList'] } } as WebPageEntity,
    'guide-battery': { id: 'guide-battery', slug: 'guides/laptop-battery-warning-signs', entityType: 'WebPage', isActive: true, title: 'Laptop Battery Warning Signs: 15+ Signs & Tests', description: 'A practical laptop battery authority guide covering 15+ warning signs, Windows 11 and Mac battery-health checks, swollen-battery safety, diagnosis, and replacement decisions.', seo: { title: 'Laptop Battery Problems: 15 Warning Signs & Tests | KCROC', description: 'Spot laptop battery failure with 15 warning signs, Windows and Mac health tests, swollen-battery safety advice, and replacement guidance.', canonicalUrl: 'https://www.computerrepairkuwait.com/guides/laptop-battery-warning-signs', ogImage: 'https://www.computerrepairkuwait.com/images/discover/swollen-macbook-battery-replacement-2-1200x675.webp', ogType: 'article', schemaTypes: ['Article', 'FAQPage', 'BreadcrumbList'], lastModified: '2026-11-06T00:00:00+03:00' },
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
        description: "PC won’t boot after a BIOS/UEFI update? Learn to distinguish firmware corruption from RAM, power or motherboard faults and review safe recovery options.",
        canonicalUrl: 'https://www.computerrepairkuwait.com/guides/bios-uefi-recovery-kuwait',
        ogImage: 'https://www.computerrepairkuwait.com/images/discover/bios-hero-motherboard-1200x675.webp',
        ogType: 'article',
        locale: 'en',
        alternates: {
          'en': 'https://www.computerrepairkuwait.com/guides/bios-uefi-recovery-kuwait',
          'ar': 'https://www.computerrepairkuwait.com/guides/ar/bios-uefi-recovery-kuwait',
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
        title: 'Intel Core Ultra vs Ryzen AI: 2026 Laptop Guide | KCROC', 
        description: 'Compare Intel Core Ultra and Ryzen AI laptops in 2026: CPU speed, graphics, NPU features, power limits, cooling and configurations.', 
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
      description: 'دليل لتمييز تلف فيرموير BIOS/UEFI عن أعطال الرام والطاقة واللوحة الأم، مع طرق الاسترداد الآمنة وبرمجة شريحة SPI.',
      seo: {
        title: 'استرداد BIOS بعد فشل التحديث: دليل UEFI والأعطال | KCROC',
        description: 'لابتوب أو كمبيوتر لا يقلع بعد تحديث BIOS أو UEFI؟ تعرّف كيف تفرّق بين تلف الفيرموير وأعطال الرام والطاقة واللوحة الأم، وخيارات الاسترداد الآمنة.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/guides/ar/bios-uefi-recovery-kuwait',
        ogType: 'article',
        locale: 'ar',
        alternates: {
          'en': 'https://www.computerrepairkuwait.com/guides/bios-uefi-recovery-kuwait',
          'ar': 'https://www.computerrepairkuwait.com/guides/ar/bios-uefi-recovery-kuwait',
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
      title: 'دليل شراء اللابتوب في الكويت 2026: شلون تختار حسب استخدامك؟',
      description: 'دليل عملي لشراء لابتوب في الكويت 2026: قارن CPU وRAM وSSD وGPU والبطارية والتبريد والضمان المحلي، مع قائمة فحص للموديلات الجديدة والمستعملة.',
      seo: {
        title: 'شراء لابتوب في الكويت 2026 | دليل المواصفات | KCROC',
        description: 'دليل شراء لابتوب في الكويت 2026: قارن المعالج والرام وSSD وكرت الشاشة والبطارية والتبريد والضمان المحلي حسب استخدامك، مع قائمة فحص قبل الدفع.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/blog/ar/laptop-buying-guide-kuwait-2026',
        ogImage: 'https://www.computerrepairkuwait.com/images/blog/laptop-buying-guide-kuwait-arabic-2026.webp',
        ogType: 'article',
        locale: 'ar_KW',
        alternates: { 'en-KW': '/blog/laptop-buying-guide-kuwait-2026', 'ar-KW': '/blog/ar/laptop-buying-guide-kuwait-2026', 'x-default': '/blog/laptop-buying-guide-kuwait-2026' },
        schemaTypes: ['Article', 'FAQPage', 'BreadcrumbList', 'ImageObject'],
        lastModified: '2026-10-21T00:00:00+03:00'
      },
      relatedServiceIds: ['srv-laptop'],
      relatedResourcePaths: [
        { label: 'مقارنة Intel Core Ultra وAMD Ryzen AI', path: '/blog/intel-core-ultra-vs-amd-ryzen-ai' },
        { label: 'تنظيف لابتوب القيمنق في الكويت', path: '/blog/ar/how-often-clean-laptop-replace-thermal-paste-kuwait' },
        { label: 'صيانة اللابتوب في الكويت', path: '/laptop-repair-kuwait' }
      ]
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
      title: 'High FPS but Gaming Stutter? How to Test GameBarPresenceWriter.exe',
      description: 'High FPS but uneven gameplay? Test whether GameBarPresenceWriter.exe is related, review Xbox Game Bar capture settings, and understand safe registry rollback.',
      seo: {
        title: 'High FPS but Stuttering? GameBarPresenceWriter.exe Fix | KCROC',
        description: 'Test whether GameBarPresenceWriter.exe is linked to gaming stutter. Run a quick isolation test, adjust Game Bar settings, and review registry risks.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/guides/gamebar-presence-writer-fix',
        ogImage: 'https://www.computerrepairkuwait.com/images/discover/windows-11-laptop-multitasking-1200x675.webp',
        lastModified: '2026-11-01T00:00:00+03:00',
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
        title: 'WHESVC Explained: Windows Health and Optimized Experiences | KCROC',
        description: 'What is WHESVC in Windows 11? Learn what Windows Health and Optimized Experiences does, how to check its status, CVE-2025-59241, and safer troubleshooting.',
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
      title: 'تصليح مدخل شحن اللابتوب في الكويت', description: 'تصليح مدخل شحن اللابتوب وUSB-C وDC Jack في الكويت مع فحص الشاحن ونقاط اللحام ودائرة الطاقة. استلام وتوصيل مجاني، وسعر بداية الإصلاح من 20 د.ك حسب العطل.',
      seo: {
        title: 'تصليح مدخل شحن اللابتوب بالكويت | USB-C وDC Jack | KCROC',
        description: 'اللابتوب ما يشحن أو المنفذ مرتخي؟ فحص وإصلاح USB-C وDC Jack في الكويت، من 20 د.ك حسب العطل، مع استلام مجاني وضمان 30 يومًا.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/ar/laptop-charging-port-repair-kuwait',
        ogImage: '/images/laptop-dc-power-jack-connector-replacement-kuwait-1000.webp',
        ogImageAlt: 'فحص واستبدال منفذ طاقة DC Jack في لوحة لابتوب',
        ogImageWidth: 1000,
        ogImageHeight: 1000,
        locale: 'ar_KW',
        alternates: {
          'ar-KW': 'https://www.computerrepairkuwait.com/ar/laptop-charging-port-repair-kuwait',
          'en-KW': 'https://www.computerrepairkuwait.com/laptop-charging-port-repair-kuwait',
          'x-default': 'https://www.computerrepairkuwait.com/laptop-charging-port-repair-kuwait'
        },
        ogType: 'website',
        schemaTypes: ['WebPage', 'BreadcrumbList', 'FAQPage', 'Service'],
        lastModified: '2026-10-26T00:00:00+03:00',
        breadcrumbs: [{ name: 'الرئيسية', url: '/' }, { name: 'تصليح مدخل شحن اللابتوب', url: '/ar/laptop-charging-port-repair-kuwait' }]
      },
      featuredImage: {
        ogImage: '/images/laptop-dc-power-jack-connector-replacement-kuwait-1000.webp',
        altText: 'فحص واستبدال منفذ طاقة DC Jack في لوحة لابتوب'
      },
      relatedServiceIds: ['srv-charging-port', 'srv-motherboard', 'srv-battery', 'srv-laptop']
    } as WebPageEntity,
    'page-ar-laptop-plugged-in-not-charging': {
      id: 'page-ar-laptop-plugged-in-not-charging',
      slug: 'ar/laptop-plugged-in-not-charging',
      entityType: 'WebPage',
      isActive: true,
      title: 'اللابتوب متصل بالشاحن ولا يشحن؟ التشخيص والحل في الكويت',
      description: 'هل يظهر اللابتوب أو MacBook متصلاً بالشاحن ولا يشحن أو ثابتاً على 0%؟ دليل تشخيص آمن للتفريق بين إعدادات الشحن والشاحن والبطارية والمنفذ ودائرة المذربورد، مع فحص مبدئي مجاني واستلام بالكويت.',
      seo: {
        title: 'اللابتوب متصل بالشاحن ولا يشحن؟ التشخيص والحل في الكويت | KCROC',
        description: 'هل يظهر اللابتوب أو MacBook متصل بالشاحن ولا يشحن أو ثابت على 0%؟ دليل تشخيص آمن للتفريق بين عطل الشاحن، البطارية، المنفذ ودائرة الشحن مع فحص مجاني واستلام بالكويت.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/ar/laptop-plugged-in-not-charging',
        ogImage: '/images/gallery/dell-vostro-laptop-motherboard-removed-fan-heatsink-chip-level-repair.webp',
        ogImageAlt: 'لوحة أم للابتوب Dell Vostro بعد فكها على طاولة الفحص في مختبر صيانة KCROC',
        ogImageWidth: 1400,
        ogImageHeight: 1400,
        locale: 'ar_KW',
        alternates: {
          'ar-KW': 'https://www.computerrepairkuwait.com/ar/laptop-plugged-in-not-charging',
          'en-KW': 'https://www.computerrepairkuwait.com/laptop-plugged-in-not-charging',
          'x-default': 'https://www.computerrepairkuwait.com/laptop-plugged-in-not-charging'
        },
        ogType: 'article',
        // The custom page emits TechArticle and FAQPage; SEOEngine supplies WebPage and BreadcrumbList.
        schemaTypes: ['WebPage', 'BreadcrumbList'],
        lastModified: '2026-11-07T00:00:00+03:00',
        breadcrumbs: [
          { name: 'الرئيسية', url: '/ar' },
          { name: 'اللابتوب متصل بالشاحن ولا يشحن', url: '/ar/laptop-plugged-in-not-charging' }
        ]
      },
      featuredImage: {
        ogImage: '/images/gallery/dell-vostro-laptop-motherboard-removed-fan-heatsink-chip-level-repair.webp',
        altText: 'لوحة أم للابتوب Dell Vostro بعد فكها على طاولة الفحص في مختبر صيانة KCROC'
      },
      relatedServiceIds: ['srv-battery', 'srv-charging-port', 'srv-motherboard', 'srv-laptop'],
      authorName: 'KCROC Engineering Team',
      datePublished: '2026-10-26',
      dateModified: '2026-11-07',
      articleSection: 'تشخيص أعطال اللابتوب والشحن'
    } as WebPageEntity,
    'page-ar-keyboard-replacement': {
      id: 'page-ar-keyboard-replacement', slug: 'ar/laptop-keyboard-replacement-kuwait', entityType: 'WebPage', isActive: true,
      title: 'تصليح وتبديل كيبورد اللابتوب في الكويت',
      description: 'تصليح وتبديل كيبورد اللابتوب في الكويت، مشاكل الأزرار والكتابة المكررة وتخطيط عربي/إنجليزي وأضرار السوائل، مع استلام مجاني وضمان 30 يومًا.',
      seo: {
        title: 'تبديل كيبورد اللابتوب بالكويت | عربي وإنجليزي | KCROC',
        description: 'كيبورد اللابتوب ما يشتغل أو يكرر الحروف؟ فحص وتبديل كيبورد Dell وHP وLenovo وASUS وMacBook بالكويت. أجرة من 10 د.ك + القطعة.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/ar/laptop-keyboard-replacement-kuwait',
        ogImage: '/images/laptop-keyboard-top-case-assembly-removal.webp',
        ogImageAlt: 'فك تجميعة لوحة مفاتيح اللابتوب لفحص الكيبورد والتوصيلات قبل الاستبدال',
        ogImageWidth: 800,
        ogImageHeight: 600,
        locale: 'ar_KW',
        alternates: {
          'ar-KW': 'https://www.computerrepairkuwait.com/ar/laptop-keyboard-replacement-kuwait',
          'en-KW': 'https://www.computerrepairkuwait.com/laptop-keyboard-replacement-kuwait',
          'x-default': 'https://www.computerrepairkuwait.com/laptop-keyboard-replacement-kuwait'
        },
        ogType: 'website',
        schemaTypes: ['WebPage', 'BreadcrumbList', 'FAQPage', 'Service', 'ImageObject'],
        lastModified: '2026-10-21T00:00:00+03:00',
        breadcrumbs: [
          { name: 'الرئيسية', url: '/' },
          { name: 'تصليح وتبديل كيبورد اللابتوب', url: '/ar/laptop-keyboard-replacement-kuwait' }
        ]
      },
      featuredImage: {
        ogImage: '/images/laptop-keyboard-top-case-assembly-removal.webp',
        altText: 'فك تجميعة لوحة مفاتيح اللابتوب لفحص الكيبورد والتوصيلات قبل الاستبدال'
      },
      relatedServiceIds: ['srv-keyboard', 'srv-laptop', 'srv-liquid-damage', 'srv-motherboard']
    } as WebPageEntity,
    'page-ar-liquid-damage-repair': {
      id: 'page-ar-liquid-damage-repair',
      slug: 'ar/laptop-liquid-damage-repair-kuwait',
      entityType: 'WebPage',
      isActive: true,
      title: 'تصليح اللابتوب بعد انسكاب ماي أو قهوة في الكويت',
      description: 'انكب ماي أو قهوة على اللابتوب أو MacBook؟ خلّه مطفي ولا تعيد تشغيله. فحص أضرار السوائل والتآكل وإصلاح المذربورد في مختبر KCROC بحولي، مع استلام مجاني وعرض سعر قبل الإصلاح.',
      seo: {
        title: 'تصليح لابتوب بعد انسكاب ماي أو قهوة بالكويت | KCROC',
        description: 'انكب ماي أو قهوة على اللابتوب؟ خلّه مطفي ولا تشغّله للتجربة. نفحص آثار السوائل والكيبورد والمذربورد في مختبر حولي، مع استلام مجاني بالكويت وعرض سعر قبل الإصلاح.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/ar/laptop-liquid-damage-repair-kuwait',
        ogImage: '/images/laptop-motherboard-diagnostic-bench-repair.webp',
        ogImageAlt: 'لابتوب مفتوح على طاولة فحص KCROC وتظهر داخله اللوحة الأم والبطارية والمكونات',
        ogImageWidth: 800,
        ogImageHeight: 600,
        locale: 'ar_KW',
        alternates: {
          'ar-KW': 'https://www.computerrepairkuwait.com/ar/laptop-liquid-damage-repair-kuwait',
          'en-KW': 'https://www.computerrepairkuwait.com/laptop-liquid-damage-repair-kuwait',
          'x-default': 'https://www.computerrepairkuwait.com/laptop-liquid-damage-repair-kuwait'
        },
        ogType: 'article',
        schemaTypes: ['WebPage', 'BreadcrumbList'],
        lastModified: '2026-11-07T00:00:00+03:00',
        breadcrumbs: [
          { name: 'الرئيسية', url: '/ar' },
          { name: 'الخدمات', url: '/ar/services' },
          { name: 'تصليح أضرار السوائل', url: '/ar/laptop-liquid-damage-repair-kuwait' }
        ]
      },
      featuredImage: {
        ogImage: '/images/laptop-motherboard-diagnostic-bench-repair.webp',
        altText: 'لابتوب مفتوح على طاولة فحص KCROC وتظهر داخله اللوحة الأم والبطارية والمكونات'
      },
      relatedServiceIds: ['srv-liquid-damage', 'srv-motherboard', 'srv-keyboard', 'srv-macbook', 'srv-battery']
    } as WebPageEntity,
    
    'srv-charging-port': {
      id: 'srv-charging-port',
      slug: 'laptop-charging-port-repair-kuwait',
      entityType: 'Service',
      isActive: true,
      title: 'Laptop Charging Port Repair Kuwait', primaryKeyword: "laptop charging port repair Kuwait", secondaryKeywords: ["laptop charging port replacement Kuwait","USB-C laptop charging repair","laptop DC jack repair"],
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
      title: 'Laptop Hinge & Chassis Repair Kuwait', primaryKeyword: "laptop hinge repair Kuwait", secondaryKeywords: ["broken laptop hinge repair","laptop chassis repair Kuwait","laptop hinge replacement"],
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
      relatedBrandIds: ['brand-dell', 'brand-hp', 'brand-lenovo', 'brand-msi', 'brand-asus', 'brand-acer'],
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
      seo: { title: 'Laptop Hinge Repair Kuwait | Chassis Fix | KCROC', description: 'Broken or stiff laptop hinge repair in Kuwait. Chassis reinforcement, hinge replacement and display-cable inspection with free pickup and 30-day warranty.', canonicalUrl: 'https://www.computerrepairkuwait.com/laptop-hinge-repair-kuwait', locale: 'en_KW', alternates: { 'en-KW': 'https://www.computerrepairkuwait.com/laptop-hinge-repair-kuwait', 'ar-KW': 'https://www.computerrepairkuwait.com/ar/laptop-hinge-repair-kuwait', 'x-default': 'https://www.computerrepairkuwait.com/laptop-hinge-repair-kuwait' }, ogType: 'article', schemaTypes: ['Service', 'FAQPage'], lastModified: '2026-11-02T00:00:00+03:00' },
      navigationPriority: 54,
      isFeatured: false,
      popular: false
    } as ServiceEntity,

    'srv-keyboard': {
      id: 'srv-keyboard', slug: 'laptop-keyboard-replacement-kuwait', entityType: 'Service', isActive: true,
      title: 'Laptop Keyboard Replacement Kuwait', primaryKeyword: "laptop keyboard replacement Kuwait", secondaryKeywords: ["laptop keyboard repair Kuwait","laptop keyboard not working repair","Arabic English laptop keyboard","laptop keyboard price Kuwait"], iconKey: 'laptop',
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
      title: 'MacBook Screen Replacement Kuwait', primaryKeyword: "MacBook screen replacement Kuwait", secondaryKeywords: ["MacBook display repair Kuwait","MacBook cracked screen repair","MacBook LCD replacement"], iconKey: 'monitor',
      shortDescription: 'MacBook Air and Pro screen replacement in Kuwait for cracked, black, flickering or lined displays, with exact-model checks and a clear quote before fitting. Supported Intel and Apple Silicon generations include M1–M5 where a compatible display assembly is available.',
      description: 'KCROC diagnoses MacBook Air and MacBook Pro display faults in Kuwait. For cracked glass, lines, flicker or a black screen, technicians inspect the panel, cable, connector and backlight path first; a complete display assembly is recommended only when the findings support it. When replacement is needed, we match a compatible assembly to the exact generation and provide an itemised final quote before work begins. Labour starts from 30 KWD; the display assembly is additional and varies by model. Initial diagnostics and pickup/delivery across Kuwait are free; repairs are completed at our Hawalli workshop with a 30-day warranty on covered work.',
      idealCustomer: 'MacBook Air and MacBook Pro owners in Kuwait with cracked glass, dead pixels, black display, flickering, lines, backlight problems or display damage after a drop.',
      deviceTypes: ['MacBook Air', 'MacBook Pro 13-inch', 'MacBook Pro 14-inch', 'MacBook Pro 16-inch', 'Intel and Apple Silicon MacBooks'],
      repairLevel: 'basic', estimatedTurnaround: 'Same day when a compatible display is in stock; otherwise timing depends on model and part availability',
      pricing: { startingFrom: 30, currency: 'KWD', quoteRequired: true, displayLabel: 'Labor from 30 KWD + display assembly' },
      coreFeatures: [
        'MacBook Air Display Replacement', 'MacBook Pro Retina Display Replacement', 'Model and Connector Matching',
        'Display Cable & Backlight Diagnosis', 'Dead Pixel and Uniformity Testing', 'True Tone / Display Function Checks Where Applicable',
        'Post-Repair Brightness and Colour Testing', 'Free Pick & Drop', '30-Day Warranty'
      ],
      advancedTechnicalSection: {
        heading: 'MacBook Display Assembly, True Tone & Flex-Cable Checks',
        intro: 'At our ESD-safe Hawalli workshop (Al Mullah Complex, Basement Shop 19), we verify the exact MacBook model number, generation, screen size and compatible assembly before quoting. These examples describe diagnostic paths, not a claim that every model has a known defect or supports every display function.',
        items: [
          {
            title: 'Exact A-number and generation matching (Intel & Apple Silicon M1–M5)',
            description: 'MacBook display assemblies vary by model year, screen size, connector and configuration. Representative A-numbers include MacBook Air A2337, A2681, A2941, A3113, A3114, A3240 and A3241, and MacBook Pro A2442, A2485, A2779, A2780, A2991, A2992, A3112, A3185, A3186, A3401, A3403, A3434, A3426, A3427, A3428 and A3429. We cross-check the A-number with the model identifier and part specification before sourcing; a serial number alone is not treated as a display-part specification.'
          },
          {
            title: 'Flex-cable, hinge-angle and backlight diagnosis',
            description: 'Selected 2016–2017 MacBook Pro models have been associated with uneven lower-edge backlighting (sometimes called the “stage light” effect) or image loss as the lid angle changes. Flex-cable wear is one possible cause, not an automatic diagnosis. We inspect the cable path, connectors, hinge movement and backlight circuit before recommending a panel or complete display assembly.'
          },
          {
            title: 'True Tone and ambient-light function checks',
            description: 'After fitting, we test True Tone and ambient-light response where the specific MacBook model and compatible assembly support those functions. Results can depend on generation, part compatibility and model-specific configuration, so we verify actual behavior instead of promising universal calibration or transfer.'
          },
          {
            title: 'Hinge alignment and lid-angle checks',
            description: 'A stiff, loose or misaligned hinge can strain the display assembly and flex cable. We inspect hinge and chassis alignment, look for abnormal cable tension and check image stability through a safe range of lid movement; any adjustment is based on the findings.'
          },
          {
            title: 'Retina and Liquid Retina XDR display testing',
            description: 'Where applicable, post-repair checks cover image stability, brightness, dead pixels and visible colour or uniformity issues. On compatible Liquid Retina XDR models we confirm the installed assembly against the exact model and test supported display functions before arranging return.'
          }
        ]
      },
      modelFaultMatrix: [
        {
          family: 'MacBook Air 13-inch (Intel and M1–M5)',
          models: 'Intel: A1932, A2179 · M1: A2337 · M2: A2681 · M3: A3113 · M4: A3240 · M5: A3449',
          diagnostics: 'Check the compatible Retina/Liquid Retina assembly for cracks, pressure damage, black display, flicker or lines. Confirm the exact year, model identifier, connector and part before quoting.'
        },
        {
          family: 'MacBook Air 15-inch (M2–M5)',
          models: 'M2: A2941 · M3: A3114 · M4: A3241 · M5: A3448',
          diagnostics: 'Match the 15-inch assembly to the generation and configuration. Check panel damage, image stability, brightness, display connector and any related chassis or hinge damage.'
        },
        {
          family: 'MacBook Pro 13-inch (Intel, M1 and M2)',
          models: 'Intel: A1706, A1708, A1989, A2159, A2251, A2289 · M1/M2: A2338',
          diagnostics: 'Inspect cracked panels, lines/flicker, connector or cable faults and the backlight path. Older Retina models can also show coating wear; the symptom and actual model determine the test path.'
        },
        {
          family: 'Selected Intel MacBook Pro models associated with Flexgate symptoms',
          models: 'Examples: 13-inch A1706 and 15-inch A1707 (selected 2016–2017 configurations)',
          diagnostics: 'Uneven lower-edge backlighting or image changes at certain lid angles can point to display-flex or backlight trouble, but other faults can look similar. We inspect the cable, hinge path and backlight before recommending a full assembly.'
        },
        {
          family: 'MacBook Pro 14-inch (M1–M5)',
          models: 'M1: A2442 · M2: A2779 · M3: A2918/A2992 · M4: A3112/A3185/A3401 · M5: A3434/A3426/A3427',
          diagnostics: 'Verify the exact chip, year and panel configuration before ordering. Checks can include cracked Liquid Retina XDR glass/panel, black display, lines, connector or camera-area ribbon inspection, brightness and pixel/uniformity testing where applicable.'
        },
        {
          family: 'MacBook Pro 16-inch (M1–M5 Pro/Max)',
          models: 'M1: A2485 · M2: A2780 · M3: A2991 · M4: A3186/A3403 · M5 Pro/Max: A3428/A3429',
          diagnostics: 'Confirm size, generation and compatible Liquid Retina XDR assembly. Inspect impact damage, image dropouts, display cable/connector and supported brightness, pixel and uniformity behavior after installation.'
        },
        {
          family: 'Older Retina MacBook Pro 13-inch and 15-inch',
          models: 'Examples: A1502 (13-inch) and A1398 (15-inch), with year/configuration verification',
          diagnostics: 'Check pressure cracks, coating wear on affected displays, cable/connectors and backlight symptoms before choosing repair or assembly replacement. These are possible faults, not defects assumed for every unit.'
        }
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
        { question: 'How much does MacBook screen replacement cost in Kuwait?', answer: 'Display-replacement labour starts from 30 KWD, with the compatible display assembly charged separately. The exact model, generation and assembly availability determine the final quote, which we confirm before installation. Prices for 13-, 14-, 15- and 16-inch models depend on the compatible panel and current availability; we confirm the total before ordering or fitting.' },
        { question: 'Do you replace MacBook Air and MacBook Pro screens?', answer: 'Yes. We service supported MacBook Air and MacBook Pro models after verifying the exact model identifier and compatible display assembly. Coverage includes supported Intel models and Apple Silicon generations from M1 through M5; we confirm the exact A-number, model identifier, size and part compatibility before sourcing.' },
        { question: 'Can a black or flickering MacBook screen be a cable problem?', answer: 'Yes. A black screen, flicker or lines can come from the panel, connection, cable, backlight path or another hardware fault. We inspect likely causes before quoting a full display replacement. On selected Intel-era MacBook Pro models, flex-cable wear is sometimes called Flexgate; uneven lower-edge lighting or image changes with lid angle are clues rather than a diagnosis.' },
        { question: 'Can you replace a MacBook screen the same day?', answer: 'Same-day completion may be possible when a compatible display is in stock and the diagnosis and workload allow it. We confirm expected timing after checking availability. It is not guaranteed before the exact model, compatible part stock, diagnosis and current workshop workload have been checked.' },
        { question: 'Will you access my files during screen replacement?', answer: 'Screen replacement is a hardware repair and does not normally require opening personal files. We do not browse stored files as part of this service; any additional step that could affect data is explained before proceeding. A routine display replacement does not require a system login or browsing documents; if an additional test needs system access, we discuss it first. Back up important data when the MacBook is usable, because no repair process can promise zero data risk.' },
        { question: 'Do you offer free pickup and delivery across Kuwait?', answer: 'Yes. Free pickup and delivery are available across Kuwait, and the repair is completed at our Hawalli workshop. Coverage includes all six Kuwait governorates, with pickup timing confirmed during booking for your specific area. Places such as Salmiya, Kuwait City and Fahaheel are service areas within governorates, not additional governorates.' },
        { question: 'What warranty applies to MacBook screen replacement?', answer: 'A 30-day warranty covers the completed repair, including the replacement display assembly and labour, according to the service terms. We confirm applicable coverage before repair. Your quote will identify the agreed work and applicable warranty conditions before installation begins.' }
      ],
      process: [
        { step: 1, title: 'Confirm Model', description: 'Identify the exact MacBook generation and display configuration.' },
        { step: 2, title: 'Inspect the Display Path', description: 'Check panel, cable, connectors, backlight and visible chassis damage.' },
        { step: 3, title: 'Quote the Correct Assembly', description: 'You receive the compatible part and price before installation.' },
        { step: 4, title: 'Install and Test', description: 'Fit the display assembly, verify image quality and test the completed MacBook.' }
      ],
      faqs: [
        { id: 'mac-screen-faq-1', title: 'How much does MacBook screen replacement cost in Kuwait?', answer: 'Display-replacement labour starts from 30 KWD, with the compatible display assembly charged separately. The exact model, generation and assembly availability determine the final quote, which we confirm before installation.' },
        { id: 'mac-screen-faq-2', title: 'Do you replace MacBook Air and MacBook Pro screens?', answer: 'Yes. We service supported MacBook Air and MacBook Pro models after verifying the exact model identifier and compatible display assembly.' },
        { id: 'mac-screen-faq-3', title: 'Can a black or flickering MacBook screen be a cable problem?', answer: 'Yes. A black screen, flicker or lines can come from the panel, connection, cable, backlight path or another hardware fault. We inspect likely causes before quoting a full display replacement.' },
        { id: 'mac-screen-faq-4', title: 'Can you replace a MacBook screen the same day?', answer: 'Same-day completion may be possible when a compatible display is in stock and the diagnosis and workload allow it. We confirm expected timing after checking availability.' },
        { id: 'mac-screen-faq-5', title: 'Will you access my files during screen replacement?', answer: 'Screen replacement is a hardware repair and does not normally require opening personal files. We do not browse stored files as part of this service; any additional step that could affect data is explained before proceeding.' },
        { id: 'mac-screen-faq-6', title: 'Do you offer free pickup and delivery across Kuwait?', answer: 'Yes. Free pickup and delivery are available across Kuwait, and the repair is completed at our Hawalli workshop.' },
        { id: 'mac-screen-faq-7', title: 'What warranty applies to MacBook screen replacement?', answer: 'A 30-day warranty covers the completed repair, including the replacement display assembly and labour, according to the service terms. We confirm applicable coverage before repair.' }
      ],
      relatedServiceIds: ['srv-macbook', 'srv-screen', 'srv-laptop'],
      relatedProblemIds: ['problem-cracked-screen', 'problem-black-screen'],
      relatedBrandIds: [],
      relatedResourcePaths: [
        { label: 'MacBook Battery Replacement Kuwait', path: '/macbook-battery-replacement-kuwait' },
        { label: 'How to Protect Your Laptop Screen', path: '/blog/how-to-protect-laptop-screen' }
      ],
      contentImages: [
        { src: IMAGES.macbook.diagnostics.src, alt: 'MacBook diagnostics before display repair in Kuwait', width: IMAGES.macbook.diagnostics.width, height: IMAGES.macbook.diagnostics.height, placement: 'hero', caption: 'MacBook inspection before display repair and model matching.' },
        { src: IMAGES.laptopHardware.laptopScreenAssemblyDisassemblyRepair.src, alt: 'Laptop display assembly service and screen repair', width: IMAGES.laptopHardware.laptopScreenAssemblyDisassemblyRepair.width, height: IMAGES.laptopHardware.laptopScreenAssemblyDisassemblyRepair.height, placement: 'process', caption: 'Display assembly inspection and reassembly during screen service.' }
      ],
      warranty: { duration: '30 Days', coverage: 'Replacement display assembly and labour for the completed repair', noFixNoFee: true },
      seo: { title: 'MacBook Screen Replacement Kuwait | From 30 KWD + Part | KCROC', description: 'MacBook Air/Pro screen replacement Kuwait: M1–M5 & Intel, cracked Retina, black screen, lines and True Tone checks. From 30 KWD + panel. Free pickup: 55301913.', canonicalUrl: 'https://www.computerrepairkuwait.com/macbook-screen-replacement-kuwait', locale: 'en_KW', alternates: { 'en-KW': 'https://www.computerrepairkuwait.com/macbook-screen-replacement-kuwait', 'ar-KW': 'https://www.computerrepairkuwait.com/ar/macbook-screen-replacement-kuwait', 'x-default': 'https://www.computerrepairkuwait.com/macbook-screen-replacement-kuwait' }, ogType: 'article', schemaTypes: ['Service', 'FAQPage'], lastModified: '2026-10-30T00:00:00+03:00' },
      navigationPriority: 68, isFeatured: true,
      popular: true
    } as ServiceEntity,

    'srv-gaming-laptop': {
      id: 'srv-gaming-laptop', slug: 'gaming-laptop-repair-kuwait', entityType: 'Service', isActive: true,
      title: 'Gaming Laptop Repair Kuwait', primaryKeyword: "gaming laptop repair Kuwait", secondaryKeywords: ["gaming laptop overheating repair","gaming laptop motherboard repair","gaming laptop screen repair"], iconKey: 'gaming',
      shortDescription: 'Gaming laptop repair in Kuwait for overheating, FPS drops, black screens, power and charging faults.',
      description: 'KCROC diagnoses and repairs gaming laptops in Kuwait. We start with a free diagnosis at our Hawalli workshop, trace the fault across cooling, power delivery, display, memory, firmware and the motherboard, and send you a written quote before any paid work. We work on ASUS ROG/TUF, Lenovo Legion, MSI, Acer Predator, HP OMEN, Dell G Series/Alienware and Razer Blade models. Free pickup and delivery across Kuwait, and every repair is tested under load before it comes back to you.',
      idealCustomer: 'Gamers, streamers, students and professionals whose gaming laptop runs hot, loses FPS, shuts down, shows no display, fails to charge or crashes.',
      deviceTypes: [
        'ASUS ROG (Strix, Zephyrus, Flow) and TUF Gaming laptops',
        'Lenovo Legion and LOQ laptops',
        'MSI Raider, Stealth, Vector, Katana and Thin laptops',
        'Acer Predator (Helios, Triton) and Nitro laptops',
        'HP OMEN and Victus laptops',
        'Dell G Series and Alienware laptops',
        'Razer Blade laptops'
      ],
      repairLevel: 'advanced', estimatedTurnaround: 'Usually 24–48 hours',
      coreFeatures: [
        'No-power and no-display diagnosis',
        'CPU and GPU thermal and clock testing under load',
        'Fan, heatsink and thermal-interface service',
        'Charging and power-circuit diagnosis',
        'GPU and VRAM stability testing',
        'Motherboard and VRM diagnostics',
        'BIOS and firmware recovery where repairable',
        'Keyboard, hinge and display repair',
        'Post-repair thermal and gaming-load testing'
      ],
      brands: ['ASUS ROG', 'ASUS TUF Gaming', 'Lenovo Legion', 'MSI Gaming', 'Acer Predator', 'HP OMEN', 'Dell G Series', 'Alienware', 'Razer Blade'],
      whyChooseUs: [
        { title: 'Gaming-specific diagnostics', description: 'We test the components that fail under sustained gaming load instead of treating every performance problem as a Windows issue.' },
        { title: 'Thermals and power, measured together', description: 'High temperatures and power faults can produce similar symptoms, so we measure both before recommending an expensive replacement.' },
        { title: 'Built for Kuwait’s heat', description: 'Gaming laptops have less thermal headroom here, so sustained-load cooling behaviour is part of every diagnosis.' },
        { title: 'Repair before replacement', description: 'When a board-level fault is technically repairable, we explain that option before defaulting to a complete motherboard replacement.' },
        { title: 'Free pickup and delivery, Kuwait-wide', description: 'We collect and return your laptop anywhere in Kuwait at no extra cost. The repair itself is done at our Hawalli workshop.' },
        { title: 'Clear quote, No Fix, No Fee', description: 'You receive the diagnosis and a written quote before paid work begins. If we cannot repair it, you do not pay, under our service terms.' }
      ],
      commonIssues: [
        { id: 'gaming-laptop-overheating', title: 'Overheating or Thermal Throttling', severity: 'high', description: 'Dust, fan wear, blocked heatsinks, a dried thermal interface or high ambient temperature can cut sustained gaming performance. We measure temperatures and clocks under load, then service the part of the cooling path the readings point to.' },
        { id: 'gaming-laptop-black-screen', title: 'Black Screen or No Display', severity: 'high', description: 'We separate the panel, display cable, GPU, memory, BIOS and motherboard before replacing display hardware.' },
        { id: 'gaming-laptop-no-power', title: 'Gaming Laptop Won’t Turn On', severity: 'critical', description: 'We test the adapter, charging input, battery, power rails and firmware in order before quoting a repair.' },
        { id: 'gaming-laptop-fps-drop', title: 'FPS Drops After Playing for a While', severity: 'high', description: 'A common sign of thermal throttling, but not proof of it. We confirm with CPU and GPU temperature and clock readings under load before recommending work.' },
        { id: 'gaming-laptop-charging', title: 'Not Charging or Charging Intermittently', severity: 'high', description: 'We separate the adapter, DC-in or USB-C path, battery and charging circuit before any part is replaced.' },
        { id: 'gaming-laptop-crash-shutdown', title: 'Sudden Shutdowns, Freezes or Crashes', severity: 'high', description: 'Overheating protection, a failing battery or charger, unstable memory, or a GPU or board fault can all cause restarts under load. We reproduce the fault and read temperatures and power behaviour before deciding which.' },
        { id: 'gaming-laptop-hinge-keyboard-display', title: 'Broken Hinge, Keyboard or Screen', severity: 'medium', description: 'Physical damage to the hinge, keyboard or display is repaired as part of the same service. We check for related cable or board damage before quoting.' }
      ],
      process: [
        { step: 1, title: 'Free Pickup and Logging', description: 'We collect your gaming laptop from home or office anywhere in Kuwait and record the exact model and reported symptoms.' },
        { step: 2, title: 'Measure the Fault', description: 'We choose thermal, power, display, memory and firmware checks to match the symptoms and read the results under load.' },
        { step: 3, title: 'Quote the Repair', description: 'You receive the diagnosis and a written quote before any paid work starts.' },
        { step: 4, title: 'Repair and Stress-Test', description: 'We complete the approved repair, then test under the workload relevant to the original fault before delivering the laptop back to you.' }
      ],
      faqs: [
        { id: 'gaming-laptop-faq-1', title: 'Can you fix gaming-laptop overheating and FPS drops?', answer: "Yes. We measure CPU/GPU temperatures and clock behaviour under a suitable sustained load, then check airflow, fan operation, heatsink condition and the existing thermal interface. When the model and cooling design support it, thermal service may use Honeywell PTM7950, manufacturer-style liquid-metal handling, or compatible VRAM/VRM putty. Material choice follows the exact design and findings; the goal is to address the measured cause, not promise a fixed temperature or FPS gain." },
        { id: 'gaming-laptop-faq-2', title: 'Do you repair gaming-laptop GPU and motherboard faults?', answer: "Yes. We assess GPU, VRAM, VRM and motherboard symptoms using the exact model and fault history. Windows Error Code 43, VIDEO_TDR_FAILURE, graphical artifacting, no-display and power faults can have several causes, including drivers or firmware as well as hardware. We test the likely path and offer component-level repair when the original board is technically repairable; a chip-level repair or full-board replacement is not assumed before diagnosis." },
        { id: 'gaming-laptop-faq-3', title: 'How much does gaming-laptop repair cost in Kuwait?', answer: "Initial hardware diagnosis is free. Published guide prices include laptop thermal service at 15–20 KWD, charging-port repair at 20–35 KWD, motherboard component repair at 25–60 KWD, and laptop screen replacement labour from 30 KWD plus the compatible panel. Advanced board work, parts and model-specific display costs can be higher. We confirm the fault and provide a written total quote before any paid work begins." },
        { id: 'gaming-laptop-faq-4', title: 'How long does gaming-laptop repair take?', answer: "The listed typical turnaround is usually 24–48 hours after pickup and diagnosis for many common repairs. Complex board faults, additional stress testing, a compatible high-refresh panel or a part that is not locally available can take longer. We confirm the realistic estimate after identifying the model, fault and required parts rather than promising same-day completion in advance." },
        { id: 'gaming-laptop-faq-5', title: 'Can you collect my gaming laptop from home in Kuwait?', answer: "Yes. Free pickup and return delivery are available across Kuwait, arranged for an agreed time at your home or office. The diagnosis, repair and post-repair testing take place at KCROC’s Hawalli workshop (Ibn Khaldoun Street, Al Mullah Complex, Basement Shop 19); the service areas are not separate walk-in branches." },
        { id: 'gaming-laptop-faq-6', title: 'Do you repair gaming-laptop charging and power problems?', answer: "Yes. We check the adapter and its output, the DC-in or model-supported USB-C Power Delivery path, connector condition, battery and motherboard charging/power circuitry. Gaming adapters can be rated at different wattages—commonly 180W, 230W, 280W or 330W depending on the model—so we verify the device and adapter before deciding whether the fault is the port, cable, adapter, charging controller or an input power component." },
        { id: 'gaming-laptop-faq-7', title: 'Should I just clean and repaste my gaming laptop?', answer: "Not automatically. We first measure temperatures and clocks and inspect dust, fan operation, heatsink contact and the existing thermal interface. Cleaning or a compatible thermal service may help when measurements point to restricted airflow or degraded interface material. If the cause is a failing fan, power limit, charger, VRM, GPU or firmware problem, a repaste alone will not fix it; we explain the findings before recommending work." },
        { id: 'gaming-laptop-faq-8', title: 'Do you repair gaming-laptop screens, hinges and keyboards?', answer: "Yes. We diagnose the panel, eDP cable/connector, hinges, chassis, keyboard and related board connections before quoting. Compatible 144Hz, 165Hz, 240Hz, higher-refresh or OLED panels depend on the exact model and part availability. Connector pin count, resolution, refresh rate and mounting differ between devices, so we confirm the original panel or model number before ordering a replacement." },
        { id: 'gaming-laptop-faq-9', title: 'What if my gaming laptop cannot be repaired?', answer: "We explain the diagnosis and repair options before paid work. If KCROC cannot complete the repair, the No Fix, No Fee policy applies under the stated service terms. Severe multi-layer board damage, unavailable parts or an uneconomical repair may mean we recommend alternatives rather than promise a repair that is not technically viable." },
        { id: 'gaming-laptop-faq-10', title: 'Is there a warranty, and what happens to my data?', answer: "Completed repairs carry a 30-day parts-and-labour warranty under KCROC’s service terms. Hardware diagnosis normally targets the reported fault rather than browsing personal files, and the storage drive is not normally part of thermal or power-circuit work. No repair process can guarantee absolute data safety, so back up important files when possible and tell us before service if the data is especially important." },
        { id: 'gaming-laptop-faq-11', title: 'Do you repair ASUS ROG, Lenovo Legion, MSI and Acer Predator laptops?', answer: "Yes. We assess ASUS ROG and TUF, Lenovo Legion and LOQ, MSI Raider/Stealth/Vector/Katana/Thin/Cyborg, Acer Predator and Nitro, HP OMEN and Victus, Dell G Series, Alienware and Razer Blade families. Send the exact model or product code and symptoms; CPU, GPU, display and board layouts vary within each family, so compatibility and repair options are confirmed for the individual machine." },
        { id: 'gaming-laptop-faq-12', title: 'Why does my gaming laptop get so hot in Kuwait?', answer: "High ambient temperature can leave a gaming laptop with less cooling headroom during sustained CPU/GPU loads, and accumulated dust can restrict airflow through the fan and heatsink. A hot chassis alone does not prove a fault or show that repasting is required. We check temperatures and clocks under load, fan response, heatsink and thermal-interface condition, and power behaviour before recommending cleaning, thermal service or electrical repair." },
        { id: 'gaming-laptop-faq-13', title: 'Do you repair gaming laptops for customers in Salmiya, Farwaniya, Jahra and other areas?', answer: "Yes. Free pickup and return delivery are available across Kuwait, including Salmiya, Farwaniya, Jahra, Ahmadi and other service areas, with timing arranged directly. All precision repair and stress testing are completed at the Hawalli workshop. A listed service area does not mean KCROC has a separate local branch there." },
      ],
      symptomLinks: [
        { label: 'Gaming laptop overheating', path: '/laptop-overheating-kuwait', description: 'Loud fans, high temperatures or performance that drops after a few minutes of play.' },
        { label: 'Black screen or no display', path: '/laptop-black-screen-kuwait', description: 'The laptop powers on but the screen stays black.' },
        { label: 'Won’t turn on', path: '/laptop-wont-turn-on', description: 'No lights, no fans, or a laptop that will not start.' },
        { label: 'Not charging', path: '/laptop-plugged-in-not-charging', description: 'Plugged in but the battery will not charge, or charging cuts in and out.' },
        { label: 'Crashes or freezes', path: '/computer-freezing-crashing-kuwait', description: 'Random restarts, freezes or crashes during games.' },
        { label: 'Broken or loose hinge', path: '/laptop-hinge-repair-kuwait', description: 'A stiff, loose or cracked hinge that strains the screen and chassis.' }
      ],
      technicalOverview: {
        heading: 'Gaming laptop repair in Kuwait: measure the fault before replacing parts',
        paragraphs: [
          'A gaming laptop packs a high-power CPU and GPU into a thin chassis, so heat and power problems often look alike. A frame-rate drop can be thermal throttling, a worn fan, a power-limit problem or a failing component; a black screen can be the panel, the cable, the GPU, memory or the board.',
          'We reproduce the symptom, then read temperatures, clocks, power delivery and memory behaviour under load. Kuwait’s heat leaves less thermal headroom, so sustained-load cooling is part of every diagnosis. You receive the findings and a written quote before any paid work begins.'
        ]
      },
      repairDecision: {
        heading: 'Where we start, by symptom',
        items: [
          { condition: 'Performance drops or fans run loud after a few minutes of play.', action: 'We measure CPU and GPU temperatures and clocks first, then inspect the fans, heatsink and thermal interfaces.' },
          { condition: 'The screen is black but the laptop seems to start.', action: 'We separate the panel, display cable, GPU, memory and firmware before recommending display hardware.' },
          { condition: 'The laptop will not turn on.', action: 'We test the adapter, charging input, battery, power rails and firmware in order before quoting.' },
          { condition: 'It will not charge, or charges intermittently.', action: 'We isolate the adapter, DC-in or USB-C path, battery and charging circuit before choosing a part.' },
          { condition: 'A board-level fault is suspected.', action: 'We assess component-level repair before defaulting to a full motherboard replacement.' }
        ]
      },
      inspectionChecklist: [
        'CPU and GPU temperatures and clocks under load',
        'Fan, heatsink and thermal-interface condition',
        'Adapter, DC-in or USB-C charging path and battery',
        'Power rails and VRM behaviour',
        'GPU and VRAM stability',
        'Memory and storage health',
        'Display panel and cable',
        'BIOS and firmware state'
      ],
      advancedTechnicalSection: {
        heading: 'Advanced Component-Level & Thermal Lab Specifications',
        intro: 'At our ESD-safe Hawalli workshop (Al Mullah Complex, Basement Shop 19), we use model-specific measurements to separate a cooling issue from a power, GPU, display or board fault. These are diagnostic and repair paths—not a promise that every model supports every material or that every component can be repaired.',
        items: [
          { title: 'PTM7950, liquid metal and VRAM/VRM thermal interfaces', description: 'We inspect the factory cooling design, heatsink contact, fan operation and existing thermal interface. Where compatible, the service may use Honeywell PTM7950 phase-change material, careful maintenance of a factory liquid-metal interface, or model-appropriate VRAM/VRM thermal putty. We do not apply one material universally; the laptop design and measurements determine the safe choice.' },
          { title: 'Main power rail, VRM and component-level diagnosis', description: 'For no-power symptoms, unexpected adapter shutdown or abnormal current draw, we inspect the adapter/input path and relevant power rails, MOSFETs, DrMOS stages, capacitors and controller circuits. Measurements and thermal imaging can help locate a fault when suitable. Component-level repair is offered only where board condition and test findings support a viable repair.' },
          { title: 'High-wattage DC-in, Slim-Tip and USB-C Power Delivery', description: 'We assess charging paths used by gaming laptops with adapters in ranges such as 180W, 230W, 280W and 330W. We inspect barrel DC jacks, Lenovo Slim-Tip connectors and USB-C PD only on models that support it, checking the adapter, connector, input pads and charging circuitry before quoting a port or board repair.' },
          { title: 'Discrete GPU, VRAM, MUX and firmware symptoms', description: 'We investigate RTX 30/40/50-series and other supported graphics configurations by model, including Error Code 43, VIDEO_TDR_FAILURE (nvlddmkm.sys), artifacting, MUX/Advanced Optimus display switching and black-screen symptoms. These symptoms can originate in software, firmware, memory, power or the display path; tests determine the next step instead of assuming the GPU chip is defective.' },
          { title: '144Hz–240Hz and other compatible gaming displays', description: 'We identify the original panel and check compatible eDP connector layout (including 30-pin or 40-pin designs), resolution, refresh rate, OLED option, cable and backlight path. Options such as 144Hz, 165Hz, 240Hz or higher-refresh panels are model-dependent and subject to compatible part availability. We confirm the exact panel and total price before ordering.' }
        ]
      },
      modelFaultMatrix: [
        { family: 'ASUS ROG / TUF Gaming', models: 'Strix G15/G16/G18, Scar, Zephyrus G14/G16, Flow, TUF A15/F15', diagnostics: 'Check liquid-metal contact only on designs that use it, CPU/GPU temperature spikes, adapter/input power, MUX or display-switching symptoms, fans and keyboard/RGB ribbon connections when symptoms point there.' },
        { family: 'Lenovo Legion / LOQ', models: 'Legion 5, 5 Pro, 7, Slim, Pro 7i and LOQ families', diagnostics: 'Assess supported high-wattage adapter and Slim-Tip input, connector looseness or heat, adapter recognition, no-power/charging symptoms and eDP/display-cable faults.' },
        { family: 'MSI Gaming', models: 'Raider GE, Stealth GS, Vector GP, Katana, Thin GF and Cyborg families', diagnostics: 'Inspect hinge mounts and chassis, fan bearings, display-cable movement, charging input and power rails according to the individual model and damage.' },
        { family: 'Acer Predator / Nitro', models: 'Predator Helios/Triton and Nitro 5/Nitro V families', diagnostics: 'Check thermal interface and fans, charging interruption under load, input/charging circuitry and GPU/VRAM stability before recommending parts.' },
        { family: 'HP OMEN / Victus', models: 'OMEN 16/17 and Victus 15/16 families', diagnostics: 'Assess heat-related sleep/resume or no-display symptoms, battery condition, hinge/chassis separation, fan operation and power delivery according to model.' },
        { family: 'Dell G Series / Alienware', models: 'G15/G16, Alienware m15/m16/m18 and x15/x16 families', diagnostics: 'Check adapter identification/sense path, input power, BIOS/UEFI state, fan and heatsink assembly, and the model-specific thermal interface.' },
        { family: 'Razer Blade', models: 'Blade 14/15/16/17/18 families', diagnostics: 'Inspect battery condition and any swelling, compact-board power rails, fans and vapor-chamber/heatsink cooling where fitted.' }
      ],
      relatedServiceIds: ['srv-gaming', 'srv-gaming-laptop-cleaning', 'srv-laptop', 'srv-screen', 'srv-battery', 'srv-motherboard'],
      relatedProblemIds: ['problem-overheating', 'problem-black-screen', 'problem-no-power', 'problem-not-charging', 'problem-freezing-crashing'],
      relatedBrandIds: ['brand-asus', 'brand-lenovo', 'brand-msi', 'brand-hp', 'brand-dell', 'brand-acer'],
      relatedLocationIds: ['loc-hawalli', 'loc-salmiya', 'loc-kuwait-city', 'loc-farwaniya', 'loc-jahra', 'loc-ahmadi', 'loc-fahaheel'],
      relatedResourcePaths: [
        { label: 'Why Is My Laptop Running Hot?', path: '/guides/why-is-my-laptop-so-hot' },
        { label: 'Safe CPU and GPU Temperatures in Kuwait', path: '/blog/laptop-temperatures-kuwait-safe-cpu-gpu-temperatures' },
        { label: 'BIOS & UEFI Recovery Guide', path: '/guides/bios-uefi-recovery-kuwait' }
      ],
      contentImages: [
        { src: IMAGES.gaming.msiWorkstation.src, alt: 'MSI gaming laptop and graphics hardware on a repair workstation', width: IMAGES.gaming.msiWorkstation.width, height: IMAGES.gaming.msiWorkstation.height, placement: 'hero', caption: 'Gaming laptop hardware on the KCROC diagnostic bench.' },
        { src: IMAGES.gaming.gamingLaptopFan.src, alt: 'Gaming laptop cooling and motherboard diagnostics', width: IMAGES.gaming.gamingLaptopFan.width, height: IMAGES.gaming.gamingLaptopFan.height, placement: 'commonIssues', caption: 'Gaming laptop cooling and motherboard inspection during diagnosis.' },
        { src: IMAGES.gaming.gamingOverheating.src, alt: 'Gaming laptop overheating repair in Kuwait', width: IMAGES.gaming.gamingOverheating.width, height: IMAGES.gaming.gamingOverheating.height, placement: 'process', caption: 'Thermal diagnostics for sustained gaming performance.' }
      ],
      warranty: { duration: '30 Days', coverage: 'Parts and labour for the completed gaming laptop repair', noFixNoFee: true },
      seo: { title: 'Gaming Laptop Repair Kuwait | ROG, Legion & MSI | KCROC', description: 'Gaming laptop repair Kuwait: overheating, FPS drops, PTM7950/liquid-metal thermal service, GPU/VRM, charging and 144–240Hz screens. Free diagnosis, Kuwait-wide pickup, 30-day warranty. 55301913.', canonicalUrl: 'https://www.computerrepairkuwait.com/gaming-laptop-repair-kuwait', ogImage: '/images/msi-gaming-laptop-and-gpu-repair-workstation.webp', ogImageAlt: 'MSI gaming laptop and graphics hardware on a repair workstation', ogImageWidth: 1200, ogImageHeight: 800, locale: 'en_KW', alternates: { 'en-KW': 'https://www.computerrepairkuwait.com/gaming-laptop-repair-kuwait', 'ar-KW': 'https://www.computerrepairkuwait.com/ar/gaming-laptop-repair-kuwait', 'x-default': 'https://www.computerrepairkuwait.com/gaming-laptop-repair-kuwait' }, ogType: 'website', schemaTypes: ['Service', 'FAQPage'], lastModified: '2026-10-29T00:00:00+03:00' },
      navigationPriority: 67, isFeatured: true,
      popular: true
    } as ServiceEntity,

    'srv-ssd-ram': {
      id: 'srv-ssd-ram', slug: 'ssd-ram-upgrade-kuwait', entityType: 'Service', isActive: true,
      title: 'SSD & RAM Upgrade Kuwait', primaryKeyword: "SSD RAM upgrade Kuwait", secondaryKeywords: ["laptop SSD upgrade Kuwait","laptop RAM upgrade Kuwait","NVMe SSD installation Kuwait","upgrade laptop HDD to SSD Kuwait","clone Windows to SSD Kuwait","speed up slow laptop Kuwait","computer speed upgrade Kuwait"], iconKey: 'cpu',
      shortDescription: 'Laptop and PC SSD, NVMe and RAM upgrades in Kuwait, with compatibility checks, Windows cloning, post-upgrade testing, free pickup and delivery.',
      description: 'A slow laptop is very often a storage or memory problem, not a software problem. If your laptop takes minutes to boot, shows 100% disk usage, freezes with a few browser tabs open or constantly runs short of memory, a compatible SSD or RAM upgrade usually makes a bigger difference than any software tweak. KCROC checks which part is actually the bottleneck, confirms exactly what your model supports (SATA or NVMe, M.2 length, DDR4 or DDR5, soldered or upgradeable memory), installs the upgrade and, where the drive is healthy, clones your existing Windows so you keep your apps, settings and files. Free pickup and delivery across Kuwait.',
      idealCustomer: 'Laptop and PC owners with slow boot times, 100% disk usage, an ageing mechanical hard drive, a full drive, frequent paging or too little RAM, on a machine that is otherwise worth keeping.',
      deviceTypes: ['Windows Laptops', 'Business Laptops', 'Everyday Laptops', 'Gaming Laptops', 'Desktop PCs', 'Microsoft Surface'],
      repairLevel: 'advanced', estimatedTurnaround: 'Same Day / 24 Hours',
            pricing: { startingFrom: 5, currency: 'KWD', quoteRequired: true, displayLabel: 'From 5 KWD + part' },
      pricingGuide: {
        heading: 'SSD & RAM Upgrade Pricing in Kuwait',
        intro: 'Installation labour for SSD and RAM upgrades starts from 5 KWD, with the SSD or memory module charged separately. The part depends on capacity, SATA or NVMe, and DDR generation, so we confirm compatible options and the full price on WhatsApp before any paid work.',
        note: 'Prices are guide figures, not a final quote. Installation labour is typically 5–10 KWD; the SSD or RAM module and any data migration are charged separately where needed. Eligible upgrades booked before 11:00 AM are often returned the same day, subject to part availability, drive size and workload.',
        rows: [
          {
            category: 'RAM upgrade',
            symptoms: 'Slow multitasking, heavy paging, browser lag or Windows running out of memory, on a laptop or PC with an upgradeable memory slot',
            startingPrice: 'From 5 KWD + RAM module',
            typicalTurnaround: 'Often same day when a compatible module is available.'
          },
          {
            category: 'SSD installation (SATA or NVMe)',
            symptoms: 'Slow boot, 100% disk usage on a hard drive, slow app loading, or a full or ageing drive',
            startingPrice: '5–10 KWD labour + SSD',
            typicalTurnaround: 'Often same day for a straightforward installation.'
          },
          {
            category: 'SSD upgrade with Windows cloning',
            symptoms: 'You want to keep Windows, programs, settings and files on the new, faster drive',
            startingPrice: 'Labour from 5 KWD; data migration quoted separately where needed',
            typicalTurnaround: 'Same day to 24 hours, depending on how much data is on the drive.'
          },
          {
            category: 'RAM and SSD together',
            symptoms: 'An older laptop that needs both more memory and a faster drive to feel usable again',
            startingPrice: 'Labour confirmed in your quote + parts',
            typicalTurnaround: 'Same day to 24 hours depending on parts and data size.'
          }
        ]
      },
      commercialAnswers: [
        { question: 'How much does an SSD or RAM upgrade cost in Kuwait?', answer: 'Installation labour starts from 5 KWD and is typically 5–10 KWD, with the SSD or RAM module charged separately. Send us your laptop model on WhatsApp and we confirm compatible options and the full price before any paid work.' },
        { question: 'Will an SSD or RAM upgrade actually fix my slow laptop?', answer: 'It depends on the bottleneck. A laptop that still has a mechanical hard drive almost always benefits from an SSD, while a laptop that runs out of memory benefits from RAM. If the real cause is heat, malware or a failing part, we tell you before you buy anything.' },
        { question: 'Can you upgrade my laptop on the same day?', answer: 'Often yes. Eligible upgrades booked before 11:00 AM are frequently returned the same day when a compatible part is available. Large data migrations can take until the next day.' },
        { question: 'Will I lose my files, programs or Windows?', answer: 'When your current drive is healthy we clone your existing Windows to the new SSD, so your programs, settings and files carry over. We still recommend backing up anything irreplaceable before any drive change.' },
        { question: 'What if my laptop cannot be upgraded?', answer: 'Some thin laptops and most recent MacBooks use soldered memory or storage. We check your exact model before you buy a part and tell you plainly if an upgrade is not possible.' },
        { question: 'Do you offer free pickup and delivery?', answer: 'Yes. Free pickup and delivery are available across Kuwait, and the upgrade is completed at our Hawalli workshop.' },
        { question: 'Is the upgrade covered by a warranty?', answer: 'The completed work is covered by our service warranty, and new SSDs and memory modules normally carry the manufacturer’s own warranty. We confirm the applicable cover before work starts.' }
      ],
      symptomLinks: [
        { label: 'Laptop running very slow', path: '/laptop-running-very-slow', description: 'Slow boot, lag and long load times, and how to tell a storage or memory bottleneck from other causes.' },
        { label: 'Freezing or random crashes', path: '/computer-freezing-crashing-kuwait', description: 'Freezes and crashes that can come from memory pressure, a failing drive or overheating.' },
        { label: 'Windows 11 100% disk usage', path: '/blog/windows-11-100-disk-usage-causes-solutions', description: 'Why the disk sits at 100%, safe checks to try, and when an SSD is the real fix.' },
        { label: 'Is 8GB of RAM still enough?', path: '/blog/why-8gb-ram-is-no-longer-enough-for-windows-11', description: 'How much memory Windows 11 needs for browsing, video calls and Office.' },
        { label: 'SSD not detected in Windows', path: '/guides/ssd-not-detected-windows-11', description: 'What to check when a new or existing SSD does not appear in Windows setup or File Explorer.' }
      ],
      coreFeatures: ['NVMe SSD Upgrade', 'SATA SSD Upgrade', 'RAM Upgrade', 'Memory Compatibility Check', 'Storage Health Check', 'System Cloning Where Suitable', 'Boot Verification', 'Performance Testing', 'Free Pick & Drop', '30-Day Warranty'],
      brands: ['Dell', 'HP', 'Lenovo', 'ASUS', 'Acer', 'MSI', 'Microsoft Surface'],
      whyChooseUs: [
        { title: 'Compatibility First', description: 'We verify interface (SATA or NVMe), M.2 length, memory generation, slot count, capacity limits and model-specific constraints before recommending hardware, so you never buy the wrong part.' },
        { title: 'We Tell You When an Upgrade Will Not Help', description: 'If the slowdown comes from heat, malware, a failing battery or a soldered-memory limit, we say so instead of selling you a part you do not need.' },
        { title: 'Keep Your Existing Windows', description: 'Healthy systems are cloned to the new SSD so applications, settings and files do not need to be rebuilt from scratch. The boot is verified before return.' },
        { title: 'Encryption and Data Safety', description: 'Many Windows 11 laptops encrypt the drive automatically. We secure the recovery key before changing drives so you are never locked out of your own data.' },
        { title: 'Measure the Bottleneck', description: 'We check storage health and memory pressure so you upgrade the part that is actually limiting the system.' },
        { title: 'Post-Upgrade Testing', description: 'The machine is boot-tested and checked for storage health, memory recognition and stability under load before return.' }
      ],
      commonIssues: [
        { id: 'slow-hard-drive', title: 'Laptop Still Uses a Mechanical Hard Drive', severity: 'medium', description: 'An SSD upgrade can dramatically reduce boot and application load times when the existing HDD is the main storage bottleneck.' },
        { id: 'disk-100-percent', title: 'Windows Shows 100% Disk Usage', severity: 'medium', description: 'A hard drive pinned at 100% makes the whole laptop feel frozen. On older laptops an SSD is often the lasting fix, once software causes have been ruled out.' },
        { id: 'low-ram', title: 'Windows Runs Out of Memory', severity: 'medium', description: 'Heavy paging, browser workloads and multitasking can expose a RAM limitation even when the laptop is otherwise healthy.' },
        { id: 'storage-full', title: 'Storage Is Almost Full', severity: 'low', description: 'A nearly full drive slows updates and everyday use. A larger SSD, with your system cloned across, gives you room without starting again.' },
        { id: 'storage-health', title: 'Storage Health Is Declining', severity: 'high', description: 'A failing drive should be assessed before an upgrade so the replacement plan protects the system and existing data as far as possible.' },
        { id: 'slow-laptop', title: 'Laptop Is Slow Despite Being Clean', severity: 'medium', description: 'We separate storage, memory, thermal, startup and software bottlenecks before recommending an upgrade.' }
      ],
      process: [
        { step: 1, title: 'Free Pickup', description: 'We collect the laptop or PC across Kuwait, or you can send the model on WhatsApp for a first estimate.' },
        { step: 2, title: 'Hardware Assessment', description: 'We check storage health, RAM configuration, SSD interface, memory slots and supported upgrade limits for your exact model.' },
        { step: 3, title: 'Upgrade Plan', description: 'You receive compatible SSD or RAM options and a clear quote before installation.' },
        { step: 4, title: 'Install or Clone', description: 'The selected hardware is installed, the BitLocker or device-encryption key is secured where it applies, and the existing system is cloned where the configuration supports it.' },
        { step: 5, title: 'Boot & Stability Test', description: 'Windows, storage health, memory recognition and basic workload stability are verified.' },
        { step: 6, title: 'Return with Warranty', description: 'The upgraded device is returned with a 30-day parts and labour warranty on the completed work.' }
      ],
      faqs: [
        { id: 'upgrade-faq-1', title: 'Will an SSD make my laptop faster?', answer: 'If the current drive is the main bottleneck, yes. A laptop that still uses a mechanical hard drive usually sees the biggest improvement in boot time and app loading. We check the system first so you do not buy an SSD when another component is responsible for the slowdown.' },
        { id: 'upgrade-faq-2', title: 'How much does an SSD or RAM upgrade cost in Kuwait?', answer: 'Installation labour starts from 5 KWD and is typically 5–10 KWD, with the SSD or RAM module charged separately. The part price depends on capacity, SATA or NVMe, and DDR generation, so we confirm the full price on WhatsApp once we know your laptop model.' },
        { id: 'upgrade-faq-3', title: 'Can you upgrade laptop RAM?', answer: 'Yes, when the laptop has upgradeable memory. We verify the exact model, memory generation (DDR3, DDR4 or DDR5), slot count and supported capacity before recommending a module.' },
        { id: 'upgrade-faq-4', title: 'Can every laptop have its RAM upgraded?', answer: 'No. Some laptops use soldered memory, some have one slot plus soldered memory, and others have one or two SO-DIMM slots. Most recent MacBooks have soldered memory. We check the exact model before recommending an upgrade.' },
        { id: 'upgrade-faq-5', title: 'Is 8GB of RAM enough for Windows 11?', answer: 'For light use such as documents and a few browser tabs, 8GB can work. For many tabs, video calls and Office apps together, 16GB is a more comfortable minimum, and 32GB suits editing, development and heavy multitasking.' },
        { id: 'upgrade-faq-6', title: 'What is the difference between SATA and NVMe SSDs?', answer: 'SATA SSDs use the older SATA interface and top out at roughly 550 MB/s, while NVMe SSDs connect over PCIe and are several times faster. They can also have different physical formats. We identify which your laptop supports before selecting the replacement drive.' },
        { id: 'upgrade-faq-7', title: 'Can you clone my existing Windows to the new SSD?', answer: 'Often yes, when the existing drive is healthy and the hardware supports cloning. Your programs, settings and files carry over, and we verify that the cloned system boots correctly and check the new drive afterward.' },
        { id: 'upgrade-faq-8', title: 'Will I lose my files when upgrading to an SSD?', answer: 'Not when we clone a healthy drive, because your files move across with Windows. We still recommend a backup of anything irreplaceable before any drive change, and a failing source drive may need a different migration approach.' },
        { id: 'upgrade-faq-9', title: 'What if my laptop uses BitLocker or device encryption?', answer: 'Many Windows 11 laptops encrypt the drive automatically. We secure the recovery key before changing drives so the new SSD boots without locking you out of your data.' },
        { id: 'upgrade-faq-10', title: 'Can I mix different RAM sizes or brands?', answer: 'Often yes, but the modules run at the speed of the slowest one and dual-channel mode may not be possible. Two matched modules usually perform better than one, especially on laptops with integrated graphics, so we match modules where we can.' },
        { id: 'upgrade-faq-11', title: 'Can you upgrade gaming laptops and desktop PCs?', answer: 'Yes. Many gaming laptops and desktops have a second M.2 slot or extra memory slots, so you can add fast storage or more RAM without removing your existing drive.' },
        { id: 'upgrade-faq-12', title: 'Can you upgrade a MacBook SSD or RAM?', answer: 'Only some older MacBook models allow storage or memory upgrades, and most recent models use soldered components that cannot be changed. Send us the exact model and we tell you what is possible.' },
        { id: 'upgrade-faq-13', title: 'How long does an SSD or RAM upgrade take?', answer: 'A straightforward RAM or SSD installation is often completed the same day when booked before 11:00 AM and a compatible part is available. An SSD upgrade with a large Windows clone can take until the next day.' }
      ],
      relatedServiceIds: ['srv-laptop', 'srv-gaming-laptop', 'srv-gaming', 'srv-desktop-pc', 'srv-gaming-laptop-cleaning'],
      relatedProblemIds: ['problem-slow', 'problem-freezing-crashing'],
      relatedBrandIds: ['brand-dell', 'brand-hp', 'brand-lenovo', 'brand-asus', 'brand-acer', 'brand-msi'],
      relatedResourcePaths: [
        { label: 'Windows 11 100% Disk Usage: Causes & Solutions', path: '/blog/windows-11-100-disk-usage-causes-solutions' },
        { label: 'Why 8GB RAM Is No Longer Enough', path: '/blog/why-8gb-ram-is-no-longer-enough-for-windows-11' },
        { label: 'Why Is My Laptop So Slow in 2026?', path: '/blog/why-is-my-laptop-so-slow-2026' },
        { label: 'SSD Not Detected in Windows 11', path: '/guides/ssd-not-detected-windows-11' },
        { label: 'Laptop Buying Guide 2026', path: '/blog/laptop-buying-guide-kuwait-2026' },
        { label: 'KCROC Repair Pricing', path: '/pricing' },
      ],
      technicalOverview: {
        heading: 'SSD and RAM Upgrades Start With Compatibility',
        paragraphs: [
          'An upgrade only helps when it matches the machine and the actual bottleneck. We identify whether the laptop uses SATA or NVMe storage, check the physical format and supported capacity, and determine whether RAM is replaceable, partially soldered or fully soldered. Buying the wrong drive or memory is the most common upgrade mistake, which is why we check before you buy.',
          'Storage: SATA SSDs (2.5-inch or M.2 SATA) are the right choice for older laptops with a 2.5-inch bay. NVMe SSDs use the M.2 PCIe slot and are several times faster. M.2 2280 is the most common length, while slim laptops, Microsoft Surface models and handheld PCs often use the shorter 2230 or 2242. A faster PCIe Gen4 or Gen5 drive still works in an older slot but runs at the slot’s speed, so we do not charge you extra for speed your laptop cannot use.',
          'Memory: laptops use SO-DIMM modules, and the generation (DDR3/DDR3L, DDR4 or DDR5) is physically keyed, so modules cannot be mixed between generations. We confirm the number of slots, the maximum supported capacity and whether some or all of the memory is soldered to the motherboard. Two matched modules usually run in dual-channel mode, which helps performance, particularly on integrated graphics.',
          'For storage migrations, we assess the health of the existing drive before cloning. A failing source drive may need a different migration strategy, while a healthy system can often be moved to the new SSD with its Windows installation and applications intact. On Windows 11 laptops that use BitLocker or device encryption, we secure the recovery key before any drive change.',
          'Kuwait’s heat and dust put extra stress on laptops. A hard drive under thermal stress is slower and more likely to fail, and a laptop running at the limit of its memory runs hotter. When a laptop is already open for an upgrade we can also check the fans and thermal paste, and our cleaning and thermal service covers both.'
        ]
      },
      repairDecision: {
        heading: 'Which Upgrade Makes More Sense?',
        items: [
          { condition: 'Mechanical HDD is the main bottleneck', action: 'Prioritize a compatible SSD. It is usually the single biggest improvement to boot time and responsiveness on an older laptop.' },
          { condition: 'Windows shows 100% disk usage on an HDD', action: 'Rule out software causes first, then move to an SSD, which removes the slow-drive bottleneck rather than hiding it.' },
          { condition: 'Memory pressure causes heavy paging', action: 'Add compatible RAM when the laptop supports a memory upgrade. 16GB is a comfortable level for most Windows 11 users.' },
          { condition: 'Laptop already has an SSD and still feels slow', action: 'Check RAM, heat, startup load and battery health before spending money on storage.' },
          { condition: 'RAM is soldered or storage is restricted', action: 'Confirm the platform limits before spending money on incompatible upgrade hardware. We check your exact model for free.' },
          { condition: 'Existing drive is unhealthy', action: 'Prioritize a safe migration plan rather than blindly cloning a failing disk.' }
        ]
      },
      inspectionChecklist: ['Check storage health', 'Identify SSD interface (SATA or NVMe)', 'Confirm M.2 length and slot type', 'Check RAM type and generation', 'Count memory slots and check for soldered RAM', 'Confirm maximum supported capacity', 'Check BitLocker or device encryption', 'Assess cloning suitability', 'Verify boot and stability after upgrade', 'Confirm memory is recognised at the right speed'],
      performanceOutcomes: { disclaimer: 'Actual gains depend on the original hardware and the bottleneck identified during diagnosis.', items: [
        { metric: 'Boot and app loading', outcome: 'Replacing a mechanical hard drive with an SSD can substantially reduce storage-related boot and application loading delays, because even a SATA SSD is several times faster than a laptop hard drive in everyday use.' },
        { metric: 'Storage speed', outcome: 'A compatible NVMe SSD can be several times faster again than a SATA SSD, within the limits of your laptop’s M.2 slot.' },
        { metric: 'Multitasking', outcome: 'Additional compatible RAM can reduce paging when memory pressure is the actual bottleneck, so browsers, video calls and Office apps stay responsive together.' },
        { metric: 'Storage space', outcome: 'A larger SSD, with your Windows cloned across, gives you room for files and updates without a fresh install.' }
      ] },
      contentImages: [
        { src: '/images/gallery/laptop-ram-ssd-wifi-card-spare-parts-inventory-kuwait.webp', alt: 'Spare RAM modules, SSDs and Wi-Fi cards in stock at the KCROC repair shop in Kuwait for laptop upgrades', width: 1200, height: 1200, placement: 'hero', caption: 'RAM, SSD and Wi-Fi card stock on the KCROC bench for laptop upgrades in Kuwait.' },
        { src: IMAGES.upgrades.ssdM2Install.src, alt: IMAGES.upgrades.ssdM2Install.alt, width: IMAGES.upgrades.ssdM2Install.width, height: IMAGES.upgrades.ssdM2Install.height, placement: 'commonIssues', caption: 'Installing an M.2 NVMe SSD as part of a laptop performance upgrade.' },
        { src: IMAGES.upgrades.acerLaptopMotherboardRamHeatsink.src, alt: IMAGES.upgrades.acerLaptopMotherboardRamHeatsink.alt, width: IMAGES.upgrades.acerLaptopMotherboardRamHeatsink.width, height: IMAGES.upgrades.acerLaptopMotherboardRamHeatsink.height, placement: 'coreFeatures', caption: 'Laptop motherboard with accessible RAM and storage components inspected for upgrade compatibility.' },
        { src: IMAGES.upgrades.ssdMicron.src, alt: IMAGES.upgrades.ssdMicron.alt, width: IMAGES.upgrades.ssdMicron.width, height: IMAGES.upgrades.ssdMicron.height, placement: 'process', caption: 'M.2 NVMe storage selected and installed after compatibility checks.' }
      ],
      warranty: { duration: '30 Days', coverage: 'Parts and labour for the completed SSD/RAM installation', noFixNoFee: true },
      seo: { title: 'Laptop SSD & RAM Upgrade Kuwait | Free Pickup | KCROC', description: 'Laptop SSD, NVMe and RAM upgrades in Kuwait. We check compatibility, clone Windows and test the result. Labour from 5 KWD + part. Free pickup and delivery.', canonicalUrl: 'https://www.computerrepairkuwait.com/ssd-ram-upgrade-kuwait', locale: 'en_KW', alternates: { 'en-KW': 'https://www.computerrepairkuwait.com/ssd-ram-upgrade-kuwait', 'ar-KW': 'https://www.computerrepairkuwait.com/ar/ssd-ram-upgrade-kuwait', 'x-default': 'https://www.computerrepairkuwait.com/ssd-ram-upgrade-kuwait' }, ogType: 'article', schemaTypes: ['Service', 'FAQPage'], lastModified: '2026-10-29T00:00:00+03:00' },
      navigationPriority: 52, isFeatured: false, popular: false
    } as ServiceEntity,

    'srv-liquid-damage': {
      id: 'srv-liquid-damage', slug: 'laptop-liquid-damage-repair-kuwait', entityType: 'Service', isActive: true,
      title: 'Laptop Liquid Damage Repair Kuwait', primaryKeyword: "laptop liquid damage repair Kuwait", secondaryKeywords: ["water damaged laptop repair","MacBook liquid damage repair Kuwait","laptop motherboard corrosion repair"], iconKey: 'cpu',
      shortDescription: 'We fix the board. We do not just swap it — liquid damage is assessed for component-level repair wherever technically viable.',
      description: 'Water, coffee, karak, juice and other spills can affect laptop keyboards, connectors and motherboard circuits, even after visible moisture has dried. At KCROC\'s Hawalli repair lab, we isolate power, inspect the affected areas, assess corrosion and clean contamination using a method suited to the board. Where testing identifies a repairable fault, we work at component level and use micro-soldering where required rather than automatically recommending a full motherboard replacement. Free initial diagnosis, a quote before paid work, free pickup across Kuwait and a 30-day warranty on completed repair work.',
      idealCustomer: 'Laptop and MacBook owners dealing with a recent or earlier spill, sticky or unresponsive keys, charging trouble, a black screen, or a device that stopped working after liquid exposure.',
      commercialAnswers: [
        { question: 'What does the 35 KWD starting price mean?', answer: '35 KWD is the published starting price, not a fixed total for every spill. KCROC\'s pricing guide lists liquid-damage repair at 35–90+ KWD. The final quote depends on the device, affected area, corrosion and repair required. Initial diagnostics are free, and we provide the quote for approval before paid repair work begins.' },
        { question: 'Will you replace the whole motherboard?', answer: 'Not automatically. We inspect the original board and consider component-level repair or micro-soldering where the fault and board condition make it technically viable. If the damage is too extensive, we explain the findings and available repair options before paid work.' },
        { question: 'Will my files and data be guaranteed?', answer: 'No. Data access depends on the device design and the extent of damage to the board and storage. We prioritise a repair path that retains the original hardware where practical, but cannot guarantee data access or preservation. Keep a spilled laptop switched off; do not power it on to try to make a backup.' },
        { question: 'How long does liquid-damage repair take?', answer: 'The published typical turnaround is 24–72 hours. The actual time depends on the damage found, repair complexity and any required parts. We confirm the expected timing after inspection.' },
      ],
      deviceTypes: ['Windows Laptops', 'MacBook Air', 'MacBook Pro', 'Gaming Laptops', 'Business Laptops'],
      repairLevel: 'component-level', estimatedTurnaround: '24-72 Hours',
            pricing: { startingFrom: 35, currency: 'KWD', quoteRequired: true, displayLabel: 'From 35 KWD' },
      coreFeatures: ['Immediate Power Isolation', 'Liquid Damage Inspection', 'Corrosion Mapping', 'Board Cleaning', 'Connector Inspection', 'Component-Level Diagnostics', 'Micro-Soldering Where Required', 'Post-Repair Stress Testing', 'Free Pick & Drop', '30-Day Warranty'],
      brands: ['Dell', 'HP', 'Lenovo', 'ASUS', 'Acer', 'MSI', 'MacBook'],
      whyChooseUs: [
        { title: 'Power-Off First', description: 'We isolate the power sources before inspecting the affected board, connectors and keyboard path.' },
        { title: 'Corrosion Assessment', description: 'We inspect the affected areas for residue, corrosion and damaged traces or components; a dry exterior does not prove the inside is clean.' },
        { title: 'Original Board Where Viable', description: 'We assess whether the original motherboard can be repaired at component level rather than automatically defaulting to a full board replacement.' },
        { title: 'Clear Quote Before Paid Work', description: 'We explain the inspection findings and provide a repair quote for your approval before carrying out paid work.' }
      ],
      commonIssues: [
        { id: 'spill-no-power', title: 'Laptop Died After a Spill', severity: 'critical', description: 'Power should be isolated immediately. The board is then inspected for shorts, corrosion and damaged power components.' },
        { id: 'spill-keyboard', title: 'Keyboard Stopped Working After Liquid', severity: 'high', description: 'The keyboard and the electronics underneath it are checked because liquid can travel beyond the visible spill area.' },
        { id: 'liquid-black-screen', title: 'Laptop Powers On but Screen Is Black', severity: 'critical', description: 'Liquid can affect display power, backlight circuits, connectors or the motherboard even when fans still spin.' },
        { id: 'corrosion-later', title: 'Laptop Failed Days After a Spill', severity: 'high', description: 'Delayed corrosion can turn a minor-looking spill into an intermittent or complete hardware failure.' }
      ],
      process: [
        { step: 1, title: 'Free Pickup Across Kuwait', description: 'We arrange collection from your home or office. Keep the laptop switched off and disconnected from its charger while it awaits pickup.' },
        { step: 2, title: 'Power Isolation & Inspection', description: 'Our technician isolates the battery and external power before opening the device and checking the affected areas.' },
        { step: 3, title: 'Corrosion & Circuit Assessment', description: 'We inspect the board, connectors and relevant power circuits to understand where liquid or residue has affected the device.' },
        { step: 4, title: 'Board Cleaning', description: 'The cleaning method is selected for the board and components. Ultrasonic cleaning is used only when the bare-board condition and preparation make it appropriate.' },
        { step: 5, title: 'Component-Level Repair & Testing', description: 'Where the fault is repairable, affected components, traces or connectors are addressed at board level; the functions affected by the spill are then tested.' },
        { step: 6, title: 'Return with 30-Day Warranty', description: 'After the completed repair passes its functional checks, we arrange return delivery with a 30-day warranty on the covered repair work.' }
      ],
      faqs: [
        { id: 'liquid-faq-1', title: 'Can a laptop be repaired after a coffee or karak spill?', answer: 'Often yes. The outcome depends on where the liquid entered, how long it remained inside and whether corrosion or component damage has occurred. We inspect the affected areas before recommending a repair.' },
        { id: 'liquid-faq-2', title: 'Do you repair liquid-damaged MacBooks?', answer: 'Yes. We inspect the logic board and affected circuits and consider component-level repair where the device condition makes it technically viable.' },
        { id: 'liquid-faq-3', title: 'What happens if the motherboard cannot be repaired?', answer: 'We explain the inspection findings before any paid repair work is approved. KCROC\'s No Fix, No Fee policy applies according to the terms confirmed when you book.' },
        { id: 'liquid-faq-4', title: 'Do you offer free pickup for liquid-damaged laptops?', answer: 'Yes. Free pickup and delivery can be arranged across Kuwait. Keep the laptop switched off and unplugged while waiting for collection.' },
        { id: 'liquid-faq-5', title: 'What do you test before returning the laptop?', answer: 'We check functions affected by the spill, which may include charging, display, keyboard, storage and thermals, according to the device and repair performed.' },
        { id: 'liquid-faq-6', title: 'Why can a laptop fail days after a spill?', answer: 'Liquid residue and corrosion can continue affecting connectors, traces and components after visible moisture has disappeared. A device that appears dry is not necessarily safe to power on.' },
      ],
      relatedServiceIds: ['srv-motherboard', 'srv-keyboard', 'srv-macbook'],
      relatedProblemIds: ['problem-liquid-spill', 'problem-no-power', 'problem-black-screen'],
      relatedBrandIds: ['brand-dell', 'brand-hp', 'brand-lenovo', 'brand-msi'],
      relatedLocationIds: ['loc-hawalli', 'loc-salmiya', 'loc-kuwait-city', 'loc-farwaniya', 'loc-jahra', 'loc-ahmadi'],
      relatedResourcePaths: [
        { label: 'Laptop Repair Guide', path: '/laptop-repair-kuwait' },
        { label: 'MacBook Repair', path: '/macbook-repair-kuwait' },
      ],
      technicalOverview: {
        heading: 'What Happens Inside a Liquid-Damaged Laptop',
        paragraphs: [
          'A spill can leave residue beneath keyboard layers, around ribbon connectors and on motherboard circuits. This is why a laptop that looks dry — or appears to start once — may still need inspection before it is powered again. The affected area depends on the liquid, its entry point, how long it remained inside and whether the laptop was powered.',
          'KCROC isolates power, inspects the affected areas and maps contamination before choosing a cleaning method suited to the board. Ultrasonic cleaning is used only when the board has been stripped and prepared appropriately. If testing identifies a repairable fault, component-level repair or micro-soldering may be considered. Repairability and data access depend on the actual damage and cannot be guaranteed before inspection.'
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
        {
          src: IMAGES.laptopHardware.laptopMotherboardDiagnosticBenchRepair.src,
          alt: IMAGES.laptopHardware.laptopMotherboardDiagnosticBenchRepair.alt,
          width: IMAGES.laptopHardware.laptopMotherboardDiagnosticBenchRepair.width,
          height: IMAGES.laptopHardware.laptopMotherboardDiagnosticBenchRepair.height,
          placement: 'hero',
          caption: 'A KCROC motherboard diagnostic bench image. The inspection findings determine whether board cleaning or component-level repair is appropriate.'
        },
        { src: IMAGES.laptopHardware.laptopOpenRepairBench.src, alt: IMAGES.laptopHardware.laptopOpenRepairBench.alt, width: IMAGES.laptopHardware.laptopOpenRepairBench.width, height: IMAGES.laptopHardware.laptopOpenRepairBench.height, placement: 'commonIssues', caption: 'An opened laptop prepared for internal hardware inspection.' },
        { src: IMAGES.laptopHardware.dellTeardown.src, alt: IMAGES.laptopHardware.dellTeardown.alt, width: IMAGES.laptopHardware.dellTeardown.width, height: IMAGES.laptopHardware.dellTeardown.height, placement: 'coreFeatures', caption: 'Internal laptop hardware exposed for motherboard and connector inspection.' },
        { src: IMAGES.laptopHardware.dellRepair.src, alt: IMAGES.laptopHardware.dellRepair.alt, width: IMAGES.laptopHardware.dellRepair.width, height: IMAGES.laptopHardware.dellRepair.height, placement: 'process', caption: 'Component-level board repair following fault isolation.' }
      ],
      warranty: { duration: '30 Days', coverage: 'Parts and labour for components repaired or replaced during the liquid-damage service', noFixNoFee: true },
      seo: { title: 'Laptop Liquid Damage Repair Kuwait | KCROC', description: 'Laptop and MacBook liquid damage repair in Kuwait from 35 KWD. Free diagnosis and pickup, corrosion assessment, board cleaning and micro-soldering where required. Quote before paid work.', canonicalUrl: 'https://www.computerrepairkuwait.com/laptop-liquid-damage-repair-kuwait', locale: 'en_KW', alternates: { 'en-KW': 'https://www.computerrepairkuwait.com/laptop-liquid-damage-repair-kuwait', 'ar-KW': 'https://www.computerrepairkuwait.com/ar/laptop-liquid-damage-repair-kuwait', 'x-default': 'https://www.computerrepairkuwait.com/laptop-liquid-damage-repair-kuwait' }, ogType: 'article', schemaTypes: ['Service', 'FAQPage'], lastModified: '2026-11-04T00:00:00+03:00' },
      navigationPriority: 51, isFeatured: false, popular: false
    } as ServiceEntity,

    'srv-macbook': { 
      id: 'srv-macbook', 
      slug: 'macbook-repair-kuwait', 
      entityType: 'Service', 
      isActive: true, 
      title: 'MacBook Repair Kuwait', primaryKeyword: "MacBook repair Kuwait", secondaryKeywords: ["MacBook Air repair Kuwait","MacBook Pro repair Kuwait","MacBook motherboard repair Kuwait","MacBook not charging Kuwait","MacBook liquid damage repair Kuwait","MacBook black screen repair Kuwait","MacBook screen repair Kuwait","MacBook USB-C charging repair","MacBook M1 M2 M3 M4 repair Kuwait"], 
      iconKey: 'apple', 
      shortDescription: 'MacBook Air and Pro repair in Kuwait for power, USB-C charging, screen, battery, keyboard and liquid-damage faults, with component-level board diagnostics where repair is viable.',
      description: 'Need MacBook repair in Kuwait? KCROC diagnoses MacBook Air and MacBook Pro faults including no power, USB-C charging problems, liquid damage, black or flickering screens, battery swelling, keyboard and trackpad faults, overheating and boot failures. We check the model, symptom and affected circuit before recommending a component-level repair or a compatible part replacement. Where technically viable, board-level micro-soldering can repair the original logic board rather than automatically replacing the whole board. Diagnostics are free, the quote is approved before paid work, and free pickup and delivery can be arranged across Kuwait. Repairs are completed at our Hawalli lab with a 30-day warranty on covered work; data preservation is a priority but cannot be guaranteed for every damaged device.', 
      idealCustomer: 'MacBook Air and MacBook Pro owners who need a clear diagnosis and repair options for power, charging, display, battery, keyboard, liquid-damage or logic-board faults.',
      deviceTypes: [
        'MacBook Air (Apple Silicon and Intel generations; confirm exact model)',
        'MacBook Pro 13-inch (Intel and M-series)',
        'MacBook Pro 14-inch and 16-inch (Apple Silicon generations; confirm exact model)',
        'Intel MacBooks from 2015 onward, subject to fault and parts availability',
        'Example model identifiers: MacBook Air A2337 (M1), A2681 (M2 13-inch), A2941 (M2 15-inch), A3113 / A3114 (Air M3 generations)',
        'Example MacBook Pro identifiers: A2338 (13-inch M1), A2442 / A2779 / A2992 (14-inch generations), A2485 / A2780 / A2991 (16-inch generations)',
        'Model numbers are examples, not a complete supported-parts list; confirm the exact A-number, screen size and year before quoting'
      ],
      repairLevel: 'chip-level', 
      estimatedTurnaround: '24-48 Hours', 
      pricing: { startingFrom: 25, currency: 'KWD', quoteRequired: true, displayLabel: 'From 25 KWD — free diagnostic first' }, 
      relatedServiceIds: ['srv-motherboard', 'srv-charging-port', 'srv-liquid-damage', 'srv-macbook-screen'],
      relatedProblemIds: ['problem-liquid-spill', 'problem-not-charging', 'problem-no-power', 'problem-black-screen'],
      relatedBrandIds: [],
      relatedResourcePaths: [
        { label: 'BIOS / UEFI Recovery Guide', path: '/guides/bios-uefi-recovery-kuwait' },
        { label: 'MacBook Battery Replacement Kuwait', path: '/macbook-battery-replacement-kuwait' },
        { label: 'Laptop Battery Warning Signs', path: '/guides/laptop-battery-warning-signs' },
      ],
      coreFeatures: [
        'Motherboard Micro-Soldering',
        'USB-C Power IC Replacement',
        'Liquid Damage Ultrasonic Cleaning',
        'Data-Conscious Board-Level Diagnostics (Apple Silicon & Intel)',
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
        { title: 'Data-Conscious Board Repair', description: 'When technically feasible, repairing the original logic board may avoid replacing it. We focus on the reported hardware fault, recommend backups where possible, and cannot guarantee data preservation or recovery.' },
        { title: 'USB-C Charging Diagnostics', description: 'Charging faults can involve the adapter, cable, port, power-negotiation circuitry or other board-level components. We test the relevant path before recommending a repair.' },
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
          description: 'No response to the power button can have several causes, including the adapter, charging path, battery, power circuitry or logic board. We test the device and trace the fault before deciding whether component-level repair is viable.' 
        },
        { 
          id: 'liquid-damage', 
          title: 'Liquid Spill / Water Damage', 
          severity: 'critical', 
          description: 'Liquid can cause electrical shorts and corrosion, and the extent of damage depends on the liquid, affected area and device condition. Disconnect power, do not try to turn the MacBook back on, and arrange inspection promptly.' 
        },
        { 
          id: 'usb-c-not-charging', 
          title: 'USB-C Port Not Charging or Not Recognized', 
          severity: 'high', 
          description: 'If USB-C ports do not charge the MacBook or recognize accessories, possible causes include the charger, cable, port, power-negotiation circuitry or another board fault. Testing helps identify the cause before parts are replaced.' 
        },
        { 
          id: 'screen-flicker', 
          title: 'Screen Flickering or Backlight Failure', 
          severity: 'medium', 
          description: 'Flickering, lines or a black display can involve the display assembly, connector, backlight path or other hardware, depending on the model. We check the symptom before recommending a screen replacement.' 
        },
        { 
          id: 'keyboard-not-responding', 
          title: 'Keyboard Keys Not Responding or Sticking', 
          severity: 'medium', 
          description: 'Unresponsive or sticking keys can result from contamination, liquid exposure, the keyboard mechanism, a cable or another fault. The model and symptom determine whether cleaning, a targeted repair or assembly replacement is appropriate.' 
        },
        { 
          id: 'trackpad-unresponsive', 
          title: 'Trackpad Unresponsive or Not Clicking', 
          severity: 'medium', 
          description: 'Trackpad problems may involve settings, the trackpad assembly, its connection, battery swelling or another hardware issue. We check the model and symptoms before recommending repair or replacement.' 
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
          description: 'Unexpected restarts can be caused by software, power, thermal or hardware faults. We check the reported pattern and available diagnostics before deciding whether hardware repair is needed.' 
        },
        { 
          id: 'no-sound', 
          title: 'No Sound or Distorted Audio', 
          severity: 'low', 
          description: 'Sound problems can be caused by settings, software, speakers, connectors or audio circuitry. A hardware diagnosis can help separate these possibilities when basic checks do not resolve the issue.' 
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
          description: 'A raised trackpad, bulging case or separating seam can indicate a swollen battery. Stop using and charging the device, do not press or puncture it, and arrange safe professional handling.' 
        },
        { 
          id: 'overheating-fan-noise', 
          title: 'Overheating or Constant Fan Noise', 
          severity: 'medium', 
          description: 'Heat or fan noise can relate to workload, airflow, dust, thermal materials, software or hardware. Fan-equipped models can be inspected for cooling issues; fanless models require a different diagnostic approach.' 
        },
        { 
          id: 'dead-macbook-data-recovery', 
          title: 'Dead MacBook — Hardware Power & Logic Board Diagnosis', 
          severity: 'critical', 
          description: 'If a MacBook with important data will not start, avoid repeated power attempts after liquid exposure and explain the data priority before repair. Storage architecture varies by model, and a board replacement or severe board damage may affect data access; recovery cannot be guaranteed. KCROC repairs hardware faults and does not provide standalone data recovery.' 
        }
      ], 

      process: [
        { step: 1, title: 'Free Pickup', description: 'We collect your MacBook from your home or office anywhere in Kuwait.' },
        { step: 2, title: 'Thermal Imaging & Multimeter Diagnostic', description: 'We trace the fault to the exact component — a shorted MOSFET, a blown power IC, a corroded trace — rather than assuming the whole board needs replacing.' },
        { step: 3, title: 'Confirm the Fault & Quote', description: 'You get a written explanation of what\'s actually wrong and an itemized quote before any work starts.' },
        { step: 4, title: 'Micro-Soldering Repair in an ESD-Safe Lab', description: 'The failed component is replaced or the board is ultrasonically cleaned for liquid damage, on grounded, static-controlled workstations.' },
        { step: 5, title: 'Full-Load Stress Testing', description: 'The board is stress-tested under sustained load to confirm the repair holds before reassembly.' },
        { step: 6, title: 'Return with 30-Day Warranty', description: 'Your MacBook is returned after the agreed checks, with a 30-day warranty on covered repair work. We explain any limitations or unresolved symptoms before return.' }
      ],

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
          title: 'Can you repair a MacBook that has been quoted for a motherboard replacement?',
          answer: 'Sometimes. A component-level repair may be possible if the fault can be isolated and the board is repairable, but this depends on the exact model, damage and parts. We diagnose first and explain the available options; we cannot promise that every board can be repaired.'
        },
        {
          id: 'faq-data-loss-board-repair',
          title: 'Will I lose my data if my MacBook needs board-level repair?',
          answer: 'Repairing the original logic board can help retain the original hardware, but it does not guarantee that data will survive or remain accessible. Back up important files if possible, explain data concerns before work begins, and understand that severe board damage or board replacement can affect access.'
        },
        {
          id: 'faq-apple-silicon-harder-repair',
          title: 'Is it true that Apple Silicon (M1/M2/M3) MacBooks are harder to repair than older Intel models?',
          answer: 'Repairability differs by model and fault. Many Apple Silicon models integrate memory and storage-related components more closely with the logic board, while older Intel models vary in their storage design. The exact model matters, and neither component-level repair nor data recovery is guaranteed.'
        },
        {
          id: 'faq-intel-macbooks',
          title: 'Do you repair Intel MacBooks as well as Apple Silicon models?',
          answer: 'Yes — Intel MacBooks from 2015 onward alongside M1, M2, and M3 generation Apple Silicon models.'
        },
        {
          id: 'faq-liquid-spill-immediate-steps',
          title: 'What should I do immediately after spilling liquid on my MacBook?',
          answer: 'Disconnect the charger and other accessories, shut the device down if you can do so safely, and do not try to restart or charge it. Arrange prompt professional inspection. The outcome depends on the liquid, the affected components and whether electrical damage has occurred.'
        },
        {
          id: 'faq-usb-c-without-board-swap',
          title: 'Can a MacBook with USB-C charging problems be fixed without a full board replacement?',
          answer: 'Sometimes. The cause may be the adapter, cable, port, power-negotiation circuitry or another board fault. We test the charging path and explain whether a targeted repair is practical before quoting.'
        },
        {
          id: 'faq-macbook-repair-cost-vs-apple',
          title: 'How much does MacBook motherboard repair cost compared to Apple?',
          answer: 'Initial diagnostics are free. The service page lists a starting price of 25 KWD, but the final quote depends on the exact fault, model, parts and repair method. We provide the quote before paid work begins; comparisons with another provider depend on its specific quote.'
        },
        {
          id: 'faq-genuine-parts-macbook',
          title: 'Do you use genuine Apple parts?',
          answer: 'Part options depend on the model and the repair. We confirm the proposed part type, compatibility, availability and price before you approve the work. We do not claim Apple authorization or promise genuine Apple parts unless explicitly confirmed for that specific repair.'
        },
        {
          id: 'faq-keyboard-without-top-case',
          title: 'Can you replace a MacBook keyboard without replacing the whole top case?',
          answer: 'It depends on the model and mechanism — some generations require top-case-level replacement due to how the keyboard is integrated, while others allow more targeted repair. We confirm which applies to your specific model before quoting.'
        },
        {
          id: 'faq-macbook-thermal-after-repair',
          title: 'Will my MacBook run hot after repair?',
          answer: 'That depends on the cause of the original heat issue and the repair performed. Where relevant, we test cooling behaviour and explain any remaining thermal concern; no specific temperature outcome can be promised before diagnosis.'
        },
        {
          id: 'faq-macbook-warranty',
          title: 'Do you offer a warranty on motherboard repairs?',
          answer: 'Yes, 30 days covering all parts and labor on the repair performed.'
        },
        {
          id: 'faq-macbook-turn-around-time',
          title: 'How long does MacBook repair take?',
          answer: 'Many routine repairs take around 24–48 hours after diagnosis, but board-level faults, liquid damage and parts orders can take longer. We confirm a realistic estimate after inspecting the device and checking part availability.'
        },
        {
          id: 'faq-macbook-model-number',
          title: 'How do I identify my MacBook model before requesting a repair quote?',
          answer: 'Open Apple menu > About This Mac if the MacBook starts, or check the small A-number printed on the underside (for example A2337 or A2442). Send the model name and A-number through WhatsApp so we can check the likely repair path. Do not post the serial number publicly.'
        },
        {
          id: 'faq-macbook-black-screen-diagnosis',
          title: 'My MacBook screen is black but the computer seems to be running. Is the display always broken?',
          answer: 'No. Possible causes include the display assembly, cable or connector, backlight circuit, power or graphics-related faults depending on the model. We test the symptom and related circuits before recommending a screen replacement; the symptom alone is not a confirmed diagnosis.'
        },
        {
          id: 'faq-macbook-flex-cable',
          title: 'Can you diagnose MacBook display cable or backlight faults?',
          answer: 'Yes, we can inspect the display connection and relevant backlight path where the model design allows. Terms such as Flexgate or Dustgate describe particular model-related issues and do not explain every black or flickering screen; we confirm the fault before quoting.'
        },
        {
          id: 'faq-macbook-true-tone',
          title: 'Will True Tone and other display features work after a screen repair?',
          answer: 'We test display functions supported by the specific model and replacement part. Calibration and feature behaviour vary by generation and component, so we confirm compatibility and do not promise every feature before inspection.'
        },
        {
          id: 'faq-macbook-privacy',
          title: 'Will you access my personal files during a MacBook repair?',
          answer: 'Normal hardware diagnostics focus on the reported fault rather than browsing personal files. Back up important data if possible, tell us about any data concerns before pickup, and never share your account password in a public message. Severe board or liquid damage can still put data at risk.'
        },
        {
          id: 'faq-macbook-pickup-lab',
          title: 'Do you have a MacBook repair shop in Salmiya or Kuwait City?',
          answer: 'KCROC has its physical repair lab in Hawalli at Ibn Khaldoun Street, Al Mullah Complex, Basement Shop 19. Salmiya, Kuwait City, Farwaniya, Ahmadi, Jahra and other areas are pickup-and-delivery service areas, not separate walk-in branches.'
        }
      ],

      technicalOverview: {
        heading: 'MacBook repair in Kuwait: diagnosis, model matching and repair options',
        paragraphs: [
          'MacBook Air and MacBook Pro symptoms can overlap even when the underlying fault is different. A MacBook that will not power on, a machine that runs but shows a black display, and a laptop that will not negotiate USB-C charging need different diagnostic paths. We identify the exact model and reported symptom before choosing the next tests.',
          'For charging and no-power faults, we inspect the charger and port behaviour and test relevant power circuits. For liquid exposure, the safest first step is to disconnect power and stop trying to turn the device on; repeated testing can worsen electrical damage. For black or flickering screens, we check the display assembly, connection and related circuitry where appropriate before recommending a replacement.',
          'Model identifiers and chip generations help narrow compatible parts, but do not guarantee that a component is in stock or that a specific repair is possible. Free diagnostics and an itemized quote come before paid work. Many routine repairs take around 24–48 hours after diagnosis; complex board faults and parts orders can take longer.'
        ]
      },
      repairDecision: {
        heading: 'How we choose the right MacBook repair path',
        items: [
          { condition: 'MacBook will not power on or charge.', action: 'Check the charger, USB-C port behaviour and relevant power circuits before assuming the logic board needs replacement.' },
          { condition: 'MacBook has a black, flickering or lined display.', action: 'Separate possible screen, cable, backlight and board faults before quoting a display assembly.' },
          { condition: 'Liquid has spilled onto the keyboard or ports.', action: 'Power off, unplug it, do not try to restart it, and arrange prompt inspection for corrosion and shorts.' },
          { condition: 'Battery is swollen or pushing up the trackpad or case.', action: 'Stop using and charging the device; avoid pressing or puncturing the battery and arrange safe handling.' },
          { condition: 'Keyboard, trackpad, audio, Wi-Fi or thermal symptoms persist.', action: 'Test the affected subsystem and its connectors; replace only the part supported by diagnosis.' },
          { condition: 'Board-level repair or replacement is being considered.', action: 'Compare technical feasibility, cost, part availability and data risk before you approve a repair. Original-board repair can help preserve data access, but cannot guarantee recovery.' }
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
          caption: 'MacBook Air and Pro diagnosis in Kuwait: isolate the power, charging or logic-board fault before choosing a repair.'
        },
        {
          src: IMAGES.macbook.logicBoard.src,
          alt: IMAGES.macbook.logicBoard.alt,
          width: IMAGES.macbook.logicBoard.width,
          height: IMAGES.macbook.logicBoard.height,
          placement: 'coreFeatures',
          caption: 'Component-level MacBook logic-board inspection and micro-soldering where the original board is technically repairable.'
        },
        {
          src: IMAGES.macbook.swollenBattery1.src,
          alt: IMAGES.macbook.swollenBattery1.alt,
          width: IMAGES.macbook.swollenBattery1.width,
          height: IMAGES.macbook.swollenBattery1.height,
          placement: 'process',
          caption: 'MacBook battery safety inspection: a swollen battery requires careful handling and should not be pressed or charged.'
        }
      ],
      seo: { 
        title: 'MacBook Repair Kuwait | Air, Pro, Charging & Board | KCROC', 
        description: 'MacBook Air and Pro repair in Kuwait for power, USB-C charging, liquid damage, screen, battery and logic-board faults. Free diagnosis, pickup across Kuwait and a 30-day warranty on covered repairs.', 
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
      title: 'Laptop Repair Kuwait', primaryKeyword: "laptop repair Kuwait", secondaryKeywords: ["laptop repair Hawalli","laptop screen repair Kuwait","laptop battery replacement Kuwait"], 
      iconKey: 'laptop', 
      shortDescription: 'Component-level laptop diagnostics, micro-soldering and hardware restoration — free pickup across Kuwait, a clear quote before paid work and a 30-day warranty.', 
      description: 'A dead motherboard, stiff hinge, intermittent USB-C charging port or black screen does not automatically mean your laptop needs an expensive full-assembly swap. At KCROC’s ESD-safe repair lab in Hawalli (Al Mullah Complex, Basement Shop 19), we diagnose Dell, HP, Lenovo, ASUS, Acer, MSI and Microsoft Surface laptops. Our bench process uses microscope inspection, bench power-supply current profiling, schematic and boardview tracing, and thermal imaging when the fault calls for it to isolate failed connectors, MOSFETs, charging ICs, power rails or mechanical mounts. We fix the board—not just swap it. Laptop repair starts from 15 KWD; free pickup and delivery cover all six Kuwait governorates. You receive a clear quote before paid work and a 30-day warranty on completed repairs. For Apple devices, see our dedicated MacBook Repair Kuwait page.',
      idealCustomer: 'Students, professionals, families and businesses across Kuwait who need evidence-led laptop fault diagnosis, clear repair approval before paid work, and careful handling of their device and data.',
      deviceTypes: [
        'Business Ultrabooks (XPS, ThinkPad, EliteBook)',
        'Everyday Laptops (Inspiron, Pavilion, IdeaPad)',
        'Creator Laptops (ZenBook, Envy)',
        '2-in-1 / Convertibles (Yoga, Spectre)',
        'Microsoft Surface Devices'
      ],
      symptomLinks: [
        { label: "Laptop won't turn on", path: '/laptop-wont-turn-on', description: 'Separate a no-power fault from a laptop that powers on but will not boot.' },
        { label: 'Plugged in but not charging', path: '/laptop-plugged-in-not-charging', description: 'Explore possible charger, connector, battery and charging-circuit causes.' },
        { label: 'Overheating or a loud fan', path: '/guides/why-is-my-laptop-so-hot', description: 'Review safe checks for airflow, fan behavior, workload and thermal issues.' },
        { label: 'Cracked, black or flickering screen', path: '/laptop-screen-repair-kuwait', description: 'See the repair path for panel, display-cable and related hardware faults.' },
        { label: 'Fast-draining or swollen battery', path: '/battery-replacement-kuwait', description: 'Understand battery symptoms and the safety steps for a visibly swollen battery.' },
        { label: 'Liquid spilled on the laptop', path: '/laptop-liquid-damage-repair-kuwait', description: 'Find the next steps after a spill; avoid repeatedly trying to power the device on.' },
      ],
      repairLevel: 'advanced', 
      estimatedTurnaround: 'Same Day / 24 Hours', 
      pricing: { startingFrom: 15, currency: 'KWD', quoteRequired: true, displayLabel: 'From 15 KWD' },
      pricingGuide: {
        heading: 'Laptop Repair Pricing Guide in Kuwait',
        intro: 'Published guide prices for common laptop repairs at KCROC. Your quote depends on the exact model, confirmed fault, repair scope and any replacement parts required.',
        note: 'Prices are guide figures, not a diagnosis or final quote. Screen panels, batteries, SSDs, RAM and other components are charged separately where stated. We confirm scope and price before paid work; timing is indicative and depends on fault complexity, workload and parts availability.',
        rows: [
          {
            category: 'Cooling & thermal service',
            symptoms: 'Overheating, loud fan, dust-clogged vents or thermal throttling',
            startingPrice: '15–20 KWD',
            typicalTurnaround: 'Often same day; scheduling and diagnostic findings can change timing.'
          },
          {
            category: 'DC jack / USB-C charging port',
            symptoms: 'Loose connector, intermittent charging or cable-angle sensitivity',
            startingPrice: '20–35 KWD',
            typicalTurnaround: 'Often same day to 24 hours for straightforward jobs; board-level faults may take longer.'
          },
          {
            category: 'Hinge / chassis reconstruction',
            symptoms: 'Stiff hinge, cracked housing or loose mounting points',
            startingPrice: '15–30 KWD',
            typicalTurnaround: 'Often within 24 hours when no model-specific parts need ordering; confirmed after inspection.'
          },
          {
            category: 'SSD / RAM installation',
            symptoms: 'Slow startup, limited storage or memory capacity',
            startingPrice: 'Installation labour 5–10 KWD; SSD/RAM parts extra',
            typicalTurnaround: 'Often same day when a compatible part is available; compatibility is checked first.'
          },
          {
            category: 'Laptop screen replacement',
            symptoms: 'Cracked panel, lines, flicker or a panel with no image',
            startingPrice: 'Labour from 30 KWD + panel',
            typicalTurnaround: 'Same day or within 24 hours only when the compatible panel is in stock.'
          },
          {
            category: 'Motherboard component repair',
            symptoms: 'No power, shorted power path, liquid impact or board-level charging fault',
            startingPrice: '25–60 KWD for component-level repair; advanced board work quoted separately',
            typicalTurnaround: 'Complex board diagnostics commonly need 24–48 hours; deeper faults or parts orders can take longer.'
          }
        ]
      }, 
      relatedServiceIds: ['srv-gaming', 'srv-macbook', 'srv-motherboard', 'srv-screen', 'srv-battery', 'srv-charging-port', 'srv-gaming-laptop-cleaning'],
      relatedProblemIds: ['problem-no-power', 'problem-overheating', 'problem-black-screen', 'problem-not-charging', 'problem-slow', 'problem-freezing-crashing', 'problem-hinge-break', 'problem-cracked-screen', 'problem-windows-wont-boot'],
      relatedBrandIds: ['brand-dell', 'brand-hp', 'brand-lenovo', 'brand-asus', 'brand-acer', 'brand-msi'],
      relatedLocationIds: ['loc-hawalli', 'loc-salmiya', 'loc-kuwait-city', 'loc-farwaniya', 'loc-jahra', 'loc-ahmadi', 'loc-fahaheel'],
      relatedResourcePaths: [
        { label: "Laptop Won't Turn On: Troubleshooting Guide", path: '/guides/laptop-wont-turn-on' },
        { label: 'Laptop Battery Warning Signs', path: '/guides/laptop-battery-warning-signs' },
        { label: 'Laptop Overheating Diagnostic Path', path: '/laptop-overheating-kuwait' },
        { label: 'BIOS / UEFI Recovery Guide', path: '/guides/bios-uefi-recovery-kuwait' },
      ],
      coreFeatures: [
        'Board-Level Power & Charging Diagnostics',
        'Micro-Soldering & Targeted Component Repair',
        'Display, Cable & Backlight Fault Diagnosis',
        'Hinge & Chassis Reconstruction',
        'Cooling-System Cleaning & Thermal Service',
        'SSD/RAM Upgrades After Compatibility Checks',
        'Free Pick & Drop Across All Six Kuwait Governorates',
        '30-Day Warranty on Completed Repairs'
      ],
      brands: ['Dell', 'HP', 'Lenovo', 'ASUS', 'Acer', 'MSI', 'Microsoft Surface'], 

      whyChooseUs: [
        { title: 'Diagnosis Before Replacement', description: 'We trace the reported symptom through the relevant circuit or mechanical assembly, then explain the fault found before quoting repair or replacement.' },
        { title: 'Board-Level Repair', description: 'Board measurements establish whether a targeted connector, capacitor, MOSFET or charging-IC repair is a sound option before a complete board replacement is quoted.' },
        { title: 'Clear Quote & Approval', description: 'You receive the repair scope and price before paid work begins, so you can decide with the diagnosis in hand.' },
        { title: 'Six-Governorate Pickup', description: 'Free pickup and delivery connect homes and offices across Hawalli, Capital, Farwaniya, Ahmadi, Mubarak Al-Kabeer and Jahra to the Hawalli repair lab. Completed repairs carry a 30-day warranty.' },
        { title: 'No Fix, No Fee', description: 'KCROC’s stated No Fix, No Fee policy applies under its published conditions when a device cannot be repaired economically.' }
      ],

      commonIssues: [
        {
          id: 'hinge-separation',
          title: 'Hinge Separation & Chassis Cracking',
          severity: 'high',
          description: 'A stiff hinge can pull brass inserts or plastic mounting bosses from the lid or palmrest, damage the bezel, and strain nearby display cables.',
          problem: 'Lid resistance or case separation can signal a seized hinge, damaged mounting point or excess hinge tension; it does not by itself prove the LCD panel has failed.',
          labFix: 'We inspect hinge torque, mounting points and nearby cables. When the chassis material and damage permit, we rebuild the mounts with a suitable structural compound or brass inserts; if the shell cannot support a durable repair, we quote a compatible replacement part.',
          service: 'After approved work, we check lid alignment, bezel clearance, cable routing and hinge movement across repeated open-close cycles. Repairability depends on the model and extent of the damage.'
        },
        {
          id: 'broken-dc-jack',
          title: 'Intermittent Charging & Loose DC / USB-C Port',
          severity: 'high',
          description: 'Intermittent charging may involve the adapter, a damaged DC jack, cracked solder joints, worn USB-C contacts or the board-level power path.',
          problem: 'Needing to hold a cable at an angle is a fault symptom, not proof that the port alone has failed; the adapter, solder joints and charging circuit must also be considered.',
          labFix: 'We test adapter output and inspect the connector under magnification, then measure relevant input rails and charging components—including MOSFETs or a USB-C Power Delivery controller where the board design uses them—before quoting connector replacement or micro-soldering.',
          service: 'We quote before paid work, then re-check charging stability and battery detection after the approved repair when the device and fault allow those tests.'
        },
        {
          id: 'laptop-dead-no-power',
          title: 'Dead Laptop & Motherboard Power Faults',
          severity: 'critical',
          description: 'No lights or fan response can point to the adapter, input protection, a shorted component or another power-path fault; testing distinguishes among these causes.',
          problem: 'A no-power symptom can originate at the adapter input, a protection component, a power rail or a controller. A full motherboard swap should not be recommended before the fault is traced.',
          labFix: 'We use multimeter diode-mode checks, bench power-supply current profiling and schematic/boardview tracing; thermal imaging helps locate a short when the fault pattern supports it. Checks follow the board design and can include the main input, protection MOSFETs, 3.3V/5V rails and embedded-controller power path.',
          service: 'The quote explains the proposed scope before paid work. KCROC’s No Fix, No Fee policy applies under its published conditions. We work on the original board when it is repairable, but data preservation depends on the fault and storage condition and is never assumed.'
        },
        {
          id: 'cracked-screen',
          title: 'Cracked, Black or Flickering Screen',
          severity: 'high',
          description: 'A cracked panel, damaged eDP display cable, lid sensor, backlight circuit or related board fault can cause lines, flicker or a black display.',
          problem: 'Similar screen symptoms can have different causes; a cracked panel, display-cable fault, lid sensor or motherboard backlight fault can look alike at first.',
          labFix: 'Before ordering a panel, we check display-cable routing and the relevant eDP/backlight behavior. When panel replacement is needed, we match the exact model, resolution, refresh rate, connector and panel specification.',
          service: 'Compatible-panel availability determines timing. After approved work, we check display output, brightness and cable routing before return.'
        },
        {
          id: 'overheating-loud-fans',
          title: 'Overheating, Throttling & Loud Fans',
          severity: 'medium',
          description: 'Fine dust can accumulate in vents and heatsink fins, while Kuwait’s hot summer ambient temperatures can reduce cooling headroom; fan wear, thermal contact and workload also matter.',
          problem: 'High temperatures, fan noise or shutdowns can result from dust restriction, a worn fan, degraded thermal interface material or high workload—not only a failed fan.',
          labFix: 'We inspect vents, heatsink fins, fan operation, thermal contact and the model-specific thermal interface. We clean suitable components and replace thermal paste or specified phase-change pads according to the laptop design.',
          service: 'After approved work, we re-check fan behavior, relevant temperatures and stability under a suitable workload. Results vary with the laptop hardware, ambient temperature and usage.'
        },
        {
          id: 'running-slow',
          title: 'Slow Startup, Freezing & Storage Problems',
          severity: 'medium',
          description: 'Slow startup, freezes and blue screens can involve SSD health, RAM instability, thermal throttling, startup software or operating-system corruption.',
          problem: 'Slow startup alone does not prove that an SSD has failed or that an upgrade is necessary; storage, memory, thermals and software need separate checks.',
          labFix: 'We check SMART storage health, memory stability, startup behavior and thermals to separate likely hardware degradation from software problems before recommending repair or a compatible SSD/RAM upgrade.',
          service: 'If migration is requested, cloning or file transfer depends on source-drive health, encryption and backup status; a complete transfer cannot be guaranteed when a drive is failing. We assess stability after the confirmed fault is addressed.'
        },
        {
          id: 'liquid-or-battery-safety',
          title: 'Liquid Exposure & Swollen Battery',
          severity: 'critical',
          description: 'Liquid residue can corrode motherboard traces and connectors; a swollen lithium-ion or lithium-polymer battery can create a physical and fire risk.',
          problem: 'Do not repeatedly power on or charge a liquid-damaged laptop. Stop using and charging a swollen battery; never press, puncture or attempt to flatten it.',
          labFix: 'For liquid exposure, we inspect corrosion and affected circuits; suitable boards may receive controlled cleaning and trace or solder repair. Swollen batteries require safe handling and a compatible model-matched replacement after the charging circuit is assessed.',
          service: 'Inspection determines repairability; cleaning cannot guarantee recovery of every component or file. If the battery is swollen or liquid has entered the device, stop using it and arrange professional inspection.'
        }
      ],

      process: [
        { step: 1, title: 'Free Pickup', description: 'We arrange collection from your home or office anywhere in Kuwait and route the laptop to the Hawalli repair lab.' },
        { step: 2, title: 'Hardware & Thermal Diagnosis', description: 'We inspect the symptom, test relevant power and charging behavior, review storage health and assess chassis or cooling faults before making a recommendation.' },
        { step: 3, title: 'Quote & Approval', description: 'You receive the diagnosis and repair price. Paid repair work begins only after you approve the proposed scope.' },
        { step: 4, title: 'Targeted Repair', description: 'We carry out the approved component repair, compatible part replacement, chassis work or upgrade based on the confirmed fault.' },
        { step: 5, title: 'Function Testing', description: 'We test the functions related to the repair and check relevant charging, stability, thermal or mechanical behavior when practical.' },
        { step: 6, title: 'Return with Warranty', description: 'Your laptop is returned after the agreed work is completed, with a 30-day warranty on the completed repair.' }
      ],

      inspectionChecklist: [
        'Hinge resistance, mount condition and display-cable routing',
        'Adapter, DC/USB-C connector and relevant charging input',
        'Relevant input rails, protection components and charging behavior',
        'Battery condition, including swelling signs',
        'Dust, cooling airflow, fan operation and thermal contact',
        'Storage health, startup behavior and memory stability',
        'Display, backlight and cable behavior',
        'Relevant post-repair function and stability checks'
      ],
      technicalOverview: {
        heading: 'Inside Our Laptop Diagnostic Workflow',
        paragraphs: [
          'We isolate the reported fault before recommending a replacement. Depending on the board and symptoms, bench checks may include adapter and DC-in testing, microscope inspection, current profiling with a bench power supply, multimeter diode-mode checks, schematic/boardview tracing and thermal imaging when it helps localise a fault. The exact tests follow the device design rather than assuming every laptop uses the same circuit.',
          'Charging work can involve the DC jack, USB-C Power Delivery controller, protection MOSFETs, input rails and charging controller; embedded-controller or Super I/O checks are relevant only on board designs that use those components. Display faults can involve the panel, eDP cable, lid sensor, backlight circuit or motherboard, so panel replacement follows compatibility and fault checks.',
          'Kuwait’s fine dust and hot summer ambient temperatures can contribute to restricted airflow and higher thermal load. We inspect the vents, fan, heatsink contact and model-specific thermal interface before recommending cleaning or replacement. Findings, proposed work and the price are explained before paid repair begins.'
        ]
      },

      faqs: [
        {
          id: 'faq-laptop-price',
          title: 'How much does laptop repair cost in Kuwait?',
          answer: 'Selected laptop repairs start from 15 KWD. Published guide prices include thermal service at 15–20 KWD, charging-port repair at 20–35 KWD, hinge/chassis reconstruction at 15–30 KWD, screen-replacement labour from 30 KWD plus the panel, and component-level motherboard repair at 25–60 KWD. The exact price depends on the model, confirmed fault and parts. We quote before paid work begins.'
        },
        {
          id: 'faq-laptop-turnaround',
          title: 'How long does a laptop repair take?',
          answer: 'Many routine repairs can be completed the same day or within 24 hours when a compatible part is in stock. Board-level micro-soldering and deeper liquid-damage diagnosis commonly need 24–48 hours; unusual faults, queue levels and parts orders can take longer. We confirm timing after checking the device.'
        },
        {
          id: 'faq-laptop-pickup',
          title: 'Do you collect laptops across Kuwait, or must I visit Hawalli?',
          answer: 'Free pickup and delivery are available across Hawalli, Capital (including Kuwait City), Farwaniya, Ahmadi, Mubarak Al-Kabeer and Jahra. The courier brings the laptop to our Hawalli lab at Ibn Khaldoun Street, Al Mullah Complex, Basement Shop 19. Walk-ins are welcome daily from 10 AM to 10 PM, but a visit is not required for pickup customers.'
        },
        {
          id: 'faq-laptop-brands',
          title: 'Which laptop brands do you repair?',
          answer: 'We repair Dell (Inspiron, Latitude, XPS, Alienware), HP (Pavilion, Envy, EliteBook, OMEN), Lenovo (ThinkPad, Yoga, IdeaPad, Legion), ASUS (ZenBook, VivoBook, ROG, TUF), Acer, MSI and selected Microsoft Surface models. MacBook repairs are handled through our dedicated MacBook Repair Kuwait service. Exact model and part compatibility are checked before confirming the work.'
        },
        {
          id: 'faq-laptop-board-repair',
          title: 'Can you repair a laptop motherboard instead of replacing it?',
          answer: 'Yes, many faults can be repaired at component level when board condition and measurements support it. Depending on the model, checks may cover power rails, shorted capacitors, MOSFETs, charging ICs, USB-C Power Delivery controllers and the embedded-controller power path. We explain the findings and quote the repair before work. Some damage is uneconomical or not safely repairable, so a board replacement may still be the appropriate option.'
        },
        {
          id: 'faq-fix-broken-hinge',
          title: 'Can you fix a broken hinge without replacing the whole screen?',
          answer: 'Often, yes. A stiff hinge can break the mounting bosses in the lid or palmrest while leaving the LCD panel intact. We inspect the hinge, mounts, bezel and nearby display cables, then quote structural reconstruction or a compatible part based on the damage. A full screen assembly is not automatically necessary, but some shells cannot support a durable rebuild.'
        },
        {
          id: 'faq-dc-jack-repair',
          title: 'My laptop only charges when the cable is held at an angle. Can this be fixed?',
          answer: 'Usually this points to a loose or damaged DC jack, cracked solder joints, worn USB-C contacts or another fault in the charging path. We test the adapter and connector, then inspect relevant input rails, MOSFETs and the USB-C Power Delivery circuit where applicable. Published charging-port repair pricing is 20–35 KWD; the quote depends on what the tests find.'
        },
        {
          id: 'faq-ssd-ram-data',
          title: 'Can you upgrade SSD/RAM, and what happens to my files?',
          answer: 'We check the exact model because RAM may be soldered and SSD form factor or capacity support varies. Published SSD/RAM installation labour is 5–10 KWD; the drive or memory module is extra. Back up important files before service. If you request cloning or migration, it depends on source-drive health, encryption and data condition, so a complete transfer cannot be guaranteed.'
        },
        {
          id: 'faq-screen-replacement-time',
          title: 'How soon can a laptop screen be replaced?',
          answer: 'Screen-replacement labour starts from 30 KWD, with the compatible panel priced separately. For common models in stock, replacement may be completed the same day or within 24 hours. We confirm the panel specification, price and timing after checking your exact model.'
        },
        {
          id: 'faq-no-fix-no-fee',
          title: 'What happens if you cannot fix my laptop?',
          answer: 'We explain the diagnosis and available options before paid repair work begins. KCROC’s No Fix, No Fee policy applies under its published conditions when a device cannot be repaired economically; it is not a promise that every fault can be repaired. If the proposed paid repair is not suitable for you, you can decide whether to proceed with the quoted work.'
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
        title: 'Laptop Repair Kuwait | Board-Level Lab & Free Pickup | KCROC', 
        description: 'Expert laptop repair in Kuwait from 15 KWD. Micro-soldering, screen & hinge restoration for Dell, HP, Lenovo, ASUS & MSI. Free pickup & 30-day warranty.', canonicalUrl: 'https://www.computerrepairkuwait.com/laptop-repair-kuwait', locale: 'en_KW', alternates: { 'en-KW': 'https://www.computerrepairkuwait.com/laptop-repair-kuwait', 'ar-KW': 'https://www.computerrepairkuwait.com/ar/laptop-repair-kuwait', 'x-default': 'https://www.computerrepairkuwait.com/laptop-repair-kuwait' }, 
        ogType: 'article', 
        schemaTypes: ['Service', 'FAQPage'],
        lastModified: '2026-10-26T00:00:00+03:00'
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
      title: 'Desktop & PC Repair Kuwait', primaryKeyword: "desktop computer repair Kuwait", secondaryKeywords: ["PC repair Kuwait","desktop motherboard repair","computer troubleshooting Kuwait"],
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
      contentImages: [{ src: IMAGES.laptopHardware.desktopPcTowerRepairKuwait.src, alt: 'Lenovo desktop PC on the repair bench for desktop and PC repair in Kuwait', width: IMAGES.laptopHardware.desktopPcTowerRepairKuwait.width, height: IMAGES.laptopHardware.desktopPcTowerRepairKuwait.height, placement: 'hero', caption: 'Desktop PC on the KCROC repair bench for hardware diagnosis and repair.' }],
      warranty: { duration: '30 Days', coverage: 'Parts and labour for the completed desktop PC repair', noFixNoFee: true },
      seo: { title: 'Desktop & PC Repair Kuwait | Free Pickup | KCROC', description: 'Desktop and PC repair in Kuwait for no power, no display, crashes, overheating, PSU, motherboard, storage and upgrades. Free pickup, diagnosis first and 30-day warranty.', canonicalUrl: 'https://www.computerrepairkuwait.com/desktop-pc-repair-kuwait', locale: 'en_KW', alternates: { 'en-KW': 'https://www.computerrepairkuwait.com/desktop-pc-repair-kuwait', 'ar-KW': 'https://www.computerrepairkuwait.com/ar/desktop-pc-repair-kuwait', 'x-default': 'https://www.computerrepairkuwait.com/desktop-pc-repair-kuwait' }, ogType: 'article', schemaTypes: ['Service', 'FAQPage'], lastModified: '2026-11-01T00:00:00+03:00' },
      navigationPriority: 78,
      isFeatured: true,
      popular: false
    } as ServiceEntity,

    'srv-gaming': { 
      id: 'srv-gaming', 
      slug: 'gaming-pc-repair-kuwait', 
      entityType: 'Service', 
      isActive: true, 
      title: 'Gaming PC Repair Kuwait', primaryKeyword: "gaming PC repair Kuwait", secondaryKeywords: ["gaming computer repair Kuwait", "gaming PC graphics diagnosis Kuwait", "gaming PC no display repair", "gaming PC overheating repair Kuwait", "gaming PC FPS drop diagnosis"], 
      iconKey: 'gaming', 
      shortDescription: 'Gaming desktop PC repair in Kuwait for GPU faults, black screens, FPS drops, overheating, crashes, power faults and cooling problems.', 
      description: 'KCROC diagnoses complete gaming desktop systems in Kuwait, including faults involving the GPU installed in the PC, VRAM, power delivery, motherboard, memory and cooling. Every job starts with a free initial assessment at our ESD-controlled Hawalli lab (Ibn Khaldoun Street, Al Mullah Complex, Basement Shop 19), followed by a written quote before paid work. We assess NVIDIA GeForce RTX and AMD Radeon systems, AM5, LGA1700 and LGA1851 platforms, and AIO or custom-loop cooling as part of the complete desktop. We do not accept individual graphics cards as standalone repair jobs. Free pickup and delivery are available for complete desktop towers across Kuwait, with a 30-day warranty on completed repairs under our stated terms.',
      idealCustomer: 'Owners of custom-built or pre-built gaming desktops, streamers and high-performance PC users who need a fault-based diagnosis for graphics, power, cooling, display or stability problems. Gaming laptops are covered by our separate gaming laptop repair service.',
      symptomLinks: [
        { label: 'Gaming PC won’t turn on', path: '/guides/gaming-pc-not-turning-on-kuwait', description: 'No power, intermittent startup, dead tower or a PC that clicks on then shuts back off.' },
        { label: 'Gaming PC has no display', path: '/guides/gaming-pc-black-screen-no-display-kuwait', description: 'Fans and RGB work but the monitor stays black or reports no signal.' },
        { label: 'GPU artifacting / black screen', path: '/guides/gaming-gpu-artifacts-repair-kuwait', description: 'Colored blocks, flickering textures, driver resets or black screens under GPU load.' },
        { label: 'Gaming PC shuts down while gaming', path: '/guides/gaming-pc-random-shutdown-kuwait', description: 'Instant power loss or restarts during demanding games and stress tests.' },
      ],
      deviceTypes: [
        'Custom Desktop Builds', 
        'Pre-Built Gaming PCs (Alienware, OMEN)', 

        'Streaming & Content Creation Workstations',
        'Liquid-Cooled Custom Loop Systems'
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
        heading: 'Gaming PC repair in Kuwait: find the failed layer before replacing expensive parts',
        paragraphs: [
          'A gaming PC combines high power draw, dense cooling and sustained load, so one symptom can have very different causes. FPS drops may be thermal throttling, a failing fan, unstable memory, a GPU fault or software; a sudden shutdown may point to PSU protection, a damaged connector or a motherboard power stage.',
          'We reproduce the fault under the workload that exposes it and read temperatures, clocks, fan response, power delivery and memory stability while it happens. Only then do we recommend a repair, a cooling service or a replacement part, and you receive the findings and an itemised quote before any paid work begins.',
          'Free pickup and return delivery cover full-size towers anywhere in Kuwait, so you never have to carry the system yourself.'
        ]
      },
      repairDecision: {
        heading: 'Where we start, by symptom',
        items: [
          { condition: 'Temperatures climb and performance falls during long sessions.', action: 'We check airflow, fan and pump response, thermal-interface condition and throttling before suspecting the GPU.' },
          { condition: 'Artifacts, crashes or driver resets appear under GPU load.', action: 'We test the GPU, VRAM behaviour, power delivery and stability before you buy a replacement card.' },
          { condition: 'The PC shuts down or restarts suddenly under load.', action: 'We separate thermal protection, PSU and connector faults from motherboard power-stage problems using controlled load tests.' },
          { condition: 'AIO or custom-loop temperatures rise unexpectedly.', action: 'We inspect pump and fan operation, radiator condition, cold-plate flow and mounting. If you suspect a leak, do not power the PC on.' },
          { condition: 'A localised motherboard power or VRM fault is suspected.', action: 'We assess component-level repair before defaulting to a full motherboard replacement.' }
        ]
      },
      relatedServiceIds: ['srv-gaming-laptop', 'srv-desktop-pc', 'srv-motherboard'],
      relatedProblemIds: [],
      relatedBrandIds: [],
      relatedLocationIds: ['loc-hawalli', 'loc-salmiya', 'loc-kuwait-city', 'loc-farwaniya', 'loc-jahra', 'loc-ahmadi', 'loc-fahaheel', 'loc-mangaf', 'loc-abu-halifa', 'loc-surra', 'loc-mubarak-al-kabeer', 'loc-mishref', 'loc-sabah-al-salem'],
      relatedResourcePaths: [
        { label: 'Gaming PC Cooling Guide', path: '/blog/gaming-pc-cooling' },
        { label: 'Gaming PC Won’t Turn On? Diagnosis Guide', path: '/guides/gaming-pc-not-turning-on-kuwait' },
        { label: 'Gaming PC Black Screen / No Display Guide', path: '/guides/gaming-pc-black-screen-no-display-kuwait' },
        { label: 'GPU Artifacting & Black Screen Guide', path: '/guides/gaming-gpu-artifacts-repair-kuwait' },
        { label: 'Gaming PC Random Shutdown Guide', path: '/guides/gaming-pc-random-shutdown-kuwait' },
        { label: 'BIOS / UEFI Recovery Guide', path: '/guides/bios-uefi-recovery-kuwait' },
      ],
      coreFeatures: [
        'GPU and VRAM diagnostics for graphics hardware installed in a complete gaming desktop (GDDR6X / GDDR7 where fitted)',
        '12VHPWR / 12V-2x6 connector and PCIe 5.0 power-path inspection',
        'VRM, DrMOS and SPS MOSFET power-stage diagnostics',
        'AM5, LGA1700 and LGA1851 socket and DDR4 / DDR5 memory assessment',
        'BIOS and VBIOS recovery, DDR5 EXPO/XMP training and stability checks',
        'AIO and custom-loop inspection, flush and cooling service',
        'Thermal-interface service matched to the cooler: paste, phase-change material or VRAM putty where suitable',
        'Repeatable load, temperature and stability verification before return'
      ],
      brands: ['ASUS ROG', 'MSI', 'Gigabyte AORUS', 'Alienware', 'HP OMEN', 'Corsair', 'NZXT'],

      whyChooseUs: [
        { title: 'Diagnosis before replacement', description: 'We identify the failed component or layer first, so you are never asked to replace a GPU or motherboard on a guess.' },
        { title: 'Board-level repair where it makes sense', description: 'For a GPU installed in a complete gaming desktop, a fault confined to a power stage, connector, VRAM chip or similar component may be suitable for component-level repair instead of a full replacement. We do not accept individual graphics cards as standalone repair jobs, and not every board is repairable.' },
        { title: 'Tested under load', description: 'We verify the repair with the workload that caused the fault, using monitoring and thermal imaging where useful, before the system is returned.' },
        { title: 'ESD-safe laboratory', description: 'All work is done on grounded, static-controlled workstations in our Hawalli lab to protect sensitive GPU and motherboard components.' },
        { title: 'Free pickup and delivery, Kuwait-wide', description: 'We collect and return complete gaming desktop towers anywhere in Kuwait at no extra cost. We do not accept individual graphics cards as standalone repair jobs.' },
        { title: 'Clear quote, No Fix, No Fee', description: 'You receive a written explanation of the fault and an itemised quote before any paid work. If we cannot repair it, you do not pay, under our service terms.' }
      ],

      commonIssues: [
        {
          id: 'fps-thermal-throttling',
          title: 'FPS Drops During Long Gaming Sessions',
          severity: 'high',
          description: 'Frame rate falls after sustained play, clocks fluctuate or fans become loud. We check airflow, fan response, thermal-interface condition, power limits and drivers together. A large gap between GPU core and hotspot temperature can justify closer inspection, but it is judged against the specific card and workload, not a fixed threshold.'
        },
        {
          id: 'gpu-artifacting',
          title: 'GPU Artifacts, VRAM Errors or Black Screens',
          severity: 'critical',
          description: 'Coloured blocks, flickering textures, driver resets or a black screen can come from the GPU core, VRAM, thermals, drivers, the display path or power delivery. On high-power cards such as the RTX 4090 and 5090 class, we also inspect the 12VHPWR / 12V-2x6 connector and PCIe 5.0 power path. Memory faults need platform-appropriate diagnostics before any BGA work is considered.'
        },
        {
          id: 'random-shutdown',
          title: 'Sudden Shutdowns or Restarts During Games',
          severity: 'critical',
          description: 'Likely causes include PSU protection trips, cable or connector damage, overheating and motherboard power-stage faults. We assess the 12V path and, where indicated, the DrMOS/SPS stages; thermal imaging helps locate abnormal heat but is not proof on its own. If there is a burning smell or visible connector damage, switch off, disconnect power and do not keep retrying.'
        },
        {
          id: 'no-display-boot',
          title: 'Fans Spin but There Is No Display',
          severity: 'high',
          description: 'We rule out the monitor, cable and GPU seating first, then work through memory training, firmware, power delivery and failed components using the board’s diagnostic indicators, rather than assuming the GPU is dead.'
        },
        {
          id: 'cpu-gpu-overheating',
          title: 'CPU or GPU Temperatures Rise Too Quickly',
          severity: 'high',
          description: 'High readings can come from dust, airflow, fan or pump response, cooler mounting, thermal-interface condition or workload. We choose paste, phase-change material such as PTM7950, or VRAM putty only where it suits the hardware.'
        },
        {
          id: 'aio-custom-loop',
          title: 'AIO or Custom Water-Cooling Problems',
          severity: 'high',
          description: 'Temperature spikes, pump noise, poor flow or signs of leakage call for careful inspection of the pump, fans, cold plate and radiator, including blockage and corrosion in mixed-metal loops. We recommend a flush or repair only when it is safe. Do not power on a system with a suspected leak.'
        },
        {
          id: 'driver-crash-tdr',
          title: 'Game Crashes or Display Driver Resets',
          severity: 'medium',
          description: 'A driver timeout can be purely software, or it can reflect unstable VRAM, thermal limits or power delivery. We review logs, repeatability and hardware readings together before concluding that a component has failed.'
        },
        {
          id: 'bios-overclock',
          title: 'Failed BIOS Update or Unstable Overclock',
          severity: 'medium',
          description: 'A failed update can stop the system from starting. We try the board’s documented recovery feature first, and consider external SPI programming only where the board, chip and firmware image support it. The correct board revision and firmware file are essential.'
        },
        {
          id: 'cpu-socket-memory-training',
          title: 'Socket, DDR5 EXPO/XMP or CPU Instability',
          severity: 'high',
          description: 'A system that fails to POST or crashes after a CPU, memory or BIOS change may have bent socket pins (AM5, LGA1700, LGA1851), a DDR5 training failure, a BIOS compatibility problem or a CPU fault. On applicable Intel 13th/14th Gen desktop platforms we also confirm the latest board-vendor BIOS and Intel-recommended settings. Pin restoration depends on the condition of the pins and pads.'
        }
      ],
      process: [
        { step: 1, title: 'Free Secure Pickup', description: 'We collect your PC from your home or office anywhere in Kuwait, then tag and log it for secure handling.' },
        { step: 2, title: 'Fault-Led Testing', description: 'We reproduce the reported symptom with a suitable game or stress workload and record temperatures, clocks, fan response and power readings, adding thermal imaging where it helps.' },
        { step: 3, title: 'Quote and Repair', description: 'You receive the findings and an itemised quote. After you approve, we carry out the repair the diagnosis supports: component-level board work, connector repair, firmware recovery or cooling service.' },
        { step: 4, title: 'Verification and Return', description: 'We repeat the load and stability checks that exposed the fault and confirm the original symptom does not return before arranging delivery.' }
      ],

      inspectionChecklist: [
        'CPU and GPU temperatures under a relevant workload, including GPU hotspot',
        'VRAM behaviour and supported memory diagnostics',
        '12VHPWR / 12V-2x6 connector seating, cable and pin condition',
        'PSU stability and PCIe power cables',
        'VRM, DrMOS and SPS MOSFET power stages',
        'DDR4 / DDR5 stability and EXPO/XMP training',
        'Socket condition (AM5, LGA1700, LGA1851) when symptoms indicate',
        'BIOS version, recovery options and platform defaults',
        'AIO or custom-loop pump, fan, radiator and cold-plate condition',
        'Thermal-interface material and cooler mounting'
      ],
      faqs: [
        {
          id: 'faq-gaming-cost',
          title: 'How much does gaming PC repair cost in Kuwait?',
          answer: 'Diagnosis is free, and repair prices start from 25 KWD. After diagnosis we send a written quote, including any parts, before paid work begins. Complex GPU, motherboard or cooling faults can cost more.'
        },
        {
          id: 'faq-gaming-turnaround',
          title: 'How long does a gaming PC repair take?',
          answer: 'Typically 24–48 hours when the fault is clear and parts are available. Board-level work, extra testing or parts orders can take longer, and we confirm the estimate after diagnosis.'
        },
        {
          id: 'faq-gaming-pickup',
          title: 'Do you collect gaming PCs from Salmiya, Farwaniya and other areas?',
          answer: 'Yes. Free pickup and return delivery cover full-size towers across Kuwait. All repair work is done at our Hawalli lab; the service-area pages are pickup areas, not separate shops.'
        },
        {
          id: 'faq-gaming-no-display',
          title: 'Can you fix a gaming PC with no display, GPU artifacts or a black screen?',
          answer: 'We first separate monitor and cable problems from GPU, memory, power, motherboard and firmware faults. Testing decides the next step; we do not blame a component from the symptom alone.'
        },
        {
          id: 'faq-gaming-fps-overheat',
          title: 'Why does my gaming PC lose FPS, overheat or shut down mid-game?',
          answer: 'Common causes are restricted airflow, a fan or pump fault, thermal limits, unstable memory, PSU behaviour or motherboard power delivery. We reproduce the symptom and read the measurements before recommending any work.'
        },
        {
          id: 'faq-gaming-repair-or-replace',
          title: 'Can the GPU in my gaming desktop be repaired, or should I replace it?',
          answer: 'Sometimes. We assess the GPU only as part of a complete gaming desktop system. Blown fuses, shorted components, power-stage or connector damage and selected VRAM faults may be repairable when the GPU and board are otherwise sound. We do not accept individual graphics cards as standalone repair jobs. We explain the diagnosis and quote before any paid work.'
        },
        {
          id: 'faq-gaming-thermal-paste',
          title: 'Does overheating always mean the thermal paste has failed?',
          answer: 'No. Dust, airflow, a fan or pump fault, cooler mounting and power settings all affect temperatures. We compare readings in the context of your hardware before recommending paste, phase-change material or VRAM putty.'
        },
        {
          id: 'faq-gaming-liquid-cooling',
          title: 'Do you inspect AIO and custom liquid-cooling systems?',
          answer: 'Yes. We check pump and fan behaviour, radiator airflow, cold-plate condition and signs of blockage, corrosion or leakage, then recommend maintenance or replacement depending on condition. Do not power on a system with a suspected leak.'
        },
        {
          id: 'faq-gaming-bios-recovery',
          title: 'Can you recover a PC after a failed BIOS update?',
          answer: 'Sometimes. It depends on the board revision, its recovery features and the type of failure. We try the documented recovery path first and consider external SPI programming only on supported boards; it cannot fix every failed board.'
        },
        {
          id: 'faq-gaming-warranty-data',
          title: 'Is there a warranty, and what happens to my data?',
          answer: 'Completed repairs carry a 30-day warranty under KCROC’s stated terms. GPU, motherboard and cooling work does not normally involve your storage drive, but we recommend backing up important files before any service.'
        },
        { id: 'faq-gaming-rtx-repair', title: 'Do you diagnose RTX and Radeon GPUs in Kuwait?', answer: 'Yes, when the GPU is installed in a complete gaming desktop that KCROC receives for diagnosis. We assess artifacts, black screens, no display, overheating and power faults as part of the full system. We do not accept a standalone graphics card without its complete desktop.' },
        { id: 'faq-gaming-burnt-connector', title: 'The GPU power connector in my gaming desktop is burnt or melted. What should I do?', answer: 'Switch the complete PC off, disconnect it from power if safe, and do not keep retrying. A damaged 12VHPWR or 12V-2x6 connection can involve the GPU installed in the system, its cable and the PSU side. KCROC can inspect these parts as part of a complete gaming desktop assessment. We do not accept an individual graphics card as a standalone repair job.' }
      ],
            contentImages: [
        { src: IMAGES.gaming.waterCooled.src, alt: 'Custom water-cooled gaming PC with liquid-cooling loop and RGB fans on the KCROC bench in Kuwait', width: IMAGES.gaming.waterCooled.width, height: IMAGES.gaming.waterCooled.height, placement: 'hero', caption: 'Custom water-cooled gaming PC build — liquid-cooled loops are part of the gaming PC repair and diagnosis we handle in Kuwait.' },
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
        title: 'Gaming PC Repair Kuwait | GPU Fault Diagnosis | KCROC', 
        description: 'Gaming desktop repair in Kuwait for installed GPU faults, black screens, FPS drops, power, VRM and cooling issues. Complete PC pickup, free initial assessment and 30-day warranty.', 
        canonicalUrl: 'https://www.computerrepairkuwait.com/gaming-pc-repair-kuwait', locale: 'en_KW', alternates: { 'en-KW': 'https://www.computerrepairkuwait.com/gaming-pc-repair-kuwait', 'ar-KW': 'https://www.computerrepairkuwait.com/ar/gaming-pc-repair-kuwait', 'x-default': 'https://www.computerrepairkuwait.com/gaming-pc-repair-kuwait' }, 
        ogType: 'website', 
        schemaTypes: ['Service', 'FAQPage'], lastModified: '2026-10-28T00:00:00+03:00' 
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
      title: 'Gaming Laptop Cleaning & Thermal Repaste Kuwait', primaryKeyword: "gaming laptop cleaning Kuwait", secondaryKeywords: ["gaming laptop thermal paste replacement","gaming laptop overheating fix","gaming laptop fan cleaning Kuwait"],
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
        locale: 'en_KW',
        alternates: { 'en-KW': 'https://www.computerrepairkuwait.com/gaming-laptop-cleaning-kuwait', 'ar-KW': 'https://www.computerrepairkuwait.com/ar/gaming-laptop-cleaning-kuwait', 'x-default': 'https://www.computerrepairkuwait.com/gaming-laptop-cleaning-kuwait' },
        lastModified: '2026-11-01T00:00:00+03:00',
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
      title: 'Motherboard Repair Kuwait', primaryKeyword: "motherboard repair Kuwait", secondaryKeywords: ["laptop motherboard repair Kuwait","computer motherboard repair Kuwait","desktop motherboard repair Kuwait","MacBook logic board repair Kuwait","component-level motherboard repair","motherboard chip-level repair Kuwait"], 
      iconKey: 'cpu', 
      shortDescription: 'Laptop, desktop, and MacBook motherboard repair for power, charging, and component-level board faults where repair is suitable.',
      description: 'A laptop that\'s completely dead, one that shuts off randomly during normal use, or one a retail shop already quoted a "full motherboard replacement" for — these are the cases where component-level repair can be useful. We use a multimeter, thermal camera and boardview schematics to trace the fault to a component such as a shorted MOSFET, blown fuse, degraded capacitor or corroded trace, and repair the original board when technically practical. Repairing the original board can avoid an unnecessary board swap, but it does not guarantee that stored data will remain accessible; the result depends on the device design, storage condition and extent of damage.',
      idealCustomer: 'Users with completely dead or liquid-damaged devices who have been told by standard retail shops that their laptop is "unfixable" and want to save up to 80% versus a full board replacement.',
      deviceTypes: [
        'Windows Laptop Motherboards (Dell, HP, Lenovo, ASUS, Acer, MSI)',
        'MacBook Logic Boards (Intel & Apple Silicon)',
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
        { title: 'Original-Board Repair Where Feasible', description: 'Repairing the original board can avoid an unnecessary board swap and may help retain access to stored data. Data access still depends on the device design, storage condition and fault, so it cannot be guaranteed.' },
        { title: 'ESD-Safe Laboratory', description: 'All board-level work happens on grounded, static-controlled workstations at our Hawalli lab: Ibn Khaldoun Street, Al Mullah Complex, Basement Shop 19. Free pickup and delivery are available across Kuwait.' },
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
          { metric: 'Data Preservation', outcome: 'Repairing the original board can help avoid an unnecessary board swap. Whether stored data remains accessible depends on the device design and fault; no data-preservation or recovery outcome is guaranteed.' },
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
            outcome: 'In this representative scenario, the laptop returned to function and stored data remained accessible. This individual outcome is not a guarantee; data access depends on the condition of the device and storage.'
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
          answer: 'Often, yes. Most repair counters only carry one solution for a dead board: full replacement. We trace the fault to the specific failed component first — "needs replacement" from a shop that doesn\'t do chip-level work usually means beyond their repair model, not beyond repair entirely. Repairing the original board may help retain data access, but data preservation is not guaranteed.'
        },
        {
          id: 'faq-motherboard-data-loss',
          title: 'Will I lose my data during motherboard repair?',
          answer: 'Not necessarily, but we cannot guarantee that files will remain accessible. Repairing the original board where technically possible may avoid an unnecessary board replacement, yet the result depends on the device design, the extent of the damage and the storage condition. Back up important files whenever possible. KCROC does not provide standalone data recovery.'
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
        title: 'Laptop Motherboard Repair Kuwait | MacBook Logic Board | KCROC', 
        description: 'Laptop, desktop and MacBook logic board repair in Kuwait. Selected component repairs start from 25 KWD, with free diagnosis, pickup and delivery, and a 30-day warranty.', 
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
      title: 'Laptop Screen Repair Kuwait', primaryKeyword: "laptop screen repair Kuwait", secondaryKeywords: ["laptop screen replacement Kuwait","cracked laptop display repair","laptop black screen diagnosis","laptop screen replacement price Kuwait","laptop display replacement cost Kuwait"],
      iconKey: 'monitor',
      shortDescription: 'Repair for cracked, black, flickering or lined laptop screens in Kuwait. We check the panel, display cable and backlight before recommending replacement.',
      description: 'A cracked panel, vertical lines, a black display or flicker does not always mean the panel itself has failed. We check the display panel, cable, connector and backlight path, then confirm compatible options, total price and turnaround before any paid work. Repairs are completed in our Hawalli lab, with free pickup and delivery across Kuwait.',
      idealCustomer: 'Laptop owners in Kuwait with a cracked, flickering, lined or blank display who want the fault checked and a model-matched repair quote before authorizing work.',
      deviceTypes: [
        'Windows laptops with Full HD and IPS displays',
        'Gaming laptops with model-supported high-refresh displays',
        'QHD and 16:10 laptop display panels',
        '2-in-1 / convertible touchscreen laptops'
      ],
      repairLevel: 'panel-cable-backlight-diagnostics',
      estimatedTurnaround: 'Same day when the correct panel is available',
      pricing: { startingFrom: 30, currency: 'KWD', quoteRequired: true, displayLabel: 'Labor from 30 KWD + panel' },
      relatedServiceIds: ['srv-laptop', 'srv-hinge'],
      relatedProblemIds: ['problem-cracked-screen', 'problem-black-screen'],
      relatedBrandIds: ['brand-dell', 'brand-hp', 'brand-lenovo', 'brand-asus', 'brand-msi'],
      relatedResourcePaths: [
        { label: 'How to Protect Your Laptop Screen', path: '/blog/how-to-protect-laptop-screen' },
      ],
      coreFeatures: [
        'LCD / IPS / OLED Panel Replacement',
        'Display Cable Repair & Replacement',
        'Touchscreen Digitizer Replacement',
        'Backlight & Backlight Fuse Repair',
        'Free Pick & Drop',
        '30-Day Warranty'
      ],
      brands: ['Dell XPS', 'HP Spectre', 'HP Envy', 'Lenovo ThinkPad', 'Lenovo Legion', 'ASUS ROG', 'MSI', 'Alienware', 'Acer'],
    
      whyChooseUs: [
        { title: 'Display Fault Diagnosed Before Replacement', description: 'Flicker, lines or a black display can come from the panel, cable, connector or backlight circuit. We test the likely cause before recommending a part.' },
        { title: 'Model-Matched Panel Options', description: 'We confirm the exact laptop model and required panel specifications before quoting. Part availability and turnaround are checked for your device rather than assumed.' },
          { title: 'Display Checks Before Return', description: 'After fitting, we check image stability, brightness and visible display defects appropriate to the replacement and device.' },
        { title: 'Free Pickup & Delivery, Kuwait-Wide', description: 'Collected from and returned to your home or office anywhere in Kuwait at no extra cost.' },
        { title: 'Quote Before Paid Repair', description: 'You receive a quote for the confirmed fault, parts and labour before paid work begins. No replacement part is fitted without your approval.' }
      ],
    
      commonIssues: [
        { id: 'cracked-screen', title: 'Cracked or Shattered Screen', severity: 'high', description: 'Physical impact from a drop or closing the lid on an object. The panel itself is replaced; the surrounding bezel and hinge are checked for related damage at the same time.' },
        { id: 'screen-flicker', title: 'Screen Flickering', severity: 'medium', description: 'Flicker may be linked to the panel, cable or connector, especially if it changes when the lid moves. We test the display path before recommending a part.' },
        { id: 'vertical-lines', title: 'Vertical or Horizontal Lines on Display', severity: 'high', description: 'Lines may come from a damaged panel, cable or connector. We check the connection and display path before quoting a panel replacement.' },
        { id: 'black-screen-external-works', title: 'Black Screen, But External Monitor Works', severity: 'high', description: 'Points to the panel or its cable rather than the graphics hardware, since the system is clearly still rendering a display signal correctly.' },
        { id: 'backlight-dim', title: 'Screen Very Dim or Backlight Not Working', severity: 'medium', description: 'A faint image can point to a backlight, fuse, driver or panel fault. We test the display path before recommending replacement.' },
        { id: 'discoloration', title: 'Discoloration or Uneven Tint', severity: 'low', description: 'Can be early-stage backlight degradation or a panel manufacturing fault appearing over time; we confirm which before quoting a replacement.' },
        { id: 'touchscreen-unresponsive', title: 'Touchscreen Not Responding', severity: 'medium', description: 'On 2-in-1 and convertible models, the touch digitizer layer can fail independently of the display panel underneath it.' },
        { id: 'hinge-related-cable-wear', title: 'Flicker That Gets Worse When Opening/Closing the Lid', severity: 'medium', description: 'A flicker that changes with lid movement can indicate display-cable wear near the hinge. We inspect the cable and connectors to confirm the cause.' }
      ],
    
      process: [
        { step: 1, title: 'Free Pickup', description: 'We collect your laptop from your home or office anywhere in Kuwait.' },
        { step: 2, title: 'Panel & Cable Diagnostic', description: 'We confirm whether the fault is the panel, the display cable, or the backlight circuit before quoting anything.' },
        { step: 3, title: 'Confirm the Fault & Quote', description: 'You get a clear, itemized quote before any work starts — no surprise charges for parts that turned out not to be needed.' },
        { step: 4, title: 'Panel or Cable Replacement', description: 'The confirmed panel or cable fault is repaired in our ESD-safe lab, with careful handling of ribbon connectors and model-dependent sensors or display features where the model supports it.' },
        { step: 5, title: 'Calibration & Dead-Pixel Check', description: 'The new display is checked for dead pixels, backlight uniformity, and colour accuracy before reassembly.' },
        { step: 6, title: 'Return with 30-Day Warranty', description: 'We return the device after the agreed repair and final checks, with a 30-day warranty on the panel and labour. The expected turnaround is confirmed with your quote.' }
      ],
    
      performanceOutcomes: {
        disclaimer: 'The outcomes below describe typical results for this repair category, not a guarantee for any specific device — every repair is quoted after its own diagnostic.',
        items: [
          { metric: 'Turnaround', outcome: 'Standard panel replacements may be completed the same day when the correct part is available and collection and diagnosis timing allow. We confirm timing for your model.' },
          { metric: 'Panel vs. Cable Diagnosis', outcome: 'Flickering, lines and black-display symptoms can originate from the cable, connector, backlight or panel. Diagnosis helps avoid replacing a panel when another repair is appropriate.' },
          { metric: 'Price Clarity', outcome: 'Labour starts at 30 KWD plus the panel. The final quote depends on the exact model, panel type and availability; parts and labour are confirmed before paid work.' }
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
            outcome: 'The display returned to normal after the cable was replaced. This illustrates why the fault should be confirmed before pricing a replacement panel.'
          }
        ]
      },
    
      inspectionChecklist: [
        'Panel damage vs. display cable fault isolation',
        'Backlight and backlight fuse test',
        'Dead pixel and uniformity check',
        'Touch digitizer response test (2-in-1 models)',
        'Colour and brightness checks appropriate to the installed laptop panel',
        'Hinge and bezel condition check'
      ],
    
      faqs: [
        { id: 'faq-screen-same-day', title: 'Can screen replacement be done the same day?', answer: 'It may be possible if the correct panel is available and collection, diagnosis and fitting timing allow. We confirm part availability and the expected turnaround for your exact model before you approve the quote.' },
        { id: 'faq-flicker-not-crack', title: 'My screen is flickering but not cracked — is that still a screen problem?', answer: 'Often, yes, but not always the panel itself. Flickering that worsens when opening or closing the lid usually points to a worn display cable near the hinge, which we test for before quoting a full panel replacement.' },
        { id: 'faq-external-monitor-works', title: 'The screen is black but an external monitor works fine — what does that mean?', answer: 'It points to the internal display or its cable rather than the graphics hardware, since the system is clearly still producing a valid display signal.' },
        { id: 'faq-touchscreen-replace', title: 'Can you replace a touchscreen on a 2-in-1 laptop?', answer: 'Yes. The touch digitizer can fail independently of the display panel beneath it, and we diagnose and replace whichever layer is actually at fault.' },
        { id: 'faq-screen-cost', title: 'How much does laptop screen replacement cost?', answer: 'Screen-replacement labor starts from 30 KWD, with the panel priced separately. The complete price depends on the panel size, resolution, display type and exact laptop model.' },
        { id: 'faq-high-refresh-panels', title: 'Can you replace a 144Hz, 165Hz or 240Hz gaming laptop screen?', answer: 'Potentially, if a compatible panel is available for the exact laptop model. We verify the original panel label, resolution, refresh rate, connector and cable layout before confirming compatibility and price.' },
        { id: 'faq-screen-oem', title: 'Do you offer original-manufacturer or compatible screens?', answer: 'Available options depend on the exact laptop model. We explain the quoted part type and price, including the difference between an original-manufacturer part and a compatible replacement, before you approve the work.' },
        { id: 'faq-screen-data-safety', title: 'Is my data safe during a screen replacement?', answer: 'A screen replacement normally does not require accessing the storage drive. We focus on the display repair; let us know before collection if you have specific data-handling preferences.' },
        { id: 'faq-screen-warranty', title: 'Is there a warranty on screen replacements?', answer: 'Yes, 30 days covering the panel and labor.' },
        { id: 'faq-edp-connector', title: 'Do 30-pin and 40-pin display connectors fit every laptop?', answer: 'No. Connector pin count alone does not establish compatibility. We verify the exact laptop model, panel part number, cable and supported specifications before confirming a replacement.' },
        { id: 'faq-backlight-vs-panel', title: 'My screen is very dim — do I need a new panel?', answer: 'Not necessarily. A faint image can involve the backlight, fuse, driver or panel. We test the display path before quoting the part or repair that is actually needed.' }
      ],
    
      warranty: { duration: '30 Days', coverage: 'Screen panel and labor.', noFixNoFee: false },
      contentImages: [
        {
          src: IMAGES.laptopHardware.laptopScreenAssemblyDisassemblyRepair.src,
          alt: IMAGES.laptopHardware.laptopScreenAssemblyDisassemblyRepair.alt,
          width: IMAGES.laptopHardware.laptopScreenAssemblyDisassemblyRepair.width,
          height: IMAGES.laptopHardware.laptopScreenAssemblyDisassemblyRepair.height,
          placement: 'hero',
          caption: 'A laptop screen assembly being inspected to distinguish panel damage from a cable or connector fault.'
        },
        {
          src: IMAGES.laptopHardware.laptopLcdPanelReplacementPart.src,
          alt: IMAGES.laptopHardware.laptopLcdPanelReplacementPart.alt,
          width: IMAGES.laptopHardware.laptopLcdPanelReplacementPart.width,
          height: IMAGES.laptopHardware.laptopLcdPanelReplacementPart.height,
          placement: 'coreFeatures',
          caption: 'A replacement LCD panel example; the compatible specification and availability are checked against the exact laptop model.'
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
        title: 'Laptop Screen Repair Cost Kuwait | Labor from 30 KWD | KCROC',
        description: 'Windows laptop screen repair cost in Kuwait: labor starts from 30 KWD plus the panel. Free pickup, a 30-day warranty and a confirmed quote before paid work.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/laptop-screen-repair-kuwait', locale: 'en_KW', alternates: { 'en-KW': 'https://www.computerrepairkuwait.com/laptop-screen-repair-kuwait', 'ar-KW': 'https://www.computerrepairkuwait.com/ar/laptop-screen-repair-kuwait', 'x-default': 'https://www.computerrepairkuwait.com/laptop-screen-repair-kuwait' },
        ogType: 'article',
        schemaTypes: ['Service', 'FAQPage'],
        lastModified: '2026-10-27T00:00:00+03:00'
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
      title: 'Laptop Battery Replacement Kuwait', primaryKeyword: "laptop battery replacement Kuwait", secondaryKeywords: ["Windows laptop battery replacement Kuwait","laptop battery not charging repair","laptop battery health diagnosis","HP laptop battery replacement Kuwait"], 
      iconKey: 'battery', 
      shortDescription: 'Windows laptop battery testing and replacement in Kuwait. We check battery health and the charging path, then confirm exact model compatibility and part availability before quoting.',
      description: 'A Windows laptop battery that drains quickly, shuts the computer down before reaching 0%, or only works reliably while plugged in can point to battery wear — but a charging adapter, DC jack, USB-C input, internal connector, or motherboard charging circuit can produce similar symptoms. KCROC checks battery condition and charging behaviour before recommending a replacement. We identify the laptop family and exact model or Service Tag, check the battery part number and physical fit, and confirm part availability and the total quote before paid work. For swollen lithium-ion batteries, stop using and charging the device, do not press or puncture the battery, and arrange safe inspection. Repairs are performed at our Hawalli lab, with free pickup and delivery across Kuwait.',
      idealCustomer: 'Students, business professionals, remote workers, developers, designers, and gamers using Windows laptops who notice rapid battery drain, unexpected shutdowns, unreliable charging, or visible battery swelling.',
      deviceTypes: [
        'Windows laptops from Dell, HP, Lenovo, ASUS, Acer, MSI and Microsoft Surface (exact model and part check required)',
        'Business and convertible Windows laptops',
        'Gaming laptops with model-specific internal battery assemblies'
      ],
      repairLevel: 'basic', 
      estimatedTurnaround: 'After model and battery availability confirmation', 
      pricing: { startingFrom: 8, currency: 'KWD', quoteRequired: true, displayLabel: 'Labor from 8 KWD + battery' }, 
      relatedServiceIds: ['srv-laptop', 'srv-charging-port', 'srv-motherboard'],
      relatedProblemIds: ['problem-not-charging', 'problem-no-power', 'problem-slow'],
      relatedBrandIds: ['brand-dell', 'brand-hp', 'brand-lenovo', 'brand-asus', 'brand-acer', 'brand-msi'],
      relatedResourcePaths: [
        { label: 'Laptop Battery Warning Signs', path: '/guides/laptop-battery-warning-signs' },
        { label: 'Laptop Repair Kuwait', path: '/laptop-repair-kuwait' },
        { label: 'MacBook Battery Replacement Kuwait', path: '/macbook-battery-replacement-kuwait' },
      ],
      coreFeatures: [
        'Battery Health & Wear Analysis',
        'Cycle Count Verification',
        'Charging Circuit & Power Delivery Diagnostics',
        'USB-C Power Verification',
        'OEM Battery Replacement',
        'Premium Compatible Battery Installation',
        'Dell, HP, Lenovo, ASUS, Acer, MSI & Microsoft Surface Battery Replacement',
        'Swollen Battery Safe Removal & Disposal',
        'BIOS Battery Verification',
        'Battery Calibration',
        'Thermal Inspection Under Load',
        'Post-Replacement Stress Testing',
        'Free Pick & Drop'
      ], 
      brands: ['Dell', 'HP', 'Lenovo', 'ASUS', 'Acer', 'MSI', 'Microsoft Surface'], 

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
          id: 'windows-battery-health-warning',
          title: 'Windows Battery Health Warning or Failed Battery Test',
          severity: 'medium',
          description: 'A Windows battery report or manufacturer diagnostic may show reduced full-charge capacity or a failed health test. We compare the reading with the laptop model and charging behaviour before recommending a matched battery.'
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
        { step: 1, title: 'Free Pickup', description: 'We collect your Windows laptop from your home or office anywhere in Kuwait, subject to pickup scheduling.' },
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
            id: 'swollen-battery-laptop-chassis',
            title: 'Windows Laptop: Swollen Battery Pressing Against the Chassis',
            symptoms: 'The laptop base or touchpad area appeared raised or no longer sat flush.',
            diagnosis: 'The device was treated as a possible swollen-cell case and inspected without pressing or puncturing the battery.',
            repair: 'The compatible battery was identified by exact model and part number, then replacement was quoted after availability confirmation.',
            outcome: 'The device was only returned after the agreed safety and charging checks were completed.'
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
          answer: 'Timing depends on the exact laptop model, the matching battery part, stock availability, and any additional fault found during inspection. KCROC confirms the expected timeframe after checking those details; completion and return are arranged after the agreed work and verification.'
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
          answer: 'Watch for runtime noticeably shorter than when the laptop was new, sudden shutdowns at a non-zero percentage, a battery health warning or battery-capacity report in Windows, or any visible swelling. Any of these is worth a free diagnostic rather than guessing.'
        },
        {
          id: 'faq-diagnose-before-replace',
          title: 'Do you test battery health before replacing it?',
          answer: 'Always. We measure actual capacity and cycle count against factory spec and test the charging circuit separately, because a battery that tests healthy but still causes symptoms usually means the fault is elsewhere in the power delivery path.'
        },
        {
          id: 'faq-windows-battery-model',
          title: 'Which details do you need to identify my laptop battery?',
          answer: 'Send the laptop brand and exact model name or Service Tag. The model family alone is not enough for safe fitment: battery part numbers, connector positions and capacity can vary within the same product family.'
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
          src: IMAGES.upgrades.laptopBottomChassisBatteryRamOpen.src,
          alt: 'Windows laptop base opened for model-specific battery inspection and replacement',
          width: IMAGES.upgrades.laptopBottomChassisBatteryRamOpen.width,
          height: IMAGES.upgrades.laptopBottomChassisBatteryRamOpen.height,
          placement: 'coreFeatures',
          caption: 'A laptop opened for internal battery and connector inspection before a model-matched replacement.'
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
        title: 'Laptop Battery Replacement Kuwait | Labour from 8 KWD + Battery | KCROC', 
        description: 'Windows laptop battery checks and replacement in Kuwait. Labour starts from 8 KWD plus the model-matched battery price. We test the charging path first, with free Kuwait-wide pickup and a 30-day warranty on covered work.', 
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
    'loc-hawalli': { id: 'loc-hawalli', slug: 'hawalli', entityType: 'Location', isActive: true, isPhysicalLocation: true, title: 'Hawalli Repair Center', description: "Precision micro-soldering, logic-board recovery and hardware repair for MacBooks, gaming PCs and laptops at our Hawalli lab. We fix the board. We don't just swap it. Walk in on Ibn Khaldoun St or book free pickup and delivery across Kuwait.", landmark: 'Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19', coords: { lat: 29.3416921515256, lng: 48.00761257498341 }, serviceRadiusKm: 40, serviceAreas: ['Hawalli', 'Salmiya', 'Kuwait City', 'Farwaniya', 'Ahmadi', 'Jahra', 'Fahaheel', 'Mishref', 'Shuwaikh Residential', 'Abdullah Al-Salem', 'Shamiya', 'Nuzha', 'Adailiya', 'Kaifan', 'Yarmouk', 'Qortuba'], contentImage: { src: IMAGES.brand.shopExteriorDay.src, alt: IMAGES.brand.shopExteriorDay.alt, width: IMAGES.brand.shopExteriorDay.width, height: IMAGES.brand.shopExteriorDay.height, caption: 'Our repair center at Al Mullah Complex, Ibn Khaldoun St, Hawalli.' }, seo: { title: 'Computer Repair Hawalli | Walk-In + Free Pickup | KCROC', description: 'Walk-in laptop, MacBook and PC repair at Al Mullah Complex, Basement Shop 19, Ibn Khaldoun St, Hawalli. Open daily 10 AM–10 PM; free pickup across Kuwait.', canonicalUrl: 'https://www.computerrepairkuwait.com/location/hawalli', alternates: { 'en-KW': 'https://www.computerrepairkuwait.com/location/hawalli', 'ar-KW': 'https://www.computerrepairkuwait.com/ar/computer-repair-hawalli', 'x-default': 'https://www.computerrepairkuwait.com/location/hawalli' }, ogType: 'website', schemaTypes: ['LocalBusiness'], lastModified: '2026-11-05T00:00:00+03:00' }, relatedServiceIds: ['srv-gaming', 'srv-laptop', 'srv-motherboard', 'srv-gaming-laptop-cleaning'], navigationPriority: 100 } as LocationEntity,

    'loc-kuwait-city': {
      id: 'loc-kuwait-city',
      slug: 'kuwait-city',
      entityType: 'Location',
      isActive: true,
      isPhysicalLocation: false,
      heroBadge: 'Kuwait City Office & Home Collection',
      heroHeadline: 'Corporate Laptop & Computer Repair in Kuwait City',
      localServicesHeading: 'Laptop, Screen, Motherboard & MacBook Repair in Kuwait City',
      localIntro: "When a laptop fails in the middle of a workday, leaving a tower office or arranging a trip across downtown is not always practical. KCROC arranges free collection from offices, residences and agreed reception or lobby handover points across Sharq, Qibla, Mirqab, Dasman, Al-Sawaber and Bneid Al-Gar. We record the device at collection, carry out hardware diagnosis and approved repair at our ESD-safe Hawalli workshop, then arrange free return delivery. Share the building name, street, block, floor or suite, contact person and location pin so the collection point and time can be confirmed. Kuwait City is a pickup and delivery service area, not a separate walk-in branch or on-site repair service.",
      localHighlights: [
        {
          title: 'Office-tower and reception collection by arrangement',
          description: 'For offices in Sharq, Qibla and the central business district, send the tower or building name, street, floor or suite and a reception or IT contact. We agree the handover point and collection window with you; building access and reception release must be confirmed before dispatch. Each device is recorded for workshop intake.'
        },
        {
          title: 'Urgent work-device diagnosis, with realistic timing',
          description: 'Tell us when a laptop is needed for a meeting, filing or business deadline. We check the collection and bench schedule, diagnose the actual fault after intake and explain the realistic repair window before paid work begins. Timing depends on the fault, approval and compatible-part availability.'
        },
        {
          title: 'Hardware-only diagnostics and storage choices',
          description: 'Our repair process is hardware-focused; technicians do not browse client documents or personal files as part of normal diagnostics. For supported Windows laptops with a removable NVMe or SATA drive, the owner or IT team can ask about retaining the drive before collection. Confirm the exact model first, and keep a separate backup: board or liquid damage can affect data, and preservation cannot be guaranteed.'
        },
        {
          title: 'Capital district coverage and postal references',
          description: 'Collection covers Sharq (15300), Al-Sawaber (15300), Qibla / Jibla (14000), Safat (10002), Mirqab (15000), Dasman (15400) and Bneid Al-Gar (35020). Pickup can be coordinated around Ahmad Al-Jaber Street, Fahad Al-Salem Street, Soor Street, Gulf Road and Istiqlal Street. Share your block and exact pin because block-level postal references can differ.'
        },
        {
          title: 'One repair lab, clear accountability',
          description: 'All physical diagnostics and repairs are completed at KCROC’s Hawalli workshop: Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19. The service-area page does not imply a downtown counter. Pickup and return delivery are free, initial diagnostics are free, and completed repairs carry a 30-day warranty.'
        }
      ],
      localServiceCards: [
        {
          title: 'Business & Executive Laptop Repair',
          problem: 'A ThinkPad, Dell Latitude or XPS, HP EliteBook or other work laptop will not start, loses USB-C charging, overheats or develops a loose hinge during a busy workday.',
          expertise: 'We inspect the power and charging path, connectors, display and board symptoms to identify whether the fault is a replaceable part, a damaged connector or a component-level motherboard issue.',
          solution: 'Arrange free office or home collection in Kuwait City. We diagnose at the Hawalli lab, provide a clear quote before paid work and return the tested device with a 30-day warranty on completed repairs.',
          serviceIds: ['srv-laptop']
        },
        {
          title: 'Laptop Screen Repair & Black-Display Diagnosis',
          problem: 'A cracked panel, flickering display, vertical lines or a black screen can interrupt a presentation or leave a workstation unusable.',
          expertise: 'We check the panel, display cable, connector and backlight path before recommending a screen replacement, so a board or cable fault is not mistaken for a broken panel.',
          solution: 'Screen-replacement labour starts from 30 KWD plus the model-matched panel. We confirm compatibility, total price and expected timing before work begins.',
          serviceIds: ['srv-screen']
        },
        {
          title: 'Component-Level Motherboard Repair',
          problem: 'A laptop or desktop has no power, shuts down unexpectedly, has a charging fault or has suffered liquid exposure.',
          expertise: 'Bench diagnosis traces the affected power and board circuits. Where the board is technically repairable, we assess component-level repair before recommending a complete board replacement.',
          solution: 'Motherboard component repair starts from 25 KWD, with the final quote based on the fault and board condition. No Fix, No Fee applies when a viable repair cannot be completed under the service terms.',
          serviceIds: ['srv-motherboard']
        },
        {
          title: 'MacBook Air & MacBook Pro Repair',
          problem: 'A MacBook will not power on, will not charge over USB-C or MagSafe, has a black or damaged display, or has suffered liquid damage.',
          expertise: 'We assess the model and logic-board fault first, then consider component-level repair where technically suitable. A board repair is not a data-recovery guarantee, particularly after liquid or storage-related damage.',
          solution: 'MacBook board-level repair is listed from 45 KWD, with complex work and parts quoted after diagnosis. Free Kuwait City collection and return delivery can be arranged.',
          serviceIds: ['srv-macbook']
        }
      ],
      localFaqs: [
        {
          id: 'faq-kuwait-city-local-1',
          question: 'Can you collect a laptop directly from my Kuwait City office, tower or reception?',
          answer: 'Yes. Free pickup and return delivery can be arranged from offices and residences in Kuwait City. Send the tower or building name, street, block, floor or suite, a contact person and your location pin on WhatsApp. We will confirm the collection window and an agreed handover point, such as your office, IT desk or reception where building access permits. The device is recorded for workshop intake and repaired at our Hawalli lab; we do not carry out repairs inside the office.'
        },
        {
          id: 'faq-kuwait-city-local-2',
          question: 'Do you have a walk-in computer repair shop in Kuwait City?',
          answer: 'No. KCROC’s physical repair workshop is in Hawalli at Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19. Kuwait City is a free pickup and delivery service area, not a separate downtown branch. We collect your device from an agreed office or residential handover point, diagnose and repair it at the Hawalli lab, then arrange its return.'
        },
        {
          id: 'faq-kuwait-city-local-3',
          question: 'My laptop will not turn on before an important meeting. What should I check?',
          answer: 'Check that the wall outlet works and, if available, test with a known-good compatible charger. Disconnect the docking station, USB devices and external displays, then hold the power button for about 15 seconds before trying once more. If liquid was spilled, you notice unusual heat or a burning smell, stop and do not keep trying to power it on. Message KCROC with the model and symptoms so we can arrange collection.'
        },
        {
          id: 'faq-kuwait-city-local-4',
          question: 'I need the laptop back urgently for work. How quickly can you diagnose and repair it?',
          answer: 'Tell us the business deadline when arranging pickup so we can check the collection and bench schedule. Many routine repairs are completed within 24–48 hours after the device reaches the lab. Some screen or battery jobs may be completed the same day when the compatible part is in stock; component-level motherboard work can take 24–72 hours or longer depending on the fault. We confirm a realistic estimate after diagnosis rather than promising the same turnaround for every device.'
        },
        {
          id: 'faq-kuwait-city-local-5',
          question: 'My laptop powers on but the screen stays black. Can you diagnose it?',
          answer: 'Yes. A black display can be caused by the panel, display cable or connector, backlight circuit, or another board-level fault. We test the relevant display and hardware paths at the Hawalli lab before recommending a panel replacement or board repair. You receive the findings and quote before paid work begins.'
        },
        {
          id: 'faq-kuwait-city-local-6',
          question: 'I dropped my laptop and cracked the screen. Could anything else be damaged?',
          answer: 'Yes. A drop can also affect the hinge mounts, display bezel or frame, display cable and internal connectors. We inspect the screen assembly and related hardware before quoting, so the proposed repair reflects the damage found rather than assuming the panel is the only affected part.'
        },
        {
          id: 'faq-kuwait-city-local-7',
          question: 'How much does laptop or MacBook repair cost for Kuwait City customers?',
          answer: 'Initial diagnostics and pickup and return delivery are free. Selected common laptop repairs start from 15 KWD; charging-port repair is listed at 20–35 KWD; screen-replacement labour starts from 30 KWD plus the panel; motherboard component repair starts from 25 KWD; and MacBook board-level repair starts from 45 KWD. The exact total depends on the model, fault, parts and repair complexity. We provide a quote before paid work begins.'
        },
        {
          id: 'faq-kuwait-city-local-8',
          question: 'How do you protect confidential business files, and can our IT team remove the SSD?',
          answer: 'Our normal diagnostics are hardware-focused and technicians do not browse customer documents or personal files. For a supported Windows laptop with an accessible removable NVMe or SATA SSD, the owner or IT administrator can ask us about retaining the drive before collection; confirm the exact model with us first. Some devices, including many MacBooks, use onboard storage that is not a removable NVMe module. Hardware repair is not a backup or data-recovery guarantee, so keep a separate backup whenever possible.'
        },
        {
          id: 'faq-kuwait-city-local-9',
          question: 'Which Kuwait City districts and business areas do you collect from?',
          answer: 'Free pickup and return delivery can be arranged across Kuwait City, including Sharq, Al-Sawaber, Qibla / Jibla, Safat, Mirqab, Dasman and Bneid Al-Gar. General area postal references include Sharq and Al-Sawaber 15300, Qibla 14000, Safat 10002, Mirqab 15000, Dasman 15400 and Bneid Al-Gar 35020. Please share your block, building and location pin so we can confirm the precise handover point.'
        },
        {
          id: 'faq-kuwait-city-local-10',
          question: 'What happens if the laptop motherboard cannot be repaired?',
          answer: 'If our diagnosis finds that a repair is not technically viable or is not economical, KCROC’s No Fix, No Fee policy means you do not pay a repair charge, and we arrange free return delivery. We explain the diagnosis and available options before any paid work begins.'
        }
      ],
      title: 'Kuwait City',
      description: 'Corporate laptop, computer and MacBook repair for Kuwait City offices and residents, with free office and home pickup and component-level diagnostics at KCROC’s Hawalli lab.',
      landmark: 'Kuwait City pickup and delivery service area; all physical repairs are completed at KCROC’s Hawalli workshop: Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19',
      coords: { lat: 29.3759, lng: 47.9774 },
      serviceRadiusKm: 15,
      serviceAreas: ['Kuwait City', 'Sharq', 'Al-Sawaber', 'Qibla', 'Safat', 'Mirqab', 'Dasman', 'Bneid Al-Gar'],
      areaPostalRegion: 'Al Asimah Governorate',
      additionalAreaPostalCodes: [
        { name: 'Sharq', postalCode: '15300' },
        { name: 'Al-Sawaber', postalCode: '15300' },
        { name: 'Qibla / Jibla', postalCode: '14000' },
        { name: 'Safat', postalCode: '10002' },
        { name: 'Mirqab', postalCode: '15000' },
        { name: 'Dasman', postalCode: '15400' },
        { name: 'Bneid Al-Gar', postalCode: '35020' }
      ],
      serviceTypes: [
        'Corporate laptop repair',
        'Laptop and MacBook repair',
        'Laptop screen and charging repair',
        'Component-level motherboard repair'
      ],
      relatedProblemIds: ['problem-no-power', 'problem-black-screen', 'problem-not-charging', 'problem-cracked-screen', 'problem-freezing-crashing'],
      contentImage: {
        src: IMAGES.brand.technicians.src,
        alt: IMAGES.brand.technicians.alt,
        width: IMAGES.brand.technicians.width,
        height: IMAGES.brand.technicians.height,
        caption: 'KCROC technicians performing component-level laptop repair for Kuwait City customers.'
      },
      seo: {
        title: 'Computer Repair Kuwait City | Laptop & MacBook | KCROC',
        description: 'Laptop, MacBook and motherboard repair for Kuwait City offices and homes. Free pickup in Sharq, Qibla, Mirqab, Dasman and Bneid Al-Gar; repaired at our Hawalli lab.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/location/kuwait-city',
        alternates: {
          'en-KW': 'https://www.computerrepairkuwait.com/location/kuwait-city',
          'ar-KW': 'https://www.computerrepairkuwait.com/ar/computer-repair-kuwait-city',
          'x-default': 'https://www.computerrepairkuwait.com/location/kuwait-city'
        },
        ogType: 'website',
        schemaTypes: ['LocalBusiness'],
        lastModified: '2026-11-05T00:00:00+03:00'
      },
      relatedServiceIds: ['srv-laptop', 'srv-screen', 'srv-motherboard', 'srv-macbook'],
      navigationPriority: 95
    } as LocationEntity,
    
    'loc-salmiya': {
      id: 'loc-salmiya',
      slug: 'salmiya',
      entityType: 'Location',
      isActive: true,
      isPhysicalLocation: false,
      heroBadge: 'Salmiya · Bidaa · Salwa Free Pickup',
      heroHeadline: 'Computer, MacBook & Gaming PC Repair in Salmiya',
      localValueHeading: 'From Salmiya Doorstep to KCROC’s Own Hawalli Repair Lab',
      localServicesHeading: 'Seven Specialist Repair Services for Salmiya, Bidaa & Salwa',
      localIntro: "A liquid spill, dead MacBook or gaming PC black screen needs a diagnosis—not a guess. KCROC arranges free collection from Salmiya, Al-Bidaa and Salwa, then carries out the inspection and approved repair at our own ESD-safe workshop in Hawalli (Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19). A retail drop-off counter is not the same as the bench where component-level work is performed: with KCROC, your device is collected for direct intake at the lab that diagnoses and repairs it. We inspect the original board and cooling system first, explain what we find, and provide the quote before paid work begins. The coastal pickup area includes Salmiya Blocks 1–12, Al-Bidaa Blocks 1–10 and Salwa Blocks 1–12. We do not operate a separate Salmiya branch or provide on-site repairs.",
      localEmergencyProtocol: {
        heading: 'Liquid spill? Take these three steps before collection',
        intro: 'Liquid can reach the keyboard, connectors and motherboard even when the laptop still appears to work. Repeated power-on tests can make the damage worse.',
        steps: [
          {
            title: 'Disconnect power and shut down',
            description: 'Unplug the charger and connected accessories. If the laptop is still on and it is safe to do so, shut it down immediately. Do not keep pressing the power button or reconnect the charger.'
          },
          {
            title: 'Keep it off—no rice, heat or testing',
            description: 'Do not try to boot or charge it, and do not use a hairdryer, heater, rice or compressed air. Do not open the case to reach an internal battery; leave internal handling to the technician.'
          },
          {
            title: 'Tell us what spilled and arrange pickup',
            description: 'Send the device model, liquid type, approximate spill time and current symptoms on WhatsApp. Keep the laptop powered off while waiting for collection.'
          }
        ]
      },
      localPricingAnchors: [
        {
          label: 'Initial hardware diagnostic',
          price: 'FREE',
          note: 'No charge for the initial diagnosis; approve the quote before paid work.'
        },
        {
          label: 'Laptop thermal service',
          price: '15–20 KWD',
          note: 'Cleaning and thermal-interface service; model and scope are confirmed first.'
        },
        {
          label: 'Motherboard component repair',
          price: 'From 25 KWD',
          note: 'Published range 25–60 KWD; the exact quote depends on the board fault.'
        },
        {
          label: 'Liquid-damage repair',
          price: '35–90+ KWD',
          note: 'Depends on affected areas, corrosion and the repair required.'
        }
      ],
      localHighlights: [
        {
          title: 'Direct collection to the lab that does the repair',
          description: 'Arrange pickup from your apartment, villa, campus or office. KCROC records the device for workshop intake, then performs diagnosis and approved repair at the Hawalli laboratory—not at a Salmiya storefront or as an on-site visit.'
        },
        {
          title: 'Coastal block coverage with address-level detail',
          description: 'Salmiya general area 20000, Blocks 1–12: 20001–20012; Al-Bidaa general area 25000, Blocks 1–10: 25001–25010; Salwa general area 25600, Blocks 1–12: 25601–25612. Share your block, street and map pin to confirm the handover point.'
        },
        {
          title: 'Local collection landmarks across the coastal strip',
          description: 'Pickup can be arranged around Salem Al-Mubarak Street, Hamad Al-Mubarak Street, Baghdad Street, Amman Street and Gulf Road, including the Marina Mall area, Boulevard and American University of Kuwait (AUK) areas. Tell us the exact block and building rather than relying on a broad landmark alone.'
        },
        {
          title: 'Liquid-damage and original-board assessment',
          description: 'We isolate power, inspect for residue and corrosion, and select a board-cleaning method suited to the device. Where the fault is repairable, microscope inspection and component-level work can avoid an unnecessary full-board swap; neither repairability nor data recovery can be promised before inspection.'
        },
        {
          title: 'Gaming cooling and GPU diagnostics',
          description: 'For gaming laptops, we inspect fans, heatsinks, airflow and thermal-interface condition; materials such as Honeywell PTM7950 or Arctic MX-6 may be selected where the device design calls for them. For complete gaming desktops, we diagnose GPU/VRAM behaviour, power delivery, cooling and stability under suitable testing.'
        },
        {
          title: 'Hardware-first privacy and removable-storage option',
          description: 'Normal hardware diagnostics focus on the device rather than browsing personal files. For supported Windows laptops and desktops with removable NVMe or SATA storage, ask before collection about retaining the drive. Many MacBooks use onboard storage, and hardware work cannot guarantee that damaged data will remain accessible.'
        }
      ],
      localServiceCards: [
        {
          title: 'Laptop Liquid-Damage & Corrosion Recovery',
          problem: 'Water, coffee, tea or karak is spilled on the keyboard, followed by sticky keys, charging trouble, a black screen or sudden loss of power.',
          expertise: 'We isolate power, inspect the keyboard and board for residue or corrosion, and choose a cleaning method appropriate to the affected assembly, including ultrasonic PCB cleaning where the board and materials permit it. Microscope inspection, trace repair and component-level micro-soldering are considered where the board condition makes them viable.',
          solution: 'Free initial diagnosis and a quote before paid work. Published liquid-damage repair is 35–90+ KWD depending on the spread of damage; keeping the device powered off gives the board the best chance of assessment before further electrical damage.',
          serviceIds: ['srv-liquid-damage']
        },
        {
          title: 'MacBook Air & MacBook Pro Repair',
          problem: 'A MacBook will not turn on, has USB-C or MagSafe charging problems, shows a black display, or has suffered a liquid spill.',
          expertise: 'We assess the Intel or Apple Silicon model, charging path, display symptoms and logic-board condition, then consider component-level repair where technically suitable rather than automatically recommending a complete board swap.',
          solution: 'MacBook board-level repair is listed at 45–100+ KWD. The final quote depends on the model and fault; data access or preservation is not guaranteed, especially after liquid damage.',
          serviceIds: ['srv-macbook']
        },
        {
          title: 'Component-Level Motherboard Repair',
          problem: 'A laptop or desktop has no power, shuts down under load, has a shorted power rail, or has already been described as beyond repair.',
          expertise: 'We diagnose the original board using circuit-level testing and microscope inspection, checking the affected power path and components before deciding whether micro-soldering or another repair is viable.',
          solution: 'Motherboard component repair starts from 25 KWD, with a published 25–60 KWD range for common component-level work. You receive the diagnosis and quote before approval; No Fix, No Fee applies under KCROC’s service terms.',
          serviceIds: ['srv-motherboard']
        },
        {
          title: 'Gaming PC & GPU Hardware Diagnostics',
          problem: 'A complete gaming desktop black-screens under load, restarts, overheats, loses performance or fails to POST.',
          expertise: 'We assess the complete tower, including GPU and VRAM behaviour, power delivery, memory, motherboard, PSU and cooling. We reproduce the symptom under a suitable workload rather than assuming the graphics card is the cause.',
          solution: 'Free initial assessment and a quote before paid work. Free pickup and return delivery can be arranged for complete desktop towers; individual graphics cards are not accepted as standalone repair jobs.',
          serviceIds: ['srv-gaming']
        },
        {
          title: 'Gaming Laptop Cleaning & Thermal Repaste',
          problem: 'ASUS ROG/TUF, Lenovo Legion, MSI, Acer Predator, Alienware or another gaming laptop runs hot, has loud fans, throttles or shuts down during gaming.',
          expertise: 'We inspect fans, heatsinks, dust restriction, mounting and thermal-pad condition. Thermal materials such as Honeywell PTM7950 or Arctic MX-6 are selected only where they suit the model; pads and putty are matched to the required thickness.',
          solution: 'Laptop thermal service is published at 15–20 KWD. We confirm the scope first and test the cooling system under load after reassembly; we do not promise a fixed temperature or FPS increase.',
          serviceIds: ['srv-gaming-laptop-cleaning']
        },
        {
          title: 'Laptop Repair for Power, Charging & Everyday Faults',
          problem: 'A laptop will not start, charges intermittently, has a loose port, hinge damage or another fault that interrupts work or study.',
          expertise: 'We test the adapter, connector, charging path, battery and relevant board circuits before recommending a port, part or component-level repair. The linked charging-port service covers DC-jack and USB-C faults.',
          solution: 'Free pickup from Salmiya, Bidaa and Salwa, free initial diagnosis and a clear quote before paid work. Charging-port repair is listed at 20–35 KWD, depending on the model and fault.',
          serviceIds: ['srv-laptop', 'srv-charging-port']
        },
        {
          title: 'Laptop Screen Repair & Black-Display Diagnosis',
          problem: 'A laptop has a cracked display, vertical lines, flicker, or a black screen while the power light or fans still operate.',
          expertise: 'We check the panel, display cable, connector and backlight path before recommending a replacement, so a board or cable fault is not mistaken for a damaged panel.',
          solution: 'Screen replacement labour starts from 30 KWD plus the model-matched panel. We confirm compatibility, total price and expected timing before any paid work begins.',
          serviceIds: ['srv-screen']
        }
      ],
      localFaqs: [
        {
          id: 'faq-salmiya-local-1',
          question: 'I spilled water or coffee on my laptop in Salmiya. What should I do right now?',
          answer: 'Unplug the charger and connected accessories, and shut the laptop down immediately if it is still on. Keep it powered off—do not test it, reconnect the charger, use rice, apply heat or blow compressed air into it. Do not open the case to reach the internal battery. Message KCROC with the device model, liquid type and approximate spill time so we can arrange free collection and inspect it at the Hawalli lab.'
        },
        {
          id: 'faq-salmiya-local-2',
          question: 'Can a MacBook with liquid damage be repaired without replacing the whole logic board?',
          answer: 'Sometimes. We inspect the original logic board for contamination, corrosion, damaged traces and failed components, then assess whether cleaning and component-level repair are technically viable. The result depends on how far the liquid travelled and what was damaged. We do not promise that every board can be saved or that data will remain accessible; keep the MacBook powered off and let us inspect it before trying to start it again.'
        },
        {
          id: 'faq-salmiya-local-3',
          question: 'How much does laptop, MacBook or motherboard repair cost for Salmiya customers?',
          answer: 'Initial hardware diagnostics and pickup and return delivery are free. Published prices include laptop thermal service at 15–20 KWD, motherboard component repair from 25 KWD (published range 25–60 KWD), liquid-damage repair at 35–90+ KWD, MacBook board-level repair at 45–100+ KWD, charging-port repair at 20–35 KWD, and screen-replacement labour from 30 KWD plus the panel. The final quote depends on the model, fault, part and repair complexity; paid work starts only after you approve it.'
        },
        {
          id: 'faq-salmiya-local-4',
          question: 'Do you offer free pickup from Salmiya, Al-Bidaa and Salwa?',
          answer: 'Yes. Free pickup and return delivery can be arranged across Salmiya Blocks 1–12, Al-Bidaa Blocks 1–10 and Salwa Blocks 1–12. General area postal references are Salmiya 20000, Al-Bidaa 25000 and Salwa 25600; block-specific street codes are 20001–20012, 25001–25010 and 25601–25612 respectively. Send your block, building and map pin so we can confirm the collection point.'
        },
        {
          id: 'faq-salmiya-local-5',
          question: 'Will my files be safe if you repair the motherboard?',
          answer: 'Our normal hardware diagnostics focus on the hardware and do not require browsing personal documents. Repairing the original board can avoid an unnecessary board swap, but liquid damage or a failed storage circuit can still affect data, so we cannot guarantee file access or recovery. For a compatible Windows laptop or desktop with a removable NVMe or SATA drive, ask before collection about removing and keeping it. Many MacBooks have onboard storage that is not a removable NVMe module.'
        },
        {
          id: 'faq-salmiya-local-6',
          question: 'Can you fix a gaming laptop or gaming PC that overheats, runs loud fans or black-screens?',
          answer: 'Yes. For gaming laptops we inspect airflow, fans, heatsinks, thermal-interface condition and thermal-pad fit, then test under load after service. Honeywell PTM7950 or Arctic MX-6 may be used where appropriate for the device design. For complete gaming desktop towers, we diagnose GPU/VRAM behaviour, power delivery, cooling and stability. We confirm the repair path after assessment rather than assuming every black screen is a failed GPU.'
        },
        {
          id: 'faq-salmiya-local-7',
          question: 'How long does a repair take for Salmiya customers?',
          answer: 'Timing depends on the fault, the work approved and parts availability. The published typical turnaround for liquid-damage repair is 24–72 hours; other repairs may be shorter or longer depending on diagnosis and testing. We provide a realistic estimate after the device reaches the lab and has been inspected. We do not promise a fixed collection window or same-day completion for every device.'
        },
        {
          id: 'faq-salmiya-local-8',
          question: 'Can I get a fixed quote, and what happens if the device cannot be repaired?',
          answer: 'Yes. Initial diagnostics are free, and we explain the findings and quote before any paid repair work begins. You can decline the quote. Under KCROC’s No Fix, No Fee policy, if the repair cannot be completed under the applicable service terms, you do not pay a repair charge and free return delivery is arranged.'
        },
        {
          id: 'faq-salmiya-local-9',
          question: 'Do you have a walk-in laptop repair shop in Salmiya?',
          answer: 'KCROC does not operate a separate walk-in branch in Salmiya. We arrange free collection from your home, office or agreed building handover point and carry out the diagnosis and approved repair at our own Hawalli workshop. You can also visit the physical workshop at Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19, Hawalli.'
        },
        {
          id: 'faq-salmiya-local-10',
          question: 'Where is my device actually repaired, and can I drop it off myself?',
          answer: 'All physical diagnostics and repairs are completed at KCROC’s Hawalli workshop: Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19. The workshop is open daily from 10:00 AM to 10:00 PM. Salmiya, Bidaa and Salwa are pickup and delivery service areas, not separate KCROC branches; you are welcome to bring a device directly to the Hawalli workshop.'
        }
      ],
      title: 'Salmiya',
      description: 'Dead MacBook, liquid spill, or a motherboard another shop called beyond repair? KCROC assesses the original board at component level, with free pickup from Salmiya, Bidaa and Salwa and approved repairs completed at our Hawalli lab. We fix the board where repair is technically viable; we do not promise every device can be saved.',
      landmark: 'Salmiya, Al-Bidaa and Salwa pickup and delivery service area; all physical repairs are completed at KCROC’s Hawalli workshop: Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19',
      coords: { lat: 29.3400, lng: 48.0800 },
      serviceRadiusKm: 15,
      serviceAreas: ['Salmiya', 'Bidaa', 'Salwa'],
      areaPostalCode: '20000',
      areaPostalRegion: 'Hawalli Governorate',
      additionalAreaPostalCodes: [
        { name: 'Al-Bidaa', postalCode: '25000' },
        { name: 'Salwa', postalCode: '25600' },
        { name: 'Salmiya Block 1', postalCode: '20001' },
        { name: 'Salmiya Block 2', postalCode: '20002' },
        { name: 'Salmiya Block 3', postalCode: '20003' },
        { name: 'Salmiya Block 4', postalCode: '20004' },
        { name: 'Salmiya Block 5', postalCode: '20005' },
        { name: 'Salmiya Block 6', postalCode: '20006' },
        { name: 'Salmiya Block 7', postalCode: '20007' },
        { name: 'Salmiya Block 8', postalCode: '20008' },
        { name: 'Salmiya Block 9', postalCode: '20009' },
        { name: 'Salmiya Block 10', postalCode: '20010' },
        { name: 'Salmiya Block 11', postalCode: '20011' },
        { name: 'Salmiya Block 12', postalCode: '20012' },
        { name: 'Al-Bidaa Block 1', postalCode: '25001' },
        { name: 'Al-Bidaa Block 2', postalCode: '25002' },
        { name: 'Al-Bidaa Block 3', postalCode: '25003' },
        { name: 'Al-Bidaa Block 4', postalCode: '25004' },
        { name: 'Al-Bidaa Block 5', postalCode: '25005' },
        { name: 'Al-Bidaa Block 6', postalCode: '25006' },
        { name: 'Al-Bidaa Block 7', postalCode: '25007' },
        { name: 'Al-Bidaa Block 8', postalCode: '25008' },
        { name: 'Al-Bidaa Block 9', postalCode: '25009' },
        { name: 'Al-Bidaa Block 10', postalCode: '25010' },
        { name: 'Salwa Block 1', postalCode: '25601' },
        { name: 'Salwa Block 2', postalCode: '25602' },
        { name: 'Salwa Block 3', postalCode: '25603' },
        { name: 'Salwa Block 4', postalCode: '25604' },
        { name: 'Salwa Block 5', postalCode: '25605' },
        { name: 'Salwa Block 6', postalCode: '25606' },
        { name: 'Salwa Block 7', postalCode: '25607' },
        { name: 'Salwa Block 8', postalCode: '25608' },
        { name: 'Salwa Block 9', postalCode: '25609' },
        { name: 'Salwa Block 10', postalCode: '25610' },
        { name: 'Salwa Block 11', postalCode: '25611' },
        { name: 'Salwa Block 12', postalCode: '25612' }
      ],
      serviceTypes: [
        'Laptop and MacBook liquid-damage assessment and component-level repair',
        'MacBook logic-board and charging diagnostics',
        'Laptop and desktop motherboard repair',
        'Gaming PC GPU, power and stability diagnostics',
        'Gaming laptop cooling-system cleaning and thermal service',
        'Laptop screen, power and charging repair'
      ],
      relatedServiceIds: ['srv-laptop', 'srv-liquid-damage', 'srv-macbook', 'srv-motherboard', 'srv-gaming', 'srv-gaming-laptop-cleaning', 'srv-screen'],
      relatedProblemIds: ['problem-liquid-spill', 'problem-not-charging', 'problem-no-power', 'problem-black-screen', 'problem-overheating'],
      relatedLocationIds: ['loc-hawalli', 'loc-rumaithiya', 'loc-nuzha', 'loc-kuwait-city', 'loc-surra'],
      contentImage: {
        src: IMAGES.services.laptopRepair.src,
        alt: IMAGES.services.laptopRepair.alt,
        width: IMAGES.services.laptopRepair.width,
        height: IMAGES.services.laptopRepair.height,
        caption: 'Component-level laptop, MacBook and gaming hardware assessment for Salmiya customers.'
      },
      seo: {
        title: 'Computer, MacBook & Gaming PC Repair Salmiya | KCROC',
        description: 'Liquid-damage, MacBook logic-board and gaming PC/laptop repair in Salmiya, Bidaa and Salwa. Free pickup and diagnostics; repairs at our Hawalli lab.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/location/salmiya',
        alternates: {
          'en-KW': 'https://www.computerrepairkuwait.com/location/salmiya',
          'ar-KW': 'https://www.computerrepairkuwait.com/ar/computer-repair-salmiya',
          'x-default': 'https://www.computerrepairkuwait.com/location/salmiya'
        },
        ogType: 'website',
        schemaTypes: ['LocalBusiness'],
        lastModified: '2026-11-05T00:00:00+03:00'
      },
      navigationPriority: 90
    } as LocationEntity,

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
      ], landmark: 'Mobile Dispatch Area (Equipment processed at our central Hawalli workshop: Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19)', coords: { lat: 29.2770, lng: 47.9590 }, serviceRadiusKm: 20, serviceAreas: ['Farwaniya', 'Khaitan', 'Riggae', 'Ardiya', 'Jleeb Al-Shuyoukh'], relatedServiceIds: ['srv-laptop', 'srv-charging-port', 'srv-screen', 'srv-battery', 'srv-motherboard'], relatedProblemIds: ['problem-no-power', 'problem-not-charging', 'problem-black-screen', 'problem-cracked-screen', 'problem-slow'], contentImage: { src: IMAGES.services.motherboardRepair.src, alt: IMAGES.services.motherboardRepair.alt, width: IMAGES.services.motherboardRepair.width, height: IMAGES.services.motherboardRepair.height, caption: 'Chip-level motherboard repair and screen replacement serving the Farwaniya governorate.' }, seo: { title: "Laptop & Computer Repair Farwaniya | Free Pickup | KCROC", description: "Laptop and PC repair in Farwaniya, Khaitan, Riggae, Ardiya and Jleeb Al-Shuyoukh. Free pickup to our Hawalli lab, quote before repair and 30-day warranty.", canonicalUrl: 'https://www.computerrepairkuwait.com/location/farwaniya', alternates: { 'en-KW': 'https://www.computerrepairkuwait.com/location/farwaniya', 'ar-KW': 'https://www.computerrepairkuwait.com/ar/computer-repair-farwaniya', 'x-default': 'https://www.computerrepairkuwait.com/location/farwaniya' }, ogType: 'website', schemaTypes: ['LocalBusiness'], lastModified: '2026-10-24T00:00:00+03:00' }, navigationPriority: 80 } as LocationEntity,

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
      ], title: 'Jahra', description: 'Comprehensive computer repair, thermal repasting, and motherboard diagnostics delivered directly to Jahra.', landmark: 'Mobile Dispatch Area (Equipment processed at our central Hawalli workshop: Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19)', coords: { lat: 29.3370, lng: 47.6580 }, serviceRadiusKm: 40, serviceAreas: ['Jahra', 'Saad Al Abdullah', 'Naeem', 'Qasr', 'Taima'], relatedServiceIds: ['srv-laptop', 'srv-gaming-laptop-cleaning', 'srv-motherboard', 'srv-gaming'], relatedProblemIds: ['problem-overheating', 'problem-no-power', 'problem-freezing-crashing', 'problem-bsod', 'problem-slow'], contentImage: { src: IMAGES.motherboard.thermalGrizzly1.src, alt: IMAGES.motherboard.thermalGrizzly1.alt, width: IMAGES.motherboard.thermalGrizzly1.width, height: IMAGES.motherboard.thermalGrizzly1.height, caption: 'Thermal repasting and motherboard diagnostics delivered directly to Jahra.' }, seo: { title: "Laptop & Computer Repair Jahra | Free Pickup | KCROC", description: "Laptop and computer repair for Jahra, Saad Al Abdullah, Naeem, Qasr and Taima. Free pickup to our Hawalli lab, with diagnosis and a quote before repair.", canonicalUrl: 'https://www.computerrepairkuwait.com/location/jahra', alternates: { 'en-KW': 'https://www.computerrepairkuwait.com/location/jahra', 'ar-KW': 'https://www.computerrepairkuwait.com/ar/computer-repair-jahra', 'x-default': 'https://www.computerrepairkuwait.com/location/jahra' }, ogType: 'website', schemaTypes: ['LocalBusiness'], lastModified: '2026-11-05T00:00:00+03:00' }, navigationPriority: 70 } as LocationEntity,

    'loc-saad-al-abdullah': {
      id: 'loc-saad-al-abdullah',
      slug: 'saad-al-abdullah',
      entityType: 'Location',
      isActive: false,
      isPhysicalLocation: false,
      title: 'Saad Al Abdullah',
      description: 'Computer and laptop repair in Saad Al Abdullah City, Kuwait, with free pickup and delivery to KCROC’s Hawalli lab, diagnosis before paid work, and a clear repair quote.',
      localIntro: 'For residents of Saad Al Abdullah City, KCROC can arrange device pickup from home or office instead of requiring a trip to the workshop. The device is taken to our Hawalli lab, where technicians record the model and symptoms, diagnose the fault, confirm the price before paid work, and return the device after testing. This page focuses on the practical repair needs of the area: laptops that will not turn on or charge, cracked or black screens, overheating and fan noise, and storage or memory upgrades. Saad Al Abdullah is a service area, not a walk-in branch.',
      localHighlights: [
        { title: 'Pickup from Saad Al Abdullah City homes and offices', description: 'Send your block or nearby landmark, device model and symptoms on WhatsApp so the team can arrange collection and return.' },
        { title: 'No-power and charging diagnosis', description: 'A laptop that will not start may have an adapter, battery, charging-port or motherboard fault. These are checked before a replacement is recommended.' },
        { title: 'Screens, batteries and everyday laptop faults', description: 'Cracked displays, weak batteries, keyboard faults and charging issues are diagnosed against the exact device model before parts and total price are confirmed.' },
        { title: 'Cooling and component-level repair', description: 'Dust-related overheating, fan noise and motherboard faults can be investigated at the Hawalli lab. The team explains the repair path and quote before paid work begins.' },
      ],
      localFaqs: [
        { id: 'faq-saad-al-abdullah-local-1', question: 'Do you provide computer repair pickup in Saad Al Abdullah City?', answer: 'Yes. KCROC can arrange free pickup and delivery for supported repair requests in Saad Al Abdullah City. Send your block or landmark, device model and the problem on WhatsApp to coordinate a collection time.' },
        { id: 'faq-saad-al-abdullah-local-2', question: 'Can you repair a laptop that will not turn on?', answer: 'Yes. Tell us whether any charging lights, fan movement or keyboard lights appear and what happened before the laptop stopped. At the lab we check the adapter, battery and power path before deciding whether component-level motherboard work is needed.' },
        { id: 'faq-saad-al-abdullah-local-3', question: 'My laptop is plugged in but the battery is not charging. What could be wrong?', answer: 'The cause can be the charger, charging port, battery or charging circuit on the motherboard. Avoid forcing a loose connector or using a visibly damaged charger. We test the likely causes before recommending parts or repair.' },
        { id: 'faq-saad-al-abdullah-local-4', question: 'How much does laptop or computer repair cost in Saad Al Abdullah?', answer: 'Common laptop repairs start from 15 KWD. Screen-replacement labour starts from 30 KWD plus the panel, and component-level motherboard repair starts from 25 KWD. The final price depends on the model, fault and parts required; you receive the quote before approving paid work.' },
        { id: 'faq-saad-al-abdullah-local-5', question: 'Can you finish a repair on the same day?', answer: 'Some screen and battery repairs may be completed the same day when the correct part is available. Many repairs take around 24–48 hours after the device reaches the lab, while complex motherboard work can take longer. We confirm a realistic estimate after diagnosis.' },
        { id: 'faq-saad-al-abdullah-local-6', question: 'Where is my computer actually repaired?', answer: 'Saad Al Abdullah is a pickup service area rather than a KCROC walk-in branch. Repairs are completed and tested at our Hawalli lab: Ibn Khaldoun Street, Al Mullah Complex, Basement Shop 19. The team arranges delivery after testing.' },
        { id: 'faq-saad-al-abdullah-local-7', question: 'Do you also cover nearby Naeem, Qasr and Taima?', answer: 'These nearby areas are part of the wider Jahra-side pickup coverage shown on our service-area pages. Send your exact area on WhatsApp so the team can confirm collection arrangements.' },
      ],
      landmark: 'Mobile Dispatch Area (Equipment processed at our central Hawalli workshop: Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19)',
      coords: { lat: 29.3139, lng: 47.7194 },
      serviceRadiusKm: 12,
      serviceAreas: ['Saad Al Abdullah', 'Saad Al Abdullah City', 'Naeem', 'Qasr', 'Taima'],
      relatedServiceIds: ['srv-laptop', 'srv-screen', 'srv-battery', 'srv-ssd-ram'], relatedProblemIds: ['problem-no-power', 'problem-black-screen', 'problem-slow', 'problem-not-charging'], contentImage: {
        src: IMAGES.services.laptopRepair.src,
        alt: 'Laptop repair work at KCROC for customers in Saad Al Abdullah City',
        width: IMAGES.services.laptopRepair.width,
        height: IMAGES.services.laptopRepair.height,
        caption: 'Computer and laptop repairs for Saad Al Abdullah City, handled at KCROC’s Hawalli lab.',
      },
      seo: { title: "Computer Repair Saad Al Abdullah | Free Pickup | KCROC", description: "Laptop and computer repair for Saad Al Abdullah with free pickup and delivery. Devices are diagnosed and tested at our Hawalli lab.",
        canonicalUrl: 'https://www.computerrepairkuwait.com/location/saad-al-abdullah',
        ogType: 'website',
        schemaTypes: ['LocalBusiness'],
        lastModified: '2026-10-15T00:00:00+03:00',
      },
      navigationPriority: 68,
    } as LocationEntity,

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
      ], title: 'Ahmadi', description: 'Premium gaming PC repair and Apple MacBook diagnostics serving Ahmadi and southern Kuwait.', landmark: 'Mobile Dispatch Area (Equipment processed at our central Hawalli workshop: Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19)', coords: { lat: 29.0833, lng: 48.0833 }, serviceRadiusKm: 30, serviceAreas: ['Ahmadi', 'Fahaheel', 'Mangaf', 'Mahboula', 'Sabahiya'], relatedServiceIds: ['srv-gaming', 'srv-macbook', 'srv-laptop', 'srv-motherboard'], relatedProblemIds: ['problem-overheating', 'problem-freezing-crashing', 'problem-no-power', 'problem-black-screen'], contentImage: { src: IMAGES.gaming.rgbLighting.src, alt: IMAGES.gaming.rgbLighting.alt, width: IMAGES.gaming.rgbLighting.width, height: IMAGES.gaming.rgbLighting.height, caption: 'Gaming PC and Apple MacBook diagnostics serving Ahmadi and southern Kuwait.' }, seo: { title: "Computer Repair Ahmadi | Free Pickup | KCROC", description: "Laptop, MacBook and gaming PC repair for Ahmadi, Fahaheel, Mangaf and Mahboula. Free pickup and repair at our Hawalli lab.", canonicalUrl: 'https://www.computerrepairkuwait.com/location/ahmadi', ogType: 'website', schemaTypes: ['LocalBusiness'], lastModified: '2026-09-27T00:00:00+03:00' }, navigationPriority: 60 } as LocationEntity,

    // 🚀 NEW: Fahaheel, Mangaf, and Abu Halifa were previously only mentioned
    // as text inside Hawalli's and Ahmadi's `serviceAreas` arrays — they had
    // no dedicated entity, so /location/fahaheel etc. 404'd and none of the
    // three had their own indexable page, meta tags, or LocalBusiness schema.
    // Each gets its own entity below (same LocationDeepTemplate pattern as
    // Salmiya/Farwaniya/Jahra/Ahmadi) with a distinct angle and image per
    // page so the cluster doesn't read as templated duplicate content.
    'loc-fahaheel': { id: 'loc-fahaheel', slug: 'fahaheel', entityType: 'Location', isActive: true, isPhysicalLocation: false, localIntro: "For Fahaheel and Fintas customers, the simplest route is pickup: we collect the laptop, MacBook or gaming PC, diagnose it in our Hawalli lab and return it after testing. The Fahaheel zone also covers Mangaf, Abu Halifa and Sabah Al-Ahmad Sea City. Fintas is served through this southern pickup route, not a separate storefront.", localHighlights: [
        { title: "Pickup across Fahaheel, Fintas, Mangaf and Abu Halifa", description: "Send your area on WhatsApp and we will arrange free collection and delivery." },
        { title: "Dead and no-charge laptops", description: "Power and charging faults are traced to the specific component rather than assumed to be a full motherboard failure." },
        { title: "Overheating and liquid damage", description: "Cleaning, repasting and board-level liquid-damage work, all carried out at our lab." },
        { title: "Not a local shop, and clear about it", description: "Fahaheel is a service area. You are not sent to a branch that does not exist: devices are repaired in Hawalli." },
      ], localFaqs: [
        { id: "faq-fahaheel-local-1", question: "Do you collect from Fahaheel, Fintas, Mangaf and Abu Halifa?", answer: "Yes. Fahaheel, Fintas, Mangaf and Abu Halifa are covered by free pickup and delivery. Send your area on WhatsApp to arrange a time." },
        { id: "faq-fahaheel-local-2", question: "My laptop is completely dead. What information helps you diagnose it?", answer: "Tell us when it stopped, whether it was dropped or exposed to liquid, whether the charger light comes on and whether the fans or any lights respond. That tells us where to start on the bench. You pay nothing if we cannot fix it." },
        { id: "faq-fahaheel-local-3", question: "My laptop stopped charging after I used a different charger. Can that be repaired?", answer: "Often yes. A wrong or faulty adapter can leave the charging circuit or the port damaged. We test the adapter, port and power path before recommending any board work." },
        { id: "faq-fahaheel-local-4", question: "I spilled a sweet drink on my laptop. Is that worse than water?", answer: "Yes, it can be. Sugar and milk residue stay on the board and keep causing damage after the liquid dries. Switch the laptop off, unplug it and message us as soon as possible, and do not try to power it on to check." },
        { id: "faq-fahaheel-local-5", question: "My laptop overheats and shuts down. Is it safe to keep using it?", answer: "It is better to stop. Repeated overheating shutdowns put stress on the board and battery. We clean the cooling system, replace the paste and test the machine under load before it is returned." },
        { id: "faq-fahaheel-local-6", question: "Is there a shop in Fahaheel?", answer: "No. Fahaheel is a service area, not a branch. Devices are repaired at our Hawalli lab (Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19), and we collect and deliver for free." },
      ], title: 'Fahaheel', description: 'Free pickup and delivery for laptop, MacBook, and gaming PC repair across Fahaheel\'s residential and family communities, with every device diagnosed at KCROC\'s Hawalli lab.', landmark: 'Mobile Dispatch Area (Equipment processed at our central Hawalli workshop: Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19)', coords: { lat: 29.0810, lng: 48.1288 }, serviceRadiusKm: 20, serviceAreas: ['Fahaheel', 'Fintas', 'Mangaf', 'Abu Halifa', 'Sabah Al-Ahmad Sea City'], relatedServiceIds: ['srv-laptop', 'srv-macbook', 'srv-gaming', 'srv-battery'], relatedProblemIds: ['problem-liquid-spill', 'problem-no-power', 'problem-overheating', 'problem-black-screen'], contentImage: { src: IMAGES.macbook.logicBoard.src, alt: IMAGES.macbook.logicBoard.alt, width: IMAGES.macbook.logicBoard.width, height: IMAGES.macbook.logicBoard.height, caption: 'MacBook motherboard repair for families and residents across Fahaheel.' }, seo: { title: "Computer Repair Fahaheel | Free Pickup | KCROC", description: "Free pickup and delivery for laptop, MacBook and gaming PC repair in Fahaheel, Mangaf and Abu Halifa. Repairs take place in Hawalli.", canonicalUrl: 'https://www.computerrepairkuwait.com/location/fahaheel', ogType: 'website', schemaTypes: ['LocalBusiness'] }, navigationPriority: 55 } as LocationEntity,

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
      ], title: 'Mangaf', description: 'Component-level laptop, MacBook, and motherboard repair for Mangaf residents and the wider Ahmadi workforce community, collected and delivered free of charge.', landmark: 'Mobile Dispatch Area (Equipment processed at our central Hawalli workshop: Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19)', coords: { lat: 29.0975, lng: 48.1197 }, serviceRadiusKm: 20, serviceAreas: ['Mangaf', 'Fahaheel', 'Abu Halifa', 'Ahmadi'], relatedServiceIds: ['srv-laptop', 'srv-macbook', 'srv-liquid-damage', 'srv-motherboard'], relatedProblemIds: ['problem-liquid-spill', 'problem-no-power', 'problem-not-charging', 'problem-overheating'], contentImage: { src: IMAGES.gaming.waterCooled.src, alt: IMAGES.gaming.waterCooled.alt, width: IMAGES.gaming.waterCooled.width, height: IMAGES.gaming.waterCooled.height, caption: 'Custom water-cooled gaming PC build serviced for the Mangaf community.' }, seo: { title: "Computer Repair Mangaf | Free Pickup | KCROC", description: "Laptop, MacBook and motherboard repair for Mangaf and nearby Fahaheel, Abu Halifa and Ahmadi, with free pickup to our Hawalli lab.", canonicalUrl: 'https://www.computerrepairkuwait.com/location/mangaf', ogType: 'website', schemaTypes: ['LocalBusiness'] }, navigationPriority: 50 } as LocationEntity,

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
      ], title: 'Abu Halifa', description: 'Laptop, MacBook, and gaming PC repair for Abu Halifa\'s villas and residential compounds, with free pickup and delivery to KCROC\'s Hawalli lab — no need to travel.', landmark: 'Mobile Dispatch Area (Equipment processed at our central Hawalli workshop: Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19)', coords: { lat: 29.1213, lng: 48.1268 }, serviceRadiusKm: 20, serviceAreas: ['Abu Halifa', 'Mangaf', 'Fahaheel', 'Fintas'], relatedServiceIds: ['srv-laptop', 'srv-gaming', 'srv-screen', 'srv-battery'], relatedProblemIds: ['problem-cracked-screen', 'problem-no-power', 'problem-overheating', 'problem-black-screen'], contentImage: { src: IMAGES.laptopHardware.hpLaptopMotherboardRepairOpen.src, alt: IMAGES.laptopHardware.hpLaptopMotherboardRepairOpen.alt, width: IMAGES.laptopHardware.hpLaptopMotherboardRepairOpen.width, height: IMAGES.laptopHardware.hpLaptopMotherboardRepairOpen.height, caption: 'Laptop motherboard repair for villas and compounds across Abu Halifa.' }, seo: { title: "Computer Repair Abu Halifa | Free Pickup | KCROC", description: "Laptop and computer repair for Abu Halifa with free pickup and delivery. Diagnosis, approved repairs and testing take place at our Hawalli lab.", canonicalUrl: 'https://www.computerrepairkuwait.com/location/abu-halifa', ogType: 'website', schemaTypes: ['LocalBusiness'] }, navigationPriority: 45 } as LocationEntity,

    // 🚀 NEW: Jabriya, Mubarak Al-Kabeer, Fintas, and Sabah Al-Salem — second
    // batch of previously-uncovered high-value areas. Each again gets a
    // distinct angle and a manually-verified (not just alt-text-matched)
    // contentImage so the growing location cluster keeps reading as
    // genuinely different pages rather than one template with area names
    // swapped in.
    'loc-jabriya': { id: 'loc-jabriya', slug: 'jabriya', entityType: 'Location', isActive: false, isPhysicalLocation: false, localIntro: "Jabriya is one of the closest areas to our Hawalli lab, which keeps pickup and return quick to arrange. We serve Jabriya, Shaab, Surra and surrounding streets, with laptop, MacBook, screen and motherboard repair. Black screens, dead laptops and charging faults are the focus of this page.", localHighlights: [
        { title: "Pickup from Jabriya, Shaab and Surra", description: "Message us your area on WhatsApp and we will arrange free collection." },
        { title: "Close to the lab", description: "Jabriya sits near Hawalli, so there is little distance between your door and our workbench." },
        { title: "Black screen and no-power diagnosis", description: "We find the actual fault before you are quoted: panel, cable, charger, battery or board." },
        { title: "Students and staff welcome", description: "Laptops for study and work get the same diagnosis and the same 30-day warranty as any other repair." },
      ], localFaqs: [
        { id: "faq-jabriya-local-1", question: "Do you collect from apartments and shared housing in Jabriya?", answer: "Yes. Send your building or block, floor and a contact number on WhatsApp and we will arrange collection and return." },
        { id: "faq-jabriya-local-2", question: "Is Jabriya really close enough for quick turnaround?", answer: "Jabriya is one of the closest areas to our Hawalli lab, so pickup and return are quick to arrange. The repair itself depends on the fault. Many repairs take 24-48 hours after we receive the device, and we confirm a realistic estimate after diagnosis." },
        { id: "faq-jabriya-local-3", question: "My laptop screen flickers or shows coloured lines. Is it the screen?", answer: "Often it is the panel or the display cable. We confirm which before quoting. Screen-replacement labor starts from 30 KWD, plus the panel; we confirm the part and complete price before work begins." },
        { id: "faq-jabriya-local-4", question: "My laptop worked yesterday and is completely dead today. What should I check?", answer: "Try a different outlet, check the charger light and hold the power button for about 15 seconds. If it is still dead, message us. We test the battery, the charging circuit and the board in that order, and you pay nothing if we cannot fix it." },
        { id: "faq-jabriya-local-5", question: "Can you do a same-day repair?", answer: "Same-day service is possible for some screen and battery jobs when the part is in stock. Component-level motherboard work usually takes longer, typically 24-72 hours. Message us with your deadline and the symptoms and we will tell you what is realistic." },
        { id: "faq-jabriya-local-6", question: "Do you collect from Shaab, Surra, Hawalli and Salmiya as well?", answer: "Yes. Jabriya, Shaab, Surra, Hawalli and Salmiya are covered by free pickup and delivery." },
      ], title: 'Jabriya', description: 'Fast laptop, MacBook, and gaming PC repair for Jabriya, one of the closest neighborhoods to KCROC\'s Hawalli lab, with free pickup and delivery for students, university staff, and residents.', landmark: 'Mobile Dispatch Area (Equipment processed at our central Hawalli workshop: Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19)', coords: { lat: 29.3186, lng: 48.0154 }, serviceRadiusKm: 10, serviceAreas: ['Jabriya', 'Hawalli', 'Salmiya', 'Shaab', 'Surra'], relatedServiceIds: ['srv-laptop', 'srv-macbook', 'srv-gaming', 'srv-motherboard'], relatedProblemIds: ['problem-overheating', 'problem-slow', 'problem-no-power', 'problem-black-screen'], contentImage: { src: IMAGES.macbook.macbookProOpenMacosScreen.src, alt: IMAGES.macbook.macbookProOpenMacosScreen.alt, width: IMAGES.macbook.macbookProOpenMacosScreen.width, height: IMAGES.macbook.macbookProOpenMacosScreen.height, caption: 'MacBook Pro repair completed for a customer in Jabriya.' }, seo: { title: "Computer Repair Jabriya | Free Pickup | KCROC", description: "Laptop and computer repair for Jabriya, Shaab and Surra. Arrange free pickup; KCROC diagnoses and repairs devices at its Hawalli lab.", canonicalUrl: 'https://www.computerrepairkuwait.com/location/jabriya', ogType: 'website', schemaTypes: ['LocalBusiness'] }, navigationPriority: 40 } as LocationEntity,

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
        { id: "faq-mubarak-al-kabeer-local-6", question: "How can I get an idea of the cost without bringing the laptop in?", answer: "Send the model, the symptoms and a photo of any error on WhatsApp for a first opinion. A firm quote is confirmed after diagnosis and before any paid work, and repairs carry a 30-day warranty. Screen-replacement labor starts from 30 KWD plus the panel; component-level motherboard repair starts from 25 KWD." },
      ], title: 'Mubarak Al-Kabeer', description: 'Component-level laptop and motherboard repair for residents across Mubarak Al-Kabeer Governorate, from Adan to Qurain, collected and delivered free of charge to KCROC\'s Hawalli lab.', landmark: 'Mobile Dispatch Area (Equipment processed at our central Hawalli workshop: Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19)', coords: { lat: 29.2436, lng: 48.0783 }, serviceRadiusKm: 25, serviceAreas: ['Mubarak Al-Kabeer', 'Adan', 'Qurain', 'Sabah Al-Salem', 'Qusour'], relatedServiceIds: ['srv-laptop', 'srv-motherboard', 'srv-ssd-ram', 'srv-battery'], relatedProblemIds: ['problem-slow', 'problem-no-power', 'problem-not-charging', 'problem-windows-wont-boot'], contentImage: { src: IMAGES.gaming.deepcoolAio.src, alt: IMAGES.gaming.deepcoolAio.alt, width: IMAGES.gaming.deepcoolAio.width, height: IMAGES.gaming.deepcoolAio.height, caption: 'Custom-built PC repair and liquid-cooler servicing for Mubarak Al-Kabeer Governorate.' }, seo: { title: "Computer Repair Mubarak Al-Kabeer | Free Pickup | KCROC", description: "Laptop and motherboard repair across Mubarak Al-Kabeer, Adan, Qurain and Sabah Al-Salem, with free pickup to our Hawalli lab.", canonicalUrl: 'https://www.computerrepairkuwait.com/location/mubarak-al-kabeer', ogType: 'website', schemaTypes: ['LocalBusiness'] }, navigationPriority: 35 } as LocationEntity,

    'loc-fintas': { id: 'loc-fintas', slug: 'fintas', entityType: 'Location', isActive: false, isPhysicalLocation: false, localIntro: "Fintas and the surrounding coastal communities are served by free pickup, so a repair does not mean a drive to Hawalli. We collect, diagnose and repair at our lab, then return the device after testing. Gaming PCs, overheating and liquid damage are the focus of this page.", localHighlights: [
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
      ], title: 'Fintas', description: 'Laptop, MacBook, and gaming PC repair for Fintas and the surrounding coastal communities, with free pickup and delivery to KCROC\'s Hawalli lab — no need to travel.', landmark: 'Mobile Dispatch Area (Equipment processed at our central Hawalli workshop: Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19)', coords: { lat: 29.1362, lng: 48.1256 }, serviceRadiusKm: 15, serviceAreas: ['Fintas', 'Abu Halifa', 'Mangaf', 'Fahaheel', 'Abu Ftaira'], relatedServiceIds: ['srv-laptop', 'srv-macbook', 'srv-gaming', 'srv-screen'], relatedProblemIds: ['problem-cracked-screen', 'problem-black-screen', 'problem-no-power', 'problem-overheating'], contentImage: { src: IMAGES.gaming.asusRogCase.src, alt: IMAGES.gaming.asusRogCase.alt, width: IMAGES.gaming.asusRogCase.width, height: IMAGES.gaming.asusRogCase.height, caption: 'Custom gaming PC repair and RGB build servicing for Fintas.' }, seo: { title: "Computer Repair Fintas | Free Pickup | KCROC", description: "Laptop and computer repair for Fintas and nearby coastal areas, with free pickup and delivery after diagnosis and testing at our Hawalli lab.", canonicalUrl: 'https://www.computerrepairkuwait.com/location/fintas', ogType: 'website', schemaTypes: ['LocalBusiness'] }, navigationPriority: 30 } as LocationEntity,

    'loc-sabah-al-salem': {
      id: 'loc-sabah-al-salem',
      slug: 'sabah-al-salem',
      entityType: 'Location',
      isActive: true,
      isPhysicalLocation: false,
      title: 'Sabah Al-Salem',
      heroBadge: 'Sabah Al-Salem A · Blocks 1–13 · Postal area 44000',
      heroHeadline: 'Computer, Laptop & MacBook Repair in Sabah Al-Salem',
      localValueHeading: 'Doorstep Pickup in Sabah Al-Salem. Precision Repairs in Hawalli.',
      localServicesHeading: 'Specialist Computer & MacBook Repairs for Sabah Al-Salem',
      areaPostalCode: '44000',
      areaPostalRegion: 'Mubarak Al-Kabeer Governorate',
      serviceTypes: [
        'Laptop and computer hardware repair',
        'MacBook charging and logic-board repair',
        'Laptop screen and display repair',
        'Motherboard component-level repair',
        'Laptop charging port and power-delivery repair',
      ],
      description: 'Laptop, MacBook and computer repair for Sabah Al-Salem A, including Blocks 1–13. Free doorstep pickup and return delivery to KCROC’s Hawalli repair lab.',
      localIntro: 'When a student MacBook stops charging, a family laptop screen cracks, or a home-office computer will not power on, the repair should start with a proper diagnosis—not an unnecessary trip across town. KCROC arranges free doorstep collection across Sabah Al-Salem A (Blocks 1–13) and takes the device to our central Hawalli repair lab. Sabah Al-Salem connects to the Sixth Ring Road and the Fahaheel Expressway (Road 30), but you do not need to drive your device to Hawalli to begin a repair. There, our technicians assess display, charging, power and motherboard faults, explain the repair options and provide a quote before any paid work begins. Once you approve the work, we complete the repair, test the device and arrange return delivery. Send your block, street and location pin on WhatsApp; a nearby Sabah Al-Salem Co-operative Society branch is a familiar landmark you can include when confirming the pickup point. For neighbouring Adan and Qurain, see our wider Mubarak Al-Kabeer service-area page; Messila has its own dedicated service-area page.',
      localHighlights: [
        { title: 'Doorstep pickup across Blocks 1–13', description: 'Free pickup and return delivery are available for Sabah Al-Salem A. Share your exact block, street and location pin so collection can be coordinated.' },
        { title: 'MacBook, USB-C and charging faults', description: 'We check the adapter, connector, charging path and relevant board circuitry before recommending a repair. The correct route depends on the exact model and fault.' },
        { title: 'Cracked screens and no-display faults', description: 'We distinguish panel damage from display-cable, connector and board-related faults before preparing a quote.' },
        { title: 'Diagnosis before paid work', description: 'We explain the fault and quote before paid repair begins. No Fix, No Fee is subject to KCROC’s service terms; eligible completed repairs carry a 30-day warranty.' },
      ],
      localServiceCards: [
        {
          title: 'Laptop Repair & Hardware Restoration',
          problem: 'Laptop will not start, loses power, overheats, charges intermittently, develops a cracked display or becomes unstable during everyday study, family or office use.',
          expertise: 'We check the model-specific power, battery, display, charging and motherboard paths before deciding whether the fault is a replaceable module or a component-level board repair.',
          solution: 'Free pickup from Sabah Al-Salem A, diagnosis at the Hawalli lab and a clear quote for approval before paid work begins. The laptop is tested before return delivery.',
          serviceIds: ['srv-laptop'],
        },
        {
          title: 'MacBook Air & MacBook Pro Repair',
          problem: 'MacBook does not start, stops charging over USB-C, shows a black screen or has been exposed to liquid.',
          expertise: 'We inspect the charging input, connectors and relevant logic-board power circuitry, with component-level repair where the model and fault make it technically practical.',
          solution: 'Your MacBook is assessed at our Hawalli lab. We explain the diagnosis and repair options before any paid work, then arrange return delivery after testing.',
          serviceIds: ['srv-macbook'],
        },
        {
          title: 'Laptop Screen & Display Repair',
          problem: 'Cracked LCD, lines, flicker, a dim display or a laptop that powers on but shows no picture.',
          expertise: 'We check the panel, display cable and connectors, and relevant board-side display circuitry before recommending a replacement screen.',
          solution: 'The exact compatible panel and full price are confirmed before installation. Screen-replacement labour starts from 30 KWD, plus the panel.',
          serviceIds: ['srv-screen'],
        },
        {
          title: 'Motherboard Component-Level Repair',
          problem: 'No-power faults, short circuits, liquid-related corrosion or intermittent shutdowns that may originate on the motherboard.',
          expertise: 'We trace the affected power or signal area and assess whether the failed component or circuit can be repaired instead of defaulting to a full-board replacement.',
          solution: 'Diagnosis and repair options are explained before paid work. When a board-level repair is viable, the original board is repaired and the device is tested at the Hawalli lab.',
          serviceIds: ['srv-motherboard'],
        },
        {
          title: 'Laptop Charging Port & Power-Delivery Repair',
          problem: 'Loose or damaged DC jack, USB-C charging port problems, intermittent charging or a laptop that reports it is plugged in but not charging.',
          expertise: 'We check the adapter, port, connector condition and board-side charging path to distinguish a damaged port from a wider power-circuit fault.',
          solution: 'We confirm the compatible repair and quote before proceeding. Approved work is completed at the Hawalli lab, followed by charging and stability checks.',
          serviceIds: ['srv-charging-port'],
        },
      ],
      localFaqs: [
        { id: 'faq-sabah-al-salem-local-1', question: 'Do you collect from Sabah Al-Salem A, Blocks 1 through 13?', answer: 'Yes. Free pickup and return delivery are available across Sabah Al-Salem A Blocks 1–13. The general postal code is 44000; individual block postal codes run from 44001 to 44013. Send your block, street and location pin on WhatsApp so the collection point can be confirmed.' },
        { id: 'faq-sabah-al-salem-local-2', question: 'Do you collect from Adan and Qurain as well?', answer: 'Yes. Sabah Al-Salem, Adan and Qurain are connected through KCROC’s Mubarak Al-Kabeer pickup coverage. For details about the wider governorate service area, see the Mubarak Al-Kabeer page or send your location on WhatsApp.' },
        { id: 'faq-sabah-al-salem-local-3', question: 'My laptop will not turn on. What can I check before arranging pickup?', answer: 'Try a different wall outlet, check that the charger is firmly connected, disconnect USB accessories and hold the power button for about 15 seconds. If it remains unresponsive, send us the model and what happened before it stopped. We will diagnose the power path before recommending a repair.' },
        { id: 'faq-sabah-al-salem-local-4', question: 'The laptop was dropped and now shows nothing. Is it the screen or motherboard?', answer: 'Either is possible. If the laptop powers on but the display stays black, the panel, cable, connector or backlight path may be involved. If the laptop has no power at all, the power input or motherboard may be responsible. We test the relevant paths and explain the findings before quoting.' },
        { id: 'faq-sabah-al-salem-local-5', question: 'Can you repair a MacBook with a USB-C charging or no-power fault?', answer: 'We diagnose MacBook charging and no-power faults and carry out component-level logic-board repair where it is technically viable for the model and fault. We explain the repair options and quote before any paid work begins.' },
        { id: 'faq-sabah-al-salem-local-6', question: 'How much does laptop screen replacement cost?', answer: 'Screen-replacement labour starts from 30 KWD, plus the cost of the compatible panel. We confirm the exact part and total price for your laptop model before any paid work begins.' },
        { id: 'faq-sabah-al-salem-local-7', question: 'Where is my device repaired, and can I visit the workshop?', answer: 'All repairs are carried out at KCROC’s Hawalli lab: Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19. The workshop is open daily from 10:00 AM to 10:00 PM. You can visit in person or arrange free pickup from Sabah Al-Salem.' },
      ],
      landmark: 'Mobile Dispatch Area (Equipment processed at our central Hawalli workshop: Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19)',
      coords: { lat: 29.2075, lng: 48.0975 },
      serviceRadiusKm: 15,
      serviceAreas: ['Sabah Al-Salem', 'Mubarak Al-Kabeer', 'Adan', 'Qurain'],
      relatedServiceIds: ['srv-laptop', 'srv-macbook', 'srv-screen', 'srv-motherboard', 'srv-charging-port'],
      relatedProblemIds: ['problem-no-power', 'problem-black-screen', 'problem-cracked-screen', 'problem-not-charging'],
      relatedBrandIds: ['brand-dell', 'brand-lenovo', 'brand-hp', 'brand-asus'],
      relatedLocationIds: ['loc-mubarak-al-kabeer', 'loc-messila', 'loc-hawalli'],
      contentImage: {
        src: IMAGES.laptopHardware.dellLaptopScreenRepairCompleted.src,
        alt: IMAGES.laptopHardware.dellLaptopScreenRepairCompleted.alt,
        width: IMAGES.laptopHardware.dellLaptopScreenRepairCompleted.width,
        height: IMAGES.laptopHardware.dellLaptopScreenRepairCompleted.height,
        caption: 'Laptop screen repair completed and back in service for a Sabah Al-Salem family.',
      },
      seo: {
        title: 'Computer & MacBook Repair Sabah Al-Salem | KCROC',
        description: 'Laptop, MacBook, screen, charging and motherboard repair in Sabah Al-Salem A, Blocks 1–13. Free pickup to KCROC’s Hawalli lab; diagnosis before paid work.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/location/sabah-al-salem',
        ogType: 'website',
        schemaTypes: ['LocalBusiness'],
        lastModified: '2026-11-05T00:00:00+03:00',
      },
      navigationPriority: 25,
    } as LocationEntity,

    'loc-salwa': { id: 'loc-salwa', slug: 'salwa', entityType: 'Location', isActive: false, isPhysicalLocation: false,
      title: 'Salwa',
      description: 'Computer and laptop repair for Salwa residents and families, with free pickup to KCROC\'s Hawalli lab for screen, battery, charging and motherboard faults.',
      localIntro: 'For Salwa customers, KCROC keeps the repair process simple: we collect the laptop or MacBook from your area, diagnose it at the Hawalli lab, explain the repair options and return it after testing. Salwa is served as a pickup area rather than a separate walk-in branch.',
      localHighlights: [
        { title: 'Pickup across Salwa blocks', description: 'Free device collection is available across Salwa, with return delivery after diagnosis and testing.' },
        { title: 'Screen, battery and charging faults', description: 'Common laptop problems are assessed at component and part level before replacement is recommended.' },
        { title: 'MacBook and laptop repair', description: 'Apple MacBooks and Windows laptops are both supported, including motherboard and liquid-damage diagnosis.' },
        { title: 'Central Hawalli repair lab', description: 'Repairs are completed by KCROC\'s technicians at the main Hawalli workshop, not at a temporary local storefront.' }
      ],
            localFaqs: [
        { id: "faq-salwa-local-1", question: "Do you collect from Salwa, Rumaithiya, Bidaa and Shaab?", answer: "Yes. Salwa, Rumaithiya, Bidaa and Shaab are covered by free pickup and delivery. Send your area and the device symptoms on WhatsApp and we will arrange collection." },
        { id: "faq-salwa-local-2", question: "My MacBook screen has a vertical line or a flickering band. Is it repairable?", answer: "A line or flickering band can come from the display panel, the flex cable or the board. Replacing the display is common, but we confirm the cause first so you do not pay for a part that does not fix it. Tell us the exact model and year when you message us." },
        { id: "faq-salwa-local-3", question: "My laptop battery is swelling at the bottom of the case. What should I do?", answer: "Stop using and charging the laptop, keep it away from heat and do not press on the bulge. A swollen battery can be hazardous. Contact us and mention it, and we will arrange to collect it so the battery can be replaced safely." },
        { id: "faq-salwa-local-4", question: "My MacBook does not turn on after a software update. Can you help?", answer: "Try holding the power button for ten seconds, connect the charger and try another cable. If it still does not respond, there may be a hardware problem that appeared at the same time as the update. We diagnose it on the bench to find out whether it is a software or hardware cause." },
        { id: "faq-salwa-local-5", question: "My laptop screen is too dark even at full brightness. Is it the backlight?", answer: "It may be. Shine a torch at the screen at an angle. If you can see a faint picture, the backlight or its circuit is the probable cause. We check the backlight, the cable and the board, and confirm the repair and quote before work begins." },
        { id: "faq-salwa-local-6", question: "Is there a branch in Salwa, and where is the repair done?", answer: "There is no walk-in branch in Salwa. Devices are repaired at our Hawalli lab (Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19), open daily from 10:00 AM to 10:00 PM. You can bring a device in yourself or have it collected for free, and repairs carry a 30-day warranty." },
      ],
      landmark: 'Mobile Dispatch Area (Equipment processed at our central Hawalli workshop: Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19)',
      coords: { lat: 29.2950, lng: 48.0780 }, serviceRadiusKm: 15, serviceAreas: ['Salwa', 'Rumaithiya', 'Bidaa', 'Shaab'],
      relatedServiceIds: ['srv-laptop', 'srv-screen', 'srv-battery', 'srv-charging-port'], relatedProblemIds: ['problem-cracked-screen', 'problem-not-charging', 'problem-no-power', 'problem-slow'], contentImage: { src: IMAGES.services.laptopRepair.src, alt: IMAGES.services.laptopRepair.alt, width: IMAGES.services.laptopRepair.width, height: IMAGES.services.laptopRepair.height, caption: 'Laptop and MacBook repair serving Salwa and nearby coastal neighborhoods.' },
      seo: { title: "Computer Repair Salwa | Free Pickup | KCROC", description: "Laptop and computer repair for Salwa with free pickup and delivery. KCROC diagnoses the fault and confirms the repair quote before work.", canonicalUrl: 'https://www.computerrepairkuwait.com/location/salwa', ogType: 'website', schemaTypes: ['LocalBusiness'], lastModified: '2026-10-02T00:00:00+03:00' },
      navigationPriority: 80
    } as LocationEntity,

    'loc-rumaithiya': { id: 'loc-rumaithiya', slug: 'rumaithiya', entityType: 'Location', isActive: true, isPhysicalLocation: false,
      title: 'Rumaithiya',
      description: 'Laptop, MacBook and gaming PC repair for Rumaithiya with free pickup and delivery to KCROC\'s central Hawalli workshop.',
      localIntro: "KCROC serves Rumaithiya and nearby Salwa, Shaab and Jabriya through scheduled pickup and delivery. Devices are checked at our Hawalli lab for display, power, charging, thermal and board-level faults; we explain the findings and price before starting paid work. You do not need to visit a separate repair shop in Rumaithiya.",
      localHighlights: [
        { title: 'Close-in pickup service', description: 'Pickup is available throughout Rumaithiya and nearby Hawalli-side neighborhoods.' },
        { title: 'Gaming and thermal problems', description: 'Gaming laptops and PCs can be checked for overheating, cooling faults, shutdowns and performance issues.' },
        { title: 'Board-level diagnosis', description: 'Motherboard faults are investigated to the component level where technically feasible instead of defaulting to whole-board replacement.' },
        { title: 'Privacy-conscious handling', description: 'Repair diagnostics focus on the hardware fault, with files left untouched unless customer-authorized work requires otherwise.' }
      ],
            localFaqs: [
        { id: "faq-rumaithiya-local-1", question: "Do you collect from Rumaithiya, Salwa, Shaab and Jabriya?", answer: "Yes. Rumaithiya, Salwa, Shaab and Jabriya are covered by free pickup and delivery. Send your area and the device symptoms on WhatsApp and we will arrange collection." },
        { id: "faq-rumaithiya-local-2", question: "My gaming laptop is slower than it used to be. Could cleaning help?", answer: "It can. If the laptop thermal throttles, it reduces its speed to stay cool, so games feel slower. Dust build-up and dried thermal paste are common causes. Cleaning the fans and heatsink and re-pasting the chips often restores performance. We check temperatures under load before and after." },
        { id: "faq-rumaithiya-local-3", question: "My laptop is completely dead after I plugged in a different charger. What happened?", answer: "A charger with the wrong voltage can damage the charging circuit. Unplug it and do not keep trying. Check that the adapter matches the laptop's rating. We test the adapter, the port and the power path on the bench and replace the damaged component where possible." },
        { id: "faq-rumaithiya-local-4", question: "My MacBook runs hot and the fan spins loudly even when I am not doing much. Why?", answer: "Heavy background processes can cause that, so check Activity Monitor first. If nothing unusual shows, dust and aging thermal paste can raise temperatures. We check the cooling system and the temperatures, and tell you whether a clean-up or a part replacement is needed." },
        { id: "faq-rumaithiya-local-5", question: "My laptop does not recognise USB devices. Is the port damaged?", answer: "Try another device and another port first. If one port fails but others work, that port or its connection to the board may be damaged. If all ports fail, a driver issue or a board fault is more likely. We test the ports on the bench and explain what we find." },
        { id: "faq-rumaithiya-local-6", question: "Is there a branch in Rumaithiya, and where is the repair done?", answer: "There is no walk-in branch in Rumaithiya. Devices are repaired at our Hawalli lab (Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19), open daily from 10:00 AM to 10:00 PM. You can bring a device in yourself or have it collected for free, and repairs carry a 30-day warranty." },
      ],
      landmark: 'Mobile Dispatch Area (Equipment processed at our central Hawalli workshop: Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19)',
      coords: { lat: 29.3270, lng: 48.0510 }, serviceRadiusKm: 10, serviceAreas: ['Rumaithiya', 'Salwa', 'Shaab', 'Jabriya'],
      relatedServiceIds: ['srv-laptop', 'srv-macbook', 'srv-gaming', 'srv-motherboard'], relatedProblemIds: ['problem-black-screen', 'problem-slow', 'problem-no-power', 'problem-overheating'], contentImage: { src: IMAGES.gaming.gamingLaptopFan.src, alt: IMAGES.gaming.gamingLaptopFan.alt, width: IMAGES.gaming.gamingLaptopFan.width, height: IMAGES.gaming.gamingLaptopFan.height, caption: 'Gaming laptop cooling and motherboard diagnostics for Rumaithiya customers.' },
      seo: { title: "Computer Repair Rumaithiya | Free Pickup | KCROC", description: "Laptop and computer repair for Rumaithiya and nearby Salwa and Jabriya. Free pickup and delivery to and from our Hawalli lab.", canonicalUrl: 'https://www.computerrepairkuwait.com/location/rumaithiya', ogType: 'website', schemaTypes: ['LocalBusiness'], lastModified: '2026-10-02T00:00:00+03:00' },
      navigationPriority: 78
    } as LocationEntity,

    

    'loc-surra': {
      id: 'loc-surra',
      slug: 'surra',
      entityType: 'Location',
      isActive: true,
      isPhysicalLocation: false,
      title: 'Surra',
      description: 'Component-level laptop, MacBook and computer repair for Surra (45400), Jabriya (46300), Qadsiya (35700) and Shaab (35900). Free doorstep pickup to KCROC’s Hawalli repair lab.',
      heroBadge: 'Surra · Jabriya · Qadsiya · Shaab — Free Pickup',
      heroHeadline: 'Computer & MacBook Repair in Surra, Jabriya, Qadsiya & Shaab',
      localValueHeading: 'Across the ring-road corridors. One dedicated Hawalli repair lab.',
      localServicesHeading: 'Five Specialist Computer Repair Services for Surra and Nearby Districts',
      localPickupHeading: 'Four-district collection. Repairs at our Hawalli workshop.',
      localIntro: "KCROC connects Surra, Jabriya, Qadsiya and Shaab to one dedicated repair workshop in Hawalli. These neighboring districts connect with the Hawalli side through the Third and Fourth Ring Road corridors, Cairo Street and King Fahd Road (Route 40), depending on the block and pickup point. We arrange free doorstep collection and return delivery by block and location pin, then log each device for diagnosis at our ESD-safe lab in Al Mullah Complex, Basement Shop 19, Ibn Khaldoun Street. The same workshop team handles the inspection and approved repair; you do not need to drive across town or look for a local storefront. For diplomatic residences, clinics, offices and family devices, normal diagnostics are hardware-focused and do not involve browsing personal files. Owners of supported Windows laptops and desktops may ask about retaining a removable NVMe or SATA drive before collection. You can also visit the Hawalli workshop in person. We diagnose the charger, connector, display path and motherboard before recommending a repair, and provide the quote before paid work begins.",
      localHighlights: [
        { title: 'Surra — Blocks 1–6 · 45400', description: 'Collection across all six Surra blocks. Published block-code references include 45401 (Block 1), 45402 (Block 2), 45404 (Block 4), 45405 (Block 5) and 45406 (Block 6). For Block 3, use the general area code 45400 or confirm the current block entry with the Ministry of Communications. Route references include the Fourth Ring Road corridor and residential approaches around Ali Bin Abi Talib Street and Tariq Bin Ziyad Street. Share your block and a location pin near Surra Cooperative Society or your street so the courier can confirm the collection route.' },
        { title: 'Jabriya — Blocks 1–12 · 46300', description: 'Coverage across Jabriya Blocks 1–12, with block postal references 46301–46312. Route references include the Fourth Ring Road and King Fahd Road (Route 40); collection can be arranged from homes, offices and clinic buildings around Jabriya Co-op and Mubarak Al-Kabeer Hospital. Share your block and building pin to confirm the handover point.' },
        { title: 'Qadsiya — Blocks 1–9 · 35700', description: 'Pickup can be arranged throughout Qadsiya Blocks 1–9, with block postal references 35701–35709. Cairo Street and the Third Ring Road are useful area references; share the nearest street or pin around Qadsiya Co-op or Qadsiya Sporting Club.' },
        { title: 'Shaab — Blocks 1–9 · 35900', description: 'Coverage includes Shaab Blocks 1–9, with block postal references 35901–35909, including residential and coastal-side addresses. Cairo Street and Gulf Road are useful area references; share your block and pin near Shaab Co-op or your building entrance.' }
      ],
      localServiceCards: [
        {
          title: 'Laptop Repair & Thermal Service',
          problem: 'No-power faults, random shutdowns, overheating, loud fans, damaged charging connectors or everyday hardware problems on supported Dell, HP, Lenovo, ASUS, Acer and MSI laptops.',
          expertise: 'We inspect the device and use microscope checks, bench power-supply current profiling, multimeter testing, schematic and boardview tracing, and thermal imaging when the fault calls for it.',
          solution: 'Free initial diagnosis, a clear quote before paid work and a 30-day warranty on completed repairs. Published thermal-service rates are 15–20 KWD.',
          serviceIds: ['srv-laptop']
        },
        {
          title: 'MacBook Air & MacBook Pro Repair',
          problem: 'MacBooks with no power, USB-C charging faults, liquid exposure, a black or flickering display, battery problems or logic-board symptoms.',
          expertise: 'We check the model and affected circuit first. Where the board design and damage allow it, technicians trace and repair the failed component on the original logic board rather than defaulting to a full-board replacement.',
          solution: 'MacBook service starts from 25 KWD. The exact repair and parts quote is confirmed after inspection; data preservation is a priority but cannot be guaranteed for every fault.',
          serviceIds: ['srv-macbook']
        },
        {
          title: 'Laptop, MacBook & Desktop Motherboard Repair',
          problem: 'A dead computer, unstable power, a charging fault, a shorted power rail or liquid-related corrosion that may originate on the motherboard.',
          expertise: 'We trace the power path with boardview references, multimeter measurements and thermal diagnosis, then assess whether the failed connector, fuse, MOSFET, capacitor or other component can be repaired.',
          solution: 'Component-level motherboard work starts from 25 KWD. We quote first and follow KCROC’s No Fix, No Fee policy.',
          serviceIds: ['srv-motherboard']
        },
        {
          title: 'Laptop Screen & Backlight Diagnosis',
          problem: 'Cracked displays, vertical lines, flicker, dim screens, or a laptop that powers on while the display remains black.',
          expertise: 'We distinguish a failed panel from an eDP cable, connector, backlight or related board fault before recommending a replacement.',
          solution: 'Screen-replacement labour starts from 30 KWD plus the verified panel cost. The exact compatible part is checked against your laptop model.',
          serviceIds: ['srv-screen']
        },
        {
          title: 'Laptop DC Jack & USB-C Charging Port Repair',
          problem: 'The laptop charges only when the cable is held at an angle, the port feels loose, or a compatible USB-C/DC charger is not recognized.',
          expertise: 'We check the adapter, connector pins, port solder joints, mounting pads and charging circuit. A damaged connector or lifted pad is assessed for microscope-guided repair where technically viable.',
          solution: 'Charging-port service starts from 20 KWD. Stop forcing or wiggling a loose plug; we confirm the cause and quote before repair.',
          serviceIds: ['srv-charging-port']
        }
      ],
      localPricingAnchors: [
        { label: 'Initial bench diagnosis', price: 'FREE', note: 'No-obligation initial assessment before a paid repair is approved.' },
        { label: 'Laptop thermal service', price: '15–20 KWD', note: 'Published service rate; exact work depends on the cooling condition and model.' },
        { label: 'Charging-port repair', price: 'From 20 KWD', note: 'DC jack, USB-C connector and board-level scope are confirmed after inspection.' },
        { label: 'Motherboard component repair', price: 'From 25 KWD', note: 'Final quote depends on the failed component, board condition and parts.' },
        { label: 'Screen replacement labour', price: 'From 30 KWD + panel', note: 'The compatible display panel is quoted separately after model verification.' }
      ],
      localFaqs: [
        { id: 'faq-surra-local-1', question: 'Do you have a walk-in repair shop in Surra?', answer: 'KCROC does not operate a walk-in branch in Surra. We arrange free doorstep pickup and return delivery, while all diagnostics and repairs are completed at our central Hawalli workshop: Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19. You can also visit the Hawalli workshop directly.' },
        { id: 'faq-surra-local-2', question: 'Do you collect from Jabriya, Qadsiya and Shaab as well as Surra?', answer: 'Yes. Free pickup and return delivery can be arranged across Surra, Jabriya, Qadsiya and Shaab, as well as nearby Qortuba. Send your district, block, building or house details and a location pin on WhatsApp so the collection time can be confirmed.' },
        { id: 'faq-surra-local-3', question: 'My laptop only charges when I move or hold the cable at an angle. What should I do?', answer: 'Stop moving or forcing the plug and disconnect the charger. An intermittent connection can point to a worn DC jack or USB-C receptacle, fractured solder joints, damaged connector pads, or a fault elsewhere in the charging path. Repeated flexing can worsen the connection and create heat; unplug immediately if the port becomes hot, sparks or smells burnt. KCROC tests the adapter, port and charging circuit before quoting a repair.' },
        { id: 'faq-surra-local-4', question: 'Can you repair a laptop that turns on but shows a black screen?', answer: 'Yes. A black display can be caused by the panel, display cable or connector, backlight path, memory or motherboard initialization. We check the likely causes at the Hawalli lab before recommending a panel or board repair, then quote before paid work.' },
        { id: 'faq-surra-local-5', question: 'Can you repair a MacBook motherboard without replacing the whole logic board?', answer: 'Where the MacBook model, board design and fault make it technically viable, we trace the affected circuit and can replace a failed component on the original logic board. Some boards are not economically or technically repairable, and data access or preservation cannot be guaranteed.' },
        { id: 'faq-surra-local-6', question: 'How much does computer and laptop repair cost for these four districts?', answer: 'Pickup, return delivery and the initial diagnostic are free. Published anchors include laptop thermal service at 15–20 KWD, charging-port service from 20 KWD, motherboard component repair from 25 KWD, and screen-replacement labour from 30 KWD plus the panel. MacBook service starts from 25 KWD. We confirm the exact price before paid work begins; under No Fix, No Fee, there is no repair charge if we cannot complete the agreed repair.' },
        { id: 'faq-surra-local-7', question: 'How long does pickup and repair take?', answer: 'Collection is arranged for an agreed time based on your block, the courier route and driver availability; we do not promise a fixed 5–10 minute dispatch or a guaranteed one-to-two-hour pickup. After the device reaches our Hawalli lab, the diagnostic and repair estimate depend on the fault, workload and parts availability. We confirm a realistic turnaround after inspection.' },
        { id: 'faq-surra-local-8', question: 'How do you protect personal, clinic or office data during repair?', answer: 'Our diagnostics are hardware-focused and technicians do not browse personal files as part of normal fault testing. For supported Windows laptops and desktops with removable NVMe or SATA storage, you may remove and keep the drive before collection. This is not possible on every device; many MacBooks have onboard or soldered storage. Data preservation is a priority, but cannot be guaranteed for every damaged device.' },
        { id: 'faq-surra-local-9', question: 'Where is the device repaired, and can I visit in person?', answer: 'All diagnostics and repairs take place at KCROC’s Hawalli workshop: Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19, Hawalli. The lab is open daily from 10:00 AM to 10:00 PM. You can walk in at this Hawalli address or book free collection from Surra, Jabriya, Qadsiya or Shaab.' }
      ],
      landmark: 'Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19, Hawalli',
      coords: { lat: 29.3050, lng: 48.0400 },
      serviceRadiusKm: 12,
      serviceAreas: ['Surra', 'Jabriya', 'Qadsiya', 'Shaab', 'Qortuba'],
      areaPostalCode: '45400',
      areaPostalRegion: 'Capital Governorate',
      additionalAreaPostalCodes: [
        { name: 'Surra Block 1', postalCode: '45401', addressRegion: 'Capital Governorate' },
        { name: 'Surra Block 2', postalCode: '45402', addressRegion: 'Capital Governorate' },
        { name: 'Surra Block 4', postalCode: '45404', addressRegion: 'Capital Governorate' },
        { name: 'Surra Block 5', postalCode: '45405', addressRegion: 'Capital Governorate' },
        { name: 'Surra Block 6', postalCode: '45406', addressRegion: 'Capital Governorate' },
        { name: 'Jabriya (general area)', postalCode: '46300', addressRegion: 'Hawalli Governorate' },
        { name: 'Jabriya Block 1', postalCode: '46301', addressRegion: 'Hawalli Governorate' },
        { name: 'Jabriya Block 2', postalCode: '46302', addressRegion: 'Hawalli Governorate' },
        { name: 'Jabriya Block 3', postalCode: '46303', addressRegion: 'Hawalli Governorate' },
        { name: 'Jabriya Block 4', postalCode: '46304', addressRegion: 'Hawalli Governorate' },
        { name: 'Jabriya Block 5', postalCode: '46305', addressRegion: 'Hawalli Governorate' },
        { name: 'Jabriya Block 6', postalCode: '46306', addressRegion: 'Hawalli Governorate' },
        { name: 'Jabriya Block 7', postalCode: '46307', addressRegion: 'Hawalli Governorate' },
        { name: 'Jabriya Block 8', postalCode: '46308', addressRegion: 'Hawalli Governorate' },
        { name: 'Jabriya Block 9', postalCode: '46309', addressRegion: 'Hawalli Governorate' },
        { name: 'Jabriya Block 10', postalCode: '46310', addressRegion: 'Hawalli Governorate' },
        { name: 'Jabriya Block 11', postalCode: '46311', addressRegion: 'Hawalli Governorate' },
        { name: 'Jabriya Block 12', postalCode: '46312', addressRegion: 'Hawalli Governorate' },
        { name: 'Qadsiya (general area)', postalCode: '35700', addressRegion: 'Capital Governorate' },
        { name: 'Qadsiya Block 1', postalCode: '35701', addressRegion: 'Capital Governorate' },
        { name: 'Qadsiya Block 2', postalCode: '35702', addressRegion: 'Capital Governorate' },
        { name: 'Qadsiya Block 3', postalCode: '35703', addressRegion: 'Capital Governorate' },
        { name: 'Qadsiya Block 4', postalCode: '35704', addressRegion: 'Capital Governorate' },
        { name: 'Qadsiya Block 5', postalCode: '35705', addressRegion: 'Capital Governorate' },
        { name: 'Qadsiya Block 6', postalCode: '35706', addressRegion: 'Capital Governorate' },
        { name: 'Qadsiya Block 7', postalCode: '35707', addressRegion: 'Capital Governorate' },
        { name: 'Qadsiya Block 8', postalCode: '35708', addressRegion: 'Capital Governorate' },
        { name: 'Qadsiya Block 9', postalCode: '35709', addressRegion: 'Capital Governorate' },
        { name: 'Shaab (general area)', postalCode: '35900', addressRegion: 'Hawalli Governorate' },
        { name: 'Shaab Block 1', postalCode: '35901', addressRegion: 'Hawalli Governorate' },
        { name: 'Shaab Block 2', postalCode: '35902', addressRegion: 'Hawalli Governorate' },
        { name: 'Shaab Block 3', postalCode: '35903', addressRegion: 'Hawalli Governorate' },
        { name: 'Shaab Block 4', postalCode: '35904', addressRegion: 'Hawalli Governorate' },
        { name: 'Shaab Block 5', postalCode: '35905', addressRegion: 'Hawalli Governorate' },
        { name: 'Shaab Block 6', postalCode: '35906', addressRegion: 'Hawalli Governorate' },
        { name: 'Shaab Block 7', postalCode: '35907', addressRegion: 'Hawalli Governorate' },
        { name: 'Shaab Block 8', postalCode: '35908', addressRegion: 'Hawalli Governorate' },
        { name: 'Shaab Block 9', postalCode: '35909', addressRegion: 'Hawalli Governorate' },
      ],
      serviceTypes: [
        'Component-level laptop and desktop computer repair',
        'MacBook Air and MacBook Pro diagnostics and logic-board repair',
        'Laptop charging-port, USB-C and DC-jack repair',
        'Motherboard micro-soldering and power-rail diagnostics',
        'Laptop screen, display-cable and backlight fault diagnosis'
      ],
      relatedServiceIds: ['srv-laptop', 'srv-macbook', 'srv-motherboard', 'srv-screen', 'srv-charging-port'],
      relatedProblemIds: ['problem-no-power', 'problem-overheating', 'problem-black-screen', 'problem-not-charging', 'problem-cracked-screen'],
      relatedLocationIds: ['loc-hawalli', 'loc-adailiya', 'loc-qortuba', 'loc-yarmouk', 'loc-mishref'],
      contentImage: { src: IMAGES.laptopHardware.dellLaptopScreenRepairCompleted.src, alt: IMAGES.laptopHardware.dellLaptopScreenRepairCompleted.alt, width: IMAGES.laptopHardware.dellLaptopScreenRepairCompleted.width, height: IMAGES.laptopHardware.dellLaptopScreenRepairCompleted.height, caption: 'Laptop and motherboard diagnostics for customers in Surra, Jabriya, Qadsiya and Shaab, completed at the KCROC Hawalli workshop.' },
      seo: {
        title: 'Computer Repair Surra, Jabriya, Qadsiya & Shaab | KCROC',
        description: 'Laptop, MacBook, charging-port and motherboard repair for Surra (45400), Jabriya (46300), Qadsiya (35700) and Shaab (35900). Free pickup to our Hawalli lab.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/location/surra',
        ogType: 'website',
        schemaTypes: ['LocalBusiness'],
        lastModified: '2026-11-05T00:00:00+03:00'
      },
      navigationPriority: 86
    } as LocationEntity,

    'loc-khaitan': { id: 'loc-khaitan', slug: 'khaitan', entityType: 'Location', isActive: true, isPhysicalLocation: false,
      title: 'Khaitan',
      description: 'Computer and laptop repair for Khaitan, with free pickup for screen, charging, battery, no-power and motherboard faults.',
      localIntro: "For Khaitan, Farwaniya, Riggae and Ardiya, KCROC arranges free pickup and sends devices to the Hawalli workshop for diagnosis. We check screen, charging, battery and no-power faults rather than assuming the first suspected part is defective, then explain the repair options and price before proceeding. The repaired device is tested before delivery.",
      localHighlights: [
        { title: 'Khaitan pickup coverage', description: 'Free pickup is available from Khaitan and connects directly into KCROC\'s existing Farwaniya service network.' },
        { title: 'Power and charging faults', description: 'Dead laptops, intermittent charging and damaged charging ports are tested before component replacement.' },
        { title: 'Screens and batteries', description: 'Screen and battery replacement are available for supported laptop and MacBook models.' },
        { title: 'Motherboard repair', description: 'Component-level board diagnosis is available when a simple part swap is not the right answer.' }
      ],
            localFaqs: [
        { id: "faq-khaitan-local-1", question: "Do you collect from Khaitan, Farwaniya, Riggae and Ardiya?", answer: "Yes. Khaitan, Farwaniya, Riggae and Ardiya are covered by free pickup and delivery. Send your area and the device symptoms on WhatsApp and we will arrange collection." },
        { id: "faq-khaitan-local-2", question: "My charger fits but the laptop will not charge. Is the charging port broken?", answer: "Check the charger light, try another outlet and look inside the port for debris. If the charger works on another laptop, the port or the charging circuit is the likely cause. We test the adapter, the port and the power path on the bench before recommending a repair." },
        { id: "faq-khaitan-local-3", question: "My laptop screen shows lines after I closed it hard. Is it the cable?", answer: "It might be the display cable or the hinge area stressing it, though the panel itself can also be damaged. Open and close the lid slowly and see whether the picture changes. If it does, the cable is the likely cause. We confirm it before quoting." },
        { id: "faq-khaitan-local-4", question: "My laptop is not turning on and there is no light at all. Where do I start?", answer: "Check the outlet and the charger light, remove any USB devices and hold the power button for around 30 seconds. If there is still no sign of life, the adapter, the battery or the power circuit may have failed. We test each of them on the bench." },
        { id: "faq-khaitan-local-5", question: "A repair I was quoted elsewhere was a full motherboard replacement. Is there another option?", answer: "Often there is. Many motherboard faults come from a single failed component, such as a power chip, which can be repaired at component level instead of replacing the board. Bring it in and we will diagnose it, explain the options and give a quote before any paid work." },
        { id: "faq-khaitan-local-6", question: "Is there a branch in Khaitan, and where is the repair done?", answer: "There is no walk-in branch in Khaitan. Devices are repaired at our Hawalli lab (Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19), open daily from 10:00 AM to 10:00 PM. You can bring a device in yourself or have it collected for free, and repairs carry a 30-day warranty." },
      ],
      landmark: 'Mobile Dispatch Area (Equipment processed at our central Hawalli workshop: Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19)',
      coords: { lat: 29.2700, lng: 47.9900 }, serviceRadiusKm: 18, serviceAreas: ['Khaitan', 'Farwaniya', 'Riggae', 'Ardiya'],
      relatedServiceIds: ['srv-laptop', 'srv-screen', 'srv-charging-port', 'srv-battery'], relatedProblemIds: ['problem-not-charging', 'problem-black-screen', 'problem-no-power', 'problem-cracked-screen'], contentImage: { src: IMAGES.motherboard.thermalGrizzly1.src, alt: IMAGES.motherboard.thermalGrizzly1.alt, width: IMAGES.motherboard.thermalGrizzly1.width, height: IMAGES.motherboard.thermalGrizzly1.height, caption: 'Motherboard and thermal repair serving Khaitan and Farwaniya-area customers.' },
      seo: { title: "Computer Repair Khaitan | Free Pickup | KCROC", description: "Laptop and computer repair for Khaitan, Farwaniya, Riggae and Ardiya, with free pickup and diagnosis at KCROC's Hawalli lab.", canonicalUrl: 'https://www.computerrepairkuwait.com/location/khaitan', ogType: 'website', schemaTypes: ['LocalBusiness'], lastModified: '2026-10-02T00:00:00+03:00' },
      navigationPriority: 72
    } as LocationEntity,

    'loc-riggae': { id: 'loc-riggae', slug: 'riggae', entityType: 'Location', isActive: true, isPhysicalLocation: false,
      title: 'Riggae',
      description: 'Laptop, MacBook and computer repair for Riggae with free pickup to KCROC\'s Hawalli lab, covering common power, display and charging issues.',
      localIntro: "KCROC covers Riggae and nearby Khaitan, Farwaniya and Ardiya with scheduled pickup and delivery. Laptops that will not power on, have a black display or fail to charge are diagnosed at the Hawalli lab, where technicians check the relevant power, display or charging path before quoting. Riggae is a service area, not a separate walk-in branch.",
      localHighlights: [
        { title: 'Pickup from Riggae', description: 'Free collection and return delivery are available for residents and home offices in Riggae.' },
        { title: 'No-power and charging diagnosis', description: 'Charging ports, power rails and related motherboard faults are checked systematically.' },
        { title: 'Screen repair', description: 'Cracked, dim or failed laptop displays can be assessed for panel, cable and board causes.' },
        { title: 'MacBook support', description: 'Apple MacBooks are handled alongside Windows laptops, including liquid-damage and board diagnostics.' }
      ],
            localFaqs: [
        { id: "faq-riggae-local-1", question: "Do you collect from Riggae, Khaitan, Farwaniya and Ardiya?", answer: "Yes. Riggae, Khaitan, Farwaniya and Ardiya are covered by free pickup and delivery. Send your area and the device symptoms on WhatsApp and we will arrange collection." },
        { id: "faq-riggae-local-2", question: "My laptop shuts off by itself after a few minutes. What could be causing it?", answer: "The usual causes are overheating, a failing battery or a power-delivery fault on the board. If the laptop feels very hot or the fan is loud, thermal build-up is likely. If it dies even when plugged in, the charging circuit needs testing. We diagnose it on the bench before suggesting any part." },
        { id: "faq-riggae-local-3", question: "Some keys on my laptop stopped working. Is it the keyboard or something else?", answer: "Plug in a USB keyboard to check. If the external keyboard works normally, the laptop's keyboard or its ribbon cable is the problem. If keys also fail on the external one, a software or board fault is more likely. Liquid spills are a common cause of patchy key failure, so mention any past spill when you contact us." },
        { id: "faq-riggae-local-4", question: "My MacBook got wet and still turns on. Does it still need repair?", answer: "Yes, it is worth having it checked even if it still works. Liquid damage can keep corroding components after it seems fine, and faults sometimes appear days later. Switch it off, keep it unplugged and bring it in as soon as you can so the board can be inspected and cleaned at component level." },
        { id: "faq-riggae-local-5", question: "My laptop screen flickers or shows a faint image. What does that point to?", answer: "Shine a torch at the screen at an angle. A faint image usually points to the backlight, while flickering that changes when you move the lid often points to the display cable. An external monitor that works properly points away from the board. We confirm which part has failed before quoting." },
        { id: "faq-riggae-local-6", question: "Is there a branch in Riggae, and where is the repair done?", answer: "There is no walk-in branch in Riggae. Devices are repaired at our Hawalli lab (Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19), open daily from 10:00 AM to 10:00 PM. You can bring a device in yourself or have it collected for free, and repairs carry a 30-day warranty." },
      ],
      landmark: 'Mobile Dispatch Area (Equipment processed at our central Hawalli workshop: Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19)',
      coords: { lat: 29.2770, lng: 47.9500 }, serviceRadiusKm: 18, serviceAreas: ['Riggae', 'Khaitan', 'Farwaniya', 'Ardiya'],
      relatedServiceIds: ['srv-laptop', 'srv-screen', 'srv-charging-port', 'srv-motherboard'], relatedProblemIds: ['problem-black-screen', 'problem-no-power', 'problem-not-charging', 'problem-slow'], contentImage: { src: IMAGES.services.motherboardRepair.src, alt: IMAGES.services.motherboardRepair.alt, width: IMAGES.services.motherboardRepair.width, height: IMAGES.services.motherboardRepair.height, caption: 'Laptop motherboard and computer repair serving Riggae and nearby Farwaniya areas.' },
      seo: { title: "Computer Repair Riggae | Free Pickup | KCROC", description: "Laptop and computer repair for Riggae, Khaitan and Farwaniya. Free pickup and delivery; devices are repaired at the Hawalli workshop.", canonicalUrl: 'https://www.computerrepairkuwait.com/location/riggae', ogType: 'website', schemaTypes: ['LocalBusiness'], lastModified: '2026-10-02T00:00:00+03:00' },
      navigationPriority: 70
    } as LocationEntity,

    'loc-ardiya': { id: 'loc-ardiya', slug: 'ardiya', entityType: 'Location', isActive: false, isPhysicalLocation: false,
      title: 'Ardiya',
      description: 'Laptop and computer repair for Ardiya with pickup to KCROC\'s Hawalli lab, including motherboard, screen, battery and gaming PC work.',
      localIntro: "For Ardiya, Farwaniya, Riggae and Jleeb Al-Shuyoukh, KCROC provides free collection and return from home or office. We diagnose laptop and PC display, battery, power and motherboard symptoms at our Hawalli lab, then recommend a repair based on the actual fault. Every approved repair is checked before the device is returned.",
      localHighlights: [
        { title: 'Ardiya pickup service', description: 'Free device collection is available across Ardiya and nearby Farwaniya-area communities.' },
        { title: 'Laptop and gaming PC repair', description: 'Both everyday laptops and gaming systems are supported, including thermal and no-power issues.' },
        { title: 'Board-level troubleshooting', description: 'Motherboard faults can be traced to individual components when repairable at component level.' },
        { title: 'Free return delivery', description: 'After the repair is tested, the device is delivered back to the customer.' }
      ],
            localFaqs: [
        { id: "faq-ardiya-local-1", question: "Do you collect from Ardiya, Farwaniya, Riggae and Jleeb Al-Shuyoukh?", answer: "Yes. Ardiya, Farwaniya, Riggae and Jleeb Al-Shuyoukh are covered by free pickup and delivery. Send your area and the device symptoms on WhatsApp and we will arrange collection." },
        { id: "faq-ardiya-local-2", question: "My gaming PC shuts down during games. Is the power supply failing?", answer: "It can be. A weak power supply, overheating or a faulty graphics card can all cause a shutdown under load. Check that the fans spin and that dust has not clogged the case. We test the power supply and monitor temperatures to narrow down the cause." },
        { id: "faq-ardiya-local-3", question: "My laptop screen is black but I can hear it starting. What does that mean?", answer: "If you can hear the fans and startup sounds but see nothing, connect an external monitor. If an image appears, the panel or cable is the likely problem. If there is still nothing, we test the board and the graphics hardware on the bench." },
        { id: "faq-ardiya-local-4", question: "My laptop battery is drained within minutes even when new. Why?", answer: "A new battery that drains quickly can point to a fault in the charging circuit or something drawing too much power. We test both the battery and the charging circuit, so you do not buy a second battery that does not fix the issue." },
        { id: "faq-ardiya-local-5", question: "The motherboard on my laptop might be damaged. Will you replace it right away?", answer: "No. We trace the fault to the failed component first and repair it at component level where possible, because replacing the whole motherboard costs more. We tell you what we found and the quote before any paid work, and No Fix, No Fee applies." },
        { id: "faq-ardiya-local-6", question: "Is there a branch in Ardiya, and where is the repair done?", answer: "There is no walk-in branch in Ardiya. Devices are repaired at our Hawalli lab (Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19), open daily from 10:00 AM to 10:00 PM. You can bring a device in yourself or have it collected for free, and repairs carry a 30-day warranty." },
      ],
      landmark: 'Mobile Dispatch Area (Equipment processed at our central Hawalli workshop: Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19)',
      coords: { lat: 29.2850, lng: 47.9250 }, serviceRadiusKm: 20, serviceAreas: ['Ardiya', 'Farwaniya', 'Riggae', 'Jleeb Al-Shuyoukh'],
      relatedServiceIds: ['srv-laptop', 'srv-motherboard', 'srv-battery', 'srv-gaming'], relatedProblemIds: ['problem-no-power', 'problem-bsod', 'problem-black-screen', 'problem-overheating'], contentImage: { src: IMAGES.gaming.gamingOverheating.src, alt: IMAGES.gaming.gamingOverheating.alt, width: IMAGES.gaming.gamingOverheating.width, height: IMAGES.gaming.gamingOverheating.height, caption: 'Gaming PC cooling and laptop repair serving Ardiya customers.' },
      seo: { title: "Computer Repair Ardiya | Free Pickup | KCROC", description: "Laptop and computer repair for Ardiya, Farwaniya and Jleeb Al-Shuyoukh, with free pickup and repair at our Hawalli lab.", canonicalUrl: 'https://www.computerrepairkuwait.com/location/ardiya', ogType: 'website', schemaTypes: ['LocalBusiness'], lastModified: '2026-10-02T00:00:00+03:00' },
      navigationPriority: 68
    } as LocationEntity,

    'loc-mahboula': {
      id: 'loc-mahboula',
      slug: 'mahboula',
      entityType: 'Location',
      isActive: true,
      isPhysicalLocation: false,
      heroBadge: 'Mahboula (54000) · Blocks 1–4 · Southern coastal pickup',
      heroHeadline: 'Computer, Gaming PC & MacBook Repair in Mahboula',
      localValueHeading: 'Skip the Cross-City Drop-Off. Book Free Doorstep Pickup in Mahboula.',
      localServicesHeading: 'Laptop, MacBook & Gaming Hardware Services for Mahboula',
      localPickupHeading: 'Southern Coastal Pickup via Route 30 — Repairs at Our Hawalli Lab',
      title: 'Mahboula',
      description: 'Laptop, MacBook, gaming PC and thermal-service pickup in Mahboula, with repairs and testing at KCROC’s Hawalli laboratory.',
      localIntro: "When a gaming laptop starts thermal-throttling, a desktop powers on with no display, or a MacBook stops charging, you should not need to carry it across Kuwait and make a second trip to collect it. KCROC arranges free doorstep collection in Mahboula and the surrounding southern coastal corridor, then takes the device to our central ESD-safe laboratory in Hawalli: Ibn Khaldoun Street, Al Mullah Complex, Basement Shop 19. The Fahaheel Expressway (Route 30) and Coastal Road connect this pickup area to the rest of Kuwait, but you can start the repair from home. We diagnose the actual fault, explain the options and provide a quote before paid work begins; after an approved repair, the device is tested before return delivery. For Mahboula addresses, share your block, street, building and a WhatsApp location pin. Blocks 1–4 use postal references 54001–54004; the general Mahboula area code is 54000.",
      localHighlights: [
        {
          title: 'Free collection across the southern coastal corridor',
          description: 'Pickup and return delivery can be arranged for Mahboula, Abu Halifa, Mangaf, Fahaheel, Fintas, Egaila and Ahmadi. Send the exact block, street, building and location pin so the handover point can be confirmed.'
        },
        {
          title: 'Clear local references for Mahboula addresses',
          description: 'Mahboula general postal code 54000; Blocks 1–4 use 54001, 54002, 54003 and 54004. Spoons Complex is a useful reference on Mahboula Block 2 along Coastal Road. Use your building and map pin as the final pickup reference.'
        },
        {
          title: 'Gaming laptop thermal service, not just an outside dust blow',
          description: 'We inspect fan operation, heatsink fins, heat-pipe contact and CPU/GPU temperatures. Where the model supports it, the thermal interface may use Honeywell PTM7950 or Arctic MX-6; VRM/VRAM pad condition and thickness are checked against the laptop design.'
        },
        {
          title: 'One repair workflow at the Hawalli laboratory',
          description: 'The team that diagnoses the device at KCROC’s Hawalli lab carries out the approved repair and testing there. You receive the findings and a quote before paid work; completed hardware repairs carry the 30-day warranty.'
        }
      ],
      localServiceCards: [
        {
          title: 'Laptop Repair & Component-Level Motherboard Diagnosis',
          problem: 'A laptop will not power on, charges intermittently, overheats, freezes, shows a black screen, or has a liquid-damage or display fault.',
          expertise: 'We check the model-specific power, charging, display and motherboard paths first. Where the original board is repairable, microscope-assisted diagnostics and component-level micro-soldering are considered before recommending a full-board replacement.',
          solution: 'Book free Mahboula pickup and return delivery. The device is assessed at our Hawalli lab, and you receive the diagnosis and a clear quote before any paid repair begins.',
          serviceIds: ['srv-laptop', 'srv-motherboard']
        },
        {
          title: 'MacBook Air & MacBook Pro Repair',
          problem: 'A MacBook will not start, no longer charges through USB-C or MagSafe, has a black display, or has suffered a liquid spill.',
          expertise: 'We assess the exact Intel or Apple Silicon model, charging path, display and logic-board condition, then consider component-level repair where technically suitable. A board repair is not a data-recovery guarantee.',
          solution: 'Arrange free collection from Mahboula. We explain the repair options and quote before work; completed repairs are tested and covered by KCROC’s 30-day warranty.',
          serviceIds: ['srv-macbook']
        },
        {
          title: 'Complete Gaming PC Repair & GPU No-Display Diagnostics',
          problem: 'A full gaming desktop powers on but shows no picture, crashes under load, restarts during games, overheats, or loses performance.',
          expertise: 'We assess the complete system: monitor path, installed GPU, memory, PSU, PCIe power connectors, motherboard and relevant VRM/VRAM symptoms. A black screen is diagnosed systematically rather than treated as proof that the graphics card has failed.',
          solution: 'Collection of a complete tower can be arranged from Mahboula. Share the case size, cooling setup and symptoms when booking; individual graphics cards are not accepted as standalone repair jobs.',
          serviceIds: ['srv-gaming']
        },
        {
          title: 'Gaming Laptop Cleaning & Thermal Repaste',
          problem: 'ASUS ROG/TUF, MSI, Lenovo Legion and other gaming laptops run hot, make persistent fan noise, throttle during games or shut down under load.',
          expertise: 'We inspect the fan and heatsink assembly, clear dust from the cooling fins, check heat-pipe contact and assess the CPU/GPU thermal interface. PTM7950, Arctic MX-6 or compatible thermal materials are selected only where appropriate for the model; VRM/VRAM pad thickness is not guessed.',
          solution: 'Gaming-laptop thermal service is listed at 15–20 KWD. We reassemble and test temperatures and stability under a suitable workload before arranging free return delivery.',
          serviceIds: ['srv-gaming-laptop-cleaning']
        }
      ],
      localPricingAnchors: [
        { label: 'Pickup, return delivery & initial diagnostic', price: 'FREE', note: 'No charge for the initial hardware diagnosis; paid work starts only after you approve the quote.' },
        { label: 'Gaming laptop thermal service', price: '15–20 KWD', note: 'Internal cleaning and model-appropriate thermal-interface service.' },
        { label: 'Charging-port repair', price: '20–35 KWD', note: 'DC jack, USB-C connector and related board work are confirmed after inspection.' },
        { label: 'Motherboard component repair', price: '25–60 KWD', note: 'The final quote depends on the failed component, board condition and repair scope.' },
        { label: 'Liquid-damage repair', price: '35–90+ KWD', note: 'Depends on corrosion, affected assemblies and the work required.' },
        { label: 'MacBook board-level repair', price: '45–100+ KWD', note: 'Model and fault dependent; complex work and parts are quoted after diagnosis.' },
        { label: 'Laptop screen replacement labour', price: 'From 30 KWD + panel', note: 'The compatible display panel is priced separately after exact-model verification.' },
        { label: 'Battery replacement labour', price: '8–15 KWD + battery', note: 'Labour only; the compatible battery is priced separately.' },
        { label: 'Keyboard replacement labour', price: '10–20 KWD + keyboard', note: 'Labour only; the compatible keyboard or top-case assembly is priced separately.' }
      ],
      localFaqs: [
        {
          id: 'faq-mahboula-local-1',
          question: 'Do you have a walk-in computer repair shop in Mahboula?',
          answer: 'Mahboula is a pickup-and-delivery service area, not a separate KCROC branch. We arrange free collection from your address and complete diagnosis and repair at our central Hawalli laboratory: Ibn Khaldoun Street, Al Mullah Complex, Basement Shop 19. You can start the process from home without making a drop-off trip.'
        },
        {
          id: 'faq-mahboula-local-2',
          question: 'Do you collect from Abu Halifa, Mangaf, Fahaheel and Fintas as well as Mahboula?',
          answer: 'Yes. Free pickup and return delivery can be arranged in Mahboula, Abu Halifa, Mangaf, Fahaheel, Fintas, Egaila and Ahmadi. Send your exact block, street, building and location pin on WhatsApp so the collection point and time can be confirmed.'
        },
        {
          id: 'faq-mahboula-local-3',
          question: 'Can you collect a full-tower gaming PC from Mahboula?',
          answer: 'Yes. We can arrange collection for a complete gaming desktop tower. When booking, share the case size, approximate weight, cooling setup (air, AIO or custom loop) and the fault symptoms so transport can be planned. We diagnose the installed graphics card as part of the complete system; individual graphics cards are not accepted as standalone repair jobs.'
        },
        {
          id: 'faq-mahboula-local-4',
          question: 'My gaming laptop is very hot and the fans are loud. What can you do?',
          answer: 'Dust packed into the heatsink fins, fan problems, poor cooler contact or a degraded thermal interface can cause high temperatures, loud fans and reduced clock speeds. At the lab we inspect and clean the cooling assembly, check heat-pipe contact and model-specific VRM/VRAM pads, then select a suitable thermal material. Honeywell PTM7950 or Arctic MX-6 may be used where compatible with the laptop design. We test temperatures and stability after reassembly rather than promising a fixed temperature drop.'
        },
        {
          id: 'faq-mahboula-local-5',
          question: 'My gaming PC powers on but there is no picture. What should I check?',
          answer: 'First confirm the monitor is on the correct input and the HDMI or DisplayPort cable is connected to the graphics card outputs, not the motherboard ports. Note any motherboard CPU, DRAM, VGA or BOOT diagnostic light. If there is still no display, the cause could be memory, GPU, PSU, firmware, motherboard or the display path; bench testing identifies the fault before a repair quote.'
        },
        {
          id: 'faq-mahboula-local-6',
          question: 'How often should a gaming laptop be cleaned and have its thermal material serviced in Kuwait?',
          answer: 'There is no fixed interval that suits every model or user. For a heavily used gaming laptop in a dusty environment, an inspection around every 8–12 months is a practical guide, but service should be based on its condition. Persistent loud fans, rising temperatures, FPS drops or thermal shutdowns are reasons to have the cooling system checked sooner.'
        },
        {
          id: 'faq-mahboula-local-7',
          question: 'Can dead pixels or bright white patches on my laptop screen be repaired?',
          answer: 'A dead pixel or a bright pressure patch is usually a panel-layer fault and cannot be corrected with motherboard soldering or software. We inspect the panel and eDP display connection, verify the exact resolution and refresh-rate specification, and quote a model-matched panel replacement if the panel itself is damaged.'
        },
        {
          id: 'faq-mahboula-local-8',
          question: 'How much does laptop, gaming PC or MacBook repair cost for Mahboula customers?',
          answer: 'Pickup, return delivery and the initial hardware diagnostic are free. Published guide prices include gaming-laptop thermal service at 15–20 KWD, charging-port repair at 20–35 KWD, motherboard component repair at 25–60 KWD, liquid-damage repair at 35–90+ KWD, MacBook board-level repair at 45–100+ KWD, and screen-replacement labour from 30 KWD plus the panel. Battery labour is 8–15 KWD plus the battery; keyboard labour is 10–20 KWD plus the keyboard. The exact total depends on the model, fault and parts, and is confirmed before paid work.'
        },
        {
          id: 'faq-mahboula-local-9',
          question: 'How long does a repair take for Mahboula customers?',
          answer: 'The diagnosis and estimated completion time are confirmed after the device reaches our Hawalli lab. Many standard repairs take around 24–48 hours when the required parts are available; component-level motherboard work can take around 24–72 hours after diagnosis and approval. Complex faults, parts sourcing and workload can change the estimate, which we explain before proceeding.'
        },
        {
          id: 'faq-mahboula-local-10',
          question: 'Where is my device repaired, how is my data handled, and what if it cannot be fixed?',
          answer: 'All repairs take place at KCROC’s Hawalli laboratory: Ibn Khaldoun Street, Al Mullah Complex, Basement Shop 19. Our process is hardware-focused; technicians do not browse personal files. For supported Windows laptops and desktops with removable NVMe or SATA storage, you may retain the drive before collection. Many MacBooks use onboard storage, and no data-recovery or data-preservation result is guaranteed. Under the No Fix, No Fee policy, if we cannot complete a viable repair under the service terms, there is no repair charge and return delivery is free.'
        }
      ],
      landmark: 'Mobile Dispatch Area (Equipment processed at our central Hawalli workshop: Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19)',
      coords: { lat: 29.1470, lng: 48.1300 },
      serviceRadiusKm: 20,
      serviceAreas: ['Mahboula', 'Abu Halifa', 'Mangaf', 'Fahaheel', 'Fintas', 'Egaila', 'Ahmadi'],
      areaPostalCode: '54000',
      areaPostalRegion: 'Ahmadi Governorate',
      additionalAreaPostalCodes: [
        { name: 'Mahboula Block 1', postalCode: '54001', addressRegion: 'Ahmadi Governorate' },
        { name: 'Mahboula Block 2', postalCode: '54002', addressRegion: 'Ahmadi Governorate' },
        { name: 'Mahboula Block 3', postalCode: '54003', addressRegion: 'Ahmadi Governorate' },
        { name: 'Mahboula Block 4', postalCode: '54004', addressRegion: 'Ahmadi Governorate' },
        { name: 'Abu Halifa', postalCode: '54600', addressRegion: 'Ahmadi Governorate' },
        { name: 'Mangaf', postalCode: '53700', addressRegion: 'Ahmadi Governorate' },
        { name: 'Fahaheel', postalCode: '63000', addressRegion: 'Ahmadi Governorate' },
        { name: 'Fintas', postalCode: '50000', addressRegion: 'Ahmadi Governorate' },
        { name: 'Egaila', postalCode: '54200', addressRegion: 'Ahmadi Governorate' },
        { name: 'Ahmadi', postalCode: '60000', addressRegion: 'Ahmadi Governorate' }
      ],
      serviceTypes: [
        'Laptop and computer hardware repair',
        'MacBook repair and logic-board diagnostics',
        'Complete gaming PC and installed GPU diagnostics',
        'Gaming laptop cleaning and thermal-interface service',
        'Component-level motherboard repair'
      ],
      relatedServiceIds: ['srv-laptop', 'srv-macbook', 'srv-gaming', 'srv-gaming-laptop-cleaning'],
      relatedProblemIds: ['problem-overheating', 'problem-black-screen', 'problem-freezing-crashing', 'problem-no-power', 'problem-liquid-spill', 'problem-cracked-screen', 'problem-not-charging'],
      relatedBrandIds: ['brand-asus', 'brand-msi', 'brand-dell', 'brand-lenovo'],
      relatedLocationIds: ['loc-mangaf', 'loc-abu-halifa', 'loc-fahaheel', 'loc-ahmadi'],
      contentImage: {
        src: IMAGES.gaming.waterCooled.src,
        alt: IMAGES.gaming.waterCooled.alt,
        width: IMAGES.gaming.waterCooled.width,
        height: IMAGES.gaming.waterCooled.height,
        caption: 'Gaming desktop cooling and repair work for Mahboula and southern Kuwait, handled at KCROC’s Hawalli lab.'
      },
      seo: {
        title: 'Computer, Gaming PC & MacBook Repair Mahboula | KCROC',
        description: 'Laptop, MacBook, gaming PC and thermal repair in Mahboula (54000), Abu Halifa, Mangaf and Fahaheel. Free pickup and return delivery to KCROC’s Hawalli lab.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/location/mahboula',
        ogType: 'website',
        schemaTypes: ['LocalBusiness'],
        lastModified: '2026-11-06T00:00:00+03:00'
      },
      navigationPriority: 64
    } as LocationEntity,

    

    

    'loc-rawda': { id: 'loc-rawda', slug: 'rawda', entityType: 'Location', isActive: false, isPhysicalLocation: false,
      title: 'Rawda',
      description: 'Computer, laptop and MacBook repair for Rawda with free pickup and delivery to KCROC\'s Hawalli lab.',
      localIntro: "Residents in Rawda and nearby Adailiya, Surra and Hawalli can book free pickup and delivery with KCROC. We inspect laptop, MacBook and computer faults at the Hawalli workshop, trace the cause before recommending a screen or board repair, and test the device before return. The local page describes collection coverage; the physical repair lab remains in Hawalli.",
      localHighlights: [
        { title: 'Pickup across Rawda', description: 'Free collection is available across Rawda and nearby central residential areas.' },
        { title: 'Laptop and MacBook support', description: 'Screen, battery, charging, overheating and motherboard faults are diagnosed before repair approval.' },
        { title: 'No-power and black-screen diagnosis', description: 'Power-path and display faults are investigated systematically rather than replaced by guesswork.' },
        { title: 'Central workshop processing', description: 'Rawda is a service area, not a separate branch; repairs are completed at the Hawalli lab and returned after testing.' }
      ],
            localFaqs: [
        { id: "faq-rawda-local-1", question: "Do you collect from Rawda, Adailiya, Surra and Hawalli?", answer: "Yes. Rawda, Adailiya, Surra and Hawalli are covered by free pickup and delivery. Send your area and the device symptoms on WhatsApp and we will arrange collection." },
        { id: "faq-rawda-local-2", question: "My laptop battery swelled and the trackpad is lifting. Is it dangerous?", answer: "A swollen battery should be treated as a safety issue. Stop using and charging the laptop, keep it away from heat and do not press on the swelling or try to remove the battery yourself. Contact us and mention the swelling so we can arrange a careful collection and replace the battery." },
        { id: "faq-rawda-local-3", question: "My laptop gets very hot and the fan is loud. Can it be fixed without replacing it?", answer: "Usually yes. Dust-clogged vents and dried thermal paste are common causes, and cleaning the cooling system and applying fresh paste often brings temperatures back down. If the fan has failed, it can be replaced. We check the temperature under load before and after the work." },
        { id: "faq-rawda-local-4", question: "My laptop only charges when the cable is held at an angle. What is that?", answer: "That usually means a worn or loose charging port. Avoid wiggling the plug, because it can damage the board around the socket. We inspect the port and its solder joints and replace or repair it, then test charging from several angles before returning the laptop." },
        { id: "faq-rawda-local-5", question: "My laptop screen is dim and I can barely see the picture. Is the screen finished?", answer: "A very dim picture often means the backlight has failed and not the whole panel. Shine a torch at the screen to see if a faint image is visible. If it is, a backlight or panel repair is likely, and we will tell you which part is at fault before you approve any work." },
        { id: "faq-rawda-local-6", question: "Is there a branch in Rawda, and where is the repair done?", answer: "There is no walk-in branch in Rawda. Devices are repaired at our Hawalli lab (Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19), open daily from 10:00 AM to 10:00 PM. You can bring a device in yourself or have it collected for free, and repairs carry a 30-day warranty." },
      ],
      landmark: 'Mobile Dispatch Area (Equipment processed at our central Hawalli workshop: Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19)',
      coords: { lat: 29.32992, lng: 47.99842 }, serviceRadiusKm: 12, serviceAreas: ['Rawda', 'Adailiya', 'Surra', 'Hawalli'],
      relatedServiceIds: ['srv-laptop', 'srv-macbook', 'srv-screen', 'srv-motherboard'], relatedProblemIds: ['problem-black-screen', 'problem-no-power', 'problem-not-charging', 'problem-slow'], contentImage: { src: IMAGES.services.laptopRepair.src, alt: IMAGES.services.laptopRepair.alt, width: IMAGES.services.laptopRepair.width, height: IMAGES.services.laptopRepair.height, caption: 'Laptop and computer repair serving Rawda and nearby central Kuwait neighborhoods.' },
      seo: { title: "Computer Repair Rawda | Free Pickup | KCROC", description: "Laptop, MacBook and computer repair for Rawda and nearby Adailiya and Qortuba, with free pickup and delivery from our Hawalli lab.", canonicalUrl: 'https://www.computerrepairkuwait.com/location/rawda', ogType: 'website', schemaTypes: ['LocalBusiness'], lastModified: '2026-10-02T00:00:00+03:00' },
      navigationPriority: 52
    } as LocationEntity,

    'loc-messila': { id: 'loc-messila', slug: 'messila', entityType: 'Location', isActive: true, isPhysicalLocation: false,
      title: 'Messila',
      description: 'Laptop, MacBook and gaming PC repair for Messila with free pickup and delivery to KCROC\'s Hawalli workshop.',
      localIntro: "For Messila and nearby Abu Ftaira, Fnaitees and Mubarak Al-Kabeer, KCROC provides scheduled pickup and delivery to its Hawalli lab. We diagnose laptops, MacBooks and gaming PCs for power, thermal, display, battery and motherboard faults, then explain the repair route and quote before paid work. There is no separate walk-in workshop in Messila.",
      localHighlights: [
        { title: 'Messila pickup service', description: 'Free collection is available across Messila and nearby Mubarak Al-Kabeer communities.' },
        { title: 'Laptop and MacBook repairs', description: 'Screen, battery, charging, liquid-damage and motherboard faults are supported after diagnosis.' },
        { title: 'Gaming PC support', description: 'Gaming systems can be checked for overheating, shutdowns, thermal throttling and hardware instability.' },
        { title: 'No need to visit the lab', description: 'Pickup and return delivery keep the repair process convenient for customers in Messila.' }
      ],
            localFaqs: [
        { id: "faq-messila-local-1", question: "Do you collect from Messila, Abu Ftaira, Fnaitees and Mubarak Al-Kabeer?", answer: "Yes. Messila, Abu Ftaira, Fnaitees and Mubarak Al-Kabeer are covered by free pickup and delivery. Send your area and the device symptoms on WhatsApp and we will arrange collection." },
        { id: "faq-messila-local-2", question: "My gaming laptop crashes in the middle of a game. Is it overheating?", answer: "Overheating is one of the most common causes. Dust in the vents, worn fans or old thermal paste can push temperatures high enough to force a shutdown. Failing graphics hardware and faulty memory can also cause crashes. We monitor temperatures under load and check the hardware to find the cause." },
        { id: "faq-messila-local-3", question: "My laptop does not turn on after a power cut. What may have happened?", answer: "A power surge can damage the adapter, the charging circuit or components on the board. Try a different charger if you have one, and hold the power button for around 30 seconds. If it stays dead, we trace the power path on the bench and replace the failed component where possible." },
        { id: "faq-messila-local-4", question: "My MacBook starts but the screen stays black. Can it be repaired?", answer: "Check whether you can hear the startup sound or see a faint image with a torch held to the screen. A faint image points to the backlight. If there is nothing at all, the display, the cable or the board may be at fault. We diagnose it at component level before quoting." },
        { id: "faq-messila-local-5", question: "Is it worth repairing an older gaming laptop?", answer: "Often yes, if the fault is a repairable part such as a fan, a screen, the battery or a failed component on the board. We tell you the cost of the repair after diagnosis, so you can compare it with the value of the laptop before you decide. Diagnosis is free and No Fix, No Fee applies." },
        { id: "faq-messila-local-6", question: "Is there a branch in Messila, and where is the repair done?", answer: "There is no walk-in branch in Messila. Devices are repaired at our Hawalli lab (Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19), open daily from 10:00 AM to 10:00 PM. You can bring a device in yourself or have it collected for free, and repairs carry a 30-day warranty." },
      ],
      landmark: 'Mobile Dispatch Area (Equipment processed at our central Hawalli workshop: Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19)',
      coords: { lat: 29.24961, lng: 48.09397 }, serviceRadiusKm: 20, serviceAreas: ['Messila', 'Abu Ftaira', 'Fnaitees', 'Mubarak Al-Kabeer'],
      relatedServiceIds: ['srv-laptop', 'srv-macbook', 'srv-gaming', 'srv-battery'], relatedProblemIds: ['problem-overheating', 'problem-no-power', 'problem-black-screen', 'problem-freezing-crashing'], contentImage: { src: IMAGES.gaming.gamingLaptopFan.src, alt: IMAGES.gaming.gamingLaptopFan.alt, width: IMAGES.gaming.gamingLaptopFan.width, height: IMAGES.gaming.gamingLaptopFan.height, caption: 'Gaming laptop cooling and hardware diagnostics for customers in Messila.' },
      seo: { title: "Computer Repair Messila | Free Pickup | KCROC", description: "Laptop and gaming PC repair for Messila, Abu Ftaira and Fnaitees, with free pickup and delivery to KCROC's Hawalli lab.", canonicalUrl: 'https://www.computerrepairkuwait.com/location/messila', ogType: 'website', schemaTypes: ['LocalBusiness'], lastModified: '2026-10-02T00:00:00+03:00' },
      navigationPriority: 50
    } as LocationEntity,

    

 
 'loc-shuwaikh-residential': {
      id: 'loc-shuwaikh-residential', slug: 'shuwaikh-residential',
      entityType: 'Location', isActive: true, isPhysicalLocation: false,
      title: 'Shuwaikh Residential',
      description: 'Component-level MacBook, laptop and gaming PC repair for Shuwaikh Residential (Shuwaikh B), with free doorstep collection and return to KCROC’s ESD-safe Hawalli lab.',
      heroBadge: 'Private doorstep collection · Shuwaikh B · Area code 70000',
      heroHeadline: 'Computer & MacBook Repair for Shuwaikh B — Collected at Your Door',
      localValueHeading: 'Private Doorstep Collection. Lab-Direct Component Repair.',
      localServicesHeading: 'Specialist Hardware Services for Shuwaikh B',
      areaPostalCode: '70000',
      serviceTypes: [
        'Component-level motherboard diagnostics and repair',
        'MacBook logic-board diagnostics and micro-soldering',
        'Windows laptop and business-ultrabook hardware repair',
        'Complete gaming desktop and workstation diagnostics',
        'Laptop display and battery diagnostics and replacement'
      ],
      localIntro: 'A failed MacBook, premium Windows laptop or custom gaming PC should not mean carrying it across Kuwait just to get a reliable diagnosis. KCROC arranges free doorstep collection for Shuwaikh Residential (Shuwaikh B), then takes supported devices to its ESD-safe repair lab at Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19, Hawalli. There, the team checks the relevant power, charging, display, motherboard or cooling systems and explains the repair options before paid work begins. Where the fault and board condition allow, component-level repair can preserve the original logic board instead of defaulting to a full-board replacement; data access still depends on the health of the storage and related circuitry. For a removable Windows NVMe or SATA drive, ask about keeping the drive with you before collection. Use Shuwaikh B Co-op in Block 2, Shuwaikh Beach Park or Jamal Abdul Nasser Street as nearby map references when sending your pin. Share your block, street, device model, fault and map pin on WhatsApp so the team can confirm collection arrangements.',
      localHighlights: [
        {
          title: 'Hardware-only diagnostics and privacy',
          description: 'For supported power, charging, motherboard, display and cooling checks, the diagnostic stays focused on hardware rather than browsing personal files. An operating-system password is not needed for those hardware checks; any separate software test that needs access is explained and agreed first.'
        },
        {
          title: 'Keep a removable NVMe or SATA drive with you',
          description: 'For compatible Windows laptops and desktops, ask about removing a modular NVMe or SATA SSD before handover and keeping it with you. With the drive removed, operating-system, boot and storage tests cannot be completed until it is reinstalled.'
        },
        {
          title: 'Repair the original board where viable',
          description: 'The lab checks the affected power, charging and board circuits and assesses component-level repair before recommending a full motherboard replacement. Repairing the original board may preserve access to existing data, but no repair can guarantee data preservation when storage or controller hardware is damaged.'
        },
        {
          title: 'Shuwaikh B coverage, clearly identified',
          description: 'This page focuses on Shuwaikh Residential (Shuwaikh B), Blocks 1–6. The area-level postal code is 70000 and the block codes are 70001–70006. Shuwaikh Educational/Administrative (70030) and Shuwaikh Industrial (70050 area code; blocks 70051–70060) are separate districts.'
        }
      ],
      localServiceCards: [
        {
          title: 'MacBook Pro & MacBook Air Logic-Board Repair',
          problem: 'No-power faults, USB-C charging failures, liquid-related board damage, startup trouble or a black display on supported Intel and Apple silicon MacBooks.',
          expertise: 'We inspect the model-specific power, charging, display and logic-board circuits, then assess whether the original board can be repaired at component level.',
          solution: 'Free doorstep collection from Shuwaikh B and a clear quote before paid work. Data preservation depends on the condition of the storage and related circuitry.',
          serviceIds: ['srv-macbook', 'srv-motherboard']
        },
        {
          title: 'Executive Windows Laptop & Ultrabook Repair',
          problem: 'A laptop that will not power on, unreliable USB-C charging, BIOS/startup faults, damaged ports, hinge or chassis damage, or display problems.',
          expertise: 'Model-specific diagnostics for Dell XPS, Lenovo ThinkPad, HP, ASUS, Acer, MSI and Microsoft Surface systems, with board and connector repair considered where suitable.',
          solution: 'We confirm the model, fault and parts path at the Hawalli lab, then share the repair quote before any paid work begins.',
          serviceIds: ['srv-laptop', 'srv-charging-port']
        },
        {
          title: 'Gaming Desktop & Workstation Diagnostics',
          problem: 'No display, GPU-related instability, overheating, loud fans, shutdowns, crashes or performance drops on a complete gaming desktop or workstation.',
          expertise: 'We assess the complete system, including GPU, VRAM, motherboard, power delivery, memory and cooling. AIO and custom-loop cooling are assessed as part of the desktop system.',
          solution: 'Complete desktop towers can be collected for lab diagnosis. We confirm the fault and repair scope before proceeding; individual graphics cards are not accepted as standalone repair jobs.',
          serviceIds: ['srv-gaming']
        },
        {
          title: 'Laptop Display & Battery Service',
          problem: 'Cracked, flickering, lined or black displays, weak battery life, unexpected shutdowns or visible battery swelling.',
          expertise: 'We check the panel, display cable and backlight path, and assess battery health and charging behaviour before recommending a part replacement.',
          solution: 'The compatible panel or battery, part availability and total price are confirmed before paid work. A swollen battery should not be pressed, punctured, charged or kept in use.',
          serviceIds: ['srv-screen', 'srv-battery']
        }
      ],
      localFaqs: [
        {
          id: 'faq-shuwaikh-residential-1',
          question: 'Can KCROC collect my computer from Shuwaikh B so I do not need to visit Hawalli?',
          answer: 'Yes. Free doorstep pickup and return delivery can be arranged for supported repair jobs in Shuwaikh Residential. Your device is brought to the Hawalli lab for diagnosis and repair, then returned after the approved work and testing. Send your block and map pin on WhatsApp to confirm a collection time.'
        },
        {
          id: 'faq-shuwaikh-residential-2',
          question: 'Can I keep my removable NVMe or SATA SSD before collection?',
          answer: 'For compatible Windows laptops and desktops with a removable NVMe or SATA drive, contact us before collection to confirm the safest way to keep the drive with you. The computer can still be assessed for many hardware faults, but boot, operating-system and storage tests will be limited until the drive is reinstalled. Modern MacBooks with soldered storage do not have a removable M.2 SSD option.'
        },
        {
          id: 'faq-shuwaikh-residential-3',
          question: 'Do you need my Windows or Mac account password for hardware repair?',
          answer: 'A password is not needed for hardware-only power, charging, board, display or cooling diagnostics. The work focuses on the hardware rather than opening personal files. If a separate software test later requires account access, the reason is explained and your permission is requested first. Do not send your password in a WhatsApp message.'
        },
        {
          id: 'faq-shuwaikh-residential-4',
          question: 'Can you repair a MacBook logic board without replacing it or losing my data?',
          answer: 'Where the fault is repairable, KCROC assesses component-level repair of the original logic board before recommending a complete board replacement. Keeping the original board may preserve access to data on supported models, but it is not a data-recovery guarantee: storage chips, controllers or related power circuits may also be damaged.'
        },
        {
          id: 'faq-shuwaikh-residential-5',
          question: 'What happens if the motherboard cannot be repaired?',
          answer: 'KCROC’s No Fix, No Fee policy means there is no repair or diagnostic charge when the device cannot be fixed under the policy. The device is returned to you. The team explains the diagnostic result and any practical next step before closing the job.'
        },
        {
          id: 'faq-shuwaikh-residential-6',
          question: 'Is this page for Shuwaikh B, Shuwaikh Industrial or the Educational District?',
          answer: 'This page is specifically for Shuwaikh Residential (Shuwaikh B), with area code 70000 and block codes 70001–70006 for Blocks 1–6. Shuwaikh Educational and Administrative addresses use the 70030 area code, while Shuwaikh Industrial uses the 70050 area code and block codes 70051–70060. KCROC serves customers across Kuwait, but please send your exact location pin so the correct collection area can be confirmed.'
        }
      ],
      landmark: 'Mobile collection area — Shuwaikh Residential (Shuwaikh B); repairs are completed at the Hawalli lab',
      serviceRadiusKm: 12,
      serviceAreas: ['Shuwaikh B'],
      relatedServiceIds: [
        'srv-macbook', 'srv-motherboard', 'srv-laptop', 'srv-charging-port',
        'srv-gaming', 'srv-screen', 'srv-battery'
      ],
      relatedProblemIds: [
        'problem-no-power', 'problem-not-charging', 'problem-black-screen', 'problem-overheating'
      ],
      relatedLocationIds: ['loc-shamiya', 'loc-abdullah-al-salem', 'loc-kaifan', 'loc-nuzha'],
      contentImage: {
        src: IMAGES.brand.leadTechnician.src,
        alt: IMAGES.brand.leadTechnician.alt,
        width: IMAGES.brand.leadTechnician.width,
        height: IMAGES.brand.leadTechnician.height,
        caption: 'Component-level board diagnostics at KCROC’s Hawalli repair lab.'
      },
      seo: {
        title: 'MacBook & Computer Repair Shuwaikh B | Free Pickup | KCROC',
        description: 'Component-level MacBook, laptop and gaming PC repair for Shuwaikh Residential (Shuwaikh B). Free doorstep pickup to KCROC’s ESD-safe Hawalli lab, with a quote before paid work.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/location/shuwaikh-residential',
        ogType: 'website',
        schemaTypes: ['LocalBusiness'],
        lastModified: '2026-11-05T00:00:00+03:00'
      },
      navigationPriority: 92
    } as LocationEntity,

 'loc-abdullah-al-salem': {
      id: 'loc-abdullah-al-salem',
      slug: 'abdullah-al-salem',
      entityType: 'Location',
      isActive: true,
      isPhysicalLocation: false,
      title: 'Abdullah Al-Salem',
      description: 'USB-C charging and power-circuit diagnostics, MacBook logic-board repair, and random-freezing or crash diagnostics for Abdullah Al-Salem (Al-Dahiya), with free doorstep collection to KCROC’s Hawalli lab.',
      heroBadge: 'Al-Dahiya doorstep collection · Blocks 1–4 · Area code 72100',
      heroHeadline: 'Computer & MacBook Repair in Abdullah Al-Salem (Al-Dahiya)',
      localValueHeading: 'Charging Faults, Board-Level Repair & System Stability for Al-Dahiya',
      localServicesHeading: 'Specialist Power, MacBook & Stability Diagnostics for Abdullah Al-Salem',
      areaPostalCode: '72100',
      serviceTypes: [
        'USB-C Power Delivery and DC charging-port diagnostics',
        'Laptop charging-circuit and power-rail micro-soldering',
        'MacBook logic-board diagnostics and component-level repair',
        'Motherboard power-fault and stability diagnostics',
        'Computer freezing, random restart and crash diagnostics'
      ],
      localIntro: 'A laptop that only charges when the cable is held at an angle, a MacBook that stops accepting USB-C or MagSafe power, and a computer that freezes without warning are different symptoms—but none proves that an entire motherboard must be replaced. In Abdullah Al-Salem (Al-Dahiya), KCROC focuses this service on the power path and system stability: we distinguish a worn connector or cracked solder joint from a board-side USB-C Power Delivery controller, charging IC, protection MOSFET or input-rail fault where the device design uses those components. For freezes, blue screens, kernel panics or sudden restarts, the lab checks the relevant storage, memory, thermal, firmware and power-delivery evidence instead of guessing from the symptom alone. Free doorstep collection covers Blocks 1–4, with area/office code 72100 and block postal codes 72101–72104. Your device is logged for intake and taken to the ESD-safe KCROC laboratory at Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19, Hawalli. You receive the diagnosis and a clear quote before paid repair work begins. Use the First-to-Second Ring Road corridor, Dhahiyat Abdullah Al-Salem & Al-Mansouriya Co-op in Block 2, Hammoud Yousef Al-Nisf Street, Ahmad Al-Ghanem Street or Sana’a Road / Souq Dhahiya Street as nearby references when sharing your location pin. If several household or home-office devices need attention, include each model and symptom in the same message so collection arrangements can be coordinated.',
      localHighlights: [
        {
          title: 'USB-C charging is a circuit diagnosis—not just a port swap',
          description: 'An intermittent connection can come from the adapter, receptacle, cracked connector joints or lifted pads. A laptop that detects the charger but will not negotiate or sustain charging can also have a board-side Power Delivery controller, charging IC, protection MOSFET or input-rail fault. We test the relevant path for the exact board before recommending connector or component work.'
        },
        {
          title: 'Freezing and random crashes need evidence-led isolation',
          description: 'A freeze, BSOD, kernel panic or sudden restart can involve SSD health, RAM instability, thermal shutdown, unstable power delivery, firmware or software. We separate the likely causes with appropriate storage, memory, thermal and board checks; a symptom alone is not a reason to replace the motherboard or wipe the operating system.'
        },
        {
          title: 'Hardware-first handling and an SSD-retention option',
          description: 'Supported hardware diagnostics do not require your Windows or Mac account password and are focused on the device rather than browsing personal files. For compatible Windows laptops and desktops with a removable NVMe or SATA drive, ask before collection about safely removing and keeping the SSD. Storage and boot tests will be limited while that drive is out. Modern MacBooks generally use soldered storage, which is not a removable M.2 drive.'
        },
        {
          title: 'Four-block Al-Dahiya collection coverage',
          description: 'The page covers Abdullah Al-Salem Blocks 1–4: area/office code 72100, with Block 1 (72101), Block 2 (72102), Block 3 (72103) and Block 4 (72104). Share your block and pin, using the Dhahiyat Abdullah Al-Salem & Al-Mansouriya Co-op, Hammoud Yousef Al-Nisf Street, Ahmad Al-Ghanem Street or Sana’a Road as nearby references.'
        }
      ],
      localServiceCards: [
        {
          title: 'Laptop USB-C, Thunderbolt & DC Charging-Port Repair',
          problem: 'The laptop says “plugged in, not charging”, charges only at a certain cable angle, disconnects under movement, or has a damaged USB-C or barrel-jack connector.',
          expertise: 'We inspect the adapter and receptacle, connector solder joints and pads, then test the relevant charging path. Depending on the board design, this can include the USB-C Power Delivery controller, charging IC, protection MOSFETs and input rails.',
          solution: 'We identify whether the fault is at the connector or further into the power circuit, then quote a targeted repair before paid work. Charging stability is checked after the approved work.',
          serviceIds: ['srv-charging-port', 'srv-motherboard']
        },
        {
          title: 'MacBook Air & MacBook Pro Logic-Board Restoration',
          problem: 'A MacBook will not power on, will not charge over USB-C or MagSafe, repeatedly disconnects from its adapter, or starts but shows an unstable display or startup behavior.',
          expertise: 'Model-specific checks trace the charging and power path, affected controllers, protection components and logic-board rails. Where the fault and board condition permit, we assess micro-soldering on the original board rather than assuming a complete board replacement.',
          solution: 'The Hawalli lab shares the findings and a repair quote before work. Keeping the original logic board may preserve access to soldered storage, but data preservation depends on storage and controller condition and is never guaranteed.',
          serviceIds: ['srv-macbook', 'srv-motherboard']
        },
        {
          title: 'Motherboard Power & Random-Crash Diagnostics',
          problem: 'Unexpected freezing, blue screens, kernel panics, sudden restarts or shutdowns—especially when the computer is under load or has recently developed charging or power symptoms.',
          expertise: 'We separate storage-health and memory issues from thermal behavior, firmware symptoms and board-level power instability. Checks are chosen for the device and can include SSD health, memory testing, thermal review, firmware checks and relevant power-rail measurements.',
          solution: 'You receive the likely cause and repair options before paid work. After an approved repair, we verify the functions related to the fault and run suitable stability checks before return.',
          serviceIds: ['srv-motherboard', 'srv-laptop']
        },
        {
          title: 'Executive Laptop & Home-Office Hardware Repair',
          problem: 'A work laptop has a no-power fault, unreliable charging, a damaged screen or hinge, battery trouble, or several household devices need attention.',
          expertise: 'We diagnose supported Dell, HP, Lenovo, ASUS, Acer and MSI laptop hardware at the component or assembly level, matching any required part to the exact model.',
          solution: 'Send the model and symptom for each device with your Al-Dahiya block. KCROC confirms collection arrangements, diagnoses at the Hawalli lab and shares the quote before paid work.',
          serviceIds: ['srv-laptop', 'srv-charging-port']
        }
      ],
      localFaqs: [
        {
          id: 'faq-abdullah-al-salem-1',
          question: 'Can KCROC collect from Abdullah Al-Salem Blocks 1–4?',
          answer: 'Yes. Free doorstep pickup and return delivery can be arranged across Abdullah Al-Salem (Al-Dahiya) Blocks 1, 2, 3 and 4. Send your block, street or nearby landmark, device model and fault on WhatsApp so the team can confirm the collection arrangement. Your device is repaired and tested at the Hawalli lab.'
        },
        {
          id: 'faq-abdullah-al-salem-2',
          question: 'My USB-C laptop is plugged in but not charging. Is the port or motherboard faulty?',
          answer: 'Either is possible. The cause can be the adapter, a worn or damaged USB-C receptacle, cracked solder joints, a lifted pad, a Power Delivery controller, charging IC, protection MOSFET or another input-rail fault. KCROC checks the charging path for your exact model before recommending a port repair or board-level work.'
        },
        {
          id: 'faq-abdullah-al-salem-3',
          question: 'Can you diagnose random freezing, blue screens, kernel panics or sudden restarts?',
          answer: 'Yes. These symptoms can have several causes, including SSD or memory problems, overheating, firmware behavior, software faults or unstable power delivery. We use symptom history and suitable hardware checks to separate the likely cause before quoting; we do not assume that a motherboard replacement or operating-system wipe is the right first step.'
        },
        {
          id: 'faq-abdullah-al-salem-4',
          question: 'Can you repair the original MacBook logic board without replacing it?',
          answer: 'Where the damaged circuit and board condition make it technically viable, we assess component-level repair of the original logic board before recommending a complete replacement. Keeping the original board may preserve access to soldered storage, but it is not a data-recovery guarantee: storage chips, controllers or related power circuits may also be damaged.'
        },
        {
          id: 'faq-abdullah-al-salem-5',
          question: 'Can I keep my NVMe or SATA SSD, and do you need my account password?',
          answer: 'For compatible Windows laptops and desktops with a removable NVMe or SATA drive, ask before collection about safely removing and retaining the SSD. Boot, operating-system and storage tests will be limited until it is reinstalled. A password is not needed for hardware-only power, charging or board diagnostics; any separate software test that needs account access is explained and agreed first. Do not send your password by WhatsApp. Modern MacBooks generally have soldered storage rather than a removable M.2 drive.'
        },
        {
          id: 'faq-abdullah-al-salem-6',
          question: 'When will I receive the repair price, and what if the fault cannot be fixed?',
          answer: 'The team diagnoses the device at the Hawalli lab and sends you the repair scope and quote before paid work begins. If you decline, no paid repair work proceeds. Under KCROC’s No Fix, No Fee policy, there is no repair charge when the device cannot be fixed under the policy.'
        }
      ],
      landmark: 'Service-area collection — Abdullah Al-Salem (Al-Dahiya); all workshop diagnosis and repair take place at KCROC’s Hawalli lab',
      serviceRadiusKm: 12,
      serviceAreas: ['Abdullah Al-Salem', 'Al-Dahiya', 'Nuzha', 'Shamiya'],
      relatedServiceIds: ['srv-laptop', 'srv-macbook', 'srv-motherboard', 'srv-charging-port'],
      relatedProblemIds: ['problem-not-charging', 'problem-no-power', 'problem-freezing-crashing', 'problem-black-screen'],
      relatedLocationIds: ['loc-shamiya', 'loc-nuzha', 'loc-kaifan'],
      contentImage: {
        src: IMAGES.motherboard.thermalGrizzly1.src,
        alt: IMAGES.motherboard.thermalGrizzly1.alt,
        width: IMAGES.motherboard.thermalGrizzly1.width,
        height: IMAGES.motherboard.thermalGrizzly1.height,
        caption: 'Board-level power and component diagnostics at KCROC’s Hawalli repair lab.'
      },
      seo: {
        title: 'Computer Repair Abdullah Al-Salem (Al-Dahiya) | KCROC',
        description: 'USB-C charging, MacBook logic-board and random-crash diagnostics for Abdullah Al-Salem (Al-Dahiya). Free doorstep pickup to KCROC’s Hawalli lab.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/location/abdullah-al-salem',
        ogType: 'website',
        schemaTypes: ['LocalBusiness'],
        lastModified: '2026-11-05T00:00:00+03:00'
      },
      navigationPriority: 93
    } as LocationEntity,

 'loc-shamiya': {
      id: 'loc-shamiya',
      slug: 'shamiya',
      entityType: 'Location',
      isActive: true,
      isPhysicalLocation: false,
      title: 'Shamiya',
      description: 'Laptop and MacBook screen, battery and motherboard diagnostics, plus desktop PC and workstation repair for Shamiya. Free doorstep collection and return to KCROC’s Hawalli lab.',
      heroBadge: 'Direct doorstep collection · Shamiya Blocks 1–9 · Area code 71500',
      heroHeadline: 'Computer, MacBook & Desktop PC Repair in Shamiya',
      localValueHeading: 'Screen, Battery & Desktop Diagnostics — Collected from Your Shamiya Doorstep',
      localServicesHeading: 'Specialist Screen, Battery, Motherboard & Desktop PC Repair for Shamiya',
      areaPostalCode: '71500',
      serviceTypes: [
        'Laptop and MacBook screen, display-cable and backlight diagnostics',
        'Laptop battery replacement and charging-path testing',
        'Desktop PC and workstation hardware diagnostics',
        'Component-level motherboard and MacBook logic-board repair',
        'Cracked laptop display and compatible screen replacement'
      ],
      localIntro: 'A laptop with cracked glass and a laptop that powers on but shows a black screen do not automatically need the same repair. Physical panel damage may call for a model-matched display assembly, while a dark or dim image can also come from the display cable or connector, panel power, a motherboard backlight circuit or a lid/sleep sensor where the model uses one. KCROC’s Shamiya service focuses on checking the relevant display path before recommending a screen or board repair. We arrange free doorstep collection from homes and offices across Shamiya Blocks 1–9, then diagnose and repair supported laptops, MacBooks and complete desktop towers at our ESD-safe Hawalli lab: Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19. You do not need to unplug a multi-monitor workstation and carry it through Hawalli traffic; send your block, street, device model and a location pin so the collection team can confirm the arrangements. Shamiya’s area/post-office code is 71500, while Blocks 1–9 use the block postal codes 71501–71509. For a familiar map reference, you can mention Shamiya & Shuwaikh Cooperative Society (Shamiya Mall) or the neighbourhood park in Block 3. Shamiya sits between the First and Second Ring Roads, so include your exact block and street rather than relying on a broad road name. The device is logged for workshop intake, diagnosed first and quoted before any paid repair work begins.',
      localHighlights: [
        {
          title: 'A black screen is not automatically a broken panel',
          description: 'When a laptop powers on but the display stays black or dim, we distinguish a failed panel from a loose or damaged display cable/connector, panel-power fault or motherboard backlight-circuit issue. A lid or sleep sensor is checked where the model uses one. This helps avoid quoting a full display assembly when the evidence points to a repairable board-side fault.'
        },
        {
          title: 'Battery and charging-path checks before part replacement',
          description: 'We assess the battery, adapter, charging port and relevant motherboard charging path before recommending a battery or board repair. A swollen battery needs careful handling: stop using or charging the device and contact us for collection guidance rather than pressing or puncturing the cell.'
        },
        {
          title: 'Full-tower desktops and workstations can be collected',
          description: 'Shamiya pickup can be arranged for supported desktop towers and workstations as well as laptops and MacBooks. Tell us the case size, approximate weight and whether it has a glass side panel or custom liquid cooling so the team can confirm collection details and whether any monitor or accessory is needed for the reported fault.'
        },
        {
          title: 'Hardware-first diagnostics with an SSD-retention option',
          description: 'Hardware-only display, battery, charging and board checks do not require your Windows or Mac account password and are focused on the device rather than browsing personal files. For compatible laptops and desktops with a removable NVMe or SATA drive, ask before collection about removing and keeping the drive. Boot and storage tests are limited until it is reinstalled; many newer MacBooks have soldered storage.'
        },
        {
          title: 'Coverage across Shamiya Blocks 1–9',
          description: 'The Shamiya area/post-office code is 71500; block postal codes 71501–71509 identify Blocks 1–9. Share your block and street, or use Shamiya & Shuwaikh Co-op / Shamiya Mall and the Block 3 neighbourhood park as nearby map references. Shamiya is between the First and Second Ring Roads.'
        }
      ],
      localServiceCards: [
        {
          title: 'Laptop & MacBook Screen and Black-Display Diagnostics',
          problem: 'Cracked or shattered panels, vertical lines, flicker, a dim backlight, or a laptop that powers on while the display remains black.',
          expertise: 'We assess the panel, display cable and connector, panel power and the model-specific motherboard backlight path. A lid/sleep sensor is considered where fitted, so a black-screen symptom is not treated as proof that the panel itself has failed.',
          solution: 'If the panel is damaged, we confirm the model and compatible replacement before quoting. If the fault is on the board or display path, we explain that repair option separately before paid work.',
          serviceIds: ['srv-screen', 'srv-macbook']
        },
        {
          title: 'Laptop Battery Replacement & Charging-Path Testing',
          problem: 'Short battery runtime, sudden percentage drops, unexpected shutdowns, battery warnings, swelling or a laptop that only runs while connected to its charger.',
          expertise: 'We check battery condition and charging behaviour alongside the adapter, port and relevant charging circuitry before deciding whether the battery or a board-side fault is responsible.',
          solution: 'The compatible battery, part availability and full price are confirmed before installation. Swollen batteries are handled as a safety issue, not forced back into the chassis.',
          serviceIds: ['srv-battery', 'srv-charging-port']
        },
        {
          title: 'Full-Tower Desktop PC & Workstation Diagnostics',
          problem: 'No display or no-POST startup, unexpected restarts, GPU or memory instability, overheating, loud fans or shutdowns under load.',
          expertise: 'We diagnose the complete supported system, considering the power supply, motherboard, GPU, memory, storage and cooling rather than assuming the graphics card or motherboard is the failed part.',
          solution: 'Free collection from Shamiya can be arranged for complete desktop towers. Share the case size and any glass-panel or custom-cooling details so collection requirements can be confirmed before dispatch.',
          serviceIds: ['srv-desktop-pc', 'srv-gaming']
        },
        {
          title: 'Component-Level Motherboard & MacBook Logic-Board Repair',
          problem: 'No-power faults, charging failures, liquid-related board damage, short circuits or instability that persists after basic adapter and peripheral checks.',
          expertise: 'The Hawalli lab traces the affected power and board circuits and assesses component-level repair of the original board where the fault and board condition make it viable.',
          solution: 'You receive the diagnostic result and repair quote before paid work starts. Keeping the original board may preserve access to existing storage on some devices, but it is not a data-recovery guarantee.',
          serviceIds: ['srv-motherboard', 'srv-macbook', 'srv-laptop']
        }
      ],
      localFaqs: [
        {
          id: 'faq-shamiya-1',
          question: 'Can KCROC collect a laptop or computer directly from my Shamiya home?',
          answer: 'Yes. Free doorstep pickup and return delivery can be arranged across Shamiya Blocks 1–9. Send your block, street, device model and location pin on WhatsApp; the team will confirm a collection time and bring the device to the Hawalli lab for diagnosis.'
        },
        {
          id: 'faq-shamiya-2',
          question: 'Can you collect a full-tower desktop PC or workstation from a Shamiya villa?',
          answer: 'Yes, collection can be arranged for supported complete desktop towers and workstations as well as laptops and MacBooks. Tell us the case size, approximate weight, whether the side panel is glass or the system has custom liquid cooling, and what the PC is doing. We will confirm the collection details and whether a monitor or other accessory is needed to reproduce the fault.'
        },
        {
          id: 'faq-shamiya-3',
          question: 'My laptop turns on but the screen is black. Do I need a new screen?',
          answer: 'Not necessarily. A black or dim display can be caused by the panel, display cable or connector, panel power, a motherboard backlight circuit or a lid/sleep sensor where fitted. We check the relevant parts of the display path before quoting a panel replacement. A physically cracked panel is assessed separately against the exact model.'
        },
        {
          id: 'faq-shamiya-4',
          question: 'Do you test the battery and charging circuit before replacing a laptop battery?',
          answer: 'Yes. We assess battery condition and charging behaviour, and check the adapter, charging port and relevant motherboard charging path for the device. This helps separate a worn battery from a port or board-side issue before the replacement price is confirmed.'
        },
        {
          id: 'faq-shamiya-5',
          question: 'Do I need to share my password, and can I keep my SSD before collection?',
          answer: 'A password is not needed for hardware-only screen, battery, charging or motherboard diagnostics. For compatible laptops and desktops with a removable NVMe or SATA drive, ask us before collection about removing and keeping it. Boot and storage tests cannot be completed with the drive removed. Many newer MacBooks use soldered storage rather than a removable M.2 SSD.'
        },
        {
          id: 'faq-shamiya-6',
          question: 'Where are Shamiya devices repaired, and do completed repairs have a warranty?',
          answer: 'Collection is from your Shamiya home or office; diagnosis and repair take place at KCROC’s Hawalli lab at Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19. You receive the repair scope and price before paid work begins. Completed repairs carry a 30-day warranty, and the No Fix, No Fee policy applies when a device cannot be fixed under the policy.'
        }
      ],
      landmark: 'Doorstep collection area — Shamiya Blocks 1–9; workshop diagnostics and repairs at KCROC’s Hawalli lab',
      serviceRadiusKm: 12,
      serviceAreas: ['Shamiya Blocks 1–9'],
      relatedServiceIds: [
        'srv-laptop', 'srv-screen', 'srv-battery', 'srv-motherboard',
        'srv-macbook', 'srv-charging-port', 'srv-desktop-pc', 'srv-gaming'
      ],
      relatedProblemIds: [
        'problem-cracked-screen', 'problem-black-screen', 'problem-not-charging',
        'problem-no-power', 'problem-overheating'
      ],
      relatedLocationIds: ['loc-shuwaikh-residential', 'loc-abdullah-al-salem', 'loc-kaifan'],
      contentImage: {
        src: IMAGES.laptopHardware.dellLaptopScreenRepairCompleted.src,
        alt: IMAGES.laptopHardware.dellLaptopScreenRepairCompleted.alt,
        width: IMAGES.laptopHardware.dellLaptopScreenRepairCompleted.width,
        height: IMAGES.laptopHardware.dellLaptopScreenRepairCompleted.height,
        caption: 'Laptop display repair carried out at KCROC’s Hawalli workshop.'
      },
      seo: {
        title: 'Computer, MacBook & PC Repair Shamiya | Free Pickup | KCROC',
        description: 'Laptop screen, backlight, battery and desktop PC diagnostics for Shamiya Blocks 1–9 (71501–71509). Free doorstep pickup to KCROC’s Hawalli lab.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/location/shamiya',
        ogType: 'website',
        schemaTypes: ['LocalBusiness'],
        lastModified: '2026-11-05T00:00:00+03:00'
      },
      navigationPriority: 90
    } as LocationEntity,

 'loc-nuzha': {
      id: 'loc-nuzha',
      slug: 'nuzha',
      entityType: 'Location',
      isActive: true,
      isPhysicalLocation: false,
      title: 'Nuzha',
      description: 'Laptop overheating, thermal shutdown, battery and charging-path diagnostics, plus MacBook and motherboard repair for Nuzha Blocks 1–3. Free doorstep collection to KCROC’s nearby Hawalli lab.',
      heroBadge: 'Neighbour-district collection · Nuzha Blocks 1–3 · Area code 72900',
      heroHeadline: 'Laptop, MacBook & Computer Repair in Nuzha, Kuwait',
      localValueHeading: 'Thermal Engineering & Full Charging-Path Diagnostics for Nuzha',
      localServicesHeading: 'Specialist Overheating, MacBook, Charging-Port & Battery Services in Nuzha',
      areaPostalCode: '72900',
      serviceTypes: [
        'Laptop overheating, thermal throttling and heat-related shutdown diagnostics',
        'Laptop cooling-system cleaning and model-matched thermal-interface service',
        'Laptop USB-C, Thunderbolt and DC charging-port diagnostics and repair',
        'Charging-controller, power-rail and battery-path testing',
        'MacBook logic-board and component-level motherboard diagnostics'
      ],
      localIntro: 'A laptop that becomes hot and shuts down under load needs more than a quick blast of air or an automatic thermal-paste replacement. In Nuzha, KCROC focuses on the cooling system and the power-delivery chain that can also cause unexpected shutdowns: we inspect fan operation, heatsink contact, blocked fins, thermal-interface condition and measured CPU/GPU behaviour under a suitable workload. For charging and battery complaints, we trace the device-specific path from adapter and USB-C/DC port through its charging controller and input-power circuitry to battery health, rather than replacing whichever part the symptom seems to suggest. Nuzha is close to our Hawalli lab through the Third Ring Road and Damascus Street (Route 45) corridor. You can skip the extra drive, Ibn Khaldoun Street parking and basement drop-off: we arrange free doorstep collection from Nuzha Blocks 1, 2 and 3, log the device at intake, and carry out diagnostics and approved repairs at Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19, Hawalli. The Nuzha area/post-office code is 72900; the block codes are 72901, 72902 and 72903. For a precise pickup pin, use your block and street, or nearby references such as Nuzha Cooperative Society in Block 2 on Abdulrahman Al-Faris Street, the Block 1 co-op area on Mohammed Saleh Al-Humaidi Street, or the community park beside the Block 3 co-op near Mohammed Bin La’aboun Street. The Second Ring Road and King Fahd Road (Route 40) are additional nearby route references; send your exact pin rather than relying on a broad road name. You receive the diagnosis and repair quote before any paid work begins.',
      localHighlights: [
        {
          title: 'Thermal shutdowns need measured cooling diagnostics',
          description: 'We check fan response, airflow, heatsink condition and CPU/GPU temperatures under a suitable sustained workload to distinguish dust restriction, poor heatsink contact, a degraded thermal interface and other hardware causes. We do not promise a fixed temperature or FPS improvement; we verify the result against the original symptom.'
        },
        {
          title: 'Thermal materials are selected for the device design',
          description: 'Where the cooling design calls for it, thermal service may use Honeywell PTM7950 phase-change material or Arctic MX-6 thermal compound. Thermal pads and putty are matched to the required component and thickness. Suitable detached heatsink parts can receive deeper cleaning, including ultrasonic cleaning when the material and assembly permit it.'
        },
        {
          title: 'Port → charging controller → battery: test the complete power path',
          description: 'A laptop that will not charge may have a worn USB-C/Thunderbolt or DC port, an adapter issue, a model-specific charging-controller fault, damaged input-power components or a weak battery. We check the relevant stages together before deciding whether a port, board component or battery needs attention.'
        },
        {
          title: 'Hardware-first privacy and removable-SSD option',
          description: 'Cooling, battery, charging and board-level hardware checks do not require your Windows or Mac account password and focus on the device rather than browsing personal files. For compatible laptops and desktops with a removable NVMe or SATA drive, ask before collection about safely removing and keeping it. Boot and storage tests are limited until the drive is reinstalled; many newer MacBooks have soldered storage.'
        },
        {
          title: 'Coverage across all three Nuzha blocks',
          description: 'Nuzha area/post-office code: 72900. Block 1: 72901; Block 2: 72902; Block 3: 72903. Send the block, street and map pin. Nuzha Co-op in Block 2 and the Block 3 community park near Mohammed Bin La’aboun Street are useful local references.'
        }
      ],
      localServiceCards: [
        {
          title: 'Laptop Repair & Thermal Overhaul for Overheating and Shutdowns',
          problem: 'A laptop becomes unusually hot, fans run loudly, performance drops under load, or the system switches off during work or gaming.',
          expertise: 'We inspect the fan, intake and exhaust paths, heatsink contact, dust restriction and model-specific CPU/GPU thermal behaviour. Where appropriate, the thermal interface is renewed with a design-compatible material such as Honeywell PTM7950 or Arctic MX-6; thermal pads/putty are matched to the required thickness. Suitable detached metal heatsink parts can be deep-cleaned, including by ultrasonic method when appropriate.',
          solution: 'The cooling work is selected from the diagnosis, not applied as a universal paste swap. We test the laptop under a suitable sustained workload at the Hawalli lab and share the repair scope and quote before paid work.',
          serviceIds: ['srv-laptop', 'srv-gaming-laptop-cleaning']
        },
        {
          title: 'MacBook Air & MacBook Pro Logic-Board and Power Repair',
          problem: 'A MacBook will not power on, has unstable charging, shuts down unexpectedly, shows liquid-related symptoms or has a battery fault.',
          expertise: 'We check the model-specific charging, power and logic-board circuits, then assess component-level repair of the original board where the fault and board condition make it viable.',
          solution: 'You receive the diagnostic result and quote before paid work. Keeping the original logic board may preserve access to existing storage on some models, but board repair is not a data-recovery guarantee.',
          serviceIds: ['srv-macbook', 'srv-motherboard']
        },
        {
          title: 'Laptop USB-C, Thunderbolt & DC Charging-Port Repair',
          problem: 'A loose charging connector, intermittent charging, “plugged in, not charging” status, a damaged port or a laptop that only charges when the cable is held at an angle.',
          expertise: 'We assess the adapter, receptacle, connector joints and the relevant board-side charging controller and input-power components for that model. A port fault is separated from a charging-IC or power-rail fault before recommending repair.',
          solution: 'Where technically suitable, we repair the connector or failed board component rather than defaulting to full motherboard replacement. The scope and price are confirmed before paid work.',
          serviceIds: ['srv-charging-port', 'srv-motherboard']
        },
        {
          title: 'Laptop Battery Health Testing & Compatible Replacement',
          problem: 'Rapid battery drain, sudden shutdowns at a remaining charge percentage, battery-health warnings, failure to run away from AC power or visible battery swelling.',
          expertise: 'We assess battery condition together with adapter output, port behaviour and the relevant charging path so a board-side fault is not mistaken for a failed battery. Swelling is treated as a safety concern.',
          solution: 'The compatible battery, availability and total price are confirmed before replacement. If the battery is swollen, stop using or charging the laptop and contact us for safe collection guidance; do not press or puncture it.',
          serviceIds: ['srv-battery', 'srv-charging-port']
        }
      ],
      localFaqs: [
        {
          id: 'faq-nuzha-1',
          question: 'Can KCROC collect a laptop from my home in Nuzha Blocks 1, 2 or 3?',
          answer: 'Yes. Free doorstep pickup and return delivery can be arranged across Nuzha Blocks 1–3. Send the block, street, device model and a map pin on WhatsApp so the team can confirm collection arrangements. The device is taken to the Hawalli lab for diagnosis and approved repair.'
        },
        {
          id: 'faq-nuzha-2',
          question: 'Can you fix a laptop that gets hot, runs loud fans and shuts down?',
          answer: 'Yes. We inspect fan operation, airflow, dust restriction, heatsink contact and thermal-interface condition, then check CPU/GPU behaviour under a suitable workload. If the evidence points to a cooling fault, we recommend the appropriate cleaning and thermal service; other causes of shutdown are investigated rather than assuming paste is always the problem.'
        },
        {
          id: 'faq-nuzha-3',
          question: 'Do you use Honeywell PTM7950 or Arctic MX-6 for laptop thermal service?',
          answer: 'The material depends on the laptop and its cooling design. Where compatible, thermal service may use Honeywell PTM7950 phase-change material or Arctic MX-6 thermal compound; pads or putty are matched to the required thickness. Ultrasonic cleaning is used only for suitable detached components, not indiscriminately on a complete laptop or electronic assembly.'
        },
        {
          id: 'faq-nuzha-4',
          question: 'Do you replace laptop batteries and charging ports, and how do you find the real fault?',
          answer: 'We test the relevant path together: adapter, USB-C/Thunderbolt or DC port, model-specific charging controller and input-power circuitry, then battery condition. A worn battery, damaged connector and board-side charging fault can produce similar symptoms, so we diagnose the cause before quoting a part.'
        },
        {
          id: 'faq-nuzha-5',
          question: 'Do you need my password, and can I keep my SSD before pickup?',
          answer: 'A password is not needed for hardware-only cooling, battery, charging or motherboard diagnostics. For compatible laptops and desktops with a removable NVMe or SATA drive, ask before collection about safely removing and keeping it. Boot and storage testing is limited until it is reinstalled. Many newer MacBooks use soldered storage. Do not send your password by WhatsApp.'
        },
        {
          id: 'faq-nuzha-6',
          question: 'How do I receive the price, and what happens if the laptop cannot be repaired?',
          answer: 'The device is diagnosed at KCROC’s Hawalli lab and the team sends you the repair scope and quote before paid work begins. If you approve, the repair is completed and tested; completed repairs carry a 30-day warranty. Under the No Fix, No Fee policy, there is no repair charge when the device cannot be fixed under the policy.'
        }
      ],
      landmark: 'Doorstep collection area — Nuzha Blocks 1–3; workshop diagnostics and repairs at KCROC’s Hawalli lab',
      serviceRadiusKm: 12,
      serviceAreas: ['Nuzha Blocks 1–3'],
      relatedServiceIds: [
        'srv-laptop', 'srv-gaming-laptop-cleaning', 'srv-macbook',
        'srv-motherboard', 'srv-charging-port', 'srv-battery'
      ],
      relatedProblemIds: [
        'problem-overheating', 'problem-not-charging',
        'problem-no-power', 'problem-black-screen'
      ],
      relatedLocationIds: ['loc-abdullah-al-salem', 'loc-adailiya', 'loc-shamiya'],
      contentImage: {
        src: IMAGES.gaming.gamingLaptopFan.src,
        alt: IMAGES.gaming.gamingLaptopFan.alt,
        width: IMAGES.gaming.gamingLaptopFan.width,
        height: IMAGES.gaming.gamingLaptopFan.height,
        caption: 'Laptop cooling and thermal diagnostics at KCROC’s Hawalli workshop.'
      },
      seo: {
        title: 'Laptop Overheating & MacBook Repair Nuzha | Free Pickup | KCROC',
        description: 'Laptop overheating, thermal shutdown, battery and USB-C/DC charging repair for Nuzha Blocks 1–3 (72901–72903). Free doorstep pickup to KCROC’s Hawalli lab.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/location/nuzha',
        ogType: 'website',
        schemaTypes: ['LocalBusiness'],
        lastModified: '2026-11-05T00:00:00+03:00'
      },
      navigationPriority: 91
    } as LocationEntity,

 'loc-adailiya': {
      id: 'loc-adailiya',
      slug: 'adailiya',
      entityType: 'Location',
      isActive: true,
      isPhysicalLocation: false,
      title: 'Adailiya',
      description: 'Component-level laptop, MacBook, motherboard, screen and battery repair for Adailiya and nearby Rawda. Free doorstep collection from both suburbs to KCROC’s Hawalli lab.',
      heroBadge: 'Dual-suburb doorstep collection · Adailiya 73100 · Rawda 73300',
      heroHeadline: 'Computer & MacBook Repair in Adailiya and Rawda',
      localValueHeading: 'Board-First Diagnostics for Adailiya & Rawda — Before Any Part Is Replaced',
      localServicesHeading: 'Five Specialist Repair Services for Adailiya & Rawda Homes and Offices',
      areaPostalCode: '73100',
      additionalAreaPostalCodes: [{ name: 'Rawda', postalCode: '73300' }],
      serviceTypes: [
        'Laptop no-power and motherboard power-rail diagnostics',
        'MacBook logic-board and USB-C charging diagnostics',
        'Laptop black-screen, display-cable and backlight diagnostics',
        'Cracked and damaged high-resolution laptop display replacement',
        'Laptop battery health and complete charging-path testing'
      ],
      localIntro: 'A laptop that appears dead and one that powers on with a black screen are different faults. The first calls for checks of the adapter, input-power path, standby rails and board-level shorts; the second may involve the display panel, eDP cable or connector, panel power, a motherboard backlight circuit or a model-specific lid/sleep sensor. Replacing a motherboard or screen before separating those symptoms can mean an unnecessary part cost. KCROC serves homes and offices across Adailiya and neighbouring Rawda with free doorstep collection and board-first diagnosis at our ESD-safe Hawalli lab: Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19. You can skip the drive, parking search and basement drop-off on Ibn Khaldoun Street: send your block, street, device model and location pin, and the collection team will confirm the arrangements. The Adailiya area/post-office code is 73100 (Block 1: 73101, Block 2: 73102, Block 3: 73103, Block 4: 73104, Block 5: 73105). Rawda area/post-office code is 73300 (Block 1: 73301, Block 2: 73302, Block 3: 73303, Block 4: 73304, Block 5: 73305). Useful local references include Adailiya Co-op, Kazma Sporting Club and Al-Sadaqua Walsalam Stadium on Sami Ahmad Al-Munayes Street, and the Adailiya Water Towers / Abraj Park. In Rawda, the Rawda & Hawally Co-op and Jamal Abdul Nasser Park are practical map references. The shared inner-city road network includes the Third and Fourth Ring Roads, Damascus Street (Route 45), and wider connections via King Fahd Road (Route 40) and Airport Road (Route 50); share your exact pin so the courier can confirm the best approach. Every device is logged at intake, diagnosed before paid work and quoted for approval first.',
      localHighlights: [
        {
          title: 'Dead board or black screen? Diagnose the difference first',
          description: 'For a no-power system, we investigate the adapter and input path, standby/power rails and possible board-level shorts. If the power light or fans run but the display is black, we separately assess the panel, eDP cable and connector, panel power and motherboard backlight path, including a lid/sleep sensor where the model uses one. The symptom alone is not treated as proof that the motherboard or screen must be replaced.'
        },
        {
          title: 'MacBook and engineering-laptop board diagnostics',
          description: 'We assess MacBook Air/Pro and supported business or engineering laptops such as ThinkPad and XPS families against the exact model and fault. Charging, no-power and display faults are traced through their model-specific logic-board or motherboard circuits; component repair is offered only when the board condition makes it technically viable.'
        },
        {
          title: 'Hardware-only privacy with an optional removable-SSD handover',
          description: 'Hardware diagnostics for power, charging, display and motherboard faults do not require your account password and are focused on the hardware rather than browsing personal files. For compatible Windows laptops with a removable NVMe or SATA SSD, ask before collection about keeping the drive. Boot and storage tests are limited while it is removed. Many newer MacBooks have soldered storage, so an M.2 removal option does not apply to them.'
        },
        {
          title: 'Battery, port and charging-controller checks together',
          description: 'A battery that drains or a laptop that only charges at an angle may have a worn cell, damaged USB-C/DC port, adapter issue or board-side charging fault. We test the relevant power-delivery path from adapter and port through the charging controller/input circuitry to battery health before recommending a replacement.'
        },
        {
          title: 'One collection service for two neighbouring suburbs',
          description: 'Pickup can be arranged across Adailiya Blocks 1–5 (73101–73105) and Rawda Blocks 1–5 (73301–73305). Use Adailiya Co-op, Kazma Sporting Club / Al-Sadaqua Walsalam Stadium, Adailiya Water Towers / Abraj Park, Rawda & Hawally Co-op or Jamal Abdul Nasser Park as nearby pin references, then confirm the exact block and street.'
        }
      ],
      localServiceCards: [
        {
          title: 'Laptop Repair — No-Power, Startup and Board-Level Faults',
          problem: 'A ThinkPad, XPS, business laptop or engineering workstation will not start, repeatedly powers off, or shows abnormal power behaviour.',
          expertise: 'We check the adapter, input connector, standby and main power rails, current draw and model-specific motherboard faults before deciding whether the fault is board-level, firmware-related or elsewhere in the system.',
          solution: 'You receive the diagnostic finding and a repair quote before any paid work. Where the original board is technically repairable, we explain the component-level option rather than assuming a complete board swap.',
          serviceIds: ['srv-laptop', 'srv-motherboard']
        },
        {
          title: 'MacBook Air & MacBook Pro Logic-Board Repair',
          problem: 'A MacBook will not power on, has unstable USB-C charging, shows liquid-related symptoms or has a display/power fault.',
          expertise: 'We assess the exact model’s USB-C power-delivery, charging, input-power and logic-board circuits, then inspect whether component-level repair of the original board is viable. Chip selection and test points vary by generation and board number.',
          solution: 'The lab explains the fault, repair scope and quote before work starts. Repairing the original board may avoid an unnecessary board swap, but it is not a guarantee of data recovery or preservation if the onboard storage itself is damaged.',
          serviceIds: ['srv-macbook', 'srv-motherboard']
        },
        {
          title: 'Motherboard Diagnostics & Component-Level Micro-Soldering',
          problem: 'A laptop has no power, a shorted input rail, liquid-related corrosion, intermittent shutdowns or a motherboard already labelled unrepairable elsewhere.',
          expertise: 'We trace the affected power and signal path with suitable board-level diagnostic equipment, inspect for shorts and component damage, and assess the feasibility of SMD/component repair on the original PCB.',
          solution: 'You receive a clear diagnosis and fixed quote before paid work. Full motherboard replacement is considered only when the original board is not a viable repair candidate or when you approve that option.',
          serviceIds: ['srv-motherboard', 'srv-laptop']
        },
        {
          title: 'Laptop Screen Repair — Cracked Panel vs. Black-Screen Diagnosis',
          problem: 'A cracked or shattered high-resolution panel, lines or flicker, a dim display, or a laptop that powers on while the screen stays black.',
          expertise: 'We separate physical panel damage from an eDP cable/connector fault, panel-power issue or motherboard backlight circuit fault, and check the model-specific lid/sleep sensor where fitted. Display specifications are matched to the exact laptop model.',
          solution: 'If the panel is physically damaged, we confirm the compatible replacement before quoting. If the fault is in the display path or on the motherboard, we explain that repair option rather than automatically selling a complete screen assembly.',
          serviceIds: ['srv-screen', 'srv-motherboard']
        },
        {
          title: 'Laptop Battery Replacement & Charging-Path Verification',
          problem: 'Fast battery drain, sudden shutdowns when unplugged, battery-health warnings, failure to charge or a connector that works only at a certain angle.',
          expertise: 'We assess battery condition alongside the adapter, USB-C/DC port, relevant charging controller and input-power circuitry so a port or board-side fault is not mistaken for a worn battery.',
          solution: 'The compatible battery, availability and total price are confirmed before installation. Swollen batteries are treated as a safety issue; stop using or charging the device and contact us for safe collection guidance.',
          serviceIds: ['srv-battery', 'srv-charging-port']
        }
      ],
      localFaqs: [
        {
          id: 'faq-adailiya-1',
          question: 'Can KCROC collect laptops and MacBooks from both Adailiya and Rawda?',
          answer: 'Yes. Free doorstep pickup and return delivery can be arranged in both suburbs. Send your suburb, block, street, device model and location pin on WhatsApp so the team can confirm the collection details.'
        },
        {
          id: 'faq-adailiya-2',
          question: 'Which blocks of Adailiya and Rawda are covered?',
          answer: 'The pickup area includes Adailiya Blocks 1–5 and Rawda Blocks 1–5. Adailiya area/office code is 73100: Block 1 is 73101, Block 2 is 73102, Block 3 is 73103, Block 4 is 73104 and Block 5 is 73105. Rawda area/office code is 73300: Block 1 is 73301, Block 2 is 73302, Block 3 is 73303, Block 4 is 73304 and Block 5 is 73305. Share your exact block and street when booking.'
        },
        {
          id: 'faq-adailiya-3',
          question: 'What is the difference between a dead motherboard and a laptop that turns on with a black screen?',
          answer: 'A no-power fault is investigated through the adapter, input path, standby/power rails, current draw and possible board shorts. If the laptop powers on but shows no image, we separately check the panel, display cable/connector, panel power and motherboard backlight circuit, plus a model-specific lid/sleep sensor where fitted. We diagnose the cause before recommending a board or screen replacement.'
        },
        {
          id: 'faq-adailiya-4',
          question: 'Can you repair MacBook USB-C charging and logic-board faults?',
          answer: 'We diagnose the model-specific USB-C power-delivery, charging and logic-board circuits and assess component-level repair where technically viable. The exact controller and repair method depend on the MacBook generation and board number; not every board fault can be repaired or guarantees that onboard data remains accessible.'
        },
        {
          id: 'faq-adailiya-5',
          question: 'If my laptop screen is cracked or black, do I always need a new display?',
          answer: 'No. A physically cracked panel may need a compatible replacement, but a black or dim screen can also be caused by the display cable or connector, panel power, motherboard backlight circuitry or a lid/sleep sensor where fitted. We check the display path before confirming which part is responsible.'
        },
        {
          id: 'faq-adailiya-6',
          question: 'Do you test the battery and charging port together before replacing either?',
          answer: 'Yes. We check the adapter and charging port, the relevant board-side charging controller/input-power circuitry and the battery condition. This helps distinguish a worn cell from a loose or damaged port or a motherboard charging fault before a part is quoted.'
        },
        {
          id: 'faq-adailiya-7',
          question: 'Do hardware repairs require my password, and can I keep my NVMe SSD?',
          answer: 'A password is not needed for hardware-only power, display, charging or motherboard diagnostics. For compatible Windows laptops with a removable NVMe or SATA SSD, ask before collection about keeping the drive. Boot and storage tests are limited while it is removed. Many newer MacBooks use soldered storage. Do not send your password over WhatsApp.'
        },
        {
          id: 'faq-adailiya-8',
          question: 'Will you start the repair before I approve the quote, and what if it cannot be fixed?',
          answer: 'No paid repair starts before you receive and approve the diagnosis and quote. If the device cannot be fixed under KCROC’s No Fix, No Fee policy, there is no repair charge. Completed repairs carry the stated 30-day warranty.'
        },
        {
          id: 'faq-adailiya-9',
          question: 'Where are Adailiya and Rawda devices repaired?',
          answer: 'Collection is arranged at your Adailiya or Rawda home or office. Diagnostics and approved repairs are completed at KCROC’s Hawalli lab: Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19. Useful local references include Adailiya Co-op, Kazma Sporting Club / Al-Sadaqua Walsalam Stadium, Adailiya Water Towers / Abraj Park, Rawda & Hawally Co-op and Jamal Abdul Nasser Park.'
        }
      ],
      landmark: 'Doorstep collection area — Adailiya and Rawda Blocks 1–5; workshop diagnostics and repairs at KCROC’s Hawalli lab',
      serviceRadiusKm: 12,
      serviceAreas: ['Adailiya', 'Rawda'],
      relatedServiceIds: [
        'srv-laptop', 'srv-macbook', 'srv-motherboard', 'srv-screen', 'srv-battery'
      ],
      relatedProblemIds: [
        'problem-no-power', 'problem-black-screen',
        'problem-not-charging', 'problem-cracked-screen'
      ],
      relatedLocationIds: ['loc-nuzha', 'loc-qortuba', 'loc-yarmouk', 'loc-surra'],
      contentImage: {
        src: IMAGES.services.motherboardRepair.src,
        alt: IMAGES.services.motherboardRepair.alt,
        width: IMAGES.services.motherboardRepair.width,
        height: IMAGES.services.motherboardRepair.height,
        caption: 'Component-level motherboard diagnostics and repair at KCROC’s Hawalli workshop.'
      },
      seo: {
        title: 'Computer & MacBook Repair Adailiya & Rawda | KCROC',
        description: 'Laptop and MacBook board repair, no-power and black-screen diagnosis, displays and batteries for Adailiya (73101–73105) and Rawda (73301–73305). Free pickup to Hawalli.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/location/adailiya',
        ogType: 'website',
        schemaTypes: ['LocalBusiness'],
        lastModified: '2026-11-05T00:00:00+03:00'
      },
      navigationPriority: 92
    } as LocationEntity,

   'loc-kaifan': {
    id: 'loc-kaifan',
    slug: 'kaifan',
    entityType: 'Location',
    isActive: true,
    isPhysicalLocation: false,
    title: 'Kaifan',
    description: 'Laptop overheating, thermal shutdown and no-power motherboard diagnostics for Kaifan, with free doorstep pickup and return delivery to KCROC’s Hawalli repair lab.',
    heroBadge: 'Free doorstep pickup · Kaifan Blocks 1–7 · Area code 71800',
    heroHeadline: 'Laptop Overheating & Computer Repair in Kaifan',
    localValueHeading: 'Thermal Shutdowns & No-Power Hardware Faults — Diagnosed Before Parts Are Replaced',
    localServicesHeading: 'Kaifan Laptop Cooling, Screen, Battery & Motherboard Services',
    areaPostalCode: '71800',
    additionalAreaPostalCodes: [
      { name: 'Kaifan Block 1', postalCode: '71801' },
      { name: 'Kaifan Block 2', postalCode: '71802' },
      { name: 'Kaifan Block 3', postalCode: '71803' },
      { name: 'Kaifan Block 4', postalCode: '71804' },
      { name: 'Kaifan Block 5', postalCode: '71805' },
      { name: 'Kaifan Block 6', postalCode: '71806' },
      { name: 'Kaifan Block 7', postalCode: '71807' },
    ],
    serviceTypes: [
      'Laptop overheating, thermal throttling and unexpected shutdown diagnostics',
      'Laptop cooling fan, heatsink and model-compatible thermal-interface service',
      'No-power motherboard diagnostics and component-level repair where viable',
      'Laptop screen, display-cable and backlight-circuit diagnostics',
      'Laptop battery testing and model-compatible replacement',
      'Supported MacBook and desktop computer hardware diagnostics',
    ],
    localIntro: 'For residents across Kaifan’s seven blocks around the Second Ring Road corridor, KCROC is a pickup-based option when a laptop runs unusually hot, its fans become loud, performance drops under load or the system shuts down without warning. Those symptoms do not automatically mean the thermal paste is the only problem: dust-restricted heatsink fins, a failing fan, poor cooler contact, incorrect thermal-pad thickness or another hardware fault can produce similar behaviour. We inspect the cooling path and reproduce the reported symptom before recommending a service. Where the exact laptop design supports it, the thermal interface may be renewed with Honeywell PTM7950 or Arctic MX-6; pads and putty are matched to the required thickness rather than applied universally. A no-power computer follows a different diagnostic path: the lab checks the adapter and input stage, current draw, relevant power rails and board components before deciding whether component-level repair of the original motherboard is technically viable. KCROC arranges free doorstep collection from Kaifan Blocks 1–7 and completes diagnosis and approved repair at its ESD-safe Hawalli lab, Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19. You receive the findings and a quote before paid work begins. Share your block, street and location pin; Kaifan Co-op and Kaifan Park are useful local references.',
    localHighlights: [
      {
        title: 'Overheating is diagnosed before thermal material is changed',
        description: 'High temperatures, loud fans, thermal throttling and shutdowns can come from restricted airflow, a worn fan, heatsink contact, the existing thermal interface or another hardware fault. We inspect the cooling assembly and test the reported behaviour. Honeywell PTM7950 or Arctic MX-6 may be used only when compatible with the exact model and cooling design; VRAM/VRM pads or putty are matched to the required thickness. No fixed temperature or FPS improvement is promised.',
      },
      {
        title: 'A dead board is traced before a replacement is recommended',
        description: 'For a computer with no lights, no fan response or an adapter that shuts down when connected, we inspect the input path, current draw and relevant standby or main power rails. Multimeter checks, bench power-supply measurements, microscope inspection, boardview tracing and thermal imaging are used when appropriate to the fault. Component-level repair is offered only when the original board condition supports a viable repair.',
      },
      {
        title: 'A dark screen is not always a broken panel',
        description: 'For cracked glass, lines, flicker or a laptop that powers on with a black or dim display, we distinguish panel damage from an eDP cable or connector fault, panel-power issue or motherboard backlight-circuit fault. We confirm the exact display specification before quoting a replacement.',
      },
      {
        title: 'Hardware-only diagnostics with an optional SSD-retention arrangement',
        description: 'Hardware checks for cooling, display, battery, charging and motherboard faults do not require your Windows or macOS account password and focus on the device rather than browsing personal files. For compatible laptops and desktops with a removable NVMe or SATA drive, ask before collection about removing and keeping the SSD. Boot, operating-system and storage tests are limited until it is reinstalled; many newer MacBooks use soldered storage.',
      },
      {
        title: 'Seven-block Kaifan collection near the Second Ring Road',
        description: 'Kaifan sits around the Second Ring Road corridor, and free doorstep pickup and return delivery can be arranged across Blocks 1–7. The area/post-office code is 71800, with block codes 71801–71807. Share your exact block and location pin; Kaifan Co-op and Kaifan Park are practical nearby references so the team can confirm a collection window.',
      },
    ],
    localServiceCards: [
      {
        title: 'Laptop Repair & Thermal Shutdown Overhaul',
        problem: 'The laptop runs hot, its fan becomes unusually loud, CPU/GPU performance drops during work or gaming, or it shuts down under sustained load.',
        expertise: 'We inspect fan operation, intake and exhaust paths, heatsink fins and contact, and the model-specific thermal interface. Where the design permits, we may use Honeywell PTM7950 or Arctic MX-6; thermal pads and putty are selected by the required material and thickness. Suitable detached heatsink components may receive deeper cleaning, including ultrasonic cleaning when the material and assembly permit; complete laptops and electronic boards are not placed in an ultrasonic bath.',
        solution: 'After the approved service, we check cooling behaviour under a suitable workload and verify that the reported symptom has improved. Results depend on the device condition and workload; no fixed temperature or FPS gain is guaranteed.',
        serviceIds: ['srv-laptop'],
      },
      {
        title: 'Laptop Screen, Display Cable & Backlight Repair',
        problem: 'A cracked panel, vertical lines, flickering image, dim backlight or a laptop that powers on while the screen remains black.',
        expertise: 'We check the panel, eDP cable and connector, panel power and the motherboard backlight path, including a lid or sleep sensor where the model uses one. This helps separate a failed display from a board-side fault.',
        solution: 'If the panel is damaged, we confirm the compatible size, resolution and refresh-rate specification before quoting. If the fault is in the cable or board-side display circuit, we explain that repair option instead of automatically replacing the screen.',
        serviceIds: ['srv-screen', 'srv-motherboard'],
      },
      {
        title: 'Laptop Battery Testing & Compatible Replacement',
        problem: 'Short runtime, sudden percentage drops, battery-health warnings, shutdowns when unplugged, failure to charge or a swollen battery.',
        expertise: 'We assess battery condition alongside the adapter, charging connector and relevant motherboard charging path so a board-side problem is not mistaken for a worn battery. A swollen cell is treated as a safety issue.',
        solution: 'The exact battery part number, compatibility and availability are confirmed before installation. Do not press, puncture or continue charging a swollen battery; contact KCROC for safe handling guidance.',
        serviceIds: ['srv-battery', 'srv-laptop'],
      },
      {
        title: 'No-Power Motherboard & Component-Level Repair',
        problem: 'A laptop or computer shows no power, has no fan or indicator response, trips the adapter, or has a suspected short on the motherboard.',
        expertise: 'The Hawalli lab checks the adapter and input stage, current draw and relevant power rails, then inspects suspect MOSFETs, fuses, capacitors and related components using suitable board-level diagnostic equipment.',
        solution: 'You receive the diagnosis and repair quote before paid work. Where the original PCB is technically repairable, we target the failed component rather than defaulting to a complete motherboard swap.',
        serviceIds: ['srv-motherboard', 'srv-laptop'],
      },
    ],
    localFaqs: [
      {
        id: 'faq-kaifan-1',
        question: 'Do you collect laptops and computers from all Kaifan blocks?',
        answer: 'Yes. Free doorstep pickup and return delivery can be arranged across Kaifan Blocks 1–7. The area/post-office code is 71800 and the block codes are 71801, 71802, 71803, 71804, 71805, 71806 and 71807. Send your block, street, device model and location pin on WhatsApp so the team can confirm a collection window.',
      },
      {
        id: 'faq-kaifan-2',
        question: 'My laptop gets very hot or shuts down while I am using it. Can you diagnose it?',
        answer: 'Yes. We inspect the fans, airflow, heatsink and thermal contact, then check the temperature and performance behaviour under a suitable workload. Dust restriction, fan faults, heatsink contact and the thermal interface are considered before we recommend cleaning or thermal service. We do not assume every overheating fault needs the same paste or material.',
      },
      {
        id: 'faq-kaifan-3',
        question: 'Do you use Honeywell PTM7950 or Arctic MX-6?',
        answer: 'The material depends on the exact laptop and cooler design. Where compatible, thermal service may use Honeywell PTM7950 phase-change material or Arctic MX-6 thermal compound. VRAM and VRM pads or putty are matched to the required thickness. We do not apply one material universally.',
      },
      {
        id: 'faq-kaifan-4',
        question: 'Can you repair a laptop that has no power or a suspected dead motherboard?',
        answer: 'We inspect the adapter and input path, current draw, relevant power rails and suspected board components before recommending a repair. Where the fault and original board condition make it technically viable, we assess component-level repair. A complete motherboard replacement is not assumed from the no-power symptom alone.',
      },
      {
        id: 'faq-kaifan-5',
        question: 'Can you replace a cracked laptop screen or a failing battery?',
        answer: 'Yes. We confirm the exact laptop model and the required screen or battery specification before quoting. For black-screen symptoms, we also check the display cable, connector, panel power and motherboard backlight path. Battery and charging behaviour are assessed together where needed.',
      },
      {
        id: 'faq-kaifan-6',
        question: 'Do hardware diagnostics require my password, and can I keep my SSD?',
        answer: 'A Windows or macOS account password is not needed for hardware-only cooling, screen, battery, charging or motherboard diagnostics. For compatible laptops and desktops with a removable NVMe or SATA drive, ask before collection about removing and keeping it. Boot, operating-system and storage tests are limited while the drive is removed. Many newer MacBooks have soldered storage. Do not send your password over WhatsApp.',
      },
      {
        id: 'faq-kaifan-7',
        question: 'Do you have a walk-in repair shop in Kaifan?',
        answer: 'KCROC does not operate a separate walk-in branch in Kaifan. We collect from your home or office and complete diagnosis and approved repairs at our central ESD-safe lab: Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19, Hawalli. We then arrange return delivery to your Kaifan address.',
      },
      {
        id: 'faq-kaifan-8',
        question: 'How long does repair take after collection?',
        answer: 'Many standard repairs are completed within 24–48 hours after the device reaches the lab. Component-level motherboard work can take around 24–72 hours. The team confirms a realistic estimate after diagnosis because the exact fault and part availability affect the timing.',
      },
      {
        id: 'faq-kaifan-9',
        question: 'What if my motherboard cannot be repaired or I decline the quote?',
        answer: 'KCROC shares the diagnosis and quote before paid work begins. Under No Fix, No Fee, if we cannot successfully repair the device—or you do not approve the quoted repair—you pay no repair charge. Completed repairs carry the 30-day parts-and-labour warranty.',
      },
    ],
    landmark: 'Doorstep collection area — Kaifan Blocks 1–7; diagnosis and repair at KCROC’s Hawalli lab',
    serviceRadiusKm: 12,
    serviceAreas: ['Kaifan', 'Shamiya', 'Khaldiya', 'Faiha'],
    relatedServiceIds: ['srv-laptop', 'srv-screen', 'srv-battery', 'srv-motherboard'],
    relatedProblemIds: ['problem-overheating', 'problem-no-power', 'problem-cracked-screen', 'problem-not-charging'],
    relatedLocationIds: ['loc-shamiya', 'loc-shuwaikh-residential', 'loc-abdullah-al-salem'],
    contentImage: {
      src: IMAGES.gaming.gamingOverheating.src,
      alt: IMAGES.gaming.gamingOverheating.alt,
      width: IMAGES.gaming.gamingOverheating.width,
      height: IMAGES.gaming.gamingOverheating.height,
      caption: 'Laptop cooling inspection and thermal service at KCROC’s Hawalli workshop.',
    },
    seo: {
      title: 'Laptop Overheating & Computer Repair Kaifan | KCROC',
      description: 'Laptop and MacBook overheating, thermal shutdown, no-power motherboard, screen and battery repair for Kaifan Blocks 1–7 (71800; 71801–71807). Free doorstep pickup to KCROC’s Hawalli lab.',
      canonicalUrl: 'https://www.computerrepairkuwait.com/location/kaifan',
      ogType: 'website',
      schemaTypes: ['LocalBusiness'],
      lastModified: '2026-11-05T00:00:00+03:00',
    },
    navigationPriority: 85,
  } as LocationEntity,

 'loc-yarmouk': {id:'loc-yarmouk',slug:'yarmouk',entityType:'Location',isActive:true,isPhysicalLocation:false,
  title:'Yarmouk',description:'Laptop, MacBook and gaming PC repair for Yarmouk, with free pickup to KCROC’s Hawalli lab.',
  localIntro:"KCROC offers free collection and return delivery for Yarmouk homes and offices. Our Hawalli technicians diagnose laptop, MacBook and desktop issues such as overheating, battery wear, damaged screens, charging faults, startup failures and motherboard problems. Gaming systems are checked for cooling and hardware stability where relevant. Every proposed repair is explained and quoted before paid work, and devices are tested before return. Yarmouk is not a separate repair branch.",
  localHighlights:[{title:'Pickup from Yarmouk',description:'Share the block or map pin on WhatsApp and we will arrange collection and return.'},{title:'Laptop and MacBook repair',description:'We diagnose screen, charging, battery, power and motherboard symptoms.'},{title:'Gaming laptop and PC cooling',description:'We inspect fans, airflow and temperature behaviour when a gaming system overheats or throttles.'},{title:'Workshop diagnosis in Hawalli',description:'All repairs are performed at the central KCROC lab and tested before delivery.'}],
  localFaqs:[
   {id:"faq-yarmouk-1",question:"Do you provide free laptop pickup in Yarmouk?",answer:"Yes. Free collection and return delivery can be arranged in Yarmouk. Send your block and device model on WhatsApp."},
   {id:"faq-yarmouk-2",question:"Can you clean a gaming laptop that overheats?",answer:"Yes. We inspect the cooling system, fans and thermal behaviour, then recommend cleaning or component repair based on diagnosis."},
   {id:"faq-yarmouk-3",question:"Can a laptop motherboard be repaired instead of replaced?",answer:"Where the failed component and board condition allow it, we attempt component-level repair. The technician confirms the suitable route after inspection."},
   {id:"faq-yarmouk-4",question:"Is there a repair workshop in Yarmouk?",answer:"No. Yarmouk is covered by pickup and delivery; devices are repaired at the Hawalli lab at Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19."},
   {id:"faq-yarmouk-5",question:"Will I receive a quote before work starts?",answer:"Yes. We share the diagnosis and price before paid work begins. Completed repairs carry a 30-day warranty."}
  ],
  landmark:'Mobile Dispatch Area (Devices collected in Yarmouk and repaired at the Hawalli lab)',serviceRadiusKm:13,
  serviceAreas:['Yarmouk','Qortuba','Adailiya','Surra'],relatedServiceIds:['srv-laptop','srv-gaming','srv-gaming-laptop-cleaning','srv-macbook','srv-motherboard'],
  relatedProblemIds:['problem-overheating','problem-no-power','problem-black-screen','problem-freezing-crashing'],relatedLocationIds:['loc-qortuba','loc-adailiya','loc-surra','loc-mishref'],
  contentImage:{src:IMAGES.gaming.gamingLaptopFan.src,alt:IMAGES.gaming.gamingLaptopFan.alt,width:IMAGES.gaming.gamingLaptopFan.width,height:IMAGES.gaming.gamingLaptopFan.height,caption:'Gaming laptop cooling inspection performed at KCROC’s Hawalli lab.'},
  seo:{title:"Computer Repair Yarmouk | Laptop & Gaming PC Pickup | KCROC",description:"Laptop, MacBook and gaming PC repair for Yarmouk. Free collection and return delivery from KCROC’s Hawalli repair lab.",canonicalUrl:'https://www.computerrepairkuwait.com/location/yarmouk',ogType:'website',schemaTypes:['LocalBusiness'],lastModified:'2026-11-05T00:00:00+03:00'},navigationPriority:84
 } as LocationEntity,

 'loc-qortuba': {id:'loc-qortuba',slug:'qortuba',entityType:'Location',isActive:true,isPhysicalLocation:false,
  title:'Qortuba',description:'Computer, laptop and MacBook repair for Qortuba, with free pickup and delivery to KCROC’s Hawalli workshop.',
  localIntro:"For Qortuba customers, KCROC provides free pickup and return delivery with all technical work completed at the Hawalli lab. We diagnose laptops, MacBooks and desktop PCs for no-power, charging, display, battery, overheating and motherboard issues. Gaming laptops and computers can also be checked for cooling and stability faults. The technician explains the diagnosis and recommended repair before any paid work begins, so the decision is based on the actual fault rather than guesswork.",
  localHighlights:[{title:'Pickup in Qortuba',description:'Share your block or location pin and we will arrange free collection from your home or office.'},{title:'Laptop and MacBook hardware repair',description:'Screen, battery, charging and motherboard problems are diagnosed before parts are recommended.'},{title:'Gaming system diagnostics',description:'We check overheating, shutdowns and hardware instability on supported gaming computers.'},{title:'Central Hawalli repair lab',description:'Qortuba devices are repaired at the Hawalli workshop and returned after testing.'}],
  localFaqs:[
   {id:"faq-qortuba-1",question:"Can KCROC collect a laptop from Qortuba?",answer:"Yes. Free pickup and return delivery are available for Qortuba. Send the block or map pin along with the device model and fault."},
   {id:"faq-qortuba-2",question:"Do you repair MacBooks with liquid or charging damage?",answer:"We inspect liquid-damage and charging symptoms at the lab and attempt component-level repair where technically possible. The repair path depends on the board condition."},
   {id:"faq-qortuba-3",question:"Can you repair a gaming PC that restarts under load?",answer:"Yes. We check cooling, power delivery and hardware stability to identify whether overheating or a failing component is causing the restart."},
   {id:"faq-qortuba-4",question:"Does KCROC have a shop in Qortuba?",answer:"No. Qortuba is a pickup area. Devices are diagnosed and repaired at our Hawalli lab at Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19."},
   {id:"faq-qortuba-5",question:"How will I know the price?",answer:"We share the diagnosis and quote before any paid work begins. If KCROC cannot fix the device, No Fix, No Fee means there is no repair charge."}
  ],
  landmark:'Mobile Dispatch Area (Devices collected in Qortuba and repaired at the Hawalli lab)',serviceRadiusKm:12,
  serviceAreas:['Qortuba','Adailiya','Yarmouk','Surra'],relatedServiceIds:['srv-laptop','srv-macbook','srv-gaming','srv-motherboard','srv-screen'],
  relatedProblemIds:['problem-no-power','problem-overheating','problem-black-screen','problem-not-charging','problem-freezing-crashing'],relatedLocationIds:['loc-adailiya','loc-yarmouk','loc-surra','loc-mishref'],
  contentImage:{src:IMAGES.gaming.gamingOverheating.src,alt:IMAGES.gaming.gamingOverheating.alt,width:IMAGES.gaming.gamingOverheating.width,height:IMAGES.gaming.gamingOverheating.height,caption:'PC cooling and hardware diagnosis carried out at KCROC’s Hawalli workshop.'},
  seo:{title:"Computer Repair Qortuba | Free Pickup | KCROC",description:"Laptop, MacBook and gaming PC repair for Qortuba. Free pickup and delivery; diagnosis and repairs at KCROC’s Hawalli lab.",canonicalUrl:'https://www.computerrepairkuwait.com/location/qortuba',ogType:'website',schemaTypes:['LocalBusiness'],lastModified:'2026-11-05T00:00:00+03:00'},navigationPriority:83
 } as LocationEntity,

 'loc-mishref': {id:'loc-mishref',slug:'mishref',entityType:'Location',isActive:true,isPhysicalLocation:false,
  title:'Mishref',description:'Laptop, MacBook and desktop computer repair for Mishref and West Mishref, with free pickup to KCROC’s Hawalli lab.',
  localIntro:"KCROC serves Mishref, West Mishref and Mubarak Al-Abdullah through free pickup and return delivery. Devices are brought to the Hawalli lab for diagnosis and repair, including laptop and MacBook charging, battery, screen, overheating, no-power and motherboard faults. Gaming laptops and desktop PCs can be checked for cooling and stability problems. The technician explains the findings and quote before paid work begins. This is a pickup service area; the only KCROC walk-in repair lab remains in Hawalli.",
  localHighlights:[{title:'Pickup from Mishref and West Mishref',description:'Send your block, street or map pin and we will confirm the collection arrangement.'},{title:'Laptop and MacBook repair',description:'We diagnose display, battery, charging and startup problems before recommending parts.'},{title:'Gaming PC and cooling checks',description:'Overheating and shutdown faults are checked through temperature, fan and hardware diagnostics.'},{title:'Repairs performed in Hawalli',description:'Devices are repaired at the central lab, tested and returned to the pickup address.'}],
  localFaqs:[
   {id:"faq-mishref-1",question:"Do you provide pickup from Mishref and West Mishref?",answer:"Yes. Free pickup and return delivery can be arranged in Mishref and West Mishref. Share your block or location pin on WhatsApp."},
   {id:"faq-mishref-2",question:"Can you repair a gaming laptop that overheats and shuts down?",answer:"Yes. We inspect the fans, cooling system and temperature behaviour, then check for other hardware causes before recommending a repair."},
   {id:"faq-mishref-3",question:"Do you repair laptop motherboard and charging faults?",answer:"Yes. We diagnose the charging path and motherboard, then attempt component-level repair when the board condition allows it."},
   {id:"faq-mishref-4",question:"Is KCROC located in Mishref?",answer:"No. Mishref is covered through pickup and delivery. The repair lab is in Hawalli at Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19."},
   {id:"faq-mishref-5",question:"Are repairs covered by a warranty?",answer:"Completed repairs carry a 30-day warranty. We provide the diagnosis and quote before paid work begins."}
  ],
  landmark:'Mobile Dispatch Area (Devices collected in Mishref, West Mishref and Mubarak Al-Abdullah and repaired at the Hawalli lab)',serviceRadiusKm:15,
  serviceAreas:['Mishref','West Mishref','Mubarak Al-Abdullah'],relatedServiceIds:['srv-laptop','srv-macbook','srv-motherboard','srv-gaming','srv-gaming-laptop-cleaning'],
  relatedProblemIds:['problem-overheating','problem-no-power','problem-not-charging','problem-black-screen','problem-freezing-crashing'],relatedLocationIds:['loc-yarmouk','loc-qortuba','loc-surra'],
  contentImage:{src:IMAGES.laptopHardware.laptopDustCleaningOverheatingKuwait.src,alt:IMAGES.laptopHardware.laptopDustCleaningOverheatingKuwait.alt,width:IMAGES.laptopHardware.laptopDustCleaningOverheatingKuwait.width,height:IMAGES.laptopHardware.laptopDustCleaningOverheatingKuwait.height,caption:'A real laptop cooling service image from KCROC’s Hawalli workshop.'},
  seo:{title:"Computer Repair Mishref | Free Pickup | KCROC",description:"Laptop, MacBook and PC repair for Mishref, West Mishref and Mubarak Al-Abdullah. Free pickup and delivery to KCROC’s Hawalli lab.",canonicalUrl:'https://www.computerrepairkuwait.com/location/mishref',ogType:'website',schemaTypes:['LocalBusiness'],lastModified:'2026-11-05T00:00:00+03:00'},navigationPriority:82
 } as LocationEntity,


    /* ═══════════════════════════════════════════════════════════════
       REVIEWS
    ═══════════════════════════════════════════════════════════════ */
    'reviews-row': { 
      id: 'reviews-row', entityType: 'Reviews', isActive: true, title: 'Google Business Profile reviews', aggregateRating: { ratingValue: '4.9', reviewCount: 161 }, 
      items: [
        // Source and wording checked against the public Google Business Profile on 5 November 2026.
        // Only reviews whose own text explicitly names Hawalli/Hawally are assigned to the Hawalli page.
        {
          name: 'Yasmine Al Refaie',
          location: 'Hawalli',
          time: '3 March 2026',
          rating: 5,
          device: 'Laptop camera repair',
          text: 'best computer repair service in hawalli, they solve my laptop camera issue perfectly…',
          sourceUrl: 'https://maps.google.com/?cid=3928987856909945446',
          publicationVerified: true,
        },
        {
          name: 'Riyadh Bawazir',
          location: 'Hawalli',
          time: '29 December 2025',
          rating: 5,
          device: 'Dell laptop repair',
          text: 'The best laptop repair service here in hawalli, Kuwait.',
          sourceUrl: 'https://maps.google.com/?cid=3928987856909945446',
          publicationVerified: true,
        },
        {
          name: 'Ryan | AAB World',
          location: 'Hawalli',
          time: '15 November 2025',
          rating: 5,
          device: 'Gaming PC repair',
          text: 'I highly recommend this PC service center along Bin Khaldoun St. in Hawally.',
          sourceUrl: 'https://maps.google.com/?cid=3928987856909945446',
          publicationVerified: true,
        },
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
      id: 'faq-near-me-home', slug: 'computer-repair-pickup-delivery', entityType: 'FAQ', isActive: true,
      title: 'Can KCROC collect my computer or laptop from home or office?',
      description: 'How pickup and delivery work for customers across Kuwait.',
      answer: 'Yes. KCROC can arrange pickup from your home or office across Kuwait. The device is transported to our Hawalli workshop for diagnosis and repair, then returned after testing. We do not offer at-home or on-site computer repairs.',
      seo: { title: 'FAQ: Computer Repair Pickup & Delivery Kuwait', description: 'Learn how KCROC collects devices from home or office and repairs them at the Hawalli workshop.', canonicalUrl: 'https://www.computerrepairkuwait.com/near-me', schemaTypes: ['FAQPage'] }
    } as FAQEntity,
    'faq-arabic-computer-technician': {
      id: 'faq-arabic-computer-technician', slug: 'arabic-computer-technician-kuwait', entityType: 'FAQ', isActive: true,
      title: 'هل يمكنني ترتيب استلام الكمبيوتر أو اللابتوب من المنزل؟',
      description: 'معلومات عن خدمة فني الكمبيوتر وإصلاح اللابتوب والكمبيوتر في الكويت.',
      answer: 'نعم، نوفّر خدمة استلام وتوصيل مجانية من مناطق الخدمة في الكويت. يتم الفحص والإصلاح في مختبرنا المركزي في حولي، ثم نعيد الجهاز بعد الاختبار. لا نقدم إصلاحًا داخل المنزل أو زيارة فني للموقع؛ راسلنا على واتساب بذكر منطقتك ونوع الجهاز والمشكلة لتأكيد الاستلام.',
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
    'faq-ar-home-motherboard': {
      id: 'faq-ar-home-motherboard', slug: 'ar-home-motherboard-repair', entityType: 'FAQ', isActive: true,
      title: 'هل تصلحون المذربورد أم تستبدلونها بالكامل؟',
      description: 'كيف يصلح مختبر KCROC أعطال اللوحة الأم على مستوى المكوّن الإلكتروني.',
      answer: 'نصلح أعطال المذربورد على مستوى المكوّن الإلكتروني، بما في ذلك دوائر الطاقة والشحن. بعد فحص الجهاز نوضح لك الحل والتكلفة قبل بدء العمل، وقد يكون الإصلاح الدقيق بديلًا عن استبدال اللوحة بالكامل.',
      seo: { title: 'إصلاح المذربورد في الكويت | KCROC', description: 'تعرف على إصلاح اللوحة الأم ودوائر الطاقة والشحن على مستوى المكوّن الإلكتروني.', canonicalUrl: 'https://www.computerrepairkuwait.com/ar#faq-motherboard-repair', schemaTypes: ['FAQPage'] }
    } as FAQEntity,

    'faq-ar-home-pickup': {
      id: 'faq-ar-home-pickup', slug: 'ar-home-free-pickup-delivery', entityType: 'FAQ', isActive: true,
      title: 'كيف تعمل خدمة الاستلام والتوصيل المجاني في الكويت؟',
      description: 'معلومات عن استلام أجهزة الكمبيوتر واللابتوب من مناطق الخدمة في الكويت.',
      answer: 'نرتب استلام الجهاز من منزلك أو مكتبك في مناطق الخدمة بالكويت وننقله إلى مختبرنا في حولي، ثم ننسق إعادته بعد انتهاء الإصلاح والاختبار. تواصل معنا عبر واتساب لتأكيد منطقتك وموعد الاستلام.',
      seo: { title: 'استلام وتوصيل مجاني لتصليح الكمبيوتر في الكويت', description: 'رتب استلام الكمبيوتر أو اللابتوب من المنزل أو المكتب إلى مختبر KCROC في حولي.', canonicalUrl: 'https://www.computerrepairkuwait.com/ar#faq-free-pickup', schemaTypes: ['FAQPage'] }
    } as FAQEntity,

    'faq-ar-home-data': {
      id: 'faq-ar-home-data', slug: 'ar-home-data-safety', entityType: 'FAQ', isActive: true,
      title: 'هل يتطلب تصليح اللابتوب أو الماك بوك حذف البيانات؟',
      description: 'ما يجب معرفته عن البيانات أثناء إصلاح أعطال الكمبيوتر واللابتوب.',
      answer: 'إصلاح العتاد لا يتطلب عادةً تهيئة الجهاز أو حذف الملفات. نركز على العطل المادي، ولا نبدأ أي إجراء يمس التخزين أو نظام التشغيل دون موافقتك. وقد تؤثر بعض الأعطال نفسها على البيانات، لذلك أخبرنا إذا كانت ملفاتك مهمة قبل الاستلام.',
      seo: { title: 'البيانات أثناء تصليح اللابتوب | KCROC الكويت', description: 'تعرف على التعامل مع البيانات أثناء إصلاح أعطال الكمبيوتر واللابتوب.', canonicalUrl: 'https://www.computerrepairkuwait.com/ar#faq-data-safety', schemaTypes: ['FAQPage'] }
    } as FAQEntity,

    'faq-ar-home-pricing': {
      id: 'faq-ar-home-pricing', slug: 'ar-home-repair-pricing', entityType: 'FAQ', isActive: true,
      title: 'هل الفحص مجاني ومتى أعرف تكلفة التصليح؟',
      description: 'معلومات عن الفحص الأولي وتسعير إصلاح الكمبيوتر واللابتوب.',
      answer: 'الفحص الأولي مجاني. بعد تحديد سبب العطل، نوضح لك تكلفة الإصلاح والقطع المطلوبة قبل أن نبدأ؛ وبعد معرفة السعر يكون القرار لك.',
      seo: { title: 'تكلفة تصليح الكمبيوتر واللابتوب في الكويت | KCROC', description: 'الفحص الأولي مجاني، وتُوضح تكلفة الإصلاح قبل بدء العمل.', canonicalUrl: 'https://www.computerrepairkuwait.com/ar#faq-repair-pricing', schemaTypes: ['FAQPage'] }
    } as FAQEntity,

    'faq-ar-home-turnaround': {
      id: 'faq-ar-home-turnaround', slug: 'ar-home-repair-time', entityType: 'FAQ', isActive: true,
      title: 'كم يستغرق تصليح الكمبيوتر أو اللابتوب؟',
      description: 'ما الذي يحدد مدة إصلاح الكمبيوتر واللابتوب في مختبر KCROC.',
      answer: 'تعتمد المدة على نوع العطل وتوفر القطع ونتيجة الفحص. بعد تشخيص الجهاز نعطيك تقديرًا مبدئيًا للمدة، ونطلعك على أي تغيير إذا احتاج الإصلاح وقتًا إضافيًا.',
      seo: { title: 'مدة تصليح الكمبيوتر واللابتوب في الكويت | KCROC', description: 'تعرف على العوامل التي تحدد مدة الإصلاح ومتى تحصل على تقدير زمني.', canonicalUrl: 'https://www.computerrepairkuwait.com/ar#faq-repair-time', schemaTypes: ['FAQPage'] }
    } as FAQEntity,

    'faq-pick-and-drop': { id: 'faq-pick-and-drop', slug: 'pick-and-drop', entityType: 'FAQ', isActive: true, title: 'Do you offer a pick and drop service across Kuwait?', description: 'Free pickup and delivery across all Kuwait governorates.', answer: 'Yes. Kuwait Computer Repair On Call provides completely free pickup and delivery across all Kuwait governorates — including Hawalli, Salmiya, Kuwait City, Farwaniya, Ahmadi, Jahra, Fahaheel, Mangaf, and Mahboula. Message us on WhatsApp to arrange collection. There are no hidden transport charges.', seo: { title: 'FAQ: Free Pick & Drop Service', description: 'Free pickup and delivery across all Kuwait.', canonicalUrl: 'https://www.computerrepairkuwait.com/faq#pick-and-drop', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-liquid-damage': { id: 'faq-liquid-damage', slug: 'liquid-damage', entityType: 'FAQ', isActive: true, title: 'Do you repair liquid-damaged laptops and MacBooks?', description: 'Details about our ultrasonic liquid damage repair process.', answer: 'Yes. We fully disassemble the device, run the motherboard through an industrial ultrasonic cleaner to strip corrosion, then trace and replace the specific shorted components using micro-soldering.', seo: { title: 'FAQ: Liquid Damage Repair', description: 'Liquid damage repair process details.', canonicalUrl: 'https://www.computerrepairkuwait.com/faq#liquid-damage', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-no-fix': { id: 'faq-no-fix', slug: 'no-fix', entityType: 'FAQ', isActive: true, title: 'What does No Fix, No Fee mean exactly?', description: 'Our transparent pricing guarantee.', answer: 'If we cannot successfully repair your device after a full diagnostic, you pay absolutely nothing — not for the diagnostic, labor, or parts tested. You only pay if you approve the quote and the repair is successful.', seo: { title: 'FAQ: No Fix No Fee Policy', description: 'How our no fix no fee guarantee works.', canonicalUrl: 'https://www.computerrepairkuwait.com/faq#no-fix', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-warranty': { id: 'faq-warranty', slug: 'warranty', entityType: 'FAQ', isActive: true, title: 'What warranty do you provide on repairs?', description: '30-day warranty coverage details.', answer: 'All successful hardware repairs at KCROC carry a 30-day warranty covering both parts and labor. Screen replacements, battery replacements, and board-level repairs all carry this same 30-day coverage.', seo: { title: 'FAQ: Repair Warranty', description: '30-day warranty on all hardware repairs.', canonicalUrl: 'https://www.computerrepairkuwait.com/faq#warranty', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-data-safe': { id: 'faq-data-safe', slug: 'data-safety', entityType: 'FAQ', isActive: true, title: 'Is my personal data safe during repair?', description: 'Our strict data privacy protocol.', answer: 'Yes. We operate a strict hardware-only, no-snooping policy. For motherboard and motherboard repairs, you are welcome to remove your storage drive before handing the device over.', seo: { title: 'FAQ: Data Safety During Repair', description: 'How we protect your data during computer repair.', canonicalUrl: 'https://www.computerrepairkuwait.com/faq#data-safety', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-same-day': { id: 'faq-same-day', slug: 'same-day-repair', entityType: 'FAQ', isActive: true, title: 'Do you offer same-day computer repair in Kuwait?', description: 'Same-day service availability and cutoff times.', answer: 'Yes, same-day repair is available for eligible jobs booked before 11:00 AM. Services typically completed same day include: screen replacements, battery replacements, keyboard repairs, SSD upgrades, and Windows installation.', seo: { title: 'FAQ: Same-Day Repair Service', description: 'Same-day computer repair availability in Kuwait.', canonicalUrl: 'https://www.computerrepairkuwait.com/faq#same-day', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-cost': { id: 'faq-cost', slug: 'repair-cost', entityType: 'FAQ', isActive: true, title: 'How much does computer repair cost in Kuwait?', description: 'Base pricing for common repair services.', answer: 'Diagnostics are free. Laptop screen-replacement labor starts from 30 KWD, plus the panel; battery-replacement labor starts from 8 KWD (typically 8–15 KWD), plus the battery; and keyboard-replacement labor starts from 10 KWD, with the part cost confirmed for the exact model. Common laptop repairs start from 15 KWD, MacBook repair from 25 KWD, and component-level motherboard repair from 25 KWD. The complete price depends on the model, fault and parts, and is confirmed before paid work begins.', seo: { title: 'FAQ: Repair Costs Kuwait', description: 'Computer repair pricing in Kuwait.', canonicalUrl: 'https://www.computerrepairkuwait.com/faq#cost', schemaTypes: ['FAQPage'] } } as FAQEntity,
    
    'faq-macbook-brands': { id: 'faq-macbook-brands', slug: 'macbook-models', entityType: 'FAQ', isActive: true, title: 'Which MacBook models do you repair?', description: 'List of supported Apple MacBook models for repair.', answer: 'We repair all MacBook models including MacBook Air (M1, M2, M3), MacBook Pro 13", 14", and 16" (M1, M2, M3, M3 Pro, M3 Max), and all Intel MacBook models from 2015 onward. This includes motherboard micro-soldering, USB-C power IC replacement, screen replacement, battery replacement, and liquid damage recovery for all these models.', seo: { title: 'Which MacBook models do you repair?', description: 'We repair all MacBook Air and Pro models including M1, M2, M3, and Intel variations.', canonicalUrl: 'https://www.computerrepairkuwait.com/faq#macbook-models', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-data-loss': { id: 'faq-data-loss', slug: 'data-loss', entityType: 'FAQ', isActive: true, title: 'Will I lose my data during repair?', description: 'Information regarding data preservation during component repairs.', answer: 'Routine hardware repairs such as screen, battery, keyboard and charging-port work do not normally require access to personal files. For motherboard work, repairing the original board where technically possible may help retain data access, but data survival or recovery cannot be guaranteed. Back up important files when possible. KCROC does not provide standalone data recovery.', seo: { title: 'Will I lose my data during repair?', description: 'How KCROC handles customer files during hardware repairs and why original-board repair does not guarantee data recovery.', canonicalUrl: 'https://www.computerrepairkuwait.com/faq#data-loss', schemaTypes: ['FAQPage'] } } as FAQEntity,
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
    'faq-battery-replacement-time': { id: 'faq-battery-replacement-time', slug: 'battery-replacement-time', entityType: 'FAQ', isActive: true, title: 'How long does laptop battery replacement take?', description: 'Typical turnaround time for laptop and MacBook battery replacement in Kuwait.', answer: 'Timing depends on the laptop model, the exact battery part, stock availability, and whether inspection finds additional damage. KCROC confirms a realistic estimate after checking the model and repair requirements; pickup and delivery are arranged after the agreed work and testing.', seo: { title: 'How long does laptop battery replacement take?', description: 'Typical turnaround time for laptop and MacBook battery replacement in Kuwait.', canonicalUrl: 'https://www.computerrepairkuwait.com/guides/laptop-battery-warning-signs#faq', schemaTypes: ['FAQPage'] } } as FAQEntity,
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
    'faq-windows': { id: 'faq-windows', slug: 'windows-install', entityType: 'FAQ', isActive: true, title: 'Can you reinstall Windows on my laptop?', description: 'Details on clean Windows 10 and 11 installation services.', answer: 'Yes. We perform clean Windows 10 and Windows 11 installations with driver installation and essential updates. A clean installation can remove existing files and applications, so customers should back up accessible files themselves before approving the work. KCROC does not provide standalone data recovery or guarantee recovery of inaccessible files.', seo: { title: 'Can you reinstall Windows on my laptop?', description: 'Clean Windows 10 and 11 installations with driver setup, plus important notes about customer-managed backups and clean-install data loss.', canonicalUrl: 'https://www.computerrepairkuwait.com/faq#windows-install', schemaTypes: ['FAQPage'] } } as FAQEntity,

    /* ═══════════════════════════════════════════════════════════════
       BRANDS
    ═══════════════════════════════════════════════════════════════ */
    'brand-dell': {
      id: 'brand-dell', slug: 'dell-laptop-repair-kuwait', entityType: 'Brand', isActive: true,
      title: 'Dell Laptop Repair Kuwait', brandName: 'Dell', officialWebsite: 'https://www.dell.com',
      description: 'Dell laptops—including Inspiron, Latitude, XPS, G Series and Alienware—can develop charging, hinge, display, battery, cooling and motherboard faults. KCROC confirms the exact model, tests the reported symptom and explains repair versus part replacement before work. Memory and storage upgrade options vary by model, so compatibility is checked rather than assumed.',
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
      seo: { title: 'Dell Laptop Service Center Kuwait (Independent) | From 15 KWD | KCROC', description: 'Independent Dell laptop repair in Kuwait—not Dell-authorized. Inspiron, Latitude, XPS and Alienware diagnosis. Selected repairs from 15 KWD where applicable, free pickup and a quote before work.', canonicalUrl: 'https://www.computerrepairkuwait.com/dell-laptop-repair-kuwait', ogType: 'article', schemaTypes: ['Brand', 'Service', 'FAQPage', 'BreadcrumbList'], lastModified: '2026-11-03T00:00:00+03:00' },
      navigationPriority: 90, popular: true 
    } as BrandEntity,

    'brand-hp': {
      id: 'brand-hp', slug: 'hp-laptop-repair-kuwait', entityType: 'Brand', isActive: true,
      title: 'HP Laptop Repair Kuwait', brandName: 'HP', officialWebsite: 'https://www.hp.com',
      description: 'HP laptops—from Pavilion and Envy to EliteBook, ProBook, OMEN and Victus—can develop charging, power, hinge, cooling, battery and display faults. KCROC checks the exact model and symptoms at the Hawalli workshop before recommending a repair.',
      commonModels: ['Pavilion', 'EliteBook', 'ProBook', 'Spectre x360', 'Envy', 'OMEN', 'Victus'],
      commonIssues: [
        { id: 'hp-power', title: 'HP laptop no-power or power-management fault', severity: 'high', description: 'A no-power symptom can involve the adapter, input circuit, charging path, power-management IC or another board fault. Testing identifies the cause before a component or board replacement is recommended.' },
        { id: 'hp-hinge', title: 'Hinge separation', severity: 'high', description: 'Envy and Pavilion hinge mounts breaking from chassis.' },
        { id: 'hp-fan', title: 'Fan error or overheating at startup', severity: 'medium', description: 'A fan warning such as HP 90b can involve a failing fan, blocked airflow, a connector issue or sensor feedback. We inspect the cooling assembly before recommending a replacement.' }
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
      seo: { title: 'HP Laptop Service Center Kuwait (Independent) | From 15 KWD | KCROC', description: 'Independent HP laptop repair in Kuwait—not HP-authorized. Pavilion, EliteBook, ProBook, Envy, OMEN and Victus diagnosis. Selected repairs from 15 KWD where applicable, free pickup and a quote before work.', canonicalUrl: 'https://www.computerrepairkuwait.com/hp-laptop-repair-kuwait', ogType: 'article', schemaTypes: ['Brand', 'Service', 'FAQPage', 'BreadcrumbList'], lastModified: '2026-11-03T00:00:00+03:00' },
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
      relatedServiceIds: ['srv-gaming', 'srv-laptop', 'srv-motherboard', 'srv-screen', 'srv-battery', 'srv-gaming-laptop-cleaning', 'srv-hinge'],
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
        title: 'Lenovo Laptop Service Center Kuwait (Independent) | From 15 KWD | KCROC',
        description: 'Independent Lenovo laptop repair in Kuwait—not Lenovo-authorized. ThinkPad, Legion, IdeaPad, Yoga and LOQ diagnosis. Selected repairs from 15 KWD where applicable, free diagnosis, pickup and a quote before work.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/lenovo-laptop-repair-kuwait',
        ogType: 'website',
        schemaTypes: ['Brand', 'Service', 'FAQPage', 'BreadcrumbList'],
        lastModified: '2026-11-03T00:00:00+03:00',
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
        { id: 'asus-liquid-metal', title: 'High temperatures or fan noise under load', severity: 'high', description: 'ROG and other gaming laptops can run hot due to workload, restricted airflow, fan faults, power settings or thermal-interface condition. We check temperatures and inspect the cooling path before recommending liquid-metal or thermal-paste service.' },
        { id: 'asus-power', title: 'Dead motherboard (No power)', severity: 'high', description: 'TUF series input MOSFET or charging IC failure.' },
        { id: 'asus-wifi', title: 'MediaTek WiFi dropping', severity: 'medium', description: 'Frequent WiFi drops requiring card upgrade to Intel AX series.' },
        { id: 'asus-screen', title: 'Screen flickering', severity: 'medium', description: 'Display cable wear from Zephyrus "ErgoLift" hinge design.' }
      ],
      relatedServiceIds: ['srv-laptop', 'srv-gaming', 'srv-gaming-laptop-cleaning', 'srv-motherboard', 'srv-screen', 'srv-hinge'],
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
      seo: { title: 'ASUS Laptop Repair Kuwait | ROG, TUF & ZenBook | KCROC', description: 'Independent ASUS laptop repair in Kuwait for ROG, TUF, ZenBook and VivoBook. Thermal, charging, motherboard and screen repair; free pickup and 30-day warranty.', canonicalUrl: 'https://www.computerrepairkuwait.com/asus-laptop-repair-kuwait', ogType: 'article', schemaTypes: ['Brand', 'Service', 'FAQPage', 'BreadcrumbList'], lastModified: '2026-10-25T00:00:00+03:00' },
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
      description: 'Independent MSI laptop repair in Kuwait from KCROC’s Hawalli lab for Katana, Raider, Stealth, Thin and Cyborg models. We diagnose hinge and chassis damage, charging and no-power faults, cooling problems, battery swelling and black screens. Board-level repair is considered only after model-specific testing, with a quote before paid work and free pickup and delivery across Kuwait.',
      commonModels: ['Katana GF66', 'Raider GE76', 'Stealth GS66', 'Thin GF63', 'Cyborg 15'],
      commonIssues: [
        { id: 'msi-hinge', title: 'Broken MSI hinge or lifted screen lid', severity: 'high', description: 'A stiff hinge can pull brass threaded inserts or standoffs out of the plastic lid or base, separating the bezel or cracking the cover. We inspect the hinge, mounting bosses, lid, bezel and display cable. Where the chassis design and remaining material permit a durable repair, the mounts can be structurally reconstructed and hinge resistance corrected; otherwise, we quote for the appropriate hinge or cover replacement. Stop opening the lid if you hear cracking.' },
        { id: 'msi-motherboard', title: 'MSI no-power fault or charging light but no boot', severity: 'high', description: 'A charging LED with no boot, no response, or abnormal current draw can point to an input or board-level fault. Depending on the exact MSI board, diagnosis may include the DC input path, 19V main rail where present, fuse, high-side MOSFETs, shorted ceramic capacitors and charging IC. We isolate the failed circuit before recommending a component repair or replacement; not every board has the same design or is repairable.' },
        { id: 'msi-thermal', title: 'MSI overheating, FPS drops or loud fans', severity: 'high', description: 'Dust-packed heatsink fins, restricted airflow, a worn fan or a degraded thermal interface can cause temperatures to rise, fan noise to increase and CPU/GPU clocks to fall during gaming. We inspect fan operation and the fin stack, remove accumulated dust, check temperatures under an appropriate load and select thermal-interface materials for the specific cooler. VRAM and VRM areas need the correct pad thickness or suitable putty, not a one-size-fits-all application.' },
        { id: 'msi-charging', title: 'Loose charging port or intermittent power', severity: 'high', description: 'Charging that cuts in and out when the connector moves can be caused by a damaged barrel DC jack, USB-C Power Delivery port, solder joints or the charging circuit. Connector type and circuit design vary by MSI model, so we verify the exact device and board before micro-soldering or replacing a port.' },
        { id: 'msi-black-screen', title: 'Power light on but MSI screen stays black', severity: 'high', description: 'Fans or keyboard lights may turn on while the screen remains black because of a display, memory, firmware, power-sequencing or motherboard fault. We check the external-display response, panel and cable connections, startup behaviour and board signals before choosing the repair path.' },
        { id: 'msi-battery', title: 'MSI battery swelling or rapid drain', severity: 'high', description: 'A raised trackpad, separating palm rest or bulging bottom cover can indicate a swollen lithium battery. Stop charging and using a visibly swollen device, do not press or puncture the battery, and arrange safe handling and model-compatible replacement.' }
      ],
      relatedServiceIds: ['srv-laptop', 'srv-gaming', 'srv-gaming-laptop-cleaning', 'srv-motherboard', 'srv-hinge', 'srv-charging-port', 'srv-battery'],
      relatedProblemIds: ['problem-hinge-break', 'problem-no-power', 'problem-not-charging', 'problem-overheating', 'problem-black-screen'],
      relatedLocationIds: ['loc-hawalli', 'loc-salmiya', 'loc-kuwait-city', 'loc-farwaniya', 'loc-ahmadi', 'loc-fahaheel'],
      relatedResourcePaths: [
        { label: 'Laptop Hinge & Chassis Repair', path: '/laptop-hinge-repair-kuwait' },
        { label: 'Gaming Laptop Cleaning & Thermal Repaste', path: '/gaming-laptop-cleaning-kuwait' },
        { label: 'Laptop Charging Port Repair', path: '/laptop-charging-port-repair-kuwait' },
        { label: 'Laptop Overheating Diagnosis', path: '/laptop-overheating-kuwait' },
        { label: 'Laptop Won’t Turn On: No-Power Diagnosis', path: '/laptop-wont-turn-on' }
      ],
      contentImages: [{ src: IMAGES.gaming.msiWorkstation.src, alt: IMAGES.gaming.msiWorkstation.alt, width: IMAGES.gaming.msiWorkstation.width, height: IMAGES.gaming.msiWorkstation.height, caption: 'MSI gaming laptop and graphics hardware on the KCROC repair workstation for model-specific diagnosis.' }],
      familyGroups: [
        { name: 'Katana, Thin & Cyborg', description: 'MSI gaming laptop families where the exact chassis revision matters when diagnosing hinge mounts, charging, fan noise and power faults.', models: ['Katana GF66', 'Thin GF63', 'Cyborg 15'], repairFocus: ['Hinge and chassis', 'Charging', 'Cooling', 'Power diagnosis'] },
        { name: 'Raider & Stealth', description: 'Performance-focused MSI systems that can need careful GPU/CPU cooling, fan, display, charging or board-level diagnosis under gaming loads.', models: ['Raider GE76', 'Stealth GS66'], repairFocus: ['Thermals', 'GPU/power', 'Display', 'Motherboard'] }
      ],
      repairProcess: [
        { step: 1, title: 'Identify the exact MSI model', description: 'We confirm the full model and board revision, then record whether the symptom is a broken hinge, no-power fault, charging issue, overheating, black screen or battery problem.' },
        { step: 2, title: 'Trace the symptom to its cause', description: 'Depending on the fault, checks can include hinge resistance and mounting inserts, fan and heatsink airflow, charger and port behaviour, input rails and board-level components.' },
        { step: 3, title: 'Explain the repair options', description: 'We distinguish repairable mounts or components from damage that needs a compatible replacement part. The price is confirmed before any paid work begins.' },
        { step: 4, title: 'Perform the approved repair', description: 'Work may include chassis reconstruction, connector micro-soldering, component-level board repair, cooling service or replacement of a confirmed failed part.' },
        { step: 5, title: 'Verify the reported fault', description: 'We check relevant functions after repair, such as hinge movement, charging, startup, display, fan operation, temperatures and system stability.' }
      ],
      technicalCapabilities: [
        'Hinge and chassis reconstruction: inspect brass threaded inserts/standoffs, cracked mounting bosses and hinge resistance; rebuild only where the chassis condition supports a durable repair.',
        'Board-level no-power diagnosis: model-specific checks of the input path, 19V main rail where applicable, fuses, high-side MOSFETs, shorted ceramic capacitors and charging ICs.',
        'USB-C Power Delivery or barrel DC-jack diagnosis and micro-soldering, depending on the exact MSI model and connector design.',
        'Embedded-controller (EC) checks or firmware work only where supported by the exact board and justified by diagnostic findings.',
        'Gaming thermal service: dust and fin-stack cleaning, fan checks, CPU/GPU thermal-interface assessment, and model-compatible VRAM/VRM pads or putty with suitable thickness.',
        'Post-repair validation of relevant power, charging, display, cooling and stability functions.'
      ],
      faqs: [
        { id: 'msi-hinge', title: 'Can a broken MSI hinge be fixed without replacing the whole screen?', answer: 'Often, yes, if the panel and cable are intact and the lid or base still supports a durable mount repair. We inspect the hinge, brass threaded inserts, plastic mounting bosses, bezel and display cable first. Structural reconstruction may be suitable in some cases; severely damaged plastic or a cracked panel may require the correct replacement part.' },
        { id: 'msi-motherboard', title: 'Can you repair an MSI motherboard that has a charging light but will not turn on?', answer: 'We diagnose the input and power circuits first. Depending on the exact board, testing may cover the main input rail, MOSFETs, fuses, shorted capacitors and charging IC. Component-level repair is offered when the fault is isolated and the board is technically repairable; otherwise we explain the alternatives.' },
        { id: 'msi-thermal', title: 'Do you use PTM7950 for MSI gaming laptop overheating?', answer: 'PTM7950 is a phase-change thermal-interface option, not a universal fit for every MSI cooler. We check the exact model and heatsink design, then confirm the suitable material before work. VRAM and VRM contact points can require model-correct pad thickness or compatible putty; using the wrong material can reduce contact and cooling.' },
        { id: 'msi-charging', title: 'Can you repair an MSI USB-C or barrel charging port?', answer: 'For supported models, we inspect the port, solder joints and charging circuit to determine whether connector replacement or a board-level repair is appropriate. USB-C Power Delivery and barrel-jack designs differ, so we confirm the full model before quoting.' },
        { id: 'msi-cost', title: 'How much does MSI laptop repair cost in Kuwait?', answer: 'The MSI page lists a starting rate from 20 KWD, not a guaranteed price for every fault. The cost depends on model, diagnosis, parts and repair scope; motherboard work or imported parts may cost more. Diagnosis is free and KCROC confirms the quote before paid work.' },
        { id: 'msi-location', title: 'Where is your MSI laptop repair center in Kuwait?', answer: 'KCROC is an independent repair lab at Al Mullah Complex, Basement Shop 19, Ibn Khaldoun Street, Hawalli. We are not an MSI-authorized service center. Free pickup and delivery are available across Kuwait, including Hawalli, Capital, Farwaniya, Ahmadi, Jahra and Mubarak Al-Kabeer.' },
        { id: 'msi-arabic', title: 'هل تصلحون لابتوبات MSI في الكويت؟', answer: 'نعم، نقدم خدمة تصليح لابتوب MSI في الكويت، بما فيها فحص أعطال المفصلات والشحن والطاقة والحرارة حسب الموديل. تتوفر خدمة الاستلام والتوصيل مجاناً من حولي إلى مختلف مناطق الكويت. للحجز تواصل معنا عبر واتساب على +965 55301913.' }
      ],
      pricing: { startingFrom: 20, currency: 'KWD', quoteRequired: true, displayLabel: 'From 20 KWD — free diagnostic first' },
      seo: { title: 'MSI Laptop Repair Kuwait | Board, Hinge & Thermal | KCROC', description: 'MSI laptop repair in Kuwait for hinge, board-level power and overheating faults. Hawalli lab; free Kuwait-wide pickup. Call +965 55301913.', canonicalUrl: 'https://www.computerrepairkuwait.com/msi-laptop-repair-kuwait', ogType: 'article', schemaTypes: ['Brand', 'Service', 'FAQPage', 'BreadcrumbList'], lastModified: '2026-10-29T00:00:00+03:00' },
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
      title: 'Laptop Overheating in Kuwait',
      primaryKeyword: 'laptop overheating Kuwait',
      secondaryKeywords: [
        'laptop overheating',
        'laptop shuts down from heat',
        'laptop thermal throttling',
        'laptop fan loud and hot',
        'gaming laptop overheating Kuwait',
        'laptop overheating while idle',
        'laptop fan not cooling',
        'laptop cooling fan repair Kuwait',
        'laptop temperature drops performance',
        'laptop thermal paste replacement Kuwait'
      ],
      synonyms: [
        'laptop running hot',
        'laptop gets too hot',
        'laptop overheats and shuts down',
        'laptop fan running loudly',
        'laptop overheating after gaming',
        'laptop hot while charging'
      ],
      description: 'A Kuwait-focused diagnostic guide to laptop overheating, loud fans, heat-related slowdowns and unexpected shutdowns—covering safe checks, model-specific thermal limits, likely causes and what a repairer should verify before recommending parts.',
      shortDescription: 'Separate normal warmth from a cooling fault with safe, model-specific checks before paying for cleaning, thermal-interface service or replacement parts.',
      seo: {
        title: 'Laptop Overheating in Kuwait | Diagnosis & Repair | KCROC',
        description: 'Laptop overheating in Kuwait? Learn safe checks, warning signs and how KCROC diagnoses airflow, fans and thermal throttling before recommending repair. Free pickup and delivery.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/laptop-overheating-kuwait',
        ogType: 'article',
        schemaTypes: ['TechArticle', 'FAQPage', 'BreadcrumbList'],
        lastModified: '2026-10-27T00:00:00+03:00'
      },
      intro: 'A laptop that feels hot, runs a loud fan or loses performance is giving you evidence—not a diagnosis. Normal CPU/GPU boost, a demanding application, a blocked intake, dust hidden in the heatsink fins, a failing fan, poor heatsink contact, a power profile or a background process can overlap in their symptoms. Kuwait’s outdoor heat and hot vehicles can reduce cooling headroom, but climate alone does not prove that thermal paste has failed or that every laptop needs a scheduled repaste. This page shows you how to identify the pattern safely, what the readings can and cannot tell you, and what a model-specific diagnosis should confirm before repair.',
      symptom: 'The laptop becomes unusually hot, the fan stays loud, airflow seems weak, performance drops during sustained work, a thermal warning appears, or the device shuts down unexpectedly.',
      causes: [
        'Dust, lint or debris packed into the fan or heatsink fin stack, restricting airflow even when the outside grille looks clear.',
        'An intake or exhaust blocked by a bed, cushion, lap, stand, wall, dock or other placement that conflicts with the model’s airflow design.',
        'A worn, damaged, obstructed or failed fan, fan cable, bearing or fan-control circuit; grinding or rattling points to a different problem from ordinary fan ramping.',
        'A poor heatsink mount, damaged heat pipe or vapour chamber, disturbed thermal interface, or incorrect thermal-pad thickness or placement.',
        'A workload that is genuinely demanding—gaming, rendering, compiling, video calls, browser tabs or updates—or a process that keeps CPU/GPU activity high at idle.',
        'A firmware, embedded-controller, driver, performance-mode or temperature-sensor issue that changes fan response or power limits.',
        'High ambient temperature, direct sunlight or a parked vehicle that leaves less temperature headroom and may exceed the manufacturer’s specified operating environment.',
        'A battery, charging, power-delivery or motherboard fault that can cause localised heat or shutdowns without a primary CPU/GPU cooling problem.',
        'A recent repair, drop, liquid exposure or chassis damage that may have disturbed a connector, fan, heatsink mount or other cooling component.'
      ],
      doNotDo: 'Do not keep gaming, rendering or running stress tests if the laptop repeatedly shuts down, shows a thermal warning, loses fan operation or becomes abnormally hot. Power it down if safe and arrange diagnosis. If the chassis or trackpad is lifting, the battery appears swollen, or there is smoke or a burning smell, stop using and charging it; disconnect power only if safe, do not press or open the device, and do not puncture or handle a swollen battery.',
      solution: 'KCROC’s intended diagnostic path starts with the exact model and symptom history, then separates workload and power-profile behaviour from airflow, fan, heatsink and thermal-interface faults. The cooling assembly is inspected only using the model-appropriate procedure; thermal paste, pads or liquid metal are not treated as interchangeable or replaced automatically. Where the laptop is stable enough to test, the technician compares the same workload and power mode before and after the confirmed repair, records relevant temperature, fan and performance behaviour, and explains what changed and what remains uncertain. A quote is provided before paid repair work begins.',
      urgency: 'Varies by symptom: routine assessment for stable warmth; prompt diagnosis for persistent throttling or abnormal fan behaviour; stop-use safety handling for swelling, smoke, burning smell or repeated thermal shutdowns.',
      relatedServiceIds: ['srv-laptop', 'srv-gaming-laptop', 'srv-gaming-laptop-cleaning'],
      relatedBrandIds: ['brand-dell', 'brand-hp', 'brand-lenovo', 'brand-asus', 'brand-acer', 'brand-msi'],
      relatedGuideSlug: 'why-is-my-laptop-so-hot',
      relatedResourcePaths: [
        { label: 'Universal laptop overheating guide: symptoms and safe checks', path: '/guides/why-is-my-laptop-so-hot' },
        { label: 'Dell laptop overheating: model-family troubleshooting', path: '/guides/dell-laptop-overheating' },
        { label: 'Laptop CPU and GPU temperature guide', path: '/blog/laptop-temperatures-kuwait-safe-cpu-gpu-temperatures' },
        { label: 'Cleaning intervals and thermal paste: evidence-led guidance', path: '/blog/how-often-clean-laptop-replace-thermal-paste-kuwait' },
        { label: 'Gaming laptop cleaning and thermal service', path: '/gaming-laptop-cleaning-kuwait' },
        { label: 'Gaming laptop repair in Kuwait', path: '/gaming-laptop-repair-kuwait' },
        { label: 'Laptop repair in Kuwait', path: '/laptop-repair-kuwait' },
        { label: 'Laptop battery warning signs', path: '/guides/laptop-battery-warning-signs' },
        { label: 'Laptop black screen and display symptoms', path: '/laptop-black-screen-kuwait' },
        { label: 'KCROC Hawalli workshop and local service details', path: '/location/hawalli' }
      ],
      coveredBrands: ['Dell', 'HP', 'Lenovo', 'ASUS', 'Acer', 'MSI', 'Apple MacBook', 'Microsoft Surface'],
      diagnosticSteps: [
        { step: 1, title: 'Stop risky use and improve ventilation', description: 'If the laptop repeatedly shuts down, shows a thermal warning, has no apparent fan airflow or makes a grinding noise, stop heavy work and do not reproduce the fault with a stress test. Otherwise, place it on a stable hard surface with every intake and exhaust clear; avoid beds, cushions, direct sun and hot vehicles.' },
        { step: 2, title: 'Record the exact pattern', description: 'Note whether heat starts at startup, during idle, while charging, in video calls, after a Windows/macOS update or only after a repeatable period of gaming or rendering. Record the app, time until slowdown, fan sound, shutdown behaviour and whether performance returns after cooling.' },
        { step: 3, title: 'Check workload before blaming hardware', description: 'On Windows, open Task Manager and sort by CPU; on macOS, use Activity Monitor. Look for a recognised app or update process that remains busy when the laptop should be idle. Do not terminate unfamiliar system processes or install unknown “temperature fixer” utilities. If the system is unstable or has a safety warning, skip this check and power down.' },
        { step: 4, title: 'Inspect visible vents without probing them', description: 'Look for blocked openings and listen for scraping, clicking or grinding. Do not insert tools, spray liquid into a vent, use a powerful air compressor or open the chassis just to inspect dust. External cleanliness cannot confirm that the hidden fin stack is clear; follow the exact manufacturer cleaning guidance.' },
        { step: 5, title: 'Review power mode and recent changes', description: 'Check whether the device is set to a performance, silent or balanced mode, and whether the problem began after an update, repair, drop or spill. Use manufacturer-supplied diagnostics and support instructions. Do not flash BIOS/firmware while the system is unstable or repeatedly shutting down.' },
        { step: 6, title: 'Interpret sensor readings by model', description: 'If the laptop is stable, note the tool, sensor name, workload and power mode alongside the reading. CPU package, individual core, GPU edge, GPU hotspot/junction, SSD and battery sensors measure different things. Compare with the exact manufacturer’s specifications; do not treat one temperature screenshot or the outside case temperature as a universal pass/fail test.' },
        { step: 7, title: 'Avoid unsafe DIY thermal work', description: 'Do not assume all cooling assemblies use the same paste, pads or liquid metal. Incorrect pad thickness, material, placement, screw sequence or mounting pressure can worsen thermal contact. Only open the chassis with the exact service procedure, suitable tools and skills; battery and warranty requirements also matter.' },
        { step: 8, title: 'Prepare a useful service handover', description: 'Share the full model number, operating system, charger details, workload, approximate time to slowdown, diagnostic result, any warning code, recent repair/spill/drop, and whether the fan noise changed suddenly. Mention any swelling, smell or smoke first so the device can be handled as a safety case rather than routine cleaning.' }
      ],
      decisionTree: [
        { symptom: 'Warm and louder fan only during gaming or heavy work; performance remains stable', direction: 'This can be expected thermal behaviour. Use a hard, ventilated surface and compare against the exact model’s guidance. Investigate if fan noise changes, performance declines or warnings/shutdowns occur.' },
        { symptom: 'FPS or performance drops after several minutes, then improves after cooling', direction: 'Thermal throttling is one possibility, but GPU/CPU power limits, workload changes, drivers and software can look similar. Compare temperature, clocks, utilisation and the same workload over time before choosing a repair.', href: '#technician-diagnosis', linkLabel: 'See the diagnostic process' },
        { symptom: 'Hot and loud while idle or doing light work', direction: 'Check recognised background activity and updates if the laptop is otherwise stable. Persistent high fan activity with low utilisation may require inspection of airflow, fan control, firmware or sensors—not automatic repasting.' },
        { symptom: 'Very weak airflow, fan grinding, fan not responding, thermal warning or repeated shutdown', direction: 'Stop demanding work, power down if safe and do not keep restarting to test it. Arrange a cooling and hardware diagnosis; the cause may be a fan, blockage, power issue or another fault.', href: '#technician-diagnosis', linkLabel: 'What a technician should check' },
        { symptom: 'Swollen battery/chassis, lifted trackpad, burning smell, smoke or melted plastic', direction: 'This is a safety issue, not routine cleaning. Stop using and charging the device. Disconnect power only if safe; do not press, open, puncture or continue testing it. Arrange professional battery/electrical safety handling.' },
        { symptom: 'Heat mainly while charging or when the charger is connected', direction: 'Charging and higher power modes can change heat and fan behaviour. If there are no safety warning signs, note the charger and power mode and compare like-for-like workloads; abnormal charging heat, damage or shutdowns needs diagnosis.' },
        { symptom: 'Heat plus flickering, graphics artifacts, black screen or display loss', direction: 'Do not assume the screen itself is the cause. Heat-linked graphics symptoms may involve GPU, memory, power, firmware or display hardware. Stop the workload and have the fault isolated.', href: '/laptop-black-screen-kuwait', linkLabel: 'Follow the laptop display diagnostic path' }
      ],
      technicianMethod: [
        { step: 1, title: 'Model, history and safety intake', description: 'Confirm the full model identifier, charger, operating system, workload, symptom timing, recent events and warning codes. Inspect for swelling, liquid exposure, burning smell or physical damage before powering a suspect device.' },
        { step: 2, title: 'Baseline only when safe', description: 'If the device is stable and has no stop-use warning, document the reported behaviour and use a repeatable, model-appropriate workload. Capture the power mode, fan response, temperature sensors and performance together; do not run a long stress test on a device that has been shutting down or has a suspected battery fault.' },
        { step: 3, title: 'Separate software and power behaviour', description: 'Review background load, updates, OEM performance modes, supported diagnostics and relevant firmware/driver state. A hot laptop may be working normally at high load or may be held at high utilisation by software; neither case proves a cooling assembly has failed.' },
        { step: 4, title: 'Inspect the airflow path and fan assembly', description: 'Use the model-specific service procedure to inspect the fan, cable, vent path, heatsink fin stack and mounting points. Check for dust hidden behind the grille, physical damage, abnormal fan movement and signs that the heat-transfer path is compromised.' },
        { step: 5, title: 'Verify thermal-contact materials and hardware', description: 'Only after inspection, confirm the correct thermal interface used by the model and its condition, contact pattern, pad/putty placement, heat-pipe or vapour-chamber condition and heatsink seating. Do not substitute standard paste for a pad or liquid metal where the design requires another material.' },
        { step: 6, title: 'Recommend the smallest justified repair', description: 'The findings may support cleaning, fan/cable replacement, correction of a mounting issue, thermal-interface service, firmware/power correction or deeper board diagnosis. The repair recommendation and quote are explained before paid work; cleaning or repasting is not presented as a guaranteed fix for every cause.' },
        { step: 7, title: 'Verify the repair under comparable conditions', description: 'When safe, repeat an appropriate workload with a comparable power mode and environment. Compare fan response, reported sensors, clocks/utilisation, performance and stability with the baseline. Document limitations and avoid promising a fixed temperature or FPS reduction across different models.' },
        { step: 8, title: 'Explain the finding and next steps', description: 'Tell the customer what was confirmed, what work was performed, what testing was possible, whether any warning remains and what to monitor. If another fault is suspected, explain that rather than repeatedly replacing thermal material.' }
      ],
      expertNotes: [
        { title: 'A temperature reading has meaning only with the sensor and workload', description: 'CPU package, core, GPU edge, GPU hotspot/junction, SSD and battery readings are not interchangeable. Utilisation, clocks, power mode, ambient temperature and the specific chip’s control limits influence interpretation. Compare the exact sensor with the device or component maker’s documentation; a case-temperature reading cannot be substituted for an internal sensor.' },
        { title: 'Thermal throttling is evidence of control behaviour, not proof of failed paste', description: 'A CPU or GPU may reduce clock speed or power to remain within configured thermal or electrical limits. A slowdown can also come from a power limit, application load, driver, firmware or background process. Stronger diagnosis correlates the workload, temperature trend, clocks, utilisation and fan response rather than relying on one peak reading.' },
        { title: 'Fan noise must be judged against load and sound quality', description: 'A fan accelerating during gaming, updates or rendering may be normal. Grinding, scraping, clicking, erratic starting, or a fan that fails to respond while the device becomes hot is a different signal and can point to mechanical or control trouble. Fan count and vent placement vary by model, including designs with hidden hinge exhausts or passive cooling.' },
        { title: 'Dust can clog the internal fins even when the exterior grille looks clean', description: 'Air must pass through the fin stack, not merely through the visible opening. A mat of dust near the inner fin face can restrict airflow while the outer grille looks unobstructed. Do not use aggressive air pressure or push tools inside the vent; use the manufacturer’s model-specific care or service instructions.' },
        { title: 'Thermal paste, pads, putty and liquid metal are not interchangeable', description: 'Laptop designs use different thermal interface materials and contact heights. Wrong pad thickness, misplaced putty, excess compound, poor mounting pressure or liquid-metal migration can worsen cooling or damage components. Material choice and screw sequence must follow the model-specific service information, not a generic laptop video.' },
        { title: 'There is no reliable universal annual cleaning or repaste rule', description: 'Maintenance needs depend on the design, dust exposure, operating environment, workload, fan behaviour and manufacturer guidance. Age alone does not prove that a laptop needs fresh thermal compound; repeatable symptoms, visible airflow restriction or service instructions are more defensible reasons to inspect it.' },
        { title: 'Kuwait’s heat reduces cooling headroom; it does not diagnose the part', description: 'A laptop has less headroom when surrounding air is hot, and a parked vehicle or direct sun can expose it to conditions outside its rated operating environment. This makes placement and workload important locally, but it does not establish that thermal paste has failed or that every laptop needs a shorter fixed maintenance interval.' },
        { title: 'Charging heat and battery heat need a separate safety lens', description: 'Charging and high-performance modes can change power consumption and fan behaviour. Localised battery heat, swelling, a lifted trackpad or case, smoke or a burning smell should not be managed as a normal CPU/GPU cooling issue. Stop use and charging when swelling or an electrical safety sign is present; do not press, open or puncture the battery.' },
        { title: 'A shutdown is a symptom that needs isolation, not a full diagnosis', description: 'Thermal protection can contribute to shutdowns, but power delivery, battery, firmware, sensor and other hardware faults can create similar behaviour. Repeated shutdowns warrant controlled assessment; a technician should not assume that cleaning alone will resolve them.' }
      ],
      safetyNotes: [
        'Do not run a long game, rendering job or stress test after repeated shutdowns, thermal warnings or a fan failure. A single shutdown does not prove permanent damage, but repeated events need investigation.',
        'Use a hard, stable surface and keep every intake and exhaust clear. Do not put tools into vents, spray liquids into openings or use a high-pressure compressor around an assembled laptop.',
        'If the battery or chassis is swollen, the trackpad/keyboard is lifting, there is smoke, a burning smell or melted plastic, stop using and charging the device. Disconnect power only if it is safe to do so.',
        'Never press, puncture, bend or open a swollen battery. Do not carry out routine thermal cleaning on a device showing battery or electrical safety warnings.',
        'Do not replace pads, putty, paste or liquid metal from a generic guide. The exact material, thickness, placement and reassembly procedure depend on the model.'
      ],
      kuwaitContext: [
        'Outdoor heat and hot parked vehicles can put a laptop beyond the operating environment specified for its model. Do not leave a laptop in a parked car or direct sun. For sustained gaming or work, use it indoors on a ventilated hard surface and follow the manufacturer’s own operating-range guidance instead of applying one number to every brand.',
        'Strong air-conditioning indoors does not change the device’s model-specific limits, and movement between environments is not a reason to diagnose thermal paste by guesswork. If a device has been exposed to extreme heat or gives a warning, let it return to a stable indoor condition and follow the manufacturer’s guidance before restarting it.',
        'Dust and lint accumulation depend on the room, pets, placement, workload and chassis design. Kuwait’s dusty conditions make it useful to watch for changed airflow, fan sound and performance, but they do not prove that every laptop needs annual internal cleaning or repasting.',
        'KCROC’s workshop is in Hawalli, and free pickup and delivery are offered across Kuwait’s governorates. Customers can share the exact model and symptoms before collection; overheating with repeated shutdowns, swelling, smoke or a burning smell should be flagged immediately so it is not treated as ordinary cleaning.'
      ],
      faqs: [
        { question: 'Is it normal for a laptop to feel hot in Kuwait?', answer: 'Warmth and a faster fan during gaming, video calls, updates or other heavy work can be normal. A hot exhaust can also mean the cooling system is moving heat out of the device. Investigate if the laptop becomes hot at idle, airflow or fan sound changes abnormally, performance repeatedly falls, a thermal warning appears or the device shuts down unexpectedly.' },
        { question: 'What CPU or GPU temperature is too high?', answer: 'There is no single number that is correct for every laptop. Limits and sensor definitions vary by processor, graphics chip, laptop model, firmware and power mode. Compare the named sensor with the manufacturer’s documentation and consider workload, clocks, utilisation, fan behaviour and stability together. Do not treat a case-temperature reading or one screenshot as a universal pass/fail test.' },
        { question: 'Does Kuwait’s summer heat destroy or dry out thermal paste?', answer: 'High ambient temperature reduces cooling headroom and can make sustained heavy workloads harder to cool. However, ambient heat alone does not prove that thermal paste has failed or that it needs immediate replacement. Dust restriction, fan condition, heatsink contact, power settings, firmware and software load should also be checked before choosing a repair.' },
        { question: 'How often should I clean my laptop in Kuwait?', answer: 'There is no interval that fits every model and environment. Follow the manufacturer’s care instructions and consider dust exposure, workload, placement, changed fan behaviour and visible airflow problems. A calendar-based repaste is not a substitute for diagnosis, and age alone does not prove that thermal material needs replacement.' },
        { question: 'Will cleaning and new thermal paste definitely fix overheating?', answer: 'No repair should be guaranteed before the cause is identified. Cleaning may help when airflow is restricted, and replacing thermal material may help when the interface or contact is confirmed to be the problem. A failed fan, damaged heat pipe, power or sensor fault, firmware issue or busy background process needs a different response.' },
        { question: 'Will a cooling pad solve laptop overheating?', answer: 'A compatible cooling pad may help some designs by improving airflow, but results depend on where the laptop draws air. It cannot remove dust trapped in the fin stack, repair a fan or correct poor heatsink contact. Keep the laptop’s own vents clear and treat a pad as an accessory, not a repair.' },
        { question: 'Why is my laptop hot while idle?', answer: 'Check whether a recognised app, update, indexing job, browser or synchronization process is using CPU/GPU resources. If utilisation is low but high fan activity and heat continue, the issue may involve airflow, fan control, firmware, a sensor or another hardware fault. Avoid closing unfamiliar system processes or installing untrusted diagnostic tools.' },
        { question: 'Why does my gaming laptop lose FPS after playing for a while?', answer: 'A sustained workload can expose cooling or power limits, but FPS drops can also come from a GPU/CPU bottleneck, power mode, driver, memory pressure, background activity or game behaviour. Compare the same scene and settings while observing temperature, clocks, utilisation and frame-time behaviour; do not assume new paste is the answer from FPS alone.' },
        { question: 'Can charging make a laptop hotter?', answer: 'Charging and AC performance modes can change power behaviour, and a busy application may add further heat. Note whether the issue occurs only on AC, confirm that the charger matches the device requirements, and use the manufacturer’s supported power settings. Unusual localised battery heat, swelling, smell or deformation is a safety concern—stop using and charging the device.' },
        { question: 'Can I keep using a laptop that repeatedly shuts down from heat?', answer: 'Do not keep restarting it or running stress tests to reproduce the fault. Power it down if safe and arrange an assessment. The cause could be cooling, fan, power, battery, firmware or another hardware problem, so a shutdown does not automatically mean cleaning will fix it.' },
        { question: 'What should I do if the laptop battery or chassis looks swollen?', answer: 'Stop using and charging the laptop immediately. Disconnect the power adapter only if it is safe, do not press or open the case, and never puncture, bend or try to remove a swollen battery yourself. Arrange professional safety handling rather than a routine thermal clean.' },
        { question: 'Can KCROC diagnose MacBook, Surface and gaming-laptop overheating?', answer: 'KCROC’s laptop diagnostic path covers major laptop designs, including MacBook and gaming-laptop symptoms. The exact procedure depends on the model and cooling design; thermal pads, phase-change material and liquid metal must not be treated as interchangeable. Share the model identifier and symptom history before collection.' },
        { question: 'How long does laptop overheating repair take at KCROC?', answer: 'Turnaround depends on the exact model, confirmed cause, access to the cooling assembly, parts availability and the verification required. A straightforward clean differs from a fan, heat-pipe, battery or board-level fault. KCROC should confirm a realistic estimate after assessment rather than promise the same timing for every device.' },
        { question: 'Does KCROC offer pickup across Kuwait, and do I receive a quote first?', answer: 'KCROC states that pickup and delivery are free across Kuwait’s governorates, with diagnosis and repair at its Hawalli workshop. The repair recommendation and quote should be explained before paid work begins; the business also advertises a 30-day repair warranty and No Fix, No Fee. Mention repeated shutdowns or any battery/electrical safety sign when arranging collection.' }
      ],
      technicalReferences: [
        { label: 'Dell Support: overheating, fan noise and shutdown diagnosis', url: 'https://www.dell.com/support/kbdoc/en-us/000130867/how-to-troubleshoot-a-overheating-shutdown-or-thermal-issue-on-a-dell-pc', description: 'Dell’s troubleshooting guidance distinguishes normal warmth and fan behaviour from blocked vents, dust on cooling fins, software load, throttling, abnormal fan noise and shutdowns.' },
        { label: 'Apple Support: acceptable operating temperatures for Mac laptops', url: 'https://support.apple.com/en-us/102336', description: 'Apple explains that Mac laptops can become warm during normal use, gives its supported ambient operating range, and recommends ventilation and avoiding hot parked vehicles. Other brands have their own model-specific limits.' },
        { label: 'Microsoft Support: Surface fan behaviour and fan noise', url: 'https://support.microsoft.com/en-us/surface/performance/fan-behavior-and-fan-noise-in-a-surface-device', description: 'Microsoft explains how workload, ambient temperature, charging and power mode can increase fan activity, and identifies grinding, whining or ticking as abnormal sounds.' },
        { label: 'ASUS Support: overheating and fan troubleshooting', url: 'https://www.asus.com/me-en/support/faq/1015064/', description: 'ASUS explains normal fan response to CPU/GPU workload, airflow obstruction and dust, while warning against inappropriate high-pressure cleaning methods.' },
        { label: 'AMD Support: CPU temperature and performance factors', url: 'https://www.amd.com/en/resources/support-articles/faqs/PIBRMATS3.html', description: 'AMD notes that CPU operating temperature depends on cooling, airflow, ambient conditions, settings and workload; temperatures must be interpreted against the processor’s specified limits.' },
        { label: 'Microsoft Support: battery care and visible expansion', url: 'https://support.microsoft.com/en-us/surface/battery/caring-for-your-surface-battery', description: 'Microsoft advises stopping use if a battery expands beyond the enclosure and handling the device cautiously to avoid pressure or puncture. Follow the relevant manufacturer’s safety guidance for your model.' }
      ],
      contentImages: [
        { src: IMAGES.laptopHardware.laptopDustCleaningOverheatingKuwait.src, alt: IMAGES.laptopHardware.laptopDustCleaningOverheatingKuwait.alt, width: IMAGES.laptopHardware.laptopDustCleaningOverheatingKuwait.width, height: IMAGES.laptopHardware.laptopDustCleaningOverheatingKuwait.height, placement: 'causes', caption: 'Dust accumulation can restrict the hidden heatsink fin stack even when the exterior grille looks clear.' },
        { src: IMAGES.laptopHardware.copperHeatsink2.src, alt: IMAGES.laptopHardware.copperHeatsink2.alt, width: IMAGES.laptopHardware.copperHeatsink2.width, height: IMAGES.laptopHardware.copperHeatsink2.height, placement: 'solution', caption: 'A model-specific cooling-assembly inspection helps determine whether cleaning, fan repair or thermal-interface service is justified.' }
      ],
      navigationPriority: 90,
      popular: true
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
      id: 'problem-liquid-spill',
      slug: 'spilled-water-on-laptop',
      entityType: 'Problem',
      isActive: true,
      title: 'Spilled Water, Coffee or Another Liquid on Your Laptop?',
      primaryKeyword: 'spilled water on laptop',
      secondaryKeywords: [
        'coffee spilled on laptop',
        'spilled coffee on laptop keyboard',
        'laptop water damage repair Kuwait',
        'laptop liquid damage repair Kuwait',
        'sweet tea spilled on laptop',
        'MacBook liquid damage repair Kuwait',
        'milk spilled on laptop',
        'soda spilled on laptop'
      ],
      synonyms: ['laptop got wet', 'liquid on laptop keyboard', 'spilled drink on laptop'],
      description: 'What to do after water, coffee, tea, soda or milk spills on a laptop in Kuwait. Safe power-off steps, liquid-specific risks and component-level repair guidance.',
      shortDescription: 'Spilled a drink on your laptop? Keep it off and unplugged. Learn the safest next steps and how KCROC checks liquid contamination, corrosion and board-level damage.',
      intro: 'A laptop can look dry on the outside while liquid remains beneath the keyboard, around connectors or on the motherboard. The first priority is to stop current flowing through affected electronics: power the device off, disconnect external power when it is safe, and do not switch it back on just because it still appears to work. The checks on this page are deliberately external and low-risk. Internal battery isolation, board cleaning and electrical diagnosis should be handled by a technician using the exact model and board information.',
      symptom: 'Water, coffee, tea, karak, milk, soda or another drink has reached the keyboard, touchpad, ports or laptop chassis. The device may shut down, keep running, show a black screen, stop charging, develop sticky keys or appear normal at first.',
      causes: [
        'Liquid can bridge nearby electrical contacts while power is present, creating short circuits in keyboard, charging, display or motherboard circuits.',
        'Dissolved minerals, salts, sugars, milk proteins and other drink residues can remain after visible moisture has evaporated. Surface dryness does not prove that connectors or components are clean.',
        'Liquid can travel beyond the visible spill area through keyboard layers, ribbon cables, ports, seams and shielding, so the affected area may be larger than the stain suggests.',
        'Corrosion and residue-related faults can develop or become noticeable later. A laptop that boots after a spill is not necessarily safe to keep using.'
      ],
      doNotDo: 'Do not turn the laptop back on, connect the charger, or press keys to test it after a spill. Do not put it in rice, use a hairdryer or heater, spray household cleaner into the keyboard, or pour alcohol into the device. These actions do not remove contamination from beneath chips and connectors and can make inspection or repair harder. Do not open a sealed laptop or attempt to disconnect an internal battery unless you are trained and following the correct service procedure.',
      solution: 'KCROC first records the spill details and isolates the power sources safely. The laptop is then inspected and, where appropriate, disassembled so the affected board, connectors and keyboard path can be assessed. Contamination is cleaned using a method suited to the board and components; ultrasonic cleaning is used only where the bare-board condition and preparation make it appropriate. Any damaged connector, trace, fuse, MOSFET or power-management component is tested and repaired at component level when technically viable. The original board is retained where practical, followed by checks of the functions affected by the spill. Repairability and data access depend on the exact device and damage; neither is guaranteed before inspection.',
      urgency: 'critical',
      emergencySteps: [
        {
          title: 'Turn the laptop off immediately',
          description: 'If it is still running and there is no heat, smoke, swelling or other battery warning, press and hold the power button until it switches off. Do not wait for a normal Windows or macOS shutdown.'
        },
        {
          title: 'Disconnect the charger and accessories — only if safe',
          description: 'Unplug the charger and attached USB devices only when your hands, the floor and the power outlet are dry and safe to touch. Do not reach through liquid or touch a wet outlet, exposed wire or sparking adapter.'
        },
        {
          title: 'Remove only an externally removable battery',
          description: 'If the laptop has a user-removable battery and the device is cool and safe to handle, remove it according to the manufacturer instructions. Do not open the chassis to reach an internal battery; leave that isolation to a trained technician.'
        },
        {
          title: 'Blot and let visible liquid drain',
          description: 'Blot the outside with an absorbent lint-free cloth. If the laptop is cool and safe to handle, gently angle it so liquid can drain onto a towel; do not shake it, force the hinge or press the keyboard.'
        },
        {
          title: 'Keep it off and arrange an inspection',
          description: 'Do not reconnect power to see whether it works, even after the outside looks dry. Tell the repairer what liquid was spilled, approximately how much, where it entered and whether the laptop was powered on.'
        }
      ],
      emergencyCaution: 'If the laptop is unusually hot, swollen, smoking, hissing, sparking or giving off a strong burning or chemical smell, do not handle, open, charge or carry it. Keep clear and isolate mains power only from a safe location if that can be done without touching the device or wet equipment.',
      diagnosticSteps: [
        {
          step: 1,
          title: 'Keep it switched off',
          description: 'Confirm that the laptop is off and the charger is disconnected. Do not press the power button again or reconnect a USB-C charger to check for a charging light.'
        },
        {
          step: 2,
          title: 'Identify the liquid',
          description: 'Note whether it was plain water, black coffee or tea, sweetened coffee/karak, milk or latte, juice, soda or another drink. Ingredients such as sugar and milk affect the residue left behind.'
        },
        {
          step: 3,
          title: 'Record where it entered',
          description: 'Without pressing keys or opening the case, note whether the spill was over the keyboard, touchpad, hinge, air vent, side port or charging connector. The visible entry point may not show the full internal path.'
        },
        {
          step: 4,
          title: 'Write down what happened',
          description: 'Record the approximate time and amount, whether the laptop was plugged in, and any symptoms already noticed — for example, an immediate shutdown, black screen, fan activity, sticky keys or charging changes. Do not reproduce the symptom.'
        },
        {
          step: 5,
          title: 'Find the exact model information',
          description: 'Use the product label, purchase record or model shown on the underside only if it can be read without turning on or dismantling the laptop. Share the make and model with the technician; do not send account passwords or recovery keys.'
        }
      ],
      decisionTree: [
        {
          symptom: 'The laptop is still on after the spill',
          direction: 'Shut it down immediately if it is safe to touch, disconnect external power safely and do not continue working. A successful boot does not establish that the inside is dry or uncontaminated.'
        },
        {
          symptom: 'It switched off or now shows a black screen',
          direction: 'Keep it off and unplugged. Do not repeatedly try to start it; a technician should inspect the power, display and motherboard circuits before any further power is applied.'
        },
        {
          symptom: 'Keys, touchpad or charging behave strangely',
          direction: 'Do not test every key or repeatedly reconnect the charger. Liquid may have reached the keyboard membrane, ribbon connectors or charging path; note the symptoms for inspection.'
        },
        {
          symptom: 'The case or battery area is hot, swollen or smoking',
          direction: 'Treat this as a battery-safety issue. Do not handle or open the laptop. Keep clear and seek appropriate emergency assistance if there is smoke or fire.'
        }
      ],
      technicianMethod: [
        {
          step: 1,
          title: 'Intake, model identification and safety check',
          description: 'Record the liquid type, entry area, power state and symptoms. Identify the exact laptop model and board revision before choosing a teardown or diagnostic procedure.'
        },
        {
          step: 2,
          title: 'Power isolation and controlled teardown',
          description: 'Disconnect external power and isolate the internal battery using the model-specific service procedure. Inspect the keyboard, connectors, shields and motherboard for liquid paths and residue before energizing the board.'
        },
        {
          step: 3,
          title: 'Corrosion assessment, cleaning and board repair',
          description: 'Document the affected areas under magnification, inspect relevant power and signal paths, and clean contamination with a method appropriate to the components. Where board condition permits, targeted ultrasonic cleaning may be used on a properly prepared bare board. Shorted or corroded components and traces are addressed individually where repair is viable.'
        },
        {
          step: 4,
          title: 'Functional verification before return',
          description: 'After the repair and reassembly, verify the affected power, charging, display, keyboard, touchpad and other relevant functions. The test plan depends on the original symptoms and the model; unresolved faults are explained before return.'
        }
      ],
      safetyNotes: [
        'Do not assume a laptop is safe because the screen is still on or because it starts once after the spill. Stop using it and keep it disconnected.',
        'Do not remove an internal battery, shields or motherboard as a first-time DIY task. Internal batteries can be hazardous if damaged, and model-specific disassembly is required.',
        'If there is swelling, unusual heat, smoke, hissing or sparks, do not handle or transport the device. Personal safety comes before data or repair.'
      ],
      kuwaitContext: [
        'KCROC receives liquid-damage devices at its Hawalli laboratory: Al Mullah Complex, Ibn Khaldoun Street, Basement Shop 19. Other Kuwait areas are served through courier pickup and delivery, not separate walk-in branches.',
        'Free pickup and delivery are available across Kuwait. Contact KCROC to confirm the next safe collection slot for your area; keep the laptop powered off while collection is arranged.',
        'A liquid-damage repair may need board-level inspection and parts testing, so turnaround depends on the extent of contamination, the exact model and component availability. No same-day repair is promised before diagnosis.'
      ],
      expertNotes: [
        {
          title: 'Why a laptop can work after a spill — then fail later',
          description: 'A laptop may continue running if the first spill did not immediately bridge a critical circuit. Moisture and dissolved residue can remain beneath the keyboard, connectors or shields; while electrical power is present, that contamination can contribute to leakage paths, corrosion and intermittent faults. There is no reliable universal 48- or 72-hour countdown. Switch it off, disconnect external power safely and do not use a temporary successful boot as a reason to keep testing.'
        },
        {
          title: 'MacBook logic-board diagnosis is generation-specific',
          description: 'MacBook Air and Pro boards differ across Intel and Apple Silicon generations. Depending on the exact board, a technician may investigate main power rails such as PPBUS_G3H and USB-C power-delivery or charging-controller circuitry; CD3217 is an example only on board revisions where that controller is fitted. These labels are diagnostic examples, not a parts list that applies to every MacBook.'
        },
        {
          title: 'Soldered storage and data access need an honest assessment',
          description: 'Some MacBook and other laptop designs use soldered storage or model-specific hardware encryption. A component-level repair of the original board may preserve the existing storage path when the relevant components remain healthy, but liquid can also damage storage, the processor or security circuitry. No technician should promise 100% data preservation before inspecting the exact device.'
        },
        {
          title: 'Gaming-laptop power stages vary by model',
          description: 'Many gaming laptops use an adapter input around 19–20V, but the downstream CPU and GPU power rails, protection circuits and VRM layouts vary by board. Liquid near the DC-in path, battery connector or high-current stages requires measurements against the correct board design; an adapter voltage alone does not identify the failed component.'
        },
        {
          title: 'Component repair versus full-board replacement',
          description: 'When damage is localized to a repairable component, trace or connector, component-level work may avoid replacing the complete motherboard and can keep the original board in place. Extensive corrosion, damaged multilayer traces, processor or storage damage may make that uneconomical or impossible. A replacement board can also change data access depending on the storage and encryption design. Compare the written diagnosis, quoted parts and labour, data implications and warranty; there is no reliable universal percentage saving.'
        },
        {
          title: 'What determines the repair quote',
          description: 'The quote depends on the liquid and amount, how far it travelled, the affected keyboard or board areas, the number and type of damaged components, parts availability and the required post-repair testing. KCROC provides the assessment and quote before paid repair work begins.'
        }
      ],
      technicalReferences: [
        {
          label: 'Dell Support — What to do after a laptop liquid spill',
          url: 'https://www.dell.com/support/kbdoc/en-pa/000137973/safety-precautions-when-working-with-electrical-equipment',
          description: 'Manufacturer safety guidance: power off the laptop, unplug the AC adapter, disconnect a removable battery only where possible and safe, and do not attempt to power the device on after a spill. Follow the service instructions for the exact model.'
        },
        {
          label: 'iFixit — Laptop is Liquid Damaged',
          url: 'https://www.ifixit.com/Wiki/Laptop_is_Liquid_Damaged',
          description: 'Repair reference covering power isolation, liquid residue and why drying alone or rice does not remove contamination. Internal teardown and board cleaning are technician-level procedures, not a first-time DIY recommendation.'
        }
      ],
      liquidRiskMatrix: [
        {
          liquid: 'Plain / drinking water',
          residue: 'Usually less sticky residue than sweet drinks, but tap-water minerals and other dissolved contaminants may remain.',
          risk: 'Water can bridge powered contacts, and residue may remain around connectors, keyboard layers or beneath shields after the surface looks dry.',
          action: 'Keep the laptop off and arrange an inspection. Do not assume that visible drying means the inside is clean.'
        },
        {
          liquid: 'Black coffee / unsweetened tea',
          residue: 'Dissolved coffee or tea compounds can leave deposits; acidity and additives vary with the drink.',
          risk: 'Residue can affect keyboard membranes, connector contacts and board areas the liquid reaches.',
          action: 'Do not power-test it. Tell the technician whether the drink contained sugar, milk or flavouring.'
        },
        {
          liquid: 'Sweet coffee, karak or sweet tea',
          residue: 'Sugar, milk and flavouring can leave sticky films and solids as the liquid dries.',
          risk: 'Sticky deposits may remain beneath keys and around small components, even when the keyboard surface appears dry.',
          action: 'Keep it disconnected and request prompt inspection and cleaning assessment.'
        },
        {
          liquid: 'Soda, juice or energy drinks',
          residue: 'These drinks can contain sugar, acids, salts, dyes and other dissolved ingredients.',
          risk: 'The combination can leave conductive or corrosive residue and may affect multiple internal areas.',
          action: 'Do not wait for the laptop to fail or try to rinse it yourself. Keep it off and arrange professional inspection.'
        },
        {
          liquid: 'Milk or latte',
          residue: 'Milk proteins and fats, often combined with sugar or coffee solids, can leave a persistent film.',
          risk: 'Residue may affect the keyboard, connectors and board surfaces along the liquid path.',
          action: 'Keep the laptop off and tell the technician the drink ingredients as accurately as possible.'
        }
      ],
      faqs: [
        {
          question: 'What should I do immediately after spilling water or coffee on my laptop?',
          answer: 'Turn it off immediately if it is safe to touch, disconnect the charger and accessories safely, remove only an externally removable battery, blot visible liquid and keep the laptop off. Do not charge or test it. If it is hot, swollen, smoking or sparking, do not handle it.'
        },
        {
          question: 'My laptop still turns on after the spill. Can I keep using it?',
          answer: 'No. A successful start does not prove that moisture or residue is gone. Switch it off, disconnect external power safely and arrange an inspection before using or charging it again.'
        },
        {
          question: 'Is coffee or karak tea worse than plain water?',
          answer: 'The risk depends on the amount and where the liquid travelled. Coffee, sweet tea, karak, milk, juice and soda can leave sticky or chemically active residue that plain water may not. None should be treated as safe to power-test.'
        },
        {
          question: 'Will rice or a hairdryer dry a liquid-damaged laptop?',
          answer: 'Rice does not remove dissolved salts, sugars or corrosion from connectors and circuit boards. A hairdryer or heater can expose parts to damaging heat or push liquid further into the device. Keep it off and seek an inspection instead.'
        },
        {
          question: 'Can KCROC repair a liquid-damaged MacBook?',
          answer: 'KCROC can inspect MacBook logic boards and affected USB-C, power and display circuits where the exact model supports component-level repair. Board layouts differ by generation, and repairability is confirmed only after inspection.'
        },
        {
          question: 'Will I lose my files if the motherboard was affected?',
          answer: 'Not necessarily, but data access cannot be guaranteed. It depends on the storage design and whether the storage, processor, security circuitry and original board remain functional. Tell KCROC when data preservation is important before authorizing a board replacement.'
        },
        {
          question: 'Does liquid damage always require a new motherboard?',
          answer: 'No. Some faults are limited to repairable connectors, traces, fuses or components; other boards have widespread or uneconomical damage. The technician must inspect and test the affected board before recommending repair or replacement.'
        },
        {
          question: 'How much does liquid-damage repair cost in Kuwait?',
          answer: 'The final quote depends on the amount and type of liquid, the areas affected, damaged components and any required replacement parts. KCROC provides a diagnostic assessment and explains the quote before paid repair work begins. See the liquid-damage service page for current service details.'
        },
        {
          question: 'Can I arrange pickup from Salmiya, Kuwait City or another area?',
          answer: 'KCROC offers free pickup and delivery across Kuwait. Contact the team to confirm the next collection slot for your area. The Hawalli laboratory is the repair location; service areas are not separate walk-in branches.'
        }
      ],
      relatedServiceIds: ['srv-liquid-damage', 'srv-motherboard', 'srv-macbook', 'srv-keyboard'],
      relatedBrandIds: ['brand-dell', 'brand-hp', 'brand-lenovo', 'brand-asus', 'brand-acer', 'brand-msi'],
      coveredBrands: ['Dell', 'HP', 'Lenovo', 'ASUS', 'Acer', 'MSI', 'Apple MacBook'],
      relatedResourcePaths: [
        { label: 'Laptop Liquid Damage Repair Kuwait', path: '/laptop-liquid-damage-repair-kuwait' },
        { label: 'Component-Level Motherboard Repair', path: '/motherboard-repair-kuwait' },
        { label: 'MacBook Repair Kuwait', path: '/macbook-repair-kuwait' },
        { label: 'Laptop Keyboard Replacement', path: '/laptop-keyboard-replacement-kuwait' },
        { label: 'Laptop Not Charging', path: '/laptop-plugged-in-not-charging' }
      ],
      contentImages: [
        {
          src: IMAGES.laptopHardware.laptopMotherboardDiagnosticBenchRepair.src,
          alt: IMAGES.laptopHardware.laptopMotherboardDiagnosticBenchRepair.alt,
          width: IMAGES.laptopHardware.laptopMotherboardDiagnosticBenchRepair.width,
          height: IMAGES.laptopHardware.laptopMotherboardDiagnosticBenchRepair.height,
          placement: 'causes',
          caption: 'A laptop motherboard on the diagnostic bench. This illustrates board-level inspection; it is not presented as a photograph of liquid corrosion.'
        },
        {
          src: IMAGES.laptopHardware.laptopBatteryMotherboardOpenRepair.src,
          alt: IMAGES.laptopHardware.laptopBatteryMotherboardOpenRepair.alt,
          width: IMAGES.laptopHardware.laptopBatteryMotherboardOpenRepair.width,
          height: IMAGES.laptopHardware.laptopBatteryMotherboardOpenRepair.height,
          placement: 'solution',
          caption: 'Laptop internals opened for motherboard access and inspection. Cleaning and component work are selected only after the actual board is assessed.'
        }
      ],
      seo: {
        title: 'Spilled Water or Coffee on Laptop in Kuwait? | KCROC',
        description: 'Spilled water, coffee, karak or soda on your laptop? Learn safe power-off steps, liquid risks and component-level liquid-damage repair in Kuwait.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/spilled-water-on-laptop',
        ogType: 'article',
        schemaTypes: ['Article', 'FAQPage', 'HowTo'],
        lastModified: '2026-11-04T00:00:00+03:00'
      },
      navigationPriority: 70,
      popular: false
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
      seo: {
        title: 'Laptop Plugged In But Not Charging | Diagnosis Kuwait | KCROC',
        description: 'Laptop says plugged in but not charging? Check charger compatibility, battery, DC jack, USB-C and charging-circuit symptoms before replacing parts. Kuwait-wide pickup.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/laptop-plugged-in-not-charging',
        locale: 'en_KW',
        alternates: {
          'en-KW': 'https://www.computerrepairkuwait.com/laptop-plugged-in-not-charging',
          'ar-KW': 'https://www.computerrepairkuwait.com/ar/laptop-plugged-in-not-charging',
          'x-default': 'https://www.computerrepairkuwait.com/laptop-plugged-in-not-charging'
        },
        ogType: 'article',
        schemaTypes: ['TechArticle', 'FAQPage'],
        lastModified: '2026-10-26T00:00:00+03:00'
      },
      navigationPriority: 60, popular: false
    } as ProblemEntity,

    'problem-keyboard-fail': {
      id: 'problem-keyboard-fail', slug: 'laptop-keyboard-not-working', entityType: 'Problem', isActive: true,
      title: 'Laptop Keyboard Not Working', primaryKeyword: "laptop keyboard not working", secondaryKeywords: ["laptop keyboard replacement Kuwait","some laptop keys not working","laptop keyboard liquid damage"],
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
      intro: "When some keys stop working, or the whole keyboard goes dead, the cause is usually a liquid spill, a damaged ribbon cable, a worn keyboard assembly or something pushing up from underneath, such as a swollen battery. The pattern of dead keys often tells us where to look first, so note which keys fail before you contact us.",
      diagnosticSteps: [
        { step: 1, title: "Test with an external keyboard", description: "Plug in a USB keyboard. If it works normally, the laptop's own keyboard or its connection is at fault. If it also misbehaves, the problem is more likely software or the board." },
        { step: 2, title: "See whether the keys work outside Windows", description: "Restart and press the key to open the BIOS or boot menu. If the keys respond there but not in Windows, a driver or software setting is the cause." },
        { step: 3, title: "Look at the pattern", description: "A diagonal line of dead keys or a block of keys often points to a damaged track. A completely dead keyboard often points to the ribbon cable or its connector." },
        { step: 4, title: "Check for a swollen battery", description: "If the trackpad is lifting, the case does not sit flat or the keyboard bulges, stop using the laptop. A swollen battery can push up against the keyboard." },
        { step: 5, title: "Remember any spills", description: "Even a small spill weeks ago can corrode the tracks under the keyboard. Tell us about it, as it changes what we check." },
      ],
      decisionTree: [
        { symptom: "External keyboard works, built-in keys do not", direction: "The built-in keyboard or its ribbon cable has failed and usually needs replacing." },
        { symptom: "Keys fail only in Windows", direction: "Check drivers and settings first. Hardware is less likely." },
        { symptom: "Keys type repeatedly or by themselves", direction: "Liquid residue or a damaged membrane is likely. Stop using the keyboard." },
        { symptom: "Keyboard bulges or the trackpad lifts", direction: "Possible swollen battery. Stop using and charging it, and contact us." },
      ],
      technicianMethod: [
        { step: 1, title: "Test and inspect", description: "We confirm the fault with an external keyboard and then open the laptop to look for liquid residue, corrosion, a loose ribbon cable and battery swelling." },
        { step: 2, title: "Reseat or replace the cable", description: "If the ribbon cable or connector is the problem, we reseat or replace it before replacing the keyboard." },
        { step: 3, title: "Replace the keyboard assembly", description: "If the keyboard itself has failed, we fit a replacement matched to your model." },
        { step: 4, title: "Make the laptop safe", description: "If the battery is swollen, we remove it safely and replace it, because it could damage the new keyboard as well." },
        { step: 5, title: "Test every key", description: "We test each key before returning the laptop. The repair carries a 30-day warranty." },
      ],
      safetyNotes: ["Do not pry keys off with a knife or screwdriver. The hinges are fragile, especially on MacBooks, and snapped hinges can turn a small fault into a full keyboard replacement.", "Do not use or charge a laptop with a bulging battery or a lifting trackpad.", "Do not clean under the keys with liquids, because it can spread residue to the board."],
      faqs: [
        { question: "Can a single dead key be repaired?", answer: "Sometimes a stuck or dirty key can be freed, but on most laptops a failed key means replacing the keyboard assembly. We check the cause first and explain the option before you approve any work." },
        { question: "Is a MacBook keyboard replacement more involved?", answer: "On many MacBooks the keyboard is part of the top case, which makes the replacement larger than on a typical Windows laptop. We confirm the scope and the quote after identifying your exact model." },
        { question: "Can I use an external keyboard while I wait?", answer: "Yes. A USB or Bluetooth keyboard works as a stop-gap, but do not keep using a laptop whose battery looks swollen." },
        { question: "Could the spill have damaged more than the keyboard?", answer: "It can. Liquid can reach the board and corrode it over time, so we inspect underneath before we quote. Mention any spill, even an old one." },
      ],
      seo: { title: 'Laptop Keyboard Not Working — Repair in Kuwait | KCROC', description: 'Laptop keyboard dead or typing by itself? We replace keyboards for Dell, HP, Lenovo, and MacBooks. Fast service with free pick & drop in Kuwait.', canonicalUrl: 'https://www.computerrepairkuwait.com/laptop-keyboard-not-working', ogType: 'article', schemaTypes: ['Article', 'FAQPage'] },
      navigationPriority: 50, popular: false
    } as ProblemEntity,

    'problem-wifi-fail': {
      id: 'problem-wifi-fail', slug: 'laptop-wifi-not-connecting', entityType: 'Problem', isActive: true,
      title: 'Laptop WiFi Not Connecting or Missing', primaryKeyword: "laptop WiFi not connecting", secondaryKeywords: ["laptop WiFi missing Windows","laptop WiFi keeps disconnecting","laptop wireless card repair Kuwait"],
      description: 'Diagnosis for laptops that cannot find WiFi networks, frequently drop connection, or are missing the WiFi icon entirely.',
      symptom: 'The WiFi icon disappears from Windows, the laptop cannot find any networks despite phones connecting fine, or the connection drops repeatedly during gaming or streaming.',
      causes: ['Failed internal WiFi card (common with older Realtek or MediaTek cards in Kuwait heat)', 'Loose antenna cables connecting the card to the screen', 'Corrupted Windows networking drivers', 'Motherboard PCIe slot failure'],
      doNotDo: 'Do not attempt a "Network Reset" if the WiFi card is physically missing from the Device Manager — this will not fix a dead hardware component and wastes time.',
      solution: 'We diagnose the M.2/PCIe WiFi card. Usually, upgrading a failed budget card to a high-quality Intel AX (Wi-Fi 6) card permanently resolves dropouts and significantly boosts speeds.',
      urgency: 'low',
      relatedServiceIds: ['srv-laptop', 'srv-gaming'],
      relatedResourcePaths: [
        { path: '/pricing#pricing-diagnostics', label: 'Windows OS Restoration — published range 10–15 KWD' },
        { path: '/guides/windows-troubleshooting-complete-guide', label: 'Windows troubleshooting guide' }
      ],
      contentImages: [
        { src: IMAGES.laptopHardware.wifiLaptop1.src, alt: IMAGES.laptopHardware.wifiLaptop1.alt, width: IMAGES.laptopHardware.wifiLaptop1.width, height: IMAGES.laptopHardware.wifiLaptop1.height, placement: 'causes', caption: 'Checking the internal Wi-Fi card and antenna connections when the network icon disappears.' },
        { src: IMAGES.laptopHardware.wifiIntel2.src, alt: IMAGES.laptopHardware.wifiIntel2.alt, width: IMAGES.laptopHardware.wifiIntel2.width, height: IMAGES.laptopHardware.wifiIntel2.height, placement: 'solution', caption: 'Installing a high-quality Intel Wi-Fi 6 card to permanently resolve dropouts from a failed budget card.' },
      ],
      intro: "Wi-Fi faults fall into four groups: settings and drivers, a loose or failed wireless card, a disconnected antenna cable, and, rarely, a fault on the motherboard. Finding out which group you are in matters, because resetting Windows will not repair a card that is physically failing, and replacing the card will not help if the real cause is a driver or a loose cable.",
      diagnosticSteps: [
        { step: 1, title: "Check whether other devices connect", description: "If your phone connects to the same network but the laptop does not, the router is fine. Also try a phone hotspot. If the laptop fails on every network, the fault is in the laptop." },
        { step: 2, title: "Check the simple switches", description: "Make sure Airplane mode is off, try the Wi-Fi key on the keyboard (often combined with an Fn key) and restart the laptop. A hardware switch or key can turn the adapter off." },
        { step: 3, title: "Look in Device Manager", description: "Open Device Manager and expand Network adapters. If a wireless adapter is listed, the card is detected and the problem may be a driver. If no wireless adapter appears at all, the laptop is not detecting the card." },
        { step: 4, title: "Reinstall the driver from the maker", description: "If the adapter shows a warning icon, uninstall it and install the latest driver from the laptop manufacturer's support page. Use a cable or another device to download it if needed." },
        { step: 5, title: "Notice how the signal behaves", description: "A laptop that only connects when it is next to the router often has an antenna cable that has come loose inside. Drops during gaming or streaming can point to a failing card." },
      ],
      decisionTree: [
        { symptom: "Wi-Fi icon missing and no wireless adapter in Device Manager", direction: "The card is not being detected. It may be loose, failed or have a slot problem, and needs bench inspection." },
        { symptom: "Adapter listed with a warning icon", direction: "Usually a driver problem. Reinstalling the driver often fixes it; if not, the card may be failing." },
        { symptom: "Connects only very close to the router", direction: "An antenna cable has probably come loose or been damaged. It is a small repair but needs the laptop opened." },
        { symptom: "Drops out repeatedly during games or video calls", direction: "Test the card and its power-saving settings. A budget card that has degraded is replaced with a better one." },
      ],
      technicianMethod: [
        { step: 1, title: "Open and inspect", description: "We open the laptop, check that the wireless card is seated properly and that both antenna leads are attached to the right connectors." },
        { step: 2, title: "Separate card from slot", description: "We test with a known-good card where needed, so we can tell a failed card apart from a faulty slot on the board." },
        { step: 3, title: "Replace only what failed", description: "If the card has failed, we fit a compatible Intel Wi-Fi 6 card for your model. If it was a loose cable or a driver, we fix that instead." },
        { step: 4, title: "Test before return", description: "We check connection stability and speed over time before returning the laptop, and the repair is covered by our 30-day warranty." },
      ],
      safetyNotes: ["Switch the laptop off and unplug the charger before it is opened. Antenna cables are thin and easily damaged, so they should not be pulled.", "A Wi-Fi card replacement does not touch your storage drive, so your files are not part of the repair."],
      faqs: [
        { question: "Can my Wi-Fi be fixed without replacing the card?", answer: "Often yes. A driver reinstall or a reconnected antenna cable fixes many cases. We only replace the card when testing shows that it has failed." },
        { question: "Will a Wi-Fi 6 card work in my laptop?", answer: "It depends on the model and the type of slot it has. We check compatibility before replacing anything, and tell you which card we recommend." },
        { question: "My laptop works on a network cable but not on Wi-Fi. What does that mean?", answer: "The rest of the laptop is working and the fault is in the wireless path: the driver, the card or the antenna cables. A cable connection can keep you online while the repair is arranged." },
        { question: "Is it worth upgrading the card on an older laptop?", answer: "Frequently. A card swap is one of the cheaper repairs, and a newer card can give a more stable connection. We tell you the price after diagnosis, and No Fix, No Fee applies." },
      ],
      seo: { title: 'Laptop WiFi Not Connecting — Fix & Upgrade Kuwait | KCROC', description: 'WiFi icon missing or connection dropping on your laptop? We diagnose driver issues and upgrade failed WiFi cards to fast Wi-Fi 6. Free pick & drop.', canonicalUrl: 'https://www.computerrepairkuwait.com/laptop-wifi-not-connecting', ogType: 'article', schemaTypes: ['Article', 'FAQPage'] },
      navigationPriority: 40, popular: false
    } as ProblemEntity,

    'problem-slow': {
      id: 'problem-slow', slug: 'laptop-running-very-slow', entityType: 'Problem', isActive: true,
      title: 'Laptop Running Extremely Slow', primaryKeyword: "slow laptop repair Kuwait", secondaryKeywords: ["laptop running slow fix","computer slow after startup","SSD upgrade for slow laptop"],
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
      intro: "A laptop that takes minutes to start or freezes while you work is almost always held back by one of four things: an old hard drive, a nearly full drive, too little memory, or heat that forces the processor to slow itself down. Malware and heavy start-up programs can add to it. A short test of each tells us whether a clean-up, an SSD or something else will make the difference.",
      diagnosticSteps: [
        { step: 1, title: "Look at Task Manager", description: "Press Ctrl + Shift + Esc and watch the Performance tab. A disk sitting at or near 100 percent usage while you are doing little points to the drive. High memory usage points to too little RAM." },
        { step: 2, title: "Check free storage", description: "If the drive is almost full, Windows has little room to work. Free up space or move files off the laptop and see if it improves." },
        { step: 3, title: "Listen for the drive", description: "Clicking, grinding or long pauses from a mechanical hard drive can mean it is failing. Back up your files and stop heavy use." },
        { step: 4, title: "Check temperature and fans", description: "If the laptop is very hot, the fan is loud or it slows down after a few minutes, thermal throttling may be the cause." },
        { step: 5, title: "Review start-up programs and scan for malware", description: "Too many start-up programs slow down every boot, and unwanted software can use resources in the background." },
      ],
      decisionTree: [
        { symptom: "Slow to start, disk at 100 percent, still using a hard drive", direction: "An SSD upgrade is the most effective fix." },
        { symptom: "Slows down after a few minutes and runs hot", direction: "Cooling clean-up and fresh thermal paste, not storage." },
        { symptom: "Memory usage always high", direction: "More RAM, if the model allows it." },
        { symptom: "Clicking or grinding from the drive", direction: "Back up now. The drive may be failing and should be replaced." },
      ],
      technicianMethod: [
        { step: 1, title: "Test the drive", description: "We check the drive's health and read speed to find out whether it is failing or just slow." },
        { step: 2, title: "Check temperatures and cooling", description: "We look at temperatures under load and check the fan and vents for dust and the thermal paste for age." },
        { step: 3, title: "Upgrade or clean as needed", description: "Where it fits, we move your Windows installation and files to an SSD, add memory or clean the cooling, rather than recommending everything." },
        { step: 4, title: "Measure the result", description: "We compare start-up time and responsiveness after the work, and the repair carries a 30-day warranty." },
      ],
      safetyNotes: ["Back up your files before any storage work if you can. If the drive is failing, tell us so we handle it carefully.", "Do not keep forcing a laptop off during updates or repeatedly power-cycling it, as that can corrupt the system files."],
      faqs: [
        { question: "How much faster will an SSD make my laptop?", answer: "The difference is usually large on a laptop that has a mechanical hard drive. Start-up and application loading are noticeably quicker. We tell you whether an SSD is the right fix after we test the drive." },
        { question: "Will I lose my files and programs when you upgrade the drive?", answer: "In most cases we move your existing Windows installation and files onto the new SSD. It is still sensible to keep a backup of anything important." },
        { question: "Can you add more RAM to my laptop?", answer: "It depends on the model. Some have slots, others have memory soldered to the board. We check what your laptop supports before suggesting an upgrade." },
        { question: "My laptop is slow only when gaming or running heavy software. Is that the same problem?", answer: "Not necessarily. Heat is a common cause there. We check the temperatures and the cooling system before suggesting an upgrade." },
      ],
      seo: { title: 'Laptop Running Extremely Slow? SSD Upgrades Kuwait | KCROC', description: 'Laptop freezing or taking forever to turn on? An SSD upgrade and RAM boost will make it 10x faster. We migrate your data safely. Free diagnostic.', canonicalUrl: 'https://www.computerrepairkuwait.com/laptop-running-very-slow', ogType: 'article', schemaTypes: ['Article', 'FAQPage'] },
      navigationPriority: 30, popular: false
    } as ProblemEntity,

    'problem-hinge-break': {
      id: 'problem-hinge-break', slug: 'laptop-hinge-broken', entityType: 'Problem', isActive: true,
      title: 'Laptop Hinge Broken or Splitting', primaryKeyword: "broken laptop hinge repair Kuwait", secondaryKeywords: ["laptop hinge snapped","laptop hinge and chassis repair","laptop screen hinge damage"],
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
      intro: "A hinge that is loose, noisy or cracked puts strain on the screen and its cable. The sooner it is repaired, the less likely the damage is to spread to the display or the plastic around it. The key question is whether the hinge itself is worn or broken, or whether the plastic that holds it has cracked.",
      diagnosticSteps: [
        { step: 1, title: "Open and close the lid slowly", description: "Notice whether the screen wobbles, pops, drops back on its own or feels stiff on one side." },
        { step: 2, title: "Look for gaps and cracks", description: "A gap between the screen frame and the laptop body, or a crack near the hinge, suggests the housing around it has broken." },
        { step: 3, title: "Check for a lifted bezel", description: "If the plastic frame around the screen has separated at the corners, the hinge may be pulling against it." },
        { step: 4, title: "Stop opening the lid fully", description: "If a hinge is cracked, forcing the lid open or closed can damage the display cable that passes through it." },
        { step: 5, title: "Note the laptop model", description: "Hinges and covers differ by model, so the exact model number helps us check the right part." },
      ],
      decisionTree: [
        { symptom: "Screen wobbles but nothing is cracked", direction: "Hinge brackets or screws may be loose or worn and need replacing." },
        { symptom: "Crack or gap near the hinge", direction: "The plastic around it has probably broken and needs repair or replacement of the cover." },
        { symptom: "Display flickers when the lid moves", direction: "The display cable may have been stretched or damaged and needs checking." },
        { symptom: "One side of the lid is stiff", direction: "One hinge may have seized, which puts pressure on the other." },
      ],
      technicianMethod: [
        { step: 1, title: "Open and inspect", description: "We open the laptop and check the hinge brackets, the screws and the plastic mounting points." },
        { step: 2, title: "Repair or replace", description: "We replace worn hinges and repair or replace the cover or mounting where it is cracked, with parts matched to your model." },
        { step: 3, title: "Check the display cable", description: "We check that the cable running through the hinge has not been stretched or damaged." },
        { step: 4, title: "Test the movement", description: "We open and close the lid repeatedly and check that the display is stable, and the repair carries a 30-day warranty." },
      ],
      safetyNotes: ["Do not force the lid open or closed. A broken hinge can pinch or tear the display cable.", "Avoid gluing a broken hinge or housing, as glue makes a proper repair harder and can get into the parts."],
      faqs: [
        { question: "Can a broken hinge damage my screen?", answer: "Yes. The display cable passes through the hinge area, and a hinge that moves unevenly can stretch it or crack the panel. Early repair usually costs less." },
        { question: "What if the plastic around the hinge has cracked?", answer: "Then the hinge alone will not hold. The cover or mounting needs repairing or replacing, depending on the model. We confirm what is needed after inspecting it." },
        { question: "Do you need my laptop model to quote?", answer: "The exact model number, usually on the underside, helps us check parts first. The final quote is confirmed after inspection and before any paid work." },
        { question: "Can I keep using the laptop until it is repaired?", answer: "It is better not to, because every open and close adds stress. If you must use it, open the lid gently with both hands and avoid carrying it by the screen." },
      ],
      seo: { title: 'Broken Laptop Hinge Repair Kuwait — Fast Fix | KCROC', description: 'Laptop screen hinge broken or popping open? Stop using it before the screen cracks! We repair chassis and hinges for HP, Dell, Lenovo, and MSI.', canonicalUrl: 'https://www.computerrepairkuwait.com/laptop-hinge-broken', ogType: 'article', schemaTypes: ['Article', 'FAQPage'] },
      navigationPriority: 20, popular: false
    } as ProblemEntity,

    'problem-cracked-screen': {
      id: 'problem-cracked-screen', slug: 'laptop-screen-cracked-kuwait', entityType: 'Problem', isActive: true,
      title: 'Laptop Screen Cracked or Shattered', primaryKeyword: "cracked laptop screen repair Kuwait", secondaryKeywords: ["laptop screen replacement Kuwait","laptop display lines repair","laptop screen black after drop"],
      description: 'Diagnostic guide for laptops with a cracked, shattered, or spider-webbed display after a drop or impact.',
      symptom: 'The screen shows spiderweb cracks, dark ink-like bleeding, discoloured patches, or areas with no picture at all after a drop, knock, or something pressing on the closed lid. An external monitor usually displays a perfect picture.',
      causes: ['Dropping the laptop or closing it on an object left on the keyboard', 'Impact or pressure on the closed lid while packed in a bag', 'Pre-existing hinge damage allowing the lid to close unevenly onto the bezel'],
      doNotDo: 'Do not keep using the laptop with a cracked panel — flexing or pressing on a shattered screen can push liquid crystal further into the bezel and, on some models, damage the display cable connector underneath.',
      solution: 'We check whether the fault is limited to the display panel by testing an external monitor when appropriate. We verify the laptop model, panel specifications, hinge condition and display cable, then explain compatible repair or replacement options, part availability and the total quote before work.',
      urgency: 'high',
      relatedServiceIds: ['srv-screen', 'srv-laptop'],
      contentImages: [
        { src: IMAGES.laptopHardware.dellLaptopCorruptedScreenGpuFailure.src, alt: IMAGES.laptopHardware.dellLaptopCorruptedScreenGpuFailure.alt, width: IMAGES.laptopHardware.dellLaptopCorruptedScreenGpuFailure.width, height: IMAGES.laptopHardware.dellLaptopCorruptedScreenGpuFailure.height, placement: 'causes', caption: 'A cracked panel showing display bleed — we confirm on an external monitor that the board itself is unaffected.' },
        { src: IMAGES.laptopHardware.laptopLcdPanelReplacementPart.src, alt: IMAGES.laptopHardware.laptopLcdPanelReplacementPart.alt, width: IMAGES.laptopHardware.laptopLcdPanelReplacementPart.width, height: IMAGES.laptopHardware.laptopLcdPanelReplacementPart.height, placement: 'solution', caption: 'A replacement panel example; the compatible specification and availability are checked against the exact laptop model before quoting.' },
      ],
      seo: { title: 'Cracked Laptop Screen in Kuwait? Diagnosis & Repair | KCROC', description: 'Cracked or shattered laptop screen after a drop? Learn what to avoid and how we check the panel, cable and hinge before confirming model-compatible repair options. Free pickup in Kuwait.', canonicalUrl: 'https://www.computerrepairkuwait.com/laptop-screen-cracked-kuwait', ogType: 'article', schemaTypes: ['Article', 'FAQPage'], lastModified: '2026-11-03T00:00:00+03:00' },
      navigationPriority: 75, popular: true
    } as ProblemEntity,

    'problem-windows-wont-boot': {
      id: 'problem-windows-wont-boot', slug: 'windows-wont-boot-kuwait', entityType: 'Problem', isActive: true,
      title: "Windows Won't Boot or Stuck in Repair Loop", primaryKeyword: "Windows won't boot repair Kuwait", secondaryKeywords: ["laptop stuck on automatic repair","Windows boot loop fix","laptop stuck on manufacturer logo"],
      description: "Diagnostic guide for laptops that get stuck on the manufacturer logo, drop into 'Preparing Automatic Repair', or loop endlessly instead of reaching the Windows desktop.",
      symptom: "The laptop powers on normally and reaches the logo screen, but then either freezes there, drops into a blue 'Automatic Repair' / 'Recovery' screen, or restarts and repeats the same failed boot attempt over and over.",
      causes: ['Corrupted Windows system files from an interrupted update or improper shutdown', 'A failing hard drive or SSD with bad sectors that the OS can no longer read from', 'A recently added driver or Windows update conflicting with existing hardware', 'Disconnected or failing storage cable/connector (desktops and some laptops)'],
      doNotDo: 'Do not keep letting it attempt "Automatic Repair" over and over, and do not run disk-repair tools blindly. On a genuinely failing drive, repeated read/write attempts can worsen the damage. If the files are inaccessible or especially important, stop using the drive and seek a specialist data-recovery provider; KCROC does not offer that service.',
      solution: 'We first assess storage health and the Windows boot configuration. If the drive is healthy, we can attempt boot-file and startup repair, but customers should back up accessible files whenever possible because no repair path can guarantee data safety. If the drive appears to be failing and the files are inaccessible or especially important, stop using it and arrange specialist data-recovery help; KCROC does not provide standalone data recovery. A clean Windows installation may remove existing files and applications and is only considered after the data implications are explained and you approve the work.',
      urgency: 'high',
      relatedServiceIds: ['srv-laptop', 'srv-gaming'],
      contentImages: [
        { src: IMAGES.laptopHardware.laptopBiosDiagnosticScreenRepair.src, alt: IMAGES.laptopHardware.laptopBiosDiagnosticScreenRepair.alt, width: IMAGES.laptopHardware.laptopBiosDiagnosticScreenRepair.width, height: IMAGES.laptopHardware.laptopBiosDiagnosticScreenRepair.height, placement: 'causes', caption: 'Running diagnostics to tell a failing drive apart from a corrupted Windows boot configuration.' },
        { src: IMAGES.services.windowsInstall.src, alt: IMAGES.services.windowsInstall.alt, width: IMAGES.services.windowsInstall.width, height: IMAGES.services.windowsInstall.height, placement: 'solution', caption: 'Windows boot-file repair or an approved clean installation; clean installation may remove existing files and applications.' },
      ],
      seo: { title: "Windows Won't Boot? Repair Loop Fix in Kuwait | KCROC", description: "Laptop stuck on the logo screen or looping 'Automatic Repair'? We assess storage health and Windows boot faults, explain data risks and quote before paid work. Free pickup in Kuwait.", canonicalUrl: 'https://www.computerrepairkuwait.com/windows-wont-boot-kuwait', ogType: 'article', schemaTypes: ['Article', 'FAQPage'] },
      navigationPriority: 95, popular: true
    } as ProblemEntity,

    'problem-bsod': {
      id: 'problem-bsod', slug: 'blue-screen-of-death-bsod-fix-kuwait', entityType: 'Problem', isActive: true,
      title: 'Blue Screen of Death (BSOD)', primaryKeyword: "blue screen of death repair Kuwait", secondaryKeywords: ["Windows BSOD troubleshooting","laptop blue screen stop code","PC keeps crashing blue screen"],
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
      title: 'Computer Freezing or Randomly Crashing', primaryKeyword: "computer freezing and crashing fix", secondaryKeywords: ["laptop freezes randomly","PC restarts unexpectedly","computer overheating shutdown repair"],
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
      title: 'Virus, Malware or Ransomware Infection', primaryKeyword: "virus and malware removal Kuwait", secondaryKeywords: ["laptop malware removal Kuwait","browser hijacker removal","ransomware infection assessment Kuwait"],
      description: 'Removal service for laptops and PCs showing signs of viruses, adware, browser hijackers, or ransomware.',
      symptom: 'Constant pop-up ads even outside the browser, a homepage or search engine that changed itself, unfamiliar toolbars, the antivirus getting disabled on its own, or — in serious cases — files that suddenly cannot be opened with a ransom message demanding payment.',
      causes: ['Downloaded software bundled with adware or a browser hijacker', 'Opening an infected email attachment or fake software update', 'Outdated Windows or browser software with unpatched security holes', 'Pirated software or "cracked" program installers'],
      doNotDo: 'Do not pay a ransomware demand, and do not install multiple "PC cleaner" or antivirus tools on top of each other trying to fix it yourself — conflicting security tools often make removal harder and some free "cleaner" downloads are malware themselves.',
      solution: 'We assess the reported infection and use appropriate malware-removal tools to scan and clean the affected Windows system. Before any clean Windows installation, customers should back up accessible personal files themselves. A clean install can remove existing files and applications and is only performed after the scope and data implications are explained and approved. This is malware remediation, not standalone data recovery, deleted-file recovery or ransomware decryption.',
      urgency: 'medium',
      relatedServiceIds: ['srv-laptop', 'srv-gaming'],
      contentImages: [
        { src: IMAGES.laptopHardware.fujitsuLaptopWindowsErrorScreenRepair.src, alt: IMAGES.laptopHardware.fujitsuLaptopWindowsErrorScreenRepair.alt, width: IMAGES.laptopHardware.fujitsuLaptopWindowsErrorScreenRepair.width, height: IMAGES.laptopHardware.fujitsuLaptopWindowsErrorScreenRepair.height, placement: 'causes', caption: 'Windows software-repair diagnostics before malware cleanup or system recovery.' },
        { src: IMAGES.services.windowsInstall.src, alt: IMAGES.services.windowsInstall.alt, width: IMAGES.services.windowsInstall.width, height: IMAGES.services.windowsInstall.height, placement: 'solution', caption: 'A clean Windows installation may be considered after infection assessment and customer approval; existing files and applications can be removed.' },
      ],
      seo: { title: 'Virus & Malware Removal Kuwait — Same-Day Service | KCROC', description: 'Pop-ups, browser hijackers or malware on your laptop or PC? KCROC assesses and removes malware, explains clean-install risks and quotes before paid work. Free pickup in Kuwait.', canonicalUrl: 'https://www.computerrepairkuwait.com/virus-malware-removal-kuwait', ogType: 'article', schemaTypes: ['Article', 'FAQPage'] },
      relatedResourcePaths: [{ path: '/pricing#pricing-diagnostics', label: 'Virus & Malware Removal — published price 10–20 KWD' }],
      navigationPriority: 45, popular: false
    } as ProblemEntity,

    



    /* ═══════════════════════════════════════════════════════════════
       FOOTER
    ═══════════════════════════════════════════════════════════════ */
    'footer-data': {
      id: 'footer-data', entityType: 'Footer', isActive: true, title: 'Footer Links',
      links: {
        services: [
          { label: 'Desktop & PC Repair Kuwait', path: '/desktop-pc-repair-kuwait' },
          { label: 'Laptop Repair Kuwait',     path: '/laptop-repair-kuwait' },
          { label: 'MacBook Repair Kuwait',     path: '/macbook-repair-kuwait' },
          { label: 'Gaming PC Repair Kuwait',   path: '/gaming-pc-repair-kuwait' },
          { label: 'Gaming Laptop Cleaning Kuwait', path: '/gaming-laptop-cleaning-kuwait' },
          { label: 'Motherboard Repair Kuwait', path: '/motherboard-repair-kuwait' },
          { label: 'Screen Replacement Kuwait', path: '/laptop-screen-repair-kuwait' },
          { label: 'Laptop Hinge & Chassis Repair', path: '/laptop-hinge-repair-kuwait' },
          { label: 'Battery Replacement Kuwait', path: '/battery-replacement-kuwait' },
          { label: 'Laptop Charging Port Repair', path: '/laptop-charging-port-repair-kuwait' },
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
          { label: 'Computer Repair Hawalli', path: '/location/hawalli' },
          { label: 'Computer Repair Salmiya', path: '/location/salmiya' },
          { label: 'Computer Repair Kuwait City', path: '/location/kuwait-city' },
          { label: 'Computer Repair Farwaniya', path: '/location/farwaniya' },
          { label: 'Computer Repair Jahra', path: '/location/jahra' },
          { label: 'Computer Repair Ahmadi', path: '/location/ahmadi' },
          { label: 'Computer Repair Fahaheel', path: '/location/fahaheel' },
          { label: 'Computer Repair Mangaf', path: '/location/mangaf' },
          { label: 'Computer Repair Abu Halifa', path: '/location/abu-halifa' },
          { label: 'Computer Repair Mubarak Al-Kabeer', path: '/location/mubarak-al-kabeer' },
          { label: 'Computer Repair Sabah Al-Salem', path: '/location/sabah-al-salem' },
          { label: 'Computer Repair Rumaithiya', path: '/location/rumaithiya' },
          { label: 'Computer Repair Surra', path: '/location/surra' },
          { label: 'Computer Repair Khaitan', path: '/location/khaitan' },
          { label: 'Computer Repair Riggae', path: '/location/riggae' },
          { label: 'Computer Repair Mahboula', path: '/location/mahboula' },
          { label: 'Computer Repair Messila', path: '/location/messila' },
          { label: 'Computer Repair Shuwaikh Residential', path: '/location/shuwaikh-residential' },
          { label: 'Computer Repair Abdullah Al-Salem', path: '/location/abdullah-al-salem' },
          { label: 'Computer Repair Shamiya', path: '/location/shamiya' },
          { label: 'Computer Repair Nuzha', path: '/location/nuzha' },
          { label: 'Computer Repair Adailiya', path: '/location/adailiya' },
          { label: 'Computer Repair Kaifan', path: '/location/kaifan' },
          { label: 'Computer Repair Yarmouk', path: '/location/yarmouk' },
          { label: 'Computer Repair Qortuba', path: '/location/qortuba' },
          { label: 'Computer Repair Mishref', path: '/location/mishref' },
        ]
      }
    } as FooterEntity,
  }
};

/* ═══════════════════════════════════════════════════════════════════
   KCROC_GRAPH SINGLETON — consumed by all UI components and SEO Engine
   Contains strict null-safe fallbacks (?? []) to ensure 100% build stability.
   Phase 4 adds explicit location topology and inbound edges here
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
    relatedServiceIds: ['srv-laptop', 'srv-macbook', 'srv-liquid-damage', 'srv-motherboard', 'srv-screen', 'srv-gaming', 'srv-gaming-laptop-cleaning'],
    relatedProblemIds: ['problem-liquid-spill', 'problem-no-power', 'problem-black-screen', 'problem-not-charging', 'problem-overheating'],
    relatedBrandIds: ['brand-dell', 'brand-lenovo', 'brand-hp', 'brand-asus'],
    relatedLocationIds: ['loc-hawalli', 'loc-rumaithiya', 'loc-nuzha', 'loc-kuwait-city', 'loc-surra'],
  },
  'kuwait-city': {
    relatedServiceIds: ['srv-laptop', 'srv-screen', 'srv-motherboard', 'srv-macbook'],
    relatedProblemIds: ['problem-black-screen', 'problem-cracked-screen', 'problem-no-power', 'problem-not-charging'],
    relatedBrandIds: ['brand-dell', 'brand-lenovo', 'brand-hp', 'brand-asus'],
    relatedLocationIds: ['loc-hawalli', 'loc-salmiya', 'loc-surra'],
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
    relatedLocationIds: ['loc-jahra', 'loc-hawalli', 'loc-kuwait-city', 'loc-farwaniya'],
  },
  'saad-al-abdullah': {
    relatedServiceIds: ['srv-laptop', 'srv-screen', 'srv-battery', 'srv-charging-port', 'srv-motherboard', 'srv-ssd-ram', 'srv-gaming-laptop-cleaning'],
    relatedProblemIds: ['problem-no-power', 'problem-not-charging', 'problem-black-screen', 'problem-cracked-screen', 'problem-overheating', 'problem-slow'],
    relatedBrandIds: ['brand-dell', 'brand-hp', 'brand-lenovo', 'brand-asus', 'brand-acer', 'brand-msi'],
    relatedLocationIds: ['loc-jahra', 'loc-hawalli'],
  },
  ahmadi: {
    relatedServiceIds: ['srv-gaming', 'srv-macbook', 'srv-laptop', 'srv-motherboard', 'srv-gaming-laptop-cleaning'],
    relatedProblemIds: ['problem-overheating', 'problem-no-power', 'problem-freezing-crashing', 'problem-liquid-spill'],
    relatedBrandIds: ['brand-asus', 'brand-msi', 'brand-dell', 'brand-lenovo'],
    relatedLocationIds: ['loc-fahaheel', 'loc-mangaf', 'loc-abu-halifa'],
  },
  fahaheel: { relatedServiceIds: ['srv-laptop','srv-motherboard','srv-charging-port','srv-liquid-damage','srv-gaming-laptop-cleaning'], relatedProblemIds: ['problem-no-power','problem-overheating','problem-not-charging','problem-liquid-spill'], relatedBrandIds: ['brand-dell','brand-lenovo','brand-asus','brand-hp'], relatedLocationIds: ['loc-ahmadi','loc-mangaf','loc-abu-halifa'] },
  mangaf: { relatedServiceIds: ['srv-laptop','srv-motherboard','srv-macbook','srv-liquid-damage','srv-gaming-laptop'], relatedProblemIds: ['problem-no-power','problem-overheating','problem-liquid-spill'], relatedBrandIds: ['brand-dell','brand-lenovo','brand-asus','brand-msi'], relatedLocationIds: ['loc-ahmadi','loc-fahaheel','loc-abu-halifa'] },
  'abu-halifa': { relatedServiceIds: ['srv-laptop','srv-macbook','srv-charging-port','srv-gaming','srv-desktop-pc'], relatedProblemIds: ['problem-no-power','problem-overheating','problem-not-charging'], relatedBrandIds: ['brand-dell','brand-lenovo','brand-hp','brand-asus'], relatedLocationIds: ['loc-fahaheel','loc-mangaf','loc-ahmadi'] },
  jabriya: { relatedServiceIds: ['srv-laptop','srv-screen','srv-battery','srv-motherboard','srv-macbook'], relatedProblemIds: ['problem-black-screen','problem-no-power','problem-not-charging','problem-overheating'], relatedBrandIds: ['brand-dell','brand-lenovo','brand-hp','brand-asus'], relatedLocationIds: ['loc-hawalli','loc-kuwait-city','loc-salmiya'] },
  'mubarak-al-kabeer': { relatedServiceIds: ['srv-laptop','srv-battery','srv-screen','srv-motherboard','srv-charging-port'], relatedProblemIds: ['problem-no-power','problem-overheating','problem-not-charging'], relatedBrandIds: ['brand-dell','brand-lenovo','brand-hp','brand-asus'], relatedLocationIds: ['loc-fahaheel','loc-sabah-al-salem','loc-abu-halifa'] },
  fintas: { relatedServiceIds: ['srv-laptop','srv-gaming','srv-gaming-laptop-cleaning','srv-liquid-damage','srv-desktop-pc'], relatedProblemIds: ['problem-overheating','problem-no-power','problem-liquid-spill'], relatedBrandIds: ['brand-asus','brand-msi','brand-dell','brand-lenovo'], relatedLocationIds: ['loc-abu-halifa','loc-fahaheel','loc-mangaf'] },
  'sabah-al-salem': { relatedServiceIds: ['srv-laptop','srv-macbook','srv-screen','srv-motherboard','srv-charging-port'], relatedProblemIds: ['problem-no-power','problem-black-screen','problem-cracked-screen','problem-not-charging'], relatedBrandIds: ['brand-dell','brand-lenovo','brand-hp','brand-asus'], relatedLocationIds: ['loc-mubarak-al-kabeer','loc-messila','loc-hawalli'] },

  salwa: { relatedServiceIds: ['srv-laptop','srv-macbook','srv-screen','srv-battery'], relatedProblemIds: ['problem-cracked-screen','problem-black-screen','problem-not-charging','problem-liquid-spill'], relatedBrandIds: ['brand-dell','brand-lenovo','brand-hp','brand-asus'], relatedLocationIds: ['loc-salmiya','loc-rumaithiya','loc-surra'] },
  rumaithiya: { relatedServiceIds: ['srv-laptop','srv-gaming-laptop-cleaning','srv-macbook','srv-motherboard'], relatedProblemIds: ['problem-overheating','problem-no-power','problem-black-screen','problem-not-charging'], relatedBrandIds: ['brand-asus','brand-dell','brand-lenovo','brand-hp'], relatedLocationIds: ['loc-salmiya','loc-surra','loc-hawalli'] },
  shaab: { relatedServiceIds: ['srv-laptop','srv-macbook','srv-motherboard','srv-screen'], relatedProblemIds: ['problem-black-screen','problem-no-power','problem-cracked-screen','problem-liquid-spill'], relatedBrandIds: ['brand-dell','brand-lenovo','brand-hp','brand-asus'], relatedLocationIds: ['loc-kuwait-city','loc-salmiya','loc-rumaithiya','loc-surra'] },
  surra: {
    relatedServiceIds: ['srv-laptop', 'srv-macbook', 'srv-motherboard', 'srv-screen', 'srv-charging-port'],
    relatedProblemIds: ['problem-no-power', 'problem-overheating', 'problem-black-screen', 'problem-not-charging', 'problem-cracked-screen'],
    relatedBrandIds: ['brand-dell', 'brand-hp', 'brand-lenovo', 'brand-asus'],
    relatedLocationIds: ['loc-hawalli', 'loc-adailiya', 'loc-qortuba', 'loc-yarmouk', 'loc-mishref'],
  },
  khaitan: { relatedServiceIds: ['srv-laptop','srv-charging-port','srv-screen','srv-motherboard'], relatedProblemIds: ['problem-no-power','problem-not-charging','problem-cracked-screen','problem-overheating'], relatedBrandIds: ['brand-dell','brand-hp','brand-lenovo','brand-asus'], relatedLocationIds: ['loc-farwaniya','loc-riggae','loc-hawalli'] },
  riggae: { relatedServiceIds: ['srv-laptop','srv-macbook','srv-screen','srv-motherboard'], relatedProblemIds: ['problem-no-power','problem-not-charging','problem-black-screen','problem-liquid-spill'], relatedBrandIds: ['brand-dell','brand-hp','brand-lenovo','brand-asus'], relatedLocationIds: ['loc-khaitan','loc-farwaniya','loc-hawalli'] },
  ardiya: { relatedServiceIds: ['srv-laptop','srv-gaming','srv-motherboard','srv-screen'], relatedProblemIds: ['problem-overheating','problem-no-power','problem-black-screen','problem-not-charging'], relatedBrandIds: ['brand-asus','brand-msi','brand-dell','brand-lenovo'], relatedLocationIds: ['loc-farwaniya','loc-riggae'] },
  mahboula: { relatedServiceIds: ['srv-laptop', 'srv-macbook', 'srv-gaming', 'srv-gaming-laptop-cleaning'], relatedProblemIds: ['problem-overheating', 'problem-black-screen', 'problem-freezing-crashing', 'problem-no-power', 'problem-liquid-spill', 'problem-cracked-screen', 'problem-not-charging'], relatedBrandIds: ['brand-asus', 'brand-msi', 'brand-dell', 'brand-lenovo'], relatedLocationIds: ['loc-mangaf', 'loc-abu-halifa', 'loc-fahaheel', 'loc-ahmadi'] },
  qurain: { relatedServiceIds: ['srv-laptop','srv-macbook','srv-motherboard','srv-screen'], relatedProblemIds: ['problem-no-power','problem-not-charging','problem-black-screen','problem-liquid-spill'], relatedBrandIds: ['brand-dell','brand-lenovo','brand-hp','brand-asus'], relatedLocationIds: ['loc-mubarak-al-kabeer','loc-sabah-al-salem'] },
  qortuba: {
    relatedServiceIds: ['srv-laptop', 'srv-macbook', 'srv-gaming', 'srv-motherboard', 'srv-screen'],
    relatedProblemIds: ['problem-no-power', 'problem-overheating', 'problem-black-screen', 'problem-not-charging', 'problem-freezing-crashing'],
    relatedBrandIds: ['brand-dell', 'brand-lenovo', 'brand-hp', 'brand-asus'],
    relatedLocationIds: ['loc-adailiya', 'loc-yarmouk', 'loc-surra', 'loc-mishref'],
  },
  rawda: { relatedServiceIds: ['srv-laptop','srv-macbook','srv-screen','srv-battery'], relatedProblemIds: ['problem-black-screen','problem-no-power','problem-not-charging','problem-liquid-spill'], relatedBrandIds: ['brand-dell','brand-hp','brand-lenovo','brand-asus'], relatedLocationIds: ['loc-surra','loc-hawalli'] },
  messila: { relatedServiceIds: ['srv-laptop','srv-macbook','srv-gaming','srv-motherboard'], relatedProblemIds: ['problem-overheating','problem-no-power','problem-not-charging','problem-liquid-spill'], relatedBrandIds: ['brand-asus','brand-msi','brand-dell','brand-lenovo'], relatedLocationIds: ['loc-fahaheel','loc-mubarak-al-kabeer'] },
  adailiya: {
    relatedServiceIds: ['srv-laptop', 'srv-macbook', 'srv-motherboard', 'srv-screen', 'srv-battery'],
    relatedProblemIds: ['problem-no-power', 'problem-black-screen', 'problem-not-charging', 'problem-cracked-screen'],
    relatedBrandIds: ['brand-dell', 'brand-hp', 'brand-lenovo', 'brand-asus'],
    relatedLocationIds: ['loc-nuzha', 'loc-qortuba', 'loc-yarmouk', 'loc-surra'],
  },
  'shuwaikh-residential': {
    relatedServiceIds: ['srv-laptop', 'srv-macbook', 'srv-motherboard', 'srv-screen'],
    relatedProblemIds: ['problem-no-power', 'problem-black-screen', 'problem-not-charging', 'problem-overheating'],
    relatedBrandIds: ['brand-dell', 'brand-hp', 'brand-lenovo', 'brand-asus'],
    relatedLocationIds: ['loc-shamiya', 'loc-abdullah-al-salem', 'loc-kaifan'],
  },
  'abdullah-al-salem': {
    relatedServiceIds: ['srv-laptop', 'srv-macbook', 'srv-motherboard', 'srv-charging-port'],
    relatedProblemIds: ['problem-no-power', 'problem-not-charging', 'problem-black-screen', 'problem-freezing-crashing'],
    relatedBrandIds: ['brand-dell', 'brand-hp', 'brand-lenovo', 'brand-asus'],
    relatedLocationIds: ['loc-nuzha', 'loc-shamiya', 'loc-kaifan'],
  },
  shamiya: {
    relatedServiceIds: ['srv-laptop', 'srv-screen', 'srv-battery', 'srv-motherboard'],
    relatedProblemIds: ['problem-cracked-screen', 'problem-black-screen', 'problem-no-power', 'problem-overheating'],
    relatedBrandIds: ['brand-dell', 'brand-hp', 'brand-lenovo', 'brand-asus'],
    relatedLocationIds: ['loc-shuwaikh-residential', 'loc-abdullah-al-salem', 'loc-kaifan'],
  },
  nuzha: {
    relatedServiceIds: ['srv-laptop', 'srv-macbook', 'srv-battery', 'srv-charging-port'],
    relatedProblemIds: ['problem-overheating', 'problem-not-charging', 'problem-no-power', 'problem-black-screen'],
    relatedBrandIds: ['brand-dell', 'brand-hp', 'brand-lenovo', 'brand-asus'],
    relatedLocationIds: ['loc-abdullah-al-salem', 'loc-adailiya', 'loc-shamiya'],
  },
  kaifan: {
    relatedServiceIds: ['srv-laptop', 'srv-screen', 'srv-battery', 'srv-motherboard'],
    relatedProblemIds: ['problem-overheating', 'problem-cracked-screen', 'problem-not-charging', 'problem-no-power'],
    relatedBrandIds: ['brand-dell', 'brand-hp', 'brand-lenovo', 'brand-asus'],
    relatedLocationIds: ['loc-shamiya', 'loc-shuwaikh-residential', 'loc-abdullah-al-salem'],
  },
  yarmouk: {
    relatedServiceIds: ['srv-laptop', 'srv-gaming', 'srv-gaming-laptop-cleaning', 'srv-macbook', 'srv-motherboard'],
    relatedProblemIds: ['problem-overheating', 'problem-no-power', 'problem-black-screen', 'problem-freezing-crashing'],
    relatedBrandIds: ['brand-dell', 'brand-hp', 'brand-lenovo', 'brand-asus', 'brand-msi'],
    relatedLocationIds: ['loc-qortuba', 'loc-adailiya', 'loc-surra', 'loc-mishref'],
  },
  mishref: {
    relatedServiceIds: ['srv-laptop', 'srv-macbook', 'srv-motherboard', 'srv-gaming', 'srv-gaming-laptop-cleaning'],
    relatedProblemIds: ['problem-overheating', 'problem-no-power', 'problem-not-charging', 'problem-black-screen', 'problem-freezing-crashing'],
    relatedBrandIds: ['brand-dell', 'brand-hp', 'brand-lenovo', 'brand-asus', 'brand-msi'],
    relatedLocationIds: ['loc-yarmouk', 'loc-qortuba', 'loc-surra'],
  },
};const rawEntities = Object.values(rawGraphData.entities);
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
  reviewCount: 161,
  bestRating:   5,
};
