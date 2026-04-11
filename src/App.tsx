import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EngineRoom } from './components/EngineRoom';
import { CoreExpertise } from './components/CoreExpertise';
import { ExecutionFramework } from './components/ExecutionFramework';
import { BlueprintArchive } from './components/BlueprintArchive';
import { Contact } from './components/Contact';
import { ProfessionalFooter } from './components/ProfessionalFooter';
import { AccessibilityOrb } from './components/AccessibilityOrb';
import { Menu, X } from 'lucide-react';
import logo from 'figma:asset/952983e2909debfaa69697fd87a26c282a28d218.png';
import { useLanguage } from './hooks/useLanguage';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<'engine' | 'blueprint' | 'contact'>('engine');
  const [menuOpen, setMenuOpen] = useState(false);
  const language = useLanguage();
  const t = language === 'sq'
    ? { home: 'Kreu', portfolio: 'Portofoli', contact: 'Kontakti' }
    : { home: 'Home', portfolio: 'Portfolio', contact: 'Contact' };

  return (
    <div className="relative min-h-screen">
      {/* Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 glass-container"
        style={{ border: 'none' }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-1 flex items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <img src={logo} alt="ElabSoft Studio Logo" className="h-56 w-auto object-contain drop-shadow-lg" style={{ background: 'none' }} />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 -mt-10">
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
      </motion.nav>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeScreen}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="pt-10 md:pt-12"
        >
          {activeScreen === 'engine' && (
            <>
              <EngineRoom />
              <CoreExpertise />
              <ExecutionFramework />
            </>
          )}
          {activeScreen === 'blueprint' && <BlueprintArchive />}
          {activeScreen === 'contact' && <Contact />}
        </motion.div>
      </AnimatePresence>

      {/* Footer */}
      <ProfessionalFooter />

      {/* Global accessibility action */}
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