// File: app/frontend/src/data/graph.ts
import {
  RawGraphData, RoutableEntity, LocationEntity, ServiceEntity,
  FAQEntity, WebPageEntity, BusinessEntity, USPEntity, TrustBadgeEntity,
  ProcessEntity, StatsEntity, FooterEntity, ReviewsEntity
} from '../types/knowledgeGraph';

const rawGraphData: RawGraphData = {
  metadata: {
    version: '3.2.0',
    lastUpdated: '2026-07-08T00:00:00+03:00',
    environment: 'production'
  },

  entities: {

    /* ═══════════════════════════════════════════════════════════════
       BUSINESS ENTITY — Primary anchor for all schema @id references
       ═══════════════════════════════════════════════════════════════ */
    'biz-kcroc': {
      id: 'biz-kcroc',
      entityType: 'Business',
      isActive: true,
      title: 'Kuwait Computer Repair On Call',
      legalName: 'Kuwait Computer Repair On Call',
      alternateName: 'KCROC',
      telephone: '96555301913',
      streetAddress: 'Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19',
      addressLocality: 'Hawalli',
      addressRegion: 'Hawalli Governorate',
      addressCountry: 'KW',
      coords: { lat: 29.3356, lng: 48.0250 },
      websiteUrl: 'https://www.computerrepairkuwait.com',
      logoUrl: 'https://www.computerrepairkuwait.com/logo.png',
      email: 'quadrillion1980@gmail.com',
      priceRange: '$$',
      openingHours: 'Open daily 10:00 AM – 10:00 PM',
      schemaOpeningHours: {
        dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
        opens: '10:00',
        closes: '22:00'
      },
      aggregateRating: {
        ratingValue: '4.9',
        reviewCount: 150,
        bestRating: 5
      },
      socialLinks: {
        facebook: 'https://www.facebook.com/computerrepairkuwait',
        instagram: 'https://www.instagram.com/computerrepairkuwait'
      },
      aiSummary: 'Kuwait Computer Repair On Call (KCROC) is a Hawalli-based component-level computer repair specialist. Services include MacBook logic board micro-soldering, laptop screen replacement, gaming PC thermal repair, motherboard chip-level diagnostics, SSD upgrades, and virus removal. Free pickup and delivery across all Kuwait governorates. 30-day warranty on all repairs. No Fix, No Fee policy.',
    } as BusinessEntity,

    /* ═══════════════════════════════════════════════════════════════
       TRUST BADGES
       ═══════════════════════════════════════════════════════════════ */
    'badge-privacy':  { id: 'badge-privacy',  entityType: 'TrustBadge', isActive: true, title: 'Data Privacy Guaranteed', iconKey: 'ShieldCheck' } as TrustBadgeEntity,
    'badge-pickup':   { id: 'badge-pickup',   entityType: 'TrustBadge', isActive: true, title: 'Free Pick & Drop',        iconKey: 'Truck'       } as TrustBadgeEntity,
    'badge-warranty': { id: 'badge-warranty', entityType: 'TrustBadge', isActive: true, title: '30-Day Warranty',          iconKey: 'Clock'       } as TrustBadgeEntity,
    'badge-esd':      { id: 'badge-esd',      entityType: 'TrustBadge', isActive: true, title: 'ESD-Safe Lab',             iconKey: 'Zap'         } as TrustBadgeEntity,

    /* ═══════════════════════════════════════════════════════════════
       STATS
       ═══════════════════════════════════════════════════════════════ */
    'stats-row': {
      id: 'stats-row', entityType: 'Stats', isActive: true, title: 'Homepage Stats',
      items: [
        { label: 'Repairs completed', value: '500+',    sub: 'Since launch across Kuwait' },
        { label: 'Success rate',       value: '98%',     sub: 'On complex logic board repairs' },
        { label: 'Warranty',           value: '30 days', sub: 'All parts and labour' },
        { label: 'Pick & drop',        value: 'Free',    sub: 'Zero hidden transport fees' }
      ]
    } as StatsEntity,

    /* ═══════════════════════════════════════════════════════════════
       USPs — Core Business Differentiators
       ═══════════════════════════════════════════════════════════════ */
    'usp-component': {
      id: 'usp-component', entityType: 'USP', isActive: true, iconKey: 'Cpu',
      title: 'Component-Level Repair',
      description: 'We diagnose the board itself using micro-soldering and trace repair — not just replace it. This saves you from paying for an entirely new motherboard and keeps your original data intact.',
      differentiator: 'Most shops in Kuwait replace the whole board. We fix the one failed chip.'
    } as USPEntity,
    'usp-nofix': {
      id: 'usp-nofix', entityType: 'USP', isActive: true, iconKey: 'ShieldCheck',
      title: 'No Fix, No Fee',
      description: 'Our diagnostics are precise and risk-free. If your device is catastrophically damaged or not economically repairable, you pay absolutely nothing — not even for the diagnostic.',
      differentiator: 'You only pay when your device is fully repaired and working.'
    } as USPEntity,
    'usp-logistics': {
      id: 'usp-logistics', entityType: 'USP', isActive: true, iconKey: 'Truck',
      title: 'Free Pick & Drop — All Kuwait',
      description: 'We cover Hawalli, Salmiya, Kuwait City, Farwaniya, Ahmadi, Jahra, and beyond. Our courier collects from your home or office and returns the repaired device directly to you.',
      differentiator: 'No need to leave your home or office. We handle the traffic.'
    } as USPEntity,
    'usp-privacy': {
      id: 'usp-privacy', entityType: 'USP', isActive: true, iconKey: 'Lock',
      title: 'Strict Data Privacy',
      description: 'We operate under strict hardware-only protocols. Our technicians use diagnostic tools — not your files. For board-level repairs, you can safely remove your hard drive before handing over the device.',
      differentiator: 'Your personal files are never opened, accessed, or browsed during repair.'
    } as USPEntity,
    'usp-climate': {
      id: 'usp-climate', entityType: 'USP', isActive: true, iconKey: 'Thermometer',
      title: 'Kuwait Climate Expertise',
      description: 'Kuwait\'s extreme heat and dust accelerate hardware failure. We apply phase-change thermal materials and perform ultrasonic cleaning specifically tuned for our climate — not generic procedures.',
      differentiator: 'We know exactly how Kuwait summers destroy laptops. We fix that specifically.'
    } as USPEntity,

    /* ═══════════════════════════════════════════════════════════════
       PROCESS
       ═══════════════════════════════════════════════════════════════ */
    'proc-standard': {
      id: 'proc-standard', entityType: 'Process', isActive: true, title: 'Standard Repair Process',
      steps: [
        {
          step: 1,
          title: 'Free collection — we come to you',
          description: 'Book via WhatsApp. Our driver collects your device directly from your doorstep across all Kuwait — no deposit, no minimum spend. We tag and log every device for full chain-of-custody tracking.'
        },
        {
          step: 2,
          title: 'Precision diagnostic — no guesswork',
          description: 'Your device enters our Hawalli lab where technicians use thermal imaging, digital multimeters, and boardview software to trace the exact component failure. You receive a fixed quote before we touch a tool.'
        },
        {
          step: 3,
          title: 'Repair, stress-test, and return',
          description: 'We execute the micro-soldering or hardware replacement, then stress-test the system under full load for stability. If it passes, we deliver it back. If we can\'t fix it, you pay nothing.'
        }
      ]
    } as ProcessEntity,

    /* ═══════════════════════════════════════════════════════════════
       PAGES
       ═══════════════════════════════════════════════════════════════ */
    'page-home': {
      id: 'page-home', slug: '', entityType: 'WebPage', isActive: true,
      title: 'Home',
      description: 'KCROC Homepage — Component-level computer repair in Kuwait',
      seo: {
        title: 'Computer Repair Kuwait | Laptop & MacBook Repair – Free Pick & Drop | Kuwait Computer Repair On Call',
        description: 'Same-day laptop, MacBook & PC repair in Kuwait by KCROC. Free Pick & Drop across Hawalli, Salmiya, Kuwait City & all governorates. 4.9★ rated, 30-day warranty. Call +965 55301913.',
        canonicalUrl: 'https://www.computerrepairkuwait.com',
        ogType: 'website',
        schemaTypes: ['LocalBusiness', 'WebSite', 'WebPage']
      },
      hero: {
        headline: 'Kuwait\'s Expert Component-Level Repair Service.',
        subheadline: 'We fix the board. We don\'t just swap it.',
        description: 'We diagnose and repair failed components at board level — restoring devices that most repair shops in Kuwait would simply declare beyond repair.',
        primaryCTA:   { text: 'WhatsApp a Technician', route: 'https://wa.me/96555301913' },
        secondaryCTA: { text: 'View All Services',      route: '/services' }
      },
      featuredFAQIds:   ['faq-pick-and-drop', 'faq-liquid-damage', 'faq-no-fix'],
      featuredUSPIds:   ['usp-component', 'usp-nofix', 'usp-logistics', 'usp-privacy']
    } as WebPageEntity,

    'page-services': {
      id: 'page-services', slug: 'services', entityType: 'WebPage', isActive: true,
      title: 'Services',
      description: 'All KCROC repair services',
      seo: {
        title: 'Computer Repair Services in Kuwait | Laptop, MacBook & PC | KCROC',
        description: 'Expert laptop repair, MacBook repair, gaming PC diagnostics, motherboard chip-level repair, and screen replacement in Kuwait. Free pickup. 30-day warranty.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/services',
        ogType: 'website',
        schemaTypes: ['CollectionPage', 'LocalBusiness']
      }
    } as WebPageEntity,

    /* ═══════════════════════════════════════════════════════════════
       SERVICES
       ═══════════════════════════════════════════════════════════════ */
    'srv-macbook': {
      id: 'srv-macbook', slug: 'macbook-repair-kuwait', entityType: 'Service', isActive: true,
      title: 'MacBook Repair Kuwait',
      iconKey: 'apple',
      shortDescription: 'Liquid spills, dead logic boards, USB-C failures. Chip-level Apple hardware restoration.',
      description: 'Our MacBook repair service goes beyond what Apple Authorized Centers offer. Instead of replacing your entire logic board — which deletes all your data and costs hundreds of KWD — we isolate the exact failed chip using thermal imaging and micro-soldering. We repair CD3215 USB-C controllers, LP8550 backlight drivers, and PPBUS power rail shorts. Your original board is preserved. Your data stays intact.',
      repairLevel: 'chip-level',
      estimatedTurnaround: '24-48 Hours',
      pricing: {
        startingFrom: 25,
        currency: 'KWD',
        quoteRequired: true,
        displayLabel: 'From 25 KWD — free diagnostic first'
      },
      coreFeatures: [
        'Logic Board Micro-Soldering (M1, M2, M3, Intel)',
        'USB-C Power IC Replacement (CD3215/CD3217)',
        'Liquid Damage Ultrasonic Cleaning',
        'MacBook Screen & Battery Replacement',
        'Data Preserved on Original Board',
        'Free Pick & Drop Across Kuwait',
        '30-Day Warranty · No Fix, No Fee'
      ],
      brands: ['MacBook Air', 'MacBook Pro 13"', 'MacBook Pro 14"', 'MacBook Pro 16"'],
      commonIssues: [
        { id: 'no-power',       title: 'No power / dead device',       severity: 'high',   description: 'USB-C power negotiation failure or PPBUS short circuit.' },
        { id: 'black-screen',   title: 'Black screen — fans running',      severity: 'high',   description: 'Backlight fuse blown or LP8550 display IC failure.' },
        { id: 'liquid-damage',  title: 'Liquid spill damage',              severity: 'high',   description: 'Corrosion on logic board rails from spills.' },
        { id: 'no-charge',      title: 'Not charging at all',              severity: 'medium', description: 'CD3215/CD3217 USB-C controller failure.' },
        { id: 'battery-health', title: 'Swollen or degraded battery',     severity: 'medium', description: 'Lithium cell degradation from Kuwait heat cycling.' }
      ],
      warranty: { duration: '30 Days', coverage: 'All parts and labor.', noFixNoFee: true },
      seo: {
        title: 'MacBook Repair Kuwait | Logic Board Experts | No Fix No Fee | KCROC',
        description: 'Expert Apple MacBook repair in Kuwait. Logic board micro-soldering, USB-C power repair, liquid damage recovery, and data preservation. Free pick & drop. No Fix, No Charge.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/macbook-repair-kuwait',
        ogType: 'article',
        schemaTypes: ['Service', 'FAQPage']
      }
    } as ServiceEntity,

    'srv-laptop': {
      id: 'srv-laptop', slug: 'laptop-repair-kuwait', entityType: 'Service', isActive: true,
      title: 'Laptop Repair Kuwait',
      iconKey: 'laptop',
      shortDescription: 'Screen, battery, keyboard, charging port, and motherboard repair for all Windows brands.',
      description: 'Kuwait\'s climate — extreme heat, dust, and constant AC cycling — causes specific hardware failure patterns in Windows laptops. We diagnose and repair the exact fault component rather than replacing the entire unit. From ASUS ROG thermal throttling to Dell screen flicker, HP charging port failures to Lenovo keyboard issues — we fix what others replace.',
      repairLevel: 'advanced',
      estimatedTurnaround: 'Same Day / 24 Hours',
      pricing: {
        startingFrom: 15,
        currency: 'KWD',
        quoteRequired: true,
        displayLabel: 'From 15 KWD — free diagnostic first'
      },
      coreFeatures: [
        'Screen Replacement (LCD, IPS, OLED)',
        'Battery Replacement (OEM & Compatible)',
        'Keyboard & Trackpad Repair',
        'Charging Port (DC Jack & USB-C)',
        'Thermal Paste & Fan Cleaning',
        'SSD Upgrade & Windows Installation',
        'Free Pick & Drop Across Kuwait',
        '30-Day Warranty · No Fix, No Fee'
      ],
      brands: ['Dell', 'HP', 'Lenovo', 'ASUS', 'Acer', 'MSI', 'Samsung', 'Huawei', 'Toshiba'],
      commonIssues: [
        { id: 'screen-crack',    title: 'Cracked or broken screen',        severity: 'high',   description: 'Physical impact or hinge stress causing panel damage.' },
        { id: 'no-charge',       title: 'Not charging / charging port',    severity: 'high',   description: 'Damaged DC jack or USB-C charging port.' },
        { id: 'overheating',     title: 'Overheating & fan noise',         severity: 'medium', description: 'Dust-blocked cooling fins, dried thermal paste.' },
        { id: 'slow-boot',       title: 'Extremely slow performance',      severity: 'medium', description: 'Failing HDD or insufficient RAM for Windows 11.' },
        { id: 'battery-drain',   title: 'Battery dying quickly',           severity: 'low',    description: 'Degraded lithium cells from heat exposure.' }
      ],
      warranty: { duration: '30 Days', coverage: 'All parts and labor.', noFixNoFee: true },
      seo: {
        title: 'Laptop Repair Kuwait | All Brands | Free Pick & Drop | KCROC',
        description: 'Professional Windows laptop repair in Kuwait. Screen replacement, battery, keyboard, charging port, and motherboard repairs for Dell, HP, Lenovo, ASUS. Free pick & drop. 30-day warranty.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/laptop-repair-kuwait',
        ogType: 'article',
        schemaTypes: ['Service', 'FAQPage']
      }
    } as ServiceEntity,

    'srv-gaming': {
      id: 'srv-gaming', slug: 'gaming-pc-repair-kuwait', entityType: 'Service', isActive: true,
      title: 'Gaming PC Repair Kuwait',
      iconKey: 'gaming',
      shortDescription: 'GPU diagnostics, thermal throttling fixes, FPS tuning, and custom cooling for gaming rigs.',
      description: 'Gaming PCs in Kuwait face a unique enemy: sustained 45°C+ ambient temperatures that destroy thermal interfaces and push VRM circuits beyond safe limits. We solve the hardware problems that cost you frames — GPU artifacting, AIO pump failures, VRM overheating, and BIOS instability. After repair, we benchmark your rig to confirm stable performance before returning it.',
      repairLevel: 'advanced',
      estimatedTurnaround: 'Same Day / 24 Hours',
      pricing: {
        startingFrom: 25,
        currency: 'KWD',
        quoteRequired: true,
        displayLabel: 'From 25 KWD — free diagnostic first'
      },
      coreFeatures: [
        'GPU Diagnostics & Artifacting Fix',
        'Thermal Re-Paste with Liquid Metal',
        'AIO & Custom Loop Maintenance',
        'VRM Overheating Diagnosis',
        'BIOS Update & Memory Tuning (XMP/EXPO)',
        'Windows Gaming Optimization',
        'FPS Benchmarking After Repair',
        'Free Pick & Drop Across Kuwait',
        '30-Day Warranty · No Fix, No Fee'
      ],
      brands: ['ASUS ROG', 'MSI', 'Alienware', 'Acer Predator', 'Lenovo Legion', 'Custom Builds'],
      commonIssues: [
        { id: 'fps-drops',      title: 'Severe FPS drops & stuttering',   severity: 'high',   description: 'CPU/GPU thermal throttling or RAM timing issues.' },
        { id: 'gpu-artifacts',  title: 'GPU artifacting / crashes',        severity: 'high',   description: 'GPU VRAM failure or cooling inadequacy.' },
        { id: 'thermal-limit',  title: 'Hitting thermal limits',           severity: 'high',   description: 'Dried liquid metal or blocked radiator.' },
        { id: 'game-crash',     title: 'Game crashes to desktop',         severity: 'medium', description: 'PSU instability or memory errors.' },
        { id: 'no-post',        title: 'PC won\'t boot / POST failure',   severity: 'high',   description: 'RAM seating, GPU failure, or BIOS corruption.' }
      ],
      warranty: { duration: '30 Days', coverage: 'All parts and labor.', noFixNoFee: true },
      seo: {
        title: 'Gaming PC Repair Kuwait | FPS & Thermal Fix | KCROC',
        description: 'Stop FPS drops and thermal throttling. Expert gaming PC repair in Kuwait — GPU diagnostics, liquid metal application, AIO maintenance, and FPS tuning. Free pick & drop.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/gaming-pc-repair-kuwait',
        ogType: 'article',
        schemaTypes: ['Service', 'FAQPage']
      }
    } as ServiceEntity,

    'srv-motherboard': {
      id: 'srv-motherboard', slug: 'motherboard-repair-kuwait', entityType: 'Service', isActive: true,
      title: 'Motherboard Repair Kuwait',
      iconKey: 'cpu',
      shortDescription: 'Chip-level diagnostics and micro-soldering for boards others declare unfixable.',
      description: 'Most repair shops in Kuwait replace the entire motherboard for 120–300 KWD, losing your data in the process. We isolate the fault to the individual component level — a blown input MOSFET, a shorted capacitor, a cracked BGA solder joint — and replace just that part. In over 85% of "dead board" cases, the board is fully repairable for a fraction of the replacement cost.',
      repairLevel: 'chip-level',
      estimatedTurnaround: '24-48 Hours',
      pricing: {
        startingFrom: 25,
        currency: 'KWD',
        quoteRequired: true,
        displayLabel: 'From 25 KWD — 60–80% cheaper than replacement'
      },
      coreFeatures: [
        'Power Rail Tracing & Short Circuit Repair',
        'MOSFET & Capacitor Replacement',
        'BGA Rework & Reballing',
        'Liquid Damage Ultrasonic Cleaning',
        'BIOS Chip Reflashing',
        'USB-C Power Delivery IC Repair',
        'Data Preserved on Original Drive',
        'Free Pick & Drop Across Kuwait',
        '30-Day Warranty · No Fix, No Fee'
      ],
      brands: ['Apple MacBook', 'Dell', 'HP', 'ASUS ROG', 'Lenovo Legion', 'MSI'],
      commonIssues: [
        { id: 'no-power',      title: 'Dead laptop — no power at all',    severity: 'high',   description: 'Input MOSFET or PPBUS_G3H power rail short.' },
        { id: 'fans-no-screen', title: 'Fans spin, black screen',         severity: 'high',   description: 'Backlight circuit or display power IC failure.' },
        { id: 'liquid-damage',  title: 'Liquid spill damage',              severity: 'high',   description: 'Conductive mineral deposits shorting the board.' },
        { id: 'bios-corrupt',   title: 'BIOS corruption / not booting',  severity: 'medium', description: 'BIOS chip failure or corrupted firmware.' },
        { id: 'usb-c-fail',     title: 'USB-C not charging',               severity: 'medium', description: 'CD3215 USB-C controller IC failure.' }
      ],
      warranty: { duration: '30 Days', coverage: 'All parts and labor.', noFixNoFee: true },
      seo: {
        title: 'Motherboard Repair Kuwait | Chip-Level Fix | No Fix No Fee | KCROC',
        description: 'Expert motherboard repair in Kuwait. Chip-level micro-soldering, power rail diagnostics, liquid damage recovery. 60–80% cheaper than replacement. Free pick & drop.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/motherboard-repair-kuwait',
        ogType: 'article',
        schemaTypes: ['Service', 'FAQPage']
      }
    } as ServiceEntity,

    'srv-screen': {
      id: 'srv-screen', slug: 'laptop-screen-repair-kuwait', entityType: 'Service', isActive: true,
      title: 'Screen Replacement Kuwait',
      iconKey: 'monitor',
      shortDescription: 'LCD, IPS, OLED, and Retina display panel replacements. Same day for most models.',
      description: 'A cracked or flickering laptop screen doesn\'t mean a new laptop. We source and fit OEM and high-grade compatible panels for all major brands — from budget LCD panels starting at 20 KWD to MacBook Retina displays. We also diagnose display cable failures that cause flickering without requiring a full panel replacement.',
      repairLevel: 'basic',
      estimatedTurnaround: 'Same Day',
      pricing: {
        startingFrom: 20,
        currency: 'KWD',
        quoteRequired: false,
        displayLabel: 'From 20 KWD — exact price by model'
      },
      coreFeatures: [
        'LCD, IPS & OLED Panel Replacement',
        'MacBook Retina Display Replacement',
        'Display Cable Repair (Flickering Fix)',
        'Touch Screen Digitizer Replacement',
        'Same-Day Service (Most Models)',
        'Free Pick & Drop Across Kuwait',
        '30-Day Warranty'
      ],
      brands: ['Dell', 'HP', 'Lenovo', 'ASUS', 'Acer', 'MSI', 'MacBook Air', 'MacBook Pro'],
      commonIssues: [
        { id: 'cracked',    title: 'Cracked or shattered screen',     severity: 'high',   description: 'Physical impact or dropped device.' },
        { id: 'flickering', title: 'Screen flickering or flashing',   severity: 'medium', description: 'Loose display cable or backlight driver.' },
        { id: 'lines',      title: 'Vertical/horizontal lines',       severity: 'medium', description: 'Panel damage or GPU signal failure.' },
        { id: 'black',      title: 'Black screen — laptop on',        severity: 'high',   description: 'Backlight fuse or display power circuit.' },
        { id: 'dead-pixels', title: 'Dead pixels or discolouration',  severity: 'low',    description: 'Panel degradation from heat exposure.' }
      ],
      warranty: { duration: '30 Days', coverage: 'Screen panel and labor.', noFixNoFee: false },
      seo: {
        title: 'Laptop Screen Replacement Kuwait | Same Day | From 20 KWD | KCROC',
        description: 'Professional laptop and MacBook screen replacement in Kuwait. LCD, IPS, OLED & Retina displays. Same-day service available. From 20 KWD. Free pick & drop.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/laptop-screen-repair-kuwait',
        ogType: 'article',
        schemaTypes: ['Service', 'FAQPage']
      }
    } as ServiceEntity,

    'srv-battery': {
      id: 'srv-battery', slug: 'battery-replacement', entityType: 'Service', isActive: true,
      title: 'Battery Replacement Kuwait',
      iconKey: 'battery',
      shortDescription: 'OEM and compatible battery replacement for laptops and MacBooks.',
      description: 'Kuwait\'s extreme heat accelerates lithium battery degradation far faster than in temperate climates. A laptop battery rated for 5 years may fail in 18–24 months here. We replace batteries with OEM or high-grade compatible cells and optimize thermal settings to extend the new battery\'s life in Kuwait\'s conditions.',
      repairLevel: 'basic',
      estimatedTurnaround: 'Same Day',
      pricing: {
        startingFrom: 12,
        currency: 'KWD',
        quoteRequired: true,
        displayLabel: 'From 12 KWD by model'
      },
      coreFeatures: [
        'OEM & High-Grade Compatible Batteries',
        'MacBook Battery Replacement (All Models)',
        'Swollen Battery Emergency Removal',
        'Battery Health Calibration',
        'Thermal Optimization Post-Replacement',
        'Same-Day Service Available',
        'Free Pick & Drop · 30-Day Warranty'
      ],
      brands: ['MacBook', 'Dell', 'HP', 'Lenovo', 'ASUS', 'Acer'],
      commonIssues: [
        { id: 'no-charge',   title: 'Battery not charging',             severity: 'high',   description: 'Cell failure or charging circuit issue.' },
        { id: 'swollen',     title: 'Swollen / bulging battery',       severity: 'high',   description: 'Gas buildup from thermal cycling — urgent.' },
        { id: 'fast-drain',  title: 'Battery dies in under 1 hour',   severity: 'medium', description: 'Cell capacity below 40% — replace needed.' },
        { id: 'plugin-only', title: 'Only works when plugged in',       severity: 'medium', description: 'Battery no longer holding any charge.' }
      ],
      warranty: { duration: '30 Days', coverage: 'Battery and labor.', noFixNoFee: true },
      seo: {
        title: 'Laptop Battery Replacement Kuwait | Same Day | KCROC',
        description: 'Fast laptop and MacBook battery replacement in Kuwait. OEM and high-grade compatible batteries. Swollen battery emergency service. From 12 KWD. Free pick & drop.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/battery-replacement',
        ogType: 'article',
        schemaTypes: ['Service']
      }
    } as ServiceEntity,

    /* ═══════════════════════════════════════════════════════════════
       LOCATION
       ═══════════════════════════════════════════════════════════════ */
    'loc-hawalli': {
      id: 'loc-hawalli', slug: 'hawalli', entityType: 'Location', isActive: true,
      title: 'Hawalli Repair Center',
      description: 'Kuwait\'s premier component-level repair facility, located in the heart of Hawalli on Ibn Khaldoun Street.',
      landmark: 'Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19',
      coords: { lat: 29.3356, lng: 48.0250 },
      serviceRadiusKm: 40,
      serviceAreas: [
        'Hawalli', 'Salmiya', 'Kuwait City', 'Farwaniya', 'Ahmadi',
        'Jahra', 'Fahaheel', 'Mangaf', 'Mahboula', 'Abu Halifa',
        'Khaitan', 'Sabah Al Salem', 'Mubarak Al Kabeer', 'Riqqa', 'Shuwaikh'
      ],
      seo: {
        title: 'Computer Repair Shop Hawalli Kuwait | Ibn Khaldoun St | KCROC',
        description: 'Visit KCROC at Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19, Hawalli. Component-level repair for laptops, MacBooks, and gaming PCs. Open daily 10 AM – 10 PM.',
        canonicalUrl: 'https://www.computerrepairkuwait.com/location/hawalli',
        ogType: 'website',
        schemaTypes: ['LocalBusiness']
      }
    } as LocationEntity,

    /* ═══════════════════════════════════════════════════════════════
       REVIEWS
       ═══════════════════════════════════════════════════════════════ */
    'reviews-row': {
      id: 'reviews-row', entityType: 'Reviews', isActive: true, title: 'Verified Google Reviews',
      aggregateRating: { ratingValue: '4.9', reviewCount: 150 },
      items: [
        {
          name: 'Ahmad Al-Sabah',
          location: 'Salmiya',
          time: '2 weeks ago',
          rating: 5,
          device: 'MacBook Pro — Screen Replacement',
          text: 'Picked it up from Salmiya, fixed the MacBook Pro screen in 24 hours, price exactly as quoted. Zero surprises. Every other shop wanted double the price and 5 days.'
        },
        {
          name: 'Sarah M.',
          location: 'Hawalli',
          time: '1 month ago',
          rating: 5,
          device: 'Laptop — Motherboard Repair',
          text: 'Motherboard died right before my university midterms. KCROC diagnosed it the same day, fixed the board without losing my files, and returned it in 48 hours. Every other shop told me to buy a new laptop.'
        },
        {
          name: 'Tariq K.',
          location: 'Kuwait City',
          time: '3 months ago',
          rating: 5,
          device: 'Gaming PC — Thermal Repair',
          text: 'Was losing 40 FPS in Warzone because of throttling. KCROC diagnosed it in 5 minutes — dried liquid metal on the CPU. Reapplied, cleaned the radiator, temps dropped 22°C. Back to 165 FPS locked.'
        }
      ]
    } as ReviewsEntity,

    /* ═══════════════════════════════════════════════════════════════
       FAQS — High-density privacy and delivery content
       ═══════════════════════════════════════════════════════════════ */
    'faq-pick-and-drop': {
      id: 'faq-pick-and-drop', slug: 'pick-and-drop', entityType: 'FAQ', isActive: true,
      title: 'Do you offer a pick and drop service across Kuwait?',
      description: 'Information on free pickup and delivery.',
      answer: 'Yes. Kuwait Computer Repair On Call provides completely free pickup and delivery across all Kuwait governorates — including Hawalli, Salmiya, Kuwait City, Farwaniya, Ahmadi, Jahra, Fahaheel, Mangaf, and Mahboula. Book via WhatsApp at any time. Our driver collects your device directly from your home or office, tags it for secure chain-of-custody tracking, and returns it fully repaired. There are no hidden transport charges.',
      seo: { title: 'FAQ: Free Pick & Drop Service', description: 'Free pickup and delivery across all Kuwait.', canonicalUrl: 'https://www.computerrepairkuwait.com/faq#pick-and-drop', ogType: 'website', schemaTypes: ['FAQPage'] }
    } as FAQEntity,

    'faq-liquid-damage': {
      id: 'faq-liquid-damage', slug: 'liquid-damage', entityType: 'FAQ', isActive: true,
      title: 'Do you repair liquid-damaged laptops and MacBooks?',
      description: 'Details about liquid damage repair process.',
      answer: 'Yes. Liquid damage is one of our most common repairs. When liquid enters a laptop, it creates conductive mineral bridges across circuit traces that cause electrical shorts. Our process: we fully disassemble the device, run the logic board through an industrial ultrasonic cleaner to strip corrosion, then trace and replace the specific shorted components using micro-soldering. Success rates are highest when the device is brought in quickly — do not attempt to power on a liquid-damaged device, as this causes further shorts.',
      seo: { title: 'FAQ: Liquid Damage Repair', description: 'Liquid damage repair process details.', canonicalUrl: 'https://www.computerrepairkuwait.com/faq#liquid-damage', ogType: 'website', schemaTypes: ['FAQPage'] }
    } as FAQEntity,

    'faq-no-fix': {
      id: 'faq-no-fix', slug: 'no-fix', entityType: 'FAQ', isActive: true,
      title: 'What does No Fix, No Fee mean exactly?',
      description: 'Details on the pricing guarantee.',
      answer: 'Our No Fix, No Fee policy means that if we cannot successfully repair your device after a full diagnostic and repair attempt, you pay absolutely nothing — not for the diagnostic, not for the labor, and not for any parts tested. This applies to all hardware repairs. We provide a fixed quote before beginning any repair, and you only pay if you approve the quote and the repair is completed successfully.',
      seo: { title: 'FAQ: No Fix No Fee Policy', description: 'How our no fix no fee guarantee works.', canonicalUrl: 'https://www.computerrepairkuwait.com/faq#no-fix', ogType: 'website', schemaTypes: ['FAQPage'] }
    } as FAQEntity,

    'faq-warranty': {
      id: 'faq-warranty', slug: 'warranty', entityType: 'FAQ', isActive: true,
      title: 'What warranty do you provide on repairs?',
      description: 'Warranty coverage details.',
      answer: 'All successful hardware repairs at KCROC carry a 30-day warranty covering both parts and labor. If the same fault returns within the warranty period, we inspect and repair it at no additional charge. The warranty applies to the specific component repaired — it does not cover new, unrelated faults that develop after the repair. Screen replacements, battery replacements, and board-level repairs all carry the same 30-day coverage.',
      seo: { title: 'FAQ: Repair Warranty', description: '30-day warranty on all hardware repairs.', canonicalUrl: 'https://www.computerrepairkuwait.com/faq#warranty', ogType: 'website', schemaTypes: ['FAQPage'] }
    } as FAQEntity,

    'faq-data-safe': {
      id: 'faq-data-safe', slug: 'data-safety', entityType: 'FAQ', isActive: true,
      title: 'Is my personal data safe during repair?',
      description: 'Privacy and data safety during repair.',
      answer: 'Yes. We operate a strict hardware-only, no-snooping privacy policy. Our technicians use specific hardware diagnostic software to run diagnostics on components — they never open, browse, or access your personal files, folders, or accounts. For logic board and motherboard repairs, you are always welcome to safely remove your storage drive before handing the device over. All devices are stored securely in locked, CCTV-monitored repair bays during maintenance.',
      seo: { title: 'FAQ: Data Safety During Repair', description: 'How we protect your data during computer repair.', canonicalUrl: 'https://www.computerrepairkuwait.com/faq#data-safety', ogType: 'website', schemaTypes: ['FAQPage'] }
    } as FAQEntity,

    'faq-same-day': {
      id: 'faq-same-day', slug: 'same-day-repair', entityType: 'FAQ', isActive: true,
      title: 'Do you offer same-day computer repair in Kuwait?',
      description: 'Same-day service availability.',
      answer: 'Yes, same-day repair is available for eligible jobs booked before 11:00 AM. Services typically completed same day include: screen replacements, battery replacements, keyboard repairs, SSD upgrades, Windows installation, and virus removal. Complex repairs — such as logic board micro-soldering, BGA rework, and liquid damage recovery — require 24 to 48 hours for proper diagnosis and stress testing. We always confirm the turnaround time before collection.',
      seo: { title: 'FAQ: Same-Day Repair Service', description: 'Same-day computer repair availability in Kuwait.', canonicalUrl: 'https://www.computerrepairkuwait.com/faq#same-day', ogType: 'website', schemaTypes: ['FAQPage'] }
    } as FAQEntity,

    'faq-cost': {
      id: 'faq-cost', slug: 'repair-cost', entityType: 'FAQ', isActive: true,
      title: 'How much does computer repair cost in Kuwait?',
      description: 'Pricing information for common repairs.',
      answer: 'Diagnostics are always free. Repair pricing depends on the fault and model: screen replacement starts from 20 KWD, battery replacement from 12 KWD, laptop hardware repair from 15 KWD, MacBook repair from 25 KWD, motherboard chip-level repair from 25 KWD, and gaming PC diagnostics from 25 KWD. We provide a fixed quote before starting any work — you only pay if you approve the price. If we cannot fix the device, you pay nothing.',
      seo: { title: 'FAQ: Repair Costs Kuwait', description: 'Computer repair pricing in Kuwait.', canonicalUrl: 'https://www.computerrepairkuwait.com/faq#cost', ogType: 'website', schemaTypes: ['FAQPage'] }
    } as FAQEntity,

    /* ═══════════════════════════════════════════════════════════════
       FOOTER
       ═══════════════════════════════════════════════════════════════ */
    'footer-data': {
      id: 'footer-data', entityType: 'Footer', isActive: true, title: 'Footer Links',
      links: {
        services: [
          { label: 'Laptop Repair Kuwait',      path: '/laptop-repair-kuwait' },
          { label: 'MacBook Repair Kuwait',     path: '/macbook-repair-kuwait' },
          { label: 'Gaming PC Repair Kuwait',   path: '/gaming-pc-repair-kuwait' },
          { label: 'Motherboard Repair Kuwait', path: '/motherboard-repair-kuwait' },
          { label: 'Screen Replacement Kuwait', path: '/laptop-screen-repair-kuwait' },
        ],
        company: [
          { label: 'About us',       path: '/about' },
          { label: 'Contact',        path: '/contact' },
          { label: 'Tech Blog',      path: '/blog' },
          { label: 'FAQ',            path: '/faq' },
          { label: 'Pricing',        path: '/pricing' },
        ],
        areas: [
          { label: 'Computer Repair Hawalli',      path: '/computer-repair-in-hawalli' },
          { label: 'Computer Repair Salmiya',      path: '/computer-repair-in-salmiya' },
          { label: 'Computer Repair Kuwait City',  path: '/computer-repair-in-kuwait-city' },
          { label: 'Computer Repair Farwaniya',    path: '/computer-repair-in-farwaniya' },
          { label: 'Computer Repair Jahra',        path: '/computer-repair-in-jahra' },
          { label: 'Computer Repair Ahmadi',       path: '/computer-repair-in-ahmadi' },
        ]
      }
    } as FooterEntity,
  }
};

