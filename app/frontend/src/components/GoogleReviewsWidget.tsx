import React, { useEffect } from 'react';

export default function GoogleReviewsWidget() {
  useEffect(() => {
    // 1. We check if the script is already loaded so we don't add it twice
    const existingScript = document.querySelector(
      'script[src="https://reviews.beaver.codes/widget/web-google-reviews.js"]'
    );

    if (!existingScript) {
      // 2. If it doesn't exist, we safely create and inject the script
      const script = document.createElement('script');
      script.src = "https://reviews.beaver.codes/widget/web-google-reviews.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []); // The empty array ensures this only runs once when the component loads

  return (
    <section className="w-full flex justify-center items-center py-10 px-4">
      {/* 3. Your unique widget container */}
      <div 
        className="w-full max-w-7xl overflow-hidden rounded-xl shadow-2xl bg-slate-900/50 backdrop-blur-sm border border-slate-800"
        data-instance-id="MhImsZ5wx6kcrblVoQ0o"
      >
        {/* The injected script will automatically build the widget inside this div */}
      </div>
    </section>
  );
}
