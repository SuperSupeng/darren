import { defaultLocale, isLocale, type Locale } from '@/i18n/config';

// Series names and intros live here so a later edit does not touch the page.
export const seriesSlugs = ['people-and-orgs', 'china-ai-on-the-ground', 'practice'] as const;
export type SeriesSlug = (typeof seriesSlugs)[number];

export type SeriesIntroPart = {
  text: string;
  placeholder?: boolean;
};

type SeriesDefinition = {
  name: Record<Locale, string>;
  intro: Record<Locale, SeriesIntroPart[]>;
};

export const seriesCatalog: Record<SeriesSlug, SeriesDefinition> = {
  'people-and-orgs': {
    name: {
      zh: 'AI 时代的人和组织',
      en: 'AI-Era People & Organizations',
    },
    intro: {
      zh: [
        { text: '长期研究 AI 时代的人与组织。' },
        { text: '（导语待 Darren 写）', placeholder: true },
      ],
      en: [
        { text: 'Exploring AI, people & organizations.' },
        { text: '(Intro to be written by Darren)', placeholder: true },
      ],
    },
  },
  'china-ai-on-the-ground': {
    name: {
      zh: 'China AI 现场',
      en: 'China AI, On the Ground',
    },
    intro: {
      zh: [{ text: '（导语待 Darren 写）', placeholder: true }],
      en: [{ text: 'A ground-level guide to China’s AI ecosystem for global founders and builders.' }],
    },
  },
  practice: {
    name: {
      zh: '实践与生活',
      en: 'Practice & Life',
    },
    intro: {
      zh: [{ text: '（导语待 Darren 写）', placeholder: true }],
      en: [{ text: '(Intro to be written by Darren)', placeholder: true }],
    },
  },
};

export function isSeriesSlug(value: string): value is SeriesSlug {
  return (seriesSlugs as readonly string[]).includes(value);
}

function seriesLocale(locale: string): Locale {
  return isLocale(locale) ? locale : defaultLocale;
}

export function getSeriesCopy(slug: SeriesSlug, locale: string) {
  const language = seriesLocale(locale);
  const series = seriesCatalog[slug];
  return { name: series.name[language], intro: series.intro[language] };
}

// A placeholder is not a description. Pages with only a placeholder use the series name.
export function seriesMetaDescription(slug: SeriesSlug, locale: string) {
  const copy = getSeriesCopy(slug, locale);
  const written = copy.intro.filter((part) => !part.placeholder).map((part) => part.text);
  return written.length > 0 ? written.join(' ') : copy.name;
}
