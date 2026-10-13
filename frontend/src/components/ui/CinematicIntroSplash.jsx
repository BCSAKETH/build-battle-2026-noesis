import React, { useState, useEffect } from 'react';
import NoesisSignatureLogo from './NoesisSignatureLogo';

/**
 * CinematicIntroSplash — Displays a luxury cinematic center-to-navbar logo animation
 * on initial website open and page refresh.
 *
 * Flow:
 * 1. Center Stage (0 - 1.4s): Large Cognitive Nexus logo scales up with radiant ambient light ring.
 * 2. Stage Morph (1.4s - 2.2s): Smoothly glides & scales from center towards top-left navbar coordinates.
 * 3. Fade Out (2.2s - 2.5s): Backdrop dissolves revealing the live landing page / app.
 */
export default function CinematicIntroSplash({ onComplete }) {
  const [phase, setPhase] = useState('center'); // 'center' -> 'moving' -> 'finished'
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Phase 1: Hold in center, pulse logo & text
    const moveTimer = setTimeout(() => {
      setPhase('moving');
    }, 1400);

    // Phase 2: Finish transition and reveal app
    const finishTimer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 2350);

    return () => {
      clearTimeout(moveTimer);
      clearTimeout(finishTimer);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  const isMoving = phase === 'moving';

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        pointerEvents: isMoving ? 'none' : 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: isMoving
          ? 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.4) 0%, rgba(248, 250, 252, 0.1) 100%)'
          : 'radial-gradient(circle at 50% 45%, #FFFFFF 0%, #F8FAFC 60%, #F1F5F9 100%)',
        backdropFilter: isMoving ? 'blur(4px)' : 'blur(20px)',
        WebkitBackdropFilter: isMoving ? 'blur(4px)' : 'blur(20px)',
        opacity: isMoving ? 0 : 1,
        transition: 'opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), background 0.85s ease',
        overflow: 'hidden'
      }}
    >
      {/* Radiant Spotlight Beam behind logo */}
      <div
        style={{
          position: 'absolute',
          width: '520px',
          height: '520px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(79, 70, 229, 0.14) 0%, rgba(6, 182, 212, 0.08) 45%, rgba(255, 255, 255, 0) 70%)',
          filter: 'blur(35px)',
          transform: isMoving ? 'translate(-35vw, -38vh) scale(0.3)' : 'scale(1)',
          opacity: isMoving ? 0 : 1,
          transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: 'none'
        }}
      />

      {/* Pulsing Concentric Ripple Rings */}
      {!isMoving && (
        <div
          style={{
            position: 'absolute',
            width: '280px',
            height: '280px',
            borderRadius: '50%',
            border: '1px solid rgba(79, 70, 229, 0.16)',
            animation: 'introPulseRing 2s cubic-bezier(0.2, 0.8, 0.2, 1) infinite',
            pointerEvents: 'none'
          }}
        />
      )}

      {/* Main Kinetic Logo Container */}
      <div
        style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transform: isMoving
            ? 'translate(-40vw, -42vh) scale(0.48)'
            : 'translate(0, 0) scale(1)',
          opacity: isMoving ? 0.2 : 1,
          transition: 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.75s ease',
          willChange: 'transform, opacity'
        }}
      >
        {/* Signature Nexus Logo */}
        <div
          style={{
            filter: 'drop-shadow(0 12px 36px rgba(79, 70, 229, 0.25))',
            animation: 'introFloat 2.4s ease-in-out infinite'
          }}
        >
          <NoesisSignatureLogo
            size={isMoving ? 42 : 72}
            showBadge={true}
            showText={true}
            animated={true}
            badgeText="BUILD BATTLE 2026"
          />
        </div>

        {/* Cinematic Kinetic Subtitle & Progress Bar */}
        <div
          style={{
            marginTop: '28px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            opacity: isMoving ? 0 : 1,
            transform: isMoving ? 'translateY(16px)' : 'translateY(0)',
            transition: 'all 0.4s ease'
          }}
        >
          <div
            style={{
              fontSize: '11px',
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: 700,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: '#64748B',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#10B981',
                boxShadow: '0 0 8px rgba(16, 185, 129, 0.6)'
              }}
            />
            <span>Cognitive Living Intelligence</span>
            <span style={{ color: '#CBD5E1' }}>•</span>
            <span style={{ color: '#4F46E5', fontWeight: 800 }}>Adaption Labs v0.14</span>
          </div>

          {/* Shimmering Linear Progress Bar */}
          <div
            style={{
              width: '240px',
              height: '3px',
              borderRadius: '999px',
              background: 'rgba(226, 232, 240, 0.8)',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                width: '100%',
                background: 'linear-gradient(90deg, #4F46E5 0%, #06B6D4 50%, #10B981 100%)',
                animation: 'introProgressSlide 1.4s cubic-bezier(0.4, 0, 0.2, 1) forwards'
              }}
            />
          </div>
        </div>
      </div>

      {/* Skip Button for instantaneous access */}
      <button
        onClick={() => {
          setIsVisible(false);
          if (onComplete) onComplete();
        }}
        style={{
          position: 'absolute',
          bottom: '32px',
          right: '32px',
          padding: '8px 18px',
          fontSize: '12px',
          fontWeight: 600,
          fontFamily: 'Inter, system-ui, sans-serif',
          color: '#64748B',
          background: 'rgba(255, 255, 255, 0.85)',
          border: '1px solid #E2E8F0',
          borderRadius: '999px',
          cursor: 'pointer',
          backdropFilter: 'blur(8px)',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
          transition: 'all 0.2s ease',
          opacity: isMoving ? 0 : 0.85
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = '#1E293B';
          e.currentTarget.style.borderColor = '#CBD5E1';
          e.currentTarget.style.opacity = '1';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = '#64748B';
          e.currentTarget.style.borderColor = '#E2E8F0';
          e.currentTarget.style.opacity = '0.85';
        }}
      >
        Skip Intro ➔
      </button>

      {/* Dynamic Keyframes for the Intro */}
      <style>{`
        @keyframes introPulseRing {
          0% {
            transform: scale(0.85);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.35);
            opacity: 0.2;
          }
          100% {
            transform: scale(1.6);
            opacity: 0;
          }
        }
        @keyframes introFloat {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        @keyframes introProgressSlide {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(0%);
          }
        }
      `}</style>
    </div>
  );
}
