import React, { useEffect, useState } from 'react';

/**
 * ScrollProgress - Magic UI Component
 * Renders a reactive progress bar directly beneath the navigation bar.
 */
export function ScrollProgress({ className = '', style = {} }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`scroll-progress ${className}`}
      style={{
        position: 'fixed',
        top: '68px',
        left: 0,
        right: 0,
        height: '3px',
        zIndex: 99,
        pointerEvents: 'none',
        background: 'rgba(226, 232, 240, 0.4)',
        ...style
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #4f46e5 0%, #06b6d4 50%, #10b981 100%)',
          transition: 'width 0.1s ease-out'
        }}
      />
    </div>
  );
}

export default ScrollProgress;
