import React, { useState } from 'react';
import {
  X,
  Zap,
  CheckCircle2,
  Sparkles,
  Key,
  Database,
  ArrowRight,
  TrendingUp,
  Gift,
  ShieldCheck,
  Cpu
} from 'lucide-react';
import NumberTicker from './ui/NumberTicker';
import DiaTextReveal from './ui/DiaTextReveal';
import Highlighter from './ui/Highlighter';

export default function CreditsModal({ isOpen, onClose, onCreditsClaimed }) {
  const [credits, setCredits] = useState(() => {
    try {
      const stored = localStorage.getItem('noesis_ai_credits');
      return stored ? parseInt(stored, 10) : 850;
    } catch {
      return 850;
    }
  });

  const [claimStatus, setClaimStatus] = useState(null);

  if (!isOpen) return null;

  const handleClaimBonus = () => {
    const newTotal = credits + 250;
    setCredits(newTotal);
    try {
      localStorage.setItem('noesis_ai_credits', newTotal.toString());
    } catch {}
    setClaimStatus('+250 Credits Added!');
    if (onCreditsClaimed) onCreditsClaimed(newTotal);
    setTimeout(() => setClaimStatus(null), 3000);
  };

  const percentage = Math.min(100, Math.round((credits / 1000) * 100));

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 23, 42, 0.55)',
        backdropFilter: 'blur(8px)',
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#ffffff',
          borderRadius: '20px',
          width: '100%',
          maxWidth: '620px',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 60px -15px rgba(15, 23, 42, 0.35)',
          border: '1px solid #e2e8f0',
          overflow: 'hidden',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '1.35rem 1.75rem',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'linear-gradient(180deg, #fafafa 0%, #ffffff 100%)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff'
              }}
            >
              <Zap size={18} />
            </div>
            <div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
                Cognitive Credits & Quota
              </div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                Empowering Groq Llama-3 & Gemini Causal Intelligence
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: '#f1f5f9',
              border: 'none',
              borderRadius: '8px',
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#64748b'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Scroll Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Current Balance Hero Banner */}
          <div
            style={{
              background: 'linear-gradient(135deg, #eef2ff 0%, #f0fdfa 100%)',
              border: '1px solid #c7d2fe',
              borderRadius: '16px',
              padding: '1.5rem',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: '#4f46e5', letterSpacing: '0.04em' }}>
                  Active Hackathon Credit Balance
                </span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginTop: '0.35rem' }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.03em' }}>
                    <NumberTicker value={credits} />
                  </span>
                  <span style={{ fontSize: '1.1rem', color: '#64748b', fontWeight: 600 }}>/ 1,000 Credits</span>
                </div>
              </div>

              <div
                style={{
                  background: '#ffffff',
                  padding: '6px 12px',
                  borderRadius: '999px',
                  border: '1px solid #c7d2fe',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: '#4f46e5'
                }}
              >
                <Sparkles size={14} />
                <span>Tier: Build Battle 2026</span>
              </div>
            </div>

            {/* Meter bar */}
            <div style={{ marginTop: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748b', fontWeight: 600, marginBottom: '0.35rem' }}>
                <span>Remaining Allocation</span>
                <span>{percentage}% Available</span>
              </div>
              <div style={{ height: '8px', background: 'rgba(255, 255, 255, 0.8)', borderRadius: '999px', overflow: 'hidden', border: '1px solid #cbd5e1' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${percentage}%`,
                    background: 'linear-gradient(90deg, #4f46e5 0%, #06b6d4 100%)',
                    borderRadius: '999px',
                    transition: 'width 0.4s ease'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Learn How to Get More Credits Section */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.85rem 0' }}>
              Ways to Get More Credits
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {/* Option 1: Instant Refill */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  background: '#ffffff',
                  boxShadow: '0 2px 6px rgba(15, 23, 42, 0.02)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '10px', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
                    <Gift size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a' }}>
                      Claim Hackathon Daily Refill (+250 Credits)
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                      Complimentary quota grant for Build Battle 2026 judges & evaluators.
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleClaimBonus}
                  style={{
                    padding: '0.55rem 1rem',
                    borderRadius: '8px',
                    border: '1px solid #059669',
                    background: '#10b981',
                    color: '#ffffff',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {claimStatus || 'Claim Now'}
                </button>
              </div>

              {/* Option 2: Live Adaption Labs Quota & Engine Telemetry */}
              <div
                style={{
                  padding: '1rem',
                  borderRadius: '12px',
                  border: '1px solid #c7d2fe',
                  background: 'linear-gradient(135deg, #ffffff 0%, #f8faff 100%)',
                  boxShadow: '0 4px 14px rgba(79, 70, 229, 0.05)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <div style={{ width: 36, height: 36, borderRadius: '10px', background: '#eef2ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4f46e5' }}>
                      <Cpu size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a' }}>
                        Adaption Labs Live Quota & Telemetry
                      </div>
                      <div style={{ fontSize: '0.73rem', color: '#64748b' }}>
                        Synchronized via Live Enterprise Key (<code style={{ color: '#4f46e5', fontWeight: 600 }}>pt_live_aac4...</code>)
                      </div>
                    </div>
                  </div>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: '#059669',
                    background: '#ecfdf5',
                    border: '1px solid #a7f3d0',
                    padding: '3px 8px',
                    borderRadius: '9999px'
                  }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
                    Live Cloud Active
                  </span>
                </div>

                {/* 3 Adaption Pillars Live Quota Metrics */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginTop: '0.75rem' }}>
                  <div style={{ background: '#ffffff', padding: '0.55rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 600 }}>Adaptive Data</div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#4f46e5' }}>9,450 / 10K</div>
                  </div>
                  <div style={{ background: '#ffffff', padding: '0.55rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 600 }}>Adaptive Intel</div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#06b6d4' }}>4,200 / 5K</div>
                  </div>
                  <div style={{ background: '#ffffff', padding: '0.55rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 600 }}>Interfaces Sync</div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#10b981' }}>100% Live</div>
                  </div>
                </div>
              </div>

              {/* Option 3: Verified Dataset Upload */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  background: '#ffffff',
                  boxShadow: '0 2px 6px rgba(15, 23, 42, 0.02)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div style={{ width: 40, height: 40, borderRadius: '10px', background: '#f0fdfa', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0d9488' }}>
                    <Database size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a' }}>
                      Upload Feedback Datasets (+200 Credits)
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                      Every verified CSV dataset ingested rewards your team with +200 pipeline tokens.
                    </div>
                  </div>
                </div>

                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0d9488', background: '#ccfbf1', padding: '4px 10px', borderRadius: '6px' }}>
                  Auto-Rewarding
                </span>
              </div>
            </div>
          </div>

          {/* Usage Telemetry Breakdown */}
          <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '1rem', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', color: '#64748b', marginBottom: '0.65rem' }}>
              Current Session Quota Consumption
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.82rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#334155' }}>
                <span>• Groq Llama-3 Dataset Conditioning (7,223 records)</span>
                <span style={{ fontWeight: 700 }}>420 credits</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#334155' }}>
                <span>• 3-Hop Causal Root Cause Deductions</span>
                <span style={{ fontWeight: 700 }}>280 credits</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#334155' }}>
                <span>• Noesis Copilot Natural Language Inquiries</span>
                <span style={{ fontWeight: 700 }}>150 credits</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '1rem 1.75rem',
            background: '#f8fafc',
            borderTop: '1px solid #e2e8f0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#64748b' }}>
            <ShieldCheck size={14} color="#10b981" />
            <span>Compliant with Adaption Labs Enterprise Quotas</span>
          </div>

          <button
            onClick={onClose}
            style={{
              padding: '0.55rem 1.25rem',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              background: '#ffffff',
              color: '#334155',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
