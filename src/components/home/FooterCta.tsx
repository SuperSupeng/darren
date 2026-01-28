'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function FooterCta() {
  const t = useTranslations('footerCta');
  const tSubscribe = useTranslations('subscribe');

  return (
    <section className="py-16 md:py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-ink-900/50" />
      <div className="absolute inset-0 bg-grid opacity-10" />
      
      {/* Decorative Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent via-zen-gold/30 to-transparent" />
      
      {/* Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(212, 168, 86, 0.06) 0%, transparent 60%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="container relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="text-zen-gold text-3xl">⟡</div>
          </div>

          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-medium mb-4">
            {t('title')}
          </h2>

          {/* Description */}
          <p className="text-paper-400 mb-8 leading-relaxed max-w-lg mx-auto">
            {t('description')}
          </p>

          {/* Email Subscribe */}
          <div className="mb-8">
            <form 
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" 
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder={tSubscribe('placeholder')}
                className="input flex-1"
              />
              <button type="submit" className="btn btn-primary whitespace-nowrap">
                {tSubscribe('button')}
              </button>
            </form>
            <p className="text-xs text-paper-500 mt-3">
              {tSubscribe('description')}
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-ink-700/50" />
            <span className="text-paper-500 text-sm">or</span>
            <div className="flex-1 h-px bg-ink-700/50" />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:supeng842499467@gmail.com"
              className="btn btn-outline group"
            >
              <span>{t('cta.contact')}</span>
              <svg 
                className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
            <Link href="/services" className="btn btn-ghost group">
              <span>{t('cta.services')}</span>
              <svg 
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
