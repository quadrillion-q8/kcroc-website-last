// File: src/utils/analytics.ts
import ReactGA from "react-ga4";

// You will replace this with your actual Google Analytics ID
const TRACKING_ID = "G-XXXXXXXXXX"; 

export const initGA = () => {
  ReactGA.initialize(TRACKING_ID);
  // This automatically tracks when users load different pages
  ReactGA.send({ hitType: "pageview", page: window.location.pathname }); 
};

// A reusable function to track specific button clicks
export const trackConversion = (eventName: string, buttonLocation: string) => {
  ReactGA.event({
    category: "Lead Generation",
    action: eventName,      // e.g., "WhatsApp Click" or "Phone Call"
    label: buttonLocation,  // e.g., "Gallery Footer CTA" or "Sticky Header"
  });
};
