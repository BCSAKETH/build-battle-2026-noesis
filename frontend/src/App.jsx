import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle2 } from 'lucide-react';
import { supabase, fetchIssuesFromCloud } from './supabase';
import { useSettings } from './context/SettingsContext';
import LandingPage from './components/LandingPage';
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
import ScrollProgress from './components/ui/ScrollProgress';
import SmoothCursor from './components/ui/SmoothCursor';

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
  const [customTriageItems, setCustomTriageItems] = useState([]);

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

  // Launch workspace from landing page CTA or authenticated state
  const handleLaunchWorkspace = (roleKey) => {
    let currentUser = authUser;
    if (!currentUser) {
      try {
        const stored = localStorage.getItem('noesis_auth_user');
        if (stored) currentUser = JSON.parse(stored);
      } catch (e) {}
    }

    if (currentUser) {
      setAuthUser(currentUser);
      setViewMode('dashboard');
      showToast(`Welcome back to NOESIS, ${currentUser.name || currentUser.email}!`);
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
  // Landing Page Mode (Figma Frame 50:36875: Noesis · Full landing page)
  // --------------------------------------------------------------------------
  if (viewMode === 'landing') {
    return (
      <>
        <SmoothCursor color="#4F46E5" />
        <LandingPage
          onLaunchApp={(route) => {
            if (route) setActiveRoute(route);
            handleLaunchWorkspace();
          }}
          onOpenAuth={() => setShowAuthModal(true)}
          apiBase={API_BASE}
        />
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      </>
    );
  }

  // --------------------------------------------------------------------------
  // Enterprise Workspace Mode (Figma Frames 50:38765, 50:38370, 50:38013, 50:37555, 50:37433)
  // --------------------------------------------------------------------------
  const density = getDensityStyles();

  return (
    <div
      className="workspace-shell"
      style={{
        minHeight: '100vh',
        background: '#F8FAFC',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif"
      }}
    >
      {/* TopBar with Active Dataset, Credits Quota, Upload, Languages, Settings & Logout */}
      <TopBar
        authUser={authUser}
        onOpenUpload={() => setShowUploadModal(true)}
        onReturnToLanding={() => setViewMode('landing')}
        onLogout={handleLogout}
      />

      {/* Reactive ScrollProgress Line */}
      <ScrollProgress />

      {/* Main Workspace Body (Full-Width Clean Workspace Canvas) */}
      <div style={{ display: 'flex', flex: 1, minHeight: 'calc(100vh - 80px)', width: '100%' }}>

        {/* Viewport Canvas */}
        <main
          style={{
            flex: 1,
            width: '100%',
            minWidth: 0,
            background: '#F8FAFC',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            overflowY: 'auto',
            paddingBottom: '130px'
          }}
        >
          <div
            style={{
              width: getScaleWidth(),
              maxWidth: getScaleWidth(),
              padding: 0,
              boxSizing: 'border-box',
              minHeight: '100%',
              transition: 'width 0.3s ease, max-width 0.3s ease'
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
                <Dashboard
                  apiBase={API_BASE}
                  onNavigateRoute={(r) => setActiveRoute(r)}
                  onDispatchToDecision={(item) => {
                    setCustomTriageItems((prev) => [item, ...prev]);
                    setActiveRoute('decision');
                    showToast(`Dispatched ${item.id} to Decision Intelligence!`);
                  }}
                />
              )}

              {/* Route 3: Autonomous Decision Intelligence (Phase 4) */}
              {activeRoute === 'decision' && (
                <DecisionIntelligence
                  apiBase={API_BASE}
                  incomingItems={customTriageItems}
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
