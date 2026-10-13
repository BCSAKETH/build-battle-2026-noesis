import React from 'react';

/**
 * NoesisSignatureLogo — Official Unified Brand Mark for NOESIS / InsightFlow
 * Features an interlocking triple-loop Cognitive Nexus Prism with luminous gradients
 * and precision typography.
 */
export default function NoesisSignatureLogo({
  size = 38,
  showBadge = true,
  showText = true,
  animated = false,
  badgeText = 'INSIGHTFLOW',
  className = '',
  style = {},
  onClick
}) {
  const iconSize = size;
  const gradientId = 'noesisGrad_' + size;

  return (
    <div
      onClick={onClick}
      className={`noesis-signature-brand-mark ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '11px',
        userSelect: 'none',
        textDecoration: 'none',
        cursor: onClick ? 'pointer' : 'default',
        ...style
      }}
    >
      {/* 1. Cognitive Nexus Prism Icon */}
      <div
        style={{
          width: iconSize,
          height: iconSize,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}
      >
        <svg
          viewBox="0 0 44 44"
          width={iconSize}
          height={iconSize}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            overflow: 'visible',
            filter: animated ? 'drop-shadow(0 0 10px rgba(79, 70, 229, 0.35))' : 'drop-shadow(0 2px 6px rgba(79, 70, 229, 0.15))'
          }}
        >
          <defs>
            {/* Primary Nexus Gradient 1: Royal Indigo */}
            <linearGradient id={`${gradientId}_1`} x1="4" y1="4" x2="40" y2="40" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#4F46E5" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>

            {/* Primary Nexus Gradient 2: Cyan Radiance */}
            <linearGradient id={`${gradientId}_2`} x1="40" y1="4" x2="4" y2="40" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>

            {/* Refraction Gold Core */}
            <linearGradient id={`${gradientId}_3`} x1="18" y1="18" x2="26" y2="26" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#EF4444" />
            </linearGradient>

            {/* Ambient Glow Filter */}
            <filter id={`${gradientId}_glow`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Rounded Shield Tile */}
          <rect
            x="2"
            y="2"
            width="40"
            height="40"
            rx="11"
            fill="#FFFFFF"
            stroke="#E2E8F0"
            strokeWidth="1.5"
          />

          {/* Interlocking Cognitive Prism Nodes */}
          {/* Top-Right to Bottom-Left Sweep */}
          <path
            d="M14 12C18 10 28 10 32 14C36 18 36 28 32 32C28 36 18 36 14 32C10 28 10 18 14 12Z"
            stroke={`url(#${gradientId}_1)`}
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeDasharray={animated ? '60' : 'none'}
            style={animated ? { animation: 'nexusDraw 3s ease-in-out infinite' } : {}}
          />

          {/* Inner Geometric Clarity Triangle */}
          <path
            d="M22 13L31 29H13L22 13Z"
            stroke={`url(#${gradientId}_2)`}
            strokeWidth="2.2"
            strokeLinejoin="round"
            strokeLinecap="round"
            fill="rgba(6, 182, 212, 0.08)"
          />

          {/* Central Synthesis Singularity Core */}
          <circle
            cx="22"
            cy="23"
            r="3.5"
            fill={`url(#${gradientId}_3)`}
          />
          <circle
            cx="22"
            cy="23"
            r="1.5"
            fill="#FFFFFF"
          />
        </svg>

        {animated && (
          <style>{`
            @keyframes nexusDraw {
              0% { stroke-dashoffset: 120; opacity: 0.6; }
              50% { stroke-dashoffset: 0; opacity: 1; }
              100% { stroke-dashoffset: -120; opacity: 0.6; }
            }
          `}</style>
        )}
      </div>

      {/* 2. Wordmark & Micro Badge */}
      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span
              style={{
                fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
                fontWeight: 800,
                fontSize: `${Math.round(size * 0.48)}px`,
                letterSpacing: '-0.04em',
                color: '#0F172A',
                lineHeight: 1
              }}
            >
              noesis
            </span>

            {showBadge && (
              <span
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontWeight: 700,
                  fontSize: `${Math.max(9, Math.round(size * 0.22))}px`,
                  color: '#4F46E5',
                  background: 'rgba(79, 70, 229, 0.08)',
                  border: '1px solid rgba(79, 70, 229, 0.2)',
                  padding: '1px 6px',
                  borderRadius: '999px',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  lineHeight: 1.2
                }}
              >
                {badgeText}
              </span>
            )}
          </div>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: `${Math.max(9, Math.round(size * 0.24))}px`,
              color: '#64748B',
              letterSpacing: '0.02em',
              lineHeight: 1.2
            }}
          >
            Human Cognitive Decision Engine
          </span>
        </div>
      )}
    </div>
  );
}
