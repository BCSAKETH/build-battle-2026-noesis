import React from 'react';

export function DiaTextReveal({
  text = 'Design systems',
  colors = ['#22d3ee', '#818cf8', '#f472b6', '#34d399'],
  className = '',
  style = {}
}) {
  const gradient = `linear-gradient(90deg, ${colors.join(', ')}, ${colors[0]})`;

  return (
    <span
      className={`dia-text-reveal ${className}`}
      style={{
        backgroundImage: gradient,
        backgroundSize: '300% 100%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        animation: 'dia-shimmer 6s linear infinite',
        display: 'inline-block',
        fontWeight: 800,
        letterSpacing: '-0.02em',
        ...style
      }}
    >
      {text}
      <style>{`
        @keyframes dia-shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </span>
  );
}

export default DiaTextReveal;
