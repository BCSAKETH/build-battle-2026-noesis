import React, { createContext, useContext, useState, useEffect } from 'react';
import i18n from '../i18n/i18n';
import { supabase } from '../supabase';

const SettingsContext = createContext({
  appearance: 'Standard', // 'Compact' | 'Standard' | 'Expanded'
  workspaceScale: 'Balanced', // 'Focused' | 'Balanced' | 'FullCanvas'
  theme: 'light',
  language: 'en',
  setAppearance: () => { },
  setWorkspaceScale: () => { },
  setLanguage: () => { },
  setTheme: () => { },
  getScaleWidth: () => '65%',
  getDensityStyles: () => ({})
});

export function SettingsProvider({ children }) {
  // 1. Appearance Layout Density: 'Compact' (32px rows), 'Balanced' (48px rows), 'Spacious' (64px rows)
  const [appearance, setAppearanceState] = useState(() => {
    return localStorage.getItem('noesis_appearance') || 'Balanced';
  });

  // 2. Workspace Scale: 'Compact' (1024px · 70%), 'Standard' (1280px · 85%), 'Wide' (1440px · 100%)
  const [workspaceScale, setWorkspaceScaleState] = useState(() => {
    return localStorage.getItem('noesis_workspace_scale') || 'Wide';
  });

  // 3. Theme: Strictly Light Palette per Executive Directive
  const [theme, setThemeState] = useState(() => {
    return localStorage.getItem('noesis_theme') || 'light';
  });

  // 4. Language: 'en' | 'te' | 'hi'
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('noesis_lang') || 'en';
  });

  // Sync layout attributes and CSS custom properties on document element
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-appearance', appearance.toLowerCase());
    localStorage.setItem('noesis_appearance', appearance);

    // Apply typography scale & row spacing variables
    if (appearance === 'Compact') {
      root.style.setProperty('--app-font-scale', '0.88');
      root.style.setProperty('--app-row-height', '32px');
      root.style.setProperty('--app-density-padding', '8px');
    } else if (appearance === 'Spacious') {
      root.style.setProperty('--app-font-scale', '1.12');
      root.style.setProperty('--app-row-height', '64px');
      root.style.setProperty('--app-density-padding', '24px');
    } else {
      root.style.setProperty('--app-font-scale', '1.0');
      root.style.setProperty('--app-row-height', '48px');
      root.style.setProperty('--app-density-padding', '16px');
    }
  }, [appearance]);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-scale', workspaceScale.toLowerCase());
    localStorage.setItem('noesis_workspace_scale', workspaceScale);

    if (workspaceScale === 'Compact') {
      root.style.setProperty('--app-workspace-max-width', '1024px');
      root.style.setProperty('--app-workspace-pct', '70%');
    } else if (workspaceScale === 'Standard') {
      root.style.setProperty('--app-workspace-max-width', '1280px');
      root.style.setProperty('--app-workspace-pct', '85%');
    } else {
      root.style.setProperty('--app-workspace-max-width', '1440px');
      root.style.setProperty('--app-workspace-pct', '100%');
    }
  }, [workspaceScale]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('noesis_theme', theme);
  }, [theme]);

  useEffect(() => {
    i18n.changeLanguage(language);
    localStorage.setItem('noesis_lang', language);
  }, [language]);

  // Synchronize settings with Supabase user profile metadata if authenticated
  useEffect(() => {
    async function loadRemotePreferences() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user?.user_metadata) {
          const meta = session.user.user_metadata;
          if (meta.appearance) setAppearanceState(meta.appearance);
          if (meta.workspaceScale) setWorkspaceScaleState(meta.workspaceScale);
          if (meta.language) setLanguageState(meta.language);
        }
      } catch (err) {
        // Non-blocking fallback
      }
    }
    loadRemotePreferences();
  }, []);

  const setAppearance = async (val) => {
    setAppearanceState(val);
    localStorage.setItem('noesis_appearance', val);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        await supabase.auth.updateUser({ data: { appearance: val } });
      }
    } catch (e) {
      // Non-blocking fallback
    }
  };

  const setWorkspaceScale = async (val) => {
    setWorkspaceScaleState(val);
    localStorage.setItem('noesis_workspace_scale', val);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        await supabase.auth.updateUser({ data: { workspaceScale: val } });
      }
    } catch (e) {
      // Non-blocking fallback
    }
  };

  const setLanguage = async (newLang) => {
    setLanguageState(newLang);
    localStorage.setItem('noesis_lang', newLang);
    i18n.changeLanguage(newLang);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        await supabase.auth.updateUser({ data: { language: newLang } });
      }
    } catch (e) {
      // Non-blocking fallback
    }
  };

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
    localStorage.setItem('noesis_theme', newTheme);
  };

  // Helper function: returns calculated container max-width string
  const getScaleWidth = () => {
    switch (workspaceScale) {
      case 'Compact':
        return '1024px';
      case 'Standard':
        return '1280px';
      case 'Wide':
      default:
        return '1440px';
    }
  };

  // Helper function: returns layout padding/gap styles based on appearance
  const getDensityStyles = () => {
    switch (appearance) {
      case 'Compact':
        return { padding: '0.75rem', gap: '0.75rem', fontSize: '0.82rem', rowHeight: '32px' };
      case 'Spacious':
        return { padding: '2.5rem', gap: '2rem', fontSize: '1.05rem', rowHeight: '64px' };
      case 'Balanced':
      default:
        return { padding: '1.5rem', gap: '1.25rem', fontSize: '0.92rem', rowHeight: '48px' };
    }
  };

  return (
    <SettingsContext.Provider
      value={{
        appearance,
        workspaceScale,
        theme,
        language,
        setAppearance,
        setWorkspaceScale,
        setLanguage,
        setTheme,
        getScaleWidth,
        getDensityStyles
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
