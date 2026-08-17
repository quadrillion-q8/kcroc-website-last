import React from 'react';
import { buildWhatsAppLink } from '../../utils/whatsappIntent';

export interface DIYStep {
  title: string;
  description: string;
}

export interface ProService {
  title: string;
  description: string;
}

export interface ServiceGuideProps {
  title: string;
  subtitle: string;
  symptoms: string[];
  causes: string[];
  diySteps: DIYStep[];
  warning: string;
  proServices: ProService[];
  businessInfo: {
    name: string;
    address: string;
    phone: string;
  };
}

export const ServiceGuide: React.FC<ServiceGuideProps> = ({
  title,
  subtitle,
  symptoms,
  causes,
  diySteps,
  warning,
  proServices,
  businessInfo,
}) => {
  return (
    <article className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100 my-8">
      {/* Header Section */}
      <div className="bg-slate-900 px-8 py-10 text-center">
        <h2 className="text-3xl font-bold text-white mb-3">{title}</h2>
        <p className="text-emerald-400 font-medium text-lg">{subtitle}</p>
      </div>

      <div className="p-8 space-y-10 text-slate-700">
        {/* Symptoms & Causes Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span>🌡️</span> Symptoms
            </h3>
            <ul className="space-y-2 list-disc list-inside">
              {symptoms.map((symptom, idx) => (
                <li key={idx} className="text-slate-600 leading-relaxed">{symptom}</li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span>🔍</span> Common Causes
            </h3>
            <ul className="space-y-2 list-disc list-inside">
              {causes.map((cause, idx) => (
                <li key={idx} className="text-slate-600 leading-relaxed">{cause}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* DIY Steps Section */}
        <div>
          <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <span>🛠️</span> Safe DIY Steps (Try these first!)
          </h3>
          <div className="space-y-4">
            {diySteps.map((step, idx) => (
              <div key={idx} className="flex gap-4 p-4 rounded-lg bg-emerald-50 border border-emerald-100">
                <div className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white font-bold rounded-full flex items-center justify-center">
                  {idx + 1}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{step.title}</h4>
                  <p className="text-slate-600 mt-1">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Warning Callout */}
        <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg">
          <h4 className="font-bold text-red-700 flex items-center gap-2 mb-2">
            <span>⚠️</span> Important Safety Note
          </h4>
          <p className="text-red-600 leading-relaxed">{warning}</p>
        </div>

        {/* Pro Services */}
        <div>
          <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <span>🚨</span> When to Call the Professionals
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {proServices.map((service, idx) => (
              <div key={idx} className="p-4 border border-slate-200 rounded-lg">
                <h4 className="font-bold text-slate-900 mb-1">{service.title}</h4>
                <p className="text-sm text-slate-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Footer */}
      <div className="bg-emerald-600 p-8 text-center text-white">
        <h3 className="text-2xl font-bold mb-2">Don't Risk Your Motherboard. Get a Pro Fix.</h3>
        <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
          Trusted by hundreds of customers across Kuwait. We offer professional diagnostics, fair pricing, and a satisfaction guarantee.
        </p>
        
        <div className="flex flex-col md:flex-row justify-center gap-6 text-left max-w-3xl mx-auto">
          <div className="bg-emerald-700/50 p-4 rounded-lg flex-1">
            <p className="font-bold text-emerald-100 mb-1">📍 Visit Our Workshop</p>
            <p>{businessInfo.address}</p>
          </div>
          <div className="bg-emerald-700/50 p-4 rounded-lg flex-1">
            <p className="font-bold text-emerald-100 mb-1">📞 On-Demand Service</p>
            <p className="font-bold text-xl">{businessInfo.phone}</p>
            <p className="text-sm text-emerald-200 mt-1">We come to YOU — expert repairs at your doorstep.</p>
          </div>
        </div>
        
        <div className="mt-8">
          <a 
            // 🩹 FIX: replaced fragile inline regex ('965' + digits, guarded
            // by a startsWith check done twice) with the shared
            // buildWhatsAppLink helper, which normalizes the country code
            // the same way everywhere on the site.
            href={buildWhatsAppLink(undefined, businessInfo.phone)} 
            className="inline-block bg-white text-emerald-700 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-slate-50 transition-colors"
          >
            WhatsApp a Technician Now
          </a>
        </div>
      </div>
    </article>
  );
};
