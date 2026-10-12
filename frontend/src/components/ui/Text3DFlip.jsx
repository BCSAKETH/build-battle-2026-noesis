import React from 'react';

/**
 * Text3DFlip - Magic UI Component
 * 3D isometric letter flip effect on hover and entrance.
 */
export function Text3DFlip({
  children,
  className = '',
  style = {}
}) {
  const text = typeof children === 'string' ? children : '';

  return (
    <span
      className={`text-3d-flip-group ${className}`}
      style={{
        display: 'inline-flex',
        perspective: '1000px',
        cursor: 'default',
        ...style
      }}
    >
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="flip-letter"
          style={{
            display: 'inline-block',
            transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            transitionDelay: `${index * 25}ms`,
            transformStyle: 'preserve-3d'
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}

      <style>{`
        .text-3d-flip-group:hover .flip-letter {
          transform: rotateX(360deg);
          color: #4f46e5;
        }
      `}</style>
    </span>
  );
}

export default Text3DFlip;
