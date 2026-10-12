import React from 'react';

/**
 * AnimatedCircularProgressBar - Magic UI Component
 * Smooth SVG circular gauge with animated strokeDashoffset.
 */
export function AnimatedCircularProgressBar({
  max = 100,
  min = 0,
  value = 0,
  gaugePrimaryColor = '#4f46e5',
  gaugeSecondaryColor = '#e2e8f0',
  size = 100,
  strokeWidth = 10,
  className = '',
  suffix = '%',
  label = ''
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const normalizedValue = Math.min(Math.max(value, min), max);
  const percentage = ((normalizedValue - min) / (max - min)) * 100;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div
      className={`circular-progress-wrapper ${className}`}
      style={{
        position: 'relative',
        width: size,
        height: size,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: 'rotate(-90deg)' }}
      >
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={gaugeSecondaryColor}
          strokeWidth={strokeWidth}
        />
        {/* Primary indicator */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={gaugePrimaryColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        />
      </svg>

      <div
        style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}
      >
        <span style={{ fontSize: `${size * 0.22}px`, fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>
          {typeof value === 'number' && value % 1 !== 0 ? value.toFixed(1) : value}{suffix}
        </span>
        {label && (
          <span style={{ fontSize: `${size * 0.11}px`, color: '#64748b', fontWeight: 600, marginTop: '2px' }}>
            {label}
          </span>
        )}
      </div>
    </div>
  );
}

export default AnimatedCircularProgressBar;
