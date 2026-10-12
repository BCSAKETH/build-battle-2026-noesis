import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle2 } from 'lucide-react';
import { supabase, fetchIssuesFromCloud } from './supabase';
import { useSettings } from './context/SettingsContext';
import LandingHero from './pages/LandingHero';
import AuthModal from './components/AuthModal';
import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import NoesisCopilot from './components/NoesisCopilot';
import Dashboard from './components/Dashboard';
import DecisionIntelligence from './components/DecisionIntelligence';
import TicketDeliveryTracker from './components/TicketDeliveryTracker';
import DatasetUploadModal from './components/DatasetUploadModal';
import ErrorBoundary from './components/ErrorBoundary';
import { FloatingDock } from './components/ui/FloatingDock';

// Dynamic API_BASE for local development and Vercel serverless monorepo deployment
const API_BASE =
  import.meta.env.VITE_API_URL !== undefined && import.meta.env.VITE_API_URL !== ''
    ? import.meta.env.VITE_API_URL
    : import.meta.env.DEV
    ? 'http://127.0.0.1:8000'
    : '';

export default function App() {
  const { t } = useTranslation();
  const { getScaleWidth, getDensityStyles, appearance, workspaceScale } = useSettings();

  // Navigation & View Mode: 'landing' (story) vs 'dashboard' (workspace)
  const [viewMode, setViewMode] = useState(() => {
    try {
      const stored = localStorage.getItem('noesis_auth_user');
      return stored ? 'dashboard' : 'landing';
    } catch (e) {
      return 'landing';
    }
  });
  const [activeRoute, setActiveRoute] = useState('copilot'); // Phase 3 Mandate: Noesis Copilot is the default route post-login
  const [selectedIssueId, setSelectedIssueId] = useState(null);

  // Modal States
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Authenticated User State
  const [authUser, setAuthUser] = useState(() => {
    try {
      const stored = localStorage.getItem('noesis_auth_user');
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  });

  // Operational Issues State (Synced with Supabase Cloud)
  const [issues, setIssues] = useState([]);

  // Fetch initial issues from Supabase cloud / cache
  useEffect(() => {
    const loadIssues = async () => {
      try {
        const data = await fetchIssuesFromCloud();
        if (data && data.length > 0) {
          setIssues(data);
        }
      } catch (err) {
        console.warn('Initial issue fetch warning:', err);
      }
    };
    loadIssues();
  }, []);

  // Listen to Supabase Auth state changes
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        const u = {
          id: session.user.id,
          email: session.user.email,
          name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || 'User',
          role: session.user.user_metadata?.role || 'executive'
        };
        setAuthUser(u);
        localStorage.setItem('noesis_auth_user', JSON.stringify(u));
      } else if (event === 'SIGNED_OUT') {
        setAuthUser(null);
        localStorage.removeItem('noesis_auth_user');
      }
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Launch workspace from landing page CTA or 1-click roles
  const handleLaunchWorkspace = (roleKey) => {
    let currentUser = authUser;
    if (!currentUser) {
      try {
        const stored = localStorage.getItem('noesis_auth_user');
        if (stored) currentUser = JSON.parse(stored);
      } catch (e) {}
    }
    if (!currentUser && roleKey) {
      currentUser = {
        role: typeof roleKey === 'string' ? roleKey : 'executive',
        name: roleKey === 'support' ? 'Marcus Chen' : roleKey === 'trust_safety' ? 'Elena Rostova' : 'Sarah Vance',
        title: roleKey === 'support' ? 'Support Operations Lead' : roleKey === 'trust_safety' ? 'Trust & Safety Director' : 'Chief Executive / VP Product',
        email: `${typeof roleKey === 'string' ? roleKey : 'executive'}@noesis.internal`,
        authenticated: true
      };
      localStorage.setItem('noesis_auth_user', JSON.stringify(currentUser));
    }

    if (currentUser) {
      setAuthUser(currentUser);
      setViewMode('dashboard');
      showToast(`Welcome to NOESIS, ${currentUser.name || currentUser.email}!`);
    } else {
      setShowAuthModal(true);
    }
  };

  const handleLoginSuccess = (user) => {
    setAuthUser(user);
    setViewMode('dashboard');
    showToast(`Authenticated as ${user.name || user.email}`);
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.warn('Signout note:', e);
    }
    setAuthUser(null);
    localStorage.removeItem('noesis_auth_user');
    setViewMode('landing');
    showToast('Signed out successfully.');
  };

  // --------------------------------------------------------------------------
  // Landing Page Mode (2D Narrative + 3D Horizontal Particles + Split Auth)
  // --------------------------------------------------------------------------
  if (viewMode === 'landing') {
    return (
      <>
        <LandingHero onLaunchWorkspace={handleLaunchWorkspace} />
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      </>
    );
  }

  // --------------------------------------------------------------------------
  // Enterprise Workspace Mode (4 Core Routes with Settings Scale & Executive Theme)
  // --------------------------------------------------------------------------
  const density = getDensityStyles();

  return (
    <div
      className="workspace-shell"
      style={{
        minHeight: '100vh',
        background: '#f8fafc',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Inter, system-ui, -apple-system, sans-serif'
      }}
    >
      {/* Phase 1 TopBar: Orbital Iris Logo (no v4.8), Upload Dataset, LanguageSelector, Settings Cog */}
      <TopBar
        onOpenUpload={() => setShowUploadModal(true)}
        onReturnToLanding={() => setViewMode('landing')}
      />

      {/* Main Workspace Body */}
      <div style={{ display: 'flex', flex: 1, minHeight: 'calc(100vh - 68px)' }}>
        {/* Phase 1 Sidebar: Exactly 4 routes + Logout anchored at bottom */}
        <Sidebar
          activeRoute={activeRoute}
          onNavigate={(route) => {
            setActiveRoute(route);
            setSelectedIssueId(null);
          }}
          onLogout={handleLogout}
          issuesCount={issues.length}
        />

        {/* Viewport Canvas (Configured by SettingsContext Workspace Scale & Appearance) */}
        <main
          style={{
            flex: 1,
            minWidth: 0,
            background: '#f8fafc',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            overflowY: 'auto'
          }}
        >
          <div
            style={{
              width: getScaleWidth(),
              maxWidth: '100%',
              padding: density.padding || '1.75rem',
              boxSizing: 'border-box',
              minHeight: '100%'
            }}
          >
            <ErrorBoundary onReset={() => setActiveRoute('copilot')}>
              {/* Route 1: Noesis Copilot (Default Route - Phase 3) */}
              {activeRoute === 'copilot' && (
                <NoesisCopilot
                  apiBase={API_BASE}
                  issues={issues}
                  onNavigateToIssue={(issueId) => {
                    setSelectedIssueId(issueId);
                    setActiveRoute('issues');
                  }}
                />
              )}

              {/* Route 2: Dashboard with Recharts & Briefing PDF (Phase 3) */}
              {activeRoute === 'dashboard' && (
                <Dashboard apiBase={API_BASE} />
              )}

              {/* Route 3: Autonomous Decision Intelligence (Phase 4) */}
              {activeRoute === 'decision' && (
                <DecisionIntelligence
                  apiBase={API_BASE}
                  onDispatchIssue={(newIssue) => {
                    setIssues((prev) => [newIssue, ...prev]);
                    showToast(`Dispatched ${newIssue.id} to Issue Tracker!`);
                  }}
                  onIssueCreated={(newIssue) => {
                    setIssues((prev) => [newIssue, ...prev]);
                  }}
                />
              )}

              {/* Route 4: Grid-Based Issue Tracker with Audio Resolution (Phase 5) */}
              {activeRoute === 'issues' && (
                <TicketDeliveryTracker
                  issues={issues}
                  onUpdateIssue={(issueId, updates) => {
                    setIssues((prev) =>
                      prev.map((it) => (it.id === issueId ? { ...it, ...updates } : it))
                    );
                    showToast(`Ticket ${issueId} updated successfully.`);
                  }}
                  apiBase={API_BASE}
                  initialSelectedId={selectedIssueId}
                />
              )}
            </ErrorBoundary>
          </div>
        </main>
      </div>

      {/* Global Dataset Upload Modal (Groq Llama-3 Auto-Mapping) */}
      <DatasetUploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        apiBase={API_BASE}
        onUploadSuccess={(dataset) => {
          showToast('Custom dataset successfully conditioned & loaded via Groq pipeline!');
          setShowUploadModal(false);
        }}
      />

      {/* Global Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Floating Liquid Glass Dock (Uiverse by mymiamo) */}
      <FloatingDock
        activeRoute={activeRoute}
        onNavigate={(route) => {
          setActiveRoute(route);
          setSelectedIssueId(null);
        }}
        onOpenUpload={() => setShowUploadModal(true)}
      />

      {/* Global Floating Toast Alert */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '1.75rem',
            right: '1.75rem',
            zIndex: 1000,
            background: '#0f172a',
            color: '#ffffff',
            padding: '0.85rem 1.35rem',
            borderRadius: '10px',
            boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            fontSize: '0.88rem',
            fontWeight: 600,
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          <CheckCircle2 size={18} color="#10b981" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
