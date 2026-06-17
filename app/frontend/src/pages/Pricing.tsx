import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Truck, Clock } from 'lucide-react';
import MetaSEO from '../components/seo/MetaSEO';

const pricingPlans = [
  { name: 'Basic Diagnostics', price: 'Free', features: ['System Check', 'Issue Identification', 'No obligation to fix'] },
  { name: 'Laptop Repair', price: 'From 15 KD', features: ['Hardware Repair', 'Component Testing', '30-Day Warranty'] },
  { name: 'MacBook/Gaming PC', price: 'From 25 KD', features: ['Advanced Diagnostics', 'Board-level repair', 'Optimized Performance'] },
];

export default function Pricing() {
  return (
    <main className="w-full min-h-screen bg-[#0a0f1c] text-white pt-32 pb-16 px-6">
      <MetaSEO 
        title="Pricing | KCROC Computer Repair in Kuwait" 
        description="Transparent pricing for computer and laptop repair in Kuwait. Free diagnostics and pickup. No Fix, No Fee policy." 
        canonical="https://www.computerrepairkuwait.com/pricing"
      />

      <div className="max-w-7xl mx-auto text-center mb-16">
        <Badge className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-4 py-1 mb-4">Transparent Pricing</Badge>
        <h1 className="text-4xl md:text-6xl font-black mb-6">Repair Prices in Kuwait</h1>
        <p className="text-slate-400 max-w-xl mx-auto">Fixed quotes before we start. You only pay if we fix it.</p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {pricingPlans.map((plan, i) => (
          <div key={i} className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl hover:border-cyan-500/40 transition-all">
            <h3 className="text-xl font-bold mb-4">{plan.name}</h3>
            <div className="text-4xl font-black text-cyan-400 mb-6">{plan.price}</div>
            <ul className="space-y-4 mb-8">
              {plan.features.map((f, idx) => (
                <li key={idx} className="flex items-center text-slate-300 text-sm"><Check className="w-4 h-4 mr-2 text-cyan-500" /> {f}</li>
              ))}
            </ul>
            <Button className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black">Book Now</Button>
          </div>
        ))}
      </div>

      {/* Trust Bar */}
      <div className="max-w-4xl mx-auto mt-20 p-8 bg-slate-900/30 rounded-3xl border border-slate-800 flex flex-wrap justify-center gap-8">
        <div className="flex items-center text-slate-300"><Truck className="w-6 h-6 mr-3 text-cyan-500" /> Free Pick & Drop</div>
        <div className="flex items-center text-slate-300"><Clock className="w-6 h-6 mr-3 text-cyan-500" /> 30-Day Warranty</div>
      </div>
    </main>
  );
}
