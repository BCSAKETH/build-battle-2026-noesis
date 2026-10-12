import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import CoolMode from './CoolMode';

/**
 * FloatingPillNav (Inspired by User-Provided Reference Images 1, 2, 3)
 * Elegant pill-shaped floating navbar with glassmorphism backdrop, active tab indicator,
 * and high-contrast 'Get Started' action pill.
 */
export default function FloatingPillNav({ onLaunchApp, onOpenAuth }) {
  const [activeTab, setActiveTab] = useState('Overview');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Overview', href: '#the-engine' },
    { label: 'Dovetail Insights', href: '#dovetail-insights' },
    { label: 'Signals (7,002)', href: '#signals' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Security', href: '#security' }
  ];

  return (
    <div
      style={{
        position: 'fixed',
        top: isScrolled ? '16px' : '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        width: 'auto',
        maxWidth: '92vw'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 8px 6px 14px',
          background: 'rgba(255, 255, 255, 0.88)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderRadius: '9999px',
          border: '1px solid rgba(220, 227, 237, 0.9)',
          boxShadow: isScrolled
            ? '0 12px 32px -4px rgba(15, 23, 42, 0.12), 0 4px 12px -2px rgba(15, 23, 42, 0.06)'
            : '0 8px 24px -2px rgba(15, 23, 42, 0.06)',
          transition: 'all 0.3s ease'
        }}
      >
        {/* Brand Orb */}
        <a
          href="#"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
            marginRight: '6px'
          }}
        >
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #FF6B6B 0%, #FFA07A 50%, #9B51E0 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(155, 81, 224, 0.3)'
            }}
          >
            <span style={{ color: '#FFFFFF', fontWeight: 800, fontSize: '13px', fontStyle: 'italic', fontFamily: "'Outfit', sans-serif" }}>
              N
            </span>
          </div>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 800,
              fontSize: '13px',
              letterSpacing: '-0.02em',
              color: '#0F172A'
            }}
          >
            NOESIS
          </span>
        </a>

        {/* Nav Links (Pill Tabs) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
          {navLinks.map((link) => {
            const isActive = activeTab === link.label;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setActiveTab(link.label)}
                style={{
                  textDecoration: 'none',
                  padding: '6px 12px',
                  borderRadius: '9999px',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '13px',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? '#0F172A' : '#64748B',
                  background: isActive ? '#F1F5F9' : 'transparent',
                  transition: 'all 0.15s ease',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#0F172A';
                    e.currentTarget.style.background = '#F8FAFC';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#64748B';
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginLeft: '6px' }}>
          {onOpenAuth && (
            <button
              onClick={onOpenAuth}
              style={{
                background: 'transparent',
                border: 'none',
                fontFamily: "'Inter', sans-serif",
                fontSize: '13px',
                fontWeight: 600,
                color: '#475569',
                padding: '6px 12px',
                borderRadius: '9999px',
                cursor: 'pointer',
                transition: 'color 0.15s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#0F172A')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#475569')}
            >
              Log in
            </button>
          )}

          <CoolMode>
            <button
              onClick={() => onLaunchApp('copilot')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 16px',
                borderRadius: '9999px',
                background: '#0F172A',
                color: '#FFFFFF',
                border: '1px solid #1E293B',
                fontFamily: "'Inter', sans-serif",
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 2px 10px rgba(15, 23, 42, 0.2)',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#1E293B';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#0F172A';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span>Get Started</span>
              <ArrowRight size={13} />
            </button>
          </CoolMode>
        </div>
      </div>
    </div>
  );
}
