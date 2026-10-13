import React from 'react';
import NoesisSignatureLogo from './ui/NoesisSignatureLogo';

/**
 * NoesisLogo — Canonical adapter rendering the official unified NoesisSignatureLogo mark.
 */
export default function NoesisLogo({ height = 38, showTagline = true, showBadge = true, className = '', onClick }) {
  return (
    <NoesisSignatureLogo
      size={height}
      showBadge={showBadge}
      showText={true}
      className={className}
      onClick={onClick}
    />
  );
}
