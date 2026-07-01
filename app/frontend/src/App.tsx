// File: app/frontend/src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RootLayout } from './core/components/layout/RootLayout';
import { Home } from './pages/Home';
import { ServicePage } from './pages/ServicePage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* The RootLayout wraps the whole site, keeping your Header & Footer visible */}
        <Route path="/" element={<RootLayout />}>
          
          {/* 1. The Home Page */}
          <Route index element={<Home />} />
          
          {/* 2. The Magic Dynamic Route! 
            This single line automatically creates pages for:
            /laptop-repair-kuwait
            /macbook-repair-kuwait
            /gaming-pc-repair-kuwait
            ...and any future services you add to the registry!
          */}
          <Route path="/:slug" element={<ServicePage />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
