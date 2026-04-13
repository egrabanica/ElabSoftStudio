import { motion } from 'motion/react';
import { Globe, Monitor, Smartphone } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

interface AppType {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const appTypes: AppType[] = [
  {
    icon: <Globe size={24} />,
    title: 'Web Apps',
    description: 'Fast, responsive web applications designed for modern browsers and real user workflows.',
  },
  {
    icon: <Monitor size={24} />,
    title: 'Desktop Apps',
    description: 'Reliable desktop software with strong performance for day-to-day production environments.',
  },
  {
    icon: <Smartphone size={24} />,
    title: 'Mobile Apps',
    description: 'Mobile-first experiences for iOS and Android with clean UX and scalable architecture.',
  },
];

export function AppTypes() {
  const language = useLanguage();
  const t = language === 'sq'
    ? {
        titleStart: 'Llojet e',
        titleAccent: 'Aplikacioneve',
        subtitle: 'Ndertojme produkte te pershtatura per web, desktop dhe mobile sipas nevojave tuaja.',
        items: [
          {
            icon: <Globe size={24} />,
            title: 'Aplikacione Web',
            description: 'Aplikacione web te shpejta dhe responsive, te dizajnuara per shfletues modern dhe procese reale pune.',
          },
          {
            icon: <Monitor size={24} />,
            title: 'Aplikacione Desktop',
            description: 'Software desktop i besueshem me performance te forte per mjedise pune te perditshme.',
          },
          {
            icon: <Smartphone size={24} />,
            title: 'Aplikacione Mobile',
            description: 'Eksperienca mobile per iOS dhe Android me UX te paster dhe arkitekture te shkallezueshme.',
          },
        ] as AppType[],
      }
    : {
        titleStart: 'Types of',
        titleAccent: 'Apps I Build',
        subtitle: 'I create tailored products across web, desktop, and mobile ecosystems.',
        items: appTypes,
      };

  return (
    <section className="py-12 sm:py-20 md:py-24 px-4 sm:px-6">
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
          <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-1">
            {t.subtitle}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {t.items.map((item, index) => (
            <motion.article
              key={item.title}
              className="glass-container p-5 sm:p-6 relative group"
              style={{ borderRadius: 'var(--radius-main)' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.55 }}
              whileHover={{ scale: 1.02 }}
            >
              <div
                className="w-12 h-12 rounded-xl glass-container-strong flex items-center justify-center mb-5 text-[#D27D59]"
                style={{ background: 'rgba(210, 125, 89, 0.12)' }}
              >
                {item.icon}
              </div>
              <h3 className="mb-2 text-[clamp(1.1rem,1.4vw,1.5rem)]">{item.title}</h3>
              <p className="leading-relaxed text-sm sm:text-base">{item.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
