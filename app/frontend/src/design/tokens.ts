// File: app/frontend/src/design/tokens.ts

export type ThemeMode = 'dark' | 'light' | 'high-contrast';

export interface DesignTokens {
  colors: {
    brand: { dark: string; primary: string; accent: string };
    surface: { default: string; hover: string; elevated: string; glass: string };
    status: { success: string; warning: string; danger: string; info: string };
    interactive: { hover: string; focus: string; disabled: string; overlay: string };
    border: string;
    background: string;
    foreground: string;
  };
  typography: {
    fonts: { sans: string; heading: string };
    scale: Record;
  };
  spacing: Record;
  radius: { sm: string; md: string; lg: string; card: string; button: string };
  zIndex: Record;
}

export const enterpriseTokens: Record = {
  dark: {
    colors: {
      brand: { dark: '#020617', primary: '#06b6d4', accent: '#38bdf8' },
      surface: { default: '#0f172a', hover: '#1e293b', elevated: '#334155', glass: 'rgba(15, 23, 42, 0.7)' },
      status: { success: '#10b981', warning: '#f59e0b', danger: '#ef4444', info: '#3b82f6' },
      interactive: { hover: 'rgba(6, 182, 212, 0.08)', focus: '#06b6d4', disabled: '#475569', overlay: 'rgba(2, 6, 23, 0.8)' },
      border: '#1e293b',
      background: '#020617',
      foreground: '#f8fafc'
    },
    typography: {
      fonts: {
        sans: '"Plus Jakarta Sans", "Inter", system-ui, sans-serif',
        heading: '"Montserrat", system-ui, sans-serif'
      },
      scale: {
        display: ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '900' }],
        h1: ['3.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '800' }],
        h2: ['2.5rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '700' }],
        h3: ['2rem', { lineHeight: '1.3', fontWeight: '700' }],
        subtitle: ['1.25rem', { lineHeight: '1.6', fontWeight: '500' }],
        body: ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        caption: ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }]
      }
    },
    spacing: { xs: '0.25rem', sm: '0.5rem', md: '1rem', lg: '1.5rem', xl: '2rem', '2xl': '3rem' },
    radius: { sm: '0.25rem', md: '0.375rem', lg: '0.5rem', card: '1rem', button: '0.5rem' },
    zIndex: { hide: '-1', base: '0', elevated: '10', dropdown: '1000', sticky: '1100', modal: '1300', toast: '1500' }
  },
  light: {
    colors: {
      brand: { dark: '#f8fafc', primary: '#0891b2', accent: '#0284c7' },
      surface: { default: '#ffffff', hover: '#f1f5f9', elevated: '#e2e8f0', glass: 'rgba(255, 255, 255, 0.7)' },
      status: { success: '#16a34a', warning: '#d97706', danger: '#dc2626', info: '#2563eb' },
      interactive: { hover: 'rgba(8, 145, 178, 0.06)', focus: '#0891b2', disabled: '#94a3b8', overlay: 'rgba(248, 250, 252, 0.8)' },
      border: '#e2e8f0',
      background: '#f8fafc',
      foreground: '#0f172a'
    },
    typography: {
      fonts: {
        sans: '"Plus Jakarta Sans", "Inter", system-ui, sans-serif',
        heading: '"Montserrat", system-ui, sans-serif'
      },
      scale: {
        display: ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '900' }],
        h1: ['3.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '800' }],
        h2: ['2.5rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '700' }],
        h3: ['2rem', { lineHeight: '1.3', fontWeight: '700' }],
        subtitle: ['1.25rem', { lineHeight: '1.6', fontWeight: '500' }],
        body: ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        caption: ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }]
      }
    },
    spacing: { xs: '0.25rem', sm: '0.5rem', md: '1rem', lg: '1.5rem', xl: '2rem', '2xl': '3rem' },
    radius: { sm: '0.25rem', md: '0.375rem', lg: '0.5rem', card: '1rem', button: '0.5rem' },
    zIndex: { hide: '-1', base: '0', elevated: '10', dropdown: '1000', sticky: '1100', modal: '1300', toast: '1500' }
  },
  'high-contrast': {
    colors: {
      brand: { dark: '#000000', primary: '#ffff00', accent: '#00ffff' },
      surface: { default: '#000000', hover: '#1a1a1a', elevated: '#333333', glass: 'rgba(0, 0, 0, 0.9)' },
      status: { success: '#00ff00', warning: '#ffaa00', danger: '#ff0000', info: '#0000ff' },
      interactive: { hover: 'rgba(255, 255, 0, 0.2)', focus: '#ffff00', disabled: '#888888', overlay: 'rgba(0, 0, 0, 0.95)' },
      border: '#ffffff',
      background: '#000000',
      foreground: '#ffffff'
    },
    typography: {
      fonts: {
        sans: 'system-ui, -apple-system, sans-serif',
        heading: 'system-ui, -apple-system, sans-serif'
      },
      scale: {
        display: ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '900' }],
        h1: ['3.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '800' }],
        h2: ['2.5rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '700' }],
        h3: ['2rem', { lineHeight: '1.3', fontWeight: '700' }],
        subtitle: ['1.25rem', { lineHeight: '1.6', fontWeight: '500' }],
        body: ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        caption: ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }]
      }
    },
    spacing: { xs: '0.25rem', sm: '0.5rem', md: '1rem', lg: '1.5rem', xl: '2rem', '2xl': '3rem' },
    radius: { sm: '0px', md: '0px', lg: '0px', card: '0px', button: '0px' },
    zIndex: { hide: '-1', base: '0', elevated: '10', dropdown: '1000', sticky: '1100', modal: '1300', toast: '1500' }
  }
};
