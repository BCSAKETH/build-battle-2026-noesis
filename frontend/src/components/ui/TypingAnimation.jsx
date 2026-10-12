import React, { useEffect, useState } from 'react';

/**
 * TypingAnimation — Magic UI Component
 * Smooth typewriter character generation effect.
 */
export function TypingAnimation({
  children,
  className = '',
  duration = 60,
  delay = 100,
  as: Component = 'span',
  style = {}
}) {
  const text = typeof children === 'string' ? children : String(children || '');
  const [displayedText, setDisplayedText] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setStarted(true);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    let idx = 0;
    const interval = setInterval(() => {
      if (idx <= text.length) {
        setDisplayedText(text.slice(0, idx));
        idx++;
      } else {
        clearInterval(interval);
      }
    }, duration);

    return () => clearInterval(interval);
  }, [started, text, duration]);

  return (
    <Component
      className={`magic-typing-animation ${className}`}
      style={{
        display: 'inline-block',
        fontFamily: 'inherit',
        fontWeight: 'inherit',
        ...style
      }}
    >
      {displayedText}
      <span
        style={{
          display: 'inline-block',
          width: '2px',
          height: '1em',
          background: 'currentColor',
          marginLeft: '2px',
          verticalAlign: 'middle',
          animation: 'magic-cursor-blink 0.8s infinite'
        }}
      />

      <style>{`
        @keyframes magic-cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </Component>
  );
}

export default TypingAnimation;
