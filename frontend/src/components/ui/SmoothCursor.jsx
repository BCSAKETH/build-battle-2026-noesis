import React, { useEffect, useRef } from 'react';

/**
 * SmoothCursor — Authentic Magic UI Component
 * Ultra-smooth vector arrow pointer with direct DOM transform interpolation,
 * spring click dynamics, trailing ghost aura, and complete system cursor suppression.
 */
export function SmoothCursor() {
  const cursorRef = useRef(null);
  const trailRef = useRef(null);

  useEffect(() => {
    // Only activate on devices with a mouse (fine pointer)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const cursorEl = cursorRef.current;
    const trailEl = trailRef.current;
    if (!cursorEl || !trailEl) return;

    let targetX = -100;
    let targetY = -100;
    let trailX = -100;
    let trailY = -100;
    let isClicking = false;
    let isHovering = false;
    let animId;

    const onMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;

      // Instant hardware-accelerated lead pointer (0 lag)
      cursorEl.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) scale(${isClicking ? 0.85 : isHovering ? 1.15 : 1})`;

      // Detect interactive hover targets
      const target = e.target;
      const isInteractive = target && (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'SELECT' ||
        target.tagName === 'TEXTAREA' ||
        target.getAttribute('role') === 'button' ||
        target.getAttribute('role') === 'tab' ||
        target.onclick !== null ||
        window.getComputedStyle(target).cursor === 'pointer'
      );

      if (isInteractive !== isHovering) {
        isHovering = isInteractive;
        if (isHovering) {
          trailEl.style.width = '36px';
          trailEl.style.height = '36px';
          trailEl.style.borderColor = 'rgba(79, 70, 229, 0.45)';
          trailEl.style.backgroundColor = 'rgba(79, 70, 229, 0.08)';
        } else {
          trailEl.style.width = '24px';
          trailEl.style.height = '24px';
          trailEl.style.borderColor = 'rgba(79, 70, 229, 0.25)';
          trailEl.style.backgroundColor = 'transparent';
        }
      }
    };

    const onMouseDown = () => {
      isClicking = true;
      cursorEl.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) scale(0.82)`;
      trailEl.style.transform = `translate3d(${trailX}px, ${trailY}px, 0) translate(-50%, -50%) scale(0.7)`;
    };

    const onMouseUp = () => {
      isClicking = false;
      cursorEl.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) scale(${isHovering ? 1.15 : 1})`;
    };

    const onMouseLeave = () => {
      cursorEl.style.opacity = '0';
      trailEl.style.opacity = '0';
    };

    const onMouseEnter = () => {
      cursorEl.style.opacity = '1';
      trailEl.style.opacity = '1';
    };

    // Buttery smooth lerp loop for the magnetic trailing ring (60-144fps)
    const animate = () => {
      trailX += (targetX - trailX) * 0.22;
      trailY += (targetY - trailY) * 0.22;

      trailEl.style.transform = `translate3d(${trailX}px, ${trailY}px, 0) translate(-50%, -50%)`;
      animId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    animId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
      {/* 1. Global CSS: Hide the browser's default system cursor on desktop mouse devices */}
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          *, *::before, *::after, html, body {
            cursor: none !important;
          }
        }
      `}</style>

      {/* 2. Trailing Smooth Fluid Halo (Follows with spring lag) */}
      <div
        ref={trailRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          border: '1.5px solid rgba(79, 70, 229, 0.25)',
          backgroundColor: 'transparent',
          pointerEvents: 'none',
          zIndex: 999998,
          willChange: 'transform, width, height, border-color, background-color',
          transition: 'width 0.2s ease, height 0.2s ease, border-color 0.2s ease, background-color 0.2s ease, opacity 0.2s ease',
          transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)'
        }}
      />

      {/* 3. Magic UI Precision Custom Vector Arrow Pointer (Instant 0-lag tracking) */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 999999,
          willChange: 'transform',
          transition: 'opacity 0.2s ease',
          transform: 'translate3d(-100px, -100px, 0)'
        }}
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            transform: 'translate(-2px, -2px)',
            filter: 'drop-shadow(0 2px 5px rgba(0, 0, 0, 0.25)) drop-shadow(0 0 1px rgba(0, 0, 0, 0.35))'
          }}
        >
          {/* Outer stroke shape */}
          <path
            d="M3 3L10.5 21L13.8 13.8L21 10.5L3 3Z"
            fill="#1E1B4B"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* Inner royal gradient accent core */}
          <path
            d="M5.5 5.5L10.5 17.5L12.8 12.8L17.5 10.5L5.5 5.5Z"
            fill="url(#magicCursorGrad)"
          />
          <defs>
            <linearGradient id="magicCursorGrad" x1="5.5" y1="5.5" x2="17.5" y2="17.5" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#4F46E5" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  );
}

export default SmoothCursor;