/* ═══════════════════════════════════════════════════════════════════
   KCROC_GRAPH SINGLETON — consumed by all UI components and SEO Engine
   ═══════════════════════════════════════════════════════════════════ */
const allEntities = Object.values(rawGraphData.entities);

export const KCROC_GRAPH = {
  ...rawGraphData,
  routableEntities: allEntities.filter((e): e is RoutableEntity => 'seo' in e && e.isActive),
  business:    allEntities.find((e): e is BusinessEntity    => e.entityType === 'Business'),
  pages:       allEntities.filter((e): e is WebPageEntity   => e.entityType === 'WebPage'   && e.isActive),
  services:    allEntities.filter((e): e is ServiceEntity   => e.entityType === 'Service'   && e.isActive),
  faqs:        allEntities.filter((e): e is FAQEntity       => e.entityType === 'FAQ'       && e.isActive),
  usps:        allEntities.filter((e): e is USPEntity       => e.entityType === 'USP'       && e.isActive),
  trustBadges: allEntities.filter((e): e is TrustBadgeEntity => e.entityType === 'TrustBadge' && e.isActive),
  processes:   allEntities.filter((e): e is ProcessEntity   => e.entityType === 'Process'   && e.isActive),
  locations:   allEntities.filter((e): e is LocationEntity  => e.entityType === 'Location'  && e.isActive),
  reviews:     allEntities.find((e): e is ReviewsEntity     => e.entityType === 'Reviews'   && e.isActive),
  footer:      allEntities.find((e): e is FooterEntity      => e.entityType === 'Footer'),
  stats:       allEntities.find((e): e is StatsEntity       => e.entityType === 'Stats'),
};

export const KCROC_AGGREGATE_RATING = {
  ratingValue: '4.9',
  reviewCount:  150,
  bestRating:   5,
};
