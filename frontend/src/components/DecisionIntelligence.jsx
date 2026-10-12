import React, { useState, useEffect } from 'react';
import {
  Target,
  Zap,
  ArrowRight,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Sparkles,
  Layers,
  ChevronRight,
  Send,
  RefreshCw,
  Search,
  Filter,
  Check,
  Cpu,
  TrendingDown,
  Activity,
  FileCheck,
  AlertCircle
} from 'lucide-react';
import { createIssueInCloud } from '../supabase';
import IsometricCubes from './ui/IsometricCubes';
import NumberTicker from './ui/NumberTicker';
import Highlighter from './ui/Highlighter';
import DiaTextReveal from './ui/DiaTextReveal';

// Default edge cases & inspected feedbacks for Decision Intelligence triage
const DEFAULT_TRIAGE_ITEMS = [
  {
    id: 'EDG-801',
    customer: 'Enterprise Tenant #4412',
    timestamp: '12 mins ago',
    category: 'Fraud and Scam',
    severity: 'P0 Critical',
    ambiguityScore: 94,
    status: 'Pending Review',
    feedbackText: "Our escrow payout triggered without seller identity verification. We attempted to freeze the seller wallet, but API returned 403 authorization error while funds cleared to an unverified third-party account.",
    rootCause: "Unverified Merchant Bypass: Escrow API webhook lacked secondary KYC verification gate during automated batch payout windows.",
    impact: "$184,000 direct chargeback liability; 42% escalation in merchant fraud reports across tier-1 sellers.",
    recommendedAction: "Quarantine flagged merchant payout gateway, inject synchronous KYC re-check, and freeze stalled escrow transactions.",
    priority: 'Critical',
    assignedTeam: 'Trust & Safety',
    confidence: '98.4%',
    autoRouted: false
  },
  {
    id: 'EDG-802',
    customer: 'Logistics Partner #902',
    timestamp: '34 mins ago',
    category: 'Operational Issues',
    severity: 'P1 High',
    ambiguityScore: 88,
    status: 'Pending Review',
    feedbackText: "Carrier tracking webhook dropped 1,200 sync payloads during peak hour promotion. Customers are calling support because tracking links show 'Package Not Found' even though packages are in transit.",
    rootCause: "Carrier Webhook Ingestion Timeout: 3PL webhook buffer overflowed under burst concurrency (>2,000 req/sec).",
    impact: "Support ticket queue backlog surged by 380%; customer CSAT dropped by 1.8 points in 4 hours.",
    recommendedAction: "Deploy proactive SMS dispatch with estimated transit times; scale Redis ingress worker queue.",
    priority: 'High',
    assignedTeam: 'Logistics Engineering',
    confidence: '92.1%',
    autoRouted: false
  },
  {
    id: 'EDG-803',
    customer: 'Retail Buyer #10892',
    timestamp: '1 hour ago',
    category: 'Customer Service',
    severity: 'P1 High',
    ambiguityScore: 79,
    status: 'Pending Review',
    feedbackText: "Live chat agent promised full refund within 2 hours, but support bot auto-closed the ticket as 'Resolved' before financial reconciliation completed. Now customer bank is filing dispute.",
    rootCause: "SLA Collision: Auto-close workflow on bot closure triggered prematurely before refund transaction ID emitted.",
    impact: "Unnecessary $25 dispute fee per ticket; recurring user churn probability evaluated at 78%.",
    recommendedAction: "Enforce payment gateway callback validation before permitting ticket auto-closure; notify Tier-2 supervisor.",
    priority: 'High',
    assignedTeam: 'Support Operations',
    confidence: '89.6%',
    autoRouted: false
  },
  {
    id: 'EDG-804',
    customer: 'Payment Gateway #310',
    timestamp: '2 hours ago',
    category: 'Product & System',
    severity: 'P2 Medium',
    ambiguityScore: 71,
    status: 'Pending Review',
    feedbackText: "Users in regional districts report biometric fingerprint auth failing on checkout for Android 14 builds. They fall back to SMS OTP which delays checkout by 45 seconds.",
    rootCause: "Android 14 Keystore Compatibility: BiometricPrompt cryptographic cipher mismatch on specific vendor chipsets.",
    impact: "Cart abandonment increased by 14% on Android devices in selected geographical regions.",
    recommendedAction: "Roll out hotfix patch for biometric crypto wrapper; grant grace period for 1-click fallback OTP.",
    priority: 'Medium',
    assignedTeam: 'Mobile Platform',
    confidence: '86.0%',
    autoRouted: false
  }
];

