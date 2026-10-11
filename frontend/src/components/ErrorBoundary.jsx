import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Captured by NOESIS ErrorBoundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    } else {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '3.5rem 1.5rem',
            background: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #fecdd3',
            boxShadow: '0 4px 20px -2px rgba(225, 29, 72, 0.08)',
            margin: '2rem auto',
            maxWidth: '640px',
            textAlign: 'center'
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: '50%',
              background: '#fff1f2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.25rem',
              color: '#be123c',
              border: '1px solid #fecdd3'
            }}
          >
            <AlertTriangle size={26} />
          </div>

          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
            Telemetry Teleport Resumed
          </h3>

          <p style={{ fontSize: '0.88rem', color: '#64748b', maxWidth: '440px', lineHeight: 1.55, marginBottom: '1.5rem' }}>
            NOESIS cognitive engine encountered an unexpected rendering anomaly while evaluating the query. Your workspace and Supabase connections remain fully active.
          </p>

          <button
            onClick={this.handleReset}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: '#4f46e5',
              color: '#ffffff',
              border: 'none',
              padding: '0.65rem 1.35rem',
              borderRadius: '8px',
              fontSize: '0.85rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(79, 70, 229, 0.3)'
            }}
          >
            <RefreshCw size={15} />
            Reset Workspace View
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
