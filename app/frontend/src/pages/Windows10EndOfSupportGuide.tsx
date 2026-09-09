// File: app/frontend/src/pages/Windows10EndOfSupportGuide.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, CheckCircle2, CircleHelp, ExternalLink, HardDrive,
  Laptop, ShieldCheck, TriangleAlert, Wrench
} from 'lucide-react';
import { SEOEngine } from '../core/components/SEOEngine';
import SchemaMarkup from '../components/seo/SchemaMarkup';
import { KCROC_GRAPH } from '../data/graph';
import { IMAGES } from '../constants/images';

const business = KCROC_GRAPH.business!;
const PAGE_URL = `${business.websiteUrl}/guides/windows-10-end-of-support`;
const AUTHOR_ID = `${business.websiteUrl}/author/imran#person`;
const DATE_MODIFIED = '2026-09-09';
const LAST_REVIEWED = 'September 9, 2026';

const MS_ESU = 'https://www.microsoft.com/en-us/windows/extended-security-updates';
const MS_WIN11 = 'https://www.microsoft.com/en-us/windows/windows-11-specifications';
const MS_HEALTH = 'https://support.microsoft.com/en-us/windows/experience/compatibility/how-to-use-the-pc-health-check-app';

const faqs = [
  {
    q: 'Is Windows 10 still working in 2026?',
    a: 'Yes. Windows 10 PCs continue to work after support ended. The important change is that normal free security fixes, quality updates, feature updates, and Microsoft technical support ended on October 14, 2025 unless an eligible device is covered by Extended Security Updates.'
  },
  {
    q: 'When did Windows 10 support end?',
    a: 'Microsoft ended normal support for Windows 10 on October 14, 2025.'
  },
  {
    q: 'What is Windows 10 ESU?',
    a: 'Extended Security Updates is Microsoft’s temporary transition program for eligible Windows 10 version 22H2 devices. It provides critical and important security updates but does not add new features, general non-security fixes, product improvements, or technical support.'
  },
  {
    q: 'How long does Windows 10 Consumer ESU last?',
    a: 'Microsoft currently states that eligible enrolled consumer devices can receive ESU through October 12, 2027.'
  },
  {
    q: 'How much does Windows 10 ESU cost?',
    a: 'Microsoft currently lists three consumer enrollment paths: no additional cost when using the applicable PC Settings sync option, redeeming 1,000 Microsoft Rewards points, or a one-time $30 USD purchase or local-currency equivalent plus applicable tax. Availability can vary by region and device.'
  },
  {
    q: 'Can my old PC run Windows 11?',
    a: 'It depends on the exact hardware and firmware configuration. Windows 11 requires a compatible processor, at least 4 GB RAM, at least 64 GB storage, UEFI firmware with Secure Boot capability, TPM 2.0, and other requirements. Microsoft recommends PC Health Check for a device-specific answer.'
  },
  {
    q: 'Should I repair or replace my old Windows 10 laptop?',
    a: 'If the laptop is otherwise reliable and a repair or upgrade is economical, repair may make sense. Replacement is usually the better long-term choice when the machine is incompatible with Windows 11, has multiple failing components, or no longer meets your performance needs.'
  },
  {
    q: 'Can KCROC check whether my computer can upgrade to Windows 11?',
    a: 'Yes. KCROC can assess Windows 11 compatibility, TPM and Secure Boot configuration, storage and RAM health, Windows Update problems, and whether repairing, upgrading, or replacing the computer is the more practical option.'
  }
];

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': AUTHOR_ID,
      name: 'Imran Natiq',
      url: `${business.websiteUrl}/author/imran`,
      jobTitle: 'Founder & Lead Technician',
      worksFor: { '@id': `${business.websiteUrl}/#business` }
    },
    {
      '@type': 'Article',
      '@id': `${PAGE_URL}#article`,
      headline: 'Windows 10 End of Support: What It Means and What to Do in 2026',
      description: 'Windows 10 support ended in 2025. Learn what that means in 2026, how Consumer ESU works through October 2027, and whether to upgrade, repair, replace, or switch operating systems.',
      url: PAGE_URL,
      mainEntityOfPage: { '@id': `${PAGE_URL}#webpage` },
      isPartOf: { '@id': `${business.websiteUrl}/#website` },
      author: { '@id': AUTHOR_ID },
      publisher: { '@id': `${business.websiteUrl}/#business` },
      image: [
        `${business.websiteUrl}${IMAGES.services.windowsInstall.src}`,
        `${business.websiteUrl}${IMAGES.laptopHardware.thinkpadLaptopInstallingWindows11.src}`
      ],
      articleSection: 'Guides',
      dateModified: DATE_MODIFIED,
      about: [
        { '@type': 'SoftwareApplication', name: 'Microsoft Windows 10', applicationCategory: 'OperatingSystem' },
        { '@type': 'SoftwareApplication', name: 'Microsoft Windows 11', applicationCategory: 'OperatingSystem' }
      ]
    },
    {
      '@type': 'FAQPage',
      '@id': `${PAGE_URL}#faq`,
      mainEntity: faqs.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a }
      }))
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: business.websiteUrl },
        { '@type': 'ListItem', position: 2, name: 'Guides', item: `${business.websiteUrl}/guides` },
        { '@type': 'ListItem', position: 3, name: 'Windows 10 End of Support', item: PAGE_URL }
      ]
    }
  ]
};

