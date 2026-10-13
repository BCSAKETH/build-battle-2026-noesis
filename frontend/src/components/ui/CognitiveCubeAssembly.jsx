import React, { useState, useRef, useEffect } from 'react';

/**
 * CognitiveCubeAssembly (Figma Node 65:259: "Motion — Cognitive assembly")
 *
 * Implements the exact 8-cube isometric cognitive assembly from Figma:
 * - 8 isometric cubes in a 2x2x2 cognitive matrix
 * - Exact color fills from Figma:
 *   - Top Face: #A5A6F7 (Lavender Indigo)
 *   - Front Face: #6366F1 (Royal Indigo)
 *   - Side Face: #7F82F4 (Rich Violet)
 * - Ground Platform with dual-tone isometric vector base (#C7D2FE & #A5B4FC)
 * - Ambient floating depth particles (Depths 1-5)
 * - Mouse parallax tilt & click "Dispersion / Reassembly" physics
 */
export default function CognitiveCubeAssembly({
  scale = 1,
  className = '',
  style = {}
}) {
  const containerRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [isExploded, setIsExploded] = useState(false);

  // Mouse 3D tilt tracking
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      rx: -(y / rect.height) * 12,
      ry: (x / rect.width) * 16
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 });
  };

  const toggleExplosion = () => {
    setIsExploded(true);
    setTimeout(() => setIsExploded(false), 850);
  };

  // Cube definitions based on Figma Node 65:259 geometry
  // Width: 72, Height: 72 per cube
  const cubes = [
    // Tier 1 (Lower Ground Tier)
    { id: 1, x: 0, y: 18, z: 0, delay: '0s', label: 'Ingest' },
    { id: 2, x: 36, y: 36, z: 0, delay: '0.12s', label: 'Dedup' },
    { id: 3, x: -36, y: 36, z: 0, delay: '0.24s', label: 'PII' },
    { id: 4, x: 0, y: 54, z: 0, delay: '0.36s', label: 'Tone' },
    // Tier 2 (Upper Cognitive Tier)
    { id: 5, x: 0, y: -30, z: 36, delay: '0.18s', label: 'Trace' },
    { id: 6, x: 36, y: -12, z: 36, delay: '0.3s', label: 'Impact' },
    { id: 7, x: -36, y: -12, z: 36, delay: '0.42s', label: 'Triage' },
    { id: 8, x: 0, y: 6, z: 36, delay: '0.54s', label: 'Action' }
  ];

  // Ambient floating particles
  const particles = [
    { top: '15%', left: '18%', size: 4, delay: '0s', duration: '3.2s' },
    { top: '22%', left: '82%', size: 5, delay: '0.6s', duration: '4.1s' },
    { top: '78%', left: '15%', size: 3, delay: '1.2s', duration: '2.8s' },
    { top: '85%', left: '75%', size: 6, delay: '0.4s', duration: '3.7s' },
    { top: '38%', left: '12%', size: 4, delay: '1.8s', duration: '3.5s' },
    { top: '35%', left: '90%', size: 5, delay: '0.9s', duration: '4.4s' },
    { top: '65%', left: '25%', size: 3, delay: '2.1s', duration: '3.0s' },
    { top: '60%', left: '85%', size: 4, delay: '1.5s', duration: '3.9s' }
  ];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={toggleExplosion}
      className={`cognitive-assembly-wrapper ${className}`}
      style={{
        width: '100%',
        maxWidth: '592px',
        height: '320px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '1200px',
        cursor: 'pointer',
        userSelect: 'none',
        ...style
      }}
      title="Click to trigger Cognitive Assembly Dispersion"
    >
      {/* Interactive 3D Stage with Tilt */}
      <div
        style={{
          width: '320px',
          height: '240px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `scale(${scale}) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
          willChange: 'transform'
        }}
      >
        {/* 1. Ambient Floating Depth Particles */}
        {particles.map((p, idx) => (
          <div
            key={idx}
            style={{
              position: 'absolute',
              top: p.top,
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
              borderRadius: '50%',
              background: 'radial-gradient(circle, #818CF8 0%, rgba(99, 102, 241, 0.2) 70%, transparent 100%)',
              boxShadow: '0 0 10px rgba(99, 102, 241, 0.5)',
              animation: `particleFloat ${p.duration} ease-in-out infinite alternate`,
              animationDelay: p.delay,
              pointerEvents: 'none'
            }}
          />
        ))}

        {/* 2. Isometric Ground Platform (Figma: Assembly — ground platform) */}
        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            width: '260px',
            height: '96px',
            transform: 'translateY(36px)',
            pointerEvents: 'none'
          }}
        >
          <svg viewBox="0 0 286 106" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Ground shadow */}
            <ellipse cx="143" cy="58" rx="138" ry="44" fill="rgba(79, 70, 229, 0.08)" filter="blur(10px)" />
            {/* Lower bevel face */}
            <path d="M143 96L280 48L280 56L143 104L6 56L6 48L143 96Z" fill="#A5B4FC" opacity="0.85" />
            {/* Top platform face */}
            <path d="M143 8L280 48L143 96L6 48L143 8Z" fill="#C7D2FE" stroke="#FFFFFF" strokeWidth="2" />
            {/* Concentric grid lines on platform */}
            <path d="M143 28L236 55L143 82L50 55L143 28Z" stroke="#818CF8" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
          </svg>
        </div>

        {/* 3. The 8 Isometric Assembly Cubes */}
        {cubes.map((cube) => {
          // If exploded, push cubes radially outward
          const explodeX = isExploded ? cube.x * 1.85 : cube.x;
          const explodeY = isExploded ? cube.y * 1.85 : cube.y;

          return (
            <div
              key={cube.id}
              style={{
                position: 'absolute',
                width: '68px',
                height: '68px',
                transform: `translate(${explodeX}px, ${explodeY}px)`,
                transition: 'transform 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                willChange: 'transform',
                animation: `cubeHoverBreath 3.6s ease-in-out infinite alternate`,
                animationDelay: cube.delay,
                filter: 'drop-shadow(0 6px 14px rgba(79, 70, 229, 0.18))'
              }}
            >
              <svg viewBox="0 0 68 68" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Top Face: Lavender Indigo #A5A6F7 */}
                <polygon
                  points="34,2 66,18 34,34 2,18"
                  fill="#A5A6F7"
                  stroke="#FFFFFF"
                  strokeWidth="0.75"
                />
                {/* Front Face: Royal Indigo #6366F1 */}
                <polygon
                  points="2,18 34,34 34,66 2,50"
                  fill="#6366F1"
                  stroke="rgba(255, 255, 255, 0.3)"
                  strokeWidth="0.5"
                />
                {/* Side Face: Rich Violet #7F82F4 */}
                <polygon
                  points="34,34 66,18 66,50 34,66"
                  fill="#7F82F4"
                  stroke="rgba(255, 255, 255, 0.3)"
                  strokeWidth="0.5"
                />
                {/* Subtle core highlight */}
                <line x1="34" y1="34" x2="34" y2="66" stroke="#FFFFFF" strokeWidth="1" opacity="0.4" />
              </svg>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes cubeHoverBreath {
          0% {
            transform-origin: center;
            filter: drop-shadow(0 4px 10px rgba(79, 70, 229, 0.15));
          }
          100% {
            filter: drop-shadow(0 10px 22px rgba(79, 70, 229, 0.32));
          }
        }
        @keyframes particleFloat {
          0% {
            transform: translateY(0px) scale(0.9);
            opacity: 0.4;
          }
          100% {
            transform: translateY(-16px) scale(1.15);
            opacity: 0.9;
          }
        }
      `}</style>
    </div>
  );
}
