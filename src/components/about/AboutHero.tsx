'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function AboutHero() {
  const t = useTranslations('about');

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-ink-950">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid opacity-50" />
      
      {/* Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full animate-pulse-glow"
          style={{
            background: 'radial-gradient(circle, rgba(212, 168, 86, 0.1) 0%, transparent 60%)',
            filter: 'blur(60px)',
          }}
        />
        <div 
          className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full animate-float"
          style={{
            background: 'radial-gradient(circle, rgba(34, 211, 238, 0.06) 0%, transparent 60%)',
            filter: 'blur(40px)',
          }}
        />
      </div>

      {/* Zen Circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div 
          className="absolute -inset-[250px] rounded-full border border-zen-gold/10 animate-rotate-slow"
          style={{ animationDuration: '50s' }}
        />
        <div 
          className="absolute -inset-[150px] rounded-full border border-ink-700/30 animate-rotate-slow"
          style={{ animationDirection: 'reverse', animationDuration: '35s' }}
        />
      </div>

      {/* Content */}
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Avatar */}
          <div className="mb-8 opacity-0 animate-fade-in-up">
            <div className="relative inline-block">
              {/* Avatar Image - Circular */}
              <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-zen-gold/30 shadow-lg shadow-zen-gold/10">
                <Image
                  src="/photo.jpg"
                  alt="Darren Su"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
              {/* Decorative ring */}
              <div className="absolute -inset-1 rounded-full border border-zen-gold/20" />
              {/* Pulse ring */}
              <div className="absolute -inset-2 rounded-full border border-zen-gold/10 animate-ping" style={{ animationDuration: '3s' }} />
            </div>
          </div>

          {/* Name & Title */}
          <div className="mb-6 opacity-0 animate-fade-in-up animation-delay-100">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-3">
              <span className="text-gradient-gold">Darren Su</span>
              <span className="text-paper-400 mx-3">/</span>
              <span className="text-paper-200">苏鹏</span>
            </h1>
          </div>

          {/* One-liner */}
          <div className="mb-8 opacity-0 animate-fade-in-up animation-delay-200">
            <p className="text-lg md:text-xl text-paper-300 leading-relaxed max-w-2xl mx-auto">
              {t('hero.oneliner')}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center justify-center gap-3 opacity-0 animate-fade-in-up animation-delay-300">
            {['Builder', 'AI × Hardware', 'Community', 'Zen'].map((tag, i) => (
              <span
                key={tag}
                className="px-4 py-1.5 rounded-full bg-ink-800/60 border border-ink-700/50 text-sm text-paper-400 font-mono"
                style={{ animationDelay: `${300 + i * 50}ms` }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ink-950 to-transparent pointer-events-none" />
    </section>
  );
}
