import React from 'react';
// This line imports the "empty frame" you created earlier
import { ServiceGuide } from '../components/content/ServiceGuide';

export const DellOverheatingPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <ServiceGuide 
        title="Laptop Overheating & Shutdown Guide: Dell Inspiron 7577"
        subtitle="⭐ Expert Technical Advice from Kuwait Computer Repair On Call"
        
        symptoms={[
          "Fan runs at maximum speed or makes loud whirring noises.",
          "Bottom of the chassis feels extremely hot to the touch.",
          "Sudden system shutdowns during use or gaming.",
          "Performance drops (stuttering/freezing) caused by thermal throttling.",
          "Windows thermal event errors in Event Viewer."
        ]}
        
        causes={[
          "Dust Accumulation: Clogged vents & heatsinks trap heat inside the chassis.",
          "Thermal Paste Degradation: The compound dries out after 2–3 years.",
          "Blocked Airflow: Using the device on beds or pillows suffocates intake vents.",
          "Fan Failure: Worn bearings prevent proper cooling."
        ]}
        
        diySteps={[
          { title: "Clean External Vents", description: "Power off and unplug. Use compressed air in short bursts into the exhaust vents. Hold the fan still with a toothpick to prevent damage." },
          { title: "Elevate for Airflow", description: "Use a cooling pad or simply place a book under the rear edge to improve intake. Never use your laptop on carpets or blankets." },
          { title: "Optimize Software", description: "Check Task Manager (Ctrl+Shift+Esc) to end high-CPU processes. Set Power Settings to 'Balanced'." }
        ]}
        
        warning="These three steps are safe for anyone. Do NOT open your laptop, remove the heatsink, or apply thermal paste without professional training. Incorrect disassembly often leads to stripped screws, damaged ribbon cables, or motherboard failure."
        
        proServices={[
          { title: "Precision Thermal Paste", description: "Correct torque patterns and application to prevent 'hot spots'." },
          { title: "Fan Replacement", description: "Safe disassembly of delicate ZIF connectors and ribbon cables." },
          { title: "Deep Internal Cleaning", description: "ESD-safe service to prevent static damage to your sensitive motherboard components." }
        ]}
        
        businessInfo={{
          name: "Kuwait Computer Repair On Call",
          address: "Hawalli, Ibn Khaldoun St, Al Mullah Complex, Basement Shop 19",
          phone: "55301913"
        }}
      />
    </div>
  );
};
