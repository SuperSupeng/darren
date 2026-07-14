import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getAllPostSlugs, getPostBySlug } from '@/lib/blog';
import { locales } from '@/i18n/config';
import JsonLd from '@/components/JsonLd';
import { absoluteLocalizedUrl, articleStructuredData, createPageMetadata } from '@/lib/seo';

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, locale);

  if (!post) {
    return { title: 'Not Found' };
  }

  const availableLocales = locales.filter((item) => getPostBySlug(slug, item));
  const metadataTitle =
    locale === 'en' && slug === 'superai-china-ecosystem-visit'
      ? "Connecting SuperAI With China's AI Ecosystem"
      : post.title;
  const metadataDescription =
    locale === 'en' && slug === 'superai-china-ecosystem-visit'
      ? 'A field note from accompanying SuperAI across Hangzhou and Shanghai, and what global technology teams should know about building lasting ties with China.'
      : post.description.length > 160
        ? `${post.description.slice(0, 157).trimEnd()}…`
        : post.description;

  return createPageMetadata({
    locale,
    path: `/blog/${slug}`,
    title: metadataTitle,
    description: metadataDescription,
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
      store(`<a href="${escapeAttribute(href)}" class="text-zen-gold-dim underline underline-offset-4 hover:text-ink-950" target="_blank" rel="noopener noreferrer">${escapeHtml(label)}</a>`)
    );

  html = escapeHtml(html)
    .replace(/\*\*\*(.*?)\*\*\*/g, '<strong class="text-ink-950"><em>$1</em></strong>')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-ink-950">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>');

  return html.replace(/@@MDTOKEN(\d+)@@/g, (_, index: string) => tokens[Number(index)] ?? '');
}

// Lightweight block renderer for the local field-notes markdown files.
function renderMarkdown(content: string, title: string, locale: string): string {
  const lines = content.replace(/\r\n/g, '\n').split('\n');
  const output: string[] = [];
  let paragraph: string[] = [];
  let listType: 'ul' | 'ol' | null = null;
  let listItems: string[] = [];
  let imageIndex = 0;

  const flushParagraph = () => {
    if (paragraph.length === 0) return;
    output.push(`<p class="mb-6 leading-9">${paragraph.map(renderInlineMarkdown).join('<br />')}</p>`);
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
      output.push(`<pre class="my-8 overflow-x-auto rounded-[8px] border border-ink-950/10 bg-paper-100 p-5 font-mono text-sm leading-7 text-ink-800"><code>${escapeHtml(codeLines.join('\n'))}</code></pre>`);
      continue;
    }

    const heading = trimmed.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();
      const level = heading[1].length;
      const text = renderInlineMarkdown(heading[2]);
      if (level === 1) {
        output.push(`<h1 class="mt-14 mb-6 font-serif text-4xl leading-tight text-ink-950">${text}</h1>`);
      } else if (level === 2) {
        output.push(`<h2 class="mt-12 mb-5 font-serif text-3xl leading-tight text-ink-950">${text}</h2>`);
      } else {
        output.push(`<h3 class="mt-10 mb-4 text-xl font-medium text-ink-950">${text}</h3>`);
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
      output.push(`<img src="${escapeAttribute(image[2])}" alt="${escapeAttribute(imageAlt)}" loading="lazy" decoding="async" class="my-8 h-auto max-w-full rounded-[8px]" />`);
      continue;
    }

    const quote = trimmed.match(/^>\s+(.+)$/);
    if (quote) {
      flushParagraph();
      flushList();
      output.push(`<blockquote class="my-6 border-l border-zen-gold/45 pl-5 font-serif text-xl leading-relaxed text-ink-700">${renderInlineMarkdown(quote[1])}</blockquote>`);
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
      <main className="min-h-screen bg-paper-200 px-4 py-20 text-ink-950 md:px-6 md:py-28">
        <article className="container">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/blog"
            className="quiet-link mb-10"
          >
            <span>{t('backToList')}</span>
          </Link>

          <div className="paper-open px-6 py-8 md:px-10 md:py-12">
            <header className="border-b border-ink-950/12 pb-12">
              {post.tags.length > 0 && (
                <div className="mb-5 flex flex-wrap gap-x-4 gap-y-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs uppercase tracking-[0.12em] text-ink-600/58"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <h1 className="font-serif text-5xl font-medium leading-tight md:text-6xl">
                {post.title}
              </h1>

              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-zen-gold-dim/75">
                <time dateTime={post.date}>{post.date}</time>
                <span>·</span>
                <span>{post.readingTime} {t('minRead')}</span>
                <span>·</span>
                <span>
                  {authorLabel}{' '}
                  <Link href="/about" rel="author" className="underline underline-offset-4 hover:text-ink-950">
                    Darren Su / 苏鹏
                  </Link>
                </span>
              </div>
            </header>

            <div
              className="mt-12 text-lg leading-9 text-ink-800"
              dangerouslySetInnerHTML={{ __html: renderedContent }}
            />

            <footer className="mt-16 border-t border-ink-950/12 pt-8">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <Link
                  href="/blog"
                  className="quiet-link"
                >
                  <span>{t('backToList')}</span>
                </Link>

                <div className="flex items-center gap-3">
                  <span className="text-sm text-zen-gold-dim/75">{t('share')}</span>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center border-b border-ink-950/14 text-zen-gold-dim transition-colors hover:border-ink-950/32 hover:text-ink-950"
                    aria-label={locale === 'zh' ? '分享到 X' : 'Share on X'}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                </div>
              </div>
            </footer>
          </div>
        </div>
        </article>
      </main>
    </>
  );
}
