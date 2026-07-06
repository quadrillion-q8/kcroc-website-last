// File: app/frontend/src/data/graph.ts

// ... (Keep the beginning of the file the same)

    /* --- FAQS --- */
    'faq-pick-and-drop': { 
      id: 'faq-pick-and-drop', slug: 'faq-pick-and-drop', entityType: 'FAQ', isActive: true, 
      title: 'Do you offer a pick and drop service?', 
      description: 'Details about our free delivery service in Kuwait.', // 👈 ADDED
      answer: 'Yes, we offer complimentary pick & drop across all Kuwait.', 
      seo: { title: 'Pick and Drop FAQ', description: 'Free delivery service.', canonicalUrl: '/faq/pick-and-drop' } 
    } as FAQEntity,
    
    'faq-liquid-damage': { 
      id: 'faq-liquid-damage', slug: 'faq-liquid-damage', entityType: 'FAQ', isActive: true, 
      title: 'Do you repair liquid damage?', 
      description: 'Information regarding liquid damage restoration.', // 👈 ADDED
      answer: 'Yes, we trace circuits to the component level.', 
      seo: { title: 'Liquid Damage FAQ', description: 'Water damage repair process.', canonicalUrl: '/faq/liquid-damage' } 
    } as FAQEntity,
    
    'faq-no-fix': { 
      id: 'faq-no-fix', slug: 'faq-no-fix', entityType: 'FAQ', isActive: true, 
      title: 'No Fix, No Fee?', 
      description: 'Details regarding our risk-free guarantee.', // 👈 ADDED
      answer: 'If we cannot repair your device, you pay zero KWD.', 
      seo: { title: 'No Fix No Fee FAQ', description: 'Risk-free repair guarantee.', canonicalUrl: '/faq/no-fix' } 
    } as FAQEntity,
  }
};
// ... (Rest of file remains the same)
