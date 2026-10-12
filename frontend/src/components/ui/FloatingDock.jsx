import React from 'react';
import { Sparkles, LayoutDashboard, Target, Kanban, UploadCloud } from 'lucide-react';

/**
 * FloatingDock
 * From Uiverse.io by mymiamo
 * Executive Liquid Glass floating menu for rapid view switching and judge evaluation.
 */
export function FloatingDock({ activeRoute, onNavigate, onOpenUpload }) {
  const items = [
    { id: 'copilot', label: 'Copilot', icon: Sparkles },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'decision', label: 'Decisions', icon: Target },
    { id: 'issues', label: 'Tracker', icon: Kanban },
  ];

  return (
    <div className="floating-dock-wrapper">
      <nav className="glass-menu">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeRoute === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`dock-item ${isActive ? 'active' : ''}`}
              title={item.label}
              type="button"
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}

        {onOpenUpload && (
          <button
            onClick={onOpenUpload}
            className="dock-item upload-btn"
            title="Upload Dataset"
            type="button"
          >
            <UploadCloud size={18} />
            <span>Upload</span>
          </button>
        )}
      </nav>

      <style>{`
        .floating-dock-wrapper {
          position: fixed;
          left: 50%;
          bottom: 24px;
          transform: translateX(-50%);
          z-index: 100;
          pointer-events: auto;
        }

        .glass-menu {
          width: auto;
          min-width: 380px;
          backdrop-filter: blur(16px) saturate(180%) contrast(150%);
          -webkit-backdrop-filter: blur(16px) saturate(180%) contrast(150%);
          background: rgba(255, 255, 255, 0.85);
          border: 1px solid rgba(226, 232, 240, 0.8);
          box-shadow: 0 14px 35px -5px rgba(15, 23, 42, 0.15), 0 0 0 1px rgba(79, 70, 229, 0.08);
          padding: 6px 10px;
          border-radius: 99rem;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 6px;
          position: relative;
        }

        .glass-menu::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          box-shadow:
            inset 1px 1px 3px rgba(255, 255, 255, 0.8),
            inset -1px -1px 3px rgba(79, 70, 229, 0.05);
          pointer-events: none;
          z-index: -1;
        }

        .dock-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 7px 14px;
          border-radius: 999rem;
          border: none;
          background: transparent;
          cursor: pointer;
          color: #64748b;
          text-decoration: none;
          transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .dock-item svg {
          transition: transform 0.2s ease;
        }

        .dock-item span {
          font-size: 0.68rem;
          font-weight: 700;
          margin-top: 3px;
          letter-spacing: -0.01em;
        }

        .dock-item:hover {
          background-color: rgba(79, 70, 229, 0.08);
          color: #4f46e5;
          transform: translateY(-2px) scale(1.05);
        }

        .dock-item.active {
          background: #4f46e5;
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(79, 70, 229, 0.35);
        }

        .dock-item.upload-btn {
          color: #059669;
        }

        .dock-item.upload-btn:hover {
          background-color: rgba(16, 185, 129, 0.1);
          color: #059669;
        }
      `}</style>
    </div>
  );
}

export default FloatingDock;
