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
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.5rem", md: "2rem", lg: "4rem" },
      screens: { "2xl": "1400px" },
    },
    extend: {
      fontFamily: {
        sans: ["Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
        heading: ["Montserrat", "system-ui", "sans-serif"],
      },
      colors: {
        brand: { dark: '#020617', primary: '#06b6d4', accent: '#38bdf8' },
        surface: { DEFAULT: '#0f172a', hover: '#1e293b', elevated: '#334155', glass: 'rgba(15, 23, 42, 0.7)' },
        status: { success: '#10b981', warning: '#f59e0b', error: '#ef4444', info: '#3b82f6' },
        background: "hsl(222 84% 5%)",
        foreground: "hsl(210 40% 98%)",
        primary: { DEFAULT: "hsl(192 95% 42%)", foreground: "hsl(210 40% 98%)" },
        border: "hsl(217 32% 17%)",
        card: "hsl(222 84% 7%)",
      },
      borderRadius: {
        lg: "0.75rem", md: "0.5rem", sm: "0.25rem", card: "1rem", button: "0.5rem",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
