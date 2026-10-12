import React, { useState, useEffect, useMemo } from 'react';

/**
 * AnimatedList - Magic UI Component
 * Staggers items smoothly entering a live activity feed.
 */
export function AnimatedList({ children, className = '', delay = 1500 }) {
  const [index, setIndex] = useState(0);
  const childrenArray = useMemo(() => React.Children.toArray(children), [children]);

  useEffect(() => {
    if (index < childrenArray.length - 1) {
      const timeout = setTimeout(() => {
        setIndex((prevIndex) => prevIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [index, delay, childrenArray.length]);

  const itemsToShow = useMemo(() => {
    const result = childrenArray.slice(0, index + 1).reverse();
    return result;
  }, [index, childrenArray]);

  return (
    <div
      className={`animated-list-container ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        overflow: 'hidden'
      }}
    >
      {itemsToShow.map((item) => (
        <div
          key={item.key}
          style={{
            animation: 'slideInScale 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            transformOrigin: 'top center'
          }}
        >
          {item}
        </div>
      ))}

      <style>{`
        @keyframes slideInScale {
          0% {
            opacity: 0;
            transform: translateY(-16px) scale(0.96);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}

export default AnimatedList;
