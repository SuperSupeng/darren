import { englishPortfolio } from './en';
import { portfolioImageDimensions } from './images';
import type { CollaborationPath, PortfolioContent, PortfolioWork } from './types';
import { chinesePortfolio } from './zh';

export type { CollaborationPath, PortfolioContent, PortfolioMetric, PortfolioWork } from './types';

export function getPortfolio(locale: string): PortfolioContent {
  const portfolio = locale === 'zh' ? chinesePortfolio : englishPortfolio;

  return {
    ...portfolio,
    work: portfolio.work.map((item) => {
      const dimensions = item.image ? portfolioImageDimensions[item.image] : undefined;

      if (item.image && !dimensions) {
        throw new Error(`Missing image dimensions for portfolio asset: ${item.image}`);
      }

      return {
        ...item,
        href: `/work/${item.id}`,
        imageWidth: dimensions?.width,
        imageHeight: dimensions?.height,
      };
    }),
  };
}

export function getWorkById(locale: string, id: string): PortfolioWork | null {
  return getPortfolio(locale).work.find((item) => item.id === id) ?? null;
}

const workCollaborationIds: Record<string, CollaborationPath['id']> = {
  'wechat-innovation-workshop': 'field-visits',
  'superai-china': 'field-visits',
  'agent-speaking': 'field-visits',
  'stepfun-four-cities': 'field-visits',
  'aix-creation-festival': 'field-visits',
  'waic-pioneers-night': 'field-visits',
  'rumata-workshop': 'field-visits',
  'datawhale-city-ecosystem': 'field-visits',
};

export function getWorkCollaboration(locale: string, workId: string): CollaborationPath | null {
  const collaborationId = workCollaborationIds[workId];

  return getPortfolio(locale).collaborations.find((item) => item.id === collaborationId) ?? null;
}

export function getAllWorkIds(): string[] {
  return Array.from(new Set([...chinesePortfolio.work, ...englishPortfolio.work].map((item) => item.id)));
}

const featuredWorkIds = [
  'superai-china',
  'rumata-workshop',
  'agent-speaking',
] as const;

export function getFeaturedWork(locale: string): PortfolioWork[] {
  const { work } = getPortfolio(locale);

  return featuredWorkIds
    .map((id) => work.find((item) => item.id === id))
    .filter((item): item is PortfolioWork => Boolean(item));
}
