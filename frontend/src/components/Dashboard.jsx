import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';
import {
  Database,
  Calendar,
  Filter,
  FileDown,
  Search,
  X,
  Download,
  AlertCircle
} from 'lucide-react';
import { supabase } from '../supabase';
import { FALLBACK_REVIEWS } from '../data/fallbackFeedback';
import TypewriterLoader from './ui/TypewriterLoader';
import EqualizerLoader from './ui/EqualizerLoader';
import NumberTicker from './ui/NumberTicker';
import Highlighter from './ui/Highlighter';
import BorderBeam from './ui/BorderBeam';
import AuroraText from './ui/AuroraText';
import ProgressiveBlur from './ui/ProgressiveBlur';

// Figma Hex Color Tokens
const TOKENS = {
  primary: '#4F46E5',
  primaryLight: '#EEF0FF',
  textDark: '#172033',
  textMuted: '#64748B',
  textSubtle: '#8996AB',
  border: '#DCE3ED',
  bgCanvas: '#F8FAFC',
  bgCard: '#FFFFFF',
  crimson: '#BE3455',
  amber: '#B77913',
  indigo: '#4F46E5',
  emerald: '#158366'
};

// Daily feedback volume data matching Figma trend line & data points
const DAILY_VOLUME_DATA = [
  { day: 'Oct 1', volume: 820, dotY: 67.9 },
  { day: 'Oct 2', volume: 960, dotY: 53.8 },
  { day: 'Oct 3', volume: 865, dotY: 63.2 },
  { day: 'Oct 4', volume: 1150, dotY: 35.0 },
  { day: 'Oct 5', volume: 1050, dotY: 44.4 },
  { day: 'Oct 6', volume: 1100, dotY: 39.7 },
  { day: 'Oct 7', volume: 912, dotY: 58.5 }
];

// Severity distribution matching Figma frame arcs and counts
const SEVERITY_DONUT_DATA = [
  { name: 'Critical', count: 89, color: TOKENS.crimson, label: 'Critical' },
  { name: 'High', count: 1240, color: TOKENS.amber, label: 'High' },
  { name: 'Medium', count: 2890, color: TOKENS.indigo, label: 'Medium' },
  { name: 'Low', count: 2783, color: TOKENS.emerald, label: 'Low' }
];

// Operational Category telemetry with volume and critical risk exposure
const CATEGORY_TELEMETRY_DATA = [
  { category: 'Product Feedback', volume: 2240, risk: 4.2, fill: '#4F46E5' },
  { category: 'Customer Service', volume: 1960, risk: 12.8, fill: '#6366F1' },
  { category: 'Operational Issues', volume: 1420, risk: 24.1, fill: '#06B6D4' },
  { category: 'Fraud & Scam', volume: 1382, risk: 88.5, fill: '#BE3455' }
];

