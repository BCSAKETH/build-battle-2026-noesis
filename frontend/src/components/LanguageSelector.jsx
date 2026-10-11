import React from 'react';
import { useSettings } from '../context/SettingsContext';
import { Globe } from 'lucide-react';

const LANGUAGES = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'te', label: 'తెలుగు', short: 'తె' },
  { code: 'hi', label: 'हिन्दी', short: 'हि' }
];

export default function LanguageSelector({ variant = 'default' }) {
  const { language, setLanguage } = useSettings();

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.2rem 0.35rem', boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}>
      <Globe size={14} color="#64748b" style={{ marginLeft: '0.25rem' }} />
      <div style={{ display: 'flex', gap: '0.2rem' }}>
        {LANGUAGES.map((lang) => {
          const active = language === lang.code;
          return (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              style={{
                border: 'none',
                background: active ? '#4f46e5' : 'transparent',
                color: active ? '#ffffff' : '#64748b',
                fontWeight: active ? 700 : 500,
                fontSize: '0.75rem',
                padding: '0.2rem 0.45rem',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              title={lang.label}
            >
              {lang.short}
            </button>
          );
        })}
      </div>
    </div>
  );
}
