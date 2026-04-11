import { motion, useMotionValue, useTransform } from 'motion/react';
import { useEffect, useState } from 'react';
import { CodeEditorWindow } from './CodeEditorWindow';
import { Send } from 'lucide-react';
import logo from 'figma:asset/afbc1910fda1cd12228ff9fa0dc8a188c86ad6f2.png';
import { useLanguage } from '../hooks/useLanguage';

export function EngineRoom() {
  const language = useLanguage();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [mounted, setMounted] = useState(false);
  
  const rotateX = useTransform(mouseY, [0, window.innerHeight], [15, -15]);
  const rotateY = useTransform(mouseX, [0, window.innerWidth], [-15, 15]);
  
  const copperBeamX = useTransform(mouseX, [0, window.innerWidth], [-200, 200]);
  const copperBeamY = useTransform(mouseY, [0, window.innerHeight], [-100, 100]);
  const glacialBeamX = useTransform(mouseX, [0, window.innerWidth], [200, -200]);
  const glacialBeamY = useTransform(mouseY, [0, window.innerHeight], [100, -100]);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

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
    <div className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden pt-8 md:pt-12 pb-24">
      {/* Refracted Light Beams */}
      <motion.div
        className="absolute w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{
          background: 'radial-gradient(circle, #D27D59 0%, transparent 70%)',
          x: copperBeamX,
          y: copperBeamY,
          left: '30%',
          top: '20%',
        }}
      />
      <motion.div
        className="absolute w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{
          background: 'radial-gradient(circle, #A0D2EB 0%, transparent 70%)',
          x: glacialBeamX,
          y: glacialBeamY,
          right: '30%',
          bottom: '20%',
        }}
      />

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center z-10">
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
          
          <p className="text-xl mb-8 leading-relaxed max-w-lg">
            {t.subtitle}
          </p>

          {/* Sharp CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <motion.button
              className="group relative px-8 py-4 overflow-hidden"
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
              className="group relative px-8 py-4 glass-container-strong"
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
      className="fixed bottom-8 right-8 text-xs tracking-wider"
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