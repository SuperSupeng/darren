import fs from 'fs';
import path from 'path';
import { defaultLocale, isLocale, locales, type Locale } from '@/i18n/config';
import { archivedArticleCovers } from '@/lib/blog-images';

export interface BlogPost {
  slug: string;
  title: string;
  date?: string;
  archiveYear?: string;
  dateNote?: string;
  authors: string[];
  description: string;
  tags: string[];
  content: string;
  readingTime: number;
  image: {
    url: string;
    width: number;
    height: number;
  };
}

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

const postImages: Record<string, BlogPost['image']> = {
  ...archivedArticleCovers,
  'turning-expertise-into-an-asset': {
    url: '/blog/expertise-assets/aim-model.png',
    width: 673,
    height: 449,
  },
  'superai-china-ecosystem-visit': {
    url: '/blog/superai-china/team.jpg',
    width: 1922,
    height: 1280,
  },
  'managing-31-ai-employees': {
    url: '/blog/ai-employees/agent-town.png',
    width: 1922,
    height: 1080,
  },
  'zongtong-temple-retreat': {
    url: '/blog/zongtong-retreat/temple.jpg',
    width: 1707,
    height: 1280,
  },
};

const defaultPostImage: BlogPost['image'] = {
  url: '/og-image.png',
  width: 1200,
  height: 630,
};

type ParsedBlogContent = Pick<BlogPost, 'title' | 'date' | 'archiveYear' | 'dateNote' | 'authors' | 'description' | 'tags' | 'content'>;

// The local articles use single-line fields and an inline tag list.
// Invalid source metadata must fail before it can reach HTML, JSON-LD, or feeds.
export function parseBlogContent(source: string, context = 'Blog article'): ParsedBlogContent {
  const normalized = source.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n');
  const match = normalized.match(/^---\n([\s\S]*?)\n---(?:\n|$)([\s\S]*)$/);
  const fail = (message: string): never => {
    throw new Error(`${context}: ${message}`);
  };

  if (!match) return fail('a complete frontmatter block is required');

  const fields = new Map<string, string>();
  for (const line of match[1].split('\n')) {
    if (!line.trim() || line.trimStart().startsWith('#')) continue;
    const separator = line.indexOf(':');
    if (separator <= 0) return fail('frontmatter fields must use key: value');
    const key = line.slice(0, separator).trim();
    if (fields.has(key)) return fail(`duplicate frontmatter field: ${key}`);
    fields.set(key, line.slice(separator + 1).trim());
  }

  const text = (raw: string, field: string): string => {
    let value = raw.trim();
    if (value.startsWith('"') || value.startsWith("'")) {
      if (value.length < 2 || !value.endsWith(value[0])) return fail(`${field} has an unclosed quote`);
      if (value[0] === '"') {
        try {
          value = JSON.parse(value) as string;
        } catch {
          return fail(`${field} has invalid quoted text`);
        }
      } else {
        if (!/^'(?:[^']|'')*'$/.test(value)) return fail(`${field} has invalid quoted text`);
        value = value.slice(1, -1).replace(/''/g, "'");
      }
    } else if (/^[\[\]{|>]/.test(value)) {
      return fail(`${field} must be single-line text`);
    }
    if (!value.trim()) return fail(`${field} must not be empty`);
    if (/[\r\n]/.test(value)) return fail(`${field} must be single-line text`);
    return value;
  };
  const requiredText = (field: string) => text(fields.get(field) ?? '', field);
  const title = requiredText('title');
  const optionalText = (field: string) => fields.has(field) ? requiredText(field) : undefined;
  const date = optionalText('date');
  const archiveYear = optionalText('archiveYear');
  const dateNote = optionalText('dateNote');
  const description = requiredText('description');

  if (date) {
    const dateValue = new Date(`${date}T00:00:00Z`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)
      || Number.isNaN(dateValue.valueOf())
      || dateValue.toISOString().slice(0, 10) !== date) {
      return fail('date must be a valid calendar date in YYYY-MM-DD format');
    }
  }
  if (archiveYear && !/^[1-9]\d{3}$/.test(archiveYear)) return fail('archiveYear must be a four-digit year');
  if (!date && !archiveYear && !dateNote) return fail('date is required unless archiveYear or dateNote explains the unknown publication date');

  const inlineList = (field: string): string[] => {
    const raw = fields.get(field) ?? '';
    if (!raw.startsWith('[') || !raw.endsWith(']')) return fail(`${field} must be a non-empty inline list`);
    const values: string[] = [];
    let item = '';
    let quote = '';
    const list = raw.slice(1, -1);
    for (let index = 0; index < list.length; index += 1) {
      const character = list[index];
      if (quote === "'" && character === "'" && list[index + 1] === "'") {
        item += "''";
        index += 1;
        continue;
      }
      if (quote === '"' && character === '\\') {
        item += character + (list[++index] ?? '');
        continue;
      }
      if (character === quote) quote = '';
      else if (!quote && (character === '"' || character === "'") && !item.trim()) quote = character;
      if (character === ',' && !quote) {
        values.push(text(item, field));
        item = '';
      } else {
        item += character;
      }
    }
    if (quote) return fail(`${field} has an unclosed quote`);
    values.push(text(item, field));
    return values;
  };
  const tags = inlineList('tags');
  if (fields.has('author') && !fields.has('authors')) return fail('use the authors inline list instead of author');
  const authors = fields.has('authors') ? inlineList('authors') : ['Darren Su'];
  if (new Set(authors).size !== authors.length) return fail('authors must not contain duplicate names');

  const content = match[2];
  if (!content.trim()) return fail('article body must not be empty');
  return {
    title,
    ...(date ? { date } : {}),
    ...(archiveYear ? { archiveYear } : {}),
    ...(dateNote ? { dateNote } : {}),
    authors,
    description,
    tags,
    content,
  };
}

