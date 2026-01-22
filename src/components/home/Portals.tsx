'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function Portals() {
  const t = useTranslations('portals');

  const portals = [
    {
      key: 'build',
      href: '/build',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      color: 'geek-cyan',
      gradient: 'from-geek-cyan/15 via-geek-cyan/5 to-transparent',
    },
    {
      key: 'community',
      href: '/community',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: 'geek-purple',
      gradient: 'from-geek-purple/15 via-geek-purple/5 to-transparent',
    },
    {
      key: 'impact',
      href: '/impact',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      color: 'zen-bamboo',
      gradient: 'from-zen-bamboo/15 via-zen-bamboo/5 to-transparent',
    },
    {
      key: 'global',
      href: '/global',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'zen-gold',
      gradient: 'from-zen-gold/15 via-zen-gold/5 to-transparent',
    },
  ];

  return (
    <section className="section relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-ink-950" />
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="container relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <span className="text-geek-purple text-xl">◈</span>
            <h2 className="text-2xl md:text-3xl font-medium">{t('title')}</h2>
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-2 gap-5">
            {portals.map((portal) => (
              <Link
                key={portal.key}
                href={portal.href}
                className={`group relative overflow-hidden p-6 rounded-2xl border border-ink-700/50 hover:border-${portal.color}/40 bg-ink-900/30 transition-all duration-300 hover:-translate-y-1`}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${portal.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                {/* Glow */}
                <div 
                  className={`absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-2xl bg-${portal.color}/20`}
                />

                <div className="relative z-10">
                  {/* Icon + Title */}
                  <div className="flex items-center gap-4 mb-3">
                    <div className={`text-${portal.color} p-2.5 rounded-xl bg-ink-800/50 border border-ink-700/50 group-hover:scale-110 transition-transform duration-300`}>
                      {portal.icon}
                    </div>
                    <h3 className="text-xl font-medium">{t(`${portal.key}.title`)}</h3>
                  </div>

                  {/* Description */}
                  <p className="text-paper-400 text-sm mb-4 leading-relaxed">
                    {t(`${portal.key}.description`)}
                  </p>

                  {/* CTA */}
                  <span className={`inline-flex items-center gap-2 text-sm text-${portal.color} font-medium`}>
                    {t(`${portal.key}.cta`)}
                    <svg
                      className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
