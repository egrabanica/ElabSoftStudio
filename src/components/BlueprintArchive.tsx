import { motion, useReducedMotion } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

interface Project {
  id: string;
  title: string;
  description: string;
  wireframeColor: string;
  specs: {
    latency: string;
    scalability: string;
    architecture: string;
  };
  imageUrl: string;
}

const projects: Project[] = [
  {
    id: '1',
    title: 'React Native FinTech App',
    description: 'Cross-platform mobile banking application built with React Native, Redux, and serverless backend. Real-time payment processing with end-to-end encryption.',
    wireframeColor: '#D27D59',
    specs: {
      latency: '120ms',
      scalability: '500K+ users',
      architecture: 'React Native + AWS Lambda',
    },
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=640&q=75&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'SaaS Dashboard Platform',
    description: 'Enterprise analytics dashboard built with Next.js, TypeScript, and PostgreSQL. Features real-time data visualization, multi-tenancy, and role-based access control.',
    wireframeColor: '#A0D2EB',
    specs: {
      latency: '40ms',
      scalability: '10M+ requests/day',
      architecture: 'Next.js + Vercel',
    },
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=640&q=75&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'E-Commerce Headless CMS',
    description: 'Jamstack e-commerce platform with headless Shopify, GraphQL API layer, and React frontend. Optimized for performance with edge caching and CDN delivery.',
    wireframeColor: '#D27D59',
    specs: {
      latency: '85ms',
      scalability: '1M+ products',
      architecture: 'Jamstack + GraphQL',
    },
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=640&q=75&auto=format&fit=crop',
  },
  {
    id: '4',
    title: 'AI Code Review System',
    description: 'Machine learning powered code analysis tool built with Python, FastAPI, and TensorFlow. Automated PR reviews, bug detection, and code quality scoring.',
    wireframeColor: '#A0D2EB',
    specs: {
      latency: '2.1s',
      scalability: '50K+ repos',
      architecture: 'Python + FastAPI',
    },
    imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=640&q=75&auto=format&fit=crop',
  },
];

