import { Helmet } from 'react-helmet-async';

interface MetaSEOProps {
  title: string;
  description: string;
  canonical?: string;
}

export default function MetaSEO({ title, description, canonical }: MetaSEOProps) {
  return (
    <Helmet>
      <title>{title} | Kuwait Computer Repair On Call</title>
      <meta name="description" content={description} />
      {/* Open Graph Tags for Social Media */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      {canonical && <link rel="canonical" href={canonical} />}
    </Helmet>
  );
}
