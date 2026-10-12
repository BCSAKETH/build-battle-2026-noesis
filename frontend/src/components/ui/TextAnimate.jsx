import React from 'react';

/**
 * TextAnimate - Animates text entrance by character or word with blur / fade effects
 */
export function TextAnimate({
  children,
  animation = "blurInUp",
  by = "character",
  className = "",
  delay = 0,
  once = true
}) {
  const text = typeof children === 'string' ? children : '';
  if (!text) return <span className={className}>{children}</span>;

  const items = by === 'character' ? text.split('') : text.split(' ');

  return (
    <span className={`inline-flex flex-wrap ${className}`} style={{ display: 'inline-flex', flexWrap: 'wrap' }}>
      {items.map((item, index) => {
        const itemDelay = delay + index * (by === 'character' ? 0.025 : 0.08);
        return (
          <span
            key={index}
            style={{
              display: 'inline-block',
              animation: `textAnimateBlurIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${itemDelay}s both`,
              marginRight: by === 'word' ? '0.25em' : item === ' ' ? '0.25em' : '0',
              whiteSpace: item === ' ' ? 'pre' : 'normal'
            }}
          >
            {item}
          </span>
        );
      })}
      <style>{`
        @keyframes textAnimateBlurIn {
          0% {
            opacity: 0;
            filter: blur(8px);
            transform: translateY(12px);
          }
          100% {
            opacity: 1;
            filter: blur(0px);
            transform: translateY(0);
          }
        }
      `}</style>
    </span>
  );
}

export default TextAnimate;
