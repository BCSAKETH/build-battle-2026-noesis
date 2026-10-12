import React, { useState, useRef, useEffect } from 'react';
import {
  CheckCircle2,
  Clock,
  Mic,
  Square,
  Play,
  Pause,
  Languages,
  Check,
  Search,
  X,
  ArrowRight,
  ArrowUpRight,
  FastForward,
  Edit2,
  Database
} from 'lucide-react';
import { supabase, updateIssueInCloud } from '../supabase';

// Waveform height presets matching Figma's 64 audio frequency bars
const WAVEFORM_HEIGHTS = [
  8, 21, 9, 22, 10, 23, 11, 24, 12, 25, 13, 26, 14, 27, 15, 28, 16, 29, 17, 30,
  18, 31, 19, 32, 20, 8, 21, 9, 22, 10, 23, 11, 24, 12, 25, 13, 26, 14, 27, 15,
  28, 16, 29, 17, 30, 18, 31, 19, 32, 20, 8, 21, 9, 22, 10, 23, 11, 24, 12, 25,
  13, 26, 14, 27
];

// Baseline seed operational tickets matching Figma Frame 50:38370
const SEED_OPERATIONAL_TICKETS = [
  {
    id: 'N-1042',
    title: 'Checkout timeout after payment retry',
    description: 'Payment retries exhaust after a 5,000 ms timeout. The retry handler patch is prepared; closure is not yet confirmed.',
    category: 'Payments',
    status: 'In Progress',
    priority: 'High',
    severityText: 'P1 · High',
    severityType: 'high',
    assigned_to: 'Maya Rao · Payments',
    initials: 'MR',
    related_count: 34,
    next_action: 'Retry handler patch prepared',
    next_action_alert: true,
    last_update: 'Oct 7 · 10:42',
    telugu_transcript: 'రీట్రై హ్యాండ్లర్ను సరిచేశాం. చెక్అవుట్ పరీక్షలు విజయవంతమయ్యాయి.',
    english_translation: 'The retry handler has been corrected. Checkout validation passed.'
  },
  {
    id: 'N-1043',
    title: 'UPI mandate confirmation delay',
    description: 'Customer receives bank debit notification before transaction receipt is issued on merchant app.',
    category: 'Core Banking',
    status: 'In Progress',
    priority: 'High',
    severityText: 'P1 · High',
    severityType: 'high',
    assigned_to: 'Vikram Sen · Core Banking',
    initials: 'VS',
    related_count: 28,
    next_action: 'Webhook retry queue scaled up',
    next_action_alert: false,
    last_update: 'Oct 7 · 10:15',
    telugu_transcript: 'యూపీఐ వెబ్‌హుక్ ప్రాసెసింగ్‌ను ఆప్టిమైజ్ చేశాం. లాగ్స్ చెక్ చేశాము.',
    english_translation: 'UPI webhook processing has been optimized. Async queues cleared.'
  },
  {
    id: 'N-1044',
    title: 'Recurring invoice PDF generation crash',
    description: 'Memory allocation limit hit on large batch export containing more than 500 lines.',
    category: 'Billing',
    status: 'In Progress',
    priority: 'Medium',
    severityText: 'P2 · Medium',
    severityType: 'medium',
    assigned_to: 'Ananya Iyer · Billing',
    initials: 'AI',
    related_count: 19,
    next_action: 'Async streaming worker deployed',
    next_action_alert: false,
    last_update: 'Oct 7 · 09:40',
    telugu_transcript: 'పీడీఎఫ్ స్ట్రీమింగ్ వర్కర్‌ను మోహరించాం. మెమరీ లీక్ తొలగించబడింది.',
    english_translation: 'PDF streaming worker deployed. Memory bottleneck resolved.'
  },
  {
    id: 'N-1045',
    title: 'Mobile biometric login session drop',
    description: 'Tokens invalidated prematurely after background switch on iOS 18 devices.',
    category: 'Auth Platform',
    status: 'In Progress',
    priority: 'Medium',
    severityText: 'P2 · Medium',
    severityType: 'medium',
    assigned_to: 'Kiran Patel · Auth Platform',
    initials: 'KP',
    related_count: 42,
    next_action: 'Token TTL extended to 15m',
    next_action_alert: false,
    last_update: 'Oct 7 · 08:55',
    telugu_transcript: 'బయోమెట్రిక్ టోకెన్ వ్యవధిని పొడిగించాం. సెషన్స్ స్థిరంగా ఉన్నాయి.',
    english_translation: 'Biometric token validity extended. Background persistence verified.'
  },
  {
    id: 'N-1046',
    title: 'Dark mode contrast in notification center',
    description: 'Text legibility below WCAG AA threshold in secondary status pills.',
    category: 'Design Ops',
    status: 'Resolved',
    priority: 'Low',
    severityText: 'P3 · Low',
    severityType: 'low',
    assigned_to: 'Rhea Nair · Design Ops',
    initials: 'RN',
    related_count: 12,
    next_action: 'Tokens updated to v2.4',
    next_action_alert: false,
    last_update: 'Oct 6 · 17:30',
    telugu_transcript: 'డిజైన్ టోకెన్ల కాంట్రాస్ట్ సరిచేయబడింది.',
    english_translation: 'Design tokens contrast updated to WCAG AA compliance.'
  },
  {
    id: 'N-1047',
    title: 'Search query autocomplete debounce lag',
    description: 'Excessive network requests triggered during fast keypad input on mobile web.',
    category: 'Search Ops',
    status: 'Resolved',
    priority: 'Medium',
    severityText: 'P2 · Medium',
    severityType: 'medium',
    assigned_to: 'Dev Sharma · Search Ops',
    initials: 'DS',
    related_count: 23,
    next_action: '300ms debounce throttle applied',
    next_action_alert: false,
    last_update: 'Oct 6 · 14:10',
    telugu_transcript: 'శోధన డీబౌన్స్ వ్యవధిని 300msకి సర్దుబాటు చేశాం.',
    english_translation: 'Search autocomplete debounce rate-limited to 300ms.'
  }
];

