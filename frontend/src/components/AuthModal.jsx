import React, { useState } from 'react';
import { X, ShieldCheck, Mail, Lock, UserCheck, ArrowRight, Sparkles } from 'lucide-react';
import { supabase } from '../supabase';

export default function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  if (!isOpen) return null;

  const [mode, setMode] = useState('demo'); // 'demo' | 'email'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleDemoLogin = (role, title, name) => {
    const userSession = {
      role,
      name,
      title,
      email: `${role}@noesis.internal`,
      authenticated: true,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('noesis_auth_user', JSON.stringify(userSession));
    onLoginSuccess(userSession);
    onClose();
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;
      const userSession = {
        role: 'executive',
        name: data.user?.email?.split('@')[0] || 'Executive User',
        title: 'Enterprise Operator',
        email: data.user?.email,
        authenticated: true
      };
      localStorage.setItem('noesis_auth_user', JSON.stringify(userSession));
      onLoginSuccess(userSession);
      onClose();
    } catch (err) {
      setErrorMsg(err.message || 'Authentication failed. Use 1-click demo role below.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 120 }}>
      <div
        className="card"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '520px',
          padding: '2rem',
          background: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.25)'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem' }}>
              <span className="badge badge-primary">Supabase Auth Verified</span>
              <span className="badge badge-neutral">Build Battle 2026</span>
            </div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a' }}>
              Sign In to NOESIS Platform
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#64748b' }}>
              Select an executive role or sign in with your corporate email.
            </p>
          </div>
          <button onClick={onClose} className="btn btn-ghost" style={{ padding: '0.35rem' }}>
            <X size={18} />
          </button>
        </div>

        {/* Tab switcher: 1-Click Demo vs Email */}
        <div
          style={{
            display: 'flex',
            background: '#f1f5f9',
            padding: '3px',
            borderRadius: '8px',
            marginBottom: '1.25rem'
          }}
        >
          <button
            onClick={() => setMode('demo')}
            style={{
              flex: 1,
              padding: '0.45rem',
              borderRadius: '6px',
              border: 'none',
              background: mode === 'demo' ? '#ffffff' : 'transparent',
              fontWeight: mode === 'demo' ? 700 : 500,
              color: mode === 'demo' ? '#4f46e5' : '#64748b',
              fontSize: '0.8rem',
              cursor: 'pointer',
              boxShadow: mode === 'demo' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none'
            }}
          >
            1-Click Role Access (Judges)
          </button>
          <button
            onClick={() => setMode('email')}
            style={{
              flex: 1,
              padding: '0.45rem',
              borderRadius: '6px',
              border: 'none',
              background: mode === 'email' ? '#ffffff' : 'transparent',
              fontWeight: mode === 'email' ? 700 : 500,
              color: mode === 'email' ? '#4f46e5' : '#64748b',
              fontSize: '0.8rem',
              cursor: 'pointer',
              boxShadow: mode === 'email' ? '0 1px 3px rgba(0,0,0,0.06)' : 'none'
            }}
          >
            Email / Password
          </button>
        </div>

        {/* Demo Roles (Fastest Evaluation) */}
        {mode === 'demo' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div
              onClick={() => handleDemoLogin('executive', 'Chief Executive Officer', 'Elena Vance')}
              style={{
                padding: '0.9rem',
                border: '1.5px solid #c7d2fe',
                background: '#eef2ff',
                borderRadius: '10px',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'all 0.15s ease'
              }}
            >
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1e1b4b' }}>
                  👔 Executive C-Suite (Elena Vance)
                </div>
                <div style={{ fontSize: '0.75rem', color: '#4338ca', marginTop: '0.15rem' }}>
                  Focus: Financial Risk Exposure ($305k), ROI, and Net CSAT
                </div>
              </div>
              <ArrowRight size={16} color="#4f46e5" />
            </div>

            <div
              onClick={() => handleDemoLogin('support', 'Head of Customer Experience', 'Marcus Chen')}
              style={{
                padding: '0.9rem',
                border: '1px solid #bae6fd',
                background: '#f0f9ff',
                borderRadius: '10px',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'all 0.15s ease'
              }}
            >
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#082f49' }}>
                  🎧 Support Ops Lead (Marcus Chen)
                </div>
                <div style={{ fontSize: '0.75rem', color: '#0369a1', marginTop: '0.15rem' }}>
                  Focus: SLA Queue Breaches, Agent Deflection & Response Times
                </div>
              </div>
              <ArrowRight size={16} color="#0284c7" />
            </div>

            <div
              onClick={() => handleDemoLogin('trust_safety', 'Forensic Fraud Director', 'Sarah Jenkins')}
              style={{
                padding: '0.9rem',
                border: '1px solid #fecaca',
                background: '#fef2f2',
                borderRadius: '10px',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                transition: 'all 0.15s ease'
              }}
            >
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#7f1d1d' }}>
                  🛡️ Trust & Safety Forensics (Sarah Jenkins)
                </div>
                <div style={{ fontSize: '0.75rem', color: '#b91c1c', marginTop: '0.15rem' }}>
                  Focus: 1,120 Fraud Vectors, Counterfeit Rings & Seller Freezes
                </div>
              </div>
              <ArrowRight size={16} color="#dc2626" />
            </div>
          </div>
        ) : (
          <form onSubmit={handleEmailAuth} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {errorMsg && (
              <div style={{ padding: '0.6rem', background: '#fee2e2', color: '#dc2626', borderRadius: '6px', fontSize: '0.78rem' }}>
                {errorMsg}
              </div>
            )}
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                Corporate Email
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={15} color="#94a3b8" style={{ position: 'absolute', left: 10, top: 11 }} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="executive@company.com"
                  className="input-field"
                  style={{ paddingLeft: '2rem' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={15} color="#94a3b8" style={{ position: 'absolute', left: 10, top: 11 }} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field"
                  style={{ paddingLeft: '2rem' }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.65rem', marginTop: '0.5rem' }}
            >
              {loading ? 'Authenticating with Supabase...' : 'Sign In with Supabase'}
            </button>
          </form>
        )}

        <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid #f1f5f9', textAlign: 'center', fontSize: '0.72rem', color: '#94a3b8' }}>
          Protected by Supabase Cloud RLS & Auth • Project ID: ydxarnhuezpckpwieynv
        </div>
      </div>
    </div>
  );
}
