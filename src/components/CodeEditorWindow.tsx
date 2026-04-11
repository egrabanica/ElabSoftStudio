import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';

const codeLines = [
  { num: 1, text: 'import', color: '#C586C0' },
  { num: 2, text: '  { ScalableArchitecture }', color: '#4EC9B0' },
  { num: 3, text: 'from', color: '#C586C0' },
  { num: 4, text: '  "@elabsoft/core"', color: '#CE9178' },
  { num: 5, text: '', color: '' },
  { num: 6, text: 'const', color: '#569CD6' },
  { num: 7, text: '  deploy', color: '#DCDCAA' },
  { num: 8, text: '= async () => {', color: '#D4D4D4' },
  { num: 9, text: '  await', color: '#C586C0' },
  { num: 10, text: '    infrastructure.initialize()', color: '#DCDCAA' },
  { num: 11, text: '  return', color: '#C586C0' },
  { num: 12, text: '    system.optimize()', color: '#DCDCAA' },
  { num: 13, text: '}', color: '#D4D4D4' },
];

export function CodeEditorWindow() {
  const language = useLanguage();
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const t = language === 'sq'
    ? { lineCol: 'Rreshti 13, Kol 1' }
    : { lineCol: 'Ln 13, Col 1' };

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleLines(prev => {
        if (prev < codeLines.length) return prev + 1;
        return prev;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="glass-container-strong w-full max-w-lg"
      style={{
        borderRadius: 'var(--radius-main)',
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.8 }}
    >
      {/* Window Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
        </div>
        <div className="text-sm opacity-60 font-mono">architecture.ts</div>
        <div className="flex gap-2 opacity-40">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M3 3h10v10H3z" />
          </svg>
        </div>
      </div>

      {/* Code Content */}
      <div className="px-6 py-6 font-mono text-sm">
        {codeLines.slice(0, visibleLines).map((line, index) => (
          <motion.div
            key={line.num}
            className="flex gap-6"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            <span className="opacity-30 select-none w-6 text-right">{line.num}</span>
            <span style={{ color: line.color || '#D4D4D4' }}>
              {line.text}
              {index === visibleLines - 1 && (
                <motion.span
                  className="inline-block w-2 h-4 bg-white ml-1"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              )}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between px-6 py-2 border-t border-white/10 text-xs opacity-60">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-[#A0D2EB]" />
            TypeScript
          </span>
          <span>UTF-8</span>
        </div>
        <span>{t.lineCol}</span>
      </div>
    </motion.div>
  );
}
