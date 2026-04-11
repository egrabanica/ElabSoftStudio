import { motion, useMotionValue, useTransform } from 'motion/react';
import { useEffect, useState } from 'react';
import { CodeEditorWindow } from './CodeEditorWindow';
import { Send } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { usePrefersFinePointer } from '../hooks/usePrefersFinePointer';

export function EngineRoom() {
  const language = useLanguage();
  const parallax = usePrefersFinePointer();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [dims, setDims] = useState({ w: 1200, h: 800 });

  const copperBeamX = useTransform(mouseX, [0, dims.w], [-200, 200]);
  const copperBeamY = useTransform(mouseY, [0, dims.h], [-100, 100]);
  const glacialBeamX = useTransform(mouseX, [0, dims.w], [200, -200]);
  const glacialBeamY = useTransform(mouseY, [0, dims.h], [100, -100]);

  useEffect(() => {
    if (!parallax) return;
    const readDims = () =>
      setDims({ w: window.innerWidth || 1200, h: window.innerHeight || 800 });
    readDims();
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('resize', readDims);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('resize', readDims);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY, parallax]);

  const t = language === 'sq'
    ? {
        line1: 'Inxhinierim',
        line2: 'me Performance te Larte',
        line3: 'i Sistemeve',
        line4: 'Digjitale',
        subtitle: 'Sisteme softuerike te ndertuara me precizitet per brezin e ardhshem te lidereve te industrise.',
        deploy: 'Nis Projektin',
        architecture: 'Shiko Arkitekturen',
        
      }
    : {
        line1: 'Engineering',
        line2: 'High-Performance',
        line3: 'Digital',
        line4: 'Foundations',
        subtitle: 'Precision-built software systems for the next generation of industry leaders.',
        deploy: 'Deploy Project',
        architecture: 'View Architecture',
       
      };

  
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden pt-6 sm:pt-8 md:pt-12 pb-16 sm:pb-24">
      {/* Refracted light beams — disabled on small / touch screens (heavy blur + listeners) */}
      {parallax ? (
        <>
          <motion.div
            className="pointer-events-none absolute w-64 h-64 md:w-96 md:h-96 rounded-full blur-2xl md:blur-3xl opacity-15 md:opacity-20"
            style={{
              background: 'radial-gradient(circle, #D27D59 0%, transparent 70%)',
              x: copperBeamX,
              y: copperBeamY,
              left: '30%',
              top: '20%',
            }}
          />
          <motion.div
            className="pointer-events-none absolute w-64 h-64 md:w-96 md:h-96 rounded-full blur-2xl md:blur-3xl opacity-15 md:opacity-20"
            style={{
              background: 'radial-gradient(circle, #A0D2EB 0%, transparent 70%)',
              x: glacialBeamX,
              y: glacialBeamY,
              right: '30%',
              bottom: '20%',
            }}
          />
        </>
      ) : (
        <div
          className="pointer-events-none absolute inset-0 opacity-30 md:opacity-40"
          style={{
            background:
              'radial-gradient(ellipse 80% 50% at 30% 20%, rgba(210,125,89,0.12), transparent), radial-gradient(ellipse 70% 45% at 70% 60%, rgba(160,210,235,0.1), transparent)',
          }}
          aria-hidden
        />
      )}

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center z-10">
        {/* Left Side - Text Content with Big Logo */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Big Logo */}
          <motion.div 
            className="mb-8 flex justify-center lg:justify-start"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            
          </motion.div>

          <h1 className="mb-6">
            {t.line1}<br />
            <span className="text-gradient-copper">{t.line2}</span><br />
            {t.line3}<br />
            {t.line4}
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 leading-relaxed max-w-lg">
            {t.subtitle}
          </p>

          {/* Sharp CTA Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <motion.button
              className="group relative px-6 py-3.5 sm:px-8 sm:py-4 overflow-hidden w-full sm:w-auto min-h-[48px]"
              style={{
                background: 'linear-gradient(135deg, #D27D59, #E89B7A)',
                clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"
              />
              <span className="relative text-white font-semibold tracking-wide flex items-center gap-2">
                {t.deploy}
                <Send size={18} />
              </span>
              
              {/* Heating filament effect on hover */}
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                whileHover={{ 
                  opacity: [0, 0.4, 0],
                  scale: [1, 1.1, 1.2],
                }}
                transition={{ duration: 1, repeat: Infinity }}
                style={{
                  boxShadow: '0 0 40px rgba(210, 125, 89, 0.8)',
                  clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
                }}
              />
            </motion.button>

            <motion.button
              className="group relative px-6 py-3.5 sm:px-8 sm:py-4 glass-container-strong w-full sm:w-auto min-h-[48px]"
              style={{
                clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative font-semibold tracking-wide">
                {t.architecture}
              </span>
            </motion.button>
          </div>
        </motion.div>

        {/* Right Side - Code Editor */}
        <div className="flex justify-center lg:justify-end">
          <CodeEditorWindow />
        </div>
      </div>

      {/* ElabSoft Watermark */}
      <ElabSoftWatermark text={t.verified} />
    </div>
  );
}

function ElabSoftWatermark({ text }: { text: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const resetTimer = () => {
      clearTimeout(timeout);
      setVisible(false);
      timeout = setTimeout(() => setVisible(true), 5000);
    };

    resetTimer();
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
    };
  }, []);

  return (
    <motion.div
      className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 sm:right-8 text-xs tracking-wider max-w-[50vw] text-right"
      initial={{ opacity: 0.2 }}
      animate={{ opacity: visible ? 1 : 0.2 }}
      transition={{ duration: 0.8 }}
      style={{
        fontFamily: 'monospace',
        color: 'var(--color-silver-silk)',
      }}
    >
      {text}
    </motion.div>
  );
}