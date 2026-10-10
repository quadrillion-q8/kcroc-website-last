import React from 'react';
import { ArrowRight, CalendarClock, CheckCircle2, MessageCircle, ShieldCheck, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { buildWhatsAppLink } from '../../utils/whatsappIntent';
import { useAnalytics } from '../../core/analytics/AnalyticsProvider';

export default function RepairProofCTA() {
  const { trackConversion } = useAnalytics();
  const whatsappLink = buildWhatsAppLink(
    "Hi KCROC, I'd like help diagnosing my device before deciding on a repair. I'll share the model and symptoms. Can you advise on repair options and free pickup?"
  );

  return (
    <section
      className="w-full px-4 sm:px-6 py-7 sm:py-12"
      aria-labelledby="repair-proof-cta-title"
    >
      <div className="max-w-6xl mx-auto rounded-2xl border border-white/[0.08] bg-[#11171b] p-5 sm:p-8 lg:p-10 shadow-none">
        <div className="grid lg:grid-cols-[1fr_auto] gap-7 lg:gap-10 items-center">
          <div>
            <p className="text-cyan-400 text-xs font-black uppercase tracking-[0.14em] mb-3">
              Need a repair decision?
            </p>
            <h2 id="repair-proof-cta-title" className="text-white text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
              Let us diagnose the fault before you commit to a replacement.
            </h2>
            <p className="text-slate-400 mt-3 max-w-2xl text-sm sm:text-base leading-relaxed">
              Send the device model and symptom on WhatsApp, or book free pickup. We confirm the fault and explain the repair path before proceeding.
            </p>

            <div className="flex flex-wrap gap-2 mt-5">
              <span className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.07] bg-white/[0.018] px-3 py-2 text-[11px] font-semibold text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" /> Diagnosis first
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.07] bg-white/[0.018] px-3 py-2 text-[11px] font-semibold text-slate-300">
                <Truck className="w-3.5 h-3.5 text-cyan-400" aria-hidden="true" /> Free pickup across Kuwait
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.07] bg-white/[0.018] px-3 py-2 text-[11px] font-semibold text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" /> Warranty on eligible repairs
              </span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-2.5 min-w-[220px]">
            <Link
              to={ROUTES.BOOKING}
              onClick={() => trackConversion('cta_click', { cta_name: 'repair_proof_book_pickup', button_position: 'repair_proof_cta' })}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-5 py-3.5 min-h-[48px] font-black text-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 touch-manipulation"
            >
              <CalendarClock className="w-5 h-5" aria-hidden="true" />
              Book Free Pickup
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackConversion('whatsapp_click', { cta_name: 'repair_proof_whatsapp', button_position: 'repair_proof_cta' })}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] hover:brightness-95 text-slate-950 px-5 py-3.5 min-h-[48px] font-black text-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 touch-manipulation"
              aria-label="Message KCROC on WhatsApp"
            >
              <MessageCircle className="w-5 h-5" aria-hidden="true" />
              WhatsApp a Technician
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
