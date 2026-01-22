'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';

export default function BuildHero() {
  const t = useTranslations('build');
  const [codeIndex, setCodeIndex] = useState(0);
  
  const codeSnippets = [
    'npm run build',
    'git push origin main',
    'docker compose up',
    'make it real →',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCodeIndex((prev) => (prev + 1) % codeSnippets.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-ink-950">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      
      {/* Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full animate-pulse-glow"
          style={{
            background: 'radial-gradient(circle, rgba(34, 211, 238, 0.1) 0%, transparent 60%)',
            filter: 'blur(60px)',
          }}
        />
        <div 
          className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full animate-float"
          style={{
            background: 'radial-gradient(circle, rgba(167, 139, 250, 0.08) 0%, transparent 60%)',
            filter: 'blur(50px)',
          }}
        />
      </div>

      {/* Floating code elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {['< />', '{ }', '( )', '[ ]', '// ...'].map((code, i) => (
          <div
            key={code}
            className="absolute text-ink-700/40 font-mono text-2xl animate-float"
            style={{
              left: `${15 + i * 20}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + i * 0.5}s`,
            }}
          >
            {code}
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Animated Code Tag */}
          <div className="mb-6 opacity-0 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ink-800/60 border border-ink-700/50 font-mono text-sm">
              <span className="text-geek-green">$</span>
              <span className="text-paper-300">{codeSnippets[codeIndex]}</span>
              <span className="w-2 h-4 bg-geek-cyan animate-pulse" />
            </div>
          </div>

          {/* Icon */}
          <div className="mb-6 opacity-0 animate-fade-in-up animation-delay-100">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-geek-cyan/20 to-geek-purple/10 border border-ink-700/50 relative group">
              <span className="text-4xl group-hover:scale-110 transition-transform">🔧</span>
              {/* Rotating ring */}
              <div className="absolute inset-0 rounded-2xl border border-dashed border-geek-cyan/20 animate-rotate-slow" style={{ animationDuration: '10s' }} />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-6 opacity-0 animate-fade-in-up animation-delay-200">
            <span className="text-gradient-cyan">{t('hero.title')}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-paper-300 leading-relaxed max-w-2xl mx-auto opacity-0 animate-fade-in-up animation-delay-300">
            {t('hero.subtitle')}
          </p>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-8 opacity-0 animate-fade-in-up animation-delay-400">
            {[
              { value: '∞', label: 'Ideas' },
              { value: '→', label: 'Shipping' },
              { value: '!', label: 'Reality' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-mono text-geek-cyan">{stat.value}</div>
                <div className="text-xs text-paper-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6 opacity-0 animate-fade-in-up animation-delay-500">
            {['AI × Hardware', 'Tools', 'Community', 'Experiments'].map((tag, i) => (
              <span
                key={tag}
                className="px-4 py-1.5 rounded-full bg-ink-800/60 border border-ink-700/50 text-sm text-paper-400 font-mono hover:border-geek-cyan/30 hover:text-geek-cyan transition-colors cursor-default"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-ink-950 to-transparent pointer-events-none" />
    </section>
  );
}
