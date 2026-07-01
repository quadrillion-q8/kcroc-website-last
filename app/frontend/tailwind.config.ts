// File: app/frontend/tailwind.config.ts
import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
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
      fontSize: {
        display: ["4.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "900" }],
        h1: ["3.5rem", { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "800" }],
        h2: ["2.5rem", { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "700" }],
        h3: ["2rem", { lineHeight: "1.3", fontWeight: "700" }],
        subtitle: ["1.25rem", { lineHeight: "1.6", fontWeight: "500" }],
        body: ["1rem", { lineHeight: "1.6", fontWeight: "400" }],
        caption: ["0.875rem", { lineHeight: "1.5", fontWeight: "400" }],
        overline: ["0.75rem", { lineHeight: "2", letterSpacing: "0.1em", fontWeight: "600" }],
      },
      zIndex: {
        hide: "-1", base: "0", elevated: "10", dropdown: "1000",
        sticky: "1100", overlay: "1200", modal: "1300",
        popover: "1400", toast: "1500", tooltip: "1600",
      },
      colors: {
        brand: { dark: '#020617', primary: '#06b6d4', accent: '#38bdf8' },
        surface: { DEFAULT: '#0f172a', hover: '#1e293b', elevated: '#334155', glass: 'rgba(15, 23, 42, 0.7)' },
        status: { success: '#10b981', warning: '#f59e0b', error: '#ef4444', info: '#3b82f6' },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
      },
      boxShadow: {
        surface: "0 1px 3px 0 rgba(0,0,0,0.3), 0 1px 2px -1px rgba(0,0,0,0.2)",
        elevated: "0 10px 15px -3px rgba(0,0,0,0.5), 0 4px 6px -4px rgba(0,0,0,0.3)",
        glow: "0 0 20px 0 rgba(6,182,212,0.3)",
      },
      borderRadius: {
        lg: "var(--radius)", md: "calc(var(--radius) - 2px)", sm: "calc(var(--radius) - 4px)",
        card: "1rem", button: "0.5rem",
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        blob: { "0%, 100%": { transform: "translate(0, 0) scale(1)" }, "33%": { transform: "translate(30px, -50px) scale(1.1)" }, "66%": { transform: "translate(-20px, 20px) scale(0.9)" } },
        "fade-in-up": { "0%": { opacity: "0", transform: "translateY(20px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "blob": "blob 7s infinite",
        "fade-in-up": "fade-in-up 0.5s ease-out forwards",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
