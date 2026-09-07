import type { BlogPost } from '@/lib/blog';

type ArticleDateProps = {
  post: Pick<BlogPost, 'date' | 'archiveYear' | 'dateNote'>;
  locale: string;
};

export default function ArticleDate({ post, locale }: ArticleDateProps) {
  if (post.date) return <time dateTime={post.date}>{post.date}</time>;

  const label = post.dateNote ?? (locale === 'zh'
    ? `${post.archiveYear} 年旧文`
    : `From ${post.archiveYear}`);

  return <span>{label}</span>;
}
