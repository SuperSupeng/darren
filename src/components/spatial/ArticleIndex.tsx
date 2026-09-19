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
    <div className="collection-notes-list">
      {posts.map((post) => (
        <article key={post.slug} className="collection-note-entry">
          <div className="collection-note-date">
            <ArticleDate post={post} locale={locale} />
          </div>
          <div className="collection-note-body">
            <h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3>
            <p className="collection-description">{post.description}</p>
            <Link href={`/blog/${post.slug}`} className="collection-text-link">{readLabel} <span aria-hidden="true">↗</span></Link>
          </div>
          <Link href={`/blog/${post.slug}`} className="collection-note-image" aria-label={`${readLabel} · ${post.title}`}>
            <Image src={post.image.url} alt="" fill sizes="(max-width: 600px) 100vw, 200px" />
          </Link>
        </article>
      ))}
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