export function BlueprintArchive() {
  const language = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const t = language === 'sq'
    ? {
        titleStart: 'Projektet',
        titleAccent: 'Kryesore',
        subtitle:
          'Zgjidhje software te nivelit production te ndertuara nga zero. Cdo projekt pasqyron ekspertizen tone ne te gjithe stack-un, nga frontend te infrastruktura backend.',
        previous: 'Projektet e meparshme',
        next: 'Projektet pasuese',
        latency: 'Vonesa',
        scalability: 'Shkallezueshmeri',
        architecture: 'Arkitektura',
      }
    : {
        titleStart: 'Featured',
        titleAccent: 'Projects',
        subtitle:
          "Production-grade software solutions we've engineered from the ground up. Each project showcases our expertise across the full stack—from frontend frameworks to backend infrastructure.",
        previous: 'Previous projects',
        next: 'Next projects',
        latency: 'Latency',
        scalability: 'Scalability',
        architecture: 'Architecture',
      };

  const localizedProjects = language === 'sq'
    ? projects.map((project) => {
        const sqMap: Record<string, { title: string; description: string }> = {
          '1': {
            title: 'Aplikacion FinTech me React Native',
            description:
              'Aplikacion bankar cross-platform i ndertuar me React Native, Redux dhe backend serverless. Procesim pagesash ne kohe reale me enkriptim fund-me-fund.',
          },
          '2': {
            title: 'Platforme Dashboard SaaS',
            description:
              'Dashboard analitik enterprise i ndertuar me Next.js, TypeScript dhe PostgreSQL. Ofron vizualizim te dhenash ne kohe reale, multi-tenancy dhe kontroll aksesesh sipas roleve.',
          },
          '3': {
            title: 'CMS Headless per E-Commerce',
            description:
              'Platforme Jamstack e-commerce me Shopify headless, shtrese API GraphQL dhe frontend React. E optimizuar per performance me edge caching dhe CDN.',
          },
          '4': {
            title: 'Sistem AI per Code Review',
            description:
              'Mjet analize kodi me machine learning i ndertuar me Python, FastAPI dhe TensorFlow. Rishikime automatike PR, zbulim bugs dhe vleresim cilesie kodi.',
          },
        };
        return {
          ...project,
          title: sqMap[project.id]?.title || project.title,
          description: sqMap[project.id]?.description || project.description,
        };
      })
    : projects;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateScrollState = () => {
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      setCanScrollLeft(container.scrollLeft > 8);
      setCanScrollRight(container.scrollLeft < maxScrollLeft - 8);
    };

    updateScrollState();
    container.addEventListener('scroll', updateScrollState);
    window.addEventListener('resize', updateScrollState);

    return () => {
      container.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, []);

  const scrollProjects = (direction: 'left' | 'right') => {
    const container = containerRef.current;
    if (!container) return;

    const step = Math.min(540, Math.max(280, Math.floor(container.clientWidth * 0.85)));
    const amount = direction === 'left' ? -step : step;
    container.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen py-12 sm:py-20 md:py-24 px-4 sm:px-6">
      <motion.div
        className="max-w-7xl mx-auto mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="mb-4">{t.titleStart} <span className="text-gradient-copper">{t.titleAccent}</span></h2>
        <p className="text-base sm:text-lg md:text-xl max-w-2xl">
          {t.subtitle}
        </p>
      </motion.div>

      {/* Horizontal Filmstrip */}
      <div className="relative max-w-7xl mx-auto">
        <motion.button
          type="button"
          aria-label={t.previous}
          onClick={() => scrollProjects('left')}
          disabled={!canScrollLeft}
          className="absolute left-0 sm:-left-3 md:-left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-2xl glass-container-strong flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          whileHover={{ scale: canScrollLeft ? 1.08 : 1 }}
          whileTap={{ scale: canScrollLeft ? 0.96 : 1 }}
        >
          <ChevronLeft size={22} className="text-[#D27D59]" />
        </motion.button>

        <div
          ref={containerRef}
          className="flex gap-8 overflow-x-auto pb-8 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {localizedProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              labels={{
                latency: t.latency,
                scalability: t.scalability,
                architecture: t.architecture,
              }}
            />
          ))}
        </div>

        <motion.button
          type="button"
          aria-label={t.next}
          onClick={() => scrollProjects('right')}
          disabled={!canScrollRight}
          className="absolute right-0 sm:-right-3 md:-right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-2xl glass-container-strong flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          whileHover={{ scale: canScrollRight ? 1.08 : 1 }}
          whileTap={{ scale: canScrollRight ? 0.96 : 1 }}
        >
          <ChevronRight size={22} className="text-[#D27D59]" />
        </motion.button>
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  index,
  labels,
}: {
  project: Project;
  index: number;
  labels: { latency: string; scalability: string; architecture: string };
}) {
  const [isHovered, setIsHovered] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="relative shrink-0 w-[min(100vw-2.5rem,500px)] min-h-[min(90vh,650px)] sm:h-[650px] snap-center"
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glass Card */}
      <motion.div
        className="glass-container h-full flex flex-col overflow-hidden"
        style={{
          borderRadius: 'var(--radius-main)',
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Wireframe Ghost / Full Color Image */}
        <div className="relative h-[min(42vh,400px)] sm:h-[400px] overflow-hidden refraction-effect">
          {/* Wireframe State */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ opacity: isHovered ? 0 : 1 }}
            transition={{ duration: 0.5 }}
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 400 400"
              className="opacity-40"
            >
              <defs>
                <pattern id={`grid-${project.id}`} width="40" height="40" patternUnits="userSpaceOnUse">
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke={project.wireframeColor}
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#grid-${project.id})`} />
              
              {/* 3D Wireframe Elements */}
              <motion.g
                animate={
                  reduceMotion
                    ? { rotateY: 0 }
                    : {
                        rotateY: [0, 360],
                      }
                }
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { duration: 20, repeat: Infinity, ease: 'linear' }
                }
                style={{ transformOrigin: '50% 50%' }}
              >
                <rect x="80" y="80" width="240" height="160" fill="none" stroke={project.wireframeColor} strokeWidth="2" />
                <rect x="100" y="100" width="200" height="120" fill="none" stroke={project.wireframeColor} strokeWidth="1.5" />
                <line x1="80" y1="80" x2="100" y2="100" stroke={project.wireframeColor} strokeWidth="1" />
                <line x1="320" y1="80" x2="300" y2="100" stroke={project.wireframeColor} strokeWidth="1" />
                <line x1="80" y1="240" x2="100" y2="220" stroke={project.wireframeColor} strokeWidth="1" />
                <line x1="320" y1="240" x2="300" y2="220" stroke={project.wireframeColor} strokeWidth="1" />
              </motion.g>
              
              {/* Glowing center */}
              <motion.circle
                cx="200"
                cy="200"
                r="30"
                fill="none"
                stroke={project.wireframeColor}
                strokeWidth="2"
                animate={
                  reduceMotion
                    ? { scale: 1, opacity: 0.75 }
                    : {
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5],
                      }
                }
                transition={reduceMotion ? { duration: 0 } : { duration: 2, repeat: Infinity }}
              />
            </svg>
          </motion.div>

          {/* Full Color Image */}
          <motion.div
            className="absolute inset-0"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
              sizes="(max-width: 640px) 90vw, 500px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="flex-1 p-5 sm:p-8 flex flex-col">
          <h3 className="mb-3">{project.title}</h3>
          <p className="mb-6 flex-1 leading-relaxed">{project.description}</p>

          {/* Spec Tags */}
          <div className="flex flex-wrap gap-2">
            <SpecTag label={labels.latency} value={project.specs.latency} />
            <SpecTag label={labels.scalability} value={project.specs.scalability} />
            <SpecTag label={labels.architecture} value={project.specs.architecture} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function SpecTag({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="glass-container px-3 py-1.5 flex items-center gap-2"
      style={{
        borderRadius: 'var(--radius-tech)',
      }}
    >
      <span className="text-xs uppercase tracking-wider opacity-60">{label}:</span>
      <span className="text-sm font-semibold text-[#D27D59]">{value}</span>
    </div>
  );
}