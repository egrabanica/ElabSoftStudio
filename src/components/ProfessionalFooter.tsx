import { motion } from 'motion/react';
import { Github, Linkedin, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import logo from 'figma:asset/952983e2909debfaa69697fd87a26c282a28d218.png';
import { useLanguage } from '../hooks/useLanguage';

export function ProfessionalFooter() {
  const currentYear = new Date().getFullYear();
  const language = useLanguage();
  const t = language === 'sq'
    ? {
        description:
          'Studio elite e inxhinierise softuerike, e specializuar ne aplikacione te personalizuara, sisteme per ndermarrje dhe infrastrukture digjitale me performance te larte.',
        services: 'Sherbimet',
        company: 'Kompania',
        servicesList: ['Infrastrukture Backend', 'API per Ndermarrje', 'Zhvillim Full-Stack', 'Zgjidhje Cloud', 'Inxhinieri DevOps'],
        companyList: ['Rreth Nesh', 'Puna Jone', 'Karriera', 'Blog', 'Kontakti'],
        copyright: `© ${currentYear} ElabSoft Studio. Te gjitha sistemet operacionale.`,
        builtWith: 'Ndertuar me:',
        
      }
    : {
        description:
          'Elite software engineering house specializing in custom applications, enterprise systems, and high-performance digital infrastructure.',
        services: 'Services',
        company: 'Company',
        servicesList: ['Backend Infrastructure', 'Enterprise APIs', 'Full-Stack Development', 'Cloud Solutions', 'DevOps Engineering'],
        companyList: ['About Us', 'Our Work', 'Careers', 'Blog', 'Contact'],
        copyright: `© ${currentYear} ElabSoft Studio. All systems operational.`,
        builtWith: 'Built with:',
        
      };

  return (
    <footer className="relative mt-16 sm:mt-24 md:mt-32 mb-16 sm:mb-24 md:mb-32 pb-[env(safe-area-inset-bottom,0px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          className="glass-container-strong"
          style={{
            borderRadius: 'var(--radius-main)',
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="px-4 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12">
            {/* Top Section */}
            <div className="grid md:grid-cols-4 gap-8 sm:gap-10 md:gap-12 mb-8 sm:mb-12">
              {/* Company Info */}
              <div className="md:col-span-2">
                <div className="mb-6">
                  <img
                    src={logo}
                    alt="ElabSoft Studio Brand Logo"
                    className="h-24 sm:h-28 md:h-32 lg:h-36 w-auto object-contain object-left drop-shadow-lg"
                    decoding="async"
                    loading="lazy"
                  />
                </div>
                <p className="text-sm leading-relaxed opacity-80 mb-6 max-w-sm">
                  {t.description}
                </p>
                
                {/* Social Links */}
                <div className="flex gap-3">
                  <SocialButton icon={<Github size={18} />} href="#" />
                  <SocialButton icon={<Linkedin size={18} />} href="#" />
                  <SocialButton icon={<Twitter size={18} />} href="#" />
                  <SocialButton icon={<Mail size={18} />} href="#" />
                </div>
              </div>

              {/* Services */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-[#D27D59]">
                  {t.services}
                </h3>
                <ul className="space-y-3">
                  {t.servicesList.map((item) => (
                    <FooterLink key={item} href="#">{item}</FooterLink>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-[#D27D59]">
                  {t.company}
                </h3>
                <ul className="space-y-3">
                  {t.companyList.map((item) => (
                    <FooterLink key={item} href="#">{item}</FooterLink>
                  ))}
                </ul>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />

            {/* Contact Info & Bottom Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              {/* Contact Details */}
              <div className="flex flex-wrap gap-6 text-sm opacity-70">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#A0D2EB]" />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-[#A0D2EB]" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-[#A0D2EB]" />
                  <span>hello@elabsoft.studio</span>
                </div>
              </div>

              {/* Copyright */}
              <div className="text-sm opacity-60">
                {t.copyright}
              </div>
            </div>

            {/* Tech Stack Badge */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="flex flex-wrap items-center gap-3 justify-center text-xs opacity-50">
                <span>{t.builtWith}</span>
                <TechBadge>React</TechBadge>
                <TechBadge>TypeScript</TechBadge>
                <TechBadge>Tailwind CSS</TechBadge>
                <TechBadge>Motion</TechBadge>
                <span className="text-[#D27D59]">{t.deployed}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

function SocialButton({ icon, href }: { icon: React.ReactNode; href: string }) {
  return (
    <motion.a
      href={href}
      className="w-10 h-10 rounded-xl glass-container flex items-center justify-center hover:bg-white/10 transition-all"
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      {icon}
    </motion.a>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <motion.a
        href={href}
        className="text-sm opacity-70 hover:opacity-100 hover:text-[#D27D59] transition-all inline-block"
        whileHover={{ x: 4 }}
      >
        {children}
      </motion.a>
    </li>
  );
}

function TechBadge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="px-2 py-1 rounded glass-container"
      style={{
        borderRadius: 'var(--radius-tech)',
        fontSize: '10px',
      }}
    >
      {children}
    </span>
  );
}
