// Language entry points: design and service inventory live in the shared components.
import React from 'react';
import Home from './Home';
import Services from './Services';

export function ArabicHomePage() {
  return <Home locale="ar" />;
}

export function ArabicServicesPage() {
  return <Services locale="ar" />;
}
