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
import NoesisSignatureLogo from './ui/NoesisSignatureLogo';
import NoesisLogo from './NoesisLogo';
import AdaptionCopilot from './AdaptionCopilot';
import CoolMode from './ui/CoolMode';
import FloatingPillNav from './ui/FloatingPillNav';
import ScrollProgress from './ui/ScrollProgress';
import InteractiveGridPattern from './ui/InteractiveGridPattern';
import DovetailFeatureCard from './ui/DovetailFeatureCard';
import RainbowButton from './ui/RainbowButton';
import AuroraText from './ui/AuroraText';
import LineShadowText from './ui/LineShadowText';
import TextAnimate from './ui/TextAnimate';
import TypingAnimation from './ui/TypingAnimation';
import ScrollBasedVelocity, { ScrollVelocityRow } from './ui/ScrollBasedVelocity';
import MorphingText from './ui/MorphingText';
import Highlighter from './ui/Highlighter';
import BorderBeam from './ui/BorderBeam';
import TextReveal from './ui/TextReveal';
import NumberTicker from './ui/NumberTicker';
import ProgressiveBlur from './ui/ProgressiveBlur';
import KineticText from './ui/KineticText';
import ScrollReveal from './ui/ScrollReveal';
import CognitiveCubeAssembly from './ui/CognitiveCubeAssembly';

