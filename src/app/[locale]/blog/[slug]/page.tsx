import { notFound } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { getAllPosts, getPostBySlug } from '@/lib/blog';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post) {
    return { title: 'Not Found' };
  }

  const title = locale === 'en' && post.titleEn ? post.titleEn : post.title;
  const description = locale === 'en' && post.descriptionEn ? post.descriptionEn : post.description;

  return {
    title: `${title} | Blog`,
    description,
  };
}

// 简单的 Markdown 渲染（基础版本）
function renderMarkdown(content: string): string {
  return content
    // Headers
    .replace(/^### (.*$)/gm, '<h3 class="text-xl font-medium mt-8 mb-4">$1</h3>')
    .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-medium mt-10 mb-4">$1</h2>')
    .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-medium mt-12 mb-6">$1</h1>')
    // Bold & Italic
    .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-paper-100">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Code blocks
    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-ink-800 rounded-lg p-4 my-6 overflow-x-auto font-mono text-sm"><code>$2</code></pre>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="bg-ink-800 px-1.5 py-0.5 rounded text-geek-cyan font-mono text-sm">$1</code>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-geek-cyan hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
    // Images
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="rounded-lg my-6 max-w-full" />')
    // Blockquotes
    .replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-zen-gold/50 pl-4 my-4 text-paper-300 italic">$1</blockquote>')
    // Unordered lists
    .replace(/^\- (.*$)/gm, '<li class="ml-4">$1</li>')
    // Ordered lists
    .replace(/^\d+\. (.*$)/gm, '<li class="ml-4">$1</li>')
    // Paragraphs
    .replace(/\n\n/g, '</p><p class="mb-4 leading-relaxed">')
    // Line breaks
    .replace(/\n/g, '<br />');
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug);
  const t = await getTranslations({ locale, namespace: 'blog' });

  if (!post) {
    notFound();
  }

  const title = locale === 'en' && post.titleEn ? post.titleEn : post.title;
  const renderedContent = renderMarkdown(post.content);

  return (
    <main className="min-h-screen pt-24 pb-16">
      {/* Background */}
      <div className="fixed inset-0 -z-10 bg-ink-950" />
      <div className="fixed inset-0 -z-10 bg-grid opacity-20" />

      <article className="container">
        <div className="max-w-3xl mx-auto">
          {/* Back Link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-paper-400 hover:text-geek-cyan transition-colors mb-8 group"
          >
            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            <span>{t('backToList')}</span>
          </Link>

          {/* Header */}
          <header className="mb-10">
            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono px-2 py-1 rounded-md bg-geek-cyan/10 text-geek-cyan"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-medium text-paper-100 mb-4">
              {title}
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-4 text-sm font-mono text-paper-500">
              <span>{post.date}</span>
              <span>·</span>
              <span>{post.readingTime} {t('minRead')}</span>
            </div>
          </header>

          {/* Content */}
          <div 
            className="prose prose-invert max-w-none text-paper-300"
            dangerouslySetInnerHTML={{ __html: `<p class="mb-4 leading-relaxed">${renderedContent}</p>` }}
          />

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-ink-700/50">
            <div className="flex items-center justify-between">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-paper-400 hover:text-geek-cyan transition-colors group"
              >
                <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                <span>{t('backToList')}</span>
              </Link>

              {/* Share */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-paper-500">{t('share')}</span>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(`https://darrensu.com/blog/${post.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-ink-800/50 text-paper-400 hover:text-geek-cyan hover:bg-ink-800 transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </footer>
        </div>
      </article>
    </main>
  );
}
