// File: app/frontend/src/components/home/WhyUs.tsx
export const WhyUs = () => (
  <section className="bg-neutral-800 py-16 px-4">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">Why KCROC vs. Mall Shops?</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-neutral-300">
          <thead>
            <tr className="border-b border-neutral-700">
              <th className="py-4">Feature</th>
              <th className="py-4 text-emerald-500">KCROC</th>
              <th className="py-4 text-neutral-500">Mall Kiosks</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="py-4">Diagnosis</td><td className="py-4 font-bold">Component-Level</td><td className="py-4">"Swap the Board"</td></tr>
            <tr><td className="py-4">Convenience</td><td className="py-4 font-bold">Free Pick & Drop</td><td className="py-4">You drive to us</td></tr>
            <tr><td className="py-4">Warranty</td><td className="py-4 font-bold">30-Day Guarantee</td><td className="py-4">None</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
);
