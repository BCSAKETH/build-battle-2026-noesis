import React, { useId } from 'react';

/**
 * ScrollBasedVelocity — Magic UI Component
 * Buttery smooth, calm, continuous marquee velocity rows.
 * Flows steadily and elegantly with pure GPU hardware acceleration.
 */
export function ScrollVelocityRow({
  children,
  baseVelocity = 1,
  direction = 1, // 1 for left-to-right or -1 for right-to-left
  duration = 45, // seconds for full cycle (slow, readable, elegant)
  className = '',
  style = {}
}) {
  const animKey = useId().replace(/:/g, '');
  const animName = `marquee-scroll-${animKey}`;

  // If baseVelocity is negative or direction is -1, reverse direction
  const isReverse = (direction < 0 || baseVelocity < 0);
  const adjustedDuration = Math.max(25, Math.abs(duration / (baseVelocity ? Math.abs(baseVelocity) / 4 : 1)));

  return (
    <div
      style={{
        display: 'flex',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        width: '100%',
        padding: '8px 0',
        userSelect: 'none',
        ...style
      }}
    >
      <style>{`
        @keyframes ${animName} {
          0% {
            transform: translate3d(${isReverse ? '-50%' : '0%'}, 0, 0);
          }
          100% {
            transform: translate3d(${isReverse ? '0%' : '-50%'}, 0, 0);
          }
        }
      `}</style>
      <div
        style={{
          display: 'flex',
          gap: '36px',
          width: 'max-content',
          animation: `${animName} ${adjustedDuration}s linear infinite`,
          willChange: 'transform'
        }}
      >
        {/* Render 4 repeated sets so the flow never has a gap or seam */}
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className={className}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '36px',
              flexShrink: 0
            }}
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ScrollVelocityContainer({
  children,
  className = '',
  style = {}
}) {
  return (
    <div
      className={`magic-scroll-velocity-container ${className}`}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        overflow: 'hidden',
        ...style
      }}
    >
      {children}
    </div>
  );
}

export default function ScrollBasedVelocity({ children, className = '', style = {} }) {
  return (
    <ScrollVelocityContainer className={className} style={style}>
      {children}
    </ScrollVelocityContainer>
  );
}
