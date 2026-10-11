import React from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Cpu,
  Target,
  Layers,
  CheckCircle2,
  TrendingUp,
  BarChart2,
  Zap,
  Users,
  Lock,
  ExternalLink
} from 'lucide-react';
import NoesisLogo from './NoesisLogo';
import AdaptionCopilot from './AdaptionCopilot';

export default function LandingPage({ onLaunchApp, onOpenAuth, apiBase = '' }) {
  return (
    <div style={{ background: '#f8fafc', color: '#0f172a', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      {/* Top Navigation */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid #e2e8f0',
          padding: '0.9rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <NoesisLogo height={36} showTagline={true} />
          <nav style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem', fontWeight: 500, color: '#475569' }}>
            <a href="#problem" style={{ textDecoration: 'none', color: 'inherit' }}>The Problem</a>
            <a href="#pillars" style={{ textDecoration: 'none', color: 'inherit' }}>3 Adaption Pillars</a>
            <a href="#copilot" style={{ textDecoration: 'none', color: 'inherit' }}>Live AI Copilot</a>
            <a href="#personas" style={{ textDecoration: 'none', color: 'inherit' }}>Persona Workspace</a>
          </nav>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button onClick={onOpenAuth} className="btn btn-secondary" style={{ fontSize: '0.82rem', padding: '0.45rem 0.9rem' }}>
            Sign In / Roles
          </button>
          <button onClick={() => onLaunchApp('executive')} className="btn btn-primary" style={{ fontSize: '0.82rem', padding: '0.45rem 1rem' }}>
            <span>Launch Platform</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '4.5rem 1.5rem 3rem', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#eef2ff', border: '1px solid #c7d2fe', padding: '0.35rem 0.85rem', borderRadius: '9999px', fontSize: '0.78rem', fontWeight: 700, color: '#4f46e5', marginBottom: '1.5rem' }}>
          <Sparkles size={14} />
          <span>Build Battle 2026 Frontend Arena • Powered by Adaption Labs & Supabase</span>
        </div>

        <h1
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '3.6rem',
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            color: '#0f172a',
            maxWidth: '960px',
            margin: '0 auto 1.25rem'
          }}
        >
          How Humans Think. <br />
          <span style={{ background: 'linear-gradient(135deg, #4f46e5, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            How Decisions Should Be Made.
          </span>
        </h1>

        <p style={{ fontSize: '1.15rem', color: '#475569', maxWidth: '780px', margin: '0 auto 2.25rem', lineHeight: 1.6 }}>
          Transforming <strong>7,002 chaotic customer reviews</strong> into prioritized, high-conviction executive actions. 
          Built on Adaption Labs' 3 Pillars: <strong>Adaptive Data</strong>, <strong>Adaptive Intelligence</strong>, and <strong>Adaptive Interfaces</strong>.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3.5rem' }}>
          <button
            onClick={() => onLaunchApp('executive')}
            className="btn btn-primary"
            style={{ padding: '0.85rem 1.75rem', fontSize: '0.95rem', fontWeight: 600, boxShadow: '0 10px 25px -5px rgba(79, 70, 229, 0.3)' }}
          >
            <span>Enter Executive Workspace</span>
            <ArrowRight size={16} />
          </button>
          <a
            href="#copilot"
            className="btn btn-secondary"
            style={{ padding: '0.85rem 1.5rem', fontSize: '0.95rem', textDecoration: 'none', color: '#0f172a' }}
          >
            Test Live Adaption Copilot ↓
          </a>
        </div>

        {/* Live Metrics Stat Bar */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1rem',
            background: '#ffffff',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '1.5rem',
            boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.04)'
          }}
        >
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Ingested Touchpoints</div>
            <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#0f172a', marginTop: '0.25rem' }}>7,002</div>
            <div style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 600, marginTop: '0.15rem' }}>4 Multi-Channel Sources</div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Annual Revenue at Risk</div>
            <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#4f46e5', marginTop: '0.25rem' }}>$305,000</div>
            <div style={{ fontSize: '0.72rem', color: '#6366f1', fontWeight: 600, marginTop: '0.15rem' }}>Protected via Escrow Triage</div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Adaption Quality Uplift</div>
            <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#7c3aed', marginTop: '0.25rem' }}>9.4 / 10</div>
            <div style={{ fontSize: '0.72rem', color: '#8b5cf6', fontWeight: 600, marginTop: '0.15rem' }}>Grade A+ Verified (+38.2%)</div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Perception Latency</div>
            <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#10b981', marginTop: '0.25rem' }}>14 ms</div>
            <div style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 600, marginTop: '0.15rem' }}>Realtime Cloud Stream</div>
          </div>
        </div>
      </section>

      {/* The Problem: Severity Blindness */}
      <section id="problem" style={{ maxWidth: '1200px', margin: '4rem auto', padding: '0 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="badge badge-warning" style={{ marginBottom: '0.5rem' }}>The Core Problem</span>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
            Why Traditional Analytics Fails: Severity Blindness
          </h2>
          <p style={{ color: '#64748b', maxWidth: '640px', margin: '0.5rem auto 0', fontSize: '0.95rem' }}>
            Naive tools count volume. But in human cognition, a single critical incident can outweigh 500 minor cosmetic gripes.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          {/* Traditional Analytics */}
          <div style={{ background: '#ffffff', border: '1px solid #fed7aa', borderRadius: '14px', padding: '2rem', borderTop: '4px solid #f97316' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#ea580c', textTransform: 'uppercase' }}>
              ❌ Traditional Feedback Dashboard
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0.5rem 0 1rem' }}>
              Volume Counting ("Noise Dominance")
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Ranks "UI button color" #1 priority because 3,140 users commented on it, while 548 victims of seller fraud are buried in page 40.
            </p>
            <div style={{ background: '#fff7ed', padding: '1rem', borderRadius: '8px', border: '1px solid #ffedd5', fontSize: '0.82rem', color: '#9a3412' }}>
              <strong>Business Consequence:</strong> Engineering wastes sprints on low-impact redesigns while fraud chargebacks destroy brand reputation.
            </div>
          </div>

          {/* NOESIS + Adaption */}
          <div style={{ background: '#ffffff', border: '1px solid #c7d2fe', borderRadius: '14px', padding: '2rem', borderTop: '4px solid #4f46e5' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#4f46e5', textTransform: 'uppercase' }}>
              ✓ NOESIS Cognitive Decision Engine
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0.5rem 0 1rem' }}>
              Cognitive Financial Translation
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Applies human intuition & LTV churn modeling. Recognizes that 548 fraud complaints carry an 84% defection rate ($184k loss) and triggers immediate P0 escrow holds.
            </p>
            <div style={{ background: '#eef2ff', padding: '1rem', borderRadius: '8px', border: '1px solid #e0e7ff', fontSize: '0.82rem', color: '#3730a3' }}>
              <strong>Business Consequence:</strong> Protects $305,000 in annual churn risk with automated seller verification directives.
            </div>
          </div>
        </div>
      </section>

      {/* The 3 Pillars Bento Grid */}
      <section id="pillars" style={{ maxWidth: '1200px', margin: '5rem auto', padding: '0 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="badge badge-primary" style={{ marginBottom: '0.5rem' }}>Adaption Labs Integration</span>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
            The 3 Pillars of Adaption Labs in Action
          </h2>
          <p style={{ color: '#64748b', maxWidth: '640px', margin: '0.5rem auto 0', fontSize: '0.95rem' }}>
            How NOESIS leverages the official Adaption SDK across data conditioning, inference-time reasoning, and UI morphing.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          {/* Pillar 1 */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ width: 40, height: 40, borderRadius: '10px', background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Cpu size={20} color="#4f46e5" />
            </div>
            <span className="badge badge-neutral" style={{ alignSelf: 'flex-start' }}>Pillar 1</span>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Adaptive Data</h3>
            <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.55 }}>
              Treats the dataset as a living asset. Executes 4 dynamic recipes: <strong>Deduplication</strong> (14.2% noise sanitized), <strong>Emotional Normalization</strong>, <strong>Reasoning Traces</strong>, and <strong>Brand Blueprints</strong>.
            </p>
            <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid #f1f5f9', fontSize: '0.78rem', color: '#4f46e5', fontWeight: 600 }}>
              Precision Lift: 6.8 → 9.4 (Grade A+)
            </div>
          </div>

          {/* Pillar 2 */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ width: 40, height: 40, borderRadius: '10px', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Target size={20} color="#059669" />
            </div>
            <span className="badge badge-success" style={{ alignSelf: 'flex-start' }}>Pillar 2</span>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Adaptive Intelligence</h3>
            <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.55 }}>
              Inference-time cognitive reasoning without expensive retraining. Solves severity blindness with a <strong>2D Priority Decision Matrix</strong> that calculates real-time revenue exposure.
            </p>
            <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid #f1f5f9', fontSize: '0.78rem', color: '#059669', fontWeight: 600 }}>
              Formula: Volume × Severity Churn × ARPU
            </div>
          </div>

          {/* Pillar 3 */}
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ width: 40, height: 40, borderRadius: '10px', background: '#fdf2f8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Layers size={20} color="#db2777" />
            </div>
            <span className="badge badge-danger" style={{ alignSelf: 'flex-start' }}>Pillar 3</span>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Adaptive Interfaces</h3>
            <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.55 }}>
              Reimagines human-AI interaction. Dynamic persona switcher transforms layout, metrics, and inspection drawers tailored to <strong>C-Suite</strong>, <strong>Support Leads</strong>, and <strong>Fraud Forensics</strong>.
            </p>
            <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid #f1f5f9', fontSize: '0.78rem', color: '#db2777', fontWeight: 600 }}>
              Zero-Friction Persona Morphing
            </div>
          </div>
        </div>
      </section>

      {/* Live Adaption Copilot Section (Replicating user's screenshot!) */}
      <section id="copilot" style={{ maxWidth: '1000px', margin: '5rem auto', padding: '0 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#ecfdf5', color: '#059669', border: '1px solid #a7f3d0', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            <Sparkles size={13} />
            <span>Interactive Adaption AI Visualizer (Live API)</span>
          </div>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
            Experience the Official Adaption Interface
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.95rem', maxWidth: '640px', margin: '0.4rem auto 0' }}>
            Click any query chip below or ask in natural language to watch Adaption synthesize insights and generate charts from the 7,002 reviews in real-time.
          </p>
        </div>

        {/* Embedded Live Copilot */}
        <AdaptionCopilot apiBase={apiBase} />
      </section>

      {/* Persona Gateways (Choose Your Lens) */}
      <section id="personas" style={{ maxWidth: '1200px', margin: '5rem auto', padding: '0 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="badge badge-neutral" style={{ marginBottom: '0.5rem' }}>Adaptive Onboarding</span>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
            Choose Your Operational Lens
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
            Select a role to experience how NOESIS morphs its workspace for different enterprise stakeholders.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          {/* Executive Lens */}
          <div
            onClick={() => onLaunchApp('executive')}
            style={{
              background: '#ffffff',
              border: '2px solid #c7d2fe',
              borderRadius: '16px',
              padding: '2rem',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 20px -2px rgba(79, 70, 229, 0.08)'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = '#4f46e5'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = '#c7d2fe'; }}
          >
            <div>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>👔</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>Executive C-Suite</h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.4rem', lineHeight: 1.5 }}>
                Financial Downside Protection, CSAT Benchmark Gauges (74.8%), and 1-Click Board PDF Briefing exports.
              </p>
              <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.78rem', color: '#334155' }}>
                <div>✓ Primary Metric: $305,000 Churn Risk</div>
                <div>✓ Strategic Priority Decision Quadrant</div>
              </div>
            </div>
            <button className="btn btn-primary" style={{ marginTop: '1.5rem', width: '100%', justifyContent: 'center' }}>
              <span>Enter as Executive</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Support Ops Lens */}
          <div
            onClick={() => onLaunchApp('support')}
            style={{
              background: '#ffffff',
              border: '1.5px solid #e2e8f0',
              borderRadius: '16px',
              padding: '2rem',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = '#0284c7'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = '#e2e8f0'; }}
          >
            <div>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🎧</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>Support Ops Lead</h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.4rem', lineHeight: 1.5 }}>
                Queue Latency Analytics, SLA Breach Countdowns, and AI-Assisted Agent Response Generation.
              </p>
              <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.78rem', color: '#334155' }}>
                <div>✓ Primary Metric: 438 Escalations</div>
                <div>✓ Ticket Deflection & SLA Workflows</div>
              </div>
            </div>
            <button className="btn btn-secondary" style={{ marginTop: '1.5rem', width: '100%', justifyContent: 'center' }}>
              <span>Enter as Support Lead</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Trust & Safety Lens */}
          <div
            onClick={() => onLaunchApp('trust_safety')}
            style={{
              background: '#ffffff',
              border: '1.5px solid #e2e8f0',
              borderRadius: '16px',
              padding: '2rem',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = '#dc2626'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = '#e2e8f0'; }}
          >
            <div>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🛡️</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>Trust & Safety Forensics</h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.4rem', lineHeight: 1.5 }}>
                1,120 Fraud Attack Vectors, Off-Platform Payment Rings, Counterfeit Detection, and Instant Seller Account Freezes.
              </p>
              <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.78rem', color: '#334155' }}>
                <div>✓ Primary Metric: 32 Active Fraud Rings</div>
                <div>✓ Instant Seller Escrow Hold Dispatches</div>
              </div>
            </div>
            <button className="btn btn-secondary" style={{ marginTop: '1.5rem', width: '100%', justifyContent: 'center' }}>
              <span>Enter as Fraud Forensics</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #e2e8f0', background: '#ffffff', padding: '3rem 2rem', marginTop: '5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <NoesisLogo height={32} showTagline={true} />
            <p style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.5rem' }}>
              Build Battle 2026 Individual AI × Web Dev Hackathon &bull; Adaption Labs Integration
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: '#64748b' }}>
            <span>Supabase Cloud PostgreSQL</span>
            <span>&bull;</span>
            <span>FastAPI Python Engine</span>
            <span>&bull;</span>
            <span>Stitch Design System</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
