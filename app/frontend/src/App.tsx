// File: app/frontend/src/App.tsx
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RootLayout } from './core/components/layout/RootLayout';

// ⚡ PERFORMANCE: We "lazy load" the pages so they only download when the user clicks them
const Home = lazy(() => import('./pages/Home'));
const ServicePage = lazy(() => import('./pages/ServicePage').then(module => ({ default: module.ServicePage })));

// ⏳ UI: A sleek enterprise loading spinner to show while the micro-chunks download
const PageLoader = () => (
  
    
  
);

export const App: React.FC = () => {
  return (
    
      
        }>
          
          {/* Suspense tells React to show the Spinner while waiting for the Lazy page */}
          }>
              
            
          } />
          
          }>
              
            
          } />

        
      
    
  );
};

export default App;
