import React, { useEffect, useState } from 'react';

/**
 * MorphingText — Magic UI Component
 * Smooth cross-dissolve morphing text between multiple phrases.
 */
export function MorphingText({
  texts = ['Cognitive Triage', 'Living Data Conditioning', 'Zero Hallucinations', 'Mathematical Directives'],
  className = '',
  interval = 2800,
  style = {}
}) {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % texts.length);
        setFade(true);
      }, 350);
    }, interval);

    return () => clearInterval(timer);
  }, [texts.length, interval]);

  return (
    <span
      className={`magic-morphing-text ${className}`}
      style={{
        display: 'inline-block',
        transition: 'opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        opacity: fade ? 1 : 0,
        transform: fade ? 'translateY(0) scale(1)' : 'translateY(-6px) scale(0.96)',
        filter: fade ? 'blur(0px)' : 'blur(4px)',
        fontWeight: 'inherit',
        ...style
      }}
    >
      {texts[index]}
    </span>
  );
}

export default MorphingText;
