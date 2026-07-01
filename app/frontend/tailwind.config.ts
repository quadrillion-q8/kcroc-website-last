// File: app/frontend/tailwind.config.ts
import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  
  // ✅ 1. PERFORMANCE: Tightly scoped content globs to reduce build scanning time
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}"
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      // ✅ 2. SPACING SYSTEM: Standardized container paddings
      padding: { DEFAULT: "1.5rem", md: "2rem", lg: "4rem" },
      screens: { "2xl": "1400px" },
    },
    extend: {
      // ✅ 3. TYPOGRAPHY SCALE: Semantic naming with paired line-heights and tracking
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
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

      // ✅ 4. Z-INDEX SCALE: No more scattered magic numbers
      zIndex: {
        hide: "-1",
        base: "0",
        elevated: "10",
        dropdown: "1000",
        sticky: "1100",
        overlay: "1200",
        modal: "1300",
        popover: "1400",
        toast: "1500",
        tooltip: "1600",
      },

      colors: {
        // --- SEMANTIC DESIGN TOKENS ---
        brand: {
          dark: '#020617',     // slate-950
          primary: '#06b6d4',  // cyan-500
          accent: '#38bdf8',   // sky-400
        },
        surface: {
          DEFAULT: '#0f172a',  // slate-900 (Cards, Sections)
          hover: '#1e293b',    // slate-800
          elevated: '#334155', // slate-700 (Dropdowns, Modals)
          glass: 'rgba(15, 23, 42, 0.7)', // Glassmorphism layer
        },
        status: {
          success: '#10b981',  // emerald-500
          warning: '#f59e0b',  // amber-500
          error: '#ef4444',    // red-500
          info: '#3b82f6',     // blue-500
        },

        // --- SHADCN/UI CORE TOKENS ---
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },

      // ✅ 5. ELEVATION SYSTEM: Reusable shadows
      boxShadow: {
        surface: "0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px -1px rgba(0, 0, 0, 0.2)",
        elevated: "0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -4px rgba(0, 0, 0, 0.3)",
        floating: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
        glow: "0 0 20px 0 rgba(6, 182, 212, 0.3)", // Cyan glow for primary elements
      },

      // ✅ 6. REUSABLE GRADIENTS
      backgroundImage: {
        'gradient-hero': 'linear-gradient(to right bottom, #020617, #0f172a)',
        'gradient-primary': 'linear-gradient(to right, #06b6d4, #38bdf8)',
        'glass-overlay': 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)',
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        // ✅ 7. COMPONENT SIZING (Shapes)
        card: "1rem",
        button: "0.5rem",
      },

      // ✅ 8. ANIMATION LIBRARY: Reusable keyframes
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        blob: {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "shimmer": { // Loading skeleton animation
          "100%": { transform: "translateX(100%)" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "blob": "blob 7s infinite",
        "fade-in-up": "fade-in-up 0.5s ease-out forwards",
        "float": "float 3s ease-in-out infinite",
        "shimmer": "shimmer 2s infinite linear",
      },
    },
  },
  // ✅ 9. PLUGIN ORGANIZATION
  plugins: [
    tailwindcssAnimate,
  ],
} satisfies Config;
