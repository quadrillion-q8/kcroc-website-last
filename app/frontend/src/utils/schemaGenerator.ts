// File: src/utils/schemaGenerator.ts
import { BUSINESS_INFO } from '../constants/data';

export const generateSchema = (type: 'LocalBusiness' | 'Article' | 'FAQ', data: any) => {
  const base = { "@context": "https://schema.org" };

  switch (type) {
    case 'LocalBusiness':
      return {
        ...base,
        "@type": "LocalBusiness",
        "@id": `${BUSINESS_INFO.url}/#business`,
        "name": BUSINESS_INFO.name,
        "url": BUSINESS_INFO.url,
        "telephone": BUSINESS_INFO.phone,
        "logo": BUSINESS_INFO.logo,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": data.street,
          "addressLocality": data.city,
          "addressCountry": "KW"
        }
      };

    case 'Article':
      return {
        ...base,
        "@type": "Article",
        "headline": data.title,
        "image": data.image,
        "datePublished": data.date,
        "author": { "@type": "Person", "name": data.author },
        "publisher": { 
          "@type": "Organization", 
          "name": BUSINESS_INFO.name,
          "logo": { "@type": "ImageObject", "url": BUSINESS_INFO.logo }
        }
      };
      
    case 'FAQ':
      return {
        ...base,
        "@type": "FAQPage",
        "mainEntity": data.map((item: any) => ({
          "@type": "Question",
          "name": item.q,
          "acceptedAnswer": { "@type": "Answer", "text": item.a }
        }))
      };

    default:
      return base;
  }
};
