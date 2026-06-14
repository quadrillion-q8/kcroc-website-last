import { Helmet } from 'react-helmet-async';
import { 
  ShieldCheck, AlertTriangle, Laptop, Droplets, Monitor, 
  Wind, Sun, Phone, MessageCircle 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ScreenProtectionTips() {
  const protectionTips = [
    { title: '1. Invest in a Quality Protective Case', description: 'Use a padded sleeve or hard-shell case to buffer against knocks, bumps, or compression damage during transit.', icon: ShieldCheck, color: 'text-emerald-400', bgColor: 'bg-emerald-500/10' },
    { title: '2. Mind Your Environment', description: 'Avoid placing your laptop on beds, floors, or desk edges where accidental stepping or sitting—the leading causes of cracked screens—can occur.', icon: AlertTriangle, color: 'text-orange-400', bgColor: 'bg-orange-500/10' },
    { title: '3. Lift with Care', description: 'Always lift by the base, never the screen. Holding by the display puts torque on hinges and the glass, leading to fatigue cracks.', icon: Laptop, color: 'text-cyan-400', bgColor: 'bg-cyan-500/10' },
    { title: '4. Keep Liquids Away', description: 'Liquids destroy screens and internal motherboards. Keep coffee and water well away from your workspace to protect your system.', icon: Droplets, color: 'text-blue-400', bgColor: 'bg-blue-500/10' },
    { title: '5. Clean Safely', description: 'Never spray directly on the screen. Use a screen-safe cleaner on a microfiber cloth to prevent liquid seepage.', icon: Monitor, color: 'text-purple-400', bgColor: 'bg-purple-500/10' },
    { title: '6. Clear the Keyboard', description: 'Before closing, check for tiny crumbs or sand. Objects trapped between screen and keys cause pressure points and fractures.', icon: Wind, color: 'text-yellow-400', bgColor: 'bg-yellow-500/10' },
    { title: '7. Skip the Webcam Cover', description: 'Plastic webcam covers are too thick for modern laptops; they create concentrated pressure that often cracks the display panel.', icon: Sun, color: 'text-red-400', bgColor: 'bg-red-500/10' }
  ];

  const faq = [
    { q: 'Can a cracked laptop screen be repaired or must it be replaced?', a: 'Unfortunately, internal LCD/LED cracks cannot be repaired; the entire panel must be replaced. We perform this service professionally at our Hawalli workshop.' },
    { q: 'Do you provide free pickup for screen replacements in Kuwait?', a: 'Yes! We offer free pickup and delivery service across all Kuwait governorates for screen replacement services.' }
  ];

  return (
    <main className="w-full min-h-screen bg-transparent text-white font-sans selection:bg-cyan-500/30">
      <Helmet>
        <title>How to Protect Your Laptop Screen: 7 Expert Tips | KCROC</title>
        <meta name="description" content="Expert tips from KCROC to prevent laptop screen damage in Kuwait's climate. Learn how to protect your display and avoid costly repairs." />
      </Helmet>

      {/* Hero Section - Optimized spacing */}
      <section className="relative pt-20 md:pt-32 pb-16 px-6 text-center overflow-hidden z-10">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-cyan-600/20 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 px-5 py-2 rounded-full text-cyan-400 text-xs font-black uppercase tracking-widest mb-8 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
             <ShieldCheck className="w-4 h-4" /> Screen Protection Guide
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-8 tracking-tight leading-[1.1]">
            How to Protect Your <br />
            <span className="text-cyan-400 drop-shadow-[0_0_25px_rgba(34,211,238,0.4)]">Laptop Screen</span>
          </h1>
          <p className="text-base md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            7 Expert Tips from Kuwait Computer Repair On Call to help you avoid broken screens and costly display repairs.
          </p>
        </div>
      </section>

      {/* Tips Grid */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {protectionTips.map((tip, index) => (
              <div key={index} className="bg-slate-900/30 backdrop-blur-md border border-slate-800 p-8 rounded-3xl hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(34,211,238,0.05)] transition-all duration-300">
                <div className={`${tip.bgColor} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border border-slate-700/50`}>
                  <tip.icon className={`w-8 h-8 ${tip.color}`} />
                </div>
                <h3 className="text-2xl font-black text-white mb-3 tracking-tight">{tip.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Repair Solution */}
      <section className="py-24 px-6 bg-slate-900/10 border-t border-slate-800/50 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-12 tracking-tight">Accidents happen—we’re here to help.</h2>
          <div className="bg-slate-900/30 backdrop-blur-md border border-slate-800 p-8 md:p-12 rounded-3xl">
            <p className="text-base md:text-lg text-slate-300 mb-10 leading-relaxed">
              If your screen is damaged, flickering, or showing signs of internal leakage, we specialize in professional display replacements and hardware repairs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/book" className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-8 py-4 rounded-full text-base transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:scale-[1.02]">
                Book Free Pickup
              </Link>
              <a href="tel:+96555301913" className="bg-slate-900 border border-slate-700 hover:bg-slate-800 text-white font-bold px-8 py-4 rounded-full text-base transition-all flex items-center justify-center">
                <Phone className="mr-2" size={20} /> Call 55301913
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-12 tracking-tight">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faq.map((item, i) => (
              <div key={i} className="bg-slate-900/30 backdrop-blur-md border border-slate-800 rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-2 text-white">{item.q}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
