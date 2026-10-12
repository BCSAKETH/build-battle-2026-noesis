import React, { useEffect, useState } from 'react';

/**
 * SmoothCursor — Magic UI Component
 * Smooth spring-interpolated trailing cursor for desktop interactions.
 */
export function SmoothCursor({
  color = '#4F46E5',
  size = 24,
  trailSize = 8
}) {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only enable on fine pointer devices (desktop mouse)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let targetX = -100;
    let targetY = -100;
    let trailX = -100;
    let trailY = -100;
    let animId;

    const onMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setPos({ x: targetX, y: targetY });
      if (!visible) setVisible(true);

      const target = e.target;
      const isInteractive = target && (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.getAttribute('role') === 'button' ||
        target.onclick !== null ||
        window.getComputedStyle(target).cursor === 'pointer'
      );
      setIsPointer(isInteractive);
    };

    const onMouseLeave = () => setVisible(false);

    const animateTrail = () => {
      trailX += (targetX - trailX) * 0.18;
      trailY += (targetY - trailY) * 0.18;
      setTrail({ x: trailX, y: trailY });
      animId = requestAnimationFrame(animateTrail);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    animId = requestAnimationFrame(animateTrail);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 99999 }}>
      {/* Outer Smooth Lag Ring */}
      <div
        style={{
          position: 'fixed',
          left: `${trail.x}px`,
          top: `${trail.y}px`,
          width: isPointer ? `${size * 1.5}px` : `${size}px`,
          height: isPointer ? `${size * 1.5}px` : `${size}px`,
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          border: `1.5px solid ${color}`,
          opacity: 0.65,
          transition: 'width 0.2s ease, height 0.2s ease, background 0.2s ease',
          background: isPointer ? 'rgba(79, 70, 229, 0.12)' : 'transparent',
          boxShadow: isPointer ? `0 0 16px ${color}` : 'none'
        }}
      />
      {/* Center Precise Dot */}
      <div
        style={{
          position: 'fixed',
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          width: `${trailSize}px`,
          height: `${trailSize}px`,
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
          background: color,
          opacity: 0.85
        }}
      />
    </div>
  );
}

export default SmoothCursor;
