'use client';

import { useTranslations } from 'next-intl';

export default function Mechanism() {
  const t = useTranslations('impact');
  const items = t.raw('mechanism.items') as string[];

  return (
    <section className="section relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-geek-green/5 rounded-full blur-3xl" />
      </div>

      <div className="container max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-12 h-px bg-gradient-to-r from-transparent to-geek-green/50" />
            <span className="text-geek-green text-2xl">◉</span>
            <h2 className="text-2xl md:text-3xl font-medium">
              {t('mechanism.title')}
            </h2>
            <span className="text-geek-green text-2xl">◉</span>
            <span className="w-12 h-px bg-gradient-to-l from-transparent to-geek-green/50" />
          </div>
          <p className="text-paper-400 max-w-xl mx-auto">
            {t('mechanism.intro')}
          </p>
        </div>

        {/* Mechanism Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item, index) => (
            <div 
              key={index}
              className="group relative p-6 rounded-xl bg-ink-900/60 border border-ink-700/50 hover:border-geek-green/30 transition-all duration-300 hover:-translate-y-1"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Index number */}
              <div className="absolute top-4 right-4 text-4xl font-bold font-mono text-ink-700/30 group-hover:text-geek-green/20 transition-colors">
                {String(index + 1).padStart(2, '0')}
              </div>

              {/* Icon */}
              <div className="w-10 h-10 rounded-lg bg-geek-green/10 border border-geek-green/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="text-geek-green text-lg">✓</span>
              </div>

              {/* Content */}
              <p className="text-paper-200 pr-8 leading-relaxed">
                {item}
              </p>

              {/* Hover glow */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-geek-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Bottom accent line */}
        <div className="mt-10 flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-geek-green/30" />
          <span className="w-16 h-px bg-gradient-to-r from-geek-green/30 to-transparent" />
          <span className="text-xs font-mono text-paper-500">impact driven</span>
          <span className="w-16 h-px bg-gradient-to-l from-geek-green/30 to-transparent" />
          <span className="w-2 h-2 rounded-full bg-geek-green/30" />
        </div>
      </div>
    </section>
  );
}
