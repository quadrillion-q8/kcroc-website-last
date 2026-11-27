import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, List } from 'lucide-react';
type Item = { id: string; label: string };
export default function SignatureGuideTOC({ toc, arabic = false }: { toc: Item[]; arabic?: boolean }) {
 const ref = useRef<HTMLDetailsElement>(null);
 const [active,setActive] = useState(toc[0]?.id ?? '');
 const [progress,setProgress] = useState(0);
 useEffect(() => {
  const root = ref.current?.closest<HTMLElement>('[data-kcroc-signature-editorial]');
  if (!root) return;
  const header = document.querySelector<HTMLElement>('header[data-premium-chrome="header"]');
  const summary = ref.current?.querySelector('summary');
  let frame = 0;
  const update = () => {
   frame = 0;
   const top = Math.ceil(header?.getBoundingClientRect().height ?? 80) + 8;
   const line = top + Math.ceil(summary?.getBoundingClientRect().height ?? 48) + 20;
   root.style.setProperty('--signature-sticky-top', top + 'px');
   root.style.setProperty('--signature-reading-line', line + 'px');
   let current = toc[0]?.id ?? '';
   for (const item of toc) { const el = document.getElementById(item.id); if (el && el.getBoundingClientRect().top <= line + 2) current = item.id; }
   setActive(current);
   const box = root.getBoundingClientRect();
   setProgress(Math.round(Math.max(0,Math.min(1,(line-box.top)/Math.max(1,box.height-line)))*100));
  };
  const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
  update();
  const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(schedule);
  if(header) observer?.observe(header); if(summary) observer?.observe(summary);
  window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);window.addEventListener('hashchange',schedule);
  return () => { observer?.disconnect();if(frame) cancelAnimationFrame(frame);window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);window.removeEventListener('hashchange',schedule);root.style.removeProperty('--signature-sticky-top');root.style.removeProperty('--signature-reading-line'); };
 },[toc]);
 if(!toc.length) return null;
 return <details ref={ref} data-signature-toc="true" data-kcroc-intelligent-sticky="true" onKeyDown={e=>{if(e.key==='Escape'&&e.currentTarget.open){e.currentTarget.open=false;e.currentTarget.querySelector('summary')?.focus();}}}>
 <summary><List size={18} aria-hidden="true"/><strong>{arabic?'محتويات الدليل':'On this page'}</strong><span data-signature-current="true" aria-hidden="true">{toc.find(i=>i.id===active)?.label}</span><span aria-hidden="true">{progress}%</span><ChevronDown size={18} aria-hidden="true"/></summary>
 <nav aria-label={arabic?'محتويات الدليل':'Table of contents'}><ol>{toc.map(item=><li key={item.id}><a href={'#'+item.id} aria-current={active===item.id?'location':undefined} onClick={e=>{if(!e.ctrlKey&&!e.metaKey&&!e.shiftKey&&!e.altKey&&ref.current)ref.current.open=false;}}>{item.label}</a></li>)}</ol></nav>
 </details>;
}
