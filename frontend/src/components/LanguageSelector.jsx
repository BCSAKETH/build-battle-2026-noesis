import React from 'react';
import { useSettings } from '../context/SettingsContext';

const LANGUAGES = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'te', label: 'Telugu', short: 'TE' },
  { code: 'hi', label: 'Hindi', short: 'HI' }
];

/**
 * LanguageSelector matching Figma Frame 50:38765 specification:
 * - width: 113px, height: 35px, border: 1px solid #DCE3ED, border-radius: 6px
 * - segmented buttons 35x29px, active #EEF0FF / #4F46E5, inactive #FFFFFF / #64748B
 */
export default function LanguageSelector() {
  const { language, setLanguage } = useSettings();

  return (
    <div
      style={{
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '3px',
        gap: '3px',
        width: '113px',
        height: '35px',
        background: '#FFFFFF',
        border: '1px solid #DCE3ED',
        borderRadius: '6px'
      }}
    >
      {LANGUAGES.map((lang) => {
        const active = language === lang.code;
        return (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            style={{
              flex: 1,
              height: '29px',
              border: 'none',
              borderRadius: '4px',
              background: active ? '#EEF0FF' : '#FFFFFF',
              color: active ? '#4F46E5' : '#64748B',
              fontFamily: "'Inter', sans-serif",
              fontStyle: 'normal',
              fontWeight: 600,
              fontSize: '11px',
              lineHeight: '150%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0',
              transition: 'all 0.15s ease'
            }}
            title={lang.label}
          >
            {lang.short}
          </button>
        );
      })}
    </div>
  );
}
