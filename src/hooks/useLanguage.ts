import { useEffect, useState } from 'react';

export type Language = 'sq' | 'en';

function readDocumentLanguage(): Language {
  if (typeof document === 'undefined') return 'en';
  return document.documentElement.lang === 'sq' ? 'sq' : 'en';
}

export function useLanguage() {
  const [language, setLanguage] = useState<Language>(readDocumentLanguage);

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
