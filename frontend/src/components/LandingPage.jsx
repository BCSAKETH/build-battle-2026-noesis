import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  ArrowDown,
  Fingerprint,
  GitBranch,
  AudioLines,
  Sparkles,
  ShieldCheck,
  Database,
  Layers,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Search,
  ExternalLink,
  ChevronRight,
  UserCheck,
  Lock,
  MessageSquare,
  Zap
} from 'lucide-react';
import NoesisLogo from './NoesisLogo';
import AdaptionCopilot from './AdaptionCopilot';
import CoolMode from './ui/CoolMode';

export default function LandingPage({ onLaunchApp, onOpenAuth, apiBase = '' }) {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div style={{ background: '#ffffff', color: '#0f172a', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      {/* =========================================================================
          1. PUBLIC NAVIGATION (Figma Frame: Public navigation)
         ========================================================================= */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 60,
          background: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid #e2e8f0',
          padding: '0.85rem 2.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }} onClick={() => onLaunchApp('copilot')}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: '9px',
                background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 3px 10px rgba(79, 70, 229, 0.25)'
              }}
            >
              <svg viewBox="0 0 40 40" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="17" stroke="#ffffff" strokeWidth="2" strokeDasharray="3 3" opacity="0.8" />
                <circle cx="20" cy="20" r="11" stroke="#38bdf8" strokeWidth="2.5" />
                <circle cx="20" cy="20" r="4.5" fill="#ffffff" />
              </svg>
            </div>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em' }}>
              noesis
            </span>
          </div>

          <nav style={{ display: 'flex', gap: '1.75rem', fontSize: '0.86rem', fontWeight: 600, color: '#475569' }}>
            <a href="#the-problem" style={{ textDecoration: 'none', color: 'inherit', transition: 'color 0.15s ease' }} onMouseEnter={e => e.target.style.color = '#4f46e5'} onMouseLeave={e => e.target.style.color = '#475569'}>The problem</a>
            <a href="#the-engine" style={{ textDecoration: 'none', color: 'inherit', transition: 'color 0.15s ease' }} onMouseEnter={e => e.target.style.color = '#4f46e5'} onMouseLeave={e => e.target.style.color = '#475569'}>The engine</a>
            <a href="#how-it-works" style={{ textDecoration: 'none', color: 'inherit', transition: 'color 0.15s ease' }} onMouseEnter={e => e.target.style.color = '#4f46e5'} onMouseLeave={e => e.target.style.color = '#475569'}>How it works</a>
            <a href="#security" style={{ textDecoration: 'none', color: 'inherit', transition: 'color 0.15s ease' }} onMouseEnter={e => e.target.style.color = '#4f46e5'} onMouseLeave={e => e.target.style.color = '#475569'}>Security</a>
          </nav>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <button
            onClick={onOpenAuth}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              background: '#ffffff',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: '#334155',
              cursor: 'pointer'
            }}
          >
            Login
          </button>
          <CoolMode>
            <button
              onClick={() => onLaunchApp('copilot')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.5rem 1.15rem',
                borderRadius: '8px',
                border: '1px solid #4338ca',
                background: '#4f46e5',
                color: '#ffffff',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(79, 70, 229, 0.25)'
              }}
            >
              <span>Create Account</span>
              <ArrowRight size={14} />
            </button>
          </CoolMode>
        </div>
      </header>

      {/* =========================================================================
          2. EDITORIAL HERO (Figma Frame: Editorial hero)
         ========================================================================= */}
      <section style={{ maxWidth: '1312px', margin: '0 auto', padding: '4.5rem 1.5rem 3rem' }}>
        {/* Top Header Index */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem', marginBottom: '2rem' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#64748b' }}>
            CUSTOMER FEEDBACK / SEVERITY INTELLIGENCE
          </span>
          <span style={{ fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#4f46e5' }}>
            CONTEXT. IMPACT. ACTION.
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '3rem', alignItems: 'start', marginBottom: '2.5rem' }}>
          <div>
            <h1
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: '4.4rem',
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '-0.04em',
                color: '#0f172a',
                margin: 0
              }}
            >
              Feedback is loud. <br />
              <span style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Severity is quiet.
              </span>
            </h1>
          </div>

          {/* Narrative Index */}
          <div style={{ borderLeft: '2px solid #e2e8f0', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>
              <span style={{ color: '#4f46e5', marginRight: '0.65rem' }}>01</span> Hear the customer
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>
              <span style={{ color: '#06b6d4', marginRight: '0.65rem' }}>02</span> Find the severity
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>
              <span style={{ color: '#10b981', marginRight: '0.65rem' }}>03</span> Act with clarity
            </div>
          </div>
        </div>

        {/* Hero Supporting Copy & CTAs */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem', marginBottom: '2.5rem' }}>
          <p style={{ fontSize: '1.25rem', color: '#475569', maxWidth: '680px', lineHeight: 1.6, margin: 0 }}>
            Find the signals hidden inside customer noise. Noesis connects feedback to severity, evidence and a clear next action.
          </p>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <CoolMode>
              <button
                onClick={() => onLaunchApp('copilot')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.55rem',
                  padding: '0.85rem 1.75rem',
                  borderRadius: '10px',
                  border: '1px solid #4338ca',
                  background: '#4f46e5',
                  color: '#ffffff',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 8px 20px rgba(79, 70, 229, 0.25)'
                }}
              >
                <span>Enter Workspace</span>
                <ArrowRight size={16} />
              </button>
            </CoolMode>
            <a
              href="#the-engine"
              style={{
                textDecoration: 'none',
                padding: '0.85rem 1.4rem',
                borderRadius: '10px',
                border: '1px solid #e2e8f0',
                background: '#ffffff',
                color: '#334155',
                fontSize: '0.95rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Explore the engine
            </a>
          </div>
        </div>

        <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 500 }}>
          Built for product, support and operations teams • Synchronized with <strong>7,002 customer records</strong>.
        </div>
      </section>

      {/* =========================================================================
          3. EVIDENCE PRINCIPLES BAR (Figma Frame: Evidence principles)
         ========================================================================= */}
      <section style={{ borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', background: '#f8fafc', padding: '1.25rem 2.5rem' }}>
        <div style={{ maxWidth: '1312px', margin: '0 auto', display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: '#334155', fontWeight: 600, fontSize: '0.88rem' }}>
            <Fingerprint size={18} color="#4f46e5" />
            <span>Trace every decision to evidence</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: '#334155', fontWeight: 600, fontSize: '0.88rem' }}>
            <GitBranch size={18} color="#06b6d4" />
            <span>Separate severity from sentiment</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', color: '#334155', fontWeight: 600, fontSize: '0.88rem' }}>
            <AudioLines size={18} color="#10b981" />
            <span>Resolve across languages</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. STAGE ONE · CUSTOMER VOICES INTO NOISE (Figma Frame: Stage one)
         ========================================================================= */}
      <section id="the-problem" style={{ maxWidth: '1312px', margin: '0 auto', padding: '5rem 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '2rem', marginBottom: '3rem' }}>
          <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '4.5rem', fontWeight: 900, color: '#e2e8f0', lineHeight: 1 }}>
            01
          </div>
          <div>
            <div style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#ef4444', marginBottom: '0.5rem' }}>
              THE PROBLEM / SEVERITY BLINDNESS
            </div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em', lineHeight: 1.2, margin: '0 0 1rem 0' }}>
              The loudest complaint isn’t always the most urgent.
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#475569', lineHeight: 1.6, maxWidth: '820px', margin: 0 }}>
              When every signal arrives with the same visual weight, a billing failure and a feature request occupy identical space. Real risk disappears inside unstructured noise.
            </p>
          </div>
        </div>

        {/* Customer Voices Simulation vs Fragment Cloud */}
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '2rem', marginBottom: '2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.75rem' }}>
            {/* Voice 1 */}
            <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#ef4444', background: '#fee2e2', padding: '2px 8px', borderRadius: '4px' }}>
                  SUPPORT CHAT
                </span>
                <span style={{ width: 24, height: 24, borderRadius: '50%', background: '#e2e8f0', fontSize: '0.68rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  AK
                </span>
              </div>
              <div style={{ fontSize: '0.92rem', fontWeight: 600, color: '#0f172a' }}>
                “I was charged twice.”
              </div>
            </div>

            {/* Voice 2 */}
            <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#10b981', background: '#d1fae5', padding: '2px 8px', borderRadius: '4px' }}>
                  APP REVIEW
                </span>
                <span style={{ width: 24, height: 24, borderRadius: '50%', background: '#e2e8f0', fontSize: '0.68rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  MJ
                </span>
              </div>
              <div style={{ fontSize: '0.92rem', fontWeight: 600, color: '#0f172a' }}>
                “Love the new layout!”
              </div>
            </div>

            {/* Voice 3 */}
            <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#f59e0b', background: '#fef3c7', padding: '2px 8px', borderRadius: '4px' }}>
                  CUSTOMER CALL
                </span>
                <span style={{ width: 24, height: 24, borderRadius: '50%', background: '#e2e8f0', fontSize: '0.68rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  SR
                </span>
              </div>
              <div style={{ fontSize: '0.92rem', fontWeight: 600, color: '#0f172a' }}>
                “Checkout keeps timing out.”
              </div>
            </div>

            {/* Voice 4 */}
            <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#6366f1', background: '#e0e7ff', padding: '2px 8px', borderRadius: '4px' }}>
                  SURVEY RESPONSE
                </span>
                <span style={{ width: 24, height: 24, borderRadius: '50%', background: '#e2e8f0', fontSize: '0.68rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  ND
                </span>
              </div>
              <div style={{ fontSize: '0.92rem', fontWeight: 600, color: '#0f172a' }}>
                “Could you add dark mode?”
              </div>
            </div>
          </div>

          {/* Unstructured Fragment Cloud */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', opacity: 0.85, padding: '1rem', background: '#ffffff', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            {[
              'Payment retry failed', 'Great service', 'Export is empty', 'Still loading…',
              'Charged twice', 'Add dark mode', 'Can’t check out', 'Missing receipt',
              'Looks good', 'Status stale', 'Please help', 'Slow response', 'Failed webhooks',
              'Fraudulent seller detected', 'Invoice incorrect'
            ].map((tag, i) => (
              <span key={i} style={{ fontSize: '0.75rem', padding: '4px 10px', borderRadius: '6px', background: '#f1f5f9', color: '#475569', fontWeight: 500 }}>
                {tag}
              </span>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
            <div>
              <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#ef4444', letterSpacing: '0.04em' }}>
                DIFFERENT IMPACT. IDENTICAL INBOX.
              </span>
              <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '2px 0 0 0' }}>
                No context. No weight. No shared order of urgency.
              </p>
            </div>
            <a href="#the-engine" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.85rem', fontWeight: 700, color: '#4f46e5' }}>
              <span>Follow the signal through the noise</span>
              <ArrowDown size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. STAGE TWO · ADAPTION ENGINE TRANSFORMATION (Figma Frame: Stage two)
         ========================================================================= */}
      <section id="the-engine" style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1312px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '2rem', marginBottom: '3.5rem' }}>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '4.5rem', fontWeight: 900, color: '#cbd5e1', lineHeight: 1 }}>
              02
            </div>
            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#4f46e5', marginBottom: '0.5rem' }}>
                THE TRANSFORMATION / ADAPTION ENGINE
              </div>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em', lineHeight: 1.2, margin: '0 0 1rem 0' }}>
                From scattered voices to structured intelligence.
              </h2>
              <p style={{ fontSize: '1.1rem', color: '#475569', lineHeight: 1.6, maxWidth: '820px', margin: 0 }}>
                The Adaption Engine reads context, identifies severity, and connects each signal to evidence. Not sentiment. Severity.
              </p>
            </div>
          </div>

          {/* Chaos to Engine to Structure Architecture Card */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr 1.2fr', gap: '1.5rem', background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '2rem', boxShadow: '0 4px 20px rgba(15, 23, 42, 0.04)', marginBottom: '3rem' }}>
            {/* Input Column */}
            <div style={{ borderRight: '1px solid #f1f5f9', paddingRight: '1.5rem' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#64748b', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                INPUT / 7,002 SIGNALS
              </span>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: '0.5rem 0' }}>
                Raw Unstructured Ingestion
              </div>
              <p style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.5 }}>
                7,002 signals. Multi-channel streams across App Store, Support, Zendesk.
              </p>
              <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                <div style={{ padding: '0.5rem', borderRadius: '6px', background: '#f8fafc', fontSize: '0.75rem', color: '#475569' }}>
                  • Payment charge retry loops
                </div>
                <div style={{ padding: '0.5rem', borderRadius: '6px', background: '#f8fafc', fontSize: '0.75rem', color: '#475569' }}>
                  • Escrow fraud accusations
                </div>
                <div style={{ padding: '0.5rem', borderRadius: '6px', background: '#f8fafc', fontSize: '0.75rem', color: '#475569' }}>
                  • Broken checkout modals
                </div>
              </div>
            </div>

            {/* Engine Column */}
            <div style={{ padding: '0 1rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ background: 'linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)', border: '1px solid #c7d2fe', borderRadius: '12px', padding: '1.5rem', textAlign: 'center' }}>
                <div style={{ width: 44, height: 44, borderRadius: '12px', background: '#4f46e5', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem' }}>
                  <Cpu size={22} />
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#4f46e5', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  ADAPTION ENGINE
                </span>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', margin: '0.35rem 0' }}>
                  CONTEXT → IMPACT → SEVERITY
                </div>
                <p style={{ fontSize: '0.8rem', color: '#475569', margin: 0 }}>
                  Not sentiment analysis. Severity intelligence. Groq Llama-3 + Gemini 3.8 Causal Reasoning.
                </p>
              </div>
            </div>

            {/* Output Column */}
            <div style={{ borderLeft: '1px solid #f1f5f9', paddingLeft: '1.5rem' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#64748b', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                OUTPUT / PRIORITIZED & TRACED
              </span>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: '0.5rem 0' }}>
                Organized Severity Arrays
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0.75rem', borderRadius: '6px', background: '#fff1f2', border: '1px solid #fecdd3' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#e11d48' }}>P0 / Critical (Crimson)</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#e11d48' }}>89</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0.75rem', borderRadius: '6px', background: '#fffbeb', border: '1px solid #fde68a' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#d97706' }}>P1 / High (Amber)</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#d97706' }}>412</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0.75rem', borderRadius: '6px', background: '#eef2ff', border: '1px solid #c7d2fe' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#4f46e5' }}>P2 / Moderate (Indigo)</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#4f46e5' }}>1,850</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0.75rem', borderRadius: '6px', background: '#ecfdf5', border: '1px solid #a7f3d0' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#059669' }}>P3 / Low (Emerald)</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#059669' }}>4,651</span>
                </div>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.75rem' }}>
                Every signal has an owner, evidence and a next step.
              </p>
            </div>
          </div>

          {/* 3 Process Steps */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
            <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '1.5rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#4f46e5' }}>01</span>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: '0.25rem 0' }}>Read context</div>
              <p style={{ fontSize: '0.82rem', color: '#64748b', margin: 0 }}>Channel, history, account and user flow traces.</p>
            </div>
            <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '1.5rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#06b6d4' }}>02</span>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: '0.25rem 0' }}>Assess impact</div>
              <p style={{ fontSize: '0.82rem', color: '#64748b', margin: 0 }}>Financial harm, operational block, or experience degradation.</p>
            </div>
            <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '1.5rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#10b981' }}>03</span>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: '0.25rem 0' }}>Assign severity</div>
              <p style={{ fontSize: '0.82rem', color: '#64748b', margin: 0 }}>P0–P3 tiers supported by rigorous causal trace evidence.</p>
            </div>
          </div>

          {/* Surfaced Signal in Practice Card */}
          <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#4f46e5', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                SIGNAL, SURFACED / ILLUSTRATIVE WORKSPACE
              </span>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', marginTop: '0.25rem' }}>
                Duplicate charges after payment retry
              </div>
              <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '2px 0 0 0' }}>
                18 related reports. Financial impact, not just negative sentiment.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#ef4444', background: '#fee2e2', padding: '4px 12px', borderRadius: '6px' }}>
                P0 · Critical
              </span>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', background: '#f1f5f9', padding: '4px 12px', borderRadius: '6px' }}>
                N-1041 · Open
              </span>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#059669' }}>
                Directly routed to Issue Tracker →
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. SEVERITY RATIONALE (Figma Frame: Severity rationale)
         ========================================================================= */}
      <section style={{ maxWidth: '1312px', margin: '0 auto', padding: '5rem 1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#4f46e5', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              THE PRIORITIES
            </span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em', margin: '0.35rem 0 0 0' }}>
              A shared language for what matters.
            </h2>
          </div>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#64748b' }}>
            Severity is impact. Status is progress.
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
          {/* P0 */}
          <div style={{ borderRadius: '12px', border: '1px solid #fecdd3', background: '#fff1f2', padding: '1.5rem' }}>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#e11d48', marginBottom: '0.5rem' }}>
              P0 · Critical
            </div>
            <p style={{ fontSize: '0.82rem', color: '#9f1239', lineHeight: 1.5, margin: '0 0 1rem 0' }}>
              Financial harm or a service-blocking failure affecting customers. Route immediately; no triage needed.
            </p>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#be123c' }}>
              89 records · active dataset
            </div>
          </div>

          {/* P1 */}
          <div style={{ borderRadius: '12px', border: '1px solid #fde68a', background: '#fffbeb', padding: '1.5rem' }}>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#d97706', marginBottom: '0.5rem' }}>
              P1 · High
            </div>
            <p style={{ fontSize: '0.82rem', color: '#92400e', lineHeight: 1.5, margin: '0 0 1rem 0' }}>
              A core workflow is degraded and affecting a segment of users. Assign ownership and act within the day.
            </p>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#b45309' }}>
              412 records · active dataset
            </div>
          </div>

          {/* P2 */}
          <div style={{ borderRadius: '12px', border: '1px solid #c7d2fe', background: '#eef2ff', padding: '1.5rem' }}>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#4f46e5', marginBottom: '0.5rem' }}>
              P2 · Moderate
            </div>
            <p style={{ fontSize: '0.82rem', color: '#3730a3', lineHeight: 1.5, margin: '0 0 1rem 0' }}>
              An important friction point with contextual evidence. Review, prioritize by volume and recurrence.
            </p>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4338ca' }}>
              1,850 records · active dataset
            </div>
          </div>

          {/* P3 */}
          <div style={{ borderRadius: '12px', border: '1px solid #a7f3d0', background: '#ecfdf5', padding: '1.5rem' }}>
            <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#059669', marginBottom: '0.5rem' }}>
              P3 · Low
            </div>
            <p style={{ fontSize: '0.82rem', color: '#065f46', lineHeight: 1.5, margin: '0 0 1rem 0' }}>
              Minor friction, suggestions, or positive signals. Preserved for roadmap planning — not discarded.
            </p>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#047857' }}>
              4,651 records · active dataset
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. CONNECTED WORKFLOW (Figma Frame: Connected workflow)
         ========================================================================= */}
      <section id="how-it-works" style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1312px', margin: '0 auto' }}>
          <div style={{ marginBottom: '3rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#4f46e5' }}>
              ONE WORKSPACE / A CLEAR PATH TO ACTION
            </span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em', margin: '0.35rem 0 0 0' }}>
              Understand. Decide. Resolve.
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Step 1 */}
            <div
              onClick={() => onLaunchApp('copilot')}
              style={{
                display: 'grid',
                gridTemplateColumns: '80px 280px 1fr 40px',
                alignItems: 'center',
                padding: '1.5rem 2rem',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                background: '#ffffff',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#4f46e5'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#e2e8f0'}
            >
              <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#4f46e5' }}>01</span>
              <div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>Ask with context</div>
                <span style={{ fontSize: '0.75rem', color: '#4f46e5', fontWeight: 700 }}>Noesis Copilot</span>
              </div>
              <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0 }}>
                Connect your questions to dataset records, issue evidence and live Supabase tracking IDs.
              </p>
              <ArrowUpRight size={20} color="#94a3b8" />
            </div>

            {/* Step 2 */}
            <div
              onClick={() => onLaunchApp('decisions')}
              style={{
                display: 'grid',
                gridTemplateColumns: '80px 280px 1fr 40px',
                alignItems: 'center',
                padding: '1.5rem 2rem',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                background: '#ffffff',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#06b6d4'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#e2e8f0'}
            >
              <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#06b6d4' }}>02</span>
              <div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>Triage with intent</div>
                <span style={{ fontSize: '0.75rem', color: '#06b6d4', fontWeight: 700 }}>Decision Intelligence</span>
              </div>
              <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0 }}>
                P0 goes straight to Issue Tracker. Edge cases and inspected feedback get a human review.
              </p>
              <ArrowUpRight size={20} color="#94a3b8" />
            </div>

            {/* Step 3 */}
            <div
              onClick={() => onLaunchApp('issues')}
              style={{
                display: 'grid',
                gridTemplateColumns: '80px 280px 1fr 40px',
                alignItems: 'center',
                padding: '1.5rem 2rem',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                background: '#ffffff',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#10b981'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#e2e8f0'}
            >
              <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#10b981' }}>03</span>
              <div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>Close the loop</div>
                <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 700 }}>Issue Tracker</span>
              </div>
              <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0 }}>
                Record a resolution in Telugu, Hindi, or English. Gemini transcribes and translates before closing.
              </p>
              <ArrowUpRight size={20} color="#94a3b8" />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. PRODUCT VALUE · EVIDENCE BEFORE ASSUMPTIONS (Figma Frame)
         ========================================================================= */}
      <section style={{ maxWidth: '1312px', margin: '0 auto', padding: '5rem 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '3.5rem', alignItems: 'start' }}>
          {/* Left Explanation */}
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#4f46e5', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              EVIDENCE BEFORE ASSUMPTIONS
            </span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em', margin: '0.35rem 0 1rem 0' }}>
              An answer is only useful if you can trace it.
            </h2>
            <p style={{ fontSize: '1rem', color: '#475569', lineHeight: 1.6, margin: '0 0 1.75rem 0' }}>
              Move from a high-level pattern to the original customer voice. Keep causes, impact and actions connected without losing the source.
            </p>

            <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', fontWeight: 600, color: '#334155' }}>
                <CheckCircle2 size={16} color="#4f46e5" />
                <span>Inspect feedback behind any signal</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', fontWeight: 600, color: '#334155' }}>
                <CheckCircle2 size={16} color="#06b6d4" />
                <span>Follow a 3-hop causal trace</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', fontWeight: 600, color: '#334155' }}>
                <CheckCircle2 size={16} color="#10b981" />
                <span>Generate executive briefings for PDF export</span>
              </div>
            </div>
          </div>

          {/* Right Demonstration Card (3-Hop Trace) */}
          <div style={{ background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#4f46e5' }}>DECISION INTELLIGENCE</span>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#d97706', background: '#fef3c7', padding: '2px 8px', borderRadius: '4px' }}>
                Inspected · human review
              </span>
            </div>

            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', marginBottom: '1.25rem', fontStyle: 'italic' }}>
              “The CSV export finishes, but the file has no rows.”
            </div>

            {/* 3-Hop Causal Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
              {/* Hop 1 */}
              <div style={{ background: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', padding: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', fontWeight: 800, color: '#ef4444' }}>
                  <span>HOP 01 · ROOT CAUSE</span>
                  <span>rows_returned: 0</span>
                </div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a', margin: '2px 0' }}>Export filter mismatch</div>
                <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Hypothesis: the custom date range is not serialized correctly.</div>
              </div>

              {/* Hop 2 */}
              <div style={{ background: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', padding: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', fontWeight: 800, color: '#d97706' }}>
                  <span>HOP 02 · IMPACT</span>
                  <span>FB-0831 + cluster</span>
                </div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a', margin: '2px 0' }}>Reporting workflow blocked</div>
                <div style={{ fontSize: '0.78rem', color: '#64748b' }}>22 reports describe empty files despite a completed export.</div>
              </div>

              {/* Hop 3 */}
              <div style={{ background: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', padding: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', fontWeight: 800, color: '#10b981' }}>
                  <span>HOP 03 · ACTION</span>
                  <span>Owner: Data Platform</span>
                </div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a', margin: '2px 0' }}>Patch filter serialization</div>
                <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Validate the query, add a regression test, then retry export.</div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>FB-0831 · feedback_oct_2026</span>
              <button
                onClick={() => onLaunchApp('issues')}
                style={{
                  padding: '0.45rem 0.85rem',
                  borderRadius: '6px',
                  border: '1px solid #4f46e5',
                  background: '#4f46e5',
                  color: '#ffffff',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Dispatch to Issue Tracker
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. LIVE COPILOT PREVIEW (Interactive Demonstration)
         ========================================================================= */}
      <section style={{ maxWidth: '1312px', margin: '0 auto', padding: '2rem 1.5rem 5rem' }}>
        <div style={{ border: '1px solid #e2e8f0', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 30px rgba(15, 23, 42, 0.05)' }}>
          <div style={{ background: '#f8fafc', padding: '1rem 1.5rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981' }} />
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f172a' }}>Live Cognitive Copilot Preview</span>
            </div>
            <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Powered by Adaption Labs SDK & Groq</span>
          </div>
          <div style={{ padding: '1.5rem', background: '#ffffff' }}>
            <AdaptionCopilot apiBase={apiBase} />
          </div>
        </div>
      </section>

      {/* =========================================================================
          10. TRUST AND SECURITY (Figma Frame: Trust and security)
         ========================================================================= */}
      <section id="security" style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1312px', margin: '0 auto' }}>
          <div style={{ marginBottom: '3rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#4f46e5' }}>
              ACCOUNTABLE BY DESIGN
            </span>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em', margin: '0.35rem 0 0 0' }}>
              Your feedback deserves a careful workspace.
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.75rem' }}>
            <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '1.75rem' }}>
              <div style={{ width: 40, height: 40, borderRadius: '10px', background: '#eef2ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <Lock size={20} />
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                Identity & access
              </div>
              <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                A Supabase authentication flow keeps account access separate from the feedback workspace with Row-Level Security (RLS) enforcement.
              </p>
            </div>

            <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '1.75rem' }}>
              <div style={{ width: 40, height: 40, borderRadius: '10px', background: '#ecfdf5', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <Database size={20} />
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                Data stays in context
              </div>
              <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                Dataset names, record IDs and ticket references remain visible wherever an answer is used. No hallucinations without traceability.
              </p>
            </div>

            <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '1.75rem' }}>
              <div style={{ width: 40, height: 40, borderRadius: '10px', background: '#f0fdf4', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <ShieldCheck size={20} />
              </div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                Review before write
              </div>
              <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                Inspect proposed changes and translated voice memos in Telugu, Hindi, or English before confirming a ticket resolution update.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          11. STAGE THREE · ACCOUNT ACCESS CTA (Figma Frame: Stage three)
         ========================================================================= */}
      <section style={{ maxWidth: '1312px', margin: '0 auto', padding: '6rem 1.5rem', textAlign: 'center' }}>
        <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#4f46e5', marginBottom: '0.75rem', display: 'inline-block' }}>
          03 / FROM CLARITY TO ACTION
        </span>
        <h2 style={{ fontSize: '3.2rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.04em', lineHeight: 1.15, maxWidth: '850px', margin: '0 auto 1.25rem' }}>
          See what your feedback is really telling you.
        </h2>
        <p style={{ fontSize: '1.15rem', color: '#475569', maxWidth: '640px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
          Create your workspace, bring a dataset and start with a better question.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', alignItems: 'center' }}>
          <CoolMode>
            <button
              onClick={() => onLaunchApp('copilot')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.55rem',
                padding: '0.9rem 2rem',
                borderRadius: '10px',
                border: '1px solid #4338ca',
                background: '#4f46e5',
                color: '#ffffff',
                fontSize: '1rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 10px 25px rgba(79, 70, 229, 0.3)'
              }}
            >
              <span>Launch Platform</span>
              <ArrowRight size={16} />
            </button>
          </CoolMode>
          <button
            onClick={onOpenAuth}
            style={{
              padding: '0.9rem 1.75rem',
              borderRadius: '10px',
              border: '1px solid #e2e8f0',
              background: '#ffffff',
              color: '#334155',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Sign In / Switch Roles
          </button>
        </div>
      </section>

      {/* =========================================================================
          12. FOOTER (Figma Frame: Footer)
         ========================================================================= */}
      <footer style={{ borderTop: '1px solid #e2e8f0', background: '#ffffff', padding: '2.5rem 2.5rem' }}>
        <div style={{ maxWidth: '1312px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{ width: 26, height: 26, borderRadius: '6px', background: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ffffff' }} />
            </div>
            <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
              noesis
            </span>
          </div>

          <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
            Customer-feedback severity intelligence
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.82rem', color: '#64748b' }}>
            <a href="#privacy" style={{ textDecoration: 'none', color: 'inherit' }}>Privacy</a>
            <a href="#terms" style={{ textDecoration: 'none', color: 'inherit' }}>Terms</a>
            <span>© 2026 Noesis</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
