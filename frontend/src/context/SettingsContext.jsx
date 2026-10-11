import React, { createContext, useContext, useState, useEffect } from 'react';
import i18n from '../i18n/i18n';
import { supabase } from '../supabase';

const SettingsContext = createContext({
  appearance: 'Standard', // 'Compact' | 'Standard' | 'Expanded'
  workspaceScale: 'Balanced', // 'Focused' | 'Balanced' | 'FullCanvas'
  theme: 'light',
  language: 'en',
  setAppearance: () => {},
  setWorkspaceScale: () => {},
  setLanguage: () => {},
  setTheme: () => {},
  getScaleWidth: () => '65%',
  getDensityStyles: () => ({})
});

export function SettingsProvider({ children }) {
  // 1. Appearance Layout Density: 'Compact' (dense), 'Standard' (balanced), 'Expanded' (high whitespace)
  const [appearance, setAppearanceState] = useState(() => {
    return localStorage.getItem('noesis_appearance') || 'Standard';
  });

  // 2. Workspace Scale: 'Focused' (35%), 'Balanced' (65%), 'FullCanvas' (92%)
  const [workspaceScale, setWorkspaceScaleState] = useState(() => {
    return localStorage.getItem('noesis_workspace_scale') || 'Balanced';
  });

  // 3. Theme: Strictly Light Palette per Executive Directive
  const [theme, setThemeState] = useState(() => {
    return localStorage.getItem('noesis_theme') || 'light';
  });

  // 4. Language: 'en' | 'te' | 'hi'
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('noesis_lang') || 'en';
  });

  // Sync layout attributes on document element
  useEffect(() => {
    document.documentElement.setAttribute('data-appearance', appearance.toLowerCase());
    localStorage.setItem('noesis_appearance', appearance);
  }, [appearance]);

  useEffect(() => {
    document.documentElement.setAttribute('data-scale', workspaceScale.toLowerCase());
    localStorage.setItem('noesis_workspace_scale', workspaceScale);
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

  // Helper function: returns calculated container max-width percentage
  const getScaleWidth = () => {
    switch (workspaceScale) {
      case 'Focused':
        return '35%';
      case 'FullCanvas':
        return '92%';
      case 'Balanced':
      default:
        return '65%';
    }
  };

  // Helper function: returns layout padding/gap styles based on appearance
  const getDensityStyles = () => {
    switch (appearance) {
      case 'Compact':
        return { padding: '0.75rem', gap: '0.75rem', fontSize: '0.82rem' };
      case 'Expanded':
        return { padding: '2.5rem', gap: '2rem', fontSize: '0.94rem' };
      case 'Standard':
      default:
        return { padding: '1.5rem', gap: '1.25rem', fontSize: '0.88rem' };
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
