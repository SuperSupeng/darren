export type PortfolioMetric = {
  value: string;
  label: string;
  note: string;
};

export type PortfolioWork = {
  id: string;
  category: 'ecosystem' | 'conference' | 'global' | 'speaking';
  title: string;
  year: string;
  location: string;
  role: string;
  summary: string;
  heroSummary?: string;
  result: string;
  image?: string;
  imageAlt?: string;
  imageClassName?: string;
  imageWidth?: number;
  imageHeight?: number;
  href?: string;
  noteHref?: string;
  caseStudy: {
    context: string;
    responsibilities: string[];
    outcome: string;
    outcomeNote?: string;
    reflection: string;
    materials?: {
      type: string;
      title: string;
      description: string;
      href: string;
    }[];
  };
};

export type CollaborationPath = {
  id: 'developer-events' | 'product-workshops' | 'ai-talks';
  number: string;
  title: string;
  bestFor: string;
  description: string;
  outcomes: string[];
  invitation: string;
  linkLabel: string;
  inquiry: string[];
};

export type PortfolioContent = {
  metrics: PortfolioMetric[];
  work: PortfolioWork[];
  collaborations: CollaborationPath[];
};
