'use client';

import { useTranslations } from 'next-intl';

export default function OpenTo() {
  const t = useTranslations('impact');
  const items = t.raw('openTo.items') as string[];

  return (
    <section className="section relative">
      <div className="container max-w-3xl mx-auto">
        {/* Main Card */}
        <div className="relative p-8 md:p-12 rounded-2xl bg-gradient-to-br from-ink-900/80 to-ink-950/80 border border-ink-700/50 overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-zen-bamboo/5 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-geek-green/5 blur-3xl" />
          </div>

          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-8">
              <span className="text-2xl text-zen-bamboo/60 mb-4 block">❂</span>
              <h2 className="text-2xl md:text-3xl font-medium mb-2">
                {t('openTo.title')}
              </h2>
              <p className="text-paper-400">
                {t('openTo.subtitle')}
              </p>
            </div>

            {/* Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 rounded-lg bg-ink-800/50 border border-ink-700/50"
                >
                  <span className="text-zen-bamboo">◦</span>
                  <span className="text-paper-300 text-sm">{item}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center">
              <p className="text-paper-400 mb-4 text-sm">
                {t('openTo.cta')}
              </p>
              <a href="mailto:darren@example.com" className="btn btn-primary">
                <span>{t('openTo.button')}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-4 left-4 w-8 h-8 border-l border-t border-zen-bamboo/20" />
          <div className="absolute top-4 right-4 w-8 h-8 border-r border-t border-geek-green/20" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-l border-b border-geek-green/20" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-r border-b border-zen-bamboo/20" />
        </div>
      </div>
    </section>
  );
}
