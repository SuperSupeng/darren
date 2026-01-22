'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useState } from 'react';

// 模拟博客数据（实际应从 getAllPosts 获取）
const mockPosts = [
  {
    slug: 'hello-world',
    title: '开始我的 Builder 之旅',
    titleEn: 'Starting My Builder Journey',
    description: '分享我为什么开始写博客，以及我想要构建的未来。',
    descriptionEn: 'Sharing why I started blogging and the future I want to build.',
    date: '2026-01-20',
    readingTime: 5,
    tags: ['Building', 'Thoughts'],
    featured: true,
  },
];

export default function BlogPage() {
  const t = useTranslations('blog');
  const locale = useLocale();
  const [hoveredPost, setHoveredPost] = useState<string | null>(null);
  
  // 使用 mock 数据，实际应使用 getAllPosts()
  const posts = mockPosts;
  const featuredPost = posts.find(p => p.featured);
  const regularPosts = posts.filter(p => !p.featured);

  return (
    <main className="min-h-screen pt-20 pb-16 relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 -z-10 bg-ink-950" />
      <div className="fixed inset-0 -z-10 bg-grid opacity-20" />
      
      {/* Decorative orbs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-geek-cyan/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-geek-purple/5 rounded-full blur-3xl" />
      </div>

      <div className="container">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-12 h-px bg-gradient-to-r from-transparent to-geek-cyan/50" />
              <span className="text-geek-cyan text-2xl">✎</span>
              <h1 className="text-3xl md:text-4xl font-medium">{t('title')}</h1>
              <span className="text-geek-cyan text-2xl">✎</span>
              <span className="w-12 h-px bg-gradient-to-l from-transparent to-geek-cyan/50" />
            </div>
            <p className="text-paper-400 text-lg max-w-xl mx-auto">{t('description')}</p>
          </div>

          {posts.length === 0 ? (
            /* Empty State */
            <div className="relative text-center py-20 rounded-2xl bg-ink-900/50 border border-ink-700/50">
              <div className="text-6xl mb-6">📝</div>
              <p className="text-paper-300 text-lg mb-2">{t('empty')}</p>
              <p className="text-paper-500 text-sm">First post coming soon...</p>
              
              {/* Decorative typing animation */}
              <div className="mt-8 font-mono text-sm text-paper-500">
                <span className="text-geek-green">$</span>
                <span className="ml-2">writing first_post.md</span>
                <span className="inline-block w-2 h-4 bg-geek-cyan ml-1 animate-pulse" />
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Featured Post */}
              {featuredPost && (
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="group block relative"
                  onMouseEnter={() => setHoveredPost(featuredPost.slug)}
                  onMouseLeave={() => setHoveredPost(null)}
                >
                  <div 
                    className={`relative p-8 md:p-10 rounded-3xl bg-ink-900/70 backdrop-blur-sm border overflow-hidden transition-all duration-500 ${
                      hoveredPost === featuredPost.slug 
                        ? 'border-geek-cyan/50 -translate-y-2' 
                        : 'border-ink-700/50'
                    }`}
                    style={{
                      boxShadow: hoveredPost === featuredPost.slug 
                        ? '0 20px 60px rgba(34, 211, 238, 0.15), 0 0 40px rgba(34, 211, 238, 0.1)' 
                        : 'none',
                    }}
                  >
                    {/* Featured badge */}
                    <div className="absolute top-6 right-6">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono bg-zen-gold/20 text-zen-gold border border-zen-gold/30">
                        <span className="w-1.5 h-1.5 bg-zen-gold rounded-full animate-pulse" />
                        FEATURED
                      </span>
                    </div>

                    {/* Background gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br from-geek-cyan/10 via-transparent to-geek-purple/10 transition-opacity duration-500 ${
                      hoveredPost === featuredPost.slug ? 'opacity-100' : 'opacity-0'
                    }`} />

                    {/* Content */}
                    <div className="relative z-10">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {featuredPost.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs font-mono px-3 py-1 rounded-lg bg-geek-cyan/10 text-geek-cyan border border-geek-cyan/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Title */}
                      <h2 className="text-2xl md:text-3xl font-medium text-paper-100 group-hover:text-geek-cyan transition-colors mb-4 pr-24">
                        {locale === 'en' && featuredPost.titleEn ? featuredPost.titleEn : featuredPost.title}
                      </h2>

                      {/* Description */}
                      <p className="text-paper-400 text-lg leading-relaxed mb-6 max-w-2xl">
                        {locale === 'en' && featuredPost.descriptionEn ? featuredPost.descriptionEn : featuredPost.description}
                      </p>

                      {/* Meta & CTA */}
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-4 text-sm font-mono text-paper-500">
                          <span>{featuredPost.date}</span>
                          <span className="w-1 h-1 bg-paper-600 rounded-full" />
                          <span>{featuredPost.readingTime} {t('minRead')}</span>
                        </div>

                        <div className="flex items-center gap-2 text-geek-cyan">
                          <span className="text-sm font-medium">{t('readMore')}</span>
                          <svg className="w-5 h-5 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Corner decorations */}
                    <div className={`absolute top-4 left-4 w-6 h-6 border-t border-l transition-colors duration-300 ${
                      hoveredPost === featuredPost.slug ? 'border-geek-cyan/50' : 'border-ink-700/30'
                    }`} />
                    <div className={`absolute bottom-4 right-4 w-6 h-6 border-b border-r transition-colors duration-300 ${
                      hoveredPost === featuredPost.slug ? 'border-geek-cyan/50' : 'border-ink-700/30'
                    }`} />
                  </div>
                </Link>
              )}

              {/* Regular Posts Grid */}
              {regularPosts.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {regularPosts.map((post, index) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group relative"
                      onMouseEnter={() => setHoveredPost(post.slug)}
                      onMouseLeave={() => setHoveredPost(null)}
                    >
                      <div 
                        className={`relative p-6 rounded-2xl bg-ink-900/70 backdrop-blur-sm border h-full transition-all duration-500 ${
                          hoveredPost === post.slug 
                            ? 'border-geek-purple/50 -translate-y-2' 
                            : 'border-ink-700/50'
                        }`}
                        style={{
                          boxShadow: hoveredPost === post.slug 
                            ? '0 20px 60px rgba(167, 139, 250, 0.15), 0 0 40px rgba(167, 139, 250, 0.1)' 
                            : 'none',
                        }}
                      >
                        {/* Content */}
                        <div className="relative z-10">
                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mb-3">
                            {post.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-xs font-mono px-2 py-1 rounded-md bg-geek-purple/10 text-geek-purple"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Title */}
                          <h2 className="text-xl font-medium text-paper-100 group-hover:text-geek-purple transition-colors mb-2">
                            {locale === 'en' && post.titleEn ? post.titleEn : post.title}
                          </h2>

                          {/* Description */}
                          <p className="text-paper-400 text-sm line-clamp-2 mb-4">
                            {locale === 'en' && post.descriptionEn ? post.descriptionEn : post.description}
                          </p>

                          {/* Meta */}
                          <div className="flex items-center gap-3 text-xs font-mono text-paper-500">
                            <span>{post.date}</span>
                            <span className="w-1 h-1 bg-paper-600 rounded-full" />
                            <span>{post.readingTime} {t('minRead')}</span>
                          </div>
                        </div>

                        {/* Index number */}
                        <div className="absolute bottom-4 right-4 text-3xl font-bold font-mono text-ink-700/50 group-hover:text-geek-purple/20 transition-colors">
                          {String(index + 2).padStart(2, '0')}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Newsletter CTA */}
          <div className="mt-16 relative">
            <div className="relative p-8 md:p-10 rounded-2xl bg-gradient-to-br from-geek-cyan/10 via-ink-900/80 to-geek-purple/10 border border-ink-700/50 overflow-hidden">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-grid opacity-20" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-geek-cyan/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-zen-gold/10 rounded-full blur-3xl" />
              
              <div className="relative z-10 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-zen-gold/20 border border-zen-gold/30 mb-4">
                  <span className="text-2xl">📬</span>
                </div>
                
                <h3 className="text-xl md:text-2xl font-medium mb-2">
                  {t('newsletter.title')}
                </h3>
                <p className="text-paper-400 mb-6 max-w-md mx-auto">
                  {t('newsletter.description')}
                </p>
                
                {/* Subscription Form */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder={t('newsletter.placeholder')}
                    className="w-full sm:flex-1 px-4 py-3 rounded-xl bg-ink-800/80 border border-ink-700 text-paper-100 placeholder:text-paper-500 focus:outline-none focus:border-zen-gold/50 focus:ring-1 focus:ring-zen-gold/30 transition-all"
                  />
                  <button className="w-full sm:w-auto btn btn-primary whitespace-nowrap">
                    {t('newsletter.button')}
                  </button>
                </div>
                
                <p className="mt-4 text-xs text-paper-500">
                  {t('newsletter.note')}
                </p>
              </div>

              {/* Corner decorations */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-zen-gold/30" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-zen-gold/30" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
