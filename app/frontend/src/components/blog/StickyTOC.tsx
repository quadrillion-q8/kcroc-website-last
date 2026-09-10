import { useEffect, useState } from 'react';
import { List } from 'lucide-react';

export interface TocItem {
  id: string;
  label: string;
}

/**
 * Persistent, scroll-spy table of contents for long-form guide pages.
 *
 * Renders as a fixed floating panel on desktop (lg+) that fades in once the
 * reader scrolls past the hero, and highlights whichever section is
 * currently in view. Mobile gets no fixed panel here — pair this with the
 * existing in-hero pill/chip TOC or a collapsible <details> block for small
 * screens, since a fixed panel would eat too much viewport on mobile.
 *
 * Usage:
 *   const toc: TocItem[] = [{ id: 'warning-signs', label: 'Warning Signs' }, ...];
 *   <StickyTOC toc={toc} />
 *
 * Each `id` must match the `id` attribute of the corresponding section in
 * the page (e.g. <section id="warning-signs">).
 */
export default function StickyTOC({ toc }: { toc: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>(toc[0]?.id ?? '');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    toc.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { rootMargin: '-18% 0px -68% 0px', threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [toc]);

  if (!toc.length) return null;

  return (
    <nav
      aria-label="On this page"
      className={`fixed right-4 top-1/2 z-40 hidden w-60 -translate-y-1/2 rounded-2xl border border-slate-800 bg-slate-900/90 p-4 shadow-2xl shadow-black/40 backdrop-blur-md transition-opacity duration-300 lg:block ${
        visible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <p className="mb-3 flex items-center gap-2 text-[11px] font-black uppercase tracking-wider text-slate-400">
        <List size={13} className="text-cyan-400" aria-hidden="true" /> On this page
      </p>
      <ol className="max-h-[60vh] space-y-1 overflow-y-auto pr-1">
        {toc.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block rounded-md px-2 py-1 text-xs leading-snug transition-colors ${
                activeId === item.id
                  ? 'bg-cyan-500/10 font-bold text-cyan-300'
                  : 'text-slate-500 hover:bg-slate-800/60 hover:text-slate-200'
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
