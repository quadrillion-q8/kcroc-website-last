import React from 'react';
import { ArrowRight, Microscope, Search, Wrench, Thermometer } from 'lucide-react';
import { Link } from 'react-router-dom';
import { IMAGES } from '../../constants/images';

const BENCH_STEPS = [
  {
    title: 'Inspect',
    description: 'Visual inspection and microscope-assisted checks identify the physical and electrical clues before repair.',
    icon: Microscope,
    image: IMAGES.brand.leadTechnician,
  },
  {
    title: 'Trace the Fault',
    description: 'Technicians isolate the failed power, charging, signal, or component-level circuit.',
    icon: Search,
    image: IMAGES.services.motherboardRepair,
  },
  {
    title: 'Repair the Board',
    description: 'Component-level work targets the failed component when board repair is technically viable.',
    icon: Wrench,
    image: IMAGES.brand.technicians,
  },
  {
    title: 'Thermal Service & Testing',
    description: 'Thermal service and functional testing help confirm stable operation before the device is returned.',
    icon: Thermometer,
    image: IMAGES.services.thermalService,
  },
];

export default function BehindBench() {
  return (
    <section
      className="w-full py-12 sm:py-24 px-4 sm:px-6 border-t border-slate-800/50 bg-brand-dark/20"
      aria-labelledby="behind-bench-title"
    >
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-xs font-bold uppercase tracking-wider mb-4">
            Behind the Bench
          </div>
          <h2 id="behind-bench-title" className="text-white text-3xl sm:text-4xl font-black tracking-tight">
            See How KCROC Diagnoses and Repairs the Fault
          </h2>
          <p className="text-slate-400 mt-4 text-base leading-relaxed">
            A practical look at the workflow behind component-level computer and laptop repair in Kuwait.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {BENCH_STEPS.map(({ title, description, icon: Icon, image }, index) => (
            <article
              key={title}
              className="overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-800 bg-slate-900/30 hover:border-cyan-500/30 transition-colors"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                <img
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <span className="absolute left-3 top-3 inline-flex items-center justify-center w-8 h-8 rounded-full bg-brand-dark/90 text-cyan-400 border border-slate-700/70">
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </span>
                <span className="absolute right-3 bottom-3 px-2 py-1 rounded-full bg-brand-dark/90 text-slate-200 text-[10px] font-bold uppercase tracking-wider">
                  Step {index + 1}
                </span>
              </div>

              <div className="p-5 sm:p-6">
                <h3 className="text-white font-bold text-base sm:text-lg">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mt-2">{description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-8 sm:mt-10">
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-700 text-slate-200 hover:border-cyan-500/40 hover:text-white transition-colors font-bold text-sm"
          >
            View Case Studies
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
          <Link
            to="/book"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-colors font-bold text-sm"
          >
            Book Free Pickup
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
