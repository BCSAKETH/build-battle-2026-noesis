import React from 'react';

export function Highlighter({
  children,
  action = 'highlight', // 'highlight' | 'underline'
  color = '#87CEFA',
  className = '',
  style = {}
}) {
  if (action === 'underline') {
    return (
      <span
        className={`magic-highlighter-underline ${className}`}
        style={{
          position: 'relative',
          display: 'inline-block',
          whiteSpace: 'nowrap',
          ...style
        }}
      >
        <span>{children}</span>
        <svg
          viewBox="0 0 100 20"
          preserveAspectRatio="none"
          style={{
            position: 'absolute',
            left: 0,
            bottom: '-4px',
            width: '100%',
            height: '8px',
            pointerEvents: 'none',
            overflow: 'visible'
          }}
        >
          <path
            d="M 2 12 Q 25 4, 50 14 T 98 8"
            fill="none"
            stroke={color}
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="120"
            strokeDashoffset="0"
            style={{
              animation: 'magic-draw 1.2s ease-out forwards'
            }}
          />
        </svg>
      </span>
    );
  }

  // Highlight marker style
  return (
    <span
      className={`magic-highlighter-mark ${className}`}
      style={{
        position: 'relative',
        display: 'inline-block',
        padding: '0 4px',
        margin: '0 1px',
        borderRadius: '4px',
        background: `linear-gradient(104deg, ${color}25 0%, ${color}45 100%)`,
        borderBottom: `2px solid ${color}`,
        fontWeight: 600,
        ...style
      }}
    >
      {children}
    </span>
  );
}

export default Highlighter;
