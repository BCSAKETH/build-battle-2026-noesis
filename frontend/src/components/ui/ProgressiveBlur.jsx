import React from 'react';

/**
 * ProgressiveBlur — Magic UI Component
 * Multi-layer progressive backdrop blur overlay for lists and containers.
 */
export function ProgressiveBlur({
  position = 'bottom', // 'top' | 'bottom' | 'left' | 'right'
  height = '35%',
  className = '',
  style = {}
}) {
  const isBottom = position === 'bottom';
  const isTop = position === 'top';

  const gradientDirection = isBottom ? 'to bottom' : isTop ? 'to top' : 'to right';

  return (
    <div
      className={`magic-progressive-blur ${className}`}
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: isBottom ? 0 : undefined,
        top: isTop ? 0 : undefined,
        height: height,
        pointerEvents: 'none',
        background: `linear-gradient(${gradientDirection}, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.95) 100%)`,
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        maskImage: `linear-gradient(${gradientDirection}, transparent 0%, black 100%)`,
        WebkitMaskImage: `linear-gradient(${gradientDirection}, transparent 0%, black 100%)`,
        zIndex: 10,
        ...style
      }}
    />
  );
}

export default ProgressiveBlur;
