/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./core/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.5rem", md: "2rem", lg: "4rem" },
      screens: { "2xl": "1400px" },
    },
    extend: {
      fontFamily: {
        sans: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        heading: ["Montserrat", "system-ui", "sans-serif"],
      },
      colors: {
        // --- New Design Tokens from kcroc_homepage_mockup.html ---
        kcroc: {
          cyan: '#0ea5e9',
          'cyan-dk': '#0284c7',
          emerald: '#10b981',
          slate: {
            950: '#0a1628',
            900: '#0f172a',
            800: '#1e293b',
            700: '#334155',
            600: '#475569',
          },
          text: '#f1f5f9',
          muted: '#94a3b8',
          card: 'rgba(30, 41, 59, 0.7)',
        },
        // --- Existing System Tokens ---
        brand: {
          dark: 'var(--brand-dark)',
          primary: 'var(--brand-primary)',
          accent: 'var(--brand-accent)',
        },
        surface: {
          DEFAULT: 'var(--surface-default)',
          hover: 'var(--surface-hover)',
          elevated: 'var(--surface-elevated)',
          glass: 'var(--surface-glass)',
        },
        status: {
          success: 'var(--status-success)',
          warning: 'var(--status-warning)',
          danger: 'var(--status-danger)',
          info: 'var(--status-info)',
        },
      },
      borderRadius: {
        card: 'var(--radius-card)',
        button: 'var(--radius-button)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
