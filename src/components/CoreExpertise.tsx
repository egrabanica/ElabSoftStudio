import { motion } from 'motion/react';
import { Database, Code2, Layers, Cloud } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    icon: <Database size={28} />,
    title: 'Scalable Backend Infrastructure',
    description: 'High-performance server architectures built for exponential growth.',
  },
  {
    icon: <Code2 size={28} />,
    title: 'Custom Enterprise APIs',
    description: 'Bespoke RESTful and GraphQL interfaces tailored to your ecosystem.',
  },
  {
    icon: <Layers size={28} />,
    title: 'Full-Stack Product Orchestration',
    description: 'End-to-end system design from database to deployment.',
  },
  {
    icon: <Cloud size={28} />,
    title: 'Cloud-Native Solutions',
    description: 'Containerized microservices optimized for AWS, Azure, and GCP.',
  },
];

export function CoreExpertise() {
  const language = useLanguage();
  const t = language === 'sq'
    ? {
        titleStart: 'Ekspertiza Kryesore e',
        titleAccent: 'Inxhinierise',
        subtitle: 'Aftesi te sprovuara ne te gjithe ciklin e zhvillimit te software-it.',
        services: [
          {
            icon: <Database size={28} />,
            title: 'Infrastrukture Backend e Shkallezueshme',
            description: 'Arkitektura serveri me performance te larte, te ndertuara per rritje eksponenciale.',
          },
          {
            icon: <Code2 size={28} />,
            title: 'API te Personalizuara per Ndermarrje',
            description: 'Nderfaqe RESTful dhe GraphQL te pershtatura sipas ekosistemit tuaj.',
          },
          {
            icon: <Layers size={28} />,
            title: 'Orkestrimi i Produkteve Full-Stack',
            description: 'Dizenjim fund-me-fund i sistemit, nga databaza deri te deploy.',
          },
          {
            icon: <Cloud size={28} />,
            title: 'Zgjidhje Cloud-Native',
            description: 'Mikroservise ne konteiner, te optimizuara per AWS, Azure dhe GCP.',
          },
        ] as Service[],
      }
    : {
        titleStart: 'Core Engineering',
        titleAccent: 'Expertise',
        subtitle: 'Battle-tested capabilities across the full software development lifecycle.',
        services,
      };

  return (
    <div className="py-12 sm:py-20 md:py-24 px-4 sm:px-6">
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
            {t.titleStart} <span className="text-gradient-copper">{t.titleAccent}</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-1">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
          {t.services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <motion.div
      className="glass-container p-5 sm:p-8 relative group"
      style={{
        borderRadius: 'var(--radius-main)',
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Icon Container */}
      <div
        className="w-16 h-16 rounded-2xl glass-container-strong flex items-center justify-center mb-6 group-hover:copper-glow transition-all duration-300"
        style={{
          background: 'rgba(210, 125, 89, 0.1)',
        }}
      >
        <div className="text-[#D27D59]">{service.icon}</div>
      </div>

      {/* Content */}
      <h3 className="mb-3">{service.title}</h3>
      <p className="leading-relaxed">{service.description}</p>

      {/* Hover Effect */}
      <motion.div
        className="absolute inset-0 rounded-[var(--radius-main)] border-2 border-[#D27D59] opacity-0 group-hover:opacity-30 transition-opacity duration-300"
        style={{ pointerEvents: 'none' }}
      />
    </motion.div>
  );
}