export default function Dashboard({ apiBase = '', onNavigateRoute, onDispatchToDecision }) {
  const [overviewData, setOverviewData] = useState(null);
  const [pipelineData, setPipelineData] = useState(null);
  const [categoryMetric, setCategoryMetric] = useState('volume');

  // Sub-views & Feedback Explorer 7,000 Dataset State
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showBriefingModal, setShowBriefingModal] = useState(false);
  const [isGeneratingBriefing, setIsGeneratingBriefing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSeverity, setSelectedSeverity] = useState('All');

  // Pagination & Inspection Drawer (Figma Frame 50:37735)
  const [feedbackPage, setFeedbackPage] = useState(1);
  const [feedbackLimit, setFeedbackLimit] = useState(25);
  const [totalFeedbackCount, setTotalFeedbackCount] = useState(7000);
  const [apiFeedbackRecords, setApiFeedbackRecords] = useState([]);
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  const [inspectedRecord, setInspectedRecord] = useState(null);

  const handleOpenBriefing = () => {
    setShowBriefingModal(true);
    setIsGeneratingBriefing(true);
    setTimeout(() => {
      setIsGeneratingBriefing(false);
    }, 2000);
  };

  const fetchDashboardData = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const [ovRes, pipeRes] = await Promise.all([
        fetch(`${apiBase}/api/overview`, { headers }).catch(() => null),
        fetch(`${apiBase}/api/adaption/pipeline`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', ...headers },
          body: JSON.stringify({
            recipes: ['deduplication', 'emotional_rephrasing', 'causal_traces', 'pii_safety_blueprint'],
            brand_voice: 'Empathetic, structured, executive root-cause focused'
          })
        }).catch(() => null)
      ]);

      if (ovRes && ovRes.ok) {
        const ovJson = await ovRes.json();
        setOverviewData(ovJson);
      }
      if (pipeRes && pipeRes.ok) {
        const pipeJson = await pipeRes.json();
        setPipelineData(pipeJson);
      }
    } catch (e) {
      console.warn('Dashboard fetch fallback:', e);
    }
  };

  // Fetch paginated records from backend across full 7,000 dataset
  const fetchFeedbackRecords = async () => {
    setLoadingFeedback(true);
    try {
      const params = new URLSearchParams({
        page: feedbackPage.toString(),
        limit: feedbackLimit.toString()
      });
      if (searchQuery.trim()) params.append('search', searchQuery.trim());
      if (selectedCategory && selectedCategory !== 'All') params.append('category', selectedCategory);
      if (selectedSeverity && selectedSeverity !== 'All') params.append('severity', selectedSeverity);

      const res = await fetch(`${apiBase}/api/feedback?${params.toString()}`);
      if (res.ok) {
        const json = await res.json();
        setApiFeedbackRecords(json.data || []);
        setTotalFeedbackCount(json.total ?? 7000);
      } else {
        setApiFeedbackRecords(FALLBACK_REVIEWS);
      }
    } catch (e) {
      setApiFeedbackRecords(FALLBACK_REVIEWS);
    } finally {
      setLoadingFeedback(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  useEffect(() => {
    if (showFeedbackModal) {
      fetchFeedbackRecords();
    }
  }, [showFeedbackModal, feedbackPage, feedbackLimit, searchQuery, selectedCategory, selectedSeverity]);

  const totalRecords = overviewData?.totalFeedback || 7002;
  const highRisk = overviewData?.highRiskAlerts || 1329;
  const csat = overviewData?.csatScore || 74.2;
  const quality = pipelineData?.pipeline_metrics?.baseline_score || 6.8;

  // Active records to display
  const activeRecords = apiFeedbackRecords.length > 0 ? apiFeedbackRecords : FALLBACK_REVIEWS;

  return (
    <div
      style={{
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '40px',
        gap: '24px',
        width: '100%',
        minHeight: 'calc(100vh - 80px)',
        background: TOKENS.bgCanvas
      }}
    >
      {/* Page Heading & Briefing Export */}
      <div
        style={{
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          gap: '24px'
        }}
      >
        {/* Heading Copy */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '6px', flex: 1 }}>
          <div
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontWeight: 500,
              fontSize: '10px',
              lineHeight: '150%',
              color: TOKENS.primary,
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}
          >
            OVERVIEW / OCTOBER 1–7, 2026
          </div>
          <h1
            style={{
              margin: 0,
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: '40px',
              lineHeight: '115%',
              color: TOKENS.textDark,
              letterSpacing: '-0.02em'
            }}
          >
            Dashboard
          </h1>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: '13px',
              lineHeight: '150%',
              color: TOKENS.textMuted
            }}
          >
            The customer signal, organized by severity and operational impact. Synthesized across {totalRecords.toLocaleString()} verified touchpoints.
          </div>
        </div>

        {/* Briefing Export CTA */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
          <button
            onClick={handleOpenBriefing}
            style={{
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '0px 16px',
              gap: '9px',
              width: '233px',
              height: '42px',
              background: TOKENS.primary,
              border: `1px solid ${TOKENS.primary}`,
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              boxShadow: '0 2px 8px rgba(79, 70, 229, 0.2)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#4338CA'}
            onMouseLeave={(e) => e.currentTarget.style.background = TOKENS.primary}
          >
            <FileDown size={16} color="#FFFFFF" />
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: '13px',
                lineHeight: '150%',
                color: '#FFFFFF'
              }}
            >
              Generate Executive Briefing
            </span>
          </button>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: '10px',
              lineHeight: '150%',
              color: TOKENS.textSubtle
            }}
          >
            PDF / CSV
          </span>
        </div>
      </div>

      {/* Dataset and Explorer Access Filter Bar */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          height: '42px'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
          {/* Active Dataset Button */}
          <div
            style={{
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '0px 16px',
              gap: '9px',
              height: '42px',
              background: '#FFFFFF',
              border: `1px solid ${TOKENS.border}`,
              borderRadius: '6px'
            }}
          >
            <Database size={16} color={TOKENS.textMuted} />
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: '13px',
                lineHeight: '150%',
                color: TOKENS.textDark
              }}
            >
              feedback_oct_2026
            </span>
          </div>

          {/* Date Range Button */}
          <div
            style={{
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '0px 16px',
              gap: '9px',
              height: '42px',
              background: '#FFFFFF',
              border: `1px solid ${TOKENS.border}`,
              borderRadius: '6px'
            }}
          >
            <Calendar size={16} color={TOKENS.textMuted} />
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: '13px',
                lineHeight: '150%',
                color: TOKENS.textDark
              }}
            >
              Oct 1–7, 2026
            </span>
          </div>
        </div>

        {/* Open Feedback Explorer Action */}
        <button
          onClick={() => setShowFeedbackModal(true)}
          style={{
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0px 16px',
            gap: '9px',
            height: '42px',
            background: '#FFFFFF',
            border: `1px solid ${TOKENS.border}`,
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#F8FAFC'}
          onMouseLeave={(e) => e.currentTarget.style.background = '#FFFFFF'}
        >
          <Filter size={16} color={TOKENS.textMuted} />
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: '13px',
              lineHeight: '150%',
              color: TOKENS.textDark
            }}
          >
            Open Feedback Explorer
          </span>
        </button>
      </div>

      {/* Ruled Key Metrics (Figma: Ruled key metrics, 4 cards) */}
      <div
        style={{
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          padding: '14px 0px',
          gap: '24px',
          width: '100%',
          borderWidth: '1px 0px',
          borderStyle: 'solid',
          borderColor: TOKENS.border
        }}
      >
        {/* Metric 1: Total Customer Records */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '4px', flex: 1 }}>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: '12px',
              lineHeight: '150%',
              color: TOKENS.textMuted
            }}
          >
            Total customer records
          </div>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: '48px',
              lineHeight: '105%',
              color: TOKENS.textDark
            }}
          >
            <NumberTicker value={totalRecords} />
          </div>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: '10px',
              lineHeight: '150%',
              color: TOKENS.textSubtle
            }}
          >
            100% verified touchpoints
          </div>
        </div>

        {/* Metric 2: High-Severity Signals (Amber) */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '4px', flex: 1 }}>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: '12px',
              lineHeight: '150%',
              color: TOKENS.textMuted
            }}
          >
            High-severity signals
          </div>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: '48px',
              lineHeight: '105%',
              color: TOKENS.amber
            }}
          >
            <NumberTicker value={highRisk} />
          </div>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: '10px',
              lineHeight: '150%',
              color: TOKENS.textSubtle
            }}
          >
            Requires immediate engineering review
          </div>
        </div>

        {/* Metric 3: Mean CSAT Baseline */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '4px', flex: 1 }}>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: '12px',
              lineHeight: '150%',
              color: TOKENS.textMuted
            }}
          >
            Mean CSAT baseline
          </div>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: '48px',
              lineHeight: '105%',
              color: TOKENS.textDark,
              display: 'inline-flex',
              alignItems: 'center'
            }}
          >
            <NumberTicker value={Math.round(csat)} />%
          </div>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: '10px',
              lineHeight: '150%',
              color: TOKENS.textSubtle
            }}
          >
            Across 4 core product categories
          </div>
        </div>

        {/* Metric 4: Dataset Quality Score */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '4px', flex: 1 }}>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: '12px',
              lineHeight: '150%',
              color: TOKENS.textMuted
            }}
          >
            Dataset quality score
          </div>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: '48px',
              lineHeight: '105%',
              color: TOKENS.textDark,
              display: 'inline-flex',
              alignItems: 'center'
            }}
          >
            <NumberTicker value={Math.round(quality * 10) / 10} />
          </div>
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: '10px',
              lineHeight: '150%',
              color: TOKENS.textSubtle
            }}
          >
            Baseline unconditioned quality
          </div>
        </div>
      </div>

      {/* Signal Analytics (Daily Area Chart + Severity Donut) */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: '32px',
          width: '100%',
          flexWrap: 'wrap'
        }}
      >
        {/* Left: Feedback Over Time (Daily Feedback Volume Area Chart) */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '12px',
            flex: '1 1 600px',
            maxWidth: '680px'
          }}
        >
          {/* Chart Title Header */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%'
            }}
          >
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                fontSize: '17px',
                lineHeight: '150%',
                color: TOKENS.textDark
              }}
            >
              Daily feedback volume
            </span>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                fontSize: '10px',
                lineHeight: '150%',
                color: TOKENS.textSubtle
              }}
            >
              Oct 1–7, 2026
            </span>
          </div>

          {/* Area Chart Container */}
          <div style={{ width: '100%', height: 200, background: '#FFFFFF', borderRadius: '6px', border: `1px solid ${TOKENS.border}`, padding: '10px 10px 0 0', boxSizing: 'border-box', position: 'relative', overflow: 'hidden' }}>
            <BorderBeam duration={10} size={110} />
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={DAILY_VOLUME_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="volGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#EEF0FF" stopOpacity={0.8} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: TOKENS.textSubtle }} stroke={TOKENS.border} />
                <YAxis tick={{ fontSize: 10, fill: TOKENS.textSubtle }} stroke={TOKENS.border} />
                <Tooltip
                  contentStyle={{
                    background: '#FFFFFF',
                    border: `1px solid ${TOKENS.border}`,
                    borderRadius: '6px',
                    fontSize: '11px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="volume"
                  stroke="#4F46E5"
                  strokeWidth={2.5}
                  fill="url(#volGrad)"
                  dot={{ r: 4, fill: '#FFFFFF', stroke: '#4F46E5', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Peak Volume Insight */}
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: '11px',
              lineHeight: '150%',
              color: TOKENS.textMuted
            }}
          >
            Peak feedback volume occurred on Oct 4 following payment gateway latency.
          </div>
        </div>

        {/* Right: Severity Distribution Donut and Ledger */}
        <div
          style={{
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            paddingLeft: '30px',
            gap: '16px',
            flex: '1 1 380px',
            borderLeft: `1px solid ${TOKENS.border}`
          }}
        >
          {/* Chart Title */}
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: '17px',
              lineHeight: '150%',
              color: TOKENS.textDark
            }}
          >
            Severity distribution
          </div>

          {/* Donut and Ledger Row */}
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '28px', width: '100%' }}>
            {/* Donut Chart with Centered Total */}
            <div style={{ position: 'relative', width: '150px', height: '150px', flexShrink: 0 }}>
              <ResponsiveContainer width={150} height={150}>
                <PieChart>
                  <Pie
                    data={SEVERITY_DONUT_DATA}
                    dataKey="count"
                    nameKey="name"
                    innerRadius={48}
                    outerRadius={70}
                    paddingAngle={2}
                  >
                    {SEVERITY_DONUT_DATA.map((entry, idx) => (
                      <Cell key={idx} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              {/* Total Records in Donut Center */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  pointerEvents: 'none'
                }}
              >
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    fontSize: '22px',
                    lineHeight: '120%',
                    color: TOKENS.textDark
                  }}
                >
                  {totalRecords.toLocaleString()}
                </span>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    fontSize: '9px',
                    color: TOKENS.textSubtle
                  }}
                >
                  Total records
                </span>
              </div>
            </div>

            {/* Severity Ledger */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
              {SEVERITY_DONUT_DATA.map((item) => (
                <div
                  key={item.name}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%'
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 400,
                      fontSize: '11px',
                      color: item.color
                    }}
                  >
                    {item.label}
                  </span>
                  <span
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontWeight: 600,
                      fontSize: '12px',
                      color: TOKENS.textDark
                    }}
                  >
                    {item.count.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Critical Routing Insight */}
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: '11px',
              lineHeight: '150%',
              color: TOKENS.textMuted
            }}
          >
            Critical and high signals account for 18.9% of total feedback.
          </div>
        </div>
      </div>

      {/* Operational Category Exposure & Thematic Cluster Telemetry (Dovetail-Inspired Visualizations) */}
      <div
        style={{
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'stretch',
          gap: '24px',
          width: '100%',
          flexWrap: 'wrap',
          padding: '20px',
          background: '#FFFFFF',
          borderRadius: '8px',
          border: `1px solid ${TOKENS.border}`
        }}
      >
        {/* Left: Recharts BarChart comparing Volume vs Critical Risk Exposure */}
        <div style={{ flex: '1 1 540px', minWidth: '320px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '15px', color: TOKENS.textDark }}>
                Operational Category Exposure
              </span>
              <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: TOKENS.textMuted }}>
                Cross-category distribution vs. high-severity blast radius
              </p>
            </div>
            {/* Metric Toggle */}
            <div style={{ display: 'flex', background: '#F1F5F9', borderRadius: '6px', padding: '2px' }}>
              <button
                onClick={() => setCategoryMetric('volume')}
                style={{
                  padding: '4px 10px',
                  borderRadius: '4px',
                  border: 'none',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: categoryMetric === 'volume' ? '#FFFFFF' : 'transparent',
                  color: categoryMetric === 'volume' ? TOKENS.textDark : TOKENS.textMuted,
                  boxShadow: categoryMetric === 'volume' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                Volume
              </button>
              <button
                onClick={() => setCategoryMetric('risk')}
                style={{
                  padding: '4px 10px',
                  borderRadius: '4px',
                  border: 'none',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: categoryMetric === 'risk' ? '#FFFFFF' : 'transparent',
                  color: categoryMetric === 'risk' ? TOKENS.crimson : TOKENS.textMuted,
                  boxShadow: categoryMetric === 'risk' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                }}
              >
                Critical Risk %
              </button>
            </div>
          </div>

          <div style={{ width: '100%', height: 180 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CATEGORY_TELEMETRY_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="category" tick={{ fontSize: 10, fill: TOKENS.textSubtle }} stroke={TOKENS.border} />
                <YAxis tick={{ fontSize: 10, fill: TOKENS.textSubtle }} stroke={TOKENS.border} />
                <Tooltip
                  formatter={(val) => [categoryMetric === 'volume' ? `${val} records` : `${val}% critical`, categoryMetric === 'volume' ? 'Volume' : 'Risk Exposure']}
                  contentStyle={{
                    background: '#FFFFFF',
                    border: `1px solid ${TOKENS.border}`,
                    borderRadius: '6px',
                    fontSize: '11px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                  }}
                />
                <Bar
                  dataKey={categoryMetric === 'volume' ? 'volume' : 'risk'}
                  radius={[4, 4, 0, 0]}
                  fill={categoryMetric === 'volume' ? TOKENS.primary : TOKENS.crimson}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Thematic Cluster Pills & Sentiment Velocity */}
        <div style={{ flex: '1 1 380px', minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '12px', borderLeft: `1px solid ${TOKENS.border}`, paddingLeft: '20px' }}>
          <div>
            <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '15px', color: TOKENS.textDark }}>
              Active Thematic Clusters
            </span>
            <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: TOKENS.textMuted }}>
              Click any cluster to filter the 7,002 dataset in Feedback Explorer
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {[
              { tag: 'Payment 3DS Latency', count: '1,842' },
              { tag: 'Fake Merchant KYC', count: '1,070' },
              { tag: 'Bangalore 3PL Hub SLA', count: '1,420' },
              { tag: 'iOS 18 Biometric Loop', count: '912' },
              { tag: 'Delayed Refund Window', count: '1,758' }
            ].map((cluster, cIdx) => (
              <button
                key={cIdx}
                onClick={() => {
                  setSearchQuery(cluster.tag.split(' ')[0]);
                  setShowFeedbackModal(true);
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '5px 10px',
                  borderRadius: '6px',
                  border: `1px solid ${TOKENS.border}`,
                  background: '#F8FAFC',
                  fontSize: '11px',
                  fontWeight: 500,
                  color: TOKENS.textDark,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#EEF2FF'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#F8FAFC'}
              >
                <span>#{cluster.tag}</span>
                <span style={{ fontSize: '10px', fontWeight: 700, color: TOKENS.primary }}>{cluster.count}</span>
              </button>
            ))}
          </div>

          {/* Sentiment Velocity Bar */}
          <div style={{ marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid #F1F5F9' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 600, marginBottom: '6px' }}>
              <span style={{ color: TOKENS.emerald }}>38% Positive</span>
              <span style={{ color: TOKENS.textMuted }}>16% Neutral</span>
              <span style={{ color: TOKENS.crimson }}>46% High-Risk</span>
            </div>
            <div style={{ display: 'flex', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: '38%', background: TOKENS.emerald }} />
              <div style={{ width: '16%', background: '#CBD5E1' }} />
              <div style={{ width: '46%', background: TOKENS.crimson }} />
            </div>
          </div>
        </div>
      </div>

      {/* Signals Worth Your Attention (Table from Figma Frame 50:38765) */}
      <div
        style={{
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          paddingTop: '18px',
          gap: '10px',
          width: '100%',
          borderTop: `1px solid ${TOKENS.border}`
        }}
      >
        {/* Table Heading */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%'
          }}
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: '17px',
              lineHeight: '150%',
              color: TOKENS.textDark
            }}
          >
            Signals worth your attention
          </span>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: '10px',
              lineHeight: '150%',
              color: TOKENS.textSubtle
            }}
          >
            Ranked by customer severity
          </span>
        </div>

        {/* Column Labels */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '20px',
            width: '100%',
            padding: '4px 0',
            borderBottom: `1px solid #F1F5F9`
          }}
        >
          <span style={{ flex: '1 1 600px', fontFamily: "'Inter', sans-serif", fontSize: '9px', color: TOKENS.textSubtle }}>
            Signal cluster
          </span>
          <span style={{ width: '65px', fontFamily: "'Inter', sans-serif", fontSize: '9px', color: TOKENS.textSubtle }}>
            Volume
          </span>
          <span style={{ width: '95px', fontFamily: "'Inter', sans-serif", fontSize: '9px', color: TOKENS.textSubtle }}>
            Severity
          </span>
          <span style={{ width: '218px', fontFamily: "'Inter', sans-serif", fontSize: '9px', color: TOKENS.textSubtle }}>
            Routing destination
          </span>
        </div>

        {/* Rows */}
        {[
          {
            cluster: 'Payment gateway timeout after 3DS verification failure',
            volume: '34 records',
            sevLabel: 'P0',
            sevBg: '#FFF1F3',
            sevColor: TOKENS.crimson,
            destination: 'Core Banking · #payments-oncall'
          },
          {
            cluster: 'Order cancellation confirmation email delayed by 4+ hours',
            volume: '28 records',
            sevLabel: 'P1',
            sevBg: '#FFFAEB',
            sevColor: TOKENS.amber,
            destination: 'Order Management · #logistics-ops'
          },
          {
            cluster: 'Mobile app biometric re-authentication loop on iOS 18',
            volume: '19 records',
            sevLabel: 'P2',
            sevBg: '#EEF0FF',
            sevColor: TOKENS.indigo,
            destination: 'Client Engineering · #mobile-eng'
          }
        ].map((row, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '20px',
              width: '100%',
              padding: '8px 0',
              borderBottom: '1px solid #F8FAFC'
            }}
          >
            {/* Cluster Title */}
            <span
              style={{
                flex: '1 1 600px',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: '12px',
                color: TOKENS.textDark
              }}
            >
              {row.cluster}
            </span>

            {/* Volume */}
            <span
              style={{
                width: '65px',
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
                fontSize: '12px',
                color: TOKENS.textDark
              }}
            >
              {row.volume}
            </span>

            {/* Severity Pill */}
            <div style={{ width: '95px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '4px 8px',
                  gap: '6px',
                  background: row.sevBg,
                  borderRadius: '4px'
                }}
              >
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: row.sevColor }} />
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: '11px',
                    color: row.sevColor
                  }}
                >
                  {row.sevLabel}
                </span>
              </div>
            </div>

            {/* Destination & Triage CTA */}
            <div style={{ width: '260px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: '11px',
                  color: TOKENS.textMuted,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {row.destination}
              </span>
              <button
                onClick={() => {
                  if (onDispatchToDecision) {
                    onDispatchToDecision({
                      id: `EDG-${idx + 805}`,
                      title: row.cluster,
                      severity: row.sevLabel === 'P0' ? 'Critical' : row.sevLabel === 'P1' ? 'High' : 'Medium',
                      category: row.sevLabel === 'P0' ? 'Operational Issues' : 'Product Feedback',
                      snippet: `${row.cluster}. Identified across ${row.volume}. Routing destination: ${row.destination}.`,
                      suggestedAction: `Dispatch immediate engineering triage to ${row.destination}`
                    });
                  }
                }}
                style={{
                  background: '#EEF2FF',
                  border: '1px solid #C7D2FE',
                  borderRadius: '4px',
                  color: '#4F46E5',
                  padding: '3px 8px',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  flexShrink: 0
                }}
              >
                Triage →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ============================================================================== */}
      {/* SUB-VIEW 1: FEEDBACK EXPLORER MODAL & INSPECTION DRAWER (Figma Frame 50:37735)  */}
      {/* ============================================================================== */}
      {showFeedbackModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(226, 232, 240, 0.780392)',
            backdropFilter: 'blur(4px)',
            zIndex: 130,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}
          onClick={() => {
            setShowFeedbackModal(false);
            setInspectedRecord(null);
          }}
        >
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '12px',
              width: '100%',
              maxWidth: inspectedRecord ? '1240px' : '980px',
              height: '86vh',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0px 24px 64px rgba(23, 32, 51, 0.14)',
              border: `1px solid ${TOKENS.border}`,
              overflow: 'hidden',
              transition: 'max-width 0.25s ease'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ padding: '1.25rem 1.75rem', borderBottom: `1px solid ${TOKENS.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FFFFFF' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: TOKENS.textDark, margin: 0, letterSpacing: '-0.02em' }}>
                    Feedback Explorer
                  </h3>
                  <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '999px', background: '#EEF2FF', color: '#4F46E5', border: '1px solid #C7D2FE' }}>
                    7,002 Live Dataset Records
                  </span>
                </div>
                <p style={{ fontSize: '0.8rem', color: TOKENS.textMuted, margin: '4px 0 0 0' }}>
                  Search, filter, and click any customer record to inspect 3-hop causal provenance or dispatch to Decision Intelligence.
                </p>
              </div>
              <button
                onClick={() => {
                  setShowFeedbackModal(false);
                  setInspectedRecord(null);
                }}
                style={{ width: 32, height: 32, borderRadius: '6px', border: `1px solid ${TOKENS.border}`, background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: TOKENS.textMuted }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Filter & Search Bar */}
            <div style={{ padding: '0.85rem 1.75rem', background: '#F8FAFC', borderBottom: `1px solid ${TOKENS.border}`, display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ flex: 1, minWidth: '240px', position: 'relative' }}>
                <Search size={14} color={TOKENS.textSubtle} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  placeholder="Filter feedback text (e.g. 'timeout', 'fraud', 'delay')..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setFeedbackPage(1);
                  }}
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem 0.5rem 2.3rem',
                    borderRadius: '6px',
                    border: `1px solid ${TOKENS.border}`,
                    fontSize: '0.84rem',
                    boxSizing: 'border-box',
                    background: '#FFFFFF'
                  }}
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setFeedbackPage(1);
                }}
                style={{ padding: '0.5rem 0.75rem', borderRadius: '6px', border: `1px solid ${TOKENS.border}`, fontSize: '0.82rem', background: '#FFFFFF', color: '#172033', fontWeight: 500 }}
              >
                <option value="All">All Categories ({totalFeedbackCount})</option>
                <option value="Product Feedback">Product Feedback</option>
                <option value="Customer Service">Customer Service</option>
                <option value="Fraud and Scam">Fraud and Scam</option>
                <option value="Operational Issues">Operational Issues</option>
              </select>

              <select
                value={selectedSeverity}
                onChange={(e) => {
                  setSelectedSeverity(e.target.value);
                  setFeedbackPage(1);
                }}
                style={{ padding: '0.5rem 0.75rem', borderRadius: '6px', border: `1px solid ${TOKENS.border}`, fontSize: '0.82rem', background: '#FFFFFF', color: '#172033', fontWeight: 500 }}
              >
                <option value="All">All Severities</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            {/* Split Content: Main Table & Inspection Drawer */}
            <div style={{ display: 'flex', flex: 1, minHeight: 0, width: '100%' }}>
              {/* Left Pane: Table */}
              <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
                  <thead style={{ position: 'sticky', top: 0, background: '#FFFFFF', zIndex: 10, borderBottom: `2px solid ${TOKENS.border}` }}>
                    <tr style={{ color: TOKENS.textMuted, fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      <th style={{ padding: '0.75rem 1rem' }}>ID</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Category</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Customer Review (Click to Inspect)</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Sentiment</th>
                      <th style={{ padding: '0.75rem 1rem' }}>Severity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loadingFeedback ? (
                      <tr>
                        <td colSpan={5} style={{ padding: '3.5rem 2rem', textAlign: 'center', color: TOKENS.textMuted }}>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
                            <EqualizerLoader height={32} gap={5} />
                            <span style={{ fontSize: '13px', fontWeight: 500, color: TOKENS.textDark }}>
                              Loading signals across 7,002 dataset records...
                            </span>
                          </div>
                        </td>
                      </tr>
                    ) : activeRecords.map((r) => {
                      const isSelected = inspectedRecord?.id === r.id;
                      return (
                        <tr
                          key={r.id}
                          onClick={() => setInspectedRecord(r)}
                          style={{
                            borderBottom: '1px solid #F1F5F9',
                            cursor: 'pointer',
                            background: isSelected ? '#EEF2FF' : 'transparent',
                            transition: 'background 0.12s ease'
                          }}
                          onMouseEnter={(e) => {
                            if (!isSelected) e.currentTarget.style.background = '#F8FAFC';
                          }}
                          onMouseLeave={(e) => {
                            if (!isSelected) e.currentTarget.style.background = 'transparent';
                          }}
                        >
                          <td style={{ padding: '0.75rem 1rem', fontFamily: 'monospace', color: isSelected ? '#4F46E5' : TOKENS.textMuted, fontWeight: isSelected ? 700 : 500 }}>
                            #{r.id}
                          </td>
                          <td style={{ padding: '0.75rem 1rem', fontWeight: 600, color: TOKENS.textDark }}>
                            {r.category}
                          </td>
                          <td style={{ padding: '0.75rem 1rem', maxWidth: inspectedRecord ? '260px' : '440px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#334155' }}>
                            {r.review}
                          </td>
                          <td style={{ padding: '0.75rem 1rem' }}>
                            <span style={{
                              padding: '2px 8px',
                              borderRadius: '4px',
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              background: r.sentiment === 'Positive' ? '#ECFDF5' : '#FFF1F3',
                              color: r.sentiment === 'Positive' ? TOKENS.emerald : TOKENS.crimson
                            }}>
                              {r.sentiment}
                            </span>
                          </td>
                          <td style={{ padding: '0.75rem 1rem' }}>
                            <span style={{
                              padding: '2px 8px',
                              borderRadius: '4px',
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              background: r.severity === 'Critical' ? '#FFF1F3' : r.severity === 'High' ? '#FFFBEB' : '#F8FAFC',
                              color: r.severity === 'Critical' ? TOKENS.crimson : r.severity === 'High' ? '#B45309' : TOKENS.textMuted,
                              border: `1px solid ${r.severity === 'Critical' ? '#FECDD3' : r.severity === 'High' ? '#FDE68A' : '#E2E8F0'}`
                            }}>
                              {r.severity}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <ProgressiveBlur position="bottom" height="40px" />
              </div>

              {/* Right Pane: Inspection Drawer (Figma Frame 50:37735) */}
              {inspectedRecord && (
                <div
                  style={{
                    width: '380px',
                    borderLeft: `1px solid ${TOKENS.border}`,
                    background: '#FFFFFF',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '1.5rem',
                    gap: '1.25rem',
                    overflowY: 'auto',
                    boxShadow: '-4px 0 20px rgba(15, 23, 42, 0.04)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontFamily: 'monospace', fontSize: '11px', color: '#4F46E5', fontWeight: 700, letterSpacing: '0.04em' }}>
                        SIGNAL INSPECTION · #{inspectedRecord.id}
                      </span>
                      <h4 style={{ margin: '4px 0 0 0', fontSize: '16px', fontWeight: 700, color: '#172033' }}>
                        {inspectedRecord.category}
                      </h4>
                    </div>
                    <button
                      onClick={() => setInspectedRecord(null)}
                      style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748B' }}
                    >
                      <X size={16} />
                    </button>
                  </div>

                  {/* Customer Voice Card */}
                  <div style={{ padding: '12px', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #DCE3ED' }}>
                    <div style={{ fontSize: '10px', textTransform: 'uppercase', color: '#64748B', fontWeight: 700, marginBottom: '6px' }}>
                      Customer Voice
                    </div>
                    <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.5, color: '#172033', fontStyle: 'italic' }}>
                      “{inspectedRecord.review}”
                    </p>
                  </div>

                  {/* 3-Hop Causal Reasoning Synthesis */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#4F46E5', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      3-Hop Causal Synthesis
                    </div>

                    <div style={{ padding: '10px', borderRadius: '6px', background: '#FFF1F3', border: '1px solid #FECDD3' }}>
                      <div style={{ fontSize: '10px', fontWeight: 700, color: '#BE3455', marginBottom: '2px' }}>
                        HOP 1: ROOT CAUSE
                      </div>
                      <div style={{ fontSize: '11px', color: '#172033', lineHeight: 1.4 }}>
                        {inspectedRecord.root_cause || `${inspectedRecord.category} anomaly triggering customer friction.`}
                      </div>
                    </div>

                    <div style={{ padding: '10px', borderRadius: '6px', background: '#FFFBEB', border: '1px solid #FDE68A' }}>
                      <div style={{ fontSize: '10px', fontWeight: 700, color: '#B45309', marginBottom: '2px' }}>
                        HOP 2: BLAST RADIUS
                      </div>
                      <div style={{ fontSize: '11px', color: '#172033', lineHeight: 1.4 }}>
                        {inspectedRecord.impact || 'Service level degradation; potential customer dispute risk.'}
                      </div>
                    </div>

                    <div style={{ padding: '10px', borderRadius: '6px', background: '#EEF2FF', border: '1px solid #C7D2FE' }}>
                      <div style={{ fontSize: '10px', fontWeight: 700, color: '#4F46E5', marginBottom: '2px' }}>
                        HOP 3: PRESCRIBED ACTION
                      </div>
                      <div style={{ fontSize: '11px', color: '#172033', lineHeight: 1.4 }}>
                        {inspectedRecord.action || 'Deploy platform hotfix and notify operations response team.'}
                      </div>
                    </div>
                  </div>

                  {/* Primary Action Button: Dispatch to Decision Tab */}
                  <button
                    onClick={() => {
                      const edgeCase = {
                        id: `FB-${String(inspectedRecord.id).padStart(4, '0')}`,
                        customer: `Customer Report #${inspectedRecord.id}`,
                        provenance: `FB-${inspectedRecord.id} · Customer Feedback · EN · Oct 7, 09:14`,
                        timestamp: 'Just now',
                        category: inspectedRecord.category,
                        severity: inspectedRecord.severity === 'Critical' ? 'P0 Critical' : inspectedRecord.severity === 'High' ? 'P1 High' : 'P2 Medium',
                        ambiguityScore: inspectedRecord.severity === 'Critical' ? 95 : 84,
                        status: 'Pending Review',
                        feedbackText: inspectedRecord.review,
                        rootCause: inspectedRecord.root_cause || `${inspectedRecord.category} anomaly requiring autonomous triage.`,
                        impact: inspectedRecord.impact || 'Direct buyer friction and operational escalation.',
                        recommendedAction: inspectedRecord.action || 'Quarantine flagged flow and dispatch hotfix patch.',
                        priority: inspectedRecord.severity === 'Critical' ? 'Critical' : 'High',
                        assignedTeam: inspectedRecord.category === 'Fraud and Scam' ? 'Trust & Safety' : 'Operations',
                        confidence: '95.4%',
                        autoRouted: false
                      };

                      if (onDispatchToDecision) {
                        onDispatchToDecision(edgeCase);
                      }
                      setShowFeedbackModal(false);
                      setInspectedRecord(null);
                      if (onNavigateRoute) {
                        onNavigateRoute('decision');
                      }
                    }}
                    style={{
                      marginTop: 'auto',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      padding: '12px 18px',
                      borderRadius: '8px',
                      background: '#4F46E5',
                      color: '#FFFFFF',
                      border: 'none',
                      fontWeight: 700,
                      fontSize: '13px',
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(79, 70, 229, 0.3)',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#4338CA'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#4F46E5'}
                  >
                    <ArrowRight size={16} />
                    <span>Send to Decision Tab</span>
                  </button>
                </div>
              )}
            </div>

            {/* Pagination Toolbar */}
            <div
              style={{
                padding: '0.85rem 1.75rem',
                background: '#F8FAFC',
                borderTop: `1px solid ${TOKENS.border}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '0.82rem',
                color: TOKENS.textMuted
              }}
            >
              <div>
                Showing {(feedbackPage - 1) * feedbackLimit + 1}–{Math.min(feedbackPage * feedbackLimit, totalFeedbackCount).toLocaleString()} of {totalFeedbackCount.toLocaleString()} dataset records
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  disabled={feedbackPage <= 1}
                  onClick={() => setFeedbackPage((p) => Math.max(1, p - 1))}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '5px',
                    border: `1px solid ${TOKENS.border}`,
                    background: feedbackPage <= 1 ? '#F1F5F9' : '#FFFFFF',
                    color: feedbackPage <= 1 ? '#94A3B8' : '#172033',
                    cursor: feedbackPage <= 1 ? 'not-allowed' : 'pointer',
                    fontSize: '12px',
                    fontWeight: 600
                  }}
                >
                  Previous
                </button>
                <span style={{ fontWeight: 600, color: '#172033', fontSize: '12px' }}>
                  Page {feedbackPage} of {Math.ceil(totalFeedbackCount / feedbackLimit)}
                </span>
                <button
                  disabled={feedbackPage >= Math.ceil(totalFeedbackCount / feedbackLimit)}
                  onClick={() => setFeedbackPage((p) => p + 1)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '5px',
                    border: `1px solid ${TOKENS.border}`,
                    background: feedbackPage >= Math.ceil(totalFeedbackCount / feedbackLimit) ? '#F1F5F9' : '#FFFFFF',
                    color: feedbackPage >= Math.ceil(totalFeedbackCount / feedbackLimit) ? '#94A3B8' : '#172033',
                    cursor: feedbackPage >= Math.ceil(totalFeedbackCount / feedbackLimit) ? 'not-allowed' : 'pointer',
                    fontSize: '12px',
                    fontWeight: 600
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================================== */}
      {/* SUB-VIEW 2: EXECUTIVE COGNITIVE BRIEFING MODAL                                  */}
      {/* ============================================================================== */}
      {showBriefingModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(226, 232, 240, 0.780392)',
            backdropFilter: 'blur(3px)',
            zIndex: 130,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}
          onClick={() => setShowBriefingModal(false)}
        >
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '10px',
              width: '100%',
              maxWidth: '780px',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0px 20px 60px rgba(23, 32, 51, 0.101961)',
              border: `1px solid ${TOKENS.border}`,
              overflow: 'hidden'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: `1px solid ${TOKENS.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <FileDown size={18} color={TOKENS.primary} />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: TOKENS.textDark, margin: 0 }}>
                  NOESIS Executive Cognitive Briefing
                </h3>
              </div>
              <button onClick={() => setShowBriefingModal(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: TOKENS.textMuted }}>
                <X size={20} />
              </button>
            </div>

            {isGeneratingBriefing ? (
              <div style={{ flex: 1, padding: '3.5rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 320 }}>
                <TypewriterLoader statusText="Synthesizing Executive Cognitive Briefing..." />
                <div style={{ marginTop: '1.25rem', fontSize: '0.82rem', color: TOKENS.textMuted, fontWeight: 600 }}>
                  Cross-referencing {totalRecords.toLocaleString()} customer records with Adaption Living Data recipes...
                </div>
              </div>
            ) : (
              <div style={{ flex: 1, overflowY: 'auto', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', fontSize: '0.88rem', color: TOKENS.textDark, lineHeight: 1.6 }}>
                <div style={{ borderBottom: `2px solid ${TOKENS.border}`, paddingBottom: '1rem' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 700, color: TOKENS.primary }}>
                    Enterprise Telemetry & Risk Intelligence Briefing
                  </div>
                  <div style={{ fontSize: '0.78rem', color: TOKENS.textMuted, marginTop: '0.2rem' }}>
                    Scope: {totalRecords.toLocaleString()} Multi-channel Customer Records &bull; Date: {new Date().toLocaleDateString()}
                  </div>
                </div>

                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: TOKENS.textDark, marginBottom: '0.35rem' }}>
                    1. Executive Summary & Severity Blindness Remediation
                  </h4>
                  <p>
                    Across {totalRecords.toLocaleString()} customer touchpoints, Net CSAT is measured at {csat}%. Prior to Adaption conditioning, unweighted volume created critical severity blindness, hiding high-impact fraud attacks under packaging and transit queries.
                  </p>
                </div>

                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: TOKENS.textDark, marginBottom: '0.35rem' }}>
                    2. Living Data Quality Uplift (Adaption Labs)
                  </h4>
                  <p>
                    Active recipe conditioning lifted raw quality scores from 6.8 (Grade B-) to 9.4 (Grade A+), pruning 1,024 duplicate reviews (14.2% noise reduction) and saving 3.2M downstream prompt tokens monthly ($4,800/mo savings).
                  </p>
                </div>

                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: TOKENS.textDark, marginBottom: '0.35rem' }}>
                    3. Autonomous Prioritization Directives
                  </h4>
                  <ul style={{ paddingLeft: '1.25rem', margin: 0 }}>
                    <li><strong>P0 Critical</strong>: Quarantine unverified merchant payouts ($184,000 fraud exposure).</li>
                    <li><strong>P1 High</strong>: Enforce 3PL webhook synchronization to eliminate 42% of late transit queue inquiries.</li>
                    <li><strong>P2 Medium</strong>: Deploy mobile checkout token retry idempotency to recover 3.8% cart conversion.</li>
                  </ul>
                </div>
              </div>
            )}

            <div style={{ padding: '1rem 1.5rem', background: '#F8FAFC', borderTop: `1px solid ${TOKENS.border}`, display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button
                onClick={() => setShowBriefingModal(false)}
                style={{ padding: '0.55rem 1rem', borderRadius: '6px', border: `1px solid ${TOKENS.border}`, background: '#FFFFFF', color: TOKENS.textMuted, fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer' }}
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', padding: '0.55rem 1.25rem', borderRadius: '6px', border: 'none', background: TOKENS.primary, color: '#FFFFFF', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer' }}
              >
                <Download size={14} />
                <span>Print / Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
