export type WorkCase = {
  id: string;
  title: string;
  type: string;
  status: string;
  year: string;
  location: string;
  summary: string;
  context: string;
  goal: string;
  workDone: string[];
  happened: string[];
  learned: string;
  reusablePattern: string;
  tags: string[];
};

export type LocalizedContent = typeof import('./en').englishContent;
