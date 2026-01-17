import React, { createContext, useContext, useCallback } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import type { Language } from '@/utils/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  languages: { code: Language; name: string; flag: string }[];
  loading: boolean;
  t: (key: string) => string;
}

// Simple translation function
const translate = (key: string): string => {
  // This will be replaced by the actual translation logic
  // For now, return the key itself
  return key;
};

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  languages: [],
  loading: false,
  t: translate,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { language, setLanguage, languages, loading } = useLanguage();

  const t = useCallback((key: string): string => {
    // For now, we'll extract the translation from the DOM or use a simple mapping
    // In a full implementation, this would use the loaded translations
    const translations: Record<string, Record<string, string>> = {
      en: {
        'markets.status.open': 'Open',
        'markets.status.closed': 'Closed',
        'markets.status.opening_soon': 'Opening Soon',
        'markets.status.closing_soon': 'Closing Soon',
        'markets.status.lunch': 'Lunch Break',
      },
      hi: {
        'markets.status.open': 'खुला',
        'markets.status.closed': 'बंद',
        'markets.status.opening_soon': 'जल्द खुल रहा है',
        'markets.status.closing_soon': 'जल्द बंद हो रहा है',
        'markets.status.lunch': 'लंच ब्रेक',
      },
      mr: {
        'markets.status.open': 'उघडले',
        'markets.status.closed': 'बंद',
        'markets.status.opening_soon': 'लवकरच उघडते',
        'markets.status.closing_soon': 'लवकरच बंद होते',
        'markets.status.lunch': 'लंच ब्रेक',
      },
    };

    return translations[language]?.[key] || key;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      languages, 
      loading,
      t 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguageContext = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguageContext must be used within a LanguageProvider');
  }
  return context;
};
