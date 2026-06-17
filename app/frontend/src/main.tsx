import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async'; // Imported to enable SEO management
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <HelmetProvider> {/* Application wrapped to provide SEO context */}
    <App />
  </HelmetProvider>
);
