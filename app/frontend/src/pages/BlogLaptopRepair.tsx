// File: app/frontend/src/pages/BlogLaptopRepair.tsx
import React from 'react';
import { Head } from 'vite-react-ssg';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  AlertTriangle,
  Battery,
  CheckCircle2,
  Clock,
  Cpu,
  Droplets,
  Flame,
  Laptop,
  MapPin,
  MessageCircle,
  Monitor,
  Phone,
  Shield,
  Thermometer,
  Wind,
  Wrench,
  Zap,
} from 'lucide-react';

import SchemaMarkup from '../components/seo/SchemaMarkup';
import { KCROC_GRAPH } from '../data/graph';

const business = KCROC_GRAPH.business!;
const PAGE_URL = business.websiteUrl + '/blog/laptop-repair-kuwait-2026';
const HERO_IMAGE_URL = business.websiteUrl + '/images/laptop-repair-kuwait.webp';
const SOCIAL_IMAGE_URL = business.websiteUrl + '/images/discover/laptop-repair-kuwait-1200x675.webp';
const PUBLISHED_DATE = '2026-06-14T08:00:00+03:00';
const MODIFIED_DATE = '2026-11-14';
const PHONE_NUMBER = business.telephone.replace(/[^0-9]/g, '');
const PHONE_HREF = 'tel:+' + PHONE_NUMBER;
const WHATSAPP_URL =
  'https://wa.me/' +
  PHONE_NUMBER +
  '?text=' +
  encodeURIComponent('Hello KCROC, I read your 2026 laptop repair guide. My laptop model is ____ and the symptom is ____. I am in _____. Please arrange a free pickup.');

const faq = [
  {
    q: 'How much does laptop repair cost in Kuwait?',
    a: 'Published guide prices include laptop thermal service at 15–20 KWD; battery replacement labour at 8–15 KWD plus the compatible battery; screen replacement labour from 30 KWD plus the panel or display assembly; hinge reconstruction at 15–30 KWD; charging-port repair at 20–35 KWD; common motherboard component repair at 25–60 KWD; advanced motherboard work at 50–90+ KWD; and liquid-damage repair at 35–90+ KWD. MacBook board-level repair is listed at 45–100+ KWD. The exact total is confirmed after model and fault checks, before paid work begins.',
  },
  {
    q: 'Is the initial laptop diagnostic free?',
    a: 'Yes. KCROC provides a free initial hardware assessment and a clear KWD quote before paid repair work begins. You decide whether to approve the quoted work. The No Fix, No Fee policy applies under the lab’s stated terms.',
  },
  {
    q: 'How long does a laptop repair take?',
    a: 'Timing depends on the fault, model, workload and compatible-part availability. Many routine cooling and common connector jobs are handled the same day or within 24 hours, subject to scheduling and inspection. Many component-level motherboard repairs take 24–48 hours; liquid-damage work is typically 24–72 hours. Screen timing depends on the exact compatible panel being in stock.',
  },
  {
    q: 'Will my files be accessed or erased during a hardware repair?',
    a: 'Routine hardware work is focused on the reported component. KCROC does not access or erase personal files unless the approved work requires an operating-system change, and that change is discussed with you first. Hardware damage can still affect whether storage remains accessible, so back up important files whenever possible. KCROC does not offer standalone data recovery.',
  },
  {
    q: 'Is component-level motherboard repair better than replacing the whole board?',
    a: 'It depends on the confirmed fault and whether the original board is technically repairable. A no-power or no-charge symptom does not, by itself, prove that the complete motherboard must be replaced. Component-level diagnosis can identify a failed power IC, MOSFET, capacitor, charging controller or damaged trace. The technician explains the viable options and quote after inspection.',
  },
  {
    q: 'What should I do if I spill coffee, tea or karak on my laptop?',
    a: 'Disconnect the charger, switch the laptop off if it is safe to do so, and do not try to restart or charge it. Do not use rice, a hair dryer or direct heat. Arrange an inspection promptly because liquid residue and corrosion can continue to affect the board after the visible spill has dried.',
  },
  {
    q: 'Do you collect and return laptops across Kuwait?',
    a: 'Yes. Free pickup and return delivery are available across all six Kuwait governorates. Repairs and diagnostics are carried out at the physical KCROC lab in Hawalli, not at a storefront in every service area.',
  },
];

