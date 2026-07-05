// File: app/frontend/src/components/home/Process.tsx
export const Process = () => (
  <section className="py-24 px-6 bg-slate-950">
    <div className="max-w-5xl mx-auto">
      <h2 className="text-3xl font-black text-white mb-16 text-center">How Our Repair Process Works</h2>
      <div className="grid md:grid-cols-3 gap-12">
        {[
          { step: "01", title: "Free Collection", desc: "Schedule a pickup via WhatsApp. We collect your device from your doorstep in Kuwait." },
          { step: "02", title: "Precision Diagnostic", desc: "Our lab identifies the specific component failure using thermal and electrical tracing." },
          { step: "03", title: "Repair & Return", desc: "Once approved, we fix the hardware, test it under load, and return it to you." }
        ].map((item, idx) => (
          <div key={idx} className="relative text-center">
            <div className="text-6xl font-black text-slate-800 mb-4">{item.step}</div>
            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
            <p className="text-slate-400 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
