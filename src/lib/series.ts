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
      zh: 'AI 时代的人与组织',
      en: 'AI-Era People & Organizations',
    },
    intro: {
      zh: [
        { text: '把任务交给 Agent 后，我开始重新思考分工、授权和管理。这些文章记录我遇到的问题。' },
      ],
      en: [
        { text: 'Delegating tasks to agents led me to rethink how work is assigned, who can make decisions, and how I manage it all. These essays describe the problems I encountered.' },
      ],
    },
  },
  'china-ai-on-the-ground': {
    name: {
      zh: 'China AI 现场',
      en: 'China AI, On the Ground',
    },
    intro: {
      zh: [{ text: '走访公司、参加社区活动、和各地伙伴聊天。我把这些经历写下来，记录自己看到的中国 AI 行业。' }],
      en: [{ text: 'Notes from company visits, community events, and conversations with people working on AI across China.' }],
    },
  },
  practice: {
    name: {
      zh: '实践与生活',
      en: 'Practice & Life',
    },
    intro: {
      zh: [{ text: '创业、公益课程、禅修和旅行。有些是当时的见闻，有些是过了一段时间才写下的回顾。' }],
      en: [{ text: 'Starting a business, volunteer teaching, meditation, and travel. Some notes were written at the time; others look back on those experiences.' }],
    },
  },
};

export function isSeriesSlug(value: string): value is SeriesSlug {
  return (seriesSlugs as readonly string[]).includes(value);
}

// Sub-groups belong to one series. The practice page shows a heading only when a post uses it.
export const seriesGroupSlugs = ['going-global'] as const;
export type SeriesGroupSlug = (typeof seriesGroupSlugs)[number];

export const seriesGroups: Record<SeriesGroupSlug, { series: SeriesSlug; name: Record<Locale, string> }> = {
  'going-global': {
    series: 'practice',
    name: {
      zh: '我的出海探索笔记',
      en: 'My notes on going global',
    },
  },
};

export function isSeriesGroupSlug(value: string): value is SeriesGroupSlug {
  return (seriesGroupSlugs as readonly string[]).includes(value);
}

export function visibleSeriesGroups(slug: SeriesSlug, posts: { seriesGroup?: SeriesGroupSlug }[]) {
  if (slug !== 'practice') return [];
  return seriesGroupSlugs.filter((group) => posts.some((post) => post.seriesGroup === group));
}

function seriesLocale(locale: string): Locale {
  return isLocale(locale) ? locale : defaultLocale;
}

export function getSeriesCopy(slug: SeriesSlug, locale: string) {
  const language = seriesLocale(locale);
  const series = seriesCatalog[slug];
  return { name: series.name[language], intro: series.intro[language] };
}

export function getSeriesGroupCopy(slug: SeriesGroupSlug, locale: string) {
  return seriesGroups[slug].name[seriesLocale(locale)];
}

// A placeholder is not a description. Pages with only a placeholder use the series name.
export function seriesMetaDescription(slug: SeriesSlug, locale: string) {
  const copy = getSeriesCopy(slug, locale);
  const written = copy.intro.filter((part) => !part.placeholder).map((part) => part.text);
  return written.length > 0 ? written.join(' ') : copy.name;
}