const priceRows = [
  {
    service: 'Initial hardware assessment',
    price: 'FREE',
    scope: 'No-obligation initial assessment of the reported fault, with component-level checks where relevant.',
    timing: 'Same day / 24 hours for the initial assessment; confirmed when the device reaches the Hawalli lab.',
    href: '/laptop-repair-kuwait',
    label: 'Laptop repair service',
  },
  {
    service: 'Laptop thermal service',
    price: '15–20 KWD',
    scope: 'Internal dust removal, heatsink and fan-path cleaning, and thermal-paste service as appropriate for the model.',
    timing: 'Same day / 24 hours, subject to scheduling and inspection.',
    href: '/laptop-overheating-kuwait',
    label: 'Overheating diagnosis',
  },
  {
    service: 'Laptop battery replacement',
    price: '8–15 KWD labour + battery',
    scope: 'Battery and charging-path checks, safe removal and installation. The compatible battery is priced separately.',
    timing: 'Confirmed after the exact model and battery availability are checked.',
    href: '/battery-replacement-kuwait',
    label: 'Battery service',
  },
  {
    service: 'Laptop and MacBook screen replacement',
    price: 'From 30 KWD labour + panel',
    scope: 'Panel, cable, connector and backlight diagnosis before a compatible panel or display assembly is quoted.',
    timing: 'Same day only when the compatible panel or display assembly is in stock; otherwise confirmed after model checks.',
    href: '/laptop-screen-repair-kuwait',
    label: 'Screen service',
  },
  {
    service: 'Keyboard replacement',
    price: '10–20 KWD labour + part',
    scope: 'Keyboard and input-fault diagnosis, followed by model-matched fitting. Keyboard, palmrest or top-case parts are separate.',
    timing: 'Same day to 24 hours when the compatible part is available.',
    href: '/laptop-keyboard-replacement-kuwait',
    label: 'Keyboard service',
  },
  {
    service: 'Hinge and chassis reconstruction',
    price: '15–30 KWD',
    scope: 'Mounting-point reconstruction, structural reinforcement and hinge-tension checks where the chassis is repairable.',
    timing: 'Same day / 24 hours; confirmed after inspection and parts checks.',
    href: '/laptop-hinge-repair-kuwait',
    label: 'Hinge service',
  },
  {
    service: 'Charging-port repair',
    price: '20–35 KWD',
    scope: 'DC jack, USB-C or supported connector diagnosis, replacement and micro-soldering where appropriate.',
    timing: 'Same day / 24 hours for common connector work; deeper board faults can take longer.',
    href: '/laptop-charging-port-repair-kuwait',
    label: 'Charging-port service',
  },
  {
    service: 'Motherboard component repair',
    price: '25–60 KWD',
    scope: 'Targeted diagnosis and replacement of failed MOSFETs, power ICs, capacitors and related components where viable.',
    timing: '24–48 hours is typical for many component-level board repairs; complex faults or parts orders can take longer.',
    href: '/motherboard-repair-kuwait',
    label: 'Motherboard repair',
  },
  {
    service: 'Advanced motherboard repair',
    price: '50–90+ KWD',
    scope: 'Advanced board diagnosis and suitable BGA or chipset-level rework where the board and fault permit it.',
    timing: '24–72 hours for advanced board work; testing or parts requirements can extend the estimate.',
    href: '/motherboard-repair-kuwait',
    label: 'Advanced board work',
  },
  {
    service: 'Liquid-damage repair',
    price: '35–90+ KWD',
    scope: 'Power isolation, corrosion assessment, board cleaning and component or trace repair where viable.',
    timing: '24–72 hours is the published typical range; actual timing depends on damage and parts.',
    href: '/laptop-liquid-damage-repair-kuwait',
    label: 'Liquid-damage service',
  },
  {
    service: 'MacBook board-level repair',
    price: '45–100+ KWD',
    scope: 'MacBook Air and Pro logic-board diagnosis and component-level repair where the original board is technically repairable.',
    timing: '24–48 hours is typical for many repairs; complex faults or parts orders can take longer.',
    href: '/macbook-repair-kuwait',
    label: 'MacBook repair',
  },
];

