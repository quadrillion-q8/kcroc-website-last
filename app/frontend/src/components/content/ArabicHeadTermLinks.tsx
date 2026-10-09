// File: src/components/content/ArabicHeadTermLinks.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const HEAD_TERM_LINKS = [
  { to: '/ar/computer-repair-kuwait', label: 'تصليح كمبيوتر الكويت' },
  { to: '/ar/laptop-repair-kuwait', label: 'تصليح لابتوب الكويت' },
];

/**
 * Exact-anchor Arabic links to the two owner pages for the main Arabic
 * head terms ("تصليح كمبيوتر" / "تصليح لابتوب"). Rendered at the end of the
 * Arabic pages so internal links consistently point at one page per term.
 * The page currently being viewed is left out.
 */
export const ArabicHeadTermLinks: React.FC = () => {
  const { pathname } = useLocation();
  const links = HEAD_TERM_LINKS.filter((l) => l.to !== pathname.replace(/\/$/, ''));
  if (links.length === 0) return null;

  return (
    <nav aria-label="خدماتنا الرئيسية في الكويت" className="mx-auto mt-8 max-w-5xl px-4 pb-10 text-center text-sm text-slate-400 sm:px-6">
      <span>خدماتنا الرئيسية في الكويت: </span>
      {links.map((l, i) => (
        <React.Fragment key={l.to}>
          {i > 0 && <span aria-hidden="true"> · </span>}
          <Link to={l.to} className="font-bold text-cyan-300 hover:text-cyan-200">{l.label}</Link>
        </React.Fragment>
      ))}
    </nav>
  );
};

export default ArabicHeadTermLinks;
