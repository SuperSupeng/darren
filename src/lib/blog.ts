import fs from 'fs';
import path from 'path';

export interface BlogPost {
  slug: string;
  title: string;
  titleEn?: string;
  date: string;
  description: string;
  descriptionEn?: string;
  tags: string[];
  content: string;
  readingTime: number;
}

const BLOG_DIR = path.join(process.cwd(), 'content/blog');

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

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
  
  const posts = files.map(filename => {
    const slug = filename.replace(/\.(md|mdx)$/, '');
    const filePath = path.join(BLOG_DIR, filename);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    
    const { data, content } = parseFrontmatter(fileContent);
    
    return {
      slug,
      title: (data.title as string) || slug,
      titleEn: data.titleEn as string | undefined,
      date: (data.date as string) || new Date().toISOString().split('T')[0],
      description: (data.description as string) || '',
      descriptionEn: data.descriptionEn as string | undefined,
      tags: (data.tags as string[]) || [],
      content,
      readingTime: calculateReadingTime(content),
    };
  });

  // 按日期排序，最新的在前
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | null {
  const posts = getAllPosts();
  return posts.find(p => p.slug === slug) || null;
}
