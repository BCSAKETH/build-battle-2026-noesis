import React from 'react';

/**
 * RainbowButton — Magic UI Component
 * Shifting multi-color rainbow gradient border and subtle backdrop glow.
 */
export function RainbowButton({
  children,
  className = '',
  style = {},
  onClick,
  variant = 'default',
  speed = '4s',
  ...props
}) {
  const isOutline = variant === 'outline';

  return (
    <button
      onClick={onClick}
      className={`magic-rainbow-button ${className}`}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        padding: '10px 22px',
        borderRadius: '9999px',
        fontFamily: "'Inter', sans-serif",
        fontSize: '14px',
        fontWeight: 600,
        cursor: 'pointer',
        border: 'none',
        background: isOutline ? '#FFFFFF' : '#0F172A',
        color: isOutline ? '#0F172A' : '#FFFFFF',
        isolation: 'isolate',
        overflow: 'hidden',
        boxShadow: '0 4px 20px -4px rgba(79, 70, 229, 0.35)',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
        ...style
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 8px 25px -4px rgba(79, 70, 229, 0.45)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 20px -4px rgba(79, 70, 229, 0.35)';
      }}
      {...props}
    >
      {/* Animated Rainbow Border */}
      <span
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          padding: '2px',
          background: 'linear-gradient(90deg, #ff007a, #9b51e0, #00d2ff, #00e676, #ffab00, #ff007a)',
          backgroundSize: '200% 100%',
          animation: `rainbow-shift ${speed} linear infinite`,
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          pointerEvents: 'none'
        }}
      />
      <span style={{ position: 'relative', zIndex: 1, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
        {children}
      </span>

      <style>{`
        @keyframes rainbow-shift {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>
    </button>
  );
}

export default RainbowButton;
