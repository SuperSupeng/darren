import type { BlogPost } from './blog';
import type { PortfolioWork } from './portfolio';
import { absoluteLocalizedUrl } from './seo';

function frontmatter(values: Record<string, string | string[]>) {
  return ['---', ...Object.entries(values).map(([key, value]) => `${key}: ${JSON.stringify(value)}`), '---'].join('\n');
}

// Keep code examples untouched when making Markdown usable outside the website.
export function absoluteMarkdownLinks(content: string, canonical: string) {
  let fence: { marker: string; length: number } | undefined;
  return content.split('\n').map((line) => {
    const marker = line.match(/^\s*(`{3,}|~{3,})/);
    if (marker) {
      if (!fence) fence = { marker: marker[1][0], length: marker[1].length };
      else if (marker[1][0] === fence.marker && marker[1].length >= fence.length && /^\s*(`+|~+)\s*$/.test(line)) fence = undefined;
      return line;
    }
    if (fence) return line;
    return line.split(/(`+[^`]*`+)/g).map((part) => {
      if (part.startsWith('`')) return part;
      return part.replace(/(!?\[[^\]]*\]\()([/#][^\s)]*)(\))/g, (_, start: string, href: string, end: string) => {
        const target = new URL(href, canonical);
        if (target.origin === new URL(canonical).origin && /^\/(?:blog|work)\/[^/.]+$|^\/(?:about|services|build|blog|work)$/.test(target.pathname)) {
          const locale = new URL(canonical).pathname.split('/')[1];
          target.pathname = `/${locale}${target.pathname}`;
        }
        return `${start}${target.href}${end}`;
      });
    }).join('');
  }).join('\n');
}

export function articleMarkdown(post: BlogPost, locale: string) {
  const canonical = absoluteLocalizedUrl(locale, `/blog/${post.slug}`);
  return [
    frontmatter({
      title: post.title,
      author: 'Darren Su / 苏鹏',
      language: locale === 'zh' ? 'zh-CN' : 'en',
      date: post.date,
      canonical,
      description: post.description,
      tags: post.tags,
    }),
    `# ${post.title}`,
    post.description,
    absoluteMarkdownLinks(post.content.trim(), canonical),
    '',
  ].join('\n\n');
}

export function caseMarkdown(work: PortfolioWork, locale: string) {
  const canonical = absoluteLocalizedUrl(locale, `/work/${work.id}`);
  const labels = locale === 'zh'
    ? ['时间与地点', '我的角色', '规模与结果', '项目背景', '我负责的部分', '完成了什么', '我的体会', '相关文章与资料']
    : ['Time and place', 'My role', 'Scale and outcome', 'Project background', 'What I handled', 'What was completed', 'What the work taught me', 'Related articles and resources'];
  const body = [
    `# ${work.title}`,
    work.summary,
    `${labels[0]}: ${work.year} · ${work.location}`,
    `${labels[1]}: ${work.role}`,
    `${labels[2]}: ${work.result}`,
    ...(work.image ? [`![${work.imageAlt ?? work.title}](${work.image})`] : []),
    `## ${labels[3]}`, work.caseStudy.context,
    `## ${labels[4]}`, work.caseStudy.responsibilities.map((item, index) => `${index + 1}. ${item}`).join('\n'),
    `## ${labels[5]}`, work.caseStudy.outcome,
    ...(work.caseStudy.outcomeNote ? [work.caseStudy.outcomeNote] : []),
    `## ${labels[6]}`, work.caseStudy.reflection,
    ...(work.caseStudy.materials?.length ? [
      `## ${labels[7]}`,
      ...work.caseStudy.materials.map(item => `- [${item.title}](${item.href}) — ${item.type}\n\n  ${item.description}`),
    ] : work.noteHref ? [`## ${labels[7]}`, `[${labels[7]}](${work.noteHref})`] : []),
  ].join('\n\n');
  return [
    frontmatter({
      title: work.title,
      author: 'Darren Su / 苏鹏',
      language: locale === 'zh' ? 'zh-CN' : 'en',
      canonical,
      description: work.summary,
    }),
    absoluteMarkdownLinks(body, canonical),
    '',
  ].join('\n\n');
}

export function markdownResponse(body: string, canonical: string, locale: string) {
  return new Response(body, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Content-Language': locale === 'zh' ? 'zh-CN' : 'en',
      Link: `<${canonical}>; rel="canonical"`,
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
