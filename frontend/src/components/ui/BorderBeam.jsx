import React, { useId } from 'react';

/**
 * BorderBeam — Magic UI Component
 * Strictly a crisp, small thin line moving along the element's border perimeter.
 * Zero interior bleed, 100% transparent center, pure SVG vector pathLength stroke.
 */
export function BorderBeam({
  duration = 8,
  delay = 0,
  colorFrom = '#4F46E5',
  colorTo = '#06B6D4',
  borderWidth = 1.5,
  beamLength = 16, // percentage of the perimeter (default 16%)
  className = '',
  style = {}
}) {
  const gradientId = useId();

  return (
    <div
      className={`magic-border-beam ${className}`}
      style={{
        position: 'absolute',
        inset: 0,
        borderRadius: 'inherit',
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 5,
        ...style
      }}
    >
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          borderRadius: 'inherit',
          pointerEvents: 'none'
        }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colorFrom} stopOpacity="1" />
            <stop offset="70%" stopColor={colorTo} stopOpacity="0.9" />
            <stop offset="100%" stopColor={colorFrom} stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <rect
          x={borderWidth / 2}
          y={borderWidth / 2}
          width={`calc(100% - ${borderWidth}px)`}
          height={`calc(100% - ${borderWidth}px)`}
          rx="6"
          ry="6"
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={borderWidth}
          pathLength="100"
          strokeDasharray={`${beamLength} ${100 - beamLength}`}
          style={{
            animation: `border-beam-flow ${duration}s linear infinite`,
            animationDelay: `-${delay}s`
          }}
        />
      </svg>

      <style>{`
        @keyframes border-beam-flow {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: -100;
          }
        }
      `}</style>
    </div>
  );
}

export default BorderBeam;
