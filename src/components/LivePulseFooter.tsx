import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface Stat {
  label: string;
  value: string;
  trend?: 'up' | 'down' | 'stable';
}

export function LivePulseFooter() {
  const [stats, setStats] = useState<Stat[]>([
    { label: 'Active Sprints', value: '12', trend: 'up' },
    { label: 'Lines of Code', value: '1.2M', trend: 'up' },
    { label: 'System Uptime', value: '99.9%', trend: 'stable' },
    { label: 'Deploy Velocity', value: '18/day', trend: 'up' },
    { label: 'API Response', value: '40ms', trend: 'down' },
  ]);

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prevStats => prevStats.map(stat => {
        if (stat.label === 'Active Sprints') {
          const val = parseInt(stat.value);
          return { ...stat, value: String(val + Math.floor(Math.random() * 3 - 1)) };
        }
        if (stat.label === 'System Uptime') {
          return { ...stat, value: `${(99.9 + Math.random() * 0.09).toFixed(2)}%` };
        }
        return stat;
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-50 glass-container-strong"
      style={{
        borderRadius: '28px',
        margin: '0 24px',
        marginBottom: '16px',
      }}
      initial={{ y: 0 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-8 py-6">
        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <motion.div
            className="w-2 h-2 rounded-full bg-[#A0D2EB]"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-xs uppercase tracking-[0.3em] opacity-80 font-semibold">
            Live Pulse — System Intelligence
          </span>
          <motion.div
            className="w-2 h-2 rounded-full bg-[#A0D2EB]"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
          {stats.map((stat, index) => (
            <StatItem key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function StatItem({ stat, index }: { stat: Stat; index: number }) {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 + index * 0.1 }}
    >
      <div className="text-xs uppercase tracking-widest opacity-60 mb-2">
        {stat.label}
      </div>
      <div className="flex items-center justify-center gap-2">
        <motion.div
          className="text-3xl font-bold text-white"
          key={stat.value}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {stat.value}
        </motion.div>
        {stat.trend && <TrendIndicator trend={stat.trend} />}
      </div>
    </motion.div>
  );
}

function TrendIndicator({ trend }: { trend: 'up' | 'down' | 'stable' }) {
  if (trend === 'stable') {
    return (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M2 6 H10" stroke="#A0D2EB" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  const color = trend === 'up' ? '#A0D2EB' : '#D27D59';
  const rotation = trend === 'up' ? 0 : 180;

  return (
    <svg 
      width="12" 
      height="12" 
      viewBox="0 0 12 12" 
      fill="none"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <path d="M6 2 L10 8 L2 8 Z" fill={color} />
    </svg>
  );
}