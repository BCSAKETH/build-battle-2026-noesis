import React, { useState } from 'react';

/**
 * InteractiveGridPattern - Magic UI Component
 * Dynamic interactive background grid that glows on hover.
 */
export function InteractiveGridPattern({
  width = 40,
  height = 40,
  squares = [24, 24],
  className = '',
  squaresClassName = '',
  ...props
}) {
  const [horizontal, vertical] = squares;
  const [hoveredSquare, setHoveredSquare] = useState(null);

  return (
    <svg
      width={width * horizontal}
      height={height * vertical}
      className={`interactive-grid ${className}`}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'auto',
        maskImage: 'radial-gradient(550px circle at center, white, transparent)',
        WebkitMaskImage: 'radial-gradient(550px circle at center, white, transparent)'
      }}
      {...props}
    >
      <defs>
        <pattern
          id="interactive-grid-pattern"
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
        >
          <path
            d={`M ${width} 0 L 0 0 0 ${height}`}
            fill="none"
            stroke="rgba(99, 102, 241, 0.08)"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#interactive-grid-pattern)" />
      <g>
        {Array.from({ length: horizontal * vertical }).map((_, i) => {
          const x = (i % horizontal) * width;
          const y = Math.floor(i / horizontal) * height;
          const isHovered = hoveredSquare === i;

          return (
            <rect
              key={i}
              x={x}
              y={y}
              width={width}
              height={height}
              className={squaresClassName}
              style={{
                fill: isHovered ? 'rgba(79, 70, 229, 0.12)' : 'transparent',
                stroke: isHovered ? 'rgba(79, 70, 229, 0.25)' : 'transparent',
                strokeWidth: 1,
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={() => setHoveredSquare(i)}
              onMouseLeave={() => setHoveredSquare(null)}
            />
          );
        })}
      </g>
    </svg>
  );
}

export default InteractiveGridPattern;
