// File: app/frontend/src/components/MapComponent.tsx
import React from 'react';

export default function MapComponent() {
  return (
    <div className="rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-900 p-2 w-full">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3477.976237935758!2d48.00761257498341!3d29.3416921515256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fcf9b4a9072aacd%3A0x368691a3a1f0ca66!2sKuwait%20Computer%20Repair%20on%20Call!5e0!3m2!1sen!2sus!4v1782174228669!5m2!1sen!2sus"
        width="100%"
        height="450"
        style={{ border: 0, borderRadius: '1.5rem' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        title="KCROC Computer Repair - Hawalli Lab Location"
      />
    </div>
  );
}
