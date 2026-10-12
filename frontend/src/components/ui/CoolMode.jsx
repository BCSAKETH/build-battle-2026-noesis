import React from 'react';

/**
 * CoolMode - Magic UI Component
 * Triggers interactive floating particle burst on click.
 */
export function CoolMode({ children, options = {} }) {
  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX || rect.left + rect.width / 2;
    const y = e.clientY || rect.top + rect.height / 2;

    const count = options.particleCount || 16;
    const particles = ['✨', '⚡', '🚀', '💎', '🎯'];

    for (let i = 0; i < count; i++) {
      const el = document.createElement('span');
      el.textContent = particles[Math.floor(Math.random() * particles.length)];
      el.style.position = 'fixed';
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      el.style.fontSize = '18px';
      el.style.pointerEvents = 'none';
      el.style.zIndex = '9999';
      el.style.userSelect = 'none';
      el.style.transform = 'translate(-50%, -50%)';
      el.style.transition = 'all 0.75s cubic-bezier(0.25, 1, 0.5, 1)';
      document.body.appendChild(el);

      const angle = (Math.PI * 2 * i) / count;
      const velocity = 40 + Math.random() * 60;
      const destX = Math.cos(angle) * velocity;
      const destY = Math.sin(angle) * velocity - 20;

      requestAnimationFrame(() => {
        el.style.transform = `translate(${destX}px, ${destY}px) scale(0.3)`;
        el.style.opacity = '0';
      });

      setTimeout(() => {
        if (el.parentNode) el.parentNode.removeChild(el);
      }, 750);
    }
  };

  return (
    <span onClickCapture={handleClick} style={{ display: 'inline-block' }}>
      {children}
    </span>
  );
}

export default CoolMode;
