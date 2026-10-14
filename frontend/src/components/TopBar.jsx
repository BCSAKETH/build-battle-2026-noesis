import React, { useState } from 'react';
import { UploadCloud, Settings, Sliders, Check, X, Shield, Globe, Zap, LogOut, Database, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';
import { useSettings } from '../context/SettingsContext';
import SettingsModal from './SettingsModal';
import NoesisSignatureLogo from './ui/NoesisSignatureLogo';

export default function TopBar({ onOpenUpload, onReturnToLanding, onLogout, authUser }) {
  const { t } = useTranslation();
  const { appearance, setAppearance, workspaceScale, setWorkspaceScale, theme } = useSettings();
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  // Extract display user details from prop or local storage
  const activeUser = authUser || (() => {
    try {
      const s = localStorage.getItem('noesis_auth_user');
      return s ? JSON.parse(s) : null;
    } catch {
      return null;
    }
  })() || {
    name: 'Maya Rao',
    email: 'executive@noesis.internal',
    role: 'Enterprise Operator'
  };

  const userInitial = (activeUser.name || activeUser.email || 'U').charAt(0).toUpperCase();

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
        {/* Left: Unified Noesis Signature Logo */}
        <NoesisSignatureLogo
          size={36}
          showBadge={true}
          onClick={onReturnToLanding}
          badgeText="INSIGHTFLOW"
        />

        {/* Right: Global Actions (Upload Dataset, Language Selector, Dataset Badge, Account) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          {/* Upload Dataset Button */}
          <button
            onClick={onOpenUpload}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.45rem 0.95rem',
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
            <UploadCloud size={15} color="#4f46e5" />
            <span>{t('topbar.upload_dataset', 'Upload Dataset')}</span>
          </button>

          {/* Language Selector (EN, TE, HI) */}
          <LanguageSelector />

          {/* Active Dataset Pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.4rem 0.75rem',
              borderRadius: '8px',
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              fontSize: '0.75rem',
              color: '#475569'
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} />
            <span style={{ fontWeight: 700, color: '#0f172a' }}>{t('topbar.dataset_name', 'feedback_oct_2026')}</span>
            <span style={{ color: '#94a3b8' }}>&bull; 7,002 {t('topbar.records', 'records')} &bull; Oct 1–7</span>
          </div>

          {/* Account Button with Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowAccountMenu((prev) => !prev)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.55rem',
                padding: '0.35rem 0.65rem 0.35rem 0.45rem',
                borderRadius: '8px',
                border: '1px solid #DCE3ED',
                background: showAccountMenu ? '#EEF2FF' : '#FFFFFF',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              title="Account and Workspace Preferences"
            >
              {/* User Avatar Circle */}
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '12px'
                }}
              >
                {userInitial}
              </div>

              {/* User Name */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: '12px',
                    color: '#172033',
                    lineHeight: 1.2
                  }}
                >
                  {activeUser.name || activeUser.email?.split('@')[0] || 'User'}
                </span>
                <span style={{ fontSize: '10px', color: '#64748B', lineHeight: 1 }}>
                  {activeUser.role || t('topbar.operator', 'Enterprise Operator')}
                </span>
              </div>

              <Sliders size={13} color="#64748B" style={{ marginLeft: 4 }} />
            </button>

            {/* Floating Account & Settings Menu Popover */}
            {showAccountMenu && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  right: 0,
                  width: '260px',
                  background: '#FFFFFF',
                  borderRadius: '10px',
                  border: '1px solid #DCE3ED',
                  boxShadow: '0 12px 32px rgba(15, 23, 42, 0.12)',
                  zIndex: 200,
                  overflow: 'hidden',
                  animation: 'fadeIn 0.15s ease-out'
                }}
              >
                {/* User Details Header */}
                <div style={{ padding: '14px 16px', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: '50%',
                        background: '#4F46E5',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '14px'
                      }}
                    >
                      {userInitial}
                    </div>
                    <div style={{ overflow: 'hidden' }}>
                      <div style={{ fontWeight: 700, fontSize: '13px', color: '#0F172A', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        {activeUser.name || t('topbar.operator', 'Enterprise Operator')}
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748B', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        {activeUser.email || 'executive@noesis.internal'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Menu Action Items */}
                <div style={{ padding: '6px' }}>
                  {/* Settings Trigger */}
                  <button
                    onClick={() => {
                      setShowAccountMenu(false);
                      setShowSettingsModal(true);
                    }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '9px 12px',
                      borderRadius: '6px',
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: 500,
                      color: '#172033',
                      textAlign: 'left',
                      transition: 'background 0.15s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#F1F5F9'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <Settings size={15} color="#4F46E5" />
                    <span>{t('topbar.settings', 'Settings · Layout Overlay')}</span>
                  </button>

                  <div style={{ height: '1px', background: '#E2E8F0', margin: '4px 0' }} />

                  {/* Sign Out Trigger */}
                  {onLogout && (
                    <button
                      onClick={() => {
                        setShowAccountMenu(false);
                        onLogout();
                      }}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '9px 12px',
                        borderRadius: '6px',
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer',
                        fontSize: '13px',
                        fontWeight: 600,
                        color: '#EF4444',
                        textAlign: 'left',
                        transition: 'background 0.15s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#FEF2F2'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <LogOut size={15} color="#EF4444" />
                      <span>{t('topbar.sign_out', 'Sign out')}</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Global Settings Modal (Figma Frame 50:38765) */}
      <SettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
      />
    </>
  );
}
