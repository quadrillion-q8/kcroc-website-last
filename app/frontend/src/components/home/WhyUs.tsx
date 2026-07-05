// File: app/frontend/src/components/home/WhyUs.tsx
import { ShieldCheck, Zap, Truck, Lock } from 'lucide-react';

export const WhyUs = () => (
  <section className="w-full bg-slate-900 py-24 px-6 border-t border-slate-800">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-4xl font-black text-white mb-16 text-center">Why KCROC vs. Mall Shops?</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { icon: Zap, title: "Component-Level Repair", desc: "We fix the board itself—micro-soldering and trace repair—instead of forcing you to buy expensive full replacements." },
          { icon: ShieldCheck, title: "No Fix, No Fee", desc: "Our diagnostic is precise. If we can't fix it or identify the issue, you pay nothing. It's that simple." },
          { icon: Truck, title: "Free Pick & Drop", desc: "We cover Hawalli, Salmiya, Kuwait City, and beyond. We handle the logistics so you don't have to leave home." },
          { icon: Lock, title: "Data Privacy", desc: "Your data stays yours. We operate under strict hardware-only protocols to ensure your privacy is never compromised." }
        ].map((feature, idx) => (
          <div key={idx} className="bg-slate-950 p-8 rounded-2xl border border-slate-800 hover:border-emerald-500/30 transition-all">
            <feature.icon className="w-10 h-10 text-emerald-500 mb-6" />
            <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
