import React, { useState } from 'react';

/**
 * KineticText — Magic UI Component
 * Kinetic typography with elastic letter-spacing, optical weight breathing,
 * and interactive cursor hover inertia.
 */
export function KineticText({
  text = 'Nostalgia',
  className = '',
  style = {},
  tag: Tag = 'div'
}) {
  const [isHovered, setIsHovered] = useState(false);
  const letters = typeof text === 'string' ? text.split('') : [];

  return (
    <Tag
      className={`magic-kinetic-text ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'default',
        userSelect: 'none',
        fontOpticalSizing: 'auto',
        letterSpacing: isHovered ? '-0.02em' : '-0.05em',
        transition: 'letter-spacing 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        ...style
      }}
    >
      {letters.map((char, index) => {
        const delay = index * 0.04;
        return (
          <span
            key={index}
            style={{
              display: 'inline-block',
              transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), font-weight 0.4s ease',
              transform: isHovered
                ? `translateY(${Math.sin(index) * -8}px) scale(${1 + (index % 2 === 0 ? 0.08 : -0.04)})`
                : 'translateY(0) scale(1)',
              animation: `kinetic-breathe 4s ease-in-out infinite ${delay}s`,
              whiteSpace: char === ' ' ? 'pre' : 'normal'
            }}
          >
            {char}
          </span>
        );
      })}

      <style>{`
        @keyframes kinetic-breathe {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-4px) scale(1.02);
          }
        }
      `}</style>
    </Tag>
  );
}

export default KineticText;