// Archive years locate an older text; they are never converted into publication dates.
// Within the same year, dated entries come first. Undated entries have a stable slug order.
export function compareBlogPosts(a: Pick<BlogPost, 'slug' | 'date' | 'archiveYear'>, b: Pick<BlogPost, 'slug' | 'date' | 'archiveYear'>): number {
  const yearDifference = Number(b.date?.slice(0, 4) ?? b.archiveYear ?? 0) - Number(a.date?.slice(0, 4) ?? a.archiveYear ?? 0);
  if (yearDifference) return yearDifference;
  if (a.date && b.date && a.date !== b.date) return a.date < b.date ? 1 : -1;
  if (Boolean(a.date) !== Boolean(b.date)) return a.date ? -1 : 1;
  return a.slug < b.slug ? -1 : a.slug > b.slug ? 1 : 0;
}

// 计算阅读时间（中文按字数，英文按词数）
function calculateReadingTime(content: string): number {
  const chineseChars = (content.match(/[\u4e00-\u9fa5]/g) || []).length;
  const words = content.replace(/[\u4e00-\u9fa5]/g, '').split(/\s+/).filter(Boolean).length;
  
  // 中文约 400 字/分钟，英文约 200 词/分钟
  const minutes = Math.ceil(chineseChars / 400 + words / 200);
  return Math.max(1, minutes);
}

function resolveBlogDir(locale: string): string {
  const safeLocale = isLocale(locale) ? locale : defaultLocale;
  const localeDir = path.join(BLOG_DIR, safeLocale);

  if (fs.existsSync(localeDir)) {
    return localeDir;
  }

  return path.join(BLOG_DIR, defaultLocale);
}

export function getAllPosts(locale: string = defaultLocale): BlogPost[] {
  const blogDir = resolveBlogDir(locale);

  if (!fs.existsSync(blogDir)) {
    return [];
  }

  const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
  
  const posts = files.map(filename => {
    const slug = filename.replace(/\.(md|mdx)$/, '');
    const filePath = path.join(blogDir, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    
    const parsed = parseBlogContent(fileContent, path.relative(process.cwd(), filePath));
    
    return {
      slug,
      ...parsed,
      readingTime: calculateReadingTime(parsed.content),
      image: postImages[slug] ?? defaultPostImage,
    };
  });

  return posts.sort(compareBlogPosts);
}

export function getPostBySlug(slug: string, locale: string = defaultLocale): BlogPost | null {
  const posts = getAllPosts(locale);
  return posts.find(p => p.slug === slug) || null;
}

export function getLocalizedBlogRoutes(): Array<{ locale: Locale; slug: string }> {
  return locales.flatMap((locale) =>
    getAllPosts(locale).map((post) => ({ locale, slug: post.slug }))
  );
}
