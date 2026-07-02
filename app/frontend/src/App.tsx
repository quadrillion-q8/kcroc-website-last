// File: app/frontend/src/App.tsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RootLayout } from './core/components/layout/RootLayout';
import { ChatWidget } from './components/ChatWidget';

// ⚡ PERFORMANCE: We "lazy load" the pages so they only download when the user clicks them
const Home = lazy(() => import('./pages/Home'));
const ServicePage = lazy(() => import('./pages/ServicePage').then(module => ({ default: module.ServicePage })));

// ⏳ UI: A sleek enterprise loading spinner to show while the micro-chunks download
const PageLoader = () => (
  <div className="w-full h-[60vh] flex items-center justify-center bg-[#0a0f1c]">
    <div className="w-10 h-10 border-4 border-slate-800 border-t-cyan-400 rounded-full animate-spin"></div>
  </div>
);

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          
          {/* Suspense tells React to show the Spinner while waiting for the Lazy page */}
          <Route index element={
            <Suspense fallback={<PageLoader />}>
              <Home />
            </Suspense>
          } />
          
          <Route path="/:slug" element={
            <Suspense fallback={<PageLoader />}>
              <ServicePage />
            </Suspense>
          } />

        </Route>
      </Routes>
      
      {/* Renders the AI Chat Widget globally across all routes */}
      <ChatWidget /> 
    </BrowserRouter>
  );
};

// THIS IS THE CRITICAL LINE THAT WAS MISSING
export default App;
