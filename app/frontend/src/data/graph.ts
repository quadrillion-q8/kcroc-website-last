// File: app/frontend/src/data/graph.ts
import {
  RawGraphData, RoutableEntity, LocationEntity, ServiceEntity,
  FAQEntity, WebPageEntity, BusinessEntity, USPEntity, TrustBadgeEntity,
  ProcessEntity, StatsEntity, FooterEntity, ReviewsEntity,
  BrandEntity, ProblemEntity, CaseStudyEntity
} from '../types/knowledgeGraph';

const rawGraphData: RawGraphData = {
  metadata: {
    version: '3.3.0',
    lastUpdated: '2026-07-09T00:00:00+03:00',
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
      logoUrl: 'https://www.computerrepairkuwait.com/logo.png', email: 'quadrillion1980@gmail.com',
      priceRange: '$$', openingHours: 'Open daily 10:00 AM – 10:00 PM',
      schemaOpeningHours: { dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '10:00', closes: '22:00' },
      aggregateRating: { ratingValue: '4.9', reviewCount: 150, bestRating: 5 },
      socialLinks: { facebook: 'https://www.facebook.com/computerrepairkuwait', instagram: 'https://www.instagram.com/computerrepairkuwait' },
      aiSummary: 'Kuwait Computer Repair On Call (KCROC) is a Hawalli-based component-level computer repair specialist. Services include MacBook logic board micro-soldering, laptop screen replacement, gaming PC thermal repair, motherboard chip-level diagnostics, SSD upgrades, and virus removal. Free pickup and delivery across all Kuwait governorates. 30-day warranty on all repairs. No Fix, No Fee policy.',
    } as BusinessEntity,

    /* ═══════════════════════════════════════════════════════════════
       TRUST BADGES & STATS
    ═══════════════════════════════════════════════════════════════ */
    'badge-privacy':  { id: 'badge-privacy',  entityType: 'TrustBadge', isActive: true, title: 'Data Privacy Guaranteed', iconKey: 'ShieldCheck' } as TrustBadgeEntity,
    'badge-pickup':   { id: 'badge-pickup',   entityType: 'TrustBadge', isActive: true, title: 'Free Pick & Drop',        iconKey: 'Truck'       } as TrustBadgeEntity,
    'badge-warranty': { id: 'badge-warranty', entityType: 'TrustBadge', isActive: true, title: '30-Day Warranty',         iconKey: 'Clock'       } as TrustBadgeEntity,
    'badge-esd':      { id: 'badge-esd',      entityType: 'TrustBadge', isActive: true, title: 'ESD-Safe Lab',             iconKey: 'Zap'         } as TrustBadgeEntity,

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
        { step: 3, title: 'Repair, stress-test, and return', description: 'We execute the micro-soldering or hardware replacement, then stress-test the system under full load for stability. If it passes, we deliver it back. If we can\'t fix it, you pay nothing.' }
      ]
    } as ProcessEntity,

    /* ═══════════════════════════════════════════════════════════════
       PAGES
    ═══════════════════════════════════════════════════════════════ */
    'page-home': {
      id: 'page-home', slug: '', entityType: 'WebPage', isActive: true,
      title: 'Home', description: 'KCROC Homepage — Component-level computer repair in Kuwait',
      seo: { title: 'Computer Repair Kuwait | Laptop & MacBook Repair – Free Pick & Drop | Kuwait Computer Repair On Call', description: 'Same-day laptop, MacBook & PC repair in Kuwait by KCROC. Free Pick & Drop across Hawalli, Salmiya, Kuwait City & all governorates. 4.9★ rated, 30-day warranty. Call +965 55301913.', canonicalUrl: 'https://www.computerrepairkuwait.com', ogType: 'website', schemaTypes: ['LocalBusiness', 'WebSite', 'WebPage'] },
      hero: { headline: 'Kuwait\'s Expert Component-Level Repair Service.', subheadline: 'We fix the board. We don\'t just swap it.', description: 'We diagnose and repair failed components at board level — restoring devices that most repair shops in Kuwait would simply declare beyond repair.', primaryCTA: { text: 'WhatsApp a Technician', route: 'https://wa.me/96555301913' }, secondaryCTA: { text: 'View All Services', route: '/services' } },
      featuredFAQIds: ['faq-pick-and-drop', 'faq-liquid-damage', 'faq-no-fix'], featuredUSPIds: ['usp-component', 'usp-nofix', 'usp-logistics', 'usp-privacy']
    } as WebPageEntity,

    'page-services': { id: 'page-services', slug: 'services', entityType: 'WebPage', isActive: true, title: 'Services', description: 'All KCROC repair services', seo: { title: 'Computer Repair Services in Kuwait | Laptop, MacBook & PC | KCROC', description: 'Expert laptop repair, MacBook repair, gaming PC diagnostics, motherboard chip-level repair, and screen replacement in Kuwait. Free pickup. 30-day warranty.', canonicalUrl: 'https://www.computerrepairkuwait.com/services', ogType: 'website', schemaTypes: ['CollectionPage', 'LocalBusiness'] } } as WebPageEntity,
    'page-blog': { id: 'page-blog', slug: 'blog', entityType: 'WebPage', isActive: true, title: 'Tech Blog', description: 'Expert repair guides and tech insights.', seo: { title: 'KCROC Tech Blog | Computer Repair Guides Kuwait', description: 'Expert computer repair guides, laptop fixes, MacBook troubleshooting, and PC performance tips in Kuwait.', canonicalUrl: 'https://www.computerrepairkuwait.com/blog', ogType: 'website', schemaTypes: ['CollectionPage'] } } as WebPageEntity,

    /* ═══════════════════════════════════════════════════════════════
       SERVICES
    ═══════════════════════════════════════════════════════════════ */
    'srv-macbook': { id: 'srv-macbook', slug: 'macbook-repair-kuwait', entityType: 'Service', isActive: true, title: 'MacBook Repair Kuwait', iconKey: 'apple', shortDescription: 'Liquid spills, dead logic boards, USB-C failures. Chip-level Apple hardware restoration.', description: 'Our MacBook repair service goes beyond what Apple Authorized Centers offer. Instead of replacing your entire logic board — which deletes all your data and costs hundreds of KWD — we isolate the exact failed chip using thermal imaging and micro-soldering.', repairLevel: 'chip-level', estimatedTurnaround: '24-48 Hours', pricing: { startingFrom: 25, currency: 'KWD', quoteRequired: true, displayLabel: 'From 25 KWD — free diagnostic first' }, coreFeatures: ['Logic Board Micro-Soldering', 'USB-C Power IC Replacement', 'Liquid Damage Ultrasonic Cleaning', 'MacBook Screen & Battery Replacement', 'Data Preserved', 'Free Pick & Drop', '30-Day Warranty'], brands: ['MacBook Air', 'MacBook Pro 13"', 'MacBook Pro 14"', 'MacBook Pro 16"'], commonIssues: [{ id: 'no-power', title: 'No power / dead device', severity: 'high', description: 'USB-C power negotiation failure or PPBUS short circuit.' }], warranty: { duration: '30 Days', coverage: 'All parts and labor.', noFixNoFee: true }, seo: { title: 'MacBook Repair Kuwait | Logic Board Experts | No Fix No Fee | KCROC', description: 'Expert Apple MacBook repair in Kuwait. Logic board micro-soldering, USB-C power repair, liquid damage recovery. Free pick & drop.', canonicalUrl: 'https://www.computerrepairkuwait.com/macbook-repair-kuwait', ogType: 'article', schemaTypes: ['Service', 'FAQPage'] } } as ServiceEntity,
    'srv-laptop': { id: 'srv-laptop', slug: 'laptop-repair-kuwait', entityType: 'Service', isActive: true, title: 'Laptop Repair Kuwait', iconKey: 'laptop', shortDescription: 'Screen, battery, keyboard, charging port, and motherboard repair for all Windows brands.', description: 'Kuwait\'s climate causes specific hardware failure patterns in Windows laptops. We diagnose and repair the exact fault component rather than replacing the entire unit.', repairLevel: 'advanced', estimatedTurnaround: 'Same Day / 24 Hours', pricing: { startingFrom: 15, currency: 'KWD', quoteRequired: true, displayLabel: 'From 15 KWD' }, coreFeatures: ['Screen Replacement', 'Battery Replacement', 'Keyboard Repair', 'Charging Port', 'Thermal Paste', 'Free Pick & Drop'], brands: ['Dell', 'HP', 'Lenovo', 'ASUS', 'Acer', 'MSI'], commonIssues: [{ id: 'screen-crack', title: 'Cracked screen', severity: 'high', description: 'Physical damage.' }], warranty: { duration: '30 Days', coverage: 'All parts and labor.', noFixNoFee: true }, seo: { title: 'Laptop Repair Kuwait | All Brands | Free Pick & Drop | KCROC', description: 'Professional Windows laptop repair in Kuwait. Screen, battery, keyboard, charging port, and motherboard repairs. Free pick & drop.', canonicalUrl: 'https://www.computerrepairkuwait.com/laptop-repair-kuwait', ogType: 'article', schemaTypes: ['Service'] } } as ServiceEntity,
    'srv-gaming': { id: 'srv-gaming', slug: 'gaming-pc-repair-kuwait', entityType: 'Service', isActive: true, title: 'Gaming PC Repair Kuwait', iconKey: 'gaming', shortDescription: 'GPU diagnostics, thermal throttling fixes, FPS tuning.', description: 'Gaming PCs face a unique enemy: sustained 45°C+ ambient temperatures. We solve the hardware problems that cost you frames.', repairLevel: 'advanced', estimatedTurnaround: 'Same Day / 24 Hours', pricing: { startingFrom: 25, currency: 'KWD', quoteRequired: true, displayLabel: 'From 25 KWD' }, coreFeatures: ['GPU Diagnostics', 'Thermal Re-Paste with Liquid Metal', 'AIO Maintenance', 'FPS Benchmarking'], brands: ['ASUS ROG', 'MSI', 'Alienware', 'Acer Predator'], commonIssues: [{ id: 'fps-drops', title: 'Severe FPS drops', severity: 'high', description: 'Thermal throttling.' }], warranty: { duration: '30 Days', coverage: 'All parts and labor.', noFixNoFee: true }, seo: { title: 'Gaming PC Repair Kuwait | FPS & Thermal Fix | KCROC', description: 'Stop FPS drops and thermal throttling. Expert gaming PC repair in Kuwait. Free pick & drop.', canonicalUrl: 'https://www.computerrepairkuwait.com/gaming-pc-repair-kuwait', ogType: 'article', schemaTypes: ['Service'] } } as ServiceEntity,
    'srv-motherboard': { id: 'srv-motherboard', slug: 'motherboard-repair-kuwait', entityType: 'Service', isActive: true, title: 'Motherboard Repair Kuwait', iconKey: 'cpu', shortDescription: 'Chip-level diagnostics and micro-soldering.', description: 'Most repair shops replace the entire motherboard. We isolate the fault to the individual component level — saving you up to 80%.', repairLevel: 'chip-level', estimatedTurnaround: '24-48 Hours', pricing: { startingFrom: 25, currency: 'KWD', quoteRequired: true, displayLabel: 'From 25 KWD' }, coreFeatures: ['Power Rail Tracing', 'MOSFET Replacement', 'BGA Rework', 'Liquid Damage Ultrasonic Cleaning'], brands: ['MacBook', 'Dell', 'HP', 'ASUS', 'Lenovo'], commonIssues: [{ id: 'no-power', title: 'Dead laptop', severity: 'high', description: 'Input MOSFET short.' }], warranty: { duration: '30 Days', coverage: 'All parts and labor.', noFixNoFee: true }, seo: { title: 'Motherboard Repair Kuwait | Chip-Level Fix | KCROC', description: 'Expert motherboard repair in Kuwait. Chip-level micro-soldering, power rail diagnostics, liquid damage recovery.', canonicalUrl: 'https://www.computerrepairkuwait.com/motherboard-repair-kuwait', ogType: 'article', schemaTypes: ['Service'] } } as ServiceEntity,
    'srv-screen': { id: 'srv-screen', slug: 'laptop-screen-repair-kuwait', entityType: 'Service', isActive: true, title: 'Screen Replacement Kuwait', iconKey: 'monitor', shortDescription: 'LCD, IPS, OLED, and Retina display panel replacements.', description: 'A cracked or flickering laptop screen doesn\'t mean a new laptop. We source and fit OEM and high-grade compatible panels.', repairLevel: 'basic', estimatedTurnaround: 'Same Day', pricing: { startingFrom: 20, currency: 'KWD', quoteRequired: false, displayLabel: 'From 20 KWD' }, coreFeatures: ['LCD/IPS/OLED Replacement', 'MacBook Retina', 'Display Cable Repair'], brands: ['Dell', 'HP', 'Lenovo', 'MacBook'], commonIssues: [{ id: 'cracked', title: 'Cracked screen', severity: 'high', description: 'Physical impact.' }], warranty: { duration: '30 Days', coverage: 'Screen panel and labor.', noFixNoFee: false }, seo: { title: 'Laptop Screen Replacement Kuwait | Same Day | KCROC', description: 'Professional laptop and MacBook screen replacement in Kuwait. LCD, IPS, OLED & Retina. Free pick & drop.', canonicalUrl: 'https://www.computerrepairkuwait.com/laptop-screen-repair-kuwait', ogType: 'article', schemaTypes: ['Service'] } } as ServiceEntity,
    'srv-battery': { id: 'srv-battery', slug: 'battery-replacement', entityType: 'Service', isActive: true, title: 'Battery Replacement Kuwait', iconKey: 'battery', shortDescription: 'OEM and compatible battery replacement.', description: 'Kuwait\'s extreme heat accelerates lithium degradation. We replace batteries and optimize thermal settings.', repairLevel: 'basic', estimatedTurnaround: 'Same Day', pricing: { startingFrom: 12, currency: 'KWD', quoteRequired: true, displayLabel: 'From 12 KWD' }, coreFeatures: ['OEM Batteries', 'MacBook Battery Replacement', 'Swollen Battery Removal'], brands: ['MacBook', 'Dell', 'HP', 'Lenovo'], commonIssues: [{ id: 'fast-drain', title: 'Battery dies quickly', severity: 'medium', description: 'Capacity loss.' }], warranty: { duration: '30 Days', coverage: 'Battery and labor.', noFixNoFee: true }, seo: { title: 'Laptop Battery Replacement Kuwait | Same Day | KCROC', description: 'Fast laptop and MacBook battery replacement in Kuwait. Swollen battery emergency service. Free pick & drop.', canonicalUrl: 'https://www.computerrepairkuwait.com/battery-replacement', ogType: 'article', schemaTypes: ['Service'] } } as ServiceEntity,

    /* ═══════════════════════════════════════════════════════════════
       LOCATION
    ═══════════════════════════════════════════════════════════════ */
    'loc-hawalli': { id: 'loc-hawalli', slug: 'hawalli', entityType: 'Location', isActive: true, title: 'Hawalli Repair Center', description: 'Kuwait\'s premier component-level repair facility in Hawalli.', landmark: 'Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19', coords: { lat: 29.3356, lng: 48.0250 }, serviceRadiusKm: 40, serviceAreas: ['Hawalli', 'Salmiya', 'Kuwait City', 'Farwaniya', 'Ahmadi', 'Jahra', 'Fahaheel'], seo: { title: 'Computer Repair Shop Hawalli Kuwait | Ibn Khaldoun St | KCROC', description: 'Visit KCROC at Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19, Hawalli. Open daily 10 AM – 10 PM.', canonicalUrl: 'https://www.computerrepairkuwait.com/location/hawalli', ogType: 'website', schemaTypes: ['LocalBusiness'] } } as LocationEntity,

    /* ═══════════════════════════════════════════════════════════════
       REVIEWS
    ═══════════════════════════════════════════════════════════════ */
    'reviews-row': { id: 'reviews-row', entityType: 'Reviews', isActive: true, title: 'Verified Google Reviews', aggregateRating: { ratingValue: '4.9', reviewCount: 150 }, items: [{ name: 'Ahmad Al-Sabah', location: 'Salmiya', time: '2 weeks ago', rating: 5, device: 'MacBook Pro — Screen Replacement', text: 'Fixed the MacBook Pro screen in 24 hours, price exactly as quoted.' }] } as ReviewsEntity,

    /* ═══════════════════════════════════════════════════════════════
       PHASE 1: 15+ OPTIMIZED FAQS
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
    'faq-virus': { id: 'faq-virus', slug: 'virus-removal', entityType: 'FAQ', isActive: true, title: 'Can you remove viruses and malware from my laptop?', description: 'Information on professional virus, malware, and ransomware removal.', answer: 'Yes. We perform complete malware and virus removal, including ransomware, adware, browser hijackers, and rootkits. For severe infections, we back up your personal files and perform a clean Windows installation.', seo: { title: 'Can you remove viruses and malware?', description: 'Professional malware, virus, and adware removal services in Kuwait.', canonicalUrl: 'https://www.computerrepairkuwait.com/faq#virus-removal', schemaTypes: ['FAQPage'] } } as FAQEntity,
    'faq-windows': { id: 'faq-windows', slug: 'windows-install', entityType: 'FAQ', isActive: true, title: 'Can you reinstall Windows on my laptop?', description: 'Details on clean Windows 10 and 11 installation services.', answer: 'Yes. We perform clean Windows 10 and Windows 11 installations with driver installation, Windows Update, and system optimization included. If you have data to preserve, we back up your files before reinstalling.', seo: { title: 'Can you reinstall Windows on my laptop?', description: 'Clean Windows 10 and 11 installations with full data backup and driver setup.', canonicalUrl: 'https://www.computerrepairkuwait.com/faq#windows-install', schemaTypes: ['FAQPage'] } } as FAQEntity,

    /* ═══════════════════════════════════════════════════════════════
       PHASE 2: BRAND ENTITIES
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
      seo: { title: 'Dell Laptop Repair Kuwait | All Models | Free Pick & Drop | KCROC', description: 'Expert Dell laptop repair in Kuwait. Inspiron, Latitude, XPS, G15 Gaming, and Alienware repair — screen, battery, hinge, motherboard, and thermal issues. Free pick & drop.', canonicalUrl: 'https://www.computerrepairkuwait.com/dell-laptop-repair-kuwait', ogType: 'article', schemaTypes: ['Service'] }
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
      seo: { title: 'HP Laptop Repair Kuwait | EliteBook, Pavilion & OMEN | KCROC', description: 'Expert HP laptop repair in Kuwait. Power issues, hinge repair, screen replacement, and thermal optimization. Free pick & drop.', canonicalUrl: 'https://www.computerrepairkuwait.com/hp-laptop-repair-kuwait', ogType: 'article', schemaTypes: ['Service'] }
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
      seo: { title: 'Lenovo Laptop Repair Kuwait | Legion & IdeaPad | KCROC', description: 'Expert Lenovo laptop repair in Kuwait. Legion gaming thermal fixes, IdeaPad hinge repair, ThinkPad support. Free pick & drop. No Fix, No Fee.', canonicalUrl: 'https://www.computerrepairkuwait.com/lenovo-laptop-repair-kuwait', ogType: 'article', schemaTypes: ['Service'] }
    } as BrandEntity,

    'brand-asus': {
      id: 'brand-asus', slug: 'asus-laptop-repair-kuwait', entityType: 'Brand', isActive: true,
      title: 'ASUS Laptop Repair Kuwait', brandName: 'ASUS', officialWebsite: 'https://www.asus.com',
      description: 'ASUS Republic of Gamers (ROG) and TUF laptops are powerhouses, but Kuwait’s heat pushes their liquid metal and thermal paste to the limit. We specialize in ASUS thermal recovery, ROG motherboard component-level repair, and TUF series screen and battery replacements.',
      commonModels: ['ROG Strix G15', 'ROG Zephyrus G14', 'TUF Gaming A15', 'ZenBook 14', 'VivoBook 15'],
      commonIssues: [
        { id: 'asus-liquid-metal', title: 'Liquid metal dry-out', severity: 'high', description: 'ROG models hitting 95°C+ due to liquid metal pump-out effect.' },
        { id: 'asus-power', title: 'Dead motherboard (No power)', severity: 'high', description: 'TUF series input MOSFET or charging IC failure.' },
        { id: 'asus-wifi', title: 'MediaTek WiFi dropping', severity: 'medium', description: 'Frequent WiFi drops requiring card upgrade to Intel AX series.' },
        { id: 'asus-screen', title: 'Screen flickering', severity: 'medium', description: 'Display cable wear from Zephyrus "ErgoLift" hinge design.' }
      ],
      pricing: { startingFrom: 15, currency: 'KWD', quoteRequired: true, displayLabel: 'From 15 KWD — free diagnostic first' },
      seo: { title: 'ASUS Laptop Repair Kuwait | ROG & TUF Gaming | KCROC', description: 'Specialist ASUS ROG and TUF laptop repair in Kuwait. Liquid metal replacement, dead motherboard fixes, and screen repair. Free pick & drop.', canonicalUrl: 'https://www.computerrepairkuwait.com/asus-laptop-repair-kuwait', ogType: 'article', schemaTypes: ['Service'] }
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
      seo: { title: 'Acer Laptop Repair Kuwait | Nitro, Predator & Aspire | KCROC', description: 'Expert Acer laptop repair in Kuwait. Nitro 5 charging port repair, Predator thermal fixes, and Aspire hinge repair. Free pick & drop.', canonicalUrl: 'https://www.computerrepairkuwait.com/acer-laptop-repair-kuwait', ogType: 'article', schemaTypes: ['Service'] }
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
      seo: { title: 'MSI Laptop Repair Kuwait | Hinge & Motherboard Experts | KCROC', description: 'Professional MSI laptop repair in Kuwait. Specialist in MSI hinge repair, motherboard short circuits, and thermal repasting. Free pick & drop.', canonicalUrl: 'https://www.computerrepairkuwait.com/msi-laptop-repair-kuwait', ogType: 'article', schemaTypes: ['Service'] }
    } as BrandEntity,

    /* ═══════════════════════════════════════════════════════════════
       PHASE 3: PROBLEM ENTITIES
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
      seo: { title: 'Laptop Won\'t Turn On Kuwait — Diagnosis & Repair | KCROC', description: 'Laptop not turning on in Kuwait? We diagnose dead input MOSFETs, blown fuses, and power rail shorts at component level. Free diagnostic. Free pick & drop.', canonicalUrl: 'https://www.computerrepairkuwait.com/laptop-wont-turn-on', ogType: 'article', schemaTypes: ['Article', 'FAQPage'] }
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
      relatedServiceIds: ['srv-laptop', 'srv-gaming'],
      seo: { title: 'Laptop Overheating Kuwait — Fix & Thermal Service | KCROC', description: 'Laptop overheating in Kuwait? Kuwait\'s summer heat destroys thermal paste and clogs cooling fins. We deep-clean and re-paste. Free pick & drop. Same-day service.', canonicalUrl: 'https://www.computerrepairkuwait.com/laptop-overheating-kuwait', ogType: 'article', schemaTypes: ['Article', 'FAQPage'] }
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
      seo: { title: 'Laptop Turns On But Screen is Black — Fix in Kuwait | KCROC', description: 'Laptop has power but a black screen? We diagnose backlight fuses, RAM failures, and dead displays. Free pick & drop in Kuwait.', canonicalUrl: 'https://www.computerrepairkuwait.com/laptop-black-screen-kuwait', ogType: 'article', schemaTypes: ['Article', 'FAQPage'] }
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
      seo: { title: 'Spilled Water on Laptop in Kuwait? Emergency Repair | KCROC', description: 'Spilled coffee or water on your laptop? Do not turn it on! We offer ultrasonic motherboard cleaning and chip-level repair to save your device and data.', canonicalUrl: 'https://www.computerrepairkuwait.com/spilled-water-on-laptop', ogType: 'article', schemaTypes: ['Article', 'FAQPage'] }
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
      seo: { title: 'Laptop Plugged In But Not Charging — Repair Kuwait | KCROC', description: 'Laptop battery not charging? We diagnose dead batteries, broken charging ports, and failed motherboard power chips. Same-day service available.', canonicalUrl: 'https://www.computerrepairkuwait.com/laptop-plugged-in-not-charging', ogType: 'article', schemaTypes: ['Article', 'FAQPage'] }
    } as ProblemEntity,

    /* ═══════════════════════════════════════════════════════════════
       PHASE 4: CASE STUDY ENTITIES
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
      outcome: 'Device fully restored. All data preserved on original M2 SSD. Customer data intact.',
      timeToRepair: '36 hours',
      costVsReplacement: 'Repair: 65 KWD. Apple Authorized Center quote: 280 KWD for board swap with data loss.',
      publishDate: '2026-05-12',
      seo: { title: 'MacBook Pro M2 Liquid Damage Repair Kuwait — Real Case Study | KCROC', description: 'Coffee spill destroyed a MacBook Pro M2 in Salmiya. KCROC repaired the logic board for 65 KWD, preserving all data. Apple wanted 280 KWD for a board swap.', canonicalUrl: 'https://www.computerrepairkuwait.com/case-studies/macbook-liquid-damage-salmiya', ogType: 'article', schemaTypes: ['Article'] }
    } as CaseStudyEntity,

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

export const GRAPH_INDEXES = rawGraphData.entities;

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
  
  // ✅ ADDED EXPORTS FOR NEW SEO ROADMAP ENTITIES
  brands:      allEntities.filter((e): e is BrandEntity     => e.entityType === 'Brand'     && e.isActive),
  problems:    allEntities.filter((e): e is ProblemEntity   => e.entityType === 'Problem'   && e.isActive),
  caseStudies: allEntities.filter((e): e is CaseStudyEntity => e.entityType === 'CaseStudy' && e.isActive),
};

export const KCROC_AGGREGATE_RATING = {
  ratingValue: '4.9',
  reviewCount:  150,
  bestRating:   5,
};
