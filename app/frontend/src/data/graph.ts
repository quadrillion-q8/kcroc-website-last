// File: app/frontend/src/data/graph.ts
import {
  RawGraphData, RoutableEntity, LocationEntity, ServiceEntity,
  FAQEntity, WebPageEntity, BusinessEntity, USPEntity, TrustBadgeEntity,
  ProcessEntity, StatsEntity, FooterEntity, ReviewsEntity,
  BrandEntity, ProblemEntity, CaseStudyEntity
} from '../types/knowledgeGraph';
import { IMAGES } from '../constants/images';

export const rawGraphData: RawGraphData = {
  metadata: {
    version: '3.4.0',
    lastUpdated: '2026-08-12T00:00:00+03:00',
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
      coords: { lat: 29.3356, lng: 48.0250 }, websiteUrl: 'https://www.computerrepairkuwait.com',
      logoUrl: 'https://www.computerrepairkuwait.com/logo.webp', email: 'quadrillion1980@gmail.com',
      priceRange: '$$', openingHours: 'Open daily 10:00 AM – 10:00 PM',
      schemaOpeningHours: { dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '10:00', closes: '22:00' },
      aggregateRating: { ratingValue: '4.9', reviewCount: 153, bestRating: 5 },
      socialLinks: { facebook: 'https://www.facebook.com/computerrepairkuwait', instagram: 'https://www.instagram.com/computerrepairkuwait' },
      aiSummary: 'Kuwait Computer Repair On Call (KCROC) is a Hawalli-based component-level computer repair specialist. Services include MacBook logic board micro-soldering, laptop screen replacement, gaming PC thermal repair, motherboard chip-level diagnostics, SSD upgrades, and virus removal. Free pickup and delivery across all Kuwait governorates. 30-day warranty on all repairs. No Fix, No Fee policy.',
    } as BusinessEntity,

    /* ═══════════════════════════════════════════════════════════════
       TRUST BADGES & STATS
    ═══════════════════════════════════════════════════════════════ */
    'badge-privacy':  { id: 'badge-privacy',  entityType: 'TrustBadge', isActive: true, title: 'Data Privacy Guaranteed', iconKey: 'ShieldCheck' } as TrustBadgeEntity,
    'badge-pickup':   { id: 'badge-pickup',   entityType: 'TrustBadge', isActive: true, title: 'Free Pick & Drop',        iconKey: 'Truck'       } as TrustBadgeEntity,
    'badge-warranty': { id: 'badge-warranty', entityType: 'TrustBadge', isActive: true, title: '30-Day Warranty',         iconKey: 'Clock'       } as TrustBadgeEntity,
    'badge-esd':      { id: 'badge-esd',      entityType: 'TrustBadge', isActive: true, title: 'ESD-Safe Lab',            iconKey: 'Zap'         } as TrustBadgeEntity,

    'stats-row': {
      id: 'stats-row', entityType: 'Stats', isActive: true, title: 'Homepage Stats',
      items: [
        { label: 'Repairs completed', value: '500+',    sub: 'Since launch across Kuwait' },
        { label: 'Success rate',        value: '98%',     sub: 'On complex logic board repairs' },
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
      seo: { title: 'Free Pickup Computer Repair Kuwait | No Fix No Fee | KCROC', description: 'KCROC repairs laptops, MacBooks & PCs across Kuwait with free pickup & drop-off. No Fix No Fee, 30-day warranty, 4.9★ rated. WhatsApp +965 55301913.', canonicalUrl: 'https://www.computerrepairkuwait.com', ogType: 'website', schemaTypes: ['LocalBusiness', 'WebSite', 'WebPage'] },
      hero: { headline: 'Kuwait\'s Expert Component-Level Repair Service.', subheadline: 'We fix the board. We don\'t just swap it.', description: 'We diagnose and repair failed components at board level — restoring devices that most repair shops in Kuwait would simply declare beyond repair.', primaryCTA: { text: 'WhatsApp a Technician', route: 'https://wa.me/96555301913' }, secondaryCTA: { text: 'View All Services', route: '/services' } },
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
    'page-services': { id: 'page-services', slug: 'services', entityType: 'WebPage', isActive: true, title: 'Services', description: 'All KCROC repair services', seo: { title: 'Computer Repair Services in Kuwait | Laptop, MacBook & PC | KCROC', description: 'Expert laptop repair, MacBook repair, gaming PC diagnostics, motherboard chip-level repair, and screen replacement in Kuwait. Free pickup. 30-day warranty.', canonicalUrl: 'https://www.computerrepairkuwait.com/services', ogType: 'website', schemaTypes: ['CollectionPage', 'WebPage', 'BreadcrumbList', 'LocalBusiness'], breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Services', url: '/services' }] } } as WebPageEntity,
    'page-near-me': {
      id: 'page-near-me', slug: 'near-me', entityType: 'WebPage', isActive: true,
      title: 'Computer Repair Near Me in Kuwait',
      description: 'Find a computer repair technician near you in Kuwait for laptops, PCs, MacBooks and gaming systems, with free pickup and delivery from our central Hawalli repair lab.',
      seo: {
        title: 'Computer Repair Near Me in Kuwait | Same-Day, Free Pickup',
        description: 'Nearest computer repair technician in Kuwait — no shop visit needed. Free pickup & drop-off, same-day diagnostics, 30-day warranty. WhatsApp us now.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/near-me',
        locale: 'en_KW',
        alternates: {
          'en-KW': 'https://www.computerrepairkuwait.com/near-me',
          'ar-KW': 'https://www.computerrepairkuwait.com/ar/near-me',
          'x-default': 'https://www.computerrepairkuwait.com/near-me'
        },
        ogType: 'website',
        schemaTypes: ['WebPage', 'FAQPage', 'BreadcrumbList'],
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
      title: 'فني كمبيوتر وتصليح لابتوب بالقرب مني في الكويت',
      description: 'دليل عربي شامل لخدمات فني الكمبيوتر وتصليح اللابتوب في الكويت، يغطي حولي والنعيمي والمناطق المجاورة، مع استلام وتوصيل مجاني.',
      seo: {
        title: 'فني كمبيوتر بالقرب مني في الكويت | استلام مجاني | KCROC',
        description: 'تبحث عن فني كمبيوتر أو تصليح لابتوب قريب منك في الكويت؟ KCROC يوفر استلام وتوصيل مجاني، فحص مجاني، وضمان 30 يومًا من مختبرنا في حولي.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/ar/near-me',
        locale: 'ar_KW',
        alternates: {
          'ar-KW': 'https://www.computerrepairkuwait.com/ar/near-me',
          'en-KW': 'https://www.computerrepairkuwait.com/near-me',
          'x-default': 'https://www.computerrepairkuwait.com/near-me'
        },
        ogType: 'website',
        schemaTypes: ['WebPage', 'FAQPage', 'BreadcrumbList'],
        breadcrumbs: [{ name: 'الرئيسية', url: '/' }, { name: 'فني كمبيوتر بالقرب مني', url: '/ar/near-me' }]
      },
      featuredFAQIds: [
        'faq-arabic-computer-technician', 'faq-ar-hawalli-technician', 'faq-ar-pricing',
        'faq-ar-hours', 'faq-ar-maintenance', 'faq-ar-laptop-repair-process'
      ]
    } as WebPageEntity,
    'page-brands': { id: 'page-brands', slug: 'brands', entityType: 'WebPage', isActive: true, title: 'Supported Laptop Brands', description: 'Laptop and computer brands repaired by KCROC in Kuwait.', seo: { title: 'Laptop Brands We Repair in Kuwait | Dell, HP, Lenovo, ASUS & More | KCROC', description: 'Component-level laptop repair for Dell, HP, Lenovo, ASUS, Acer, MSI and other major brands across Kuwait.', canonicalUrl: 'https://www.computerrepairkuwait.com/brands', ogType: 'website', schemaTypes: ['CollectionPage', 'WebPage', 'BreadcrumbList'], breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Brands', url: '/brands' }] } } as WebPageEntity,
    'page-problems': { id: 'page-problems', slug: 'problems', entityType: 'WebPage', isActive: true, title: 'Common Computer Problems', description: 'Common laptop and computer problems diagnosed and repaired by KCROC in Kuwait.', seo: { title: 'Common Laptop & Computer Problems We Fix | KCROC Kuwait', description: 'Find causes, safe troubleshooting steps and repair options for common laptop and computer problems in Kuwait.', canonicalUrl: 'https://www.computerrepairkuwait.com/problems', ogType: 'website', schemaTypes: ['CollectionPage', 'WebPage', 'BreadcrumbList'], breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Problems', url: '/problems' }] } } as WebPageEntity,
    'page-guides': { id: 'page-guides', slug: 'guides', entityType: 'WebPage', isActive: true, title: 'DIY & Repair Guides', description: 'Technician-written laptop and computer troubleshooting guides from KCROC Kuwait.', seo: { title: 'Laptop & Computer Repair Guides | KCROC Kuwait', description: 'Free technician-written guides for diagnosing laptop and computer problems, battery issues, overheating, BIOS recovery and more.', canonicalUrl: 'https://www.computerrepairkuwait.com/guides', ogType: 'website', schemaTypes: ['CollectionPage', 'WebPage', 'BreadcrumbList'], breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Guides', url: '/guides' }] } } as WebPageEntity,
    'page-404': { id: 'page-404', slug: '404', entityType: 'WebPage', isActive: true, title: 'Page Not Found', description: 'The requested KCROC page could not be found.', seo: { title: 'Page Not Found | KCROC Kuwait', description: 'The requested page could not be found.', canonicalUrl: 'https://www.computerrepairkuwait.com/404', ogType: 'website', robots: 'noindex, follow, max-image-preview:none', schemaTypes: ['WebPage'] } } as WebPageEntity,
    'page-blog': { id: 'page-blog', slug: 'blog', entityType: 'WebPage', isActive: true, title: 'Tech Blog', description: 'Expert repair guides and tech insights.', seo: { title: 'KCROC Tech Blog | Computer Repair Guides Kuwait', description: 'Expert computer repair guides, laptop fixes, MacBook troubleshooting, and PC performance tips in Kuwait.', canonicalUrl: 'https://www.computerrepairkuwait.com/blog', ogType: 'website', schemaTypes: ['CollectionPage'] } } as WebPageEntity,
    'page-about': { id: 'page-about', slug: 'about', entityType: 'WebPage', isActive: true, title: 'About Us', description: 'Learn about KCROC.', seo: { title: 'About KCROC | Computer Repair Experts Kuwait', description: 'Learn about Kuwait Computer Repair On Call, our Hawalli lab, and our commitment to component-level repair.', canonicalUrl: 'https://www.computerrepairkuwait.com/about', ogType: 'website', schemaTypes: ['AboutPage'] } } as WebPageEntity,
    'page-contact': { id: 'page-contact', slug: 'contact', entityType: 'WebPage', isActive: true, title: 'Contact Us', description: 'Contact KCROC for repair services.', seo: { title: 'Contact KCROC | Computer Repair Kuwait', description: 'Get in touch with Kuwait Computer Repair On Call. Book a free pick & drop repair service today.', canonicalUrl: 'https://www.computerrepairkuwait.com/contact', ogType: 'website', schemaTypes: ['ContactPage'] } } as WebPageEntity,
    'page-faq': { id: 'page-faq', slug: 'faq', entityType: 'WebPage', isActive: true, title: 'FAQ', description: 'Frequently asked questions.', seo: { title: 'Frequently Asked Questions | KCROC Kuwait', description: 'Answers to common questions about our laptop repair services, pricing, warranty, and data privacy.', canonicalUrl: 'https://www.computerrepairkuwait.com/faq', ogType: 'website', schemaTypes: ['FAQPage'] } } as WebPageEntity,
    'page-gallery': { id: 'page-gallery', slug: 'gallery', entityType: 'WebPage', isActive: true, title: 'Gallery', description: 'Lab and repair gallery.', seo: { title: 'Repair Gallery | KCROC Hawalli Lab', description: 'View our ESD-safe repair lab in Hawalli and real examples of our component-level micro-soldering.', canonicalUrl: 'https://www.computerrepairkuwait.com/gallery', ogType: 'website', schemaTypes: ['CollectionPage'] } } as WebPageEntity,
    'page-pricing': { id: 'page-pricing', slug: 'pricing', entityType: 'WebPage', isActive: true, title: 'Pricing', description: 'Transparent repair pricing.', seo: { title: 'Computer Repair Pricing Kuwait | KCROC', description: 'Transparent pricing for laptop screen replacement, battery replacement, and logic board repairs in Kuwait.', canonicalUrl: 'https://www.computerrepairkuwait.com/pricing', ogType: 'website', schemaTypes: ['WebPage'] } } as WebPageEntity,
    
    'page-booking': { id: 'page-booking', slug: 'book', entityType: 'WebPage', isActive: true, title: 'Book a Repair', description: 'Book free laptop and computer repair pickup anywhere in Kuwait. Same-day hardware assessment. 30-day warranty.', seo: { title: 'Book Laptop & Computer Repair Pickup in Kuwait | KCROC', description: 'Book free laptop and computer repair pickup anywhere in Kuwait. Same-day hardware assessment. 30-day warranty.', canonicalUrl: 'https://www.computerrepairkuwait.com/book', ogType: 'website', schemaTypes: ['WebPage'] } } as WebPageEntity,
    
    'page-privacy': { id: 'page-privacy', slug: 'privacy-security-kuwait', entityType: 'WebPage', isActive: true, title: 'Privacy & Security', description: 'Our data privacy guarantee.', seo: { title: 'Data Privacy & Security Guarantee | KCROC', description: 'Read about our strict hardware-only protocol that guarantees your personal data remains 100% private during repairs.', canonicalUrl: 'https://www.computerrepairkuwait.com/privacy-security-kuwait', ogType: 'website', schemaTypes: ['WebPage'] } } as WebPageEntity,
    'page-privacy-policy': { id: 'page-privacy-policy', slug: 'privacy-policy', entityType: 'WebPage', isActive: true, title: 'Privacy Policy', description: 'KCROC Privacy Policy and Data Handling', seo: { title: 'Privacy Policy | KCROC Kuwait', description: 'Read the official Privacy Policy for Kuwait Computer Repair On Call. We are committed to protecting your data and personal information.', canonicalUrl: 'https://www.computerrepairkuwait.com/privacy-policy', ogType: 'website', schemaTypes: ['WebPage'] } } as WebPageEntity,
    'page-terms-of-service': { id: 'page-terms-of-service', slug: 'terms-of-service', entityType: 'WebPage', isActive: true, title: 'Terms of Service', description: 'KCROC Terms and Conditions of Service', seo: { title: 'Terms of Service | KCROC Kuwait', description: 'Read the official Terms of Service and conditions for computer repair, pick & drop, and warranties at Kuwait Computer Repair On Call.', canonicalUrl: 'https://www.computerrepairkuwait.com/terms-of-service', ogType: 'website', schemaTypes: ['WebPage'] } } as WebPageEntity,
    'page-case-studies': { id: 'page-case-studies', slug: 'case-studies', entityType: 'WebPage', isActive: true, title: 'Case Studies', description: 'Real repair success stories.', seo: { title: 'Repair Case Studies | KCROC Kuwait', description: 'Read real case studies of laptops and MacBooks we saved from liquid damage and catastrophic failure.', canonicalUrl: 'https://www.computerrepairkuwait.com/case-studies', ogType: 'website', schemaTypes: ['CollectionPage'] } } as WebPageEntity,
    'page-author-imran': { id: 'page-author-imran', slug: 'author/imran', entityType: 'WebPage', isActive: true, title: 'Imran Natiq', description: 'Author bio page for Imran Natiq, Founder & Lead Technician at KCROC, referenced from the Person schema on blog articles he authored.', seo: { title: 'Imran Natiq — Hardware Repair Engineer at KCROC Kuwait', description: 'Imran Natiq is a hardware repair engineer and founder of KCROC in Hawalli, Kuwait, specializing in motherboard diagnostics and micro-soldering.', canonicalUrl: 'https://www.computerrepairkuwait.com/author/imran', ogType: 'profile', schemaTypes: ['ProfilePage', 'Person', 'BreadcrumbList'] } } as WebPageEntity,
    'guide-battery': { id: 'guide-battery', slug: 'guides/laptop-battery-warning-signs', entityType: 'WebPage', isActive: true, title: 'Laptop Battery Warning Signs', description: 'Learn the 10 critical warning signs of lithium-ion battery failure, how to check battery health on Windows 11 and macOS, and what to do about a swollen battery.', seo: { title: 'Laptop Battery Warning Signs: 10 Signs It May Need Replacement | KCROC', description: 'How can you tell if a laptop battery is failing? Learn 10 warning signs, how to check battery health on Windows 11 and macOS, and when battery replacement is worth considering.', canonicalUrl: 'https://www.computerrepairkuwait.com/guides/laptop-battery-warning-signs', ogType: 'article', schemaTypes: ['Article', 'FAQPage'] },
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
        title: 'BIOS & UEFI Recovery Guide: Update Failures & Firmware Repair | KCROC',
        description: "Laptop or PC won't boot after a BIOS/UEFI update? Learn the 10 warning signs of firmware corruption, how to tell it apart from a hardware fault, and how professional BIOS chip recovery works in Kuwait.",
        canonicalUrl: 'https://www.computerrepairkuwait.com/guides/bios-uefi-recovery-kuwait',
        ogType: 'article',
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
      relatedServiceIds: ['srv-motherboard', 'srv-laptop', 'srv-gaming']
    } as WebPageEntity,
    'guide-intel-vs-amd': { 
      id: 'guide-intel-vs-amd', 
      slug: 'blog/intel-core-ultra-vs-amd-ryzen-ai', 
      entityType: 'WebPage', 
      isActive: true, 
      title: 'Intel Core Ultra vs AMD Ryzen AI: Which Is Better?', 
      description: 'Intel Core Ultra vs AMD Ryzen AI: compare CPU performance, integrated graphics, NPU features, power limits, cooling and laptop configuration before you buy.', 
      seo: { 
        title: 'Intel Core Ultra vs AMD Ryzen AI: Which Is Better? | KCROC', 
        description: 'Intel Core Ultra vs AMD Ryzen AI: compare CPU performance, graphics, NPU features, power limits, cooling and the exact laptop configuration before choosing.', 
        canonicalUrl: 'https://www.computerrepairkuwait.com/blog/intel-core-ultra-vs-amd-ryzen-ai', 
        ogType: 'article', 
        schemaTypes: ['Article', 'FAQPage', 'BreadcrumbList'] 
      } 
    } as WebPageEntity,
    'guide-laptop-buying': {
      id: 'guide-laptop-buying',
      slug: 'blog/laptop-buying-guide-kuwait-2026',
      entityType: 'WebPage',
      isActive: true,
      title: "Laptop Buying Guide Kuwait (2026): What the Spec Sheet Won't Tell You",
      description: 'Confused by Intel, Ryzen and RTX naming in 2026? A Kuwait repair engineer explains which laptop specs actually matter — and which don\'t.',
      seo: {
        title: "Laptop Buying Guide Kuwait (2026): What the Spec Sheet Won't Tell You",
        description: 'Confused by Intel, Ryzen and RTX naming in 2026? A Kuwait repair engineer explains which laptop specs actually matter — and which don\'t.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/blog/laptop-buying-guide-kuwait-2026',
        ogType: 'article',
        alternates: { 'en-KW': '/blog/laptop-buying-guide-kuwait-2026', 'ar-KW': '/blog/ar/laptop-buying-guide-kuwait-2026', 'x-default': '/blog/laptop-buying-guide-kuwait-2026' },
        schemaTypes: ['Article', 'FAQPage', 'BreadcrumbList', 'Person']
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
        title: 'دليل شراء اللابتوب في الكويت 2026: شلون تختار أفضل لابتوب؟ | KCROC',
        description: 'تبي تشتري لابتوب في الكويت؟ تعرّف على أفضل مواصفات المعالج والرام وSSD وRTX والتبريد والبطارية حسب استخدامك، مع قائمة فحص قبل الشراء.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/blog/ar/laptop-buying-guide-kuwait-2026',
        ogType: 'article',
        locale: 'ar_KW',
        alternates: { 'en-KW': '/blog/laptop-buying-guide-kuwait-2026', 'ar-KW': '/blog/ar/laptop-buying-guide-kuwait-2026', 'x-default': '/blog/laptop-buying-guide-kuwait-2026' },
        schemaTypes: ['Article', 'FAQPage', 'BreadcrumbList']
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
      title: 'GameBarPresenceWriter.exe: Diagnose & Disable Background Game Bar Activity',
      description: 'Seeing micro-stutters, frame-time spikes, or input-feel changes on a powerful Windows gaming PC? A measured, evidence-first diagnostic guide to GameBarPresenceWriter.exe and Windows Game Bar background activity.',
      seo: {
        title: 'GameBarPresenceWriter.exe: What It Is, Fix Stutter & Disable It | KCROC',
        description: 'What is GameBarPresenceWriter.exe? Learn how to diagnose stutter, disable Xbox Game Bar safely, and check whether this Windows component is actually causing the problem.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/guides/gamebar-presence-writer-fix',
        ogType: 'article',
        schemaTypes: ['Article', 'BreadcrumbList', 'ImageObject']
      }
    } as WebPageEntity,

    /* ═══════════════════════════════════════════════════════════════
       SERVICES
    ═══════════════════════════════════════════════════════════════ */
    'srv-macbook': { 
      id: 'srv-macbook', 
      slug: 'macbook-repair-kuwait', 
      entityType: 'Service', 
      isActive: true, 
      title: 'MacBook Repair Kuwait', 
      iconKey: 'apple', 
      shortDescription: 'Chip-level logic board repair, USB-C power IC replacement, and liquid damage recovery — without Apple\'s full board-swap and data-loss policy.',
      description: 'Your MacBook won\'t turn on, a spilled drink has just hit the keyboard, or neither Thunderbolt port will charge it anymore — and an Apple Authorized Service Provider has quoted a full logic board replacement that costs hundreds of KWD and, on most Apple Silicon models, means starting over with zero access to your original files. That last part isn\'t a scare tactic — it\'s how the hardware works: on M1/M2/M3 MacBooks, storage is soldered directly to the board and encrypted against that specific board\'s Secure Enclave, so a swapped board is a genuinely different machine as far as your data is concerned. We take the other path. Using thermal imaging and a multimeter, we trace the fault to the exact failed component — a shorted MOSFET, a blown power IC, a corroded trace — and repair that one point via micro-soldering, on your original board. Your SSD, your Secure Enclave, and your data stay exactly where they were.', 
      idealCustomer: 'Creative professionals, developers, students, and business professionals who\'ve been quoted an expensive board-swap by Apple or a reseller and need the original logic board — and the data on it — recovered rather than replaced.',
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
      coreFeatures: [
        'Logic Board Micro-Soldering',
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
        { title: 'Chip-Level Logic Board Repair', description: 'We trace the fault to the specific failed component — a MOSFET, a power IC, a corroded trace — and repair it directly, instead of defaulting to a full board swap.' },
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
          description: 'No charging light, no fan spin, no response to the power button. Usually a shorted input MOSFET or a blown main power rail (PPBUS_G3H and similar) rather than a dead logic board outright — we trace it with a multimeter before assuming the worst.' 
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
          { metric: 'Board Recovery Rate', outcome: 'The majority of logic boards referred to us as "needs full replacement" are repairable at component level once the fault is traced to its actual source.' },
          { metric: 'Data Preservation', outcome: 'Because the original board is repaired rather than swapped, the original SSD and Secure Enclave remain untouched in the large majority of repairs — data stays accessible without a separate recovery step.' },
          { metric: 'Liquid Damage Cases', outcome: 'Boards brought in within 24-48 hours of a spill, without being powered on again after the incident, have meaningfully better recovery outcomes than those that were repeatedly tested first.' },
          { metric: 'Cost vs. Board-Swap Quotes', outcome: 'Component-level repair typically costs a fraction of an out-of-warranty full logic board replacement quote.' }
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
            symptoms: 'The MacBook was completely dead with no display; Apple quoted a full logic board replacement with total data loss, since the Apple Silicon storage encryption is tied to the original board\'s Secure Enclave.',
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
          title: 'Can you repair a MacBook Apple said needs a full logic board replacement?',
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
          title: 'How much does MacBook logic board repair cost compared to Apple?',
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
          title: 'Do you offer a warranty on logic board repairs?',
          answer: 'Yes, 30 days covering all parts and labor on the repair performed.'
        },
        {
          id: 'faq-macbook-turn-around-time',
          title: 'How long does MacBook repair take?',
          answer: 'Most component-level repairs complete in 24-48 hours, including full-load stress testing before the device is returned to you.'
        }
      ],

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
          caption: 'Component-level logic board and fan repair — replacing the exact failed chip rather than the whole board.'
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
        title: 'MacBook Repair Kuwait | Logic Board Experts | No Fix No Fee | KCROC', 
        description: 'Chip-level MacBook logic board repair in Kuwait. USB-C power IC replacement, liquid damage recovery, and data-safe board repair for Intel & Apple Silicon models. Free pick & drop.', 
        canonicalUrl: 'https://www.computerrepairkuwait.com/macbook-repair-kuwait', 
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
      repairLevel: 'advanced', 
      estimatedTurnaround: 'Same Day / 24 Hours', 
      pricing: { startingFrom: 15, currency: 'KWD', quoteRequired: true, displayLabel: 'From 15 KWD' }, 
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
        { title: 'Data Privacy Guaranteed', description: 'We work on the hardware, not your files. You can even remove your SSD before handing us the laptop for board-level repairs.' },
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
          src: IMAGES.laptopHardware.dellRepair.src,
          alt: IMAGES.laptopHardware.dellRepair.alt,
          width: IMAGES.laptopHardware.dellRepair.width,
          height: IMAGES.laptopHardware.dellRepair.height,
          placement: 'commonIssues',
          caption: 'A Dell laptop chassis opened for hardware repair — a typical starting point for hinge, DC jack, and motherboard faults.'
        },
        {
          src: IMAGES.laptopHardware.brokenHinge.src,
          alt: IMAGES.laptopHardware.brokenHinge.alt,
          width: IMAGES.laptopHardware.brokenHinge.width,
          height: IMAGES.laptopHardware.brokenHinge.height,
          placement: 'coreFeatures',
          caption: 'Cracked hinge chassis damage — one of the most common structural repairs we handle on Windows laptops.'
        },
        {
          src: IMAGES.laptopHardware.laptopOpenRepairBench.src,
          alt: IMAGES.laptopHardware.laptopOpenRepairBench.alt,
          width: IMAGES.laptopHardware.laptopOpenRepairBench.width,
          height: IMAGES.laptopHardware.laptopOpenRepairBench.height,
          placement: 'process',
          caption: 'A laptop fully opened on the repair bench during diagnostic and reassembly work.'
        }
      ],
      seo: { 
        title: 'Laptop Repair Kuwait | Screen, Hinge & Motherboard | KCROC', 
        description: 'Expert Windows laptop repair in Kuwait. Dell, HP, Lenovo, ASUS & Acer. Broken hinges, DC jacks, screens, SSD upgrades, and thermal fixes. Free pick & drop.', 
        canonicalUrl: 'https://www.computerrepairkuwait.com/laptop-repair-kuwait', 
        ogType: 'article', 
        schemaTypes: ['Service', 'FAQPage'] 
      },
      navigationPriority: 90, 
      isFeatured: true, 
      popular: true
    } as ServiceEntity,
    
    'srv-gaming': { 
      id: 'srv-gaming', 
      slug: 'gaming-pc-repair-kuwait', 
      entityType: 'Service', 
      isActive: true, 
      title: 'Gaming PC & GPU Repair Kuwait', 
      iconKey: 'gaming', 
      shortDescription: 'Component-level GPU diagnostics, liquid metal thermal restoration, and custom loop / AIO maintenance for high-performance gaming systems in Kuwait.', 
      description: 'If your gaming PC shuts down mid-match, starts stuttering without warning, or shows artifacting under load, the problem is usually a specific hardware fault rather than a dead GPU or a ruined motherboard. In Kuwait, intense heat, fine dust, and frequent AC cycling accelerate thermal paste degradation, cooling failures, and power-stage stress, which is why these systems often need specialized diagnosis instead of guesswork. We use thermal imaging, load benchmarking, and component-level testing to isolate the actual fault on RTX 40-series and 50-series cards, RX 7000-series GPUs, Ryzen X3D and Intel Core Ultra/i9 builds, liquid-cooled rigs, and more. Wherever possible, we repair the failed component instead of pushing you into an expensive full-part replacement. Send us your symptoms on WhatsApp for a free diagnostic — pickup and delivery are free anywhere in Kuwait, and every repair includes a 30-day warranty.', 
      idealCustomer: 'Gamers, esports players, streamers, content creators, 3D designers, architects, engineers, video editors, developers, and anyone running a high-performance desktop or laptop that isn\'t performing the way it should.',
      deviceTypes: [
        'Custom Desktop Builds', 
        'Pre-Built Gaming PCs (Alienware, OMEN)', 
        'High-End Gaming Laptops', 
        'Standalone GPUs (RTX / Radeon RX series)',
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

      warranty: { 
        duration: '30 Days', 
        coverage: 'Covers all replaced components, thermal applications, and micro-soldering labor.', 
        noFixNoFee: true 
      }, 
      seo: { 
        title: 'Gaming PC & GPU Repair Kuwait | FPS & Thermal Fix | KCROC', 
        description: 'Stop losing frames to Kuwait\'s heat. Expert component-level gaming PC and GPU repair. Liquid metal, AIO fixes, and micro-soldering. Free pick & drop.', 
        canonicalUrl: 'https://www.computerrepairkuwait.com/gaming-pc-repair-kuwait', 
        ogType: 'article', 
        schemaTypes: ['Service', 'FAQPage'] 
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
        'MacBook Logic Boards (Intel & Apple Silicon)',
        'Gaming Laptop Motherboards (high-draw VRM designs)',
        'Desktop Motherboards (ATX / Micro-ATX)'
      ],
      repairLevel: 'chip-level', 
      estimatedTurnaround: '24-48 Hours', 
      pricing: { startingFrom: 25, currency: 'KWD', quoteRequired: true, displayLabel: 'From 25 KWD — free diagnostic first' }, 
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
          title: 'Do you repair both MacBook logic boards and Windows motherboards?',
          answer: 'Yes — MacBook logic boards (Intel and Apple Silicon) and Windows laptop or desktop motherboards across all major brands.'
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
        title: 'Motherboard Repair Kuwait | Chip-Level MOSFET & BGA Rework | KCROC', 
        description: 'Chip-level motherboard repair in Kuwait. Power rail tracing, MOSFET replacement, BGA rework, and liquid damage recovery — up to 80% cheaper than a full board replacement. Free pick & drop.', 
        canonicalUrl: 'https://www.computerrepairkuwait.com/motherboard-repair-kuwait', 
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
      pricing: { startingFrom: 20, currency: 'KWD', quoteRequired: false, displayLabel: 'From 20 KWD' },
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
        { id: 'faq-screen-cost', title: 'How much does laptop screen replacement cost?', answer: 'From 20 KWD for standard panels, with the exact price depending on size, resolution, and whether it\'s a standard panel or a MacBook Retina display.' },
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
        title: 'Laptop Screen Replacement Kuwait | Same Day | KCROC',
        description: 'Same-day laptop and MacBook screen replacement in Kuwait. LCD, IPS, OLED & Retina panels, plus display cable repair. Free pick & drop, 30-day warranty.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/laptop-screen-repair-kuwait',
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
      pricing: { startingFrom: 12, currency: 'KWD', quoteRequired: true, displayLabel: 'From 12 KWD — free diagnostic first' }, 
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
          description: 'macOS\'s own battery health indicator flags degraded cells before they cause visible symptoms — we replace the internal battery without affecting the rest of the logic board.'
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
          answer: 'Yes — MacBook Air and MacBook Pro across all generations, as an internal battery replacement that doesn\'t affect the rest of the logic board or your data.'
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
          src: IMAGES.laptopHardware.getacBattery.src,
          alt: IMAGES.laptopHardware.getacBattery.alt,
          width: IMAGES.laptopHardware.getacBattery.width,
          height: IMAGES.laptopHardware.getacBattery.height,
          placement: 'commonIssues',
          caption: 'A worn laptop battery pack removed for health testing before we confirm it — not the charging circuit — is the fault.'
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
        title: 'Laptop & MacBook Battery Replacement Kuwait | Same Day | KCROC', 
        description: 'Battery health diagnostics and same-day replacement for MacBook, Dell, HP, Lenovo, ASUS, Acer & MSI laptops in Kuwait. We confirm the battery is the fault before replacing it. Free pick & drop.', 
        canonicalUrl: 'https://www.computerrepairkuwait.com/battery-replacement-kuwait', 
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
    'loc-hawalli': { id: 'loc-hawalli', slug: 'hawalli', entityType: 'Location', isActive: true, isPhysicalLocation: true, title: 'Hawalli Repair Center', description: 'Professional laptop, MacBook, gaming PC and motherboard repair from KCROC\'s Hawalli service location, with pickup and delivery available across Kuwait.', landmark: 'Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19', coords: { lat: 29.3356, lng: 48.0250 }, serviceRadiusKm: 40, serviceAreas: ['Hawalli', 'Salmiya', 'Kuwait City', 'Farwaniya', 'Ahmadi', 'Jahra', 'Fahaheel'], contentImage: { src: IMAGES.brand.shopExteriorDay.src, alt: IMAGES.brand.shopExteriorDay.alt, width: IMAGES.brand.shopExteriorDay.width, height: IMAGES.brand.shopExteriorDay.height, caption: 'Our repair center at Al Mullah Complex, Ibn Khaldoun St, Hawalli.' }, seo: { title: 'Computer Repair in Hawalli, Kuwait | Laptop & MacBook Repair | KCROC', description: 'Computer repair in Hawalli, Kuwait from KCROC, covering laptops, MacBooks, motherboards and gaming PCs with pickup and delivery across Kuwait.', canonicalUrl: 'https://www.computerrepairkuwait.com/location/hawalli', ogType: 'website', schemaTypes: ['LocalBusiness'] }, navigationPriority: 100 } as LocationEntity,

    'loc-kuwait-city': { 
      id: 'loc-kuwait-city', slug: 'kuwait-city', entityType: 'Location', isActive: true, isPhysicalLocation: false, title: 'Kuwait City', description: 'Fast, professional corporate IT support and component-level laptop repair for businesses and residents in Kuwait City.', landmark: 'Mobile Dispatch Area (Equipment processed at our central Hawalli workshop: Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19)', coords: { lat: 29.3759, lng: 47.9774 }, serviceRadiusKm: 15, serviceAreas: ['Kuwait City', 'Sharq', 'Dasman', 'Mirqab', 'Qibla'], 
      contentImage: { src: IMAGES.brand.technicians.src, alt: IMAGES.brand.technicians.alt, width: IMAGES.brand.technicians.width, height: IMAGES.brand.technicians.height, caption: 'Our technicians handling component-level laptop repair for businesses and residents across Kuwait City.' },
      seo: { title: 'Computer Repair Kuwait City | Corporate & Residential | KCROC', description: 'Expert computer repair, MacBook logic board micro-soldering, and IT support for businesses and residents in Kuwait City. Free pick and drop.', canonicalUrl: 'https://www.computerrepairkuwait.com/location/kuwait-city', ogType: 'website', schemaTypes: ['LocalBusiness'] }, 
      navigationPriority: 95 
    } as LocationEntity,
    
    'loc-salmiya': { id: 'loc-salmiya', slug: 'salmiya', entityType: 'Location', isActive: true, isPhysicalLocation: false, title: 'Salmiya', description: 'Fast, professional computer and laptop repair services for residents and businesses in Salmiya.', landmark: 'Mobile Dispatch Area (Equipment processed at our central Hawalli workshop: Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19)', coords: { lat: 29.3400, lng: 48.0800 }, serviceRadiusKm: 15, serviceAreas: ['Salmiya', 'Rumaithiya', 'Salwa', 'Bidaa'], contentImage: { src: IMAGES.services.laptopRepair.src, alt: IMAGES.services.laptopRepair.alt, width: IMAGES.services.laptopRepair.width, height: IMAGES.services.laptopRepair.height, caption: 'Professional laptop repair for residents and businesses across Salmiya.' }, seo: { title: 'Computer Repair in Salmiya, Kuwait | Laptop Repair | KCROC', description: 'Laptop and computer repair in Salmiya with free pickup and delivery. Devices are diagnosed and repaired at KCROC\'s central Hawalli lab.', canonicalUrl: 'https://www.computerrepairkuwait.com/location/salmiya', ogType: 'website', schemaTypes: ['LocalBusiness'] }, navigationPriority: 90 } as LocationEntity,

    'loc-farwaniya': { id: 'loc-farwaniya', slug: 'farwaniya', entityType: 'Location', isActive: true, isPhysicalLocation: false, title: 'Farwaniya', description: 'Expert motherboard repair, screen replacement, and PC diagnostics for the Farwaniya governorate.', landmark: 'Mobile Dispatch Area (Equipment processed at our central Hawalli workshop: Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19)', coords: { lat: 29.2770, lng: 47.9590 }, serviceRadiusKm: 20, serviceAreas: ['Farwaniya', 'Khaitan', 'Riggae', 'Ardiya', 'Jleeb Al-Shuyoukh'], contentImage: { src: IMAGES.services.motherboardRepair.src, alt: IMAGES.services.motherboardRepair.alt, width: IMAGES.services.motherboardRepair.width, height: IMAGES.services.motherboardRepair.height, caption: 'Chip-level motherboard repair and screen replacement serving the Farwaniya governorate.' }, seo: { title: 'Computer Repair in Farwaniya, Kuwait | Laptop & PC Repair | KCROC', description: 'Laptop, PC and motherboard repair in Farwaniya, including Khaitan, Riggae and Ardiya, with free pickup and delivery to KCROC\'s Hawalli lab.', canonicalUrl: 'https://www.computerrepairkuwait.com/location/farwaniya', ogType: 'website', schemaTypes: ['LocalBusiness'] }, navigationPriority: 80 } as LocationEntity,

    'loc-jahra': { id: 'loc-jahra', slug: 'jahra', entityType: 'Location', isActive: true, isPhysicalLocation: false, title: 'Jahra', description: 'Comprehensive computer repair, thermal repasting, and logic board diagnostics delivered directly to Jahra.', landmark: 'Mobile Dispatch Area (Equipment processed at our central Hawalli workshop: Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19)', coords: { lat: 29.3370, lng: 47.6580 }, serviceRadiusKm: 40, serviceAreas: ['Jahra', 'Saad Al Abdullah', 'Naeem', 'Qasr', 'Taima'], contentImage: { src: IMAGES.motherboard.thermalGrizzly1.src, alt: IMAGES.motherboard.thermalGrizzly1.alt, width: IMAGES.motherboard.thermalGrizzly1.width, height: IMAGES.motherboard.thermalGrizzly1.height, caption: 'Thermal repasting and logic board diagnostics delivered directly to Jahra.' }, seo: { title: 'Computer Repair in Jahra, Kuwait | Laptop Repair | KCROC', description: 'Computer and laptop repair in Jahra with free pickup and delivery, including thermal maintenance and logic-board diagnostics at KCROC\'s Hawalli lab.', canonicalUrl: 'https://www.computerrepairkuwait.com/location/jahra', ogType: 'website', schemaTypes: ['LocalBusiness'] }, navigationPriority: 70 } as LocationEntity,

    'loc-ahmadi': { id: 'loc-ahmadi', slug: 'ahmadi', entityType: 'Location', isActive: true, isPhysicalLocation: false, title: 'Ahmadi', description: 'Premium gaming PC repair and Apple MacBook diagnostics serving Ahmadi and southern Kuwait.', landmark: 'Mobile Dispatch Area (Equipment processed at our central Hawalli workshop: Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19)', coords: { lat: 29.0833, lng: 48.0833 }, serviceRadiusKm: 30, serviceAreas: ['Ahmadi', 'Fahaheel', 'Mangaf', 'Mahboula', 'Sabahiya'], contentImage: { src: IMAGES.gaming.rgbLighting.src, alt: IMAGES.gaming.rgbLighting.alt, width: IMAGES.gaming.rgbLighting.width, height: IMAGES.gaming.rgbLighting.height, caption: 'Gaming PC and Apple MacBook diagnostics serving Ahmadi and southern Kuwait.' }, seo: { title: 'Computer Repair in Ahmadi, Kuwait | Laptop, MacBook & PC | KCROC', description: 'Laptop, MacBook and gaming PC repair in Ahmadi, Fahaheel, Mangaf and Mahboula, with free pickup and delivery to KCROC\'s Hawalli lab.', canonicalUrl: 'https://www.computerrepairkuwait.com/location/ahmadi', ogType: 'website', schemaTypes: ['LocalBusiness'] }, navigationPriority: 60 } as LocationEntity,

    // 🚀 NEW: Fahaheel, Mangaf, and Abu Halifa were previously only mentioned
    // as text inside Hawalli's and Ahmadi's `serviceAreas` arrays — they had
    // no dedicated entity, so /location/fahaheel etc. 404'd and none of the
    // three had their own indexable page, meta tags, or LocalBusiness schema.
    // Each gets its own entity below (same LocationDeepTemplate pattern as
    // Salmiya/Farwaniya/Jahra/Ahmadi) with a distinct angle and image per
    // page so the cluster doesn't read as templated duplicate content.
    'loc-fahaheel': { id: 'loc-fahaheel', slug: 'fahaheel', entityType: 'Location', isActive: true, isPhysicalLocation: false, title: 'Fahaheel', description: 'Free pickup and delivery for laptop, MacBook, and gaming PC repair across Fahaheel\'s residential and family communities, with every device diagnosed at KCROC\'s Hawalli lab.', landmark: 'Mobile Dispatch Area (Equipment processed at our central Hawalli workshop: Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19)', coords: { lat: 29.0810, lng: 48.1288 }, serviceRadiusKm: 20, serviceAreas: ['Fahaheel', 'Mangaf', 'Abu Halifa', 'Sabah Al-Ahmad Sea City'], contentImage: { src: IMAGES.macbook.logicBoard.src, alt: IMAGES.macbook.logicBoard.alt, width: IMAGES.macbook.logicBoard.width, height: IMAGES.macbook.logicBoard.height, caption: 'MacBook logic board repair for families and residents across Fahaheel.' }, seo: { title: 'Computer Repair Shop Fahaheel Kuwait | KCROC', description: 'Free pickup and delivery for laptop, MacBook, and gaming PC repair across Fahaheel\'s residential and family communities, with every device diagnosed at KCROC\'s Hawalli lab.', canonicalUrl: 'https://www.computerrepairkuwait.com/location/fahaheel', ogType: 'website', schemaTypes: ['LocalBusiness'] }, navigationPriority: 55 } as LocationEntity,

    'loc-mangaf': { id: 'loc-mangaf', slug: 'mangaf', entityType: 'Location', isActive: true, isPhysicalLocation: false, title: 'Mangaf', description: 'Component-level laptop, MacBook, and motherboard repair for Mangaf residents and the wider Ahmadi workforce community, collected and delivered free of charge.', landmark: 'Mobile Dispatch Area (Equipment processed at our central Hawalli workshop: Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19)', coords: { lat: 29.0975, lng: 48.1197 }, serviceRadiusKm: 20, serviceAreas: ['Mangaf', 'Fahaheel', 'Abu Halifa', 'Ahmadi'], contentImage: { src: IMAGES.gaming.waterCooled.src, alt: IMAGES.gaming.waterCooled.alt, width: IMAGES.gaming.waterCooled.width, height: IMAGES.gaming.waterCooled.height, caption: 'Custom water-cooled gaming PC build serviced for the Mangaf community.' }, seo: { title: 'Computer Repair Shop Mangaf Kuwait | KCROC', description: 'Component-level laptop, MacBook, and motherboard repair for Mangaf residents and the wider Ahmadi workforce community, collected and delivered free of charge.', canonicalUrl: 'https://www.computerrepairkuwait.com/location/mangaf', ogType: 'website', schemaTypes: ['LocalBusiness'] }, navigationPriority: 50 } as LocationEntity,

    'loc-abu-halifa': { id: 'loc-abu-halifa', slug: 'abu-halifa', entityType: 'Location', isActive: true, isPhysicalLocation: false, title: 'Abu Halifa', description: 'Laptop, MacBook, and gaming PC repair for Abu Halifa\'s villas and residential compounds, with free pickup and delivery to KCROC\'s Hawalli lab — no need to travel.', landmark: 'Mobile Dispatch Area (Equipment processed at our central Hawalli workshop: Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19)', coords: { lat: 29.1213, lng: 48.1268 }, serviceRadiusKm: 20, serviceAreas: ['Abu Halifa', 'Mangaf', 'Fahaheel', 'Fintas'], contentImage: { src: IMAGES.laptopHardware.hpLaptopMotherboardRepairOpen.src, alt: IMAGES.laptopHardware.hpLaptopMotherboardRepairOpen.alt, width: IMAGES.laptopHardware.hpLaptopMotherboardRepairOpen.width, height: IMAGES.laptopHardware.hpLaptopMotherboardRepairOpen.height, caption: 'Laptop motherboard repair for villas and compounds across Abu Halifa.' }, seo: { title: 'Computer Repair Shop Abu Halifa Kuwait | KCROC', description: 'Laptop, MacBook, and gaming PC repair for Abu Halifa\'s villas and residential compounds, with free pickup and delivery to KCROC\'s Hawalli lab — no need to travel.', canonicalUrl: 'https://www.computerrepairkuwait.com/location/abu-halifa', ogType: 'website', schemaTypes: ['LocalBusiness'] }, navigationPriority: 45 } as LocationEntity,

    // 🚀 NEW: Jabriya, Mubarak Al-Kabeer, Fintas, and Sabah Al-Salem — second
    // batch of previously-uncovered high-value areas. Each again gets a
    // distinct angle and a manually-verified (not just alt-text-matched)
    // contentImage so the growing location cluster keeps reading as
    // genuinely different pages rather than one template with area names
    // swapped in.
    'loc-jabriya': { id: 'loc-jabriya', slug: 'jabriya', entityType: 'Location', isActive: true, isPhysicalLocation: false, title: 'Jabriya', description: 'Fast laptop, MacBook, and gaming PC repair for Jabriya, one of the closest neighborhoods to KCROC\'s Hawalli lab, with free pickup and delivery for students, university staff, and residents.', landmark: 'Mobile Dispatch Area (Equipment processed at our central Hawalli workshop: Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19)', coords: { lat: 29.3186, lng: 48.0154 }, serviceRadiusKm: 10, serviceAreas: ['Jabriya', 'Hawalli', 'Salmiya', 'Shaab', 'Surra'], contentImage: { src: IMAGES.macbook.macbookProOpenMacosScreen.src, alt: IMAGES.macbook.macbookProOpenMacosScreen.alt, width: IMAGES.macbook.macbookProOpenMacosScreen.width, height: IMAGES.macbook.macbookProOpenMacosScreen.height, caption: 'MacBook Pro repair completed for a customer in Jabriya.' }, seo: { title: 'Computer Repair Shop Jabriya Kuwait | KCROC', description: 'Fast laptop, MacBook, and gaming PC repair for Jabriya, one of the closest neighborhoods to KCROC\'s Hawalli lab, with free pickup and delivery for students, university staff, and residents.', canonicalUrl: 'https://www.computerrepairkuwait.com/location/jabriya', ogType: 'website', schemaTypes: ['LocalBusiness'] }, navigationPriority: 40 } as LocationEntity,

    'loc-mubarak-al-kabeer': { id: 'loc-mubarak-al-kabeer', slug: 'mubarak-al-kabeer', entityType: 'Location', isActive: true, isPhysicalLocation: false, title: 'Mubarak Al-Kabeer', description: 'Component-level laptop and motherboard repair for residents across Mubarak Al-Kabeer Governorate, from Adan to Qurain, collected and delivered free of charge to KCROC\'s Hawalli lab.', landmark: 'Mobile Dispatch Area (Equipment processed at our central Hawalli workshop: Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19)', coords: { lat: 29.2436, lng: 48.0783 }, serviceRadiusKm: 25, serviceAreas: ['Mubarak Al-Kabeer', 'Adan', 'Qurain', 'Sabah Al-Salem', 'Qusour'], contentImage: { src: IMAGES.gaming.deepcoolAio.src, alt: IMAGES.gaming.deepcoolAio.alt, width: IMAGES.gaming.deepcoolAio.width, height: IMAGES.gaming.deepcoolAio.height, caption: 'Custom PC build and liquid-cooler servicing for Mubarak Al-Kabeer Governorate.' }, seo: { title: 'Computer Repair Shop Mubarak Al-Kabeer Kuwait | KCROC', description: 'Component-level laptop and motherboard repair for residents across Mubarak Al-Kabeer Governorate, from Adan to Qurain, collected and delivered free of charge to KCROC\'s Hawalli lab.', canonicalUrl: 'https://www.computerrepairkuwait.com/location/mubarak-al-kabeer', ogType: 'website', schemaTypes: ['LocalBusiness'] }, navigationPriority: 35 } as LocationEntity,

    'loc-fintas': { id: 'loc-fintas', slug: 'fintas', entityType: 'Location', isActive: true, isPhysicalLocation: false, title: 'Fintas', description: 'Laptop, MacBook, and gaming PC repair for Fintas and the surrounding coastal communities, with free pickup and delivery to KCROC\'s Hawalli lab — no need to travel.', landmark: 'Mobile Dispatch Area (Equipment processed at our central Hawalli workshop: Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19)', coords: { lat: 29.1362, lng: 48.1256 }, serviceRadiusKm: 15, serviceAreas: ['Fintas', 'Abu Halifa', 'Mangaf', 'Fahaheel'], contentImage: { src: IMAGES.gaming.asusRogCase.src, alt: IMAGES.gaming.asusRogCase.alt, width: IMAGES.gaming.asusRogCase.width, height: IMAGES.gaming.asusRogCase.height, caption: 'Custom gaming PC repair and RGB build servicing for Fintas.' }, seo: { title: 'Computer Repair Shop Fintas Kuwait | KCROC', description: 'Laptop, MacBook, and gaming PC repair for Fintas and the surrounding coastal communities, with free pickup and delivery to KCROC\'s Hawalli lab — no need to travel.', canonicalUrl: 'https://www.computerrepairkuwait.com/location/fintas', ogType: 'website', schemaTypes: ['LocalBusiness'] }, navigationPriority: 30 } as LocationEntity,

    'loc-sabah-al-salem': { id: 'loc-sabah-al-salem', slug: 'sabah-al-salem', entityType: 'Location', isActive: true, isPhysicalLocation: false, title: 'Sabah Al-Salem', description: 'Laptop, MacBook, and motherboard repair for Sabah Al-Salem families and residents, with free door-to-door pickup and delivery to KCROC\'s Hawalli lab.', landmark: 'Mobile Dispatch Area (Equipment processed at our central Hawalli workshop: Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19)', coords: { lat: 29.2075, lng: 48.0975 }, serviceRadiusKm: 15, serviceAreas: ['Sabah Al-Salem', 'Mubarak Al-Kabeer', 'Adan', 'Qurain'], contentImage: { src: IMAGES.laptopHardware.dellLaptopScreenRepairCompleted.src, alt: IMAGES.laptopHardware.dellLaptopScreenRepairCompleted.alt, width: IMAGES.laptopHardware.dellLaptopScreenRepairCompleted.width, height: IMAGES.laptopHardware.dellLaptopScreenRepairCompleted.height, caption: 'Laptop screen repair completed and back in service for a Sabah Al-Salem family.' }, seo: { title: 'Computer Repair Shop Sabah Al-Salem Kuwait | KCROC', description: 'Laptop, MacBook, and motherboard repair for Sabah Al-Salem families and residents, with free door-to-door pickup and delivery to KCROC\'s Hawalli lab.', canonicalUrl: 'https://www.computerrepairkuwait.com/location/sabah-al-salem', ogType: 'website', schemaTypes: ['LocalBusiness'] }, navigationPriority: 25 } as LocationEntity,

    /* ═══════════════════════════════════════════════════════════════
       REVIEWS
    ═══════════════════════════════════════════════════════════════ */
    'reviews-row': { 
      id: 'reviews-row', entityType: 'Reviews', isActive: true, title: 'Verified Google Reviews', aggregateRating: { ratingValue: '4.9', reviewCount: 153 }, 
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
    'faq-liquid-damage': { id: 'faq-liquid-damage', slug: 'liquid-damage', entityType: 'FAQ', isActive: true, title: 'Do you repair liquid-damaged laptops and MacBooks?', description: 'Details about our ultrasonic liquid damage repair process.', answer: 'Yes. We fully disassemble the device, run the logic board through an industrial ultrasonic cleaner to strip corrosion, then trace and replace the specific shorted components using micro-soldering.', seo: { title: 'FAQ: Liquid Damage Repair', description: 'Liquid damage repair process details.', canonicalUrl: 'https://www.computerrepairkuwait.com/faq#liquid-damage', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-no-fix': { id: 'faq-no-fix', slug: 'no-fix', entityType: 'FAQ', isActive: true, title: 'What does No Fix, No Fee mean exactly?', description: 'Our transparent pricing guarantee.', answer: 'If we cannot successfully repair your device after a full diagnostic, you pay absolutely nothing — not for the diagnostic, labor, or parts tested. You only pay if you approve the quote and the repair is successful.', seo: { title: 'FAQ: No Fix No Fee Policy', description: 'How our no fix no fee guarantee works.', canonicalUrl: 'https://www.computerrepairkuwait.com/faq#no-fix', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-warranty': { id: 'faq-warranty', slug: 'warranty', entityType: 'FAQ', isActive: true, title: 'What warranty do you provide on repairs?', description: '30-day warranty coverage details.', answer: 'All successful hardware repairs at KCROC carry a 30-day warranty covering both parts and labor. Screen replacements, battery replacements, and board-level repairs all carry this same 30-day coverage.', seo: { title: 'FAQ: Repair Warranty', description: '30-day warranty on all hardware repairs.', canonicalUrl: 'https://www.computerrepairkuwait.com/faq#warranty', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-data-safe': { id: 'faq-data-safe', slug: 'data-safety', entityType: 'FAQ', isActive: true, title: 'Is my personal data safe during repair?', description: 'Our strict data privacy protocol.', answer: 'Yes. We operate a strict hardware-only, no-snooping policy. For logic board and motherboard repairs, you are welcome to remove your storage drive before handing the device over.', seo: { title: 'FAQ: Data Safety During Repair', description: 'How we protect your data during computer repair.', canonicalUrl: 'https://www.computerrepairkuwait.com/faq#data-safety', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-same-day': { id: 'faq-same-day', slug: 'same-day-repair', entityType: 'FAQ', isActive: true, title: 'Do you offer same-day computer repair in Kuwait?', description: 'Same-day service availability and cutoff times.', answer: 'Yes, same-day repair is available for eligible jobs booked before 11:00 AM. Services typically completed same day include: screen replacements, battery replacements, keyboard repairs, SSD upgrades, and Windows installation.', seo: { title: 'FAQ: Same-Day Repair Service', description: 'Same-day computer repair availability in Kuwait.', canonicalUrl: 'https://www.computerrepairkuwait.com/faq#same-day', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-cost': { id: 'faq-cost', slug: 'repair-cost', entityType: 'FAQ', isActive: true, title: 'How much does computer repair cost in Kuwait?', description: 'Base pricing for common repair services.', answer: 'Diagnostics are free. Screen replacement starts from 20 KWD, battery replacement from 12 KWD, laptop hardware repair from 15 KWD, MacBook repair from 25 KWD, and motherboard chip-level repair from 25 KWD.', seo: { title: 'FAQ: Repair Costs Kuwait', description: 'Computer repair pricing in Kuwait.', canonicalUrl: 'https://www.computerrepairkuwait.com/faq#cost', schemaTypes: ['FAQPage'] } } as FAQEntity,
    
    'faq-macbook-brands': { id: 'faq-macbook-brands', slug: 'macbook-models', entityType: 'FAQ', isActive: true, title: 'Which MacBook models do you repair?', description: 'List of supported Apple MacBook models for repair.', answer: 'We repair all MacBook models including MacBook Air (M1, M2, M3), MacBook Pro 13", 14", and 16" (M1, M2, M3, M3 Pro, M3 Max), and all Intel MacBook models from 2015 onward. This includes logic board micro-soldering, USB-C power IC replacement, screen replacement, battery replacement, and liquid damage recovery for all these models.', seo: { title: 'Which MacBook models do you repair?', description: 'We repair all MacBook Air and Pro models including M1, M2, M3, and Intel variations.', canonicalUrl: 'https://www.computerrepairkuwait.com/faq#macbook-models', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-data-loss': { id: 'faq-data-loss', slug: 'data-loss', entityType: 'FAQ', isActive: true, title: 'Will I lose my data during repair?', description: 'Information regarding data preservation during component repairs.', answer: 'Most hardware repairs — including screen replacement, battery replacement, keyboard repair, and charging port repair — do not affect your data at all. For motherboard and logic board repairs, we repair your original board rather than replacing it, which preserves your data entirely.', seo: { title: 'Will I lose my data during repair?', description: 'Our component-level repair preserves your data completely.', canonicalUrl: 'https://www.computerrepairkuwait.com/faq#data-loss', schemaTypes: ['FAQPage'] } } as FAQEntity,
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
      pricing: { startingFrom: 15, currency: 'KWD', quoteRequired: true, displayLabel: 'From 15 KWD — free diagnostic first' },
      seo: { title: 'Dell Service Center & Laptop Repair Kuwait | KCROC', description: 'Independent Dell laptop repair in Kuwait for Inspiron, Latitude, XPS, G15 and Alienware. Screen, battery, hinge and motherboard repair with free pick-up and drop-off.', canonicalUrl: 'https://www.computerrepairkuwait.com/dell-laptop-repair-kuwait', ogType: 'article', schemaTypes: ['Service'] },
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
      pricing: { startingFrom: 15, currency: 'KWD', quoteRequired: true, displayLabel: 'From 15 KWD — free diagnostic first' },
      seo: { title: 'HP Laptop Repair Kuwait | Free Pickup, No Fix No Fee', description: 'HP EliteBook, Pavilion, ProBook & OMEN repair in Kuwait. Free pickup & drop-off, No Fix No Fee, 30-day warranty. Certified HP technicians in Hawalli.', canonicalUrl: 'https://www.computerrepairkuwait.com/hp-laptop-repair-kuwait', ogType: 'article', schemaTypes: ['Service'] },
      navigationPriority: 80, popular: true 
    } as BrandEntity,

    'brand-lenovo': {
      id: 'brand-lenovo', slug: 'lenovo-laptop-repair-kuwait', entityType: 'Brand', isActive: true,
      title: 'Lenovo Laptop Repair Kuwait', brandName: 'Lenovo', officialWebsite: 'https://www.lenovo.com',
      description: 'Lenovo laptops — specifically IdeaPad and Legion gaming models — frequently encounter chassis stress and thermal issues in Kuwait. Legion models often require specialized cooling maintenance, while IdeaPad hinges are prone to snapping under daily use. We stock replacement parts for ThinkPad, IdeaPad, Yoga, and Legion series.',
      commonModels: ['Legion Pro 5', 'Legion 7', 'IdeaPad 3', 'IdeaPad 5', 'ThinkPad T-Series', 'Yoga 7i'],
      commonIssues: [
        { id: 'lenovo-hinge', title: 'Hinge torn from chassis', severity: 'high', description: 'IdeaPad plastic casing fracturing around the hinge mount.' },
        { id: 'lenovo-thermal', title: 'Legion overheating', severity: 'high', description: 'Thermal throttling causing FPS drops; requires fresh phase-change material.' },
        { id: 'lenovo-charge', title: 'USB-C charging failure', severity: 'medium', description: 'Type-C port physical damage or power delivery IC failure.' },
        { id: 'lenovo-keyboard', title: 'Keyboard keys not working', severity: 'low', description: 'Common on older ThinkPads and IdeaPads from dust accumulation.' }
      ],
      pricing: { startingFrom: 15, currency: 'KWD', quoteRequired: true, displayLabel: 'From 15 KWD — free diagnostic first' },
      seo: { title: 'Lenovo Service Center & Laptop Repair Kuwait | KCROC', description: 'Independent Lenovo laptop repair in Kuwait for Legion, IdeaPad, ThinkPad and Yoga. Gaming thermal issues, hinges, USB-C charging and motherboard faults. Free pick-up and drop-off.', canonicalUrl: 'https://www.computerrepairkuwait.com/lenovo-laptop-repair-kuwait', ogType: 'article', schemaTypes: ['Service'] },
      navigationPriority: 70, popular: true 
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
      pricing: { startingFrom: 15, currency: 'KWD', quoteRequired: true, displayLabel: 'From 15 KWD — free diagnostic first' },
      seo: { title: 'ASUS Service Center & Laptop Repair Kuwait | ROG & TUF | KCROC', description: 'Independent ASUS ROG and TUF laptop repair in Kuwait. Liquid-metal thermal service, motherboard, charging and screen repair with free pick-up and drop-off.', canonicalUrl: 'https://www.computerrepairkuwait.com/asus-laptop-repair-kuwait', ogType: 'article', schemaTypes: ['Service'] },
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
      pricing: { startingFrom: 15, currency: 'KWD', quoteRequired: true, displayLabel: 'From 15 KWD — free diagnostic first' },
      seo: { title: 'Acer Service Center & Laptop Repair Kuwait | Nitro & Predator | KCROC', description: 'Independent Acer laptop repair in Kuwait for Nitro, Predator, Aspire and Swift. Charging-port, cooling, hinge and motherboard diagnostics with free pick-up and drop-off.', canonicalUrl: 'https://www.computerrepairkuwait.com/acer-laptop-repair-kuwait', ogType: 'article', schemaTypes: ['Service'] },
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
      pricing: { startingFrom: 20, currency: 'KWD', quoteRequired: true, displayLabel: 'From 20 KWD — free diagnostic first' },
      seo: { title: 'MSI Laptop Repair Kuwait | Hinge & Motherboard Experts | KCROC', description: 'Professional MSI laptop repair in Kuwait. Specialist in MSI hinge repair, motherboard short circuits, and thermal repasting. Free pick & drop.', canonicalUrl: 'https://www.computerrepairkuwait.com/msi-laptop-repair-kuwait', ogType: 'article', schemaTypes: ['Service'] },
      navigationPriority: 40, popular: false
    } as BrandEntity,

    /* ═══════════════════════════════════════════════════════════════
       PROBLEMS
    ═══════════════════════════════════════════════════════════════ */
    'problem-no-power': {
      id: 'problem-no-power', slug: 'laptop-wont-turn-on', entityType: 'Problem', isActive: true,
      title: 'Laptop Won\'t Turn On (No Power)',
      description: 'Diagnostic guide for laptops that are completely dead with no lights or fan spin.',
      symptom: 'The laptop is completely unresponsive when the power button is pressed. No charging lights illuminate when plugged in, and no fan noise is heard.',
      causes: ['Failed charging port (DC Jack/USB-C)', 'Dead or shorted battery preventing boot', 'Shorted input MOSFET on motherboard', 'Blown main power rail (e.g., PPBUS_G3H on MacBooks)'],
      doNotDo: 'Do not repeatedly forcefully press the power button or wiggle the charging cable, as this can cause sparking and further component damage.',
      solution: 'Component-level board diagnosis using a multimeter to trace voltage drops. Usually resolved by replacing a single shorted capacitor or MOSFET.',
      urgency: 'high',
      relatedServiceIds: ['srv-motherboard', 'srv-laptop'],
      contentImages: [
        { src: IMAGES.laptopHardware.dellChassis.src, alt: IMAGES.laptopHardware.dellChassis.alt, width: IMAGES.laptopHardware.dellChassis.width, height: IMAGES.laptopHardware.dellChassis.height, placement: 'causes', caption: 'Inspecting the chassis and power delivery components on a laptop that won\'t power on.' },
        { src: IMAGES.motherboard.breadboarding.src, alt: IMAGES.motherboard.breadboarding.alt, width: IMAGES.motherboard.breadboarding.width, height: IMAGES.motherboard.breadboarding.height, placement: 'solution', caption: 'Breadboarding the motherboard outside the chassis to trace the shorted component with a multimeter.' },
      ],
      seo: { title: 'Laptop Won\'t Turn On Kuwait — Diagnosis & Repair | KCROC', description: 'Laptop not turning on in Kuwait? We diagnose dead input MOSFETs, blown fuses, and power rail shorts at component level. Free diagnostic. Free pick & drop.', canonicalUrl: 'https://www.computerrepairkuwait.com/laptop-wont-turn-on', ogType: 'article', schemaTypes: ['Article', 'FAQPage'] },
      navigationPriority: 100, popular: true 
    } as ProblemEntity,

    'problem-overheating': {
      id: 'problem-overheating', slug: 'laptop-overheating-kuwait', entityType: 'Problem', isActive: true,
      title: 'Laptop Overheating Kuwait',
      description: 'Diagnostic guide for laptops thermal throttling and shutting down from extreme heat.',
      symptom: 'Laptop extremely hot to touch, fans running at maximum speed, performance dropping under load.',
      causes: ['Dust-blocked cooling fins — most common in Kuwait\'s particulate environment', 'Dried thermal paste — accelerates in 45°C+ summer temperatures', 'Failed or worn fan bearing'],
      doNotDo: 'Do not use a laptop that is thermal throttling on intensive tasks — sustained overheating degrades the CPU and eventually kills the motherboard.',
      solution: 'Ultrasonic cleaning of the cooling system, fresh phase-change thermal material application, and fan inspection. We also check BIOS thermal limits.',
      urgency: 'medium',
      relatedServiceIds: ['srv-laptop', 'srv-gaming', 'srv-gaming-laptop-cleaning'],
      contentImages: [
        { src: IMAGES.laptopHardware.laptopDustCleaningOverheatingKuwait.src, alt: IMAGES.laptopHardware.laptopDustCleaningOverheatingKuwait.alt, width: IMAGES.laptopHardware.laptopDustCleaningOverheatingKuwait.width, height: IMAGES.laptopHardware.laptopDustCleaningOverheatingKuwait.height, placement: 'causes', caption: 'Dust buildup inside the cooling system — the leading cause of overheating in Kuwait\'s climate.' },
        { src: IMAGES.laptopHardware.copperHeatsink2.src, alt: IMAGES.laptopHardware.copperHeatsink2.alt, width: IMAGES.laptopHardware.copperHeatsink2.width, height: IMAGES.laptopHardware.copperHeatsink2.height, placement: 'solution', caption: 'Cleaning the copper heatsink and applying fresh thermal material during the repair.' },
      ],
      seo: { title: 'Laptop Overheating Kuwait — Fix & Thermal Service | KCROC', description: 'Laptop overheating in Kuwait? Kuwait\'s summer heat destroys thermal paste and clogs cooling fins. We deep-clean and re-paste. Free pick & drop. Same-day service.', canonicalUrl: 'https://www.computerrepairkuwait.com/laptop-overheating-kuwait', ogType: 'article', schemaTypes: ['Article', 'FAQPage'] },
      navigationPriority: 90, popular: true 
    } as ProblemEntity,

    'problem-black-screen': {
      id: 'problem-black-screen', slug: 'laptop-black-screen-kuwait', entityType: 'Problem', isActive: true,
      title: 'Laptop Turns On But Screen is Black',
      description: 'Diagnostic guide for laptops that power on (lights/fans) but display nothing on the screen.',
      symptom: 'You press the power button, the keyboard lights up, and you can hear the fans spinning, but the screen remains completely black. Connecting to an external monitor might sometimes show a picture.',
      causes: ['Failed RAM stick or poorly seated RAM', 'Blown backlight fuse on the motherboard', 'Damaged internal display cable', 'Failed GPU (Graphics Processing Unit)', 'Corrupted BIOS firmware'],
      doNotDo: 'Do not repeatedly force-restart the laptop by holding the power button. If the BIOS is trying to recover or update, force-restarting will brick the motherboard permanently.',
      solution: 'We first test RAM and external outputs. If it is a motherboard issue, we use boardview schematics to locate and replace the blown backlight fuse or reflash the BIOS chip directly.',
      urgency: 'high',
      relatedServiceIds: ['srv-screen', 'srv-motherboard'],
      contentImages: [
        { src: IMAGES.laptopHardware.monitorBlueScreenErrorDiagnostic.src, alt: IMAGES.laptopHardware.monitorBlueScreenErrorDiagnostic.alt, width: IMAGES.laptopHardware.monitorBlueScreenErrorDiagnostic.width, height: IMAGES.laptopHardware.monitorBlueScreenErrorDiagnostic.height, placement: 'causes', caption: 'Testing display output on an external monitor to isolate whether the fault is the panel or the board.' },
        { src: IMAGES.laptopHardware.laptopBiosDiagnosticScreenRepair.src, alt: IMAGES.laptopHardware.laptopBiosDiagnosticScreenRepair.alt, width: IMAGES.laptopHardware.laptopBiosDiagnosticScreenRepair.width, height: IMAGES.laptopHardware.laptopBiosDiagnosticScreenRepair.height, placement: 'solution', caption: 'Running BIOS-level diagnostics to locate the blown fuse or corrupted firmware causing the black screen.' },
      ],
      seo: { title: 'Laptop Turns On But Screen is Black — Fix in Kuwait | KCROC', description: 'Laptop has power but a black screen? We diagnose backlight fuses, RAM failures, and dead displays. Free pick & drop in Kuwait.', canonicalUrl: 'https://www.computerrepairkuwait.com/laptop-black-screen-kuwait', ogType: 'article', schemaTypes: ['Article', 'FAQPage'] },
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
      relatedServiceIds: ['srv-motherboard', 'srv-macbook'],
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
      description: 'Troubleshooting a laptop that detects the charger but the battery percentage does not increase.',
      symptom: 'The laptop recognizes the charger is plugged in (Windows says "Plugged in"), but the battery level stays the same or slowly drops. Or, the laptop only works when plugged into the wall and dies instantly if unplugged.',
      causes: ['Severely degraded lithium battery cells', 'Damaged DC-In charging jack', 'Failed charging IC chip on the motherboard', 'Counterfeit or underpowered charger'],
      doNotDo: 'Do not forcefully bend the charging cable at extreme angles trying to "find the sweet spot" to make it charge — this usually breaks the internal port off the motherboard.',
      solution: 'We test your battery health and charger voltage. If the battery is dead, we replace it. If the motherboard charging circuit has failed, we replace the specific charging IC (like the BQ chip or CD3215 on MacBooks).',
      urgency: 'medium',
      relatedServiceIds: ['srv-battery', 'srv-laptop'],
      contentImages: [
        { src: IMAGES.laptopHardware.chargerInventory.src, alt: IMAGES.laptopHardware.chargerInventory.alt, width: IMAGES.laptopHardware.chargerInventory.width, height: IMAGES.laptopHardware.chargerInventory.height, placement: 'causes', caption: 'Testing charger output and battery health — a "plugged in, not charging" fault can be either component.' },
        { src: IMAGES.laptopHardware.dellAdapter.src, alt: IMAGES.laptopHardware.dellAdapter.alt, width: IMAGES.laptopHardware.dellAdapter.width, height: IMAGES.laptopHardware.dellAdapter.height, placement: 'solution', caption: 'Verifying the correct-wattage OEM adapter as part of confirming the actual cause of the charging fault.' },
      ],
      seo: { title: 'Laptop Plugged In But Not Charging — Repair Kuwait | KCROC', description: 'Laptop battery not charging? We diagnose dead batteries, broken charging ports, and failed motherboard power chips. Same-day service available.', canonicalUrl: 'https://www.computerrepairkuwait.com/laptop-plugged-in-not-charging', ogType: 'article', schemaTypes: ['Article', 'FAQPage'] },
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
      relatedServiceIds: ['srv-laptop', 'srv-macbook'],
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
      relatedServiceIds: ['srv-laptop', 'srv-gaming'],
      contentImages: [
        { src: IMAGES.upgrades.hddSeagate.src, alt: IMAGES.upgrades.hddSeagate.alt, width: IMAGES.upgrades.hddSeagate.width, height: IMAGES.upgrades.hddSeagate.height, placement: 'causes', caption: 'An aging mechanical hard drive — one of the most common causes of a laptop that takes minutes to boot.' },
        { src: IMAGES.upgrades.ssdSamsung2.src, alt: IMAGES.upgrades.ssdSamsung2.alt, width: IMAGES.upgrades.ssdSamsung2.width, height: IMAGES.upgrades.ssdSamsung2.height, placement: 'solution', caption: 'Cloning the system to a new SSD — the fix that cuts boot times from minutes to seconds.' },
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
      relatedServiceIds: ['srv-laptop', 'srv-screen'],
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
      seo: { title: 'Laptop Screen Cracked in Kuwait? Same-Day Replacement | KCROC', description: 'Cracked, shattered, or bleeding laptop screen? We fit OEM-spec panels matched to your model, often same-day. Free pick & drop across Kuwait.', canonicalUrl: 'https://www.computerrepairkuwait.com/laptop-screen-cracked-kuwait', ogType: 'article', schemaTypes: ['Article', 'FAQPage'] },
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
      seo: { title: 'Computer Freezing or Crashing Randomly? Fix in Kuwait | KCROC', description: 'Laptop or PC freezing, locking up, or restarting on its own? We stress-test RAM, thermals, storage, and power to find the real cause. Free pick & drop.', canonicalUrl: 'https://www.computerrepairkuwait.com/computer-freezing-crashing-kuwait', ogType: 'article', schemaTypes: ['Article', 'FAQPage'] },
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
        { src: IMAGES.laptopHardware.dellChassis.src, alt: IMAGES.laptopHardware.dellChassis.alt, width: IMAGES.laptopHardware.dellChassis.width, height: IMAGES.laptopHardware.dellChassis.height, placement: 'causes', caption: 'Inspecting a customer laptop before starting an out-of-OS malware scan.' },
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
      description: 'Real repair case study of a coffee-damaged MacBook Pro M2 logic board restoration.',
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
      deviceModel: 'MacBook Pro 14\" M2 Pro',
      brandId: undefined,
      serviceIds: ['srv-macbook', 'srv-motherboard'],
      problemIds: ['problem-liquid-spill'],
      locationId: 'loc-salmiya',
      authorId: 'https://www.computerrepairkuwait.com/author/imran#person',
      repairCategory: 'Logic board liquid-damage repair',
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
        altText: 'MacBook Pro M2 logic board diagnostic and repair after coffee spill damage'
      },
      seo: { title: 'MacBook Pro M2 Liquid Damage Repair Kuwait — Real Case Study | KCROC', description: 'Coffee spill destroyed a MacBook Pro M2 in Salmiya. KCROC repaired the logic board for 65 KWD, preserving all data. Apple wanted 280 KWD for a board swap.', canonicalUrl: 'https://www.computerrepairkuwait.com/case-studies/macbook-liquid-damage-salmiya', ogType: 'article', schemaTypes: ['Article', 'BreadcrumbList', 'ImageObject'] },
      
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
        closingOutcome: 'The MacBook powered on and passed full hardware diagnostics. Because the original logic board was repaired rather than replaced, the onboard storage — soldered directly to that board and tied to its Secure Enclave — was never touched, so all client data was preserved. The device was back in Salmiya within 36 hours, at 65 KWD versus the 280 KWD board-swap quote: a 215 KWD saving, with data intact and a 30-day warranty included.',
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
      seo: { title: 'ASUS ROG Dead Motherboard Repair Hawalli — Case Study | KCROC', description: 'Dead ASUS ROG Strix gaming laptop restored via chip-level micro-soldering in Hawalli. Saved customer 300+ KWD on a replacement board.', canonicalUrl: 'https://www.computerrepairkuwait.com/case-studies/asus-rog-dead-motherboard-hawalli', ogType: 'article', schemaTypes: ['Article', 'BreadcrumbList', 'ImageObject'] },
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
          { label: 'Battery Replacement Kuwait', path: '/battery-replacement-kuwait' }
        ],
        company: [
          { label: 'About us',       path: '/about' },
          { label: 'Contact',        path: '/contact' },
          { label: 'Tech Blog',      path: '/blog' },
          { label: 'Battery Health Guide', path: '/guides/laptop-battery-warning-signs' },
          { label: 'FAQ',            path: '/faq' },
          { label: 'Pricing',        path: '/pricing' },
          { label: 'Computer Repair Near Me', path: '/near-me' },
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
        ]
      }
    } as FooterEntity,
  }
};

/* ═══════════════════════════════════════════════════════════════════
   KCROC_GRAPH SINGLETON — consumed by all UI components and SEO Engine
   Contains strict null-safe fallbacks (?? []) to ensure 100% build stability.
═══════════════════════════════════════════════════════════════════ */
const allEntities = Object.values(rawGraphData.entities);

export const GRAPH_INDEXES = rawGraphData.entities;

export const KCROC_GRAPH = {
  ...rawGraphData,
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
  reviewCount:  153,
  bestRating:   5,
};
