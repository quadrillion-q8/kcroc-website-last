// src/components/seo/FAQSchema.tsx
import React from 'react';

interface FAQProps {
  questions: { question: string; answer: string }[];
}

export default function FAQSchema({ questions }: FAQProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": questions.map(q => ({
      "@type": "Question",
      "name": q.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.answer
      }
    }))
  };

  return (
    <script type="application/ld+json">
      {JSON.stringify(schema)}
    </script>
  );
}
