'use client';

import { useTranslations } from 'next-intl';

export default function BecomeNode() {
  const t = useTranslations('global');
  const requirements = t.raw('becomeNode.requirements') as string[];
  const youProvide = t.raw('becomeNode.youProvide') as string[];
  const iProvide = t.raw('becomeNode.iProvide') as string[];

  return (
    <section className="section relative">
      <div className="container max-w-4xl mx-auto">
        {/* Main Card */}
        <div className="relative p-8 md:p-12 rounded-2xl bg-gradient-to-br from-ink-900/80 to-ink-950/80 border border-ink-700/50 overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-geek-blue/5 blur-3xl" />
          </div>

          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-10">
              <span className="text-3xl text-geek-blue/60 mb-4 block">⬡</span>
              <h2 className="text-2xl md:text-3xl font-medium mb-2">
                {t('becomeNode.title')}
              </h2>
              <p className="text-paper-400 max-w-lg mx-auto">
                {t('becomeNode.subtitle')}
              </p>
            </div>

            {/* Requirements */}
            <div className="mb-10">
              <h3 className="text-sm font-medium text-paper-400 mb-4 uppercase tracking-wider text-center">
                {t('becomeNode.requirementsTitle')}
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {requirements.map((req, i) => (
                  <span key={i} className="px-4 py-2 rounded-lg bg-ink-800/60 border border-ink-700/50 text-sm text-paper-300">
                    {req}
                  </span>
                ))}
              </div>
            </div>

            {/* Two Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              {/* You Provide */}
              <div className="p-6 rounded-xl bg-ink-800/30 border border-ink-700/30">
                <h3 className="text-sm font-medium text-geek-blue mb-4 uppercase tracking-wider">
                  {t('becomeNode.youProvideTitle')}
                </h3>
                <ul className="space-y-3">
                  {youProvide.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-paper-300">
                      <span className="text-geek-blue">◦</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* I Provide */}
              <div className="p-6 rounded-xl bg-ink-800/30 border border-ink-700/30">
                <h3 className="text-sm font-medium text-zen-gold mb-4 uppercase tracking-wider">
                  {t('becomeNode.iProvideTitle')}
                </h3>
                <ul className="space-y-3">
                  {iProvide.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-paper-300">
                      <span className="text-zen-gold">▸</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer CTA */}
            <div className="text-center pt-6 border-t border-ink-700/50">
              <p className="text-lg font-medium text-paper-200 mb-2">
                {t('becomeNode.footerTitle')}
              </p>
              <p className="text-paper-400 mb-6 text-sm">
                {t('becomeNode.footerSubtitle')}
              </p>
              <a href="mailto:darren@example.com" className="btn btn-primary">
                <span>{t('becomeNode.cta')}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-4 left-4 w-8 h-8 border-l border-t border-geek-blue/20" />
          <div className="absolute top-4 right-4 w-8 h-8 border-r border-t border-zen-gold/20" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-l border-b border-zen-gold/20" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-r border-b border-geek-blue/20" />
        </div>
      </div>
    </section>
  );
}
