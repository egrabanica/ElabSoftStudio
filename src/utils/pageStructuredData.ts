import type { Language } from '../hooks/useLanguage';

export type SeoScreen = 'engine' | 'blueprint' | 'contact';

const ORG_ID = 'https://elabsoft.com/#organization';
const SITE_ID = 'https://elabsoft.com/#website';
const BASE = 'https://elabsoft.com/';

export function buildDynamicStructuredData(screen: SeoScreen, language: Language) {
  const en = language === 'en';
  const webPageId = `${BASE}#webpage-${screen}`;
  const pageName =
    screen === 'engine'
      ? en
        ? 'ElabSoft Studio — Home'
        : 'ElabSoft Studio — Kreu'
      : screen === 'blueprint'
        ? en
          ? 'ElabSoft Studio — Portfolio'
          : 'ElabSoft Studio — Portofoli'
        : en
          ? 'ElabSoft Studio — Contact'
          : 'ElabSoft Studio — Kontakt';

  const pageDescription =
    screen === 'engine'
      ? en
        ? 'Custom software, enterprise web applications, and scalable digital infrastructure from ElabSoft Studio in Pristina, Kosovo.'
        : 'Aplikacione te personalizuara, sisteme enterprise dhe infrastrukture digjitale nga ElabSoft Studio ne Prishtine.'
      : screen === 'blueprint'
        ? en
          ? 'Selected client and product engineering work by ElabSoft Studio, including news platforms, business sites, and education software.'
          : 'Projekte te zgjedhura nga ElabSoft Studio: platforma lajmesh, faqe biznesi dhe software arsimor.'
        : en
          ? 'Contact ElabSoft Studio for software projects, APIs, and cloud infrastructure.'
          : 'Kontaktoni ElabSoft Studio per projekte software, API dhe infrastrukture cloud.';

  const breadcrumbItems =
    screen === 'engine'
      ? [
          { name: en ? 'Home' : 'Kreu', item: BASE },
        ]
      : screen === 'blueprint'
        ? [
            { name: en ? 'Home' : 'Kreu', item: BASE },
            { name: en ? 'Portfolio' : 'Portofoli', item: `${BASE}#portfolio` },
          ]
        : [
            { name: en ? 'Home' : 'Kreu', item: BASE },
            { name: en ? 'Contact' : 'Kontakt', item: `${BASE}#contact` },
          ];

  const graph: Record<string, unknown>[] = [
    {
      '@type': 'WebPage',
      '@id': webPageId,
      url: screen === 'engine' ? BASE : screen === 'blueprint' ? `${BASE}#portfolio` : `${BASE}#contact`,
      name: pageName,
      description: pageDescription,
      inLanguage: language,
      isPartOf: { '@id': SITE_ID },
      about: { '@id': ORG_ID },
      publisher: { '@id': ORG_ID },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${webPageId}#breadcrumb`,
      itemListElement: breadcrumbItems.map((b, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: b.name,
        item: b.item,
      })),
    },
  ];

  if (screen === 'engine') {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${BASE}#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: en ? 'What does ElabSoft Studio build?' : 'Cfarë ndërton ElabSoft Studio?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: en
              ? 'ElabSoft Studio builds custom web applications, enterprise APIs, backend infrastructure, and cloud-ready systems tailored to client needs.'
              : 'ElabSoft Studio ndërton aplikacione web te personalizuara, API enterprise, infrastrukture backend dhe sisteme te gatshem per cloud sipas nevojave te klientit.',
          },
        },
        {
          '@type': 'Question',
          name: en ? 'Where is ElabSoft Studio located?' : 'Ku ndodhet ElabSoft Studio?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: en
              ? 'ElabSoft Studio is based in Pristina, Kosovo, and works with clients remotely across Europe and beyond.'
              : 'ElabSoft Studio është i bazuar në Prishtinë, Kosovë, dhe punon me klientë në distancë në Evropë dhe më gjerë.',
          },
        },
        {
          '@type': 'Question',
          name: en ? 'How can I start a project?' : 'Si mund te filloj nje projekt?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: en
              ? 'Use the Contact section on this website to describe your goals, timeline, and technical constraints. The team responds with a structured next step.'
              : 'Përdorni seksionin Kontakt në këtë faqe për të përshkruar objektivat, afatin dhe kufizimet teknike. Ekipi përgjigjet me hapin tjetër të strukturuar.',
          },
        },
      ],
    });
  }

  if (screen === 'blueprint') {
    graph.push({
      '@type': 'ItemList',
      '@id': `${BASE}#portfolio-itemlist`,
      name: en ? 'Featured projects' : 'Projektet kryesore',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'ZE News',
          url: 'https://www.zennews.net/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Thaqi Vertrieb',
          url: 'https://thaqiprospektvertrieb.de/',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'INVENT Platform',
          url: 'https://tests.invent.york.citycollege.eu/',
        },
      ],
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
