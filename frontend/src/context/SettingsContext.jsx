import React, { createContext, useContext, useState, useEffect } from 'react';
import i18n from '../i18n/i18n';
import { supabase } from '../supabase';

const SettingsContext = createContext({
  theme: 'light',
  language: 'en',
  setTheme: () => {},
  setLanguage: () => {},
  toggleTheme: () => {}
});

export function SettingsProvider({ children }) {
  // Theme state: Strictly defaults to 'light' per user mandate
  const [theme, setThemeState] = useState(() => {
    return localStorage.getItem('insightflow_theme') || 'light';
  });

  // Language state: 'en' | 'te' | 'hi'
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('insightflow_lang') || 'en';
  });

  // Initialize root attributes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('insightflow_theme', theme);
  }, [theme]);

  // Synchronize language with i18next
  useEffect(() => {
    i18n.changeLanguage(language);
    localStorage.setItem('insightflow_lang', language);
  }, [language]);

  // Listen for Supabase session and load user preferences from metadata
  useEffect(() => {
    async function loadUserProfile() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user?.user_metadata) {
          const meta = session.user.user_metadata;
          if (meta.theme) {
            setThemeState(meta.theme);
          }
          if (meta.language) {
            setLanguageState(meta.language);
          }
        }
      } catch (err) {
        console.warn('Could not load user profile settings:', err);
      }
    }
    loadUserProfile();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user?.user_metadata) {
        const meta = session.user.user_metadata;
        if (meta.theme) setThemeState(meta.theme);
        if (meta.language) setLanguageState(meta.language);
      }
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const setTheme = async (newTheme) => {
    setThemeState(newTheme);
    localStorage.setItem('insightflow_theme', newTheme);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        await supabase.auth.updateUser({
          data: { theme: newTheme }
        });
      }
    } catch (e) {
      console.warn('Failed to sync theme to Supabase:', e);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const setLanguage = async (newLang) => {
    setLanguageState(newLang);
    localStorage.setItem('insightflow_lang', newLang);
    i18n.changeLanguage(newLang);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        await supabase.auth.updateUser({
          data: { language: newLang }
        });
      }
    } catch (e) {
      console.warn('Failed to sync language to Supabase:', e);
    }
  };

  return (
    <SettingsContext.Provider
      value={{
        theme,
        language,
        setTheme,
        setLanguage,
        toggleTheme
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  return useContext(SettingsContext);
}
