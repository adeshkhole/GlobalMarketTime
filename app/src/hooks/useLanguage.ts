import { useState, useEffect, useCallback } from 'react';
import type { Language } from '@/utils/translations';
import { languages, loadTranslations } from '@/utils/translations';

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>(() => {
    // Check localStorage first
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && languages.some(lang => lang.code === savedLang)) {
      return savedLang;
    }
    return 'en';
  });
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLanguage = async () => {
      setLoading(true);
      await loadTranslations(language);
      localStorage.setItem('language', language);
      setLoading(false);
    };
    
    loadLanguage();
  }, [language]);

  const setLanguageValue = useCallback((newLang: Language) => {
    if (languages.some(lang => lang.code === newLang)) {
      setLanguage(newLang);
    }
  }, []);

  return {
    language,
    setLanguage: setLanguageValue,
    languages,
    loading,
  };
};
