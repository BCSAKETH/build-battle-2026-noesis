import React, { useState } from 'react';
import { UploadCloud, Settings, Sliders, Check, X, Shield, Globe } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import { useSettings } from '../context/SettingsContext';

export default function TopBar({ onOpenUpload, onReturnToLanding }) {
  const { appearance, setAppearance, workspaceScale, setWorkspaceScale, theme } = useSettings();
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  return (
    <>
      <header
        style={{
          height: '68px',
          background: '#ffffff',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1.75rem',
          position: 'sticky',
          top: 0,
          zIndex: 80,
          boxShadow: '0 1px 3px rgba(15, 23, 42, 0.03)'
        }}
      >
        {/* Left: Noesis Logo (Clean Orbital Iris, No "v4.8" text per directive) */}
        <div
          onClick={onReturnToLanding}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem',
            cursor: 'pointer',
            userSelect: 'none'
          }}
          title="Return to Story Landing"
        >
          {/* Orbital Iris SVG */}
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(79, 70, 229, 0.25)'
            }}
          >
            <svg viewBox="0 0 40 40" width="22" height="22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="17" stroke="#ffffff" strokeWidth="2" strokeDasharray="3 3" opacity="0.8" />
              <circle cx="20" cy="20" r="11" stroke="#38bdf8" strokeWidth="2.5" />
              <circle cx="20" cy="20" r="4.5" fill="#ffffff" />
            </svg>
          </div>

          <div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              NOESIS
            </div>
            <div style={{ fontSize: '0.66rem', fontWeight: 600, color: '#64748b', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Human Cognitive Decision Engine
            </div>
          </div>
        </div>

        {/* Right: Global Actions (Upload Dataset, Language Selector, Settings Cog) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          {/* Global Upload Dataset CTA */}
          <button
            onClick={onOpenUpload}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              fontSize: '0.82rem',
              fontWeight: 700,
              background: '#eef2ff',
              color: '#4f46e5',
              border: '1px solid #c7d2fe',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#e0e7ff'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#eef2ff'}
          >
            <UploadCloud size={16} color="#4f46e5" />
            <span>Upload Dataset</span>
          </button>

          {/* Language Selector (EN, TE, HI) */}
          <LanguageSelector />

          {/* Settings Cog */}
          <button
            onClick={() => setShowSettingsModal(true)}
            style={{
              width: 38,
              height: 38,
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              background: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#475569',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#cbd5e1';
              e.currentTarget.style.color = '#0f172a';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#e2e8f0';
              e.currentTarget.style.color = '#475569';
            }}
            title="Workspace Layout Settings"
          >
            <Settings size={18} />
          </button>
        </div>
      </header>

      {/* Global Settings Modal */}
      {showSettingsModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.45)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 120
          }}
          onClick={() => setShowSettingsModal(false)}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '1.75rem',
              width: '100%',
              maxWidth: '460px',
              boxShadow: '0 20px 40px -10px rgba(15, 23, 42, 0.2)',
              border: '1px solid #e2e8f0'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Sliders size={18} color="#4f46e5" />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  Workspace Preferences
                </h3>
              </div>
              <button
                onClick={() => setShowSettingsModal(false)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Appearance Density Setting */}
            <div style={{ marginBottom: '1.35rem' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: '#64748b', marginBottom: '0.5rem' }}>
                Layout Density (Appearance)
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                {[
                  { key: 'Compact', label: 'Compact', desc: 'Dense padding' },
                  { key: 'Standard', label: 'Standard', desc: 'Balanced' },
                  { key: 'Expanded', label: 'Expanded', desc: 'Airy whitespace' }
                ].map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => setAppearance(opt.key)}
                    style={{
                      padding: '0.75rem 0.5rem',
                      borderRadius: '8px',
                      border: appearance === opt.key ? '2px solid #4f46e5' : '1px solid #e2e8f0',
                      background: appearance === opt.key ? '#eef2ff' : '#f8fafc',
                      color: appearance === opt.key ? '#4f46e5' : '#334155',
                      cursor: 'pointer',
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.2rem'
                    }}
                  >
                    <span style={{ fontSize: '0.82rem', fontWeight: 700 }}>{opt.label}</span>
                    <span style={{ fontSize: '0.68rem', color: '#64748b' }}>{opt.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Workspace Scale Width Setting */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', color: '#64748b', marginBottom: '0.5rem' }}>
                Workspace Canvas Width (Scale)
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                {[
                  { key: 'Focused', label: 'Focused', pct: '35% width' },
                  { key: 'Balanced', label: 'Balanced', pct: '65% width' },
                  { key: 'FullCanvas', label: 'Full Canvas', pct: '92% width' }
                ].map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => setWorkspaceScale(opt.key)}
                    style={{
                      padding: '0.75rem 0.5rem',
                      borderRadius: '8px',
                      border: workspaceScale === opt.key ? '2px solid #4f46e5' : '1px solid #e2e8f0',
                      background: workspaceScale === opt.key ? '#eef2ff' : '#f8fafc',
                      color: workspaceScale === opt.key ? '#4f46e5' : '#334155',
                      cursor: 'pointer',
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.2rem'
                    }}
                  >
                    <span style={{ fontSize: '0.82rem', fontWeight: 700 }}>{opt.label}</span>
                    <span style={{ fontSize: '0.68rem', color: '#64748b' }}>{opt.pct}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowSettingsModal(false)}
              style={{
                width: '100%',
                padding: '0.7rem',
                borderRadius: '8px',
                border: 'none',
                background: '#4f46e5',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.88rem',
                cursor: 'pointer'
              }}
            >
              Apply Preferences
            </button>
          </div>
        </div>
      )}
    </>
  );
}
