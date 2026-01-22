'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function Connect() {
  const t = useTranslations('about');

  const socialLinks = [
    {
      name: 'Twitter / X',
      url: 'https://x.com/supeng842499467',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: 'GitHub',
      url: 'https://github.com/darrensu',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
    {
      name: 'Email',
      url: 'mailto:darren@example.com',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="section relative">
      <div className="container max-w-3xl mx-auto">
        {/* Main CTA Card */}
        <div className="relative rounded-2xl border border-ink-700/50 bg-gradient-to-br from-ink-900/80 to-ink-950/80 p-8 md:p-12 text-center overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-zen-gold/5 blur-3xl" />
            <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full bg-geek-cyan/5 blur-3xl" />
          </div>

          {/* Content */}
          <div className="relative z-10">
            {/* Symbol */}
            <div className="mb-6">
              <span className="text-3xl text-zen-gold/60">⟡</span>
            </div>

            <h2 className="text-2xl md:text-3xl font-medium mb-4">
              {t('connect.title')}
            </h2>
            
            <p className="text-paper-400 mb-8 max-w-md mx-auto">
              {t('connect.description')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <Link href="/co-build" className="btn btn-primary">
                <span>{t('connect.cta.coBuild')}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <a 
                href="mailto:darren@example.com" 
                className="btn btn-outline"
              >
                <span>{t('connect.cta.email')}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-ink-800/50 border border-ink-700/50 flex items-center justify-center text-paper-400 hover:text-geek-cyan hover:border-geek-cyan/30 transition-all duration-300 hover:-translate-y-1"
                  aria-label={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>

            {/* Tagline */}
            <p className="mt-8 text-sm font-mono text-paper-500">
              Ship happens. Let&apos;s build together.
            </p>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-4 left-4 w-8 h-8 border-l border-t border-zen-gold/20" />
          <div className="absolute top-4 right-4 w-8 h-8 border-r border-t border-geek-cyan/20" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-l border-b border-geek-cyan/20" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-r border-b border-zen-gold/20" />
        </div>
      </div>
    </section>
  );
}
