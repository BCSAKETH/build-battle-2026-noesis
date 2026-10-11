import React from 'react';
import {
  Sparkles,
  LayoutDashboard,
  Target,
  Kanban,
  LogOut,
  ChevronRight
} from 'lucide-react';

export default function Sidebar({ activeRoute, onNavigate, onLogout, issuesCount = 0 }) {
  const routes = [
    {
      id: 'copilot',
      label: 'Noesis Copilot',
      icon: Sparkles,
      badge: 'AI Core'
    },
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: 'Metrics'
    },
    {
      id: 'decision',
      label: 'Decision Intelligence',
      icon: Target,
      badge: 'P0 Triage'
    },
    {
      id: 'issues',
      label: 'Issue Tracker',
      icon: Kanban,
      badge: issuesCount > 0 ? issuesCount : undefined
    }
  ];

  return (
    <aside
      style={{
        width: '245px',
        background: '#ffffff',
        borderRight: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 'calc(100vh - 68px)',
        position: 'sticky',
        top: '68px',
        padding: '1.25rem 0.85rem',
        boxSizing: 'border-box',
        userSelect: 'none',
        flexShrink: 0
      }}
    >
      {/* 4 Core Routes */}
      <div>
        <div style={{ fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94a3b8', padding: '0 0.65rem 0.65rem' }}>
          Workspace Views
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          {routes.map((r) => {
            const Icon = r.icon;
            const isActive = activeRoute === r.id;

            return (
              <button
                key={r.id}
                onClick={() => onNavigate(r.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '8px',
                  border: 'none',
                  background: isActive ? '#eef2ff' : 'transparent',
                  color: isActive ? '#4f46e5' : '#475569',
                  fontSize: '0.85rem',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.background = '#f8fafc';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.background = 'transparent';
                }}
              >
                <Icon size={18} color={isActive ? '#4f46e5' : '#64748b'} />
                <span style={{ flex: 1 }}>{r.label}</span>

                {r.badge !== undefined && (
                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      padding: '1px 6px',
                      borderRadius: '9999px',
                      background: isActive ? '#4f46e5' : '#f1f5f9',
                      color: isActive ? '#ffffff' : '#64748b'
                    }}
                  >
                    {r.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Logout Button anchored to the absolute bottom */}
      <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1rem' }}>
        <button
          onClick={onLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            width: '100%',
            padding: '0.65rem 0.85rem',
            borderRadius: '8px',
            border: 'none',
            background: 'transparent',
            color: '#64748b',
            fontSize: '0.85rem',
            fontWeight: 600,
            cursor: 'pointer',
            textAlign: 'left',
            transition: 'all 0.15s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#fff1f2';
            e.currentTarget.style.color = '#be123c';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#64748b';
          }}
        >
          <LogOut size={17} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