const symptomRows = [
  {
    symptom: 'Laptop will not turn on',
    causes: 'AC adapter, DC or USB-C input, shorted power rail, charging IC, firmware or board fault.',
    firstCheck: 'Check the adapter indicator and try one known-good, model-compatible charger. Stop repeated power attempts if there is heat, smell or liquid exposure.',
    links: [
      { href: '/guides/laptop-wont-turn-on', label: 'No-power diagnostic guide' },
      { href: '/motherboard-repair-kuwait', label: 'Motherboard repair' },
    ],
  },
  {
    symptom: 'Plugged in but not charging',
    causes: 'Adapter, loose port, battery, USB-C power-delivery path or charging-circuit fault.',
    firstCheck: 'Inspect the cable and port without inserting tools. Note whether the adapter light changes when connected.',
    links: [
      { href: '/laptop-charging-port-repair-kuwait', label: 'Charging-port repair' },
      { href: '/battery-replacement-kuwait', label: 'Battery replacement' },
    ],
  },
  {
    symptom: 'Runs hot, fans are loud or it shuts down',
    causes: 'Blocked heatsink fins, dust, worn fan, dried thermal interface or an unusually heavy software workload.',
    firstCheck: 'Use the laptop on a hard, clear surface and note temperatures at idle and during the normal workload. Do not run repeated stress tests on a device that is shutting down.',
    links: [
      { href: '/guides/why-is-my-laptop-so-hot', label: 'Why is my laptop so hot?' },
      { href: '/laptop-overheating-kuwait', label: 'Laptop overheating service' },
    ],
  },
  {
    symptom: 'Cracked display, lines, flicker or black screen',
    causes: 'LCD or OLED panel, display cable, connector, backlight circuit or graphics output.',
    firstCheck: 'Where safe, connect an external display to help distinguish a panel fault from a wider graphics or boot issue.',
    links: [
      { href: '/laptop-screen-repair-kuwait', label: 'Laptop screen repair' },
      { href: '/macbook-screen-replacement-kuwait', label: 'MacBook screen replacement' },
    ],
  },
  {
    symptom: 'Stiff hinge, clicking lid or separating bezel',
    causes: 'Seized hinge, broken threaded inserts, damaged chassis mounts or a strained display cable.',
    firstCheck: 'Stop opening and closing the lid if the hinge is binding or the bezel is separating. Further movement can increase the damage.',
    links: [
      { href: '/laptop-hinge-repair-kuwait', label: 'Hinge and chassis repair' },
    ],
  },
  {
    symptom: 'Water, coffee, tea or karak spill',
    causes: 'Liquid residue or corrosion affecting the keyboard, connectors, power rails or other board areas.',
    firstCheck: 'Disconnect power, switch off if safe, and do not restart or charge the laptop. Do not use rice or direct heat.',
    links: [
      { href: '/laptop-liquid-damage-repair-kuwait', label: 'Liquid-damage repair' },
    ],
  },
  {
    symptom: 'Freezing, blue screens or very slow performance',
    causes: 'SSD or RAM fault, thermal throttling, unstable power, driver or operating-system problems.',
    firstCheck: 'Back up accessible important files before attempting repairs or operating-system changes. A slowdown alone does not prove the SSD has failed.',
    links: [
      { href: '/computer-freezing-crashing-kuwait', label: 'Freezing and crashing guide' },
      { href: '/ssd-ram-upgrade-kuwait', label: 'SSD and RAM service' },
    ],
  },
];

const brandRows = [
  {
    name: 'Apple MacBook',
    models: 'MacBook Air and MacBook Pro, Intel and Apple Silicon models',
    focus: 'Logic-board power and charging diagnosis, USB-C power delivery, display and backlight faults, keyboard, trackpad and battery work. Board repair is assessed against the exact model and fault.',
    href: '/macbook-repair-kuwait',
    label: 'MacBook repair',
  },
  {
    name: 'Dell',
    models: 'XPS, Latitude, Inspiron, Alienware and G-Series',
    focus: 'USB-C or barrel charging faults, display and cable diagnosis, hinge-anchor damage, battery issues and thermal servicing.',
    href: '/dell-laptop-repair-kuwait',
    label: 'Dell laptop repair',
  },
  {
    name: 'HP',
    models: 'Spectre, Envy, EliteBook, ProBook, Pavilion and Omen',
    focus: 'Convertible hinge and chassis faults, battery swelling, fan and heatsink issues, keyboard faults and board-level power diagnosis.',
    href: '/hp-laptop-repair-kuwait',
    label: 'HP laptop repair',
  },
  {
    name: 'Lenovo',
    models: 'ThinkPad, Yoga, IdeaPad and Legion',
    focus: 'USB-C charging-port and power-path diagnosis, hinge and keyboard faults, cooling issues and component-level board checks.',
    href: '/lenovo-laptop-repair-kuwait',
    label: 'Lenovo laptop repair',
  },
  {
    name: 'ASUS, Acer and MSI',
    models: 'ROG, TUF, Zephyrus, Predator, Nitro, Raider and Katana',
    focus: 'Gaming-laptop cooling, fan and heatsink servicing, charging and power faults, display diagnosis and model-specific thermal checks.',
    href: '/gaming-laptop-repair-kuwait',
    label: 'Gaming laptop repair',
  },
];

