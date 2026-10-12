import React, { useEffect, useRef, useState } from 'react';

/**
 * TextReveal - Reveals text dynamically or on scroll
 */
export function TextReveal({
  children,
  className = ""
}) {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(1);
  const text = typeof children === 'string' ? children : '';
  const words = text ? text.split(' ') : [];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // Calculate how far container has scrolled into view
      const start = windowHeight * 0.85;
      const end = windowHeight * 0.25;
      const current = rect.top;
      const p = Math.min(Math.max((start - current) / (start - end), 0.2), 1);
      setProgress(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!text) {
    return <div ref={containerRef} className={className}>{children}</div>;
  }

  return (
    <div
      ref={containerRef}
      className={`relative font-semibold tracking-tight ${className}`}
      style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35em', lineHeight: 1.3 }}
    >
      {words.map((word, i) => {
        const wordThreshold = i / words.length;
        const opacity = progress >= wordThreshold ? 1 : 0.2;
        return (
          <span
            key={i}
            style={{
              transition: 'opacity 0.3s ease, filter 0.3s ease',
              opacity,
              filter: opacity < 1 ? 'blur(1px)' : 'none',
              display: 'inline-block'
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
}

export default TextReveal;