export default function DecisionIntelligence({ apiBase = '', onDispatchIssue, onIssueCreated }) {
  const [triageItems, setTriageItems] = useState(DEFAULT_TRIAGE_ITEMS);
  const [selectedItem, setSelectedItem] = useState(DEFAULT_TRIAGE_ITEMS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isDispatching, setIsDispatching] = useState(false);
  const [dispatchSuccess, setDispatchSuccess] = useState(null);
  const [activeHop, setActiveHop] = useState(0); // 0 = Root Cause, 1 = Impact, 2 = Action
  const [autoTriageCount, setAutoTriageCount] = useState(14); // P0 items already routed automatically

  // Auto cycle active hop animation every 3.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHop((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Filtered queue items
  const filteredItems = triageItems.filter((item) => {
    const matchesSearch = item.feedbackText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.rootCause.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  // Dispatch item to Issue Tracker
  const handleDispatch = async () => {
    if (!selectedItem) return;
    setIsDispatching(true);
    setDispatchSuccess(null);

    try {
      const newIssue = {
        id: `ISS-${Date.now().toString().slice(-4)}`,
        title: selectedItem.recommendedAction,
        category: selectedItem.category,
        priority: selectedItem.priority,
        status: 'Open',
        impact: selectedItem.impact,
        assigned_to: selectedItem.assignedTeam,
        description: `[Dispatched via Decision Intelligence]\n\nFeedback: ${selectedItem.feedbackText}\n\nRoot Cause: ${selectedItem.rootCause}\n\nAction: ${selectedItem.recommendedAction}`,
        created_at: new Date().toISOString()
      };

      // Call Supabase cloud persistence
      await createIssueInCloud(newIssue);

      // Notify parent app if callback provided
      if (onDispatchIssue) {
        onDispatchIssue(newIssue);
      }
      if (onIssueCreated) {
        onIssueCreated(newIssue);
      }

      // Mark this triage item as dispatched
      setTriageItems((prev) =>
        prev.map((it) => (it.id === selectedItem.id ? { ...it, status: 'Dispatched to Tracker' } : it))
      );

      setDispatchSuccess(`Successfully dispatched ${selectedItem.id} as Ticket #${newIssue.id}`);
      setTimeout(() => setDispatchSuccess(null), 5000);
    } catch (err) {
      console.error('Failed to dispatch issue:', err);
    } finally {
      setIsDispatching(false);
    }
  };

  const handleDismiss = (id) => {
    setTriageItems((prev) => prev.filter((it) => it.id !== id));
    if (selectedItem?.id === id) {
      const remaining = triageItems.filter((it) => it.id !== id);
      setSelectedItem(remaining[0] || null);
    }
  };

  return (
    <div style={{ width: '100%', minHeight: 'calc(100vh - 68px)', background: '#f8fafc', color: '#0f172a' }}>
      {/* Top Autonomous HUD Banner */}
      <div
        style={{
          background: '#ffffff',
          borderBottom: '1px solid #e2e8f0',
          padding: '1.25rem 2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '8px',
                background: 'rgba(79, 70, 229, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#4f46e5'
              }}
            >
              <Target size={18} />
            </div>
            <DiaTextReveal
              text="Autonomous Decision Intelligence"
              colors={["#4F46E5", "#06B6D4", "#6366F1", "#10B981"]}
              className="text-xl font-extrabold tracking-tight"
            />
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                background: 'rgba(16, 185, 129, 0.1)',
                color: '#059669',
                padding: '0.2rem 0.6rem',
                borderRadius: '999px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} />
              Autonomous Engine Active
            </span>
          </div>
          <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.85rem', color: '#64748b' }}>
            <Highlighter action="underline" color="#4F46E5">
              Adaption Conditioning Engine
            </Highlighter>{' '}
            continuously routes high-severity P0 items to the Issue Tracker. Ambiguous edge cases arrive here for{' '}
            <Highlighter action="highlight" color="#c7d2fe">
              3-hop causal triage
            </Highlighter>.
          </p>
        </div>

        {/* Live Telemetry Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <div
            style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '0.5rem 0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <Zap size={15} color="#4f46e5" />
            <div>
              <div style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 600 }}>P0 Auto-Routed</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a' }}>
                <NumberTicker value={autoTriageCount} suffix=" Tickets" />
              </div>
            </div>
          </div>

          <div
            style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '0.5rem 0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <ShieldAlert size={15} color="#f59e0b" />
            <div>
              <div style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 600 }}>In Review Queue</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a' }}>
                <NumberTicker value={triageItems.length} suffix=" Edge Cases" />
              </div>
            </div>
          </div>

          <div
            style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '0.5rem 0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <TrendingDown size={15} color="#10b981" />
            <div>
              <div style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 600 }}>Risk Mitigated</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#059669' }}>
                <NumberTicker value={305} prefix="$" suffix=",000" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Split Layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '380px 1fr',
          gap: '1.5rem',
          padding: '1.5rem 2rem',
          maxWidth: '1600px',
          margin: '0 auto'
        }}
      >
        {/* Left Column: Triage Queue */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Search & Filter Bar */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              padding: '1rem',
              boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)'
            }}
          >
            <div style={{ position: 'relative', marginBottom: '0.75rem' }}>
              <Search
                size={16}
                color="#94a3b8"
                style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }}
              />
              <input
                type="text"
                placeholder="Search edge cases, text, root cause..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.55rem 0.85rem 0.55rem 2.4rem',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.82rem',
                  outline: 'none',
                  background: '#f8fafc',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* Category Filter Pills */}
            <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '0.2rem' }}>
              {['All', 'Fraud and Scam', 'Operational Issues', 'Customer Service', 'Product & System'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: '0.3rem 0.65rem',
                    borderRadius: '6px',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    border: 'none',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    background: selectedCategory === cat ? '#4f46e5' : '#f1f5f9',
                    color: selectedCategory === cat ? '#ffffff' : '#64748b'
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Queue Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Pending Decision Queue ({filteredItems.length})
            </div>

            {filteredItems.map((item) => {
              const isSelected = selectedItem?.id === item.id;
              const isDispatched = item.status === 'Dispatched to Tracker';

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  style={{
                    background: isSelected ? '#ffffff' : '#ffffff',
                    borderRadius: '12px',
                    border: isSelected ? '2px solid #4f46e5' : '1px solid #e2e8f0',
                    padding: '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    boxShadow: isSelected ? '0 4px 12px rgba(79, 70, 229, 0.08)' : '0 1px 3px rgba(15, 23, 42, 0.02)',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#4f46e5' }}>{item.id}</span>
                      <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>• {item.timestamp}</span>
                    </div>
                    <span
                      style={{
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        padding: '0.2rem 0.5rem',
                        borderRadius: '4px',
                        background: item.severity === 'P0 Critical' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                        color: item.severity === 'P0 Critical' ? '#dc2626' : '#d97706'
                      }}
                    >
                      {item.severity}
                    </span>
                  </div>

                  <p
                    style={{
                      margin: '0 0 0.6rem 0',
                      fontSize: '0.8rem',
                      lineHeight: '1.4',
                      color: '#334155',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    "{item.feedbackText}"
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.72rem' }}>
                    <span style={{ color: '#64748b', fontWeight: 600 }}>{item.category}</span>
                    {isDispatched ? (
                      <span style={{ color: '#059669', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Check size={12} /> Dispatched
                      </span>
                    ) : (
                      <span style={{ color: '#4f46e5', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                        Inspect Causal Trace <ChevronRight size={13} />
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

            {filteredItems.length === 0 && (
              <div
                style={{
                  background: '#ffffff',
                  borderRadius: '12px',
                  border: '1px dashed #cbd5e1',
                  padding: '2.5rem 1rem',
                  textAlign: 'center',
                  color: '#94a3b8'
                }}
              >
                <CheckCircle2 size={32} color="#10b981" style={{ margin: '0 auto 0.5rem' }} />
                <div style={{ fontWeight: 700, color: '#334155' }}>Queue Cleared</div>
                <div style={{ fontSize: '0.8rem' }}>No pending edge cases matching your filter.</div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: 3-Hop Causal Trace & Dispatch Suite */}
        {selectedItem ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Feedback Detail Card */}
            <div
              style={{
                background: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                padding: '1.5rem',
                boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: '10px',
                      background: 'rgba(79, 70, 229, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#4f46e5'
                    }}
                  >
                    <Cpu size={22} />
                  </div>
                  <div>
                    <h2 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>
                      Causal Inspection: {selectedItem.id}
                    </h2>
                    <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                      Source: {selectedItem.customer} • Category: {selectedItem.category} • Confidence: {selectedItem.confidence}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      background: '#f1f5f9',
                      color: '#475569',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '6px'
                    }}
                  >
                    Ambiguity Score: {selectedItem.ambiguityScore}/100
                  </span>
                </div>
              </div>

              {/* Raw Feedback Card */}
              <div
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  padding: '1.15rem',
                  fontSize: '0.9rem',
                  color: '#1e293b',
                  lineHeight: '1.5',
                  fontStyle: 'italic',
                  borderLeft: '4px solid #4f46e5'
                }}
              >
                "{selectedItem.feedbackText}"
              </div>
            </div>

            {/* Visual 3-Hop Causal Trace */}
            <div
              style={{
                background: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                padding: '1.75rem',
                boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div style={{ width: 44, height: 44, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <IsometricCubes scale={0.36} />
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>
                      3-Hop Causal Trace (Root Cause → Impact → Action)
                    </h3>
                    <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                      Autonomous causal chain deduction across multi-source operational telemetry
                    </div>
                  </div>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#4f46e5', fontWeight: 700, background: '#eef2ff', padding: '4px 10px', borderRadius: '6px' }}>
                  Adaption Cognitive Synthesis
                </div>
              </div>

              {/* 3-Hop Timeline Graph */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '1.25rem',
                  position: 'relative'
                }}
              >
                {/* Hop 1: Root Cause */}
                <div
                  style={{
                    background: activeHop === 0 ? 'rgba(239, 68, 68, 0.04)' : '#f8fafc',
                    border: activeHop === 0 ? '2px solid #ef4444' : '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '1.25rem',
                    transition: 'all 0.3s ease',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.65rem' }}>
                    <div
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        background: '#ef4444',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                        fontWeight: 800
                      }}
                    >
                      1
                    </div>
                    <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', color: '#ef4444', letterSpacing: '0.05em' }}>
                      Hop 1: Root Cause
                    </span>
                  </div>
                  <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.88rem', fontWeight: 700, color: '#0f172a', lineHeight: '1.3' }}>
                    Structural Mechanism
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.82rem', color: '#475569', lineHeight: '1.45' }}>
                    {selectedItem.rootCause}
                  </p>
                </div>

                {/* Hop 2: Business Impact */}
                <div
                  style={{
                    background: activeHop === 1 ? 'rgba(245, 158, 11, 0.04)' : '#f8fafc',
                    border: activeHop === 1 ? '2px solid #f59e0b' : '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '1.25rem',
                    transition: 'all 0.3s ease',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.65rem' }}>
                    <div
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        background: '#f59e0b',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                        fontWeight: 800
                      }}
                    >
                      2
                    </div>
                    <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', color: '#f59e0b', letterSpacing: '0.05em' }}>
                      Hop 2: Blast Radius
                    </span>
                  </div>
                  <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.88rem', fontWeight: 700, color: '#0f172a', lineHeight: '1.3' }}>
                    Quantified Liability
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.82rem', color: '#475569', lineHeight: '1.45' }}>
                    {selectedItem.impact}
                  </p>
                </div>

                {/* Hop 3: Recommended Action */}
                <div
                  style={{
                    background: activeHop === 2 ? 'rgba(79, 70, 229, 0.04)' : '#f8fafc',
                    border: activeHop === 2 ? '2px solid #4f46e5' : '1px solid #e2e8f0',
                    borderRadius: '12px',
                    padding: '1.25rem',
                    transition: 'all 0.3s ease',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.65rem' }}>
                    <div
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        background: '#4f46e5',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                        fontWeight: 800
                      }}
                    >
                      3
                    </div>
                    <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', color: '#4f46e5', letterSpacing: '0.05em' }}>
                      Hop 3: Action Step
                    </span>
                  </div>
                  <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.88rem', fontWeight: 700, color: '#0f172a', lineHeight: '1.3' }}>
                    Remediation Plan
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.82rem', color: '#475569', lineHeight: '1.45' }}>
                    {selectedItem.recommendedAction}
                  </p>
                </div>
              </div>

              {/* Success Notification */}
              {dispatchSuccess && (
                <div
                  style={{
                    marginTop: '1.25rem',
                    background: 'rgba(16, 185, 129, 0.1)',
                    border: '1px solid #10b981',
                    borderRadius: '8px',
                    padding: '0.85rem 1.25rem',
                    color: '#065f46',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <CheckCircle2 size={18} color="#059669" />
                  {dispatchSuccess}
                </div>
              )}

              {/* Action Bar with Prominent Dispatch CTA */}
              <div
                style={{
                  marginTop: '1.75rem',
                  paddingTop: '1.5rem',
                  borderTop: '1px solid #f1f5f9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button
                    onClick={() => handleDismiss(selectedItem.id)}
                    style={{
                      padding: '0.65rem 1rem',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      background: '#ffffff',
                      color: '#64748b',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Dismiss Edge Case
                  </button>
                  <button
                    onClick={() => {
                      // Trigger re-inference animation
                      setActiveHop(0);
                    }}
                    style={{
                      padding: '0.65rem 1rem',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      background: '#ffffff',
                      color: '#475569',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem'
                    }}
                  >
                    <RefreshCw size={14} /> Re-verify Causal Graph
                  </button>
                </div>

                {/* Primary Mandatory CTA: Dispatch to Issue Tracker */}
                <button
                  onClick={handleDispatch}
                  disabled={isDispatching || selectedItem.status === 'Dispatched to Tracker'}
                  style={{
                    padding: '0.75rem 1.6rem',
                    borderRadius: '8px',
                    border: 'none',
                    background: selectedItem.status === 'Dispatched to Tracker' ? '#10b981' : 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)',
                    color: '#ffffff',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    cursor: selectedItem.status === 'Dispatched to Tracker' ? 'default' : 'pointer',
                    boxShadow: '0 4px 14px rgba(79, 70, 229, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {isDispatching ? (
                    <>
                      <RefreshCw size={16} className="animate-spin" />
                      Dispatching to Cloud...
                    </>
                  ) : selectedItem.status === 'Dispatched to Tracker' ? (
                    <>
                      <Check size={16} />
                      Dispatched to Tracker
                    </>
                  ) : (
                    <>
                      <Zap size={16} fill="#ffffff" />
                      Dispatch to Issue Tracker
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              border: '1px dashed #cbd5e1',
              padding: '4rem 2rem',
              textAlign: 'center',
              color: '#94a3b8'
            }}
          >
            <Target size={44} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#475569' }}>Select an Edge Case to Inspect</h3>
            <p style={{ margin: 0, fontSize: '0.85rem' }}>
              Select any feedback from the triage queue on the left to review the 3-hop causal trace and dispatch to the operational tracker.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
