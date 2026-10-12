import React from 'react';

/**
 * Button — Modern Shadcn/UI Style Button Component
 */
export function Button({
  children,
  variant = 'default',
  size = 'default',
  className = '',
  style = {},
  onClick,
  disabled = false,
  ...props
}) {
  const isOutline = variant === 'outline';
  const isGhost = variant === 'ghost';
  const isSecondary = variant === 'secondary';

  const baseBackground = isOutline
    ? '#FFFFFF'
    : isGhost
    ? 'transparent'
    : isSecondary
    ? '#F1F5F9'
    : '#4F46E5';

  const baseColor = isOutline
    ? '#172033'
    : isGhost
    ? '#172033'
    : isSecondary
    ? '#172033'
    : '#FFFFFF';

  const baseBorder = isOutline ? '1px solid #DCE3ED' : 'none';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`ui-button ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        padding: size === 'sm' ? '6px 12px' : size === 'lg' ? '12px 24px' : '9px 18px',
        borderRadius: '8px',
        fontFamily: "'Inter', sans-serif",
        fontSize: size === 'sm' ? '12px' : '13px',
        fontWeight: 600,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        background: baseBackground,
        color: baseColor,
        border: baseBorder,
        boxShadow: variant === 'default' ? '0 2px 8px rgba(79, 70, 229, 0.25)' : 'none',
        transition: 'all 0.15s ease',
        ...style
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          if (variant === 'default') e.currentTarget.style.background = '#4338CA';
          if (variant === 'outline') e.currentTarget.style.background = '#F8FAFC';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.background = baseBackground;
        }
      }}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
