import { lazy, Suspense, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EngineRoom } from './components/EngineRoom';
import { CoreExpertise } from './components/CoreExpertise';
import { ExecutionFramework } from './components/ExecutionFramework';
import { ProfessionalFooter } from './components/ProfessionalFooter';
import { AccessibilityOrb } from './components/AccessibilityOrb';
import { Menu, X } from 'lucide-react';
import logo from 'figma:asset/952983e2909debfaa69697fd87a26c282a28d218.png';
import { useLanguage } from './hooks/useLanguage';

const BlueprintArchive = lazy(async () => {
  const m = await import('./components/BlueprintArchive');
  return { default: m.BlueprintArchive };
});

const Contact = lazy(async () => {
  const m = await import('./components/Contact');
  return { default: m.Contact };
});

function RouteFallback() {
  return (
    <div className="min-h-[40vh] flex items-center justify-center px-6">
      <div className="h-8 w-8 rounded-full border-2 border-[#D27D59]/30 border-t-[#D27D59] animate-spin" aria-hidden />
      <span className="sr-only">Loading</span>
    </div>
  );
}

export default function App() {
  const [activeScreen, setActiveScreen] = useState<'engine' | 'blueprint' | 'contact'>('engine');
  const [menuOpen, setMenuOpen] = useState(false);
  const language = useLanguage();
  const t = language === 'sq'
    ? { home: 'Kreu', portfolio: 'Portofoli', contact: 'Kontakti' }
    : { home: 'Home', portfolio: 'Portfolio', contact: 'Contact' };

  return (
    <div className="relative min-h-screen">
      {/* Navigation stays outside .a11y-saturate-scope so position:fixed anchors to the viewport */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 glass-container pt-[env(safe-area-inset-top,0px)]"
        style={{ border: 'none' }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="a11y-saturate-scope-nav w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-1.5 sm:py-1 flex items-center justify-between gap-2">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-2 min-w-0 shrink"
            whileHover={{ scale: 1.02 }}
          >
            <img
              src={logo}
              alt="ElabSoft Studio Logo"
              className="h-12 w-auto max-h-[20vh] sm:h-16 md:h-24 lg:h-36 xl:h-44 object-contain object-left drop-shadow-lg"
              style={{ background: 'none' }}
              decoding="async"
              fetchPriority="high"
            />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 md:-mt-6 lg:-mt-10">
            <NavButton
              active={activeScreen === 'engine'}
              onClick={() => setActiveScreen('engine')}
            >
              {t.home}
            </NavButton>
            <NavButton
              active={activeScreen === 'blueprint'}
              onClick={() => setActiveScreen('blueprint')}
            >
              {t.portfolio}
            </NavButton>
            <NavButton
              active={activeScreen === 'contact'}
              onClick={() => setActiveScreen('contact')}
            >
              {t.contact}
            </NavButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/5"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="md:hidden px-6 py-4 space-y-2"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <MobileNavButton
                active={activeScreen === 'engine'}
                onClick={() => {
                  setActiveScreen('engine');
                  setMenuOpen(false);
                }}
              >
                {t.home}
              </MobileNavButton>
              <MobileNavButton
                active={activeScreen === 'blueprint'}
                onClick={() => {
                  setActiveScreen('blueprint');
                  setMenuOpen(false);
                }}
              >
                {t.portfolio}
              </MobileNavButton>
              <MobileNavButton
                active={activeScreen === 'contact'}
                onClick={() => {
                  setActiveScreen('contact');
                  setMenuOpen(false);
                }}
              >
                {t.contact}
              </MobileNavButton>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </motion.nav>

      <div className="a11y-saturate-scope min-h-screen">
      {/* Main Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeScreen}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="pt-[calc(3.5rem+env(safe-area-inset-top,0px))] sm:pt-16 md:pt-20"
        >
          {activeScreen === 'engine' && (
            <>
              <EngineRoom />
              <CoreExpertise />
              <ExecutionFramework />
            </>
          )}
          {activeScreen === 'blueprint' && (
            <Suspense fallback={<RouteFallback />}>
              <BlueprintArchive />
            </Suspense>
          )}
          {activeScreen === 'contact' && (
            <Suspense fallback={<RouteFallback />}>
              <Contact />
            </Suspense>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Footer */}
      <ProfessionalFooter />
      </div>

      <AccessibilityOrb />
    </div>
  );
}

function NavButton({ 
  children, 
  active, 
  onClick 
}: { 
  children: React.ReactNode; 
  active: boolean; 
  onClick: () => void;
}) {
  return (
    <motion.button
      className="relative px-4 py-2 uppercase tracking-wider text-sm font-medium transition-colors"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className={active ? 'text-[#D27D59]' : 'text-[#D27D59]/85 hover:text-[#E89B7A]'}>
        {children}
      </span>
      {active && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D27D59]"
          layoutId="activeTab"
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}
    </motion.button>
  );
}

function MobileNavButton({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={`w-full px-4 py-3 text-left rounded-xl transition-all ${
        active ? 'bg-[#D27D59]/20 text-[#D27D59]' : 'hover:bg-white/5'
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}