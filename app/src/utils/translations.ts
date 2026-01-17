export type Language = 'en' | 'hi' | 'mr';

export interface TranslationData {
  [key: string]: string | TranslationData;
}

export const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
  { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
];

let currentTranslations: TranslationData = {};
let currentLanguage: Language = 'en';

export const loadTranslations = async (lang: Language): Promise<void> => {
  try {
    const response = await fetch(`/locales/${lang}.json`);
    if (!response.ok) {
      throw new Error(`Failed to load translations for ${lang}`);
    }
    const data = await response.json();
    currentTranslations = data as TranslationData;
    currentLanguage = lang;
  } catch (error) {
    console.error('Error loading translations:', error);
    // Fallback to English
    if (lang !== 'en') {
      await loadTranslations('en');
    }
  }
};

export const getNestedValue = (obj: TranslationData, path: string): string => {
  const keys = path.split('.');
  let current: unknown = obj;
  
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = (current as TranslationData)[key];
    } else {
      return path; // Return the path if translation not found
    }
  }
  
  return typeof current === 'string' ? current : path;
};

export const t = (key: string): string => {
  return getNestedValue(currentTranslations, key);
};

export const getCurrentLanguage = (): Language => {
  return currentLanguage;
};

// Initialize with English
loadTranslations('en');
