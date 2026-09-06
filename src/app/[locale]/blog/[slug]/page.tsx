import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getAllPosts, getPostBySlug } from '@/lib/blog';
import { locales } from '@/i18n/config';
import JsonLd from '@/components/JsonLd';
import RoomPortal from '@/components/spatial/RoomPortal';
import '@/components/spatial/interiors.css';
import { absoluteLocalizedUrl, articleStructuredData, createPageMetadata } from '@/lib/seo';
import { createArticleHeadingAnchors } from '@/lib/article-anchors';

export function generateStaticParams({ params }: { params: { locale: string } }) {
  return getAllPosts(params.locale).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, locale);

  if (!post) {
    return {
      title: locale === 'zh' ? '页面未找到' : 'Page not found',
      description: locale === 'zh' ? '这个页面不存在，或者暂时没有对应语言的版本。' : 'This page does not exist, or is not yet available in this language.',
      alternates: { canonical: `/${locale}/blog/${slug}` },
      robots: { index: false, follow: false },
    };
  }

  const availableLocales = locales.filter((item) => getPostBySlug(slug, item));
  return createPageMetadata({
    locale,
    path: `/blog/${slug}`,
    title: post.title,
    description: post.description,
    keywords: [...post.tags, 'Darren Su', 'field notes'],
    image: post.image.url,
    imageWidth: post.image.width,
    imageHeight: post.image.height,
    imageAlt: post.title,
    availableLocales,
    openGraphType: 'article',
    publishedTime: post.date,
  });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeAttribute(value: string): string {
  return escapeHtml(value).replace(/`/g, '&#96;');
}

function renderLink(label: string, rawHref: string): string {
  const href = rawHref.trim();
  const isExternal = /^https?:\/\//i.test(href);
  const isRootRelative = href.startsWith('/') && !href.startsWith('//') && !href.includes('\\');
  const isSafe = isExternal || isRootRelative || href.startsWith('#') || /^mailto:/i.test(href);

  if (!isSafe) return escapeHtml(label);

  const externalAttributes = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
  return `<a href="${escapeAttribute(href)}" class="text-zen-gold-dim underline underline-offset-4 hover:text-ink-950"${externalAttributes}>${escapeHtml(label)}</a>`;
}

function renderInlineMarkdown(value: string): string {
  const tokens: string[] = [];
  const store = (html: string) => {
    const index = tokens.push(html) - 1;
    return `@@MDTOKEN${index}@@`;
  };

  let html = value
    .replace(/`([^`]+)`/g, (_, code: string) =>
      store(`<code class="rounded bg-ink-700/8 px-1.5 py-0.5 font-mono text-sm text-zen-gold-dim">${escapeHtml(code)}</code>`)
    )
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label: string, href: string) =>
      store(renderLink(label, href))
    )
    .replace(/(^|[\s(])((?:https?:\/\/)[^\s<)]+)/g, (_, prefix: string, href: string) =>
      `${prefix}${store(`<a href="${escapeAttribute(href)}" class="break-words text-zen-gold-dim underline underline-offset-4 hover:text-ink-950" target="_blank" rel="noopener noreferrer">${escapeHtml(href)}</a>`)}`
    );

  html = escapeHtml(html)
    .replace(/\*\*\*(.*?)\*\*\*/g, '<strong class="text-ink-950"><em>$1</em></strong>')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-ink-950">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>');

  return html.replace(/@@MDTOKEN(\d+)@@/g, (_, index: string) => tokens[Number(index)] ?? '');
}

const inlineImageDimensions: Record<string, { width: number; height: number }> = {
  '/blog/ai-employees/agent-roles.png': { width: 1480, height: 2866 },
  '/blog/ai-employees/agent-town.png': { width: 1922, height: 1080 },
  '/blog/ai-employees/digital-organization.png': { width: 878, height: 834 },
  '/blog/ai-employees/global-tech-events.jpg': { width: 2880, height: 1558 },
  '/blog/ai-employees/management-history.png': { width: 866, height: 738 },
  '/blog/ai-employees/openclaw.png': { width: 1016, height: 1062 },
  '/blog/superai-china/route.png': { width: 225, height: 225 },
  '/blog/superai-china/team.jpg': { width: 1922, height: 1280 },
  '/blog/zongtong-retreat/ani-teacher.jpg': { width: 1280, height: 1920 },
  '/blog/zongtong-retreat/dog-garden.jpg': { width: 1080, height: 1439 },
  '/blog/zongtong-retreat/farewell.jpg': { width: 960, height: 1508 },
  '/blog/zongtong-retreat/meditation.jpg': { width: 1024, height: 1536 },
  '/blog/zongtong-retreat/pigeon.jpg': { width: 960, height: 2079 },
  '/blog/zongtong-retreat/relic.jpg': { width: 960, height: 1696 },
  '/blog/zongtong-retreat/temple.jpg': { width: 1707, height: 1280 },
};

