import React from 'react';

/**
 * AuroraText — Magic UI Component
 * Dynamic fluid aurora borealis iridescent text with continuous chromatic flow.
 */
export function AuroraText({
  children,
  className = '',
  speed = '6s',
  style = {}
}) {
  return (
    <span
      className={`magic-aurora-text ${className}`}
      style={{
        display: 'inline-block',
        backgroundImage: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 25%, #db2777 50%, #06b6d4 75%, #4f46e5 100%)',
        backgroundSize: '300% 300%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        animation: `aurora-flow ${speed} ease infinite`,
        fontWeight: 'inherit',
        ...style
      }}
    >
      {children}

      <style>{`
        @keyframes aurora-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </span>
  );
}

export default AuroraText;
