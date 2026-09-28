// File: app/frontend/tailwind.config.js
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
        /* 🚀 Corrected to match the Business Context brand guidelines */
        sans: ["Plus Jakarta Sans", "-apple-system", "system-ui", "sans-serif"],
        heading: ["Plus Jakarta Sans", "-apple-system", "system-ui", "sans-serif"],
      },
      colors: {
        kcroc: {
          copper: '#c9804d',
          gold: '#dfaa62',
          cyan: '#22c7dc',
          'cyan-dk': '#1aa6b9',
          emerald: '#2aa879',
          slate: {
            950: '#080b0c',
            900: '#0d1214',
            800: '#171d1f',
            700: '#262e31',
            600: '#465154',
          },
          text: '#f4f1ea',
          muted: '#a3abad',
          card: 'rgba(23, 29, 31, 0.72)',
        },
        // Override the default Tailwind cool cyan/slate ramps used across
        // legacy pages so the whole site inherits the KCROC visual identity.
        cyan: {
          50: '#fff8f1',
          100: '#fbeee2',
          200: '#f7dbc5',
          300: '#efc19c',
          400: '#dfa86f',
          500: '#c9804d',
          600: '#b76d3b',
          700: '#98562f',
          800: '#7c4729',
          900: '#633b26',
          950: '#3b2418',
        },
        slate: {
          50: '#f7f8f8',
          100: '#edf0ef',
          200: '#dce2e1',
          300: '#c0c8c8',
          400: '#98a3a5',
          500: '#758184',
          600: '#59666a',
          700: '#3c474b',
          800: '#252e31',
          900: '#111719',
          950: '#080b0c',
        },
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
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
      },
      animation: {
        blob: 'blob 10s ease-in-out infinite',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
