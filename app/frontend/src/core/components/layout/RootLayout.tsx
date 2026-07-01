// File: app/frontend/src/core/components/layout/RootLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';

export const RootLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-brand-dark text-foreground font-sans selection:bg-brand-primary/30">
      <main className="flex-grow flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
