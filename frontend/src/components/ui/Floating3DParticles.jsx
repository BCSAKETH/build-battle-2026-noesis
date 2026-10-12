import React, { useEffect, useRef } from 'react';

export function Floating3DParticles({
  color = '#4f46e5',
  depth = 0.8,
  opacity = 0.55,
  quantity = 60,
  className = '',
  style = {}
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 400);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Initialize 3D particles with x, y, z
    const particles = Array.from({ length: quantity }, () => ({
      x: (Math.random() - 0.5) * width * 1.2,
      y: (Math.random() - 0.5) * height * 1.2,
      z: Math.random() * 500 + 50,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1.2
    }));

    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      angle += 0.002;

      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);
      const fov = 350;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.x < -width) p.x = width;
        if (p.x > width) p.x = -width;
        if (p.y < -height) p.y = height;
        if (p.y > height) p.y = -height;

        // Rotate in 3D around Y
        const rx = p.x * cosA - p.z * sinA * depth;
        const rz = p.z * cosA + p.x * sinA * depth + 200;

        // Project to 2D
        const scale = fov / Math.max(rz, 10);
        const px = rx * scale + width / 2;
        const py = p.y * scale + height / 2;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const alpha = Math.min(Math.max((1 - rz / 700) * opacity, 0.08), 1);
          ctx.beginPath();
          ctx.arc(px, py, Math.max(p.radius * scale, 0.8), 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.globalAlpha = alpha;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [color, depth, opacity, quantity]);

  return (
    <canvas
      ref={canvasRef}
      className={`floating-3d-particles ${className}`}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        ...style
      }}
    />
  );
}

export default Floating3DParticles;
