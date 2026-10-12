import React from 'react';

/**
 * CloudSyncLoader (From Uiverse.io by andrew-manzyk)
 * Cloud sync animation with spinning arrows, dynamic morphing cloud bubbles, and streaming lines.
 */
export default function CloudSyncLoader({
  scale = 1,
  cloudColor = '#4387f4',
  arrowsColor = '#80b1ff',
  timeAnimation = '1s',
  className = ''
}) {
  return (
    <div
      className={`cloud-sync-loader-wrapper ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `scale(${scale})`,
        transformOrigin: 'center center'
      }}
    >
      <style>{`
        .cloud-sync-loader {
          --cloud-color: ${cloudColor};
          --arrows-color: ${arrowsColor};
          --time-animation: ${timeAnimation};
          position: relative;
          width: 100px;
          height: 100px;
        }

        .cloud-sync-loader #cloud {
          width: 100px;
          height: 100px;
        }

        .cloud-sync-loader #cloud rect {
          fill: var(--cloud-color);
        }

        .cloud-sync-loader #cloud g:nth-child(3) {
          transform-origin: 50% 72.8938%;
          fill: var(--arrows-color);
          filter: drop-shadow(0 0 6px rgba(67, 135, 244, 0.5));
          animation: cloud-sync-rotation var(--time-animation) linear infinite;
        }

        .cloud-sync-loader #shapes g g circle {
          animation: cloud-sync-cloud calc(var(--time-animation) * 2) linear infinite;
          fill: var(--cloud-color);
        }

        .cloud-sync-loader #shapes g g circle:nth-child(2) {
          animation-delay: calc((var(--time-animation) * 2) / -3);
        }

        .cloud-sync-loader #shapes g g circle:nth-child(3) {
          animation-delay: calc((var(--time-animation) * 2) / -1.5);
        }

        .cloud-sync-loader svg #lines g line {
          stroke: var(--arrows-color);
          stroke-width: 4;
          transform-origin: 50% 50%;
          rotate: -65deg;
          animation: cloud-sync-lines calc(var(--time-animation) / 1.33) linear infinite;
        }

        @keyframes cloud-sync-rotation {
          0% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(180deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes cloud-sync-lines {
          0% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(8px);
          }
        }

        @keyframes cloud-sync-cloud {
          0% {
            cx: 25px;
            cy: 58px;
            r: 14px;
          }
          50% {
            cx: 50px;
            cy: 42px;
            r: 19px;
          }
          100% {
            cx: 75px;
            cy: 58px;
            r: 14px;
          }
        }
      `}</style>

      <div className="cloud-sync-loader">
        <svg id="cloud" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="shapes">
            <g>
              <circle cx="25" cy="58" r="14" />
              <circle cx="50" cy="42" r="19" />
              <circle cx="75" cy="58" r="14" />
            </g>
          </g>
          <rect x="25" y="55" width="50" height="18" rx="8" />
          {/* Rotating Sync Arrows Icon */}
          <g>
            <path
              d="M50 63a9.5 9.5 0 0 1 8.5 5.5l2.2-1.3v5.8h-5.8l2.3-1.4A6.8 6.8 0 1 0 50 76.8v2.7A9.5 9.5 0 1 1 50 63z"
            />
          </g>
        </svg>

        <svg
          id="lines"
          viewBox="0 0 100 100"
          style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <line x1="30" y1="30" x2="30" y2="44" strokeLinecap="round" />
            <line x1="50" y1="20" x2="50" y2="34" strokeLinecap="round" />
            <line x1="70" y1="30" x2="70" y2="44" strokeLinecap="round" />
          </g>
        </svg>
      </div>
    </div>
  );
}
