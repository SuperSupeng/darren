'use client';

import { useTranslations } from 'next-intl';

export default function Now() {
  const t = useTranslations('about');
  const items = t.raw('now.items') as string[];

  return (
    <section className="section relative">
      <div className="container max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-gradient-to-r from-transparent to-geek-cyan/50" />
            <span className="text-geek-cyan text-xl">◉</span>
            <h2 className="text-2xl md:text-3xl font-medium">
              {t('now.title')}
            </h2>
            <span className="text-geek-cyan text-xl">◉</span>
            <span className="w-8 h-px bg-gradient-to-l from-transparent to-geek-cyan/50" />
          </div>
        </div>

        {/* Now Items - Terminal Style */}
        <div className="relative">
          {/* Terminal Window */}
          <div className="rounded-xl border border-ink-700/50 bg-ink-900/80 overflow-hidden">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-ink-700/50 bg-ink-800/50">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="ml-3 text-xs text-paper-500 font-mono">~/darren/now</span>
            </div>

            {/* Terminal Content */}
            <div className="p-6 font-mono text-sm">
              <div className="text-paper-500 mb-4">
                <span className="text-geek-cyan">$</span> cat now.md
              </div>
              
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-3 group"
                  >
                    <span className="text-zen-gold mt-0.5">▸</span>
                    <span className="text-paper-300 group-hover:text-paper-100 transition-colors">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Cursor */}
              <div className="mt-6 flex items-center gap-2">
                <span className="text-geek-cyan">$</span>
                <span className="w-2 h-4 bg-geek-cyan/80 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Decorative glow */}
          <div className="absolute -inset-4 bg-gradient-to-r from-zen-gold/5 via-transparent to-geek-cyan/5 rounded-2xl blur-xl -z-10" />
        </div>
      </div>
    </section>
  );
}
