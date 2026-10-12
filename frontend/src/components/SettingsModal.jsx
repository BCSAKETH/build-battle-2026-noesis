import React, { useState } from 'react';
import { X, Check, Scan, Sliders } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

/**
 * SettingsModal (Figma: Noesis · Workspace with Settings overlay - Frame 50:38765)
 * 
 * Exact 1080px modal specification:
 * - Section label: IBM Plex Mono 10px #4F46E5
 * - Title: Inter 32px font-weight 600 #172033
 * - Two-column layout:
 *   - Left (484px): Appearance density (Compact, Balanced, Spacious) & Workspace scale (Compact 1024px, Standard 1280px, Wide 1440px)
 *   - Right (496px): Live interactive workspace layout preview with mini topbar, sidebar, metric cards, volume chart, evidence list
 * - Footer: Reset to defaults, Cancel, Save layout (#4F46E5)
 */
export default function SettingsModal({ isOpen, onClose }) {
  const { appearance, setAppearance, workspaceScale, setWorkspaceScale } = useSettings();

  // Local draft states before saving
  const [localDensity, setLocalDensity] = useState(appearance || 'Balanced');
  const [localScale, setLocalScale] = useState(workspaceScale || 'Wide');

  if (!isOpen) return null;

  const handleReset = () => {
    setLocalDensity('Balanced');
    setLocalScale('Wide');
  };

  const handleSave = () => {
    setAppearance(localDensity);
    setWorkspaceScale(localScale);
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(226, 232, 240, 0.701961)',
        backdropFilter: 'blur(3px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      }}
      onClick={onClose}
    >
      <div
        style={{
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: '32px',
          gap: '24px',
          width: '100%',
          maxWidth: '1080px',
          maxHeight: '92vh',
          background: '#FFFFFF',
          border: '1px solid #DCE3ED',
          boxShadow: '0px 20px 60px rgba(23, 32, 51, 0.101961)',
          borderRadius: '10px',
          overflowY: 'auto'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Overlay Heading */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            width: '100%',
            gap: '24px'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px', flex: 1 }}>
            <div
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontWeight: 500,
                fontSize: '10px',
                lineHeight: '150%',
                color: '#4F46E5',
                letterSpacing: '0.08em',
                textTransform: 'uppercase'
              }}
            >
              SETTINGS · GLOBAL LAYOUT OVERLAY
            </div>
            <h2
              style={{
                margin: 0,
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: '32px',
                lineHeight: '120%',
                color: '#172033',
                letterSpacing: '-0.02em'
              }}
            >
              Settings · Global layout overlay
            </h2>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                fontSize: '13px',
                lineHeight: '150%',
                color: '#64748B'
              }}
            >
              Configure typography density, container constraints, and interface geometry.
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              width: 32,
              height: 32,
              borderRadius: '6px',
              border: '1px solid #DCE3ED',
              background: '#FFFFFF',
              color: '#64748B',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#F8FAFC';
              e.currentTarget.style.color = '#172033';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#FFFFFF';
              e.currentTarget.style.color = '#64748B';
            }}
            title="Close Settings"
          >
            <X size={18} />
          </button>
        </div>

        {/* Layout Preferences & Live Preview (Two Columns) */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            width: '100%',
            gap: '36px',
            flexWrap: 'wrap'
          }}
        >
          {/* Left Column: Layout Preferences (484px) */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '24px',
              flex: '1 1 480px',
              maxWidth: '510px'
            }}
          >
            {/* Appearance Settings */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '12px', width: '100%' }}>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: '18px',
                  lineHeight: '150%',
                  color: '#172033'
                }}
              >
                Appearance settings
              </div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: '12px',
                  lineHeight: '150%',
                  color: '#64748B'
                }}
              >
                Select vertical spacing and information density
              </div>

              {/* Density Choices */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
                {[
                  {
                    key: 'Compact',
                    name: 'Compact',
                    desc: 'Maximum information per screen · 32px rows',
                    barH: 8,
                    barGap: 4
                  },
                  {
                    key: 'Balanced',
                    name: 'Balanced',
                    desc: 'Default baseline layout · 48px rows',
                    barH: 5,
                    barGap: 8
                  },
                  {
                    key: 'Spacious',
                    name: 'Spacious',
                    desc: 'Relaxed presentation mode · 64px rows',
                    barH: 3,
                    barGap: 12
                  }
                ].map((opt) => {
                  const isSelected = localDensity === opt.key;
                  return (
                    <div
                      key={opt.key}
                      onClick={() => setLocalDensity(opt.key)}
                      style={{
                        boxSizing: 'border-box',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: '12px',
                        gap: '18px',
                        width: '100%',
                        height: '76px',
                        background: isSelected ? '#EEF0FF' : '#FFFFFF',
                        border: isSelected ? '1px solid #4F46E5' : '1px solid #DCE3ED',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {/* Density Preview Thumbnail */}
                      <div
                        style={{
                          boxSizing: 'border-box',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          padding: '8px',
                          gap: `${opt.barGap}px`,
                          width: '96px',
                          height: '50px',
                          background: '#F8FAFC',
                          borderRadius: '4px'
                        }}
                      >
                        <div style={{ width: '80px', height: `${opt.barH}px`, background: isSelected ? '#C7CAFF' : '#DCE3ED', borderRadius: '1px' }} />
                        <div style={{ width: '80px', height: `${opt.barH}px`, background: isSelected ? '#C7CAFF' : '#DCE3ED', borderRadius: '1px' }} />
                        <div style={{ width: '80px', height: `${opt.barH}px`, background: isSelected ? '#C7CAFF' : '#DCE3ED', borderRadius: '1px' }} />
                      </div>

                      {/* Label & Description */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '4px', flex: 1 }}>
                        <div
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 600,
                            fontSize: '13px',
                            lineHeight: '150%',
                            color: isSelected ? '#4F46E5' : '#172033'
                          }}
                        >
                          {opt.name}
                        </div>
                        <div
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 400,
                            fontSize: '10px',
                            lineHeight: '150%',
                            color: '#64748B'
                          }}
                        >
                          {opt.desc}
                        </div>
                      </div>

                      {/* Custom Radio Button */}
                      <div
                        style={{
                          boxSizing: 'border-box',
                          width: '14px',
                          height: '14px',
                          borderRadius: '50%',
                          background: isSelected ? '#4F46E5' : '#FFFFFF',
                          border: isSelected ? '1px solid #4F46E5' : '1px solid #DCE3ED',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        {isSelected && <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#FFFFFF' }} />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Workspace Scale Settings */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '12px', width: '100%' }}>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: '18px',
                  lineHeight: '150%',
                  color: '#172033'
                }}
              >
                Workspace scale settings
              </div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: '12px',
                  lineHeight: '150%',
                  color: '#64748B'
                }}
              >
                Constrain maximum dashboard container width
              </div>

              {/* 3 Horizontal Scale Choices */}
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '10px', width: '100%' }}>
                {[
                  {
                    key: 'Compact',
                    name: 'Compact',
                    pct: '1024px · 70%',
                    barW: 37.8
                  },
                  {
                    key: 'Standard',
                    name: 'Standard',
                    pct: '1280px · 85%',
                    barW: 70.2
                  },
                  {
                    key: 'Wide',
                    name: 'Wide',
                    pct: '1440px · 100%',
                    barW: 99.36
                  }
                ].map((opt) => {
                  const isSelected = localScale === opt.key;
                  return (
                    <div
                      key={opt.key}
                      onClick={() => setLocalScale(opt.key)}
                      style={{
                        boxSizing: 'border-box',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        padding: '12px',
                        gap: '10px',
                        flex: '1 1 0',
                        height: '120px',
                        background: isSelected ? '#EEF0FF' : '#FFFFFF',
                        border: isSelected ? '1px solid #4F46E5' : '1px solid #DCE3ED',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {/* Container Width Preview */}
                      <div
                        style={{
                          boxSizing: 'border-box',
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: '100%',
                          height: '42px',
                          background: '#F8FAFC',
                          borderRadius: '3px'
                        }}
                      >
                        <div
                          style={{
                            width: `${opt.barW}px`,
                            height: '24px',
                            background: isSelected ? '#C7CAFF' : '#DCE3ED',
                            borderRadius: '2px'
                          }}
                        />
                      </div>

                      {/* Scale Selection Header */}
                      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <span
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 600,
                            fontSize: '11px',
                            lineHeight: '150%',
                            color: isSelected ? '#4F46E5' : '#172033'
                          }}
                        >
                          {opt.name}
                        </span>
                        <div
                          style={{
                            boxSizing: 'border-box',
                            width: '11px',
                            height: '11px',
                            borderRadius: '50%',
                            background: isSelected ? '#4F46E5' : '#FFFFFF',
                            border: isSelected ? '1px solid #4F46E5' : '1px solid #DCE3ED'
                          }}
                        />
                      </div>

                      {/* Container Percentage */}
                      <div
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 400,
                          fontSize: '10px',
                          lineHeight: '150%',
                          color: '#64748B'
                        }}
                      >
                        {opt.pct}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Live Workspace Layout Preview (496px) */}
          <div
            style={{
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              paddingLeft: '28px',
              gap: '16px',
              flex: '1 1 460px',
              borderLeft: '1px solid #DCE3ED'
            }}
          >
            {/* Preview Heading & Live Badge */}
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: '18px',
                    lineHeight: '150%',
                    color: '#172033'
                  }}
                >
                  Live layout preview
                </span>
                <Scan size={16} color="#4F46E5" />
              </div>

              {/* Status Pill */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: '4px 8px',
                  gap: '6px',
                  background: '#EEF0FF',
                  borderRadius: '4px'
                }}
              >
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#4F46E5' }} />
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: '11px',
                    lineHeight: '150%',
                    color: '#4F46E5'
                  }}
                >
                  Active canvas preview
                </span>
              </div>
            </div>

            {/* Live Workspace Layout Preview Box (468x360px) */}
            <div
              style={{
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                width: '100%',
                maxWidth: '468px',
                height: '350px',
                background: '#F8FAFC',
                border: '1px solid #DCE3ED',
                borderRadius: '6px',
                overflow: 'hidden'
              }}
            >
              {/* Preview Topbar */}
              <div
                style={{
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0px 12px',
                  width: '100%',
                  height: '34px',
                  background: '#FFFFFF',
                  borderBottom: '1px solid #DCE3ED'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: 14, height: 14, borderRadius: '3px', background: '#4F46E5' }} />
                  <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '10px', color: '#172033' }}>
                    NOESIS
                  </span>
                </div>
                <div style={{ width: 62, height: 14, background: '#4F46E5', borderRadius: '3px' }} />
              </div>

              {/* Preview Workspace Body */}
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', width: '100%', flex: 1 }}>
                {/* Preview Sidebar */}
                <div
                  style={{
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    padding: '10px 8px',
                    gap: localDensity === 'Compact' ? '8px' : localDensity === 'Spacious' ? '16px' : '12px',
                    width: '106px',
                    height: '100%',
                    background: '#FFFFFF',
                    borderRight: '1px solid #DCE3ED'
                  }}
                >
                  <div style={{ width: '86px', height: '11px', fontFamily: "'Inter', sans-serif", fontSize: '7px', color: '#8996AB' }}>
                    Copilot
                  </div>
                  <div style={{ width: '86px', height: '11px', fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '7px', color: '#4F46E5' }}>
                    Dashboard
                  </div>
                  <div style={{ width: '86px', height: '11px', fontFamily: "'Inter', sans-serif", fontSize: '7px', color: '#8996AB' }}>
                    Decision Intel
                  </div>
                  <div style={{ width: '86px', height: '11px', fontFamily: "'Inter', sans-serif", fontSize: '7px', color: '#8996AB' }}>
                    Issue Tracker
                  </div>
                </div>

                {/* Preview Content Scaling Container */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flex: 1,
                    height: '100%',
                    background: '#F1F5F9',
                    padding: '8px',
                    overflow: 'hidden',
                    transition: 'all 0.25s ease'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      width: localScale === 'Compact' ? '70%' : localScale === 'Standard' ? '85%' : '100%',
                      maxWidth: '100%',
                      background: '#FFFFFF',
                      borderRadius: '4px',
                      border: '1px dashed #CBD5E1',
                      boxShadow: '0 1px 4px rgba(15, 23, 42, 0.05)',
                      padding: localDensity === 'Compact' ? '8px' : localDensity === 'Spacious' ? '18px' : '12px',
                      gap: localDensity === 'Compact' ? '8px' : localDensity === 'Spacious' ? '16px' : '12px',
                      transition: 'all 0.25s ease'
                    }}
                  >
                    {/* Page Title Mini */}
                    <div
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 600,
                        fontSize: localDensity === 'Compact' ? '11px' : localDensity === 'Spacious' ? '14px' : '12px',
                        color: '#172033',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%'
                      }}
                    >
                      <span>Customer Feedback Signal</span>
                      <span style={{ fontSize: '8px', color: '#4F46E5', fontWeight: 600, background: '#EEF0FF', padding: '1px 5px', borderRadius: '3px' }}>
                        {localScale === 'Compact' ? '1024px · 70%' : localScale === 'Standard' ? '1280px · 85%' : '1440px · 100%'}
                      </span>
                    </div>

                    {/* Preview Metric Row */}
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '6px', width: '100%' }}>
                      {[
                        { val: '7,002', color: '#172033' },
                        { val: '1,329', color: '#B77913' },
                        { val: '74.2%', color: '#172033' },
                        { val: '6.8', color: '#172033' }
                      ].map((m, i) => (
                        <div
                          key={i}
                          style={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '3px',
                            background: '#F8FAFC',
                            padding: localDensity === 'Compact' ? '3px 4px' : localDensity === 'Spacious' ? '6px 8px' : '4px 6px',
                            borderRadius: '3px',
                            border: '1px solid #DCE3ED'
                          }}
                        >
                          <div style={{ width: '100%', height: '2px', background: '#DCE3ED' }} />
                          <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: localDensity === 'Compact' ? '9px' : localDensity === 'Spacious' ? '12px' : '10px', color: m.color }}>
                            {m.val}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Preview Volume Histogram Bar Chart */}
                    <div
                      style={{
                        boxSizing: 'border-box',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'flex-end',
                        gap: '4px',
                        width: '100%',
                        height: localDensity === 'Compact' ? '40px' : localDensity === 'Spacious' ? '64px' : '50px',
                        paddingBottom: '4px',
                        borderBottom: '1px solid #DCE3ED',
                        transition: 'all 0.25s ease'
                      }}
                    >
                      {[25, 38, 31, 52, 44, 48, 36].map((h, i) => (
                        <div
                          key={i}
                          style={{
                            flex: 1,
                            height: `${h * (localDensity === 'Compact' ? 0.65 : localDensity === 'Spacious' ? 1.05 : 0.85)}px`,
                            background: '#C7CAFF',
                            borderRadius: '2px 2px 0 0',
                            transition: 'height 0.2s ease'
                          }}
                        />
                      ))}
                    </div>

                    {/* Preview Evidence List */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: localDensity === 'Compact' ? '4px' : localDensity === 'Spacious' ? '8px' : '6px', width: '100%' }}>
                      {[
                        { color: '#BE3455', w: '85%' },
                        { color: '#B77913', w: '70%' },
                        { color: '#4F46E5', w: '92%' }
                      ].map((row, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', width: '100%' }}>
                          <div style={{ width: 4, height: 4, borderRadius: '50%', background: row.color, flexShrink: 0 }} />
                          <div style={{ width: row.w, height: localDensity === 'Compact' ? '3px' : localDensity === 'Spacious' ? '5px' : '4px', background: '#DCE3ED', borderRadius: '1px' }} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Preview Intent & Preserved Layout Rules */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '100%' }}>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: '12px',
                  lineHeight: '150%',
                  color: '#64748B'
                }}
              >
                Preferences apply instantaneously across your active session.
              </div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: '11px',
                  lineHeight: '150%',
                  color: '#8996AB'
                }}
              >
                Your settings are saved locally and synced to your workspace profile.
              </div>
            </div>
          </div>
        </div>

        {/* Settings Actions (Footer) */}
        <div
          style={{
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '18px',
            width: '100%',
            borderTop: '1px solid #DCE3ED'
          }}
        >
          {/* Reset Action */}
          <button
            onClick={handleReset}
            style={{
              background: 'transparent',
              border: 'none',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: '13px',
              lineHeight: '150%',
              color: '#64748B',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            Reset to platform defaults
          </button>

          {/* Cancel & Save Layout */}
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={onClose}
              style={{
                boxSizing: 'border-box',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0px 16px',
                width: '76px',
                height: '42px',
                background: '#FFFFFF',
                border: '1px solid #DCE3ED',
                borderRadius: '6px',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: '13px',
                color: '#172033',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#F8FAFC'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#FFFFFF'}
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              style={{
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '0px 16px',
                width: '130px',
                height: '42px',
                background: '#4F46E5',
                border: '1px solid #4F46E5',
                borderRadius: '6px',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: '13px',
                color: '#FFFFFF',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                boxShadow: '0 2px 8px rgba(79, 70, 229, 0.25)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#4338CA'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#4F46E5'}
            >
              <Check size={16} color="#FFFFFF" />
              <span>Save layout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
