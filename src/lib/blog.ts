import fs from 'fs';
import path from 'path';
import { defaultLocale, isLocale, locales, type Locale } from '@/i18n/config';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
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

// 简单的 frontmatter 解析
function parseFrontmatter(content: string): { data: Record<string, unknown>; content: string } {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { data: {}, content };
  }

  const frontmatter = match[1];
  const body = match[2];
  
  const data: Record<string, unknown> = {};
  frontmatter.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      let value: unknown = line.slice(colonIndex + 1).trim();
      
      // 处理数组（简单的 YAML 数组格式）
      if (typeof value === 'string' && value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1).split(',').map(s => s.trim().replace(/['"]/g, ''));
      }
      // 处理引号
      if (typeof value === 'string' && ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'")))) {
        value = value.slice(1, -1);
      }
      
      data[key] = value;
    }
  });

  return { data, content: body };
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
    
    const { data, content } = parseFrontmatter(fileContent);
    
    return {
      slug,
      title: (data.title as string) || slug,
      date: (data.date as string) || new Date().toISOString().split('T')[0],
      description: (data.description as string) || '',
      tags: (data.tags as string[]) || [],
      content,
      readingTime: calculateReadingTime(content),
      image: postImages[slug] ?? defaultPostImage,
    };
  });

  // 按日期排序，最新的在前
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
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
