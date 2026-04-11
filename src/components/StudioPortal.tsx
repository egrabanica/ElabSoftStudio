/*
 *   Copyright (c) 2026 
 *   All rights reserved.
 */
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Rocket, 
  FileCode, 
  Users, 
  Settings,
  ChevronRight,
  Activity,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface Project {
  id: string;
  name: string;
  status: 'on-track' | 'at-risk' | 'delayed';
  progress: number;
  health: number;
}

export function StudioPortal() {
  const [selectedProject, setSelectedProject] = useState<Project>({
    id: '1',
    name: 'SaaS Dashboard Platform',
    status: 'on-track',
    progress: 67,
    health: 85,
  });

  const [logs, setLogs] = useState<string[]>([
    '$ npm install --production',
    '$ Building TypeScript project... ✓',
    '$ Running unit tests... 247 passed ✓',
  ]);

  useEffect(() => {
    const logMessages = [
      '$ Deploying to Vercel staging...',
      '$ Database migrations applied ✓',
      '$ API endpoints: 24/24 healthy ✓',
      '$ Code review: All checks passed',
      '$ npm run build --production',
      '$ Lighthouse score: 98/100 ✓',
      '$ Bundle size: 124KB gzipped ✓',
      '$ Docker image pushed to registry',
    ];

    let index = 0;
    const interval = setInterval(() => {
      if (index < logMessages.length) {
        setLogs(prev => [...prev, logMessages[index]]);
        index++;
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen py-24 px-6">
      <div className="max-w-7xl mx-auto flex gap-8">
        {/* Floating Glass Rail Navigation */}
        <motion.nav
          className="glass-container-strong w-20 h-fit py-6 flex flex-col items-center gap-8 sticky top-24"
          style={{
            borderRadius: 'var(--radius-main)',
          }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <NavIcon icon={<LayoutDashboard size={24} />} active />
          <NavIcon icon={<Rocket size={24} />} />
          <NavIcon icon={<FileCode size={24} />} />
          <NavIcon icon={<Users size={24} />} />
          <div className="flex-1" />
          <NavIcon icon={<Settings size={24} />} />
        </motion.nav>

        {/* Main Content */}
        <div className="flex-1 space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 text-sm opacity-60 mb-4">
              <span>Dashboard</span>
              <ChevronRight size={16} />
              <span>Projects</span>
              <ChevronRight size={16} />
              <span className="text-[#D27D59]">{selectedProject.name}</span>
            </div>
            <h2 className="mb-2">{selectedProject.name}</h2>
            <p className="text-lg opacity-80">Real-time project health monitoring and deployment pipeline.</p>
          </motion.div>

          {/* Project Health Orb */}
          <motion.div
            className="glass-container p-8"
            style={{
              borderRadius: 'var(--radius-main)',
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="flex items-center gap-12">
              <div className="relative">
                <ProjectHealthOrb status={selectedProject.status} health={selectedProject.health} />
              </div>

              <div className="flex-1">
                <h3 className="mb-6">Project Health</h3>
                
                <div className="space-y-4">
                  <HealthMetric
                    icon={<Activity size={20} />}
                    label="System Status"
                    value={selectedProject.status === 'on-track' ? 'Nominal' : 'Attention Required'}
                    status={selectedProject.status === 'on-track' ? 'success' : 'warning'}
                  />
                  <HealthMetric
                    icon={<CheckCircle2 size={20} />}
                    label="Sprint Progress"
                    value={`${selectedProject.progress}% Complete`}
                    status="success"
                  />
                  <HealthMetric
                    icon={<AlertCircle size={20} />}
                    label="Open Issues"
                    value="3 Critical, 12 Minor"
                    status="warning"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-6">
            <StatCard
              title="Deploy Frequency"
              value="18/day"
              change="+12%"
              trend="up"
            />
            <StatCard
              title="Code Coverage"
              value="94.2%"
              change="+2.1%"
              trend="up"
            />
            <StatCard
              title="Bug Resolution"
              value="4.2 hrs"
              change="-18%"
              trend="down"
            />
          </div>

          {/* Glass Command Line */}
          <GlassCommandLine logs={logs} />
        </div>
      </div>
    </div>
  );
}

function NavIcon({ icon, active = false }: { icon: React.ReactNode; active?: boolean }) {
  return (
    <motion.button
      className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all ${
        active ? 'bg-[#D27D59] copper-glow' : 'hover:bg-white/5'
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {icon}
    </motion.button>
  );
}

function ProjectHealthOrb({ status, health }: { status: string; health: number }) {
  const isHealthy = status === 'on-track';
  const baseColor = isHealthy ? '#A0D2EB' : '#D27D59';
  const turbulence = isHealthy ? 0.01 : 0.05;

  return (
    <div className="relative w-64 h-64">
      <svg width="256" height="256" viewBox="0 0 256 256">
        <defs>
          <radialGradient id="orbGradient">
            <stop offset="0%" stopColor={baseColor} stopOpacity="0.8" />
            <stop offset="100%" stopColor={baseColor} stopOpacity="0.2" />
          </radialGradient>
          <filter id="liquidEffect">
            <feTurbulence
              type="fractalNoise"
              baseFrequency={turbulence}
              numOctaves="3"
              result="turbulence"
            >
              <animate
                attributeName="baseFrequency"
                values={`${turbulence};${turbulence + 0.02};${turbulence}`}
                dur="4s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="turbulence"
              scale={isHealthy ? "10" : "25"}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>

        <circle
          cx="128"
          cy="128"
          r="80"
          fill="url(#orbGradient)"
          filter="url(#liquidEffect)"
          className={isHealthy ? 'glacial-glow' : 'copper-glow'}
        />
        
        {/* Inner glow */}
        <circle
          cx="128"
          cy="128"
          r="60"
          fill="none"
          stroke={baseColor}
          strokeWidth="2"
          opacity="0.5"
        >
          <animate
            attributeName="r"
            values="60;65;60"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>

      {/* Health Percentage */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl font-bold mb-2">{health}%</div>
          <div className="text-sm uppercase tracking-wider opacity-60">Health Score</div>
        </div>
      </div>
    </div>
  );
}

function HealthMetric({ 
  icon, 
  label, 
  value, 
  status 
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: string; 
  status: 'success' | 'warning' 
}) {
  const color = status === 'success' ? '#A0D2EB' : '#D27D59';
  
  return (
    <div className="flex items-center gap-4">
      <div 
        className="w-10 h-10 rounded-lg flex items-center justify-center"
        style={{ backgroundColor: `${color}20` }}
      >
        <div style={{ color }}>{icon}</div>
      </div>
      <div className="flex-1">
        <div className="text-sm opacity-60 mb-1">{label}</div>
        <div className="font-semibold">{value}</div>
      </div>
    </div>
  );
}

function StatCard({ 
  title, 
  value, 
  change, 
  trend 
}: { 
  title: string; 
  value: string; 
  change: string; 
  trend: 'up' | 'down' 
}) {
  return (
    <motion.div
      className="glass-container p-6"
      style={{
        borderRadius: 'var(--radius-main)',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-sm uppercase tracking-wider opacity-60 mb-3">{title}</div>
      <div className="text-3xl font-bold mb-2">{value}</div>
      <div className={`text-sm flex items-center gap-1 ${trend === 'down' ? 'text-[#D27D59]' : 'text-[#A0D2EB]'}`}>
        <span>{change}</span>
        <span>vs last sprint</span>
      </div>
    </motion.div>
  );
}

function GlassCommandLine({ logs }: { logs: string[] }) {
  const displayLogs = logs.slice(-6);

  return (
    <motion.div
      className="glass-container p-6"
      style={{
        borderRadius: 'var(--radius-main)',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/50" />
        </div>
        <span className="text-sm uppercase tracking-wider opacity-60">Status Logs</span>
      </div>

      <div 
        className="font-mono text-sm space-y-2 h-32 overflow-y-auto"
        style={{ fontFamily: 'Monaco, Consolas, monospace' }}
      >
        {displayLogs.map((log, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="text-[#A0D2EB]"
          >
            {log}
          </motion.div>
        ))}
        <motion.div
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="inline-block w-2 h-4 bg-[#D27D59] ml-1"
        />
      </div>
    </motion.div>
  );
}