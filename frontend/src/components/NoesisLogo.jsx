import React, { useState } from 'react';

/**
 * NOESIS v4.8 — Human Cognitive Decision Engine Branding
 * Official Light Theme Brand Asset with Orbital Iris Logo
 */
export default function NoesisLogo({ height = 42, showTagline = true, className = '' }) {
  const [imgError, setImgError] = useState(false);
  const iconSize = Math.round(height * 0.95);

  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.85rem',
        userSelect: 'none',
        textDecoration: 'none'
      }}
    >
      {/* 1. Primary Orbital Iris Logo */}
      {!imgError ? (
        <img
          src="/image_c854f5.png"
          alt="NOESIS Orbital Iris"
          onError={() => setImgError(true)}
          style={{
            width: `${iconSize}px`,
            height: `${iconSize}px`,
            objectFit: 'contain',
            flexShrink: 0,
            display: 'block'
          }}
        />
      ) : (
        /* Seamless SVG Fallback for Orbital Iris */
        <svg
          viewBox="0 0 70 70"
          width={iconSize}
          height={iconSize}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ flexShrink: 0, overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="orbitalGrad" x1="10" y1="10" x2="65" y2="65" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#4F46E5" />
              <stop offset="50%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
            <linearGradient id="cyanAccent" x1="15" y1="20" x2="65" y2="60" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#4F46E5" />
            </linearGradient>
          </defs>
          <circle cx="35" cy="35" r="30" stroke="url(#orbitalGrad)" strokeWidth="3" strokeDasharray="6 3" />
          <circle cx="35" cy="35" r="20" stroke="url(#cyanAccent)" strokeWidth="3.5" />
          <circle cx="35" cy="35" r="8" fill="#4F46E5" />
          <circle cx="35" cy="35" r="4" fill="#FFFFFF" />
        </svg>
      )}

      {/* 2. Brand Identity & Version Pill */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span
            style={{
              fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
              fontWeight: 800,
              fontSize: `${Math.max(16, height * 0.44)}px`,
              letterSpacing: '-0.025em',
              color: '#0F172A',
              lineHeight: 1
            }}
          >
            NOESIS
          </span>
          
          {/* Version Pill (Indigo border & soft indigo tint) */}
          <span
            style={{
              fontSize: '0.65rem',
              fontWeight: 700,
              padding: '2px 7px',
              borderRadius: '9999px',
              backgroundColor: '#EEF2FF',
              color: '#4F46E5',
              border: '1px solid #C7D2FE',
              letterSpacing: '0.04em',
              lineHeight: 1.2
            }}
          >
            v4.8
          </span>
        </div>

        {/* 3. Executive Tagline */}
        {showTagline && (
          <span
            style={{
              fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
              fontWeight: 600,
              fontSize: `${Math.max(9, height * 0.22)}px`,
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
