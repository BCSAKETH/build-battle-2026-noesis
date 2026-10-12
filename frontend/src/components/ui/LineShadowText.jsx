import React from 'react';

/**
 * LineShadowText — Magic UI Component
 * Retro-modern angled line shadow typography.
 */
export function LineShadowText({
  children,
  shadowColor = 'black',
  className = '',
  style = {}
}) {
  const actualShadow = shadowColor === 'black' ? 'rgba(15, 23, 42, 0.9)' : shadowColor;

  return (
    <span
      className={`magic-line-shadow-text ${className}`}
      style={{
        display: 'inline-block',
        position: 'relative',
        textShadow: `
          1px 1px 0px ${actualShadow},
          2px 2px 0px ${actualShadow},
          3px 3px 0px ${actualShadow},
          4px 4px 0px ${actualShadow},
          5px 5px 0px ${actualShadow},
          6px 6px 0px ${actualShadow}
        `,
        ...style
      }}
    >
      {children}
    </span>
  );
}

export default LineShadowText;
