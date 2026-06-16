import { useState, useEffect, useRef } from 'react';

export const useFadeIn = (threshold = 0.1) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          // Optimize: Disconnect the observer once the element is visible to save CPU cycles
          observer.unobserve(entry.target); 
        }
      },
      // Optimize: Pre-load the animation slightly before it enters the viewport
      { threshold, rootMargin: '50px' } 
    );
    
    observer.observe(el);
    
    // Cleanup function to prevent memory leaks if the component unmounts
    return () => { if (el) observer.unobserve(el); };
  }, [threshold]);

  return { ref, visible };
};
