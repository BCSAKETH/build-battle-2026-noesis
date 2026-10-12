import React from 'react';

/**
 * EqualizerLoader / WaveformLoader
 * From Uiverse.io by satyamchaudharydev
 * Harmonic audio-frequency visualizer loader with alternating staggered scale bars.
 */
export default function EqualizerLoader({
  scale = 1,
  height = 50,
  speed = '0.9s',
  gap = 6,
  colors = ['#4c86f9', '#49a84c', '#f6bb02', '#f6bb02', '#2196f3'],
  style = {}
}) {
  return (
    <div
      className="uiverse-equalizer-loading"
      style={{
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: `${gap}px`,
        height: `${height}px`,
        transform: scale !== 1 ? `scale(${scale})` : undefined,
        transformOrigin: 'center center',
        ...style
      }}
    >
      <span style={{ '--bar-color': colors[0] || '#4c86f9', '--delay': '0s' }} />
      <span style={{ '--bar-color': colors[1] || '#49a84c', '--delay': '-0.8s' }} />
      <span style={{ '--bar-color': colors[2] || '#f6bb02', '--delay': '-0.7s' }} />
      <span style={{ '--bar-color': colors[3] || '#f6bb02', '--delay': '-0.6s' }} />
      <span style={{ '--bar-color': colors[4] || '#2196f3', '--delay': '-0.5s' }} />

      <style>{`
        .uiverse-equalizer-loading span {
          width: 4px;
          height: ${height}px;
          border-radius: 2px;
          background: var(--bar-color);
          animation: equalizer-scale ${speed} ease-in-out infinite;
          animation-delay: var(--delay);
          display: inline-block;
        }

        @keyframes equalizer-scale {
          0%, 40%, 100% {
            transform: scaleY(0.08);
          }
          20% {
            transform: scaleY(1);
          }
        }
      `}</style>
    </div>
  );
}

export { EqualizerLoader as WaveformLoader };