export default function LandingPage({ onLaunchApp, onOpenAuth, apiBase = '' }) {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedDovetailTheme, setSelectedDovetailTheme] = useState('all');

  return (
    <div style={{ background: '#ffffff', color: '#0f172a', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      {/* Reactive ScrollProgress Bar */}
      <ScrollProgress style={{ top: 0, height: '3px' }} />

      {/* Floating Pill Navigation (User Reference Images 1, 2, 3) */}
      <FloatingPillNav onLaunchApp={onLaunchApp} onOpenAuth={onOpenAuth} />

      {/* Top Right Signature Logo (Enters at top right after initial hero animation) */}
      <div
        style={{
          position: 'fixed',
          top: '20px',
          right: '28px',
          zIndex: 99,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          padding: '6px 14px 6px 10px',
          borderRadius: '9999px',
          border: '1px solid rgba(220, 227, 237, 0.9)',
          boxShadow: '0 8px 24px -2px rgba(15, 23, 42, 0.08)',
          animation: 'fadeInSlideDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both',
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        title="NOESIS · Human Cognitive Decision Engine"
      >
        <NoesisSignatureLogo
          size={28}
          showBadge={true}
          showText={true}
          badgeText="INSIGHTFLOW"
        />
      </div>


      {/* =========================================================================
          2. EDITORIAL HERO (Figma Frame: Editorial hero)
         ========================================================================= */}
      <section style={{ maxWidth: '1312px', margin: '0 auto', padding: '6.5rem 1.5rem 3rem', position: 'relative', overflow: 'hidden' }}>
        <InteractiveGridPattern squares={[36, 16]} width={48} height={48} />
        {/* Top Header Index */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.75rem', marginBottom: '2rem' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#64748b' }}>
            <MorphingText texts={['CUSTOMER FEEDBACK / SEVERITY INTELLIGENCE', 'CONTEXT. IMPACT. ACTION.', '7,002 VERIFIED CUSTOMER SIGNALS', 'ADAPTION COGNITIVE PIPELINE']} />
          </div>
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
              <AuroraText speed="5s">
                Severity is quiet.
              </AuroraText>
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
            <Highlighter action="highlight" color="#e0e7ff">Find the signals</Highlighter> hidden inside customer noise. Noesis connects feedback to <Highlighter action="underline" color="#4f46e5">severity, evidence</Highlighter> and a clear next action.
          </p>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <RainbowButton onClick={() => onLaunchApp('copilot')}>
              <span>Enter Workspace</span>
              <ArrowRight size={16} />
            </RainbowButton>
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

        <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span>Built for product, support and operations teams • Synchronized with</span>
          <strong style={{ color: '#0f172a', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
            <NumberTicker value={7002} /> customer records
          </strong>.
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

      {/* Magic UI ScrollBasedVelocity Continuous Marquee Banner */}
      <section style={{ borderBottom: '1px solid #e2e8f0', background: '#ffffff', overflow: 'hidden', padding: '1rem 0' }}>
        <ScrollBasedVelocity>
          <ScrollVelocityRow baseVelocity={4} direction={1}>
            <span style={{ fontSize: '1rem', fontWeight: 800, color: '#4338ca', letterSpacing: '0.04em' }}>7,002 VERIFIED CUSTOMER SIGNALS</span>
            <span style={{ color: '#cbd5e1' }}>•</span>
            <span style={{ fontSize: '1rem', fontWeight: 700, color: '#0284c7' }}>3-HOP CAUSAL TRACES</span>
            <span style={{ color: '#cbd5e1' }}>•</span>
            <span style={{ fontSize: '1rem', fontWeight: 700, color: '#4f46e5' }}>REAL-TIME ADAPTION LABS</span>
            <span style={{ color: '#cbd5e1' }}>•</span>
            <span style={{ fontSize: '1rem', fontWeight: 700, color: '#dc2626' }}>P0 FRAUD QUARANTINE</span>
            <span style={{ color: '#cbd5e1' }}>•</span>
          </ScrollVelocityRow>
          <ScrollVelocityRow baseVelocity={-4} direction={-1}>
            <span style={{ fontSize: '1rem', fontWeight: 700, color: '#059669' }}>TELUGU HINDI ENGLISH AUDIO MEMOS</span>
            <span style={{ color: '#cbd5e1' }}>•</span>
            <span style={{ fontSize: '1rem', fontWeight: 800, color: '#4f46e5' }}>ZERO HALLUCINATION RUNTIME</span>
            <span style={{ color: '#cbd5e1' }}>•</span>
            <span style={{ fontSize: '1rem', fontWeight: 700, color: '#7c3aed' }}>SUPABASE POSTGRES</span>
            <span style={{ color: '#cbd5e1' }}>•</span>
            <span style={{ fontSize: '1rem', fontWeight: 700, color: '#ea580c' }}>GROQ LLAMA-3 &amp; GEMINI</span>
            <span style={{ color: '#cbd5e1' }}>•</span>
          </ScrollVelocityRow>
        </ScrollBasedVelocity>
      </section>

      {/* =========================================================================
          4. STAGE ONE · CUSTOMER VOICES INTO NOISE (Figma Frame: Stage one)
         ========================================================================= */}
      {/* =========================================================================
          4. STAGE ONE · CUSTOMER VOICES INTO NOISE (Figma Node 50:36925)
         ========================================================================= */}
      <ScrollReveal direction="up" distance={40}>
        <section id="the-problem" style={{ maxWidth: '1312px', margin: '0 auto', padding: '5.5rem 1.5rem' }}>
          {/* Header with Ghost 01 */}
          <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr', gap: '2rem', marginBottom: '2.5rem', alignItems: 'flex-start' }}>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '5.2rem',
                fontWeight: 900,
                color: '#DCE3ED',
                lineHeight: 0.85,
                letterSpacing: '-0.05em',
                userSelect: 'none'
              }}
            >
              01
            </div>
            <div>
              <div
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#EF4444',
                  marginBottom: '0.5rem'
                }}
              >
                THE PROBLEM / SEVERITY BLINDNESS
              </div>
              <h2
                style={{
                  fontSize: '2.6rem',
                  fontWeight: 800,
                  color: '#0F172A',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.15,
                  margin: '0 0 1rem 0'
                }}
              >
                The loudest complaint isn’t always the most urgent.
              </h2>
              <p
                style={{
                  fontSize: '1.08rem',
                  color: '#475569',
                  lineHeight: 1.6,
                  maxWidth: '840px',
                  margin: 0
                }}
              >
                When every signal arrives with the same visual weight, a billing failure and a feature request occupy identical space. Real risk disappears inside unstructured noise.
              </p>
            </div>
          </div>

          {/* Unified Problem Card (Figma Node 50:36925) */}
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '20px',
              padding: '2rem 2.25rem',
              boxShadow: '0 8px 30px rgba(15, 23, 42, 0.04)',
              transition: 'all 0.3s ease'
            }}
          >
            {/* Top Row: 4 Customer Voice Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem', marginBottom: '1.75rem' }}>
              {/* Voice 1: Support Chat */}
              <div
                style={{
                  background: '#FFFFFF',
                  borderRadius: '12px',
                  border: '1px solid #E2E8F0',
                  padding: '1.15rem 1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  boxShadow: '0 2px 6px rgba(15, 23, 42, 0.02)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(15, 23, 42, 0.06)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 6px rgba(15, 23, 42, 0.02)';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      color: '#E11D48',
                      background: '#FFE4E6',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      letterSpacing: '0.03em'
                    }}
                  >
                    SUPPORT CHAT
                  </span>
                  <span
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      background: '#F1F5F9',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      color: '#334155',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    AK
                  </span>
                </div>
                <div style={{ fontSize: '0.96rem', fontWeight: 700, color: '#0F172A', lineHeight: 1.3 }}>
                  “I was charged twice.”
                </div>
              </div>

              {/* Voice 2: App Review */}
              <div
                style={{
                  background: '#FFFFFF',
                  borderRadius: '12px',
                  border: '1px solid #E2E8F0',
                  padding: '1.15rem 1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  boxShadow: '0 2px 6px rgba(15, 23, 42, 0.02)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(15, 23, 42, 0.06)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 6px rgba(15, 23, 42, 0.02)';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      color: '#16A34A',
                      background: '#DCFCE7',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      letterSpacing: '0.03em'
                    }}
                  >
                    APP REVIEW
                  </span>
                  <span
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      background: '#F1F5F9',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      color: '#334155',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    MJ
                  </span>
                </div>
                <div style={{ fontSize: '0.96rem', fontWeight: 700, color: '#0F172A', lineHeight: 1.3 }}>
                  “Love the new layout!”
                </div>
              </div>

              {/* Voice 3: Customer Call */}
              <div
                style={{
                  background: '#FFFFFF',
                  borderRadius: '12px',
                  border: '1px solid #E2E8F0',
                  padding: '1.15rem 1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  boxShadow: '0 2px 6px rgba(15, 23, 42, 0.02)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(15, 23, 42, 0.06)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 6px rgba(15, 23, 42, 0.02)';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      color: '#D97706',
                      background: '#FEF3C7',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      letterSpacing: '0.03em'
                    }}
                  >
                    CUSTOMER CALL
                  </span>
                  <span
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      background: '#F1F5F9',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      color: '#334155',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    SR
                  </span>
                </div>
                <div style={{ fontSize: '0.96rem', fontWeight: 700, color: '#0F172A', lineHeight: 1.3 }}>
                  “Checkout keeps timing out.”
                </div>
              </div>

              {/* Voice 4: Survey Response */}
              <div
                style={{
                  background: '#FFFFFF',
                  borderRadius: '12px',
                  border: '1px solid #E2E8F0',
                  padding: '1.15rem 1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  boxShadow: '0 2px 6px rgba(15, 23, 42, 0.02)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(15, 23, 42, 0.06)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 6px rgba(15, 23, 42, 0.02)';
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      color: '#7C3AED',
                      background: '#EDE9FE',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      letterSpacing: '0.03em'
                    }}
                  >
                    SURVEY RESPONSE
                  </span>
                  <span
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      background: '#F1F5F9',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      color: '#334155',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    ND
                  </span>
                </div>
                <div style={{ fontSize: '0.96rem', fontWeight: 700, color: '#0F172A', lineHeight: 1.3 }}>
                  “Could you add dark mode?”
                </div>
              </div>
            </div>

            {/* Middle: Unstructured Pile Fragment Cloud */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.65rem',
                padding: '1.25rem 1.5rem',
                background: '#F8FAFC',
                borderRadius: '12px',
                border: '1px solid #E2E8F0',
                marginBottom: '1.5rem'
              }}
            >
              {[
                'Payment retry failed',
                'Great service',
                'Export is empty',
                'Still loading…',
                'Charged twice',
                'Add dark mode',
                'Can’t check out',
                'Missing receipt',
                'Looks good',
                'Status stale',
                'Please help',
                'Slow response',
                'Failed webhooks',
                'Fraudulent seller detected',
                'Invoice incorrect'
              ].map((tag, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: '0.78rem',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    background: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    color: '#475569',
                    fontWeight: 600,
                    boxShadow: '0 1px 2px rgba(15, 23, 42, 0.02)',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#CBD5E1';
                    e.currentTarget.style.color = '#0F172A';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#E2E8F0';
                    e.currentTarget.style.color = '#475569';
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Bottom Bar: Different Impact. Identical Inbox. */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '1.25rem',
                borderTop: '1px solid #F1F5F9'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#EF4444', letterSpacing: '0.04em' }}>
                  DIFFERENT IMPACT. IDENTICAL INBOX.
                </span>
                {/* Concentric Dot Ring */}
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    background: 'rgba(99, 102, 241, 0.15)'
                  }}
                >
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#6366F1' }} />
                </span>
                <span style={{ fontSize: '0.82rem', color: '#64748B' }}>
                  No context. No weight. No shared order of urgency.
                </span>
              </div>

              <a
                href="#the-engine"
                style={{
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: '#4F46E5',
                  transition: 'color 0.15s ease'
                }}
              >
                <span>Follow the signal through the noise</span>
                <ArrowDown size={14} style={{ animation: 'bounceDown 2s infinite' }} />
              </a>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* =========================================================================
          5. STAGE TWO · ADAPTION ENGINE TRANSFORMATION (Figma Node 50:37001)
         ========================================================================= */}
      <ScrollReveal direction="up" distance={40}>
        <section id="the-engine" style={{ background: '#F8FAFC', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0', padding: '5.5rem 1.5rem' }}>
          <div style={{ maxWidth: '1312px', margin: '0 auto' }}>
            {/* Header with Ghost 02 */}
            <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr', gap: '2rem', marginBottom: '3rem', alignItems: 'flex-start' }}>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '5.2rem',
                  fontWeight: 900,
                  color: '#DCE3ED',
                  lineHeight: 0.85,
                  letterSpacing: '-0.05em',
                  userSelect: 'none'
                }}
              >
                02
              </div>
              <div>
                <div
                  style={{
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: '#4F46E5',
                    marginBottom: '0.5rem'
                  }}
                >
                  THE TRANSFORMATION / ADAPTION ENGINE
                </div>
                <h2
                  style={{
                    fontSize: '2.6rem',
                    fontWeight: 800,
                    color: '#0F172A',
                    letterSpacing: '-0.03em',
                    lineHeight: 1.15,
                    margin: '0 0 1rem 0'
                  }}
                >
                  From scattered voices to structured intelligence.
                </h2>
                <p
                  style={{
                    fontSize: '1.08rem',
                    color: '#475569',
                    lineHeight: 1.6,
                    maxWidth: '840px',
                    margin: 0
                  }}
                >
                  The Adaption Engine reads context, identifies severity, and connects each signal to evidence. Not sentiment. Severity.
                </p>
              </div>
            </div>

            {/* 3-Column Architecture Card (Figma Node 50:37001) */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1.55fr 1.25fr',
                gap: '2rem',
                alignItems: 'stretch',
                background: '#FFFFFF',
                borderRadius: '20px',
                border: '1px solid #E2E8F0',
                padding: '2.25rem',
                boxShadow: '0 8px 30px rgba(15, 23, 42, 0.04)',
                marginBottom: '3.5rem'
              }}
            >
              {/* Column 1: Raw Unstructured Ingestion */}
              <div style={{ borderRight: '1px solid #F1F5F9', paddingRight: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#64748B', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    INPUT / 7,002 SIGNALS
                  </span>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', margin: '0.5rem 0' }}>
                    Raw Unstructured Ingestion
                  </div>
                  <p style={{ fontSize: '0.82rem', color: '#64748B', lineHeight: 1.5, margin: '0 0 1.5rem' }}>
                    7,002 signals. Multi-channel streams across App Store, Support, Zendesk.
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  <div style={{ padding: '0.65rem 0.85rem', borderRadius: '8px', background: '#F8FAFC', border: '1px solid #E2E8F0', fontSize: '0.78rem', color: '#334155', fontWeight: 600 }}>
                    • Payment charge retry loops
                  </div>
                  <div style={{ padding: '0.65rem 0.85rem', borderRadius: '8px', background: '#F8FAFC', border: '1px solid #E2E8F0', fontSize: '0.78rem', color: '#334155', fontWeight: 600 }}>
                    • Escrow fraud accusations
                  </div>
                  <div style={{ padding: '0.65rem 0.85rem', borderRadius: '8px', background: '#F8FAFC', border: '1px solid #E2E8F0', fontSize: '0.78rem', color: '#334155', fontWeight: 600 }}>
                    • Broken checkout modals
                  </div>
                </div>
              </div>

              {/* Column 2: Adaption Engine (Center Stage with Laser Trace) */}
              <div style={{ padding: '0 0.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
                {/* Connecting Laser Trace Dot on Top Edge */}
                <div style={{ position: 'absolute', top: '-18px', left: '20px', display: 'flex', alignItems: 'center', gap: '8px', zIndex: 2 }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      background: 'rgba(79, 70, 229, 0.15)',
                      border: '1.5px solid #4F46E5'
                    }}
                  >
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4F46E5' }} />
                  </span>
                  <div style={{ width: '60px', height: '2px', background: 'linear-gradient(90deg, #4F46E5 0%, transparent 100%)' }} />
                </div>

                <div
                  style={{
                    background: 'linear-gradient(180deg, #F0F4FF 0%, #EEF2FF 100%)',
                    border: '1.5px solid #C7D2FE',
                    borderRadius: '16px',
                    padding: '2rem 1.75rem',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 8px 24px rgba(79, 70, 229, 0.08)'
                  }}
                >
                  <BorderBeam duration={8} size={110} />
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: '12px',
                      background: '#4F46E5',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 0.85rem',
                      boxShadow: '0 4px 14px rgba(79, 70, 229, 0.3)'
                    }}
                  >
                    <Cpu size={22} />
                  </div>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      color: '#4F46E5',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase'
                    }}
                  >
                    ADAPTION ENGINE
                  </span>
                  <div style={{ fontSize: '1.18rem', fontWeight: 800, color: '#0F172A', margin: '0.45rem 0' }}>
                    CONTEXT → IMPACT → SEVERITY
                  </div>
                  <p style={{ fontSize: '0.82rem', color: '#475569', margin: 0, lineHeight: 1.5 }}>
                    Not sentiment analysis. Severity intelligence. Groq Llama-3 + Gemini 3.8 Causal Reasoning.
                  </p>
                </div>
              </div>

              {/* Column 3: Organized Severity Arrays */}
              <div style={{ borderLeft: '1px solid #F1F5F9', paddingLeft: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#64748B', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    OUTPUT / PRIORITIZED & TRACED
                  </span>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', margin: '0.5rem 0' }}>
                    Organized Severity Arrays
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', margin: '1rem 0' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      background: '#FFF1F2',
                      border: '1px solid #FECDD3'
                    }}
                  >
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#BE123C' }}>P0 / Critical (Crimson)</span>
                    <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#BE123C' }}>89</span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      background: '#FFFBEB',
                      border: '1px solid #FDE68A'
                    }}
                  >
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#B45309' }}>P1 / High (Amber)</span>
                    <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#B45309' }}>412</span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      background: '#EEF2FF',
                      border: '1px solid #C7D2FE'
                    }}
                  >
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#4338CA' }}>P2 / Moderate (Indigo)</span>
                    <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#4338CA' }}>1,850</span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      background: '#ECFDF5',
                      border: '1px solid #A7F3D0'
                    }}
                  >
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#047857' }}>P3 / Low (Emerald)</span>
                    <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#047857' }}>4,651</span>
                  </div>
                </div>

                <p style={{ fontSize: '0.78rem', color: '#64748B', margin: 0 }}>
                  Every signal has an owner, evidence and a next step.
                </p>
              </div>
            </div>

            {/* 3D Cognitive Assembly Showcase (Figma Node 65:259) */}
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: '20px',
                border: '1px solid #E2E8F0',
                padding: '2.5rem 2rem',
                boxShadow: '0 8px 30px rgba(15, 23, 42, 0.04)',
                marginBottom: '3rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center'
              }}
            >
              <div style={{ marginBottom: '1.25rem' }}>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    color: '#4F46E5',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase'
                  }}
                >
                  3D COGNITIVE ASSEMBLY · LIVING MULTI-HOP SYNTHESIS
                </span>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', margin: '6px 0 8px' }}>
                  Interactive 8-Cube Isometric Data Matrix
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#64748B', maxWidth: '640px', margin: 0 }}>
                  Move your mouse to tilt the 3D perspective. Click the assembly to trigger real-time Cognitive Dispersion &amp; Reassembly.
                </p>
              </div>

              {/* The 8-Cube Isometric Assembly from Figma 65:259 */}
              <CognitiveCubeAssembly scale={1.05} />
            </div>

            {/* 3 Process Steps */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
              <div style={{ background: '#FFFFFF', borderRadius: '14px', border: '1px solid #E2E8F0', padding: '1.65rem' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#4F46E5' }}>01</span>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', margin: '0.35rem 0' }}>Read context</div>
                <p style={{ fontSize: '0.84rem', color: '#64748B', margin: 0, lineHeight: 1.5 }}>
                  Channel, history, account and user flow traces.
                </p>
              </div>
              <div style={{ background: '#FFFFFF', borderRadius: '14px', border: '1px solid #E2E8F0', padding: '1.65rem' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#06B6D4' }}>02</span>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', margin: '0.35rem 0' }}>Assess impact</div>
                <p style={{ fontSize: '0.84rem', color: '#64748B', margin: 0, lineHeight: 1.5 }}>
                  Financial harm, operational block, or experience degradation.
                </p>
              </div>
              <div style={{ background: '#FFFFFF', borderRadius: '14px', border: '1px solid #E2E8F0', padding: '1.65rem' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#10B981' }}>03</span>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0F172A', margin: '0.35rem 0' }}>Assign severity</div>
                <p style={{ fontSize: '0.84rem', color: '#64748B', margin: 0, lineHeight: 1.5 }}>
                  P0–P3 tiers supported by rigorous causal trace evidence.
                </p>
              </div>
            </div>

            {/* Surfaced Signal in Practice Card */}
            <div
              style={{
                background: '#FFFFFF',
                borderRadius: '14px',
                border: '1px solid #E2E8F0',
                padding: '1.5rem 1.75rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem'
              }}
            >
              <div>
                <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#4F46E5', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                  SIGNAL, SURFACED / ILLUSTRATIVE WORKSPACE
                </span>
                <div style={{ fontSize: '1.08rem', fontWeight: 800, color: '#0F172A', marginTop: '0.25rem' }}>
                  Duplicate charges after payment retry
                </div>
                <p style={{ fontSize: '0.84rem', color: '#64748B', margin: '2px 0 0 0' }}>
                  18 related reports. Financial impact, not just negative sentiment.
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#EF4444', background: '#FEE2E2', padding: '4px 12px', borderRadius: '6px' }}>
                  P0 · Critical
                </span>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', background: '#F1F5F9', padding: '4px 12px', borderRadius: '6px' }}>
                  N-1041 · Open
                </span>
                <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#059669' }}>
                  Directly routed to Issue Tracker →
                </span>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* =========================================================================
          6. SEVERITY RATIONALE (Figma Frame: Severity rationale)
         ========================================================================= */}
      <ScrollReveal direction="up" distance={40}>
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
      </ScrollReveal>

      {/* =========================================================================
          6B. DOVETAIL RESEARCH SUITE · THEMATIC CLUSTERING & CUSTOMER VOICE (Light Theme)
         ========================================================================= */}
      <ScrollReveal direction="up" distance={40}>
        <section
          id="dovetail-insights"
          style={{
            background: '#FFFFFF',
            borderTop: '1px solid #E2E8F0',
            borderBottom: '1px solid #E2E8F0',
            padding: '6rem 1.5rem',
            position: 'relative'
          }}
        >
          <div style={{ maxWidth: '1312px', margin: '0 auto' }}>
          {/* Section Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '3rem' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '4px 12px', borderRadius: '9999px', background: '#F1F5F9', border: '1px solid #CBD5E1', marginBottom: '1rem' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#4F46E5' }} />
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  DOVETAIL INSIGHTS · LIGHT THEME RESEARCH SUITE
                </span>
              </div>
              <h2 style={{ fontSize: '2.8rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.03em', margin: 0, lineHeight: 1.15 }}>
                7,002 unfiltered voices. <br />
                <span style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #EC4899 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  Crystallized into verified research themes.
                </span>
              </h2>
            </div>
            <p style={{ fontSize: '1.05rem', color: '#64748B', maxWidth: '440px', lineHeight: 1.6, margin: 0 }}>
              Dovetail-inspired thematic clustering, verbatim quotes with sentiment telemetry, and AI Copilot cards that turn customer friction into engineering tickets.
            </p>
          </div>

          {/* Interactive Thematic Tag Cloud (Pill Tabs) */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '3.5rem' }}>
            {[
              { id: 'all', label: 'All Themes', count: '7,002 signals' },
              { id: 'payment', label: '💳 Payment & Checkout Latency', count: '1,842 signals' },
              { id: 'fraud', label: '🛡️ Merchant KYC & Fake Reviews', count: '1,070 signals' },
              { id: 'shipping', label: '📦 3PL Carrier SLA Delivery Delay', count: '1,420 signals' },
              { id: 'biometric', label: '📱 iOS 18 Biometric Auth Loops', count: '912 signals' },
              { id: 'refund', label: '⚡ Refund Window & Dispute SLA', count: '1,758 signals' }
            ].map((theme) => {
              const isSelected = selectedDovetailTheme === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => setSelectedDovetailTheme(theme.id)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    borderRadius: '9999px',
                    border: isSelected ? '1px solid #4F46E5' : '1px solid #E2E8F0',
                    background: isSelected ? '#EEF2FF' : '#FFFFFF',
                    color: isSelected ? '#4F46E5' : '#334155',
                    fontSize: '13px',
                    fontWeight: isSelected ? 700 : 500,
                    cursor: 'pointer',
                    boxShadow: isSelected ? '0 2px 8px rgba(79, 70, 229, 0.15)' : '0 1px 3px rgba(15, 23, 42, 0.04)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span>{theme.label}</span>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      padding: '2px 6px',
                      borderRadius: '9999px',
                      background: isSelected ? '#4F46E5' : '#F1F5F9',
                      color: isSelected ? '#FFFFFF' : '#64748B'
                    }}
                  >
                    {theme.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* 3 Animated Feature Cards (Matching User Reference Image 4: @magicui-pro/animated-feature-card-3) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
            <DovetailFeatureCard
              tag="Make it Pop ✨"
              author="Josh Sundquist"
              role="Head of Insights · FinTech"
              avatarGradient="linear-gradient(135deg, #EC4899 0%, #F59E0B 100%)"
              quote="“Noesis turned 7,002 chaotic customer complaints into 5 actionable engineering tickets in under 30 seconds.”"
              title="AI Co-Pilot"
              subtitle="Use AI to make your writing stand out & transform raw rants into pristine engineering PRs."
            />

            <DovetailFeatureCard
              tag="Audio Resolution 🎙️"
              author="Priya Sharma"
              role="Tier-1 Operations Lead"
              avatarGradient="linear-gradient(135deg, #8B5CF6 0%, #06B6D4 100%)"
              quote="“The live Telugu, Hindi, and English cross-translation lets our Indian support specialists resolve voice escalations instantly.”"
              title="Vernacular Audio Trace"
              subtitle="Transcribe and verify voice memos with dual-channel human-in-the-loop audit trails."
            />

            <DovetailFeatureCard
              tag="3-Hop Reasoning ⚡"
              author="Marcus Vance"
              role="Principal Systems Architect"
              avatarGradient="linear-gradient(135deg, #10B981 0%, #3B82F6 100%)"
              quote="“Severity Blindness was bankrupting our support team. Noesis connects root cause directly to PR diffs with zero hallucinations.”"
              title="Causal Trace Matrix"
              subtitle="Mathematical provenance connecting root cause, business blast radius, and automated action."
            />
          </div>

          {/* Dovetail Verbatim Quotes & Evidence Explorer Spotlight */}
          <div
            style={{
              background: '#F8FAFC',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#4F46E5' }}>
                  DOVETAIL HIGHLIGHT REEL
                </span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0F172A', margin: '4px 0 0 0' }}>
                  Real customer voices from BuildBattle_2026_Customer_Feedback_Dataset.csv
                </h3>
              </div>
              <button
                onClick={() => onLaunchApp('dashboard')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  background: '#FFFFFF',
                  border: '1px solid #CBD5E1',
                  color: '#0F172A',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <span>View all 7,002 in Explorer</span>
                <ArrowRight size={14} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
              {[
                {
                  id: 'CF-1082',
                  tag: 'P0 Critical',
                  tagBg: '#FFF1F3',
                  tagColor: '#BE3455',
                  customer: 'Verified Buyer #9128',
                  channel: 'Mobile App · iOS 18.2',
                  quote: '“Payment went through my bank account but your checkout screen crashed and order status is still empty! Money is debited!”',
                  causality: 'Root Cause: 3DS webhook token timeout -> Action: Hotfix rollback payment SDK v2.3'
                },
                {
                  id: 'CF-2409',
                  tag: 'P1 High',
                  tagBg: '#FFFAEB',
                  tagColor: '#B77913',
                  customer: 'Merchant Partner #348',
                  channel: 'Seller Portal',
                  quote: '“A fake store copied our exact product listings and started selling counterfeit knockoffs. Reported 4 times with zero response.”',
                  causality: 'Root Cause: Seller onboarding KYC loophole -> Action: Freeze merchant gateway & review catalog'
                },
                {
                  id: 'CF-5192',
                  tag: 'P2 Moderate',
                  tagBg: '#EEF0FF',
                  tagColor: '#4F46E5',
                  customer: 'Loyalty Member #801',
                  channel: 'Customer Support Desk',
                  quote: '“Delivery was promised within 2 days. It has now been 6 days with no tracking updates since leaving the Bangalore warehouse hub.”',
                  causality: 'Root Cause: Regional 3PL sorting backlog -> Action: Push proactive SMS update & reroute freight'
                }
              ].map((item) => (
                <div
                  key={item.id}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '12px',
                    border: '1px solid #E2E8F0',
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    boxShadow: '0 2px 8px rgba(15, 23, 42, 0.03)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '11px', fontWeight: 700, color: '#64748B' }}>
                      {item.id} · {item.channel}
                    </span>
                    <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', background: item.tagBg, color: item.tagColor }}>
                      {item.tag}
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.55, color: '#1E293B', fontStyle: 'italic' }}>
                    {item.quote}
                  </p>
                  <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '10px', fontSize: '11px', color: '#4F46E5', fontWeight: 600 }}>
                    {item.causality}
                  </div>
                </div>
              ))}
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
      </ScrollReveal>

      {/* =========================================================================
          8. PRODUCT VALUE · EVIDENCE BEFORE ASSUMPTIONS (Figma Frame)
         ========================================================================= */}
      <ScrollReveal direction="up" distance={40}>
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
      </ScrollReveal>

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
      <ScrollReveal direction="up" distance={40}>
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
      </ScrollReveal>

      {/* =========================================================================
          11. STAGE THREE · ACCOUNT ACCESS CTA (Figma Frame: Stage three)
         ========================================================================= */}
      <ScrollReveal direction="scale" distance={30}>
        <section style={{ maxWidth: '1312px', margin: '0 auto', padding: '6rem 1.5rem', textAlign: 'center' }}>
        <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#4f46e5', marginBottom: '0.75rem', display: 'inline-block' }}>
          03 / FROM CLARITY TO ACTION
        </span>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '0 auto 1.25rem', maxWidth: '850px' }}>
          <h2 style={{ fontSize: '3.2rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.04em', lineHeight: 1.15, margin: 0 }}>
            <TextReveal>See what your feedback is really telling you.</TextReveal>
          </h2>
        </div>
        <p style={{ fontSize: '1.15rem', color: '#475569', maxWidth: '640px', margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
          Create your workspace, bring a dataset and start with a better question.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', alignItems: 'center' }}>
          <RainbowButton onClick={() => onLaunchApp('copilot')} style={{ padding: '0.9rem 2rem', fontSize: '1rem' }}>
            <span>Launch Platform</span>
            <ArrowRight size={16} />
          </RainbowButton>
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
      </ScrollReveal>

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
