import enTranslations from '../translations/en.json';
import arTranslations from '../translations/ar.json';

type Translations = typeof enTranslations;

const translations = {
  en: enTranslations,
  ar: arTranslations,
};

export const useTranslation = (locale: string = 'en') => {
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[locale as keyof typeof translations];

    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key;
      }
    }

    return value || key;
  };

  return { t };
}; 