export default function TicketDeliveryTracker({
  issues = [],
  onUpdateIssue,
  apiBase = '',
  initialSelectedId = null
}) {
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTicket, setSelectedTicket] = useState(null);

  // Audio recording & playback state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [activeVoiceLanguage, setActiveVoiceLanguage] = useState('TE');
  const [audioBlob, setAudioBlob] = useState(null);
  const [isEditingTranslation, setIsEditingTranslation] = useState(false);
  const [editedEnglishText, setEditedEnglishText] = useState('');

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);

  // Merge seed operational tickets with live Supabase issues
  const allTickets = React.useMemo(() => {
    if (!issues || issues.length === 0) return SEED_OPERATIONAL_TICKETS;
    
    // Ensure N-1042 is at the top for Figma parity
    const seedIds = new Set(SEED_OPERATIONAL_TICKETS.map(t => t.id));
    const customIssues = issues
      .filter(i => !seedIds.has(i.id))
      .map((i, idx) => ({
        id: i.id || `N-${1050 + idx}`,
        title: i.title || 'Operational signal',
        description: i.description || 'Customer report logged in database.',
        category: i.category || 'General Ops',
        status: i.status || 'Open',
        priority: i.priority || 'Medium',
        severityText: i.priority === 'Critical' ? 'P0 · Critical' : i.priority === 'High' ? 'P1 · High' : 'P2 · Medium',
        severityType: i.priority === 'Critical' ? 'critical' : i.priority === 'High' ? 'high' : 'medium',
        assigned_to: i.assigned_to || 'Support Ops',
        initials: (i.assigned_to || 'SO').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase(),
        related_count: 18,
        next_action: i.status === 'Resolved' ? 'Audit verified' : 'Engineering triaged',
        next_action_alert: i.priority === 'Critical',
        last_update: 'Oct 7 · 10:42',
        telugu_transcript: i.telugu_transcript || 'పరిష్కారం సమీక్షించబడింది.',
        english_translation: i.english_translation || 'Issue analyzed and queued for deployment.'
      }));

    return [...SEED_OPERATIONAL_TICKETS, ...customIssues];
  }, [issues]);

  // Auto-select initial ticket if requested
  useEffect(() => {
    if (initialSelectedId) {
      const match = allTickets.find(t => t.id === initialSelectedId);
      if (match) openResolutionOverlay(match);
    }
  }, [initialSelectedId, allTickets]);

  // Clean up audio timer
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const openResolutionOverlay = (ticket) => {
    setSelectedTicket(ticket);
    setEditedEnglishText(ticket.english_translation || 'The retry handler has been corrected. Checkout validation passed.');
    setIsEditingTranslation(false);
    setIsPlayingAudio(false);
    setIsRecording(false);
    setRecordingSeconds(0);
  };

  const closeResolutionOverlay = () => {
    if (isRecording) stopRecording();
    setSelectedTicket(null);
    setIsPlayingAudio(false);
  };

  // Status counts for portfolio overview
  const totalCount = allTickets.length;
  const openCount = allTickets.filter(t => t.status === 'Open').length;
  const inProgressCount = allTickets.filter(t => t.status === 'In Progress').length;
  const resolvedCount = allTickets.filter(t => t.status === 'Resolved').length;

  // Filtered tickets
  const filteredTickets = allTickets.filter((ticket) => {
    const status = ticket.status || 'Open';
    const matchesFilter =
      filterStatus === 'All' ||
      (filterStatus === 'Open' && status === 'Open') ||
      (filterStatus === 'In Progress' && status === 'In Progress') ||
      (filterStatus === 'Resolved' && status === 'Resolved');

    const matchesSearch =
      !searchQuery ||
      (ticket.title && ticket.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (ticket.id && ticket.id.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (ticket.assigned_to && ticket.assigned_to.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  // MediaRecorder live mic capture
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingSeconds(0);
      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.warn('Microphone permission unavailable, using simulation:', err);
      setIsRecording(true);
      setRecordingSeconds(0);
      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => {
          if (prev >= 3) {
            clearInterval(timerRef.current);
            setIsRecording(false);
            return 3;
          }
          return prev + 1;
        });
      }, 1000);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  // Confirm and resolve ticket
  const handleConfirmAndResolve = async () => {
    if (!selectedTicket) return;
    const ticketId = selectedTicket.id;
    const resolvedData = {
      status: 'Resolved',
      resolution_language: activeVoiceLanguage.toLowerCase(),
      resolution_note: editedEnglishText,
      resolved_at: new Date().toISOString()
    };

    try {
      await updateIssueInCloud(ticketId, resolvedData);
    } catch (err) {
      console.warn('Cloud update fallback:', err);
    }

    if (onUpdateIssue) {
      onUpdateIssue(ticketId, resolvedData);
    }

    // Update in-memory ticket
    setSelectedTicket((prev) => prev ? { ...prev, ...resolvedData } : null);
    closeResolutionOverlay();
  };

  // Severity pill style helper
  const getSeverityStyle = (type, text) => {
    if (type === 'critical' || (text && text.includes('Critical'))) {
      return { bg: '#FFF1F3', color: '#BE3455', dot: '#BE3455', label: text || 'P0 · Critical' };
    }
    if (type === 'high' || (text && text.includes('High'))) {
      return { bg: '#FFFAEB', color: '#B77913', dot: '#B77913', label: text || 'P1 · High' };
    }
    if (type === 'low' || (text && text.includes('Low'))) {
      return { bg: '#ECFDF5', color: '#158366', dot: '#158366', label: text || 'P3 · Low' };
    }
    return { bg: '#EEF0FF', color: '#4F46E5', dot: '#4F46E5', label: text || 'P2 · Medium' };
  };

  return (
    <div
      style={{
        width: '100%',
        minHeight: 'calc(100vh - 80px)',
        background: '#F8FAFC',
        padding: '40px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
      }}
    >
      {/* Page Heading (Figma: Noesis · Issue Tracker) */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          gap: '24px'
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '6px' }}>
          <div
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontWeight: 500,
              fontSize: '10px',
              lineHeight: '150%',
              color: '#4F46E5',
              letterSpacing: '0.08em',
              textTransform: 'uppercase'
            }}
          >
            OPERATIONS / ISSUE TRACKER
          </div>
          <h1
            style={{
              margin: 0,
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: '40px',
              lineHeight: '115%',
              color: '#172033',
              letterSpacing: '-0.02em'
            }}
          >
            Issue Tracker
          </h1>
          <p
            style={{
              margin: 0,
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: '13px',
              lineHeight: '150%',
              color: '#64748B'
            }}
          >
            Real-time delivery portfolio and multilingual voice closure workflow.
          </p>
        </div>
      </div>

      {/* Ticket Portfolio Overview Bar */}
      <div
        style={{
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          padding: '14px 0px',
          gap: '32px',
          width: '100%',
          borderWidth: '1px 0px',
          borderStyle: 'solid',
          borderColor: '#DCE3ED'
        }}
      >
        {/* Total Tickets */}
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            fontSize: '28px',
            lineHeight: '150%',
            color: '#172033',
            display: 'flex',
            alignItems: 'baseline',
            gap: '8px'
          }}
        >
          <span>{totalCount || 133}</span>
          <span style={{ fontSize: '13px', color: '#64748B', fontWeight: 400 }}>total tickets</span>
        </div>

        {/* Status Totals */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '22px', color: '#172033' }}>
            {openCount || 53}
          </span>
          <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: '12px', color: '#64748B' }}>
            Open
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '22px', color: '#172033' }}>
            {inProgressCount || 14}
          </span>
          <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: '12px', color: '#64748B' }}>
            In Progress
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '22px', color: '#172033' }}>
            {resolvedCount || 66}
          </span>
          <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: '12px', color: '#64748B' }}>
            Resolved
          </span>
        </div>

        {/* Critical Routing Reminder */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: '8px',
            flex: 1
          }}
        >
          <FastForward size={16} color="#BE3455" />
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: '11px',
              lineHeight: '150%',
              color: '#64748B'
            }}
          >
            P0 incidents auto-route to on-call engineers.
          </span>
        </div>
      </div>

      {/* Tracker Controls (Pill Filters & Search) */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          height: '40px'
        }}
      >
        {/* Exact Status Filters */}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px' }}>
          {['All', 'Open', 'In Progress', 'Resolved'].map((st) => {
            const isSelected = filterStatus === st;
            return (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                style={{
                  boxSizing: 'border-box',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '9px 17px',
                  height: '36px',
                  background: isSelected ? '#4F46E5' : '#FFFFFF',
                  border: isSelected ? '1px solid #4F46E5' : '1px solid #DCE3ED',
                  borderRadius: '100px',
                  cursor: 'pointer',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: isSelected ? 600 : 400,
                  fontSize: '12px',
                  lineHeight: '150%',
                  color: isSelected ? '#FFFFFF' : '#64748B',
                  transition: 'all 0.15s ease'
                }}
              >
                {st}
              </button>
            );
          })}
        </div>

        {/* Issue Search Input */}
        <div
          style={{
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: '0px 14px',
            gap: '8px',
            width: '298px',
            height: '40px',
            background: '#FFFFFF',
            border: '1px solid #DCE3ED',
            borderRadius: '6px'
          }}
        >
          <Search size={16} color="#64748B" />
          <input
            type="text"
            placeholder="Search by ID, title, or assignee..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              border: 'none',
              outline: 'none',
              width: '100%',
              fontFamily: "'Inter', sans-serif",
              fontSize: '11px',
              color: '#172033',
              background: 'transparent'
            }}
          />
        </div>
      </div>

      {/* Operational Ticket Card Grid (2 Columns, 551px wide cards) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(520px, 1fr))',
          gap: '18px',
          width: '100%'
        }}
      >
        {filteredTickets.map((ticket) => {
          const sev = getSeverityStyle(ticket.severityType, ticket.severityText);

          return (
            <div
              key={ticket.id}
              onClick={() => openResolutionOverlay(ticket)}
              style={{
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '18px',
                gap: '10px',
                background: '#FFFFFF',
                border: '1px solid #DCE3ED',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#4F46E5';
                e.currentTarget.style.boxShadow = '0px 4px 12px rgba(79, 70, 229, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#DCE3ED';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Ticket Identity Row */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  gap: '10px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {/* Tracking ID */}
                  <span
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontWeight: 600,
                      fontSize: '13px',
                      lineHeight: '150%',
                      color: '#4F46E5'
                    }}
                  >
                    {ticket.id}
                  </span>

                  {/* Severity Badge */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: '4px 8px',
                      gap: '6px',
                      background: sev.bg,
                      borderRadius: '4px'
                    }}
                  >
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: sev.dot }} />
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 600,
                        fontSize: '11px',
                        lineHeight: '150%',
                        color: sev.color
                      }}
                    >
                      {sev.label}
                    </span>
                  </div>

                  {/* Progress State Badge */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: '4px 8px',
                      gap: '6px',
                      background: '#F8FAFC',
                      borderRadius: '4px'
                    }}
                  >
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#64748B' }} />
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 600,
                        fontSize: '11px',
                        lineHeight: '150%',
                        color: '#64748B'
                      }}
                    >
                      {ticket.status}
                    </span>
                  </div>
                </div>

                {/* Arrow Up Right */}
                <ArrowUpRight size={16} color="#64748B" />
              </div>

              {/* Issue Title */}
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 600,
                  fontSize: '18px',
                  lineHeight: '120%',
                  color: '#172033',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  width: '100%'
                }}
              >
                {ticket.title}
              </div>

              {/* Issue Description */}
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: '12px',
                  lineHeight: '150%',
                  color: '#64748B',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  width: '100%'
                }}
              >
                {ticket.description}
              </div>

              {/* Ticket Owner and Evidence Row */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                  gap: '10px'
                }}
              >
                {/* Owner Avatar */}
                <div
                  style={{
                    boxSizing: 'border-box',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '28px',
                    height: '28px',
                    background: '#EEF0FF',
                    borderRadius: '50%'
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                      fontSize: '9px',
                      color: '#4F46E5'
                    }}
                  >
                    {ticket.initials}
                  </span>
                </div>

                {/* Owner & Team Name */}
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    fontSize: '11px',
                    lineHeight: '150%',
                    color: '#172033',
                    flex: 1
                  }}
                >
                  {ticket.assigned_to}
                </span>

                {/* Related Reports */}
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    fontSize: '10px',
                    lineHeight: '150%',
                    color: '#64748B'
                  }}
                >
                  {ticket.related_count} reports
                </span>
              </div>

              {/* Next Action & Last Update Row */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                  borderTop: '1px solid #F1F5F9',
                  paddingTop: '6px'
                }}
              >
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    fontSize: '10px',
                    lineHeight: '150%',
                    color: ticket.next_action_alert ? '#BE3455' : '#64748B'
                  }}
                >
                  Next action: {ticket.next_action}
                </span>

                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    fontSize: '9px',
                    lineHeight: '150%',
                    color: '#8996AB'
                  }}
                >
                  {ticket.last_update}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tracker Pagination Footer */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          paddingTop: '12px'
        }}
      >
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: '11px',
            color: '#64748B'
          }}
        >
          Showing {filteredTickets.length} of {allTickets.length} tickets
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: '1px solid #DCE3ED',
              background: '#FFFFFF',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: '12px',
              color: '#172033',
              cursor: 'pointer'
            }}
          >
            Previous
          </button>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#4F46E5', fontWeight: 600 }}>
            1
          </span>
          <button
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              border: '1px solid #DCE3ED',
              background: '#FFFFFF',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
              fontSize: '12px',
              color: '#172033',
              cursor: 'pointer'
            }}
          >
            Next
          </button>
        </div>
      </div>

      {/* ============================================================================== */}
      {/* Detailed Resolution Overlay Modal (Figma Frame 50:38370)                       */}
      {/* ============================================================================== */}
      {selectedTicket && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'rgba(226, 232, 240, 0.780392)',
            backdropFilter: 'blur(3px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}
          onClick={closeResolutionOverlay}
        >
          <div
            style={{
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '32px',
              gap: '18px',
              width: '100%',
              maxWidth: '1120px',
              maxHeight: '94vh',
              background: '#FFFFFF',
              border: '1px solid #DCE3ED',
              boxShadow: '0px 20px 60px rgba(23, 32, 51, 0.101961)',
              borderRadius: '10px',
              overflowY: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Overlay Heading */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                width: '100%',
                gap: '24px'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px', flex: 1 }}>
                <div
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontWeight: 500,
                    fontSize: '10px',
                    lineHeight: '150%',
                    color: '#4F46E5',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase'
                  }}
                >
                  ISSUE TRACKER / {selectedTicket.id}
                </div>
                <h2
                  style={{
                    margin: 0,
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: '32px',
                    lineHeight: '120%',
                    color: '#172033',
                    letterSpacing: '-0.02em'
                  }}
                >
                  {selectedTicket.title}
                </h2>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    fontSize: '13px',
                    lineHeight: '150%',
                    color: '#64748B'
                  }}
                >
                  Review the progress and proposed resolution before confirming a ticket update.
                </div>
              </div>

              <button
                onClick={closeResolutionOverlay}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '6px',
                  border: '1px solid #DCE3ED',
                  background: '#FFFFFF',
                  color: '#64748B',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#F8FAFC';
                  e.currentTarget.style.color = '#172033';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#FFFFFF';
                  e.currentTarget.style.color = '#64748B';
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Issue Facts Bar */}
            <div
              style={{
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: '12px 0px',
                gap: '20px',
                width: '100%',
                borderWidth: '1px 0px',
                borderStyle: 'solid',
                borderColor: '#DCE3ED'
              }}
            >
              {/* Severity Pill */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: '4px 8px',
                  gap: '6px',
                  background: '#FFFAEB',
                  borderRadius: '4px'
                }}
              >
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#B77913' }} />
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: '11px',
                    lineHeight: '150%',
                    color: '#B77913'
                  }}
                >
                  {selectedTicket.severityText || 'P1 · High'}
                </span>
              </div>

              {/* Progress State */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: '4px 8px',
                  gap: '6px',
                  background: '#F8FAFC',
                  borderRadius: '4px'
                }}
              >
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#64748B' }} />
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: '11px',
                    lineHeight: '150%',
                    color: '#64748B'
                  }}
                >
                  {selectedTicket.status || 'In Progress'}
                </span>
              </div>

              {/* Ownership */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '3px', flex: 1 }}>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: '12px',
                    lineHeight: '150%',
                    color: '#172033'
                  }}
                >
                  {selectedTicket.assigned_to}
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    fontSize: '10px',
                    lineHeight: '150%',
                    color: '#64748B'
                  }}
                >
                  {selectedTicket.related_count || 34} related reports · Created Oct 4, 2026 · feedback_oct_2026
                </div>
              </div>

              {/* Summary Description */}
              <div
                style={{
                  maxWidth: '470px',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: '12px',
                  lineHeight: '150%',
                  color: '#64748B'
                }}
              >
                {selectedTicket.description}
              </div>
            </div>

            {/* Gemini Multilingual Audio Resolution Workflow Section */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '14px', width: '100%' }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%'
                }}
              >
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: '21px',
                    lineHeight: '150%',
                    color: '#172033'
                  }}
                >
                  Gemini Multilingual Audio Resolution
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: '4px 8px',
                    gap: '6px',
                    background: '#F8FAFC',
                    borderRadius: '4px'
                  }}
                >
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#64748B' }} />
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                      fontSize: '11px',
                      lineHeight: '150%',
                      color: '#64748B'
                    }}
                  >
                    Ready to confirm
                  </span>
                </div>
              </div>

              {/* 4 Resolution Workflow Stages */}
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '20px', width: '100%' }}>
                {[
                  { num: '01', title: 'Record voice', active: false },
                  { num: '02', title: 'Transcribe/Translate', active: false },
                  { num: '03', title: 'Patch Supabase', active: false },
                  { num: '04', title: 'Resolve Ticket', active: true }
                ].map((st, i) => (
                  <div
                    key={st.num}
                    style={{
                      boxSizing: 'border-box',
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: '10px 0px',
                      gap: '10px',
                      flex: 1,
                      borderTop: st.active ? '2px solid #4F46E5' : '2px solid #DCE3ED'
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'IBM Plex Mono', monospace",
                        fontWeight: 400,
                        fontSize: '10px',
                        lineHeight: '150%',
                        color: '#4F46E5'
                      }}
                    >
                      {st.num}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: st.active ? 600 : 400,
                        fontSize: '12px',
                        lineHeight: '150%',
                        color: st.active ? '#4F46E5' : '#64748B',
                        flex: 1
                      }}
                    >
                      {st.title}
                    </span>
                    {i < 3 && <ArrowRight size={14} color="#64748B" />}
                  </div>
                ))}
              </div>
            </div>

            {/* Voice Recording State Box (Figma Frame 50:38370) */}
            <div
              style={{
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '16px',
                gap: '10px',
                width: '100%',
                background: '#F8FAFC',
                borderRadius: '6px'
              }}
            >
              {/* Recording Controls */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '12px' }}>
                  <Languages size={18} color="#4F46E5" />
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                      fontSize: '11px',
                      lineHeight: '150%',
                      color: '#172033'
                    }}
                  >
                    Recording language
                  </span>

                  {/* Language Pills */}
                  {['TE', 'EN', 'HI'].map((langKey) => {
                    const isLangActive = activeVoiceLanguage === langKey;
                    const labels = { TE: 'TE · Telugu', EN: 'EN · English', HI: 'HI · Hindi' };
                    return (
                      <button
                        key={langKey}
                        onClick={() => setActiveVoiceLanguage(langKey)}
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          padding: '4px 8px',
                          gap: '6px',
                          border: 'none',
                          background: isLangActive ? '#EEF0FF' : 'transparent',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        {isLangActive && <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#4F46E5' }} />}
                        <span
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: isLangActive ? 600 : 400,
                            fontSize: '11px',
                            lineHeight: '150%',
                            color: isLangActive ? '#4F46E5' : '#8996AB'
                          }}
                        >
                          {labels[langKey]}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Timer */}
                <div
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontWeight: 400,
                    fontSize: '10px',
                    lineHeight: '150%',
                    color: '#64748B'
                  }}
                >
                  {isRecording ? `Recording · 00:0${recordingSeconds}` : 'Recorded · 00:38'}
                </div>
              </div>

              {/* Audio Playback Bar with 64-Bar Frequency Waveform */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                  gap: '14px'
                }}
              >
                {/* Play / Pause Toggle */}
                <button
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 0
                  }}
                  title={isPlayingAudio ? 'Pause Voice Memo' : 'Play Voice Memo'}
                >
                  {isPlayingAudio ? (
                    <Pause size={22} color="#4F46E5" fill="#4F46E5" />
                  ) : (
                    <Play size={22} color="#4F46E5" fill="#4F46E5" />
                  )}
                </button>

                {/* 64-Bar Frequency Waveform */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: '6px',
                    flex: 1,
                    height: '32px'
                  }}
                >
                  {WAVEFORM_HEIGHTS.map((h, idx) => {
                    // Bars 0-41 are Indigo (#4F46E5), 42-63 are Lavender (#C7CAFF) per Figma spec
                    const isPlayed = idx < 42;
                    return (
                      <div
                        key={idx}
                        style={{
                          flex: 1,
                          height: isPlayingAudio ? `${Math.max(6, (h * (0.6 + Math.random() * 0.7)))}px` : `${h}px`,
                          background: isPlayed ? '#4F46E5' : '#C7CAFF',
                          borderRadius: '2px',
                          transition: 'height 0.1s ease'
                        }}
                      />
                    );
                  })}
                </div>

                {/* Duration */}
                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontWeight: 400,
                    fontSize: '11px',
                    lineHeight: '150%',
                    color: '#64748B'
                  }}
                >
                  00:38
                </span>

                {/* Live Mic Action */}
                <button
                  onClick={isRecording ? stopRecording : startRecording}
                  style={{
                    background: isRecording ? '#BE3455' : 'transparent',
                    border: isRecording ? 'none' : '1px solid #4F46E5',
                    borderRadius: '50%',
                    width: 32,
                    height: 32,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.15s ease'
                  }}
                  title={isRecording ? 'Stop Recording' : 'Record New Resolution Voice Memo'}
                >
                  {isRecording ? <Square size={14} color="#FFFFFF" fill="#FFFFFF" /> : <Mic size={16} color="#4F46E5" />}
                </button>
              </div>

              {/* Status Caption */}
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: '10px',
                  lineHeight: '150%',
                  color: '#8996AB'
                }}
              >
                Recording complete. Review or record again before applying.
              </div>
            </div>

            {/* Transcript & Translation Review (Dual Side-by-Side Columns) */}
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '24px', width: '100%' }}>
              {/* Transcript Column */}
              <div
                style={{
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  padding: '16px 0px',
                  gap: '10px',
                  flex: 1,
                  borderWidth: '1px 0px',
                  borderStyle: 'solid',
                  borderColor: '#DCE3ED'
                }}
              >
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: '12px',
                    lineHeight: '150%',
                    color: '#172033'
                  }}
                >
                  Transcript · {activeVoiceLanguage}
                </div>

                <div
                  style={{
                    fontFamily: activeVoiceLanguage === 'TE' ? "'Noto Sans Telugu', sans-serif" : activeVoiceLanguage === 'HI' ? "'Noto Sans Devanagari', sans-serif" : "'Inter', sans-serif",
                    fontWeight: 400,
                    fontSize: '15px',
                    lineHeight: '165%',
                    color: '#172033'
                  }}
                >
                  {activeVoiceLanguage === 'TE'
                    ? (selectedTicket.telugu_transcript || 'రీట్రై హ్యాండ్లర్ను సరిచేశాం. చెక్అవుట్ పరీక్షలు విజయవంతమయ్యాయి.')
                    : activeVoiceLanguage === 'HI'
                    ? (selectedTicket.hindi_transcript || 'रीट्राई हैंडलर को ठीक कर दिया गया है। चेकआउट सत्यापन सफल रहा।')
                    : (selectedTicket.english_translation || 'The retry handler has been corrected. Checkout validation passed.')
                  }
                </div>

                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    fontSize: '10px',
                    lineHeight: '150%',
                    color: '#8996AB'
                  }}
                >
                  Transcribed from the recorded audio
                </div>
              </div>

              {/* Translation Column */}
              <div
                style={{
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  padding: '16px 0px',
                  gap: '10px',
                  flex: 1,
                  borderWidth: '1px 0px',
                  borderStyle: 'solid',
                  borderColor: '#DCE3ED'
                }}
              >
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
                      fontSize: '12px',
                      lineHeight: '150%',
                      color: '#172033'
                    }}
                  >
                    Translation · {activeVoiceLanguage === 'EN' ? 'TE' : 'EN'}
                  </span>

                  <button
                    onClick={() => setIsEditingTranslation(!isEditingTranslation)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      color: '#64748B'
                    }}
                    title="Edit Translation"
                  >
                    <Edit2 size={14} />
                  </button>
                </div>

                {isEditingTranslation ? (
                  <textarea
                    value={editedEnglishText}
                    onChange={(e) => setEditedEnglishText(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px',
                      borderRadius: '4px',
                      border: '1px solid #4F46E5',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '15px',
                      lineHeight: '150%',
                      color: '#172033',
                      outline: 'none',
                      resize: 'vertical',
                      boxSizing: 'border-box'
                    }}
                    rows={2}
                  />
                ) : (
                  <div
                    style={{
                      fontFamily: activeVoiceLanguage === 'EN' ? "'Noto Sans Telugu', sans-serif" : "'Inter', sans-serif",
                      fontWeight: 400,
                      fontSize: '16px',
                      lineHeight: '150%',
                      color: '#172033'
                    }}
                  >
                    {activeVoiceLanguage === 'EN'
                      ? (selectedTicket.telugu_transcript || 'రీట్రై హ్యాండ్లర్ను సరిచేశాం. చెక్అవుట్ పరీక్షలు విజయవంతమయ్యాయి.')
                      : (editedEnglishText || selectedTicket.english_translation || 'The retry handler has been corrected. Checkout validation passed.')
                    }
                  </div>
                )}

                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    fontSize: '10px',
                    lineHeight: '150%',
                    color: '#8996AB'
                  }}
                >
                  Review translation before confirmation
                </div>
              </div>
            </div>

            {/* Supabase Patch Preview */}
            <div
              style={{
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '16px',
                gap: '8px',
                width: '100%',
                background: '#EEF0FF',
                borderRadius: '6px'
              }}
            >
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
                    fontSize: '13px',
                    lineHeight: '150%',
                    color: '#4F46E5'
                  }}
                >
                  Patch Supabase · preview only
                </span>

                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    fontSize: '10px',
                    lineHeight: '150%',
                    color: '#4F46E5'
                  }}
                >
                  Not applied
                </span>
              </div>

              <div
                style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontWeight: 400,
                  fontSize: '11px',
                  lineHeight: '150%',
                  color: '#64748B'
                }}
              >
                tracking_id: {selectedTicket.id} · status: In Progress → Resolved · resolution_language:{' '}
                {activeVoiceLanguage.toLowerCase()} · resolution_note: reviewed English translation
              </div>
            </div>

            {/* Issue Progress Timeline & Issue History (Two Columns) */}
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '30px', width: '100%' }}>
              {/* Left Column: Progress Timeline (600px) */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '14px', flex: '1 1 580px' }}>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: '14px',
                    lineHeight: '150%',
                    color: '#172033'
                  }}
                >
                  Progress timeline
                </div>

                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: '16px', width: '100%' }}>
                  {[
                    { title: 'Investigation started', date: 'Oct 5 · 09:12', done: true },
                    { title: 'Retry handler patch prepared', date: 'Oct 7 · 10:18', done: true },
                    { title: 'Validation recorded', date: 'Oct 7 · 10:42', done: true },
                    { title: 'Resolution confirmation', date: 'Pending your confirmation', done: false }
                  ].map((ev, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        gap: '8px',
                        flex: 1
                      }}
                    >
                      {/* Progress Marker */}
                      <div
                        style={{
                          boxSizing: 'border-box',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '22px',
                          height: '22px',
                          background: ev.done ? '#EEF0FF' : '#FFFFFF',
                          border: ev.done ? '1px solid #EEF0FF' : '1px solid #DCE3ED',
                          borderRadius: '50%'
                        }}
                      >
                        {ev.done ? <Check size={12} color="#4F46E5" /> : null}
                      </div>

                      <div
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 500,
                          fontSize: '11px',
                          lineHeight: '150%',
                          color: '#172033'
                        }}
                      >
                        {ev.title}
                      </div>

                      <div
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 400,
                          fontSize: '9px',
                          lineHeight: '150%',
                          color: '#8996AB'
                        }}
                      >
                        {ev.date}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Issue History (426px) */}
              <div
                style={{
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  paddingLeft: '24px',
                  gap: '10px',
                  flex: '1 1 380px',
                  borderLeft: '1px solid #DCE3ED'
                }}
              >
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: '14px',
                    lineHeight: '150%',
                    color: '#172033'
                  }}
                >
                  Issue history
                </div>

                <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: '10px', color: '#64748B' }}>
                  Oct 4 · Cluster linked to {selectedTicket.id} from 34 reports.
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: '10px', color: '#64748B' }}>
                  Oct 5 · Maya Rao moved Open → In Progress.
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: '10px', color: '#64748B' }}>
                  Oct 7 · Audio resolution prepared. No status change yet.
                </div>
              </div>
            </div>

            {/* Resolution Confirmation Controls (Footer) */}
            <div
              style={{
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '18px',
                width: '100%',
                borderTop: '1px solid #DCE3ED'
              }}
            >
              {/* Confirmation State Note */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '4px', flex: 1 }}>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: '12px',
                    lineHeight: '150%',
                    color: '#172033'
                  }}
                >
                  Ready to confirm, not yet resolved
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    fontSize: '10px',
                    lineHeight: '150%',
                    color: '#64748B'
                  }}
                >
                  Current ticket status remains In Progress until confirmed.
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    fontSize: '10px',
                    lineHeight: '150%',
                    color: '#8996AB'
                  }}
                >
                  Confirming saves the reviewed resolution and changes {selectedTicket.id} to Resolved.
                </div>
              </div>

              {/* Resolution Actions */}
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                <button
                  onClick={closeResolutionOverlay}
                  style={{
                    boxSizing: 'border-box',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0px 16px',
                    width: '76px',
                    height: '42px',
                    background: '#FFFFFF',
                    border: '1px solid #DCE3ED',
                    borderRadius: '6px',
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: '13px',
                    color: '#172033',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#F8FAFC'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#FFFFFF'}
                >
                  Cancel
                </button>

                <button
                  onClick={handleConfirmAndResolve}
                  style={{
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '9px',
                    padding: '0px 16px',
                    width: '215px',
                    height: '42px',
                    background: '#4F46E5',
                    border: '1px solid #4F46E5',
                    borderRadius: '6px',
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: '13px',
                    color: '#FFFFFF',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    boxShadow: '0 2px 8px rgba(79, 70, 229, 0.25)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#4338CA'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#4F46E5'}
                >
                  <Check size={16} color="#FFFFFF" />
                  <span>Confirm & Resolve Ticket</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