const environmentalRisks = [
  {
    title: 'Heat and restricted airflow',
    description: 'High ambient temperatures reduce the cooling headroom available to a laptop. Dust packed into fan blades or heatsink fins can further restrict airflow. The result may be loud fans, reduced clock speeds, unstable performance or thermal shutdowns.',
    icon: Flame,
  },
  {
    title: 'Battery ageing and swelling',
    description: 'Heat and repeated charge cycles can accelerate lithium-ion battery ageing. A swollen pack may lift the trackpad, distort the bottom cover or place pressure on nearby parts. Stop using or charging a device with a visibly swollen battery; do not press or puncture the pack.',
    icon: Battery,
  },
  {
    title: 'Liquid residue and corrosion',
    description: 'Water, coffee, tea and karak can leave conductive or corrosive residue around the keyboard, connectors and motherboard. A laptop that appears to work immediately after a spill can still develop faults later. Keep it switched off and unplugged until it has been assessed.',
    icon: Droplets,
  },
  {
    title: 'Hinge torque and display-cable strain',
    description: 'A stiff hinge transfers extra force into the lid, chassis mounts and display cable. Opening the lid from one corner or continuing to use a hinge that clicks or binds can turn a repairable mount problem into wider screen or cable damage.',
    icon: Monitor,
  },
];

const STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'TechArticle',
      '@id': PAGE_URL + '#article',
      headline: 'Laptop Repair in Kuwait (2026 Guide): Costs, Diagnostics & Board-Level Restoration',
      description: 'A practical 2026 guide to laptop repair in Kuwait, including diagnostic pathways, KWD service ranges, board-level repair decisions and hardware care in local conditions.',
      mainEntityOfPage: { '@id': PAGE_URL },
      image: [HERO_IMAGE_URL],
      inLanguage: 'en-KW',
      datePublished: PUBLISHED_DATE,
      dateModified: MODIFIED_DATE,
      articleSection: [
        'Laptop failure causes in Kuwait',
        'Component-level motherboard repair',
        'Laptop repair prices in KWD',
        'Laptop symptom diagnosis',
        'Brand-specific repair considerations',
        'Liquid-spill triage',
        'Pickup and lab intake',
      ],
      keywords: [
        'laptop repair Kuwait guide',
        'laptop repair cost Kuwait',
        'laptop motherboard repair Kuwait',
        'laptop overheating Kuwait',
        'laptop repair vs replacement',
        'laptop liquid damage Kuwait',
      ],
      author: {
        '@type': 'Person',
        name: 'Imran Natiq',
        jobTitle: 'Computer Technician',
        worksFor: { '@id': business.websiteUrl + '/#business' },
      },
      publisher: {
        '@type': 'ComputerStore',
        '@id': business.websiteUrl + '/#business',
        name: business.legalName,
        url: business.websiteUrl,
        telephone: '+' + PHONE_NUMBER,
        address: {
          '@type': 'PostalAddress',
          streetAddress: business.streetAddress,
          addressLocality: 'Hawalli',
          addressCountry: 'KW',
        },
      },
    },
    {
      '@type': 'FAQPage',
      '@id': PAGE_URL + '#faq',
      mainEntity: faq.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    },
  ],
};

function SectionHeading({ eyebrow, title, intro }: { eyebrow: string; title: string; intro: string }) {
  return (
    <div className="mb-8 max-w-3xl">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">{eyebrow}</p>
      <h2 className="text-2xl font-bold leading-tight text-white sm:text-4xl">{title}</h2>
      <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">{intro}</p>
    </div>
  );
}

