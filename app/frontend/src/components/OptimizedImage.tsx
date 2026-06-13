import React, { useState } from 'react';

interface OptimizedImageProps {
  src: string; // The base Cloudinary URL (without the /upload/ part)
  alt: string;
  className?: string;
  isPriority?: boolean; // Set to true for Hero images
}

export default function OptimizedImage({ src, alt, className = "", isPriority = false }: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Split the Cloudinary URL so we can inject dynamic widths
  const [baseUrl, imagePath] = src.split('/upload/');

  // Generate responsive URLs
  const mobileSrc = `${baseUrl}/upload/f_auto,q_auto,w_400/${imagePath}`;
  const desktopSrc = `${baseUrl}/upload/f_auto,q_auto,w_800/${imagePath}`;
  
  // Create a tiny, blurry placeholder for instant loading perception
  const blurPlaceholder = `${baseUrl}/upload/f_auto,q_auto,w_50,e_blur:1000/${imagePath}`;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Blurry Placeholder - visible until main image loads */}
      <img
        src={blurPlaceholder}
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-0' : 'opacity-100'}`}
      />

      {/* Main Optimized Image */}
      <img
        src={desktopSrc} // Fallback for old browsers
        srcSet={`${mobileSrc} 400w, ${desktopSrc} 800w`}
        sizes="(max-width: 768px) 100vw, 800px"
        alt={alt}
        loading={isPriority ? "eager" : "lazy"}
        fetchpriority={isPriority ? "high" : "auto"}
        decoding={isPriority ? "sync" : "async"}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
}
