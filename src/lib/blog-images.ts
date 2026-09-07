import aiForGood from '../../public/blog/ai-for-good-youth-classes/sources.json';
import yearInReview from '../../public/blog/2025-year-in-review/sources.json';
import agiVilla from '../../public/blog/why-i-started-agi-villa/sources.json';
import aiMemory from '../../public/blog/how-ai-memory-works/sources.json';
import rag from '../../public/blog/rag-from-demo-to-production/sources.json';
import myScale from '../../public/blog/myscaledb-vector-database-dialogue/sources.json';

type ArticleImageManifest = {
  cover: string | null;
  images: { file: string; width: number; height: number; hasAlpha: boolean }[];
};

const articleImages: [string, ArticleImageManifest][] = [
  ['ai-for-good-youth-classes', aiForGood],
  ['2025-year-in-review', yearInReview],
  ['why-i-started-agi-villa', agiVilla],
  ['how-ai-memory-works', aiMemory],
  ['rag-from-demo-to-production', rag],
  ['myscaledb-vector-database-dialogue', myScale],
];

// Share the verified original dimensions between article rendering and cover metadata.
export const archivedArticleImages = Object.fromEntries(articleImages.flatMap(([slug, manifest]) =>
  manifest.images.map(({ file, width, height, hasAlpha }) => [
    `/blog/${slug}/${file}`,
    { width, height, ...(hasAlpha ? { backgroundColor: '#ffffff' } : {}) },
  ])
));

export const archivedArticleCovers = Object.fromEntries(articleImages.flatMap(([slug, manifest]) => {
  const cover = manifest.images.find(({ file }) => file === manifest.cover);
  return cover ? [[slug, { url: `/blog/${slug}/${cover.file}`, width: cover.width, height: cover.height }]] : [];
}));
