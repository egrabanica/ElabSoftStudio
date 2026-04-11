import { motion } from 'motion/react';
import { Activity, Gauge, Zap, GitBranch } from 'lucide-react';
import { useEffect, useState } from 'react';

export function SystemMetrics() {
  const [commitData, setCommitData] = useState<number[]>([
    28, 32, 25, 30, 35, 28, 32, 38, 42, 36, 28, 35,
  ]);

  return (
    <div className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="mb-4">
            Real-Time <span className="text-gradient-copper">System Intelligence</span>
          </h2>
          <p className="text-xl max-w-3xl mx-auto">
            Live metrics from our continuous integration and deployment pipelines.
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Commit Activity Chart */}
          <motion.div
            className="glass-container p-8"
            style={{
              borderRadius: 'var(--radius-main)',
            }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl glass-container-strong flex items-center justify-center">
                <GitBranch size={20} className="text-[#A0D2EB]" />
              </div>
              <div>
                <h3 className="text-lg">Commit Activity</h3>
                <p className="text-sm opacity-60">Last 12 days</p>
              </div>
            </div>

            {/* Chart */}
            <div className="relative h-48">
              <svg width="100%" height="100%" viewBox="0 0 600 200" preserveAspectRatio="none">
                {/* Grid Lines */}
                {[0, 10, 20, 30, 40].map((y) => (
                  <line
                    key={y}
                    x1="0"
                    y1={200 - (y / 40) * 200}
                    x2="600"
                    y2={200 - (y / 40) * 200}
                    stroke="rgba(255, 255, 255, 0.05)"
                    strokeWidth="1"
                  />
                ))}

                {/* Y-axis Labels */}
                {[0, 10, 20, 30, 40].map((y, i) => (
                  <text
                    key={y}
                    x="5"
                    y={200 - (y / 40) * 200}
                    fill="rgba(255, 255, 255, 0.4)"
                    fontSize="10"
                    fontFamily="monospace"
                  >
                    {y}
                  </text>
                ))}

                {/* Area Fill */}
                <defs>
                  <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#A0D2EB" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#A0D2EB" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d={`M 0 ${200 - (commitData[0] / 50) * 200} ${commitData
                    .map((val, i) => `L ${(i * 600) / (commitData.length - 1)} ${200 - (val / 50) * 200}`)
                    .join(' ')} L 600 200 L 0 200 Z`}
                  fill="url(#chartGradient)"
                />

                {/* Line */}
                <motion.path
                  d={`M 0 ${200 - (commitData[0] / 50) * 200} ${commitData
                    .map((val, i) => `L ${(i * 600) / (commitData.length - 1)} ${200 - (val / 50) * 200}`)
                    .join(' ')}`}
                  stroke="#A0D2EB"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: 'easeInOut' }}
                />

                {/* Data Points */}
                {commitData.map((val, i) => (
                  <circle
                    key={i}
                    cx={(i * 600) / (commitData.length - 1)}
                    cy={200 - (val / 50) * 200}
                    r="3"
                    fill="#A0D2EB"
                    className="opacity-0 hover:opacity-100 transition-opacity"
                  />
                ))}
              </svg>

              {/* X-axis Labels */}
              <div className="flex justify-between mt-2 text-xs opacity-40 font-mono">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(
                  (day, i) => (
                    <span key={i}>{day}</span>
                  )
                )}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Metric Cards */}
          <div className="space-y-6">
            <MetricCard
              icon={<Gauge size={20} />}
              title="Server Latency"
              value="28"
              unit="ms"
              color="#D27D59"
              delay={0.2}
            />
            <MetricCard
              icon={<Activity size={20} />}
              title="System Uptime"
              value="99.97"
              unit="%"
              subtitle="Last 30 days"
              color="#4EC9B0"
              delay={0.3}
            />
            <MetricCard
              icon={<Zap size={20} />}
              title="Active Deploys"
              value="12"
              unit="live"
              subtitle="All systems operational"
              color="#A0D2EB"
              delay={0.4}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  icon,
  title,
  value,
  unit,
  subtitle,
  color,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  unit: string;
  subtitle?: string;
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      className="glass-container p-6"
      style={{
        borderRadius: 'var(--radius-main)',
      }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
    >
      <div className="flex items-start justify-between">
        <div
          className="w-10 h-10 rounded-xl glass-container-strong flex items-center justify-center"
          style={{
            backgroundColor: `${color}20`,
          }}
        >
          <div style={{ color }}>{icon}</div>
        </div>
      </div>

      <h3 className="text-sm opacity-80 mt-4 mb-2">{title}</h3>

      <div className="flex items-baseline gap-2 mb-2">
        <motion.span
          className="text-5xl font-bold"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.3, duration: 0.5 }}
          style={{ color }}
        >
          {value}
        </motion.span>
        <span className="text-xl opacity-60">{unit}</span>
      </div>

      {/* Progress Bar for Server Latency */}
      {title === 'Server Latency' && (
        <motion.div
          className="w-full h-2 rounded-full overflow-hidden"
          style={{ backgroundColor: 'rgba(210, 125, 89, 0.2)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.4 }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: color }}
            initial={{ width: 0 }}
            whileInView={{ width: '28%' }}
            viewport={{ once: true }}
            transition={{ delay: delay + 0.5, duration: 0.8 }}
          />
        </motion.div>
      )}

      {subtitle && (
        <p className="text-sm opacity-60 mt-2">
          {title === 'Active Deploys' && <span className="text-[#4EC9B0] mr-2">●</span>}
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