export default function BlogLaptopRepair() {
  return (
    <main className="min-h-screen bg-transparent text-white selection:bg-cyan-500/30">
      <Head>
        <title>Laptop Repair in Kuwait (2026 Guide): Costs, Diagnostics &amp; Board-Level Restoration | KCROC</title>
        <meta
          name="description"
          content="2026 Kuwait laptop repair guide: compare KWD costs, board-level diagnostics, repair-versus-replace decisions, common symptoms and free pickup to KCROC’s Hawalli lab."
        />
        <link rel="canonical" href={PAGE_URL} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Laptop Repair in Kuwait (2026 Guide): Costs, Diagnostics &amp; Board-Level Restoration" />
        <meta
          property="og:description"
          content="Compare laptop repair costs in KWD, understand component-level diagnostics and choose the right next step for common laptop faults in Kuwait."
        />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:image" content={SOCIAL_IMAGE_URL} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="675" />
        <meta property="og:image:alt" content="Laptop hardware diagnostics and repair in Kuwait" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={SOCIAL_IMAGE_URL} />
      </Head>

      <SchemaMarkup schema={STRUCTURED_DATA} />

      <section className="relative overflow-hidden border-b border-slate-800 px-4 pb-12 pt-24 sm:px-6 sm:pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10" />
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="max-w-4xl">
            <Badge className="border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-cyan-200">
              <Wrench className="mr-2 inline h-4 w-4" aria-hidden="true" />
              Kuwait Laptop Repair Diagnostic Guide · 2026 Edition
            </Badge>
            <h1 className="mt-6 text-3xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
              Laptop Repair in Kuwait: The 2026 Guide to Diagnostics, Costs and Hardware Preservation
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
              A laptop that will not power on, overheats during work, has a cracked display or stops charging does not always need a complete parts or motherboard replacement. This guide explains how to narrow down common faults, compare repair options, understand published KWD price ranges and decide when a repair is worthwhile.
            </p>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
              KCROC carries out diagnostics and repairs at its Hawalli laboratory. We use inspection and measurement to identify the affected part before recommending a repair. The commercial service page is separate: visit{' '}
              <Link to="/laptop-repair-kuwait" className="font-semibold text-cyan-300 underline decoration-cyan-500/40 underline-offset-4 hover:text-cyan-200">
                Laptop Repair Kuwait
              </Link>{' '}
              when you are ready to arrange service.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-cyan-500 font-bold text-slate-950 hover:bg-cyan-400">
                <Link to="/book">
                  Arrange free pickup
                  <MessageCircle className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-800 hover:text-white">
                <Link to="/pricing">Compare current repair prices</Link>
              </Button>
            </div>
            <p className="mt-4 text-xs leading-6 text-slate-400">
              Updated <time dateTime={MODIFIED_DATE}>14 November 2026</time> · Published <time dateTime={PUBLISHED_DATE}>14 June 2026</time>
            </p>
          </div>
        </div>
      </section>

      <section aria-label="KCROC service facts" className="px-4 py-8 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: 'Free initial assessment', text: 'A clear KWD quote before paid repair work.', icon: CheckCircle2 },
            { title: 'Component-level diagnosis', text: 'Microscope, multimeter and thermal checks where appropriate.', icon: Cpu },
            { title: 'Free Kuwait-wide pickup', text: 'Collection and return delivery across all six governorates.', icon: MapPin },
            { title: '30-day repair warranty', text: 'Applies to completed repairs under the stated lab terms.', icon: Shield },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} className="border-slate-800 bg-slate-900/60">
                <CardContent className="flex h-full gap-3 p-4">
                  <Icon className="mt-1 h-5 w-5 shrink-0 text-cyan-300" aria-hidden="true" />
                  <div>
                    <h2 className="text-sm font-bold text-white">{item.title}</h2>
                    <p className="mt-1 text-xs leading-6 text-slate-400">{item.text}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="01 · Environment and hardware"
            title="Why laptops develop faults in Kuwait"
            intro="Heat, fine dust, liquid spills and mechanical stress can affect different parts of a laptop. These conditions help explain common symptoms, but none of them is a diagnosis on its own: the exact model and measured fault still matter."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {environmentalRisks.map((risk) => {
              const Icon = risk.icon;
              return (
                <Card key={risk.title} className="overflow-hidden border-slate-800 bg-slate-900/60">
                  <CardHeader className="pb-2">
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/20 bg-cyan-500/10">
                      <Icon className="h-5 w-5 text-cyan-300" aria-hidden="true" />
                    </div>
                    <CardTitle className="text-lg text-white">{risk.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-7 text-slate-300">{risk.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <div className="mt-6 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">
            <p className="flex items-start gap-3 text-sm leading-7 text-slate-200">
              <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-amber-300" aria-hidden="true" />
              Do not keep charging a laptop with a swollen battery or try to power up a device after a liquid spill. Disconnect external power and arrange an assessment before further use.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-800 bg-slate-900/40 px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="02 · Repair decision"
            title="Component-level motherboard repair or a complete board replacement?"
            intro="A black screen, no-power condition or charging failure can originate from the adapter, input connector, battery, charging path or motherboard. The symptom alone does not establish that the whole board has failed. Diagnosis should identify the fault before a replacement is recommended."
          />
          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full min-w-[680px] border-collapse text-left text-sm">
              <thead className="bg-slate-950/80 text-xs uppercase tracking-wider text-slate-400">
                <tr>
                  <th scope="col" className="px-5 py-4">Decision point</th>
                  <th scope="col" className="px-5 py-4">Complete board replacement</th>
                  <th scope="col" className="px-5 py-4">KCROC component-level assessment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                <tr>
                  <th scope="row" className="px-5 py-4 font-semibold text-white">Diagnostic approach</th>
                  <td className="px-5 py-4">The board assembly is treated as the failed unit.</td>
                  <td className="px-5 py-4">The technician checks the relevant power, charging and signal paths using suitable measurement and inspection tools.</td>
                </tr>
                <tr>
                  <th scope="row" className="px-5 py-4 font-semibold text-white">Potential repair scope</th>
                  <td className="px-5 py-4">The complete motherboard or logic-board assembly is replaced when a compatible part is available and replacement is viable.</td>
                  <td className="px-5 py-4">A failed MOSFET, capacitor, charging IC, power controller or damaged trace may be repaired individually when the board condition permits it.</td>
                </tr>
                <tr>
                  <th scope="row" className="px-5 py-4 font-semibold text-white">Cost consideration</th>
                  <td className="px-5 py-4">The quote depends on the exact model and the cost and availability of the complete assembly.</td>
                  <td className="px-5 py-4">Published guide ranges are 25–60 KWD for common component repair and 50–90+ KWD for advanced board work, subject to diagnosis.</td>
                </tr>
                <tr>
                  <th scope="row" className="px-5 py-4 font-semibold text-white">Storage and data</th>
                  <td className="px-5 py-4">On models with soldered storage, changing the board also changes the board that contains the storage hardware.</td>
                  <td className="px-5 py-4">Repairing the original board may retain the original storage hardware, but it cannot guarantee that data will remain accessible.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs leading-6 text-slate-400">
            Component-level repair is not suitable for every board. Severe damage, unavailable components or an uneconomical repair may make replacement the more practical option. The recommendation follows inspection, not a blanket promise.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/motherboard-repair-kuwait" className="font-semibold text-cyan-300 hover:text-cyan-200">Motherboard repair details →</Link>
            <Link to="/macbook-repair-kuwait" className="font-semibold text-cyan-300 hover:text-cyan-200">MacBook logic-board service →</Link>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="03 · Published price guide"
            title="Laptop repair costs in Kuwait: 2026 KWD reference"
            intro="These are KCROC’s published guide prices, not a model-independent final quote. Labour-only prices exclude the compatible replacement part where stated. The exact model, confirmed fault, repair scope and stock status determine the final total."
          />
          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full min-w-[860px] border-collapse text-left text-sm">
              <caption className="sr-only">KCROC laptop and MacBook repair guide prices, scope and typical turnaround in Kuwait Dinar.</caption>
              <thead className="bg-slate-950/80 text-xs uppercase tracking-wider text-slate-400">
                <tr>
                  <th scope="col" className="px-5 py-4">Service</th>
                  <th scope="col" className="px-5 py-4">Published price</th>
                  <th scope="col" className="px-5 py-4">What the range covers</th>
                  <th scope="col" className="px-5 py-4">Typical timing</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {priceRows.map((item) => (
                  <tr key={item.service} className="align-top">
                    <th scope="row" className="px-5 py-4 font-semibold text-white">
                      <Link to={item.href} className="hover:text-cyan-300">{item.service}</Link>
                    </th>
                    <td className="whitespace-nowrap px-5 py-4 font-bold text-cyan-200">{item.price}</td>
                    <td className="px-5 py-4 leading-6">{item.scope}</td>
                    <td className="px-5 py-4 leading-6">{item.timing}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs leading-6 text-slate-400">
            Turnaround is an estimate after the device reaches the Hawalli lab. Compatible-part availability, board condition, testing requirements and workload can change the estimate. Always confirm the current total and timing before approving paid work.
          </p>
          <div className="mt-6">
            <Button asChild variant="outline" className="border-cyan-500/40 text-cyan-200 hover:bg-cyan-500/10 hover:text-white">
              <Link to="/pricing">See the full KCROC repair price list</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-800 bg-slate-900/40 px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="04 · Symptom-first diagnosis"
            title="Start with what your laptop is doing"
            intro="A symptom is not a diagnosis. Use this routing table to find a safe first check and the most relevant guide or service page. Stop troubleshooting and seek inspection when there is liquid exposure, a swollen battery, a burning smell or repeated thermal shutdown."
          />
          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full min-w-[920px] border-collapse text-left text-sm">
              <caption className="sr-only">Laptop symptom, possible hardware causes, safe first checks and relevant KCROC repair guides.</caption>
              <thead className="bg-slate-950/80 text-xs uppercase tracking-wider text-slate-400">
                <tr>
                  <th scope="col" className="px-5 py-4">Symptom</th>
                  <th scope="col" className="px-5 py-4">Possible hardware layer</th>
                  <th scope="col" className="px-5 py-4">Safe first check</th>
                  <th scope="col" className="px-5 py-4">Next step</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {symptomRows.map((item) => (
                  <tr key={item.symptom} className="align-top">
                    <th scope="row" className="px-5 py-4 font-semibold text-white">{item.symptom}</th>
                    <td className="px-5 py-4 leading-6">{item.causes}</td>
                    <td className="px-5 py-4 leading-6">{item.firstCheck}</td>
                    <td className="px-5 py-4">
                      <div className="flex flex-col gap-2">
                        {item.links.map((link) => (
                          <Link key={link.href} to={link.href} className="font-semibold text-cyan-300 hover:text-cyan-200">
                            {link.label} →
                          </Link>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-5 text-sm leading-7 text-slate-300">
            For a fault involving several symptoms, use the main{' '}
            <Link to="/laptop-repair-kuwait" className="font-semibold text-cyan-300 hover:text-cyan-200">Laptop Repair Kuwait service hub</Link>{' '}
            or compare the published{' '}
            <Link to="/pricing" className="font-semibold text-cyan-300 hover:text-cyan-200">repair prices</Link>.
          </p>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="05 · Brand and platform differences"
            title="Brand-specific laptop diagnostics"
            intro="Laptop makers use different board layouts, charging standards, display assemblies and chassis designs. The exact model number is more useful than the brand name alone when checking parts and repairability."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {brandRows.map((brand) => (
              <Card key={brand.name} className="border-slate-800 bg-slate-900/60">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl text-white">{brand.name}</CardTitle>
                  <p className="text-xs font-semibold text-slate-400">{brand.models}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-7 text-slate-300">{brand.focus}</p>
                  <Link to={brand.href} className="mt-4 inline-flex font-semibold text-cyan-300 hover:text-cyan-200">
                    {brand.label} →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
            <h3 className="text-base font-bold text-white">What happens on the diagnostic bench?</h3>
            <p className="mt-2 text-sm leading-7 text-slate-300">
              Depending on the reported fault, checks may include microscope inspection, digital-multimeter measurements, thermal imaging, boardview or schematic references where available, connector and power-path checks, and functional testing after the repair. Not every tool or test is needed for every device.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-amber-500/10 bg-amber-500/[0.03] px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="06 · Immediate triage"
            title="The first five minutes after a laptop spill or sudden failure"
            intro="The priority is to avoid making the fault worse. These are basic precautions, not a substitute for an inspection."
          />
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border-slate-800 bg-slate-900/70">
              <CardHeader>
                <CardTitle className="text-lg text-white">After a liquid spill</CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-7 text-slate-300">
                Disconnect the charger and switch off the laptop if safe. Do not restart it, plug it back in, use rice or apply direct heat. Arrange an assessment promptly.
              </CardContent>
            </Card>
            <Card className="border-slate-800 bg-slate-900/70">
              <CardHeader>
                <CardTitle className="text-lg text-white">When the battery is swollen</CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-7 text-slate-300">
                Stop using and charging the device. Do not press, puncture or try to flatten the battery. Contact the lab to coordinate safe handling and collection.
              </CardContent>
            </Card>
            <Card className="border-slate-800 bg-slate-900/70">
              <CardHeader>
                <CardTitle className="text-lg text-white">When it overheats or shuts down</CardTitle>
              </CardHeader>
              <CardContent className="text-sm leading-7 text-slate-300">
                Stop demanding workloads, move the laptop to a hard surface and keep vents clear. Do not continue repeated stress tests on a machine that is shutting down.
              </CardContent>
            </Card>
          </div>
          <p className="mt-5 text-sm leading-7 text-slate-300">
            For no-power problems without a spill or battery-safety issue, avoid repeated power cycling. A known-good compatible adapter can help rule out the charger, but it cannot confirm that the laptop’s input or charging circuit is healthy.
          </p>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_0.85fr]">
          <div>
            <SectionHeading
              eyebrow="07 · Collection and lab intake"
              title="One physical repair lab in Hawalli, with free pickup across Kuwait"
              intro="All diagnostics and repairs take place at the KCROC workshop. Customers outside Hawalli use the collection and return-delivery service; service-area coverage does not mean there is a separate KCROC storefront in each district."
            />
            <ol className="space-y-5">
              {[
                {
                  title: 'Arrange collection or visit the lab',
                  text: 'Send your laptop brand, exact model, main symptom and area on WhatsApp, or visit the Hawalli workshop during opening hours.',
                },
                {
                  title: 'Receive a free initial assessment and quote',
                  text: 'The technician checks the reported fault and explains the recommended repair, the KWD total and any part-availability conditions before paid work begins.',
                },
                {
                  title: 'Approve the repair, testing and return',
                  text: 'After approval, the repair is completed and relevant functions are checked. The laptop is returned with the applicable 30-day repair warranty under the lab terms.',
                },
              ].map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-500/10 text-sm font-black text-cyan-200">{index + 1}</span>
                  <div>
                    <h3 className="font-bold text-white">{step.title}</h3>
                    <p className="mt-1 text-sm leading-7 text-slate-300">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <Card className="h-fit border-cyan-500/20 bg-slate-900/70">
            <CardHeader>
              <Badge className="w-fit border-cyan-500/30 bg-cyan-500/10 text-cyan-200">KCROC physical lab</Badge>
              <CardTitle className="text-xl text-white">Hawalli workshop</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-slate-300">
              <p className="flex gap-3 leading-7">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-cyan-300" aria-hidden="true" />
                {business.streetAddress}
              </p>
              <p className="flex gap-3 leading-7">
                <Clock className="mt-1 h-5 w-5 shrink-0 text-cyan-300" aria-hidden="true" />
                Daily, 10:00 AM–10:00 PM
              </p>
              <p className="flex gap-3 leading-7">
                <Phone className="mt-1 h-5 w-5 shrink-0 text-cyan-300" aria-hidden="true" />
                <a href={PHONE_HREF} className="font-semibold text-cyan-200 hover:text-cyan-100">+{PHONE_NUMBER}</a>
              </p>
              <p className="border-t border-slate-800 pt-4 leading-7">
                Free pickup and return delivery across all six Kuwait governorates. Please confirm the collection window with the team before dispatch.
              </p>
              <Button asChild className="w-full bg-cyan-500 font-bold text-slate-950 hover:bg-cyan-400">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  WhatsApp KCROC
                  <MessageCircle className="ml-2 h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="faq" className="border-t border-slate-800 bg-slate-900/40 px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <SectionHeading
            eyebrow="08 · Frequently asked questions"
            title="Laptop repair in Kuwait: common questions"
            intro="Practical answers about price, diagnosis, turnaround, data handling and collection."
          />
          <div className="space-y-3">
            {faq.map((item) => (
              <Card key={item.q} className="border-slate-800 bg-slate-900/70">
                <CardContent className="p-5 sm:p-6">
                  <h3 className="font-bold leading-6 text-white">{item.q}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{item.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <Card className="overflow-hidden border-cyan-500/25 bg-gradient-to-br from-cyan-950/60 via-slate-900 to-blue-950/60">
            <CardContent className="p-6 sm:p-10">
              <div className="max-w-3xl">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">From diagnosis to service</p>
                <h2 className="mt-3 text-2xl font-black leading-tight text-white sm:text-4xl">Ready to arrange a laptop assessment?</h2>
                <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
                  Share the model number, symptoms and your Kuwait area. KCROC will coordinate free pickup, assess the laptop at the Hawalli lab and provide a KWD quote before any paid repair begins.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Button asChild size="lg" className="bg-cyan-500 font-bold text-slate-950 hover:bg-cyan-400">
                    <Link to="/book">Book free pickup</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-800 hover:text-white">
                    <Link to="/laptop-repair-kuwait">View laptop repair service</Link>
                  </Button>
                </div>
                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-slate-700 pt-5 text-xs text-slate-400">
                  <span className="flex items-center gap-2"><Shield className="h-4 w-4 text-cyan-300" aria-hidden="true" /> 30-day repair warranty</span>
                  <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-cyan-300" aria-hidden="true" /> Hawalli lab · Kuwait-wide pickup</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
