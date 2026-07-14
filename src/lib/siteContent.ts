import { englishContent } from './site-content/en';
import { chineseContent } from './site-content/zh';
import type { LocalizedContent } from './site-content/types';

export type { LocalizedContent };

export function getSiteContent(locale: string): LocalizedContent {
  return locale === 'zh' ? chineseContent : englishContent;
}
