import React, { useState, useEffect } from 'react';
import NoesisSignatureLogo from './NoesisSignatureLogo';

/**
 * AuthPortalTransition — Cinematic Flashlight / Spotlight Portal Transition
 * Triggered upon successful login or sign-up in AuthenticationPage:
 * 1. Logo glides from top-left into viewport center.
 * 2. Emits a high-intensity radial flashlight / spotlight cone with prism refraction rings.
 * 3. Displays kinetic telemetry verification ("Supabase Realtime Verified • Adaption Streams Loaded").
 * 4. Radiant bloom wash opens into the enterprise workspace.
 */
export default function AuthPortalTransition({ isActive = false, onComplete, userEmail = '' }) {
  const [stage, setStage] = useState('idle'); // 'idle' -> 'moving_to_center' -> 'flashlight_beam' -> 'dissolving' -> 'done'
  const [telemetryText, setTelemetryText] = useState('Verifying Supabase Session...');

  useEffect(() => {
    if (!isActive) {
      setStage('idle');
      return;
    }

    setStage('moving_to_center');

    const t1 = setTimeout(() => {
      setStage('flashlight_beam');
      setTelemetryText('Syncing Living Feedback Streams • Adaption v0.14');
    }, 600);

    const t2 = setTimeout(() => {
      setTelemetryText('Decryption Complete • Opening Noesis Workspace');
    }, 1300);

    const t3 = setTimeout(() => {
      setStage('dissolving');
    }, 1900);

    const t4 = setTimeout(() => {
      setStage('done');
      if (onComplete) onComplete();
    }, 2450);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [isActive, onComplete]);

  if (!isActive && stage === 'idle') return null;
  if (stage === 'done') return null;

  const isAtCenter = stage === 'flashlight_beam' || stage === 'dissolving';
  const isDissolving = stage === 'dissolving';

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: isDissolving
          ? 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 1) 0%, rgba(248, 250, 252, 0.95) 100%)'
          : 'rgba(255, 255, 255, 0.96)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        opacity: isDissolving ? 0 : 1,
        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: 'all',
        overflow: 'hidden'
      }}
    >
      {/* 1. Cinematic Flashlight / Spotlight Beam Effect */}
      {isAtCenter && (
        <div
          style={{
            position: 'absolute',
            width: '850px',
            height: '850px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(79, 70, 229, 0.22) 0%, rgba(6, 182, 212, 0.16) 35%, rgba(99, 102, 241, 0.04) 65%, transparent 80%)',
            filter: 'blur(45px)',
            animation: 'portalBeamPulse 1.8s ease-in-out infinite alternate',
            pointerEvents: 'none'
          }}
        />
      )}

      {/* 2. Expanding Optical Flare Light Rings */}
      {isAtCenter && (
        <>
          <div
            style={{
              position: 'absolute',
              width: '320px',
              height: '320px',
              borderRadius: '50%',
              border: '2px solid rgba(79, 70, 229, 0.3)',
              boxShadow: '0 0 40px rgba(79, 70, 229, 0.25)',
              animation: 'portalRingRotate 3s linear infinite',
              pointerEvents: 'none'
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: '460px',
              height: '460px',
              borderRadius: '50%',
              border: '1px dashed rgba(6, 182, 212, 0.35)',
              animation: 'portalRingRotateRev 5s linear infinite',
              pointerEvents: 'none'
            }}
          />
        </>
      )}

      {/* 3. Moving & Scaling Brand Mark */}
      <div
        style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transform: isAtCenter
            ? 'translate(0, 0) scale(1.15)'
            : 'translate(calc(-50vw + 90px), calc(-50vh + 60px)) scale(0.65)',
          opacity: 1,
          transition: 'transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)',
          willChange: 'transform'
        }}
      >
        <div
          style={{
            filter: isAtCenter
              ? 'drop-shadow(0 16px 48px rgba(79, 70, 229, 0.45)) drop-shadow(0 0 24px rgba(6, 182, 212, 0.4))'
              : 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.08))'
          }}
        >
          <NoesisSignatureLogo
            size={isAtCenter ? 80 : 42}
            showBadge={true}
            showText={true}
            animated={true}
            badgeText="PORTAL UNLOCKED"
          />
        </div>

        {/* Live Telemetry Notification Pill */}
        {isAtCenter && (
          <div
            style={{
              marginTop: '32px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
              animation: 'portalFadeIn 0.4s ease forwards'
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 20px',
                borderRadius: '999px',
                background: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid rgba(79, 70, 229, 0.25)',
                boxShadow: '0 8px 24px rgba(79, 70, 229, 0.12)',
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '12px',
                fontWeight: 600,
                color: '#1E293B'
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#10B981',
                  boxShadow: '0 0 10px #10B981'
                }}
              />
              <span>{telemetryText}</span>
            </div>

            {userEmail && (
              <div
                style={{
                  fontSize: '11px',
                  color: '#64748B',
                  fontFamily: 'JetBrains Mono, monospace'
                }}
              >
                Authenticated as: <strong style={{ color: '#4F46E5' }}>{userEmail}</strong>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes portalBeamPulse {
          0% {
            transform: scale(0.9);
            opacity: 0.7;
          }
          100% {
            transform: scale(1.2);
            opacity: 1;
          }
        }
        @keyframes portalRingRotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes portalRingRotateRev {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
        @keyframes portalFadeIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
