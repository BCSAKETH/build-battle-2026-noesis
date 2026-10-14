import React from 'react';
import {
  Sparkles,
  BarChart3,
  GitBranch,
  Ticket,
  LogOut,
  Database
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

/**
 * Sidebar (Figma: Noesis · Workspace Sidebar - Frames 50:38765 & 50:38370)
 * 
 * Specifications:
 * - Width: 240px, Background: #FFFFFF, Border-right: 1px solid #DCE3ED
 * - Workspace identity: "Workspace" (13px font-weight 600 #172033), sample label #8996AB
 * - 4 Navigation routes: 48px height each
 *   - Active: background #EEF0FF, border-left: 2px solid #4F46E5, color #4F46E5
 *   - Inactive: background #FFFFFF, color #64748B
 * - Dataset context card: database icon, "Active dataset", "feedback_oct_2026", "7,002 verified records"
 * - Sign Out button at bottom with log-out icon
 */
export default function Sidebar({ activeRoute, onNavigate, onLogout, issuesCount = 0 }) {
  const { t } = useTranslation();

  const routes = [
    {
      id: 'copilot',
      label: t('nav.copilot', 'Noesis Copilot'),
      icon: Sparkles
    },
    {
      id: 'dashboard',
      label: t('nav.dashboard', 'Dashboard'),
      icon: BarChart3
    },
    {
      id: 'decision',
      label: t('nav.decision', 'Decision Intelligence'),
      icon: GitBranch
    },
    {
      id: 'issues',
      label: t('nav.issues', 'Issue Tracker'),
      icon: Ticket,
      badge: issuesCount > 0 ? issuesCount : undefined
    }
  ];

  return (
    <aside
      style={{
        boxSizing: 'border-box',
        width: '240px',
        background: '#FFFFFF',
        borderRight: '1px solid #DCE3ED',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '36px 20px 24px',
        gap: '32px',
        height: 'calc(100vh - 80px)',
        position: 'sticky',
        top: '80px',
        userSelect: 'none',
        flexShrink: 0
      }}
    >
      {/* Workspace Identity */}
      <div
        style={{
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: '0px 12px',
          gap: '6px',
          width: '200px'
        }}
      >
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            fontSize: '13px',
            lineHeight: '150%',
            color: '#172033'
          }}
        >
          {t('sidebar.workspace', 'Workspace')}
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
          {t('sidebar.dataset_name', 'feedback_oct_2026')}
        </div>
      </div>

      {/* Workspace Navigation */}
      <div
        style={{
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '4px',
          width: '200px'
        }}
      >
        {routes.map((r) => {
          const Icon = r.icon;
          const isActive = activeRoute === r.id;

          return (
            <button
              key={r.id}
              onClick={() => onNavigate(r.id)}
              style={{
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: '0px 12px',
                gap: '10px',
                width: '200px',
                height: '48px',
                background: isActive ? '#EEF0FF' : '#FFFFFF',
                border: 'none',
                borderLeft: isActive ? '2px solid #4F46E5' : '2px solid transparent',
                borderRadius: isActive ? '0 6px 6px 0' : '6px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.background = '#F8FAFC';
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.background = '#FFFFFF';
              }}
            >
              <Icon size={18} color={isActive ? '#4F46E5' : '#64748B'} />
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: isActive ? 600 : 400,
                  fontSize: '12px',
                  lineHeight: '150%',
                  color: isActive ? '#4F46E5' : '#64748B',
                  flex: 1
                }}
              >
                {r.label}
              </span>

              {r.badge !== undefined && (
                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '10px',
                    fontWeight: 600,
                    padding: '1px 6px',
                    borderRadius: '4px',
                    background: isActive ? '#4F46E5' : '#F1F5F9',
                    color: isActive ? '#FFFFFF' : '#64748B'
                  }}
                >
                  {r.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Dataset Context Card */}
      <div
        style={{
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: '24px 12px 0px',
          gap: '8px',
          width: '200px',
          borderTop: '1px solid #DCE3ED'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Database size={16} color="#64748B" />
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: '10px',
              lineHeight: '150%',
              color: '#64748B'
            }}
          >
            {t('sidebar.active_dataset', 'Active dataset')}
          </span>
        </div>

        <div
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontWeight: 500,
            fontSize: '11px',
            lineHeight: '150%',
            color: '#172033'
          }}
        >
          {t('sidebar.dataset_name', 'feedback_oct_2026')}
        </div>

        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: '11px',
            lineHeight: '150%',
            color: '#64748B'
          }}
        >
          {t('sidebar.records_verified', '7,002 verified records')}
        </div>
      </div>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Logout Action */}
      <div style={{ width: '100%', padding: '0 12px' }}>
        <button
          onClick={onLogout}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '10px',
            background: 'transparent',
            border: 'none',
            padding: '8px 0',
            cursor: 'pointer',
            color: '#64748B',
            transition: 'color 0.15s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#BE3455';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#64748B';
          }}
        >
          <LogOut size={18} />
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: '13px',
              lineHeight: '150%'
            }}
          >
            {t('sidebar.sign_out', 'Sign out')}
          </span>
        </button>
      </div>
    </aside>
  );
}