const Section = ({ id, title, children }: { id?: string; title: string; children: React.ReactNode }) => (
  <section id={id} className="scroll-mt-28 border-t border-slate-800 pt-10 mt-10">
    <h2 className="text-3xl md:text-4xl font-black text-white mb-5">{title}</h2>
    <div className="space-y-5 text-lg leading-8 text-slate-300">{children}</div>
  </section>
);

const Figure = ({ src, alt, caption }: { src: string; alt: string; caption: string }) => (
  <figure className="my-8 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
    <img src={src} alt={alt} loading="lazy" className="w-full h-auto object-cover" />
    <figcaption className="px-5 py-4 text-sm text-slate-400">{caption}</figcaption>
  </figure>
);

export default function Windows10EndOfSupportGuide() {
  const whatsapp = `https://wa.me/${business.telephone}?text=${encodeURIComponent('I need help deciding whether to upgrade, repair, or replace my Windows 10 PC in Kuwait')}`;

  return (
    <>
      <SEOEngine entityId="guide-windows-10-eos" />
      <SchemaMarkup schema={structuredData} />

      <main className="min-h-screen bg-slate-950 text-white pt-28 pb-24">
        <article className="max-w-5xl mx-auto px-5 md:px-8">
          <nav aria-label="Breadcrumb" className="text-sm text-slate-400 mb-7">
            <Link to="/" className="hover:text-cyan-400">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/guides" className="hover:text-cyan-400">Guides</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-300">Windows 10 End of Support</span>
          </nav>

          <header className="mb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm font-bold text-amber-300 mb-5">
              <TriangleAlert className="w-4 h-4" /> 2026 update · Last reviewed {LAST_REVIEWED}
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-6">
              Windows 10 End of Support: What It Means and What to Do in 2026
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 leading-9 max-w-4xl">
              Windows 10 support ended on <strong className="text-white">October 14, 2025</strong>. Your PC still works, but the normal security-maintenance safety net is gone. Here is how to decide between Windows 11, ESU, repair, replacement, or Linux without spending money blindly.
            </p>
          </header>

          <Figure
            src={IMAGES.services.windowsInstall.src}
            alt="KCROC Windows operating system installation and repair service in Kuwait"
            caption="Windows support decisions should start with the condition of the actual PC—not only its operating-system version."
          />

          <div className="grid md:grid-cols-3 gap-4 my-8">
            {[
              ['PC works normally', 'End of support does not switch the computer off.'],
              ['Security risk grows', 'Unsupported systems miss normal future Windows fixes unless covered by ESU.'],
              ['Best first step', 'Check Windows 11 eligibility before replacing otherwise-good hardware.']
            ].map(([title, text]) => (
              <div key={title} className="rounded-xl border border-slate-800 bg-slate-900 p-5">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 mb-3" />
                <h2 className="font-bold text-white mb-2 text-lg">{title}</h2>
                <p className="text-slate-400">{text}</p>
              </div>
            ))}
          </div>

          <Section title='What “end of support” actually means'>
            <p>Windows 10 did not stop functioning on October 14, 2025. Apps still open, files remain on the disk, and the PC can still boot and connect to the internet.</p>
            <p>What ended was Microsoft’s normal product maintenance: free software updates from Windows Update, technical assistance, and security fixes for standard unsupported Windows 10 installations. Microsoft explicitly says the PC will continue to work, but recommends moving to Windows 11.</p>
            <p>
              Verify the current Microsoft position on its{' '}
              <a href={MS_HEALTH} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">PC Health Check support page <ExternalLink className="inline w-4 h-4" /></a>.
            </p>
          </Section>

          <Section title="Do you need to do anything right now?">
            <p>Yes, but the right urgency depends on how the PC is used. A computer used for banking, business documents, customer information, or sensitive accounts deserves a faster transition plan than a lightly used offline or secondary machine.</p>
            <p>If you need more time, Consumer ESU can reduce the security gap on an eligible Windows 10 22H2 PC. It should still be treated as transition time rather than a reason to stay on Windows 10 indefinitely.</p>
          </Section>

          <Section id="windows-11" title="Option 1: Upgrade to Windows 11">
            <p>For an eligible, healthy PC, Windows 11 is usually the cleanest long-term path. Microsoft’s minimum requirements include a compatible 1 GHz+ two-core processor, 4 GB RAM, 64 GB storage, UEFI with Secure Boot capability, TPM 2.0, DirectX 12-compatible graphics, and a suitable display.</p>
            <p>Use Windows Update or Microsoft’s PC Health Check app for a device-specific compatibility result. Do not assume TPM is missing simply because it is not enabled: on some systems TPM functionality exists in firmware under names such as Intel PTT or AMD fTPM.</p>
            <Figure
              src={IMAGES.laptopHardware.thinkpadLaptopInstallingWindows11.src}
              alt="ThinkPad laptop installing Windows 11 during KCROC service"
              caption="A Windows 11 compatibility result can depend on firmware settings as well as the CPU and other hardware."
            />
            <p>
              See Microsoft’s current <a href={MS_WIN11} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">Windows 11 specifications <ExternalLink className="inline w-4 h-4" /></a>. If the upgrade is failing or Windows itself is unstable, see our <Link to="/windows-wont-boot-kuwait" className="text-cyan-400 hover:underline">Windows won’t boot repair guide</Link> or <Link to="/blue-screen-of-death-bsod-fix-kuwait" className="text-cyan-400 hover:underline">BSOD diagnostic page</Link>.
            </p>
          </Section>

          <Section id="esu" title="Option 2: Use Windows 10 Extended Security Updates (ESU)">
            <p>Microsoft’s Consumer ESU program is the main official bridge for eligible Windows 10 version 22H2 devices that are not ready to move to Windows 11.</p>
            <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-6">
              <h3 className="text-xl font-bold text-white mb-3">Current consumer ESU facts</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Coverage currently runs through <strong>October 12, 2027</strong>.</li>
                <li>ESU provides critical and important security updates—not new features or normal product improvements.</li>
                <li>Microsoft currently lists: no additional cost with the applicable PC Settings sync option, 1,000 Microsoft Rewards points, or a one-time $30 USD/local-currency-equivalent purchase plus applicable tax.</li>
                <li>A Microsoft account sign-in is required to enroll; regional options can vary.</li>
              </ul>
            </div>
            <p>
              Because these terms can change, confirm them on Microsoft’s official <a href={MS_ESU} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">Windows 10 ESU page <ExternalLink className="inline w-4 h-4" /></a> before enrollment.
            </p>
            <Figure
              src={IMAGES.laptopHardware.dellLaptopWindowsUpdateRepairStack.src}
              alt="Dell laptop Windows Update repair stack at KCROC"
              caption="If ESU or Windows Update does not appear correctly, fix the update/licensing problem first instead of installing random optimizer tools."
            />
          </Section>

          <Section title="Option 3: Repair or upgrade the existing PC">
            <p>A Windows 11 compatibility failure does not automatically mean the hardware is worthless. An SSD, more RAM, a new battery, cooling service, or a repaired Windows installation can still make a machine useful—provided the processor and platform fit your longer-term needs.</p>
            <p>For a very slow machine, see our <Link to="/laptop-running-very-slow" className="text-cyan-400 hover:underline">slow laptop / SSD upgrade guide</Link>. For broader hardware faults, our <Link to="/laptop-repair-kuwait" className="text-cyan-400 hover:underline">laptop repair service</Link> covers SSD, RAM, battery, thermal, charging, and Windows-related diagnostics.</p>
            <Figure
              src={IMAGES.upgrades.miniPcCrucial.src}
              alt="Mini PC DDR5 RAM and NVMe SSD upgrade at KCROC Kuwait"
              caption="RAM and SSD upgrades can extend the useful life of suitable hardware, but they do not override Windows 11 CPU or firmware requirements."
            />
          </Section>

          <Section title="Option 4: Replace the computer">
            <p>Replacement is often better when the PC cannot officially meet Windows 11 requirements, already has several failing components, or no longer delivers the performance and reliability you need for work.</p>
            <p>Before buying a new machine, compare the repair cost with the remaining useful life of the existing system. Our <Link to="/blog/laptop-buying-guide-kuwait-2026" className="text-cyan-400 hover:underline">laptop buying guide for Kuwait</Link> can help you avoid buying hardware that is poorly matched to your workload.</p>
          </Section>

          <Section title="Option 5: Move suitable older hardware to Linux">
            <p>Linux can give older hardware a useful second life for browsing, email, documents, and other general-purpose work. Ubuntu and Linux Mint are common beginner-friendly choices.</p>
            <p>Check your software, printer, scanner, gaming, and specialist application requirements first. Linux is a valid option, but not a drop-in replacement for every Windows workflow.</p>
          </Section>

          <Section title="Safety checklist if you are staying on Windows 10 for now">
            <ul className="space-y-3">
              {[
                'Enroll in Consumer ESU if your device is eligible.',
                'Keep Edge, Chrome, Firefox, or your chosen browser fully updated.',
                'Keep reputable security software active and updated.',
                'Back up important files to more than one location.',
                'Be cautious with email attachments, fake update prompts, and unfamiliar downloads.',
                'Avoid “PC optimizer,” registry-cleaner, and random driver-updater tools promoted through search ads.'
              ].map(item => <li key={item} className="flex gap-3"><ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0 mt-1" /> <span>{item}</span></li>)}
            </ul>
            <p>If you suspect the computer is already infected, use our <Link to="/virus-malware-removal-kuwait" className="text-cyan-400 hover:underline">virus and malware removal page</Link> rather than stacking multiple cleanup utilities on top of each other.</p>
          </Section>

          <Section title="Upgrade, ESU, repair or replace? A practical decision rule">
            <div className="grid md:grid-cols-2 gap-4">
              {[
                ['Upgrade to Windows 11', 'The PC passes compatibility checks and the hardware is healthy.', Laptop],
                ['Use ESU temporarily', 'You need transition time and the Windows 10 22H2 device is eligible.', ShieldCheck],
                ['Repair or upgrade', 'A specific fix such as SSD, RAM, cooling, battery, or Windows repair gives the machine useful life.', Wrench],
                ['Replace the PC', 'The platform is incompatible, unreliable, or uneconomical to repair.', HardDrive]
              ].map(([title, text, Icon]) => {
                const I = Icon as React.ElementType;
                return <div key={String(title)} className="rounded-xl border border-slate-800 bg-slate-900 p-5"><I className="w-6 h-6 text-cyan-400 mb-3" /><h3 className="text-lg font-bold mb-2">{String(title)}</h3><p className="text-slate-400">{String(text)}</p></div>;
              })}
            </div>
          </Section>

          <Section id="faq" title="Frequently asked questions">
            <div className="space-y-4">
              {faqs.map(({ q, a }) => (
                <details key={q} className="group rounded-xl border border-slate-800 bg-slate-900 p-5">
                  <summary className="cursor-pointer list-none flex items-start gap-3 font-bold text-white text-lg">
                    <CircleHelp className="w-5 h-5 text-cyan-400 shrink-0 mt-1" /> {q}
                  </summary>
                  <p className="mt-4 pl-8 text-slate-300">{a}</p>
                </details>
              ))}
            </div>
          </Section>

          <section className="mt-12 rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-slate-900 to-slate-950 p-7 md:p-10">
            <h2 className="text-3xl font-black mb-4">Windows 10 upgrade and computer repair help in Kuwait</h2>
            <p className="text-lg text-slate-300 leading-8 mb-6">
              If you are unsure whether to upgrade, repair, or replace your PC, KCROC can check the actual hardware, Windows 11 compatibility, TPM/Secure Boot configuration, storage health, RAM, Windows Update, and the economics of repair before you spend money.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={whatsapp} className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 font-black text-slate-950 hover:bg-cyan-400">Ask KCROC on WhatsApp <ArrowRight className="w-5 h-5" /></a>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-6 py-3 font-bold hover:border-cyan-500">Contact KCROC</Link>
            </div>
          </section>

          <footer className="mt-10 text-sm text-slate-500 leading-6">
            <p><strong>Editorial note:</strong> Microsoft support and ESU terms are time-sensitive. This page was reviewed on {LAST_REVIEWED} against Microsoft’s official Windows 10 ESU, Windows 11 requirements, and PC Health Check documentation. Microsoft’s own pages linked above remain the authority for enrollment terms.</p>
          </footer>
        </article>
      </main>
    </>
  );
}