// Lightweight block renderer for the local field-notes markdown files.
function renderMarkdown(content: string, title: string, locale: string): string {
  const lines = content.replace(/\r\n/g, '\n').split('\n');
  const output: string[] = [];
  let paragraph: string[] = [];
  let listType: 'ul' | 'ol' | null = null;
  let listItems: string[] = [];
  let imageIndex = 0;
  const nextHeadingAnchors = createArticleHeadingAnchors();

  const flushParagraph = () => {
    if (paragraph.length === 0) return;
    const separator = locale === 'zh' ? '' : ' ';
    output.push(`<p class="mb-6 leading-9">${paragraph.map(renderInlineMarkdown).join(separator)}</p>`);
    paragraph = [];
  };

  const flushList = () => {
    if (!listType || listItems.length === 0) return;
    const tag = listType;
    const className = tag === 'ul'
      ? 'my-6 list-disc space-y-3 pl-5 leading-8 text-ink-700'
      : 'my-6 list-decimal space-y-3 pl-5 leading-8 text-ink-700';
    output.push(`<${tag} class="${className}">${listItems.join('')}</${tag}>`);
    listType = null;
    listItems = [];
  };

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      flushList();
      continue;
    }

    const codeBlock = trimmed.match(/^```(\w+)?$/);
    if (codeBlock) {
      flushParagraph();
      flushList();
      const codeLines: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].trim().startsWith('```')) {
        codeLines.push(lines[index]);
        index += 1;
      }
      output.push(`<pre tabindex="0" class="my-8 overflow-x-auto rounded-[8px] border border-ink-950/10 bg-paper-100 p-5 font-mono text-sm leading-7 text-ink-800"><code>${escapeHtml(codeLines.join('\n'))}</code></pre>`);
      continue;
    }

    const horizontalRule = trimmed.match(/^([-*_])(?:\s*\1){2,}$/);
    if (horizontalRule) {
      flushParagraph();
      flushList();
      output.push('<hr class="my-10 border-0 border-t border-ink-950/12" />');
      continue;
    }

    const heading = trimmed.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();
      const level = heading[1].length;
      const { id, sectionId } = nextHeadingAnchors(heading[2]);
      const anchorAttributes = `id="${escapeAttribute(id)}" data-article-section="${escapeAttribute(sectionId)}"`;
      const text = `<span id="${escapeAttribute(sectionId)}" aria-hidden="true" class="block scroll-mt-24"></span>${renderInlineMarkdown(heading[2])}`;
      if (level === 1) {
        output.push(`<h1 ${anchorAttributes} class="scroll-mt-24 mt-14 mb-6 font-serif text-4xl leading-tight text-ink-950">${text}</h1>`);
      } else if (level === 2) {
        output.push(`<h2 ${anchorAttributes} class="scroll-mt-24 mt-12 mb-5 font-serif text-3xl leading-tight text-ink-950">${text}</h2>`);
      } else if (level === 3) {
        output.push(`<h3 ${anchorAttributes} class="scroll-mt-24 mt-10 mb-4 text-xl font-medium text-ink-950">${text}</h3>`);
      } else {
        output.push(`<h${level} ${anchorAttributes} class="scroll-mt-24 mt-8 mb-3 text-lg font-medium leading-relaxed text-ink-950">${text}</h${level}>`);
      }
      continue;
    }

    const image = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (image) {
      flushParagraph();
      flushList();
      imageIndex += 1;
      const fallbackAlt = locale === 'zh'
        ? `${title}，配图 ${imageIndex}`
        : `${title}, image ${imageIndex}`;
      const imageAlt = image[1].trim() || fallbackAlt;
      const dimensions = inlineImageDimensions[image[2]];
      const sizeAttributes = dimensions
        ? ` width="${dimensions.width}" height="${dimensions.height}"`
        : '';
      output.push(`<img src="${escapeAttribute(image[2])}" alt="${escapeAttribute(imageAlt)}"${sizeAttributes} loading="lazy" decoding="async" class="my-8 h-auto max-w-full rounded-[8px]" />`);
      continue;
    }

    const quote = trimmed.match(/^>\s?(.*)$/);
    if (quote) {
      flushParagraph();
      flushList();
      const quoteLines: string[] = [];
      while (index < lines.length) {
        const quoteMatch = lines[index].trim().match(/^>\s?(.*)$/);
        if (!quoteMatch) break;
        quoteLines.push(quoteMatch[1]);
        index += 1;
      }
      index -= 1;
      const quoteParagraphs = quoteLines
        .join('\n')
        .split(/\n\s*\n/)
        .filter(Boolean)
        .map((value) => `<p>${renderInlineMarkdown(value.replace(/\n/g, locale === 'zh' ? '' : ' '))}</p>`)
        .join('');
      output.push(`<blockquote class="my-6 space-y-4 border-l border-zen-gold/45 pl-5 font-serif text-xl leading-relaxed text-ink-700">${quoteParagraphs}</blockquote>`);
      continue;
    }

    const unorderedItem = trimmed.match(/^[-*]\s+(.+)$/);
    const orderedItem = trimmed.match(/^\d+\.\s+(.+)$/);
    if (unorderedItem || orderedItem) {
      flushParagraph();
      const nextType = unorderedItem ? 'ul' : 'ol';
      if (listType && listType !== nextType) {
        flushList();
      }
      listType = nextType;
      listItems.push(`<li>${renderInlineMarkdown((unorderedItem || orderedItem)?.[1] ?? '')}</li>`);
      continue;
    }

    flushList();
    paragraph.push(trimmed);
  }

  flushParagraph();
  flushList();

  return output.join('\n');
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, locale);
  const t = await getTranslations({ locale, namespace: 'blog' });

  if (!post) {
    notFound();
  }

  const renderedContent = renderMarkdown(post.content, post.title, locale);
  const shareUrl = absoluteLocalizedUrl(locale, `/blog/${post.slug}`);
  const authorLabel = locale === 'zh' ? '作者' : 'By';

  return (
    <>
      <JsonLd data={articleStructuredData(post, locale)} />
      <main id="main-content" tabIndex={-1} className="interior-page reading-page">
        <div className="interior-wrap">
          <div className="interior-running-line"><Link href="/blog" className="interior-text-link">← {t('backToList')}</Link><span>{locale === 'zh' ? '文章与手记 / WRITING' : 'ARTICLES AND NOTES'}</span></div>
          <div className="reading-layout">
            <aside className="reading-sidebar">
              <RoomPortal zone="notes" locale={locale} compact />
              <div className="reading-colophon">
                <span className="interior-kicker">{authorLabel}</span>
                <Link href="/about" rel="author">Darren Su / 苏鹏</Link>
                <time dateTime={post.date}>{post.date}</time>
                <span>{post.readingTime} {t('minRead')}</span>
              </div>
              <p className="reading-side-note">{locale === 'zh' ? '记录工作、实践与生活中的思考。' : 'Notes and reflections on work, practice, and life.'}</p>
            </aside>
            <article className="reading-sheet">
              <header className="reading-header">
                {post.tags.length > 0 && <div className="interior-tags">{post.tags.map(tag => <span key={tag}>{tag}</span>)}</div>}
                <h1>{post.title}</h1>
                <p className="reading-deck">{post.description}</p>
                <div className="reading-byline"><time dateTime={post.date}>{post.date}</time><span aria-hidden="true">·</span><span>{post.readingTime} {t('minRead')}</span><span aria-hidden="true">·</span><Link href="/about" rel="author">Darren Su</Link></div>
              </header>
              <div className="reading-prose" dangerouslySetInnerHTML={{ __html: renderedContent }} />
              <footer className="reading-footer">
                <Link href="/blog" className="interior-text-link">← {t('backToList')}</Link>
                <div className="reading-share"><span>{t('share')}</span><a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" aria-label={locale === 'zh' ? '分享到 X' : 'Share on X'}>
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                </a></div>
              </footer>
            </article>
          </div>
        </div>
      </main>
    </>
  );
}
