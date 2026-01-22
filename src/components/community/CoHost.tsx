'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function CoHost() {
  const t = useTranslations('community');
  const youHave = t.raw('coHost.youHave') as string[];
  const weCan = t.raw('coHost.weCan') as string[];

  return (
    <section className="section relative">
      <div className="container max-w-3xl mx-auto">
        {/* Main Card */}
        <div className="relative p-8 md:p-12 rounded-2xl bg-gradient-to-br from-ink-900/80 to-ink-950/80 border border-ink-700/50 overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-geek-purple/5 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-zen-gold/5 blur-3xl" />
          </div>

          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-8">
              <span className="text-2xl text-geek-purple/60 mb-4 block">⬡</span>
              <h2 className="text-2xl md:text-3xl font-medium mb-2">
                {t('coHost.title')}
              </h2>
              <p className="text-paper-400">
                {t('coHost.subtitle')}
              </p>
            </div>

            {/* Two columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* If you have */}
              <div>
                <h3 className="text-sm font-medium text-paper-400 mb-4 uppercase tracking-wider">
                  {t('coHost.youHaveTitle')}
                </h3>
                <ul className="space-y-3">
                  {youHave.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-paper-300">
                      <span className="text-geek-purple">◦</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* We can */}
              <div>
                <h3 className="text-sm font-medium text-paper-400 mb-4 uppercase tracking-wider">
                  {t('coHost.weCanTitle')}
                </h3>
                <ul className="space-y-3">
                  {weCan.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-paper-300">
                      <span className="text-zen-gold">▸</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/co-build" className="btn btn-primary">
                <span>{t('coHost.cta.coHost')}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <a href="mailto:darren@example.com" className="btn btn-outline">
                <span>{t('coHost.cta.email')}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-4 left-4 w-8 h-8 border-l border-t border-geek-purple/20" />
          <div className="absolute top-4 right-4 w-8 h-8 border-r border-t border-zen-gold/20" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-l border-b border-zen-gold/20" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-r border-b border-geek-purple/20" />
        </div>
      </div>
    </section>
  );
}
