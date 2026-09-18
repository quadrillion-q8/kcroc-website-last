// File: app/frontend/src/pages/GuidesIndex.tsx
// The guide index derives its content metadata from KCROC_GRAPH + BLOG_POSTS
// so the sitemap, navigation and index cannot drift into separate inventories.
import React from 'react';
import { Link } from 'react-router-dom';
import { BatteryWarning, Cpu, HardDrive, Gamepad2, Shield, Power, Settings2, ChevronRight, MonitorUp } from 'lucide-react';
import { SEOEngine } from '../core/components/SEOEngine';
import { KCROC_GRAPH } from '../data/graph';
import { BLOG_POSTS } from '../constants/blogPosts';
import { getContentRoute } from '../constants/routes';

interface GuideLink {
  slug: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

const GUIDE_ORDER = [
  'guides/laptop-wont-turn-on',
  'guides/dell-laptop-overheating',
  'guides/laptop-battery-warning-signs',
  'guides/bios-uefi-recovery-kuwait',
  'guides/gamebar-presence-writer-fix',
  'guides/windows-10-end-of-support',
  'guides/windows-11-background-services-audit',
  'guides/windows-11-settings-tweaks',
];

const ICON_BY_SLUG: Record<string, React.ElementType> = {
  'guides/laptop-wont-turn-on': Power,
  'guides/dell-laptop-overheating': Cpu,
  'guides/laptop-battery-warning-signs': BatteryWarning,
  'guides/bios-uefi-recovery-kuwait': HardDrive,
  'guides/gamebar-presence-writer-fix': Gamepad2,
  'guides/windows-10-end-of-support': MonitorUp,
  'guides/windows-11-background-services-audit': Shield,
  'guides/windows-11-settings-tweaks': Settings2,
};

const normalizeRoute = (route: string) => (route.startsWith('/') ? route : `/${route}`).replace(/\/$/, '');

// Metadata comes from the same graph/content sources that power sitemap and
// navigation. This page owns only presentation order and icon selection.
const guideByRoute = new Map<string, GuideLink>();

for (const page of KCROC_GRAPH.pages ?? []) {
  const route = normalizeRoute(page.slug);
  if (!route.startsWith('/guides/')) continue;
  guideByRoute.set(route, {
    slug: route.slice(1),
    title: page.title,
    description: page.description,
    icon: ICON_BY_SLUG[route] ?? HardDrive,
  });
}

for (const post of BLOG_POSTS.filter((entry) => entry.contentType === 'guide')) {
  const route = normalizeRoute(getContentRoute(post.slug, 'guide'));
  if (guideByRoute.has(route)) continue;
  guideByRoute.set(route, {
    slug: route.slice(1),
    title: post.title,
    description: post.description ?? post.excerpt,
    icon: ICON_BY_SLUG[route] ?? HardDrive,
  });
}

const GUIDES: GuideLink[] = [
  ...GUIDE_ORDER.map((route) => guideByRoute.get(`/${route}`)).filter((guide): guide is GuideLink => Boolean(guide)),
  ...[...guideByRoute.entries()]
    .filter(([route]) => !GUIDE_ORDER.includes(route.slice(1)))
    .sort((a, b) => a[1].title.localeCompare(b[1].title))
    .map(([, guide]) => guide),
];


export default function GuidesIndex() {
  return (
    <>
      <SEOEngine entityId="page-guides" />

      <main className="min-h-screen bg-transparent text-white pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <header className="mb-16 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-6">DIY & Repair Guides</h1>
            <p className="text-xl text-slate-400 max-w-2xl">
              Free, technician-written guides to help you understand a problem, perform safe checks,
              and decide whether it is a DIY fix or a job for the lab. Each guide has a specific
              purpose, so use the guide that matches your symptom rather than repeating the same
              troubleshooting steps across several pages.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {GUIDES.map((guide) => {
              const Icon = guide.icon;
              return (
                <Link
                  key={guide.slug}
                  to={`/${guide.slug}`}
                  className="group block bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-cyan-500/50 hover:bg-slate-800/50 transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-brand-dark border border-slate-800 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 mb-6">
                    <Icon className="w-7 h-7 text-cyan-400" />
                  </div>

                  <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {guide.title}
                  </h2>

                  <p className="text-slate-400 mb-6 line-clamp-2">{guide.description}</p>

                  <div className="flex items-center text-sm font-bold text-cyan-500 group-hover:text-cyan-400">
                    Read Guide <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}
