import { motion, AnimatePresence } from 'motion/react';
import { Accessibility, X, Type, ImageOff, Sparkles, Languages } from 'lucide-react';
import { useEffect, useState } from 'react';

function ToggleTile({
  label,
  active,
  onClick,
  icon,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl px-3 py-3 flex items-center justify-between transition-all border ${
        active
          ? 'bg-[#D27D59]/30 border-[#D27D59] text-white'
          : 'bg-white/10 border-white/15 hover:border-[#D27D59]/60'
      }`}
    >
      <span className="flex items-center gap-2 text-sm font-semibold">
        <span className="text-[#D27D59]">{icon}</span>
        {label}
      </span>
      <span
        className={`relative inline-flex w-10 h-5 flex-shrink-0 rounded-full transition-colors ${
          active ? 'bg-[#D27D59]' : 'bg-white/20'
        }`}
      >
        <span
          className={`absolute left-0.5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white transition-transform ${
            active ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </span>
    </button>
  );
}

export function AccessibilityOrb() {
  const [open, setOpen] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [highSaturation, setHighSaturation] = useState(false);
  const [noImages, setNoImages] = useState(false);
  const [languageMode, setLanguageMode] = useState<'en' | 'sq'>('sq');

  useEffect(() => {
    const savedLargeText = localStorage.getItem('a11y-large-text') === 'true';
    const savedHighSaturation = localStorage.getItem('a11y-high-saturation') === 'true';
    const savedNoImages = localStorage.getItem('a11y-no-images') === 'true';
    const savedLanguage = (localStorage.getItem('a11y-language-mode') as 'en' | 'sq') || 'sq';

    setLargeText(savedLargeText);
    setHighSaturation(savedHighSaturation);
    setNoImages(savedNoImages);
    setLanguageMode(savedLanguage);

    document.documentElement.classList.toggle('a11y-large-text', savedLargeText);
    document.documentElement.classList.toggle('a11y-high-saturation', savedHighSaturation);
    document.documentElement.classList.toggle('a11y-no-images', savedNoImages);
    document.documentElement.lang = savedLanguage === 'en' ? 'en' : 'sq';
  }, []);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const toggleLargeText = () => {
    const next = !largeText;
    setLargeText(next);
    localStorage.setItem('a11y-large-text', String(next));
    document.documentElement.classList.toggle('a11y-large-text', next);
  };

  const toggleHighSaturation = () => {
    const next = !highSaturation;
    setHighSaturation(next);
    localStorage.setItem('a11y-high-saturation', String(next));
    document.documentElement.classList.toggle('a11y-high-saturation', next);
  };

  const toggleNoImages = () => {
    const next = !noImages;
    setNoImages(next);
    localStorage.setItem('a11y-no-images', String(next));
    document.documentElement.classList.toggle('a11y-no-images', next);
  };

  const handleLanguageMode = (mode: 'en' | 'sq') => {
    setLanguageMode(mode);
    localStorage.setItem('a11y-language-mode', mode);
    document.documentElement.lang = mode === 'en' ? 'en' : 'sq';
  };

  const t = languageMode === 'sq'
    ? {
        open: 'Hap panelin e aksesueshmerise',
        close: 'Mbyll panelin e aksesueshmerise',
        title: 'Paneli i aksesueshmerise',
        heading: 'Aksesueshmeri',
        subtitle: 'Panel kontrolli kompakt',
        biggerText: 'Tekst me i madh',
        highSat: 'Ngjyra te forta',
        noImages: 'Pa imazhe',
        language: 'Gjuha',
        closeHint: 'Shtyp ikonën perseri per ta mbyllur.',
      }
    : {
        open: 'Open accessibility panel',
        close: 'Close accessibility panel',
        title: 'Accessibility settings',
        heading: 'Accessibility',
        subtitle: 'Compact control panel',
        biggerText: 'Bigger Text',
        highSat: 'High Sat.',
        noImages: 'No Images',
        language: 'Language',
        closeHint: 'Press icon again to close.',
      };

  return (
    <div
      className="fixed top-[120px] left-6 z-[9999] flex items-start gap-3 pointer-events-auto"
      aria-live="polite"
    >
      <motion.button
        type="button"
        aria-label={open ? t.close : t.open}
        title={t.heading}
        onClick={() => setOpen((prev) => !prev)}
        className="w-14 h-14 rounded-full glass-container-strong flex items-center justify-center text-[#D27D59] border border-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D27D59] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.96 }}
      >
        {open ? <X size={22} /> : <Accessibility size={24} />}
        <span className="sr-only">{t.open}</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.aside
            role="dialog"
            aria-label={t.title}
            initial={{ opacity: 0, x: -12, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -12, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="w-[320px] max-w-[calc(100vw-6rem)] glass-container-strong border border-[#D27D59]/60 rounded-2xl shadow-[0_0_24px_rgba(210,125,89,0.3)]"
          >
            <div className="p-4">
              <div className="flex items-center justify-between gap-3 mb-3">
                <div>
                  <h3 className="text-base font-bold text-[#D27D59]">{t.heading}</h3>
                  <p className="text-xs opacity-80">{t.subtitle}</p>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-[#D27D59]">A11y</span>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-3">
                <ToggleTile
                  label={t.biggerText}
                  active={largeText}
                  onClick={toggleLargeText}
                  icon={<Type size={16} />}
                />
                <ToggleTile
                  label={t.highSat}
                  active={highSaturation}
                  onClick={toggleHighSaturation}
                  icon={<Sparkles size={16} />}
                />
                <ToggleTile
                  label={t.noImages}
                  active={noImages}
                  onClick={toggleNoImages}
                  icon={<ImageOff size={16} />}
                />

                <div className="rounded-xl border border-white/15 bg-white/8 px-3 py-2">
                  <div className="flex items-center gap-2 text-sm font-semibold mb-2">
                    <Languages size={16} className="text-[#D27D59]" />
                    {t.language}
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    <button
                      type="button"
                      onClick={() => handleLanguageMode('sq')}
                      className={`rounded-lg py-1 text-xs font-semibold transition-colors ${
                        languageMode === 'sq'
                          ? 'bg-[#D27D59] text-white'
                          : 'bg-white/10 hover:bg-white/20'
                      }`}
                    >
                      SQ
                    </button>
                    <button
                      type="button"
                      onClick={() => handleLanguageMode('en')}
                      className={`rounded-lg py-1 text-xs font-semibold transition-colors ${
                        languageMode === 'en'
                          ? 'bg-[#D27D59] text-white'
                          : 'bg-white/10 hover:bg-white/20'
                      }`}
                    >
                      EN
                    </button>
                  </div>
                </div>
              </div>

              <p className="text-[11px] opacity-70 border-t border-white/10 pt-2">
                {t.closeHint}
              </p>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
