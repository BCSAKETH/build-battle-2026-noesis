import React, { useState } from 'react';
import { Sparkles, ArrowRight, Bot, TrendingUp } from 'lucide-react';

/**
 * DovetailFeatureCard (Inspired by User-Provided Reference Image 4: @magicui-pro/animated-feature-card-3)
 * Dovetail-inspired customer feedback intelligence card with interactive hover lift,
 * 'Make it Pop ✨' badge, animated customer voice pill, and AI Co-Pilot synthesis.
 */
export default function DovetailFeatureCard({
  tag = 'Make it Pop ✨',
  author = 'Sarah Jenkins',
  role = 'Head of Product · FinTech',
  avatarGradient = 'linear-gradient(135deg, #EC4899 0%, #F59E0B 100%)',
  quote = 'Noesis turned 7,002 chaotic customer complaints into 5 actionable engineering tickets in under 30 seconds.',
  title = 'AI Co-Pilot',
  subtitle = 'Use AI to transform unconditioned voices into mathematically triaged directives'
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: '100%',
        maxWidth: '460px',
        background: '#FFFFFF',
        borderRadius: '16px',
        border: '1px solid #E2E8F0',
        padding: '24px 20px 20px',
        boxShadow: isHovered
          ? '0 20px 40px -8px rgba(15, 23, 42, 0.1), 0 8px 16px -4px rgba(15, 23, 42, 0.04)'
          : '0 4px 20px -2px rgba(15, 23, 42, 0.04)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        position: 'relative',
        boxSizing: 'border-box'
      }}
    >
      {/* Top Floating Badge ("Make it Pop ✨") */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 12px',
          borderRadius: '9999px',
          background: '#F8FAFC',
          border: '1px solid #E2E8F0',
          fontSize: '12px',
          fontWeight: 600,
          color: '#334155',
          boxShadow: '0 1px 3px rgba(15, 23, 42, 0.05)',
          transition: 'transform 0.2s ease',
          transform: isHovered ? 'scale(1.04)' : 'scale(1)'
        }}
      >
        <span>{tag}</span>
      </div>

      {/* Embedded Customer Voice Testimonial Bubble */}
      <div
        style={{
          width: '100%',
          background: '#FFFFFF',
          borderRadius: '12px',
          border: '1px solid #E2E8F0',
          padding: '16px',
          boxShadow: '0 2px 8px rgba(15, 23, 42, 0.03)',
          display: 'flex',
          gap: '12px',
          alignItems: 'flex-start',
          boxSizing: 'border-box'
        }}
      >
        {/* Colorful Avatar Circle */}
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: '50%',
            background: avatarGradient,
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            fontWeight: 800,
            fontSize: '14px',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)'
          }}
        >
          {author.charAt(0)}
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '4px' }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '14px', color: '#0F172A' }}>
              {author}
            </span>
            <span style={{ fontSize: '11px', color: '#64748B' }}>
              • {role}
            </span>
          </div>

          <p
            style={{
              margin: 0,
              fontFamily: "'Inter', sans-serif",
              fontSize: '12px',
              lineHeight: 1.5,
              color: '#334155'
            }}
          >
            {quote}
          </p>
        </div>
      </div>

      {/* Card Base: Title & Subtitle */}
      <div style={{ width: '100%', textAlign: 'left', paddingTop: '4px' }}>
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            fontSize: '18px',
            color: '#0F172A',
            letterSpacing: '-0.02em',
            marginBottom: '4px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span>{title}</span>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4F46E5' }} />
        </div>
        <p
          style={{
            margin: 0,
            fontFamily: "'Inter', sans-serif",
            fontSize: '13px',
            lineHeight: 1.5,
            color: '#64748B'
          }}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}
