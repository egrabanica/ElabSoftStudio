import { motion } from 'motion/react';
import { Compass, Wrench, Rocket } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

interface FrameworkStep {
  icon: React.ReactNode;
  title: string;
  detail: string;
  metric: string;
}

const frameworkSteps: FrameworkStep[] = [
  {
    icon: <Compass size={24} />,
    title: 'Discover & Architect',
    detail: 'We map product goals, constraints, and technical risks into a build-ready blueprint.',
    metric: 'Week 1 alignment',
  },
  {
    icon: <Wrench size={24} />,
    title: 'Build & Validate',
    detail: 'Iterative implementation with measurable checkpoints, quality gates, and test coverage.',
    metric: 'CI-first delivery',
  },
  {
    icon: <Rocket size={24} />,
    title: 'Launch & Scale',
    detail: 'Production rollout with observability, performance tuning, and post-launch optimization.',
    metric: '99.9% reliability target',
  },
];

export function ExecutionFramework() {
  const language = useLanguage();
  const t = language === 'sq'
    ? {
        titleStart: 'Korniza Jone e',
        titleAccent: 'Dorezimit',
        subtitle: 'Nje proces i fokusuar inxhinierik qe i kthen idete e produktit ne sisteme te sigurta dhe te shkallezueshme.',
        step: 'Hapi',
        steps: [
          {
            icon: <Compass size={24} />,
            title: 'Zbulim & Arkitektim',
            detail: 'Hartojme objektivat e produktit, kufizimet dhe rreziqet teknike ne nje plan te gatshem per ndertim.',
            metric: 'Rreshtim ne javen 1',
          },
          {
            icon: <Wrench size={24} />,
            title: 'Ndertim & Validim',
            detail: 'Implementim iterativ me pika kontrolli te matshme, porta cilesie dhe mbulim testesh.',
            metric: 'Dorezim me CI ne qender',
          },
          {
            icon: <Rocket size={24} />,
            title: 'Lansim & Shkallezim',
            detail: 'Publikim ne prodhim me observueshmeri, optimizim performance dhe permiresim pas-lansimit.',
            metric: 'Objektiv besueshmerie 99.9%',
          },
        ] as FrameworkStep[],
      }
    : {
        titleStart: 'Our Delivery',
        titleAccent: 'Framework',
        subtitle: 'A focused engineering process that transforms product ideas into secure, scalable systems.',
        step: 'Step',
        steps: frameworkSteps,
      };

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="mb-4">
            {t.titleStart} <span className="text-gradient-copper">{t.titleAccent}</span>
          </h2>
          <p className="text-xl max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {t.steps.map((step, index) => (
            <motion.article
              key={step.title}
              className="glass-container p-8 relative group"
              style={{ borderRadius: 'var(--radius-main)' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12, duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
            >
              <div
                className="w-12 h-12 rounded-xl glass-container-strong flex items-center justify-center mb-6 text-[#D27D59]"
                style={{ background: 'rgba(210, 125, 89, 0.12)' }}
              >
                {step.icon}
              </div>

              <div className="text-xs uppercase tracking-[0.18em] text-[#A0D2EB] mb-2">
                {t.step} {index + 1}
              </div>
              <h3 className="mb-3">{step.title}</h3>
              <p className="leading-relaxed mb-6">{step.detail}</p>

              <div className="text-sm font-semibold text-[#D27D59]">{step.metric}</div>

              <motion.div
                className="absolute inset-0 rounded-[var(--radius-main)] border border-[#D27D59]/30 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ pointerEvents: 'none' }}
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
