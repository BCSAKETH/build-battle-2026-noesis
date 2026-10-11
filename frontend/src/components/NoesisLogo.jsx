import React from 'react';

/**
 * NOESIS Brand Logo — Designed via Stitch Design Engine
 * Symbolism:
 * - Interlocking Neural Arcs: Dual hemispheres of human cognition (emotional empathy & logical reasoning)
 * - Secondary Dashed Synapse Loop: Continuous adaptive neuroplastic learning (Adaption SDK)
 * - Central Intuition Core: Direct, un-distorted human sensemaking
 * - Synaptic Firing Nodes: Active signal dispatch across the 7,002 customer touchpoints
 */
export default function NoesisLogo({ height = 40, showTagline = true, className = '' }) {
  // Scale icon appropriately based on requested height
  const iconSize = Math.round(height * 0.95);

  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.75rem',
        userSelect: 'none',
        textDecoration: 'none'
      }}
    >
      {/* Stitch Bespoke Vector Glyph */}
      <svg
        viewBox="0 0 70 70"
        width={iconSize}
        height={iconSize}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0, overflow: 'visible' }}
      >
        <defs>
          <linearGradient id="noesisGrad" x1="12" y1="12" x2="68" y2="68" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#4F46E5" />
            <stop offset="50%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
          <linearGradient id="synapseArc" x1="15" y1="20" x2="65" y2="60" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#06B6D4" />
            <stop offset="100%" stopColor="#4F46E5" />
          </linearGradient>
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Interlocking Neural Arcs */}
        <path
          d="M 20 18 C 32 8, 48 10, 56 22 C 62 30, 60 44, 50 52"
          stroke="url(#noesisGrad)"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 50 52 C 38 62, 22 60, 14 48 C 8 40, 10 26, 20 18"
          stroke="url(#synapseArc)"
          strokeWidth="3.2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Secondary Synaptic Interlocking Loop (Adaptive Neuroplastic Learning) */}
        <path
          d="M 23 37 C 23 27, 31 21, 41 23 C 48 25, 52 31, 50 37"
          stroke="#C7D2FE"
          strokeWidth="2.2"
          strokeDasharray="3 3"
          strokeLinecap="round"
          fill="none"
        />

        {/* Central Intuition Dot with Energy Ring */}
        <circle cx="35" cy="35" r="11" fill="#EEF2FF" stroke="url(#noesisGrad)" strokeWidth="2.5" />
        <circle cx="35" cy="35" r="5.5" fill="url(#noesisGrad)" />
        <circle cx="35" cy="35" r="2.2" fill="#FFFFFF" />

        {/* Dynamic Synapse Firing Nodes */}
        <circle cx="56" cy="22" r="3.2" fill="#4F46E5" />
        <circle cx="14" cy="48" r="3.2" fill="#06B6D4" />
      </svg>

      {/* Typography Anchor */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span
            style={{
              fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
              fontWeight: 800,
              fontSize: `${height * 0.48}px`,
              letterSpacing: '0.08em',
              color: '#0F172A',
              lineHeight: 1.05
            }}
          >
            NOESIS
          </span>
          <span
            style={{
              fontSize: '0.62rem',
              fontWeight: 700,
              padding: '1px 5px',
              borderRadius: '9999px',
              backgroundColor: '#EEF2FF',
              color: '#4F46E5',
              border: '1px solid #C7D2FE',
              letterSpacing: '0.04em',
              lineHeight: 1.3
            }}
          >
            v4.8
          </span>
        </div>
        {showTagline && (
          <span
            style={{
              fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
              fontWeight: 600,
              fontSize: `${Math.max(10, height * 0.22)}px`,
              letterSpacing: '0.12em',
              color: '#64748B',
              textTransform: 'uppercase',
              marginTop: '1px'
            }}
          >
            Human Cognitive Decision Engine
          </span>
        )}
      </div>
    </div>
  );
}
