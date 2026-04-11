import { useEffect, useState } from 'react';

export type Language = 'sq' | 'en';

export function useLanguage() {
  const [language, setLanguage] = useState<Language>('sq');

  useEffect(() => {
    const getLanguage = (): Language =>
      document.documentElement.lang === 'en' ? 'en' : 'sq';

    setLanguage(getLanguage());

    const observer = new MutationObserver(() => {
      setLanguage(getLanguage());
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang'],
    });

    return () => observer.disconnect();
  }, []);

  return language;
}
