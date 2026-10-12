import React from 'react';

/**
 * CloudSyncLoader
 * From Uiverse.io by andrew-manzyk
 * Used for Dataset Upload & Groq Ingestion Pipeline sync state.
 */
export function CloudSyncLoader({ text = 'Living Data Conditioning In Progress...', scale = 0.85 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '1rem' }}>
      <div
        className="cloud-loader-wrapper"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'center center'
        }}
      >
        <div className="loader">
          <svg id="cloud" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <g id="shapes">
              <g>
                <circle cx="20" cy="60" r="15" fill="#4387f4" />
                <circle cx="50" cy="45" r="20" fill="#4387f4" />
                <circle cx="80" cy="60" r="15" fill="#4387f4" />
              </g>
            </g>
            <rect x="20" y="60" width="60" height="15" fill="#4387f4" />
            <g id="arrows">
              <path
                d="M50 48 L44 54 H48 V66 H52 V54 H56 Z"
                fill="#80b1ff"
              />
              <path
                d="M50 78 L56 72 H52 V60 H48 V72 H44 Z"
                fill="#80b1ff"
              />
            </g>
            <g id="lines">
              <g>
                <line x1="15" y1="80" x2="25" y2="92" stroke="#80b1ff" />
                <line x1="45" y1="80" x2="55" y2="92" stroke="#80b1ff" />
                <line x1="75" y1="80" x2="85" y2="92" stroke="#80b1ff" />
              </g>
            </g>
          </svg>
        </div>
      </div>

      {text && (
        <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#334155', textAlign: 'center' }}>
          {text}
        </div>
      )}

      <style>{`
        .loader {
          --cloud-color: #4f46e5;
          --arrows-color: #818cf8;
          --time-animation: 1.2s;
          display: inline-block;
        }

        .loader #cloud {
          width: 90px;
          height: 90px;
        }

        .loader #cloud rect {
          fill: var(--cloud-color);
        }

        .loader #cloud #arrows {
          transform-origin: 50% 63%;
          fill: var(--arrows-color);
          filter: drop-shadow(0 0 4px rgba(79, 70, 229, 0.4));
          animation: rotation var(--time-animation) linear infinite;
        }

        .loader #shapes g circle {
          animation: cloud calc(var(--time-animation) * 2) linear infinite;
          fill: var(--cloud-color);
        }

        .loader #shapes g circle:nth-child(2) {
          animation-delay: calc((var(--time-animation) * 2) / -3);
        }

        .loader #shapes g circle:nth-child(3) {
          animation-delay: calc((var(--time-animation) * 2) / -1.5);
        }

        .loader #lines g line {
          stroke-width: 4;
          stroke: var(--arrows-color);
          transform-origin: 50% 50%;
          animation: lines calc(var(--time-animation) / 1.33) linear infinite;
        }

        @keyframes rotation {
          0% { transform: rotate(0deg); }
          50% { transform: rotate(180deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes lines {
          0% { transform: translateY(-6px); opacity: 0.2; }
          50% { opacity: 1; }
          100% { transform: translateY(6px); opacity: 0.2; }
        }

        @keyframes cloud {
          0% { cx: 20; cy: 60; r: 15; }
          50% { cx: 50; cy: 45; r: 20; }
          100% { cx: 80; cy: 60; r: 15; }
        }
      `}</style>
    </div>
  );
}

export default CloudSyncLoader;
