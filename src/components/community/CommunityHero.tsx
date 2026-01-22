'use client';

import { useTranslations } from 'next-intl';

export default function CommunityHero() {
  const t = useTranslations('community');

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-ink-950">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      
      {/* Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(167, 139, 250, 0.08) 0%, transparent 60%)',
            filter: 'blur(60px)',
          }}
        />
        <div 
          className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(34, 211, 238, 0.06) 0%, transparent 60%)',
            filter: 'blur(50px)',
          }}
        />
      </div>

      {/* Content */}
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Icon */}
          <div className="mb-6 opacity-0 animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-geek-purple/20 to-geek-cyan/10 border border-ink-700/50">
              <span className="text-3xl">👥</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-6 opacity-0 animate-fade-in-up animation-delay-100">
            <span className="text-gradient-gold">{t('hero.title')}</span>
          </h1>

          {/* Subtitle */}
          <div className="text-lg md:text-xl text-paper-300 leading-relaxed max-w-2xl mx-auto opacity-0 animate-fade-in-up animation-delay-200 space-y-2">
            <p>{t('hero.subtitle1')}</p>
            <p>{t('hero.subtitle2')}</p>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-ink-950 to-transparent pointer-events-none" />
    </section>
  );
}
