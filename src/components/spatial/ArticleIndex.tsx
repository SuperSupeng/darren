import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import type { BlogPost } from '@/lib/blog';
import ArticleDate from '@/components/blog/ArticleDate';

export function ArticleIndex({
  posts,
  locale,
  empty,
  readLabel,
}: {
  posts: BlogPost[];
  locale: string;
  empty: string;
  readLabel: string;
}) {
  if (posts.length === 0) {
    return <p className="collection-description">{empty}</p>;
  }

  return (
    <div className="article-directory">
      {posts.map(post => <article key={post.slug}>
        <Link className="article-directory-link" href={`/blog/${post.slug}`}>
          <div className="article-directory-copy">
            <p className="article-directory-meta"><ArticleDate post={post} locale={locale} /><span>{post.readingTime} {locale === 'zh' ? '分钟阅读' : 'min read'}</span></p>
            <h3>{post.title}</h3>
            <p className="article-directory-description">{post.description}</p>
            <span className="article-directory-read">{readLabel} <span aria-hidden="true">→</span></span>
          </div>
          <div className="article-directory-image"><Image src={post.image.url} alt="" fill sizes="(max-width: 600px) 80px, 150px" /></div>
        </Link>
      </article>)}
    </div>
  );
}

export function FeaturedArticle({
  post,
  locale,
  eyebrow,
  readLabel,
}: {
  post: BlogPost;
  locale: string;
  eyebrow: string;
  readLabel: string;
}) {
  return (
    <section className="collection-section collection-latest">
      <div className="collection-journal-masthead">
        <p>{eyebrow}</p>
        <ArticleDate post={post} locale={locale} />
      </div>
      <article className="collection-latest-story">
        <Link href={`/blog/${post.slug}`} className="collection-latest-image" aria-label={`${readLabel} · ${post.title}`}>
          <Image src={post.image.url} alt="" fill sizes="(min-width: 950px) 58vw, 100vw" />
        </Link>
        <div className="collection-latest-copy">
          <h2><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2>
          <p className="collection-description">{post.description}</p>
          <Link href={`/blog/${post.slug}`} className="collection-text-link">{readLabel} <span aria-hidden="true">↗</span></Link>
        </div>
      </article>
    </section>
  );
}
