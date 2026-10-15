import React from 'react';
import { Link } from 'react-router-dom';
import { KCROC_POLICY, getWarrantyLabel } from '../../constants/businessPolicy';

interface HeadTermCalloutProps {
  /** One sentence tying the reader's problem to a repair, e.g. "If your laptop still won't start after these checks". */
  lead?: string;
  /** Short label for analytics/debugging; not rendered. */
  placement?: string;
}

/**
 * Visible-to-everyone internal-link paragraph that points informational
 * pages at the two commercial head-term pages using their exact anchor text.
 * Unlike KuwaitLocalCTA (Kuwait-only, rendered after hydration) this is plain
 * server-rendered HTML, so crawlers and AI features see the links.
 * Facts used here come from businessPolicy.ts and the site's own page copy
 * (repairs from 15 KWD, quote before work, 24-48 h common turnaround).
 */
export const HeadTermCallout: React.FC<HeadTermCalloutProps> = ({
  lead = 'If these steps do not solve it,',
  placement,
}) => (
  <aside
    aria-label="Laptop and computer repair in Kuwait"
    data-placement={placement}
    className="my-10 rounded-2xl border border-cyan-500/25 bg-slate-900/50 p-5 sm:p-6"
  >
    <p className="text-base leading-7 text-slate-300">
      {lead} KCROC offers{' '}
      <Link to="/laptop-repair-kuwait" className="font-semibold text-cyan-400 underline underline-offset-2 hover:text-cyan-300">
        laptop repair in Kuwait
      </Link>{' '}
      and{' '}
      <Link to="/computer-repair-kuwait" className="font-semibold text-cyan-400 underline underline-offset-2 hover:text-cyan-300">
        computer repair in Kuwait
      </Link>{' '}
      from our Hawalli lab. Repairs start from 15 KWD, you get a quote before any work begins, and many common
      repairs are finished within 24&ndash;48 hours after diagnosis. {KCROC_POLICY.pickupAndDelivery.label},
      No Fix No Fee, and a {getWarrantyLabel()} on completed repairs.
    </p>
  </aside>
);

export default HeadTermCallout;
